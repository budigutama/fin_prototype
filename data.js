/* Mock data and navigation structure for the Financing prototype. */

// Rail icon → group on the sub-nav panel
window.NAV_RAILS = [
  { id: 'overview',   icon: 'home',      label: 'Beranda',         title: 'Beranda' },
  { id: 'simulasi',   icon: 'calc',      label: 'Simulasi',         title: 'Simulasi' },
  { id: 'master',     icon: 'building',  label: 'Data Master',      title: 'Data Master' },
  { id: 'pihak3',     icon: 'scale',     label: 'Data Pihak Ke Tiga', title: 'Data Pihak Ke Tiga' },
  { id: 'produk',     icon: 'sliders',   label: 'Produk Parameter', title: 'Produk Parameter' },
  { id: 'fasilitas',  icon: 'folder',    label: 'Rekening & Fasilitas', title: 'Rekening & Fasilitas' },
  { id: 'edit',       icon: 'edit',      label: 'Edit Rekening',    title: 'Edit Rekening' },
  { id: 'transaksi',  icon: 'swap',      label: 'Transaksi',        title: 'Transaksi' },
  { id: 'massal',     icon: 'upload',    label: 'Transaksi Massal', title: 'Transaksi Massal' },
  { id: 'jaminan',    icon: 'shield',    label: 'Data Jaminan',     title: 'Data Jaminan' },
  { id: 'laporan',    icon: 'finance',   label: 'Laporan',          title: 'Laporan' },
  { id: 'otorisasi',  icon: 'clipboard', label: 'Otorisasi',        title: 'Otorisasi' },
  { id: 'apbl',       icon: 'lock',      label: 'Tutup Operational APBL', title: 'Tutup Operational APBL' },
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
    { route: '/master/agency',            label: 'Data Agency' },
    { route: '/master/group-nasabah',     label: 'Group Nasabah' },
    { route: '/master/pejabat',           label: 'Data Pejabat' },
    { route: '/master/vendor',            label: 'Data Vendor' },
    { route: '/master/mitra',             label: 'Data Mitra Join Finance' },
    { route: '/master/kode-bisnis',       label: 'Data Kode Bisnis' },
    { route: '/master/jenis-aktiva',      label: 'Data Jenis Aktiva' },
    { route: '/master/biaya',             label: 'Data Biaya-Biaya' },
  ],
  pihak3: [
    { route: '/pihak3/asuransi',          label: 'Asuransi' },
    { route: '/pihak3/penjamin',          label: 'Penjamin' },
    { route: '/pihak3/notaris',           label: 'List Pekerjaan Notaris' },
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
    { route: '/edit/objek',             label: 'Objek Pembiayaan' },
  ],
  transaksi: [
    { route: '/transaksi/pembayaran-manual',    label: 'Pembayaran Manual' },
    { route: '/transaksi/pelunasan-dipercepat', label: 'Pelunasan Dipercepat' },
    { route: '/transaksi/koreksi-pembayaran',   label: 'Koreksi Pembayaran' },
    { route: '/transaksi/input-biaya',          label: 'Input Biaya-Biaya' },
    { route: '/transaksi/biaya-amortisasi',     label: 'Biaya Amortisasi' },
    { route: '/transaksi/ppid-asuransi',        label: 'BDD Asuransi' },
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
  massal: [
    { route: '/massal/input',   label: 'Input Transaksi' },
    { route: '/massal/history', label: 'History Transaksi' },
  ],
  apbl: [
    { route: '/apbl/monitoring', label: 'Monitoring Transaksi APBL' },
    { route: '/apbl/riwayat',    label: 'Riwayat Tutup Operational APBL' },
  ],
};

