/* screens-pihak3.jsx
 * Data Pihak Ke Tiga
 *   DataAsuransiScreen          — /pihak3/asuransi   (daftar perusahaan asuransi rekanan)
 *   ListPekerjaanNotarisScreen  — /pihak3/notaris    (order pekerjaan notaris: pengikatan akad/agunan)
 */

/* ─────────── Asuransi ───────────
   Asuransi atas JIWA (debitur) & atas JAMINAN (agunan). Popup = CRUD penuh. */
function AsuransiStatusTag({ status }) {
  const map = {
    'Aktif':       'tag--success',
    'Akseptasi':   'tag--success',
    'Pengajuan':   'tag--warning',
    'Jatuh Tempo': 'tag--warning',
    'Ditolak':     'tag--error',
  };
  return <span className={`tag ${map[status] || 'tag--neutral'}`}>{status}</span>;
}
function BayarTag({ status }) {
  return <span className={`tag ${status === 'Sudah Bayar' ? 'tag--success' : 'tag--error'}`}>{status}</span>;
}

// Create / Koreksi form — fields mirror legacy "Create Data Asuransi Jaminan"
function AsuransiFormModal({ mode, initial, onClose, onSave }) {
  const [d, setD] = React.useState(initial);
  const set = (k, v) => setD(p => ({ ...p, [k]: v }));
  const forJiwa = d.jaminanUntuk === 'Jiwa';
  const subjectLabel = forJiwa ? 'No. Pembiayaan' : 'Data Jaminan';
  const valid = d.perusahaan && d.jenisAsuransi && d.statusAsuransi && d.nasabah.trim();

  return (
    <Modal
      title={mode === 'edit' ? 'Koreksi Data Asuransi' : 'Create Data Asuransi'}
      subtitle={`Asuransi atas ${forJiwa ? 'Jiwa (debitur)' : 'Jaminan (agunan)'}`}
      size="lg"
      onClose={onClose}
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
      <div className="form-section__title">DATA POKOK</div>
      <FormGrid cols={2}>
        <Field label="Asuransi Untuk" required>
          <Select value={d.jaminanUntuk} onChange={v => set('jaminanUntuk', v)} options={window.ASURANSI_JAMINAN_UNTUK} />
        </Field>
        <Field label={subjectLabel} required hint={forJiwa ? 'No. rekening pembiayaan debitur' : 'Pilih objek jaminan'}>
          <TextInput value={d.noRekening} onChange={v => set('noRekening', v)} placeholder={forJiwa ? '0010502036579' : 'ID Jaminan'} />
        </Field>
        <Field label="Nama Nasabah" required>
          <TextInput value={d.nasabah} onChange={v => set('nasabah', v)} placeholder="Nama debitur" />
        </Field>
        <Field label="Perusahaan Asuransi" required>
          <Select value={d.perusahaan} onChange={v => set('perusahaan', v)} options={window.ASURANSI_PERUSAHAAN} placeholder="-- Pilih Perusahaan --" />
        </Field>
        <Field label="Kantor Cabang">
          <Select value={d.cabang} onChange={v => set('cabang', v)} options={window.ASURANSI_CABANG_OPTIONS} />
        </Field>
        <Field label="Nomor Polis">
          <TextInput value={d.noPolis} onChange={v => set('noPolis', v)} placeholder="Nomor polis" />
        </Field>
        {!forJiwa && (
          <Field label="Jenis Jaminan">
            <Select value={d.jenisJaminan} onChange={v => set('jenisJaminan', v)} options={window.ASURANSI_JAMINAN_JENIS} />
          </Field>
        )}
        <Field label="Jenis Produk">
          <Select value={d.jenisProduk} onChange={v => set('jenisProduk', v)} options={window.ASURANSI_PRODUK_OPTIONS} />
        </Field>
        <Field label="Remark" span="full">
          <TextInput value={d.remark} onChange={v => set('remark', v)} placeholder="Keterangan (mis. Jiwa, PHK & Macet)" />
        </Field>
      </FormGrid>

      <div className="form-section__title" style={{ marginTop: 24 }}>POLIS & PERTANGGUNGAN</div>
      <FormGrid cols={2}>
        <Field label="Jenis Asuransi" required>
          <Select value={d.jenisAsuransi} onChange={v => set('jenisAsuransi', v)} options={window.ASURANSI_JENIS_OPTIONS} />
        </Field>
        <Field label="Status Asuransi" required>
          <Select value={d.statusAsuransi} onChange={v => set('statusAsuransi', v)} options={window.ASURANSI_STATUS_OPTIONS} />
        </Field>
        <Field label="Nilai Pertanggungan">
          <CurrencyInput value={String(d.nilaiTanggungan ?? '')} onChange={v => set('nilaiTanggungan', v)} />
        </Field>
        <Field label="Biaya Asuransi">
          <CurrencyInput value={String(d.biaya ?? '')} onChange={v => set('biaya', v)} />
        </Field>
        <Field label="Asuransi yang di-Cover">
          <Select value={d.cover} onChange={v => set('cover', v)} options={window.ASURANSI_COVER_OPTIONS} placeholder="-- Pilih Cover --" />
        </Field>
        <Field label="Jenis Maskapai (Reasuransi)">
          <Select value={d.maskapai} onChange={v => set('maskapai', v)} options={window.ASURANSI_MASKAPAI} placeholder="-- Pilih --" />
        </Field>
        <Field label="Banker Clause">
          <Select value={d.bankerClause} onChange={v => set('bankerClause', v)} options={window.ASURANSI_YN} />
        </Field>
        <Field label="Pengalihan Ke Asuransi Syariah">
          <Select value={d.alihSyariah} onChange={v => set('alihSyariah', v)} options={window.ASURANSI_YN} />
        </Field>
        <Field label="Status Pembayaran">
          <Select value={d.statusBayar} onChange={v => set('statusBayar', v)} options={window.ASURANSI_BAYAR_OPTIONS} />
        </Field>
        <div></div>
      </FormGrid>

      <div className="form-section__title" style={{ marginTop: 24 }}>TANGGAL POLIS</div>
      <FormGrid cols={2}>
        <Field label="Tanggal Order Asuransi"><DateInput value={d.tglOrder} onChange={v => set('tglOrder', v)} /></Field>
        <Field label="Tanggal Kirim SPPA"><DateInput value={d.tglSppa} onChange={v => set('tglSppa', v)} /></Field>
        <Field label="Tgl Target Penerimaan Polis"><DateInput value={d.tglTarget} onChange={v => set('tglTarget', v)} /></Field>
        <Field label="Tgl Terima Polis"><DateInput value={d.tglTerima} onChange={v => set('tglTerima', v)} /></Field>
        <Field label="Tanggal Diterbitkan"><DateInput value={d.tglTerbit} onChange={v => set('tglTerbit', v)} /></Field>
        <Field label="Tanggal Jatuh Tempo"><DateInput value={d.tglJatuhTempo} onChange={v => set('tglJatuhTempo', v)} /></Field>
      </FormGrid>
    </Modal>
  );
}

