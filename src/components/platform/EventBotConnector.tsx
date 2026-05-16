import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Bot,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Loader2,
  Copy,
  Database,
} from "lucide-react";
import { toast } from "sonner";
import { getEventBySlug, updateEvent } from "@/lib/data/queries";
import { useI18n } from "@/lib/i18n";

const FUNCTIONS_BASE =
  (import.meta.env.VITE_SUPABASE_URL || "").replace(".supabase.co", ".supabase.co/functions/v1");

export function EventBotConnector({ eventSlug }: { eventSlug: string }) {
  const { t } = useI18n();
  const qc = useQueryClient();

  const { data: event, isLoading } = useQuery({
    queryKey: ["event_by_slug", eventSlug],
    queryFn: () => getEventBySlug(eventSlug),
  });

  const [botId, setBotId] = useState("");
  const [lineOaId, setLineOaId] = useState("");
  const [lineOaName, setLineOaName] = useState("");

  useEffect(() => {
    if (event) {
      setBotId(event.botnoi_bot_id ?? "");
      setLineOaId(event.line_oa_id ?? "");
      setLineOaName(event.line_oa_name ?? "");
    }
  }, [event]);

  const save = useMutation({
    mutationFn: (patch: Record<string, unknown>) => updateEvent(event!.id, patch),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["event_by_slug"] });
      qc.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const connected = !!event?.botnoi_bot_id;
  const lineLinked = !!event?.line_oa_id;

  if (isLoading) {
    return <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />;
  }

  if (!event) {
    return (
      <Card className="glass p-8 text-center space-y-3">
        <Database className="h-10 w-10 text-muted-foreground mx-auto" />
        <h3 className="font-semibold">Event นี้ยังไม่อยู่ใน Supabase</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          ตอนนี้ event แสดงเป็น mock data — ต้องสร้าง event จริงใน DB ก่อน
          (ผ่านหน้า Organizer หรือ Admin dashboard) แล้วตั้ง slug ของ event ให้ตรงกับ "<span className="font-mono">{eventSlug}</span>" จึงจะตั้ง bot ได้
        </p>
      </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Bot connection */}
      <Card className="glass p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold">Botnoi AI Bot</h3>
            <p className="text-xs text-muted-foreground">เชื่อมต่อ Botnoi bot เข้ากับ event นี้</p>
          </div>
          <Badge className={`ml-auto ${connected ? "bg-emerald-500" : "bg-muted"}`}>
            {connected ? t("platform.connected") : t("platform.notConnected")}
          </Badge>
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Botnoi Bot ID</Label>
          <Input
            value={botId}
            onChange={(e) => setBotId(e.target.value)}
            placeholder="6a013f62fb3079f00791473e"
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            หาได้จาก{" "}
            <a className="text-primary underline" href="https://console.botnoi.ai" target="_blank" rel="noreferrer">
              console.botnoi.ai
              <ExternalLink className="inline h-3 w-3 ml-0.5" />
            </a>
          </p>
        </div>
        <Button
          onClick={() => {
            if (!botId.trim()) return toast.error("Bot ID required");
            save.mutate(
              { botnoi_bot_id: botId.trim() },
              { onSuccess: () => toast.success("Bot connected to event") }
            );
          }}
          disabled={save.isPending}
          className="w-full bg-gradient-primary"
        >
          {save.isPending ? (
            <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4 mr-1.5" />
          )}
          {t("platform.connectBot")}
        </Button>
      </Card>

      {/* LINE OA */}
      <Card className="glass p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500 text-white">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold">LINE Official Account</h3>
            <p className="text-xs text-muted-foreground">Link bot เข้ากับ LINE OA ของงาน</p>
          </div>
          <Badge className={`ml-auto ${lineLinked ? "bg-emerald-500" : "bg-muted"}`}>
            {lineLinked ? "Linked" : "Not linked"}
          </Badge>
        </div>
        <div className="space-y-2">
          <Label className="text-xs">LINE OA ID</Label>
          <Input
            value={lineOaId}
            onChange={(e) => setLineOaId(e.target.value)}
            placeholder="@youroa"
            className="font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Display name</Label>
          <Input
            value={lineOaName}
            onChange={(e) => setLineOaName(e.target.value)}
            placeholder="EventIQ Assistant"
          />
        </div>
        <Button
          onClick={() => {
            if (!lineOaId.trim()) return toast.error("LINE OA ID required");
            save.mutate(
              { line_oa_id: lineOaId.trim(), line_oa_name: lineOaName.trim() || null },
              { onSuccess: () => toast.success(`LINE OA ${lineOaId} linked`) }
            );
          }}
          disabled={!connected || save.isPending}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          <MessageSquare className="h-4 w-4 mr-1.5" />
          {t("platform.linkLine")}
        </Button>
        {!connected && (
          <p className="text-xs text-amber-600">⚠️ ต้องเชื่อมต่อ Bot ก่อนถึงจะ link LINE OA ได้</p>
        )}
      </Card>

      {/* Status + webhook endpoints */}
      <Card className="glass p-5 md:col-span-2 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Integration status
        </h3>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <Status label="Bot connected" ok={connected} value={event.botnoi_bot_id ?? "—"} />
          <Status label="LINE OA" ok={lineLinked} value={event.line_oa_id ?? "—"} />
          <Status
            label="Webhook ready"
            ok={connected && lineLinked}
            value={connected && lineLinked ? "Active" : "Pending"}
          />
        </div>

        {/* Tool endpoints for Botnoi to call */}
        <div className="pt-4 border-t">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Tool endpoints (paste into Botnoi console as a custom tool)
          </h4>
          <div className="space-y-2">
            <EndpointRow label="find-booth" path={`${FUNCTIONS_BASE}/find-booth`} />
            <EndpointRow label="faq-search" path={`${FUNCTIONS_BASE}/faq-search`} />
          </div>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
            ตั้ง <span className="font-mono">x-bot-id</span> header เป็น{" "}
            <code className="text-primary">{event.botnoi_bot_id ?? "<bot_id>"}</code> ใน
            Botnoi tool config — edge function จะ resolve event จาก bot_id อัตโนมัติ
          </p>
        </div>

        {connected && (
          <div className="pt-3 border-t flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                save.mutate(
                  { botnoi_bot_id: null, line_oa_id: null, line_oa_name: null },
                  { onSuccess: () => toast.success("Bot disconnected") }
                )
              }
            >
              Disconnect all
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

function Status({ label, ok, value }: { label: string; ok: boolean; value?: string }) {
  return (
    <div className="p-3 rounded-lg border bg-card">
      <div className="flex items-center gap-2 mb-1">
        {ok ? (
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
        ) : (
          <XCircle className="h-4 w-4 text-muted-foreground" />
        )}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="font-mono text-xs truncate">{value || "—"}</div>
    </div>
  );
}

function EndpointRow({ label, path }: { label: string; path: string }) {
  const copy = () => {
    navigator.clipboard.writeText(path);
    toast.success("Copied");
  };
  return (
    <div className="flex items-center gap-2 p-2 rounded border bg-secondary/30">
      <Badge variant="outline" className="font-mono text-[10px] shrink-0">
        {label}
      </Badge>
      <code className="text-xs font-mono truncate flex-1">{path}</code>
      <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0" onClick={copy}>
        <Copy className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
