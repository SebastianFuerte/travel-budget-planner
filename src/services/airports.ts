// src/services/airports.ts
// Major airports with IATA codes for flight search deep links

export interface Airport {
  iata: string;
  city: string;
  country: string;
  name: string;
}

export const AIRPORTS: Airport[] = [
  // ── LATIN AMERICA ─────────────────────────────────────────────────────────
  { iata: 'BOG', city: 'Bogotá',           country: 'Colombia',      name: 'El Dorado' },
  { iata: 'MDE', city: 'Medellín',         country: 'Colombia',      name: 'José M. Córdova' },
  { iata: 'CLO', city: 'Cali',             country: 'Colombia',      name: 'Alfonso B. Aragón' },
  { iata: 'CTG', city: 'Cartagena',        country: 'Colombia',      name: 'Rafael Núñez' },
  { iata: 'BAQ', city: 'Barranquilla',     country: 'Colombia',      name: 'Ernesto Cortissoz' },
  { iata: 'GRU', city: 'São Paulo',        country: 'Brazil',        name: 'Guarulhos' },
  { iata: 'GIG', city: 'Rio de Janeiro',   country: 'Brazil',        name: 'Galeão' },
  { iata: 'BSB', city: 'Brasilia',         country: 'Brazil',        name: 'Brasilia Intl' },
  { iata: 'EZE', city: 'Buenos Aires',     country: 'Argentina',     name: 'Ezeiza' },
  { iata: 'AEP', city: 'Buenos Aires',     country: 'Argentina',     name: 'Aeroparque' },
  { iata: 'SCL', city: 'Santiago',         country: 'Chile',         name: 'Arturo M. Benítez' },
  { iata: 'LIM', city: 'Lima',             country: 'Peru',          name: 'Jorge Chávez' },
  { iata: 'MEX', city: 'Ciudad de México', country: 'Mexico',        name: 'Benito Juárez' },
  { iata: 'CUN', city: 'Cancún',           country: 'Mexico',        name: 'Cancún Intl' },
  { iata: 'GDL', city: 'Guadalajara',      country: 'Mexico',        name: 'Miguel Hidalgo' },
  { iata: 'MTY', city: 'Monterrey',        country: 'Mexico',        name: 'General Mariano' },
  { iata: 'PTY', city: 'Ciudad de Panamá', country: 'Panama',        name: 'Tocumen' },
  { iata: 'SJO', city: 'San José',         country: 'Costa Rica',    name: 'Juan Santamaría' },
  { iata: 'UIO', city: 'Quito',            country: 'Ecuador',       name: 'Mariscal Sucre' },
  { iata: 'GYE', city: 'Guayaquil',        country: 'Ecuador',       name: 'José J. de Olmedo' },
  { iata: 'LPB', city: 'La Paz',           country: 'Bolivia',       name: 'El Alto' },
  { iata: 'MVD', city: 'Montevideo',       country: 'Uruguay',       name: 'Carrasco' },
  { iata: 'ASU', city: 'Asunción',         country: 'Paraguay',      name: 'Silvio Pettirossi' },
  { iata: 'CCS', city: 'Caracas',          country: 'Venezuela',     name: 'Simón Bolívar' },
  { iata: 'SDQ', city: 'Santo Domingo',    country: 'Dom. Republic', name: 'Las Américas' },
  { iata: 'HAV', city: 'La Habana',        country: 'Cuba',          name: 'José Martí' },
  { iata: 'SJU', city: 'San Juan',         country: 'Puerto Rico',   name: 'Luis Muñoz Marín' },

  // ── NORTH AMERICA ─────────────────────────────────────────────────────────
  { iata: 'JFK', city: 'New York',         country: 'USA',           name: 'John F. Kennedy' },
  { iata: 'EWR', city: 'New York',         country: 'USA',           name: 'Newark Liberty' },
  { iata: 'LGA', city: 'New York',         country: 'USA',           name: 'LaGuardia' },
  { iata: 'LAX', city: 'Los Angeles',      country: 'USA',           name: 'Los Angeles Intl' },
  { iata: 'ORD', city: 'Chicago',          country: 'USA',           name: "O'Hare" },
  { iata: 'ATL', city: 'Atlanta',          country: 'USA',           name: 'Hartsfield-Jackson' },
  { iata: 'DFW', city: 'Dallas',           country: 'USA',           name: 'Dallas/Fort Worth' },
  { iata: 'MIA', city: 'Miami',            country: 'USA',           name: 'Miami Intl' },
  { iata: 'SFO', city: 'San Francisco',    country: 'USA',           name: 'San Francisco Intl' },
  { iata: 'SEA', city: 'Seattle',          country: 'USA',           name: 'Seattle-Tacoma' },
  { iata: 'BOS', city: 'Boston',           country: 'USA',           name: 'Logan' },
  { iata: 'IAD', city: 'Washington DC',    country: 'USA',           name: 'Dulles' },
  { iata: 'DEN', city: 'Denver',           country: 'USA',           name: 'Denver Intl' },
  { iata: 'LAS', city: 'Las Vegas',        country: 'USA',           name: 'Harry Reid Intl' },
  { iata: 'MCO', city: 'Orlando',          country: 'USA',           name: 'Orlando Intl' },
  { iata: 'IAH', city: 'Houston',          country: 'USA',           name: 'George Bush' },
  { iata: 'PDX', city: 'Portland',         country: 'USA',           name: 'Portland Intl' },
  { iata: 'YYZ', city: 'Toronto',          country: 'Canada',        name: 'Pearson' },
  { iata: 'YVR', city: 'Vancouver',        country: 'Canada',        name: 'Vancouver Intl' },
  { iata: 'YUL', city: 'Montreal',         country: 'Canada',        name: 'Trudeau' },
  { iata: 'YYC', city: 'Calgary',          country: 'Canada',        name: 'Calgary Intl' },

  // ── EUROPE ────────────────────────────────────────────────────────────────
  { iata: 'LHR', city: 'Londres',          country: 'UK',            name: 'Heathrow' },
  { iata: 'LGW', city: 'Londres',          country: 'UK',            name: 'Gatwick' },
  { iata: 'STN', city: 'Londres',          country: 'UK',            name: 'Stansted' },
  { iata: 'MAN', city: 'Manchester',       country: 'UK',            name: 'Manchester Intl' },
  { iata: 'CDG', city: 'París',            country: 'Francia',       name: 'Charles de Gaulle' },
  { iata: 'ORY', city: 'París',            country: 'Francia',       name: 'Orly' },
  { iata: 'MAD', city: 'Madrid',           country: 'España',        name: 'Barajas' },
  { iata: 'BCN', city: 'Barcelona',        country: 'España',        name: 'El Prat' },
  { iata: 'AMS', city: 'Ámsterdam',        country: 'Holanda',       name: 'Schiphol' },
  { iata: 'FRA', city: 'Frankfurt',        country: 'Alemania',      name: 'Frankfurt Intl' },
  { iata: 'MUC', city: 'Múnich',           country: 'Alemania',      name: 'Munich Intl' },
  { iata: 'BER', city: 'Berlín',           country: 'Alemania',      name: 'Brandenburg' },
  { iata: 'FCO', city: 'Roma',             country: 'Italia',        name: 'Fiumicino' },
  { iata: 'MXP', city: 'Milán',            country: 'Italia',        name: 'Malpensa' },
  { iata: 'LIS', city: 'Lisboa',           country: 'Portugal',      name: 'Humberto Delgado' },
  { iata: 'OPO', city: 'Porto',            country: 'Portugal',      name: 'Francisco Sá Carneiro' },
  { iata: 'ZRH', city: 'Zúrich',           country: 'Suiza',         name: 'Zurich Intl' },
  { iata: 'GVA', city: 'Ginebra',          country: 'Suiza',         name: 'Geneva Intl' },
  { iata: 'VIE', city: 'Viena',            country: 'Austria',       name: 'Vienna Intl' },
  { iata: 'BRU', city: 'Bruselas',         country: 'Bélgica',       name: 'Brussels Airport' },
  { iata: 'CPH', city: 'Copenhague',       country: 'Dinamarca',     name: 'Copenhagen Intl' },
  { iata: 'ARN', city: 'Estocolmo',        country: 'Suecia',        name: 'Arlanda' },
  { iata: 'OSL', city: 'Oslo',             country: 'Noruega',       name: 'Gardermoen' },
  { iata: 'HEL', city: 'Helsinki',         country: 'Finlandia',     name: 'Vantaa' },
  { iata: 'WAW', city: 'Varsovia',         country: 'Polonia',       name: 'Chopin' },
  { iata: 'PRG', city: 'Praga',            country: 'Rep. Checa',    name: 'Václav Havel' },
  { iata: 'BUD', city: 'Budapest',         country: 'Hungría',       name: 'Liszt Ferenc' },
  { iata: 'ATH', city: 'Atenas',           country: 'Grecia',        name: 'Eleftherios Venizelos' },
  { iata: 'IST', city: 'Estambul',         country: 'Turquía',       name: 'Istanbul Intl' },
  { iata: 'SVO', city: 'Moscú',            country: 'Rusia',         name: 'Sheremetyevo' },
  { iata: 'LED', city: 'San Petersburgo',  country: 'Rusia',         name: 'Pulkovo' },

  // ── ASIA / PACÍFICO ───────────────────────────────────────────────────────
  { iata: 'NRT', city: 'Tokio',            country: 'Japón',         name: 'Narita' },
  { iata: 'HND', city: 'Tokio',            country: 'Japón',         name: 'Haneda' },
  { iata: 'KIX', city: 'Osaka',            country: 'Japón',         name: 'Kansai' },
  { iata: 'ICN', city: 'Seúl',             country: 'Corea del Sur', name: 'Incheon' },
  { iata: 'PEK', city: 'Pekín',            country: 'China',         name: 'Capital Intl' },
  { iata: 'PVG', city: 'Shanghái',         country: 'China',         name: 'Pudong' },
  { iata: 'CAN', city: 'Guangzhou',        country: 'China',         name: 'Baiyun' },
  { iata: 'HKG', city: 'Hong Kong',        country: 'Hong Kong',     name: 'Hong Kong Intl' },
  { iata: 'SIN', city: 'Singapur',         country: 'Singapur',      name: 'Changi' },
  { iata: 'BKK', city: 'Bangkok',          country: 'Tailandia',     name: 'Suvarnabhumi' },
  { iata: 'DMK', city: 'Bangkok',          country: 'Tailandia',     name: 'Don Mueang' },
  { iata: 'KUL', city: 'Kuala Lumpur',     country: 'Malasia',       name: 'KLIA' },
  { iata: 'CGK', city: 'Yakarta',          country: 'Indonesia',     name: 'Soekarno-Hatta' },
  { iata: 'DPS', city: 'Bali',             country: 'Indonesia',     name: 'Ngurah Rai' },
  { iata: 'MNL', city: 'Manila',           country: 'Filipinas',     name: 'Ninoy Aquino' },
  { iata: 'HAN', city: 'Hanói',            country: 'Vietnam',       name: 'Noi Bai' },
  { iata: 'SGN', city: 'Ho Chi Minh',      country: 'Vietnam',       name: 'Tan Son Nhat' },
  { iata: 'DEL', city: 'Nueva Delhi',      country: 'India',         name: 'Indira Gandhi' },
  { iata: 'BOM', city: 'Mumbai',           country: 'India',         name: 'Chhatrapati Shivaji' },
  { iata: 'BLR', city: 'Bangalore',        country: 'India',         name: 'Kempegowda' },
  { iata: 'DXB', city: 'Dubái',            country: 'UAE',           name: 'Dubai Intl' },
  { iata: 'AUH', city: 'Abu Dabi',         country: 'UAE',           name: 'Abu Dhabi Intl' },
  { iata: 'DOH', city: 'Doha',             country: 'Qatar',         name: 'Hamad Intl' },
  { iata: 'RUH', city: 'Riad',             country: 'Arabia Saudí',  name: 'King Khalid' },
  { iata: 'JED', city: 'Jeddah',           country: 'Arabia Saudí',  name: 'King Abdulaziz' },
  { iata: 'TLV', city: 'Tel Aviv',         country: 'Israel',        name: 'Ben Gurion' },

  // ── ÁFRICA ────────────────────────────────────────────────────────────────
  { iata: 'JNB', city: 'Johannesburgo',    country: 'Sudáfrica',     name: 'O.R. Tambo' },
  { iata: 'CPT', city: 'Ciudad del Cabo',  country: 'Sudáfrica',     name: 'Cape Town Intl' },
  { iata: 'CAI', city: 'El Cairo',         country: 'Egipto',        name: 'Cairo Intl' },
  { iata: 'CMN', city: 'Casablanca',       country: 'Marruecos',     name: 'Mohammed V' },
  { iata: 'NBO', city: 'Nairobi',          country: 'Kenia',         name: 'Jomo Kenyatta' },
  { iata: 'ADD', city: 'Adís Abeba',       country: 'Etiopía',       name: 'Bole' },
  { iata: 'LOS', city: 'Lagos',            country: 'Nigeria',       name: 'Murtala Muhammed' },

  // ── OCEANÍA ───────────────────────────────────────────────────────────────
  { iata: 'SYD', city: 'Sídney',           country: 'Australia',     name: 'Kingsford Smith' },
  { iata: 'MEL', city: 'Melbourne',        country: 'Australia',     name: 'Melbourne Intl' },
  { iata: 'BNE', city: 'Brisbane',         country: 'Australia',     name: 'Brisbane Intl' },
  { iata: 'PER', city: 'Perth',            country: 'Australia',     name: 'Perth Intl' },
  { iata: 'AKL', city: 'Auckland',         country: 'Nueva Zelanda', name: 'Auckland Intl' },
];

/** Returns options for SearchableSelect: label shows city + country + IATA */
export const getAirportOptions = () =>
  AIRPORTS.map(a => ({
    label: `${a.city}, ${a.country} (${a.iata})`,
    value: a.iata,
  }));

/** Get display name for an IATA code */
export const getAirportLabel = (iata: string): string => {
  const a = AIRPORTS.find(x => x.iata === iata);
  return a ? `${a.city} (${a.iata})` : iata;
};
