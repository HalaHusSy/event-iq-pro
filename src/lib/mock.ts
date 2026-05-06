export interface Exhibitor {
  id: string;
  name: string;
  logo: string;
  booth: string;
  hall: string;
  tags: string[];
  usecases: string[];
  description: string;
}

export const exhibitors: Exhibitor[] = [
  { id: "e1", name: "Botnoi Group", logo: "🤖", booth: "A-12", hall: "Hall A", tags: ["AI", "Voice Bot", "Chatbot"], usecases: ["Customer service automation", "Voice assistant for call centers", "Multi-language chatbot"], description: "ผู้นำด้าน AI Voice และ Chatbot สำหรับองค์กรไทย" },
  { id: "e2", name: "AI Solutions Co.", logo: "🧠", booth: "A-18", hall: "Hall A", tags: ["LLM", "RAG", "Enterprise AI"], usecases: ["Internal knowledge search", "Document automation", "AI copilot for sales"], description: "Enterprise LLM solutions with on-prem deployment" },
  { id: "e3", name: "DataDrive Thailand", logo: "📊", booth: "B-04", hall: "Hall B", tags: ["Analytics", "BI", "Data Pipeline"], usecases: ["Real-time dashboard", "ETL automation", "Customer 360 view"], description: "End-to-end data platform for mid-to-large enterprises" },
  { id: "e4", name: "CloudSiam", logo: "☁️", booth: "B-11", hall: "Hall B", tags: ["Cloud", "DevOps", "Kubernetes"], usecases: ["Cloud migration", "Container orchestration", "Cost optimization"], description: "Managed cloud services for Thai SMEs" },
  { id: "e5", name: "FinTechX", logo: "💳", booth: "C-02", hall: "Hall C", tags: ["Payment", "Fintech", "API"], usecases: ["PromptPay integration", "Subscription billing", "Cross-border payments"], description: "Payment infrastructure for digital businesses" },
  { id: "e6", name: "RoboArm Industries", logo: "🦾", booth: "D-07", hall: "Hall D", tags: ["Robotics", "Automation", "Manufacturing"], usecases: ["Pick and place", "Quality inspection", "Warehouse automation"], description: "Industrial robotics integrator" },
  { id: "e7", name: "GreenEnergy TH", logo: "🌱", booth: "B-22", hall: "Hall B", tags: ["Solar", "ESG", "Sustainability"], usecases: ["Solar rooftop", "Energy monitoring", "Carbon accounting"], description: "Renewable energy solutions" },
  { id: "e8", name: "SecureNet", logo: "🛡️", booth: "C-15", hall: "Hall C", tags: ["Cybersecurity", "Zero Trust", "SOC"], usecases: ["Endpoint protection", "Threat hunting", "Compliance audit"], description: "Managed security service provider" },
  { id: "e9", name: "MarTech Pro", logo: "📣", booth: "A-25", hall: "Hall A", tags: ["Marketing", "CRM", "Automation"], usecases: ["Lead scoring", "Email automation", "Campaign analytics"], description: "Marketing automation for B2B" },
  { id: "e10", name: "EduSpark", logo: "🎓", booth: "D-19", hall: "Hall D", tags: ["EdTech", "LMS", "AI Tutor"], usecases: ["Online courses", "Adaptive learning", "Skill assessment"], description: "Corporate learning platform" },
  { id: "e11", name: "LogistiXpress", logo: "📦", booth: "B-30", hall: "Hall B", tags: ["Logistics", "Last Mile", "Tracking"], usecases: ["Route optimization", "Real-time tracking", "Cold chain"], description: "Tech-driven logistics" },
  { id: "e12", name: "HealthAI Thailand", logo: "🏥", booth: "C-21", hall: "Hall C", tags: ["HealthTech", "Medical AI", "Telemedicine"], usecases: ["Radiology AI", "EMR integration", "Patient triage"], description: "Clinical AI for hospitals" },
  { id: "e13", name: "RetailVision", logo: "🛍️", booth: "A-33", hall: "Hall A", tags: ["Retail", "Computer Vision", "POS"], usecases: ["Foot traffic analytics", "Self-checkout", "Inventory CV"], description: "Smart retail solutions" },
  { id: "e14", name: "AgriTech Siam", logo: "🌾", booth: "D-08", hall: "Hall D", tags: ["AgTech", "IoT", "Drone"], usecases: ["Crop monitoring", "Soil sensors", "Drone spraying"], description: "Precision agriculture" },
  { id: "e15", name: "VoiceSphere", logo: "🎙️", booth: "A-09", hall: "Hall A", tags: ["TTS", "STT", "Voice AI"], usecases: ["Thai TTS", "Call transcription", "IVR modernization"], description: "Voice technology specialists" },
  { id: "e16", name: "BlockChain Asia", logo: "⛓️", booth: "C-07", hall: "Hall C", tags: ["Blockchain", "Web3", "Tokenization"], usecases: ["Asset tokenization", "Supply chain trace", "Loyalty NFT"], description: "Enterprise blockchain consulting" },
  { id: "e17", name: "SmartFactory Co", logo: "🏭", booth: "D-12", hall: "Hall D", tags: ["IIoT", "Industry 4.0", "MES"], usecases: ["OEE monitoring", "Predictive maintenance", "Digital twin"], description: "Smart manufacturing systems" },
  { id: "e18", name: "PropTech Now", logo: "🏢", booth: "B-17", hall: "Hall B", tags: ["PropTech", "Smart Building", "BMS"], usecases: ["Tenant app", "Energy management", "Access control"], description: "Smart building software" },
  { id: "e19", name: "GameForge Studio", logo: "🎮", booth: "D-25", hall: "Hall D", tags: ["Gaming", "Unity", "AR/VR"], usecases: ["Branded games", "AR experiences", "Training simulation"], description: "Game-based experience studio" },
  { id: "e20", name: "LegalAI", logo: "⚖️", booth: "C-30", hall: "Hall C", tags: ["LegalTech", "Contract AI", "Compliance"], usecases: ["Contract review", "Clause extraction", "PDPA compliance"], description: "AI for legal teams" },
];

