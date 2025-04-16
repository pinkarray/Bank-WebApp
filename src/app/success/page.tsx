'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Image
          src="/logo.jpg"
          alt="Bank Blockchain Logo"
          width={100}
          height={100}
          className="mb-6"
        />
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">
          🎉 Thank You for Signing Up!
        </h1>
        <p className="text-gray-300 text-center">
          You’ll be redirected shortly to download the app.
        </p>
        <div className="mt-6 animate-spin border-4 border-yellow-400 border-t-transparent rounded-full w-8 h-8"></div>
        <a
          href="https://download.bankblockchain.net/"
          className="mt-6 bg-yellow-400 text-black px-4 py-2 rounded font-bold hover:bg-yellow-500 transition"
        >
          Click here if you’re not redirected
        </a>
      </motion.div>
    </div>
  );
}
export const dynamic = 'force-dynamic';