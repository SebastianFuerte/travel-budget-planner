// app/(tabs)/profile.tsx

import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer } from '../../src/components/layout/ScreenContainer';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { Select } from '../../src/components/ui/Select';
import { CurrencySelect } from '../../src/components/ui/CurrencySelect';
import { useTripStore, useSubscriptionStore, useSettingsStore } from '../../src/store';
import { clearAllData } from '../../src/services/storage';
import { confirmAlert, infoAlert } from '../../src/utils/alert';
import colors from '../../src/theme/colors';
import { useTranslation } from '../../src/i18n';
import { Language } from '../../src/i18n/translations';
import { differenceInDays } from 'date-fns';

export default function ProfileScreen() {
  const loadTrips = useTripStore(state => state.loadTrips);
  const trips = useTripStore(state => state.trips);
  const { isPro, cancelSubscription } = useSubscriptionStore();
  const { userCurrency, setUserCurrency, language, setLanguage, loadSettings } = useSettingsStore();
  const { t } = useTranslation();

  useEffect(() => { loadSettings(); }, []);

  const stats = useMemo(() => {
    const activeTrips = trips.filter(t => !t.archived);
    const totalDays = activeTrips.reduce((sum, trip) => {
      return sum + Math.max(1, differenceInDays(new Date(trip.endDate), new Date(trip.startDate)));
    }, 0);
    const countries = new Set(activeTrips.map(t => t.country));
    return {
      total: trips.length,
      active: activeTrips.length,
      totalDays,
      countries: countries.size,
    };
  }, [trips]);

  const handleUpgrade = () => {
    router.push('/paywall');
  };

  const handleCancelSubscription = () => {
    confirmAlert(
      t.profile.cancelPro,
      'Are you sure you want to cancel your Pro subscription?',
      async () => {
        await cancelSubscription();
        infoAlert('Subscription Cancelled', 'You are now on the free plan');
      },
      t.common.cancel,
      'Keep Pro'
    );
  };

  const handleClearData = () => {
    confirmAlert(
      t.profile.clearAllData,
      t.profile.clearDataWarning,
      async () => {
        await clearAllData();
        await loadTrips();
        infoAlert(t.common.ok, t.profile.dataCleared);
      },
      t.profile.clearDataConfirm
    );
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>{t.profile.title}</Text>

      {stats.total > 0 && (
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>✈️ Your Travel Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.total}</Text>
              <Text style={styles.statLabel}>Trips{stats.total !== stats.active ? `\n(${stats.active} active)` : ''}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.totalDays}</Text>
              <Text style={styles.statLabel}>Days{'\n'}Planned</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.countries}</Text>
              <Text style={styles.statLabel}>Countries{'\n'}Explored</Text>
            </View>
          </View>
        </Card>
      )}

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>{t.profile.subscription}</Text>

        <View style={styles.subscriptionInfo}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {isPro() ? '⭐ PRO' : '🆓 FREE'}
            </Text>
          </View>
          <Text style={styles.planText}>
            {isPro() ? t.profile.proPlan : t.profile.freePlan}
          </Text>
        </View>

        {isPro() ? (
          <Button
            title={t.profile.cancelPro}
            onPress={handleCancelSubscription}
            variant="outline"
            fullWidth
            style={styles.button}
          />
        ) : (
          <Button
            title={t.profile.upgradePro}
            onPress={handleUpgrade}
            fullWidth
            style={styles.button}
          />
        )}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>{t.profile.settings}</Text>

        <Text style={styles.settingLabel}>{t.profile.homeCurrency}</Text>
        <CurrencySelect
          value={userCurrency}
          onChange={(code) => setUserCurrency(code as any)}
        />

        <Text style={[styles.settingLabel, { marginTop: 16 }]}>{t.profile.language}</Text>
        <Select
          value={language}
          options={[
            { label: '🇺🇸 English', value: 'en' },
            { label: '🇪🇸 Español', value: 'es' },
          ]}
          onChange={(value) => setLanguage(value as Language)}
        />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>{t.profile.data}</Text>

        <Button
          title={t.profile.clearAllData}
          onPress={handleClearData}
          variant="danger"
          fullWidth
          style={styles.button}
        />

        <Text style={styles.privacyText}>{t.profile.privacyNote}</Text>
      </Card>

      <View style={styles.footer}>
        <Text style={styles.appVersion}>Travel Budget Planner v1.0.0</Text>
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
  privacyText: {
    fontSize: 12, color: colors.textSecondary, marginTop: 12, lineHeight: 18,
  },
  settingLabel: {
    fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 6,
  },
  footer: { marginTop: 32, alignItems: 'center' },
  appVersion: { fontSize: 12, color: colors.textTertiary },
  statsGrid: {
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
  },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 8 },
  statNumber: { fontSize: 32, fontWeight: '800', color: colors.primary },
  statLabel: { fontSize: 12, color: colors.textSecondary, textAlign: 'center', marginTop: 4, lineHeight: 17 },
  statDivider: { width: 1, height: 48, backgroundColor: colors.border },
});