function DataAsuransiScreen({ showToast }) {
  const [rows, setRows] = React.useState(() => window.MOCK_ASURANSI.slice());
  const [jaminanUntuk, setJaminanUntuk] = React.useState('Semua');
  const [cabang, setCabang] = React.useState('Semua');
  const [jenis, setJenis] = React.useState('Semua');
  const [statusAs, setStatusAs] = React.useState('Semua');
  const [statusBayar, setStatusBayar] = React.useState('Semua');
  const [produk, setProduk] = React.useState('Semua');
  const [q, setQ] = React.useState('');
  const [jatuhTempo, setJatuhTempo] = React.useState('Semua');

  const [modal, setModal] = React.useState(null);      // { mode, index } | null
  const [detail, setDetail] = React.useState(null);
  const [confirmDel, setConfirmDel] = React.useState(null);

  const persist = (next) => {
    setRows(next);
    window.MOCK_ASURANSI.length = 0;
    next.forEach(x => window.MOCK_ASURANSI.push(x));
  };

  const filtered = rows.filter(r => {
    if (jaminanUntuk !== 'Semua' && r.jaminanUntuk !== jaminanUntuk) return false;
    if (cabang !== 'Semua' && r.cabang !== cabang) return false;
    if (jenis !== 'Semua' && r.jenisAsuransi !== jenis) return false;
    if (statusAs !== 'Semua' && r.statusAsuransi !== statusAs) return false;
    if (statusBayar !== 'Semua' && r.statusBayar !== statusBayar) return false;
    if (produk !== 'Semua' && r.jenisProduk !== produk) return false;
    if (jatuhTempo === 'Sudah Terbit' && !r.tglJatuhTempo) return false;
    if (jatuhTempo === 'Belum Terbit' && r.tglJatuhTempo) return false;
    if (q.trim()) {
      const s = q.toLowerCase();
      return [r.noPolis, r.perusahaan, r.noRekening, r.nasabah].some(v => String(v || '').toLowerCase().includes(s));
    }
    return true;
  });

  const emptyDraft = {
    jaminanUntuk: 'Jaminan', noPolis: '', perusahaan: '', noRekening: '', nasabah: '',
    jenisJaminan: 'Property', jenisProduk: 'Reguler', jenisAsuransi: 'Kebakaran',
    statusAsuransi: 'Pengajuan', cabang: '545', cabangNama: '', nilaiTanggungan: '', biaya: '',
    bankerClause: 'Tidak', alihSyariah: 'Tidak', tglTerbit: '', tglJatuhTempo: '',
    statusBayar: 'Belum Bayar', remark: '', cover: '', maskapai: '',
    tglOrder: '', tglSppa: '', tglTarget: '', tglTerima: '',
  };

  return (
    <div className="card">
      <h2 className="page__title">
        Asuransi
        <span className="subtitle">Asuransi atas jiwa debitur &amp; atas jaminan (agunan) pembiayaan</span>
      </h2>

      {/* Filter bar */}
      <div className="filter-panel">
        <div className="filter-grid">
          <Field label="Jaminan Untuk">
            <Select value={jaminanUntuk} onChange={setJaminanUntuk} options={['Semua', ...window.ASURANSI_JAMINAN_UNTUK]} />
          </Field>
          <Field label="Cabang">
            <Select value={cabang} onChange={setCabang} options={['Semua', ...window.ASURANSI_CABANG_OPTIONS]} />
          </Field>
          <Field label="Jenis Asuransi">
            <Select value={jenis} onChange={setJenis} options={['Semua', ...window.ASURANSI_JENIS_OPTIONS]} />
          </Field>
          <Field label="Status Asuransi">
            <Select value={statusAs} onChange={setStatusAs} options={['Semua', ...window.ASURANSI_STATUS_OPTIONS]} />
          </Field>
          <Field label="Status Pembayaran">
            <Select value={statusBayar} onChange={setStatusBayar} options={['Semua', ...window.ASURANSI_BAYAR_OPTIONS]} />
          </Field>
          <Field label="Jenis Produk">
            <Select value={produk} onChange={setProduk} options={['Semua', ...window.ASURANSI_PRODUK_OPTIONS]} />
          </Field>
          <Field label="Asuransi Jatuh Tempo">
            <Select value={jatuhTempo} onChange={setJatuhTempo} options={['Semua', 'Sudah Terbit', 'Belum Terbit']} />
          </Field>
          <Field label="Cari">
            <TextInput value={q} onChange={setQ} placeholder="Polis / perusahaan / rekening / nasabah..." />
          </Field>
        </div>
        <div className="filter-actions">
          <button className="btn btn--neutral btn--sm" onClick={() => showToast({ type: 'success', title: 'Export Excel disiapkan' })}>
            <span dangerouslySetInnerHTML={{ __html: Icons.download(14) }} />
            Export Excel
          </button>
          <button className="btn btn--primary btn--sm" onClick={() => setModal({ mode: 'add' })}>
            <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
            Tambah Asuransi
          </button>
        </div>
      </div>

      <div className="table-meta">{filtered.length} polis ditemukan</div>

      <div style={{ overflowX: 'auto' }}>
        <DataTable
          showSearch={false}
          data={filtered}
          columns={[
            { key: 'noPolis',         label: 'Nomor Polis',     width: 140, render: r => r.noPolis ? <span className="mono">{r.noPolis}</span> : <span className="text-muted">—</span> },
            { key: 'perusahaan',      label: 'Perusahaan Asuransi', width: 210 },
            { key: 'noRekening',      label: 'Nomor Rekening',  width: 150, render: r => <span className="mono">{r.noRekening}</span> },
            { key: 'nasabah',         label: 'Nama Nasabah',    width: 200 },
            { key: 'jaminanUntuk',    label: 'Untuk',           width: 90,  render: r => <span className={`tag ${r.jaminanUntuk === 'Jiwa' ? 'tag--info' : 'tag--neutral'}`}>{r.jaminanUntuk}</span> },
            { key: 'jenisJaminan',    label: 'Jenis Jaminan',   width: 120 },
            { key: 'jenisProduk',     label: 'Jenis Produk',    width: 110 },
            { key: 'jenisAsuransi',   label: 'Jenis Asuransi',  width: 130 },
            { key: 'statusAsuransi',  label: 'Status Asuransi', width: 130, render: r => <AsuransiStatusTag status={r.statusAsuransi} /> },
            { key: 'cabang',          label: 'Kantor Cabang',   width: 110, render: r => <span className="mono">{r.cabang}</span> },
            { key: 'nilaiTanggungan', label: 'Nilai Pertanggungan', width: 160, align: 'right', render: r => <span className="mono">{window.fmtRp(r.nilaiTanggungan)}</span> },
            { key: 'biaya',           label: 'Biaya Asuransi',  width: 140, align: 'right', render: r => <span className="mono">{window.fmtRp(r.biaya)}</span> },
            { key: 'bankerClause',    label: 'Banker Clause',   width: 110 },
            { key: 'alihSyariah',     label: 'Alih Ke Syariah', width: 120 },
            { key: 'tglTerbit',       label: 'Tanggal Terbit',  width: 120, render: r => r.tglTerbit ? <span className="mono">{r.tglTerbit}</span> : <span className="text-muted">—</span> },
            { key: 'tglJatuhTempo',   label: 'Tanggal Jatuh Tempo', width: 150, render: r => r.tglJatuhTempo ? <span className="mono">{r.tglJatuhTempo}</span> : <span className="text-muted">—</span> },
            { key: 'statusBayar',     label: 'Status Pembayaran', width: 150, render: r => <BayarTag status={r.statusBayar} /> },
          ]}
          popupItems={[
            { id: 'view',  label: 'Lihat Detail', icon: 'view' },
            { id: 'edit',  label: 'Koreksi Data', icon: 'edit' },
            { sep: true },
            { id: 'hapus', label: 'Hapus', icon: 'trash', danger: true },
          ]}
          onPopupClick={(row, id) => {
            const index = rows.findIndex(r => r.id === row.id);
            if (id === 'view')  { setDetail(row); return; }
            if (id === 'edit')  { setModal({ mode: 'edit', index }); return; }
            if (id === 'hapus') { setConfirmDel(index); return; }
          }}
        />
      </div>

      {modal && (
        <AsuransiFormModal
          mode={modal.mode}
          initial={modal.mode === 'edit' ? rows[modal.index] : emptyDraft}
          onClose={() => setModal(null)}
          onSave={(draft) => {
            const norm = { ...draft, nilaiTanggungan: Number(draft.nilaiTanggungan) || 0, biaya: Number(draft.biaya) || 0 };
            if (modal.mode === 'edit') {
              persist(rows.map((r, i) => i === modal.index ? { ...r, ...norm } : r));
              showToast({ type: 'success', title: 'Data asuransi diperbarui', message: norm.nasabah });
            } else {
              persist([{ ...norm, id: Math.max(0, ...rows.map(r => r.id)) + 1 }, ...rows]);
              showToast({ type: 'success', title: 'Data asuransi ditambahkan', message: norm.nasabah });
            }
            setModal(null);
          }}
        />
      )}

      {detail && (
        <Modal
          title={`Polis — ${detail.nasabah}`}
          subtitle={`${detail.perusahaan} · Asuransi atas ${detail.jaminanUntuk}`}
          size="lg"
          onClose={() => setDetail(null)}
          footer={
            <>
              <button className="btn btn--neutral" onClick={() => setDetail(null)}>Tutup</button>
              <button className="btn btn--primary" onClick={() => { const index = rows.findIndex(r => r.id === detail.id); setDetail(null); setModal({ mode: 'edit', index }); }}>
                <span dangerouslySetInnerHTML={{ __html: Icons.edit(16) }} />
                Koreksi
              </button>
            </>
          }
        >
          <FormGrid cols={2}>
            <Disp label="Nomor Polis" value={detail.noPolis || '—'} mono />
            <Disp label="Nomor Rekening" value={detail.noRekening} mono />
            <Disp label="Perusahaan Asuransi" value={detail.perusahaan} />
            <Disp label="Kantor Cabang" value={`${detail.cabang} · ${detail.cabangNama}`} />
            <Disp label="Asuransi Untuk" value={detail.jaminanUntuk} />
            <Disp label="Jenis Jaminan" value={detail.jenisJaminan} />
            <Disp label="Jenis Asuransi" value={detail.jenisAsuransi} />
            <Disp label="Jenis Produk" value={detail.jenisProduk} />
            <Disp label="Nilai Pertanggungan" value={window.fmtRp(detail.nilaiTanggungan)} mono />
            <Disp label="Biaya Asuransi" value={window.fmtRp(detail.biaya)} mono />
            <Disp label="Asuransi yang di-Cover" value={detail.cover || '—'} />
            <Disp label="Remark" value={detail.remark || '—'} />
            <Disp label="Banker Clause" value={detail.bankerClause} />
            <Disp label="Pengalihan Ke Syariah" value={detail.alihSyariah} />
            <Disp label="Tanggal Terbit" value={detail.tglTerbit || '—'} mono />
            <Disp label="Tanggal Jatuh Tempo" value={detail.tglJatuhTempo || '—'} mono />
          </FormGrid>
          <div style={{ marginTop: 16, display: 'flex', gap: 24 }}>
            <div><div className="disp__label" style={{ marginBottom: 6 }}>Status Asuransi</div><AsuransiStatusTag status={detail.statusAsuransi} /></div>
            <div><div className="disp__label" style={{ marginBottom: 6 }}>Status Pembayaran</div><BayarTag status={detail.statusBayar} /></div>
          </div>
        </Modal>
      )}

      {confirmDel !== null && (
        <ConfirmDialog
          title="Hapus Data Asuransi"
          message={`Hapus polis asuransi "${rows[confirmDel]?.nasabah}" (${rows[confirmDel]?.perusahaan})? Tindakan ini tidak dapat dibatalkan.`}
          confirmLabel="Ya, Hapus"
          danger
          onClose={() => setConfirmDel(null)}
          onConfirm={() => {
            const removed = rows[confirmDel];
            persist(rows.filter((_, i) => i !== confirmDel));
            showToast({ type: 'success', title: 'Data asuransi dihapus', message: removed?.nasabah });
            setConfirmDel(null);
          }}
        />
      )}
    </div>
  );
}

