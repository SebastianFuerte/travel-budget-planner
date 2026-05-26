// app/trip/edit/[id].tsx
// Edit an existing trip — same form as Create but pre-populated

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { safeGoBack } from '../../../src/utils/navigation';
import { ScreenContainer } from '../../../src/components/layout/ScreenContainer';
import { Input } from '../../../src/components/ui/Input';
import { Select } from '../../../src/components/ui/Select';
import { SearchableSelect } from '../../../src/components/ui/SearchableSelect';
import { CurrencySelect } from '../../../src/components/ui/CurrencySelect';
import { DateRangePicker } from '../../../src/components/ui/DateRangePicker';
import { Button } from '../../../src/components/ui/Button';
import { Card } from '../../../src/components/ui/Card';
import { useTripStore } from '../../../src/store';
import { Currency, TravelStyle, TravelerProfile } from '../../../src/types';
import { TEMPLATES } from '../../../src/services/templates';
import { getBudgetForDestination, getCostLevel, getCostLevelDollars, getCostLevelLabel } from '../../../src/services/cityBudgets';
import { getProfileOptions, applyProfileToBudget } from '../../../src/services/travelerProfiles';
import { getCountries, getCitiesForCountry } from '../../../src/services/countries';
import { validateTripName, validateNumberOfPeople } from '../../../src/utils/validation';
import { infoAlert } from '../../../src/utils/alert';
import colors from '../../../src/theme/colors';
import { TRAVEL_STYLES } from '../../../src/utils/constants';
import { getAirportOptions, getAirportLabel } from '../../../src/services/airports';

export default function EditTripScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const getTripById = useTripStore(state => state.getTripById);
  const updateTrip = useTripStore(state => state.updateTrip);

  const trip = getTripById(id);

  const [tripName, setTripName] = useState(trip?.destination ?? '');
  const [city, setCity] = useState(trip?.city ?? '');
  const [country, setCountry] = useState(trip?.country ?? '');
  const [originIATA, setOriginIATA] = useState(trip?.originIATA ?? '');
  const [startDate, setStartDate] = useState<Date | null>(trip ? new Date(trip.startDate) : null);
  const [endDate, setEndDate] = useState<Date | null>(trip ? new Date(trip.endDate) : null);
  const [numberOfPeople, setNumberOfPeople] = useState(String(trip?.numberOfPeople ?? '2'));
  const [currency, setCurrency] = useState<Currency>(trip?.currency ?? 'USD');
  const [travelStyle, setTravelStyle] = useState<TravelStyle>(trip?.travelStyle ?? 'Mid');
  const [travelerProfile, setTravelerProfile] = useState<TravelerProfile | ''>(trip?.travelerProfile ?? '');
  const [selectedTags, setSelectedTags] = useState<string[]>(trip?.tags ?? []);
  const [notes, setNotes] = useState(trip?.notes ?? '');
  const [recalcBudget, setRecalcBudget] = useState(false);
  const [loading, setLoading] = useState(false);

