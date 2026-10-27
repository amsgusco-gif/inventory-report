# Inventory Report — ตัวเปิดแอป (GitHub Pages)

ไฟล์ชุดนี้ทำให้ระบบ Inventory Report (Apps Script) ติดตั้งเป็นไอคอนแอปได้ ทั้งบนมือถือและบนหน้าจอคอม
ตัวระบบจริงและข้อมูลยังอยู่ที่ Apps Script / Google Sheet เหมือนเดิม — แก้ระบบที่ Apps Script แล้ว Deploy ใหม่ แอปที่ติดตั้งไว้จะเห็นของใหม่เอง ไม่ต้องแก้ GitHub

## ไฟล์ในโฟลเดอร์

| ไฟล์ | หน้าที่ |
|---|---|
| index.html | หน้าตัวเปิดแอป (ต้องใส่ลิงก์ Web app ที่บรรทัด `APP_URL`) |
| manifest.webmanifest | ชื่อแอป สี และไอคอน สำหรับการติดตั้ง |
| sw.js | ทำให้ติดตั้งเป็นแอปได้ |
| icon-192.png, icon-512.png, icon-maskable-512.png | ไอคอน Android / คอม |
| apple-touch-icon.png | ไอคอน iPhone / iPad |
| favicon-32.png | ไอคอนบนแท็บเบราว์เซอร์ |

## ขั้นตอน

1. **คัดลอกลิงก์ Web app** — Apps Script > Deploy > Manage deployments > คัดลอก Web app URL (ลงท้ายด้วย `/exec`)
2. **สร้าง Repository** — GitHub > New repository > ตั้งชื่อ เช่น `inventory-report` > เลือก Public > Create
3. **อัปโหลดไฟล์** — Add file > Upload files > ลากไฟล์ทั้งหมดในโฟลเดอร์นี้ (ไม่ใช่ตัวโฟลเดอร์) > Commit changes
4. **ใส่ลิงก์** — เปิดไฟล์ `index.html` ใน GitHub > ไอคอนดินสอ > แทน `PASTE_YOUR_WEB_APP_URL_HERE` ด้วยลิงก์จากข้อ 1 > Commit changes
5. **เปิด GitHub Pages** — Settings > Pages > Source: Deploy from a branch > Branch: `main` / `(root)` > Save รอ 1–2 นาที จะได้ลิงก์ `https://<ชื่อผู้ใช้>.github.io/inventory-report/`
6. **ติดตั้ง**
   - iPhone (Safari): ปุ่มแชร์ > Add to Home Screen
   - Android (Chrome): ⋮ > Add to Home screen / Install app
   - คอม (Chrome / Edge): ไอคอนติดตั้งท้ายช่อง URL > Install จะได้ไอคอนบน Desktop / Taskbar

## ข้อควรรู้

- ถ้า Deploy Apps Script แบบ **New version ใน deployment เดิม** ลิงก์ `/exec` ไม่เปลี่ยน ไม่ต้องแก้ GitHub
- ถ้าสร้าง **New deployment** จะได้ลิงก์ใหม่ ต้องกลับมาแก้ `APP_URL` ใน index.html
- ถ้าแก้ไฟล์ใน GitHub แล้วเครื่องผู้ใช้ยังเห็นของเก่า ให้เปลี่ยน `inventory-launcher-v1` ใน sw.js เป็น `v2`
