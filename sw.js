/**
 * Service Worker – Ämtlerweg App
 * Cache-Strategie: Cache-first für App-Shell, Network-first für Kartentiles
 */

const CACHE_NAME = 'aemtlerweg-v1';
const MAP_CACHE  = 'aemtlerweg-tiles-v1';
const MAX_TILE_CACHE = 500; // maximale Anzahl gecachter Kartenkacheln

// App Shell – immer lokal verfügbar
// Relative Pfade damit der Service Worker auf GitHub Pages
// (Subdirectory /aemtlerweg/) korrekt funktioniert.
const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/config.js',
  './js/stations-data.js',
  './js/map.js',
  './js/stations-view.js',
  './js/report.js',
  './js/app.js',
  './assets/icon.svg',
  './lib/leaflet.js',
  './lib/leaflet.css',
];

// ── Install ──────────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ── Activate ─────────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== MAP_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch ─────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Kartentiles (Swisstopo / OSM) → Cache-first mit Netzwerk-Fallback
  if (
    url.hostname.includes('wmts.geo.admin.ch') ||
    url.hostname.includes('tile.openstreetmap.org')
  ) {
    event.respondWith(_cacheFirstTile(event.request));
    return;
  }

  // App Shell → Cache-first
  if (url.hostname === location.hostname) {
    event.respondWith(_cacheFirst(event.request));
    return;
  }

  // Alles andere → Netzwerk
  event.respondWith(fetch(event.request));
});

// ── Cache strategies ─────────────────────────────────────────
async function _cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline – Ressource nicht verfügbar', { status: 503 });
  }
}

async function _cacheFirstTile(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(MAP_CACHE);
      // Limit cache size
      const keys = await cache.keys();
      if (keys.length >= MAX_TILE_CACHE) {
        // Remove oldest entries (FIFO)
        await Promise.all(keys.slice(0, 50).map(k => cache.delete(k)));
      }
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Return a transparent 1x1 tile if offline
    return new Response(
      atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='),
      { headers: { 'Content-Type': 'image/png' } }
    );
  }
}
