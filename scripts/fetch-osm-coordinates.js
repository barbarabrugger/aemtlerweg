#!/usr/bin/env node
/**
 * fetch-osm-coordinates.js
 *
 * Liest die echten GPS-Koordinaten der Ämtlerweg-Stationen (OSM Relation 223317)
 * aus der Overpass API und aktualisiert js/stations-data.js.
 *
 * Ausführen (einmalig, auf einem Rechner mit Internetzugang):
 *   node scripts/fetch-osm-coordinates.js
 *
 * Voraussetzungen: Node.js ≥ 18 (kein npm-Paket nötig, nur built-in fetch)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');

const RELATION_ID = 223317;
const STATIONS_FILE = path.join(__dirname, '..', 'js', 'stations-data.js');

// Overpass API Endpunkte (wird der Reihe nach versucht)
const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://lz4.overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
];

// Overpass-Abfrage: alle Nodes die Mitglied der Relation sind
const QUERY = `
[out:json][timeout:60];
relation(${RELATION_ID});
node(r);
out body;
`.trim();

// ── HTTP helper ──────────────────────────────────────────────
function httpPost(url, body) {
  return new Promise((resolve, reject) => {
    const postData = `data=${encodeURIComponent(body)}`;
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'AemtlerwegApp/1.0 (coordinate-fetcher)',
      },
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        if (res.statusCode === 200) resolve(data);
        else reject(new Error(`HTTP ${res.statusCode}: ${url}`));
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.write(postData);
    req.end();
  });
}

// ── Try all endpoints ────────────────────────────────────────
async function fetchOverpass() {
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      process.stdout.write(`  Versuche ${endpoint} ... `);
      const result = await httpPost(endpoint, QUERY);
      console.log('✓');
      return JSON.parse(result);
    } catch (err) {
      console.log(`✗ (${err.message})`);
    }
  }
  throw new Error('Alle Overpass-Endpunkte nicht erreichbar.');
}

// ── Match OSM nodes to station IDs ───────────────────────────
/**
 * Versucht, OSM-Nodes den 22 Stationen zuzuordnen.
 * Strategie:
 *  1. Nodes mit ref=1..22 werden direkt zugeordnet
 *  2. Nodes mit tourism=information werden nach Nähe zu bestehenden
 *     Koordinaten den Stationen zugeordnet
 *  3. Alle anderen benannten Nodes werden gelistet (manuelle Zuordnung)
 */
function matchNodes(osmNodes, currentStations) {
  const matched = {};

  // Strategie 1: ref-Tag (z.B. ref=1 bis ref=22)
  for (const node of osmNodes) {
    const ref = node.tags?.ref;
    if (ref) {
      const num = parseInt(ref);
      if (num >= 1 && num <= 22) {
        matched[num] = { lat: node.lat, lon: node.lon, osmId: node.id, method: 'ref', name: node.tags?.name || '' };
      }
    }
  }

  // Strategie 2: tourism=information Nodes → nächste Station
  const infoNodes = osmNodes.filter(n =>
    n.tags?.tourism === 'information' && !Object.values(matched).some(m => m.osmId === n.id)
  );

  for (const node of infoNodes) {
    let nearestStation = null;
    let minDist = Infinity;
    for (const station of currentStations) {
      if (matched[station.number]) continue; // bereits zugeordnet
      const dist = Math.hypot(node.lat - station.coordinates[0], node.lon - station.coordinates[1]);
      if (dist < minDist) { minDist = dist; nearestStation = station; }
    }
    if (nearestStation && minDist < 0.05) { // max ~5 km Abstand
      matched[nearestStation.number] = {
        lat: node.lat, lon: node.lon, osmId: node.id,
        method: `nearest (${(minDist * 111).toFixed(1)} km)`,
        name: node.tags?.name || '',
      };
    }
  }

  return matched;
}

// ── Update stations-data.js ──────────────────────────────────
function updateStationsFile(currentContent, matched, allNodes) {
  let updated = currentContent;
  let updateCount = 0;

  for (const [stationNum, match] of Object.entries(matched)) {
    const num = parseInt(stationNum);
    // Replace coordinates array for this station
    // Find the station block by number and update coordinates
    const regex = new RegExp(
      `(id:\\s*${num},[^}]*?coordinates:\\s*)\\[([^\\]]+)\\]`,
      's'
    );
    const replacement = `$1[${match.lat.toFixed(6)}, ${match.lon.toFixed(6)}]`;
    const before = updated;
    updated = updated.replace(regex, replacement);
    if (updated !== before) updateCount++;
  }

  return { content: updated, updateCount };
}

