import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Building2, Boxes, Lightbulb, Award, Users, Trophy, Plus, Trash2, Loader2, Save } from "lucide-react";
import type {
  Exhibitor,
  Solution,
  UseCaseItem,
  SuccessStory,
} from "@/lib/supabase/types";

export type BoothFormPatch = {
  company_name: string;
  logo_url: string | null;
  description: string | null;
  product_info: string | null;
  promotion: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  website: string | null;
  tags: string[];
  solutions: Solution[];
  use_cases: UseCaseItem[];
  success_stories: SuccessStory[];
  clients: string[];
  competitive_edge: string | null;
};

type FormState = {
  company_name: string;
  logo_url: string;
  description: string;
  product_info: string;
  promotion: string;
  contact_email: string;
  contact_phone: string;
  website: string;
  tags: string;
  solutions: Solution[];
  use_cases: UseCaseItem[];
  success_stories: SuccessStory[];
  clients: string;
  competitive_edge: string;
};

const empty: FormState = {
  company_name: "",
  logo_url: "",
  description: "",
  product_info: "",
  promotion: "",
  contact_email: "",
  contact_phone: "",
  website: "",
  tags: "",
  solutions: [],
  use_cases: [],
  success_stories: [],
  clients: "",
  competitive_edge: "",
};

const splitCsv = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean);
const nullable = (s: string) => (s.trim() ? s : null);

function fromBooth(b: Exhibitor): FormState {
  return {
    company_name: b.company_name ?? "",
    logo_url: b.logo_url ?? "",
    description: b.description ?? "",
    product_info: b.product_info ?? "",
    promotion: b.promotion ?? "",
    contact_email: b.contact_email ?? "",
    contact_phone: b.contact_phone ?? "",
    website: b.website ?? "",
    tags: (b.tags ?? []).join(", "),
    solutions: b.solutions ?? [],
    use_cases: b.use_cases ?? [],
    success_stories: b.success_stories ?? [],
    clients: (b.clients ?? []).join(", "),
    competitive_edge: b.competitive_edge ?? "",
  };
}

function toPatch(f: FormState): BoothFormPatch {
  return {
    company_name: f.company_name,
    logo_url: nullable(f.logo_url),
    description: nullable(f.description),
    product_info: nullable(f.product_info),
    promotion: nullable(f.promotion),
    contact_email: nullable(f.contact_email),
    contact_phone: nullable(f.contact_phone),
    website: nullable(f.website),
    tags: splitCsv(f.tags),
    solutions: f.solutions.filter((s) => s.name.trim()),
    use_cases: f.use_cases.filter((u) => u.title.trim()),
    success_stories: f.success_stories.filter((s) => s.client.trim()),
    clients: splitCsv(f.clients),
    competitive_edge: nullable(f.competitive_edge),
  };
}

