# BOS7 — Module Financing (Prototipe Hi-Fi)

Prototipe back-office **pembiayaan syariah** untuk platform **BOS7 (Backend Office System / Core7)** —
Ihsan Solusi Informatika. Prototipe ini mendemonstrasikan siklus hidup pembiayaan end-to-end:
originasi → servicing → recovery, lengkap dengan kontrol maker-checker dan integrasi General Ledger.

Seluruh antarmuka mengikuti **BOS7 Design System** (Carbon v11 retuned) — lihat bagian
[Kepatuhan Design System](#kepatuhan-design-system).

---

## Cara menjalankan

Buka salah satu berkas berikut langsung di browser:

| Berkas | Isi |
| --- | --- |
| `Module Financing - Demo.html` | **Prototipe utama** — aplikasi click-through lengkap |
| `Module Financing - Demo (Standalone).html` | Versi mandiri (self-contained, offline) |
| `Module Financing - Demo-print.html` | Versi siap cetak |
| `deck-pres/BOS7 Financing — Deck.html` | **Deck presentasi** 27 slide (pitch ke calon klien bank) |

Alur masuk: **Login → Landing Page (pilih modul Bank Operating System) → klik *Financing Module* → Dashboard.**

---

## Arsitektur modul

Navigasi memakai **SideNav drilldown** ala BOS7 (root → grup → sub-menu). Sembilan grup fungsi:

| # | Grup | Cakupan utama |
| --- | --- | --- |
| 1 | **Beranda** | Dashboard portofolio · Site Map & Skenario |
| 2 | **Simulasi** | Murabahah/Qardh/Istishna', Ijarah, Mudharabah/Musyarakah, MMQ, PRKS, Gadai, Denda |
| 3 | **Data Master** | Instansi, Vendor, Developer, Mitra Join Finance, Pejabat, Kode Bisnis, Jenis Aktiva, Biaya |
| 4 | **Produk Parameter** | Produk Pembiayaan, Produk Fasilitas, Parameter Global, CKPN, Denda |
| 5 | **Rekening & Fasilitas** | Registrasi Fasilitas, Registrasi Account, List Fasilitas, List Account |
| 6 | **Edit Rekening** | Kelengkapan Data, Addendum, Restruktur, Ulang Jadwal |
| 7 | **Transaksi** | Pembayaran Manual, Pelunasan Dipercepat, Hapus Buku, AYDA, Denda, Reposisi |
| 8 | **Transaksi Massal** | Input Transaksi (batch upload) · History Transaksi |
| 9 | **Data Jaminan & Laporan/Otorisasi** | Daftar Jaminan, Dokumen · Nominatif, LBV, Antrian Otorisasi |

---

## Tujuh skenario end-to-end

1. **Setup Awal** — Data Master & Produk Parameter (wizard produk 4 bagian + GL Interface).
2. **Originasi** — Simulasi → Registrasi Fasilitas → Registrasi Pembiayaan → Otorisasi.
3. **Jaminan** — Daftar agunan → detail → koreksi/release.
4. **Servicing** — List Fasilitas → lihat detail → addendum → otorisasi.
5. **Account** — List Account → edit rekening → restruktur.
6. **Pembayaran** — Pembayaran Manual & Pelunasan Dipercepat (muqasah) + posting GL otomatis.
7. **Recovery** — Registrasi Hapus Buku → Recovery → Hapus Tagih (+ AYDA).

Setiap transaksi material melewati **antrian otorisasi maker-checker** sebelum aktif.

---

## Struktur berkas

```
Module Financing - Demo.html      — entry point prototipe (memuat semua .jsx + styles.css)
app.jsx                           — router + state global (tweaks, density, tenant)
shell.jsx                         — UiShell: header 40px + Drilldown SideNav
styles.css                        — token & komponen (dipetakan ke BOS7/Carbon)
data.js                           — mock data + NAV_TREE/NAV_RAILS + GL tx_class
forms.jsx                         — komponen form: Field, Select, DataTable, Modal, dll.

screens-*.jsx                     — satu berkas per domain layar:
  screens-auth ........... Login + Module Landing
  screens-overview ....... Dashboard + Site Map/Skenario
  screens-simulasi ....... Simulasi angsuran multi-akad
  screens-misc ........... Data Master, Data Vendor (CRUD), Produk Pembiayaan
  screens-master-mitra ... Data Mitra Join Finance (CRUD)
  screens-produk-fasilitas Produk Fasilitas (Parameter Biaya + GL Interface)
  screens-registrasi-* ... Registrasi pembiayaan (landing + parts)
  screens-fasilitas-* .... List/detail/addendum fasilitas
  screens-pembiayaan-* ... List/detail/edit kelengkapan rekening
  screens-edit-rekening .. Addendum, restruktur, ulang jadwal
  screens-transaksi-* .... Pembayaran, pelunasan, hapus buku, AYDA
  screens-massal ......... Transaksi Massal (input batch + history + detail)
  screens-jaminan ........ Data jaminan
  screens-laporan ........ Laporan & otorisasi

deck-pres/                        — deck presentasi 27 slide (deck-stage.js)
assets/, fonts/, _ds/             — aset, IBM Plex, binding design system
```

---

## Kepatuhan Design System

Mengikuti **BOS7 Design System** (`_ds/`) — wrapper opinionated di atas IBM Carbon v11:

- **Warna** — primary Carbon Blue `#0F62FE`; teks hitam murni `#000`; abu-abu Carbon; status resmi
  (success `#24A148`, warning `#F1C21B`, error `#DA1E28`, info `#0043CE`). Tanpa gradien.
- **Chrome** — header gelap `g90` 40px; SideNav drilldown terang 256px (`#F4F4F4`).
- **Geometri** — radius 0/2px; permukaan datar putih; kartu hairline `#E0E0E0` tanpa shadow
  (shadow hanya untuk layer mengambang: modal, popover, dropdown).
- **Densitas** — kontrol & baris 32px; font dasar 14px; eyebrow UPPERCASE + 0.32px letter-spacing.
- **Tipografi** — IBM Plex Sans (UI) + IBM Plex Mono (kode, nomor rekening, mata uang).
- **Multi-tenant** — palet brand dapat ditukar (Ihsan, BCA, BJB, Mega, Pos) via panel Tweaks
  tanpa mengubah tata letak.
- **Animasi** — durasi 100/150/200 ms; slide drilldown 180 ms; tanpa bounce/spring/scale.

---

## Tweaks

Panel **Tweaks** (toggle dari toolbar) memungkinkan:

- **Tenant / brand** — Ihsan · BCA · BJB · Mega · Pos
- **Density** — compact (dense BOS7) · comfort

---

## Catatan

- Data bersifat **mock** (di `data.js`) untuk keperluan demonstrasi.
- Logo tenant adalah **placeholder wordmark** — ganti dengan SVG resmi bank sebelum penggunaan eksternal.
- Berkas turunan (`Standalone`, `-print`) di-generate dari prototipe utama; regenerasi bila ada perubahan besar.
