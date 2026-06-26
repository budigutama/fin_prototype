/* screens-master-group-nasabah.jsx — Data Master → Group Nasabah
 *   /master/group-nasabah → GroupNasabahScreen (list + popup view/update/delete + add)
 * Group Nasabah = kumpulan debitur terkait untuk perhitungan BMPK / group exposure.
 * Form modal terdiri dari 2 tab: "Data Group Nasabah" & "Anggota Group".
 */

const GROUP_JENIS_OPTIONS = ['Individu', 'Badan Usaha'];

// Sum a numeric field across the anggota array
function sumAnggota(anggota, key) {
  return (anggota || []).reduce((s, a) => s + (Number(a[key]) || 0), 0);
}

// Readonly currency field laid out like a Field (label + boxed value)
function MoneyField({ label, value }) {
  return (
    <Field label={label}>
      <CurrencyInput value={String(Math.round(Number(value) || 0))} readOnly />
    </Field>
  );
}

// ── Tab 1: Data Group Nasabah ──────────────────────────────────────
function TabDataGroup({ d, set, onOpenInduk }) {
  const totals = {
    outsPembiayaan: sumAnggota(d.anggota, 'outsPembiayaan'),
    bankGaransi:    sumAnggota(d.anggota, 'bankGaransi'),
    jaminanEmas:    sumAnggota(d.anggota, 'jaminanEmas'),
    jaminanCash:    sumAnggota(d.anggota, 'jaminanCash'),
    exposure:       sumAnggota(d.anggota, 'exposure'),
  };
  return (
    <FormGrid cols={2}>
      <Field label="Kode Group" required>
        <TextInput value={d.kodeGroup} onChange={v => set('kodeGroup', v)} placeholder="cth: GRP-0001" />
      </Field>
      <Field label="Nama Group" required>
        <TextInput value={d.namaGroup} onChange={v => set('namaGroup', v)} placeholder="Nama group nasabah" />
      </Field>

      <Field label="Jenis Nasabah" required>
        <Select value={d.jenisNasabah} onChange={v => set('jenisNasabah', v)} options={GROUP_JENIS_OPTIONS} />
      </Field>
      <div></div>

      <Field label="Nasabah Induk" required span="full">
        <div className="lookup-pair">
          <LookupInput
            value={d.indukKode}
            placeholder="-- Pilih Nasabah Induk --"
            onChange={v => set('indukKode', v)}
            onOpen={onOpenInduk}
          />
          <input className="input input--readonly" readOnly value={d.indukNama} placeholder="Nama Nasabah Induk" />
        </div>
      </Field>

      <Field label="Keterangan" span="full">
        <TextInput value={d.keterangan} onChange={v => set('keterangan', v)} placeholder="Keterangan group" />
      </Field>

      <div className="span-full"><hr className="section-divider" /></div>
      <div className="span-full"><h4 className="section-title" style={{ margin: 0 }}>Ringkasan Finansial Group</h4></div>

      <MoneyField label="Outs. Pembiayaan" value={totals.outsPembiayaan} />
      <MoneyField label="Bank Garansi" value={totals.bankGaransi} />
      <MoneyField label="Nom. Jaminan Emas" value={totals.jaminanEmas} />
      <MoneyField label="Nom. Jaminan Cash" value={totals.jaminanCash} />
      <MoneyField label="Group Exposure" value={totals.exposure} />
      <MoneyField label="BMPK" value={d.bmpk} />
    </FormGrid>
  );
}

