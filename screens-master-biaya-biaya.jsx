/* screens-master-biaya-biaya.jsx — Data Master → Data Biaya-Biaya
 *   /master/biaya → DataBiayaBiayaScreen (list + popup view/update/delete + add)
 * Master cost element (elemen biaya): ID, nama, limit amortisasi, tipe elemen, flag pajak.
 */

// Add / Edit / View modal for a cost-element record.
function BiayaBiayaFormModal({ mode, initial, onClose, onSave }) {
  const [d, setD] = React.useState(initial);
  const set = (k, v) => setD(p => ({ ...p, [k]: v }));
  const isView = mode === 'view';
  const valid = d.nama.trim() && d.tipeElemen;

  if (isView) {
    return (
      <Modal
        title="Detail Biaya"
        subtitle={`${d.id} — ${d.nama}`}
        onClose={onClose}
        size="md"
        footer={<button className="btn btn--neutral" onClick={onClose}>Tutup</button>}
      >
        <FormGrid cols={2}>
          <Disp label="ID Elemen Biaya" value={String(d.id)} mono />
          <div></div>
          <div className="span-full"><Disp label="Nama Elemen Biaya" value={d.nama} /></div>
          <Disp label="Limit Amortisasi" value={window.fmtRp(d.limitAmortisasi)} mono />
          <Disp label="Tipe Elemen Biaya" value={d.tipeElemen} />
          <Disp label="Dikenakan Pajak" value={d.dikenakanPajak ? 'Ya' : 'Tidak'} />
        </FormGrid>
      </Modal>
    );
  }

  return (
    <Modal
      title={mode === 'edit' ? 'Ubah Biaya' : 'Tambah Biaya'}
      subtitle="Master elemen biaya pembiayaan"
      onClose={onClose}
      size="md"
      footer={
        <>
          <button className="btn btn--neutral" onClick={onClose}>Batal</button>
          <button className="btn btn--primary" disabled={!valid} onClick={() => onSave(d)}>
            <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(16) }} />
            {mode === 'edit' ? 'Simpan' : 'Tambah Biaya'}
          </button>
        </>
      }
    >
      <FormGrid cols={1}>
        {mode === 'edit' && (
          <Field label="ID Elemen Biaya">
            <input className="input input--readonly" readOnly value={d.id} />
          </Field>
        )}

        <Field label="Nama Elemen Biaya" required>
          <TextInput value={d.nama} onChange={v => set('nama', v)} placeholder="cth: Biaya Administrasi" />
        </Field>

        <Field label="Tipe Elemen Biaya" required>
          <Select value={d.tipeElemen} onChange={v => set('tipeElemen', v)} options={window.BIAYA_TIPE_ELEMEN_OPTIONS} placeholder="-- Pilih Tipe Elemen Biaya --" />
        </Field>

        <Field label="Limit Amortisasi" hint="0 = tidak diamortisasi">
          <CurrencyInput value={d.limitAmortisasi} onChange={v => set('limitAmortisasi', v)} placeholder="0" />
        </Field>

        <Field label="Dikenakan Pajak">
          <label className="cbx">
            <input type="checkbox" checked={!!d.dikenakanPajak} onChange={e => set('dikenakanPajak', e.target.checked)} />
            Dikenakan Pajak
          </label>
        </Field>
      </FormGrid>
    </Modal>
  );
}

