/**
 * Stationsdaten des Ämtlerwegs
 *
 * Koordinaten sind Näherungswerte. Bitte mit den tatsächlichen GPS-Koordinaten
 * der Infotafeln abgleichen (OSM Relation 223317).
 *
 * Inhalte bitte anhand der physischen Infotafeln ergänzen/ersetzen.
 */
const STATIONS_DATA = [
  {
    id: 1,
    number: 1,
    name: 'Bonstetten-Wettswil',
    subtitle: 'Start & Ziel',
    municipality: 'Bonstetten / Wettswil am Albis',
    coordinates: [47.3278, 8.4561],
    themes: ['Bahnhof', 'Rundweg', 'Überblick'],
    description: 'Ausgangspunkt des Ämtlerwegs. Vom Bahnhof Bonstetten-Wettswil startet die rund 46 km lange Rundwanderung durch das Knonauer Amt.',
    content: `<p>Der <strong>Ämtlerweg</strong> ist ein 46 km langer Rundwanderweg durch das Säuliamt im Kanton Zürich. Er wurde von der Gemeinnützigen Gesellschaft des Bezirkes Affoltern (GGA) im Jahr 2000 der Bevölkerung geschenkt.</p>
<p>An <strong>22 Stationen</strong> mit Infotafeln erfahren Sie Wissenswertes über Geschichte, Natur, Landwirtschaft und Kultur des Knonauer Amts. Blaue Wegweiser und gelbe Punkte markieren den Weg.</p>
<p><strong>Anreise:</strong> S-Bahn Linie S14 bis Bonstetten-Wettswil (ZVV Zone 155).</p>`,
  },
  {
    id: 2,
    number: 2,
    name: 'Wettswil am Albis',
    subtitle: 'Dorfkern',
    municipality: 'Wettswil am Albis',
    coordinates: [47.3201, 8.4978],
    themes: ['Dorfgeschichte', 'Landwirtschaft'],
    description: 'Wettswil am Albis liegt auf einem Moränenhügel über dem Limmattal. Das Dorf hat eine lange landwirtschaftliche Geschichte.',
    content: `<p><strong>Wettswil am Albis</strong> ist eine Gemeinde im Bezirk Affoltern. Der Dorfkern mit seiner historischen Bebauung zeugt von der landwirtschaftlichen Prägung des Knonauer Amts.</p>
<p>Die Gemeinde liegt an der Grenze zwischen dem fruchtbaren Unterland und den bewaldeten Albisketten. Typisch für das Säuliamt sind die sanften Hügel mit Äckern, Wiesen und Obstkulturen.</p>`,
  },
  {
    id: 3,
    number: 3,
    name: 'Stallikon',
    subtitle: 'Obstgarten und Aussicht',
    municipality: 'Stallikon',
    coordinates: [47.3242, 8.4836],
    themes: ['Obstbau', 'Aussicht', 'Natur'],
    description: 'Stallikon liegt malerisch auf einem Hügelrücken. Der Ort ist bekannt für seine Hochstammobstgärten und den weiten Blick über das Mittelland.',
    content: `<p><strong>Stallikon</strong> gehört zum Bezirk Affoltern und liegt auf 550 m ü. M. Die Gemeinde ist geprägt durch Hochstammobstgärten, die zur Biodiversität der Region beitragen.</p>
<p>Von der Anhöhe bietet sich ein herrlicher Blick über das Albistal und das Mittelland. Im Herbst lockt die Apfelernte zahlreiche Besucher an.</p>`,
  },
  {
    id: 4,
    number: 4,
    name: 'Affoltern – Baldern',
    subtitle: 'Aussichtspunkt Baldern',
    municipality: 'Affoltern am Albis',
    coordinates: [47.2956, 8.4703],
    themes: ['Aussicht', 'Wald', 'Erholung'],
    description: 'Der Baldern bietet eine der schönsten Aussichten über das Knonauer Amt. Auf dem Hügelrücken wechseln sich Wald und Wiesen ab.',
    content: `<p>Der <strong>Baldern</strong> ist ein bewaldeter Hügelrücken nordöstlich von Affoltern am Albis. Von der Lichtung auf dem Grat geniesst man einen weiten Blick über den gesamten Bezirk Affoltern.</p>
<p>Die Umgebung ist geprägt durch naturnahe Mischwälder. Im Frühling blühen hier seltene Waldpflanzen.</p>`,
  },
  {
    id: 5,
    number: 5,
    name: 'Hedingen',
    subtitle: 'Reformierte Kirche',
    municipality: 'Hedingen',
    coordinates: [47.3041, 8.4589],
    themes: ['Kirchengeschichte', 'Reformation', 'Architektur'],
    description: 'Das Dorf Hedingen besitzt eine der ältesten Kirchen des Bezirks. Die reformierte Kirche geht auf das frühe Mittelalter zurück.',
    content: `<p>Die <strong>reformierte Kirche Hedingen</strong> ist ein Kulturgut von regionaler Bedeutung. Der Turm stammt aus dem 13. Jahrhundert, das Schiff wurde mehrfach umgebaut.</p>
<p>Hedingen liegt im Reppischtal und war früher ein wichtiger landwirtschaftlicher Ort. Die Reppisch treibt einst mehrere Mühlen an.</p>`,
  },
  {
    id: 6,
    number: 6,
    name: 'Affoltern am Albis',
    subtitle: 'Hauptort des Bezirks',
    municipality: 'Affoltern am Albis',
    coordinates: [47.2831, 8.4553],
    themes: ['Bezirkshauptort', 'Geschichte', 'Marktplatz'],
    description: 'Affoltern am Albis ist der Hauptort des gleichnamigen Bezirks. Der historische Marktplatz und das Stadtbild spiegeln die jahrhundertelange Zentralfunktion der Stadt wider.',
    content: `<p><strong>Affoltern am Albis</strong> ist der Hauptort des Bezirks Affoltern (Knonauer Amt) mit rund 12'000 Einwohnern.</p>
<p>Das Städtchen blickt auf eine lange Geschichte als Markt- und Gewerbeort zurück. Der historische Kern mit dem Marktplatz, der Kirche und den alten Bürgerhäusern ist gut erhalten.</p>
<p>Die Gemeinnützige Gesellschaft des Bezirkes Affoltern (GGA), Initiatorin des Ämtlerwegs, hat ihren Sitz in Affoltern.</p>`,
  },
  {
    id: 7,
    number: 7,
    name: 'Mettmenstetten',
    subtitle: 'Kloster und Dorfkern',
    municipality: 'Mettmenstetten',
    coordinates: [47.2422, 8.5133],
    themes: ['Klostergeschichte', 'Dorfkern', 'Sakralbauten'],
    description: 'Mettmenstetten ist eine lebendige Gemeinde im Säuliamt. Das Dorf verfügt über einen charakteristischen Dorfkern mit alten Gebäuden.',
    content: `<p><strong>Mettmenstetten</strong> liegt im oberen Reusstal und ist mit rund 4'500 Einwohnern eine der grösseren Gemeinden im Bezirk Affoltern.</p>
<p>Der historische Dorfkern mit seiner spätgotischen Kirche und den Patrizierhäusern ist ein Zeugnis der reichen Geschichte des Knonauer Amts.</p>`,
  },
  {
    id: 8,
    number: 8,
    name: 'Geltwil',
    subtitle: 'Weiler und Waldrand',
    municipality: 'Mettmenstetten',
    coordinates: [47.2561, 8.4925],
    themes: ['Weiler', 'Waldrand', 'Natur'],
    description: 'Geltwil ist ein kleiner Weiler auf der Albiskette. Der Weg führt hier durch abwechslungsreiche Waldlandschaft.',
    content: `<p><strong>Geltwil</strong> liegt auf dem Albisrücken auf rund 700 m ü. M. Der Weiler ist umgeben von Wäldern und Alpweiden.</p>
<p>Der Ämtlerweg durchquert hier ausgedehnte Waldgebiete. In der Dämmerung sind Rehe und Füchse anzutreffen.</p>`,
  },
  {
    id: 9,
    number: 9,
    name: 'Hausen am Albis – Sattelegg',
    subtitle: 'Albiskette – Sattel',
    municipality: 'Hausen am Albis',
    coordinates: [47.2644, 8.4789],
    themes: ['Albiskette', 'Aussicht', 'Natur', 'Geologie'],
    description: 'Die Sattelegg ist ein wichtiger Übergang auf der Albiskette. Hier kreuzen sich alte Handels- und Pilgerwege.',
    content: `<p>Die <strong>Albiskette</strong> bildet die natürliche Westgrenze des Mittellands. Die Sattelegg war schon in der Römerzeit ein wichtiger Passübergang.</p>
<p>Der Blick vom Sattel reicht an klaren Tagen bis zu den Alpen. Die Albiskette ist geologisch Teil der Molasse-Formation des Mittellands.</p>`,
  },
  {
    id: 10,
    number: 10,
    name: 'Kloster Kappel am Albis',
    subtitle: 'Ehemaliges Zisterzienserkloster',
    municipality: 'Kappel am Albis',
    coordinates: [47.2456, 8.4781],
    themes: ['Kloster', 'Reformation', 'Zwingli', 'Architektur', 'Geschichte'],
    description: 'Das Kloster Kappel am Albis ist eines der bedeutendsten mittelalterlichen Denkmäler der Region. Hier fand 1531 die entscheidende Schlacht der Reformation statt.',
    content: `<p>Das <strong>Kloster Kappel am Albis</strong> wurde 1185 als Zisterzienserkloster gegründet. Es ist heute ein reformiertes Bildungs- und Tagungshaus.</p>
<p>Im Jahr <strong>1531</strong> fiel hier der Reformator <strong>Huldrych Zwingli</strong> in der Zweiten Kappeler Schlacht. Ein Denkmal erinnert an dieses historische Ereignis.</p>
<p>Die gut erhaltene Klosteranlage mit Kreuzgang, Kirche und Klosterhof gehört zu den schönsten mittelalterlichen Bauten des Kantons Zürich.</p>`,
  },
  {
    id: 11,
    number: 11,
    name: 'Kappel am Albis',
    subtitle: 'Dorf und Schlachtfeld',
    municipality: 'Kappel am Albis',
    coordinates: [47.2394, 8.4769],
    themes: ['Reformation', 'Dorfgeschichte', 'Zwingli'],
    description: 'Das Dorf Kappel am Albis ist eng mit der Geschichte der Reformation verbunden. Die Umgebung des Dorfes war Schauplatz zweier Kappeler Kriege.',
    content: `<p>Das Dorf <strong>Kappel am Albis</strong> liegt am Fusse der Albiskette. Zwei Kappeler Kriege (1529 und 1531) entschieden über den Verlauf der Reformation in der Schweiz.</p>
<p>Der sogenannte <em>Kappeler Milchsuppen-Friede</em> von 1529 ist ein bekanntes Symbol der Versöhnung: Zürcherische und innerschweizer Soldaten sollen damals gemeinsam Milchsuppe gegessen haben.</p>`,
  },
  {
    id: 12,
    number: 12,
    name: 'Schloss Knonau',
    subtitle: 'Einziges Schloss im Bezirk',
    municipality: 'Knonau',
    coordinates: [47.2233, 8.4744],
    themes: ['Schloss', 'Geschichte', 'Landvogtei', 'GGA'],
    description: 'Das Schloss Knonau ist das einzige Schloss im Bezirk Affoltern. Es war Sitz von 54 eidgenössischen Landvögten und beherbergte später Oberamtmann Conrad Melchior Hirzel.',
    content: `<p>Das <strong>Schloss Knonau</strong> ist das einzige Schloss im Bezirk Affoltern. Zwischen 1512 und 1798 residierten hier 54 Landvögte der Eidgenossenschaft.</p>
<p>Anfang des 19. Jahrhunderts wohnte hier <strong>Conrad Melchior Hirzel</strong>, der 1825 die Gemeinnützige Gesellschaft des Bezirkes Affoltern (GGA) gründete – dieselbe Gesellschaft, die später den Ämtlerweg schuf.</p>
<p>Das Schloss erklärt auch den Namen <em>Knonauer Amt</em>: Bis 1873 war Knonau Bezirkshauptort.</p>`,
  },
  {
    id: 13,
    number: 13,
    name: 'Knonau',
    subtitle: 'Ehemaliger Bezirkshauptort',
    municipality: 'Knonau',
    coordinates: [47.2200, 8.4717],
    themes: ['Dorfgeschichte', 'Bezirkshauptort', 'Landwirtschaft'],
    description: 'Knonau war bis 1873 der Hauptort des gleichnamigen Amts. Das Dorf liegt im flachen Reusstal und ist von landwirtschaftlichen Flächen umgeben.',
    content: `<p><strong>Knonau</strong> liegt im Tal der Reuss auf 435 m ü. M. Bis 1873 war es Hauptort des «Knonauer Amts», was dem Bezirk seinen historischen Namen gab.</p>
<p>Die fruchtbare Ebene rund um Knonau ist noch heute intensiv landwirtschaftlich genutzt. Die sanften Hügel der Umgebung bilden den typischen Charakter des Säuliamts.</p>`,
  },
  {
    id: 14,
    number: 14,
    name: 'Maschwanden',
    subtitle: 'Tiefster Punkt – Reuss und Lorze',
    municipality: 'Maschwanden',
    coordinates: [47.2031, 8.4822],
    themes: ['Reuss', 'Flusslandschaft', 'Natur', 'Tiefpunkt'],
    description: 'Maschwanden liegt am tiefsten Punkt des Ämtlerwegs im Reusstal. Hier treffen Reuss und Lorze zusammen – eine einzigartige Flusslandschaft.',
    content: `<p><strong>Maschwanden</strong> liegt auf nur 395 m ü. M. im Reusstal – dem tiefsten Punkt des Ämtlerwegs. Das Dorf ist bekannt für die Zusammenführung von Reuss und Lorze.</p>
<p>Die Reussebene ist ein wichtiges Naturschutzgebiet mit artenreichen Auenwäldern, Feuchtwiesen und dem Naturschutzgebiet Reusstal. Zahlreiche Vogelarten nutzen die Auen als Rückzugsgebiet.</p>
<p>Die niedrige Lage machte Maschwanden in der Vergangenheit anfällig für Überschwemmungen. Kanalisierungen haben die Situation verbessert.</p>`,
  },
  {
    id: 15,
    number: 15,
    name: 'Lorzenspitz',
    subtitle: 'Naturschutzgebiet Lorze',
    municipality: 'Maschwanden / Obfelden',
    coordinates: [47.2089, 8.5089],
    themes: ['Naturschutz', 'Lorze', 'Auen', 'Vögel'],
    description: 'Der Lorzenspitz ist eine schützenswerte Halbinsel am Zusammenfluss von Lorze und Reuss. Das Auengebiet ist von nationaler Bedeutung.',
    content: `<p>Der <strong>Lorzenspitz</strong> ist eine bewaldete Landzunge im Zusammenfluss von Lorze und Reuss. Das Gebiet steht als Auenlandschaft von nationaler Bedeutung unter Schutz.</p>
<p>Die Auen beherbergen eine reiche Tier- und Pflanzenwelt: Eisvögel, Schwarzmilane, Biber und seltene Amphibienarten finden hier ihren Lebensraum. Im Frühjahr blühen Schlehdorn und Liguster in den Gebüschen.</p>`,
  },
  {
    id: 16,
    number: 16,
    name: 'Obfelden – Brücke',
    subtitle: 'Übergang über die Lorze',
    municipality: 'Obfelden',
    coordinates: [47.2181, 8.5211],
    themes: ['Lorze', 'Wasserrecht', 'Gewerbe', 'Mühlen'],
    description: 'Die Lorze war einst die wichtigste Energiequelle der Region. Zahlreiche Mühlen und Gewerbe nutzten das Wasser des Flusses.',
    content: `<p>Die <strong>Lorze</strong> entwässert den Zugersee und fliesst durch das Lorzetobel zum Reusstal. Ihr Wasser trieb jahrhundertelang Mühlen und Sägewerke an.</p>
<p>In Obfelden existierten mehrere Mühlenbetriebe. Das Wasserrecht an der Lorze war ein wertvolles Privileg, das den Wohlstand der anliegenden Gemeinden mitbestimmte.</p>`,
  },
  {
    id: 17,
    number: 17,
    name: 'Rickenbach',
    subtitle: 'Landwirtschaft im Reusstal',
    municipality: 'Obfelden',
    coordinates: [47.2300, 8.5372],
    themes: ['Landwirtschaft', 'Obstkulturen', 'Reusstal'],
    description: 'Rickenbach liegt in der fruchtbaren Ebene östlich von Obfelden. Die Gegend ist geprägt durch intensive Landwirtschaft mit Gemüse- und Obstanbau.',
    content: `<p><strong>Rickenbach</strong> ist ein Weiler in der Reussebene. Die fruchtbaren Böden des ehemaligen Moores werden intensiv für Gemüse- und Obstproduktion genutzt.</p>
<p>Die Velorouten durch die Reussebene verbinden Rickenbach mit den umliegenden Gemeinden. Viele Wanderer nützen auch die Wege entlang des Reussdamms.</p>`,
  },
  {
    id: 18,
    number: 18,
    name: 'Bickwil',
    subtitle: 'Weiler auf dem Hügelrücken',
    municipality: 'Obfelden',
    coordinates: [47.2439, 8.5433],
    themes: ['Weiler', 'Hügellandschaft', 'Aussicht'],
    description: 'Bickwil ist ein kleiner Weiler auf einem Hügelrücken östlich von Obfelden mit weitem Blick über das Reusstal.',
    content: `<p><strong>Bickwil</strong> liegt auf einem markanten Hügelrücken auf rund 500 m ü. M. Von hier reicht der Blick weit über das Reusstal bis zu den Alpen.</p>
<p>Die Hügel zwischen Reusstal und Albis sind typisch für die Drumlinlandschaft des Mittellands, die in der letzten Eiszeit durch den Reussgletscher geformt wurde.</p>`,
  },
  {
    id: 19,
    number: 19,
    name: 'Isenberg – Islisberg',
    subtitle: 'Aussichtspunkt Isenberg',
    municipality: 'Islisberg',
    coordinates: [47.2578, 8.5528],
    themes: ['Aussicht', 'Islisberg', 'Natur'],
    description: 'Der Isenberg bei Islisberg bietet eine der weitesten Aussichten im Bezirk Affoltern. Klare Tage ermöglichen die Sicht auf Alpen und Jura.',
    content: `<p>Der <strong>Isenberg</strong> liegt auf 570 m ü. M. und bietet einen 360°-Panoramablick: Im Süden die Alpen mit Eiger, Mönch und Jungfrau, im Norden der Zürichsee und der Jura.</p>
<p>Islisberg ist eine der kleinsten Gemeinden des Bezirks. Das Dorf hat seinen dörflichen Charakter bewahrt und liegt inmitten von Obstgärten und Mischwäldern.</p>`,
  },
  {
    id: 20,
    number: 20,
    name: 'Zwillikon',
    subtitle: 'Dorf und Grundwasser',
    municipality: 'Affoltern am Albis',
    coordinates: [47.2753, 8.5297],
    themes: ['Wasser', 'Grundwasser', 'Dorf'],
    description: 'Zwillikon ist ein Ortsteil von Affoltern am Albis. Unter der flachen Ebene liegen wichtige Grundwasservorkommen, die die Region mit Trinkwasser versorgen.',
    content: `<p><strong>Zwillikon</strong> liegt in der weiten Ebene nördlich von Affoltern. Die durchlässigen Kies- und Sandböden der Region speichern grosse Mengen Grundwasser.</p>
<p>Das Grundwasser des Knonauer Amts versorgt nicht nur die lokalen Gemeinden, sondern wird auch in das Zürcher Wasserversorgungsnetz eingespeist. Schutzzonenschilder erinnern daran, in dieser Gegend keine Schadstoffe in den Boden gelangen zu lassen.</p>`,
  },
  {
    id: 21,
    number: 21,
    name: 'Gibel',
    subtitle: 'Höchster Punkt Westseite',
    municipality: 'Bonstetten',
    coordinates: [47.2997, 8.4742],
    themes: ['Höchster Punkt', 'Wald', 'Aussicht', 'Forstwirtschaft'],
    description: 'Der Gibel ist mit 640 m ü. M. der höchste Punkt auf der Westseite des Ämtlerwegs. Der Weg führt durch ausgedehnte Buchenwälder.',
    content: `<p>Der <strong>Gibel</strong> (640 m ü. M.) ist der höchste Punkt auf der westlichen Route des Ämtlerwegs. Ausgedehnte Buchenwälder prägen diesen Abschnitt.</p>
<p>Der Wald des Knonauer Amts ist wichtiger Erholungsraum und Rohstofflieferant. Nachhaltige Forstwirtschaft sichert den Wald als Lebensraum und Kohlenstoffspeicher. Im Herbst sind die Buchenwälder in leuchtendes Gold und Orange getaucht.</p>`,
  },
  {
    id: 22,
    number: 22,
    name: 'Stierenmas',
    subtitle: 'Landwirtschaftliche Ebene',
    municipality: 'Knonau / Bonstetten',
    coordinates: [47.3097, 8.4672],
    themes: ['Landwirtschaft', 'Ebene', 'Rückkehr'],
    description: 'Die Stierenmas ist eine weitläufige landwirtschaftliche Ebene zwischen Knonau und Bonstetten. Sie markiert die letzte Station vor dem Ziel.',
    content: `<p>Die <strong>Stierenmas</strong> ist eine fruchtbare Geländeterrasse zwischen dem Albisrücken und dem Bonstetter Hügelzug. Das Gebiet ist geprägt durch Ackerbau und Viehwirtschaft.</p>
<p>Von hier sind es nur noch wenige Kilometer bis zum Ausgangspunkt Bonstetten-Wettswil. Der Weg führt durch Acker- und Grünland – ein ruhiger Abschluss einer abwechslungsreichen Rundwanderung durch das Knonauer Amt.</p>
<p>Der Ämtlerweg ist ein Geschenk der GGA an die Bevölkerung und lädt zum Wiederentdecken der eigenen Region ein.</p>`,
  },
];

// Route als geordnete Koordinaten-Liste (für die Kartenlinie)
const ROUTE_COORDINATES = STATIONS_DATA.map(s => s.coordinates);
// Schliesse den Kreis
ROUTE_COORDINATES.push(STATIONS_DATA[0].coordinates);
