/**
 * Sheet → JSON sync.
 *
 * Reads exhibitor rows from the Google Sheet at `GOOGLE_SHEET_ID`, validates
 * each row with the canonical Zod schema, and emits a generated TS module
 * that the API and frontend import.
 *
 * Run modes:
 *   - `npm run sync:sheet`          ← manual, after DS updates the sheet
 *   - `npm run build` (via prebuild) ← Vercel triggers this every deploy
 *
 * The sheet MUST be shared as "Anyone with link can view" so the public CSV
 * export endpoint works without OAuth.
 *
 * If fetching fails (e.g. running offline) the script logs a warning and
 * keeps any previously generated file in place — the seed canonical records
 * are the fallback.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ExhibitorSchemaLenient, type ExhibitorLenient } from '../src/lib/mock/exhibitor.zod';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');

const SHEET_ID = process.env.GOOGLE_SHEET_ID ?? '1Jez5HQ0SsPmvHoceEWTGHNIBdmUprR_1ImLNg9hNN78';
const SHEET_GID = process.env.GOOGLE_SHEET_GID ?? '0';
const OUTPUT_PATH = resolve(REPO_ROOT, 'src/lib/mock/exhibitors.generated.ts');

const ENUM_FIELDS_LIST = new Set([
  'sub_industries', 'solution_categories', 'problem_statements_en', 'unique_value_props',
  'target_company_sizes', 'target_industries', 'target_roles', 'geographic_focus',
  'tech_stack', 'integrations', 'deployment_options', 'notable_clients',
  'certifications', 'awards', 'case_study_urls', 'booth_activities_th', 'booth_activities_en',
]);
const NUMERIC_FIELDS = new Set(['pricing_starts_at_thb', 'founded_year']);

async function main(): Promise<void> {
  console.log(`[sync-sheet] fetching gid=${SHEET_GID} from sheet ${SHEET_ID}…`);
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

  let csv: string;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    csv = await res.text();
  } catch (err) {
    console.warn(`[sync-sheet] fetch failed: ${err instanceof Error ? err.message : err}`);
    console.warn('[sync-sheet] keeping existing generated file (or canonical seeds will be used).');
    process.exitCode = 0; // non-fatal — build can continue
    return;
  }

  console.log(`[sync-sheet] downloaded ${csv.length} bytes`);

  const rows = parseCsv(csv);
  if (rows.length === 0) {
    console.error('[sync-sheet] no rows parsed — aborting');
    process.exitCode = 1;
    return;
  }

  const header = rows[0];
  const dataRows = rows.slice(1).filter((r) => r[0]?.startsWith('ex'));
  console.log(`[sync-sheet] header has ${header.length} columns, ${dataRows.length} data rows`);

  const exhibitors: ExhibitorLenient[] = [];
  const errors: { row: number; id?: string; message: string }[] = [];
  const partials: string[] = [];

  for (let i = 0; i < dataRows.length; i++) {
    const row = dataRows[i];
    const raw = mapRowToObject(header, row);
    const transformed = transformRow(raw);
    const parsed = ExhibitorSchemaLenient.safeParse(transformed);
    if (parsed.success) {
      exhibitors.push(parsed.data);
      // Mark partial if required fields are empty (still keep the row)
      if (!parsed.data.name || !parsed.data.long_pitch_en) {
        partials.push(parsed.data.id);
      }
    } else {
      errors.push({
        row: i + 2,
        id: raw.id as string | undefined,
        message: parsed.error.issues.slice(0, 3).map((iss) => `${iss.path.join('.')}: ${iss.message}`).join('; '),
      });
    }
  }

  if (errors.length > 0) {
    console.warn(`[sync-sheet] ${errors.length} row(s) failed even lenient parse:`);
    for (const e of errors.slice(0, 5)) {
      console.warn(`  · row ${e.row} (${e.id ?? '?'}): ${e.message}`);
    }
    if (errors.length > 5) console.warn(`  … and ${errors.length - 5} more`);
  }

  if (partials.length > 0) {
    console.warn(`[sync-sheet] ${partials.length} row(s) partial (missing name or long_pitch): ${partials.join(', ')}`);
  }

  console.log(`[sync-sheet] ${exhibitors.length}/${dataRows.length} rows accepted (${partials.length} partial)`);

  if (exhibitors.length === 0) {
    console.error('[sync-sheet] zero valid rows — refusing to write empty generated file');
    process.exitCode = 1;
    return;
  }

  const output = renderModule(exhibitors, dataRows.length, errors.length);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, output, 'utf8');
  console.log(`[sync-sheet] wrote ${OUTPUT_PATH}`);
}

/**
 * Minimal CSV parser that handles RFC 4180-ish quoting (double-quote escape,
 * comma inside quotes, newlines inside quotes). No deps, no edge-case heroics.
 */
