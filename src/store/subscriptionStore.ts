// src/store/subscriptionStore.ts

import { create } from 'zustand';
import { Subscription, SubscriptionTier } from '../types';
import { loadSubscription, saveSubscription } from '../services/storage';
import { logSubscriptionStarted } from '../services/analytics';
import { FREE_TRIP_LIMIT } from '../utils/constants';

interface SubscriptionState {
  subscription: Subscription;
  isLoading: boolean;
  
  // Actions
  loadSubscription: () => Promise<void>;
  upgradeToPro: (tier: SubscriptionTier) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  
  // Helpers
  isPro: () => boolean;
  canCreateTrip: (currentTripCount: number) => boolean;
  canExportPDF: () => boolean;
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  subscription: {
    tier: 'free',
    isActive: true,
  },
  isLoading: false,

  loadSubscription: async () => {
    set({ isLoading: true });
    try {
      const subscription = await loadSubscription();
      set({ subscription, isLoading: false });
    } catch (error) {
      console.error('Failed to load subscription:', error);
      set({ isLoading: false });
    }
  },

  upgradeToPro: async (tier: SubscriptionTier) => {
    try {
      // Mock subscription - en producción esto integraría con RevenueCat, Stripe, etc.
      const newSubscription: Subscription = {
        tier,
        isActive: true,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      };
      
      await saveSubscription(newSubscription);
      set({ subscription: newSubscription });
      
      logSubscriptionStarted(tier);
    } catch (error) {
      console.error('Failed to upgrade subscription:', error);
      throw error;
    }
  },

  cancelSubscription: async () => {
    try {
      const newSubscription: Subscription = {
        tier: 'free',
        isActive: true,
      };
      
      await saveSubscription(newSubscription);
      set({ subscription: newSubscription });
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      throw error;
    }
  },

  isPro: () => {
    const { subscription } = get();
    return subscription.tier === 'pro' && subscription.isActive;
  },

  canCreateTrip: (currentTripCount: number) => {
    const isPro = get().isPro();
    return isPro || currentTripCount < FREE_TRIP_LIMIT;
  },

  canExportPDF: () => {
    return get().isPro();
  },
}));
