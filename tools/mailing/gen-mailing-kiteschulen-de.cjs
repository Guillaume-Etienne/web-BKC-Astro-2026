// ============================================================================
//  MAILING KITESCHULEN & VEREINE — ALLEMAGNE
//  ---------------------------------------------------------------------------
//  ATTENTION : ce n'est PAS la traduction du mail francais. Meme lecon que
//  l'espagnol (v1 traduite, rejetee par Teresa le 21/09/2026) : le texte est
//  ecrit directement en allemand a partir des FAITS du mail FR (15 km de
//  lagune, 1 m de fond, vent 9 jours sur 10, 12 kiters au maximum, paliers du
//  programme) et reprend le bloc "experience du centre" ecrit par Teresa pour
//  le mail ES. Structure en 11 blocs, comme l'espagnol.
//
//  Vocabulaire verifie sur des sites d'ecoles et d'agences kite allemandes
//  (21/09/2026). A garder si quelqu'un "corrige" le texte :
//    - on TUTOIE ("du", "ihr" pour le groupe) : toutes les ecoles kite
//      allemandes le font, seules les agences de voyage vouvoient ;
//    - pas de "Botschafter" : le programme s'appelle "Gruppenprogramm", comme
//      la page /de/gruppenprogramm/ — le mail et la page parlent la meme langue ;
//    - Stehrevier, Flachwasser, hüfttief, Shorebreak, Neo : les mots des
//      ecoles, pas ceux d'un dictionnaire ;
//    - l'argument qui parle a un Allemand : l'eau CHAUDE (Nord/Baltique) et le
//      VIDE (douze kiters au plus), plus que l'eau plate qu'il connait ;
//    - typographie allemande : pas d'espace avant ":" , tiret " – ", "15 km".
//
//  Le site n'existe pas en allemand : les liens secondaires vont vers le site
//  ANGLAIS (urlsFor('de') dans lib.cjs), le CTA vers /de/gruppenprogramm/.
//
//  Generation : node tools/mailing/gen-mailing-kiteschulen-de.cjs
//  (.cjs et pas .js : le package.json du projet est en "type": "module")
// ============================================================================

const fs = require('fs');
const path = require('path');

const {
  IMG, urlsFor, TAG_MIRROR, TAG_UNSUB,
  SAND_BG, NAVY, OCEAN, SAND, MUTED,
  buildHead, wrapBody,
  button, image, text, p, h, eyebrow, bullets, divider, section, columns,
  photoCard, socialIcon,
} = require('./lib.cjs');

const URLS = urlsFor('de');

const OUT = path.join(__dirname, 'mailing-kiteschulen-de.html');

// Objet de la campagne, a saisir a l'identique dans Brevo. Le <title> n'est pas
// l'objet de l'e-mail : il sert a la version "voir dans le navigateur".
// Pas de "gratis" dans l'objet (filtres anti-spam) : c'est l'apercu qui le dit.
const TITLE = 'Bilene, Mosambik: 15 km Flachwasser und höchstens zwölf Kiter';

const head = buildHead(TITLE);

// ---------------------------------------------------------------- contenu
// APERCU DU TEXTE -> a saisir dans Brevo, pas ici :
//   Wind an neun von zehn Tagen, von September bis März. Und wenn du die
//   Gruppe zusammenstellst, zahlst du für deinen Aufenthalt nichts.
// Volontairement absent du HTML : Brevo injecte son propre preheader cache a
// l'envoi, un second ferait doublon dans la boite de reception.

// --- entete : le logo est blanc + vert, il lui faut ce fond sombre
const header = section(
  image(IMG.logo, 'Bilene Kite Center', { width: 200, paddingTop: 28, paddingBottom: 20, href: URLS.home }) +
  text(p('<a href="' + TAG_MIRROR + '" target="_blank" style="color:#7d8ea3;text-decoration:underline;">Diese E-Mail im Browser ansehen</a>',
    { align: 'center', size: 11, color: '#7d8ea3' }), { paddingTop: 0, paddingBottom: 18 })
, NAVY);

