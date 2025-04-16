'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import SignupForm from '../signup/SignupForm'; 

function SignupPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ref = searchParams.get('ref');

  return <SignupForm referralCode={ref} router={router} />;
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="text-white text-center">Loading signup...</div>}>
      <SignupPageInner />
    </Suspense>
  );
}

export const dynamic = 'force-dynamic';
