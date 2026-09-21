// ============================================================================
//  MAILING SZKOŁY I KLUBY KITE — POLOGNE
//  ---------------------------------------------------------------------------
//  ATTENTION : ce n'est PAS la traduction du mail francais. Meme lecon que
//  l'espagnol (v1 traduite, rejetee par Teresa le 21/09/2026) : le texte est
//  ecrit directement en polonais a partir des FAITS du mail FR (15 km de
//  lagune, 1 m de fond, vent 9 jours sur 10, 12 personnes au maximum sur
//  l'eau, paliers du programme) et reprend le bloc "experience du centre"
//  ecrit par Teresa pour le mail ES. Structure en 11 blocs, comme l'espagnol.
//
//  Vocabulaire verifie sur des sites d'ecoles et d'agences kite polonaises
//  (kitesurf.pl, nolimitskiting.pl, kiteaway.pl, surfski.pl...) le
//  21/09/2026. A garder si quelqu'un "corrige" le texte :
//    - on TUTOIE, avec majuscule de politesse (Ty, Twój, Cię, Was) : aucun
//      site kite polonais ne dit "Państwo" ;
//    - AUCUNE forme genree a la 2e personne (byłeś/byłaś, gotowy/gotowa,
//      sam/sama) : on ne sait pas qui lit. D'ou "12 osób" plutot que
//      "12 kiterów", et "Troje ludzi" pour l'equipe (groupe mixte) ;
//    - "pływać" pour naviguer, "rozkładać/składać" pour monter/plier, "wieje"
//      pour le vent, "pianka" pour la combinaison ;
//    - l'argument qui parle a un Polonais : l'eau CHAUDE (Baltique) et le VIDE
//      (la Zatoka Pucka est bondee l'ete), plus que l'eau plate qu'il connait ;
//    - typographie polonaise : pas d'espace avant ":" ni avant "%", tiret " – ".
//
//  Le site n'existe pas en polonais : les liens secondaires vont vers le site
//  ANGLAIS (urlsFor('pl') dans lib.cjs), le CTA vers /pl/program-ambasadorski/.
//
//  Generation : node tools/mailing/gen-mailing-szkoly-kite-pl.cjs
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

const URLS = urlsFor('pl');

const OUT = path.join(__dirname, 'mailing-szkoly-kite-pl.html');

// Objet de la campagne, a saisir a l'identique dans Brevo. Le <title> n'est pas
// l'objet de l'e-mail : il sert a la version "voir dans le navigateur".
// Pas de "gratis" dans l'objet (filtres anti-spam) : c'est l'apercu qui le dit.
const TITLE = 'Bilene, Mozambik: 15 km płaskiej wody i najwyżej 12 osób na spocie';

const head = buildHead(TITLE);

// ---------------------------------------------------------------- contenu
// APERCU DU TEXTE -> a saisir dans Brevo, pas ici :
//   Wieje dziewięć dni na dziesięć, od września do marca. A jeśli zbierzesz
//   grupę, za swój pobyt nie zapłacisz.
// Volontairement absent du HTML : Brevo injecte son propre preheader cache a
// l'envoi, un second ferait doublon dans la boite de reception.

// --- entete : le logo est blanc + vert, il lui faut ce fond sombre
const header = section(
  image(IMG.logo, 'Bilene Kite Center', { width: 200, paddingTop: 28, paddingBottom: 20, href: URLS.home }) +
  text(p('<a href="' + TAG_MIRROR + '" target="_blank" style="color:#7d8ea3;text-decoration:underline;">Zobacz tę wiadomość w przeglądarce</a>',
    { align: 'center', size: 11, color: '#7d8ea3' }), { paddingTop: 0, paddingBottom: 18 })
, NAVY);

// --- hero : la photo qui vend, cliquable vers la video du spot
const hero = section(
  image(IMG.hero, 'Laguna Bilene z lotu ptaka', { href: URLS.videoSpot }) +
  text(eyebrow('Dla szkół i klubów kite'), { paddingTop: 36, paddingBottom: 12 }) +
  text(h('Wyjazd, który Twoja grupa<br />będzie wspominać latami', { size: 34 }), { paddingTop: 0, paddingBottom: 16 }) +
  text(p('Bilene, Mozambik. Zamknięta laguna o długości 15&nbsp;km, ciepła woda i wiatr od września do marca. A jeśli to Ty zbierzesz grupę, <strong>za swój pobyt nie płacisz</strong>.',
    { align: 'center', size: 18, color: MUTED, lh: 1.6 }), { paddingTop: 0, paddingBottom: 40 })
, SAND_BG);

