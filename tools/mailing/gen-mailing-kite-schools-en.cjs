// ============================================================================
//  MAILING KITE SCHOOLS & CLUBS — ANGLAIS
//  ---------------------------------------------------------------------------
//  ATTENTION : ce n'est PAS la traduction du mail francais. Meme lecon que
//  l'espagnol (v1 traduite, rejetee par Teresa le 21/09/2026) : le texte est
//  ecrit directement en anglais a partir des FAITS du mail FR (15 km de
//  lagune, 1 m de fond, vent 9 jours sur 10, 12 kiters au maximum, paliers du
//  programme) et reprend le bloc "experience du centre" ecrit par Teresa pour
//  le mail ES. Structure en 11 blocs, comme l'espagnol et l'allemand.
//
//  A garder si quelqu'un "corrige" le texte :
//    - pas d'"ambassador" : en anglais c'est un rider sponsorise par une
//      marque. L'offre s'appelle "Bring Your Crew", comme la page
//      /en/bring-your-crew/ — le mail et la page parlent la meme langue ;
//    - les mots des ecoles : kit, hire, rig / de-rig, flat water, standing
//      depth, shore break, boardies ;
//    - "your trip is on us" plutot que "free" (filtres anti-spam, et c'est
//      comme ca qu'on le dit) ;
//    - orthographe britannique (organise, kilometres, centre) ; "Kite Center"
//      reste tel quel, c'est le nom propre.
//
//  Generation : node tools/mailing/gen-mailing-kite-schools-en.cjs
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

const URLS = urlsFor('en');

const OUT = path.join(__dirname, 'mailing-kite-schools-en.html');

// Objet de la campagne, a saisir a l'identique dans Brevo. Le <title> n'est pas
// l'objet de l'e-mail : il sert a la version "voir dans le navigateur".
// Pas de "free" dans l'objet (filtres anti-spam) : c'est l'apercu qui le dit.
const TITLE = 'Bilene, Mozambique: 15 km of flat water and never more than twelve kiters';

const head = buildHead(TITLE);

// ---------------------------------------------------------------- contenu
// APERCU DU TEXTE -> a saisir dans Brevo, pas ici :
//   Wind nine days out of ten, September to March. And if you get the group
//   together, your trip is on us.
// Volontairement absent du HTML : Brevo injecte son propre preheader cache a
// l'envoi, un second ferait doublon dans la boite de reception.

// --- entete : le logo est blanc + vert, il lui faut ce fond sombre
const header = section(
  image(IMG.logo, 'Bilene Kite Center', { width: 200, paddingTop: 28, paddingBottom: 20, href: URLS.home }) +
  text(p('<a href="' + TAG_MIRROR + '" target="_blank" style="color:#7d8ea3;text-decoration:underline;">View this email in your browser</a>',
    { align: 'center', size: 11, color: '#7d8ea3' }), { paddingTop: 0, paddingBottom: 18 })
, NAVY);

// --- hero : la photo qui vend, cliquable vers la video du spot
const hero = section(
  image(IMG.hero, 'The Bilene lagoon from the air', { href: URLS.videoSpot }) +
  text(eyebrow('For kite schools and clubs'), { paddingTop: 36, paddingBottom: 12 }) +
  text(h('The kite trip your crew<br />will still be talking about in ten years', { size: 34 }), { paddingTop: 0, paddingBottom: 16 }) +
  text(p('Bilene, Mozambique. A 15&nbsp;km enclosed lagoon, warm water and wind from September to March. And if you get the group together, <strong>your trip is on us</strong>.',
    { align: 'center', size: 18, color: MUTED, lh: 1.6 }), { paddingTop: 0, paddingBottom: 40 })
, SAND_BG);

