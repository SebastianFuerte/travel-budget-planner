// src/components/documents/QRCodeModal.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import colors from '../../theme/colors';

interface QRCodeModalProps {
  visible: boolean;
  title: string;
  qrValue: string;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  visible,
  title,
  qrValue,
  onClose,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent presentationStyle="overFullScreen">
      <SafeAreaView style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>Show this at the gate</Text>

          <View style={styles.qrContainer}>
            <QRCode
              value={qrValue || ' '}
              size={220}
              color="#000000"
              backgroundColor="#FFFFFF"
            />
          </View>

          <Text style={styles.qrText} numberOfLines={2}>{qrValue}</Text>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 24,
  },
  qrContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  qrText: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  closeButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 48,
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
