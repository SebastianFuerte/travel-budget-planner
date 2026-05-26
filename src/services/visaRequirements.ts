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
        status: 'recommended',
        description: 'Japan does not require yellow fever certificate for Colombian travelers unless you are transiting through a yellow fever endemic country. However, it is recommended to consult your doctor before travel.',
        officialSource: { title: 'WHO - Yellow Fever', url: 'https://www.who.int/health-topics/yellow-fever' },
      },
      {
        id: 'hr-col-jp-2',
        type: 'vaccine',
        name: 'Japanese Encephalitis',
        status: 'recommended',
        description: 'Recommended (not legally required) for travelers spending extended time in rural areas of Japan, especially during summer months (June–September). Short urban trips carry minimal risk.',
        officialSource: { title: 'CDC - Japanese Encephalitis', url: 'https://wwwnc.cdc.gov/travel/diseases/japanese-encephalitis' },
      },
      {
        id: 'hr-col-jp-3',
        type: 'vaccine',
        name: 'Routine Vaccines',
        status: 'recommended',
        description: 'Not legally required, but strongly recommended. Ensure routine vaccines are up to date before travel: MMR, DTP, Varicella, Polio, Influenza.',
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
        description: 'Not legally required. Ensure routine vaccines are up to date before travel: MMR, DTP, Varicella, Polio, Influenza.',
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
        description: 'Not legally required. Recommended for travelers spending extended time in rural areas of Japan, especially during summer months (June–September). Low risk for short urban trips.',
        officialSource: { title: 'CDC - Japanese Encephalitis', url: 'https://wwwnc.cdc.gov/travel/diseases/japanese-encephalitis' },
      },
      {
        id: 'hr-usa-jp-2',
        type: 'vaccine',
        name: 'Routine Vaccines',
        status: 'recommended',
        description: 'Not legally required. Ensure routine vaccines are up to date before travel: MMR, DTP, Varicella, Polio, Influenza.',
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
        description: 'Not required by the USA for entry. Recommended if you are traveling from or through yellow fever endemic areas of Brazil. It is good practice to carry your vaccination certificate regardless.',
        officialSource: { title: 'CDC - Yellow Fever', url: 'https://wwwnc.cdc.gov/travel/diseases/yellow-fever' },
      },
      {
        id: 'hr-br-usa-2',
        type: 'vaccine',
        name: 'Routine Vaccines',
        status: 'recommended',
        description: 'Not legally required. Ensure routine vaccines are up to date before travel: MMR, DTP, Varicella, Polio, Influenza.',
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
        description: 'Legally required by Japan for travelers arriving from or transiting through yellow fever endemic countries, including Brazil. Must be vaccinated at least 10 days before arrival. Carry the International Certificate of Vaccination (Carte Jaune).',
        officialSource: { title: 'WHO - Yellow Fever', url: 'https://www.who.int/health-topics/yellow-fever' },
      },
      {
        id: 'hr-br-jp-2',
        type: 'vaccine',
        name: 'Japanese Encephalitis',
        status: 'recommended',
        description: 'Not legally required. Recommended for travelers spending extended time in rural areas of Japan, especially during summer months (June–September). Low risk for short urban trips.',
        officialSource: { title: 'CDC - Japanese Encephalitis', url: 'https://wwwnc.cdc.gov/travel/diseases/japanese-encephalitis' },
      },
      {
        id: 'hr-br-jp-3',
        type: 'vaccine',
        name: 'Routine Vaccines',
        status: 'recommended',
        description: 'Not legally required. Ensure routine vaccines are up to date before travel: MMR, DTP, Varicella, Polio, Influenza.',
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
        description: 'Not legally required. Ensure routine vaccines are up to date before travel: MMR, DTP, Varicella, Polio, Influenza.',
      },
      {
        id: 'hr-in-usa-2',
        type: 'vaccine',
        name: 'COVID-19',
        status: 'not_required',
        description: 'COVID-19 vaccination is no longer required for entry to the USA as of May 2023. Vaccination is still personally recommended. Check official sources for any future policy changes.',
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
        description: 'Not legally required. Recommended for travelers from India spending extended time in rural areas of Japan, especially during summer months (June–September). Low risk for short urban trips.',
        officialSource: { title: 'CDC - Japanese Encephalitis', url: 'https://wwwnc.cdc.gov/travel/diseases/japanese-encephalitis' },
      },
      {
        id: 'hr-in-jp-2',
        type: 'vaccine',
        name: 'Routine Vaccines',
        status: 'recommended',
        description: 'Not legally required. Ensure routine vaccines are up to date before travel: MMR, DTP, Varicella, Polio, Influenza.',
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

// ─────────────────────────────────────────────────────────────────────────────
// QUICK LOOKUP TABLE
// Covers 200+ combinations. status + basic info. No health details.
// Sources: IATA Travel Centre, Henley Passport Index, official embassy sites.
// ─────────────────────────────────────────────────────────────────────────────

interface QuickEntry {
  from: string;
  to: string;
  status: EntryStatus;
  summary: string;
  visaType?: string;
  fee: string;
  maxDays?: number;
  processingTime: string;
  passportValidityMonths: number;
  details: string[];
  sourceUrl: string;
  sourceLabel: string;
  lastUpdatedISO: string;
}

const QUICK: QuickEntry[] = [
  // ── COLOMBIA ──────────────────────────────────────────────────────────────
  { from:'Colombia', to:'Argentina',         status:'VISA_NOT_REQUIRED',           summary:'Colombian passport holders can enter Argentina visa-free for up to 90 days.',                                        fee:'Free', maxDays:90,  processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Valid passport','Return ticket recommended'],            sourceUrl:'https://www.cancilleria.gob.ar/', sourceLabel:'Argentina Cancillería', lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Brazil',            status:'VISA_NOT_REQUIRED',           summary:'Colombian passport holders can enter Brazil visa-free for up to 90 days per year.',                                  fee:'Free', maxDays:90,  processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Valid passport','Return ticket recommended'],            sourceUrl:'https://www.gov.br/mre/pt-br',    sourceLabel:'Brazil Itamaraty',      lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Chile',             status:'VISA_NOT_REQUIRED',           summary:'Colombian passport holders can enter Chile visa-free for up to 90 days.',                                            fee:'Free', maxDays:90,  processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Valid passport'],                                        sourceUrl:'https://www.minrel.gob.cl/',      sourceLabel:'Chile Cancillería',     lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Peru',              status:'VISA_NOT_REQUIRED',           summary:'Colombian passport holders can enter Peru visa-free for up to 183 days.',                                            fee:'Free', maxDays:183, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Valid passport'],                                        sourceUrl:'https://www.rree.gob.pe/',        sourceLabel:'Peru Cancillería',       lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Ecuador',           status:'VISA_NOT_REQUIRED',           summary:'Colombian passport holders can enter Ecuador visa-free for up to 90 days.',                                          fee:'Free', maxDays:90,  processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Valid passport'],                                        sourceUrl:'https://www.cancilleria.gob.ec/', sourceLabel:'Ecuador Cancillería',   lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Panama',            status:'VISA_NOT_REQUIRED',           summary:'Colombian passport holders can enter Panama visa-free for up to 180 days.',                                          fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Return ticket','Proof of funds'],                      sourceUrl:'https://www.mire.gob.pa/',        sourceLabel:'Panama MIRE',           lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Costa Rica',        status:'VISA_NOT_REQUIRED',           summary:'Colombian passport holders can enter Costa Rica visa-free for up to 90 days.',                                       fee:'Free', maxDays:90,  processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Return ticket recommended'],                            sourceUrl:'https://www.rree.go.cr/',         sourceLabel:'Costa Rica MREC',       lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Dominican Republic',status:'VISA_NOT_REQUIRED',           summary:'Colombian passport holders can enter Dominican Republic visa-free. A tourist card (included in flight or ~$10) may be required.',fee:'~$10 tourist card', maxDays:30, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Tourist card may apply'],  sourceUrl:'https://www.godominicanrepublic.com/', sourceLabel:'Dominican Republic Tourism', lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Turkey',            status:'VISA_ON_ARRIVAL',             summary:'Colombian passport holders can obtain a visa on arrival or e-Visa for Turkey for up to 90 days.',                   fee:'~$50', maxDays:90,  processingTime:'On arrival', passportValidityMonths:6, details:['eVisa available online at evisa.gov.tr','Or visa on arrival','Passport valid 6+ months'],           sourceUrl:'https://www.evisa.gov.tr/',       sourceLabel:'Turkey eVisa',          lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Thailand',          status:'VISA_NOT_REQUIRED',           summary:'Colombian passport holders can enter Thailand visa-free for up to 30 days.',                                         fee:'Free', maxDays:30,  processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Return ticket required','Proof of funds recommended'],  sourceUrl:'https://www.thaiembassy.com/',    sourceLabel:'Thai Embassy',          lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Canada',            status:'VISA_REQUIRED',               summary:'Colombian citizens require a Temporary Resident Visa (TRV) to enter Canada for tourism.',                          fee:'CAD $185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Online or paper application via IRCC','Biometrics required ($85 CAD)','Bank statements, itinerary, ties to home country'], sourceUrl:'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html', sourceLabel:'IRCC Canada', lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'UK',                status:'EVISA_OR_ETA',                summary:'Colombian citizens require a UK Standard Visitor Visa. An ETA for visa-required nationals may apply from 2025.',  fee:'£115+', processingTime:'3+ weeks', passportValidityMonths:6, details:['Apply online via gov.uk/visas-immigration','Standard Visitor Visa required','Show proof of funds, accommodation, intent to leave'], sourceUrl:'https://www.gov.uk/visit-uk', sourceLabel:'UK Visas & Immigration', lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'France',            status:'VISA_REQUIRED',               summary:'Colombia is not in the Schengen Area. A Schengen Short-Stay Visa (C) is required for France.',                    fee:'€90',  processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at the French consulate or visa centre','Schengen visa covers all 27 Schengen states','Bank statements, insurance, itinerary required'], sourceUrl:'https://france-visas.gouv.fr/', sourceLabel:'France Visas', lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Germany',           status:'VISA_REQUIRED',               summary:'A Schengen Short-Stay Visa (C) is required for Germany. One visa covers all 27 Schengen states.',                 fee:'€90',  processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at German consulate or VFS Global','Schengen visa up to 90 days in 180-day period','Insurance, bank statements, accommodation required'], sourceUrl:'https://www.auswaertiges-amt.de/en', sourceLabel:'German Foreign Office', lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Italy',             status:'VISA_REQUIRED',               summary:'A Schengen Short-Stay Visa (C) is required for Italy. One visa covers all 27 Schengen states.',                   fee:'€90',  processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Italian consulate or VFS Global','Schengen visa up to 90 days in 180-day period'],         sourceUrl:'https://vistoperitalia.esteri.it/', sourceLabel:'Italy Visa Portal', lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Portugal',          status:'VISA_REQUIRED',               summary:'A Schengen Short-Stay Visa (C) is required for Portugal. One visa covers all 27 Schengen states.',                fee:'€90',  processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Portuguese consulate or VFS Global','Schengen visa up to 90 days in 180-day period'],       sourceUrl:'https://www.vistos.mne.gov.pt/', sourceLabel:'Portugal Visas', lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Netherlands',       status:'VISA_REQUIRED',               summary:'A Schengen Short-Stay Visa (C) is required for Netherlands. One visa covers all 27 Schengen states.',             fee:'€90',  processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Dutch embassy or VFS Global','Schengen visa up to 90 days in 180-day period'],           sourceUrl:'https://www.netherlandsworldwide.nl/', sourceLabel:'Netherlands Worldwide', lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'UAE',               status:'VISA_REQUIRED',               summary:'Colombian passport holders require a visa for the UAE (Dubai). Apply for a tourist visa online or on arrival.',    fee:'AED 350+', processingTime:'3-5 days', passportValidityMonths:6, details:['Apply via Emirates, Air Arabia, or UAE ICP portal','30 or 60-day tourist visa available','Hotel reservation and return ticket required'], sourceUrl:'https://icp.gov.ae/', sourceLabel:'UAE ICP Portal', lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Singapore',         status:'VISA_NOT_REQUIRED',           summary:'Colombian passport holders can enter Singapore visa-free for up to 30 days.',                                       fee:'Free', maxDays:30,  processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Return ticket required','Proof of sufficient funds'],                      sourceUrl:'https://www.ica.gov.sg/',         sourceLabel:'Singapore ICA',         lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'South Korea',       status:'VISA_NOT_REQUIRED',           summary:'Colombian passport holders can enter South Korea visa-free for up to 90 days (K-ETA may be required).',            fee:'Free (K-ETA ~$10)', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['K-ETA registration required at k-eta.go.kr (~$10)','Valid for 2 years','Return ticket required'], sourceUrl:'https://www.k-eta.go.kr/', sourceLabel:'Korea K-ETA', lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Australia',         status:'EVISA_OR_ETA',                summary:'Colombian citizens must apply for an eVisitor (subclass 651) or Tourist Visa (600) to enter Australia.',         fee:'Free (eVisitor) or AUD $195 (600)', processingTime:'Days to weeks', passportValidityMonths:6, details:['Apply via ImmiAccount (immi.homeaffairs.gov.au)','eVisitor: free, instant approval often','Multiple entries, up to 3 months per visit'], sourceUrl:'https://immi.homeaffairs.gov.au/', sourceLabel:'Australia Home Affairs', lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'New Zealand',       status:'EVISA_OR_ETA',                summary:'Colombian citizens require a New Zealand Electronic Travel Authority (NZeTA) before travel.',                     fee:'NZD $23', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply via NZeTA app or nzeta.immigration.govt.nz','Valid for 2 years or until passport expires'], sourceUrl:'https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/nzeta', sourceLabel:'NZ Immigration - NZeTA', lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'India',             status:'EVISA_OR_ETA',                summary:'Colombian citizens can apply for an India e-Visa (Tourist) online before travel.',                                fee:'$25-$80 depending on duration', processingTime:'2-4 days', passportValidityMonths:6, details:['Apply at indianvisaonline.gov.in','e-Tourist Visa: 30, 1-year or 5-year options','Double or triple entry allowed'], sourceUrl:'https://indianvisaonline.gov.in/', sourceLabel:'India eVisa Portal', lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Vietnam',           status:'EVISA_OR_ETA',                summary:'Colombian citizens can apply for a Vietnam e-Visa online for tourism.',                                            fee:'$25', maxDays:90,  processingTime:'3 business days', passportValidityMonths:6, details:['Apply at evisa.xuatnhapcanh.gov.vn','Single or multiple entry','90 days max stay'], sourceUrl:'https://evisa.xuatnhapcanh.gov.vn/', sourceLabel:'Vietnam eVisa', lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Egypt',             status:'VISA_ON_ARRIVAL',             summary:'Colombian passport holders can obtain a visa on arrival in Egypt for up to 30 days.',                              fee:'$25', maxDays:30,  processingTime:'On arrival', passportValidityMonths:6, details:['Visa on arrival at major airports','USD or EUR accepted','eVisa also available at visa2egypt.gov.eg'], sourceUrl:'https://visa2egypt.gov.eg/', sourceLabel:'Egypt eVisa', lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Morocco',           status:'VISA_NOT_REQUIRED',           summary:'Colombian passport holders can enter Morocco visa-free for up to 90 days.',                                        fee:'Free', maxDays:90,  processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Valid passport'],                                        sourceUrl:'https://www.diplomatie.ma/',       sourceLabel:'Morocco Diplomacy',     lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Cuba',              status:'VISA_NOT_REQUIRED',           summary:'Colombian citizens need a Tourist Card (tarjeta del turista) instead of a visa. Usually sold by airlines.',       fee:'~$25-50', maxDays:30, processingTime:'N/A', passportValidityMonths:6, details:['Tourist card purchased from airline or travel agency','Can be extended in Cuba'], sourceUrl:'https://www.cubadiplomatica.cu/', sourceLabel:'Cuba Diplomática', lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Bolivia',           status:'VISA_NOT_REQUIRED',           summary:'Colombian passport holders can enter Bolivia visa-free for up to 90 days.',                                        fee:'Free', maxDays:90,  processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Valid passport'],                                        sourceUrl:'https://www.cancilleria.gob.bo/', sourceLabel:'Bolivia Cancillería',   lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Uruguay',           status:'VISA_NOT_REQUIRED',           summary:'Colombian passport holders can enter Uruguay visa-free for up to 90 days.',                                        fee:'Free', maxDays:90,  processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Valid passport'],                                        sourceUrl:'https://www.mrree.gub.uy/',       sourceLabel:'Uruguay MRREE',         lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Venezuela',         status:'VISA_NOT_REQUIRED',           summary:'Colombian passport holders can enter Venezuela visa-free. Check current advisories before travel.',               fee:'Free', maxDays:90,  processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Check travel advisories - political situation may affect entry'], sourceUrl:'https://cancilleria.gob.ve/', sourceLabel:'Venezuela Cancillería', lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'Russia',            status:'VISA_REQUIRED',               summary:'Colombian citizens require a visa to enter Russia. Processing can take several weeks.',                            fee:'~$50-100', processingTime:'4+ weeks', passportValidityMonths:6, details:['Apply at Russian consulate','Invitation letter required','Travel advisories in effect — consult your foreign ministry'], sourceUrl:'https://visa.kdmid.ru/', sourceLabel:'Russia Consular Services', lastUpdatedISO:'2024-06-15' },
  { from:'Colombia', to:'China',             status:'VISA_REQUIRED',               summary:'Colombian citizens require a visa to enter China (mainland). Apply at Chinese consulate.',                        fee:'~$140', processingTime:'4 business days', passportValidityMonths:6, details:['Apply at Chinese consulate or CVASC','L (Tourist) visa for tourism','Invitation or hotel bookings required'], sourceUrl:'https://www.visaforchina.cn/', sourceLabel:'China Visa Application', lastUpdatedISO:'2024-06-15' },

  // ── USA ───────────────────────────────────────────────────────────────────
  { from:'USA', to:'Colombia',    status:'VISA_NOT_REQUIRED', summary:'US passport holders can enter Colombia visa-free for up to 90 days.',                                                 fee:'Free', maxDays:90,  processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Return ticket recommended','Proof of funds may be requested'], sourceUrl:'https://co.usembassy.gov/', sourceLabel:'US Embassy Colombia', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'UK',          status:'VISA_NOT_REQUIRED', summary:'US passport holders can enter the UK visa-free for up to 6 months. An ETA will be required from 2025.',              fee:'Free (ETA £10 from 2025)', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required currently','ETA (Electronic Travel Authorisation) required from early 2025','Return ticket recommended'], sourceUrl:'https://www.gov.uk/check-uk-visa', sourceLabel:'UK Visa Checker', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'France',      status:'VISA_NOT_REQUIRED', summary:'US passport holders can enter France (Schengen Area) visa-free for up to 90 days in any 180-day period. ETIAS required from late 2025.', fee:'Free (ETIAS €7 from 2025)', maxDays:90, processingTime:'N/A', passportValidityMonths:3, details:['No visa required','Up to 90 days in 180-day period across all Schengen countries','ETIAS registration required from late 2025 (~€7)'], sourceUrl:'https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/France.html', sourceLabel:'US State Dept - France', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'Germany',     status:'VISA_NOT_REQUIRED', summary:'US passport holders can enter Germany (Schengen) visa-free for up to 90 days. ETIAS required from late 2025.',     fee:'Free (ETIAS €7 from 2025)', maxDays:90, processingTime:'N/A', passportValidityMonths:3, details:['No visa required','90 days max in any 180-day period','ETIAS from late 2025'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'Italy',       status:'VISA_NOT_REQUIRED', summary:'US passport holders can enter Italy (Schengen) visa-free for up to 90 days.',                                       fee:'Free', maxDays:90,  processingTime:'N/A', passportValidityMonths:3, details:['No visa required','90 days in Schengen zone'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'Portugal',    status:'VISA_NOT_REQUIRED', summary:'US passport holders can enter Portugal (Schengen) visa-free for up to 90 days.',                                    fee:'Free', maxDays:90,  processingTime:'N/A', passportValidityMonths:3, details:['No visa required','90 days in Schengen zone'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'Australia',   status:'EVISA_OR_ETA',      summary:'US passport holders can apply for an Australia eVisitor (subclass 651) free of charge online.',                    fee:'Free', maxDays:90,  processingTime:'Minutes to days', passportValidityMonths:6, details:['Apply online via ImmiAccount','Multiple entries, 3 months per visit','Usually approved instantly'], sourceUrl:'https://immi.homeaffairs.gov.au/', sourceLabel:'Australia Home Affairs', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'New Zealand', status:'EVISA_OR_ETA',      summary:'US passport holders require a New Zealand ETA (NZeTA) before travel.',                                            fee:'NZD $23', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply via NZeTA app','Valid 2 years or until passport expires'], sourceUrl:'https://www.immigration.govt.nz/', sourceLabel:'NZ Immigration', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'Brazil',      status:'VISA_NOT_REQUIRED', summary:'US passport holders can enter Brazil visa-free for up to 90 days (visa-free restored in 2024).',                   fee:'Free', maxDays:90,  processingTime:'N/A', passportValidityMonths:6, details:['No visa required since 2024','Return ticket recommended'], sourceUrl:'https://www.gov.br/mre/', sourceLabel:'Brazil Itamaraty', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'India',       status:'EVISA_OR_ETA',      summary:'US passport holders can apply for an India e-Visa (Tourist) online.',                                              fee:'$80', maxDays:90,  processingTime:'2-4 days', passportValidityMonths:6, details:['Apply at indianvisaonline.gov.in','Double entry allowed','1-year or 5-year options also available'], sourceUrl:'https://indianvisaonline.gov.in/', sourceLabel:'India eVisa', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'China',       status:'VISA_REQUIRED',     summary:'US citizens require a visa to enter China. 144-hour transit visa exemption available in some cities.',             fee:'~$140', processingTime:'4 business days', passportValidityMonths:6, details:['Apply at Chinese consulate or CVASC','L visa for tourism','Hotel booking and itinerary required'], sourceUrl:'https://www.visaforchina.cn/', sourceLabel:'China Visa Application', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'Russia',      status:'VISA_REQUIRED',     summary:'US citizens require a visa to enter Russia. Check travel advisories before travel.',                              fee:'~$50-100', processingTime:'Weeks', passportValidityMonths:6, details:['Apply at Russian consulate','Invitation letter required','Strong travel advisories currently in effect'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'UAE',         status:'VISA_NOT_REQUIRED', summary:'US passport holders receive a free 30-day visa on arrival in UAE (Dubai, Abu Dhabi).',                             fee:'Free', maxDays:30,  processingTime:'On arrival', passportValidityMonths:6, details:['Free visa on arrival at UAE airports','Extendable once for 30 more days'], sourceUrl:'https://u.ae/en/information-and-services/visa-and-emirates-id', sourceLabel:'UAE Government', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'Thailand',    status:'VISA_NOT_REQUIRED', summary:'US passport holders can enter Thailand visa-free for up to 30 days (60 days from 2024 pilot).',                   fee:'Free', maxDays:60,  processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Return ticket required'], sourceUrl:'https://www.thaiembassy.com/', sourceLabel:'Thai Embassy', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'Singapore',   status:'VISA_NOT_REQUIRED', summary:'US passport holders can enter Singapore visa-free for up to 90 days.',                                             fee:'Free', maxDays:90,  processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Return ticket required'], sourceUrl:'https://www.ica.gov.sg/', sourceLabel:'Singapore ICA', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'South Korea', status:'VISA_NOT_REQUIRED', summary:'US passport holders can enter South Korea visa-free for up to 90 days. K-ETA may be required.',                  fee:'Free (K-ETA waived for many)', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['K-ETA currently waived for several nationalities including USA','Verify at k-eta.go.kr before travel'], sourceUrl:'https://www.k-eta.go.kr/', sourceLabel:'Korea K-ETA', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'Turkey',      status:'EVISA_OR_ETA',      summary:'US passport holders must obtain an e-Visa for Turkey before travel.',                                              fee:'$60', maxDays:90,  processingTime:'Minutes', passportValidityMonths:6, details:['Apply at evisa.gov.tr','Multiple entry, 90 days in 180-day period'], sourceUrl:'https://www.evisa.gov.tr/', sourceLabel:'Turkey eVisa', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'Vietnam',     status:'EVISA_OR_ETA',      summary:'US passport holders can apply for a Vietnam e-Visa online.',                                                       fee:'$25', maxDays:90,  processingTime:'3 business days', passportValidityMonths:6, details:['Apply at evisa.xuatnhapcanh.gov.vn','90 days, single or multiple entry'], sourceUrl:'https://evisa.xuatnhapcanh.gov.vn/', sourceLabel:'Vietnam eVisa', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'Egypt',       status:'VISA_ON_ARRIVAL',   summary:'US passport holders can get a visa on arrival in Egypt.',                                                          fee:'$25', maxDays:30,  processingTime:'On arrival', passportValidityMonths:6, details:['Visa sticker at airport','USD or EUR accepted'], sourceUrl:'https://visa2egypt.gov.eg/', sourceLabel:'Egypt eVisa', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'Morocco',     status:'VISA_NOT_REQUIRED', summary:'US passport holders can enter Morocco visa-free for up to 90 days.',                                               fee:'Free', maxDays:90,  processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.diplomatie.ma/', sourceLabel:'Morocco Diplomacy', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'Argentina',   status:'VISA_NOT_REQUIRED', summary:'US passport holders can enter Argentina visa-free for up to 90 days.',                                             fee:'Free', maxDays:90,  processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Return ticket recommended'], sourceUrl:'https://www.cancilleria.gob.ar/', sourceLabel:'Argentina Cancillería', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'Peru',        status:'VISA_NOT_REQUIRED', summary:'US passport holders can enter Peru visa-free for up to 183 days.',                                                 fee:'Free', maxDays:183, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.rree.gob.pe/', sourceLabel:'Peru Cancillería', lastUpdatedISO:'2024-06-15' },
  { from:'USA', to:'Colombia',    status:'VISA_NOT_REQUIRED', summary:'US passport holders can enter Colombia visa-free for up to 90 days.',                                              fee:'Free', maxDays:90,  processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://co.usembassy.gov/', sourceLabel:'US Embassy Colombia', lastUpdatedISO:'2024-06-15' },

  // ── BRAZIL ────────────────────────────────────────────────────────────────
  { from:'Brazil', to:'Colombia',    status:'VISA_NOT_REQUIRED', summary:'Brazilian passport holders can enter Colombia visa-free for up to 90 days.',    fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.itamaraty.gov.br/', sourceLabel:'Brazil Itamaraty', lastUpdatedISO:'2024-06-15' },
  { from:'Brazil', to:'Argentina',   status:'VISA_NOT_REQUIRED', summary:'Brazilian passport holders can enter Argentina visa-free.',                      fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.itamaraty.gov.br/', sourceLabel:'Brazil Itamaraty', lastUpdatedISO:'2024-06-15' },
  { from:'Brazil', to:'UK',          status:'VISA_NOT_REQUIRED', summary:'Brazilian passport holders can enter the UK visa-free for up to 6 months. ETA required from 2025.', fee:'Free (ETA £10 from 2025)', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','ETA required from early 2025'], sourceUrl:'https://www.gov.uk/check-uk-visa', sourceLabel:'UK Visa Checker', lastUpdatedISO:'2024-06-15' },
  { from:'Brazil', to:'USA',         status:'VISA_REQUIRED',     summary:'Brazilian citizens require a B1/B2 tourist visa for the USA.',                   fee:'$185 (non-refundable)', processingTime:'Varies, weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 form required','In-person interview at US consulate'], sourceUrl:'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html', sourceLabel:'US State Dept - Visitor Visa', lastUpdatedISO:'2024-06-15' },
  { from:'Brazil', to:'France',      status:'VISA_NOT_REQUIRED', summary:'Brazilian passport holders can enter France (Schengen) visa-free for up to 90 days.', fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:3, details:['No visa required','90 days in Schengen zone'], sourceUrl:'https://www.itamaraty.gov.br/', sourceLabel:'Brazil Itamaraty', lastUpdatedISO:'2024-06-15' },
  { from:'Brazil', to:'Portugal',    status:'VISA_NOT_REQUIRED', summary:'Brazilian passport holders can enter Portugal (Schengen) visa-free for up to 90 days.', fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:3, details:['No visa required'], sourceUrl:'https://www.itamaraty.gov.br/', sourceLabel:'Brazil Itamaraty', lastUpdatedISO:'2024-06-15' },
  { from:'Brazil', to:'Australia',   status:'EVISA_OR_ETA',      summary:'Brazilian citizens must apply for an Australian eVisitor or Tourist Visa online.', fee:'Free (eVisitor) or AUD $195', processingTime:'Days to weeks', passportValidityMonths:6, details:['Apply via ImmiAccount'], sourceUrl:'https://immi.homeaffairs.gov.au/', sourceLabel:'Australia Home Affairs', lastUpdatedISO:'2024-06-15' },
  { from:'Brazil', to:'Canada',      status:'EVISA_OR_ETA',      summary:'Brazilian citizens require an eTA (Electronic Travel Authorization) for Canada.',  fee:'CAD $7', maxDays:180, processingTime:'Minutes', passportValidityMonths:6, details:['Apply at canada.ca/eta','Usually approved in minutes','Required even for transit'], sourceUrl:'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html', sourceLabel:'Canada eTA', lastUpdatedISO:'2024-06-15' },
  { from:'Brazil', to:'China',       status:'VISA_REQUIRED',     summary:'Brazilian citizens require a visa to enter China.',                                  fee:'~$140', processingTime:'4 business days', passportValidityMonths:6, details:['Apply at Chinese consulate'], sourceUrl:'https://www.visaforchina.cn/', sourceLabel:'China Visa Application', lastUpdatedISO:'2024-06-15' },
  { from:'Brazil', to:'Thailand',    status:'VISA_NOT_REQUIRED', summary:'Brazilian passport holders can enter Thailand visa-free for up to 30 days.',         fee:'Free', maxDays:30, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Return ticket required'], sourceUrl:'https://www.thaiembassy.com/', sourceLabel:'Thai Embassy', lastUpdatedISO:'2024-06-15' },

  // ── ARGENTINA ─────────────────────────────────────────────────────────────
  { from:'Argentina', to:'Colombia',  status:'VISA_NOT_REQUIRED', summary:'Argentine passport holders can enter Colombia visa-free.',    fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.cancilleria.gob.ar/', sourceLabel:'Argentina Cancillería', lastUpdatedISO:'2024-06-15' },
  { from:'Argentina', to:'USA',       status:'VISA_REQUIRED',     summary:'Argentine citizens require a B1/B2 tourist visa for the USA.', fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','Interview required at US consulate'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Argentina', to:'UK',        status:'VISA_NOT_REQUIRED', summary:'Argentine passport holders can enter the UK visa-free for up to 6 months. ETA required from 2025.', fee:'Free (ETA £10 from 2025)', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','ETA from early 2025'], sourceUrl:'https://www.gov.uk/check-uk-visa', sourceLabel:'UK Visa Checker', lastUpdatedISO:'2024-06-15' },
  { from:'Argentina', to:'France',    status:'VISA_NOT_REQUIRED', summary:'Argentine passport holders can enter Schengen area visa-free for up to 90 days.', fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:3, details:['No visa required','90 days in Schengen zone'], sourceUrl:'https://www.cancilleria.gob.ar/', sourceLabel:'Argentina Cancillería', lastUpdatedISO:'2024-06-15' },
  { from:'Argentina', to:'Japan',     status:'VISA_NOT_REQUIRED', summary:'Argentine passport holders can enter Japan visa-free for up to 90 days.',           fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Return ticket required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Argentina', to:'Australia', status:'EVISA_OR_ETA',      summary:'Argentine citizens must apply for an Australian eVisitor visa.',                    fee:'Free', processingTime:'Days', passportValidityMonths:6, details:['Apply via ImmiAccount'], sourceUrl:'https://immi.homeaffairs.gov.au/', sourceLabel:'Australia Home Affairs', lastUpdatedISO:'2024-06-15' },
  { from:'Argentina', to:'Canada',    status:'EVISA_OR_ETA',      summary:'Argentine citizens require a Canadian eTA before travel.',                          fee:'CAD $7', maxDays:180, processingTime:'Minutes', passportValidityMonths:6, details:['Apply at canada.ca/eta'], sourceUrl:'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html', sourceLabel:'Canada eTA', lastUpdatedISO:'2024-06-15' },

  // ── MEXICO ────────────────────────────────────────────────────────────────
  { from:'Mexico', to:'Colombia',  status:'VISA_NOT_REQUIRED', summary:'Mexican passport holders can enter Colombia visa-free.',    fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },
  { from:'Mexico', to:'UK',        status:'VISA_NOT_REQUIRED', summary:'Mexican passport holders can enter the UK visa-free for up to 6 months. ETA from 2025.', fee:'Free (ETA £10 from 2025)', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','ETA from early 2025'], sourceUrl:'https://www.gov.uk/check-uk-visa', sourceLabel:'UK Visa Checker', lastUpdatedISO:'2024-06-15' },
  { from:'Mexico', to:'France',    status:'VISA_NOT_REQUIRED', summary:'Mexican passport holders can enter Schengen area visa-free for up to 90 days.',         fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:3, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },
  { from:'Mexico', to:'Australia', status:'EVISA_OR_ETA',      summary:'Mexican citizens must apply for an Australian eVisitor visa.',                          fee:'Free', processingTime:'Days', passportValidityMonths:6, details:['Apply via ImmiAccount'], sourceUrl:'https://immi.homeaffairs.gov.au/', sourceLabel:'Australia Home Affairs', lastUpdatedISO:'2024-06-15' },
  { from:'Mexico', to:'Canada',    status:'VISA_REQUIRED',     summary:'Mexican citizens require a Temporary Resident Visa (TRV) to enter Canada.',            fee:'CAD $185', processingTime:'Weeks', passportValidityMonths:6, details:['Apply via IRCC portal','Biometrics required'], sourceUrl:'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html', sourceLabel:'IRCC Canada', lastUpdatedISO:'2024-06-15' },
  { from:'Mexico', to:'China',     status:'VISA_REQUIRED',     summary:'Mexican citizens require a visa to enter China.',                                       fee:'~$140', processingTime:'4 business days', passportValidityMonths:6, details:['Apply at Chinese consulate'], sourceUrl:'https://www.visaforchina.cn/', sourceLabel:'China Visa Application', lastUpdatedISO:'2024-06-15' },
  { from:'Mexico', to:'Argentina', status:'VISA_NOT_REQUIRED', summary:'Mexican passport holders can enter Argentina visa-free.',                               fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },
  { from:'Mexico', to:'Brazil',    status:'VISA_NOT_REQUIRED', summary:'Mexican passport holders can enter Brazil visa-free.',                                  fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },
  { from:'Mexico', to:'Thailand',  status:'VISA_NOT_REQUIRED', summary:'Mexican passport holders can enter Thailand visa-free for up to 30 days.',              fee:'Free', maxDays:30, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.thaiembassy.com/', sourceLabel:'Thai Embassy', lastUpdatedISO:'2024-06-15' },
  { from:'Mexico', to:'UAE',       status:'VISA_NOT_REQUIRED', summary:'Mexican passport holders receive a free visa on arrival in UAE.',                       fee:'Free', maxDays:30, processingTime:'On arrival', passportValidityMonths:6, details:['Visa on arrival'], sourceUrl:'https://u.ae/', sourceLabel:'UAE Government', lastUpdatedISO:'2024-06-15' },

  // ── VENEZUELA ─────────────────────────────────────────────────────────────
  { from:'Venezuela', to:'Colombia',    status:'VISA_NOT_REQUIRED', summary:'Venezuelan passport holders can enter Colombia visa-free. Check current border status.',  fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Check current travel advisories'], sourceUrl:'https://www.cancilleria.gov.co/', sourceLabel:'Colombia Cancillería', lastUpdatedISO:'2024-06-15' },
  { from:'Venezuela', to:'USA',         status:'VISA_REQUIRED',     summary:'Venezuelan citizens require a B1/B2 visa for the USA. Processing can be difficult currently.', fee:'$185', processingTime:'Months', passportValidityMonths:6, details:['Apply at a US consulate or embassy','Availability limited - schedule well in advance','Check current processing times'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Venezuela', to:'Spain',       status:'VISA_REQUIRED',     summary:'Venezuelan citizens require a Schengen visa for Spain.',                              fee:'€90',  processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate or VFS Global'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Venezuela', to:'Peru',        status:'VISA_NOT_REQUIRED', summary:'Venezuelan passport holders can enter Peru visa-free.',                               fee:'Free', maxDays:183, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.rree.gob.pe/', sourceLabel:'Peru Cancillería', lastUpdatedISO:'2024-06-15' },
  { from:'Venezuela', to:'Argentina',   status:'VISA_NOT_REQUIRED', summary:'Venezuelan passport holders can enter Argentina visa-free.',                          fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.cancilleria.gob.ar/', sourceLabel:'Argentina Cancillería', lastUpdatedISO:'2024-06-15' },
  { from:'Venezuela', to:'Mexico',      status:'VISA_REQUIRED',     summary:'Venezuelan citizens require a visa for Mexico since 2022.',                           fee:'Free (official) or agent fees apply', processingTime:'Weeks', passportValidityMonths:6, details:['Apply at Mexican consulate','Humanitarian visa process — check current requirements'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── PERU ──────────────────────────────────────────────────────────────────
  { from:'Peru', to:'Colombia',  status:'VISA_NOT_REQUIRED', summary:'Peruvian passport holders can enter Colombia visa-free.',    fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.rree.gob.pe/', sourceLabel:'Peru Cancillería', lastUpdatedISO:'2024-06-15' },
  { from:'Peru', to:'USA',       status:'VISA_REQUIRED',     summary:'Peruvian citizens require a B1/B2 tourist visa for the USA.', fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','Interview required'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Peru', to:'Spain',     status:'VISA_REQUIRED',     summary:'Peruvian citizens require a Schengen visa for Spain.',       fee:'€90',  processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate or VFS Global'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Peru', to:'Japan',     status:'VISA_NOT_REQUIRED', summary:'Peruvian passport holders can enter Japan visa-free for up to 90 days.',  fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Peru', to:'Argentina', status:'VISA_NOT_REQUIRED', summary:'Peruvian passport holders can enter Argentina visa-free.',   fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.rree.gob.pe/', sourceLabel:'Peru Cancillería', lastUpdatedISO:'2024-06-15' },
  { from:'Peru', to:'Brazil',    status:'VISA_NOT_REQUIRED', summary:'Peruvian passport holders can enter Brazil visa-free.',      fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.rree.gob.pe/', sourceLabel:'Peru Cancillería', lastUpdatedISO:'2024-06-15' },

  // ── INDIA ─────────────────────────────────────────────────────────────────
  { from:'India', to:'Colombia',  status:'VISA_NOT_REQUIRED', summary:'Indian passport holders can enter Colombia visa-free for up to 90 days.',        fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mea.gov.in/', sourceLabel:'India MEA', lastUpdatedISO:'2024-06-15' },
  { from:'India', to:'UK',        status:'VISA_REQUIRED',     summary:'Indian citizens require a UK Standard Visitor Visa.',                             fee:'£115+', processingTime:'3+ weeks', passportValidityMonths:6, details:['Apply online via gov.uk','Show proof of funds, accommodation, intent to leave UK'], sourceUrl:'https://www.gov.uk/visit-uk', sourceLabel:'UK Visas & Immigration', lastUpdatedISO:'2024-06-15' },
  { from:'India', to:'France',    status:'VISA_REQUIRED',     summary:'Indian citizens require a Schengen visa for France.',                             fee:'€90',  processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at French consulate or VFS Global'], sourceUrl:'https://france-visas.gouv.fr/', sourceLabel:'France Visas', lastUpdatedISO:'2024-06-15' },
  { from:'India', to:'Canada',    status:'VISA_REQUIRED',     summary:'Indian citizens require a Temporary Resident Visa (TRV) or eTA for Canada.',     fee:'CAD $185 (TRV) or $7 (eTA)', processingTime:'Weeks', passportValidityMonths:6, details:['eTA for those with valid US visa','Otherwise TRV required','Apply via IRCC'], sourceUrl:'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html', sourceLabel:'IRCC Canada', lastUpdatedISO:'2024-06-15' },
  { from:'India', to:'Australia', status:'VISA_REQUIRED',     summary:'Indian citizens require an Australian Tourist Visa (subclass 600).',             fee:'AUD $195', processingTime:'Weeks', passportValidityMonths:6, details:['Apply via ImmiAccount','Show funds, ties to India, purpose of visit'], sourceUrl:'https://immi.homeaffairs.gov.au/', sourceLabel:'Australia Home Affairs', lastUpdatedISO:'2024-06-15' },
  { from:'India', to:'Thailand',  status:'VISA_ON_ARRIVAL',   summary:'Indian passport holders can get a visa on arrival in Thailand for 15 days, or apply for eVisa for 30 days.', fee:'THB 2,000 (~$55) on arrival or online', maxDays:30, processingTime:'On arrival or online', passportValidityMonths:6, details:['eVisa recommended to avoid queues at airport','Apply at thaievisa.go.th'], sourceUrl:'https://www.thaievisa.go.th/', sourceLabel:'Thailand eVisa', lastUpdatedISO:'2024-06-15' },
  { from:'India', to:'UAE',       status:'VISA_REQUIRED',     summary:'Indian citizens require a UAE tourist visa. Apply online via airlines or travel agencies.',  fee:'AED 100-350', processingTime:'2-3 days', passportValidityMonths:6, details:['Apply via Emirates, Air Arabia, or GDRFA portal','30 or 60-day options available'], sourceUrl:'https://gdrfad.gov.ae/', sourceLabel:'UAE GDRFA', lastUpdatedISO:'2024-06-15' },
  { from:'India', to:'Singapore', status:'VISA_REQUIRED',     summary:'Indian citizens require a Singapore tourist visa.',                               fee:'SGD $30', processingTime:'3-5 days', passportValidityMonths:6, details:['Apply online via ICA or travel agent','Show hotel booking, bank statements'], sourceUrl:'https://www.ica.gov.sg/', sourceLabel:'Singapore ICA', lastUpdatedISO:'2024-06-15' },
  { from:'India', to:'New Zealand',status:'VISA_REQUIRED',    summary:'Indian citizens require a New Zealand Visitor Visa.',                             fee:'NZD $211', processingTime:'Weeks', passportValidityMonths:6, details:['Apply via ImmiAccount NZ'], sourceUrl:'https://www.immigration.govt.nz/', sourceLabel:'NZ Immigration', lastUpdatedISO:'2024-06-15' },

  // ── CHINA ─────────────────────────────────────────────────────────────────
  { from:'China', to:'Colombia',  status:'VISA_NOT_REQUIRED', summary:'Chinese passport holders can enter Colombia visa-free for up to 90 days.',       fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mfa.gov.cn/', sourceLabel:'China MFA', lastUpdatedISO:'2024-06-15' },
  { from:'China', to:'UK',        status:'VISA_REQUIRED',     summary:'Chinese citizens require a UK Standard Visitor Visa.',                            fee:'£115+', processingTime:'3+ weeks', passportValidityMonths:6, details:['Apply online via gov.uk','Show proof of funds, accommodation, purpose'], sourceUrl:'https://www.gov.uk/visit-uk', sourceLabel:'UK Visas & Immigration', lastUpdatedISO:'2024-06-15' },
  { from:'China', to:'France',    status:'VISA_REQUIRED',     summary:'Chinese citizens require a Schengen visa for France.',                            fee:'€90',  processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at French consulate or VFS Global'], sourceUrl:'https://france-visas.gouv.fr/', sourceLabel:'France Visas', lastUpdatedISO:'2024-06-15' },
  { from:'China', to:'Australia', status:'VISA_REQUIRED',     summary:'Chinese citizens require an Australian Tourist Visa (subclass 600).',            fee:'AUD $195', processingTime:'Weeks', passportValidityMonths:6, details:['Apply via ImmiAccount'], sourceUrl:'https://immi.homeaffairs.gov.au/', sourceLabel:'Australia Home Affairs', lastUpdatedISO:'2024-06-15' },
  { from:'China', to:'Thailand',  status:'VISA_NOT_REQUIRED', summary:'Chinese passport holders can enter Thailand visa-free for up to 30 days.',        fee:'Free', maxDays:30, processingTime:'N/A', passportValidityMonths:6, details:['No visa required (since 2023 agreement)'], sourceUrl:'https://www.thaiembassy.com/', sourceLabel:'Thai Embassy', lastUpdatedISO:'2024-06-15' },
  { from:'China', to:'Singapore', status:'VISA_NOT_REQUIRED', summary:'Chinese passport holders can enter Singapore visa-free for up to 30 days.',       fee:'Free', maxDays:30, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.ica.gov.sg/', sourceLabel:'Singapore ICA', lastUpdatedISO:'2024-06-15' },
  { from:'China', to:'UAE',       status:'VISA_NOT_REQUIRED', summary:'Chinese passport holders receive a free visa on arrival in UAE for 30 days.',     fee:'Free', maxDays:30, processingTime:'On arrival', passportValidityMonths:6, details:['Visa on arrival at UAE airports'], sourceUrl:'https://u.ae/', sourceLabel:'UAE Government', lastUpdatedISO:'2024-06-15' },
  { from:'China', to:'Russia',    status:'VISA_NOT_REQUIRED', summary:'Chinese passport holders can enter Russia visa-free for up to 30 days.',          fee:'Free', maxDays:30, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Check current travel advisories'], sourceUrl:'https://www.mfa.gov.cn/', sourceLabel:'China MFA', lastUpdatedISO:'2024-06-15' },
  { from:'China', to:'Canada',    status:'VISA_REQUIRED',     summary:'Chinese citizens require a Temporary Resident Visa (TRV) for Canada.',           fee:'CAD $185', processingTime:'Weeks', passportValidityMonths:6, details:['Apply via IRCC portal','Biometrics required'], sourceUrl:'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html', sourceLabel:'IRCC Canada', lastUpdatedISO:'2024-06-15' },
  { from:'China', to:'New Zealand',status:'VISA_REQUIRED',    summary:'Chinese citizens require a New Zealand Visitor Visa.',                            fee:'NZD $211', processingTime:'Weeks', passportValidityMonths:6, details:['Apply via ImmiAccount NZ'], sourceUrl:'https://www.immigration.govt.nz/', sourceLabel:'NZ Immigration', lastUpdatedISO:'2024-06-15' },
  { from:'China', to:'South Korea',status:'VISA_NOT_REQUIRED',summary:'Chinese passport holders can enter South Korea visa-free for up to 90 days (K-ETA may apply).',fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['Verify K-ETA status at k-eta.go.kr'], sourceUrl:'https://www.k-eta.go.kr/', sourceLabel:'Korea K-ETA', lastUpdatedISO:'2024-06-15' },

  // ── CANADA ────────────────────────────────────────────────────────────────
  { from:'Canada', to:'Colombia',  status:'VISA_NOT_REQUIRED', summary:'Canadian passport holders can enter Colombia visa-free for up to 90 days.', fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.international.gc.ca/', sourceLabel:'Global Affairs Canada', lastUpdatedISO:'2024-06-15' },
  { from:'Canada', to:'UK',        status:'VISA_NOT_REQUIRED', summary:'Canadian passport holders can enter the UK visa-free for up to 6 months. ETA from 2025.', fee:'Free (ETA £10 from 2025)', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','ETA from early 2025'], sourceUrl:'https://www.gov.uk/check-uk-visa', sourceLabel:'UK Visa Checker', lastUpdatedISO:'2024-06-15' },
  { from:'Canada', to:'France',    status:'VISA_NOT_REQUIRED', summary:'Canadian passport holders can enter Schengen area visa-free for up to 90 days.', fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:3, details:['No visa required'], sourceUrl:'https://www.international.gc.ca/', sourceLabel:'Global Affairs Canada', lastUpdatedISO:'2024-06-15' },
  { from:'Canada', to:'Australia', status:'EVISA_OR_ETA',      summary:'Canadian citizens can apply for an Australian eVisitor visa free of charge.', fee:'Free', processingTime:'Minutes to days', passportValidityMonths:6, details:['Apply via ImmiAccount','Usually approved quickly'], sourceUrl:'https://immi.homeaffairs.gov.au/', sourceLabel:'Australia Home Affairs', lastUpdatedISO:'2024-06-15' },
  { from:'Canada', to:'China',     status:'VISA_REQUIRED',     summary:'Canadian citizens require a visa to enter China.',                         fee:'~$140', processingTime:'4 business days', passportValidityMonths:6, details:['Apply at Chinese consulate'], sourceUrl:'https://www.visaforchina.cn/', sourceLabel:'China Visa Application', lastUpdatedISO:'2024-06-15' },
  { from:'Canada', to:'India',     status:'EVISA_OR_ETA',      summary:'Canadian citizens can apply for an India e-Visa online.',                  fee:'$80', maxDays:90, processingTime:'2-4 days', passportValidityMonths:6, details:['Apply at indianvisaonline.gov.in'], sourceUrl:'https://indianvisaonline.gov.in/', sourceLabel:'India eVisa', lastUpdatedISO:'2024-06-15' },
  { from:'Canada', to:'Thailand',  status:'VISA_NOT_REQUIRED', summary:'Canadian passport holders can enter Thailand visa-free for up to 30 days.', fee:'Free', maxDays:30, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.thaiembassy.com/', sourceLabel:'Thai Embassy', lastUpdatedISO:'2024-06-15' },
  { from:'Canada', to:'UAE',       status:'VISA_NOT_REQUIRED', summary:'Canadian passport holders receive a free visa on arrival in UAE.',         fee:'Free', maxDays:30, processingTime:'On arrival', passportValidityMonths:6, details:['Visa on arrival'], sourceUrl:'https://u.ae/', sourceLabel:'UAE Government', lastUpdatedISO:'2024-06-15' },
  { from:'Canada', to:'Brazil',    status:'VISA_NOT_REQUIRED', summary:'Canadian passport holders can enter Brazil visa-free for up to 90 days.', fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required since 2024'], sourceUrl:'https://www.international.gc.ca/', sourceLabel:'Global Affairs Canada', lastUpdatedISO:'2024-06-15' },

  // ── CANADA → SPAIN + MEXICO ────────────────────────────────────────────────
  { from:'Canada', to:'Spain',  status:'VISA_NOT_REQUIRED', summary:'Canadian passport holders can visit Spain (Schengen) visa-free for up to 90 days. ETIAS required from 2025.', fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','ETIAS required from 2025 (~€7)'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Canada', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Canadian passport holders can enter Mexico visa-free for up to 180 days.',                              fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── AUSTRALIA → SPAIN + MEXICO ─────────────────────────────────────────────
  { from:'Australia', to:'Spain',  status:'VISA_NOT_REQUIRED', summary:'Australian passport holders can visit Spain (Schengen) visa-free for up to 90 days. ETIAS required from 2025.', fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','ETIAS required from 2025'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Australia', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Australian passport holders can enter Mexico visa-free for up to 180 days.',                              fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── GERMANY → SPAIN + MEXICO ───────────────────────────────────────────────
  { from:'Germany', to:'Spain',  status:'VISA_NOT_REQUIRED', summary:'German citizens have EU free movement within Spain — no visa required, no stay limit for residents.', fee:'Free', processingTime:'N/A', passportValidityMonths:6, details:['EU free movement','Valid passport or national ID required'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Germany', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'German passport holders can enter Mexico visa-free for up to 180 days.',                              fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── FRANCE → SPAIN + MEXICO ────────────────────────────────────────────────
  { from:'France', to:'Spain',  status:'VISA_NOT_REQUIRED', summary:'French citizens have EU free movement within Spain — no visa or stay restriction.',                    fee:'Free', processingTime:'N/A', passportValidityMonths:6, details:['EU free movement'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'France', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'French passport holders can enter Mexico visa-free for up to 180 days.',                               fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── BRAZIL → SPAIN + MEXICO ────────────────────────────────────────────────
  { from:'Brazil', to:'Spain',  status:'VISA_NOT_REQUIRED', summary:'Brazilian passport holders can visit Spain (Schengen) visa-free for up to 90 days.',                   fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','90 days in any 180-day Schengen period'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Brazil', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Brazilian passport holders can enter Mexico visa-free for up to 180 days.',                            fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── INDIA → SPAIN + MEXICO ─────────────────────────────────────────────────
  { from:'India', to:'Spain',  status:'VISA_REQUIRED', summary:'Indian citizens require a Schengen visa for Spain. Apply at the Spanish consulate or VFS Global.',         fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate or VFS Global','Schengen short-stay visa type C','Bank statements, insurance, accommodation required'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'India', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Indian passport holders can enter Mexico visa-free. Mexico removed the visa requirement for Indians in November 2023.', fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['Visa-free since November 2023','Verify current policy before travel'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── CHINA → SPAIN + MEXICO ─────────────────────────────────────────────────
  { from:'China', to:'Spain',  status:'VISA_REQUIRED', summary:'Chinese citizens require a Schengen visa for Spain. Apply at the Spanish consulate or VFS Global.',        fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate or VFS Global','Schengen short-stay visa type C'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'China', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Chinese citizens can enter Mexico visa-free. A bilateral visa-free agreement took effect in April 2024.', fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['Visa-free since April 2024','Verify current terms before travel'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── ARGENTINA → SPAIN + MEXICO ─────────────────────────────────────────────
  { from:'Argentina', to:'Spain',  status:'VISA_NOT_REQUIRED', summary:'Argentine passport holders can visit Spain (Schengen) visa-free for up to 90 days.',               fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','ETIAS required from 2025'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Argentina', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Argentine passport holders can enter Mexico visa-free for up to 180 days.',                        fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── VENEZUELA → JAPAN ──────────────────────────────────────────────────────
  { from:'Venezuela', to:'Japan', status:'VISA_NOT_REQUIRED', summary:'Venezuelan passport holders can enter Japan visa-free for up to 90 days. Verify current advisories before travel.', fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Check current travel advisories'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },

  // ── PERU → MEXICO ──────────────────────────────────────────────────────────
  { from:'Peru', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Peruvian passport holders can enter Mexico visa-free for up to 180 days.', fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── UNITED KINGDOM ─────────────────────────────────────────────────────────
  { from:'United Kingdom', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'UK passport holders can enter Japan visa-free for up to 90 days.',                                fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','Return ticket recommended'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'United Kingdom', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'UK is in the Visa Waiver Program. ESTA required before travel ($21).',         fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov','E-passport required','Valid 2 years'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'United Kingdom', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'UK passport holders can visit Spain visa-free for up to 90 days in any 180-day period post-Brexit.', fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','90 days max in any 180-day period','ETIAS required from 2025 (~€7)'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'United Kingdom', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'UK passport holders can enter Mexico visa-free for up to 180 days.',                            fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── AUSTRIA ────────────────────────────────────────────────────────────────
  { from:'Austria', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'Austrian passport holders can enter Japan visa-free for up to 90 days.',                              fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Austria', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'Austria is in the Visa Waiver Program. ESTA required before travel ($21).',         fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov','E-passport required'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'Austria', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'Austrian citizens have EU free movement within Spain — no visa or stay restriction.',                fee:'Free', processingTime:'N/A', passportValidityMonths:6, details:['EU free movement'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Austria', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'Austrian passport holders can enter Mexico visa-free for up to 180 days.',                           fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── BANGLADESH ─────────────────────────────────────────────────────────────
  { from:'Bangladesh', to:'Japan',  status:'VISA_REQUIRED', summary:'Bangladeshi citizens require a visa to enter Japan. Apply at the Japanese embassy.',                    fee:'~¥3,000', processingTime:'5 business days', passportValidityMonths:6, details:['Apply at Japanese embassy','Bank statements and accommodation required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Bangladesh', to:'USA',    status:'VISA_REQUIRED', summary:'Bangladeshi citizens require a B1/B2 tourist visa for the USA.',                                        fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview required'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Bangladesh', to:'Spain',  status:'VISA_REQUIRED', summary:'Bangladeshi citizens require a Schengen visa for Spain.',                                              fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate or VFS Global'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Bangladesh', to:'Mexico', status:'VISA_REQUIRED', summary:'Bangladeshi citizens require a visa to enter Mexico.',                                                  fee:'Check consulate', processingTime:'Weeks', passportValidityMonths:6, details:['Apply at Mexican consulate'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── BELGIUM ────────────────────────────────────────────────────────────────
  { from:'Belgium', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'Belgian passport holders can enter Japan visa-free for up to 90 days.',                            fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Belgium', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'Belgium is in the Visa Waiver Program. ESTA required before travel ($21).',     fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'Belgium', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'Belgian citizens have EU free movement within Spain — no visa required.',                        fee:'Free', processingTime:'N/A', passportValidityMonths:6, details:['EU free movement'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Belgium', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'Belgian passport holders can enter Mexico visa-free for up to 180 days.',                        fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── BOLIVIA ────────────────────────────────────────────────────────────────
  { from:'Bolivia', to:'Japan',  status:'VISA_NOT_REQUIRED', summary:'Bolivian passport holders can enter Japan visa-free for up to 90 days.',                               fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Bolivia', to:'USA',    status:'VISA_REQUIRED',     summary:'Bolivian citizens require a B1/B2 tourist visa for the USA.',                                         fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview required'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Bolivia', to:'Spain',  status:'VISA_NOT_REQUIRED', summary:'Bolivian passport holders can visit Spain (Schengen) visa-free for up to 90 days.',                   fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','90 days in Schengen zone'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Bolivia', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Bolivian passport holders can enter Mexico visa-free for up to 180 days.',                            fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── CHILE ──────────────────────────────────────────────────────────────────
  { from:'Chile', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'Chilean passport holders can enter Japan visa-free for up to 90 days.',                              fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Chile', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'Chile is in the Visa Waiver Program. ESTA required before travel ($21).',         fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov','E-passport required'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'Chile', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'Chilean passport holders can visit Spain (Schengen) visa-free for up to 90 days.',                  fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','ETIAS required from 2025'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Chile', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'Chilean passport holders can enter Mexico visa-free for up to 180 days.',                           fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── COSTA RICA ─────────────────────────────────────────────────────────────
  { from:'Costa Rica', to:'Japan',  status:'VISA_NOT_REQUIRED', summary:'Costa Rican passport holders can enter Japan visa-free for up to 90 days.',                         fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Costa Rica', to:'USA',    status:'VISA_REQUIRED',     summary:'Costa Rican citizens require a B1/B2 tourist visa for the USA.',                                   fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview required'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Costa Rica', to:'Spain',  status:'VISA_NOT_REQUIRED', summary:'Costa Rican passport holders can visit Spain (Schengen) visa-free for up to 90 days.',             fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','90 days in Schengen zone'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Costa Rica', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Costa Rican passport holders can enter Mexico visa-free for up to 180 days.',                      fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── CROATIA ────────────────────────────────────────────────────────────────
  { from:'Croatia', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'Croatian passport holders can enter Japan visa-free for up to 90 days.',                           fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Croatia', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'Croatia joined the Visa Waiver Program in 2022. ESTA required before travel.', fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov','E-passport required'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'Croatia', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'Croatian citizens have EU free movement within Spain — no visa required.',                        fee:'Free', processingTime:'N/A', passportValidityMonths:6, details:['EU free movement'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Croatia', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'Croatian passport holders can enter Mexico visa-free for up to 180 days.',                        fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── CUBA ───────────────────────────────────────────────────────────────────
  { from:'Cuba', to:'Japan',  status:'VISA_REQUIRED', summary:'Cuban citizens require a visa to enter Japan.',                                                                fee:'~¥3,000', processingTime:'5 business days', passportValidityMonths:6, details:['Apply at Japanese embassy'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Cuba', to:'USA',    status:'VISA_REQUIRED', summary:'Cuban citizens require a B1/B2 visa for the USA. Processing is highly restricted currently.',                  fee:'$185', processingTime:'Months (very limited availability)', passportValidityMonths:6, details:['Very limited consular services','Apply early','Check US Embassy for availability'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Cuba', to:'Spain',  status:'VISA_REQUIRED', summary:'Cuban citizens require a Schengen visa for Spain.',                                                           fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Cuba', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Cuban citizens can enter Mexico visa-free. Cuba and Mexico maintain strong bilateral relations.',          fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── CZECH REPUBLIC ─────────────────────────────────────────────────────────
  { from:'Czech Republic', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'Czech passport holders can enter Japan visa-free for up to 90 days.',                       fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Czech Republic', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'Czech Republic is in the Visa Waiver Program. ESTA required.',           fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'Czech Republic', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'Czech citizens have EU/Schengen free movement within Spain.',                              fee:'Free', processingTime:'N/A', passportValidityMonths:6, details:['EU/Schengen free movement'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Czech Republic', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'Czech passport holders can enter Mexico visa-free for up to 180 days.',                    fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── DENMARK ────────────────────────────────────────────────────────────────
  { from:'Denmark', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'Danish passport holders can enter Japan visa-free for up to 90 days.',                             fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Denmark', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'Denmark is in the Visa Waiver Program. ESTA required.',                         fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'Denmark', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'Danish citizens have EU/Schengen free movement within Spain.',                                    fee:'Free', processingTime:'N/A', passportValidityMonths:6, details:['EU/Schengen free movement'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Denmark', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'Danish passport holders can enter Mexico visa-free for up to 180 days.',                          fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── DOMINICAN REPUBLIC ─────────────────────────────────────────────────────
  { from:'Dominican Republic', to:'Japan',  status:'VISA_NOT_REQUIRED', summary:'Dominican Republic passport holders can enter Japan visa-free for up to 90 days.',          fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Dominican Republic', to:'USA',    status:'VISA_REQUIRED',     summary:'Dominican Republic citizens require a B1/B2 tourist visa for the USA.',                    fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview required'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Dominican Republic', to:'Spain',  status:'VISA_REQUIRED',     summary:'Dominican Republic citizens require a Schengen visa for Spain.',                           fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Dominican Republic', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Dominican Republic passport holders can enter Mexico visa-free.',                          fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── ECUADOR ────────────────────────────────────────────────────────────────
  { from:'Ecuador', to:'Japan',  status:'VISA_NOT_REQUIRED', summary:'Ecuadorian passport holders can enter Japan visa-free for up to 90 days.',                              fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Ecuador', to:'USA',    status:'VISA_REQUIRED',     summary:'Ecuadorian citizens require a B1/B2 tourist visa for the USA.',                                        fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview required'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Ecuador', to:'Spain',  status:'VISA_REQUIRED',     summary:'Ecuador was removed from the Schengen visa-free list in March 2023. A Schengen visa is now required for Spain.', fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Schengen visa required since March 2023','Apply at Spanish consulate or VFS Global'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Ecuador', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Ecuadorian passport holders can enter Mexico visa-free for up to 180 days.',                           fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── EGYPT ──────────────────────────────────────────────────────────────────
  { from:'Egypt', to:'Japan',  status:'VISA_REQUIRED', summary:'Egyptian citizens require a visa to enter Japan.',                                                            fee:'~¥3,000', processingTime:'5 business days', passportValidityMonths:6, details:['Apply at Japanese embassy'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Egypt', to:'USA',    status:'VISA_REQUIRED', summary:'Egyptian citizens require a B1/B2 tourist visa for the USA.',                                                fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Egypt', to:'Spain',  status:'VISA_REQUIRED', summary:'Egyptian citizens require a Schengen visa for Spain.',                                                      fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate or VFS Global'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Egypt', to:'Mexico', status:'VISA_REQUIRED', summary:'Egyptian citizens require a visa to enter Mexico.',                                                          fee:'Check consulate', processingTime:'Weeks', passportValidityMonths:6, details:['Apply at Mexican consulate'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── EL SALVADOR ────────────────────────────────────────────────────────────
  { from:'El Salvador', to:'Japan',  status:'VISA_NOT_REQUIRED', summary:'Salvadoran passport holders can enter Japan visa-free for up to 90 days.',                         fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'El Salvador', to:'USA',    status:'VISA_REQUIRED',     summary:'Salvadoran citizens require a B1/B2 tourist visa for the USA.',                                   fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview required'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'El Salvador', to:'Spain',  status:'VISA_NOT_REQUIRED', summary:'Salvadoran passport holders can visit Spain (Schengen) visa-free for up to 90 days.',             fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'El Salvador', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Salvadoran passport holders can enter Mexico visa-free for up to 180 days.',                      fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── ETHIOPIA ───────────────────────────────────────────────────────────────
  { from:'Ethiopia', to:'Japan',  status:'VISA_REQUIRED', summary:'Ethiopian citizens require a visa to enter Japan.',                                                        fee:'~¥3,000', processingTime:'5 business days', passportValidityMonths:6, details:['Apply at Japanese embassy'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Ethiopia', to:'USA',    status:'VISA_REQUIRED', summary:'Ethiopian citizens require a B1/B2 tourist visa for the USA.',                                            fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Ethiopia', to:'Spain',  status:'VISA_REQUIRED', summary:'Ethiopian citizens require a Schengen visa for Spain.',                                                  fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate or VFS Global'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Ethiopia', to:'Mexico', status:'VISA_REQUIRED', summary:'Ethiopian citizens require a visa to enter Mexico.',                                                      fee:'Check consulate', processingTime:'Weeks', passportValidityMonths:6, details:['Apply at Mexican consulate'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── FINLAND ────────────────────────────────────────────────────────────────
  { from:'Finland', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'Finnish passport holders can enter Japan visa-free for up to 90 days.',                            fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Finland', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'Finland is in the Visa Waiver Program. ESTA required.',                         fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'Finland', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'Finnish citizens have EU/Schengen free movement within Spain.',                                   fee:'Free', processingTime:'N/A', passportValidityMonths:6, details:['EU/Schengen free movement'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Finland', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'Finnish passport holders can enter Mexico visa-free for up to 180 days.',                         fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── GHANA ──────────────────────────────────────────────────────────────────
  { from:'Ghana', to:'Japan',  status:'VISA_REQUIRED', summary:'Ghanaian citizens require a visa to enter Japan.',                                                            fee:'~¥3,000', processingTime:'5 business days', passportValidityMonths:6, details:['Apply at Japanese embassy'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Ghana', to:'USA',    status:'VISA_REQUIRED', summary:'Ghanaian citizens require a B1/B2 tourist visa for the USA.',                                                fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Ghana', to:'Spain',  status:'VISA_REQUIRED', summary:'Ghanaian citizens require a Schengen visa for Spain.',                                                      fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate or VFS Global'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Ghana', to:'Mexico', status:'VISA_REQUIRED', summary:'Ghanaian citizens require a visa to enter Mexico.',                                                          fee:'Check consulate', processingTime:'Weeks', passportValidityMonths:6, details:['Apply at Mexican consulate'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── GREECE ─────────────────────────────────────────────────────────────────
  { from:'Greece', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'Greek passport holders can enter Japan visa-free for up to 90 days.',                               fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Greece', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'Greece joined the Visa Waiver Program in 2022. ESTA required before travel.',  fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'Greece', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'Greek citizens have EU/Schengen free movement within Spain.',                                     fee:'Free', processingTime:'N/A', passportValidityMonths:6, details:['EU/Schengen free movement'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Greece', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'Greek passport holders can enter Mexico visa-free for up to 180 days.',                           fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── GUATEMALA ──────────────────────────────────────────────────────────────
  { from:'Guatemala', to:'Japan',  status:'VISA_NOT_REQUIRED', summary:'Guatemalan passport holders can enter Japan visa-free for up to 90 days.',                           fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Guatemala', to:'USA',    status:'VISA_REQUIRED',     summary:'Guatemalan citizens require a B1/B2 tourist visa for the USA.',                                    fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview required'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Guatemala', to:'Spain',  status:'VISA_NOT_REQUIRED', summary:'Guatemalan passport holders can visit Spain (Schengen) visa-free for up to 90 days.',              fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Guatemala', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Guatemalan passport holders can enter Mexico visa-free for up to 180 days.',                       fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── HAITI ──────────────────────────────────────────────────────────────────
  { from:'Haiti', to:'Japan',  status:'VISA_REQUIRED', summary:'Haitian citizens require a visa to enter Japan.',                                                            fee:'~¥3,000', processingTime:'5 business days', passportValidityMonths:6, details:['Apply at Japanese embassy'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Haiti', to:'USA',    status:'VISA_REQUIRED', summary:'Haitian citizens require a B1/B2 tourist visa for the USA.',                                                fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Haiti', to:'Spain',  status:'VISA_REQUIRED', summary:'Haitian citizens require a Schengen visa for Spain.',                                                      fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Haiti', to:'Mexico', status:'VISA_REQUIRED', summary:'Haitian citizens require a visa to enter Mexico.',                                                          fee:'Check consulate', processingTime:'Weeks', passportValidityMonths:6, details:['Apply at Mexican consulate'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── HONDURAS ───────────────────────────────────────────────────────────────
  { from:'Honduras', to:'Japan',  status:'VISA_NOT_REQUIRED', summary:'Honduran passport holders can enter Japan visa-free for up to 90 days.',                              fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Honduras', to:'USA',    status:'VISA_REQUIRED',     summary:'Honduran citizens require a B1/B2 tourist visa for the USA.',                                        fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview required'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Honduras', to:'Spain',  status:'VISA_NOT_REQUIRED', summary:'Honduran passport holders can visit Spain (Schengen) visa-free for up to 90 days.',                 fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Honduras', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Honduran passport holders can enter Mexico visa-free for up to 180 days.',                          fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── HUNGARY ────────────────────────────────────────────────────────────────
  { from:'Hungary', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'Hungarian passport holders can enter Japan visa-free for up to 90 days.',                          fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Hungary', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'Hungary joined the Visa Waiver Program in 2024. ESTA required before travel.', fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'Hungary', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'Hungarian citizens have EU/Schengen free movement within Spain.',                                fee:'Free', processingTime:'N/A', passportValidityMonths:6, details:['EU/Schengen free movement'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Hungary', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'Hungarian passport holders can enter Mexico visa-free for up to 180 days.',                      fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── INDONESIA ──────────────────────────────────────────────────────────────
  { from:'Indonesia', to:'Japan',  status:'VISA_NOT_REQUIRED', summary:'Indonesian passport holders can enter Japan visa-free for up to 30 days (since 2023).',              fee:'Free', maxDays:30, processingTime:'N/A', passportValidityMonths:6, details:['Visa-free for up to 30 days','E-passport recommended'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Indonesia', to:'USA',    status:'VISA_REQUIRED',     summary:'Indonesian citizens require a B1/B2 tourist visa for the USA.',                                     fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview required'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Indonesia', to:'Spain',  status:'VISA_REQUIRED',     summary:'Indonesian citizens require a Schengen visa for Spain.',                                            fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate or VFS Global'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Indonesia', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Indonesian passport holders can enter Mexico visa-free for up to 180 days.',                        fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── IRELAND ────────────────────────────────────────────────────────────────
  { from:'Ireland', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'Irish passport holders can enter Japan visa-free for up to 90 days.',                              fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Ireland', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'Ireland is in the Visa Waiver Program. ESTA required.',                         fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'Ireland', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'Irish citizens have EU free movement within Spain — no visa required.',                           fee:'Free', processingTime:'N/A', passportValidityMonths:6, details:['EU free movement'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Ireland', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'Irish passport holders can enter Mexico visa-free for up to 180 days.',                           fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── ISRAEL ─────────────────────────────────────────────────────────────────
  { from:'Israel', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'Israeli passport holders can enter Japan visa-free for up to 90 days.',                             fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Israel', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'Israel joined the Visa Waiver Program in 2023. ESTA required before travel.',  fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'Israel', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'Israeli passport holders can visit Spain (Schengen) visa-free for up to 90 days.',                fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','ETIAS required from 2025'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Israel', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'Israeli passport holders can enter Mexico visa-free for up to 180 days.',                          fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── ITALY ──────────────────────────────────────────────────────────────────
  { from:'Italy', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'Italian passport holders can enter Japan visa-free for up to 90 days.',                              fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Italy', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'Italy is in the Visa Waiver Program. ESTA required before travel ($21).',         fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'Italy', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'Italian citizens have EU/Schengen free movement within Spain.',                                    fee:'Free', processingTime:'N/A', passportValidityMonths:6, details:['EU/Schengen free movement'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Italy', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'Italian passport holders can enter Mexico visa-free for up to 180 days.',                          fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── JAMAICA ────────────────────────────────────────────────────────────────
  { from:'Jamaica', to:'Japan',  status:'VISA_NOT_REQUIRED', summary:'Jamaican passport holders can enter Japan visa-free for up to 90 days.',                               fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Jamaica', to:'USA',    status:'VISA_REQUIRED',     summary:'Jamaican citizens require a B1/B2 tourist visa for the USA.',                                         fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview required'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Jamaica', to:'Spain',  status:'VISA_REQUIRED',     summary:'Jamaican citizens require a Schengen visa for Spain.',                                               fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Jamaica', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Jamaican passport holders can enter Mexico visa-free for up to 180 days.',                            fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── JAPAN (as nationality) ─────────────────────────────────────────────────
  { from:'Japan', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'Japan is in the Visa Waiver Program. Japanese citizens need ESTA before travel to the USA.', fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov','E-passport required'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'Japan', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'Japanese passport holders can visit Spain (Schengen) visa-free for up to 90 days.',                 fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','ETIAS required from 2025'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Japan', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'Japanese passport holders can enter Mexico visa-free for up to 180 days.',                          fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── KENYA ──────────────────────────────────────────────────────────────────
  { from:'Kenya', to:'Japan',  status:'VISA_REQUIRED', summary:'Kenyan citizens require a visa to enter Japan.',                                                              fee:'~¥3,000', processingTime:'5 business days', passportValidityMonths:6, details:['Apply at Japanese embassy'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Kenya', to:'USA',    status:'VISA_REQUIRED', summary:'Kenyan citizens require a B1/B2 tourist visa for the USA.',                                                  fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Kenya', to:'Spain',  status:'VISA_REQUIRED', summary:'Kenyan citizens require a Schengen visa for Spain.',                                                        fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate or VFS Global'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Kenya', to:'Mexico', status:'VISA_REQUIRED', summary:'Kenyan citizens require a visa to enter Mexico.',                                                            fee:'Check consulate', processingTime:'Weeks', passportValidityMonths:6, details:['Apply at Mexican consulate'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── MALAYSIA ───────────────────────────────────────────────────────────────
  { from:'Malaysia', to:'Japan',  status:'VISA_NOT_REQUIRED', summary:'Malaysian passport holders can enter Japan visa-free for up to 90 days.',                             fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Malaysia', to:'USA',    status:'VISA_REQUIRED',     summary:'Malaysian citizens require a B1/B2 tourist visa for the USA.',                                       fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Malaysia', to:'Spain',  status:'VISA_REQUIRED',     summary:'Malaysian citizens require a Schengen visa for Spain.',                                             fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate or VFS Global'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Malaysia', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Malaysian passport holders can enter Mexico visa-free for up to 180 days.',                          fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── MOROCCO ────────────────────────────────────────────────────────────────
  { from:'Morocco', to:'Japan',  status:'VISA_REQUIRED', summary:'Moroccan citizens require a visa to enter Japan.',                                                         fee:'~¥3,000', processingTime:'5 business days', passportValidityMonths:6, details:['Apply at Japanese embassy or consulate'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Morocco', to:'USA',    status:'VISA_REQUIRED', summary:'Moroccan citizens require a B1/B2 tourist visa for the USA.',                                              fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Morocco', to:'Spain',  status:'VISA_REQUIRED', summary:'Moroccan citizens require a Schengen visa for Spain. Spain consulates process a high volume of Moroccan applications — apply early.', fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate or VFS Global','High demand — apply early'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Morocco', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Moroccan passport holders can enter Mexico visa-free for up to 180 days.',                            fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── NETHERLANDS ────────────────────────────────────────────────────────────
  { from:'Netherlands', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'Dutch passport holders can enter Japan visa-free for up to 90 days.',                          fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Netherlands', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'Netherlands is in the Visa Waiver Program. ESTA required.',               fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'Netherlands', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'Dutch citizens have EU/Schengen free movement within Spain.',                                fee:'Free', processingTime:'N/A', passportValidityMonths:6, details:['EU/Schengen free movement'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Netherlands', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'Dutch passport holders can enter Mexico visa-free for up to 180 days.',                      fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── NEW ZEALAND ────────────────────────────────────────────────────────────
  { from:'New Zealand', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'New Zealand passport holders can enter Japan visa-free for up to 90 days.',                    fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'New Zealand', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'New Zealand is in the Visa Waiver Program. ESTA required.',               fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'New Zealand', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'New Zealand passport holders can visit Spain (Schengen) visa-free for up to 90 days.',       fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','ETIAS required from 2025'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'New Zealand', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'New Zealand passport holders can enter Mexico visa-free for up to 180 days.',                fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── NIGERIA ────────────────────────────────────────────────────────────────
  { from:'Nigeria', to:'Japan',  status:'VISA_REQUIRED', summary:'Nigerian citizens require a visa to enter Japan.',                                                         fee:'~¥3,000', processingTime:'5 business days', passportValidityMonths:6, details:['Apply at Japanese embassy'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Nigeria', to:'USA',    status:'VISA_REQUIRED', summary:'Nigerian citizens require a B1/B2 tourist visa for the USA.',                                              fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Nigeria', to:'Spain',  status:'VISA_REQUIRED', summary:'Nigerian citizens require a Schengen visa for Spain.',                                                    fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate or VFS Global'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Nigeria', to:'Mexico', status:'VISA_REQUIRED', summary:'Nigerian citizens require a visa to enter Mexico.',                                                        fee:'Check consulate', processingTime:'Weeks', passportValidityMonths:6, details:['Apply at Mexican consulate'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── NORWAY ─────────────────────────────────────────────────────────────────
  { from:'Norway', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'Norwegian passport holders can enter Japan visa-free for up to 90 days.',                           fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Norway', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'Norway is in the Visa Waiver Program. ESTA required.',                           fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'Norway', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'Norwegian citizens have Schengen free movement — Norway is a Schengen Area member (EEA).',        fee:'Free', processingTime:'N/A', passportValidityMonths:6, details:['Schengen Area member (EEA)'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Norway', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'Norwegian passport holders can enter Mexico visa-free for up to 180 days.',                        fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── PAKISTAN ───────────────────────────────────────────────────────────────
  { from:'Pakistan', to:'Japan',  status:'VISA_REQUIRED', summary:'Pakistani citizens require a visa to enter Japan.',                                                       fee:'~¥3,000', processingTime:'5 business days', passportValidityMonths:6, details:['Apply at Japanese embassy'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Pakistan', to:'USA',    status:'VISA_REQUIRED', summary:'Pakistani citizens require a B1/B2 tourist visa for the USA.',                                            fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Pakistan', to:'Spain',  status:'VISA_REQUIRED', summary:'Pakistani citizens require a Schengen visa for Spain.',                                                  fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate or VFS Global'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Pakistan', to:'Mexico', status:'VISA_REQUIRED', summary:'Pakistani citizens require a visa to enter Mexico.',                                                      fee:'Check consulate', processingTime:'Weeks', passportValidityMonths:6, details:['Apply at Mexican consulate'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── PANAMA ─────────────────────────────────────────────────────────────────
  { from:'Panama', to:'Japan',  status:'VISA_NOT_REQUIRED', summary:'Panamanian passport holders can enter Japan visa-free for up to 90 days.',                              fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Panama', to:'USA',    status:'VISA_REQUIRED',     summary:'Panamanian citizens require a B1/B2 tourist visa for the USA.',                                        fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Panama', to:'Spain',  status:'VISA_NOT_REQUIRED', summary:'Panamanian passport holders can visit Spain (Schengen) visa-free for up to 90 days.',                 fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Panama', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Panamanian passport holders can enter Mexico visa-free for up to 180 days.',                           fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── PARAGUAY ───────────────────────────────────────────────────────────────
  { from:'Paraguay', to:'Japan',  status:'VISA_NOT_REQUIRED', summary:'Paraguayan passport holders can enter Japan visa-free for up to 90 days.',                            fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Paraguay', to:'USA',    status:'VISA_REQUIRED',     summary:'Paraguayan citizens require a B1/B2 tourist visa for the USA.',                                      fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Paraguay', to:'Spain',  status:'VISA_NOT_REQUIRED', summary:'Paraguayan passport holders can visit Spain (Schengen) visa-free for up to 90 days.',               fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Paraguay', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Paraguayan passport holders can enter Mexico visa-free for up to 180 days.',                         fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── PHILIPPINES ────────────────────────────────────────────────────────────
  { from:'Philippines', to:'Japan',  status:'VISA_NOT_REQUIRED', summary:'Philippine passport holders can enter Japan visa-free for up to 30 days.',                         fee:'Free', maxDays:30, processingTime:'N/A', passportValidityMonths:6, details:['No visa required for up to 30 days','Biometric passport recommended'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Philippines', to:'USA',    status:'VISA_REQUIRED',     summary:'Filipino citizens require a B1/B2 tourist visa for the USA.',                                     fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview required'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Philippines', to:'Spain',  status:'VISA_REQUIRED',     summary:'Filipino citizens require a Schengen visa for Spain.',                                            fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate or VFS Global'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Philippines', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Philippine passport holders can enter Mexico visa-free for up to 180 days.',                      fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── POLAND ─────────────────────────────────────────────────────────────────
  { from:'Poland', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'Polish passport holders can enter Japan visa-free for up to 90 days.',                              fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Poland', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'Poland is in the Visa Waiver Program. ESTA required.',                           fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'Poland', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'Polish citizens have EU/Schengen free movement within Spain.',                                    fee:'Free', processingTime:'N/A', passportValidityMonths:6, details:['EU/Schengen free movement'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Poland', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'Polish passport holders can enter Mexico visa-free for up to 180 days.',                          fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── PORTUGAL ───────────────────────────────────────────────────────────────
  { from:'Portugal', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'Portuguese passport holders can enter Japan visa-free for up to 90 days.',                        fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Portugal', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'Portugal is in the Visa Waiver Program. ESTA required.',                       fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'Portugal', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'Portuguese citizens have EU/Schengen free movement within Spain.',                               fee:'Free', processingTime:'N/A', passportValidityMonths:6, details:['EU/Schengen free movement'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Portugal', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'Portuguese passport holders can enter Mexico visa-free for up to 180 days.',                    fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── ROMANIA ────────────────────────────────────────────────────────────────
  { from:'Romania', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'Romanian passport holders can enter Japan visa-free for up to 90 days.',                           fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Romania', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'Romania joined the Visa Waiver Program in 2023. ESTA required before travel.', fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'Romania', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'Romanian citizens have EU free movement within Spain — no visa required.',                        fee:'Free', processingTime:'N/A', passportValidityMonths:6, details:['EU free movement'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Romania', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'Romanian passport holders can enter Mexico visa-free for up to 180 days.',                        fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── RUSSIA ─────────────────────────────────────────────────────────────────
  { from:'Russia', to:'Japan',  status:'VISA_REQUIRED', summary:'Russian citizens require a visa to enter Japan. Check current diplomatic situation before applying.',       fee:'~¥3,000', processingTime:'5 business days', passportValidityMonths:6, details:['Apply at Japanese embassy','Check current diplomatic situation'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Russia', to:'USA',    status:'VISA_REQUIRED', summary:'Russian citizens require a B1/B2 tourist visa for the USA. Processing is currently very limited.',         fee:'$185', processingTime:'Months (limited availability)', passportValidityMonths:6, details:['Very limited consular services currently','Apply well in advance'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Russia', to:'Spain',  status:'VISA_REQUIRED', summary:'Russian citizens require a Schengen visa for Spain. Apply well in advance due to current restrictions.',   fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate','Check current EU/Russia restrictions'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Russia', to:'Mexico', status:'VISA_REQUIRED', summary:'Russian citizens require a visa to enter Mexico.',                                                          fee:'Check consulate', processingTime:'Weeks', passportValidityMonths:6, details:['Apply at Mexican consulate'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── SAUDI ARABIA ───────────────────────────────────────────────────────────
  { from:'Saudi Arabia', to:'Japan',  status:'VISA_NOT_REQUIRED', summary:'Saudi passport holders can enter Japan visa-free for up to 90 days.',                             fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Saudi Arabia', to:'USA',    status:'VISA_REQUIRED',     summary:'Saudi citizens require a B1/B2 tourist visa for the USA.',                                       fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview required'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Saudi Arabia', to:'Spain',  status:'VISA_REQUIRED',     summary:'Saudi citizens require a Schengen visa for Spain.',                                              fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate or VFS Global'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Saudi Arabia', to:'Mexico', status:'VISA_REQUIRED',     summary:'Saudi citizens require a visa to enter Mexico.',                                                  fee:'Check consulate', processingTime:'Weeks', passportValidityMonths:6, details:['Apply at Mexican consulate'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── SERBIA ─────────────────────────────────────────────────────────────────
  { from:'Serbia', to:'Japan',  status:'VISA_NOT_REQUIRED', summary:'Serbian passport holders can enter Japan visa-free for up to 90 days.',                                  fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Serbia', to:'USA',    status:'VISA_REQUIRED',     summary:'Serbian citizens require a B1/B2 tourist visa for the USA.',                                            fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Serbia', to:'Spain',  status:'VISA_NOT_REQUIRED', summary:'Serbian passport holders can visit Spain (Schengen) visa-free for up to 90 days (biometric passport required).', fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['Biometric passport required','90 days in any 180-day Schengen period'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Serbia', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Serbian passport holders can enter Mexico visa-free for up to 180 days.',                               fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── SINGAPORE ──────────────────────────────────────────────────────────────
  { from:'Singapore', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'Singaporean passport holders can enter Japan visa-free for up to 90 days.',                       fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Singapore', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'Singapore is in the Visa Waiver Program. ESTA required.',                     fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'Singapore', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'Singaporean passport holders can visit Spain (Schengen) visa-free for up to 90 days.',           fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','ETIAS required from 2025'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Singapore', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'Singaporean passport holders can enter Mexico visa-free for up to 180 days.',                    fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── SOUTH AFRICA ───────────────────────────────────────────────────────────
  { from:'South Africa', to:'Japan',  status:'VISA_NOT_REQUIRED', summary:'South African passport holders can enter Japan visa-free for up to 90 days.',                     fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'South Africa', to:'USA',    status:'VISA_REQUIRED',     summary:'South African citizens require a B1/B2 tourist visa for the USA.',                               fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview required'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'South Africa', to:'Spain',  status:'VISA_REQUIRED',     summary:'South African citizens require a Schengen visa for Spain.',                                      fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate or VFS Global'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'South Africa', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'South African passport holders can enter Mexico visa-free for up to 180 days.',                  fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── SOUTH KOREA ────────────────────────────────────────────────────────────
  { from:'South Korea', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'South Korean passport holders can enter Japan visa-free for up to 90 days.',                   fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'South Korea', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'South Korea is in the Visa Waiver Program. ESTA required.',                fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'South Korea', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'South Korean passport holders can visit Spain (Schengen) visa-free for up to 90 days.',      fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','ETIAS required from 2025'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'South Korea', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'South Korean passport holders can enter Mexico visa-free for up to 180 days.',                fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── SWEDEN ─────────────────────────────────────────────────────────────────
  { from:'Sweden', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'Swedish passport holders can enter Japan visa-free for up to 90 days.',                             fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Sweden', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'Sweden is in the Visa Waiver Program. ESTA required.',                           fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'Sweden', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'Swedish citizens have EU/Schengen free movement within Spain.',                                   fee:'Free', processingTime:'N/A', passportValidityMonths:6, details:['EU/Schengen free movement'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Sweden', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'Swedish passport holders can enter Mexico visa-free for up to 180 days.',                          fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── SWITZERLAND ────────────────────────────────────────────────────────────
  { from:'Switzerland', to:'Japan',  status:'VISA_NOT_REQUIRED',     summary:'Swiss passport holders can enter Japan visa-free for up to 90 days.',                          fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Switzerland', to:'USA',    status:'VISA_FREE_BUT_REQUIRED', visaType:'ESTA', summary:'Switzerland is in the Visa Waiver Program. ESTA required.',                 fee:'$21 USD', maxDays:90, processingTime:'72 hours', passportValidityMonths:6, details:['Apply ESTA at esta.cbp.dhs.gov'], sourceUrl:'https://esta.cbp.dhs.gov/', sourceLabel:'ESTA Official', lastUpdatedISO:'2024-06-15' },
  { from:'Switzerland', to:'Spain',  status:'VISA_NOT_REQUIRED',     summary:'Swiss citizens have Schengen free movement — Switzerland is a Schengen Area member (EFTA).', fee:'Free', processingTime:'N/A', passportValidityMonths:6, details:['Schengen Area member (EFTA)'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Switzerland', to:'Mexico', status:'VISA_NOT_REQUIRED',     summary:'Swiss passport holders can enter Mexico visa-free for up to 180 days.',                       fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── THAILAND ───────────────────────────────────────────────────────────────
  { from:'Thailand', to:'Japan',  status:'VISA_NOT_REQUIRED', summary:'Thai passport holders can enter Japan visa-free for up to 30 days.',                                  fee:'Free', maxDays:30, processingTime:'N/A', passportValidityMonths:6, details:['No visa required for up to 30 days'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Thailand', to:'USA',    status:'VISA_REQUIRED',     summary:'Thai citizens require a B1/B2 tourist visa for the USA.',                                            fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Thailand', to:'Spain',  status:'VISA_REQUIRED',     summary:'Thai citizens require a Schengen visa for Spain.',                                                  fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate or VFS Global'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Thailand', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Thai passport holders can enter Mexico visa-free for up to 180 days.',                               fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── TURKEY ─────────────────────────────────────────────────────────────────
  { from:'Turkey', to:'Japan',  status:'VISA_NOT_REQUIRED', summary:'Turkish passport holders can enter Japan visa-free for up to 90 days.',                                  fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Turkey', to:'USA',    status:'VISA_REQUIRED',     summary:'Turkish citizens require a B1/B2 tourist visa for the USA.',                                           fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Turkey', to:'Spain',  status:'VISA_REQUIRED',     summary:'Turkish citizens require a Schengen visa for Spain. Turkey is not in the Schengen Area.',              fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate or VFS Global','Turkey is NOT a Schengen Area member'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Turkey', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Turkish passport holders can enter Mexico visa-free for up to 180 days.',                               fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── UAE ────────────────────────────────────────────────────────────────────
  { from:'UAE', to:'Japan',  status:'VISA_NOT_REQUIRED', summary:'UAE passport holders can enter Japan visa-free for up to 90 days.',                                        fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'UAE', to:'USA',    status:'VISA_REQUIRED',     summary:'UAE citizens require a B1/B2 tourist visa for the USA.',                                                  fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'UAE', to:'Spain',  status:'VISA_NOT_REQUIRED', summary:'UAE passport holders can visit Spain (Schengen) visa-free for up to 90 days. EU-UAE visa liberalisation took effect in October 2022.', fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['Visa-free since October 2022','90 days in any 180-day Schengen period'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'UAE', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'UAE passport holders can enter Mexico visa-free for up to 180 days.',                                      fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── UKRAINE ────────────────────────────────────────────────────────────────
  { from:'Ukraine', to:'Japan',  status:'VISA_NOT_REQUIRED', summary:'Ukrainian passport holders can enter Japan visa-free for up to 90 days.',                               fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Ukraine', to:'USA',    status:'VISA_REQUIRED',     summary:'Ukrainian citizens require a B1/B2 tourist visa for the USA.',                                         fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Ukraine', to:'Spain',  status:'VISA_NOT_REQUIRED', summary:'Ukrainian passport holders can visit Spain (Schengen) visa-free for up to 90 days. Ukraine has Schengen visa-free access since 2017.', fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['Schengen visa-free since 2017','Biometric passport required','90 days in any 180-day period'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Ukraine', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Ukrainian passport holders can enter Mexico visa-free for up to 180 days.',                            fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── URUGUAY ────────────────────────────────────────────────────────────────
  { from:'Uruguay', to:'Japan',  status:'VISA_NOT_REQUIRED', summary:'Uruguayan passport holders can enter Japan visa-free for up to 90 days.',                               fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Uruguay', to:'USA',    status:'VISA_REQUIRED',     summary:'Uruguayan citizens require a B1/B2 tourist visa for the USA.',                                         fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Uruguay', to:'Spain',  status:'VISA_NOT_REQUIRED', summary:'Uruguayan passport holders can visit Spain (Schengen) visa-free for up to 90 days.',                   fee:'Free', maxDays:90, processingTime:'N/A', passportValidityMonths:6, details:['No visa required','ETIAS required from 2025'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Uruguay', to:'Mexico', status:'VISA_NOT_REQUIRED', summary:'Uruguayan passport holders can enter Mexico visa-free for up to 180 days.',                            fee:'Free', maxDays:180, processingTime:'N/A', passportValidityMonths:6, details:['No visa required'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },

  // ── VIETNAM ────────────────────────────────────────────────────────────────
  { from:'Vietnam', to:'Japan',  status:'VISA_REQUIRED', summary:'Vietnamese citizens require a visa to enter Japan. Apply at the Japanese embassy or consulate.',           fee:'~¥3,000', processingTime:'5 business days', passportValidityMonths:6, details:['Apply at Japanese embassy or consulate','Invitation letter may be required'], sourceUrl:'https://www.mofa.go.jp/', sourceLabel:'Japan MOFA', lastUpdatedISO:'2024-06-15' },
  { from:'Vietnam', to:'USA',    status:'VISA_REQUIRED', summary:'Vietnamese citizens require a B1/B2 tourist visa for the USA.',                                            fee:'$185', processingTime:'Weeks to months', passportValidityMonths:6, details:['Apply at ustraveldocs.com','DS-160 and interview'], sourceUrl:'https://travel.state.gov/', sourceLabel:'US State Dept', lastUpdatedISO:'2024-06-15' },
  { from:'Vietnam', to:'Spain',  status:'VISA_REQUIRED', summary:'Vietnamese citizens require a Schengen visa for Spain.',                                                  fee:'€90', processingTime:'2-4 weeks', passportValidityMonths:6, details:['Apply at Spanish consulate or VFS Global'], sourceUrl:'https://www.exteriores.gob.es/', sourceLabel:'Spain MAEC', lastUpdatedISO:'2024-06-15' },
  { from:'Vietnam', to:'Mexico', status:'VISA_REQUIRED', summary:'Vietnamese citizens require a visa to enter Mexico.',                                                      fee:'Check consulate', processingTime:'Weeks', passportValidityMonths:6, details:['Apply at Mexican consulate'], sourceUrl:'https://sre.gob.mx/', sourceLabel:'Mexico SRE', lastUpdatedISO:'2024-06-15' },
];

/** Convert a QuickEntry to an EntryRequirement for display */
const quickToFull = (q: QuickEntry, nationality: string, destinationCountry: string): EntryRequirement => ({
  nationality,
  destinationCountry,
  passportType: 'ordinary',
  purpose: 'tourism',
  status: q.status,
  summary: q.summary,
  visaType: q.visaType,
  fee: q.fee,
  maxStayDays: q.maxDays,
  processingTime: q.processingTime,
  passportValidityMonths: q.passportValidityMonths,
  details: q.details,
  officialSources: [{ title: q.sourceLabel, url: q.sourceUrl }],
  lastUpdatedISO: q.lastUpdatedISO,
  notes: 'This is a quick-reference entry. Always verify with official sources before travel.',
});

/** Generate a "no data" fallback pointing to IATA and Sherpa */
const generateFallback = (nationality: string, destinationCountry: string): EntryRequirement => ({
  nationality,
  destinationCountry,
  passportType: 'ordinary',
  purpose: 'tourism',
  status: 'VISA_REQUIRED',
  summary: `No pre-loaded data for ${nationality} → ${destinationCountry}. Check the official sources below to get accurate, up-to-date visa requirements.`,
  fee: 'Check official source',
  processingTime: 'Check official source',
  passportValidityMonths: 6,
  details: [
    'Visa requirements vary — always check before booking',
    'Allow enough time for processing (some visas take weeks)',
    'Ensure your passport is valid for at least 6 months beyond your return date',
    'Travel insurance is recommended for all international trips',
  ],
  officialSources: [
    { title: 'IATA Travel Centre (official airline reference)', url: 'https://www.iatatravelcentre.com/' },
    { title: `Sherpa — ${nationality} passport requirements`, url: `https://apply.joinsherpa.com/travel-restrictions?affiliateId=sherpa` },
    { title: 'Henley Passport Index', url: 'https://www.henleypassportindex.com/passport' },
  ],
  lastUpdatedISO: new Date().toISOString().slice(0, 10),
  notes: `We don't have pre-loaded data for this combination yet. The status shown (🔴) is a conservative placeholder — the actual requirement may be different. Always verify with official sources.`,
});

/** Get entry requirements for a specific combination */
export const getEntryRequirements = (
  nationality: string,
  destinationCountry: string,
  purpose: TripPurpose = 'tourism',
  passportType: PassportType = 'ordinary'
): EntryRequirement | null => {
  // 1. Check detailed entries first
  const detailed = REQUIREMENTS.find(
    r =>
      r.nationality.toLowerCase() === nationality.toLowerCase() &&
      r.destinationCountry.toLowerCase() === destinationCountry.toLowerCase() &&
      r.purpose === purpose &&
      r.passportType === passportType
  );
  if (detailed) return detailed;

  // 2. Check quick table (only for ordinary passport + tourism)
  if (passportType === 'ordinary' && purpose === 'tourism') {
    const quick = QUICK.find(
      q =>
        q.from.toLowerCase() === nationality.toLowerCase() &&
        q.to.toLowerCase() === destinationCountry.toLowerCase()
    );
    if (quick) return quickToFull(quick, nationality, destinationCountry);
  }

  // 3. Fallback — never return null, always show something useful
  return generateFallback(nationality, destinationCountry);
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
