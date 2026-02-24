# 🚀 Deployment Checklist

## Pre-Launch Testing

### ✅ Web (PC Preview)
- [ ] App loads successfully at localhost:8081
- [ ] Mobile frame appears centered (max 480px)
- [ ] Demo button works ("Open Demo Trip")
- [ ] Can create new trip
- [ ] Budget calculator shows correct totals
- [ ] All navigation works
- [ ] No console errors
- [ ] Hot reload works

### ✅ Android Emulator
- [ ] App installs successfully
- [ ] All screens navigate correctly
- [ ] AsyncStorage persists data
- [ ] Back button works
- [ ] Keyboard appears correctly
- [ ] No crashes

### ✅ Physical Device
- [ ] App installs via Expo Go
- [ ] Performance is smooth
- [ ] Touch interactions work
- [ ] Scrolling is smooth
- [ ] No memory leaks
- [ ] Works on different screen sizes

## Code Quality

### ✅ TypeScript
- [ ] `npm run type-check` passes
- [ ] No `any` types (or minimal)
- [ ] All interfaces defined

### ✅ Tests
- [ ] `npm test` passes
- [ ] Budget engine tests pass
- [ ] Coverage > 60% (optional)

### ✅ Code Review
- [ ] No hardcoded sensitive data
- [ ] No console.log in production code
- [ ] Error handling implemented
- [ ] Loading states for async operations

## Assets & Content

### ✅ App Icons
- [ ] icon.png (1024x1024)
- [ ] adaptive-icon.png (1024x1024, Android)
- [ ] favicon.png (48x48, web)

### ✅ Splash Screen
- [ ] splash.png (2048x2048 or 1284x2778)
- [ ] Background color matches brand

### ✅ Screenshots (minimum 4-8)
- [ ] Home screen (trip list)
- [ ] Create trip form
- [ ] Trip detail with calculator
- [ ] Budget breakdown
- [ ] Paywall screen
- [ ] Profile/settings
- [ ] Demo mode active
- [ ] Different device sizes if possible

### ✅ Marketing Assets
- [ ] Feature graphic (1024x500, Google Play)
- [ ] Promotional text/description
- [ ] Keywords for ASO

## Configuration

### ✅ app.json
- [ ] Version bumped (e.g., 1.0.0 → 1.0.1)
- [ ] versionCode incremented (Android)
- [ ] buildNumber incremented (iOS)
- [ ] Bundle IDs correct
- [ ] App name finalized
- [ ] Orientation set

### ✅ Package.json
- [ ] Version matches app.json
- [ ] All dependencies updated
- [ ] No security vulnerabilities (`npm audit`)

## Legal & Compliance

### ✅ Privacy Policy
- [ ] Created and hosted online
- [ ] URL added to app.json
- [ ] Clear about data collection (NONE in this app)
- [ ] Contact information included

### ✅ Terms of Service (optional but recommended)
- [ ] Created and hosted
- [ ] Linked in app

### ✅ App Store Requirements
- [ ] Age rating determined
- [ ] Content rating completed
- [ ] Data safety section filled
- [ ] Target audience defined

## Store Listings

### ✅ Google Play Console
- [ ] Developer account active ($25)
- [ ] App created
- [ ] Store listing completed:
  - [ ] Title (30 chars max)
  - [ ] Short description (80 chars)
  - [ ] Full description (4000 chars)
  - [ ] Screenshots uploaded
  - [ ] Feature graphic uploaded
  - [ ] Icon uploaded
  - [ ] Category selected
- [ ] Content rating completed
- [ ] Pricing & distribution set
- [ ] Privacy policy URL added

### ✅ Apple App Store (if applicable)
- [ ] Developer account active ($99/year)
- [ ] App Store Connect configured
- [ ] App information completed
- [ ] Build uploaded
- [ ] Privacy details filled

## Build Process

### ✅ Development Build Test
- [ ] EAS CLI installed (`npm install -g eas-cli`)
- [ ] EAS configured (`eas build:configure`)
- [ ] Preview build works (`eas build --platform android --profile preview`)
- [ ] APK installs on test device

### ✅ Production Build
- [ ] Production build created (`eas build --platform android --profile production`)
- [ ] AAB file downloaded
- [ ] File size acceptable (< 100MB ideally)

## Final Checks

### ✅ User Experience
- [ ] First-time user flow clear
- [ ] Demo mode obvious and helpful
- [ ] Error messages helpful
- [ ] Loading states present
- [ ] Empty states handled

### ✅ Performance
- [ ] App loads in < 3 seconds
- [ ] Navigation feels instant
- [ ] No memory leaks
- [ ] Battery usage acceptable

### ✅ Accessibility (optional but good)
- [ ] Touch targets > 44x44px
- [ ] Contrast ratios acceptable
- [ ] Font sizes readable
- [ ] Screen reader friendly

## Post-Launch

### ✅ Monitoring
- [ ] Analytics configured (if applicable)
- [ ] Crash reporting setup (optional)
- [ ] User feedback mechanism

### ✅ Marketing
- [ ] Social media posts prepared
- [ ] Press release (if applicable)
- [ ] Landing page/website
- [ ] Email announcement

### ✅ Support
- [ ] Support email set up
- [ ] FAQ prepared
- [ ] Feedback mechanism in app

## Emergency Rollback Plan

### ✅ Backup
- [ ] Previous version APK/AAB saved
- [ ] Code tagged in git
- [ ] Database migration reversible

### ✅ Hotfix Process
- [ ] Know how to push urgent update
- [ ] Emergency contact list ready

---

## Quick Commands Reference

```bash
# Test locally
npm run web
npm run android
npm test

# Build
npx eas build --platform android --profile preview  # APK for testing
npx eas build --platform android --profile production  # AAB for store

# Version bump
# Update in app.json:
# - version: "1.0.1"
# - android.versionCode: 2
# - ios.buildNumber: "1.0.1"
```

---

## Timeline Estimate

- **Week 1:** Development & testing (DONE ✓)
- **Week 2:** Assets creation, polish
- **Week 3:** Store setup, compliance docs
- **Week 4:** Submit & review
- **Week 5-6:** Launch & monitor

Google Play review: 1-3 days
App Store review: 1-7 days

---

## Notes

- Always test on real device before submitting
- Start with Android (faster review)
- iOS requires Mac for final build
- Budget 2-4 weeks for entire process
- Keep versioning consistent
- Document all changes in CHANGELOG

Good luck! 🚀
