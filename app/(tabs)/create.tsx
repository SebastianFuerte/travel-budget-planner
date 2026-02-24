// app/(tabs)/create.tsx

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer } from '../../src/components/layout/ScreenContainer';
import { Input } from '../../src/components/ui/Input';
import { Select } from '../../src/components/ui/Select';
import { SearchableSelect } from '../../src/components/ui/SearchableSelect';
import { CurrencySelect } from '../../src/components/ui/CurrencySelect';
import { DateRangePicker } from '../../src/components/ui/DateRangePicker';
import { Button } from '../../src/components/ui/Button';
import { Card } from '../../src/components/ui/Card';
import { useTripStore } from '../../src/store';
import { Trip, Currency, TravelStyle, TravelerProfile } from '../../src/types';
import { TEMPLATES } from '../../src/services/templates';
import { getBudgetForDestination, getCostLevel, getCostLevelDollars, getCostLevelLabel } from '../../src/services/cityBudgets';
import { getProfileOptions, applyProfileToBudget } from '../../src/services/travelerProfiles';
import { getCountries, getCitiesForCountry } from '../../src/services/countries';
import { validateTripName, validateNumberOfPeople } from '../../src/utils/validation';
import { infoAlert } from '../../src/utils/alert';
import colors from '../../src/theme/colors';
import { CURRENCY_NAMES, TRAVEL_STYLES } from '../../src/utils/constants';