const AVAILABLE_TAGS = ['🌴 Beach', '🏔️ Mountains', '🏙️ City Break', '💑 Honeymoon', '👨‍👩‍👧 Family', '💼 Business', '🎒 Backpacking', '🍷 Gastronomy', '🎭 Culture', '🏄 Adventure', '🧘 Wellness', '🎓 Student'];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const profileOptions = useMemo(() => getProfileOptions(), []);
  const airportOptions = useMemo(() => getAirportOptions(), []);
  const countries = useMemo(() => getCountries(), []);
  const cities = useMemo(() => {
    if (!country) return [];
    return getCitiesForCountry(country);
  }, [country]);

  const costLevel = useMemo(() => {
    if (!city || !country) return null;
    return getCostLevel(city, country);
  }, [city, country]);

  const handleCountryChange = (value: string) => {
    setCountry(value);
    setCity('');
    setRecalcBudget(true);
  };

  const handleCityChange = (value: string) => {
    setCity(value);
    setRecalcBudget(true);
  };

  const handleStyleChange = (value: string) => {
    setTravelStyle(value as TravelStyle);
    setRecalcBudget(true);
  };

  const handleSave = async () => {
    const nameError = validateTripName(tripName);
    if (nameError) { infoAlert('Invalid Trip Name', nameError); return; }
    if (!city || !country) { infoAlert('Missing Information', 'Please select a country and city'); return; }
    if (!startDate || !endDate) { infoAlert('Missing Dates', 'Please select travel dates'); return; }
    if (startDate.getTime() > endDate.getTime()) { infoAlert('Invalid Dates', 'Start date must be before end date'); return; }

    const peopleCount = parseInt(numberOfPeople);
    const peopleError = validateNumberOfPeople(peopleCount);
    if (peopleError) { infoAlert('Invalid Number', peopleError); return; }

    setLoading(true);
    try {
      let updates: Parameters<typeof updateTrip>[1] = {
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        destination: tripName,
        city,
        country,
        originIATA: originIATA || undefined,
        originCity: originIATA ? getAirportLabel(originIATA) : undefined,
        startDate,
        endDate,
        numberOfPeople: peopleCount,
        currency,
        travelStyle,
        travelerProfile: travelerProfile || undefined,
        notes: notes.trim() || undefined,
      };

      // Recalculate budget only if destination/style changed
      if (recalcBudget) {
        let budget = getBudgetForDestination(city, country, travelStyle);
        if (travelerProfile) budget = applyProfileToBudget(budget, travelerProfile);
        updates.budget = budget;
        updates.confirmedPrices = []; // reset confirmed prices if recalculating
      }

      await updateTrip(id, updates);
      router.replace(`/trip/${id}`);
    } catch {
      infoAlert('Error', 'Failed to save changes');
      setLoading(false);
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

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => safeGoBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Edit Trip</Text>

      {recalcBudget && (
        <View style={styles.recalcBanner}>
          <Text style={styles.recalcText}>
            ⚠️ Destination or style changed — budget will be recalculated and confirmed prices reset.
          </Text>
        </View>
      )}

      <Card>
        <Text style={styles.sectionTitle}>Trip Details</Text>

        <Input
          label="Trip Name"
          value={tripName}
          onChangeText={setTripName}
          placeholder="e.g., Summer Japan Adventure"
        />

        <SearchableSelect
          label="Origin City"
          value={originIATA}
          options={airportOptions}
          onChange={setOriginIATA}
          placeholder="Where are you flying from?"
          searchPlaceholder="Search city or IATA code..."
        />

        <SearchableSelect
          label="Country"
          value={country}
          options={countries}
          onChange={handleCountryChange}
          placeholder="Search and select country..."
          searchPlaceholder="Type to search countries..."
        />

        <SearchableSelect
          label="City"
          value={city}
          options={cities}
          onChange={handleCityChange}
          placeholder={country ? 'Search and select city...' : 'Select a country first'}
          searchPlaceholder="Type to search cities..."
          disabled={!country}
          allowCustom
        />

        <DateRangePicker
          label="Travel Dates"
          startDate={startDate}
          endDate={endDate}
          onRangeChange={(s, e) => { setStartDate(s); setEndDate(e); }}
        />

        <Input
          label="Number of Travelers"
          value={numberOfPeople}
          onChangeText={setNumberOfPeople}
          keyboardType="number-pad"
          placeholder="2"
        />

        <CurrencySelect
          label="Currency"
          value={currency}
          selectedCountry={country}
          onChange={(v) => setCurrency(v as Currency)}
        />

        <Select
          label="Travel Style"
          value={travelStyle}
          options={TRAVEL_STYLES.map(s => ({ label: s, value: s }))}
          onChange={handleStyleChange}
        />

        <Input
          label="Notes (Optional)"
          value={notes}
          onChangeText={setNotes}
          placeholder="Add any notes about this trip..."
          multiline
        />
      </Card>

      {costLevel !== null && (
        <View style={styles.costIndicator}>
          <Text style={styles.costDollars}>{getCostLevelDollars(costLevel)}</Text>
          <Text style={styles.costLabel}>{getCostLevelLabel(costLevel)} destination</Text>
        </View>
      )}

      <Card>
        <Text style={styles.sectionTitle}>Traveler Profile (Optional)</Text>
        <Text style={styles.profileHint}>Adjusts budget estimates based on your travel style</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.profileScroll} contentContainerStyle={styles.profileScrollContent}>
          <TouchableOpacity
            style={[styles.profileChip, !travelerProfile && styles.profileChipSelected]}
            onPress={() => setTravelerProfile('')}
          >
            <Text style={styles.profileChipIcon}>-</Text>
            <Text style={[styles.profileChipLabel, !travelerProfile && styles.profileChipLabelSelected]}>None</Text>
          </TouchableOpacity>
          {profileOptions.map(p => (
            <TouchableOpacity
              key={p.id}
              style={[styles.profileChip, travelerProfile === p.id && styles.profileChipSelected]}
              onPress={() => setTravelerProfile(p.id)}
            >
              <Text style={styles.profileChipIcon}>{p.icon}</Text>
              <Text style={[styles.profileChipLabel, travelerProfile === p.id && styles.profileChipLabelSelected]}>{p.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Trip Tags (Optional)</Text>
        <Text style={styles.profileHint}>Add labels to organize your trips</Text>
        <View style={styles.tagsGrid}>
          {AVAILABLE_TAGS.map(tag => (
            <TouchableOpacity
              key={tag}
              style={[styles.tagChip, selectedTags.includes(tag) && styles.tagChipSelected]}
              onPress={() => toggleTag(tag)}
            >
              <Text style={[styles.tagChipText, selectedTags.includes(tag) && styles.tagChipTextSelected]}>
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      <Button
        title={loading ? 'Saving...' : 'Save Changes'}
        onPress={handleSave}
        loading={loading}
        fullWidth
        style={styles.saveButton}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: colors.textSecondary, marginBottom: 16 },
  header: { marginBottom: 8 },
  backButton: { paddingVertical: 8 },
  backText: { fontSize: 16, color: colors.primary, fontWeight: '600' },
  title: { fontSize: 28, fontWeight: '800', color: colors.text, marginBottom: 16 },
  recalcBanner: {
    backgroundColor: '#FEF3C7', borderRadius: 10, padding: 12,
    marginBottom: 16, borderWidth: 1, borderColor: '#FDE68A',
  },
  recalcText: { fontSize: 12, color: '#92400E' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 12 },
  costIndicator: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.backgroundSecondary,
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 16, gap: 8,
  },
  costDollars: { fontSize: 16, fontWeight: '700', color: colors.primary },
  costLabel: { fontSize: 13, color: colors.textSecondary },
  profileHint: { fontSize: 12, color: colors.textSecondary, marginBottom: 12, marginTop: -4 },
  profileScroll: { marginHorizontal: -4, marginBottom: 8 },
  profileScrollContent: { gap: 8, paddingHorizontal: 4 },
  profileChip: {
    alignItems: 'center', backgroundColor: colors.backgroundSecondary,
    borderRadius: 12, borderWidth: 2, borderColor: 'transparent',
    paddingVertical: 10, paddingHorizontal: 14, minWidth: 80,
  },
  profileChipSelected: { borderColor: colors.primary, backgroundColor: colors.primary + '10' },
  profileChipIcon: { fontSize: 22, marginBottom: 4 },
  profileChipLabel: { fontSize: 11, fontWeight: '600', color: colors.textSecondary, textAlign: 'center' },
  profileChipLabelSelected: { color: colors.primary },
  saveButton: { marginTop: 8, marginBottom: 32 },
  tagsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tagChip: {
    paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20,
    borderWidth: 1.5, borderColor: colors.border,
    backgroundColor: colors.backgroundSecondary,
  },
  tagChipSelected: { borderColor: colors.primary, backgroundColor: colors.primary + '15' },
  tagChipText: { fontSize: 12, fontWeight: '500', color: colors.textSecondary },
  tagChipTextSelected: { color: colors.primary, fontWeight: '700' },
});
