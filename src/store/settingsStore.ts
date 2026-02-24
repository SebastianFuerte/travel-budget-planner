// src/store/settingsStore.ts
// Global user settings (persisted)

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Currency } from '../types';

const SETTINGS_KEY = 'user_settings';

interface SettingsState {
  userCurrency: Currency;
  showConvertedPrices: boolean;
  isLoaded: boolean;
  setUserCurrency: (currency: Currency) => Promise<void>;
  setShowConvertedPrices: (show: boolean) => Promise<void>;
  loadSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  userCurrency: 'USD',
  showConvertedPrices: false,
  isLoaded: false,

  loadSettings: async () => {
    try {
      const raw = await AsyncStorage.getItem(SETTINGS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        set({
          userCurrency: parsed.userCurrency || 'USD',
          showConvertedPrices: parsed.showConvertedPrices ?? false,
          isLoaded: true,
        });
      } else {
        set({ isLoaded: true });
      }
    } catch {
      set({ isLoaded: true });
    }
  },

  setUserCurrency: async (currency: Currency) => {
    set({ userCurrency: currency });
    const state = get();
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify({
      userCurrency: currency,
      showConvertedPrices: state.showConvertedPrices,
    })).catch(() => {});
  },

  setShowConvertedPrices: async (show: boolean) => {
    set({ showConvertedPrices: show });
    const state = get();
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify({
      userCurrency: state.userCurrency,
      showConvertedPrices: show,
    })).catch(() => {});
  },
}));
