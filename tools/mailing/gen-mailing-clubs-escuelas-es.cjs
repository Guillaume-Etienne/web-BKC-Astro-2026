// ============================================================================
//  MAILING CLUBS & ECOLES DE KITE — ESPAGNE (version ES du 1er mail)
//  ---------------------------------------------------------------------------
//  Transposition du mail francais parti le 28/08/2026 (gen-mailing.cjs) : meme
//  structure en 10 blocs, memes photos, meme angle "emmenez votre club kiter au
//  Mozambique" — decide le 20/09/2026, pour pouvoir comparer les resultats a
//  perimetre egal avec la campagne FR/CH/BE.
//
//  Ce qui change, et seulement ca :
//    - la langue, evidemment (relecture Teresa, hispanophone) ;
//    - les URL, qui pointent toutes vers la partie /es/ du site, y compris la
//      page du programme (urlsFor('es') dans lib.cjs) ;
//    - "Teresa es espanola" ajoute au bloc equipe : lever le frein de la langue
//      est l'argument que le mail francais n'avait pas a faire ;
//    - "le neopreme reste en France" -> en Espagne.
//
//  Cible : onglet "5. Espagne" de l'annuaire (168 lignes, 157 e-mails uniques),
//  a 30 % sur Tarifa, puis Canaries, Baleares, Levante et Catalogne.
//
//  Generation : node tools/mailing/gen-mailing-clubs-escuelas-es.cjs
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

const URLS = urlsFor('es');

const OUT = path.join(__dirname, 'mailing-clubs-escuelas-es.html');

// Objet de la campagne, a saisir a l'identique dans Brevo. Le <title> n'est pas
// l'objet de l'e-mail : il sert a la version "voir dans le navigateur".
const TITLE = 'Bilene, Mozambique: 15 km de laguna, 1 m de fondo, nadie en el agua';

const head = buildHead(TITLE);

// ---------------------------------------------------------------- contenu
// APERCU DU TEXTE -> a saisir dans Brevo, pas ici :
//   Viento 9 días de cada 10 de septiembre a marzo — y el viaje del
//   organizador es gratis.
// (comme en FR : il apporte une info que l'objet ne donne pas)
// Volontairement absent du HTML : Brevo injecte son propre preheader cache a
// l'envoi, un second ferait doublon dans la boite de reception.

// --- entete : le logo est blanc + vert, il lui faut ce fond sombre
const header = section(
  image(IMG.logo, 'Bilene Kite Center', { width: 200, paddingTop: 28, paddingBottom: 20, href: URLS.home }) +
  text(p('<a href="' + TAG_MIRROR + '" target="_blank" style="color:#7d8ea3;text-decoration:underline;">Ver este e-mail en tu navegador</a>',
    { align: 'center', size: 11, color: '#7d8ea3' }), { paddingTop: 0, paddingBottom: 18 })
, NAVY);

// --- hero : la photo qui vend, cliquable vers la video du spot
const hero = section(
  image(IMG.hero, 'La laguna de Bilene vista desde el cielo', { href: URLS.videoSpot }) +
  text(eyebrow('Para clubes y escuelas de kite'), { paddingTop: 36, paddingBottom: 12 }) +
  text(h('La salida de club de la que<br />hablarán durante diez años', { size: 34 }), { paddingTop: 0, paddingBottom: 16 }) +
  text(p('Bilene, Mozambique. Una laguna cerrada de 15 km, 1 m de fondo, viento de septiembre a marzo. Y si eres tú quien monta el grupo, <strong>tu viaje es gratis</strong>.',
    { align: 'center', size: 18, color: MUTED, lh: 1.6 }), { paddingTop: 0, paddingBottom: 40 })
, SAND_BG);

