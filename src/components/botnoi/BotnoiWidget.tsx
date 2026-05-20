import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    BN?: { init: (config: { version: string }) => void };
  }
}

interface BotnoiWidgetProps {
  botId?: string;
  botName?: string;
  themeColor?: string;
  locale?: 'th' | 'en';
  greetingMessage?: string;
  loggedInGreeting?: string;
  defaultOpen?: boolean;
  botLogo?: string;
}

// Paths where the widget is NOT relevant — avoid loading the heavy SDK there
// (Botnoi server occasionally returns 504 which hangs the page for ~30s)
const EXCLUDED_PATHS = [
  '/login',
  '/signup',
  '/platform',
  '/admin',
  '/root',
  '/dashboard',
  '/organizer',
];

function hideWidget() {
  const root = document.getElementById('bn-root');
  const chat = document.querySelector<HTMLElement>('.bn-customerchat');
  if (root) root.style.display = 'none';
  if (chat) chat.style.display = 'none';
}
function showWidget() {
  const root = document.getElementById('bn-root');
  const chat = document.querySelector<HTMLElement>('.bn-customerchat');
  if (root) root.style.display = '';
  if (chat) chat.style.display = '';
}

/**
 * Botnoi Customer Chat widget – follows the official snippet:
 *   <div id="bn-root"></div>
 *   <div class="bn-customerchat" bot_id="..."></div>
 *   <script src="https://console.botnoi.ai/customerchat/index.js"></script>
 *   BN.init({ version: '1.0' })
 *
 * Use bot_id ที่สร้างจาก Botnoi Console (https://console.botnoi.ai)
 * แล้วเชื่อม Knowledge Base / Intent ใน Botnoi เพื่อให้ตอบ FAQ
 * และ matching pain → exhibitor ได้
 */
export function BotnoiWidget({
  botId = import.meta.env.VITE_BOTNOI_BOT_ID || '6a013f62fb3079f00791473e',
  botName = 'EventIQ Assistant',
  themeColor = '#4F46E5',
  locale = 'th',
  greetingMessage = 'สวัสดีค่ะ! ฉันคือ EventIQ ช่วยหา booth ที่ใช่ให้คุณ ลองพิมพ์ pain point หรือถาม FAQ ได้เลย',
  loggedInGreeting = 'ยินดีต้อนรับกลับมาค่ะ',
  defaultOpen = false,
  botLogo,
}: BotnoiWidgetProps = {}) {
  const location = useLocation();
  const isExcluded = EXCLUDED_PATHS.some((p) => location.pathname.startsWith(p));

  useEffect(() => {
    // Hide widget on excluded routes (login, dashboards) so the Botnoi SDK
    // doesn't try to load there. Don't unmount — keeps SDK warm for fast
    // re-show on visitor pages.
    if (isExcluded) {
      hideWidget();
      return;
    }
    showWidget();

    // 1) ensure #bn-root exists
    if (!document.getElementById('bn-root')) {
      const root = document.createElement('div');
      root.id = 'bn-root';
      document.body.appendChild(root);
    }

    // 2) ensure .bn-customerchat container exists with required attributes
    let chat = document.querySelector<HTMLDivElement>('.bn-customerchat');
    if (!chat) {
      chat = document.createElement('div');
      chat.className = 'bn-customerchat';
      document.body.appendChild(chat);
    }
    chat.setAttribute('bot_id', botId);
    chat.setAttribute('bot_name', botName);
    chat.setAttribute('theme_color', themeColor);
    chat.setAttribute('locale', locale);
    chat.setAttribute('greeting_message', greetingMessage);
    chat.setAttribute('logged_in_greeting', loggedInGreeting);
    chat.setAttribute('default_open', String(defaultOpen));
    if (botLogo) chat.setAttribute('bot_logo', botLogo);

    // 3) inject SDK once
    if (!document.getElementById('bn-jssdk')) {
      const js = document.createElement('script');
      js.id = 'bn-jssdk';
      js.src = 'https://console.botnoi.ai/customerchat/index.js';
      js.async = true;
      js.onerror = () => console.warn('[Botnoi] SDK failed to load — widget disabled');
      js.onload = () => {
        try {
          window.BN?.init({ version: '1.0' });
        } catch (err) {
          console.warn('[Botnoi] init failed', err);
        }
      };
      document.body.appendChild(js);
    } else if (window.BN) {
      try {
        window.BN.init({ version: '1.0' });
      } catch {
        /* ignore re-init errors */
      }
    }
  }, [isExcluded, botId, botName, themeColor, locale, greetingMessage, loggedInGreeting, defaultOpen, botLogo]);

  // The widget renders itself into #bn-root / .bn-customerchat outside React tree
  return null;
}
