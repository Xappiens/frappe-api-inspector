/* ═══════════════════════════════════════════════════════
   Frappe DocType Inspector — Application Logic
   Vanilla JS • No dependencies
   ═══════════════════════════════════════════════════════ */

;(() => {
    'use strict';

    window.onerror = function(msg, url, line, col, error) {
        alert("CRITICAL ERROR: " + msg + "\nLine: " + line + "\nCol: " + col + "\nStack: " + (error ? error.stack : ''));
        return false;
    };
    window.addEventListener('unhandledrejection', function(event) {
        alert("UNHANDLED PROMISE REJECTION: " + event.reason);
    });

    // ── DOM References ────────────────────────────────
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);
    const id = (name) => document.getElementById(name);

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
        inspectorTitle:  id('inspector-title'),
        inspectorActions: id('inspector-actions'),
        btnRelationshipMap: id('btn-relationship-map'),
        modalRelationshipMap: id('modal-relationship-map'),
        relationshipLists: id('relationship-lists'),
        mapSubtitle: id('map-subtitle'),
        fieldCountBadge: id('field-count-badge'),
        inputSearchFields:$('#input-search-fields'),
        btnGeneratePayload:$('#btn-generate-payload'),
        btnExportSchema: $('#btn-export-schema'),
        schemaExportMenu: $('#schema-export-menu'),
        btnGenerateApiTests: $('#btn-generate-api-tests'),
        btnCreateDoc:    $('#btn-create-doc'),
        welcomeState:    $('#welcome-state'),
        
        // Inspector Tabs & Panels
        inspectorTabsContainer: $('#inspector-tabs-container'),
        tabInspectorFields: $('#tab-inspector-fields'),
        tabInspectorPerms: $('#tab-inspector-perms'),
        fieldsContainer: $('#fields-table-container'),
        fieldsTbody:     $('#fields-tbody'),
        permissionsContainer: $('#permissions-table-container'),
        permissionsTbody: $('#permissions-tbody'),
        btnRefreshPerms: $('#btn-refresh-perms'),
        
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
        recordsTableContainer:$('#records-table-container'),
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
        inputRecordsQuickSearch: $('#input-records-quick-search'),
        
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
        btnFillTestData:  $('#btn-fill-test-data'),
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
        btnOpenDashboard: $('#btn-open-dashboard'),
        btnOpenConsole:  $('#btn-open-console'),
        testsModal:      $('#tests-modal'),
        testsBackdrop:   $('#tests-modal-backdrop'),
        btnCloseTestsModal: $('#btn-close-tests-modal'),
        btnRunAllTests:  $('#btn-run-all-tests'),
        btnOpenTestGenerator: $('#btn-open-test-generator'),
        testGeneratorModal: $('#test-generator-modal'),
        testGeneratorBackdrop: $('#test-generator-backdrop'),
        btnCloseTestGenerator: $('#btn-close-test-generator'),
        btnCancelTestGenerator: $('#btn-cancel-test-generator'),
        btnConfirmTestGenerator: $('#btn-confirm-test-generator'),
        testGeneratorSubtitle: $('#test-generator-subtitle'),
        testGeneratorCount: $('#test-generator-count'),
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
        searchInput:     id('global-search-input'),
        searchResults:   id('global-search-results'),
        globalSearchEmpty:   id('global-search-empty'),
        globalSearchLoading: id('global-search-loading'),

        // Upload Assistant
        btnOpenUpload:    $('#btn-upload-file'),
        uploadModal:      $('#upload-modal'),
        uploadBackdrop:   $('#upload-modal-backdrop'),
        btnCloseUpload:   $('#btn-close-upload-modal'),
        btnCancelUpload:  $('#btn-cancel-upload'),
        btnExecuteUpload: $('#btn-execute-upload'),
        dropzone:         $('#dropzone'),
        inputFileUpload:  $('#input-file-upload'),
        selectedFileInfo: $('#selected-file-info'),
        fileNameDisplay:  $('#file-name-display'),
        btnRemoveFile:    $('#btn-remove-file'),
        uploadTargetId:   $('#upload-target-id'),
        uploadPrivate:    $('#upload-private'),
        uploadModalSubtitle: $('#upload-modal-subtitle'),
        uploadProgressPanel:$('#upload-progress-panel'),
        uploadProgressBar: $('#upload-progress-bar'),
        uploadStatusText: $('#upload-status-text'),

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
        editingRecord: null,
        originalRecord: null,
        queryFilters: [],
        currentRecords: [],
        requestLogs: [],
        selectedLogId: null,
        selectedRecords: new Set(),
        savedCollections: JSON.parse(localStorage.getItem('fapi_collections') || '[]'),
        schemaSnapshots: JSON.parse(localStorage.getItem('fapi_schema_snapshots') || '{}'),
        apiTests: JSON.parse(localStorage.getItem('fapi_api_tests') || '[]'),
        selectedTestId: null,
        
        globalSearchResults: [],
        globalSearchIndex: -1,
        
        currentInspectorTab: 'fields',
        currentPerms: [],
        selectedUploadFile: null,
        fieldsRenderToken: 0,
        permsRequestToken: 0,
        consoleModalEl: null,
        dashboardModalEl: null,
        randomLinkCache: {},
    };

    // ── LocalStorage Keys ─────────────────────────────
    const STORAGE_KEY = 'frappe_inspector_connection';
    const THEME_KEY = 'fapi_theme';

    // ── Init ──────────────────────────────────────────
    function init() {
        // ── Third Party Init ─────────────────────────────

        initTheme();
        loadSavedConnection();
        bindEvents();

        window._inspectorJumpTo = (docType) => {
            if (docType) selectDocType(docType);
        };
    }

    // ── Utilities ─────────────────────────────────────
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    function showModal(el) {
        if (!el) return;
        el.classList.remove('hidden');
        el.classList.add('flex');
    }

    function hideModal(el) {
        if (!el) return;
        el.classList.add('hidden');
        el.classList.remove('flex');
    }

    // ── Theme Management ──────────────────────────────
    function initTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
        applyTheme(savedTheme);
    }

    function toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        const commitThemeChange = () => {
            applyTheme(newTheme);
            localStorage.setItem(THEME_KEY, newTheme);
        };

        if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.startViewTransition(commitThemeChange);
            return;
        }

        document.documentElement.classList.add('theme-switching');
        commitThemeChange();
        window.clearTimeout(state.themeTransitionTimer);
        state.themeTransitionTimer = window.setTimeout(() => {
            document.documentElement.classList.remove('theme-switching');
        }, 220);
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
        const safeBind = (el, event, handler) => {
            if (el) el.addEventListener(event, handler);
        };

        safeBind(dom.toggleSecret, 'click', () => {
            const input = dom.inputApiSecret;
            if (input) input.type = input.type === 'password' ? 'text' : 'password';
        });

        safeBind(dom.btnRefreshWebhooks, 'click', fetchWebhooks);
        safeBind(dom.btnClearWebhooks, 'click', clearWebhooks);
        safeBind(dom.btnConnect, 'click', handleConnect);
        safeBind(dom.btnToggleTheme, 'click', toggleTheme);

        // Sidebar Tabs
        safeBind(dom.tabExplorer, 'click', () => switchSidebarTab('explorer'));
        safeBind(dom.tabCollections, 'click', () => switchSidebarTab('collections'));
        safeBind(dom.tabWebhooks, 'click', () => switchSidebarTab('webhooks'));
        
        // Inspector Tabs
        safeBind(dom.tabInspectorFields, 'click', () => switchInspectorTab('fields'));
        safeBind(dom.tabInspectorPerms, 'click', () => switchInspectorTab('perms'));
        safeBind(dom.btnRefreshPerms, 'click', () => {
            if (state.currentDocType) fetchDocPerms(state.currentDocType);
        });

        [dom.inputUrl, dom.inputApiKey, dom.inputApiSecret].forEach(el => {
            safeBind(el, 'keydown', (e) => {
                if (e.key === 'Enter') handleConnect();
            });
        });

        safeBind(dom.inputSearch, 'input', debounce(filterDocTypes, 150));
        safeBind(dom.btnRefresh, 'click', fetchDocTypes);
        
        safeBind(dom.inputSearch, 'keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = (dom.inputSearch.value || '').trim();
                if (!query) return;

                const qLower = query.toLowerCase();
                
                // 1. Exact match (case insensitive)
                const exactMatch = state.allDocTypes.find(d => d.toLowerCase() === qLower);
                if (exactMatch) {
                    selectDocType(exactMatch);
                    return;
                }

                // 2. First filtered match
                const firstMatch = state.allDocTypes.find(d => d.toLowerCase().includes(qLower));
                if (firstMatch) {
                    selectDocType(firstMatch);
                    return;
                }

                // 3. Force query (user pasted hidden doctype)
                if (!state.allDocTypes.includes(query)) {
                    state.allDocTypes.unshift(query);
                    renderDocTypeList(state.allDocTypes);
                }
                selectDocType(query);
            }
        });

        safeBind(dom.inputSearchFields, 'input', debounce(filterFields, 150));

        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                openGlobalSearch();
            }
            if (e.key === 'Escape' && dom.searchModal && !dom.searchModal.classList.contains('hidden')) {
                closeGlobalSearch();
            }
        });

        safeBind(dom.searchBackdrop, 'click', closeGlobalSearch);
        safeBind(dom.searchInput, 'input', debounce(handleGlobalSearchInput, 300));
        safeBind(dom.searchInput, 'keydown', handleGlobalSearchKeys);

        safeBind(dom.btnGeneratePayload, 'click', openPayloadModal);
        safeBind(dom.btnExportSchema, 'click', toggleSchemaExportMenu);
        safeBind(dom.schemaExportMenu, 'click', handleSchemaExportMenuClick);
        safeBind(dom.btnGenerateApiTests, 'click', openTestGeneratorModal);
        safeBind(dom.btnCreateDoc, 'click', openCreateModal);
        safeBind(dom.btnCloseCreate, 'click', closeCreateModal);
        safeBind(dom.createBackdrop, 'click', closeCreateModal);
        safeBind(dom.btnSubmitDoc, 'click', submitNewDoc);
        safeBind(dom.btnFillTestData, 'click', fillCreateFormWithTestData);

        safeBind(dom.btnViewRecords, 'click', openRecordsModal);
        safeBind(dom.btnCloseRecords, 'click', closeRecordsModal);
        safeBind(dom.recordsBackdrop, 'click', closeRecordsModal);
        safeBind(dom.btnRefreshRecords, 'click', fetchRecords);
        safeBind(dom.btnExportCSV, 'click', exportToCSV);

        safeBind(dom.btnCloseComm, 'click', closeCommentsModal);
        safeBind(dom.commentsBackdrop, 'click', closeCommentsModal);

        safeBind(dom.btnToggleFilters, 'click', toggleQueryBuilder);
        safeBind(dom.btnAddFilter, 'click', addQueryFilter);
        safeBind(dom.btnApplyFilters, 'click', applyQueryFilters);
        safeBind(dom.btnClearFilters, 'click', clearQueryFilters);
        safeBind(dom.inputRecordsQuickSearch, 'input', debounce(() => fetchRecords(false), 500));

        safeBind(dom.btnToggleLogs, 'click', toggleLogsPanel);
        safeBind(dom.btnCloseLogs, 'click', toggleLogsPanel);
        safeBind(dom.btnClearLogs, 'click', clearLogs);
        safeBind(dom.btnCloseLogDetails, 'click', closeLogDetails);
        safeBind(dom.btnCopyLog, 'click', copyLogDetails);

        safeBind(dom.btnCloseModal, 'click', closePayloadModal);
        safeBind(dom.modalBackdrop, 'click', closePayloadModal);

        safeBind(dom.btnCancelDiff, 'click', closeDiffModal);
        safeBind(dom.diffBackdrop, 'click', closeDiffModal);

        safeBind(dom.btnSnapshotTake, 'click', takeSchemaSnapshot);
        safeBind(dom.btnSnapshotCompare, 'click', compareSchemaSnapshot);
        safeBind(dom.btnRelationshipMap, 'click', openRelationshipMap);
        safeBind(dom.btnCloseSchemaDiff, 'click', closeSchemaDiffModal);
        safeBind(dom.schemaDiffBackdrop, 'click', closeSchemaDiffModal);

        safeBind(dom.btnOpenTests, 'click', openTestsModal);
        safeBind(dom.btnOpenDashboard, 'click', openDashboard);
        safeBind(dom.btnOpenConsole, 'click', openConsole);
        safeBind(dom.btnCloseTestsModal, 'click', closeTestsModal);
        safeBind(dom.testsBackdrop, 'click', closeTestsModal);
        safeBind(dom.btnOpenTestGenerator, 'click', openTestGeneratorModal);
        safeBind(dom.testGeneratorBackdrop, 'click', closeTestGeneratorModal);
        safeBind(dom.btnCloseTestGenerator, 'click', closeTestGeneratorModal);
        safeBind(dom.btnCancelTestGenerator, 'click', closeTestGeneratorModal);
        safeBind(dom.btnConfirmTestGenerator, 'click', confirmTestGenerator);
        safeBind(dom.btnNewTest, 'click', createNewTest);
        safeBind(dom.btnSaveTest, 'click', saveCurrentTest);
        safeBind(dom.btnRunAllTests, 'click', runAllTests);
        safeBind(dom.btnCloseTestLogs, 'click', () => { if(dom.testRunLogs) dom.testRunLogs.classList.add('hidden'); });

        safeBind(dom.btnBulkEdit, 'click', openBulkEditModal);
        safeBind(dom.btnCancelBulkEdit, 'click', closeBulkEditModal);
        safeBind(dom.bulkEditBackdrop, 'click', closeBulkEditModal);
        safeBind(dom.btnConfirmBulkEdit, 'click', executeBulkEdit);

        safeBind(dom.btnConfirmSaveCol, 'click', confirmSaveCollection);

        // Upload Events
        safeBind(dom.btnOpenUpload, 'click', openUploadModal);
        safeBind(dom.btnCloseUpload, 'click', closeUploadModal);
        safeBind(dom.btnCancelUpload, 'click', closeUploadModal);
        safeBind(dom.uploadBackdrop, 'click', closeUploadModal);
        
        safeBind(dom.dropzone, 'click', () => dom.inputFileUpload.click());
        safeBind(dom.inputFileUpload, 'change', handleFileChange);
        safeBind(dom.btnRemoveFile, 'click', (e) => {
            e.stopPropagation();
            removeSelectedFile();
        });

        // Dropzone Drag & Drop
        if (dom.dropzone) {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dom.dropzone.addEventListener(eventName, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }, false);
            });
            dom.dropzone.addEventListener('dragover', () => dom.dropzone.classList.add('border-editor-teal', 'bg-editor-teal/5'));
            dom.dropzone.addEventListener('dragleave', () => dom.dropzone.classList.remove('border-editor-teal', 'bg-editor-teal/5'));
            dom.dropzone.addEventListener('drop', (e) => {
                dom.dropzone.classList.remove('border-editor-teal', 'bg-editor-teal/5');
                const dt = e.dataTransfer;
                if (dt.files && dt.files.length) handleFileFiles(dt.files);
            });
        }

        safeBind(dom.btnExecuteUpload, 'click', executeUpload);

        safeBind(dom.btnCopyPayload, 'click', copyPayload);

        document.addEventListener('click', (e) => {
            if (dom.schemaExportMenu && dom.btnExportSchema && !dom.schemaExportMenu.contains(e.target) && !dom.btnExportSchema.contains(e.target)) {
                dom.schemaExportMenu.classList.add('hidden');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dom.schemaExportMenu?.classList.add('hidden');
                closeTestGeneratorModal();
                closePayloadModal();
                closeCreateModal();
                closeRecordsModal();
                closeCommentsModal();
                closeTestsModal();
                closeGlobalSearch();
            }
        });
    }

    // ── Connection Handler ────────────────────────────
    async function handleConnect() {
        let url = dom.inputUrl.value.trim().replace(/\/+$/, '');
        const key = dom.inputApiKey.value.trim();
        const secret = dom.inputApiSecret.value.trim();

        if (!url || !key || !secret) {
            showToast('Completa todos los campos de conexión', 'error');
            return;
        }

        // Protocol enforcement
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = `https://${url}`;
            dom.inputUrl.value = url;
        }

        setConnectLoading(true);

        // 1. Pre-check: Proxy Health
        try {
            const healthRes = await fetch('/api/status').catch(() => null);
            if (!healthRes || !healthRes.ok) {
                throw new Error('Proxy desconectado. Ejecuta "node server.js" en la terminal.');
            }
        } catch (hErr) {
            setConnectLoading(false);
            showToast(hErr.message, 'error');
            return;
        }

        state.baseUrl = url;
        state.authHeader = `token ${key}:${secret}`;

        try {
            const res = await apiFetch('/api/resource/User?limit_page_length=1');
            // Conserving the response for json parsing
            const data = await res.json();
            
            state.connected = true;
            saveConnection();

            setConnectionStatus('connected', 'Conectado');
            showToast(`Conectado a Frappe correctamente`, 'success');

            dom.searchPanel.classList.remove('opacity-40', 'pointer-events-none');
            fetchDocTypes();
        } catch (err) {
            state.connected = false;
            setConnectionStatus('error', 'Error');
            
            const msg = err.response ? await parseFrappeError(err.response, 'Fallo en la conexión con el servidor') : `Error de la App: ${err.message}`;
            showToast(msg, 'error');
            
            // diagnostic: Auto-open logs to show technical details
            if (dom.logsPanel.classList.contains('hidden')) {
                dom.btnToggleLogs.click();
            }
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
            el.classList.add('bg-editor-green', 'text-white');
        } else {
            el.classList.add('bg-editor-red', 'text-white');
        }
    }

    // ── API Helper ──
    let _sessionExpiredShown = false;

    async function apiFetch(path, options = {}) {
        const targetUrl = `${state.baseUrl}${path}`;
        const proxyUrl = `/proxy/${encodeURIComponent(targetUrl)}`;
        const method = options.method || 'GET';
        const startTime = performance.now();

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

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
        if (state.requestLogs.length > 100) state.requestLogs.pop();
        renderLogs();

        try {
            const res = await fetch(proxyUrl, {
                ...options,
                signal: controller.signal,
                headers: {
                    'Authorization': state.authHeader,
                    'Content-Type': 'application/json',
                    ...(options.headers || {}),
                },
            });
            clearTimeout(timeoutId);

            logEntry.duration = Math.round(performance.now() - startTime);
            logEntry.status = res.status;

            const resClone = res.clone();
            const text = await resClone.text();
            try {
                logEntry.response = JSON.stringify(JSON.parse(text), null, 2);
            } catch {
                logEntry.response = text;
            }

            if (res.status >= 200 && res.status < 300) {
                _sessionExpiredShown = false;
                hideSessionExpiredBanner();
            } else {
                if ((res.status === 401 || res.status === 403) && !_sessionExpiredShown) {
                    if (state.connected && !path.includes('limit_page_length=1')) {
                        _sessionExpiredShown = true;
                        showSessionExpiredBanner();
                    }
                }
                const error = new Error(`HTTP ${res.status}`);
                error.response = res;
                throw error;
            }

            renderLogs();
            return res;
        } catch (err) {
            clearTimeout(timeoutId);
            logEntry.duration = Math.round(performance.now() - startTime);
            
            if (err.name === 'AbortError') {
                logEntry.error = 'Timeout: El servidor no respondió en 15 segundos';
                err.message = 'Timeout de conexión (15s)';
            } else {
                logEntry.error = err.message;
            }

            renderLogs();
            if (err instanceof Error && !err.response) {
                err.isAppError = true;
            }
            throw err;
        }
    }

    function showSessionExpiredBanner() {
        if ($('#session-expired-banner')) return;
        const banner = document.createElement('div');
        banner.id = 'session-expired-banner';
        banner.className = 'fixed top-0 left-0 right-0 z-[999] bg-editor-red text-white px-6 py-3 flex items-center justify-between animate-slide-up shadow-2xl';
        banner.innerHTML = `
            <div class="flex items-center gap-3">
                <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <div>
                    <span class="font-bold text-sm">Sesión Expirada</span>
                    <span class="text-xs opacity-80 ml-2">Tu token API ha sido rechazado (401/403). Reconecta para continuar.</span>
                </div>
            </div>
            <button id="btn-session-reconnect" class="px-4 py-1.5 rounded-lg text-xs font-bold bg-white text-editor-red hover:bg-white/90 transition-colors shadow-sm">Reconectar</button>
        `;
        document.body.prepend(banner);
        $('#btn-session-reconnect').addEventListener('click', () => {
            hideSessionExpiredBanner();
            handleConnect();
        });
    }

    function hideSessionExpiredBanner() {
        const banner = $('#session-expired-banner');
        if (banner) banner.remove();
    }

    // ── DocType Fetching ──────────────────────────────
    async function fetchDocTypes() {
        if (!state.connected) return;

        dom.doctypeList.innerHTML = '';
        dom.doctypeCount.textContent = 'Cargando...';

        try {
            const res = await apiFetch('/api/resource/DocType?fields=["name"]&limit_page_length=0&order_by=name asc');
            const data = await res.json();

            state.allDocTypes = (data.data || []).map(d => d.name).sort();
            dom.doctypeCount.textContent = `${state.allDocTypes.length} DocTypes`;
            renderDocTypeList(state.allDocTypes);
        } catch (err) {
            if (err.message.includes('403') || err.message.includes('HTTP 401')) {
                let foundDocTypes = new Set();
                
                try {
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
                const msg = err.response ? await parseFrappeError(err.response, 'Error al listar DocTypes') : `Error al cargar DocTypes: ${err.message}`;
                showToast(msg, 'error');
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
        try { query = decodeURIComponent(query); } catch { /* keep original */ }
        const filtered = state.allDocTypes.filter(n => n.toLowerCase().includes(query));
        renderDocTypeList(filtered);
        dom.doctypeCount.textContent = `${filtered.length} / ${state.allDocTypes.length}`;
    }

    // ── Inspector Tabs & Permissions ──────────────────
    function switchInspectorTab(tab) {
        if (!dom.fieldsContainer) return;
        state.currentInspectorTab = 'fields';
        
        if (dom.tabInspectorFields) {
            dom.tabInspectorFields.className = 'py-2 text-[11px] font-semibold text-editor-text border-b-2 border-editor-accent transition-colors flex items-center gap-1.5';
        }
        
        dom.permissionsContainer?.classList.add('hidden');
        dom.fieldsContainer.classList.remove('hidden');
    }

    async function fetchDocPerms(docType) {
        if (!state.connected) return;
        const requestToken = ++state.permsRequestToken;
        
        dom.permissionsTbody.innerHTML = '<tr><td colspan="9" class="text-center py-8 text-editor-subtext"><div class="loader mx-auto mb-2"></div>Cargando Permisos...</td></tr>';
        
        try {
            const query = `[["parent", "=", "${docType}"]]`;
            const fields = `["role","read","write","create","delete","submit","cancel","amend"]`;
            const url = `/api/resource/DocPerm?filters=${encodeURIComponent(query)}&fields=${encodeURIComponent(fields)}&limit_page_length=0`;
            
            const res = await apiFetch(url);
            
            const data = await res.json();
            if (requestToken !== state.permsRequestToken || state.currentDocType !== docType) return;
            state.currentPerms = data.data || [];
            
            if (state.currentPerms.length === 0) {
                dom.permissionsTbody.innerHTML = '<tr><td colspan="9" class="text-center py-8 text-editor-subtext text-xs">No hay restricciones configuradas específicamente para este DocType (Hereda de Guest/System Manager).</td></tr>';
                return;
            }
            
            renderPermissionsTable(state.currentPerms);
        } catch (err) {
            if (requestToken !== state.permsRequestToken || state.currentDocType !== docType) return;
            let errorMsg = err.message;
            if (err.message.includes('403') || (err.response && err.response.status === 403)) {
                errorMsg = "No tienes privilegios de Administrador (System Manager) para auditar los Roles de Seguridad general.";
            } else if (err.message.includes('401')) {
                errorMsg = "Sesión Expirada. Re-conecta el token.";
            } else if (err.name === 'AbortError') {
                errorMsg = "El servidor tardó demasiado en responder.";
            } else {
                errorMsg = `Error al consultar permisos: ${err.message}`;
            }
            dom.permissionsTbody.innerHTML = `<tr><td colspan="9" class="text-center py-8 text-editor-red font-medium text-xs">⚠️ ${errorMsg}</td></tr>`;
        }
    }

    function renderPermissionsTable(perms) {
        dom.permissionsTbody.innerHTML = '';
        const fragment = document.createDocumentFragment();
        
        const renderCheck = (val) => val ? 
            `<svg class="w-4 h-4 text-editor-green mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>` : 
            `<span class="text-editor-subtext/20">—</span>`;
            
        perms.forEach((p, i) => {
            const tr = document.createElement('tr');
            tr.className = 'border-b border-editor-border hover:bg-editor-surface2 transition-colors';
            // Rol cell has specific Frappe styling
            tr.innerHTML = `
                <td class="w-10 py-3 text-center text-[10px] text-editor-subtext/40 font-mono">${i + 1}</td>
                <td class="py-3 text-left">
                    <span class="px-2 py-0.5 rounded bg-editor-surface border border-editor-border font-medium text-editor-text">${escapeHtml(p.role)}</span>
                </td>
                <td class="w-16 py-3 text-center">${renderCheck(p.read)}</td>
                <td class="w-16 py-3 text-center">${renderCheck(p.write)}</td>
                <td class="w-16 py-3 text-center">${renderCheck(p.create)}</td>
                <td class="w-16 py-3 text-center">${renderCheck(p.delete)}</td>
                <td class="w-16 py-3 text-center">${renderCheck(p.submit)}</td>
                <td class="w-16 py-3 text-center">${renderCheck(p.cancel)}</td>
                <td class="w-16 py-3 text-center">${renderCheck(p.amend)}</td>
            `;
            fragment.appendChild(tr);
        });
        
        dom.permissionsTbody.appendChild(fragment);
    }

    // ── DocType Selection & Field Inspector ───────────
    async function selectDocType(name) {
        state.currentDocType = name;
        state.currentPerms = [];

        $$('.doctype-item').forEach(el => {
            el.classList.toggle('active', el.dataset.name === name);
        });

        dom.welcomeState?.classList.add('hidden');
        dom.fieldsContainer?.classList.add('hidden');
        dom.permissionsContainer?.classList.add('hidden');
        dom.inspectorTabsContainer?.classList.add('hidden');
        dom.loadingState?.classList.remove('hidden');
        dom.loadingState?.classList.add('flex');

        try {
            if (dom.inspectorTitle) {
                dom.inspectorTitle.textContent = name;
                dom.inspectorTitle.classList.remove('text-editor-subtext');
                dom.inspectorTitle.classList.add('text-editor-text');
            }
            if (dom.fieldCountBadge) {
                dom.fieldCountBadge.textContent = '';
                dom.fieldCountBadge.dataset.hasValue = 'false';
                dom.fieldCountBadge.classList.add('hidden');
            }
            dom.inspectorActions?.classList.add('hidden');

            let res = await apiFetch(`/api/method/frappe.desk.form.load.getdoctype?doctype=${encodeURIComponent(name)}`);
            let data = null;
            let fields = [];

            if (!res.ok) {
                res = await apiFetch(`/api/resource/DocType/${encodeURIComponent(name)}`);
                data = await res.json();
                fields = data.data?.fields || [];
            } else {
                data = await res.json();
                const docs = data.docs || (data.message && data.message.docs) || [];
                const docTypeDoc = docs.find(d => d.doctype === 'DocType' && d.name === name);
                fields = docTypeDoc ? docTypeDoc.fields : [];
            }

            if (!fields || !fields.length) {
                throw new Error("Estructura vacía o denegada");
            }

            state.currentFields = fields;

            renderFieldsTable(fields);

            const dataFields = fields.filter(f => !isMeta(f.fieldtype));
            if (dom.fieldCountBadge) {
                dom.fieldCountBadge.textContent = `${dataFields.length} campos`;
                dom.fieldCountBadge.dataset.hasValue = 'true';
                dom.fieldCountBadge.classList.remove('hidden');
            }
            if (dom.inspectorActions) {
                dom.inspectorActions.classList.remove('hidden');
                dom.inspectorActions.style.display = 'flex';
            }
            dom.inspectorTabsContainer?.classList.remove('hidden');
            switchInspectorTab('fields');

            updateSnapshotUI();

        } catch (err) {
            const msg = err.response ? await parseFrappeError(err.response, `Error al cargar "${name}"`) : `Error de la App: ${err.message}`;
            showToast(msg, 'error');
        } finally {
            dom.loadingState?.classList.add('hidden');
            dom.loadingState?.classList.remove('flex');
        }
    }

    function renderFieldsTable(fields, filterQuery = '') {
        const renderToken = ++state.fieldsRenderToken;
        dom.fieldsTbody.innerHTML = '<tr><td colspan="7" class="text-center py-8 text-editor-subtext"><div class="loader mx-auto mb-2"></div>Renderizando campos...</td></tr>';
        dom.fieldsContainer.classList.remove('hidden');

        const query = filterQuery.toLowerCase();
        const rows = [];
        let visualIndex = 0;

        fields.forEach(field => {
            const ft = (field.fieldtype || '').toLowerCase();

            if (ft === 'section break' || ft === 'tab break') {
                rows.push({ kind: 'section', field, ft });
                return;
            }

            if (ft === 'column break') {
                rows.push({ kind: 'column' });
                return;
            }

            if (query) {
                const searchable = `${field.label || ''} ${field.fieldname || ''} ${field.fieldtype || ''}`.toLowerCase();
                if (!searchable.includes(query)) return;
            }

            visualIndex++;
            rows.push({ kind: 'data', field, ft, visualIndex });
        });

        dom.fieldsTbody.innerHTML = '';
        if (rows.length === 0) {
            dom.fieldsTbody.innerHTML = '<tr><td colspan="7" class="text-center py-8 text-editor-subtext">No hay campos para mostrar con ese filtro.</td></tr>';
            return;
        }

        const CHUNK_SIZE = rows.length > 350 ? 40 : 120;
        const animationsEnabled = rows.length <= 140;
        let cursor = 0;

        const appendChunk = () => {
            if (renderToken !== state.fieldsRenderToken) return;

            const fragment = document.createDocumentFragment();
            const limit = Math.min(cursor + CHUNK_SIZE, rows.length);

            for (; cursor < limit; cursor++) {
                const row = rows[cursor];
                let tr = null;

                if (row.kind === 'section') {
                    tr = document.createElement('tr');
                    tr.className = 'field-row section-break';
                    const label = row.field.label || (row.ft === 'tab break' ? '── Tab ──' : '── Section ──');
                    tr.innerHTML = `<td colspan="7">
                        <span class="flex items-center gap-2">
                            <span class="flex-1 h-px bg-editor-border"></span>
                            <span>${escapeHtml(label)}</span>
                            <span class="flex-1 h-px bg-editor-border"></span>
                        </span>
                    </td>`;
                } else if (row.kind === 'column') {
                    tr = document.createElement('tr');
                    tr.className = 'field-row column-break';
                    tr.innerHTML = '<td colspan="6" class="text-center">┆ columna ┆</td>';
                } else {
                    const field = row.field;
                    tr = document.createElement('tr');
                    tr.className = `field-row${animationsEnabled ? ' animate-fade-in' : ''}`;
                    if (row.ft === 'link' || row.ft === 'table' || row.ft === 'table multiselect') tr.classList.add('is-link');
                    if (animationsEnabled) tr.style.animationDelay = `${Math.min(row.visualIndex * 10, 200)}ms`;

                    const badgeClass = getFieldBadgeClass(field.fieldtype);
                    const required = field.reqd === 1;

                    let logicHtml = '<span class="text-editor-subtext">—</span>';
                    if (field.fetch_from) {
                        logicHtml = `
                            <div class="logic-badge badge-fetch" title="Fetch From: ${escapeHtml(field.fetch_from)}">
                                <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                                <span class="logic-text truncate max-w-[120px]">${escapeHtml(field.fetch_from)}</span>
                            </div>
                        `;
                    } else if (field.depends_on) {
                        logicHtml = `
                            <div class="logic-badge badge-depends" title="Depends On: ${escapeHtml(field.depends_on)}">
                                <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span class="logic-text truncate max-w-[120px]">Depends</span>
                            </div>
                        `;
                    }

                    tr.innerHTML = `
                        <td class="text-xs text-editor-subtext font-mono text-center">${row.visualIndex}</td>
                        <td class="text-xs text-editor-text">${escapeHtml(field.label || '—')}</td>
                        <td class="fieldname-cell" data-fieldname="${escapeHtml(field.fieldname || '')}">${escapeHtml(field.fieldname || '—')}</td>
                        <td><span class="fieldtype-badge ${badgeClass}">${escapeHtml(field.fieldtype || '—')}</span></td>
                        <td class="text-center">${required
                            ? '<span class="required-yes">✓</span>'
                            : '<span class="required-no">·</span>'
                        }</td>
                        <td class="logic-cell">${logicHtml}</td>
                        <td class="options-cell" title="${escapeHtml(field.options || '')}">${formatOptions(field)}</td>
                    `;

                    const fnCell = tr.querySelector('.fieldname-cell');
                    fnCell?.addEventListener('click', () => {
                        copyToClipboard(field.fieldname);
                        fnCell.classList.add('copied');
                        setTimeout(() => fnCell.classList.remove('copied'), 1200);
                    });
                }

                fragment.appendChild(tr);
            }

            dom.fieldsTbody.appendChild(fragment);
            if (cursor < rows.length) requestAnimationFrame(appendChunk);
        };

        requestAnimationFrame(appendChunk);
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
                    <div class="flex items-center justify-between p-3 rounded-lg border border-editor-green bg-editor-surface">
                        <div class="flex items-center gap-3">
                            <span class="w-2 h-2 rounded-full bg-editor-green"></span>
                            <div>
                                <span class="font-mono text-xs font-bold text-editor-text">${f.fieldname}</span>
                                <span class="text-[10px] text-editor-subtext ml-2">${f.fieldtype || 'N/A'}</span>
                            </div>
                        </div>
                        <span class="text-[10px] uppercase font-bold text-white bg-editor-green px-2 py-0.5 rounded">Añadido</span>
                    </div>
                `;
            });

            removed.forEach(f => {
                html += `
                    <div class="flex items-center justify-between p-3 rounded-lg border border-editor-red bg-editor-surface">
                        <div class="flex items-center gap-3">
                            <span class="w-2 h-2 rounded-full bg-editor-red"></span>
                            <div>
                                <span class="font-mono text-xs font-bold text-editor-text line-through opacity-70">${f.fieldname}</span>
                                <span class="text-[10px] text-editor-subtext ml-2 line-through opacity-70">${f.fieldtype || 'N/A'}</span>
                            </div>
                        </div>
                        <span class="text-[10px] uppercase font-bold text-white bg-editor-red px-2 py-0.5 rounded">Eliminado</span>
                    </div>
                `;
            });

            modified.forEach(m => {
                html += `
                    <div class="flex items-center justify-between p-3 rounded-lg border border-editor-yellow bg-editor-surface">
                        <div class="flex items-center gap-3">
                            <span class="w-2 h-2 rounded-full bg-editor-yellow"></span>
                            <div class="flex flex-col">
                                <span class="font-mono text-xs font-bold text-editor-text">${m.fieldname}</span>
                                <span class="text-[10px] text-editor-yellow mt-0.5">${m.diffs.join(' • ')}</span>
                            </div>
                        </div>
                        <span class="text-[10px] uppercase font-bold text-white bg-editor-yellow px-2 py-0.5 rounded">Modificado</span>
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

    // ── Frappe Relationship Engine ────────────────────────
    class FrappeRelationshipDetector {
        constructor() {
            this.cachePrefix = 'fapi_rel_';
            this.ttl = 3600000; // 1 hour
        }

        async getFullGraph(docTypeName) {
            const cached = this.getCache(docTypeName);
            if (cached) return cached;

            const [outbound, inbound] = await Promise.all([
                this.getOutbound(docTypeName),
                this.getInbound(docTypeName)
            ]);

            const result = {
                docType: docTypeName,
                linksTo: outbound,
                linksFrom: inbound,
                stats: {
                    out: outbound.length,
                    in: inbound.length,
                    tables: outbound.filter(l => l.fieldType.includes('Table')).length,
                    total: outbound.length + inbound.length
                },
                timestamp: Date.now()
            };

            this.setCache(docTypeName, result);
            return result;
        }

        async getOutbound(docTypeName) {
            // Outbound is easy: it's in the fields of the DT itself
            // We expect state.currentFields is already loaded if we are inspecting
            let fields = state.currentDocType === docTypeName ? state.currentFields : [];
            
            if (fields.length === 0) {
                const res = await apiFetch(`/api/method/frappe.desk.form.load.getdoctype?doctype=${encodeURIComponent(docTypeName)}`);
                if (res.ok) {
                    const data = await res.json();
                    const doc = (data.docs || data.message?.docs || []).find(d => d.doctype === 'DocType');
                    fields = doc ? doc.fields : [];
                }
            }

            return fields.filter(f => 
                (f.fieldtype === 'Link' || f.fieldtype === 'Table' || f.fieldtype === 'Table Multiselect' || f.fieldtype === 'Dynamic Link') && f.options
            ).map(f => ({
                target: f.options,
                fieldname: f.fieldname,
                label: f.label || f.fieldname,
                fieldType: f.fieldtype,
                required: f.reqd === 1
            }));
        }

        async getInbound(docTypeName) {
            // OPTIMIZACIÓN: En lugar de iterar por todo, consultamos DocField y Custom Field
            // Esto es O(1) llamadas API vs O(N)
            const filters = JSON.stringify([["options", "=", docTypeName], ["fieldtype", "in", ["Link", "Table", "Table Multiselect"]]]);
            const fields = JSON.stringify(["parent", "fieldname", "label", "fieldtype", "reqd"]);
            
            try {
                const [standard, custom] = await Promise.all([
                    apiFetch(`/api/resource/DocField?filters=${encodeURIComponent(filters)}&fields=${encodeURIComponent(fields)}&limit_page_length=500`),
                    apiFetch(`/api/resource/Custom Field?filters=${encodeURIComponent(filters)}&fields=${encodeURIComponent(fields)}&limit_page_length=500`)
                ]);

                const sData = standard.ok ? (await standard.json()).data : [];
                const cData = custom.ok ? (await custom.json()).data : [];
                
                return [...sData, ...cData].map(f => ({
                    source: f.parent,
                    fieldname: f.fieldname,
                    label: f.label || f.fieldname,
                    fieldType: f.fieldtype,
                    required: f.reqd === 1
                }));
            } catch (e) {
                console.error("Detector: Inbound search failed", e);
                return [];
            }
        }

        getCache(name) {
            try {
                const item = JSON.parse(sessionStorage.getItem(this.cachePrefix + name));
                if (item && (Date.now() - item.timestamp < this.ttl)) return item;
            } catch(e) {}
            return null;
        }

        setCache(name, data) {
            try { sessionStorage.setItem(this.cachePrefix + name, JSON.stringify(data)); } catch(e) {}
        }
    }

    const relDetector = new FrappeRelationshipDetector();

    async function openRelationshipMap() {
        if (!state.currentDocType) return;
        
        showModal(dom.modalRelationshipMap);
        dom.mapSubtitle.textContent = `Analizando arquitectura avanzada...`;
        dom.relationshipLists.innerHTML = `
            <div class="flex flex-col items-center justify-center p-24">
                <div class="loader-ring mb-4"></div>
                <p class="text-xs text-editor-subtext animate-pulse">Consultando metadatos relacionales...</p>
            </div>
        `;

        try {
            const graph = await relDetector.getFullGraph(state.currentDocType);
            
            window._jumpToDocType = (name) => {
                if (state.allDocTypes.includes(name)) {
                    dom.modalRelationshipMap.classList.add('hidden');
                    selectDocType(name);
                }
            };

            let html = `
                <div class="relationship-stat-row">
                    <div class="relationship-stat-pill is-inbound">
                        ${graph.stats.in} REFERENCIAS ENTRANTES
                    </div>
                    <div class="relationship-stat-pill is-outbound">
                        ${graph.stats.out - graph.stats.tables} ENLACES DIRECTOS
                    </div>
                    <div class="relationship-stat-pill is-table">
                        ${graph.stats.tables} TABLAS HIJAS
                    </div>
                </div>
            `;

            // Helper to generate a table for links
            const renderTable = (title, items, isSource) => {
                if (!items || items.length === 0) return '';
                return `
                    <div class="bg-editor-surface2 border border-editor-border rounded-lg overflow-hidden mt-6 shadow-sm">
                        <div class="px-4 py-2 bg-editor-surface2 border-b border-editor-border text-xs font-bold text-editor-text uppercase tracking-wide">
                            ${title}
                        </div>
                        <table class="w-full text-left">
                            <thead class="text-[10px] text-editor-subtext border-b border-editor-border bg-editor-surface uppercase">
                                <tr>
                                    <th class="py-2 px-4 font-semibold">${isSource ? 'Viene De (DocType)' : 'Apunta A (DocType)'}</th>
                                    <th class="py-2 px-4 font-semibold">Campo (Fieldname)</th>
                                    <th class="py-2 px-4 font-semibold">Tipo</th>
                                </tr>
                            </thead>
                            <tbody class="text-xs text-editor-text bg-editor-surface">
                                ${items.map(item => {
                                    const docName = isSource ? item.source : item.target;
                                    return `
                                        <tr class="border-b border-editor-border hover:bg-editor-surface2 transition-colors">
                                            <td class="py-2 px-4 font-semibold text-editor-accent cursor-pointer hover:underline" onclick="_jumpToDocType('${docName}')">
                                                ${docName}
                                            </td>
                                            <td class="py-2 px-4 font-mono text-editor-subtext">${item.fieldname}</td>
                                            <td class="py-2 px-4">
                                                <span class="relationship-type-pill">${item.fieldType}</span>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
            };

            const links = graph.linksTo.filter(l => !l.fieldType.includes('Table'));
            const tables = graph.linksTo.filter(l => l.fieldType.includes('Table'));

            html += renderTable('Referencias Entrantes (Inbound)', graph.linksFrom, true);
            html += renderTable('Enlaces Directos (Outbound)', links, false);
            html += renderTable('Tablas Hijas (Child Tables)', tables, false);

            dom.relationshipLists.innerHTML = html;
            dom.mapSubtitle.textContent = `Relaciones de: ${state.currentDocType}`;

        } catch (err) {
            console.error(err);
            dom.mermaidGraph.innerHTML = `<div class="p-12 text-center text-editor-red">Fallo del motor relacional avanzado: ${err.message}.</div>`;
        }
    }

    function filterFields() {
        const query = dom.inputSearchFields.value.trim();
        renderFieldsTable(state.currentFields, query);
    }

    function toggleSchemaExportMenu() {
        if (!state.currentDocType || !state.currentFields.length) {
            showToast('Selecciona un DocType antes de exportar el esquema.', 'info');
            return;
        }
        dom.schemaExportMenu?.classList.toggle('hidden');
    }

    function handleSchemaExportMenuClick(e) {
        const button = e.target.closest('[data-schema-export-format]');
        if (!button) return;

        dom.schemaExportMenu?.classList.add('hidden');
        exportCurrentSchema(button.dataset.schemaExportFormat);
    }

    function getSchemaExportRows() {
        const columns = ['label', 'fieldname', 'fieldtype', 'options', 'reqd', 'read_only', 'hidden', 'depends_on', 'fetch_from', 'description'];
        return state.currentFields.map(field => {
            const row = {};
            columns.forEach(column => {
                row[column] = field[column] ?? '';
            });
            return row;
        });
    }

    function exportCurrentSchema(format) {
        if (!state.currentDocType || !state.currentFields.length) {
            showToast('Selecciona un DocType antes de exportar el esquema.', 'info');
            return;
        }

        const rows = getSchemaExportRows();
        const safeName = getSafeFileBaseName(state.currentDocType);
        const columns = Object.keys(rows[0] || {});
        let content = '';
        let mime = 'text/plain;charset=utf-8';
        let extension = format;

        if (format === 'csv') {
            content = rowsToCSV(rows, columns);
            mime = 'text/csv;charset=utf-8';
        } else if (format === 'json') {
            content = JSON.stringify({
                doctype: state.currentDocType,
                exportedAt: new Date().toISOString(),
                fields: rows
            }, null, 2);
            mime = 'application/json;charset=utf-8';
        } else if (format === 'md') {
            content = rowsToMarkdown(rows, columns);
            mime = 'text/markdown;charset=utf-8';
            extension = 'md';
        } else {
            showToast('Formato de exportación no soportado.', 'error');
            return;
        }

        downloadFile(`${safeName}-schema.${extension}`, content, mime);
        showToast(`Esquema exportado en ${extension.toUpperCase()}`, 'success');
    }

    function rowsToCSV(rows, columns) {
        return [
            columns.map(escapeCsvCell).join(','),
            ...rows.map(row => columns.map(column => escapeCsvCell(row[column])).join(','))
        ].join('\n');
    }

    function escapeCsvCell(value) {
        const raw = value === null || value === undefined ? '' : String(value);
        if (raw.includes(',') || raw.includes('\n') || raw.includes('"')) {
            return `"${raw.replace(/"/g, '""')}"`;
        }
        return raw;
    }

    function rowsToMarkdown(rows, columns) {
        const escapeMarkdownCell = (value) => String(value ?? '').replace(/\|/g, '\\|').replace(/\r?\n/g, '<br>');
        const header = `# ${state.currentDocType} Schema`;
        const generated = `Exportado: ${new Date().toISOString()}`;
        const tableHeader = `| ${columns.join(' | ')} |`;
        const separator = `| ${columns.map(() => '---').join(' | ')} |`;
        const body = rows.map(row => `| ${columns.map(column => escapeMarkdownCell(row[column])).join(' | ')} |`);
        return [header, '', generated, '', tableHeader, separator, ...body, ''].join('\n');
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

    function openPayloadModal(customTitle, customContent) {
        if (customTitle && customContent) {
            dom.payloadCode.innerHTML = syntaxHighlightJSON(customContent);
            dom.modalSubtitle.textContent = customTitle;
            dom.copyText.textContent = 'Copiar';
            dom.payloadModal.classList.remove('hidden');
            dom.payloadModal.classList.add('flex');
            document.body.style.overflow = 'hidden';
            return;
        }

        if (!state.currentFields.length) return;

        const payloadInfo = generatePayloadString();
        dom.payloadCode.innerHTML = syntaxHighlightJSON(payloadInfo.str);
        
        dom.payloadCode.innerHTML = dom.payloadCode.innerHTML.replace(/(\/\/ REQUERIDO|\/\/ Opcional)/g, '<span class="text-editor-subtext italic">$1</span>');

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

        dom.createResponsePanel.classList.add('hidden');

        dom.createModalBody.innerHTML = '';
        const fragment = document.createDocumentFragment();

        dataFields.forEach(field => {
            const row = buildFieldInput(field);
            fragment.appendChild(row);
        });

        dom.createModalBody.appendChild(fragment);

        dom.btnSubmitDoc.disabled = false;

        dom.createModal.classList.remove('hidden');
        dom.createModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }

    function openEditModal(record) {
        state.editingRecord = record.name;
        state.originalRecord = { ...record };

        openCreateModal();
        
        $('#create-modal h3').textContent = `Editar ${record.name}`;
        dom.createSubtitle.textContent = state.currentDocType;
        dom.submitDocText.textContent = 'Guardar Cambios (PUT)';

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
        state.editingRecord = null;
        state.originalRecord = null;
        $('#create-modal h3').textContent = 'Crear Documento';
        dom.submitDocText.textContent = 'Enviar POST';
        
        dom.createModal.classList.add('hidden');
        dom.createModal.classList.remove('flex');
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

        let input;

        if (ft === 'select') {
            input = document.createElement('select');
            input.className = 'input-field create-input';
            const opts = (field.options || '').split('\n').filter(Boolean);
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
            return wrapper;
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

    async function fillCreateFormWithTestData() {
        if (state.editingRecord) {
            showToast('El autorrelleno solo está disponible al crear documentos nuevos.', 'info');
            return;
        }

        const inputs = Array.from(dom.createModalBody.querySelectorAll('[data-fieldname]'));
        if (!inputs.length) return;

        const originalText = dom.btnFillTestData?.textContent;
        if (dom.btnFillTestData) {
            dom.btnFillTestData.disabled = true;
            dom.btnFillTestData.textContent = 'Generando...';
        }

        try {
            let filledCount = 0;
            for (const input of inputs) {
                const field = state.currentFields.find(f => f.fieldname === input.dataset.fieldname);
                if (!field) continue;

                const value = await getTestValueForField(field, inputs);
                applyTestValueToInput(input, value);
                input.classList.remove('create-input-error');
                filledCount++;
            }
            showToast(`Formulario rellenado: ${filledCount} campos con datos de prueba.`, 'success');
        } catch (err) {
            showToast(`No se pudo autorrellenar todo: ${err.message}`, 'error');
        } finally {
            if (dom.btnFillTestData) {
                dom.btnFillTestData.disabled = false;
                dom.btnFillTestData.textContent = originalText || '🧪 Rellenar prueba';
            }
        }
    }

    async function getTestValueForField(field, inputs = []) {
        const ft = (field.fieldtype || '').toLowerCase();
        const name = (field.fieldname || '').toLowerCase();
        const label = (field.label || '').toLowerCase();
        const key = `${name} ${label}`;
        const stamp = Date.now().toString(36).slice(-5).toUpperCase();

        if (ft === 'check') return 1;
        if (ft === 'int') return key.includes('year') || key.includes('año') ? new Date().getFullYear() : Math.floor(Math.random() * 90) + 10;
        if (ft === 'float' || ft === 'currency') return Number((Math.random() * 900 + 100).toFixed(2));
        if (ft === 'percent') return Math.floor(Math.random() * 100);
        if (ft === 'date') return new Date().toISOString().slice(0, 10);
        if (ft === 'datetime') return new Date().toISOString().slice(0, 16);
        if (ft === 'time') return new Date().toTimeString().slice(0, 5);
        if (ft === 'select') return getFirstSelectOption(field);
        if (ft === 'link' && field.options) return await getSampleLinkValue(field.options);
        if (ft === 'dynamic link') return await getDynamicLinkTestValue(field, inputs);
        if (ft === 'table' || ft === 'table multiselect') return [getChildTableTestRow(field)];
        if (ft === 'attach' || ft === 'attach image') return `/files/test-${stamp.toLowerCase()}.txt`;
        if (ft === 'text editor' || ft === 'html editor') return `<p>Prueba automática ${stamp}</p>`;
        if (ft === 'markdown editor') return `## Prueba automática ${stamp}\n\nContenido generado para validar el POST.`;
        if (ft === 'code') return JSON.stringify({ test: true, ref: stamp }, null, 2);
        if (ft === 'text' || ft === 'small text' || ft === 'long text') return `Texto de prueba ${stamp}`;

        if (key.includes('email') || key.includes('correo')) return `test.${stamp.toLowerCase()}@example.com`;
        if (key.includes('phone') || key.includes('telefono') || key.includes('teléfono') || key.includes('mobile')) return '+34600000000';
        if (key.includes('url') || key.includes('web')) return 'https://example.com';
        if (key.includes('name') || key.includes('nombre') || key.includes('title') || key.includes('titulo')) return `Prueba ${state.currentDocType || 'Doc'} ${stamp}`;
        if (key.includes('code') || key.includes('codigo') || key.includes('código')) return `TEST-${stamp}`;

        return `Valor prueba ${stamp}`;
    }

    function getFirstSelectOption(field) {
        const options = (field.options || '').split('\n').map(o => o.trim()).filter(Boolean);
        return options[0] || '';
    }

    async function getSampleLinkValue(docType) {
        if (state.randomLinkCache[docType]) return state.randomLinkCache[docType];

        try {
            const res = await apiFetch(`/api/resource/${encodeURIComponent(docType)}?fields=${encodeURIComponent(JSON.stringify(['name']))}&limit_page_length=1&order_by=modified%20desc`);
            const data = await res.json();
            const value = data.data?.[0]?.name || `TEST-${docType.replace(/\s+/g, '-').toUpperCase()}`;
            state.randomLinkCache[docType] = value;
            return value;
        } catch {
            return `TEST-${docType.replace(/\s+/g, '-').toUpperCase()}`;
        }
    }

    async function getDynamicLinkTestValue(field, inputs) {
        const targetFieldname = field.options;
        let targetDocType = '';

        if (targetFieldname) {
            const targetInput = inputs.find(input => input.dataset.fieldname === targetFieldname);
            targetDocType = targetInput?.value?.trim() || '';

            if (!targetDocType && targetInput) {
                targetDocType = state.currentDocType || 'DocType';
                targetInput.value = targetDocType;
            }
        }

        targetDocType = targetDocType || state.currentDocType || 'DocType';
        return await getSampleLinkValue(targetDocType);
    }

    function getChildTableTestRow(field) {
        return {
            doctype: field.options || undefined,
            idx: 1,
            description: 'Fila de prueba automática',
            qty: 1,
            amount: 1,
        };
    }

    function applyTestValueToInput(input, value) {
        if (input.dataset.fieldtype === 'check') {
            input.checked = Boolean(value);
            return;
        }

        if (input.dataset.isJson) {
            input.value = JSON.stringify(value ?? [], null, 2);
            return;
        }

        input.value = value ?? '';
    }

    async function submitNewDoc() {
        if (!state.currentDocType) return;

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

            if (input.dataset.required === '1' && !state.editingRecord && (value === '' || value === undefined)) {
                input.classList.add('create-input-error');
                missingRequired = true;
            } else {
                input.classList.remove('create-input-error');
            }

            if (value !== '' && value !== undefined) {
                body[fname] = value;
            }
        });

        if (missingRequired && !state.editingRecord) {
            showToast('Completa los campos obligatorios (marcados con *)', 'error');
            return;
        }

        if (state.editingRecord) {
            const diffs = [];
            for (const [key, newVal] of Object.entries(body)) {
                let oldVal = state.originalRecord[key];
                
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
            return;
        }

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
                    <div class="p-2 rounded bg-editor-surface border border-editor-red text-editor-red overflow-x-auto whitespace-nowrap">
                        <span class="opacity-70 line-through mr-1">-</span> ${escapeHtml(String(d.old === undefined || d.old === null ? 'null' : (typeof d.old === 'object' ? JSON.stringify(d.old) : d.old)))}
                    </div>
                    <div class="p-2 rounded bg-editor-surface border border-editor-green text-editor-green overflow-x-auto whitespace-nowrap">
                        <span class="opacity-70 mr-1">+</span> ${escapeHtml(String(typeof d.new === 'object' ? JSON.stringify(d.new) : d.new))}
                    </div>
                </div>
            `;
            frag.appendChild(row);
        });

        dom.diffModalBody.appendChild(frag);
        dom.diffModal.classList.remove('hidden');
        dom.diffModal.classList.add('flex');

        const handleConfirm = async () => {
            closeDiffModal();
            const endpoint = `/api/resource/${encodeURIComponent(state.currentDocType)}/${encodeURIComponent(state.editingRecord)}`;
            await executeSubmitDoc('PUT', endpoint, finalBody);
            dom.btnConfirmDiff.removeEventListener('click', handleConfirm);
        };

        const newBtn = dom.btnConfirmDiff.cloneNode(true);
        dom.btnConfirmDiff.parentNode.replaceChild(newBtn, dom.btnConfirmDiff);
        dom.btnConfirmDiff = newBtn;
        dom.btnConfirmDiff.addEventListener('click', handleConfirm);
    }

    function closeDiffModal() {
        dom.diffModal.classList.add('hidden');
        dom.diffModal.classList.remove('flex');
    }

    async function executeSubmitDoc(method, endpoint, body) {
        dom.btnSubmitDoc.disabled = true;
        dom.submitDocText.textContent = method === 'PUT' ? 'Guardando...' : 'Enviando...';

        try {
            const res = await apiFetch(endpoint, {
                method: method,
                body: JSON.stringify(body),
            });

            const data = await res.json();

            dom.createResponsePanel.classList.remove('hidden');
            dom.createResponseBody.innerHTML = syntaxHighlightJSON(JSON.stringify(data, null, 2));

            const statusEl = dom.createResponseStatus;
            if (res.ok) {
                statusEl.textContent = `${res.status} OK`;
                statusEl.className = 'text-[10px] font-medium px-2 py-0.5 rounded-full bg-editor-green text-white';
                showToast(`Documento ${method === 'PUT' ? 'actualizado' : 'creado'} correctamente`, 'success');
                
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
        
        state.selectedRecords.clear();
        updateBulkBar();

        if (showLoading) {
            dom.recordsTableContainer.classList.add('hidden');
            dom.recordsEmpty.classList.add('hidden');
            dom.recordsEmpty.classList.remove('flex');
            dom.recordsLoading.classList.remove('hidden');
            dom.recordsLoading.classList.add('flex');
            dom.recordsSubtitle.textContent = 'Descargando datos...';
        } else {
            dom.recordsSubtitle.textContent = 'Actualizando datos...';
        }

        try {
            let filtersParam = '';
            const filters = [];

            // 1. Quick Search Logic (Common fields)
            const quickSearch = dom.inputRecordsQuickSearch.value.trim();
            if (quickSearch) {
                const searchFields = ['name', 'email', 'email_id', 'full_name', 'modified_by', 'owner', 'title'];
                let availableSearchFields = state.currentFields
                    .filter(f => searchFields.includes(f.fieldname))
                    .map(f => f.fieldname);
                
                // Important: System fields like modified_by and owner are often implicit 
                // and might not be in state.currentFields. We add them manually.
                ['name', 'modified_by', 'owner'].forEach(sysField => {
                    if (!availableSearchFields.includes(sysField)) {
                        availableSearchFields.push(sysField);
                    }
                });
                
                if (availableSearchFields.length > 0) {
                    // Note: This is an AND filter for multiple fields if we just push them, 
                    // but we'll pick the most relevant one or use 'name' if no match.
                    const bestField = availableSearchFields.find(f => f.includes('email') && quickSearch.includes('@')) || 
                                     availableSearchFields.find(f => (f === 'modified_by' || f === 'owner') && quickSearch.includes('@')) ||
                                     availableSearchFields.find(f => f.includes('name')) || 
                                     availableSearchFields[0];
                    filters.push([bestField, 'like', `%${quickSearch}%`]);
                } else {
                    filters.push(['name', 'like', `%${quickSearch}%`]);
                }
            }

            // 2. Advanced Query Filters
            if (state.queryFilters && state.queryFilters.length > 0) {
                const validFilters = state.queryFilters.filter(f => f.fieldname && f.operator);
                validFilters.forEach(f => {
                    let op = f.operator;
                    let val = f.value || '';
                    if (op === 'contains') { op = 'like'; val = `%${val}%`; }
                    filters.push([f.fieldname, op, val]);
                });
            }

            if (filters.length > 0) {
                filtersParam = `&filters=${encodeURIComponent(JSON.stringify(filters))}`;
            }

            const url = `/api/resource/${encodeURIComponent(state.currentDocType)}?fields=["*"]&limit_page_length=50&order_by=creation desc${filtersParam}`;
            const res = await apiFetch(url);

            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            const records = data.data || [];
            state.currentRecords = records;

            // Reset UI states
            dom.recordsLoading.classList.add('hidden');
            dom.recordsEmpty.classList.add('hidden');
            dom.recordsTableContainer.classList.add('hidden');

            if (records.length === 0) {
                dom.recordsSubtitle.textContent = `0 registros · ${state.currentDocType}`;
                dom.recordsEmpty.classList.remove('hidden');
                dom.recordsEmpty.classList.add('flex');
            } else {
                dom.recordsSubtitle.textContent = `Mostrando ${records.length} registro(s) · ${state.currentDocType}`;
                renderRecordsTable(records);
                dom.recordsTableContainer.classList.remove('hidden');
            }

        } catch (err) {
            console.error(err);
            const msg = err.response ? await parseFrappeError(err.response, 'Fallo al descargar registros') : `Error de la App: ${err.message}`;
            showToast(msg, 'error');
        } finally {
            dom.recordsLoading.classList.add('hidden');
            dom.recordsLoading.classList.remove('flex');
        }
    }

    function renderRecordsTable(records) {
        dom.recordsTheadTr.innerHTML = '';
        dom.recordsTbody.innerHTML = '';

        if (!records.length) return;

        const firstRecord = records[0];
        const priorityKeys = ['name', 'creation', 'first_name', 'email', 'status', 'custom_tipo_de_lead'];
        let rawKeys = Object.keys(firstRecord).filter(k => !k.startsWith('_'));

        const keys = rawKeys.sort((a, b) => {
            const idxA = priorityKeys.indexOf(a);
            const idxB = priorityKeys.indexOf(b);
            if (idxA !== -1 && idxB !== -1) return idxA - idxB;
            if (idxA !== -1) return -1;
            if (idxB !== -1) return 1;
            return a.localeCompare(b);
        });

        const fragHead = document.createDocumentFragment();
        
        const thCb = document.createElement('th');
        thCb.className = 'py-3 px-4 w-10 text-center sticky top-0 bg-editor-surface2 z-30 shadow-sm';
        thCb.innerHTML = `<input type="checkbox" id="cb-select-all" class="rounded border-editor-border bg-editor-surface focus:ring-0 cursor-pointer">`;
        fragHead.appendChild(thCb);

        keys.forEach(key => {
            const th = document.createElement('th');
            th.className = 'py-3 px-4 font-semibold text-editor-subtext whitespace-nowrap cursor-default sticky top-0 bg-editor-surface2 z-30 shadow-sm';
            th.textContent = key;
            fragHead.appendChild(th);
        });
        const thActions = document.createElement('th');
        thActions.className = 'py-3 px-4 font-semibold text-editor-subtext whitespace-nowrap text-right sticky top-0 bg-editor-surface2 z-30 shadow-sm';
        thActions.textContent = 'ACCIONES';
        fragHead.appendChild(thActions);

        dom.recordsTheadTr.appendChild(fragHead);

        const fragBody = document.createDocumentFragment();
        records.forEach((record, index) => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-editor-surface2 transition-colors animate-fade-in group';
            tr.style.animationDelay = `${Math.min(index * 15, 300)}ms`;

            tr.title = "Haz clic en una celda para copiar su valor";

            const tdCb = document.createElement('td');
            tdCb.className = 'py-2.5 px-4 w-10 text-center cursor-default';
            tdCb.innerHTML = `<input type="checkbox" class="cb-record rounded border-editor-border bg-editor-surface focus:ring-0 cursor-pointer" value="${record.name}">`;
            tdCb.addEventListener('click', (e) => e.stopPropagation());
            tr.appendChild(tdCb);

            keys.forEach(key => {
                const td = document.createElement('td');
                td.className = 'py-2.5 px-4 whitespace-nowrap max-w-[200px] truncate cursor-pointer hover:text-editor-accent transition-colors';
                
                let val = record[key];
                if (val === null || val === undefined) val = '—';
                else if (typeof val === 'object') val = JSON.stringify(val);

                td.textContent = String(val);

                td.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    if (val !== '—') {
                        await copyToClipboard(String(record[key]));
                        showToast(`Copiado: ${val}`, 'success');
                    }
                });

                tr.appendChild(td);
            });

            const tdAct = document.createElement('td');
            tdAct.className = 'py-2.5 px-4 whitespace-nowrap text-right transition-colors flex flex-row items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100';
            
            const btnEdit = document.createElement('button');
            btnEdit.className = 'py-1 px-2.5 bg-editor-surface border border-editor-border rounded shadow-sm text-[10px] hover:bg-editor-yellow hover:text-white transition-colors text-editor-text font-medium';
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
        dom.recordsTableContainer.classList.remove('hidden');

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
                addQueryFilter();
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
            dom.queryFiltersList.innerHTML = '<div class="text-[11px] text-editor-subtext italic p-2">No hay filtros aplicados. Haz clic en "+ Añadir filtro" para comenzar.</div>';
            return;
        }

        const dataFields = state.currentFields.filter(f => !isMeta(f.fieldtype)).sort((a,b) => {
            const labelA = a.label || a.fieldname;
            const labelB = b.label || b.fieldname;
            return labelA.localeCompare(labelB);
        });
        
        const operators = [
            { val: 'contains', label: 'Contiene' },
            { val: '=', label: 'Igual a' },
            { val: '!=', label: 'Distinto de' },
            { val: 'like', label: 'Like (usa %)' },
            { val: 'not like', label: 'Not Like' },
            { val: 'in', label: 'En lista' },
            { val: 'not in', label: 'No en lista' },
            { val: '>', label: 'Mayor que' },
            { val: '<', label: 'Menor que' },
            { val: '>=', label: 'Mayor igual' },
            { val: '<=', label: 'Menor igual' },
            { val: 'is', label: 'Es (set/unset)' }
        ];

        state.queryFilters.forEach((filter, index) => {
            const row = document.createElement('div');
            row.className = 'query-filter-row flex items-center gap-2 w-full animate-fade-in';

            const selField = document.createElement('select');
            selField.className = `qf-field input-field h-9 text-[11px] py-0 w-1/3 field-select transition-all ${!filter.fieldname ? 'border-editor-red/40 bg-editor-red/5' : ''}`;
            selField.innerHTML = `<option value="">-- Selecciona Campo --</option>` + 
                dataFields.map(f => `<option value="${f.fieldname}" ${filter.fieldname === f.fieldname ? 'selected' : ''}>${f.label || f.fieldname}</option>`).join('');
            
            const selOp = document.createElement('select');
            selOp.className = 'qf-op input-field h-9 text-[11px] py-0 w-1/4 op-select';
            selOp.innerHTML = operators.map(o => `<option value="${o.val}" ${filter.operator === o.val ? 'selected' : ''}>${o.label}</option>`).join('');

            const inpVal = document.createElement('input');
            inpVal.type = 'text';
            inpVal.className = 'qf-val input-field h-9 text-[11px] py-0 flex-1 val-input';
            inpVal.placeholder = 'Valor...';
            inpVal.value = filter.value || '';

            const btnRm = document.createElement('button');
            btnRm.className = 'w-9 h-9 flex items-center justify-center rounded border border-editor-border text-editor-subtext hover:text-white hover:bg-editor-red transition-colors';
            btnRm.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
            btnRm.onclick = () => removeQueryFilter(index);

            // Sync interactions
            selField.onchange = () => { 
                filter.fieldname = selField.value;
                selField.classList.toggle('border-editor-red/40', !selField.value);
                selField.classList.toggle('bg-editor-red/5', !selField.value);
            };
            selOp.onchange = () => { filter.operator = selOp.value; };
            inpVal.oninput = () => { 
                filter.value = inpVal.value; 
                // Smart Selection: if field is empty, try to guess it
                if (!filter.fieldname && filter.value.length > 3) {
                    const val = filter.value.toLowerCase();
                    let guessed = '';
                    if (val.includes('@')) {
                        guessed = dataFields.find(f => f.fieldname.includes('email'))?.fieldname;
                    } else {
                        guessed = dataFields.find(f => f.fieldname.includes('name'))?.fieldname;
                    }
                    if (guessed) {
                        filter.fieldname = guessed;
                        selField.value = guessed;
                        selField.classList.remove('border-editor-red/40', 'bg-editor-red/5');
                    }
                }
            };
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

        const allKeys = new Set();
        state.currentRecords.forEach(record => Object.keys(record).forEach(k => allKeys.add(k)));
        const headers = Array.from(allKeys).sort();

        const csvContent = rowsToCSV(state.currentRecords, headers);
        downloadFile(`${getSafeFileBaseName(state.currentDocType)}_export.csv`, csvContent, 'text/csv;charset=utf-8;');
        
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
        renderLogs();
        
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

        dom.logDetailsContent.innerHTML = content;
    }

    function closeLogDetails() {
        state.selectedLogId = null;
        dom.logDetailsPanel.classList.add('hidden');
        dom.logDetailsPanel.classList.remove('flex');
        renderLogs();
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

    function openTestGeneratorModal() {
        if (!state.currentDocType || !state.currentFields.length) {
            showToast('Selecciona un DocType antes de generar tests API.', 'info');
            return;
        }

        if (dom.testGeneratorSubtitle) {
            dom.testGeneratorSubtitle.textContent = `${state.currentDocType} · elige cantidad y tipo de tests`;
        }
        if (dom.testGeneratorCount) {
            dom.testGeneratorCount.value = '4';
        }
        dom.testGeneratorModal?.querySelectorAll('[data-test-method]').forEach(input => {
            input.checked = input.dataset.testMethod === 'GET';
        });
        showModal(dom.testGeneratorModal);
    }

    function closeTestGeneratorModal() {
        hideModal(dom.testGeneratorModal);
    }

    async function confirmTestGenerator() {
        const selectedMethods = Array.from(dom.testGeneratorModal?.querySelectorAll('[data-test-method]:checked') || [])
            .map(input => input.dataset.testMethod);
        const maxTests = Math.max(1, Math.min(4, parseInt(dom.testGeneratorCount?.value || '4', 10) || 4));

        if (selectedMethods.length === 0) {
            showToast('Selecciona al menos un método.', 'info');
            return;
        }

        if (dom.btnConfirmTestGenerator) {
            dom.btnConfirmTestGenerator.disabled = true;
            dom.btnConfirmTestGenerator.textContent = 'Creando...';
        }

        try {
            await generateApiTestsForCurrentDocType({ selectedMethods, maxTests });
            closeTestGeneratorModal();
        } finally {
            if (dom.btnConfirmTestGenerator) {
                dom.btnConfirmTestGenerator.disabled = false;
                dom.btnConfirmTestGenerator.textContent = 'Crear tests';
            }
        }
    }

    async function generateApiTestsForCurrentDocType({ selectedMethods = [], maxTests = 4 } = {}) {
        if (!state.currentDocType || !state.currentFields.length) {
            showToast('Selecciona un DocType antes de generar tests API.', 'info');
            return;
        }

        const selected = new Set(selectedMethods);
        const docType = state.currentDocType;
        const encodedDocType = encodeURIComponent(docType);
        const candidates = [];
        let firstRecordName = '';

        if (selected.has('GET')) {
            candidates.push({
                name: `${docType} - GET prueba`,
                method: 'GET',
                endpoint: `resource/${encodedDocType}?fields=${encodeURIComponent(JSON.stringify(['name']))}&limit_page_length=5`,
                body: '',
                assertStatus: '200',
                assertBody: ''
            });
        }

        if (selected.has('POST')) {
            const postPayload = await buildAutoPostPayloadForTest();
            if (postPayload) {
                candidates.push({
                    name: `${docType} - POST prueba`,
                    method: 'POST',
                    endpoint: `resource/${encodedDocType}`,
                    body: JSON.stringify(postPayload, null, 2),
                    assertStatus: '201/200',
                    assertBody: ''
                });
            }
        }

        if (selected.has('PUT')) {
            firstRecordName = firstRecordName || await fetchFirstRecordNameForTest(docType);
            const putPayload = await buildAutoPostPayloadForTest();
            if (firstRecordName && putPayload) {
                candidates.push({
                    name: `${docType} - PUT prueba`,
                    method: 'PUT',
                    endpoint: `resource/${encodedDocType}/${encodeURIComponent(firstRecordName)}`,
                    body: JSON.stringify(putPayload, null, 2),
                    assertStatus: '200',
                    assertBody: firstRecordName
                });
            }
        }

        if (selected.has('DELETE')) {
            candidates.push({
                name: `${docType} - DELETE plantilla`,
                method: 'DELETE',
                endpoint: `resource/${encodedDocType}/REEMPLAZA_DOCNAME`,
                body: '',
                assertStatus: '200/202',
                assertBody: ''
            });
        }

        const limitedCandidates = candidates.slice(0, maxTests);
        let created = 0;
        let firstCreatedId = null;
        const existingNames = new Set(state.apiTests.map(test => normalizeTestName(test.name)));

        limitedCandidates.forEach(test => {
            if (existingNames.has(normalizeTestName(test.name))) return;

            const newTest = {
                id: `test_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
                ...test
            };
            state.apiTests.push(newTest);
            existingNames.add(normalizeTestName(test.name));
            firstCreatedId = firstCreatedId || newTest.id;
            created++;
        });

        if (created > 0) {
            saveApiTests();
            if (firstCreatedId) selectTest(firstCreatedId);
            renderTestsList();
        }

        const skipped = limitedCandidates.length - created;
        const unavailable = selectedMethods.length - candidates.length;
        if (created === 0 && skipped > 0) {
            showToast(`No se crearon tests nuevos: ya existían ${skipped}.`, 'info');
            return;
        }

        const skippedText = skipped ? ` (${skipped} ya existían)` : '';
        const unavailableText = unavailable > 0 ? ` ${unavailable} no estaban disponibles.` : '';
        showToast(`${created} tests API creados${skippedText}.${unavailableText}`, created ? 'success' : 'info');
    }

    function normalizeTestName(name) {
        return String(name || '').trim().toLowerCase();
    }

    function parseExpectedStatuses(value) {
        const statuses = String(value || '200')
            .split(/[\/,\s]+/)
            .map(item => parseInt(item, 10))
            .filter(Number.isFinite);
        return statuses.length ? statuses : [200];
    }

    function renderTestResponsePreview(rawBody) {
        if (!rawBody) {
            return '<div class="mt-2 text-[10px] text-editor-subtext italic">Respuesta vacía.</div>';
        }

        let formatted = rawBody;
        try {
            formatted = JSON.stringify(JSON.parse(rawBody), null, 2);
        } catch {
            formatted = rawBody;
        }

        const maxLength = 3000;
        const truncated = formatted.length > maxLength;
        const preview = truncated ? `${formatted.slice(0, maxLength)}\n... respuesta truncada ...` : formatted;

        return `
            <details class="mt-2 rounded border border-editor-border bg-editor-surface2/60">
                <summary class="cursor-pointer px-2 py-1 text-[10px] font-bold text-editor-text">Ver respuesta</summary>
                <pre class="p-2 overflow-auto max-h-64 text-[10px] whitespace-pre-wrap break-all text-editor-text">${escapeHtml(preview)}</pre>
            </details>
        `;
    }

    async function fetchFirstRecordNameForTest(docType) {
        try {
            const endpoint = `/api/resource/${encodeURIComponent(docType)}?fields=${encodeURIComponent(JSON.stringify(['name']))}&limit_page_length=1&order_by=modified%20desc`;
            const res = await apiFetch(endpoint);
            const data = await res.json();
            return data.data?.[0]?.name || '';
        } catch {
            return '';
        }
    }

    async function buildAutoPostPayloadForTest() {
        const unsafeTypes = new Set(['attach', 'attach image', 'table', 'table multiselect', 'dynamic link', 'button']);
        const systemFields = new Set(['owner', 'creation', 'modified', 'modified_by', 'idx', 'docstatus', 'name', '_user_tags', '_comments', '_assign', '_liked_by']);
        const writableFields = state.currentFields.filter(field => {
            const ft = (field.fieldtype || '').toLowerCase();
            return field.fieldname && !isMeta(ft) && !unsafeTypes.has(ft) && !systemFields.has(field.fieldname) && field.read_only !== 1 && field.hidden !== 1;
        });
        const requiredFields = writableFields.filter(field => field.reqd === 1);
        const optionalFields = writableFields
            .filter(field => field.reqd !== 1)
            .filter(field => /name|title|email|code|description|phone|date/i.test(`${field.fieldname || ''} ${field.label || ''}`))
            .slice(0, Math.max(0, 5 - requiredFields.length));
        const fieldsForPayload = [...requiredFields, ...optionalFields];

        if (fieldsForPayload.length === 0) return null;

        const payload = {};
        for (const field of fieldsForPayload) {
            payload[field.fieldname] = await getTestValueForField(field, []);
        }
        return payload;
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
                
                const expectedStatuses = parseExpectedStatuses(test.assertStatus || '200');
                let expectsMet = true;
                const msgs = [];
                
                if (expectedStatuses.includes(res.status)) {
                    msgs.push(`<span class="text-editor-green">✓ Status ${res.status} coincide con el esperado (${expectedStatuses.join('/')})</span>`);
                } else {
                    expectsMet = false;
                    msgs.push(`<span class="text-editor-red">✗ Status ${res.status} NO coincide con el esperado (${expectedStatuses.join('/')})</span>`);
                }
                
                if (test.assertBody) {
                    if (textBody.includes(test.assertBody)) {
                        msgs.push(`<span class="text-editor-green">✓ Body contiene validación "${escapeHtml(test.assertBody)}"</span>`);
                    } else {
                        expectsMet = false;
                        msgs.push(`<span class="text-editor-red">✗ Body NO contiene validación "${escapeHtml(test.assertBody)}"</span>`);
                    }
                }

                const responsePreview = renderTestResponsePreview(textBody);
                
                if (expectsMet) {
                    isSuccess = true;
                    logEntry.classList.add('border-editor-green');
                    logEntry.innerHTML += `<div class="mt-1">${msgs.join('<br>')}</div>${responsePreview}<div class="font-bold text-editor-green mt-1">✅ TEST PASADO (${Date.now() - startTime}ms)</div>`;
                    passed++;
                } else {
                    logEntry.classList.add('border-editor-red');
                    logEntry.innerHTML += `<div class="mt-1">${msgs.join('<br>')}</div>${responsePreview}<div class="font-bold text-editor-red mt-1">❌ TEST FALLIDO (${Date.now() - startTime}ms)</div>`;
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

    // ── Dashboard & Console ───────────────────────────
    async function openDashboard() {
        if (!state.connected) {
            showToast('Conéctate primero para abrir el dashboard.', 'error');
            return;
        }

        const modal = ensureDashboardModal();
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        renderDashboardLoading();
        await refreshDashboard();
    }

    function ensureDashboardModal() {
        if (state.dashboardModalEl) return state.dashboardModalEl;

        const modal = document.createElement('div');
        modal.id = 'dashboard-modal-runtime';
        modal.className = 'hidden fixed inset-0 z-[210] dashboard-backdrop items-center justify-center p-4';
        modal.innerHTML = `
            <div class="dashboard-shell w-full max-w-6xl h-[88vh] border border-editor-border rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                <div class="dashboard-header px-6 py-4 border-b border-editor-border flex items-center justify-between gap-4">
                    <div class="flex items-center gap-3 min-w-0">
                        <div class="dashboard-icon w-9 h-9 rounded-xl flex items-center justify-center text-lg">📊</div>
                        <div class="min-w-0">
                            <h3 class="text-sm font-bold text-editor-text">Resumen</h3>
                            <p id="dashboard-subtitle" class="text-[10px] text-editor-subtext truncate">Estado de la conexión y del DocType actual</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 flex-shrink-0">
                        <button id="btn-refresh-dashboard-runtime" class="dashboard-soft-btn py-1.5 px-3 rounded-lg text-[11px] font-bold border transition-all">Refrescar</button>
                        <button id="btn-close-dashboard-runtime" class="dashboard-icon-btn w-8 h-8 rounded-lg flex items-center justify-center transition-all">✕</button>
                    </div>
                </div>
                <div id="dashboard-body" class="dashboard-body flex-1 overflow-y-auto custom-scrollbar p-6"></div>
            </div>
        `;
        document.body.appendChild(modal);
        state.dashboardModalEl = modal;

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeDashboard();
        });
        modal.querySelector('#btn-close-dashboard-runtime').addEventListener('click', closeDashboard);
        modal.querySelector('#btn-refresh-dashboard-runtime').addEventListener('click', refreshDashboard);
        return modal;
    }

    function closeDashboard() {
        if (!state.dashboardModalEl) return;
        state.dashboardModalEl.classList.add('hidden');
        state.dashboardModalEl.classList.remove('flex');
    }

    function renderDashboardLoading() {
        const body = state.dashboardModalEl?.querySelector('#dashboard-body');
        if (!body) return;
        body.innerHTML = `
            <div class="h-full min-h-[360px] flex flex-col items-center justify-center text-editor-subtext gap-3">
                <div class="loader-ring"></div>
                <p class="text-xs font-semibold uppercase tracking-widest">Cargando datos...</p>
            </div>
        `;
    }

    async function refreshDashboard() {
        if (!state.dashboardModalEl) return;

        const refreshBtn = state.dashboardModalEl.querySelector('#btn-refresh-dashboard-runtime');
        refreshBtn.disabled = true;
        refreshBtn.textContent = 'Actualizando...';

        try {
            const dashboard = await collectDashboardData();
            renderDashboard(dashboard);
        } catch (err) {
            const body = state.dashboardModalEl.querySelector('#dashboard-body');
            body.innerHTML = `
                <div class="h-full min-h-[320px] flex flex-col items-center justify-center text-center gap-3">
                    <div class="text-4xl">⚠️</div>
                    <h4 class="text-sm font-bold text-editor-text">No se pudo cargar el resumen</h4>
                    <p class="text-xs text-editor-subtext max-w-md">${escapeHtml(err.message || 'Error desconocido')}</p>
                </div>
            `;
        } finally {
            refreshBtn.disabled = false;
            refreshBtn.textContent = 'Refrescar';
        }
    }

    async function collectDashboardData() {
        const now = new Date();
        const recentLogs = state.requestLogs.slice(0, 25);
        const dashboard = {
            baseUrl: state.baseUrl,
            currentDocType: state.currentDocType || null,
            totalDocTypes: state.allDocTypes.length,
            loadedFields: state.currentFields.length,
            dataFields: state.currentFields.filter(f => !isMeta(f.fieldtype)).length,
            layoutFields: state.currentFields.filter(f => isMeta(f.fieldtype)).length,
            requiredFields: state.currentFields.filter(f => f.reqd).length,
            readOnlyFields: state.currentFields.filter(f => f.read_only).length,
            linkFields: state.currentFields.filter(f => ['link', 'dynamic link'].includes((f.fieldtype || '').toLowerCase())).length,
            tableFields: state.currentFields.filter(f => ['table', 'table multiselect'].includes((f.fieldtype || '').toLowerCase())).length,
            savedCollections: state.savedCollections.length,
            savedSnapshots: Object.keys(state.schemaSnapshots || {}).length,
            apiTests: state.apiTests.length,
            requestLogs: state.requestLogs.length,
            generatedAt: now,
            serverStatus: 'unknown',
            serverVersion: null,
            docCountForCurrentDocType: null,
            recentRecords: [],
            lastError: null,
            successRequests: recentLogs.filter(log => log.status >= 200 && log.status < 300).length,
            failedRequests: recentLogs.filter(log => log.error || log.status >= 400).length,
            avgDuration: recentLogs.length
                ? Math.round(recentLogs.reduce((sum, log) => sum + (Number(log.duration) || 0), 0) / recentLogs.length)
                : 0,
        };

        try {
            const statusRes = await fetch('/api/status');
            if (statusRes.ok) {
                const statusData = await statusRes.json();
                dashboard.serverStatus = statusData.status || 'ok';
                dashboard.serverVersion = statusData.version || null;
            } else {
                dashboard.serverStatus = `http ${statusRes.status}`;
            }
        } catch {
            dashboard.serverStatus = 'unreachable';
        }

        if (state.currentDocType) {
            try {
                const countRes = await apiFetch(`/api/method/frappe.client.get_count?doctype=${encodeURIComponent(state.currentDocType)}`);
                const countData = await countRes.json();
                dashboard.docCountForCurrentDocType = countData.message ?? 0;
            } catch (err) {
                dashboard.lastError = err.message || 'No se pudo obtener el conteo';
            }

            try {
                const fields = encodeURIComponent(JSON.stringify(['name', 'owner', 'modified', 'creation']));
                const res = await apiFetch(`/api/resource/${encodeURIComponent(state.currentDocType)}?fields=${fields}&limit_page_length=5&order_by=modified%20desc`);
                const data = await res.json();
                dashboard.recentRecords = data.data || [];
            } catch {
                dashboard.recentRecords = [];
            }
        }

        return dashboard;
    }

    function renderDashboard(dashboard) {
        const body = state.dashboardModalEl?.querySelector('#dashboard-body');
        const subtitle = state.dashboardModalEl?.querySelector('#dashboard-subtitle');
        if (!body) return;

        if (subtitle) {
            subtitle.textContent = `${dashboard.baseUrl} · ${dashboard.currentDocType || 'sin DocType seleccionado'} · ${dashboard.generatedAt.toLocaleString()}`;
        }

        const fieldTypes = getFieldTypeStats();
        const fieldStatsTotal = fieldTypes.reduce((sum, item) => sum + item.count, 0);
        const recentLogs = state.requestLogs.slice(0, 6);
        const topFieldRows = fieldTypes.length
            ? fieldTypes.slice(0, 8).map(item => renderFieldTypeRow(item, fieldStatsTotal)).join('')
            : '<p class="text-xs text-editor-subtext">Selecciona un DocType para ver sus campos.</p>';

        const recentRecords = dashboard.recentRecords.length
            ? dashboard.recentRecords.map(record => `
                <div class="dashboard-list-row flex items-center justify-between gap-3 py-2">
                    <div class="min-w-0">
                        <div class="text-xs font-semibold text-editor-text truncate">${escapeHtml(record.name || 'Sin nombre')}</div>
                        <div class="text-[10px] text-editor-subtext truncate">${escapeHtml(record.owner || 'sin owner')}</div>
                    </div>
                    <span class="text-[10px] text-editor-subtext font-mono flex-shrink-0">${escapeHtml(formatDateShort(record.modified || record.creation))}</span>
                </div>
            `).join('')
            : `<div class="text-xs text-editor-subtext py-8 text-center">${dashboard.currentDocType ? 'No hay registros recientes accesibles.' : 'Selecciona un DocType para ver registros recientes.'}</div>`;

        const logRows = recentLogs.length
            ? recentLogs.map(log => `
                <div class="dashboard-list-row grid grid-cols-[58px_1fr_56px] gap-2 items-center py-2">
                    <span class="text-[10px] font-bold ${log.status >= 400 || log.error ? 'text-editor-red' : 'text-editor-green'}">${escapeHtml(String(log.status || 'ERR'))}</span>
                    <span class="text-[10px] text-editor-subtext font-mono truncate">${escapeHtml(log.method)} ${escapeHtml(log.url)}</span>
                    <span class="text-[10px] text-editor-subtext text-right">${formatDuration(log.duration)}</span>
                </div>
            `).join('')
            : '<div class="text-xs text-editor-subtext py-8 text-center">Aún no hay peticiones registradas.</div>';

        body.innerHTML = `
            <div class="dashboard-hero mb-5">
                <div class="min-w-0">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="dashboard-status-dot ${dashboard.serverStatus === 'ok' ? 'is-ok' : 'is-error'}"></span>
                        <span class="text-[10px] uppercase tracking-widest font-bold text-editor-subtext">Conexión</span>
                    </div>
                    <h3 class="text-xl font-bold text-editor-text truncate">${escapeHtml(dashboard.currentDocType || 'Sin DocType seleccionado')}</h3>
                    <p class="text-[11px] text-editor-subtext truncate mt-1">${escapeHtml(dashboard.baseUrl || 'Sin URL')}</p>
                </div>
                <div class="dashboard-hero-meta">
                    <span>${escapeHtml(dashboard.generatedAt.toLocaleTimeString())}</span>
                    <span>${escapeHtml(dashboard.serverVersion ? `Proxy ${dashboard.serverVersion}` : 'Servidor local')}</span>
                </div>
            </div>

            <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                ${renderDashboardMetric('Servidor local', dashboard.serverStatus, dashboard.serverStatus === 'ok' ? 'Activo' : 'Revisar', dashboard.serverStatus === 'ok' ? 'green' : 'red')}
                ${renderDashboardMetric('DocTypes', dashboard.totalDocTypes, 'En el listado', 'accent')}
                ${renderDashboardMetric('Registros', dashboard.docCountForCurrentDocType ?? '—', dashboard.currentDocType || 'Sin DocType', 'blue')}
                ${renderDashboardMetric('Peticiones', dashboard.requestLogs, `media ${dashboard.avgDuration || 0} ms`, 'mauve')}
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-5">
                <section class="space-y-5">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                        ${renderSmallStat('Campos', dashboard.loadedFields)}
                        ${renderSmallStat('De datos', dashboard.dataFields)}
                        ${renderSmallStat('Obligatorios', dashboard.requiredFields)}
                        ${renderSmallStat('Layout', dashboard.layoutFields)}
                    </div>

                    <div class="dashboard-card p-4">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h4 class="text-sm font-bold text-editor-text">Campos del DocType</h4>
                                <p class="text-[10px] text-editor-subtext">${escapeHtml(dashboard.currentDocType || 'Sin DocType seleccionado')} · agrupados por tipo</p>
                            </div>
                            <div class="flex gap-2 text-[10px]">
                                <span class="dashboard-chip is-blue">${dashboard.linkFields} links</span>
                                <span class="dashboard-chip is-teal">${dashboard.tableFields} tablas</span>
                            </div>
                        </div>
                        <div class="space-y-3">${topFieldRows}</div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                        ${renderActionCard('Registros', 'Ver los registros del DocType actual.', 'Abrir registros', 'dashboard-action-records')}
                        ${renderActionCard('Tests', 'Revisar o ejecutar pruebas de API.', 'Abrir tests', 'dashboard-action-tests')}
                        ${renderActionCard('Consola', 'Probar una petición manual.', 'Abrir consola', 'dashboard-action-console')}
                    </div>
                </section>

                <aside class="space-y-5">
                    <div class="dashboard-card p-4">
                        <h4 class="text-sm font-bold text-editor-text mb-1">Guardado local</h4>
                        <p class="text-[10px] text-editor-subtext mb-4">Elementos guardados en este navegador.</p>
                        <div class="grid grid-cols-3 gap-2">
                            ${renderSmallStat('Colecciones', dashboard.savedCollections)}
                            ${renderSmallStat('Snapshots', dashboard.savedSnapshots)}
                            ${renderSmallStat('Tests API', dashboard.apiTests)}
                        </div>
                    </div>

                    <div class="dashboard-card p-4">
                        <div class="flex items-center justify-between mb-3">
                            <h4 class="text-sm font-bold text-editor-text">Últimos registros</h4>
                            <span class="text-[10px] text-editor-subtext">5 últimos</span>
                        </div>
                        ${recentRecords}
                    </div>

                    <div class="dashboard-card p-4">
                        <div class="flex items-center justify-between mb-3">
                            <h4 class="text-sm font-bold text-editor-text">Últimas peticiones</h4>
                            <button id="dashboard-action-logs" class="text-[10px] text-editor-accent hover:underline">Ver logs</button>
                        </div>
                        <div class="grid grid-cols-2 gap-2 mb-3">
                            ${renderSmallStat('Correctas', dashboard.successRequests)}
                            ${renderSmallStat('Con error', dashboard.failedRequests)}
                        </div>
                        ${logRows}
                    </div>
                </aside>
            </div>
        `;

        body.scrollTop = 0;
        bindDashboardActions();
    }

    function bindDashboardActions() {
        const modal = state.dashboardModalEl;
        if (!modal) return;

        modal.querySelector('#dashboard-action-records')?.addEventListener('click', () => {
            if (!state.currentDocType) {
                showToast('Selecciona un DocType para abrir registros.', 'warning');
                return;
            }
            closeDashboard();
            openRecordsModal();
        });
        modal.querySelector('#dashboard-action-tests')?.addEventListener('click', () => {
            closeDashboard();
            openTestsModal();
        });
        modal.querySelector('#dashboard-action-console')?.addEventListener('click', () => {
            closeDashboard();
            openConsole();
        });
        modal.querySelector('#dashboard-action-logs')?.addEventListener('click', () => {
            closeDashboard();
            if (dom.logsPanel?.classList.contains('translate-x-full')) {
                toggleLogsPanel();
            } else {
                renderLogs();
            }
        });
    }

    function getFieldTypeStats() {
        const counts = new Map();
        state.currentFields.forEach(field => {
            if (isMeta(field.fieldtype)) return;
            const type = field.fieldtype || 'Sin tipo';
            counts.set(type, (counts.get(type) || 0) + 1);
        });
        return Array.from(counts, ([type, count]) => ({ type, count }))
            .sort((a, b) => b.count - a.count || a.type.localeCompare(b.type));
    }

    function renderDashboardMetric(label, value, detail, color) {
        return `
            <div class="dashboard-metric p-4">
                <div class="text-[10px] uppercase tracking-wider text-editor-subtext font-bold">${escapeHtml(label)}</div>
                <div class="mt-2 text-2xl font-bold text-editor-text">${escapeHtml(String(value))}</div>
                <div class="mt-1 text-[10px] text-editor-subtext truncate">${escapeHtml(detail || '')}</div>
            </div>
        `;
    }

    function renderSmallStat(label, value) {
        return `
            <div class="dashboard-stat p-3">
                <div class="text-[10px] text-editor-subtext">${escapeHtml(label)}</div>
                <div class="text-lg font-bold text-editor-text">${escapeHtml(String(value ?? 0))}</div>
            </div>
        `;
    }

    function renderFieldTypeRow(item, total) {
        const pct = total ? Math.round((item.count / total) * 100) : 0;
        return `
            <div>
                <div class="flex items-center justify-between text-[11px] mb-1">
                    <span class="font-semibold text-editor-text">${escapeHtml(item.type)}</span>
                    <span class="text-editor-subtext">${item.count} · ${pct}%</span>
                </div>
                <div class="dashboard-bar">
                    <div class="dashboard-bar-fill" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    }

    function renderActionCard(title, description, buttonText, buttonId) {
        return `
            <div class="dashboard-action-card p-4 flex flex-col gap-3">
                <div>
                    <h5 class="text-xs font-bold text-editor-text">${escapeHtml(title)}</h5>
                    <p class="text-[10px] text-editor-subtext mt-1">${escapeHtml(description)}</p>
                </div>
                <button id="${buttonId}" class="dashboard-soft-btn mt-auto py-1.5 px-3 rounded-lg text-[11px] font-bold border transition-all">${escapeHtml(buttonText)}</button>
            </div>
        `;
    }

    function formatDuration(duration) {
        const value = Number(duration) || 0;
        return value >= 1000 ? `${(value / 1000).toFixed(1)}s` : `${value}ms`;
    }

    function formatDateShort(value) {
        if (!value) return '—';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return String(value).slice(0, 16);
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }

    function ensureConsoleModal() {
        if (state.consoleModalEl) return state.consoleModalEl;

        const modal = document.createElement('div');
        modal.id = 'console-modal-runtime';
        modal.className = 'hidden fixed inset-0 z-[220] bg-black/70 items-center justify-center p-4';
        modal.innerHTML = `
            <div class="w-full max-w-3xl bg-editor-surface border border-editor-border rounded-xl shadow-2xl overflow-hidden">
                <div class="px-6 py-4 border-b border-editor-border bg-editor-surface2 flex items-center justify-between">
                    <h3 class="text-sm font-bold text-editor-text">Consola Interactiva API</h3>
                    <button id="btn-close-console-runtime" class="text-editor-subtext hover:text-editor-text text-xs">✕</button>
                </div>
                <div class="p-6 space-y-3">
                    <div class="grid grid-cols-5 gap-3">
                        <select id="console-method" class="input-field text-xs col-span-1">
                            <option>GET</option>
                            <option>POST</option>
                            <option>PUT</option>
                            <option>PATCH</option>
                            <option>DELETE</option>
                        </select>
                        <input id="console-endpoint" type="text" class="input-field text-xs col-span-4" placeholder="resource/DocType?fields=[&quot;name&quot;]&limit_page_length=10" />
                    </div>
                    <textarea id="console-body" class="input-field text-xs font-mono min-h-[140px]" placeholder='{"key":"value"}'></textarea>
                    <div class="flex justify-between items-center">
                        <p class="text-[10px] text-editor-subtext">Endpoint relativo a /api (ej: resource/DocType...)</p>
                        <button id="btn-run-console-runtime" class="py-1.5 px-3 rounded-lg text-[11px] font-bold bg-editor-accent text-white border border-editor-accent hover:opacity-90">Ejecutar</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        state.consoleModalEl = modal;

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeConsole();
        });
        modal.querySelector('#btn-close-console-runtime').addEventListener('click', closeConsole);
        modal.querySelector('#btn-run-console-runtime').addEventListener('click', runConsoleCommand);
        return modal;
    }

    function openConsole() {
        if (!state.connected) {
            showToast('Conéctate primero para usar la consola.', 'error');
            return;
        }
        const modal = ensureConsoleModal();
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        const endpointInput = modal.querySelector('#console-endpoint');
        if (endpointInput && !endpointInput.value.trim()) {
            endpointInput.value = `resource/${encodeURIComponent(state.currentDocType || 'DocType')}?fields=["name"]&limit_page_length=10`;
        }
        setTimeout(() => endpointInput?.focus(), 0);
    }

    function closeConsole() {
        if (!state.consoleModalEl) return;
        state.consoleModalEl.classList.add('hidden');
        state.consoleModalEl.classList.remove('flex');
    }

    async function runConsoleCommand() {
        if (!state.consoleModalEl) return;
        const method = state.consoleModalEl.querySelector('#console-method').value || 'GET';
        const rawEndpoint = (state.consoleModalEl.querySelector('#console-endpoint').value || '').trim();
        const rawBody = (state.consoleModalEl.querySelector('#console-body').value || '').trim();

        if (!rawEndpoint) {
            showToast('Especifica un endpoint para ejecutar.', 'error');
            return;
        }

        const normalizedEndpoint = rawEndpoint.replace(/^\/+/, '');
        const path = normalizedEndpoint.startsWith('api/') ? `/${normalizedEndpoint}` : `/api/${normalizedEndpoint}`;
        const options = { method };

        if (!['GET', 'HEAD'].includes(method) && rawBody) {
            try {
                JSON.parse(rawBody);
                options.body = rawBody;
            } catch {
                showToast('Body JSON inválido.', 'error');
                return;
            }
        }

        try {
            const res = await apiFetch(path, options);
            const text = await res.text();
            let pretty = text;
            try { pretty = JSON.stringify(JSON.parse(text), null, 2); } catch { /* keep raw text */ }
            openPayloadModal(`Console ${method} ${path}`, pretty);
        } catch (err) {
            showToast(`Console Error: ${err.message}`, 'error');
        }
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


    // ── Helpers ───────────────────────────────────────
    function downloadFile(filename, content, mimeType = 'text/plain;charset=utf-8') {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = filename;
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    function getSafeFileBaseName(name) {
        return String(name || 'doctype')
            .trim()
            .replace(/[\\/:*?"<>|]+/g, '-')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '') || 'doctype';
    }

    function isMeta(ft) {
        const metaTypes = [
            'section break', 'column break', 'tab break', 'html', 
            'fold', 'heading', 'button', 'image', 'spacer'
        ];
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
        
        // Relational fields (Jump support)
        if (ft === 'link' || ft === 'table' || ft === 'table multiselect') {
            return `
                <span class="options-link" onclick="window._inspectorJumpTo('${escapeHtml(field.options)}')">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    ${escapeHtml(field.options)}
                </span>`;
        }

        if (ft === 'select') {
            const opts = field.options.split('\n').filter(Boolean);
            return `<span title="${escapeHtml(field.options)}">${opts.slice(0, 3).map(o => escapeHtml(o)).join(', ')}${opts.length > 3 ? ` +${opts.length - 3}` : ''}</span>`;
        }
        return `<span title="${escapeHtml(field.options)}">${escapeHtml(field.options.substring(0, 40))}${field.options.length > 40 ? '…' : ''}</span>`;
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

    async function parseFrappeError(res, defaultMsg) {
        try {
            const data = await res.json();
            const serverExc = data.exception || data.exc || (data.message && data.message.exception);
            
            if (serverExc) {
                const excStr = typeof serverExc === 'string' ? serverExc : JSON.stringify(serverExc);
                
                if (excStr.includes('OperationalError') || excStr.includes('1054')) {
                    const colMatch = excStr.match(/Unknown column '(.+?)'/);
                    const field = colMatch ? colMatch[1] : 'desconocido';
                    return `Error DB (1054): El campo '${field}' no se ha encontrado en la base de datos de Frappe. ¿Has olvidado hacer bench migrate?`;
                }
                
                return `Error de Frappe: ${excStr.split('\n')[0].substring(0, 200)}`;
            }
            return defaultMsg || `Error del Servidor (HTTP ${res.status})`;
        } catch {
            return defaultMsg || `Error de Conexión (HTTP ${res.status})`;
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

    // ── Sidebar Tabs ──────────────────────────────────────────

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
            li.className = 'px-4 py-3 border-b border-editor-border/50 hover:bg-editor-surface2 transition-colors cursor-pointer group flex items-center justify-between';
            
            const info = document.createElement('div');
            info.className = 'flex-1 min-w-0 pr-2';
            info.innerHTML = `
                <h4 class="text-xs font-semibold text-editor-text truncate mb-0.5">${escapeHtml(col.name)}</h4>
                <p class="text-[10px] text-editor-subtext truncate">${escapeHtml(col.docType)}</p>
            `;

            info.addEventListener('click', () => loadCollection(col));

            const btnDelete = document.createElement('button');
            btnDelete.className = 'p-1.5 rounded-md text-editor-subtext hover:text-editor-red hover:bg-editor-surface2 animate-fade-in opacity-0 group-hover:opacity-100 transition-all focus:outline-none';
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

    // ── Upload Assistant ──────────────────────────────
    function openUploadModal() {
        if (!state.connected) {
            showToast('Conecta primero a una instancia de Frappe', 'warning');
            return;
        }
        
        removeSelectedFile();
        dom.uploadTargetId.value = '';
        dom.uploadProgressPanel.classList.add('hidden');
        dom.uploadProgressBar.style.width = '0%';
        dom.uploadProgressBar.classList.remove('bg-editor-red');
        dom.uploadStatusText.textContent = '';
        
        if (state.currentDocType) {
            dom.uploadModalSubtitle.textContent = `DocType: ${state.currentDocType}`;
        }
        
        dom.uploadModal.classList.remove('hidden');
        dom.uploadModal.classList.add('flex');
        document.body.style.overflow = 'auto'; // ensure we can scroll if needed
    }

    function closeUploadModal() {
        dom.uploadModal.classList.add('hidden');
        dom.uploadModal.classList.remove('flex');
        document.body.style.overflow = '';
        removeSelectedFile();
    }

    function handleFileChange(e) {
        if (e.target.files && e.target.files.length) {
            handleFileFiles(e.target.files);
        }
    }

    function handleFileFiles(files) {
        const file = files[0];
        if (file.size > 10 * 1024 * 1024) {
            showToast('El archivo supera el límite de 10MB', 'error');
            return;
        }
        
        state.selectedUploadFile = file;
        dom.fileNameDisplay.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        dom.selectedFileInfo.classList.remove('hidden');
        dom.btnExecuteUpload.disabled = false;
        
        dom.dropzone.classList.add('border-editor-teal/50', 'bg-editor-teal/5');
    }

    function removeSelectedFile() {
        state.selectedUploadFile = null;
        dom.selectedFileInfo.classList.add('hidden');
        dom.btnExecuteUpload.disabled = true;
        dom.inputFileUpload.value = '';
        dom.dropzone.classList.remove('border-editor-teal/50', 'bg-editor-teal/5');
    }

    async function executeUpload() {
        if (!state.selectedUploadFile || !state.connected) return;

        const file = state.selectedUploadFile;
        const doctype = state.currentDocType;
        
        const docname = dom.uploadTargetId.value.trim();
        const isPrivate = dom.uploadPrivate.checked ? 1 : 0;

        dom.btnExecuteUpload.disabled = true;
        dom.btnCloseUpload.disabled = true;
        dom.btnCancelUpload.disabled = true;
        
        dom.uploadProgressPanel.classList.remove('hidden');
        dom.uploadProgressBar.style.width = '10%';
        dom.uploadStatusText.textContent = 'Preparando transferencia...';

        try {
            const formData = new FormData();
            formData.append('file', file);
            if (doctype) formData.append('doctype', doctype);
            if (docname) formData.append('docname', docname);
            formData.append('is_private', isPrivate);
            formData.append('filename', file.name);

            dom.uploadProgressBar.style.width = '30%';
            dom.uploadStatusText.textContent = 'Subiendo a Frappe...';

            const res = await fetch(`/proxy/${encodeURIComponent(state.baseUrl + '/api/method/upload_file')}`, {
                method: 'POST',
                headers: {
                    'Authorization': state.authHeader,
                    'X-Frappe-CSRF-Token': state.csrfToken || '' 
                },
                body: formData
            });

            dom.uploadProgressBar.style.width = '70%';

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                const errMsg = errData._server_messages 
                    ? (JSON.parse(errData._server_messages)[0]?.message || 'Error desconocido') 
                    : (errData.message || `Error HTTP ${res.status}`);
                throw new Error(errMsg);
            }

            dom.uploadProgressBar.style.width = '100%';
            dom.uploadStatusText.textContent = '¡Verificado!';
            
            showToast('Archivo adjunto con éxito', 'success');
            setTimeout(closeUploadModal, 1500);

        } catch (err) {
            console.error('Upload Error:', err);
            dom.uploadStatusText.textContent = 'Error';
            dom.uploadProgressBar.classList.add('bg-editor-red');
            showToast(`Error: ${err.message}`, 'error');
            dom.btnExecuteUpload.disabled = false;
        } finally {
            dom.btnCloseUpload.disabled = false;
            dom.btnCancelUpload.disabled = false;
        }
    }

    // ── Boot ──────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', init);
})();
