/**
 * Karten-Modul – Leaflet + Swisstopo / OSM
 *
 * Swisstopo-Karten zeigen Waldwege und Wanderpfade in der Schweiz
 * besser als Google Maps oder Standard-OSM.
 */
const MapModule = (() => {
  let map = null;
  let userMarker = null;
  let userCircle = null;
  let routeLayer = null;
  let markersLayer = null;
  let currentLayer = 'swisstopo';
  let routeVisible = true;
  let watchId = null;

  // ── Tile layers ──────────────────────────────────────────────
  const TILE_LAYERS = {
    swisstopo: {
      label: 'Swisstopo (Schweizer Landeskarte)',
      url: 'https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg',
      options: {
        attribution: '© <a href="https://www.swisstopo.admin.ch">swisstopo</a>',
        maxZoom: 19,
        minZoom: 8,
        crossOrigin: true,
      },
    },
    osm: {
      label: 'OpenStreetMap',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      options: {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      },
    },
  };

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    map = L.map('map', {
      center: CONFIG.MAP_CENTER,
      zoom: CONFIG.MAP_ZOOM,
      zoomControl: false,    // We'll add our own or use default position
      attributionControl: true,
    });

    // Add default zoom control bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Default layer: swisstopo
    _addTileLayer('swisstopo');

    // Draw route line
    _drawRoute();

    // Add station markers
    _drawMarkers();

    // Layer toggle button
    document.getElementById('layer-toggle-btn').addEventListener('click', _toggleLayer);
    document.getElementById('route-toggle-btn').addEventListener('click', _toggleRoute);

    // Locate button in header
    document.getElementById('locate-btn').addEventListener('click', _centerOnUser);

    // Start GPS watch
    _startGPS();
  }

  // ── Tile layer management ────────────────────────────────────
  let activeTileLayer = null;

  function _addTileLayer(name) {
    if (activeTileLayer) map.removeLayer(activeTileLayer);
    const def = TILE_LAYERS[name];
    activeTileLayer = L.tileLayer(def.url, def.options).addTo(map);
    currentLayer = name;
  }

  function _toggleLayer() {
    const next = currentLayer === 'swisstopo' ? 'osm' : 'swisstopo';
    _addTileLayer(next);
    const btn = document.getElementById('layer-toggle-btn');
    btn.title = next === 'swisstopo' ? 'Zu OSM wechseln' : 'Zu Swisstopo wechseln';
  }

  // ── Route polyline ───────────────────────────────────────────
  function _drawRoute() {
    routeLayer = L.polyline(ROUTE_COORDINATES, {
      color: '#2D6A4F',
      weight: 4,
      opacity: 0.8,
      dashArray: null,
      lineJoin: 'round',
    }).addTo(map);
  }

  function _toggleRoute() {
    routeVisible = !routeVisible;
    if (routeVisible) {
      map.addLayer(routeLayer);
    } else {
      map.removeLayer(routeLayer);
    }
    const btn = document.getElementById('route-toggle-btn');
    btn.style.background = routeVisible ? 'white' : '#2D6A4F';
    btn.style.color = routeVisible ? '' : 'white';
  }

  // ── Station markers ──────────────────────────────────────────
  function _drawMarkers() {
    markersLayer = L.layerGroup().addTo(map);

    STATIONS_DATA.forEach(station => {
      const icon = L.divIcon({
        className: '',
        html: `<div class="station-marker" data-id="${station.id}" role="button" aria-label="Station ${station.number}: ${station.name}">${station.number}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18],
      });

      const marker = L.marker(station.coordinates, { icon })
        .addTo(markersLayer)
        .bindPopup(_buildPopup(station), {
          maxWidth: 240,
          className: 'station-popup',
        });

      marker.on('click', () => {
        _highlightMarker(station.id);
      });
    });
  }

  function _buildPopup(station) {
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="popup-inner">
        <span class="popup-number">Station ${station.number}</span>
        <p class="popup-name">${station.name}</p>
        <p class="popup-sub">${station.subtitle}</p>
        <div class="popup-actions">
          <button class="popup-btn popup-btn--detail" onclick="AppController.openStationDetail(${station.id})">Details</button>
          <button class="popup-btn popup-btn--report" onclick="AppController.openReportForStation(${station.id})">Melden</button>
        </div>
      </div>`;
    return div;
  }

  function _highlightMarker(stationId) {
    document.querySelectorAll('.station-marker').forEach(el => {
      el.classList.toggle('active', parseInt(el.dataset.id) === stationId);
    });
  }

  // ── GPS / User Location ──────────────────────────────────────
  function _startGPS() {
    if (!navigator.geolocation) {
      _showGpsBanner('GPS nicht verfügbar', 'error');
      return;
    }
    _showGpsBanner('GPS wird aktiviert…', '');

    watchId = navigator.geolocation.watchPosition(
      _onPosition,
      _onGpsError,
      CONFIG.GPS_WATCH_OPTIONS,
    );
  }

  function _onPosition(pos) {
    const { latitude, longitude, accuracy } = pos.coords;
    AppState.userLocation = { lat: latitude, lng: longitude, accuracy };

    // Update or create user marker
    const latlng = [latitude, longitude];
    if (!userMarker) {
      userMarker = L.marker(latlng, {
        icon: L.divIcon({
          className: '',
          html: '<div class="user-marker" aria-label="Ihr Standort"></div>',
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        }),
        zIndexOffset: 1000,
      }).addTo(map);

      userCircle = L.circle(latlng, {
        radius: accuracy,
        color: '#1A73E8',
        fillColor: '#1A73E8',
        fillOpacity: 0.1,
        weight: 1,
      }).addTo(map);
    } else {
      userMarker.setLatLng(latlng);
      userCircle.setLatLng(latlng);
      userCircle.setRadius(accuracy);
    }

    // GPS status banner
    if (accuracy <= 20) {
      _hideGpsBanner();
    } else if (accuracy <= CONFIG.GPS_ACCURACY_THRESHOLD) {
      _showGpsBanner(`GPS: ± ${Math.round(accuracy)} m`, '');
    } else {
      _showGpsBanner(`Schwaches GPS: ± ${Math.round(accuracy)} m`, 'warning');
    }

    // Update stations view with distance info
    if (typeof StationsView !== 'undefined') {
      StationsView.updateDistances();
    }
    // Update report location
    if (typeof ReportModule !== 'undefined') {
      ReportModule.updateLocation(latitude, longitude, accuracy);
    }
  }

  function _onGpsError(err) {
    const msgs = {
      1: 'GPS-Zugriff verweigert. Bitte in den Einstellungen erlauben.',
      2: 'Standort nicht verfügbar.',
      3: 'GPS-Zeitüberschreitung.',
    };
    _showGpsBanner(msgs[err.code] || 'GPS-Fehler', 'error');
  }

  function _showGpsBanner(text, type) {
    const banner = document.getElementById('gps-banner');
    const textEl = document.getElementById('gps-banner-text');
    banner.classList.remove('hidden', 'warning', 'error');
    if (type) banner.classList.add(type);
    textEl.textContent = text;
  }

  function _hideGpsBanner() {
    document.getElementById('gps-banner').classList.add('hidden');
  }

  function _centerOnUser() {
    if (AppState.userLocation) {
      map.setView(
        [AppState.userLocation.lat, AppState.userLocation.lng],
        15,
        { animate: true },
      );
    } else {
      _startGPS();
      _showGpsBanner('Standort wird gesucht…', '');
    }
  }

  // ── Public API ───────────────────────────────────────────────
  function flyToStation(stationId) {
    const station = STATIONS_DATA.find(s => s.id === stationId);
    if (!station) return;
    map.flyTo(station.coordinates, CONFIG.MAP_ZOOM_STATION, { animate: true, duration: 1 });
    _highlightMarker(stationId);
  }

  function invalidateSize() {
    if (map) map.invalidateSize();
  }

  function stopGPS() {
    if (watchId !== null) navigator.geolocation.clearWatch(watchId);
  }

  return { init, flyToStation, invalidateSize, centerOnUser: _centerOnUser };
})();
