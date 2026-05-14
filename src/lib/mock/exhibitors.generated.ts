/* eslint-disable */
/**
 * AUTO-GENERATED — do not edit by hand. Run `npm run sync:sheet` to refresh.
 *
 * Source: Google Sheet "EventIQ - Exhibitors Mock Data"
 *   https://docs.google.com/spreadsheets/d/1Jez5HQ0SsPmvHoceEWTGHNIBdmUprR_1ImLNg9hNN78/edit
 *
 * Generated at: 2026-05-14T07:47:45.158Z
 * Total rows in sheet: 30
 * Validation errors: 2
 * Valid exhibitors: 28
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
    "name": "Google Cloud",
    "logo_url": "☁️",
    "booth_no": "A-010",
    "hall": "Hall A",
    "industry": "Other",
    "sub_industries": [
      "Cloud Infrastructure",
      "Data Analytics",
      "Artificial Intelligence",
      "Machine Learning"
    ],
    "solution_categories": [
      "Other",
      "Other",
      "Other",
      "Other",
      "Other"
    ],
    "tagline_th": "แพลตฟอร์ม Cloud และ AI สำหรับองค์กรที่ต้องการ scale ข้อมูลและระบบ",
    "tagline_en": "Cloud and AI platform for scalable enterprise transformation",
    "description_th": "Google Cloud ให้บริการ cloud infrastructure, data analytics และ AI platform สำหรับองค์กรที่ต้องการพัฒนาแอป AI วิเคราะห์ข้อมูล และย้ายระบบขึ้น cloud",
    "description_en": "Google Cloud provides cloud infrastructure, data analytics and AI platforms for enterprises building AI applications, modern data platforms and scalable cloud systems.",
    "long_pitch_en": "Google Cloud helps teams reduce infrastructure cost, scale data analytics, build generative AI applications, deploy machine learning models, improve compliance, modernize legacy systems and connect cloud services across global operations. Visitors searching for AI, cost optimization, cloud migration, data warehouse, analytics, Gemini, Vertex AI, Kubernetes, BigQuery, compliance or scale should visit this booth.",
    "problem_statements_en": [
      "High cloud cost",
      "Data silos",
      "Slow AI adoption",
      "Legacy infrastructure",
      "Limited analytics scale"
    ],
    "unique_value_props": [
      "Global cloud infrastructure",
      "Strong AI and data ecosystem",
      "Enterprise-grade security and compliance",
      "Deep analytics with BigQuery"
    ],
    "target_company_sizes": [
      "Startup",
      "SME",
      "Enterprise"
    ],
    "target_industries": [
      "Other",
      "Finance",
      "Retail",
      "Healthcare",
      "Manufacturing",
      "Education"
    ],
    "target_roles": [
      "CTO",
      "CIO",
      "Head of Data",
      "AI Engineer",
      "Cloud Architect",
      "Data Scientist"
    ],
    "geographic_focus": [
      "Global"
    ],
    "tech_stack": [
      "Google Cloud",
      "Vertex AI",
      "BigQuery",
      "Kubernetes",
      "Gemini",
      "Cloud Storage"
    ],
    "integrations": [
      "Looker",
      "Salesforce",
      "SAP",
      "GitHub",
      "Databricks",
      "Snowflake"
    ],
    "deployment_options": [
      "cloud"
    ],
    "pricing_tier": "enterprise",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 30000,
    "pricing_note_th": "ทดลองใช้ฟรี 90 วัน พร้อมเครดิตใช้งาน Google Cloud",
    "pricing_note_en": "Pricing depends on service usage, region, committed use and enterprise agreement.",
    "founded_year": 2008,
    "employee_count": "11-50",
    "headquarters": "Mountain View, California, USA",
    "notable_clients": [
      "Spotify",
      "PayPal",
      "HSBC",
      "Toyota",
      "Target"
    ],
    "certifications": [
      "ISO 27001",
      "SOC 2",
      "GDPR",
      "HIPAA eligible"
    ],
    "awards": [
      "Forrester Wave Leader",
      "Gartner Magic Quadrant Leader for Cloud AI Developer Services"
    ],
    "demo_video_url": "https://www.youtube.com/@googlecloud",
    "case_study_urls": [
      "https://cloud.google.com/customers"
    ],
    "brochure_url": "https://cloud.google.com/resources",
    "booth_activities_th": [
      "ทดลอง Vertex AI demo",
      "ปรึกษา cloud migration",
      "รับ checklist AI readiness"
    ],
    "booth_activities_en": [
      "Try Vertex AI demo",
      "Discuss cloud migration",
      "Get AI readiness checklist"
    ],
    "website": "https://cloud.google.com",
    "contact_email": "cloud-sales@google.com",
    "contact_phone": "+66-2-xxx-xxxx",
    "contact_line_id": "@eventiq-cloud",
    "use_cases": [
      {
        "title": "Generative AI Application Development",
        "problem": "Teams need to build AI assistants and search experiences without managing complex infrastructure.",
        "outcome": "Deploy scalable AI applications using Vertex AI and Gemini."
      },
      {
        "title": "Cloud Data Warehouse Modernization",
        "problem": "Data is fragmented across legacy systems and reporting is slow.",
        "outcome": "Centralize analytics with BigQuery and improve decision speed."
      },
      {
        "title": "Cloud Cost Optimization",
        "problem": "Cloud spend grows without visibility or governance.",
        "outcome": "Improve cost control through usage monitoring, architecture review and committed use planning."
      }
    ]
  },
  {
    "id": "ex04",
    "name": "Salesforce",
    "logo_url": "🌈",
    "booth_no": "A-11",
    "hall": "Hall A",
    "industry": "Other",
    "sub_industries": [
      "Customer Relationship Management",
      "Sales Automation",
      "Service Automation",
      "Marketing Automation"
    ],
    "solution_categories": [
      "Other",
      "Other",
      "Other",
      "Other",
      "Other"
    ],
    "tagline_th": "รวมข้อมูลลูกค้า ฝ่ายขาย บริการ และการตลาดไว้ในแพลตฟอร์มเดียว",
    "tagline_en": "AI-powered CRM for connected customer experiences",
    "description_th": "Salesforce เป็นแพลตฟอร์ม CRM สำหรับการขาย บริการลูกค้า การตลาด ข้อมูลลูกค้า และ AI เพื่อช่วยให้องค์กรสร้างประสบการณ์ลูกค้าที่ต่อเนื่อง",
    "description_en": "Salesforce provides CRM applications for sales, service, marketing, customer data and AI-powered customer engagement.",
    "long_pitch_en": "Salesforce helps businesses reduce customer service cost, automate sales follow-up, personalize marketing, improve customer retention, unify customer data, scale CRM operations and use AI agents for support, lead management and service workflows. Visitors searching for CRM, customer journey, sales pipeline, service automation, AI agent, personalization, compliance or customer data should visit this booth.",
    "problem_statements_en": [
      "Disconnected customer data",
      "Slow sales follow-up",
      "High support cost",
      "Poor customer visibility",
      "Low retention"
    ],
    "unique_value_props": [
      "Market-leading CRM ecosystem",
      "Strong partner marketplace",
      "AI-powered customer engagement",
      "Unified customer data platform"
    ],
    "target_company_sizes": [
      "SME",
      "Enterprise"
    ],
    "target_industries": [
      "Retail",
      "Finance",
      "Healthcare",
      "Telecom",
      "Education",
      "Other"
    ],
    "target_roles": [
      "CMO",
      "Sales Director",
      "Customer Experience Manager",
      "Service Manager",
      "CRM Admin",
      "RevOps Lead"
    ],
    "geographic_focus": [
      "Global"
    ],
    "tech_stack": [
      "Salesforce Platform",
      "Einstein AI",
      "Data Cloud",
      "Tableau",
      "Apex"
    ],
    "integrations": [
      "Slack",
      "Google Workspace",
      "Microsoft 365",
      "SAP",
      "MuleSoft",
      "Tableau"
    ],
    "deployment_options": [
      "cloud"
    ],
    "pricing_tier": "enterprise",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 25000,
    "pricing_note_th": "เริ่มต้นแบบราย user/เดือน",
    "pricing_note_en": "Subscription pricing depends on edition, seats and selected add-ons.",
    "founded_year": 1999,
    "employee_count": "11-50",
    "headquarters": "San Francisco, California, USA",
    "notable_clients": [
      "Spotify",
      "Toyota",
      "T-Mobile",
      "Formula 1",
      "Heathrow"
    ],
    "certifications": [
      "ISO 27001",
      "SOC 2",
      "GDPR",
      "HIPAA eligible"
    ],
    "awards": [
      "Fortune 100 Best Companies to Work For",
      "Gartner Magic Quadrant Leader for Sales Force Automation"
    ],
    "demo_video_url": "https://www.salesforce.com/video/",
    "case_study_urls": [
      "https://www.salesforce.com/customer-success-stories/"
    ],
    "brochure_url": "https://www.salesforce.com/resources/",
    "booth_activities_th": [
      "ทดลอง CRM workflow",
      "ดู demo AI agent",
      "รับ customer journey template"
    ],
    "booth_activities_en": [
      "Try CRM workflow",
      "Watch AI agent demo",
      "Get customer journey template"
    ],
    "website": "https://www.salesforce.com",
    "contact_email": "contact@salesforce.com",
    "contact_phone": "+66-2-xxx-xxxx",
    "contact_line_id": "@eventiq-crm",
    "use_cases": [
      {
        "title": "Customer Service Automation",
        "problem": "Support teams face high ticket volume and slow response time.",
        "outcome": "Automate service workflows and improve customer response using Service Cloud and AI."
      },
      {
        "title": "Sales Pipeline Management",
        "problem": "Sales teams lose leads because follow-up is inconsistent.",
        "outcome": "Track leads, forecast revenue and automate sales activities."
      },
      {
        "title": "Customer Data Unification",
        "problem": "Customer information is scattered across marketing, sales and service tools.",
        "outcome": "Create a unified customer view for personalization and retention."
      }
    ]
  },
  {
    "id": "ex05",
    "name": "UiPath",
    "logo_url": "⚙️",
    "booth_no": "A-13",
    "hall": "Hall A",
    "industry": "Other",
    "sub_industries": [
      "Robotic Process Automation",
      "Business Process Automation",
      "Document Processing",
      "Agentic Automation"
    ],
    "solution_categories": [
      "Other",
      "Other",
      "Other",
      "Other"
    ],
    "tagline_th": "ลดงานซ้ำ ลดต้นทุน และเพิ่มความเร็วด้วย enterprise automation",
    "tagline_en": "Enterprise automation for faster, lower-cost operations",
    "description_th": "UiPath ให้บริการแพลตฟอร์ม automation สำหรับ RPA การประมวลผลเอกสาร process mining และ AI-powered workflow automation",
    "description_en": "UiPath provides an enterprise automation platform for robotic process automation, document processing, process mining and AI-powered workflow automation.",
    "long_pitch_en": "UiPath helps organizations reduce manual work, cut operational cost, automate repetitive workflows, improve compliance, process invoices, handle documents, integrate legacy systems and scale automation across finance, HR, insurance and shared services. Visitors searching for automation, RPA, document AI, invoice processing, cost reduction, compliance, workflow or back-office efficiency should visit this booth.",
    "problem_statements_en": [
      "Manual repetitive work",
      "High processing cost",
      "Human error",
      "Slow document handling",
      "Compliance gaps"
    ],
    "unique_value_props": [
      "End-to-end automation platform",
      "Strong RPA ecosystem",
      "Document AI and process mining",
      "Enterprise automation governance"
    ],
    "target_company_sizes": [
      "SME",
      "Enterprise"
    ],
    "target_industries": [
      "Finance",
      "Insurance",
      "Healthcare",
      "Manufacturing",
      "Other",
      "Government"
    ],
    "target_roles": [
      "COO",
      "Operations Manager",
      "Automation Lead",
      "Finance Manager",
      "HR Operations Manager",
      "Process Excellence Lead"
    ],
    "geographic_focus": [
      "Global"
    ],
    "tech_stack": [
      "UiPath Platform",
      "RPA",
      "Document Understanding",
      "Process Mining",
      "AI Center"
    ],
    "integrations": [
      "SAP",
      "Oracle",
      "Microsoft 365",
      "Salesforce",
      "ServiceNow",
      "Google Workspace"
    ],
    "deployment_options": [
      "cloud",
      "cloud",
      "cloud"
    ],
    "pricing_tier": "enterprise",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 50000,
    "pricing_note_th": "มี licensing สำหรับ attended/unattended bot",
    "pricing_note_en": "Enterprise subscription pricing depends on robots, users and selected modules.",
    "founded_year": 2005,
    "employee_count": "11-50",
    "headquarters": "New York, USA",
    "notable_clients": [
      "Deloitte",
      "EY",
      "Takeda",
      "Uber",
      "CrowdStrike"
    ],
    "certifications": [
      "UiPath Certified Professional",
      "ISO 27001",
      "SOC 2"
    ],
    "awards": [
      "Gartner Magic Quadrant Leader for Robotic Process Automation"
    ],
    "demo_video_url": "https://www.youtube.com/@UiPath",
    "case_study_urls": [
      "https://www.uipath.com/customers"
    ],
    "brochure_url": "https://www.uipath.com/resources",
    "booth_activities_th": [
      "ทดลอง invoice automation",
      "ดู process mining demo",
      "รับ automation opportunity checklist"
    ],
    "booth_activities_en": [
      "Try invoice automation",
      "Watch process mining demo",
      "Get automation opportunity checklist"
    ],
    "website": "https://www.uipath.com",
    "contact_email": "contact@uipath.com",
    "contact_phone": "+66-2-xxx-xxxx",
    "contact_line_id": "@eventiq-rpa",
    "use_cases": [
      {
        "title": "Invoice Processing Automation",
        "problem": "Finance teams manually read invoices and enter data into ERP systems.",
        "outcome": "Extract invoice data and automate approval workflows."
      },
      {
        "title": "HR Onboarding Automation",
        "problem": "New employee onboarding requires repetitive form checks and account requests.",
        "outcome": "Automate onboarding tasks across HR, IT and payroll systems."
      },
      {
        "title": "Process Mining for Cost Reduction",
        "problem": "Operations leaders cannot see where workflows are slow or expensive.",
        "outcome": "Discover bottlenecks and prioritize high-impact automation opportunities."
      }
    ]
  },
  {
    "id": "ex07",
    "name": "Palo Alto Networks",
    "logo_url": "🛡️",
    "booth_no": "B-06",
    "hall": "Hall B",
    "industry": "Cybersecurity",
    "sub_industries": [
      "Network Security",
      "Cloud Security",
      "Threat Intelligence",
      "Security Operations"
    ],
    "solution_categories": [
      "Other",
      "Other",
      "Other",
      "Other"
    ],
    "tagline_th": "ปกป้ององค์กรจากภัยคุกคามไซเบอร์ด้วย AI และ threat intelligence",
    "tagline_en": "AI-driven cybersecurity for cloud, network and security operations",
    "description_th": "Palo Alto Networks ให้บริการ cybersecurity platform สำหรับ network security, cloud security, endpoint security, SOC automation และ threat intelligence",
    "description_en": "Palo Alto Networks provides cybersecurity platforms for network security, cloud security, endpoint security, security operations and threat intelligence.",
    "long_pitch_en": "Palo Alto Networks helps organizations reduce cyber risk, improve compliance, protect cloud workloads, detect ransomware, secure remote access, investigate threats and scale SOC operations with AI-driven security. Visitors searching for cybersecurity, ransomware, fraud, compliance, cloud security, SOC, endpoint protection, zero trust or threat detection should visit this booth.",
    "problem_statements_en": [
      "Ransomware risk",
      "Cloud misconfiguration",
      "Alert fatigue",
      "Compliance pressure",
      "Limited threat visibility"
    ],
    "unique_value_props": [
      "AI-driven security platform",
      "Strong threat intelligence",
      "End-to-end cloud and network protection",
      "SOC automation capabilities"
    ],
    "target_company_sizes": [
      "SME",
      "Enterprise"
    ],
    "target_industries": [
      "Finance",
      "Healthcare",
      "Government",
      "Other",
      "Retail",
      "Other"
    ],
    "target_roles": [
      "CISO",
      "Security Engineer",
      "SOC Manager",
      "Cloud Security Architect",
      "IT Manager",
      "Risk Manager"
    ],
    "geographic_focus": [
      "Global"
    ],
    "tech_stack": [
      "Prisma Cloud",
      "Cortex",
      "Next-Generation Firewall",
      "Unit 42",
      "Zero Trust"
    ],
    "integrations": [
      "AWS",
      "Microsoft Azure",
      "Google Cloud",
      "ServiceNow",
      "Splunk",
      "Okta"
    ],
    "deployment_options": [
      "cloud",
      "cloud",
      "cloud"
    ],
    "pricing_tier": "enterprise",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 100000,
    "pricing_note_th": "ราคาแตกต่างตาม product line และจำนวน protected workload",
    "pricing_note_en": "Pricing depends on product line, license, users, workloads and enterprise agreement.",
    "founded_year": 2005,
    "employee_count": "11-50",
    "headquarters": "Santa Clara, California, USA",
    "notable_clients": [
      "Accenture",
      "AT&T",
      "Siemens",
      "Caesars Entertainment"
    ],
    "certifications": [
      "ISO 27001",
      "SOC 2",
      "PCI DSS",
      "FedRAMP related offerings"
    ],
    "awards": [
      "TSIA Global Rated Outstanding Assisted Support",
      "Gartner Magic Quadrant Leader for Single-Vendor SASE"
    ],
    "demo_video_url": "https://www.paloaltonetworks.com/resources/videos",
    "case_study_urls": [
      "https://www.paloaltonetworks.com/customers"
    ],
    "brochure_url": "https://www.paloaltonetworks.com/resources",
    "booth_activities_th": [
      "สาธิต threat detection",
      "ตรวจ cloud security posture",
      "รับ cyber risk checklist"
    ],
    "booth_activities_en": [
      "Watch threat detection demo",
      "Review cloud security posture",
      "Get cyber risk checklist"
    ],
    "website": "https://www.paloaltonetworks.com",
    "contact_email": "info@paloaltonetworks.com",
    "contact_phone": "+66-2-xxx-xxxx",
    "contact_line_id": "@eventiq-security",
    "use_cases": [
      {
        "title": "Cloud Security Posture Management",
        "problem": "Cloud teams cannot continuously detect misconfiguration and compliance issues.",
        "outcome": "Improve cloud visibility and reduce misconfiguration risk with Prisma Cloud."
      },
      {
        "title": "SOC Automation",
        "problem": "Security teams receive too many alerts and cannot investigate fast enough.",
        "outcome": "Automate incident triage and response using Cortex."
      },
      {
        "title": "Ransomware and Threat Prevention",
        "problem": "Organizations need to stop ransomware and advanced attacks before business impact.",
        "outcome": "Detect and prevent threats across network, endpoint and cloud environments."
      }
    ]
  },
  {
    "id": "ex08",
    "name": "NVIDIA",
    "logo_url": "🎮",
    "booth_no": "B-07",
    "hall": "Hall B",
    "industry": "Other",
    "sub_industries": [
      "GPU Computing",
      "Artificial Intelligence",
      "Accelerated Computing",
      "Digital Twin"
    ],
    "solution_categories": [
      "Other",
      "Other",
      "Other",
      "Other",
      "Other"
    ],
    "tagline_th": "โครงสร้างพื้นฐาน AI และ GPU สำหรับองค์กรและนักพัฒนา",
    "tagline_en": "The engine behind modern AI and accelerated computing",
    "description_th": "NVIDIA ให้บริการ GPU, AI infrastructure และ accelerated computing สำหรับ generative AI, computer vision, simulation และ enterprise AI workloads",
    "description_en": "NVIDIA provides GPUs, AI infrastructure and accelerated computing for generative AI, computer vision, simulation and enterprise AI workloads.",
    "long_pitch_en": "NVIDIA helps organizations scale AI workloads, reduce model training time, accelerate generative AI, power computer vision, optimize digital twin simulation and improve high-performance computing. Visitors searching for AI, GPU, LLM, training, inference, computer vision, digital twin, accelerated computing, scale or enterprise AI should visit this booth.",
    "problem_statements_en": [
      "Slow AI model training",
      "High compute demand",
      "Limited AI infrastructure",
      "Expensive model deployment",
      "Scaling challenges"
    ],
    "unique_value_props": [
      "Industry-leading GPU ecosystem",
      "Strong AI software stack",
      "Enterprise-grade accelerated computing",
      "Deep ecosystem partnerships"
    ],
    "target_company_sizes": [
      "SME",
      "Enterprise"
    ],
    "target_industries": [
      "Healthcare",
      "Manufacturing",
      "Automotive",
      "Finance",
      "Other",
      "Other"
    ],
    "target_roles": [
      "CTO",
      "AI Engineer",
      "Data Scientist",
      "ML Engineer",
      "Head of Infrastructure",
      "Research Lead"
    ],
    "geographic_focus": [
      "Global"
    ],
    "tech_stack": [
      "CUDA",
      "TensorRT",
      "Omniverse",
      "DGX",
      "NVIDIA AI Enterprise"
    ],
    "integrations": [
      "AWS",
      "Microsoft Azure",
      "Google Cloud",
      "VMware",
      "Oracle Cloud"
    ],
    "deployment_options": [
      "cloud",
      "cloud",
      "cloud"
    ],
    "pricing_tier": "enterprise",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 300000,
    "pricing_note_th": "คิดตาม GPU infrastructure และ enterprise support package",
    "pricing_note_en": "Project pricing depends on hardware, GPU cluster size and software requirements.",
    "founded_year": 1993,
    "employee_count": "11-50",
    "headquarters": "Santa Clara, California, USA",
    "notable_clients": [
      "Mercedes-Benz",
      "Adobe",
      "Microsoft",
      "Oracle",
      "OpenAI"
    ],
    "certifications": [
      "ISO 27001",
      "SOC 2",
      "Enterprise Support Programs"
    ],
    "awards": [
      "Fortune Most Admired Companies",
      "CES Innovation Awards"
    ],
    "demo_video_url": "https://www.nvidia.com/en-us/on-demand/",
    "case_study_urls": [
      "https://www.nvidia.com/en-us/case-studies/"
    ],
    "brochure_url": "https://www.nvidia.com/en-us/data-center/resources/",
    "booth_activities_th": [
      "ทดลอง AI GPU benchmark",
      "ดู Omniverse demo",
      "ปรึกษา LLM infrastructure"
    ],
    "booth_activities_en": [
      "Explore AI GPU benchmark",
      "Watch Omniverse demo",
      "Discuss LLM infrastructure"
    ],
    "website": "https://www.nvidia.com",
    "contact_email": "enterprise@nvidia.com",
    "contact_phone": "+66-2-xxx-xxxx",
    "contact_line_id": "@eventiq-aiinfra",
    "use_cases": [
      {
        "title": "Generative AI Infrastructure",
        "problem": "Organizations struggle to train and deploy large AI models efficiently.",
        "outcome": "Accelerate LLM training and inference using NVIDIA GPUs and enterprise AI stack."
      },
      {
        "title": "Computer Vision at Scale",
        "problem": "Real-time image analytics require massive processing power.",
        "outcome": "Deploy scalable vision AI systems with optimized GPU acceleration."
      },
      {
        "title": "Digital Twin Simulation",
        "problem": "Manufacturers cannot safely test production changes in real environments.",
        "outcome": "Simulate factories and operations with Omniverse digital twins."
      }
    ]
  },
  {
    "id": "ex10",
    "name": "Workday",
    "logo_url": "👥",
    "booth_no": "B-09",
    "hall": "Hall B",
    "industry": "Other",
    "sub_industries": [
      "Human Capital Management",
      "Workforce Planning",
      "Finance Cloud",
      "Talent Management"
    ],
    "solution_categories": [
      "Other",
      "Other",
      "Other",
      "Other"
    ],
    "tagline_th": "จัดการคน การเงิน และ workforce บน cloud เดียว",
    "tagline_en": "Enterprise cloud platform for HR and finance",
    "description_th": "Workday ให้บริการระบบ cloud สำหรับ HR, payroll, workforce planning และ enterprise finance",
    "description_en": "Workday provides enterprise cloud software for HR, payroll, workforce planning and finance operations.",
    "long_pitch_en": "Workday helps organizations automate HR workflows, improve workforce planning, simplify payroll operations, increase employee visibility and scale finance operations with cloud software. Visitors searching for HR automation, payroll, workforce analytics, employee experience, compliance, talent management or finance transformation should visit this booth.",
    "problem_statements_en": [
      "HR inefficiency",
      "Payroll complexity",
      "Workforce visibility gaps",
      "Talent retention issues",
      "Manual HR processes"
    ],
    "unique_value_props": [
      "Unified HR and finance cloud",
      "Strong workforce analytics",
      "Enterprise-grade HR automation"
    ],
    "target_company_sizes": [
      "SME",
      "Enterprise"
    ],
    "target_industries": [
      "Healthcare",
      "Education",
      "Finance",
      "Retail",
      "Other"
    ],
    "target_roles": [
      "HR Director",
      "CFO",
      "People Operations Lead",
      "Payroll Manager",
      "CIO"
    ],
    "geographic_focus": [
      "Global"
    ],
    "tech_stack": [
      "HCM",
      "Workforce Planning",
      "Analytics",
      "Cloud ERP"
    ],
    "integrations": [
      "Slack",
      "Microsoft 365",
      "ADP",
      "Okta"
    ],
    "deployment_options": [
      "cloud"
    ],
    "pricing_tier": "enterprise",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 50000,
    "pricing_note_th": "คิดตามจำนวน employee และ module ที่ใช้งาน",
    "pricing_note_en": "Subscription pricing depends on employees, modules and implementation scope.",
    "founded_year": 2005,
    "employee_count": "11-50",
    "headquarters": "Pleasanton, California, USA",
    "notable_clients": [
      "Netflix",
      "Target",
      "Salesforce",
      "Walmart"
    ],
    "certifications": [
      "SOC 2",
      "ISO 27001",
      "GDPR compliance"
    ],
    "awards": [
      "Fortune Best Workplace Awards"
    ],
    "demo_video_url": "https://www.workday.com/",
    "case_study_urls": [
      "https://www.workday.com/en-us/customer-stories.html"
    ],
    "brochure_url": "https://www.workday.com/en-us/resources.html",
    "booth_activities_th": [
      "ทดลอง workforce analytics",
      "ดู HR automation demo",
      "ประเมิน workforce readiness"
    ],
    "booth_activities_en": [
      "Try workforce analytics",
      "Watch HR automation demo",
      "Get workforce readiness assessment"
    ],
    "website": "https://www.workday.com",
    "contact_email": "sales@workday.com",
    "contact_phone": "+66-2-xxx-xxxx",
    "contact_line_id": "@eventiq-hr",
    "use_cases": [
      {
        "title": "HR Workflow Automation",
        "problem": "HR teams manage repetitive onboarding and approval processes manually.",
        "outcome": "Automate employee lifecycle workflows and reduce HR workload."
      },
      {
        "title": "Workforce Planning",
        "problem": "Organizations lack visibility into staffing and talent allocation.",
        "outcome": "Improve workforce forecasting and planning."
      },
      {
        "title": "Payroll Simplification",
        "problem": "Payroll systems are fragmented and hard to maintain.",
        "outcome": "Manage payroll and employee compensation more efficiently."
      }
    ]
  },
  {
    "id": "ex11",
    "name": "Stripe",
    "logo_url": "💳",
    "booth_no": "B-10",
    "hall": "Hall B",
    "industry": "Other",
    "sub_industries": [
      "Payment Infrastructure",
      "Billing",
      "Fraud Prevention",
      "Financial APIs"
    ],
    "solution_categories": [
      "Other",
      "Other",
      "Other",
      "Other",
      "Other"
    ],
    "tagline_th": "ระบบชำระเงินออนไลน์สำหรับธุรกิจทุกขนาด",
    "tagline_en": "Financial infrastructure for the internet",
    "description_th": "Stripe ให้บริการ payment APIs, subscription billing, marketplace payout และ fraud prevention สำหรับธุรกิจออนไลน์",
    "description_en": "Stripe provides payment APIs, subscription billing, marketplace payouts and fraud prevention for online businesses.",
    "long_pitch_en": "Stripe helps businesses reduce payment friction, automate billing, scale subscriptions, prevent fraud, improve checkout conversion and expand global payments. Visitors searching for payment gateway, billing, fraud prevention, SaaS payment, subscription, fintech API, checkout optimization, compliance or payment automation should visit this booth.",
    "problem_statements_en": [
      "Payment integration complexity",
      "Fraud risk",
      "Subscription billing issues",
      "International payment expansion",
      "Checkout drop-off"
    ],
    "unique_value_props": [
      "Developer-friendly API",
      "Global payment support",
      "Strong fraud prevention",
      "Fast implementation"
    ],
    "target_company_sizes": [
      "Startup",
      "SME",
      "Enterprise"
    ],
    "target_industries": [
      "E-commerce",
      "Other",
      "Other",
      "Other"
    ],
    "target_roles": [
      "Founder",
      "CTO",
      "Product Manager",
      "Finance Manager",
      "Payment Lead"
    ],
    "geographic_focus": [
      "Global"
    ],
    "tech_stack": [
      "Payments API",
      "Billing",
      "Fraud Detection",
      "Financial Infrastructure"
    ],
    "integrations": [
      "Shopify",
      "WooCommerce",
      "Salesforce",
      "HubSpot",
      "NetSuite"
    ],
    "deployment_options": [
      "cloud"
    ],
    "pricing_tier": "enterprise",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 0,
    "pricing_note_th": "เริ่มต้นตาม transaction fee และ usage-based pricing",
    "pricing_note_en": "Pricing depends on transaction volume, payment methods and selected products.",
    "founded_year": 2010,
    "employee_count": "11-50",
    "headquarters": "San Francisco, California, USA",
    "notable_clients": [
      "Amazon",
      "Shopify",
      "OpenAI",
      "Slack"
    ],
    "certifications": [
      "PCI DSS",
      "SOC 2",
      "ISO 27001"
    ],
    "awards": [
      "Fast Company Most Innovative Companies"
    ],
    "demo_video_url": "https://stripe.com/videos",
    "case_study_urls": [
      "https://stripe.com/customers"
    ],
    "brochure_url": "https://stripe.com/resources",
    "booth_activities_th": [
      "ทดลอง payment flow",
      "ดู fraud prevention demo",
      "รับ API integration checklist"
    ],
    "booth_activities_en": [
      "Try payment flow demo",
      "Watch fraud prevention showcase",
      "Get API integration checklist"
    ],
    "website": "https://stripe.com",
    "contact_email": "sales@stripe.com",
    "contact_phone": "+66-2-xxx-xxxx",
    "contact_line_id": "@eventiq-pay",
    "use_cases": [
      {
        "title": "Subscription Billing",
        "problem": "Businesses struggle to manage recurring billing and subscription changes.",
        "outcome": "Automate recurring billing and revenue collection."
      },
      {
        "title": "Global Payment Expansion",
        "problem": "Companies cannot easily accept international payments.",
        "outcome": "Enable multi-country payment acceptance and currency support."
      },
      {
        "title": "Fraud Prevention",
        "problem": "Payment fraud increases revenue loss.",
        "outcome": "Reduce fraud risk using Stripe Radar."
      }
    ]
  },
  {
    "id": "ex12",
    "name": "Zoom",
    "logo_url": "🎥",
    "booth_no": "B-11",
    "hall": "Hall B",
    "industry": "Other",
    "sub_industries": [
      "Video Conferencing",
      "Contact Center",
      "Unified Communications",
      "AI Collaboration"
    ],
    "solution_categories": [
      "Other",
      "Other",
      "Other",
      "Other"
    ],
    "tagline_th": "แพลตฟอร์มประชุมและทำงานร่วมกันด้วย AI",
    "tagline_en": "AI-powered communication and collaboration platform",
    "description_th": "Zoom ให้บริการ video meeting, phone, team chat, contact center และ AI collaboration tools สำหรับองค์กร",
    "description_en": "Zoom provides video meetings, phone, team chat, contact center and AI-powered collaboration tools for organizations.",
    "long_pitch_en": "Zoom helps teams improve communication, reduce meeting friction, scale customer support, enable remote work, automate meeting summaries and improve voice collaboration. Visitors searching for voice, video meeting, call center, remote work, AI assistant, collaboration, unified communications or contact center should visit this booth.",
    "problem_statements_en": [
      "Remote communication challenges",
      "Meeting inefficiency",
      "Fragmented communication tools",
      "Customer support scaling",
      "Poor collaboration visibility"
    ],
    "unique_value_props": [
      "Easy-to-use platform",
      "Strong enterprise adoption",
      "AI-powered meeting assistant",
      "Reliable communication stack"
    ],
    "target_company_sizes": [
      "Startup",
      "SME",
      "Enterprise"
    ],
    "target_industries": [
      "Education",
      "Healthcare",
      "Finance",
      "Other",
      "Other"
    ],
    "target_roles": [
      "Operations Manager",
      "HR Director",
      "IT Manager",
      "Customer Support Lead"
    ],
    "geographic_focus": [
      "Global"
    ],
    "tech_stack": [
      "Video Conferencing",
      "Zoom AI Companion",
      "VoIP",
      "Contact Center"
    ],
    "integrations": [
      "Slack",
      "Microsoft 365",
      "Google Workspace",
      "Salesforce"
    ],
    "deployment_options": [
      "cloud"
    ],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 0,
    "pricing_note_th": "Free plan สำหรับทีมขนาดเล็ก",
    "pricing_note_en": "Free and enterprise plans available depending on seats and features.",
    "founded_year": 2011,
    "employee_count": "11-50",
    "headquarters": "San Jose, California, USA",
    "notable_clients": [
      "Uber",
      "Capital One",
      "ServiceNow",
      "Nasdaq"
    ],
    "certifications": [
      "SOC 2",
      "ISO 27001",
      "GDPR compliance"
    ],
    "awards": [
      "Gartner Magic Quadrant Leader for UCaaS"
    ],
    "demo_video_url": "https://explore.zoom.us/en/video/",
    "case_study_urls": [
      "https://explore.zoom.us/en/customer/all/"
    ],
    "brochure_url": "https://explore.zoom.us/en/resources/",
    "booth_activities_th": [
      "ทดลอง AI meeting summary",
      "ดู contact center demo",
      "รับ remote collaboration checklist"
    ],
    "booth_activities_en": [
      "Try AI meeting summary",
      "Watch contact center demo",
      "Get remote collaboration checklist"
    ],
    "website": "https://zoom.us",
    "contact_email": "sales@zoom.us",
    "contact_phone": "+66-2-xxx-xxxx",
    "contact_line_id": "@eventiq-collab",
    "use_cases": [
      {
        "title": "AI Meeting Summary",
        "problem": "Teams spend too much time taking notes during meetings.",
        "outcome": "Automatically summarize meetings and action items using AI."
      },
      {
        "title": "Customer Contact Center",
        "problem": "Support teams struggle to manage omnichannel customer interactions.",
        "outcome": "Scale support operations with cloud contact center tools."
      },
      {
        "title": "Remote Team Collaboration",
        "problem": "Distributed teams lack effective communication workflows.",
        "outcome": "Improve team collaboration through unified meetings, chat and voice."
      }
    ]
  },
  {
    "id": "ex13",
    "name": "Vulcan Coalition",
    "logo_url": "🤖",
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
    "logo_url": "📊",
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
    "name": "Finnomena",
    "logo_url": "💰",
    "booth_no": "A-14",
    "hall": "Hall A",
    "industry": "Other",
    "sub_industries": [
      "WealthTech, Investment Advisory"
    ],
    "solution_categories": [
      "Other"
    ],
    "tagline_th": "แพลตฟอร์มบริหารเงินลงทุนครบวงจร",
    "tagline_en": "Unlock Your Investment Potential",
    "description_th": "แพลตฟอร์มแนะนำการลงทุนในกองทุนรวมที่นำเทคโนโลยีจัดพอร์ตอัตโนมัติ (Robo-advisor) มาผสมผสานกับองค์ความรู้จากผู้เชี่ยวชาญด้านการเงิน",
    "description_en": "An all-in-one investment platform combining Robo-advisor technology with expert financial advice for mutual fund investments.",
    "long_pitch_en": "Finnomena democratizes investment opportunities across Thailand. By operating an open architecture platform that hosts over 20+ asset management companies, Finnomena uses advanced data analytics and algorithmic portfolio creation to deliver unbiased, institutional-grade wealth advisory to mass retail investors.",
    "problem_statements_en": [
      "Fragmented wealth advisory; Complex mutual fund selection across different banks; Lack of unbiased investment guidance for retail buyers."
    ],
    "unique_value_props": [
      "Multi-AMC open architecture platform; Hybrid robo-advisor and expert guru advisory model; High-engagement financial content ecosystem."
    ],
    "target_company_sizes": [
      "SME"
    ],
    "target_industries": [
      "Other"
    ],
    "target_roles": [
      "Individual Investor, Chief Financial Officer (CFO), Finance Manager"
    ],
    "geographic_focus": [
      "Thailand, Malaysia, APAC"
    ],
    "tech_stack": [
      "Python, Node.js, React Native, PostgreSQL, AWS Cloud Infrastructure"
    ],
    "integrations": [
      "Traditional Bank Payment Gateways, National ITMX, Asset Management Firm APIs"
    ],
    "deployment_options": [
      "cloud"
    ],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 0,
    "pricing_note_th": "ไม่คิดค่าธรรมเนียมการใช้แพลตฟอร์มซ้ำซ้อน โดยได้รับส่วนแบ่งจากบริษัทจัดการกองทุนโดยตรง",
    "pricing_note_en": "No double-charging platform fees; revenue shared via front-end/back-end loads from AMCs.",
    "founded_year": 2015,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [
      "Over 400,000 registered retail and corporate treasury investors"
    ],
    "certifications": [
      "Securities and Exchange Commission (SEC) Licensed Brokerage"
    ],
    "awards": [
      "Techsauce Global Summit Winner, Best WealthTech Startup in Thailand"
    ],
    "demo_video_url": "https://www.finnomena.com",
    "case_study_urls": [
      "https://www.finnomena.com"
    ],
    "brochure_url": "https://www.finnomena.com",
    "booth_activities_th": [
      "ตรวจสุขภาพทางการเงินและวางแผนภาษีฟรี, ออกแบบพอร์ตลงทุนกองทุนรวมด้วย AI"
    ],
    "booth_activities_en": [
      "Free financial health check and tax planning, AI-driven mutual fund portfolio design"
    ],
    "website": "https://www.finnomena.com",
    "contact_email": "support@finnomena.com",
    "contact_phone": "66-2-xxx-xxxx",
    "contact_line_id": "@finnomena",
    "use_cases": []
  },
  {
    "id": "ex16",
    "name": "QueQ",
    "logo_url": "⏳",
    "booth_no": "A-15",
    "hall": "Hall A",
    "industry": "Other",
    "sub_industries": [
      "FoodTech, Hospital Crowd Management, GovTech"
    ],
    "solution_categories": [
      "Other"
    ],
    "tagline_th": "ไม่ต้องยืนรอคิวอีกต่อไป เปลี่ยนเวลาไปทำสิ่งที่คุณรัก",
    "tagline_en": "Break the Line. No More Waiting in Front of Stores.",
    "description_th": "แพลตฟอร์มจัดการคิวบนสมาร์ตโฟน ช่วยให้ผู้ใช้จองคิวร้านอาหาร ธนาคาร หรือโรงพยาบาลได้ล่วงหน้าในระยะไกลเพื่อลดความแออัดหน้าร้าน",
    "description_en": "A mobile-first queue management system enabling customers to book appointments or restaurant queues remotely to eliminate physical lineups.",
    "long_pitch_en": "QueQ solves the problem of unproductive waiting. By transforming physical queues into digitized virtual spaces, QueQ helps brick-and-mortar merchants retain high-intent customers who would otherwise leave due to long wait times, while providing managers with operational analytics.",
    "problem_statements_en": [
      "Customer walkouts and revenue loss due to long queues; Crowded waiting areas leading to bad user experiences."
    ],
    "unique_value_props": [
      "High local user network effects (3M+ downloads); Multi-industry versatility (Food, Health, Gov); Real-time remote updates."
    ],
    "target_company_sizes": [
      "SME"
    ],
    "target_industries": [
      "Other"
    ],
    "target_roles": [
      "Store Manager, Operations Director, Patient Experience Officer"
    ],
    "geographic_focus": [
      "Thailand, Malaysia, Vietnam"
    ],
    "tech_stack": [
      "Node.js, React, Swift, Kotlin, Firebase, MongoDB"
    ],
    "integrations": [
      "POS Systems, Hospital Information Systems (HIS), Line Official Account"
    ],
    "deployment_options": [
      "cloud"
    ],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 2500,
    "pricing_note_th": "ราคาสำหรับร้านอาหารเดี่ยว ไม่รวมค่าจัดซื้อตัวแท็บเล็ตและเครื่องพิมพ์ใบเสร็จคิวหน้าร้าน",
    "pricing_note_en": "Base price for standard food outlets, hardware peripheral add-ons are priced separately.",
    "founded_year": 2015,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [
      "Shabushi, MK Restaurants, Siriraj Hospital, Government Savings Bank"
    ],
    "certifications": [
      "Digital Economy Promotion Agency (depa) Registered Member"
    ],
    "awards": [
      "TICTA (Thailand ICT Awards) Winner in Retail & Supply Chain"
    ],
    "demo_video_url": "https://www.queq.me",
    "case_study_urls": [
      "https://www.queq.me"
    ],
    "brochure_url": "https://www.queq.me",
    "booth_activities_th": [
      "ดลองระบบตู้กดคิวอัจฉริยะจำลอง, สมัครเปิดระบบร้านค้าใหม่ในราคาโปรโมชันงาน Expo"
    ],
    "booth_activities_en": [
      "Live interactive smart-kiosk hardware demo, Special expo discount for new merchant sign-ups"
    ],
    "website": "https://www.queq.me",
    "contact_email": "info@queq.me",
    "contact_phone": "66-2-xxx-xxxx",
    "contact_line_id": "@queqbiz",
    "use_cases": []
  },
  {
    "id": "ex17",
    "name": "Freshket",
    "logo_url": "🥦",
    "booth_no": "A-16",
    "hall": "Hall A",
    "industry": "Other",
    "sub_industries": [
      "E-Commerce B2B, Logistics, Supply Chain Tech"
    ],
    "solution_categories": [
      "Other"
    ],
    "tagline_th": "แพลตฟอร์มรวมวัตถุดิบของสดของแห้ง ครบจบเพื่อร้านอาหารและโรงแรม",
    "tagline_en": "The Tech-Enabled B2B Food Supply Chain",
    "description_th": "แพลตฟอร์มเทคโนโลยีห่วงโซ่อุปทานที่เชื่อมโยงเกษตรกรและผู้ผลิตวัตถุดิบอาหารเข้ากับผู้ประกอบการร้านอาหารและโรงแรมโดยตรงเพื่อความสดใหม่และราคาโปร่งใส",
    "description_en": "A comprehensive food supply chain platform connecting local farmers and aggregate food processors directly to commercial kitchens and hospitality venues.",
    "long_pitch_en": "Freshket restructures the food sourcing lifecycle for commercial food businesses. By implementing predictive demand tracking and optimized cold-chain consolidation hubs, we provide food operators with stable pricing, exact-spec sizing, and next-day scheduled deliveries, drastically reducing commercial kitchen waste.",
    "problem_statements_en": [
      "Volatile ingredient costs in wholesale markets; Sub-par handling leading to massive food spoilage before reaching kitchens."
    ],
    "unique_value_props": [
      "Advanced cold-chain infrastructure; Customized automated raw material sorting based on specific restaurant requirements; Integrated digital credit terms."
    ],
    "target_company_sizes": [
      "SME"
    ],
    "target_industries": [
      "Other"
    ],
    "target_roles": [
      "Procurement Manager, Executive Chef, Restaurant Franchise Owner"
    ],
    "geographic_focus": [
      "Thailand"
    ],
    "tech_stack": [
      "Go, React.js, Python Data Engine, AWS, Docker Containers"
    ],
    "integrations": [
      "Enterprise ERPs, Local Accounting Platforms (FlowAccount, Peak Account)"
    ],
    "deployment_options": [
      "cloud"
    ],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 0,
    "pricing_note_th": "ม่มีค่าธรรมเนียมสมาชิกรายเดือน ราคาสินค้าปรับตามตลาดค้าส่งและได้สิทธิ์ส่งฟรีเมื่อถึงยอดขั้นต่ำ",
    "pricing_note_en": "No platform setup fee; revenue driven through transaction item sales; free shipping triggered via minimum caps.",
    "founded_year": 2016,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [
      "Minor Food Group, Various Boutique Hotels, 15,000+ Active Food Outlets"
    ],
    "certifications": [
      "GMP and HACCP Compliant Sorting Warehouses"
    ],
    "awards": [
      "Best FoodTech Startup Winner (Various Tech Industry Summits)"
    ],
    "demo_video_url": "https://www.freshket.co/about-us/demo",
    "case_study_urls": [
      "https://www.freshket.co/blog/restaurant-cost-optimization"
    ],
    "brochure_url": "https://www.freshket.co/docs/freshket-product-catalog.pdf",
    "booth_activities_th": [
      "เวิร์กชอปคำนวณต้นทุนอาหารดิบฟรีโดยเชฟผู้เชี่ยวชาญ, สมัครเครดิตเทอมซื้อวัตถุดิบรับสิทธิ์พิเศษในงาน"
    ],
    "booth_activities_en": [
      "Free commercial kitchen cost-optimization consulting, On-site B2B supply line credit term applications"
    ],
    "website": "https://www.freshket.co",
    "contact_email": "contact@freshket.co",
    "contact_phone": "66-2-xxx-xxxx",
    "contact_line_id": "@freshket",
    "use_cases": []
  },
  {
    "id": "ex18",
    "name": "Ricult",
    "logo_url": "🛰️",
    "booth_no": "A-17",
    "hall": "Hall A",
    "industry": "Other",
    "sub_industries": [
      "FinTech, ClimateTech, Big Data Analytics"
    ],
    "solution_categories": [
      "Other"
    ],
    "tagline_th": "ยกระดับประสิทธิภาพเกษตรกรรมไทยด้วยพลังข้อมูลดาวเทียมและ AI",
    "tagline_en": "Empowering Smallholder Farmers with Data-Driven Agriculture",
    "description_th": "ใช้เทคโนโลยีภาพถ่ายดาวเทียม ร่วมกับปัญญาประดิษฐ์เพื่อช่วยให้เกษตรกรวิเคราะห์สุขภาพพืช พยากรณ์อากาศ และช่วยให้ธนาคารประเมินความเสี่ยงในการปล่อยสินเชื่อ",
    "description_en": "Uses machine learning models, satellite data, and deep meteorology to forecast microclimate conditions and assess agrarian asset health.",
    "long_pitch_en": "Ricult acts as a foundational data layer for the agricultural world. By translating complicated satellite telemetry into simple, actionable insights on a mobile screen, Ricult helps farmers double their yields while supplying agricultural lenders with verifiable risk profiles.",
    "problem_statements_en": [
      "Severe crop losses caused by erratic weather patterns; Lack of traditional credit history among farmers leading to predatory loan shark reliance."
    ],
    "unique_value_props": [
      "Deep proprietary machine learning models optimized for tropical agriculture; Dual-ended platform (Farmer App + Corporate Lender Web Matrix)."
    ],
    "target_company_sizes": [
      "SME"
    ],
    "target_industries": [
      "Other"
    ],
    "target_roles": [
      "Head of Corporate Sustainability (ESG), Agronomy Supply Director, Risk Underwriter"
    ],
    "geographic_focus": [
      "Thailand, Pakistan, Vietnam"
    ],
    "tech_stack": [
      "Python, Django framework, TensorFlow, PostgreSQL, AWS Data Pipelines"
    ],
    "integrations": [
      "Geographical Information Systems (GIS), Enterprise Core Banking APIs"
    ],
    "deployment_options": [
      "cloud"
    ],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 200000,
    "pricing_note_th": "เกษตรกรรายย่อยใช้งานแอปพลิเคชันพยากรณ์พื้นฐานฟรี ส่วนองค์กรธุรกิจคิดราคาตามพื้นที่พิกัดแปลงที่ให้ดูแล",
    "pricing_note_en": "Individual application is free for smallholders; corporate business dashboard pricing scales with geographic acreage monitored.",
    "founded_year": 2015,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [
      "Bank for Agriculture and Agricultural Cooperatives (BAAC), Thai Wah, Mitr Phol Group"
    ],
    "certifications": [
      "UN-backed Sustainable Development Goal (SDG) Alignment Certified"
    ],
    "awards": [
      "United Nations SDG Impact Award Winner, Fintech Challenge Winner by SEC Thailand"
    ],
    "demo_video_url": "https://www.ricult.com/media/explainer-video",
    "case_study_urls": [
      "https://www.ricult.com/impact/sugar-cane-supply-yields"
    ],
    "brochure_url": "https://www.ricult.com/files/ricult-corporate-solutions.pdf",
    "booth_activities_th": [
      "สาธิตการส่องพิกัดแปลงเกษตรผ่านดาวเทียมแบบเรียลไทม์เพื่อหาดัชนีความสมบูรณ์ของพืช (NDVI)"
    ],
    "booth_activities_en": [
      "Live interactive demonstration of satellite crop health index (NDVI) analysis for specific farm coordinates"
    ],
    "website": "https://www.ricult.com",
    "contact_email": "info@ricult.com",
    "contact_phone": "66-2-xxx-xxxx",
    "contact_line_id": "@ricultth",
    "use_cases": []
  },
  {
    "id": "ex19",
    "name": "Builk One Group",
    "logo_url": "🏗️",
    "booth_no": "A-18",
    "hall": "Hall A",
    "industry": "Other",
    "sub_industries": [
      "PropTech, FinTech B2B, ERP Enterprise Software"
    ],
    "solution_categories": [
      "Other"
    ],
    "tagline_th": "พลิกโฉมการบริหารงานก่อสร้างไทย สู่ระบบดิจิทัลเต็มรูปแบบ",
    "tagline_en": "Digitizing the Construction and Real Estate Supply Chain",
    "description_th": "ระบบ ERP และแพลตฟอร์มบริหารต้นทุน โครงการ และจัดซื้อวัสดุก่อสร้างออนไลน์ที่ออกแบบมาเพื่อผู้รับเหมาและผู้พัฒนาอสังหาริมทรัพย์โดยเฉพาะ",
    "description_en": "An enterprise SaaS platform providing job costing, project management, and specialized procurement networks for the construction ecosystem.",
    "long_pitch_en": "Builk One Group addresses systemic data deficiencies within the building sector. By delivering a cost-control utility infrastructure directly into workflow lifecycles, Builk digitizes operational tracking—enabling material vendors to targetedly advertise and small-scale builders to avoid cash-flow insolvencies.",
    "problem_statements_en": [
      "High rate of budget overruns due to delayed paper invoicing; Inefficiencies in industrial material sourcing."
    ],
    "unique_value_props": [
      "Free programmatic cost-tracking app network for small builders; Native integrated building material marketplace (Yello Smart Purchase)."
    ],
    "target_company_sizes": [
      "SME"
    ],
    "target_industries": [
      "Other"
    ],
    "target_roles": [
      "Project Director, Chief Quantity Surveyor (QS), Managing Director, Procurement Head"
    ],
    "geographic_focus": [
      "Thailand, Laos, Cambodia, Philippines"
    ],
    "tech_stack": [
      ".NET Core, React.js, Microsoft SQL Server, Azure Cloud Services"
    ],
    "integrations": [
      "Enterprise Core ERPs (SAP, Oracle), Major Domestic Bank Escrow Systems"
    ],
    "deployment_options": [
      "cloud"
    ],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 150000,
    "pricing_note_th": "ซอฟต์แวร์ควบคุมต้นทุนพื้นฐานใช้งานฟรีตลอดชีพ รายได้หลักองค์กรมาจากค่านายหน้าจัดซื้อและค่าซอฟต์แวร์องค์กรขนาดใหญ่",
    "pricing_note_en": "Standard small-builder job costing is completely free; mid-to-large business ERP packages are calculated per module node.",
    "founded_year": 2009,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [
      "SCG, Pruksa Real Estate, Sansiri, Over 30,000+ SME Subcontractors"
    ],
    "certifications": [
      "ISO/IEC 29110 Software Engineering Certified"
    ],
    "awards": [
      "Prime Minister’s Digital Award (Digital Startup of the Year), National ICT Awards (TICTA) Winner"
    ],
    "demo_video_url": "https://www.builk.com/th/pojjaman-erp-demo",
    "case_study_urls": [
      "https://www.builk.one/success-stories/commercial-highrise-costing"
    ],
    "brochure_url": "https://www.builk.one/resources/builk-product-suite.pdf",
    "booth_activities_th": [
      "แจกฟรีคู่มือวิเคราะห์ดัชนีราคาวัสดุก่อสร้างปี 2026, คลินิกให้คำปรึกษาระบบบัญชีหน้างานรับเหมา"
    ],
    "booth_activities_en": [
      "Free distribution of 2026 Building Material Price Indexes, Architectural site accounting health clinic"
    ],
    "website": "https://www.builk.one",
    "contact_email": "sales@builk.com",
    "contact_phone": "66-2-xxx-xxxx",
    "contact_line_id": "@builk",
    "use_cases": []
  },
  {
    "id": "ex20",
    "name": "Zipevent",
    "logo_url": "🎟️",
    "booth_no": "A-19",
    "hall": "Hall A",
    "industry": "Other",
    "sub_industries": [
      "MarTech, Ticketing Operations, Virtual Exhibitions"
    ],
    "solution_categories": [
      "Other"
    ],
    "tagline_th": "แพลตฟอร์มบริหารจัดการงานอีเวนต์และนิทรรศการครบวงจร",
    "tagline_en": "Bring Event Experiences to Life Through Technology",
    "description_th": "ระบบจัดการงานอีเวนต์แบบครบวงจร ตั้งแต่ระบบลงทะเบียนออนไลน์ ซื้อบัตรเข้างาน เช็กอินหน้างาน ไปจนถึงระบบแสดงนิทรรศการเสมือนจริง (Virtual Event)",
    "description_en": "An end-to-end event discovery, online ticketing, physical badge registration, and multi-dimensional engagement tech ecosystem.",
    "long_pitch_en": "Zipevent optimizes the operational pipeline of modern mass gatherings and corporate expos. By replacing sluggish manual check-ins with streamlined data-driven digital registrations, interactive floor mapping, and real-time live polling, we bridge organizers to high-fidelity audience behavioral data.",
    "problem_statements_en": [
      "Bottlenecks and long queues at physical event reception desks; Failure of organizers to capture offline attendee behavior analytics."
    ],
    "unique_value_props": [
      "In-house developed face-recognition and QR lightning check-in systems; Comprehensive hybrid/virtual venue infrastructure layouts."
    ],
    "target_company_sizes": [
      "SME"
    ],
    "target_industries": [
      "Other"
    ],
    "target_roles": [
      "Event Organizer Director, Chief Marketing Officer (CMO), Trade Show Coordinator"
    ],
    "geographic_focus": [
      "Thailand, Singapore, ASEAN region"
    ],
    "tech_stack": [
      "Node.js, React Native, PHP Framework, MySQL, AWS Engine Cloud"
    ],
    "integrations": [
      "LINE Official Account, Stripe, Local Payment Gateways, CRM Tools (HubSpot)"
    ],
    "deployment_options": [
      "cloud"
    ],
    "pricing_tier": "mid-market",
    "pricing_model": "subscription",
    "pricing_starts_at_thb": 5000,
    "pricing_note_th": "งานอีเวนต์ที่เปิดให้เข้าฟรีสามารถลงทะเบียนระบบพื้นฐานได้โดยมีค่าใช้จ่ายขั้นต่ำ ระบบเช็กอินหน้างานคิดราคาตามอุปกรณ์ที่ใช้",
    "pricing_note_en": "Free-admission events incur minimal processing fees; comprehensive automated onsite check-in kiosks scale by terminal quantities.",
    "founded_year": 2014,
    "employee_count": "11-50",
    "headquarters": "Bangkok, Thailand",
    "notable_clients": [
      "Techsauce Global Summit, Bangkok International Motor Show, Money Expo Thailand"
    ],
    "certifications": [
      "depa Certified Event Technology Vendor"
    ],
    "awards": [
      "Spark Awards Best Event App Finalist"
    ],
    "demo_video_url": "https://www.zipeventapp.com/home/organizer-demo",
    "case_study_urls": [
      "https://www.zipeventapp.com/blog/hybrid-exhibition-case-study"
    ],
    "brochure_url": "https://www.zipeventapp.com/media/zipevent-organizer-kit.pdf",
    "booth_activities_th": [
      "สาธิตระบบลงทะเบียนและพิมพ์แท็กติดหน้าอกความเร็วสูงภายใน 3 วินาที, บริการสุ่มรางวัลแจกของบูธผ่านแอป"
    ],
    "booth_activities_en": [
      "3-second rapid biometric and QR badge printing speed demonstration, Live lucky draw interactive showcase"
    ],
    "website": "https://www.zipeventapp.com",
    "contact_email": "sales@zipeventapp.com",
    "contact_phone": "66-2-xxx-xxxx",
    "contact_line_id": "@zipevent",
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
