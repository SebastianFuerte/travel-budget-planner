// src/services/cityBudgets.ts
//
// Realistic per-day, per-person budget estimates (USD) for 50+ popular travel cities.
// Data is organized by cost tier (Budget / Mid / Comfy) with 7 spending categories.
// Values reflect 2024-2025 travel costs.

import { BudgetCategories, TravelStyle } from '../types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CityBudgetData {
  city: string;
  country: string;
  costIndex: number; // 1-5 scale (1 = very cheap, 5 = very expensive)
  budgets: Record<TravelStyle, BudgetCategories>;
}

// ---------------------------------------------------------------------------
// Helper to build a BudgetCategories object concisely
// ---------------------------------------------------------------------------

const b = (
  acc: [number, number, number],
  trans: [number, number, number],
  food: [number, number, number],
  act: [number, number, number],
  ins: [number, number, number],
  net: [number, number, number],
  ext: [number, number, number],
): BudgetCategories => ({
  accommodation: { min: acc[0], average: acc[1], max: acc[2] },
  localTransport: { min: trans[0], average: trans[1], max: trans[2] },
  food: { min: food[0], average: food[1], max: food[2] },
  activities: { min: act[0], average: act[1], max: act[2] },
  insurance: { min: ins[0], average: ins[1], max: ins[2] },
  internet: { min: net[0], average: net[1], max: net[2] },
  extras: { min: ext[0], average: ext[1], max: ext[2] },
});

// ---------------------------------------------------------------------------
// City Budget Database  (50+ cities, sorted by costIndex then alphabetically)
// ---------------------------------------------------------------------------

