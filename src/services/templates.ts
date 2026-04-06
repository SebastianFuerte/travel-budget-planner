// src/services/templates.ts
// 150+ cities with international airports — Budget/Mid/Comfy presets (USD/day/person)

import { Template, BudgetCategories } from '../types';

// ─── SHARED BUDGET PRESETS ────────────────────────────────────────────────────

const japanBudgets = {
  Budget: { accommodation: { min: 25, average: 35, max: 50 }, localTransport: { min: 10, average: 15, max: 25 }, food: { min: 20, average: 30, max: 45 }, activities: { min: 15, average: 30, max: 60 }, insurance: { min: 3, average: 5, max: 8 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 10, average: 20, max: 40 } } as BudgetCategories,
  Mid: { accommodation: { min: 50, average: 80, max: 120 }, localTransport: { min: 15, average: 25, max: 40 }, food: { min: 40, average: 60, max: 90 }, activities: { min: 40, average: 70, max: 120 }, insurance: { min: 5, average: 8, max: 12 }, internet: { min: 3, average: 5, max: 8 }, extras: { min: 30, average: 50, max: 80 } } as BudgetCategories,
  Comfy: { accommodation: { min: 120, average: 200, max: 350 }, localTransport: { min: 30, average: 50, max: 80 }, food: { min: 80, average: 120, max: 180 }, activities: { min: 80, average: 150, max: 250 }, insurance: { min: 8, average: 12, max: 20 }, internet: { min: 5, average: 8, max: 12 }, extras: { min: 50, average: 100, max: 200 } } as BudgetCategories,
};

const usaMajorBudgets = {
  Budget: { accommodation: { min: 60, average: 90, max: 130 }, localTransport: { min: 15, average: 25, max: 40 }, food: { min: 25, average: 40, max: 60 }, activities: { min: 20, average: 40, max: 70 }, insurance: { min: 5, average: 8, max: 12 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 15, average: 30, max: 50 } } as BudgetCategories,
  Mid: { accommodation: { min: 130, average: 180, max: 250 }, localTransport: { min: 25, average: 40, max: 60 }, food: { min: 50, average: 80, max: 120 }, activities: { min: 50, average: 80, max: 150 }, insurance: { min: 8, average: 12, max: 18 }, internet: { min: 3, average: 5, max: 8 }, extras: { min: 40, average: 70, max: 120 } } as BudgetCategories,
  Comfy: { accommodation: { min: 250, average: 350, max: 500 }, localTransport: { min: 40, average: 70, max: 120 }, food: { min: 100, average: 150, max: 250 }, activities: { min: 100, average: 180, max: 300 }, insurance: { min: 12, average: 18, max: 30 }, internet: { min: 5, average: 8, max: 12 }, extras: { min: 80, average: 150, max: 250 } } as BudgetCategories,
};

const usaMidBudgets = {
  Budget: { accommodation: { min: 50, average: 75, max: 110 }, localTransport: { min: 12, average: 20, max: 35 }, food: { min: 20, average: 35, max: 55 }, activities: { min: 15, average: 30, max: 60 }, insurance: { min: 5, average: 8, max: 12 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 12, average: 25, max: 45 } } as BudgetCategories,
  Mid: { accommodation: { min: 110, average: 150, max: 210 }, localTransport: { min: 20, average: 35, max: 55 }, food: { min: 40, average: 65, max: 100 }, activities: { min: 40, average: 65, max: 120 }, insurance: { min: 8, average: 12, max: 18 }, internet: { min: 3, average: 5, max: 8 }, extras: { min: 30, average: 55, max: 100 } } as BudgetCategories,
  Comfy: { accommodation: { min: 210, average: 290, max: 420 }, localTransport: { min: 35, average: 60, max: 100 }, food: { min: 80, average: 130, max: 200 }, activities: { min: 80, average: 140, max: 250 }, insurance: { min: 12, average: 18, max: 30 }, internet: { min: 5, average: 8, max: 12 }, extras: { min: 65, average: 120, max: 200 } } as BudgetCategories,
};

const canadaBudgets = {
  Budget: { accommodation: { min: 55, average: 80, max: 120 }, localTransport: { min: 10, average: 18, max: 30 }, food: { min: 20, average: 35, max: 55 }, activities: { min: 15, average: 30, max: 55 }, insurance: { min: 5, average: 8, max: 12 }, internet: { min: 2, average: 4, max: 6 }, extras: { min: 12, average: 25, max: 45 } } as BudgetCategories,
  Mid: { accommodation: { min: 120, average: 165, max: 230 }, localTransport: { min: 18, average: 30, max: 50 }, food: { min: 40, average: 65, max: 95 }, activities: { min: 35, average: 65, max: 110 }, insurance: { min: 8, average: 12, max: 18 }, internet: { min: 3, average: 5, max: 8 }, extras: { min: 30, average: 55, max: 95 } } as BudgetCategories,
  Comfy: { accommodation: { min: 230, average: 320, max: 450 }, localTransport: { min: 30, average: 55, max: 90 }, food: { min: 80, average: 130, max: 200 }, activities: { min: 70, average: 130, max: 220 }, insurance: { min: 12, average: 18, max: 28 }, internet: { min: 5, average: 8, max: 12 }, extras: { min: 60, average: 110, max: 190 } } as BudgetCategories,
};

const mexicoBudgets = {
  Budget: { accommodation: { min: 15, average: 25, max: 40 }, localTransport: { min: 5, average: 10, max: 20 }, food: { min: 15, average: 25, max: 40 }, activities: { min: 10, average: 20, max: 40 }, insurance: { min: 3, average: 5, max: 8 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 10, average: 20, max: 35 } } as BudgetCategories,
  Mid: { accommodation: { min: 40, average: 60, max: 90 }, localTransport: { min: 15, average: 25, max: 40 }, food: { min: 30, average: 50, max: 75 }, activities: { min: 30, average: 50, max: 80 }, insurance: { min: 5, average: 8, max: 12 }, internet: { min: 3, average: 5, max: 8 }, extras: { min: 25, average: 40, max: 70 } } as BudgetCategories,
  Comfy: { accommodation: { min: 90, average: 150, max: 250 }, localTransport: { min: 30, average: 50, max: 80 }, food: { min: 60, average: 100, max: 150 }, activities: { min: 60, average: 100, max: 180 }, insurance: { min: 8, average: 12, max: 18 }, internet: { min: 5, average: 8, max: 12 }, extras: { min: 50, average: 90, max: 150 } } as BudgetCategories,
};

const colombiaBudgets = {
  Budget: { accommodation: { min: 12, average: 20, max: 35 }, localTransport: { min: 3, average: 6, max: 12 }, food: { min: 8, average: 15, max: 25 }, activities: { min: 8, average: 15, max: 30 }, insurance: { min: 2, average: 4, max: 7 }, internet: { min: 1, average: 2, max: 4 }, extras: { min: 5, average: 12, max: 25 } } as BudgetCategories,
  Mid: { accommodation: { min: 35, average: 55, max: 85 }, localTransport: { min: 8, average: 15, max: 25 }, food: { min: 20, average: 35, max: 55 }, activities: { min: 20, average: 35, max: 60 }, insurance: { min: 4, average: 7, max: 11 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 15, average: 30, max: 55 } } as BudgetCategories,
  Comfy: { accommodation: { min: 85, average: 140, max: 230 }, localTransport: { min: 20, average: 35, max: 60 }, food: { min: 45, average: 75, max: 120 }, activities: { min: 45, average: 80, max: 140 }, insurance: { min: 7, average: 11, max: 18 }, internet: { min: 4, average: 6, max: 10 }, extras: { min: 35, average: 65, max: 120 } } as BudgetCategories,
};

const colombiaCaribeBudgets = {
  Budget: { accommodation: { min: 18, average: 30, max: 50 }, localTransport: { min: 4, average: 8, max: 15 }, food: { min: 10, average: 18, max: 30 }, activities: { min: 12, average: 22, max: 40 }, insurance: { min: 2, average: 4, max: 7 }, internet: { min: 1, average: 2, max: 4 }, extras: { min: 8, average: 15, max: 30 } } as BudgetCategories,
  Mid: { accommodation: { min: 50, average: 80, max: 130 }, localTransport: { min: 10, average: 18, max: 30 }, food: { min: 25, average: 40, max: 65 }, activities: { min: 25, average: 45, max: 80 }, insurance: { min: 4, average: 7, max: 11 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 20, average: 38, max: 70 } } as BudgetCategories,
  Comfy: { accommodation: { min: 130, average: 200, max: 320 }, localTransport: { min: 25, average: 45, max: 80 }, food: { min: 55, average: 90, max: 150 }, activities: { min: 55, average: 100, max: 180 }, insurance: { min: 7, average: 11, max: 18 }, internet: { min: 4, average: 6, max: 10 }, extras: { min: 45, average: 80, max: 150 } } as BudgetCategories,
};

const brazilBudgets = {
  Budget: { accommodation: { min: 18, average: 30, max: 50 }, localTransport: { min: 5, average: 10, max: 18 }, food: { min: 12, average: 20, max: 35 }, activities: { min: 10, average: 20, max: 40 }, insurance: { min: 3, average: 5, max: 8 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 8, average: 18, max: 35 } } as BudgetCategories,
  Mid: { accommodation: { min: 50, average: 80, max: 130 }, localTransport: { min: 15, average: 25, max: 40 }, food: { min: 30, average: 50, max: 80 }, activities: { min: 30, average: 55, max: 90 }, insurance: { min: 5, average: 8, max: 13 }, internet: { min: 3, average: 5, max: 8 }, extras: { min: 25, average: 45, max: 80 } } as BudgetCategories,
  Comfy: { accommodation: { min: 130, average: 200, max: 330 }, localTransport: { min: 30, average: 50, max: 85 }, food: { min: 65, average: 110, max: 170 }, activities: { min: 65, average: 120, max: 200 }, insurance: { min: 8, average: 13, max: 22 }, internet: { min: 5, average: 8, max: 12 }, extras: { min: 50, average: 95, max: 165 } } as BudgetCategories,
};

