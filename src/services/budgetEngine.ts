// src/services/budgetEngine.ts

import { Trip, TripSummary, BudgetCategories, CategoryBudget, ConfirmedPrice } from '../types';

/**
 * Calculate the number of days for a trip
 */
export const calculateTripDays = (startDate: Date, endDate: Date): number => {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays || 1; // Minimum 1 day
};

/**
 * Calculate total for a single category across all days
 */
const calculateCategoryTotal = (
  category: CategoryBudget,
  days: number
): { min: number; average: number; max: number } => {
  return {
    min: category.min * days,
    average: category.average * days,
    max: category.max * days,
  };
};

/**
 * Calculate trip summary with all totals and breakdowns
 */
export const calculateTripSummary = (trip: Trip): TripSummary => {
  const numberOfDays = calculateTripDays(trip.startDate, trip.endDate);
  const { budget, numberOfPeople } = trip;

  // Sum all categories
  let totalMin = 0;
  let totalAverage = 0;
  let totalMax = 0;

  Object.values(budget).forEach((category) => {
    const categoryTotal = calculateCategoryTotal(category, numberOfDays);
    totalMin += categoryTotal.min;
    totalAverage += categoryTotal.average;
    totalMax += categoryTotal.max;
  });

  // Multiply by number of people
  totalMin *= numberOfPeople;
  totalAverage *= numberOfPeople;
  totalMax *= numberOfPeople;

  // Calculate daily averages
  const dailyMin = totalMin / numberOfDays;
  const dailyAverage = totalAverage / numberOfDays;
  const dailyMax = totalMax / numberOfDays;

  // Calculate per person totals
  const perPersonMin = totalMin / numberOfPeople;
  const perPersonAverage = totalAverage / numberOfPeople;
  const perPersonMax = totalMax / numberOfPeople;

  return {
    totalMin,
    totalAverage,
    totalMax,
    dailyMin,
    dailyAverage,
    dailyMax,
    numberOfDays,
    perPersonMin,
    perPersonAverage,
    perPersonMax,
  };
};

/**
 * Calculate category totals for display
 */
export const calculateCategoryTotals = (
  budget: BudgetCategories,
  numberOfDays: number,
  numberOfPeople: number
): Record<keyof BudgetCategories, { min: number; average: number; max: number }> => {
  return Object.fromEntries(
    (Object.keys(budget) as Array<keyof BudgetCategories>).map((key) => {
      const totals = calculateCategoryTotal(budget[key], numberOfDays);
      return [key, {
        min: totals.min * numberOfPeople,
        average: totals.average * numberOfPeople,
        max: totals.max * numberOfPeople,
      }];
    })
  ) as Record<keyof BudgetCategories, { min: number; average: number; max: number }>;
};

/**
 * Validate budget values are logical (min <= avg <= max)
 */
export const validateCategoryBudget = (category: CategoryBudget): boolean => {
  return (
    category.min >= 0 &&
    category.average >= category.min &&
    category.max >= category.average
  );
};

/**
 * Validate entire budget structure
 */
export const validateBudget = (budget: BudgetCategories): boolean => {
  return Object.values(budget).every(validateCategoryBudget);
};

/**
 * Calculate trip summary using confirmed prices where available.
 * Confirmed prices override the estimate for that category.
 */
export const calculateTripSummaryWithConfirmed = (trip: Trip): TripSummary => {
  const numberOfDays = calculateTripDays(trip.startDate, trip.endDate);
  const { budget, numberOfPeople, confirmedPrices } = trip;

  let totalMin = 0;
  let totalAverage = 0;
  let totalMax = 0;

  (Object.keys(budget) as Array<keyof BudgetCategories>).forEach((key) => {
    const confirmed = confirmedPrices?.filter(cp => cp.category === key);
    if (confirmed && confirmed.length > 0) {
      // Use the latest confirmed price for this category
      const latest = [...confirmed].sort(
        (a, b) => new Date(b.confirmedAt).getTime() - new Date(a.confirmedAt).getTime()
      )[0];
      const confirmedTotal = latest.amount * numberOfDays;
      totalMin += confirmedTotal;
      totalAverage += confirmedTotal;
      totalMax += confirmedTotal;
    } else {
      const category = budget[key];
      const categoryTotal = calculateCategoryTotal(category, numberOfDays);
      totalMin += categoryTotal.min;
      totalAverage += categoryTotal.average;
      totalMax += categoryTotal.max;
    }
  });

  totalMin *= numberOfPeople;
  totalAverage *= numberOfPeople;
  totalMax *= numberOfPeople;

  return {
    totalMin,
    totalAverage,
    totalMax,
    dailyMin: totalMin / numberOfDays,
    dailyAverage: totalAverage / numberOfDays,
    dailyMax: totalMax / numberOfDays,
    numberOfDays,
    perPersonMin: totalMin / numberOfPeople,
    perPersonAverage: totalAverage / numberOfPeople,
    perPersonMax: totalMax / numberOfPeople,
  };
};

/**
 * Get the confirmed price for a category (latest), or null
 */
export const getConfirmedPriceForCategory = (
  confirmedPrices: ConfirmedPrice[] | undefined,
  category: keyof BudgetCategories
): ConfirmedPrice | null => {
  if (!confirmedPrices) return null;
  const matches = confirmedPrices.filter(cp => cp.category === category);
  if (matches.length === 0) return null;
  return matches.sort(
    (a, b) => new Date(b.confirmedAt).getTime() - new Date(a.confirmedAt).getTime()
  )[0];
};

/**
 * Create a default budget structure
 */
export const createDefaultBudget = (): BudgetCategories => {
  return {
    accommodation: { min: 30, average: 60, max: 100 },
    localTransport: { min: 10, average: 20, max: 40 },
    food: { min: 25, average: 50, max: 80 },
    activities: { min: 20, average: 50, max: 100 },
    insurance: { min: 5, average: 10, max: 15 },
    internet: { min: 2, average: 5, max: 10 },
    extras: { min: 15, average: 30, max: 60 },
  };
};
