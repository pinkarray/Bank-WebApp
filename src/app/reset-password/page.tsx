'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, /* useRouter */ } from 'next/navigation';
import axios from 'axios';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'; // ← if using Heroicons

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  // const router = useRouter();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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
      setStatus('✅ Password reset successful! You can now log in with your new password.');
    } catch {
      setStatus('❌ Failed to reset password.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold text-yellow-400 mb-4">Reset Your Password</h1>
      <form onSubmit={handleReset} className="space-y-4 w-full max-w-md">
        {/* New Password Field */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="New password"
            className="w-full p-3 pr-12 bg-gray-800 border border-gray-600 text-white rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-white"
          >
            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>

        {/* Confirm Password Field */}
        <div className="relative">
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Confirm password"
            className="w-full p-3 pr-12 bg-gray-800 border border-gray-600 text-white rounded"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-3 text-white"
          >
            {showConfirm ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>

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
