// ============================================================================
//  Relance FR - clubs & ecoles de kite (2e envoi, prevu le 11/09/2026)
//  ---------------------------------------------------------------------------
//  Suite du mailing du 28/08/2026 (gen-mailing.cjs). Envoyee via Brevo aux
//  seuls clubs qui n'ont ni clique ni repondu : le ciblage se fait dans Brevo,
//  sur les stats de la 1re campagne, pas ici.
//
//  Parti pris :
//    - c'est une RELANCE, pas un remake : le spot, l'hebergement, le groupe et
//      les activites sont deja dans le 1er mail et sur le site. Ici : un rappel
//      court, une photo, un bouton ;
//    - une seule image, prise dans public/images/mailing/ (deja deployee en
//      FTP) : rien de nouveau a preparer pour un envoi de relance ;
//    - le logo reste sur fond sombre (blanc + vert), entete et pied navy ;
//    - une seule colonne de texte, comme dans le 1er mail.
//
//  DEUX VARIANTES, a comparer dans le navigateur avant de choisir :
//    a (defaut) - meme dosage d'humour que le 1er mail : 2-3 touches, jamais au
//                 detriment de l'info. Angle : "la saison vient d'ouvrir".
//    b          - la relance qui s'assume : le mail parle du fait meme d'etre
//                 un deuxieme mail. Ton plus decale de bout en bout, mais qui
//                 reste B2B (pas de gag, pas de point d'exclamation).
//
//  Generation :
//    node tools/mailing/gen-relance-clubs-ecoles-fr.cjs                 -> ...-a.html
//    RELANCE_VARIANT=b node tools/mailing/gen-relance-clubs-ecoles-fr.cjs -> ...-b.html
//  (.cjs et pas .js : le package.json du projet est en "type": "module")
//
//  Relecture locale, images servies depuis public/ sur le port 8898 :
//    MAIL_IMG_BASE=http://localhost:8898/images/mailing/ node tools/mailing/gen-relance-clubs-ecoles-fr.cjs
// ============================================================================

const fs = require('fs');
const path = require('path');

// Briques de mise en page, palette, images et balises Brevo : partagees avec
// gen-mailing.cjs.
const {
  IMG, URLS, TAG_MIRROR, TAG_UNSUB,
  SAND_BG, NAVY, OCEAN, SAND, MUTED,
  buildHead, wrapBody,
  button, image, text, p, h, eyebrow, bullets, section, socialIcon,
} = require('./lib.cjs');

const VARIANT = (process.env.RELANCE_VARIANT || 'a').toLowerCase();
if (VARIANT !== 'a' && VARIANT !== 'b') {
  console.error('RELANCE_VARIANT doit valoir "a" ou "b" (recu : ' + VARIANT + ')');
  process.exit(1);
}

const OUT = path.join(__dirname, 'relance-clubs-ecoles-fr-' + VARIANT + '.html');

// Le <title> n'est PAS l'objet de l'e-mail (celui-ci se saisit dans Brevo) :
// il sert a la version "voir dans le navigateur".
const TITLE = VARIANT === 'a'
  ? 'Bilène, Mozambique : votre sortie club de cet hiver'
  : 'Deuxième mail, et le dernier — Bilene Kite Center';

const head = buildHead(TITLE);

// APERCU DU TEXTE -> a saisir dans Brevo, pas ici (voir README).
// Volontairement absent du HTML : Brevo injecte son propre preheader cache a
// l'envoi, un second ferait doublon dans la boite de reception.

// ---------------------------------------------------------------- entete
// Le logo est blanc + vert : il lui faut ce fond sombre.
const header = section(
  image(IMG.logo, 'Bilene Kite Center', { width: 170, paddingTop: 26, paddingBottom: 16, href: URLS.home }) +
  text(p('<a href="' + TAG_MIRROR + '" target="_blank" style="color:#7d8ea3;text-decoration:underline;">Affichez cet e-mail dans votre navigateur</a>',
    { align: 'center', size: 11, color: '#7d8ea3' }), { paddingTop: 0, paddingBottom: 16 })
, NAVY);

// ---------------------------------------------------------------- corps
// Une photo pleine largeur, cliquable vers la video du spot, + le rappel.
const photo = image(IMG.hero, 'Le lagon de Bilène vu du ciel', { href: URLS.videoSpot });