// --- le spot : quatre puces, comme l'espagnol. La quatrieme (le vide) est
//     celle qui parle a quelqu'un qui navigue dans la baie de Puck en juillet.
const spot = section(
  image(IMG.spot, 'Kurs kitesurfingu na lagunie Bilene', { width: 596, paddingX: 32, radius: 8, paddingBottom: 28 }) +
  text(eyebrow('Spot', OCEAN, 'left'), { paddingTop: 4, paddingBottom: 10 }) +
  text(h('Płaska woda i mnóstwo miejsca', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 6 }) +
  text(bullets([
    '<strong>Kilometry wody do pasa.</strong> Początkujący stoją pewnie na dnie i bez stresu wracają po deskę, a reszta ma płaską wodę aż po horyzont.',
    '<strong>Żadnych pływów, koralowców ani fali przy brzegu.</strong> Wchodzisz do wody i płyniesz.',
    '<strong>Wieje dziewięć dni na dziesięć</strong> – wiatr termiczny i równy, od września do marca.',
    '<strong>Najwyżej dwanaście osób na wodzie.</strong> To nasz rekord, a nie średnia.',
  ]), { paddingTop: 0, paddingBottom: 14 }) +
  text(p('Piankę możesz zostawić w domu.', { align: 'left', size: 16, color: MUTED, lh: 1.5 }), { paddingTop: 0, paddingBottom: 36 })
, '#ffffff');

// --- l'hebergement
const maison = section(
  image(IMG.maison, 'Domki centrum nad laguną', { width: 596, paddingX: 32, radius: 8, paddingBottom: 28 }) +
  text(eyebrow('Zakwaterowanie', OCEAN, 'left'), { paddingTop: 4, paddingBottom: 10 }) +
  text(h('Z kanapy do wody<br />w trzydzieści sekund', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 12 }) +
  text(p('Prywatne domki z widokiem na lagunę. Zmierzyliśmy: trzydzieści sekund w klapkach, dwadzieścia dwie biegiem.',
    { align: 'left', color: MUTED }), { paddingTop: 0, paddingBottom: 36 })
, SAND_BG);

// --- le groupe : les soirees. Le centre a son propre bloc juste apres.
const groupe = section(
  image(IMG.tablee, 'Wspólna kolacja w centrum', { width: 596, paddingX: 32, radius: 8, paddingBottom: 28 }) +
  text(eyebrow('Grupa', OCEAN, 'left'), { paddingTop: 4, paddingBottom: 10 }) +
  text(h('Wieczorem wszyscy<br />przy jednym stole', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 12 }) +
  text(p('Nie musisz niczego planować: zespół Bilene Kite Center co wieczór ma inny pomysł. Lokalne knajpki, grill na plaży…',
    { align: 'left', color: MUTED }), { paddingTop: 0, paddingBottom: 36 })
, '#ffffff');

// --- l'experience du centre : le bloc ecrit par Teresa pour le mail ES,
//     repris ici sur le fond. L'argument "on monte et on range ton materiel"
//     est celui qu'aucune ecole du Hel ne propose : c'est lui qui doit rester.
const doswiadczenie = section(
  text(eyebrow('Centrum', OCEAN, 'left'), { paddingTop: 44, paddingBottom: 10 }) +
  text(h('Korzystaj z naszego doświadczenia', { level: 2, align: 'left', size: 28 }), { paddingTop: 0, paddingBottom: 14 }) +
  text(bullets([
    'Jesteśmy w Bilene od <strong>siedmiu lat</strong> i wiemy, czego kto potrzebuje na swoim poziomie.',
    'Uczą u nas <strong>instruktorzy z licencją IKO</strong>.',
    'Na miejscu jest wszystko: magazyn na sprzęt, prysznice i pomocnicy, którzy <strong>rozkładają i chowają Twój sprzęt</strong>.',
  ]), { paddingTop: 0, paddingBottom: 14 }) +
  text(p('Tak, dobrze czytasz: tu nie rozkładasz i nie składasz. Robimy to za Ciebie, z taką samą troską, z jaką Ty dbasz o swój sprzęt.',
    { align: 'left', size: 16, color: MUTED, lh: 1.5 }), { paddingTop: 0, paddingBottom: 40 })
, SAND_BG);

// --- le programme ambassadeurs : le coeur du mail, volontairement court.
//     Le detail des paliers est sur la page, pas ici.
const programme = section(
  text(eyebrow('Program Ambasadorski', SAND), { paddingTop: 46, paddingBottom: 14 }) +
  text(h('Ty zbierasz grupę.<br />Twój pobyt jest na nasz koszt.', { level: 2, color: '#ffffff', size: 32 }), { paddingTop: 0, paddingBottom: 16 }) +
  text(p('Jeśli pojadą z Tobą <strong style="color:#ffffff;">trzy osoby</strong>, Twój pobyt nic Cię nie kosztuje: zakwaterowanie, transfery i przechowanie sprzętu w cenie. Od dziesięciu osób dokładamy się też do biletu lotniczego.',
    { align: 'center', size: 18, color: '#c8d4e2', lh: 1.6 }), { paddingTop: 0, paddingBottom: 10 }) +
  button('ZOBACZ PROGRAM', URLS.ambass, { bg: '#ffffff', fg: NAVY, paddingTop: 14, paddingBottom: 10 }) +
  text(p('Wszystkie progi znajdziesz na stronie. Loty i wizy we własnym zakresie.',
    { align: 'center', size: 13, color: '#8fa3b8' }), { paddingTop: 0, paddingBottom: 46 })
, NAVY);