// --- le spot
const spot = section(
  image(IMG.spot, 'Clase de kite en la laguna de Bilene', { width: 596, paddingX: 32, radius: 8, paddingBottom: 28 }) +
  text(eyebrow('El spot', OCEAN, 'left'), { paddingTop: 4, paddingBottom: 10 }) +
  text(h('Una laguna solo para vosotros', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 6 }) +
  text(bullets([
    '<strong>1 m de fondo durante kilómetros.</strong> Vuestros principiantes hacen pie, vuestros avanzados tienen agua plana.',
    '<strong>Ni mareas, ni coral, ni shore break</strong> que negociar antes de salir a navegar.',
    '<strong>Viento 9 días de cada 10</strong> de septiembre a marzo, térmico y regular.',
  ]), { paddingTop: 0, paddingBottom: 14 }) +
  text(p('El neopreno os lo podéis dejar en España.', { align: 'left', size: 16, color: MUTED, lh: 1.5 }), { paddingTop: 0, paddingBottom: 36 })
, '#ffffff');

// --- l'hebergement
const maison = section(
  image(IMG.maison, 'Casas BKC frente a la laguna', { width: 596, paddingX: 32, radius: 8, paddingBottom: 28 }) +
  text(eyebrow('El alojamiento', OCEAN, 'left'), { paddingTop: 4, paddingBottom: 10 }) +
  text(h('Dormís con los pies en la arena', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 12 }) +
  text(p('Casas privadas frente a la laguna, a treinta segundos del spot. Lo hemos cronometrado : treinta segundos en chanclas, veintidós corriendo.',
    { align: 'left', color: MUTED }), { paddingTop: 0, paddingBottom: 36 })
, SAND_BG);

// --- le groupe
const groupe = section(
  image(IMG.tablee, 'Cena de grupo en el Bilene Kite Center', { width: 596, paddingX: 32, radius: 8, paddingBottom: 28 }) +
  text(eyebrow('El grupo', OCEAN, 'left'), { paddingTop: 4, paddingBottom: 10 }) +
  text(h('Y por la noche, todos<br />en la misma mesa', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 12 }) +
  text(p('El centro es vuestro : storage seguro, zona chill, duchas, instructores titulados IKO. Llevamos siete años recibiendo grupos — sabemos lo que es hacer navegar a doce personas de niveles distintos en la misma semana.',
    { align: 'left', color: MUTED }), { paddingTop: 0, paddingBottom: 36 })
, '#ffffff');

// --- le programme ambassadeurs : le coeur du mail, volontairement court.
//     Le detail des paliers est sur la page, pas ici.
const programme = section(
  text(eyebrow('El programa embajadores', SAND), { paddingTop: 46, paddingBottom: 14 }) +
  text(h('Tú montas el grupo.<br />Nosotros te invitamos al tuyo.', { level: 2, color: '#ffffff', size: 32 }), { paddingTop: 0, paddingBottom: 16 }) +
  text(p('A partir de <strong style="color:#ffffff;">3 personas traídas</strong>, tu estancia es gratis — alojamiento, traslados y storage incluidos. A partir de 10, participamos también en el billete de avión.',
    { align: 'center', size: 18, color: '#c8d4e2', lh: 1.6 }), { paddingTop: 0, paddingBottom: 10 }) +
  button('VER EL PROGRAMA', URLS.ambass, { bg: '#ffffff', fg: NAVY, paddingTop: 14, paddingBottom: 10 }) +
  text(p('El detalle de los niveles está en la web. Vuelos y visados no incluidos.',
    { align: 'center', size: 13, color: '#8fa3b8' }), { paddingTop: 0, paddingBottom: 46 })
, NAVY);

