// src/types/documents.ts
// Types for Travel Documents & Entry Requirements module

// --- ENTRY REQUIREMENTS ---

export type EntryStatus =
  | 'VISA_REQUIRED'
  | 'VISA_NOT_REQUIRED'
  | 'VISA_FREE_BUT_REQUIRED'       // Visa process exists but fee is free
  | 'NOT_REQUIRED_BUT_RECOMMENDED' // Not legally required, but strongly recommended
  | 'DEPENDS';                     // Depends on conditions (explanation in summary)

export type PassportType = 'ordinary' | 'diplomatic' | 'official';

export type TripPurpose = 'tourism' | 'business';

export type EntryStatusColor = 'green' | 'yellow' | 'red';

export interface OfficialSource {
  title: string;
  url: string;
}

export interface EntryRequirement {
  nationality: string;
  destinationCountry: string;
  passportType: PassportType;
  purpose: TripPurpose;
  status: EntryStatus;
  summary: string;               // 1-2 lines overview
  details: string[];             // Bullet points
  fee: string;                   // e.g. "Free", "$160 USD"
  processingTime: string;        // e.g. "10 business days"
  maxStayDays?: number;
  passportValidityMonths: number;
  visaType?: string;             // e.g. "B1/B2", "eVisa", "ESTA"
  officialSources: OfficialSource[];
  lastUpdatedISO: string;        // e.g. "2024-06-15"
  notes?: string;
  healthRequirements?: HealthRequirement[];
}

export interface HealthRequirement {
  id: string;
  type: 'vaccine' | 'test' | 'insurance' | 'other';
  name: string;
  status: 'required' | 'recommended' | 'not_required';
  description: string;
  officialSource?: OfficialSource;
  notes?: string;
}

export const ENTRY_STATUS_LABELS: Record<EntryStatus, string> = {
  VISA_REQUIRED: 'Visa Required',
  VISA_NOT_REQUIRED: 'Visa Not Required',
  VISA_FREE_BUT_REQUIRED: 'Visa Required (No Fee)',
  NOT_REQUIRED_BUT_RECOMMENDED: 'Not Required but Recommended',
  DEPENDS: 'Depends on Conditions',
};

export const ENTRY_STATUS_COLORS: Record<EntryStatus, EntryStatusColor> = {
  VISA_NOT_REQUIRED: 'green',
  VISA_FREE_BUT_REQUIRED: 'yellow',
  NOT_REQUIRED_BUT_RECOMMENDED: 'green',
  VISA_REQUIRED: 'red',
  DEPENDS: 'yellow',
};

export const PASSPORT_TYPE_LABELS: Record<PassportType, string> = {
  ordinary: 'Ordinary Passport',
  diplomatic: 'Diplomatic Passport',
  official: 'Official / Service Passport',
};

export const NATIONALITIES = [
  'Argentina',
  'Brazil',
  'Canada',
  'Chile',
  'Colombia',
  'France',
  'Germany',
  'Italy',
  'Mexico',
  'Peru',
  'Spain',
  'United Kingdom',
  'USA',
];

// --- DOCUMENT VAULT ---

export type DocumentCategory =
  | 'passport'
  | 'visa'
  | 'flight'
  | 'boarding_pass'
  | 'accommodation'
  | 'insurance'
  | 'other';

export type DocumentFileType = 'image' | 'pdf';

export interface TripDocument {
  id: string;
  tripId: string;
  category: DocumentCategory;
  title: string;
  fileUri?: string;
  fileType?: DocumentFileType;
  notes?: string;
  date?: string;
  createdAt: string;
  updatedAt: string;
}

export const DOCUMENT_CATEGORIES: Record<DocumentCategory, { label: string; icon: string }> = {
  passport: { label: 'Passport', icon: '🛂' },
  visa: { label: 'Visa / Permit', icon: '📋' },
  flight: { label: 'Flights', icon: '✈️' },
  boarding_pass: { label: 'Boarding Pass / QR', icon: '🎫' },
  accommodation: { label: 'Accommodation', icon: '🏨' },
  insurance: { label: 'Travel Insurance', icon: '🛡️' },
  other: { label: 'Other', icon: '📎' },
};

// --- TIMELINE ---

export interface TimelineEvent {
  id: string;
  tripId: string;
  type: 'flight_departure' | 'flight_return' | 'checkin' | 'checkout' | 'visa_deadline' | 'custom';
  title: string;
  date: string;
  details?: string;
  documentId?: string;
}

export const TIMELINE_TYPE_LABELS: Record<TimelineEvent['type'], { label: string; icon: string }> = {
  flight_departure: { label: 'Departure Flight', icon: '🛫' },
  flight_return: { label: 'Return Flight', icon: '🛬' },
  checkin: { label: 'Check-in', icon: '🏨' },
  checkout: { label: 'Check-out', icon: '🚪' },
  visa_deadline: { label: 'Visa Deadline', icon: '📋' },
  custom: { label: 'Custom Event', icon: '📌' },
};

// --- TRIP DOCUMENTS AGGREGATE ---

export interface TripDocumentsData {
  tripId: string;
  nationality: string;
  passportType: PassportType;
  tripPurpose: TripPurpose;
  documents: TripDocument[];
  timelineEvents: TimelineEvent[];
}
