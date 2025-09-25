<!--
Guidance for AI coding assistants working on the Vehicle Vitals repo.
Keep this file concise (20–50 lines). Only include repository-discoverable facts.
-->
# Vehicle Vitals — Copilot instructions

This repository contains two frontends (web and mobile) that share small utility/config code under `shared/` and use Firebase for auth and Firestore storage. Use the notes below to make focused, repo-aware code changes.

- High-level architecture
  - Web: React + react-router. Entry points: `App.jsx` (web root uses `web/src/pages/*`). Example: `web/src/pages/Home.jsx` reads Firestore using `db` from `shared/firebaseConfig.js`.
  - Mobile: React Native + React Navigation. Entry: `mobile/App.js` with stack screens in `mobile/screens/*.js` (`Home`, `AddVehicle`, `EditVehicle`, `ScanVIN`).
  - Shared: `shared/firebaseConfig.js`, `shared/azureConfig.js`, and `shared/types.js` contain cross-cutting config and simple helpers used by both apps.

- Important conventions & patterns
  - Firebase-first: auth state is read from `auth.currentUser` (see `web/src/pages/Home.jsx` and `web/src/utils/vehicleService.js`). When adding or reading user data, use the path `users/${userId}/vehicles` in Firestore.
  - VIN lookup: VIN decoding is done against the NHTSA VPIC API inside `web/src/utils/vehicleService.js`. The function `fetchVehicleByVINAndSave(vin)` both fetches the decoded VIN fields and persists a document keyed by VIN.
  - Minimal typed objects: `shared/types.js` exports `defaultVehicle` as the project’s vehicle shape — follow that shape when creating or updating vehicle objects.

- Build / run / debug notes (what worked or is expected)
  - Web: standard React dev server on port 3000. Look for `package.json` scripts (not present in this file set, infer typical commands: `npm start`, `npm run build`). Verify before editing by checking `package.json` locally.
  - Mobile: React Native app with screens wired in `mobile/App.js`. Use the normal RN tooling (`npx react-native run-ios` / `run-android`) if the project has RN scripts; otherwise inspect `mobile/package.json`.

- Integration & external dependencies
  - Firebase: init in `shared/firebaseConfig.js`. Replace the placeholder keys with real project creds in environment variables or platform-specific config. Firestore reads/writes use modular SDK (`doc`, `setDoc`, `collection`, `getDocs`).
  - Azure: `shared/azureConfig.js` contains an MSAL instance and example helper functions that call backend endpoints (`/api/data`, `/api/notify`). Treat these as placeholders — update only if there is an actual backend.
  - Third-party API: NHTSA VPIC endpoint used for VIN decoding.

- When editing code, follow these concrete rules
  - Preserve the Firestore document path convention `users/${userId}/vehicles/${vin}`.
  - Prefer using `shared/types.js` `defaultVehicle` shape when creating vehicle objects.
  - For new backend calls referencing `/api/*`, check `shared/azureConfig.js` first to see if the helper exists.
  - Avoid changing auth assumptions: many components reference `auth.currentUser?.uid`; introduce alternate auth flows only if you update all places that read `auth`.

- Helpful file references (examples to open first)
  - `web/src/pages/Home.jsx` — Firestore list + router links
  - `web/src/utils/vehicleService.js` — VIN lookup + setDoc example
  - `mobile/App.js` and `mobile/screens/*` — navigation and screen patterns
  - `shared/firebaseConfig.js`, `shared/azureConfig.js`, `shared/types.js` — shared config and shapes

If anything here is unclear or you need additional project rules (linting, exact npm scripts, CI), tell me which area and I will inspect package.json, CI configs, and any existing `.github` docs to update or expand this file.
