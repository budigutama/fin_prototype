/* screens-apbl.jsx — Tutup Operational APBL
 *   /apbl/monitoring → MonitoringApblScreen (5-tab monitoring + Close/Re-Open APBL)
 *   /apbl/riwayat    → RiwayatApblScreen     (closing history with date-range filter)
 * APBL = closing operasional akhir periode. Monitoring memastikan tidak ada
 * transaksi on-going yang belum selesai sebelum operasional ditutup.
 */

// Cabang lookup (kode + nama)
function ApblCabangLookup({ open, onClose, onSelect }) {
  const [q, setQ] = React.useState('');
  if (!open) return null;
  const source = window.MOCK_CABANG || [];
  const filtered = q.trim()
    ? source.filter(c => c.nama.toLowerCase().includes(q.toLowerCase()) || c.kode.toLowerCase().includes(q.toLowerCase()))
    : source;
  return (
    <Modal title="Cari Cabang" subtitle="Daftar kantor cabang" onClose={onClose} size="md"
      footer={<button className="btn btn--neutral" onClick={onClose}>Batal</button>}>
      <div className="tbl-search" style={{ maxWidth: 'none', marginBottom: 16 }}>
        <span dangerouslySetInnerHTML={{ __html: Icons.search(14) }} />
        <input autoFocus placeholder="Cari kode / nama cabang..." value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <table className="tbl">
        <thead><tr><th style={{ width: 90 }}>Kode</th><th>Nama Cabang</th></tr></thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr className="tbl-row--empty"><td colSpan={2} className="tbl-empty">Tidak ditemukan.</td></tr>
          ) : filtered.map(c => (
            <tr key={c.kode} className="tbl-row--clickable" onClick={() => { onSelect(c); onClose(); }}>
              <td className="mono">{c.kode}</td><td>{c.nama}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Modal>
  );
}

// Shared columns for the "pembiayaan baru" tabs (Jaminan / Notaris / Penjamin)
const APBL_REK_COLUMNS = [
  { key: 'cabang',        label: 'Cabang', width: 80, render: r => <span className="mono">{r.cabang}</span> },
  { key: 'noRekening',    label: 'Nomor Rekening', width: 150, render: r => <span className="mono">{r.noRekening}</span> },
  { key: 'namaRekening',  label: 'Nama Rekening' },
  { key: 'kodeProduk',    label: 'Kode Produk', width: 110, render: r => <span className="mono">{r.kodeProduk}</span> },
  { key: 'tglBuka',       label: 'Tgl. Buka', width: 110, render: r => <span className="mono text-sm">{r.tglBuka}</span> },
  { key: 'tglDropping',   label: 'Tgl. Dropping', width: 120, render: r => <span className="mono text-sm">{r.tglDropping}</span> },
  { key: 'userInput',     label: 'User Input', width: 110, render: r => <span className="mono text-sm">{r.userInput}</span> },
  { key: 'userOtorisasi', label: 'User Otorisasi', width: 120, render: r => <span className="mono text-sm">{r.userOtorisasi}</span> },
];

function MonitoringApblScreen({ showToast }) {
  const [draft, setDraft] = React.useState({ cabangKode: '', cabangNama: '', allCabang: true, cari: '' });
  const [applied, setApplied] = React.useState({ cabangKode: '', allCabang: true, cari: '' });
  const [tab, setTab] = React.useState('summary');
  const [lookup, setLookup] = React.useState(false);
  const [confirm, setConfirm] = React.useState(null); // 'close' | 'reopen' | null
  const setF = (k, v) => setDraft(s => ({ ...s, [k]: v }));

  const applyFilter = (rows, cabangKey) => rows.filter(r => {
    if (!applied.allCabang && applied.cabangKode && r[cabangKey] !== applied.cabangKode) return false;
    if (applied.cari.trim()) {
      const s = applied.cari.toLowerCase();
      return Object.values(r).some(v => String(v).toLowerCase().includes(s));
    }
    return true;
  });

  const summary  = applyFilter(window.MOCK_APBL_SUMMARY, 'cabang');
  const otorisasi = applyFilter(window.MOCK_APBL_OTORISASI, 'cabang');
  const jaminan  = applyFilter(window.MOCK_APBL_JAMINAN, 'cabang');
  const notaris  = applyFilter(window.MOCK_APBL_NOTARIS, 'cabang');
  const penjamin = applyFilter(window.MOCK_APBL_PENJAMIN, 'cabang');

  const totalPending = otorisasi.length + jaminan.length + notaris.length + penjamin.length;

  const tabs = [
    { id: 'summary',   label: 'Summary Check' },
    { id: 'otorisasi', label: `Otorisasi Transaksi${otorisasi.length ? ` (${otorisasi.length})` : ''}` },
    { id: 'jaminan',   label: `Data Jaminan${jaminan.length ? ` (${jaminan.length})` : ''}` },
    { id: 'notaris',   label: `Progress Notaris${notaris.length ? ` (${notaris.length})` : ''}` },
    { id: 'penjamin',  label: `Data Penjamin${penjamin.length ? ` (${penjamin.length})` : ''}` },
  ];

  return (
    <div className="card">
      <h2 className="page__title">
        Monitoring Transaksi APBL
        <span className="subtitle">Pantau transaksi on-going yang belum selesai sebelum tutup operasional</span>
      </h2>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap', margin: '4px 0 16px' }}>
        <div style={{ width: 320 }}>
          <Field label="Kode Cabang">
            <div className="lookup-pair">
              <LookupInput
                value={draft.cabangKode}
                placeholder="-- Cabang --"
                onChange={v => setF('cabangKode', v)}
                onOpen={() => setLookup(true)}
                disabled={draft.allCabang}
              />
              <input className="input input--readonly" readOnly value={draft.cabangNama} placeholder="Nama Cabang" />
            </div>
          </Field>
        </div>
        <label className="cbx" style={{ height: 32, display: 'inline-flex', alignItems: 'center' }}>
          <input type="checkbox" checked={draft.allCabang}
            onChange={e => setDraft(s => ({ ...s, allCabang: e.target.checked, cabangKode: e.target.checked ? '' : s.cabangKode, cabangNama: e.target.checked ? '' : s.cabangNama }))} />
          All Cabang
        </label>
        <div style={{ flex: 1, minWidth: 200, maxWidth: 360 }}>
          <Field label="Cari">
            <TextInput value={draft.cari} onChange={v => setF('cari', v)} placeholder="Cari data..." />
          </Field>
        </div>
        <button className="btn btn--primary" onClick={() => setApplied({ cabangKode: draft.cabangKode, allCabang: draft.allCabang, cari: draft.cari })}>
          <span dangerouslySetInnerHTML={{ __html: Icons.search(14) }} />
          Search
        </button>
      </div>

      <Tabs value={tab} onChange={setTab} tabs={tabs} />

      <div style={{ marginTop: 16 }}>
        {tab === 'summary' && (
          <DataTable showSearch={false} data={summary} columns={[
            { key: 'kategori', label: 'Kategori' },
            { key: 'cabang',   label: 'Cabang', width: 120, render: r => <span className="mono">{r.cabang}</span> },
            { key: 'jumlah',   label: 'Jumlah', width: 120, align: 'right', render: r => <span className="mono">{Number(r.jumlah).toFixed(2)}</span> },
          ]} />
        )}
        {tab === 'otorisasi' && (
          <DataTable showSearch={false} data={otorisasi} columns={[
            { key: 'cabang',       label: 'Cabang', width: 80, render: r => <span className="mono">{r.cabang}</span> },
            { key: 'tglInput',     label: 'Tanggal Input', width: 170, render: r => <span className="mono text-sm">{r.tglInput}</span> },
            { key: 'kodeEntri',    label: 'Kode Entri', width: 100, render: r => <span className="mono">{r.kodeEntri}</span> },
            { key: 'infoTransaksi', label: 'Info Transaksi', width: 140, render: r => <span className="mono">{r.infoTransaksi}</span> },
            { key: 'kodeBisnis',   label: 'Kode Bisnis', width: 100, render: r => r.kodeBisnis ? <span className="mono">{r.kodeBisnis}</span> : <span className="text-muted">—</span> },
            { key: 'keterangan',   label: 'Keterangan' },
            { key: 'userInput',    label: 'User Input', width: 110, render: r => <span className="mono text-sm">{r.userInput}</span> },
          ]} />
        )}
        {tab === 'jaminan'  && <DataTable showSearch={false} data={jaminan}  columns={APBL_REK_COLUMNS} emptyText="Tidak ada pembiayaan baru tanpa jaminan." />}
        {tab === 'notaris'  && <DataTable showSearch={false} data={notaris}  columns={APBL_REK_COLUMNS} emptyText="Tidak ada pembiayaan baru tanpa link notaris." />}
        {tab === 'penjamin' && <DataTable showSearch={false} data={penjamin} columns={APBL_REK_COLUMNS} emptyText="Tidak ada pembiayaan baru tanpa penjamin." />}
      </div>

      {/* Action bar */}
      <div className="btn-bar btn-bar--between" style={{ marginTop: 24 }}>
        <button className="btn btn--neutral" onClick={() => setConfirm('reopen')}>
          <span dangerouslySetInnerHTML={{ __html: Icons.refresh(16) }} />
          Re-Open APBL
        </button>
        <button className="btn btn--primary" onClick={() => setConfirm('close')}>
          <span dangerouslySetInnerHTML={{ __html: Icons.lock(16) }} />
          Close APBL
        </button>
      </div>

      <ApblCabangLookup open={lookup} onClose={() => setLookup(false)}
        onSelect={(c) => setDraft(s => ({ ...s, cabangKode: c.kode, cabangNama: c.nama }))} />

      {confirm === 'close' && (
        <ConfirmDialog
          title="Close APBL"
          message={totalPending > 0
            ? `Masih ada ${totalPending} transaksi on-going yang belum selesai. Tetap tutup operasional APBL?`
            : 'Tutup operasional APBL untuk periode berjalan?'}
          confirmLabel="Ya, Close APBL"
          onClose={() => setConfirm(null)}
          onConfirm={() => { showToast({ type: 'success', title: 'APBL ditutup', message: 'Operasional APBL berhasil ditutup.' }); setConfirm(null); }}
        />
      )}
      {confirm === 'reopen' && (
        <ConfirmDialog
          title="Re-Open APBL"
          message="Buka kembali operasional APBL yang sudah ditutup? Tindakan ini akan tercatat pada riwayat."
          confirmLabel="Ya, Re-Open"
          onClose={() => setConfirm(null)}
          onConfirm={() => { showToast({ type: 'warn', title: 'APBL dibuka kembali', message: 'Operasional APBL berhasil di-reopen.' }); setConfirm(null); }}
        />
      )}
    </div>
  );
}

function ApblStatusTag({ status }) {
  const cls = status === 'Reopen' ? 'tag--warning' : 'tag--success';
  return <span className={'tag ' + cls}>{status}</span>;
}

function RiwayatApblScreen() {
  const [draft, setDraft] = React.useState({ start: '', end: '', cari: '', kolom: 'User Close' });
  const [applied, setApplied] = React.useState({ cari: '', kolom: 'User Close' });
  const setF = (k, v) => setDraft(s => ({ ...s, [k]: v }));

  const colKey = { 'User Close': 'closedBy', 'Status': 'status', 'Reopen By': 'reopenBy' };

  const rows = window.MOCK_APBL_RIWAYAT.filter(r => {
    if (applied.cari.trim()) {
      const s = applied.cari.toLowerCase();
      return String(r[colKey[applied.kolom]] || '').toLowerCase().includes(s);
    }
    return true;
  });

  return (
    <div className="card">
      <h2 className="page__title">
        Riwayat Tutup Operational APBL
        <span className="subtitle">Histori proses tutup &amp; re-open operasional APBL</span>
      </h2>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap', margin: '4px 0 16px' }}>
        <div style={{ width: 170 }}>
          <Field label="Start Date"><DateInput value={draft.start} onChange={v => setF('start', v)} /></Field>
        </div>
        <div style={{ width: 170 }}>
          <Field label="End Date"><DateInput value={draft.end} onChange={v => setF('end', v)} /></Field>
        </div>
        <div style={{ flex: 1, minWidth: 200, maxWidth: 320 }}>
          <Field label="Cari"><TextInput value={draft.cari} onChange={v => setF('cari', v)} placeholder="Kata kunci..." /></Field>
        </div>
        <div style={{ width: 180 }}>
          <Field label="Pada Kolom">
            <Select value={draft.kolom} onChange={v => setF('kolom', v)} options={window.APBL_RIWAYAT_KOLOM_OPTIONS} />
          </Field>
        </div>
        <button className="btn btn--primary" onClick={() => setApplied({ cari: draft.cari, kolom: draft.kolom })}>
          <span dangerouslySetInnerHTML={{ __html: Icons.search(14) }} />
          Search
        </button>
      </div>

      <DataTable
        showSearch={false}
        data={rows}
        columns={[
          { key: 'tanggal',    label: 'Tanggal', width: 130, sort: true, render: r => <span className="mono text-sm">{r.tanggal}</span> },
          { key: 'closedBy',   label: 'Closed By', width: 140, render: r => <span className="mono text-sm">{r.closedBy}</span> },
          { key: 'waktuTutup', label: 'Waktu Tutup', render: r => <span className="mono text-sm">{r.waktuTutup}</span> },
          { key: 'status',     label: 'Status', width: 110, render: r => <ApblStatusTag status={r.status} /> },
          { key: 'reopenBy',   label: 'Reopen By', width: 140, render: r => r.reopenBy === '-' ? <span className="text-muted">—</span> : <span className="mono text-sm">{r.reopenBy}</span> },
          { key: 'tglReopen',  label: 'Tgl Reopen', render: r => r.tglReopen === '-' ? <span className="text-muted">—</span> : <span className="mono text-sm">{r.tglReopen}</span> },
        ]}
      />
    </div>
  );
}

Object.assign(window, {
  MonitoringApblScreen,
  RiwayatApblScreen,
});
