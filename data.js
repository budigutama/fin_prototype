/* Mock data and navigation structure for the Financing prototype. */

// Rail icon → group on the sub-nav panel
window.NAV_RAILS = [
  { id: 'overview',   icon: 'home',      label: 'Beranda',         title: 'Beranda' },
  { id: 'simulasi',   icon: 'calc',      label: 'Simulasi',         title: 'Simulasi' },
  { id: 'master',     icon: 'building',  label: 'Data Master',      title: 'Data Master' },
  { id: 'produk',     icon: 'sliders',   label: 'Produk Parameter', title: 'Produk Parameter' },
  { id: 'fasilitas',  icon: 'folder',    label: 'Rekening & Fasilitas', title: 'Rekening & Fasilitas' },
  { id: 'edit',       icon: 'edit',      label: 'Edit Rekening',    title: 'Edit Rekening' },
  { id: 'transaksi',  icon: 'swap',      label: 'Transaksi',        title: 'Transaksi' },
  { id: 'jaminan',    icon: 'shield',    label: 'Data Jaminan',     title: 'Data Jaminan' },
  { id: 'laporan',    icon: 'finance',   label: 'Laporan',          title: 'Laporan' },
  { id: 'otorisasi',  icon: 'clipboard', label: 'Otorisasi',        title: 'Otorisasi' },
];

// Each rail expands to a list of items in the sub-nav panel
window.NAV_TREE = {
  overview: [
    { route: '/dashboard', label: 'Dashboard' },
    { route: '/overview',  label: 'Site Map & Skenario' },
  ],
  simulasi: [
    { route: '/simulasi',                     label: 'Murabahah, Qardh dan Istishna\'' },
    { route: '/simulasi?akad=ijarah',         label: 'Ijarah' },
    { route: '/simulasi?akad=mudharabah',     label: 'Mudharabah dan Musyarakah' },
    { route: '/simulasi?akad=mmq',            label: 'MMQ' },
    { route: '/simulasi?akad=prks',           label: 'PRKS' },
    { route: '/simulasi?akad=gadai',          label: 'Gadai' },
    { route: '/simulasi?akad=denda',          label: 'Denda Ta\'zir dan Ta\'wid' },
  ],
  master: [
    { route: '/master/instansi',          label: 'Data Instansi' },
    { route: '/master/pejabat',           label: 'Data Pejabat' },
    { route: '/master/vendor',            label: 'Data Vendor' },
    { route: '/master/developer',         label: 'Data Developer' },
    { route: '/master/mitra',             label: 'Data Mitra Join Finance' },
    { route: '/master/kode-bisnis',       label: 'Data Kode Bisnis' },
    { route: '/master/jenis-aktiva',      label: 'Data Jenis Aktiva' },
    { route: '/master/biaya',             label: 'Data Biaya-Biaya' },
  ],
  produk: [
    { route: '/produk/pembiayaan',        label: 'Produk Pembiayaan' },
    { route: '/produk/fasilitas',         label: 'Produk Fasilitas' },
    { route: '/produk/parameter-global',  label: 'Parameter Global' },
    { route: '/produk/parameter-ckpn',    label: 'Parameter CKPN' },
    { route: '/produk/parameter-denda',   label: 'Parameter Denda' },
    { route: '/produk/parameter-gadai',   label: 'Parameter Gadai' },
  ],
  fasilitas: [
    { route: '/registrasi-fasilitas',     label: 'Registrasi Fasilitas' },
    {
      label: 'Registrasi Account', expandable: true,
      children: [
        { route: '/registrasi/pembiayaan',      label: 'Rekening Pembiayaan' },
        { route: '/registrasi/gadai',           label: 'Rekening Gadai' },
        { route: '/registrasi/qardh',           label: 'Rekening Qardh' },
        { route: '/registrasi/qardh-ujroh',     label: 'Qardh bil Ujroh' },
        { route: '/registrasi/bank-garansi',    label: 'Bank Garansi' },
      ]
    },
    { route: '/list-fasilitas',           label: 'List Fasilitas' },
    { route: '/list-pembiayaan',          label: 'List Account Pembiayaan' },
    { route: '/list-gadai',               label: 'List Account Gadai' },
    { route: '/list-qardh',               label: 'List Account Qardh' },
    { route: '/list-bank-garansi',        label: 'List Bank Garansi' },
  ],
  edit: [
    { route: '/edit/data',              label: 'Ubah Data Rekening' },
    { route: '/edit/kelengkapan-data',  label: 'Kelengkapan Data Pembiayaan' },
    { route: '/edit/addendum',          label: 'Addendum Pembiayaan' },
    { route: '/edit/restruktur',        label: 'Restruktur Pembiayaan' },
    { route: '/edit/ulang-jadwal',      label: 'Ubah Jadwal Angsuran' },
    { route: '/edit/agunan',            label: 'Pengikatan Pembiayaan dengan Agunan' },
  ],
  transaksi: [
    { route: '/transaksi/pembayaran-manual',    label: 'Pembayaran Manual' },
    { route: '/transaksi/pelunasan-dipercepat', label: 'Pelunasan Dipercepat' },
    { route: '/transaksi/koreksi-pembayaran',   label: 'Koreksi Pembayaran' },
    { route: '/transaksi/input-biaya',          label: 'Input Biaya-Biaya' },
    { route: '/transaksi/biaya-amortisasi',     label: 'Biaya Amortisasi' },
    { route: '/transaksi/ppid-asuransi',        label: 'PPID Asuransi' },
    { route: '/transaksi/reposisi-cabang',      label: 'Reposisi Cabang' },
    { route: '/transaksi/ganti-produk',         label: 'Ganti Produk' },
    {
      label: 'Hapus Buku', expandable: true,
      children: [
        { route: '/transaksi/hapus-buku/registrasi', label: 'Registrasi Hapus Buku' },
        { route: '/transaksi/hapus-buku/recovery',   label: 'Recovery Hapus Buku' },
        { route: '/transaksi/hapus-buku/hapus-tagih',label: 'Hapus Tagih' },
      ]
    },
    {
      label: 'AYDA', expandable: true,
      children: [
        { route: '/transaksi/ayda/input',        label: 'Input AYDA' },
        { route: '/transaksi/ayda/penyelesaian', label: 'Penyelesaian AYDA' },
        { route: '/transaksi/ayda/pencairan',    label: 'Pencairan AYDA' },
        { route: '/transaksi/ayda/happes',       label: 'Happes AYDA' },
      ]
    },
    { route: '/transaksi/bayar-denda',          label: 'Bayar Denda' },
    {
      label: 'Pembatalan Transaksi', expandable: true,
      children: [
        { route: '/transaksi/pembatalan/registrasi', label: 'Pembatalan Registrasi' },
        { route: '/transaksi/pembatalan/addendum',   label: 'Pembatalan Addendum' },
      ]
    },
    { route: '/transaksi/deklarasi-lhu',       label: 'Deklarasi Laporan Hasil Usaha' },
  ],
  jaminan: [
    { route: '/jaminan/daftar',           label: 'Daftar Jaminan' },
    { route: '/jaminan/siap-ambil',       label: 'Daftar Jaminan Siap Ambil' },
    { route: '/jaminan/entri-individual', label: 'Entri Jaminan Individual' },
    { route: '/jaminan/entri-kolektif',   label: 'Entri Jaminan Kolektif' },
    { route: '/jaminan/dokumen',          label: 'Daftar Management Dokumen' },
  ],
  laporan: [
    { route: '/financing/laporan/nominatif_pembiayaan', label: 'Nominatif Pembiayaan' },
    { route: '/financing/laporan/nominatif_fasilitas',  label: 'Fasilitas Pembiayaan' },
    { route: '/financing/laporan/transaksi',            label: 'Histori Transaksi Pembiayaan' },
    { route: '/financing/laporan/amortisasi_biaya',     label: 'Amortisasi Biaya Pembiayaan' },
    { route: '/financing/laporan/accrue_pembiayaan',    label: 'Accrue Pembiayaan' },
    { route: '/financing/laporan/tagihan_angsuran',     label: 'Jadwal Tagihan Angsuran' },
    { route: '/financing/laporan/lbv',                  label: 'Ledger Balance Verification (LBV)' },
    {
      label: 'Jaminan', expandable: true,
      children: [
        { route: '/financing/laporan/jaminan/data_jaminan',       label: 'Data Jaminan' },
        { route: '/financing/laporan/jaminan/pengikatan_jaminan', label: 'Data Pengikatan Jaminan' },
      ]
    },
  ],
  otorisasi: [
    { route: '/otorisasi', label: 'Antrian Otorisasi' },
  ],
};

