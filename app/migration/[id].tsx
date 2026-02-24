// app/migration/[id].tsx
// Migration Mode - Single optimized screen for airport/migration use
// Shows passport, visa, flight, and accommodation at a glance

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { safeGoBack } from '../../src/utils/navigation';
import { format } from 'date-fns';
import { ScreenContainer } from '../../src/components/layout/ScreenContainer';
import { useTripStore } from '../../src/store';
import { useDocumentStore } from '../../src/store/documentStore';
import colors from '../../src/theme/colors';
import { DOCUMENT_CATEGORIES, TripDocument } from '../../src/types/documents';

export default function MigrationModeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const getTripById = useTripStore(state => state.getTripById);
  const { currentTripDocs, loadDocuments } = useDocumentStore();
  const trip = getTripById(id);

  useEffect(() => {
    if (id) loadDocuments(id);
  }, [id]);

  if (!trip) {
    return (
      <ScreenContainer>
        <View style={styles.center}>
          <Text style={styles.errorText}>Trip not found</Text>
          <TouchableOpacity onPress={() => safeGoBack()}>
            <Text style={styles.backLink}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  const docs = currentTripDocs?.documents || [];

  // Find key documents
  const passportDoc = docs.find(d => d.category === 'passport');
  const visaDoc = docs.find(d => d.category === 'visa');
  const flightDocs = docs.filter(d => d.category === 'flight');
  const accommodationDocs = docs.filter(d => d.category === 'accommodation');
  const insuranceDoc = docs.find(d => d.category === 'insurance');

  const renderDocCard = (
    title: string,
    icon: string,
    doc: TripDocument | undefined,
    statusColor: string
  ) => (
    <View style={styles.migrationCard}>
      <View style={styles.migrationCardHeader}>
        <Text style={styles.migrationCardIcon}>{icon}</Text>
        <Text style={styles.migrationCardTitle}>{title}</Text>
        <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />
      </View>
      {doc ? (
        <View style={styles.migrationCardBody}>
          <Text style={styles.migrationCardDocTitle}>{doc.title}</Text>
          {doc.notes && <Text style={styles.migrationCardNotes}>{doc.notes}</Text>}
          {doc.fileUri && (
            <Text style={styles.migrationCardFile}>
              {doc.fileType === 'pdf' ? 'PDF attached' : 'Image attached'}
            </Text>
          )}
        </View>
      ) : (
        <View style={styles.migrationCardBody}>
          <Text style={styles.migrationCardMissing}>Not uploaded yet</Text>
        </View>
      )}
    </View>
  );

  const renderDocList = (title: string, icon: string, docList: TripDocument[]) => (
    <View style={styles.migrationCard}>
      <View style={styles.migrationCardHeader}>
        <Text style={styles.migrationCardIcon}>{icon}</Text>
        <Text style={styles.migrationCardTitle}>{title}</Text>
        <View
          style={[
            styles.statusIndicator,
            { backgroundColor: docList.length > 0 ? colors.success : colors.warning },
          ]}
        />
      </View>
      {docList.length > 0 ? (
        docList.map(doc => (
          <View key={doc.id} style={styles.migrationCardBody}>
            <Text style={styles.migrationCardDocTitle}>{doc.title}</Text>
            {doc.date && (
              <Text style={styles.migrationCardNotes}>
                {format(new Date(doc.date), 'MMM dd, yyyy')}
              </Text>
            )}
            {doc.notes && <Text style={styles.migrationCardNotes}>{doc.notes}</Text>}
          </View>
        ))
      ) : (
        <View style={styles.migrationCardBody}>
          <Text style={styles.migrationCardMissing}>Not uploaded yet</Text>
        </View>
      )}
    </View>
  );

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => safeGoBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.modeHeader}>
        <Text style={styles.modeBadge}>MIGRATION MODE</Text>
        <Text style={styles.modeTitle}>{trip.destination}</Text>
        <Text style={styles.modeSubtitle}>
          {trip.city}, {trip.country}
        </Text>
        <Text style={styles.modeDates}>
          {format(trip.startDate, 'MMM dd')} - {format(trip.endDate, 'MMM dd, yyyy')}
        </Text>
      </View>

      {/* Key Documents */}
      <View style={styles.section}>
        {renderDocCard(
          'Passport',
          '🛂',
          passportDoc,
          passportDoc ? colors.success : colors.error
        )}
        {renderDocCard(
          'Visa / Permit',
          '📋',
          visaDoc,
          visaDoc ? colors.success : colors.warning
        )}
        {renderDocList('Flights', '✈️', flightDocs)}
        {renderDocList('Accommodation', '🏨', accommodationDocs)}
        {renderDocCard(
          'Travel Insurance',
          '🛡️',
          insuranceDoc,
          insuranceDoc ? colors.success : colors.warning
        )}
      </View>

      {/* Offline Notice */}
      <View style={styles.offlineNotice}>
        <Text style={styles.offlineIcon}>📱</Text>
        <Text style={styles.offlineText}>
          This screen works offline. All data is stored locally on your device.
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  backLink: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  header: {
    marginBottom: 8,
  },
  backButton: {
    paddingVertical: 8,
  },
  backText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  modeHeader: {
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 16,
    backgroundColor: colors.text,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  modeBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.warning,
    letterSpacing: 2,
    marginBottom: 8,
  },
  modeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.background,
    marginBottom: 4,
  },
  modeSubtitle: {
    fontSize: 14,
    color: colors.borderDark,
    marginBottom: 4,
  },
  modeDates: {
    fontSize: 13,
    color: colors.borderDark,
  },
  section: {
    gap: 12,
    marginBottom: 16,
  },
  migrationCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  migrationCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  migrationCardIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  migrationCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  migrationCardBody: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundTertiary,
  },
  migrationCardDocTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  migrationCardNotes: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  migrationCardFile: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 4,
    fontWeight: '500',
  },
  migrationCardMissing: {
    fontSize: 13,
    color: colors.textTertiary,
    fontStyle: 'italic',
  },
  offlineNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 14,
    marginBottom: 32,
  },
  offlineIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  offlineText: {
    fontSize: 12,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
});
