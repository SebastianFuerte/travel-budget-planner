# Travel Budget Auto-Planner - Setup & Deployment Guide

## 🎯 PRIORIDAD: PREVIEW EN PC (WINDOWS)

Esta app está diseñada específicamente para **revisar primero en navegador (PC)**, luego Android Emulator, y finalmente en dispositivo físico.

---

## 📋 PREREQUISITOS (WINDOWS)

### 1. Instalar Node.js
- Descargar desde: https://nodejs.org/
- Versión recomendada: LTS (20.x o superior)
- Verificar instalación:
```bash
node --version
npm --version
```

### 2. Instalar Git
- Descargar desde: https://git-scm.com/download/win
- Usar Git Bash o Command Prompt

### 3. (Opcional) Visual Studio Code
- Descargar desde: https://code.visualstudio.com/
- Extensiones recomendadas:
  - ES7+ React/Redux/React-Native snippets
  - Prettier
  - ESLint

---

## 🚀 INSTALACIÓN Y SETUP

### Paso 1: Navegar al directorio del proyecto
```bash
cd travel-budget-planner
```

### Paso 2: Instalar dependencias
```bash
npm install
```

Esto instalará:
- Expo SDK
- React Native
- React Native Web
- Zustand (state management)
- Date-fns
- AsyncStorage
- Y todas las demás dependencias

### Paso 3: Verificar instalación
```bash
npx expo --version
```

---

## 💻 CORRER LA APP EN PC (WEB) - OPCIÓN PRINCIPAL

### Método 1: Expo Development Server (RECOMENDADO)

```bash
npm run web
```

O directamente:
```bash
npx expo start --web
```

Esto abrirá automáticamente tu navegador en `http://localhost:8081`

### ✅ FEATURES DEL PREVIEW WEB:
- ✓ Contenedor centrado simulando un teléfono (max 480px)
- ✓ Fondo gris alrededor para simular ambiente desktop
- ✓ Todas las features funcionan excepto features nativas (cámara, etc)
- ✓ Botón "Open Demo Trip" visible para testing rápido
- ✓ Hot reload habilitado

### Navegadores recomendados:
- Chrome (mejor soporte)
- Edge
- Firefox

### Troubleshooting Web:
Si el puerto 8081 está ocupado:
```bash
npx expo start --web --port 3000
```

---

## 📱 CORRER EN ANDROID EMULATOR

### Prerequisitos Android:

#### 1. Instalar Android Studio
- Descargar desde: https://developer.android.com/studio
- Durante instalación, asegurar que se instale:
  - Android SDK
  - Android SDK Platform
  - Android Virtual Device (AVD)

#### 2. Configurar variables de entorno
Agregar a las variables de entorno de Windows:

```
ANDROID_HOME = C:\Users\TuUsuario\AppData\Local\Android\Sdk
```

Agregar al PATH:
```
C:\Users\TuUsuario\AppData\Local\Android\Sdk\platform-tools
C:\Users\TuUsuario\AppData\Local\Android\Sdk\tools
C:\Users\TuUsuario\AppData\Local\Android\Sdk\emulator
```

#### 3. Crear un Android Virtual Device (AVD)
En Android Studio:
1. Tools → Device Manager
2. Create Device
3. Seleccionar: Pixel 5 o similar
4. System Image: Android 13 (API 33) o superior
5. Finish

#### 4. Iniciar el emulador
Desde Android Studio:
- Device Manager → Play button en tu AVD

O desde terminal:
```bash
emulator -avd Pixel_5_API_33
```

### Correr la app en Android:

```bash
npm run android
```

O:
```bash
npx expo start --android
```

La primera compilación tomará varios minutos. Builds subsecuentes serán más rápidos.

### ✅ FEATURES EN ANDROID:
- ✓ Todas las features web
- ✓ Navegación nativa
- ✓ AsyncStorage persistence
- ✓ Share funcional (mock)

---

## 📲 CORRER EN DISPOSITIVO FÍSICO

### Opción 1: Expo Go App (MÁS FÁCIL)

1. Instalar Expo Go desde Play Store/App Store
2. Conectar PC y celular a la MISMA red WiFi
3. Correr:
```bash
npx expo start
```
4. Escanear QR code con Expo Go

### Opción 2: Development Build (PRODUCCIÓN)

Para Android:
```bash
npx expo run:android --device
```

Para iOS (requiere Mac):
```bash
npx expo run:ios --device
```

---

## 🧪 TESTING

### Correr tests:
```bash
npm test
```

### Test específico:
```bash
npm test -- budgetEngine.test.ts
```

