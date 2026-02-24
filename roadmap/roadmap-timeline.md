# Travel Budget Auto-Planner — Timeline Visual

> **Escala:** Cada sprint = 2 semanas | **Dev:** 1 persona | **Inicio:** Marzo 2026

---

## Vista Gantt General

```
                    FEB   MAR   MAR   ABR   ABR   MAY   MAY   JUN   JUN   JUL   JUL   AGO
                    W1-2  W3-4  W5-6  W7-8  W9-10 W11-12 W13-14 W15  W16-17 W18-19 W20-21 W22+
SPRINT              S0    S1    S2    S3    S4    S5     S6     S6   S7    S8     S9+
─────────────────────────────────────────────────────────────────────────────────────────────────
Budget Engine       ████  ·     ·     ·     ·     ·      ·      ·    ·     ·      ·
FX + DeepLinks      ████  ·     ·     ·     ·     ·      ·      ·    ·     ·      ·
Migration Mode      ████  ██    ·     ·     ·     ·      ·      ·    ·     ·      ·
Document Vault      ████  ·     ·     ·     ·     ·      ·      ·    ·     ·      ·
Unit Tests 67       ████  ·     ·     ·     ·     ·      ·      ·    ·     ·      ·
─────────────────────────────────────────────────────────────────────────────────────────────────
📱 iPhone Testing   ·     ██    ·     ·     ·     ·      ·      ·    ·     ·      ·
20+ Countries DB    ·     ██    ·     ·     ·     ·      ·      ·    ·     ·      ·
Am I Ready Widget   ·     ██    ·     ·     ·     ·      ·      ·    ·     ·      ·
─────────────────────────────────────────────────────────────────────────────────────────────────
Onboarding          ·     ·     ██    ·     ·     ·      ·      ·    ·     ·      ·
UX Polish           ·     ·     ████  ·     ·     ·      ·      ·    ·     ·      ·
Templates 15+       ·     ·     ██    ·     ·     ·      ·      ·    ·     ·      ·
─────────────────────────────────────────────────────────────────────────────────────────────────
RevenueCat          ·     ·     ·     ████  ·     ·      ·      ·    ·     ·      ·
iOS Payments        ·     ·     ·     ████  ·     ·      ·      ·    ·     ·      ·
Android Payments    ·     ·     ·     ████  ·     ·      ·      ·    ·     ·      ·
─────────────────────────────────────────────────────────────────────────────────────────────────
E2E Tests           ·     ·     ·     ·     ████  ·      ·      ·    ·     ·      ·
Beta 100 Users      ·     ·     ·     ·     ████  ·      ·      ·    ·     ·      ·
Performance         ·     ·     ·     ·     ██    ·      ·      ·    ·     ·      ·
─────────────────────────────────────────────────────────────────────────────────────────────────
App Store Assets    ·     ·     ·     ·     ·     ████   ·      ·    ·     ·      ·
Privacy/TOS         ·     ·     ·     ·     ·     ██     ·      ·    ·     ·      ·
Landing Page        ·     ·     ·     ·     ·     ████   ·      ·    ·     ·      ·
─────────────────────────────────────────────────────────────────────────────────────────────────
🚀 App Store Submit ·     ·     ·     ·     ·     ·      ████   ·    ·     ·      ·
🚀 Product Hunt     ·     ·     ·     ·     ·     ·      ·      ██   ·     ·      ·
Reddit/Social       ·     ·     ·     ·     ·     ·      ·      ██   ·     ·      ·
─────────────────────────────────────────────────────────────────────────────────────────────────
Analytics/NPS       ·     ·     ·     ·     ·     ·      ·      ·    ████  ·      ·
Referral Program    ·     ·     ·     ·     ·     ·      ·      ·    ·     ████   ·
─────────────────────────────────────────────────────────────────────────────────────────────────
AI / Cloud / Groups ·     ·     ·     ·     ·     ·      ·      ·    ·     ·      ██████
─────────────────────────────────────────────────────────────────────────────────────────────────

Leyenda: ████ = En este sprint  ·· = Vacío
```

---

## Sprint 0 — MVP v1.0 ✅ COMPLETADO

```
Estado:     ████████████████████ 100% Done
Duración:   ~6 semanas de desarrollo acumulado
Tests:      67/67 passing
Build:      ✅ Clean
Plataforma: Web (PC preview)
```

