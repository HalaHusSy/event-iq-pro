import { useLocation } from 'react-router-dom';
import { BotnoiWidget } from './BotnoiWidget';

/**
 * Mount the Botnoi customer chat widget once at the app root, but hide it
 * on backstage routes (login, root/admin dashboards, api-test playground)
 * so the visitor-facing bot doesn't pop up while operators are working.
 *
 * Widget visibility rules:
 *   ✅ /, /events, /visitor, /widget, /exhibitor (visitor- or marketing-facing)
 *   ❌ /login, /platform, /platform/api-test, /admin, /speaker (backstage)
 */
const HIDDEN_PREFIXES = ['/login', '/platform', '/admin', '/speaker'];

export function BotnoiMount() {
  const { pathname } = useLocation();
  const enabled = !HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  return <BotnoiWidget enabled={enabled} />;
}
