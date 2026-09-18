// ============================================================================
//  Mailing FR de prospection : clubs & ecoles de kite francais
//  ---------------------------------------------------------------------------
//  v2 (27/08/2026) - reecriture complete. On repart du template Mailchimp de
//  Chris (SRC) dont on garde le <head> tel quel (styles responsive Mailchimp,
//  stacking .mceColumn en mobile, corrections Outlook), et on reecrit tout le
//  contenu.
//
//  Parti pris v2, apres retour de Guillaume sur la v1 :
//    - moins d'infos : le mail donne envie, le detail vit sur le site ;
//    - rythme aere : image pleine largeur / titre / paragraphe court, repete.
//      Pas de colonnes de texte (la v1 tombait a 164px par colonne, illisible) ;
//    - charte du site (_variables.scss) plutot que le bleu unique de Chris ;
//    - un peu d'humour, dose : 3 touches, jamais au detriment de l'info ;
//    - LOGO : il est blanc + vert, il lui FAUT un fond sombre. Pose sur du blanc
//      en v1, il ne restait que le swoosh vert -> bandeau navy en entete et en
//      pied. Meme logique pour les icones sociales Mailchimp : sur fond sombre
//      ce sont les variantes "-outline-light-40.png" (les "dark" seraient
//      invisibles).
//
//  28/08/2026 : les helpers, la palette, les images et les balises Brevo sont
//  passes dans lib.cjs, partages avec le generateur de la relance
//  (gen-relance-clubs-ecoles-fr.cjs). Ce fichier ne garde que le contenu de CE
//  mail ; la sortie est inchangee (verifiee par diff apres extraction).
//
//  Generation : node tools/mailing/gen-mailing.cjs
//  (.cjs et pas .js : le package.json du projet est en "type": "module")
// ============================================================================

const fs = require('fs');
const path = require('path');

// Briques de mise en page, palette, images et balises Brevo : partagees avec
// gen-relance-clubs-ecoles-fr.cjs.
const {
  IMG, URLS, TAG_MIRROR, TAG_UNSUB,
  SAND_BG, NAVY, OCEAN, SAND, MUTED,
  buildHead, wrapBody,
  button, image, text, p, h, eyebrow, bullets, divider, section, columns,
  photoCard, socialIcon,
} = require('./lib.cjs');

// Chemin relatif au dossier du script : le depot est clonable ailleurs.
const OUT = path.join(__dirname, 'mailing-clubs-ecoles-fr.html');

// Objet de la campagne, a saisir a l'identique dans Brevo. Le <title> n'est pas
// l'objet de l'e-mail : il sert a la version "voir dans le navigateur".
const TITLE = 'Bil\u00e8ne, Mozambique : 15 km de lagon, 1 m de fond, personne dessus';

const head = buildHead(TITLE);

// ---------------------------------------------------------------- contenu
// APERCU DU TEXTE -> a saisir dans Brevo, pas ici :
//   Du vent 9 jours sur 10 de septembre a mars — et le voyage de
//   l'organisateur est offert.
// (choisi pour apporter une info neuve : l'objet dit deja le lagon)
// Volontairement absent du HTML : Brevo injecte son propre preheader cache a
// l'envoi, un second ferait doublon dans la boite de reception.

// --- entete : le logo est blanc + vert, il lui faut ce fond sombre
const header = section(
  image(IMG.logo, 'Bilene Kite Center', { width: 200, paddingTop: 28, paddingBottom: 20, href: URLS.home }) +
  text(p('<a href="' + TAG_MIRROR + '" target="_blank" style="color:#7d8ea3;text-decoration:underline;">Affichez cet e-mail dans votre navigateur</a>',
    { align: 'center', size: 11, color: '#7d8ea3' }), { paddingTop: 0, paddingBottom: 18 })
, NAVY);

// --- hero : la photo qui vend, cliquable vers la video du spot
const hero = section(
  image(IMG.hero, 'Le lagon de Bilene vu du ciel', { href: URLS.videoSpot }) +
  text(eyebrow('Aux clubs &amp; \u00e9coles de kite'), { paddingTop: 36, paddingBottom: 12 }) +
  text(h('La sortie club dont ils vont<br />parler pendant dix ans', { size: 34 }), { paddingTop: 0, paddingBottom: 16 }) +
  text(p('Bil\u00e8ne, Mozambique. Un lagon ferm\u00e9 de 15\u00a0km, 1\u00a0m de fond, du vent de septembre \u00e0 mars. Et si c\u2019est vous qui montez le groupe, <strong>votre voyage est offert</strong>.',
    { align: 'center', size: 18, color: MUTED, lh: 1.6 }), { paddingTop: 0, paddingBottom: 40 })
, SAND_BG);

