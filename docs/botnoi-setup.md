# Botnoi.ai Setup Guide for EventIQ

คู่มือตั้ง Botnoi bot ของคุณให้คุยกับ Supabase backend ของ EventIQ
เพื่อให้ตอบคำถาม **FAQ** และทำ **booth matching** จากข้อมูลจริงในระบบ

> Backend ทั้งหมดพร้อมแล้ว — ที่ต้องทำในเอกสารนี้คือไป**กดตั้งใน console.botnoi.ai**

---

## ก่อนเริ่ม — เช็คให้พร้อม

- [ ] บัญชี Botnoi.ai มี bot สร้างไว้แล้ว (ไป https://console.botnoi.ai)
- [ ] แพ็คเกจ Botnoi ของคุณรองรับ **Custom Tool / API / Webhook** (ปกติเป็นเวอร์ชั่น Agent / LLM-based)
- [ ] มี event อย่างน้อย 1 record ใน Supabase `events` table
- [ ] รู้ bot_id ของคุณ (หาในหน้า bot setting ของ Botnoi console)

---

## Reference: Endpoints ที่ Botnoi จะเรียก

```
POST https://mjmmnojflrzeoqrvkumi.supabase.co/functions/v1/find-booth
POST https://mjmmnojflrzeoqrvkumi.supabase.co/functions/v1/faq-search
```

ทั้งคู่ต้องส่ง:
- `Content-Type: application/json`
- `x-bot-id: <YOUR_BOT_ID>` ← header สำคัญ — function ใช้ resolve ว่าเป็นของ event ไหน

---

## Step 1 — เชื่อม bot_id ใน EventIQ ก่อน

ก่อนตั้งใน Botnoi ต้องบอก EventIQ ก่อนว่า bot ตัวนี้เป็นของ event ไหน:

1. เปิด EventIQ → `/platform?event=<event-slug>`
2. กดแท็บ **🤖 Bot Integration**
3. ใส่ **Botnoi Bot ID** ที่ copy มาจาก console.botnoi.ai
4. กด **Connect Bot**

หลังกดแล้ว `events.botnoi_bot_id` จะถูกบันทึก — ตอนนี้ edge function จะรู้ว่า bot_id นี้ผูกกับ event ไหน

---

## Step 2 — Setup Custom Tool ใน Botnoi Console

### Tool 1: `find_booth`

ในหน้า bot ของคุณบน console.botnoi.ai → หา section **Tools / Functions / API Action**
(ขึ้นกับเวอร์ชั่น Botnoi อาจอยู่ใต้ Skills, Webhook, หรือ External Tool)

**ตั้งค่าตามนี้:**

| Field | Value |
|---|---|
| Tool name | `find_booth` |
| Description | `หาบูธที่ตรงกับ pain ของ visitor ใน event` |
| HTTP Method | `POST` |
| URL | `https://mjmmnojflrzeoqrvkumi.supabase.co/functions/v1/find-booth` |
| Headers | `Content-Type: application/json`<br>`x-bot-id: <YOUR_BOT_ID>` |
| Body type | `JSON` |
| Body template | `{ "pain": "{{user_message}}" }` |

**Input parameters (สิ่งที่ bot จะ extract จากข้อความ user):**

```json
{
  "pain": {
    "type": "string",
    "description": "ปัญหา / ความต้องการของ visitor (เช่น ลด cost call center, ทำ chatbot ไทย)",
    "required": true
  }
}
```

**Response shape ที่จะได้กลับมา:**

```json
{
  "event": { "id": "uuid", "name": "Bangkok AI Summit 2026" },
  "pain": "ลด cost call center",
  "total_candidates": 12,
  "matches": [
    {
      "booth_id": "A-12",
      "company": "Botnoi Group",
      "description": "Voice AI Platform",
      "website": "https://botnoi.ai",
      "contact_email": "contact@botnoi.ai",
      "logo_url": null,
      "tags": ["AI", "Voice", "Chatbot"],
      "competitive_edge": "...",
      "score": 95,
      "reasons": ["#AI", "solution: Voice Bot", "usecase: Call Center"]
    }
  ]
}
```

### Tool 2: `faq_search`

| Field | Value |
|---|---|
| Tool name | `faq_search` |
| Description | `ตอบคำถามทั่วไปเกี่ยวกับ event (สถานที่, วันที่, exhibitor ทั่วไป)` |
| HTTP Method | `POST` |
| URL | `https://mjmmnojflrzeoqrvkumi.supabase.co/functions/v1/faq-search` |
| Headers | `Content-Type: application/json`<br>`x-bot-id: <YOUR_BOT_ID>` |
| Body template | `{ "question": "{{user_message}}" }` |

**Response shape:**

```json
{
  "event": { "id": "uuid", "name": "...", "location": "BITEC", "start_date": "2026-05-10" },
  "question": "งานจัดที่ไหน",
  "answer": "งาน \"Bangkok AI Summit 2026\" จัดที่ BITEC Bangna",
  "exhibitor_matches": []
}
```

---

## Step 3 — สร้าง Intents และผูกกับ Tool

ใน Botnoi console > **Intents / Triggers / Routes**:

### Intent 1: หาบูธ → trigger `find_booth`

**Training phrases (ตัวอย่าง):**
```
อยากหาบูธที่...
มี booth ที่ทำเรื่อง...
ลด cost call center ทำยังไง
อยากได้ chatbot ภาษาไทย
หา vendor ที่ทำ...
pain ของฉันคือ...
มีโซลูชั่นเรื่อง... มั้ย
```

**Action:** เรียก tool `find_booth` โดยส่ง `pain` = user message ทั้งข้อความ
(หรือใช้ entity extraction ถ้า Botnoi รองรับ)

### Intent 2: FAQ → trigger `faq_search`

**Training phrases:**
```
งานจัดที่ไหน
ที่ไหน
where is the venue
วันไหน
when does it start
กี่โมง
มีอะไรกินมั้ย
```

**Action:** เรียก tool `faq_search` ส่ง `question` = user message

---

## Step 4 — Format Response Template

หลังจาก tool return JSON Botnoi ต้องแปลงเป็นข้อความตอบ

### Template สำหรับ `find_booth`

```
🎯 พบ {{matches.length}} บูธที่ตรงกับ pain ของคุณใน {{event.name}}:

{{#each matches}}
📍 *{{company}}* — Booth {{booth_id}} ({{score}}% match)
{{description}}
{{#if competitive_edge}}✨ {{competitive_edge}}{{/if}}
🔗 {{website}}

{{/each}}

ต้องการรายละเอียดบูธไหนเพิ่ม พิมพ์ "{{matches.[0].booth_id}}" ได้เลย
```

(syntax อาจต่างกันแล้วแต่ template engine ของ Botnoi — Handlebars/Mustache/native)

### Template สำหรับ `faq_search`

```
{{answer}}

{{#if exhibitor_matches.length}}
🎪 บูธที่เกี่ยวข้อง:
{{#each exhibitor_matches}}
• {{company}} — Booth {{booth_id}}
{{/each}}
{{/if}}
```

### Fallback message
ถ้า tool error หรือ `matches: []`:
```
ขออภัยค่ะ ลองอธิบาย pain ใหม่อีกครั้ง หรือพิมพ์ "ขอคุยกับทีมงาน"
```

---

## Step 5 — เทสว่าทำงาน

### 5.1 เทส endpoint โดยตรง (ก่อนเทสในแชท)

```bash
# Booth matching
curl -X POST https://mjmmnojflrzeoqrvkumi.supabase.co/functions/v1/find-booth \
  -H "Content-Type: application/json" \
  -H "x-bot-id: <YOUR_BOT_ID>" \
  -d '{"pain":"ลด cost call center ด้วย AI"}'

# FAQ
curl -X POST https://mjmmnojflrzeoqrvkumi.supabase.co/functions/v1/faq-search \
  -H "Content-Type: application/json" \
  -H "x-bot-id: <YOUR_BOT_ID>" \
  -d '{"question":"งานจัดที่ไหน"}'
```

ต้องได้ JSON response ถ้าได้ `{"error":"Unknown bot_id"}` แสดงว่ายังไม่ได้ทำ Step 1
ถ้าได้ `{"matches":[]}` แสดงว่ายังไม่มี exhibitor ใน event นั้น

### 5.2 เทสในแชทของ Botnoi
ใน console.botnoi.ai มี "Preview / Test chat" — พิมพ์ test phrases ดูว่า:
- ✓ Intent ถูก trigger (เห็นใน intent log)
- ✓ Tool ถูกเรียก (ดู API call log)
- ✓ Response ถูก format

### 5.3 เทสจริงในเว็บ EventIQ
1. เปิด https://your-eventiq.com/visitor?event=<slug>
2. กด Botnoi chat bubble ที่มุมขวาล่าง
3. พิมพ์ "อยากลด cost call center"
4. bot ต้องตอบมาเป็นรายการบูธ

---

## Step 6 (เลือก) — Link LINE OA

ถ้าอยากให้ visitor คุยผ่าน LINE ด้วย (ไม่ใช่แค่เว็บ widget):

1. ใน EventIQ → Platform > Bot tab → ใส่ **LINE OA ID** + display name → Save
2. ใน Botnoi console > **Channels / Integrations** > เลือก **LINE OA**
3. Authorize Botnoi ให้เข้าถึง LINE OA ของ event
4. หลังจากนั้น message ที่เข้ามาทาง LINE จะใช้ tools / intents / KB เดียวกับใน web widget

---

## Troubleshooting

### `Unknown bot_id` (HTTP 401)
- เช็คว่า `x-bot-id` header ตรงกับค่าใน `events.botnoi_bot_id` ของ Supabase
- เช็คว่ากด Save ใน Platform > Bot tab แล้ว
- query Supabase: `select id, name, botnoi_bot_id from events where botnoi_bot_id = '<id>';`

### `matches: []` ตลอด
- DB ยังไม่มี exhibitor — สร้างผ่าน Organizer dashboard
- เช็คว่า exhibitor มี `tags`, `solutions`, `use_cases` ตรงกับ pain ที่ user พิมพ์

### Botnoi ไม่เรียก tool
- เช็ค intent confidence threshold — อาจสูงเกินจน intent ไม่ match
- เช็ค training phrases ครอบคลุมพอ
- ลองใช้ "fallback intent → ask LLM to call tool" ถ้าเวอร์ชั่น Botnoi รองรับ

### CORS error ใน browser
- ไม่เกิดปกติ เพราะ Botnoi เรียกจาก server (ไม่ใช่ browser)
- ถ้าเทส curl ผ่าน proxy → ใส่ `-H "Origin: ..."` ดู error

### หา Tools menu ไม่เจอใน Botnoi
- เวอร์ชั่น Botnoi classic อาจไม่มี — ต้อง upgrade เป็น Agent edition
- ลองค้นหา keyword: Webhook, External API, Integration, Action

---

## Architecture Diagram

```
                                ┌─────────────────────┐
  Visitor (browser/LINE)        │  Botnoi.ai (Cloud)  │
        │                       │   Your Agent        │
        │  chat: "ลด cost..."    │   - Intents         │
        ├──────────────────────► │   - Tools           │
        │                       │   - LLM             │
        │                       └─────────┬───────────┘
        │                                 │
        │                                 │ POST + x-bot-id
        │                                 │ { pain: "..." }
        │                                 ▼
        │                       ┌─────────────────────────┐
        │                       │  Supabase Edge Function │
        │                       │  /find-booth            │
        │                       │  /faq-search            │
        │                       └─────────┬───────────────┘
        │                                 │
        │                                 │ SQL (service-role)
        │                                 ▼
        │                       ┌─────────────────────────┐
        │                       │  Supabase Postgres      │
        │                       │  events, exhibitors     │
        │                       └─────────┬───────────────┘
        │                                 │
        │  bot reply formatted from JSON  │
        ◄─────────────────────────────────┘
```

---

## Next-level: ปรับปรุง matching ให้ฉลาดขึ้น

ตอนนี้ `find-booth` ใช้ keyword matching ธรรมดา (tag overlap, substring match)
ถ้าอยาก upgrade:

1. **Vector search (pgvector)** — embed pain + booth descriptions, ใช้ cosine similarity
2. **LLM rerank** — ส่ง top 10 keyword matches เข้า GPT-4/Claude ให้เรียงตามความเกี่ยวข้องจริง
3. **Behavioral signal** — track click-through ของ visitor ก่อน, ใช้ feedback loop

ทั้งหมดอยู่ในขอบเขตของ edge function เดียวกัน — แค่เปลี่ยน logic ไม่ต้องเปลี่ยน Botnoi config
