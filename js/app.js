/**
 * App-Controller – Initialisierung und View-Routing
 */

// ── Global app state ─────────────────────────────────────────
const AppState = {
  currentView: 'map',
  previousView: null,
  selectedStation: null,
  userLocation: null,
};

// ── App Controller ───────────────────────────────────────────
const AppController = (() => {

  // View metadata
  const VIEWS = {
    'map':            { navId: 'map',       title: 'Ämtlerweg',   subtitle: 'Knonauer Amt · 46 km', hasBack: false },
    'stations':       { navId: 'stations',  title: 'Stationen',   subtitle: '22 Infotafeln',         hasBack: false },
    'report':         { navId: 'report',    title: 'Melden',      subtitle: 'Problem erfassen',      hasBack: false },
    'station-detail': { navId: null,        title: '',            subtitle: '',                      hasBack: true  },
  };

  function init() {
    _hideLoadingScreen();
    MapModule.init();
    StationsView.init();
    ReportModule.init();
    _setupNavigation();
    _registerServiceWorker();
  }

  // ── Loading screen ───────────────────────────────────────────
  function _hideLoadingScreen() {
    // Wait for the loading bar animation, then fade out
    setTimeout(() => {
      const screen = document.getElementById('loading-screen');
      screen.classList.add('hidden');
      // Trigger map resize after reveal
      setTimeout(() => MapModule.invalidateSize(), 300);
    }, 1600);
  }

  // ── Navigation ───────────────────────────────────────────────
  function _setupNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const viewId = btn.dataset.view;
        switchView(viewId);
      });
    });

    document.getElementById('back-btn').addEventListener('click', () => {
      const backTo = AppState.previousView || 'stations';
      switchView(backTo);
    });
  }

  function switchView(viewId, detailTitle) {
    const prev = AppState.currentView;
    AppState.previousView = prev;
    AppState.currentView = viewId;

    // Hide all views
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

    // Show target view
    const viewEl = document.getElementById(`view-${viewId}`);
    if (viewEl) viewEl.classList.add('active');

    // Update nav buttons
    const meta = VIEWS[viewId] || {};
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === meta.navId);
      btn.setAttribute('aria-current', btn.dataset.view === meta.navId ? 'page' : 'false');
    });

    // Update header
    const backBtn = document.getElementById('back-btn');
    const headerTitle = document.getElementById('header-title');
    const headerSubtitle = document.getElementById('header-subtitle');
    const locateBtn = document.getElementById('locate-btn');

    backBtn.classList.toggle('hidden', !meta.hasBack);
    headerTitle.textContent = detailTitle || meta.title || 'Ämtlerweg';
    headerSubtitle.textContent = meta.subtitle || '';
    locateBtn.classList.toggle('hidden', viewId !== 'map');

    // Map-specific
    if (viewId === 'map') {
      setTimeout(() => MapModule.invalidateSize(), 50);
    }
  }

  // ── Cross-module actions ─────────────────────────────────────
  function openStationDetail(stationId) {
    StationsView.openDetail(stationId);
  }

  function openReportForStation(stationId) {
    ReportModule.prefillStation(stationId);
    switchView('report', 'Melden');
  }

  // ── Service Worker ───────────────────────────────────────────
  function _registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then(reg => {
          console.log('[SW] Registriert:', reg.scope);
        }).catch(err => {
          console.warn('[SW] Registrierung fehlgeschlagen:', err);
        });
      });
    }
  }

  return { init, switchView, openStationDetail, openReportForStation };
})();

// ── Bootstrap ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => AppController.init());
