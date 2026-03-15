/**
 * Stationsdaten des Ämtlerwegs (OSM Relation 223317)
 *
 * Stationsnamen und -themen gemäss den physischen Infotafeln.
 * Koordinaten sind geografisch plausible Näherungswerte basierend auf
 * den beschriebenen Standorten (Höhenangaben, Ortsbezeichnungen).
 *
 * → Für genaue GPS-Koordinaten:
 *   Option A: node scripts/fetch-osm-coordinates.js  (lokal, Internetzugang nötig)
 *   Option B: admin-calibrate.html im Browser öffnen und Marker verschieben
 *   Option C: Overpass Turbo: https://overpass-turbo.eu
 *             Abfrage: [out:json];relation(223317);node(r);out body;
 */
const STATIONS_DATA = [
  {
    id: 1,
    number: 1,
    name: 'Bonstetter Waldweiher',
    subtitle: 'Start & Ziel – Wald über Bonstetten',
    municipality: 'Bonstetten',
    coordinates: [47.3320, 8.4680],  // ~600 m ü. M., Wald nördlich Bonstetten
    themes: ['Waldweiher', 'Natur', 'Start & Ziel'],
    description: 'Der Bonstetter Waldweiher liegt im Wald über dem Dorf Bonstetten auf rund 600 m ü. M. Er markiert den Beginn der 46 km langen Rundwanderung durch das Knonauer Amt.',
    content: `<p>Der <strong>Bonstetter Waldweiher</strong> ist ein idyllischer Weiher im Wald nördlich von Bonstetten. Der ruhige Gewässerbereich ist Lebensraum für Amphibien, Libellen und Wasservögel.</p>
<p>Der Ämtlerweg wurde von der <strong>Gemeinnützigen Gesellschaft des Bezirkes Affoltern (GGA)</strong> im Jahr 2000 als Geschenk an die Bevölkerung angelegt. An 22 Tafeln entlang des 46 km langen Rundwegs erfährt man Wissenswertes über Geschichte, Natur und Wirtschaft des Knonauer Amts.</p>
<p><strong>Anreise:</strong> S-Bahn S14 bis Bonstetten-Wettswil.</p>`,
  },
  {
    id: 2,
    number: 2,
    name: 'Feldenmas',
    subtitle: 'Landwirtschaftliche Ebene',
    municipality: 'Bonstetten / Aeugst am Albis',
    coordinates: [47.3150, 8.4830],  // Zwischen Bonstetten und Bisliker Weiher
    themes: ['Landwirtschaft', 'Flurname', 'Kulturlandschaft'],
    description: 'Die «Feldenmas» ist eine alte Flurbezeichnung für die Ebene zwischen Bonstetten und dem Bisliker Weiher. Flurnamen erzählen von der jahrhundertelangen landwirtschaftlichen Nutzung der Landschaft.',
    content: `<p>Flurnamen wie <strong>«Feldenmas»</strong> sind stumme Zeugen der Landnutzungsgeschichte. «Feld» deutet auf offenes Ackerland hin, «Mas» auf eine feuchte, massige Bodenbeschaffenheit.</p>
<p>Die Landwirtschaft des Knonauer Amts ist geprägt durch Ackerbau, Obstbau und Viehwirtschaft. Die offene Kulturlandschaft bietet Lebensraum für Feldvögel wie Feldlerche und Kiebitz.</p>`,
  },
  {
    id: 3,
    number: 3,
    name: 'Bisliker Weiher',
    subtitle: 'Naturschutzweiher bei Aeugst',
    municipality: 'Aeugst am Albis',
    coordinates: [47.2970, 8.5010],  // Weiher bei Aeugst am Albis
    themes: ['Naturschutz', 'Amphibien', 'Weiher', 'Biodiversität'],
    description: 'Der Bisliker Weiher ist ein wertvolles Naturschutzgebiet. Das Gewässer bietet seltenen Tier- und Pflanzenarten einen geschützten Lebensraum.',
    content: `<p>Der <strong>Bisliker Weiher</strong> liegt bei Aeugst am Albis inmitten einer reich gegliederten Landschaft. Das Naturschutzgebiet beherbergt seltene Amphibienarten wie den Laubfrosch und den Kammmolch.</p>
<p>Historisch wurden solche Weiher als Fischteiche oder zur Bewässerung genutzt. Heute stehen sie im Dienst des Naturschutzes. Zahlreiche Insekten, Wasservögel und Uferpflanzen sind hier anzutreffen.</p>`,
  },
  {
    id: 4,
    number: 4,
    name: 'Riedhof',
    subtitle: 'Museum Bergwerk Riedhof – Aeugsterberg',
    municipality: 'Aeugst am Albis',
    coordinates: [47.2850, 8.4930],  // Aeugsterberg, Riedhof-Gebiet
    themes: ['Bergbau', 'Geschichte', 'Museum', 'Kohle'],
    description: 'Am Aeugsterberg befinden sich Spuren eines historischen Kohlebergwerks. Das Museum Bergwerk Riedhof erinnert an den einst bedeutenden Kohleabbau in dieser Region.',
    content: `<p>Das <strong>Museum Bergwerk Riedhof</strong> am Aeugsterberg dokumentiert den historischen Kohlebergbau im Knonauer Amt. Im 18. und 19. Jahrhundert wurde hier Pechkohle (Lignit) abgebaut.</p>
<p>Der Kohleabbau war aufwendig und der Qualität nach begrenzt, spielte aber in der vorindustriellen Zeit als lokale Energiequelle eine wichtige Rolle. Heute ist die Gegend von naturnahen Wäldern überwachsen, die kaum noch an die bergbauliche Vergangenheit erinnern.</p>`,
  },
  {
    id: 5,
    number: 5,
    name: 'Türlersee',
    subtitle: 'See auf der Albishöhe – 640 m ü. M.',
    municipality: 'Aeugst am Albis',
    coordinates: [47.2820, 8.5030],  // Türlersee, ~640 m ü. M.
    themes: ['See', 'Albiskette', 'Natur', 'Wasservögel'],
    description: 'Der Türlersee liegt auf rund 640 m ü. M. am Fuss der Albiskette. Der natürliche Bergsee ist ein wichtiger Lebensraum für Zugvögel und ein beliebtes Naherholungsziel.',
    content: `<p>Der <strong>Türlersee</strong> ist ein natürlicher Moränensee auf der Hochfläche der Albiskette. Er liegt auf 644 m ü. M. und ist einer der wenigen natürlichen Seen im Knonauer Amt.</p>
<p>Der See ist bekannt als Rastplatz für Zugvögel. Im Herbst und Frühjahr rasten hier tausende von Enten, Tauchern und anderen Wasservögeln. Der See und seine Ufer stehen unter Naturschutz.</p>
<p>Das Wasser des Türlersees fliesst über die Sihl ab – ein Hinweis darauf, dass der See auf der Ostseite der Albis-Wasserscheide liegt.</p>`,
  },
  {
    id: 6,
    number: 6,
    name: 'Türlen',
    subtitle: 'Weiler auf der Albishöhe – 657 m ü. M.',
    municipality: 'Hausen am Albis',
    coordinates: [47.2720, 8.5000],  // Türlen, ~657 m ü. M.
    themes: ['Weiler', 'Albishöhe', 'Aussicht', 'Landwirtschaft'],
    description: 'Türlen ist ein kleiner Weiler auf der höchsten Stelle des Ämtlerwegs. Von hier bietet sich ein weiter Blick über das Mittelland und zu den Alpen.',
    content: `<p><strong>Türlen</strong> liegt auf 657 m ü. M. auf dem Albisrücken. Der Weiler besteht aus wenigen landwirtschaftlichen Gebäuden und ist von Wäldern und Weiden umgeben.</p>
<p>Von der Albishöhe reicht an klaren Tagen die Sicht vom Jura im Norden bis zu den Alpen im Süden. Die Albiskette bildet die Wasserscheide zwischen Rhein (via Sihl/Limmat) und Reuss.</p>`,
  },
  {
    id: 7,
    number: 7,
    name: 'Hexengraben',
    subtitle: 'Waldtal bei Hausen am Albis',
    municipality: 'Hausen am Albis',
    coordinates: [47.2610, 8.4980],  // Hexengraben / Schonau-Gebiet, Hausen
    themes: ['Folklore', 'Wald', 'Tobel', 'Geschichte'],
    description: 'Der «Hexengraben» ist ein tief eingeschnittenes Waldtobel bei Hausen am Albis. Solche abgelegenen Tobel trugen in früheren Zeiten geheimnisvolle Namen, die von Volksaberglauben zeugten.',
    content: `<p>Schaurige Flurnamen wie <strong>«Hexengraben»</strong> erinnern an eine Zeit, in der Unwissenheit und Aberglauben die Deutung von Naturerscheinungen prägten. In Hexenverfolgungswellen des 16. und 17. Jahrhunderts wurden auch im Knonauer Amt Menschen wegen angeblicher Hexerei verurteilt.</p>
<p>Das dunkle Tobel mit seinem feucht-kühlen Mikroklima beherbergt eine artenreiche Farn- und Moosvegetation. Solche Waldtobel sind ökologisch wertvolle Rückzugsräume.</p>`,
  },
  {
    id: 8,
    number: 8,
    name: 'Textil- und Seidenindustrie',
    subtitle: 'Fabrik Weisbrod – Hausen am Albis',
    municipality: 'Hausen am Albis',
    coordinates: [47.2530, 8.4930],  // Hausen am Albis, Fabrik Weisbrod
    themes: ['Industrie', 'Seidenweberei', 'Geschichte', 'Wirtschaft'],
    description: 'Hausen am Albis war einst ein wichtiges Zentrum der Textil- und Seidenindustrie. Die Fabrik Weisbrod ist ein Zeugnis dieser wirtschaftlichen Blütezeit.',
    content: `<p>Die <strong>Fabrik Weisbrod</strong> in Hausen am Albis steht stellvertretend für die bedeutende Textil- und Seidenindustrie, die das Knonauer Amt vom 18. bis ins 20. Jahrhundert prägte.</p>
<p>Zürich war ein europäisches Zentrum der Seidenweberei. Auch im ländlichen Knonauer Amt webten Heimarbeiter und später Fabrikarbeiter Seiden- und Baumwollstoffe. Die Wasserläufe der Region trieben Webmaschinen an.</p>
<p>Mit der Industrialisierung und dem Aufkommen der synthetischen Fasern verlor die Textilindustrie an Bedeutung. Heute zeugen wenige erhaltene Fabrikgebäude von dieser Epoche.</p>`,
  },
  {
    id: 9,
    number: 9,
    name: 'Näfenhüser',
    subtitle: 'Weiler bei Kappel am Albis – 590 m ü. M.',
    municipality: 'Kappel am Albis',
    coordinates: [47.2440, 8.4840],  // Näfenhüser, ~590 m, bei Kappel
    themes: ['Weiler', 'Waldlandschaft', 'Ruhezone'],
    description: 'Näfenhüser ist ein abgelegener Weiler bei Kappel am Albis auf rund 590 m ü. M. Der Weg führt hier durch stille Wälder und vorbei an alten Bauernhöfen.',
    content: `<p><strong>Näfenhüser</strong> liegt am Rand des Waldgebiets zwischen dem Albisrücken und dem Kloster Kappel. Der Weiler besteht aus wenigen alten Bauernhöfen, die das typische Erscheinungsbild der Streusiedlungen im Knonauer Amt widerspiegeln.</p>
<p>Die Umgebung ist geprägt durch Mischwälder, Wiesen und vereinzelte Obstgärten. Die Ruhe und Abgeschiedenheit dieser Gegend war früher typisch für das gesamte Säuliamt.</p>`,
  },
  {
    id: 10,
    number: 10,
    name: 'Kloster Kappel am Albis',
    subtitle: 'Ehemaliges Zisterzienserkloster – 1185',
    municipality: 'Kappel am Albis',
    coordinates: [47.2453, 8.4782],  // Kloster Kappel – gut bekannte Lage
    themes: ['Kloster', 'Reformation', 'Zwingli', 'Architektur', 'Geschichte'],
    description: 'Das Kloster Kappel am Albis ist eines der bedeutendsten mittelalterlichen Denkmäler der Region. Hier fiel 1531 der Reformator Huldrych Zwingli in der Zweiten Kappeler Schlacht.',
    content: `<p>Das <strong>Kloster Kappel am Albis</strong> wurde 1185 als Zisterzienserkloster gegründet. Es ist heute ein reformiertes Bildungs- und Tagungshaus des Kantons Zürich.</p>
<p>Im Jahr <strong>1531</strong> fiel hier der Reformator <strong>Huldrych Zwingli</strong> in der Zweiten Kappeler Schlacht. Ein Denkmal erinnert an dieses historische Ereignis, das die Entwicklung der Reformation in der Schweiz entscheidend beeinflusste.</p>
<p>Die gut erhaltene Klosteranlage mit Kreuzgang, Kirche und Klosterhof gehört zu den schönsten mittelalterlichen Bauten des Kantons Zürich und ist täglich zu besichtigen.</p>`,
  },
  {
    id: 11,
    number: 11,
    name: 'Ober-Rifferswil',
    subtitle: 'Weiler auf dem Südausläufer des Albis',
    municipality: 'Rifferswil',
    coordinates: [47.2340, 8.4710],  // Ober-Rifferswil, ~586 m
    themes: ['Weiler', 'Albis-Südausläufer', 'Aussicht'],
    description: 'Ober-Rifferswil liegt auf einem Südausläufer des Albisrückens. Das Dorf bietet einen schönen Blick über das obere Reusstal.',
    content: `<p><strong>Ober-Rifferswil</strong> liegt auf rund 586 m ü. M. am Südausläufer des Albis. Die Gemeinde Rifferswil gehört zum Bezirk Affoltern und zeichnet sich durch eine ruhige, ländliche Atmosphäre aus.</p>
<p>Von hier blickt man über das obere Reusstal bis zum Zugersee und bei klarem Wetter zu den Zentralalpen. Die Hanglagen um Rifferswil werden für Obst- und Weinbau genutzt.</p>`,
  },
  {
    id: 12,
    number: 12,
    name: 'Wissenbach',
    subtitle: 'Historischer Verkehrsweg – Mettmenstetten',
    municipality: 'Mettmenstetten',
    coordinates: [47.2390, 8.5100],  // Wissenbach, ~491 m, Mettmenstetten
    themes: ['Verkehrsgeschichte', 'Handelswege', 'Römerzeit', 'Mittelalter'],
    description: 'Der Weiler Wissenbach bei Mettmenstetten liegt an einem alten Handels- und Verkehrsweg. Solche Wege verbanden einst die Siedlungen im Knonauer Amt mit den Handelszentren.',
    content: `<p><strong>Wissenbach</strong> liegt auf 491 m ü. M. am Hang oberhalb von Mettmenstetten. Durch diese Gegend verliefen historische Verkehrswege, die das Mittelland mit dem Alpenraum verbanden.</p>
<p>Bereits die Römer nutzten Pässe und Wegkorridore in dieser Region. Im Mittelalter bildeten solche Wege das Rückgrat des regionalen Handels: Getreide, Holz, Vieh und Tuch wurden über diese Routen transportiert.</p>`,
  },
  {
    id: 13,
    number: 13,
    name: 'Schloss Knonau',
    subtitle: 'Einziges Schloss im Bezirk – 436 m ü. M.',
    municipality: 'Knonau',
    coordinates: [47.2225, 8.4620],  // Knonau Dorfkern, Schloss
    themes: ['Schloss', 'Geschichte', 'Landvogtei', 'GGA'],
    description: 'Das Schloss Knonau ist das einzige Schloss im Bezirk Affoltern. Es war Sitz von 54 eidgenössischen Landvögten und Geburtsort der GGA.',
    content: `<p>Das <strong>Schloss Knonau</strong> ist das einzige Schloss im Bezirk Affoltern. Zwischen 1512 und 1798 residierten hier 54 Landvögte der Eidgenossenschaft.</p>
<p>Anfang des 19. Jahrhunderts lebte hier <strong>Conrad Melchior Hirzel</strong>, der 1825 die Gemeinnützige Gesellschaft des Bezirkes Affoltern (GGA) gründete – dieselbe Organisation, die später den Ämtlerweg schuf.</p>
<p>Das Schloss erklärt auch den historischen Namen <em>Knonauer Amt</em>: Bis 1873 war Knonau Bezirkshauptort.</p>`,
  },
  {
    id: 14,
    number: 14,
    name: 'Maschwanden',
    subtitle: 'Tiefster Punkt – Reusstal 401 m ü. M.',
    municipality: 'Maschwanden',
    coordinates: [47.2030, 8.4280],  // Maschwanden, 401 m, Reusstal
    themes: ['Reuss', 'Flusslandschaft', 'Tiefpunkt', 'Natur'],
    description: 'Maschwanden liegt auf 401 m ü. M. im Reusstal – dem tiefsten Punkt des Ämtlerwegs. Die Reussebene ist eine wichtige Naturlandschaft.',
    content: `<p><strong>Maschwanden</strong> liegt auf 401 m ü. M. im Reusstal – dem tiefsten Punkt des Ämtlerwegs. Das Dorf ist bekannt für die nahe gelegene Auenlandschaft der Reuss.</p>
<p>Die Reussebene ist ein national bedeutsames Auengebiet. Artenreiche Auwälder, Feuchtwiesen und naturnahe Fliessgewässer bieten Lebensraum für Eisvögel, Biber, seltene Amphibien und viele weitere Arten.</p>
<p>Die niedrige Lage machte Maschwanden historisch anfällig für Überschwemmungen. Flussverbauungen ab dem 19. Jahrhundert haben die Situation entschärft, doch der natürliche Charakter der Reusslandschaft wurde dabei verändert.</p>`,
  },
  {
    id: 15,
    number: 15,
    name: 'Lorzenspitz',
    subtitle: 'Naturschutzgebiet – 395 m ü. M.',
    municipality: 'Maschwanden',
    coordinates: [47.2090, 8.4300],  // Lorzenspitz, Zusammenfluss Lorze/Reuss
    themes: ['Naturschutz', 'Auen', 'Lorze', 'Reuss'],
    description: 'Der Lorzenspitz ist eine bewaldete Landzunge am Zusammenfluss von Lorze und Reuss – ein Auengebiet von nationaler Bedeutung.',
    content: `<p>Der <strong>Lorzenspitz</strong> liegt an der Mündung der Lorze in die Reuss auf 395 m ü. M. Das bewaldete Auengebiet steht als Landschaft von nationaler Bedeutung unter Schutz.</p>
<p>Die Lorze entwässert den Zugersee und trifft hier auf die Reuss. Die Dynamik zweier Flüsse schafft ein mosaikartiges Nebeneinander von Auwäldern, Kiesbänken und Feuchtwiesen – Lebensraum für Schwarzmilan, Eisvogel und Biber.</p>`,
  },
  {
    id: 16,
    number: 16,
    name: 'Hochwasserschutz',
    subtitle: 'Naturschutz – Reussebene Obfelden',
    municipality: 'Obfelden',
    coordinates: [47.2200, 8.4320],  // Reussdamm, Obfelden
    themes: ['Hochwasserschutz', 'Naturschutz', 'Reuss', 'Revitalisierung'],
    description: 'Die Reussebene bei Obfelden wurde im 19. und 20. Jahrhundert eingedämmt. Heute werden Flussabschnitte revitalisiert, um natürliche Überflutungsdynamik wiederherzustellen.',
    content: `<p>Die <strong>Reussebene bei Obfelden</strong> ist ein Beispiel für das Spannungsfeld zwischen Hochwasserschutz und Naturschutz. Historische Flussbegradigungen schufen Sicherheit, aber zerstörten natürliche Lebensräume.</p>
<p>Moderne Revitalisierungsprojekte geben dem Fluss Raum zurück. Breite Uferstreifen, Altarme und extensive Wiesen entlang der Reuss bieten Platz für natürliche Überflutung und gleichzeitig wertvolle Biodiversität.</p>`,
  },
  {
    id: 17,
    number: 17,
    name: 'Riedland und Streueland',
    subtitle: 'Feuchtwiesen bei Rickenbach',
    municipality: 'Obfelden',
    coordinates: [47.2320, 8.4370],  // Rickenbach / Riedland-Gebiet
    themes: ['Feuchtwiesen', 'Riedland', 'Naturschutz', 'Streue'],
    description: 'Das Riedland bei Rickenbach ist ein Beispiel für die einst weit verbreiteten Feuchtwiesen des Mittellands. Solche Streuelandschaften sind heute selten geworden.',
    content: `<p><strong>Riedland</strong> bezeichnete früher feuchte, mit Schilf, Binsen und Seggen bewachsene Flächen. Diese «Streuwiesen» wurden einmal jährlich gemäht, und das Schnittgut als Einstreu in den Ställen verwendet.</p>
<p>Durch Entwässerung und Intensivierung der Landwirtschaft sind die meisten Riedgebiete verschwunden. Die erhaltenen Restflächen beherbergen seltene Pflanzen wie die Prachtnelke, den Lungenenzian und zahlreiche Seggenarten.</p>`,
  },
  {
    id: 18,
    number: 18,
    name: 'Waldbewohner',
    subtitle: 'Wald und Tierwelt – Zwillikon',
    municipality: 'Affoltern am Albis',
    coordinates: [47.2520, 8.4370],  // Waldhang Richtung Zwillikon
    themes: ['Wald', 'Wildtiere', 'Forstwirtschaft', 'Biodiversität'],
    description: 'Der Weg führt hier durch bewaldete Hänge. Die Tafel widmet sich den «Waldbewohnern» – den Tieren, die den Wald des Knonauer Amts bewohnen.',
    content: `<p>Der Wald des Knonauer Amts beherbergt eine vielfältige Tierwelt. <strong>Rehe, Wildschweine, Füchse und Dachse</strong> sind die bekanntesten Bewohner. Weniger sichtbar, aber nicht minder wichtig sind Spechte, Eulen, Fledermäuse und die unzähligen Insekten- und Pilzarten.</p>
<p>Totholz spielt eine entscheidende Rolle: abgestorbene Bäume sind Wohn- und Nahrungsraum für über 5000 Tierarten in der Schweiz. Nachhaltige Forstwirtschaft lässt gezielt Altholz- und Totholzbäume stehen.</p>`,
  },
  {
    id: 19,
    number: 19,
    name: 'Obstkulturen',
    subtitle: 'Hochstammobstbäume – Zwillikon',
    municipality: 'Affoltern am Albis',
    coordinates: [47.2760, 8.4310],  // Zwillikon, Obstkulturen
    themes: ['Obstbau', 'Hochstamm', 'Biodiversität', 'Streuobst'],
    description: 'Zwillikon ist umgeben von Hochstammobstgärten. Diese traditionellen Streuobstwiesen sind wertvolle Lebensräume und prägen das charakteristische Landschaftsbild des Knonauer Amts.',
    content: `<p><strong>Hochstammobstbäume</strong> sind ein Wahrzeichen des Knonauer Amts. Apfel-, Birnen-, Zwetschgen- und Kirschbäume prägen das Landschaftsbild und liefern die Grundlage für Most, Schnaps und Direktvermarktung.</p>
<p>Eine alte Hochstammwiese bietet Lebensraum für über 5000 Tier- und Pflanzenarten – mehr als fast jeder andere Lebensraumtyp im Mittelland. Steinkauz, Wiedehopf und zahlreiche Insektenarten sind auf diese Strukturen angewiesen.</p>
<p>Der Rückgang der Hochstammbäume um mehr als 70 % seit 1950 hat zu einem dramatischen Verlust dieser Biodiversität geführt. Förderprogramme helfen heute bei der Erhaltung und Neupflanzung.</p>`,
  },
  {
    id: 20,
    number: 20,
    name: 'Weiler und Bohlenständerbau',
    subtitle: 'Ismatt – historische Bauweise',
    municipality: 'Hedingen',
    coordinates: [47.2870, 8.4480],  // Ismatt / Hedingen-Grenzgebiet
    themes: ['Baugeschichte', 'Holzbau', 'Weiler', 'Architektur'],
    description: 'Der Weiler Ismatt zeigt Beispiele der traditionellen Bohlenständer-Bauweise, die für das Mittelland typisch war. Diese Holzbautechnik prägte Jahrhunderte lang das Bild der Bauernhäuser.',
    content: `<p>Die <strong>Bohlenständer-Bauweise</strong> ist eine traditionelle Holzbaukunst des Mittellands: Senkrechte Holzständer tragen das Dach, während waagrechte Bohlen die Wände füllen. Diese Technik ermöglichte flexible Raumaufteilungen und war materialeffizient.</p>
<p>Im Weiler <strong>Ismatt</strong> sind noch einige Gebäude erhalten, die Elemente dieser historischen Bauweise zeigen. Die alten Bauernhäuser des Knonauer Amts kombinieren oft Wohn- und Wirtschaftsteil unter einem Dach.</p>`,
  },
  {
    id: 21,
    number: 21,
    name: 'Verkehrswege im Säuliamt',
    subtitle: 'Strassengeschichte – Bonstetten',
    municipality: 'Bonstetten',
    coordinates: [47.3100, 8.4560],  // Bonstetter Hügelzug, Rückweg
    themes: ['Verkehrsgeschichte', 'Strassen', 'Bahn', 'Entwicklung'],
    description: 'Diese Tafel widmet sich der Verkehrsgeschichte des Knonauer Amts – von den mittelalterlichen Saumpfaden über die Postkutschen bis zur Eisenbahn.',
    content: `<p>Das <strong>Knonauer Amt</strong> war lange Zeit von den grossen Verkehrsströmen abgeschnitten. Die Hügellandschaft des Säuliamts erschwerte den Ausbau von Strassennetz und Bahnlinien.</p>
<p>Mit der Eröffnung der <strong>Sihltal-Zürich-Uetliberg-Bahn</strong> (heute S4/S10) und der <strong>Bremgarten-Dietikon-Bahn</strong> sowie der <strong>S14</strong> erhielt die Region im späten 19. Jahrhundert Anschluss ans Schienennetz. Dies veränderte die Wirtschaft und Lebensweise der Bevölkerung grundlegend.</p>`,
  },
  {
    id: 22,
    number: 22,
    name: 'Stierenmas',
    subtitle: 'Getreidebau – letzte Station vor dem Ziel',
    municipality: 'Bonstetten',
    coordinates: [47.3180, 8.4570],  // Stierenmas, 528 m, nahe Ziel
    themes: ['Getreidebau', 'Landwirtschaft', 'Abschluss'],
    description: 'Die Stierenmas bei Bonstetten ist eine weitläufige Ackerfläche. Die letzte Infotafel widmet sich dem Getreidebau als Grundlage der Ernährung im Knonauer Amt.',
    content: `<p>Die <strong>Stierenmas</strong> liegt auf 528 m ü. M. auf einer Geländeterrasse zwischen dem Albisrücken und Bonstetten. Die fruchtbaren Böden werden für Getreidebau genutzt.</p>
<p><strong>Getreide</strong> war über Jahrhunderte die wichtigste Nahrungsgrundlage der Bevölkerung. Weizen, Roggen, Gerste und Dinkel wuchsen auf den Äckern des Knonauer Amts. Mühlen an den Bächen vermahlten das Korn zu Mehl.</p>
<p>Von der Stierenmas sind es nur noch wenige Minuten bis zum Ausgangspunkt Bonstetten-Wettswil – dem Ende einer abwechslungsreichen Rundwanderung durch Geschichte, Natur und Wirtschaft des Säuliamts.</p>`,
  },
];

// Route als geordnete Koordinaten-Liste (für die Kartenlinie)
const ROUTE_COORDINATES = STATIONS_DATA.map(s => s.coordinates);
// Schliesse den Kreis
ROUTE_COORDINATES.push(STATIONS_DATA[0].coordinates);
