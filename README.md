# ✈️ Travel Budget Auto-Planner

A smart mobile app for automatic travel budget planning with real-time calculations, built with React Native + Expo.

## 🎯 Quick Start (Windows PC Preview)

```bash
cd travel-budget-planner
npm install
npm run web
```

Open browser at `http://localhost:8081` and click **"🎭 Open Demo Trip"**

## ✨ Features

- 📊 Automatic budget calculation with min/avg/max ranges
- 🌍 Hardcoded templates: Japan, USA, Mexico, Spain
- 💾 Offline-first with AsyncStorage
- 🎨 Responsive UI (mobile-first, PC preview)
- 💳 Mock Pro subscription (no real payments)
- 📤 Share budget cards (mock export)
- 🎭 Demo mode for instant testing

## 📱 Run Options

### Web (PC Preview) - RECOMMENDED FIRST
```bash
npm run web
```
- Simulates phone in browser (480px container)
- All features work except native APIs
- Hot reload enabled

### Android Emulator
```bash
npm run android
```
Requires Android Studio + AVD setup (see SETUP_GUIDE.md)

### Physical Device
```bash
npx expo start
```
Scan QR with Expo Go app

## 🏗️ Tech Stack

- **Framework:** React Native + Expo
- **Routing:** Expo Router (file-based)
- **State:** Zustand (lightweight alternative to Redux)
- **Language:** TypeScript
- **Storage:** AsyncStorage
- **UI:** Custom components + React Native core
- **Testing:** Jest + React Native Testing Library

## 📁 Project Structure

```
app/                 # Expo Router screens
  (tabs)/           
    index.tsx       # Home (Trip List) ← Demo button here
    create.tsx      # Create Trip
    profile.tsx     # Profile/Settings
  trip/[id].tsx     # Trip Detail
  paywall.tsx       # Subscription Modal

src/
  components/       # UI components
    layout/
      ScreenContainer.tsx  # ← CRITICAL: PC preview wrapper
      DemoModeButton.tsx   # ← CRITICAL: Demo loader
  services/
    budgetEngine.ts        # ← CORE: Calculation logic
    templates.ts           # Destination templates
  store/
    tripStore.ts           # Zustand state
```

## 🎭 Demo Mode

Press **"🎭 Open Demo Trip"** on home screen to load:
- Pre-configured Japan trip (Tokyo/Osaka)
- 10 days, 2 people, Mid-range
- Editable budget categories
- Navigate entire app without setup

## 🧮 Budget Calculator

For each trip:
- 7 categories: accommodation, transport, food, activities, insurance, internet, extras
- Min / Average / Max per day (editable)
- Auto-calculates: total, per day, per person
- Supports 5 currencies: USD, EUR, GBP, JPY, MXN

## 💰 Subscription (Mock)

- **Free:** 1 saved trip
- **Pro:** Unlimited trips + PDF export
- No real payments integrated (ready for RevenueCat/Stripe)

## 🚀 Build for Production

### Android APK (testing)
```bash
npx eas build --platform android --profile preview
```

### Android AAB (Play Store)
```bash
npx eas build --platform android --profile production
```

See SETUP_GUIDE.md for complete deployment instructions.

## 📝 Important Files

- `SETUP_GUIDE.md` - Complete setup & deployment (Windows focus)
- `app.json` - Expo configuration
- `src/services/budgetEngine.ts` - Core calculation logic
- `src/services/templates.ts` - Destination templates
- `src/store/tripStore.ts` - Trip state management

## 🧪 Testing

```bash
npm test                    # Run all tests
npm test budgetEngine       # Specific test
npm run type-check          # TypeScript check
```

## 📸 Screenshots Needed for Stores

1. Home screen (trip list)
2. Create trip form
3. Trip detail with budget
4. Budget breakdown
5. Share card preview
6. Paywall screen
7. Profile/settings
8. Demo trip loaded

## 🔐 Privacy & Compliance

- No user accounts
- No data collection
- 100% local storage (AsyncStorage)
- Privacy Policy needed for stores (template in SETUP_GUIDE.md)

## 🐛 Common Issues

**Metro bundler error:**
```bash
npx expo start --clear
```

**Module not found:**
```bash
rm -rf node_modules && npm install
```

**TypeScript errors:**
```bash
npm run type-check
```

## 📚 Documentation

- Full setup guide: `SETUP_GUIDE.md`
- Expo docs: https://docs.expo.dev/
- React Native: https://reactnative.dev/

## 🎯 Workflow

1. **PC (Web):** Develop & test UI/logic
2. **Android Emulator:** Test native features
3. **Physical Device:** Final testing
4. **Deploy:** EAS Build → App Stores

## 📄 License

MIT

## 🤝 Contributing

This is a demo/template project. Feel free to fork and customize!

---

Built with ❤️ for travelers | React Native + Expo + TypeScript
