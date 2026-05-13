import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun, Sparkles, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";
import { NavLink } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useRole, logout, getRoleLabel, Role } from "@/lib/auth";

const ROLE_TONES: Record<Role, string> = {
  root: "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/30",
  admin: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30",
  visitor: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
};

export default function SiteHeader() {
  const { theme, toggle } = useTheme();
  const { t, lang } = useI18n();
  const role = useRole();
  const navigate = useNavigate();

  const allLinks = [
    { to: "/", label: t("nav.home"), roles: null as Role[] | null },
    { to: "/events", label: t("nav.events"), roles: null },
    { to: "/platform", label: t("nav.platform"), roles: ["root"] as Role[] },
    { to: "/visitor", label: t("nav.visitor"), roles: ["visitor", "admin", "root"] as Role[] },
    { to: "/exhibitor", label: t("nav.exhibitor"), roles: ["admin", "root"] as Role[] },
    { to: "/admin", label: t("nav.admin"), roles: ["admin", "root"] as Role[] },
  ];

  const links = allLinks.filter((l) => !l.roles || (role && l.roles.includes(role)));

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 glass border-b">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
            <Sparkles className="h-4 w-4" />
          </div>
          <span>EventIQ</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"}
              className={({isActive}) => `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          {role && (
            <Badge variant="outline" className={`hidden sm:inline-flex mr-1 capitalize ${ROLE_TONES[role]}`}>
              {getRoleLabel(role, lang === "th" ? "th" : "en")}
            </Badge>
          )}
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          {role ? (
            <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout" title={lang === "th" ? "ออกจากระบบ" : "Logout"}>
              <LogOut className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")} className="gap-1.5">
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">{lang === "th" ? "เข้าสู่ระบบ" : "Login"}</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
