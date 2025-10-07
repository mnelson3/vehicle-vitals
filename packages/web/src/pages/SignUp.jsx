import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdBanner from '../components/AdBanner';
import { useAuth } from '../shared/AuthContext';

export default function SignUp() {
  const { signUp, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await signUp(email, password);
      navigate('/app', { replace: true });
    } catch (err) {
      const msg = String(err?.message || 'Failed to create account');
      const hint = msg.includes('api-key-not-valid') ? ' (Check VITE_FIREBASE_* env vars; see web/.env.example)' : '';
      setError(msg + hint);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container narrow">
      <AdBanner />
      <h1>Sign Up</h1>
      <p className="muted">Create your Vehicle Vitals account to start tracking maintenance and logs.</p>
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
          <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? 'Creating account…' : 'Create Account'}</button>
          <button type="button" className="btn btn-outline-secondary" disabled={busy} onClick={async () => {
            setBusy(true);
            setError('');
            try {
              await signInWithGoogle();
              navigate('/app', { replace: true });
            } catch (err) {
              setError(String(err?.message || 'Google sign-in failed'));
            } finally {
              setBusy(false);
            }
          }}>Continue with Google</button>
        </div>
      </form>
      <p className="mt-3">Already have an account? <Link to="/login">Sign in</Link></p>
    </div>
  );
}
