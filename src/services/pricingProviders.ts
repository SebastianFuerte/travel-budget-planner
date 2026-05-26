// src/services/pricingProviders.ts
// Deep link providers for accommodation, activities, and other categories
// LinksOnly mode: no scraping, just deep links for the user to check manually

import { PricingProvider, BudgetCategories } from '../types';

const formatDateForUrl = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const encodeSearch = (text: string): string => encodeURIComponent(text);

// Converts "Bogotá, Colombia" → "bogota" for URL path segments
const slugify = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')     // spaces/special chars → hyphen
    .replace(/^-|-$/g, '');          // trim leading/trailing hyphens

export const PRICING_PROVIDERS: PricingProvider[] = [
  // --- ACCOMMODATION ---
  {
    id: 'booking',
    name: 'Booking.com',
    icon: '🏨',
    categories: ['accommodation'],
    getSearchUrl: (city, country, startDate, endDate, people) => {
      const checkin = formatDateForUrl(startDate);
      const checkout = formatDateForUrl(endDate);
      return `https://www.booking.com/searchresults.html?ss=${encodeSearch(city + ', ' + country)}&checkin=${checkin}&checkout=${checkout}&group_adults=${people}`;
    },
  },
  {
    id: 'hostelworld',
    name: 'Hostelworld',
    icon: '🛏️',
    categories: ['accommodation'],
    getSearchUrl: (city, country, startDate, endDate, people) => {
      const dateFrom = formatDateForUrl(startDate);
      const dateTo = formatDateForUrl(endDate);
      return `https://www.hostelworld.com/s?q=${encodeSearch(city + ', ' + country)}&dateFrom=${dateFrom}&dateTo=${dateTo}&guests=${people}`;
    },
  },
  {
    id: 'airbnb',
    name: 'Airbnb',
    icon: '🏠',
    categories: ['accommodation'],
    getSearchUrl: (city, country, startDate, endDate, people) => {
      const checkin = formatDateForUrl(startDate);
      const checkout = formatDateForUrl(endDate);
      return `https://www.airbnb.com/s/${encodeSearch(city + '--' + country)}/homes?checkin=${checkin}&checkout=${checkout}&adults=${people}`;
    },
  },
  // --- ACTIVITIES ---
  {
    id: 'getyourguide',
    name: 'GetYourGuide',
    icon: '🎯',
    categories: ['activities'],
    getSearchUrl: (city, country) => {
      return `https://www.getyourguide.com/s/?q=${encodeSearch(city + ' ' + country)}`;
    },
  },
  {
    id: 'viator',
    name: 'Viator',
    icon: '🗺️',
    categories: ['activities'],
    getSearchUrl: (city, country) => {
      return `https://www.viator.com/searchResults/all?text=${encodeSearch(city + ' ' + country)}`;
    },
  },
  // --- FOOD ---
  {
    id: 'tripadvisor_food',
    name: 'TripAdvisor Restaurants',
    icon: '🍽️',
    categories: ['food'],
    getSearchUrl: (city, country) => {
      return `https://www.tripadvisor.com/Search?q=${encodeSearch(city + ' ' + country + ' restaurants')}`;
    },
  },
  // --- TRANSPORT ---
  {
    id: 'rome2rio',
    name: 'Rome2Rio',
    icon: '🚌',
    categories: ['localTransport'],
    getSearchUrl: (city, country) => {
      return `https://www.rome2rio.com/s/${encodeSearch(city)}`;
    },
  },
  // --- INSURANCE ---
  {
    id: 'worldnomads',
    name: 'World Nomads',
    icon: '🛡️',
    categories: ['insurance'],
    getSearchUrl: (city, country, startDate, endDate) => {
      return `https://www.worldnomads.com/travel-insurance/?destination=${encodeSearch(country)}`;
    },
  },
  {
    id: 'safetywing',
    name: 'SafetyWing',
    icon: '🏥',
    categories: ['insurance'],
    getSearchUrl: () => {
      return 'https://safetywing.com/nomad-insurance/';
    },
  },
];

