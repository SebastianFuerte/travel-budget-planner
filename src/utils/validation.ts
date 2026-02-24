// src/utils/validation.ts

export const validateTripName = (name: string): string | null => {
  if (!name || name.trim().length === 0) {
    return 'Trip name is required';
  }
  if (name.trim().length < 2) {
    return 'Trip name must be at least 2 characters';
  }
  if (name.trim().length > 50) {
    return 'Trip name must be less than 50 characters';
  }
  return null;
};

export const validateDates = (
  startDate: Date,
  endDate: Date
): string | null => {
  if (!startDate || !endDate) {
    return 'Both dates are required';
  }
  
  if (endDate <= startDate) {
    return 'End date must be after start date';
  }
  
  const daysDiff = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (daysDiff > 365) {
    return 'Trip cannot be longer than 1 year';
  }
  
  return null;
};

export const validateNumberOfPeople = (count: number): string | null => {
  if (!count || count < 1) {
    return 'At least 1 person is required';
  }
  if (count > 20) {
    return 'Maximum 20 people allowed';
  }
  return null;
};

export const validateBudgetValue = (value: number): string | null => {
  if (value < 0) {
    return 'Value cannot be negative';
  }
  if (value > 10000) {
    return 'Value seems too high. Please check.';
  }
  return null;
};
