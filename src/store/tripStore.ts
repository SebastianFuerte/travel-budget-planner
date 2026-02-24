// src/store/tripStore.ts

import { create } from 'zustand';
import { Trip } from '../types';
import { loadTrips, saveTrips } from '../services/storage';
import { logTripCreated, logTripEdited, logTripDeleted, logTripDuplicated } from '../services/analytics';

interface TripState {
  trips: Trip[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadTrips: () => Promise<void>;
  addTrip: (trip: Trip) => Promise<void>;
  updateTrip: (id: string, updates: Partial<Trip>) => Promise<void>;
  deleteTrip: (id: string) => Promise<void>;
  duplicateTrip: (id: string) => Promise<void>;
  getTripById: (id: string) => Trip | undefined;
}

/**
 * Trip Store usando Zustand
 * Zustand es más ligero que Redux y perfecto para este caso de uso
 * - API simple y directa
 * - Sin boilerplate
 * - TypeScript nativo
 * - Perfecto para state management moderado
 */
export const useTripStore = create<TripState>((set, get) => ({
  trips: [],
  isLoading: false,
  error: null,

  loadTrips: async () => {
    set({ isLoading: true, error: null });
    try {
      const trips = await loadTrips();
      set({ trips, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load trips',
        isLoading: false 
      });
    }
  },

  addTrip: async (trip: Trip) => {
    try {
      const currentTrips = get().trips;
      const newTrips = [...currentTrips, trip];
      await saveTrips(newTrips);
      set({ trips: newTrips });
      
      logTripCreated(
        trip.destination,
        Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24)),
        trip.travelStyle
      );
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to add trip' });
      throw error;
    }
  },

  updateTrip: async (id: string, updates: Partial<Trip>) => {
    try {
      const currentTrips = get().trips;
      const newTrips = currentTrips.map(trip =>
        trip.id === id
          ? { ...trip, ...updates, updatedAt: new Date() }
          : trip
      );
      await saveTrips(newTrips);
      set({ trips: newTrips });
      
      logTripEdited(id);
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update trip' });
      throw error;
    }
  },

  deleteTrip: async (id: string) => {
    try {
      const currentTrips = get().trips;
      const newTrips = currentTrips.filter(trip => trip.id !== id);
      await saveTrips(newTrips);
      set({ trips: newTrips });
      
      logTripDeleted(id);
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete trip' });
      throw error;
    }
  },

  duplicateTrip: async (id: string) => {
    try {
      const trip = get().getTripById(id);
      if (!trip) throw new Error('Trip not found');
      
      const newTrip: Trip = {
        ...trip,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        destination: `${trip.destination} (Copy)`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await get().addTrip(newTrip);
      logTripDuplicated(id);
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to duplicate trip' });
      throw error;
    }
  },

  getTripById: (id: string) => {
    return get().trips.find(trip => trip.id === id);
  },
}));