const argentinaChileBudgets = {
  Budget: { accommodation: { min: 15, average: 25, max: 45 }, localTransport: { min: 4, average: 8, max: 15 }, food: { min: 10, average: 18, max: 30 }, activities: { min: 10, average: 20, max: 40 }, insurance: { min: 3, average: 5, max: 8 }, internet: { min: 1, average: 3, max: 5 }, extras: { min: 8, average: 15, max: 30 } } as BudgetCategories,
  Mid: { accommodation: { min: 45, average: 70, max: 110 }, localTransport: { min: 12, average: 20, max: 35 }, food: { min: 25, average: 40, max: 65 }, activities: { min: 25, average: 45, max: 80 }, insurance: { min: 5, average: 8, max: 13 }, internet: { min: 3, average: 5, max: 8 }, extras: { min: 20, average: 38, max: 70 } } as BudgetCategories,
  Comfy: { accommodation: { min: 110, average: 175, max: 280 }, localTransport: { min: 25, average: 45, max: 75 }, food: { min: 55, average: 90, max: 145 }, activities: { min: 55, average: 100, max: 170 }, insurance: { min: 8, average: 12, max: 20 }, internet: { min: 5, average: 8, max: 12 }, extras: { min: 40, average: 75, max: 135 } } as BudgetCategories,
};

const peruBudgets = {
  Budget: { accommodation: { min: 12, average: 20, max: 35 }, localTransport: { min: 3, average: 7, max: 14 }, food: { min: 8, average: 15, max: 25 }, activities: { min: 12, average: 22, max: 45 }, insurance: { min: 2, average: 4, max: 7 }, internet: { min: 1, average: 2, max: 4 }, extras: { min: 8, average: 15, max: 30 } } as BudgetCategories,
  Mid: { accommodation: { min: 35, average: 55, max: 90 }, localTransport: { min: 10, average: 18, max: 30 }, food: { min: 22, average: 38, max: 60 }, activities: { min: 30, average: 55, max: 90 }, insurance: { min: 4, average: 7, max: 11 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 18, average: 33, max: 60 } } as BudgetCategories,
  Comfy: { accommodation: { min: 90, average: 150, max: 250 }, localTransport: { min: 22, average: 40, max: 70 }, food: { min: 50, average: 85, max: 140 }, activities: { min: 65, average: 115, max: 200 }, insurance: { min: 7, average: 11, max: 18 }, internet: { min: 4, average: 6, max: 10 }, extras: { min: 40, average: 75, max: 135 } } as BudgetCategories,
};

const centralAmericaBudgets = {
  Budget: { accommodation: { min: 15, average: 25, max: 45 }, localTransport: { min: 5, average: 10, max: 20 }, food: { min: 10, average: 18, max: 32 }, activities: { min: 12, average: 22, max: 45 }, insurance: { min: 3, average: 5, max: 8 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 8, average: 16, max: 32 } } as BudgetCategories,
  Mid: { accommodation: { min: 45, average: 70, max: 110 }, localTransport: { min: 15, average: 25, max: 40 }, food: { min: 25, average: 42, max: 68 }, activities: { min: 30, average: 55, max: 90 }, insurance: { min: 5, average: 8, max: 13 }, internet: { min: 3, average: 5, max: 8 }, extras: { min: 22, average: 40, max: 72 } } as BudgetCategories,
  Comfy: { accommodation: { min: 110, average: 170, max: 270 }, localTransport: { min: 30, average: 50, max: 85 }, food: { min: 55, average: 90, max: 145 }, activities: { min: 65, average: 115, max: 190 }, insurance: { min: 8, average: 12, max: 20 }, internet: { min: 5, average: 8, max: 12 }, extras: { min: 45, average: 80, max: 145 } } as BudgetCategories,
};

const ukBudgets = {
  Budget: { accommodation: { min: 50, average: 75, max: 110 }, localTransport: { min: 12, average: 20, max: 35 }, food: { min: 20, average: 35, max: 55 }, activities: { min: 15, average: 30, max: 55 }, insurance: { min: 5, average: 8, max: 12 }, internet: { min: 2, average: 4, max: 6 }, extras: { min: 15, average: 28, max: 50 } } as BudgetCategories,
  Mid: { accommodation: { min: 110, average: 165, max: 240 }, localTransport: { min: 20, average: 35, max: 55 }, food: { min: 45, average: 70, max: 105 }, activities: { min: 40, average: 70, max: 120 }, insurance: { min: 8, average: 12, max: 18 }, internet: { min: 4, average: 6, max: 10 }, extras: { min: 35, average: 60, max: 105 } } as BudgetCategories,
  Comfy: { accommodation: { min: 240, average: 340, max: 500 }, localTransport: { min: 40, average: 65, max: 110 }, food: { min: 90, average: 140, max: 220 }, activities: { min: 80, average: 145, max: 250 }, insurance: { min: 12, average: 18, max: 28 }, internet: { min: 6, average: 10, max: 15 }, extras: { min: 70, average: 130, max: 225 } } as BudgetCategories,
};

const franceBudgets = {
  Budget: { accommodation: { min: 45, average: 70, max: 105 }, localTransport: { min: 10, average: 18, max: 30 }, food: { min: 18, average: 32, max: 52 }, activities: { min: 15, average: 28, max: 52 }, insurance: { min: 4, average: 7, max: 11 }, internet: { min: 2, average: 4, max: 6 }, extras: { min: 12, average: 25, max: 48 } } as BudgetCategories,
  Mid: { accommodation: { min: 105, average: 155, max: 225 }, localTransport: { min: 18, average: 32, max: 52 }, food: { min: 40, average: 65, max: 100 }, activities: { min: 38, average: 65, max: 115 }, insurance: { min: 7, average: 11, max: 17 }, internet: { min: 4, average: 6, max: 10 }, extras: { min: 32, average: 57, max: 100 } } as BudgetCategories,
  Comfy: { accommodation: { min: 225, average: 320, max: 480 }, localTransport: { min: 35, average: 60, max: 100 }, food: { min: 85, average: 135, max: 210 }, activities: { min: 75, average: 135, max: 235 }, insurance: { min: 11, average: 17, max: 27 }, internet: { min: 6, average: 10, max: 15 }, extras: { min: 65, average: 120, max: 215 } } as BudgetCategories,
};

const spainBudgets = {
  Budget: { accommodation: { min: 30, average: 48, max: 75 }, localTransport: { min: 8, average: 15, max: 25 }, food: { min: 18, average: 32, max: 52 }, activities: { min: 12, average: 25, max: 48 }, insurance: { min: 4, average: 6, max: 10 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 12, average: 22, max: 42 } } as BudgetCategories,
  Mid: { accommodation: { min: 75, average: 115, max: 170 }, localTransport: { min: 15, average: 28, max: 48 }, food: { min: 40, average: 65, max: 100 }, activities: { min: 32, average: 58, max: 105 }, insurance: { min: 6, average: 10, max: 15 }, internet: { min: 3, average: 5, max: 8 }, extras: { min: 28, average: 50, max: 92 } } as BudgetCategories,
  Comfy: { accommodation: { min: 170, average: 250, max: 390 }, localTransport: { min: 30, average: 52, max: 90 }, food: { min: 80, average: 130, max: 200 }, activities: { min: 68, average: 125, max: 215 }, insurance: { min: 10, average: 15, max: 25 }, internet: { min: 5, average: 8, max: 12 }, extras: { min: 55, average: 105, max: 190 } } as BudgetCategories,
};

const italyBudgets = {
  Budget: { accommodation: { min: 35, average: 55, max: 85 }, localTransport: { min: 8, average: 15, max: 25 }, food: { min: 18, average: 30, max: 50 }, activities: { min: 15, average: 28, max: 52 }, insurance: { min: 4, average: 6, max: 10 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 12, average: 22, max: 42 } } as BudgetCategories,
  Mid: { accommodation: { min: 85, average: 130, max: 195 }, localTransport: { min: 15, average: 25, max: 42 }, food: { min: 40, average: 65, max: 100 }, activities: { min: 35, average: 62, max: 110 }, insurance: { min: 6, average: 10, max: 15 }, internet: { min: 3, average: 5, max: 8 }, extras: { min: 28, average: 50, max: 92 } } as BudgetCategories,
  Comfy: { accommodation: { min: 195, average: 290, max: 450 }, localTransport: { min: 28, average: 50, max: 85 }, food: { min: 80, average: 130, max: 205 }, activities: { min: 72, average: 130, max: 225 }, insurance: { min: 10, average: 15, max: 25 }, internet: { min: 5, average: 8, max: 12 }, extras: { min: 58, average: 110, max: 200 } } as BudgetCategories,
};