export default function CreateTripScreen() {
  const addTrip = useTripStore(state => state.addTrip);

  const [tripName, setTripName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState('2');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('Mid');
  const [travelerProfile, setTravelerProfile] = useState<TravelerProfile | ''>('');
  const [loading, setLoading] = useState(false);

  const profileOptions = useMemo(() => getProfileOptions(), []);

  const countries = useMemo(() => getCountries(), []);
  const cities = useMemo(() => {
    if (!country) return [];
    return getCitiesForCountry(country);
  }, [country]);

  const costLevel = useMemo(() => {
    if (!city || !country) return null;
    return getCostLevel(city, country);
  }, [city, country]);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setCity(template.city);
      setCountry(template.country);
      setCurrency(template.currency);
      setTripName(template.name);
    }
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
    // Reset city when country changes
    setCity('');
  };

  const handleDateRangeChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleCreate = async () => {
    // Validation
    const nameError = validateTripName(tripName);
    if (nameError) {
      infoAlert('Invalid Trip Name', nameError);
      return;
    }

    if (!city || !country) {
      infoAlert('Missing Information', 'Please select a country and city');
      return;
    }

    if (!startDate || !endDate) {
      infoAlert('Missing Dates', 'Please select travel dates using the calendar');
      return;
    }

    if (startDate.getTime() > endDate.getTime()) {
      infoAlert('Invalid Dates', 'Start date must be before end date');
      return;
    }

    const peopleCount = parseInt(numberOfPeople);
    const peopleError = validateNumberOfPeople(peopleCount);
    if (peopleError) {
      infoAlert('Invalid Number', peopleError);
      return;
    }

    setLoading(true);

    try {
      // Get budget: template > city-specific > fallback
      let budget;
      if (selectedTemplate) {
        const template = TEMPLATES.find(t => t.id === selectedTemplate);
        budget = template ? template.budgets[travelStyle] : getBudgetForDestination(city, country, travelStyle);
      } else {
        budget = getBudgetForDestination(city, country, travelStyle);
      }

      // Apply traveler profile multipliers if selected
      if (travelerProfile) {
        budget = applyProfileToBudget(budget, travelerProfile);
      }

      const newTrip: Trip = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        destination: tripName,
        city,
        country,
        startDate,
        endDate,
        numberOfPeople: peopleCount,
        currency,
        travelStyle,
        travelerProfile: travelerProfile || undefined,
        budget,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await addTrip(newTrip);

      // Navigate to the new trip
      router.replace(`/trip/${newTrip.id}`);
    } catch (error) {
      infoAlert('Error', 'Failed to create trip');
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Create New Trip</Text>

      <Card>
        <Select
          label="Start from Template (Optional)"
          value={selectedTemplate}
          options={[
            { label: 'Custom Trip', value: '' },
            ...TEMPLATES.map(t => ({ label: t.name, value: t.id })),
          ]}
          onChange={handleTemplateChange}
        />
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Trip Details</Text>

        <Input
          label="Trip Name"
          value={tripName}
          onChangeText={setTripName}
          placeholder="e.g., Summer Japan Adventure"
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
          onChange={setCity}
          placeholder={country ? 'Search and select city...' : 'Select a country first'}
          searchPlaceholder="Type to search cities..."
          disabled={!country}
          allowCustom
        />

        <DateRangePicker
          label="Travel Dates"
          startDate={startDate}
          endDate={endDate}
          onRangeChange={handleDateRangeChange}
          minDate={new Date()}
        />

        <Input
          label="Number of People"
          value={numberOfPeople}
          onChangeText={setNumberOfPeople}
          keyboardType="number-pad"
          placeholder="2"
        />

        <CurrencySelect
          label="Currency"
          value={currency}
          selectedCountry={country}
          onChange={(value) => setCurrency(value as Currency)}
        />

        <Select
          label="Travel Style"
          value={travelStyle}
          options={TRAVEL_STYLES.map(style => ({
            label: style,
            value: style,
          }))}
          onChange={(value) => setTravelStyle(value as TravelStyle)}
        />
      </Card>

      {costLevel !== null && (
        <View style={styles.costIndicator}>
          <Text style={styles.costDollars}>{getCostLevelDollars(costLevel)}</Text>
          <Text style={styles.costLabel}>
            {getCostLevelLabel(costLevel)} destination
          </Text>
        </View>
      )}

      <Card>
        <Text style={styles.sectionTitle}>Traveler Profile (Optional)</Text>
        <Text style={styles.profileHint}>Adjusts budget estimates based on your travel style</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.profileScroll}
          contentContainerStyle={styles.profileScrollContent}
        >
          <TouchableOpacity
            style={[styles.profileChip, !travelerProfile && styles.profileChipSelected]}
            onPress={() => setTravelerProfile('')}
          >
            <Text style={styles.profileChipIcon}>-</Text>
            <Text style={[styles.profileChipLabel, !travelerProfile && styles.profileChipLabelSelected]}>None</Text>
          </TouchableOpacity>
          {profileOptions.map((profile) => (
            <TouchableOpacity
              key={profile.id}
              style={[styles.profileChip, travelerProfile === profile.id && styles.profileChipSelected]}
              onPress={() => setTravelerProfile(profile.id)}
            >
              <Text style={styles.profileChipIcon}>{profile.icon}</Text>
              <Text style={[styles.profileChipLabel, travelerProfile === profile.id && styles.profileChipLabelSelected]}>
                {profile.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {travelerProfile ? (
          <Text style={styles.profileDescription}>
            {profileOptions.find(p => p.id === travelerProfile)?.description}
          </Text>
        ) : null}
      </Card>

      <Button
        title="Create Trip"
        onPress={handleCreate}
        loading={loading}
        fullWidth
        style={styles.createButton}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  costIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
    gap: 8,
  },
  costDollars: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  costLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  profileHint: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 12,
    marginTop: -4,
  },
  profileScroll: {
    marginHorizontal: -4,
    marginBottom: 8,
  },
  profileScrollContent: {
    gap: 8,
    paddingHorizontal: 4,
  },
  profileChip: {
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 14,
    minWidth: 80,
  },
  profileChipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  profileChipIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  profileChipLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  profileChipLabelSelected: {
    color: colors.primary,
  },
  profileDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 4,
  },
  createButton: {
    marginTop: 8,
    marginBottom: 32,
  },
});
