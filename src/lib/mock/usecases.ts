import { SOLUTIONS } from './solutions';

export interface Usecase {
  id: string;
  solution_id: string;
  pain_text: string;
  outcome: string;
}

const painLib = [
  'ลดต้นทุน call center และ customer service',
  'ค้นเอกสารภายในบริษัทช้ามาก',
  'ทีมขายไม่มีเวลา qualify lead',
  'ระบบ legacy เชื่อมยากและบำรุงรักษาแพง',
  'ข้อมูลกระจายหลายระบบดูภาพรวมไม่ได้',
  'ทำ compliance PDPA / ISO ใช้คนเยอะ',
];

const outcomeLib = [
  'ลดเวลาดำเนินการ 50% ภายใน 3 เดือน',
  'ROI ภายใน 6–12 เดือน',
  'เพิ่ม conversion rate 20–40%',
  'ลดต้นทุนปฏิบัติการ 25%',
  'พนักงานทำงานได้เร็วขึ้น 3 เท่า',
  'รองรับ traffic เพิ่ม 10x โดยไม่ต้องเพิ่มทีม',
];

export const USECASES: Usecase[] = SOLUTIONS.flatMap((s, i) =>
  Array.from({ length: 3 }, (_, j) => ({
    id: `uc-${i + 1}-${j + 1}`,
    solution_id: s.id,
    pain_text: painLib[(i + j) % painLib.length],
    outcome: outcomeLib[(i * 2 + j) % outcomeLib.length],
  }))
);
