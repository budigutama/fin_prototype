/* screens-master-mitra.jsx — Data Master → Data Mitra Join Finance
 *   /master/mitra → DataMitraJFScreen (list + popup view/update + add)
 * Mitra Join Finance = bank/lembaga rekanan untuk pembiayaan bersama (sindikasi).
 */

// Lookup modal: pick a produk pembiayaan (kode + nama + akad)
function ProdukLookup({ open, onClose, onSelect }) {
  const [q, setQ] = React.useState('');
  if (!open) return null;
  const source = window.MOCK_PRODUK_PEMBIAYAAN || [];
  const filtered = q.trim()
    ? source.filter(p =>
        p.nama.toLowerCase().includes(q.toLowerCase()) ||
        p.kode.toLowerCase().includes(q.toLowerCase()) ||
        (p.akad || '').toLowerCase().includes(q.toLowerCase()))
    : source;
  return (
    <Modal
      title="Cari Produk Pembiayaan"
      subtitle="Daftar produk pembiayaan aktif"
      onClose={onClose}
      size="lg"
      footer={<button className="btn btn--neutral" onClick={onClose}>Batal</button>}
    >
      <div className="tbl-search" style={{ maxWidth: 'none', marginBottom: 16 }}>
        <span dangerouslySetInnerHTML={{ __html: Icons.search(14) }} />
        <input autoFocus placeholder="Cari kode / nama / akad..." value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <table className="tbl">
        <thead>
          <tr>
            <th style={{ width: 90 }}>Kode</th>
            <th>Nama Produk</th>
            <th style={{ width: 130 }}>Akad</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr className="tbl-row--empty"><td colSpan={3} className="tbl-empty">Tidak ditemukan.</td></tr>
          ) : filtered.slice(0, 10).map(p => (
            <tr key={p.kode} className="tbl-row--clickable" onClick={() => { onSelect(p); onClose(); }}>
              <td className="mono">{p.kode}</td>
              <td>{p.nama}</td>
              <td><span className="tag tag--info">{p.akad}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Modal>
  );
}

// Add / Edit / View modal for a Mitra Join Finance record.
function MitraJFFormModal({ mode, initial, onClose, onSave }) {
  const [d, setD] = React.useState(initial);
  const [lookup, setLookup] = React.useState(null); // 'produk' | 'pembayaran' | 'margin' | 'pokok' | null
  const set = (k, v) => setD(p => ({ ...p, [k]: v }));
  const isView = mode === 'view';
  const valid = d.kodeMitra.trim() && d.namaMitra.trim();

  const coaNama = (kode) => window.getCoaByKode?.(kode)?.nama || '';
  const produkNama = (kode) => {
    const p = (window.MOCK_PRODUK_PEMBIAYAAN || []).find(x => x.kode === kode);
    return p ? p.nama : '';
  };

  // Read-only display view
  if (isView) {
    return (
      <Modal
        title={`Detail Mitra Join Finance`}
        subtitle={`${d.kodeMitra} — ${d.namaMitra}`}
        onClose={onClose}
        size="lg"
        footer={<button className="btn btn--neutral" onClick={onClose}>Tutup</button>}
      >
        <FormGrid cols={2}>
          <Disp label="Kode Mitra JF" value={d.kodeMitra} mono />
          <Disp label="Nama Mitra JF" value={d.namaMitra} />
          <div className="span-full"><Disp label="Kode Produk" value={d.kodeProduk ? `${d.kodeProduk} — ${produkNama(d.kodeProduk)}` : '—'} /></div>
          <div className="span-full"><Disp label="GL Pembayaran Diterima" value={d.glPembayaranKode ? <span><span className="mono">{d.glPembayaranKode}</span> — {coaNama(d.glPembayaranKode)}</span> : '—'} /></div>
          <div className="span-full"><Disp label="GL Titipan Angsuran Margin" value={d.glTitipanMarginKode ? <span><span className="mono">{d.glTitipanMarginKode}</span> — {coaNama(d.glTitipanMarginKode)}</span> : '—'} /></div>
          <div className="span-full"><Disp label="GL Titipan Angsuran Pokok" value={d.glTitipanPokokKode ? <span><span className="mono">{d.glTitipanPokokKode}</span> — {coaNama(d.glTitipanPokokKode)}</span> : '—'} /></div>
          <Disp label="Porsi Modal Mitra" value={(d.porsiModal || d.porsiModal === 0) ? `${d.porsiModal} %` : '—'} mono />
          <Disp label="Eqv. Rate" value={(d.eqvRate || d.eqvRate === 0) ? `${d.eqvRate} %` : '—'} mono />
        </FormGrid>
      </Modal>
    );
  }

  // Edit / Add form
  return (
    <>
      <Modal
        title={mode === 'edit' ? 'Ubah Mitra Join Finance' : 'Tambah Mitra Join Finance'}
        subtitle="Data mitra pembiayaan bersama (join finance / sindikasi)"
        onClose={onClose}
        size="lg"
        footer={
          <>
            <button className="btn btn--neutral" onClick={onClose}>Batal</button>
            <button className="btn btn--primary" disabled={!valid} onClick={() => onSave(d)}>
              <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(16) }} />
              Simpan
            </button>
          </>
        }
      >
        <FormGrid cols={2}>
          <Field label="Kode Mitra JF" required>
            <TextInput value={d.kodeMitra} onChange={v => set('kodeMitra', v)} readOnly={mode === 'edit'} placeholder="JF-001" />
          </Field>
          <Field label="Nama Mitra JF" required>
            <TextInput value={d.namaMitra} onChange={v => set('namaMitra', v)} placeholder="PT Bank Syariah ..." />
          </Field>

          <Field label="Kode Produk" span="full">
            <div className="lookup-pair">
              <LookupInput
                value={d.kodeProduk}
                placeholder="-- Pilih Produk --"
                onChange={v => set('kodeProduk', v)}
                onOpen={() => setLookup('produk')}
              />
              <input className="input input--readonly" readOnly value={produkNama(d.kodeProduk)} placeholder="Nama Produk" />
            </div>
          </Field>

          <Field label="GL Pembayaran Diterima" span="full">
            <div className="lookup-pair">
              <LookupInput
                value={d.glPembayaranKode}
                placeholder="-- Pilih GL --"
                onChange={v => set('glPembayaranKode', v)}
                onOpen={() => setLookup('pembayaran')}
              />
              <input className="input input--readonly" readOnly value={coaNama(d.glPembayaranKode)} placeholder="Nama COA" />
            </div>
          </Field>

          <Field label="GL Titipan Angsuran Margin" span="full">
            <div className="lookup-pair">
              <LookupInput
                value={d.glTitipanMarginKode}
                placeholder="-- Pilih GL --"
                onChange={v => set('glTitipanMarginKode', v)}
                onOpen={() => setLookup('margin')}
              />
              <input className="input input--readonly" readOnly value={coaNama(d.glTitipanMarginKode)} placeholder="Nama COA" />
            </div>
          </Field>

          <Field label="GL Titipan Angsuran Pokok" span="full">
            <div className="lookup-pair">
              <LookupInput
                value={d.glTitipanPokokKode}
                placeholder="-- Pilih GL --"
                onChange={v => set('glTitipanPokokKode', v)}
                onOpen={() => setLookup('pokok')}
              />
              <input className="input input--readonly" readOnly value={coaNama(d.glTitipanPokokKode)} placeholder="Nama COA" />
            </div>
          </Field>

          <Field label="Porsi Modal Mitra (%)">
            <NumberInput value={d.porsiModal} onChange={v => set('porsiModal', v)} placeholder="0" suffix="%" />
          </Field>
          <Field label="Eqv. Rate (%)">
            <NumberInput value={d.eqvRate} onChange={v => set('eqvRate', v)} placeholder="0" suffix="%" />
          </Field>
        </FormGrid>
      </Modal>

      <ProdukLookup
        open={lookup === 'produk'}
        onClose={() => setLookup(null)}
        onSelect={(p) => set('kodeProduk', p.kode)}
      />
      <CoaLookup
        open={lookup === 'pembayaran'}
        onClose={() => setLookup(null)}
        onSelect={(c) => set('glPembayaranKode', c.kode)}
      />
      <CoaLookup
        open={lookup === 'margin'}
        onClose={() => setLookup(null)}
        onSelect={(c) => set('glTitipanMarginKode', c.kode)}
      />
      <CoaLookup
        open={lookup === 'pokok'}
        onClose={() => setLookup(null)}
        onSelect={(c) => set('glTitipanPokokKode', c.kode)}
      />
    </>
  );
}

