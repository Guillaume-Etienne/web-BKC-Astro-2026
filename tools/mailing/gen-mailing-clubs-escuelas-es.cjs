// ============================================================================
//  MAILING CLUBS & ECOLES DE KITE — ESPAGNE
//  ---------------------------------------------------------------------------
//  ATTENTION : ce n'est PAS la traduction du mail francais.
//
//  La v1 (20/09/2026) l'etait, et Teresa l'a rejetee : calques du francais
//  ("personas traidas" pour "personnes amenees", "tu estructura" pour parler
//  d'une ecole), espaces insecables avant les deux-points — une regle de
//  typographie francaise qui n'existe pas en espagnol et qui signe une
//  traduction des la premiere ligne — et des phrases trop longues pour le ton
//  commercial espagnol.
//
//  v2 (21/09/2026) : texte ecrit directement en espagnol a partir des memes
//  FAITS (15 km de lagune, 1 m de fond, vent 9 jours sur 10, 12 kiters au
//  maximum, les paliers du programme). Les faits et la structure sont ceux du
//  mail francais ; pas une phrase n'en est traduite.
//
//  v3 (21/09/2026) : passee par Teresa, qui a corrige sept endroits et ECRIT
//  elle-meme le bloc "Aprovechate de nuestra experiencia" — d'ou un 11e bloc
//  que le mail francais n'a pas. Ses mots sont conserves tels quels, seule la
//  ponctuation a ete remise d'aplomb. Le bloc "El grupo" ne parle plus du
//  centre mais des soirees : le centre a son bloc maintenant.
//
//  Ce que ca change, a garder en tete si quelqu'un "corrige" le texte :
//    - pas d'espace avant : ; ? ! — et les ¿ ¡ ouvrants sont obligatoires ;
//    - on s'adresse au gerant en "tu" et a son groupe en "vosotros", jamais
//      l'inverse au milieu d'une phrase ;
//    - le centre ne "storage" pas, il "guarda el material" ;
//    - l'argument qui parle a un Espagnol n'est pas le lagon (ils ont Tarifa,
//      ils connaissent) mais le VIDE : douze kiters au maximum sur l'eau.
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
const TITLE = 'Bilene, Mozambique: 15 km de agua plana y doce kiters como mucho';

const head = buildHead(TITLE);

// ---------------------------------------------------------------- contenu
// APERCU DU TEXTE -> a saisir dans Brevo, pas ici :
//   Viento nueve días de cada diez, de septiembre a marzo. Y si montas tú
//   el grupo, tu plaza te sale gratis.
// Volontairement absent du HTML : Brevo injecte son propre preheader cache a
// l'envoi, un second ferait doublon dans la boite de reception.

// --- entete : le logo est blanc + vert, il lui faut ce fond sombre
const header = section(
  image(IMG.logo, 'Bilene Kite Center', { width: 200, paddingTop: 28, paddingBottom: 20, href: URLS.home }) +
  text(p('<a href="' + TAG_MIRROR + '" target="_blank" style="color:#7d8ea3;text-decoration:underline;">Ver este correo en el navegador</a>',
    { align: 'center', size: 11, color: '#7d8ea3' }), { paddingTop: 0, paddingBottom: 18 })
, NAVY);

// --- hero : la photo qui vend, cliquable vers la video du spot
const hero = section(
  image(IMG.hero, 'La laguna de Bilene desde el aire', { href: URLS.videoSpot }) +
  text(eyebrow('Para escuelas y clubes de kite'), { paddingTop: 36, paddingBottom: 12 }) +
  text(h('El viaje del que tu club<br />seguirá hablando durante diez años', { size: 34 }), { paddingTop: 0, paddingBottom: 16 }) +
  text(p('Bilene, Mozambique. Una laguna cerrada de 15 km, agua cálida y viento de septiembre a marzo. Si montas tú el grupo, <strong>tu plaza te sale gratis</strong>.',
    { align: 'center', size: 18, color: MUTED, lh: 1.6 }), { paddingTop: 0, paddingBottom: 40 })
, SAND_BG);

