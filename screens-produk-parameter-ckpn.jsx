/* screens-produk-parameter-ckpn.jsx — Produk Parameter → Parameter CKPN
 *   /produk/parameter-ckpn → ParameterCkpnScreen (list + popup view/update/delete + add)
 * Parameter CKPN = tarif cadangan kerugian per Jenis Pencadangan / Segmen / Kolektibilitas.
 */

// Lookup modal: pick a Segmen (kode + nama)
function SegmenLookup({ open, onClose, onSelect }) {
  const [q, setQ] = React.useState('');
  if (!open) return null;
  const source = window.MOCK_SEGMEN || [];
  const filtered = q.trim()
    ? source.filter(s =>
        s.nama.toLowerCase().includes(q.toLowerCase()) ||
        s.kode.toLowerCase().includes(q.toLowerCase()))
    : source;
  return (
    <Modal
      title="Cari Segmen"
      subtitle="Daftar segmen pembiayaan"
      onClose={onClose}
      size="md"
      footer={<button className="btn btn--neutral" onClick={onClose}>Batal</button>}
    >
      <div className="tbl-search" style={{ maxWidth: 'none', marginBottom: 16 }}>
        <span dangerouslySetInnerHTML={{ __html: Icons.search(14) }} />
        <input autoFocus placeholder="Cari kode / nama segmen..." value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <table className="tbl">
        <thead>
          <tr><th style={{ width: 90 }}>Kode</th><th>Nama Segmen</th></tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr className="tbl-row--empty"><td colSpan={2} className="tbl-empty">Tidak ditemukan.</td></tr>
          ) : filtered.map(s => (
            <tr key={s.kode} className="tbl-row--clickable" onClick={() => { onSelect(s); onClose(); }}>
              <td className="mono">{s.kode}</td>
              <td>{s.nama}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Modal>
  );
}

// Add / Edit / View modal for a Parameter CKPN record.
function ParameterCkpnFormModal({ mode, initial, onClose, onSave }) {
  const [d, setD] = React.useState(initial);
  const [lookup, setLookup] = React.useState(false);
  const set = (k, v) => setD(p => ({ ...p, [k]: v }));
  const isView = mode === 'view';
  const valid = d.jenisPencadangan && String(d.segmenKode).trim() && String(d.kolektibilitas).trim() !== '' && String(d.tarif).trim() !== '';

  if (isView) {
    return (
      <Modal
        title="Detail Parameter CKPN"
        subtitle={`${d.jenisPencadangan} · ${d.segmenKode} — ${d.segmenNama}`}
        onClose={onClose}
        size="md"
        footer={<button className="btn btn--neutral" onClick={onClose}>Tutup</button>}
      >
        <FormGrid cols={2}>
          <Disp label="Jenis Pencadangan" value={d.jenisPencadangan} />
          <div></div>
          <div className="span-full"><Disp label="Segmen" value={`${d.segmenKode} — ${d.segmenNama}`} /></div>
          <Disp label="Kolektibilitas" value={String(d.kolektibilitas)} mono />
          <Disp label="Tarif" value={`${d.tarif} %`} mono />
        </FormGrid>
      </Modal>
    );
  }

  return (
    <>
      <Modal
        title={mode === 'edit' ? 'Update Data Parameter CKPN' : 'Tambah Data Parameter CKPN'}
        subtitle="Tarif cadangan kerugian per segmen & kolektibilitas"
        onClose={onClose}
        size="md"
        footer={
          <>
            <button className="btn btn--neutral" onClick={onClose}>Cancel / Close</button>
            <button className="btn btn--primary" disabled={!valid} onClick={() => onSave(d)}>
              <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(16) }} />
              Save
            </button>
          </>
        }
      >
        <FormGrid cols={1}>
          <Field label="Jenis Pencadangan" required>
            <Select value={d.jenisPencadangan} onChange={v => set('jenisPencadangan', v)} options={window.CKPN_JENIS_PENCADANGAN_OPTIONS} placeholder="-- Pilih --" />
          </Field>

          <Field label="Segmen" required>
            <div className="lookup-pair">
              <LookupInput
                value={d.segmenKode}
                placeholder="-- Pilih Segmen --"
                onChange={v => set('segmenKode', v)}
                onOpen={() => setLookup(true)}
              />
              <input className="input input--readonly" readOnly value={d.segmenNama} placeholder="Nama Segmen" />
            </div>
          </Field>

          <Field label="Kolektibilitas" required>
            <NumberInput value={d.kolektibilitas} onChange={v => set('kolektibilitas', v)} placeholder="1 - 5" />
          </Field>

          <Field label="Tarif" required>
            <NumberInput value={d.tarif} onChange={v => set('tarif', v)} suffix="%" placeholder="0.00" />
          </Field>
        </FormGrid>
      </Modal>

      <SegmenLookup
        open={lookup}
        onClose={() => setLookup(false)}
        onSelect={(s) => setD(p => ({ ...p, segmenKode: s.kode, segmenNama: s.nama }))}
      />
    </>
  );
}

