/* screens-produk-parameter-denda.jsx — Produk Parameter → Parameter Denda
 *   /produk/parameter-denda → ParameterDendaScreen (list + popup view/update/delete + add)
 * Master-detail form: penaltytemplate (master) + penaltytemplatedetail (bucket rows).
 */

const fmtDenda = (n) => new Intl.NumberFormat('id-ID', { maximumFractionDigits: 4 }).format(Number(n) || 0);

// ── Detail (bucket) sub-editor: penaltytemplatedetail rows ──────────
function DendaDetailEditor({ detail, setDetail, isView, showToast }) {
  const blank = { id: null, dpdBawah: '', dpdAtas: '', frekuensiTelepon: '', biayaPenaltiHarian: '', frekuensiKunjungan: '', urutanBucket: '', jumlahMaksBucket: '' };
  const [entry, setEntry] = React.useState(blank);
  const [selIdx, setSelIdx] = React.useState(null);
  const setE = (k, v) => setEntry(e => ({ ...e, [k]: v }));
  const reset = () => { setEntry(blank); setSelIdx(null); };

  const selectRow = (idx) => { if (isView) return; setSelIdx(idx); setEntry({ ...detail[idx] }); };

  const nextDetailId = () => (detail.reduce((m, r) => Math.max(m, r.id || 0), 0) + 1);

  const clean = (e) => ({
    ...e,
    dpdBawah: Number(e.dpdBawah) || 0, dpdAtas: Number(e.dpdAtas) || 0,
    frekuensiTelepon: Number(e.frekuensiTelepon) || 0, biayaPenaltiHarian: Number(e.biayaPenaltiHarian) || 0,
    frekuensiKunjungan: Number(e.frekuensiKunjungan) || 0, urutanBucket: Number(e.urutanBucket) || 0,
    jumlahMaksBucket: Number(e.jumlahMaksBucket) || 0,
  });

  const handleTambah = () => {
    if (entry.dpdBawah === '' || entry.dpdAtas === '') { showToast({ type: 'warn', title: 'Lengkapi data', message: 'DPD Batas Bawah & Atas wajib diisi.' }); return; }
    setDetail([...detail, { ...clean(entry), id: nextDetailId() }]);
    reset();
  };
  const handleUbah = () => {
    if (selIdx == null) return;
    setDetail(detail.map((r, i) => i === selIdx ? clean(entry) : r));
    reset();
  };
  const handleHapus = () => {
    if (selIdx == null) return;
    setDetail(detail.filter((_, i) => i !== selIdx));
    reset();
  };

  return (
    <>
      <h4 className="section-title">Detail Bucket Penagihan</h4>

      {!isView && (
        <>
          <FormGrid cols={4}>
            <Field label="DPD Batas Bawah"><NumberInput value={entry.dpdBawah} onChange={v => setE('dpdBawah', v)} placeholder="0" suffix="hari" /></Field>
            <Field label="DPD Batas Atas"><NumberInput value={entry.dpdAtas} onChange={v => setE('dpdAtas', v)} placeholder="0" suffix="hari" /></Field>
            <Field label="Frekuensi Telepon"><NumberInput value={entry.frekuensiTelepon} onChange={v => setE('frekuensiTelepon', v)} placeholder="0" /></Field>
            <Field label="Frekuensi Kunjungan"><NumberInput value={entry.frekuensiKunjungan} onChange={v => setE('frekuensiKunjungan', v)} placeholder="0" /></Field>

            <Field label="Biaya Penalti Harian"><NumberInput value={entry.biayaPenaltiHarian} onChange={v => setE('biayaPenaltiHarian', v)} placeholder="0" suffix="%" /></Field>
            <Field label="Urutan Bucket"><NumberInput value={entry.urutanBucket} onChange={v => setE('urutanBucket', v)} placeholder="0" /></Field>
            <div style={{ gridColumn: 'span 2' }}>
              <Field label="Jumlah Maksimum Bucket"><CurrencyInput value={entry.jumlahMaksBucket} onChange={v => setE('jumlahMaksBucket', v)} placeholder="0" /></Field>
            </div>
          </FormGrid>

          <div className="row gap-12" style={{ margin: '16px 0' }}>
            <button className="btn btn--secondary btn--sm" onClick={handleTambah}>
              <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
              Tambah Bucket
            </button>
            <button className="btn btn--secondary btn--sm" onClick={handleUbah} disabled={selIdx == null}>
              <span dangerouslySetInnerHTML={{ __html: Icons.edit(14) }} />
              Ubah
            </button>
            <button className="btn btn--sm" style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }} onClick={handleHapus} disabled={selIdx == null}>
              <span dangerouslySetInnerHTML={{ __html: Icons.trash(14) }} />
              Hapus
            </button>
            {selIdx != null && <button className="btn btn--neutral btn--sm" onClick={reset}>Batal Pilih</button>}
          </div>
        </>
      )}

      <table className="tbl">
        <thead>
          <tr>
            <th className="text-right">Urutan</th>
            <th className="text-right">DPD Bawah</th>
            <th className="text-right">DPD Atas</th>
            <th className="text-right">Frek. Telepon</th>
            <th className="text-right">Frek. Kunjungan</th>
            <th className="text-right">Penalti Harian</th>
            <th className="text-right">Maks. Bucket</th>
          </tr>
        </thead>
        <tbody>
          {detail.length === 0 ? (
            <tr className="tbl-row--empty"><td colSpan={7} className="tbl-empty">Belum ada bucket penagihan.</td></tr>
          ) : detail.map((r, i) => (
            <tr key={r.id ?? i} className={(isView ? '' : 'tbl-row--clickable') + (selIdx === i ? ' tbl-row--selected' : '')} onClick={() => selectRow(i)}>
              <td className="mono text-right">{r.urutanBucket}</td>
              <td className="mono text-right">{r.dpdBawah}</td>
              <td className="mono text-right">{r.dpdAtas}</td>
              <td className="mono text-right">{r.frekuensiTelepon}</td>
              <td className="mono text-right">{r.frekuensiKunjungan}</td>
              <td className="mono text-right">{fmtDenda(r.biayaPenaltiHarian)} %</td>
              <td className="mono text-right">{r.jumlahMaksBucket ? window.fmtRp(r.jumlahMaksBucket) : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

// ── Add / Edit / View modal (master penaltytemplate + detail) ───────
function ParameterDendaFormModal({ mode, initial, onClose, onSave, showToast }) {
  const [d, setD] = React.useState(initial);
  const [detail, setDetail] = React.useState(initial.detail || []);
  const set = (k, v) => setD(p => ({ ...p, [k]: v }));
  const isView = mode === 'view';
  const valid = d.deskripsi.trim() && d.tipeDenda;

  const titlePrefix = mode === 'add' ? 'Tambah' : (mode === 'edit' ? 'Ubah' : 'Detail');

  return (
    <Modal
      title={`${titlePrefix} Parameter Denda`}
      subtitle="Template denda (penalty template) & detail bucket penagihan"
      onClose={onClose}
      size="xl"
      footer={
        <>
          <button className="btn btn--neutral" onClick={onClose}>Keluar</button>
          {!isView && (
            <button className="btn btn--primary" disabled={!valid} onClick={() => onSave({ ...d, detail })}>
              <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(16) }} />
              Simpan
            </button>
          )}
        </>
      }
    >
      <h4 className="section-title" style={{ marginTop: 0 }}>Data Template Denda</h4>
      <FormGrid cols={2}>
        {mode !== 'add' && (
          <>
            <Field label="ID Template Denda"><input className="input input--readonly" readOnly value={d.id} /></Field>
            <div></div>
          </>
        )}

        <Field label="Deskripsi" required span="full">
          {isView
            ? <input className="input input--readonly" readOnly value={d.deskripsi} />
            : <TextInput value={d.deskripsi} onChange={v => set('deskripsi', v)} placeholder="cth: Template Denda Reguler Konsumer" />}
        </Field>

        <Field label="Tipe Denda" required>
          {isView
            ? <input className="input input--readonly" readOnly value={d.tipeDenda} />
            : <Select value={d.tipeDenda} onChange={v => set('tipeDenda', v)} options={window.DENDA_TIPE_OPTIONS} placeholder="-- Pilih Tipe Denda --" />}
        </Field>
        <div></div>

        <Field label="Biaya Telepon">
          {isView ? <input className="input input--readonly" readOnly value={window.fmtRp(d.biayaTelepon)} /> : <CurrencyInput value={d.biayaTelepon} onChange={v => set('biayaTelepon', v)} placeholder="0" />}
        </Field>
        <Field label="Biaya Transportasi">
          {isView ? <input className="input input--readonly" readOnly value={window.fmtRp(d.biayaTransportasi)} /> : <CurrencyInput value={d.biayaTransportasi} onChange={v => set('biayaTransportasi', v)} placeholder="0" />}
        </Field>

        <Field label="Biaya Gaji">
          {isView ? <input className="input input--readonly" readOnly value={window.fmtRp(d.biayaGaji)} /> : <CurrencyInput value={d.biayaGaji} onChange={v => set('biayaGaji', v)} placeholder="0" />}
        </Field>
        <Field label="Biaya Gaji 2">
          {isView ? <input className="input input--readonly" readOnly value={window.fmtRp(d.biayaGaji2)} /> : <CurrencyInput value={d.biayaGaji2} onChange={v => set('biayaGaji2', v)} placeholder="0" />}
        </Field>

        {mode !== 'add' && (
          <>
            <Field label="Tanggal Dibuat"><input className="input input--readonly" readOnly value={d.tanggalDibuat || '—'} /></Field>
            <Field label="Tanggal Diubah"><input className="input input--readonly" readOnly value={d.tanggalDiubah || '—'} /></Field>
          </>
        )}
      </FormGrid>

      <hr className="section-divider" />

      <DendaDetailEditor detail={detail} setDetail={setDetail} isView={isView} showToast={showToast} />
    </Modal>
  );
}

function ParameterDendaScreen({ showToast }) {
  const [rows, setRows] = React.useState(() => window.MOCK_PARAM_DENDA.map(t => ({ ...t, detail: t.detail.slice() })));
  const [q, setQ] = React.useState('');
  const [tipe, setTipe] = React.useState('Semua');
  const [modal, setModal] = React.useState(null);           // { mode, index } | null
  const [confirmDel, setConfirmDel] = React.useState(null);   // row | null

  const persist = (next) => {
    setRows(next);
    window.MOCK_PARAM_DENDA.length = 0;
    next.forEach(x => window.MOCK_PARAM_DENDA.push(x));
  };

  const today = () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');

  const filtered = rows.filter(r => {
    if (tipe !== 'Semua' && r.tipeDenda !== tipe) return false;
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return [r.id, r.deskripsi, r.tipeDenda].some(v => String(v ?? '').toLowerCase().includes(s));
  });

  const nextId = () => (rows.reduce((m, r) => Math.max(m, r.id || 0), 0) + 1);

  const emptyDraft = {
    id: null, deskripsi: '', tipeDenda: '', biayaTelepon: '', biayaGaji: '', biayaGaji2: '', biayaTransportasi: '',
    tanggalDibuat: '', tanggalDiubah: '', detail: [],
  };

  return (
    <div className="card">
      <h2 className="page__title">
        Parameter Denda
        <span className="subtitle">Template denda &amp; bucket penagihan — penalty template + detail</span>
      </h2>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap', margin: '4px 0 16px' }}>
        <div style={{ flex: 1, minWidth: 220, maxWidth: 360 }}>
          <Field label="Cari">
            <TextInput value={q} onChange={setQ} placeholder="Cari ID / deskripsi template..." />
          </Field>
        </div>
        <div style={{ width: 200 }}>
          <Field label="Tipe Denda">
            <Select value={tipe} onChange={setTipe} options={['Semua', ...window.DENDA_TIPE_OPTIONS]} />
          </Field>
        </div>
        <button className="btn btn--primary" style={{ marginLeft: 'auto' }} onClick={() => setModal({ mode: 'add' })}>
          <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
          Tambah Template
        </button>
      </div>

      <DataTable
        showSearch={false}
        data={filtered}
        columns={[
          { key: 'id', label: 'ID Template', width: 110, sort: true, render: r => <span className="mono">{r.id}</span> },
          { key: 'deskripsi', label: 'Deskripsi', sort: true },
          { key: 'tipeDenda', label: 'Tipe Denda', width: 130, render: r => <span className="tag tag--info">{r.tipeDenda}</span> },
          { key: 'detail', label: 'Jml Bucket', width: 110, align: 'center', render: r => <span className="mono">{(r.detail || []).length}</span> },
          { key: 'tanggalDiubah', label: 'Tanggal Diubah', width: 150, render: r => r.tanggalDiubah || <span className="text-muted">—</span> },
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
        <ParameterDendaFormModal
          mode={modal.mode}
          initial={modal.mode === 'add' ? emptyDraft : { ...rows[modal.index], detail: rows[modal.index].detail.slice() }}
          onClose={() => setModal(null)}
          showToast={showToast}
          onSave={(draft) => {
            const clean = {
              ...draft,
              biayaTelepon: Number(draft.biayaTelepon) || 0, biayaGaji: Number(draft.biayaGaji) || 0,
              biayaGaji2: Number(draft.biayaGaji2) || 0, biayaTransportasi: Number(draft.biayaTransportasi) || 0,
            };
            if (modal.mode === 'edit') {
              persist(rows.map((r, i) => i === modal.index ? { ...clean, tanggalDiubah: today() } : r));
              showToast({ type: 'success', title: 'Perubahan tersimpan', message: clean.deskripsi });
            } else {
              const id = nextId();
              persist([{ ...clean, id, tanggalDibuat: today(), tanggalDiubah: today() }, ...rows]);
              showToast({ type: 'success', title: 'Template ditambahkan', message: clean.deskripsi });
            }
            setModal(null);
          }}
        />
      )}

      {confirmDel && (
        <ConfirmDialog
          title="Hapus Parameter Denda"
          message={`Hapus template "${confirmDel.deskripsi}" (ID ${confirmDel.id}) beserta ${(confirmDel.detail || []).length} bucket detail? Tindakan ini tidak dapat dibatalkan.`}
          onClose={() => setConfirmDel(null)}
          onConfirm={() => {
            persist(rows.filter(r => r.id !== confirmDel.id));
            showToast({ type: 'warn', title: 'Template dihapus', message: confirmDel.deskripsi });
            setConfirmDel(null);
          }}
        />
      )}
    </div>
  );
}

Object.assign(window, {
  ParameterDendaScreen,
});
