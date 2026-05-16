import { ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogOut, Menu, Sparkles, X } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthProvider";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

type Props = {
  title: string;
  subtitle?: string;
  roleBadge: string;
  roleBadgeClass: string;
  nav: NavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  children: ReactNode;
};

export function DashboardLayout({
  title,
  subtitle,
  roleBadge,
  roleBadgeClass,
  nav,
  activeId,
  onSelect,
  children,
}: Props) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 glass border-b">
        <div className="container flex h-16 items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
              <Sparkles className="h-4 w-4" />
            </div>
            <span>EventIQ</span>
            <Badge variant="outline" className={`ml-2 hidden sm:inline-flex ${roleBadgeClass}`}>
              {roleBadge}
            </Badge>
          </Link>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex flex-col items-end leading-tight mr-2">
              <span className="text-sm font-medium">{profile?.full_name ?? profile?.email}</span>
              <span className="text-xs text-muted-foreground">{profile?.email}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={async () => {
                await signOut();
                navigate("/", { replace: true });
              }}
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
            <Button
              className="md:hidden"
              variant="ghost"
              size="icon"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-6 flex-1">
        <div className="mb-5">
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          <Card className={`p-2 glass h-fit lg:sticky lg:top-20 ${open ? "" : "hidden lg:block"}`}>
            <nav className="flex lg:flex-col gap-1 overflow-x-auto">
              {nav.map((n) => {
                const Icon = n.icon;
                const active = activeId === n.id;
                return (
                  <button
                    key={n.id}
                    onClick={() => {
                      onSelect(n.id);
                      setOpen(false);
                    }}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium whitespace-nowrap transition-all text-left ${
                      active
                        ? "bg-gradient-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon className="h-4 w-4" /> {n.label}
                  </button>
                );
              })}
            </nav>
          </Card>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
