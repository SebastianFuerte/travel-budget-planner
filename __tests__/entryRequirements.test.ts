// __tests__/entryRequirements.test.ts

import {
  getEntryRequirements,
  getEntryStatusColor,
  getAvailableDestinations,
  getAvailablePassportCountries,
  hasRequirements,
  mapEntryStatusToColor,
} from '../src/services/visaRequirements';
import {
  ENTRY_STATUS_COLORS,
  ENTRY_STATUS_LABELS,
  EntryStatus,
  EntryStatusColor,
} from '../src/types/documents';

describe('Entry Requirements - Status Mapping', () => {
  it('should map all EntryStatus values to a color', () => {
    const statuses: EntryStatus[] = [
      'VISA_REQUIRED',
      'VISA_NOT_REQUIRED',
      'VISA_FREE_BUT_REQUIRED',
      'NOT_REQUIRED_BUT_RECOMMENDED',
      'DEPENDS',
    ];
    statuses.forEach(status => {
      const color = mapEntryStatusToColor(status);
      expect(['green', 'yellow', 'red']).toContain(color);
    });
  });

  it('should map VISA_REQUIRED to red', () => {
    expect(ENTRY_STATUS_COLORS['VISA_REQUIRED']).toBe('red');
  });

  it('should map VISA_NOT_REQUIRED to green', () => {
    expect(ENTRY_STATUS_COLORS['VISA_NOT_REQUIRED']).toBe('green');
  });

  it('should map VISA_FREE_BUT_REQUIRED to yellow', () => {
    expect(ENTRY_STATUS_COLORS['VISA_FREE_BUT_REQUIRED']).toBe('yellow');
  });

  it('should map NOT_REQUIRED_BUT_RECOMMENDED to green', () => {
    expect(ENTRY_STATUS_COLORS['NOT_REQUIRED_BUT_RECOMMENDED']).toBe('green');
  });

  it('should map DEPENDS to yellow', () => {
    expect(ENTRY_STATUS_COLORS['DEPENDS']).toBe('yellow');
  });

  it('should have labels for all statuses', () => {
    const statuses: EntryStatus[] = [
      'VISA_REQUIRED',
      'VISA_NOT_REQUIRED',
      'VISA_FREE_BUT_REQUIRED',
      'NOT_REQUIRED_BUT_RECOMMENDED',
      'DEPENDS',
    ];
    statuses.forEach(status => {
      expect(ENTRY_STATUS_LABELS[status]).toBeDefined();
      expect(typeof ENTRY_STATUS_LABELS[status]).toBe('string');
    });
  });
});

describe('Entry Requirements - Colombia -> Japan', () => {
  it('should return VISA_FREE_BUT_REQUIRED for ordinary passport', () => {
    const req = getEntryRequirements('Colombia', 'Japan', 'tourism', 'ordinary');
    expect(req).not.toBeNull();
    expect(req!.status).toBe('VISA_FREE_BUT_REQUIRED');
    expect(req!.fee).toBe('Free');
  });

  it('should return VISA_NOT_REQUIRED for diplomatic passport', () => {
    const req = getEntryRequirements('Colombia', 'Japan', 'tourism', 'diplomatic');
    expect(req).not.toBeNull();
    expect(req!.status).toBe('VISA_NOT_REQUIRED');
  });

  it('should return VISA_NOT_REQUIRED for official passport', () => {
    const req = getEntryRequirements('Colombia', 'Japan', 'tourism', 'official');
    expect(req).not.toBeNull();
    expect(req!.status).toBe('VISA_NOT_REQUIRED');
  });

  it('should have official sources with URLs', () => {
    const req = getEntryRequirements('Colombia', 'Japan', 'tourism', 'ordinary');
    expect(req!.officialSources.length).toBeGreaterThan(0);
    req!.officialSources.forEach(src => {
      expect(src.title).toBeDefined();
      expect(src.url).toMatch(/^https?:\/\//);
    });
  });

  it('should have passport validity requirement', () => {
    const req = getEntryRequirements('Colombia', 'Japan', 'tourism', 'ordinary');
    expect(req!.passportValidityMonths).toBeGreaterThanOrEqual(6);
  });
});

describe('Entry Requirements - Colombia -> USA', () => {
  it('should return VISA_REQUIRED for ordinary passport', () => {
    const req = getEntryRequirements('Colombia', 'USA', 'tourism', 'ordinary');
    expect(req).not.toBeNull();
    expect(req!.status).toBe('VISA_REQUIRED');
    expect(req!.fee).toContain('185');
  });
});

describe('Entry Requirements - Spain -> USA (ESTA)', () => {
  it('should return VISA_FREE_BUT_REQUIRED for ESTA', () => {
    const req = getEntryRequirements('Spain', 'USA', 'tourism', 'ordinary');
    expect(req).not.toBeNull();
    expect(req!.status).toBe('VISA_FREE_BUT_REQUIRED');
    expect(req!.visaType).toContain('ESTA');
  });
});

describe('Entry Requirements - Lookups', () => {
  it('should be case-insensitive for nationality', () => {
    const req1 = getEntryRequirements('colombia', 'Japan');
    const req2 = getEntryRequirements('COLOMBIA', 'Japan');
    expect(req1).not.toBeNull();
    expect(req2).not.toBeNull();
    expect(req1!.status).toBe(req2!.status);
  });

  it('should return a conservative fallback for unknown combination', () => {
    const req = getEntryRequirements('Antarctica', 'Mars');
    // The service always returns a fallback (never null) so users always see
    // a conservative VISA_REQUIRED placeholder with a note to verify officially.
    expect(req).not.toBeNull();
    expect(req!.status).toBe('VISA_REQUIRED');
    expect(req!.destinationCountry).toBe('Mars');
  });

  it('should return destinations list', () => {
    const destinations = getAvailableDestinations();
    expect(destinations.length).toBeGreaterThan(0);
    expect(destinations).toContain('Japan');
    expect(destinations).toContain('USA');
  });

  it('should return passport countries list', () => {
    const countries = getAvailablePassportCountries();
    expect(countries.length).toBeGreaterThan(0);
    expect(countries).toContain('Colombia');
    expect(countries).toContain('USA');
  });

  it('should check hasRequirements correctly', () => {
    expect(hasRequirements('Colombia', 'Japan')).toBe(true);
    expect(hasRequirements('Antarctica', 'Mars')).toBe(false);
  });
});
