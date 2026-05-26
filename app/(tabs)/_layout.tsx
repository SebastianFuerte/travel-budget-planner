// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';
import colors from '../../src/theme/colors';
import { useTranslation } from '../../src/i18n';

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            backgroundColor: colors.background,
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t.tabs.myTrips,
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>✈️</Text>,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: t.tabs.create,
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>➕</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t.tabs.profile,
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>👤</Text>,
        }}
      />
    </Tabs>
  );
}
