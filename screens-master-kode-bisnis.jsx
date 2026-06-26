/* screens-master-kode-bisnis.jsx — Data Master → Data Kode Bisnis
 *   /master/kode-bisnis → DataKodeBisnisScreen (list + popup view/update/delete + add)
 * Master-detail:
 *   master  = kode_bisnis_data  (kode bisnis, deskripsi, is emas)
 *   detail1 = kode_bisnis_akad  → tab "Map. Produk"  (kode produk + nama produk)
 *   detail2 = kode_bisnis_type  → tab "Map. Segmen"  (jenis produk + segmen)
 */

// Generic 2-column lookup modal (kode + nama)
function KodeNamaLookup({ open, title, subtitle, source, kodeLabel, onClose, onSelect }) {
  const [q, setQ] = React.useState('');
  if (!open) return null;
  const filtered = q.trim()
    ? source.filter(x =>
        String(x.nama).toLowerCase().includes(q.toLowerCase()) ||
        String(x.kode).toLowerCase().includes(q.toLowerCase()))
    : source;
  return (
    <Modal
      title={title}
      subtitle={subtitle}
      onClose={onClose}
      size="md"
      footer={<button className="btn btn--neutral" onClick={onClose}>Batal</button>}
    >
      <div className="tbl-search" style={{ maxWidth: 'none', marginBottom: 16 }}>
        <span dangerouslySetInnerHTML={{ __html: Icons.search(14) }} />
        <input autoFocus placeholder="Cari kode / nama..." value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <table className="tbl">
        <thead>
          <tr><th style={{ width: 110 }}>{kodeLabel}</th><th>Nama</th></tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr className="tbl-row--empty"><td colSpan={2} className="tbl-empty">Tidak ditemukan.</td></tr>
          ) : filtered.map(x => (
            <tr key={x.kode} className="tbl-row--clickable" onClick={() => { onSelect(x); onClose(); }}>
              <td className="mono">{x.kode}</td>
              <td>{x.nama}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Modal>
  );
}

// ── Tab: Map. Produk (kode_bisnis_akad) ─────────────────────────────
function TabMapProduk({ rows, setRows, isView, showToast }) {
  const blank = { kodeProduk: '', namaProduk: '' };
  const [entry, setEntry] = React.useState(blank);
  const [selIdx, setSelIdx] = React.useState(null);
  const [lookup, setLookup] = React.useState(false);
  const reset = () => { setEntry(blank); setSelIdx(null); };

  const selectRow = (i) => { if (isView) return; setSelIdx(i); setEntry({ ...rows[i] }); };

  const handleTambah = () => {
    if (!entry.kodeProduk) { showToast({ type: 'warn', title: 'Pilih produk', message: 'Kode Produk wajib dipilih.' }); return; }
    if (rows.some(r => r.kodeProduk === entry.kodeProduk)) { showToast({ type: 'warn', title: 'Sudah terdaftar', message: `Produk ${entry.kodeProduk} sudah ada.` }); return; }
    setRows([...rows, { ...entry }]); reset();
  };
  const handleUbah = () => { if (selIdx == null) return; setRows(rows.map((r, i) => i === selIdx ? { ...entry } : r)); reset(); };
  const handleHapus = () => { if (selIdx == null) return; setRows(rows.filter((_, i) => i !== selIdx)); reset(); };

  return (
    <>
      {!isView && (
        <>
          <Field label="Kode Produk" required>
            <div className="lookup-pair">
              <LookupInput
                value={entry.kodeProduk}
                placeholder="-- Pilih Produk --"
                onChange={v => setEntry(e => ({ ...e, kodeProduk: v }))}
                onOpen={() => setLookup(true)}
              />
              <input className="input input--readonly" readOnly value={entry.namaProduk} placeholder="Nama Produk" />
            </div>
          </Field>

          <div className="row gap-12" style={{ margin: '16px 0' }}>
            <button className="btn btn--secondary btn--sm" onClick={handleTambah}>
              <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />Tambah
            </button>
            <button className="btn btn--secondary btn--sm" onClick={handleUbah} disabled={selIdx == null}>
              <span dangerouslySetInnerHTML={{ __html: Icons.edit(14) }} />Ubah
            </button>
            <button className="btn btn--sm" style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }} onClick={handleHapus} disabled={selIdx == null}>
              <span dangerouslySetInnerHTML={{ __html: Icons.trash(14) }} />Hapus
            </button>
            {selIdx != null && <button className="btn btn--neutral btn--sm" onClick={reset}>Batal Pilih</button>}
          </div>
        </>
      )}

      <table className="tbl">
        <thead>
          <tr><th style={{ width: 140 }}>Kode Produk</th><th>Nama Produk</th></tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr className="tbl-row--empty"><td colSpan={2} className="tbl-empty">Belum ada mapping produk.</td></tr>
          ) : rows.map((r, i) => (
            <tr key={r.kodeProduk} className={(isView ? '' : 'tbl-row--clickable') + (selIdx === i ? ' tbl-row--selected' : '')} onClick={() => selectRow(i)}>
              <td className="mono">{r.kodeProduk}</td>
              <td>{r.namaProduk}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <KodeNamaLookup
        open={lookup}
        title="Cari Produk"
        subtitle="Daftar produk pembiayaan"
        kodeLabel="Kode Produk"
        source={window.MOCK_KODE_PRODUK}
        onClose={() => setLookup(false)}
        onSelect={(x) => setEntry(e => ({ ...e, kodeProduk: x.kode, namaProduk: x.nama }))}
      />
    </>
  );
}

