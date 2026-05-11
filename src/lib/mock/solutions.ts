import { EXHIBITORS } from './exhibitors';

export interface Solution {
  id: string;
  exhibitor_id: string;
  name: string;
  description: string;
  tags: string[];
}

const templates = [
  (n: string) => ({ name: `${n} Core Platform`, desc: `แพลตฟอร์มหลักของ ${n} พร้อมใช้งานในไม่กี่วัน` }),
  (n: string) => ({ name: `${n} Enterprise Suite`, desc: `ชุดโซลูชันระดับองค์กรพร้อม SLA และ on-prem option` }),
  (n: string) => ({ name: `${n} API Gateway`, desc: `API gateway สำหรับเชื่อมต่อระบบเดิมได้ทันที` }),
];

export const SOLUTIONS: Solution[] = EXHIBITORS.flatMap((ex, i) =>
  templates.map((t, j) => {
    const { name, desc } = t(ex.name);
    return {
      id: `sol-${i + 1}-${j + 1}`,
      exhibitor_id: ex.id,
      name,
      description: desc,
      tags: ex.industry_tags,
    };
  })
);