// Map route -> rail id (for highlighting the correct rail icon)
window.routeToRail = function(route) {
  const base = route.split('?')[0];
  if (base.startsWith('/simulasi'))                return 'simulasi';
  if (base.startsWith('/master'))                  return 'master';
  if (base.startsWith('/produk'))                  return 'produk';
  if (base.startsWith('/registrasi-fasilitas') ||
      base.startsWith('/registrasi/') ||
      base.startsWith('/list-'))                   return 'fasilitas';
  if (base.startsWith('/edit/'))                   return 'edit';
  if (base.startsWith('/transaksi/'))              return 'transaksi';
  if (base.startsWith('/jaminan/'))                return 'jaminan';
  if (base.startsWith('/financing/laporan'))       return 'laporan';
  if (base.startsWith('/otorisasi'))               return 'otorisasi';
  return 'overview';
};

// Mock customers (Indonesian names + NIK)
window.MOCK_NASABAH = [
  { kode: '0000000623123', nama: 'Heri Tapiheru',          nik: '3171042510830012', tipe: 'Individu',  cabang: '001 - Kantor Pusat' },
  { kode: '0000002431891', nama: 'Jacob Jones',            nik: '3175061204900025', tipe: 'Individu',  cabang: '012 - Kelapa Gading' },
  { kode: '0000003122047', nama: 'Siti Nurhaliza Pratiwi', nik: '3273024505870019', tipe: 'Individu',  cabang: '005 - Bandung Asia Afrika' },
  { kode: '0000004890222', nama: 'PT Maju Bersama Sejahtera', nik: '01.234.567.8-901.000', tipe: 'Badan Usaha', cabang: '001 - Kantor Pusat' },
  { kode: '0000005432109', nama: 'Budi Santoso Wibowo',    nik: '3275051509820017', tipe: 'Individu',  cabang: '023 - Surabaya Tunjungan' },
  { kode: '0000006734512', nama: 'Dewi Lestari Anggraini', nik: '3174065710910022', tipe: 'Individu',  cabang: '012 - Kelapa Gading' },
  { kode: '0000007901334', nama: 'CV Karya Mandiri Abadi', nik: '02.345.678.9-012.000', tipe: 'Badan Usaha', cabang: '005 - Bandung Asia Afrika' },
  { kode: '0000008456789', nama: 'Ahmad Fauzi Rahman',     nik: '3171081804880030', tipe: 'Individu',  cabang: '001 - Kantor Pusat' },
  { kode: '0000009123456', nama: 'Rina Wulandari',         nik: '3273152306890044', tipe: 'Individu',  cabang: '034 - Yogya Malioboro' },
  { kode: '0000010234567', nama: 'PT Sinar Cemerlang',     nik: '03.456.789.0-123.000', tipe: 'Badan Usaha', cabang: '023 - Surabaya Tunjungan' },
];

