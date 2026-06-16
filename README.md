# 🏥 ระบบติดตามการติดตั้งคอมพิวเตอร์ — Hospital IT Deploy

ระบบ Web Application สำหรับติดตามการเปลี่ยนคอมพิวเตอร์ในโรงพยาบาล 211+ เครื่อง

---

## 🚀 วิธี Deploy บน Vercel (ง่ายที่สุด)

### วิธีที่ 1 — Vercel CLI

```bash
# ติดตั้ง dependencies
npm install

# ทดสอบ local
npm run dev

# Deploy บน Vercel
npx vercel --prod
```

### วิธีที่ 2 — Vercel Dashboard (แนะนำ)

1. อัปโหลดโฟลเดอร์นี้ขึ้น GitHub
2. ไปที่ [vercel.com](https://vercel.com) → **New Project**
3. เลือก Repository จาก GitHub
4. Vercel จะ detect Vite อัตโนมัติ → กด **Deploy**
5. รอ 1-2 นาที → ได้ URL ใช้งานได้เลย

### วิธีที่ 3 — Drag & Drop (เร็วที่สุด)

```bash
npm install && npm run build
```
จากนั้นลาก **โฟลเดอร์ `dist/`** ไปวางที่ [vercel.com/new](https://vercel.com/new)

---

## 📁 โครงสร้างไฟล์

```
hospital-it/
├── index.html              # Entry HTML
├── vite.config.js          # Vite config
├── vercel.json             # Vercel SPA routing
├── package.json            # Dependencies
└── src/
    ├── main.jsx            # React entry
    ├── App.jsx             # Layout + routing
    ├── data/
    │   └── computers.js    # ข้อมูลเครื่อง 211 เครื่อง
    ├── hooks/
    │   └── useStore.js     # State management + localStorage
    ├── components/
    │   └── Sidebar.jsx     # เมนูด้านซ้าย
    └── pages/
        ├── LoginPage.jsx   # หน้า Login
        ├── DashboardPage.jsx # แดชบอร์ด
        ├── ComputersPage.jsx # รายการเครื่อง + แก้ไข
        ├── ChecklistPage.jsx # Checklist การติดตั้ง
        ├── BuildingsPage.jsx # สรุปตามอาคาร
        ├── ExportPage.jsx  # Export Excel/PDF
        └── SettingsPage.jsx # ตั้งค่าระบบ
```

---

## 🔐 ข้อมูล Login

| Username | Password |
|----------|----------|
| admin    | admin1234 |

> เปลี่ยนรหัสผ่านได้ใน **ตั้งค่าระบบ**

---

## ✨ ฟีเจอร์หลัก

| หน้า | ฟีเจอร์ |
|------|---------|
| แดชบอร์ด | สถิติ, กราฟ, Progress bar |
| รายการเครื่อง | ค้นหา, กรอง, แก้ไขชื่อ/หน่วยงาน, เพิ่มเครื่อง |
| Checklist | คลิกเช็ค 7 รายการต่อเครื่อง |
| สรุปตามอาคาร | ขยาย/ย่อดูรายละเอียดแต่ละอาคาร |
| ส่งออก | Excel (ครบ/ติดตั้งแล้ว), PDF |
| ตั้งค่า | เปลี่ยนรหัสผ่าน, รีเซ็ตข้อมูล |

---

## 📊 ข้อมูลในระบบ

- **เครื่องหลัก**: 211 เครื่อง แบ่งตามอาคาร + รอบการติดตั้ง
- **คอมหมุนเวียน**: 19 เครื่อง
- **อาคาร**: หลวงพ่อแช่ม, สงฆ์อาพาธ, น้อมเกล้า, ปุดจ้อ, ศรีพัชรินทร์, สูติกรรม, อุบัติเหตุ, เวชศาสตร์ใต้น้ำ, จอดรถ 10 ชั้น, อายุรกรรม 298, คุณพุ่ม, OPD, อำนวยการ

---

## 💾 การบันทึกข้อมูล

ข้อมูลบันทึกใน **localStorage** ของเบราว์เซอร์ → ไม่หายเมื่อปิดหน้าต่าง
หากต้องการ backend จริง สามารถเชื่อมต่อ API แทน `useStore.js` ได้

---

## 🛠 Tech Stack

- **React 18** + Vite
- **Recharts** — กราฟ
- **XLSX** — Export Excel
- **Lucide React** — Icons
- **localStorage** — จัดเก็บข้อมูล
