'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import axios from 'axios';

export default function SignupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [referralCode, setReferralCode] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const API_BASE_URL = 'https://api.bankblockchain.net/api';

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) setReferralCode(ref);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
        username,
        email,
        password,
        referralCode: referralCode || null,
      });

      console.log('✅ Signup success:', response.data);
      router.push('/success');
    } catch (err: any) {
      console.error('❌ Signup error:', err.response?.data);
      const msg =
        err.response?.data?.errors?.[0]?.msg ||
        err.response?.data?.message ||
        'Something went wrong.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-6"
        >
        <Image
            src="/logo.jpg"
            alt="Bank Blockchain Logo"
            width={120}
            height={120}
        />
        </motion.div>
    <div className="w-full max-w-md bg-[#1a1a1a] p-6 rounded-2xl shadow-lg border border-gray-700">
      <h1 className="text-2xl font-bold mb-6 text-center text-yellow-400">Create an Account</h1>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
          type="text"
          placeholder="Referral Code (optional)"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-500 transition"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  </div>
)};