export const CITY_BUDGETS: CityBudgetData[] = [
  // =========================================================================
  // COST INDEX 1 -- Very Cheap
  // =========================================================================
  {
    city: 'Hanoi',
    country: 'Vietnam',
    costIndex: 1,
    budgets: {
      Budget: b([5, 8, 12],   [1, 2, 4],   [3, 5, 8],   [2, 5, 10],  [3, 5, 8],   [2, 3, 5],  [3, 5, 10]),
      Mid:    b([15, 25, 35],  [3, 6, 10],  [8, 14, 22], [8, 15, 25], [5, 8, 12],  [3, 5, 7],  [5, 12, 20]),
      Comfy:  b([40, 60, 90],  [8, 14, 22], [18, 28, 40],[15, 30, 50],[8, 12, 15], [5, 7, 10], [10, 25, 45]),
    },
  },
  {
    city: 'Siem Reap',
    country: 'Cambodia',
    costIndex: 1,
    budgets: {
      Budget: b([5, 8, 12],   [1, 2, 3],   [3, 5, 8],   [5, 10, 15], [3, 5, 8],   [2, 3, 5],  [2, 5, 10]),
      Mid:    b([15, 22, 30],  [3, 5, 8],   [8, 12, 18], [10, 20, 30],[5, 8, 12],  [3, 5, 7],  [5, 10, 18]),
      Comfy:  b([35, 55, 80],  [6, 12, 18], [15, 25, 35],[20, 35, 55],[8, 12, 15], [5, 7, 10], [10, 20, 40]),
    },
  },
  {
    city: 'Kathmandu',
    country: 'Nepal',
    costIndex: 1,
    budgets: {
      Budget: b([5, 8, 12],   [1, 2, 3],   [3, 5, 8],   [3, 6, 12],  [3, 5, 8],   [2, 3, 5],  [2, 5, 8]),
      Mid:    b([12, 20, 28],  [2, 5, 8],   [6, 10, 16], [8, 15, 25], [5, 8, 12],  [3, 5, 7],  [5, 10, 18]),
      Comfy:  b([30, 50, 75],  [5, 10, 16], [12, 22, 32],[15, 28, 45],[8, 12, 15], [5, 7, 10], [8, 18, 35]),
    },
  },
  {
    city: 'La Paz',
    country: 'Bolivia',
    costIndex: 1,
    budgets: {
      Budget: b([6, 10, 14],  [1, 2, 3],   [3, 5, 8],   [3, 6, 10],  [3, 5, 8],   [2, 3, 5],  [2, 5, 8]),
      Mid:    b([14, 22, 30],  [2, 5, 8],   [7, 12, 18], [8, 14, 22], [5, 8, 12],  [3, 5, 7],  [5, 10, 16]),
      Comfy:  b([35, 50, 70],  [5, 10, 16], [14, 22, 32],[14, 25, 40],[8, 12, 15], [5, 7, 10], [8, 18, 30]),
    },
  },
  {
    city: 'Phnom Penh',
    country: 'Cambodia',
    costIndex: 1,
    budgets: {
      Budget: b([5, 8, 12],   [1, 2, 4],   [3, 5, 8],   [2, 5, 10],  [3, 5, 8],   [2, 3, 5],  [2, 5, 10]),
      Mid:    b([14, 22, 30],  [3, 5, 8],   [7, 12, 18], [8, 15, 22], [5, 8, 12],  [3, 5, 7],  [5, 10, 18]),
      Comfy:  b([30, 48, 70],  [6, 10, 16], [14, 22, 32],[14, 25, 40],[8, 12, 15], [5, 7, 10], [8, 18, 35]),
    },
  },
  {
    city: 'Vientiane',
    country: 'Laos',
    costIndex: 1,
    budgets: {
      Budget: b([5, 7, 10],   [1, 2, 3],   [3, 5, 7],   [2, 4, 8],   [3, 5, 8],   [2, 3, 5],  [2, 4, 8]),
      Mid:    b([12, 18, 25],  [2, 4, 7],   [6, 10, 15], [6, 12, 20], [5, 8, 12],  [3, 5, 7],  [4, 8, 14]),
      Comfy:  b([28, 42, 60],  [5, 9, 14],  [12, 20, 28],[12, 22, 35],[8, 12, 15], [5, 7, 10], [7, 15, 28]),
    },
  },

  // =========================================================================
  // COST INDEX 2 -- Cheap
  // =========================================================================
  {
    city: 'Bangkok',
    country: 'Thailand',
    costIndex: 2,
    budgets: {
      Budget: b([12, 16, 22],  [2, 4, 6],   [5, 8, 12],  [5, 10, 15], [3, 5, 8],   [2, 3, 5],  [5, 8, 14]),
      Mid:    b([25, 40, 55],  [5, 10, 16], [12, 20, 28],[12, 22, 35],[5, 8, 12],  [3, 5, 7],  [8, 15, 25]),
      Comfy:  b([55, 85, 120], [10, 18, 28],[22, 35, 50],[20, 40, 60],[8, 12, 15], [5, 7, 10], [15, 30, 50]),
    },
  },
  {
    city: 'Chiang Mai',
    country: 'Thailand',
    costIndex: 2,
    budgets: {
      Budget: b([8, 12, 18],   [1, 3, 5],   [4, 7, 10],  [3, 8, 14],  [3, 5, 8],   [2, 3, 5],  [3, 6, 12]),
      Mid:    b([18, 30, 42],  [3, 7, 12],  [10, 16, 22],[10, 18, 28],[5, 8, 12],  [3, 5, 7],  [6, 12, 20]),
      Comfy:  b([42, 65, 95],  [8, 14, 22], [18, 28, 40],[18, 32, 50],[8, 12, 15], [5, 7, 10], [12, 22, 40]),
    },
  },
  {
    city: 'Ho Chi Minh City',
    country: 'Vietnam',
    costIndex: 2,
    budgets: {
      Budget: b([8, 12, 18],   [1, 3, 5],   [4, 7, 10],  [3, 7, 12],  [3, 5, 8],   [2, 3, 5],  [3, 6, 12]),
      Mid:    b([18, 28, 38],  [3, 6, 10],  [8, 14, 20], [8, 16, 25], [5, 8, 12],  [3, 5, 7],  [6, 12, 20]),
      Comfy:  b([40, 60, 85],  [7, 12, 20], [16, 26, 38],[16, 30, 48],[8, 12, 15], [5, 7, 10], [10, 22, 38]),
    },
  },
  {
    city: 'Bali',
    country: 'Indonesia',
    costIndex: 2,
    budgets: {
      Budget: b([8, 12, 18],   [2, 4, 7],   [4, 7, 10],  [5, 8, 14],  [3, 5, 8],   [2, 3, 5],  [4, 7, 12]),
      Mid:    b([22, 35, 48],  [5, 10, 16], [10, 16, 24],[10, 20, 32],[5, 8, 12],  [3, 5, 7],  [8, 14, 22]),
      Comfy:  b([50, 80, 120], [10, 18, 28],[20, 32, 48],[20, 38, 60],[8, 12, 15], [5, 7, 10], [14, 28, 48]),
    },
  },
  {
    city: 'Mexico City',
    country: 'Mexico',
    costIndex: 2,
    budgets: {
      Budget: b([12, 18, 25],  [2, 4, 6],   [5, 10, 15], [3, 8, 14],  [3, 5, 8],   [2, 3, 5],  [4, 8, 14]),
      Mid:    b([28, 42, 58],  [4, 8, 14],  [12, 20, 28],[10, 20, 30],[5, 8, 12],  [3, 5, 7],  [8, 14, 24]),
      Comfy:  b([60, 90, 130], [8, 16, 25], [22, 35, 50],[20, 38, 55],[8, 12, 15], [5, 7, 10], [14, 28, 45]),
    },
  },
  {
    city: 'Bogota',
    country: 'Colombia',
    costIndex: 2,
    budgets: {
      Budget: b([10, 15, 22],  [1, 3, 5],   [5, 8, 12],  [3, 7, 12],  [3, 5, 8],   [2, 3, 5],  [3, 6, 12]),
      Mid:    b([22, 35, 48],  [3, 7, 12],  [10, 16, 24],[8, 16, 26], [5, 8, 12],  [3, 5, 7],  [6, 12, 20]),
      Comfy:  b([48, 72, 100], [7, 14, 22], [18, 30, 42],[16, 32, 50],[8, 12, 15], [5, 7, 10], [12, 24, 40]),
    },
  },
  {
    city: 'Medellin',
    country: 'Colombia',
    costIndex: 2,
    budgets: {
      Budget: b([10, 15, 22],  [1, 3, 5],   [5, 8, 12],  [3, 8, 14],  [3, 5, 8],   [2, 3, 5],  [3, 7, 12]),
      Mid:    b([22, 35, 48],  [3, 7, 12],  [10, 16, 24],[10, 18, 28],[5, 8, 12],  [3, 5, 7],  [6, 12, 22]),
      Comfy:  b([48, 72, 100], [7, 14, 22], [18, 30, 42],[18, 35, 55],[8, 12, 15], [5, 7, 10], [12, 25, 42]),
    },
  },
  {
    city: 'Lima',
    country: 'Peru',
    costIndex: 2,
    budgets: {
      Budget: b([10, 15, 22],  [1, 3, 5],   [4, 7, 12],  [3, 7, 12],  [3, 5, 8],   [2, 3, 5],  [3, 6, 10]),
      Mid:    b([22, 34, 46],  [3, 7, 12],  [10, 16, 24],[8, 16, 26], [5, 8, 12],  [3, 5, 7],  [6, 12, 20]),
      Comfy:  b([48, 70, 95],  [7, 14, 22], [18, 28, 40],[16, 30, 48],[8, 12, 15], [5, 7, 10], [10, 22, 38]),
    },
  },
  {
    city: 'Budapest',
    country: 'Hungary',
    costIndex: 2,
    budgets: {
      Budget: b([14, 20, 28],  [2, 4, 7],   [8, 12, 18], [5, 10, 18], [3, 5, 8],   [2, 3, 5],  [5, 8, 14]),
      Mid:    b([30, 48, 65],  [5, 10, 16], [14, 22, 32],[12, 22, 35],[5, 8, 12],  [3, 5, 7],  [8, 16, 26]),
      Comfy:  b([65, 95, 130], [10, 18, 28],[25, 38, 55],[22, 40, 60],[8, 12, 15], [5, 7, 10], [15, 28, 48]),
    },
  },
  {
    city: 'Lisbon',
    country: 'Portugal',
    costIndex: 2,
    budgets: {
      Budget: b([18, 25, 32],  [3, 5, 8],   [10, 14, 20],[5, 10, 18], [3, 5, 8],   [2, 4, 6],  [5, 10, 16]),
      Mid:    b([35, 55, 75],  [5, 10, 16], [16, 24, 34],[12, 22, 35],[5, 8, 12],  [3, 5, 7],  [10, 18, 28]),
      Comfy:  b([75, 110, 150],[10, 18, 28],[28, 42, 60],[22, 40, 60],[8, 12, 15], [5, 7, 10], [16, 30, 50]),
    },
  },
  {
    city: 'Marrakech',
    country: 'Morocco',
    costIndex: 2,
    budgets: {
      Budget: b([10, 15, 22],  [1, 3, 5],   [4, 7, 12],  [3, 6, 12],  [3, 5, 8],   [2, 3, 5],  [4, 8, 14]),
      Mid:    b([25, 40, 55],  [3, 7, 12],  [10, 16, 24],[8, 16, 28], [5, 8, 12],  [3, 5, 7],  [8, 14, 24]),
      Comfy:  b([55, 85, 120], [7, 14, 22], [20, 30, 42],[16, 32, 50],[8, 12, 15], [5, 7, 10], [14, 25, 42]),
    },
  },
  {
    city: 'Belgrade',
    country: 'Serbia',
    costIndex: 2,
    budgets: {
      Budget: b([12, 18, 25],  [1, 3, 5],   [6, 10, 14], [3, 7, 12],  [3, 5, 8],   [2, 3, 5],  [4, 7, 12]),
      Mid:    b([25, 38, 52],  [3, 7, 12],  [12, 18, 26],[8, 16, 26], [5, 8, 12],  [3, 5, 7],  [7, 14, 22]),
      Comfy:  b([52, 78, 110], [7, 14, 22], [22, 32, 45],[16, 30, 48],[8, 12, 15], [5, 7, 10], [12, 24, 40]),
    },
  },
  {
    city: 'Cusco',
    country: 'Peru',
    costIndex: 2,
    budgets: {
      Budget: b([8, 12, 18],   [1, 2, 4],   [4, 7, 10],  [5, 10, 18], [3, 5, 8],   [2, 3, 5],  [3, 6, 12]),
      Mid:    b([20, 32, 44],  [3, 6, 10],  [8, 14, 22], [12, 22, 35],[5, 8, 12],  [3, 5, 7],  [6, 12, 22]),
      Comfy:  b([44, 68, 95],  [6, 12, 20], [16, 26, 38],[22, 38, 58],[8, 12, 15], [5, 7, 10], [10, 22, 38]),
    },
  },

  // =========================================================================
  // COST INDEX 3 -- Moderate
  // =========================================================================
  {
    city: 'Barcelona',
    country: 'Spain',
    costIndex: 3,
    budgets: {
      Budget: b([25, 35, 45],  [4, 7, 12],  [12, 18, 25],[8, 15, 25], [5, 8, 12],  [3, 5, 7],  [8, 14, 22]),
      Mid:    b([50, 75, 100], [8, 14, 22], [22, 32, 45],[18, 32, 48],[5, 10, 15], [4, 6, 8],  [14, 24, 38]),
      Comfy:  b([100,150,200], [14, 24, 38],[35, 55, 75],[30, 55, 80],[8, 12, 15], [5, 8, 10], [22, 40, 65]),
    },
  },
  {
    city: 'Rome',
    country: 'Italy',
    costIndex: 3,
    budgets: {
      Budget: b([28, 38, 48],  [4, 7, 12],  [12, 18, 26],[8, 15, 25], [5, 8, 12],  [3, 5, 7],  [8, 14, 22]),
      Mid:    b([55, 80, 110], [8, 14, 22], [22, 34, 48],[16, 30, 45],[5, 10, 15], [4, 6, 8],  [14, 24, 40]),
      Comfy:  b([110,160,220],[14, 24, 38], [38, 55, 78],[28, 50, 75],[8, 12, 15], [5, 8, 10], [22, 40, 65]),
    },
  },
  {
    city: 'Berlin',
    country: 'Germany',
    costIndex: 3,
    budgets: {
      Budget: b([22, 30, 40],  [4, 7, 10],  [10, 16, 24],[5, 12, 20], [5, 8, 12],  [3, 5, 7],  [6, 12, 20]),
      Mid:    b([45, 68, 90],  [7, 12, 20], [20, 30, 42],[14, 26, 40],[5, 10, 15], [4, 6, 8],  [12, 22, 35]),
      Comfy:  b([90, 130,180], [12, 22, 34],[34, 50, 70],[25, 45, 70],[8, 12, 15], [5, 8, 10], [20, 36, 58]),
    },
  },
  {
    city: 'Prague',
    country: 'Czech Republic',
    costIndex: 3,
    budgets: {
      Budget: b([20, 28, 38],  [3, 5, 8],   [8, 14, 20], [5, 10, 18], [5, 8, 12],  [3, 5, 7],  [5, 10, 18]),
      Mid:    b([40, 60, 82],  [5, 10, 16], [16, 24, 34],[12, 22, 35],[5, 10, 15], [4, 6, 8],  [10, 18, 30]),
      Comfy:  b([82, 120,165], [10, 18, 28],[28, 42, 58],[22, 40, 60],[8, 12, 15], [5, 8, 10], [18, 32, 52]),
    },
  },
  {
    city: 'Buenos Aires',
    country: 'Argentina',
    costIndex: 3,
    budgets: {
      Budget: b([15, 22, 30],  [2, 4, 7],   [8, 12, 18], [5, 10, 18], [3, 5, 8],   [3, 5, 7],  [5, 10, 16]),
      Mid:    b([32, 50, 68],  [5, 9, 14],  [14, 22, 32],[12, 22, 35],[5, 8, 12],  [4, 6, 8],  [10, 18, 28]),
      Comfy:  b([68, 100,140], [10, 18, 28],[26, 40, 55],[22, 38, 58],[8, 12, 15], [5, 8, 10], [18, 30, 50]),
    },
  },
  {
    city: 'Istanbul',
    country: 'Turkey',
    costIndex: 3,
    budgets: {
      Budget: b([18, 25, 35],  [2, 4, 7],   [8, 12, 18], [5, 10, 18], [3, 5, 8],   [2, 4, 6],  [5, 10, 16]),
      Mid:    b([38, 58, 78],  [5, 9, 14],  [14, 22, 32],[12, 22, 35],[5, 8, 12],  [3, 5, 7],  [10, 18, 28]),
      Comfy:  b([78, 115,155], [10, 18, 28],[26, 40, 55],[22, 38, 58],[8, 12, 15], [5, 7, 10], [18, 30, 50]),
    },
  },
  {
    city: 'Seoul',
    country: 'South Korea',
    costIndex: 3,
    budgets: {
      Budget: b([25, 32, 42],  [3, 5, 8],   [10, 15, 22],[5, 12, 20], [5, 8, 12],  [3, 5, 7],  [6, 12, 20]),
      Mid:    b([48, 70, 95],  [6, 10, 16], [18, 28, 38],[14, 25, 38],[5, 10, 15], [4, 6, 8],  [12, 20, 32]),
      Comfy:  b([95, 140,190], [10, 18, 28],[32, 48, 65],[25, 42, 65],[8, 12, 15], [5, 8, 10], [20, 35, 55]),
    },
  },
  {
    city: 'Taipei',
    country: 'Taiwan',
    costIndex: 3,
    budgets: {
      Budget: b([20, 28, 38],  [3, 5, 8],   [8, 12, 18], [5, 10, 18], [5, 8, 12],  [3, 5, 7],  [5, 10, 16]),
      Mid:    b([40, 62, 82],  [5, 10, 16], [16, 24, 34],[12, 22, 34],[5, 10, 15], [4, 6, 8],  [10, 18, 28]),
      Comfy:  b([82, 120,160], [10, 18, 28],[28, 42, 58],[22, 38, 58],[8, 12, 15], [5, 8, 10], [18, 30, 48]),
    },
  },
  {
    city: 'Athens',
    country: 'Greece',
    costIndex: 3,
    budgets: {
      Budget: b([22, 30, 40],  [3, 5, 8],   [10, 14, 20],[5, 10, 18], [5, 8, 12],  [3, 5, 7],  [5, 10, 16]),
      Mid:    b([42, 64, 85],  [5, 10, 16], [18, 26, 36],[12, 22, 35],[5, 10, 15], [4, 6, 8],  [10, 18, 28]),
      Comfy:  b([85, 125,170], [10, 18, 28],[30, 45, 62],[22, 38, 58],[8, 12, 15], [5, 8, 10], [18, 30, 50]),
    },
  },
  {
    city: 'Cape Town',
    country: 'South Africa',
    costIndex: 3,
    budgets: {
      Budget: b([18, 25, 35],  [3, 5, 8],   [8, 12, 18], [5, 12, 20], [3, 5, 8],   [3, 5, 7],  [5, 10, 16]),
      Mid:    b([38, 58, 78],  [6, 10, 16], [14, 22, 32],[14, 25, 40],[5, 8, 12],  [4, 6, 8],  [10, 18, 28]),
      Comfy:  b([78, 115,160], [10, 18, 28],[25, 38, 55],[25, 45, 68],[8, 12, 15], [5, 8, 10], [18, 30, 50]),
    },
  },
  {
    city: 'Dubrovnik',
    country: 'Croatia',
    costIndex: 3,
    budgets: {
      Budget: b([25, 35, 45],  [3, 5, 8],   [10, 16, 22],[5, 12, 20], [5, 8, 12],  [3, 5, 7],  [6, 12, 18]),
      Mid:    b([48, 72, 95],  [6, 10, 16], [18, 28, 40],[14, 25, 40],[5, 10, 15], [4, 6, 8],  [12, 20, 32]),
      Comfy:  b([95, 140,190], [10, 18, 28],[32, 48, 65],[25, 42, 65],[8, 12, 15], [5, 8, 10], [20, 35, 55]),
    },
  },
  {
    city: 'Cartagena',
    country: 'Colombia',
    costIndex: 3,
    budgets: {
      Budget: b([15, 22, 32],  [2, 4, 7],   [8, 12, 18], [5, 10, 18], [3, 5, 8],   [2, 4, 6],  [5, 10, 16]),
      Mid:    b([35, 52, 72],  [5, 9, 14],  [14, 22, 32],[12, 22, 35],[5, 8, 12],  [3, 5, 7],  [10, 18, 28]),
      Comfy:  b([72, 105,145], [10, 18, 26],[26, 38, 55],[22, 38, 58],[8, 12, 15], [5, 7, 10], [18, 30, 50]),
    },
  },
  {
    city: 'Krakow',
    country: 'Poland',
    costIndex: 3,
    budgets: {
      Budget: b([18, 25, 34],  [2, 4, 7],   [8, 12, 18], [4, 8, 14],  [5, 8, 12],  [3, 5, 7],  [5, 8, 14]),
      Mid:    b([36, 52, 70],  [4, 8, 14],  [14, 22, 30],[10, 18, 28],[5, 10, 15], [4, 6, 8],  [8, 16, 26]),
      Comfy:  b([70, 105,140], [8, 16, 24], [25, 38, 52],[18, 34, 50],[8, 12, 15], [5, 8, 10], [15, 28, 45]),
    },
  },
  {
    city: 'Nairobi',
    country: 'Kenya',
    costIndex: 3,
    budgets: {
      Budget: b([15, 22, 30],  [2, 4, 7],   [6, 10, 16], [5, 12, 22], [3, 5, 8],   [3, 5, 7],  [4, 8, 14]),
      Mid:    b([32, 50, 68],  [5, 9, 14],  [12, 20, 28],[14, 25, 40],[5, 8, 12],  [4, 6, 8],  [8, 16, 26]),
      Comfy:  b([68, 100,140], [10, 18, 28],[22, 35, 48],[25, 45, 70],[8, 12, 15], [5, 8, 10], [15, 28, 45]),
    },
  },

  // =========================================================================
  // COST INDEX 4 -- Expensive
  // =========================================================================
  {
    city: 'Tokyo',
    country: 'Japan',
    costIndex: 4,
    budgets: {
      Budget: b([30, 40, 55],  [8, 12, 18], [15, 22, 30],[5, 12, 22], [5, 8, 12],  [3, 5, 7],  [10, 16, 25]),
      Mid:    b([65, 95, 130], [12, 20, 30],[28, 40, 55],[16, 30, 48],[5, 10, 15], [4, 7, 10], [16, 28, 45]),
      Comfy:  b([130,190,260],[18, 30, 45], [45, 65, 90],[30, 55, 85],[8, 12, 15], [5, 8, 10], [28, 48, 75]),
    },
  },
  {
    city: 'Osaka',
    country: 'Japan',
    costIndex: 4,
    budgets: {
      Budget: b([28, 38, 50],  [6, 10, 16], [12, 20, 28],[5, 12, 20], [5, 8, 12],  [3, 5, 7],  [8, 14, 22]),
      Mid:    b([58, 85, 115], [10, 18, 28],[24, 36, 50],[14, 28, 44],[5, 10, 15], [4, 7, 10], [14, 25, 40]),
      Comfy:  b([115,170,230],[16, 28, 42], [40, 58, 80],[28, 48, 75],[8, 12, 15], [5, 8, 10], [24, 42, 65]),
    },
  },
  {
    city: 'New York',
    country: 'USA',
    costIndex: 4,
    budgets: {
      Budget: b([40, 55, 75],  [8, 12, 18], [18, 28, 38],[8, 15, 25], [5, 8, 12],  [3, 5, 8],  [10, 18, 28]),
      Mid:    b([85, 125,170], [12, 20, 30],[32, 48, 65],[20, 38, 58],[5, 10, 15], [5, 8, 10], [18, 32, 50]),
      Comfy:  b([170,250,350],[18, 30, 45], [55, 80,110],[35, 65,100],[8, 12, 15], [5, 8, 10], [30, 55, 85]),
    },
  },
  {
    city: 'London',
    country: 'United Kingdom',
    costIndex: 4,
    budgets: {
      Budget: b([35, 50, 68],  [8, 14, 20], [15, 25, 35],[8, 15, 25], [5, 8, 12],  [3, 5, 8],  [10, 16, 25]),
      Mid:    b([75, 110,150], [14, 22, 32],[28, 42, 58],[18, 35, 52],[5, 10, 15], [5, 8, 10], [16, 28, 45]),
      Comfy:  b([150,220,300],[20, 32, 48], [48, 70, 95],[32, 58, 85],[8, 12, 15], [5, 8, 10], [28, 48, 75]),
    },
  },
  {
    city: 'Paris',
    country: 'France',
    costIndex: 4,
    budgets: {
      Budget: b([35, 48, 65],  [6, 10, 16], [15, 22, 32],[8, 15, 25], [5, 8, 12],  [3, 5, 8],  [10, 16, 25]),
      Mid:    b([72, 105,140], [10, 18, 28],[28, 40, 55],[18, 32, 50],[5, 10, 15], [5, 8, 10], [16, 28, 42]),
      Comfy:  b([140,200,270],[16, 28, 42], [45, 65, 88],[30, 55, 82],[8, 12, 15], [5, 8, 10], [28, 45, 72]),
    },
  },
  {
    city: 'Sydney',
    country: 'Australia',
    costIndex: 4,
    budgets: {
      Budget: b([30, 42, 58],  [6, 10, 16], [15, 22, 32],[8, 14, 22], [5, 8, 12],  [3, 5, 8],  [8, 14, 22]),
      Mid:    b([65, 95, 130], [10, 18, 28],[26, 38, 52],[16, 30, 45],[5, 10, 15], [5, 8, 10], [14, 25, 40]),
      Comfy:  b([130,185,250],[16, 28, 42], [42, 60, 82],[28, 50, 75],[8, 12, 15], [5, 8, 10], [24, 42, 65]),
    },
  },
  {
    city: 'San Francisco',
    country: 'USA',
    costIndex: 4,
    budgets: {
      Budget: b([42, 58, 78],  [6, 10, 16], [16, 25, 35],[8, 14, 22], [5, 8, 12],  [3, 5, 8],  [10, 16, 25]),
      Mid:    b([85, 125,170], [10, 18, 28],[30, 45, 62],[18, 32, 50],[5, 10, 15], [5, 8, 10], [16, 28, 45]),
      Comfy:  b([170,250,340],[16, 28, 42], [52, 75,100],[32, 58, 85],[8, 12, 15], [5, 8, 10], [28, 50, 78]),
    },
  },
  {
    city: 'Amsterdam',
    country: 'Netherlands',
    costIndex: 4,
    budgets: {
      Budget: b([32, 45, 60],  [5, 8, 14],  [14, 20, 28],[8, 14, 22], [5, 8, 12],  [3, 5, 8],  [8, 14, 22]),
      Mid:    b([68, 100,135], [8, 15, 24], [24, 36, 50],[16, 28, 44],[5, 10, 15], [5, 8, 10], [14, 25, 40]),
      Comfy:  b([135,195,265],[14, 24, 38], [42, 60, 82],[28, 48, 72],[8, 12, 15], [5, 8, 10], [24, 42, 65]),
    },
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    costIndex: 4,
    budgets: {
      Budget: b([30, 42, 55],  [4, 7, 12],  [10, 16, 24],[8, 14, 22], [5, 8, 12],  [3, 5, 7],  [8, 14, 22]),
      Mid:    b([62, 90, 120], [8, 14, 22], [22, 32, 45],[16, 28, 44],[5, 10, 15], [4, 7, 10], [14, 25, 40]),
      Comfy:  b([120,175,240],[14, 22, 35], [38, 55, 75],[28, 48, 72],[8, 12, 15], [5, 8, 10], [24, 42, 65]),
    },
  },
  {
    city: 'Hong Kong',
    country: 'Hong Kong',
    costIndex: 4,
    budgets: {
      Budget: b([30, 42, 58],  [4, 7, 10],  [10, 16, 24],[5, 12, 20], [5, 8, 12],  [3, 5, 7],  [8, 14, 22]),
      Mid:    b([62, 92, 125], [7, 12, 20], [22, 32, 45],[14, 26, 40],[5, 10, 15], [4, 7, 10], [14, 24, 38]),
      Comfy:  b([125,180,245],[12, 20, 32], [38, 55, 75],[25, 45, 68],[8, 12, 15], [5, 8, 10], [22, 40, 62]),
    },
  },
  {
    city: 'Dubai',
    country: 'United Arab Emirates',
    costIndex: 4,
    budgets: {
      Budget: b([32, 45, 62],  [4, 8, 14],  [12, 18, 26],[8, 15, 25], [5, 8, 12],  [3, 5, 8],  [10, 16, 25]),
      Mid:    b([68, 100,140], [8, 16, 26], [22, 34, 48],[18, 32, 50],[5, 10, 15], [5, 8, 10], [16, 28, 45]),
      Comfy:  b([140,200,280],[14, 26, 40], [40, 58, 80],[30, 55, 85],[8, 12, 15], [5, 8, 10], [28, 48, 75]),
    },
  },
  {
    city: 'Stockholm',
    country: 'Sweden',
    costIndex: 4,
    budgets: {
      Budget: b([35, 48, 65],  [6, 10, 16], [15, 22, 32],[5, 12, 20], [5, 8, 12],  [3, 5, 8],  [8, 14, 22]),
      Mid:    b([72, 105,140], [10, 18, 28],[26, 38, 52],[14, 28, 42],[5, 10, 15], [5, 8, 10], [14, 25, 40]),
      Comfy:  b([140,200,270],[16, 28, 42], [42, 62, 85],[25, 48, 72],[8, 12, 15], [5, 8, 10], [24, 42, 65]),
    },
  },
  {
    city: 'Los Angeles',
    country: 'USA',
    costIndex: 4,
    budgets: {
      Budget: b([38, 52, 70],  [6, 10, 16], [15, 24, 34],[8, 14, 22], [5, 8, 12],  [3, 5, 8],  [10, 16, 25]),
      Mid:    b([78, 115,155], [10, 18, 28],[28, 42, 58],[18, 32, 50],[5, 10, 15], [5, 8, 10], [16, 28, 45]),
      Comfy:  b([155,225,310],[16, 28, 42], [48, 68, 92],[30, 55, 82],[8, 12, 15], [5, 8, 10], [28, 48, 75]),
    },
  },
  {
    city: 'Miami',
    country: 'USA',
    costIndex: 4,
    budgets: {
      Budget: b([35, 48, 65],  [5, 8, 14],  [14, 22, 32],[8, 14, 22], [5, 8, 12],  [3, 5, 8],  [10, 16, 25]),
      Mid:    b([72, 108,145], [8, 16, 25], [26, 38, 52],[16, 30, 48],[5, 10, 15], [5, 8, 10], [16, 28, 42]),
      Comfy:  b([145,210,290],[14, 25, 38], [45, 62, 85],[28, 50, 78],[8, 12, 15], [5, 8, 10], [26, 45, 70]),
    },
  },
  {
    city: 'Copenhagen',
    country: 'Denmark',
    costIndex: 4,
    budgets: {
      Budget: b([35, 48, 65],  [5, 8, 14],  [15, 22, 32],[5, 12, 20], [5, 8, 12],  [3, 5, 8],  [8, 14, 22]),
      Mid:    b([72, 105,140], [8, 16, 25], [26, 38, 52],[14, 28, 42],[5, 10, 15], [5, 8, 10], [14, 25, 40]),
      Comfy:  b([140,200,270],[14, 25, 38], [42, 60, 82],[25, 48, 72],[8, 12, 15], [5, 8, 10], [24, 42, 65]),
    },
  },
  {
    city: 'Melbourne',
    country: 'Australia',
    costIndex: 4,
    budgets: {
      Budget: b([28, 40, 55],  [5, 8, 14],  [14, 20, 28],[6, 12, 20], [5, 8, 12],  [3, 5, 8],  [8, 14, 22]),
      Mid:    b([60, 88, 120], [8, 16, 24], [24, 35, 48],[14, 28, 42],[5, 10, 15], [5, 8, 10], [14, 24, 38]),
      Comfy:  b([120,175,240],[14, 24, 38], [40, 58, 78],[26, 46, 70],[8, 12, 15], [5, 8, 10], [22, 40, 62]),
    },
  },
  {
    city: 'Toronto',
    country: 'Canada',
    costIndex: 4,
    budgets: {
      Budget: b([32, 45, 60],  [5, 8, 14],  [14, 22, 30],[6, 12, 20], [5, 8, 12],  [3, 5, 8],  [8, 14, 22]),
      Mid:    b([68, 100,135], [8, 16, 24], [26, 38, 52],[14, 28, 42],[5, 10, 15], [5, 8, 10], [14, 25, 40]),
      Comfy:  b([135,195,265],[14, 24, 38], [42, 60, 82],[26, 48, 72],[8, 12, 15], [5, 8, 10], [24, 42, 65]),
    },
  },

  // =========================================================================
  // COST INDEX 5 -- Very Expensive
  // =========================================================================
  {
    city: 'Zurich',
    country: 'Switzerland',
    costIndex: 5,
    budgets: {
      Budget: b([50, 65, 85],  [10, 16, 24],[25, 35, 48],[10, 18, 28],[5, 10, 15], [4, 6, 8],  [12, 20, 32]),
      Mid:    b([100,150,200], [16, 26, 38],[40, 58, 78],[22, 40, 60],[8, 12, 15], [5, 8, 10], [22, 38, 58]),
      Comfy:  b([200,300,400],[24, 38, 55], [65, 90,120],[38, 68,100],[10, 15, 18],[6, 10, 12], [38, 62, 95]),
    },
  },
  {
    city: 'Oslo',
    country: 'Norway',
    costIndex: 5,
    budgets: {
      Budget: b([48, 62, 80],  [8, 14, 22], [22, 32, 45],[8, 16, 25], [5, 10, 15], [4, 6, 8],  [10, 18, 28]),
      Mid:    b([95, 140,185], [14, 24, 36],[35, 52, 72],[18, 35, 55],[8, 12, 15], [5, 8, 10], [18, 32, 50]),
      Comfy:  b([185,275,370],[22, 36, 52], [58, 82,115],[32, 58, 88],[10, 15, 18],[6, 10, 12], [32, 55, 85]),
    },
  },
  {
    city: 'Reykjavik',
    country: 'Iceland',
    costIndex: 5,
    budgets: {
      Budget: b([45, 60, 78],  [8, 14, 22], [22, 32, 45],[10, 20, 32],[5, 10, 15], [4, 6, 8],  [10, 18, 28]),
      Mid:    b([90, 135,180], [14, 22, 34],[38, 55, 75],[22, 40, 62],[8, 12, 15], [5, 8, 10], [20, 35, 52]),
      Comfy:  b([180,265,355],[22, 34, 50], [60, 85,115],[38, 65, 95],[10, 15, 18],[6, 10, 12], [35, 58, 88]),
    },
  },
  {
    city: 'Monaco',
    country: 'Monaco',
    costIndex: 5,
    budgets: {
      Budget: b([60, 80, 105], [8, 14, 22], [28, 40, 55],[10, 18, 28],[5, 10, 15], [4, 6, 8],  [15, 25, 38]),
      Mid:    b([120,175,240], [14, 24, 36],[45, 65, 88],[22, 40, 62],[8, 12, 15], [5, 8, 10], [25, 42, 65]),
      Comfy:  b([240,350,480],[22, 36, 52], [72, 100,140],[40, 70,105],[10, 15, 18],[6, 10, 12], [42, 68,105]),
    },
  },
  {
    city: 'Bermuda',
    country: 'Bermuda',
    costIndex: 5,
    budgets: {
      Budget: b([55, 72, 95],  [8, 14, 22], [25, 38, 50],[8, 16, 28], [5, 10, 15], [4, 6, 8],  [12, 20, 32]),
      Mid:    b([105,155,210], [14, 22, 34],[42, 60, 82],[18, 35, 55],[8, 12, 15], [5, 8, 10], [22, 38, 55]),
      Comfy:  b([210,310,420],[22, 34, 50], [68, 95,130],[32, 58, 88],[10, 15, 18],[6, 10, 12], [38, 62, 95]),
    },
  },
  {
    city: 'Geneva',
    country: 'Switzerland',
    costIndex: 5,
    budgets: {
      Budget: b([52, 68, 88],  [10, 16, 24],[25, 36, 50],[8, 16, 26], [5, 10, 15], [4, 6, 8],  [12, 20, 32]),
      Mid:    b([105,155,210], [16, 26, 38],[42, 60, 82],[20, 38, 58],[8, 12, 15], [5, 8, 10], [22, 38, 58]),
      Comfy:  b([210,310,420],[24, 38, 55], [68, 95,130],[36, 65, 95],[10, 15, 18],[6, 10, 12], [38, 62, 95]),
    },
  },
];

