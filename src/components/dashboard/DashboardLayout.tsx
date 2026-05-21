import { ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
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
  headerActions?: ReactNode;
  children: ReactNode;
};

function initials(name?: string | null, email?: string | null) {
  const src = name?.trim() || email?.trim() || "?";
  const parts = src.split(/[\s@.]+/).filter(Boolean);
  return (parts[0]?.[0] ?? "?").toUpperCase() + (parts[1]?.[0]?.toUpperCase() ?? "");
}

export function DashboardLayout({
  title,
  subtitle,
  roleBadge,
  roleBadgeClass,
  nav,
  activeId,
  onSelect,
  headerActions,
  children,
}: Props) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const activeLabel = nav.find((n) => n.id === activeId)?.label ?? title;

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b">
        <div className="container flex h-16 items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2.5 font-bold text-lg">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="tracking-tight">YOU WALK I FIND</span>
            <Badge variant="outline" className={`ml-2 hidden sm:inline-flex font-mono text-[10px] ${roleBadgeClass}`}>
              {roleBadge}
            </Badge>
          </Link>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-3 mr-1 px-3 py-1.5 rounded-lg bg-secondary/60">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs bg-gradient-primary text-primary-foreground font-semibold">
                  {initials(profile?.full_name, profile?.email)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-semibold">{profile?.full_name ?? profile?.email?.split("@")[0]}</span>
                <span className="text-[10px] text-muted-foreground font-mono">{profile?.email}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={async () => {
                await signOut();
                navigate("/", { replace: true });
              }}
              aria-label="Sign out"
              className="hover:bg-destructive/10 hover:text-destructive"
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
        {/* Page header with title + breadcrumb-ish indicator */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5 font-mono uppercase tracking-wider">
              <span>{title}</span>
              <span>/</span>
              <span className="text-foreground">{activeLabel}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{activeLabel}</h1>
            {subtitle && <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>}
          </div>
          {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-6">
          <Card className={`p-2 h-fit lg:sticky lg:top-20 bg-background/80 ${open ? "" : "hidden lg:block"}`}>
            <div className="px-2 py-2 text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
              Navigation
            </div>
            <Separator className="mb-2" />
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
                    className={`group flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium whitespace-nowrap transition-all text-left ${
                      active
                        ? "bg-gradient-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${active ? "" : "opacity-70 group-hover:opacity-100"}`} />
                    {n.label}
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
