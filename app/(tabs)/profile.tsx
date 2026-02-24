// app/(tabs)/profile.tsx

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer } from '../../src/components/layout/ScreenContainer';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { CurrencySelect } from '../../src/components/ui/CurrencySelect';
import { useTripStore, useSubscriptionStore, useSettingsStore } from '../../src/store';
import { clearAllData } from '../../src/services/storage';
import { confirmAlert, infoAlert } from '../../src/utils/alert';
import colors from '../../src/theme/colors';

export default function ProfileScreen() {
  const trips = useTripStore(state => state.trips);
  const loadTrips = useTripStore(state => state.loadTrips);
  const { subscription, isPro, cancelSubscription } = useSubscriptionStore();
  const { userCurrency, setUserCurrency, loadSettings } = useSettingsStore();

  useEffect(() => { loadSettings(); }, []);

  const handleUpgrade = () => {
    router.push('/paywall');
  };

  const handleCancelSubscription = () => {
    confirmAlert(
      'Cancel Subscription',
      'Are you sure you want to cancel your Pro subscription?',
      async () => {
        await cancelSubscription();
        infoAlert('Subscription Cancelled', 'You are now on the free plan');
      },
      'Cancel',
      'Keep Pro'
    );
  };

  const handleClearData = () => {
    confirmAlert(
      'Clear All Data',
      'This will delete all your trips and reset the app. This cannot be undone.',
      async () => {
        await clearAllData();
        await loadTrips();
        infoAlert('Data Cleared', 'All data has been deleted');
      },
      'Clear Data'
    );
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Profile</Text>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Subscription</Text>

        <View style={styles.subscriptionInfo}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {isPro() ? '⭐ PRO' : '🆓 FREE'}
            </Text>
          </View>
          <Text style={styles.planText}>
            {isPro() ? 'Pro Plan Active' : 'Free Plan'}
          </Text>
        </View>

        {isPro() ? (
          <Button
            title="Cancel Subscription"
            onPress={handleCancelSubscription}
            variant="outline"
            fullWidth
            style={styles.button}
          />
        ) : (
          <Button
            title="Upgrade to Pro"
            onPress={handleUpgrade}
            fullWidth
            style={styles.button}
          />
        )}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Usage</Text>

        <View style={styles.stat}>
          <Text style={styles.statLabel}>Saved Trips</Text>
          <Text style={styles.statValue}>{trips.length}</Text>
        </View>

        {!isPro() && (
          <Text style={styles.limitText}>
            Free plan: {trips.length}/1 trip saved
          </Text>
        )}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>My Currency</Text>
        <Text style={styles.currencyHint}>
          Your home currency for price conversion. Budget values will show a toggle to convert.
        </Text>
        <CurrencySelect
          value={userCurrency}
          onChange={(code) => setUserCurrency(code as any)}
        />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Data & Privacy</Text>

        <Button
          title="Clear All Data"
          onPress={handleClearData}
          variant="danger"
          fullWidth
          style={styles.button}
        />

        <Text style={styles.privacyText}>
          All data is stored locally on your device. We don't collect or share your personal information.
        </Text>
      </Card>

      <View style={styles.footer}>
        <Text style={styles.appVersion}>Travel Budget Planner v1.0.0</Text>
        <Text style={styles.footerText}>Made with ❤️ for travelers</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28, fontWeight: '800', color: colors.text, marginBottom: 20,
  },
  card: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 16,
  },
  subscriptionInfo: { marginBottom: 16 },
  statusBadge: {
    alignSelf: 'flex-start', backgroundColor: colors.primary + '20',
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginBottom: 8,
  },
  statusText: { fontSize: 14, fontWeight: '700', color: colors.primary },
  planText: { fontSize: 16, color: colors.text },
  button: { marginTop: 8 },
  stat: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 8,
  },
  statLabel: { fontSize: 16, color: colors.text },
  statValue: { fontSize: 20, fontWeight: '700', color: colors.primary },
  limitText: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  privacyText: {
    fontSize: 12, color: colors.textSecondary, marginTop: 12, lineHeight: 18,
  },
  currencyHint: {
    fontSize: 12, color: colors.textSecondary, marginBottom: 4, lineHeight: 17,
  },
  footer: { marginTop: 32, alignItems: 'center' },
  appVersion: { fontSize: 12, color: colors.textTertiary, marginBottom: 4 },
  footerText: { fontSize: 12, color: colors.textTertiary },
});
