# Travel Budget Planner — Contexto de Launch

**Objetivo:** Lanzar la app el martes (2026-05-26)
**Estado:** En progreso — fixes de pre-launch

## Prompt para retomar mañana

```
Retomamos el trabajo de launch de la app travel-budget-planner.
Revisa LAUNCH_CONTEXT.md para el estado actual y continúa con
las tareas pendientes en orden.
```

---

## Estrategia de monetización decidida

1. **Fase 1 (launch):** Todo gratis — quitar límite de 1 viaje
2. **Fase 2 (semana 1-2):** Affiliate links en deepLinkBuilder.ts
   - Booking.com Partner Program (~4% por reserva)
   - Skyscanner Affiliate (CPC)
   - GetYourGuide (8% actividades)
   - Seguro viaje: iati/Heymondo (10-15%)
3. **Fase 3 (mes 1-2):** RevenueCat subscription Pro ($2.99/mes)

---

## Blockers identificados (de auditoría pre-launch)

### CRÍTICOS
- [x] React 19.1.0 instalado — debe ser 18.2.0 (CLAUDE.md lo advierte)
- [ ] Paywall mock → DECISIÓN: lanzar todo gratis por ahora
- [ ] Sin crash reporting (Sentry/Firebase Crashlytics)

### IMPORTANTES  
- [ ] Error Boundary global en _layout.tsx
- [ ] Analytics mock (console.log) → integrar post-launch
- [ ] Affiliate links en deepLinkBuilder.ts

### EXPO PACKAGES desactualizados
```
expo@54.0.33           → ~54.0.34
expo-file-system       → ~19.0.22
expo-image-picker      → ~17.0.11
expo-linking           → ~8.0.12
react-native-worklets  → 0.5.1 (downgrade desde 0.8.1)
```

---

## Tareas completadas ✓

- [x] Análisis completo de launch readiness (101 tests pasan)
- [x] Decisión de monetización: gratis → afiliados → RevenueCat
- [x] Permisos de Claude Code configurados (settings.json)
- [x] React 19.1.0 confirmado correcto para Expo SDK 54 (NO bajar a 18)
- [x] Expo packages actualizados con `npx expo install --fix`
- [x] Error Boundary global agregado en `app/_layout.tsx`
- [x] Límite de 1 viaje eliminado (todos los features gratis para launch)
- [x] Affiliate links preparados en `src/services/deepLinkBuilder.ts` (faltan IDs reales)
- [x] CLAUDE.md actualizado con stack correcto
- [x] 101/101 tests pasan

## Tareas pendientes en orden

1. **Registrarse en programas de afiliados** y poner IDs en `src/services/deepLinkBuilder.ts` línea ~15:
   - Booking.com: https://www.booking.com/affiliate-program/
   - Skyscanner:  https://partners.skyscanner.net/
   - GetYourGuide: https://partner.getyourguide.com/
   - Viator:      https://www.tripadvisor.com/affiliates

2. **EAS Build para TestFlight**:
   ```bash
   npm install -g eas-cli
   eas login
   eas build:configure
   eas build --platform ios --profile preview
   ```

3. **App Store Connect**:
   - Crear app en https://appstoreconnect.apple.com
   - Subir screenshots (mínimo 3, tamaño 6.7" iPhone)
   - URL pública de Privacy Policy (requerida por Apple)
   - Completar metadata: descripción, keywords, categoría (Travel)

4. **Sentry crash reporting** (recomendado antes de launch público):
   ```bash
   npx @sentry/wizard@latest -i reactNative
   ```

---

## Stack técnico
- React Native + Expo SDK 54
- TypeScript estricto
- Zustand (estado)
- AsyncStorage (100% local, sin backend)
- Expo Router (file-based routing)

## Estructura clave
```
app/                    # Pantallas (Expo Router)
  (tabs)/index.tsx      # Home - lista de viajes
  (tabs)/create.tsx     # Crear viaje
  (tabs)/profile.tsx    # Perfil/settings
  trip/[id].tsx         # Detalle viaje
  documents/[id].tsx    # Documentos y visa
  migration/[id].tsx    # Modo aeropuerto
  paywall.tsx           # Mock → quitar o free
  _layout.tsx           # Root navigator (aquí va Error Boundary)

src/store/
  subscriptionStore.ts  # AQUÍ: quitar límite de 1 viaje
  tripStore.ts
  documentStore.ts

src/services/
  deepLinkBuilder.ts    # AQUÍ: agregar affiliate tracking
  budgetEngine.ts
  fxService.ts          # FX con fallback offline
```
