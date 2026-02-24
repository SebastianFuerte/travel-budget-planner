// src/utils/alert.ts
// Cross-platform alert helper that works correctly on web
// React Native's Alert.alert has issues on web with button callbacks

import { Alert, Platform } from 'react-native';

interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

/**
 * Show a confirmation dialog that works on both web and mobile.
 * On web: uses window.confirm (reliable callback execution)
 * On mobile: uses native Alert.alert
 */
export const confirmAlert = (
  title: string,
  message: string,
  onConfirm: () => void,
  confirmText: string = 'Confirm',
  cancelText: string = 'Cancel',
  onCancel?: () => void,
) => {
  if (Platform.OS === 'web') {
    const result = window.confirm(`${title}\n\n${message}`);
    if (result) {
      onConfirm();
    } else {
      onCancel?.();
    }
  } else {
    Alert.alert(title, message, [
      { text: cancelText, style: 'cancel', onPress: onCancel },
      { text: confirmText, style: 'destructive', onPress: onConfirm },
    ]);
  }
};

/**
 * Show an info alert (no confirmation needed)
 */
export const infoAlert = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message, [{ text: 'OK' }]);
  }
};
