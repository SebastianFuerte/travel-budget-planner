// app/trip/[id].tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { safeGoBack } from '../../src/utils/navigation';
import { format } from 'date-fns';
import * as Clipboard from 'expo-clipboard';
import { ScreenContainer } from '../../src/components/layout/ScreenContainer';
import { BudgetCalculator } from '../../src/components/trip/BudgetCalculator';
import { Button } from '../../src/components/ui/Button';
import { useTripStore } from '../../src/store';
import { BudgetCategories } from '../../src/types';
import colors from '../../src/theme/colors';
import { logShareCardGenerated } from '../../src/services/analytics';
import { infoAlert } from '../../src/utils/alert';
import { calculateTripSummaryWithConfirmed, calculateCategoryTotals, getConfirmedPriceForCategory } from '../../src/services/budgetEngine';
import { formatCurrency } from '../../src/utils/currency';
import { CATEGORY_LABELS } from '../../src/utils/constants';

export default function TripDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const getTripById = useTripStore(state => state.getTripById);
  const trip = getTripById(id);

  if (!trip) {
    return (
      <ScreenContainer>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Trip not found</Text>
          <Button
            title="Go Back"
            onPress={() => safeGoBack()}
          />
        </View>
      </ScreenContainer>
    );
  }

  const handleShare = async () => {
    logShareCardGenerated(trip.id);

    const summary = calculateTripSummaryWithConfirmed(trip);
    const categoryTotals = calculateCategoryTotals(
      trip.budget,
      summary.numberOfDays,
      trip.numberOfPeople,
    );

    const lines: string[] = [
      `${trip.destination}`,
      `${trip.city}, ${trip.country}`,
      `${format(trip.startDate, 'MMM dd, yyyy')} - ${format(trip.endDate, 'MMM dd, yyyy')}`,
      `${summary.numberOfDays} days | ${trip.numberOfPeople} ${trip.numberOfPeople > 1 ? 'people' : 'person'} | ${trip.travelStyle} style`,
      '',
      '--- Budget Breakdown ---',
    ];

    (Object.keys(categoryTotals) as Array<keyof BudgetCategories>).forEach((key) => {
      const cat = categoryTotals[key];
      const confirmed = getConfirmedPriceForCategory(trip.confirmedPrices, key);
      const label = CATEGORY_LABELS[key] || key;
      if (confirmed) {
        const total = confirmed.amount * summary.numberOfDays * trip.numberOfPeople;
        lines.push(`  ${label}: ${formatCurrency(total, trip.currency)} (confirmed via ${confirmed.source})`);
      } else {
        lines.push(`  ${label}: ${formatCurrency(cat.average, trip.currency)} (estimated, range: ${formatCurrency(cat.min, trip.currency)} - ${formatCurrency(cat.max, trip.currency)})`);
      }
    });

    if (trip.flightBudget) {
      const flightAmt = trip.flightBudget.confirmed?.amount ?? trip.flightBudget.estimated ?? 0;
      const flightLabel = trip.flightBudget.confirmed
        ? `confirmed via ${trip.flightBudget.confirmed.source}`
        : 'estimated';
      lines.push(`  Flights (one-time): ${formatCurrency(flightAmt, trip.currency)} (${flightLabel})`);
    }

    const flightCost = trip.flightBudget?.confirmed?.amount ?? trip.flightBudget?.estimated ?? 0;
    lines.push('');
    lines.push(`Daily Budget Estimate: ${formatCurrency(summary.totalAverage, trip.currency)}`);
    if (flightCost > 0) {
      lines.push(`Flights: ${formatCurrency(flightCost, trip.currency)}`);
      lines.push(`Grand Total: ${formatCurrency(summary.totalAverage + flightCost, trip.currency)}`);
    }
    lines.push(`Range: ${formatCurrency(summary.totalMin, trip.currency)} - ${formatCurrency(summary.totalMax, trip.currency)}`);
    lines.push(`Per Day: ${formatCurrency(summary.dailyAverage, trip.currency)}`);
    if (trip.numberOfPeople > 1) {
      lines.push(`Per Person: ${formatCurrency(summary.perPersonAverage, trip.currency)}`);
    }
    lines.push('');
    lines.push('Generated with Travel Budget Planner');

    const text = lines.join('\n');

    try {
      await Clipboard.setStringAsync(text);
      infoAlert('Copied!', 'Budget summary copied to clipboard. Paste it anywhere to share.');
    } catch {
      infoAlert('Budget Summary', text);
    }
  };

  const handleEdit = () => {
    infoAlert(
      'Edit Trip',
      'Trip editing would open here. Use the Create screen as reference for implementation.'
    );
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => safeGoBack()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => safeGoBack('/(tabs)')}>
            <Text style={styles.allTripsLink}>All Trips</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.titleSection}>
        <Text style={styles.title}>{trip.destination}</Text>
        <Text style={styles.location}>{trip.city}, {trip.country}</Text>
        <Text style={styles.dates}>
          {format(trip.startDate, 'MMM dd, yyyy')} - {format(trip.endDate, 'MMM dd, yyyy')}
        </Text>
      </View>

      <BudgetCalculator trip={trip} />

      {trip.notes && (
        <View style={styles.notesSection}>
          <Text style={styles.notesTitle}>Notes</Text>
          <Text style={styles.notesText}>{trip.notes}</Text>
        </View>
      )}

      {/* Documents & Requirements Section */}
      <View style={styles.docsSection}>
        <TouchableOpacity
          style={styles.docsButton}
          onPress={() => router.push(`/documents/${trip.id}`)}
          activeOpacity={0.7}
        >
          <View style={styles.docsButtonContent}>
            <Text style={styles.docsButtonIcon}>🛂</Text>
            <View style={styles.docsButtonText}>
              <Text style={styles.docsButtonTitle}>Documents & Entry Requirements</Text>
              <Text style={styles.docsButtonSubtitle}>Visa info, document vault, timeline</Text>
            </View>
            <Text style={styles.docsArrow}>→</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.migrationButton}
          onPress={() => router.push(`/migration/${trip.id}`)}
          activeOpacity={0.7}
        >
          <View style={styles.docsButtonContent}>
            <Text style={styles.docsButtonIcon}>📱</Text>
            <View style={styles.docsButtonText}>
              <Text style={[styles.docsButtonTitle, { color: '#FFFFFF' }]}>Migration Mode</Text>
              <Text style={[styles.docsButtonSubtitle, { color: '#9CA3AF' }]}>Quick access for airport checkpoints</Text>
            </View>
            <Text style={[styles.docsArrow, { color: '#F59E0B' }]}>→</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <Button
          title="Copy Budget Summary"
          onPress={handleShare}
          variant="secondary"
          fullWidth
          style={styles.actionButton}
        />
        <Button
          title="Edit Trip"
          onPress={handleEdit}
          variant="outline"
          fullWidth
          style={styles.actionButton}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    paddingVertical: 8,
  },
  backText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  allTripsLink: {
    fontSize: 13,
    color: colors.textSecondary,
    paddingVertical: 8,
  },
  titleSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  dates: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  notesSection: {
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  notesText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  docsSection: {
    marginBottom: 16,
    gap: 8,
  },
  docsButton: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  migrationButton: {
    backgroundColor: colors.text,
    borderRadius: 12,
    padding: 14,
  },
  docsButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  docsButtonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  docsButtonText: {
    flex: 1,
  },
  docsButtonTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  docsButtonSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  docsArrow: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: '700',
  },
  actions: {
    marginTop: 8,
    marginBottom: 32,
  },
  actionButton: {
    marginBottom: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 16,
  },
});
