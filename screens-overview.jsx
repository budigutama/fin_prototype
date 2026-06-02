/* screens-overview.jsx — Site map / wireflow / dashboard */

function OverviewScreen({ onNavigate }) {
  const scenarios = [
    {
      num: 1, title: 'Setup Awal: Data Master & Produk Parameter',
      desc: 'Sebelum operasional dimulai — admin menyiapkan data master (instansi, vendor, dll) dan mendefinisikan produk pembiayaan beserta parameternya.',
      flow: [
        { num: '2.x', label: 'Data Master',         desc: 'Instansi, Vendor, Developer', route: '/master/instansi', start: true },
        { num: '3.1', label: 'Produk Pembiayaan',   desc: 'Definisikan produk',          route: '/produk/pembiayaan' },
        { num: '3.3', label: 'Parameter Global',    desc: 'Konfigurasi sistem',          route: '/produk/parameter-global', end: true },
      ]
    },
    {
      num: 2, title: 'Originasi: Simulasi → Registrasi Fasilitas → Rekening Pembiayaan',
      desc: 'Calon nasabah mensimulasikan angsuran, lalu officer mendaftarkan fasilitas, dan terakhir membuka rekening pembiayaan terhadap fasilitas tersebut.',
      flow: [
        { num: '1.0', label: 'Simulasi Angsuran',       desc: 'Hitung skenario akad',       route: '/simulasi', start: true },
        { num: '4.1', label: 'Registrasi Fasilitas',    desc: 'Buka fasilitas baru',        route: '/registrasi-fasilitas' },
        { num: '4.2.1', label: 'Registrasi Pembiayaan', desc: 'Buka rekening pembiayaan',   route: '/registrasi/pembiayaan' },
        { num: '9.x', label: 'Otorisasi Maker-Checker',  desc: 'Approval oleh atasan',       route: '/otorisasi', end: true },
      ]
    },
    {
      num: 3, title: 'Jaminan: Pengelolaan Agunan',
      desc: 'Catat agunan/jaminan terhadap fasilitas pembiayaan — daftar, koreksi nilai appraisal, dan release ketika lunas.',
      flow: [
        { num: '7.0', label: 'Daftar Jaminan',       desc: 'Inventaris agunan',         route: '/jaminan/daftar', start: true },
        { num: '7.1', label: 'Detail Agunan',        desc: 'Properti, kendaraan, dll',  route: '/jaminan/daftar' },
        { num: '7.2', label: 'Koreksi / Release',    desc: 'Revaluasi atau pelepasan',  route: '/jaminan/daftar', end: true },
      ]
    },
    {
      num: 4, title: 'Servicing: List Fasilitas → Detail → Addendum',
      desc: 'Officer mencari fasilitas existing, melihat detailnya, lalu melakukan addendum (perubahan akad / plafond / tenor).',
      flow: [
        { num: '4.3',   label: 'List Fasilitas',        desc: 'Cari fasilitas existing',    route: '/list-fasilitas', start: true },
        { num: '4.3.1', label: 'Lihat Detail [P]',      desc: 'Detail + tab biaya/transaksi', route: '/list-fasilitas/detail' },
        { num: '4.3.2', label: 'Addendum Fasilitas [P]',desc: 'Catat perubahan akad/limit', route: '/list-fasilitas/addendum' },
        { num: '9.x',   label: 'Otorisasi',              desc: 'Approval addendum',          route: '/otorisasi', end: true },
      ]
    },
    {
      num: 5, title: 'Account: List Pembiayaan → Edit Rekening → Restruktur',
      desc: 'Kelola rekening pembiayaan: edit kelengkapan data, lalu restruktur ulang ketika nasabah mengalami kesulitan bayar.',
      flow: [
        { num: '4.4',   label: 'List Account Pembiayaan', desc: 'Daftar rekening pembiayaan', route: '/list-pembiayaan', start: true },
        { num: '4.4.2', label: 'Edit Rekening [P]',       desc: 'Lengkapi data rekening',     route: '/list-pembiayaan/edit' },
        { num: '5.3',   label: 'Restruktur Pembiayaan',   desc: 'Jadwal ulang & relaksasi',   route: '/edit/restruktur', end: true },
      ]
    },
    {
      num: 6, title: 'Pelayanan Pembayaran: Manual & Pelunasan Dipercepat',
      desc: 'Teller menerima setoran angsuran manual; atau nasabah meminta pelunasan lebih cepat dari jadwal.',
      flow: [
        { num: '6.1', label: 'Pembayaran Manual',     desc: 'Setor angsuran nasabah',    route: '/transaksi/pembayaran-manual', start: true },
        { num: '6.2', label: 'Pelunasan Dipercepat',  desc: 'Hitung muqasah & lunasi',   route: '/transaksi/pelunasan-dipercepat', end: true },
      ]
    },
    {
      num: 7, title: 'Recovery: Hapus Buku → Recovery → Hapus Tagih',
      desc: 'Penanganan kredit macet — keluarkan dari neraca, kelola recovery, kemudian hapus tagih jika tidak tertagih.',
      flow: [
        { num: '6.9.1', label: 'Registrasi Hapus Buku', desc: 'Keluarkan dari neraca',   route: '/transaksi/hapus-buku/registrasi', start: true },
        { num: '6.9.2', label: 'Recovery Hapus Buku',   desc: 'Catat penagihan',         route: '/transaksi/hapus-buku/recovery' },
        { num: '6.9.3', label: 'Hapus Tagih',           desc: 'Hapus permanen',          route: '/transaksi/hapus-buku/hapus-tagih', end: true },
      ]
    },
  ];

  const moduleSections = [
    {
      title: 'Simulasi', desc: 'Perhitungan angsuran berbagai akad',
      items: [{ num: '1.0', label: 'Simulasi Angsuran', route: '/simulasi' }],
    },
    {
      title: 'Data Master', desc: 'Referensi master data',
      items: [
        { num: '2.1', label: 'Data Instansi',           route: '/master/instansi' },
        { num: '2.2', label: 'Data Pejabat',            route: '/master/pejabat' },
        { num: '2.3', label: 'Data Vendor',             route: '/master/vendor' },
        { num: '2.4', label: 'Data Developer',          route: '/master/developer' },
        { num: '2.5', label: 'Data Mitra Join Finance', route: '/master/mitra' },
        { num: '2.6', label: 'Data Kode Bisnis',        route: '/master/kode-bisnis' },
        { num: '2.7', label: 'Data Jenis Aktiva',       route: '/master/jenis-aktiva' },
        { num: '2.8', label: 'Data Biaya-Biaya',        route: '/master/biaya' },
      ],
    },
    {
      title: 'Produk Parameter', desc: 'Konfigurasi produk & sistem',
      items: [
        { num: '3.1', label: 'Produk Pembiayaan',     route: '/produk/pembiayaan' },
        { num: '3.2', label: 'Produk Fasilitas',      route: '/produk/fasilitas' },
        { num: '3.3', label: 'Parameter Global',      route: '/produk/parameter-global' },
        { num: '3.4', label: 'Parameter CKPN',        route: '/produk/parameter-ckpn' },
        { num: '3.5', label: 'Parameter Denda',       route: '/produk/parameter-denda' },
        { num: '3.6', label: 'Parameter Gadai',       route: '/produk/parameter-gadai' },
      ],
    },
    {
      title: 'Account & Fasilitas', desc: 'Registrasi & list rekening',
      items: [
        { num: '4.1',   label: 'Registrasi Fasilitas',         route: '/registrasi-fasilitas' },
        { num: '4.2.1', label: 'Registrasi Rekening Pembiayaan', route: '/registrasi/pembiayaan' },
        { num: '4.2.2', label: 'Registrasi Rekening Gadai',   route: '/registrasi/gadai', leaf: '[P]' },
        { num: '4.2.5', label: 'Registrasi Bank Garansi',     route: '/registrasi/bank-garansi', leaf: '[P]' },
        { num: '4.3',   label: 'List Fasilitas',              route: '/list-fasilitas' },
        { num: '4.4',   label: 'List Account Pembiayaan',     route: '/list-pembiayaan' },
        { num: '4.5',   label: 'List Account Gadai',          route: '/list-gadai', leaf: '[P]' },
        { num: '4.7',   label: 'List Account Bank Garansi',   route: '/list-bank-garansi', leaf: '[P]' },
      ],
    },
    {
      title: 'Edit Rekening', desc: 'Perubahan setelah aktif',
      items: [
        { num: '5.1', label: 'Kelengkapan Data',     route: '/edit/kelengkapan-data' },
        { num: '5.2', label: 'Addendum Pembiayaan', route: '/edit/addendum' },
        { num: '5.3', label: 'Restruktur',           route: '/edit/restruktur' },
        { num: '5.4', label: 'Ulang Jadwal Angsuran',route: '/edit/ulang-jadwal' },
      ],
    },
    {
      title: 'Transaksi', desc: 'Operasional harian',
      items: [
        { num: '6.1', label: 'Pembayaran Manual',         route: '/transaksi/pembayaran-manual' },
        { num: '6.2', label: 'Pelunasan Dipercepat',      route: '/transaksi/pelunasan-dipercepat' },
        { num: '6.3', label: 'Koreksi Pembayaran',        route: '/transaksi/koreksi-pembayaran' },
        { num: '6.4', label: 'Input Biaya-Biaya',         route: '/transaksi/input-biaya' },
        { num: '6.9.1', label: 'Registrasi Hapus Buku',   route: '/transaksi/hapus-buku/registrasi' },
        { num: '6.9.2', label: 'Recovery Hapus Buku',     route: '/transaksi/hapus-buku/recovery' },
        { num: '6.9.3', label: 'Hapus Tagih',             route: '/transaksi/hapus-buku/hapus-tagih' },
        { num: '6.10.1', label: 'Input AYDA',             route: '/transaksi/ayda/input' },
        { num: '6.11', label: 'Bayar Denda',              route: '/transaksi/bayar-denda' },
        { num: '6.12.1', label: 'Pembatalan Registrasi',  route: '/transaksi/pembatalan/registrasi' },
      ],
    },
    {
      title: 'Data Jaminan', desc: 'Pengelolaan agunan',
      items: [
        { num: '7.0', label: 'Daftar Jaminan',            route: '/jaminan/daftar' },
        { num: '7.1', label: 'Jaminan Siap Ambil',        route: '/jaminan/siap-ambil' },
        { num: '7.2', label: 'Entri Jaminan Individual', route: '/jaminan/entri-individual' },
        { num: '7.3', label: 'Entri Jaminan Kolektif',   route: '/jaminan/entri-kolektif' },
      ],
    },
    {
      title: 'Otorisasi', desc: 'Maker-checker approval',
      items: [
        { num: '8.0', label: 'Antrian Otorisasi', route: '/otorisasi' },
      ],
    },
  ];

  return (
    <>
      {/* Hero card with welcome + stats */}
      <div className="card">
        <h2 className="page__title">
          Prototype — Module Financing
          <span className="subtitle">
            Skenario demo aplikasi pembiayaan syariah · Dirancang berdasarkan dokumen menu dan referensi visual Figma · {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </h2>

        <div className="stats" style={{ marginTop: 24 }}>
          <div className="stat">
            <div className="stat__label">Menu Total</div>
            <div className="stat__value">73</div>
            <div className="stat__delta">9 grup utama, 7 sub-grup</div>
          </div>
          <div className="stat">
            <div className="stat__label">Skenario Demo</div>
            <div className="stat__value" style={{ color: 'var(--c-primary)' }}>7</div>
            <div className="stat__delta">Originasi · Servicing · Recovery</div>
          </div>
          <div className="stat">
            <div className="stat__label">Layar Hi-Fi</div>
            <div className="stat__value">25+</div>
            <div className="stat__delta">Form lengkap & popup menu</div>
          </div>
          <div className="stat">
            <div className="stat__label">Data Dummy</div>
            <div className="stat__value">100+</div>
            <div className="stat__delta">Nama, NIK, akad syariah ID</div>
          </div>
        </div>

        {/* Tips */}
        <div style={{
          background: 'var(--c-primary-soft)', border: '1px solid var(--c-primary-soft-border)',
          padding: '14px 18px', borderRadius: 8, marginTop: 24, display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <span style={{ color: 'var(--c-primary)', flexShrink: 0, marginTop: 2 }}
            dangerouslySetInnerHTML={{ __html: Icons.info(20) }} />
          <div style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--c-text)' }}>
            <strong>Cara navigasi:</strong> Gunakan rail ikon di kiri untuk berpindah modul, atau klik kartu skenario di bawah untuk menjalankan alur end-to-end.
            Tombol <code style={{ background: 'rgba(255,255,255,0.6)', padding: '1px 6px', borderRadius: 3, fontSize: 12 }}>⋯</code> pada setiap baris tabel berisi <strong>popup menu [P]</strong> sesuai dokumen menu.
            Buka panel <em>Tweaks</em> di pojok kanan-bawah untuk mengganti tenant, density, atau gaya popup.
          </div>
        </div>
      </div>

      {/* Skenario flows */}
      <div className="card">
        <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 4px' }}>Skenario Demo</h3>
        <p className="text-muted" style={{ margin: '0 0 24px', fontSize: 13.5 }}>
          7 alur end-to-end yang merangkum 73 menu di modul Financing.
        </p>

        {scenarios.map(s => (
          <div className="scenario" key={s.num}>
            <div className="scenario__head">
              <span className="scenario__num">{s.num}</span>
              <h4 className="scenario__title">{s.title}</h4>
            </div>
            <p className="scenario__desc">{s.desc}</p>
            <div className="flow">
              {s.flow.map((node, i) => (
                <React.Fragment key={i}>
                  <button
                    type="button"
                    className={'flow__node' + (node.start ? ' flow__node--start' : '') + (node.end ? ' flow__node--end' : '')}
                    onClick={() => onNavigate(node.route)}
                  >
                    <div className="num">{node.num}</div>
                    <div className="label">{node.label}</div>
                    <div className="desc">{node.desc}</div>
                  </button>
                  {i < s.flow.length - 1 && (
                    <div className="flow__arrow" dangerouslySetInnerHTML={{ __html: Icons.arrowR(18) }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Site map */}
      <div className="card">
        <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 4px' }}>Peta Menu Lengkap</h3>
        <p className="text-muted" style={{ margin: '0 0 24px', fontSize: 13.5 }}>
          Semua 73 menu yang dispesifikasikan, dikelompokkan per modul. Klik untuk membuka layar.
        </p>

        <div className="sitemap">
          {moduleSections.map(g => (
            <div className="sitemap__group" key={g.title}>
              <h4>{g.title}</h4>
              <p>{g.desc}</p>
              <div className="sitemap__items">
                {g.items.map(it => (
                  <button key={it.num + it.label} className="sitemap__item" onClick={() => onNavigate(it.route)}>
                    <span className="num">{it.num}</span>
                    <span>{it.label}</span>
                    {it.leaf && <span className="leaf">{it.leaf}</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* CSS conic-gradient donut with centered total + legend */
function Donut({ data, size = 150, thickness = 22, centerLabel, centerValue }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  let acc = 0;
  const stops = data.map(d => {
    const start = (acc / total) * 360;
    acc += d.value;
    const end = (acc / total) * 360;
    return `${d.color} ${start}deg ${end}deg`;
  }).join(', ');
  const hole = size - thickness * 2;
  return (
    <div className="donut-wrap">
      <div className="donut" style={{ width: size, height: size, background: `conic-gradient(${stops})` }}>
        <div className="donut__hole" style={{ width: hole, height: hole }}>
          {centerValue != null && <span className="donut__value">{centerValue}</span>}
          {centerLabel && <span className="donut__label">{centerLabel}</span>}
        </div>
      </div>
      <div className="donut__legend">
        {data.map((d, i) => (
          <div key={i} className="donut__legend-item">
            <span className="donut__dot" style={{ background: d.color }} />
            <span className="donut__legend-label">{d.label}</span>
            <span className="donut__legend-val">{d.display != null ? d.display : `${Math.round((d.value / total) * 100)}%`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TxCard({ icon, label, value, sub, tone }) {
  return (
    <div className="txcard">
      <div className={'txcard__icon' + (tone ? ` txcard__icon--${tone}` : '')} dangerouslySetInnerHTML={{ __html: Icons[icon](20) }} />
      <div className="txcard__body">
        <div className="txcard__label">{label}</div>
        <div className="txcard__value">{value}</div>
        <div className="txcard__sub">{sub}</div>
      </div>
    </div>
  );
}

const DASH_AKAD = {
  Murabahah: {
    kolek:  [{ label: 'Lancar', value: 812, color: '#24A148' }, { label: 'DPK', value: 96, color: '#F1C21B' }, { label: 'Kurang Lancar', value: 34, color: '#FF832B' }, { label: 'Diragukan', value: 12, color: '#FA4D56' }, { label: 'Macet', value: 21, color: '#DA1E28' }],
    tenor:  [{ label: '≤ 12 bln', value: 120, color: '#0F62FE' }, { label: '13–36 bln', value: 410, color: '#4589FF' }, { label: '37–60 bln', value: 320, color: '#78A9FF' }, { label: '> 60 bln', value: 125, color: '#A6C8FF' }],
    cabang: [{ label: 'Kantor Pusat', value: 380, color: '#012A4A' }, { label: 'Bandung', value: 240, color: '#0A6FB0' }, { label: 'Surabaya', value: 210, color: '#4589FF' }, { label: 'Lainnya', value: 145, color: '#A6C8FF' }],
    aging:  [{ label: 'Belum JT', value: 700, color: '#24A148' }, { label: '1–30 hr', value: 180, color: '#F1C21B' }, { label: '31–90 hr', value: 70, color: '#FF832B' }, { label: '> 90 hr', value: 25, color: '#DA1E28' }],
  },
  Musyarakah: {
    kolek:  [{ label: 'Lancar', value: 210, color: '#24A148' }, { label: 'DPK', value: 28, color: '#F1C21B' }, { label: 'Kurang Lancar', value: 9, color: '#FF832B' }, { label: 'Diragukan', value: 4, color: '#FA4D56' }, { label: 'Macet', value: 7, color: '#DA1E28' }],
    tenor:  [{ label: '≤ 12 bln', value: 40, color: '#0F62FE' }, { label: '13–36 bln', value: 110, color: '#4589FF' }, { label: '37–60 bln', value: 78, color: '#78A9FF' }, { label: '> 60 bln', value: 30, color: '#A6C8FF' }],
    cabang: [{ label: 'Kantor Pusat', value: 96, color: '#012A4A' }, { label: 'Bandung', value: 70, color: '#0A6FB0' }, { label: 'Surabaya', value: 58, color: '#4589FF' }, { label: 'Lainnya', value: 34, color: '#A6C8FF' }],
    aging:  [{ label: 'Belum JT', value: 200, color: '#24A148' }, { label: '1–30 hr', value: 38, color: '#F1C21B' }, { label: '31–90 hr', value: 14, color: '#FF832B' }, { label: '> 90 hr', value: 6, color: '#DA1E28' }],
  },
  MMQ: {
    kolek:  [{ label: 'Lancar', value: 145, color: '#24A148' }, { label: 'DPK', value: 18, color: '#F1C21B' }, { label: 'Kurang Lancar', value: 6, color: '#FF832B' }, { label: 'Diragukan', value: 3, color: '#FA4D56' }, { label: 'Macet', value: 4, color: '#DA1E28' }],
    tenor:  [{ label: '≤ 12 bln', value: 10, color: '#0F62FE' }, { label: '13–36 bln', value: 42, color: '#4589FF' }, { label: '37–60 bln', value: 86, color: '#78A9FF' }, { label: '> 60 bln', value: 38, color: '#A6C8FF' }],
    cabang: [{ label: 'Kantor Pusat', value: 64, color: '#012A4A' }, { label: 'Bandung', value: 48, color: '#0A6FB0' }, { label: 'Surabaya', value: 40, color: '#4589FF' }, { label: 'Lainnya', value: 24, color: '#A6C8FF' }],
    aging:  [{ label: 'Belum JT', value: 150, color: '#24A148' }, { label: '1–30 hr', value: 18, color: '#F1C21B' }, { label: '31–90 hr', value: 6, color: '#FF832B' }, { label: '> 90 hr', value: 2, color: '#DA1E28' }],
  },
  Ijarah: {
    kolek:  [{ label: 'Lancar', value: 88, color: '#24A148' }, { label: 'DPK', value: 11, color: '#F1C21B' }, { label: 'Kurang Lancar', value: 4, color: '#FF832B' }, { label: 'Diragukan', value: 2, color: '#FA4D56' }, { label: 'Macet', value: 3, color: '#DA1E28' }],
    tenor:  [{ label: '≤ 12 bln', value: 18, color: '#0F62FE' }, { label: '13–36 bln', value: 44, color: '#4589FF' }, { label: '37–60 bln', value: 32, color: '#78A9FF' }, { label: '> 60 bln', value: 14, color: '#A6C8FF' }],
    cabang: [{ label: 'Kantor Pusat', value: 38, color: '#012A4A' }, { label: 'Bandung', value: 28, color: '#0A6FB0' }, { label: 'Surabaya', value: 24, color: '#4589FF' }, { label: 'Lainnya', value: 18, color: '#A6C8FF' }],
    aging:  [{ label: 'Belum JT', value: 86, color: '#24A148' }, { label: '1–30 hr', value: 14, color: '#F1C21B' }, { label: '31–90 hr', value: 5, color: '#FF832B' }, { label: '> 90 hr', value: 1, color: '#DA1E28' }],
  },
};

const DASH_RANGE = {
  'Hari Ini':       { pencairan: 'Rp 2,1 M', pencairanN: '6 transaksi',  angsuran: 'Rp 1,4 M', angsuranN: '58 transaksi',  pelunasan: 'Rp 320 Jt', pelunasanN: '2 transaksi', denda: 'Rp 12 Jt', dendaN: '7 transaksi' },
  '7 Hari Terakhir':{ pencairan: 'Rp 11,7 M', pencairanN: '24 transaksi', angsuran: 'Rp 7,9 M', angsuranN: '286 transaksi', pelunasan: 'Rp 1,8 M', pelunasanN: '5 transaksi', denda: 'Rp 74 Jt', dendaN: '28 transaksi' },
  'Bulan Ini':      { pencairan: 'Rp 42,8 M', pencairanN: '87 transaksi', angsuran: 'Rp 28,4 M', angsuranN: '1.204 transaksi', pelunasan: 'Rp 6,2 M', pelunasanN: '14 transaksi', denda: 'Rp 312 Jt', dendaN: '96 transaksi' },
};

function DashboardScreen({ onNavigate }) {
  const [range, setRange] = React.useState('Bulan Ini');
  const [akad, setAkad] = React.useState('Murabahah');
  const r = DASH_RANGE[range];
  const a = DASH_AKAD[akad];

  const outstandingDist = [
    { label: 'Murabahah', value: 491, color: '#0F62FE', display: 'Rp 491 M' },
    { label: 'Musyarakah', value: 186, color: '#4589FF', display: 'Rp 186 M' },
    { label: 'MMQ', value: 102, color: '#78A9FF', display: 'Rp 102 M' },
    { label: 'Ijarah', value: 68, color: '#A6C8FF', display: 'Rp 68 M' },
  ];

  return (
    <div className="card">
      <div className="dash-head">
        <h2 className="page__title" style={{ margin: 0 }}>
          Financing Dashboard
          <span className="subtitle">Ringkasan transaksi, rekening &amp; portofolio pembiayaan</span>
        </h2>
        <div className="seg">
          {['Hari Ini', '7 Hari Terakhir', 'Bulan Ini'].map(opt => (
            <button key={opt} type="button"
              className={'seg__opt' + (range === opt ? ' seg__opt--active' : '')}
              onClick={() => setRange(opt)}>{opt}</button>
          ))}
        </div>
      </div>

      {/* ─────────── Laporan Transaksi ─────────── */}
      <h3 className="dash-section">Laporan Transaksi</h3>
      <div className="txgrid">
        <TxCard icon="money"     tone="blue"  label="Total Pencairan"        value={r.pencairan} sub={r.pencairanN} />
        <TxCard icon="finance"   tone="green" label="Angsuran Diterima"      value={r.angsuran}  sub={r.angsuranN} />
        <TxCard icon="checkmark" tone="teal"  label="Pelunasan Dipercepat"   value={r.pelunasan} sub={r.pelunasanN} />
        <TxCard icon="warning"   tone="amber" label="Denda Terkumpul"        value={r.denda}     sub={r.dendaN} />
      </div>

      {/* ─────────── Laporan Rekening dan Fasilitas ─────────── */}
      <h3 className="dash-section">Laporan Rekening dan Fasilitas</h3>
      <div className="dash-rf">
        <div className="dash-rf__stats">
          <div className="ministat"><div className="ministat__label">Rekening Aktif</div><div className="ministat__value">1.247</div></div>
          <div className="ministat"><div className="ministat__label">Fasilitas Aktif</div><div className="ministat__value">342</div></div>
          <div className="ministat"><div className="ministat__label">Lunas Bulan Ini</div><div className="ministat__value" style={{ color: 'var(--c-success)' }}>38</div></div>
          <div className="ministat"><div className="ministat__label">Menunggu Pencairan</div><div className="ministat__value" style={{ color: 'var(--c-warning-text, #8A6D00)' }}>12</div></div>
          <div className="ministat"><div className="ministat__label">NPF Ratio</div><div className="ministat__value" style={{ color: 'var(--c-error)' }}>3,21%</div></div>
          <div className="ministat"><div className="ministat__label">Total Plafond</div><div className="ministat__value">Rp 1,02 T</div></div>
        </div>
        <div className="dash-card dash-card--chart">
          <div className="dash-card__title">Distribusi Outstanding per Akad</div>
          <Donut data={outstandingDist} size={170} thickness={26} centerValue="Rp 847 M" centerLabel="Total" />
        </div>
      </div>

      {/* ─────────── Statistik Rekening Pembiayaan ─────────── */}
      <div className="dash-section-row">
        <h3 className="dash-section" style={{ margin: 0 }}>Statistik Rekening Pembiayaan</h3>
        <div className="row gap-12" style={{ alignItems: 'center' }}>
          <span className="text-sm text-muted">Akad Pembiayaan :</span>
          <div style={{ minWidth: 200 }}>
            <Select value={akad} onChange={setAkad} options={['Murabahah', 'Musyarakah', 'MMQ', 'Ijarah']} />
          </div>
        </div>
      </div>

      <div className="dash-donutgrid">
        <div className="dash-card"><div className="dash-card__title">Kolektibilitas</div><Donut data={a.kolek} /></div>
        <div className="dash-card"><div className="dash-card__title">Distribusi Tenor</div><Donut data={a.tenor} /></div>
        <div className="dash-card"><div className="dash-card__title">Distribusi Cabang</div><Donut data={a.cabang} /></div>
        <div className="dash-card"><div className="dash-card__title">Aging Tunggakan</div><Donut data={a.aging} /></div>
      </div>

      {/* ─────────── Antrian Otorisasi ─────────── */}
      <h3 className="dash-section">Antrian Otorisasi Terbaru</h3>
      <DataTable
        showSearch={false}
        showPagination={false}
        columns={[
          { key: 'id',       label: 'ID',       width: 140, render: r => <span className="mono">{r.id}</span> },
          { key: 'tipe',     label: 'Tipe' },
          { key: 'nasabah',  label: 'Nasabah' },
          { key: 'nominal',  label: 'Nominal', align: 'right', render: r => <span className="mono">{window.fmtRp(r.nominal)}</span> },
          { key: 'maker',    label: 'Maker',    render: r => <span className="mono">{r.maker}</span> },
          { key: 'tglInput', label: 'Waktu Input', render: r => <span className="mono">{r.tglInput}</span> },
        ]}
        data={window.MOCK_OTORISASI}
        onRowClick={() => onNavigate('/otorisasi')}
      />
    </div>
  );
}

Object.assign(window, { OverviewScreen, DashboardScreen });