// Mock fasilitas (Daftar Fasilitas)
window.MOCK_FASILITAS = [
  { id: '00000378312', noFasilitas: '00000378312', kodeNasabah: '0000002431', nama: 'Jacob Jones',         jenis: 'C - Mudharabah',  cabang: '001 - Kantor Pusat',   plafond: 87960300.79, sisa: 0,            status: 'Jatuh Tempo', tglBuka: '13-Jul-2023', tglJTempo: '13-Jul-2027' },
  { id: '00000378313', noFasilitas: '00000378313', kodeNasabah: '0000000623', nama: 'Heri Tapiheru',       jenis: 'M - Murabahah',   cabang: '001 - Kantor Pusat',   plafond: 450000000,    sisa: 312500000,     status: 'Aktif',       tglBuka: '15-Mar-2024', tglJTempo: '15-Mar-2027' },
  { id: '00000378314', noFasilitas: '00000378314', kodeNasabah: '0000003122', nama: 'Siti Nurhaliza P.',   jenis: 'I - Ijarah',      cabang: '005 - Bandung Asia A.', plafond: 120000000,    sisa: 85000000,      status: 'Aktif',       tglBuka: '02-Sep-2024', tglJTempo: '02-Sep-2026' },
  { id: '00000378315', noFasilitas: '00000378315', kodeNasabah: '0000004890', nama: 'PT Maju Bersama S.',  jenis: 'C - Mudharabah',  cabang: '001 - Kantor Pusat',   plafond: 2500000000,   sisa: 1875000000,    status: 'Aktif',       tglBuka: '20-Nov-2023', tglJTempo: '20-Nov-2028' },
  { id: '00000378316', noFasilitas: '00000378316', kodeNasabah: '0000005432', nama: 'Budi Santoso W.',     jenis: 'M - Murabahah',   cabang: '023 - Surabaya Tun.',  plafond: 75000000,     sisa: 45000000,      status: 'Aktif',       tglBuka: '11-Aug-2024', tglJTempo: '11-Aug-2026' },
  { id: '00000378317', noFasilitas: '00000378317', kodeNasabah: '0000006734', nama: 'Dewi Lestari A.',     jenis: 'I - Ijarah',      cabang: '012 - Kelapa Gading',  plafond: 200000000,    sisa: 180000000,     status: 'Menunggu Pencairan', tglBuka: '05-Jan-2025', tglJTempo: '05-Jan-2028' },
  { id: '00000378318', noFasilitas: '00000378318', kodeNasabah: '0000007901', nama: 'CV Karya Mandiri',    jenis: 'MMQ',             cabang: '005 - Bandung Asia A.', plafond: 800000000,    sisa: 320000000,     status: 'Aktif',       tglBuka: '17-Feb-2023', tglJTempo: '17-Feb-2026' },
  { id: '00000378319', noFasilitas: '00000378319', kodeNasabah: '0000008456', nama: 'Ahmad Fauzi R.',      jenis: 'M - Murabahah',   cabang: '001 - Kantor Pusat',   plafond: 350000000,    sisa: 0,             status: 'Lunas',       tglBuka: '08-Jun-2022', tglJTempo: '08-Jun-2025' },
  { id: '00000378320', noFasilitas: '00000378320', kodeNasabah: '0000009123', nama: 'Rina Wulandari',      jenis: 'M - Murabahah',   cabang: '034 - Yogya Malio.',   plafond: 95000000,     sisa: 65000000,      status: 'Aktif',       tglBuka: '14-Apr-2024', tglJTempo: '14-Apr-2027' },
  { id: '00000378321', noFasilitas: '00000378321', kodeNasabah: '0000010234', nama: 'PT Sinar Cemerlang',  jenis: 'C - Mudharabah',  cabang: '023 - Surabaya Tun.',  plafond: 1200000000,   sisa: 950000000,     status: 'Tunggakan',   tglBuka: '22-Oct-2023', tglJTempo: '22-Oct-2026' },
];

