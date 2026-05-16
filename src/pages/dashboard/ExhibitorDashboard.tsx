import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Loader2, Save, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { getMyExhibitor, updateExhibitor } from "@/lib/data/queries";

const NAV = [
  { id: "booth", label: "My Booth", icon: Building2 },
  { id: "preview", label: "Preview", icon: Sparkles },
];

export default function ExhibitorDashboard() {
  const [view, setView] = useState("booth");
  const qc = useQueryClient();
  const { data: booth, isLoading } = useQuery({
    queryKey: ["my_exhibitor"],
    queryFn: getMyExhibitor,
  });

  const [form, setForm] = useState({
    company_name: "",
    description: "",
    product_info: "",
    promotion: "",
    contact_email: "",
    contact_phone: "",
    website: "",
    logo_url: "",
    tags: "",
  });

  useEffect(() => {
    if (booth) {
      setForm({
        company_name: booth.company_name ?? "",
        description: booth.description ?? "",
        product_info: booth.product_info ?? "",
        promotion: booth.promotion ?? "",
        contact_email: booth.contact_email ?? "",
        contact_phone: booth.contact_phone ?? "",
        website: booth.website ?? "",
        logo_url: booth.logo_url ?? "",
        tags: (booth.tags ?? []).join(", "),
      });
    }
  }, [booth]);

  const save = useMutation({
    mutationFn: () =>
      updateExhibitor(booth!.id, {
        company_name: form.company_name,
        description: form.description || null,
        product_info: form.product_info || null,
        promotion: form.promotion || null,
        contact_email: form.contact_email || null,
        contact_phone: form.contact_phone || null,
        website: form.website || null,
        logo_url: form.logo_url || null,
        tags: form.tags
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my_exhibitor"] });
      qc.invalidateQueries({ queryKey: ["exhibitors"] });
      toast.success("บันทึก booth profile แล้ว");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <DashboardLayout
      title="My Booth"
      subtitle={booth ? `Booth ${booth.booth_id} • ${booth.company_name}` : "Booth profile"}
      roleBadge="EXHIBITOR"
      roleBadgeClass="bg-emerald-500/15 text-emerald-700 border-emerald-500/30"
      nav={NAV}
      activeId={view}
      onSelect={setView}
    >
      {isLoading ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : !booth ? (
        <Card className="p-6 glass">
          <h2 className="font-semibold mb-2">ยังไม่ได้ link เข้ากับ booth</h2>
          <p className="text-sm text-muted-foreground">
            กรุณาให้ organizer สร้าง booth และ link มาที่ account นี้ก่อน
          </p>
        </Card>
      ) : view === "booth" ? (
        <Card className="p-5 glass max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Booth Profile</h2>
            <Badge variant="outline" className="font-mono">{booth.booth_id}</Badge>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              save.mutate();
            }}
            className="space-y-3"
          >
            <div>
              <Label>Company Name *</Label>
              <Input
                required
                value={form.company_name}
                onChange={(e) => setForm({ ...form, company_name: e.target.value })}
              />
            </div>
            <div>
              <Label>Logo URL</Label>
              <Input
                value={form.logo_url}
                onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div>
              <Label>Product Info</Label>
              <Textarea
                rows={3}
                value={form.product_info}
                onChange={(e) => setForm({ ...form, product_info: e.target.value })}
              />
            </div>
            <div>
              <Label>Promotion / โปรโมชั่นในงาน</Label>
              <Textarea
                rows={2}
                value={form.promotion}
                onChange={(e) => setForm({ ...form, promotion: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Contact Email</Label>
                <Input
                  type="email"
                  value={form.contact_email}
                  onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                />
              </div>
              <div>
                <Label>Contact Phone</Label>
                <Input
                  value={form.contact_phone}
                  onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label>Website</Label>
              <Input
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Tags (คั่นด้วย ,)</Label>
              <Input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="ai, banking, fintech"
              />
            </div>
            <Button type="submit" disabled={save.isPending} className="w-full bg-gradient-primary">
              {save.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              <Save className="h-4 w-4 mr-2" /> บันทึก
            </Button>
          </form>
        </Card>
      ) : (
        <BoothPreview booth={booth} form={form} />
      )}
    </DashboardLayout>
  );
}

function BoothPreview({
  booth,
  form,
}: {
  booth: { booth_id: string };
  form: {
    company_name: string;
    description: string;
    product_info: string;
    promotion: string;
    contact_email: string;
    contact_phone: string;
    website: string;
    logo_url: string;
    tags: string;
  };
}) {
  const tags = form.tags.split(",").map((s) => s.trim()).filter(Boolean);
  return (
    <Card className="p-6 glass max-w-2xl">
      <div className="flex items-center gap-4 mb-4">
        <div className="grid h-16 w-16 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-md text-2xl font-bold">
          {form.logo_url ? (
            <img src={form.logo_url} alt="logo" className="h-full w-full object-cover rounded-xl" />
          ) : (
            form.company_name?.charAt(0) ?? "?"
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold">{form.company_name || "ไม่ได้ตั้งชื่อบริษัท"}</h2>
          <div className="flex gap-2 mt-1">
            <Badge variant="outline" className="font-mono">{booth.booth_id}</Badge>
            {tags.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
          </div>
        </div>
      </div>
      {form.description && <p className="text-sm mb-3">{form.description}</p>}
      {form.product_info && (
        <div className="mb-3">
          <h3 className="font-semibold text-sm mb-1">Products</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-line">{form.product_info}</p>
        </div>
      )}
      {form.promotion && (
        <div className="mb-3 p-3 rounded-lg bg-gradient-to-br from-amber-100 to-rose-100 dark:from-amber-950/40 dark:to-rose-950/40">
          <h3 className="font-semibold text-sm mb-1">🎉 Promotion</h3>
          <p className="text-sm whitespace-pre-line">{form.promotion}</p>
        </div>
      )}
      <div className="text-xs text-muted-foreground space-y-1 mt-4 pt-3 border-t">
        {form.contact_email && <div>✉ {form.contact_email}</div>}
        {form.contact_phone && <div>☎ {form.contact_phone}</div>}
        {form.website && (
          <div>
            🌐 <a href={form.website} target="_blank" rel="noreferrer" className="text-primary hover:underline">
              {form.website}
            </a>
          </div>
        )}
      </div>
    </Card>
  );
}
