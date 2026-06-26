/* screens-transaksi-landing.jsx
   Landing page (Cari Rekening) untuk semua menu Transaksi.
   Flow: pilih menu → landing page cari rekening → klik Aksi → form spesifik. */

const TRANSAKSI_ACTIONS = {
  'pembayaran-manual':     { label: 'Pembayaran Angsuran Manual', formRoute: '/transaksi/pembayaran-manual/form' },
  'pelunasan-dipercepat':  { label: 'Pelunasan Dipercepat',       formRoute: '/transaksi/pelunasan-dipercepat/form' },
  'koreksi-pembayaran':    { label: 'Koreksi Angsuran',           formRoute: '/transaksi/koreksi-pembayaran/form' },
  'input-biaya':           { label: 'Input Biaya-Biaya',          formRoute: '/transaksi/input-biaya/form' },
  'reposisi-cabang':       { label: 'Reposisi Cabang',            formRoute: '/transaksi/reposisi-cabang/form' },
  'ganti-produk':          { label: 'Ganti Produk',               formRoute: '/transaksi/ganti-produk/form' },
  'hapus-buku-registrasi': { label: 'Registrasi Hapus Buku',      formRoute: '/transaksi/hapus-buku/registrasi/form' },
  'hapus-buku-recovery':   { label: 'Recovery Hapus Buku',        formRoute: '/transaksi/hapus-buku/recovery/form' },
  'hapus-tagih':           { label: 'Hapus Tagih',                formRoute: '/transaksi/hapus-buku/hapus-tagih/form' },
};

/* ─────────── Landing: Cari Rekening untuk Transaksi ─────────── */
function TransaksiLandingScreen({ onNavigate, showToast, mode }) {
  const action = TRANSAKSI_ACTIONS[mode] || TRANSAKSI_ACTIONS['pembayaran-manual'];
  const [filter, setFilter] = React.useState({ cif: '', nama: '', noRek: '' });
  const [hasSearched, setHasSearched] = React.useState(false);

  const filtered = React.useMemo(() => {
    if (!hasSearched) return [];
    const q = (s) => (s || '').toLowerCase();
    return window.MOCK_PEMBIAYAAN.filter(r =>
      (!filter.cif   || r.noFasilitas.includes(filter.cif)) &&
      (!filter.nama  || q(r.nama).includes(q(filter.nama))) &&
      (!filter.noRek || r.noRek.replace(/-/g, '').includes(filter.noRek.replace(/-/g, '')))
    );
  }, [filter, hasSearched]);

  return (
    <div className="card">
      <h2 className="page__title">
        Transaksi — {action.label}
        <span className="subtitle">Cari rekening pembiayaan yang akan ditransaksikan, lalu klik <b>Pilih</b> pada baris.</span>
      </h2>

      <div className="filter-strip" style={{ marginTop: 24 }}>
        <FormGrid cols={3}>
          <Field label="Nomor CIF">
            <TextInput value={filter.cif} onChange={v => setFilter(f => ({ ...f, cif: v }))} placeholder="cth: 0000002431" />
          </Field>
          <Field label="Nama Nasabah">
            <TextInput value={filter.nama} onChange={v => setFilter(f => ({ ...f, nama: v }))} placeholder="cth: Jacob Jones" />
          </Field>
          <Field label="Nomor Rekening">
            <TextInput value={filter.noRek} onChange={v => setFilter(f => ({ ...f, noRek: v }))} placeholder="cth: 7100-0000-0044" />
          </Field>
        </FormGrid>
        <div className="row" style={{ marginTop: 16, justifyContent: 'flex-end' }}>
          <button className="btn btn--neutral" onClick={() => { setFilter({ cif: '', nama: '', noRek: '' }); setHasSearched(false); }}>
            Reset
          </button>
          <button className="btn btn--primary" onClick={() => setHasSearched(true)}>
            <span dangerouslySetInnerHTML={{ __html: Icons.search(14) }} />
            Cari
          </button>
        </div>
      </div>

      <h4 className="section-title">Hasil Pencarian</h4>
      <DataTable
        showSearch={false}
        showPagination={hasSearched && filtered.length > 10}
        columns={[
          { key: 'noRek',  label: 'Nomor Rekening', sort: true, render: r => <span className="mono">{r.noRek}</span> },
          { key: 'cif',    label: 'Nomor CIF', render: r => <span className="mono">{r.noFasilitas}</span> },
          { key: 'nama',   label: 'Nama Nasabah' },
          { key: 'akad',   label: 'Kode Produk', render: r => <span className="tag tag--info">{r.akad}</span> },
          { key: 'outstanding', label: 'Outstanding', align: 'right', render: r => <span className="mono">{window.fmtRp(r.outstanding)}</span> },
          { key: 'cabang', label: 'Cabang', render: () => <span className="text-sm">001 - Kantor Pusat</span> },
        ]}
        data={filtered}
        emptyText={hasSearched
          ? 'Tidak ada rekening yang cocok dengan kriteria pencarian.'
          : 'Masukkan kriteria pencarian lalu klik Cari.'}
        popupItems={[
          { id: 'pilih',  label: `Aksi: ${action.label}`, icon: 'checkmark' },
          { id: 'detail', label: 'Lihat Detail Rekening', icon: 'view' },
        ]}
        onPopupClick={(row, id) => {
          if (id === 'detail') { onNavigate('/list-pembiayaan/detail'); return; }
          if (id === 'pilih')  { onNavigate(`${action.formRoute}?rek=${encodeURIComponent(row.noRek)}`); return; }
        }}
      />
    </div>
  );
}

/* ─────────── Shared Hero Card untuk form transaksi ─────────── */
function RekeningHeroCard({ rekening, onNavigate, judul }) {
  if (!rekening) return null;
  return (
    <div className="hl-card" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>
        <Disp label="No. Rekening Pembiayaan" value={rekening.noRek} large mono />
        <div className="row gap-24" style={{ marginTop: 4, flexShrink: 0 }}>
          <a className="link" style={{ color: 'var(--c-primary)', textDecoration: 'none', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
             onClick={() => onNavigate('/list-pembiayaan/detail')}>Lihat Detail Info Rekening</a>
          <a className="link" style={{ color: 'var(--c-primary)', textDecoration: 'none', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
             onClick={() => onNavigate('/list-pembiayaan/detail')}>Lihat Jadwal Angsuran</a>
        </div>
      </div>
      <FormGrid cols={3} style={{ marginTop: 16 }}>
        <Disp label="Nama Nasabah" value={`${rekening.noFasilitas?.slice(-9) || ''} — ${rekening.nama}`} />
        <Disp label="Kantor cabang" value="001 — Kantor Pusat" />
        <div className="disp">
          <div className="disp__label">Status</div>
          <div><StatusTag status={rekening.status || 'Aktif'} /></div>
        </div>
        <Disp label="Nomor Fasilitas" value={rekening.noFasilitas || '-'} mono />
        <Disp label="Produk" value={rekening.akad} />
      </FormGrid>
    </div>
  );
}

// Helper: read rekening selected by query param `?rek=`.
function useRekeningFromQuery(rek) {
  return React.useMemo(() => {
    if (!rek) return window.MOCK_PEMBIAYAAN[0];
    return window.MOCK_PEMBIAYAAN.find(r => r.noRek === rek) || window.MOCK_PEMBIAYAAN[0];
  }, [rek]);
}

Object.assign(window, {
  TRANSAKSI_ACTIONS,
  TransaksiLandingScreen,
  RekeningHeroCard,
  useRekeningFromQuery,
});
