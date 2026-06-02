/* screens-laporan.jsx — Modul Laporan (8.x)
 * Generic report screen: standard filter bar (periode + cabang) + export
 * actions + data table + summary footer. Each route maps to a config in
 * LAPORAN_CONFIG describing title, columns, rows, and optional summary.
 */

const CABANG_OPTIONS = ['Semua Cabang', '001 - Kantor Pusat', '005 - Bandung Asia Afrika', '012 - Kelapa Gading', '023 - Surabaya Tunjungan', '034 - Yogya Malioboro'];
const KOLEK_LABEL = { 1: 'Lancar', 2: 'DPK', 3: 'Kurang Lancar', 4: 'Diragukan', 5: 'Macet' };

const rp = (n) => window.fmtRp(n);

/* ---------- Row builders (derive from existing mock data) ---------- */
function buildNominatifPembiayaan() {
  return (window.MOCK_PEMBIAYAAN || []).map((r, i) => ({
    no: i + 1,
    noRek: r.noRek,
    nama: r.nama,
    akad: r.akad,
    plafond: r.plafond,
    outstanding: r.outstanding,
    kolek: KOLEK_LABEL[r.kolektibilitas] || '-',
    cabang: '001 - Kantor Pusat',
  }));
}
function buildNominatifFasilitas() {
  return (window.MOCK_FASILITAS || []).map((r, i) => ({
    no: i + 1,
    noFasilitas: r.noFasilitas,
    nama: r.nama,
    jenis: r.jenis,
    plafond: r.plafond,
    terpakai: r.plafond - (r.sisa || 0),
    sisa: r.sisa || 0,
    cabang: r.cabang,
  }));
}
function buildTransaksi() {
  const jenis = ['Pencairan', 'Angsuran Pokok', 'Angsuran Margin', 'Pelunasan', 'Biaya Admin'];
  const out = [];
  (window.MOCK_PEMBIAYAAN || []).forEach((r) => {
    for (let k = 0; k < 2; k++) {
      const j = jenis[(r.noRek.length + k) % jenis.length];
      const debet = j === 'Pencairan' ? r.plafond : 0;
      const kredit = j === 'Pencairan' ? 0 : Math.round(r.plafond / (r.tenor || 36));
      out.push({
        tgl: k === 0 ? '02-May-2026' : '24-May-2026',
        noTransaksi: `TRX-${r.noRek.slice(-4)}${k}${k}`,
        noRek: r.noRek,
        jenis: j,
        debet, kredit,
        saldo: r.outstanding,
      });
    }
  });
  return out.map((o, i) => ({ ...o, no: i + 1 }));
}
function buildAmortisasiBiaya() {
  const biaya = [
    { jenis: 'Biaya Provisi', awal: 4500000, bulan: 125000 },
    { jenis: 'Biaya Administrasi', awal: 500000, bulan: 41667 },
    { jenis: 'Biaya Notaris', awal: 7500000, bulan: 208333 },
    { jenis: 'Biaya Asuransi Jiwa', awal: 3600000, bulan: 100000 },
  ];
  return (window.MOCK_PEMBIAYAAN || []).slice(0, 4).flatMap((r, ri) => {
    const b = biaya[ri % biaya.length];
    const terbayar = b.bulan * (6 + ri * 3);
    return [{
      no: ri + 1,
      noRek: r.noRek,
      jenis: b.jenis,
      nilaiAwal: b.awal,
      perBulan: b.bulan,
      terbayar: Math.min(terbayar, b.awal),
      sisa: Math.max(b.awal - terbayar, 0),
    }];
  });
}
function buildAccrue() {
  return (window.MOCK_PEMBIAYAAN || []).map((r, i) => {
    const margin = Math.round(r.outstanding * 0.0095);
    return {
      no: i + 1,
      noRek: r.noRek,
      nama: r.nama,
      pokok: r.outstanding,
      marginAkrual: margin,
      akrualBerjalan: Math.round(margin * 0.6),
      tglAkrual: '31-May-2026',
    };
  });
}
function buildTagihanAngsuran() {
  return (window.MOCK_PEMBIAYAAN || []).flatMap((r, ri) => {
    const angsuran = Math.round(r.plafond / (r.tenor || 36));
    const pokok = Math.round(angsuran * 0.78);
    const margin = angsuran - pokok;
    return [0, 1].map((k) => ({
      noRek: r.noRek,
      nama: r.nama,
      angsuranKe: 13 + ri + k,
      jatuhTempo: k === 0 ? '05-Jun-2026' : '05-Jul-2026',
      pokok, margin, total: angsuran,
      status: k === 0 ? 'Akan Jatuh Tempo' : 'Belum Tagih',
    }));
  }).map((o, i) => ({ ...o, no: i + 1 }));
}
function buildLBV() {
  return (window.MOCK_COA || []).filter(c => c.type === 'Asset' || c.type === 'Income').slice(0, 8).map((c, i) => {
    const gl = 1000000000 + i * 137500000;
    const selisih = i === 3 ? 250000 : (i === 6 ? -100000 : 0);
    return {
      no: i + 1,
      kodeGl: c.kode,
      namaGl: c.nama,
      saldoGl: gl,
      saldoSub: gl - selisih,
      selisih,
      status: selisih === 0 ? 'Balance' : 'Selisih',
    };
  });
}
function buildDataJaminan() {
  return (window.MOCK_JAMINAN || []).map((r, i) => ({
    no: i + 1,
    noJaminan: r.noJaminan,
    nama: r.nama,
    jenis: r.jenis,
    nilai: r.nilai,
    appraisal: r.appraisal,
    status: r.status,
  }));
}
function buildPengikatanJaminan() {
  const jenisIkat = ['Hak Tanggungan (HT) Peringkat I', 'Fidusia', 'Gadai', 'Cessie'];
  return (window.MOCK_JAMINAN || []).map((r, i) => ({
    no: i + 1,
    noJaminan: r.noJaminan,
    nama: r.nama,
    jenisPengikatan: jenisIkat[i % jenisIkat.length],
    noAkta: `APHT-${r.noJaminan.slice(-4)}/2024`,
    notaris: ['Ny. Soegiarti W., S.H.', 'Tn. Bambang P., S.H.', 'Ny. Rina S., S.H., M.Kn'][i % 3],
    nilaiPengikatan: Math.round(r.nilai * 1.25),
    status: r.status === 'Diikat' ? 'Selesai' : 'Proses',
  }));
}