// Mock rekening pembiayaan
window.MOCK_PEMBIAYAAN = [
  { id: '7100-0044', noRek: '7100-0000-0044', noFasilitas: '00000378312', nama: 'Jacob Jones',       akad: 'Mudharabah', plafond: 87960300, outstanding: 87960300, kolektibilitas: 1, tenor: 48, angsuranKe: 12, jatuhTempo: '13-Jul-2027', status: 'Aktif' },
  { id: '7100-0045', noRek: '7100-0000-0045', noFasilitas: '00000378313', nama: 'Heri Tapiheru',     akad: 'Murabahah',  plafond: 450000000, outstanding: 312500000, kolektibilitas: 1, tenor: 36, angsuranKe: 8,  jatuhTempo: '15-Mar-2027', status: 'Aktif' },
  { id: '7100-0046', noRek: '7100-0000-0046', noFasilitas: '00000378314', nama: 'Siti Nurhaliza',    akad: 'Ijarah',     plafond: 120000000, outstanding: 85000000,  kolektibilitas: 1, tenor: 24, angsuranKe: 7,  jatuhTempo: '02-Sep-2026', status: 'Aktif' },
  { id: '7100-0047', noRek: '7100-0000-0047', noFasilitas: '00000378315', nama: 'PT Maju Bersama',   akad: 'Mudharabah', plafond: 2500000000, outstanding: 1875000000, kolektibilitas: 2, tenor: 60, angsuranKe: 15, jatuhTempo: '20-Nov-2028', status: 'Tunggakan' },
  { id: '7100-0048', noRek: '7100-0000-0048', noFasilitas: '00000378316', nama: 'Budi Santoso',      akad: 'Murabahah',  plafond: 75000000,  outstanding: 45000000,  kolektibilitas: 1, tenor: 24, angsuranKe: 10, jatuhTempo: '11-Aug-2026', status: 'Aktif' },
  { id: '7100-0049', noRek: '7100-0000-0049', noFasilitas: '00000378318', nama: 'CV Karya Mandiri',  akad: 'MMQ',        plafond: 800000000, outstanding: 320000000, kolektibilitas: 1, tenor: 36, angsuranKe: 22, jatuhTempo: '17-Feb-2026', status: 'Aktif' },
  { id: '7100-0050', noRek: '7100-0000-0050', noFasilitas: '00000378319', nama: 'Ahmad Fauzi',       akad: 'Murabahah',  plafond: 350000000, outstanding: 0,         kolektibilitas: 1, tenor: 36, angsuranKe: 36, jatuhTempo: '08-Jun-2025', status: 'Lunas' },
  { id: '7100-0051', noRek: '7100-0000-0051', noFasilitas: '00000378320', nama: 'Rina Wulandari',    akad: 'Murabahah',  plafond: 95000000,  outstanding: 65000000,  kolektibilitas: 1, tenor: 36, angsuranKe: 9,  jatuhTempo: '14-Apr-2027', status: 'Aktif' },
  { id: '7100-0052', noRek: '7100-0000-0052', noFasilitas: '00000378321', nama: 'PT Sinar Cemerlang',akad: 'Mudharabah', plafond: 1200000000,outstanding: 950000000, kolektibilitas: 3, tenor: 36, angsuranKe: 18, jatuhTempo: '22-Oct-2026', status: 'Tunggakan' },
];

// Mock jaminan
window.MOCK_JAMINAN = [
  { noJaminan: '0000000001', noNasabah: '0000012345', nama: 'Heri Tapiheru',       jenis: 'Properti Individu',  nilai: 850000000, status: 'Diikat',  appraisal: 'PT Apraisal Mandiri', tglAppraisal: '12-Jan-2025', cabang: '001' },
  { noJaminan: '0000000002', noNasabah: '0000023456', nama: 'Siti Nurhaliza',     jenis: 'Kendaraan Individu',  nilai: 280000000, status: 'Diikat',  appraisal: 'PT Karya Penilai',    tglAppraisal: '05-Feb-2025', cabang: '005' },
  { noJaminan: '0000000003', noNasabah: '0000034567', nama: 'PT Maju Bersama',     jenis: 'Mesin & Alat',        nilai: 1200000000, status: 'Diikat', appraisal: 'PT Apraisal Mandiri', tglAppraisal: '20-Dec-2024', cabang: '001' },
  { noJaminan: '0000000004', noNasabah: '0000045678', nama: 'Budi Santoso',        jenis: 'Emas',                nilai: 45000000,  status: 'Aktif',   appraisal: '-',                   tglAppraisal: '11-Mar-2025', cabang: '023' },
  { noJaminan: '0000000005', noNasabah: '0000056789', nama: 'CV Karya Mandiri',    jenis: 'Piutang Tagihan',     nilai: 600000000, status: 'Diikat',  appraisal: 'PT Karya Penilai',    tglAppraisal: '08-Feb-2025', cabang: '005' },
  { noJaminan: '0000000006', noNasabah: '0000067890', nama: 'Dewi Lestari',        jenis: 'Properti Individu',  nilai: 1100000000, status: 'Pending Bind', appraisal: 'PT Apraisal Mandiri', tglAppraisal: '15-Jan-2025', cabang: '012' },
  { noJaminan: '0000000007', noNasabah: '0000078901', nama: 'Ahmad Fauzi',         jenis: 'Kendaraan Individu',  nilai: 320000000, status: 'Release', appraisal: 'PT Karya Penilai',    tglAppraisal: '02-Apr-2024', cabang: '001' },
  { noJaminan: '0000000008', noNasabah: '0000089012', nama: 'PT Sinar Cemerlang',  jenis: 'Properti Kolektif',  nilai: 3500000000, status: 'Diikat', appraisal: 'PT Apraisal Mandiri', tglAppraisal: '25-Nov-2024', cabang: '023' },
  { noJaminan: '0000000009', noNasabah: '0000090123', nama: 'Rina Wulandari',      jenis: 'Surat Berharga',     nilai: 75000000,  status: 'Diikat',  appraisal: '-',                   tglAppraisal: '10-Apr-2025', cabang: '034' },
];

