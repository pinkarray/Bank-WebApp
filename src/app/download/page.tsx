'use client';
import Link from 'next/link';

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold text-yellow-400 mb-4">Welcome to Bank Blockchain</h1>
      <p className="text-gray-300 max-w-xl mb-6 text-lg">
        Your gateway to the future of digital banking. Download our app and start your mining journey now.
      </p>

      <Link
        href="https://expo.dev/accounts/devmide/projects/bank-block-chain/builds/4b22d1e5-1b97-463b-8107-a6f7314de637"
        className="bg-yellow-400 text-black font-bold py-3 px-6 rounded hover:bg-yellow-500 transition"
        download
      >
        Download APK
      </Link>
    </div>
  );
}
