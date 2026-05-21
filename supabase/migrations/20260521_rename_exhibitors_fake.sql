-- ================================================================
-- เปลี่ยนชื่อบริษัทจริง → ชื่อสมมติ (fake but plausible)
-- ใช้ domain .example.com (IANA-reserved → ปลอดภัยทาง legal 100%)
--
-- วิธีใช้:
-- 1. เปิด https://supabase.com/dashboard/project/mjmmnojflrzeoqrvkumi/sql/new
-- 2. ก็อปไฟล์นี้ทั้งหมดไปวาง
-- 3. กด RUN
-- 4. ดู result — ควรได้ 48 rows updated
-- ================================================================

BEGIN;

-- ===== FinTech (money EX pro 2026) =====

UPDATE exhibitors SET
  company_name = 'PayQuick Banking',
  description = 'แอปธนาคารดิจิทัล mobile-first สำหรับ retail banking และ digital lending ในไทย',
  contact_email = 'partnership@payquick.example.com',
  website = 'https://www.payquick.example.com',
  social_links = '{"line_oa":"@payquick"}'::jsonb
WHERE booth_id = 'F-01' AND event_id = '934e3d8a-9d96-4acd-9d7c-191161624035';

UPDATE exhibitors SET
  company_name = 'Sapphire Wealth Co.',
  description = 'บริการ Wealth Management และ Investment Advisor ครบวงจร สำหรับ HNW client',
  contact_email = 'wealth@sapphire-w.example.com',
  website = 'https://www.sapphire-w.example.com',
  social_links = '{"line_oa":"@sapphirewealth"}'::jsonb
WHERE booth_id = 'F-02' AND event_id = '934e3d8a-9d96-4acd-9d7c-191161624035';

UPDATE exhibitors SET
  company_name = 'CryptoNexus TH',
  description = 'Cryptocurrency exchange สัญชาติไทย รองรับ trading 200+ coins พร้อม staking',
  contact_email = 'support@cryptonexus.example.com',
  website = 'https://www.cryptonexus.example.com',
  social_links = '{"line_oa":"@cryptonexusth"}'::jsonb
WHERE booth_id = 'F-03' AND event_id = '934e3d8a-9d96-4acd-9d7c-191161624035';

UPDATE exhibitors SET
  company_name = 'GlobalRemit Asia',
  description = 'โอนเงินข้ามประเทศ rate ดี ค่าธรรมเนียมต่ำ รองรับ 60+ ประเทศใน Asia',
  contact_email = 'business@globalremit.example.com',
  website = 'https://www.globalremit.example.com',
  social_links = '{"line_oa":"@globalremit"}'::jsonb
WHERE booth_id = 'F-04' AND event_id = '934e3d8a-9d96-4acd-9d7c-191161624035';

UPDATE exhibitors SET
  company_name = 'FlashTransfer Net',
  description = 'ระบบโอนเงินทันทีฟรี ด้วยเลขโทรศัพท์ ใช้ใน 5 ธนาคารใหญ่ของไทย',
  contact_email = 'info@flashtransfer.example.com',
  website = 'https://www.flashtransfer.example.com',
  social_links = '{}'::jsonb
WHERE booth_id = 'F-05' AND event_id = '934e3d8a-9d96-4acd-9d7c-191161624035';

UPDATE exhibitors SET
  company_name = 'Sparrow Invest',
  description = 'แอป trading หุ้น + กองทุน + ETF ค่า fee 0% สำหรับนักลงทุนรายย่อย',
  contact_email = 'investor@sparrow-invest.example.com',
  website = 'https://www.sparrow-invest.example.com',
  social_links = '{"line_oa":"@sparrowinvest"}'::jsonb
WHERE booth_id = 'F-06' AND event_id = '934e3d8a-9d96-4acd-9d7c-191161624035';

UPDATE exhibitors SET
  company_name = 'CompareIt Finance',
  description = 'เว็บเปรียบเทียบบัตรเครดิต ประกัน สินเชื่อ จาก 30+ สถาบันการเงิน',
  contact_email = 'biz@compareit.example.com',
  website = 'https://www.compareit.example.com',
  social_links = '{}'::jsonb
WHERE booth_id = 'F-07' AND event_id = '934e3d8a-9d96-4acd-9d7c-191161624035';

