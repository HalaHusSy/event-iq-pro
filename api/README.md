# EventIQ API (Vercel serverless)

Backend for the Botnoi Console webhook + EventIQ web app. Deployed as
Vercel serverless functions under `/api/*`.

## Endpoints

| Method | Path | Purpose | Auth |
|---|---|---|---|
| GET | `/api/health` | liveness + route listing | none |
| GET | `/api/exhibitors?industry=X&solution=Y&hall=Z` | list booths | none |
| GET | `/api/exhibitors/:id` | one booth detail | none |
| GET | `/api/faq` | all FAQ entries | none |
| POST | `/api/match` | pain point → ranked booth cards | none (CORS open) |
| POST | `/api/faq` | question → top FAQ answers | none (CORS open) |
| POST | `/api/admin/sheet-sync` | re-pull Google Sheet → JSON | `X-Eventiq-Token` header matches `ADMIN_TOKEN` env var |
| POST | `/api/admin/exhibitor` | upsert booth via Apps Script proxy | `X-Eventiq-Token` |

## Botnoi Console integration

Configure 2 webhooks in https://console.botnoi.ai:

### 1. Bot Matching webhook

```
URL:     https://<your-deployment>.vercel.app/api/match
Method:  POST
Headers: Content-Type: application/json
Body:    {
           "message": "{{user_message}}",
           "user_id": "{{user_id}}",
           "lang": "th"
         }
```

Map response fields → bot reply:
- `reply_text` → text bubble
- `cards[]` → carousel (each with rank, booth_no, hall, why_match_th, top_use_case)
- `follow_up_question` → quick reply prompt

### 2. Bot FAQ webhook

```
URL:     https://<your-deployment>.vercel.app/api/faq
Method:  POST
Body:    {"question": "{{user_message}}", "lang": "th"}
```

Map `answer` → bot reply, `related_questions` → quick reply chips.

## Local development

```bash
# install Vercel CLI once
npm install -g vercel

# link to your Vercel project (one-time)
vercel link

# start local server (frontend + /api functions)
vercel dev
# → http://localhost:3000  serves both Vite and /api/*

# or test just the API
curl -X POST http://localhost:3000/api/match \
  -H 'Content-Type: application/json' \
  -d '{"message":"อยากลด call center cost","lang":"th"}'
```

## Deploy

```bash
vercel --prod
```

First deploy:
1. `vercel login`
2. `vercel link` (pick or create project event-iq-pro)
3. Add env vars in Vercel dashboard (Settings → Environment Variables):
   - `ANTHROPIC_API_KEY`
   - `ADMIN_TOKEN`
   - `GOOGLE_SHEET_ID`
   - `APPS_SCRIPT_WEBAPP_URL` (after Chunk 4)
4. `vercel --prod`
5. Get public URL → paste into Botnoi Console webhook config

Push to `main` triggers auto-deploy. Push to `solo_test1` deploys a preview URL.

## Status

- ✅ Chunk 2: 8 endpoints scaffolded with mock retrieval and CORS
- ⏳ Chunk 3: replace `mockMatch` with Claude rerank + flexsearch
- ⏳ Chunk 3: implement real `/api/admin/sheet-sync` against Google Sheet CSV
- ⏳ Chunk 4: Apps Script Web App + `/api/admin/exhibitor` write-back
- ⏳ Chunk 5: `/platform/api-test` playground page
