// src/services/templates.ts

import { Template, BudgetCategories } from '../types';

// ─── Budget presets per region/cost tier ────────────────────────────────────

// JAPAN (Tokyo, Osaka, Kyoto)
const japanBudgets = {
  Budget: {
    accommodation: { min: 25, average: 35, max: 50 },
    localTransport: { min: 10, average: 15, max: 25 },
    food: { min: 20, average: 30, max: 45 },
    activities: { min: 15, average: 30, max: 60 },
    insurance: { min: 3, average: 5, max: 8 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 10, average: 20, max: 40 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 50, average: 80, max: 120 },
    localTransport: { min: 15, average: 25, max: 40 },
    food: { min: 40, average: 60, max: 90 },
    activities: { min: 40, average: 70, max: 120 },
    insurance: { min: 5, average: 8, max: 12 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 30, average: 50, max: 80 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 120, average: 200, max: 350 },
    localTransport: { min: 30, average: 50, max: 80 },
    food: { min: 80, average: 120, max: 180 },
    activities: { min: 80, average: 150, max: 250 },
    insurance: { min: 8, average: 12, max: 20 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 50, average: 100, max: 200 },
  } as BudgetCategories,
};

// USA - Major cities (NYC, Miami, LA, Chicago, SF, Las Vegas)
const usaBudgets = {
  Budget: {
    accommodation: { min: 60, average: 90, max: 130 },
    localTransport: { min: 15, average: 25, max: 40 },
    food: { min: 25, average: 40, max: 60 },
    activities: { min: 20, average: 40, max: 70 },
    insurance: { min: 5, average: 8, max: 12 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 15, average: 30, max: 50 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 130, average: 180, max: 250 },
    localTransport: { min: 25, average: 40, max: 60 },
    food: { min: 50, average: 80, max: 120 },
    activities: { min: 50, average: 80, max: 150 },
    insurance: { min: 8, average: 12, max: 18 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 40, average: 70, max: 120 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 250, average: 350, max: 550 },
    localTransport: { min: 40, average: 70, max: 120 },
    food: { min: 100, average: 150, max: 250 },
    activities: { min: 100, average: 180, max: 300 },
    insurance: { min: 12, average: 18, max: 30 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 80, average: 150, max: 250 },
  } as BudgetCategories,
};

// CANADA (Toronto, Vancouver)
const canadaBudgets = {
  Budget: {
    accommodation: { min: 60, average: 85, max: 120 },
    localTransport: { min: 10, average: 18, max: 30 },
    food: { min: 25, average: 40, max: 60 },
    activities: { min: 20, average: 35, max: 65 },
    insurance: { min: 4, average: 7, max: 12 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 15, average: 28, max: 50 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 120, average: 160, max: 220 },
    localTransport: { min: 20, average: 30, max: 50 },
    food: { min: 50, average: 75, max: 110 },
    activities: { min: 40, average: 65, max: 110 },
    insurance: { min: 7, average: 10, max: 15 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 35, average: 60, max: 100 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 220, average: 320, max: 480 },
    localTransport: { min: 35, average: 60, max: 100 },
    food: { min: 90, average: 140, max: 220 },
    activities: { min: 80, average: 140, max: 230 },
    insurance: { min: 10, average: 15, max: 25 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 70, average: 120, max: 200 },
  } as BudgetCategories,
};

// MEXICO (CDMX, Cancún, Guadalajara)
const mexicoBudgets = {
  Budget: {
    accommodation: { min: 15, average: 25, max: 40 },
    localTransport: { min: 5, average: 10, max: 20 },
    food: { min: 15, average: 25, max: 40 },
    activities: { min: 10, average: 20, max: 40 },
    insurance: { min: 3, average: 5, max: 8 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 10, average: 20, max: 35 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 40, average: 60, max: 90 },
    localTransport: { min: 15, average: 25, max: 40 },
    food: { min: 30, average: 50, max: 75 },
    activities: { min: 30, average: 50, max: 80 },
    insurance: { min: 5, average: 8, max: 12 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 25, average: 40, max: 70 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 90, average: 150, max: 250 },
    localTransport: { min: 30, average: 50, max: 80 },
    food: { min: 60, average: 100, max: 150 },
    activities: { min: 60, average: 100, max: 180 },
    insurance: { min: 8, average: 12, max: 18 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 50, average: 90, max: 150 },
  } as BudgetCategories,
};

// COLOMBIA (Bogotá, Medellín, Cartagena, Cali)
const colombiaBudgets = {
  Budget: {
    accommodation: { min: 15, average: 22, max: 35 },
    localTransport: { min: 3, average: 6, max: 12 },
    food: { min: 8, average: 15, max: 25 },
    activities: { min: 8, average: 15, max: 30 },
    insurance: { min: 2, average: 4, max: 6 },
    internet: { min: 1, average: 2, max: 4 },
    extras: { min: 5, average: 12, max: 25 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 35, average: 55, max: 80 },
    localTransport: { min: 8, average: 15, max: 25 },
    food: { min: 20, average: 35, max: 55 },
    activities: { min: 20, average: 35, max: 60 },
    insurance: { min: 4, average: 6, max: 10 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 15, average: 28, max: 50 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 80, average: 120, max: 200 },
    localTransport: { min: 18, average: 30, max: 55 },
    food: { min: 45, average: 70, max: 110 },
    activities: { min: 40, average: 70, max: 130 },
    insurance: { min: 6, average: 10, max: 15 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 30, average: 60, max: 110 },
  } as BudgetCategories,
};

// BRAZIL (São Paulo, Rio de Janeiro)
const brazilBudgets = {
  Budget: {
    accommodation: { min: 20, average: 30, max: 50 },
    localTransport: { min: 5, average: 10, max: 18 },
    food: { min: 12, average: 20, max: 35 },
    activities: { min: 10, average: 20, max: 40 },
    insurance: { min: 3, average: 5, max: 8 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 8, average: 18, max: 35 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 50, average: 75, max: 110 },
    localTransport: { min: 12, average: 20, max: 35 },
    food: { min: 25, average: 45, max: 70 },
    activities: { min: 25, average: 45, max: 80 },
    insurance: { min: 5, average: 8, max: 12 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 20, average: 40, max: 70 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 110, average: 170, max: 280 },
    localTransport: { min: 25, average: 45, max: 80 },
    food: { min: 55, average: 90, max: 140 },
    activities: { min: 55, average: 95, max: 170 },
    insurance: { min: 8, average: 12, max: 20 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 45, average: 85, max: 150 },
  } as BudgetCategories,
};

// ARGENTINA (Buenos Aires)
const argentinaBudgets = {
  Budget: {
    accommodation: { min: 20, average: 30, max: 45 },
    localTransport: { min: 4, average: 8, max: 15 },
    food: { min: 10, average: 18, max: 30 },
    activities: { min: 10, average: 18, max: 35 },
    insurance: { min: 3, average: 5, max: 8 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 8, average: 16, max: 30 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 45, average: 65, max: 95 },
    localTransport: { min: 10, average: 18, max: 30 },
    food: { min: 22, average: 38, max: 60 },
    activities: { min: 22, average: 38, max: 65 },
    insurance: { min: 5, average: 8, max: 12 },
    internet: { min: 3, average: 4, max: 7 },
    extras: { min: 18, average: 32, max: 58 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 95, average: 145, max: 240 },
    localTransport: { min: 20, average: 38, max: 65 },
    food: { min: 48, average: 78, max: 125 },
    activities: { min: 45, average: 80, max: 140 },
    insurance: { min: 8, average: 12, max: 18 },
    internet: { min: 5, average: 7, max: 10 },
    extras: { min: 38, average: 70, max: 125 },
  } as BudgetCategories,
};

// PERU (Lima, Cusco)
const peruBudgets = {
  Budget: {
    accommodation: { min: 15, average: 22, max: 35 },
    localTransport: { min: 4, average: 8, max: 15 },
    food: { min: 8, average: 15, max: 25 },
    activities: { min: 10, average: 20, max: 40 },
    insurance: { min: 3, average: 5, max: 8 },
    internet: { min: 1, average: 2, max: 4 },
    extras: { min: 6, average: 14, max: 28 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 35, average: 55, max: 85 },
    localTransport: { min: 10, average: 18, max: 32 },
    food: { min: 18, average: 32, max: 55 },
    activities: { min: 25, average: 45, max: 80 },
    insurance: { min: 5, average: 7, max: 11 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 14, average: 28, max: 52 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 85, average: 130, max: 220 },
    localTransport: { min: 20, average: 38, max: 65 },
    food: { min: 40, average: 70, max: 115 },
    activities: { min: 55, average: 100, max: 180 },
    insurance: { min: 7, average: 11, max: 18 },
    internet: { min: 4, average: 6, max: 10 },
    extras: { min: 32, average: 65, max: 120 },
  } as BudgetCategories,
};

