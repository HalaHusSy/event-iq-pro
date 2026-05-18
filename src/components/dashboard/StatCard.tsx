import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  value: number | string | undefined;
  hint?: string;
  icon: LucideIcon;
  gradient: string;
};

export function StatCard({ label, value, hint, icon: Icon, gradient }: Props) {
  return (
    <Card className="p-5 glass hover:shadow-elegant transition-all hover:-translate-y-0.5 duration-300">
      <div className="flex items-start gap-3">
        <div
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
            {label}
          </div>
          <div className="text-3xl font-bold font-mono leading-none mt-1.5">{value ?? 0}</div>
          {hint && (
            <div className="text-xs text-muted-foreground mt-2.5 truncate font-mono">{hint}</div>
          )}
        </div>
      </div>
    </Card>
  );
}
