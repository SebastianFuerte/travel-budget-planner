// app/onboarding.tsx

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer } from '../src/components/layout/ScreenContainer';
import { setHasSeenOnboarding } from '../src/services/storage';
import { useTranslation } from '../src/i18n';
import colors from '../src/theme/colors';

const SLIDE_WIDTH = Math.min(Dimensions.get('window').width, 400);

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const SLIDES = [
    { id: '1', icon: '✈️', title: t.onboarding.slide1Title, description: t.onboarding.slide1Desc },
    { id: '2', icon: '📋', title: t.onboarding.slide2Title, description: t.onboarding.slide2Desc },
    { id: '3', icon: '💰', title: t.onboarding.slide3Title, description: t.onboarding.slide3Desc },
  ];

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => handleFinish();

  const handleFinish = async () => {
    await setHasSeenOnboarding();
    router.replace('/(tabs)');
  };

  const renderSlide = ({ item }: { item: typeof SLIDES[0] }) => (
    <View style={[styles.slide, { width: SLIDE_WIDTH }]}>
      <Text style={styles.slideIcon}>{item.icon}</Text>
      <Text style={styles.slideTitle}>{item.title}</Text>
      <Text style={styles.slideDescription}>{item.description}</Text>
    </View>
  );

  const isLastSlide = currentIndex === SLIDES.length - 1;

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>{t.onboarding.skip}</Text>
        </TouchableOpacity>

        <View style={styles.slideContainer}>
          <FlatList
            ref={flatListRef}
            data={SLIDES}
            renderItem={renderSlide}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={Platform.OS !== 'web'}
            onMomentumScrollEnd={e => {
              const index = Math.round(e.nativeEvent.contentOffset.x / SLIDE_WIDTH);
              setCurrentIndex(index);
            }}
            style={{ maxWidth: SLIDE_WIDTH }}
            contentContainerStyle={{ alignItems: 'center' }}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.dots}>
            {SLIDES.map((_, i) => (
              <View key={i} style={[styles.dot, i === currentIndex && styles.dotActive]} />
            ))}
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {isLastSlide ? t.onboarding.getStarted : t.onboarding.next}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  skipButton: { alignSelf: 'flex-end', padding: 16, paddingTop: 20 },
  skipText: { fontSize: 15, color: colors.textSecondary, fontWeight: '500' },
  slideContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  slide: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  slideIcon: { fontSize: 72, marginBottom: 28 },
  slideTitle: { fontSize: 24, fontWeight: '700', color: colors.text, textAlign: 'center', marginBottom: 16 },
  slideDescription: { fontSize: 15, color: colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  footer: { paddingHorizontal: 32, paddingBottom: 40, alignItems: 'center', gap: 24 },
  dots: { flexDirection: 'row', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.primary, width: 24 },
  nextButton: {
    backgroundColor: colors.primary, borderRadius: 14,
    paddingVertical: 16, paddingHorizontal: 48,
    width: '100%', maxWidth: 320, alignItems: 'center',
  },
  nextButtonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
});
