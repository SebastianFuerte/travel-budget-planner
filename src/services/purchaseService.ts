import { Platform } from 'react-native';
import Purchases, {
  LOG_LEVEL,
  type CustomerInfo,
  type PurchasesOfferings,
  type PurchasesPackage,
} from 'react-native-purchases';

// Product IDs — must match exactly what you create in App Store Connect + RevenueCat
export const PRODUCT_IDS = {
  MONTHLY: 'travel_budget_pro_monthly',
  ANNUAL: 'travel_budget_pro_annual',
} as const;

// Entitlement ID configured in RevenueCat dashboard
export const ENTITLEMENT_PRO = 'pro';

let isConfigured = false;

export function configurePurchases(): void {
  const iosKey = process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY;
  const androidKey = process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY;
  const apiKey = Platform.OS === 'ios' ? iosKey : androidKey;

  if (!apiKey) return;

  try {
    Purchases.setLogLevel(LOG_LEVEL.ERROR);
    Purchases.configure({ apiKey });
    isConfigured = true;
  } catch (e) {
    // Native module not available (Expo Go) — app runs in free mode
  }
}

export async function getOfferings(): Promise<PurchasesOfferings | null> {
  if (!isConfigured) return null;
  try {
    return await Purchases.getOfferings();
  } catch {
    return null;
  }
}

export async function purchasePackage(pkg: PurchasesPackage): Promise<CustomerInfo> {
  const { customerInfo } = await Purchases.purchasePackage(pkg);
  return customerInfo;
}

export async function restorePurchases(): Promise<CustomerInfo | null> {
  if (!isConfigured) return null;
  try {
    return await Purchases.restorePurchases();
  } catch {
    return null;
  }
}

export async function getCustomerInfo(): Promise<CustomerInfo | null> {
  if (!isConfigured) return null;
  try {
    return await Purchases.getCustomerInfo();
  } catch {
    return null;
  }
}

export function isProEntitled(info: CustomerInfo): boolean {
  return ENTITLEMENT_PRO in info.entitlements.active;
}
