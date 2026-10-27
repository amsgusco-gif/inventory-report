/* sw.js — Service worker ของตัวเปิดแอป Inventory Report
 * เก็บเฉพาะไฟล์ของหน้าตัวเปิดแอป (index, manifest, ไอคอน) ไว้ในเครื่อง เพื่อให้ติดตั้งเป็นแอปได้และเปิดเร็ว
 * ไม่ยุ่งกับข้อมูลจาก Apps Script / Google Sheet — ข้อมูลโหลดสดทุกครั้ง
 * ถ้าแก้ไฟล์ในโฟลเดอร์นี้ ให้เปลี่ยนเลขเวอร์ชันด้านล่าง (เช่น v2) เพื่อให้เครื่องผู้ใช้โหลดของใหม่
 */
var CACHE = 'inventory-launcher-v1';
var FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon-32.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }));
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  var url = new URL(event.request.url);
  // ดูแลเฉพาะไฟล์ในเว็บนี้เอง ที่เหลือ (Apps Script, Google Fonts) ให้เบราว์เซอร์โหลดตามปกติ
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;

  // โหลดของใหม่จากเน็ตก่อน ถ้าออฟไลน์ค่อยใช้ของที่เก็บไว้
  event.respondWith(
    fetch(event.request).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(event.request, copy); });
      return res;
    }).catch(function () {
      return caches.match(event.request).then(function (hit) { return hit || caches.match('./index.html'); });
    })
  );
});