UPDATE exhibitors SET
  company_name = 'BlueWallet Pay',
  description = 'E-wallet สำหรับคนรุ่นใหม่ รองรับจ่ายบิล โอน QR scan ใช้งานทั่วประเทศ',
  contact_email = 'business@bluewallet.example.com',
  website = 'https://www.bluewallet.example.com',
  social_links = '{"line_oa":"@bluewalletth"}'::jsonb
WHERE booth_id = 'F-08' AND event_id = '934e3d8a-9d96-4acd-9d7c-191161624035';

-- ===== EventTech / Media (Star event 2027) =====

UPDATE exhibitors SET
  company_name = 'MegaTix Thailand',
  description = 'ระบบจองตั๋วคอนเสิร์ตและงานบันเทิงระดับใหญ่ของไทย รองรับ E-ticket + QR',
  contact_email = 'partner@megatix.example.com',
  website = 'https://www.megatix.example.com',
  social_links = '{"line_oa":"@megatixth"}'::jsonb
WHERE booth_id = 'S-01' AND event_id = 'f6899011-fa82-4cd8-aeea-55ead8e5604e';

UPDATE exhibitors SET
  company_name = 'StreamVerse Asia',
  description = 'Streaming platform ภาพยนตร์และซีรีย์ระดับ ASEAN พร้อม original content',
  contact_email = 'th-business@streamverse.example.com',
  website = 'https://www.streamverse.example.com',
  social_links = '{}'::jsonb
WHERE booth_id = 'S-02' AND event_id = 'f6899011-fa82-4cd8-aeea-55ead8e5604e';

UPDATE exhibitors SET
  company_name = 'EchoSound Music',
  description = 'แพลตฟอร์ม music streaming + คาราโอเกะ + Live concert ระดับเอเชีย',
  contact_email = 'business@echosound.example.com',
  website = 'https://www.echosound.example.com',
  social_links = '{"line_oa":"@echosound"}'::jsonb
WHERE booth_id = 'S-03' AND event_id = 'f6899011-fa82-4cd8-aeea-55ead8e5604e';

UPDATE exhibitors SET
  company_name = 'Aurora Records',
  description = 'ค่ายเพลงและ Live concert organizer + Artist Management ใหญ่ของไทย',
  contact_email = 'partnership@aurora-rec.example.com',
  website = 'https://www.aurora-rec.example.com',
  social_links = '{}'::jsonb
WHERE booth_id = 'S-04' AND event_id = 'f6899011-fa82-4cd8-aeea-55ead8e5604e';

UPDATE exhibitors SET
  company_name = 'LiveCast Stage',
  description = 'แพลตฟอร์ม Livestream + Virtual Concert + ticketing สำหรับศิลปิน',
  contact_email = 'stage@livecast.example.com',
  website = 'https://www.livecast.example.com',
  social_links = '{"line_oa":"@livecaststage"}'::jsonb
WHERE booth_id = 'S-05' AND event_id = 'f6899011-fa82-4cd8-aeea-55ead8e5604e';

UPDATE exhibitors SET
  company_name = 'EventHive Platform',
  description = 'แพลตฟอร์ม event management ครบวงจร: registration + check-in + analytics',
  contact_email = 'biz@eventhive.example.com',
  website = 'https://www.eventhive.example.com',
  social_links = '{"line_oa":"@eventhive"}'::jsonb
WHERE booth_id = 'S-06' AND event_id = 'f6899011-fa82-4cd8-aeea-55ead8e5604e';

UPDATE exhibitors SET
  company_name = 'PopTicket Hub',
  description = 'จองตั๋วงานสัมมนา workshop community event รองรับ QR Check-in',
  contact_email = 'team@popticket.example.com',
  website = 'https://www.popticket.example.com',
  social_links = '{"line_oa":"@popticket"}'::jsonb
WHERE booth_id = 'S-07' AND event_id = 'f6899011-fa82-4cd8-aeea-55ead8e5604e';

UPDATE exhibitors SET
  company_name = 'ShortReel Ads',
  description = 'แพลตฟอร์มโฆษณา short video สำหรับแบรนด์ + Live commerce + Influencer',
  contact_email = 'th-business@shortreel.example.com',
  website = 'https://www.shortreel.example.com',
  social_links = '{}'::jsonb
