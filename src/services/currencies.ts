// src/services/currencies.ts
// Complete ISO 4217 currency dataset with country mappings
// Used for smart currency suggestion based on country/locale

import { Currency } from '../types';

export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  countries: string[];  // Country names that use this currency
}

// Comprehensive currency list (most-used first, then alphabetical)
export const ALL_CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', countries: ['USA', 'United States', 'Puerto Rico', 'Ecuador', 'El Salvador', 'Panama'] },
  { code: 'EUR', name: 'Euro', symbol: '€', countries: ['Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Austria', 'Portugal', 'Ireland', 'Finland', 'Greece', 'Slovakia', 'Slovenia', 'Estonia', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Cyprus', 'Croatia'] },
  { code: 'GBP', name: 'British Pound', symbol: '£', countries: ['UK', 'United Kingdom', 'England', 'Scotland', 'Wales'] },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', countries: ['Japan'] },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', countries: ['China'] },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', countries: ['South Korea', 'Korea'] },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', countries: ['India'] },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', countries: ['Australia'] },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', countries: ['Canada'] },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', countries: ['Switzerland'] },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', countries: ['Mexico'] },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', countries: ['Brazil'] },
  { code: 'COP', name: 'Colombian Peso', symbol: '$', countries: ['Colombia'] },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', countries: ['Argentina'] },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', countries: ['Chile'] },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', countries: ['Peru'] },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', countries: ['Thailand'] },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', countries: ['Vietnam'] },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', countries: ['Indonesia'] },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', countries: ['Malaysia'] },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', countries: ['Singapore'] },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', countries: ['Philippines'] },
  { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$', countries: ['Taiwan'] },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', countries: ['Hong Kong'] },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', countries: ['New Zealand'] },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', countries: ['Sweden'] },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', countries: ['Norway'] },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', countries: ['Denmark'] },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', countries: ['Poland'] },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', countries: ['Czech Republic', 'Czechia'] },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', countries: ['Hungary'] },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', countries: ['Romania'] },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', countries: ['Bulgaria'] },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', countries: ['Turkey', 'Türkiye'] },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', countries: ['South Africa'] },
  { code: 'EGP', name: 'Egyptian Pound', symbol: '£', countries: ['Egypt'] },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'MAD', countries: ['Morocco'] },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', countries: ['Nigeria'] },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', countries: ['Kenya'] },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', countries: ['UAE', 'United Arab Emirates', 'Dubai'] },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', countries: ['Saudi Arabia'] },
  { code: 'QAR', name: 'Qatari Riyal', symbol: '﷼', countries: ['Qatar'] },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', countries: ['Israel'] },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', countries: ['Russia'] },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', countries: ['Ukraine'] },
  { code: 'ISK', name: 'Icelandic Krona', symbol: 'kr', countries: ['Iceland'] },
  { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn', countries: [] }, // Croatia uses EUR now but kept for legacy
  { code: 'GEL', name: 'Georgian Lari', symbol: '₾', countries: ['Georgia'] },
  { code: 'UYU', name: 'Uruguayan Peso', symbol: '$U', countries: ['Uruguay'] },
  { code: 'BOB', name: 'Bolivian Boliviano', symbol: 'Bs', countries: ['Bolivia'] },
  { code: 'PYG', name: 'Paraguayan Guarani', symbol: '₲', countries: ['Paraguay'] },
  { code: 'DOP', name: 'Dominican Peso', symbol: 'RD$', countries: ['Dominican Republic'] },
  { code: 'CRC', name: 'Costa Rican Colon', symbol: '₡', countries: ['Costa Rica'] },
  { code: 'GTQ', name: 'Guatemalan Quetzal', symbol: 'Q', countries: ['Guatemala'] },
  { code: 'JMD', name: 'Jamaican Dollar', symbol: 'J$', countries: ['Jamaica'] },
  { code: 'TTD', name: 'Trinidad Dollar', symbol: 'TT$', countries: ['Trinidad and Tobago'] },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: '₨', countries: ['Sri Lanka'] },
  { code: 'NPR', name: 'Nepalese Rupee', symbol: '₨', countries: ['Nepal'] },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', countries: ['Pakistan'] },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', countries: ['Bangladesh'] },
  { code: 'MMK', name: 'Myanmar Kyat', symbol: 'K', countries: ['Myanmar'] },
  { code: 'KHR', name: 'Cambodian Riel', symbol: '៛', countries: ['Cambodia'] },
  { code: 'LAK', name: 'Lao Kip', symbol: '₭', countries: ['Laos'] },
  { code: 'FJD', name: 'Fijian Dollar', symbol: 'FJ$', countries: ['Fiji'] },
  { code: 'XOF', name: 'West African CFA', symbol: 'CFA', countries: ['Senegal', 'Ivory Coast', 'Mali', 'Burkina Faso', 'Niger', 'Togo', 'Benin'] },
  { code: 'XAF', name: 'Central African CFA', symbol: 'FCFA', countries: ['Cameroon', 'Gabon', 'Congo', 'Chad'] },
];

