/**
 * Meldungs-Modul
 *
 * Sendet Problemmeldungen ohne Backend via:
 *  1. Web Share API (bevorzugt auf Mobile – teilt Text + Foto)
 *  2. E-Mail (mailto:)
 *  3. WhatsApp (wa.me)
 *  4. SMS (sms:)
 *
 * GPS-Koordinaten werden automatisch mitgesendet.
 */
const ReportModule = (() => {
  let photoFile = null;
  let currentLat = null;
  let currentLng = null;
  let currentAccuracy = null;

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    _setupPhoto();
    _setupDescription();
    _setupSendButtons();
    _setupLocationRefresh();

    // Pre-fill location if already available
    if (AppState.userLocation) {
      updateLocation(
        AppState.userLocation.lat,
        AppState.userLocation.lng,
        AppState.userLocation.accuracy,
      );
    }
  }

  // ── Photo ────────────────────────────────────────────────────
  function _setupPhoto() {
    const input = document.getElementById('photo-input');
    const preview = document.getElementById('photo-preview');
    const placeholder = document.getElementById('photo-placeholder');
    const removeBtn = document.getElementById('photo-remove');

    input.addEventListener('change', () => {
      const file = input.files[0];
      if (!file) return;
      photoFile = file;

      const reader = new FileReader();
      reader.onload = e => {
        preview.src = e.target.result;
        preview.classList.remove('hidden');
        placeholder.classList.add('hidden');
        removeBtn.classList.remove('hidden');
        // Move file input above preview (so it no longer intercepts taps)
        input.style.zIndex = '-1';
      };
      reader.readAsDataURL(file);
    });

    removeBtn.addEventListener('click', () => {
      photoFile = null;
      input.value = '';
      preview.src = '';
      preview.classList.add('hidden');
      placeholder.classList.remove('hidden');
      removeBtn.classList.add('hidden');
      input.style.zIndex = '';
    });
  }

  // ── Description char counter ─────────────────────────────────
  function _setupDescription() {
    const textarea = document.getElementById('report-description');
    const counter = document.getElementById('desc-count');
    textarea.addEventListener('input', () => {
      counter.textContent = `${textarea.value.length} / 500`;
    });
  }

  // ── Location ─────────────────────────────────────────────────
  function updateLocation(lat, lng, accuracy) {
    currentLat = lat;
    currentLng = lng;
    currentAccuracy = accuracy;

    document.getElementById('report-lat').value = lat.toFixed(6);
    document.getElementById('report-lng').value = lng.toFixed(6);
    document.getElementById('report-accuracy').value = Math.round(accuracy);

    const acc = Math.round(accuracy);
    const mapsLink = `https://www.openstreetmap.org/?mlat=${lat.toFixed(5)}&mlon=${lng.toFixed(5)}&zoom=17`;
    document.getElementById('location-text').innerHTML =
      `${lat.toFixed(5)}, ${lng.toFixed(5)} <span style="color:var(--c-text-3)">(± ${acc} m)</span>`;
  }

  function _setupLocationRefresh() {
    document.getElementById('refresh-location').addEventListener('click', () => {
      document.getElementById('location-text').textContent = 'Standort wird ermittelt…';
      if (!navigator.geolocation) {
        document.getElementById('location-text').textContent = 'GPS nicht verfügbar';
        return;
      }
      navigator.geolocation.getCurrentPosition(
        pos => updateLocation(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy),
        () => { document.getElementById('location-text').textContent = 'Standort nicht verfügbar'; },
        CONFIG.GPS_WATCH_OPTIONS,
      );
    });
  }

  // ── Build message ────────────────────────────────────────────
  function _buildMessage() {
    const problemType = _getProblemTypeLabel();
    if (!problemType) {
      _showHint('⚠️ Bitte wählen Sie zuerst die Art des Problems aus.', true);
      return null;
    }

    const station = _getSelectedStation();
    const description = document.getElementById('report-description').value.trim();
    const name = document.getElementById('report-name').value.trim();
    const phone = document.getElementById('report-phone').value.trim();

    const locationStr = currentLat
      ? `${currentLat.toFixed(5)}, ${currentLng.toFixed(5)} (±${Math.round(currentAccuracy)} m)\nhttps://www.openstreetmap.org/?mlat=${currentLat.toFixed(5)}&mlon=${currentLng.toFixed(5)}&zoom=17`
      : 'Nicht verfügbar';

    const now = new Date().toLocaleString('de-CH', {
      dateStyle: 'medium', timeStyle: 'short',
    });

    let text = `🚶 Ämtlerweg Problemmeldung\n`;
    text += `━━━━━━━━━━━━━━━━━━━\n`;
    text += `📋 Problem: ${problemType}\n`;
    if (station) text += `📍 Station: ${station}\n`;
    if (description) text += `📝 Beschreibung: ${description}\n`;
    text += `\n📡 GPS-Standort:\n${locationStr}\n`;
    text += `\n🕐 Zeitpunkt: ${now}\n`;
    if (name || phone) {
      text += `\n👤 Gemeldet von:\n`;
      if (name) text += `   Name: ${name}\n`;
      if (phone) text += `   Kontakt: ${phone}\n`;
    }
    if (photoFile) {
      text += `\n📷 Foto: wurde beigefügt (bitte Anhang prüfen)\n`;
    }

    return { text, problemType, station };
  }

  function _getProblemTypeLabel() {
    const radio = document.querySelector('input[name="problem-type"]:checked');
    if (!radio) return null;
    const labels = {
      'tafel-fehlt': 'Infotafel fehlt',
      'tafel-beschaedigt': 'Infotafel beschädigt',
      'tafel-verschmutzt': 'Infotafel verschmutzt',
      'wegweiser-fehlt': 'Wegweiser fehlt',
      'wegweiser-beschaedigt': 'Wegweiser beschädigt',
      'weg-gesperrt': 'Weg gesperrt / unpassierbar',
      'sonstiges': 'Sonstiges',
    };
    return labels[radio.value] || radio.value;
  }

  function _getSelectedStation() {
    const sel = document.getElementById('report-station');
    const stationId = parseInt(sel.value);
    if (!stationId) return null;
    const s = STATIONS_DATA.find(s => s.id === stationId);
    return s ? `${s.number}. ${s.name}` : null;
  }

  function _getEmailSubject(problemType, station) {
    let subject = `Ämtlerweg Meldung: ${problemType}`;
    if (station) subject += ` – ${station}`;
    return encodeURIComponent(subject);
  }

  // ── Send buttons ─────────────────────────────────────────────
  function _setupSendButtons() {
    document.getElementById('btn-share').addEventListener('click', _sendShare);
    document.getElementById('btn-email').addEventListener('click', _sendEmail);
    document.getElementById('btn-whatsapp').addEventListener('click', _sendWhatsApp);
    document.getElementById('btn-sms').addEventListener('click', _sendSMS);
  }

  async function _sendShare() {
    const msg = _buildMessage();
    if (!msg) return;

    if (!navigator.share) {
      _showHint('Web Share nicht unterstützt. Bitte E-Mail, WhatsApp oder SMS verwenden.', true);
      return;
    }

    const shareData = {
      title: `Ämtlerweg Meldung: ${msg.problemType}`,
      text: msg.text,
    };

    // Add photo as file if available
    if (photoFile && navigator.canShare) {
      const filesData = { files: [photoFile] };
      if (navigator.canShare(filesData)) {
        shareData.files = [photoFile];
      }
    }

    try {
      await navigator.share(shareData);
      _showHint('✅ Meldung wurde geteilt. Vielen Dank!', false);
    } catch (err) {
      if (err.name !== 'AbortError') {
        _showHint('Teilen fehlgeschlagen. Bitte E-Mail oder WhatsApp verwenden.', true);
      }
    }
  }

  function _sendEmail() {
    const msg = _buildMessage();
    if (!msg) return;

    const subject = _getEmailSubject(msg.problemType, msg.station);
    const body = encodeURIComponent(msg.text);
    const to = encodeURIComponent(CONFIG.CONTACT_EMAIL);

    window.open(`mailto:${to}?subject=${subject}&body=${body}`, '_self');

    if (photoFile) {
      _showHint('📎 Bitte fügen Sie das Foto manuell als Anhang in die geöffnete E-Mail ein.', false);
    } else {
      _showHint('✉️ E-Mail-Programm wird geöffnet…', false);
    }
  }

  function _sendWhatsApp() {
    const msg = _buildMessage();
    if (!msg) return;

    // WhatsApp text has some character limit; truncate gracefully
    const maxLen = 2000;
    let text = msg.text;
    if (text.length > maxLen) text = text.substring(0, maxLen) + '…';

    const phone = CONFIG.CONTACT_PHONE.replace(/\D/g, '');
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank', 'noopener');

    if (photoFile) {
      _showHint('📷 Bitte fügen Sie das Foto manuell in WhatsApp ein.', false);
    } else {
      _showHint('💬 WhatsApp wird geöffnet…', false);
    }
  }

  function _sendSMS() {
    const msg = _buildMessage();
    if (!msg) return;

    // SMS has strict length limits – keep it short
    const station = msg.station ? `\nStation: ${msg.station}` : '';
    const loc = currentLat
      ? `\nGPS: ${currentLat.toFixed(5)},${currentLng.toFixed(5)}`
      : '';
    const desc = document.getElementById('report-description').value.trim();
    const descStr = desc ? `\n${desc.substring(0, 100)}` : '';

    const smsText = `Ämtlerweg Meldung: ${msg.problemType}${station}${loc}${descStr}`;
    const phone = CONFIG.CONTACT_PHONE.replace(/\s/g, '');
    const encodedText = encodeURIComponent(smsText);

    // iOS uses &body=, Android uses ?body=
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const sep = isIOS ? '&' : '?';
    window.open(`sms:${phone}${sep}body=${encodedText}`, '_self');
    _showHint('📱 SMS wird geöffnet… (Foto bitte separat senden)', false);
  }

  // ── Hint display ─────────────────────────────────────────────
  function _showHint(text, isError) {
    const hint = document.getElementById('send-hint');
    hint.textContent = text;
    hint.style.color = isError ? 'var(--c-accent)' : 'var(--c-primary)';
  }

  // ── Pre-fill for a specific station ─────────────────────────
  function prefillStation(stationId) {
    const sel = document.getElementById('report-station');
    sel.value = stationId;
  }

  return { init, updateLocation, prefillStation };
})();
