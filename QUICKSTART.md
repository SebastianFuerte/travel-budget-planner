# 🚀 QUICK START - Travel Budget Auto-Planner

## ⚡ 3-Minute Setup (Windows)

### 1️⃣ Prerequisites
- Node.js installed (v20+)
- Terminal/Command Prompt

### 2️⃣ Install & Run
```bash
cd travel-budget-planner
npm install
npm run web
```

### 3️⃣ Test the App
1. Browser opens at `http://localhost:8081`
2. You'll see a phone-like container in the center
3. Click **"🎭 Open Demo Trip"** button
4. Navigate through all screens

**That's it!** The app is running in your browser.

---

## 📱 What You'll See

### Home Screen
- List of saved trips (empty at first)
- **Demo button** - click this to load a sample trip
- "Create New Trip" button

### Demo Trip (Japan)
- Pre-configured Tokyo/Osaka trip
- 10 days, 2 people
- Mid-range budget
- All categories editable

### Features to Test
- ✅ Create custom trip
- ✅ Edit budget categories (min/avg/max)
- ✅ View budget breakdown
- ✅ Calculate totals automatically
- ✅ Multiple currency support
- ✅ Delete/duplicate trips
- ✅ Pro subscription (mock)

---

## 🎯 Key Features

### Budget Calculator
- 7 categories: accommodation, transport, food, activities, insurance, internet, extras
- Min/Average/Max ranges per day
- Auto-calculates: total, daily, per person
- Supports: USD, EUR, GBP, JPY, MXN

### Templates
Pre-configured destinations:
- 🇯🇵 Japan (Tokyo, Osaka)
- 🇺🇸 USA (New York)
- 🇲🇽 Mexico (CDMX)
- 🇪🇸 Spain (Barcelona)

### Travel Styles
- Budget (hostels, street food)
- Mid (3-star hotels, local restaurants)
- Comfy (4-star+, nice restaurants)

---

## 🎭 Demo Mode

**IMPORTANT:** Use the demo mode to test without creating trips manually.

1. Open app in browser
2. Click "🎭 Open Demo Trip"
3. Explore all screens:
   - Trip detail
   - Budget breakdown
   - Edit options
   - Share (mock)

---

## 📱 Mobile Testing (Optional)

### Android Emulator
Requires Android Studio + AVD setup:
```bash
npm run android
```

### Physical Device
1. Install Expo Go app
2. Run: `npx expo start`
3. Scan QR code

---

## 🛠️ Development Commands

```bash
npm run web          # Web preview (PC)
npm run android      # Android emulator
npm test             # Run tests
npm run type-check   # TypeScript validation
```

---

## 📂 Project Structure

```
app/                    # Screens
  (tabs)/
    index.tsx          # Home ← Demo button here
    create.tsx         # Create trip
    profile.tsx        # Settings
  trip/[id].tsx        # Trip detail

src/
  components/          # UI components
  services/
    budgetEngine.ts    # ← Core calculation logic
    templates.ts       # Destination templates
  store/               # Zustand state
  types/               # TypeScript types
```

---

## ⚠️ Known Limitations (Mock Features)

These features are **mocked** (not real):
- Payments/subscriptions (ready for RevenueCat/Stripe)
- Share card image generation (ready for implementation)
- PDF export (Pro feature, not implemented)
- Analytics (events logged to console only)

All other features are **fully functional**.

---

## 🔧 Troubleshooting

### Port already in use?
```bash
npx expo start --web --port 3000
```

### Metro bundler error?
```bash
npx expo start --clear
```

### Module not found?
```bash
rm -rf node_modules
npm install
```

---

## 📚 Documentation

- **Full setup:** `SETUP_GUIDE.md` (Windows focus, deployment instructions)
- **File list:** `FILE_MANIFEST.md` (all 40 files explained)
- **Deployment:** `DEPLOYMENT_CHECKLIST.md` (app store preparation)
- **Quick start:** This file!

---

## ✅ Success Checklist

After running `npm run web`, you should see:
- ✅ Browser opens automatically
- ✅ Mobile frame centered (480px max width)
- ✅ Gray background around the frame
- ✅ "My Trips" title at top
- ✅ "🎭 Open Demo Trip" button visible
- ✅ No errors in console

If all ✅, you're ready to develop!

---

## 🎨 Customization

### Change colors
Edit: `src/theme/colors.ts`

### Add destinations
Edit: `src/services/templates.ts`

### Adjust free trip limit
Edit: `src/utils/constants.ts`
```typescript
export const FREE_TRIP_LIMIT = 1; // Change to 3, 5, etc.
```

---

## 🚀 Next Steps

1. ✅ Test in browser (web)
2. ✅ Explore demo trip
3. ✅ Create custom trip
4. ⏳ Setup Android Emulator (see SETUP_GUIDE.md)
5. ⏳ Build for production (see DEPLOYMENT_CHECKLIST.md)

---

## 💡 Tips

- Always test in **web first** (fastest iteration)
- Use **demo mode** for presentations
- Check **SETUP_GUIDE.md** for Android setup
- All data is **local** (no backend needed)

---

## 🎉 You're Ready!

The app is now running. Click the demo button and explore!

Questions? Check:
- `SETUP_GUIDE.md` - Complete instructions
- `README.md` - Project overview
- `FILE_MANIFEST.md` - File explanations

Built with ❤️ for travelers | React Native + Expo + TypeScript
