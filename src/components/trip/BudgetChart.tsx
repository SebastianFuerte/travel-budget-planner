// src/components/trip/BudgetChart.tsx
// Visual breakdown of budget by category — horizontal bars + percentage rings

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import { Trip, BudgetCategories } from '../../types';
import {
  calculateTripSummaryWithConfirmed,
  calculateCategoryTotals,
  getConfirmedPriceForCategory,
} from '../../services/budgetEngine';
import { formatCurrency } from '../../utils/currency';
import { CATEGORY_LABELS } from '../../utils/constants';

const CATEGORY_COLORS: Record<keyof BudgetCategories, string> = {
  accommodation:  '#6366F1',
  localTransport: '#F59E0B',
  food:           '#10B981',
  activities:     '#3B82F6',
  insurance:      '#EC4899',
  internet:       '#8B5CF6',
  extras:         '#F97316',
};

const CATEGORY_ICONS: Record<keyof BudgetCategories, string> = {
  accommodation:  '🏨',
  localTransport: '🚌',
  food:           '🍜',
  activities:     '🎯',
  insurance:      '🛡️',
  internet:       '📶',
  extras:         '🎁',
};

interface BudgetChartProps {
  trip: Trip;
}

export const BudgetChart: React.FC<BudgetChartProps> = ({ trip }) => {
  const summary = calculateTripSummaryWithConfirmed(trip);
  const categoryTotals = calculateCategoryTotals(
    trip.budget,
    summary.numberOfDays,
    trip.numberOfPeople,
  );

  const categories = useMemo(() => {
    const items = (Object.keys(categoryTotals) as Array<keyof BudgetCategories>).map(key => {
      const confirmed = getConfirmedPriceForCategory(trip.confirmedPrices, key);
      const amount = confirmed
        ? confirmed.amount * summary.numberOfDays * trip.numberOfPeople
        : categoryTotals[key].average;
      return {
        key,
        label: CATEGORY_LABELS[key] ?? key,
        amount,
        isConfirmed: !!confirmed,
        color: CATEGORY_COLORS[key],
        icon: CATEGORY_ICONS[key],
      };
    });

    // Add flight if present
    const flightAmt = trip.flightBudget?.confirmed?.amount ?? trip.flightBudget?.estimated ?? 0;
    if (flightAmt > 0) {
      items.push({
        key: 'flights' as any,
        label: 'Flights',
        amount: flightAmt,
        isConfirmed: !!trip.flightBudget?.confirmed,
        color: '#14B8A6',
        icon: '✈️',
      });
    }

    items.sort((a, b) => b.amount - a.amount);
    return items;
  }, [trip, summary, categoryTotals]);

  const totalAmount = categories.reduce((s, c) => s + c.amount, 0);

  if (totalAmount === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget Breakdown</Text>
      <Text style={styles.subtitle}>
        Total: {formatCurrency(totalAmount, trip.currency)} · {summary.numberOfDays} days
      </Text>

      {categories.map(cat => {
        const pct = totalAmount > 0 ? (cat.amount / totalAmount) * 100 : 0;
        return (
          <View key={cat.key} style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={styles.icon}>{cat.icon}</Text>
              <View style={styles.labelCol}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>{cat.label}</Text>
                  {cat.isConfirmed && (
                    <View style={styles.confirmedBadge}>
                      <Text style={styles.confirmedBadgeText}>✓</Text>
                    </View>
                  )}
                </View>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        width: `${Math.max(pct, 2)}%` as any,
                        backgroundColor: cat.color,
                        opacity: cat.isConfirmed ? 1 : 0.7,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.amount}>{formatCurrency(cat.amount, trip.currency)}</Text>
              <Text style={styles.pct}>{Math.round(pct)}%</Text>
            </View>
          </View>
        );
      })}

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.primary, opacity: 0.7 }]} />
          <Text style={styles.legendText}>Estimated</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.legendText}>✓ Confirmed</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  rowLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: { fontSize: 18, width: 24, textAlign: 'center' },
  labelCol: { flex: 1 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  label: { fontSize: 12, fontWeight: '500', color: colors.text },
  confirmedBadge: {
    backgroundColor: '#D1FAE5',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  confirmedBadgeText: { fontSize: 9, fontWeight: '700', color: '#065F46' },
  barTrack: {
    height: 8,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: 8,
    borderRadius: 4,
  },
  rowRight: { alignItems: 'flex-end', minWidth: 70 },
  amount: { fontSize: 13, fontWeight: '700', color: colors.text },
  pct: { fontSize: 10, color: colors.textTertiary },
  legend: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
    justifyContent: 'flex-end',
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 11, color: colors.textTertiary },
});