// --- FLIGHT PROVIDERS ---

export interface FlightProvider {
  id: string;
  name: string;
  icon: string;
  getSearchUrl: (
    destCity: string,
    destCountry: string,
    startDate: Date,
    endDate: Date,
    people: number,
    originIATA?: string,   // IATA code of departure airport (e.g. BOG)
    originCity?: string,   // Display name for fallback
  ) => string;
}

export const FLIGHT_PROVIDERS: FlightProvider[] = [
  {
    id: 'google_flights',
    name: 'Google Flights',
    icon: '✈️',
    getSearchUrl: (dest, country, start, end, people, originIATA, originCity) => {
      // Google Flights: accepts free text, works great with IATA codes too
      const from = originCity || originIATA || '';
      const q = from
        ? `${from} to ${dest} ${country} flights`
        : `flights to ${dest} ${country}`;
      return `https://www.google.com/travel/flights?q=${encodeSearch(q)}`;
    },
  },
  {
    id: 'skyscanner',
    name: 'Skyscanner',
    icon: '🔍',
    getSearchUrl: (dest, country, start, end, people, originIATA) => {
      // Skyscanner path format requires IATA codes — now reliable!
      const from = originIATA || 'anywhere';
      const depart = formatDateForUrl(start).replace(/-/g, '');
      const ret    = formatDateForUrl(end).replace(/-/g, '');
      const destSlug = slugify(dest);
      if (originIATA) {
        return `https://www.skyscanner.com/transport/flights/${originIATA.toLowerCase()}/${destSlug}/${depart}/${ret}/?adults=${people}&cabinclass=economy`;
      }
      return `https://www.skyscanner.com/transport/flights/anywhere/${destSlug}/${depart}/${ret}/?adults=${people}&cabinclass=economy`;
    },
  },
  {
    id: 'kayak',
    name: 'Kayak',
    icon: '🛩️',
    getSearchUrl: (dest, country, start, end, people, originIATA) => {
      // Kayak path: /flights/BOG/NRT/2025-05-10/2025-05-20/2adults — IATA required
      const destSlug = slugify(dest);
      const depart = formatDateForUrl(start);
      const ret    = formatDateForUrl(end);
      if (originIATA) {
        return `https://www.kayak.com/flights/${originIATA}/${destSlug}/${depart}/${ret}/${people}adults`;
      }
      return `https://www.kayak.com/flights/anywhere/${destSlug}/${depart}/${ret}/${people}adults`;
    },
  },
  {
    id: 'kiwi',
    name: 'Kiwi.com',
    icon: '🥝',
    getSearchUrl: (dest, country, start, end, people, originIATA, originCity) => {
      // Kiwi works well with IATA or city names
      const from = originIATA || originCity || 'Anywhere';
      const depart = formatDateForUrl(start);
      const ret    = formatDateForUrl(end);
      return `https://www.kiwi.com/en/search/results/${encodeSearch(from)}/${encodeSearch(dest)}/${depart}/${ret}?adults=${people}&cabinClass=economy`;
    },
  },
];

/** Get providers for a specific budget category */
export const getProvidersForCategory = (category: keyof BudgetCategories): PricingProvider[] => {
  return PRICING_PROVIDERS.filter(p => p.categories.includes(category));
};

/** Get all unique categories that have providers */
export const getCategoriesWithProviders = (): (keyof BudgetCategories)[] => {
  const categories = new Set<keyof BudgetCategories>();
  PRICING_PROVIDERS.forEach(p => p.categories.forEach(c => categories.add(c)));
  return Array.from(categories);
};

/** Generate deep link URL for a provider */
export const getProviderUrl = (
  provider: PricingProvider,
  city: string,
  country: string,
  startDate: Date,
  endDate: Date,
  people: number,
): string => {
  return provider.getSearchUrl(city, country, startDate, endDate, people);
};