### Coverage:
```bash
npm test -- --coverage
```

---

## 🎭 DEMO MODE - TESTING RÁPIDO

En la pantalla principal (My Trips), verás el botón:
**"🎭 Open Demo Trip"**

Esto crea automáticamente un viaje de prueba (Japan - Tokyo/Osaka) con datos realistas para que puedas:
- Navegar por toda la app
- Ver el calculador de presupuesto
- Probar el share card
- Explorar sin crear viajes manualmente

**PERFECTO PARA DEMOSTRACIÓN EN PC**

---

## 🏗️ BUILD PARA PRODUCCIÓN

### Android (APK para testing)

```bash
npx eas build --platform android --profile preview
```

Este comando creará un APK que puedes instalar directamente en cualquier Android.

### Android (AAB para Play Store)

```bash
npx eas build --platform android --profile production
```

Esto genera un Android App Bundle (.aab) listo para subir a Google Play Console.

#### Configurar EAS (primera vez):
```bash
npm install -g eas-cli
eas login
eas build:configure
```

### iOS (requiere Mac y cuenta de desarrollador)

```bash
npx eas build --platform ios --profile production
```

---

## 📦 ESTRUCTURA DE ARCHIVOS CRÍTICOS

```
travel-budget-planner/
├── app/                          # Expo Router screens
│   ├── (tabs)/                   # Tab navigation
│   │   ├── index.tsx            # Home (Trip List) ← DEMO BUTTON AQUÍ
│   │   ├── create.tsx           # Create Trip
│   │   └── profile.tsx          # Profile/Settings
│   ├── trip/[id].tsx            # Trip Detail
│   └── paywall.tsx              # Subscription Modal
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── ScreenContainer.tsx   # ← CRÍTICO: PC preview wrapper
│   │   │   └── DemoModeButton.tsx    # ← CRÍTICO: Demo trip loader
│   │   ├── trip/
│   │   │   ├── BudgetCalculator.tsx  # Main calculator UI
│   │   │   └── TripCard.tsx
│   │   └── ui/                       # Reusable components
│   │
│   ├── services/
│   │   ├── budgetEngine.ts      # ← CORE: Calculation logic
│   │   ├── templates.ts         # Hardcoded destinations
│   │   └── storage.ts           # AsyncStorage wrapper
│   │
│   ├── store/
│   │   ├── tripStore.ts         # Zustand trip state
│   │   └── subscriptionStore.ts # Zustand subscription state
│   │
│   └── types/
│       └── index.ts             # TypeScript types
│
└── __tests__/
    └── budgetEngine.test.ts     # Unit tests
```

---

## 🎨 CUSTOMIZACIÓN

### Cambiar colores:
Editar `src/theme/colors.ts`

### Agregar templates de destinos:
Editar `src/services/templates.ts`

### Modificar límite de viajes gratis:
Editar `src/utils/constants.ts`:
```typescript
export const FREE_TRIP_LIMIT = 1; // Cambiar a 3, 5, etc.
```

### Ajustar ancho del contenedor web:
Editar `src/utils/constants.ts`:
```typescript
export const WEB_CONTAINER_MAX_WIDTH = 480; // Cambiar a 520, 600, etc.
```

---

## 🔐 PRIVACY POLICY & APP STORE REQUIREMENTS

### Privacy Policy (REQUERIDO para stores)

Crear documento con:
1. Datos recolectados: NINGUNO (la app es 100% local)
2. Uso de datos: Solo almacenamiento local
3. Compartir datos: NO se comparten datos
4. Contacto: tu email

Hospedar en:
- GitHub Pages (gratis)
- Notion (público)
- Google Sites

URL ejemplo: `https://tudominio.com/privacy-policy`

### Terms of Service (OPCIONAL pero recomendado)

Documento básico con:
- Uso permitido de la app
- Disclaimer de responsabilidad
- Cambios en términos

### Account Deletion (REQUERIDO si hay cuentas)

**En esta app NO hay cuentas de usuario**, pero si agregas autenticación:
- Agregar botón "Delete Account" en Profile
- Eliminar todos los datos del usuario
- Documentar proceso en Privacy Policy

### Para Google Play Console:

1. **App Content Questionnaire:**
   - ¿Ads? NO
   - ¿In-app purchases? SÍ (Pro subscription)
   - ¿Target children? NO
   - ¿Sensitive permissions? NO

2. **Data Safety Section:**
   - Marcar: "No data collected"
   - Explicar: Todo es local, AsyncStorage

3. **Content Rating:**
   - Completar cuestionario
   - Muy probablemente: PEGI 3 / Everyone

---

