/* screens-produk-fasilitas.jsx
 * Produk Parameter → Produk Fasilitas.
 *   /produk/fasilitas         → ProdukFasilitasScreen (list)
 *   /produk/fasilitas/new     → NewProdukFasilitasScreen
 *   /produk/fasilitas/detail  → DetailProdukFasilitasScreen
 *   /produk/fasilitas/edit    → NewProdukFasilitasScreen (mode=edit)
 *
 * Mirrors Produk Pembiayaan, but the form has 3 tabs:
 *   Data Produk · Parameter Biaya · GL Interface
 * Parameter Biaya & GL Interface are identical to Produk Pembiayaan; only
 * the Data Produk tab differs (Keterangan, Sifat Fasilitas, Tipe Fasilitas…).
 */

const FASILITAS_AKAD_OPTIONS   = ['Umum', 'Musyarakah', 'Murabahah', 'Mudharabah', 'Kafalah', 'Ijarah', 'MMQ'];
const DROPPING_MODEL_OPTIONS   = ['Revolving', 'Non Revolving'];
const SIFAT_FASILITAS_OPTIONS  = ['Committed', 'Uncommitted'];
const TIPE_FASILITAS_OPTIONS   = ['Bank', 'Non Bank'];

/* ─────────── List Produk Fasilitas ─────────── */
function ProdukFasilitasScreen({ onNavigate, showToast }) {
  return (
    <div className="card">
      <h2 className="page__title">
        Produk Fasilitas
        <span className="subtitle">Plafond fasilitas induk &amp; parameter operasionalnya</span>
      </h2>

      <DataTable
        columns={[
          { key: 'kode',          label: 'Kode Produk',   width: 110, sort: true, render: r => <span className="mono">{r.kode}</span> },
          { key: 'nama',          label: 'Nama Produk',   sort: true },
          { key: 'akad',          label: 'Jenis Akad',    width: 140, render: r => <span className="tag tag--info">{r.akad}</span> },
          { key: 'droppingModel', label: 'Dropping Model', width: 150 },
          { key: 'status',        label: 'Status Produk', width: 120, render: r => <StatusTag status={r.status} /> },
        ]}
        data={window.MOCK_PRODUK_FASILITAS}
        popupItems={[
          { id: 'detail', label: 'Lihat Detail',          icon: 'view' },
          { id: 'edit',   label: 'Edit Produk',           icon: 'edit' },
          { sep: true },
          { id: 'aktif',  label: 'Toggle Aktif/Non-Aktif', icon: 'lock' },
        ]}
        onPopupClick={(row, id) => {
          const kode = encodeURIComponent(row.kode);
          if (id === 'detail') { onNavigate(`/produk/fasilitas/detail?kode=${kode}`); return; }
          if (id === 'edit')   { onNavigate(`/produk/fasilitas/edit?kode=${kode}`);   return; }
          showToast({ type: 'success', title: id, message: `${row.kode} — ${row.nama}` });
        }}
        toolbarActions={
          <button className="btn btn--primary btn--sm" onClick={() => onNavigate('/produk/fasilitas/new')}>
            <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
            Tambah Produk
          </button>
        }
      />
    </div>
  );
}

