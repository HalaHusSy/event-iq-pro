export function PlatformPage() {
  return (
    <div className="ei-page-wide">
      <h1>แพลตฟอร์ม Exhibition matching</h1>
      <p>
        งาน event มีหลายบริษัทออกบูธ — แต่ละบริษัทมีหลาย solution และหลาย use case รวมถึงชุด <strong>pain point ตัวอย่าง</strong> ให้ผู้เยี่ยมชมใช้คำค้น
        แชทบอท (ขั้นต่อไป) จะดึงจาก API เดียวกับหน้าเว็บนี้
      </p>

      <div className="ei-panel">
        <h2>แนวทาง login 3 ระดับ (สำหรับโปรเจกต์จริง)</h2>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--ei-muted)' }}>
          <li>
            <strong style={{ color: 'var(--ei-text)' }}>ผู้เยี่ยมชมงาน</strong> — ลงทะเบียน/ล็อกอินเบา ๆ หรือ anonymous session
            ในงาน ใช้สำหรับจับคู่บูธและเซฟประวัติแชท
          </li>
          <li>
            <strong style={{ color: 'var(--ei-text)' }}>Event admin</strong> — สิทธิ์จำกัดตาม event_id ผ่านตาราง event_admins
          </li>
          <li>
            <strong style={{ color: 'var(--ei-text)' }}>Root / platform owner</strong> — สร้างงาน แต่งตั้ง admin กำหนดนโยบายทั้งไซต์
          </li>
        </ul>
      </div>

      <div className="ei-panel">
        <h2>2.2 vs 2.3 — เลือกแบบไหนสำหรับ demo ที่สะท้อน “โปรเจกต์จริง”?</h2>
        <p style={{ color: 'var(--ei-muted)' }}>
          <strong style={{ color: 'var(--ei-text)' }}>แบบ 2.2 (แนะนำเป็นค่าเริ่มสำหรับ B2B / งานราชการ / องค์กรใหญ่)</strong>
          — admin ของงานติดต่อ root หรือทีมแพลตฟอร์ม ให้ root สร้าง event และแต่งตั้งสิทธิ์ให้
          ข้อดี: ควบคุมข้อมูล exhibitor ได้ตั้งแต่ต้น ลด spam ลดงานซ้ำ และสอดคล้องการจัดซื้อจัดจ้าง
        </p>
        <p style={{ color: 'var(--ei-muted)' }}>
          <strong style={{ color: 'var(--ei-text)' }}>แบบ 2.3 (เหมาะกับ SMB / self-serve)</strong>
          — admin ลงทะเบียนเองแล้วสร้าง event ของตัวเอง กรอกบริษัทและบูธเอง
          ข้อดี: เริ่มใช้เร็ว ข้อเสีย: ต้องมีระบบตรวจสอบคุณภาพข้อมูลและแยก tenant ให้ชัด
        </p>
        <p style={{ color: 'var(--ei-accent-2)' }}>
          ใน repo นี้ใช้โมเดลหลักแบบ <strong>2.2</strong> (Root สร้างงาน + แต่งตั้ง admin) และเปิดให้ <strong>visitor สมัครเอง</strong> เป็นทางเลือก
          หากต้องการ 2.3 เต็มรูปแบบ ให้เพิ่ม flow “สมัครเป็น event_admin → สร้าง event ในทรานแซคชันเดียว” พร้อมอนุมัติอัตโนมัติหรือรอ root อนุมัติ
        </p>
      </div>

      <div className="ei-panel">
        <h2>Real-time + API</h2>
        <p className="ei-muted-block" style={{ marginTop: 0 }}>
          ทุกครั้งที่มีการแก้ไขข้อมูลผ่าน API ฝั่งเซิร์ฟเวอร์จะ broadcast <code>sync</code> ผ่าน Socket.io หน้าเว็บที่เปิดอยู่จะโหลดรายการใหม่
          โปรดรัน <code>npm run dev:full</code> เพื่อให้ Vite (5173) และ API (3001) ทำงานพร้อมกัน
        </p>
      </div>
    </div>
  )
}
