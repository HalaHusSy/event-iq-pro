import type Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'

const hash = (plain: string) => bcrypt.hashSync(plain, 10)

const COMPANY_NAMES = [
  'Skyline Analytics',
  'RiverFlow CRM',
  'Nimbus Cloud Ops',
  'Vertex Security',
  'Pulse CX Suite',
  'Atlas Logistics AI',
  'Quanta IoT Hub',
  'Helix HR Tech',
  'Orbit Payments',
  'Cedar ESG Data',
  'Mono Retail POS',
  'Kite Marketing Auto',
  'Forge DevTools',
  'Lumen Contact Center',
  'Terra Farm IoT',
  'Nova Health Records',
  'Spark EdTech',
  'Bolt Energy Monitor',
  'Glyph Design System',
  'Prism BI Studio',
  'Echo Voice AI',
  'Fjord Cold Chain',
  'Sable Legal AI',
  'Mist Document AI',
  'Onyx Threat Intel',
  'Bloom Commerce',
  'Ridge Construction PM',
  'Slate Gov Cloud',
  'Volt EV Fleet',
  'Drift Maritime IoT',
  'Halo Clinical Trials',
  'Flux Manufacturing',
]

const BIOS = [
  'ผู้ให้บริการซอฟต์แวร์องค์กรในไทยและ SEA เน้นการปรับใช้เร็ว',
  'SaaS สำหรับทีมขายและการดูแลลูกค้า รองรับ omnichannel',
  'โซลูชันคลาวด์และความปลอดภัยสำหรับองค์กรขนาดกลาง-ใหญ่',
  'แพลตฟอร์มข้อมูลและ AI สำหรับการตัดสินใจเชิงธุรกิจ',
  'ระบบอัตโนมัติสำหรับโรงงานและซัพพลายเชน',
]

const SOLUTIONS = [
  'Customer Data Platform',
  'Omnichannel Inbox',
  'Predictive Maintenance',
  'Zero Trust Access',
  'Low-code Workflow',
  'Real-time Dashboard',
  'Document Intelligence',
  'Voicebot Studio',
]

const USE_CASES = [
  'ลดเวลาตอบลูกค้าในช่องทาง chat หลายแบรนด์',
  'วิเคราะห์ยอดขายและสต็อกแบบเรียลไทม์',
  'ลด downtime เครื่องจักรด้วย anomaly detection',
  'รวม identity จากหลายระบบ legacy',
  'ออกแบบ journey การขายแบบอัตโนมัติ',
  'สรุปเอกสาร PDF เป็นข้อมูลโครงสร้าง',
  'รองรับ PDPA และ audit log',
]

const PAIN_LIBRARY: { title: string; body: string }[] = [
  {
    title: 'ลูกค้าถามซ้ำในหลายช่องทาง',
    body: 'ทีม support ตอบไม่ทัน เพราะแชท Line, Facebook, เว็บไซต์ กระจัดกระจาย',
  },
  {
    title: 'ข้อมูลขายไม่ sync กับคลัง',
    body: 'ยอดขายและสต็อกไม่ตรงกัน ทำให้ oversell และคืนเงิน',
  },
  {
    title: 'เครื่องจักรดับบ่อยโดยไม่รู้สาเหตุ',
    body: 'อยากรู้ล่วงหน้าว่าอะไหล่ใกล้พังและวางแผนซ่อม',
  },
  {
    title: 'พนักงานใหม่เข้าระบบช้า',
    body: 'onboarding HR และ IT ใช้ฟอร์มกระดาษ อยากรวมเป็นขั้นตอนเดียว',
  },
  {
    title: 'รายงาน ESG ใช้เวลานาน',
    body: 'ดึงข้อมูลจากหลายแหล่ง อยากมี dashboard เดียว',
  },
  {
    title: 'ชำระเงิน B2B ซับซ้อน',
    body: 'ใบแจ้งหนี้ หลายสาขา หลาย VAT อยาก automate',
  },
  {
    title: 'โฆษณาไม่รู้ว่า channel ไหน ROI ดี',
    body: 'budget จำกัด อยาก optimize แคมเปญอัตโนมัติ',
  },
]