// --- hero : la photo qui vend, cliquable vers la video du spot
const hero = section(
  image(IMG.hero, 'Die Lagune von Bilene aus der Luft', { href: URLS.videoSpot }) +
  text(eyebrow('Für Kiteschulen und Vereine'), { paddingTop: 36, paddingBottom: 12 }) +
  text(h('Die Kitereise, von der<br />ihr noch in zehn Jahren erzählt', { size: 34 }), { paddingTop: 0, paddingBottom: 16 }) +
  text(p('Bilene, Mosambik. Eine geschlossene Lagune, 15&nbsp;km lang, warmes Wasser und Wind von September bis März. Und wenn du die Gruppe zusammenstellst, <strong>geht dein Aufenthalt auf uns</strong>.',
    { align: 'center', size: 18, color: MUTED, lh: 1.6 }), { paddingTop: 0, paddingBottom: 40 })
, SAND_BG);

// --- le spot : quatre puces, comme l'espagnol. La quatrieme (le vide) est
//     celle qui parle a quelqu'un qui kite a Fehmarn ou sur la Baltique.
const spot = section(
  image(IMG.spot, 'Kitekurs in der Lagune von Bilene', { width: 596, paddingX: 32, radius: 8, paddingBottom: 28 }) +
  text(eyebrow('Der Spot', OCEAN, 'left'), { paddingTop: 4, paddingBottom: 10 }) +
  text(h('Flachwasser und jede Menge Platz', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 6 }) +
  text(bullets([
    '<strong>Kilometerweit Stehrevier, rund einen Meter tief.</strong> Einsteiger haben Boden unter den Füßen und holen ihr Board ohne Stress zurück, alle anderen haben Flachwasser bis zum Horizont.',
    '<strong>Keine Gezeiten, keine Korallen, kein Shorebreak.</strong> Rein ins Wasser und los.',
    '<strong>Wind an neun von zehn Tagen</strong>, thermisch und konstant, von September bis März.',
    '<strong>Höchstens zwölf Kiter auf dem Wasser.</strong> Das ist unser Rekord, nicht unser Durchschnitt.',
  ]), { paddingTop: 0, paddingBottom: 14 }) +
  text(p('Deinen Neo kannst du zu Hause lassen.', { align: 'left', size: 16, color: MUTED, lh: 1.5 }), { paddingTop: 0, paddingBottom: 36 })
, '#ffffff');

// --- l'hebergement
const maison = section(
  image(IMG.maison, 'Die Häuser des Centers an der Lagune', { width: 596, paddingX: 32, radius: 8, paddingBottom: 28 }) +
  text(eyebrow('Die Unterkunft', OCEAN, 'left'), { paddingTop: 4, paddingBottom: 10 }) +
  text(h('Vom Sofa ins Wasser:<br />dreißig Sekunden', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 12 }) +
  text(p('Eigene Häuser direkt an der Lagune. Wir haben es gestoppt: dreißig Sekunden in Flip-Flops, zweiundzwanzig im Laufschritt.',
    { align: 'left', color: MUTED }), { paddingTop: 0, paddingBottom: 36 })
, SAND_BG);

// --- le groupe : les soirees. Le centre a son propre bloc juste apres.
const groupe = section(
  image(IMG.tablee, 'Gemeinsames Abendessen im Center', { width: 596, paddingX: 32, radius: 8, paddingBottom: 28 }) +
  text(eyebrow('Die Gruppe', OCEAN, 'left'), { paddingTop: 4, paddingBottom: 10 }) +
  text(h('Abends sitzen alle<br />an einem Tisch', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 12 }) +
  text(p('Um die Abendplanung musst du dich nicht kümmern: Das Team vom Bilene Kite Center hat jeden Abend etwas anderes vor. Restaurants vor Ort, Grillabende am Strand …',
    { align: 'left', color: MUTED }), { paddingTop: 0, paddingBottom: 36 })
, '#ffffff');

