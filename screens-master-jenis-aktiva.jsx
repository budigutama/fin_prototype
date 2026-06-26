/* screens-master-jenis-aktiva.jsx — Data Master → Data Jenis Aktiva
 *   /master/jenis-aktiva → DataJenisAktivaScreen (list + popup view/update/delete + add)
 * Master asset type (tipe aktiva): kode, nama, masa pakai, metode penyusutan.
 */

// Add / Edit / View modal for an asset-type record.
function JenisAktivaFormModal({ mode, initial, onClose, onSave, kodeExists }) {
  const [d, setD] = React.useState(initial);
  const set = (k, v) => setD(p => ({ ...p, [k]: v }));
  const isView = mode === 'view';
  const noDepreciation = d.metodePenyusutan === 'Tidak Disusutkan';
  const valid = d.kode.trim() && d.nama.trim() && d.metodePenyusutan;

  if (isView) {
    return (
      <Modal
        title="Detail Jenis Aktiva"
        subtitle={`${d.kode} — ${d.nama}`}
        onClose={onClose}
        size="md"
        footer={<button className="btn btn--neutral" onClick={onClose}>Tutup</button>}
      >
        <FormGrid cols={2}>
          <Disp label="Kode Tipe Aktiva" value={d.kode} mono />
          <div></div>
          <div className="span-full"><Disp label="Nama Tipe Aktiva" value={d.nama} /></div>
          <Disp label="Masa Pakai" value={d.masaPakai ? `${d.masaPakai} tahun` : '—'} mono />
          <Disp label="Metode Penyusutan" value={d.metodePenyusutan} />
        </FormGrid>
      </Modal>
    );
  }

  return (
    <Modal
      title={mode === 'edit' ? 'Ubah Jenis Aktiva' : 'Tambah Jenis Aktiva'}
      subtitle="Master tipe aktiva & metode penyusutan"
      onClose={onClose}
      size="md"
      footer={
        <>
          <button className="btn btn--neutral" onClick={onClose}>Batal</button>
          <button className="btn btn--primary" disabled={!valid} onClick={() => onSave(d)}>
            <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(16) }} />
            {mode === 'edit' ? 'Simpan' : 'Tambah'}
          </button>
        </>
      }
    >
      <FormGrid cols={1}>
        <Field label="Kode Tipe Aktiva" required hint={mode === 'add' && d.kode && kodeExists(d.kode) ? 'Kode sudah dipakai' : undefined}>
          <TextInput value={d.kode} onChange={v => set('kode', v.toUpperCase().slice(0, 5))} placeholder="cth: KND" readOnly={mode === 'edit'} />
        </Field>

        <Field label="Nama Tipe Aktiva" required>
          <TextInput value={d.nama} onChange={v => set('nama', v)} placeholder="cth: Kendaraan Bermotor" />
        </Field>

        <Field label="Metode Penyusutan" required>
          <Select value={d.metodePenyusutan} onChange={v => set('metodePenyusutan', v)} options={window.AKTIVA_METODE_PENYUSUTAN_OPTIONS} placeholder="-- Pilih Metode Penyusutan --" />
        </Field>

        <Field label="Masa Pakai" hint={noDepreciation ? 'Tidak berlaku untuk aktiva tidak disusutkan' : 'Dalam tahun'}>
          <NumberInput value={noDepreciation ? '' : d.masaPakai} onChange={v => set('masaPakai', v)} suffix="tahun" placeholder="0" disabled={noDepreciation} />
        </Field>
      </FormGrid>
    </Modal>
  );
}

