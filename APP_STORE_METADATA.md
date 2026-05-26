# App Store Metadata — Travel Budget Planner

## App Store Connect — Información requerida

### Nombre de la app (máx 30 chars)
```
Travel Budget Planner
```

### Subtítulo (máx 30 chars)
```
Plan trips. Track expenses.
```

### Descripción (máx 4000 chars)
```
Travel Budget Planner helps you plan, organize, and track your trip budget — all offline, all private.

PLAN YOUR TRIP BUDGET
• Calculate costs for accommodation, flights, food, activities, insurance, and more
• Choose your travel style: Budget, Mid-Range, or Comfort
• Start from templates for popular destinations (Tokyo, New York, Mexico City, Barcelona)
• See your budget breakdown at a glance with visual charts

TRAVEL DOCUMENTS VAULT
• Store your passport, visa, boarding passes, hotel bookings, and travel insurance
• Everything stays on your device — never uploaded to any server
• Quick access in Migration Mode for airport and border crossings

ENTRY REQUIREMENTS
• Check visa requirements based on your passport nationality
• Visual traffic light system: green (no visa), yellow (eVisa/ESTA), red (visa required)
• Supports passports from Colombia, USA, Mexico, Spain and more destinations

TRIP TIMELINE
• Add flights, check-ins, check-outs, and visa deadlines
• See your full itinerary at a glance
• Get reminders for important travel dates

100% OFFLINE & PRIVATE
• All data stored locally on your device
• No account required
• No ads, no tracking
• Works without internet connection

Perfect for solo travelers, couples, families, and digital nomads planning their next adventure.
```

### Palabras clave (máx 100 chars — separadas por coma, sin espacios)
```
travel,budget,planner,trip,expense,tracker,visa,passport,document,itinerary
```

### URL de Soporte
```
https://github.com/[tu-usuario]/travel-budget-planner/issues
```

### URL de Política de Privacidad (OBLIGATORIA)
Opciones para hospedarla gratis:
1. GitHub Pages — sube PRIVACY_POLICY.md como index.html
2. GitHub Gist — https://gist.github.com/[tu-usuario]/[hash]
3. Notion page pública

### Categoría
```
Primaria: Travel
Secundaria: Finance
```

### Rating (Clasificación de contenido)
```
4+ (sin contenido objetable)
```

---

## Screenshots requeridos por Apple

Tamaños obligatorios:
- **6.7" iPhone** (iPhone 15 Pro Max): 1290 × 2796 px — mínimo 3, máximo 10
- **6.5" iPhone** (iPhone 11 Pro Max): 1242 × 2688 px — opcional pero recomendado
- **iPad Pro 12.9"**: 2048 × 2732 px — solo si soportas iPad (supportsTablet: true ✓)

### Pantallas sugeridas para screenshots:
1. **Home** — lista de viajes con el viaje Japan demo
2. **Crear viaje** — formulario con plantilla Tokyo seleccionada
3. **Detalle de viaje** — budget breakdown con gráfica
4. **Documents** — vault con documentos y semáforo de visa
5. **Migration Mode** — pantalla de aeropuerto

### Herramientas para hacer screenshots:
- Ejecuta `npx expo start --ios` y usa el simulador de Xcode
- O usa [Screely](https://www.screely.com/) para agregar marco de iPhone

---

## App Store Connect — Checklist de submission

- [ ] Cuenta Apple Developer activa ($99/año)
- [ ] App creada en https://appstoreconnect.apple.com
- [ ] Bundle ID registrado: `com.travelbudget.planner`
- [ ] Screenshots subidas (mín. 3 en 6.7")
- [ ] Descripción y keywords completadas
- [ ] Privacy Policy URL pública configurada
- [ ] Categoría: Travel
- [ ] Rating completado (4+)
- [ ] Build subido vía EAS o Xcode
- [ ] Test en TestFlight con al menos 1 dispositivo real

---

## Comandos de build (después de hacer eas login)

```bash
# Login a Expo (solo una vez)
npx eas-cli login

# Configurar proyecto (solo una vez — genera projectId)
npx eas-cli build:configure

# Build para TestFlight (distribución interna)
npx eas-cli build --platform ios --profile preview

# Cuando estés listo para App Store
npx eas-cli build --platform ios --profile production
npx eas-cli submit --platform ios
```

## Datos que necesitas de Apple Developer:
- **Apple ID**: tu email de Apple Developer
- **App Store Connect App ID (ascAppId)**: lo ves en App Store Connect → App → App Information
- **Apple Team ID**: en developer.apple.com → Account → Membership
