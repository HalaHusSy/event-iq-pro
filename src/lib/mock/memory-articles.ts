export interface MemoryArticle {
  id: string;
  title: string;
  exhibitor_name: string;
  booth_no: string;
  date: string;
  tags: string[];
  summary_bullets: string[];
  highlights: { quote: string; speaker: string }[];
  action_items: string[];
  visibility: 'public' | 'private';
}

export const SAMPLE_ARTICLES: MemoryArticle[] = [
  {
    id: 'art-1', title: 'Voice AI ลดต้นทุน Call Center 40%',
    exhibitor_name: 'Botnoi Group', booth_no: 'A-12', date: '2026-05-04',
    tags: ['Voice AI', 'Call Center', 'Automation'],
    summary_bullets: [
      'Botnoi Voice Bot รองรับภาษาไทยเป็น native ทำให้ลด AHT ได้ 35%',
      'POC ใช้เวลา 4 สัปดาห์และเริ่มที่ ฿15,000/เดือน',
      'เคสตัวอย่าง AIS ลด workload agent 40% ภายใน 4 เดือน',
    ],
    highlights: [
      { quote: 'เราออกแบบให้ tune ได้เร็ว ไม่ต้อง retrain model', speaker: 'Khun Pai, Botnoi' },
      { quote: 'จุดแข็งคือเข้าใจสำเนียงและคำพูดธรรมชาติของคนไทย', speaker: 'Khun Pai, Botnoi' },
    ],
    action_items: [
      'นัด demo รอบลึกสัปดาห์หน้า',
      'ส่ง use case call center ของเราให้ทีม Botnoi',
      'ขอ pricing สำหรับ 50 concurrent calls',
    ],
    visibility: 'public',
  },
  {
    id: 'art-2', title: 'RAG กับเอกสารภายในองค์กร',
    exhibitor_name: 'AI Solutions Co.', booth_no: 'A-18', date: '2026-05-04',
    tags: ['RAG', 'LLM', 'Enterprise'],
    summary_bullets: [
      'รองรับ SharePoint / Confluence / Google Drive out of the box',
      'รัน on-prem ได้บน GPU เดียว',
      'PTT ลดเวลาค้นเอกสารจาก 4 ชั่วโมงเหลือ 8 นาที',
    ],
    highlights: [
      { quote: 'Chunking ที่ดีสำคัญกว่าโมเดลใหญ่', speaker: 'CTO, AI Solutions' },
    ],
    action_items: ['ขอ POC 30 วัน', 'ส่ง sample documents'],
    visibility: 'public',
  },
  {
    id: 'art-3', title: 'Smart Factory Roadmap',
    exhibitor_name: 'SmartFactory Co', booth_no: 'D-12', date: '2026-05-05',
    tags: ['IIoT', 'OEE', 'Industry 4.0'],
    summary_bullets: ['OEE monitoring แบบ real-time', 'Predictive maintenance ลด downtime 25%', 'เริ่มจาก line เดียวก่อนขยาย'],
    highlights: [{ quote: 'อย่ารีบทำทั้งโรงงาน เริ่ม line ที่มีปัญหาที่สุดก่อน', speaker: 'Project Lead' }],
    action_items: ['Site survey', 'ROI calculation'],
    visibility: 'private',
  },
  {
    id: 'art-4', title: 'Solar ROI ใน 4 ปี',
    exhibitor_name: 'GreenEnergy TH', booth_no: 'B-22', date: '2026-05-05',
    tags: ['Solar', 'ESG', 'Energy'],
    summary_bullets: ['Payback period 4 ปีสำหรับโรงงานขนาดกลาง', 'มีโปรแกรม PPA ไม่ต้องลงทุน'],
    highlights: [{ quote: 'PPA model เหมาะกับองค์กรที่ไม่อยาก capex', speaker: 'Sales Director' }],
    action_items: ['ส่งบิลค่าไฟ 12 เดือนล่าสุด'],
    visibility: 'public',
  },
  {
    id: 'art-5', title: 'PromptPay API Integration',
    exhibitor_name: 'FinTechX', booth_no: 'C-02', date: '2026-05-06',
    tags: ['Payment', 'API', 'Fintech'],
    summary_bullets: ['SDK พร้อม 5 ภาษา', 'Settlement ภายใน T+1', 'Fee ต่ำกว่า bank gateway 30%'],
    highlights: [{ quote: 'เราเชื่อมกับ 8 ธนาคารหลักของไทย', speaker: 'Head of Product' }],
    action_items: ['ขอ sandbox credentials'],
    visibility: 'public',
  },
];

export const SAMPLE_ARTICLE = SAMPLE_ARTICLES[0];
