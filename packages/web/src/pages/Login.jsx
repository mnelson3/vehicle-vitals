import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AdBanner from '../components/AdBanner';
import { useAuth } from '../shared/AuthContext';
// Header and footer provided by Layout

export default function Login() {
  const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('redirect') || '/app';

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await signIn(email, password);
      navigate(redirect, { replace: true });
    } catch (err) {
      const msg = String(err?.message || 'Failed to sign in');
      const hint = msg.includes('api-key-not-valid') ? ' (Check VITE_FIREBASE_* env vars; see web/.env.example)' : '';
      setError(msg + hint);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="container narrow">
        <AdBanner />
        <h1>Login</h1>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={onSubmit} className="card p-3">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input id="email" type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input id="password" type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? 'Signing in…' : 'Sign In'}</button>
            <button type="button" className="btn btn-outline-secondary" disabled={busy} onClick={async () => {
              setBusy(true);
              setError('');
              try {
                await signInWithGoogle();
                navigate(redirect, { replace: true });
              } catch (err) {
                setError(String(err?.message || 'Google sign-in failed'));
              } finally {
                setBusy(false);
              }
            }}>Continue with Google</button>
          </div>
        </form>
        <p className="mt-3">Don’t have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
}