### Qué se construyó
```
Budget Engine
  ├── CORE-001  Budget Calculator (min/avg/max por categoría)
  ├── CORE-002  7 categorías de gasto
  ├── CORE-003  5 destination templates
  ├── CORE-004  3 travel styles (Budget/Mid/Comfy)
  ├── CORE-005  15 currencies
  ├── CORE-006  Trip CRUD
  ├── CORE-007  AsyncStorage persistence
  ├── CORE-008  Duplicate trip
  ├── CORE-009  Accommodation per-night + total
  └── CORE-010  Flights in budget + origin city

Accuracy System
  ├── ACC-001  PriceProvenance (HEURISTIC/USER_CONFIRMED/LIVE_API)
  ├── ACC-002  FX Service con cache 24h + offline fallback
  ├── ACC-003  DeepLinkBuilder (6 providers: Booking, Airbnb, Skyscanner...)
  ├── ACC-004  DeepLinkPreScreen modal
  ├── ACC-005  Copy budget to clipboard
  └── ACC-006  Currency toggle pills (Trip ↔ User currency)

Migration Mode
  ├── MIG-001  Document TypeScript interfaces
  ├── MIG-002  Visa requirements database (7 country pairs)
  ├── MIG-003  EntryStatus enum + PassportType selector
  ├── MIG-004  Document Vault (camera/photo/PDF/metadata)
  ├── MIG-005  Camera picker (expo-image-picker)
  ├── MIG-006  Photo library picker
  ├── MIG-007  PDF file picker (expo-document-picker)
  ├── MIG-008  Local file storage (expo-file-system)
  ├── MIG-009  Health/vaccine requirements + badges
  ├── MIG-010  Migration Mode airport screen
  ├── MIG-011  Timeline component (90/60/30/7 días)
  └── MIG-012  Documents screen navigation

UI/UX
  ├── UI-001  Mobile frame web preview (ScreenContainer)
  ├── UI-002  3-tab navigation
  ├── UI-003  Reusable components (Button, Card, Input, Select)
  ├── UI-004  SearchableSelect Country→City
  ├── UI-005  DateRangePicker calendar
  └── UI-006  CurrencySelect 65+ currencies con smart ordering

Monetization (mock)
  ├── MON-001  Subscription system mock (Free/Pro)
  ├── MON-002  Free tier 1-trip limit
  └── MON-003  Paywall UI

Tests
  └── TEST-001  67 unit tests (budgetEngine, entryRequirements, fxService, deepLinkBuilder)
```

---

## Sprint 1 — Mobile Testing + Data Expansion (Semanas 1-2)

```
Estado:     ░░░░░░░░░░░░░░░░░░░░ 0% → En progreso
Milestone:  🎯 M2 — MVP v1.1
Focus:      Validar en iPhone físico + expandir datos + readiness widget
```

### Semana 1: iPhone Testing

```
DÍA 1-2: Setup y first run en iPhone
──────────────────────────────────
  [TEST-002] Instalar Expo Go en iPhone
  [TEST-002] npx expo start → escanear QR
  [TEST-002] Verificar que la app carga correctamente
  [TEST-002] Ejecutar QA Checklist (45 ítems)

Comandos:
  cd travel-budget-planner
  npx expo start
  # Si hay problemas de red:
  npx expo start --tunnel

DÍA 3-4: Android testing
──────────────────────────────────
  [TEST-003] Instalar Android Studio con AVD
  [TEST-003] Crear emulador Pixel 6 API 33
  [TEST-003] npx expo start → presionar 'a' para Android
  [TEST-003] Ejecutar mismo QA Checklist en Android

DÍA 5: Bugs del testing
──────────────────────────────────
  Documentar y fixear bugs encontrados
  Re-run tests: npx jest
  Commit fixes con mensajes descriptivos
```

### Semana 2: Data Expansion + Widget

```
DÍA 6-7: Expandir requirements database
──────────────────────────────────
  [MIG-013] Agregar países:
    Tier 1 (más buscados):
    - 🇬🇧 United Kingdom
    - 🇨🇦 Canada
    - 🇦🇺 Australia
    - 🇹🇭 Thailand
    - 🇩🇪 Germany

    Tier 2:
    - 🇫🇷 France
    - 🇮🇹 Italy
    - 🇻🇳 Vietnam
    - 🇵🇪 Peru
    - 🇦🇷 Argentina
    - 🇦🇪 UAE (Dubai)
    - 🇰🇷 South Korea
    - 🇳🇿 New Zealand

DÍA 8-9: Am I Ready Widget
──────────────────────────────────
  [MIG-014] Diseñar e implementar widget
    - Circular progress indicator (%)
    - Lista de items faltantes
    - Color coding (green/yellow/red)

  [MIG-015] Readiness calculator logic
    - required docs por destino
    - completed docs por trip
    - % = completed/required * 100

DÍA 10: Features menores + tests
──────────────────────────────────
  [MIG-016] Document expiration dates + warning badges
  [MIG-017] Free/Pro document limits enforcement
  npx jest → verificar 80+ tests pasando
```

