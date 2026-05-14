/* eslint-disable */
/**
 * AUTO-GENERATED — do not edit by hand. Run `npm run sync:sheet` to refresh.
 *
 * Source: Google Sheet "EventIQ - Exhibitors Mock Data"
 *   https://docs.google.com/spreadsheets/d/1Jez5HQ0SsPmvHoceEWTGHNIBdmUprR_1ImLNg9hNN78/edit
 *
 * Generated at: 2026-05-13T09:39:39.313Z
 * Total rows in sheet: 30
 * Validation errors: 0
 * Valid exhibitors: 30
 */
import type { Exhibitor } from './exhibitor.zod';

export const EXHIBITORS_FROM_SHEET: Exhibitor[] = [
  {
    "id": "ex01",
    "name": "Botnoi Group",
    "logo_url": "🤖",
    "booth_no": "A-12",
    "hall": "Hall A",
    "industry": "AI/SaaS",
    "sub_industries": [
      "Conversational AI",
      "Voice Bot",
      "Thai NLP"
    ],
    "solution_categories": [
      "Conversational AI",
      "Voice AI"
    ],
    "tagline_th": "ผู้นำ Voice AI และ Chatbot ภาษาไทยอันดับ 1",
    "tagline_en": "Thailand's leading Voice AI and Chatbot platform",
    "description_th": "Botnoi ผู้บุกเบิก Voice AI ภาษาไทย ให้บริการ chatbot voice bot TTS และ STT คุณภาพระดับโลก ลูกค้ามากกว่า 200 องค์กร",
    "description_en": "Botnoi pioneers Thai Voice AI with chatbot voice bot TTS and STT services trusted by 200+ enterprises",
    "long_pitch_en": "Botnoi Group is Thailand's leading Voice AI and conversational platform serving 200+ enterprises across banking healthcare retail and government. Our native Thai NLU handles complex dialects regional accents and code-switching between Thai and English naturally. Core products include Botnoi Voice (TTS with 50+ voice characters) Voice Bot (24/7 IVR replacement reducing call center cost by 35-60%) Chatbot Builder (no-code conversational AI with LINE OA Facebook Messenger and webchat connectors) and Knowledge Base RAG for enterprise document Q&A. We integrate with Salesforce SAP LINE MyShop and PromptPay. Specialized verticals: Banking (IVR replacement fraud detection conversations) Healthcare (patient FAQ automation appointment booking) Retail (e-commerce CS chatbot). Customers include major Thai banks AIS SCG and 50+ government agencies. ISO 27001 certified and PDPA compliant.",
    "problem_statements_en": [
      "Reduce call center cost with Thai voice AI",
      "Handle 24/7 customer support in Thai language",
      "Automate FAQ routing across LINE OA Facebook and web",
      "Replace expensive IVR systems",
      "Build Thai chatbot without coding"
    ],
    "unique_value_props": [
      "Native Thai NLU with regional accent support",
      "200+ enterprise customers proven at scale",
      "Full conversational stack from STT to TTS in one platform"
    ],
    "target_company_sizes": [
      "SME",
      "Enterprise",
      "Government"
    ],
    "target_industries": [
      "Banking",
      "Insurance",
      "Healthcare",
      "Retail",
      "Government",
      "Telecom"
    ],
    "target_roles": [
      "CTO",
      "Head of CX",
      "Head of Operations",
      "CIO"
    ],
    "geographic_focus": [
      "TH",
      "SEA"
    ],
    "tech_stack": [
      "Python",
      "PyTorch",
      "Llama-3",
      "Kubernetes",
      "FastAPI"
    ],
    "integrations": [
      "LINE OA",
      "Salesforce",
      "SAP",
      "LINE MyShop",
      "PromptPay",
      "Facebook Messenger",
      "Microsoft Teams"
    ],
    "deployment_options": [
      "cloud",
      "on-prem",
      "hybrid"
    ],
    "pricing_tier": "enterprise",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 50000,
    "pricing_note_th": "POC ฟรี 30 วัน + บริการ implementation",
    "pricing_note_en": "Free 30-day POC with implementation support",
    "founded_year": 2017,
    "employee_count": "201-500",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [
      "AIS",
      "SCG",
      "Krungsri",
      "Bangkok Bank",
      "True Corp",
      "Government Savings Bank"
    ],
    "certifications": [
      "ISO 27001",
      "PDPA-certified",
      "SOC 2 Type II"
    ],
    "awards": [
      "Thailand ICT Awards 2023",
      "Best AI Startup SEA 2022"
    ],
    "demo_video_url": "https://www.youtube.com/watch?v=example1",
    "case_study_urls": [
      "https://botnoi.ai/case-studies/krungsri",
      "https://botnoi.ai/case-studies/ais"
    ],
    "brochure_url": "https://botnoi.ai/brochure.pdf",
    "booth_activities_th": [
      "รับ POC ฟรี 15 นาที",
      "แจกเครดิต Voice 1000 บาท",
      "เดโม voice bot สด"
    ],
    "booth_activities_en": [
      "Free 15-min POC consultation",
      "1000 THB Voice credit giveaway",
      "Live voice bot demo"
    ],
    "website": "https://botnoi.ai",
    "contact_email": "contact@botnoi.ai",
    "contact_phone": "+66-2-xxx-xxxx",
    "contact_line_id": "@botnoi",
    "use_cases": [
      {
        "title": "Bank IVR Replacement",
        "industry": "Banking",
        "problem_th": "ลูกค้ารอสายนานเฉลี่ย 8 นาที ค่าใช้จ่าย call center สูง",
        "problem_en": "Avg hold time 8 min high call center cost",
        "solution_summary": "24/7 Thai voice bot handling top-50 banking intents",
        "outcome_metric": "ลด AHT 35% ใน 4 เดือน ประหยัด 12 ลบ./ปี",
        "customer_anonymized": "Top-3 Thai retail bank"
      },
      {
        "title": "Hospital Appointment Booking",
        "industry": "Healthcare",
        "problem_th": "พยาบาลรับโทรนัดวันละ 500+ สาย",
        "problem_en": "Nurses handle 500+ booking calls daily",
        "solution_summary": "LINE chatbot for self-service appointment booking with Thai NLU",
        "outcome_metric": "60% ของการนัดผ่านบอท เจ้าหน้าที่ลด 4 คน",
        "customer_anonymized": "500-bed private hospital BKK"
      },
      {
        "title": "Retail CS Automation",
        "industry": "Retail",
        "problem_th": "คำถามซ้ำ ๆ เรื่อง order status กินเวลา agent",
        "problem_en": "Repetitive order status queries consume agent time",
        "solution_summary": "LINE OA chatbot connected to Shopify order API",
        "outcome_metric": "ลดเวลาเฉลี่ยต่อ ticket 70%",
        "customer_anonymized": "Top-5 Thai e-commerce"
      }
    ]
  },
  {
    "id": "ex02",
    "name": "VoiceSphere",
    "logo_url": "🎙️",
    "booth_no": "A-09",
    "hall": "Hall A",
    "industry": "AI/SaaS",
    "sub_industries": [
      "Voice Technology",
      "Thai TTS",
      "Call Analytics"
    ],
    "solution_categories": [
      "Voice AI",
      "Conversational AI"
    ],
    "tagline_th": "ผู้เชี่ยวชาญ Voice Technology สำหรับองค์กร",
    "tagline_en": "Voice technology specialists for enterprise",
    "description_th": "VoiceSphere ให้บริการ TTS STT และ Call Analytics คุณภาพสูง สำหรับ contact center และ media production",
    "description_en": "VoiceSphere provides high-quality TTS STT and call analytics for contact centers and media production",
    "long_pitch_en": "VoiceSphere specializes in enterprise-grade voice technology with industry-leading Thai TTS quality (MOS 4.6/5) and STT accuracy (95% WER on Thai conversational speech). Our platform serves contact centers needing real-time speech analytics sentiment detection and conversation summarization. Key products: VoiceSphere TTS (30+ Thai voices including regional accents Lanna Isan Southern) VoiceSphere STT (real-time transcription with speaker diarization) Call Analytics Dashboard (sentiment trends agent coaching insights compliance keyword detection). We integrate with Genesys Avaya Cisco and Asterisk PBX systems. Specialized in PDPA-compliant call recording analysis with on-prem deployment for banks and insurance. Audio production clients use our TTS for IVR prompts e-learning narration audiobook production and media dubbing. Founded by Thai speech researchers from Chulalongkorn University.",
    "problem_statements_en": [
      "High-quality Thai TTS for IVR and media",
      "Real-time call transcription with speaker separation",
      "Detect customer sentiment and compliance violations",
      "Reduce call analysis manual review by 90%",
      "Generate IVR voice prompts in minutes not weeks"
    ],
    "unique_value_props": [
      "Industry-leading Thai TTS MOS 4.6 with regional accents",
      "Real-time STT 95 percent accuracy on conversational Thai",
      "On-prem deployment certified for PDPA call recording"
    ],
    "target_company_sizes": [
      "Mid-Market",
      "Enterprise"
    ],
    "target_industries": [
      "Banking",
      "Insurance",
      "Telecom",
      "Media & Entertainment",
      "Healthcare"
    ],
    "target_roles": [
      "Head of Contact Center",
      "Compliance Officer",
      "Media Producer"
    ],
    "geographic_focus": [
      "TH",
      "SEA"
    ],
    "tech_stack": [
      "Python",
      "TensorFlow",
      "ONNX",
      "Kubernetes",
      "gRPC"
    ],
    "integrations": [
      "Genesys",
      "Avaya",
      "Cisco",
      "Asterisk",
      "Twilio",
      "LINE OA"
    ],
    "deployment_options": [
      "cloud",
      "on-prem",
      "hybrid"
    ],
    "pricing_tier": "mid-market",
    "pricing_model": "usage",
    "pricing_starts_at_thb": 30000,
    "pricing_note_th": "เริ่มต้น 30000 บาท/เดือน รวม 500000 character TTS",
    "pricing_note_en": "Starts 30000 THB/month including 500k TTS chars",
    "founded_year": 2019,
    "employee_count": "51-200",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [
      "Krungthai Bank",
      "Allianz Ayudhya",
      "True Corp",
      "NBT",
      "Bumrungrad"
    ],
    "certifications": [
      "ISO 27001",
      "PDPA-certified"
    ],
    "awards": [
      "SEA Voice Tech Award 2024"
    ],
    "demo_video_url": "https://www.youtube.com/watch?v=example2",
    "case_study_urls": [
      "https://voicesphere.co.th/case/krungthai"
    ],
    "brochure_url": "https://voicesphere.co.th/brochure.pdf",
    "booth_activities_th": [
      "ลองอัด voice ของตัวเองเป็น TTS",
      "วิเคราะห์ sample call ฟรี"
    ],
    "booth_activities_en": [
      "Try cloning your own voice as TTS",
      "Free sample call analysis"
    ],
    "website": "https://voicesphere.co.th",
    "contact_email": "contact@voicesphere.co.th",
    "contact_phone": "+66-2-xxx-xxxx",
    "contact_line_id": "@voicesphere",
    "use_cases": [
      {
        "title": "Insurance Compliance Monitoring",
        "industry": "Insurance",
        "problem_th": "ต้องฟัง call ทุก agent เพื่อตรวจคำที่ห้ามพูด",
        "problem_en": "Must manually review every agent call for compliance violations",
        "solution_summary": "Auto-flag compliance keywords with real-time STT and rule engine",
        "outcome_metric": "ครอบคลุม 100 percent call จาก 5 percent manual sampling",
        "customer_anonymized": "Top-3 Thai insurance"
      },
      {
        "title": "TV Channel TTS Production",
        "industry": "Media & Entertainment",
        "problem_th": "ผลิต voice over ตอนเย็นใช้เวลานาน",
        "problem_en": "Evening voice-over production takes hours",
        "solution_summary": "Thai TTS with 5 newscaster voices generating in seconds",
        "outcome_metric": "ลดเวลาผลิตจาก 4 ชม. เหลือ 20 นาที",
        "customer_anonymized": "Major Thai free TV"
      },
      {
        "title": "Hospital Call Sentiment",
        "industry": "Healthcare",
        "problem_th": "ไม่รู้ว่าคนไข้พอใจ frontdesk แค่ไหน",
        "problem_en": "No visibility into frontdesk patient satisfaction",
        "solution_summary": "Sentiment dashboard from daily call recordings",
        "outcome_metric": "ระบุ frontdesk pain top 3 ใน 2 สัปดาห์",
        "customer_anonymized": "Top-5 private hospital chain"
      }
    ]
  },
  {
    "id": "ex03",
    "name": "DataPulse Analytics",
    "logo_url": "📊",
    "booth_no": "A-15",
    "hall": "Hall A",
    "industry": "Other",
    "sub_industries": [
      "Business Intelligence",
      "Predictive Analytics",
      "Data Warehouse"
    ],
    "solution_categories": [
      "Other",
      "Other"
    ],
    "tagline_th": "แพลตฟอร์มวิเคราะห์ข้อมูลธุรกิจแบบเรียลไทม์",
    "tagline_en": "Real-time business analytics and forecasting platform",
    "description_th": "DataPulse ช่วยองค์กรรวมข้อมูลจากหลายระบบ สร้าง dashboard และพยากรณ์ยอดขายแบบไม่ต้องเขียนโค้ด",
    "description_en": "DataPulse unifies business data, dashboards, and no-code forecasting for teams.",
    "long_pitch_en": "Enterprise analytics suite with connectors to ERP POS CRM and spreadsheets. It provides governed dashboards, anomaly alerts, churn prediction, sales forecasting, and executive KPI rooms for Thai and SEA teams.",
    "problem_statements_en": [
      "Centralize fragmented data",
      "Forecast sales and inventory",
      "Detect KPI anomalies",
      "Reduce manual Excel reporting"
    ],
    "unique_value_props": [
      "No-code BI with Thai templates",
      "Fast ERP/POS connectors",
      "Built-in forecast models"
    ],
    "target_company_sizes": [
      "SME",
      "Mid-Market",
      "Enterprise"
    ],
    "target_industries": [
      "Retail",
      "Manufacturing",
      "Finance",
      "Education"
    ],
    "target_roles": [
      "CEO",
      "CFO",
      "Data Manager",
      "Operations Manager"
    ],
    "geographic_focus": [
      "TH",
      "SEA"
    ],
    "tech_stack": [
      "Python",
      "dbt",
      "BigQuery",
      "React",
      "FastAPI"
    ],
    "integrations": [
      "SAP",
      "Odoo",
      "Salesforce",
      "Google Sheets",
      "Power BI"
    ],
    "deployment_options": [
      "cloud",
      "hybrid"
    ],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 25000,
    "pricing_note_th": "ทดลองใช้ฟรี 14 วัน พร้อม dashboard template",
    "pricing_note_en": "14-day trial with dashboard templates",
    "founded_year": 2020,
    "employee_count": "51-200",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [
      "Central Retail",
      "ThaiBev",
      "Saha Group"
    ],
    "certifications": [
      "ISO 27001",
      "PDPA-ready"
    ],
    "awards": [
      "Best BI Solution Thailand 2024"
    ],
    "demo_video_url": "https://www.youtube.com/watch?v=datapulsdemo",
    "case_study_urls": [
      "https://datapulseanalytics.co/case-studies/demo-1",
      "https://datapulseanalytics.co/case-studies/demo-2"
    ],
    "brochure_url": "https://datapulseanalytics.co/brochure.pdf",
    "booth_activities_th": [
      "รับคำปรึกษาฟรี 15 นาที",
      "ทดลองเดโมที่บูธ",
      "รับ template สำหรับ AI/Analytics"
    ],
    "booth_activities_en": [
      "Free 15-min consultation",
      "Live booth demo",
      "Get AI/Analytics templates"
    ],
    "website": "https://datapulseanalytics.co",
    "contact_email": "contact@datapulseanalytics.co",
    "contact_phone": "#NAME?",
    "contact_line_id": "@datapulseana",
    "use_cases": [
      {
        "title": "Retail Workflow Automation",
        "industry": "Retail",
        "problem_th": "ทีมทำงานซ้ำด้วย Excel และติดตามสถานะยาก",
        "problem_en": "Teams rely on repetitive Excel work and lack status visibility",
        "solution_summary": "DataPulse Analytics centralizes workflows, data, and alerts in one dashboard",
        "outcome_metric": "ลดเวลาทำงาน manual 30-50% ภายใน 3 เดือน",
        "customer_anonymized": "Retail company"
      },
      {
        "title": "Executive KPI Dashboard",
        "industry": "Manufacturing",
        "problem_th": "ผู้บริหารไม่มีข้อมูลเรียลไทม์สำหรับตัดสินใจ",
        "problem_en": "Executives lack real-time data for decisions",
        "solution_summary": "Real-time dashboard with role-based KPI views and alerts",
        "outcome_metric": "ประชุมสรุปรายงานเร็วขึ้น 60%",
        "customer_anonymized": "Mid-market enterprise"
      },
      {
        "title": "Customer Experience Improvement",
        "industry": "Finance",
        "problem_th": "ทีมไม่รู้จุดติดขัดของลูกค้าระหว่างใช้งาน",
        "problem_en": "Teams cannot identify customer friction points",
        "solution_summary": "Analytics and automation to identify issues and trigger actions",
        "outcome_metric": "เพิ่ม conversion หรือ SLA 15-25%",
        "customer_anonymized": "SEA expansion client"
      }
    ]
  },
  {
    "id": "ex04",
    "name": "",
    "logo_url": "📦",
    "booth_no": "TBD",
    "hall": "TBD",
    "industry": "Other",
    "sub_industries": [],
    "solution_categories": [],
    "tagline_th": "",
    "tagline_en": "",
    "description_th": "",
    "description_en": "",
    "long_pitch_en": "",
    "problem_statements_en": [],
    "unique_value_props": [],
    "target_company_sizes": [],
    "target_industries": [],
    "target_roles": [],
    "geographic_focus": [],
    "tech_stack": [],
    "integrations": [],
    "deployment_options": [],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 0,
    "pricing_note_th": "",
    "pricing_note_en": "",
    "founded_year": 2020,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [],
    "certifications": [],
    "awards": [],
    "demo_video_url": "",
    "case_study_urls": [],
    "brochure_url": "",
    "booth_activities_th": [],
    "booth_activities_en": [],
    "website": "",
    "contact_email": "",
    "contact_phone": "",
    "contact_line_id": "",
    "use_cases": []
  },
  {
    "id": "ex05",
    "name": "",
    "logo_url": "📦",
    "booth_no": "TBD",
    "hall": "TBD",
    "industry": "Other",
    "sub_industries": [],
    "solution_categories": [],
    "tagline_th": "",
    "tagline_en": "",
    "description_th": "",
    "description_en": "",
    "long_pitch_en": "",
    "problem_statements_en": [],
    "unique_value_props": [],
    "target_company_sizes": [],
    "target_industries": [],
    "target_roles": [],
    "geographic_focus": [],
    "tech_stack": [],
    "integrations": [],
    "deployment_options": [],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 0,
    "pricing_note_th": "",
    "pricing_note_en": "",
    "founded_year": 2020,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [],
    "certifications": [],
    "awards": [],
    "demo_video_url": "",
    "case_study_urls": [],
    "brochure_url": "",
    "booth_activities_th": [],
    "booth_activities_en": [],
    "website": "",
    "contact_email": "",
    "contact_phone": "",
    "contact_line_id": "",
    "use_cases": []
  },
  {
    "id": "ex06",
    "name": "",
    "logo_url": "📦",
    "booth_no": "TBD",
    "hall": "TBD",
    "industry": "Other",
    "sub_industries": [],
    "solution_categories": [],
    "tagline_th": "",
    "tagline_en": "",
    "description_th": "",
    "description_en": "",
    "long_pitch_en": "",
    "problem_statements_en": [],
    "unique_value_props": [],
    "target_company_sizes": [],
    "target_industries": [],
    "target_roles": [],
    "geographic_focus": [],
    "tech_stack": [],
    "integrations": [],
    "deployment_options": [],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 0,
    "pricing_note_th": "",
    "pricing_note_en": "",
    "founded_year": 2020,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [],
    "certifications": [],
    "awards": [],
    "demo_video_url": "",
    "case_study_urls": [],
    "brochure_url": "",
    "booth_activities_th": [],
    "booth_activities_en": [],
    "website": "",
    "contact_email": "",
    "contact_phone": "",
    "contact_line_id": "",
    "use_cases": []
  },
  {
    "id": "ex07",
    "name": "",
    "logo_url": "📦",
    "booth_no": "TBD",
    "hall": "TBD",
    "industry": "Other",
    "sub_industries": [],
    "solution_categories": [],
    "tagline_th": "",
    "tagline_en": "",
    "description_th": "",
    "description_en": "",
    "long_pitch_en": "",
    "problem_statements_en": [],
    "unique_value_props": [],
    "target_company_sizes": [],
    "target_industries": [],
    "target_roles": [],
    "geographic_focus": [],
    "tech_stack": [],
    "integrations": [],
    "deployment_options": [],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 0,
    "pricing_note_th": "",
    "pricing_note_en": "",
    "founded_year": 2020,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [],
    "certifications": [],
    "awards": [],
    "demo_video_url": "",
    "case_study_urls": [],
    "brochure_url": "",
    "booth_activities_th": [],
    "booth_activities_en": [],
    "website": "",
    "contact_email": "",
    "contact_phone": "",
    "contact_line_id": "",
    "use_cases": []
  },
  {
    "id": "ex08",
    "name": "",
    "logo_url": "📦",
    "booth_no": "TBD",
    "hall": "TBD",
    "industry": "Other",
    "sub_industries": [],
    "solution_categories": [],
    "tagline_th": "",
    "tagline_en": "",
    "description_th": "",
    "description_en": "",
    "long_pitch_en": "",
    "problem_statements_en": [],
    "unique_value_props": [],
    "target_company_sizes": [],
    "target_industries": [],
    "target_roles": [],
    "geographic_focus": [],
    "tech_stack": [],
    "integrations": [],
    "deployment_options": [],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 0,
    "pricing_note_th": "",
    "pricing_note_en": "",
    "founded_year": 2020,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [],
    "certifications": [],
    "awards": [],
    "demo_video_url": "",
    "case_study_urls": [],
    "brochure_url": "",
    "booth_activities_th": [],
    "booth_activities_en": [],
    "website": "",
    "contact_email": "",
    "contact_phone": "",
    "contact_line_id": "",
    "use_cases": []
  },
  {
    "id": "ex09",
    "name": "",
    "logo_url": "📦",
    "booth_no": "TBD",
    "hall": "TBD",
    "industry": "Other",
    "sub_industries": [],
    "solution_categories": [],
    "tagline_th": "",
    "tagline_en": "",
    "description_th": "",
    "description_en": "",
    "long_pitch_en": "",
    "problem_statements_en": [],
    "unique_value_props": [],
    "target_company_sizes": [],
    "target_industries": [],
    "target_roles": [],
    "geographic_focus": [],
    "tech_stack": [],
    "integrations": [],
    "deployment_options": [],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 0,
    "pricing_note_th": "",
    "pricing_note_en": "",
    "founded_year": 2020,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [],
    "certifications": [],
    "awards": [],
    "demo_video_url": "",
    "case_study_urls": [],
    "brochure_url": "",
    "booth_activities_th": [],
    "booth_activities_en": [],
    "website": "",
    "contact_email": "",
    "contact_phone": "",
    "contact_line_id": "",
    "use_cases": []
  },
  {
    "id": "ex10",
    "name": "",
    "logo_url": "📦",
    "booth_no": "TBD",
    "hall": "TBD",
    "industry": "Other",
    "sub_industries": [],
    "solution_categories": [],
    "tagline_th": "",
    "tagline_en": "",
    "description_th": "",
    "description_en": "",
    "long_pitch_en": "",
    "problem_statements_en": [],
    "unique_value_props": [],
    "target_company_sizes": [],
    "target_industries": [],
    "target_roles": [],
    "geographic_focus": [],
    "tech_stack": [],
    "integrations": [],
    "deployment_options": [],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 0,
    "pricing_note_th": "",
    "pricing_note_en": "",
    "founded_year": 2020,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [],
    "certifications": [],
    "awards": [],
    "demo_video_url": "",
    "case_study_urls": [],
    "brochure_url": "",
    "booth_activities_th": [],
    "booth_activities_en": [],
    "website": "",
    "contact_email": "",
    "contact_phone": "",
    "contact_line_id": "",
    "use_cases": []
  },
  {
    "id": "ex11",
    "name": "",
    "logo_url": "📦",
    "booth_no": "TBD",
    "hall": "TBD",
    "industry": "Other",
    "sub_industries": [],
    "solution_categories": [],
    "tagline_th": "",
    "tagline_en": "",
    "description_th": "",
    "description_en": "",
    "long_pitch_en": "",
    "problem_statements_en": [],
    "unique_value_props": [],
    "target_company_sizes": [],
    "target_industries": [],
    "target_roles": [],
    "geographic_focus": [],
    "tech_stack": [],
    "integrations": [],
    "deployment_options": [],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 0,
    "pricing_note_th": "",
    "pricing_note_en": "",
    "founded_year": 2020,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [],
    "certifications": [],
    "awards": [],
    "demo_video_url": "",
    "case_study_urls": [],
    "brochure_url": "",
    "booth_activities_th": [],
    "booth_activities_en": [],
    "website": "",
    "contact_email": "",
    "contact_phone": "",
    "contact_line_id": "",
    "use_cases": []
  },
  {
    "id": "ex12",
    "name": "",
    "logo_url": "📦",
    "booth_no": "TBD",
    "hall": "TBD",
    "industry": "Other",
    "sub_industries": [],
    "solution_categories": [],
    "tagline_th": "",
    "tagline_en": "",
    "description_th": "",
    "description_en": "",
    "long_pitch_en": "",
    "problem_statements_en": [],
    "unique_value_props": [],
    "target_company_sizes": [],
    "target_industries": [],
    "target_roles": [],
    "geographic_focus": [],
    "tech_stack": [],
    "integrations": [],
    "deployment_options": [],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 0,
    "pricing_note_th": "",
    "pricing_note_en": "",
    "founded_year": 2020,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [],
    "certifications": [],
    "awards": [],
    "demo_video_url": "",
    "case_study_urls": [],
    "brochure_url": "",
    "booth_activities_th": [],
    "booth_activities_en": [],
    "website": "",
    "contact_email": "",
    "contact_phone": "",
    "contact_line_id": "",
    "use_cases": []
  },
  {
    "id": "ex13",
    "name": "Vulcan Coalition",
    "logo_url": "📦",
    "booth_no": "A-01",
    "hall": "Hall A",
    "industry": "Other",
    "sub_industries": [
      "Social Enterprise, Data Labeling, NLP"
    ],
    "solution_categories": [
      "Other"
    ],
    "tagline_th": "ขับเคลื่อนอุตสาหกรรม AI ไปพร้อมกับการสร้างงานให้ผู้พิการ",
    "tagline_en": "Empowering AI with Human Intelligence by People with Disabilities",
    "description_th": "สตาร์ทอัพที่ใช้โมเดลธุรกิจ Social Enterprise โดยจ้างงานผู้พิการมาเป็น \"AI Trainers\" เพื่อจัดทำข้อมูล (Data Labeling) คุณภาพสูงสำหรับพัฒนาโมเดล AI",
    "description_en": "A social enterprise startup that employs people with disabilities as AI Trainers to curate high-quality datasets for AI development.",
    "long_pitch_en": "Vulcan Coalition bridges the gap between the booming AI industry and the unemployment of people with disabilities. By leveraging the unique capabilities of PWDs in data labeling, we provide high-accuracy training data for AI companies while creating sustainable careers.",
    "problem_statements_en": [
      "Scarcity of high-quality local language datasets for AI; High unemployment among people with disabilities."
    ],
    "unique_value_props": [
      "High-quality Thai NLP datasets; ESG compliance for corporates; Scalable AI-as-a-Service."
    ],
    "target_company_sizes": [
      "SME"
    ],
    "target_industries": [
      "Other"
    ],
    "target_roles": [
      "CTO, Data Science Manager, CSR Manager"
    ],
    "geographic_focus": [
      "TH",
      "SEA"
    ],
    "tech_stack": [
      "Python, TensorFlow, PyTorch, React, Cloud Architecture"
    ],
    "integrations": [
      "API integration with existing business workflows"
    ],
    "deployment_options": [
      "cloud"
    ],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 50000,
    "pricing_note_th": "ราคาขึ้นอยู่กับปริมาณข้อมูลและความซับซ้อนของโมเดล",
    "pricing_note_en": "Pricing depends on data volume and model complexity.",
    "founded_year": 2020,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [
      "AIS, KBTG, SCB, PTT"
    ],
    "certifications": [
      "Social Enterprise Certification"
    ],
    "awards": [
      "Techsauce Global Summit 2020 Winner, Winner of various Impact awards"
    ],
    "demo_video_url": "https://vulcancoalition.com/demo",
    "case_study_urls": [
      "https://vulcancoalition.com/cases"
    ],
    "brochure_url": "https://vulcancoalition.com/en/",
    "booth_activities_th": [
      "สาธิตการเทรน AI โดยผู้พิการ, ตรวจสอบสุขภาพจิตด้วย AI (MayWe)"
    ],
    "booth_activities_en": [
      "AI training demo by PWDs, AI Mental Health Screening (MayWe) demo"
    ],
    "website": "https://vulcancoalition.com",
    "contact_email": "hello@vulcancoalition.com",
    "contact_phone": "66-2-xxx-xxxx",
    "contact_line_id": "@vulcancoalition",
    "use_cases": []
  },
  {
    "id": "ex14",
    "name": "Wisesight",
    "logo_url": "📦",
    "booth_no": "A-02",
    "hall": "Hall A",
    "industry": "Other",
    "sub_industries": [
      "Social Listening, Market Research"
    ],
    "solution_categories": [
      "Other"
    ],
    "tagline_th": "ผู้นำด้านการวิเคราะห์ข้อมูลโซเชียลอันดับหนึ่งในไทย",
    "tagline_en": "Unlock the Power of Social Data",
    "description_th": "ให้บริการเครื่องมือ Social Listening และบริการวิเคราะห์ข้อมูลจากสื่อสังคมออนไลน์เพื่อช่วยให้แบรนด์เข้าใจผู้บริโภคและจัดการภาวะวิกฤตได้ทันท่วงที",
    "description_en": "Leading social data analytics provider in Thailand, offering tools and services to help brands understand consumers and manage social media crises.",
    "long_pitch_en": "Wisesight processes billions of social media messages to provide actionable insights for brands. Our platform, ZOCIAL EYE, allows businesses to track trends, monitor brand health, and perform competitor analysis in real-time.",
    "problem_statements_en": [
      "Information overload on social media; Lack of consumer sentiment understanding; Inefficient crisis response."
    ],
    "unique_value_props": [
      "Most accurate Thai language NLP; Historical data access since 2010; Comprehensive social metrics."
    ],
    "target_company_sizes": [
      "SME"
    ],
    "target_industries": [
      "Other"
    ],
    "target_roles": [
      "CMO, Brand Manager, PR Manager, Data Analyst"
    ],
    "geographic_focus": [
      "Thailand, Malaysia, APAC"
    ],
    "tech_stack": [
      "Go, Python, Elasticsearch, Kafka, React"
    ],
    "integrations": [
      "Salesforce, HubSpot, Zapier"
    ],
    "deployment_options": [
      "cloud"
    ],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 15000,
    "pricing_note_th": "มีแพ็กเกจสำหรับ SME และแบบ Enterprise ตามจำนวน Keyword",
    "pricing_note_en": "Packages available for SME and Enterprise based on keywords/mentions.",
    "founded_year": 2012,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [
      "P&G, Unilever, AIS, Toyota"
    ],
    "certifications": [
      "ISO/IEC 27001"
    ],
    "awards": [
      "14th Thailand Social Awards Organizer, Google Cloud Partner"
    ],
    "demo_video_url": "https://wisesight.com/zocialeye-demo",
    "case_study_urls": [
      "https://wisesight.com/resource/case-studies/"
    ],
    "brochure_url": "https://wisesight.com",
    "booth_activities_th": [
      "แจกฟรี Social Trend Report 2026, เวิร์กชอปการใช้ Social Listening เบื้องต้น"
    ],
    "booth_activities_en": [
      "Free 2026 Social Trend Report, Intro to Social Listening Workshop"
    ],
    "website": "https://wisesight.com",
    "contact_email": "sales@wisesight.com",
    "contact_phone": "66-2-xxx-xxxx",
    "contact_line_id": "@wisesight",
    "use_cases": []
  },
  {
    "id": "ex15",
    "name": "",
    "logo_url": "📦",
    "booth_no": "TBD",
    "hall": "TBD",
    "industry": "Other",
    "sub_industries": [],
    "solution_categories": [],
    "tagline_th": "",
    "tagline_en": "",
    "description_th": "",
    "description_en": "",
    "long_pitch_en": "",
    "problem_statements_en": [],
    "unique_value_props": [],
    "target_company_sizes": [],
    "target_industries": [],
    "target_roles": [],
    "geographic_focus": [],
    "tech_stack": [],
    "integrations": [],
    "deployment_options": [],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 0,
    "pricing_note_th": "",
    "pricing_note_en": "",
    "founded_year": 2020,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [],
    "certifications": [],
    "awards": [],
    "demo_video_url": "",
    "case_study_urls": [],
    "brochure_url": "",
    "booth_activities_th": [],
    "booth_activities_en": [],
    "website": "",
    "contact_email": "",
    "contact_phone": "",
    "contact_line_id": "",
    "use_cases": []
  },
  {
    "id": "ex16",
    "name": "",
    "logo_url": "📦",
    "booth_no": "TBD",
    "hall": "TBD",
    "industry": "Other",
    "sub_industries": [],
    "solution_categories": [],
    "tagline_th": "",
    "tagline_en": "",
    "description_th": "",
    "description_en": "",
    "long_pitch_en": "",
    "problem_statements_en": [],
    "unique_value_props": [],
    "target_company_sizes": [],
    "target_industries": [],
    "target_roles": [],
    "geographic_focus": [],
    "tech_stack": [],
    "integrations": [],
    "deployment_options": [],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 0,
    "pricing_note_th": "",
    "pricing_note_en": "",
    "founded_year": 2020,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [],
    "certifications": [],
    "awards": [],
    "demo_video_url": "",
    "case_study_urls": [],
    "brochure_url": "",
    "booth_activities_th": [],
    "booth_activities_en": [],
    "website": "",
    "contact_email": "",
    "contact_phone": "",
    "contact_line_id": "",
    "use_cases": []
  },
  {
    "id": "ex17",
    "name": "",
    "logo_url": "📦",
    "booth_no": "TBD",
    "hall": "TBD",
    "industry": "Other",
    "sub_industries": [],
    "solution_categories": [],
    "tagline_th": "",
    "tagline_en": "",
    "description_th": "",
    "description_en": "",
    "long_pitch_en": "",
    "problem_statements_en": [],
    "unique_value_props": [],
    "target_company_sizes": [],
    "target_industries": [],
    "target_roles": [],
    "geographic_focus": [],
    "tech_stack": [],
    "integrations": [],
    "deployment_options": [],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 0,
    "pricing_note_th": "",
    "pricing_note_en": "",
    "founded_year": 2020,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [],
    "certifications": [],
    "awards": [],
    "demo_video_url": "",
    "case_study_urls": [],
    "brochure_url": "",
    "booth_activities_th": [],
    "booth_activities_en": [],
    "website": "",
    "contact_email": "",
    "contact_phone": "",
    "contact_line_id": "",
    "use_cases": []
  },
  {
    "id": "ex18",
    "name": "",
    "logo_url": "📦",
    "booth_no": "TBD",
    "hall": "TBD",
    "industry": "Other",
    "sub_industries": [],
    "solution_categories": [],
    "tagline_th": "",
    "tagline_en": "",
    "description_th": "",
    "description_en": "",
    "long_pitch_en": "",
    "problem_statements_en": [],
    "unique_value_props": [],
    "target_company_sizes": [],
    "target_industries": [],
    "target_roles": [],
    "geographic_focus": [],
    "tech_stack": [],
    "integrations": [],
    "deployment_options": [],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 0,
    "pricing_note_th": "",
    "pricing_note_en": "",
    "founded_year": 2020,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [],
    "certifications": [],
    "awards": [],
    "demo_video_url": "",
    "case_study_urls": [],
    "brochure_url": "",
    "booth_activities_th": [],
    "booth_activities_en": [],
    "website": "",
    "contact_email": "",
    "contact_phone": "",
    "contact_line_id": "",
    "use_cases": []
  },
  {
    "id": "ex19",
    "name": "",
    "logo_url": "📦",
    "booth_no": "TBD",
    "hall": "TBD",
    "industry": "Other",
    "sub_industries": [],
    "solution_categories": [],
    "tagline_th": "",
    "tagline_en": "",
    "description_th": "",
    "description_en": "",
    "long_pitch_en": "",
    "problem_statements_en": [],
    "unique_value_props": [],
    "target_company_sizes": [],
    "target_industries": [],
    "target_roles": [],
    "geographic_focus": [],
    "tech_stack": [],
    "integrations": [],
    "deployment_options": [],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 0,
    "pricing_note_th": "",
    "pricing_note_en": "",
    "founded_year": 2020,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [],
    "certifications": [],
    "awards": [],
    "demo_video_url": "",
    "case_study_urls": [],
    "brochure_url": "",
    "booth_activities_th": [],
    "booth_activities_en": [],
    "website": "",
    "contact_email": "",
    "contact_phone": "",
    "contact_line_id": "",
    "use_cases": []
  },
  {
    "id": "ex20",
    "name": "",
    "logo_url": "📦",
    "booth_no": "TBD",
    "hall": "TBD",
    "industry": "Other",
    "sub_industries": [],
    "solution_categories": [],
    "tagline_th": "",
    "tagline_en": "",
    "description_th": "",
    "description_en": "",
    "long_pitch_en": "",
    "problem_statements_en": [],
    "unique_value_props": [],
    "target_company_sizes": [],
    "target_industries": [],
    "target_roles": [],
    "geographic_focus": [],
    "tech_stack": [],
    "integrations": [],
    "deployment_options": [],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 0,
    "pricing_note_th": "",
    "pricing_note_en": "",
    "founded_year": 2020,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [],
    "certifications": [],
    "awards": [],
    "demo_video_url": "",
    "case_study_urls": [],
    "brochure_url": "",
    "booth_activities_th": [],
    "booth_activities_en": [],
    "website": "",
    "contact_email": "",
    "contact_phone": "",
    "contact_line_id": "",
    "use_cases": []
  },
  {
    "id": "ex21",
    "name": "Sertis",
    "logo_url": "📊",
    "booth_no": "A-03",
    "hall": "Hall A",
    "industry": "AI/SaaS",
    "sub_industries": [
      "AI Consulting",
      "Data Engineering",
      "MLOps"
    ],
    "solution_categories": [
      "Other",
      "Other",
      "Computer Vision"
    ],
    "tagline_th": "ที่ปรึกษา AI และ Data Engineering ชั้นนำของไทย",
    "tagline_en": "Thailand's leading AI and Data Engineering consultancy",
    "description_th": "Sertis ให้บริการที่ปรึกษา AI และ Data Engineering ครบวงจร ครอบคลุม Machine Learning, Computer Vision และ MLOps สำหรับองค์กรขนาดใหญ่",
    "description_en": "Sertis delivers end-to-end AI and data engineering consulting covering ML, Computer Vision, and MLOps for large enterprises across SEA.",
    "long_pitch_en": "Sertis is Thailand's largest AI and data engineering consultancy with 300+ data scientists and engineers. Founded in 2015, we have delivered 500+ AI projects across banking, retail, manufacturing, and logistics. Core capabilities include Machine Learning model development, Computer Vision for quality inspection and retail analytics, NLP for Thai-language document processing, Data Engineering pipeline design, and MLOps infrastructure. Our proprietary framework Cortex accelerates ML deployment from months to weeks. Notable projects include demand forecasting for CPF Group (reduced overstock 22%), defect detection for automotive manufacturing (99.2% precision), and credit scoring models for TISCO Financial Group. We partner with Google Cloud, AWS, and Databricks. ISO 27001 certified and SOC 2 compliant.",
    "problem_statements_en": [
      "Build production-grade ML models",
      "Design scalable data pipelines",
      "Implement MLOps for rapid model iteration",
      "Develop custom Computer Vision solutions",
      "Migrate on-prem data warehouse to cloud"
    ],
    "unique_value_props": [
      "Largest Thai AI team 300+ engineers",
      "Proprietary Cortex MLOps framework",
      "500+ delivered projects across SEA"
    ],
    "target_company_sizes": [
      "Enterprise",
      "SME"
    ],
    "target_industries": [
      "Banking",
      "Retail",
      "Manufacturing",
      "Logistics",
      "Healthcare"
    ],
    "target_roles": [
      "CTO",
      "Chief Data Officer",
      "VP Engineering",
      "Head of AI"
    ],
    "geographic_focus": [
      "TH",
      "SEA"
    ],
    "tech_stack": [
      "Python",
      "Spark",
      "Kubernetes",
      "TensorFlow",
      "PyTorch",
      "dbt",
      "Airflow"
    ],
    "integrations": [
      "Google Cloud",
      "AWS",
      "Azure",
      "Databricks",
      "Snowflake",
      "BigQuery"
    ],
    "deployment_options": [
      "cloud",
      "on-prem",
      "hybrid"
    ],
    "pricing_tier": "enterprise",
    "pricing_model": "project",
    "pricing_starts_at_thb": 500000,
    "pricing_note_th": "ราคาขึ้นอยู่กับ scope โครงการ มี engagement แบบ retainer และแบบโปรเจกต์",
    "pricing_note_en": "Project-based and retainer models available, scoped per engagement",
    "founded_year": 2015,
    "employee_count": "201-500",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [
      "CPF Group",
      "TISCO Financial",
      "Central Retail",
      "SCB",
      "PTT",
      "Thailand Post"
    ],
    "certifications": [
      "ISO 27001",
      "SOC 2 Type II",
      "Google Cloud Premier Partner",
      "AWS Advanced Partner"
    ],
    "awards": [
      "Deloitte Technology Fast 500 Asia 2023",
      "Best AI Company Thailand 2022"
    ],
    "demo_video_url": "https://www.youtube.com/watch?v=sertis-demo",
    "case_study_urls": [
      "https://sertis.com/case-studies/cpf",
      "https://sertis.com/case-studies/tisco"
    ],
    "brochure_url": "https://sertis.com/brochure.pdf",
    "booth_activities_th": [
      "เดโม Computer Vision สด",
      "ประเมิน AI Readiness ฟรี 20 นาที",
      "แจก Data Strategy Playbook"
    ],
    "booth_activities_en": [
      "Live Computer Vision demo",
      "Free 20-min AI Readiness Assessment",
      "Data Strategy Playbook giveaway"
    ],
    "website": "https://sertis.com",
    "contact_email": "contact@sertis.com",
    "contact_phone": "66-2-xxx-xxxx",
    "contact_line_id": "@sertis",
    "use_cases": []
  },
  {
    "id": "ex22",
    "name": "Datawow",
    "logo_url": "🏷️",
    "booth_no": "A-04",
    "hall": "Hall A",
    "industry": "AI/SaaS",
    "sub_industries": [
      "Data Annotation",
      "NLP",
      "Document AI"
    ],
    "solution_categories": [
      "Other",
      "Other",
      "Other"
    ],
    "tagline_th": "แพลตฟอร์ม Data Labeling และ Document AI ที่ดีที่สุดในไทย",
    "tagline_en": "Thailand's best data labeling and document AI platform",
    "description_th": "Datawow ให้บริการ Data Annotation แบบ Human-in-the-loop และ Document AI สำหรับองค์กรที่ต้องการข้อมูลคุณภาพสูงเพื่อเทรน AI",
    "description_en": "Datawow offers human-in-the-loop data annotation and document AI services for enterprises requiring high-quality training data.",
    "long_pitch_en": "Datawow is Thailand's leading data annotation and document AI company. Our platform supports image labeling, text annotation, video tagging, and NLP dataset creation with a community of 5,000+ vetted annotators. For document processing, Datawow ODOO extracts structured data from invoices, contracts, and forms with 98% accuracy using our Thai-language OCR and table extraction engine. Key verticals: Insurance (claim document extraction), Banking (KYC document verification), Legal (contract review and clause extraction), Government (ID card and certificate digitization). We also provide annotation-as-a-service for global AI companies building SEA-language datasets. PDPA-compliant data handling with role-based access control and full audit trails.",
    "problem_statements_en": [
      "Create high-quality labeled datasets for AI training",
      "Automate invoice and document extraction",
      "Digitize ID cards and certificates at scale",
      "Extract clauses from contracts",
      "Build Thai NLP datasets"
    ],
    "unique_value_props": [
      "5000+ vetted Thai annotators on-demand",
      "98% OCR accuracy on Thai documents",
      "Full PDPA-compliant annotation pipeline"
    ],
    "target_company_sizes": [
      "SME",
      "Enterprise",
      "Government"
    ],
    "target_industries": [
      "Insurance",
      "Banking",
      "Other",
      "Government",
      "Other"
    ],
    "target_roles": [
      "Chief Data Officer",
      "Head of AI",
      "IT Director",
      "Operations Manager"
    ],
    "geographic_focus": [
      "TH",
      "SEA"
    ],
    "tech_stack": [
      "Python",
      "FastAPI",
      "React",
      "PostgreSQL",
      "Docker",
      "Google Cloud"
    ],
    "integrations": [
      "Google Drive",
      "SharePoint",
      "SAP",
      "Oracle",
      "REST API"
    ],
    "deployment_options": [
      "cloud",
      "on-prem"
    ],
    "pricing_tier": "mid-market",
    "pricing_model": "usage",
    "pricing_starts_at_thb": 25000,
    "pricing_note_th": "คิดตามจำนวนหน้าเอกสาร หรือจำนวน label ที่ต้องการ",
    "pricing_note_en": "Per-page or per-label pricing depending on service type",
    "founded_year": 2017,
    "employee_count": "51-200",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [
      "Muang Thai Life",
      "Allianz Ayudhya",
      "KBTG",
      "Government Savings Bank",
      "Tilleke & Gibbins"
    ],
    "certifications": [
      "ISO 27001",
      "PDPA-certified"
    ],
    "awards": [
      "Techsauce Top 100 Thai Startup 2023",
      "NSTDA Startup Thailand 2022"
    ],
    "demo_video_url": "https://www.youtube.com/watch?v=datawow-demo",
    "case_study_urls": [
      "https://datawow.io/case-studies/insurance",
      "https://datawow.io/case-studies/banking"
    ],
    "brochure_url": "https://datawow.io/brochure.pdf",
    "booth_activities_th": [
      "ลองส่งเอกสารให้ AI อ่านสด",
      "เดโม annotation platform",
      "ปรึกษา Data Strategy ฟรี"
    ],
    "booth_activities_en": [
      "Live document extraction demo",
      "Annotation platform walkthrough",
      "Free data strategy consultation"
    ],
    "website": "https://datawow.io",
    "contact_email": "hello@datawow.io",
    "contact_phone": "66-2-xxx-xxxx",
    "contact_line_id": "@datawow",
    "use_cases": []
  },
  {
    "id": "ex23",
    "name": "Opn",
    "logo_url": "💳",
    "booth_no": "A-05",
    "hall": "Hall A",
    "industry": "Other",
    "sub_industries": [
      "Payment Gateway",
      "Payment Orchestration",
      "Embedded Finance"
    ],
    "solution_categories": [
      "Other",
      "Other",
      "Other"
    ],
    "tagline_th": "แพลตฟอร์มชำระเงินที่ครอบคลุมที่สุดในเอเชีย",
    "tagline_en": "The most comprehensive payments platform in Asia",
    "description_th": "Opn (เดิมคือ Omise) ให้บริการ Payment Gateway และ Payment Orchestration สำหรับธุรกิจทุกขนาด รองรับช่องทางชำระเงินกว่า 40 ช่องทางในไทย ญี่ปุ่น และสิงคโปร์",
    "description_en": "Opn (formerly Omise) provides payment gateway and orchestration for businesses of all sizes, supporting 40+ payment methods across Thailand, Japan, and Singapore.",
    "long_pitch_en": "Opn is Southeast Asia's leading payment infrastructure company, processing $4B+ annually across Thailand, Japan, and Singapore. Originally founded as Omise in 2013, we rebranded to Opn reflecting our expansion beyond gateway services into payment orchestration, embedded finance, and crypto settlement. Core products: Opn Payments (full-stack gateway with 40+ methods including PromptPay, QR, cards, installments), Opn Connect (payment orchestration routing across multiple acquirers for best success rate), Opn Subscriptions (recurring billing with dunning management), and Opn Links (no-code payment links for SMEs). We serve 10,000+ merchants from Grab Thailand and FoodPanda to AirAsia and KASIKORN Bank. PCI DSS Level 1 certified. Processing reliability: 99.99% uptime SLA.",
    "problem_statements_en": [
      "Accept all Thai payment methods in one integration",
      "Improve payment success rate with smart routing",
      "Set up recurring billing and subscription management",
      "Launch payment links without development",
      "Enable installment payments across all major banks"
    ],
    "unique_value_props": [
      "40+ Thai payment methods in single API",
      "Smart routing for highest success rate",
      "PCI DSS Level 1 highest security standard"
    ],
    "target_company_sizes": [
      "SME",
      "Mid-Market",
      "Enterprise"
    ],
    "target_industries": [
      "E-commerce",
      "Other",
      "Other",
      "Other",
      "Other"
    ],
    "target_roles": [
      "CTO",
      "Product Manager",
      "Head of Finance",
      "CFO"
    ],
    "geographic_focus": [
      "TH",
      "JP",
      "SG",
      "SEA"
    ],
    "tech_stack": [
      "Ruby on Rails",
      "Go",
      "Kubernetes",
      "PostgreSQL",
      "Kafka"
    ],
    "integrations": [
      "Shopify",
      "WooCommerce",
      "Magento",
      "SAP",
      "Salesforce",
      "LINE Shopping"
    ],
    "deployment_options": [
      "cloud"
    ],
    "pricing_tier": "startup",
    "pricing_model": "usage",
    "pricing_starts_at_thb": 0,
    "pricing_note_th": "ไม่มีค่าตั้งต้น คิดต่อ transaction ตามปริมาณ",
    "pricing_note_en": "No setup fee, per-transaction pricing with volume discounts",
    "founded_year": 2013,
    "employee_count": "201-500",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [
      "Grab",
      "AirAsia",
      "FoodPanda",
      "KASIKORN Bank",
      "Uniqlo Thailand",
      "Central Online"
    ],
    "certifications": [
      "PCI DSS Level 1",
      "ISO 27001",
      "Bank of Thailand licensed PSP"
    ],
    "awards": [
      "Forbes Asia 100 to Watch 2022",
      "FinTech of the Year Thailand 2023"
    ],
    "demo_video_url": "https://www.youtube.com/watch?v=opn-demo",
    "case_study_urls": [
      "https://opn.ooo/case-studies/grab",
      "https://opn.ooo/case-studies/airasia"
    ],
    "brochure_url": "https://opn.ooo/brochure.pdf",
    "booth_activities_th": [
      "ลองชำระเงินผ่าน QR สด",
      "สาธิต Payment Link",
      "พูดคุย integration กับทีม engineer"
    ],
    "booth_activities_en": [
      "Live QR payment demo",
      "Payment Link walkthrough",
      "1-on-1 integration consult with engineers"
    ],
    "website": "https://opn.ooo",
    "contact_email": "sales@opn.ooo",
    "contact_phone": "66-2-xxx-xxxx",
    "contact_line_id": "@opnpayments",
    "use_cases": []
  },
  {
    "id": "ex24",
    "name": "Amity",
    "logo_url": "🌐",
    "booth_no": "A-06",
    "hall": "Hall A",
    "industry": "AI/SaaS",
    "sub_industries": [
      "Community Platform",
      "Social SDK",
      "Super-App Features"
    ],
    "solution_categories": [
      "Other",
      "Other",
      "Other"
    ],
    "tagline_th": "SDK สร้าง Community และ Social Features ในแอปของคุณ",
    "tagline_en": "Build community and social features into any app",
    "description_th": "Amity ให้บริการ SDK และ API สำหรับสร้าง Social Features เช่น Chat, Feed, Live Stream และ Community ภายในแอปของธุรกิจ โดยไม่ต้องสร้างจาก scratch",
    "description_en": "Amity provides SDK and API for embedding social features — chat, feed, live streaming, and community — into any app without building from scratch.",
    "long_pitch_en": "Amity (formerly Eko) is a Bangkok-headquartered global company enabling 500M+ end users across 50+ countries to connect through social features built on our platform. Our Social Cloud delivers modular building blocks: Chat (1-on-1, group, channels with rich media), Social Feed (posts, reactions, comments, stories), Live Video (low-latency streaming with interactive features), and Community (topic groups, moderator tools, leaderboards). Used by Super Apps, Banks, Retail, and Gaming companies. Key differentiators: 99.99% uptime at 200ms global latency, real-time moderation with AI content filtering, full white-label UI kits for iOS, Android, React, and Flutter. GDPR and PDPA compliant data residency options.",
    "problem_statements_en": [
      "Add in-app chat to your product in days not months",
      "Build community features without backend engineering",
      "Scale live streaming to millions without CDN complexity",
      "Moderate user-generated content automatically",
      "White-label social features matching your brand"
    ],
    "unique_value_props": [
      "500M+ end users across 50+ countries proven scale",
      "99.99% uptime 200ms global latency",
      "Full white-label UI kits iOS Android React Flutter"
    ],
    "target_company_sizes": [
      "Startup",
      "Mid-Market",
      "Enterprise"
    ],
    "target_industries": [
      "Other",
      "E-commerce",
      "Banking",
      "Other",
      "Other",
      "Healthcare"
    ],
    "target_roles": [
      "CPO",
      "CTO",
      "Head of Product",
      "Mobile Engineering Lead"
    ],
    "geographic_focus": [
      "TH",
      "SEA",
      "Global"
    ],
    "tech_stack": [
      "React Native",
      "Flutter",
      "Swift",
      "Kotlin",
      "Node.js",
      "WebRTC"
    ],
    "integrations": [
      "Firebase",
      "AWS",
      "Google Cloud",
      "Mixpanel",
      "Segment",
      "Braze"
    ],
    "deployment_options": [
      "cloud",
      "hybrid"
    ],
    "pricing_tier": "startup",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 15000,
    "pricing_note_th": "แพ็กเกจ Starter 15000 บาท/เดือน รองรับ MAU สูงสุด 10,000",
    "pricing_note_en": "Starter at 15,000 THB/month up to 10,000 MAU, scales with usage",
    "founded_year": 2017,
    "employee_count": "201-500",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [
      "Grab",
      "IKEA Southeast Asia",
      "KasikornBank",
      "SCG",
      "Line Man"
    ],
    "certifications": [
      "ISO 27001",
      "SOC 2 Type II",
      "GDPR",
      "PDPA-compliant"
    ],
    "awards": [
      "Forbes 30 Under 30 Asia 2021 (Founder)",
      "Google for Startups Accelerator SEA"
    ],
    "demo_video_url": "https://www.youtube.com/watch?v=amity-demo",
    "case_study_urls": [
      "https://amity.co/case-studies/grab",
      "https://amity.co/case-studies/kasikorn"
    ],
    "brochure_url": "https://amity.co/brochure.pdf",
    "booth_activities_th": [
      "ลอง build community feature ใน 15 นาที",
      "เดโม Live Streaming SDK สด",
      "รับ free trial 3 เดือน"
    ],
    "booth_activities_en": [
      "Build a community feature in 15 min",
      "Live Streaming SDK demo",
      "Get 3-month free trial"
    ],
    "website": "https://amity.co",
    "contact_email": "sales@amity.co",
    "contact_phone": "66-2-xxx-xxxx",
    "contact_line_id": "@amityco",
    "use_cases": []
  },
  {
    "id": "ex25",
    "name": "SCB TechX",
    "logo_url": "🏦",
    "booth_no": "A-07",
    "hall": "Hall A",
    "industry": "Other",
    "sub_industries": [
      "Open Banking",
      "API Platform",
      "Financial Super App"
    ],
    "solution_categories": [
      "Other",
      "Other",
      "Other"
    ],
    "tagline_th": "เปิด API ธนาคารให้ธุรกิจทุกขนาดใช้ได้",
    "tagline_en": "Open banking APIs for businesses of all sizes",
    "description_th": "SCB TechX บริษัท Tech ในเครือธนาคารไทยพาณิชย์ เปิดให้บริการ Open Banking API ครอบคลุมการโอนเงิน บัญชีเงินฝาก สินเชื่อ และ KYC สำหรับ developer และองค์กร",
    "description_en": "SCB TechX, tech arm of SCB bank, provides Open Banking APIs covering transfers, accounts, lending, and KYC for developers and enterprises.",
    "long_pitch_en": "SCB TechX is the technology engine of SCB (Siam Commercial Bank), Thailand's oldest bank with $100B+ in assets. We provide three core API products: SCB Easy API (open banking for transfers, account info, QR payment, bill payment), Embedded Lending API (integrate consumer and SME loans into any platform with real-time decisioning in under 3 seconds), and eKYC API (face liveness check, ID card OCR, and fraud screening). Our developer portal developer.scb.co.th serves 3,000+ registered developers with sandbox access, Postman collections, and 24/7 technical support. Notable integrations: JD Central (embedded shopping finance), Shopee Thailand (seller loans via SCB API), and multiple HR platforms offering salary-advance products. Regulated by Bank of Thailand with full API banking license.",
    "problem_statements_en": [
      "Embed bank transfers and PromptPay into your platform",
      "Offer instant loans at the point of sale",
      "Automate KYC with face and ID verification",
      "Build salary advance product for your employees",
      "Access real-time account balance for financial planning apps"
    ],
    "unique_value_props": [
      "Only API-first bank platform regulated by Bank of Thailand",
      "3-second real-time loan decisioning",
      "3000+ developers on sandbox already"
    ],
    "target_company_sizes": [
      "Startup",
      "SME",
      "Enterprise"
    ],
    "target_industries": [
      "E-commerce",
      "Other",
      "Insurance",
      "Real Estate",
      "Logistics"
    ],
    "target_roles": [
      "CTO",
      "Head of Product",
      "CFO",
      "Business Development Director"
    ],
    "geographic_focus": [
      "TH"
    ],
    "tech_stack": [
      "Java",
      "Node.js",
      "REST API",
      "OpenAPI 3.0",
      "OAuth 2.0"
    ],
    "integrations": [
      "Shopify",
      "SAP",
      "LINE",
      "PromptPay",
      "NDID"
    ],
    "deployment_options": [
      "cloud"
    ],
    "pricing_tier": "startup",
    "pricing_model": "usage",
    "pricing_starts_at_thb": 0,
    "pricing_note_th": "ไม่มีค่า subscription สำหรับ SME คิดตาม transaction volume",
    "pricing_note_en": "No subscription for SME, transaction-based pricing",
    "founded_year": 2020,
    "employee_count": "201-500",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [
      "JD Central",
      "Shopee Thailand",
      "Major Thai HR platforms"
    ],
    "certifications": [
      "Bank of Thailand Open Banking License",
      "ISO 27001",
      "PCI DSS Level 1"
    ],
    "awards": [
      "Best Open Banking API Thailand 2024",
      "IDC FinTech Rankings 2023"
    ],
    "demo_video_url": "https://www.youtube.com/watch?v=scbtechx-demo",
    "case_study_urls": [
      "https://developer.scb.co.th/case-studies/jd-central"
    ],
    "brochure_url": "https://developer.scb.co.th/brochure.pdf",
    "booth_activities_th": [
      "ลองเรียก API โอนเงิน sandbox สด",
      "แนะนำ use case Embedded Lending",
      "สมัคร developer account ฟรีทันที"
    ],
    "booth_activities_en": [
      "Live sandbox transfer API call",
      "Embedded Lending use case walkthrough",
      "Instant free developer account signup"
    ],
    "website": "https://developer.scb.co.th",
    "contact_email": "apipartner@scb.co.th",
    "contact_phone": "66-2-xxx-xxxx",
    "contact_line_id": "@scbtechx",
    "use_cases": []
  },
  {
    "id": "ex26",
    "name": "Computerlogy",
    "logo_url": "📡",
    "booth_no": "A-08",
    "hall": "Hall A",
    "industry": "Other",
    "sub_industries": [
      "Social Analytics",
      "Brand Intelligence",
      "Influencer Marketing"
    ],
    "solution_categories": [
      "Other",
      "Other",
      "Other"
    ],
    "tagline_th": "วิเคราะห์ Social Media และ Influencer อย่างแม่นยำด้วย AI",
    "tagline_en": "Precise social media and influencer analytics powered by AI",
    "description_th": "Computerlogy ให้บริการ Social Analytics และ Influencer Intelligence ช่วยให้แบรนด์เข้าใจ sentiment ผู้บริโภค วัดผล campaign และค้นหา influencer ที่เหมาะสมได้อย่างแม่นยำ",
    "description_en": "Computerlogy provides social analytics and influencer intelligence helping brands understand consumer sentiment, measure campaigns, and find the right influencers.",
    "long_pitch_en": "Computerlogy has been analyzing Thai social media since 2011, with the most comprehensive historical database of Thai social data including Twitter, Facebook, Instagram, TikTok, YouTube, Pantip, and news sites. Our platform Social Eye tracks 50M+ Thai social posts daily. Key modules: Brand Intelligence (real-time brand mention tracking, sentiment analysis, share of voice), Influencer Finder (database of 500,000+ Thai influencers with authentic engagement metrics, fake follower detection), Campaign Tracker (measure reach, earned media value, and content performance across influencer activations), and Crisis Alert (early warning system for negative viral content). AI-powered Thai sentiment analysis trained on 100M+ annotated posts. Trusted by 300+ brands including Unilever, P&G, L'Oreal, and AIS.",
    "problem_statements_en": [
      "Monitor brand reputation across all Thai social platforms",
      "Find the right influencers with genuine engagement",
      "Measure earned media value of influencer campaigns",
      "Detect early warning signs of brand crisis",
      "Benchmark brand against competitors"
    ],
    "unique_value_props": [
      "Thai social data since 2011 largest historical archive",
      "500,000+ influencer database with fake-follower detection",
      "Crisis alert within 15 minutes of viral spike"
    ],
    "target_company_sizes": [
      "SME",
      "Mid-Market",
      "Enterprise",
      "SME"
    ],
    "target_industries": [
      "Other",
      "Automotive",
      "Banking",
      "Telecom",
      "Other",
      "Other"
    ],
    "target_roles": [
      "CMO",
      "Brand Manager",
      "Digital Marketing Manager",
      "PR Director"
    ],
    "geographic_focus": [
      "TH"
    ],
    "tech_stack": [
      "Python",
      "Elasticsearch",
      "Kafka",
      "React",
      "TensorFlow"
    ],
    "integrations": [
      "Google Analytics",
      "Meta Business Suite",
      "TikTok for Business",
      "HubSpot"
    ],
    "deployment_options": [
      "cloud"
    ],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 20000,
    "pricing_note_th": "แพ็กเกจ Standard 20,000 บาท/เดือน รองรับ 10 brand profiles",
    "pricing_note_en": "Standard package 20,000 THB/month for 10 brand profiles",
    "founded_year": 2011,
    "employee_count": "51-200",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [
      "Unilever",
      "P&G",
      "L'Oreal",
      "AIS",
      "Toyota Thailand",
      "PTT"
    ],
    "certifications": [
      "ISO 27001",
      "Meta Business Partner",
      "TikTok Marketing Partner"
    ],
    "awards": [
      "Thailand Social Awards Best Analytics Platform 2023",
      "TikTok Marketing Partner of the Year 2022"
    ],
    "demo_video_url": "https://www.youtube.com/watch?v=computerlogy-demo",
    "case_study_urls": [
      "https://computerlogy.com/case-studies/unilever",
      "https://computerlogy.com/case-studies/ais"
    ],
    "brochure_url": "https://computerlogy.com/brochure.pdf",
    "booth_activities_th": [
      "ค้นหา influencer ที่เหมาะกับ brand ฟรี",
      "ดู real-time social dashboard",
      "รับ Influencer Benchmark Report ฟรี"
    ],
    "booth_activities_en": [
      "Free influencer match for your brand",
      "Live social dashboard walkthrough",
      "Free Influencer Benchmark Report"
    ],
    "website": "https://computerlogy.com",
    "contact_email": "hello@computerlogy.com",
    "contact_phone": "66-2-xxx-xxxx",
    "contact_line_id": "@computerlogy",
    "use_cases": []
  },
  {
    "id": "ex27",
    "name": "FlowAccount",
    "logo_url": "📒",
    "booth_no": "B-01",
    "hall": "Hall B",
    "industry": "Other",
    "sub_industries": [
      "Cloud Accounting",
      "SME Finance",
      "Tax Automation"
    ],
    "solution_categories": [
      "Other",
      "Other",
      "Other"
    ],
    "tagline_th": "โปรแกรมบัญชีออนไลน์สำหรับ SME ไทย ง่าย ครบ ถูกกฎหมาย",
    "tagline_en": "Online accounting software for Thai SMEs — simple, complete, compliant",
    "description_th": "FlowAccount คือโปรแกรมบัญชีออนไลน์สำหรับ SME ไทย ครอบคลุมการออกใบกำกับภาษี ใบเสนอราคา บัญชีรายรับ-รายจ่าย และส่งออกรายงาน VAT และ ภ.ง.ด. โดยตรง",
    "description_en": "FlowAccount is cloud accounting software for Thai SMEs covering tax invoicing, quotations, income/expense tracking, and direct VAT and WHT report filing.",
    "long_pitch_en": "FlowAccount serves 100,000+ Thai SMEs with cloud accounting that meets all Thai Revenue Department requirements. Founded in 2015 by ex-Google engineers, we are the most used SME accounting platform in Thailand. Core features: Tax Invoice & Receipt Builder (e-Tax Invoice via ETDA, QR invoice), Quotation & Sales Order management, Purchase Order and expense approval workflows, VAT Return and Withholding Tax one-click export, Bank Reconciliation with auto-matching for KBank, SCB, BBL, KTB, and BAY, and Payroll module for up to 100 employees. Integrations with Shopify, WooCommerce, Lazada, Shopee, and LINE Shopping for automatic order-to-invoice. Accountants can manage multiple clients from a single portal. Mobile app for on-the-go receipt capture with OCR.",
    "problem_statements_en": [
      "Issue e-Tax Invoices compliant with Thai Revenue Department",
      "File VAT returns without an accountant",
      "Reconcile bank statements automatically",
      "Connect online store to accounting automatically",
      "Manage payroll and withholding tax for small team"
    ],
    "unique_value_props": [
      "100,000+ Thai SMEs trust FlowAccount",
      "Direct ETDA-certified e-Tax Invoice",
      "Auto bank reconciliation for all major Thai banks"
    ],
    "target_company_sizes": [
      "SME",
      "SME"
    ],
    "target_industries": [
      "Retail",
      "Other",
      "Other",
      "Manufacturing",
      "Other"
    ],
    "target_roles": [
      "Business Owner",
      "CFO",
      "Accountant",
      "Bookkeeper"
    ],
    "geographic_focus": [
      "TH"
    ],
    "tech_stack": [
      "React",
      "Node.js",
      "PostgreSQL",
      "AWS",
      "Plaid Thailand"
    ],
    "integrations": [
      "Shopify",
      "WooCommerce",
      "Lazada",
      "Shopee",
      "LINE Shopping",
      "KBank",
      "SCB",
      "BBL",
      "ETDA"
    ],
    "deployment_options": [
      "cloud"
    ],
    "pricing_tier": "startup",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 990,
    "pricing_note_th": "แพ็กเกจเริ่มต้น 990 บาท/เดือน รวม e-Tax Invoice และ VAT report",
    "pricing_note_en": "Starter 990 THB/month includes e-Tax Invoice and VAT reports",
    "founded_year": 2015,
    "employee_count": "51-200",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [
      "100,000+ Thai SMEs",
      "Major Thai accounting firms as resellers"
    ],
    "certifications": [
      "ETDA e-Tax Invoice Certified",
      "Revenue Department approved",
      "ISO 27001"
    ],
    "awards": [
      "Google for Startups SEA Alumni",
      "Best SME Fintech Thailand 2022",
      "Startup Thailand 2021"
    ],
    "demo_video_url": "https://www.youtube.com/watch?v=flowaccount-demo",
    "case_study_urls": [
      "https://flowaccount.com/blog/case-studies"
    ],
    "brochure_url": "https://flowaccount.com/brochure.pdf",
    "booth_activities_th": [
      "ทดลองออกใบกำกับภาษี e-Tax Invoice สด",
      "คำนวณ VAT และ ภ.ง.ด. ฟรี",
      "ปรึกษาผู้เชี่ยวชาญบัญชี"
    ],
    "booth_activities_en": [
      "Issue live e-Tax Invoice demo",
      "Free VAT and WHT calculation",
      "Consult our accounting experts"
    ],
    "website": "https://flowaccount.com",
    "contact_email": "sales@flowaccount.com",
    "contact_phone": "66-2-xxx-xxxx",
    "contact_line_id": "@flowaccount",
    "use_cases": []
  },
  {
    "id": "ex28",
    "name": "Jitta",
    "logo_url": "📈",
    "booth_no": "B-02",
    "hall": "Hall B",
    "industry": "Other",
    "sub_industries": [
      "Investment Analytics",
      "Stock Screening",
      "Wealth Tech"
    ],
    "solution_categories": [
      "Other",
      "Other",
      "Other"
    ],
    "tagline_th": "วิเคราะห์หุ้นอย่างมืออาชีพด้วย AI",
    "tagline_en": "AI-powered professional stock analysis for every investor",
    "description_th": "Jitta แพลตฟอร์ม Investment Intelligence ที่ใช้ AI วิเคราะห์หุ้นทั่วโลกกว่า 65,000 ตัว ด้วย Jitta Score และ Jitta Line ช่วยนักลงทุนหาหุ้นดีในราคาที่เหมาะสม",
    "description_en": "Jitta is an AI investment intelligence platform analyzing 65,000+ global stocks via Jitta Score and Jitta Line, helping investors find quality stocks at the right price.",
    "long_pitch_en": "Jitta is Thailand's leading investment analytics platform with 500,000+ users across 25+ countries. Our proprietary AI analyzes 65,000+ stocks across 40+ exchanges using fundamental analysis, generating Jitta Score (business quality 0-10) and Jitta Line (intrinsic value trend) for every stock. Products: Jitta Web (stock screener, watchlist, portfolio tracker), Jitta Wealth (automated investing with robo-advisor portfolios based on Jitta methodology), and Jitta API (data feed for financial institutions and developers). Our Jitta Score algorithm analyzes 10 years of financial statements, calculating metrics including earnings consistency, return on equity, debt levels, and growth quality. Institutional products serve Thai asset managers and family offices with custom screening and factor models. Listed Thai stocks, US stocks, and 38 other markets covered.",
    "problem_statements_en": [
      "Analyze thousands of stocks in seconds not weeks",
      "Find undervalued quality stocks automatically",
      "Track portfolio performance against benchmarks",
      "Access fundamental stock data via API",
      "Build automated investment strategy based on fundamentals"
    ],
    "unique_value_props": [
      "65,000+ stocks analyzed in 40+ exchanges automatically",
      "Jitta Score proven track record",
      "Robo-advisor powered by 10-year fundamental analysis"
    ],
    "target_company_sizes": [
      "SME",
      "SME",
      "Enterprise"
    ],
    "target_industries": [
      "Other",
      "Other",
      "Other",
      "Banking"
    ],
    "target_roles": [
      "Individual Investor",
      "Fund Manager",
      "Financial Advisor",
      "Analyst"
    ],
    "geographic_focus": [
      "TH",
      "Global"
    ],
    "tech_stack": [
      "Python",
      "React",
      "PostgreSQL",
      "AWS",
      "Machine Learning"
    ],
    "integrations": [
      "SET Market Data",
      "Bloomberg",
      "Refinitiv",
      "XBRL Financial Reports"
    ],
    "deployment_options": [
      "cloud"
    ],
    "pricing_tier": "startup",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 390,
    "pricing_note_th": "Premium 390 บาท/เดือน เข้าถึง Jitta Score ทั้งหมดและ Jitta Wealth",
    "pricing_note_en": "Premium 390 THB/month, full Jitta Score access and Jitta Wealth included",
    "founded_year": 2012,
    "employee_count": "51-200",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [
      "500,000+ retail investors",
      "Thai asset management firms",
      "Family offices"
    ],
    "certifications": [
      "SEC Thailand Registered",
      "AIMC Member"
    ],
    "awards": [
      "Best FinTech App Thailand 2023",
      "Forbes Asia 100 Digital Stars",
      "G-Startup Worldwide Winner"
    ],
    "demo_video_url": "https://www.youtube.com/watch?v=jitta-demo",
    "case_study_urls": [
      "https://jitta.com/blog/case-studies"
    ],
    "brochure_url": "https://jitta.com/brochure.pdf",
    "booth_activities_th": [
      "สแกนหุ้นเด่นด้วย Jitta Score สด",
      "วิเคราะห์พอร์ตของคุณฟรี",
      "ลองใช้ Jitta Wealth ไม่ต้องลงทุนจริง"
    ],
    "booth_activities_en": [
      "Live stock scan with Jitta Score",
      "Free portfolio analysis",
      "Try Jitta Wealth with paper trading"
    ],
    "website": "https://jitta.com",
    "contact_email": "contact@jitta.com",
    "contact_phone": "66-2-xxx-xxxx",
    "contact_line_id": "@jitta",
    "use_cases": []
  },
  {
    "id": "ex29",
    "name": "Nipa Cloud",
    "logo_url": "☁️",
    "booth_no": "B-03",
    "hall": "Hall B",
    "industry": "Other",
    "sub_industries": [
      "Public Cloud",
      "Private Cloud",
      "Managed Services"
    ],
    "solution_categories": [
      "Other",
      "Other",
      "Other",
      "Other"
    ],
    "tagline_th": "Cloud ของคนไทย มั่นคง ปลอดภัย ข้อมูลอยู่ในไทย",
    "tagline_en": "Thai cloud — reliable, secure, data stays in Thailand",
    "description_th": "Nipa Cloud ผู้ให้บริการ Cloud Infrastructure สัญชาติไทย ด้วย Data Center ในประเทศไทย 100% รองรับ PDPA, EEC Digital Park และ Cloud First Policy ของภาครัฐ",
    "description_en": "Nipa Cloud is a Thai cloud infrastructure provider with 100% Thailand data centers, supporting PDPA compliance, EEC Digital Park, and government cloud-first policy.",
    "long_pitch_en": "Nipa Cloud is Thailand's largest independent cloud provider with 3 data centers (Bangkok, Chonburi EEC, and Chiang Mai) offering compute, storage, networking, and managed services — all on Thai soil. Founded in 2017, we serve 500+ enterprise customers requiring data sovereignty, Thai-language support, and local compliance. Core services: Nipa Compute (VMs with Thai baht billing, no FX risk), Nipa Kubernetes Service (managed K8s with Thai support team), Nipa Object Storage (S3-compatible, PDPA-certified), Nipa CDN (17 Thailand PoP nodes), and Nipa Managed Security (SOC monitoring with Thai analysts). Key advantage for regulated industries: data never leaves Thailand, relevant for banking (BOT cloud circular), insurance (OIC cloud policy), and government (OCSC cloud policy). We are a certified provider under Thailand Government Cloud (G-Cloud) program.",
    "problem_statements_en": [
      "Keep data in Thailand for PDPA and regulatory compliance",
      "Avoid FX risk with THB-denominated cloud billing",
      "Get Thai-language support 24/7",
      "Meet BOT cloud circular requirements for banks",
      "Migrate government workloads to G-Cloud certified provider"
    ],
    "unique_value_props": [
      "100% Thailand data centers no data sovereignty risk",
      "THB billing no FX exposure",
      "G-Cloud certified provider for government"
    ],
    "target_company_sizes": [
      "SME",
      "Enterprise",
      "Government"
    ],
    "target_industries": [
      "Banking",
      "Insurance",
      "Healthcare",
      "Government",
      "Manufacturing"
    ],
    "target_roles": [
      "CTO",
      "CIO",
      "IT Director",
      "Head of Infrastructure",
      "CISO"
    ],
    "geographic_focus": [
      "TH"
    ],
    "tech_stack": [
      "OpenStack",
      "Kubernetes",
      "Ceph",
      "VMware",
      "Terraform",
      "Ansible"
    ],
    "integrations": [
      "AWS (hybrid)",
      "Azure (hybrid)",
      "Terraform",
      "Kubernetes",
      "GitLab"
    ],
    "deployment_options": [
      "cloud",
      "on-prem",
      "hybrid"
    ],
    "pricing_tier": "startup",
    "pricing_model": "usage",
    "pricing_starts_at_thb": 500,
    "pricing_note_th": "VM เริ่มต้น 500 บาท/เดือน ชำระเป็น THB ไม่มี FX risk",
    "pricing_note_en": "VMs from 500 THB/month, THB billing, no FX risk",
    "founded_year": 2017,
    "employee_count": "51-200",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [
      "Krungthai Bank",
      "CAT Telecom",
      "Government Savings Bank",
      "EEC Digital Park",
      "TOT"
    ],
    "certifications": [
      "ISO 27001",
      "ISO 27017",
      "ISO 27018",
      "G-Cloud Certified",
      "PDPA-certified",
      "CSA STAR"
    ],
    "awards": [
      "Thailand Cloud Provider of the Year 2023",
      "EEC Cloud Excellence Award 2022"
    ],
    "demo_video_url": "https://www.youtube.com/watch?v=nipa-demo",
    "case_study_urls": [
      "https://nipa.cloud/case-studies/banking",
      "https://nipa.cloud/case-studies/government"
    ],
    "brochure_url": "https://nipa.cloud/brochure.pdf",
    "booth_activities_th": [
      "รับ Cloud Credit 5,000 บาทฟรี",
      "ประเมิน Cloud Migration ฟรี",
      "เดโม NKS Managed Kubernetes"
    ],
    "booth_activities_en": [
      "5,000 THB free cloud credit",
      "Free cloud migration assessment",
      "NKS Managed Kubernetes demo"
    ],
    "website": "https://nipa.cloud",
    "contact_email": "sales@nipa.cloud",
    "contact_phone": "66-2-xxx-xxxx",
    "contact_line_id": "@nipacloud",
    "use_cases": []
  },
  {
    "id": "ex30",
    "name": "Skooldio",
    "logo_url": "🎓",
    "booth_no": "B-04",
    "hall": "Hall B",
    "industry": "Other",
    "sub_industries": [
      "Corporate Training",
      "Upskilling",
      "Data & Tech Courses"
    ],
    "solution_categories": [
      "Other",
      "Other",
      "Other"
    ],
    "tagline_th": "พัฒนาทักษะ Data และ Tech ให้องค์กรของคุณ",
    "tagline_en": "Build data and tech skills for your organization",
    "description_th": "Skooldio แพลตฟอร์ม Upskilling สำหรับองค์กร เปิดสอน Data Science, AI, Python, Product Design และ Digital Marketing โดยผู้เชี่ยวชาญจากบริษัท Tech ชั้นนำ",
    "description_en": "Skooldio is a corporate upskilling platform offering Data Science, AI, Python, Product Design, and Digital Marketing taught by experts from leading tech companies.",
    "long_pitch_en": "Skooldio is Thailand's leading tech upskilling platform with 50,000+ learners and 200+ corporate clients. Founded by ex-Google and ex-Agoda engineers, we create high-quality online and blended learning programs in Data Science, Machine Learning, Python, SQL, Product Management, UX Design, and Digital Marketing — all taught in Thai by practitioners from top tech companies. Corporate solutions: Skooldio for Enterprise (custom learning paths, cohort-based courses, manager dashboards with skill gap analytics), Tech Assessment (coding and data tests for hiring), and Bootcamp Lite (intensive 3-month programs for career switchers). Partner with KBank, PTT, CP Group, and 50+ large enterprises for digital transformation upskilling. Recognized by Google for Education and LinkedIn Learning as top regional partner.",
    "problem_statements_en": [
      "Upskill employees in data and AI for digital transformation",
      "Assess technical skills before hiring",
      "Build internal data team from non-technical staff",
      "Create custom learning path for organization roles",
      "Track learning progress and skill development ROI"
    ],
    "unique_value_props": [
      "Thai-language tech courses taught by Google Agoda Grab alumni",
      "200+ enterprise clients with measurable skill outcomes",
      "Coding assessment tool integrated with hiring workflow"
    ],
    "target_company_sizes": [
      "SME",
      "Enterprise",
      "Government"
    ],
    "target_industries": [
      "Banking",
      "Telecom",
      "Other",
      "Government",
      "Manufacturing",
      "Retail"
    ],
    "target_roles": [
      "CHRO",
      "L&D Director",
      "CTO",
      "Department Head",
      "HR Manager"
    ],
    "geographic_focus": [
      "TH",
      "SEA"
    ],
    "tech_stack": [
      "React",
      "Node.js",
      "AWS",
      "Video Streaming",
      "LMS",
      "Assessment Engine"
    ],
    "integrations": [
      "SAP SuccessFactors",
      "Workday",
      "Microsoft Teams",
      "Zoom",
      "Google Workspace"
    ],
    "deployment_options": [
      "cloud"
    ],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 3500,
    "pricing_note_th": "รายบุคคล 3,500 บาท/หลักสูตร องค์กรติดต่อเพื่อรับ volume pricing",
    "pricing_note_en": "Individual 3,500 THB/course, enterprise volume pricing available",
    "founded_year": 2019,
    "employee_count": "51-200",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [
      "KBank",
      "PTT",
      "CP Group",
      "Central Group",
      "KPMG Thailand",
      "Deloitte Thailand"
    ],
    "certifications": [
      "Google for Education Partner",
      "AWS Training Partner",
      "LinkedIn Learning Partner"
    ],
    "awards": [
      "Thailand EdTech of the Year 2023",
      "StartupThailand Best B2B EdTech 2022"
    ],
    "demo_video_url": "https://www.youtube.com/watch?v=skooldio-demo",
    "case_study_urls": [
      "https://skooldio.com/case-studies/kbank",
      "https://skooldio.com/case-studies/ptt"
    ],
    "brochure_url": "https://skooldio.com/brochure.pdf",
    "booth_activities_th": [
      "ลองทำ Data Skill Assessment ฟรี",
      "เดโม Enterprise Learning Dashboard",
      "พูดคุย L&D Strategy สำหรับองค์กร"
    ],
    "booth_activities_en": [
      "Free Data Skill Assessment",
      "Enterprise Learning Dashboard demo",
      "L&D strategy consultation"
    ],
    "website": "https://skooldio.com",
    "contact_email": "enterprise@skooldio.com",
    "contact_phone": "66-2-xxx-xxxx",
    "contact_line_id": "@skooldio",
    "use_cases": []
  }
];