// --- le spot : pour un Espagnol, l'argument n'est pas le plan d'eau (Tarifa
//     existe) mais le fait qu'il n'y ait personne dessus.
const spot = section(
  image(IMG.spot, 'Clase de kite en la laguna de Bilene', { width: 596, paddingX: 32, radius: 8, paddingBottom: 28 }) +
  text(eyebrow('El spot', OCEAN, 'left'), { paddingTop: 4, paddingBottom: 10 }) +
  text(h('Agua plana y sitio de sobra', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 6 }) +
  text(bullets([
    '<strong>Un metro de profundidad durante kilómetros.</strong> Los que empiezan hacen pie y es súper fácil recuperar la tabla; los que ya navegan disfrutan de agua plana y kilómetros para explorar.',
    '<strong>Ni mareas, ni corales, ni orilla que sortear.</strong> Montas, entras y navegas.',
    '<strong>Viento nueve días de cada diez</strong>, térmico y constante, de septiembre a marzo.',
    '<strong>Doce kiters en el agua como mucho.</strong> Es nuestro récord de gente, no nuestra media.',
  ]), { paddingTop: 0, paddingBottom: 14 }) +
  text(p('El neopreno puedes dejarlo en casa.', { align: 'left', size: 16, color: MUTED, lh: 1.5 }), { paddingTop: 0, paddingBottom: 36 })
, '#ffffff');

// --- l'hebergement
const maison = section(
  image(IMG.maison, 'Casas del centro frente a la laguna', { width: 596, paddingX: 32, radius: 8, paddingBottom: 28 }) +
  text(eyebrow('El alojamiento', OCEAN, 'left'), { paddingTop: 4, paddingBottom: 10 }) +
  text(h('Del sofá al agua, treinta segundos', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 12 }) +
  text(p('Casas privadas mirando a la laguna. Lo hemos cronometrado: treinta segundos en chanclas, veintidós si vas corriendo.',
    { align: 'left', color: MUTED }), { paddingTop: 0, paddingBottom: 36 })
, SAND_BG);

// --- le groupe
const groupe = section(
  image(IMG.tablee, 'Cena de grupo en el centro', { width: 596, paddingX: 32, radius: 8, paddingBottom: 28 }) +
  text(eyebrow('El grupo', OCEAN, 'left'), { paddingTop: 4, paddingBottom: 10 }) +
  text(h('Por la noche, todos<br />a la misma mesa', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 12 }) +
  text(p('No te preocupes por organizar la logística: el equipo de Bilene Kite Center propone un plan distinto cada noche. Restaurantes locales, barbacoas…',
    { align: 'left', color: MUTED }), { paddingTop: 0, paddingBottom: 36 })
, '#ffffff');

// --- l'experience du centre : bloc ecrit par Teresa (21/09/2026), absent du
//     mail francais. Il porte l'argument que personne n'avait encore mis par
//     ecrit : ici, le materiel, on le monte et on le range pour vous.
//     Volontairement sans photo — les neuf images du mail sont deja prises,
//     et le mail est assez long comme ca.
const experiencia = section(
  text(eyebrow('El centro', OCEAN, 'left'), { paddingTop: 44, paddingBottom: 10 }) +
  text(h('Aprovéchate de nuestra experiencia', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 14 }) +
  text(bullets([
    'Llevamos <strong>7 años en Bilene</strong>, así que sabemos qué necesita cada persona según su nivel de kitesurf.',
    'Contamos con <strong>instructores titulados IKO</strong>.',
    'El centro tiene todo lo necesario: almacén para el material, duchas y asistentes que <strong>montan y guardan tu equipo</strong>.',
  ]), { paddingTop: 0, paddingBottom: 14 }) +
  text(p('Sí, has leído bien: aquí no montas ni recoges. Lo hacemos nosotros, con el mismo mimo que le das tú a tu material.',
    { align: 'left', size: 16, color: MUTED, lh: 1.5 }), { paddingTop: 0, paddingBottom: 40 })
, SAND_BG);

// --- le programme ambassadeurs : le coeur du mail, volontairement court.
//     Le detail des paliers est sur la page, pas ici.
const programme = section(
  text(eyebrow('El programa de embajadores', SAND), { paddingTop: 46, paddingBottom: 14 }) +
  text(h('Tú montas el grupo.<br />Tu viaje lo ponemos nosotros.', { level: 2, color: '#ffffff', size: 32 }), { paddingTop: 0, paddingBottom: 16 }) +
  text(p('Con <strong style="color:#ffffff;">tres personas</strong> que se apunten contigo, tu estancia no te cuesta nada: alojamiento, traslados y el material guardado. A partir de diez, ponemos también una parte del billete de avión.',
    { align: 'center', size: 18, color: '#c8d4e2', lh: 1.6 }), { paddingTop: 0, paddingBottom: 10 }) +
  button('VER EL PROGRAMA', URLS.ambass, { bg: '#ffffff', fg: NAVY, paddingTop: 14, paddingBottom: 10 }) +
  text(p('Los tramos, detallados en la web. Vuelos y visados aparte.',
    { align: 'center', size: 13, color: '#8fa3b8' }), { paddingTop: 0, paddingBottom: 46 })
, NAVY);

