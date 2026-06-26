/* screens-master-pejabat.jsx — Data Master → Data Pejabat
 *   /master/pejabat → DataPejabatScreen (list + popup view/update/delete + add)
 * Pejabat = officer penandatangan per cabang (SK, jabatan, user ID, flag cetak).
 */

// Lookup modal: pick a Cabang (kode + nama)
function CabangLookup({ open, onClose, onSelect }) {
  const [q, setQ] = React.useState('');
  if (!open) return null;
  const source = window.MOCK_CABANG || [];
  const filtered = q.trim()
    ? source.filter(c =>
        c.nama.toLowerCase().includes(q.toLowerCase()) ||
        c.kode.toLowerCase().includes(q.toLowerCase()))
    : source;
  return (
    <Modal
      title="Cari Cabang"
      subtitle="Daftar kantor cabang"
      onClose={onClose}
      size="md"
      footer={<button className="btn btn--neutral" onClick={onClose}>Batal</button>}
    >
      <div className="tbl-search" style={{ maxWidth: 'none', marginBottom: 16 }}>
        <span dangerouslySetInnerHTML={{ __html: Icons.search(14) }} />
        <input autoFocus placeholder="Cari kode / nama cabang..." value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <table className="tbl">
        <thead>
          <tr><th style={{ width: 90 }}>Kode</th><th>Nama Cabang</th></tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr className="tbl-row--empty"><td colSpan={2} className="tbl-empty">Tidak ditemukan.</td></tr>
          ) : filtered.map(c => (
            <tr key={c.kode} className="tbl-row--clickable" onClick={() => { onSelect(c); onClose(); }}>
              <td className="mono">{c.kode}</td>
              <td>{c.nama}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Modal>
  );
}

// Lookup modal: pick a User (kode + nama)
function UserLookup({ open, onClose, onSelect }) {
  const [q, setQ] = React.useState('');
  if (!open) return null;
  const source = window.MOCK_PEJABAT_USER || [];
  const filtered = q.trim()
    ? source.filter(u =>
        u.nama.toLowerCase().includes(q.toLowerCase()) ||
        u.kode.toLowerCase().includes(q.toLowerCase()))
    : source;
  return (
    <Modal
      title="Cari User"
      subtitle="Daftar user / pengguna sistem"
      onClose={onClose}
      size="md"
      footer={<button className="btn btn--neutral" onClick={onClose}>Batal</button>}
    >
      <div className="tbl-search" style={{ maxWidth: 'none', marginBottom: 16 }}>
        <span dangerouslySetInnerHTML={{ __html: Icons.search(14) }} />
        <input autoFocus placeholder="Cari user ID / nama..." value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <table className="tbl">
        <thead>
          <tr><th style={{ width: 110 }}>User ID</th><th>Nama</th></tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr className="tbl-row--empty"><td colSpan={2} className="tbl-empty">Tidak ditemukan.</td></tr>
          ) : filtered.map(u => (
            <tr key={u.kode} className="tbl-row--clickable" onClick={() => { onSelect(u); onClose(); }}>
              <td className="mono">{u.kode}</td>
              <td>{u.nama}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Modal>
  );
}

// Add / Edit / View modal for a Pejabat record.
function PejabatFormModal({ mode, initial, onClose, onSave }) {
  const [d, setD] = React.useState(initial);
  const [lookup, setLookup] = React.useState(null); // 'cabang' | 'user' | null
  const set = (k, v) => setD(p => ({ ...p, [k]: v }));
  const isView = mode === 'view';
  const valid = String(d.cabangKode).trim() && d.nama.trim() && d.jabatan.trim();

  // Read-only display view
  if (isView) {
    return (
      <Modal
        title="Detail Pejabat"
        subtitle={`${d.cabangKode} — ${d.nama}`}
        onClose={onClose}
        size="md"
        footer={<button className="btn btn--neutral" onClick={onClose}>Tutup</button>}
      >
        <FormGrid cols={2}>
          <div className="span-full"><Disp label="Cabang" value={`${d.cabangKode} — ${d.cabangNama}`} /></div>
          <div className="span-full"><Disp label="Nama Pejabat" value={d.nama} /></div>
          <Disp label="Nomor SK" value={d.nomorSK || '—'} mono />
          <Disp label="Jabatan" value={d.jabatan} />
          <Disp label="User ID" value={d.userId ? `${d.userId} — ${d.userNama}` : '—'} mono />
          <Disp label="Cetak" value={String(!!d.cetak)} mono />
        </FormGrid>
      </Modal>
    );
  }

  // Edit / Add form — mirrors legacy "Edit Pejabat" form
  return (
    <>
      <Modal
        title={mode === 'edit' ? 'Edit Pejabat' : 'Tambah Pejabat'}
        subtitle="Data pejabat penandatangan per cabang"
        onClose={onClose}
        size="md"
        footer={
          <>
            <button className="btn btn--neutral" onClick={onClose}>Keluar</button>
            <button className="btn btn--primary" disabled={!valid} onClick={() => onSave(d)}>
              <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(16) }} />
              Simpan
            </button>
          </>
        }
      >
        <FormGrid cols={1}>
          <Field label="Cabang" required>
            <div className="lookup-pair">
              <LookupInput
                value={d.cabangKode}
                placeholder="-- Pilih Cabang --"
                onChange={v => set('cabangKode', v)}
                onOpen={() => setLookup('cabang')}
              />
              <input className="input input--readonly" readOnly value={d.cabangNama} placeholder="Nama Cabang" />
            </div>
          </Field>

          <Field label="Nama Pejabat" required>
            <TextInput value={d.nama} onChange={v => set('nama', v)} placeholder="Nama lengkap pejabat" />
          </Field>

          <Field label="Nomor SK">
            <TextInput value={d.nomorSK} onChange={v => set('nomorSK', v)} placeholder="cth: 024/SK/DIR-DSD/2026" />
          </Field>

          <Field label="Jabatan" required>
            <TextInput value={d.jabatan} onChange={v => set('jabatan', v)} placeholder="cth: PLT PEMIMPIN CABANG" />
          </Field>

          <Field label="User ID">
            <div className="lookup-pair">
              <LookupInput
                value={d.userId}
                placeholder="-- Pilih User --"
                onChange={v => set('userId', v)}
                onOpen={() => setLookup('user')}
              />
              <input className="input input--readonly" readOnly value={d.userNama} placeholder="Nama User" />
            </div>
          </Field>

          <Field label="Cetak">
            <Select value={String(!!d.cetak)} onChange={v => set('cetak', v === 'true')} options={['false', 'true']} />
          </Field>
        </FormGrid>
      </Modal>

      <CabangLookup
        open={lookup === 'cabang'}
        onClose={() => setLookup(null)}
        onSelect={(c) => setD(p => ({ ...p, cabangKode: c.kode, cabangNama: c.nama }))}
      />
      <UserLookup
        open={lookup === 'user'}
        onClose={() => setLookup(null)}
        onSelect={(u) => setD(p => ({ ...p, userId: u.kode, userNama: u.nama }))}
      />
    </>
  );
}

