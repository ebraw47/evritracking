'use client';

export default function Error({
  reset,
}: {
  error?: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h2 className="font-display text-2xl font-bold text-ink mb-4">Something went wrong!</h2>
      <p className="mb-6 text-center text-ink-mute">
        We apologize for the inconvenience. Please try again.
      </p>
      <button
        onClick={reset}
        className="rounded-xl bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark focus-ring"
      >
        Try again
      </button>
    </div>
  );
}
