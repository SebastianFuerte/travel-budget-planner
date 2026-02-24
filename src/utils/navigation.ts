// src/utils/navigation.ts

import { router } from 'expo-router';

/**
 * Navigate back safely. If there is no history (e.g., on web with direct URL access,
 * or after router.replace), fall back to the home tabs.
 */
export const safeGoBack = (fallbackRoute: string = '/(tabs)') => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace(fallbackRoute as any);
  }
};