WHERE booth_id = 'S-08' AND event_id = 'f6899011-fa82-4cd8-aeea-55ead8e5604e';

-- ===== HealthTech (Test Event 2 — IMPACT) =====

UPDATE exhibitors SET
  company_name = 'MediCare Plus Hospital',
  description = 'เครือโรงพยาบาลเอกชน 12 สาขา Health checkup + Telemedicine + International',
  contact_email = 'business@medicareplus.example.com',
  website = 'https://www.medicareplus.example.com',
  social_links = '{}'::jsonb
WHERE booth_id = 'H-01' AND event_id = '3475a178-1c8f-4f14-8d85-c5635149593c';

UPDATE exhibitors SET
  company_name = 'TeleHeal Doc',
  description = 'แอป Telemedicine ปรึกษาแพทย์ทาง video call + ส่งยาถึงบ้าน 24 ชม.',
  contact_email = 'partner@teleheal.example.com',
  website = 'https://www.teleheal.example.com',
  social_links = '{"line_oa":"@teleheal"}'::jsonb
WHERE booth_id = 'H-02' AND event_id = '3475a178-1c8f-4f14-8d85-c5635149593c';

UPDATE exhibitors SET
  company_name = 'EasyShield Insurance',
  description = 'ประกันออนไลน์ ครบทั้งรถยนต์ + สุขภาพ + ชีวิต ราคาประหยัด สมัครได้ใน 5 นาที',
  contact_email = 'business@easyshield.example.com',
  website = 'https://www.easyshield.example.com',
  social_links = '{"line_oa":"@easyshield"}'::jsonb
WHERE booth_id = 'H-03' AND event_id = '3475a178-1c8f-4f14-8d85-c5635149593c';

UPDATE exhibitors SET
  company_name = 'MindBloom Therapy',
  description = 'แอปปรึกษาจิตแพทย์ + นักจิตวิทยา ออนไลน์ สำหรับสุขภาพจิต privacy first',
  contact_email = 'biz@mindbloom.example.com',
  website = 'https://www.mindbloom.example.com',
  social_links = '{"line_oa":"@mindbloomth"}'::jsonb
WHERE booth_id = 'H-04' AND event_id = '3475a178-1c8f-4f14-8d85-c5635149593c';

UPDATE exhibitors SET
  company_name = 'GenomeLab Asia',
  description = 'Lab ตรวจสุขภาพระดับ DNA + Genetic Testing + Personalized Medicine',
  contact_email = 'info@genomelab.example.com',
  website = 'https://www.genomelab.example.com',
  social_links = '{}'::jsonb
WHERE booth_id = 'H-05' AND event_id = '3475a178-1c8f-4f14-8d85-c5635149593c';

UPDATE exhibitors SET
  company_name = 'Pulse Health Telco',
  description = 'Telehealth + EMR + digital health bundle สำหรับลูกค้า telco อันดับ 1 ของไทย',
  contact_email = 'health@pulsehealth.example.com',
  website = 'https://www.pulsehealth.example.com',
  social_links = '{}'::jsonb
WHERE booth_id = 'H-06' AND event_id = '3475a178-1c8f-4f14-8d85-c5635149593c';

-- ===== EdTech (Test Event 3 — QSNCC) =====

UPDATE exhibitors SET
  company_name = 'LearnLeap Academy',
  description = 'แพลตฟอร์มเรียนออนไลน์ด้าน data science, programming, design ของไทย',
  contact_email = 'biz@learnleap.example.com',
  website = 'https://www.learnleap.example.com',
  social_links = '{"line_oa":"@learnleap"}'::jsonb
WHERE booth_id = 'E-01' AND event_id = '096577e9-b3a3-4119-9e06-0ab975ed62e7';

UPDATE exhibitors SET
  company_name = 'CoderBoot Bangkok',
  description = 'Coding bootcamp 12 สัปดาห์ สำหรับ career changer สู่ Software Engineer',
  contact_email = 'admission@coderboot.example.com',
  website = 'https://www.coderboot.example.com',
  social_links = '{}'::jsonb
WHERE booth_id = 'E-02' AND event_id = '096577e9-b3a3-4119-9e06-0ab975ed62e7';