function ParameterCkpnScreen({ showToast }) {
  const [rows, setRows] = React.useState(() => window.MOCK_PARAM_CKPN.slice());
  const [q, setQ] = React.useState('');
  const [jenis, setJenis] = React.useState('Semua');
  const [modal, setModal] = React.useState(null);          // { mode, index } | null
  const [confirmDel, setConfirmDel] = React.useState(null);  // row | null

  const persist = (next) => {
    setRows(next);
    window.MOCK_PARAM_CKPN.length = 0;
    next.forEach(x => window.MOCK_PARAM_CKPN.push(x));
  };

  const filtered = rows.filter(r => {
    if (jenis !== 'Semua' && r.jenisPencadangan !== jenis) return false;
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return [r.jenisPencadangan, r.segmenKode, r.segmenNama, r.kolektibilitas, r.tarif].some(v => String(v ?? '').toLowerCase().includes(s));
  });

  const nextId = () => (rows.reduce((m, r) => Math.max(m, r.id || 0), 0) + 1);

  const emptyDraft = {
    id: null, jenisPencadangan: 'CKPN', segmenKode: '', segmenNama: '', kolektibilitas: '', tarif: '',
  };

  return (
    <div className="card">
      <h2 className="page__title">
        Parameter CKPN
        <span className="subtitle">Tarif cadangan kerugian (CKPN / PPAP) per segmen &amp; kolektibilitas</span>
      </h2>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap', margin: '4px 0 16px' }}>
        <div style={{ flex: 1, minWidth: 220, maxWidth: 360 }}>
          <Field label="Cari">
            <TextInput value={q} onChange={setQ} placeholder="Cari segmen / kolektibilitas / tarif..." />
          </Field>
        </div>
        <div style={{ width: 200 }}>
          <Field label="Jenis Pencadangan">
            <Select value={jenis} onChange={setJenis} options={['Semua', ...window.CKPN_JENIS_PENCADANGAN_OPTIONS]} />
          </Field>
        </div>
        <button className="btn btn--primary" style={{ marginLeft: 'auto' }} onClick={() => setModal({ mode: 'add' })}>
          <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
          Tambah Parameter
        </button>
      </div>

      <DataTable
        showSearch={false}
        data={filtered}
        columns={[
          { key: 'jenisPencadangan', label: 'Jenis Pencadangan', width: 160, sort: true, render: r => <span className="tag tag--info">{r.jenisPencadangan}</span> },
          { key: 'segmenKode', label: 'Segmen', sort: true, render: r => <span><span className="mono">{r.segmenKode}</span> <span className="text-muted text-sm">{r.segmenNama}</span></span> },
          { key: 'kolektibilitas', label: 'Kolektibilitas', width: 130, align: 'center', render: r => <span className="mono">{r.kolektibilitas}</span> },
          { key: 'tarif', label: 'Tarif', width: 120, align: 'right', render: r => <span className="mono">{Number(r.tarif).toFixed(2)} %</span> },
        ]}
        popupItems={[
          { id: 'view',   label: 'View',   icon: 'view' },
          { id: 'update', label: 'Update', icon: 'edit' },
          { id: 'delete', label: 'Delete', icon: 'trash', danger: true },
        ]}
        onPopupClick={(row, id) => {
          const index = rows.findIndex(r => r.id === row.id);
          if (id === 'view')   { setModal({ mode: 'view', index }); return; }
          if (id === 'update') { setModal({ mode: 'edit', index }); return; }
          if (id === 'delete') { setConfirmDel(row); return; }
        }}
      />

      {modal && (
        <ParameterCkpnFormModal
          mode={modal.mode}
          initial={modal.mode === 'add' ? emptyDraft : rows[modal.index]}
          onClose={() => setModal(null)}
          onSave={(draft) => {
            const clean = { ...draft, kolektibilitas: Number(draft.kolektibilitas), tarif: Number(draft.tarif) };
            if (modal.mode === 'edit') {
              persist(rows.map((r, i) => i === modal.index ? clean : r));
              showToast({ type: 'success', title: 'Perubahan tersimpan', message: `${clean.jenisPencadangan} · ${clean.segmenKode} · Kol. ${clean.kolektibilitas}` });
            } else {
              persist([{ ...clean, id: nextId() }, ...rows]);
              showToast({ type: 'success', title: 'Parameter ditambahkan', message: `${clean.jenisPencadangan} · ${clean.segmenKode} · Kol. ${clean.kolektibilitas}` });
            }
            setModal(null);
          }}
        />
      )}

      {confirmDel && (
        <ConfirmDialog
          title="Hapus Parameter CKPN"
          message={`Hapus parameter ${confirmDel.jenisPencadangan} — Segmen ${confirmDel.segmenKode} (${confirmDel.segmenNama}), Kolektibilitas ${confirmDel.kolektibilitas}? Tindakan ini tidak dapat dibatalkan.`}
          onClose={() => setConfirmDel(null)}
          onConfirm={() => {
            persist(rows.filter(r => r.id !== confirmDel.id));
            showToast({ type: 'warn', title: 'Parameter dihapus', message: `${confirmDel.jenisPencadangan} · ${confirmDel.segmenKode}` });
            setConfirmDel(null);
          }}
        />
      )}
    </div>
  );
}

Object.assign(window, {
  ParameterCkpnScreen,
});
