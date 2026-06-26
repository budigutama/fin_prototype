/* screens-produk-parameter-gadai.jsx — Produk Parameter → Parameter Gadai
 *   /produk/parameter-gadai → ParameterGadaiScreen (list + popup view/update/delete + add)
 * Parameter Gadai = parameter gadai / PKE per Group Parameter & Kode Parameter (nilai 1/2).
 */

const GADAI_VALUTA_OPTIONS = ['IDR', 'USD', 'SAR'];

// Add / Edit / View modal for a Parameter Gadai record.
function ParameterGadaiFormModal({ mode, initial, onClose, onSave }) {
  const [d, setD] = React.useState(initial);
  const set = (k, v) => setD(p => ({ ...p, [k]: v }));
  const isView = mode === 'view';
  const valid = d.groupParameter && String(d.kodeParameter).trim();

  if (isView) {
    return (
      <Modal
        title="Detail Parameter Gadai"
        subtitle={`${d.groupParameter} · ${d.kodeParameter}`}
        onClose={onClose}
        size="md"
        footer={<button className="btn btn--neutral" onClick={onClose}>Tutup</button>}
      >
        <FormGrid cols={2}>
          <div className="span-full"><Disp label="Group Parameter" value={d.groupParameter} /></div>
          <Disp label="Kode Parameter" value={d.kodeParameter} mono />
          <Disp label="Valuta" value={d.valuta || '—'} mono />
          <div className="span-full"><Disp label="Keterangan" value={d.keterangan || '—'} /></div>
          <Disp label="Nilai 1" value={window.fmtNum ? window.fmtNum(d.nilai1) : String(d.nilai1)} mono />
          <Disp label="Nilai 2" value={window.fmtNum ? window.fmtNum(d.nilai2) : String(d.nilai2)} mono />
        </FormGrid>
      </Modal>
    );
  }

  return (
    <Modal
      title={mode === 'edit' ? 'Update Data Parameter Gadai' : 'Tambah Data Parameter Gadai'}
      subtitle="Parameter gadai / PKE per group parameter"
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
        <Field label="Group Parameter" required>
          <Select value={d.groupParameter} onChange={v => set('groupParameter', v)} options={window.GADAI_GROUP_PARAMETER_OPTIONS} placeholder="-- Pilih Group Parameter --" />
        </Field>

        <Field label="Kode Parameter" required>
          <TextInput value={d.kodeParameter} onChange={v => set('kodeParameter', v)} placeholder="cth: HEK-24K" />
        </Field>

        <Field label="Keterangan">
          <TextInput value={d.keterangan} onChange={v => set('keterangan', v)} placeholder="Keterangan parameter" />
        </Field>

        <Field label="Valuta">
          <Select value={d.valuta} onChange={v => set('valuta', v)} options={GADAI_VALUTA_OPTIONS} placeholder="-- Pilih Valuta --" />
        </Field>
      </FormGrid>

      <div className="row gap-12" style={{ marginTop: 12 }}>
        <div style={{ flex: 1 }}>
          <Field label="Nilai 1">
            <NumberInput value={d.nilai1} onChange={v => set('nilai1', v)} placeholder="0" />
          </Field>
        </div>
        <div style={{ flex: 1 }}>
          <Field label="Nilai 2">
            <NumberInput value={d.nilai2} onChange={v => set('nilai2', v)} placeholder="0" />
          </Field>
        </div>
      </div>
    </Modal>
  );
}

