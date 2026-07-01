// ============================================================================
//  PLAN DE ROUTES MULTILINGUE — SOURCE DE VÉRITÉ UNIQUE
// ----------------------------------------------------------------------------
//  Ce fichier relie chaque page logique à ses URL dans chaque langue.
//  Il alimente le composant <Seo> : canonical, hreflang, og:locale.
//
//  POUR AJOUTER UNE LANGUE (ex. allemand "de") :
//    1. Ajouter 'de' dans LANGS et son locale dans LOCALES.
//    2. Ajouter la clé "de" + le slug dans CHAQUE entrée de PAGES ci-dessous.
//    3. Créer les fichiers de pages /src/pages/de/... avec <Seo lang="de" ... />.
//  → Le hreflang de tout le site se met à jour automatiquement.
//
//  Si une traduction n'existe pas encore, on OMET simplement la langue dans
//  l'entrée concernée (ex. "legal" n'a pas encore d'espagnol).
// ============================================================================

// Domaine canonique de production (les balises canonical/hreflang/og DOIVENT
// toujours pointer ici, quelle que soit la cible de build).
export const SITE = 'https://www.bilenekite.com';

export const LANGS = ['fr', 'en', 'es'];
export const DEFAULT_LANG = 'fr';

// Locales pour og:locale (et raffinement hreflang régional si besoin un jour).
export const LOCALES = {
  fr: 'fr_FR',
  en: 'en_GB',
  es: 'es_ES',
};

// Une entrée par page logique. Clé = identifiant stable (indépendant de la langue).
export const PAGES = {
  home:        { fr: '/',                                                              en: '/en/',                                              es: '/es/' },
  spot:        { fr: '/fr/le-spot-de-bilene-au-mozambique',                            en: '/en/the-kitesurf-spot-in-bilene-mozambique',       es: '/es/el-spot-de-kitesurf-en-bilene-mozambique' },
  center:      { fr: '/fr/le-centre-de-kite-au-mozambique',                            en: '/en/the-kite-center-in-bilene-mozambique',         es: '/es/centro-de-kite-in-bilene-mozambique' },
  school:      { fr: '/fr/ecole-de-kite-au-mozambique',                                en: '/en/kiteschool-in-bilene-mozambique',              es: '/es/escuela-de-kitesurf-en-bilene-mozambique' },
  trips:       { fr: '/fr/trip-kite-au-mozambique',                                    en: '/en/kite-trips-in-mozambique',                     es: '/es/kite-trip-en-mozambique' },
  video:       { fr: '/fr/video-pro-au-mozambique',                                    en: '/en/video-professional-mozambique',                es: '/es/video-professionale-mozambique' },
  gallery:     { fr: '/fr/galerie-photos-video-bilene-kite-mozambique',                en: '/en/gallery-pictures-videos-bilene-kite-mozambique', es: '/es/galeria-photos-video-bilene-kite-mozambique' },
  prices:      { fr: '/fr/les-prix-bilene-kite-center',                                en: '/en/services-prices-bilene-kitesurf-mozambique',   es: '/es/services-precios-bilene-kitesurf-mozambique' },
  activities:  { fr: '/fr/activites-a-bilene-sorties-visites-ballades-exploration',    en: '/en/activities-in-bilene-outings-visits-exploration', es: '/es/actividades-en-bilene-excursiones-visitas-exploracion' },
  safari:      { fr: '/fr/les-safari-au-kruger-et-réserves-naturelles-au-mozambique', en: '/en/safaris-kruger-park-natural-reserves-mozambique', es: '/es/safaris-kruger-reservas-naturales-mozambique' },
  lodging:     { fr: '/fr/les-logements-a-bilene-au-mozambique',                       en: '/en/lodging-in-bilene-mozambique',                 es: '/es/alojamiento-en-bilene-mozambique' },
  restaurants: { fr: '/fr/les-sorties-et-restaurants-a-bilene-au-mozambique',          en: '/en/restaurants-and-dining-in-bilene-mozambique',  es: '/es/restaurantes-y-salidas-en-bilene-mozambique' },
  info:        { fr: '/fr/infos-mozambique',                                           en: '/en/information-mozambique',                       es: '/es/informaciones-mozambique' },
  prepare:     { fr: '/fr/La-préparation-de-votre-voyage-a-bilene-au-mozambique',      en: '/en/prepare-your-trip-to-bilene-mozambique',       es: '/es/preparar-tu-viaje-a-bilene-mozambique' },
  legal:       { fr: '/fr/mentions-légales',                                           en: '/en/legal-notice' /* es: à créer */ },

  // Blog : une entrée par article (clé stable, indépendante du slug par langue).
  blog:         { fr: '/fr/blog',          en: '/en/blog',          es: '/es/blog' },
  blogMassages: { fr: '/fr/blog/bienvenue', en: '/en/blog/welcome',  es: '/es/blog/bienvenida' },
  blogAvion:    { fr: '/fr/blog/enavion',   en: '/en/blog/by-plane', es: '/es/blog/en-avion' },
  blogDestinations: { fr: '/fr/blog/nouvelles-destinations-kitesurf', en: '/en/blog/new-kitesurf-destinations', es: '/es/blog/nuevos-destinos-kitesurf' },
};

// Helper : renvoie l'entrée de routes d'une page (ou {} si inconnue).
export function routesFor(page) {
  return PAGES[page] ?? {};
}