### Sprint 1 — Definition of Done
```
✅ QA Checklist 100% completo en iPhone físico
✅ QA Checklist 100% completo en Android
✅ 20+ países en requirements database
✅ Am I Ready widget funcional y testeado
✅ Document expiration tracking visible
✅ Free/Pro document limits activos
✅ 0 regresiones en tests existentes
```

---

## Sprint 2 — UX Polish (Semanas 3-4)

```
Estado:     ░░░░░░░░░░░░░░░░░░░░ 0% → Planificado
Focus:      Onboarding + search + charts + 15 templates
```

```
SEMANA 3: Onboarding + Search
──────────────────────────────────
DÍA 1-3:
  [UX-001] Onboarding flow
    - Screen 1: Hero + tagline
    - Screen 2: Feature highlights (Budget + Migration)
    - Screen 3: Demo mode CTA
    - AsyncStorage flag: 'onboarding_completed'

DÍA 4-5:
  [UX-002] Trip search + filter
    - Search input en home
    - Filter by: status, date range, destination

  [UX-003] Budget edit post-creation
    - Editar montos por categoría
    - Recalcular totales automáticamente

SEMANA 4: Charts + Templates
──────────────────────────────────
DÍA 6-8:
  [UX-004] Visual charts
    - Instalar: npx expo install react-native-svg
    - Pie chart: % por categoría
    - Bar chart: Budget vs Actuals (si hay datos)

  [UX-005] Export budget
    - Captura de pantalla con react-native-view-shot
    - Share via iOS share sheet

DÍA 9-10:
  [UX-007] Templates 15+ destinos
    - Agregar: Thailand, Bali, UK, Canada, Australia,
      Peru, South Africa, Turkey, UAE, New Zealand

  [UX-006] Trip tags
  [UX-008] Archive completed trips
```

---

## Sprint 3 — Real Monetization (Semanas 5-6)

```
Estado:     ░░░░░░░░░░░░░░░░░░░░ 0% → Planificado
⚠️  BLOCKER: Necesitas antes de empezar:
    • Apple Developer Account → developer.apple.com ($99/año)
    • Google Play Developer Account → play.google.com/console ($25 único)
    • Cuenta en RevenueCat → revenuecat.com (gratis hasta $2.5K MRR)
```

```
SEMANA 5: RevenueCat Setup
──────────────────────────────────
DÍA 1-2: Setup cuentas
  - Crear products en App Store Connect:
    com.yourbrand.travelbudget.monthly ($4.99/mes)
    com.yourbrand.travelbudget.annual ($29.99/año)
  - Crear products en Google Play Console
  - Configurar RevenueCat dashboard

DÍA 3-5: [MON-004] Integración SDK
  npx expo install react-native-purchases
  - Configurar en app/_layout.tsx
  - Implementar useRevenueCat hook
  - Conectar con settingsStore (isPro)

SEMANA 6: Payments + Trial
──────────────────────────────────
DÍA 6-7:
  [MON-005] iOS in-app purchase
    - Sandbox testing en TestFlight
  [MON-006] Android in-app purchase
    - Internal testing track en Play Console

DÍA 8-9:
  [MON-007] 3-day free trial
  [MON-008] Annual plan 40% off en paywall
  [MON-009] Restore purchases button

DÍA 10: QA de payments
  - Test completo del funnel Free→Trial→Paid
  - Test de restore purchases
  - Test de cancelación y downgrade
```

---

## Sprint 4 — Testing & QA (Semanas 7-8)

```
Estado:     ░░░░░░░░░░░░░░░░░░░░ 0% → Planificado
Focus:      E2E tests + 70% coverage + 100 beta testers
```

