import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "th" | "en" | "zh" | "fr" | "vi" | "ja";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "th", label: "ไทย", flag: "🇹🇭" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
];

type Translations = Partial<Record<Lang, string>> & { th: string; en: string };
type Dict = Record<string, Translations>;

// Helper: fall back th->en if a language is missing
const tr = (th: string, en: string, extra?: Partial<Record<Lang, string>>): Translations =>
  ({ th, en, ...(extra || {}) });

export const dict: Dict = {
  // nav
  "nav.home": tr("หน้าแรก", "Home", { zh: "首页", fr: "Accueil", vi: "Trang chủ", ja: "ホーム" }),
  "nav.events": tr("งานทั้งหมด", "Events", { zh: "活动", fr: "Événements", vi: "Sự kiện", ja: "イベント" }),
  "nav.platform": tr("แพลตฟอร์ม", "Platform", { zh: "平台", fr: "Plateforme", vi: "Nền tảng", ja: "プラットフォーム" }),
  "nav.visitor": tr("ผู้เยี่ยมชม", "Visitor", { zh: "访客", fr: "Visiteur", vi: "Khách", ja: "来場者" }),
  "nav.exhibitor": tr("ผู้ออกบูธ", "Exhibitor", { zh: "参展商", fr: "Exposant", vi: "Nhà triển lãm", ja: "出展者" }),
  "nav.speaker": tr("ผู้บรรยาย", "Speaker", { zh: "演讲者", fr: "Intervenant", vi: "Diễn giả", ja: "スピーカー" }),
  "nav.admin": tr("ผู้ดูแล", "Admin", { zh: "管理", fr: "Admin", vi: "Quản trị", ja: "管理" }),
  "nav.signin": tr("เข้าสู่ระบบ", "Sign in", { zh: "登录", fr: "Connexion", vi: "Đăng nhập", ja: "ログイン" }),
  "nav.signout": tr("ออกจากระบบ", "Sign out", { zh: "退出登录", fr: "Déconnexion", vi: "Đăng xuất", ja: "ログアウト" }),
  "nav.dashboard": tr("ไปที่ Dashboard", "Go to dashboard", { zh: "前往仪表板", fr: "Aller au tableau de bord", vi: "Tới bảng điều khiển", ja: "ダッシュボードへ" }),
  "nav.menu": tr("เมนู", "Menu", { zh: "菜单", fr: "Menu", vi: "Menu", ja: "メニュー" }),

  // hero
  "hero.title": tr(
    "หาบูธที่ใช่ใน 15 วินาที ไม่ใช่ 3 ชั่วโมง",
    "Find the right booth in 15 seconds, not 3 hours",
    { zh: "15秒找到对的展位，而非3小时", fr: "Trouvez le bon stand en 15 secondes", vi: "Tìm gian hàng phù hợp trong 15 giây", ja: "適切なブースを15秒で発見" }
  ),
  "hero.sub": tr(
    "แพลตฟอร์ม AI สำหรับงานนิทรรศการสด ขับเคลื่อนโดย Botnoi AI",
    "AI platform for live exhibition events, powered by Botnoi AI.",
    { zh: "由 Botnoi AI 驱动的现场展会AI平台", fr: "Plateforme IA pour les salons, propulsée par Botnoi AI", vi: "Nền tảng AI cho triển lãm trực tiếp, bởi Botnoi AI", ja: "Botnoi AIによる展示会向けAIプラットフォーム" }
  ),
  "hero.cta.visitor": tr("เริ่มต้นเป็นผู้เยี่ยมชม", "Start as Visitor", { zh: "以访客身份开始", fr: "Commencer comme visiteur", vi: "Bắt đầu với tư cách khách", ja: "来場者として開始" }),
  "hero.cta.exhibitor": tr("ลงทะเบียนเป็นผู้ออกบูธ", "Register as Exhibitor", { zh: "注册为参展商", fr: "S'inscrire comme exposant", vi: "Đăng ký nhà triển lãm", ja: "出展者として登録" }),

  // features (kept th/en, falls back gracefully)
  "features.title": tr("ฟีเจอร์หลัก", "Core Features", { zh: "核心功能", fr: "Fonctionnalités", vi: "Tính năng chính", ja: "主な機能" }),
  "features.sub": tr(
    "ออกแบบมาเพื่อให้ผู้เยี่ยมชมเจอบูธที่ใช่ และผู้ออกบูธได้ลูกค้าตรงเป้า",
    "Designed to help visitors find the right booth and exhibitors reach the right customers.",
    {
      zh: "帮助访客找到合适的展位，让参展商触达精准客户。",
      fr: "Conçu pour aider les visiteurs à trouver le bon stand et les exposants à toucher les bons clients.",
      vi: "Giúp khách tham quan tìm gian hàng phù hợp và nhà triển lãm tiếp cận khách hàng mục tiêu.",
      ja: "来場者に最適なブースを、出展者に最適な顧客を結び付けます。",
    }
  ),
  "f1.title": tr("จับคู่บูธอัจฉริยะ", "Booth Matching", { zh: "智能展位匹配", fr: "Correspondance de stand", vi: "Ghép gian hàng thông minh", ja: "ブースマッチング" }),
  "f1.desc": tr(
    "เล่า pain ของคุณ AI หาบูธที่ตรงที่สุดให้ทันที",
    "Describe your pain, get the perfect booth match instantly.",
    {
      zh: "描述您的需求，AI 立即为您匹配最合适的展位。",
      fr: "Décrivez votre besoin, obtenez le stand idéal instantanément.",
      vi: "Mô tả nhu cầu của bạn, AI tìm ngay gian hàng phù hợp nhất.",
      ja: "あなたの課題を伝えれば、最適なブースが瞬時に見つかります。",
    }
  ),
  "f2.title": tr("ถามอะไรก็ได้เกี่ยวกับงาน", "Event FAQ", { zh: "活动问答", fr: "FAQ de l'événement", vi: "Hỏi đáp sự kiện", ja: "イベントFAQ" }),
  "f2.desc": tr(
    "ตารางเซสชั่น แผนที่ ร้านอาหาร ตอบครบจบในแชท",
    "Schedules, maps, food courts — answered in chat.",
    {
      zh: "议程、地图、餐饮 —— 聊天中一站式解答。",
      fr: "Programmes, plans, restauration — réponses dans le chat.",
      vi: "Lịch trình, bản đồ, ẩm thực — trả lời ngay trong chat.",
      ja: "スケジュール、マップ、フードコート — チャットで即回答。",
    }
  ),

  "how.title": tr("ใช้งานอย่างไร", "How it works", { zh: "如何使用", fr: "Comment ça marche", vi: "Cách hoạt động", ja: "使い方" }),
  "how.1": tr("เล่า pain หรือความสนใจของคุณ", "Describe your pain or interest", { zh: "描述您的需求或兴趣", fr: "Décrivez votre besoin ou intérêt", vi: "Mô tả nhu cầu hoặc sở thích của bạn", ja: "課題や興味を伝える" }),
  "how.2": tr("AI วิเคราะห์และจับคู่ทันที", "AI analyzes and matches instantly", { zh: "AI 立即分析并匹配", fr: "L'IA analyse et associe instantanément", vi: "AI phân tích và ghép ngay lập tức", ja: "AIが瞬時に分析・マッチング" }),
  "how.3": tr("เดินตรงไปยังบูธที่ใช่", "Walk directly to the right booth", { zh: "直接前往合适的展位", fr: "Allez directement au bon stand", vi: "Đi thẳng đến gian hàng phù hợp", ja: "適切なブースへ直行" }),

  "trust": tr("ขับเคลื่อนโดย Botnoi AI", "Powered by Botnoi AI", { zh: "由 Botnoi AI 驱动", fr: "Propulsé par Botnoi AI", vi: "Vận hành bởi Botnoi AI", ja: "Botnoi AI による提供" }),

  // visitor tabs
  "tab.find": tr("หาบูธ", "Find Booth", { zh: "找展位", fr: "Trouver un stand", vi: "Tìm gian hàng", ja: "ブースを探す" }),
  "tab.ask": tr("ถามเรื่องงาน", "Ask Event", { zh: "活动咨询", fr: "Questions événement", vi: "Hỏi về sự kiện", ja: "イベントに質問" }),

  // visitor event banner
  "visitor.currentEvent": tr("กำลังอยู่ในงาน", "Current event", { zh: "当前活动", fr: "Événement actuel", vi: "Sự kiện hiện tại", ja: "現在のイベント" }),

  // events page
  "events.title": tr("งานทั้งหมดในระบบ", "All Events", { zh: "所有活动", fr: "Tous les événements", vi: "Tất cả sự kiện", ja: "すべてのイベント" }),
  "events.sub": tr("เลือกงานที่คุณสนใจเพื่อเริ่มต้นใช้งาน", "Pick an event to get started", { zh: "选择您感兴趣的活动", fr: "Choisissez un événement", vi: "Chọn sự kiện để bắt đầu", ja: "イベントを選んで開始" }),
  "events.live": tr("กำลังจัด", "Live", { zh: "进行中", fr: "En direct", vi: "Đang diễn ra", ja: "開催中" }),
  "events.upcoming": tr("เร็วๆ นี้", "Upcoming", { zh: "即将", fr: "À venir", vi: "Sắp tới", ja: "近日開催" }),
  "events.past": tr("จบแล้ว", "Past", { zh: "已结束", fr: "Passé", vi: "Đã qua", ja: "終了" }),
  "events.enter": tr("เข้าสู่งาน", "Enter event", { zh: "进入", fr: "Entrer", vi: "Vào sự kiện", ja: "参加する" }),
  "events.exhibitors": tr("บูธ", "Exhibitors", { zh: "展位", fr: "Stands", vi: "Gian hàng", ja: "ブース" }),
  "events.sessions": tr("เซสชั่น", "Sessions", { zh: "议程", fr: "Sessions", vi: "Phiên", ja: "セッション" }),

  // platform page
  "platform.title": tr("แพลตฟอร์ม EventIQ", "EventIQ Platform", { zh: "EventIQ 平台", fr: "Plateforme EventIQ", vi: "Nền tảng EventIQ", ja: "EventIQ プラットフォーム" }),
  "platform.sub": tr("Root account · จัดการทุก event ในที่เดียว", "Root account · Manage every event in one place", { zh: "Root 账户 · 在一处管理所有活动", fr: "Compte Root · Gérez tous les événements", vi: "Tài khoản Root · Quản lý mọi sự kiện", ja: "Root アカウント · すべてのイベントを一元管理" }),
  "platform.tab.events": tr("จัดการ Event", "Events", { zh: "活动", fr: "Événements", vi: "Sự kiện", ja: "イベント" }),
  "platform.tab.admins": tr("Event Admin", "Event Admins", { zh: "活动管理员", fr: "Admins événement", vi: "Quản trị sự kiện", ja: "イベント管理者" }),
  "platform.tab.exhibitors": tr("Exhibitors", "Exhibitors", { zh: "参展商", fr: "Exposants", vi: "Nhà triển lãm", ja: "出展者" }),
  "platform.tab.bot": tr("Bot & LINE OA", "Bot & LINE OA"),
  "platform.create": tr("สร้าง Event ใหม่", "Create event", { zh: "创建活动", fr: "Créer un événement", vi: "Tạo sự kiện", ja: "イベント作成" }),
  "platform.edit": tr("แก้ไข", "Edit", { zh: "编辑", fr: "Modifier", vi: "Sửa", ja: "編集" }),
  "platform.delete": tr("ลบ", "Delete", { zh: "删除", fr: "Supprimer", vi: "Xóa", ja: "削除" }),
  "platform.confirmDelete": tr("ยืนยันลบ event นี้?", "Delete this event?", { zh: "确认删除该活动？", fr: "Supprimer cet événement ?", vi: "Xóa sự kiện này?", ja: "このイベントを削除しますか？" }),
  "platform.deleteWarning": tr("การลบจะทำให้ exhibitor และข้อมูลทั้งหมดของ event นี้หายไป", "Deleting will remove all exhibitors and data of this event.", { zh: "删除将清除该活动的所有参展商和数据。", fr: "La suppression effacera tous les exposants et données de cet événement.", vi: "Xóa sẽ loại bỏ toàn bộ nhà triển lãm và dữ liệu của sự kiện.", ja: "削除するとこのイベントの出展者とデータがすべて消えます。" }),
  "platform.cancel": tr("ยกเลิก", "Cancel", { zh: "取消", fr: "Annuler", vi: "Hủy", ja: "キャンセル" }),
  "platform.save": tr("บันทึก", "Save", { zh: "保存", fr: "Enregistrer", vi: "Lưu", ja: "保存" }),
  "platform.assignAdmin": tr("กำหนด Admin", "Assign admin", { zh: "指派管理员", fr: "Assigner un admin", vi: "Phân quyền admin", ja: "管理者を割り当てる" }),
  "platform.addExhibitor": tr("เพิ่ม Exhibitor", "Add exhibitor", { zh: "添加参展商", fr: "Ajouter un exposant", vi: "Thêm nhà triển lãm", ja: "出展者を追加" }),
  "platform.connectBot": tr("เชื่อมต่อ Bot", "Connect bot", { zh: "连接 Bot", fr: "Connecter le bot", vi: "Kết nối Bot", ja: "Botを接続" }),
  "platform.linkLine": tr("Link LINE OA", "Link LINE OA"),
  "platform.connected": tr("เชื่อมต่อแล้ว", "Connected", { zh: "已连接", fr: "Connecté", vi: "Đã kết nối", ja: "接続済み" }),
  "platform.notConnected": tr("ยังไม่เชื่อมต่อ", "Not connected", { zh: "未连接", fr: "Non connecté", vi: "Chưa kết nối", ja: "未接続" }),
  "platform.stats.events": tr("Event ทั้งหมด", "Total events", { zh: "活动总数", fr: "Événements", vi: "Tổng sự kiện", ja: "イベント合計" }),
  "platform.stats.live": tr("กำลังจัด", "Live now", { zh: "进行中", fr: "En direct", vi: "Đang diễn ra", ja: "開催中" }),
  "platform.stats.exhibitors": tr("Exhibitors ทั้งหมด", "Total exhibitors", { zh: "参展商总数", fr: "Exposants", vi: "Tổng nhà triển lãm", ja: "出展者合計" }),
  "platform.stats.admins": tr("Admins ทั้งหมด", "Total admins", { zh: "管理员总数", fr: "Admins", vi: "Tổng admin", ja: "管理者合計" }),
  "platform.chart.title": tr("Exhibitors ในแต่ละ Event", "Exhibitors per event", { zh: "各活动参展商数", fr: "Exposants par événement", vi: "Nhà triển lãm theo sự kiện", ja: "イベント別出展者数" }),
  "platform.empty.events": tr("ยังไม่มี event ในระบบ", "No events yet", { zh: "暂无活动", fr: "Aucun événement", vi: "Chưa có sự kiện", ja: "イベントがありません" }),

  // home stats
  "stats.matchTime": tr("เวลาจับคู่เฉลี่ย", "Avg. match time", { zh: "平均匹配时间", fr: "Temps moyen", vi: "Thời gian khớp TB", ja: "平均マッチ時間" }),
  "stats.precision": tr("ความแม่นยำ", "Match precision", { zh: "匹配精度", fr: "Précision", vi: "Độ chính xác", ja: "マッチ精度" }),
  "stats.exhibitors": tr("ผู้ออกบูธ", "Exhibitors", { zh: "参展商", fr: "Exposants", vi: "Nhà triển lãm", ja: "出展者" }),
  "stats.liveSessions": tr("เซสชั่นสด", "Live sessions", { zh: "现场会议", fr: "Sessions en direct", vi: "Phiên trực tiếp", ja: "ライブセッション" }),

  // CTA section (bottom of home)
  "cta.headline": tr(
    "พร้อมเปลี่ยนงานแสดงสินค้าของคุณให้สมาร์ตขึ้นแล้วหรือยัง?",
    "Ready to make your exhibition smarter?",
    { zh: "准备好让您的展会更智能了吗？", fr: "Prêt à rendre votre salon plus intelligent ?", vi: "Sẵn sàng nâng cấp triển lãm của bạn?", ja: "展示会をスマートに進化させませんか？" }
  ),
  "cta.sub": tr("เริ่มใช้ EventIQ ฟรี — ไม่ต้องใช้บัตรเครดิต", "Start with EventIQ for free — no credit card needed", { zh: "免费开始使用 EventIQ — 无需信用卡", fr: "Démarrez gratuitement — sans carte de crédit", vi: "Bắt đầu miễn phí — không cần thẻ", ja: "無料で開始 — クレジットカード不要" }),
  "cta.demo": tr("ดูเดโม", "Watch demo", { zh: "观看演示", fr: "Voir la démo", vi: "Xem demo", ja: "デモを見る" }),
  "cta.register": tr("ลงทะเบียน Exhibitor", "Register as Exhibitor", { zh: "注册参展商", fr: "S'inscrire comme exposant", vi: "Đăng ký nhà triển lãm", ja: "出展者登録" }),

  // common
  "common.back": tr("กลับหน้าหลัก", "Back to home", { zh: "返回首页", fr: "Retour à l'accueil", vi: "Về trang chủ", ja: "ホームに戻る" }),

  // role gate / errors
  "guard.forbidden.title": tr("ไม่ได้รับอนุญาต", "Access denied", { zh: "无访问权限", fr: "Accès refusé", vi: "Không có quyền truy cập", ja: "アクセスが拒否されました" }),
  "guard.forbidden.body": tr("บทบาทของคุณคือ {role} ซึ่งไม่สามารถเข้าหน้านี้ได้", "Your role is {role}, which cannot access this page.", { zh: "您的角色是 {role}，无法访问此页面。", fr: "Votre rôle est {role}, qui ne peut pas accéder à cette page.", vi: "Vai trò của bạn là {role}, không thể truy cập trang này.", ja: "ロール {role} ではこのページにアクセスできません。" }),
  "guard.goHome": tr("กลับหน้าแรก", "Go home", { zh: "返回首页", fr: "Retour", vi: "Trang chủ", ja: "ホームへ" }),
  "guard.goDashboard": tr("ไป Dashboard", "Go to Dashboard", { zh: "前往仪表板", fr: "Tableau de bord", vi: "Bảng điều khiển", ja: "ダッシュボード" }),

  // loading states
  "loading.signin": tr("กำลังเข้าสู่ระบบ...", "Signing in...", { zh: "正在登录...", fr: "Connexion...", vi: "Đang đăng nhập...", ja: "ログイン中..." }),
  "loading.create": tr("กำลังสร้าง...", "Creating...", { zh: "正在创建...", fr: "Création...", vi: "Đang tạo...", ja: "作成中..." }),
  "loading.save": tr("กำลังบันทึก...", "Saving...", { zh: "正在保存...", fr: "Sauvegarde...", vi: "Đang lưu...", ja: "保存中..." }),
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const Ctx = createContext<I18nCtx>({ lang: "th", setLang: () => {}, t: (k) => k });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem("eventiq-lang") as Lang) || "th");
  useEffect(() => { localStorage.setItem("eventiq-lang", lang); document.documentElement.lang = lang; }, [lang]);
  const t = (key: string) => {
    const entry = dict[key];
    if (!entry) return key;
    return entry[lang] ?? entry.en ?? entry.th;
  };
  return <Ctx.Provider value={{ lang, setLang: setLangState, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
