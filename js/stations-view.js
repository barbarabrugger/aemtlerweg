/**
 * Stationen-View – Liste und Detailansicht
 */
const StationsView = (() => {
  let filteredStations = [...STATIONS_DATA];

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    _renderList(STATIONS_DATA);
    _setupSearch();
    _populateReportSelect();
  }

  // ── Station List ─────────────────────────────────────────────
  function _renderList(stations) {
    const ul = document.getElementById('station-list');
    if (stations.length === 0) {
      ul.innerHTML = `
        <li class="no-results">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <p>Keine Stationen gefunden</p>
        </li>`;
      return;
    }

    ul.innerHTML = stations.map(station => {
      const distance = _getDistance(station);
      const distanceHtml = distance !== null
        ? `<div class="station-item-distance">📍 ${_formatDistance(distance)} entfernt</div>`
        : '';
      const themesHtml = station.themes
        .map(t => `<span class="theme-tag">${t}</span>`)
        .join('');

      return `
        <li class="station-item" role="listitem" data-id="${station.id}"
            tabindex="0" aria-label="Station ${station.number}: ${station.name}">
          <div class="station-item-number" aria-hidden="true">${station.number}</div>
          <div class="station-item-body">
            <div class="station-item-name">${station.name}</div>
            <div class="station-item-sub">${station.subtitle}</div>
            ${distanceHtml}
            <div class="station-item-themes">${themesHtml}</div>
          </div>
          <div class="station-item-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        </li>`;
    }).join('');

    // Event listeners
    ul.querySelectorAll('.station-item').forEach(item => {
      const id = parseInt(item.dataset.id);
      item.addEventListener('click', () => openDetail(id));
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDetail(id); }
      });
    });
  }

  // ── Search ───────────────────────────────────────────────────
  function _setupSearch() {
    const input = document.getElementById('station-search');
    const clearBtn = document.getElementById('search-clear');

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      clearBtn.classList.toggle('hidden', !q);
      filteredStations = q
        ? STATIONS_DATA.filter(s =>
            s.name.toLowerCase().includes(q) ||
            s.subtitle.toLowerCase().includes(q) ||
            s.municipality.toLowerCase().includes(q) ||
            s.themes.some(t => t.toLowerCase().includes(q)) ||
            String(s.number) === q
          )
        : [...STATIONS_DATA];
      _renderList(filteredStations);
    });

    clearBtn.addEventListener('click', () => {
      input.value = '';
      clearBtn.classList.add('hidden');
      filteredStations = [...STATIONS_DATA];
      _renderList(filteredStations);
      input.focus();
    });
  }

  // ── Populate report station select ───────────────────────────
  function _populateReportSelect() {
    const sel = document.getElementById('report-station');
    STATIONS_DATA.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = `${s.number}. ${s.name}`;
      sel.appendChild(opt);
    });
  }

  // ── Station Detail ───────────────────────────────────────────
  function openDetail(stationId) {
    const station = STATIONS_DATA.find(s => s.id === stationId);
    if (!station) return;
    AppState.selectedStation = station;

    const view = document.getElementById('view-station-detail');
    view.innerHTML = _buildDetailHTML(station);

    // Wire up buttons
    view.querySelector('.btn-report-from-detail')
      ?.addEventListener('click', () => AppController.openReportForStation(stationId));

    view.querySelector('.detail-show-map')
      ?.addEventListener('click', () => {
        AppController.switchView('map');
        setTimeout(() => MapModule.flyToStation(stationId), 300);
      });

    const prevBtn = view.querySelector('.detail-nav-btn[data-dir="prev"]');
    const nextBtn = view.querySelector('.detail-nav-btn[data-dir="next"]');
    prevBtn?.addEventListener('click', () => openDetail(stationId - 1));
    nextBtn?.addEventListener('click', () => openDetail(stationId + 1));

    AppController.switchView('station-detail', station.name);
  }

  function _buildDetailHTML(station) {
    const prev = STATIONS_DATA.find(s => s.id === station.id - 1);
    const next = STATIONS_DATA.find(s => s.id === station.id + 1);
    const distance = _getDistance(station);

    return `
      <div class="detail-hero">
        <div class="detail-badge">
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          Station ${station.number} von ${STATIONS_DATA.length}
        </div>
        <h2 class="detail-name">${station.name}</h2>
        <p class="detail-sub">${station.subtitle}</p>
        <div class="detail-municipality">
          <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          </svg>
          ${station.municipality}
          ${distance !== null ? ` · <strong>${_formatDistance(distance)}</strong> von Ihrem Standort` : ''}
        </div>
      </div>

      <button class="detail-show-map" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
          <line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
        </svg>
        Auf Karte anzeigen
      </button>

      <div class="detail-body">
        <p class="detail-description">${station.description}</p>
        <div class="detail-themes">
          ${station.themes.map(t => `<span class="theme-tag">${t}</span>`).join('')}
        </div>
        <div class="detail-content">${station.content}</div>
      </div>

      <div class="detail-nav">
        <button class="detail-nav-btn" data-dir="prev" ${!prev ? 'disabled' : ''} aria-label="Vorherige Station">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          ${prev ? `${prev.number}. ${prev.name}` : 'Erste Station'}
        </button>
        <button class="detail-nav-btn" data-dir="next" ${!next ? 'disabled' : ''} aria-label="Nächste Station">
          ${next ? `${next.number}. ${next.name}` : 'Letzte Station'}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      <div class="detail-actions">
        <button class="btn-report-from-detail" type="button">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="18" height="18">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
          Problem bei dieser Station melden
        </button>
      </div>`;
  }

  // ── Distance helpers ─────────────────────────────────────────
  function _getDistance(station) {
    if (!AppState.userLocation) return null;
    return _haversine(
      AppState.userLocation.lat, AppState.userLocation.lng,
      station.coordinates[0], station.coordinates[1],
    );
  }

  function _haversine(lat1, lng1, lat2, lng2) {
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2
      + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function _formatDistance(meters) {
    if (meters < 1000) return `${Math.round(meters)} m`;
    return `${(meters / 1000).toFixed(1)} km`;
  }

  function updateDistances() {
    _renderList(filteredStations);
  }

  // ── Nearest station ──────────────────────────────────────────
  function getNearestStation() {
    if (!AppState.userLocation) return null;
    let nearest = null;
    let minDist = Infinity;
    STATIONS_DATA.forEach(s => {
      const d = _haversine(
        AppState.userLocation.lat, AppState.userLocation.lng,
        s.coordinates[0], s.coordinates[1],
      );
      if (d < minDist) { minDist = d; nearest = s; }
    });
    return nearest;
  }

  return { init, openDetail, updateDistances, getNearestStation };
})();