// ---------------------------------------------------------------------------
// Country Cost Index fallback  (~40 countries)
// ---------------------------------------------------------------------------

export const COUNTRY_COST_INDEX: Record<string, number> = {
  // Cost Index 1 -- Very Cheap
  'Vietnam': 1,
  'Cambodia': 1,
  'Nepal': 1,
  'Bolivia': 1,
  'Laos': 1,
  'Myanmar': 1,
  'Bangladesh': 1,

  // Cost Index 2 -- Cheap
  'Thailand': 2,
  'Indonesia': 2,
  'Mexico': 2,
  'Colombia': 2,
  'Peru': 2,
  'Hungary': 2,
  'Portugal': 2,
  'Morocco': 2,
  'Serbia': 2,
  'India': 2,
  'Philippines': 2,
  'Egypt': 2,
  'Romania': 2,
  'Guatemala': 2,
  'Ecuador': 2,

  // Cost Index 3 -- Moderate
  'Spain': 3,
  'Italy': 3,
  'Germany': 3,
  'Czech Republic': 3,
  'Argentina': 3,
  'Turkey': 3,
  'South Korea': 3,
  'Taiwan': 3,
  'Greece': 3,
  'South Africa': 3,
  'Croatia': 3,
  'Poland': 3,
  'Kenya': 3,
  'Brazil': 3,
  'China': 3,
  'Malaysia': 3,
  'Chile': 3,

  // Cost Index 4 -- Expensive
  'Hong Kong': 4,
  'Japan': 4,
  'USA': 4,
  'United Kingdom': 4,
  'France': 4,
  'Australia': 4,
  'Netherlands': 4,
  'Singapore': 4,
  'United Arab Emirates': 4,
  'Sweden': 4,
  'Denmark': 4,
  'Canada': 4,
  'Ireland': 4,
  'Finland': 4,
  'New Zealand': 4,
  'Israel': 4,
  'Austria': 4,
  'Belgium': 4,

  // Cost Index 5 -- Very Expensive
  'Switzerland': 5,
  'Norway': 5,
  'Iceland': 5,
  'Monaco': 5,
  'Bermuda': 5,
  'Luxembourg': 5,
};

