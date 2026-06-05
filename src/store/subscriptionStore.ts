import { create } from 'zustand';
import { Subscription, SubscriptionTier } from '../types';
import { loadSubscription, saveSubscription } from '../services/storage';
import { logSubscriptionStarted } from '../services/analytics';
import {
  getCustomerInfo,
  restorePurchases,
  isProEntitled,
} from '../services/purchaseService';

interface SubscriptionState {
  subscription: Subscription;
  isLoading: boolean;

  loadSubscription: () => Promise<void>;
  upgradeToPro: (tier: SubscriptionTier) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  restorePurchases: () => Promise<boolean>;
  syncWithRevenueCat: () => Promise<void>;

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
      // Check RevenueCat first (source of truth for paid status)
      const customerInfo = await getCustomerInfo();
      if (customerInfo && isProEntitled(customerInfo)) {
        const proSubscription: Subscription = { tier: 'pro', isActive: true };
        await saveSubscription(proSubscription);
        set({ subscription: proSubscription, isLoading: false });
        return;
      }

      // Fall back to local storage (handles offline + free users)
      const subscription = await loadSubscription();
      set({ subscription, isLoading: false });
    } catch {
      const subscription = await loadSubscription().catch(() => ({ tier: 'free' as SubscriptionTier, isActive: true }));
      set({ subscription, isLoading: false });
    }
  },

  // Called after a successful purchasePackage() in the paywall
  upgradeToPro: async (tier: SubscriptionTier) => {
    const newSubscription: Subscription = { tier, isActive: true };
    await saveSubscription(newSubscription);
    set({ subscription: newSubscription });
    logSubscriptionStarted(tier);
  },

  cancelSubscription: async () => {
    const free: Subscription = { tier: 'free', isActive: true };
    await saveSubscription(free);
    set({ subscription: free });
  },

  restorePurchases: async (): Promise<boolean> => {
    set({ isLoading: true });
    try {
      const customerInfo = await restorePurchases();
      if (customerInfo && isProEntitled(customerInfo)) {
        await get().upgradeToPro('pro');
        set({ isLoading: false });
        return true;
      }
      set({ isLoading: false });
      return false;
    } catch {
      set({ isLoading: false });
      return false;
    }
  },

  syncWithRevenueCat: async () => {
    const customerInfo = await getCustomerInfo();
    if (!customerInfo) return;

    if (isProEntitled(customerInfo)) {
      await get().upgradeToPro('pro');
    } else if (get().isPro()) {
      // Pro expired — downgrade locally
      await get().cancelSubscription();
    }
  },

  isPro: () => {
    const { subscription } = get();
    if (!subscription.isActive || subscription.tier !== 'pro') return false;
    if (subscription.expiresAt && new Date(subscription.expiresAt) < new Date()) return false;
    return true;
  },

  canCreateTrip: (_currentTripCount: number) => true,
  canExportPDF: () => true,
  canAddDocument: (_currentDocCount: number) => true,
}));
