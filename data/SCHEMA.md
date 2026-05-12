# EventIQ Exhibitor Mock Data — คู่มือ DS

## ภาพรวม
- DS 3 คน แบ่งกันกรอก 30 บูธ (คนละ 10 บูธ)
- กรอกใน Google Sheet ที่ SE สร้างจาก `exhibitors.csv` ในโฟลเดอร์นี้
- **ไม่ต้องแตะ TypeScript / repo เอง** — กรอก Sheet แล้ว export CSV ส่งคืน SE
- Deadline: **ภายในวันที่ 5 ของ Week 1** (DS 30 บูธ + personas 8 ตัว + pain queries 30 ข้อ)

---

## วิธีกรอก field ที่ซับซ้อน

### 1. Pipe-separated lists
ช่องที่ระบุ `pipe-sep` ในตารางด้านล่าง = ใช้ ` | ` (space-pipe-space) คั่น
```
ตัวอย่าง: solution_categories = "Conversational AI | Voice AI"
ตัวอย่าง: notable_clients     = "AIS | SCG | Krungsri"
```

### 2. `use_cases` field — JSON string ในช่องเดียว
กรอก array ของ object 3 รายการต่อบูธ. **ต้องเป็น valid JSON** (double-quote เท่านั้น):
```json
[
  {"title":"Bank IVR Replacement","industry":"Banking","problem_th":"ลูกค้ารอสายนาน","problem_en":"Long hold time","solution_summary":"24/7 Thai voice bot","outcome_metric":"AHT -35%","customer_anonymized":"Top-3 Thai bank"},
  {"title":"...","industry":"...","problem_th":"...","problem_en":"...","solution_summary":"...","outcome_metric":"...","customer_anonymized":"..."},
  {"title":"...","industry":"...","problem_th":"...","problem_en":"...","solution_summary":"...","outcome_metric":"...","customer_anonymized":"..."}
]
```
💡 **Tip:** เขียนใน text editor ก่อน → paste เข้าช่อง. ห้ามใช้ smart quotes (")

---

## Enum Values (ค่าที่อนุญาต — ต้องสะกดตรงเป๊ะ)

### `industry` (เลือก 1)
```
Finance, Banking, Insurance,
Healthcare, Pharmaceutical,
Manufacturing, Automotive,
Retail, E-commerce, F&B,
Education, Government,
Logistics, Real Estate,
Energy, Agriculture,
Media & Entertainment, Telecom,
AI/SaaS, Cybersecurity, Other
```

### `solution_categories` (เลือกได้หลาย, pipe-sep)
```
Conversational AI, Voice AI, Document AI / RAG, Computer Vision,
Predictive Analytics, BI / Dashboard, Data Platform,
Cloud Infrastructure, DevOps, Cybersecurity,
Payment, Marketing Automation, CRM, HR Tech,
IoT / Edge, Robotics, Blockchain,
LMS / EdTech, PropTech, Other
```

### `target_company_sizes` (เลือกได้หลาย, pipe-sep)
```
Startup, SME, Mid-Market, Enterprise, Government
```

### `target_industries` (เลือกได้หลาย, pipe-sep — ใช้ค่าเดียวกับ `industry`)

### `deployment_options` (เลือกได้หลาย, pipe-sep)
```
cloud, on-prem, hybrid, edge
```

### `pricing_tier` (เลือก 1)
```
startup, mid-market, enterprise
```

### `pricing_model` (เลือก 1)
```
subscription, usage, license, project
```

### `employee_count` (เลือก 1)
```
1-10, 11-50, 51-200, 201-500, 500+
```

---

## Vertical Mix ของ 30 บูธ (แบ่งงาน DS)

| # | Bucket | Count | id range | Owner |
|---|---|---|---|---|
| 1 | Conversational AI / Chatbot | 3 | ex01-03 | DS1 |
| 2 | Voice AI / Speech | 2 | ex04-05 | DS1 |
| 3 | LLM / RAG / Enterprise AI | 3 | ex06-08 | DS1 |
| 4 | Cloud / DevOps | 2 | ex09-10 | DS1 (10 ✓) |
| 5 | Cybersecurity / PDPA | 2 | ex11-12 | DS2 |
| 6 | Fintech / Payment | 2 | ex13-14 | DS2 |
| 7 | Data / BI / Analytics | 2 | ex15-16 | DS2 |
| 8 | HR Tech / LMS | 2 | ex17-18 | DS2 |
| 9 | Martech / CRM | 2 | ex19-20 | DS2 (10 ✓) |
| 10 | HealthTech / Medical AI | 2 | ex21-22 | DS3 |
| 11 | Retail / CV / E-com | 2 | ex23-24 | DS3 |
| 12 | Manufacturing / IIoT / Robotics | 2 | ex25-26 | DS3 |
| 13 | Logistics | 1 | ex27 | DS3 |
| 14 | AgriTech / IoT | 1 | ex28 | DS3 |
| 15 | PropTech | 1 | ex29 | DS3 |
| 16 | GreenTech / Energy | 1 | ex30 | DS3 (10 ✓) |

**Booth numbering convention:** `<hall>-<2-digit>` เช่น `A-12`, `B-04`, `C-21`, `D-08`
**Hall convention:** Hall A = AI/SaaS, Hall B = Data/Cloud, Hall C = Fintech/Security, Hall D = Industrial/Other (ไม่ต้องเคร่ง ใช้เป็น guideline)

---

## Field Reference (ดูใน `exhibitors.csv` สำหรับ headers ครบ)

| Field | Required | TH/EN | Notes |
|---|---|---|---|
| `id` | ✅ | — | `ex01`-`ex30` (ตามตารางด้านบน) |
| `name` | ✅ | EN | ชื่อบริษัทเต็ม |
| `logo_url` | ✅ | — | emoji 1 ตัวก่อน (Designer ทำ asset ทีหลัง) |
| `booth_no` | ✅ | — | เช่น `A-12` |
| `hall` | ✅ | — | เช่น `Hall A` |
| `industry` | ✅ | enum | ดู enum ด้านบน |
| `sub_industries` | ✅ | pipe-sep | 1-3 ค่า, free-form |
| `solution_categories` | ✅ | enum, pipe-sep | 1-3 ค่า |
| `tagline_th` / `tagline_en` | ✅ | bilingual | < 80 chars, เป็น hook |
| `description_th` / `description_en` | ✅ | bilingual | 2-3 ประโยค |
| `long_pitch_en` | ✅ | EN | **สำคัญสุด** — ~150 คำ — agent ใช้ search corpus นี้. ใส่ keyword จาก pain ที่ลูกค้าน่าจะถาม |
| `problem_statements_en` | ✅ | EN, pipe-sep | 3-5 ปัญหาที่บริษัทแก้ให้ลูกค้า, ใส่คำที่ลูกค้าพิมพ์ (เช่น "reduce cost", "automate", "scale") |
| `unique_value_props` | ✅ | EN, pipe-sep | 3 จุดแข็ง |
| `target_company_sizes` | ✅ | enum, pipe-sep | |
| `target_industries` | ✅ | enum, pipe-sep | |
| `target_roles` | ⚪ | pipe-sep | เช่น `CTO \| CFO \| Head of CX` |
| `geographic_focus` | ⚪ | pipe-sep | เช่น `TH \| SEA` |
| `tech_stack` | ✅ | EN, pipe-sep | |
| `integrations` | ✅ | EN, pipe-sep | LINE OA, Salesforce, SAP, etc. |
| `deployment_options` | ✅ | enum, pipe-sep | |
| `pricing_tier` | ✅ | enum | |
| `pricing_model` | ✅ | enum | |
| `pricing_starts_at_thb` | ✅ | number | 0 = contact sales |
| `pricing_note_th` / `pricing_note_en` | ✅ | bilingual | เช่น "POC ฟรี 30 วัน" |
| `founded_year` | ✅ | number | |
| `employee_count` | ✅ | enum | |
| `headquarters` | ✅ | EN | เช่น `Bangkok, Thailand` |
| `notable_clients` | ✅ | EN, pipe-sep | 3-5 ราย (public marketing OK) |
| `certifications` | ⚪ | pipe-sep | ISO 27001, SOC 2, PDPA-certified |
| `awards` | ⚪ | pipe-sep | |
| `demo_video_url` | ⚪ | — | YouTube URL ถ้ามี |
| `case_study_urls` | ⚪ | pipe-sep URLs | |
| `brochure_url` | ⚪ | — | |
| `booth_activities_th` / `booth_activities_en` | ⚪ | pipe-sep | เช่น "POC ฟรี 15 นาที" |
| `website` | ✅ | URL | |
| `contact_email` | ✅ | email | |
| `contact_phone` | ⚪ | — | |
| `contact_line_id` | ⚪ | — | |
| `use_cases` | ✅ | JSON string | 3 use cases — ดู template ด้านบน |

(✅ = required, ⚪ = optional)

---

## Do / Don't

### ✅ Do
- ใช้ข้อมูลจริงเท่าที่หาได้ (เว็บไซต์บริษัท, LinkedIn, press release) — exhibition data เป็น public marketing
- ถ้าหาไม่เจอ → ประมาณการที่ "น่าเชื่อถือ" (เช่น employee count ใช้ band ไม่ใช่ตัวเลขเป๊ะ)
- เขียน `long_pitch_en` ให้มี **keyword ที่ visitor น่าจะพิมพ์** ใน Find Booth (cost, automation, scale, compliance, AI, Thai, voice, etc.)
- ใช้ emoji ที่ unique แต่ละบูธ (อย่าใช้ 🤖 ซ้ำ 5 ตัว)
- ตรวจ JSON ของ `use_cases` ใน jsonlint.com ก่อนวาง

### ❌ Don't
- **อย่ากรอก field เป็นภาษาผสม** ถ้า field ระบุ EN-only (ทำ retrieval พัง)
- อย่าใช้ comma คั่นในช่อง pipe-sep — ใช้ ` | ` เท่านั้น
- อย่าใส่ value enum ผิดสะกด (Conversational AI ไม่ใช่ "conversation AI" หรือ "Conv AI")
- อย่าทำ booth_no ซ้ำกัน
- อย่าใช้ smart quotes ใน JSON field — copy-paste จาก Word/Google Doc แล้วมักโดน
