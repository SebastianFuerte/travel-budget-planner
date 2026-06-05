import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, ActivityIndicator, Alert,
} from 'react-native';
import { router } from 'expo-router';
import type { PurchasesPackage } from 'react-native-purchases';
import { ScreenContainer } from '../src/components/layout/ScreenContainer';
import { Button } from '../src/components/ui/Button';
import { Card } from '../src/components/ui/Card';
import colors from '../src/theme/colors';
import { useSubscriptionStore } from '../src/store/subscriptionStore';
import { getOfferings, purchasePackage } from '../src/services/purchaseService';

const FEATURES = [
  { icon: '✈️', text: 'Unlimited trips — plan as many as you want' },
  { icon: '📁', text: 'Unlimited document storage per trip' },
  { icon: '📄', text: 'PDF export for any trip' },
  { icon: '🌍', text: '150+ destinations with detailed budgets' },
  { icon: '🛂', text: 'Full visa & entry requirements database' },
  { icon: '✈️', text: 'Migration Mode for border control' },
  { icon: '💱', text: '15 currencies with offline rates' },
  { icon: '🔒', text: '100% offline — your data never leaves your device' },
];

export default function PaywallScreen() {
  const { upgradeToPro, isLoading: storeLoading } = useSubscriptionStore();
  const { restorePurchases } = useSubscriptionStore();

  const [offerings, setOfferings] = useState<{ monthly: PurchasesPackage | null; annual: PurchasesPackage | null }>({ monthly: null, annual: null });
  const [selectedPlan, setSelectedPlan] = useState<'annual' | 'monthly'>('annual');
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  useEffect(() => {
    loadOfferings();
  }, []);

  async function loadOfferings() {
    const result = await getOfferings();
    if (result?.current?.availablePackages) {
      const monthly = result.current.availablePackages.find(p => p.packageType === 'MONTHLY') ?? null;
      const annual = result.current.availablePackages.find(p => p.packageType === 'ANNUAL') ?? null;
      setOfferings({ monthly, annual });
    }
  }

  async function handlePurchase() {
    const pkg = selectedPlan === 'annual' ? offerings.annual : offerings.monthly;

    if (!pkg) {
      // RevenueCat not configured yet — show setup message
      Alert.alert(
        'Setup Required',
        'Payments are being configured. Please check back soon!',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsPurchasing(true);
    try {
      await purchasePackage(pkg);
      await upgradeToPro('pro');
      Alert.alert('Welcome to Pro! 🎉', 'You now have access to all features.', [
        { text: 'Let\'s go!', onPress: () => router.back() },
      ]);
    } catch (e: any) {
      if (e?.userCancelled) return;
      Alert.alert('Purchase Failed', 'Something went wrong. Please try again.', [{ text: 'OK' }]);
    } finally {
      setIsPurchasing(false);
    }
  }

  async function handleRestore() {
    setIsRestoring(true);
    const restored = await restorePurchases();
    setIsRestoring(false);
    if (restored) {
      Alert.alert('Restored!', 'Your Pro subscription has been restored.', [
        { text: 'Great!', onPress: () => router.back() },
      ]);
    } else {
      Alert.alert('No Purchase Found', 'We couldn\'t find a previous Pro purchase on this account.', [{ text: 'OK' }]);
    }
  }

  const monthlyPrice = offerings.monthly?.product.priceString ?? '$4.99';
  const annualPrice = offerings.annual?.product.priceString ?? '$39.99';
  const annualMonthly = offerings.annual
    ? `$${(offerings.annual.product.price / 12).toFixed(2)}/mo`
    : '$3.33/mo';

  const isBusy = isPurchasing || isRestoring || storeLoading;

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>🌟</Text>
          <Text style={styles.title}>Travel Budget Pro</Text>
          <Text style={styles.subtitle}>Plan unlimited trips. Travel smarter.</Text>
        </View>

        {/* Features */}
        <Card style={styles.featuresCard}>
          {FEATURES.map((f, i) => (
            <View key={i} style={styles.feature}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={styles.featureText}>{f.text}</Text>
            </View>
          ))}
        </Card>

        {/* Plan selector */}
        <Text style={styles.sectionTitle}>Choose your plan</Text>
        <View style={styles.plans}>

          {/* Annual */}
          <TouchableOpacity
            style={[styles.plan, selectedPlan === 'annual' && styles.planSelected]}
            onPress={() => setSelectedPlan('annual')}
            activeOpacity={0.8}
          >
            <View style={styles.badgeRow}>
              <View style={styles.saveBadge}>
                <Text style={styles.saveBadgeText}>SAVE 33%</Text>
              </View>
            </View>
            <Text style={[styles.planName, selectedPlan === 'annual' && styles.planNameSelected]}>Annual</Text>
            <Text style={[styles.planPrice, selectedPlan === 'annual' && styles.planPriceSelected]}>{annualPrice}</Text>
            <Text style={styles.planSub}>{annualMonthly} · billed yearly</Text>
          </TouchableOpacity>

          {/* Monthly */}
          <TouchableOpacity
            style={[styles.plan, selectedPlan === 'monthly' && styles.planSelected]}
            onPress={() => setSelectedPlan('monthly')}
            activeOpacity={0.8}
          >
            <View style={styles.badgeRow} />
            <Text style={[styles.planName, selectedPlan === 'monthly' && styles.planNameSelected]}>Monthly</Text>
            <Text style={[styles.planPrice, selectedPlan === 'monthly' && styles.planPriceSelected]}>{monthlyPrice}</Text>
            <Text style={styles.planSub}>per month</Text>
          </TouchableOpacity>
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={[styles.ctaButton, isBusy && styles.ctaDisabled]}
          onPress={handlePurchase}
          disabled={isBusy}
          activeOpacity={0.85}
        >
          {isPurchasing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.ctaText}>
              {selectedPlan === 'annual' ? `Get Pro — ${annualPrice}/year` : `Get Pro — ${monthlyPrice}/month`}
            </Text>
          )}
        </TouchableOpacity>

        <Text style={styles.legal}>
          Subscriptions auto-renew. Cancel anytime in App Store settings. Prices in USD.
        </Text>

        {/* Restore */}
        <TouchableOpacity onPress={handleRestore} disabled={isBusy} style={styles.restoreBtn}>
          {isRestoring ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Text style={styles.restoreText}>Restore purchases</Text>
          )}
        </TouchableOpacity>

        {/* Skip */}
        <Button
          title="Maybe later"
          onPress={() => router.back()}
          variant="outline"
          fullWidth
          style={styles.skipBtn}
        />

      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 24, paddingTop: 8 },
  emoji: { fontSize: 48, marginBottom: 10 },
  title: { fontSize: 26, fontWeight: '800', color: colors.text, marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 16, color: colors.textSecondary, textAlign: 'center' },
  featuresCard: { marginBottom: 24 },
  feature: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  featureIcon: { fontSize: 18, marginRight: 12, width: 26 },
  featureText: { fontSize: 15, color: colors.text, flex: 1, lineHeight: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 12 },
  plans: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  plan: {
    flex: 1, borderRadius: 14, borderWidth: 2, borderColor: colors.border,
    backgroundColor: colors.backgroundSecondary, padding: 16, alignItems: 'center',
  },
  planSelected: { borderColor: colors.primary, backgroundColor: colors.primary + '08' },
  badgeRow: { height: 22, marginBottom: 8, justifyContent: 'center' },
  saveBadge: { backgroundColor: '#10B981', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  saveBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  planName: { fontSize: 15, fontWeight: '600', color: colors.textSecondary, marginBottom: 4 },
  planNameSelected: { color: colors.primary },
  planPrice: { fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 2 },
  planPriceSelected: { color: colors.primary },
  planSub: { fontSize: 12, color: colors.textSecondary, textAlign: 'center' },
  ctaButton: {
    backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 16,
    alignItems: 'center', marginBottom: 10,
  },
  ctaDisabled: { opacity: 0.6 },
  ctaText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  legal: { fontSize: 11, color: colors.textSecondary, textAlign: 'center', marginBottom: 16, lineHeight: 16 },
  restoreBtn: { alignItems: 'center', paddingVertical: 12, marginBottom: 8 },
  restoreText: { fontSize: 14, color: colors.primary, fontWeight: '600' },
  skipBtn: { marginTop: 4 },
});