UPDATE exhibitors SET
  company_name = 'CorpLearn Cloud',
  description = 'Corporate Learning Platform สำหรับ HR บริษัทใหญ่ทำ training พนักงาน',
  contact_email = 'biz@corplearn.example.com',
  website = 'https://www.corplearn.example.com',
  social_links = '{}'::jsonb
WHERE booth_id = 'E-03' AND event_id = '096577e9-b3a3-4119-9e06-0ab975ed62e7';

UPDATE exhibitors SET
  company_name = 'FluentTalk Asia',
  description = 'แอปสอนภาษาอังกฤษ 1-on-1 กับครู native ผ่าน video call ปรับ level อัตโนมัติ',
  contact_email = 'partner@fluenttalk.example.com',
  website = 'https://www.fluenttalk.example.com',
  social_links = '{"line_oa":"@fluenttalk"}'::jsonb
WHERE booth_id = 'E-04' AND event_id = '096577e9-b3a3-4119-9e06-0ab975ed62e7';

UPDATE exhibitors SET
  company_name = 'ExamPath TH',
  description = 'แพลตฟอร์มติว TCAS / TOEIC / IELTS / SAT สำหรับนักเรียน ม.ปลาย-มหาวิทยาลัย',
  contact_email = 'info@exampath.example.com',
  website = 'https://www.exampath.example.com',
  social_links = '{"line_oa":"@exampathth"}'::jsonb
WHERE booth_id = 'E-05' AND event_id = '096577e9-b3a3-4119-9e06-0ab975ed62e7';

UPDATE exhibitors SET
  company_name = 'ClassWise Edu',
  description = 'Cloud Workspace + Classroom Tools + Chromebook bundle สำหรับโรงเรียน',
  contact_email = 'edu-th@classwise.example.com',
  website = 'https://www.classwise.example.com',
  social_links = '{}'::jsonb
WHERE booth_id = 'E-06' AND event_id = '096577e9-b3a3-4119-9e06-0ab975ed62e7';

-- ===== Retail / E-Commerce (Test Event 4 — Central World) =====

UPDATE exhibitors SET
  company_name = 'MarketBee Asia',
  description = 'E-commerce marketplace อันดับต้นของ SEA รองรับ Food + Pay + Logistics',
  contact_email = 'business@marketbee.example.com',
  website = 'https://www.marketbee.example.com',
  social_links = '{"line_oa":"@marketbee"}'::jsonb
WHERE booth_id = 'R-01' AND event_id = '22eac0fd-df51-41e7-91ee-10fa2c74fb77';

UPDATE exhibitors SET
  company_name = 'ShopWave Mall',
  description = 'Marketplace + Mall premium brand + payment + logistics network ทั่ว ASEAN',
  contact_email = 'biz@shopwave.example.com',
  website = 'https://www.shopwave.example.com',
  social_links = '{"line_oa":"@shopwave"}'::jsonb
WHERE booth_id = 'R-02' AND event_id = '22eac0fd-df51-41e7-91ee-10fa2c74fb77';

UPDATE exhibitors SET
  company_name = 'Bloom Retail Group',
  description = 'เครือค้าปลีกใหญ่: department store, supermarket, electronics, fashion',
  contact_email = 'partnership@bloomretail.example.com',
  website = 'https://www.bloomretail.example.com',
  social_links = '{}'::jsonb
WHERE booth_id = 'R-03' AND event_id = '22eac0fd-df51-41e7-91ee-10fa2c74fb77';

UPDATE exhibitors SET
  company_name = 'Fashionista Hub',
  description = 'แบรนด์ Fashion online ขายเสื้อผ้าผู้หญิง shipping ใน SEA + Cross-border',
  contact_email = 'business@fashionista.example.com',
  website = 'https://www.fashionista.example.com',
  social_links = '{}'::jsonb
WHERE booth_id = 'R-04' AND event_id = '22eac0fd-df51-41e7-91ee-10fa2c74fb77';

UPDATE exhibitors SET
  company_name = 'SocialOrder Pro',
  description = 'ระบบจัดการ Order หน้าร้านโซเชียล รวม Facebook + IG + LINE เป็นที่เดียว',
  contact_email = 'biz@socialorder.example.com',
  website = 'https://www.socialorder.example.com',
  social_links = '{"line_oa":"@socialorderpro"}'::jsonb
