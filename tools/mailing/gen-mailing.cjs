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
//  Generation : node tools/mailing/gen-mailing.cjs
//  (.cjs et pas .js : le package.json du projet est en "type": "module")
// ============================================================================

const fs = require('fs');
const path = require('path');

// Chemins relatifs au dossier du script : le depot est clonable ailleurs.
const SRC = path.join(__dirname, 'template-mailchimp-chris.html');
const OUT = path.join(__dirname, 'mailing-clubs-ecoles-fr.html');

// Objet de la campagne, a saisir a l'identique dans Brevo. Le <title> n'est pas
// l'objet de l'e-mail : il sert a la version "voir dans le navigateur".
const TITLE = 'Bil\u00e8ne, Mozambique : 15 km de lagon, 1 m de fond, personne dessus';

const orig = fs.readFileSync(SRC, 'utf8');
let head = orig.slice(0, orig.indexOf('<body'));
head = head.replace(/<title>[\s\S]*?<\/title>/, '<title>' + TITLE + '</title>');

// ---------------------------------------------------------------- assets
// Toutes les images sont hebergees par nous, plus par Mailchimp : l'envoi passe
// a Brevo, et des URL mcusercontent.com se casseraient le jour ou le compte
// Mailchimp de Chris fermerait (logo compris, dans un mail deja parti).
// Rapatriees et compressees par tools/mailing/prepare-images-mailing.cjs (-60 %).
//
// /!\ public/images/mailing/ doit etre deploye en FTP AVANT l'envoi.
//
// MAIL_IMG_BASE permet de relire le mail en local avant deploiement, ex :
//   MAIL_IMG_BASE=http://localhost:8898/images/mailing/ node tools/mailing/gen-mailing.cjs
const BASE = process.env.MAIL_IMG_BASE || 'https://www.bilenekite.com/images/mailing/';

const IMG = {
  logo:     BASE + 'logo-bkc.png',      // detoure blanc + vert -> toujours sur fond sombre
  hero:     BASE + 'hero-lagon.jpg',    // drone lagon + kites, bouton play incruste
  spot:     BASE + 'spot-cours.jpg',    // moniteur + eleves, eau a la taille
  maison:   BASE + 'maison.jpg',        // palmiers + plage blanche + lagon
  tablee:   BASE + 'tablee.jpg',        // le groupe a la grande tablee
  equipe:   BASE + 'equipe.jpg',
  reserves: BASE + 'safari.jpg',        // elephants
  braai:    BASE + 'braai.jpg',         // feu au coucher de soleil
  paddle:   BASE + 'paddle.jpg',
};

const URLS = {
  // L'accueil FR est a la RACINE, pas dans /fr/ : ce dossier ne contient que
  // les pages internes, sans index.html, donc /fr/ renvoie un 403. Le lien du
  // logo (entete + pied de page) et l'icone "site web" tapaient dedans.
  home:         'https://www.bilenekite.com/',
  ambass:       'https://www.bilenekite.com/programme-ambassadeurs/',
  centre:       'https://www.bilenekite.com/fr/le-centre-de-kite-au-mozambique/',
  activites:    'https://www.bilenekite.com/fr/activites-a-bilene-sorties-visites-ballades-exploration/',
  contact:      'https://www.bilenekite.com/fr/infos-mozambique/#contactus',
  videoSpot:    'https://www.youtube.com/watch?v=jzfpku5Eghg',
  videoArrivee: 'https://youtu.be/XeEac9lFaYk',
  maps:         'https://www.google.com/maps/place/Bilene+Kite+Center/@-25.2824375,33.2601875,17z/data=!3m1!4b1!4m6!3m5!1s0x1ee127bd3561593d:0xeb5175829bed6488!8m2!3d-25.2824375!4d33.2601875!16s%2Fg%2F11j1f_xws9',
  whatsapp:     'https://wa.me/258870062521',
  facebook:     'https://www.facebook.com/288244685233804',
  instagram:    'https://www.instagram.com/bilene_kite_center_bkc/',
};

// --- balises de fusion : ENVOI VIA BREVO (et non Mailchimp) ------------------
// Brevo utilise la "Brevo Template Language" en doubles accolades, la ou
// Mailchimp utilisait *|TAG|*. Equivalences :
//   *|ARCHIVE|*        -> {{ mirror }}        (voir dans le navigateur)
//   *|UNSUB|*          -> {{ unsubscribe }}   (obligatoire : Brevo refuse
//                                              d'enregistrer une campagne sans)
//   *|UPDATE_PROFILE|* -> {{ update_profile }} -- NON UTILISE ICI : cette balise
//     exige un formulaire de mise a jour de profil cree cote Brevo et son id a
//     24 caracteres. Tant qu'il n'existe pas, le lien casserait. Le pied de page
//     ne garde donc que le desabonnement, qui est ce qui est legalement requis.
const TAG_MIRROR = '{{ mirror }}';
const TAG_UNSUB = '{{ unsubscribe }}';

