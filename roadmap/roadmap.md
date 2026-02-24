# Travel Budget Auto-Planner — Product Roadmap

> **Última actualización:** Febrero 2026 | **Dev team:** 1 developer | **Sprint length:** 2 semanas

---

## Table of Contents
1. [Status Summary](#status-summary)
2. [Milestones](#milestones)
3. [Sprint 0 — MVP v1.0 ✅ Done](#sprint-0--mvp-v10--done)
4. [Sprint 1 — Mobile Testing + Data Expansion](#sprint-1--mobile-testing--data-expansion-weeks-1-2)
5. [Sprint 2 — UX Polish](#sprint-2--ux-polish-weeks-3-4)
6. [Sprint 3 — Real Monetization](#sprint-3--real-monetization-weeks-5-6)
7. [Sprint 4 — Testing & QA](#sprint-4--testing--qa-weeks-7-8)
8. [Sprint 5 — Launch Prep](#sprint-5--launch-prep-weeks-9-10)
9. [Sprint 6 — Launch Day](#sprint-6--launch-day-week-11)
10. [Sprint 7-8 — Post-Launch](#sprint-7-8--post-launch-weeks-12-16)
11. [Sprint 9+ — Future](#sprint-9--future-enhancements)
12. [Feature Count by Category](#feature-count-by-category)

---

## Status Summary

| Métrica            | Valor                     |
|--------------------|---------------------------|
| Features completadas | **41 / 72** (57%)        |
| Tests pasando      | **67 / 67** (100%)       |
| Build status       | ✅ Clean (0 errores)      |
| Plataformas        | Web ✅ · iOS 🚧 · Android 📋 |
| Versión actual     | **MVP v1.0 + Phase 2**   |
| Próximo milestone  | MVP v1.1 — Sprint 1 complete |

---

## Milestones

| ID | Milestone              | Sprint    | Status          | Descripción                                      |
|----|------------------------|-----------|-----------------|--------------------------------------------------|
| M1 | MVP v1.0               | Sprint 0  | ✅ Done         | Budget calculator + Migration Mode + FX + Docs  |
| M2 | MVP v1.1               | Sprint 1  | 🚧 In Progress  | iPhone testing OK + 20+ países + Am I Ready     |
| M3 | v2.0 Beta              | Sprint 4  | 📋 Planned      | Feature complete + QA + 100 beta testers         |
| M4 | v2.0 Public Launch     | Sprint 6  | 📋 Planned      | App Store + Play Store + Product Hunt            |
| M5 | 1,000 Users            | Sprint 7  | 📋 Planned      | 1 mes post-launch                                |
| M6 | Revenue Positive       | Sprint 9  | 📋 Planned      | 3 meses post-launch                              |

---

## Sprint 0 — MVP v1.0 ✅ Done

> **Scope:** Budget engine completo + Migration Mode + FX + Deep links + Document Vault + 67 tests

### Budget Engine
| ID       | Feature                      | Esfuerzo   | Status   |
|----------|------------------------------|------------|----------|
| CORE-001 | Budget Calculator            | 🟡 Medium  | ✅ Done  |
| CORE-002 | 7 Budget Categories          | 🟢 Small   | ✅ Done  |
| CORE-003 | Destination Templates 5      | 🟡 Medium  | ✅ Done  |
| CORE-004 | 3 Travel Styles              | 🟢 Small   | ✅ Done  |
| CORE-005 | Multi-Currency 15            | 🟡 Medium  | ✅ Done  |
| CORE-006 | Trip CRUD                    | 🟡 Medium  | ✅ Done  |
| CORE-007 | AsyncStorage Persistence     | 🟢 Small   | ✅ Done  |
| CORE-008 | Duplicate Trip               | 🟢 Small   | ✅ Done  |
| CORE-009 | Accommodation Per-Night+Total| 🟢 Small   | ✅ Done  |
| CORE-010 | Flights in Budget            | 🟡 Medium  | ✅ Done  |

### Accuracy + FX + Deep Links
| ID      | Feature                      | Esfuerzo   | Status   |
|---------|------------------------------|------------|----------|
| ACC-001 | PriceProvenance System       | 🟡 Medium  | ✅ Done  |
| ACC-002 | FX Service 24h Cache         | 🟡 Medium  | ✅ Done  |
| ACC-003 | DeepLinkBuilder Service      | 🟡 Medium  | ✅ Done  |
| ACC-004 | DeepLinkPreScreen Modal      | 🟢 Small   | ✅ Done  |
| ACC-005 | Copy Budget Summary          | 🟢 Small   | ✅ Done  |
| ACC-006 | Currency Toggle FX Pills     | 🟢 Small   | ✅ Done  |

### UI / UX
| ID     | Feature                      | Esfuerzo   | Status   |
|--------|------------------------------|------------|----------|
| UI-001 | Mobile Frame Web Preview     | 🟡 Medium  | ✅ Done  |
| UI-002 | 3-Tab Navigation             | 🟢 Small   | ✅ Done  |
| UI-003 | Reusable Component Library   | 🟡 Medium  | ✅ Done  |
| UI-004 | SearchableSelect Country→City| 🟡 Medium  | ✅ Done  |
| UI-005 | DateRangePicker Calendar     | 🟡 Medium  | ✅ Done  |
| UI-006 | CurrencySelect 65+ Currencies| 🟡 Medium  | ✅ Done  |

### Monetization (Mock)
| ID      | Feature                      | Esfuerzo   | Status   |
|---------|------------------------------|------------|----------|
| MON-001 | Subscription System Mock     | 🟡 Medium  | ✅ Done  |
| MON-002 | Free Tier 1 Trip Limit       | 🟢 Small   | ✅ Done  |
| MON-003 | Paywall UI                   | 🟡 Medium  | ✅ Done  |

### Migration Mode + Documents
| ID      | Feature                       | Esfuerzo   | Status   |
|---------|-------------------------------|------------|----------|
| MIG-001 | Document Types TypeScript     | 🟢 Small   | ✅ Done  |
| MIG-002 | Requirements Database 7 Countries | 🟡 Medium | ✅ Done |
| MIG-003 | EntryStatus Enum + PassportType | 🟢 Small  | ✅ Done  |
| MIG-004 | Document Vault Component      | 🟡 Medium  | ✅ Done  |
| MIG-005 | Camera Picker iOS             | 🟡 Medium  | ✅ Done  |
| MIG-006 | Photo Library Picker          | 🟢 Small   | ✅ Done  |
| MIG-007 | PDF File Picker               | 🟡 Medium  | ✅ Done  |
| MIG-008 | Local File Storage Service    | 🟡 Medium  | ✅ Done  |
| MIG-009 | Health Requirements           | 🟡 Medium  | ✅ Done  |
| MIG-010 | Migration Mode Airport Screen | 🟡 Medium  | ✅ Done  |
| MIG-011 | Timeline Component            | 🟡 Medium  | ✅ Done  |
| MIG-012 | Documents Screen Navigation   | 🟢 Small   | ✅ Done  |

### Tests
| ID       | Feature                      | Esfuerzo   | Status   |
|----------|------------------------------|------------|----------|
| TEST-001 | Unit Tests 67 Passing        | 🟡 Medium  | ✅ Done  |

---

## Sprint 1 — Mobile Testing + Data Expansion (Weeks 1-2)

> **Objetivo:** Validar la app en iPhone físico + expandir base de datos de países + readiness widget

### Cómo testear en iPhone con Expo Go (GRATIS)

```bash
# Paso 1: Instalar Expo Go en el iPhone desde App Store (GRATIS)
# Paso 2: Ambos dispositivos en el mismo WiFi
# Paso 3: Iniciar servidor de desarrollo

cd travel-budget-planner
npx expo start

# Paso 4: Escanear el QR con la cámara del iPhone
# → Toca el banner "Open in Expo Go"
# → La app carga en tu iPhone en ~15 segundos

# Si el QR no conecta (firewall WiFi):
npx expo start --tunnel
# Instala @expo/ngrok automáticamente y usa túnel HTTPS
```

**Checklist pre-testing:**
- [ ] Expo Go instalado en iPhone (App Store, gratis)
- [ ] iPhone y PC en el mismo WiFi
- [ ] `npm install` completado sin errores
- [ ] Sin procesos usando el puerto 8081 (`npx kill-port 8081` si hay conflicto)

### Features Sprint 1

| ID       | Feature                        | Esfuerzo   | Dependencias | Status       |
|----------|--------------------------------|------------|--------------|--------------|
| TEST-002 | iPhone Physical Testing        | 🟢 Small   | —            | 🚧 In Progress |
| TEST-003 | Android Device/Emulator        | 🟡 Medium  | TEST-002     | 📋 Planned   |
| MIG-013  | Requirements Database 20+      | 🟡 Medium  | MIG-002      | 📋 Planned   |
| MIG-014  | Am I Ready Widget              | 🟡 Medium  | MIG-004      | 📋 Planned   |
| MIG-015  | Readiness Calculator Logic     | 🟢 Small   | MIG-013/014  | 📋 Planned   |
| MIG-016  | Document Expiration Tracking   | 🟢 Small   | MIG-004      | 📋 Planned   |
| MIG-017  | Free/Pro Document Limits       | 🟢 Small   | MON-001      | 📋 Planned   |

**Sprint 1 definition of done:**
- ✅ QA Checklist completo en iPhone (45 ítems)
- ✅ 20+ países en requirements database
- ✅ "Am I Ready?" widget funcional
- ✅ Tests siguen pasando (67+)

---

## Sprint 2 — UX Polish (Weeks 3-4)

> **Objetivo:** Onboarding, search/filter, charts y templates expandidos

| ID     | Feature                    | Esfuerzo   | Dependencias | Status     |
|--------|----------------------------|------------|--------------|------------|
| UX-001 | Onboarding 3-Screen Flow   | 🟡 Medium  | —            | 📋 Planned |
| UX-002 | Trip Search + Filter       | 🟢 Small   | CORE-006     | 📋 Planned |
| UX-003 | Budget Edit Post-Creation  | 🟡 Medium  | CORE-001     | 📋 Planned |
| UX-004 | Visual Charts Budget       | 🟡 Medium  | CORE-001     | 📋 Planned |
| UX-005 | Export Budget Image/PDF    | 🟡 Medium  | UX-004       | 📋 Planned |
| UX-006 | Trip Tags Labels           | 🟢 Small   | CORE-006     | 📋 Planned |
| UX-007 | Templates Expansion 15+    | 🟡 Medium  | CORE-003     | 📋 Planned |
| UX-008 | Archive Completed Trips    | 🟢 Small   | CORE-006     | 📋 Planned |

---

## Sprint 3 — Real Monetization (Weeks 5-6)

> **Objetivo:** Integrar RevenueCat y pagos reales en iOS y Android

> ⚠️ **Requiere antes de empezar:**
> - Apple Developer Account ($99/año) — developer.apple.com
> - Google Play Developer Account ($25 único) — play.google.com/console

| ID      | Feature                     | Esfuerzo   | Dependencias     | Status     |
|---------|-----------------------------|------------|------------------|------------|
| MON-004 | RevenueCat Integration      | 🔴 Large   | —                | 📋 Planned |
| MON-005 | In-App Purchase iOS         | 🔴 Large   | MON-004          | 📋 Planned |
| MON-006 | In-App Purchase Android     | 🔴 Large   | MON-004          | 📋 Planned |
| MON-007 | 3-Day Free Trial            | 🟡 Medium  | MON-004          | 📋 Planned |
| MON-008 | Annual Subscription 40% Off | 🟢 Small   | MON-005 MON-006  | 📋 Planned |
| MON-009 | Restore Purchases           | 🟢 Small   | MON-004          | 📋 Planned |

---

## Sprint 4 — Testing & QA (Weeks 7-8)

> **Objetivo:** 70% test coverage, beta program, performance

| ID       | Feature                     | Esfuerzo   | Dependencias | Status     |
|----------|-----------------------------|------------|--------------|------------|
| TEST-004 | E2E Tests Detox             | 🔴 Large   | TEST-001     | 📋 Planned |
| TEST-005 | 70% Unit Test Coverage      | 🟡 Medium  | TEST-001     | 📋 Planned |
| TEST-006 | Beta Testing Program 100    | 🟡 Medium  | TEST-003     | 📋 Planned |
| TEST-007 | Performance Optimization    | 🟡 Medium  | —            | 📋 Planned |
| TEST-008 | Crash Reporting Sentry      | 🟢 Small   | —            | 📋 Planned |

---

## Sprint 5 — Launch Prep (Weeks 9-10)

> **Objetivo:** Todos los assets y requisitos legales para stores

| ID       | Feature                     | Esfuerzo   | Dependencias | Status     |
|----------|-----------------------------|------------|--------------|------------|
| MARK-001 | App Store Screenshots       | 🟡 Medium  | —            | 📋 Planned |
| MARK-002 | ASO Keywords + Description  | 🟡 Medium  | —            | 📋 Planned |
| MARK-003 | Privacy Policy Page         | 🟢 Small   | —            | 📋 Planned |
| MARK-004 | Terms of Service            | 🟢 Small   | —            | 📋 Planned |
| MARK-005 | Landing Page Web            | 🟡 Medium  | —            | 📋 Planned |
| MARK-006 | Press Kit                   | 🟢 Small   | —            | 📋 Planned |

---

## Sprint 6 — Launch Day (Week 11)

> **Objetivo:** 🚀 Publicar en App Store + Google Play + Product Hunt

| ID       | Feature                     | Esfuerzo   | Dependencias                              | Status     |
|----------|-----------------------------|------------|-------------------------------------------|------------|
| MARK-007 | App Store iOS Submission    | 🟡 Medium  | MARK-001/002/003/004 MON-005              | 📋 Planned |
| MARK-008 | Google Play Submission      | 🟡 Medium  | MARK-001/002/003/004 MON-006              | 📋 Planned |
| MARK-009 | Product Hunt Launch         | 🟡 Medium  | MARK-007                                  | 📋 Planned |
| MARK-010 | Reddit Marketing            | 🟢 Small   | —                                         | 📋 Planned |
| MARK-011 | Social Media Content        | 🟡 Medium  | —                                         | 📋 Planned |

---

## Sprint 7-8 — Post-Launch (Weeks 12-16)

> **Objetivo:** Feedback loop, analytics, referrals — iterar según usuarios

| ID       | Feature                     | Esfuerzo   | Dependencias | Status     |
|----------|-----------------------------|------------|--------------|------------|
| POST-001 | In-App Feedback System      | 🟢 Small   | —            | 📋 Planned |
| POST-002 | NPS Survey In-App           | 🟢 Small   | POST-001     | 📋 Planned |
| POST-003 | Analytics Integration       | 🟢 Small   | —            | 📋 Planned |
| POST-004 | Referral Program            | 🟡 Medium  | POST-003     | 📋 Planned |
| POST-005 | Customer Support System     | 🟢 Small   | —            | 📋 Planned |

---

## Sprint 9+ — Future Enhancements

> **Nota:** Priorizar según feedback de usuarios post-launch

| ID      | Feature                         | Esfuerzo   | Priority    |
|---------|---------------------------------|------------|-------------|
| FUT-001 | Sherpa API Real Visa Data       | 🔴 Large   | P3 Future   |
| FUT-002 | AI Budget Suggestions (Claude)  | 🔴 Large   | P3 Future   |
| FUT-003 | Group Trip Planning             | 🔴 Large   | P3 Future   |
| FUT-004 | Receipt Scanning OCR            | 🔴 Large   | P3 Future   |
| FUT-005 | Supabase Cloud Sync             | 🔴 Large   | P3 Future   |
| FUT-006 | User Authentication             | 🔴 Large   | P3 Future   |
| FUT-007 | Community Templates Marketplace | 🔴 Large   | P3 Future   |
| FUT-008 | Weather API Integration         | 🟡 Medium  | P3 Future   |
| FUT-009 | Multi-Trip Comparison           | 🟡 Medium  | P3 Future   |
| FUT-010 | Expense Splitting               | 🔴 Large   | P3 Future   |
| FUT-011 | Travel Insurance Marketplace    | 🔴 Large   | P3 Future   |
| FUT-012 | Budget vs Actual Tracking       | 🔴 Large   | P2 Nice     |

---

## Feature Count by Category

| Categoría    | Total | Done | In Progress | Planned | Future |
|--------------|-------|------|-------------|---------|--------|
| Budget/Core  | 16    | 16   | 0           | 0       | 0      |
| Migration    | 17    | 12   | 0           | 5       | 0      |
| UI/UX        | 10    | 6    | 0           | 4 (S2)  | 2      |
| Monetization | 9     | 3    | 0           | 6 (S3)  | 0      |
| Technical    | 10    | 1    | 1           | 5 (S4)  | 3      |
| Marketing    | 11    | 0    | 0           | 11      | 0      |
| Post-Launch  | 5     | 0    | 0           | 5       | 0      |
| Future       | 12    | 0    | 0           | 0       | 12     |
| **TOTAL**    | **72**| **38**| **1**      | **36**  | **17** |

---

*Roadmap generado con Claude Code — actualizar en cada sprint review*
