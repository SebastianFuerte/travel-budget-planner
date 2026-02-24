// src/components/ui/DeepLinkPreScreen.tsx
// Modal shown before opening a provider link
// Shows search params, "Open in Browser" button, and cancel

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Linking, Platform } from 'react-native';
import colors from '../../theme/colors';

interface DeepLinkPreScreenProps {
  visible: boolean;
  providerName: string;
  providerIcon?: string;
  searchParams: { label: string; value: string }[];
  url: string;
  limitations?: string;
  onClose: () => void;
  onOpened?: () => void;
}

export const DeepLinkPreScreen: React.FC<DeepLinkPreScreenProps> = ({
  visible,
  providerName,
  providerIcon,
  searchParams,
  url,
  limitations,
  onClose,
  onOpened,
}) => {
  const handleOpen = async () => {
    try {
      if (Platform.OS === 'web') {
        window.open(url, '_blank');
      } else {
        await Linking.openURL(url);
      }
      onOpened?.();
    } catch {
      // fallback
      await Linking.openURL(url).catch(() => {});
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.providerIcon}>{providerIcon || '🔗'}</Text>
          <Text style={styles.title}>Searching {providerName}</Text>

          <View style={styles.paramsList}>
            {searchParams.map((p, i) => (
              <View key={i} style={styles.paramRow}>
                <Text style={styles.paramLabel}>{p.label}</Text>
                <Text style={styles.paramValue}>{p.value}</Text>
              </View>
            ))}
          </View>

          {limitations && (
            <View style={styles.limitationBox}>
              <Text style={styles.limitationText}>{limitations}</Text>
            </View>
          )}

          <Text style={styles.hint}>
            Check the price on the provider site, then come back to confirm it here.
          </Text>

          <TouchableOpacity style={styles.openButton} onPress={handleOpen} activeOpacity={0.7}>
            <Text style={styles.openButtonText}>Open in Browser</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  providerIcon: { fontSize: 36, marginBottom: 8 },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  paramsList: { width: '100%', marginBottom: 12 },
  paramRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  paramLabel: { fontSize: 13, color: colors.textSecondary, fontWeight: '500' },
  paramValue: { fontSize: 13, color: colors.text, fontWeight: '600', textAlign: 'right', flex: 1, marginLeft: 12 },
  limitationBox: {
    backgroundColor: '#FEF9C3',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    marginBottom: 12,
  },
  limitationText: { fontSize: 11, color: '#854D0E', lineHeight: 16 },
  hint: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  openButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },
  openButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  cancelButtonText: { color: colors.textSecondary, fontSize: 14, fontWeight: '500' },
});