// CHILE (Santiago)
const chileBudgets = {
  Budget: {
    accommodation: { min: 25, average: 38, max: 58 },
    localTransport: { min: 5, average: 10, max: 18 },
    food: { min: 12, average: 20, max: 35 },
    activities: { min: 12, average: 22, max: 42 },
    insurance: { min: 3, average: 5, max: 8 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 8, average: 18, max: 35 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 58, average: 85, max: 130 },
    localTransport: { min: 12, average: 22, max: 38 },
    food: { min: 28, average: 48, max: 75 },
    activities: { min: 28, average: 50, max: 88 },
    insurance: { min: 5, average: 8, max: 12 },
    internet: { min: 3, average: 4, max: 7 },
    extras: { min: 22, average: 40, max: 72 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 130, average: 195, max: 320 },
    localTransport: { min: 25, average: 45, max: 80 },
    food: { min: 60, average: 100, max: 165 },
    activities: { min: 58, average: 105, max: 185 },
    insurance: { min: 8, average: 12, max: 20 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 48, average: 90, max: 160 },
  } as BudgetCategories,
};

// CENTRAL AMERICA / PANAMA / COSTA RICA
const centralAmericaBudgets = {
  Budget: {
    accommodation: { min: 30, average: 45, max: 65 },
    localTransport: { min: 6, average: 12, max: 22 },
    food: { min: 12, average: 22, max: 38 },
    activities: { min: 12, average: 25, max: 50 },
    insurance: { min: 3, average: 5, max: 8 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 8, average: 18, max: 35 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 65, average: 95, max: 145 },
    localTransport: { min: 15, average: 25, max: 45 },
    food: { min: 28, average: 48, max: 78 },
    activities: { min: 30, average: 55, max: 100 },
    insurance: { min: 5, average: 8, max: 12 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 22, average: 42, max: 78 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 145, average: 215, max: 360 },
    localTransport: { min: 30, average: 55, max: 100 },
    food: { min: 60, average: 105, max: 175 },
    activities: { min: 65, average: 120, max: 220 },
    insurance: { min: 8, average: 13, max: 22 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 50, average: 95, max: 175 },
  } as BudgetCategories,
};

// ECUADOR (Quito, Guayaquil)
const ecuadorBudgets = {
  Budget: {
    accommodation: { min: 15, average: 22, max: 35 },
    localTransport: { min: 3, average: 6, max: 12 },
    food: { min: 8, average: 14, max: 25 },
    activities: { min: 8, average: 16, max: 32 },
    insurance: { min: 2, average: 4, max: 6 },
    internet: { min: 1, average: 2, max: 4 },
    extras: { min: 5, average: 12, max: 25 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 35, average: 50, max: 78 },
    localTransport: { min: 8, average: 15, max: 28 },
    food: { min: 18, average: 30, max: 50 },
    activities: { min: 18, average: 32, max: 58 },
    insurance: { min: 4, average: 6, max: 10 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 12, average: 24, max: 46 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 78, average: 118, max: 195 },
    localTransport: { min: 18, average: 32, max: 58 },
    food: { min: 38, average: 62, max: 105 },
    activities: { min: 38, average: 68, max: 125 },
    insurance: { min: 6, average: 10, max: 15 },
    internet: { min: 4, average: 6, max: 9 },
    extras: { min: 28, average: 55, max: 105 },
  } as BudgetCategories,
};

// UK (London)
const londonBudgets = {
  Budget: {
    accommodation: { min: 50, average: 75, max: 110 },
    localTransport: { min: 10, average: 16, max: 28 },
    food: { min: 22, average: 38, max: 58 },
    activities: { min: 18, average: 35, max: 65 },
    insurance: { min: 4, average: 7, max: 11 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 15, average: 30, max: 55 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 110, average: 165, max: 240 },
    localTransport: { min: 20, average: 32, max: 52 },
    food: { min: 45, average: 75, max: 115 },
    activities: { min: 45, average: 78, max: 140 },
    insurance: { min: 7, average: 11, max: 17 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 35, average: 65, max: 115 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 240, average: 370, max: 600 },
    localTransport: { min: 38, average: 65, max: 120 },
    food: { min: 90, average: 145, max: 240 },
    activities: { min: 90, average: 160, max: 280 },
    insurance: { min: 11, average: 17, max: 28 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 75, average: 140, max: 250 },
  } as BudgetCategories,
};

// SPAIN (Barcelona, Madrid)
const spainBudgets = {
  Budget: {
    accommodation: { min: 25, average: 40, max: 60 },
    localTransport: { min: 8, average: 15, max: 25 },
    food: { min: 20, average: 35, max: 55 },
    activities: { min: 15, average: 30, max: 50 },
    insurance: { min: 4, average: 6, max: 10 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 15, average: 25, max: 45 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 60, average: 90, max: 140 },
    localTransport: { min: 20, average: 30, max: 50 },
    food: { min: 45, average: 70, max: 100 },
    activities: { min: 40, average: 65, max: 110 },
    insurance: { min: 6, average: 10, max: 15 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 35, average: 60, max: 100 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 140, average: 220, max: 350 },
    localTransport: { min: 35, average: 60, max: 100 },
    food: { min: 90, average: 140, max: 200 },
    activities: { min: 80, average: 140, max: 220 },
    insurance: { min: 10, average: 15, max: 25 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 70, average: 120, max: 200 },
  } as BudgetCategories,
};

// FRANCE (Paris)
const parisBudgets = {
  Budget: {
    accommodation: { min: 45, average: 68, max: 105 },
    localTransport: { min: 8, average: 14, max: 24 },
    food: { min: 20, average: 35, max: 58 },
    activities: { min: 18, average: 35, max: 65 },
    insurance: { min: 4, average: 7, max: 11 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 15, average: 28, max: 52 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 105, average: 158, max: 230 },
    localTransport: { min: 18, average: 28, max: 48 },
    food: { min: 45, average: 75, max: 120 },
    activities: { min: 45, average: 78, max: 138 },
    insurance: { min: 7, average: 11, max: 17 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 38, average: 68, max: 120 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 230, average: 360, max: 580 },
    localTransport: { min: 32, average: 58, max: 105 },
    food: { min: 95, average: 155, max: 260 },
    activities: { min: 90, average: 160, max: 280 },
    insurance: { min: 11, average: 17, max: 27 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 78, average: 145, max: 260 },
  } as BudgetCategories,
};

// ITALY (Rome, Venice, Milan)
const italyBudgets = {
  Budget: {
    accommodation: { min: 30, average: 48, max: 75 },
    localTransport: { min: 6, average: 12, max: 22 },
    food: { min: 18, average: 32, max: 55 },
    activities: { min: 15, average: 30, max: 58 },
    insurance: { min: 4, average: 6, max: 10 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 12, average: 24, max: 48 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 75, average: 115, max: 175 },
    localTransport: { min: 15, average: 26, max: 45 },
    food: { min: 40, average: 68, max: 105 },
    activities: { min: 38, average: 68, max: 120 },
    insurance: { min: 6, average: 10, max: 15 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 30, average: 56, max: 105 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 175, average: 275, max: 450 },
    localTransport: { min: 28, average: 52, max: 95 },
    food: { min: 85, average: 140, max: 230 },
    activities: { min: 80, average: 148, max: 255 },
    insurance: { min: 10, average: 15, max: 25 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 65, average: 125, max: 225 },
  } as BudgetCategories,
};

// PORTUGAL (Lisbon, Porto)
const portugalBudgets = {
  Budget: {
    accommodation: { min: 25, average: 38, max: 60 },
    localTransport: { min: 5, average: 10, max: 18 },
    food: { min: 14, average: 25, max: 42 },
    activities: { min: 12, average: 24, max: 48 },
    insurance: { min: 3, average: 5, max: 9 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 10, average: 20, max: 40 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 60, average: 90, max: 138 },
    localTransport: { min: 12, average: 22, max: 38 },
    food: { min: 30, average: 52, max: 85 },
    activities: { min: 28, average: 52, max: 95 },
    insurance: { min: 5, average: 8, max: 13 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 24, average: 44, max: 82 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 138, average: 215, max: 360 },
    localTransport: { min: 24, average: 45, max: 82 },
    food: { min: 65, average: 108, max: 178 },
    activities: { min: 60, average: 112, max: 198 },
    insurance: { min: 8, average: 13, max: 21 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 50, average: 95, max: 178 },
  } as BudgetCategories,
};

