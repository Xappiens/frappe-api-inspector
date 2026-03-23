/* ═══════════════════════════════════════════════════════
   Frappe DocType Inspector — Local CORS Proxy + Static Server
   Zero dependencies — uses Node.js built-in modules
   ═══════════════════════════════════════════════════════ */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3500;

// MIME types for static files
const MIME = {
    '.html': 'text/html',
    '.css':  'text/css',
    '.js':   'application/javascript',
    '.json': 'application/json',
    '.png':  'image/png',
    '.svg':  'image/svg+xml',
    '.ico':  'image/x-icon',
};

const webhookLogs = [];
const MAX_WEBHOOKS = 50;

const server = http.createServer((req, res) => {
    // ── Webhook Endpoints ─────────────────────────────
    if (req.url.startsWith('/api/webhook-listener')) {
        // Handle preflight
        if (req.method === 'OPTIONS') {
            res.writeHead(204, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
                'Access-Control-Allow-Headers': '*'
            });
            res.end();
            return;
        }

        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            webhookLogs.unshift({
                id: Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
                timestamp: new Date().toISOString(),
                method: req.method,
                headers: req.headers,
                url: req.url,
                body: body
            });
            if (webhookLogs.length > MAX_WEBHOOKS) webhookLogs.pop();
            
            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ status: 'success', message: 'Webhook caught' }));
        });
        return;
    }

    if (req.url.startsWith('/api/webhook-logs')) {
        if (req.method === 'DELETE') {
            webhookLogs.length = 0; // Clear
            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ status: 'cleared' }));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ data: webhookLogs }));
        return;
    }

    // ── CORS Proxy: /proxy/* ──────────────────────────
    if (req.url.startsWith('/proxy/')) {
        handleProxy(req, res);
        return;
    }

    // ── Static File Server ────────────────────────────
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath.split('?')[0]);

    const ext = path.extname(filePath);
    const contentType = MIME[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

// ── Proxy Handler ─────────────────────────────────────
function handleProxy(req, res) {
    // Handle OPTIONS preflight FIRST
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        });
        res.end();
        return;
    }

    // Extract the real URL: /proxy/https://erp.example.com/api/resource/DocType
    const targetUrl = decodeURIComponent(req.url.replace('/proxy/', ''));

    let parsed;
    try {
        parsed = new URL(targetUrl);
    } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'URL inválida' }));
        return;
    }

    console.log(`[PROXY] ${req.method} → ${parsed.hostname}${parsed.pathname}${parsed.search}`);

    // Forward relevant headers (especially Authorization)
    const forwardHeaders = {
        'Content-Type': req.headers['content-type'] || 'application/json',
        'Accept': 'application/json',
    };
    if (req.headers['authorization']) {
        forwardHeaders['Authorization'] = req.headers['authorization'];
        console.log(`[PROXY] Auth header present: ${req.headers['authorization'].substring(0, 20)}...`);
    } else {
        console.log('[PROXY] ⚠ No Authorization header!');
    }

    const isHttps = parsed.protocol === 'https:';
    const transport = isHttps ? https : http;

    const options = {
        hostname: parsed.hostname,
        port: parsed.port || (isHttps ? 443 : 80),
        path: parsed.pathname + parsed.search,
        method: req.method,
        headers: forwardHeaders,
        rejectUnauthorized: false, // Permitir conexiones a ERPs locales con certificados auto-firmados
    };

    const proxyReq = transport.request(options, (proxyRes) => {
        console.log(`[PROXY] ← ${proxyRes.statusCode} from ${parsed.hostname}`);

        // Collect response body for logging if error
        if (proxyRes.statusCode >= 400) {
            let body = '';
            proxyRes.on('data', chunk => body += chunk);
            proxyRes.on('end', () => {
                console.log(`[PROXY] Error body: ${body.substring(0, 500)}`);
                res.writeHead(proxyRes.statusCode, {
                    'Content-Type': proxyRes.headers['content-type'] || 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Methods': '*',
                });
                res.end(body);
            });
        } else {
            res.writeHead(proxyRes.statusCode, {
                'Content-Type': proxyRes.headers['content-type'] || 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*',
            });
            proxyRes.pipe(res);
        }
    });

    proxyReq.on('error', (err) => {
        console.error('[PROXY] Connection error:', err.message);
        res.writeHead(502, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        });
        res.end(JSON.stringify({ error: `Proxy error: ${err.message}` }));
    });

    // Pipe request body for POST/PUT
    req.pipe(proxyReq);
}

server.listen(PORT, () => {
    console.log('');
    console.log('  ┌──────────────────────────────────────────┐');
    console.log('  │                                          │');
    console.log(`  │   Frappe Inspector running on port ${PORT}   │`);
    console.log('  │   http://localhost:' + PORT + '                  │');
    console.log('  │                                          │');
    console.log('  │   CORS Proxy enabled ✓                   │');
    console.log('  │                                          │');
    console.log('  └──────────────────────────────────────────┘');
    console.log('');
});
