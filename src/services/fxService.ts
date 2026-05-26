// src/services/fxService.ts
// FX conversion service with 24h cache + offline fallback
// Uses free exchangerate-api (no key required)

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Currency } from '../types';

const FX_CACHE_KEY = 'fx_cache_';
const FX_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export interface FxResult {
  converted: number;
  rate: number;
  timestamp: string;
  isOffline: boolean;
}

interface CachedRates {
  base: Currency;
  rates: Record<string, number>;
  timestamp: string;
  fetchedAt: number;
}

// Offline fallback rates (approximate, USD-based, updated manually)
// These are ONLY used when network + cache are both unavailable
const OFFLINE_RATES_USD: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  MXN: 17.2,
  COP: 4100,
  BRL: 4.97,
  INR: 83.1,
  CNY: 7.24,
  THB: 35.7,
  AUD: 1.54,
  CAD: 1.36,
  KRW: 1320,
  CHF: 0.88,
  SEK: 10.5,
};

/** Fetch rates from API for a base currency */
const fetchRatesFromApi = async (base: Currency): Promise<CachedRates | null> => {
  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${base}`,
      { method: 'GET' }
    );
    if (!response.ok) return null;
    const data = await response.json();
    const cached: CachedRates = {
      base,
      rates: data.rates,
      timestamp: new Date().toISOString(),
      fetchedAt: Date.now(),
    };
    // Save to cache
    await AsyncStorage.setItem(FX_CACHE_KEY + base, JSON.stringify(cached)).catch((e) =>
      console.warn('FX cache write failed:', e)
    );
    return cached;
  } catch (error) {
    console.warn('fetchRatesFromApi failed:', error);
    return null;
  }
};

/** Get cached rates if still valid */
const getCachedRates = async (base: Currency): Promise<CachedRates | null> => {
  try {
    const raw = await AsyncStorage.getItem(FX_CACHE_KEY + base);
    if (!raw) return null;
    const cached: CachedRates = JSON.parse(raw);
    if (Date.now() - cached.fetchedAt > FX_CACHE_TTL) return null; // expired
    return cached;
  } catch (error) {
    console.warn('getCachedRates parse error:', error);
    return null;
  }
};

/** Get offline fallback rate between two currencies */
const getOfflineRate = (from: Currency, to: Currency): number => {
  const fromUsd = OFFLINE_RATES_USD[from] || 1;
  const toUsd = OFFLINE_RATES_USD[to] || 1;
  return toUsd / fromUsd;
};

/** Get exchange rate: cache → API → offline fallback */
export const getRate = async (from: Currency, to: Currency): Promise<FxResult> => {
  if (from === to) {
    return { converted: 1, rate: 1, timestamp: new Date().toISOString(), isOffline: false };
  }

  // Try cache first
  const cached = await getCachedRates(from);
  if (cached && cached.rates[to]) {
    return {
      converted: cached.rates[to],
      rate: cached.rates[to],
      timestamp: cached.timestamp,
      isOffline: false,
    };
  }

  // Try API
  const fresh = await fetchRatesFromApi(from);
  if (fresh && fresh.rates[to]) {
    return {
      converted: fresh.rates[to],
      rate: fresh.rates[to],
      timestamp: fresh.timestamp,
      isOffline: false,
    };
  }

  // Offline fallback
  const rate = getOfflineRate(from, to);
  return {
    converted: rate,
    rate,
    timestamp: new Date().toISOString(),
    isOffline: true,
  };
};

/** Convert an amount between currencies */
export const convert = async (
  amount: number,
  from: Currency,
  to: Currency
): Promise<FxResult> => {
  const result = await getRate(from, to);
  return {
    ...result,
    converted: amount * result.rate,
  };
};

/** Get all rates for a base currency */
export const getRatesForBase = async (base: Currency): Promise<{
  rates: Record<string, number>;
  timestamp: string;
  isOffline: boolean;
}> => {
  const cached = await getCachedRates(base);
  if (cached) {
    return { rates: cached.rates, timestamp: cached.timestamp, isOffline: false };
  }

  const fresh = await fetchRatesFromApi(base);
  if (fresh) {
    return { rates: fresh.rates, timestamp: fresh.timestamp, isOffline: false };
  }

  // Build offline rates relative to base
  const baseToUsd = 1 / (OFFLINE_RATES_USD[base] || 1);
  const rates: Record<string, number> = {};
  for (const [cur, usdRate] of Object.entries(OFFLINE_RATES_USD)) {
    rates[cur] = usdRate * baseToUsd;
  }
  return { rates, timestamp: new Date().toISOString(), isOffline: true };
};

/** Clear FX cache (for testing) */
export const clearFxCache = async (): Promise<void> => {
  const keys = await AsyncStorage.getAllKeys();
  const fxKeys = keys.filter(k => k.startsWith(FX_CACHE_KEY));
  if (fxKeys.length > 0) {
    await AsyncStorage.multiRemove(fxKeys);
  }
};

// Export for testing
export const _testExports = {
  OFFLINE_RATES_USD,
  getOfflineRate,
  FX_CACHE_TTL,
};