/* ─────────── Penjamin (guarantor) ───────────
   Jenis: Personal / Corporate Guarantee, Perusahaan Penjamin Kredit. Popup = CRUD. */
function PenjaminFormModal({ mode, initial, onClose, onSave }) {
  const [d, setD] = React.useState(initial);
  const set = (k, v) => setD(p => ({ ...p, [k]: v }));
  const setGolongan = (kode) => {
    const g = window.PENJAMIN_GOLONGAN_OPTIONS.find(x => x.kode === kode);
    setD(p => ({ ...p, golongan: kode, golonganNama: g ? g.nama : '' }));
  };
  const valid = d.jenis && d.jenisIdentitas && d.nasabah.trim() && d.namaLengkap.trim();

  return (
    <Modal
      title={mode === 'edit' ? 'Update Data Parameter Penjamin' : 'Tambah Data Parameter Penjamin'}
      subtitle="Data penjamin (guarantor) atas pembiayaan"
      size="lg"
      onClose={onClose}
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
      <div className="form-section__title">NASABAH &amp; JENIS PENJAMIN</div>
      <FormGrid cols={2}>
        <Field label="Nasabah" required hint="No. rekening pembiayaan">
          <TextInput value={d.noRekening} onChange={v => set('noRekening', v)} placeholder="0001250803" />
        </Field>
        <Field label="Nama Nasabah">
          <TextInput value={d.nasabah} onChange={v => set('nasabah', v)} placeholder="Nama debitur" />
        </Field>
        <Field label="Cabang">
          <TextInput value={d.cabang} onChange={v => set('cabang', v)} placeholder="000" />
        </Field>
        <Field label="Nama Cabang">
          <TextInput value={d.cabangNama} onChange={v => set('cabangNama', v)} placeholder="KANTOR PUSAT BJB SYARIAH" />
        </Field>
        <Field label="Jenis Penjamin" required>
          <Select value={d.jenis} onChange={v => set('jenis', v)} options={window.PENJAMIN_JENIS_OPTIONS} placeholder="-- Pilih Jenis Penjamin --" />
        </Field>
        <Field label="Jenis Identitas Penjamin" required>
          <Select value={d.jenisIdentitas} onChange={v => set('jenisIdentitas', v)} options={window.PENJAMIN_IDENTITAS_OPTIONS} placeholder="-- Pilih Identitas --" />
        </Field>
      </FormGrid>

      <div className="form-section__title" style={{ marginTop: 24 }}>IDENTITAS PENJAMIN</div>
      <FormGrid cols={2}>
        <Field label="Nomor Identitas Penjamin">
          <TextInput value={d.noIdentitas} onChange={v => set('noIdentitas', v)} placeholder="71227393702700" />
        </Field>
        <Field label="Nama Penjamin (Sesuai Identitas)">
          <TextInput value={d.namaIdentitas} onChange={v => set('namaIdentitas', v)} placeholder="Sesuai dokumen identitas" />
        </Field>
        <Field label="Nama Lengkap Penjamin" required span="full">
          <TextInput value={d.namaLengkap} onChange={v => set('namaLengkap', v)} placeholder="PT PENJAMINAN JAMKRINDO SYARIAH" />
        </Field>
        <Field label="Kode Golongan Penjamin">
          <Select value={d.golongan} onChange={setGolongan} options={window.PENJAMIN_GOLONGAN_OPTIONS.map(g => g.kode)} />
        </Field>
        <Field label="Nama Golongan">
          <TextInput value={d.golonganNama} onChange={() => {}} readOnly />
        </Field>
        <Field label="Akta Penjamin / Polis Penjamin" span="full">
          <TextInput value={d.akta} onChange={v => set('akta', v)} placeholder="KIB-1747334317-CZ550" />
        </Field>
      </FormGrid>

      <div className="form-section__title" style={{ marginTop: 24 }}>NILAI PENJAMINAN</div>
      <FormGrid cols={2}>
        <Field label="Persentase Penjamin">
          <NumberInput value={String(d.persentase ?? '')} onChange={v => set('persentase', v)} suffix="%" />
        </Field>
        <Field label="Nilai Penjamin">
          <CurrencyInput value={String(d.nilai ?? '')} onChange={v => set('nilai', v)} />
        </Field>
      </FormGrid>

      <div className="form-section__title" style={{ marginTop: 24 }}>ALAMAT PENJAMIN</div>
      <FormGrid cols={2}>
        <Field label="Alamat Penjamin" span="full">
          <TextInput value={d.alamat} onChange={v => set('alamat', v)} placeholder="JL. LETNAN JENDERAL SUPRAPTO NO 20" />
        </Field>
        <Field label="Kecamatan">
          <TextInput value={d.kecamatan} onChange={v => set('kecamatan', v)} placeholder="CEMPAKA PUTIH" />
        </Field>
        <Field label="Kelurahan">
          <TextInput value={d.kelurahan} onChange={v => set('kelurahan', v)} placeholder="CEMPAKA PUTIH" />
        </Field>
        <Field label="Kode Pos">
          <TextInput value={d.kodePos} onChange={v => set('kodePos', v)} placeholder="10510" />
        </Field>
        <Field label="Dati II">
          <TextInput value={d.datiIINama} onChange={v => set('datiIINama', v)} placeholder="JAKARTA PUSAT, WIL. KOTA" />
        </Field>
      </FormGrid>
    </Modal>
  );
}

