// src/services/travelerProfiles.ts
// Traveler profile definitions and budget multipliers

import { TravelerProfile, BudgetCategories } from '../types';

export interface ProfileInfo {
  id: TravelerProfile;
  label: string;
  icon: string;
  description: string;
  multipliers: Record<keyof BudgetCategories, number>;
}

/**
 * Traveler profiles with budget multipliers per category.
 * Multiplier of 1.0 = no change from base budget.
 */
export const TRAVELER_PROFILES: Record<TravelerProfile, ProfileInfo> = {
  backpacker: {
    id: 'backpacker',
    label: 'Backpacker',
    icon: '🎒',
    description: 'Hostels, street food, free activities',
    multipliers: {
      accommodation: 0.5,
      localTransport: 0.6,
      food: 0.6,
      activities: 0.5,
      insurance: 1.0,
      internet: 0.8,
      extras: 0.5,
    },
  },
  student: {
    id: 'student',
    label: 'Student',
    icon: '🎓',
    description: 'Budget-friendly with student discounts',
    multipliers: {
      accommodation: 0.6,
      localTransport: 0.7,
      food: 0.7,
      activities: 0.6,
      insurance: 0.9,
      internet: 1.0,
      extras: 0.6,
    },
  },
  couple: {
    id: 'couple',
    label: 'Couple',
    icon: '💑',
    description: 'Shared rooms, romantic dining',
    multipliers: {
      accommodation: 0.75,  // Sharing a room
      localTransport: 1.0,
      food: 1.1,
      activities: 1.1,
      insurance: 1.0,
      internet: 0.8,        // Can share hotspot
      extras: 1.1,
    },
  },
  family: {
    id: 'family',
    label: 'Family',
    icon: '👨‍👩‍👧‍👦',
    description: 'Family-friendly stays, kid activities',
    multipliers: {
      accommodation: 1.3,   // Need more space
      localTransport: 1.2,
      food: 1.0,            // Kids eat less
      activities: 1.2,      // Family activities
      insurance: 1.2,
      internet: 1.0,
      extras: 1.3,
    },
  },
  digital_nomad: {
    id: 'digital_nomad',
    label: 'Digital Nomad',
    icon: '💻',
    description: 'Coworking, good wifi, longer stays',
    multipliers: {
      accommodation: 0.85,  // Monthly discounts
      localTransport: 0.7,  // Less tourist transport
      food: 0.85,           // Cook more, local spots
      activities: 0.5,      // Working most days
      insurance: 1.1,
      internet: 1.5,        // Coworking + backup internet
      extras: 0.7,
    },
  },
  luxury: {
    id: 'luxury',
    label: 'Luxury',
    icon: '✨',
    description: 'Premium hotels, fine dining, VIP',
    multipliers: {
      accommodation: 2.0,
      localTransport: 1.5,
      food: 1.8,
      activities: 1.8,
      insurance: 1.3,
      internet: 1.2,
      extras: 2.0,
    },
  },
};

/**
 * Apply a traveler profile's multipliers to a base budget.
 */
export const applyProfileToBudget = (
  budget: BudgetCategories,
  profile: TravelerProfile,
): BudgetCategories => {
  const { multipliers } = TRAVELER_PROFILES[profile];
  const result: any = {};

  (Object.keys(budget) as Array<keyof BudgetCategories>).forEach((key) => {
    const mult = multipliers[key];
    result[key] = {
      min: Math.round(budget[key].min * mult),
      average: Math.round(budget[key].average * mult),
      max: Math.round(budget[key].max * mult),
    };
  });

  return result as BudgetCategories;
};

/** Get all profiles as an array for UI rendering */
export const getProfileOptions = (): ProfileInfo[] => {
  return Object.values(TRAVELER_PROFILES);
};
