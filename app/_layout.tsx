// app/_layout.tsx

import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTripStore, useSubscriptionStore, useSettingsStore } from '../src/store';
import colors from '../src/theme/colors';

export default function RootLayout() {
  const loadTrips = useTripStore(state => state.loadTrips);
  const loadSubscription = useSubscriptionStore(state => state.loadSubscription);
  const loadSettings = useSettingsStore(state => state.loadSettings);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await Promise.all([loadTrips(), loadSubscription(), loadSettings()]);
      setIsReady(true);
    };
    init();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="trip/[id]" />
      <Stack.Screen name="documents/[id]" />
      <Stack.Screen name="migration/[id]" />
      <Stack.Screen
        name="paywall"
        options={{
          presentation: 'modal',
          headerShown: true,
          title: 'Upgrade to Pro',
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
