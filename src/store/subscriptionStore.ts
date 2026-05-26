// src/store/subscriptionStore.ts

import { create } from 'zustand';
import { Subscription, SubscriptionTier } from '../types';
import { loadSubscription, saveSubscription } from '../services/storage';
import { logSubscriptionStarted } from '../services/analytics';

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
  canAddDocument: (currentDocCount: number) => boolean;
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
      set({ isLoading: false, error: 'Could not verify subscription. Some features may be unavailable.' } as any);
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
    if (!subscription.isActive || subscription.tier !== 'pro') return false;
    if (subscription.expiresAt && new Date(subscription.expiresAt) < new Date()) return false;
    return true;
  },

  canCreateTrip: (_currentTripCount: number) => {
    return true;
  },

  canExportPDF: () => {
    return true;
  },

  canAddDocument: (_currentDocCount: number) => {
    return true;
  },
}));
