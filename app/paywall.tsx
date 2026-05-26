// app/paywall.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer } from '../src/components/layout/ScreenContainer';
import { Button } from '../src/components/ui/Button';
import { Card } from '../src/components/ui/Card';
import colors from '../src/theme/colors';
import { useTranslation } from '../src/i18n';

export default function PaywallScreen() {
  const { t } = useTranslation();

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.emoji}>🌟</Text>
        <Text style={styles.title}>{t.paywall.title}</Text>
        <Text style={styles.subtitle}>{t.paywall.subtitle}</Text>
      </View>

      <Card style={styles.featuresCard}>
        <Text style={styles.featuresTitle}>Pro Features</Text>

        <View style={styles.feature}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.featureText}>{t.paywall.feature1}</Text>
        </View>

        <View style={styles.feature}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.featureText}>{t.paywall.feature2}</Text>
        </View>

        <View style={styles.feature}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.featureText}>{t.paywall.feature3}</Text>
        </View>
      </Card>

      <Card style={styles.comingSoonCard}>
        <Text style={styles.comingSoonTitle}>🚀 Coming Soon</Text>
        <Text style={styles.comingSoonText}>
          Pro subscriptions are coming in a future update. For now, enjoy the app and stay tuned!
        </Text>
      </Card>

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
  emoji: {
    fontSize: 48,
    marginBottom: 12,
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
  comingSoonCard: {
    marginBottom: 24,
    backgroundColor: colors.primary + '10',
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  comingSoonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  comingSoonText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  laterButton: {
    marginBottom: 32,
  },
});
