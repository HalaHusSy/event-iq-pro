import { useEffect } from 'react';

declare global {
  interface Window {
    BN?: { init: (config: { version: string }) => void };
  }
}

export function BotnoiWidget() {
  useEffect(() => {
    if (document.getElementById('bn-jssdk')) return;
    const script = document.createElement('script');
    script.id = 'bn-jssdk';
    script.src = 'https://console.botnoi.ai/customerchat/index.js';
    script.async = true;
    script.onload = () => {
      if (window.BN) window.BN.init({ version: '1.0' });
    };
    document.body.appendChild(script);
  }, []);

  const botId = import.meta.env.VITE_BOTNOI_BOT_ID || '6a013f62fb3079f00791473e';

  return (
    <div
      id="bn-customerchat"
      ref={(el) => {
        if (!el) return;
        el.setAttribute('bot_id', botId);
        el.setAttribute('bot_name', 'EventIQ Assistant');
        el.setAttribute('theme_color', '#4F46E5');
        el.setAttribute('locale', 'th');
        el.setAttribute('greeting_message', 'สวัสดีค่ะ! ฉันคือ EventIQ ผู้ช่วยหา booth ที่ใช่ให้คุณ');
        el.setAttribute('default_open', 'false');
      }}
    />
  );
}
