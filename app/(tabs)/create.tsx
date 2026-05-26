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
import { getCountriesLocalized, getCitiesForCountryLocalized } from '../../src/services/countries';
import { validateTripName, validateNumberOfPeople } from '../../src/utils/validation';
import { infoAlert } from '../../src/utils/alert';
import colors from '../../src/theme/colors';
import { TRAVEL_STYLES } from '../../src/utils/constants';
import { useTranslation } from '../../src/i18n';
import { getAirportOptions, getAirportLabel } from '../../src/services/airports';
import { generateId } from '../../src/utils/id';

export default function CreateTripScreen() {
  const addTrip = useTripStore(state => state.addTrip);
  const { t, language } = useTranslation();

  const [tripName, setTripName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [originIATA, setOriginIATA] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState('2');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('Mid');
  const [travelerProfile, setTravelerProfile] = useState<TravelerProfile | ''>('');
  const [loading, setLoading] = useState(false);

  const profileOptions = useMemo(() => getProfileOptions(), []);
  const airportOptions = useMemo(() => getAirportOptions(), []);

  const countries = useMemo(() => getCountriesLocalized(language), [language]);
  const cities = useMemo(() => {
    if (!country) return [];
    return getCitiesForCountryLocalized(country, language);
  }, [country, language]);

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
      infoAlert(t.create.invalidTripNameTitle, nameError);
      return;
    }

    if (!city || !country) {
      infoAlert(t.create.missingDestinationTitle, t.create.missingDestinationMsg);
      return;
    }

    if (!startDate || !endDate) {
      infoAlert(t.create.missingDatesTitle, t.create.missingDatesMsg);
      return;
    }

    if (startDate.getTime() > endDate.getTime()) {
      infoAlert(t.create.invalidDatesTitle, t.create.invalidDatesMsg);
      return;
    }

    const peopleCount = parseInt(numberOfPeople, 10);
    const peopleError = validateNumberOfPeople(peopleCount);
    if (peopleError) {
      infoAlert(t.create.invalidNumberTitle, peopleError);
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
        id: generateId(),
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
        budget,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await addTrip(newTrip);
      router.replace(`/trip/${newTrip.id}`);
    } catch (error) {
      infoAlert(t.common.error, t.create.createErrorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>{t.create.title}</Text>

      <Card>
        <Select
          label={t.create.templateLabel}
          value={selectedTemplate}
          options={[
            { label: t.create.customTrip, value: '' },
            ...TEMPLATES.map(tmpl => ({ label: tmpl.name, value: tmpl.id })),
          ]}
          onChange={handleTemplateChange}
        />
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>{t.create.tripDetails}</Text>

        <Input
          label={t.create.tripName}
          value={tripName}
          onChangeText={setTripName}
          placeholder={t.create.tripNamePlaceholder}
        />

        <SearchableSelect
          label={t.create.originCity}
          value={originIATA}
          options={airportOptions}
          onChange={setOriginIATA}
          placeholder={t.create.originCityPlaceholder}
          searchPlaceholder={t.create.searchAirportCode}
        />

        <SearchableSelect
          label={t.create.destination}
          value={country}
          options={countries}
          onChange={handleCountryChange}
          placeholder={t.create.searchDestinationPlaceholder}
          searchPlaceholder={t.create.typeDestinationPlaceholder}
          noResultsText={t.create.noResultsFound}
        />

        <SearchableSelect
          label={t.create.city}
          value={city}
          options={cities}
          onChange={setCity}
          placeholder={country ? t.create.searchCityPlaceholder : t.create.selectDestinationFirst}
          searchPlaceholder={t.create.typeCityPlaceholder}
          disabled={!country}
          allowCustom
          noResultsText={t.create.noResultsFound}
        />

        <DateRangePicker
          label={t.create.travelDates}
          startDate={startDate}
          endDate={endDate}
          onRangeChange={handleDateRangeChange}
          minDate={new Date()}
        />

        <Input
          label={t.create.travelers}
          value={numberOfPeople}
          onChangeText={setNumberOfPeople}
          keyboardType="number-pad"
          placeholder="2"
        />

        <CurrencySelect
          label={t.create.currency}
          value={currency}
          selectedCountry={country}
          onChange={(value) => setCurrency(value as Currency)}
        />

        <Select
          label={t.create.travelStyle}
          value={travelStyle}
          options={TRAVEL_STYLES.map(style => ({
            label: style === 'Budget' ? t.create.budget : style === 'Mid' ? t.create.mid : t.create.comfy,
            value: style,
          }))}
          onChange={(value) => setTravelStyle(value as TravelStyle)}
        />
      </Card>

      {costLevel !== null && (
        <View style={styles.costIndicator}>
          <Text style={styles.costDollars}>{getCostLevelDollars(costLevel)}</Text>
          <Text style={styles.costLabel}>
            {getCostLevelLabel(costLevel)} {t.create.costDestination}
          </Text>
        </View>
      )}

      <Card>
        <Text style={styles.sectionTitle}>{t.create.travelerProfile}</Text>
        <Text style={styles.profileHint}>{t.create.travelerProfileHint}</Text>
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
            <Text style={[styles.profileChipLabel, !travelerProfile && styles.profileChipLabelSelected]}>{t.create.noProfile}</Text>
          </TouchableOpacity>
          {profileOptions.map((profile) => (
            <TouchableOpacity
              key={profile.id}
              style={[styles.profileChip, travelerProfile === profile.id && styles.profileChipSelected]}
              onPress={() => setTravelerProfile(profile.id)}
            >
              <Text style={styles.profileChipIcon}>{profile.icon}</Text>
              <Text style={[styles.profileChipLabel, travelerProfile === profile.id && styles.profileChipLabelSelected]}>
                {t.profiles[profile.id].label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {travelerProfile ? (
          <Text style={styles.profileDescription}>
            {t.profiles[travelerProfile as keyof typeof t.profiles].description}
          </Text>
        ) : null}
      </Card>

      <Button
        title={loading ? t.create.creating : t.create.createTrip}
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