// NETHERLANDS (Amsterdam)
const amsterdamBudgets = {
  Budget: {
    accommodation: { min: 40, average: 62, max: 95 },
    localTransport: { min: 8, average: 14, max: 25 },
    food: { min: 22, average: 38, max: 60 },
    activities: { min: 18, average: 35, max: 65 },
    insurance: { min: 4, average: 7, max: 11 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 15, average: 28, max: 55 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 95, average: 145, max: 215 },
    localTransport: { min: 18, average: 28, max: 48 },
    food: { min: 48, average: 78, max: 122 },
    activities: { min: 42, average: 75, max: 135 },
    insurance: { min: 7, average: 11, max: 17 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 35, average: 65, max: 115 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 215, average: 335, max: 545 },
    localTransport: { min: 32, average: 58, max: 105 },
    food: { min: 95, average: 155, max: 255 },
    activities: { min: 90, average: 158, max: 278 },
    insurance: { min: 11, average: 17, max: 27 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 75, average: 140, max: 248 },
  } as BudgetCategories,
};

// GERMANY (Berlin)
const berlinBudgets = {
  Budget: {
    accommodation: { min: 28, average: 42, max: 68 },
    localTransport: { min: 7, average: 12, max: 22 },
    food: { min: 18, average: 30, max: 50 },
    activities: { min: 14, average: 28, max: 55 },
    insurance: { min: 4, average: 6, max: 10 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 12, average: 24, max: 48 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 68, average: 105, max: 160 },
    localTransport: { min: 16, average: 26, max: 44 },
    food: { min: 38, average: 62, max: 98 },
    activities: { min: 35, average: 62, max: 112 },
    insurance: { min: 6, average: 9, max: 14 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 28, average: 52, max: 98 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 160, average: 250, max: 415 },
    localTransport: { min: 28, average: 50, max: 90 },
    food: { min: 78, average: 128, max: 212 },
    activities: { min: 72, average: 132, max: 235 },
    insurance: { min: 9, average: 14, max: 23 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 60, average: 112, max: 210 },
  } as BudgetCategories,
};

// CZECH REPUBLIC (Prague)
const pragueBudgets = {
  Budget: {
    accommodation: { min: 20, average: 32, max: 52 },
    localTransport: { min: 5, average: 9, max: 16 },
    food: { min: 12, average: 22, max: 38 },
    activities: { min: 10, average: 22, max: 45 },
    insurance: { min: 3, average: 5, max: 8 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 8, average: 18, max: 38 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 52, average: 80, max: 128 },
    localTransport: { min: 12, average: 20, max: 35 },
    food: { min: 26, average: 46, max: 78 },
    activities: { min: 25, average: 48, max: 90 },
    insurance: { min: 5, average: 8, max: 12 },
    internet: { min: 3, average: 4, max: 7 },
    extras: { min: 20, average: 38, max: 75 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 128, average: 198, max: 338 },
    localTransport: { min: 22, average: 40, max: 75 },
    food: { min: 55, average: 95, max: 160 },
    activities: { min: 52, average: 102, max: 188 },
    insurance: { min: 8, average: 12, max: 19 },
    internet: { min: 5, average: 7, max: 11 },
    extras: { min: 42, average: 82, max: 158 },
  } as BudgetCategories,
};

// HUNGARY (Budapest)
const budapestBudgets = {
  Budget: {
    accommodation: { min: 18, average: 28, max: 45 },
    localTransport: { min: 4, average: 8, max: 14 },
    food: { min: 10, average: 18, max: 32 },
    activities: { min: 10, average: 20, max: 42 },
    insurance: { min: 3, average: 5, max: 8 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 7, average: 15, max: 32 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 45, average: 70, max: 112 },
    localTransport: { min: 10, average: 18, max: 32 },
    food: { min: 22, average: 40, max: 68 },
    activities: { min: 22, average: 42, max: 82 },
    insurance: { min: 5, average: 8, max: 12 },
    internet: { min: 3, average: 4, max: 7 },
    extras: { min: 16, average: 32, max: 65 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 112, average: 175, max: 295 },
    localTransport: { min: 20, average: 36, max: 68 },
    food: { min: 48, average: 82, max: 140 },
    activities: { min: 46, average: 88, max: 165 },
    insurance: { min: 8, average: 12, max: 19 },
    internet: { min: 5, average: 7, max: 11 },
    extras: { min: 36, average: 72, max: 138 },
  } as BudgetCategories,
};

// GREECE (Athens, Santorini)
const greeceBudgets = {
  Budget: {
    accommodation: { min: 25, average: 40, max: 68 },
    localTransport: { min: 5, average: 10, max: 20 },
    food: { min: 14, average: 26, max: 46 },
    activities: { min: 12, average: 24, max: 50 },
    insurance: { min: 3, average: 5, max: 9 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 10, average: 20, max: 42 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 68, average: 105, max: 168 },
    localTransport: { min: 12, average: 22, max: 40 },
    food: { min: 32, average: 55, max: 92 },
    activities: { min: 28, average: 52, max: 100 },
    insurance: { min: 5, average: 8, max: 13 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 24, average: 45, max: 88 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 168, average: 270, max: 460 },
    localTransport: { min: 22, average: 42, max: 82 },
    food: { min: 68, average: 115, max: 195 },
    activities: { min: 60, average: 112, max: 212 },
    insurance: { min: 8, average: 13, max: 22 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 52, average: 102, max: 195 },
  } as BudgetCategories,
};

// TURKEY (Istanbul)
const istanbulBudgets = {
  Budget: {
    accommodation: { min: 20, average: 32, max: 52 },
    localTransport: { min: 4, average: 8, max: 16 },
    food: { min: 8, average: 16, max: 30 },
    activities: { min: 10, average: 20, max: 42 },
    insurance: { min: 3, average: 5, max: 8 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 6, average: 14, max: 30 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 52, average: 80, max: 128 },
    localTransport: { min: 10, average: 18, max: 32 },
    food: { min: 20, average: 38, max: 65 },
    activities: { min: 24, average: 44, max: 85 },
    insurance: { min: 5, average: 8, max: 12 },
    internet: { min: 3, average: 4, max: 7 },
    extras: { min: 16, average: 30, max: 62 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 128, average: 200, max: 345 },
    localTransport: { min: 20, average: 38, max: 72 },
    food: { min: 45, average: 82, max: 145 },
    activities: { min: 50, average: 95, max: 180 },
    insurance: { min: 8, average: 12, max: 19 },
    internet: { min: 5, average: 7, max: 11 },
    extras: { min: 36, average: 72, max: 140 },
  } as BudgetCategories,
};

// SWITZERLAND (Zurich)
const zurichBudgets = {
  Budget: {
    accommodation: { min: 70, average: 105, max: 158 },
    localTransport: { min: 12, average: 20, max: 35 },
    food: { min: 30, average: 50, max: 80 },
    activities: { min: 22, average: 42, max: 80 },
    insurance: { min: 5, average: 8, max: 12 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 20, average: 38, max: 72 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 158, average: 235, max: 365 },
    localTransport: { min: 25, average: 40, max: 68 },
    food: { min: 65, average: 108, max: 168 },
    activities: { min: 55, average: 100, max: 185 },
    insurance: { min: 9, average: 14, max: 22 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 50, average: 92, max: 172 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 365, average: 545, max: 875 },
    localTransport: { min: 48, average: 82, max: 148 },
    food: { min: 135, average: 218, max: 365 },
    activities: { min: 115, average: 212, max: 385 },
    insurance: { min: 15, average: 24, max: 40 },
    internet: { min: 8, average: 12, max: 18 },
    extras: { min: 105, average: 198, max: 365 },
  } as BudgetCategories,
};

