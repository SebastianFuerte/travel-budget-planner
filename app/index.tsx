// app/index.tsx

import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { getHasSeenOnboarding } from '../src/services/storage';
import colors from '../src/theme/colors';

export default function Index() {
  const [checked, setChecked] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(true);

  useEffect(() => {
    getHasSeenOnboarding().then(seen => {
      setHasSeenOnboarding(seen);
      setChecked(true);
    });
  }, []);

  if (!checked) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!hasSeenOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)" />;
}
