/* screens-misc.jsx — Jaminan, Master Data, Produk Parameter, Otorisasi, fallback */

/* ─────────── Daftar Jaminan ─────────── */
function DaftarJaminanScreen({ onNavigate, popupStyle, showToast }) {
  const [drawer, setDrawer] = React.useState(null);
  const popupItems = [
    { id: 'detail',   label: 'Lihat Detail Agunan',  icon: 'view' },
    { id: 'edit',     label: 'Edit Data Jaminan',     icon: 'edit' },
    { id: 'koreksi',  label: 'Koreksi Nilai Appraisal', icon: 'refresh' },
    { id: 'dokumen',  label: 'Kelola Dokumen',        icon: 'doc' },
    { sep: true },
    { id: 'release',  label: 'Release / Bebaskan',    icon: 'lock' },
    { id: 'hapus',    label: 'Hapus Jaminan',          icon: 'trash', danger: true },
  ];

  return (
    <>
      <div className="card">
        <h2 className="page__title">
          Daftar Jaminan
          <span className="subtitle">Master data agunan / jaminan terhadap fasilitas pembiayaan</span>
        </h2>

        <div className="stats" style={{ marginTop: 20 }}>
          <div className="stat">
            <div className="stat__label">Total Jaminan</div>
            <div className="stat__value">{window.MOCK_JAMINAN.length}</div>
          </div>
          <div className="stat">
            <div className="stat__label">Total Nilai Jaminan</div>
            <div className="stat__value">{window.fmtRpShort(window.MOCK_JAMINAN.reduce((s, j) => s + j.nilai, 0))}</div>
          </div>
          <div className="stat">
            <div className="stat__label">Status Diikat</div>
            <div className="stat__value stat__value--pos">{window.MOCK_JAMINAN.filter(j => j.status === 'Diikat').length}</div>
          </div>
          <div className="stat">
            <div className="stat__label">Pending / Release</div>
            <div className="stat__value">{window.MOCK_JAMINAN.filter(j => j.status !== 'Diikat' && j.status !== 'Aktif').length}</div>
          </div>
        </div>

        <DataTable
          columns={[
            { key: 'noJaminan', label: 'No. Jaminan', sort: true, render: r => <span className="mono">{r.noJaminan}</span> },
            { key: 'noNasabah', label: 'No. Nasabah', render: r => <span className="mono">{r.noNasabah}</span> },
            { key: 'nama', label: 'Nama Nasabah' },
            { key: 'jenis', label: 'Jenis Jaminan', sort: true },
            { key: 'nilai', label: 'Nilai Appraisal', align: 'right', render: r => <span className="mono">{window.fmtRp(r.nilai)}</span> },
            { key: 'appraisal', label: 'Lembaga Penilai' },
            { key: 'tglAppraisal', label: 'Tgl. Appraisal', render: r => <span className="mono">{r.tglAppraisal}</span> },
            { key: 'status', label: 'Status', render: r => <StatusTag status={r.status} /> },
          ]}
          data={window.MOCK_JAMINAN}
          popupItems={popupStyle === 'menu' ? popupItems : null}
          onPopupClick={(row, id) => {
            if (id === 'detail') {
              onNavigate(`/jaminan/detail?kode=${encodeURIComponent(row.noJaminan)}`);
              return;
            }
            showToast({ type: 'success', title: popupItems.find(p => p.id === id)?.label, message: `Jaminan ${row.noJaminan}` });
          }}
          onRowClick={popupStyle === 'drawer' ? row => setDrawer(row) : null}
          toolbarActions={
            <>
              <button className="btn btn--neutral btn--sm" onClick={() => onNavigate('/jaminan/entri-kolektif')}>
                <span dangerouslySetInnerHTML={{ __html: Icons.list(14) }} />
                Entri Kolektif
              </button>
              <button className="btn btn--primary btn--sm" onClick={() => onNavigate('/jaminan/entri-individual')}>
                <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
                Tambah Jaminan
              </button>
            </>
          }
        />
      </div>

      {drawer && <DetailJaminanModal jaminan={drawer} onClose={() => setDrawer(null)} />}
    </>
  );
}

function DetailJaminanModal({ jaminan, onClose }) {
  return (
    <Modal
      title={`Detail Agunan — ${jaminan.noJaminan}`}
      subtitle={jaminan.jenis}
      onClose={onClose}
      size="lg"
      footer={
        <>
          <button className="btn btn--neutral" onClick={onClose}>Tutup</button>
          <button className="btn btn--primary">
            <span dangerouslySetInnerHTML={{ __html: Icons.edit(14) }} />
            Edit Jaminan
          </button>
        </>
      }
    >
      <FormGrid cols={3}>
        <Disp label="No. Jaminan" value={jaminan.noJaminan} mono />
        <Disp label="No. Nasabah" value={jaminan.noNasabah} mono />
        <Disp label="Nama Nasabah" value={jaminan.nama} />
        <Disp label="Jenis Jaminan" value={jaminan.jenis} />
        <Disp label="Cabang" value={jaminan.cabang} />
        <div className="disp">
          <div className="disp__label">Status</div>
          <div><StatusTag status={jaminan.status} /></div>
        </div>
      </FormGrid>

      <h4 className="section-title">Penilaian</h4>
      <FormGrid cols={3}>
        <Disp label="Nilai Appraisal" value={window.fmtRp(jaminan.nilai)} mono />
        <Disp label="Lembaga Penilai" value={jaminan.appraisal} />
        <Disp label="Tanggal Appraisal" value={jaminan.tglAppraisal} mono />
        <Disp label="Nilai Pasar" value={window.fmtRp(jaminan.nilai * 1.1)} mono />
        <Disp label="Nilai Likuidasi" value={window.fmtRp(jaminan.nilai * 0.7)} mono />
        <Disp label="LTV Rasio" value="75%" />
      </FormGrid>

      <h4 className="section-title">Dokumen Pendukung</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {['SHM-1024.pdf', 'Surat Kuasa Membebani Hak Tanggungan.pdf', 'Akta Notaris APHT.pdf', 'Foto Lokasi (12).zip'].map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', border: '1px solid var(--c-border-soft)', borderRadius: 6 }}>
            <span style={{ color: 'var(--c-primary)' }} dangerouslySetInnerHTML={{ __html: Icons.doc(18) }} />
            <span style={{ flex: 1, fontSize: 13 }}>{d}</span>
            <button className="icon-btn" dangerouslySetInnerHTML={{ __html: Icons.download(14) }} />
          </div>
        ))}
      </div>
    </Modal>
  );
}