WHERE booth_id = 'R-05' AND event_id = '22eac0fd-df51-41e7-91ee-10fa2c74fb77';

UPDATE exhibitors SET
  company_name = 'QuickShip Logistics',
  description = 'บริการขนส่ง express ราคาประหยัด เก็บปลายทาง รองรับ e-commerce',
  contact_email = 'business@quickship.example.com',
  website = 'https://www.quickship.example.com',
  social_links = '{"line_oa":"@quickship"}'::jsonb
WHERE booth_id = 'R-06' AND event_id = '22eac0fd-df51-41e7-91ee-10fa2c74fb77';

-- ===== FoodTech (Test Event 5 — Paragon) =====

UPDATE exhibitors SET
  company_name = 'RideEat Super',
  description = 'แอป Super App รวม Food delivery + Express + Ride + Pay อันดับต้นของ SEA',
  contact_email = 'business@rideeat.example.com',
  website = 'https://www.rideeat.example.com',
  social_links = '{"line_oa":"@rideeat"}'::jsonb
WHERE booth_id = 'D-01' AND event_id = 'f9de0e8d-76f4-4fe9-9a5e-3723129414fa';

UPDATE exhibitors SET
  company_name = 'FoodFinder Local',
  description = 'Food delivery + จองโต๊ะร้าน + รีวิวร้านอาหาร + Mart ครบในแอปเดียว',
  contact_email = 'biz@foodfinder.example.com',
  website = 'https://www.foodfinder.example.com',
  social_links = '{"line_oa":"@foodfinderth"}'::jsonb
WHERE booth_id = 'D-02' AND event_id = 'f9de0e8d-76f4-4fe9-9a5e-3723129414fa';

UPDATE exhibitors SET
  company_name = 'DineFlow POS',
  description = 'ระบบ POS ร้านอาหารครบวงจร: order + kitchen display + inventory + analytics',
  contact_email = 'pos@dineflow.example.com',
  website = 'https://www.dineflow.example.com',
  social_links = '{"line_oa":"@dineflow"}'::jsonb
WHERE booth_id = 'D-03' AND event_id = 'f9de0e8d-76f4-4fe9-9a5e-3723129414fa';

UPDATE exhibitors SET
  company_name = 'TasteChain Group',
  description = 'เครือร้านอาหารใหญ่ของไทย: QSR + ร้านบุฟเฟ่ + Franchise + Food Service B2B',
  contact_email = 'biz@tastechain.example.com',
  website = 'https://www.tastechain.example.com',
  social_links = '{}'::jsonb
WHERE booth_id = 'D-04' AND event_id = 'f9de0e8d-76f4-4fe9-9a5e-3723129414fa';

UPDATE exhibitors SET
  company_name = 'FreshHub B2B',
  description = 'B2B marketplace สำหรับร้านอาหารสั่งวัตถุดิบจาก supplier ตรง',
  contact_email = 'biz@freshhub.example.com',
  website = 'https://www.freshhub.example.com',
  social_links = '{"line_oa":"@freshhub"}'::jsonb
WHERE booth_id = 'D-05' AND event_id = 'f9de0e8d-76f4-4fe9-9a5e-3723129414fa';

UPDATE exhibitors SET
  company_name = 'ChefDirect Delivery',
  description = 'Food delivery แอปไม่เก็บ commission ร้านอาหาร เน้นช่วย SME',
  contact_email = 'partner@chefdirect.example.com',
  website = 'https://www.chefdirect.example.com',
  social_links = '{"line_oa":"@chefdirect"}'::jsonb
WHERE booth_id = 'D-06' AND event_id = 'f9de0e8d-76f4-4fe9-9a5e-3723129414fa';

-- ===== Manufacturing / Energy / Logistics (Test Event 6 — BITEC) =====

UPDATE exhibitors SET
  company_name = 'Cementor Industrial',
  description = 'นิคมอุตสาหกรรม + วัสดุก่อสร้าง + Smart Factory + Logistics Hub ในไทย',
  contact_email = 'biz@cementor.example.com',
  website = 'https://www.cementor.example.com',
  social_links = '{}'::jsonb
