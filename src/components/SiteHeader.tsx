import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogIn, LogOut, Moon, Sparkles, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth/AuthProvider";
import LanguageSwitcher from "./LanguageSwitcher";

const ROLE_HOME: Record<string, string> = {
  root: "/root",
  admin: "/dashboard/admin",
  organizer: "/organizer",
  exhibitor: "/dashboard/exhibitor",
  visitor: "/visitor",
  speaker: "/speaker",
};

const ROLE_COLOR: Record<string, string> = {
  root: "bg-purple-500/15 text-purple-600 border-purple-500/30",
  admin: "bg-red-500/15 text-red-600 border-red-500/30",
  organizer: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  exhibitor: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
  visitor: "bg-slate-500/15 text-slate-600 border-slate-500/30",
  speaker: "bg-amber-500/15 text-amber-600 border-amber-500/30",
};

export default function SiteHeader() {
  const { theme, toggle } = useTheme();
  const { t } = useI18n();
  const { session, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const baseLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/events", label: t("nav.events") },
    { to: "/platform", label: t("nav.platform") },
    { to: "/visitor", label: t("nav.visitor") },
    { to: "/exhibitor", label: t("nav.exhibitor") },
  ];
  const adminLinks = profile?.role
    ? {
        root: [
          { to: "/root", label: "Root" },
          { to: "/dashboard/admin", label: "Admin" },
          { to: "/organizer", label: "Organizer" },
        ],
        admin: [
          { to: "/dashboard/admin", label: "Admin" },
          { to: "/organizer", label: "Organizer" },
        ],
        organizer: [{ to: "/organizer", label: "Organizer" }],
        exhibitor: [{ to: "/dashboard/exhibitor", label: "My Booth" }],
        visitor: [],
        speaker: [],
      }[profile.role] ?? []
    : [];
  const links = [...baseLinks, ...adminLinks];

  return (
    <header className="sticky top-0 z-40 glass border-b">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
            <Sparkles className="h-4 w-4" />
          </div>
          <span>EventIQ</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 overflow-x-auto">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          {session && profile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <Badge variant="outline" className={`text-xs ${ROLE_COLOR[profile.role] ?? ""}`}>
                    {profile.role}
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col">
                  <span className="font-medium">{profile.full_name ?? profile.email}</span>
                  <span className="text-xs text-muted-foreground font-normal">{profile.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(ROLE_HOME[profile.role] ?? "/")}>
                  ไปที่ Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    await signOut();
                    navigate("/", { replace: true });
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" /> ออกจากระบบ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">
                <LogIn className="h-4 w-4 mr-1" /> เข้าสู่ระบบ
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
