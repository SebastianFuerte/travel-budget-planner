// src/utils/currency.ts

import { Currency } from '../types';
import { CURRENCY_SYMBOLS, NO_DECIMAL_CURRENCIES } from './constants';

export const formatCurrency = (
  amount: number,
  currency: Currency,
  showDecimals: boolean = true
): string => {
  const symbol = CURRENCY_SYMBOLS[currency] || currency + ' ';

  if (NO_DECIMAL_CURRENCIES.includes(currency)) {
    return `${symbol}${Math.round(amount).toLocaleString('en-US')}`;
  }

  if (showDecimals) {
    return `${symbol}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  return `${symbol}${Math.round(amount).toLocaleString('en-US')}`;
};

/** Format with FX conversion indicator */
export const formatWithFx = (
  amount: number,
  currency: Currency,
  isConverted: boolean = false,
): string => {
  const formatted = formatCurrency(amount, currency);
  return isConverted ? `~${formatted}` : formatted;
};

export const parseCurrencyInput = (value: string): number => {
  const cleaned = value.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};