// --- le spot : quatre puces. La quatrieme (le vide) parle a tous ceux qui
//     partagent un spot bonde le week-end.
const spot = section(
  image(IMG.spot, 'Kite lesson on the Bilene lagoon', { width: 596, paddingX: 32, radius: 8, paddingBottom: 28 }) +
  text(eyebrow('The spot', OCEAN, 'left'), { paddingTop: 4, paddingBottom: 10 }) +
  text(h('Flat water, and room to breathe', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 6 }) +
  text(bullets([
    '<strong>Kilometres of standing-depth water, about a metre deep.</strong> Beginners can stand up and walk back to their board, everyone else gets flat water all the way to the horizon.',
    '<strong>No tides, no reef, no shore break.</strong> Walk in and go.',
    '<strong>Wind nine days out of ten</strong>, steady thermals from September to March.',
    '<strong>Never more than twelve kiters on the water.</strong> That’s our record, not our average.',
  ]), { paddingTop: 0, paddingBottom: 14 }) +
  text(p('Leave the wetsuit at home. Boardies will do.', { align: 'left', size: 16, color: MUTED, lh: 1.5 }), { paddingTop: 0, paddingBottom: 36 })
, '#ffffff');

// --- l'hebergement
const maison = section(
  image(IMG.maison, 'The centre’s houses on the lagoon', { width: 596, paddingX: 32, radius: 8, paddingBottom: 28 }) +
  text(eyebrow('Where you stay', OCEAN, 'left'), { paddingTop: 4, paddingBottom: 10 }) +
  text(h('From the sofa to the water:<br />thirty seconds', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 12 }) +
  text(p('Our own houses, right on the lagoon. We timed it: thirty seconds in flip-flops, twenty-two if you run.',
    { align: 'left', color: MUTED }), { paddingTop: 0, paddingBottom: 36 })
, SAND_BG);

// --- le groupe : les soirees. Le centre a son propre bloc juste apres.
const groupe = section(
  image(IMG.tablee, 'Group dinner at the centre', { width: 596, paddingX: 32, radius: 8, paddingBottom: 28 }) +
  text(eyebrow('The group', OCEAN, 'left'), { paddingTop: 4, paddingBottom: 10 }) +
  text(h('Everyone round<br />the same table at night', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 12 }) +
  text(p('You don’t have to plan the evenings: the Bilene Kite Center team has something different lined up every night. Local restaurants, braais on the beach…',
    { align: 'left', color: MUTED }), { paddingTop: 0, paddingBottom: 36 })
, '#ffffff');

// --- l'experience du centre : le bloc ecrit par Teresa pour le mail ES,
//     repris ici sur le fond. "We rig, you ride" est l'argument qu'aucune
//     ecole ne peut offrir chez elle : c'est lui qui doit rester.
const experience = section(
  text(eyebrow('The centre', OCEAN, 'left'), { paddingTop: 44, paddingBottom: 10 }) +
  text(h('Seven years of knowing this spot', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 14 }) +
  text(bullets([
    'We’ve been in Bilene for <strong>seven years</strong>, and we know what each rider needs at every level.',
    'Lessons are run by <strong>IKO-certified instructors</strong>.',
    'Everything’s on site: kit storage, showers, and a beach crew who <strong>rig your kit and put it away for you</strong>.',
  ]), { paddingTop: 0, paddingBottom: 14 }) +
  text(p('Yes, you read that right: no rigging, no de-rigging. We do it – with the same care you’d give your own kit.',
    { align: 'left', size: 16, color: MUTED, lh: 1.5 }), { paddingTop: 0, paddingBottom: 40 })
, SAND_BG);

// --- le programme : le coeur du mail, volontairement court.
//     Le detail des paliers est sur la page, pas ici.
const programme = section(
  text(eyebrow('Bring your crew', SAND), { paddingTop: 46, paddingBottom: 14 }) +
  text(h('You get the group together.<br />We cover your trip.', { level: 2, color: '#ffffff', size: 32 }), { paddingTop: 0, paddingBottom: 16 }) +
  text(p('Bring <strong style="color:#ffffff;">three people</strong> and your stay costs you nothing: accommodation, transfers and kit storage included. Bring ten or more and we’ll chip in on your flight too.',
    { align: 'center', size: 18, color: '#c8d4e2', lh: 1.6 }), { paddingTop: 0, paddingBottom: 10 }) +
  button('SEE HOW IT WORKS', URLS.ambass, { bg: '#ffffff', fg: NAVY, paddingTop: 14, paddingBottom: 10 }) +
  text(p('The full breakdown is on the page. Flights and visa not included.',
    { align: 'center', size: 13, color: '#8fa3b8' }), { paddingTop: 0, paddingBottom: 46 })
, NAVY);