function DataPenjaminScreen({ showToast }) {
  const [rows, setRows] = React.useState(() => window.MOCK_PENJAMIN.slice());
  const [jenis, setJenis] = React.useState('Semua');
  const [q, setQ] = React.useState('');
  const [modal, setModal] = React.useState(null);
  const [detail, setDetail] = React.useState(null);
  const [confirmDel, setConfirmDel] = React.useState(null);

  const persist = (next) => {
    setRows(next);
    window.MOCK_PENJAMIN.length = 0;
    next.forEach(x => window.MOCK_PENJAMIN.push(x));
  };

  const filtered = rows.filter(r => {
    if (jenis !== 'Semua' && r.jenis !== jenis) return false;
    if (q.trim()) {
      const s = q.toLowerCase();
      return [r.noRekening, r.nasabah, r.namaLengkap, r.noIdentitas].some(v => String(v || '').toLowerCase().includes(s));
    }
    return true;
  });

  const emptyDraft = {
    noRekening: '', nasabah: '', cabang: '000', cabangNama: '', jenis: '', jenisIdentitas: '',
    noIdentitas: '', namaIdentitas: '', namaLengkap: '', golongan: 'S14', golonganNama: 'Perorangan',
    persentase: '', nilai: '', akta: '', alamat: '', kecamatan: '', kelurahan: '', kodePos: '', datiII: '', datiIINama: '',
  };

  return (
    <div className="card">
      <h2 className="page__title">
        Penjamin
        <span className="subtitle">Data penjamin (guarantor) — personal, corporate &amp; perusahaan penjamin kredit</span>
      </h2>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap', margin: '4px 0 16px' }}>
        <div style={{ width: 260 }}>
          <Field label="Jenis Penjamin">
            <Select value={jenis} onChange={setJenis} options={['Semua', ...window.PENJAMIN_JENIS_OPTIONS]} />
          </Field>
        </div>
        <div style={{ flex: 1, minWidth: 240, maxWidth: 420 }}>
          <Field label="Cari">
            <TextInput value={q} onChange={setQ} placeholder="Cari rekening / nasabah / penjamin / no. identitas..." />
          </Field>
        </div>
        <button className="btn btn--primary" style={{ marginLeft: 'auto' }} onClick={() => setModal({ mode: 'add' })}>
          <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
          Tambah Penjamin
        </button>
      </div>

      <div className="table-meta">{filtered.length} penjamin ditemukan</div>

      <DataTable
        showSearch={false}
        data={filtered}
        columns={[
          { key: 'noRekening',  label: 'No. Rekening', width: 130, sort: true, render: r => <span className="mono">{r.noRekening}</span> },
          { key: 'nasabah',     label: 'Nama Nasabah', width: 200 },
          { key: 'jenis',       label: 'Jenis Penjamin', width: 200, render: r => <span className="tag tag--info">{r.jenis}</span> },
          { key: 'jenisIdentitas', label: 'Identitas', width: 100 },
          { key: 'namaLengkap', label: 'Nama Penjamin' },
          { key: 'persentase',  label: 'Persentase', width: 110, align: 'right', render: r => <span className="mono">{r.persentase} %</span> },
          { key: 'nilai',       label: 'Nilai Penjamin', width: 160, align: 'right', render: r => <span className="mono">{window.fmtRp(r.nilai)}</span> },
        ]}
        popupItems={[
          { id: 'view',  label: 'Lihat Detail', icon: 'view' },
          { id: 'edit',  label: 'Update Data', icon: 'edit' },
          { sep: true },
          { id: 'hapus', label: 'Hapus', icon: 'trash', danger: true },
        ]}
        onPopupClick={(row, id) => {
          const index = rows.findIndex(r => r.id === row.id);
          if (id === 'view')  { setDetail(row); return; }
          if (id === 'edit')  { setModal({ mode: 'edit', index }); return; }
          if (id === 'hapus') { setConfirmDel(index); return; }
        }}
      />

      {modal && (
        <PenjaminFormModal
          mode={modal.mode}
          initial={modal.mode === 'edit' ? rows[modal.index] : emptyDraft}
          onClose={() => setModal(null)}
          onSave={(draft) => {
            const norm = { ...draft, persentase: Number(draft.persentase) || 0, nilai: Number(draft.nilai) || 0 };
            if (modal.mode === 'edit') {
              persist(rows.map((r, i) => i === modal.index ? { ...r, ...norm } : r));
              showToast({ type: 'success', title: 'Data penjamin diperbarui', message: norm.namaLengkap });
            } else {
              persist([{ ...norm, id: Math.max(0, ...rows.map(r => r.id)) + 1 }, ...rows]);
              showToast({ type: 'success', title: 'Penjamin ditambahkan', message: norm.namaLengkap });
            }
            setModal(null);
          }}
        />
      )}

      {detail && (
        <Modal
          title={detail.namaLengkap}
          subtitle={`${detail.jenis} · ${detail.jenisIdentitas}`}
          size="lg"
          onClose={() => setDetail(null)}
          footer={
            <>
              <button className="btn btn--neutral" onClick={() => setDetail(null)}>Tutup</button>
              <button className="btn btn--primary" onClick={() => { const index = rows.findIndex(r => r.id === detail.id); setDetail(null); setModal({ mode: 'edit', index }); }}>
                <span dangerouslySetInnerHTML={{ __html: Icons.edit(16) }} />
                Update
              </button>
            </>
          }
        >
          <FormGrid cols={2}>
            <Disp label="Nasabah" value={`${detail.noRekening} · ${detail.nasabah}`} />
            <Disp label="Cabang" value={`${detail.cabang} · ${detail.cabangNama}`} />
            <Disp label="Jenis Penjamin" value={detail.jenis} />
            <Disp label="Jenis Identitas" value={detail.jenisIdentitas} />
            <Disp label="Nomor Identitas" value={detail.noIdentitas} mono />
            <Disp label="Nama Sesuai Identitas" value={detail.namaIdentitas} />
            <Disp label="Nama Lengkap Penjamin" value={detail.namaLengkap} />
            <Disp label="Kode Golongan" value={`${detail.golongan} · ${detail.golonganNama}`} />
            <Disp label="Persentase Penjamin" value={`${detail.persentase} %`} mono />
            <Disp label="Nilai Penjamin" value={window.fmtRp(detail.nilai)} mono />
            <Disp label="Akta / Polis Penjamin" value={detail.akta} />
            <Disp label="Kode Pos" value={detail.kodePos} mono />
            <Disp label="Alamat Penjamin" value={detail.alamat} />
            <Disp label="Kecamatan / Kelurahan" value={`${detail.kecamatan} / ${detail.kelurahan}`} />
            <Disp label="Dati II" value={`${detail.datiII} · ${detail.datiIINama}`} />
          </FormGrid>
        </Modal>
      )}

      {confirmDel !== null && (
        <ConfirmDialog
          title="Hapus Data Penjamin"
          message={`Hapus penjamin "${rows[confirmDel]?.namaLengkap}"? Tindakan ini tidak dapat dibatalkan.`}
          confirmLabel="Ya, Hapus"
          danger
          onClose={() => setConfirmDel(null)}
          onConfirm={() => {
            const removed = rows[confirmDel];
            persist(rows.filter((_, i) => i !== confirmDel));
            showToast({ type: 'success', title: 'Penjamin dihapus', message: removed?.namaLengkap });
            setConfirmDel(null);
          }}
        />
      )}
    </div>
  );
}

