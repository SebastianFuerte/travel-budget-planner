// src/components/trip/BudgetCalculator.tsx
// Budget calculator with accuracy system, accommodation per-night/total,
// flights with origin city, deep link pre-screen, and currency toggle

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { format } from 'date-fns';
import { Trip, BudgetCategories, ConfirmedPrice, Currency, PriceSourceType } from '../../types';
import { Card } from '../ui/Card';
import { DeepLinkPreScreen } from '../ui/DeepLinkPreScreen';
import colors from '../../theme/colors';
import { formatWithFx } from '../../utils/currency';
import { CATEGORY_LABELS } from '../../utils/constants';
import {
  calculateTripSummaryWithConfirmed,
  calculateCategoryTotals,
  getConfirmedPriceForCategory,
} from '../../services/budgetEngine';
import {
  getProvidersForCategory,
  getProviderUrl,
  FLIGHT_PROVIDERS,
} from '../../services/pricingProviders';
import { convert } from '../../services/fxService';
import { infoAlert } from '../../utils/alert';
import { useTripStore, useSettingsStore } from '../../store';
import { useTranslation } from '../../i18n';
import { getAirportOptions, getAirportLabel } from '../../services/airports';
import { SearchableSelect } from '../ui/SearchableSelect';

interface BudgetCalculatorProps {
  trip: Trip;
}

