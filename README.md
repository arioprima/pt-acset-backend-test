# Aplikasi Antrian Toko – Backend

Aplikasi backend ini adalah bagian dari sistem antrian toko yang dirancang untuk mencatat dan mengelola antrian pelanggan secara **real-time**. Dibangun menggunakan **Node.js**, **Express.js**, **MongoDB**, serta mendukung **Socket.IO** untuk sinkronisasi antar mesin.

---

## ✨ Fitur Utama

- Tambah antrian baru dan otomatis
- Sinkronisasi realtime antar mesin tanpa refresh (dengan **Socket.IO**)
- Admin dapat menandai antrian sebagai **"Telah Diproses"**
- Mendukung beberapa **cabang (branch)** dan **loket (counter)**
- Otentikasi admin menggunakan **JWT**
- Script **migration** disediakan untuk data awal

---

## 🚀 Instalasi & Menjalankan Aplikasi

### 1. Clone Repository

```bash
git clone https://github.com/team-smarthome/transforme-app.git
cd a
```

### 2. Install Dependencies

Pastikan menggunakan Node.js versi 14 ke atas.

```bash
npm install
```

### 3. Konfigurasi Environment

Buat file `.env` di root folder dengan isi:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/queueDB
JWT_SECRET=rahasia_jwt
```

### 4. Jalankan MongoDB

Pastikan MongoDB sudah berjalan di port 27017.

### 5. Migrasi Database (Opsional)

Untuk mengisi data awal (cabang dan loket), jalankan:

```bash
npm run migrate
```

### 6. Menjalankan Aplikasi

```bash
npm start
```

## Aplikasi akan berjalan di `http://localhost:3000`.

## 📚 Struktur Folder

```
├── config/
│   └── db.js
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   └── queueController.js
├── middlewares/
│   └── authMiddleware.js
├── migrations/
│   └── initialSetup.js
├── models/
│   ├── Branch.js
│   ├── Counter.js
│   └── Queue.js
├── routes/
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   └── queueRoutes.js
├── services/
│   └── queueService.js
├── .env.example
├── .gitignore
├── app.js
├── package.json
└── server.js
```

---

## 🔐 Endpoint API

### Admin Authentication

- **POST** `/api/auth/login` - Login admin
- **POST** `/api/auth/register` - Register admin baru

### Queue Management

- **GET** `/api/queues` - Dapatkan semua antrian (admin)
- **POST** `/api/queues` - Tambah antrian baru (pelanggan)
- **PATCH** `/api/queues/:id/process` - Tandai antrian selesai diproses (admin)

### Branch & Counter

- **GET** `/api/branches` - Dapatkan daftar cabang
- **GET** `/api/counters` - Dapatkan daftar loket

---

## 🧠 Solusi Multiple Kiosk

### 1. Atomic Sequence Generation

Setiap cabang memiliki counter sendiri. Ketika membuat antrian baru, nomor urut di-generate secara atomik.

```javascript
// services/queueService.js
const generateQueueNumber = async (branchId) => {
  const branch = await Branch.findById(branchId);
  const nextNumber = branch.lastQueueNumber + 1;
  await Branch.findByIdAndUpdate(branchId, { lastQueueNumber: nextNumber });
  return nextNumber;
};
```

### 2. Realtime Sync with Socket.IO

Setiap kali ada antrian baru atau perubahan status, server mengirim event ke semua client.

```javascript
// controllers/queueController.js
exports.addQueue = async (req, res) => {
  const queue = await Queue.create({ ... });
  req.app.get('io').emit('new_queue', queue);
  // ...
};
```

Client (baik admin maupun kiosk) akan mendengarkan event:

```javascript
// Client-side (misal: menggunakan socket.io-client)
socket.on("new_queue", (queue) => {
  // Update UI
});
```

### 3. Branch & Counter Identification

Setiap kiosk harus terdaftar sebagai `Counter` di database dan terkait dengan `Branch`.

- Pelanggan mengambil antrian di cabang tertentu melalui loket tertentu.
- Admin hanya melihat antrian di cabang mereka.

---

## 🚦 Optimasi untuk Jutaan Data

### 1. Indexing

Tambahkan index pada field yang sering di-query.

```javascript
// models/Queue.js
queueSchema.index({ branch: 1, createdAt: -1 });
queueSchema.index({ status: 1 });
```

### 2. Pagination

Gunakan pagination untuk endpoint yang menampilkan banyak data.

```javascript
// controllers/queueController.js
exports.getQueues = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 100;
  const skip = (page - 1) * limit;
  const queues = await Queue.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  // ...
};
```

### 3. Archiving

## Pindahkan data antrian yang sudah lama (> 1 tahun) ke koleksi arsip.

## 🧪 Testing

Untuk menjalankan test:

```bash
npm test
```

---

## 📝 Catatan Tambahan

- **Monolith vs Microservice**: Pilih monolith karena aplikasi ini relatif kecil dan tidak memerlukan skalabilitas ekstrem.
- **MVC vs FE/BE Terpisah**: Gunakan FE/BE terpisah jika ingin mengembangkan aplikasi mobile atau desktop di masa depan.
- **Environment**: Pastikan untuk tidak menyimpan file `.env` di repository publik.

---

## 🤝 Kontribusi

1. Fork proyek ini
2. Buat branch fitur (`git checkout -b fitur/namafitur`)
3. Commit perubahan (`git commit -m 'Tambahkan fitur'`)
4. Push ke branch (`git push origin fitur/namafitur`)
5. Buat Pull Request

---

## 📄 Lisensi

## Proyek ini dilisensikan di bawah [MIT License](LICENSE).

**Dibuat dengan ❤️ oleh Tim SmartHome 2024**
