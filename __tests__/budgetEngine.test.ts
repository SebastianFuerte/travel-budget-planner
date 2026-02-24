// __tests__/budgetEngine.test.ts

import {
  calculateTripDays,
  calculateTripSummary,
  calculateTripSummaryWithConfirmed,
  getConfirmedPriceForCategory,
  validateCategoryBudget,
  validateBudget,
  createDefaultBudget,
} from '../src/services/budgetEngine';
import { Trip, TravelStyle, ConfirmedPrice } from '../src/types';

describe('Budget Engine', () => {
  describe('calculateTripDays', () => {
    it('should calculate correct number of days', () => {
      const start = new Date('2026-07-01');
      const end = new Date('2026-07-10');
      expect(calculateTripDays(start, end)).toBe(9);
    });

    it('should return 1 for same day trip', () => {
      const date = new Date('2026-07-01');
      expect(calculateTripDays(date, date)).toBe(1);
    });
  });

  describe('validateCategoryBudget', () => {
    it('should validate correct budget', () => {
      expect(validateCategoryBudget({ min: 10, average: 20, max: 30 })).toBe(true);
    });

    it('should reject negative values', () => {
      expect(validateCategoryBudget({ min: -10, average: 20, max: 30 })).toBe(false);
    });

    it('should reject average < min', () => {
      expect(validateCategoryBudget({ min: 30, average: 20, max: 40 })).toBe(false);
    });

    it('should reject max < average', () => {
      expect(validateCategoryBudget({ min: 10, average: 30, max: 20 })).toBe(false);
    });
  });

  describe('validateBudget', () => {
    it('should validate default budget', () => {
      const budget = createDefaultBudget();
      expect(validateBudget(budget)).toBe(true);
    });
  });

  describe('calculateTripSummary', () => {
    const mockTrip: Trip = {
      id: 'test-1',
      destination: 'Test Trip',
      city: 'Tokyo',
      country: 'Japan',
      startDate: new Date('2026-07-01'),
      endDate: new Date('2026-07-10'),
      numberOfPeople: 2,
      currency: 'USD',
      travelStyle: 'Mid' as TravelStyle,
      budget: createDefaultBudget(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should calculate correct total', () => {
      const summary = calculateTripSummary(mockTrip);
      expect(summary.numberOfDays).toBe(9);
      expect(summary.totalAverage).toBeGreaterThan(0);
    });

    it('should account for number of people', () => {
      const singlePerson = { ...mockTrip, numberOfPeople: 1 };
      const twoPeople = { ...mockTrip, numberOfPeople: 2 };

      const summary1 = calculateTripSummary(singlePerson);
      const summary2 = calculateTripSummary(twoPeople);

      expect(summary2.totalAverage).toBe(summary1.totalAverage * 2);
    });

    it('should calculate per person correctly', () => {
      const summary = calculateTripSummary(mockTrip);
      expect(summary.perPersonAverage).toBe(summary.totalAverage / mockTrip.numberOfPeople);
    });
  });

  describe('calculateTripSummaryWithConfirmed', () => {
    const baseBudget = createDefaultBudget();

    const mockTrip: Trip = {
      id: 'test-confirmed',
      destination: 'Test',
      city: 'Tokyo',
      country: 'Japan',
      startDate: new Date('2026-07-01'),
      endDate: new Date('2026-07-10'), // 9 days
      numberOfPeople: 2,
      currency: 'USD',
      travelStyle: 'Mid' as TravelStyle,
      budget: baseBudget,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should match regular summary when no confirmed prices', () => {
      const tripNoConfirmed = { ...mockTrip, confirmedPrices: [] };
      const regularSummary = calculateTripSummary(tripNoConfirmed);
      const confirmedSummary = calculateTripSummaryWithConfirmed(tripNoConfirmed);

      expect(confirmedSummary.totalAverage).toBe(regularSummary.totalAverage);
      expect(confirmedSummary.numberOfDays).toBe(regularSummary.numberOfDays);
    });

    it('should use confirmed price instead of estimate for accommodation', () => {
      const confirmedPrice: ConfirmedPrice = {
        id: 'cp-1',
        category: 'accommodation',
        amount: 100,
        source: 'Booking.com',
        confirmedAt: new Date().toISOString(),
      };
      const tripWithConfirmed = { ...mockTrip, confirmedPrices: [confirmedPrice] };

      const summaryWithConfirmed = calculateTripSummaryWithConfirmed(tripWithConfirmed);
      const summaryWithoutConfirmed = calculateTripSummary(mockTrip);

      // Confirmed accommodation = 100 * 9 days = 900 per person
      // Default accommodation avg = 60 * 9 days = 540 per person
      // Difference per person = 360, for 2 people = 720
      expect(summaryWithConfirmed.totalAverage).toBe(
        summaryWithoutConfirmed.totalAverage + (100 - 60) * 9 * 2
      );
    });

    it('should use latest confirmed price when multiple exist', () => {
      const olderPrice: ConfirmedPrice = {
        id: 'cp-old',
        category: 'accommodation',
        amount: 50,
        source: 'Old',
        confirmedAt: '2026-01-01T00:00:00Z',
      };
      const newerPrice: ConfirmedPrice = {
        id: 'cp-new',
        category: 'accommodation',
        amount: 80,
        source: 'New',
        confirmedAt: '2026-06-01T00:00:00Z',
      };
      const tripWithMultiple = {
        ...mockTrip,
        confirmedPrices: [olderPrice, newerPrice],
      };

      const summary = calculateTripSummaryWithConfirmed(tripWithMultiple);
      const summaryDefault = calculateTripSummary(mockTrip);

      // Should use newerPrice (80) instead of default average (60)
      expect(summary.totalAverage).toBe(
        summaryDefault.totalAverage + (80 - 60) * 9 * 2
      );
    });

    it('should handle confirmed prices for multiple categories', () => {
      const confirmedPrices: ConfirmedPrice[] = [
        {
          id: 'cp-accom',
          category: 'accommodation',
          amount: 100,
          source: 'Booking',
          confirmedAt: new Date().toISOString(),
        },
        {
          id: 'cp-food',
          category: 'food',
          amount: 40,
          source: 'Manual',
          confirmedAt: new Date().toISOString(),
        },
      ];
      const tripMultiConfirmed = { ...mockTrip, confirmedPrices };

      const summary = calculateTripSummaryWithConfirmed(tripMultiConfirmed);
      const summaryDefault = calculateTripSummary(mockTrip);

      const accomDiff = (100 - baseBudget.accommodation.average) * 9 * 2;
      const foodDiff = (40 - baseBudget.food.average) * 9 * 2;

      expect(summary.totalAverage).toBe(summaryDefault.totalAverage + accomDiff + foodDiff);
    });
  });

  describe('getConfirmedPriceForCategory', () => {
    it('should return null when no confirmed prices', () => {
      expect(getConfirmedPriceForCategory(undefined, 'accommodation')).toBeNull();
      expect(getConfirmedPriceForCategory([], 'accommodation')).toBeNull();
    });

    it('should return the confirmed price for a matching category', () => {
      const prices: ConfirmedPrice[] = [
        {
          id: 'cp-1',
          category: 'accommodation',
          amount: 55,
          source: 'Booking.com',
          confirmedAt: new Date().toISOString(),
        },
        {
          id: 'cp-2',
          category: 'insurance',
          amount: 7,
          source: 'World Nomads',
          confirmedAt: new Date().toISOString(),
        },
      ];

      const accom = getConfirmedPriceForCategory(prices, 'accommodation');
      expect(accom).not.toBeNull();
      expect(accom!.amount).toBe(55);

      const insurance = getConfirmedPriceForCategory(prices, 'insurance');
      expect(insurance).not.toBeNull();
      expect(insurance!.amount).toBe(7);

      const food = getConfirmedPriceForCategory(prices, 'food');
      expect(food).toBeNull();
    });

    it('should return the latest confirmed price for a category', () => {
      const prices: ConfirmedPrice[] = [
        {
          id: 'cp-old',
          category: 'food',
          amount: 30,
          source: 'Manual',
          confirmedAt: '2026-01-01T00:00:00Z',
        },
        {
          id: 'cp-new',
          category: 'food',
          amount: 45,
          source: 'TripAdvisor',
          confirmedAt: '2026-06-15T00:00:00Z',
        },
      ];

      const result = getConfirmedPriceForCategory(prices, 'food');
      expect(result).not.toBeNull();
      expect(result!.amount).toBe(45);
      expect(result!.source).toBe('TripAdvisor');
    });
  });
});
