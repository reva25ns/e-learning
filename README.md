# PAUD Media Edukasi Digital – Study Kids

Media pembelajaran POS PAUD Pelangi / PKG Telukjambe Barat yang siap dipublikasikan di Vercel. Nilai permainan tersimpan di Neon PostgreSQL melalui Vercel Functions.

## Fitur
- Login berbasis cookie sesi aman.
- Lagu latar karaoke instrumental **Bintang Kecil** dengan kontrol putar/jeda yang tetap dapat digunakan bila autoplay diblokir browser.
- Akun awal: **admin / admin123**.
- Belajar huruf A-Z dengan audio Bahasa Indonesia (SpeechSynthesis).
- Dunia Angka 1-10 dengan visual benda, nama angka, dan audio Bahasa Indonesia.
- Tambah & Pengurangan dengan latihan penjumlahan dan pengurangan menggunakan visual buah, bola, dan benda yang mudah dihitung anak.
- Permainan Mencocokkan Warna dengan drag-and-drop mouse/touchscreen, 3 level, pengacakan benda/target, audio instruksi, dan animasi umpan balik.
- Video pembelajaran YouTube untuk huruf A-Z dan angka 1-10.
- Latihan Huruf A-Z dengan soal pilihan jawaban.
- Latihan Angka 1-10 dengan soal pilihan jawaban.
- Penyimpanan nilai ke Neon PostgreSQL dan riwayat nilai.

## Video YouTube
- Cara menulis huruf A-Z: https://youtu.be/fj3Xu4mCG_Q?si=IAg3veJV23yAlcw5
- Angka 1-10: https://www.youtube.com/watch?v=KTIAwAAzFkI

## Menjalankan lokal
1. Jalankan `npm install`.
2. Salin `.env.example` menjadi `.env.local`, lalu isi `DATABASE_URL` dari Neon dan `AUTH_SECRET` yang acak.
3. Jalankan `vercel dev` dan buka alamat yang ditampilkan.
4. Login dengan `admin` / `admin123`.

Tabel `scores` dibuat otomatis saat nilai pertama disimpan. Video membutuhkan koneksi internet; jika embed diblokir oleh kebijakan perangkat/jaringan, gunakan tombol **Buka di YouTube**.


## Logo
Logo PKG Telukjambe Barat digunakan pada halaman login dan navigasi aplikasi: `assets/logo-pkg-telukjambe-barat.jpeg`.


### Pembaruan Dunia Angka dan Tambah & Pengurangan
Menu angka dipisah menjadi **Dunia Angka** untuk mengenal angka 1-10 dengan audio dan **Tambah & Pengurangan** untuk latihan tambah dan pengurangan.

### Pembaruan Dunia Huruf
Menu Dunia Huruf A-Z sekarang menampilkan visual objek untuk setiap huruf dan animasi bergeser saat berpindah kartu, seperti GIF sederhana. Contoh A = 🍎 Apel, B = ⚽ Bola, hingga Z = 🦓 Zebra.


### Perbaikan login untuk hosting statis
Jika `/api/login` pada hosting tidak menjalankan fungsi server dan malah mengembalikan `index.html`, versi ini tidak lagi gagal dengan pesan `Unexpected token '<', "<!DOCTYPE"...`. Aplikasi akan otomatis menggunakan **mode offline**: login `admin / admin123` dan nilai disimpan di `localStorage` perangkat. Jika API Vercel + Neon tersedia, aplikasi tetap menggunakan API dan database seperti biasa.
