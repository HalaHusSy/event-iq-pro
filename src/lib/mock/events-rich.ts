/**
 * Enriched event mock data — 5 events with venue maps, floor details,
 * facilities, and a roster of exhibitor IDs (10-24 random per event).
 *
 * Used by the new /api/events endpoints. Replaces the thin PlatformEvent
 * shape in src/lib/mock/events.ts for matching scenarios.
 */

import { EXHIBITORS_CANONICAL } from './exhibitors.canonical';
import type { Exhibitor } from './exhibitor.zod';

// Prefer the sheet-generated list when available, fall back to canonical seeds
function loadAllExhibitors(): Exhibitor[] {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require('./exhibitors.generated');
    if (Array.isArray(mod.EXHIBITORS_FROM_SHEET) && mod.EXHIBITORS_FROM_SHEET.length > 0) {
      return mod.EXHIBITORS_FROM_SHEET;
    }
  } catch {
    // generated file may not exist yet
  }
  return EXHIBITORS_CANONICAL;
}

export interface VenueFloor {
  level: number;
  label: string;
  area_sqm: number;
  halls: string[];               // ['Hall A', 'Hall B']
  facilities: string[];          // ['Toilet East', 'Toilet West', 'Food Court', 'ATM']
  description: string;
}

export interface EventVenue {
  name: string;
  address: string;
  district: string;
  province: string;
  country: string;
  google_maps_url: string;
  total_floors: number;
  total_area_sqm: number;
  parking_spots: number;
  wifi_ssid: string;
  wifi_password: string;
  emergency_exits: number;
  accessibility: string[];       // ['Wheelchair ramp', 'Elevator', 'Braille signage']
  floors: VenueFloor[];
}

export interface RichEvent {
  id: string;
  name: string;
  slug: string;
  cover: string;                 // emoji
  tagline_th: string;
  tagline_en: string;
  description_th: string;
  description_en: string;
  start_date: string;            // ISO YYYY-MM-DD
  end_date: string;
  open_time: string;             // 'HH:MM'
  close_time: string;
  status: 'live' | 'upcoming' | 'past';
  expected_visitors: number;
  industries_focus: string[];
  ticket_price_thb: number;      // 0 = free
  registration_url: string;
  venue: EventVenue;
  exhibitor_ids: string[];       // 10-24 random ids from the canonical roster
  bot: {
    connected: boolean;
    bot_id?: string;
    line_oa_id?: string;
    line_oa_name?: string;
  };
  admins: {
    id: string;
    name: string;
    email: string;
    role_title: string;
  }[];
}

// Deterministic pseudo-random so each build emits the same rosters
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const ALL_EXHIBITOR_IDS = loadAllExhibitors().map((e) => e.id);