// ── Tab: Map. Segmen (kode_bisnis_type) ─────────────────────────────
function TabMapSegmen({ rows, setRows, isView, showToast }) {
  const blank = { jenisProduk: '', jenisProdukNama: '', segmen: '', segmenNama: '' };
  const [entry, setEntry] = React.useState(blank);
  const [selIdx, setSelIdx] = React.useState(null);
  const [lookup, setLookup] = React.useState(null); // 'jenis' | 'segmen' | null
  const reset = () => { setEntry(blank); setSelIdx(null); };

  const selectRow = (i) => { if (isView) return; setSelIdx(i); setEntry({ ...rows[i] }); };

  const handleTambah = () => {
    if (entry.jenisProduk === '' || entry.segmen === '') { showToast({ type: 'warn', title: 'Lengkapi data', message: 'Jenis Produk & Segmen wajib dipilih.' }); return; }
    if (rows.some(r => r.jenisProduk === entry.jenisProduk && r.segmen === entry.segmen)) { showToast({ type: 'warn', title: 'Sudah terdaftar', message: 'Kombinasi jenis produk & segmen sudah ada.' }); return; }
    setRows([...rows, { ...entry }]); reset();
  };
  const handleUbah = () => { if (selIdx == null) return; setRows(rows.map((r, i) => i === selIdx ? { ...entry } : r)); reset(); };
  const handleHapus = () => { if (selIdx == null) return; setRows(rows.filter((_, i) => i !== selIdx)); reset(); };

  return (
    <>
      {!isView && (
        <>
          <FormGrid cols={1}>
            <Field label="Jenis Produk" required>
              <div className="lookup-pair">
                <LookupInput
                  value={entry.jenisProduk}
                  placeholder="-- Pilih Jenis Produk --"
                  onChange={v => setEntry(e => ({ ...e, jenisProduk: v }))}
                  onOpen={() => setLookup('jenis')}
                />
                <input className="input input--readonly" readOnly value={entry.jenisProdukNama} placeholder="Deskripsi Jenis Produk" />
              </div>
            </Field>
            <Field label="Segmen" required>
              <div className="lookup-pair">
                <LookupInput
                  value={entry.segmen}
                  placeholder="-- Pilih Segmen --"
                  onChange={v => setEntry(e => ({ ...e, segmen: v }))}
                  onOpen={() => setLookup('segmen')}
                />
                <input className="input input--readonly" readOnly value={entry.segmenNama} placeholder="Nama Segmen" />
              </div>
            </Field>
          </FormGrid>

          <div className="row gap-12" style={{ margin: '16px 0' }}>
            <button className="btn btn--secondary btn--sm" onClick={handleTambah}>
              <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />Tambah
            </button>
            <button className="btn btn--secondary btn--sm" onClick={handleUbah} disabled={selIdx == null}>
              <span dangerouslySetInnerHTML={{ __html: Icons.edit(14) }} />Ubah
            </button>
            <button className="btn btn--sm" style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }} onClick={handleHapus} disabled={selIdx == null}>
              <span dangerouslySetInnerHTML={{ __html: Icons.trash(14) }} />Hapus
            </button>
            {selIdx != null && <button className="btn btn--neutral btn--sm" onClick={reset}>Batal Pilih</button>}
          </div>
        </>
      )}

      <table className="tbl">
        <thead>
          <tr>
            <th style={{ width: 110 }}>Jenis Produk</th>
            <th>Deskripsi Jenis Produk</th>
            <th style={{ width: 90 }}>Segmen</th>
            <th>Nama Segmen</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr className="tbl-row--empty"><td colSpan={4} className="tbl-empty">Belum ada mapping segmen.</td></tr>
          ) : rows.map((r, i) => (
            <tr key={`${r.jenisProduk}-${r.segmen}`} className={(isView ? '' : 'tbl-row--clickable') + (selIdx === i ? ' tbl-row--selected' : '')} onClick={() => selectRow(i)}>
              <td className="mono">{r.jenisProduk}</td>
              <td>{r.jenisProdukNama}</td>
              <td className="mono">{r.segmen}</td>
              <td>{r.segmenNama}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <KodeNamaLookup
        open={lookup === 'jenis'}
        title="Cari Jenis Produk"
        subtitle="Daftar jenis produk"
        kodeLabel="Jenis Produk"
        source={window.MOCK_JENIS_PRODUK}
        onClose={() => setLookup(null)}
        onSelect={(x) => setEntry(e => ({ ...e, jenisProduk: x.kode, jenisProdukNama: x.nama }))}
      />
      <KodeNamaLookup
        open={lookup === 'segmen'}
        title="Cari Segmen"
        subtitle="Daftar segmen"
        kodeLabel="Segmen"
        source={window.MOCK_SEGMEN_BISNIS}
        onClose={() => setLookup(null)}
        onSelect={(x) => setEntry(e => ({ ...e, segmen: x.kode, segmenNama: x.nama }))}
      />
    </>
  );
}