function DataMitraJFScreen({ showToast }) {
  const [rows, setRows] = React.useState(() => window.MOCK_MITRA_JF.slice());
  const [q, setQ] = React.useState('');
  const [modal, setModal] = React.useState(null); // { mode, index } | null

  const persist = (next) => {
    setRows(next);
    window.MOCK_MITRA_JF.length = 0;
    next.forEach(x => window.MOCK_MITRA_JF.push(x));
  };

  const filtered = rows.filter(r => {
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return [r.kodeMitra, r.namaMitra, r.kodeProduk].some(v => String(v || '').toLowerCase().includes(s));
  });

  const coaNama = (kode) => window.getCoaByKode?.(kode)?.nama || '';

  const emptyDraft = {
    kodeMitra: '', namaMitra: '', kodeProduk: '',
    glPembayaranKode: '', glTitipanMarginKode: '', glTitipanPokokKode: '',
    porsiModal: '', eqvRate: '',
  };

  return (
    <div className="card">
      <h2 className="page__title">
        Data Mitra Join Finance
        <span className="subtitle">Master mitra pembiayaan bersama (join finance / sindikasi)</span>
      </h2>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap', margin: '4px 0 16px' }}>
        <div style={{ flex: 1, minWidth: 240, maxWidth: 420 }}>
          <Field label="Cari">
            <TextInput value={q} onChange={setQ} placeholder="Cari kode / nama mitra / kode produk..." />
          </Field>
        </div>
        <button className="btn btn--primary" style={{ marginLeft: 'auto' }} onClick={() => setModal({ mode: 'add' })}>
          <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
          Tambah Mitra
        </button>
      </div>

      <DataTable
        showSearch={false}
        data={filtered}
        columns={[
          { key: 'kodeMitra',  label: 'Kode Mitra JF', width: 120, sort: true, render: r => <span className="mono">{r.kodeMitra}</span> },
          { key: 'namaMitra',  label: 'Nama Mitra JF', sort: true },
          { key: 'kodeProduk', label: 'Kode Produk', width: 110, render: r => r.kodeProduk ? <span className="mono">{r.kodeProduk}</span> : <span className="text-muted">—</span> },
          { key: 'glPembayaranKode',   label: 'GL Pembayaran Diterima',     render: r => r.glPembayaranKode ? <span><span className="mono">{r.glPembayaranKode}</span> <span className="text-muted text-sm">{coaNama(r.glPembayaranKode)}</span></span> : <span className="text-muted">—</span> },
          { key: 'glTitipanMarginKode', label: 'GL Titipan Angs. Margin',   render: r => r.glTitipanMarginKode ? <span><span className="mono">{r.glTitipanMarginKode}</span> <span className="text-muted text-sm">{coaNama(r.glTitipanMarginKode)}</span></span> : <span className="text-muted">—</span> },
          { key: 'glTitipanPokokKode',  label: 'GL Titipan Angs. Pokok',    render: r => r.glTitipanPokokKode ? <span><span className="mono">{r.glTitipanPokokKode}</span> <span className="text-muted text-sm">{coaNama(r.glTitipanPokokKode)}</span></span> : <span className="text-muted">—</span> },
          { key: 'porsiModal', label: 'Porsi Modal', width: 100, align: 'center', render: r => <span className="mono">{(r.porsiModal || r.porsiModal === 0) ? r.porsiModal + ' %' : '—'}</span> },
          { key: 'eqvRate',    label: 'Eqv. Rate', width: 100, align: 'center', render: r => <span className="mono">{(r.eqvRate || r.eqvRate === 0) ? r.eqvRate + ' %' : '—'}</span> },
        ]}
        popupItems={[
          { id: 'view',   label: 'View', icon: 'view' },
          { id: 'update', label: 'Update', icon: 'edit' },
        ]}
        onPopupClick={(row, id) => {
          const index = rows.findIndex(r => r.kodeMitra === row.kodeMitra);
          if (id === 'view')   { setModal({ mode: 'view', index }); return; }
          if (id === 'update') { setModal({ mode: 'edit', index }); return; }
        }}
      />

      {modal && (
        <MitraJFFormModal
          mode={modal.mode}
          initial={modal.mode === 'add' ? emptyDraft : rows[modal.index]}
          onClose={() => setModal(null)}
          onSave={(draft) => {
            if (modal.mode === 'edit') {
              persist(rows.map((r, i) => i === modal.index ? draft : r));
              showToast({ type: 'success', title: 'Perubahan tersimpan', message: `${draft.kodeMitra} — ${draft.namaMitra}` });
            } else {
              if (rows.some(r => r.kodeMitra === draft.kodeMitra.trim())) {
                showToast({ type: 'warn', title: 'Kode sudah dipakai', message: `Mitra ${draft.kodeMitra} sudah ada.` });
                return;
              }
              persist([draft, ...rows]);
              showToast({ type: 'success', title: 'Mitra ditambahkan', message: `${draft.kodeMitra} — ${draft.namaMitra}` });
            }
            setModal(null);
          }}
        />
      )}
    </div>
  );
}

Object.assign(window, {
  DataMitraJFScreen,
});
