'use client';
import { useState } from 'react';
import axios from 'axios';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Sending reset link...');
    try {
      await axios.post('https://api.bankblockchain.net/api/auth/forgot-password', { email });
      setMessage('Reset link sent! Check your inbox.');
    } catch {
      setMessage('Failed to send reset email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold text-yellow-400 mb-4">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 bg-gray-800 border border-gray-600 text-white rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-500 transition"
        >
          Send Reset Link
        </button>
        {message && <p className="text-center mt-4 text-sm">{message}</p>}
      </form>
    </div>
  );
}