// --- le spot
const spot = section(
  image(IMG.spot, 'Cours de kite dans le lagon de Bilene', { width: 596, paddingX: 32, radius: 8, paddingBottom: 28 }) +
  text(eyebrow('Le spot', OCEAN, 'left'), { paddingTop: 4, paddingBottom: 10 }) +
  text(h('Un lagon rien qu\u2019\u00e0 vous', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 6 }) +
  text(bullets([
    '<strong>1\u00a0m de fond sur des kilom\u00e8tres.</strong> Vos d\u00e9butants ont pied, vos confirm\u00e9s ont de l\u2019eau plate.',
    '<strong>Ni mar\u00e9e, ni corail, ni shore break</strong> \u00e0 n\u00e9gocier avant de partir naviguer.',
    '<strong>Du vent 9 jours sur 10</strong> de septembre \u00e0 mars, thermique et r\u00e9gulier.',
  ]), { paddingTop: 0, paddingBottom: 14 }) +
  text(p('La combinaison, vous pouvez la laisser en France.', { align: 'left', size: 16, color: MUTED, lh: 1.5 }), { paddingTop: 0, paddingBottom: 36 })
, '#ffffff');

// --- l'hebergement
const maison = section(
  image(IMG.maison, 'Maisons BKC face au lagon', { width: 596, paddingX: 32, radius: 8, paddingBottom: 28 }) +
  text(eyebrow('L\u2019h\u00e9bergement', OCEAN, 'left'), { paddingTop: 4, paddingBottom: 10 }) +
  text(h('Vous dormez les pieds dans le sable', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 12 }) +
  text(p('Des maisons priv\u00e9es face au lagon, \u00e0 trente secondes du spot. On a chronom\u00e9tr\u00e9\u00a0: trente secondes en tongs, vingt-deux en courant.',
    { align: 'left', color: MUTED }), { paddingTop: 0, paddingBottom: 36 })
, SAND_BG);

// --- le groupe
const groupe = section(
  image(IMG.tablee, 'Soiree de groupe au Bilene Kite Center', { width: 596, paddingX: 32, radius: 8, paddingBottom: 28 }) +
  text(eyebrow('Le groupe', OCEAN, 'left'), { paddingTop: 4, paddingBottom: 10 }) +
  text(h('Et le soir, tout le monde<br />\u00e0 la m\u00eame table', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 12 }) +
  text(p('Le centre est \u00e0 vous\u00a0: storage s\u00e9curis\u00e9, zone d\u00e9tente, douches, moniteurs fran\u00e7ais dipl\u00f4m\u00e9s IKO. On accueille des groupes depuis sept ans \u2014 on sait ce que c\u2019est que de faire naviguer douze personnes de niveaux diff\u00e9rents la m\u00eame semaine.',
    { align: 'left', color: MUTED }), { paddingTop: 0, paddingBottom: 36 })
, '#ffffff');

// --- le programme ambassadeurs : le coeur du mail, volontairement court.
//     Le detail des paliers est sur la page, pas ici.
const programme = section(
  text(eyebrow('Le programme ambassadeurs', SAND), { paddingTop: 46, paddingBottom: 14 }) +
  text(h('Vous montez le groupe.<br />On vous offre le v\u00f4tre.', { level: 2, color: '#ffffff', size: 32 }), { paddingTop: 0, paddingBottom: 16 }) +
  text(p('\u00c0 partir de <strong style="color:#ffffff;">3 personnes amen\u00e9es</strong>, votre s\u00e9jour est offert \u2014 h\u00e9bergement, transferts et storage inclus. \u00c0 partir de 10, on participe aussi au billet d\u2019avion.',
    { align: 'center', size: 18, color: '#c8d4e2', lh: 1.6 }), { paddingTop: 0, paddingBottom: 10 }) +
  button('VOIR LE PROGRAMME', URLS.ambass, { bg: '#ffffff', fg: NAVY, paddingTop: 14, paddingBottom: 10 }) +
  text(p('Le d\u00e9tail des paliers est sur le site. Vols et visas non inclus.',
    { align: 'center', size: 13, color: '#8fa3b8' }), { paddingTop: 0, paddingBottom: 46 })
, NAVY);