function DataJenisAktivaScreen({ showToast }) {
  const [rows, setRows] = React.useState(() => window.MOCK_JENIS_AKTIVA.slice());
  const [q, setQ] = React.useState('');
  const [metode, setMetode] = React.useState('Semua');
  const [modal, setModal] = React.useState(null);           // { mode, index } | null
  const [confirmDel, setConfirmDel] = React.useState(null);   // row | null

  const persist = (next) => {
    setRows(next);
    window.MOCK_JENIS_AKTIVA.length = 0;
    next.forEach(x => window.MOCK_JENIS_AKTIVA.push(x));
  };

  const filtered = rows.filter(r => {
    if (metode !== 'Semua' && r.metodePenyusutan !== metode) return false;
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return [r.kode, r.nama, r.metodePenyusutan].some(v => String(v ?? '').toLowerCase().includes(s));
  });

  const nextId = () => (rows.reduce((m, r) => Math.max(m, r.id || 0), 0) + 1);
  const kodeExists = (kode) => rows.some(r => String(r.kode).toUpperCase() === String(kode).toUpperCase());

  const emptyDraft = {
    id: null, kode: '', nama: '', masaPakai: '', metodePenyusutan: '',
  };

  return (
    <div className="card">
      <h2 className="page__title">
        Data Jenis Aktiva
        <span className="subtitle">Master tipe aktiva — masa pakai &amp; metode penyusutan</span>
      </h2>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap', margin: '4px 0 16px' }}>
        <div style={{ flex: 1, minWidth: 220, maxWidth: 360 }}>
          <Field label="Cari">
            <TextInput value={q} onChange={setQ} placeholder="Cari kode / nama tipe aktiva..." />
          </Field>
        </div>
        <div style={{ width: 220 }}>
          <Field label="Metode Penyusutan">
            <Select value={metode} onChange={setMetode} options={['Semua', ...window.AKTIVA_METODE_PENYUSUTAN_OPTIONS]} />
          </Field>
        </div>
        <button className="btn btn--primary" style={{ marginLeft: 'auto' }} onClick={() => setModal({ mode: 'add' })}>
          <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
          Tambah Jenis Aktiva
        </button>
      </div>

      <DataTable
        showSearch={false}
        data={filtered}
        columns={[
          { key: 'kode', label: 'Kode Tipe Aktiva', width: 150, sort: true, render: r => <span className="mono">{r.kode}</span> },
          { key: 'nama', label: 'Nama Tipe Aktiva', sort: true },
          { key: 'masaPakai', label: 'Masa Pakai', width: 130, align: 'right', render: r => r.masaPakai ? <span className="mono">{r.masaPakai} thn</span> : <span className="text-muted">—</span> },
          { key: 'metodePenyusutan', label: 'Metode Penyusutan', width: 190, render: r => <span className="tag tag--neutral">{r.metodePenyusutan}</span> },
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
        <JenisAktivaFormModal
          mode={modal.mode}
          initial={modal.mode === 'add' ? emptyDraft : rows[modal.index]}
          onClose={() => setModal(null)}
          kodeExists={kodeExists}
          onSave={(draft) => {
            const noDep = draft.metodePenyusutan === 'Tidak Disusutkan';
            const clean = { ...draft, masaPakai: noDep ? 0 : (Number(draft.masaPakai) || 0) };
            if (modal.mode === 'edit') {
              persist(rows.map((r, i) => i === modal.index ? clean : r));
              showToast({ type: 'success', title: 'Perubahan tersimpan', message: `${clean.kode} — ${clean.nama}` });
            } else {
              if (kodeExists(clean.kode)) {
                showToast({ type: 'warn', title: 'Kode sudah dipakai', message: `Tipe aktiva ${clean.kode} sudah ada.` });
                return;
              }
              persist([{ ...clean, id: nextId() }, ...rows]);
              showToast({ type: 'success', title: 'Jenis aktiva ditambahkan', message: `${clean.kode} — ${clean.nama}` });
            }
            setModal(null);
          }}
        />
      )}

      {confirmDel && (
        <ConfirmDialog
          title="Hapus Jenis Aktiva"
          message={`Hapus tipe aktiva "${confirmDel.nama}" (${confirmDel.kode})? Tindakan ini tidak dapat dibatalkan.`}
          onClose={() => setConfirmDel(null)}
          onConfirm={() => {
            persist(rows.filter(r => r.id !== confirmDel.id));
            showToast({ type: 'warn', title: 'Jenis aktiva dihapus', message: confirmDel.nama });
            setConfirmDel(null);
          }}
        />
      )}
    </div>
  );
}

Object.assign(window, {
  DataJenisAktivaScreen,
});
