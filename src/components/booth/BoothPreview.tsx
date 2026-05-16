import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Boxes, Lightbulb, Users } from "lucide-react";
import type { Exhibitor } from "@/lib/supabase/types";

export function BoothPreview({ booth }: { booth: Exhibitor }) {
  const tags = booth.tags ?? [];
  const solutions = booth.solutions ?? [];
  const useCases = booth.use_cases ?? [];
  const stories = booth.success_stories ?? [];
  const clients = booth.clients ?? [];

  return (
    <Card className="p-6 glass max-w-3xl space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-md text-2xl font-bold overflow-hidden">
          {booth.logo_url ? (
            <img src={booth.logo_url} alt="logo" className="h-full w-full object-cover" />
          ) : (
            booth.company_name?.charAt(0) ?? "?"
          )}
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-bold truncate">{booth.company_name || "ไม่ได้ตั้งชื่อบริษัท"}</h2>
          <div className="flex flex-wrap gap-1.5 mt-1">
            <Badge variant="outline" className="font-mono">{booth.booth_id}</Badge>
            {tags.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
          </div>
        </div>
      </div>

      {booth.description && <p className="text-sm leading-relaxed">{booth.description}</p>}

      {/* Promotion */}
      {booth.promotion && (
        <div className="p-3 rounded-lg bg-gradient-to-br from-amber-100 to-rose-100 dark:from-amber-950/40 dark:to-rose-950/40">
          <h3 className="font-semibold text-sm mb-1">🎉 Promotion</h3>
          <p className="text-sm whitespace-pre-line">{booth.promotion}</p>
        </div>
      )}

      {/* Solutions */}
      {solutions.length > 0 && (
        <Section icon={Boxes} title="Solutions / Products">
          <div className="grid sm:grid-cols-2 gap-2">
            {solutions.map((s, i) => (
              <div key={i} className="p-3 rounded border bg-background/40">
                <div className="text-sm font-medium">{s.name}</div>
                {s.description && (
                  <div className="text-xs text-muted-foreground mt-0.5 whitespace-pre-line">
                    {s.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Use cases */}
      {useCases.length > 0 && (
        <Section icon={Lightbulb} title="Use Cases">
          <div className="space-y-2">
            {useCases.map((u, i) => (
              <div key={i} className="p-3 rounded border bg-background/40">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium truncate">{u.title}</span>
                  {u.industry && (
                    <Badge variant="outline" className="text-[10px] shrink-0">{u.industry}</Badge>
                  )}
                </div>
                {u.description && (
                  <div className="text-xs text-muted-foreground mt-1 whitespace-pre-line">
                    {u.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Success stories */}
      {stories.length > 0 && (
        <Section icon={Award} title="Success Stories">
          <div className="space-y-2">
            {stories.map((s, i) => (
              <div key={i} className="p-3 rounded border bg-background/40">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold">{s.client}</span>
                  {s.industry && (
                    <Badge variant="outline" className="text-[10px]">{s.industry}</Badge>
                  )}
                </div>
                {s.outcome && (
                  <div className="text-xs text-success mt-1">→ {s.outcome}</div>
                )}
                {s.description && (
                  <div className="text-xs text-muted-foreground mt-1 whitespace-pre-line">
                    {s.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Clients */}
      {clients.length > 0 && (
        <Section icon={Users} title="ลูกค้า">
          <div className="flex flex-wrap gap-1.5">
            {clients.map((c) => <Badge key={c} variant="secondary">{c}</Badge>)}
          </div>
        </Section>
      )}

      {/* Competitive edge */}
      {booth.competitive_edge && (
        <Section icon={Trophy} title="ทำไมต้องเลือกเรา">
          <p className="text-sm leading-relaxed whitespace-pre-line">{booth.competitive_edge}</p>
        </Section>
      )}

      {/* Product info free-form */}
      {booth.product_info && (
        <Section icon={Boxes} title="Product Info">
          <p className="text-sm whitespace-pre-line text-muted-foreground">{booth.product_info}</p>
        </Section>
      )}

      {/* Contact */}
      <div className="text-xs text-muted-foreground space-y-1 pt-3 border-t">
        {booth.contact_email && <div>✉ {booth.contact_email}</div>}
        {booth.contact_phone && <div>☎ {booth.contact_phone}</div>}
        {booth.website && (
          <div>
            🌐 <a href={booth.website} target="_blank" rel="noreferrer" className="text-primary hover:underline">
              {booth.website}
            </a>
          </div>
        )}
      </div>
    </Card>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-primary" />
        {title}
      </h3>
      {children}
    </div>
  );
}