// --- variante A : rappel sobre, l'humour reste en fin de phrase
const corpsA = section(
  photo +
  // "Clubs et ecoles" et pas "Clubs &amp; ecoles" : eyebrow() passe le texte en
  // majuscules, ce qui donnerait "&AMP;" -- valide en HTML5, mais tous les
  // clients mail ne decodent pas la variante majuscule de l'entite.
  text(eyebrow('Clubs et écoles de kite'), { paddingTop: 34, paddingBottom: 12 }) +
  text(h('Votre sortie club<br />de cet hiver', { size: 33 }), { paddingTop: 0, paddingBottom: 18 }) +
  text(p('Il y a quinze jours, on vous écrivait à propos de Bilène, au Mozambique : un lagon fermé de 15 km, 1 m de fond, du vent de septembre à mars. Et le voyage offert à celui qui monte le groupe.',
    { align: 'left', size: 17, color: MUTED, lh: 1.62 }), { paddingTop: 0, paddingBottom: 8 }) +
  text(p('La saison vient d’ouvrir, et les semaines de janvier et février sont celles qui partent en premier. Si l’idée vous a traversé l’esprit sans aller plus loin, voilà le lien une seconde fois — le lagon, lui, n’a pas bougé.',
    { align: 'left', size: 17, color: MUTED, lh: 1.62 }), { paddingTop: 0, paddingBottom: 10 }) +
  text(bullets([
    '<strong>Votre voyage offert dès 3 personnes amenées</strong> — hébergement, transferts et storage inclus.',
    '<strong>Les dates se calent avec vous</strong>, de septembre à mars.',
    '<strong>Des groupes accueillis depuis sept ans</strong>, tous niveaux la même semaine.',
  ]), { paddingTop: 0, paddingBottom: 34 })
, SAND_BG);

// --- variante B : le mail assume d'etre une relance et se moque de lui-meme
const corpsB = section(
  text(eyebrow('Deuxième mail. Le dernier.', OCEAN), { paddingTop: 36, paddingBottom: 12 }) +
  text(h('On sait. Encore nous.', { size: 34 }), { paddingTop: 0, paddingBottom: 18 }) +
  // Formulation volontairement large : le segment Brevo cible les
  // non-cliqueurs, dont certains ONT ouvert le 1er mail. Un "vous n'avez pas
  // ouvert" sec aurait sonne faux pour ceux-la.
  text(p('Fin août, on vous proposait d’emmener votre club kiter au Mozambique. Vous n’avez pas donné suite — ou vous avez ouvert, puis refermé, ce qui revient à peu près au même. Aucun reproche : nous non plus, on ne répond pas à tout ce qui arrive un vendredi matin.',
    { align: 'left', size: 17, color: MUTED, lh: 1.62 }), { paddingTop: 0, paddingBottom: 8 }) +
  text(p('Alors on fait court. Voilà le premier mail, débarrassé de tout le reste :',
    { align: 'left', size: 17, color: MUTED, lh: 1.62 }), { paddingTop: 0, paddingBottom: 4 }) +
  text(bullets([
    '<strong>Bilène, Mozambique.</strong> Un lagon fermé de 15 km, 1 m de fond, personne dessus.',
    '<strong>Du vent 9 jours sur 10</strong>, de septembre à mars. La combinaison reste en France.',
    '<strong>Vous montez le groupe, votre voyage est offert.</strong> À partir de 3 personnes amenées.',
  ]), { paddingTop: 0, paddingBottom: 18 }) +
  text(p('C’était tout. Le reste, c’étaient des photos — on vous en remet une, elle plaide mieux que nous.',
    { align: 'left', size: 17, color: MUTED, lh: 1.62 }), { paddingTop: 0, paddingBottom: 26 }) +
  photo +
  text(p('Prise un vendredi matin, justement.',
    { align: 'center', size: 13, color: MUTED, lh: 1.5 }), { paddingTop: 12, paddingBottom: 30 })
, SAND_BG);

// ---------------------------------------------------------------- le CTA
// Le detail des paliers vit sur la page, pas dans le mail.
const ctaA = section(
  text(eyebrow('Le programme ambassadeurs', SAND), { paddingTop: 42, paddingBottom: 14 }) +
  text(h('Vous montez le groupe.<br />On vous offre le vôtre.', { level: 2, color: '#ffffff', size: 30 }), { paddingTop: 0, paddingBottom: 14 }) +
  text(p('Le détail des paliers, ce qui est inclus et ce qui ne l’est pas : tout est sur la page.',
    { align: 'center', size: 17, color: '#c8d4e2', lh: 1.6 }), { paddingTop: 0, paddingBottom: 10 }) +
  button('VOIR LE PROGRAMME', URLS.ambass, { bg: '#ffffff', fg: NAVY, paddingTop: 14, paddingBottom: 10 }) +
  text(p('Pas le bon moment ? Répondez simplement « plus tard » : on vous recontacte à l’intersaison, et on en restera là.',
    { align: 'center', size: 13, color: '#8fa3b8', lh: 1.6 }), { paddingTop: 0, paddingBottom: 42 })
, NAVY);

const ctaB = section(
  text(eyebrow('Le programme ambassadeurs', SAND), { paddingTop: 42, paddingBottom: 14 }) +
  text(h('Le bouton, au cas où', { level: 2, color: '#ffffff', size: 30 }), { paddingTop: 0, paddingBottom: 14 }) +
  text(p('Les paliers, ce qui est inclus, ce qui ne l’est pas : tout est sur la page. Elle se lit en deux minutes, montre en main.',
    { align: 'center', size: 17, color: '#c8d4e2', lh: 1.6 }), { paddingTop: 0, paddingBottom: 10 }) +
  button('VOIR LE PROGRAMME', URLS.ambass, { bg: '#ffffff', fg: NAVY, paddingTop: 14, paddingBottom: 10 }) +
  text(p('Et si ce n’est vraiment pas votre sujet, le lien de désabonnement en bas fait très bien son travail. On ne le prendra pas mal : c’est nous qui l’avons mis.',
    { align: 'center', size: 13, color: '#8fa3b8', lh: 1.6 }), { paddingTop: 0, paddingBottom: 42 })
, NAVY);