// Mock master data (instansi, vendor, etc.)
window.MOCK_INSTANSI = [
  { kode: '001', nama: 'Kementerian Keuangan RI',        alamat: 'Jl. Lapangan Banteng Timur No. 2-4, Jakarta Pusat',  pic: 'Sri Mulyani', telp: '021-3449230', status: 'Aktif' },
  { kode: '002', nama: 'PT Pertamina (Persero)',          alamat: 'Jl. Medan Merdeka Timur 1A, Jakarta Pusat',          pic: 'Nicke Widyawati', telp: '021-3815111', status: 'Aktif' },
  { kode: '003', nama: 'Bank Indonesia',                  alamat: 'Jl. M.H. Thamrin No. 2, Jakarta Pusat',              pic: 'Perry Warjiyo',  telp: '021-2310108', status: 'Aktif' },
  { kode: '004', nama: 'PT Telkom Indonesia',             alamat: 'Jl. Japati No. 1, Bandung',                          pic: 'Ririek Adriansyah', telp: '022-4527111', status: 'Aktif' },
  { kode: '005', nama: 'Pemprov DKI Jakarta',             alamat: 'Jl. Medan Merdeka Selatan No. 8-9, Jakarta',         pic: 'Heru Budi Hartono', telp: '021-3822255', status: 'Aktif' },
  { kode: '006', nama: 'PT PLN (Persero)',                alamat: 'Jl. Trunojoyo Blok M I/135, Jakarta Selatan',        pic: 'Darmawan Prasodjo', telp: '021-7251234', status: 'Aktif' },
  { kode: '007', nama: 'Kemenag RI',                      alamat: 'Jl. Lapangan Banteng Barat No. 3-4, Jakarta Pusat',  pic: 'Yaqut Cholil Qoumas', telp: '021-3811679', status: 'Tidak Aktif' },
];

window.MOCK_VENDOR = [
  { kode: 'VND001', nama: 'PT Toyota Astra Motor',        kategori: 'Otomotif',         npwp: '01.234.567.8-901.000', telp: '021-65310111', status: 'Aktif' },
  { kode: 'VND002', nama: 'PT Honda Prospect Motor',      kategori: 'Otomotif',         npwp: '02.345.678.9-012.000', telp: '021-65310222', status: 'Aktif' },
  { kode: 'VND003', nama: 'PT Sumber Berlian Motors',     kategori: 'Otomotif',         npwp: '03.456.789.0-123.000', telp: '021-65310333', status: 'Aktif' },
  { kode: 'VND004', nama: 'PT Indomarco Prismatama',      kategori: 'Ritel',            npwp: '04.567.890.1-234.000', telp: '021-87913131', status: 'Aktif' },
  { kode: 'VND005', nama: 'PT Sinar Mas Properti',         kategori: 'Properti',         npwp: '05.678.901.2-345.000', telp: '021-50182888', status: 'Aktif' },
  { kode: 'VND006', nama: 'CV Mitra Karya Pratama',       kategori: 'Konstruksi',       npwp: '06.789.012.3-456.000', telp: '021-66061234', status: 'Aktif' },
  { kode: 'VND007', nama: 'PT Mitra Pinasthika Mulia',    kategori: 'Otomotif',         npwp: '07.890.123.4-567.000', telp: '031-7493111', status: 'Tidak Aktif' },
];

