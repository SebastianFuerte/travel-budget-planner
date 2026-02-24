// src/services/storage.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Trip, Subscription } from '../types';

const TRIPS_KEY = '@travel_budget_trips';
const SUBSCRIPTION_KEY = '@travel_budget_subscription';
const DOCS_KEY_PREFIX = '@travel_docs_';
const NATIONALITY_KEY = '@travel_user_nationality';
const ONBOARDING_KEY = '@travel_onboarding_seen';

/**
 * Load all trips from storage
 */
export const loadTrips = async (): Promise<Trip[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(TRIPS_KEY);
    if (jsonValue === null) return [];
    
    const trips = JSON.parse(jsonValue);
    
    // Convert date strings back to Date objects
    return trips.map((trip: any) => ({
      ...trip,
      startDate: new Date(trip.startDate),
      endDate: new Date(trip.endDate),
      createdAt: new Date(trip.createdAt),
      updatedAt: new Date(trip.updatedAt),
    }));
  } catch (error) {
    console.error('Error loading trips:', error);
    return [];
  }
};

/**
 * Save all trips to storage
 */
export const saveTrips = async (trips: Trip[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(trips);
    await AsyncStorage.setItem(TRIPS_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving trips:', error);
    throw error;
  }
};

/**
 * Load subscription data
 */
export const loadSubscription = async (): Promise<Subscription> => {
  try {
    const jsonValue = await AsyncStorage.getItem(SUBSCRIPTION_KEY);
    if (jsonValue === null) {
      return { tier: 'free', isActive: true };
    }
    
    const sub = JSON.parse(jsonValue);
    return {
      ...sub,
      expiresAt: sub.expiresAt ? new Date(sub.expiresAt) : undefined,
    };
  } catch (error) {
    console.error('Error loading subscription:', error);
    return { tier: 'free', isActive: true };
  }
};

/**
 * Save subscription data
 */
export const saveSubscription = async (subscription: Subscription): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(subscription);
    await AsyncStorage.setItem(SUBSCRIPTION_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving subscription:', error);
    throw error;
  }
};

/**
 * Check if user has seen onboarding
 */
export const getHasSeenOnboarding = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    return value === 'true';
  } catch {
    return false;
  }
};

/**
 * Mark onboarding as seen
 */
export const setHasSeenOnboarding = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
  } catch (error) {
    console.error('Error saving onboarding state:', error);
  }
};

/**
 * Clear all data (for testing/reset)
 */
export const clearAllData = async (): Promise<void> => {
  try {
    // Get all keys to find document keys too
    const allKeys = await AsyncStorage.getAllKeys();
    const docsKeys = allKeys.filter(
      k => k.startsWith(DOCS_KEY_PREFIX) || k === NATIONALITY_KEY
    );
    await AsyncStorage.multiRemove([TRIPS_KEY, SUBSCRIPTION_KEY, ONBOARDING_KEY, ...docsKeys]);
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
};