function pickExhibitors(count: number, seed: number): string[] {
  const shuffled = seededShuffle(ALL_EXHIBITOR_IDS, seed);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export const RICH_EVENTS: RichEvent[] = [
  {
    id: 'evt-tech-summit-2026',
    name: 'Tech Summit 2026',
    slug: 'tech-summit-2026',
    cover: '🚀',
    tagline_th: 'งานเทคโนโลยีที่ใหญ่ที่สุดของเอเชียตะวันออกเฉียงใต้',
    tagline_en: "Southeast Asia's largest enterprise tech summit",
    description_th:
      'รวมผู้นำเทคโนโลยีจากทั่วเอเชีย 200+ บริษัท นำเสนอ AI, Cloud, Cybersecurity, Fintech และ Smart Manufacturing พร้อมเวที keynote 60+ session ในงาน 3 วัน',
    description_en:
      '200+ tech leaders across Asia showcase AI, Cloud, Cybersecurity, Fintech, and Smart Manufacturing across 3 days with 60+ keynote sessions.',
    start_date: '2026-06-15',
    end_date: '2026-06-17',
    open_time: '09:00',
    close_time: '18:00',
    status: 'upcoming',
    expected_visitors: 12000,
    industries_focus: ['AI/SaaS', 'Cybersecurity', 'Finance', 'Manufacturing'],
    ticket_price_thb: 0,
    registration_url: 'https://techsummit2026.com/register',
    venue: {
      name: 'BITEC Bangna',
      address: '88 Bangna-Trad Road, Bang Na Tai, Bang Na',
      district: 'Bang Na',
      province: 'Bangkok',
      country: 'Thailand',
      google_maps_url: 'https://maps.app.goo.gl/bitec-bangna',
      total_floors: 3,
      total_area_sqm: 70000,
      parking_spots: 3500,
      wifi_ssid: 'TechSummit2026',
      wifi_password: 'techsummit',
      emergency_exits: 12,
      accessibility: ['Wheelchair ramp', 'Elevator', 'Braille signage', 'Sign language interpreter'],
      floors: [
        {
          level: 1,
          label: 'Ground Floor',
          area_sqm: 25000,
          halls: ['Hall A', 'Hall B'],
          facilities: ['Main Entrance', 'Registration', 'Information Desk', 'Toilet East', 'Toilet West', 'ATM', 'Coffee Shop'],
          description: 'จุดลงทะเบียน + บูธหลัก AI/SaaS และ Cybersecurity',
        },
        {
          level: 2,
          label: 'Second Floor',
          area_sqm: 25000,
          halls: ['Hall C', 'Hall D'],
          facilities: ['Food Court', 'Toilet North', 'Toilet South', 'Prayer Room', 'Nursing Room', 'First Aid'],
          description: 'บูธ Fintech, Manufacturing, Healthcare + Food Court ขนาดใหญ่ 800 ที่นั่ง',
        },
        {
          level: 3,
          label: 'Third Floor',
          area_sqm: 20000,
          halls: ['Auditorium 1', 'Auditorium 2', 'Workshop A', 'Workshop B'],
          facilities: ['Toilet East', 'VIP Lounge', 'Press Room', 'Networking Lounge'],
          description: 'เวที keynote + ห้องเวิร์กชอป + VIP lounge สำหรับ speakers',
        },
      ],
    },
    exhibitor_ids: pickExhibitors(24, 101),
    bot: {
      connected: true,
      bot_id: '6a013f62fb3079f00791473e',
      line_oa_id: '@techsummit2026',
      line_oa_name: 'Tech Summit 2026 Assistant',
    },
    admins: [
      { id: 'adm-ts-01', name: 'Khun Apinya Suwannapong', email: 'apinya@techsummit2026.com', role_title: 'Event Director' },
      { id: 'adm-ts-02', name: 'Mr. James Karuna', email: 'james@techsummit2026.com', role_title: 'Operations Lead' },
    ],
  },
  {
    id: 'evt-ai-expo-2026',
    name: 'AI Expo Thailand 2026',
    slug: 'ai-expo-thailand-2026',
    cover: '🧠',
    tagline_th: 'งานแสดง AI ครั้งใหญ่ที่สุดในประเทศไทย',
    tagline_en: "Thailand's premier AI showcase",
    description_th:
      'เจาะลึกเทคโนโลยี Generative AI, LLM, Voice AI, Computer Vision และ Robotics จาก 80+ บริษัทชั้นนำ พร้อม hands-on workshop จากผู้สร้างจริง',
    description_en:
      'Deep-dive into Generative AI, LLM, Voice AI, Computer Vision, and Robotics from 80+ leading vendors with hands-on workshops by creators.',
    start_date: '2026-08-22',
    end_date: '2026-08-24',
    open_time: '10:00',
    close_time: '20:00',
    status: 'upcoming',
    expected_visitors: 8500,
    industries_focus: ['AI/SaaS', 'Manufacturing', 'Healthcare', 'Education'],
    ticket_price_thb: 350,
    registration_url: 'https://aiexpo.co.th/2026/register',
    venue: {
      name: 'Queen Sirikit National Convention Center',
      address: '60 Ratchadaphisek Road, Khlong Toei',
      district: 'Khlong Toei',
      province: 'Bangkok',
      country: 'Thailand',
      google_maps_url: 'https://maps.app.goo.gl/qsncc',
      total_floors: 4,
      total_area_sqm: 78000,
      parking_spots: 3000,
      wifi_ssid: 'AIExpo2026',
      wifi_password: 'aiforall',
      emergency_exits: 10,
      accessibility: ['Wheelchair ramp', 'Elevator', 'Braille signage'],
      floors: [
        {
          level: -1,
          label: 'Basement (Parking + Loading)',
          area_sqm: 18000,
          halls: [],
          facilities: ['Parking 3000 spots', 'Loading Dock', 'Toilet B1', 'Security Office'],
          description: 'ที่จอดรถ 3,000 คัน + จุดส่งของบูธ',
        },
        {
          level: 1,
          label: 'Plenary Hall',
          area_sqm: 20000,
          halls: ['Plenary A', 'Plenary B'],
          facilities: ['Main Entrance', 'Registration Desk', 'Toilet East', 'Toilet West', 'Coffee Bar', 'Bookstore'],
          description: 'จุดลงทะเบียน + เวที keynote หลัก รองรับ 5,000 คน',
        },
        {
          level: 2,
          label: 'Exhibition Hall',
          area_sqm: 30000,
          halls: ['Hall A', 'Hall B', 'Hall C'],
          facilities: ['Food Court 600 seats', 'Toilet North', 'Toilet South', 'Prayer Room', 'Massage Corner', 'First Aid'],
          description: 'บูธจัดแสดง 80+ บูธ + food court + พื้นที่ networking',
        },
        {
          level: 3,
          label: 'Workshop Floor',
          area_sqm: 10000,
          halls: ['Workshop 1', 'Workshop 2', 'Workshop 3', 'Workshop 4'],
          facilities: ['Toilet Central', 'Coffee Bar', 'Quiet Lounge'],
          description: 'ห้องเวิร์กชอป hands-on 4 ห้อง รองรับห้องละ 40 คน',
        },
      ],
    },
    exhibitor_ids: pickExhibitors(18, 202),
    bot: { connected: true, bot_id: '6a013f62fb3079f00791473e', line_oa_id: '@aiexpo2026', line_oa_name: 'AI Expo Thailand Bot' },
    admins: [
      { id: 'adm-ai-01', name: 'Khun Wirot Phongsakorn', email: 'wirot@aiexpo.co.th', role_title: 'Event Manager' },
    ],
  },
  {
    id: 'evt-fintech-week-2026',
    name: 'Bangkok Fintech Week 2026',
    slug: 'bangkok-fintech-week-2026',
    cover: '💳',
    tagline_th: 'สัปดาห์แห่ง Fintech ที่กรุงเทพ',
    tagline_en: 'A week of payment, banking, and crypto in Bangkok',
    description_th:
      'รวมธนาคาร, payment provider, neo-bank และ blockchain startup กว่า 60 บริษัท พร้อม panel จากธนาคารแห่งประเทศไทย เรื่อง CBDC และ digital asset regulation',
    description_en:
      '60+ banks, payment providers, neo-banks, and blockchain startups, plus BOT panels on CBDC and digital asset regulation.',
    start_date: '2026-09-08',
    end_date: '2026-09-12',
    open_time: '09:00',
    close_time: '17:00',
    status: 'upcoming',
    expected_visitors: 6000,
    industries_focus: ['Finance', 'Banking', 'Insurance', 'AI/SaaS'],
    ticket_price_thb: 1500,
    registration_url: 'https://bkkfintechweek.com',
    venue: {
      name: 'Centara Grand at CentralWorld',
      address: '999/99 Rama I Road, Pathum Wan',
      district: 'Pathum Wan',
      province: 'Bangkok',
      country: 'Thailand',
      google_maps_url: 'https://maps.app.goo.gl/centaragrand',
      total_floors: 2,
      total_area_sqm: 12000,
      parking_spots: 1200,
      wifi_ssid: 'FintechWeek26',
      wifi_password: 'banktech',
      emergency_exits: 8,
      accessibility: ['Wheelchair ramp', 'Elevator'],
      floors: [
        {
          level: 22,
          label: 'World Ballroom Floor',
          area_sqm: 7000,
          halls: ['World Ballroom A', 'World Ballroom B', 'World Ballroom C'],
          facilities: ['Registration', 'Toilet East', 'Toilet West', 'VIP Lounge', 'Press Room', 'Coffee Bar'],
          description: 'พื้นที่บูธ + เวที main keynote + VIP networking',
        },
        {
          level: 23,
          label: 'Convention Floor',
          area_sqm: 5000,
          halls: ['Lotus Suite 1', 'Lotus Suite 2', 'Lotus Suite 3'],
          facilities: ['Food Court 400 seats', 'Toilet North', 'Toilet South', 'Prayer Room', 'Nursing Room'],
          description: 'ห้องประชุมย่อย + food court + พื้นที่นั่งรอ',
        },
      ],
    },
    exhibitor_ids: pickExhibitors(12, 303),
    bot: { connected: false },
    admins: [
      { id: 'adm-fw-01', name: 'Ms. Nina Tantipong', email: 'nina@bkkfintechweek.com', role_title: 'Programme Director' },
    ],
  },
  {
    id: 'evt-smart-factory-2026',
    name: 'Smart Factory Expo 2026',
    slug: 'smart-factory-expo-2026',
    cover: '🏭',
    tagline_th: 'งานเทคโนโลยีโรงงานอัจฉริยะที่ใหญ่ที่สุดในภูมิภาค',
    tagline_en: "Regional flagship for smart manufacturing tech",
    description_th:
      'IIoT, MES, Predictive Maintenance, Robotics, Computer Vision สำหรับสายการผลิต — รวมบริษัทออโตเมชั่นชั้นนำ 50+ บริษัทจากญี่ปุ่น เกาหลี ไต้หวัน และไทย',
    description_en:
      'IIoT, MES, predictive maintenance, robotics, and CV for production lines — 50+ automation leaders from Japan, Korea, Taiwan, and Thailand.',
    start_date: '2026-11-04',
    end_date: '2026-11-06',
    open_time: '10:00',
    close_time: '18:00',
    status: 'upcoming',
    expected_visitors: 9000,
    industries_focus: ['Manufacturing', 'Automotive', 'Energy', 'AI/SaaS'],
    ticket_price_thb: 500,
    registration_url: 'https://smartfactory.in.th/2026',
    venue: {
      name: 'IMPACT Exhibition and Convention Center, Muang Thong Thani',
      address: '47/569-576 Popular Road, Pakkret',
      district: 'Pakkret',
      province: 'Nonthaburi',
      country: 'Thailand',
      google_maps_url: 'https://maps.app.goo.gl/impact-muangthong',
      total_floors: 2,
      total_area_sqm: 140000,
      parking_spots: 15000,
      wifi_ssid: 'SmartFactory26',
      wifi_password: 'industry40',
      emergency_exits: 20,
      accessibility: ['Wheelchair ramp', 'Elevator', 'Braille signage', 'Tactile paving'],
      floors: [
        {
          level: 1,
          label: 'Exhibition Floor',
          area_sqm: 100000,
          halls: ['Hall 1', 'Hall 2', 'Hall 3', 'Hall 4', 'Hall 5', 'Hall 6'],
          facilities: ['Main Entrance', 'Registration Hub', 'Toilet (each hall corner, 12 total)', 'Food Court 1000 seats', 'Prayer Room', 'Nursing Room', 'First Aid x 3', 'ATM x 6'],
          description: 'พื้นที่หลัก 6 ฮอลล์ — Hall 1-2 Robotics, Hall 3 IIoT, Hall 4 MES/ERP, Hall 5 Energy, Hall 6 Logistics',
        },
        {
          level: 2,
          label: 'Conference Center',
          area_sqm: 40000,
          halls: ['Royal Jubilee Ballroom', 'Sapphire 1-5', 'Diamond Hall'],
          facilities: ['Toilet East', 'Toilet West', 'VIP Lounge', 'Press Center', 'Translator Booths'],
          description: 'เวที keynote + ห้องสัมมนาภาษาไทย/อังกฤษ/ญี่ปุ่น/เกาหลี',
        },
      ],
    },
    exhibitor_ids: pickExhibitors(20, 404),
    bot: { connected: true, bot_id: '6a013f62fb3079f00791473e', line_oa_id: '@smartfactory26', line_oa_name: 'Smart Factory Bot' },
    admins: [
      { id: 'adm-sf-01', name: 'Mr. Tanapat Charoenkit', email: 'tanapat@smartfactory.in.th', role_title: 'Show Director' },
      { id: 'adm-sf-02', name: 'Ms. Yuki Tanaka', email: 'yuki@smartfactory.in.th', role_title: 'JP-TH Liaison' },
    ],
  },
  {
    id: 'evt-greentech-2025',
    name: 'GreenTech & ESG Forum 2025',
    slug: 'greentech-esg-forum-2025',
    cover: '🌱',
    tagline_th: 'งานเทคโนโลยีเพื่อความยั่งยืน',
    tagline_en: 'Sustainability tech forum',
    description_th:
      'พลังงานหมุนเวียน, carbon accounting, ESG reporting และ green manufacturing — รวม 30+ บริษัทที่ส่งโซลูชันลด carbon footprint ให้องค์กรไทย',
    description_en:
      'Renewable energy, carbon accounting, ESG reporting, and green manufacturing — 30+ vendors helping Thai enterprises cut carbon footprint.',
    start_date: '2025-11-18',
    end_date: '2025-11-19',
    open_time: '09:00',
    close_time: '17:00',
    status: 'past',
    expected_visitors: 3500,
    industries_focus: ['Energy', 'Manufacturing', 'Agriculture', 'Real Estate'],
    ticket_price_thb: 0,
    registration_url: 'https://greentech-forum.org/2025',
    venue: {
      name: 'Bangkok Convention Centre at CentralWorld',
      address: '999/99 Rama I Road, Pathum Wan',
      district: 'Pathum Wan',
      province: 'Bangkok',
      country: 'Thailand',
      google_maps_url: 'https://maps.app.goo.gl/bcc-centralworld',
      total_floors: 2,
      total_area_sqm: 10000,
      parking_spots: 1000,
      wifi_ssid: 'GreenTech25',
      wifi_password: 'gogreen',
      emergency_exits: 6,
      accessibility: ['Wheelchair ramp', 'Elevator'],
      floors: [
        {
          level: 22,
          label: 'Convention Floor',
          area_sqm: 6000,
          halls: ['Conrad Ballroom', 'Hall 1', 'Hall 2'],
          facilities: ['Registration', 'Toilet East', 'Toilet West', 'Coffee Lounge', 'Press Room'],
          description: 'บูธจัดแสดง + เวที keynote',
        },
        {
          level: 23,
          label: 'Networking Floor',
          area_sqm: 4000,
          halls: ['Lotus Suite', 'Magnolia Room'],
          facilities: ['Food Court 300 seats', 'Toilet North', 'Prayer Room', 'Smoking Area (outdoor)'],
          description: 'ห้อง breakout + food + พื้นที่ networking',
        },
      ],
    },
    exhibitor_ids: pickExhibitors(10, 505),
    bot: { connected: false },
    admins: [
      { id: 'adm-gt-01', name: 'Khun Pranee Wattanasiri', email: 'pranee@greentech-forum.org', role_title: 'Programme Lead' },
    ],
  },
];

export function getEventById(id: string): RichEvent | undefined {
  return RICH_EVENTS.find((e) => e.id === id || e.slug === id);
}

export function getEventsByStatus(status?: RichEvent['status']): RichEvent[] {
  if (!status) return RICH_EVENTS;
  return RICH_EVENTS.filter((e) => e.status === status);
}