// SWEDEN (Stockholm)
const stockholmBudgets = {
  Budget: {
    accommodation: { min: 50, average: 78, max: 122 },
    localTransport: { min: 8, average: 14, max: 25 },
    food: { min: 24, average: 40, max: 65 },
    activities: { min: 18, average: 35, max: 68 },
    insurance: { min: 4, average: 7, max: 11 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 16, average: 30, max: 58 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 122, average: 182, max: 275 },
    localTransport: { min: 18, average: 28, max: 50 },
    food: { min: 50, average: 82, max: 132 },
    activities: { min: 45, average: 80, max: 148 },
    insurance: { min: 7, average: 11, max: 17 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 38, average: 70, max: 128 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 275, average: 415, max: 668 },
    localTransport: { min: 35, average: 60, max: 112 },
    food: { min: 105, average: 168, max: 278 },
    activities: { min: 95, average: 172, max: 302 },
    insurance: { min: 11, average: 17, max: 28 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 82, average: 155, max: 278 },
  } as BudgetCategories,
};

// IRELAND (Dublin)
const dublinBudgets = {
  Budget: {
    accommodation: { min: 45, average: 70, max: 108 },
    localTransport: { min: 8, average: 14, max: 25 },
    food: { min: 20, average: 36, max: 58 },
    activities: { min: 16, average: 32, max: 62 },
    insurance: { min: 4, average: 7, max: 11 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 14, average: 28, max: 55 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 108, average: 162, max: 245 },
    localTransport: { min: 18, average: 30, max: 50 },
    food: { min: 44, average: 74, max: 118 },
    activities: { min: 40, average: 72, max: 135 },
    insurance: { min: 7, average: 11, max: 17 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 34, average: 62, max: 116 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 245, average: 378, max: 612 },
    localTransport: { min: 35, average: 62, max: 115 },
    food: { min: 92, average: 150, max: 250 },
    activities: { min: 85, average: 155, max: 278 },
    insurance: { min: 11, average: 17, max: 28 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 72, average: 138, max: 252 },
  } as BudgetCategories,
};

// CROATIA (Dubrovnik)
const dubrovnikBudgets = {
  Budget: {
    accommodation: { min: 30, average: 48, max: 78 },
    localTransport: { min: 5, average: 10, max: 20 },
    food: { min: 16, average: 28, max: 48 },
    activities: { min: 14, average: 26, max: 52 },
    insurance: { min: 3, average: 6, max: 9 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 10, average: 22, max: 44 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 78, average: 118, max: 185 },
    localTransport: { min: 12, average: 22, max: 40 },
    food: { min: 34, average: 58, max: 95 },
    activities: { min: 32, average: 58, max: 108 },
    insurance: { min: 5, average: 8, max: 13 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 24, average: 46, max: 90 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 185, average: 290, max: 490 },
    localTransport: { min: 24, average: 45, max: 85 },
    food: { min: 72, average: 120, max: 202 },
    activities: { min: 68, average: 122, max: 228 },
    insurance: { min: 8, average: 13, max: 22 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 55, average: 105, max: 202 },
  } as BudgetCategories,
};

// THAILAND (Bangkok, Phuket, Chiang Mai)
const thailandBudgets = {
  Budget: {
    accommodation: { min: 12, average: 20, max: 35 },
    localTransport: { min: 4, average: 8, max: 16 },
    food: { min: 6, average: 12, max: 22 },
    activities: { min: 8, average: 18, max: 40 },
    insurance: { min: 2, average: 4, max: 7 },
    internet: { min: 1, average: 2, max: 4 },
    extras: { min: 5, average: 12, max: 26 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 35, average: 58, max: 95 },
    localTransport: { min: 10, average: 18, max: 35 },
    food: { min: 15, average: 28, max: 52 },
    activities: { min: 20, average: 40, max: 85 },
    insurance: { min: 4, average: 6, max: 10 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 12, average: 28, max: 58 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 95, average: 158, max: 275 },
    localTransport: { min: 22, average: 40, max: 78 },
    food: { min: 35, average: 65, max: 118 },
    activities: { min: 45, average: 88, max: 175 },
    insurance: { min: 6, average: 10, max: 16 },
    internet: { min: 4, average: 6, max: 10 },
    extras: { min: 30, average: 62, max: 128 },
  } as BudgetCategories,
};

// INDONESIA (Bali)
const baliBudgets = {
  Budget: {
    accommodation: { min: 18, average: 28, max: 48 },
    localTransport: { min: 5, average: 10, max: 20 },
    food: { min: 6, average: 12, max: 22 },
    activities: { min: 8, average: 18, max: 40 },
    insurance: { min: 2, average: 4, max: 7 },
    internet: { min: 1, average: 2, max: 4 },
    extras: { min: 5, average: 14, max: 30 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 48, average: 78, max: 128 },
    localTransport: { min: 12, average: 22, max: 40 },
    food: { min: 14, average: 28, max: 52 },
    activities: { min: 20, average: 40, max: 82 },
    insurance: { min: 4, average: 6, max: 10 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 14, average: 30, max: 62 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 128, average: 212, max: 380 },
    localTransport: { min: 24, average: 45, max: 85 },
    food: { min: 32, average: 62, max: 115 },
    activities: { min: 45, average: 88, max: 178 },
    insurance: { min: 6, average: 10, max: 17 },
    internet: { min: 4, average: 6, max: 10 },
    extras: { min: 35, average: 68, max: 135 },
  } as BudgetCategories,
};

// SINGAPORE
const singaporeBudgets = {
  Budget: {
    accommodation: { min: 40, average: 68, max: 108 },
    localTransport: { min: 8, average: 14, max: 25 },
    food: { min: 12, average: 22, max: 40 },
    activities: { min: 18, average: 35, max: 72 },
    insurance: { min: 4, average: 6, max: 10 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 14, average: 28, max: 58 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 108, average: 165, max: 258 },
    localTransport: { min: 16, average: 26, max: 46 },
    food: { min: 28, average: 50, max: 88 },
    activities: { min: 42, average: 80, max: 155 },
    insurance: { min: 6, average: 9, max: 14 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 35, average: 65, max: 128 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 258, average: 398, max: 648 },
    localTransport: { min: 30, average: 55, max: 102 },
    food: { min: 62, average: 108, max: 188 },
    activities: { min: 90, average: 168, max: 310 },
    insurance: { min: 10, average: 15, max: 25 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 78, average: 148, max: 275 },
  } as BudgetCategories,
};

// SOUTH KOREA (Seoul)
const seoulBudgets = {
  Budget: {
    accommodation: { min: 22, average: 36, max: 58 },
    localTransport: { min: 5, average: 9, max: 18 },
    food: { min: 10, average: 18, max: 32 },
    activities: { min: 12, average: 24, max: 50 },
    insurance: { min: 3, average: 5, max: 8 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 8, average: 18, max: 40 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 58, average: 92, max: 148 },
    localTransport: { min: 12, average: 20, max: 36 },
    food: { min: 22, average: 42, max: 72 },
    activities: { min: 28, average: 54, max: 108 },
    insurance: { min: 5, average: 8, max: 12 },
    internet: { min: 3, average: 4, max: 7 },
    extras: { min: 20, average: 42, max: 85 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 148, average: 232, max: 398 },
    localTransport: { min: 24, average: 42, max: 80 },
    food: { min: 48, average: 92, max: 162 },
    activities: { min: 60, average: 115, max: 218 },
    insurance: { min: 8, average: 12, max: 20 },
    internet: { min: 5, average: 7, max: 11 },
    extras: { min: 45, average: 90, max: 178 },
  } as BudgetCategories,
};

// VIETNAM (Ho Chi Minh City, Hanoi)
const vietnamBudgets = {
  Budget: {
    accommodation: { min: 10, average: 16, max: 28 },
    localTransport: { min: 3, average: 6, max: 12 },
    food: { min: 5, average: 10, max: 18 },
    activities: { min: 6, average: 14, max: 30 },
    insurance: { min: 2, average: 3, max: 6 },
    internet: { min: 1, average: 2, max: 3 },
    extras: { min: 4, average: 10, max: 22 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 28, average: 46, max: 80 },
    localTransport: { min: 8, average: 14, max: 26 },
    food: { min: 12, average: 24, max: 44 },
    activities: { min: 15, average: 30, max: 62 },
    insurance: { min: 3, average: 5, max: 8 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 10, average: 22, max: 48 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 80, average: 132, max: 242 },
    localTransport: { min: 18, average: 32, max: 62 },
    food: { min: 28, average: 54, max: 100 },
    activities: { min: 34, average: 66, max: 132 },
    insurance: { min: 5, average: 8, max: 14 },
    internet: { min: 4, average: 6, max: 9 },
    extras: { min: 24, average: 50, max: 102 },
  } as BudgetCategories,
};