// Locale → currency mapping (device locale prefix → currency code)
const LOCALE_CURRENCY_MAP: Record<string, string> = {
  'en-US': 'USD', 'en-GB': 'GBP', 'en-AU': 'AUD', 'en-CA': 'CAD', 'en-NZ': 'NZD',
  'en-IN': 'INR', 'en-SG': 'SGD', 'en-HK': 'HKD', 'en-ZA': 'ZAR', 'en-NG': 'NGN',
  'es-CO': 'COP', 'es-MX': 'MXN', 'es-AR': 'ARS', 'es-CL': 'CLP', 'es-PE': 'PEN',
  'es-ES': 'EUR', 'es-UY': 'UYU', 'es-BO': 'BOB', 'es-CR': 'CRC', 'es-GT': 'GTQ',
  'es-DO': 'DOP', 'es-PY': 'PYG',
  'pt-BR': 'BRL', 'pt-PT': 'EUR',
  'fr-FR': 'EUR', 'fr-CA': 'CAD', 'fr-CH': 'CHF', 'fr-BE': 'EUR',
  'de-DE': 'EUR', 'de-AT': 'EUR', 'de-CH': 'CHF',
  'it-IT': 'EUR', 'nl-NL': 'EUR', 'pl-PL': 'PLN', 'cs-CZ': 'CZK', 'hu-HU': 'HUF',
  'ro-RO': 'RON', 'bg-BG': 'BGN', 'hr-HR': 'EUR', 'sk-SK': 'EUR',
  'sv-SE': 'SEK', 'nb-NO': 'NOK', 'da-DK': 'DKK', 'fi-FI': 'EUR', 'is-IS': 'ISK',
  'ja-JP': 'JPY', 'zh-CN': 'CNY', 'zh-TW': 'TWD', 'zh-HK': 'HKD',
  'ko-KR': 'KRW', 'th-TH': 'THB', 'vi-VN': 'VND', 'id-ID': 'IDR', 'ms-MY': 'MYR',
  'tl-PH': 'PHP', 'hi-IN': 'INR', 'bn-BD': 'BDT', 'ne-NP': 'NPR', 'ur-PK': 'PKR',
  'tr-TR': 'TRY', 'ar-SA': 'SAR', 'ar-AE': 'AED', 'ar-EG': 'EGP', 'ar-MA': 'MAD',
  'he-IL': 'ILS', 'ru-RU': 'RUB', 'uk-UA': 'UAH', 'ka-GE': 'GEL',
};

/** Get currency code for a country name */
export const getCurrencyForCountry = (country: string): string | null => {
  const lower = country.toLowerCase();
  for (const cur of ALL_CURRENCIES) {
    if (cur.countries.some(c => c.toLowerCase() === lower)) {
      return cur.code;
    }
  }
  return null;
};

/** Get suggested currency based on user context */
export const getSuggestedCurrency = (params: {
  userLocale?: string;
  selectedCountry?: string;
  selectedCity?: string;
}): string => {
  // 1. Country-based suggestion (highest priority)
  if (params.selectedCountry) {
    const countryCurrency = getCurrencyForCountry(params.selectedCountry);
    if (countryCurrency) return countryCurrency;
  }

  // 2. Locale-based suggestion
  if (params.userLocale) {
    // Try exact match first
    if (LOCALE_CURRENCY_MAP[params.userLocale]) {
      return LOCALE_CURRENCY_MAP[params.userLocale];
    }
    // Try language prefix
    const lang = params.userLocale.split('-')[0];
    const match = Object.entries(LOCALE_CURRENCY_MAP).find(([k]) => k.startsWith(lang + '-'));
    if (match) return match[1];
  }

  // 3. Fallback
  return 'USD';
};

/** Get ordered currency list: suggested first, then USD, then rest alphabetically */
export const getOrderedCurrencies = (suggestedCode: string): CurrencyInfo[] => {
  const result: CurrencyInfo[] = [];
  const added = new Set<string>();

  // 1. Suggested currency first
  const suggested = ALL_CURRENCIES.find(c => c.code === suggestedCode);
  if (suggested) {
    result.push(suggested);
    added.add(suggested.code);
  }

  // 2. USD second (if not already added)
  if (!added.has('USD')) {
    const usd = ALL_CURRENCIES.find(c => c.code === 'USD');
    if (usd) {
      result.push(usd);
      added.add('USD');
    }
  }

  // 3. EUR third (if not already added)
  if (!added.has('EUR')) {
    const eur = ALL_CURRENCIES.find(c => c.code === 'EUR');
    if (eur) {
      result.push(eur);
      added.add('EUR');
    }
  }

  // 4. Rest alphabetically by code
  const rest = ALL_CURRENCIES
    .filter(c => !added.has(c.code))
    .sort((a, b) => a.code.localeCompare(b.code));
  result.push(...rest);

  return result;
};

/** Search currencies by query (code, name, or country) */
export const searchCurrencies = (currencies: CurrencyInfo[], query: string): CurrencyInfo[] => {
  if (!query.trim()) return currencies;
  const q = query.toLowerCase().trim();
  return currencies.filter(c =>
    c.code.toLowerCase().includes(q) ||
    c.name.toLowerCase().includes(q) ||
    c.symbol.toLowerCase().includes(q) ||
    c.countries.some(country => country.toLowerCase().includes(q))
  );
};
