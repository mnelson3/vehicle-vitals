# Mobile setup

This repo ships the JS source in `mobile/App.js` and `mobile/screens/*`. You can run it either with Expo (recommended, since `ScanVIN` uses `expo-barcode-scanner`) or with the React Native CLI (requires generating native `android/` and `ios/` folders).

## Option A — Expo (recommended)

Prereqs
- Android Studio installed with an emulator (or a physical device with USB debugging)
- Node.js 20.19.4 or newer (Expo SDK 54+ requires this)
- npm

Steps
```bash
cd mobile
npm install
# Start Android emulator from Android Studio, then:
npm run android  # opens Expo + launches the app on the emulator
```

If you see an error mentioning `metro/src/lib/TerminalReporter` or engine checks, update Node to ≥ 20.19.4 and reinstall deps:
```bash
nvm install 20.19.4 && nvm use 20.19.4
cd mobile && rm -rf node_modules package-lock.json && npm install
npm run android
```

Notes
- Expo doesn’t require `android/` or `ios/` project folders.
- `ScanVIN` uses the device camera via `expo-barcode-scanner`, which works out-of-the-box with Expo.

## Option B — React Native CLI (bare)

This repo does not include native `ios/` and `android/` directories. To run with RN CLI you need to initialize a native project and copy the JS files over.

1. Ensure prerequisites are installed on your machine:
   - Node.js (LTS)
   - Java JDK and Android SDK for Android
   - Xcode for iOS (macOS)

2. Initialize a new React Native project (this will create `ios/` and `android/`):

```bash
# from repo root
npx react-native init mobile --version 0.71.0
```

3. The command above will create a new `mobile/` folder. If you already have a `mobile/` folder with JS files in this repo, you can instead run the init in a temporary directory and then copy `ios/` and `android/` into this repo's `mobile/` folder.

4. After native folders exist, install JS deps from this repo's `mobile/package.json`:

```bash
cd mobile
npm install
```

5. Copy or merge the existing `mobile/App.js` and `mobile/screens/` from this repo into the initialized project's `App.js` and `screens/` folders.

6. Start Metro and run on a device/simulator:

```bash
npm run android
# or
npm run ios
```

Notes
- If you prefer a faster local iteration cycle and don't need deep native modules, Expo is often quicker to get started.
- If you want, I can generate a small script/patch that copies `mobile/App.js` into the RN init output and creates basic `index.js` entries.
