import {
  validateTripName,
  validateDates,
  validateNumberOfPeople,
  validateBudgetValue,
} from '../src/utils/validation';

describe('validateTripName', () => {
  it('rejects empty string', () => expect(validateTripName('')).not.toBeNull());
  it('rejects whitespace only', () => expect(validateTripName('   ')).not.toBeNull());
  it('rejects 1-char name', () => expect(validateTripName('A')).not.toBeNull());
  it('accepts exactly 2 chars', () => expect(validateTripName('AB')).toBeNull());
  it('accepts exactly 50 chars', () => expect(validateTripName('A'.repeat(50))).toBeNull());
  it('rejects 51 chars', () => expect(validateTripName('A'.repeat(51))).not.toBeNull());
  it('accepts normal name', () => expect(validateTripName('Tokyo Adventure')).toBeNull());
});

describe('validateDates', () => {
  const d = (iso: string) => new Date(iso);

  it('rejects same-day trip (end === start)', () => {
    expect(validateDates(d('2026-07-01'), d('2026-07-01'))).not.toBeNull();
  });

  it('accepts end one day after start', () => {
    expect(validateDates(d('2026-07-01'), d('2026-07-02'))).toBeNull();
  });

  it('rejects end before start', () => {
    expect(validateDates(d('2026-07-10'), d('2026-07-05'))).not.toBeNull();
  });

  it('rejects trip longer than 365 days', () => {
    expect(validateDates(d('2026-01-01'), d('2027-01-03'))).not.toBeNull();
  });

  it('accepts trip of exactly 365 days', () => {
    expect(validateDates(d('2026-01-01'), d('2027-01-01'))).toBeNull();
  });
});

describe('validateNumberOfPeople', () => {
  it('rejects 0 people', () => expect(validateNumberOfPeople(0)).not.toBeNull());
  it('accepts 1 person', () => expect(validateNumberOfPeople(1)).toBeNull());
  it('accepts 20 people', () => expect(validateNumberOfPeople(20)).toBeNull());
  it('rejects 21 people', () => expect(validateNumberOfPeople(21)).not.toBeNull());
});

describe('validateBudgetValue', () => {
  it('rejects negative values', () => expect(validateBudgetValue(-1)).not.toBeNull());
  it('accepts 0', () => expect(validateBudgetValue(0)).toBeNull());
  it('accepts 10000', () => expect(validateBudgetValue(10000)).toBeNull());
  it('rejects values above 10000', () => expect(validateBudgetValue(10001)).not.toBeNull());
});