function parseCsv(input: string): string[][] {
  const rows: string[][] = [];
  let cur: string[] = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (inQuotes) {
      if (ch === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        cur.push(field);
        field = '';
      } else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && input[i + 1] === '\n') i++;
        cur.push(field);
        rows.push(cur);
        cur = [];
        field = '';
      } else {
        field += ch;
      }
    }
  }
  if (field.length > 0 || cur.length > 0) {
    cur.push(field);
    rows.push(cur);
  }
  return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0].length > 0));
}

function mapRowToObject(header: string[], row: string[]): Record<string, string> {
  const obj: Record<string, string> = {};
  for (let i = 0; i < header.length; i++) {
    obj[header[i].trim()] = (row[i] ?? '').trim();
  }
  return obj;
}

function splitPipe(value: string): string[] {
  return value
    .split('|')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function transformRow(raw: Record<string, string>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...raw };

  for (const field of ENUM_FIELDS_LIST) {
    out[field] = raw[field] ? splitPipe(raw[field]) : [];
  }

  for (const field of NUMERIC_FIELDS) {
    if (raw[field]) {
      const n = Number(raw[field].replace(/[^\d.-]/g, ''));
      // founded_year must be a sane year; reject 0, small numbers, etc.
      const minOk = field === 'founded_year' ? n >= 1900 : n >= 0;
      if (Number.isFinite(n) && minOk) {
        out[field] = n;
      } else {
        delete out[field]; // let Zod default kick in
      }
    } else {
      delete out[field]; // let Zod default kick in
    }
  }

  if (raw.use_cases) {
    try {
      const cleaned = raw.use_cases
        .replace(/[“”]/g, '"')
        .replace(/[‘’]/g, "'");
      out.use_cases = JSON.parse(cleaned);
    } catch (err) {
      console.warn(`[sync-sheet] ${raw.id}: use_cases JSON parse failed (${err instanceof Error ? err.message : err}) — emitting empty array`);
      out.use_cases = [];
    }
  } else {
    out.use_cases = [];
  }

  for (const k of Object.keys(out)) {
    if (out[k] === '') delete out[k];
  }

  return out;
}

function renderModule(exhibitors: ExhibitorLenient[], totalRows: number, errorCount: number): string {
  const body = JSON.stringify(exhibitors, null, 2);
  return `/* eslint-disable */
/**
 * AUTO-GENERATED — do not edit by hand. Run \`npm run sync:sheet\` to refresh.
 *
 * Source: Google Sheet "EventIQ - Exhibitors Mock Data"
 *   https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit
 *
 * Generated at: ${new Date().toISOString()}
 * Total rows in sheet: ${totalRows}
 * Validation errors: ${errorCount}
 * Valid exhibitors: ${exhibitors.length}
 */
import type { ExhibitorLenient } from './exhibitor.zod';

export const EXHIBITORS_FROM_SHEET: ExhibitorLenient[] = ${body};
`;
}

main().catch((err) => {
  console.error('[sync-sheet] unexpected error:', err);
  process.exitCode = 1;
});