```
SEMANA 7: Test coverage
──────────────────────────────────
  [TEST-005] Unit tests hasta 70%+
    - Agregar tests para componentes React Native
    - Tests para CurrencySelect, DocumentVault, BudgetCalculator

  [TEST-004] E2E con Detox
    npx detox init
    - Flows críticos:
      • Crear trip Colombia→Japan
      • Agregar documento de identidad
      • Confirmar precio de hotel
      • Upgrade a Pro

  [TEST-008] Sentry
    npx expo install @sentry/react-native
    - Configurar DSN
    - Test de crash manual

SEMANA 8: Beta program + Performance
──────────────────────────────────
  [TEST-006] Reclutar 100 beta testers
    - Publicar en: r/travel, r/solotravel
    - Comunidades de viajeros en WhatsApp/Telegram
    - TestFlight invite link para iOS
    - Google Play Beta link para Android

  [TEST-007] Performance
    - Analizar con Metro bundle analyzer
    - Optimizar imports (tree shaking)
    - Lazy loading de pantallas secundarias
    - Target: TTI <3s en iPhone X o superior
```

---

## Sprint 5 — Launch Prep (Semanas 9-10)

```
Estado:     ░░░░░░░░░░░░░░░░░░░░ 0% → Planificado
Focus:      Todos los assets y legales para stores
```

```
SEMANA 9: Assets visuales
──────────────────────────────────
  [MARK-001] Screenshots para stores
    Tamaños requeridos iOS:
    - 6.7" (iPhone 15 Pro Max): 1290×2796px
    - 6.5" (iPhone 14 Plus): 1242×2688px
    - 5.5" (iPhone 8 Plus): 1242×2208px

    Herramientas: Figma (gratis) + screenshots reales del app

    Screens a capturar:
    1. Home con trips cards
    2. Budget Calculator con badges Confirmed
    3. Document Vault con docs
    4. Migration Mode airport view
    5. CurrencySelect con múltiples divisas

  [MARK-002] ASO Keywords
    Primary: "travel budget planner", "trip cost calculator"
    Secondary: "visa requirements", "travel documents", "trip budget"

    Description: 4000 chars en inglés y español

SEMANA 10: Legales + Landing
──────────────────────────────────
  [MARK-003] Privacy Policy
    Usar: app.termly.io (genera GDPR + CCPA gratis)
    Host en: GitHub Pages o Vercel
    URL requerida para App Store Review

  [MARK-004] Terms of Service
    Misma plataforma que Privacy Policy

  [MARK-005] Landing Page
    Stack rápido: Vercel + Next.js o simple HTML
    Secciones: Hero, Features, Screenshots, Pricing, Download

  [MARK-006] Press Kit
    Carpeta en Google Drive con:
    - Logo PNG (blanco/negro/color, 1024×1024)
    - Screenshots HD
    - App description (100 words en inglés)
    - Founder bio
```

---

## Sprint 6 — Launch Day (Semana 11)

```
Estado:     ░░░░░░░░░░░░░░░░░░░░ 0% → Planificado
🚀 MILESTONE M4: v2.0 Public Launch
```

```
SEMANA 11, DÍA 1-3: Store submissions
──────────────────────────────────
  [MARK-007] App Store iOS
    - Build con EAS: eas build --platform ios
    - Submit: eas submit --platform ios
    - O: eas build -e production + upload manual
    - Tiempo de review: 1-3 días hábiles

  [MARK-008] Google Play
    - Build: eas build --platform android
    - Upload .aab a Play Console
    - Tiempo de review: <24h usualmente

SEMANA 11, DÍA 4 (LAUNCH DAY):
──────────────────────────────────
  🕐 6:00am PST:
    [MARK-009] Product Hunt post publicado
      - Hacer hunter a alguien con audiencia
      - Descripción + GIFs del app
      - First comment con contexto de founder

  🕐 9:00am PST:
    [MARK-010] Reddit posts
      - r/solotravel: "Built a travel budget app..."
      - r/travel: "How I plan my trip budgets..."
      - r/digitalnomad: Post específico para nómadas
      - r/financialindependence: Budget angle

  🕐 12:00pm PST:
    [MARK-011] TikTok + Instagram
      - Video demo del app (30-60 segundos)
      - Mostrar feature de visa requirements
      - Hashtags: #travelapp #traveltips #budgettravel

  📅 Durante la semana:
    - Responder todos los comentarios en Product Hunt
    - Responder DMs de usuarios
    - Documentar bugs críticos para hotfix
```

---

## Sprint 7-8 — Post-Launch (Semanas 12-16)

```
Estado:     ░░░░░░░░░░░░░░░░░░░░ 0% → Post-launch
🎯 TARGETS: 1K users (M5) · Revenue positive (M6)
```