window.MOCK_PRODUK_PEMBIAYAAN = [
  { kode: 'M-001', nama: 'Murabahah Kendaraan Bermotor',          akad: 'Murabahah',  minPlafond: 50000000,   maxPlafond: 1500000000,  minTenor: 12, maxTenor: 60, marginMin: 8.5,  marginMax: 14.0, status: 'Aktif' },
  { kode: 'M-002', nama: 'Murabahah Kepemilikan Rumah',           akad: 'Murabahah',  minPlafond: 200000000,  maxPlafond: 5000000000,  minTenor: 60, maxTenor: 240, marginMin: 7.5,  marginMax: 11.5, status: 'Aktif' },
  { kode: 'M-003', nama: 'Murabahah Multiguna',                   akad: 'Murabahah',  minPlafond: 10000000,   maxPlafond: 500000000,   minTenor: 6,  maxTenor: 36, marginMin: 11.0, marginMax: 16.5, status: 'Aktif' },
  { kode: 'C-001', nama: 'Mudharabah Modal Kerja',                 akad: 'Mudharabah', minPlafond: 500000000,  maxPlafond: 10000000000, minTenor: 12, maxTenor: 60, marginMin: 9.5,  marginMax: 13.5, status: 'Aktif' },
  { kode: 'I-001', nama: 'Ijarah Multijasa',                       akad: 'Ijarah',     minPlafond: 25000000,   maxPlafond: 500000000,   minTenor: 12, maxTenor: 60, marginMin: 10.5, marginMax: 15.0, status: 'Aktif' },
  { kode: 'M-004', nama: 'Musyarakah Mutanaqishah (MMQ) Properti', akad: 'MMQ',        minPlafond: 250000000,  maxPlafond: 7500000000,  minTenor: 60, maxTenor: 180, marginMin: 8.0,  marginMax: 12.0, status: 'Aktif' },
  { kode: 'Q-001', nama: 'Qardh Karyawan',                         akad: 'Qardh',      minPlafond: 5000000,    maxPlafond: 100000000,   minTenor: 6,  maxTenor: 24, marginMin: 0,    marginMax: 0,    status: 'Aktif' },
  { kode: 'G-001', nama: 'Gadai Emas Reguler',                     akad: 'Qardh',      minPlafond: 1000000,    maxPlafond: 250000000,   minTenor: 1,  maxTenor: 4,  marginMin: 0.8,  marginMax: 1.2,  status: 'Aktif' },
];

/* ─────────── Produk Fasilitas ─────────── */
// Plafond fasilitas induk (umbrella) — di bawahnya dibuka rekening pembiayaan.
window.MOCK_PRODUK_FASILITAS = [
  { kode: 'FFP01', nama: 'Musyarakah Revolving',     akad: 'Musyarakah', droppingModel: 'Revolving',     sifat: 'Committed',   tipe: 'Bank',     status: 'Aktif' },
  { kode: 'FFP02', nama: 'MUSYARAKAH NON REVOLVING', akad: 'Musyarakah', droppingModel: 'Non Revolving', sifat: 'Committed',   tipe: 'Bank',     status: 'Aktif' },
  { kode: 'FFM01', nama: 'Murabahah Line Facility',  akad: 'Murabahah',  droppingModel: 'Non Revolving', sifat: 'Uncommitted', tipe: 'Bank',     status: 'Aktif' },
  { kode: 'FFK01', nama: 'Kafalah Bank Garansi',     akad: 'Kafalah',    droppingModel: 'Revolving',     sifat: 'Committed',   tipe: 'Non Bank', status: 'Tidak Aktif' },
];

// Mock antrian otorisasi
window.MOCK_OTORISASI = [
  { id: 'OT-2025-0143', tipe: 'Registrasi Pembiayaan', nasabah: 'Rina Wulandari',     nominal: 95000000,   maker: 'BCSHQB109T', tglInput: '24-May-2026 09:23' },
  { id: 'OT-2025-0142', tipe: 'Addendum Fasilitas',    nasabah: 'PT Maju Bersama',   nominal: 2500000000, maker: 'BCSHQB1025', tglInput: '24-May-2026 09:14' },
  { id: 'OT-2025-0141', tipe: 'Pelunasan Dipercepat',  nasabah: 'Ahmad Fauzi',       nominal: 12500000,   maker: 'BCSHQB109T', tglInput: '24-May-2026 08:55' },
  { id: 'OT-2025-0140', tipe: 'Restruktur Pembiayaan', nasabah: 'PT Sinar Cemerlang',nominal: 950000000,  maker: 'BCSHQB2017', tglInput: '23-May-2026 16:32' },
];

