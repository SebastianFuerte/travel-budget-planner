// src/store/documentStore.ts
// Zustand store for managing trip documents, entry requirements, and timeline

import { create } from 'zustand';
import {
  TripDocument,
  TimelineEvent,
  TripDocumentsData,
  TripPurpose,
  PassportType,
  DocumentCategory,
  DocumentFileType,
} from '../types/documents';
import {
  loadTripDocuments,
  saveTripDocuments,
  addDocument as addDocStorage,
  removeDocument as removeDocStorage,
  addTimelineEvent as addEventStorage,
  removeTimelineEvent as removeEventStorage,
  updateTripNationality as updateNatStorage,
  loadUserNationality,
  saveUserNationality,
} from '../services/documentStorage';

interface DocumentState {
  // Current trip documents data
  currentTripDocs: TripDocumentsData | null;
  userNationality: string;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadDocuments: (tripId: string) => Promise<void>;
  loadNationality: () => Promise<void>;
  setNationality: (nationality: string) => Promise<void>;
  updateTripSettings: (tripId: string, nationality: string, purpose: TripPurpose, passportType?: PassportType) => Promise<void>;

  // Document CRUD
  addDocument: (tripId: string, doc: Omit<TripDocument, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  removeDocument: (tripId: string, documentId: string) => Promise<void>;

  // Timeline CRUD
  addTimelineEvent: (tripId: string, event: Omit<TimelineEvent, 'id'>) => Promise<void>;
  removeTimelineEvent: (tripId: string, eventId: string) => Promise<void>;
}

export const useDocumentStore = create<DocumentState>((set, get) => ({
  currentTripDocs: null,
  userNationality: '',
  isLoading: false,
  error: null,

  loadDocuments: async (tripId: string) => {
    set({ isLoading: true, error: null });
    try {
      const data = await loadTripDocuments(tripId);
      set({ currentTripDocs: data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load documents',
        isLoading: false,
      });
    }
  },

  loadNationality: async () => {
    try {
      const nationality = await loadUserNationality();
      set({ userNationality: nationality });
    } catch (error) {
      console.error('Error loading nationality:', error);
    }
  },

  setNationality: async (nationality: string) => {
    try {
      await saveUserNationality(nationality);
      set({ userNationality: nationality });
    } catch (error) {
      console.error('Error saving nationality:', error);
    }
  },

  updateTripSettings: async (tripId: string, nationality: string, purpose: TripPurpose, passportType: PassportType = 'ordinary') => {
    try {
      const data = await loadTripDocuments(tripId);
      data.nationality = nationality;
      data.tripPurpose = purpose;
      data.passportType = passportType;
      await saveTripDocuments(data);
      set({ currentTripDocs: data });
      // Also save nationality as user preference
      await saveUserNationality(nationality);
      set({ userNationality: nationality });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update settings' });
    }
  },

  addDocument: async (tripId: string, doc) => {
    try {
      const newDoc: TripDocument = {
        ...doc,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        tripId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const data = await addDocStorage(tripId, newDoc);
      set({ currentTripDocs: data });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to add document' });
    }
  },

  removeDocument: async (tripId: string, documentId: string) => {
    try {
      const data = await removeDocStorage(tripId, documentId);
      set({ currentTripDocs: data });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to remove document' });
    }
  },

  addTimelineEvent: async (tripId: string, event) => {
    try {
      const newEvent: TimelineEvent = {
        ...event,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      };
      const data = await addEventStorage(tripId, newEvent);
      set({ currentTripDocs: data });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to add timeline event' });
    }
  },

  removeTimelineEvent: async (tripId: string, eventId: string) => {
    try {
      const data = await removeEventStorage(tripId, eventId);
      set({ currentTripDocs: data });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to remove event' });
    }
  },
}));
