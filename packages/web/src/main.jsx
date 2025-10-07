import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
// Dev-only: auto anonymous sign-in to enable local Firestore writes
import './shared/devAuth'
import { AuthProvider } from './shared/AuthContext'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)