function DataBiayaBiayaScreen({ showToast }) {
  const [rows, setRows] = React.useState(() => window.MOCK_BIAYA_BIAYA.slice());
  const [q, setQ] = React.useState('');
  const [tipe, setTipe] = React.useState('Semua');
  const [modal, setModal] = React.useState(null);           // { mode, index } | null
  const [confirmDel, setConfirmDel] = React.useState(null);   // row | null

  const persist = (next) => {
    setRows(next);
    window.MOCK_BIAYA_BIAYA.length = 0;
    next.forEach(x => window.MOCK_BIAYA_BIAYA.push(x));
  };

  const filtered = rows.filter(r => {
    if (tipe !== 'Semua' && r.tipeElemen !== tipe) return false;
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return [r.id, r.nama, r.tipeElemen].some(v => String(v ?? '').toLowerCase().includes(s));
  });

  const nextId = () => (rows.reduce((m, r) => Math.max(m, r.id || 0), 1000) + 1);

  const emptyDraft = {
    id: null, nama: '', limitAmortisasi: '', tipeElemen: '', dikenakanPajak: false,
  };

  return (
    <div className="card">
      <h2 className="page__title">
        Data Biaya-Biaya
        <span className="subtitle">Master elemen biaya pembiayaan — limit amortisasi, tipe elemen, pajak</span>
      </h2>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap', margin: '4px 0 16px' }}>
        <div style={{ flex: 1, minWidth: 220, maxWidth: 360 }}>
          <Field label="Cari">
            <TextInput value={q} onChange={setQ} placeholder="Cari ID / nama elemen biaya..." />
          </Field>
        </div>
        <div style={{ width: 220 }}>
          <Field label="Tipe Elemen Biaya">
            <Select value={tipe} onChange={setTipe} options={['Semua', ...window.BIAYA_TIPE_ELEMEN_OPTIONS]} />
          </Field>
        </div>
        <button className="btn btn--primary" style={{ marginLeft: 'auto' }} onClick={() => setModal({ mode: 'add' })}>
          <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
          Tambah Biaya
        </button>
      </div>

      <DataTable
        showSearch={false}
        data={filtered}
        columns={[
          { key: 'id',   label: 'ID Elemen Biaya', width: 130, sort: true, render: r => <span className="mono">{r.id}</span> },
          { key: 'nama', label: 'Nama Elemen Biaya', sort: true },
          { key: 'tipeElemen', label: 'Tipe Elemen Biaya', width: 190, render: r => <span className="tag tag--neutral">{r.tipeElemen}</span> },
          { key: 'limitAmortisasi', label: 'Limit Amortisasi', width: 160, align: 'right', render: r => <span className="mono">{window.fmtRp(r.limitAmortisasi)}</span> },
          { key: 'dikenakanPajak', label: 'Dikenakan Pajak', width: 130, align: 'center', render: r => <span className={'tag ' + (r.dikenakanPajak ? 'tag--success' : 'tag--neutral')}>{r.dikenakanPajak ? 'Ya' : 'Tidak'}</span> },
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
        <BiayaBiayaFormModal
          mode={modal.mode}
          initial={modal.mode === 'add' ? emptyDraft : rows[modal.index]}
          onClose={() => setModal(null)}
          onSave={(draft) => {
            const clean = { ...draft, limitAmortisasi: Number(draft.limitAmortisasi) || 0 };
            if (modal.mode === 'edit') {
              persist(rows.map((r, i) => i === modal.index ? clean : r));
              showToast({ type: 'success', title: 'Perubahan tersimpan', message: `${clean.id} — ${clean.nama}` });
            } else {
              const id = nextId();
              persist([{ ...clean, id }, ...rows]);
              showToast({ type: 'success', title: 'Biaya ditambahkan', message: `${id} — ${clean.nama}` });
            }
            setModal(null);
          }}
        />
      )}

      {confirmDel && (
        <ConfirmDialog
          title="Hapus Data Biaya"
          message={`Hapus elemen biaya "${confirmDel.nama}" (ID ${confirmDel.id})? Tindakan ini tidak dapat dibatalkan.`}
          onClose={() => setConfirmDel(null)}
          onConfirm={() => {
            persist(rows.filter(r => r.id !== confirmDel.id));
            showToast({ type: 'warn', title: 'Biaya dihapus', message: confirmDel.nama });
            setConfirmDel(null);
          }}
        />
      )}
    </div>
  );
}

Object.assign(window, {
  DataBiayaBiayaScreen,
});