const portugalBudgets = {
  Budget: { accommodation: { min: 25, average: 42, max: 68 }, localTransport: { min: 6, average: 12, max: 22 }, food: { min: 15, average: 26, max: 42 }, activities: { min: 10, average: 20, max: 40 }, insurance: { min: 3, average: 6, max: 10 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 10, average: 18, max: 35 } } as BudgetCategories,
  Mid: { accommodation: { min: 68, average: 105, max: 160 }, localTransport: { min: 12, average: 22, max: 38 }, food: { min: 35, average: 55, max: 88 }, activities: { min: 25, average: 48, max: 88 }, insurance: { min: 6, average: 9, max: 14 }, internet: { min: 3, average: 5, max: 8 }, extras: { min: 22, average: 42, max: 78 } } as BudgetCategories,
  Comfy: { accommodation: { min: 160, average: 235, max: 370 }, localTransport: { min: 25, average: 45, max: 78 }, food: { min: 72, average: 115, max: 182 }, activities: { min: 55, average: 100, max: 178 }, insurance: { min: 9, average: 14, max: 23 }, internet: { min: 5, average: 8, max: 12 }, extras: { min: 48, average: 92, max: 168 } } as BudgetCategories,
};

const netherlandsBudgets = {
  Budget: { accommodation: { min: 45, average: 70, max: 108 }, localTransport: { min: 8, average: 15, max: 25 }, food: { min: 18, average: 32, max: 52 }, activities: { min: 15, average: 28, max: 52 }, insurance: { min: 4, average: 7, max: 11 }, internet: { min: 2, average: 4, max: 6 }, extras: { min: 14, average: 26, max: 50 } } as BudgetCategories,
  Mid: { accommodation: { min: 108, average: 160, max: 235 }, localTransport: { min: 15, average: 28, max: 48 }, food: { min: 40, average: 65, max: 100 }, activities: { min: 35, average: 62, max: 112 }, insurance: { min: 7, average: 11, max: 17 }, internet: { min: 4, average: 6, max: 10 }, extras: { min: 30, average: 55, max: 100 } } as BudgetCategories,
  Comfy: { accommodation: { min: 235, average: 330, max: 495 }, localTransport: { min: 30, average: 55, max: 92 }, food: { min: 82, average: 132, max: 208 }, activities: { min: 72, average: 130, max: 228 }, insurance: { min: 11, average: 17, max: 27 }, internet: { min: 6, average: 10, max: 15 }, extras: { min: 65, average: 120, max: 218 } } as BudgetCategories,
};

const germanyBudgets = {
  Budget: { accommodation: { min: 38, average: 60, max: 95 }, localTransport: { min: 8, average: 15, max: 26 }, food: { min: 16, average: 28, max: 46 }, activities: { min: 12, average: 24, max: 46 }, insurance: { min: 4, average: 6, max: 10 }, internet: { min: 2, average: 4, max: 6 }, extras: { min: 12, average: 22, max: 43 } } as BudgetCategories,
  Mid: { accommodation: { min: 95, average: 145, max: 215 }, localTransport: { min: 15, average: 26, max: 45 }, food: { min: 36, average: 58, max: 92 }, activities: { min: 30, average: 55, max: 100 }, insurance: { min: 6, average: 10, max: 15 }, internet: { min: 3, average: 5, max: 8 }, extras: { min: 27, average: 48, max: 90 } } as BudgetCategories,
  Comfy: { accommodation: { min: 215, average: 305, max: 460 }, localTransport: { min: 28, average: 50, max: 86 }, food: { min: 74, average: 120, max: 190 }, activities: { min: 62, average: 115, max: 205 }, insurance: { min: 10, average: 15, max: 25 }, internet: { min: 5, average: 8, max: 12 }, extras: { min: 55, average: 105, max: 192 } } as BudgetCategories,
};

const easternEuropeBudgets = {
  Budget: { accommodation: { min: 20, average: 35, max: 58 }, localTransport: { min: 5, average: 10, max: 18 }, food: { min: 12, average: 20, max: 35 }, activities: { min: 10, average: 20, max: 40 }, insurance: { min: 3, average: 5, max: 8 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 8, average: 16, max: 32 } } as BudgetCategories,
  Mid: { accommodation: { min: 58, average: 88, max: 138 }, localTransport: { min: 10, average: 18, max: 32 }, food: { min: 28, average: 45, max: 72 }, activities: { min: 25, average: 45, max: 82 }, insurance: { min: 5, average: 8, max: 13 }, internet: { min: 3, average: 5, max: 8 }, extras: { min: 20, average: 36, max: 68 } } as BudgetCategories,
  Comfy: { accommodation: { min: 138, average: 205, max: 325 }, localTransport: { min: 22, average: 38, max: 65 }, food: { min: 58, average: 95, max: 152 }, activities: { min: 52, average: 95, max: 168 }, insurance: { min: 8, average: 12, max: 20 }, internet: { min: 5, average: 8, max: 12 }, extras: { min: 42, average: 78, max: 145 } } as BudgetCategories,
};

const greeceBudgets = {
  Budget: { accommodation: { min: 25, average: 42, max: 68 }, localTransport: { min: 5, average: 10, max: 20 }, food: { min: 14, average: 24, max: 40 }, activities: { min: 10, average: 20, max: 40 }, insurance: { min: 3, average: 6, max: 10 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 10, average: 18, max: 36 } } as BudgetCategories,
  Mid: { accommodation: { min: 68, average: 105, max: 165 }, localTransport: { min: 12, average: 22, max: 38 }, food: { min: 30, average: 50, max: 80 }, activities: { min: 25, average: 48, max: 88 }, insurance: { min: 5, average: 9, max: 14 }, internet: { min: 3, average: 5, max: 8 }, extras: { min: 22, average: 40, max: 76 } } as BudgetCategories,
  Comfy: { accommodation: { min: 165, average: 250, max: 400 }, localTransport: { min: 25, average: 44, max: 78 }, food: { min: 62, average: 102, max: 165 }, activities: { min: 52, average: 98, max: 178 }, insurance: { min: 9, average: 14, max: 23 }, internet: { min: 5, average: 8, max: 12 }, extras: { min: 46, average: 88, max: 162 } } as BudgetCategories,
};

const turkeyBudgets = {
  Budget: { accommodation: { min: 18, average: 30, max: 52 }, localTransport: { min: 4, average: 8, max: 16 }, food: { min: 10, average: 18, max: 30 }, activities: { min: 10, average: 20, max: 40 }, insurance: { min: 3, average: 5, max: 8 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 8, average: 16, max: 32 } } as BudgetCategories,
  Mid: { accommodation: { min: 52, average: 80, max: 128 }, localTransport: { min: 10, average: 18, max: 32 }, food: { min: 24, average: 40, max: 65 }, activities: { min: 25, average: 46, max: 85 }, insurance: { min: 5, average: 8, max: 13 }, internet: { min: 3, average: 5, max: 8 }, extras: { min: 20, average: 36, max: 68 } } as BudgetCategories,
  Comfy: { accommodation: { min: 128, average: 195, max: 315 }, localTransport: { min: 22, average: 38, max: 65 }, food: { min: 50, average: 84, max: 138 }, activities: { min: 52, average: 96, max: 175 }, insurance: { min: 8, average: 12, max: 20 }, internet: { min: 5, average: 8, max: 12 }, extras: { min: 40, average: 76, max: 142 } } as BudgetCategories,
};

const switzerlandBudgets = {
  Budget: { accommodation: { min: 80, average: 115, max: 165 }, localTransport: { min: 15, average: 25, max: 42 }, food: { min: 30, average: 50, max: 80 }, activities: { min: 20, average: 40, max: 75 }, insurance: { min: 5, average: 8, max: 13 }, internet: { min: 3, average: 5, max: 8 }, extras: { min: 18, average: 35, max: 65 } } as BudgetCategories,
  Mid: { accommodation: { min: 165, average: 240, max: 345 }, localTransport: { min: 25, average: 42, max: 68 }, food: { min: 65, average: 105, max: 162 }, activities: { min: 48, average: 88, max: 158 }, insurance: { min: 9, average: 14, max: 22 }, internet: { min: 5, average: 8, max: 12 }, extras: { min: 40, average: 75, max: 138 } } as BudgetCategories,
  Comfy: { accommodation: { min: 345, average: 480, max: 700 }, localTransport: { min: 48, average: 82, max: 138 }, food: { min: 130, average: 210, max: 330 }, activities: { min: 98, average: 178, max: 308 }, insurance: { min: 15, average: 22, max: 35 }, internet: { min: 8, average: 12, max: 18 }, extras: { min: 80, average: 155, max: 285 } } as BudgetCategories,
};

const nordicBudgets = {
  Budget: { accommodation: { min: 55, average: 85, max: 130 }, localTransport: { min: 10, average: 18, max: 32 }, food: { min: 22, average: 38, max: 62 }, activities: { min: 15, average: 30, max: 58 }, insurance: { min: 4, average: 7, max: 11 }, internet: { min: 2, average: 4, max: 6 }, extras: { min: 14, average: 27, max: 52 } } as BudgetCategories,
  Mid: { accommodation: { min: 130, average: 190, max: 275 }, localTransport: { min: 18, average: 32, max: 55 }, food: { min: 48, average: 78, max: 122 }, activities: { min: 38, average: 68, max: 125 }, insurance: { min: 8, average: 12, max: 18 }, internet: { min: 4, average: 6, max: 10 }, extras: { min: 32, average: 58, max: 108 } } as BudgetCategories,
  Comfy: { accommodation: { min: 275, average: 390, max: 575 }, localTransport: { min: 35, average: 62, max: 105 }, food: { min: 98, average: 158, max: 248 }, activities: { min: 78, average: 142, max: 252 }, insurance: { min: 13, average: 20, max: 32 }, internet: { min: 6, average: 10, max: 15 }, extras: { min: 65, average: 122, max: 228 } } as BudgetCategories,
};

