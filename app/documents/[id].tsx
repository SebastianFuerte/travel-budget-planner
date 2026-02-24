// app/documents/[id].tsx
// Documents & Entry Requirements hub screen for a specific trip

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { safeGoBack } from '../../src/utils/navigation';
import { format } from 'date-fns';
import { ScreenContainer } from '../../src/components/layout/ScreenContainer';
import { Button } from '../../src/components/ui/Button';
import { Select } from '../../src/components/ui/Select';
import { SearchableSelect } from '../../src/components/ui/SearchableSelect';
import { EntryRequirementsCard } from '../../src/components/documents/EntryRequirementsCard';
import { DocumentVault } from '../../src/components/documents/DocumentVault';
import { TripTimeline } from '../../src/components/documents/TripTimeline';
import { useTripStore } from '../../src/store';
import { useDocumentStore } from '../../src/store/documentStore';
import { getEntryRequirements } from '../../src/services/visaRequirements';
import { getCountries } from '../../src/services/countries';
import colors from '../../src/theme/colors';
import { TripPurpose, PassportType, EntryRequirement, PASSPORT_TYPE_LABELS } from '../../src/types/documents';

type TabType = 'requirements' | 'documents' | 'timeline';

export default function DocumentsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const getTripById = useTripStore(state => state.getTripById);
  const {
    currentTripDocs,
    userNationality,
    isLoading,
    loadDocuments,
    loadNationality,
    updateTripSettings,
  } = useDocumentStore();

  const trip = getTripById(id);

  const [activeTab, setActiveTab] = useState<TabType>('requirements');
  const [selectedNationality, setSelectedNationality] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState<TripPurpose>('tourism');
  const [selectedPassportType, setSelectedPassportType] = useState<PassportType>('ordinary');
  const [requirement, setRequirement] = useState<EntryRequirement | null>(null);

  useEffect(() => {
    if (id) {
      loadDocuments(id);
      loadNationality();
    }
  }, [id]);

  useEffect(() => {
    // Set nationality from saved preference or trip docs
    if (currentTripDocs?.nationality) {
      setSelectedNationality(currentTripDocs.nationality);
      setSelectedPurpose(currentTripDocs.tripPurpose);
      setSelectedPassportType(currentTripDocs.passportType || 'ordinary');
    } else if (userNationality) {
      setSelectedNationality(userNationality);
    }
  }, [currentTripDocs, userNationality]);

  useEffect(() => {
    // Look up requirements when nationality, destination, or passport type changes
    if (selectedNationality && trip?.country) {
      const req = getEntryRequirements(selectedNationality, trip.country, selectedPurpose, selectedPassportType);
      setRequirement(req);
    } else {
      setRequirement(null);
    }
  }, [selectedNationality, selectedPurpose, selectedPassportType, trip?.country]);

  const handleNationalityChange = (value: string) => {
    setSelectedNationality(value);
    if (id) {
      updateTripSettings(id, value, selectedPurpose, selectedPassportType);
    }
  };

  const handlePurposeChange = (value: string) => {
    const purpose = value as TripPurpose;
    setSelectedPurpose(purpose);
    if (id && selectedNationality) {
      updateTripSettings(id, selectedNationality, purpose, selectedPassportType);
    }
  };

  const handlePassportTypeChange = (value: string) => {
    const passportType = value as PassportType;
    setSelectedPassportType(passportType);
    if (id && selectedNationality) {
      updateTripSettings(id, selectedNationality, selectedPurpose, passportType);
    }
  };

  if (!trip) {
    return (
      <ScreenContainer>
        <View style={styles.center}>
          <Text style={styles.errorText}>Trip not found</Text>
          <Button title="Go Back" onPress={() => safeGoBack()} />
        </View>
      </ScreenContainer>
    );
  }

  const allCountries = getCountries();
  const purposeOptions = [
    { label: 'Tourism', value: 'tourism' },
    { label: 'Business', value: 'business' },
  ];

  const passportTypeOptions = (Object.keys(PASSPORT_TYPE_LABELS) as PassportType[]).map(key => ({
    label: PASSPORT_TYPE_LABELS[key],
    value: key,
  }));

  const tabs: { key: TabType; label: string; icon: string }[] = [
    { key: 'requirements', label: 'Entry Req.', icon: '🛂' },
    { key: 'documents', label: 'Documents', icon: '📁' },
    { key: 'timeline', label: 'Timeline', icon: '📅' },
  ];

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => safeGoBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleSection}>
        <Text style={styles.title}>Documents & Requirements</Text>
        <Text style={styles.subtitle}>
          {trip.destination} - {trip.city}, {trip.country}
        </Text>
        <Text style={styles.dates}>
          {format(trip.startDate, 'MMM dd')} - {format(trip.endDate, 'MMM dd, yyyy')}
        </Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      {activeTab === 'requirements' && (
        <View style={styles.tabContent}>
          {/* Nationality Selector */}
          <SearchableSelect
            label="Your Passport (Nationality)"
            options={allCountries}
            value={selectedNationality}
            onChange={handleNationalityChange}
            placeholder="Select your nationality"
            searchPlaceholder="Search country..."
          />

          <Select
            label="Passport Type"
            options={passportTypeOptions}
            value={selectedPassportType}
            onChange={handlePassportTypeChange}
          />

          <Select
            label="Trip Purpose"
            options={purposeOptions}
            value={selectedPurpose}
            onChange={handlePurposeChange}
          />

          {/* Requirements Result */}
          {selectedNationality && requirement ? (
            <View style={styles.requirementsResult}>
              <EntryRequirementsCard requirement={requirement} />
            </View>
          ) : selectedNationality && !requirement ? (
            <View style={styles.noData}>
              <Text style={styles.noDataIcon}>🔍</Text>
              <Text style={styles.noDataTitle}>No data available</Text>
              <Text style={styles.noDataText}>
                Entry requirements for {selectedNationality} passport to {trip.country} are not in
                our database yet. Check these official sources:
              </Text>
              <View style={styles.officialLinksBox}>
                <TouchableOpacity onPress={() => Linking.openURL(
                  `https://www.google.com/search?q=${encodeURIComponent(selectedNationality + ' passport visa requirements ' + trip.country)}`
                )}>
                  <Text style={styles.officialLink}>Search visa requirements</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(
                  'https://www.iatatravelcentre.com/world.php'
                )}>
                  <Text style={styles.officialLink}>IATA Travel Centre</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(
                  'https://www.timaticweb2.com/integration/external?ref=pieceoftravel'
                )}>
                  <Text style={styles.officialLink}>Timatic (Used by Airlines)</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.noData}>
              <Text style={styles.noDataIcon}>🛂</Text>
              <Text style={styles.noDataTitle}>Select your nationality</Text>
              <Text style={styles.noDataText}>
                Choose your passport nationality above to see entry requirements for {trip.country}.
              </Text>
            </View>
          )}

          {/* Disclaimer */}
          <View style={styles.disclaimerBox}>
            <Text style={styles.disclaimerTitle}>Important</Text>
            <Text style={styles.disclaimerText}>
              This information is for guidance only. Entry requirements change frequently. Always
              verify with the official embassy or consulate of your destination country before
              traveling.
            </Text>
          </View>
        </View>
      )}

      {activeTab === 'documents' && (
        <View style={styles.tabContent}>
          <DocumentVault
            tripId={id}
            documents={currentTripDocs?.documents || []}
          />
        </View>
      )}

      {activeTab === 'timeline' && (
        <View style={styles.tabContent}>
          <TripTimeline
            tripId={id}
            events={currentTripDocs?.timelineEvents || []}
            tripStartDate={trip.startDate}
            tripEndDate={trip.endDate}
          />
        </View>
      )}

      {/* Migration Mode Button */}
      <View style={styles.migrationSection}>
        <Button
          title="Open Migration Mode"
          onPress={() => router.push(`/migration/${id}`)}
          variant="secondary"
          fullWidth
        />
        <Text style={styles.migrationHint}>
          Quick view of all essential documents for airport & migration checkpoints.
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
  titleSection: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  dates: {
    fontSize: 13,
    color: colors.textTertiary,
  },
  // Tab bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 4,
  },
  tabActive: {
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tabIcon: {
    fontSize: 14,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  tabContent: {
    marginBottom: 16,
  },
  requirementsResult: {
    marginTop: 16,
  },
  noData: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    marginTop: 16,
    paddingHorizontal: 24,
  },
  noDataIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  noDataTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  noDataText: {
    fontSize: 13,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: 20,
  },
  officialLinksBox: {
    marginTop: 12,
    gap: 8,
    width: '100%',
  },
  officialLink: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 6,
  },
  disclaimerBox: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  disclaimerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 4,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#92400E',
    lineHeight: 18,
  },
  migrationSection: {
    marginBottom: 32,
    marginTop: 8,
  },
  migrationHint: {
    fontSize: 12,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: 8,
  },
});
