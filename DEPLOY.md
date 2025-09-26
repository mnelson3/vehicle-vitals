# Deploying the web app to Firebase Hosting

This repository includes a GitHub Action (`.github/workflows/firebase-deploy.yml`) that builds the `web` app and deploys `web/dist` to Firebase Hosting. To enable automatic deployments you'll need to add two repository secrets.

1) Create a CI token

- Install Firebase CLI locally (if not already installed):

```bash
npm install -g firebase-tools
```

- Login and create a CI token:

```bash
firebase login:ci
# copy the printed token
```

2) Add GitHub secrets

- In your repository settings -> Secrets -> Actions, add:
  - `FIREBASE_TOKEN` = the token from `firebase login:ci`
  - `FIREBASE_PROJECT` = your Firebase project id (e.g. `vehicle-vitals-prod`)

3) Trigger a deploy

- Pushing to the `main` branch will automatically run the workflow and deploy the `web/dist` to the specified hosting site.

Notes
- The workflow installs dependencies and runs `npm run build` in the `web` folder. Ensure `web/build` succeeds locally first.
- For staging/test deploys: create a separate Firebase project and set `FIREBASE_PROJECT` accordingly.