/* ─────────── List Pekerjaan Notaris ───────────
   Covernote pengikatan akad & agunan. Popup = CRUD penuh. */
function CovernoteTag({ status }) {
  return <span className={`tag ${status === 'Baru' ? 'tag--info' : 'tag--warning'}`}>{status}</span>;
}
function PekerjaanTag({ status }) {
  return <span className={`tag ${status === 'Selesai' ? 'tag--success' : 'tag--warning'}`}>{status}</span>;
}

// Form "Data Notaris" — covernote pengikatan
function NotarisFormModal({ mode, initial, onClose, onSave }) {
  const [d, setD] = React.useState(initial);
  const set = (k, v) => setD(p => ({ ...p, [k]: v }));
  const isPerpanjangan = d.statusCoverNote === 'Perpanjangan';
  const valid = d.notaris.trim() && d.noRekening.trim() && d.jenisDokumen && d.noCoverNote.trim();

  return (
    <Modal
      title="Data Notaris"
      subtitle="Covernote pengikatan akad &amp; agunan"
      size="lg"
      onClose={onClose}
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
      <div className="form-section__title">NOTARIS &amp; DOKUMEN</div>
      <FormGrid cols={2}>
        <Field label="Kode Notaris" required>
          <TextInput value={d.kodeNotaris} onChange={v => set('kodeNotaris', v)} readOnly={mode === 'edit'} placeholder="00002" />
        </Field>
        <Field label="Nama Notaris" required>
          <TextInput value={d.notaris} onChange={v => set('notaris', v)} placeholder="MUHAMAD ILHAM R.P" />
        </Field>
        <Field label="Nomor Rekening Pembiayaan" required>
          <TextInput value={d.noRekening} onChange={v => set('noRekening', v)} placeholder="5330516000347" />
        </Field>
        <Field label="Nama Nasabah">
          <TextInput value={d.nasabah} onChange={v => set('nasabah', v)} placeholder="Nama debitur" />
        </Field>
        <Field label="Jenis Dokumen" required>
          <Select value={d.jenisDokumen} onChange={v => set('jenisDokumen', v)} options={window.NOTARIS_DOKUMEN_OPTIONS} />
        </Field>
        <Field label="Detail Dokumen">
          <TextInput value={d.detailDokumen} onChange={v => set('detailDokumen', v)} placeholder="2" />
        </Field>
        <Field label="Telepon Notaris">
          <TextInput value={d.telpNotaris} onChange={v => set('telpNotaris', v)} placeholder="085223077050" />
        </Field>
        <Field label="Alamat Notaris">
          <TextInput value={d.alamatNotaris} onChange={v => set('alamatNotaris', v)} placeholder="KAWASAN RUKO BLOK R. 13 JANATI" />
        </Field>
      </FormGrid>

      <div className="form-section__title" style={{ marginTop: 24 }}>COVER NOTE</div>
      <FormGrid cols={2}>
        <Field label="Nomor Cover Note" required>
          <TextInput value={d.noCoverNote} onChange={v => set('noCoverNote', v)} placeholder="1358/N-MIRP/X/2024" />
        </Field>
        <Field label="Status Cover Note">
          <Select value={d.statusCoverNote} onChange={v => set('statusCoverNote', v)} options={window.NOTARIS_COVERNOTE_OPTIONS} />
        </Field>
        <Field label="Tanggal Cover Note">
          <DateInput value={d.tglCoverNote} onChange={v => set('tglCoverNote', v)} />
        </Field>
        <Field label="Tanggal Jatuh Tempo Cover Note">
          <DateInput value={d.tglJatuhTempoCN} onChange={v => set('tglJatuhTempoCN', v)} />
        </Field>
        <Field label="Perpanjangan Ke-" hint={isPerpanjangan ? '' : 'Aktif bila status = Perpanjangan'}>
          <NumberInput value={String(d.perpanjanganKe ?? '')} onChange={v => set('perpanjanganKe', v)} readOnly={!isPerpanjangan} />
        </Field>
        <Field label="Tanggal Cover Note Perpanjangan">
          <DateInput value={d.tglCNPerpanjangan} onChange={v => set('tglCNPerpanjangan', v)} readOnly={!isPerpanjangan} />
        </Field>
      </FormGrid>

      <div className="form-section__title" style={{ marginTop: 24 }}>PEKERJAAN</div>
      <FormGrid cols={2}>
        <Field label="Status Pekerjaan">
          <Select value={d.statusPekerjaan} onChange={v => set('statusPekerjaan', v)} options={window.NOTARIS_PEKERJAAN_OPTIONS} />
        </Field>
        <div></div>
        <Field label="Kendala" span="full">
          <TextInput value={d.kendala} onChange={v => set('kendala', v)} placeholder="TIDAK ADA KENDALA" />
        </Field>
        <Field label="Progres Pekerjaan" span="full">
          <TextInput value={d.progres} onChange={v => set('progres', v)} placeholder="DALAM PROSES SKMHT" />
        </Field>
      </FormGrid>
    </Modal>
  );
}