/* ─────────── COA (Chart of Account) ─────────── */
// Master rekening GL untuk lookup pada GL Interface produk pembiayaan.
window.MOCK_COA = [
  // Asset
  { kode: '11001000010', nama: 'Kas Besar - Rupiah',                              type: 'Asset',     posisi: 'Debet'  },
  { kode: '13501100100', nama: 'Piutang Murabahah',                               type: 'Asset',     posisi: 'Debet'  },
  { kode: '13501200100', nama: 'Piutang Istishna',                                type: 'Asset',     posisi: 'Debet'  },
  { kode: '13501300100', nama: 'Pembiayaan Mudharabah',                           type: 'Asset',     posisi: 'Debet'  },
  { kode: '13601100100', nama: 'Margin Murabahah Ditangguhkan (MMD)',             type: 'Asset',     posisi: 'Kredit', kontra: true },
  { kode: '13601200100', nama: 'Margin Istishna Ditangguhkan',                    type: 'Asset',     posisi: 'Kredit', kontra: true },
  { kode: '13701100100', nama: 'Pendapatan Akan Diterima (Akru) - Murabahah',     type: 'Asset',     posisi: 'Debet'  },
  { kode: '13701200100', nama: 'Pendapatan Akan Diterima (Akru) - Istishna',      type: 'Asset',     posisi: 'Debet'  },
  { kode: '13801000100', nama: 'Cadangan Kerugian Penurunan Nilai (CKPN)',        type: 'Asset',     posisi: 'Kredit', kontra: true },
  { kode: '15901000100', nama: 'Piutang Yang Akan Diterima (PYAD)',               type: 'Asset',     posisi: 'Debet'  },
  // Liability
  { kode: '20101000100', nama: 'Titipan Angsuran Nasabah',                        type: 'Liability', posisi: 'Kredit' },
  { kode: '20501000100', nama: 'Kewajiban Pajak Penghasilan',                     type: 'Liability', posisi: 'Kredit' },
  { kode: '29001000100', nama: "Kewajiban Ta'wid",                                type: 'Liability', posisi: 'Kredit' },
  { kode: '29101000100', nama: 'Kewajiban Lainnya - Goodwill',                    type: 'Liability', posisi: 'Kredit' },
  // Income
  { kode: '41201100100', nama: 'Pendapatan Margin Murabahah',                     type: 'Income',    posisi: 'Kredit' },
  { kode: '41201200100', nama: 'Pendapatan Margin Istishna',                      type: 'Income',    posisi: 'Kredit' },
  { kode: '41201300100', nama: 'Pendapatan Bagi Hasil Mudharabah',                type: 'Income',    posisi: 'Kredit' },
  { kode: '41501100100', nama: 'Pendapatan Administrasi Pembiayaan',              type: 'Income',    posisi: 'Kredit' },
  { kode: '41501200100', nama: 'Pendapatan Provisi Pembiayaan',                   type: 'Income',    posisi: 'Kredit' },
  { kode: '48001000100', nama: "Pendapatan Denda Ta'zir",                         type: 'Income',    posisi: 'Kredit' },
  // Expense
  { kode: '61001000100', nama: 'Beban CKPN Pembiayaan',                           type: 'Expense',   posisi: 'Debet'  },
  { kode: '61201000100', nama: 'Beban Penghapusan Piutang',                       type: 'Expense',   posisi: 'Debet'  },
  { kode: '61501000100', nama: 'Beban Materai',                                   type: 'Expense',   posisi: 'Debet'  },
];

/* ─────────── Daftar kode_tx_class per akad ─────────── */
// Definisi jenis mutasi pada detil transaksi pembiayaan.
// Setiap produk meng-map kode ini ke kode GL yang sesuai (GL Interface).
window.MOCK_TX_CLASS = [
  { kode: 'PIUTANG',     deskripsi: 'Pokok piutang / pembiayaan kepada nasabah',          accountType: 'Asset',     wajib: true,  posisi: 'Debet'  },
  { kode: 'MMD',         deskripsi: 'Margin Murabahah / Istishna Ditangguhkan',           accountType: 'Asset',     wajib: true,  posisi: 'Kredit' },
  { kode: 'PENDAPATAN',  deskripsi: 'Pendapatan margin / bagi hasil saat angsuran',       accountType: 'Income',    wajib: true,  posisi: 'Kredit' },
  { kode: 'AKRU',        deskripsi: 'Pendapatan akan diterima (akrual harian)',           accountType: 'Asset',     wajib: true,  posisi: 'Debet'  },
  { kode: 'PYAD',        deskripsi: 'Piutang Yang Akan Diterima',                         accountType: 'Asset',     wajib: false, posisi: 'Debet'  },
  { kode: 'ADM',         deskripsi: 'Pendapatan biaya administrasi pembiayaan',           accountType: 'Income',    wajib: true,  posisi: 'Kredit' },
  { kode: 'PROVISI',     deskripsi: 'Pendapatan biaya provisi',                           accountType: 'Income',    wajib: false, posisi: 'Kredit' },
  { kode: 'DENDA_TAZIR', deskripsi: "Pendapatan denda Ta'zir (sanksi)",                   accountType: 'Income',    posisi: 'Kredit' },
  { kode: 'DENDA_TAWID', deskripsi: "Kewajiban Ta'wid (ganti rugi)",                      accountType: 'Liability', posisi: 'Kredit' },
  { kode: 'CKPN',        deskripsi: 'Cadangan Kerugian Penurunan Nilai',                  accountType: 'Asset',     posisi: 'Kredit' },
  { kode: 'BEBAN_CKPN',  deskripsi: 'Beban pembentukan CKPN',                             accountType: 'Expense',   posisi: 'Debet'  },
  { kode: 'TITIPAN',     deskripsi: 'Titipan angsuran nasabah (suspense)',                accountType: 'Liability', posisi: 'Kredit' },
  { kode: 'PAJAK',       deskripsi: 'Pajak Penghasilan atas margin',                      accountType: 'Liability', posisi: 'Kredit' },
  { kode: 'HAPUS_BUKU',  deskripsi: 'Beban penghapusbukuan pokok',                        accountType: 'Expense',   posisi: 'Debet'  },
];

