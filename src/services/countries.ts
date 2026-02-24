// src/services/countries.ts
// Country and city data for trip creation
// Comprehensive list: 195 UN-recognized countries + popular travel territories

export interface CountryCity {
  country: string;
  cities: string[];
}

const COUNTRY_CITIES: CountryCity[] = [
  // ===== A =====
  {
    country: 'Afghanistan',
    cities: ['Kabul', 'Herat', 'Mazar-i-Sharif', 'Kandahar', 'Bamyan'],
  },
  {
    country: 'Albania',
    cities: ['Tirana', 'Durrës', 'Vlorë', 'Berat', 'Sarandë', 'Gjirokastër'],
  },
  {
    country: 'Algeria',
    cities: ['Algiers', 'Oran', 'Constantine', 'Annaba', 'Tlemcen', 'Ghardaia'],
  },
  {
    country: 'Andorra',
    cities: ['Andorra la Vella', 'Escaldes-Engordany', 'Encamp'],
  },
  {
    country: 'Angola',
    cities: ['Luanda', 'Lubango', 'Benguela', 'Huambo', 'Namibe'],
  },
  {
    country: 'Antigua and Barbuda',
    cities: ["St. John's", 'English Harbour', 'Jolly Harbour'],
  },
  {
    country: 'Argentina',
    cities: ['Buenos Aires', 'Córdoba', 'Mendoza', 'Rosario', 'Bariloche', 'Ushuaia', 'Salta', 'Mar del Plata', 'El Calafate', 'Iguazú'],
  },
  {
    country: 'Armenia',
    cities: ['Yerevan', 'Gyumri', 'Dilijan', 'Vanadzor', 'Tatev'],
  },
  {
    country: 'Australia',
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Gold Coast', 'Cairns', 'Adelaide', 'Darwin', 'Hobart', 'Canberra'],
  },
  {
    country: 'Austria',
    cities: ['Vienna', 'Salzburg', 'Innsbruck', 'Graz', 'Hallstatt', 'Linz'],
  },
  {
    country: 'Azerbaijan',
    cities: ['Baku', 'Sheki', 'Gabala', 'Ganja', 'Lankaran'],
  },

  // ===== B =====
  {
    country: 'Bahamas',
    cities: ['Nassau', 'Freeport', 'Harbour Island', 'Exuma'],
  },
  {
    country: 'Bahrain',
    cities: ['Manama', 'Muharraq', 'Riffa'],
  },
  {
    country: 'Bangladesh',
    cities: ['Dhaka', 'Chittagong', 'Sylhet', "Cox's Bazar", 'Rajshahi'],
  },
  {
    country: 'Barbados',
    cities: ['Bridgetown', 'Speightstown', 'Holetown', 'Oistins'],
  },
  {
    country: 'Belarus',
    cities: ['Minsk', 'Brest', 'Grodno', 'Vitebsk', 'Gomel'],
  },
  {
    country: 'Belgium',
    cities: ['Brussels', 'Bruges', 'Ghent', 'Antwerp', 'Liège', 'Leuven'],
  },
  {
    country: 'Belize',
    cities: ['Belize City', 'San Ignacio', 'Ambergris Caye', 'Placencia', 'Caye Caulker'],
  },
  {
    country: 'Benin',
    cities: ['Cotonou', 'Porto-Novo', 'Ouidah', 'Abomey'],
  },
  {
    country: 'Bhutan',
    cities: ['Thimphu', 'Paro', 'Punakha', 'Bumthang'],
  },
  {
    country: 'Bolivia',
    cities: ['La Paz', 'Santa Cruz', 'Sucre', 'Cochabamba', 'Uyuni', 'Potosí'],
  },
  {
    country: 'Bosnia and Herzegovina',
    cities: ['Sarajevo', 'Mostar', 'Banja Luka', 'Trebinje', 'Jajce'],
  },
  {
    country: 'Botswana',
    cities: ['Gaborone', 'Maun', 'Kasane', 'Francistown'],
  },
  {
    country: 'Brazil',
    cities: ['São Paulo', 'Rio de Janeiro', 'Salvador', 'Brasília', 'Fortaleza', 'Recife', 'Florianópolis', 'Manaus', 'Belo Horizonte', 'Curitiba', 'Porto Alegre', 'Natal'],
  },
  {
    country: 'Brunei',
    cities: ['Bandar Seri Begawan', 'Seria', 'Tutong'],
  },
  {
    country: 'Bulgaria',
    cities: ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Veliko Tarnovo', 'Bansko'],
  },
  {
    country: 'Burkina Faso',
    cities: ['Ouagadougou', 'Bobo-Dioulasso', 'Banfora'],
  },
  {
    country: 'Burundi',
    cities: ['Bujumbura', 'Gitega', 'Rumonge'],
  },

  // ===== C =====
  {
    country: 'Cabo Verde',
    cities: ['Praia', 'Mindelo', 'Santa Maria', 'São Filipe'],
  },
  {
    country: 'Cambodia',
    cities: ['Phnom Penh', 'Siem Reap', 'Sihanoukville', 'Battambang', 'Kampot', 'Koh Rong'],
  },
  {
    country: 'Cameroon',
    cities: ['Yaoundé', 'Douala', 'Bamenda', 'Kribi', 'Limbe'],
  },
  {
    country: 'Canada',
    cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Quebec City', 'Edmonton', 'Halifax', 'Victoria', 'Winnipeg', 'Banff'],
  },
  {
    country: 'Central African Republic',
    cities: ['Bangui', 'Bambari', 'Berberati'],
  },
  {
    country: 'Chad',
    cities: ['N\'Djamena', 'Moundou', 'Abéché'],
  },
  {
    country: 'Chile',
    cities: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta', 'Punta Arenas', 'San Pedro de Atacama', 'Viña del Mar', 'Puerto Natales'],
  },
  {
    country: 'China',
    cities: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Xi\'an', 'Hangzhou', 'Guilin', 'Kunming', 'Suzhou', 'Nanjing', 'Lhasa'],
  },
  {
    country: 'Colombia',
    cities: ['Bogotá', 'Medellín', 'Cartagena', 'Cali', 'Barranquilla', 'Santa Marta', 'San Andrés', 'Pereira', 'Bucaramanga', 'Leticia'],
  },
  {
    country: 'Comoros',
    cities: ['Moroni', 'Mutsamudu', 'Fomboni'],
  },
  {
    country: 'Congo (Democratic Republic)',
    cities: ['Kinshasa', 'Lubumbashi', 'Goma', 'Bukavu', 'Kisangani'],
  },
  {
    country: 'Congo (Republic)',
    cities: ['Brazzaville', 'Pointe-Noire', 'Dolisie'],
  },
  {
    country: 'Costa Rica',
    cities: ['San José', 'Liberia', 'La Fortuna', 'Tamarindo', 'Puerto Viejo', 'Manuel Antonio', 'Monteverde', 'Jacó'],
  },
  {
    country: 'Croatia',
    cities: ['Zagreb', 'Dubrovnik', 'Split', 'Plitvice', 'Zadar', 'Rovinj', 'Hvar'],
  },
  {
    country: 'Cuba',
    cities: ['La Habana', 'Varadero', 'Trinidad', 'Santiago de Cuba', 'Viñales', 'Cienfuegos', 'Camagüey'],
  },
  {
    country: 'Cyprus',
    cities: ['Nicosia', 'Limassol', 'Paphos', 'Larnaca', 'Ayia Napa'],
  },
  {
    country: 'Czech Republic',
    cities: ['Prague', 'Brno', 'Český Krumlov', 'Karlovy Vary', 'Olomouc', 'Plzeň'],
  },
  {
    country: 'Côte d\'Ivoire',
    cities: ['Abidjan', 'Yamoussoukro', 'Grand-Bassam', 'Bouaké', 'San Pédro'],
  },

  // ===== D =====
  {
    country: 'Denmark',
    cities: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Roskilde'],
  },
  {
    country: 'Djibouti',
    cities: ['Djibouti City', 'Tadjoura', 'Ali Sabieh'],
  },
  {
    country: 'Dominica',
    cities: ['Roseau', 'Portsmouth', 'Calibishie'],
  },
  {
    country: 'Dominican Republic',
    cities: ['Santo Domingo', 'Punta Cana', 'Puerto Plata', 'La Romana', 'Samaná', 'Santiago de los Caballeros'],
  },

  // ===== E =====
  {
    country: 'East Timor',
    cities: ['Dili', 'Baucau', 'Maliana'],
  },
  {
    country: 'Ecuador',
    cities: ['Quito', 'Guayaquil', 'Cuenca', 'Galápagos', 'Baños', 'Otavalo', 'Montañita', 'Mindo'],
  },
  {
    country: 'Egypt',
    cities: ['Cairo', 'Luxor', 'Aswan', 'Sharm El-Sheikh', 'Hurghada', 'Alexandria', 'Dahab', 'Siwa'],
  },
  {
    country: 'El Salvador',
    cities: ['San Salvador', 'Santa Ana', 'El Tunco', 'Suchitoto', 'La Libertad'],
  },
  {
    country: 'Equatorial Guinea',
    cities: ['Malabo', 'Bata', 'Ebebiyín'],
  },
  {
    country: 'Eritrea',
    cities: ['Asmara', 'Massawa', 'Keren'],
  },
  {
    country: 'Estonia',
    cities: ['Tallinn', 'Tartu', 'Pärnu', 'Haapsalu', 'Kuressaare'],
  },
  {
    country: 'Eswatini',
    cities: ['Mbabane', 'Manzini', 'Ezulwini Valley'],
  },
  {
    country: 'Ethiopia',
    cities: ['Addis Ababa', 'Lalibela', 'Gondar', 'Axum', 'Bahir Dar', 'Harar'],
  },

  // ===== F =====
  {
    country: 'Fiji',
    cities: ['Suva', 'Nadi', 'Denarau', 'Savusavu', 'Coral Coast'],
  },
  {
    country: 'Finland',
    cities: ['Helsinki', 'Rovaniemi', 'Turku', 'Tampere', 'Oulu', 'Savonlinna'],
  },
  {
    country: 'France',
    cities: ['Aix-en-Provence', 'Avignon', 'Bordeaux', 'Cannes', 'Lille', 'Lyon', 'Marseille', 'Montpellier', 'Nantes', 'Nice', 'Paris', 'Rennes', 'Strasbourg', 'Toulouse'],
  },

  // ===== G =====
  {
    country: 'Gabon',
    cities: ['Libreville', 'Port-Gentil', 'Franceville', 'Lopé'],
  },
  {
    country: 'Gambia',
    cities: ['Banjul', 'Serekunda', 'Bakau'],
  },
  {
    country: 'Georgia',
    cities: ['Tbilisi', 'Batumi', 'Kutaisi', 'Mestia', 'Kazbegi', 'Sighnaghi'],
  },
  {
    country: 'Germany',
    cities: ['Berlin', 'Bremen', 'Cologne', 'Dresden', 'Düsseldorf', 'Frankfurt', 'Freiburg', 'Hamburg', 'Hannover', 'Heidelberg', 'Leipzig', 'Munich', 'Nuremberg', 'Stuttgart'],
  },
  {
    country: 'Ghana',
    cities: ['Accra', 'Kumasi', 'Cape Coast', 'Tamale', 'Elmina'],
  },
  {
    country: 'Greece',
    cities: ['Athens', 'Santorini', 'Mykonos', 'Thessaloniki', 'Crete', 'Rhodes', 'Corfu', 'Meteora', 'Zakynthos', 'Delphi'],
  },
  {
    country: 'Grenada',
    cities: ["St. George's", 'Grand Anse', 'Gouyave'],
  },
  {
    country: 'Guatemala',
    cities: ['Guatemala City', 'Antigua', 'Lake Atitlán', 'Flores', 'Tikal', 'Quetzaltenango', 'Semuc Champey'],
  },
  {
    country: 'Guinea',
    cities: ['Conakry', 'Labé', 'Kindia', 'Kankan'],
  },
  {
    country: 'Guinea-Bissau',
    cities: ['Bissau', 'Bubaque', 'Bafatá'],
  },
  {
    country: 'Guyana',
    cities: ['Georgetown', 'Bartica', 'Kaieteur', 'Lethem'],
  },

  // ===== H =====
  {
    country: 'Haiti',
    cities: ['Port-au-Prince', 'Cap-Haïtien', 'Jacmel', 'Les Cayes'],
  },
  {
    country: 'Honduras',
    cities: ['Tegucigalpa', 'San Pedro Sula', 'Roatán', 'La Ceiba', 'Copán Ruinas', 'Utila'],
  },
  {
    country: 'Hungary',
    cities: ['Budapest', 'Debrecen', 'Szeged', 'Eger', 'Pécs', 'Lake Balaton'],
  },

  // ===== I =====
  {
    country: 'Iceland',
    cities: ['Reykjavík', 'Akureyri', 'Vík', 'Húsavík', 'Ísafjörður'],
  },
  {
    country: 'India',
    cities: ['New Delhi', 'Mumbai', 'Jaipur', 'Goa', 'Bangalore', 'Kolkata', 'Agra', 'Varanasi', 'Chennai', 'Udaipur', 'Kerala', 'Hyderabad', 'Amritsar'],
  },
  {
    country: 'Indonesia',
    cities: ['Bali', 'Jakarta', 'Yogyakarta', 'Lombok', 'Bandung', 'Surabaya', 'Komodo', 'Raja Ampat', 'Labuan Bajo'],
  },
  {
    country: 'Iran',
    cities: ['Tehran', 'Isfahan', 'Shiraz', 'Yazd', 'Tabriz', 'Kerman', 'Persepolis'],
  },
  {
    country: 'Iraq',
    cities: ['Baghdad', 'Erbil', 'Basra', 'Sulaymaniyah', 'Najaf'],
  },
  {
    country: 'Ireland',
    cities: ['Dublin', 'Galway', 'Cork', 'Killarney', 'Limerick', 'Belfast'],
  },
  {
    country: 'Israel',
    cities: ['Tel Aviv', 'Jerusalem', 'Haifa', 'Eilat', 'Dead Sea', 'Nazareth'],
  },
  {
    country: 'Italy',
    cities: ['Amalfi', 'Bologna', 'Catania', 'Florence', 'Genoa', 'Milan', 'Naples', 'Palermo', 'Pisa', 'Rome', 'Siena', 'Turin', 'Venice', 'Verona'],
  },

  // ===== J =====
  {
    country: 'Jamaica',
    cities: ['Kingston', 'Montego Bay', 'Ocho Rios', 'Negril', 'Port Antonio'],
  },
  {
    country: 'Japan',
    cities: ['Tokyo', 'Osaka', 'Kyoto', 'Hiroshima', 'Sapporo', 'Fukuoka', 'Nara', 'Yokohama', 'Nagoya', 'Okinawa', 'Hakone', 'Kamakura', 'Kanazawa'],
  },
  {
    country: 'Jordan',
    cities: ['Amman', 'Petra', 'Aqaba', 'Wadi Rum', 'Dead Sea', 'Jerash'],
  },

  // ===== K =====
  {
    country: 'Kazakhstan',
    cities: ['Almaty', 'Astana', 'Shymkent', 'Turkestan', 'Charyn Canyon'],
  },
  {
    country: 'Kenya',
    cities: ['Nairobi', 'Mombasa', 'Lamu', 'Masai Mara', 'Diani Beach', 'Malindi', 'Amboseli'],
  },
  {
    country: 'Kiribati',
    cities: ['Tarawa', 'Christmas Island'],
  },
  {
    country: 'Kuwait',
    cities: ['Kuwait City', 'Hawalli', 'Salmiya', 'Jahra'],
  },
  {
    country: 'Kyrgyzstan',
    cities: ['Bishkek', 'Osh', 'Karakol', 'Issyk-Kul', 'Song-Kul'],
  },

  // ===== L =====
  {
    country: 'Laos',
    cities: ['Vientiane', 'Luang Prabang', 'Vang Vieng', 'Pakse', '4000 Islands'],
  },
  {
    country: 'Latvia',
    cities: ['Riga', 'Jūrmala', 'Sigulda', 'Cēsis', 'Liepāja'],
  },
  {
    country: 'Lebanon',
    cities: ['Beirut', 'Byblos', 'Baalbek', 'Tripoli', 'Sidon', 'Harissa'],
  },
  {
    country: 'Lesotho',
    cities: ['Maseru', 'Semonkong', 'Malealea'],
  },
  {
    country: 'Liberia',
    cities: ['Monrovia', 'Buchanan', 'Robertsport'],
  },
  {
    country: 'Libya',
    cities: ['Tripoli', 'Benghazi', 'Leptis Magna', 'Ghadames'],
  },
  {
    country: 'Liechtenstein',
    cities: ['Vaduz', 'Schaan', 'Malbun'],
  },
  {
    country: 'Lithuania',
    cities: ['Vilnius', 'Kaunas', 'Klaipėda', 'Trakai', 'Nida'],
  },
  {
    country: 'Luxembourg',
    cities: ['Luxembourg City', 'Echternach', 'Vianden', 'Clervaux'],
  },

  // ===== M =====
  {
    country: 'Madagascar',
    cities: ['Antananarivo', 'Nosy Be', 'Andasibe', 'Morondava', 'Île Sainte-Marie'],
  },
  {
    country: 'Malawi',
    cities: ['Lilongwe', 'Blantyre', 'Lake Malawi', 'Zomba'],
  },
  {
    country: 'Malaysia',
    cities: ['Kuala Lumpur', 'Penang', 'Langkawi', 'Malacca', 'Kota Kinabalu', 'Kuching', 'Ipoh', 'Cameron Highlands'],
  },
  {
    country: 'Maldives',
    cities: ['Malé', 'Maafushi', 'Hulhumalé', 'Addu City'],
  },
  {
    country: 'Mali',
    cities: ['Bamako', 'Timbuktu', 'Djenné', 'Ségou', 'Mopti'],
  },
  {
    country: 'Malta',
    cities: ['Valletta', 'Mdina', 'Gozo', 'Sliema', 'St. Julian\'s'],
  },
  {
    country: 'Marshall Islands',
    cities: ['Majuro', 'Ebeye'],
  },
  {
    country: 'Mauritania',
    cities: ['Nouakchott', 'Chinguetti', 'Atar'],
  },
  {
    country: 'Mauritius',
    cities: ['Port Louis', 'Grand Baie', 'Flic en Flac', 'Le Morne', 'Chamarel'],
  },
  {
    country: 'Mexico',
    cities: ['Mexico City', 'Cancún', 'Playa del Carmen', 'Guadalajara', 'Oaxaca', 'Puerto Vallarta', 'Monterrey', 'Mérida', 'Tulum', 'San Miguel de Allende', 'Guanajuato', 'Cabo San Lucas', 'Puebla'],
  },
  {
    country: 'Micronesia',
    cities: ['Palikir', 'Chuuk', 'Pohnpei', 'Yap'],
  },
  {
    country: 'Moldova',
    cities: ['Chișinău', 'Tiraspol', 'Orheiul Vechi', 'Soroca'],
  },
  {
    country: 'Monaco',
    cities: ['Monte Carlo', 'La Condamine', 'Fontvieille'],
  },
  {
    country: 'Mongolia',
    cities: ['Ulaanbaatar', 'Kharkhorin', 'Gobi Desert', 'Terelj', 'Khovsgol Lake'],
  },
  {
    country: 'Montenegro',
    cities: ['Podgorica', 'Kotor', 'Budva', 'Herceg Novi', 'Tivat', 'Durmitor'],
  },
  {
    country: 'Morocco',
    cities: ['Marrakech', 'Casablanca', 'Fez', 'Tangier', 'Chefchaouen', 'Rabat', 'Essaouira', 'Merzouga', 'Ouarzazate'],
  },
  {
    country: 'Mozambique',
    cities: ['Maputo', 'Tofo', 'Vilankulo', 'Bazaruto', 'Inhambane', 'Ilha de Moçambique'],
  },
  {
    country: 'Myanmar',
    cities: ['Yangon', 'Bagan', 'Mandalay', 'Inle Lake', 'Ngapali', 'Hpa-An'],
  },

  // ===== N =====
  {
    country: 'Namibia',
    cities: ['Windhoek', 'Swakopmund', 'Sossusvlei', 'Etosha', 'Walvis Bay', 'Lüderitz'],
  },
  {
    country: 'Nauru',
    cities: ['Yaren', 'Aiwo'],
  },
  {
    country: 'Nepal',
    cities: ['Kathmandu', 'Pokhara', 'Lumbini', 'Chitwan', 'Nagarkot', 'Bhaktapur'],
  },
  {
    country: 'Netherlands',
    cities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Maastricht', 'Delft', 'Haarlem'],
  },
  {
    country: 'New Zealand',
    cities: ['Auckland', 'Wellington', 'Queenstown', 'Christchurch', 'Rotorua', 'Milford Sound', 'Taupo', 'Hobbiton'],
  },
  {
    country: 'Nicaragua',
    cities: ['Managua', 'Granada', 'León', 'San Juan del Sur', 'Ometepe', 'Corn Islands'],
  },
  {
    country: 'Niger',
    cities: ['Niamey', 'Agadez', 'Zinder'],
  },
  {
    country: 'Nigeria',
    cities: ['Lagos', 'Abuja', 'Calabar', 'Benin City', 'Ibadan', 'Enugu'],
  },
  {
    country: 'North Korea',
    cities: ['Pyongyang', 'Kaesong', 'Mount Kumgang'],
  },
  {
    country: 'North Macedonia',
    cities: ['Skopje', 'Ohrid', 'Bitola', 'Mavrovo'],
  },
  {
    country: 'Norway',
    cities: ['Oslo', 'Bergen', 'Tromsø', 'Stavanger', 'Trondheim', 'Lofoten', 'Ålesund', 'Svalbard'],
  },

  // ===== O =====
  {
    country: 'Oman',
    cities: ['Muscat', 'Salalah', 'Nizwa', 'Sur', 'Jebel Akhdar', 'Wahiba Sands'],
  },

  // ===== P =====
  {
    country: 'Pakistan',
    cities: ['Islamabad', 'Lahore', 'Karachi', 'Hunza Valley', 'Peshawar', 'Swat'],
  },
  {
    country: 'Palau',
    cities: ['Koror', 'Ngerulmud', 'Rock Islands'],
  },
  {
    country: 'Palestine',
    cities: ['Ramallah', 'Bethlehem', 'Hebron', 'Jericho', 'Nablus'],
  },
  {
    country: 'Panama',
    cities: ['Panama City', 'Bocas del Toro', 'Boquete', 'San Blas', 'David', 'Santa Catalina', 'El Valle de Antón'],
  },
  {
    country: 'Papua New Guinea',
    cities: ['Port Moresby', 'Lae', 'Rabaul', 'Goroka', 'Mount Hagen'],
  },
  {
    country: 'Paraguay',
    cities: ['Asunción', 'Ciudad del Este', 'Encarnación', 'Areguá'],
  },
  {
    country: 'Peru',
    cities: ['Lima', 'Cusco', 'Arequipa', 'Machu Picchu', 'Iquitos', 'Puno', 'Huacachina', 'Trujillo', 'Nazca'],
  },
  {
    country: 'Philippines',
    cities: ['Manila', 'Cebu', 'Boracay', 'Palawan', 'Siargao', 'Baguio', 'El Nido', 'Bohol', 'Coron'],
  },
  {
    country: 'Poland',
    cities: ['Warsaw', 'Kraków', 'Gdańsk', 'Wrocław', 'Poznań', 'Toruń', 'Zakopane'],
  },
  {
    country: 'Portugal',
    cities: ['Lisbon', 'Porto', 'Faro', 'Sintra', 'Madeira', 'Azores', 'Évora', 'Lagos', 'Coimbra'],
  },

  // ===== Q =====
  {
    country: 'Qatar',
    cities: ['Doha', 'Al Wakrah', 'Al Khor', 'Lusail'],
  },

  // ===== R =====
  {
    country: 'Romania',
    cities: ['Bucharest', 'Cluj-Napoca', 'Brașov', 'Sibiu', 'Timișoara', 'Sighișoara', 'Bran'],
  },
  {
    country: 'Russia',
    cities: ['Moscow', 'Saint Petersburg', 'Kazan', 'Sochi', 'Vladivostok', 'Novosibirsk', 'Yekaterinburg', 'Irkutsk'],
  },
  {
    country: 'Rwanda',
    cities: ['Kigali', 'Musanze', 'Gisenyi', 'Nyungwe', 'Butare'],
  },

  // ===== S =====
  {
    country: 'Saint Kitts and Nevis',
    cities: ['Basseterre', 'Charlestown', 'Frigate Bay'],
  },
  {
    country: 'Saint Lucia',
    cities: ['Castries', 'Soufrière', 'Rodney Bay', 'Marigot Bay'],
  },
  {
    country: 'Saint Vincent and the Grenadines',
    cities: ['Kingstown', 'Bequia', 'Mustique', 'Tobago Cays'],
  },
  {
    country: 'Samoa',
    cities: ['Apia', 'Savai\'i', 'Lalomanu'],
  },
  {
    country: 'San Marino',
    cities: ['San Marino City', 'Borgo Maggiore', 'Serravalle'],
  },
  {
    country: 'São Tomé and Príncipe',
    cities: ['São Tomé', 'Santo Amaro', 'Príncipe'],
  },
  {
    country: 'Saudi Arabia',
    cities: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'AlUla', 'Dammam', 'Neom', 'Abha'],
  },
  {
    country: 'Senegal',
    cities: ['Dakar', 'Saint-Louis', 'Gorée Island', 'Saly', 'Casamance', 'Touba'],
  },
  {
    country: 'Serbia',
    cities: ['Belgrade', 'Novi Sad', 'Niš', 'Zlatibor', 'Subotica'],
  },
  {
    country: 'Seychelles',
    cities: ['Victoria', 'Mahé', 'Praslin', 'La Digue'],
  },
  {
    country: 'Sierra Leone',
    cities: ['Freetown', 'Bo', 'Banana Islands'],
  },
  {
    country: 'Singapore',
    cities: ['Singapore City', 'Sentosa', 'Marina Bay', 'Chinatown', 'Little India'],
  },
  {
    country: 'Slovakia',
    cities: ['Bratislava', 'Košice', 'High Tatras', 'Banská Štiavnica', 'Žilina'],
  },
  {
    country: 'Slovenia',
    cities: ['Ljubljana', 'Lake Bled', 'Piran', 'Maribor', 'Postojna', 'Soča Valley'],
  },
  {
    country: 'Solomon Islands',
    cities: ['Honiara', 'Gizo', 'Munda'],
  },
  {
    country: 'Somalia',
    cities: ['Mogadishu', 'Hargeisa', 'Berbera'],
  },
  {
    country: 'South Africa',
    cities: ['Cape Town', 'Johannesburg', 'Durban', 'Kruger National Park', 'Pretoria', 'Stellenbosch', 'Garden Route', 'Port Elizabeth'],
  },
  {
    country: 'South Korea',
    cities: ['Seoul', 'Busan', 'Jeju', 'Gyeongju', 'Incheon', 'Daegu', 'Jeonju', 'Sokcho', 'Suwon'],
  },
  {
    country: 'South Sudan',
    cities: ['Juba', 'Bor', 'Malakal'],
  },
  {
    country: 'Spain',
    cities: ['Barcelona', 'Madrid', 'Seville', 'Valencia', 'Málaga', 'Granada', 'Bilbao', 'San Sebastián', 'Ibiza', 'Palma de Mallorca', 'Toledo', 'Tenerife'],
  },
  {
    country: 'Sri Lanka',
    cities: ['Colombo', 'Kandy', 'Galle', 'Ella', 'Sigiriya', 'Trincomalee', 'Jaffna'],
  },
  {
    country: 'Sudan',
    cities: ['Khartoum', 'Port Sudan', 'Meroë', 'Wadi Halfa'],
  },
  {
    country: 'Suriname',
    cities: ['Paramaribo', 'Brownsberg', 'Galibi'],
  },
  {
    country: 'Sweden',
    cities: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Kiruna', 'Visby', 'Lund'],
  },
  {
    country: 'Switzerland',
    cities: ['Zürich', 'Geneva', 'Bern', 'Lucerne', 'Interlaken', 'Zermatt', 'Lausanne', 'Basel'],
  },
  {
    country: 'Syria',
    cities: ['Damascus', 'Aleppo', 'Palmyra', 'Homs', 'Latakia'],
  },

  // ===== T =====
  {
    country: 'Taiwan',
    cities: ['Taipei', 'Kaohsiung', 'Taichung', 'Tainan', 'Hualien', 'Jiufen', 'Sun Moon Lake', 'Kenting'],
  },
  {
    country: 'Tajikistan',
    cities: ['Dushanbe', 'Khujand', 'Pamir Highway', 'Istaravshan'],
  },
  {
    country: 'Tanzania',
    cities: ['Dar es Salaam', 'Zanzibar', 'Arusha', 'Serengeti', 'Kilimanjaro', 'Ngorongoro', 'Stone Town'],
  },
  {
    country: 'Thailand',
    cities: ['Bangkok', 'Chiang Mai', 'Phuket', 'Krabi', 'Koh Samui', 'Pattaya', 'Pai', 'Koh Phi Phi', 'Chiang Rai', 'Koh Lanta', 'Ayutthaya'],
  },
  {
    country: 'Togo',
    cities: ['Lomé', 'Kpalimé', 'Sokodé', 'Kara'],
  },
  {
    country: 'Tonga',
    cities: ['Nuku\'alofa', 'Vava\'u', 'Ha\'apai'],
  },
  {
    country: 'Trinidad and Tobago',
    cities: ['Port of Spain', 'Scarborough', 'San Fernando', 'Crown Point'],
  },
  {
    country: 'Tunisia',
    cities: ['Tunis', 'Sidi Bou Said', 'Sousse', 'Djerba', 'Carthage', 'Tozeur'],
  },
  {
    country: 'Turkey',
    cities: ['Istanbul', 'Cappadocia', 'Antalya', 'Izmir', 'Bodrum', 'Ankara', 'Pamukkale', 'Ephesus', 'Fethiye', 'Trabzon'],
  },
  {
    country: 'Turkmenistan',
    cities: ['Ashgabat', 'Merv', 'Darvaza', 'Konye-Urgench'],
  },
  {
    country: 'Tuvalu',
    cities: ['Funafuti'],
  },

  // ===== U =====
  {
    country: 'Uganda',
    cities: ['Kampala', 'Entebbe', 'Jinja', 'Bwindi', 'Fort Portal', 'Queen Elizabeth NP'],
  },
  {
    country: 'Ukraine',
    cities: ['Kyiv', 'Lviv', 'Odesa', 'Kharkiv', 'Chernivtsi', 'Kamianets-Podilskyi'],
  },
  {
    country: 'United Arab Emirates',
    cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah', 'Fujairah', 'Al Ain'],
  },
  {
    country: 'United Kingdom',
    cities: ['Bath', 'Belfast', 'Birmingham', 'Brighton', 'Bristol', 'Cambridge', 'Canterbury', 'Cardiff', 'Edinburgh', 'Glasgow', 'Inverness', 'Leeds', 'Liverpool', 'London', 'Manchester', 'Nottingham', 'Oxford', 'York'],
  },
  {
    country: 'USA',
    cities: ['Albuquerque', 'Anchorage', 'Atlanta', 'Austin', 'Baltimore', 'Boise', 'Boston', 'Buffalo', 'Charlotte', 'Chicago', 'Cincinnati', 'Cleveland', 'Columbus', 'Dallas', 'Denver', 'Detroit', 'Fort Worth', 'Honolulu', 'Houston', 'Indianapolis', 'Jacksonville', 'Kansas City', 'Las Vegas', 'Los Angeles', 'Memphis', 'Miami', 'Milwaukee', 'Minneapolis', 'Nashville', 'New Orleans', 'New York', 'Omaha', 'Orlando', 'Philadelphia', 'Phoenix', 'Pittsburgh', 'Portland', 'Raleigh', 'Richmond', 'Sacramento', 'Salt Lake City', 'San Antonio', 'San Diego', 'San Francisco', 'San Jose', 'Santa Fe', 'Savannah', 'Seattle', 'St. Louis', 'Tampa', 'Tucson', 'Washington DC'],
  },
  {
    country: 'Uruguay',
    cities: ['Montevideo', 'Punta del Este', 'Colonia del Sacramento', 'Cabo Polonio', 'José Ignacio'],
  },
  {
    country: 'Uzbekistan',
    cities: ['Tashkent', 'Samarkand', 'Bukhara', 'Khiva', 'Nukus', 'Fergana'],
  },

  // ===== V =====
  {
    country: 'Vanuatu',
    cities: ['Port Vila', 'Luganville', 'Tanna'],
  },
  {
    country: 'Vatican City',
    cities: ['Vatican City'],
  },
  {
    country: 'Venezuela',
    cities: ['Caracas', 'Mérida', 'Margarita Island', 'Canaima', 'Los Roques', 'Ciudad Bolívar'],
  },
  {
    country: 'Vietnam',
    cities: ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Hoi An', 'Ha Long Bay', 'Nha Trang', 'Phú Quốc', 'Huế', 'Sa Pa', 'Đà Lạt'],
  },

  // ===== Y =====
  {
    country: 'Yemen',
    cities: ['Sana\'a', 'Aden', 'Socotra', 'Shibam'],
  },

  // ===== Z =====
  {
    country: 'Zambia',
    cities: ['Lusaka', 'Livingstone', 'Victoria Falls', 'South Luangwa', 'Lower Zambezi'],
  },
  {
    country: 'Zimbabwe',
    cities: ['Harare', 'Victoria Falls', 'Bulawayo', 'Masvingo', 'Hwange', 'Great Zimbabwe'],
  },

  // ===== TERRITORIES & SPECIAL ADMINISTRATIVE REGIONS =====
  {
    country: 'Hong Kong',
    cities: ['Central', 'Kowloon', 'Tsim Sha Tsui', 'Lantau Island', 'Mong Kok', 'Causeway Bay'],
  },
  {
    country: 'Macau',
    cities: ['Macau Peninsula', 'Taipa', 'Cotai', 'Coloane'],
  },
  {
    country: 'Puerto Rico',
    cities: ['San Juan', 'Ponce', 'Rincón', 'Vieques', 'Culebra', 'Fajardo', 'Mayagüez'],
  },
  {
    country: 'US Virgin Islands',
    cities: ['Charlotte Amalie', 'Cruz Bay', 'Christiansted', 'Frederiksted'],
  },
  {
    country: 'British Virgin Islands',
    cities: ['Road Town', 'Tortola', 'Virgin Gorda', 'Jost Van Dyke'],
  },
  {
    country: 'French Polynesia',
    cities: ['Papeete', 'Bora Bora', 'Moorea', 'Tahiti', 'Rangiroa'],
  },
  {
    country: 'New Caledonia',
    cities: ['Nouméa', 'Île des Pins', 'Lifou'],
  },
  {
    country: 'Aruba',
    cities: ['Oranjestad', 'Palm Beach', 'San Nicolas'],
  },
  {
    country: 'Curaçao',
    cities: ['Willemstad', 'Westpunt', 'Jan Thiel'],
  },
  {
    country: 'Bermuda',
    cities: ['Hamilton', 'St. George\'s', 'Somerset'],
  },
  {
    country: 'Cayman Islands',
    cities: ['George Town', 'Seven Mile Beach', 'Rum Point'],
  },
  {
    country: 'Turks and Caicos',
    cities: ['Providenciales', 'Grand Turk', 'Cockburn Town'],
  },
  {
    country: 'Gibraltar',
    cities: ['Gibraltar City'],
  },
  {
    country: 'Guam',
    cities: ['Hagåtña', 'Tumon', 'Dededo'],
  },
  {
    country: 'Faroe Islands',
    cities: ['Tórshavn', 'Klaksvík', 'Gjógv'],
  },
  {
    country: 'Greenland',
    cities: ['Nuuk', 'Ilulissat', 'Sisimiut', 'Kangerlussuaq'],
  },
  {
    country: 'Réunion',
    cities: ['Saint-Denis', 'Saint-Pierre', 'Cilaos', 'Saint-Gilles'],
  },
  {
    country: 'Martinique',
    cities: ['Fort-de-France', 'Les Trois-Îlets', 'Saint-Pierre'],
  },
  {
    country: 'Guadeloupe',
    cities: ['Pointe-à-Pitre', 'Basse-Terre', 'Sainte-Anne', 'Les Saintes'],
  },
  {
    country: 'Cook Islands',
    cities: ['Avarua', 'Aitutaki', 'Rarotonga'],
  },
  {
    country: 'Sint Maarten',
    cities: ['Philipsburg', 'Maho Beach', 'Simpson Bay'],
  },
  {
    country: 'Saint-Martin',
    cities: ['Marigot', 'Grand Case', 'Orient Bay'],
  },
  {
    country: 'Zanzibar',
    cities: ['Stone Town', 'Nungwi', 'Paje', 'Jambiani'],
  },
  {
    country: 'Northern Mariana Islands',
    cities: ['Saipan', 'Tinian', 'Rota'],
  },
  {
    country: 'American Samoa',
    cities: ['Pago Pago', 'Tafuna'],
  },
];

/** Get all countries sorted */
export const getCountries = (): string[] => {
  return COUNTRY_CITIES.map(c => c.country).sort();
};

/** Get cities for a specific country */
export const getCitiesForCountry = (country: string): string[] => {
  const entry = COUNTRY_CITIES.find(
    c => c.country.toLowerCase() === country.toLowerCase()
  );
  return entry ? entry.cities.sort() : [];
};

/** Search countries by partial name */
export const searchCountries = (query: string): string[] => {
  if (!query.trim()) return getCountries();
  const lower = query.toLowerCase();
  return COUNTRY_CITIES
    .filter(c => c.country.toLowerCase().includes(lower))
    .map(c => c.country)
    .sort();
};

/** Search cities for a country by partial name */
export const searchCities = (country: string, query: string): string[] => {
  const cities = getCitiesForCountry(country);
  if (!query.trim()) return cities;
  const lower = query.toLowerCase();
  return cities.filter(c => c.toLowerCase().includes(lower));
};
