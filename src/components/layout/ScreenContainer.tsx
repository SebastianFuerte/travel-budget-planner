// src/components/layout/ScreenContainer.tsx

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  ViewStyle,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../theme/colors';
import { WEB_CONTAINER_MAX_WIDTH, WEB_CONTAINER_PADDING } from '../../utils/constants';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
}

/**
 * ScreenContainer - CRITICAL COMPONENT FOR PC PREVIEW
 *
 * En WEB: muestra un contenedor centrado tipo "teléfono" (max 480px)
 * En MOBILE: ocupa todo el ancho nativo con status bar visible
 *
 * Esto permite revisar la app en PC como si fuera un celular
 */
export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = true,
  style,
}) => {
  const content = scrollable ? (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.container, style]}>{children}</View>
  );

  if (Platform.OS === 'web') {
    // WEB: Simula un teléfono en el centro de la pantalla
    return (
      <View style={styles.webWrapper}>
        <View style={styles.webContainer}>
          <StatusBar style="dark" />
          {content}
        </View>
      </View>
    );
  }

  // MOBILE: SafeAreaView con edges explícitos para todos los iPhones
  // (notch, Dynamic Island, home indicator)
  return (
    <>
      <StatusBar style="dark" backgroundColor={colors.background} translucent={false} />
      <SafeAreaView
        style={styles.mobileContainer}
        edges={['top', 'left', 'right']}
      >
        {content}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  // WEB STYLES - Simula un teléfono
  webWrapper: {
    flex: 1,
    backgroundColor: colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: WEB_CONTAINER_PADDING,
  },
  webContainer: {
    flex: 1,
    width: '100%',
    maxWidth: WEB_CONTAINER_MAX_WIDTH,
    backgroundColor: colors.background,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },

  // MOBILE STYLES - Pantalla completa
  mobileContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
});
