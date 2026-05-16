# EventIQ Edge Functions — Botnoi Integration

Two Deno edge functions deployed to Supabase that Botnoi can call as custom tools.

## Endpoints

```
POST  https://<PROJECT>.supabase.co/functions/v1/find-booth
POST  https://<PROJECT>.supabase.co/functions/v1/faq-search
```

Both require `x-bot-id` header (or `bot_id` in body). The bot_id is resolved
against `events.botnoi_bot_id` to scope results to a single event.

## find-booth

Match a visitor's pain point against the event's exhibitors.

Request:
```http
POST /functions/v1/find-booth
x-bot-id: 6a013f62fb3079f00791473e
content-type: application/json

{ "pain": "ลด cost call center ด้วย AI" }
```

Response:
```json
{
  "event": { "id": "…", "name": "Bangkok AI Summit 2026" },
  "pain": "ลด cost call center ด้วย AI",
  "total_candidates": 12,
  "matches": [
    {
      "booth_id": "A-12",
      "company": "Botnoi Group",
      "description": "Voice AI Platform",
      "score": 95,
      "reasons": ["#AI", "solution: Voice Bot", "usecase: Call Center"],
      "competitive_edge": "…"
    }
  ]
}
```

## faq-search

Lightweight FAQ: built-in answers for venue/date, plus exhibitor keyword match.

Request:
```http
POST /functions/v1/faq-search
x-bot-id: 6a013f62fb3079f00791473e
content-type: application/json

{ "question": "งานจัดที่ไหน" }
```

Response:
```json
{
  "event": { "name": "…", "location": "BITEC Bangna" },
  "question": "งานจัดที่ไหน",
  "answer": "งาน \"…\" จัดที่ BITEC Bangna",
  "exhibitor_matches": []
}
```

## Setup in Botnoi Console

1. **Connect bot to event** — in EventIQ Platform > Bot tab, paste your Botnoi
   `bot_id` and save. EventIQ stores it in `events.botnoi_bot_id`.
2. **In console.botnoi.ai**, open your bot → Tools (or Webhook):
   - Add tool `find_booth` → method `POST` → URL = the find-booth endpoint above
   - Headers: `x-bot-id: <YOUR_BOT_ID>` (so the function knows which event)
   - Body schema: `{ pain: string }`
3. **Wire to intents** — when the bot detects "หาบูธ" / "อยากได้..." / "pain คือ..."
   intents, call the `find_booth` tool with the user message as `pain`.
4. **Link LINE OA** — in EventIQ Platform > Bot, paste your LINE OA ID. Then in
   Botnoi console > Channels, connect the same LINE OA.

## Deploy

Functions are deployed via the Supabase MCP — source kept here for review.
To redeploy from CLI:

```bash
supabase functions deploy find-booth --no-verify-jwt
supabase functions deploy faq-search --no-verify-jwt
```

`verify_jwt` is disabled because Botnoi cannot easily send a Supabase JWT.
Authentication is delegated to the `x-bot-id` header (which must match an
event's stored `botnoi_bot_id`).
