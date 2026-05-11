export interface Session {
  id: string;
  title: string;
  speaker: string;
  room: string;
  start_time: string;
  end_time: string;
  language: ('th' | 'en')[];
  summary: string[];
  qa: { question: string; answer: string }[];
  trending_topics: string[];
  sentiment: 'positive' | 'neutral' | 'mixed';
}

export const SAMPLE_SESSIONS: Session[] = [
  {
    id: 'sess-1', title: 'Generative AI in Enterprise', speaker: 'Dr. Winn Voravuthikunchai',
    room: 'Auditorium 1', start_time: '14:00', end_time: '15:00', language: ['th', 'en'],
    summary: [
      'GenAI กำลังเปลี่ยนวิธีทำงานในองค์กร ตั้งแต่ HR ถึง Engineering',
      'องค์กรไทยส่วนใหญ่เริ่มจาก use case ภายใน เช่น knowledge search',
      'ปัจจัยสำเร็จคือ data governance และการเลือก use case ที่ ROI ชัด',
    ],
    qa: [
      { question: 'เริ่มต้น GenAI ในองค์กรอย่างไร?', answer: 'เริ่มจาก use case เล็กที่ ROI ชัด เช่น internal search หรือ document Q&A' },
      { question: 'On-prem หรือ cloud ดีกว่า?', answer: 'ขึ้นกับความ sensitive ของข้อมูล สำหรับองค์กรไทยส่วนใหญ่เริ่มที่ cloud ก่อน' },
      { question: 'ใช้งบเท่าไหร่?', answer: 'POC เริ่มที่ ฿200K–500K, production ขึ้นอยู่กับ scale' },
    ],
    trending_topics: ['RAG', 'LLM', 'Enterprise', 'ROI'], sentiment: 'positive',
  },
  {
    id: 'sess-2', title: 'Voice AI in Thai Market', speaker: 'Khun Pai Thanasit',
    room: 'Stage 2', start_time: '15:00', end_time: '16:00', language: ['th'],
    summary: [
      'Voice AI ภาษาไทยพัฒนาเร็วมากใน 2 ปีที่ผ่านมา',
      'Call center เป็น use case ที่เห็น ROI เร็วสุด',
      'TTS ภาษาไทยตอนนี้แยกแทบไม่ออกจากเสียงจริง',
    ],
    qa: [
      { question: 'ภาษาถิ่นรองรับไหม?', answer: 'ปัจจุบันรองรับภาษากลาง อีสาน และเหนือ บางส่วน' },
      { question: 'แม่นยำแค่ไหน?', answer: 'STT แม่นยำ 94%+ ในสภาพเสียงปกติ' },
    ],
    trending_topics: ['Voice', 'TTS', 'Call Center'], sentiment: 'positive',
  },
  {
    id: 'sess-3', title: 'Building RAG Systems', speaker: 'Mark Chen',
    room: 'Workshop A', start_time: '10:30', end_time: '11:30', language: ['en'],
    summary: [
      'RAG architecture overview and pitfalls',
      'Chunking strategies matter more than model choice',
      'Hybrid search outperforms pure vector in most cases',
    ],
    qa: [
      { question: 'Best chunk size?', answer: '512–1024 tokens with 10–20% overlap is a good default' },
      { question: 'Open source vs hosted?', answer: 'Start hosted, move to open source when scale demands it' },
    ],
    trending_topics: ['RAG', 'Vector DB', 'Embeddings'], sentiment: 'neutral',
  },
  {
    id: 'sess-4', title: 'PDPA & AI Compliance', speaker: 'Atty. Suchada P.',
    room: 'Auditorium 2', start_time: '11:00', end_time: '12:00', language: ['th'],
    summary: [
      'PDPA บังคับใช้กับการประมวลผลข้อมูลส่วนบุคคลทุกรูปแบบรวมถึง AI',
      'ต้องมี lawful basis ก่อน train model ด้วยข้อมูลลูกค้า',
      'การใช้ AI สรุปการประชุมต้องขอ consent ทุกครั้ง',
    ],
    qa: [
      { question: 'AI สรุปบทสนทนาผิดกฎหมายไหม?', answer: 'ไม่ผิด ถ้ามี consent และ retention policy ชัดเจน' },
      { question: 'เก็บข้อมูลได้กี่วัน?', answer: 'ตามที่แจ้งใน privacy notice ปกติ 30–90 วัน' },
    ],
    trending_topics: ['PDPA', 'Compliance', 'Privacy'], sentiment: 'neutral',
  },
  {
    id: 'sess-5', title: 'Cloud Cost Optimization', speaker: 'Eng. Krit S.',
    room: 'Stage 1', start_time: '13:00', end_time: '14:00', language: ['th', 'en'],
    summary: [
      'องค์กรไทยใช้ cloud เกินงบเฉลี่ย 30%',
      'Reserved instances + autoscaling ช่วยประหยัด 40%+',
      'FinOps ควรเริ่มจากวันแรกที่ขึ้น cloud',
    ],
    qa: [
      { question: 'Multi-cloud คุ้มไหม?', answer: 'ส่วนใหญ่ไม่คุ้มสำหรับ SME เพิ่ม overhead มากกว่าประหยัด' },
    ],
    trending_topics: ['Cloud', 'FinOps', 'Cost'], sentiment: 'mixed',
  },
  {
    id: 'sess-6', title: 'Computer Vision for Retail', speaker: 'Lisa Wong',
    room: 'Workshop B', start_time: '16:00', end_time: '17:00', language: ['en'],
    summary: [
      'CV is moving from lab to store shelf in retail',
      'Foot traffic + dwell time analytics drive layout decisions',
      'Self-checkout adoption growing 40% YoY in SEA',
    ],
    qa: [
      { question: 'Privacy concerns?', answer: 'Edge processing avoids storing identifiable footage' },
    ],
    trending_topics: ['CV', 'Retail', 'Edge AI'], sentiment: 'positive',
  },
  {
    id: 'sess-7', title: 'Future of Robotics', speaker: 'Prof. Tanapat',
    room: 'Auditorium 1', start_time: '09:30', end_time: '10:30', language: ['th'],
    summary: [
      'หุ่นยนต์อุตสาหกรรมในไทยโต 18% ต่อปี',
      'Cobots เริ่มเข้าถึง SME มากขึ้นด้วยราคาที่ลดลง',
      'Skill gap ยังเป็นปัญหาใหญ่',
    ],
    qa: [
      { question: 'ROI ของ cobot?', answer: 'โดยเฉลี่ย 12–18 เดือนสำหรับงาน repetitive' },
    ],
    trending_topics: ['Robotics', 'Cobot', 'Manufacturing'], sentiment: 'positive',
  },
  {
    id: 'sess-8', title: 'Web3 in Southeast Asia', speaker: 'Andrew Liu',
    room: 'Stage 2', start_time: '17:00', end_time: '18:00', language: ['en'],
    summary: [
      'SEA leads in Web3 adoption per capita',
      'Tokenization of real-world assets gaining traction',
      'Regulatory clarity remains the main bottleneck',
    ],
    qa: [
      { question: 'Best country for Web3 startup?', answer: 'Singapore for regulation, Vietnam for talent' },
    ],
    trending_topics: ['Web3', 'Tokenization', 'SEA'], sentiment: 'mixed',
  },
];
