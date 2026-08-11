// ============================================================================
//  DONNÉES STRUCTURÉES Schema.org (JSON-LD)
// ----------------------------------------------------------------------------
//  Centralisé ici pour rester cohérent sur tout le site et dans toutes les
//  langues. Lu en priorité par Google (rich results) ET par les IA/LLM
//  (ChatGPT, Perplexity, Claude...) pour comprendre FACTUELLEMENT le centre.
// ============================================================================
import { SITE, routesFor } from './pages.js';
import { WHATSAPP_E164 } from './whatsapp.js';
import { GOOGLE_RATING, GOOGLE_COUNT } from './reviews.js';

// Profils officiels du centre (preuve sociale hors-site, lue par Google et les IA).
const SAMEAS = [
  'https://www.facebook.com/profile.php?id=100063467443392',
  'https://www.tripadvisor.com/Attraction_Review-g1597322-d15360648-Reviews-Bilene_Kite_Center-Bilene_Gaza_Province.html',
  'https://maps.google.com/?cid=16956463275848852616',
];

const SLOGAN = {
  fr: 'Spot de kitesurf et wingfoil vierge dans une lagune paradisiaque au Mozambique.',
  en: 'Pristine kitesurf and wingfoil spot in a paradise lagoon in Mozambique.',
  es: 'Spot de kitesurf y wingfoil virgen en una laguna paradisíaca de Mozambique.',
};

// Établissement principal (LocalBusiness spécialisé sports nautiques).
export function businessJsonLd(lang = 'fr') {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    '@id': `${SITE}/#business`,
    name: 'Bilene Kite Center',
    description: SLOGAN[lang] ?? SLOGAN.fr,
    url: SITE,
    image: `${SITE}/images/accueil/1.webp`,
    logo: `${SITE}/favicon.ico`,
    email: 'contact@bilenekite.com',
    // PAS DE NUMERO PERSONNEL ICI. Ce bloc est publie sur ~47 pages et sert a
    // etre lu par les machines (Google, IA, aspirateurs de numeros).
    // Seul numero autorise : le WhatsApp Business du centre, joignable toute
    // l'annee (WhatsApp passe par internet, pas par le reseau mozambicain).
    telephone: WHATSAPP_E164,
    sport: ['Kitesurfing', 'Wingfoil', 'Stand up paddleboarding'],
    currenciesAccepted: 'EUR',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bilene (Praia do Bilene)',
      addressRegion: 'Gaza',
      addressCountry: 'MZ',
    },
    // Position du centre sur la lagune (25°16'57.1"S 33°15'37.8"E).
    geo: { '@type': 'GeoCoordinates', latitude: -25.28253, longitude: 33.26050 },
    areaServed: 'Mozambique',
    // Note agregee, lue depuis reviews.js (source unique, partagee avec le
    // composant <Reviews>) : on ne peut pas avoir de divergence entre le
    // balisage et ce qui est affiche sur la page.
    // On s'en tient a UNE plateforme reelle — additionner Google et TripAdvisor
    // fabriquerait un total qui n'existe nulle part.
    // Rappel : Google n'affiche PAS d'etoiles pour un LocalBusiness qui publie
    // sa propre note (regle des avis "self-serving", 2019). Ce bloc sert a la
    // comprehension de l'entite par Google et les IA, pas au rich result.
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: GOOGLE_RATING,
      reviewCount: GOOGLE_COUNT,
      bestRating: '5',
      worstRating: '1',
    },
    // Saison d'ouverture : septembre → mars.
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      validFrom: '2025-09-01',
      validThrough: '2026-03-31',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    }],
    sameAs: SAMEAS,
  };
}

// Bloc Organisation réutilisable (peut être combiné au-dessus dans un @graph).
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: 'Bilene Kite Center',
    url: SITE,
    logo: `${SITE}/favicon.ico`,
    email: 'contact@bilenekite.com',
    sameAs: SAMEAS,
  };
}

// Article de blog (BlogPosting). `page` = clé dans PAGES, `lang` = langue.
// L'URL canonique + l'image sont dérivées automatiquement (cohérent avec <Seo>).
export function blogPostingJsonLd(page, lang, { headline, description, image, datePublished, dateModified }) {
  const path = routesFor(page)[lang];
  const url = path ? SITE + encodeURI(path) : SITE;
  const img = image.startsWith('http') ? image : SITE + image;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    image: img,
    inLanguage: lang,
    datePublished,
    dateModified: dateModified ?? datePublished,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: 'Bilene Kite Center', url: SITE },
    publisher: {
      '@type': 'Organization',
      name: 'Bilene Kite Center',
      logo: { '@type': 'ImageObject', url: `${SITE}/favicon.ico` },
    },
  };
}

// Génère un FAQPage à partir d'une liste [{ q, a }] (pour la page Préparation).
export function faqJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}