// ── Tab 2: Anggota Group ───────────────────────────────────────────
function TabAnggotaGroup({ d, setD, isView, showToast }) {
  const [entry, setEntry] = React.useState({ noNasabah: '', nama: '', keterangan: '', outsPembiayaan: 0, bankGaransi: 0, jaminanEmas: 0, jaminanCash: 0, exposure: 0 });
  const [selIdx, setSelIdx] = React.useState(null);
  const [lookupOpen, setLookupOpen] = React.useState(false);

  const resetEntry = () => { setEntry({ noNasabah: '', nama: '', keterangan: '', outsPembiayaan: 0, bankGaransi: 0, jaminanEmas: 0, jaminanCash: 0, exposure: 0 }); setSelIdx(null); };

  const selectRow = (idx) => {
    if (isView) return;
    setSelIdx(idx);
    setEntry({ ...d.anggota[idx] });
  };

  const handleTambah = () => {
    if (!entry.noNasabah) { showToast({ type: 'warn', title: 'Pilih anggota', message: 'Cari nasabah pada Anggota Group dulu.' }); return; }
    if ((d.anggota || []).some(a => a.noNasabah === entry.noNasabah)) {
      showToast({ type: 'warn', title: 'Sudah terdaftar', message: `${entry.noNasabah} sudah jadi anggota group.` });
      return;
    }
    setD(p => ({ ...p, anggota: [...(p.anggota || []), { ...entry }] }));
    resetEntry();
  };

  const handleUbah = () => {
    if (selIdx == null) { showToast({ type: 'warn', title: 'Pilih baris', message: 'Klik baris anggota yang akan diubah.' }); return; }
    setD(p => ({ ...p, anggota: p.anggota.map((a, i) => i === selIdx ? { ...entry } : a) }));
    resetEntry();
  };

  const handleHapus = () => {
    if (selIdx == null) { showToast({ type: 'warn', title: 'Pilih baris', message: 'Klik baris anggota yang akan dihapus.' }); return; }
    setD(p => ({ ...p, anggota: p.anggota.filter((_, i) => i !== selIdx) }));
    resetEntry();
  };

  return (
    <>
      {!isView && (
        <>
          <FormGrid cols={2}>
            <Field label="Anggota Group" span="full">
              <div className="lookup-pair">
                <LookupInput
                  value={entry.noNasabah}
                  placeholder="-- Pilih Nasabah --"
                  onChange={v => setEntry(e => ({ ...e, noNasabah: v }))}
                  onOpen={() => setLookupOpen(true)}
                />
                <input className="input input--readonly" readOnly value={entry.nama} placeholder="Nama Nasabah" />
              </div>
            </Field>

            <Field label="Keterangan" span="full">
              <TextInput value={entry.keterangan} onChange={v => setEntry(e => ({ ...e, keterangan: v }))} placeholder="Keterangan anggota" />
            </Field>

            <MoneyField label="Outs. Pembiayaan" value={entry.outsPembiayaan} />
            <MoneyField label="Bank Garansi" value={entry.bankGaransi} />
            <MoneyField label="Nom. Jaminan Emas" value={entry.jaminanEmas} />
            <MoneyField label="Nom. Jaminan Cash" value={entry.jaminanCash} />
            <MoneyField label="Exposure" value={entry.exposure} />
          </FormGrid>

          <div className="row gap-12" style={{ margin: '16px 0' }}>
            <button className="btn btn--secondary btn--sm" onClick={handleTambah}>
              <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
              Tambah
            </button>
            <button className="btn btn--secondary btn--sm" onClick={handleUbah} disabled={selIdx == null}>
              <span dangerouslySetInnerHTML={{ __html: Icons.edit(14) }} />
              Ubah
            </button>
            <button className="btn btn--sm" style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }} onClick={handleHapus} disabled={selIdx == null}>
              <span dangerouslySetInnerHTML={{ __html: Icons.trash(14) }} />
              Hapus
            </button>
            {selIdx != null && (
              <button className="btn btn--neutral btn--sm" onClick={resetEntry}>Batal Pilih</button>
            )}
          </div>
        </>
      )}

      <table className="tbl">
        <thead>
          <tr>
            <th>Nomor Nasabah</th>
            <th>Nama Nasabah</th>
            <th>Keterangan</th>
            <th className="text-right">Outs. Pembiayaan</th>
            <th className="text-right">Bank Garansi</th>
            <th className="text-right">Nom. Jaminan Emas</th>
            <th className="text-right">Nom. Jaminan Cash</th>
            <th className="text-right">Exposure</th>
          </tr>
        </thead>
        <tbody>
          {(d.anggota || []).length === 0 ? (
            <tr className="tbl-row--empty"><td colSpan={8} className="tbl-empty">Belum ada anggota group.</td></tr>
          ) : d.anggota.map((a, i) => (
            <tr
              key={a.noNasabah}
              className={(isView ? '' : 'tbl-row--clickable') + (selIdx === i ? ' tbl-row--selected' : '')}
              onClick={() => selectRow(i)}
            >
              <td className="mono">{a.noNasabah}</td>
              <td>{a.nama}</td>
              <td>{a.keterangan || <span className="text-muted">—</span>}</td>
              <td className="mono text-right">{window.fmtRp(a.outsPembiayaan)}</td>
              <td className="mono text-right">{window.fmtRp(a.bankGaransi)}</td>
              <td className="mono text-right">{window.fmtRp(a.jaminanEmas)}</td>
              <td className="mono text-right">{window.fmtRp(a.jaminanCash)}</td>
              <td className="mono text-right">{window.fmtRp(a.exposure)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <NasabahLookup
        open={lookupOpen}
        onClose={() => setLookupOpen(false)}
        onSelect={(n) => setEntry(e => ({ ...e, noNasabah: n.kode, nama: n.nama }))}
      />
    </>
  );
}

// ── Add / Edit / View modal ────────────────────────────────────────
function GroupNasabahFormModal({ mode, initial, onClose, onSave, showToast }) {
  const [d, setD] = React.useState(initial);
  const [tab, setTab] = React.useState('data');
  const [indukLookup, setIndukLookup] = React.useState(false);
  const set = (k, v) => setD(p => ({ ...p, [k]: v }));
  const isView = mode === 'view';
  const valid = d.kodeGroup.trim() && d.namaGroup.trim() && String(d.indukKode).trim();

  const titlePrefix = mode === 'add' ? 'Tambah' : (mode === 'edit' ? 'Ubah' : 'Detail');

  return (
    <>
      <Modal
        title={`${titlePrefix} Group Nasabah`}
        subtitle="Group debitur terkait untuk perhitungan BMPK / group exposure"
        onClose={onClose}
        size="xl"
        footer={
          <>
            <button className="btn btn--neutral" onClick={onClose}>Keluar</button>
            {!isView && (
              <button className="btn btn--primary" disabled={!valid} onClick={() => onSave(d)}>
                <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(16) }} />
                Simpan
              </button>
            )}
          </>
        }
      >
        <SectionTabs value={tab} onChange={setTab} tabs={[
          { id: 'data',    label: 'Data Group Nasabah' },
          { id: 'anggota', label: 'Anggota Group' },
        ]} />

        {tab === 'data' && (
          <TabDataGroup d={d} set={set} onOpenInduk={isView ? undefined : () => setIndukLookup(true)} />
        )}
        {tab === 'anggota' && (
          <TabAnggotaGroup d={d} setD={setD} isView={isView} showToast={showToast} />
        )}
      </Modal>

      <NasabahLookup
        open={indukLookup}
        onClose={() => setIndukLookup(false)}
        onSelect={(n) => setD(p => ({ ...p, indukKode: n.kode, indukNama: n.nama, jenisNasabah: n.tipe === 'Badan Usaha' ? 'Badan Usaha' : 'Individu' }))}
      />
    </>
  );
}