const thailandBudgets = {
  Budget: { accommodation: { min: 10, average: 18, max: 35 }, localTransport: { min: 3, average: 6, max: 14 }, food: { min: 6, average: 12, max: 22 }, activities: { min: 8, average: 18, max: 38 }, insurance: { min: 2, average: 4, max: 7 }, internet: { min: 1, average: 2, max: 4 }, extras: { min: 6, average: 12, max: 26 } } as BudgetCategories,
  Mid: { accommodation: { min: 35, average: 58, max: 95 }, localTransport: { min: 8, average: 15, max: 28 }, food: { min: 16, average: 28, max: 48 }, activities: { min: 22, average: 42, max: 80 }, insurance: { min: 4, average: 7, max: 11 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 15, average: 28, max: 56 } } as BudgetCategories,
  Comfy: { accommodation: { min: 95, average: 155, max: 260 }, localTransport: { min: 18, average: 32, max: 58 }, food: { min: 38, average: 65, max: 110 }, activities: { min: 50, average: 92, max: 168 }, insurance: { min: 7, average: 11, max: 18 }, internet: { min: 4, average: 6, max: 10 }, extras: { min: 35, average: 65, max: 122 } } as BudgetCategories,
};

const baliBudgets = {
  Budget: { accommodation: { min: 12, average: 22, max: 42 }, localTransport: { min: 4, average: 8, max: 18 }, food: { min: 6, average: 12, max: 22 }, activities: { min: 10, average: 20, max: 42 }, insurance: { min: 2, average: 4, max: 7 }, internet: { min: 1, average: 2, max: 4 }, extras: { min: 6, average: 13, max: 28 } } as BudgetCategories,
  Mid: { accommodation: { min: 42, average: 68, max: 115 }, localTransport: { min: 10, average: 18, max: 35 }, food: { min: 16, average: 28, max: 50 }, activities: { min: 25, average: 48, max: 90 }, insurance: { min: 4, average: 7, max: 11 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 16, average: 30, max: 60 } } as BudgetCategories,
  Comfy: { accommodation: { min: 115, average: 185, max: 320 }, localTransport: { min: 22, average: 40, max: 72 }, food: { min: 38, average: 65, max: 112 }, activities: { min: 55, average: 102, max: 188 }, insurance: { min: 7, average: 11, max: 18 }, internet: { min: 4, average: 6, max: 10 }, extras: { min: 38, average: 72, max: 138 } } as BudgetCategories,
};

const singaporeBudgets = {
  Budget: { accommodation: { min: 35, average: 58, max: 95 }, localTransport: { min: 5, average: 10, max: 18 }, food: { min: 10, average: 18, max: 32 }, activities: { min: 15, average: 30, max: 58 }, insurance: { min: 3, average: 5, max: 8 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 12, average: 22, max: 45 } } as BudgetCategories,
  Mid: { accommodation: { min: 95, average: 148, max: 228 }, localTransport: { min: 10, average: 18, max: 32 }, food: { min: 25, average: 42, max: 70 }, activities: { min: 38, average: 70, max: 130 }, insurance: { min: 5, average: 8, max: 13 }, internet: { min: 3, average: 5, max: 8 }, extras: { min: 28, average: 52, max: 98 } } as BudgetCategories,
  Comfy: { accommodation: { min: 228, average: 335, max: 520 }, localTransport: { min: 20, average: 36, max: 62 }, food: { min: 55, average: 90, max: 152 }, activities: { min: 78, average: 145, max: 268 }, insurance: { min: 9, average: 14, max: 23 }, internet: { min: 5, average: 8, max: 12 }, extras: { min: 58, average: 112, max: 215 } } as BudgetCategories,
};

const koreaVietnamBudgets = {
  Budget: { accommodation: { min: 18, average: 30, max: 52 }, localTransport: { min: 4, average: 8, max: 16 }, food: { min: 8, average: 15, max: 28 }, activities: { min: 10, average: 20, max: 42 }, insurance: { min: 2, average: 4, max: 7 }, internet: { min: 1, average: 2, max: 4 }, extras: { min: 7, average: 14, max: 30 } } as BudgetCategories,
  Mid: { accommodation: { min: 52, average: 82, max: 135 }, localTransport: { min: 10, average: 18, max: 32 }, food: { min: 20, average: 35, max: 60 }, activities: { min: 26, average: 48, max: 92 }, insurance: { min: 4, average: 7, max: 11 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 18, average: 33, max: 65 } } as BudgetCategories,
  Comfy: { accommodation: { min: 135, average: 205, max: 335 }, localTransport: { min: 22, average: 38, max: 68 }, food: { min: 45, average: 78, max: 132 }, activities: { min: 55, average: 102, max: 192 }, insurance: { min: 7, average: 11, max: 18 }, internet: { min: 4, average: 6, max: 10 }, extras: { min: 38, average: 72, max: 142 } } as BudgetCategories,
};

const indiaBudgets = {
  Budget: { accommodation: { min: 8, average: 15, max: 30 }, localTransport: { min: 2, average: 5, max: 12 }, food: { min: 5, average: 10, max: 20 }, activities: { min: 5, average: 12, max: 28 }, insurance: { min: 2, average: 3, max: 6 }, internet: { min: 1, average: 2, max: 3 }, extras: { min: 4, average: 9, max: 20 } } as BudgetCategories,
  Mid: { accommodation: { min: 30, average: 50, max: 88 }, localTransport: { min: 6, average: 12, max: 24 }, food: { min: 12, average: 22, max: 40 }, activities: { min: 14, average: 28, max: 58 }, insurance: { min: 3, average: 6, max: 10 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 10, average: 20, max: 42 } } as BudgetCategories,
  Comfy: { accommodation: { min: 88, average: 145, max: 250 }, localTransport: { min: 15, average: 28, max: 52 }, food: { min: 28, average: 52, max: 95 }, activities: { min: 32, average: 62, max: 122 }, insurance: { min: 6, average: 10, max: 17 }, internet: { min: 4, average: 6, max: 10 }, extras: { min: 25, average: 50, max: 105 } } as BudgetCategories,
};

const dubaiBudgets = {
  Budget: { accommodation: { min: 45, average: 75, max: 125 }, localTransport: { min: 5, average: 12, max: 25 }, food: { min: 15, average: 28, max: 52 }, activities: { min: 20, average: 42, max: 85 }, insurance: { min: 3, average: 6, max: 10 }, internet: { min: 2, average: 4, max: 7 }, extras: { min: 15, average: 30, max: 65 } } as BudgetCategories,
  Mid: { accommodation: { min: 125, average: 195, max: 310 }, localTransport: { min: 12, average: 24, max: 45 }, food: { min: 38, average: 65, max: 112 }, activities: { min: 52, average: 100, max: 195 }, insurance: { min: 6, average: 10, max: 17 }, internet: { min: 4, average: 6, max: 10 }, extras: { min: 38, average: 72, max: 145 } } as BudgetCategories,
  Comfy: { accommodation: { min: 310, average: 480, max: 780 }, localTransport: { min: 25, average: 48, max: 90 }, food: { min: 85, average: 145, max: 248 }, activities: { min: 112, average: 215, max: 415 }, insurance: { min: 11, average: 18, max: 30 }, internet: { min: 7, average: 12, max: 18 }, extras: { min: 85, average: 165, max: 325 } } as BudgetCategories,
};

const chinaBudgets = {
  Budget: { accommodation: { min: 18, average: 32, max: 58 }, localTransport: { min: 4, average: 8, max: 18 }, food: { min: 8, average: 15, max: 28 }, activities: { min: 8, average: 18, max: 38 }, insurance: { min: 2, average: 4, max: 7 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 7, average: 14, max: 30 } } as BudgetCategories,
  Mid: { accommodation: { min: 58, average: 95, max: 158 }, localTransport: { min: 10, average: 18, max: 35 }, food: { min: 20, average: 35, max: 62 }, activities: { min: 22, average: 42, max: 82 }, insurance: { min: 4, average: 7, max: 11 }, internet: { min: 3, average: 5, max: 8 }, extras: { min: 18, average: 34, max: 68 } } as BudgetCategories,
  Comfy: { accommodation: { min: 158, average: 248, max: 415 }, localTransport: { min: 22, average: 40, max: 72 }, food: { min: 48, average: 82, max: 142 }, activities: { min: 50, average: 95, max: 182 }, insurance: { min: 7, average: 11, max: 18 }, internet: { min: 5, average: 8, max: 12 }, extras: { min: 42, average: 82, max: 162 } } as BudgetCategories,
};

const australiaBudgets = {
  Budget: { accommodation: { min: 45, average: 72, max: 115 }, localTransport: { min: 8, average: 15, max: 28 }, food: { min: 18, average: 32, max: 55 }, activities: { min: 15, average: 30, max: 60 }, insurance: { min: 4, average: 7, max: 11 }, internet: { min: 2, average: 4, max: 7 }, extras: { min: 12, average: 24, max: 48 } } as BudgetCategories,
  Mid: { accommodation: { min: 115, average: 175, max: 265 }, localTransport: { min: 15, average: 28, max: 50 }, food: { min: 42, average: 70, max: 112 }, activities: { min: 40, average: 72, max: 135 }, insurance: { min: 7, average: 11, max: 17 }, internet: { min: 4, average: 6, max: 10 }, extras: { min: 30, average: 56, max: 108 } } as BudgetCategories,
  Comfy: { accommodation: { min: 265, average: 385, max: 580 }, localTransport: { min: 30, average: 55, max: 95 }, food: { min: 88, average: 145, max: 235 }, activities: { min: 82, average: 152, max: 278 }, insurance: { min: 12, average: 18, max: 29 }, internet: { min: 6, average: 10, max: 15 }, extras: { min: 62, average: 118, max: 228 } } as BudgetCategories,
};