// --- charte reprise de src/sass/_variables.scss -----------------------------
const SAND_BG = '#F7F4EF';  // $colorbackground
const NAVY    = '#0A1628';  // $color-dark
const OCEAN   = '#0066CC';  // $color-ocean
const SAND    = '#E8C99A';  // $color-sand - accent chaud sur fond sombre
const INK     = '#1A1A2E';  // $colorprimary
const MUTED   = '#4A5568';  // $colorgreytext1
const HAIRLINE = '#E2DCD2';

// Anton (titres du site) n'existe pas en mail : on reste sur la pile sans-serif
// systeme, comme Chris.
const FF = "'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif";

let bid = 100;
const nid = () => ++bid;

// ---------------------------------------------------------------- helpers
function button(label, href, opts) {
  opts = opts || {};
  const id = nid();
  const bg = opts.bg || OCEAN;
  const fg = opts.fg || '#ffffff';
  const align = opts.align || 'center';
  const size = opts.fontSize || 14;
  const pad = opts.padding || '16px 32px';
  const width = Math.round(label.length * size * 0.62 + 64);
  const height = 52;
  return [
    '<tr><td style="background-color:transparent;padding-top:' + (opts.paddingTop !== undefined ? opts.paddingTop : 12) + 'px;padding-bottom:' + (opts.paddingBottom !== undefined ? opts.paddingBottom : 12) + 'px;padding-right:24px;padding-left:24px;border:0;border-radius:0" valign="top" class="mceButtonBlockContainer" align="' + align + '" id="b' + id + '">',
    '<div><!--[if !mso]><!--></div>',
    '<table align="' + align + '" border="0" cellpadding="0" cellspacing="0" role="presentation" data-block-id="' + id + '" class="mceButtonContainer"><tbody><tr class="mceStandardButton">',
    '<td style="background-color:' + bg + ';border-radius:8px;text-align:center" valign="top" class="mceButton"><a href="' + href + '" target="_blank" class="mceButtonLink" style="background-color:' + bg + ';border-radius:8px;border:1px solid ' + bg + ';color:' + fg + ';display:block;font-family:' + FF + ';font-size:' + size + 'px;font-weight:bold;font-style:normal;padding:' + pad + ';text-decoration:none;text-align:center;direction:ltr;letter-spacing:0.5px" rel="noreferrer" data-button-link-id="' + id + '">' + label + '</a></td>',
    '</tr></tbody></table>',
    '<div><!--<![endif]--></div>',
    '<table align="' + align + '" border="0" cellpadding="0" cellspacing="0" role="presentation" data-block-id="' + id + '" class="mceButtonContainer"><tbody><tr>',
    '<!--[if mso]>',
    '<td align="' + align + '">',
    '<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"',
    'href="' + href + '" data-button-link-id="' + id + '"',
    'style="v-text-anchor:middle; width:' + width + 'px; height:' + height + 'px;" arcsize="4%"',
    'strokecolor="' + bg + '" strokeweight="1px" fillcolor="' + bg + '">',
    '<v:stroke dashstyle="solid"/>',
    '<w:anchorlock />',
    '<center style="color:' + fg + '; display:block; font-family:' + FF + '; font-size:' + size + '; font-style:normal; font-weight:bold; letter-spacing:0px; text-decoration:none; text-align:center; direction:ltr;">',
    label,
    '</center>',
    '</v:roundrect>',
    '</td>',
    '<![endif]-->',
    '</tr></tbody></table></td></tr>',
  ].join('\n');
}