function GroupNasabahScreen({ showToast }) {
  const [rows, setRows] = React.useState(() => window.MOCK_GROUP_NASABAH.map(g => ({ ...g, anggota: g.anggota.slice() })));
  const [q, setQ] = React.useState('');
  const [modal, setModal] = React.useState(null);     // { mode, index } | null
  const [confirmDel, setConfirmDel] = React.useState(null); // row | null

  const persist = (next) => {
    setRows(next);
    window.MOCK_GROUP_NASABAH.length = 0;
    next.forEach(x => window.MOCK_GROUP_NASABAH.push(x));
  };

  const filtered = rows.filter(r => {
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return [r.kodeGroup, r.namaGroup, r.jenisNasabah, r.indukKode, r.indukNama].some(v => String(v || '').toLowerCase().includes(s));
  });

  const nextId = () => (rows.reduce((m, r) => Math.max(m, r.id || 0), 0) + 1);

  const emptyDraft = {
    id: null, kodeGroup: '', namaGroup: '', jenisNasabah: 'Individu',
    indukKode: '', indukNama: '', keterangan: '', bmpk: 200000000, anggota: [],
  };

  return (
    <div className="card">
      <h2 className="page__title">
        Group Nasabah
        <span className="subtitle">Master group debitur terkait — BMPK &amp; group exposure</span>
      </h2>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap', margin: '4px 0 16px' }}>
        <div style={{ flex: 1, minWidth: 240, maxWidth: 420 }}>
          <Field label="Cari">
            <TextInput value={q} onChange={setQ} placeholder="Cari kode / nama group / nasabah induk..." />
          </Field>
        </div>
        <button className="btn btn--primary" style={{ marginLeft: 'auto' }} onClick={() => setModal({ mode: 'add' })}>
          <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
          Tambah Group
        </button>
      </div>

      <DataTable
        showSearch={false}
        data={filtered}
        columns={[
          { key: 'kodeGroup',    label: 'Kode Group', width: 120, sort: true, render: r => <span className="mono">{r.kodeGroup}</span> },
          { key: 'namaGroup',    label: 'Nama Group', sort: true },
          { key: 'jenisNasabah', label: 'Jenis Nasabah', width: 130, render: r => <span className="tag tag--neutral">{r.jenisNasabah}</span> },
          { key: 'indukKode',    label: 'Nasabah Induk', render: r => <span><span className="mono">{r.indukKode}</span> <span className="text-muted text-sm">{r.indukNama}</span></span> },
          { key: 'jumlahAnggota', label: 'Jml Anggota', width: 100, align: 'center', render: r => <span className="mono">{(r.anggota || []).length}</span> },
          { key: 'exposure',     label: 'Group Exposure', width: 160, align: 'right', render: r => <span className="mono">{window.fmtRp(sumAnggota(r.anggota, 'exposure'))}</span> },
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
        <GroupNasabahFormModal
          mode={modal.mode}
          initial={modal.mode === 'add' ? emptyDraft : { ...rows[modal.index], anggota: rows[modal.index].anggota.slice() }}
          onClose={() => setModal(null)}
          showToast={showToast}
          onSave={(draft) => {
            if (modal.mode === 'edit') {
              persist(rows.map((r, i) => i === modal.index ? draft : r));
              showToast({ type: 'success', title: 'Perubahan tersimpan', message: `${draft.kodeGroup} — ${draft.namaGroup}` });
            } else {
              if (rows.some(r => r.kodeGroup === draft.kodeGroup.trim())) {
                showToast({ type: 'warn', title: 'Kode sudah dipakai', message: `Group ${draft.kodeGroup} sudah ada.` });
                return;
              }
              persist([{ ...draft, id: nextId() }, ...rows]);
              showToast({ type: 'success', title: 'Group ditambahkan', message: `${draft.kodeGroup} — ${draft.namaGroup}` });
            }
            setModal(null);
          }}
        />
      )}

      {confirmDel && (
        <ConfirmDialog
          title="Hapus Group Nasabah"
          message={`Hapus group "${confirmDel.namaGroup}" (${confirmDel.kodeGroup})? Tindakan ini tidak dapat dibatalkan.`}
          onClose={() => setConfirmDel(null)}
          onConfirm={() => {
            persist(rows.filter(r => r.id !== confirmDel.id));
            showToast({ type: 'warn', title: 'Group dihapus', message: confirmDel.namaGroup });
            setConfirmDel(null);
          }}
        />
      )}
    </div>
  );
}

Object.assign(window, {
  GroupNasabahScreen,
});