// ── Add / Edit / View modal (master + 2 detail tabs) ────────────────
function KodeBisnisFormModal({ mode, initial, onClose, onSave, showToast }) {
  const [d, setD] = React.useState(initial);
  const [akad, setAkad] = React.useState(initial.akad || []);
  const [type, setType] = React.useState(initial.type || []);
  const [tab, setTab] = React.useState('produk');
  const set = (k, v) => setD(p => ({ ...p, [k]: v }));
  const isView = mode === 'view';
  const valid = String(d.kodeBisnis).trim() && d.deskripsi.trim();

  const titlePrefix = mode === 'add' ? 'Tambah' : (mode === 'edit' ? 'Ubah' : 'Detail');

  return (
    <Modal
      title={`${titlePrefix} Kode Bisnis`}
      subtitle="Master kode bisnis & mapping produk / segmen"
      onClose={onClose}
      size="lg"
      footer={
        <>
          <button className="btn btn--neutral" onClick={onClose}>Keluar</button>
          {!isView && (
            <button className="btn btn--primary" disabled={!valid} onClick={() => onSave({ ...d, akad, type })}>
              <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(16) }} />
              Simpan
            </button>
          )}
        </>
      }
    >
      <FormGrid cols={2}>
        <Field label="Kode Bisnis" required>
          {isView || mode === 'edit'
            ? <input className="input input--readonly" readOnly value={d.kodeBisnis} />
            : <TextInput value={d.kodeBisnis} onChange={v => set('kodeBisnis', v.slice(0, 10))} placeholder="cth: 105" />}
        </Field>
        <Field label="Emas">
          {isView
            ? <div style={{ paddingTop: 6 }}><span className={'tag ' + (d.isEmas === 'Ya' ? 'tag--warning' : 'tag--neutral')}>{d.isEmas}</span></div>
            : <Select value={d.isEmas} onChange={v => set('isEmas', v)} options={window.KODE_BISNIS_EMAS_OPTIONS} />}
        </Field>
        <Field label="Deskripsi" required span="full">
          {isView
            ? <input className="input input--readonly" readOnly value={d.deskripsi} />
            : <TextInput value={d.deskripsi} onChange={v => set('deskripsi', v.slice(0, 100))} placeholder="Deskripsi kode bisnis" />}
        </Field>
      </FormGrid>

      <hr className="section-divider" />

      <SectionTabs value={tab} onChange={setTab} tabs={[
        { id: 'produk', label: 'Map. Produk' },
        { id: 'segmen', label: 'Map. Segmen' },
      ]} />

      {tab === 'produk' && <TabMapProduk rows={akad} setRows={setAkad} isView={isView} showToast={showToast} />}
      {tab === 'segmen' && <TabMapSegmen rows={type} setRows={setType} isView={isView} showToast={showToast} />}
    </Modal>
  );
}