// MALAYSIA (Kuala Lumpur)
const kualaLumpurBudgets = {
  Budget: {
    accommodation: { min: 16, average: 26, max: 44 },
    localTransport: { min: 4, average: 8, max: 16 },
    food: { min: 6, average: 12, max: 22 },
    activities: { min: 8, average: 16, max: 35 },
    insurance: { min: 2, average: 4, max: 7 },
    internet: { min: 1, average: 2, max: 4 },
    extras: { min: 5, average: 12, max: 26 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 44, average: 70, max: 115 },
    localTransport: { min: 10, average: 18, max: 34 },
    food: { min: 14, average: 28, max: 52 },
    activities: { min: 18, average: 36, max: 72 },
    insurance: { min: 4, average: 6, max: 10 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 12, average: 26, max: 55 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 115, average: 185, max: 320 },
    localTransport: { min: 20, average: 38, max: 72 },
    food: { min: 32, average: 62, max: 115 },
    activities: { min: 40, average: 78, max: 158 },
    insurance: { min: 6, average: 10, max: 16 },
    internet: { min: 4, average: 6, max: 9 },
    extras: { min: 28, average: 58, max: 118 },
  } as BudgetCategories,
};

// INDIA (Delhi, Mumbai, Goa)
const indiaBudgets = {
  Budget: {
    accommodation: { min: 10, average: 18, max: 32 },
    localTransport: { min: 3, average: 6, max: 14 },
    food: { min: 5, average: 10, max: 20 },
    activities: { min: 6, average: 14, max: 30 },
    insurance: { min: 2, average: 4, max: 6 },
    internet: { min: 1, average: 2, max: 3 },
    extras: { min: 4, average: 10, max: 22 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 32, average: 52, max: 90 },
    localTransport: { min: 8, average: 15, max: 28 },
    food: { min: 12, average: 24, max: 45 },
    activities: { min: 15, average: 30, max: 62 },
    insurance: { min: 4, average: 6, max: 9 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 10, average: 22, max: 48 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 90, average: 148, max: 268 },
    localTransport: { min: 18, average: 34, max: 65 },
    food: { min: 28, average: 55, max: 108 },
    activities: { min: 35, average: 68, max: 140 },
    insurance: { min: 6, average: 10, max: 16 },
    internet: { min: 4, average: 6, max: 9 },
    extras: { min: 25, average: 52, max: 108 },
  } as BudgetCategories,
};

// UAE (Dubai)
const dubaiBudgets = {
  Budget: {
    accommodation: { min: 45, average: 72, max: 118 },
    localTransport: { min: 8, average: 15, max: 28 },
    food: { min: 18, average: 32, max: 58 },
    activities: { min: 20, average: 42, max: 90 },
    insurance: { min: 4, average: 7, max: 11 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 15, average: 30, max: 65 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 118, average: 188, max: 308 },
    localTransport: { min: 18, average: 32, max: 60 },
    food: { min: 40, average: 72, max: 128 },
    activities: { min: 50, average: 100, max: 200 },
    insurance: { min: 7, average: 11, max: 18 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 40, average: 78, max: 158 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 308, average: 488, max: 825 },
    localTransport: { min: 38, average: 68, max: 132 },
    food: { min: 90, average: 158, max: 288 },
    activities: { min: 115, average: 222, max: 438 },
    insurance: { min: 12, average: 19, max: 32 },
    internet: { min: 8, average: 12, max: 18 },
    extras: { min: 92, average: 178, max: 348 },
  } as BudgetCategories,
};

// CHINA (Beijing, Shanghai)
const chinaBudgets = {
  Budget: {
    accommodation: { min: 22, average: 36, max: 60 },
    localTransport: { min: 4, average: 8, max: 16 },
    food: { min: 8, average: 16, max: 30 },
    activities: { min: 10, average: 22, max: 48 },
    insurance: { min: 3, average: 5, max: 8 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 8, average: 18, max: 38 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 60, average: 95, max: 158 },
    localTransport: { min: 10, average: 18, max: 35 },
    food: { min: 20, average: 40, max: 72 },
    activities: { min: 24, average: 50, max: 105 },
    insurance: { min: 5, average: 8, max: 12 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 20, average: 42, max: 85 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 158, average: 252, max: 435 },
    localTransport: { min: 22, average: 40, max: 78 },
    food: { min: 46, average: 88, max: 162 },
    activities: { min: 55, average: 110, max: 218 },
    insurance: { min: 8, average: 12, max: 20 },
    internet: { min: 6, average: 10, max: 15 },
    extras: { min: 45, average: 92, max: 185 },
  } as BudgetCategories,
};

// PHILIPPINES (Manila, Cebu)
const philippinesBudgets = {
  Budget: {
    accommodation: { min: 14, average: 24, max: 42 },
    localTransport: { min: 3, average: 7, max: 15 },
    food: { min: 5, average: 10, max: 20 },
    activities: { min: 8, average: 18, max: 38 },
    insurance: { min: 2, average: 4, max: 7 },
    internet: { min: 1, average: 2, max: 4 },
    extras: { min: 5, average: 12, max: 26 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 42, average: 68, max: 115 },
    localTransport: { min: 8, average: 16, max: 30 },
    food: { min: 12, average: 24, max: 45 },
    activities: { min: 20, average: 40, max: 80 },
    insurance: { min: 4, average: 6, max: 10 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 12, average: 26, max: 55 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 115, average: 185, max: 325 },
    localTransport: { min: 18, average: 35, max: 68 },
    food: { min: 28, average: 55, max: 108 },
    activities: { min: 45, average: 88, max: 178 },
    insurance: { min: 6, average: 10, max: 16 },
    internet: { min: 4, average: 6, max: 10 },
    extras: { min: 28, average: 58, max: 120 },
  } as BudgetCategories,
};

// CAMBODIA (Siem Reap)
const siemReapBudgets = {
  Budget: {
    accommodation: { min: 8, average: 14, max: 26 },
    localTransport: { min: 3, average: 6, max: 12 },
    food: { min: 4, average: 8, max: 16 },
    activities: { min: 6, average: 14, max: 30 },
    insurance: { min: 2, average: 3, max: 6 },
    internet: { min: 1, average: 2, max: 3 },
    extras: { min: 3, average: 8, max: 18 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 26, average: 42, max: 75 },
    localTransport: { min: 7, average: 14, max: 26 },
    food: { min: 10, average: 20, max: 38 },
    activities: { min: 15, average: 30, max: 62 },
    insurance: { min: 3, average: 5, max: 8 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 8, average: 18, max: 40 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 75, average: 120, max: 215 },
    localTransport: { min: 15, average: 28, max: 55 },
    food: { min: 22, average: 44, max: 88 },
    activities: { min: 32, average: 65, max: 135 },
    insurance: { min: 5, average: 8, max: 13 },
    internet: { min: 4, average: 6, max: 9 },
    extras: { min: 20, average: 42, max: 88 },
  } as BudgetCategories,
};

// NEPAL (Kathmandu)
const katmanduBudgets = {
  Budget: {
    accommodation: { min: 8, average: 14, max: 25 },
    localTransport: { min: 2, average: 5, max: 10 },
    food: { min: 4, average: 8, max: 16 },
    activities: { min: 8, average: 18, max: 40 },
    insurance: { min: 3, average: 5, max: 9 },
    internet: { min: 1, average: 2, max: 4 },
    extras: { min: 3, average: 8, max: 18 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 25, average: 40, max: 72 },
    localTransport: { min: 6, average: 12, max: 22 },
    food: { min: 10, average: 20, max: 38 },
    activities: { min: 20, average: 40, max: 85 },
    insurance: { min: 5, average: 8, max: 14 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 8, average: 18, max: 40 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 72, average: 118, max: 215 },
    localTransport: { min: 14, average: 26, max: 52 },
    food: { min: 24, average: 46, max: 90 },
    activities: { min: 45, average: 88, max: 178 },
    insurance: { min: 9, average: 15, max: 25 },
    internet: { min: 4, average: 6, max: 10 },
    extras: { min: 20, average: 42, max: 90 },
  } as BudgetCategories,
};

