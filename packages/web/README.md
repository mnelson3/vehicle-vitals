# @vehicle-vitals/web

React web application for Vehicle Vitals.

## Features

- ⚛️ React 18 with modern hooks
- 🚀 Vite for fast development and building
- 🔥 Firebase Authentication and Firestore
- 🧭 React Router for navigation
- 🎨 Modern CSS with responsive design
- 📱 Progressive Web App capabilities

## Development

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
npm run test    # Run tests
```

## Environment Setup

Copy `.env.example` to `.env.local` and configure:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
# ... other Firebase config
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Route components
├── shared/        # Web-specific utilities
├── hooks/         # Custom React hooks
└── styles.css     # Global styles
```