function image(src, alt, opts) {
  opts = opts || {};
  const id = nid();
  const w = opts.width || 660;
  const pt = opts.paddingTop !== undefined ? opts.paddingTop : 0;
  const pb = opts.paddingBottom !== undefined ? opts.paddingBottom : 0;
  const px = opts.paddingX !== undefined ? opts.paddingX : 0;
  const radius = opts.radius || 0;
  const img = '<img alt="' + alt + '" src="' + src + '" width="' + w + '" style="width:100%;max-width:' + w + 'px;height:auto;display:block;border-radius:' + radius + 'px" class="mceImage" />';
  return [
    '<tr><td style="background-color:transparent;padding-top:' + pt + 'px;padding-bottom:' + pb + 'px;padding-right:' + px + 'px;padding-left:' + px + 'px;border:0;border-radius:0" valign="top" class="mceImageBlockContainer" align="center" id="b' + id + '">',
    '<table width="100%" style="border:0;border-radius:0;border-collapse:separate;margin:0" role="presentation" cellpadding="0" cellspacing="0" data-block-id="' + id + '"><tbody><tr>',
    '<td style="padding:0;margin:0;width:100%" valign="top" align="center">',
    opts.href ? '<a href="' + opts.href + '" target="_blank" rel="noreferrer">' + img + '</a>' : img,
    '</td></tr></tbody></table></td></tr>',
  ].join('\n');
}

// paddingX par defaut a 32 (et non 24) : c'est ce qui donne l'air respirable
// reclame apres la v1. Sur 660px de large, il reste 596px de texte.
function text(content, opts) {
  opts = opts || {};
  const id = nid();
  const bg = opts.bg || 'transparent';
  const pt = opts.paddingTop !== undefined ? opts.paddingTop : 12;
  const pb = opts.paddingBottom !== undefined ? opts.paddingBottom : 12;
  const px = opts.paddingX !== undefined ? opts.paddingX : 32;
  return [
    '<tr><td style="background-color:' + bg + ';padding-top:' + pt + 'px;padding-bottom:' + pb + 'px;padding-right:' + px + 'px;padding-left:' + px + 'px;border:0;border-radius:0" valign="top" class="mceTextBlockContainer" id="b' + id + '">',
    '<div data-block-id="' + id + '" class="mceText" id="d' + id + '" style="width:100%">' + content + '</div>',
    '</td></tr>',
  ].join('\n');
}

function p(t, o) {
  o = o || {};
  const lh = o.lh || 1.62;
  return '<p style="text-align:' + (o.align || 'left') + ';line-height:' + lh + ';mso-line-height-alt:' + Math.round(lh * 100) + '%;font-size:' + (o.size || 17) + 'px;color:' + (o.color || INK) + ';font-family:' + FF + ';margin:0;' +
    (o.mt ? 'margin-top:' + o.mt + 'px;' : '') + (o.weight ? 'font-weight:' + o.weight + ';' : '') + '">' + t + '</p>';
}

function h(t, o) {
  o = o || {};
  const lvl = o.level || 1;
  const lh = o.lh || 1.18;
  return '<h' + lvl + ' style="text-align:' + (o.align || 'center') + ';line-height:' + lh + ';mso-line-height-alt:' + Math.round(lh * 100) + '%;font-size:' + (o.size || 30) + 'px;color:' + (o.color || NAVY) + ';font-family:' + FF + ';font-weight:bold;margin:0;letter-spacing:-0.3px;">' + t + '</h' + lvl + '>';
}

function eyebrow(t, color, align) {
  return '<p style="text-align:' + (align || 'center') + ';line-height:1.4;mso-line-height-alt:140%;font-size:12px;letter-spacing:2.4px;color:' + (color || OCEAN) + ';font-family:' + FF + ';font-weight:bold;margin:0;">' + t.toUpperCase() + '</p>';
}

// Puces "maison" : un tiret cadratin colore plutot qu'un <ul>, dont le rendu
// des marges varie trop d'un client a l'autre.
function bullets(items, o) {
  o = o || {};
  return items.map(function (i) {
    return '<p style="text-align:left;line-height:1.55;mso-line-height-alt:155%;font-size:' + (o.size || 17) + 'px;color:' + (o.color || INK) + ';font-family:' + FF + ';margin:0;margin-top:' + (o.gap || 12) + 'px;">' +
      '<span style="color:' + (o.dot || OCEAN) + ';font-weight:bold;">&#8212;&nbsp;</span>' + i + '</p>';
  }).join('');
}

function divider(color) {
  const id = nid();
  return '<tr><td style="background-color:transparent;padding-top:8px;padding-bottom:8px;padding-right:32px;padding-left:32px" valign="top" class="mceDividerBlockContainer" id="b' + id + '">' +
    '<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" class="mceDividerContainer" data-block-id="' + id + '">' +
    '<tbody><tr><td style="min-width:100%;border-top:1px solid ' + (color || HAIRLINE) + ';font-size:0;line-height:0;" valign="top" class="mceDividerBlock">&nbsp;</td></tr></tbody></table></td></tr>';
}

