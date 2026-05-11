import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SignatureCanvas from 'react-signature-canvas';
import { Mic, Square, AlertTriangle, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { saveConsent, generateArticle } from '@/lib/api/eventiq';
import type { MemoryArticle } from '@/lib/mock/memory-articles';

export default function MemoryTab() {
  const [showConsent, setShowConsent] = useState(false);
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [article, setArticle] = useState<MemoryArticle | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [consents, setConsents] = useState({
    audioRecording: false,
    publicSharing: false,
    pdpaTerms: false,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const signatureRef = useRef<SignatureCanvas | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const MAX_DURATION = 600;
  const canStart = consents.audioRecording && consents.pdpaTerms;
  const price = consents.publicSharing ? 250 : 500;

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    mediaRecorderRef.current?.stop();
  };

  const startRecording = async () => {
    if (!signatureRef.current || signatureRef.current.isEmpty()) {
      toast.error('กรุณาเซ็นชื่อยืนยันก่อน');
      return;
    }
    try {
      const signature = signatureRef.current.toDataURL();
      const consentResult = await saveConsent({
        ...consents,
        signature,
        timestamp: new Date().toISOString(),
      });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      recorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setProcessing(true);
        setRecording(false);
        try {
          const result = await generateArticle(blob, consentResult.id);
          setArticle(result as MemoryArticle);
          toast.success('สร้างบทความสำเร็จ!');
        } catch {
          toast.error('สร้างบทความไม่สำเร็จ');
        } finally {
          setProcessing(false);
          stream.getTracks().forEach((t) => t.stop());
        }
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setRecording(true);
      setShowConsent(false);
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime((t) => {
          if (t >= MAX_DURATION - 1) {
            stopRecording();
            return MAX_DURATION;
          }
          return t + 1;
        });
      }, 1000);
    } catch {
      toast.error('ตรวจสอบสิทธิ์ไมโครโฟน');
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    return `${m}:${(s % 60).toString().padStart(2, '0')}`;
  };

  if (processing) {
    return (
      <Card className="p-12 text-center space-y-3 animate-fade-up">
        <div className="text-5xl animate-pulse">🎙️</div>
        <h3 className="text-lg font-semibold">กำลังประมวลผล...</h3>
        <p className="text-sm text-muted-foreground">AI กำลังถอดเสียงและสรุปบทสนทนา</p>
      </Card>
    );
  }

  if (article) {
    return (
      <div className="space-y-4 animate-fade-up">
        <Card className="p-6 space-y-3">
          <h2 className="text-2xl font-bold">{article.title}</h2>
          <p className="text-sm text-muted-foreground">
            {article.exhibitor_name} • Booth {article.booth_no} • {article.date}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {article.tags?.map((t) => (
              <Badge key={t} variant="secondary">{t}</Badge>
            ))}
          </div>
        </Card>
        <Card className="p-6 space-y-2">
          <h3 className="font-semibold">สรุป</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {article.summary_bullets?.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </Card>
        {article.highlights?.length > 0 && (
          <Card className="p-6 space-y-2">
            <h3 className="font-semibold">Highlights</h3>
            {article.highlights.map((h, i) => (
              <blockquote key={i} className="border-l-2 border-primary pl-3 text-sm italic">
                "{h.quote}" — <span className="not-italic text-muted-foreground">{h.speaker}</span>
              </blockquote>
            ))}
          </Card>
        )}
        {article.action_items?.length > 0 && (
          <Card className="p-6 space-y-2">
            <h3 className="font-semibold">Action Items</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {article.action_items.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </Card>
        )}
        <Button onClick={() => setArticle(null)} variant="outline">บันทึกใหม่</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold">Event Memory</h1>
        <p className="text-sm text-muted-foreground mt-1">
          บันทึกบทสนทนาที่บูธ — AI สรุปเป็นบทความให้
        </p>
      </div>

      {!recording ? (
        <Card className="p-8 text-center space-y-4">
          <Button size="lg" onClick={() => setShowConsent(true)} className="gap-2">
            <Mic className="h-4 w-4" /> เริ่มบันทึกความทรงจำ
          </Button>
          <p className="text-xs text-muted-foreground">สูงสุด 10 นาที • ต้องยอมรับ PDPA terms</p>
        </Card>
      ) : (
        <Card className="p-8 text-center space-y-4">
          <div className="text-destructive font-semibold flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" /> กำลังบันทึก
          </div>
          <div className="text-4xl font-mono">{formatTime(recordingTime)}</div>
          <Button variant="destructive" onClick={stopRecording} className="gap-2">
            <Square className="h-4 w-4" /> หยุดบันทึก
          </Button>
        </Card>
      )}

      <Dialog open={showConsent} onOpenChange={setShowConsent}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Recording Consent — PDPA</DialogTitle>
            <DialogDescription>กรุณาอ่านและยอมรับเงื่อนไขก่อนเริ่มบันทึก</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex gap-2 p-3 rounded-md bg-primary/5 border border-primary/20">
              <Shield className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium">PDPA Protection</p>
                <p className="text-xs text-muted-foreground">
                  ข้อมูลเสียงจะถูก AI ประมวลผลและเก็บไว้ 7 วัน คุณขอลบได้ตลอดเวลา
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={consents.audioRecording}
                  onCheckedChange={(c) => setConsents({ ...consents, audioRecording: !!c })}
                />
                <span className="text-sm">
                  <span className="text-destructive font-semibold">*</span> ฉันยินยอมให้บันทึกเสียง
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={consents.publicSharing}
                  onCheckedChange={(c) => setConsents({ ...consents, publicSharing: !!c })}
                />
                <span className="text-sm">
                  <span className="font-semibold">เผยแพร่บทความสาธารณะ</span> — ลด 50%
                  <span className="block text-xs text-muted-foreground">
                    บทความถูกแสดงให้คนอื่นเห็นและช่วยทำตลาดให้บูธ
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={consents.pdpaTerms}
                  onCheckedChange={(c) => setConsents({ ...consents, pdpaTerms: !!c })}
                />
                <span className="text-sm">
                  <span className="text-destructive font-semibold">*</span> ฉันยอมรับ PDPA Terms
                </span>
              </label>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">เซ็นชื่อยืนยัน</p>
              <div className="border rounded-md bg-background">
                <SignatureCanvas
                  ref={signatureRef}
                  canvasProps={{ className: 'w-full h-32 rounded-md' }}
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signatureRef.current?.clear()}
                className="mt-2"
              >
                ล้าง
              </Button>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t">
              <div>
                <p className="text-xs text-muted-foreground">ราคา</p>
                <p className="text-2xl font-bold">฿{price}</p>
                {consents.publicSharing && (
                  <p className="text-xs text-emerald-600">ประหยัด ฿250</p>
                )}
              </div>
              <Button onClick={startRecording} disabled={!canStart}>
                <AlertTriangle className="h-4 w-4 mr-2" /> เริ่มบันทึก
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
