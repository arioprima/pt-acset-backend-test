# Aplikasi Antrian Toko – Backend

Aplikasi backend ini adalah bagian dari sistem antrian toko yang dirancang untuk mencatat dan mengelola antrian pelanggan secara **real-time**. Dibangun menggunakan **Node.js**, **Express.js**, **MongoDB**, serta mendukung **Socket.IO** untuk sinkronisasi antar mesin.

## 📖 Penjelasan Teknis & Pertimbangan Arsitektur

### 1. Monolith atau Microservice?

Aplikasi ini menggunakan pendekatan **Monolith** karena:

- Skala aplikasi masih sederhana dan tidak memiliki banyak modul kompleks.
- Deployment lebih mudah dan cepat, cocok untuk prototipe dan aplikasi awal.
- Komunikasi antar komponen cukup langsung, tanpa overhead API internal.

Namun, struktur folder seperti `services/`, `repositories/`, dan `controllers/` sudah disiapkan agar **mudah dipisah menjadi microservice** jika aplikasi berkembang di masa depan (misalnya: service antrian, auth service, dsb).

---

### 2. MVC atau FE & BE dipisah?

Saya menggunakan pendekatan **Frontend dan Backend dipisah (FE & BE separated)** karena:

- Memungkinkan deployment terpisah (misalnya FE di Vercel/Netlify dan BE di VPS).
- Lebih fleksibel jika ingin ganti teknologi frontend (React Native, mobile app, dsb).
- Frontend menggunakan React.js dengan konsumsi API dari backend Node.js/Express.

Namun, backend tetap mengikuti prinsip **MVC (Model, View, Controller)** secara internal:

- `models/` = struktur data MongoDB
- `controllers/` = menangani HTTP request
- `services/` dan `repositories/` = logika bisnis & query DB

---

### 3. Jika data sudah mencapai jutaan, bagaimana menangani query lambat?

Beberapa strategi yang bisa digunakan:

#### ✅ Indexing di MongoDB

Saya menambahkan index untuk field yang sering dipakai query, contohnya:

````js
QueueSchema.index({ branch_id: 1, counter_id: 1, created_at: -1 });

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
git clone https://github.com/arioprima/pt-acset-backend-test.git
cd pt-acset-backend-test
````

### 2. Install Dependencies

Pastikan menggunakan Node.js versi 14 ke atas.

```bash
npm install
```

### 3. Konfigurasi Environment

Buat file `.env` di root folder dengan isi:

```env
PORT=3000
MONGO_URI=mongodb+srv://shinamahiru946:agI23XmHyzhz4wBs@cluster0.i5c6mnb.mongodb.net/queue_system?retryWrites=true&w=majority&0
JWT_SECRET=test1234
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
├── node_modules/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── branch.controller.js
│   │   ├── counter.controller.js
│   │   └── queue.controller.js
│   ├── helpers/
│   │   ├── comparePassword.js
│   │   ├── generateJWT.js
│   │   └── hashPassword.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── migrations/
│   │   └── initMigration.js
│   ├── models/
│   │   ├── branch.model.js
│   │   ├── counter.model.js
│   │   ├── machine.model.js
│   │   ├── queue.model.js
│   │   ├── session.model.js
│   │   └── user.model.js
│   ├── repositories/
│   │   ├── branch.repository.js
│   │   ├── counter.repository.js
│   │   └── queue.repository.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── branch.routes.js
│   │   ├── counter.routes.js
│   │   └── queue.routes.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── branch.service.js
│   │   ├── counter.service.js
│   │   └── queue.service.js
│   └── socket/
│       └── index.js
├── utils/
│   └── regional.js
├── .env
├── .gitignore
├── README.md
├── app.js
├── package.json
├── package-lock.json
└── server.js
```

---

## 🔐 Endpoint API

### 🧑‍💼 Admin Authentication

- **POST** `/api/auth/login`  
  Login sebagai admin (mengembalikan token JWT)

- **POST** `/api/auth/logout`  
  Logout dan blacklist token JWT  
  **Headers:** `Authorization: Bearer <token>`

---

### 🏢 Branch & 🪑 Counter

- **GET** `/api/branches`  
  Mengambil semua daftar cabang

- **GET** `/api/counters?branch_id=<branch_id>`  
  Mengambil daftar loket berdasarkan cabang tertentu  
  **Query Param:** `branch_id` - ID cabang

---

### 📋 Queue Management

- **GET** `/api/queues`  
  Mengambil seluruh data antrian  
  **Role:** Admin  
  **Headers:** `Authorization: Bearer <token>`

- **PUT** `/api/queues/:id/done`  
  Tandai antrian sebagai selesai diproses  
  **Role:** Admin  
  **Headers:** `Authorization: Bearer <token>`  
  **Params:** `id` - ID antrian

- **POST** `/api/queues/take`  
  Pelanggan mengambil nomor antrian  
  **Body:**
  ```json
  {
    "branch_id": "string",
    "counter_id": "string"
  }
  ```

---
