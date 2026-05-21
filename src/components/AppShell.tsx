import { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import { MockBanner } from "./MockBanner";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <MockBanner />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 YOU WALK I FIND. All rights reserved.</span>
          <span className="font-mono">Powered by Botnoi AI</span>
        </div>
      </footer>
    </div>
  );
}
