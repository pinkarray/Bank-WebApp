'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function EmailVerifiedPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
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
          ✅ Email Verified!
        </h1>
        <p className="text-gray-300 mb-4">
          Your email has been successfully verified. You can now log in and start mining!
        </p>
        <a
          href="/success"
          className="bg-yellow-400 text-black px-5 py-3 rounded font-bold hover:bg-yellow-500 transition"
        >
          Continue
        </a>
      </motion.div>
    </div>
  );
}
