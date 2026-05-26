// app/(tabs)/index.tsx

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer } from '../../src/components/layout/ScreenContainer';
import { DemoModeButton } from '../../src/components/layout/DemoModeButton';
import { TripCard } from '../../src/components/trip/TripCard';
import { Button } from '../../src/components/ui/Button';
import { useTripStore, useSubscriptionStore } from '../../src/store';
import colors from '../../src/theme/colors';
import { logPaywallOpened } from '../../src/services/analytics';
import { useTranslation } from '../../src/i18n';

type FilterType = 'active' | 'archived';

export default function HomeScreen() {
  const trips = useTripStore(state => state.trips);
  const { canCreateTrip } = useSubscriptionStore();
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('active');

  const handleCreateTrip = () => {
    const activeTrips = trips.filter(t => !t.archived);
    if (!canCreateTrip(activeTrips.length)) {
      logPaywallOpened('trip_limit');
      router.push('/paywall');
      return;
    }
    router.push('/(tabs)/create');
  };

  const filteredTrips = useMemo(() => {
    let result = trips.filter(t => filter === 'archived' ? t.archived : !t.archived);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(t =>
        t.destination.toLowerCase().includes(q) ||
        t.city.toLowerCase().includes(q) ||
        t.country.toLowerCase().includes(q)
      );
    }
    return result;
  }, [trips, searchQuery, filter]);

  const activeCount = trips.filter(t => !t.archived).length;
  const archivedCount = trips.filter(t => t.archived).length;

  return (
    <ScreenContainer scrollable={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t.home.title}</Text>
          <Text style={styles.subtitle}>{t.home.tripsSaved(activeCount)}</Text>
        </View>

        {/* DEMO MODE BUTTON - CRITICAL FOR PC TESTING */}
        <DemoModeButton />

        {/* Search bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search trips..."
              placeholderTextColor={colors.textTertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
                <Text style={styles.clearBtnText}>×</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filter tabs: Active / Archived */}
        {archivedCount > 0 && (
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[styles.filterChip, filter === 'active' && styles.filterChipActive]}
              onPress={() => setFilter('active')}
            >
              <Text style={[styles.filterChipText, filter === 'active' && styles.filterChipTextActive]}>
                Active ({activeCount})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterChip, filter === 'archived' && styles.filterChipActive]}
              onPress={() => setFilter('archived')}
            >
              <Text style={[styles.filterChipText, filter === 'archived' && styles.filterChipTextActive]}>
                Archived ({archivedCount})
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {filteredTrips.length === 0 ? (
          <View style={styles.emptyState}>
            {searchQuery ? (
              <>
                <Text style={styles.emptyEmoji}>🔍</Text>
                <Text style={styles.emptyTitle}>No results for "{searchQuery}"</Text>
                <Text style={styles.emptyText}>Try a different destination or city name.</Text>
                <Button title="Clear Search" onPress={() => setSearchQuery('')} variant="outline" style={styles.createButton} />
              </>
            ) : filter === 'archived' ? (
              <>
                <Text style={styles.emptyEmoji}>🗂️</Text>
                <Text style={styles.emptyTitle}>No archived trips</Text>
                <Text style={styles.emptyText}>Trips you archive will appear here.</Text>
              </>
            ) : (
              <>
                <Text style={styles.emptyEmoji}>🌍</Text>
                <Text style={styles.emptyTitle}>{t.home.emptyTitle}</Text>
                <Text style={styles.emptyText}>{t.home.emptyText}</Text>
                <Button
                  title={t.home.createFirstTrip}
                  onPress={handleCreateTrip}
                  style={styles.createButton}
                />
              </>
            )}
          </View>
        ) : (
          <>
            <FlatList
              data={filteredTrips}
              renderItem={({ item }) => <TripCard trip={item} />}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            />
            {filter === 'active' && (
              <Button
                title={t.home.createNewTrip}
                onPress={handleCreateTrip}
                style={styles.floatingButton}
              />
            )}
          </>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  searchRow: {
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    fontSize: 15,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    padding: 0,
  },
  clearBtn: {
    paddingHorizontal: 4,
  },
  clearBtnText: {
    fontSize: 20,
    color: colors.textTertiary,
    lineHeight: 22,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSecondary,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  filterChipTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  list: {
    paddingBottom: 80,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  createButton: {
    marginTop: 16,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
});
