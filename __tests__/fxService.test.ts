// __tests__/fxService.test.ts
// Tests for FX Service: offline fallback, conversion math, cache logic

import { _testExports } from '../src/services/fxService';

const { OFFLINE_RATES_USD, getOfflineRate, FX_CACHE_TTL } = _testExports;

describe('FX Service', () => {
  describe('Offline fallback rates', () => {
    it('has rates for all supported currencies', () => {
      const expectedCurrencies = [
        'USD', 'EUR', 'GBP', 'JPY', 'MXN', 'COP', 'BRL',
        'INR', 'CNY', 'THB', 'AUD', 'CAD', 'KRW', 'CHF', 'SEK',
      ];
      expectedCurrencies.forEach(cur => {
        expect(OFFLINE_RATES_USD[cur]).toBeDefined();
        expect(OFFLINE_RATES_USD[cur]).toBeGreaterThan(0);
      });
    });

    it('USD to USD rate is 1', () => {
      expect(OFFLINE_RATES_USD['USD']).toBe(1);
    });

    it('JPY rate is greater than 100 (sanity check)', () => {
      expect(OFFLINE_RATES_USD['JPY']).toBeGreaterThan(100);
    });

    it('EUR rate is less than 1 (USD buys less than 1 EUR)', () => {
      expect(OFFLINE_RATES_USD['EUR']).toBeLessThan(1);
    });
  });

  describe('getOfflineRate', () => {
    it('USD to EUR conversion is reasonable', () => {
      const rate = getOfflineRate('USD', 'EUR');
      expect(rate).toBeGreaterThan(0.5);
      expect(rate).toBeLessThan(1.5);
    });

    it('USD to JPY conversion is reasonable', () => {
      const rate = getOfflineRate('USD', 'JPY');
      expect(rate).toBeGreaterThan(100);
      expect(rate).toBeLessThan(200);
    });

    it('EUR to GBP is reasonable', () => {
      const rate = getOfflineRate('EUR', 'GBP');
      expect(rate).toBeGreaterThan(0.5);
      expect(rate).toBeLessThan(1.2);
    });

    it('same currency returns 1', () => {
      const rate = getOfflineRate('USD', 'USD');
      expect(rate).toBe(1);
    });

    it('cross rates are mathematically consistent', () => {
      // USD -> JPY should equal (USD -> EUR) * (EUR -> JPY)
      const usdToJpy = getOfflineRate('USD', 'JPY');
      const usdToEur = getOfflineRate('USD', 'EUR');
      const eurToJpy = getOfflineRate('EUR', 'JPY');
      expect(Math.abs(usdToJpy - usdToEur * eurToJpy)).toBeLessThan(0.1);
    });

    it('COP rate is in thousands', () => {
      const rate = getOfflineRate('USD', 'COP');
      expect(rate).toBeGreaterThan(3000);
      expect(rate).toBeLessThan(6000);
    });

    it('KRW rate is in thousands', () => {
      const rate = getOfflineRate('USD', 'KRW');
      expect(rate).toBeGreaterThan(1000);
      expect(rate).toBeLessThan(2000);
    });
  });

  describe('Cache TTL', () => {
    it('cache TTL is 24 hours', () => {
      expect(FX_CACHE_TTL).toBe(24 * 60 * 60 * 1000);
    });
  });

  describe('Conversion math', () => {
    it('converting 100 USD to EUR gives reasonable result', () => {
      const rate = getOfflineRate('USD', 'EUR');
      const converted = 100 * rate;
      expect(converted).toBeGreaterThan(50);
      expect(converted).toBeLessThan(150);
    });

    it('round-trip conversion is approximately identity', () => {
      // 100 USD -> EUR -> USD should be ~100
      const usdToEur = getOfflineRate('USD', 'EUR');
      const eurToUsd = getOfflineRate('EUR', 'USD');
      const roundTrip = 100 * usdToEur * eurToUsd;
      expect(Math.abs(roundTrip - 100)).toBeLessThan(0.01);
    });
  });
});