// --- les jours sans vent (l'argument "accompagnants")
const activites = section(
  text(eyebrow('No-wind days'), { paddingTop: 44, paddingBottom: 12 }) +
  text(h('They’re rare. We’ve got a plan anyway.', { level: 2, size: 28 }), { paddingTop: 0, paddingBottom: 14 }) +
  text(p('For the friends and partners who come along without kiting – and so nobody spends the week on their phone.',
    { align: 'center', color: MUTED, size: 17 }), { paddingTop: 0, paddingBottom: 26 })
, SAND_BG) +
  '<tr><td style="background-color:' + SAND_BG + '" valign="top" align="center" class="mceLayoutContainer">' +
  '<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" style="max-width:660px" class="mceWidthContainer"><tbody>' +
  columns([
    photoCard(IMG.reserves, 'Safari', 'Elephants and game reserves, two hours’ drive away.'),
    photoCard(IMG.braai, 'Beach braai', 'A proper southern African barbecue at sunset in the dunes.'),
    photoCard(IMG.paddle, 'SUP', 'On the rivers and lagoons around Bilene.'),
  ], { gap: 10 }) +
  '</tbody></table></td></tr>' +
  section(
    text(p('<a href="' + URLS.activites + '" target="_blank" style="color:' + OCEAN + ';text-decoration:underline;font-weight:bold;">See everything there is to do</a>',
      { align: 'center', size: 15 }), { paddingTop: 20, paddingBottom: 44 })
  , SAND_BG);

// --- qui on est
const equipe = section(
  divider() +
  // rectangle arrondi, pas un cercle : la photo n'est pas carree, un
  // border-radius de 50% en ferait un ovale et couperait les tetes.
  image(IMG.equipe, 'Teresa, Pereira and Guillaume', { width: 260, paddingX: 32, paddingTop: 26, paddingBottom: 18, radius: 8 }) +
  text(h('Who we are', { level: 2, size: 24 }), { paddingTop: 0, paddingBottom: 10 }) +
  text(p('Teresa, Pereira and Guillaume. Three kite addicts who built their centre where the spot deserved one.',
    { align: 'center', color: MUTED, size: 16 }), { paddingTop: 0, paddingBottom: 8 }) +
  text(p('<a href="' + URLS.videoArrivee + '" target="_blank" style="color:' + OCEAN + ';text-decoration:underline;">Watch how we landed in Mozambique</a>',
    { align: 'center', size: 15 }), { paddingTop: 0, paddingBottom: 36 })
, '#ffffff');

// --- CTA final : vers le bloc contact de la page (offre + formulaire)
const cta = section(
  text(h('Tell us about your crew', { level: 2, color: '#ffffff', size: 28 }), { paddingTop: 44, paddingBottom: 12 }) +
  text(p('Tell us how many of you there are and when you’d like to come – we’ll send you a plan and a price built around your group.',
    { align: 'center', size: 17, color: '#d6e6f7', lh: 1.6 }), { paddingTop: 0, paddingBottom: 10 }) +
  button('GET IN TOUCH', URLS.contact, { bg: '#ffffff', fg: OCEAN, paddingTop: 14, paddingBottom: 12 }) +
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
  text(p('Bilene Kite Center<br />P796+23 Praia Do Bilene<br />Inhambane, 1303 – Mozambique<br />' +
    '<a href="' + URLS.maps + '" target="_blank" style="color:#8fa3b8;text-decoration:underline;">View on the map</a>',
    { align: 'center', size: 13, color: '#8fa3b8', lh: 1.7 }), { paddingTop: 0, paddingBottom: 18 }) +
  text(p('You’re receiving this email because your kite school or club is listed in our directory of kite schools and clubs.<br />' +
    '<a href="' + TAG_UNSUB + '" style="color:#7d8ea3;text-decoration:underline;">Unsubscribe in one click</a>.',
    { align: 'center', size: 11, color: '#6b7c8f', lh: 1.6 }), { paddingTop: 0, paddingBottom: 34 })
, NAVY);

// ---------------------------------------------------------------- assembly
const body = wrapBody([header, hero, spot, maison, groupe, experience, programme, activites, equipe, cta, footer]);

fs.writeFileSync(OUT, head + body, 'utf8');
console.log('ecrit : ' + OUT + ' (' + (fs.statSync(OUT).size / 1024).toFixed(1) + ' Ko)');
