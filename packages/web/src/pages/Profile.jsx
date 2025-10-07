import React, { useState } from 'react';
import AdBanner from '../components/AdBanner';
import { useAuth } from '../shared/AuthContext';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, deleteUser } from 'firebase/auth';

export default function Profile() {
  const { user, signOut } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (!user) return null;

  const reauth = async () => {
    const cred = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, cred);
  };

  const onChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('');
    if (!newPassword || newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setBusy(true);
    try {
      await reauth();
      await updatePassword(user, newPassword);
      setStatus('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err?.message || 'Failed to update password');
    } finally {
      setBusy(false);
    }
  };

  const onDeleteAccount = async () => {
    const sure = window.confirm('This will permanently delete your account and all your vehicles. Continue?');
    if (!sure) return;
    setError('');
    setStatus('');
    setBusy(true);
    try {
      await reauth();
      await deleteUser(user);
      setStatus('Account deleted.');
      // Optionally sign out cleanup
      await signOut();
    } catch (err) {
      setError(err?.message || 'Failed to delete account');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container narrow">
      <AdBanner />
      <h1>Profile</h1>
      <p className="muted">Signed in as <strong>{user.email}</strong></p>
      {status && <div className="alert alert-success" role="alert">{status}</div>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <div className="card p-3 mb-3">
        <h5 className="mb-3">Change password</h5>
        <form onSubmit={onChangePassword}>
          <div className="mb-3">
            <label htmlFor="currentPassword" className="form-label">Current password</label>
            <input id="currentPassword" type="password" className="form-control" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New password</label>
            <input id="newPassword" type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm new password</label>
            <input id="confirmPassword" type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? 'Updating…' : 'Update password'}</button>
        </form>
      </div>

      <div className="card p-3">
        <h5 className="mb-2">Danger zone</h5>
        <p className="text-danger mb-3">Deleting your account removes all your vehicles and maintenance logs. This cannot be undone.</p>
        <div className="mb-3">
          <label htmlFor="currentPasswordDelete" className="form-label">Confirm current password</label>
          <input id="currentPasswordDelete" type="password" className="form-control" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <button className="btn btn-danger" onClick={onDeleteAccount} disabled={busy}>Delete account</button>
      </div>
    </div>
  );
}
