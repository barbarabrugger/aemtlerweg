/**
 * Konfiguration der Ämtlerweg App
 * Passen Sie die Kontaktdaten des Unterhaltsverantwortlichen an.
 */
const CONFIG = {
  APP_NAME: 'Ämtlerweg',
  APP_SUBTITLE: 'Knonauer Amt',

  // Kontakt Unterhaltsverantwortlicher – bitte anpassen
  CONTACT_EMAIL: 'unterhalt@aemtlerweg.ch',
  CONTACT_PHONE: '+41XXXXXXXXXX', // für WhatsApp & SMS
  CONTACT_NAME: 'Ämtlerweg Unterhalt (GGA Affoltern)',

  // Karte
  MAP_CENTER: [47.265, 8.497],
  MAP_ZOOM: 12,
  MAP_ZOOM_STATION: 16,

  // GPS
  GPS_ACCURACY_THRESHOLD: 50, // Meter – Warnung wenn schlechter
  GPS_WATCH_OPTIONS: {
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 15000,
  },
};