/* ─────────── Default GL Interface mapping per akad ─────────── */
// Mapping kode_tx_class → kode_gl, dipakai untuk pre-fill saat membuat produk baru
// dan saat menampilkan detail / edit produk yang sudah ada.
window.MOCK_GL_INTERFACE_DEFAULT = {
  Murabahah: {
    PIUTANG:     '13501100100',
    MMD:         '13601100100',
    PENDAPATAN:  '41201100100',
    AKRU:        '13701100100',
    PYAD:        '15901000100',
    ADM:         '41501100100',
    PROVISI:     '41501200100',
    DENDA_TAZIR: '48001000100',
    DENDA_TAWID: '29001000100',
    CKPN:        '13801000100',
    BEBAN_CKPN:  '61001000100',
    TITIPAN:     '20101000100',
    PAJAK:       '20501000100',
    HAPUS_BUKU:  '61201000100',
  },
  Istishna: {
    PIUTANG:     '13501200100',
    MMD:         '13601200100',
    PENDAPATAN:  '41201200100',
    AKRU:        '13701200100',
    PYAD:        '15901000100',
    ADM:         '41501100100',
    PROVISI:     '41501200100',
    DENDA_TAZIR: '48001000100',
    DENDA_TAWID: '29001000100',
    CKPN:        '13801000100',
    BEBAN_CKPN:  '61001000100',
    TITIPAN:     '20101000100',
    PAJAK:       '20501000100',
    HAPUS_BUKU:  '61201000100',
  },
  Mudharabah: {
    PIUTANG:     '13501300100',
    PENDAPATAN:  '41201300100',
    AKRU:        '13701100100',
    ADM:         '41501100100',
    PROVISI:     '41501200100',
    DENDA_TAZIR: '48001000100',
    DENDA_TAWID: '29001000100',
    CKPN:        '13801000100',
    BEBAN_CKPN:  '61001000100',
    TITIPAN:     '20101000100',
    PAJAK:       '20501000100',
    HAPUS_BUKU:  '61201000100',
  },
};

window.getCoaByKode = function(kode) {  return window.MOCK_COA.find(c => c.kode === kode);
};

// Build the GL Interface rows for a given akad — list of tx_class merged with mapping
window.buildGlInterfaceRows = function(akad, customMapping) {
  const def = (window.MOCK_GL_INTERFACE_DEFAULT[akad]) || window.MOCK_GL_INTERFACE_DEFAULT.Murabahah;
  const mapping = customMapping || def;
  return window.MOCK_TX_CLASS.map(tc => {
    const kodeGl = mapping[tc.kode] || '';
    const coa = kodeGl ? window.getCoaByKode(kodeGl) : null;
    return {
      kodeTxClass: tc.kode,
      deskripsi: tc.deskripsi,
      accountType: tc.accountType,
      wajib: tc.wajib,
      kodeGl,
      namaGl: coa?.nama || '',
    };
  });
};

/* ─────────── Parameter Global (key-value system parameters) ─────────── */
// Registry parameter sistem level institusi — dipakai engine pembiayaan
// sebagai konstanta/flag yang dapat diubah operator tanpa deploy ulang.
window.MOCK_PARAM_GLOBAL = [
  { kode: 'HOLDPRKS',     nama: 'Hold saldo dana pembayaran bagi hasil PRKS', tipe: 'Number',  nilai: '1,00',        status: true  },
  { kode: 'GRACEDENDA',   nama: 'Grace period denda keterlambatan (hari)',     tipe: 'Number',  nilai: '3',           status: true  },
  { kode: 'AUTOOTORISASI',nama: 'Auto-otorisasi transaksi di bawah limit maker',tipe: 'Boolean', nilai: 'False',       status: false },
  { kode: 'MAXLIMITTLR',  nama: 'Maksimum limit teller per transaksi',          tipe: 'Number',  nilai: '50.000.000',  status: true  },
  { kode: 'NPFTRESHOLD',  nama: 'Threshold NPF untuk early warning (%)',         tipe: 'Number',  nilai: '5,00',        status: true  },
  { kode: 'VALUTADEF',    nama: 'Valuta utama transaksi',                        tipe: 'String',  nilai: 'IDR',         status: true  },
  { kode: 'EODCUTOFF',    nama: 'Jam cut-off End of Day batch',                  tipe: 'String',  nilai: '17:00',       status: true  },
  { kode: 'CKPNAUTO',     nama: 'Posting jurnal CKPN otomatis akhir hari',       tipe: 'Boolean', nilai: 'True',        status: true  },
];

window.PARAM_TIPE_OPTIONS   = ['Number', 'String', 'Boolean', 'Date'];
window.PARAM_STATUS_OPTIONS = ['True', 'False'];
