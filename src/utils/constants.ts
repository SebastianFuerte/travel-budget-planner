// src/utils/constants.ts

import { Currency } from '../types';

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  MXN: '$',
  COP: '$',
  BRL: 'R$',
  INR: '₹',
  CNY: '¥',
  THB: '฿',
  AUD: 'A$',
  CAD: 'C$',
  KRW: '₩',
  CHF: 'CHF ',
  SEK: 'kr',
};

export const CURRENCY_NAMES: Record<Currency, string> = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  JPY: 'Japanese Yen',
  MXN: 'Mexican Peso',
  COP: 'Colombian Peso',
  BRL: 'Brazilian Real',
  INR: 'Indian Rupee',
  CNY: 'Chinese Yuan',
  THB: 'Thai Baht',
  AUD: 'Australian Dollar',
  CAD: 'Canadian Dollar',
  KRW: 'Korean Won',
  CHF: 'Swiss Franc',
  SEK: 'Swedish Krona',
};

/** Currencies that don't use decimal places */
export const NO_DECIMAL_CURRENCIES: Currency[] = ['JPY', 'KRW', 'COP'];

export const TRAVEL_STYLES = ['Budget', 'Mid', 'Comfy'] as const;

export const CATEGORY_LABELS = {
  accommodation: 'Accommodation',
  localTransport: 'Local Transport',
  food: 'Food & Drinks',
  activities: 'Activities & Tours',
  insurance: 'Travel Insurance',
  internet: 'eSIM/Internet',
  extras: 'Extras & Shopping',
};

export const FREE_TRIP_LIMIT = 1;
export const PRO_PRICE_MONTHLY = 4.99;
export const PRO_PRICE_YEARLY = 39.99;

export const WEB_CONTAINER_MAX_WIDTH = 480;
export const WEB_CONTAINER_PADDING = 20;