const EVENTS = [
  {
    id: 'ev-001',
    name: 'Thailand Smart Manufacturing Expo 2026',
    venue_name: 'BITEC Bangna',
    address: '88 Debaratana Rd, Bang Na',
    city: 'Bangkok',
    country: 'Thailand',
    latitude: 13.6708,
    longitude: 100.6067,
    starts_at: '2026-06-12T09:00:00+07:00',
    ends_at: '2026-06-14T18:00:00+07:00',
    description: 'งานแสดงเทคโนโลยีการผลิตและอุตสาหกรรม 4.0',
    exhibitorCount: 14,
    adminEmail: 'admin.ev1@demo.local',
  },
  {
    id: 'ev-002',
    name: 'Digital Health Asia 2026',
    venue_name: 'Queen Sirikit National Convention Center',
    address: '60 Ratchadaphisek Rd, Khlong Toei',
    city: 'Bangkok',
    country: 'Thailand',
    latitude: 13.7372,
    longitude: 100.5603,
    starts_at: '2026-07-03T10:00:00+07:00',
    ends_at: '2026-07-05T17:30:00+07:00',
    description: 'นวัตกรรมสุขภาพ โรงพยาบาล และ MedTech',
    exhibitorCount: 22,
    adminEmail: 'admin.ev2@demo.local',
  },
  {
    id: 'ev-003',
    name: 'Chiang Mai Tech Week',
    venue_name: 'Chiang Mai International Exhibition and Convention Centre',
    address: 'CMICEC, Mueang Chiang Mai',
    city: 'Chiang Mai',
    country: 'Thailand',
    latitude: 18.7669,
    longitude: 98.9853,
    starts_at: '2026-08-20T09:30:00+07:00',
    ends_at: '2026-08-23T19:00:00+07:00',
    description: 'Startup, cloud และ developer community ภาคเหนือ',
    exhibitorCount: 18,
    adminEmail: 'admin.ev3@demo.local',
  },
  {
    id: 'ev-004',
    name: 'Retail & eCommerce Summit Pattaya',
    venue_name: 'PEACH Royal Cliff Hotels Group',
    address: '353 Phra Tamnak Rd, Pattaya',
    city: 'Chonburi',
    country: 'Thailand',
    latitude: 12.9236,
    longitude: 100.8825,
    starts_at: '2026-09-10T09:00:00+07:00',
    ends_at: '2026-09-11T20:00:00+07:00',
    description: 'ค้าปลีก อีคอมเมิร์ซ และโลจิสติกส์สุดท้าย',
    exhibitorCount: 24,
    adminEmail: 'admin.ev4@demo.local',
  },
  {
    id: 'ev-005',
    name: 'Khon Kaen Agri & Food Innovation Fair',
    venue_name: 'KICE Khon Kaen International Convention Center',
    address: 'Thanon Mittraphap, Mueang Khon Kaen',
    city: 'Khon Kaen',
    country: 'Thailand',
    latitude: 16.4322,
    longitude: 102.8236,
    starts_at: '2026-10-01T08:00:00+07:00',
    ends_at: '2026-10-04T17:00:00+07:00',
    description: 'เกษตรอัจฉริยะ อาหาร และ supply chain',
    exhibitorCount: 11,
    adminEmail: 'admin.ev5@demo.local',
  },
] as const

