// src/types/index.ts

export type TravelStyle = 'Budget' | 'Mid' | 'Comfy';
export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'MXN' | 'COP' | 'BRL' | 'INR' | 'CNY' | 'THB' | 'AUD' | 'CAD' | 'KRW' | 'CHF' | 'SEK';
export type TravelerProfile = 'backpacker' | 'student' | 'couple' | 'family' | 'digital_nomad' | 'luxury';

export interface CategoryBudget {
  min: number;
  average: number;
  max: number;
}

export interface BudgetCategories {
  accommodation: CategoryBudget;
  localTransport: CategoryBudget;
  food: CategoryBudget;
  activities: CategoryBudget;
  insurance: CategoryBudget;
  internet: CategoryBudget;
  extras: CategoryBudget;
}

export interface Trip {
  id: string;
  destination: string;
  city: string;
  country: string;
  startDate: Date;
  endDate: Date;
  numberOfPeople: number;
  currency: Currency;                   // Trip/destination currency
  userCurrency?: Currency;              // User's home currency (for FX conversion)
  originCity?: string;                  // Display name of departure city
  originIATA?: string;                  // IATA code (BOG, JFK, MAD...) for flight search links
  travelStyle: TravelStyle;
  travelerProfile?: TravelerProfile;
  budget: BudgetCategories;
  confirmedPrices?: ConfirmedPrice[];
  flightBudget?: {
    estimated: number;
    confirmed?: {
      amount: number;
      source: string;
      sourceUrl?: string;
      confirmedAt: string;
      notes?: string;
    };
  };
  notes?: string;
  tags?: string[];           // User labels: 'honeymoon', 'family', 'business', etc.
  archived?: boolean;        // Soft-delete / archive completed trips
  createdAt: Date;
  updatedAt: Date;
}

export interface TripSummary {
  totalMin: number;
  totalAverage: number;
  totalMax: number;
  dailyMin: number;
  dailyAverage: number;
  dailyMax: number;
  numberOfDays: number;
  perPersonMin: number;
  perPersonAverage: number;
  perPersonMax: number;
}

export interface Template {
  id: string;
  name: string;
  city: string;
  country: string;
  currency: Currency;
  budgets: {
    [key in TravelStyle]: BudgetCategories;
  };
}

// --- PRICING PROVIDERS ---

export interface PricingProvider {
  id: string;
  name: string;
  icon: string;
  categories: (keyof BudgetCategories)[];
  getSearchUrl: (city: string, country: string, startDate: Date, endDate: Date, people: number) => string;
}

// --- PRICE PROVENANCE (Accuracy System) ---

export type PriceSourceType = 'LIVE_API' | 'USER_CONFIRMED' | 'HEURISTIC';

export interface PriceProvenance {
  sourceType: PriceSourceType;
  providerName: string;                // e.g. 'Booking.com', 'city_budget_data', 'manual'
  deepLink?: string;                   // URL user visited to find this price
  query?: string;                      // Search params used
  timestamp: string;                   // ISO date of when this data was obtained
  originalAmount: number;              // Amount in the provider's currency
  originalCurrency: Currency;          // Provider's currency
  convertedAmount?: number;            // Amount in user's currency (if different)
  fxRateUsed?: number;                 // FX rate at time of conversion
  fxTimestamp?: string;                // When the FX rate was fetched
}

export interface ConfirmedPrice {
  id: string;
  category: keyof BudgetCategories;
  amount: number;       // Per day, per person (in trip currency)
  source: string;       // Provider name or 'manual'
  sourceUrl?: string;
  confirmedAt: string;  // ISO date
  notes?: string;
  provenance?: PriceProvenance;        // Full accuracy trail
}

export type SubscriptionTier = 'free' | 'pro';

export interface Subscription {
  tier: SubscriptionTier;
  expiresAt?: Date;
  isActive: boolean;
}

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp: Date;
}
