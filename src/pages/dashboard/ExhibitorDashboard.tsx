import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { getMyExhibitor, updateExhibitor } from "@/lib/data/queries";
import { BoothProfileForm, type BoothFormPatch } from "@/components/booth/BoothProfileForm";
import { BoothPreview } from "@/components/booth/BoothPreview";

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

  const save = useMutation({
    mutationFn: (patch: BoothFormPatch) => updateExhibitor(booth!.id, patch),
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
        <Card className="p-5 glass max-w-3xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Booth Profile</h2>
            <Badge variant="outline" className="font-mono">{booth.booth_id}</Badge>
          </div>
          <BoothProfileForm
            booth={booth}
            isSaving={save.isPending}
            onSave={(patch) => save.mutate(patch)}
          />
        </Card>
      ) : (
        <BoothPreview booth={booth} />
      )}
    </DashboardLayout>
  );
}
