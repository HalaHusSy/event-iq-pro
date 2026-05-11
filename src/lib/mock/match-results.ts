import { EXHIBITORS } from './exhibitors';

export interface MatchResult {
  exhibitor_id: string;
  match_score: number;
  reason: string;
  top_usecase: string;
}

const buildResults = (ids: string[], reasons: string[], usecases: string[]): MatchResult[] =>
  ids.map((id, i) => ({
    exhibitor_id: id,
    match_score: [94, 88, 82, 76, 68][i],
    reason: reasons[i] ?? 'แนวทางใกล้เคียงและมีลูกค้าอ้างอิง',
    top_usecase: usecases[i] ?? 'ปรับใช้ใน 4–8 สัปดาห์',
  }));

export const MATCH_SCENARIOS: { pain: string; results: MatchResult[] }[] = [
  {
    pain: 'อยากลดต้นทุน call center ด้วย AI',
    results: buildResults(
      ['ex01', 'ex15', 'ex02', 'ex09', 'ex08'],
      [
        'Botnoi เป็นผู้นำ Voice Bot ภาษาไทย ใช้กับ call center หลายเคส',
        'VoiceSphere เก่ง STT/TTS ภาษาไทยและมี call analytics',
        'AI Solutions มี LLM agent เชื่อมระบบ CRM ได้',
        'MarTech Pro เสริมด้วย lead automation หลังโทร',
        'SecureNet ดูแลความปลอดภัยข้อมูล call recording',
      ],
      ['Voice Bot 24/7', 'Thai TTS/STT', 'AI Copilot', 'Lead routing', 'Compliance']
    ),
  },
  {
    pain: 'ทำ chatbot ภาษาไทย',
    results: buildResults(['ex01', 'ex02', 'ex15', 'ex09', 'ex19'], [], []),
  },
  {
    pain: 'ค้นเอกสารภายในเร็วขึ้น',
    results: buildResults(['ex02', 'ex01', 'ex03', 'ex19', 'ex08'], [], []),
  },
  {
    pain: 'cloud cost สูงเกินไป',
    results: buildResults(['ex04', 'ex03', 'ex02', 'ex08', 'ex20'], [], []),
  },
  {
    pain: 'อยากทำ smart factory',
    results: buildResults(['ex17', 'ex06', 'ex20', 'ex03', 'ex04'], [], []),
  },
  {
    pain: 'PDPA compliance',
    results: buildResults(['ex08', 'ex02', 'ex01', 'ex12', 'ex04'], [], []),
  },
  {
    pain: 'payment integration',
    results: buildResults(['ex05', 'ex02', 'ex04', 'ex08', 'ex09'], [], []),
  },
  {
    pain: 'HR automation',
    results: buildResults(['ex19', 'ex01', 'ex02', 'ex09', 'ex10'], [], []),
  },
  {
    pain: 'retail analytics',
    results: buildResults(['ex13', 'ex03', 'ex09', 'ex11', 'ex02'], [], []),
  },
  {
    pain: 'solar / ESG',
    results: buildResults(['ex07', 'ex17', 'ex20', 'ex04', 'ex03'], [], []),
  },
];
