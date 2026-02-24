// app/paywall.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer } from '../src/components/layout/ScreenContainer';
import { Button } from '../src/components/ui/Button';
import { Card } from '../src/components/ui/Card';
import { useSubscriptionStore } from '../src/store';
import { confirmAlert, infoAlert } from '../src/utils/alert';
import colors from '../src/theme/colors';
import { PRO_PRICE_MONTHLY, PRO_PRICE_YEARLY } from '../src/utils/constants';

export default function PaywallScreen() {
  const { upgradeToPro } = useSubscriptionStore();
  const [loading, setLoading] = React.useState(false);

  const handleSubscribe = async () => {
    setLoading(true);

    // Mock subscription - en produccion integraria con RevenueCat/Stripe
    confirmAlert(
      'Mock Payment',
      'This is a mock subscription. In production, this would integrate with payment providers.',
      async () => {
        try {
          await upgradeToPro('pro');
          infoAlert('Success', 'You are now a Pro member!');
          router.back();
        } catch (error) {
          infoAlert('Error', 'Failed to upgrade subscription');
        } finally {
          setLoading(false);
        }
      },
      'Activate Pro (Mock)',
      'Cancel',
      () => setLoading(false)
    );
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Upgrade to Pro</Text>
        <Text style={styles.subtitle}>
          Unlock unlimited trips and premium features
        </Text>
      </View>

      <Card style={styles.featuresCard}>
        <Text style={styles.featuresTitle}>Pro Features</Text>
        
        <View style={styles.feature}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.featureText}>Unlimited saved trips</Text>
        </View>
        
        <View style={styles.feature}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.featureText}>Export budget as PDF</Text>
        </View>
        
        <View style={styles.feature}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.featureText}>Advanced budget templates</Text>
        </View>
        
        <View style={styles.feature}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.featureText}>Priority support</Text>
        </View>
        
        <View style={styles.feature}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.featureText}>Sync across devices</Text>
        </View>
      </Card>

      <Card style={styles.pricingCard}>
        <View style={styles.pricingOption}>
          <View>
            <Text style={styles.pricingLabel}>Monthly</Text>
            <Text style={styles.pricingPrice}>${PRO_PRICE_MONTHLY}/mo</Text>
          </View>
          <Text style={styles.badge}>Popular</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.pricingOption}>
          <View>
            <Text style={styles.pricingLabel}>Yearly</Text>
            <Text style={styles.pricingPrice}>${PRO_PRICE_YEARLY}/yr</Text>
            <Text style={styles.savings}>Save ${(PRO_PRICE_MONTHLY * 12 - PRO_PRICE_YEARLY).toFixed(2)}</Text>
          </View>
          <Text style={[styles.badge, styles.bestValue]}>Best Value</Text>
        </View>
      </Card>

      <Button
        title="Start Pro Trial"
        onPress={handleSubscribe}
        loading={loading}
        fullWidth
        style={styles.subscribeButton}
      />

      <Text style={styles.disclaimer}>
        Mock subscription - no real payment will be processed
      </Text>

      <Button
        title="Maybe Later"
        onPress={() => router.back()}
        variant="outline"
        fullWidth
        style={styles.laterButton}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  featuresCard: {
    marginBottom: 16,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkmark: {
    fontSize: 20,
    color: colors.success,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: colors.text,
  },
  pricingCard: {
    marginBottom: 16,
  },
  pricingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  pricingLabel: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  pricingPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 4,
  },
  savings: {
    fontSize: 12,
    color: colors.success,
    marginTop: 2,
  },
  badge: {
    backgroundColor: colors.secondary,
    color: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '600',
  },
  bestValue: {
    backgroundColor: colors.success,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  subscribeButton: {
    marginBottom: 8,
  },
  disclaimer: {
    fontSize: 12,
    color: colors.textTertiary,
    textAlign: 'center',
    marginBottom: 16,
  },
  laterButton: {
    marginBottom: 32,
  },
});
