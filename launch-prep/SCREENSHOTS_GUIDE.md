# Screenshots Guide — Travel Budget Planner

> Mínimo 4, ideal 6-8. Google Play acepta hasta 8. App Store acepta hasta 10.
> Requisito técnico: **1290 × 2796 px** (iPhone 15 Pro Max) para App Store.  
> Para Google Play: **1080 × 1920 px** mínimo, cualquier ratio 9:16 funciona.

---

## Screenshots recomendados (en orden)

Captura estos 6 en este orden exacto — cuentan la historia de la app.

---

### #1 — Home Screen con viajes
**Pantalla:** `/(tabs)/index` — lista de viajes con demo trip cargado  
**Lo que debe verse:**
- Al menos 1 viaje con tags (🎭 Culture, 🏙️ City Break)
- El presupuesto total y por día visibles en el card
- Barra de búsqueda arriba

**Cómo llegar:**
1. Abre la app
2. Presiona "Open Demo Trip" (carga el viaje de Japan)
3. Captura en este estado

**Texto de overlay sugerido:** `"Your trips, organized"`

---

### #2 — Trip Detail con Budget Calculator
**Pantalla:** `/trip/[id]` — detalle del viaje demo  
**Lo que debe verse:**
- Nombre del viaje "Japan Explorer"
- Presupuesto por categorías (accordions expandidos o al menos visible el total)
- Badge "Mid" de travel style
- Precio confirmado con el check verde

**Cómo llegar:**
1. Tap en el demo trip desde el home

**Texto de overlay sugerido:** `"Real prices, real budget"`

---

### #3 — Budget Chart (gráfico de barras)
**Pantalla:** `/trip/[id]` — scroll down hasta el BudgetChart  
**Lo que debe verse:**
- Barras horizontales por categoría
- Colores distintos por categoría
- "✓ confirmed" en accommodation e insurance

**Texto de overlay sugerido:** `"See exactly where your money goes"`

---

### #4 — Am I Ready? / Entry Requirements
**Pantalla:** `/documents/[id]` — tab "Am I Ready? ✅"  
**Lo que debe verse:**
- Widget de readiness con los checks: passport ✓, visa ✓, flight ✓
- Barra de progreso verde
- Badge "Ready to travel 🟢" o similar

**Cómo llegar:**
1. Desde el trip detail → "Documents & Entry Req."
2. Tab "Am I Ready? ✅"

**Texto de overlay sugerido:** `"Know before you go"`

---

### #5 — Document Vault
**Pantalla:** `/documents/[id]` — tab "Documents"  
**Lo que debe verse:**
- Lista de documentos: Passport, Japan Visa, Flight, Boarding Pass, Hotel, Insurance
- Expiry badge verde en Passport ("✓ Valid")
- Categorías con íconos

**Texto de overlay sugerido:** `"All your travel docs in one place"`

---

### #6 — Create Trip Form
**Pantalla:** `/(tabs)/create`  
**Lo que debe verse:**
- SearchableSelect de país/ciudad abierto o con valor seleccionado
- DateRangePicker con fechas seleccionadas
- Travel Style selector

**Texto de overlay sugerido:** `"Plan any destination in 60 seconds"`

---

### #7 (Bonus) — Migration Mode
**Pantalla:** `/migration/[id]`  
**Lo que debe verse:**
- Header oscuro "✈️ MIGRATION MODE"
- Passport y Visa con badge "✓ Valid"
- Boarding pass visible

**Texto de overlay sugerido:** `"Airport mode — everything at a glance"`

---

### #8 (Bonus) — Profile Stats
**Pantalla:** `/(tabs)/profile`  
**Lo que debe verse:**
- Card con stats: "1 Trip · 10 Days · 1 Country"
- Plan badge FREE/PRO
- Settings de moneda e idioma

**Texto de overlay sugerido:** `"Your travel history, locally stored"`

---

## Herramientas para tomar screenshots

### Opción 1: Web Preview (más fácil)
```bash
npm run web
# Abre http://localhost:8081 en Chrome
# Chrome DevTools → Toggle Device Toolbar (Ctrl+Shift+M)
# Selecciona "iPhone 14 Pro Max" (430 × 932)
# Usa la extensión "GoFullPage" o DevTools screenshot
```

### Opción 2: Android Emulator
```bash
npm run android
# En el emulador: Ctrl+S (Windows) o ⌘+S (Mac) para screenshot
# Se guarda automáticamente en Desktop o carpeta de capturas
```

### Opción 3: iPhone físico (mejor calidad)
```bash
npx expo start
# Escanea QR con Expo Go
# Power + Volume Up para screenshot nativo
```

---

## Añadir texto de overlay a los screenshots

Herramientas gratuitas recomendadas:
- **Canva** (canva.com) — arrastra el screenshot, añade texto encima
- **Previewed.app** — genera mockups de teléfono automáticamente (gratuito)
- **AppLaunchpad** — genera screenshots con device frame y texto

Template de Canva sugerido: busca "App Store Screenshots" → tamaño 1290×2796 px

---

## Checklist final de screenshots

- [ ] #1 Home con trip cards y tags
- [ ] #2 Trip detail con budget
- [ ] #3 Budget chart con colores
- [ ] #4 Am I Ready? widget
- [ ] #5 Document Vault con expiry badges
- [ ] #6 Create trip form
- [ ] #7 Migration Mode (bonus)
- [ ] #8 Profile stats (bonus)
- [ ] Todos en el mismo tamaño/ratio
- [ ] Texto de overlay añadido (opcional pero mejora ASO)
- [ ] Sin datos personales reales en las capturas (usar solo demo trip)

---

## Feature Graphic — Google Play (obligatorio)

**Tamaño:** 1024 × 500 px  
**Formato:** JPG o PNG (sin transparencia)

Contenido sugerido:
- Fondo degradado indigo (#4F46E5 → #7C3AED)
- Nombre de la app en blanco, fuente bold
- 3-4 íconos de las features principales: ✈️ 💰 📄 🌍
- Subtítulo: "Plan smarter. Travel better."

Puedes hacerlo gratis en Canva con el tamaño exacto.