// --- les jours sans vent (l'argument "accompagnants")
const activites = section(
  text(eyebrow('Los días sin viento'), { paddingTop: 44, paddingBottom: 12 }) +
  text(h('Son pocos. Aun así, hay plan.', { level: 2, size: 28 }), { paddingTop: 0, paddingBottom: 14 }) +
  text(p('Para los que os acompañan sin navegar, y para que nadie pase la semana mirando el móvil.',
    { align: 'center', color: MUTED, size: 17 }), { paddingTop: 0, paddingBottom: 26 })
, SAND_BG) +
  '<tr><td style="background-color:' + SAND_BG + '" valign="top" align="center" class="mceLayoutContainer">' +
  '<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" style="max-width:660px" class="mceWidthContainer"><tbody>' +
  columns([
    photoCard(IMG.reserves, 'Safari', 'Elefantes y reservas del sur de África, a dos horas en coche.'),
    photoCard(IMG.braai, 'Braai en la playa', 'La barbacoa sudafricana, al atardecer, entre las dunas.'),
    photoCard(IMG.paddle, 'Paddle', 'Los ríos y lagunas de alrededor, a golpe de remo.'),
  ], { gap: 10 }) +
  '</tbody></table></td></tr>' +
  section(
    text(p('<a href="' + URLS.activites + '" target="_blank" style="color:' + OCEAN + ';text-decoration:underline;font-weight:bold;">Todas las actividades, en la web</a>',
      { align: 'center', size: 15 }), { paddingTop: 20, paddingBottom: 44 })
  , SAND_BG);

// --- qui on est
//     Teresa est espagnole : le dire ici leve le seul frein que le mail
//     francais n'avait pas a lever.
const equipe = section(
  divider() +
  // rectangle arrondi, pas un cercle : la photo n'est pas carree, un
  // border-radius de 50% en ferait un ovale et couperait les tetes.
  image(IMG.equipe, 'Teresa, Pereira y Guillaume', { width: 260, paddingX: 32, paddingTop: 26, paddingBottom: 18, radius: 8 }) +
  text(h('Quiénes somos', { level: 2, size: 24 }), { paddingTop: 0, paddingBottom: 10 }) +
  text(p('Teresa, Pereira y Guillaume. Tres enganchados al kite que se fueron a montar un centro donde el spot lo pedía. <strong>Teresa es española</strong>, así que escríbenos en castellano sin problema.',
    { align: 'center', color: MUTED, size: 16 }), { paddingTop: 0, paddingBottom: 8 }) +
  text(p('<a href="' + URLS.videoArrivee + '" target="_blank" style="color:' + OCEAN + ';text-decoration:underline;">Nuestra llegada a Mozambique, en vídeo</a>',
    { align: 'center', size: 15 }), { paddingTop: 0, paddingBottom: 36 })
, '#ffffff');

// --- CTA final
const cta = section(
  text(h('Cuéntanos qué grupo tienes en mente', { level: 2, color: '#ffffff', size: 28 }), { paddingTop: 44, paddingBottom: 12 }) +
  text(p('Dinos cuántos sois y cuándo queréis venir, y te mandamos programa y precio a la medida de tu club.',
    { align: 'center', size: 17, color: '#d6e6f7', lh: 1.6 }), { paddingTop: 0, paddingBottom: 10 }) +
  button('ESCRÍBENOS', URLS.contact, { bg: '#ffffff', fg: OCEAN, paddingTop: 14, paddingBottom: 12 }) +
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
  text(p('Recibes este correo porque tu escuela o tu club aparece en nuestro directorio de centros de kite.<br />' +
    '<a href="' + TAG_UNSUB + '" style="color:#7d8ea3;text-decoration:underline;">Darte de baja en un clic</a>.',
    { align: 'center', size: 11, color: '#6b7c8f', lh: 1.6 }), { paddingTop: 0, paddingBottom: 34 })
, NAVY);

// ---------------------------------------------------------------- assembly
const body = wrapBody([header, hero, spot, maison, groupe, experiencia, programme, activites, equipe, cta, footer]);

fs.writeFileSync(OUT, head + body, 'utf8');
console.log('ecrit : ' + OUT + ' (' + (fs.statSync(OUT).size / 1024).toFixed(1) + ' Ko)');
