'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl"
      >
        <Image
          src="/logo.jpg"
          alt="Bank Blockchain Logo"
          width={120}
          height={120}
          className="mx-auto mb-6"
        />

        <h1 className="text-3xl font-bold text-yellow-400 mb-4">
          Welcome to Bank Blockchain
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          Mine coins. Earn rewards. Build wealth in a decentralized future.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link
            href="/signup"
            className="bg-yellow-400 text-black font-bold py-3 px-6 rounded hover:bg-yellow-500 transition"
          >
            Get Started
          </Link>
          <a
            href="/download"
            className="bg-transparent border border-yellow-400 text-yellow-400 font-bold py-3 px-6 rounded hover:bg-yellow-500 hover:text-black transition"
          >
            Download App
          </a>
        </div>
      </motion.div>
    </div>
  );
}