// AUSTRALIA (Sydney, Melbourne)
const australiaBudgets = {
  Budget: {
    accommodation: { min: 55, average: 82, max: 128 },
    localTransport: { min: 10, average: 17, max: 30 },
    food: { min: 22, average: 38, max: 62 },
    activities: { min: 20, average: 38, max: 72 },
    insurance: { min: 4, average: 7, max: 11 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 16, average: 30, max: 58 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 128, average: 192, max: 302 },
    localTransport: { min: 22, average: 35, max: 60 },
    food: { min: 48, average: 80, max: 132 },
    activities: { min: 46, average: 82, max: 158 },
    insurance: { min: 7, average: 11, max: 17 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 38, average: 70, max: 132 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 302, average: 462, max: 752 },
    localTransport: { min: 40, average: 70, max: 132 },
    food: { min: 100, average: 165, max: 278 },
    activities: { min: 98, average: 178, max: 318 },
    insurance: { min: 11, average: 18, max: 30 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 82, average: 155, max: 285 },
  } as BudgetCategories,
};

// NEW ZEALAND (Auckland)
const aucklandBudgets = {
  Budget: {
    accommodation: { min: 48, average: 72, max: 115 },
    localTransport: { min: 9, average: 15, max: 28 },
    food: { min: 20, average: 34, max: 58 },
    activities: { min: 18, average: 36, max: 68 },
    insurance: { min: 4, average: 7, max: 11 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 14, average: 27, max: 54 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 115, average: 172, max: 272 },
    localTransport: { min: 20, average: 32, max: 55 },
    food: { min: 44, average: 74, max: 122 },
    activities: { min: 42, average: 76, max: 148 },
    insurance: { min: 7, average: 11, max: 17 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 34, average: 64, max: 122 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 272, average: 418, max: 685 },
    localTransport: { min: 37, average: 65, max: 122 },
    food: { min: 92, average: 152, max: 258 },
    activities: { min: 90, average: 165, max: 298 },
    insurance: { min: 11, average: 17, max: 28 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 75, average: 142, max: 268 },
  } as BudgetCategories,
};

// MOROCCO (Marrakech)
const marrakechBudgets = {
  Budget: {
    accommodation: { min: 18, average: 28, max: 48 },
    localTransport: { min: 3, average: 7, max: 15 },
    food: { min: 6, average: 12, max: 24 },
    activities: { min: 8, average: 18, max: 40 },
    insurance: { min: 2, average: 4, max: 7 },
    internet: { min: 1, average: 2, max: 4 },
    extras: { min: 5, average: 12, max: 28 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 48, average: 78, max: 128 },
    localTransport: { min: 8, average: 16, max: 32 },
    food: { min: 14, average: 28, max: 52 },
    activities: { min: 20, average: 40, max: 82 },
    insurance: { min: 4, average: 6, max: 10 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 12, average: 27, max: 58 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 128, average: 208, max: 368 },
    localTransport: { min: 18, average: 35, max: 68 },
    food: { min: 32, average: 62, max: 118 },
    activities: { min: 45, average: 88, max: 178 },
    insurance: { min: 6, average: 10, max: 17 },
    internet: { min: 4, average: 6, max: 10 },
    extras: { min: 28, average: 60, max: 128 },
  } as BudgetCategories,
};

// SOUTH AFRICA (Cape Town)
const capeTownBudgets = {
  Budget: {
    accommodation: { min: 22, average: 36, max: 60 },
    localTransport: { min: 5, average: 10, max: 20 },
    food: { min: 8, average: 16, max: 30 },
    activities: { min: 10, average: 22, max: 48 },
    insurance: { min: 3, average: 5, max: 8 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 7, average: 16, max: 35 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 60, average: 95, max: 158 },
    localTransport: { min: 12, average: 22, max: 42 },
    food: { min: 20, average: 38, max: 68 },
    activities: { min: 24, average: 48, max: 100 },
    insurance: { min: 5, average: 8, max: 12 },
    internet: { min: 3, average: 4, max: 7 },
    extras: { min: 18, average: 36, max: 75 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 158, average: 255, max: 438 },
    localTransport: { min: 24, average: 46, max: 90 },
    food: { min: 46, average: 85, max: 155 },
    activities: { min: 55, average: 108, max: 215 },
    insurance: { min: 8, average: 12, max: 20 },
    internet: { min: 5, average: 7, max: 11 },
    extras: { min: 42, average: 82, max: 165 },
  } as BudgetCategories,
};

// EGYPT (Cairo)
const cairoBudgets = {
  Budget: {
    accommodation: { min: 14, average: 24, max: 42 },
    localTransport: { min: 3, average: 6, max: 14 },
    food: { min: 5, average: 10, max: 22 },
    activities: { min: 8, average: 18, max: 40 },
    insurance: { min: 2, average: 4, max: 7 },
    internet: { min: 1, average: 2, max: 4 },
    extras: { min: 4, average: 10, max: 24 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 42, average: 68, max: 115 },
    localTransport: { min: 8, average: 15, max: 30 },
    food: { min: 12, average: 24, max: 46 },
    activities: { min: 20, average: 40, max: 82 },
    insurance: { min: 4, average: 6, max: 10 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 10, average: 24, max: 52 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 115, average: 188, max: 328 },
    localTransport: { min: 18, average: 35, max: 68 },
    food: { min: 28, average: 56, max: 110 },
    activities: { min: 45, average: 90, max: 180 },
    insurance: { min: 6, average: 10, max: 17 },
    internet: { min: 4, average: 6, max: 10 },
    extras: { min: 26, average: 55, max: 115 },
  } as BudgetCategories,
};

// KENYA (Nairobi)
const nairobiBudgets = {
  Budget: {
    accommodation: { min: 20, average: 32, max: 55 },
    localTransport: { min: 4, average: 8, max: 18 },
    food: { min: 6, average: 12, max: 24 },
    activities: { min: 12, average: 26, max: 58 },
    insurance: { min: 3, average: 5, max: 9 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 6, average: 14, max: 32 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 55, average: 88, max: 148 },
    localTransport: { min: 10, average: 20, max: 40 },
    food: { min: 14, average: 28, max: 55 },
    activities: { min: 28, average: 58, max: 122 },
    insurance: { min: 5, average: 8, max: 14 },
    internet: { min: 3, average: 4, max: 7 },
    extras: { min: 14, average: 32, max: 68 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 148, average: 242, max: 425 },
    localTransport: { min: 22, average: 44, max: 88 },
    food: { min: 34, average: 66, max: 132 },
    activities: { min: 65, average: 128, max: 268 },
    insurance: { min: 9, average: 15, max: 26 },
    internet: { min: 5, average: 7, max: 11 },
    extras: { min: 35, average: 72, max: 155 },
  } as BudgetCategories,
};

// ─── TEMPLATES ARRAY ─────────────────────────────────────────────────────────

