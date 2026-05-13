import { useEffect, useState } from 'react';

export type Role = 'root' | 'admin' | 'visitor';

const STORAGE_KEY = 'eventiq_role';

const ROLE_LABELS: Record<Role, { th: string; en: string }> = {
  root: { th: 'Root Account', en: 'Root Account' },
  admin: { th: 'Event Admin', en: 'Event Admin' },
  visitor: { th: 'ผู้เข้าชม', en: 'Visitor' },
};

const ROLE_EMAILS: Record<Role, string> = {
  root: 'root@eventiq.app',
  admin: 'admin@techsummit2026.eventiq.app',
  visitor: 'guest@eventiq.app',
};

export function getRole(): Role | null {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  if (value === 'root' || value === 'admin' || value === 'visitor') return value;
  return null;
}

export function setRole(role: Role): void {
  window.localStorage.setItem(STORAGE_KEY, role);
  window.dispatchEvent(new CustomEvent('eventiq:role-changed', { detail: role }));
}

export function logout(): void {
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('eventiq:role-changed', { detail: null }));
}

export function getRoleLabel(role: Role, lang: 'th' | 'en' = 'th'): string {
  return ROLE_LABELS[role][lang];
}

export function getRoleEmail(role: Role): string {
  return ROLE_EMAILS[role];
}

export function getDefaultRouteForRole(role: Role): string {
  switch (role) {
    case 'root':
      return '/platform';
    case 'admin':
      return '/admin';
    case 'visitor':
      return '/visitor';
  }
}

export function canAccess(role: Role | null, allowed: Role[]): boolean {
  if (!role) return false;
  return allowed.includes(role);
}

export function useRole(): Role | null {
  const [role, setRoleState] = useState<Role | null>(getRole);

  useEffect(() => {
    const handleChange = (event: Event) => {
      const detail = (event as CustomEvent<Role | null>).detail;
      setRoleState(detail ?? null);
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setRoleState(getRole());
    };
    window.addEventListener('eventiq:role-changed', handleChange);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('eventiq:role-changed', handleChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return role;
}
