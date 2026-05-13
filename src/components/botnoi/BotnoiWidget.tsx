import { useEffect } from 'react';

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
  /** When false, the widget DOM is hidden via display:none.
   *  Useful when staying on admin/platform routes where we don't want the
   *  visitor-facing chat to pop up. */
  enabled?: boolean;
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
  enabled = true,
}: BotnoiWidgetProps = {}) {
  useEffect(() => {
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
      js.onload = () => {
        try {
          window.BN?.init({ version: '1.0' });
        } catch (err) {
          console.warn('[Botnoi] init failed', err);
        }
      };
      document.body.appendChild(js);
    } else if (window.BN) {
      // re-init if SDK already loaded (e.g. SPA navigation)
      try {
        window.BN.init({ version: '1.0' });
      } catch {}
    }
  }, [botId, botName, themeColor, locale, greetingMessage, loggedInGreeting, defaultOpen, botLogo]);

  // Show / hide based on `enabled` without unmounting the widget DOM
  // (Botnoi's iframe loads once and we don't want to re-init on every nav).
  useEffect(() => {
    const apply = () => {
      const display = enabled ? '' : 'none';
      const root = document.getElementById('bn-root');
      const chat = document.querySelector<HTMLDivElement>('.bn-customerchat');
      if (root) root.style.display = display;
      if (chat) chat.style.display = display;
    };
    apply();
    // Botnoi may inject extra DOM after script loads; re-apply on next tick.
    const t = window.setTimeout(apply, 500);
    return () => window.clearTimeout(t);
  }, [enabled]);

  // The widget renders itself into #bn-root / .bn-customerchat outside React tree
  return null;
}