export function runSeed(db: Database.Database) {
  const del = db.transaction(() => {
    db.exec(`
      DELETE FROM company_pain_points;
      DELETE FROM exhibitors;
      DELETE FROM event_line_settings;
      DELETE FROM event_admins;
      DELETE FROM events;
      DELETE FROM users;
    `)
  })
  del()

  const demoHash = hash('demo')

  const users: { id: string; email: string; name: string; role: string }[] = [
    { id: 'u-root', email: 'root@demo.local', name: 'Platform Root', role: 'root' },
    { id: 'u-vis', email: 'visitor@demo.local', name: 'Demo Visitor', role: 'visitor' },
  ]

  for (let i = 0; i < EVENTS.length; i++) {
    const ev = EVENTS[i]
    users.push({
      id: `u-adm-${i + 1}`,
      email: ev.adminEmail,
      name: `Event Admin ${i + 1}`,
      role: 'event_admin',
    })
  }

  const insUser = db.prepare(
    `INSERT INTO users (id, email, password_hash, name, role) VALUES (@id, @email, @password_hash, @name, @role)`,
  )
  for (const u of users) {
    insUser.run({ ...u, password_hash: demoHash })
  }

  const insEv = db.prepare(`
    INSERT INTO events (id, name, venue_name, address, city, country, latitude, longitude, starts_at, ends_at, description)
    VALUES (@id, @name, @venue_name, @address, @city, @country, @latitude, @longitude, @starts_at, @ends_at, @description)
  `)
  for (const ev of EVENTS) {
    insEv.run({
      id: ev.id,
      name: ev.name,
      venue_name: ev.venue_name,
      address: ev.address,
      city: ev.city,
      country: ev.country,
      latitude: ev.latitude,
      longitude: ev.longitude,
      starts_at: ev.starts_at,
      ends_at: ev.ends_at,
      description: ev.description,
    })
  }

  const insEa = db.prepare(`INSERT INTO event_admins (event_id, user_id) VALUES (?, ?)`)
  EVENTS.forEach((ev, i) => {
    insEa.run(ev.id, `u-adm-${i + 1}`)
  })

  const insLine = db.prepare(`
    INSERT INTO event_line_settings (event_id, channel_id, channel_secret, webhook_url, linked_at)
    VALUES (@event_id, '', '', '', NULL)
  `)
  for (const ev of EVENTS) {
    insLine.run({ event_id: ev.id })
  }

  const insEx = db.prepare(`
    INSERT INTO exhibitors (id, event_id, company_name, booth_label, short_bio, solutions_json)
    VALUES (@id, @event_id, @company_name, @booth_label, @short_bio, @solutions_json)
  `)
  const insPain = db.prepare(`
    INSERT INTO company_pain_points (id, exhibitor_id, title, body)
    VALUES (@id, @exhibitor_id, @title, @body)
  `)

  let nameOffset = 0
  for (const ev of EVENTS) {
    const n = ev.exhibitorCount
    for (let k = 0; k < n; k++) {
      const exId = `${ev.id}-ex-${String(k + 1).padStart(3, '0')}`
      const companyName = COMPANY_NAMES[(nameOffset + k) % COMPANY_NAMES.length]
      const booth = `${String.fromCharCode(65 + (k % 6))}-${String((k % 20) + 1).padStart(2, '0')}`
      const bio = BIOS[(k + ev.id.length) % BIOS.length]
      const solCount = 1 + (k % 3)
      const solutions = []
      for (let s = 0; s < solCount; s++) {
        const sn = SOLUTIONS[(k + s + nameOffset) % SOLUTIONS.length]
        const ucs = [
          USE_CASES[(k + s) % USE_CASES.length],
          USE_CASES[(k + s + 2) % USE_CASES.length],
        ]
        solutions.push({ solutionName: sn, useCases: ucs })
      }
      insEx.run({
        id: exId,
        event_id: ev.id,
        company_name: companyName,
        booth_label: booth,
        short_bio: bio,
        solutions_json: JSON.stringify(solutions),
      })

      const painCount = 2 + (k % 2)
      for (let p = 0; p < painCount; p++) {
        const lib = PAIN_LIBRARY[(k + p + nameOffset) % PAIN_LIBRARY.length]
        insPain.run({
          id: `${exId}-pain-${p}`,
          exhibitor_id: exId,
          title: lib.title,
          body: lib.body,
        })
      }
    }
    nameOffset += ev.exhibitorCount
  }
}

export function needsSeed(db: Database.Database) {
  const row = db.prepare(`SELECT COUNT(*) as c FROM events`).get() as { c: number }
  return row.c === 0
}
