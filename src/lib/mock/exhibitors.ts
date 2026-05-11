export interface Exhibitor {
  id: string;
  name: string;
  logo_url: string;
  booth_no: string;
  hall: string;
  description_th: string;
  description_en: string;
  industry_tags: string[];
  website: string;
  contact_email: string;
}

const mk = (
  id: string, name: string, logo: string, booth: string, hall: string,
  th: string, en: string, tags: string[], web: string
): Exhibitor => ({
  id, name, logo_url: logo, booth_no: booth, hall,
  description_th: th, description_en: en, industry_tags: tags,
  website: `https://${web}`, contact_email: `contact@${web}`,
});

export const EXHIBITORS: Exhibitor[] = [
  mk('ex01', 'Botnoi Group', '🤖', 'A-12', 'Hall A', 'ผู้นำ Voice AI และ Chatbot ภาษาไทย', 'Thai Voice AI & Chatbot leader', ['AI', 'Voice', 'Chatbot'], 'botnoi.ai'),
  mk('ex02', 'AI Solutions Co.', '🧠', 'A-18', 'Hall A', 'Enterprise LLM และ RAG บน on-prem', 'Enterprise LLM & RAG on-prem', ['AI', 'LLM', 'Enterprise'], 'aisolutions.co.th'),
  mk('ex03', 'DataDrive Thailand', '📊', 'B-04', 'Hall B', 'แพลตฟอร์มข้อมูลครบวงจร', 'End-to-end data platform', ['Analytics', 'BI', 'Data'], 'datadrive.co.th'),
  mk('ex04', 'CloudSiam', '☁️', 'B-11', 'Hall B', 'Managed cloud สำหรับ SME', 'Managed cloud for SMEs', ['Cloud', 'DevOps'], 'cloudsiam.com'),
  mk('ex05', 'FinTechX', '💳', 'C-02', 'Hall C', 'โครงสร้างพื้นฐานการชำระเงิน', 'Payment infrastructure', ['Fintech', 'Payment'], 'fintechx.io'),
  mk('ex06', 'RoboArm Industries', '🦾', 'D-07', 'Hall D', 'หุ่นยนต์อุตสาหกรรม', 'Industrial robotics', ['Robotics', 'Manufacturing'], 'roboarm.co'),
  mk('ex07', 'GreenEnergy TH', '🌱', 'B-22', 'Hall B', 'พลังงานหมุนเวียน', 'Renewable energy', ['Energy', 'ESG'], 'greenenergy.co.th'),
  mk('ex08', 'SecureNet', '🛡️', 'C-15', 'Hall C', 'Managed security service', 'Managed security service', ['Security', 'SOC'], 'securenet.co.th'),
  mk('ex09', 'MarTech Pro', '📣', 'A-25', 'Hall A', 'Marketing automation B2B', 'B2B marketing automation', ['Marketing', 'CRM'], 'martechpro.co'),
  mk('ex10', 'EduSpark', '🎓', 'D-19', 'Hall D', 'แพลตฟอร์มเรียนรู้องค์กร', 'Corporate learning platform', ['EdTech', 'LMS'], 'eduspark.co.th'),
  mk('ex11', 'LogistiXpress', '📦', 'B-30', 'Hall B', 'โลจิสติกส์ขับเคลื่อนด้วยเทคโนโลยี', 'Tech-driven logistics', ['Logistics'], 'logistixpress.com'),
  mk('ex12', 'HealthAI Thailand', '🏥', 'C-21', 'Hall C', 'AI สำหรับโรงพยาบาล', 'Clinical AI for hospitals', ['HealthTech', 'AI'], 'healthai.co.th'),
  mk('ex13', 'RetailVision', '🛍️', 'A-33', 'Hall A', 'Smart retail solutions', 'Smart retail solutions', ['Retail', 'CV'], 'retailvision.co'),
  mk('ex14', 'AgriTech Siam', '🌾', 'D-08', 'Hall D', 'เกษตรแม่นยำ', 'Precision agriculture', ['AgTech', 'IoT'], 'agritechsiam.com'),
  mk('ex15', 'VoiceSphere', '🎙️', 'A-09', 'Hall A', 'Voice technology specialists', 'Voice technology specialists', ['Voice', 'TTS', 'STT'], 'voicesphere.co.th'),
  mk('ex16', 'BlockChain Asia', '⛓️', 'C-07', 'Hall C', 'Enterprise blockchain', 'Enterprise blockchain', ['Blockchain', 'Web3'], 'blockchainasia.io'),
  mk('ex17', 'SmartFactory Co', '🏭', 'D-12', 'Hall D', 'Smart manufacturing', 'Smart manufacturing', ['IIoT', 'Industry4'], 'smartfactory.co.th'),
  mk('ex18', 'PropTech Now', '🏢', 'B-17', 'Hall B', 'Smart building software', 'Smart building software', ['PropTech'], 'proptechnow.com'),
  mk('ex19', 'HRTech Plus', '👥', 'A-21', 'Hall A', 'ระบบ HR ครบวงจร', 'Full-stack HR platform', ['HRTech', 'SaaS'], 'hrtechplus.co'),
  mk('ex20', 'IoT Connect', '📡', 'D-30', 'Hall D', 'IoT platform สำหรับโรงงาน', 'IoT platform for factories', ['IoT', 'Sensor'], 'iotconnect.co.th'),
];
