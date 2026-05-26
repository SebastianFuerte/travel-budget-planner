# Store Listing Copy — Travel Budget Planner

> Listo para copiar y pegar en Google Play Console y Apple App Store Connect.
> Ajusta el precio Pro antes de publicar.

---

## Google Play Store

### Title (30 chars max)
```
Travel Budget Planner
```

### Short Description (80 chars max)
```
Plan your trip budget by destination. Visa checker. Offline. No account needed.
```

### Full Description (4000 chars max — pegar tal cual)
```
Plan your next trip without surprises. Travel Budget Planner gives you a realistic breakdown of what your trip will actually cost — before you book anything.

✈️ SMART BUDGET CALCULATOR
• Choose your destination from 150+ cities worldwide
• Get automatic budget estimates for accommodation, food, transport, activities, insurance, and more
• Pick your travel style: Budget, Mid-Range, or Comfy
• Adjust for your traveler profile (backpacker, couple, family, digital nomad, luxury)
• See daily averages, trip totals, and per-person costs at a glance

💰 CONFIRM REAL PRICES
• Found a hotel on Booking.com? Lock in that price
• Confirmed your flight? Add it and see your real total
• Mix confirmed prices with estimates for the most accurate budget

🌍 VISA & ENTRY REQUIREMENTS
• Check if you need a visa before you start planning
• Covers 200+ passport + destination combinations
• Traffic-light system: green (no visa), yellow (eVisa/ESTA), red (visa required)
• "Am I Ready?" checklist — passport, visa, insurance, flights, all in one view

📄 DOCUMENT VAULT
• Store your passport, visa, boarding passes, hotel confirmations, and insurance in one secure place
• Expiry alerts for passport and visa
• Quick-access Migration Mode — everything you need at the airport, one tap away
• 100% offline — your documents never leave your device

🏷️ ORGANIZE YOUR TRIPS
• Add tags: Honeymoon, Family, Backpacking, Business, and more
• Search and filter your trips
• Archive completed trips
• Duplicate a trip to reuse your setup

🔒 PRIVACY FIRST
• No account, no login, no sign-up required
• All your data stays on your device — we have no servers
• The only network request is fetching currency exchange rates (no personal data sent)

🌐 15 CURRENCIES SUPPORTED
USD · EUR · GBP · JPY · MXN · COP · BRL · INR · CNY · THB · AUD · CAD · KRW · CHF · SEK

---
FREE VERSION INCLUDES:
• 1 trip
• Full budget calculator
• Visa checker
• Document Vault (3 documents per trip)

PRO VERSION INCLUDES:
• Unlimited trips
• Unlimited documents
• All future features

Start planning smarter. Download free — no account needed.
```

### Category
```
Travel & Local
```

### Tags / Keywords
```
travel budget, trip planner, travel cost calculator, visa requirements, budget travel, trip budget, travel planning, backpacking budget, travel app, holiday budget
```

### Content Rating
```
Everyone (no mature content)
```

### Privacy Policy URL
```
https://[tu-github-pages-o-sitio]/privacy-policy
```
> Reemplaza con la URL donde subas el PRIVACY_POLICY.md

---

## Apple App Store Connect

### Name (30 chars max)
```
Travel Budget Planner
```

### Subtitle (30 chars max)
```
Plan trips. Check visas. Go.
```

### Keywords (100 chars max — separados por coma, sin espacios)
```
travel,budget,trip,planner,visa,passport,expense,cost,calculator,backpacker,vacation,holiday
```

### Description (4000 chars max — misma descripción que Google Play, funciona igual)
```
[Mismo texto que la descripción larga de Google Play arriba]
```

### Promotional Text (170 chars max — aparece arriba de la descripción, editable sin nuevo build)
```
Plan any trip in minutes — 150+ destinations, visa checker, document vault, and offline-first privacy. No account needed.
```

### Support URL
```
mailto:jsfuertem@unal.edu.co
```

### Marketing URL (opcional)
```
[tu landing page si la tienes]
```

### Age Rating
```
4+ (no objectionable content)
```

### Category
```
Primary: Travel
Secondary: Finance
```

---

## What to Fill in "Data Safety" (Google Play) / "Privacy Details" (App Store)

### Google Play — Data Safety Section

| Question | Answer |
|----------|--------|
| Does your app collect or share any of the required user data types? | **No** |
| Is all of the user data collected by your app encrypted in transit? | **Yes** (only FX API call, uses HTTPS) |
| Do you provide a way for users to request that their data is deleted? | **Yes** (uninstalling the app deletes all data) |

Data types collected: **None** (select "No data collected")

### App Store — Privacy Details

All categories: **"Not Collected"**

The only exception: you may optionally declare **"Other Diagnostic Data"** as "Collected, Not Linked to User, Not Used for Tracking" if you add crash reporting later. For now: nothing to declare.

---

## What in-app purchases to set up

### Google Play / App Store — Subscription

| Field | Value |
|-------|-------|
| Product ID | `travel_budget_pro_monthly` |
| Type | Auto-renewable subscription |
| Duration | 1 month |
| Price suggestion | $2.99/month or $19.99/year |
| Free trial | 3 days |
| Description | "Unlimited trips, unlimited documents, all future features" |

> Requires Sprint 3 (RevenueCat) to wire up. For now the mock paywall is enough to submit to stores.

---

## Version Info (update in app.json before building)

```json
{
  "version": "1.0.0",
  "android": {
    "versionCode": 1
  },
  "ios": {
    "buildNumber": "1.0.0"
  }
}
```
