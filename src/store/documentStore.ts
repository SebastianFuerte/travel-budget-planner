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
import { generateId } from '../utils/id';

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
      set({ error: 'Could not load nationality. Entry requirements may be inaccurate.' });
    }
  },

  setNationality: async (nationality: string) => {
    const previous = (await loadUserNationality()) ?? '';
    try {
      await saveUserNationality(nationality);
      set({ userNationality: nationality });
    } catch (error) {
      console.error('Error saving nationality:', error);
      set({ userNationality: previous, error: 'Failed to save nationality' });
      throw error;
    }
  },

  updateTripSettings: async (tripId: string, nationality: string, purpose: TripPurpose, passportType: PassportType = 'ordinary') => {
    try {
      const data = await loadTripDocuments(tripId);
      data.nationality = nationality;
      data.tripPurpose = purpose;
      data.passportType = passportType;
      await saveTripDocuments(data);
      await saveUserNationality(nationality);
      set({ currentTripDocs: data, userNationality: nationality });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update settings' });
      throw error;
    }
  },

  addDocument: async (tripId: string, doc) => {
    try {
      const newDoc: TripDocument = {
        ...doc,
        id: generateId(),
        tripId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const data = await addDocStorage(tripId, newDoc);
      set({ currentTripDocs: data });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to add document' });
      throw error;
    }
  },

  removeDocument: async (tripId: string, documentId: string) => {
    try {
      const data = await removeDocStorage(tripId, documentId);
      set({ currentTripDocs: data });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to remove document' });
      throw error;
    }
  },

  addTimelineEvent: async (tripId: string, event) => {
    try {
      const newEvent: TimelineEvent = {
        ...event,
        id: generateId(),
      };
      const data = await addEventStorage(tripId, newEvent);
      set({ currentTripDocs: data });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to add timeline event' });
      throw error;
    }
  },

  removeTimelineEvent: async (tripId: string, eventId: string) => {
    try {
      const data = await removeEventStorage(tripId, eventId);
      set({ currentTripDocs: data });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to remove event' });
      throw error;
    }
  },
}));
