// __tests__/deepLinkBuilder.test.ts
// Tests for DeepLinkBuilder: date formatting, params, provider URLs

import {
  formatDate,
  formatDateCompact,
  buildBookingLink,
  buildHostelworldLink,
  buildAirbnbLink,
  buildGoogleFlightsLink,
  buildSkyscannerLink,
  buildKayakLink,
  buildAccommodationLink,
  buildFlightLink,
} from '../src/services/deepLinkBuilder';

describe('DeepLinkBuilder', () => {
  const checkin = new Date(2025, 5, 15); // Jun 15, 2025
  const checkout = new Date(2025, 5, 22); // Jun 22, 2025

  describe('Date formatting', () => {
    it('formats date as YYYY-MM-DD', () => {
      expect(formatDate(new Date(2025, 0, 5))).toBe('2025-01-05');
      expect(formatDate(new Date(2025, 11, 31))).toBe('2025-12-31');
    });

    it('formats date as YYYYMMDD (compact)', () => {
      expect(formatDateCompact(new Date(2025, 5, 15))).toBe('20250615');
      expect(formatDateCompact(new Date(2025, 0, 1))).toBe('20250101');
    });

    it('pads single-digit months and days', () => {
      expect(formatDate(new Date(2025, 2, 3))).toBe('2025-03-03');
    });
  });

  describe('Accommodation links', () => {
    const params = {
      city: 'Tokyo',
      country: 'Japan',
      checkin,
      checkout,
      guests: 2,
    };

    it('Booking.com includes correct dates and guests', () => {
      const result = buildBookingLink(params);
      expect(result.url).toContain('checkin=2025-06-15');
      expect(result.url).toContain('checkout=2025-06-22');
      expect(result.url).toContain('group_adults=2');
      expect(result.url).toContain('booking.com');
      expect(result.provider).toBe('Booking.com');
    });

    it('Hostelworld includes dates and guests', () => {
      const result = buildHostelworldLink(params);
      expect(result.url).toContain('dateFrom=2025-06-15');
      expect(result.url).toContain('dateTo=2025-06-22');
      expect(result.url).toContain('guests=2');
      expect(result.provider).toBe('Hostelworld');
    });

    it('Airbnb includes dates and adults', () => {
      const result = buildAirbnbLink(params);
      expect(result.url).toContain('checkin=2025-06-15');
      expect(result.url).toContain('checkout=2025-06-22');
      expect(result.url).toContain('adults=2');
      expect(result.url).toContain('airbnb.com');
    });

    it('unified builder delegates correctly', () => {
      const result = buildAccommodationLink('booking', params);
      expect(result.provider).toBe('Booking.com');
      expect(result.url).toContain('booking.com');
    });

    it('handles special characters in city names', () => {
      const result = buildBookingLink({ ...params, city: 'São Paulo' });
      expect(result.url).toContain('S%C3%A3o%20Paulo');
    });

    it('includes rooms parameter', () => {
      const result = buildBookingLink({ ...params, rooms: 2 });
      expect(result.url).toContain('no_rooms=2');
    });
  });

  describe('Flight links', () => {
    const flightParams = {
      originCity: 'Bogota',
      destCity: 'Tokyo',
      destCountry: 'Japan',
      departDate: checkin,
      returnDate: checkout,
      passengers: 2,
    };

    it('Google Flights includes origin, destination, dates', () => {
      const result = buildGoogleFlightsLink(flightParams);
      expect(result.url).toContain('from+Bogota');
      expect(result.url).toContain('to+Tokyo');
      expect(result.url).toContain('d=2025-06-15');
      expect(result.url).toContain('r=2025-06-22');
      expect(result.url).toContain('px=2');
      expect(result.provider).toBe('Google Flights');
    });

    it('Google Flights documents limitations', () => {
      const result = buildGoogleFlightsLink(flightParams);
      expect(result.limitations).toBeDefined();
      expect(result.limitations).toContain('may not always preserve');
    });

    it('Skyscanner uses compact dates', () => {
      const result = buildSkyscannerLink(flightParams);
      expect(result.url).toContain('/20250615/');
      expect(result.url).toContain('/20250622/');
      expect(result.url).toContain('adults=2');
      expect(result.provider).toBe('Skyscanner');
    });

    it('Skyscanner slugifies city names', () => {
      const result = buildSkyscannerLink({
        ...flightParams,
        originCity: 'New York',
      });
      expect(result.url).toContain('/new-york/');
    });

    it('Kayak includes all params', () => {
      const result = buildKayakLink(flightParams);
      expect(result.url).toContain('Bogota-Tokyo');
      expect(result.url).toContain('2025-06-15');
      expect(result.url).toContain('2025-06-22');
      expect(result.url).toContain('2adults');
      expect(result.provider).toBe('Kayak');
    });

    it('unified flight builder delegates', () => {
      const result = buildFlightLink('skyscanner', flightParams);
      expect(result.provider).toBe('Skyscanner');
    });
  });

  describe('Params tracking', () => {
    it('returns structured params for booking', () => {
      const result = buildBookingLink({
        city: 'Paris', country: 'France', checkin, checkout, guests: 1,
      });
      expect(result.params.ss).toBe('Paris');
      expect(result.params.checkin).toBe('2025-06-15');
      expect(result.params.checkout).toBe('2025-06-22');
      expect(result.params.guests).toBe('1');
    });

    it('returns structured params for flights', () => {
      const result = buildGoogleFlightsLink({
        originCity: 'London',
        destCity: 'Tokyo',
        destCountry: 'Japan',
        departDate: checkin,
        returnDate: checkout,
        passengers: 3,
      });
      expect(result.params.from).toBe('London');
      expect(result.params.to).toBe('Tokyo');
      expect(result.params.px).toBe('3');
    });
  });
});
