'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#FAF7F2] text-[#171717] p-6">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-widest text-[#7A5D33] font-mono">Error</p>
        <h1 className="mt-2 text-2xl font-display font-light">An unexpected error occurred.</h1>
        <p className="mt-3 text-sm text-[#625F59]">
          Please try again or return to the home page.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button
            variant="primary"
            arrow="none"
            onClick={() => reset()}
          >
            Retry
          </Button>
          <Button
            variant="secondary"
            arrow="none"
            href="/"
          >
            Home
          </Button>
        </div>
      </div>
    </section>
  );
}

