'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('https://download.bankblockchain.net/');
    }, 3000); // 3 seconds before redirect

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <Image
        src="/logo.jpg"
        alt="Bank Blockchain Logo"
        width={100}
        height={100}
        className="mb-6"
      />
      <h1 className="text-2xl font-bold text-yellow-400 mb-4">🎉 Thank You for Signing Up!</h1>
      <p className="text-gray-300 text-center">
        You’ll be redirected shortly to download the app.
      </p>
    </div>
  );
}
