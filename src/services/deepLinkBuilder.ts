// src/services/deepLinkBuilder.ts
// Builds deep links with correct dates, params, and occupancy for each provider
// Each builder returns { url, params, provider, limitations }
//
// AFFILIATE IDs — replace with your real IDs after signing up:
//   Booking.com:   https://www.booking.com/affiliate-program/
//   Skyscanner:    https://partners.skyscanner.net/
//   GetYourGuide:  https://partner.getyourguide.com/
//   Viator:        https://www.tripadvisor.com/affiliates
const AFFILIATE = {
  booking:      '', // e.g. '1234567'
  skyscanner:   '', // e.g. 'MY_PARTNER_ID'
  getYourGuide: '', // e.g. 'ABCDE'
  viator:       '', // e.g. 'MY_VIATOR_ID'
};

export interface DeepLinkResult {
  url: string;
  params: Record<string, string>;
  provider: string;
  limitations?: string;
}

interface AccommodationParams {
  city: string;
  country: string;
  checkin: Date;
  checkout: Date;
  guests: number;
  rooms?: number;
}

interface FlightParams {
  originCity: string;
  destCity: string;
  destCountry: string;
  departDate: Date;
  returnDate: Date;
  passengers: number;
}

interface ActivityParams {
  city: string;
  country: string;
  date?: Date;
}

// --- Helpers ---

export const formatDate = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const formatDateCompact = (d: Date): string => {
  return formatDate(d).replace(/-/g, '');
};

const enc = (s: string) => encodeURIComponent(s);

// --- Accommodation Builders ---

export const buildBookingLink = (p: AccommodationParams): DeepLinkResult => {
  const checkin = formatDate(p.checkin);
  const checkout = formatDate(p.checkout);
  const aid = AFFILIATE.booking ? `&aid=${AFFILIATE.booking}` : '';
  const url = `https://www.booking.com/searchresults.html?ss=${enc(p.city + ', ' + p.country)}&checkin=${checkin}&checkout=${checkout}&group_adults=${p.guests}&no_rooms=${p.rooms || 1}${aid}`;
  return {
    url,
    params: { ss: p.city, checkin, checkout, guests: String(p.guests) },
    provider: 'Booking.com',
  };
};

export const buildHostelworldLink = (p: AccommodationParams): DeepLinkResult => {
  const dateFrom = formatDate(p.checkin);
  const dateTo = formatDate(p.checkout);
  const url = `https://www.hostelworld.com/s?q=${enc(p.city + ', ' + p.country)}&dateFrom=${dateFrom}&dateTo=${dateTo}&guests=${p.guests}`;
  return {
    url,
    params: { q: p.city, dateFrom, dateTo, guests: String(p.guests) },
    provider: 'Hostelworld',
  };
};

export const buildAirbnbLink = (p: AccommodationParams): DeepLinkResult => {
  const checkin = formatDate(p.checkin);
  const checkout = formatDate(p.checkout);
  const url = `https://www.airbnb.com/s/${enc(p.city + '--' + p.country)}/homes?checkin=${checkin}&checkout=${checkout}&adults=${p.guests}`;
  return {
    url,
    params: { location: p.city, checkin, checkout, adults: String(p.guests) },
    provider: 'Airbnb',
  };
};

// --- Flight Builders ---

export const buildGoogleFlightsLink = (p: FlightParams): DeepLinkResult => {
  // Google Flights: query-based URL. Dates may not always stick in the UI.
  // The `tfs` parameter format is undocumented and fragile.
  // Fallback: use readable q= format with dates as query hints.
  const depart = formatDate(p.departDate);
  const ret = formatDate(p.returnDate);
  const url = `https://www.google.com/travel/flights?q=flights+from+${enc(p.originCity)}+to+${enc(p.destCity + ' ' + p.destCountry)}&d=${depart}&r=${ret}&px=${p.passengers}`;
  return {
    url,
    params: { from: p.originCity, to: p.destCity, depart, return: ret, px: String(p.passengers) },
    provider: 'Google Flights',
    limitations: 'Google Flights may not always preserve date parameters from deep links. If dates are wrong, use the date picker on the Google Flights page, or try Skyscanner/Kayak instead.',
  };
};

export const buildSkyscannerLink = (p: FlightParams): DeepLinkResult => {
  const depart = formatDateCompact(p.departDate);
  const ret = formatDateCompact(p.returnDate);
  const origin = enc(p.originCity.toLowerCase().replace(/\s+/g, '-'));
  const dest = enc(p.destCity.toLowerCase().replace(/\s+/g, '-'));
  const partner = AFFILIATE.skyscanner ? `&associateid=${AFFILIATE.skyscanner}` : '';
  const url = `https://www.skyscanner.com/transport/flights/${origin}/${dest}/${depart}/${ret}/?adults=${p.passengers}${partner}`;
  return {
    url,
    params: { from: p.originCity, to: p.destCity, depart, return: ret, adults: String(p.passengers) },
    provider: 'Skyscanner',
  };
};

export const buildKayakLink = (p: FlightParams): DeepLinkResult => {
  const depart = formatDate(p.departDate);
  const ret = formatDate(p.returnDate);
  const origin = enc(p.originCity);
  const dest = enc(p.destCity);
  const url = `https://www.kayak.com/flights/${origin}-${dest}/${depart}/${ret}/${p.passengers}adults`;
  return {
    url,
    params: { from: p.originCity, to: p.destCity, depart, return: ret, passengers: String(p.passengers) },
    provider: 'Kayak',
  };
};

// --- Activity Builders ---

export const buildGetYourGuideLink = (p: ActivityParams): DeepLinkResult => {
  const partner = AFFILIATE.getYourGuide ? `&partner_id=${AFFILIATE.getYourGuide}` : '';
  const url = `https://www.getyourguide.com/s/?q=${enc(p.city + ' ' + p.country)}${p.date ? '&date_from=' + formatDate(p.date) : ''}${partner}`;
  return {
    url,
    params: { q: p.city + ' ' + p.country },
    provider: 'GetYourGuide',
  };
};

export const buildViatorLink = (p: ActivityParams): DeepLinkResult => {
  const pid = AFFILIATE.viator ? `&pid=${AFFILIATE.viator}` : '';
  const url = `https://www.viator.com/searchResults/all?text=${enc(p.city + ' ' + p.country)}${pid}`;
  return {
    url,
    params: { text: p.city + ' ' + p.country },
    provider: 'Viator',
  };
};

// --- Unified Builder ---

export type AccommodationProvider = 'booking' | 'hostelworld' | 'airbnb';
export type FlightProviderType = 'google_flights' | 'skyscanner' | 'kayak';

export const buildAccommodationLink = (
  provider: AccommodationProvider,
  params: AccommodationParams
): DeepLinkResult => {
  switch (provider) {
    case 'booking': return buildBookingLink(params);
    case 'hostelworld': return buildHostelworldLink(params);
    case 'airbnb': return buildAirbnbLink(params);
  }
};

export const buildFlightLink = (
  provider: FlightProviderType,
  params: FlightParams
): DeepLinkResult => {
  switch (provider) {
    case 'google_flights': return buildGoogleFlightsLink(params);
    case 'skyscanner': return buildSkyscannerLink(params);
    case 'kayak': return buildKayakLink(params);
  }
};