/* ─────────── Master Data List (generic for instansi/vendor/etc) ─────────── */
function MasterDataScreen({ onNavigate, popupStyle, showToast, type='instansi' }) {
  const datasets = {
    instansi: { title: 'Data Instansi',  data: window.MOCK_INSTANSI, addLabel: 'Tambah Instansi', cols: ['kode', 'nama', 'alamat', 'pic', 'telp', 'status'] },
    vendor:   { title: 'Data Vendor',    data: window.MOCK_VENDOR,   addLabel: 'Tambah Vendor',   cols: ['kode', 'nama', 'kategori', 'npwp', 'telp', 'status'] },
  };
  const cfg = datasets[type] || datasets.instansi;
  const labels = {
    kode: 'Kode', nama: 'Nama', alamat: 'Alamat', pic: 'PIC', telp: 'Telepon', status: 'Status',
    kategori: 'Kategori', npwp: 'NPWP',
  };

  return (
    <div className="card">
      <h2 className="page__title">{cfg.title}</h2>
      <DataTable
        columns={cfg.cols.map(k => ({
          key: k,
          label: labels[k] || k,
          sort: ['kode', 'nama'].includes(k),
          render: r => k === 'status' ? <StatusTag status={r[k]} />
                     : (k === 'kode' || k === 'npwp' || k === 'telp') ? <span className="mono">{r[k]}</span>
                     : r[k],
        }))}
        data={cfg.data}
        popupItems={[
          { id: 'edit', label: 'Edit Data', icon: 'edit' },
          { id: 'view', label: 'Lihat Detail', icon: 'view' },
          { id: 'copy', label: 'Duplikat',  icon: 'copy' },
          { sep: true },
          { id: 'hapus', label: 'Hapus', icon: 'trash', danger: true },
        ]}
        onPopupClick={(row, id) => showToast({ type: 'success', title: `Aksi: ${id}`, message: `${row.nama}` })}
        toolbarActions={
          <button className="btn btn--primary btn--sm" onClick={() => showToast({ type: 'success', title: 'Form tambah dibuka' })}>
            <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
            {cfg.addLabel}
          </button>
        }
      />
    </div>
  );
}

/* ─────────── Produk Pembiayaan ─────────── */
function ProdukPembiayaanScreen({ onNavigate, popupStyle, showToast }) {
  return (
    <div className="card">
      <h2 className="page__title">
        Produk Pembiayaan
        <span className="subtitle">Definisi produk dan parameter operasionalnya</span>
      </h2>

      <DataTable
        columns={[
          { key: 'kode',       label: 'Kode',  width: 80, sort: true, render: r => <span className="mono">{r.kode}</span> },
          { key: 'nama',       label: 'Nama Produk', sort: true },
          { key: 'akad',       label: 'Akad', width: 110, render: r => <span className="tag tag--info">{r.akad}</span> },
          { key: 'plafond',    label: 'Range Plafond', render: r => <span className="mono text-sm">{window.fmtRpShort(r.minPlafond)} — {window.fmtRpShort(r.maxPlafond)}</span> },
          { key: 'tenor',      label: 'Tenor', render: r => <span className="mono">{r.minTenor}–{r.maxTenor} bln</span> },
          { key: 'margin',     label: 'Margin', render: r => <span className="mono">{r.marginMin}% – {r.marginMax}%</span> },
          { key: 'status',     label: 'Status', render: r => <StatusTag status={r.status} /> },
        ]}
        data={window.MOCK_PRODUK_PEMBIAYAAN}
        popupItems={[
          { id: 'detail', label: 'Lihat Detail',          icon: 'view' },
          { id: 'edit',   label: 'Edit Produk',           icon: 'edit' },
          { sep: true },
          { id: 'aktif',  label: 'Toggle Aktif/Non-Aktif', icon: 'lock' },
        ]}
        onPopupClick={(row, id) => {
          const kode = encodeURIComponent(row.kode);
          if (id === 'detail') { onNavigate(`/produk/pembiayaan/detail?kode=${kode}`); return; }
          if (id === 'edit')   { onNavigate(`/produk/pembiayaan/edit?kode=${kode}`);   return; }
          showToast({ type: 'success', title: id, message: `${row.kode} — ${row.nama}` });
        }}
        toolbarActions={
          <button className="btn btn--primary btn--sm" onClick={() => onNavigate('/produk/pembiayaan/new')}>
            <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
            Tambah Produk
          </button>
        }
      />
    </div>
  );
}

/* ─────────── Detail Produk Pembiayaan ─────────── */
function getProdukDetail(kode) {
  const row = window.MOCK_PRODUK_PEMBIAYAAN.find(p => p.kode === kode) || window.MOCK_PRODUK_PEMBIAYAAN[0];
  // Build a full detail view from the list row + sensible mock defaults so the
  // page renders the same information shape as the new/edit form.
  return {
    kode:    row.kode,
    nama:    row.nama,
    akad:    row.akad,
    valuta:  'IDR',
    status:  row.status,
    // Info Umum
    poolOfFund:          '000 - Default',
    produkMikro:         true,
    restriksiProduk:     true,
    kelonggaranHariKolek:'-',
    kodeKonfidential:    '-',
    // Parameter pembiayaan
    tipeAkru:            'Akrual Harian',
    targetEqvRate:       row.marginMin ? `${row.marginMin}%` : '-',
    bisaUbahEqvRate:     'Dengan Persetujuan',
    defaultPeriode:      row.maxTenor ? String(row.maxTenor) : '-',
    minPeriodeCount:     row.minTenor ? String(row.minTenor) : '-',
    limitMin:            row.minPlafond ? window.fmtRp(row.minPlafond) : '-',
    limitMax:            row.maxPlafond ? window.fmtRp(row.maxPlafond) : '-',
    kelengkapanData:     'Wajib Lengkap',
    menggunakanJaminan:  'Wajib',
    autoPayment:         'Auto Debit Tabungan',
    autoDebitDenda:      true,
    // Parameter Biaya
    biaya: [
      { jenis: 'Biaya Administrasi', amortisasi: 'True',  noRek: '41274128312', namaRek: 'Pend. Admin PYD - PMK - ' + row.akad },
      { jenis: 'Biaya Provisi',      amortisasi: 'True',  noRek: '41274128313', namaRek: 'Pend. Provisi - ' + row.akad },
      { jenis: 'Biaya Materai',      amortisasi: 'False', noRek: '11001000010', namaRek: 'Cash - Materai' },
    ],
    // Parameter Denda
    aktifkanDenda:       'Aktif',
    metodeDenda:         'Persentase Harian',
    graceDayDenda:       '3 Hari',
    tarifTazir:          '0.05% / hari',
    tarifTawid:          '0.025% / hari',
    maksDenda:           '5% dari sisa pokok angsuran',
    rekeningPendapatanDenda: "8001 - Pendapatan Denda Ta'zir",
    rekeningKewajibanTawid:  "2901 - Kewajiban Ta'wid",
    // GL Interface — mapping kode_tx_class → kode_gl
    glInterface: window.buildGlInterfaceRows(row.akad),
  };
}