export function BoothProfileForm({
  booth,
  onSave,
  isSaving,
  submitLabel = "บันทึก",
}: {
  booth: Exhibitor;
  onSave: (patch: BoothFormPatch) => void;
  isSaving?: boolean;
  submitLabel?: string;
}) {
  const [form, setForm] = useState<FormState>(empty);
  useEffect(() => setForm(fromBooth(booth)), [booth]);

  const patchRow = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(toPatch(form));
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Accordion type="multiple" defaultValue={["company"]} className="space-y-2">
        {/* 1. Company */}
        <Section value="company" icon={Building2} title="ข้อมูลบริษัท" required>
          <div>
            <Label>Company Name *</Label>
            <Input
              required
              value={form.company_name}
              onChange={(e) => patchRow("company_name", e.target.value)}
            />
          </div>
          <div>
            <Label>Tagline / Short description</Label>
            <Textarea
              rows={2}
              value={form.description}
              onChange={(e) => patchRow("description", e.target.value)}
              placeholder="ผู้นำด้าน Voice AI สำหรับองค์กรไทย"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Logo URL</Label>
              <Input
                value={form.logo_url}
                onChange={(e) => patchRow("logo_url", e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                value={form.website}
                onChange={(e) => patchRow("website", e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Contact Email</Label>
              <Input
                type="email"
                value={form.contact_email}
                onChange={(e) => patchRow("contact_email", e.target.value)}
              />
            </div>
            <div>
              <Label>Contact Phone</Label>
              <Input
                value={form.contact_phone}
                onChange={(e) => patchRow("contact_phone", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label>Tags (คั่นด้วย ,)</Label>
            <Input
              value={form.tags}
              onChange={(e) => patchRow("tags", e.target.value)}
              placeholder="AI, Voice, Chatbot"
            />
          </div>
          <div>
            <Label>โปรโมชั่นในงาน</Label>
            <Textarea
              rows={2}
              value={form.promotion}
              onChange={(e) => patchRow("promotion", e.target.value)}
              placeholder="ลด 50% สำหรับลูกค้าที่สมัครภายในงาน"
            />
          </div>
        </Section>

        {/* 2. Solutions */}
        <Section value="solutions" icon={Boxes} title="โซลูชั่น / สินค้า / บริการ" count={form.solutions.length}>
          <RowList
            rows={form.solutions}
            onChange={(rows) => patchRow("solutions", rows)}
            empty={{ name: "", description: "" }}
            addLabel="เพิ่ม solution"
            renderRow={(row, update) => (
              <>
                <Input
                  placeholder="Voice Bot"
                  value={row.name}
                  onChange={(e) => update({ name: e.target.value })}
                />
                <Textarea
                  rows={2}
                  placeholder="คำอธิบายของ solution"
                  value={row.description}
                  onChange={(e) => update({ description: e.target.value })}
                />
              </>
            )}
          />
        </Section>

        {/* 3. Use cases */}
        <Section value="usecases" icon={Lightbulb} title="Use Cases — ใช้ทำอะไรได้" count={form.use_cases.length}>
          <RowList
            rows={form.use_cases}
            onChange={(rows) => patchRow("use_cases", rows)}
            empty={{ title: "", industry: "", description: "" }}
            addLabel="เพิ่ม use case"
            renderRow={(row, update) => (
              <>
                <div className="grid grid-cols-[1fr_160px] gap-2">
                  <Input
                    placeholder="Customer service automation"
                    value={row.title}
                    onChange={(e) => update({ title: e.target.value })}
                  />
                  <Input
                    placeholder="Industry (e.g. Banking)"
                    value={row.industry}
                    onChange={(e) => update({ industry: e.target.value })}
                  />
                </div>
                <Textarea
                  rows={2}
                  placeholder="รายละเอียดเพิ่มเติม"
                  value={row.description}
                  onChange={(e) => update({ description: e.target.value })}
                />
              </>
            )}
          />
        </Section>

        {/* 4. Success stories */}
        <Section value="success" icon={Award} title="Success Stories — ผลลัพธ์จริง" count={form.success_stories.length}>
          <RowList
            rows={form.success_stories}
            onChange={(rows) => patchRow("success_stories", rows)}
            empty={{ client: "", industry: "", outcome: "", description: "" }}
            addLabel="เพิ่ม success story"
            renderRow={(row, update) => (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="ลูกค้า (e.g. AIS)"
                    value={row.client}
                    onChange={(e) => update({ client: e.target.value })}
                  />
                  <Input
                    placeholder="Industry"
                    value={row.industry}
                    onChange={(e) => update({ industry: e.target.value })}
                  />
                </div>
                <Input
                  placeholder="ผลลัพธ์ (เช่น ลด cost 40%)"
                  value={row.outcome}
                  onChange={(e) => update({ outcome: e.target.value })}
                />
                <Textarea
                  rows={2}
                  placeholder="เล่าเรื่องสั้น ๆ"
                  value={row.description}
                  onChange={(e) => update({ description: e.target.value })}
                />
              </>
            )}
          />
        </Section>

        {/* 5. Clients */}
        <Section value="clients" icon={Users} title="ลูกค้า" count={splitCsv(form.clients).length}>
          <div>
            <Label>รายชื่อลูกค้า (คั่นด้วย ,)</Label>
            <Textarea
              rows={2}
              value={form.clients}
              onChange={(e) => patchRow("clients", e.target.value)}
              placeholder="AIS, Krungsri, SCG, True, Bangkok Hospital"
            />
          </div>
        </Section>

        {/* 6. Competitive edge */}
        <Section value="edge" icon={Trophy} title="Competitive Edge — ทำไมต้องเลือกฉัน">
          <Textarea
            rows={5}
            value={form.competitive_edge}
            onChange={(e) => patchRow("competitive_edge", e.target.value)}
            placeholder="ดีเด่นกว่าเจ้าอื่นในธุรกิจเดียวกันอย่างไร — เทคโนโลยี, ราคา, ทีม, ผลงาน, ฯลฯ"
          />
        </Section>

        {/* 7. Long product info (free-form) */}
        <Section value="product" icon={Boxes} title="Product Info (free-form)">
          <Textarea
            rows={4}
            value={form.product_info}
            onChange={(e) => patchRow("product_info", e.target.value)}
            placeholder="ข้อมูลสินค้า / บริการ แบบยาว (markdown ก็ได้)"
          />
        </Section>
      </Accordion>

      <Button type="submit" disabled={isSaving} className="w-full bg-gradient-primary">
        {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
        <Save className="h-4 w-4 mr-2" /> {submitLabel}
      </Button>
    </form>
  );
}

function Section({
  value,
  icon: Icon,
  title,
  count,
  required,
  children,
}: {
  value: string;
  icon: React.ElementType;
  title: string;
  count?: number;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <AccordionItem value={value} className="border rounded-lg px-4 bg-card/40">
      <AccordionTrigger className="hover:no-underline py-3">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <Icon className="h-4 w-4 text-primary" />
          {title}
          {required && <span className="text-destructive">*</span>}
          {typeof count === "number" && count > 0 && (
            <span className="ml-1 text-[10px] font-mono bg-secondary px-1.5 py-0.5 rounded">
              {count}
            </span>
          )}
        </span>
      </AccordionTrigger>
      <AccordionContent className="pb-4 pt-1 space-y-3">{children}</AccordionContent>
    </AccordionItem>
  );
}

function RowList<T>({
  rows,
  onChange,
  empty,
  addLabel,
  renderRow,
}: {
  rows: T[];
  onChange: (rows: T[]) => void;
  empty: T;
  addLabel: string;
  renderRow: (row: T, update: (patch: Partial<T>) => void) => React.ReactNode;
}) {
  const add = () => onChange([...rows, { ...empty }]);
  const remove = (i: number) => onChange(rows.filter((_, idx) => idx !== i));
  const update = (i: number) => (patch: Partial<T>) =>
    onChange(rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));

  return (
    <div className="space-y-3">
      {rows.map((r, i) => (
        <Card key={i} className="p-3 space-y-2 relative bg-background/40">
          <div className="flex items-start justify-between gap-2">
            <span className="text-[10px] font-mono text-muted-foreground">#{i + 1}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-destructive hover:bg-destructive/10"
              onClick={() => remove(i)}
              aria-label="Remove row"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
          {renderRow(r, update(i))}
        </Card>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={add} className="w-full">
        <Plus className="h-3.5 w-3.5 mr-1.5" />
        {addLabel}
      </Button>
    </div>
  );
}