// --- les jours sans vent (l'argument "accompagnants")
const activites = section(
  text(eyebrow('Dni bez wiatru'), { paddingTop: 44, paddingBottom: 12 }) +
  text(h('Zdarzają się rzadko. Plan i tak mamy.', { level: 2, size: 28 }), { paddingTop: 0, paddingBottom: 14 }) +
  text(p('Dla osób towarzyszących, które nie pływają – i żeby nikt nie spędził tygodnia z nosem w telefonie.',
    { align: 'center', color: MUTED, size: 17 }), { paddingTop: 0, paddingBottom: 26 })
, SAND_BG) +
  '<tr><td style="background-color:' + SAND_BG + '" valign="top" align="center" class="mceLayoutContainer">' +
  '<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" style="max-width:660px" class="mceWidthContainer"><tbody>' +
  columns([
    photoCard(IMG.reserves, 'Safari', 'Słonie i rezerwaty południowej Afryki, dwie godziny drogi samochodem.'),
    photoCard(IMG.braai, 'Braai na plaży', 'Grill po południowoafrykańsku, o zachodzie słońca, wśród wydm.'),
    photoCard(IMG.paddle, 'SUP', 'Rzeki i laguny wokół Bilene, z wiosłem w ręku.'),
  ], { gap: 10 }) +
  '</tbody></table></td></tr>' +
  section(
    text(p('<a href="' + URLS.activites + '" target="_blank" style="color:' + OCEAN + ';text-decoration:underline;font-weight:bold;">Wszystkie atrakcje na naszej stronie (po angielsku)</a>',
      { align: 'center', size: 15 }), { paddingTop: 20, paddingBottom: 44 })
  , SAND_BG);

// --- qui on est
//     Personne ne parle polonais au centre : c'est Guillaume qui repond. On
//     dit ce qu'on accepte de lire, pas dans quelle langue on repondra.
//     "Troje" : numeral collectif, obligatoire pour un groupe mixte.
const equipe = section(
  divider() +
  // rectangle arrondi, pas un cercle : la photo n'est pas carree, un
  // border-radius de 50% en ferait un ovale et couperait les tetes.
  image(IMG.equipe, 'Teresa, Pereira i Guillaume', { width: 260, paddingX: 32, paddingTop: 26, paddingBottom: 18, radius: 8 }) +
  text(h('Kim jesteśmy', { level: 2, size: 24 }), { paddingTop: 0, paddingBottom: 10 }) +
  text(p('Teresa, Pereira i Guillaume. Troje ludzi zakręconych na punkcie kitesurfingu, którzy założyli centrum tam, gdzie spot był tego wart. Napisz do nas po polsku albo po angielsku.',
    { align: 'center', color: MUTED, size: 16 }), { paddingTop: 0, paddingBottom: 8 }) +
  text(p('<a href="' + URLS.videoArrivee + '" target="_blank" style="color:' + OCEAN + ';text-decoration:underline;">Zobacz, jak przyjechaliśmy do Mozambiku (wideo)</a>',
    { align: 'center', size: 15 }), { paddingTop: 0, paddingBottom: 36 })
, '#ffffff');

// --- CTA final : vers le bloc contact de la page polonaise (texte en
//     polonais + formulaire), pas vers la page contact anglaise.
const cta = section(
  text(h('Opowiedz nam o swojej grupie', { level: 2, color: '#ffffff', size: 28 }), { paddingTop: 44, paddingBottom: 12 }) +
  text(p('Napisz, ile Was jest i kiedy chcecie przyjechać, a przygotujemy program i cenę dopasowane do Twojej grupy.',
    { align: 'center', size: 17, color: '#d6e6f7', lh: 1.6 }), { paddingTop: 0, paddingBottom: 10 }) +
  button('NAPISZ DO NAS', URLS.contact, { bg: '#ffffff', fg: OCEAN, paddingTop: 14, paddingBottom: 12 }) +
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
  text(p('Bilene Kite Center<br />P796+23 Praia Do Bilene<br />Inhambane, 1303 – Mozambik<br />' +
    '<a href="' + URLS.maps + '" target="_blank" style="color:#8fa3b8;text-decoration:underline;">Zobacz na mapie</a>',
    { align: 'center', size: 13, color: '#8fa3b8', lh: 1.7 }), { paddingTop: 0, paddingBottom: 18 }) +
  text(p('Otrzymujesz tę wiadomość, ponieważ Twoja szkoła lub klub znajduje się w naszym katalogu szkół i klubów kite.<br />' +
    '<a href="' + TAG_UNSUB + '" style="color:#7d8ea3;text-decoration:underline;">Wypisz się jednym kliknięciem</a>.',
    { align: 'center', size: 11, color: '#6b7c8f', lh: 1.6 }), { paddingTop: 0, paddingBottom: 34 })
, NAVY);

// ---------------------------------------------------------------- assembly
const body = wrapBody([header, hero, spot, maison, groupe, doswiadczenie, programme, activites, equipe, cta, footer]);

fs.writeFileSync(OUT, head + body, 'utf8');
console.log('ecrit : ' + OUT + ' (' + (fs.statSync(OUT).size / 1024).toFixed(1) + ' Ko)');