## 🚢 DEPLOYMENT CHECKLIST

### Pre-launch:
- [ ] Cambiar `version` en `app.json`
- [ ] Cambiar `versionCode` (Android) y `buildNumber` (iOS)
- [ ] Testing completo en web
- [ ] Testing en Android Emulator
- [ ] Testing en dispositivo físico
- [ ] Crear Privacy Policy URL
- [ ] Crear íconos y splash screens
- [ ] Screenshots para stores (mínimo 4-8)

### Assets necesarios:
```
assets/
├── icon.png           (1024x1024)
├── adaptive-icon.png  (1024x1024, Android)
├── splash.png         (2048x2048 o 1284x2778)
└── favicon.png        (48x48, web)
```

Generar con: https://www.appicon.co/

### Google Play Console:
1. Crear cuenta de desarrollador ($25 one-time)
2. Create Application
3. Upload AAB
4. Complete Store Listing:
   - Title: "Travel Budget Auto-Planner"
   - Short description (80 chars)
   - Full description (4000 chars)
   - Screenshots
   - Feature graphic (1024x500)
   - Icon
5. Content Rating
6. Pricing & Distribution
7. Submit for Review

### Apple App Store (requiere Mac):
1. Apple Developer Account ($99/año)
2. App Store Connect
3. Create App
4. Upload build via Xcode/Transporter
5. Complete App Information
6. Submit for Review

Tiempo de review:
- Google Play: 1-3 días
- App Store: 1-7 días

---

## 🐛 TROUBLESHOOTING COMÚN

### Error: "Metro bundler port already in use"
```bash
npx expo start --clear
# o cambiar puerto
npx expo start --port 3000
```

### Error: "Unable to resolve module"
```bash
rm -rf node_modules
npm install
npx expo start --clear
```

### Android emulator no detectado
```bash
# Verificar adb
adb devices
# Reiniciar adb server
adb kill-server
adb start-server
```

### Cambios no se reflejan
```bash
# Hard reset
npx expo start --clear
# o presionar 'r' en el terminal para reload
```

### TypeScript errors
```bash
npm run type-check
```

---

## 📊 ANALYTICS (MOCK)

La app incluye eventos de analytics mockeados en `src/services/analytics.ts`

Para integrar analytics real:
1. Firebase Analytics (gratis)
2. Mixpanel
3. Amplitude

Eventos implementados:
- `trip_created`
- `trip_edited`
- `trip_deleted`
- `share_card_generated`
- `paywall_opened`
- `subscription_started`
- `demo_mode_opened`

---

## 💰 MONETIZACIÓN (MOCK)

La app tiene arquitectura de suscripción lista pero mockeada.

Para integrar pagos reales:

### Opción 1: RevenueCat (RECOMENDADO)
- Setup más fácil
- Cross-platform
- Analytics incluido
- https://www.revenuecat.com/

### Opción 2: Stripe
- Más control
- Fees más bajos
- Requiere backend
- https://stripe.com/

### Opción 3: Native (Google Play Billing / StoreKit)
- Más complejo
- Requiere código nativo
- 0% fee adicional (solo store fee)

Implementación actual en `src/store/subscriptionStore.ts` está lista para conectar cualquiera de estas opciones.

---

## 🎓 RECURSOS ADICIONALES

- Expo Docs: https://docs.expo.dev/
- React Native: https://reactnative.dev/
- Zustand: https://zustand-demo.pmnd.rs/
- Expo Router: https://expo.github.io/router/docs/
- TypeScript: https://www.typescriptlang.org/docs/

---

## ✅ CHECKLIST FINAL

Antes de publicar:
- [ ] App funciona en web (PC)
- [ ] App funciona en Android Emulator
- [ ] App funciona en dispositivo físico
- [ ] Privacy Policy creado y hosteado
- [ ] Screenshots tomados (8+ diferentes pantallas)
- [ ] Íconos y splash screens generados
- [ ] Version bump en app.json
- [ ] Tests pasando
- [ ] No console.errors en producción
- [ ] Analytics configurado (opcional)
- [ ] Payments configurado o removido de UI

---

## 🎉 ¡LISTO!

Tu app está completamente funcional y lista para:
1. ✅ Revisión completa en PC (navegador)
2. ✅ Testing en Android Emulator
3. ✅ Deploy a celular físico
4. ✅ Publicación en stores

**IMPORTANTE:** Siempre probar primero en web (PC) para iterar rápido, luego Android emulator, y finalmente dispositivo físico.

El botón "🎭 Open Demo Trip" en la pantalla principal permite demostrar todas las features inmediatamente sin configuración.