// ---------------------------------------------------------------------------
// Default budget (matches budgetEngine.ts createDefaultBudget -- costIndex 3)
// ---------------------------------------------------------------------------

const DEFAULT_BUDGET: BudgetCategories = {
  accommodation: { min: 30, average: 60, max: 100 },
  localTransport: { min: 10, average: 20, max: 40 },
  food: { min: 25, average: 50, max: 80 },
  activities: { min: 20, average: 50, max: 100 },
  insurance: { min: 5, average: 10, max: 15 },
  internet: { min: 2, average: 5, max: 10 },
  extras: { min: 15, average: 30, max: 60 },
};

// ---------------------------------------------------------------------------
// Cost-index to multiplier mapping
// ---------------------------------------------------------------------------

const COST_INDEX_MULTIPLIER: Record<number, number> = {
  1: 0.4,
  2: 0.7,
  3: 1.0,
  4: 1.4,
  5: 1.9,
};

// ---------------------------------------------------------------------------
// Helper: scale a BudgetCategories by a multiplier, rounding to nearest int
// ---------------------------------------------------------------------------

const scaleBudget = (base: BudgetCategories, factor: number): BudgetCategories => {
  const scale = (cat: { min: number; average: number; max: number }) => ({
    min: Math.round(cat.min * factor),
    average: Math.round(cat.average * factor),
    max: Math.round(cat.max * factor),
  });

  return {
    accommodation: scale(base.accommodation),
    localTransport: scale(base.localTransport),
    food: scale(base.food),
    activities: scale(base.activities),
    insurance: scale(base.insurance),
    internet: scale(base.internet),
    extras: scale(base.extras),
  };
};

