# Mobile (React Native CLI) setup notes

This repo contains `mobile/App.js` and `mobile/screens/*`, but it does not include native `ios/` and `android/` directories. To run the mobile app using the React Native CLI (non-Expo) follow these steps locally.

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
- If you prefer a faster local iteration cycle and don't need deep native modules, Expo is often quicker to get started. You indicated you prefer non-Expo — these steps ensure a standard React Native CLI setup.
- If you want, I can generate a small script/patch that copies `mobile/App.js` into the RN init output and creates basic `index.js` entries.