/* ---------- Report configs ---------- */
const moneyR = (key) => ({ key, align: 'right', render: r => <span className="mono">{rp(r[key])}</span> });

const LAPORAN_CONFIG = {
  nominatif_pembiayaan: {
    code: '8.1', title: 'Nominatif Pembiayaan',
    subtitle: 'Posisi outstanding seluruh rekening pembiayaan',
    build: buildNominatifPembiayaan,
    columns: [
      { key: 'no', label: 'No', width: 50 },
      { key: 'noRek', label: 'No. Rekening', render: r => <span className="mono">{r.noRek}</span> },
      { key: 'nama', label: 'Nasabah' },
      { key: 'akad', label: 'Akad', render: r => <span className="tag tag--info">{r.akad}</span> },
      { ...moneyR('plafond'), label: 'Plafond' },
      { ...moneyR('outstanding'), label: 'Outstanding' },
      { key: 'kolek', label: 'Kolek', render: r => <StatusTag status={r.kolek === 'Lancar' ? 'Aktif' : r.kolek} /> },
    ],
    sum: [{ label: 'Total Outstanding', key: 'outstanding' }, { label: 'Total Plafond', key: 'plafond' }],
  },
  nominatif_fasilitas: {
    code: '8.2', title: 'Fasilitas Pembiayaan',
    subtitle: 'Nominatif plafond fasilitas induk & penggunaannya',
    build: buildNominatifFasilitas,
    columns: [
      { key: 'no', label: 'No', width: 50 },
      { key: 'noFasilitas', label: 'No. Fasilitas', render: r => <span className="mono">{r.noFasilitas}</span> },
      { key: 'nama', label: 'Nasabah' },
      { key: 'jenis', label: 'Jenis Akad' },
      { ...moneyR('plafond'), label: 'Plafond' },
      { ...moneyR('terpakai'), label: 'Terpakai' },
      { ...moneyR('sisa'), label: 'Sisa' },
    ],
    sum: [{ label: 'Total Plafond', key: 'plafond' }, { label: 'Total Terpakai', key: 'terpakai' }],
  },
  transaksi: {
    code: '8.3', title: 'Histori Transaksi Pembiayaan',
    subtitle: 'Mutasi transaksi pembiayaan per periode',
    build: buildTransaksi,
    columns: [
      { key: 'tgl', label: 'Tanggal', render: r => <span className="mono">{r.tgl}</span> },
      { key: 'noTransaksi', label: 'No. Transaksi', render: r => <span className="mono">{r.noTransaksi}</span> },
      { key: 'noRek', label: 'No. Rekening', render: r => <span className="mono">{r.noRek}</span> },
      { key: 'jenis', label: 'Jenis Transaksi' },
      { ...moneyR('debet'), label: 'Debet' },
      { ...moneyR('kredit'), label: 'Kredit' },
    ],
    sum: [{ label: 'Total Debet', key: 'debet' }, { label: 'Total Kredit', key: 'kredit' }],
  },
  amortisasi_biaya: {
    code: '8.4', title: 'Amortisasi Biaya Pembiayaan',
    subtitle: 'Amortisasi biaya dibayar di muka per rekening',
    build: buildAmortisasiBiaya,
    columns: [
      { key: 'no', label: 'No', width: 50 },
      { key: 'noRek', label: 'No. Rekening', render: r => <span className="mono">{r.noRek}</span> },
      { key: 'jenis', label: 'Jenis Biaya' },
      { ...moneyR('nilaiAwal'), label: 'Nilai Awal' },
      { ...moneyR('perBulan'), label: 'Amortisasi / Bulan' },
      { ...moneyR('terbayar'), label: 'Terbayar' },
      { ...moneyR('sisa'), label: 'Sisa' },
    ],
    sum: [{ label: 'Total Nilai Awal', key: 'nilaiAwal' }, { label: 'Total Sisa', key: 'sisa' }],
  },
  accrue_pembiayaan: {
    code: '8.5', title: 'Accrue Pembiayaan',
    subtitle: 'Akrual pendapatan margin per rekening',
    build: buildAccrue,
    columns: [
      { key: 'no', label: 'No', width: 50 },
      { key: 'noRek', label: 'No. Rekening', render: r => <span className="mono">{r.noRek}</span> },
      { key: 'nama', label: 'Nasabah' },
      { ...moneyR('pokok'), label: 'Pokok' },
      { ...moneyR('marginAkrual'), label: 'Margin Akrual' },
      { ...moneyR('akrualBerjalan'), label: 'Akrual Berjalan' },
      { key: 'tglAkrual', label: 'Tgl Akrual', render: r => <span className="mono">{r.tglAkrual}</span> },
    ],
    sum: [{ label: 'Total Margin Akrual', key: 'marginAkrual' }, { label: 'Total Akrual Berjalan', key: 'akrualBerjalan' }],
  },
  tagihan_angsuran: {
    code: '8.6', title: 'Jadwal Tagihan Angsuran',
    subtitle: 'Proyeksi tagihan angsuran jatuh tempo',
    build: buildTagihanAngsuran,
    columns: [
      { key: 'no', label: 'No', width: 50 },
      { key: 'noRek', label: 'No. Rekening', render: r => <span className="mono">{r.noRek}</span> },
      { key: 'nama', label: 'Nasabah' },
      { key: 'angsuranKe', label: 'Angsuran ke', render: r => <span className="mono">{r.angsuranKe}</span> },
      { key: 'jatuhTempo', label: 'Jatuh Tempo', render: r => <span className="mono">{r.jatuhTempo}</span> },
      { ...moneyR('pokok'), label: 'Pokok' },
      { ...moneyR('margin'), label: 'Margin' },
      { ...moneyR('total'), label: 'Total' },
    ],
    sum: [{ label: 'Total Angsuran', key: 'total' }],
  },
  lbv: {
    code: '8.7', title: 'Ledger Balance Verification (LBV)',
    subtitle: 'Verifikasi saldo GL vs subledger pembiayaan',
    build: buildLBV,
    columns: [
      { key: 'no', label: 'No', width: 50 },
      { key: 'kodeGl', label: 'Kode GL', render: r => <span className="mono">{r.kodeGl}</span> },
      { key: 'namaGl', label: 'Nama GL' },
      { ...moneyR('saldoGl'), label: 'Saldo GL' },
      { ...moneyR('saldoSub'), label: 'Saldo Subledger' },
      { key: 'selisih', label: 'Selisih', align: 'right', render: r => <span className="mono" style={{ color: r.selisih !== 0 ? 'var(--c-error)' : 'inherit' }}>{rp(r.selisih)}</span> },
      { key: 'status', label: 'Status', render: r => <StatusTag status={r.status === 'Balance' ? 'Aktif' : r.status} /> },
    ],
    sum: [{ label: 'Total Saldo GL', key: 'saldoGl' }, { label: 'Total Selisih', key: 'selisih' }],
  },
  'jaminan/data_jaminan': {
    code: '8.9.1', title: 'Laporan Data Jaminan', crumbParent: 'Jaminan',
    subtitle: 'Daftar agunan terdaftar beserta nilai appraisal',
    build: buildDataJaminan,
    columns: [
      { key: 'no', label: 'No', width: 50 },
      { key: 'noJaminan', label: 'No. Jaminan', render: r => <span className="mono">{r.noJaminan}</span> },
      { key: 'nama', label: 'Nasabah' },
      { key: 'jenis', label: 'Jenis Jaminan' },
      { ...moneyR('nilai'), label: 'Nilai Appraisal' },
      { key: 'appraisal', label: 'Lembaga Penilai' },
      { key: 'status', label: 'Status', render: r => <StatusTag status={r.status} /> },
    ],
    sum: [{ label: 'Total Nilai Jaminan', key: 'nilai' }],
  },
  'jaminan/pengikatan_jaminan': {
    code: '8.9.2', title: 'Laporan Data Pengikatan Jaminan', crumbParent: 'Jaminan',
    subtitle: 'Status pengikatan hukum atas agunan',
    build: buildPengikatanJaminan,
    columns: [
      { key: 'no', label: 'No', width: 50 },
      { key: 'noJaminan', label: 'No. Jaminan', render: r => <span className="mono">{r.noJaminan}</span> },
      { key: 'nama', label: 'Nasabah' },
      { key: 'jenisPengikatan', label: 'Jenis Pengikatan' },
      { key: 'noAkta', label: 'No. Akta', render: r => <span className="mono">{r.noAkta}</span> },
      { key: 'notaris', label: 'Notaris / PPAT' },
      { ...moneyR('nilaiPengikatan'), label: 'Nilai Pengikatan' },
      { key: 'status', label: 'Status', render: r => <StatusTag status={r.status === 'Selesai' ? 'Aktif' : r.status} /> },
    ],
    sum: [{ label: 'Total Nilai Pengikatan', key: 'nilaiPengikatan' }],
  },
};

