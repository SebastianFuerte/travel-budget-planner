// src/services/visaRequirements.ts
// Hardcoded visa/entry requirements dataset - easily extensible

import {
  EntryRequirement,
  EntryStatus,
  EntryStatusColor,
  PassportType,
  TripPurpose,
  ENTRY_STATUS_COLORS,
} from '../types/documents';

const REQUIREMENTS: EntryRequirement[] = [
  // ========== COLOMBIA -> JAPAN ==========
  {
    nationality: 'Colombia',
    destinationCountry: 'Japan',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_FREE_BUT_REQUIRED',
    summary: 'Colombian ordinary passport holders must complete a visa process, but the tourist visa has no fee for stays up to 90 days.',
    details: [
      'Visa application required at Japanese Embassy/Consulate',
      'No visa fee (free of charge)',
      'Passport valid for at least 6 months',
      'Return or onward ticket required',
      'Proof of accommodation',
      'Proof of sufficient funds',
      'Invitation letter or itinerary may be requested',
    ],
    fee: 'Free',
    processingTime: '5-10 business days',
    maxStayDays: 90,
    passportValidityMonths: 6,
    visaType: 'Short-term Stay Visa (Tourist)',
    officialSources: [
      { title: 'Japan MOFA - Visa Info', url: 'https://www.mofa.go.jp/j_info/visit/visa/index.html' },
      { title: 'Embassy of Japan in Colombia', url: 'https://www.colombia.emb-japan.go.jp/itprtop_es/index.html' },
    ],
    lastUpdatedISO: '2024-06-15',
    notes: 'The visa process exists but there is no fee. Processing times may vary.',
    healthRequirements: [
      {
        id: 'hr-col-jp-1',
        type: 'vaccine',
        name: 'Yellow Fever',
        status: 'required',
        description: 'Yellow fever vaccination certificate required for travelers from Colombia (endemic area). Must be vaccinated at least 10 days before arrival.',
        officialSource: { title: 'WHO - Yellow Fever', url: 'https://www.who.int/health-topics/yellow-fever' },
      },
      {
        id: 'hr-col-jp-2',
        type: 'vaccine',
        name: 'Japanese Encephalitis',
        status: 'recommended',
        description: 'Recommended for travelers spending extended time in rural areas, especially during summer months.',
        officialSource: { title: 'CDC - Japanese Encephalitis', url: 'https://wwwnc.cdc.gov/travel/diseases/japanese-encephalitis' },
      },
      {
        id: 'hr-col-jp-3',
        type: 'vaccine',
        name: 'Routine Vaccines',
        status: 'recommended',
        description: 'Ensure routine vaccines are up to date: MMR, DTP, Varicella, Polio, Influenza.',
        officialSource: { title: 'CDC - Japan Travel Health', url: 'https://wwwnc.cdc.gov/travel/destinations/traveler/none/japan' },
      },
    ],
  },
  {
    nationality: 'Colombia',
    destinationCountry: 'Japan',
    passportType: 'diplomatic',
    purpose: 'tourism',
    status: 'VISA_NOT_REQUIRED',
    summary: 'Colombian diplomatic passport holders are exempt from visa requirements for Japan (up to 90 days).',
    details: ['No visa needed', 'Valid diplomatic passport required', 'Return or onward ticket'],
    fee: 'Free',
    processingTime: 'N/A',
    maxStayDays: 90,
    passportValidityMonths: 6,
    officialSources: [{ title: 'Japan MOFA - Visa Info', url: 'https://www.mofa.go.jp/j_info/visit/visa/index.html' }],
    lastUpdatedISO: '2024-06-15',
  },
  {
    nationality: 'Colombia',
    destinationCountry: 'Japan',
    passportType: 'official',
    purpose: 'tourism',
    status: 'VISA_NOT_REQUIRED',
    summary: 'Colombian official/service passport holders are exempt from visa requirements for Japan (up to 90 days).',
    details: ['No visa needed', 'Valid official passport required', 'Return or onward ticket'],
    fee: 'Free',
    processingTime: 'N/A',
    maxStayDays: 90,
    passportValidityMonths: 6,
    officialSources: [{ title: 'Japan MOFA - Visa Info', url: 'https://www.mofa.go.jp/j_info/visit/visa/index.html' }],
    lastUpdatedISO: '2024-06-15',
    healthRequirements: [
      {
        id: 'hr-col-jp-off-1',
        type: 'vaccine',
        name: 'Routine Vaccines',
        status: 'recommended',
        description: 'Ensure routine vaccines are up to date: MMR, DTP, Varicella, Polio, Influenza.',
      },
    ],
  },

  // ========== COLOMBIA -> USA ==========
  {
    nationality: 'Colombia',
    destinationCountry: 'USA',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_REQUIRED',
    summary: 'Colombian ordinary passport holders require a B1/B2 visa for tourism/business travel to the USA.',
    details: [
      'DS-160 form must be completed online',
      'In-person interview at US Embassy required',
      'Proof of ties to home country',
      'Bank statements (last 6 months)',
      'Return ticket and proof of accommodation',
    ],
    fee: '$185 USD (MRV fee)',
    processingTime: '3-5 weeks (interview wait varies)',
    maxStayDays: 180,
    passportValidityMonths: 6,
    visaType: 'B1/B2 Tourist/Business Visa',
    officialSources: [
      { title: 'US Department of State - Visas', url: 'https://travel.state.gov/content/travel/en/us-visas.html' },
      { title: 'US Embassy Colombia', url: 'https://co.usembassy.gov/visas/' },
    ],
    lastUpdatedISO: '2024-06-15',
  },

  // ========== COLOMBIA -> SPAIN ==========
  {
    nationality: 'Colombia',
    destinationCountry: 'Spain',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_NOT_REQUIRED',
    summary: 'Colombian passport holders can visit Spain (Schengen zone) visa-free for up to 90 days within a 180-day period.',
    details: [
      'No visa needed for stays up to 90 days',
      'Travel insurance required (min 30,000 EUR coverage)',
      'Return ticket required',
      'Proof of accommodation',
      'Proof of sufficient funds (~65 EUR/day)',
      'ETIAS authorization may be required from 2025',
    ],
    fee: 'Free',
    processingTime: 'N/A - Visa free',
    maxStayDays: 90,
    passportValidityMonths: 3,
    officialSources: [
      { title: 'Spain Foreign Affairs', url: 'https://www.exteriores.gob.es/en/ServiciosAlCiudadano/Paginas/Visados.aspx' },
      { title: 'EU Schengen Visa Info', url: 'https://www.consilium.europa.eu/en/policies/schengen-area/' },
    ],
    lastUpdatedISO: '2024-06-15',
  },

  // ========== COLOMBIA -> MEXICO ==========
  {
    nationality: 'Colombia',
    destinationCountry: 'Mexico',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_NOT_REQUIRED',
    summary: 'Colombian citizens can enter Mexico visa-free for tourism up to 180 days.',
    details: ['No visa needed', 'FMM migration form (on arrival)', 'Return ticket', 'Proof of funds'],
    fee: 'Free',
    processingTime: 'N/A - Visa free',
    maxStayDays: 180,
    passportValidityMonths: 6,
    officialSources: [{ title: 'Mexico INM', url: 'https://www.inm.gob.mx/' }],
    lastUpdatedISO: '2024-06-15',
  },

  // ========== USA -> JAPAN ==========
  {
    nationality: 'USA',
    destinationCountry: 'Japan',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_NOT_REQUIRED',
    summary: 'US passport holders can enter Japan visa-free for tourism up to 90 days.',
    details: ['No visa needed', 'Return or onward ticket required', 'Passport valid for duration of stay'],
    fee: 'Free',
    processingTime: 'N/A - Visa free',
    maxStayDays: 90,
    passportValidityMonths: 6,
    officialSources: [{ title: 'Japan MOFA - Visa Info', url: 'https://www.mofa.go.jp/j_info/visit/visa/index.html' }],
    lastUpdatedISO: '2024-06-15',
    healthRequirements: [
      {
        id: 'hr-usa-jp-1',
        type: 'vaccine',
        name: 'Japanese Encephalitis',
        status: 'recommended',
        description: 'Recommended for travelers spending extended time in rural areas, especially during summer months.',
        officialSource: { title: 'CDC - Japanese Encephalitis', url: 'https://wwwnc.cdc.gov/travel/diseases/japanese-encephalitis' },
      },
      {
        id: 'hr-usa-jp-2',
        type: 'vaccine',
        name: 'Routine Vaccines',
        status: 'recommended',
        description: 'Ensure routine vaccines are up to date: MMR, DTP, Varicella, Polio, Influenza.',
        officialSource: { title: 'CDC - Japan Travel Health', url: 'https://wwwnc.cdc.gov/travel/destinations/traveler/none/japan' },
      },
    ],
  },

  // ========== USA -> SPAIN ==========
  {
    nationality: 'USA',
    destinationCountry: 'Spain',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_NOT_REQUIRED',
    summary: 'US passport holders can visit Spain (Schengen zone) visa-free for up to 90 days.',
    details: ['No visa needed', 'Return ticket required', 'ETIAS may be required from 2025'],
    fee: 'Free',
    processingTime: 'N/A - Visa free',
    maxStayDays: 90,
    passportValidityMonths: 3,
    officialSources: [{ title: 'Spain Foreign Affairs', url: 'https://www.exteriores.gob.es/en/ServiciosAlCiudadano/Paginas/Visados.aspx' }],
    lastUpdatedISO: '2024-06-15',
  },

  // ========== USA -> MEXICO ==========
  {
    nationality: 'USA',
    destinationCountry: 'Mexico',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_NOT_REQUIRED',
    summary: 'US passport holders can enter Mexico visa-free for tourism up to 180 days.',
    details: ['No visa needed', 'FMM migration form (on arrival or online)'],
    fee: 'Free',
    processingTime: 'N/A - Visa free',
    maxStayDays: 180,
    passportValidityMonths: 6,
    officialSources: [{ title: 'Mexico INM', url: 'https://www.inm.gob.mx/' }],
    lastUpdatedISO: '2024-06-15',
  },

  // ========== MEXICO -> JAPAN ==========
  {
    nationality: 'Mexico',
    destinationCountry: 'Japan',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_NOT_REQUIRED',
    summary: 'Mexican passport holders can enter Japan visa-free for tourism up to 90 days.',
    details: ['No visa needed', 'Return ticket required', 'Proof of accommodation'],
    fee: 'Free',
    processingTime: 'N/A - Visa free',
    maxStayDays: 90,
    passportValidityMonths: 6,
    officialSources: [{ title: 'Japan MOFA - Visa Info', url: 'https://www.mofa.go.jp/j_info/visit/visa/index.html' }],
    lastUpdatedISO: '2024-06-15',
  },

  // ========== MEXICO -> USA ==========
  {
    nationality: 'Mexico',
    destinationCountry: 'USA',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_REQUIRED',
    summary: 'Mexican passport holders require a B1/B2 visa for travel to the USA.',
    details: ['DS-160 form online', 'Interview at US Embassy', 'Proof of ties to Mexico', 'Bank statements', 'Return ticket'],
    fee: '$185 USD',
    processingTime: '2-4 weeks',
    maxStayDays: 180,
    passportValidityMonths: 6,
    visaType: 'B1/B2 Tourist/Business Visa',
    officialSources: [{ title: 'US Department of State - Visas', url: 'https://travel.state.gov/content/travel/en/us-visas.html' }],
    lastUpdatedISO: '2024-06-15',
  },

  // ========== MEXICO -> SPAIN ==========
  {
    nationality: 'Mexico',
    destinationCountry: 'Spain',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_NOT_REQUIRED',
    summary: 'Mexican passport holders can visit Spain (Schengen) visa-free for up to 90 days.',
    details: ['No visa needed', 'Return ticket required', 'Proof of accommodation and funds'],
    fee: 'Free',
    processingTime: 'N/A - Visa free',
    maxStayDays: 90,
    passportValidityMonths: 3,
    officialSources: [{ title: 'Spain Foreign Affairs', url: 'https://www.exteriores.gob.es/en/ServiciosAlCiudadano/Paginas/Visados.aspx' }],
    lastUpdatedISO: '2024-06-15',
  },

  // ========== SPAIN -> JAPAN ==========
  {
    nationality: 'Spain',
    destinationCountry: 'Japan',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_NOT_REQUIRED',
    summary: 'Spanish passport holders can enter Japan visa-free for tourism up to 90 days.',
    details: ['No visa needed', 'Return ticket required'],
    fee: 'Free',
    processingTime: 'N/A - Visa free',
    maxStayDays: 90,
    passportValidityMonths: 6,
    officialSources: [{ title: 'Japan MOFA - Visa Info', url: 'https://www.mofa.go.jp/j_info/visit/visa/index.html' }],
    lastUpdatedISO: '2024-06-15',
  },

  // ========== SPAIN -> USA ==========
  {
    nationality: 'Spain',
    destinationCountry: 'USA',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_FREE_BUT_REQUIRED',
    summary: 'Spain is part of the Visa Waiver Program. ESTA authorization is required but no traditional visa needed.',
    details: ['ESTA must be approved before travel', 'Valid e-passport required', 'Return ticket required', 'ESTA valid for 2 years'],
    fee: '$21 USD (ESTA fee)',
    processingTime: 'Usually approved within 72 hours',
    maxStayDays: 90,
    passportValidityMonths: 6,
    visaType: 'ESTA (Electronic System for Travel Authorization)',
    officialSources: [
      { title: 'ESTA Official Site', url: 'https://esta.cbp.dhs.gov/' },
      { title: 'US State Dept - VWP', url: 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html' },
    ],
    lastUpdatedISO: '2024-06-15',
    notes: 'Spain is part of the Visa Waiver Program (VWP). ESTA is not a visa but an authorization.',
  },

  // ========== SPAIN -> MEXICO ==========
  {
    nationality: 'Spain',
    destinationCountry: 'Mexico',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_NOT_REQUIRED',
    summary: 'Spanish passport holders can enter Mexico visa-free for up to 180 days.',
    details: ['No visa needed', 'FMM migration form required'],
    fee: 'Free',
    processingTime: 'N/A - Visa free',
    maxStayDays: 180,
    passportValidityMonths: 6,
    officialSources: [{ title: 'Mexico INM', url: 'https://www.inm.gob.mx/' }],
    lastUpdatedISO: '2024-06-15',
  },

  // ========== UK -> USA ==========
  {
    nationality: 'UK',
    destinationCountry: 'USA',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_FREE_BUT_REQUIRED',
    summary: 'UK is part of the Visa Waiver Program. ESTA authorization is required but no traditional visa needed.',
    details: [
      'ESTA must be approved before travel',
      'Valid e-passport required',
      'Return or onward ticket required',
      'ESTA valid for 2 years or until passport expires',
      'Maximum stay of 90 days per visit',
    ],
    fee: '$21 USD (ESTA fee)',
    processingTime: 'Usually approved within 72 hours',
    maxStayDays: 90,
    passportValidityMonths: 6,
    visaType: 'ESTA (Electronic System for Travel Authorization)',
    officialSources: [
      { title: 'ESTA Official Site', url: 'https://esta.cbp.dhs.gov/' },
      { title: 'US State Dept - VWP', url: 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html' },
    ],
    lastUpdatedISO: '2024-06-15',
    notes: 'UK is part of the Visa Waiver Program (VWP). ESTA is not a visa but an electronic travel authorization.',
  },

  // ========== UK -> JAPAN ==========
  {
    nationality: 'UK',
    destinationCountry: 'Japan',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_NOT_REQUIRED',
    summary: 'UK passport holders can enter Japan visa-free for tourism up to 90 days.',
    details: [
      'No visa needed for stays up to 90 days',
      'Return or onward ticket required',
      'Passport valid for duration of stay',
      'Proof of sufficient funds may be requested',
    ],
    fee: 'Free',
    processingTime: 'N/A - Visa free',
    maxStayDays: 90,
    passportValidityMonths: 6,
    officialSources: [
      { title: 'Japan MOFA - Visa Info', url: 'https://www.mofa.go.jp/j_info/visit/visa/index.html' },
      { title: 'Embassy of Japan in the UK', url: 'https://www.uk.emb-japan.go.jp/itprtop_en/index.html' },
    ],
    lastUpdatedISO: '2024-06-15',
  },

  // ========== GERMANY -> USA ==========
  {
    nationality: 'Germany',
    destinationCountry: 'USA',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_FREE_BUT_REQUIRED',
    summary: 'Germany is part of the Visa Waiver Program. ESTA authorization is required but no traditional visa needed.',
    details: [
      'ESTA must be approved before travel',
      'Valid e-passport required',
      'Return or onward ticket required',
      'ESTA valid for 2 years or until passport expires',
      'Maximum stay of 90 days per visit',
    ],
    fee: '$21 USD (ESTA fee)',
    processingTime: 'Usually approved within 72 hours',
    maxStayDays: 90,
    passportValidityMonths: 6,
    visaType: 'ESTA (Electronic System for Travel Authorization)',
    officialSources: [
      { title: 'ESTA Official Site', url: 'https://esta.cbp.dhs.gov/' },
      { title: 'US Embassy Germany', url: 'https://de.usembassy.gov/visas/' },
    ],
    lastUpdatedISO: '2024-06-15',
    notes: 'Germany is part of the Visa Waiver Program (VWP). ESTA is not a visa but an electronic travel authorization.',
  },

  // ========== GERMANY -> JAPAN ==========
  {
    nationality: 'Germany',
    destinationCountry: 'Japan',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_NOT_REQUIRED',
    summary: 'German passport holders can enter Japan visa-free for tourism up to 90 days.',
    details: [
      'No visa needed for stays up to 90 days',
      'Return or onward ticket required',
      'Passport valid for duration of stay',
      'Proof of sufficient funds may be requested',
    ],
    fee: 'Free',
    processingTime: 'N/A - Visa free',
    maxStayDays: 90,
    passportValidityMonths: 6,
    officialSources: [
      { title: 'Japan MOFA - Visa Info', url: 'https://www.mofa.go.jp/j_info/visit/visa/index.html' },
      { title: 'Embassy of Japan in Germany', url: 'https://www.de.emb-japan.go.jp/itprtop_en/index.html' },
    ],
    lastUpdatedISO: '2024-06-15',
  },

  // ========== FRANCE -> USA ==========
  {
    nationality: 'France',
    destinationCountry: 'USA',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_FREE_BUT_REQUIRED',
    summary: 'France is part of the Visa Waiver Program. ESTA authorization is required but no traditional visa needed.',
    details: [
      'ESTA must be approved before travel',
      'Valid e-passport required',
      'Return or onward ticket required',
      'ESTA valid for 2 years or until passport expires',
      'Maximum stay of 90 days per visit',
    ],
    fee: '$21 USD (ESTA fee)',
    processingTime: 'Usually approved within 72 hours',
    maxStayDays: 90,
    passportValidityMonths: 6,
    visaType: 'ESTA (Electronic System for Travel Authorization)',
    officialSources: [
      { title: 'ESTA Official Site', url: 'https://esta.cbp.dhs.gov/' },
      { title: 'US Embassy France', url: 'https://fr.usembassy.gov/visas/' },
    ],
    lastUpdatedISO: '2024-06-15',
    notes: 'France is part of the Visa Waiver Program (VWP). ESTA is not a visa but an electronic travel authorization.',
  },

  // ========== FRANCE -> JAPAN ==========
  {
    nationality: 'France',
    destinationCountry: 'Japan',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_NOT_REQUIRED',
    summary: 'French passport holders can enter Japan visa-free for tourism up to 90 days.',
    details: [
      'No visa needed for stays up to 90 days',
      'Return or onward ticket required',
      'Passport valid for duration of stay',
      'Proof of sufficient funds may be requested',
    ],
    fee: 'Free',
    processingTime: 'N/A - Visa free',
    maxStayDays: 90,
    passportValidityMonths: 6,
    officialSources: [
      { title: 'Japan MOFA - Visa Info', url: 'https://www.mofa.go.jp/j_info/visit/visa/index.html' },
      { title: 'Embassy of Japan in France', url: 'https://www.fr.emb-japan.go.jp/itprtop_en/index.html' },
    ],
    lastUpdatedISO: '2024-06-15',
  },

  // ========== BRAZIL -> USA ==========
  {
    nationality: 'Brazil',
    destinationCountry: 'USA',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_REQUIRED',
    summary: 'Brazilian passport holders require a B1/B2 visa for tourism/business travel to the USA.',
    details: [
      'DS-160 form must be completed online',
      'In-person interview at US Embassy/Consulate required',
      'Proof of ties to home country',
      'Bank statements (last 6 months)',
      'Return ticket and proof of accommodation',
      'Visa fee is non-refundable',
    ],
    fee: '$185 USD (MRV fee)',
    processingTime: '3-5 weeks (interview wait varies)',
    maxStayDays: 180,
    passportValidityMonths: 6,
    visaType: 'B1/B2 Tourist/Business Visa',
    officialSources: [
      { title: 'US Department of State - Visas', url: 'https://travel.state.gov/content/travel/en/us-visas.html' },
      { title: 'US Embassy Brazil', url: 'https://br.usembassy.gov/visas/' },
    ],
    lastUpdatedISO: '2024-06-15',
    healthRequirements: [
      {
        id: 'hr-br-usa-1',
        type: 'vaccine',
        name: 'Yellow Fever',
        status: 'recommended',
        description: 'Not required for USA entry, but recommended if traveling from endemic areas of Brazil. Carry vaccination certificate.',
        officialSource: { title: 'CDC - Yellow Fever', url: 'https://wwwnc.cdc.gov/travel/diseases/yellow-fever' },
      },
      {
        id: 'hr-br-usa-2',
        type: 'vaccine',
        name: 'Routine Vaccines',
        status: 'recommended',
        description: 'Ensure routine vaccines are up to date: MMR, DTP, Varicella, Polio, Influenza.',
      },
    ],
  },

  // ========== BRAZIL -> JAPAN ==========
  {
    nationality: 'Brazil',
    destinationCountry: 'Japan',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_REQUIRED',
    summary: 'Brazilian passport holders require a tourist visa to enter Japan.',
    details: [
      'Visa application at Japanese Embassy/Consulate required',
      'Valid passport with at least 6 months validity',
      'Completed visa application form',
      'Passport-size photo',
      'Proof of accommodation and itinerary',
      'Proof of sufficient funds',
      'Return or onward ticket',
    ],
    fee: 'Varies (consult embassy)',
    processingTime: '2-4 weeks',
    maxStayDays: 90,
    passportValidityMonths: 6,
    visaType: 'Tourist Visa',
    officialSources: [
      { title: 'Japan MOFA - Visa Info', url: 'https://www.mofa.go.jp/j_info/visit/visa/index.html' },
      { title: 'Embassy of Japan in Brazil', url: 'https://www.br.emb-japan.go.jp/itprtop_pt/index.html' },
    ],
    lastUpdatedISO: '2024-06-15',
    healthRequirements: [
      {
        id: 'hr-br-jp-1',
        type: 'vaccine',
        name: 'Yellow Fever',
        status: 'required',
        description: 'Yellow fever vaccination certificate required for travelers from Brazil (endemic area). Must be vaccinated at least 10 days before arrival.',
        officialSource: { title: 'WHO - Yellow Fever', url: 'https://www.who.int/health-topics/yellow-fever' },
      },
      {
        id: 'hr-br-jp-2',
        type: 'vaccine',
        name: 'Japanese Encephalitis',
        status: 'recommended',
        description: 'Recommended for travelers spending extended time in rural areas, especially during summer months.',
        officialSource: { title: 'CDC - Japanese Encephalitis', url: 'https://wwwnc.cdc.gov/travel/diseases/japanese-encephalitis' },
      },
      {
        id: 'hr-br-jp-3',
        type: 'vaccine',
        name: 'Routine Vaccines',
        status: 'recommended',
        description: 'Ensure routine vaccines are up to date: MMR, DTP, Varicella, Polio, Influenza.',
      },
    ],
  },

  // ========== INDIA -> USA ==========
  {
    nationality: 'India',
    destinationCountry: 'USA',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_REQUIRED',
    summary: 'Indian passport holders require a B1/B2 visa for tourism/business travel to the USA.',
    details: [
      'DS-160 form must be completed online',
      'In-person interview at US Embassy/Consulate required',
      'Proof of ties to home country',
      'Bank statements (last 6 months)',
      'Return ticket and proof of accommodation',
      'Visa fee is non-refundable',
      'Interview wait times can be significant',
    ],
    fee: '$185 USD (MRV fee)',
    processingTime: '3-8 weeks (interview wait varies)',
    maxStayDays: 180,
    passportValidityMonths: 6,
    visaType: 'B1/B2 Tourist/Business Visa',
    officialSources: [
      { title: 'US Department of State - Visas', url: 'https://travel.state.gov/content/travel/en/us-visas.html' },
      { title: 'US Embassy India', url: 'https://in.usembassy.gov/visas/' },
    ],
    lastUpdatedISO: '2024-06-15',
    healthRequirements: [
      {
        id: 'hr-in-usa-1',
        type: 'vaccine',
        name: 'Routine Vaccines',
        status: 'recommended',
        description: 'Ensure routine vaccines are up to date: MMR, DTP, Varicella, Polio, Influenza.',
      },
      {
        id: 'hr-in-usa-2',
        type: 'vaccine',
        name: 'COVID-19',
        status: 'recommended',
        description: 'COVID-19 vaccination recommended. Check current US entry requirements as policies may change.',
        officialSource: { title: 'CDC - COVID-19 Travel', url: 'https://www.cdc.gov/coronavirus/2019-ncov/travelers/index.html' },
      },
    ],
  },

  // ========== INDIA -> JAPAN ==========
  {
    nationality: 'India',
    destinationCountry: 'Japan',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_REQUIRED',
    summary: 'Indian passport holders require a tourist visa to enter Japan.',
    details: [
      'Visa application at Japanese Embassy/Consulate required',
      'Valid passport with at least 6 months validity',
      'Completed visa application form',
      'Passport-size photo',
      'Proof of accommodation and itinerary',
      'Proof of sufficient funds',
      'Return or onward ticket',
      'Stay duration depends on visa granted (15, 30, or 90 days)',
    ],
    fee: 'Varies (consult embassy)',
    processingTime: '5-10 business days',
    maxStayDays: 90,
    passportValidityMonths: 6,
    visaType: 'Tourist Visa',
    officialSources: [
      { title: 'Japan MOFA - Visa Info', url: 'https://www.mofa.go.jp/j_info/visit/visa/index.html' },
      { title: 'Embassy of Japan in India', url: 'https://www.in.emb-japan.go.jp/itprtop_en/index.html' },
    ],
    lastUpdatedISO: '2024-06-15',
    notes: 'Maximum stay depends on visa type granted: 15, 30, or 90 days.',
    healthRequirements: [
      {
        id: 'hr-in-jp-1',
        type: 'vaccine',
        name: 'Japanese Encephalitis',
        status: 'recommended',
        description: 'Recommended for travelers spending extended time in rural areas, especially during summer months.',
        officialSource: { title: 'CDC - Japanese Encephalitis', url: 'https://wwwnc.cdc.gov/travel/diseases/japanese-encephalitis' },
      },
      {
        id: 'hr-in-jp-2',
        type: 'vaccine',
        name: 'Routine Vaccines',
        status: 'recommended',
        description: 'Ensure routine vaccines are up to date: MMR, DTP, Varicella, Polio, Influenza.',
        officialSource: { title: 'CDC - Japan Travel Health', url: 'https://wwwnc.cdc.gov/travel/destinations/traveler/none/japan' },
      },
    ],
  },

  // ========== CHINA -> USA ==========
  {
    nationality: 'China',
    destinationCountry: 'USA',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_REQUIRED',
    summary: 'Chinese passport holders require a B1/B2 visa for tourism/business travel to the USA.',
    details: [
      'DS-160 form must be completed online',
      'In-person interview at US Embassy/Consulate required',
      'Proof of ties to home country',
      'Bank statements (last 6 months)',
      'Return ticket and proof of accommodation',
      'Visa fee is non-refundable',
      'B1/B2 visa may be granted for 10 years (multiple entry)',
    ],
    fee: '$185 USD (MRV fee)',
    processingTime: '3-5 weeks (interview wait varies)',
    maxStayDays: 180,
    passportValidityMonths: 6,
    visaType: 'B1/B2 Tourist/Business Visa',
    officialSources: [
      { title: 'US Department of State - Visas', url: 'https://travel.state.gov/content/travel/en/us-visas.html' },
      { title: 'US Embassy China', url: 'https://china.usembassy-china.org.cn/visas/' },
    ],
    lastUpdatedISO: '2024-06-15',
  },

  // ========== CHINA -> JAPAN ==========
  {
    nationality: 'China',
    destinationCountry: 'Japan',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_REQUIRED',
    summary: 'Chinese passport holders require a tourist visa to enter Japan.',
    details: [
      'Visa application at Japanese Embassy/Consulate required',
      'Valid passport with at least 6 months validity',
      'Completed visa application form',
      'Passport-size photo',
      'Proof of accommodation and itinerary',
      'Proof of sufficient funds (income/tax certificates)',
      'Return or onward ticket',
      'Stay duration depends on visa granted (15 or 30 days)',
    ],
    fee: 'Varies (consult embassy)',
    processingTime: '5-10 business days',
    maxStayDays: 30,
    passportValidityMonths: 6,
    visaType: 'Tourist Visa',
    officialSources: [
      { title: 'Japan MOFA - Visa Info', url: 'https://www.mofa.go.jp/j_info/visit/visa/index.html' },
      { title: 'Embassy of Japan in China', url: 'https://www.cn.emb-japan.go.jp/itprtop_en/index.html' },
    ],
    lastUpdatedISO: '2024-06-15',
    notes: 'Maximum stay depends on visa type granted: 15 or 30 days for single-entry tourist visa.',
  },

  // ========== CANADA -> USA ==========
  {
    nationality: 'Canada',
    destinationCountry: 'USA',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_NOT_REQUIRED',
    summary: 'Canadian passport holders can enter the USA visa-free for tourism up to 180 days.',
    details: [
      'No visa or ESTA needed for Canadian citizens',
      'Valid Canadian passport required',
      'Return or onward ticket may be requested',
      'Proof of sufficient funds may be requested',
      'Entry granted at discretion of CBP officer',
    ],
    fee: 'Free',
    processingTime: 'N/A - Visa free',
    maxStayDays: 180,
    passportValidityMonths: 6,
    officialSources: [
      { title: 'US CBP - Canadian Travelers', url: 'https://www.cbp.gov/travel/canadian-and-mexican-citizens' },
      { title: 'US Department of State - Visas', url: 'https://travel.state.gov/content/travel/en/us-visas.html' },
    ],
    lastUpdatedISO: '2024-06-15',
  },

  // ========== CANADA -> JAPAN ==========
  {
    nationality: 'Canada',
    destinationCountry: 'Japan',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_NOT_REQUIRED',
    summary: 'Canadian passport holders can enter Japan visa-free for tourism up to 90 days.',
    details: [
      'No visa needed for stays up to 90 days',
      'Return or onward ticket required',
      'Passport valid for duration of stay',
      'Proof of sufficient funds may be requested',
    ],
    fee: 'Free',
    processingTime: 'N/A - Visa free',
    maxStayDays: 90,
    passportValidityMonths: 6,
    officialSources: [
      { title: 'Japan MOFA - Visa Info', url: 'https://www.mofa.go.jp/j_info/visit/visa/index.html' },
      { title: 'Embassy of Japan in Canada', url: 'https://www.ca.emb-japan.go.jp/itprtop_en/index.html' },
    ],
    lastUpdatedISO: '2024-06-15',
  },

  // ========== AUSTRALIA -> USA ==========
  {
    nationality: 'Australia',
    destinationCountry: 'USA',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_FREE_BUT_REQUIRED',
    summary: 'Australia is part of the Visa Waiver Program. ESTA authorization is required but no traditional visa needed.',
    details: [
      'ESTA must be approved before travel',
      'Valid e-passport required',
      'Return or onward ticket required',
      'ESTA valid for 2 years or until passport expires',
      'Maximum stay of 90 days per visit',
    ],
    fee: '$21 USD (ESTA fee)',
    processingTime: 'Usually approved within 72 hours',
    maxStayDays: 90,
    passportValidityMonths: 6,
    visaType: 'ESTA (Electronic System for Travel Authorization)',
    officialSources: [
      { title: 'ESTA Official Site', url: 'https://esta.cbp.dhs.gov/' },
      { title: 'US Embassy Australia', url: 'https://au.usembassy.gov/visas/' },
    ],
    lastUpdatedISO: '2024-06-15',
    notes: 'Australia is part of the Visa Waiver Program (VWP). ESTA is not a visa but an electronic travel authorization.',
  },

  // ========== AUSTRALIA -> JAPAN ==========
  {
    nationality: 'Australia',
    destinationCountry: 'Japan',
    passportType: 'ordinary',
    purpose: 'tourism',
    status: 'VISA_NOT_REQUIRED',
    summary: 'Australian passport holders can enter Japan visa-free for tourism up to 90 days.',
    details: [
      'No visa needed for stays up to 90 days',
      'Return or onward ticket required',
      'Passport valid for duration of stay',
      'Proof of sufficient funds may be requested',
    ],
    fee: 'Free',
    processingTime: 'N/A - Visa free',
    maxStayDays: 90,
    passportValidityMonths: 6,
    officialSources: [
      { title: 'Japan MOFA - Visa Info', url: 'https://www.mofa.go.jp/j_info/visit/visa/index.html' },
      { title: 'Embassy of Japan in Australia', url: 'https://www.au.emb-japan.go.jp/itprtop_en/index.html' },
    ],
    lastUpdatedISO: '2024-06-15',
  },
];

/** Get entry requirements for a specific combination */
export const getEntryRequirements = (
  nationality: string,
  destinationCountry: string,
  purpose: TripPurpose = 'tourism',
  passportType: PassportType = 'ordinary'
): EntryRequirement | null => {
  return REQUIREMENTS.find(
    r =>
      r.nationality.toLowerCase() === nationality.toLowerCase() &&
      r.destinationCountry.toLowerCase() === destinationCountry.toLowerCase() &&
      r.purpose === purpose &&
      r.passportType === passportType
  ) || null;
};

/** Get semaphore color for an entry status */
export const getEntryStatusColor = (status: EntryStatus): EntryStatusColor => {
  return ENTRY_STATUS_COLORS[status];
};

/** Get all destination countries */
export const getAvailableDestinations = (): string[] => {
  return Array.from(new Set(REQUIREMENTS.map(r => r.destinationCountry))).sort();
};

/** Get all passport countries */
export const getAvailablePassportCountries = (): string[] => {
  return Array.from(new Set(REQUIREMENTS.map(r => r.nationality))).sort();
};

/** Check if combination exists */
export const hasRequirements = (nationality: string, destinationCountry: string): boolean => {
  return REQUIREMENTS.some(
    r => r.nationality.toLowerCase() === nationality.toLowerCase() &&
      r.destinationCountry.toLowerCase() === destinationCountry.toLowerCase()
  );
};

/** Map EntryStatus to color (for testing) */
export const mapEntryStatusToColor = (status: EntryStatus): EntryStatusColor => {
  return ENTRY_STATUS_COLORS[status];
};