/* ─────────── New / Edit Produk Fasilitas ─────────── */
function NewProdukFasilitasScreen({ onNavigate, showToast, mode, kode }) {
  const isEdit = mode === 'edit';
  const [section, setSection] = React.useState('s1');
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const initialForm = React.useMemo(() => {
    if (!isEdit) return null;
    const row = window.MOCK_PRODUK_FASILITAS.find(p => p.kode === kode) || window.MOCK_PRODUK_FASILITAS[0];
    return {
      kodeProduk:    row.kode,
      namaProduk:    row.nama,
      akad:          row.akad,
      droppingModel: row.droppingModel,
      sifatFasilitas: row.sifat || 'Committed',
      tipeFasilitas:  row.tipe  || 'Bank',
      status:        row.status,
      glInterface:   window.buildGlInterfaceFasilitasRows(),
    };
  }, [isEdit, kode]);

  const [form, setForm] = React.useState({
    // Data Produk
    kodeProduk: '',
    namaProduk: '',
    keterangan: '',
    akad: 'Umum',
    droppingModel: 'Revolving',
    sifatFasilitas: 'Committed',
    tipeFasilitas: 'Bank',
    status: 'Aktif',

    // Parameter Biaya (identik dengan Produk Pembiayaan)
    biaya: [
      { element: 'Biaya Administrasi', glKode: '41010', glNama: 'Pendapatan Administrasi', jenisElement: 'Pendapatan', batasAmortisasi: '0',       glPajakKode: '', glPajakNama: '', tarifPajak: '0' },
      { element: 'Biaya Provisi',      glKode: '41020', glNama: 'Pendapatan Provisi',      jenisElement: 'Pendapatan', batasAmortisasi: '2500000', glPajakKode: '', glPajakNama: '', tarifPajak: '0' },
    ],

    // GL Interface
    glInterface: window.buildGlInterfaceFasilitasRows(),
  });

  React.useEffect(() => {
    if (initialForm) setForm(f => ({ ...f, ...initialForm }));
  }, [initialForm]);

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // Add/Edit Biaya modal state (Section 2)
  const [biayaModal, setBiayaModal] = React.useState(null); // { mode:'add'|'edit', index } | null

  // GL Interface for Fasilitas is a fixed tx_class set (komitmen & PPAP), not akad-driven.
  const [glLookup, setGlLookup] = React.useState(null);

  const sectionOrder = ['s1', 's2', 's3'];
  const goNext = () => {
    const i = sectionOrder.indexOf(section);
    if (i < sectionOrder.length - 1) setSection(sectionOrder[i + 1]);
    else setConfirmOpen(true);
  };
  const goPrev = () => {
    const i = sectionOrder.indexOf(section);
    if (i > 0) setSection(sectionOrder[i - 1]);
  };

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        {isEdit ? 'Edit Produk Fasilitas' : 'Input Produk Fasilitas'}
      </h2>

      <SectionTabs
        value={section}
        onChange={setSection}
        tabs={[
          { id: 's1', label: 'Produk Fasilitas' },
          { id: 's2', label: 'Parameter Biaya' },
          { id: 's3', label: 'GL Interface' },
        ]}
      />

      {/* ─────────── Tab 1: Data Produk (Produk Fasilitas) ─────────── */}
      {section === 's1' && (
        <>
          <Field label="Kode Produk" required>
            <div style={{ maxWidth: 'calc(50% - 12px)' }}>
              <TextInput value={form.kodeProduk} onChange={v => setField('kodeProduk', v)} readOnly={isEdit} placeholder="FFP01" />
            </div>
          </Field>

          <div style={{ marginTop: 16 }}>
            <Field label="Nama Produk" required>
              <TextInput value={form.namaProduk} onChange={v => setField('namaProduk', v)} placeholder="Musyarakah Revolving" />
            </Field>
          </div>

          <div style={{ marginTop: 16 }}>
            <Field label="Keterangan">
              <TextInput value={form.keterangan} onChange={v => setField('keterangan', v)} placeholder="Deskripsi singkat produk fasilitas" />
            </Field>
          </div>

          <div style={{ marginTop: 16 }}>
            <FormGrid>
              <Field label="Jenis Akad" required>
                <Select value={form.akad} onChange={v => setField('akad', v)} options={FASILITAS_AKAD_OPTIONS} />
              </Field>
              <Field label="Model Dropping" required>
                <Select value={form.droppingModel} onChange={v => setField('droppingModel', v)} options={DROPPING_MODEL_OPTIONS} />
              </Field>

              <Field label="Sifat Fasilitas" required>
                <Select value={form.sifatFasilitas} onChange={v => setField('sifatFasilitas', v)} options={SIFAT_FASILITAS_OPTIONS} />
              </Field>
              <Field label="Tipe Fasilitas" required>
                <Select value={form.tipeFasilitas} onChange={v => setField('tipeFasilitas', v)} options={TIPE_FASILITAS_OPTIONS} />
              </Field>

              <Field label="Status" required>
                <Select value={form.status} onChange={v => setField('status', v)} options={['Aktif', 'Tidak Aktif', 'Draft']} />
              </Field>
              <div></div>
            </FormGrid>
          </div>

          <div className="btn-bar btn-bar--between">
            <button className="btn btn--danger" style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }}
              onClick={() => onNavigate('/produk/fasilitas')}>Keluar</button>
            <div className="row gap-12">
              <button className="btn btn--secondary" disabled style={{ color: 'var(--c-text-placeholder)', borderColor: 'var(--c-border)' }}>Sebelumnya</button>
              <button className="btn btn--secondary" onClick={goNext}>Selanjutnya</button>
            </div>
          </div>
        </>
      )}

      {/* ─────────── Tab 2: Parameter Biaya ─────────── */}
      {section === 's2' && (
        <>
          <div className="row row--between mb-16">
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Daftar Biaya Default Produk</h3>
            <button className="btn btn--secondary btn--sm"
              onClick={() => setBiayaModal({ mode: 'add' })}>
              <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
              Tambah Biaya
            </button>
          </div>

          <table className="tbl">
            <thead>
              <tr>
                <th style={{ width: 44 }}>No</th>
                <th>Element Biaya</th>
                <th>GL Account</th>
                <th>Jenis Element Biaya</th>
                <th style={{ width: 120 }}>Batas Amortisasi</th>
                <th>GL Account Pajak</th>
                <th style={{ width: 100 }}>Tarif Pajak</th>
                <th style={{ width: 84 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {form.biaya.length === 0 ? (
                <tr><td colSpan={8} className="tbl-empty">Belum ada biaya. Klik "Tambah Biaya".</td></tr>
              ) : form.biaya.map((b, i) => (
                <tr key={i}>
                  <td className="mono">{i + 1}</td>
                  <td>{b.element}</td>
                  <td>
                    {b.glKode
                      ? <span><span className="mono">{b.glKode}</span> — {b.glNama}</span>
                      : <span className="text-muted">—</span>}
                  </td>
                  <td>{b.jenisElement || <span className="text-muted">—</span>}</td>
                  <td className="mono">{b.batasAmortisasi && b.batasAmortisasi !== '0' ? window.fmtRp(b.batasAmortisasi) : '—'}</td>
                  <td>
                    {b.glPajakKode
                      ? <span><span className="mono">{b.glPajakKode}</span> — {b.glPajakNama}</span>
                      : <span className="text-muted">—</span>}
                  </td>
                  <td className="mono">{b.tarifPajak && b.tarifPajak !== '0' ? `${b.tarifPajak} %` : '—'}</td>
                  <td>
                    <div className="row gap-4">
                      <button className="icon-btn" title="Ubah"
                        onClick={() => setBiayaModal({ mode: 'edit', index: i })}
                        dangerouslySetInnerHTML={{ __html: Icons.edit(16) }} />
                      <button className="icon-btn" title="Hapus"
                        onClick={() => setForm(f => ({ ...f, biaya: f.biaya.filter((_, idx) => idx !== i) }))}
                        dangerouslySetInnerHTML={{ __html: Icons.trash(16) }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {biayaModal && (
            <BiayaFormModal
              mode={biayaModal.mode}
              initial={biayaModal.mode === 'edit'
                ? form.biaya[biayaModal.index]
                : { element: '', glKode: '', glNama: '', jenisElement: '', batasAmortisasi: '0', glPajakKode: '', glPajakNama: '', tarifPajak: '0' }}
              onClose={() => setBiayaModal(null)}
              onSave={(draft) => {
                setForm(f => {
                  const a = [...f.biaya];
                  if (biayaModal.mode === 'edit') a[biayaModal.index] = draft;
                  else a.push(draft);
                  return { ...f, biaya: a };
                });
                setBiayaModal(null);
              }}
            />
          )}

          <div className="approval-banner" style={{ marginTop: 16, background: 'var(--c-info-bg)', borderLeftColor: 'var(--c-info)' }}>
            <span style={{ color: 'var(--c-info)', flexShrink: 0 }} dangerouslySetInnerHTML={{ __html: Icons.info(20) }} />
            <div className="approval-banner__body">
              Biaya pada level produk akan menjadi <b>default</b> saat fasilitas didaftarkan. Officer masih dapat menyesuaikan nilainya pada saat Registrasi Fasilitas.
            </div>
          </div>

          <div className="btn-bar btn-bar--between">
            <button className="btn btn--danger" style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }}
              onClick={() => onNavigate('/produk/fasilitas')}>Keluar</button>
            <div className="row gap-12">
              <button className="btn btn--secondary" onClick={goPrev}>Sebelumnya</button>
              <button className="btn btn--secondary" onClick={goNext}>Selanjutnya</button>
            </div>
          </div>
        </>
      )}

      {/* ─────────── Tab 3: GL Interface ─────────── */}
      {section === 's3' && (
        <>
          <div className="row row--between mb-16">
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>GL Interface — Produk Fasilitas</h3>
              <p className="text-muted text-sm" style={{ margin: '4px 0 0' }}>
                Tentukan rekening GL untuk setiap <span className="mono">kode_tx_class</span>. Mapping ini menjadi acuan posting jurnal pada seluruh transaksi fasilitas produk ini.
              </p>
            </div>
            <button className="btn btn--neutral btn--sm"
              onClick={() => setForm(f => ({ ...f, glInterface: window.buildGlInterfaceFasilitasRows() }))}
              title="Reset ke mapping default">
              <span dangerouslySetInnerHTML={{ __html: Icons.refresh(14) }} />
              Reset ke Default
            </button>
          </div>

          <table className="tbl">
            <thead>
              <tr>
                <th style={{ width: 140 }}>Kode Tx Class</th>
                <th>Deskripsi</th>
                <th style={{ width: 110 }}>Account Type</th>
                <th style={{ width: 230 }}>Kode GL</th>
                <th>Nama GL</th>
              </tr>
            </thead>
            <tbody>
              {form.glInterface.map((g, i) => (
                <tr key={g.kodeTxClass}>
                  <td className="mono">
                    {g.kodeTxClass}
                    {g.wajib && <span className="text-error" style={{ marginLeft: 4 }}>*</span>}
                  </td>
                  <td>{g.deskripsi}</td>
                  <td><span className="tag tag--neutral">{g.accountType}</span></td>
                  <td>
                    <LookupInput
                      value={g.kodeGl}
                      placeholder="-- Pilih GL --"
                      onChange={v => setForm(f => {
                        const a = [...f.glInterface];
                        const coa = window.getCoaByKode(v);
                        a[i] = { ...a[i], kodeGl: v, namaGl: coa?.nama || '' };
                        return { ...f, glInterface: a };
                      })}
                      onOpen={() => setGlLookup({ rowIndex: i, accountType: g.accountType })}
                    />
                  </td>
                  <td>
                    <span className={g.namaGl ? '' : 'text-muted'}>
                      {g.namaGl || '— akan terisi otomatis —'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="approval-banner" style={{ marginTop: 16, background: 'var(--c-info-bg)', borderLeftColor: 'var(--c-info)' }}>
            <span style={{ color: 'var(--c-info)', flexShrink: 0 }} dangerouslySetInnerHTML={{ __html: Icons.info(20) }} />
            <div className="approval-banner__body">
              Tanda <b>*</b> menandakan tx_class yang <b>wajib</b> di-mapping sebelum produk dapat diaktifkan. Lookup GL difilter berdasarkan <i>Account Type</i> agar tipe rekening selaras dengan jenis mutasi.
            </div>
          </div>

          <div className="btn-bar btn-bar--between">
            <button className="btn btn--danger" style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }}
              onClick={() => onNavigate('/produk/fasilitas')}>Keluar</button>
            <div className="row gap-12">
              <button className="btn btn--secondary" onClick={goPrev}>Sebelumnya</button>
              <button className="btn btn--primary" onClick={() => setConfirmOpen(true)}>
                <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(16) }} />
                {isEdit ? 'Simpan Perubahan' : 'Simpan'}
              </button>
            </div>
          </div>

          {glLookup && (
            <CoaLookup
              open={true}
              accountType={glLookup.accountType}
              onClose={() => setGlLookup(null)}
              onSelect={(coa) => setForm(f => {
                const a = [...f.glInterface];
                a[glLookup.rowIndex] = { ...a[glLookup.rowIndex], kodeGl: coa.kode, namaGl: coa.nama };
                return { ...f, glInterface: a };
              })}
            />
          )}
        </>
      )}

      {confirmOpen && (
        <ConfirmDialog
          title={isEdit ? 'Simpan Perubahan Produk Fasilitas' : 'Simpan Produk Fasilitas Baru'}
          message={
            isEdit
              ? `Perubahan pada produk "${form.kodeProduk} — ${form.namaProduk}" akan disimpan. Lanjutkan?`
              : `Produk "${form.kodeProduk} — ${form.namaProduk}" akan disimpan dan tersedia untuk Registrasi Fasilitas. Lanjutkan?`
          }
          confirmLabel="Ya, Simpan"
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            if (!form.kodeProduk.trim() || !form.namaProduk.trim()) {
              showToast({ type: 'warn', title: 'Data belum lengkap', message: 'Kode dan Nama Produk wajib diisi.' });
              setConfirmOpen(false);
              setSection('s1');
              return;
            }
            const next = {
              kode: form.kodeProduk, nama: form.namaProduk, akad: form.akad,
              droppingModel: form.droppingModel, sifat: form.sifatFasilitas, tipe: form.tipeFasilitas,
              status: form.status,
            };
            if (isEdit) {
              const i = window.MOCK_PRODUK_FASILITAS.findIndex(p => p.kode === kode);
              if (i >= 0) window.MOCK_PRODUK_FASILITAS[i] = next;
              showToast({ type: 'success', title: 'Perubahan tersimpan', message: `${form.kodeProduk} — ${form.namaProduk}` });
            } else {
              window.MOCK_PRODUK_FASILITAS.unshift(next);
              showToast({ type: 'success', title: 'Produk berhasil ditambahkan', message: `${form.kodeProduk} — ${form.namaProduk}` });
            }
            onNavigate('/produk/fasilitas');
          }}
        />
      )}
    </div>
  );
}