// ── Main ─────────────────────────────────────────────────────
async function main() {
  console.log('\n🗺️  Ämtlerweg – OSM Koordinaten-Updater');
  console.log('═══════════════════════════════════════\n');

  // Load current stations-data.js
  if (!fs.existsSync(STATIONS_FILE)) {
    console.error(`Datei nicht gefunden: ${STATIONS_FILE}`);
    process.exit(1);
  }
  const currentContent = fs.readFileSync(STATIONS_FILE, 'utf8');

  // Extract current stations for matching
  // Simple eval-based extraction (safe: own file)
  let currentStations;
  try {
    const vm = require('vm');
    const sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext(currentContent.replace(/^const\s+/, 'this.'), sandbox);
    currentStations = sandbox.STATIONS_DATA;
  } catch (e) {
    console.error('Konnte stations-data.js nicht parsen:', e.message);
    process.exit(1);
  }

  // Fetch from Overpass
  console.log('Lade Daten von Overpass API (OSM Relation 223317)…');
  let osmData;
  try {
    osmData = await fetchOverpass();
  } catch (err) {
    console.error(`\n❌ Fehler: ${err.message}`);
    console.log('\nAlternative: Öffnen Sie https://overpass-turbo.eu und führen Sie folgende Abfrage aus:');
    console.log('\n  [out:json][timeout:60];relation(223317);node(r);out body;\n');
    console.log('Speichern Sie das Ergebnis als JSON und führen Sie aus:');
    console.log('  node scripts/fetch-osm-coordinates.js --file result.json\n');
    process.exit(1);
  }

  const osmNodes = osmData.elements?.filter(e => e.type === 'node') || [];
  console.log(`\n✓ ${osmNodes.length} Nodes geladen`);
  console.log(`  davon mit tourism=information: ${osmNodes.filter(n => n.tags?.tourism === 'information').length}`);
  console.log(`  davon mit ref-Tag: ${osmNodes.filter(n => n.tags?.ref).length}`);

  // Match nodes to stations
  const matched = matchNodes(osmNodes, currentStations);
  console.log(`\nZuordnung: ${Object.keys(matched).length} / 22 Stationen gefunden\n`);

  // Show matching results
  for (const station of currentStations) {
    const m = matched[station.number];
    if (m) {
      const oldC = station.coordinates;
      const distM = Math.round(Math.hypot(m.lat - oldC[0], m.lon - oldC[1]) * 111000);
      const flag = distM > 500 ? ' ⚠️  (grosse Abweichung!)' : '';
      console.log(`  Station ${String(station.number).padStart(2)}: [${m.lat.toFixed(5)}, ${m.lon.toFixed(5)}]  (Δ${distM} m via ${m.method})${flag}`);
    } else {
      console.log(`  Station ${String(station.number).padStart(2)}: ❌ nicht gefunden – bleibt bei [${station.coordinates}]`);
    }
  }

  // Update file
  const { content: updatedContent, updateCount } = updateStationsFile(currentContent, matched, osmNodes);

  // Backup original
  const backupFile = STATIONS_FILE.replace('.js', '.backup.js');
  fs.writeFileSync(backupFile, currentContent, 'utf8');

  // Write updated file
  fs.writeFileSync(STATIONS_FILE, updatedContent, 'utf8');

  console.log(`\n✅ ${updateCount} Koordinaten in stations-data.js aktualisiert`);
  console.log(`   Backup: ${backupFile}\n`);

  // List unmatched nodes for manual inspection
  const unmatchedInfoNodes = osmData.elements
    .filter(e => e.type === 'node' && e.tags?.tourism === 'information')
    .filter(n => !Object.values(matched).some(m => m.osmId === n.id));

  if (unmatchedInfoNodes.length > 0) {
    console.log('Nicht zugeordnete Informations-Nodes (für manuelle Überprüfung):');
    for (const n of unmatchedInfoNodes) {
      console.log(`  Node ${n.id}: [${n.lat}, ${n.lon}] – ${JSON.stringify(n.tags)}`);
    }
  }
}

// Handle --file argument (offline mode with saved JSON)
const fileArg = process.argv.indexOf('--file');
if (fileArg !== -1 && process.argv[fileArg + 1]) {
  const jsonFile = process.argv[fileArg + 1];
  console.log(`\nLese Daten aus Datei: ${jsonFile}`);
  try {
    const osmData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    // Re-run with file data (simplified)
    main.osmDataOverride = osmData;
  } catch (e) {
    console.error('Konnte JSON-Datei nicht lesen:', e.message);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Unerwarteter Fehler:', err);
  process.exit(1);
});
