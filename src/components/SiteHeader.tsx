import { Link, NavLink } from "react-router-dom";
import { Moon, Sun, Sparkles, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";

export default function SiteHeader() {
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useI18n();

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/visitor", label: t("nav.visitor") },
    { to: "/exhibitor", label: t("nav.exhibitor") },
    { to: "/speaker", label: t("nav.speaker") },
    { to: "/admin", label: t("nav.admin") },
  ];

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
          <Button variant="ghost" size="sm" onClick={() => setLang(lang === "th" ? "en" : "th")} className="gap-1.5">
            <Languages className="h-4 w-4" />
            <span className="font-mono text-xs uppercase">{lang}</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
