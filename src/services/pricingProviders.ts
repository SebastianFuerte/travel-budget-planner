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
  ) => string;
}

export const FLIGHT_PROVIDERS: FlightProvider[] = [
  {
    id: 'google_flights',
    name: 'Google Flights',
    icon: '✈️',
    getSearchUrl: (dest, country, start, end, people) => {
      return `https://www.google.com/travel/flights?q=flights+to+${encodeSearch(dest + ' ' + country)}&d=${formatDateForUrl(start)}&r=${formatDateForUrl(end)}&px=${people}`;
    },
  },
  {
    id: 'skyscanner',
    name: 'Skyscanner',
    icon: '🔍',
    getSearchUrl: (dest, country, start, end, people) => {
      const from = formatDateForUrl(start).replace(/-/g, '');
      const to = formatDateForUrl(end).replace(/-/g, '');
      return `https://www.skyscanner.com/transport/flights/anywhere/${encodeSearch(dest)}/${from}/${to}/?adults=${people}`;
    },
  },
  {
    id: 'kayak',
    name: 'Kayak',
    icon: '🛩️',
    getSearchUrl: (dest, country, start, end, people) => {
      return `https://www.kayak.com/flights/anywhere-${encodeSearch(dest)}/${formatDateForUrl(start)}/${formatDateForUrl(end)}/${people}adults`;
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