// --- les jours sans vent (l'argument "accompagnants")
const activites = section(
  text(eyebrow('Los días sin viento'), { paddingTop: 44, paddingBottom: 12 }) +
  text(h('Hay pocos. Aun así, están previstos.', { level: 2, size: 28 }), { paddingTop: 0, paddingBottom: 14 }) +
  text(p('Para entretener a quienes os acompañan sin navegar, y evitar que se pasen la semana mirando el móvil.',
    { align: 'center', color: MUTED, size: 17 }), { paddingTop: 0, paddingBottom: 26 })
, SAND_BG) +
  '<tr><td style="background-color:' + SAND_BG + '" valign="top" align="center" class="mceLayoutContainer">' +
  '<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" style="max-width:660px" class="mceWidthContainer"><tbody>' +
  columns([
    photoCard(IMG.reserves, 'Safari', 'Elefantes y reservas del África austral, a dos horas en coche.'),
    photoCard(IMG.braai, 'Braai en la playa', 'La barbacoa sudafricana, al atardecer, entre las dunas.'),
    photoCard(IMG.paddle, 'Paddle', 'Los ríos y lagunas de alrededor de Bilene, a remo.'),
  ], { gap: 10 }) +
  '</tbody></table></td></tr>' +
  section(
    text(p('<a href="' + URLS.activites + '" target="_blank" style="color:' + OCEAN + ';text-decoration:underline;font-weight:bold;">Todas las actividades en la web</a>',
      { align: 'center', size: 15 }), { paddingTop: 20, paddingBottom: 44 })
  , SAND_BG);

// --- qui on est
//     Ajout par rapport au mail FR : Teresa est espagnole. Dire qu'on repond en
//     castillan leve le seul frein que la version francaise n'avait pas.
const equipe = section(
  divider() +
  // rectangle arrondi, pas un cercle : la photo n'est pas carree, un
  // border-radius de 50% en ferait un ovale et couperait les tetes.
  image(IMG.equipe, 'Teresa, Pereira y Guillaume', { width: 260, paddingX: 32, paddingTop: 26, paddingBottom: 18, radius: 8 }) +
  text(h('Quién os recibe', { level: 2, size: 24 }), { paddingTop: 0, paddingBottom: 10 }) +
  text(p('Teresa, Pereira y Guillaume. Tres apasionados del kite que se fueron a montar un centro donde el spot lo merecía. <strong>Teresa es española</strong> : podéis escribirnos en castellano.',
    { align: 'center', color: MUTED, size: 16 }), { paddingTop: 0, paddingBottom: 8 }) +
  text(p('<a href="' + URLS.videoArrivee + '" target="_blank" style="color:' + OCEAN + ';text-decoration:underline;">Nuestra llegada a Mozambique, en vídeo</a>',
    { align: 'center', size: 15 }), { paddingTop: 0, paddingBottom: 36 })
, '#ffffff');

// --- CTA final
const cta = section(
  text(h('Hablemos de vuestro grupo', { level: 2, color: '#ffffff', size: 28 }), { paddingTop: 44, paddingBottom: 12 }) +
  text(p('Decidnos cuántos sois y en qué fechas queréis venir : os mandamos un programa y un precio adaptados a vuestro club.',
    { align: 'center', size: 17, color: '#d6e6f7', lh: 1.6 }), { paddingTop: 0, paddingBottom: 10 }) +
  button('CONTACTAR', URLS.contact, { bg: '#ffffff', fg: OCEAN, paddingTop: 14, paddingBottom: 12 }) +
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
  text(p('Bilene Kite Center<br />P796+23 Praia Do Bilene<br />Inhambane, 1303 — Mozambique<br />' +
    '<a href="' + URLS.maps + '" target="_blank" style="color:#8fa3b8;text-decoration:underline;">Ver en el mapa</a>',
    { align: 'center', size: 13, color: '#8fa3b8', lh: 1.7 }), { paddingTop: 0, paddingBottom: 18 }) +
  text(p('Recibes este e-mail porque tu estructura figura en nuestro directorio de clubes y escuelas de kite.<br />' +
    '<a href="' + TAG_UNSUB + '" style="color:#7d8ea3;text-decoration:underline;">Darte de baja en un clic</a>.',
    { align: 'center', size: 11, color: '#6b7c8f', lh: 1.6 }), { paddingTop: 0, paddingBottom: 34 })
, NAVY);

// ---------------------------------------------------------------- assembly
const body = wrapBody([header, hero, spot, maison, groupe, programme, activites, equipe, cta, footer]);

fs.writeFileSync(OUT, head + body, 'utf8');
console.log('ecrit : ' + OUT + ' (' + (fs.statSync(OUT).size / 1024).toFixed(1) + ' Ko)');
