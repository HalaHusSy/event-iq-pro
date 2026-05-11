import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronDown, Clock, MapPin, User } from 'lucide-react';
import { getAllSessions } from '@/lib/api/eventiq';
import type { Session } from '@/lib/mock/sessions';

export default function SessionsTab() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    getAllSessions().then((s) => {
      setSessions(s);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold">Session Q&amp;A Summaries</h1>
        <p className="text-sm text-muted-foreground mt-1">
          สรุปเนื้อหาและคำถาม-คำตอบของแต่ละ session
        </p>
      </div>

      <div className="space-y-3">
        {sessions.map((session) => (
          <Card key={session.id} className="p-5 space-y-3">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{session.title}</h3>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><User className="h-3 w-3" /> {session.speaker}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {session.start_time}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {session.room}</span>
              </div>
              <div className="flex gap-1">
                {session.language?.map((l) => (
                  <Badge key={l} variant="outline" className="text-xs">{l.toUpperCase()}</Badge>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase text-muted-foreground">สรุปหลัก</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {session.summary?.slice(0, 3).map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>

            {session.trending_topics?.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {session.trending_topics.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">#{t}</Badge>
                ))}
              </div>
            )}

            <button
              onClick={() => setExpanded(expanded === session.id ? null : session.id)}
              className="text-sm text-primary flex items-center gap-1 hover:underline"
            >
              ดู Q&amp;A ({session.qa?.length || 0} ข้อ)
              <ChevronDown
                className={`h-4 w-4 transition-transform ${expanded === session.id ? 'rotate-180' : ''}`}
              />
            </button>

            {expanded === session.id && (
              <div className="space-y-3 pt-2 border-t">
                {session.qa?.map((qa, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-sm font-medium">Q{i + 1}: {qa.question}</p>
                    <p className="text-sm text-muted-foreground">A: {qa.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
