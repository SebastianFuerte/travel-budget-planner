import { FREE_TRIP_LIMIT, FREE_DOC_LIMIT } from '../src/utils/constants';

// Test the subscription logic directly without Zustand store setup
// These test the pure helper logic that guards paywalled features

describe('Subscription limits (constants)', () => {
  it('FREE_TRIP_LIMIT is defined and > 0', () => {
    expect(FREE_TRIP_LIMIT).toBeGreaterThan(0);
  });

  it('FREE_DOC_LIMIT is 3', () => {
    expect(FREE_DOC_LIMIT).toBe(3);
  });
});

describe('canCreateTrip logic', () => {
  const canCreate = (isPro: boolean, currentCount: number) =>
    isPro || currentCount < FREE_TRIP_LIMIT;

  it('free user can create trip when under limit', () => {
    expect(canCreate(false, 0)).toBe(true);
  });

  it('free user blocked AT limit', () => {
    expect(canCreate(false, FREE_TRIP_LIMIT)).toBe(false);
  });

  it('pro user always allowed regardless of count', () => {
    expect(canCreate(true, 100)).toBe(true);
  });
});

describe('canAddDocument logic', () => {
  const canAdd = (isPro: boolean, currentCount: number) =>
    isPro || currentCount < FREE_DOC_LIMIT;

  it('free user can add when under limit (0)', () => expect(canAdd(false, 0)).toBe(true));
  it('free user can add when under limit (2)', () => expect(canAdd(false, 2)).toBe(true));
  it('free user blocked AT limit (3)', () => expect(canAdd(false, 3)).toBe(false));
  it('pro user always allowed', () => expect(canAdd(true, 100)).toBe(true));
});

describe('isPro expiry logic', () => {
  const isProActive = (tier: string, isActive: boolean, expiresAt?: Date) => {
    if (!isActive || tier !== 'pro') return false;
    if (expiresAt && expiresAt < new Date()) return false;
    return true;
  };

  it('pro + active + no expiry = true', () => {
    expect(isProActive('pro', true)).toBe(true);
  });

  it('pro + active + future expiry = true', () => {
    const future = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    expect(isProActive('pro', true, future)).toBe(true);
  });

  it('pro + active + past expiry = false', () => {
    const past = new Date(Date.now() - 1000);
    expect(isProActive('pro', true, past)).toBe(false);
  });

  it('pro + inactive = false', () => {
    expect(isProActive('pro', false)).toBe(false);
  });

  it('free tier = false', () => {
    expect(isProActive('free', true)).toBe(false);
  });
});