function ParameterGadaiScreen({ showToast }) {
  const [rows, setRows] = React.useState(() => window.MOCK_PARAM_GADAI.slice());
  const [q, setQ] = React.useState('');
  const [group, setGroup] = React.useState('Semua');
  const [modal, setModal] = React.useState(null);           // { mode, index } | null
  const [confirmDel, setConfirmDel] = React.useState(null);   // row | null

  const persist = (next) => {
    setRows(next);
    window.MOCK_PARAM_GADAI.length = 0;
    next.forEach(x => window.MOCK_PARAM_GADAI.push(x));
  };

  const fmt = (n) => (window.fmtNum ? window.fmtNum(n) : new Intl.NumberFormat('id-ID', { maximumFractionDigits: 4 }).format(Number(n) || 0));

  const filtered = rows.filter(r => {
    if (group !== 'Semua' && r.groupParameter !== group) return false;
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return [r.groupParameter, r.kodeParameter, r.keterangan, r.valuta].some(v => String(v ?? '').toLowerCase().includes(s));
  });

  const nextId = () => (rows.reduce((m, r) => Math.max(m, r.id || 0), 0) + 1);

  const emptyDraft = {
    id: null, groupParameter: '', kodeParameter: '', keterangan: '', valuta: 'IDR', nilai1: '', nilai2: '',
  };

  return (
    <div className="card">
      <h2 className="page__title">
        Parameter Gadai
        <span className="subtitle">Parameter gadai / PKE — group parameter, nilai 1 &amp; 2 per valuta</span>
      </h2>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap', margin: '4px 0 16px' }}>
        <div style={{ flex: 1, minWidth: 220, maxWidth: 340 }}>
          <Field label="Cari">
            <TextInput value={q} onChange={setQ} placeholder="Cari kode / keterangan parameter..." />
          </Field>
        </div>
        <div style={{ width: 260 }}>
          <Field label="Group Parameter">
            <Select value={group} onChange={setGroup} options={['Semua', ...window.GADAI_GROUP_PARAMETER_OPTIONS]} />
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
          { key: 'groupParameter', label: 'Group Parameter', width: 230, sort: true, render: r => <span className="tag tag--info">{r.groupParameter}</span> },
          { key: 'kodeParameter', label: 'Kode Parameter', width: 140, sort: true, render: r => <span className="mono">{r.kodeParameter}</span> },
          { key: 'keterangan', label: 'Keterangan', render: r => r.keterangan || <span className="text-muted">—</span> },
          { key: 'valuta', label: 'Valuta', width: 80, align: 'center', render: r => <span className="mono">{r.valuta || '—'}</span> },
          { key: 'nilai1', label: 'Nilai 1', width: 130, align: 'right', render: r => <span className="mono">{fmt(r.nilai1)}</span> },
          { key: 'nilai2', label: 'Nilai 2', width: 110, align: 'right', render: r => <span className="mono">{fmt(r.nilai2)}</span> },
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
        <ParameterGadaiFormModal
          mode={modal.mode}
          initial={modal.mode === 'add' ? emptyDraft : rows[modal.index]}
          onClose={() => setModal(null)}
          onSave={(draft) => {
            const clean = { ...draft, nilai1: Number(draft.nilai1) || 0, nilai2: Number(draft.nilai2) || 0 };
            if (modal.mode === 'edit') {
              persist(rows.map((r, i) => i === modal.index ? clean : r));
              showToast({ type: 'success', title: 'Perubahan tersimpan', message: `${clean.groupParameter} · ${clean.kodeParameter}` });
            } else {
              persist([{ ...clean, id: nextId() }, ...rows]);
              showToast({ type: 'success', title: 'Parameter ditambahkan', message: `${clean.groupParameter} · ${clean.kodeParameter}` });
            }
            setModal(null);
          }}
        />
      )}

      {confirmDel && (
        <ConfirmDialog
          title="Hapus Parameter Gadai"
          message={`Hapus parameter "${confirmDel.kodeParameter}" (${confirmDel.groupParameter})? Tindakan ini tidak dapat dibatalkan.`}
          onClose={() => setConfirmDel(null)}
          onConfirm={() => {
            persist(rows.filter(r => r.id !== confirmDel.id));
            showToast({ type: 'warn', title: 'Parameter dihapus', message: confirmDel.kodeParameter });
            setConfirmDel(null);
          }}
        />
      )}
    </div>
  );
}

Object.assign(window, {
  ParameterGadaiScreen,
});
