export interface FAQ {
  id: string;
  question_th: string;
  question_en: string;
  answer_th: string;
  answer_en: string;
  category: 'schedule' | 'location' | 'speakers' | 'food' | 'transport' | 'facilities';
}

const data: Omit<FAQ, 'id'>[] = [
  { category: 'schedule', question_th: 'งานเปิดกี่โมง?', question_en: 'When does the event open?', answer_th: 'ทุกวัน 09:00 – 18:00', answer_en: 'Daily 9:00 AM – 6:00 PM' },
  { category: 'schedule', question_th: 'Keynote เริ่มกี่โมง?', question_en: 'When is the keynote?', answer_th: 'Keynote เริ่ม 10:00 ที่ Main Hall', answer_en: 'Keynote starts 10:00 AM at Main Hall' },
  { category: 'schedule', question_th: 'เซสชั่น AI วันไหน?', question_en: 'When are AI sessions?', answer_th: 'ทุกวันบ่าย Auditorium 1', answer_en: 'Every afternoon, Auditorium 1' },
  { category: 'schedule', question_th: 'มีเวิร์กชอปไหม?', question_en: 'Are there workshops?', answer_th: 'มี 12 เวิร์กชอป ลงทะเบียนหน้างาน', answer_en: '12 workshops, register on-site' },
  { category: 'schedule', question_th: 'พิธีปิดกี่โมง?', question_en: 'Closing ceremony time?', answer_th: 'วันสุดท้าย 17:30', answer_en: 'Last day 5:30 PM' },
  { category: 'location', question_th: 'งานจัดที่ไหน?', question_en: 'Venue location?', answer_th: 'Queen Sirikit National Convention Center', answer_en: 'Queen Sirikit National Convention Center' },
  { category: 'location', question_th: 'Hall A อยู่ตรงไหน?', question_en: 'Where is Hall A?', answer_th: 'ชั้น 2 ฝั่งเหนือ', answer_en: 'Floor 2, north wing' },
  { category: 'location', question_th: 'จุดลงทะเบียน?', question_en: 'Registration desk?', answer_th: 'ชั้น G ใกล้ทางเข้าหลัก', answer_en: 'Ground floor near main entrance' },
  { category: 'location', question_th: 'มีแผนผังงานไหม?', question_en: 'Is there a floor map?', answer_th: 'รับได้ที่จุดลงทะเบียนหรือสแกน QR ที่ทางเข้า', answer_en: 'Available at registration or QR at entrance' },
  { category: 'location', question_th: 'จุดประชุมส่วนตัว?', question_en: 'Private meeting rooms?', answer_th: 'ชั้น 3 ห้อง M1–M6 จองผ่านแอป', answer_en: 'Floor 3, M1–M6, book via app' },
  { category: 'speakers', question_th: 'สปีกเกอร์มีกี่คน?', question_en: 'How many speakers?', answer_th: 'รวมกว่า 60 คนจาก 15 ประเทศ', answer_en: 'Over 60 speakers from 15 countries' },
  { category: 'speakers', question_th: 'ใครพูด keynote?', question_en: 'Keynote speaker?', answer_th: 'Dr. Winn Voravuthikunchai', answer_en: 'Dr. Winn Voravuthikunchai' },
  { category: 'speakers', question_th: 'ขอ slide ได้ไหม?', question_en: 'Can I get the slides?', answer_th: 'ดาวน์โหลดได้ในแอปหลังจบเซสชั่น', answer_en: 'Download in the app after each session' },
  { category: 'speakers', question_th: 'ขอถ่ายรูปกับสปีกเกอร์?', question_en: 'Photos with speakers?', answer_th: 'อนุญาตหลังจบเซสชั่นที่ photo zone', answer_en: 'Allowed after session at photo zone' },
  { category: 'speakers', question_th: 'มีล่ามไหม?', question_en: 'Is there interpretation?', answer_th: 'แปลสด TH/EN ใน Auditorium 1 และ 2', answer_en: 'Live TH/EN translation in Auditorium 1 & 2' },
  { category: 'food', question_th: 'ฟู้ดคอร์ทอยู่ไหน?', question_en: 'Where is the food court?', answer_th: 'ชั้น G ฝั่งตะวันออก ติด Hall B', answer_en: 'Ground floor east wing, next to Hall B' },
  { category: 'food', question_th: 'อาหารฟรีไหม?', question_en: 'Is food free?', answer_th: 'มีกาแฟและของว่างฟรี อาหารกลางวันคิดเงิน', answer_en: 'Free coffee & snacks, lunch is paid' },
  { category: 'food', question_th: 'มีอาหารเจ/ฮาลาลไหม?', question_en: 'Vegetarian / Halal options?', answer_th: 'มีทั้งสองแบบที่ฟู้ดคอร์ท', answer_en: 'Both available at food court' },
  { category: 'food', question_th: 'น้ำดื่มฟรี?', question_en: 'Free drinking water?', answer_th: 'มีจุดเติมน้ำทุก hall', answer_en: 'Refill stations in every hall' },
  { category: 'food', question_th: 'มี networking dinner?', question_en: 'Networking dinner?', answer_th: 'วันที่ 2 เวลา 19:00 ลงทะเบียนล่วงหน้า', answer_en: 'Day 2 at 7:00 PM, pre-register required' },
  { category: 'transport', question_th: 'ที่จอดรถ?', question_en: 'Parking?', answer_th: 'ใต้ดิน 2,000 คัน ฿30/ชม.', answer_en: 'Underground 2,000 spots, ฿30/hr' },
  { category: 'transport', question_th: 'MRT ใกล้สุด?', question_en: 'Nearest MRT?', answer_th: 'MRT ศูนย์ประชุมแห่งชาติสิริกิติ์ ทางออก 3', answer_en: 'MRT Queen Sirikit Center, exit 3' },
  { category: 'transport', question_th: 'มี shuttle bus ไหม?', question_en: 'Shuttle bus?', answer_th: 'มี shuttle ทุก 30 นาทีจาก BTS อโศก', answer_en: 'Shuttle every 30 min from BTS Asok' },
  { category: 'transport', question_th: 'จุดเรียก Grab?', question_en: 'Grab pickup?', answer_th: 'ชั้น G ทางออกฝั่งใต้', answer_en: 'Ground floor south exit' },
  { category: 'transport', question_th: 'มีที่ชาร์จ EV?', question_en: 'EV charging?', answer_th: 'ชั้น B1 6 จุด', answer_en: 'Floor B1, 6 chargers' },
  { category: 'facilities', question_th: 'WiFi รหัสอะไร?', question_en: 'WiFi password?', answer_th: 'SSID: YouWalk-Free, ไม่ต้องใช้รหัส', answer_en: 'SSID: YouWalk-Free, no password' },
  { category: 'facilities', question_th: 'มีจุดชาร์จมือถือ?', question_en: 'Phone charging stations?', answer_th: 'มีในทุก hall ฟรี', answer_en: 'Free in every hall' },
  { category: 'facilities', question_th: 'ห้องปฐมพยาบาล?', question_en: 'First aid?', answer_th: 'ชั้น G ใกล้ Hall A พยาบาลตลอดเวลา', answer_en: 'Ground floor near Hall A, on-site nurse' },
  { category: 'facilities', question_th: 'ห้องน้ำผู้พิการ?', question_en: 'Accessible restrooms?', answer_th: 'มีในทุกชั้น', answer_en: 'Available on every floor' },
  { category: 'facilities', question_th: 'จุดฝากของ?', question_en: 'Cloakroom?', answer_th: 'ชั้น G ฝั่งใต้ ฟรีสำหรับผู้ลงทะเบียน', answer_en: 'Ground floor south, free for registered' },
];

export const FAQS: FAQ[] = data.map((d, i) => ({ ...d, id: `faq-${i + 1}` }));