// --- l'experience du centre : le bloc ecrit par Teresa pour le mail ES,
//     repris ici sur le fond. L'argument "on monte et on range ton materiel"
//     n'existe dans aucun centre en Allemagne : c'est lui qui doit rester.
const erfahrung = section(
  text(eyebrow('Das Center', OCEAN, 'left'), { paddingTop: 44, paddingBottom: 10 }) +
  text(h('Profitier von unserer Erfahrung', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 14 }) +
  text(bullets([
    'Wir sind seit <strong>sieben Jahren in Bilene</strong> und wissen, was jeder auf seinem Level braucht.',
    'Unterricht gibt’s bei <strong>IKO-zertifizierten Kitelehrern</strong>.',
    'Im Center ist alles da: Materiallager, Duschen und Helfer, die <strong>dein Material aufbauen und wieder einlagern</strong>.',
  ]), { paddingTop: 0, paddingBottom: 14 }) +
  text(p('Ja, richtig gelesen: Hier baust du weder auf noch ab. Das übernehmen wir – mit genauso viel Sorgfalt, wie du sie deinem eigenen Material gibst.',
    { align: 'left', size: 16, color: MUTED, lh: 1.5 }), { paddingTop: 0, paddingBottom: 40 })
, SAND_BG);

// --- le programme : le coeur du mail, volontairement court.
//     Le detail des paliers est sur la page, pas ici.
const programme = section(
  text(eyebrow('Das Gruppenprogramm', SAND), { paddingTop: 46, paddingBottom: 14 }) +
  text(h('Du stellst die Gruppe zusammen.<br />Deinen Aufenthalt übernehmen wir.', { level: 2, color: '#ffffff', size: 32 }), { paddingTop: 0, paddingBottom: 16 }) +
  text(p('Kommen <strong style="color:#ffffff;">drei Leute</strong> mit, kostet dich dein Aufenthalt nichts: Unterkunft, Transfers und Materiallager inklusive. Ab zehn Leuten beteiligen wir uns auch an deinem Flug.',
    { align: 'center', size: 18, color: '#c8d4e2', lh: 1.6 }), { paddingTop: 0, paddingBottom: 10 }) +
  button('PROGRAMM ANSEHEN', URLS.ambass, { bg: '#ffffff', fg: NAVY, paddingTop: 14, paddingBottom: 10 }) +
  text(p('Die Staffelung im Detail findest du auf der Seite. Flug und Visum sind nicht inklusive.',
    { align: 'center', size: 13, color: '#8fa3b8' }), { paddingTop: 0, paddingBottom: 46 })
, NAVY);

// --- les jours sans vent (l'argument "accompagnants")
const activites = section(
  text(eyebrow('Die Tage ohne Wind'), { paddingTop: 44, paddingBottom: 12 }) +
  text(h('Sind selten. Einen Plan haben wir trotzdem.', { level: 2, size: 28 }), { paddingTop: 0, paddingBottom: 14 }) +
  text(p('Für alle, die mitkommen, ohne zu kiten – und damit niemand die Woche am Handy verbringt.',
    { align: 'center', color: MUTED, size: 17 }), { paddingTop: 0, paddingBottom: 26 })
, SAND_BG) +
  '<tr><td style="background-color:' + SAND_BG + '" valign="top" align="center" class="mceLayoutContainer">' +
  '<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" style="max-width:660px" class="mceWidthContainer"><tbody>' +
  columns([
    photoCard(IMG.reserves, 'Safari', 'Elefanten und Wildreservate im südlichen Afrika, zwei Autostunden entfernt.'),
    photoCard(IMG.braai, 'Braai am Strand', 'Grillen auf südafrikanische Art, bei Sonnenuntergang in den Dünen.'),
    photoCard(IMG.paddle, 'SUP', 'Auf Flüssen und Lagunen rund um Bilene.'),
  ], { gap: 10 }) +
  '</tbody></table></td></tr>' +
  section(
    text(p('<a href="' + URLS.activites + '" target="_blank" style="color:' + OCEAN + ';text-decoration:underline;font-weight:bold;">Alle Aktivitäten auf unserer Website (auf Englisch)</a>',
      { align: 'center', size: 15 }), { paddingTop: 20, paddingBottom: 44 })
  , SAND_BG);