export const TEMPLATES: Template[] = [
  // ── JAPAN ──────────────────────────────────────────────────────────────────
  {
    id: 'japan-tokyo',
    name: 'Japan - Tokyo',
    city: 'Tokyo',
    country: 'Japan',
    currency: 'JPY',
    budgets: japanBudgets,
  },
  {
    id: 'japan-osaka',
    name: 'Japan - Osaka',
    city: 'Osaka',
    country: 'Japan',
    currency: 'JPY',
    budgets: japanBudgets,
  },
  {
    id: 'japan-kyoto',
    name: 'Japan - Kyoto',
    city: 'Kyoto',
    country: 'Japan',
    currency: 'JPY',
    budgets: japanBudgets,
  },

  // ── THAILAND ───────────────────────────────────────────────────────────────
  {
    id: 'thailand-bangkok',
    name: 'Thailand - Bangkok',
    city: 'Bangkok',
    country: 'Thailand',
    currency: 'THB',
    budgets: thailandBudgets,
  },
  {
    id: 'thailand-phuket',
    name: 'Thailand - Phuket',
    city: 'Phuket',
    country: 'Thailand',
    currency: 'THB',
    budgets: thailandBudgets,
  },
  {
    id: 'thailand-chiangmai',
    name: 'Thailand - Chiang Mai',
    city: 'Chiang Mai',
    country: 'Thailand',
    currency: 'THB',
    budgets: thailandBudgets,
  },

  // ── INDONESIA ──────────────────────────────────────────────────────────────
  {
    id: 'indonesia-bali',
    name: 'Indonesia - Bali',
    city: 'Bali',
    country: 'Indonesia',
    currency: 'USD',
    budgets: baliBudgets,
  },

  // ── SINGAPORE ──────────────────────────────────────────────────────────────
  {
    id: 'singapore',
    name: 'Singapore',
    city: 'Singapore',
    country: 'Singapore',
    currency: 'USD',
    budgets: singaporeBudgets,
  },

  // ── SOUTH KOREA ────────────────────────────────────────────────────────────
  {
    id: 'korea-seoul',
    name: 'South Korea - Seoul',
    city: 'Seoul',
    country: 'South Korea',
    currency: 'KRW',
    budgets: seoulBudgets,
  },

  // ── VIETNAM ────────────────────────────────────────────────────────────────
  {
    id: 'vietnam-hcmc',
    name: 'Vietnam - Ho Chi Minh City',
    city: 'Ho Chi Minh City',
    country: 'Vietnam',
    currency: 'USD',
    budgets: vietnamBudgets,
  },
  {
    id: 'vietnam-hanoi',
    name: 'Vietnam - Hanoi',
    city: 'Hanoi',
    country: 'Vietnam',
    currency: 'USD',
    budgets: vietnamBudgets,
  },

  // ── MALAYSIA ───────────────────────────────────────────────────────────────
  {
    id: 'malaysia-kl',
    name: 'Malaysia - Kuala Lumpur',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    currency: 'USD',
    budgets: kualaLumpurBudgets,
  },

  // ── INDIA ──────────────────────────────────────────────────────────────────
  {
    id: 'india-delhi',
    name: 'India - Delhi',
    city: 'Delhi',
    country: 'India',
    currency: 'INR',
    budgets: indiaBudgets,
  },
  {
    id: 'india-mumbai',
    name: 'India - Mumbai',
    city: 'Mumbai',
    country: 'India',
    currency: 'INR',
    budgets: indiaBudgets,
  },
  {
    id: 'india-goa',
    name: 'India - Goa',
    city: 'Goa',
    country: 'India',
    currency: 'INR',
    budgets: indiaBudgets,
  },

  // ── UAE ────────────────────────────────────────────────────────────────────
  {
    id: 'uae-dubai',
    name: 'UAE - Dubai',
    city: 'Dubai',
    country: 'UAE',
    currency: 'USD',
    budgets: dubaiBudgets,
  },

  // ── CHINA ──────────────────────────────────────────────────────────────────
  {
    id: 'china-beijing',
    name: 'China - Beijing',
    city: 'Beijing',
    country: 'China',
    currency: 'CNY',
    budgets: chinaBudgets,
  },
  {
    id: 'china-shanghai',
    name: 'China - Shanghai',
    city: 'Shanghai',
    country: 'China',
    currency: 'CNY',
    budgets: chinaBudgets,
  },

  // ── PHILIPPINES ────────────────────────────────────────────────────────────
  {
    id: 'philippines-manila',
    name: 'Philippines - Manila',
    city: 'Manila',
    country: 'Philippines',
    currency: 'USD',
    budgets: philippinesBudgets,
  },
  {
    id: 'philippines-cebu',
    name: 'Philippines - Cebu',
    city: 'Cebu',
    country: 'Philippines',
    currency: 'USD',
    budgets: philippinesBudgets,
  },

  // ── CAMBODIA ───────────────────────────────────────────────────────────────
  {
    id: 'cambodia-siemreap',
    name: 'Cambodia - Siem Reap',
    city: 'Siem Reap',
    country: 'Cambodia',
    currency: 'USD',
    budgets: siemReapBudgets,
  },

  // ── NEPAL ──────────────────────────────────────────────────────────────────
  {
    id: 'nepal-kathmandu',
    name: 'Nepal - Kathmandu',
    city: 'Kathmandu',
    country: 'Nepal',
    currency: 'USD',
    budgets: katmanduBudgets,
  },

  // ── USA ────────────────────────────────────────────────────────────────────
  {
    id: 'usa-nyc',
    name: 'USA - New York',
    city: 'New York',
    country: 'USA',
    currency: 'USD',
    budgets: usaBudgets,
  },
  {
    id: 'usa-miami',
    name: 'USA - Miami',
    city: 'Miami',
    country: 'USA',
    currency: 'USD',
    budgets: usaBudgets,
  },
  {
    id: 'usa-la',
    name: 'USA - Los Angeles',
    city: 'Los Angeles',
    country: 'USA',
    currency: 'USD',
    budgets: usaBudgets,
  },
  {
    id: 'usa-chicago',
    name: 'USA - Chicago',
    city: 'Chicago',
    country: 'USA',
    currency: 'USD',
    budgets: usaBudgets,
  },
  {
    id: 'usa-sf',
    name: 'USA - San Francisco',
    city: 'San Francisco',
    country: 'USA',
    currency: 'USD',
    budgets: usaBudgets,
  },
  {
    id: 'usa-lasvegas',
    name: 'USA - Las Vegas',
    city: 'Las Vegas',
    country: 'USA',
    currency: 'USD',
    budgets: usaBudgets,
  },

  // ── CANADA ─────────────────────────────────────────────────────────────────
  {
    id: 'canada-toronto',
    name: 'Canada - Toronto',
    city: 'Toronto',
    country: 'Canada',
    currency: 'CAD',
    budgets: canadaBudgets,
  },
  {
    id: 'canada-vancouver',
    name: 'Canada - Vancouver',
    city: 'Vancouver',
    country: 'Canada',
    currency: 'CAD',
    budgets: canadaBudgets,
  },

  // ── MEXICO ─────────────────────────────────────────────────────────────────
  {
    id: 'mexico-cdmx',
    name: 'Mexico - CDMX',
    city: 'Mexico City',
    country: 'Mexico',
    currency: 'MXN',
    budgets: mexicoBudgets,
  },
  {
    id: 'mexico-cancun',
    name: 'Mexico - Cancún',
    city: 'Cancún',
    country: 'Mexico',
    currency: 'MXN',
    budgets: mexicoBudgets,
  },
  {
    id: 'mexico-guadalajara',
    name: 'Mexico - Guadalajara',
    city: 'Guadalajara',
    country: 'Mexico',
    currency: 'MXN',
    budgets: mexicoBudgets,
  },

  // ── COLOMBIA ───────────────────────────────────────────────────────────────
  {
    id: 'colombia-bogota',
    name: 'Colombia - Bogotá',
    city: 'Bogotá',
    country: 'Colombia',
    currency: 'COP',
    budgets: colombiaBudgets,
  },
  {
    id: 'colombia-medellin',
    name: 'Colombia - Medellín',
    city: 'Medellín',
    country: 'Colombia',
    currency: 'COP',
    budgets: colombiaBudgets,
  },
  {
    id: 'colombia-cartagena',
    name: 'Colombia - Cartagena',
    city: 'Cartagena',
    country: 'Colombia',
    currency: 'COP',
    budgets: colombiaBudgets,
  },
  {
    id: 'colombia-cali',
    name: 'Colombia - Cali',
    city: 'Cali',
    country: 'Colombia',
    currency: 'COP',
    budgets: colombiaBudgets,
  },

  // ── BRAZIL ─────────────────────────────────────────────────────────────────
  {
    id: 'brazil-saopaulo',
    name: 'Brazil - São Paulo',
    city: 'São Paulo',
    country: 'Brazil',
    currency: 'BRL',
    budgets: brazilBudgets,
  },
  {
    id: 'brazil-rio',
    name: 'Brazil - Rio de Janeiro',
    city: 'Rio de Janeiro',
    country: 'Brazil',
    currency: 'BRL',
    budgets: brazilBudgets,
  },

  // ── ARGENTINA ──────────────────────────────────────────────────────────────
  {
    id: 'argentina-buenosaires',
    name: 'Argentina - Buenos Aires',
    city: 'Buenos Aires',
    country: 'Argentina',
    currency: 'USD',
    budgets: argentinaBudgets,
  },

  // ── PERU ───────────────────────────────────────────────────────────────────
  {
    id: 'peru-lima',
    name: 'Peru - Lima',
    city: 'Lima',
    country: 'Peru',
    currency: 'USD',
    budgets: peruBudgets,
  },
  {
    id: 'peru-cusco',
    name: 'Peru - Cusco',
    city: 'Cusco',
    country: 'Peru',
    currency: 'USD',
    budgets: peruBudgets,
  },

  // ── CHILE ──────────────────────────────────────────────────────────────────
  {
    id: 'chile-santiago',
    name: 'Chile - Santiago',
    city: 'Santiago',
    country: 'Chile',
    currency: 'USD',
    budgets: chileBudgets,
  },

  // ── PANAMA ─────────────────────────────────────────────────────────────────
  {
    id: 'panama-city',
    name: 'Panama - Panama City',
    city: 'Panama City',
    country: 'Panama',
    currency: 'USD',
    budgets: centralAmericaBudgets,
  },

  // ── COSTA RICA ─────────────────────────────────────────────────────────────
  {
    id: 'costarica-sanjose',
    name: 'Costa Rica - San José',
    city: 'San José',
    country: 'Costa Rica',
    currency: 'USD',
    budgets: centralAmericaBudgets,
  },

  // ── ECUADOR ────────────────────────────────────────────────────────────────
  {
    id: 'ecuador-quito',
    name: 'Ecuador - Quito',
    city: 'Quito',
    country: 'Ecuador',
    currency: 'USD',
    budgets: ecuadorBudgets,
  },
  {
    id: 'ecuador-guayaquil',
    name: 'Ecuador - Guayaquil',
    city: 'Guayaquil',
    country: 'Ecuador',
    currency: 'USD',
    budgets: ecuadorBudgets,
  },

  // ── UNITED KINGDOM ─────────────────────────────────────────────────────────
  {
    id: 'uk-london',
    name: 'UK - London',
    city: 'London',
    country: 'UK',
    currency: 'GBP',
    budgets: londonBudgets,
  },

  // ── FRANCE ─────────────────────────────────────────────────────────────────
  {
    id: 'france-paris',
    name: 'France - Paris',
    city: 'Paris',
    country: 'France',
    currency: 'EUR',
    budgets: parisBudgets,
  },

  // ── SPAIN ──────────────────────────────────────────────────────────────────
  {
    id: 'spain-barcelona',
    name: 'Spain - Barcelona',
    city: 'Barcelona',
    country: 'Spain',
    currency: 'EUR',
    budgets: spainBudgets,
  },
  {
    id: 'spain-madrid',
    name: 'Spain - Madrid',
    city: 'Madrid',
    country: 'Spain',
    currency: 'EUR',
    budgets: spainBudgets,
  },

  // ── ITALY ──────────────────────────────────────────────────────────────────
  {
    id: 'italy-rome',
    name: 'Italy - Rome',
    city: 'Rome',
    country: 'Italy',
    currency: 'EUR',
    budgets: italyBudgets,
  },
  {
    id: 'italy-venice',
    name: 'Italy - Venice',
    city: 'Venice',
    country: 'Italy',
    currency: 'EUR',
    budgets: italyBudgets,
  },
  {
    id: 'italy-milan',
    name: 'Italy - Milan',
    city: 'Milan',
    country: 'Italy',
    currency: 'EUR',
    budgets: italyBudgets,
  },

  // ── PORTUGAL ───────────────────────────────────────────────────────────────
  {
    id: 'portugal-lisbon',
    name: 'Portugal - Lisbon',
    city: 'Lisbon',
    country: 'Portugal',
    currency: 'EUR',
    budgets: portugalBudgets,
  },
  {
    id: 'portugal-porto',
    name: 'Portugal - Porto',
    city: 'Porto',
    country: 'Portugal',
    currency: 'EUR',
    budgets: portugalBudgets,
  },

  // ── NETHERLANDS ────────────────────────────────────────────────────────────
  {
    id: 'netherlands-amsterdam',
    name: 'Netherlands - Amsterdam',
    city: 'Amsterdam',
    country: 'Netherlands',
    currency: 'EUR',
    budgets: amsterdamBudgets,
  },

  // ── GERMANY ────────────────────────────────────────────────────────────────
  {
    id: 'germany-berlin',
    name: 'Germany - Berlin',
    city: 'Berlin',
    country: 'Germany',
    currency: 'EUR',
    budgets: berlinBudgets,
  },

  // ── CZECH REPUBLIC ─────────────────────────────────────────────────────────
  {
    id: 'czechia-prague',
    name: 'Czech Republic - Prague',
    city: 'Prague',
    country: 'Czech Republic',
    currency: 'EUR',
    budgets: pragueBudgets,
  },

  // ── HUNGARY ────────────────────────────────────────────────────────────────
  {
    id: 'hungary-budapest',
    name: 'Hungary - Budapest',
    city: 'Budapest',
    country: 'Hungary',
    currency: 'EUR',
    budgets: budapestBudgets,
  },

  // ── GREECE ─────────────────────────────────────────────────────────────────
  {
    id: 'greece-athens',
    name: 'Greece - Athens',
    city: 'Athens',
    country: 'Greece',
    currency: 'EUR',
    budgets: greeceBudgets,
  },
  {
    id: 'greece-santorini',
    name: 'Greece - Santorini',
    city: 'Santorini',
    country: 'Greece',
    currency: 'EUR',
    budgets: greeceBudgets,
  },

  // ── TURKEY ─────────────────────────────────────────────────────────────────
  {
    id: 'turkey-istanbul',
    name: 'Turkey - Istanbul',
    city: 'Istanbul',
    country: 'Turkey',
    currency: 'USD',
    budgets: istanbulBudgets,
  },

  // ── SWITZERLAND ────────────────────────────────────────────────────────────
  {
    id: 'switzerland-zurich',
    name: 'Switzerland - Zurich',
    city: 'Zurich',
    country: 'Switzerland',
    currency: 'CHF',
    budgets: zurichBudgets,
  },

  // ── SWEDEN ─────────────────────────────────────────────────────────────────
  {
    id: 'sweden-stockholm',
    name: 'Sweden - Stockholm',
    city: 'Stockholm',
    country: 'Sweden',
    currency: 'SEK',
    budgets: stockholmBudgets,
  },

  // ── IRELAND ────────────────────────────────────────────────────────────────
  {
    id: 'ireland-dublin',
    name: 'Ireland - Dublin',
    city: 'Dublin',
    country: 'Ireland',
    currency: 'EUR',
    budgets: dublinBudgets,
  },

  // ── CROATIA ────────────────────────────────────────────────────────────────
  {
    id: 'croatia-dubrovnik',
    name: 'Croatia - Dubrovnik',
    city: 'Dubrovnik',
    country: 'Croatia',
    currency: 'EUR',
    budgets: dubrovnikBudgets,
  },

  // ── AUSTRALIA ──────────────────────────────────────────────────────────────
  {
    id: 'australia-sydney',
    name: 'Australia - Sydney',
    city: 'Sydney',
    country: 'Australia',
    currency: 'AUD',
    budgets: australiaBudgets,
  },
  {
    id: 'australia-melbourne',
    name: 'Australia - Melbourne',
    city: 'Melbourne',
    country: 'Australia',
    currency: 'AUD',
    budgets: australiaBudgets,
  },

  // ── NEW ZEALAND ────────────────────────────────────────────────────────────
  {
    id: 'newzealand-auckland',
    name: 'New Zealand - Auckland',
    city: 'Auckland',
    country: 'New Zealand',
    currency: 'AUD',
    budgets: aucklandBudgets,
  },

  // ── MOROCCO ────────────────────────────────────────────────────────────────
  {
    id: 'morocco-marrakech',
    name: 'Morocco - Marrakech',
    city: 'Marrakech',
    country: 'Morocco',
    currency: 'USD',
    budgets: marrakechBudgets,
  },

  // ── SOUTH AFRICA ───────────────────────────────────────────────────────────
  {
    id: 'southafrica-capetown',
    name: 'South Africa - Cape Town',
    city: 'Cape Town',
    country: 'South Africa',
    currency: 'USD',
    budgets: capeTownBudgets,
  },

  // ── EGYPT ──────────────────────────────────────────────────────────────────
  {
    id: 'egypt-cairo',
    name: 'Egypt - Cairo',
    city: 'Cairo',
    country: 'Egypt',
    currency: 'USD',
    budgets: cairoBudgets,
  },

  // ── KENYA ──────────────────────────────────────────────────────────────────
  {
    id: 'kenya-nairobi',
    name: 'Kenya - Nairobi',
    city: 'Nairobi',
    country: 'Kenya',
    currency: 'USD',
    budgets: nairobiBudgets,
  },
];

export const getTemplateById = (id: string): Template | undefined => {
  return TEMPLATES.find(t => t.id === id);
};

export const getTemplatesByCountry = (country: string): Template[] => {
  return TEMPLATES.filter(t => t.country === country);
};
