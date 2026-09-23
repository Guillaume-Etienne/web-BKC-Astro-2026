// ============================================================================
//  Briques communes aux generateurs de mailing (gen-mailing.cjs, gen-relance-*)
//  ---------------------------------------------------------------------------
//  Extrait le 28/08/2026, quand un deuxieme generateur (la relance) est arrive :
//  les helpers, la palette et les balises Brevo etaient sur le point d'etre
//  copies-colles a l'identique dans un second fichier de 150 lignes.
//
//  Rien ici ne connait le contenu d'un mail : que des briques de mise en page
//  (tableaux HTML compatibles Outlook) et la charte du site.
//
//  Contrat a NE PAS casser : gen-mailing.cjs doit produire exactement le meme
//  mailing-clubs-ecoles-fr.html qu'avant l'extraction (verifie par diff).
// ============================================================================

const fs = require('fs');
const path = require('path');

// --- images ------------------------------------------------------------------
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

// --- URL du site : celles qui changent de langue, et celles qui n'en changent pas
// Decoupe le 20/09/2026, a l'arrivee de la campagne espagnole : URLS etait une
// constante 100 % francaise. urlsFor('es') sert au generateur ES ; URLS reste
// le francais, a l'identique, pour les generateurs deja ecrits.
const URLS_COMMON = {
  videoSpot:    'https://www.youtube.com/watch?v=jzfpku5Eghg',
  videoArrivee: 'https://youtu.be/XeEac9lFaYk',
  maps:         'https://www.google.com/maps/place/Bilene+Kite+Center/@-25.2824375,33.2601875,17z/data=!3m1!4b1!4m6!3m5!1s0x1ee127bd3561593d:0xeb5175829bed6488!8m2!3d-25.2824375!4d33.2601875!16s%2Fg%2F11j1f_xws9',
  whatsapp:     'https://wa.me/258870062521',
  facebook:     'https://www.facebook.com/288244685233804',
  instagram:    'https://www.instagram.com/bilene_kite_center_bkc/',
};

const URLS_BY_LANG = {
  fr: {
    // L'accueil FR est a la RACINE, pas dans /fr/ : ce dossier ne contient que
    // les pages internes, sans index.html, donc /fr/ renvoie un 403. Le lien du
    // logo (entete + pied de page) et l'icone "site web" tapaient dedans.
    home:      'https://www.bilenekite.com/',
    ambass:    'https://www.bilenekite.com/programme-ambassadeurs/',
    centre:    'https://www.bilenekite.com/fr/le-centre-de-kite-au-mozambique/',
    activites: 'https://www.bilenekite.com/fr/activites-a-bilene-sorties-visites-ballades-exploration/',
    contact:   'https://www.bilenekite.com/fr/infos-mozambique/#contactus',
  },
  es: {
    // /es/ a bien son index.astro, contrairement a /fr/.
    home:      'https://www.bilenekite.com/es/',
    ambass:    'https://www.bilenekite.com/es/programa-embajadores/',
    centre:    'https://www.bilenekite.com/es/centro-de-kite-in-bilene-mozambique/',
    activites: 'https://www.bilenekite.com/es/actividades-en-bilene-excursiones-visitas-exploracion/',
    contact:   'https://www.bilenekite.com/es/informaciones-mozambique/#contactus',
  },
  // Le site n'existe pas en allemand ni en polonais : tout renvoie vers le
  // site ANGLAIS (choix de Guillaume, 21/09/2026), sauf la page du programme,
  // qui existe dans la langue. Le contact pointe sur le bloc contact de CETTE
  // page (#amb-contact, texte dans la langue + formulaire) plutot que sur
  // /en/information-mozambique/#contactus, entierement en anglais.
  de: {
    home:      'https://www.bilenekite.com/en/',
    ambass:    'https://www.bilenekite.com/de/gruppenprogramm/',
    centre:    'https://www.bilenekite.com/en/the-kite-center-in-bilene-mozambique/',
    activites: 'https://www.bilenekite.com/en/activities-in-bilene-outings-visits-exploration/',
    contact:   'https://www.bilenekite.com/de/gruppenprogramm/#amb-contact',
  },
  pl: {
    home:      'https://www.bilenekite.com/en/',
    ambass:    'https://www.bilenekite.com/pl/program-ambasadorski/',
    centre:    'https://www.bilenekite.com/en/the-kite-center-in-bilene-mozambique/',
    activites: 'https://www.bilenekite.com/en/activities-in-bilene-outings-visits-exploration/',
    contact:   'https://www.bilenekite.com/pl/program-ambasadorski/#amb-contact',
  },
  // Anglais (23/09/2026) : le site existe en entier. Le contact pointe quand
  // meme sur le bloc contact de la page du programme, comme DE/PL : le lecteur
  // y retrouve l'offre ET le formulaire, sans repartir de zero.
  en: {
    home:      'https://www.bilenekite.com/en/',
    ambass:    'https://www.bilenekite.com/en/bring-your-crew/',
    centre:    'https://www.bilenekite.com/en/the-kite-center-in-bilene-mozambique/',
    activites: 'https://www.bilenekite.com/en/activities-in-bilene-outings-visits-exploration/',
    contact:   'https://www.bilenekite.com/en/bring-your-crew/#amb-contact',
  },
};

// Les slugs viennent de src/i18n/pages.js : en cas de changement de route,
// c'est la-bas la source de verite, a repercuter ici a la main (le generateur
// est en CommonJS, pages.js en ESM).
function urlsFor(lang) {
  const byLang = URLS_BY_LANG[lang];
  if (!byLang) throw new Error('urlsFor : langue inconnue "' + lang + '"');
  return Object.assign({}, byLang, URLS_COMMON);
}

const URLS = urlsFor('fr');

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

// Le <head> (styles responsive Mailchimp, stacking .mceColumn en mobile,
// corrections Outlook) est repris tel quel du template de Chris ; seul le
// <title> est remplace. Ce <title> n'est PAS l'objet de l'e-mail : il sert a la
// version "voir dans le navigateur".
function buildHead(title) {
  const src = path.join(__dirname, 'template-mailchimp-chris.html');
  const orig = fs.readFileSync(src, 'utf8');
  const head = orig.slice(0, orig.indexOf('<body'));
  return head.replace(/<title>[\s\S]*?<\/title>/, '<title>' + title + '</title>');
}

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

// Enveloppe commune : le <center> + la table de fond sable, et le bloc de
// caracteres invisibles que Mailchimp glissait apres le preheader (il empeche
// certains clients de piocher le debut du contenu dans l'apercu).
// /!\ Pas de preheader cache ici : Brevo injecte le sien a l'envoi.
function wrapBody(sections) {
  const spacers = new Array(16).join('&#847;&nbsp;&zwnj;&nbsp;');
  return [
    '<body>',
    '<div style="display:none;font-size:1px;color:' + SAND_BG + ';line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">' + spacers + '</div>',
    '<center>',
    '<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="background-color:' + SAND_BG + '">',
    '<tbody><tr><td class="bodyCell" align="center" valign="top">',
    '<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">',
    '<tbody>',
    sections.join('\n'),
    '</tbody></table>',
    '</td></tr></tbody></table>',
    '</center>',
    '</body></html>',
  ].join('\n');
}

module.exports = {
  BASE, IMG, URLS, urlsFor,
  TAG_MIRROR, TAG_UNSUB,
  SAND_BG, NAVY, OCEAN, SAND, INK, MUTED, HAIRLINE, FF,
  buildHead, wrapBody,
  button, image, text, p, h, eyebrow, bullets, divider, spacer, section, columns,
  photoCard, socialIcon,
};
