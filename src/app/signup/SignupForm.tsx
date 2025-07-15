'use client';
import { useState } from 'react';
import axios from 'axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface SignupFormProps {
  referralCode: string | null;
  router: ReturnType<typeof useRouter>; 
}

  export default function SignupForm({ referralCode, router }: SignupFormProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const API_BASE_URL = 'https://api.bankblockchain.net/api';

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

      console.log('Signup success:', response.data);
      router.push('/success');
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const msg =
            err.response?.data?.errors?.[0]?.msg ||
            err.response?.data?.message ||
            'Something went wrong.';
          setError(msg);
        } else {
          console.error('Unknown error:', err);
          setError('Something went wrong.');
        }
    }
};

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="mb-6">
        <Image src="/logo.jpg" alt="Bank Blockchain Logo" width={120} height={120} />
      </div>
      <div className="w-full max-w-md bg-[#1a1a1a] p-6 rounded-2xl shadow-lg border border-gray-700">
        <h1 className="text-2xl font-bold mb-6 text-center text-yellow-400">Create an Account</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className="relative">
            <input className="input pr-10" type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <span onClick={() => setShowPassword(!showPassword)} className="eye-toggle">{showPassword ? <FiEyeOff /> : <FiEye />}</span>
          </div>
          <div className="relative">
            <input className="input pr-10" type={showConfirm ? 'text' : 'password'} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <span onClick={() => setShowConfirm(!showConfirm)} className="eye-toggle">{showConfirm ? <FiEyeOff /> : <FiEye />}</span>
          </div>
          <input className="input" placeholder="Referral Code (optional)" value={referralCode || ''} disabled />
          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
