// src/services/analytics.ts

import { AnalyticsEvent } from '../types';

/**
 * Mock analytics service
 * In production, this would integrate with Firebase Analytics, Mixpanel, etc.
 */

const events: AnalyticsEvent[] = [];

export const logEvent = (
  eventName: string,
  properties?: Record<string, any>
): void => {
  const event: AnalyticsEvent = {
    event: eventName,
    properties,
    timestamp: new Date(),
  };
  
  events.push(event);
  
  // Console log for development
  console.log('📊 Analytics:', eventName, properties);
  
  // TODO: Send to real analytics service
};

export const logScreenView = (screenName: string): void => {
  logEvent('screen_view', { screen_name: screenName });
};

export const logTripCreated = (
  destination: string,
  days: number,
  style: string
): void => {
  logEvent('trip_created', {
    destination,
    number_of_days: days,
    travel_style: style,
  });
};

export const logTripEdited = (tripId: string): void => {
  logEvent('trip_edited', { trip_id: tripId });
};

export const logTripDeleted = (tripId: string): void => {
  logEvent('trip_deleted', { trip_id: tripId });
};

export const logTripDuplicated = (tripId: string): void => {
  logEvent('trip_duplicated', { trip_id: tripId });
};

export const logShareCardGenerated = (tripId: string): void => {
  logEvent('share_card_generated', { trip_id: tripId });
};

export const logPaywallOpened = (source: string): void => {
  logEvent('paywall_opened', { source });
};

export const logSubscriptionStarted = (tier: string): void => {
  logEvent('subscription_started', { tier });
};

export const logDemoModeOpened = (): void => {
  logEvent('demo_mode_opened');
};

export const logDocumentsViewed = (tripId: string): void => {
  logEvent('documents_viewed', { trip_id: tripId });
};

export const logDocumentAdded = (tripId: string, category: string): void => {
  logEvent('document_added', { trip_id: tripId, category });
};

export const logMigrationModeOpened = (tripId: string): void => {
  logEvent('migration_mode_opened', { trip_id: tripId });
};

export const logEntryRequirementsChecked = (nationality: string, destination: string): void => {
  logEvent('entry_requirements_checked', { nationality, destination });
};

export const getEvents = (): AnalyticsEvent[] => {
  return [...events];
};

export const clearEvents = (): void => {
  events.length = 0;
};
