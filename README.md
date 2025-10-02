# Vehicle Vitals

A lightweight project for tracking vehicle information across web and mobile frontends. Web is React + react-router; mobile is React Native. Firebase is used for auth and Firestore persistence. Small shared utilities/config live in `shared/`.

## Quick overview
- Web: React app with pages in `web/src/pages/` and a router wired in `App.jsx`.
- Mobile: React Native app under `mobile/` with screens in `mobile/screens/` and stack navigation in `mobile/App.js`.
- Shared: `shared/firebaseConfig.js`, `shared/azureConfig.js`, and `shared/types.js` contain cross-cutting config and types.

## Project structure (important files)
- `App.jsx` — web entry that registers routes to `web/src/pages/*`.
- `web/src/pages/Home.jsx` — example page that lists Firestore vehicles for the current user.
- `web/src/utils/vehicleService.js` — VIN decoding against NHTSA VPIC and example `fetchVehicleByVINAndSave(vin)` that writes to Firestore.
- `mobile/App.js` — React Native navigation stack (Home, AddVehicle, EditVehicle, ScanVIN).
- `shared/firebaseConfig.js` — Firebase initialization exporting `auth`, `db`, and `messaging`.
- `shared/azureConfig.js` — Azure/MSAL placeholders and example backend helpers (`/api/data`, `/api/notify`).
- `shared/types.js` — `defaultVehicle` shape used across the app.

## Setup & run (developer notes)
The repository contains both a web and a mobile app. Check each folder for a `package.json` and adjust commands if you use `yarn` or `pnpm`.

Web (expected)
1. Install dependencies at repo root or `web/` if packages are split:

```bash
npm install
# or
npm install --prefix web
```

2. Start development server (typical):

```bash
npm start
# or
npm start --prefix web
```

Mobile (expected)
1. Install dependencies (in `mobile/` if that folder has its own package.json):

```bash
npm install --prefix mobile
```

2. Run on simulator / device using React Native tooling:

```bash
npx react-native run-ios
# or
npx react-native run-android
```

If `mobile/package.json` is missing RN scripts, inspect the file and run the commands your setup requires.

## Firebase & credentials
- `shared/firebaseConfig.js` contains placeholders. Replace values with real Firebase credentials from your Firebase project or set them via environment variables / platform config.
- Firestore path convention: user data is stored under `users/${userId}/vehicles/${vin}` — preserve this when modifying database code.

## Azure & backend notes
- `shared/azureConfig.js` contains an MSAL instance and example helper functions that call `/api/*` endpoints. These are placeholders — only update them when a backend exists.

## Conventions and patterns
- Auth: components read `auth.currentUser?.uid` directly. Avoid changing this auth model without updating all consumers.
- Data shape: use `shared/types.js` `defaultVehicle` when creating/updating vehicles.
- VIN lookup: `web/src/utils/vehicleService.js` demonstrates using the NHTSA VPIC API and persisting a decoded vehicle object keyed by VIN.

## Useful files to open first
- `web/src/pages/Home.jsx`
- `web/src/utils/vehicleService.js`
- `mobile/App.js`
- `shared/firebaseConfig.js`

## Troubleshooting
- If Firestore calls silently fail, confirm `auth.currentUser` is set and your Firebase config is valid.
- If RN commands fail, verify your development machine has the required native toolchains (Xcode for iOS, Android SDK for Android).

### Git push gotchas (GitHub)
- Symptom: `git push` fails with `HTTP 400` / `send-pack: unexpected disconnect`.
	- Cause: Some Git/libcurl versions over HTTP/2 can error on large pushes.
	- Fix (safe, reversible):
		```bash
		git config --global http.version HTTP/1.1
		git config --global http.postBuffer 524288000
		```
		Revert later with:
		```bash
		git config --global --unset http.version
		git config --global --unset http.postBuffer
		```

- Auth options:
	- HTTPS with a GitHub Personal Access Token (PAT)
	- SSH (recommended if you prefer key-based auth)

- Switch `origin` to SSH (optional):
	```bash
	git remote set-url origin git@github.com:mnelson3/vehicle-vitals-react-project.git
	# test
	ssh -T git@github.com
	git push -u origin main
	```

## How to help next
If you want, I can:
- Add exact `package.json`-driven run commands after reading `package.json` files.
- Add a minimal `.env.example` and local Firebase setup guide.
- Create a small smoke-test script that asserts the shared `defaultVehicle` shape and that Firestore path functions build expected IDs.
