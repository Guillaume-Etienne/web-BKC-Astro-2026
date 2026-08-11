// ============================================================================
//  AVIS CLIENTS — SOURCE DE VERITE UNIQUE
// ----------------------------------------------------------------------------
//  Chiffres releves le 11/08/2026 sur les 3 plateformes.
//  Le composant <Reviews>, les 3 pages d'accueil ET le JSON-LD lisent ce
//  fichier : une seule mise a jour suffit, aucun risque de divergence.
//
//  A RAFRAICHIR de temps en temps (Guillaume l'a demande). Repartition Google
//  au 11/08/2026 : 52 avis 5 etoiles, 1 avis 4 etoiles, 0 en dessous.
// ============================================================================

export const REVIEWS_UPDATED = '2026-08-11';

// --- Chiffres bruts -------------------------------------------------------
export const GOOGLE_RATING = '5.0';
export const GOOGLE_COUNT = 53;
const TRIPADVISOR_COUNT = 44;
const FACEBOOK_COUNT = 29;

export const TOTAL_REVIEWS = GOOGLE_COUNT + TRIPADVISOR_COUNT + FACEBOOK_COUNT; // 126

// --- Plateformes ----------------------------------------------------------
// logo: null => le nom est rendu en texte (cas de Google : ses regles de marque
// interdisent d'utiliser son logo d'une facon qui suggere une approbation).
const TRIPADVISOR_URL = {
  fr: 'https://www.tripadvisor.fr/Attraction_Review-g1597322-d15360648-Reviews-Bilene_Kite_Center-Bilene_Gaza_Province.html#REVIEWS',
  en: 'https://www.tripadvisor.com/Attraction_Review-g1597322-d15360648-Reviews-Bilene_Kite_Center-Bilene_Gaza_Province.html#REVIEWS',
  es: 'https://www.tripadvisor.es/Attraction_Review-g1597322-d15360648-Reviews-Bilene_Kite_Center-Bilene_Gaza_Province.html#REVIEWS',
};

export function platforms(lang = 'fr') {
  const nb = { fr: 'avis', en: 'reviews', es: 'opiniones' }[lang] ?? 'avis';
  const reco = { fr: 'recommandations', en: 'recommendations', es: 'recomendaciones' }[lang] ?? 'recommandations';
  const virgule = lang === 'en' ? '.' : ',';
  return [
    {
      key: 'google',
      name: 'Google',
      logo: null,
      stars: 5,
      score: `5${virgule}0`,
      count: `${GOOGLE_COUNT} ${nb}`,
      url: 'https://maps.google.com/?cid=16956463275848852616',
    },
    {
      key: 'tripadvisor',
      name: 'Tripadvisor',
      logo: '/images/accueil/partners/tripadvisor.webp',
      stars: 5,
      score: `5${virgule}0`,
      count: `${TRIPADVISOR_COUNT} ${nb}`,
      url: TRIPADVISOR_URL[lang] ?? TRIPADVISOR_URL.fr,
    },
    {
      key: 'facebook',
      name: 'Facebook',
      logo: '/images/icons/facebook-square-brands.svg',
      // Icone seule (pas de nom dans le visuel) : on ajoute le mot a cote,
      // sinon elle est moins lisible que le lockup Tripadvisor.
      iconOnly: true,
      // Facebook ne note pas sur 5 : c'est un taux de recommandation.
      // Afficher 5 etoiles ici serait une invention.
      stars: null,
      score: lang === 'en' ? '100%' : '100 %',
      count: `${FACEBOOK_COUNT} ${reco}`,
      url: 'https://www.facebook.com/profile.php?id=100063467443392&sk=reviews',
    },
  ];
}