// --- les jours sans vent (l'argument "accompagnants")
const activites = section(
  text(eyebrow('Les jours sans vent'), { paddingTop: 44, paddingBottom: 12 }) +
  text(h('Il y en a peu. On a pr\u00e9vu quand m\u00eame.', { level: 2, size: 28 }), { paddingTop: 0, paddingBottom: 14 }) +
  text(p('De quoi occuper ceux qui vous accompagnent sans kiter, et \u00e9viter qu\u2019ils passent la semaine \u00e0 regarder leur t\u00e9l\u00e9phone.',
    { align: 'center', color: MUTED, size: 17 }), { paddingTop: 0, paddingBottom: 26 })
, SAND_BG) +
  '<tr><td style="background-color:' + SAND_BG + '" valign="top" align="center" class="mceLayoutContainer">' +
  '<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" style="max-width:660px" class="mceWidthContainer"><tbody>' +
  columns([
    photoCard(IMG.reserves, 'Safari', '\u00c9l\u00e9phants et r\u00e9serves d\u2019Afrique australe, \u00e0 deux heures de route.'),
    photoCard(IMG.braai, 'Braai sur la plage', 'Le barbecue sud-africain, au coucher du soleil, dans les dunes.'),
    photoCard(IMG.paddle, 'Paddle', 'Les rivi\u00e8res et lagons autour de Bil\u00e8ne, \u00e0 la rame.'),
  ], { gap: 10 }) +
  '</tbody></table></td></tr>' +
  section(
    text(p('<a href="' + URLS.activites + '" target="_blank" style="color:' + OCEAN + ';text-decoration:underline;font-weight:bold;">Toutes les activit\u00e9s sur le site</a>',
      { align: 'center', size: 15 }), { paddingTop: 20, paddingBottom: 44 })
  , SAND_BG);

// --- qui on est
const equipe = section(
  divider() +
  // rectangle arrondi, pas un cercle : la photo n'est pas carree, un
  // border-radius de 50% en ferait un ovale et couperait les tetes.
  image(IMG.equipe, 'Teresa, Pereira et Guillaume', { width: 260, paddingX: 32, paddingTop: 26, paddingBottom: 18, radius: 8 }) +
  text(h('Qui vous accueille', { level: 2, size: 24 }), { paddingTop: 0, paddingBottom: 10 }) +
  text(p('Teresa, Pereira et Guillaume. Trois passionn\u00e9s de glisse partis monter un centre l\u00e0 o\u00f9 le spot le m\u00e9ritait.',
    { align: 'center', color: MUTED, size: 16 }), { paddingTop: 0, paddingBottom: 8 }) +
  text(p('<a href="' + URLS.videoArrivee + '" target="_blank" style="color:' + OCEAN + ';text-decoration:underline;">Notre arriv\u00e9e au Mozambique, en vid\u00e9o</a>',
    { align: 'center', size: 15 }), { paddingTop: 0, paddingBottom: 36 })
, '#ffffff');

// --- CTA final
const cta = section(
  text(h('Parlons de votre groupe', { level: 2, color: '#ffffff', size: 28 }), { paddingTop: 44, paddingBottom: 12 }) +
  text(p('Dites-nous combien vous \u00eates et \u00e0 quelle p\u00e9riode vous voulez venir\u00a0: on vous renvoie un programme et un tarif adapt\u00e9s \u00e0 votre club.',
    { align: 'center', size: 17, color: '#d6e6f7', lh: 1.6 }), { paddingTop: 0, paddingBottom: 10 }) +
  button('CONTACTEZ-NOUS', URLS.contact, { bg: '#ffffff', fg: OCEAN, paddingTop: 14, paddingBottom: 12 }) +
  text(p('<a href="mailto:contact@bilenekite.com" style="color:#ffffff;text-decoration:underline;">contact@bilenekite.com</a>' +
    '<span style="color:#8ec2f0;">&nbsp;&nbsp;\u00b7&nbsp;&nbsp;</span>' +
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
  text(p('Bilene Kite Center<br />P796+23 Praia Do Bilene<br />Inhambane, 1303 \u2014 Mozambique<br />' +
    '<a href="' + URLS.maps + '" target="_blank" style="color:#8fa3b8;text-decoration:underline;">Voir sur la carte</a>',
    { align: 'center', size: 13, color: '#8fa3b8', lh: 1.7 }), { paddingTop: 0, paddingBottom: 18 }) +
  text(p('Vous recevez cet e-mail parce que votre structure figure dans notre annuaire de clubs et \u00e9coles de kite.<br />' +
    '<a href="' + TAG_UNSUB + '" style="color:#7d8ea3;text-decoration:underline;">Vous d\u00e9sabonner en un clic</a>.',
    { align: 'center', size: 11, color: '#6b7c8f', lh: 1.6 }), { paddingTop: 0, paddingBottom: 34 })
, NAVY);

// ---------------------------------------------------------------- assembly
const body = wrapBody([header, hero, spot, maison, groupe, programme, activites, equipe, cta, footer]);

fs.writeFileSync(OUT, head + body, 'utf8');
console.log('ecrit : ' + OUT + ' (' + (fs.statSync(OUT).size / 1024).toFixed(1) + ' Ko)');
