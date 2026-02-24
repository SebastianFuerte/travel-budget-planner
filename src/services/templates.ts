// src/services/templates.ts

import { Template, BudgetCategories } from '../types';

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

const usaBudgets = {
  Budget: {
    accommodation: { min: 40, average: 60, max: 80 },
    localTransport: { min: 15, average: 25, max: 40 },
    food: { min: 25, average: 40, max: 60 },
    activities: { min: 20, average: 40, max: 70 },
    insurance: { min: 5, average: 8, max: 12 },
    internet: { min: 2, average: 3, max: 5 },
    extras: { min: 15, average: 30, max: 50 },
  } as BudgetCategories,
  Mid: {
    accommodation: { min: 80, average: 120, max: 180 },
    localTransport: { min: 25, average: 40, max: 60 },
    food: { min: 50, average: 80, max: 120 },
    activities: { min: 50, average: 80, max: 150 },
    insurance: { min: 8, average: 12, max: 18 },
    internet: { min: 3, average: 5, max: 8 },
    extras: { min: 40, average: 70, max: 120 },
  } as BudgetCategories,
  Comfy: {
    accommodation: { min: 180, average: 280, max: 450 },
    localTransport: { min: 40, average: 70, max: 120 },
    food: { min: 100, average: 150, max: 250 },
    activities: { min: 100, average: 180, max: 300 },
    insurance: { min: 12, average: 18, max: 30 },
    internet: { min: 5, average: 8, max: 12 },
    extras: { min: 80, average: 150, max: 250 },
  } as BudgetCategories,
};

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

export const TEMPLATES: Template[] = [
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
    id: 'usa-nyc',
    name: 'USA - New York',
    city: 'New York',
    country: 'USA',
    currency: 'USD',
    budgets: usaBudgets,
  },
  {
    id: 'mexico-cdmx',
    name: 'Mexico - CDMX',
    city: 'Mexico City',
    country: 'Mexico',
    currency: 'MXN',
    budgets: mexicoBudgets,
  },
  {
    id: 'spain-barcelona',
    name: 'Spain - Barcelona',
    city: 'Barcelona',
    country: 'Spain',
    currency: 'EUR',
    budgets: spainBudgets,
  },
];

export const getTemplateById = (id: string): Template | undefined => {
  return TEMPLATES.find(t => t.id === id);
};

export const getTemplatesByCountry = (country: string): Template[] => {
  return TEMPLATES.filter(t => t.country === country);
};