function ListPekerjaanNotarisScreen({ showToast }) {
  const [rows, setRows] = React.useState(() => window.MOCK_PEKERJAAN_NOTARIS.slice());
  const [dokumen, setDokumen] = React.useState('Semua');
  const [covernote, setCovernote] = React.useState('Semua');
  const [pekerjaan, setPekerjaan] = React.useState('Semua');
  const [q, setQ] = React.useState('');
  const [modal, setModal] = React.useState(null);
  const [detail, setDetail] = React.useState(null);
  const [confirmDel, setConfirmDel] = React.useState(null);

  const persist = (next) => {
    setRows(next);
    window.MOCK_PEKERJAAN_NOTARIS.length = 0;
    next.forEach(x => window.MOCK_PEKERJAAN_NOTARIS.push(x));
  };

  const filtered = rows.filter(r => {
    if (dokumen !== 'Semua' && r.jenisDokumen !== dokumen) return false;
    if (covernote !== 'Semua' && r.statusCoverNote !== covernote) return false;
    if (pekerjaan !== 'Semua' && r.statusPekerjaan !== pekerjaan) return false;
    if (q.trim()) {
      const s = q.toLowerCase();
      return [r.noCoverNote, r.notaris, r.nasabah, r.noRekening].some(v => String(v || '').toLowerCase().includes(s));
    }
    return true;
  });

  const emptyDraft = {
    kodeNotaris: '', notaris: '', noRekening: '', nasabah: '', jenisDokumen: 'Akta Pengikatan', detailDokumen: '',
    telpNotaris: '', alamatNotaris: '', noCoverNote: '', tglCoverNote: '', tglJatuhTempoCN: '',
    statusCoverNote: 'Baru', perpanjanganKe: '', tglCNPerpanjangan: '', statusPekerjaan: 'Belum Selesai', kendala: '', progres: '',
  };

  return (
    <div className="card">
      <h2 className="page__title">
        List Pekerjaan Notaris
        <span className="subtitle">Covernote pengikatan akad &amp; agunan ke notaris/PPAT</span>
      </h2>

      <div className="filter-panel">
        <div className="filter-grid">
          <Field label="Jenis Dokumen">
            <Select value={dokumen} onChange={setDokumen} options={['Semua', ...window.NOTARIS_DOKUMEN_OPTIONS]} />
          </Field>
          <Field label="Status Covernote">
            <Select value={covernote} onChange={setCovernote} options={['Semua', ...window.NOTARIS_COVERNOTE_OPTIONS]} />
          </Field>
          <Field label="Status Pekerjaan">
            <Select value={pekerjaan} onChange={setPekerjaan} options={['Semua', ...window.NOTARIS_PEKERJAAN_OPTIONS]} />
          </Field>
          <Field label="Cari">
            <TextInput value={q} onChange={setQ} placeholder="Cover note / notaris / nasabah / rekening..." />
          </Field>
        </div>
        <div className="filter-actions">
          <button className="btn btn--primary btn--sm" onClick={() => setModal({ mode: 'add' })}>
            <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
            Tambah Pekerjaan
          </button>
        </div>
      </div>

      <div className="table-meta">{filtered.length} pekerjaan ditemukan</div>

      <DataTable
        showSearch={false}
        data={filtered}
        columns={[
          { key: 'noCoverNote',     label: 'Nomor Cover Note', width: 170, sort: true, render: r => <span className="mono">{r.noCoverNote}</span> },
          { key: 'notaris',         label: 'Notaris / PPAT' },
          { key: 'noRekening',      label: 'No. Rekening', width: 140, render: r => <span className="mono">{r.noRekening}</span> },
          { key: 'nasabah',         label: 'Nasabah' },
          { key: 'jenisDokumen',    label: 'Jenis Dokumen', width: 150, render: r => <span className="tag tag--info">{r.jenisDokumen}</span> },
          { key: 'tglCoverNote',    label: 'Tgl. Cover Note', width: 130, render: r => <span className="mono">{r.tglCoverNote}</span> },
          { key: 'tglJatuhTempoCN', label: 'Jatuh Tempo CN', width: 130, render: r => <span className="mono">{r.tglJatuhTempoCN}</span> },
          { key: 'statusCoverNote', label: 'Status Covernote', width: 140, render: r => <CovernoteTag status={r.statusCoverNote} /> },
          { key: 'statusPekerjaan', label: 'Status Pekerjaan', width: 150, render: r => <PekerjaanTag status={r.statusPekerjaan} /> },
        ]}
        popupItems={[
          { id: 'view',  label: 'Lihat Detail', icon: 'view' },
          { id: 'edit',  label: 'Update Data', icon: 'edit' },
          { id: 'selesai', label: 'Tandai Selesai', icon: 'checkmark' },
          { sep: true },
          { id: 'hapus', label: 'Hapus', icon: 'trash', danger: true },
        ]}
        onPopupClick={(row, id) => {
          const index = rows.findIndex(r => r.id === row.id);
          if (id === 'view')    { setDetail(row); return; }
          if (id === 'edit')    { setModal({ mode: 'edit', index }); return; }
          if (id === 'selesai') { persist(rows.map((r, i) => i === index ? { ...r, statusPekerjaan: 'Selesai' } : r)); showToast({ type: 'success', title: 'Pekerjaan ditandai selesai', message: row.noCoverNote }); return; }
          if (id === 'hapus')   { setConfirmDel(index); return; }
        }}
      />

      {modal && (
        <NotarisFormModal
          mode={modal.mode}
          initial={modal.mode === 'edit' ? rows[modal.index] : emptyDraft}
          onClose={() => setModal(null)}
          onSave={(draft) => {
            if (modal.mode === 'edit') {
              persist(rows.map((r, i) => i === modal.index ? { ...r, ...draft } : r));
              showToast({ type: 'success', title: 'Data notaris diperbarui', message: draft.noCoverNote });
            } else {
              persist([{ ...draft, id: Math.max(0, ...rows.map(r => r.id)) + 1 }, ...rows]);
              showToast({ type: 'success', title: 'Pekerjaan notaris ditambahkan', message: draft.noCoverNote });
            }
            setModal(null);
          }}
        />
      )}

      {detail && (
        <Modal
          title={`Cover Note ${detail.noCoverNote}`}
          subtitle={`${detail.jenisDokumen} · ${detail.notaris}`}
          size="lg"
          onClose={() => setDetail(null)}
          footer={
            <>
              <button className="btn btn--neutral" onClick={() => setDetail(null)}>Tutup</button>
              <button className="btn btn--primary" onClick={() => { const index = rows.findIndex(r => r.id === detail.id); setDetail(null); setModal({ mode: 'edit', index }); }}>
                <span dangerouslySetInnerHTML={{ __html: Icons.edit(16) }} />
                Update
              </button>
            </>
          }
        >
          <FormGrid cols={2}>
            <Disp label="Kode Notaris" value={detail.kodeNotaris} mono />
            <Disp label="Nama Notaris" value={detail.notaris} />
            <Disp label="Nomor Rekening Pembiayaan" value={detail.noRekening} mono />
            <Disp label="Nama Nasabah" value={detail.nasabah} />
            <Disp label="Jenis Dokumen" value={detail.jenisDokumen} />
            <Disp label="Detail Dokumen" value={detail.detailDokumen} />
            <Disp label="Telepon Notaris" value={detail.telpNotaris} mono />
            <Disp label="Alamat Notaris" value={detail.alamatNotaris} />
            <Disp label="Nomor Cover Note" value={detail.noCoverNote} mono />
            <Disp label="Tanggal Cover Note" value={detail.tglCoverNote} mono />
            <Disp label="Jatuh Tempo Cover Note" value={detail.tglJatuhTempoCN} mono />
            <Disp label="Perpanjangan Ke-" value={detail.perpanjanganKe || '—'} />
            <Disp label="Tgl Cover Note Perpanjangan" value={detail.tglCNPerpanjangan || '—'} mono />
            <Disp label="Kendala" value={detail.kendala || '—'} />
            <Disp label="Progres Pekerjaan" value={detail.progres || '—'} />
          </FormGrid>
          <div style={{ marginTop: 16, display: 'flex', gap: 24 }}>
            <div><div className="disp__label" style={{ marginBottom: 6 }}>Status Covernote</div><CovernoteTag status={detail.statusCoverNote} /></div>
            <div><div className="disp__label" style={{ marginBottom: 6 }}>Status Pekerjaan</div><PekerjaanTag status={detail.statusPekerjaan} /></div>
          </div>
        </Modal>
      )}

      {confirmDel !== null && (
        <ConfirmDialog
          title="Hapus Pekerjaan Notaris"
          message={`Hapus pekerjaan cover note "${rows[confirmDel]?.noCoverNote}" (${rows[confirmDel]?.nasabah})? Tindakan ini tidak dapat dibatalkan.`}
          confirmLabel="Ya, Hapus"
          danger
          onClose={() => setConfirmDel(null)}
          onConfirm={() => {
            const removed = rows[confirmDel];
            persist(rows.filter((_, i) => i !== confirmDel));
            showToast({ type: 'success', title: 'Pekerjaan dihapus', message: removed?.noCoverNote });
            setConfirmDel(null);
          }}
        />
      )}
    </div>
  );
}

Object.assign(window, {
  DataAsuransiScreen,
  DataPenjaminScreen,
  ListPekerjaanNotarisScreen,
});
