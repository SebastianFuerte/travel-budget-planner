# Travel Budget Auto-Planner

## Overview
App movil (React Native + Expo) para planificar presupuestos de viaje. Funciona en Web (PC preview), Android e iOS.

## Stack
- **Framework**: React Native + Expo SDK 54 + TypeScript
- **Routing**: Expo Router (file-based) v6
- **State**: Zustand v4.5
- **Storage**: AsyncStorage (100% local, sin backend)
- **React**: 19.1.0 (SDK 54 + react-native 0.81.5 requieren React 19 — NO bajar a 18)

## Como ejecutar
```bash
npm install          # Solo la primera vez
npm run web          # Preview en PC (http://localhost:8081)
npm run android      # Android emulator
npm test             # Tests unitarios
```

## Estructura de archivos
```
app/                          # Pantallas (Expo Router file-based)
  (tabs)/                     # Tab navigation principal
    index.tsx                 # Home - Lista de viajes
    create.tsx                # Crear viaje
    profile.tsx               # Perfil y settings
  trip/[id].tsx               # Detalle de viaje
  documents/[id].tsx          # Documents & Entry Requirements hub
  migration/[id].tsx          # Migration Mode (aeropuerto)
  paywall.tsx                 # Suscripcion Pro (mock)
  _layout.tsx                 # Root navigator

src/
  components/
    layout/
      ScreenContainer.tsx     # Wrapper: simula telefono en web, fullscreen en mobile
      DemoModeButton.tsx      # Carga viaje demo (Japan) con docs de ejemplo
    trip/
      BudgetCalculator.tsx    # Calculo y display del presupuesto
      TripCard.tsx            # Card de viaje en la lista
    documents/
      EntryRequirementsCard.tsx  # Tarjeta de requisitos de visa (semaforo)
      DocumentItem.tsx        # Item individual de documento
      DocumentVault.tsx       # Lista de documentos por viaje
      TripTimeline.tsx        # Timeline visual del viaje
    ui/
      Button.tsx              # Boton (primary/secondary/outline/danger)
      Card.tsx                # Card container
      Input.tsx               # Text input
      Select.tsx              # Dropdown con modal

  store/                      # Zustand stores
    tripStore.ts              # CRUD de viajes
    subscriptionStore.ts      # Suscripcion (free/pro mock)
    documentStore.ts          # Documentos, visa, timeline por viaje

  services/
    budgetEngine.ts           # Motor de calculo de presupuesto
    storage.ts                # AsyncStorage persistence (viajes, suscripcion)
    documentStorage.ts        # AsyncStorage para documentos y timeline
    visaRequirements.ts       # Dataset de requisitos de visa (hardcoded, extensible)
    templates.ts              # 5 plantillas de ciudades (Japan, USA, Mexico, Spain)
    analytics.ts              # Eventos mock (console.log)

  types/
    index.ts                  # Trip, Budget, Subscription, Template
    documents.ts              # TripDocument, EntryRequirement, TimelineEvent

  theme/colors.ts             # Paleta de colores (primary: #4F46E5 Indigo)
  utils/
    constants.ts              # Limites, precios, labels
    currency.ts               # Formateo de monedas
    validation.ts             # Validacion de inputs
```

## Modulos existentes

### 1. Budget Engine (original)
- Crear viajes con destino, fechas, personas, estilo (Budget/Mid/Comfy)
- Presupuesto por categorias: alojamiento, transporte, comida, actividades, seguro, internet, extras
- Plantillas para Tokyo, Osaka, NYC, CDMX, Barcelona
- Export share card (mock)
- Pro mode: free = 1 viaje, pro = ilimitados (mock, sin pagos reales)

### 2. Travel Documents & Entry Requirements
- **Entry Requirements**: Dataset de requisitos de visa segun nacionalidad + destino
  - Pasaportes: Colombia, USA, Mexico, Spain
  - Destinos: Japan, USA, Spain, Mexico
  - Semaforo visual: verde (no visa), amarillo (eVisa/ESTA), rojo (visa requerida)
- **Document Vault**: Carpeta de documentos por viaje (pasaporte, visa, vuelos, hospedaje, seguro)
  - Solo almacenamiento local, nunca se sube a la nube
- **Timeline**: Eventos del viaje (vuelos, check-in, check-out, deadlines de visa)
- **Migration Mode**: Pantalla unica para aeropuerto con todos los docs clave

## Patrones importantes
- `ScreenContainer` envuelve TODAS las pantallas (simula telefono en web, fullscreen en mobile)
- Demo Mode: boton "Open Demo Trip" crea un viaje Japan con documentos de ejemplo
- Datos 100% locales (AsyncStorage), sin backend
- Disclaimers de visa: "Informacion orientativa - verificar con fuentes oficiales"

## Dependencias criticas
- `react-test-renderer` DEBE ser `19.1.0` (match con React 19)
- `react-native-reanimated` requerido por babel.config.js
- `babel-plugin-module-resolver` requerido por alias `@` en babel
- Assets PNG deben existir en `assets/` (favicon, icon, splash, adaptive-icon)

## Reglas de desarrollo
- Todo debe funcionar primero en WEB (PC preview) antes de mobile
- No subir documentos a servidores externos
- No pagos reales (solo mocks para Pro mode)
- TypeScript estricto
- Componentes en `src/components/`, logica en `src/services/`
