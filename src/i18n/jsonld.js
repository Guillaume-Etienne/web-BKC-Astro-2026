// ============================================================================
//  DONNÉES STRUCTURÉES Schema.org (JSON-LD)
// ----------------------------------------------------------------------------
//  Centralisé ici pour rester cohérent sur tout le site et dans toutes les
//  langues. Lu en priorité par Google (rich results) ET par les IA/LLM
//  (ChatGPT, Perplexity, Claude...) pour comprendre FACTUELLEMENT le centre.
//
//  ⚠️ À COMPLÉTER PAR GUILLAUME (valeurs marquées TODO) :
//    - telephone   : numéro WhatsApp/contact public
//    - geo         : coordonnées GPS exactes du centre sur la lagune
//    - sameAs      : URLs Facebook / Instagram / YouTube réelles
//  Mettre une valeur fausse est pire que de l'omettre : si inconnu, retirer la ligne.
// ============================================================================
import { SITE } from './pages.js';

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
    // telephone: '+258 XX XXX XXXX', // TODO Guillaume
    sport: ['Kitesurfing', 'Wingfoil', 'Stand up paddleboarding'],
    currenciesAccepted: 'EUR',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bilene (Praia do Bilene)',
      addressRegion: 'Gaza',
      addressCountry: 'MZ',
    },
    // geo: { '@type': 'GeoCoordinates', latitude: -25.28, longitude: 33.24 }, // TODO coords exactes
    areaServed: 'Mozambique',
    // Saison d'ouverture : septembre → mars.
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      validFrom: '2025-09-01',
      validThrough: '2026-03-31',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    }],
    // sameAs: [ 'https://www.facebook.com/...', 'https://www.instagram.com/...' ], // TODO réseaux sociaux
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