// --- Provenance Badge ---
const ProvenanceBadge: React.FC<{
  sourceType: PriceSourceType | 'HEURISTIC';
  providerName?: string;
  timestamp?: string;
}> = ({ sourceType, providerName, timestamp }) => {
  const { t } = useTranslation();

  if (sourceType === 'USER_CONFIRMED') {
    return (
      <View>
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: '#DCFCE7' }]}>
            <Text style={[styles.badgeText, { color: '#166534' }]}>{t.trip.confirmed}</Text>
          </View>
          {providerName && (
            <Text style={styles.confirmedSource}>{t.common.via} {providerName}</Text>
          )}
        </View>
        {timestamp && (
          <Text style={styles.confirmedDate}>
            {t.trip.lastChecked}: {format(new Date(timestamp), 'MMM dd, yyyy')}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.badgeRow}>
      <View style={[styles.badge, { backgroundColor: '#FEF3C7' }]}>
        <Text style={[styles.badgeText, { color: '#92400E' }]}>{t.trip.estimated}</Text>
      </View>
      <Text style={styles.estimatedHint}>{t.trip.fromCityData}</Text>
    </View>
  );
};

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ trip }) => {
  const summary = calculateTripSummaryWithConfirmed(trip);
  const categoryTotals = calculateCategoryTotals(
    trip.budget,
    summary.numberOfDays,
    trip.numberOfPeople,
  );
  const updateTrip = useTripStore(state => state.updateTrip);
  const userCurrency = useSettingsStore(state => state.userCurrency);

  // --- Currency conversion state ---
  const [showUserCurrency, setShowUserCurrency] = useState(false);
  const [fxRate, setFxRate] = useState<number | null>(null);
  const [fxIsOffline, setFxIsOffline] = useState(false);
  const displayCurrency: Currency = showUserCurrency && userCurrency !== trip.currency
    ? userCurrency : trip.currency;
  const needsFx = showUserCurrency && userCurrency !== trip.currency;

  useEffect(() => {
    if (needsFx) {
      convert(1, trip.currency, userCurrency).then(r => {
        setFxRate(r.rate);
        setFxIsOffline(r.isOffline);
      });
    }
  }, [needsFx, trip.currency, userCurrency]);

  const fx = (amount: number): number => {
    if (!needsFx || !fxRate) return amount;
    return amount * fxRate;
  };

  const fmtFx = (amount: number): string => {
    return formatWithFx(fx(amount), displayCurrency, needsFx);
  };

  // --- Category confirm state ---
  const [confirmingCategory, setConfirmingCategory] = useState<keyof BudgetCategories | null>(null);
  const [confirmAmount, setConfirmAmount] = useState('');
  const [confirmSource, setConfirmSource] = useState('');

  // --- Flight state ---
  const [confirmingFlight, setConfirmingFlight] = useState(false);
  const [flightAmount, setFlightAmount] = useState('');
  const [flightSource, setFlightSource] = useState('');
  const [originIATA, setOriginIATA] = useState(trip.originIATA || '');
  const airportOptions = getAirportOptions();

  // --- DeepLink pre-screen state ---
  const [preScreenVisible, setPreScreenVisible] = useState(false);
  const [preScreenData, setPreScreenData] = useState<{
    providerName: string;
    providerIcon: string;
    url: string;
    params: { label: string; value: string }[];
    limitations?: string;
  } | null>(null);

  // --- Handlers ---

  const handleOpenProvider = (
    url: string,
    providerName: string,
    providerIcon: string,
    params: { label: string; value: string }[],
    limitations?: string
  ) => {
    setPreScreenData({ providerName, providerIcon, url, params, limitations });
    setPreScreenVisible(true);
  };

  const handleOpenCategoryProvider = (
    provider: { id: string; name: string; icon: string },
    url: string,
    category: string
  ) => {
    const params = [
      { label: 'Destination', value: `${trip.city}, ${trip.country}` },
      { label: 'Dates', value: `${format(trip.startDate, 'MMM dd')} - ${format(trip.endDate, 'MMM dd, yyyy')}` },
      { label: 'Guests', value: String(trip.numberOfPeople) },
      { label: 'Category', value: category },
    ];
    handleOpenProvider(url, provider.name, provider.icon, params);
  };

  const handleOpenFlightProvider = (
    provider: { id: string; name: string; icon: string },
    url: string
  ) => {
    const iata = originIATA || trip.originIATA || '';
    const fromLabel = iata ? getAirportLabel(iata) : '(not set)';
    const params = [
      { label: 'From', value: fromLabel },
      { label: 'IATA', value: iata || '—' },
      { label: 'To', value: `${trip.city}, ${trip.country}` },
      { label: 'Depart', value: format(trip.startDate, 'MMM dd, yyyy') },
      { label: 'Return', value: format(trip.endDate, 'MMM dd, yyyy') },
      { label: 'Passengers', value: String(trip.numberOfPeople) },
    ];
    handleOpenProvider(url, provider.name, provider.icon, params);
  };

  const handleConfirmPrice = (category: keyof BudgetCategories) => {
    const amount = parseFloat(confirmAmount);
    if (isNaN(amount) || amount <= 0) {
      infoAlert(t.trip.invalidAmountTitle, t.trip.invalidAmountCategoryMsg);
      return;
    }

    const newConfirmed: ConfirmedPrice = {
      id: Date.now().toString(),
      category,
      amount,
      source: confirmSource || 'Manual',
      confirmedAt: new Date().toISOString(),
      provenance: {
        sourceType: 'USER_CONFIRMED',
        providerName: confirmSource || 'Manual',
        timestamp: new Date().toISOString(),
        originalAmount: amount,
        originalCurrency: trip.currency,
      },
    };

    const existingConfirmed = trip.confirmedPrices || [];
    updateTrip(trip.id, { confirmedPrices: [...existingConfirmed, newConfirmed] });
    setConfirmingCategory(null);
    setConfirmAmount('');
    setConfirmSource('');
  };

  const handleRemoveConfirmed = (category: keyof BudgetCategories) => {
    const existingConfirmed = trip.confirmedPrices || [];
    updateTrip(trip.id, {
      confirmedPrices: existingConfirmed.filter(cp => cp.category !== category),
    });
  };

  const handleConfirmFlight = () => {
    const amount = parseFloat(flightAmount);
    if (isNaN(amount) || amount <= 0) {
      infoAlert(t.trip.invalidAmountTitle, t.trip.totalFlightCost);
      return;
    }
    updateTrip(trip.id, {
      originIATA: originIATA || undefined,
      originCity: originIATA ? getAirportLabel(originIATA) : undefined,
      flightBudget: {
        estimated: trip.flightBudget?.estimated ?? 0,
        confirmed: {
          amount,
          source: flightSource || 'Manual',
          confirmedAt: new Date().toISOString(),
        },
      },
    });
    setConfirmingFlight(false);
    setFlightAmount('');
    setFlightSource('');
  };

  const handleRemoveFlightConfirmed = () => {
    if (trip.flightBudget) {
      updateTrip(trip.id, {
        flightBudget: { estimated: trip.flightBudget.estimated },
      });
    }
  };

  const handleSaveOriginCity = (val: string) => {
    if (val !== trip.originIATA) {
      updateTrip(trip.id, {
        originIATA: val || undefined,
        originCity: val ? getAirportLabel(val) : undefined,
      });
    }
  };

  const { t } = useTranslation();

  const flightCost = trip.flightBudget?.confirmed?.amount ?? trip.flightBudget?.estimated ?? 0;
  const grandTotal = summary.totalAverage + flightCost;

  const showFxToggle = userCurrency && userCurrency !== trip.currency;

  return (
    <View>
      {/* Currency Toggle */}
      {showFxToggle && (
        <View style={styles.fxToggleRow}>
          <TouchableOpacity
            style={[styles.fxPill, !showUserCurrency && styles.fxPillActive]}
            onPress={() => setShowUserCurrency(false)}
          >
            <Text style={[styles.fxPillText, !showUserCurrency && styles.fxPillTextActive]}>
              {trip.currency}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fxPill, showUserCurrency && styles.fxPillActive]}
            onPress={() => setShowUserCurrency(true)}
          >
            <Text style={[styles.fxPillText, showUserCurrency && styles.fxPillTextActive]}>
              {userCurrency}
            </Text>
          </TouchableOpacity>
          {fxIsOffline && showUserCurrency && (
            <Text style={styles.fxOfflineHint}>offline rate</Text>
          )}
        </View>
      )}

      {/* Summary Card */}
      <Card style={styles.summaryCard}>
        <Text style={styles.sectionTitle}>{t.trip.tripSummary}</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>{t.trip.duration}</Text>
          <Text style={styles.summaryValue}>{t.trip.days(summary.numberOfDays)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>{t.trip.travelers}</Text>
          <Text style={styles.summaryValue}>{t.trip.people(trip.numberOfPeople)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>{t.trip.totalBudget}</Text>
          <View style={styles.totalRange}>
            <Text style={styles.rangeValue}>{fmtFx(summary.totalMin)}</Text>
            <Text style={styles.rangeSeparator}>-</Text>
            <Text style={styles.rangeValue}>{fmtFx(summary.totalMax)}</Text>
          </View>
        </View>

        <View style={styles.averageRow}>
          <Text style={styles.averageLabel}>{t.trip.averageEstimate}</Text>
          <Text style={styles.averageValue}>{fmtFx(summary.totalAverage)}</Text>
        </View>

        <View style={styles.perDayRow}>
          <Text style={styles.perDayLabel}>{t.trip.perDayAverage}</Text>
          <Text style={styles.perDayValue}>{fmtFx(summary.dailyAverage)}</Text>
        </View>

        {trip.numberOfPeople > 1 && (
          <View style={styles.perPersonRow}>
            <Text style={styles.perPersonLabel}>{t.trip.perPersonTotal}</Text>
            <Text style={styles.perPersonValue}>{fmtFx(summary.perPersonAverage)}</Text>
          </View>
        )}
      </Card>

      {/* Grand Total with Flights */}
      {flightCost > 0 && (
        <Card style={styles.summaryCard}>
          <View style={styles.averageRow}>
            <Text style={styles.averageLabel}>{t.trip.grandTotal}</Text>
            <Text style={styles.averageValue}>{fmtFx(grandTotal)}</Text>
          </View>
        </Card>
      )}

      {/* Category Breakdown */}
      <Card style={styles.breakdownCard}>
        <Text style={styles.sectionTitle}>{t.trip.budgetBreakdown}</Text>

        {(Object.keys(categoryTotals) as Array<keyof typeof categoryTotals>).map((key) => {
          const category = categoryTotals[key];
          const providers = getProvidersForCategory(key);
          const confirmed = getConfirmedPriceForCategory(trip.confirmedPrices, key);
          const isConfirming = confirmingCategory === key;
          const isAccommodation = key === 'accommodation';
          const perNight = isAccommodation ? trip.budget.accommodation.average : 0;
          const perNightConfirmed = confirmed ? confirmed.amount : 0;

          return (
            <View key={key} style={styles.categorySection}>
              <View style={styles.categoryRow}>
                <Text style={styles.categoryLabel}>{t.categories[key as keyof typeof t.categories] ?? CATEGORY_LABELS[key]}</Text>
                <View style={styles.categoryValues}>
                  {confirmed ? (
                    <View style={styles.confirmedBlock}>
                      <Text style={styles.confirmedAmount}>
                        {fmtFx(confirmed.amount * summary.numberOfDays * trip.numberOfPeople)}
                      </Text>
                      {isAccommodation && (
                        <Text style={styles.perNightText}>
                          {fmtFx(perNightConfirmed)}{t.trip.perNight}
                        </Text>
                      )}
                      <ProvenanceBadge
                        sourceType="USER_CONFIRMED"
                        providerName={confirmed.source}
                        timestamp={confirmed.confirmedAt}
                      />
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.categoryValue}>
                        {fmtFx(category.average)}
                      </Text>
                      <Text style={styles.categoryRange}>
                        ~{fmtFx(category.min)} - {fmtFx(category.max)}
                      </Text>
                      {isAccommodation && (
                        <Text style={styles.perNightText}>
                          ~{fmtFx(perNight)}{t.trip.perNight}
                        </Text>
                      )}
                      <ProvenanceBadge sourceType="HEURISTIC" />
                    </View>
                  )}
                </View>
              </View>

              {/* Accommodation disclaimer */}
              {isAccommodation && !confirmed && (
                <Text style={styles.disclaimerText}>
                  {t.trip.accommodationDisclaimer}
                </Text>
              )}

              {/* Provider Links (via pre-screen) */}
              {providers.length > 0 && (
                <View style={styles.providerRow}>
                  {providers.map(provider => (
                    <TouchableOpacity
                      key={provider.id}
                      style={styles.providerChip}
                      onPress={() => handleOpenCategoryProvider(
                        provider,
                        getProviderUrl(provider, trip.city, trip.country, trip.startDate, trip.endDate, trip.numberOfPeople),
                        CATEGORY_LABELS[key],
                      )}
                    >
                      <Text style={styles.providerIcon}>{provider.icon}</Text>
                      <Text style={styles.providerName}>{provider.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Confirm / Remove Actions */}
              <View style={styles.actionRow}>
                {confirmed ? (
                  <TouchableOpacity onPress={() => handleRemoveConfirmed(key)}>
                    <Text style={styles.removeConfirmed}>{t.trip.removeConfirmed}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => {
                    setConfirmingCategory(isConfirming ? null : key);
                    setConfirmAmount('');
                    setConfirmSource('');
                  }}>
                    <Text style={styles.confirmLink}>
                      {isConfirming ? t.trip.cancel : t.trip.confirmPrice}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Inline Confirm Form */}
              {isConfirming && (
                <View style={styles.confirmForm}>
                  <TextInput
                    style={styles.confirmInput}
                    value={confirmAmount}
                    onChangeText={setConfirmAmount}
                    placeholder={isAccommodation ? t.trip.pricePerNight : t.trip.pricePerDay}
                    placeholderTextColor={colors.textTertiary}
                    keyboardType="decimal-pad"
                  />
                  <TextInput
                    style={styles.confirmInput}
                    value={confirmSource}
                    onChangeText={setConfirmSource}
                    placeholder={t.trip.source}
                    placeholderTextColor={colors.textTertiary}
                  />
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => handleConfirmPrice(key)}
                  >
                    <Text style={styles.confirmButtonText}>{t.trip.confirm}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
      </Card>

      {/* Flights (One-time) */}
      <Card style={styles.breakdownCard}>
        <Text style={styles.sectionTitle}>{t.trip.flights}</Text>

        {/* Origin Airport SearchableSelect */}
        <SearchableSelect
          label={t.trip.flyingFrom}
          value={originIATA}
          options={airportOptions}
          onChange={(val) => { setOriginIATA(val); handleSaveOriginCity(val); }}
          placeholder={t.trip.departurePlaceholder}
          searchPlaceholder={t.create.searchAirportCode}
        />

        {trip.flightBudget?.confirmed ? (
          <View style={styles.confirmedBlock}>
            <Text style={styles.confirmedAmount}>
              {fmtFx(trip.flightBudget.confirmed.amount)}
            </Text>
            <ProvenanceBadge
              sourceType="USER_CONFIRMED"
              providerName={trip.flightBudget.confirmed.source}
              timestamp={trip.flightBudget.confirmed.confirmedAt}
            />
          </View>
        ) : trip.flightBudget?.estimated ? (
          <View>
            <Text style={styles.categoryValue}>
              {fmtFx(trip.flightBudget.estimated)}
            </Text>
            <ProvenanceBadge sourceType="HEURISTIC" />
          </View>
        ) : (
          <Text style={styles.noFlightText}>{t.trip.noFlightSet}</Text>
        )}

        {/* Flight provider deep links (via pre-screen) */}
        <View style={styles.providerRow}>
          {FLIGHT_PROVIDERS.map(provider => {
            const iata = originIATA || trip.originIATA;
            const url = provider.getSearchUrl(
              trip.city, trip.country, trip.startDate, trip.endDate, trip.numberOfPeople,
              iata, iata ? getAirportLabel(iata) : trip.originCity
            );
            return (
              <TouchableOpacity
                key={provider.id}
                style={styles.providerChip}
                onPress={() => handleOpenFlightProvider(provider, url)}
              >
                <Text style={styles.providerIcon}>{provider.icon}</Text>
                <Text style={styles.providerName}>{provider.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Confirm / Remove flight price */}
        <View style={styles.actionRow}>
          {trip.flightBudget?.confirmed ? (
            <TouchableOpacity onPress={handleRemoveFlightConfirmed}>
              <Text style={styles.removeConfirmed}>{t.trip.removeConfirmed}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => {
              setConfirmingFlight(!confirmingFlight);
              setFlightAmount('');
              setFlightSource('');
            }}>
              <Text style={styles.confirmLink}>
                {confirmingFlight ? t.trip.cancel : t.trip.confirmFlightPrice}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {confirmingFlight && (
          <View style={styles.confirmForm}>
            <TextInput
              style={styles.confirmInput}
              value={flightAmount}
              onChangeText={setFlightAmount}
              placeholder={t.trip.totalFlightCost}
              placeholderTextColor={colors.textTertiary}
              keyboardType="decimal-pad"
            />
            <TextInput
              style={styles.confirmInput}
              value={flightSource}
              onChangeText={setFlightSource}
              placeholder={t.trip.source}
              placeholderTextColor={colors.textTertiary}
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmFlight}
            >
              <Text style={styles.confirmButtonText}>{t.trip.confirm}</Text>
            </TouchableOpacity>
          </View>
        )}
      </Card>

      {/* DeepLink Pre-Screen Modal */}
      {preScreenData && (
        <DeepLinkPreScreen
          visible={preScreenVisible}
          providerName={preScreenData.providerName}
          providerIcon={preScreenData.providerIcon}
          searchParams={preScreenData.params}
          url={preScreenData.url}
          limitations={preScreenData.limitations}
          onClose={() => setPreScreenVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // FX Toggle
  fxToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  fxPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.backgroundTertiary,
  },
  fxPillActive: {
    backgroundColor: colors.primary,
  },
  fxPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  fxPillTextActive: {
    color: '#FFFFFF',
  },
  fxOfflineHint: {
    fontSize: 10,
    color: colors.warning,
    fontStyle: 'italic',
  },
  // Summary Card
  summaryCard: { marginBottom: 16 },
  breakdownCard: { marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: colors.textSecondary },
  summaryValue: { fontSize: 14, fontWeight: '600', color: colors.text },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 12 },
  totalRow: { marginBottom: 8 },
  totalLabel: { fontSize: 14, color: colors.textSecondary, marginBottom: 6 },
  totalRange: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rangeValue: { fontSize: 16, fontWeight: '600', color: colors.text },
  rangeSeparator: { fontSize: 16, color: colors.textSecondary },
  averageRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.primary + '10', padding: 12, borderRadius: 8, marginTop: 8,
  },
  averageLabel: { fontSize: 14, fontWeight: '600', color: colors.primary },
  averageValue: { fontSize: 20, fontWeight: '700', color: colors.primary },
  perDayRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  perDayLabel: { fontSize: 13, color: colors.textSecondary },
  perDayValue: { fontSize: 13, fontWeight: '600', color: colors.text },
  perPersonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  perPersonLabel: { fontSize: 13, color: colors.textSecondary },
  perPersonValue: { fontSize: 13, fontWeight: '600', color: colors.text },
  // Category section
  categorySection: { marginBottom: 14, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  categoryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  categoryLabel: { fontSize: 14, color: colors.text, flex: 1 },
  categoryValues: { alignItems: 'flex-end' },
  categoryValue: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 2 },
  categoryRange: { fontSize: 11, color: colors.textTertiary },
  confirmedBlock: { alignItems: 'flex-end' },
  confirmedAmount: { fontSize: 14, fontWeight: '700', color: colors.success },
  confirmedSource: { fontSize: 11, color: colors.success, fontStyle: 'italic', marginLeft: 4 },
  confirmedDate: { fontSize: 10, color: colors.success, opacity: 0.8, marginTop: 1 },
  perNightText: { fontSize: 11, color: colors.textSecondary, marginTop: 1 },
  disclaimerText: {
    fontSize: 10, color: colors.textTertiary, fontStyle: 'italic',
    marginTop: 4, lineHeight: 14,
  },
  // Provenance badges
  badgeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 3, gap: 4 },
  badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  badgeText: { fontSize: 9, fontWeight: '700' },
  estimatedHint: { fontSize: 9, color: colors.textTertiary, fontStyle: 'italic' },
  noFlightText: { fontSize: 13, color: colors.textTertiary, fontStyle: 'italic' },
  // Provider chips
  providerRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, gap: 6 },
  providerChip: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.backgroundTertiary, borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 5, gap: 4,
  },
  providerIcon: { fontSize: 12 },
  providerName: { fontSize: 11, color: colors.primary, fontWeight: '500' },
  // Actions
  actionRow: { marginTop: 6 },
  confirmLink: { fontSize: 12, color: colors.primary, fontWeight: '500' },
  removeConfirmed: { fontSize: 12, color: colors.error, fontWeight: '500' },
  // Confirm form
  confirmForm: {
    marginTop: 8, backgroundColor: colors.backgroundSecondary,
    borderRadius: 8, padding: 10, gap: 8,
  },
  confirmInput: {
    backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border,
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, fontSize: 14, color: colors.text,
    ...Platform.select({ web: { outlineStyle: 'none' } as any, default: {} }),
  },
  confirmButton: {
    backgroundColor: colors.success, borderRadius: 8, paddingVertical: 8, alignItems: 'center',
  },
  confirmButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
});
