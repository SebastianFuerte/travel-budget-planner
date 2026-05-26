// src/components/trip/TripCard.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { format } from 'date-fns';
import { Trip } from '../../types';
import { Card } from '../ui/Card';
import colors from '../../theme/colors';
import { formatCurrency } from '../../utils/currency';
import { calculateTripSummary } from '../../services/budgetEngine';
import { useTripStore } from '../../store';
import { confirmAlert, infoAlert } from '../../utils/alert';
import { useTranslation } from '../../i18n';
import { getCountryDisplayName, getCityDisplayName } from '../../services/countries';

interface TripCardProps {
  trip: Trip;
}

export const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  const { deleteTrip, duplicateTrip } = useTripStore();
  const { t, language } = useTranslation();
  const summary = calculateTripSummary(trip);

  const getTravelStyleLabel = (style: string) => {
    if (style === 'Budget') return t.create.budget;
    if (style === 'Mid') return t.create.mid;
    if (style === 'Comfy') return t.create.comfy;
    return style;
  };

  const handlePress = () => {
    router.push(`/trip/${trip.id}`);
  };

  const handleDelete = () => {
    confirmAlert(
      t.home.deleteTrip,
      t.home.deleteConfirm(trip.destination),
      () => deleteTrip(trip.id),
      t.common.delete,
    );
  };

  const handleDuplicate = async () => {
    try {
      await duplicateTrip(trip.id);
      infoAlert(t.common.success, t.home.duplicated);
    } catch (error) {
      infoAlert(t.common.error, t.home.duplicateError);
    }
  };

  const getTravelStyleColor = (style: string) => {
    switch (style) {
      case 'Budget': return colors.budget;
      case 'Mid': return colors.mid;
      case 'Comfy': return colors.comfy;
      default: return colors.primary;
    }
  };

  return (
    <Card style={styles.card}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Text style={styles.destination}>{trip.destination}</Text>
            <Text style={styles.location}>
              {getCityDisplayName(trip.city, language)}, {getCountryDisplayName(trip.country, language)}
            </Text>
          </View>
          <View
            style={[
              styles.styleBadge,
              { backgroundColor: getTravelStyleColor(trip.travelStyle) + '20' },
            ]}
          >
            <Text
              style={[
                styles.styleText,
                { color: getTravelStyleColor(trip.travelStyle) },
              ]}
            >
              {getTravelStyleLabel(trip.travelStyle)}
            </Text>
          </View>
        </View>

        <View style={styles.dates}>
          <Text style={styles.dateText}>
            {format(trip.startDate, 'MMM dd')} - {format(trip.endDate, 'MMM dd, yyyy')}
          </Text>
          <Text style={styles.daysText}>• {t.trip.days(summary.numberOfDays)}</Text>
        </View>

        {/* Tags */}
        {trip.tags && trip.tags.length > 0 && (
          <View style={styles.tagsRow}>
            {trip.tags.map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}

        {trip.archived && (
          <View style={styles.archivedBadge}>
            <Text style={styles.archivedText}>{t.home.archivedLabel}</Text>
          </View>
        )}

        <View style={styles.budget}>
          <View style={styles.budgetItem}>
            <Text style={styles.budgetLabel}>{t.home.totalBudget}</Text>
            <Text style={styles.budgetValue}>
              {formatCurrency(summary.totalAverage, trip.currency)}
            </Text>
          </View>
          <View style={styles.budgetItem}>
            <Text style={styles.budgetLabel}>{t.home.perDay}</Text>
            <Text style={styles.budgetValue}>
              {formatCurrency(summary.dailyAverage, trip.currency)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push(`/trip/edit/${trip.id}`)}>
          <Text style={styles.actionText}>{t.home.editAction}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleDuplicate}>
          <Text style={styles.actionText}>{t.home.duplicateAction}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
          <Text style={[styles.actionText, styles.deleteText]}>{t.home.deleteAction}</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleSection: {
    flex: 1,
  },
  destination: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  styleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  styleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dates: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  daysText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  budget: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginBottom: 12,
  },
  budgetItem: {
    flex: 1,
  },
  budgetLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  budgetValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  deleteText: {
    color: colors.error,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: colors.primary + '15',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
  },
  archivedBadge: {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  archivedText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});