// ---------------------------------------------------------------------------
// Helper: style-aware default budget based on cost index
// ---------------------------------------------------------------------------

const DEFAULT_STYLE_BUDGETS: Record<TravelStyle, BudgetCategories> = {
  Budget: {
    accommodation: { min: 25, average: 35, max: 45 },
    localTransport: { min: 4, average: 7, max: 12 },
    food: { min: 12, average: 18, max: 25 },
    activities: { min: 5, average: 12, max: 20 },
    insurance: { min: 5, average: 8, max: 12 },
    internet: { min: 3, average: 5, max: 7 },
    extras: { min: 6, average: 12, max: 20 },
  },
  Mid: {
    accommodation: { min: 50, average: 75, max: 100 },
    localTransport: { min: 8, average: 14, max: 22 },
    food: { min: 22, average: 32, max: 45 },
    activities: { min: 14, average: 26, max: 40 },
    insurance: { min: 5, average: 10, max: 15 },
    internet: { min: 4, average: 6, max: 8 },
    extras: { min: 12, average: 22, max: 35 },
  },
  Comfy: {
    accommodation: { min: 100, average: 150, max: 200 },
    localTransport: { min: 14, average: 24, max: 38 },
    food: { min: 35, average: 55, max: 75 },
    activities: { min: 25, average: 45, max: 70 },
    insurance: { min: 8, average: 12, max: 15 },
    internet: { min: 5, average: 8, max: 10 },
    extras: { min: 20, average: 36, max: 58 },
  },
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Get budget data for a specific city, or null if not in the database.
 * Matching is case-insensitive on both city and country.
 */
export const getCityBudget = (city: string, country: string): CityBudgetData | null => {
  const cityLower = city.toLowerCase().trim();
  const countryLower = country.toLowerCase().trim();

  return (
    CITY_BUDGETS.find(
      (entry) =>
        entry.city.toLowerCase() === cityLower &&
        entry.country.toLowerCase() === countryLower,
    ) ?? null
  );
};

/**
 * Get the cost index for a country (1-5, default 3 if unknown).
 */
export const getCountryCostIndex = (country: string): number => {
  const key = Object.keys(COUNTRY_COST_INDEX).find(
    (k) => k.toLowerCase() === country.toLowerCase().trim(),
  );
  return key ? COUNTRY_COST_INDEX[key] : 3;
};

/**
 * Get budget for a city + country + style combo.
 *
 * Resolution order:
 *  1. Exact city+country match in CITY_BUDGETS (case-insensitive)
 *  2. Country cost-index lookup -> scale the style-aware default budget
 *  3. Default cost index 3 (moderate)
 */
export const getBudgetForDestination = (
  city: string,
  country: string,
  style: TravelStyle,
): BudgetCategories => {
  // 1. Try exact city match
  const cityData = getCityBudget(city, country);
  if (cityData) {
    return cityData.budgets[style];
  }

  // 2. Fall back to country cost index + scaling
  const costIndex = getCountryCostIndex(country);
  const multiplier = COST_INDEX_MULTIPLIER[costIndex] ?? 1.0;
  const baseBudget = DEFAULT_STYLE_BUDGETS[style];

  return scaleBudget(baseBudget, multiplier);
};

/**
 * Get the cost level (1-5) for UI display ($ to $$$$$).
 */
export const getCostLevel = (city: string, country: string): number => {
  const cityData = getCityBudget(city, country);
  if (cityData) return cityData.costIndex;
  return getCountryCostIndex(country);
};

/**
 * Get a display label for the cost level.
 */
export const getCostLevelLabel = (level: number): string => {
  const labels: Record<number, string> = {
    1: 'Very Affordable',
    2: 'Affordable',
    3: 'Moderate',
    4: 'Expensive',
    5: 'Very Expensive',
  };
  return labels[level] || 'Unknown';
};

/**
 * Get dollar sign representation.
 */
export const getCostLevelDollars = (level: number): string => {
  return '$'.repeat(level);
};