export interface Match { exhibitor: Exhibitor; score: number; usecase: string; reason: { th: string; en: string }; }

export const sampleMatches = (pain: string): Match[] => {
  const picks = [exhibitors[0], exhibitors[14], exhibitors[1], exhibitors[8], exhibitors[7]];
  const scores = [94, 88, 82, 76, 68];
  return picks.map((e, i) => ({
    exhibitor: e,
    score: scores[i],
    usecase: e.usecases[0],
    reason: {
      th: `ตรงกับ pain "${pain.slice(0, 40)}" — ${e.name} มีโซลูชัน ${e.tags[0]} และ ${e.tags[1]} ที่ใช้ในกรณีคล้ายกันมาแล้ว`,
      en: `Matches your pain "${pain.slice(0, 40)}" — ${e.name} offers ${e.tags[0]} and ${e.tags[1]} solutions used in similar scenarios.`,
    },
  }));
};

export const faqs = [
  { q: { th: "เซสชั่น AI เริ่มกี่โมง?", en: "What time does the AI session start?" }, a: { th: "เซสชั่น 'Generative AI in Enterprise' เริ่ม 14:00 ที่ห้อง Auditorium 1", en: "'Generative AI in Enterprise' starts at 2:00 PM in Auditorium 1." } },
  { q: { th: "ฟู้ดคอร์ทอยู่ที่ไหน?", en: "Where is the food court?" }, a: { th: "ชั้น G ฝั่งทิศตะวันออก ติดกับ Hall B", en: "Ground floor, east wing, next to Hall B." } },
  { q: { th: "ใครพูดตอน 3 โมง?", en: "Who is speaking at 3pm?" }, a: { th: "Dr. Winn Voravuthikunchai พูดเรื่อง 'Voice AI in Thai Market' ที่ Stage 2", en: "Dr. Winn Voravuthikunchai on 'Voice AI in Thai Market' at Stage 2." } },
];

export const sessions = [
  { id: "s1", title: "Generative AI in Enterprise", speaker: "Dr. Winn V.", time: "14:00 – 15:00", room: "Auditorium 1", langs: ["TH", "EN"], topic: "GenAI" },
  { id: "s2", title: "Voice AI in Thai Market", speaker: "Khun Pai Thanasit", time: "15:00 – 16:00", room: "Stage 2", langs: ["TH"], topic: "Voice" },
  { id: "s3", title: "Building RAG Systems", speaker: "Mark Chen", time: "10:30 – 11:30", room: "Workshop A", langs: ["EN"], topic: "RAG" },
  { id: "s4", title: "PDPA & AI Compliance", speaker: "Atty. Suchada P.", time: "11:00 – 12:00", room: "Auditorium 2", langs: ["TH"], topic: "Legal" },
  { id: "s5", title: "Cloud Cost Optimization", speaker: "Eng. Krit S.", time: "13:00 – 14:00", room: "Stage 1", langs: ["TH", "EN"], topic: "Cloud" },
  { id: "s6", title: "Computer Vision for Retail", speaker: "Lisa Wong", time: "16:00 – 17:00", room: "Workshop B", langs: ["EN"], topic: "CV" },
  { id: "s7", title: "Future of Robotics", speaker: "Prof. Tanapat", time: "09:30 – 10:30", room: "Auditorium 1", langs: ["TH"], topic: "Robotics" },
  { id: "s8", title: "Web3 in Southeast Asia", speaker: "Andrew Liu", time: "17:00 – 18:00", room: "Stage 2", langs: ["EN"], topic: "Web3" },
];

export const memories = [
  { id: "m1", title: "Voice AI ลดต้นทุน Call Center 40%", booth: "Botnoi Group", date: "2026-05-04", status: "public", excerpt: "การพูดคุยกับ Botnoi เผยให้เห็นว่า Voice Bot ภาษาไทยสามารถ..." },
  { id: "m2", title: "RAG กับเอกสารภายในองค์กร", booth: "AI Solutions Co.", date: "2026-05-04", status: "public", excerpt: "ทีม AI Solutions อธิบายแนวทาง RAG บนเอกสาร PDF..." },
  { id: "m3", title: "Smart Factory Roadmap", booth: "SmartFactory Co", date: "2026-05-05", status: "private", excerpt: "การหารือเรื่อง OEE และ predictive maintenance..." },
  { id: "m4", title: "Solar ROI ใน 4 ปี", booth: "GreenEnergy TH", date: "2026-05-05", status: "pending", excerpt: "การคำนวณ payback period ของ solar rooftop..." },
  { id: "m5", title: "PromptPay API Integration", booth: "FinTechX", date: "2026-05-06", status: "public", excerpt: "FinTechX สาธิตการเชื่อม API PromptPay..." },
];