// --- Titres et accroche ---------------------------------------------------
export const HEADINGS = {
  fr: {
    title: 'Ce qu’en disent ceux qui sont venus',
    big: `${TOTAL_REVIEWS} avis sur trois plateformes`,
    sub: `5,0 de moyenne sur Google et sur Tripadvisor, 100 % de recommandations sur Facebook. Sur les ${GOOGLE_COUNT} avis Google, 52 sont des 5 étoiles.`,
    reply: 'Réponse du centre',
  },
  en: {
    title: 'What the people who came say',
    big: `${TOTAL_REVIEWS} reviews across three platforms`,
    sub: `5.0 average on Google and on Tripadvisor, 100% recommendations on Facebook. Of the ${GOOGLE_COUNT} Google reviews, 52 are five-star.`,
    reply: 'Reply from the centre',
  },
  es: {
    title: 'Lo que dicen quienes ya han venido',
    big: `${TOTAL_REVIEWS} opiniones en tres plataformas`,
    sub: `5,0 de media en Google y en Tripadvisor, 100 % de recomendaciones en Facebook. De las ${GOOGLE_COUNT} opiniones de Google, 52 son de 5 estrellas.`,
    reply: 'Respuesta del centro',
  },
};

// --- Temoignages ----------------------------------------------------------
// ATTENTION aux dates : Google n'affiche que du relatif ("il y a 5 mois").
// Celles-ci sont donc DEDUITES au 11/08/2026, a ~1 mois pres. Guillaume connait
// ses clients : si une date est fausse, la corriger ici.
// Les traductions EN/ES sont signalees comme telles dans le rendu — on ne fait
// pas passer une traduction pour les mots d'origine.
export const QUOTES = [
  {
    platform: 'google',
    author: 'Bénédicte B.',
    badge: null,
    date: { fr: 'mars 2026', en: 'March 2026', es: 'marzo de 2026' },
    text: {
      fr: 'Un séjour inoubliable avec Guillaume, Teresa et la team ! Ce n’est pas un kite center classique car on y trouve en plus une ambiance de partage et de rencontres.',
      en: 'An unforgettable stay with Guillaume, Teresa and the team! This is not a classic kite centre — you also find a real spirit of sharing and of meeting people.',
      es: 'Una estancia inolvidable con Guillaume, Teresa y el equipo. No es un centro de kite clásico: además encuentras un ambiente de convivencia y de encuentros.',
    },
    ownerReply: {
      fr: 'Merci Bénédicte ! Au plaisir de vous revoir avec nous, à très bientôt j’espère !',
      en: 'Thank you Bénédicte! We would love to see you again with us, hopefully very soon!',
      es: '¡Gracias Bénédicte! Estaremos encantados de volver a veros, ¡esperamos que muy pronto!',
    },
  },
  {
    platform: 'google',
    author: 'J. D.',
    badge: { fr: 'Local Guide · 13 avis', en: 'Local Guide · 13 reviews', es: 'Local Guide · 13 opiniones' },
    date: { fr: 'janvier 2026', en: 'January 2026', es: 'enero de 2026' },
    text: {
      fr: 'Apprendre le kitesurf à Bilene est un vrai bonheur. Le spot est idéal, l’ambiance est détendue et les instructeurs sont passionnés. Sécurité et plaisir sont au rendez-vous.',
      en: 'Learning to kitesurf in Bilene is a pure joy. The spot is ideal, the atmosphere is relaxed and the instructors are passionate. Safety and fun are both there.',
      es: 'Aprender kitesurf en Bilene es una auténtica gozada. El spot es ideal, el ambiente es relajado y los monitores son apasionados. Seguridad y disfrute van de la mano.',
    },
    ownerReply: null,
  },
  {
    platform: 'facebook',
    author: 'Hervé L.',
    badge: null,
    date: { fr: 'décembre 2025', en: 'December 2025', es: 'diciembre de 2025' },
    text: {
      fr: 'C’est l’idéal pour apprendre le kite ou la wing : on a pied sur une partie du lagon et l’encadrement est sympa et sérieux. […] C’est à mon sens le meilleur spot de la région.',
      en: 'Perfect to learn kite or wing: you can stand up in part of the lagoon and the coaching is friendly and serious. […] In my view it is the best spot in the region.',
      es: 'Es ideal para aprender kite o wing: se hace pie en una parte de la laguna y el equipo es cercano y serio. […] En mi opinión, es el mejor spot de la región.',
    },
    ownerReply: null,
  },
];

// Mention de traduction (les avis sont tous en francais a l'origine).
export const TRANSLATED_NOTE = {
  fr: null,
  en: 'translated from French',
  es: 'traducido del francés',
};
