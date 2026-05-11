export function MockBanner() {
  if (import.meta.env.VITE_USE_MOCK_BACKEND !== 'true') return null;
  return (
    <div className="w-full bg-amber-500/15 border-b border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs text-center py-1.5 px-3">
      ⚠️ MOCK MODE — Custom UI uses sample data. Botnoi widget connects to real platform.
    </div>
  );
}