const africaBudgets = {
  Budget: { accommodation: { min: 18, average: 32, max: 58 }, localTransport: { min: 5, average: 10, max: 20 }, food: { min: 10, average: 18, max: 32 }, activities: { min: 12, average: 24, max: 50 }, insurance: { min: 3, average: 5, max: 9 }, internet: { min: 2, average: 3, max: 6 }, extras: { min: 8, average: 16, max: 34 } } as BudgetCategories,
  Mid: { accommodation: { min: 58, average: 95, max: 158 }, localTransport: { min: 14, average: 26, max: 48 }, food: { min: 25, average: 44, max: 75 }, activities: { min: 32, average: 60, max: 115 }, insurance: { min: 5, average: 9, max: 15 }, internet: { min: 3, average: 5, max: 9 }, extras: { min: 22, average: 42, max: 82 } } as BudgetCategories,
  Comfy: { accommodation: { min: 158, average: 248, max: 415 }, localTransport: { min: 30, average: 55, max: 98 }, food: { min: 55, average: 95, max: 162 }, activities: { min: 72, average: 132, max: 252 }, insurance: { min: 9, average: 15, max: 26 }, internet: { min: 6, average: 10, max: 16 }, extras: { min: 48, average: 92, max: 182 } } as BudgetCategories,
};

const middleEastBudgets = {
  Budget: { accommodation: { min: 22, average: 38, max: 68 }, localTransport: { min: 4, average: 8, max: 18 }, food: { min: 10, average: 18, max: 32 }, activities: { min: 10, average: 20, max: 42 }, insurance: { min: 3, average: 5, max: 9 }, internet: { min: 2, average: 3, max: 6 }, extras: { min: 8, average: 16, max: 34 } } as BudgetCategories,
  Mid: { accommodation: { min: 68, average: 108, max: 178 }, localTransport: { min: 10, average: 20, max: 38 }, food: { min: 25, average: 44, max: 78 }, activities: { min: 26, average: 50, max: 98 }, insurance: { min: 5, average: 9, max: 15 }, internet: { min: 3, average: 5, max: 9 }, extras: { min: 22, average: 42, max: 85 } } as BudgetCategories,
  Comfy: { accommodation: { min: 178, average: 278, max: 468 }, localTransport: { min: 22, average: 42, max: 78 }, food: { min: 58, average: 100, max: 175 }, activities: { min: 58, average: 110, max: 215 }, insurance: { min: 9, average: 15, max: 26 }, internet: { min: 6, average: 10, max: 16 }, extras: { min: 50, average: 98, max: 195 } } as BudgetCategories,
};

const seAsiaBudgets = {
  Budget: { accommodation: { min: 8, average: 15, max: 30 }, localTransport: { min: 2, average: 5, max: 12 }, food: { min: 5, average: 9, max: 18 }, activities: { min: 6, average: 14, max: 30 }, insurance: { min: 2, average: 3, max: 6 }, internet: { min: 1, average: 2, max: 3 }, extras: { min: 4, average: 10, max: 22 } } as BudgetCategories,
  Mid: { accommodation: { min: 30, average: 50, max: 88 }, localTransport: { min: 6, average: 12, max: 24 }, food: { min: 12, average: 22, max: 40 }, activities: { min: 16, average: 32, max: 65 }, insurance: { min: 3, average: 6, max: 10 }, internet: { min: 2, average: 3, max: 5 }, extras: { min: 10, average: 22, max: 48 } } as BudgetCategories,
  Comfy: { accommodation: { min: 88, average: 148, max: 265 }, localTransport: { min: 14, average: 28, max: 55 }, food: { min: 28, average: 52, max: 98 }, activities: { min: 38, average: 75, max: 152 }, insurance: { min: 6, average: 10, max: 17 }, internet: { min: 4, average: 6, max: 10 }, extras: { min: 24, average: 50, max: 108 } } as BudgetCategories,
};

// ─── TEMPLATES ───────────────────────────────────────────────────────────────

