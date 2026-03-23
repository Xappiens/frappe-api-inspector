/* ═══════════════════════════════════════════════════════
   Frappe DocType Inspector — Application Logic
   Vanilla JS • No dependencies
   ═══════════════════════════════════════════════════════ */

;(() => {
    'use strict';

    // ── DOM References ────────────────────────────────
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const dom = {
        // Connection
        inputUrl:        $('#input-url'),
        inputApiKey:     $('#input-api-key'),
        inputApiSecret:  $('#input-api-secret'),
        toggleSecret:    $('#toggle-secret'),
        btnConnect:      $('#btn-connect'),
        connectionStatus:$('#connection-status'),

        // DocType list
        searchPanel:     $('#doctype-search-panel'),
        inputSearch:     $('#input-search-doctype'),
        doctypeCount:    $('#doctype-count'),
        btnRefresh:      $('#btn-refresh'),
        doctypeList:     $('#doctype-list'),
        doctypeEmpty:    $('#doctype-empty'),

        // Inspector
        inspectorTitle:  $('#inspector-title'),
        fieldCountBadge: $('#field-count-badge'),
        inspectorActions:$('#inspector-actions'),
        inputSearchFields:$('#input-search-fields'),
        btnGeneratePayload:$('#btn-generate-payload'),
        btnCreateDoc:    $('#btn-create-doc'),
        welcomeState:    $('#welcome-state'),
        fieldsContainer: $('#fields-table-container'),
        fieldsTbody:     $('#fields-tbody'),
        loadingState:    $('#loading-state'),

        // Records Viewer
        btnViewRecords:  $('#btn-view-records'),
        recordsModal:    $('#records-modal'),
        recordsBackdrop: $('#records-modal-backdrop'),
        btnCloseRecords: $('#btn-close-records-modal'),
        btnRefreshRecords:$('#btn-refresh-records'),
        recordsSubtitle: $('#records-modal-subtitle'),
        recordsLoading:  $('#records-loading'),
        recordsEmpty:    $('#records-empty'),
        recordsTableWrap:$('#records-table-container'),
        recordsTheadTr:  $('#records-thead-tr'),
        recordsTbody:    $('#records-tbody'),
        btnExportCSV:    $('#btn-export-csv'),

        // Comments Sub-Modal
        commentsModal:   $('#comments-modal'),
        commentsBackdrop:$('#comments-modal-backdrop'),
        btnCloseComm:    $('#btn-close-comments-modal'),
        commentsSubtitle:$('#comments-modal-subtitle'),
        commentsBody:    $('#comments-modal-body'),

        // Query Builder
        btnToggleFilters:$('#btn-toggle-filters'),
        queryBuilderPanel:$('#query-builder-panel'),
        queryFiltersList:$('#query-filters-list'),
        btnAddFilter:    $('#btn-add-filter'),
        btnApplyFilters: $('#btn-apply-filters'),
        btnClearFilters: $('#btn-clear-filters'),
        
        // Logs Panel
        btnToggleLogs:   $('#btn-toggle-logs'),
        logsPanel:       $('#logs-panel'),
        logsList:        $('#logs-list'),
        btnClearLogs:    $('#btn-clear-logs'),
        btnCloseLogs:    $('#btn-close-logs'),
        logDetailsPanel: $('#log-details-panel'),
        btnCopyLog:      $('#btn-copy-log'),
        btnCloseLogDetails:$('#btn-close-log-details'),
        logDetailsContent: $('#log-details-content'),

        // Modal
        payloadModal:    $('#payload-modal'),
        modalBackdrop:   $('#modal-backdrop'),
        modalContent:    $('#modal-content'),
        modalSubtitle:   $('#modal-subtitle'),
        payloadCode:     $('#payload-code'),
        btnCopyPayload:  $('#btn-copy-payload'),
        copyText:        $('#copy-text'),
        btnCloseModal:   $('#btn-close-modal'),

        // Diff Modal
        diffModal:       $('#diff-modal'),
        diffBackdrop:    $('#diff-modal-backdrop'),
        diffModalBody:   $('#diff-modal-body'),
        btnCancelDiff:   $('#btn-cancel-diff'),
        btnConfirmDiff:  $('#btn-confirm-diff'),

        // Bulk Actions
        bulkActionsBar:  $('#bulk-actions-bar'),
        bulkCount:       $('#bulk-count'),
        btnBulkEdit:     $('#btn-bulk-edit'),
        
        // Bulk Edit Modal
        bulkEditModal:   $('#bulk-edit-modal'),
        bulkEditBackdrop:$('#bulk-edit-backdrop'),
        btnCancelBulkEdit:$('#btn-cancel-bulk-edit'),
        btnConfirmBulkEdit:$('#btn-confirm-bulk-edit'),
        bulkEditField:   $('#bulk-edit-field'),
        bulkEditValue:   $('#bulk-edit-value'),
        bulkEditSubtitle:$('#bulk-edit-subtitle'),
        bulkEditLoader:  $('#bulk-edit-loader'),

        // Sidebar Tabs & Collections
        tabExplorer:     $('#tab-explorer'),
        tabCollections:  $('#tab-collections'),
        tabWebhooks:     $('#tab-webhooks'),
        contentExplorer: $('#tab-content-explorer'),
        contentCollections:$('#tab-content-collections'),
        contentWebhooks: $('#tab-content-webhooks'),
        collectionsList: $('#collections-list'),
        collectionsEmpty:$('#collections-empty'),

        // Webhooks
        webhooksList:    $('#webhooks-list'),
        webhooksEmpty:   $('#webhooks-empty'),
        btnRefreshWebhooks: $('#btn-refresh-webhooks'),
        btnClearWebhooks:   $('#btn-clear-webhooks'),
        webhookCount:    $('#webhook-count'),

        // Save Collection
        btnSaveCollection: $('#btn-save-collection'),
        saveCollectionModal: $('#save-collection-modal'),
        saveCollectionBackdrop: $('#save-collection-backdrop'),
        btnCancelSaveCol:  $('#btn-cancel-save-collection'),
        btnConfirmSaveCol: $('#btn-confirm-save-collection'),
        inputCollectionName: $('#input-collection-name'),

        // Create Modal
        createModal:      $('#create-modal'),
        createBackdrop:   $('#create-modal-backdrop'),
        createModalBody:  $('#create-modal-body'),
        createSubtitle:   $('#create-modal-subtitle'),
        btnSubmitDoc:     $('#btn-submit-doc'),
        submitDocText:    $('#submit-doc-text'),
        btnCloseCreate:   $('#btn-close-create-modal'),
        createResponsePanel: $('#create-response-panel'),
        createResponseStatus:$('#create-response-status'),
        createResponseBody:  $('#create-response-body'),

        // Theme Toggle
        btnToggleTheme:  $('#btn-toggle-theme'),
        iconThemeDark:   $('#icon-theme-dark'),
        iconThemeLight:  $('#icon-theme-light'),

        // Schema Snapshots
        btnSnapshotTake: $('#btn-snapshot-take'),
        btnSnapshotCompare: $('#btn-snapshot-compare'),
        snapshotStatus:  $('#snapshot-status'),
        schemaDiffModal: $('#schema-diff-modal'),
        schemaDiffBackdrop: $('#schema-diff-backdrop'),
        schemaDiffSubtitle: $('#schema-diff-subtitle'),
        schemaDiffBody:  $('#schema-diff-body'),
        btnCloseSchemaDiff: $('#btn-close-schema-diff'),

        // API Test Suite
        btnOpenTests:    $('#btn-open-tests'),
        testsModal:      $('#tests-modal'),
        testsBackdrop:   $('#tests-modal-backdrop'),
        btnCloseTestsModal: $('#btn-close-tests-modal'),
        btnRunAllTests:  $('#btn-run-all-tests'),
        btnNewTest:      $('#btn-new-test'),
        testsList:       $('#tests-list'),
        testConfigurator:$('#test-configurator'),
        testEmptyState:  $('#test-empty-state'),
        testInputName:   $('#test-input-name'),
        testInputMethod: $('#test-input-method'),
        testInputDoctype:$('#test-input-doctype'),
        testInputBody:   $('#test-input-body'),
        testAssertStatus:$('#test-assert-status'),
        testAssertBody:  $('#test-assert-body'),
        btnSaveTest:     $('#btn-save-test'),
        testRunLogs:     $('#test-run-logs'),
        testRunOutput:   $('#test-run-output'),
        btnCloseTestLogs:$('#btn-close-test-logs'),

        // Global Search
        searchModal:     $('#global-search-modal'),
        searchBackdrop:  $('#global-search-backdrop'),
        searchInput:     $('#input-global-search'), // Renamed from inputGlobalSearch
        searchResults:   $('#global-search-results'), // Renamed from globalSearchResults
        globalSearchEmpty:   $('#global-search-empty'), // Kept for now, but might be removed if renderGlobalSearchResults handles it
        globalSearchLoading: $('#global-search-loading'), // Kept for now

        // Toast
        toastContainer:  $('#toast-container'),
    };

    // ── State ─────────────────────────────────────────
    const state = {
        connected: false,
        baseUrl: '',
        authHeader: '',
        allDocTypes: [],
        currentDocType: null,
        currentFields: [],
        editingRecord: null, // When editing, holds the record name
        originalRecord: null, // Holds original data for diff
        queryFilters: [],    // Active query builder filters
        currentRecords: [],  // Stores the latest fetched records for CSV export
        requestLogs: [],     // Stores the history of api accesses
        selectedLogId: null, // Open log details
        selectedRecords: new Set(), // Bulk selections
        savedCollections: JSON.parse(localStorage.getItem('fapi_collections') || '[]'),
        schemaSnapshots: JSON.parse(localStorage.getItem('fapi_schema_snapshots') || '{}'),
        apiTests: JSON.parse(localStorage.getItem('fapi_api_tests') || '[]'),
        selectedTestId: null,
        
        // Search State
        globalSearchResults: [], // Now managed by the new global search functions
        globalSearchIndex: -1,   // Now managed by the new global search functions
    };

    // ── LocalStorage Keys ─────────────────────────────
    const STORAGE_KEY = 'frappe_inspector_connection';
    const THEME_KEY = 'fapi_theme';

    // ── Init ──────────────────────────────────────────
    function init() {
        initTheme();
        loadSavedConnection();
        bindEvents();
    }

    // ── Theme Management ──────────────────────────────
    function initTheme() {
        // Retrieve directly from localStorage or default to 'dark'
        const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
        applyTheme(savedTheme);
    }

    function toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            dom.iconThemeDark.classList.remove('hidden');
            dom.iconThemeDark.classList.add('block');
            dom.iconThemeLight.classList.add('hidden');
            dom.iconThemeLight.classList.remove('block');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            dom.iconThemeDark.classList.add('hidden');
            dom.iconThemeDark.classList.remove('block');
            dom.iconThemeLight.classList.remove('hidden');
            dom.iconThemeLight.classList.add('block');
        }
    }

    // ── Connection Persistence ────────────────────────
    function loadSavedConnection() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (saved) {
                dom.inputUrl.value = saved.url || '';
                dom.inputApiKey.value = saved.apiKey || '';
                dom.inputApiSecret.value = saved.apiSecret || '';
            }
        } catch { /* ignore */ }
    }

    function saveConnection() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            url: dom.inputUrl.value.trim(),
            apiKey: dom.inputApiKey.value.trim(),
            apiSecret: dom.inputApiSecret.value.trim(),
        }));
    }

    // ── Event Binding ─────────────────────────────────
    function bindEvents() {
        // Toggle password visibility
        dom.toggleSecret.addEventListener('click', () => {
            const input = dom.inputApiSecret;
            input.type = input.type === 'password' ? 'text' : 'password';
        });

        // Search DocTypes (debounced)
        dom.inputSearch.addEventListener('input', debounce(filterDocTypes, 150));

        // Theme Toggle
        if (dom.btnToggleTheme) {
            dom.btnToggleTheme.addEventListener('click', toggleTheme);
        }

        // Sidebar Tabs
        dom.tabExplorer.addEventListener('click', () => switchSidebarTab('explorer'));
        dom.tabCollections.addEventListener('click', () => switchSidebarTab('collections'));
        dom.tabWebhooks.addEventListener('click', () => switchSidebarTab('webhooks'));

        // Webhooks
        dom.btnRefreshWebhooks.addEventListener('click', fetchWebhooks);
        dom.btnClearWebhooks.addEventListener('click', clearWebhooks);

        // Connect
        dom.btnConnect.addEventListener('click', handleConnect);

        // Enter key on inputs → connect
        [dom.inputUrl, dom.inputApiKey, dom.inputApiSecret].forEach(el => {
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') handleConnect();
            });
        });

        // Search DocTypes (debounced)
        dom.inputSearch.addEventListener('input', debounce(filterDocTypes, 150));

        // Refresh
        dom.btnRefresh.addEventListener('click', fetchDocTypes);
        
        // Enter key to manually load a DocType (for Restricted Mode)
        dom.inputSearch.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = dom.inputSearch.value.trim();
                // Add it manually to the list and select it
                if (query) {
                    if (!state.allDocTypes.includes(query)) {
                        state.allDocTypes.unshift(query);
                        renderDocTypeList(state.allDocTypes);
                    }
                    selectDocType(query);
                }
            }
        });

        // Search Fields
        dom.inputSearchFields.addEventListener('input', debounce(filterFields, 150));

        // Global Search Setup
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                openGlobalSearch();
            }
            if (e.key === 'Escape' && !dom.searchModal.classList.contains('hidden')) {
                closeGlobalSearch();
            }
        });
        dom.searchBackdrop.addEventListener('click', closeGlobalSearch);
        dom.searchInput.addEventListener('input', debounce(handleGlobalSearchInput, 300));
        dom.searchInput.addEventListener('keydown', handleGlobalSearchKeys);

        // Generate Payload
        dom.btnGeneratePayload.addEventListener('click', openPayloadModal);

        // Create Document
        dom.btnCreateDoc.addEventListener('click', openCreateModal);
        dom.btnCloseCreate.addEventListener('click', closeCreateModal);
        dom.createBackdrop.addEventListener('click', closeCreateModal);
        dom.btnSubmitDoc.addEventListener('click', submitNewDoc);

        // View Records
        dom.btnViewRecords.addEventListener('click', openRecordsModal);
        dom.btnCloseRecords.addEventListener('click', closeRecordsModal);
        dom.recordsBackdrop.addEventListener('click', closeRecordsModal);
        dom.btnRefreshRecords.addEventListener('click', fetchRecords);
        dom.btnExportCSV.addEventListener('click', exportToCSV);

        // View Comments
        dom.btnCloseComm.addEventListener('click', closeCommentsModal);
        dom.commentsBackdrop.addEventListener('click', closeCommentsModal);

        // Query Builder
        dom.btnToggleFilters.addEventListener('click', toggleQueryBuilder);
        dom.btnAddFilter.addEventListener('click', addQueryFilter);
        dom.btnApplyFilters.addEventListener('click', applyQueryFilters);
        dom.btnClearFilters.addEventListener('click', clearQueryFilters);

        // Logs Panel
        dom.btnToggleLogs.addEventListener('click', toggleLogsPanel);
        dom.btnCloseLogs.addEventListener('click', toggleLogsPanel);
        dom.btnClearLogs.addEventListener('click', clearLogs);
        dom.btnCloseLogDetails.addEventListener('click', closeLogDetails);
        dom.btnCopyLog.addEventListener('click', copyLogDetails);

        // Modal close
        dom.btnCloseModal.addEventListener('click', closePayloadModal);
        dom.modalBackdrop.addEventListener('click', closePayloadModal);

        // Diff Modal
        dom.btnCancelDiff.addEventListener('click', closeDiffModal);
        dom.diffBackdrop.addEventListener('click', closeDiffModal);

        // Schema Snapshots
        dom.btnSnapshotTake.addEventListener('click', takeSchemaSnapshot);
        dom.btnSnapshotCompare.addEventListener('click', compareSchemaSnapshot);
        dom.btnCloseSchemaDiff.addEventListener('click', closeSchemaDiffModal);
        dom.schemaDiffBackdrop.addEventListener('click', closeSchemaDiffModal);

        // API Test Suite
        dom.btnOpenTests.addEventListener('click', openTestsModal);
        dom.btnCloseTestsModal.addEventListener('click', closeTestsModal);
        dom.testsBackdrop.addEventListener('click', closeTestsModal);
        dom.btnNewTest.addEventListener('click', createNewTest);
        dom.btnSaveTest.addEventListener('click', saveCurrentTest);
        dom.btnRunAllTests.addEventListener('click', runAllTests);
        dom.btnCloseTestLogs.addEventListener('click', () => dom.testRunLogs.classList.add('hidden'));

        // Theme
        dom.btnToggleTheme.addEventListener('click', toggleTheme);

        // Bulk Edit
        dom.btnBulkEdit.addEventListener('click', openBulkEditModal);
        dom.btnCancelBulkEdit.addEventListener('click', closeBulkEditModal);
        dom.bulkEditBackdrop.addEventListener('click', closeBulkEditModal);
        dom.btnConfirmBulkEdit.addEventListener('click', executeBulkEdit);

        // Sidebar Tabs
        dom.tabExplorer.addEventListener('click', () => switchSidebarTab('explorer'));
        dom.tabCollections.addEventListener('click', () => switchSidebarTab('collections'));

        // Save Collections
        dom.btnSaveCollection.addEventListener('click', openSaveCollectionModal);
        dom.btnCancelSaveCol.addEventListener('click', closeSaveCollectionModal);
        dom.saveCollectionBackdrop.addEventListener('click', closeSaveCollectionModal);
        dom.btnConfirmSaveCol.addEventListener('click', confirmSaveCollection);

        // Copy payload
        dom.btnCopyPayload.addEventListener('click', copyPayload);

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closePayloadModal();
                closeCreateModal();
                closeRecordsModal();
                closeCommentsModal();
            }
        });
    }

    // ── Connection Handler ────────────────────────────
    async function handleConnect() {
        const url = dom.inputUrl.value.trim().replace(/\/+$/, '');
        const key = dom.inputApiKey.value.trim();
        const secret = dom.inputApiSecret.value.trim();

        if (!url || !key || !secret) {
            showToast('Completa todos los campos de conexión', 'error');
            return;
        }

        state.baseUrl = url;
        state.authHeader = `token ${key}:${secret}`;

        setConnectLoading(true);

        try {
            // Test the connection with a lightweight REST call instead of RPC
            const res = await apiFetch('/api/resource/User?limit_page_length=1');
            if (!res.ok) {
                const text = await res.text();
                let errMsg = `HTTP ${res.status}`;
                try {
                    const errData = JSON.parse(text);
                    errMsg = errData.message
                        || errData._server_messages
                        || errData.exc
                        || errData.error
                        || text.substring(0, 200);
                } catch {
                    errMsg = text.substring(0, 200) || errMsg;
                }
                console.error('Auth response:', res.status, text);
                throw new Error(errMsg);
            }
            const data = await res.json();
            state.connected = true;
            saveConnection();

            setConnectionStatus('connected', 'Conectado');
            showToast(`Conectado a Frappe correctamente`, 'success');

            // Enable search panel
            dom.searchPanel.classList.remove('opacity-40', 'pointer-events-none');

            // Fetch DocTypes
            fetchDocTypes();
        } catch (err) {
            state.connected = false;
            setConnectionStatus('error', 'Error');
            showToast(`Error de conexión: ${err.message}`, 'error');
        } finally {
            setConnectLoading(false);
        }
    }

    function setConnectLoading(loading) {
        dom.btnConnect.disabled = loading;
        if (loading) {
            dom.btnConnect.innerHTML = `
                <div class="loader" style="width:14px;height:14px;border-width:1.5px;"></div>
                Conectando...
            `;
        } else {
            dom.btnConnect.innerHTML = `
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                Conectar
            `;
        }
    }

    function setConnectionStatus(type, text) {
        const el = dom.connectionStatus;
        el.classList.remove('hidden');
        el.textContent = text;
        el.className = 'text-[10px] font-medium px-2 py-0.5 rounded-full';
        if (type === 'connected') {
            el.classList.add('bg-editor-green/15', 'text-editor-green');
        } else {
            el.classList.add('bg-editor-red/15', 'text-editor-red');
        }
    }

    // ── API Helper (routes through local CORS proxy y hace LOGGING) ──
    async function apiFetch(path, options = {}) {
        const targetUrl = `${state.baseUrl}${path}`;
        const proxyUrl = `/proxy/${targetUrl}`;
        const method = options.method || 'GET';
        const startTime = performance.now();

        // Creamos log
        const logEntry = {
            id: Date.now().toString() + Math.random().toString(36).substring(2, 5),
            timestamp: new Date(),
            method: method,
            url: path,
            payload: options.body ? options.body : null,
            status: 0,
            duration: 0,
            response: null,
            error: null
        };
        
        state.requestLogs.unshift(logEntry);
        // Evitar que crezca al infinito (max 100)
        if (state.requestLogs.length > 100) state.requestLogs.pop();
        renderLogs();

        try {
            const res = await fetch(proxyUrl, {
                ...options,
                headers: {
                    'Authorization': state.authHeader,
                    'Content-Type': 'application/json',
                    ...(options.headers || {}),
                },
            });

            logEntry.duration = Math.round(performance.now() - startTime);
            logEntry.status = res.status;

            // Clonar respuesta para leer el contenido real del cuerpo sin consumirlo para la app
            const resClone = res.clone();
            const text = await resClone.text();
            try {
                // Formateamos bonito si es JSON
                logEntry.response = JSON.stringify(JSON.parse(text), null, 2);
            } catch {
                logEntry.response = text;
            }

            renderLogs();
            return res;
        } catch (err) {
            logEntry.duration = Math.round(performance.now() - startTime);
            logEntry.error = err.message;
            renderLogs();
            throw err;
        }
    }

    // ── DocType Fetching ──────────────────────────────
    async function fetchDocTypes() {
        if (!state.connected) return;

        dom.doctypeList.innerHTML = '';
        dom.doctypeCount.textContent = 'Cargando...';

        try {
            const res = await apiFetch('/api/resource/DocType?fields=["name"]&limit_page_length=0&order_by=name asc');
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();

            state.allDocTypes = (data.data || []).map(d => d.name).sort();
            dom.doctypeCount.textContent = `${state.allDocTypes.length} DocTypes`;
            renderDocTypeList(state.allDocTypes);
        } catch (err) {
            if (err.message.includes('403') || err.message.includes('HTTP 401')) {
                let foundDocTypes = new Set();
                
                // 1. EXTRAER DOC TYPES VISIBLES VÍA WORKSPACES UI
                try {
                    console.log("Intentando bypass usando el RPC oficial del escritorio (Workspace)...");
                    const wsRes = await apiFetch('/api/method/frappe.desk.desktop.get_workspace_sidebar_items');
                    if (!wsRes.ok) throw new Error("No RPC sidebar");
                    const wsData = await wsRes.json();
                    
                    const pages = wsData.message?.pages || wsData.message || [];
                    if (!pages.length) throw new Error("No hay páginas en sidebar");

                    const wsPromises = pages.slice(0, 30).map(p => 
                        apiFetch(`/api/method/frappe.desk.desktop.get_workspace?workspace=${encodeURIComponent(p.name)}`)
                            .then(r => r.ok ? r.json() : null).catch(() => null)
                    );

                    const results = await Promise.all(wsPromises);
                    results.forEach(r => {
                        const message = r?.message || {};
                        const links = message.links || [];
                        links.forEach(l => {
                            if (l.link_type === 'DocType' && l.link_to) foundDocTypes.add(l.link_to);
                        });
                        
                        const blocks = message.custom_blocks || [];
                        blocks.forEach(b => {
                            try {
                                const parsed = typeof b.text === 'string' ? JSON.parse(b.text) : b.text;
                                if (parsed?.data?.links) {
                                    parsed.data.links.forEach(l => {
                                        if (l.link_type === 'DocType' && l.link_to) foundDocTypes.add(l.link_to);
                                    });
                                }
                            } catch (e) {}
                        });
                    });
                } catch (fallbackErr) {
                    console.error("Workspace Bypass Error: ", fallbackErr);
                }

                // 2. ESCANEO MASIVO DE PERMISOS REALES
                console.log("Iniciando escáner de permisos en segundo plano...");
                dom.doctypeCount.textContent = 'Analizando seguridad...';
                
                const erpnextDictionary = [
                    "User", "Role", "Company", "Workflow", "Print Format", "Email Template", "File", "ToDo",
                    "Lead", "Opportunity", "Customer", "Contact", "Address", "Quotation", "Sales Order",
                    "Sales Invoice", "Delivery Note", "Pricing Rule",
                    "Supplier", "Supplier Quotation", "Purchase Order", "Purchase Receipt", "Purchase Invoice",
                    "Item", "Item Group", "Warehouse", "Stock Entry", "Material Request",
                    "Serial No", "Batch", "Stock Ledger Entry", "UOM", "Brand",
                    "Employee", "Department", "Designation", "Attendance", "Leave Application",
                    "Salary Slip", "Expense Claim", "Job Applicant",
                    "Project", "Task", "Timesheet", "Issue", "Communication", "Newsletter",
                    "Blog Post", "Blog Category", "Web Page", "Web Form"
                ];

                const toCheck = [...new Set([...Array.from(foundDocTypes), ...erpnextDictionary])];
                let verifiedDocTypes = new Set();

                const chunkSize = 15;
                for (let i = 0; i < toCheck.length; i += chunkSize) {
                    const chunk = toCheck.slice(i, i + chunkSize);
                    const promises = chunk.map(dt => {
                        // Comprobación de permiso de lectura real sobre el formulario / campos:
                        return apiFetch(`/api/method/frappe.desk.form.load.getdoctype?doctype=${encodeURIComponent(dt)}`)
                            .then(r => r.ok ? dt : null).catch(() => null);
                    });
                    const resultsChunk = await Promise.all(promises);
                    resultsChunk.forEach(dt => { if (dt) verifiedDocTypes.add(dt); });
                }

                if (verifiedDocTypes.size === 0) {
                    showToast(`Modo Seguro: Tu rol es extremadamente limitado.`, 'warning');
                    dom.doctypeCount.textContent = 'Sin Permisos Globales';
                    dom.doctypeEmpty.classList.remove('hidden');
                    dom.doctypeEmpty.classList.add('flex');
                    dom.doctypeEmpty.innerHTML = `
                        <svg class="w-10 h-10 text-editor-yellow mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                        <p class="text-[11px] text-editor-yellow font-bold mb-1">Permisos Bloqueados</p>
                        <p class="text-[10px] text-editor-subtext">No tienes acceso a documentos estándar. Escribe el nombre manualmente.</p>
                    `;
                    return;
                }

                state.allDocTypes = Array.from(verifiedDocTypes).sort();
                
                dom.doctypeCount.textContent = `${state.allDocTypes.length} DocTypes Verificados`;
                renderDocTypeList(state.allDocTypes);
                showToast(`¡Bypass Éxito! Vemos ${state.allDocTypes.length} documentos.`, 'success');
                
                dom.doctypeEmpty.classList.add('hidden');
                dom.doctypeEmpty.classList.remove('flex');

            } else {
                showToast(`Error al cargar DocTypes: ${err.message}`, 'error');
                dom.doctypeCount.textContent = 'Error';
            }
        }
    }

    function renderDocTypeList(list) {
        dom.doctypeList.innerHTML = '';

        if (list.length === 0) {
            dom.doctypeEmpty.classList.remove('hidden');
            dom.doctypeEmpty.classList.add('flex');
            return;
        }

        dom.doctypeEmpty.classList.add('hidden');
        dom.doctypeEmpty.classList.remove('flex');

        const fragment = document.createDocumentFragment();
        list.forEach((name, i) => {
            const li = document.createElement('li');
            li.className = 'doctype-item animate-slide-right';
            li.style.animationDelay = `${Math.min(i * 8, 300)}ms`;
            li.dataset.name = name;
            li.innerHTML = `
                <svg class="doctype-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <span class="truncate">${escapeHtml(name)}</span>
            `;
            if (state.currentDocType === name) li.classList.add('active');
            li.addEventListener('click', () => selectDocType(name));
            fragment.appendChild(li);
        });
        dom.doctypeList.appendChild(fragment);
    }

    function filterDocTypes() {
        let query = dom.inputSearch.value.trim().toLowerCase();
        if (!query) {
            renderDocTypeList(state.allDocTypes);
            dom.doctypeCount.textContent = `${state.allDocTypes.length} DocTypes`;
            return;
        }
        // Decode URL-encoded characters (%20 → space, etc.)
        try { query = decodeURIComponent(query); } catch { /* keep original */ }
        const filtered = state.allDocTypes.filter(n => n.toLowerCase().includes(query));
        renderDocTypeList(filtered);
        dom.doctypeCount.textContent = `${filtered.length} / ${state.allDocTypes.length}`;
    }

    // ── DocType Selection & Field Inspector ───────────
    async function selectDocType(name) {
        state.currentDocType = name;

        // Update sidebar active state
        $$('.doctype-item').forEach(el => {
            el.classList.toggle('active', el.dataset.name === name);
        });

        // Show loading
        dom.welcomeState.classList.add('hidden');
        dom.fieldsContainer.classList.add('hidden');
        dom.loadingState.classList.remove('hidden');
        dom.loadingState.classList.add('flex');

        dom.inspectorTitle.textContent = name;
        dom.inspectorTitle.classList.remove('text-editor-subtext');
        dom.inspectorTitle.classList.add('text-editor-text');
        dom.fieldCountBadge.classList.add('hidden');
        dom.inspectorActions.classList.add('hidden');

        try {
            // Intentamos obtener el DocType por RPC en lugar de REST DB directamente. 
            // Это permite a los usuarios estándar leer campos que por API bloquea con 403.
            let res = await apiFetch(`/api/method/frappe.desk.form.load.getdoctype?doctype=${encodeURIComponent(name)}`);
            let data = null;
            let fields = [];

            if (!res.ok) {
                // Fallback to strict DB REST Resource API if RPC fails
                res = await apiFetch(`/api/resource/DocType/${encodeURIComponent(name)}`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                data = await res.json();
                fields = data.data?.fields || [];
            } else {
                data = await res.json();
                const docs = data.docs || (data.message && data.message.docs) || [];
                const docTypeDoc = docs.find(d => d.doctype === 'DocType' && d.name === name);
                fields = docTypeDoc ? docTypeDoc.fields : [];
            }

            if (!fields || !fields.length) {
                // Aún vacío, es posible que el DocType no exista o haya bloqueo profundo.
                throw new Error("Estructura vacía o denegada");
            }

            state.currentFields = fields;

            renderFieldsTable(fields);

            // Update header
            const dataFields = fields.filter(f => !isMeta(f.fieldtype));
            dom.fieldCountBadge.textContent = `${dataFields.length} campos`;
            dom.fieldCountBadge.classList.remove('hidden');
            dom.inspectorActions.classList.remove('hidden');
            dom.inspectorActions.style.display = 'flex';

            updateSnapshotUI();

        } catch (err) {
            showToast(`Error al cargar "${name}": ${err.message}`, 'error');
        } finally {
            dom.loadingState.classList.add('hidden');
            dom.loadingState.classList.remove('flex');
        }
    }

    function renderFieldsTable(fields, filterQuery = '') {
        dom.fieldsTbody.innerHTML = '';
        dom.fieldsContainer.classList.remove('hidden');

        const query = filterQuery.toLowerCase();
        let idx = 0;

        const fragment = document.createDocumentFragment();
        fields.forEach(field => {
            const ft = (field.fieldtype || '').toLowerCase();

            // Section / Column / Tab breaks
            if (ft === 'section break' || ft === 'tab break') {
                const tr = document.createElement('tr');
                tr.className = 'field-row section-break';
                const label = field.label || (ft === 'tab break' ? '── Tab ──' : '── Section ──');
                tr.innerHTML = `<td colspan="6">
                    <span class="flex items-center gap-2">
                        <span class="flex-1 h-px bg-editor-border/30"></span>
                        <span>${escapeHtml(label)}</span>
                        <span class="flex-1 h-px bg-editor-border/30"></span>
                    </span>
                </td>`;
                fragment.appendChild(tr);
                return;
            }

            if (ft === 'column break') {
                const tr = document.createElement('tr');
                tr.className = 'field-row column-break';
                tr.innerHTML = `<td colspan="6" class="text-center">┆ columna ┆</td>`;
                fragment.appendChild(tr);
                return;
            }

            // Filter
            if (query) {
                const searchable = `${field.label || ''} ${field.fieldname || ''} ${field.fieldtype || ''}`.toLowerCase();
                if (!searchable.includes(query)) return;
            }

            idx++;
            const tr = document.createElement('tr');
            tr.className = 'field-row animate-fade-in';
            tr.style.animationDelay = `${Math.min(idx * 10, 200)}ms`;

            const badgeClass = getFieldBadgeClass(field.fieldtype);
            const required = field.reqd === 1;

            tr.innerHTML = `
                <td class="text-xs text-editor-subtext/50 font-mono">${idx}</td>
                <td class="text-xs text-editor-text">${escapeHtml(field.label || '—')}</td>
                <td class="fieldname-cell" data-fieldname="${escapeHtml(field.fieldname || '')}">${escapeHtml(field.fieldname || '—')}</td>
                <td><span class="fieldtype-badge ${badgeClass}">${escapeHtml(field.fieldtype || '—')}</span></td>
                <td class="text-center">${required
                    ? '<span class="required-yes">✓</span>'
                    : '<span class="required-no">·</span>'
                }</td>
                <td class="options-cell" title="${escapeHtml(field.options || '')}">${formatOptions(field)}</td>
            `;

            // Click to copy fieldname
            const fnCell = tr.querySelector('.fieldname-cell');
            fnCell.addEventListener('click', () => {
                copyToClipboard(field.fieldname);
                fnCell.classList.add('copied');
                setTimeout(() => fnCell.classList.remove('copied'), 1200);
            });

            fragment.appendChild(tr);
        });

        dom.fieldsTbody.appendChild(fragment);
    }

    // ── Schema Snapshots ──────────────────────────────────────
    function updateSnapshotUI() {
        const snap = state.schemaSnapshots[state.currentDocType];
        if (snap) {
            const date = new Date(snap.timestamp).toLocaleString();
            dom.snapshotStatus.textContent = `Último snapshot: ${date}`;
            dom.btnSnapshotCompare.classList.remove('hidden');
        } else {
            dom.snapshotStatus.textContent = 'Sin snapshot guardado.';
            dom.btnSnapshotCompare.classList.add('hidden');
        }
    }

    function takeSchemaSnapshot() {
        if (!state.currentDocType || state.currentFields.length === 0) return;
        state.schemaSnapshots[state.currentDocType] = {
            timestamp: Date.now(),
            fields: JSON.parse(JSON.stringify(state.currentFields))
        };
        localStorage.setItem('fapi_schema_snapshots', JSON.stringify(state.schemaSnapshots));
        updateSnapshotUI();
        showToast(`Snapshot guardado para ${state.currentDocType}`, 'success');
    }

    function compareSchemaSnapshot() {
        if (!state.currentDocType) return;
        const snap = state.schemaSnapshots[state.currentDocType];
        if (!snap) return;

        const oldFields = snap.fields;
        const newFields = state.currentFields;

        const oldMap = new Map(oldFields.map(f => [f.fieldname, f]));
        const newMap = new Map(newFields.map(f => [f.fieldname, f]));

        const added = [];
        const removed = [];
        const modified = [];

        // Check new or modified
        for (const [name, newF] of newMap.entries()) {
            if (!oldMap.has(name)) {
                added.push(newF);
            } else {
                const oldF = oldMap.get(name);
                const diffs = [];
                if (oldF.fieldtype !== newF.fieldtype) diffs.push(`Tipo: ${oldF.fieldtype} → ${newF.fieldtype}`);
                if (oldF.reqd !== newF.reqd) diffs.push(`Required: ${oldF.reqd} → ${newF.reqd}`);
                if (oldF.options !== newF.options) diffs.push(`Options: cambiado`);
                if (oldF.label !== newF.label) diffs.push(`Label: "${oldF.label}" → "${newF.label}"`);
                
                if (diffs.length > 0) {
                    modified.push({ fieldname: name, diffs });
                }
            }
        }

        // Check removed
        for (const [name, oldF] of oldMap.entries()) {
            if (!newMap.has(name)) {
                removed.push(oldF);
            }
        }

        renderSchemaDiff(added, removed, modified);
    }

    function renderSchemaDiff(added, removed, modified) {
        dom.schemaDiffSubtitle.textContent = `Resultados para ${state.currentDocType}`;
        dom.schemaDiffBody.innerHTML = '';

        if (added.length === 0 && removed.length === 0 && modified.length === 0) {
            dom.schemaDiffBody.innerHTML = `
                <div class="text-center py-10 opacity-70">
                    <div class="text-4xl mb-3">🧊</div>
                    <p class="text-editor-subtext font-medium text-sm">El Schema es idéntico al Snapshot.</p>
                </div>
            `;
        } else {
            let html = '<div class="flex flex-col gap-2">';
            
            added.forEach(f => {
                html += `
                    <div class="flex items-center justify-between p-3 rounded-lg border border-editor-green/30 bg-editor-green/5">
                        <div class="flex items-center gap-3">
                            <span class="w-2 h-2 rounded-full bg-editor-green"></span>
                            <div>
                                <span class="font-mono text-xs font-bold text-editor-text">${f.fieldname}</span>
                                <span class="text-[10px] text-editor-subtext ml-2">${f.fieldtype || 'N/A'}</span>
                            </div>
                        </div>
                        <span class="text-[10px] uppercase font-bold text-editor-green bg-editor-green/10 px-2 py-0.5 rounded">Añadido</span>
                    </div>
                `;
            });

            removed.forEach(f => {
                html += `
                    <div class="flex items-center justify-between p-3 rounded-lg border border-editor-red/30 bg-editor-red/5">
                        <div class="flex items-center gap-3">
                            <span class="w-2 h-2 rounded-full bg-editor-red"></span>
                            <div>
                                <span class="font-mono text-xs font-bold text-editor-text line-through opacity-70">${f.fieldname}</span>
                                <span class="text-[10px] text-editor-subtext ml-2 line-through opacity-70">${f.fieldtype || 'N/A'}</span>
                            </div>
                        </div>
                        <span class="text-[10px] uppercase font-bold text-editor-red bg-editor-red/10 px-2 py-0.5 rounded">Eliminado</span>
                    </div>
                `;
            });

            modified.forEach(m => {
                html += `
                    <div class="flex items-center justify-between p-3 rounded-lg border border-editor-yellow/30 bg-editor-yellow/5">
                        <div class="flex items-center gap-3">
                            <span class="w-2 h-2 rounded-full bg-editor-yellow"></span>
                            <div class="flex flex-col">
                                <span class="font-mono text-xs font-bold text-editor-text">${m.fieldname}</span>
                                <span class="text-[10px] text-editor-yellow/80 mt-0.5">${m.diffs.join(' • ')}</span>
                            </div>
                        </div>
                        <span class="text-[10px] uppercase font-bold text-editor-yellow bg-editor-yellow/10 px-2 py-0.5 rounded">Modificado</span>
                    </div>
                `;
            });

            html += '</div>';
            dom.schemaDiffBody.innerHTML = html;
        }

        dom.schemaDiffModal.classList.remove('hidden');
        dom.schemaDiffModal.classList.add('flex');
    }

    function closeSchemaDiffModal() {
        dom.schemaDiffModal.classList.add('hidden');
        dom.schemaDiffModal.classList.remove('flex');
    }

    function filterFields() {
        const query = dom.inputSearchFields.value.trim();
        renderFieldsTable(state.currentFields, query);
    }

    function generatePayloadString() {
        const systemFields = ['owner', 'creation', 'modified', 'modified_by', 'idx', 'docstatus', 'name', '_user_tags', '_comments', '_assign', '_liked_by'];
        const validFields = state.currentFields.filter(f => !isMeta(f.fieldtype) && !systemFields.includes(f.fieldname));
        const mandatoryFields = validFields.filter(f => f.reqd === 1);
        const optionalFields = validFields.filter(f => f.reqd !== 1);

        let lines = [];
        mandatoryFields.forEach(f => {
            lines.push(`  "${f.fieldname}": ${JSON.stringify(getExampleValue(f))}, // REQUERIDO`);
        });
        
        if (mandatoryFields.length > 0 && optionalFields.length > 0) {
            lines.push('');
        }

        optionalFields.forEach(f => {
            lines.push(`  "${f.fieldname}": ${JSON.stringify(getExampleValue(f))}, // Opcional`);
        });

        // Remove trailing comma from the last property to keep strict JSON parsers happier
        for (let i = lines.length - 1; i >= 0; i--) {
            if (lines[i] && lines[i].includes(',')) {
                lines[i] = lines[i].replace(/,(\s*\/\/.*)$/, '$1');
                break;
            }
        }

        return {
            str: '{\n' + lines.join('\n') + '\n}',
            reqCount: mandatoryFields.length,
            optCount: optionalFields.length
        };
    }

    function openPayloadModal() {
        if (!state.currentFields.length) return;

        const payloadInfo = generatePayloadString();
        dom.payloadCode.innerHTML = syntaxHighlightJSON(payloadInfo.str);
        
        // Add subtle gray color to the comments so they look cool
        dom.payloadCode.innerHTML = dom.payloadCode.innerHTML.replace(/(\/\/ REQUERIDO|\/\/ Opcional)/g, '<span class="text-editor-subtext opacity-50 italic">$1</span>');

        dom.modalSubtitle.textContent = `${payloadInfo.reqCount} obligatorios · ${payloadInfo.optCount} opcionales · ${state.currentDocType}`;
        dom.copyText.textContent = 'Copiar';

        dom.payloadModal.classList.remove('hidden');
        dom.payloadModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }

    function closePayloadModal() {
        dom.payloadModal.classList.add('hidden');
        dom.payloadModal.classList.remove('flex');
        document.body.style.overflow = '';
    }

    async function copyPayload() {
        if (!state.currentFields.length) return;
        const payloadInfo = generatePayloadString();
        
        await copyToClipboard(payloadInfo.str);
        dom.copyText.textContent = '¡Copiado!';
        setTimeout(() => { dom.copyText.textContent = 'Copiar'; }, 2000);
    }

    // ── Create Document Modal ─────────────────────────
    function openCreateModal() {
        if (!state.currentFields.length || !state.currentDocType) return;

        const dataFields = state.currentFields.filter(f => !isMeta(f.fieldtype));
        
        if (!state.editingRecord) {
            dom.createSubtitle.textContent = `${state.currentDocType} · ${dataFields.length} campos`;
            $('#create-modal h3').textContent = 'Crear Documento';
            dom.submitDocText.textContent = 'Enviar POST';
        }

        // Hide previous response
        dom.createResponsePanel.classList.add('hidden');

        // Build form
        dom.createModalBody.innerHTML = '';
        const fragment = document.createDocumentFragment();

        dataFields.forEach(field => {
            const row = buildFieldInput(field);
            fragment.appendChild(row);
        });

        dom.createModalBody.appendChild(fragment);

        // Reset submit button
        dom.btnSubmitDoc.disabled = false;

        dom.createModal.classList.remove('hidden');
        dom.createModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }

    function openEditModal(record) {
        state.editingRecord = record.name;
        state.originalRecord = { ...record }; // clone for diff

        // Re-use logic from create
        openCreateModal();
        
        // Update texts
        $('#create-modal h3').textContent = `Editar ${record.name}`;
        dom.createSubtitle.textContent = state.currentDocType;
        dom.submitDocText.textContent = 'Guardar Cambios (PUT)';

        // Pre-fill values
        const inputs = dom.createModalBody.querySelectorAll('[data-fieldname]');
        inputs.forEach(input => {
            const fname = input.dataset.fieldname;
            const ftype = input.dataset.fieldtype;
            const value = record[fname];

            if (value === undefined || value === null) return;

            if (ftype === 'check') {
                input.checked = (value == 1 || value === true);
            } else if (input.dataset.isJson) {
                input.value = typeof value === 'object' ? JSON.stringify(value, null, 2) : value;
            } else {
                input.value = value;
            }
        });
    }

    function closeCreateModal() {
        state.editingRecord = null; // Reset edit state
        state.originalRecord = null;
        $('#create-modal h3').textContent = 'Crear Documento'; // Reset title
        dom.submitDocText.textContent = 'Enviar POST';
        
        dom.createModal.classList.add('hidden');
        dom.createModal.classList.remove('flex');
        // Only restore scroll if payload and records modals are also hidden
        if (dom.payloadModal.classList.contains('hidden') && dom.recordsModal.classList.contains('hidden')) {
            document.body.style.overflow = '';
        }
    }

    function buildFieldInput(field) {
        const wrapper = document.createElement('div');
        wrapper.className = 'create-field-row';

        const ft = (field.fieldtype || '').toLowerCase();
        const required = field.reqd === 1;
        const badgeClass = getFieldBadgeClass(field.fieldtype);

        // Label row
        const labelRow = document.createElement('div');
        labelRow.className = 'create-field-label';
        labelRow.innerHTML = `
            <span>${escapeHtml(field.label || field.fieldname)}${required ? ' <span class="text-editor-red">*</span>' : ''}</span>
            <span class="create-field-meta">
                <span class="fieldtype-badge ${badgeClass}">${escapeHtml(field.fieldtype)}</span>
                <code class="create-field-code">${escapeHtml(field.fieldname)}</code>
            </span>
        `;
        wrapper.appendChild(labelRow);

        // Input element
        let input;

        if (ft === 'select') {
            input = document.createElement('select');
            input.className = 'input-field create-input';
            const opts = (field.options || '').split('\n').filter(Boolean);
            // Empty option
            const emptyOpt = document.createElement('option');
            emptyOpt.value = '';
            emptyOpt.textContent = '— Seleccionar —';
            input.appendChild(emptyOpt);
            opts.forEach(o => {
                const opt = document.createElement('option');
                opt.value = o;
                opt.textContent = o;
                input.appendChild(opt);
            });
        } else if (ft === 'check') {
            input = document.createElement('div');
            input.className = 'create-checkbox-wrap';
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.className = 'create-checkbox';
            cb.dataset.fieldname = field.fieldname;
            cb.dataset.fieldtype = ft;
            const lbl = document.createElement('span');
            lbl.className = 'text-xs text-editor-subtext';
            lbl.textContent = 'Activado';
            input.appendChild(cb);
            input.appendChild(lbl);
            wrapper.appendChild(input);
            return wrapper; // early return — checkbox is special
        } else if (ft === 'text' || ft === 'small text' || ft === 'long text' || ft === 'text editor' || ft === 'markdown editor' || ft === 'html editor' || ft === 'code') {
            input = document.createElement('textarea');
            input.className = 'input-field create-input';
            input.rows = 3;
            input.placeholder = field.options ? `Tipo: ${field.options}` : '';
        } else if (ft === 'date') {
            input = document.createElement('input');
            input.type = 'date';
            input.className = 'input-field create-input';
        } else if (ft === 'datetime') {
            input = document.createElement('input');
            input.type = 'datetime-local';
            input.className = 'input-field create-input';
        } else if (ft === 'time') {
            input = document.createElement('input');
            input.type = 'time';
            input.className = 'input-field create-input';
        } else if (ft === 'int') {
            input = document.createElement('input');
            input.type = 'number';
            input.step = '1';
            input.className = 'input-field create-input';
            input.placeholder = '0';
        } else if (ft === 'float' || ft === 'currency' || ft === 'percent') {
            input = document.createElement('input');
            input.type = 'number';
            input.step = 'any';
            input.className = 'input-field create-input';
            input.placeholder = '0.00';
        } else if (ft === 'table') {
            input = document.createElement('textarea');
            input.className = 'input-field create-input font-mono';
            input.rows = 2;
            input.placeholder = `JSON array, ej: [{"campo":"valor"}]`;
            input.dataset.isJson = 'true';
        } else {
            // Data, Link, etc
            input = document.createElement('input');
            input.type = 'text';
            input.className = 'input-field create-input';
            if (ft === 'link' && field.options) {
                input.placeholder = `Link → ${field.options}`;
            } else if (ft === 'attach' || ft === 'attach image') {
                input.placeholder = '/ruta/al/archivo';
            } else {
                input.placeholder = '';
            }
        }

        input.dataset.fieldname = field.fieldname;
        input.dataset.fieldtype = ft;
        if (required) input.dataset.required = '1';
        wrapper.appendChild(input);

        return wrapper;
    }

    async function submitNewDoc() {
        if (!state.currentDocType) return;

        // Collect values from the form
        const body = {};
        const inputs = dom.createModalBody.querySelectorAll('[data-fieldname]');
        let missingRequired = false;

        inputs.forEach(input => {
            const fname = input.dataset.fieldname;
            const ftype = input.dataset.fieldtype;
            let value;

            if (ftype === 'check') {
                value = input.checked ? 1 : 0;
            } else if (input.dataset.isJson) {
                const raw = input.value.trim();
                if (raw) {
                    try { value = JSON.parse(raw); } catch { value = raw; }
                } else {
                    value = [];
                }
            } else if (ftype === 'int') {
                value = input.value !== '' ? parseInt(input.value, 10) : undefined;
            } else if (ftype === 'float' || ftype === 'currency' || ftype === 'percent') {
                value = input.value !== '' ? parseFloat(input.value) : undefined;
            } else {
                value = input.value;
            }

            // Skip empty non-required fields
            if (input.dataset.required === '1' && !state.editingRecord && (value === '' || value === undefined)) {
                // Only enforce required on create strictly, for PUT partial updates are technically allowed but usually we enforce front-end
                input.classList.add('create-input-error');
                missingRequired = true;
            } else {
                input.classList.remove('create-input-error');
            }

            // For PUT, we only send fields that are actually present/modified?
            // Sending everything is fine too.
            if (value !== '' && value !== undefined) {
                body[fname] = value;
            }
        });

        if (missingRequired && !state.editingRecord) {
            showToast('Completa los campos obligatorios (marcados con *)', 'error');
            return;
        }

        if (state.editingRecord) {
            // Data Diff Logic
            const diffs = [];
            for (const [key, newVal] of Object.entries(body)) {
                let oldVal = state.originalRecord[key];
                
                // Strict check: if it was null/undefined in original and we send '', skip it
                if ((oldVal === null || oldVal === undefined) && newVal === '') continue;

                let isDifferent = false;
                if (typeof newVal === 'object' || typeof oldVal === 'object') {
                    isDifferent = JSON.stringify(newVal) !== JSON.stringify(oldVal);
                } else {
                    isDifferent = String(newVal) !== String(oldVal || '');
                }

                if (isDifferent) {
                    diffs.push({ field: key, old: oldVal, new: newVal });
                }
            }

            if (diffs.length === 0) {
                showToast('No hay cambios introducidos', 'info');
                return;
            }

            showDiffModal(diffs, body);
            return; // Pause here until confirmed
        }

        // POST Logic
        await executeSubmitDoc('POST', `/api/resource/${encodeURIComponent(state.currentDocType)}`, body);
    }

    function showDiffModal(diffs, finalBody) {
        dom.diffModalBody.innerHTML = '';
        const frag = document.createDocumentFragment();

        diffs.forEach(d => {
            const row = document.createElement('div');
            row.className = 'p-3 rounded-lg border border-editor-border bg-editor-surface flex flex-col gap-2';
            
            row.innerHTML = `
                <div class="text-[11px] font-mono text-editor-subtext font-semibold uppercase tracking-wider">${d.field}</div>
                <div class="grid grid-cols-2 gap-3 text-xs">
                    <div class="p-2 rounded bg-editor-red/10 border border-editor-red/20 text-editor-red overflow-x-auto whitespace-nowrap">
                        <span class="opacity-70 line-through mr-1">-</span> ${escapeHtml(String(d.old === undefined || d.old === null ? 'null' : (typeof d.old === 'object' ? JSON.stringify(d.old) : d.old)))}
                    </div>
                    <div class="p-2 rounded bg-editor-green/10 border border-editor-green/20 text-editor-green overflow-x-auto whitespace-nowrap">
                        <span class="opacity-70 mr-1">+</span> ${escapeHtml(String(typeof d.new === 'object' ? JSON.stringify(d.new) : d.new))}
                    </div>
                </div>
            `;
            frag.appendChild(row);
        });

        dom.diffModalBody.appendChild(frag);
        dom.diffModal.classList.remove('hidden');
        dom.diffModal.classList.add('flex');

        // One-time listener for confirm
        const handleConfirm = async () => {
            closeDiffModal();
            const endpoint = `/api/resource/${encodeURIComponent(state.currentDocType)}/${encodeURIComponent(state.editingRecord)}`;
            await executeSubmitDoc('PUT', endpoint, finalBody);
            dom.btnConfirmDiff.removeEventListener('click', handleConfirm);
        };

        // Clean up previous listeners if any (simple approach)
        const newBtn = dom.btnConfirmDiff.cloneNode(true);
        dom.btnConfirmDiff.parentNode.replaceChild(newBtn, dom.btnConfirmDiff);
        dom.btnConfirmDiff = newBtn; // Update DOM ref
        dom.btnConfirmDiff.addEventListener('click', handleConfirm);
    }

    function closeDiffModal() {
        dom.diffModal.classList.add('hidden');
        dom.diffModal.classList.remove('flex');
    }

    async function executeSubmitDoc(method, endpoint, body) {
        // Set loading state
        dom.btnSubmitDoc.disabled = true;
        dom.submitDocText.textContent = method === 'PUT' ? 'Guardando...' : 'Enviando...';

        try {
            const res = await apiFetch(endpoint, {
                method: method,
                body: JSON.stringify(body),
            });

            const data = await res.json();

            // Show response panel
            dom.createResponsePanel.classList.remove('hidden');
            dom.createResponseBody.innerHTML = syntaxHighlightJSON(JSON.stringify(data, null, 2));

            const statusEl = dom.createResponseStatus;
            if (res.ok) {
                statusEl.textContent = `${res.status} OK`;
                statusEl.className = 'text-[10px] font-medium px-2 py-0.5 rounded-full bg-editor-green/15 text-editor-green';
                showToast(`Documento ${method === 'PUT' ? 'actualizado' : 'creado'} correctamente`, 'success');
                
                // Refresh behind
                if (method === 'PUT' && !dom.recordsModal.classList.contains('hidden')) {
                    fetchRecords(false);
                }
            } else {
                statusEl.textContent = `${res.status} Error`;
                statusEl.className = 'text-[10px] font-medium px-2 py-0.5 rounded-full bg-editor-red/15 text-editor-red';
                const errMsg = data.message || data._server_messages || data.exc || 'Error desconocido';
                showToast(`Error: ${typeof errMsg === 'string' ? errMsg.substring(0, 150) : JSON.stringify(errMsg).substring(0, 150)}`, 'error');
            }
        } catch (err) {
            dom.createResponsePanel.classList.remove('hidden');
            dom.createResponseBody.textContent = err.message;
            dom.createResponseStatus.textContent = 'Error de red';
            dom.createResponseStatus.className = 'text-[10px] font-medium px-2 py-0.5 rounded-full bg-editor-red/15 text-editor-red';
            showToast(`Error de conexión: ${err.message}`, 'error');
        } finally {
            dom.btnSubmitDoc.disabled = false;
            dom.submitDocText.textContent = state.editingRecord ? 'Guardar Cambios (PUT)' : 'Enviar POST';
        }
    }

    // ── Records Viewer Modal ──────────────────────────
    function openRecordsModal() {
        if (!state.currentDocType) return;

        dom.recordsModal.classList.remove('hidden');
        dom.recordsModal.classList.add('flex');
        document.body.style.overflow = 'hidden';

        fetchRecords();
    }

    function closeRecordsModal() {
        dom.recordsModal.classList.add('hidden');
        dom.recordsModal.classList.remove('flex');
        document.body.style.overflow = '';
    }

    async function fetchRecords(showLoading = true) {
        if (!state.currentDocType) return;
        
        // Reset selections
        state.selectedRecords.clear();
        updateBulkBar();

        if (showLoading) {
            dom.recordsTableWrap.classList.add('hidden');
            dom.recordsEmpty.classList.add('hidden');
            dom.recordsEmpty.classList.remove('flex');
            dom.recordsLoading.classList.remove('hidden');
            dom.recordsLoading.classList.add('flex');
            dom.recordsSubtitle.textContent = 'Descargando datos...';
        } else {
            dom.recordsSubtitle.textContent = 'Actualizando datos...';
        }

        try {
            // Build filters string if active
            let filtersParam = '';
            if (state.queryFilters && state.queryFilters.length > 0) {
                // Ensure valid filters
                const validFilters = state.queryFilters.filter(f => f.fieldname && f.operator);
                if (validFilters.length > 0) {
                    const mapped = validFilters.map(f => [f.fieldname, f.operator, f.value || '']);
                    filtersParam = `&filters=${encodeURIComponent(JSON.stringify(mapped))}`;
                }
            }

            // Fetch records for the current doctype. Limit to 50 for performance.
            const url = `/api/resource/${encodeURIComponent(state.currentDocType)}?fields=["*"]&limit_page_length=50&order_by=creation desc${filtersParam}`;
            const res = await apiFetch(url);

            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            const records = data.data || [];
            state.currentRecords = records;

            dom.recordsSubtitle.textContent = `Mostrando ${records.length} registro(s) · ${state.currentDocType}`;

            if (records.length === 0) {
                dom.recordsEmpty.classList.remove('hidden');
                dom.recordsEmpty.classList.add('flex');
            } else {
                renderRecordsTable(records);
            }

        } catch (err) {
            console.error(err);
            showToast(`Error al cargar registros: ${err.message}`, 'error');
        } finally {
            dom.recordsLoading.classList.add('hidden');
            dom.recordsLoading.classList.remove('flex');
        }
    }

    function renderRecordsTable(records) {
        dom.recordsTheadTr.innerHTML = '';
        dom.recordsTbody.innerHTML = '';

        if (!records.length) return;

        // Identify columns based on the first record + common mandatory ones
        const firstRecord = records[0];
        // Priority fields we always want first if they exist
        const priorityKeys = ['name', 'creation', 'first_name', 'email', 'status', 'custom_tipo_de_lead'];
        let rawKeys = Object.keys(firstRecord).filter(k => !k.startsWith('_'));

        // Sort keys: priority first, then alphabetical
        const keys = rawKeys.sort((a, b) => {
            const idxA = priorityKeys.indexOf(a);
            const idxB = priorityKeys.indexOf(b);
            if (idxA !== -1 && idxB !== -1) return idxA - idxB;
            if (idxA !== -1) return -1;
            if (idxB !== -1) return 1;
            return a.localeCompare(b);
        });

        // 1. Build Header
        const fragHead = document.createDocumentFragment();
        
        // Checkbox header
        const thCb = document.createElement('th');
        thCb.className = 'py-3 px-4 w-10 text-center';
        thCb.innerHTML = `<input type="checkbox" id="cb-select-all" class="rounded border-editor-border bg-editor-surface focus:ring-0 cursor-pointer">`;
        fragHead.appendChild(thCb);

        keys.forEach(key => {
            const th = document.createElement('th');
            th.className = 'py-3 px-4 font-semibold text-editor-subtext whitespace-nowrap cursor-default';
            th.textContent = key;
            fragHead.appendChild(th);
        });
        const thActions = document.createElement('th');
        thActions.className = 'py-3 px-4 font-semibold text-editor-subtext whitespace-nowrap text-right bg-editor-surface';
        thActions.textContent = 'ACCIONES';
        fragHead.appendChild(thActions);

        dom.recordsTheadTr.appendChild(fragHead);

        // 2. Build Rows
        const fragBody = document.createDocumentFragment();
        records.forEach((record, index) => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-editor-surface2/50 transition-colors animate-fade-in group';
            tr.style.animationDelay = `${Math.min(index * 15, 300)}ms`;

            // Row click copies raw JSON to clipboard conceptually, but let's just make it look clickable
            tr.title = "Haz clic en una celda para copiar su valor";

            // Checkbox cell
            const tdCb = document.createElement('td');
            tdCb.className = 'py-2.5 px-4 w-10 text-center cursor-default';
            tdCb.innerHTML = `<input type="checkbox" class="cb-record rounded border-editor-border bg-editor-surface focus:ring-0 cursor-pointer" value="${record.name}">`;
            tdCb.addEventListener('click', (e) => e.stopPropagation()); // block row click
            tr.appendChild(tdCb);

            keys.forEach(key => {
                const td = document.createElement('td');
                td.className = 'py-2.5 px-4 whitespace-nowrap max-w-[200px] truncate cursor-pointer hover:text-editor-accent transition-colors';
                
                let val = record[key];
                if (val === null || val === undefined) val = '—';
                else if (typeof val === 'object') val = JSON.stringify(val);

                td.textContent = String(val);

                // Quick copy value on click
                td.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    if (val !== '—') {
                        await copyToClipboard(String(record[key]));
                        showToast(`Copiado: ${val}`, 'success');
                    }
                });

                tr.appendChild(td);
            });

            // Action Column
            const tdAct = document.createElement('td');
            tdAct.className = 'py-2.5 px-4 whitespace-nowrap text-right bg-editor-sidebar transition-colors flex flex-row items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100';
            
            const btnEdit = document.createElement('button');
            btnEdit.className = 'py-1 px-2.5 bg-editor-surface border border-editor-border rounded shadow-sm text-[10px] hover:bg-editor-yellow/20 hover:text-editor-yellow hover:border-editor-yellow/40 transition-colors text-editor-text font-medium';
            btnEdit.innerHTML = `✏️ Editar`;
            btnEdit.addEventListener('click', (e) => {
                e.stopPropagation();
                openEditModal(record);
            });
            
            const btnComm = document.createElement('button');
            btnComm.className = 'py-1 px-2.5 bg-editor-surface border border-editor-border rounded shadow-sm text-[10px] hover:bg-editor-accent hover:text-white transition-colors text-editor-text font-medium';
            btnComm.innerHTML = `💬 Mensajes`;
            btnComm.addEventListener('click', (e) => {
                e.stopPropagation();
                openCommentsModal(record.name);
            });

            tdAct.appendChild(btnEdit);
            tdAct.appendChild(btnComm);
            tr.appendChild(tdAct);

            fragBody.appendChild(tr);
        });

        dom.recordsTbody.appendChild(fragBody);
        dom.recordsTableWrap.classList.remove('hidden');

        // 3. Attach Checkbox Listeners
        const cbSelectAll = $('#cb-select-all');
        const cbRecords = document.querySelectorAll('.cb-record');

        cbSelectAll.addEventListener('change', (e) => {
            const checked = e.target.checked;
            cbRecords.forEach(cb => {
                cb.checked = checked;
                if (checked) state.selectedRecords.add(cb.value);
                else state.selectedRecords.delete(cb.value);
            });
            updateBulkBar();
        });

        cbRecords.forEach(cb => {
            cb.addEventListener('change', (e) => {
                if (e.target.checked) state.selectedRecords.add(e.target.value);
                else state.selectedRecords.delete(e.target.value);
                
                // Update select all indeterminate/checked state
                if (state.selectedRecords.size === 0) {
                    cbSelectAll.checked = false;
                    cbSelectAll.indeterminate = false;
                } else if (state.selectedRecords.size === cbRecords.length) {
                    cbSelectAll.checked = true;
                    cbSelectAll.indeterminate = false;
                } else {
                    cbSelectAll.checked = false;
                    cbSelectAll.indeterminate = true;
                }
                updateBulkBar();
            });
        });
    }

    // ── Bulk Actions Logic ────────────────────────────────────
    function updateBulkBar() {
        if (state.selectedRecords.size > 0) {
            dom.bulkCount.textContent = state.selectedRecords.size;
            dom.bulkActionsBar.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
            dom.bulkActionsBar.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
        } else {
            dom.bulkActionsBar.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
            dom.bulkActionsBar.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
        }
    }

    function openBulkEditModal() {
        if (state.selectedRecords.size === 0) return;
        
        dom.bulkEditSubtitle.textContent = `${state.selectedRecords.size} registro(s) seleccionados`;
        
        // Populate fields
        dom.bulkEditField.innerHTML = '';
        state.currentFields.forEach(f => {
            if (isMeta(f.fieldtype)) return;
            const opt = document.createElement('option');
            opt.value = f.fieldname;
            opt.textContent = `${f.label || f.fieldname} (${f.fieldtype})`;
            dom.bulkEditField.appendChild(opt);
        });
        
        dom.bulkEditValue.value = '';
        
        dom.bulkEditModal.classList.remove('hidden');
        dom.bulkEditModal.classList.add('flex');
    }

    function closeBulkEditModal() {
        dom.bulkEditModal.classList.add('hidden');
        dom.bulkEditModal.classList.remove('flex');
    }

    async function executeBulkEdit() {
        const fieldName = dom.bulkEditField.value;
        const value = dom.bulkEditValue.value;
        const records = Array.from(state.selectedRecords);

        if (!records.length || !fieldName) return;
        
        dom.btnConfirmBulkEdit.disabled = true;
        dom.bulkEditLoader.classList.remove('hidden');

        let successCount = 0;
        let failCount = 0;

        // Execute in parallel (max 5 at a time) to avoid destroying frappe server
        const CHUNK_SIZE = 5;
        for (let i = 0; i < records.length; i += CHUNK_SIZE) {
            const chunk = records.slice(i, i + CHUNK_SIZE);
            const promises = chunk.map(recordName => {
                const endpoint = `/api/resource/${encodeURIComponent(state.currentDocType)}/${encodeURIComponent(recordName)}`;
                return apiFetch(endpoint, {
                    method: 'PUT',
                    body: JSON.stringify({ [fieldName]: value })
                }).then(res => {
                    if (res.ok) successCount++;
                    else failCount++;
                }).catch(() => failCount++);
            });
            await Promise.all(promises);
        }

        dom.btnConfirmBulkEdit.disabled = false;
        dom.bulkEditLoader.classList.add('hidden');
        closeBulkEditModal();

        if (failCount === 0) {
            showToast(`${successCount} registros actualizados correctamente`, 'success');
        } else {
            showToast(`${successCount} éxito, ${failCount} fallos. Revisa los logs.`, 'error');
        }

        fetchRecords(false);
    }

    // ── Query Builder Visual ───────────────────────────────────
    function toggleQueryBuilder() {
        const pan = dom.queryBuilderPanel;
        if (pan.classList.contains('hidden')) {
            pan.classList.remove('hidden');
            pan.classList.add('flex');
            if (state.queryFilters.length === 0) {
                addQueryFilter(); // add first empty
            }
        } else {
            pan.classList.add('hidden');
            pan.classList.remove('flex');
        }
    }

    function addQueryFilter() {
        state.queryFilters.push({
            fieldname: '',
            operator: '=',
            value: ''
        });
        renderQueryFilters();
    }

    function removeQueryFilter(index) {
        state.queryFilters.splice(index, 1);
        renderQueryFilters();
    }

    function clearQueryFilters() {
        state.queryFilters = [];
        renderQueryFilters();
        fetchRecords();
    }

    function applyQueryFilters() {
        // We sync the values from DOM back to state just in case, though they should be synced
        const rows = $$('.query-filter-row');
        state.queryFilters = Array.from(rows).map(row => ({
            fieldname: row.querySelector('.qf-field').value,
            operator: row.querySelector('.qf-op').value,
            value: row.querySelector('.qf-val').value
        }));
        fetchRecords();
    }

    function renderQueryFilters() {
        dom.queryFiltersList.innerHTML = '';
        
        if (state.queryFilters.length === 0) {
            dom.queryFiltersList.innerHTML = '<div class="text-[11px] text-editor-subtext italic">No hay filtros aplicados.</div>';
            return;
        }

        const dataFields = state.currentFields.filter(f => !isMeta(f.fieldtype)).sort((a,b) => a.label.localeCompare(b.label));
        const operators = ['=', '!=', 'like', 'not like', 'in', 'not in', '>', '<', '>=', '<=', 'is', 'is not'];

        state.queryFilters.forEach((filter, index) => {
            const row = document.createElement('div');
            row.className = 'query-filter-row flex items-center gap-2 w-full';

            // 1. Field
            const selField = document.createElement('select');
            selField.className = 'qf-field input-field h-8 text-[11px] py-0 w-1/3 field-select';
            selField.innerHTML = `<option value="">-- Selecciona Campo --</option>` + 
                dataFields.map(f => `<option value="${f.fieldname}" ${filter.fieldname === f.fieldname ? 'selected' : ''}>${f.label || f.fieldname} (${f.fieldname})</option>`).join('');
            
            // 2. Operator
            const selOp = document.createElement('select');
            selOp.className = 'qf-op input-field h-8 text-[11px] py-0 w-1/4 op-select';
            selOp.innerHTML = operators.map(o => `<option value="${o}" ${filter.operator === o ? 'selected' : ''}>${o}</option>`).join('');

            // 3. Value
            const inpVal = document.createElement('input');
            inpVal.type = 'text';
            inpVal.className = 'qf-val input-field h-8 text-[11px] py-0 flex-1 val-input';
            inpVal.placeholder = 'Valor...';
            inpVal.value = filter.value;

            // 4. Remove
            const btnRm = document.createElement('button');
            btnRm.className = 'w-8 h-8 flex items-center justify-center rounded border border-editor-border text-editor-subtext hover:text-editor-red hover:bg-editor-red/10 transition-colors';
            btnRm.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
            btnRm.onclick = () => removeQueryFilter(index);

            // Save to state on change
            selField.onchange = () => { filter.fieldname = selField.value; };
            selOp.onchange = () => { filter.operator = selOp.value; };
            inpVal.oninput = () => { filter.value = inpVal.value; };
            inpVal.onkeydown = (e) => { if (e.key === 'Enter') applyQueryFilters(); };

            row.append(selField, selOp, inpVal, btnRm);
            dom.queryFiltersList.appendChild(row);
        });
    }

    // ── Export CSV ─────────────────────────────────────────────
    function exportToCSV() {
        if (!state.currentRecords || state.currentRecords.length === 0) {
            showToast('No hay registros para exportar', 'error');
            return;
        }

        // 1. Get all unique keys from all objects (in case some fields are missing in some records)
        const allKeys = new Set();
        state.currentRecords.forEach(record => Object.keys(record).forEach(k => allKeys.add(k)));
        const headers = Array.from(allKeys).sort();

        // 2. Map data to CSV rows
        const csvRows = [];
        csvRows.push(headers.join(',')); // Add header row

        for (const row of state.currentRecords) {
            const values = headers.map(header => {
                let cellValue = row[header];
                if (cellValue === null || cellValue === undefined) {
                    cellValue = '';
                } else {
                    cellValue = cellValue.toString();
                }

                // If cell contains comma, newline, or double quote, escape it
                if (cellValue.includes(',') || cellValue.includes('\n') || cellValue.includes('"')) {
                    cellValue = `"${cellValue.replace(/"/g, '""')}"`;
                }
                return cellValue;
            });
            csvRows.push(values.join(','));
        }

        // 3. Create blob and download link
        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `${state.currentDocType.replace(/\s+/g, '_')}_export.csv`);
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showToast('Exportación CSV iniciada', 'success');
    }

    // ── Request Logs Panel ────────────────────────────────────
    function toggleLogsPanel() {
        const pan = dom.logsPanel;
        if (pan.classList.contains('translate-x-full')) {
            pan.classList.remove('translate-x-full');
            renderLogs();
        } else {
            pan.classList.add('translate-x-full');
        }
    }

    function clearLogs() {
        state.requestLogs = [];
        closeLogDetails();
        renderLogs();
    }

    function renderLogs() {
        dom.logsList.innerHTML = '';
        if (state.requestLogs.length === 0) {
            dom.logsList.innerHTML = '<div class="text-center text-editor-subtext text-xs italic mt-10">No hay peticiones registradas aún.</div>';
            return;
        }

        const frag = document.createDocumentFragment();
        state.requestLogs.forEach(l => {
            const div = document.createElement('div');
            const methodColor = l.method === 'GET' ? 'text-blue-400' : (l.method === 'POST' ? 'text-editor-green' : (l.method === 'PUT' ? 'text-editor-yellow' : 'text-editor-red'));
            const statusColor = l.status >= 200 && l.status < 300 ? 'text-editor-green' : (l.status === 0 ? 'text-editor-subtext animate-pulse-soft' : 'text-editor-red');
            
            const isSelected = state.selectedLogId === l.id;
            div.className = `p-2.5 rounded-lg border cursor-pointer transition-colors ${isSelected ? 'bg-editor-surface2 border-editor-accent/40' : 'bg-editor-surface border-editor-border hover:border-editor-subtext/40'}`;
            
            div.innerHTML = `
                <div class="flex items-center justify-between mb-1.5">
                    <div class="flex items-center gap-2">
                        <span class="text-[10px] font-bold ${methodColor} uppercase tracking-wider">${l.method}</span>
                        <span class="text-[10px] font-medium ${statusColor}">${l.status === 0 ? '...' : l.status}</span>
                    </div>
                    <span class="text-[9px] text-editor-subtext">${l.timestamp.toLocaleTimeString()}</span>
                </div>
                <div class="text-[11px] text-editor-text truncate font-mono mb-1.5 opacity-90">${l.url}</div>
                <div class="flex items-center gap-3 text-[10px] text-editor-subtext">
                    <span class="flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>${l.duration}ms</span>
                    ${l.payload ? `<span class="flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>Body</span>` : ''}
                </div>
            `;
            
            div.onclick = () => openLogDetails(l);
            frag.appendChild(div);
        });
        dom.logsList.appendChild(frag);
    }

    function openLogDetails(log) {
        state.selectedLogId = log.id;
        renderLogs(); // Re-render to show active styling
        
        dom.logDetailsPanel.classList.remove('hidden');
        dom.logDetailsPanel.classList.add('flex');
        
        let content = '';
        if (log.payload) {
            content += '----- REQUEST PAYLOAD -----\\n';
            try {
                content += syntaxHighlightJSON(JSON.stringify(JSON.parse(log.payload), null, 2)) + '\\n\\n';
            } catch {
                content += log.payload + '\\n\\n';
            }
        }
        
        content += '----- RESPONSE BODY (Status: ' + log.status + ') -----\\n';
        if (log.response) {
            content += syntaxHighlightJSON(log.response);
        } else if (log.error) {
            content += '<span class="text-editor-red">' + log.error + '</span>';
        } else {
            content += 'No response body';
        }

        // we use raw HTML to get the styling from syntaxHighlightJSON
        dom.logDetailsContent.innerHTML = content;
    }

    function closeLogDetails() {
        state.selectedLogId = null;
        dom.logDetailsPanel.classList.add('hidden');
        dom.logDetailsPanel.classList.remove('flex');
        renderLogs(); // Unselect
    }

    function copyLogDetails() {
        if (!state.selectedLogId) return;
        const log = state.requestLogs.find(l => l.id === state.selectedLogId);
        if (!log) return;
        copyToClipboard(log.response || log.error || 'No body', dom.btnCopyLog);
    }

    // ── Comments Sub-Modal ──────────────────────────────────────
    function closeCommentsModal() {
        dom.commentsModal.classList.add('hidden');
        dom.commentsModal.classList.remove('flex');
    }

    async function openCommentsModal(recordName) {
        dom.commentsModal.classList.remove('hidden');
        dom.commentsModal.classList.add('flex');
        
        dom.commentsSubtitle.textContent = `Buscando mensajes para ${recordName}...`;
        dom.commentsBody.innerHTML = '<div class="loader mx-auto my-8"></div>';

        try {
            const filters = `[["reference_doctype","=","${state.currentDocType}"],["reference_name","=","${recordName}"]]`;
            const url = `/api/resource/Comment?fields=["content","creation","owner"]&filters=${encodeURIComponent(filters)}&order_by=creation desc`;
            
            const res = await apiFetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            
            const data = await res.json();
            const comments = data.data || [];

            dom.commentsSubtitle.textContent = `${comments.length} mensaje(s) · ${recordName}`;

            if (comments.length === 0) {
                dom.commentsBody.innerHTML = `
                    <div class="text-center py-10 opacity-70">
                        <div class="text-4xl mb-3">📭</div>
                        <p class="text-editor-subtext font-medium text-sm">No hay mensajes o comentarios asociados a este registro.</p>
                    </div>
                `;
                return;
            }

            let html = '<div class="flex flex-col gap-3">';
            comments.forEach(c => {
                const date = new Date(c.creation).toLocaleString() || c.creation;
                
                // Safe content to prevent basic XSS
                const div = document.createElement('div');
                div.innerHTML = c.content;
                const safeContent = div.textContent || div.innerText || '';

                html += `
                    <div class="bg-editor-surface shadow-sm border border-editor-border rounded-lg p-4 relative group">
                        <div class="flex justify-between items-center mb-2 pb-2 border-b border-editor-border/40">
                            <span class="text-xs font-bold text-editor-accent2 flex items-center gap-1.5">
                                <span class="w-2 h-2 rounded-full bg-editor-accent2"></span>
                                ${c.owner}
                            </span>
                            <span class="text-[10px] text-editor-subtext opacity-80">${date}</span>
                        </div>
                        <div class="text-sm text-editor-text/90 whitespace-pre-wrap leading-relaxed">${safeContent}</div>
                    </div>
                `;
            });
            html += '</div>';

            dom.commentsBody.innerHTML = html;

        } catch (err) {
            console.error(err);
            dom.commentsSubtitle.textContent = `Error al cargar`;
            dom.commentsBody.innerHTML = `<p class="text-editor-red text-center py-4 bg-editor-red/10 rounded-lg">Error: ${err.message}</p>`;
        }
    }

    // ── API Test Suite ──────────────────────────────────────────
    function openTestsModal() {
        dom.testsModal.classList.remove('hidden');
        dom.testsModal.classList.add('flex');
        renderTestsList();
        
        if (state.apiTests.length > 0 && !state.selectedTestId) {
            selectTest(state.apiTests[0].id);
        } else if (state.selectedTestId) {
            selectTest(state.selectedTestId);
        } else {
            showTestEmptyState();
        }
    }

    function closeTestsModal() {
        dom.testsModal.classList.add('hidden');
        dom.testsModal.classList.remove('flex');
    }

    function renderTestsList() {
        dom.testsList.innerHTML = '';
        if (state.apiTests.length === 0) {
            dom.testsList.innerHTML = '<div class="text-xs text-center text-editor-subtext p-4 italic">No hay tests.</div>';
            return;
        }
        
        const frag = document.createDocumentFragment();
        state.apiTests.forEach((t, index) => {
            const div = document.createElement('div');
            const isActive = state.selectedTestId === t.id;
            const methodColor = t.method === 'GET' ? 'text-blue-400' : (t.method === 'POST' ? 'text-editor-green' : (t.method === 'PUT' ? 'text-editor-yellow' : 'text-editor-red'));
            
            div.className = `p-2 rounded cursor-pointer transition-colors group flex justify-between items-center ${isActive ? 'bg-editor-surface2 text-editor-text' : 'text-editor-subtext hover:bg-editor-surface2 hover:text-editor-text'}`;
            
            div.innerHTML = `
                <div class="flex-1 min-w-0 pr-2">
                    <div class="text-[11px] font-bold truncate">${escapeHtml(t.name)}</div>
                    <div class="text-[9px] font-mono mt-0.5 truncate flex gap-1.5 opacity-80">
                        <span class="${methodColor}">${t.method}</span>
                        <span>/${escapeHtml(t.endpoint || t.doctype || '')}</span>
                    </div>
                </div>
                <button class="btn-delete-test opacity-0 group-hover:opacity-100 text-editor-red hover:bg-editor-red/10 p-1 rounded" data-id="${t.id}" title="Eliminar Test">
                    <svg class="w-3 h-3 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
            `;
            
            div.onclick = (e) => {
                if (e.target.closest('.btn-delete-test')) {
                    deleteTest(t.id);
                } else {
                    selectTest(t.id);
                }
            };
            frag.appendChild(div);
        });
        dom.testsList.appendChild(frag);
    }

    function showTestEmptyState() {
        state.selectedTestId = null;
        dom.testConfigurator.classList.add('hidden');
        dom.testConfigurator.classList.remove('flex');
        dom.testEmptyState.classList.remove('hidden');
        dom.testEmptyState.classList.add('flex');
        renderTestsList();
    }

    function selectTest(id) {
        const test = state.apiTests.find(t => t.id === id);
        if (!test) return showTestEmptyState();
        
        state.selectedTestId = id;
        
        dom.testInputName.value = test.name || '';
        dom.testInputMethod.value = test.method || 'GET';
        dom.testInputDoctype.value = test.endpoint || test.doctype || '';
        dom.testInputBody.value = test.body || '';
        dom.testAssertStatus.value = test.assertStatus || '200';
        dom.testAssertBody.value = test.assertBody || '';
        
        dom.testConfigurator.classList.remove('hidden');
        dom.testConfigurator.classList.add('flex');
        dom.testEmptyState.classList.add('hidden');
        dom.testEmptyState.classList.remove('flex');
        
        renderTestsList();
    }

    function createNewTest() {
        const newTest = {
            id: 'test_' + Date.now(),
            name: 'Nuevo Test',
            method: 'GET',
            endpoint: '',
            body: '',
            assertStatus: '200',
            assertBody: ''
        };
        state.apiTests.push(newTest);
        saveApiTests();
        selectTest(newTest.id);
    }

    function saveCurrentTest() {
        if (!state.selectedTestId) return;
        const testIndex = state.apiTests.findIndex(t => t.id === state.selectedTestId);
        if (testIndex === -1) return;
        
        state.apiTests[testIndex] = {
            ...state.apiTests[testIndex],
            name: dom.testInputName.value.trim() || 'Sin Nombre',
            method: dom.testInputMethod.value,
            endpoint: dom.testInputDoctype.value.trim(),
            body: dom.testInputBody.value.trim(),
            assertStatus: dom.testAssertStatus.value.trim(),
            assertBody: dom.testAssertBody.value.trim()
        };
        
        saveApiTests();
        renderTestsList();
        showToast('Test guardado', 'success');
    }

    function deleteTest(id) {
        if (!confirm('¿Eliminar este test?')) return;
        state.apiTests = state.apiTests.filter(t => t.id !== id);
        saveApiTests();
        if (state.selectedTestId === id) showTestEmptyState();
        renderTestsList();
    }

    function saveApiTests() {
        localStorage.setItem('fapi_api_tests', JSON.stringify(state.apiTests));
    }

    async function runAllTests() {
        if (state.apiTests.length === 0) {
            showToast('No hay tests que ejecutar', 'error');
            return;
        }

        dom.testRunLogs.classList.remove('hidden');
        dom.testRunLogs.classList.add('flex');
        dom.testRunOutput.innerHTML = '<div class="text-editor-text mb-4">▶ INICIANDO SUITE DE TESTS...</div>';
        
        let passed = 0;
        let failed = 0;

        for (let i = 0; i < state.apiTests.length; i++) {
            const test = state.apiTests[i];
            const logEntry = document.createElement('div');
            logEntry.className = 'mb-4 border-l-2 pl-3 pb-1';
            
            const methodColor = test.method === 'GET' ? 'text-blue-400' : (test.method === 'POST' ? 'text-editor-green' : (test.method === 'PUT' ? 'text-editor-yellow' : 'text-editor-red'));
            
            logEntry.innerHTML = `<div class="font-bold text-editor-text">⏳ EJECUTANDO [${i+1}/${state.apiTests.length}]: ${escapeHtml(test.name)}</div>
                                  <div class="text-[10px]"><span class="${methodColor}">${test.method}</span> /api/${escapeHtml(test.endpoint)}</div>`;
            
            dom.testRunOutput.appendChild(logEntry);
            
            // Scroll to bottom
            dom.testRunOutput.scrollTop = dom.testRunOutput.scrollHeight;

            let isSuccess = false;
            let errorMsg = '';
            
            try {
                const startTime = Date.now();
                const url = '/api/' + (test.endpoint || test.doctype || '');
                const options = {
                    method: test.method,
                    headers: { 'Content-Type': 'application/json' }
                };
                
                if (test.method !== 'GET' && test.method !== 'HEAD' && test.body) {
                    options.body = test.body;
                }
                
                const res = await apiFetch(url, options);
                let textBody = '';
                try {
                    textBody = await res.text();
                } catch(e) {}
                
                const expStatus = parseInt(test.assertStatus || '200', 10);
                let expectsMet = true;
                const msgs = [];
                
                if (res.status === expStatus) {
                    msgs.push(`<span class="text-editor-green">✓ Status ${res.status} coincide con el esperado (${expStatus})</span>`);
                } else {
                    expectsMet = false;
                    msgs.push(`<span class="text-editor-red">✗ Status ${res.status} NO coincide con el esperado (${expStatus})</span>`);
                }
                
                if (test.assertBody) {
                    if (textBody.includes(test.assertBody)) {
                        msgs.push(`<span class="text-editor-green">✓ Body contiene validación "${escapeHtml(test.assertBody)}"</span>`);
                    } else {
                        expectsMet = false;
                        msgs.push(`<span class="text-editor-red">✗ Body NO contiene validación "${escapeHtml(test.assertBody)}"</span>`);
                    }
                }
                
                if (expectsMet) {
                    isSuccess = true;
                    logEntry.classList.add('border-editor-green');
                    logEntry.innerHTML += `<div class="mt-1">${msgs.join('<br>')}</div><div class="font-bold text-editor-green mt-1">✅ TEST PASADO (${Date.now() - startTime}ms)</div>`;
                    passed++;
                } else {
                    logEntry.classList.add('border-editor-red');
                    logEntry.innerHTML += `<div class="mt-1">${msgs.join('<br>')}</div><div class="font-bold text-editor-red mt-1">❌ TEST FALLIDO (${Date.now() - startTime}ms)</div>`;
                    failed++;
                }
                
            } catch (err) {
                logEntry.classList.add('border-editor-red');
                logEntry.innerHTML += `<div class="text-editor-red mt-1">Error Fatal: ${escapeHtml(err.message)}</div><div class="font-bold text-editor-red mt-1">❌ TEST FALLIDO</div>`;
                failed++;
            }
        }
        
        const sumDiv = document.createElement('div');
        sumDiv.className = `mt-6 pt-4 border-t border-editor-border text-xs font-bold ${failed === 0 ? 'text-editor-green' : 'text-editor-red'}`;
        sumDiv.innerHTML = `🏁 SUITE COMPLETADA: ${passed} pasados, ${failed} fallidos.`;
        dom.testRunOutput.appendChild(sumDiv);
        dom.testRunOutput.scrollTop = dom.testRunOutput.scrollHeight;
    }

    // ── Global Search (Cmd+K) ──────────────────────────────────
    function openGlobalSearch() {
        if (!state.connected) {
            showToast('Conéctate primero para buscar.', 'warning');
            return;
        }
        dom.searchModal.classList.remove('hidden');
        dom.searchModal.classList.add('flex');
        dom.searchInput.value = '';
        state.globalSearchResults = [];
        state.globalSearchIndex = -1;
        renderGlobalSearchResults();
        setTimeout(() => dom.searchInput.focus(), 50);
    }

    function closeGlobalSearch() {
        dom.searchModal.classList.add('hidden');
        dom.searchModal.classList.remove('flex');
    }

    async function handleGlobalSearchInput() {
        const query = dom.searchInput.value.trim();
        state.globalSearchIndex = -1;
        
        if (!query) {
            state.globalSearchResults = [];
            renderGlobalSearchResults();
            return;
        }

        if (query.startsWith('>')) {
            // Busqueda remota de DocFields
            const fieldQuery = query.substring(1).trim();
            if (fieldQuery.length < 2) {
                dom.searchResults.innerHTML = '<div class="p-4 text-center text-xs text-editor-subtext">Escribe al menos 2 letras...</div>';
                return;
            }
            
            dom.searchResults.innerHTML = '<div class="p-4 flex justify-center"><div class="loader"></div></div>'; // Need styling for loader or simple text
            try {
                const filters = `[["fieldname","like","%${fieldQuery}%"]]`;
                const url = `/api/resource/DocField?fields=["parent","fieldname","label","fieldtype"]&filters=${encodeURIComponent(filters)}&limit_page_length=20`;
                const res = await apiFetch(url);
                if (!res.ok) throw new Error();
                const data = await res.json();
                
                state.globalSearchResults = (data.data || []).map(f => ({
                    type: 'field',
                    title: f.fieldname,
                    subtitle: f.label ? `Label: ${f.label}` : f.fieldtype,
                    parent: f.parent,
                    icon: '⊡'
                }));
            } catch (err) {
                state.globalSearchResults = [{ type: 'error', title: 'Error buscando campos', parent: '' }];
            }
            renderGlobalSearchResults();
        } else {
            // Búsqueda local de DocTypes
            const q = query.toLowerCase();
            const matches = state.allDocTypes.filter(d => d.toLowerCase().includes(q));
            
            state.globalSearchResults = matches.slice(0, 20).map(d => ({
                type: 'doctype',
                title: d,
                parent: d,
                icon: '📄'
            }));
            renderGlobalSearchResults();
        }
    }

    function renderGlobalSearchResults() {
        dom.searchResults.innerHTML = '';
        
        if (state.globalSearchResults.length === 0 && dom.searchInput.value.trim().length > 0) {
            dom.searchResults.innerHTML = '<div class="p-4 text-center text-xs text-editor-subtext">No hay resultados.</div>';
            return;
        }

        state.globalSearchResults.forEach((item, index) => {
            const div = document.createElement('div');
            const isActive = index === state.globalSearchIndex;
            div.className = `flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${isActive ? 'bg-editor-surface2' : 'hover:bg-editor-surface2/50'}`;
            
            if (item.type === 'doctype') {
                div.innerHTML = `
                    <div class="flex items-center gap-3">
                        <span class="w-6 h-6 rounded bg-editor-accent/10 text-editor-accent flex items-center justify-center text-[10px]">${item.icon}</span>
                        <span class="text-sm font-semibold text-editor-text">${escapeHtml(item.title)}</span>
                    </div>
                    <span class="text-[10px] text-editor-subtext uppercase font-bold tracking-wider">DocType</span>
                `;
            } else if (item.type === 'field') {
                div.innerHTML = `
                    <div class="flex items-center gap-3">
                        <span class="w-6 h-6 rounded bg-editor-green/10 text-editor-green flex items-center justify-center text-[10px]">${item.icon}</span>
                        <div class="flex flex-col">
                            <span class="text-sm font-semibold text-editor-text font-mono">${escapeHtml(item.title)}</span>
                            <span class="text-[10px] text-editor-subtext/70">${escapeHtml(item.subtitle)}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-[10px] border border-editor-border bg-editor-surface px-2 py-0.5 rounded text-editor-subtext truncate max-w-[150px]">${escapeHtml(item.parent)}</span>
                    </div>
                `;
            } else if (item.type === 'error') {
                div.innerHTML = `<span class="text-sm text-editor-red">${escapeHtml(item.title)}</span>`;
            }
            
            div.onclick = () => selectGlobalSearchResult(index);
            dom.searchResults.appendChild(div);
        });
    }

    function handleGlobalSearchKeys(e) {
        if (state.globalSearchResults.length === 0) return;
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            state.globalSearchIndex = (state.globalSearchIndex + 1) % state.globalSearchResults.length;
            renderGlobalSearchResults();
            scrollToActiveResult();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            state.globalSearchIndex = (state.globalSearchIndex - 1 + state.globalSearchResults.length) % state.globalSearchResults.length;
            renderGlobalSearchResults();
            scrollToActiveResult();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (state.globalSearchIndex >= 0) {
                selectGlobalSearchResult(state.globalSearchIndex);
            } else if (state.globalSearchResults.length > 0) {
                selectGlobalSearchResult(0);
            }
        }
    }

    function scrollToActiveResult() {
        const active = dom.searchResults.children[state.globalSearchIndex];
        if (active) {
            active.scrollIntoView({ block: 'nearest' });
        }
    }

    function selectGlobalSearchResult(index) {
        const item = state.globalSearchResults[index];
        if (!item) return;
        
        closeGlobalSearch();
        
        if (item.type === 'doctype' || item.type === 'field') {
            switchSidebarTab('explorer');
            selectDocType(item.parent);
            
            // If it's a field, auto-fill the field search
            if (item.type === 'field') {
                dom.inputSearchFields.value = item.title;
                setTimeout(filterFields, 500); // give time to fetch doc
            }
        }
    }

    // ── Sidebar Tabs ──────────────────────────────────────────
    function switchSidebarTab(tabName) {
        // Estilos
        const activeClass = ['text-editor-text', 'border-editor-accent'];
        const inactiveClass = ['text-editor-subtext', 'border-transparent'];
        
        [dom.tabExplorer, dom.tabCollections, dom.tabWebhooks].forEach(t => t.classList.remove(...activeClass, 'hover:text-editor-text'));
        [dom.tabExplorer, dom.tabCollections, dom.tabWebhooks].forEach(t => t.classList.add(...inactiveClass, 'hover:text-editor-text'));

        // Ocultar contenidos
        dom.contentExplorer.classList.add('hidden');
        dom.contentCollections.classList.add('hidden');
        dom.contentWebhooks.classList.add('hidden');

        // Stop polling by default
        stopWebhookPolling();

        if (tabName === 'explorer') {
            dom.tabExplorer.classList.add(...activeClass);
            dom.tabExplorer.classList.remove(...inactiveClass);
            dom.contentExplorer.classList.remove('hidden');
        } else if (tabName === 'collections') {
            dom.tabCollections.classList.add(...activeClass);
            dom.tabCollections.classList.remove(...inactiveClass);
            dom.contentCollections.classList.remove('hidden');
        } else if (tabName === 'webhooks') {
            dom.tabWebhooks.classList.add(...activeClass);
            dom.tabWebhooks.classList.remove(...inactiveClass);
            dom.contentWebhooks.classList.remove('hidden');
            startWebhookPolling();
        }
    }

    // ── Webhooks Tester ────────────────────────────────────────
    let webhookInterval = null;

    function startWebhookPolling() {
        fetchWebhooks();
        webhookInterval = setInterval(fetchWebhooks, 3000);
    }

    function stopWebhookPolling() {
        if (webhookInterval) {
            clearInterval(webhookInterval);
            webhookInterval = null;
        }
    }

    async function fetchWebhooks() {
        try {
            // Nota: Llama directo al propio proxy que sirve la UI, no a la URL de Frappe.
            const res = await fetch('/api/webhook-logs');
            if (!res.ok) return;
            const resJson = await res.json();
            const logs = resJson.data || [];
            
            renderWebhooks(logs);
        } catch (e) {
            // Silently fail if proxy isn't responding
        }
    }

    async function clearWebhooks() {
        try {
            await fetch('/api/webhook-logs', { method: 'DELETE' });
            renderWebhooks([]);
            showToast('Webhooks limpiados', 'success');
        } catch (e) {
            showToast('Error limpiando webhooks', 'error');
        }
    }

    function renderWebhooks(logs) {
        dom.webhookCount.innerText = `${logs.length} logs`;
        dom.webhooksList.innerHTML = '';

        if (logs.length === 0) {
            dom.webhooksEmpty.classList.remove('hidden');
            dom.webhooksEmpty.classList.add('flex');
            return;
        }

        dom.webhooksEmpty.classList.add('hidden');
        dom.webhooksEmpty.classList.remove('flex');

        const frag = document.createDocumentFragment();
        
        logs.forEach(log => {
            const li = document.createElement('li');
            li.className = 'p-3 border-b border-editor-border bg-editor-surface hover:bg-editor-surface2 cursor-pointer transition-colors';
            
            const time = new Date(log.timestamp).toLocaleTimeString();
            const methodColor = log.method === 'POST' ? 'text-editor-green' : (log.method === 'GET' ? 'text-blue-400' : 'text-editor-yellow');

            li.innerHTML = `
                <div class="flex items-center justify-between pointer-events-none">
                    <span class="text-xs font-bold text-editor-text"><span class="${methodColor}">${log.method}</span> ${escapeHtml(log.url)}</span>
                    <span class="text-[9px] text-editor-subtext font-mono">${time}</span>
                </div>
                <div class="mt-1 text-[10px] text-editor-subtext truncate pointer-events-none">
                    ${escapeHtml(log.body).substring(0, 100) || 'Vacío o sin Payload'}
                </div>
            `;
            
            li.onclick = () => {
                showLogDetails({
                    method: log.method,
                    url: log.url,
                    payload: log.body,
                    response: JSON.stringify(log.headers, null, 2), // Mocking headers as response in details view
                    duration: 0,
                    status: '200 OK'
                });
            };

            frag.appendChild(li);
        });
        
        dom.webhooksList.appendChild(frag);
    }

    // ── Helpers ───────────────────────────────────────
    function isMeta(ft) {
        const metaTypes = ['section break', 'column break', 'tab break', 'html', 'fold', 'heading'];
        return metaTypes.includes((ft || '').toLowerCase());
    }

    function getExampleValue(field) {
        const ft = (field.fieldtype || '').toLowerCase();
        const name = (field.fieldname || '').toLowerCase();

        if (ft === 'int')       return 0;
        if (ft === 'float')     return 0.0;
        if (ft === 'currency')  return 0.00;
        if (ft === 'check')     return 0;
        if (ft === 'date')      return '2025-01-01';
        if (ft === 'datetime')  return '2025-01-01 00:00:00';
        if (ft === 'time')      return '00:00:00';
        if (ft === 'select') {
            const opts = (field.options || '').split('\n').filter(Boolean);
            return opts[0] || '';
        }
        if (ft === 'link')      return field.options || '';
        if (ft === 'table')     return [];
        if (ft === 'attach' || ft === 'attach image') return '/path/to/file';

        // Default string-like
        return '';
    }

    function getFieldBadgeClass(fieldtype) {
        const ft = (fieldtype || '').toLowerCase().replace(/\s+/g, '');
        const map = {
            data: 'badge-data', password: 'badge-data',
            link: 'badge-link', dynamiclink: 'badge-link',
            select: 'badge-select',
            int: 'badge-int', float: 'badge-float', currency: 'badge-currency', percent: 'badge-int', rating: 'badge-int',
            check: 'badge-check',
            date: 'badge-date', datetime: 'badge-datetime', time: 'badge-time', duration: 'badge-time',
            table: 'badge-table', tablemultiselect: 'badge-table',
            text: 'badge-text', smalltext: 'badge-smalltext', longtext: 'badge-longtext',
            texteditor: 'badge-texteditor', markdowneditor: 'badge-markdowneditor',
            htmleditor: 'badge-htmleditor', code: 'badge-code',
            attach: 'badge-attach', attachimage: 'badge-attach',
            sectionbreak: 'badge-section', columnbreak: 'badge-column', tabbreak: 'badge-tab',
        };
        return map[ft] || 'badge-default';
    }

    function formatOptions(field) {
        if (!field.options) return '<span class="text-editor-subtext/30">—</span>';
        const ft = (field.fieldtype || '').toLowerCase();
        if (ft === 'link') {
            return `<span class="options-link">${escapeHtml(field.options)}</span>`;
        }
        if (ft === 'select') {
            const opts = field.options.split('\n').filter(Boolean);
            return `<span title="${escapeHtml(field.options)}">${opts.slice(0, 3).map(o => escapeHtml(o)).join(', ')}${opts.length > 3 ? ` +${opts.length - 3}` : ''}</span>`;
        }
        return `<span>${escapeHtml(field.options.substring(0, 40))}${field.options.length > 40 ? '…' : ''}</span>`;
    }

    function syntaxHighlightJSON(json) {
        return json.replace(/("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?|\[|\]|\{|\})/g, (match) => {
            let cls = 'json-number';
            if (/^"/.test(match)) {
                cls = /:$/.test(match) ? 'json-key' : 'json-string';
            } else if (/true|false/.test(match)) {
                cls = 'json-boolean';
            } else if (/null/.test(match)) {
                cls = 'json-null';
            } else if (/[\[\]{}]/.test(match)) {
                cls = 'json-bracket';
            }
            return `<span class="${cls}">${match}</span>`;
        });
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            // Fallback
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        }
    }

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icons = {
            success: '<svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
            error:   '<svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
            info:    '<svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
        };

        toast.innerHTML = `${icons[type] || icons.info}<span>${escapeHtml(message)}</span>`;
        dom.toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    function debounce(fn, ms) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(null, args), ms);
        };
    }

    // ── Export CSV ─────────────────────────────────────────────
    function exportToCSV() {
        if (!state.currentRecords || state.currentRecords.length === 0) {
            showToast('No hay registros para exportar', 'error');
            return;
        }

        // 1. Get all unique keys from all objects (in case some fields are missing in some records)
        const allKeys = new Set();
        state.currentRecords.forEach(record => Object.keys(record).forEach(k => allKeys.add(k)));
        const headers = Array.from(allKeys).sort();

        // 2. Map data to CSV rows
        const csvRows = [];
        csvRows.push(headers.join(',')); // Add header row

        for (const row of state.currentRecords) {
            const values = headers.map(header => {
                let cellValue = row[header];
                if (cellValue === null || cellValue === undefined) {
                    cellValue = '';
                } else {
                    cellValue = cellValue.toString();
                }

                // If cell contains comma, newline, or double quote, escape it
                if (cellValue.includes(',') || cellValue.includes('\n') || cellValue.includes('"')) {
                    cellValue = `"${cellValue.replace(/"/g, '""')}"`;
                }
                return cellValue;
            });
            csvRows.push(values.join(','));
        }

        // 3. Create blob and download link
        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `${state.currentDocType.replace(/\s+/g, '_')}_export.csv`);
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showToast('Exportación CSV iniciada', 'success');
    }

    // ── Request Logs Panel ────────────────────────────────────
    function toggleLogsPanel() {
        const pan = dom.logsPanel;
        if (pan.classList.contains('translate-x-full')) {
            pan.classList.remove('translate-x-full');
            renderLogs();
        } else {
            pan.classList.add('translate-x-full');
        }
    }

    function clearLogs() {
        state.requestLogs = [];
        closeLogDetails();
        renderLogs();
    }

    function renderLogs() {
        dom.logsList.innerHTML = '';
        if (state.requestLogs.length === 0) {
            dom.logsList.innerHTML = '<div class="text-center text-editor-subtext text-xs italic mt-10">No hay peticiones registradas aún.</div>';
            return;
        }

        const frag = document.createDocumentFragment();
        state.requestLogs.forEach(l => {
            const div = document.createElement('div');
            const methodColor = l.method === 'GET' ? 'text-blue-400' : (l.method === 'POST' ? 'text-editor-green' : (l.method === 'PUT' ? 'text-editor-yellow' : 'text-editor-red'));
            const statusColor = l.status >= 200 && l.status < 300 ? 'text-editor-green' : (l.status === 0 ? 'text-editor-subtext animate-pulse-soft' : 'text-editor-red');
            
            const isSelected = state.selectedLogId === l.id;
            div.className = `p-2.5 rounded-lg border cursor-pointer transition-colors ${isSelected ? 'bg-editor-surface2 border-editor-accent/40' : 'bg-editor-surface border-editor-border hover:border-editor-subtext/40'}`;
            
            div.innerHTML = `
                <div class="flex items-center justify-between mb-1.5">
                    <div class="flex items-center gap-2">
                        <span class="text-[10px] font-bold ${methodColor} uppercase tracking-wider">${l.method}</span>
                        <span class="text-[10px] font-medium ${statusColor}">${l.status === 0 ? '...' : l.status}</span>
                    </div>
                    <span class="text-[9px] text-editor-subtext">${l.timestamp.toLocaleTimeString()}</span>
                </div>
                <div class="text-[11px] text-editor-text truncate font-mono mb-1.5 opacity-90">${l.url}</div>
                <div class="flex items-center gap-3 text-[10px] text-editor-subtext">
                    <span class="flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>${l.duration}ms</span>
                    ${l.payload ? `<span class="flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>Body</span>` : ''}
                </div>
            `;
            
            div.onclick = () => openLogDetails(l);
            frag.appendChild(div);
        });
        dom.logsList.appendChild(frag);
    }

    function openLogDetails(log) {
        state.selectedLogId = log.id;
        renderLogs(); // Re-render to show active styling
        
        dom.logDetailsPanel.classList.remove('hidden');
        dom.logDetailsPanel.classList.add('flex');
        
        let content = '';
        if (log.payload) {
            content += '----- REQUEST PAYLOAD -----\\n';
            try {
                content += syntaxHighlightJSON(JSON.stringify(JSON.parse(log.payload), null, 2)) + '\\n\\n';
            } catch {
                content += log.payload + '\\n\\n';
            }
        }
        
        content += '----- RESPONSE BODY (Status: ' + log.status + ') -----\\n';
        if (log.response) {
            content += syntaxHighlightJSON(log.response);
        } else if (log.error) {
            content += '<span class="text-editor-red">' + log.error + '</span>';
        } else {
            content += 'No response body';
        }

        // we use raw HTML to get the styling from syntaxHighlightJSON
        dom.logDetailsContent.innerHTML = content;
    }

    function closeLogDetails() {
        state.selectedLogId = null;
        dom.logDetailsPanel.classList.add('hidden');
        dom.logDetailsPanel.classList.remove('flex');
        renderLogs(); // Unselect
    }

    function copyLogDetails() {
        if (!state.selectedLogId) return;
        const log = state.requestLogs.find(l => l.id === state.selectedLogId);
        if (!log) return;
        copyToClipboard(log.response || log.error || 'No body', dom.btnCopyLog);
    }

    // ── Comments Sub-Modal ──────────────────────────────────────
    function closeCommentsModal() {
        dom.commentsModal.classList.add('hidden');
        dom.commentsModal.classList.remove('flex');
    }

    async function openCommentsModal(recordName) {
        dom.commentsModal.classList.remove('hidden');
        dom.commentsModal.classList.add('flex');
        
        dom.commentsSubtitle.textContent = `Buscando mensajes para ${recordName}...`;
        dom.commentsBody.innerHTML = '<div class="loader mx-auto my-8"></div>';

        try {
            const filters = `[["reference_doctype","=","${state.currentDocType}"],["reference_name","=","${recordName}"]]`;
            const url = `/api/resource/Comment?fields=["content","creation","owner"]&filters=${encodeURIComponent(filters)}&order_by=creation desc`;
            
            const res = await apiFetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            
            const data = await res.json();
            const comments = data.data || [];

            dom.commentsSubtitle.textContent = `${comments.length} mensaje(s) · ${recordName}`;

            if (comments.length === 0) {
                dom.commentsBody.innerHTML = `
                    <div class="text-center py-10 opacity-70">
                        <div class="text-4xl mb-3">📭</div>
                        <p class="text-editor-subtext font-medium text-sm">No hay mensajes o comentarios asociados a este registro.</p>
                    </div>
                `;
                return;
            }

            let html = '<div class="flex flex-col gap-3">';
            comments.forEach(c => {
                const date = new Date(c.creation).toLocaleString() || c.creation;
                
                // Safe content to prevent basic XSS
                const div = document.createElement('div');
                div.innerHTML = c.content;
                const safeContent = div.textContent || div.innerText || '';

                html += `
                    <div class="bg-editor-surface shadow-sm border border-editor-border rounded-lg p-4 relative group">
                        <div class="flex justify-between items-center mb-2 pb-2 border-b border-editor-border/40">
                            <span class="text-xs font-bold text-editor-accent2 flex items-center gap-1.5">
                                <span class="w-2 h-2 rounded-full bg-editor-accent2"></span>
                                ${c.owner}
                            </span>
                            <span class="text-[10px] text-editor-subtext opacity-80">${date}</span>
                        </div>
                        <div class="text-sm text-editor-text/90 whitespace-pre-wrap leading-relaxed">${safeContent}</div>
                    </div>
                `;
            });
            html += '</div>';

            dom.commentsBody.innerHTML = html;

        } catch (err) {
            console.error(err);
            dom.commentsSubtitle.textContent = `Error al cargar`;
            dom.commentsBody.innerHTML = `<p class="text-editor-red text-center py-4 bg-editor-red/10 rounded-lg">Error: ${err.message}</p>`;
        }
    }

    // ── Saved Collections Logic ────────────────────────────────────
    function switchSidebarTab(tab) {
        // Reset all
        dom.contentExplorer.classList.add('hidden');
        dom.contentExplorer.classList.remove('flex');
        dom.contentCollections.classList.add('hidden');
        dom.contentCollections.classList.remove('flex');
        dom.contentWebhooks.classList.add('hidden');
        dom.contentWebhooks.classList.remove('flex');
        
        dom.tabExplorer.className = 'flex-1 py-2.5 text-[11px] font-semibold text-editor-subtext border-b-2 border-transparent hover:text-editor-text transition-colors';
        dom.tabCollections.className = 'flex-1 py-2.5 text-[11px] font-semibold text-editor-subtext border-b-2 border-transparent hover:text-editor-text transition-colors';
        dom.tabWebhooks.className = 'flex-1 py-2.5 text-[11px] font-semibold text-editor-subtext border-b-2 border-transparent hover:text-editor-text transition-colors';
        
        stopWebhookPolling();

        if (tab === 'explorer') {
            dom.tabExplorer.className = 'flex-1 py-2.5 text-[11px] font-semibold text-editor-text border-b-2 border-editor-accent transition-colors';
            dom.contentExplorer.classList.remove('hidden');
            dom.contentExplorer.classList.add('flex');
        } else if (tab === 'collections') {
            dom.tabCollections.className = 'flex-1 py-2.5 text-[11px] font-semibold text-editor-text border-b-2 border-editor-accent transition-colors';
            dom.contentCollections.classList.remove('hidden');
            dom.contentCollections.classList.add('flex');
            renderCollectionsList();
        } else if (tab === 'webhooks') {
            dom.tabWebhooks.className = 'flex-1 py-2.5 text-[11px] font-semibold text-editor-text border-b-2 border-editor-accent transition-colors';
            dom.contentWebhooks.classList.remove('hidden');
            dom.contentWebhooks.classList.add('flex');
            fetchWebhooks();
            startWebhookPolling();
        }
    }

    // ── Webhooks Logic ────────────────────────────────────────
    let webhookPollInterval = null;

    function startWebhookPolling() {
        if (!webhookPollInterval) {
            webhookPollInterval = setInterval(fetchWebhooks, 3000); // 3 sec polling
        }
    }

    function stopWebhookPolling() {
        if (webhookPollInterval) {
            clearInterval(webhookPollInterval);
            webhookPollInterval = null;
        }
    }

    async function fetchWebhooks() {
        try {
            const btn = dom.btnRefreshWebhooks.querySelector('svg');
            if(btn) btn.classList.add('animate-spin');
            
            const res = await fetch('/api/webhook-logs');
            if(!res.ok) return;
            const data = await res.json();
            renderWebhooks(data.data || []);
            
            if(btn) setTimeout(() => btn.classList.remove('animate-spin'), 500);
        } catch (err) {
            console.error('Webhook fetch error:', err);
        }
    }

    async function clearWebhooks() {
        if(!confirm('¿Limpiar todos los webhooks?')) return;
        try {
            await fetch('/api/webhook-logs', { method: 'DELETE' });
            renderWebhooks([]);
            showToast('Webhooks limpiados', 'success');
        } catch (err) {
            showToast('Error limpiando webhooks', 'error');
        }
    }

    function renderWebhooks(logs) {
        dom.webhookCount.textContent = `${logs.length} logs`;
        dom.webhooksList.innerHTML = '';
        
        if (logs.length === 0) {
            dom.webhooksEmpty.classList.remove('hidden');
            dom.webhooksEmpty.classList.add('flex');
            return;
        }
        
        dom.webhooksEmpty.classList.add('hidden');
        dom.webhooksEmpty.classList.remove('flex');
        
        const frag = document.createDocumentFragment();
        logs.forEach(log => {
            const li = document.createElement('li');
            li.className = 'border-b border-editor-border p-3 hover:bg-editor-surface2 cursor-pointer transition-colors';
            
            const methodColor = log.method === 'POST' ? 'text-editor-green' : (log.method === 'GET' ? 'text-blue-400' : 'text-editor-yellow');
            
            li.innerHTML = `
                <div class="flex justify-between items-start mb-1">
                    <div class="flex items-center gap-1.5 font-mono text-[10px]">
                        <span class="${methodColor} font-bold">${log.method}</span>
                        <span class="text-editor-text flex-1 truncate max-w-[150px]">${escapeHtml(log.url)}</span>
                    </div>
                    <span class="text-editor-subtext text-[9px]">${new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
                <div class="mt-1.5 text-[10px] text-editor-subtext line-clamp-2 truncate break-all opacity-80 font-mono">
                    ${escapeHtml(log.body || '{}')}
                </div>
            `;
            
            li.addEventListener('click', () => {
                showWebhookDetails(log);
            });
            
            frag.appendChild(li);
        });
        
        dom.webhooksList.appendChild(frag);
    }
    
    function showWebhookDetails(log) {
        const prettyHeaders = JSON.stringify(log.headers, null, 2);
        let prettyBody = log.body;
        try {
            prettyBody = JSON.stringify(JSON.parse(log.body), null, 2);
        } catch(e) {}
        
        const content = `// 🕒 ${new Date(log.timestamp).toLocaleString()}
// 🎯 METHOD: ${log.method}
// 📡 URL: ${log.url}

// ── HEADERS ──
${prettyHeaders}

// ── BODY ──
${prettyBody}`;

        openPayloadModal(`Webhook ID: ${log.id}`, content);
    }

    function renderCollectionsList() {
        dom.collectionsList.innerHTML = '';
        if (state.savedCollections.length === 0) {
            dom.collectionsEmpty.classList.remove('hidden');
            dom.collectionsEmpty.classList.add('flex');
            return;
        }
        dom.collectionsEmpty.classList.add('hidden');
        dom.collectionsEmpty.classList.remove('flex');

        const frag = document.createDocumentFragment();
        state.savedCollections.forEach((col, index) => {
            const li = document.createElement('li');
            li.className = 'px-4 py-3 border-b border-editor-border/50 hover:bg-editor-surface/50 transition-colors cursor-pointer group flex items-center justify-between';
            
            const info = document.createElement('div');
            info.className = 'flex-1 min-w-0 pr-2';
            info.innerHTML = `
                <h4 class="text-xs font-semibold text-editor-text truncate mb-0.5">${escapeHtml(col.name)}</h4>
                <p class="text-[10px] text-editor-subtext truncate">${escapeHtml(col.docType)}</p>
            `;

            info.addEventListener('click', () => loadCollection(col));

            const btnDelete = document.createElement('button');
            btnDelete.className = 'p-1.5 rounded-md text-editor-subtext hover:text-editor-red hover:bg-editor-red/10 animate-fade-in opacity-0 group-hover:opacity-100 transition-all focus:outline-none';
            btnDelete.innerHTML = '<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>';
            btnDelete.title = 'Eliminar Colección';
            btnDelete.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteCollection(index);
            });

            li.appendChild(info);
            li.appendChild(btnDelete);
            frag.appendChild(li);
        });
        dom.collectionsList.appendChild(frag);
    }

    function openSaveCollectionModal() {
        if (!state.currentDocType) return;
        dom.inputCollectionName.value = '';
        dom.saveCollectionModal.classList.remove('hidden');
        dom.saveCollectionModal.classList.add('flex');
        setTimeout(() => dom.inputCollectionName.focus(), 50);
    }

    function closeSaveCollectionModal() {
        dom.saveCollectionModal.classList.add('hidden');
        dom.saveCollectionModal.classList.remove('flex');
    }

    function confirmSaveCollection() {
        const name = dom.inputCollectionName.value.trim();
        if (!name) {
            showToast('Escribe un nombre para la colección', 'error');
            return;
        }

        // Get current values from create/edit form
        const inputs = dom.createModalBody.querySelectorAll('[data-fieldname]');
        const body = {};
        let hasData = false;
        
        inputs.forEach(input => {
            const fname = input.dataset.fieldname;
            const ftype = input.dataset.fieldtype;

            let val;
            if (ftype === 'check') val = input.checked ? 1 : 0;
            else val = input.value.trim();

            if (val !== '' && val !== null) {
                if (input.dataset.isJson) {
                    try { val = JSON.parse(val); } catch { /* keep str */ }
                }
                body[fname] = val;
                hasData = true;
            }
        });

        if (!hasData) {
            showToast('El formulario está vacío, no hay nada que guardar', 'warning');
            return;
        }

        state.savedCollections.push({
            id: Date.now().toString(),
            name: name,
            docType: state.currentDocType,
            payload: body,
            createdAt: new Date().toISOString()
        });
        
        localStorage.setItem('fapi_collections', JSON.stringify(state.savedCollections));
        
        closeSaveCollectionModal();
        showToast('Colección guardada correctamente', 'success');
        
        if (!dom.contentCollections.classList.contains('hidden')) {
            renderCollectionsList();
        }
    }

    function loadCollection(col) {
        if (state.currentDocType !== col.docType) {
            showToast(`Cambia al DocType "${col.docType}" en el Explorador primero para usar esta colección.`, 'warning');
            switchSidebarTab('explorer');
            return;
        }
        
        if (dom.createModal.classList.contains('hidden')) {
            openCreateModal();
        }
        
        const inputs = dom.createModalBody.querySelectorAll('[data-fieldname]');
        let injected = 0;
        
        inputs.forEach(input => {
            const fname = input.dataset.fieldname;
            const ftype = input.dataset.fieldtype;
            const val = col.payload[fname];
            
            if (val !== undefined && val !== null) {
                if (ftype === 'check') {
                    input.checked = (val == 1 || val === true);
                } else if (input.dataset.isJson) {
                    input.value = typeof val === 'object' ? JSON.stringify(val, null, 2) : val;
                } else {
                    input.value = val;
                }
                injected++;
            }
        });
        
        showToast(`Inyectados ${injected} campos base a la petición`, 'success');
    }

    function deleteCollection(index) {
        if (confirm('¿Seguro que quieres eliminar esta colección guardada?')) {
            state.savedCollections.splice(index, 1);
            localStorage.setItem('fapi_collections', JSON.stringify(state.savedCollections));
            renderCollectionsList();
            showToast('Colección eliminada', 'success');
        }
    }

    // ── Helpers ───────────────────────────────────────
    function isMeta(ft) {
        const metaTypes = ['section break', 'column break', 'tab break', 'html', 'fold', 'heading'];
        return metaTypes.includes((ft || '').toLowerCase());
    }

    function getExampleValue(field) {
        const ft = (field.fieldtype || '').toLowerCase();
        const name = (field.fieldname || '').toLowerCase();

        if (ft === 'int')       return 0;
        if (ft === 'float')     return 0.0;
        if (ft === 'currency')  return 0.00;
        if (ft === 'check')     return 0;
        if (ft === 'date')      return '2025-01-01';
        if (ft === 'datetime')  return '2025-01-01 00:00:00';
        if (ft === 'time')      return '00:00:00';
        if (ft === 'select') {
            const opts = (field.options || '').split('\n').filter(Boolean);
            return opts[0] || '';
        }
        if (ft === 'link')      return field.options || '';
        if (ft === 'table')     return [];
        if (ft === 'attach' || ft === 'attach image') return '/path/to/file';

        // Default string-like
        return '';
    }

    function getFieldBadgeClass(fieldtype) {
        const ft = (fieldtype || '').toLowerCase().replace(/\s+/g, '');
        const map = {
            data: 'badge-data', password: 'badge-data',
            link: 'badge-link', dynamiclink: 'badge-link',
            select: 'badge-select',
            int: 'badge-int', float: 'badge-float', currency: 'badge-currency', percent: 'badge-int', rating: 'badge-int',
            check: 'badge-check',
            date: 'badge-date', datetime: 'badge-datetime', time: 'badge-time', duration: 'badge-time',
            table: 'badge-table', tablemultiselect: 'badge-table',
            text: 'badge-text', smalltext: 'badge-smalltext', longtext: 'badge-longtext',
            texteditor: 'badge-texteditor', markdowneditor: 'badge-markdowneditor',
            htmleditor: 'badge-htmleditor', code: 'badge-code',
            attach: 'badge-attach', attachimage: 'badge-attach',
            sectionbreak: 'badge-section', columnbreak: 'badge-column', tabbreak: 'badge-tab',
        };
        return map[ft] || 'badge-default';
    }

    function formatOptions(field) {
        if (!field.options) return '<span class="text-editor-subtext/30">—</span>';
        const ft = (field.fieldtype || '').toLowerCase();
        if (ft === 'link') {
            return `<span class="options-link">${escapeHtml(field.options)}</span>`;
        }
        if (ft === 'select') {
            const opts = field.options.split('\n').filter(Boolean);
            return `<span title="${escapeHtml(field.options)}">${opts.slice(0, 3).map(o => escapeHtml(o)).join(', ')}${opts.length > 3 ? ` +${opts.length - 3}` : ''}</span>`;
        }
        return `<span>${escapeHtml(field.options.substring(0, 40))}${field.options.length > 40 ? '…' : ''}</span>`;
    }

    function syntaxHighlightJSON(json) {
        return json.replace(/("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?|\[|\]|\{|\})/g, (match) => {
            let cls = 'json-number';
            if (/^"/.test(match)) {
                cls = /:$/.test(match) ? 'json-key' : 'json-string';
            } else if (/true|false/.test(match)) {
                cls = 'json-boolean';
            } else if (/null/.test(match)) {
                cls = 'json-null';
            } else if (/[\[\]{}]/.test(match)) {
                cls = 'json-bracket';
            }
            return `<span class="${cls}">${match}</span>`;
        });
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            // Fallback
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        }
    }

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icons = {
            success: '<svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
            error:   '<svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
            info:    '<svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
        };

        toast.innerHTML = `${icons[type] || icons.info}<span>${escapeHtml(message)}</span>`;
        dom.toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    function debounce(fn, ms) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(null, args), ms);
        };
    }

    // ── Boot ──────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', init);
})();