// --- qui on est
//     Personne ne parle allemand au centre : c'est Guillaume qui repond. On
//     dit donc ce qu'on accepte de lire, pas dans quelle langue on repondra.
const equipe = section(
  divider() +
  // rectangle arrondi, pas un cercle : la photo n'est pas carree, un
  // border-radius de 50% en ferait un ovale et couperait les tetes.
  image(IMG.equipe, 'Teresa, Pereira und Guillaume', { width: 260, paddingX: 32, paddingTop: 26, paddingBottom: 18, radius: 8 }) +
  text(h('Wer wir sind', { level: 2, size: 24 }), { paddingTop: 0, paddingBottom: 10 }) +
  text(p('Teresa, Pereira und Guillaume. Drei Kite-Verrückte, die ihr Center dort aufgebaut haben, wo der Spot es verdient hat. Schreib uns gern auf Deutsch oder Englisch.',
    { align: 'center', color: MUTED, size: 16 }), { paddingTop: 0, paddingBottom: 8 }) +
  text(p('<a href="' + URLS.videoArrivee + '" target="_blank" style="color:' + OCEAN + ';text-decoration:underline;">Unsere Ankunft in Mosambik im Video</a>',
    { align: 'center', size: 15 }), { paddingTop: 0, paddingBottom: 36 })
, '#ffffff');

// --- CTA final : vers le bloc contact de la page allemande (texte en
//     allemand + formulaire), pas vers la page contact anglaise.
const cta = section(
  text(h('Erzähl uns von deiner Gruppe', { level: 2, color: '#ffffff', size: 28 }), { paddingTop: 44, paddingBottom: 12 }) +
  text(p('Sag uns, wie viele ihr seid und wann ihr kommen wollt – wir schicken dir ein Programm und einen Preis, die zu deiner Gruppe passen.',
    { align: 'center', size: 17, color: '#d6e6f7', lh: 1.6 }), { paddingTop: 0, paddingBottom: 10 }) +
  button('SCHREIB UNS', URLS.contact, { bg: '#ffffff', fg: OCEAN, paddingTop: 14, paddingBottom: 12 }) +
  text(p('<a href="mailto:contact@bilenekite.com" style="color:#ffffff;text-decoration:underline;">contact@bilenekite.com</a>' +
    '<span style="color:#8ec2f0;">&nbsp;&nbsp;·&nbsp;&nbsp;</span>' +
    '<a href="' + URLS.whatsapp + '" target="_blank" style="color:#ffffff;text-decoration:underline;">WhatsApp</a>',
    { align: 'center', size: 15, color: '#ffffff' }), { paddingTop: 0, paddingBottom: 46 })
, OCEAN);

// --- pied de page : navy, donc logo et icones en version claire
const footer = section(
  image(IMG.logo, 'Bilene Kite Center', { width: 150, paddingTop: 34, paddingBottom: 18, href: URLS.home }) +
  '<tr><td align="center" style="padding-bottom:20px;"><table border="0" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr>' +
  socialIcon('facebook', URLS.facebook) +
  socialIcon('instagram', URLS.instagram) +
  socialIcon('website', URLS.home) +
  '</tr></tbody></table></td></tr>' +
  text(p('Bilene Kite Center<br />P796+23 Praia Do Bilene<br />Inhambane, 1303 – Mosambik<br />' +
    '<a href="' + URLS.maps + '" target="_blank" style="color:#8fa3b8;text-decoration:underline;">Auf der Karte ansehen</a>',
    { align: 'center', size: 13, color: '#8fa3b8', lh: 1.7 }), { paddingTop: 0, paddingBottom: 18 }) +
  text(p('Du bekommst diese E-Mail, weil deine Kiteschule oder dein Verein in unserem Verzeichnis von Kiteschulen und Vereinen steht.<br />' +
    '<a href="' + TAG_UNSUB + '" style="color:#7d8ea3;text-decoration:underline;">Mit einem Klick abmelden</a>.',
    { align: 'center', size: 11, color: '#6b7c8f', lh: 1.6 }), { paddingTop: 0, paddingBottom: 34 })
, NAVY);

// ---------------------------------------------------------------- assembly
const body = wrapBody([header, hero, spot, maison, groupe, erfahrung, programme, activites, equipe, cta, footer]);

fs.writeFileSync(OUT, head + body, 'utf8');
console.log('ecrit : ' + OUT + ' (' + (fs.statSync(OUT).size / 1024).toFixed(1) + ' Ko)');