function spacer(height) {
  const id = nid();
  return '<tr><td style="background-color:transparent;padding:0" valign="top" class="mceSpacerBlockContainer" id="b' + id + '">' +
    '<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="' + id + '"><tbody><tr>' +
    '<td style="min-width:100%;font-size:0;line-height:0;height:' + height + 'px" valign="top" class="mceSpacerBlock">&nbsp;</td></tr></tbody></table></td></tr>';
}

function section(rows, bg) {
  const id = nid();
  return [
    '<tr><td style="background-color:' + (bg || '#ffffff') + '" valign="top" align="center" class="mceLayoutContainer" id="l' + id + '">',
    '<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" style="max-width:660px" class="mceWidthContainer" data-block-id="' + id + '">',
    '<tbody><tr><td valign="top" class="mceColumn" width="100%">',
    '<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">',
    '<tbody>' + rows + '</tbody></table>',
    '</td></tr></tbody></table></td></tr>',
  ].join('\n');
}

// Colonnes de largeur STRICTEMENT egale. Le piege : donner le gouttiere en
// padding-left aux colonnes sauf la premiere (ce que faisait la v1) rend la
// colonne du milieu plus etroite de `gap` -> photos et legendes desalignees.
// Ici chaque colonne porte la meme demi-gouttiere des deux cotes, et le
// conteneur rend la moitie qu'il a en trop pour que les bords exterieurs
// restent alignes sur la marge de 32px du reste du mail.
function columns(cols, opts) {
  opts = opts || {};
  const id = nid();
  const gap = opts.gap !== undefined ? opts.gap : 12;
  const half = Math.round(gap / 2);
  const w = Math.floor(100 / cols.length);
  const cells = cols.map(function (c) {
    return '<td style="padding-top:0;padding-bottom:0;padding-left:' + half + 'px;padding-right:' + half + 'px" valign="top" class="mceColumn" width="' + w + '%">' +
      '<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody>' + c + '</tbody></table></td>';
  }).join('\n');
  return [
    '<tr><td style="background-color:' + (opts.bg || 'transparent') + ';padding-top:' + (opts.paddingTop || 0) + 'px;padding-bottom:' + (opts.paddingBottom || 0) + 'px;padding-left:' + (32 - half) + 'px;padding-right:' + (32 - half) + 'px" valign="top" align="center" class="mceLayoutContainer" id="l' + id + '">',
    '<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="' + id + '">',
    '<tbody><tr>' + cells + '</tr></tbody></table></td></tr>',
  ].join('\n');
}

// petite carte photo + legende, utilisee pour les 3 activites
function photoCard(img, title, caption) {
  return image(img, title, { width: 190, paddingBottom: 10, radius: 6 }) +
    text(p('<strong>' + title + '</strong>', { align: 'center', size: 15, color: NAVY, lh: 1.3 }) +
      p(caption, { align: 'center', size: 13, color: MUTED, lh: 1.45, mt: 4 }),
      { paddingTop: 0, paddingBottom: 8, paddingX: 0 });
}

function socialIcon(name, href) {
  // Icones blanches (le pied de page est navy). Rapatriees du CDN Mailchimp :
  // les variantes "dark" seraient invisibles sur ce fond.
  return '<td style="padding:0 8px;" valign="middle"><a href="' + href + '" target="_blank" rel="noreferrer">' +
    '<img alt="' + name + '" src="' + BASE + 'ic-' + name + '.png" width="26" style="display:block;width:26px;height:26px;" /></a></td>';
}

// ---------------------------------------------------------------- contenu
// APERCU DU TEXTE -> a saisir dans Brevo, pas ici :
//   Un lagon ferme de 15 km rien que pour vous — et le voyage de
//   l'organisateur est offert.
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
const spacers = new Array(16).join('&#847;&nbsp;&zwnj;&nbsp;');

const body = [
  '<body>',
  '<div style="display:none;font-size:1px;color:' + SAND_BG + ';line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">' + spacers + '</div>',
  '<center>',
  '<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="background-color:' + SAND_BG + '">',
  '<tbody><tr><td class="bodyCell" align="center" valign="top">',
  '<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">',
  '<tbody>',
  header, hero, spot, maison, groupe, programme, activites, equipe, cta, footer,
  '</tbody></table>',
  '</td></tr></tbody></table>',
  '</center>',
  '</body></html>',
].join('\n');

fs.writeFileSync(OUT, head + body, 'utf8');
console.log('ecrit : ' + OUT + ' (' + (fs.statSync(OUT).size / 1024).toFixed(1) + ' Ko)');
