'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return setStatus('Invalid token.');
    if (password !== confirm) return setStatus('Passwords do not match.');

    try {
      await axios.post('https://api.bankblockchain.net/api/auth/reset-password', {
        token,
        newPassword: password,
      });
      setStatus('✅ Password reset successful! Redirecting...');
      setTimeout(() => router.push('/login'), 2500);
    } catch {
      setStatus('❌ Failed to reset password.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold text-yellow-400 mb-4">Reset Your Password</h1>
      <form onSubmit={handleReset} className="space-y-4 w-full max-w-md">
        <input
          type="password"
          placeholder="New password"
          className="w-full p-3 bg-gray-800 border border-gray-600 text-white rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="w-full p-3 bg-gray-800 border border-gray-600 text-white rounded"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-500 transition"
        >
          Reset Password
        </button>
        {status && <p className="text-center mt-4 text-sm">{status}</p>}
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-white text-center">Loading form...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}

export const dynamic = 'force-dynamic';