export const TEMPLATES: Template[] = [

  // ════════════════════════════════════════
  // COLOMBIA (10 ciudades con aeropuerto)
  // ════════════════════════════════════════
  { id: 'colombia-bogota', name: 'Colombia - Bogotá', city: 'Bogotá', country: 'Colombia', currency: 'COP', budgets: colombiaBudgets },
  { id: 'colombia-medellin', name: 'Colombia - Medellín', city: 'Medellín', country: 'Colombia', currency: 'COP', budgets: colombiaBudgets },
  { id: 'colombia-cartagena', name: 'Colombia - Cartagena', city: 'Cartagena', country: 'Colombia', currency: 'COP', budgets: colombiaCaribeBudgets },
  { id: 'colombia-cali', name: 'Colombia - Cali', city: 'Cali', country: 'Colombia', currency: 'COP', budgets: colombiaBudgets },
  { id: 'colombia-barranquilla', name: 'Colombia - Barranquilla', city: 'Barranquilla', country: 'Colombia', currency: 'COP', budgets: colombiaCaribeBudgets },
  { id: 'colombia-bucaramanga', name: 'Colombia - Bucaramanga', city: 'Bucaramanga', country: 'Colombia', currency: 'COP', budgets: colombiaBudgets },
  { id: 'colombia-pereira', name: 'Colombia - Pereira', city: 'Pereira', country: 'Colombia', currency: 'COP', budgets: colombiaBudgets },
  { id: 'colombia-armenia', name: 'Colombia - Armenia', city: 'Armenia', country: 'Colombia', currency: 'COP', budgets: colombiaBudgets },
  { id: 'colombia-manizales', name: 'Colombia - Manizales', city: 'Manizales', country: 'Colombia', currency: 'COP', budgets: colombiaBudgets },
  { id: 'colombia-santa-marta', name: 'Colombia - Santa Marta', city: 'Santa Marta', country: 'Colombia', currency: 'COP', budgets: colombiaCaribeBudgets },
  { id: 'colombia-san-andres', name: 'Colombia - San Andrés', city: 'San Andrés', country: 'Colombia', currency: 'COP', budgets: colombiaCaribeBudgets },
  { id: 'colombia-cucuta', name: 'Colombia - Cúcuta', city: 'Cúcuta', country: 'Colombia', currency: 'COP', budgets: colombiaBudgets },
  { id: 'colombia-monteria', name: 'Colombia - Montería', city: 'Montería', country: 'Colombia', currency: 'COP', budgets: colombiaBudgets },
  { id: 'colombia-pasto', name: 'Colombia - Pasto', city: 'Pasto', country: 'Colombia', currency: 'COP', budgets: colombiaBudgets },
  { id: 'colombia-leticia', name: 'Colombia - Leticia', city: 'Leticia', country: 'Colombia', currency: 'COP', budgets: colombiaBudgets },

  // ════════════════════════════════════════
  // MEXICO
  // ════════════════════════════════════════
  { id: 'mexico-cdmx', name: 'Mexico - Ciudad de México', city: 'Mexico City', country: 'Mexico', currency: 'MXN', budgets: mexicoBudgets },
  { id: 'mexico-cancun', name: 'Mexico - Cancún', city: 'Cancún', country: 'Mexico', currency: 'MXN', budgets: mexicoBudgets },
  { id: 'mexico-guadalajara', name: 'Mexico - Guadalajara', city: 'Guadalajara', country: 'Mexico', currency: 'MXN', budgets: mexicoBudgets },
  { id: 'mexico-monterrey', name: 'Mexico - Monterrey', city: 'Monterrey', country: 'Mexico', currency: 'MXN', budgets: mexicoBudgets },
  { id: 'mexico-tijuana', name: 'Mexico - Tijuana', city: 'Tijuana', country: 'Mexico', currency: 'MXN', budgets: mexicoBudgets },
  { id: 'mexico-merida', name: 'Mexico - Mérida', city: 'Mérida', country: 'Mexico', currency: 'MXN', budgets: mexicoBudgets },
  { id: 'mexico-oaxaca', name: 'Mexico - Oaxaca', city: 'Oaxaca', country: 'Mexico', currency: 'MXN', budgets: mexicoBudgets },
  { id: 'mexico-los-cabos', name: 'Mexico - Los Cabos', city: 'Los Cabos', country: 'Mexico', currency: 'MXN', budgets: mexicoBudgets },
  { id: 'mexico-puerto-vallarta', name: 'Mexico - Puerto Vallarta', city: 'Puerto Vallarta', country: 'Mexico', currency: 'MXN', budgets: mexicoBudgets },

  // ════════════════════════════════════════
  // LATINOAMÉRICA
  // ════════════════════════════════════════
  { id: 'brazil-sao-paulo', name: 'Brazil - São Paulo', city: 'São Paulo', country: 'Brazil', currency: 'BRL', budgets: brazilBudgets },
  { id: 'brazil-rio', name: 'Brazil - Rio de Janeiro', city: 'Rio de Janeiro', country: 'Brazil', currency: 'BRL', budgets: brazilBudgets },
  { id: 'brazil-brasilia', name: 'Brazil - Brasília', city: 'Brasília', country: 'Brazil', currency: 'BRL', budgets: brazilBudgets },
  { id: 'brazil-fortaleza', name: 'Brazil - Fortaleza', city: 'Fortaleza', country: 'Brazil', currency: 'BRL', budgets: brazilBudgets },
  { id: 'brazil-salvador', name: 'Brazil - Salvador', city: 'Salvador', country: 'Brazil', currency: 'BRL', budgets: brazilBudgets },
  { id: 'brazil-manaus', name: 'Brazil - Manaus', city: 'Manaus', country: 'Brazil', currency: 'BRL', budgets: brazilBudgets },
  { id: 'argentina-buenosaires', name: 'Argentina - Buenos Aires', city: 'Buenos Aires', country: 'Argentina', currency: 'USD', budgets: argentinaChileBudgets },
  { id: 'argentina-mendoza', name: 'Argentina - Mendoza', city: 'Mendoza', country: 'Argentina', currency: 'USD', budgets: argentinaChileBudgets },
  { id: 'argentina-cordoba', name: 'Argentina - Córdoba', city: 'Córdoba', country: 'Argentina', currency: 'USD', budgets: argentinaChileBudgets },
  { id: 'chile-santiago', name: 'Chile - Santiago', city: 'Santiago', country: 'Chile', currency: 'USD', budgets: argentinaChileBudgets },
  { id: 'chile-punta-arenas', name: 'Chile - Punta Arenas', city: 'Punta Arenas', country: 'Chile', currency: 'USD', budgets: argentinaChileBudgets },
  { id: 'peru-lima', name: 'Peru - Lima', city: 'Lima', country: 'Peru', currency: 'USD', budgets: peruBudgets },
  { id: 'peru-cusco', name: 'Peru - Cusco', city: 'Cusco', country: 'Peru', currency: 'USD', budgets: peruBudgets },
  { id: 'peru-arequipa', name: 'Peru - Arequipa', city: 'Arequipa', country: 'Peru', currency: 'USD', budgets: peruBudgets },
  { id: 'ecuador-quito', name: 'Ecuador - Quito', city: 'Quito', country: 'Ecuador', currency: 'USD', budgets: centralAmericaBudgets },
  { id: 'ecuador-guayaquil', name: 'Ecuador - Guayaquil', city: 'Guayaquil', country: 'Ecuador', currency: 'USD', budgets: centralAmericaBudgets },
  { id: 'ecuador-galapagos', name: 'Ecuador - Galápagos', city: 'Galápagos', country: 'Ecuador', currency: 'USD', budgets: centralAmericaBudgets },
  { id: 'venezuela-caracas', name: 'Venezuela - Caracas', city: 'Caracas', country: 'Venezuela', currency: 'USD', budgets: centralAmericaBudgets },
  { id: 'bolivia-lapaz', name: 'Bolivia - La Paz', city: 'La Paz', country: 'Bolivia', currency: 'USD', budgets: peruBudgets },
  { id: 'bolivia-santa-cruz', name: 'Bolivia - Santa Cruz', city: 'Santa Cruz', country: 'Bolivia', currency: 'USD', budgets: peruBudgets },
  { id: 'paraguay-asuncion', name: 'Paraguay - Asunción', city: 'Asunción', country: 'Paraguay', currency: 'USD', budgets: peruBudgets },
  { id: 'uruguay-montevideo', name: 'Uruguay - Montevideo', city: 'Montevideo', country: 'Uruguay', currency: 'USD', budgets: argentinaChileBudgets },
  { id: 'panama-city', name: 'Panamá - Ciudad de Panamá', city: 'Panama City', country: 'Panama', currency: 'USD', budgets: centralAmericaBudgets },
  { id: 'costarica-sanjose', name: 'Costa Rica - San José', city: 'San José', country: 'Costa Rica', currency: 'USD', budgets: centralAmericaBudgets },
  { id: 'costarica-liberia', name: 'Costa Rica - Liberia', city: 'Liberia', country: 'Costa Rica', currency: 'USD', budgets: centralAmericaBudgets },
  { id: 'guatemala-city', name: 'Guatemala - Ciudad de Guatemala', city: 'Guatemala City', country: 'Guatemala', currency: 'USD', budgets: centralAmericaBudgets },
  { id: 'honduras-tegucigalpa', name: 'Honduras - Tegucigalpa', city: 'Tegucigalpa', country: 'Honduras', currency: 'USD', budgets: centralAmericaBudgets },
  { id: 'nicaragua-managua', name: 'Nicaragua - Managua', city: 'Managua', country: 'Nicaragua', currency: 'USD', budgets: centralAmericaBudgets },
  { id: 'elsalvador-sansalvador', name: 'El Salvador - San Salvador', city: 'San Salvador', country: 'El Salvador', currency: 'USD', budgets: centralAmericaBudgets },
  { id: 'domrep-puntacana', name: 'Rep. Dominicana - Punta Cana', city: 'Punta Cana', country: 'Dominican Republic', currency: 'USD', budgets: centralAmericaBudgets },
  { id: 'domrep-santodomingo', name: 'Rep. Dominicana - Santo Domingo', city: 'Santo Domingo', country: 'Dominican Republic', currency: 'USD', budgets: centralAmericaBudgets },
  { id: 'cuba-havana', name: 'Cuba - La Habana', city: 'Havana', country: 'Cuba', currency: 'USD', budgets: centralAmericaBudgets },
  { id: 'jamaica-kingston', name: 'Jamaica - Kingston', city: 'Kingston', country: 'Jamaica', currency: 'USD', budgets: centralAmericaBudgets },
  { id: 'trinidad-portofspain', name: 'Trinidad - Port of Spain', city: 'Port of Spain', country: 'Trinidad and Tobago', currency: 'USD', budgets: centralAmericaBudgets },

  // ════════════════════════════════════════
  // USA
  // ════════════════════════════════════════
  { id: 'usa-nyc', name: 'USA - New York', city: 'New York', country: 'USA', currency: 'USD', budgets: usaMajorBudgets },
  { id: 'usa-miami', name: 'USA - Miami', city: 'Miami', country: 'USA', currency: 'USD', budgets: usaMajorBudgets },
  { id: 'usa-losangeles', name: 'USA - Los Angeles', city: 'Los Angeles', country: 'USA', currency: 'USD', budgets: usaMajorBudgets },
  { id: 'usa-chicago', name: 'USA - Chicago', city: 'Chicago', country: 'USA', currency: 'USD', budgets: usaMajorBudgets },
  { id: 'usa-sanfrancisco', name: 'USA - San Francisco', city: 'San Francisco', country: 'USA', currency: 'USD', budgets: usaMajorBudgets },
  { id: 'usa-lasvegas', name: 'USA - Las Vegas', city: 'Las Vegas', country: 'USA', currency: 'USD', budgets: usaMajorBudgets },
  { id: 'usa-orlando', name: 'USA - Orlando', city: 'Orlando', country: 'USA', currency: 'USD', budgets: usaMidBudgets },
  { id: 'usa-houston', name: 'USA - Houston', city: 'Houston', country: 'USA', currency: 'USD', budgets: usaMidBudgets },
  { id: 'usa-atlanta', name: 'USA - Atlanta', city: 'Atlanta', country: 'USA', currency: 'USD', budgets: usaMidBudgets },
  { id: 'usa-boston', name: 'USA - Boston', city: 'Boston', country: 'USA', currency: 'USD', budgets: usaMajorBudgets },
  { id: 'usa-seattle', name: 'USA - Seattle', city: 'Seattle', country: 'USA', currency: 'USD', budgets: usaMajorBudgets },
  { id: 'usa-denver', name: 'USA - Denver', city: 'Denver', country: 'USA', currency: 'USD', budgets: usaMidBudgets },
  { id: 'usa-washington', name: 'USA - Washington DC', city: 'Washington DC', country: 'USA', currency: 'USD', budgets: usaMajorBudgets },
  { id: 'usa-phoenix', name: 'USA - Phoenix', city: 'Phoenix', country: 'USA', currency: 'USD', budgets: usaMidBudgets },
  { id: 'usa-neworleans', name: 'USA - New Orleans', city: 'New Orleans', country: 'USA', currency: 'USD', budgets: usaMidBudgets },
  { id: 'usa-honolulu', name: 'USA - Honolulu', city: 'Honolulu', country: 'USA', currency: 'USD', budgets: usaMajorBudgets },
  { id: 'usa-nashville', name: 'USA - Nashville', city: 'Nashville', country: 'USA', currency: 'USD', budgets: usaMidBudgets },

  // ════════════════════════════════════════
  // CANADA
  // ════════════════════════════════════════
  { id: 'canada-toronto', name: 'Canada - Toronto', city: 'Toronto', country: 'Canada', currency: 'CAD', budgets: canadaBudgets },
  { id: 'canada-vancouver', name: 'Canada - Vancouver', city: 'Vancouver', country: 'Canada', currency: 'CAD', budgets: canadaBudgets },
  { id: 'canada-montreal', name: 'Canada - Montréal', city: 'Montreal', country: 'Canada', currency: 'CAD', budgets: canadaBudgets },
  { id: 'canada-calgary', name: 'Canada - Calgary', city: 'Calgary', country: 'Canada', currency: 'CAD', budgets: canadaBudgets },
  { id: 'canada-ottawa', name: 'Canada - Ottawa', city: 'Ottawa', country: 'Canada', currency: 'CAD', budgets: canadaBudgets },

  // ════════════════════════════════════════
  // EUROPA
  // ════════════════════════════════════════
  { id: 'uk-london', name: 'UK - London', city: 'London', country: 'United Kingdom', currency: 'GBP', budgets: ukBudgets },
  { id: 'uk-manchester', name: 'UK - Manchester', city: 'Manchester', country: 'United Kingdom', currency: 'GBP', budgets: ukBudgets },
  { id: 'uk-edinburgh', name: 'UK - Edinburgh', city: 'Edinburgh', country: 'United Kingdom', currency: 'GBP', budgets: ukBudgets },
  { id: 'france-paris', name: 'France - París', city: 'Paris', country: 'France', currency: 'EUR', budgets: franceBudgets },
  { id: 'france-nice', name: 'France - Niza', city: 'Nice', country: 'France', currency: 'EUR', budgets: franceBudgets },
  { id: 'france-lyon', name: 'France - Lyon', city: 'Lyon', country: 'France', currency: 'EUR', budgets: franceBudgets },
  { id: 'spain-barcelona', name: 'Spain - Barcelona', city: 'Barcelona', country: 'Spain', currency: 'EUR', budgets: spainBudgets },
  { id: 'spain-madrid', name: 'Spain - Madrid', city: 'Madrid', country: 'Spain', currency: 'EUR', budgets: spainBudgets },
  { id: 'spain-malaga', name: 'Spain - Málaga', city: 'Málaga', country: 'Spain', currency: 'EUR', budgets: spainBudgets },
  { id: 'spain-seville', name: 'Spain - Sevilla', city: 'Seville', country: 'Spain', currency: 'EUR', budgets: spainBudgets },
  { id: 'spain-palma', name: 'Spain - Palma de Mallorca', city: 'Palma', country: 'Spain', currency: 'EUR', budgets: spainBudgets },
  { id: 'spain-tenerife', name: 'Spain - Tenerife', city: 'Tenerife', country: 'Spain', currency: 'EUR', budgets: spainBudgets },
  { id: 'italy-rome', name: 'Italy - Roma', city: 'Rome', country: 'Italy', currency: 'EUR', budgets: italyBudgets },
  { id: 'italy-milan', name: 'Italy - Milán', city: 'Milan', country: 'Italy', currency: 'EUR', budgets: italyBudgets },
  { id: 'italy-venice', name: 'Italy - Venecia', city: 'Venice', country: 'Italy', currency: 'EUR', budgets: italyBudgets },
  { id: 'italy-florence', name: 'Italy - Florencia', city: 'Florence', country: 'Italy', currency: 'EUR', budgets: italyBudgets },
  { id: 'italy-naples', name: 'Italy - Nápoles', city: 'Naples', country: 'Italy', currency: 'EUR', budgets: italyBudgets },
  { id: 'italy-catania', name: 'Italy - Catania (Sicilia)', city: 'Catania', country: 'Italy', currency: 'EUR', budgets: italyBudgets },
  { id: 'portugal-lisbon', name: 'Portugal - Lisboa', city: 'Lisbon', country: 'Portugal', currency: 'EUR', budgets: portugalBudgets },
  { id: 'portugal-porto', name: 'Portugal - Oporto', city: 'Porto', country: 'Portugal', currency: 'EUR', budgets: portugalBudgets },
  { id: 'portugal-faro', name: 'Portugal - Faro (Algarve)', city: 'Faro', country: 'Portugal', currency: 'EUR', budgets: portugalBudgets },
  { id: 'netherlands-amsterdam', name: 'Netherlands - Ámsterdam', city: 'Amsterdam', country: 'Netherlands', currency: 'EUR', budgets: netherlandsBudgets },
  { id: 'germany-berlin', name: 'Germany - Berlín', city: 'Berlin', country: 'Germany', currency: 'EUR', budgets: germanyBudgets },
  { id: 'germany-munich', name: 'Germany - Múnich', city: 'Munich', country: 'Germany', currency: 'EUR', budgets: germanyBudgets },
  { id: 'germany-frankfurt', name: 'Germany - Frankfurt', city: 'Frankfurt', country: 'Germany', currency: 'EUR', budgets: germanyBudgets },
  { id: 'germany-hamburg', name: 'Germany - Hamburgo', city: 'Hamburg', country: 'Germany', currency: 'EUR', budgets: germanyBudgets },
  { id: 'czech-prague', name: 'Czech Republic - Praga', city: 'Prague', country: 'Czech Republic', currency: 'EUR', budgets: easternEuropeBudgets },
  { id: 'hungary-budapest', name: 'Hungary - Budapest', city: 'Budapest', country: 'Hungary', currency: 'EUR', budgets: easternEuropeBudgets },
  { id: 'poland-warsaw', name: 'Poland - Varsovia', city: 'Warsaw', country: 'Poland', currency: 'EUR', budgets: easternEuropeBudgets },
  { id: 'poland-krakow', name: 'Poland - Cracovia', city: 'Kraków', country: 'Poland', currency: 'EUR', budgets: easternEuropeBudgets },
  { id: 'austria-vienna', name: 'Austria - Viena', city: 'Vienna', country: 'Austria', currency: 'EUR', budgets: germanyBudgets },
  { id: 'belgium-brussels', name: 'Belgium - Bruselas', city: 'Brussels', country: 'Belgium', currency: 'EUR', budgets: netherlandsBudgets },
  { id: 'switzerland-zurich', name: 'Switzerland - Zúrich', city: 'Zurich', country: 'Switzerland', currency: 'CHF', budgets: switzerlandBudgets },
  { id: 'switzerland-geneva', name: 'Switzerland - Ginebra', city: 'Geneva', country: 'Switzerland', currency: 'CHF', budgets: switzerlandBudgets },
  { id: 'sweden-stockholm', name: 'Sweden - Estocolmo', city: 'Stockholm', country: 'Sweden', currency: 'SEK', budgets: nordicBudgets },
  { id: 'norway-oslo', name: 'Norway - Oslo', city: 'Oslo', country: 'Norway', currency: 'SEK', budgets: nordicBudgets },
  { id: 'denmark-copenhagen', name: 'Denmark - Copenhague', city: 'Copenhagen', country: 'Denmark', currency: 'SEK', budgets: nordicBudgets },
  { id: 'finland-helsinki', name: 'Finland - Helsinki', city: 'Helsinki', country: 'Finland', currency: 'EUR', budgets: nordicBudgets },
  { id: 'ireland-dublin', name: 'Ireland - Dublín', city: 'Dublin', country: 'Ireland', currency: 'EUR', budgets: ukBudgets },
  { id: 'greece-athens', name: 'Greece - Atenas', city: 'Athens', country: 'Greece', currency: 'EUR', budgets: greeceBudgets },
  { id: 'greece-santorini', name: 'Greece - Santorini', city: 'Santorini', country: 'Greece', currency: 'EUR', budgets: greeceBudgets },
  { id: 'greece-thessaloniki', name: 'Greece - Tesalónica', city: 'Thessaloniki', country: 'Greece', currency: 'EUR', budgets: greeceBudgets },
  { id: 'turkey-istanbul', name: 'Turkey - Estambul', city: 'Istanbul', country: 'Turkey', currency: 'USD', budgets: turkeyBudgets },
  { id: 'turkey-antalya', name: 'Turkey - Antalya', city: 'Antalya', country: 'Turkey', currency: 'USD', budgets: turkeyBudgets },
  { id: 'croatia-dubrovnik', name: 'Croatia - Dubrovnik', city: 'Dubrovnik', country: 'Croatia', currency: 'EUR', budgets: easternEuropeBudgets },
  { id: 'croatia-split', name: 'Croatia - Split', city: 'Split', country: 'Croatia', currency: 'EUR', budgets: easternEuropeBudgets },
  { id: 'romania-bucharest', name: 'Romania - Bucarest', city: 'Bucharest', country: 'Romania', currency: 'EUR', budgets: easternEuropeBudgets },
  { id: 'serbia-belgrade', name: 'Serbia - Belgrado', city: 'Belgrade', country: 'Serbia', currency: 'EUR', budgets: easternEuropeBudgets },
  { id: 'iceland-reykjavik', name: 'Iceland - Reikiavik', city: 'Reykjavik', country: 'Iceland', currency: 'EUR', budgets: switzerlandBudgets },

  // ════════════════════════════════════════
  // ASIA
  // ════════════════════════════════════════
  { id: 'japan-tokyo', name: 'Japan - Tokyo', city: 'Tokyo', country: 'Japan', currency: 'JPY', budgets: japanBudgets },
  { id: 'japan-osaka', name: 'Japan - Osaka', city: 'Osaka', country: 'Japan', currency: 'JPY', budgets: japanBudgets },
  { id: 'japan-kyoto', name: 'Japan - Kyoto', city: 'Kyoto', country: 'Japan', currency: 'JPY', budgets: japanBudgets },
  { id: 'japan-fukuoka', name: 'Japan - Fukuoka', city: 'Fukuoka', country: 'Japan', currency: 'JPY', budgets: japanBudgets },
  { id: 'japan-sapporo', name: 'Japan - Sapporo', city: 'Sapporo', country: 'Japan', currency: 'JPY', budgets: japanBudgets },
  { id: 'thailand-bangkok', name: 'Thailand - Bangkok', city: 'Bangkok', country: 'Thailand', currency: 'THB', budgets: thailandBudgets },
  { id: 'thailand-phuket', name: 'Thailand - Phuket', city: 'Phuket', country: 'Thailand', currency: 'THB', budgets: thailandBudgets },
  { id: 'thailand-chiangmai', name: 'Thailand - Chiang Mai', city: 'Chiang Mai', country: 'Thailand', currency: 'THB', budgets: thailandBudgets },
  { id: 'thailand-krabi', name: 'Thailand - Krabi', city: 'Krabi', country: 'Thailand', currency: 'THB', budgets: thailandBudgets },
  { id: 'indonesia-bali', name: 'Indonesia - Bali', city: 'Bali', country: 'Indonesia', currency: 'USD', budgets: baliBudgets },
  { id: 'indonesia-jakarta', name: 'Indonesia - Yakarta', city: 'Jakarta', country: 'Indonesia', currency: 'USD', budgets: seAsiaBudgets },
  { id: 'indonesia-yogyakarta', name: 'Indonesia - Yogyakarta', city: 'Yogyakarta', country: 'Indonesia', currency: 'USD', budgets: seAsiaBudgets },
  { id: 'singapore', name: 'Singapore', city: 'Singapore', country: 'Singapore', currency: 'USD', budgets: singaporeBudgets },
  { id: 'korea-seoul', name: 'South Korea - Seúl', city: 'Seoul', country: 'South Korea', currency: 'KRW', budgets: koreaVietnamBudgets },
  { id: 'korea-busan', name: 'South Korea - Busan', city: 'Busan', country: 'South Korea', currency: 'KRW', budgets: koreaVietnamBudgets },
  { id: 'vietnam-hcmc', name: 'Vietnam - Ho Chi Minh City', city: 'Ho Chi Minh City', country: 'Vietnam', currency: 'USD', budgets: seAsiaBudgets },
  { id: 'vietnam-hanoi', name: 'Vietnam - Hanoi', city: 'Hanoi', country: 'Vietnam', currency: 'USD', budgets: seAsiaBudgets },
  { id: 'vietnam-danang', name: 'Vietnam - Da Nang', city: 'Da Nang', country: 'Vietnam', currency: 'USD', budgets: seAsiaBudgets },
  { id: 'malaysia-kl', name: 'Malaysia - Kuala Lumpur', city: 'Kuala Lumpur', country: 'Malaysia', currency: 'USD', budgets: seAsiaBudgets },
  { id: 'malaysia-penang', name: 'Malaysia - Penang', city: 'Penang', country: 'Malaysia', currency: 'USD', budgets: seAsiaBudgets },
  { id: 'philippines-manila', name: 'Philippines - Manila', city: 'Manila', country: 'Philippines', currency: 'USD', budgets: seAsiaBudgets },
  { id: 'philippines-cebu', name: 'Philippines - Cebú', city: 'Cebu', country: 'Philippines', currency: 'USD', budgets: seAsiaBudgets },
  { id: 'philippines-palawan', name: 'Philippines - Palawan', city: 'Puerto Princesa', country: 'Philippines', currency: 'USD', budgets: seAsiaBudgets },
  { id: 'cambodia-siemreap', name: 'Cambodia - Siem Reap', city: 'Siem Reap', country: 'Cambodia', currency: 'USD', budgets: seAsiaBudgets },
  { id: 'cambodia-phnompenh', name: 'Cambodia - Phnom Penh', city: 'Phnom Penh', country: 'Cambodia', currency: 'USD', budgets: seAsiaBudgets },
  { id: 'myanmar-yangon', name: 'Myanmar - Yangón', city: 'Yangon', country: 'Myanmar', currency: 'USD', budgets: seAsiaBudgets },
  { id: 'laos-vientiane', name: 'Laos - Vientiane', city: 'Vientiane', country: 'Laos', currency: 'USD', budgets: seAsiaBudgets },
  { id: 'nepal-kathmandu', name: 'Nepal - Katmandú', city: 'Kathmandu', country: 'Nepal', currency: 'USD', budgets: seAsiaBudgets },
  { id: 'india-delhi', name: 'India - Delhi', city: 'New Delhi', country: 'India', currency: 'INR', budgets: indiaBudgets },
  { id: 'india-mumbai', name: 'India - Bombay', city: 'Mumbai', country: 'India', currency: 'INR', budgets: indiaBudgets },
  { id: 'india-goa', name: 'India - Goa', city: 'Goa', country: 'India', currency: 'INR', budgets: indiaBudgets },
  { id: 'india-bangalore', name: 'India - Bangalore', city: 'Bangalore', country: 'India', currency: 'INR', budgets: indiaBudgets },
  { id: 'india-jaipur', name: 'India - Jaipur', city: 'Jaipur', country: 'India', currency: 'INR', budgets: indiaBudgets },
  { id: 'india-chennai', name: 'India - Chennai', city: 'Chennai', country: 'India', currency: 'INR', budgets: indiaBudgets },
  { id: 'srilanka-colombo', name: 'Sri Lanka - Colombo', city: 'Colombo', country: 'Sri Lanka', currency: 'USD', budgets: seAsiaBudgets },
  { id: 'uae-dubai', name: 'UAE - Dubai', city: 'Dubai', country: 'UAE', currency: 'USD', budgets: dubaiBudgets },
  { id: 'uae-abudhabi', name: 'UAE - Abu Dhabi', city: 'Abu Dhabi', country: 'UAE', currency: 'USD', budgets: dubaiBudgets },
  { id: 'qatar-doha', name: 'Qatar - Doha', city: 'Doha', country: 'Qatar', currency: 'USD', budgets: dubaiBudgets },
  { id: 'china-beijing', name: 'China - Pekín', city: 'Beijing', country: 'China', currency: 'CNY', budgets: chinaBudgets },
  { id: 'china-shanghai', name: 'China - Shanghái', city: 'Shanghai', country: 'China', currency: 'CNY', budgets: chinaBudgets },
  { id: 'china-guangzhou', name: 'China - Guangzhou', city: 'Guangzhou', country: 'China', currency: 'CNY', budgets: chinaBudgets },
  { id: 'hongkong', name: 'Hong Kong', city: 'Hong Kong', country: 'Hong Kong', currency: 'USD', budgets: singaporeBudgets },
  { id: 'taiwan-taipei', name: 'Taiwan - Taipéi', city: 'Taipei', country: 'Taiwan', currency: 'USD', budgets: koreaVietnamBudgets },
  { id: 'israel-telaviv', name: 'Israel - Tel Aviv', city: 'Tel Aviv', country: 'Israel', currency: 'USD', budgets: middleEastBudgets },
  { id: 'jordan-amman', name: 'Jordan - Amán', city: 'Amman', country: 'Jordan', currency: 'USD', budgets: middleEastBudgets },
  { id: 'georgia-tbilisi', name: 'Georgia - Tiflis', city: 'Tbilisi', country: 'Georgia', currency: 'USD', budgets: easternEuropeBudgets },

  // ════════════════════════════════════════
  // OCEANÍA
  // ════════════════════════════════════════
  { id: 'australia-sydney', name: 'Australia - Sídney', city: 'Sydney', country: 'Australia', currency: 'AUD', budgets: australiaBudgets },
  { id: 'australia-melbourne', name: 'Australia - Melbourne', city: 'Melbourne', country: 'Australia', currency: 'AUD', budgets: australiaBudgets },
  { id: 'australia-brisbane', name: 'Australia - Brisbane', city: 'Brisbane', country: 'Australia', currency: 'AUD', budgets: australiaBudgets },
  { id: 'australia-perth', name: 'Australia - Perth', city: 'Perth', country: 'Australia', currency: 'AUD', budgets: australiaBudgets },
  { id: 'australia-cairns', name: 'Australia - Cairns', city: 'Cairns', country: 'Australia', currency: 'AUD', budgets: australiaBudgets },
  { id: 'newzealand-auckland', name: 'New Zealand - Auckland', city: 'Auckland', country: 'New Zealand', currency: 'AUD', budgets: australiaBudgets },
  { id: 'newzealand-queenstown', name: 'New Zealand - Queenstown', city: 'Queenstown', country: 'New Zealand', currency: 'AUD', budgets: australiaBudgets },
  { id: 'fiji-nadi', name: 'Fiji - Nadi', city: 'Nadi', country: 'Fiji', currency: 'USD', budgets: centralAmericaBudgets },

  // ════════════════════════════════════════
  // ÁFRICA
  // ════════════════════════════════════════
  { id: 'morocco-marrakech', name: 'Morocco - Marrakech', city: 'Marrakech', country: 'Morocco', currency: 'USD', budgets: africaBudgets },
  { id: 'morocco-casablanca', name: 'Morocco - Casablanca', city: 'Casablanca', country: 'Morocco', currency: 'USD', budgets: africaBudgets },
  { id: 'southafrica-capetown', name: 'South Africa - Ciudad del Cabo', city: 'Cape Town', country: 'South Africa', currency: 'USD', budgets: africaBudgets },
  { id: 'southafrica-johannesburg', name: 'South Africa - Johannesburgo', city: 'Johannesburg', country: 'South Africa', currency: 'USD', budgets: africaBudgets },
  { id: 'egypt-cairo', name: 'Egypt - El Cairo', city: 'Cairo', country: 'Egypt', currency: 'USD', budgets: africaBudgets },
  { id: 'egypt-sharmelsheikh', name: 'Egypt - Sharm el-Sheij', city: 'Sharm el-Sheikh', country: 'Egypt', currency: 'USD', budgets: africaBudgets },
  { id: 'kenya-nairobi', name: 'Kenya - Nairobi', city: 'Nairobi', country: 'Kenya', currency: 'USD', budgets: africaBudgets },
  { id: 'tanzania-zanzibar', name: 'Tanzania - Zanzíbar', city: 'Zanzibar', country: 'Tanzania', currency: 'USD', budgets: africaBudgets },
  { id: 'ethiopia-addisababa', name: 'Ethiopia - Adís Abeba', city: 'Addis Ababa', country: 'Ethiopia', currency: 'USD', budgets: africaBudgets },
  { id: 'ghana-accra', name: 'Ghana - Acra', city: 'Accra', country: 'Ghana', currency: 'USD', budgets: africaBudgets },
  { id: 'nigeria-lagos', name: 'Nigeria - Lagos', city: 'Lagos', country: 'Nigeria', currency: 'USD', budgets: africaBudgets },
  { id: 'senegal-dakar', name: 'Senegal - Dakar', city: 'Dakar', country: 'Senegal', currency: 'USD', budgets: africaBudgets },
  { id: 'mauritius', name: 'Mauritius - Port Louis', city: 'Port Louis', country: 'Mauritius', currency: 'USD', budgets: africaBudgets },
];

export const getTemplateById = (id: string): Template | undefined =>
  TEMPLATES.find(t => t.id === id);

export const getTemplatesByCountry = (country: string): Template[] =>
  TEMPLATES.filter(t => t.country === country);