function DetailProdukPembiayaanScreen({ onNavigate, showToast, kode }) {
  const d = React.useMemo(() => getProdukDetail(kode), [kode]);
  const [tab, setTab] = React.useState('info');

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Detail Produk Pembiayaan
      </h2>

      {/* Hero card: kode + nama + Akad / Valuta / Status */}
      <div className="hl-card">
        <div className="disp">
          <div className="disp__label mono" style={{ marginBottom: 4 }}>{d.kode}</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--c-text)' }}>{d.nama}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 16 }}>
          <Disp label="Akad Pembiayaan" value={d.akad} />
          <Disp label="Valuta" value={d.valuta} />
          <div className="disp">
            <div className="disp__label">Status</div>
            <div><StatusTag status={d.status} /></div>
          </div>
        </div>
      </div>

      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'info',   label: 'Informasi Detail' },
          { id: 'biaya',  label: 'Parameter Biaya' },
          { id: 'denda',  label: 'Parameter Denda' },
          { id: 'gl',     label: 'GL Interface' },
        ]}
      />

      {tab === 'info' && (
        <>
          <h4 className="section-title" style={{ marginTop: 0 }}>Info Umum</h4>
          <FormGrid>
            <Disp label="Pool of Fund" value={d.poolOfFund} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 4 }}>
              <label className="cbx" style={{ pointerEvents: 'none' }}>
                <input type="checkbox" checked={d.produkMikro} readOnly />
                Produk Mikro
              </label>
              <label className="cbx" style={{ pointerEvents: 'none' }}>
                <input type="checkbox" checked={d.restriksiProduk} readOnly />
                Restriksi Produk
              </label>
            </div>

            <Disp label="Kelonggaran Hari Kolek" value={d.kelonggaranHariKolek} />
            <div></div>

            <Disp label="Kode Konfidential" value={d.kodeKonfidential} />
          </FormGrid>

          <hr className="section-divider" />

          <FormGrid cols={3}>
            <Disp label="Tipe Akru" value={d.tipeAkru} />
            <Disp label="Default Periode" value={d.defaultPeriode} mono />
            <Disp label="Kelengkapan Data" value={d.kelengkapanData} />

            <Disp label="Target Eqv Rate" value={d.targetEqvRate} mono />
            <Disp label="Minimal Periode Count" value={d.minPeriodeCount} mono />
            <Disp label="Menggunakan Jaminan" value={d.menggunakanJaminan} />

            <Disp label="Bisa ubah Eqv Rate" value={d.bisaUbahEqvRate} />
            <Disp label="Nilai Limit Min" value={d.limitMin} mono />
            <Disp label="Auto Payment" value={d.autoPayment} />

            <div></div>
            <Disp label="Nilai Limit Max" value={d.limitMax} mono />
            <label className="cbx" style={{ pointerEvents: 'none', alignSelf: 'flex-end', paddingBottom: 6 }}>
              <input type="checkbox" checked={d.autoDebitDenda} readOnly />
              Auto Debit Denda
            </label>
          </FormGrid>
        </>
      )}

      {tab === 'biaya' && (
        <>
          <h4 className="section-title" style={{ marginTop: 0 }}>List Parameter Biaya</h4>
          <table className="tbl">
            <thead>
              <tr>
                <th>Elemen Biaya</th>
                <th>Status Amortisasi</th>
                <th>No Rekening GL</th>
                <th>Nama Rekening GL</th>
                <th style={{ width: 48 }}></th>
              </tr>
            </thead>
            <tbody>
              {d.biaya.map((b, i) => (
                <tr key={i}>
                  <td>{b.jenis}</td>
                  <td>{b.amortisasi}</td>
                  <td className="mono">{b.noRek}</td>
                  <td>{b.namaRek}</td>
                  <td className="text-right">
                    <button className="icon-btn" title="Lihat" dangerouslySetInnerHTML={{ __html: Icons.overflow(16) }}
                      onClick={() => showToast({ type: 'success', title: 'Detail biaya', message: b.jenis })} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {tab === 'gl' && (
        <>
          <h4 className="section-title" style={{ marginTop: 0 }}>Mapping GL Interface — {d.akad}</h4>
          <p className="text-muted text-sm" style={{ margin: '0 0 16px' }}>
            Pemetaan <span className="mono">kode_tx_class</span> (jenis mutasi pada detil transaksi) ke rekening GL yang akan di-posting saat transaksi pembiayaan berjalan.
          </p>
          <table className="tbl">
            <thead>
              <tr>
                <th style={{ width: 140 }}>Kode Tx Class</th>
                <th>Deskripsi</th>
                <th style={{ width: 110 }}>Account Type</th>
                <th style={{ width: 150 }}>Kode GL</th>
                <th>Nama GL</th>
              </tr>
            </thead>
            <tbody>
              {d.glInterface.map((g, i) => (
                <tr key={i}>
                  <td className="mono">{g.kodeTxClass}</td>
                  <td>{g.deskripsi}</td>
                  <td><span className="tag tag--neutral">{g.accountType}</span></td>
                  <td className="mono">{g.kodeGl || <span className="text-muted">-</span>}</td>
                  <td>{g.namaGl || <span className="text-muted">-</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {tab === 'denda' && (
        <>
          <h4 className="section-title" style={{ marginTop: 0 }}>Parameter Denda Keterlambatan</h4>
          <FormGrid cols={3}>
            <Disp label="Status Denda" value={d.aktifkanDenda} />
            <Disp label="Metode Perhitungan" value={d.metodeDenda} />
            <Disp label="Grace Day" value={d.graceDayDenda} mono />

            <Disp label="Tarif Ta'zir" value={d.tarifTazir} mono />
            <Disp label="Tarif Ta'wid" value={d.tarifTawid} mono />
            <Disp label="Maksimal Denda" value={d.maksDenda} mono />
          </FormGrid>

          <hr className="section-divider" />

          <FormGrid>
            <Disp label="Rekening Pendapatan Denda (Ta'zir)" value={d.rekeningPendapatanDenda} mono />
            <Disp label="Rekening Kewajiban Ta'wid" value={d.rekeningKewajibanTawid} mono />
          </FormGrid>
        </>
      )}

      <div className="btn-bar btn-bar--between" style={{ marginTop: 24 }}>
        <button className="btn btn--neutral" onClick={() => onNavigate('/produk/pembiayaan')}>
          <span dangerouslySetInnerHTML={{ __html: Icons.arrowL(14) }} />
          Kembali
        </button>
        <div className="row gap-12">
          <button className="btn btn--secondary" onClick={() => onNavigate(`/produk/pembiayaan/edit?kode=${encodeURIComponent(d.kode)}`)}>
            <span dangerouslySetInnerHTML={{ __html: Icons.edit(14) }} />
            Edit Produk
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── New / Edit Produk Pembiayaan (form 3-section) ─────────── */
function NewProdukPembiayaanScreen({ onNavigate, showToast, mode = 'new', kode }) {
  const isEdit = mode === 'edit';
  const [section, setSection] = React.useState('s1');
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  // When editing, pre-fill the form from the selected row.
  const initialForm = React.useMemo(() => {
    if (!isEdit) return null;
    const row = window.MOCK_PRODUK_PEMBIAYAAN.find(p => p.kode === kode) || window.MOCK_PRODUK_PEMBIAYAAN[0];
    return {
      kodeProduk: row.kode,
      namaProduk: row.nama,
      akad: row.akad,
      defaultPeriode:  row.maxTenor ? String(row.maxTenor) : '',
      minPeriodeCount: row.minTenor ? String(row.minTenor) : '',
      limitMin:        row.minPlafond ? String(row.minPlafond) : '',
      limitMax:        row.maxPlafond ? String(row.maxPlafond) : '',
      targetEqvRate:   row.marginMin ? String(row.marginMin) : '',
      status:          row.status,
      glInterface:    window.buildGlInterfaceRows(row.akad),
    };
  }, [isEdit, kode]);

  const [form, setForm] = React.useState({
    // Data Produk
    kodeProduk: 'ISH1',
    namaProduk: 'Istishna BCAS',
    akad: 'Istishna',
    poolOfFund: '000 - Default',
    droppingModel: 'All at once',
    kodeValuta: 'IDR',
    kelonggaranHariKolek: '',
    kodeKonfidential: '',
    produkMikro: true,
    restriksiProduk: true,
    status: 'Aktif',
    tipeAkru: '',
    targetEqvRate: '',
    bisaUbahEqvRate: '',
    defaultPeriode: '',
    minPeriodeCount: '',
    limitMin: '',
    limitMax: '',
    kelengkapanData: '',
    menggunakanJaminan: '',
    autoPayment: '',
    autoDebitDenda: true,

    // Parameter Biaya
    biaya: [
      { jenis: 'Biaya Administrasi', metode: 'Fixed',     nominal: '500000',  persen: '0',   flag: 'Debet', rekening: 'Sumber Biaya' },
      { jenis: 'Biaya Provisi',      metode: 'Persentase', nominal: '0',       persen: '1',   flag: 'Debet', rekening: 'Sumber Biaya' },
      { jenis: 'Biaya Materai',      metode: 'Fixed',     nominal: '10000',   persen: '0',   flag: 'Debet', rekening: 'Cash' },
    ],

    // Parameter Denda
    aktifkanDenda: true,
    metodeDenda: 'Persentase Harian',
    tarifTazir: '0.05',
    tarifTawid: '0.025',
    graceDayDenda: '3',
    maksDenda: '5',
    rekeningPendapatanDenda: '8001 - Pendapatan Denda Ta\'zir',
    rekeningKewajibanTawid: '2901 - Kewajiban Ta\'wid',

    // GL Interface — mapping kode_tx_class → kode_gl (default by akad)
    glInterface: window.buildGlInterfaceRows('Istishna'),
  });

  // Apply edit-mode pre-fill once on mount when editing.
  React.useEffect(() => {
    if (initialForm) setForm(f => ({ ...f, ...initialForm }));
  }, [initialForm]);

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // When akad changes (and user is not currently editing GL rows manually),
  // refresh the GL Interface defaults so the mapping shape matches the new akad.
  const akadRef = React.useRef(form.akad);
  React.useEffect(() => {
    if (akadRef.current !== form.akad) {
      akadRef.current = form.akad;
      setForm(f => ({ ...f, glInterface: window.buildGlInterfaceRows(form.akad) }));
    }
  }, [form.akad]);

  // Lookup state for the GL Interface section
  const [glLookup, setGlLookup] = React.useState(null); // { rowIndex, accountType } | null

  const sectionOrder = ['s1', 's2', 's3', 's4'];
  const goNext = () => {
    const i = sectionOrder.indexOf(section);
    if (i < sectionOrder.length - 1) setSection(sectionOrder[i + 1]);
    else setConfirmOpen(true);
  };
  const goPrev = () => {
    const i = sectionOrder.indexOf(section);
    if (i > 0) setSection(sectionOrder[i - 1]);
  };

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        {isEdit ? 'Edit Produk Pembiayaan' : 'New Produk Pembiayaan'}
      </h2>

      <SectionTabs
        value={section}
        onChange={setSection}
        tabs={[
          { id: 's1', label: 'Data Produk' },
          { id: 's2', label: 'Parameter Biaya' },
          { id: 's3', label: 'Parameter Denda' },
          { id: 's4', label: 'GL Interface' },
        ]}
      />

      {/* ─────────── Section 1: Data Produk ─────────── */}
      {section === 's1' && (
        <>
          <Field label="Kode Produk" required>
            <TextInput value={form.kodeProduk} onChange={v => setField('kodeProduk', v)} />
          </Field>
          <div style={{ marginTop: 16 }}>
            <Field label="Nama Produk" required>
              <TextInput value={form.namaProduk} onChange={v => setField('namaProduk', v)} />
            </Field>
          </div>

          <div style={{ marginTop: 16 }}>
            <FormGrid>
              <Field label="Akad Pembiayaan" required>
                <Select
                  value={form.akad}
                  onChange={v => setField('akad', v)}
                  options={['Murabahah', 'Mudharabah', 'Musyarakah', 'Ijarah', 'Istishna', 'Qardh', 'MMQ']}
                />
              </Field>
              <Field label="Pool of Fund" required>
                <Select
                  value={form.poolOfFund}
                  onChange={v => setField('poolOfFund', v)}
                  options={['000 - Default', 'POF-001 - Dana Pihak Ketiga', 'POF-002 - Dana Sendiri', 'POF-003 - Pinjaman Bank']}
                />
              </Field>

              <Field label="Dropping Model" required>
                <Select
                  value={form.droppingModel}
                  onChange={v => setField('droppingModel', v)}
                  options={['All at once', 'Bertahap (Tranche)', 'Sesuai Permintaan']}
                />
              </Field>
              <Field label="Kode Valuta" required>
                <Select value={form.kodeValuta} onChange={v => setField('kodeValuta', v)} options={['IDR', 'USD', 'SGD', 'EUR']} />
              </Field>

              <Field label="Kelonggaran Hari Kolek">
                <NumberInput
                  value={form.kelonggaranHariKolek}
                  onChange={v => setField('kelonggaranHariKolek', v)}
                  placeholder="0"
                  suffix="Hari"
                />
              </Field>
              <div></div>

              <Field label="Kode Konfidential">
                <TextInput
                  value={form.kodeKonfidential}
                  onChange={v => setField('kodeKonfidential', v)}
                  placeholder="Masukan kode konfidential"
                />
              </Field>
            </FormGrid>
          </div>

          <div style={{ display: 'flex', gap: 64, marginTop: 24 }}>
            <label className="cbx">
              <input type="checkbox" checked={form.produkMikro} onChange={e => setField('produkMikro', e.target.checked)} />
              Produk Mikro
            </label>
            <label className="cbx">
              <input type="checkbox" checked={form.restriksiProduk} onChange={e => setField('restriksiProduk', e.target.checked)} />
              Restriksi Produk
            </label>
          </div>

          <div style={{ marginTop: 24 }}>
            <Field label="Status" required>
              <div style={{ maxWidth: 'calc(50% - 12px)' }}>
                <Select
                  value={form.status}
                  onChange={v => setField('status', v)}
                  options={['Aktif', 'Tidak Aktif', 'Draft']}
                />
              </div>
            </Field>
          </div>

          <hr className="section-divider" />

          <Field label="Tipe Akru">
            <Select
              value={form.tipeAkru}
              onChange={v => setField('tipeAkru', v)}
              options={['Akrual Harian', 'Akrual Bulanan', 'Tidak Diakru']}
              placeholder="-- Pilih --"
            />
          </Field>

          <div style={{ marginTop: 16 }}>
            <FormGrid>
              <Field label="Target Eqv Rate">
                <NumberInput
                  value={form.targetEqvRate}
                  onChange={v => setField('targetEqvRate', v)}
                  placeholder="0"
                  suffix="%"
                />
              </Field>
              <Field label="Bisa ubah Eqv Rate">
                <Select
                  value={form.bisaUbahEqvRate}
                  onChange={v => setField('bisaUbahEqvRate', v)}
                  options={['Ya', 'Tidak', 'Dengan Persetujuan']}
                  placeholder="-- Pilih --"
                />
              </Field>

              <Field label="Default Periode">
                <NumberInput value={form.defaultPeriode} onChange={v => setField('defaultPeriode', v)} placeholder="0" />
              </Field>
              <Field label="Minimal Periode Count">
                <NumberInput value={form.minPeriodeCount} onChange={v => setField('minPeriodeCount', v)} placeholder="0" />
              </Field>

              <Field label="Nilai Limit Min">
                <CurrencyInput value={form.limitMin} onChange={v => setField('limitMin', v)} placeholder="0" />
              </Field>
              <Field label="Nilai Limit Max">
                <CurrencyInput value={form.limitMax} onChange={v => setField('limitMax', v)} placeholder="0" />
              </Field>

              <Field label="Kelengkapan Data">
                <Select
                  value={form.kelengkapanData}
                  onChange={v => setField('kelengkapanData', v)}
                  options={['Wajib Lengkap', 'Boleh Bertahap', 'Tidak Diperlukan']}
                  placeholder="-- Pilih --"
                />
              </Field>
              <Field label="Menggunakan Jaminan">
                <Select
                  value={form.menggunakanJaminan}
                  onChange={v => setField('menggunakanJaminan', v)}
                  options={['Wajib', 'Opsional', 'Tidak Diperlukan']}
                  placeholder="-- Pilih --"
                />
              </Field>

              <Field label="Auto Payment">
                <Select
                  value={form.autoPayment}
                  onChange={v => setField('autoPayment', v)}
                  options={['Auto Debit Tabungan', 'Auto Debit Giro', 'Manual']}
                  placeholder="-- Pilih --"
                />
              </Field>
              <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 10 }}>
                <label className="cbx">
                  <input type="checkbox" checked={form.autoDebitDenda} onChange={e => setField('autoDebitDenda', e.target.checked)} />
                  Auto Debit Denda
                </label>
              </div>
            </FormGrid>
          </div>

          <div className="btn-bar btn-bar--between">
            <button className="btn btn--danger" style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }}
              onClick={() => onNavigate('/produk/pembiayaan')}>Batal</button>
            <div className="row gap-12">
              <button className="btn btn--secondary" disabled style={{ color: 'var(--c-text-placeholder)', borderColor: 'var(--c-border)' }}>Sebelumnya</button>
              <button className="btn btn--secondary" onClick={goNext}>
                Selanjutnya
              </button>
            </div>
          </div>
        </>
      )}

      {/* ─────────── Section 2: Parameter Biaya ─────────── */}
      {section === 's2' && (
        <>
          <div className="row row--between mb-16">
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Daftar Biaya Default Produk</h3>
            <button className="btn btn--secondary btn--sm"
              onClick={() => setForm(f => ({ ...f, biaya: [...f.biaya, { jenis: '', metode: 'Fixed', nominal: '0', persen: '0', flag: 'Debet', rekening: 'Sumber Biaya' }] }))}>
              <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
              Tambah Biaya
            </button>
          </div>

          <table className="tbl">
            <thead>
              <tr>
                <th style={{ width: 50 }}>No</th>
                <th>Jenis Biaya</th>
                <th>Metode</th>
                <th>Nominal</th>
                <th>Persen (%)</th>
                <th>Flag</th>
                <th>Rekening Pembebanan</th>
                <th style={{ width: 60 }}></th>
              </tr>
            </thead>
            <tbody>
              {form.biaya.map((b, i) => (
                <tr key={i}>
                  <td className="mono">{i + 1}</td>
                  <td>
                    <Select
                      value={b.jenis}
                      onChange={v => setForm(f => { const a = [...f.biaya]; a[i] = { ...a[i], jenis: v }; return { ...f, biaya: a }; })}
                      options={['Biaya Administrasi', 'Biaya Provisi', 'Biaya Notaris', 'Biaya Asuransi', 'Biaya Materai', 'Biaya Appraisal']}
                    />
                  </td>
                  <td>
                    <Select
                      value={b.metode}
                      onChange={v => setForm(f => { const a = [...f.biaya]; a[i] = { ...a[i], metode: v }; return { ...f, biaya: a }; })}
                      options={['Fixed', 'Persentase']}
                    />
                  </td>
                  <td>
                    <CurrencyInput
                      value={b.nominal}
                      onChange={v => setForm(f => { const a = [...f.biaya]; a[i] = { ...a[i], nominal: v }; return { ...f, biaya: a }; })}
                    />
                  </td>
                  <td>
                    <NumberInput
                      value={b.persen}
                      onChange={v => setForm(f => { const a = [...f.biaya]; a[i] = { ...a[i], persen: v }; return { ...f, biaya: a }; })}
                      suffix="%"
                    />
                  </td>
                  <td>
                    <Select
                      value={b.flag}
                      onChange={v => setForm(f => { const a = [...f.biaya]; a[i] = { ...a[i], flag: v }; return { ...f, biaya: a }; })}
                      options={['Debet', 'Kredit']}
                    />
                  </td>
                  <td>
                    <Select
                      value={b.rekening}
                      onChange={v => setForm(f => { const a = [...f.biaya]; a[i] = { ...a[i], rekening: v }; return { ...f, biaya: a }; })}
                      options={['Sumber Biaya', 'Cash', 'Tabungan Nasabah', 'GL Biaya Provisi', 'GL Biaya Admin']}
                    />
                  </td>
                  <td>
                    <button className="icon-btn"
                      onClick={() => setForm(f => ({ ...f, biaya: f.biaya.filter((_, idx) => idx !== i) }))}
                      dangerouslySetInnerHTML={{ __html: Icons.trash(16) }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="approval-banner" style={{ marginTop: 16, background: 'var(--c-info-bg)', borderLeftColor: 'var(--c-info)' }}>
            <span style={{ color: 'var(--c-info)', flexShrink: 0 }} dangerouslySetInnerHTML={{ __html: Icons.info(20) }} />
            <div className="approval-banner__body">
              Biaya pada level produk akan menjadi <b>default</b> saat fasilitas didaftarkan. Officer masih dapat menyesuaikan nilainya pada saat Registrasi Fasilitas.
            </div>
          </div>

          <div className="btn-bar btn-bar--between">
            <button className="btn btn--danger" style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }}
              onClick={() => onNavigate('/produk/pembiayaan')}>Batal</button>
            <div className="row gap-12">
              <button className="btn btn--secondary" onClick={goPrev}>Sebelumnya</button>
              <button className="btn btn--secondary" onClick={goNext}>Selanjutnya</button>
            </div>
          </div>
        </>
      )}

      {/* ─────────── Section 3: Parameter Denda ─────────── */}
      {section === 's3' && (
        <>
          <label className="cbx" style={{ marginBottom: 16 }}>
            <input type="checkbox" checked={form.aktifkanDenda} onChange={e => setField('aktifkanDenda', e.target.checked)} />
            Aktifkan Denda Keterlambatan untuk produk ini
          </label>

          <FormGrid>
            <Field label="Metode Perhitungan Denda" required>
              <Select
                value={form.metodeDenda}
                onChange={v => setField('metodeDenda', v)}
                options={['Persentase Harian', 'Nominal Tetap per Hari', 'Persentase dari Tunggakan']}
              />
            </Field>
            <Field label="Grace Day (hari toleransi)">
              <NumberInput value={form.graceDayDenda} onChange={v => setField('graceDayDenda', v)} suffix="Hari" />
            </Field>

            <Field label="Tarif Denda Ta'zir" required hint="Sanksi disiplin, masuk ke pendapatan bank">
              <NumberInput value={form.tarifTazir} onChange={v => setField('tarifTazir', v)} suffix="% / hari" />
            </Field>
            <Field label="Tarif Ta'wid" required hint="Ganti rugi riil, dicatat sebagai kewajiban">
              <NumberInput value={form.tarifTawid} onChange={v => setField('tarifTawid', v)} suffix="% / hari" />
            </Field>

            <Field label="Maksimal Denda" hint="% dari sisa pokok angsuran" span="full">
              <div style={{ maxWidth: 'calc(50% - 12px)' }}>
                <NumberInput value={form.maksDenda} onChange={v => setField('maksDenda', v)} suffix="%" />
              </div>
            </Field>

            <Field label="Rekening Pendapatan Denda (Ta'zir)" required>
              <LookupInput value={form.rekeningPendapatanDenda} onChange={v => setField('rekeningPendapatanDenda', v)} />
            </Field>
            <Field label="Rekening Kewajiban Ta'wid" required>
              <LookupInput value={form.rekeningKewajibanTawid} onChange={v => setField('rekeningKewajibanTawid', v)} />
            </Field>
          </FormGrid>

          {/* Preview perhitungan */}
          <h4 className="section-title">Simulasi Perhitungan Denda</h4>
          <table className="tbl">
            <thead>
              <tr>
                <th>Skenario</th>
                <th>Pokok Tertunggak</th>
                <th>Hari Tunggakan</th>
                <th className="text-right">Denda Ta'zir</th>
                <th className="text-right">Ta'wid</th>
                <th className="text-right">Total Denda</th>
              </tr>
            </thead>
            <tbody>
              {[
                { sk: '7 hari', pokok: 5000000, hari: 7 },
                { sk: '30 hari', pokok: 5000000, hari: 30 },
                { sk: '90 hari', pokok: 5000000, hari: 90 },
              ].map(s => {
                const effHari = Math.max(0, s.hari - Number(form.graceDayDenda || 0));
                const tazir = s.pokok * Number(form.tarifTazir || 0) / 100 * effHari;
                const tawid = s.pokok * Number(form.tarifTawid || 0) / 100 * effHari;
                return (
                  <tr key={s.sk}>
                    <td>{s.sk}</td>
                    <td className="mono">{window.fmtRp(s.pokok)}</td>
                    <td className="mono">{s.hari} hari</td>
                    <td className="mono text-right">{window.fmtRp(tazir)}</td>
                    <td className="mono text-right">{window.fmtRp(tawid)}</td>
                    <td className="mono text-right fw-600">{window.fmtRp(tazir + tawid)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="btn-bar btn-bar--between">
            <button className="btn btn--danger" style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }}
              onClick={() => onNavigate('/produk/pembiayaan')}>Batal</button>
            <div className="row gap-12">
              <button className="btn btn--secondary" onClick={goPrev}>Sebelumnya</button>
              <button className="btn btn--secondary" onClick={goNext}>Selanjutnya</button>
            </div>
          </div>
        </>
      )}

      {/* ─────────── Section 4: GL Interface ─────────── */}
      {section === 's4' && (
        <>
          <div className="row row--between mb-16">
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>GL Interface — Mapping Akad {form.akad}</h3>
              <p className="text-muted text-sm" style={{ margin: '4px 0 0' }}>
                Tentukan rekening GL untuk setiap <span className="mono">kode_tx_class</span>. Mapping ini menjadi acuan posting jurnal pada seluruh transaksi pembiayaan produk ini.
              </p>
            </div>
            <button
              className="btn btn--neutral btn--sm"
              onClick={() => setForm(f => ({ ...f, glInterface: window.buildGlInterfaceRows(f.akad) }))}
              title="Reset ke mapping default akad"
            >
              <span dangerouslySetInnerHTML={{ __html: Icons.refresh(14) }} />
              Reset ke Default
            </button>
          </div>

          <table className="tbl">
            <thead>
              <tr>
                <th style={{ width: 140 }}>Kode Tx Class</th>
                <th>Deskripsi</th>
                <th style={{ width: 110 }}>Account Type</th>
                <th style={{ width: 230 }}>Kode GL</th>
                <th>Nama GL</th>
              </tr>
            </thead>
            <tbody>
              {form.glInterface.map((g, i) => (
                <tr key={g.kodeTxClass}>
                  <td className="mono">
                    {g.kodeTxClass}
                    {g.wajib && <span className="text-error" style={{ marginLeft: 4 }}>*</span>}
                  </td>
                  <td>{g.deskripsi}</td>
                  <td><span className="tag tag--neutral">{g.accountType}</span></td>
                  <td>
                    <LookupInput
                      value={g.kodeGl}
                      placeholder="-- Pilih GL --"
                      onChange={v => setForm(f => {
                        const a = [...f.glInterface];
                        const coa = window.getCoaByKode(v);
                        a[i] = { ...a[i], kodeGl: v, namaGl: coa?.nama || '' };
                        return { ...f, glInterface: a };
                      })}
                      onOpen={() => setGlLookup({ rowIndex: i, accountType: g.accountType })}
                    />
                  </td>
                  <td>
                    <span className={g.namaGl ? '' : 'text-muted'}>
                      {g.namaGl || '— akan terisi otomatis —'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="approval-banner" style={{ marginTop: 16, background: 'var(--c-info-bg)', borderLeftColor: 'var(--c-info)' }}>
            <span style={{ color: 'var(--c-info)', flexShrink: 0 }} dangerouslySetInnerHTML={{ __html: Icons.info(20) }} />
            <div className="approval-banner__body">
              Tanda <b>*</b> menandakan tx_class yang <b>wajib</b> di-mapping sebelum produk dapat diaktifkan. Lookup GL difilter berdasarkan <i>Account Type</i> agar tipe rekening selaras dengan jenis mutasi.
            </div>
          </div>

          <div className="btn-bar btn-bar--between">
            <button className="btn btn--danger" style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }}
              onClick={() => onNavigate('/produk/pembiayaan')}>Batal</button>
            <div className="row gap-12">
              <button className="btn btn--secondary" onClick={goPrev}>Sebelumnya</button>
              <button className="btn btn--primary" onClick={() => setConfirmOpen(true)}>
                <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(16) }} />
                {isEdit ? 'Simpan Perubahan' : 'Simpan Produk'}
              </button>
            </div>
          </div>

          {glLookup && (
            <CoaLookup
              open={true}
              accountType={glLookup.accountType}
              onClose={() => setGlLookup(null)}
              onSelect={(coa) => setForm(f => {
                const a = [...f.glInterface];
                a[glLookup.rowIndex] = { ...a[glLookup.rowIndex], kodeGl: coa.kode, namaGl: coa.nama };
                return { ...f, glInterface: a };
              })}
            />
          )}
        </>
      )}

      {confirmOpen && (
        <ConfirmDialog
          title={isEdit ? 'Simpan Perubahan Produk Pembiayaan' : 'Simpan Produk Pembiayaan Baru'}
          message={
            isEdit
              ? `Perubahan pada produk "${form.kodeProduk} — ${form.namaProduk}" akan disimpan. Lanjutkan?`
              : `Produk "${form.kodeProduk} — ${form.namaProduk}" akan disimpan dan menjadi tersedia untuk Registrasi Fasilitas. Lanjutkan?`
          }
          confirmLabel="Ya, Simpan"
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            const next = {
              kode: form.kodeProduk, nama: form.namaProduk, akad: form.akad,
              minPlafond: Number(form.limitMin) || 0, maxPlafond: Number(form.limitMax) || 0,
              minTenor: Number(form.minPeriodeCount) || 0, maxTenor: Number(form.defaultPeriode) || 0,
              marginMin: Number(form.targetEqvRate) || 0, marginMax: Number(form.targetEqvRate) || 0,
              status: form.status,
            };
            if (isEdit) {
              const i = window.MOCK_PRODUK_PEMBIAYAAN.findIndex(p => p.kode === kode);
              if (i >= 0) window.MOCK_PRODUK_PEMBIAYAAN[i] = next;
              showToast({ type: 'success', title: 'Perubahan tersimpan', message: `${form.kodeProduk} — ${form.namaProduk}` });
            } else {
              window.MOCK_PRODUK_PEMBIAYAAN.unshift(next);
              showToast({ type: 'success', title: 'Produk berhasil ditambahkan', message: `${form.kodeProduk} — ${form.namaProduk}` });
            }
            onNavigate('/produk/pembiayaan');
          }}
        />
      )}
    </div>
  );
}

/* ─────────── Parameter Global (key-value system parameters) ─────────── */
// Figma 4.3 — Daftar Parameter Global (list) + New / Edit Parameter Global (form).
function ParameterGlobalScreen({ onNavigate, showToast }) {
  const [rows, setRows] = React.useState(() => window.MOCK_PARAM_GLOBAL.map(r => ({ ...r })));
  const [view, setView] = React.useState('list');      // 'list' | 'form'
  const [editIndex, setEditIndex] = React.useState(-1); // -1 = new
  const [form, setForm] = React.useState({ kode: '', nama: '', tipe: '', nilai: '', status: 'True' });
  const [confirmDel, setConfirmDel] = React.useState(null);

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const openNew = () => {
    setEditIndex(-1);
    setForm({ kode: '', nama: '', tipe: '', nilai: '', status: 'True' });
    setView('form');
  };
  const openEdit = (row, idx) => {
    setEditIndex(idx);
    setForm({ kode: row.kode, nama: row.nama, tipe: row.tipe, nilai: row.nilai, status: row.status ? 'True' : 'False' });
    setView('form');
  };
  const save = () => {
    if (!form.kode.trim() || !form.nama.trim()) {
      showToast({ type: 'warn', title: 'Data belum lengkap', message: 'Kode dan Nama Parameter wajib diisi.' });
      return;
    }
    const rec = { kode: form.kode.trim().toUpperCase(), nama: form.nama.trim(), tipe: form.tipe || 'String', nilai: form.nilai, status: form.status === 'True' };
    setRows(arr => {
      const next = [...arr];
      if (editIndex >= 0) next[editIndex] = rec; else next.unshift(rec);
      return next;
    });
    showToast({ type: 'success', title: editIndex >= 0 ? 'Parameter diperbarui' : 'Parameter ditambahkan',
      message: `Parameter global ${rec.kode} berhasil ${editIndex >= 0 ? 'diperbarui' : 'ditambahkan'}` });
    setView('list');
  };

  /* ---------- Form view (New / Edit Parameter Global) ---------- */
  if (view === 'form') {
    const isEdit = editIndex >= 0;
    return (
      <div className="card" style={{ maxWidth: 860 }}>
        <h2 className="page__title">{isEdit ? 'Edit Parameter Global' : 'New Parameter Global'}</h2>

        <div style={{ marginTop: 24 }}>
          <FormGrid>
            <Field label="Kode Parameter" required span="full">
              <TextInput value={form.kode} onChange={v => setField('kode', v)} placeholder="HOLDPRKS" readOnly={isEdit} />
            </Field>
            <Field label="Nama Parameter" required span="full">
              <TextInput value={form.nama} onChange={v => setField('nama', v)} placeholder="Hold saldo dana pembayaran bagi hasil PRKS" />
            </Field>
            <Field label="Tipe Parameter" required>
              <Select value={form.tipe} onChange={v => setField('tipe', v)} options={window.PARAM_TIPE_OPTIONS} placeholder="-- Pilih tipe --" />
            </Field>
            <Field label="Nilai Parameter" required>
              <TextInput value={form.nilai} onChange={v => setField('nilai', v)} placeholder="1,00" />
            </Field>
            <Field label="Status" required>
              <Select value={form.status} onChange={v => setField('status', v)} options={window.PARAM_STATUS_OPTIONS} />
            </Field>
          </FormGrid>
        </div>

        <div className="btn-bar">
          <button className="btn btn--neutral" onClick={() => setView('list')}>Batal</button>
          <button className="btn btn--primary" onClick={save}>
            <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(16) }} />
            Simpan
          </button>
        </div>
      </div>
    );
  }

  /* ---------- List view (Daftar Parameter Global) ---------- */
  return (
    <div className="card">
      <h2 className="page__title">
        Daftar Parameter Global
        <span className="subtitle">Registry parameter sistem level institusi</span>
      </h2>

      <DataTable
        columns={[
          { key: 'kode',   label: 'Kode Parameter', sort: true, render: r => <span className="mono">{r.kode}</span> },
          { key: 'nama',   label: 'Nama Parameter' },
          { key: 'tipe',   label: 'Tipe Parameter', render: r => <span className="tag tag--neutral">{r.tipe}</span> },
          { key: 'nilai',  label: 'Nilai Parameter', align: 'right', render: r => <span className="mono">{r.nilai}</span> },
          { key: 'status', label: 'Status', render: r => <StatusTag status={r.status ? 'Aktif' : 'Nonaktif'} /> },
        ]}
        data={rows}
        popupItems={[
          { id: 'edit',  label: 'Edit Parameter', icon: 'edit' },
          { sep: true },
          { id: 'hapus', label: 'Hapus Parameter', icon: 'trash', danger: true },
        ]}
        onPopupClick={(row, id) => {
          const idx = rows.indexOf(row);
          if (id === 'edit') openEdit(row, idx);
          else if (id === 'hapus') setConfirmDel({ row, idx });
        }}
        toolbarActions={
          <button className="btn btn--primary btn--sm" onClick={openNew}>
            <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
            Parameter Global
          </button>
        }
      />

      {confirmDel && (
        <ConfirmDialog
          title="Hapus Parameter Global"
          message={`Parameter "${confirmDel.row.kode}" akan dihapus dari sistem. Lanjutkan?`}
          confirmLabel="Ya, Hapus"
          danger
          onClose={() => setConfirmDel(null)}
          onConfirm={() => {
            setRows(arr => arr.filter((_, i) => i !== confirmDel.idx));
            showToast({ type: 'success', title: 'Parameter dihapus', message: `${confirmDel.row.kode} berhasil dihapus.` });
            setConfirmDel(null);
          }}
        />
      )}
    </div>
  );
}

/* ─────────── Otorisasi ─────────── */
function OtorisasiScreen({ onNavigate, showToast }) {
  const [selected, setSelected] = React.useState(null);
  const data = window.MOCK_OTORISASI;
  return (
    <div className="card">
      <h2 className="page__title">
        Antrian Otorisasi
        <span className="subtitle">{data.length} transaksi menunggu persetujuan</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, marginTop: 20 }}>
        <DataTable
          columns={[
            { key: 'id', label: 'ID', width: 140, render: r => <span className="mono">{r.id}</span> },
            { key: 'tipe', label: 'Tipe Transaksi' },
            { key: 'nasabah', label: 'Nasabah' },
            { key: 'nominal', label: 'Nominal', align: 'right', render: r => <span className="mono">{window.fmtRp(r.nominal)}</span> },
            { key: 'maker', label: 'Maker', render: r => <span className="mono">{r.maker}</span> },
            { key: 'tglInput', label: 'Waktu Input', render: r => <span className="mono text-sm">{r.tglInput}</span> },
          ]}
          data={data}
          selectedRowId={selected?.id}
          onRowClick={r => setSelected(r)}
          showSearch={false}
          showPagination={false}
        />

        <div style={{ border: '1px solid var(--c-border-soft)', borderRadius: 8, padding: 20, background: '#F8FAFC', height: 'fit-content', position: 'sticky', top: 0 }}>
          {selected ? (
            <>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px' }}>Review Otorisasi</h3>
              <div className="text-muted text-sm mb-16">{selected.id}</div>

              <FormGrid>
                <Disp label="Tipe Transaksi" value={selected.tipe} />
                <Disp label="Nasabah" value={selected.nasabah} />
                <Disp label="Nominal" value={window.fmtRp(selected.nominal)} mono />
                <Disp label="Maker" value={selected.maker} mono />
              </FormGrid>

              <h4 className="section-title">Pemeriksaan</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 13.5 }}>
                {['Dokumen lengkap', 'Limit tersedia', 'Tidak ada cek BI', 'Otorisasi sesuai SOP'].map((c, i) => (
                  <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '6px 0' }}>
                    <span style={{ color: 'var(--c-success)' }} dangerouslySetInnerHTML={{ __html: Icons.checkmark(14) }} />
                    {c}
                  </li>
                ))}
              </ul>

              <Field label="Catatan Approver" style={{ marginTop: 16 }}>
                <textarea rows={3} placeholder="Optional..." />
              </Field>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
                <button className="btn btn--primary w-100" onClick={() => { showToast({ type: 'success', title: 'Disetujui', message: `${selected.id} berhasil di-otorisasi.` }); setSelected(null); }}>
                  <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(16) }} />
                  Setujui
                </button>
                <button className="btn btn--danger w-100" onClick={() => { showToast({ type: 'warn', title: 'Ditolak', message: `${selected.id} dikembalikan ke maker.` }); setSelected(null); }}>
                  <span dangerouslySetInnerHTML={{ __html: Icons.close(16) }} />
                  Tolak
                </button>
                <button className="btn btn--neutral w-100">
                  <span dangerouslySetInnerHTML={{ __html: Icons.swap(16) }} />
                  Eskalasi
                </button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: 32, color: 'var(--c-text-muted)' }}>
              <span style={{ display: 'inline-block', marginBottom: 8 }} dangerouslySetInnerHTML={{ __html: Icons.clipboard(40) }} />
              <div style={{ fontSize: 14 }}>Pilih transaksi untuk meninjau detail</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────── Generic Placeholder (for menus not fully built) ─────────── */
function PlaceholderScreen({ route, onNavigate }) {
  // Find menu label from NAV_TREE
  let label = route;
  let railLabel = '';
  for (const railId in window.NAV_TREE) {
    const items = window.NAV_TREE[railId];
    for (const it of items) {
      if (it.route === route) { label = it.label; railLabel = window.NAV_RAILS.find(r => r.id === railId)?.label || ''; }
      if (it.children) for (const c of it.children) {
        if (c.route === route) { label = c.label; railLabel = window.NAV_RAILS.find(r => r.id === railId)?.label || ''; }
      }
    }
  }

  return (
    <div className="card">
      <h2 className="page__title">{label}</h2>

      <div style={{
        padding: 48, textAlign: 'center', color: 'var(--c-text-muted)',
        background: '#F8FAFC', border: '1px dashed var(--c-border)', borderRadius: 8, marginTop: 24,
      }}>
        <div style={{ display: 'inline-flex', width: 64, height: 64, borderRadius: '50%', background: 'var(--c-primary-soft)', color: 'var(--c-primary)', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}
          dangerouslySetInnerHTML={{ __html: Icons.document(28) }} />
        <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--c-text)', margin: '0 0 8px' }}>Layar belum dirancang dalam demo ini</h3>
        <p style={{ margin: '0 0 16px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto', fontSize: 13.5, lineHeight: 1.55 }}>
          Menu <strong>{railLabel} / {label}</strong> tersedia di peta navigasi namun belum dibuat layar Hi-Fi-nya untuk demo ini.
          Skenario kunci sudah lengkap di menu utama — kembali ke Site Map untuk melihat alur demo.
        </p>
        <button className="btn btn--primary" onClick={() => onNavigate('/overview')}>
          <span dangerouslySetInnerHTML={{ __html: Icons.home(16) }} />
          Kembali ke Site Map
        </button>
      </div>
    </div>
  );
}

Object.assign(window, {
  DaftarJaminanScreen, MasterDataScreen, ProdukPembiayaanScreen, NewProdukPembiayaanScreen,
  ParameterGlobalScreen, OtorisasiScreen, PlaceholderScreen,
});
