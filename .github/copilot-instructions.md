<!--
Concise guidance for automated coding agents working on Vehicle Vitals.
Only include repository-discoverable facts and file pointers; keep edits minimal and follow existing patterns.
-->

# Vehicle Vitals — Copilot instructions

Two frontends (web + mobile) share Firebase-backed utilities in `shared/`. Stick to the established data paths and auth checks.

- Architecture (big picture)
  - Web: React + Vite + react-router. Entry: `web/src/main.jsx` → `web/src/App.jsx`. Pages in `web/src/pages/*` (Home, AddVehicle, EditVehicle).
  - Mobile: React Native + React Navigation. Entry: `mobile/App.js`. Screens in `mobile/screens/*.js` (Home, AddVehicle, EditVehicle, ScanVIN, Maintenance*).
  - Shared: `shared/*` holds Firebase config, a Firestore service factory, and types reused by both apps.

- Data model and Firestore paths
  - Vehicles keyed by VIN under: `users/${userId}/vehicles/${vin}`.
  - Vehicle fields follow `shared/types.js` `defaultVehicle` (make, model, year, vin, mileage, services).
  - Maintenance entries live in a subcollection: `users/${userId}/vehicles/${vin}/maintenance/*` with `createdAt/updatedAt` via `serverTimestamp()`.
  - Auth pattern: read helpers return `[]` or `null` when unauthenticated; write helpers throw (`Not authenticated`). See `shared/firestoreServiceFactory.js`.

- Firebase initialization patterns (platform-specific)
  - Web utilities sometimes import `auth/db` directly from `web/src/shared/firebaseConfig.js` (e.g., `web/src/utils/vehicleService.js`).
  - Web pages import service methods from `web/src/shared/firestoreService.js` which builds a service via `shared/firestoreServiceFactory.js` and `shared/firebaseConfig.js`.
  - Mobile uses `shared/firestoreClient.js` to initialize and expose `auth`, `db`, and a factory-built `firestoreService`.
  - Keep these boundaries: don’t import web-only modules into mobile; `shared/firebaseConfig.js` guards `import.meta.env` vs `process.env`.

- Key workflows (concrete commands)
  - Web: `web/package.json` scripts — `npm run dev`, `npm run build`, `npm run preview`, `npm run test` (Vitest). From repo root: use `--prefix web` if needed.
  - Mobile: `mobile/package.json` scripts — `npm run start`, `npm run ios`, `npm run android` (requires RN toolchain). `ScanVIN` uses `expo-barcode-scanner`.
  - Tests: `web/tests/firestoreService.test.js` uses Vitest + `@firebase/rules-unit-testing`, mocking `shared/firebaseConfig` to point to a test db.

- Integration points
  - VIN decode: `web/src/utils/vehicleService.js` `fetchVehicleByVINAndSave(vin)` calls NHTSA VPIC and persists to `users/${uid}/vehicles/${vin}`.
  - Azure placeholders: `shared/azureConfig.js` provides MSAL config and example `/api/*` helpers; treat as non-functional until a backend exists.

- Editing rules (project-specific)
  - Preserve document paths and VIN-as-id convention for vehicles and maintenance.
  - Always use `defaultVehicle` when constructing new vehicles.
  - Gate all Firestore writes on `auth.currentUser?.uid`; follow the read-vs-write unauth behavior from the factory.
  - Avoid importing messaging/web-only Firebase into native bundles.

- Files to open first
  - `web/src/pages/Home.jsx` — shows `getVehicles`/`deleteVehicle` usage.
  - `web/src/pages/AddVehicle.jsx` — uses `defaultVehicle` + `addOrUpdateVehicle`.
  - `web/src/pages/EditVehicle.jsx` — updates vehicle + maintenance list via factory helpers.
  - `shared/firestoreServiceFactory.js`, `shared/firestoreClient.js`, `web/src/shared/firestoreService.js` — service wiring patterns.

If anything is unclear (e.g., which Firebase config to import in a new module), ask and I’ll inspect callers to clarify or consolidate.
