import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { updateExhibitor } from "@/lib/data/queries";
import { BoothProfileForm, type BoothFormPatch } from "./BoothProfileForm";
import type { Exhibitor } from "@/lib/supabase/types";

export function EditBoothDialog({ booth }: { booth: Exhibitor }) {
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();

  const save = useMutation({
    mutationFn: (patch: BoothFormPatch) => updateExhibitor(booth.id, patch),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["exhibitors"] });
      qc.invalidateQueries({ queryKey: ["my_exhibitor"] });
      toast.success(`บันทึก ${booth.company_name} แล้ว`);
      setOpen(false);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        <Pencil className="h-3.5 w-3.5 mr-1" />
        Edit detail
      </Button>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>แก้ไขข้อมูลบูธ — {booth.company_name}</DialogTitle>
          <DialogDescription>
            Booth {booth.booth_id} · proxy edit (จะถูกบันทึกใน audit log)
          </DialogDescription>
        </DialogHeader>
        <BoothProfileForm
          booth={booth}
          isSaving={save.isPending}
          onSave={(patch) => save.mutate(patch)}
          submitLabel="บันทึกการแก้ไข"
        />
      </DialogContent>
    </Dialog>
  );
}
