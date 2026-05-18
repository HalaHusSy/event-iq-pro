import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  live: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:text-emerald-300 dark:bg-emerald-500/15",
  upcoming: "bg-amber-500/10 text-amber-700 border-amber-500/30 dark:text-amber-300 dark:bg-amber-500/15",
  past: "bg-zinc-500/10 text-zinc-600 border-zinc-500/30 dark:text-zinc-400 dark:bg-zinc-500/15",
  draft: "bg-blue-500/10 text-blue-700 border-blue-500/30 dark:text-blue-300 dark:bg-blue-500/15",
  linked: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:text-emerald-300",
  unlinked: "bg-zinc-500/10 text-zinc-600 border-zinc-500/30 dark:text-zinc-400",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const key = status.toLowerCase();
  const cls = styles[key] ?? styles.draft;
  return (
    <Badge variant="outline" className={cn("font-medium gap-1.5 capitalize", cls, className)}>
      {key === "live" && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />}
      {status}
    </Badge>
  );
}