// Map route -> rail id (for highlighting the correct rail icon)
window.routeToRail = function(route) {
  const base = route.split('?')[0];
  if (base.startsWith('/simulasi'))                return 'simulasi';
  if (base.startsWith('/master'))                  return 'master';
  if (base.startsWith('/pihak3'))                  return 'pihak3';
  if (base.startsWith('/produk'))                  return 'produk';
  if (base.startsWith('/registrasi-fasilitas') ||
      base.startsWith('/registrasi/') ||
      base.startsWith('/list-'))                   return 'fasilitas';
  if (base.startsWith('/edit/'))                   return 'edit';
  if (base.startsWith('/transaksi/'))              return 'transaksi';
  if (base.startsWith('/massal/'))                 return 'massal';
  if (base.startsWith('/apbl/'))                   return 'apbl';
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

// Mock master data — Data Agency (instansi / developer / supplier)
window.AGENCY_JENIS_OPTIONS = ['Instansi', 'Developer', 'Supplier', 'Mitra PKE'];
window.MOCK_AGENCY = [
  { kode: '53900003', jenis: 'Instansi',  nama: 'MI NURUL HIDAYAH',            alamat: 'JL. JERUK PURUT NO. 10 CILANDAK TIMUR, PASAR MINGGU, JAKARTA SELATAN 12560', noRekEscrow: '0080201556090', namaEscrow: 'MI NURUL HIDAYAH',         plafond: 5000000000,  nomorPks: 'PKS-001/MINH/2024', jatuhTempoPks: '31/12/2026', nomorPksAdendum: '',                  plafondDipakai: 1850000000, status: 'Aktif' },
  { kode: '001',      jenis: 'Instansi',  nama: 'Kementerian Keuangan RI',     alamat: 'Jl. Lapangan Banteng Timur No. 2-4, Jakarta Pusat',                          noRekEscrow: '0080201112233', namaEscrow: 'KEMENKEU RI',            plafond: 25000000000, nomorPks: 'PKS-014/KEMENKEU/2024', jatuhTempoPks: '30/06/2027', nomorPksAdendum: 'ADD-002/KEMENKEU/2025', plafondDipakai: 12400000000, status: 'Aktif' },
  { kode: '004',      jenis: 'Instansi',  nama: 'PT Telkom Indonesia',         alamat: 'Jl. Japati No. 1, Bandung',                                                  noRekEscrow: '0080201445566', namaEscrow: 'PT TELKOM INDONESIA',    plafond: 15000000000, nomorPks: 'PKS-008/TLKM/2024',    jatuhTempoPks: '31/03/2027', nomorPksAdendum: '',                  plafondDipakai: 6750000000,  status: 'Aktif' },
  { kode: 'DV-100',   jenis: 'Developer', nama: 'PT Sinar Mas Land',           alamat: 'Sinar Mas Land Plaza, BSD City, Tangerang',                                  noRekEscrow: '0080201778899', namaEscrow: 'PT SINAR MAS LAND',      plafond: 50000000000, nomorPks: 'PKS-021/SML/2025',     jatuhTempoPks: '31/12/2028', nomorPksAdendum: '',                  plafondDipakai: 28300000000, status: 'Aktif' },
  { kode: 'DV-101',   jenis: 'Developer', nama: 'PT Ciputra Development',      alamat: 'Ciputra World 1, Jl. Prof. Dr. Satrio, Jakarta Selatan',                     noRekEscrow: '0080201990011', namaEscrow: 'PT CIPUTRA DEVELOPMENT', plafond: 40000000000, nomorPks: 'PKS-019/CTRA/2025',    jatuhTempoPks: '30/09/2028', nomorPksAdendum: 'ADD-001/CTRA/2025', plafondDipakai: 15200000000, status: 'Aktif' },
  { kode: 'SP-200',   jenis: 'Supplier',  nama: 'PT Astra International',      alamat: 'Jl. Gaya Motor Raya No. 8, Sunter, Jakarta Utara',                           noRekEscrow: '0080201223344', namaEscrow: 'PT ASTRA INTERNATIONAL', plafond: 30000000000, nomorPks: 'PKS-031/ASII/2025',    jatuhTempoPks: '30/06/2027', nomorPksAdendum: '',                  plafondDipakai: 9800000000,  status: 'Aktif' },
  { kode: 'SP-201',   jenis: 'Supplier',  nama: 'CV Mitra Karya Pratama',      alamat: 'Jl. Industri Raya No. 45, Bekasi',                                           noRekEscrow: '0080201556677', namaEscrow: 'CV MITRA KARYA PRATAMA', plafond: 8000000000,  nomorPks: 'PKS-040/MKP/2025',     jatuhTempoPks: '31/12/2026', nomorPksAdendum: '',                  plafondDipakai: 2100000000,  status: 'Tidak Aktif' },
];

window.VENDOR_JENIS_OPTIONS = ['Notaris', 'Asuransi', 'Appraisal', 'Broker Asuransi'];
window.MOCK_VENDOR = [
  { kode: '00002',      jenis: 'Notaris',   nama: 'MUHAMAD ILHAM R.P, S.H., M.Kn.',          alamat: 'Jl. Soekarno Hatta No. 12, Bandung',     pic: 'MUHAMAD ILHAM',            noRekening: '5180206028233', namaRekening: 'MUHAMAD ILHAM R.P',          bddAccount: '',           bebanPremi: '',           telp: '022-7301122',  kota: 'Bandung', status: 'Aktif' },
  { kode: '0000759590', jenis: 'Notaris',   nama: 'NOTARIS NINING PURSPITA, S.H.',           alamat: 'Jl. Asia Afrika No. 88, Bandung',        pic: 'NINING PURSPITA',          noRekening: '0080206200762', namaRekening: 'NINING PURSPITA',            bddAccount: '1321413001', bebanPremi: '5070006001', telp: '022-4231900',  kota: 'Bandung', status: 'Aktif' },
  { kode: '001001',     jenis: 'Notaris',   nama: 'MITA MIRANTI GANI, S.H., M.Kn.',          alamat: 'Jl. Diponegoro No. 21, Bandung',         pic: 'MITA MIRANTI GANI',        noRekening: '5320201030443', namaRekening: 'MITA MIRANTI GANI',          bddAccount: '',           bebanPremi: '',           telp: '022-2503311',  kota: 'Bandung', status: 'Aktif' },
  { kode: '001002',     jenis: 'Notaris',   nama: 'FAISAL SAEFUDDIN, S.H.',                  alamat: 'Jl. Merdeka No. 5, Bandung',             pic: 'FAISAL SAEFUDDIN',         noRekening: '5180201562349', namaRekening: 'FAISAL SAEFUDDIN',           bddAccount: '',           bebanPremi: '',           telp: '022-4207788',  kota: 'Bandung', status: 'Aktif' },
  { kode: '00210',      jenis: 'Notaris',   nama: 'NOTARIS/PPAT GUNAWAN WIBISANA ISKANDAR',  alamat: 'Jl. Buah Batu No. 145, Bandung',         pic: 'GUNAWAN WIBISANA ISKANDAR', noRekening: '0080201529717', namaRekening: 'GUNAWAN WIBISANA ISKANDAR',   bddAccount: '',           bebanPremi: '',           telp: '022-7322035',  kota: 'Bandung', status: 'Aktif' },
  { kode: 'ASR001',     jenis: 'Asuransi',  nama: 'PT Asuransi Takaful Keluarga',            alamat: 'Jl. Mampang Prapatan No. 100, Jakarta',  pic: 'Andi Wijaya',              noRekening: '7100201556090', namaRekening: 'PT Asuransi Takaful Keluarga', bddAccount: '2101001',    bebanPremi: '5080001',    telp: '021-7918999',  kota: 'Jakarta', status: 'Aktif' },
  { kode: 'ASR002',     jenis: 'Asuransi',  nama: 'PT Asuransi Jiwa Syariah Jasa Mitra Abadi', alamat: 'Jl. TB Simatupang No. 18, Jakarta',    pic: 'Rina Hartati',             noRekening: '7100201556091', namaRekening: 'PT AJS Jasa Mitra Abadi',    bddAccount: '2101002',    bebanPremi: '5080002',    telp: '021-29406677', kota: 'Jakarta', status: 'Aktif' },
  { kode: 'ASR003',     jenis: 'Asuransi',  nama: 'PT Asuransi Sinarmas Syariah',            alamat: 'Jl. Fachrudin No. 18, Jakarta Pusat',    pic: 'Budi Santoso',             noRekening: '7100201556092', namaRekening: 'PT Asuransi Sinarmas Syariah', bddAccount: '',          bebanPremi: '',           telp: '021-3859000',  kota: 'Jakarta', status: 'Tidak Aktif' },
  { kode: 'APR001',     jenis: 'Appraisal', nama: 'KJPP Suwendho Rinaldy & Rekan',           alamat: 'Jl. Gatot Subroto No. 22, Jakarta',      pic: 'Suwendho Rinaldy',         noRekening: '5420251515697', namaRekening: 'KJPP Suwendho Rinaldy',      bddAccount: '',           bebanPremi: '',           telp: '021-5253456',  kota: 'Jakarta', status: 'Aktif' },
  { kode: 'APR002',     jenis: 'Appraisal', nama: 'KJPP Iskandar & Rekan',                   alamat: 'Jl. Pasteur No. 9, Bandung',             pic: 'Iskandar',                 noRekening: '5310201529819', namaRekening: 'KJPP Iskandar & Rekan',      bddAccount: '',           bebanPremi: '',           telp: '022-2031900',  kota: 'Bandung', status: 'Aktif' },
  { kode: 'APR003',     jenis: 'Appraisal', nama: 'KJPP Felix Sutandar & Rekan',             alamat: 'Jl. Jend. Sudirman No. 45, Jakarta',     pic: 'Felix Sutandar',           noRekening: '5040201525178', namaRekening: 'KJPP Felix Sutandar',        bddAccount: '',           bebanPremi: '',           telp: '021-5701234',  kota: 'Jakarta', status: 'Aktif' },
];

/* ─────────── Data Pihak Ke Tiga · Asuransi ───────────
   Asuransi atas JIWA (debitur) dan atas JAMINAN (agunan). Satu baris = satu polis. */
window.ASURANSI_JAMINAN_UNTUK   = ['Jiwa', 'Jaminan'];
window.ASURANSI_JENIS_OPTIONS   = ['Kebakaran', 'Asuransi Kredit', 'Jiwa', 'Kendaraan', 'Gempa Bumi', 'Banjir'];
window.ASURANSI_STATUS_OPTIONS  = ['Pengajuan', 'Akseptasi', 'Aktif', 'Jatuh Tempo', 'Ditolak'];
window.ASURANSI_BAYAR_OPTIONS   = ['Sudah Bayar', 'Belum Bayar'];
window.ASURANSI_PRODUK_OPTIONS  = ['Reguler', 'Sindikasi', 'Co-Insurance'];
window.ASURANSI_JAMINAN_JENIS   = ['Property', 'Kendaraan', 'Tanah', 'Mesin', 'Persediaan'];
window.ASURANSI_PERUSAHAAN      = [
  'PT. Asuransi Askrida Syariah', 'PT. Jamkrida Jabar', 'PT. Penjaminan Kredit Daerah',
  'PT Asuransi Takaful Keluarga', 'PT Asuransi Jasindo Syariah', 'PT Asuransi Sinarmas Syariah',
];
window.ASURANSI_MASKAPAI        = ['Reasuransi Nasional', 'Reasuransi Internasional', '-'];
window.ASURANSI_YN              = ['Ya', 'Tidak'];
window.ASURANSI_COVER_OPTIONS   = ['Jiwa', 'PHK', 'Macet', 'Jiwa, PHK & Macet', 'Kebakaran', 'All Risk'];
window.ASURANSI_CABANG_OPTIONS  = ['545', '008', '508', '531', '513', '001'];

/* ─────────── Data Pihak Ke Tiga · Penjamin (guarantor) ─────────── */
window.PENJAMIN_JENIS_OPTIONS    = ['Personal Guarantee', 'Corporate Guarantee', 'Perusahaan Penjamin Kredit'];
window.PENJAMIN_IDENTITAS_OPTIONS = ['KTP', 'Passport', 'NPWP', 'Lainnya'];
window.PENJAMIN_GOLONGAN_OPTIONS = [
  { kode: 'S14', nama: 'Perorangan' },
  { kode: 'S15', nama: 'Perusahaan Swasta' },
  { kode: 'S16', nama: 'BUMN / BUMD' },
  { kode: 'S17', nama: 'Lembaga Penjamin' },
];
window.MOCK_PENJAMIN = [
  { id: 1, noRekening: '0001250803', nasabah: 'MUHAMMAD RAMLI SETIAWAN', cabang: '000', cabangNama: 'KANTOR PUSAT BJB SYARIAH', jenis: 'Corporate Guarantee', jenisIdentitas: 'NPWP', noIdentitas: '71227393702700', namaIdentitas: '71227393702700', namaLengkap: 'PT PENJAMINAN JAMKRINDO SYARIAH', golongan: 'S17', golonganNama: 'Lembaga Penjamin', persentase: 70, nilai: 23100000, akta: 'KIB-1747334317-CZ550', alamat: 'JL. LETNAN JENDERAL SUPRAPTO NO 20', kecamatan: 'CEMPAKA PUTIH', kelurahan: 'CEMPAKA PUTIH', kodePos: '10510', datiII: '0391', datiIINama: 'JAKARTA PUSAT, WIL. KOTA' },
  { id: 2, noRekening: '0001260915', nasabah: 'SITI AMINAH', cabang: '545', cabangNama: 'KC BANDUNG', jenis: 'Personal Guarantee', jenisIdentitas: 'KTP', noIdentitas: '3273014505800002', namaIdentitas: 'BUDI HARTONO', namaLengkap: 'BUDI HARTONO', golongan: 'S14', golonganNama: 'Perorangan', persentase: 100, nilai: 150000000, akta: 'PG-2025-0451', alamat: 'JL. ASIA AFRIKA NO 88', kecamatan: 'SUMUR BANDUNG', kelurahan: 'BRAGA', kodePos: '40111', datiII: '0271', datiIINama: 'KOTA BANDUNG' },
  { id: 3, noRekening: '0001271022', nasabah: 'PT MAJU BERSAMA', cabang: '008', cabangNama: 'KC JAKARTA', jenis: 'Corporate Guarantee', jenisIdentitas: 'NPWP', noIdentitas: '021345678901000', namaIdentitas: 'PT SENTOSA ABADI', namaLengkap: 'PT SENTOSA ABADI MAKMUR', golongan: 'S15', golonganNama: 'Perusahaan Swasta', persentase: 50, nilai: 500000000, akta: 'CG-2025-1180', alamat: 'JL. JEND SUDIRMAN KAV 21', kecamatan: 'SETIABUDI', kelurahan: 'KARET', kodePos: '12920', datiII: '0391', datiIINama: 'JAKARTA SELATAN, WIL. KOTA' },
  { id: 4, noRekening: '0001288134', nasabah: 'KOPERASI SEJAHTERA', cabang: '513', cabangNama: 'KC BOGOR', jenis: 'Perusahaan Penjamin Kredit', jenisIdentitas: 'NPWP', noIdentitas: '015678901234000', namaIdentitas: 'PT JAMKRIDA JABAR', namaLengkap: 'PT JAMKRIDA JABAR', golongan: 'S17', golonganNama: 'Lembaga Penjamin', persentase: 80, nilai: 320000000, akta: 'PPK-2025-0067', alamat: 'JL. RE MARTADINATA NO 156', kecamatan: 'BOGOR TENGAH', kelurahan: 'PABATON', kodePos: '16121', datiII: '0201', datiIINama: 'KOTA BOGOR' },
];

window.MOCK_ASURANSI = [
  { id: 1, jaminanUntuk: 'Jaminan', noPolis: '122110102200144', perusahaan: 'PT. Asuransi Askrida Syariah', noRekening: '000057674600001', nasabah: 'ALEX RUMPOKO',                jenisJaminan: 'Property', jenisProduk: 'Reguler', jenisAsuransi: 'Kebakaran',      statusAsuransi: 'Akseptasi', cabang: '545', cabangNama: 'KC BANDUNG',      nilaiTanggungan: 125000000, biaya: 271903,    bankerClause: 'Tidak', alihSyariah: 'Tidak', tglTerbit: '13/04/2022', tglJatuhTempo: '13/04/2032', statusBayar: 'Sudah Bayar', remark: 'Kebakaran bangunan ruko', cover: 'Kebakaran' },
  { id: 2, jaminanUntuk: 'Jaminan', noPolis: '',                 perusahaan: 'PT. Jamkrida Jabar',            noRekening: '000120078000001', nasabah: 'GANESHA BANGUN KIRANA',      jenisJaminan: 'Property', jenisProduk: 'Reguler', jenisAsuransi: 'Asuransi Kredit', statusAsuransi: 'Pengajuan', cabang: '008', cabangNama: 'KC JAKARTA',      nilaiTanggungan: 442000000, biaya: 3094000,   bankerClause: 'Tidak', alihSyariah: 'Tidak', tglTerbit: '',           tglJatuhTempo: '',           statusBayar: 'Belum Bayar', remark: 'Penjaminan kredit',       cover: 'Macet' },
  { id: 3, jaminanUntuk: 'Jaminan', noPolis: '',                 perusahaan: 'PT. Asuransi Askrida Syariah', noRekening: '000123896800001', nasabah: 'LUEKY ADITIA SUHERMAN',      jenisJaminan: 'Property', jenisProduk: 'Reguler', jenisAsuransi: 'Kebakaran',      statusAsuransi: 'Pengajuan', cabang: '508', cabangNama: 'KC BEKASI',       nilaiTanggungan: 160000000, biaya: 745600,    bankerClause: 'Tidak', alihSyariah: 'Tidak', tglTerbit: '',           tglJatuhTempo: '',           statusBayar: 'Belum Bayar', remark: '',                       cover: 'Kebakaran' },
  { id: 4, jaminanUntuk: 'Jaminan', noPolis: '',                 perusahaan: 'PT. Asuransi Askrida Syariah', noRekening: '000124879100001', nasabah: 'SELLVY PEBRIANTI AYU GASWA', jenisJaminan: 'Property', jenisProduk: 'Reguler', jenisAsuransi: 'Kebakaran',      statusAsuransi: 'Pengajuan', cabang: '531', cabangNama: 'KC CIMAHI',       nilaiTanggungan: 157700000, biaya: 503638,    bankerClause: 'Tidak', alihSyariah: 'Tidak', tglTerbit: '',           tglJatuhTempo: '',           statusBayar: 'Sudah Bayar', remark: '',                       cover: 'Kebakaran' },
  { id: 5, jaminanUntuk: 'Jaminan', noPolis: '513-2025-0099',    perusahaan: 'PT. Penjaminan Kredit Daerah', noRekening: '000125301000001', nasabah: 'HANNA NURFARIDAH',           jenisJaminan: 'Property', jenisProduk: 'Reguler', jenisAsuransi: 'Kebakaran',      statusAsuransi: 'Pengajuan', cabang: '513', cabangNama: 'KC BOGOR',        nilaiTanggungan: 350000000, biaya: 25415456.64, bankerClause: 'Ya',  alihSyariah: 'Tidak', tglTerbit: '',           tglJatuhTempo: '',           statusBayar: 'Sudah Bayar', remark: 'Banker clause aktif',    cover: 'All Risk' },
  { id: 6, jaminanUntuk: 'Jaminan', noPolis: '',                 perusahaan: 'PT. Asuransi Askrida Syariah', noRekening: '000126015400001', nasabah: 'EDI JUNAEDI',                jenisJaminan: 'Property', jenisProduk: 'Reguler', jenisAsuransi: 'Kebakaran',      statusAsuransi: 'Pengajuan', cabang: '513', cabangNama: 'KC BOGOR',        nilaiTanggungan: 157700000, biaya: 735457,    bankerClause: 'Tidak', alihSyariah: 'Tidak', tglTerbit: '',           tglJatuhTempo: '',           statusBayar: 'Sudah Bayar', remark: '',                       cover: 'Kebakaran' },
  { id: 7, jaminanUntuk: 'Jaminan', noPolis: '',                 perusahaan: 'PT. Asuransi Askrida Syariah', noRekening: '000126149300001', nasabah: 'DEDI SARIPUDIN',             jenisJaminan: 'Property', jenisProduk: 'Reguler', jenisAsuransi: 'Kebakaran',      statusAsuransi: 'Pengajuan', cabang: '513', cabangNama: 'KC BOGOR',        nilaiTanggungan: 157700000, biaya: 967276,    bankerClause: 'Tidak', alihSyariah: 'Tidak', tglTerbit: '',           tglJatuhTempo: '',           statusBayar: 'Sudah Bayar', remark: '',                       cover: 'Kebakaran' },
  { id: 8, jaminanUntuk: 'Jiwa',    noPolis: '122110102200144',  perusahaan: 'PT Asuransi Takaful Keluarga', noRekening: '001050203657900', nasabah: 'GUNAWAN',                    jenisJaminan: '-',        jenisProduk: 'Reguler', jenisAsuransi: 'Jiwa',           statusAsuransi: 'Akseptasi', cabang: '001', cabangNama: 'KC BANDUNG',      nilaiTanggungan: 274500000, biaya: 1850000,   bankerClause: 'Ya',    alihSyariah: 'Tidak', tglTerbit: '02/05/2024', tglJatuhTempo: '02/05/2030', statusBayar: 'Sudah Bayar', remark: 'Jiwa, PHK & Macet',      cover: 'Jiwa, PHK & Macet' },
  { id: 9, jaminanUntuk: 'Jiwa',    noPolis: 'TKF-2025-3321',    perusahaan: 'PT Asuransi Takaful Keluarga', noRekening: '000118923400001', nasabah: 'SITI NURHALIZA',             jenisJaminan: '-',        jenisProduk: 'Reguler', jenisAsuransi: 'Jiwa',           statusAsuransi: 'Aktif',     cabang: '508', cabangNama: 'KC BEKASI',       nilaiTanggungan: 500000000, biaya: 4250000,   bankerClause: 'Tidak', alihSyariah: 'Ya',    tglTerbit: '15/01/2025', tglJatuhTempo: '15/01/2030', statusBayar: 'Sudah Bayar', remark: 'Asuransi jiwa debitur',  cover: 'Jiwa' },
  { id: 10, jaminanUntuk: 'Jiwa',   noPolis: '',                 perusahaan: 'PT Asuransi Takaful Keluarga', noRekening: '000119556700001', nasabah: 'AHMAD FAUZI RAHMAN',         jenisJaminan: '-',        jenisProduk: 'Reguler', jenisAsuransi: 'Jiwa',           statusAsuransi: 'Pengajuan', cabang: '545', cabangNama: 'KC BANDUNG',      nilaiTanggungan: 180000000, biaya: 1320000,   bankerClause: 'Tidak', alihSyariah: 'Tidak', tglTerbit: '',           tglJatuhTempo: '',           statusBayar: 'Belum Bayar', remark: '',                       cover: 'Jiwa, PHK & Macet' },
];

// List pekerjaan notaris — covernote pengikatan akad & agunan
window.NOTARIS_DOKUMEN_OPTIONS   = ['Akta Pengikatan', 'Akta Pembiayaan'];
window.NOTARIS_COVERNOTE_OPTIONS = ['Baru', 'Perpanjangan'];
window.NOTARIS_PEKERJAAN_OPTIONS = ['Belum Selesai', 'Selesai'];
window.MOCK_PEKERJAAN_NOTARIS = [
  { id: 1, kodeNotaris: '00002',  notaris: 'MUHAMAD ILHAM R.P',                  noRekening: '5330516000347', nasabah: 'MUHAMAD ILHAM R.P',          jenisDokumen: 'Akta Pengikatan', detailDokumen: '2', telpNotaris: '085223077050', alamatNotaris: 'KAWASAN RUKO BLOK R. 13 JANATI', noCoverNote: '1358/N-MIRP/X/2024', tglCoverNote: '30/10/2024', tglJatuhTempoCN: '30/04/2025', statusCoverNote: 'Baru',          perpanjanganKe: '',  tglCNPerpanjangan: '', statusPekerjaan: 'Belum Selesai', kendala: 'TIDAK ADA KENDALA', progres: 'DALAM PROSES SKMHT' },
  { id: 2, kodeNotaris: '0000759590', notaris: 'NOTARIS NINING PURSPITA, S.H.',      noRekening: '0080206200762', nasabah: 'SITI NURHALIZA PRATIWI',     jenisDokumen: 'Akta Pembiayaan', detailDokumen: '1', telpNotaris: '022-4231900',  alamatNotaris: 'JL. ASIA AFRIKA NO. 88, BANDUNG', noCoverNote: '0451/NP/V/2026',     tglCoverNote: '05/06/2026', tglJatuhTempoCN: '05/12/2026', statusCoverNote: 'Baru',          perpanjanganKe: '',  tglCNPerpanjangan: '', statusPekerjaan: 'Belum Selesai', kendala: 'MENUNGGU APHT',     progres: 'PROSES PENGIKATAN APHT' },
  { id: 3, kodeNotaris: '001001', notaris: 'MITA MIRANTI GANI, S.H., M.Kn.',     noRekening: '5320201030443', nasabah: 'PT MAJU BERSAMA SEJAHTERA',  jenisDokumen: 'Akta Pengikatan', detailDokumen: '3', telpNotaris: '022-2503311',  alamatNotaris: 'JL. DIPONEGORO NO. 21, BANDUNG', noCoverNote: '0388/MMG/V/2026',    tglCoverNote: '07/06/2026', tglJatuhTempoCN: '07/12/2026', statusCoverNote: 'Perpanjangan', perpanjanganKe: '1', tglCNPerpanjangan: '07/06/2026', statusPekerjaan: 'Belum Selesai', kendala: 'TIDAK ADA KENDALA', progres: 'PROSES FIDUSIA' },
  { id: 4, kodeNotaris: '001002', notaris: 'FAISAL SAEFUDDIN, S.H.',             noRekening: '5180201562349', nasabah: 'BUDI SANTOSO WIBOWO',       jenisDokumen: 'Akta Pembiayaan', detailDokumen: '1', telpNotaris: '022-4207788',  alamatNotaris: 'JL. MERDEKA NO. 5, BANDUNG',     noCoverNote: '0102/FS/VI/2026',    tglCoverNote: '10/06/2026', tglJatuhTempoCN: '10/12/2026', statusCoverNote: 'Baru',          perpanjanganKe: '',  tglCNPerpanjangan: '', statusPekerjaan: 'Belum Selesai', kendala: 'KELENGKAPAN DATA',  progres: 'PROSES SKMHT' },
  { id: 5, kodeNotaris: '00210',  notaris: 'NOTARIS/PPAT GUNAWAN WIBISANA ISKANDAR', noRekening: '0080201529717', nasabah: 'HERI TAPIHERU',             jenisDokumen: 'Akta Pengikatan', detailDokumen: '2', telpNotaris: '022-7322035',  alamatNotaris: 'JL. BUAH BATU NO. 145, BANDUNG', noCoverNote: '1201/GWI/VI/2026',   tglCoverNote: '03/06/2026', tglJatuhTempoCN: '03/12/2026', statusCoverNote: 'Baru',          perpanjanganKe: '',  tglCNPerpanjangan: '', statusPekerjaan: 'Selesai',       kendala: 'TIDAK ADA KENDALA', progres: 'AKTA SELESAI DITERBITKAN' },
  { id: 6, kodeNotaris: '001001', notaris: 'MITA MIRANTI GANI, S.H., M.Kn.',     noRekening: '5320201998877', nasabah: 'CV KARYA MANDIRI ABADI',    jenisDokumen: 'Akta Pembiayaan', detailDokumen: '1', telpNotaris: '022-2503311',  alamatNotaris: 'JL. DIPONEGORO NO. 21, BANDUNG', noCoverNote: '0301/MMG/V/2026',    tglCoverNote: '28/05/2026', tglJatuhTempoCN: '28/11/2026', statusCoverNote: 'Perpanjangan', perpanjanganKe: '2', tglCNPerpanjangan: '28/05/2026', statusPekerjaan: 'Selesai',       kendala: 'TIDAK ADA KENDALA', progres: 'CESSIE SELESAI' },
  { id: 7, kodeNotaris: '001002', notaris: 'FAISAL SAEFUDDIN, S.H.',             noRekening: '5180201445566', nasabah: 'AHMAD FAUZI RAHMAN',        jenisDokumen: 'Akta Pengikatan', detailDokumen: '1', telpNotaris: '022-4207788',  alamatNotaris: 'JL. MERDEKA NO. 5, BANDUNG',     noCoverNote: '0098/FS/V/2026',     tglCoverNote: '22/05/2026', tglJatuhTempoCN: '22/11/2026', statusCoverNote: 'Baru',          perpanjanganKe: '',  tglCNPerpanjangan: '', statusPekerjaan: 'Selesai',       kendala: 'TIDAK ADA KENDALA', progres: 'ROYA SELESAI' },
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
  { kode: '11000', deskripsi: 'Titipan Angsuran Murabahah',            accountType: 'Liability',       wajib: true,  defaultGl: '2110518001', namaGl: 'Titipan Piutang & Pembiayaan' },
  { kode: '11001', deskripsi: 'Outstanding Murabahah',                 accountType: 'Asset',           wajib: true,  defaultGl: '1040003',    namaGl: 'Piutang Murabahah - Investasi' },
  { kode: '11002', deskripsi: 'Margin Murabahah Ditangguhkan',         accountType: 'Asset',           wajib: true,  defaultGl: '1049903001', namaGl: 'PMYD-Murabahah Investasi' },
  { kode: '11003', deskripsi: 'Pendapatan Murabahah',                  accountType: 'Income',          wajib: true,  defaultGl: '4000003001', namaGl: 'Pdpt Margin - Murabahah Investasi' },
  { kode: '11004', deskripsi: 'PYAD Murabahah',                        accountType: 'Asset',           wajib: false, defaultGl: '1310105001', namaGl: 'PYAD Margin Mrb Investasi' },
  { kode: '11005', deskripsi: 'Mukasah Murabahah',                     accountType: 'Income',          wajib: false, defaultGl: '4000003001', namaGl: 'Pdpt Margin - Murabahah Investasi' },
  { kode: '11006', deskripsi: 'Margin Murabahah Dalam Penyelesaian',   accountType: 'OffBalanceSheet', wajib: false, defaultGl: '7130721001', namaGl: 'PMDP Mrb Inv' },
  { kode: '11007', deskripsi: 'Write off Murabahah (Pokok)',          accountType: 'OffBalanceSheet', wajib: false, defaultGl: '7150201001', namaGl: 'APH - Piutang Murabahah' },
  { kode: '11008', deskripsi: 'CKPN Individual Murabahah',             accountType: 'Asset',           wajib: false, defaultGl: '1180108001', namaGl: 'CKPN Individual - Piutang Murabahah - Saldo Awal' },
  { kode: '11009', deskripsi: 'Beban CKPN Kolektif Murabahah',         accountType: 'Expense',         wajib: false, defaultGl: '5300003001', namaGl: 'Biaya PPAP Umum Piutang Murabahah O()' },
  { kode: '11010', deskripsi: 'Piutang JT Murabahah',                  accountType: 'Asset',           wajib: false, defaultGl: '1040003',    namaGl: 'Piutang Murabahah - Investasi' },
  { kode: '11011', deskripsi: 'Persediaan Murabahah',                  accountType: 'Asset',           wajib: false, defaultGl: '1100001001', namaGl: 'Persediaan Murabahah' },
  { kode: '11012', deskripsi: 'pdpt. PYAD Murabahah',                  accountType: 'Income',          wajib: false, defaultGl: '4000003004', namaGl: 'Pdpt Margin - Murabahah Investasi - Accrue' },
  { kode: '11014', deskripsi: 'CKPN Kolektif Murabahah',               accountType: 'Asset',           wajib: false, defaultGl: '1180108001', namaGl: 'CKPN Kolektif- Piutang Murabahah - Saldo Awal' },
  { kode: '11015', deskripsi: 'CKPN Individual Adjustment Murabahah',  accountType: 'Asset',           wajib: false, defaultGl: '1180108001', namaGl: 'CKPN Individual - Piutang Murabahah - Saldo Awal' },
  { kode: '11016', deskripsi: 'Uang Muka Kepada Pemasok Murabahah',    accountType: 'Liability',       wajib: false, defaultGl: '2090101001', namaGl: 'Uang muka murabahah urbun() dari pembeli' },
  { kode: '11018', deskripsi: 'CKPN Kolektif Adjustment Murabahah',    accountType: 'Asset',           wajib: false, defaultGl: '1180108001', namaGl: 'CKPN Individual - Piutang Murabahah - Saldo Awal' },
  { kode: '11019', deskripsi: 'Beban CKPN Individual',                 accountType: 'Expense',         wajib: false, defaultGl: '5300003001', namaGl: 'Biaya PPAP Umum Piutang Murabahah O()' },
  { kode: '11024', deskripsi: 'PYAD Atribusi',                         accountType: 'Asset',           wajib: false, defaultGl: '1310105003', namaGl: 'PYAD Margin Mrb Investasi Atribusi' },
  { kode: '11025', deskripsi: 'PMDP Atribusi',                         accountType: 'OffBalanceSheet', wajib: false, defaultGl: '7130721001', namaGl: 'PMDP Mrb Inv Atribusi' },
  { kode: '11028', deskripsi: 'Pendapatan reverse CKPN Kolektif',      accountType: 'Income',          wajib: false, defaultGl: '4240001032', namaGl: 'Koreksi PPAP Umum - Piutang Murabahah' },
  { kode: '11029', deskripsi: 'Pendapatan reverse CKPN Individual',    accountType: 'Income',          wajib: false, defaultGl: '4240001032', namaGl: 'Koreksi PPAP Umum - Piutang Murabahah' },
  { kode: '11032', deskripsi: 'MMD Jatuh Tempo',                       accountType: 'Asset',           wajib: false, defaultGl: '1049903001', namaGl: 'PMYD-Murabahah Investasi' },
  { kode: '11033', deskripsi: 'PMYD Attribusi',                        accountType: 'Asset',           wajib: false, defaultGl: '1049903001', namaGl: 'PMYD-Mrb Inv Atribusi' },
  { kode: '11041', deskripsi: 'AYDA-aktiva',                           accountType: 'Asset',           wajib: false, defaultGl: '1310301001', namaGl: 'Agunan yang diambil alih' },
  { kode: '11042', deskripsi: 'AYDA-cadangan',                         accountType: 'Asset',           wajib: false, defaultGl: '1310302001', namaGl: 'PPA - Agunan Yang Diambil Alih - Saldo Awal' },
  { kode: '11043', deskripsi: 'AYDA-by cadangan',                      accountType: 'Expense',         wajib: false, defaultGl: '5390003001', namaGl: 'Bi PPA Khusus - Agunan yg diambil alih' },
  { kode: '11044', deskripsi: 'Rugi Penjualan AYDA',                   accountType: 'Expense',         wajib: false, defaultGl: '5420004001', namaGl: 'Kerugian Penjualan AYDA' },
  { kode: '11045', deskripsi: 'Laba Penjualan AYDA',                   accountType: 'Income',          wajib: false, defaultGl: '4270002001', namaGl: 'Keuntungan Penjualan AYDA' },
  { kode: '11061', deskripsi: 'Denda-Tawidh',                          accountType: 'Liability',       wajib: false, defaultGl: '2090725001', namaGl: 'Titipan Dana Kebajikan - Denda' },
  { kode: '11062', deskripsi: 'Denda-Tazir',                           accountType: 'Liability',       wajib: false, defaultGl: '2090725001', namaGl: 'Titipan Dana Kebajikan - Denda' },
  { kode: '11070', deskripsi: 'Write Off Murabahah (Margin)',         accountType: 'OffBalanceSheet', wajib: false, defaultGl: '7320703001', namaGl: 'PMDP PHB - Piutang' },
  { kode: '11080', deskripsi: 'Penambahan/Pengurangan CKPN',          accountType: 'Asset',           wajib: false, defaultGl: '1180108002', namaGl: 'CKPN Kolektif - Piutang Murabahah - Penambahan/Pengurangan' },
  { kode: '11081', deskripsi: 'Pendapatan Margin Hapus Buku',          accountType: 'Income',          wajib: false, defaultGl: '4310006001', namaGl: 'Pdpt margin hapus buku PMHB() - piutang' },
  { kode: '11082', deskripsi: 'Ganti Rugi Asuransi',                   accountType: 'Liability',       wajib: false, defaultGl: '1321417001', namaGl: 'Perantara Ganti Rugi Asuransi' },
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

/* ─────────── Data Mitra Join Finance (sindikasi / pembiayaan bersama) ─────────── */
window.MOCK_MITRA_JF = [
  { kodeMitra: 'JF-001', namaMitra: 'PT Bank Syariah Indonesia',         kodeProduk: 'M-001', glPembayaranKode: '11001000010', glTitipanMarginKode: '20101000100', glTitipanPokokKode: '20101000100', porsiModal: 70, eqvRate: 11.5 },
  { kodeMitra: 'JF-002', namaMitra: 'PT Bank Muamalat Indonesia',        kodeProduk: 'M-002', glPembayaranKode: '11001000010', glTitipanMarginKode: '20101000100', glTitipanPokokKode: '20101000100', porsiModal: 60, eqvRate: 10.75 },
  { kodeMitra: 'JF-003', namaMitra: 'PT BPRS Amanah Ummah',              kodeProduk: 'M-001', glPembayaranKode: '11001000010', glTitipanMarginKode: '29001000100', glTitipanPokokKode: '20101000100', porsiModal: 50, eqvRate: 12.0 },
  { kodeMitra: 'JF-004', namaMitra: 'PT Permodalan Nasional Madani',     kodeProduk: 'M-003', glPembayaranKode: '11001000010', glTitipanMarginKode: '20101000100', glTitipanPokokKode: '29101000100', porsiModal: 40, eqvRate: 13.25 },
  { kodeMitra: 'JF-005', namaMitra: 'PT Bank Jabar Banten Syariah',      kodeProduk: 'M-002', glPembayaranKode: '11001000010', glTitipanMarginKode: '20101000100', glTitipanPokokKode: '20101000100', porsiModal: 65, eqvRate: 11.0 },
  { kodeMitra: 'JF-006', namaMitra: 'PT Mega Central Finance Syariah',   kodeProduk: 'M-001', glPembayaranKode: '11001000010', glTitipanMarginKode: '29001000100', glTitipanPokokKode: '29101000100', porsiModal: 55, eqvRate: 12.5 },
];

/* ─────────── Data Kode Bisnis (business code + akad/segmen mapping — master-detail) ─────────── */
window.KODE_BISNIS_EMAS_OPTIONS = ['Tidak', 'Ya'];

// Lookup: produk (kode_bisnis_akad.product_code → nama)
window.MOCK_KODE_PRODUK = [
  { kode: '1103', nama: 'TAKE OVER' },
  { kode: '0505', nama: 'MURABAHAH MODAL KERJA CHANNELING' },
  { kode: '0906', nama: 'Mudharabah Channeling' },
  { kode: '0908', nama: 'Musyarakah Channeling' },
  { kode: '0101', nama: 'Murabahah Konsumtif' },
  { kode: '0202', nama: 'Murabahah Investasi' },
  { kode: '0707', nama: 'Ijarah Multijasa' },
  { kode: '1201', nama: 'Gadai Emas iB' },
];

// Lookup: jenis produk (kode_bisnis_type.product_type — integer)
window.MOCK_JENIS_PRODUK = [
  { kode: 10, nama: 'Investasi' },
  { kode: 20, nama: 'Modal Kerja' },
  { kode: 30, nama: 'Konsumtif' },
  { kode: 40, nama: 'Multiguna' },
];

// Lookup: segmen (kode_bisnis_type.ref_segment — integer)
window.MOCK_SEGMEN_BISNIS = [
  { kode: 11, nama: 'Kecil' },
  { kode: 12, nama: 'Menengah' },
  { kode: 13, nama: 'Mikro' },
  { kode: 14, nama: 'Korporasi' },
];

// Master kode_bisnis_data + detail (akad = Map Produk, type = Map Segmen)
window.MOCK_KODE_BISNIS = [
  { kodeBisnis: '101', deskripsi: 'Modal Kerja',                                isEmas: 'Tidak', akad: [], type: [] },
  { kodeBisnis: '102', deskripsi: 'Investasi',                                  isEmas: 'Tidak', akad: [], type: [] },
  { kodeBisnis: '103', deskripsi: 'Konstruksi / Jasa Pemborongan',             isEmas: 'Tidak', akad: [], type: [] },
  { kodeBisnis: '104', deskripsi: 'Pembiayaan Koperasi Karyawan',              isEmas: 'Tidak', akad: [], type: [] },
  { kodeBisnis: '105', deskripsi: 'BPRS CHANELLING',                           isEmas: 'Tidak',
    akad: [
      { kodeProduk: '1103', namaProduk: 'TAKE OVER' },
      { kodeProduk: '0505', namaProduk: 'MURABAHAH MODAL KERJA CHANNELING' },
      { kodeProduk: '0906', namaProduk: 'Mudharabah Channeling' },
      { kodeProduk: '0908', namaProduk: 'Musyarakah Channeling' },
    ],
    type: [
      { jenisProduk: 20, jenisProdukNama: 'Modal Kerja', segmen: 11, segmenNama: 'Kecil' },
    ] },
  { kodeBisnis: '106', deskripsi: 'BPRS Executing',                            isEmas: 'Tidak', akad: [], type: [] },
  { kodeBisnis: '107', deskripsi: 'Pembiayaan Channeling BMT',                 isEmas: 'Tidak', akad: [], type: [] },
  { kodeBisnis: '108', deskripsi: 'KJKS/BMT EXECUTING',                        isEmas: 'Tidak', akad: [], type: [] },
  { kodeBisnis: '109', deskripsi: 'Multifinance Chaneling Konsumtif',         isEmas: 'Tidak', akad: [], type: [] },
  { kodeBisnis: '110', deskripsi: 'Multifinance Executing',                    isEmas: 'Tidak', akad: [], type: [] },
  { kodeBisnis: '111', deskripsi: 'Multifinance Joint Financing',             isEmas: 'Tidak', akad: [], type: [] },
  { kodeBisnis: '112', deskripsi: 'Sindikasi',                                 isEmas: 'Tidak', akad: [], type: [] },
  { kodeBisnis: '113', deskripsi: 'Club Deal',                                 isEmas: 'Tidak', akad: [], type: [] },
  { kodeBisnis: '114', deskripsi: 'Distributor Chain',                         isEmas: 'Tidak', akad: [], type: [] },
  { kodeBisnis: '115', deskripsi: 'SERAMBI BJBS - Artdeco Sejahtera Abadi',    isEmas: 'Tidak', akad: [], type: [] },
  { kodeBisnis: '116', deskripsi: 'Pembiayaan Pemilikan Rumah',                isEmas: 'Tidak', akad: [], type: [] },
  { kodeBisnis: '117', deskripsi: 'Pembiayaan Pemilikan Kendaraan Bermotor (PPKB)', isEmas: 'Tidak', akad: [], type: [] },
  { kodeBisnis: '118', deskripsi: 'Pembiayaan Multiguna Konsumer',             isEmas: 'Tidak', akad: [], type: [] },
  { kodeBisnis: '119', deskripsi: 'Pembiayaan Kesejahteraan Pegawai (PKP) LPI', isEmas: 'Tidak', akad: [], type: [] },
  { kodeBisnis: '120', deskripsi: 'Mitra Emas iB Maslahah',                    isEmas: 'Ya',    akad: [], type: [] },
];

/* ─────────── Data Pejabat (officer / pejabat penandatangan per cabang) ─────────── */
window.MOCK_CABANG = [
  { kode: '001', nama: 'KANTOR PUSAT' },
  { kode: '002', nama: 'KANTOR CABANG BANDUNG' },
  { kode: '005', nama: 'BANDUNG ASIA AFRIKA' },
  { kode: '012', nama: 'KELAPA GADING' },
  { kode: '023', nama: 'SURABAYA TUNJUNGAN' },
  { kode: '034', nama: 'YOGYA MALIOBORO' },
];

window.MOCK_PEJABAT_USER = [
  { kode: 'S0233', nama: 'Dhani Adrian Muharam' },
  { kode: 'S0188', nama: 'Teguh Priyono' },
  { kode: 'S0091', nama: 'Hilman Trimansyah' },
  { kode: 'S0312', nama: 'Rina Wulandari' },
  { kode: 'S0405', nama: 'Ahmad Fauzi Rahman' },
  { kode: 'S0277', nama: 'Siti Nurhaliza Pratiwi' },
];

window.MOCK_PEJABAT = [
  { id: 1, cabangKode: '002', cabangNama: 'KANTOR CABANG BANDUNG', nama: 'DHANI ADRIAN MUHARAM',   nomorSK: '024/SK/DIR-DSD/2026', jabatan: 'PLT PEMIMPIN CABANG',        userId: 'S0233', userNama: 'Dhani Adrian Muharam',    cetak: false },
  { id: 2, cabangKode: '001', cabangNama: 'KANTOR PUSAT',          nama: 'TEGUH PRIYONO',          nomorSK: '008/SK/DIR-DSD/2025', jabatan: 'KEPALA DIVISI PEMBIAYAAN',   userId: 'S0188', userNama: 'Teguh Priyono',          cetak: true  },
  { id: 3, cabangKode: '005', cabangNama: 'BANDUNG ASIA AFRIKA',   nama: 'HILMAN TRIMANSYAH',      nomorSK: '015/SK/DIR-DSD/2025', jabatan: 'PEMIMPIN CABANG',            userId: 'S0091', userNama: 'Hilman Trimansyah',      cetak: true  },
  { id: 4, cabangKode: '012', cabangNama: 'KELAPA GADING',         nama: 'RINA WULANDARI',         nomorSK: '031/SK/DIR-DSD/2026', jabatan: 'MANAJER OPERASIONAL',        userId: 'S0312', userNama: 'Rina Wulandari',        cetak: false },
  { id: 5, cabangKode: '023', cabangNama: 'SURABAYA TUNJUNGAN',    nama: 'AHMAD FAUZI RAHMAN',     nomorSK: '027/SK/DIR-DSD/2026', jabatan: 'PLT PEMIMPIN CABANG',        userId: 'S0405', userNama: 'Ahmad Fauzi Rahman',    cetak: true  },
];

/* ─────────── Group Nasabah (group of related debitors for BMPK / exposure) ─────────── */
// BMPK = Batas Maksimum Pemberian Kredit. Group exposure is aggregated across members.
window.MOCK_GROUP_NASABAH = [
  {
    id: 1, kodeGroup: 'GRP-0001', namaGroup: 'GROUP WINARTI', jenisNasabah: 'Individu',
    indukKode: '0000000001', indukNama: 'WINARTI', keterangan: 'Group keluarga Winarti', bmpk: 200000000,
    anggota: [
      { noNasabah: '0000000001', nama: 'WINARTI',          keterangan: 'Nasabah induk',  outsPembiayaan: 0,         bankGaransi: 0, jaminanEmas: 0,        jaminanCash: 0,        exposure: 0 },
      { noNasabah: '0000005432', nama: 'Budi Santoso W.',  keterangan: 'Suami',          outsPembiayaan: 45000000,  bankGaransi: 0, jaminanEmas: 12000000, jaminanCash: 5000000,  exposure: 45000000 },
    ],
  },
  {
    id: 2, kodeGroup: 'GRP-0002', namaGroup: 'GROUP MAJU BERSAMA', jenisNasabah: 'Badan Usaha',
    indukKode: '0000004890', indukNama: 'PT Maju Bersama Sejahtera', keterangan: 'Group usaha sindikasi', bmpk: 2000000000,
    anggota: [
      { noNasabah: '0000004890', nama: 'PT Maju Bersama Sejahtera', keterangan: 'Induk usaha',  outsPembiayaan: 1875000000, bankGaransi: 250000000, jaminanEmas: 0, jaminanCash: 100000000, exposure: 2125000000 },
      { noNasabah: '0000007901', nama: 'CV Karya Mandiri Abadi',    keterangan: 'Anak usaha',   outsPembiayaan: 320000000,  bankGaransi: 0,         jaminanEmas: 0, jaminanCash: 0,         exposure: 320000000 },
      { noNasabah: '0000010234', nama: 'PT Sinar Cemerlang',        keterangan: 'Afiliasi',     outsPembiayaan: 950000000,  bankGaransi: 0,         jaminanEmas: 0, jaminanCash: 50000000,  exposure: 950000000 },
    ],
  },
  {
    id: 3, kodeGroup: 'GRP-0003', namaGroup: 'GROUP TAPIHERU', jenisNasabah: 'Individu',
    indukKode: '0000000623', indukNama: 'Heri Tapiheru', keterangan: '', bmpk: 500000000,
    anggota: [
      { noNasabah: '0000000623', nama: 'Heri Tapiheru', keterangan: 'Nasabah induk', outsPembiayaan: 312500000, bankGaransi: 0, jaminanEmas: 0, jaminanCash: 0, exposure: 312500000 },
    ],
  },
];

/* ─────────── Parameter CKPN (cadangan kerugian per segmen & kolektibilitas) ─────────── */
window.MOCK_SEGMEN = [
  { kode: '01', nama: 'Korporasi' },
  { kode: '02', nama: 'Ritel' },
  { kode: '03', nama: 'Komersial' },
  { kode: '04', nama: 'Konsumer' },
  { kode: '05', nama: 'UMKM' },
];

window.CKPN_JENIS_PENCADANGAN_OPTIONS = ['PPAP', 'CKPN'];

window.MOCK_PARAM_CKPN = [
  { id: 1, jenisPencadangan: 'CKPN', segmenKode: '02', segmenNama: 'Ritel',     kolektibilitas: 1, tarif: 0.15 },
  { id: 2, jenisPencadangan: 'CKPN', segmenKode: '02', segmenNama: 'Ritel',     kolektibilitas: 2, tarif: 5.00 },
  { id: 3, jenisPencadangan: 'CKPN', segmenKode: '02', segmenNama: 'Ritel',     kolektibilitas: 3, tarif: 15.00 },
  { id: 4, jenisPencadangan: 'CKPN', segmenKode: '01', segmenNama: 'Korporasi', kolektibilitas: 4, tarif: 50.00 },
  { id: 5, jenisPencadangan: 'CKPN', segmenKode: '01', segmenNama: 'Korporasi', kolektibilitas: 5, tarif: 100.00 },
  { id: 6, jenisPencadangan: 'PPAP', segmenKode: '05', segmenNama: 'UMKM',      kolektibilitas: 1, tarif: 1.00 },
  { id: 7, jenisPencadangan: 'PPAP', segmenKode: '05', segmenNama: 'UMKM',      kolektibilitas: 2, tarif: 5.00 },
];

/* ─────────── Data Biaya-Biaya (master cost element / elemen biaya) ─────────── */
window.BIAYA_TIPE_ELEMEN_OPTIONS = ['Pendapatan Attribusi', 'Beban Attribusi', 'Vendor', 'Lainnya'];

window.MOCK_BIAYA_BIAYA = [
  { id: 1001, nama: 'Biaya Administrasi',  limitAmortisasi: 0,        tipeElemen: 'Pendapatan Attribusi', dikenakanPajak: false },
  { id: 1002, nama: 'Biaya Provisi',       limitAmortisasi: 0,        tipeElemen: 'Pendapatan Attribusi', dikenakanPajak: false },
  { id: 1003, nama: 'Biaya Notaris',       limitAmortisasi: 5000000,  tipeElemen: 'Vendor',               dikenakanPajak: true  },
  { id: 1004, nama: 'Biaya Asuransi',      limitAmortisasi: 10000000, tipeElemen: 'Vendor',               dikenakanPajak: false },
  { id: 1005, nama: 'Biaya Appraisal',     limitAmortisasi: 2500000,  tipeElemen: 'Beban Attribusi',      dikenakanPajak: true  },
  { id: 1006, nama: 'Biaya Bea Materai',   limitAmortisasi: 0,        tipeElemen: 'Lainnya',              dikenakanPajak: false },
];

/* ─────────── Data Jenis Aktiva (master asset type / tipe aktiva) ─────────── */
window.AKTIVA_METODE_PENYUSUTAN_OPTIONS = ['Anuitas', 'Angsuran', 'Straight Line', 'Tidak Disusutkan'];

window.MOCK_JENIS_AKTIVA = [
  { id: 1, kode: 'TNH', nama: 'Tanah',                 masaPakai: 0,  metodePenyusutan: 'Tidak Disusutkan' },
  { id: 2, kode: 'BGN', nama: 'Bangunan / Gedung',     masaPakai: 20, metodePenyusutan: 'Straight Line' },
  { id: 3, kode: 'KND', nama: 'Kendaraan Bermotor',    masaPakai: 8,  metodePenyusutan: 'Angsuran' },
  { id: 4, kode: 'MSN', nama: 'Mesin & Peralatan',     masaPakai: 10, metodePenyusutan: 'Straight Line' },
  { id: 5, kode: 'INV', nama: 'Inventaris Kantor',     masaPakai: 4,  metodePenyusutan: 'Anuitas' },
  { id: 6, kode: 'RKO', nama: 'Ruko / Properti Usaha', masaPakai: 15, metodePenyusutan: 'Straight Line' },
];

/* ─────────── Parameter Gadai (pawn / PKE parameters by group) ─────────── */
window.GADAI_GROUP_PARAMETER_OPTIONS = [
  'Harga Emas Putih',
  'Plafond PKE',
  'Jangka Waktu PKE',
  'Maksimal Pembiayaan PKE',
  'Batas Minimal Jangka Waktu Pelunasan PKE',
  'Batas Maksimal Umur Pembiayaan PKE',
  'HSE Logam Mulia Rekening PKE',
  'Harga Emas Kuning',
  'Harga Emas Merah',
  'Biaya Jasa',
  'Maksimal Pembiayaan',
  'Biaya Masa Tenggang',
  'Maksimal Plafond',
  'Parameter Adendum',
  'Parameter Jangka Waktu',
];

window.MOCK_PARAM_GADAI = [
  { id: 1, groupParameter: 'Harga Emas Kuning', kodeParameter: 'HEK-24K', keterangan: 'Harga emas kuning 24 karat per gram', valuta: 'IDR', nilai1: 1085000,  nilai2: 0 },
  { id: 2, groupParameter: 'Harga Emas Putih',  kodeParameter: 'HEP-STD', keterangan: 'Harga emas putih standar per gram',     valuta: 'IDR', nilai1: 1120000,  nilai2: 0 },
  { id: 3, groupParameter: 'Biaya Jasa',        kodeParameter: 'BJ-PKE',  keterangan: 'Tarif biaya jasa pemeliharaan per 10 hari', valuta: 'IDR', nilai1: 0.65,  nilai2: 0 },
  { id: 4, groupParameter: 'Maksimal Pembiayaan', kodeParameter: 'MAX-FIN', keterangan: 'Maksimal pembiayaan terhadap taksiran', valuta: 'IDR', nilai1: 95,    nilai2: 0 },
  { id: 5, groupParameter: 'Jangka Waktu PKE',  kodeParameter: 'JW-PKE',  keterangan: 'Jangka waktu PKE (hari)',                valuta: 'IDR', nilai1: 120,    nilai2: 4 },
  { id: 6, groupParameter: 'Maksimal Plafond',  kodeParameter: 'MAX-PLF', keterangan: 'Batas maksimal plafond per rekening',    valuta: 'IDR', nilai1: 250000000, nilai2: 0 },
];

/* ─────────── Parameter Denda (penalty template — master + detail bucket) ─────────── */
window.DENDA_TIPE_OPTIONS = ['Reguler', 'Mikro', 'Tiering'];

window.MOCK_PARAM_DENDA = [
  {
    id: 1, deskripsi: 'Template Denda Reguler Konsumer', tipeDenda: 'Reguler',
    biayaTelepon: 5000, biayaGaji: 0, biayaGaji2: 0, biayaTransportasi: 25000,
    tanggalDibuat: '12-Jan-2025', tanggalDiubah: '03-Mar-2026',
    detail: [
      { id: 11, dpdBawah: 1,  dpdAtas: 30,  frekuensiTelepon: 2, biayaPenaltiHarian: 0.05, frekuensiKunjungan: 0, urutanBucket: 1, jumlahMaksBucket: 0 },
      { id: 12, dpdBawah: 31, dpdAtas: 60,  frekuensiTelepon: 4, biayaPenaltiHarian: 0.10, frekuensiKunjungan: 1, urutanBucket: 2, jumlahMaksBucket: 0 },
      { id: 13, dpdBawah: 61, dpdAtas: 90,  frekuensiTelepon: 6, biayaPenaltiHarian: 0.15, frekuensiKunjungan: 2, urutanBucket: 3, jumlahMaksBucket: 0 },
    ],
  },
  {
    id: 2, deskripsi: 'Template Denda Mikro Produktif', tipeDenda: 'Mikro',
    biayaTelepon: 3000, biayaGaji: 0, biayaGaji2: 0, biayaTransportasi: 15000,
    tanggalDibuat: '08-Feb-2025', tanggalDiubah: '20-Feb-2026',
    detail: [
      { id: 21, dpdBawah: 1,  dpdAtas: 14,  frekuensiTelepon: 3, biayaPenaltiHarian: 0.08, frekuensiKunjungan: 1, urutanBucket: 1, jumlahMaksBucket: 500000 },
      { id: 22, dpdBawah: 15, dpdAtas: 45,  frekuensiTelepon: 5, biayaPenaltiHarian: 0.12, frekuensiKunjungan: 2, urutanBucket: 2, jumlahMaksBucket: 1000000 },
    ],
  },
  {
    id: 3, deskripsi: 'Template Denda Tiering Komersial', tipeDenda: 'Tiering',
    biayaTelepon: 7500, biayaGaji: 50000, biayaGaji2: 25000, biayaTransportasi: 50000,
    tanggalDibuat: '15-Mar-2025', tanggalDiubah: '15-Mar-2025',
    detail: [
      { id: 31, dpdBawah: 1,   dpdAtas: 30,  frekuensiTelepon: 2, biayaPenaltiHarian: 0.05, frekuensiKunjungan: 0, urutanBucket: 1, jumlahMaksBucket: 0 },
      { id: 32, dpdBawah: 31,  dpdAtas: 90,  frekuensiTelepon: 4, biayaPenaltiHarian: 0.10, frekuensiKunjungan: 2, urutanBucket: 2, jumlahMaksBucket: 5000000 },
      { id: 33, dpdBawah: 91,  dpdAtas: 180, frekuensiTelepon: 8, biayaPenaltiHarian: 0.20, frekuensiKunjungan: 4, urutanBucket: 3, jumlahMaksBucket: 10000000 },
    ],
  },
];

// Build the GL Interface rows for a given akad — list of tx_class merged with mapping..
// Default mapping is identity (kode_gl = kode_tx_class) with the tx_class's own nama_gl;
// a customMapping (kode_tx_class -> kode_gl) overrides and re-resolves the name from COA.
window.buildGlInterfaceRows = function(akad, customMapping) {
  return window.MOCK_TX_CLASS.map(tc => {
    const overridden = customMapping && customMapping[tc.kode];
    const kodeGl = overridden || tc.defaultGl || '';
    let namaGl = tc.namaGl || '';
    if (overridden) {
      const coa = window.getCoaByKode(kodeGl);
      namaGl = coa?.nama || namaGl;
    }
    return {
      kodeTxClass: tc.kode,
      deskripsi: tc.deskripsi,
      accountType: tc.accountType,
      wajib: tc.wajib,
      kodeGl,
      namaGl,
    };
  });
};

/* ─────────── GL Interface — Produk Fasilitas (tx_class 19xxx) ─────────── */
// Fasilitas memakai set tx_class tersendiri (komitmen & PPAP), bukan 11xxx.
window.MOCK_TX_CLASS_FASILITAS = [
  { kode: '19000', deskripsi: 'Komitmen pembiayaan',          accountType: 'OffBalanceSheet', wajib: true,  defaultGl: '7040508001', namaGl: 'Fasilitas Pembiayaan Nasabah Yang Belum Ditarik - Non Cash' },
  { kode: '19002', deskripsi: 'PPAP Fasilitas Commited',      accountType: 'Asset',           wajib: false, defaultGl: '2110401001', namaGl: 'PPAP Umum - Pos Adm - Saldo Awal' },
  { kode: '19003', deskripsi: 'Beban PPAP Fasilitas',         accountType: 'Expense',         wajib: false, defaultGl: '',           namaGl: '' },
  { kode: '19004', deskripsi: 'Penambahan/Pengurangan PPAP',  accountType: 'Asset',           wajib: false, defaultGl: '2110401002', namaGl: 'PPAP Umum - Pos Adm - Penambahan/Pengurangan' },
  { kode: '19005', deskripsi: 'Pendapatan Reverse PPAP',      accountType: 'Income',          wajib: false, defaultGl: '',           namaGl: '' },
];

window.buildGlInterfaceFasilitasRows = function(customMapping) {
  return window.MOCK_TX_CLASS_FASILITAS.map(tc => {
    const overridden = customMapping && customMapping[tc.kode];
    const kodeGl = overridden || tc.defaultGl || '';
    let namaGl = tc.namaGl || '';
    if (overridden) {
      const coa = window.getCoaByKode(kodeGl);
      namaGl = coa?.nama || namaGl;
    }
    return {
      kodeTxClass: tc.kode,
      deskripsi: tc.deskripsi,
      accountType: tc.accountType,
      wajib: tc.wajib,
      kodeGl,
      namaGl,
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

/* ─────────── Transaksi Massal (bulk upload) ─────────── */
// Jenis transaksi massal yang tersedia untuk financing
window.MASSAL_JENIS = [
  'Registrasi Account',
  'Registrasi Fasilitas',
  'Pembayaran Angsuran',
  'Pelunasan Dipercepat',
  'Reposisi Cabang',
];

window.MASSAL_STATUS_OPTIONS = ['Submit', 'Approve', 'Canceled', 'Draft'];

// Riwayat upload batch transaksi massal
window.MOCK_MASSAL_HISTORY = [
  { batchId: '19860', fileName: 'pembayaran-angsuran-202606.xlsx', tglUpload: '04-Jun-2026', jenis: 'Pembayaran Angsuran',  valid: 124, invalid: 0, status: 'Approve',  userUpload: 'budi.maker', userApprove: 'andi.checker', tglApprove: '04-Jun-2026' },
  { batchId: '19858', fileName: 'pelunasan-dipercepat-q2.xlsx',   tglUpload: '03-Jun-2026', jenis: 'Pelunasan Dipercepat', valid: 18,  invalid: 2, status: 'Submit',   userUpload: 'budi.maker', userApprove: '-',            tglApprove: '-' },
  { batchId: '19857', fileName: 'registrasi-account-mitra.xlsx',  tglUpload: '03-Jun-2026', jenis: 'Registrasi Account',   valid: 0,   invalid: 3, status: 'Canceled', userUpload: 'efendi',     userApprove: 'efendi',       tglApprove: '03-Jun-2026' },
  { batchId: '19855', fileName: 'registrasi-fasilitas-mei.xlsx',  tglUpload: '02-Jun-2026', jenis: 'Registrasi Fasilitas', valid: 42,  invalid: 1, status: 'Approve',  userUpload: 'shinta01',   userApprove: 'andi.checker', tglApprove: '02-Jun-2026' },
  { batchId: '19852', fileName: 'reposisi-cabang-bdg.xlsx',       tglUpload: '01-Jun-2026', jenis: 'Reposisi Cabang',      valid: 7,   invalid: 0, status: 'Approve',  userUpload: 'shinta01',   userApprove: 'andi.checker', tglApprove: '01-Jun-2026' },
  { batchId: '19850', fileName: 'pembayaran-angsuran-mei.xlsx',   tglUpload: '31-May-2026', jenis: 'Pembayaran Angsuran',  valid: 89,  invalid: 5, status: 'Submit',   userUpload: 'efendi',     userApprove: '-',            tglApprove: '-' },
  { batchId: '19848', fileName: 'reposisi-cabang-023.xlsx',       tglUpload: '30-May-2026', jenis: 'Reposisi Cabang',      valid: 0,   invalid: 4, status: 'Canceled', userUpload: 'efendi',     userApprove: 'efendi',       tglApprove: '30-May-2026' },
  { batchId: '19845', fileName: 'registrasi-account-batch7.xlsx', tglUpload: '29-May-2026', jenis: 'Registrasi Account',   valid: 31,  invalid: 0, status: 'Approve',  userUpload: 'budi.maker', userApprove: 'rina.sv',      tglApprove: '29-May-2026' },
  { batchId: '19842', fileName: 'pelunasan-q2-batch2.xlsx',       tglUpload: '28-May-2026', jenis: 'Pelunasan Dipercepat', valid: 12,  invalid: 0, status: 'Approve',  userUpload: 'shinta01',   userApprove: 'rina.sv',      tglApprove: '28-May-2026' },
  { batchId: '19840', fileName: 'registrasi-fasilitas-apr.xlsx',  tglUpload: '27-May-2026', jenis: 'Registrasi Fasilitas', valid: 5,   invalid: 9, status: 'Draft',    userUpload: 'budi.maker', userApprove: '-',            tglApprove: '-' },
  { batchId: '19838', fileName: 'pembayaran-angsuran-apr.xlsx',   tglUpload: '26-May-2026', jenis: 'Pembayaran Angsuran',  valid: 210, invalid: 0, status: 'Approve',  userUpload: 'efendi',     userApprove: 'andi.checker', tglApprove: '26-May-2026' },
  { batchId: '19835', fileName: 'registrasi-account-individu.xlsx', tglUpload: '25-May-2026', jenis: 'Registrasi Account', valid: 16,  invalid: 1, status: 'Submit',   userUpload: 'shinta01',   userApprove: '-',            tglApprove: '-' },
];

/* ─────────── Tutup Operational APBL (Akhir Periode / closing operasional) ─────────── */
// Summary check per kategori & cabang — jumlah transaksi on-going yang belum selesai
window.MOCK_APBL_SUMMARY = [
  { kategori: 'CEK OTORISASI TRANSAKSI', cabang: '000', jumlah: 2 },
  { kategori: 'CEK OTORISASI TRANSAKSI', cabang: '001', jumlah: 1 },
  { kategori: 'CEK OTORISASI TRANSAKSI', cabang: '003', jumlah: 1 },
  { kategori: 'CEK DATA JAMINAN',        cabang: '001', jumlah: 1 },
  { kategori: 'CEK DATA JAMINAN',        cabang: '005', jumlah: 1 },
  { kategori: 'CEK PROGRESS NOTARIS',    cabang: '000', jumlah: 1 },
  { kategori: 'CEK DATA PENJAMIN',       cabang: '003', jumlah: 1 },
];

// Otorisasi Transaksi — transaksi yang belum diotorisasi
window.MOCK_APBL_OTORISASI = [
  { cabang: '000', tglInput: '11-06-2026 11:15:13 AM', kodeEntri: 'FE006',  infoTransaksi: '5460904000001', kodeBisnis: '',    keterangan: 'Acc pembiayaan Musyarakah - 5460904000001 - PIP', userInput: 'IBOPR' },
  { cabang: '000', tglInput: '12-06-2026 4:58:14 PM',  kodeEntri: 'FAC01',  infoTransaksi: '0000501000003', kodeBisnis: '101', keterangan: 'Entri Biaya-Biaya 0000501000003',               userInput: 'IBOPR' },
  { cabang: '001', tglInput: '13-06-2026 1:30:35 PM',  kodeEntri: 'FAC01',  infoTransaksi: '0010502027578', kodeBisnis: '116', keterangan: 'Entri Biaya-Biaya 0010502027578',               userInput: 'S1465' },
  { cabang: '003', tglInput: '19-06-2026 2:36:10 PM',  kodeEntri: 'FRVS04', infoTransaksi: '0020510000464', kodeBisnis: '131', keterangan: 'Reverse Transaksi Recovery Write Off - FIN.2022.0', userInput: 'IBOPR' },
];

// Data Jaminan — pembiayaan baru yang belum memiliki jaminan
window.MOCK_APBL_JAMINAN = [
  { cabang: '001', noRekening: '0010502027578', namaRekening: 'Budi Santoso Wibowo',       kodeProduk: 'M-001', tglBuka: '18-Jun-2026', tglDropping: '19-Jun-2026', userInput: 'S1465',      userOtorisasi: 'IBOPR' },
  { cabang: '005', noRekening: '0050511000231', namaRekening: 'CV Karya Mandiri Abadi',    kodeProduk: 'C-001', tglBuka: '17-Jun-2026', tglDropping: '18-Jun-2026', userInput: 'shinta01',   userOtorisasi: 'andi.checker' },
];

// Progress Notaris — pembiayaan baru yang belum memiliki link notaris
window.MOCK_APBL_NOTARIS = [
  { cabang: '000', noRekening: '0000501000934', namaRekening: 'PT Maju Bersama Sejahtera', kodeProduk: 'M-002', tglBuka: '16-Jun-2026', tglDropping: '17-Jun-2026', userInput: 'budi.maker', userOtorisasi: 'rina.sv' },
];

// Data Penjamin — pembiayaan baru yang belum memiliki penjamin
window.MOCK_APBL_PENJAMIN = [
  { cabang: '003', noRekening: '0030510000464', namaRekening: 'Rina Wulandari',            kodeProduk: 'M-001', tglBuka: '15-Jun-2026', tglDropping: '16-Jun-2026', userInput: 'IBOPR',      userOtorisasi: 'andi.checker' },
];

// Riwayat proses tutup operasional APBL (closing & re-open)
window.APBL_RIWAYAT_KOLOM_OPTIONS = ['User Close', 'Status', 'Reopen By'];
window.MOCK_APBL_RIWAYAT = [
  { tanggal: '22-Aug-2022', closedBy: 'IBOPR',       waktuTutup: '13-Jun-2026 3:13:32 PM', status: 'Reopen', reopenBy: 'IBOPR', tglReopen: '13-Jun-2026 3:47:28 PM' },
  { tanggal: '19-Jun-2026', closedBy: 'IBOPR',       waktuTutup: '19-Jun-2026 4:20:00 PM', status: 'Closed', reopenBy: '-',     tglReopen: '-' },
  { tanggal: '31-May-2026', closedBy: 'budi.maker',  waktuTutup: '31-May-2026 5:02:11 PM', status: 'Closed', reopenBy: '-',     tglReopen: '-' },
  { tanggal: '30-Apr-2026', closedBy: 'andi.checker', waktuTutup: '30-Apr-2026 6:15:40 PM', status: 'Closed', reopenBy: '-',     tglReopen: '-' },
  { tanggal: '31-Mar-2026', closedBy: 'rina.sv',     waktuTutup: '31-Mar-2026 5:48:02 PM', status: 'Closed', reopenBy: '-',     tglReopen: '-' },
];
