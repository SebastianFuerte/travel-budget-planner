// src/services/documentStorage.ts
// Local storage for trip documents and timeline events

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TripDocument, TimelineEvent, TripDocumentsData, TripPurpose, PassportType } from '../types/documents';

const DOCS_KEY_PREFIX = '@travel_docs_';
const NATIONALITY_KEY = '@travel_user_nationality';

const getDocsKey = (tripId: string): string => `${DOCS_KEY_PREFIX}${tripId}`;

/**
 * Load all document data for a trip
 */
export const loadTripDocuments = async (tripId: string): Promise<TripDocumentsData> => {
  try {
    const jsonValue = await AsyncStorage.getItem(getDocsKey(tripId));
    if (jsonValue === null) {
      return {
        tripId,
        nationality: '',
        passportType: 'ordinary',
        tripPurpose: 'tourism',
        documents: [],
        timelineEvents: [],
      };
    }
    return JSON.parse(jsonValue);
  } catch (error) {
    console.error('Error loading trip documents:', error);
    return {
      tripId,
      nationality: '',
      tripPurpose: 'tourism',
      documents: [],
      timelineEvents: [],
    };
  }
};

/**
 * Save all document data for a trip
 */
export const saveTripDocuments = async (data: TripDocumentsData): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(getDocsKey(data.tripId), jsonValue);
  } catch (error) {
    console.error('Error saving trip documents:', error);
    throw error;
  }
};

/**
 * Add a document to a trip
 */
export const addDocument = async (
  tripId: string,
  document: TripDocument
): Promise<TripDocumentsData> => {
  const data = await loadTripDocuments(tripId);
  data.documents.push(document);
  await saveTripDocuments(data);
  return data;
};

/**
 * Remove a document from a trip
 */
export const removeDocument = async (
  tripId: string,
  documentId: string
): Promise<TripDocumentsData> => {
  const data = await loadTripDocuments(tripId);
  data.documents = data.documents.filter(d => d.id !== documentId);
  await saveTripDocuments(data);
  return data;
};

/**
 * Add a timeline event to a trip
 */
export const addTimelineEvent = async (
  tripId: string,
  event: TimelineEvent
): Promise<TripDocumentsData> => {
  const data = await loadTripDocuments(tripId);
  data.timelineEvents.push(event);
  // Sort by date
  data.timelineEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  await saveTripDocuments(data);
  return data;
};

/**
 * Remove a timeline event
 */
export const removeTimelineEvent = async (
  tripId: string,
  eventId: string
): Promise<TripDocumentsData> => {
  const data = await loadTripDocuments(tripId);
  data.timelineEvents = data.timelineEvents.filter(e => e.id !== eventId);
  await saveTripDocuments(data);
  return data;
};

/**
 * Update nationality and purpose for a trip
 */
export const updateTripNationality = async (
  tripId: string,
  nationality: string,
  tripPurpose: TripPurpose,
  passportType: PassportType = 'ordinary'
): Promise<TripDocumentsData> => {
  const data = await loadTripDocuments(tripId);
  data.nationality = nationality;
  data.tripPurpose = tripPurpose;
  data.passportType = passportType;
  await saveTripDocuments(data);
  return data;
};

/**
 * Save user's default nationality
 */
export const saveUserNationality = async (nationality: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(NATIONALITY_KEY, nationality);
  } catch (error) {
    console.error('Error saving nationality:', error);
  }
};

/**
 * Load user's default nationality
 */
export const loadUserNationality = async (): Promise<string> => {
  try {
    const value = await AsyncStorage.getItem(NATIONALITY_KEY);
    return value || '';
  } catch (error) {
    console.error('Error loading nationality:', error);
    return '';
  }
};

/**
 * Delete all documents for a trip
 */
export const deleteTripDocuments = async (tripId: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(getDocsKey(tripId));
  } catch (error) {
    console.error('Error deleting trip documents:', error);
  }
};