// ---------------------------------------------------------------- contact
// Bloc clair entre les deux fonds sombres (CTA et pied de page).
const contactA = section(
  text(h('Ou parlons-en directement', { level: 2, size: 24 }), { paddingTop: 34, paddingBottom: 10 }) +
  text(p('Dites-nous combien vous êtes et à quelle période : on renvoie un programme et un tarif pour votre club.',
    { align: 'center', size: 16, color: MUTED, lh: 1.6 }), { paddingTop: 0, paddingBottom: 12 }) +
  text(p('<a href="mailto:contact@bilenekite.com" style="color:' + OCEAN + ';text-decoration:underline;font-weight:bold;">contact@bilenekite.com</a>' +
    '<span style="color:' + MUTED + ';">&nbsp;&nbsp;·&nbsp;&nbsp;</span>' +
    '<a href="' + URLS.whatsapp + '" target="_blank" style="color:' + OCEAN + ';text-decoration:underline;font-weight:bold;">WhatsApp</a>' +
    '<span style="color:' + MUTED + ';">&nbsp;&nbsp;·&nbsp;&nbsp;</span>' +
    '<a href="' + URLS.contact + '" target="_blank" style="color:' + OCEAN + ';text-decoration:underline;font-weight:bold;">Formulaire</a>',
    { align: 'center', size: 16 }), { paddingTop: 0, paddingBottom: 36 })
, '#ffffff');

const contactB = section(
  text(h('Ou répondez à ce mail', { level: 2, size: 24 }), { paddingTop: 34, paddingBottom: 10 }) +
  text(p('Il y a un humain au bout, une heure de décalage tout au plus. Donnez-nous un nombre de personnes et une période, on s’occupe du reste.',
    { align: 'center', size: 16, color: MUTED, lh: 1.6 }), { paddingTop: 0, paddingBottom: 12 }) +
  text(p('<a href="mailto:contact@bilenekite.com" style="color:' + OCEAN + ';text-decoration:underline;font-weight:bold;">contact@bilenekite.com</a>' +
    '<span style="color:' + MUTED + ';">&nbsp;&nbsp;·&nbsp;&nbsp;</span>' +
    '<a href="' + URLS.whatsapp + '" target="_blank" style="color:' + OCEAN + ';text-decoration:underline;font-weight:bold;">WhatsApp</a>' +
    '<span style="color:' + MUTED + ';">&nbsp;&nbsp;·&nbsp;&nbsp;</span>' +
    '<a href="' + URLS.contact + '" target="_blank" style="color:' + OCEAN + ';text-decoration:underline;font-weight:bold;">Formulaire</a>',
    { align: 'center', size: 16 }), { paddingTop: 0, paddingBottom: 36 })
, '#ffffff');

// ---------------------------------------------------------------- pied
// Navy : logo et icones en version claire. {{ unsubscribe }} obligatoire.
const footer = section(
  image(IMG.logo, 'Bilene Kite Center', { width: 140, paddingTop: 30, paddingBottom: 16, href: URLS.home }) +
  '<tr><td align="center" style="padding-bottom:18px;"><table border="0" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr>' +
  socialIcon('facebook', URLS.facebook) +
  socialIcon('instagram', URLS.instagram) +
  socialIcon('website', URLS.home) +
  '</tr></tbody></table></td></tr>' +
  text(p('Bilene Kite Center<br />P796+23 Praia Do Bilene<br />Inhambane, 1303 — Mozambique<br />' +
    '<a href="' + URLS.maps + '" target="_blank" style="color:#8fa3b8;text-decoration:underline;">Voir sur la carte</a>',
    { align: 'center', size: 13, color: '#8fa3b8', lh: 1.7 }), { paddingTop: 0, paddingBottom: 18 }) +
  text(p('Vous recevez cet e-mail parce que votre structure figure dans notre annuaire de clubs et écoles de kite, et qu’on vous a déjà écrit une fois à la fin du mois d’août.<br />' +
    '<a href="' + TAG_UNSUB + '" style="color:#7d8ea3;text-decoration:underline;">Vous désabonner en un clic</a>.',
    { align: 'center', size: 11, color: '#6b7c8f', lh: 1.6 }), { paddingTop: 0, paddingBottom: 32 })
, NAVY);

// ---------------------------------------------------------------- assemblage
const corps = VARIANT === 'a' ? corpsA : corpsB;
const cta = VARIANT === 'a' ? ctaA : ctaB;
const contact = VARIANT === 'a' ? contactA : contactB;

const body = wrapBody([header, corps, cta, contact, footer]);

fs.writeFileSync(OUT, head + body, 'utf8');
console.log('variante ' + VARIANT + ' — ecrit : ' + OUT + ' (' + (fs.statSync(OUT).size / 1024).toFixed(1) + ' Ko)');