function DataPejabatScreen({ showToast }) {
  const [rows, setRows] = React.useState(() => window.MOCK_PEJABAT.slice());
  const [q, setQ] = React.useState('');
  const [modal, setModal] = React.useState(null);     // { mode, index } | null
  const [confirmDel, setConfirmDel] = React.useState(null); // row | null

  const persist = (next) => {
    setRows(next);
    window.MOCK_PEJABAT.length = 0;
    next.forEach(x => window.MOCK_PEJABAT.push(x));
  };

  const filtered = rows.filter(r => {
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return [r.cabangKode, r.cabangNama, r.nama, r.nomorSK, r.jabatan, r.userId].some(v => String(v || '').toLowerCase().includes(s));
  });

  const nextId = () => (rows.reduce((m, r) => Math.max(m, r.id || 0), 0) + 1);

  const emptyDraft = {
    id: null, cabangKode: '', cabangNama: '', nama: '', nomorSK: '',
    jabatan: '', userId: '', userNama: '', cetak: false,
  };

  return (
    <div className="card">
      <h2 className="page__title">
        Data Pejabat
        <span className="subtitle">Master pejabat penandatangan per cabang — SK, jabatan, user ID</span>
      </h2>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap', margin: '4px 0 16px' }}>
        <div style={{ flex: 1, minWidth: 240, maxWidth: 420 }}>
          <Field label="Cari">
            <TextInput value={q} onChange={setQ} placeholder="Cari cabang / nama / jabatan / user ID..." />
          </Field>
        </div>
        <button className="btn btn--primary" style={{ marginLeft: 'auto' }} onClick={() => setModal({ mode: 'add' })}>
          <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
          Tambah Pejabat
        </button>
      </div>

      <DataTable
        showSearch={false}
        data={filtered}
        columns={[
          { key: 'cabangKode', label: 'Cabang', width: 220, sort: true, render: r => <span><span className="mono">{r.cabangKode}</span> <span className="text-muted text-sm">{r.cabangNama}</span></span> },
          { key: 'nama',       label: 'Nama Pejabat', sort: true },
          { key: 'nomorSK',    label: 'Nomor SK', width: 180, render: r => r.nomorSK ? <span className="mono">{r.nomorSK}</span> : <span className="text-muted">—</span> },
          { key: 'jabatan',    label: 'Jabatan', width: 200 },
          { key: 'userId',     label: 'User ID', width: 100, render: r => r.userId ? <span className="mono">{r.userId}</span> : <span className="text-muted">—</span> },
          { key: 'cetak',      label: 'Cetak', width: 80, align: 'center', render: r => <span className={'tag ' + (r.cetak ? 'tag--success' : '')}>{r.cetak ? 'true' : 'false'}</span> },
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
        <PejabatFormModal
          mode={modal.mode}
          initial={modal.mode === 'add' ? emptyDraft : rows[modal.index]}
          onClose={() => setModal(null)}
          onSave={(draft) => {
            if (modal.mode === 'edit') {
              persist(rows.map((r, i) => i === modal.index ? draft : r));
              showToast({ type: 'success', title: 'Perubahan tersimpan', message: `${draft.cabangKode} — ${draft.nama}` });
            } else {
              persist([{ ...draft, id: nextId() }, ...rows]);
              showToast({ type: 'success', title: 'Pejabat ditambahkan', message: `${draft.cabangKode} — ${draft.nama}` });
            }
            setModal(null);
          }}
        />
      )}

      {confirmDel && (
        <ConfirmDialog
          title="Hapus Data Pejabat"
          message={`Hapus pejabat "${confirmDel.nama}" (${confirmDel.cabangKode} — ${confirmDel.cabangNama})? Tindakan ini tidak dapat dibatalkan.`}
          onClose={() => setConfirmDel(null)}
          onConfirm={() => {
            persist(rows.filter(r => r.id !== confirmDel.id));
            showToast({ type: 'warn', title: 'Pejabat dihapus', message: confirmDel.nama });
            setConfirmDel(null);
          }}
        />
      )}
    </div>
  );
}

Object.assign(window, {
  DataPejabatScreen,
});
