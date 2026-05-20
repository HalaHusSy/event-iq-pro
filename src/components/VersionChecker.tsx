import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";

declare const __BUILD_TIME__: number;

const STORAGE_KEY = "eventiq-build-time";
const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

/**
 * Detects when a new build is deployed and prompts the user to reload.
 *
 * How it works:
 * 1. Vite injects `__BUILD_TIME__` at build time (each build = new timestamp)
 * 2. On mount, fetch the latest `index.html` with no-cache headers
 * 3. Extract the bundled JS filename (which contains content hash)
 * 4. Compare hash with current bundle's hash — if different = new version deployed
 * 5. Show a toast with a "Reload" button so user can update on their own pace
 *
 * Also unregisters any stale Service Workers from old deploys.
 */
export function VersionChecker() {
  const currentBundleHash = useRef<string | null>(null);
  const alreadyNotified = useRef(false);

  useEffect(() => {
    // 1) Unregister any stale Service Workers (from old PWA builds, etc.)
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        for (const r of regs) {
          r.unregister().catch(() => {
            /* ignore */
          });
        }
      });
    }

    // 2) Capture current bundle hash from <script type="module" src="...">
    const currentScript = document.querySelector<HTMLScriptElement>(
      'script[type="module"][src*="/assets/"]',
    );
    if (currentScript) {
      const match = currentScript.src.match(/\/assets\/([^"']+\.js)/);
      if (match) currentBundleHash.current = match[1];
    }

    // Persist current build time for debugging
    localStorage.setItem(STORAGE_KEY, String(__BUILD_TIME__));

    // 3) Check for new version periodically
    const check = async () => {
      if (alreadyNotified.current) return;
      try {
        const res = await fetch(`/?_v=${Date.now()}`, {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });
        if (!res.ok) return;
        const html = await res.text();
        // Extract the bundled JS filename from the fresh index.html
        const match = html.match(/\/assets\/([^"']+\.js)/);
        if (!match) return;
        const remoteHash = match[1];
        if (currentBundleHash.current && remoteHash !== currentBundleHash.current) {
          alreadyNotified.current = true;
          toast("เว็บมีอัปเดตใหม่ — กดเพื่อรีเฟรช", {
            duration: Infinity,
            action: {
              label: "รีเฟรชเลย",
              onClick: () => window.location.reload(),
            },
            icon: <RefreshCw className="h-4 w-4" />,
          });
        }
      } catch {
        /* network blip — try again next interval */
      }
    };

    // Check immediately + every 5 min
    const t = setTimeout(check, 10_000); // wait 10s after mount
    const interval = setInterval(check, CHECK_INTERVAL);

    // Also check when tab becomes visible again (user returned after lunch)
    const onVisible = () => {
      if (document.visibilityState === "visible") check();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearTimeout(t);
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return null;
}