/* ─────────── Detail Produk Fasilitas ─────────── */
function DetailProdukFasilitasScreen({ onNavigate, kode }) {
  const row = window.MOCK_PRODUK_FASILITAS.find(p => p.kode === kode) || window.MOCK_PRODUK_FASILITAS[0];
  const [tab, setTab] = React.useState('info');
  const glRows = window.buildGlInterfaceFasilitasRows();

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Detail Produk Fasilitas — {row.kode}
      </h2>

      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'info', label: 'Informasi Detail' },
          { id: 'gl',   label: 'GL Interface' },
        ]}
      />

      {tab === 'info' && (
        <>
          <h4 className="section-title" style={{ marginTop: 0 }}>Data Produk</h4>
          <FormGrid cols={3}>
            <Disp label="Kode Produk" value={row.kode} mono />
            <Disp label="Nama Produk" value={row.nama} />
            <Disp label="Status" value={row.status} />
            <Disp label="Jenis Akad" value={row.akad} />
            <Disp label="Model Dropping" value={row.droppingModel} />
            <Disp label="Sifat Fasilitas" value={row.sifat || 'Committed'} />
            <Disp label="Tipe Fasilitas" value={row.tipe || 'Bank'} />
          </FormGrid>

          <div className="btn-bar btn-bar--between" style={{ marginTop: 24 }}>
            <button className="btn btn--neutral" onClick={() => onNavigate('/produk/fasilitas')}>
              <span dangerouslySetInnerHTML={{ __html: Icons.arrowL(14) }} />
              Kembali
            </button>
            <button className="btn btn--secondary" onClick={() => onNavigate(`/produk/fasilitas/edit?kode=${encodeURIComponent(row.kode)}`)}>
              <span dangerouslySetInnerHTML={{ __html: Icons.edit(14) }} />
              Edit Produk
            </button>
          </div>
        </>
      )}

      {tab === 'gl' && (
        <>
          <h4 className="section-title" style={{ marginTop: 0 }}>Mapping GL Interface — Produk Fasilitas</h4>
          <p className="text-muted text-sm" style={{ margin: '0 0 16px' }}>
            Pemetaan <span className="mono">kode_tx_class</span> ke rekening GL yang akan di-posting saat transaksi fasilitas berjalan.
          </p>
          <table className="tbl">
            <thead>
              <tr>
                <th style={{ width: 140 }}>Kode Tx Class</th>
                <th>Deskripsi</th>
                <th style={{ width: 110 }}>Account Type</th>
                <th style={{ width: 150 }}>Kode GL</th>
                <th>Nama GL</th>
              </tr>
            </thead>
            <tbody>
              {glRows.map((g, i) => (
                <tr key={i}>
                  <td className="mono">{g.kodeTxClass}</td>
                  <td>{g.deskripsi}</td>
                  <td><span className="tag tag--neutral">{g.accountType}</span></td>
                  <td className="mono">{g.kodeGl || <span className="text-muted">-</span>}</td>
                  <td>{g.namaGl || <span className="text-muted">-</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="btn-bar btn-bar--between" style={{ marginTop: 24 }}>
            <button className="btn btn--neutral" onClick={() => onNavigate('/produk/fasilitas')}>
              <span dangerouslySetInnerHTML={{ __html: Icons.arrowL(14) }} />
              Kembali
            </button>
          </div>
        </>
      )}
    </div>
  );
}

Object.assign(window, {
  ProdukFasilitasScreen,
  NewProdukFasilitasScreen,
  DetailProdukFasilitasScreen,
});
