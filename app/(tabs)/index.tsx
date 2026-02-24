// app/(tabs)/index.tsx

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer } from '../../src/components/layout/ScreenContainer';
import { DemoModeButton } from '../../src/components/layout/DemoModeButton';
import { TripCard } from '../../src/components/trip/TripCard';
import { Button } from '../../src/components/ui/Button';
import { useTripStore, useSubscriptionStore } from '../../src/store';
import colors from '../../src/theme/colors';
import { logPaywallOpened } from '../../src/services/analytics';

export default function HomeScreen() {
  const trips = useTripStore(state => state.trips);
  const { canCreateTrip } = useSubscriptionStore();

  const handleCreateTrip = () => {
    if (!canCreateTrip(trips.length)) {
      // Show paywall
      logPaywallOpened('trip_limit');
      router.push('/paywall');
      return;
    }
    router.push('/(tabs)/create');
  };

  return (
    <ScreenContainer scrollable={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Trips</Text>
          <Text style={styles.subtitle}>
            {trips.length} {trips.length === 1 ? 'trip' : 'trips'} saved
          </Text>
        </View>

        {/* DEMO MODE BUTTON - CRITICAL FOR PC TESTING */}
        <DemoModeButton />

        {trips.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🌍</Text>
            <Text style={styles.emptyTitle}>No trips yet</Text>
            <Text style={styles.emptyText}>
              Create your first trip or try the demo to explore the app
            </Text>
            <Button
              title="Create Your First Trip"
              onPress={handleCreateTrip}
              style={styles.createButton}
            />
          </View>
        ) : (
          <>
            <FlatList
              data={trips}
              renderItem={({ item }) => <TripCard trip={item} />}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            />
            <Button
              title="Create New Trip"
              onPress={handleCreateTrip}
              style={styles.floatingButton}
            />
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
    marginBottom: 20,
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
