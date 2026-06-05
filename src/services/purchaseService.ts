import { Platform } from 'react-native';
import Constants from 'expo-constants';
import type { CustomerInfo, PurchasesOfferings, PurchasesPackage } from 'react-native-purchases';

export const PRODUCT_IDS = {
  MONTHLY: 'monthly',
  ANNUAL:  'yearly',
} as const;

export const ENTITLEMENT_PRO = 'Travel Budget Planner Pro';

// Expo Go doesn't support native modules — app runs in free mode
const isExpoGo = Constants.appOwnership === 'expo';
let isConfigured = false;

function getModule() {
  if (isExpoGo) return null;
  try {
    return require('react-native-purchases');
  } catch {
    return null;
  }
}

export function configurePurchases(): void {
  const mod = getModule();
  if (!mod) return;

  const apiKey = Platform.OS === 'ios'
    ? process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY
    : process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY;
  if (!apiKey) return;

  try {
    mod.default.setLogLevel(mod.LOG_LEVEL.ERROR);
    mod.default.configure({ apiKey });
    isConfigured = true;
  } catch {
    // Silent — free mode
  }
}

export async function getOfferings(): Promise<PurchasesOfferings | null> {
  if (!isConfigured) return null;
  try {
    const mod = getModule();
    return await mod?.default.getOfferings() ?? null;
  } catch {
    return null;
  }
}

export async function purchasePackage(pkg: PurchasesPackage): Promise<CustomerInfo> {
  const mod = getModule();
  if (!mod) throw new Error('Purchases not available');
  const { customerInfo } = await mod.default.purchasePackage(pkg);
  return customerInfo;
}

export async function restorePurchases(): Promise<CustomerInfo | null> {
  if (!isConfigured) return null;
  try {
    const mod = getModule();
    return await mod?.default.restorePurchases() ?? null;
  } catch {
    return null;
  }
}

export async function getCustomerInfo(): Promise<CustomerInfo | null> {
  if (!isConfigured) return null;
  try {
    const mod = getModule();
    return await mod?.default.getCustomerInfo() ?? null;
  } catch {
    return null;
  }
}

export function isProEntitled(info: CustomerInfo): boolean {
  return ENTITLEMENT_PRO in info.entitlements.active;
}