function DataKodeBisnisScreen({ showToast }) {
  const [rows, setRows] = React.useState(() => window.MOCK_KODE_BISNIS.map(b => ({ ...b, akad: b.akad.slice(), type: b.type.slice() })));
  const [q, setQ] = React.useState('');
  const [modal, setModal] = React.useState(null);          // { mode, index } | null
  const [confirmDel, setConfirmDel] = React.useState(null);  // row | null

  const persist = (next) => {
    setRows(next);
    window.MOCK_KODE_BISNIS.length = 0;
    next.forEach(x => window.MOCK_KODE_BISNIS.push(x));
  };

  const filtered = rows.filter(r => {
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return [r.kodeBisnis, r.deskripsi].some(v => String(v || '').toLowerCase().includes(s));
  });

  const emptyDraft = { kodeBisnis: '', deskripsi: '', isEmas: 'Tidak', akad: [], type: [] };

  return (
    <div className="card">
      <h2 className="page__title">
        Data Kode Bisnis
        <span className="subtitle">Master kode bisnis &amp; mapping produk / segmen</span>
      </h2>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap', margin: '4px 0 16px' }}>
        <div style={{ flex: 1, minWidth: 240, maxWidth: 420 }}>
          <Field label="Cari">
            <TextInput value={q} onChange={setQ} placeholder="Cari kode bisnis / deskripsi..." />
          </Field>
        </div>
        <button className="btn btn--primary" style={{ marginLeft: 'auto' }} onClick={() => setModal({ mode: 'add' })}>
          <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
          Tambah Kode Bisnis
        </button>
      </div>

      <DataTable
        showSearch={false}
        data={filtered}
        columns={[
          { key: 'kodeBisnis', label: 'Kode Bisnis', width: 120, sort: true, render: r => <span className="mono">{r.kodeBisnis}</span> },
          { key: 'deskripsi',  label: 'Deskripsi', sort: true },
          { key: 'isEmas',     label: 'Emas', width: 90, align: 'center', render: r => <span className={'tag ' + (r.isEmas === 'Ya' ? 'tag--warning' : 'tag--neutral')}>{r.isEmas}</span> },
          { key: 'akad',       label: 'Map. Produk', width: 110, align: 'center', render: r => <span className="mono">{(r.akad || []).length}</span> },
          { key: 'type',       label: 'Map. Segmen', width: 110, align: 'center', render: r => <span className="mono">{(r.type || []).length}</span> },
        ]}
        popupItems={[
          { id: 'view',   label: 'View',   icon: 'view' },
          { id: 'update', label: 'Update', icon: 'edit' },
          { id: 'delete', label: 'Delete', icon: 'trash', danger: true },
        ]}
        onPopupClick={(row, id) => {
          const index = rows.findIndex(r => r.kodeBisnis === row.kodeBisnis);
          if (id === 'view')   { setModal({ mode: 'view', index }); return; }
          if (id === 'update') { setModal({ mode: 'edit', index }); return; }
          if (id === 'delete') { setConfirmDel(row); return; }
        }}
      />

      {modal && (
        <KodeBisnisFormModal
          mode={modal.mode}
          initial={modal.mode === 'add' ? emptyDraft : { ...rows[modal.index], akad: rows[modal.index].akad.slice(), type: rows[modal.index].type.slice() }}
          onClose={() => setModal(null)}
          showToast={showToast}
          onSave={(draft) => {
            if (modal.mode === 'edit') {
              persist(rows.map((r, i) => i === modal.index ? draft : r));
              showToast({ type: 'success', title: 'Perubahan tersimpan', message: `${draft.kodeBisnis} — ${draft.deskripsi}` });
            } else {
              if (rows.some(r => r.kodeBisnis === draft.kodeBisnis.trim())) {
                showToast({ type: 'warn', title: 'Kode sudah dipakai', message: `Kode bisnis ${draft.kodeBisnis} sudah ada.` });
                return;
              }
              persist([{ ...draft }, ...rows]);
              showToast({ type: 'success', title: 'Kode bisnis ditambahkan', message: `${draft.kodeBisnis} — ${draft.deskripsi}` });
            }
            setModal(null);
          }}
        />
      )}

      {confirmDel && (
        <ConfirmDialog
          title="Hapus Kode Bisnis"
          message={`Hapus kode bisnis "${confirmDel.deskripsi}" (${confirmDel.kodeBisnis}) beserta mapping produk & segmen? Tindakan ini tidak dapat dibatalkan.`}
          onClose={() => setConfirmDel(null)}
          onConfirm={() => {
            persist(rows.filter(r => r.kodeBisnis !== confirmDel.kodeBisnis));
            showToast({ type: 'warn', title: 'Kode bisnis dihapus', message: confirmDel.deskripsi });
            setConfirmDel(null);
          }}
        />
      )}
    </div>
  );
}

Object.assign(window, {
  DataKodeBisnisScreen,
});