```
MÉTRICAS A TRACKEAR DESDE DÍA 1:
──────────────────────────────────
  • DAU/MAU ratio (target: >20%)
  • Free→Pro conversion rate (target: >5%)
  • D1/D7/D30 retention
  • Crash-free sessions (target: >99%)
  • App Store rating (target: >4.5★)

SEMANAS 12-13: Feedback loop
──────────────────────────────────
  [POST-001] In-app feedback button
  [POST-002] NPS survey (día 7 post-install)
  [POST-003] Analytics (Mixpanel/Amplitude)
    - Funnels: Install → Create Trip → Add Doc → Upgrade

  Priorizar backlog basado en:
  - Top 5 bugs reportados
  - Feature requests más votados
  - Análisis de drop-off en funnels

SEMANAS 14-16: Growth
──────────────────────────────────
  [POST-004] Referral program
    "Invita a un amigo = 1 mes Pro gratis para ambos"

  [POST-005] Customer support (Intercom o similar)

  v2.1 Sprint (según feedback):
  - Hotfixes + quick wins
  - Feature con más demanda de usuarios
```

---

## Sprint 9+ — Future (Post 4 meses)

```
Priorizar según:
  1. Revenue impact
  2. User demand (NPS + feedback)
  3. Technical feasibility
  4. Competitive differentiation

Candidatos (en orden tentativo):
──────────────────────────────────
  FUT-012  Budget vs Actual Tracking      ← Alta demanda probable
  FUT-008  Weather API (Open-Meteo free)  ← Low effort, nice UX
  FUT-004  Receipt Scanning OCR           ← Diferenciador fuerte
  FUT-002  AI Budget Suggestions          ← Claude API
  FUT-005  Supabase Cloud Sync           ← Habilita features sociales
  FUT-006  User Authentication            ← Prerequisito para social
  FUT-003  Group Trip Planning            ← Amplía mercado objetivo
  FUT-001  Sherpa API ($500/mes)          ← Solo si hay revenue
  FUT-007  Community Templates            ← Network effects
  FUT-010  Expense Splitting             ← Competir con Splitwise
  FUT-011  Travel Insurance              ← Revenue alternativo
  FUT-009  Multi-Trip Comparison         ← Power users
```

---

## Dependencias Críticas

```
CADENA CRÍTICA PARA LAUNCH:
──────────────────────────────────
TEST-002 (iPhone OK)
  └→ TEST-006 (Beta 100 users)
       └→ MARK-007 (App Store submission)
            └→ MARK-009 (Product Hunt)

MON-004 (RevenueCat)
  ├→ MON-005 (iOS payments)     → MARK-007
  └→ MON-006 (Android payments) → MARK-008

MARK-003 (Privacy Policy) ──────────────→ MARK-007 + MARK-008
MARK-004 (Terms of Service) ────────────→ MARK-007 + MARK-008

BLOQUEADORES EXTERNOS:
──────────────────────────────────
• Apple Developer Account ($99/año) → bloquea MON-005, MARK-007
• Google Play Developer Account ($25) → bloquea MON-006, MARK-008
• App Store Review (1-3 días) → bloquea MARK-009 launch day
```

---

## Resumen Ejecutivo

| Sprint | Semanas  | Milestone     | Objetivo Principal              | Bloqueadores          |
|--------|----------|---------------|---------------------------------|-----------------------|
| S0     | ✅ Done  | M1 MVP v1.0   | Budget + Migration + FX + Docs  | Ninguno               |
| S1     | 1-2      | M2 MVP v1.1   | iPhone testing + 20+ países     | Expo Go en iPhone     |
| S2     | 3-4      | —             | UX: onboarding + charts + tmpl  | S1 complete           |
| S3     | 5-6      | —             | RevenueCat + pagos reales       | Apple/Google accounts |
| S4     | 7-8      | M3 Beta       | QA 70% coverage + 100 testers   | S3 complete           |
| S5     | 9-10     | —             | Assets + legales para stores    | S4 complete           |
| S6     | 11       | M4 Launch     | App Store + Product Hunt 🚀     | S5 + store accounts   |
| S7-8   | 12-16    | M5 1K users   | Feedback loop + growth          | S6 complete           |
| S9+    | 17+      | M6 Revenue+   | AI + Cloud + Social features    | Revenue > $0          |

---

*Timeline generado con Claude Code — actualizar al inicio de cada sprint*