function LaporanScreen({ report, showToast }) {
  const cfg = LAPORAN_CONFIG[report] || LAPORAN_CONFIG.nominatif_pembiayaan;
  const allRows = React.useMemo(() => cfg.build(), [report]);
  const [shown, setShown] = React.useState(true);
  const [filters, setFilters] = React.useState({
    dari: '01-May-2026', sampai: '31-May-2026', cabang: 'Semua Cabang',
  });
  const setF = (k, v) => setFilters(f => ({ ...f, [k]: v }));

  const rows = shown ? allRows : [];

  return (
    <div className="card">
      <h2 className="page__title">
        {cfg.title}
        <span className="subtitle">{cfg.subtitle}</span>
      </h2>

      {/* Filter bar */}
      <div className="laporan-filter">
        <Field label="Periode Dari">
          <DateInput value={filters.dari} onChange={v => setF('dari', v)} />
        </Field>
        <Field label="Periode Sampai">
          <DateInput value={filters.sampai} onChange={v => setF('sampai', v)} />
        </Field>
        <Field label="Cabang">
          <Select value={filters.cabang} onChange={v => setF('cabang', v)} options={CABANG_OPTIONS} />
        </Field>
        <button className="btn btn--primary" style={{ alignSelf: 'flex-end' }} onClick={() => setShown(true)}>
          <span dangerouslySetInnerHTML={{ __html: Icons.search(16) }} />
          Tampilkan
        </button>
      </div>

      <div className="row row--between" style={{ margin: '20px 0 12px', alignItems: 'center' }}>
        <span className="text-muted text-sm">
          {rows.length} baris · Periode {filters.dari} s.d. {filters.sampai}
        </span>
        <div className="row gap-12">
          <button className="btn btn--neutral btn--sm" onClick={() => showToast({ type: 'success', title: 'Export Excel', message: `${cfg.title}.xlsx sedang diunduh` })}>
            <span dangerouslySetInnerHTML={{ __html: Icons.download(14) }} />
            Excel
          </button>
          <button className="btn btn--neutral btn--sm" onClick={() => showToast({ type: 'success', title: 'Export PDF', message: `${cfg.title}.pdf sedang diunduh` })}>
            <span dangerouslySetInnerHTML={{ __html: Icons.doc(14) }} />
            PDF
          </button>
          <button className="btn btn--neutral btn--sm" onClick={() => showToast({ type: 'info', title: 'Mencetak…', message: cfg.title })}>
            <span dangerouslySetInnerHTML={{ __html: Icons.print(14) }} />
            Cetak
          </button>
        </div>
      </div>

      <DataTable
        columns={cfg.columns}
        data={rows}
        showSearch={true}
      />

      {cfg.sum && rows.length > 0 && (
        <div className="laporan-summary">
          {cfg.sum.map((s, i) => (
            <div key={i} className="laporan-summary__item">
              <span className="laporan-summary__label">{s.label}</span>
              <span className="laporan-summary__value mono">{rp(rows.reduce((acc, r) => acc + (Number(r[s.key]) || 0), 0))}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { LaporanScreen });