WHERE booth_id = 'M-01' AND event_id = '3d4a73d9-9b02-4760-8820-ef2400351e7c';

UPDATE exhibitors SET
  company_name = 'EnerPulse Group',
  description = 'พลังงาน + ปิโตรเคมี + EV Charging + Renewable Energy ระดับชาติ',
  contact_email = 'partnership@enerpulse.example.com',
  website = 'https://www.enerpulse.example.com',
  social_links = '{}'::jsonb
WHERE booth_id = 'M-02' AND event_id = '3d4a73d9-9b02-4760-8820-ef2400351e7c';

UPDATE exhibitors SET
  company_name = 'RoboFactory Asia',
  description = 'ระบบ Factory Automation + Robot + PLC + Vision สำหรับโรงงานอุตสาหกรรม',
  contact_email = 'th-business@robofactory.example.com',
  website = 'https://www.robofactory.example.com',
  social_links = '{}'::jsonb
WHERE booth_id = 'M-03' AND event_id = '3d4a73d9-9b02-4760-8820-ef2400351e7c';

UPDATE exhibitors SET
  company_name = 'SmartGrid Build Co.',
  description = 'Smart Building + Smart Grid + IoT Platform สำหรับอาคารและโรงงาน',
  contact_email = 'th-info@smartgrid.example.com',
  website = 'https://www.smartgrid.example.com',
  social_links = '{}'::jsonb
WHERE booth_id = 'M-04' AND event_id = '3d4a73d9-9b02-4760-8820-ef2400351e7c';

UPDATE exhibitors SET
  company_name = 'RapidPath Logistics',
  description = 'บริการขนส่งและ logistics ครอบคลุมทั่วไทย รองรับ B2B + B2C + Cross-border',
  contact_email = 'business@rapidpath.example.com',
  website = 'https://www.rapidpath.example.com',
  social_links = '{"line_oa":"@rapidpath"}'::jsonb
WHERE booth_id = 'M-05' AND event_id = '3d4a73d9-9b02-4760-8820-ef2400351e7c';

UPDATE exhibitors SET
  company_name = 'IndusPark Holdings',
  description = 'นิคมอุตสาหกรรม + Logistics + Utility + Renewable Energy ใหญ่ที่สุดในไทย',
  contact_email = 'info@induspark.example.com',
  website = 'https://www.induspark.example.com',
  social_links = '{}'::jsonb
WHERE booth_id = 'M-06' AND event_id = '3d4a73d9-9b02-4760-8820-ef2400351e7c';

UPDATE exhibitors SET
  company_name = 'FarmIoT Sensors',
  description = 'IoT + ดาวเทียม + AI สำหรับเกษตรกรไทย วิเคราะห์ดิน น้ำ พืช พยากรณ์ผลผลิต',
  contact_email = 'biz@farmiot.example.com',
  website = 'https://www.farmiot.example.com',
  social_links = '{}'::jsonb
WHERE booth_id = 'M-07' AND event_id = '3d4a73d9-9b02-4760-8820-ef2400351e7c';

UPDATE exhibitors SET
  company_name = 'SunRoof Solar Pro',
  description = 'Solar rooftop + Energy efficiency + ESCO model สำหรับโรงงานและอาคาร',
  contact_email = 'th-biz@sunroof.example.com',
  website = 'https://www.sunroof.example.com',
  social_links = '{}'::jsonb
WHERE booth_id = 'M-08' AND event_id = '3d4a73d9-9b02-4760-8820-ef2400351e7c';

-- ===== ตรวจสอบผล =====
SELECT
  e.name AS event_name,
  count(x.id) AS exhibitors,
  array_agg(x.company_name ORDER BY x.booth_id) AS companies
FROM events e
LEFT JOIN exhibitors x ON x.event_id = e.id
WHERE x.booth_id LIKE 'F-%' OR x.booth_id LIKE 'S-%'
   OR x.booth_id LIKE 'H-%' OR x.booth_id LIKE 'E-%'
   OR x.booth_id LIKE 'R-%' OR x.booth_id LIKE 'D-%'
   OR x.booth_id LIKE 'M-%'
GROUP BY e.id, e.name
ORDER BY e.start_date;

COMMIT;
