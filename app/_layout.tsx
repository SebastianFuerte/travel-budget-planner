// app/_layout.tsx

import * as Sentry from '@sentry/react-native';
import { Stack } from 'expo-router';
import { configurePurchases } from '../src/services/purchaseService';
import React, { Component, ReactNode, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSettingsStore, useSubscriptionStore, useTripStore } from '../src/store';
import colors from '../src/theme/colors';

const SENTRY_DSN = process.env.EXPO_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    enabled: !__DEV__,
    tracesSampleRate: 0.2,
    beforeSend(event) {
      // Strip any user-entered data from error reports
      if (event.extra) delete event.extra;
      if (event.user) delete event.user;
      return event;
    },
  });
}

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.error}>
          <Text style={styles.errorText}>Something went wrong.</Text>
          <Text style={styles.errorSub}>Please restart the app.</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

function RootLayout() {
  const loadTrips = useTripStore(state => state.loadTrips);
  const loadSubscription = useSubscriptionStore(state => state.loadSubscription);
  const loadSettings = useSettingsStore(state => state.loadSettings);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      configurePurchases();
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
    <ErrorBoundary>
      <SafeAreaProvider>
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
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

export default Sentry.wrap(RootLayout);

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  errorSub: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
