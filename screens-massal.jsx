/* screens-massal.jsx — Transaksi Massal (bulk upload)
 *   /massal/input    → InputTransaksiMassalScreen (2-step wizard: Form → Verification Result)
 *   /massal/history  → RiwayatTransaksiScreen (filter + batch history table)
 */

// Status pill for batch states (Submit / Approve / Canceled / Draft)
function MassalStatusTag({ status }) {
  const map = {
    'Approve':  'tag--success',
    'Submit':   'tag--info',
    'Canceled': 'tag--neutral',
    'Draft':    'tag--draft',
  };
  return <span className={`tag ${map[status] || 'tag--neutral'}`}>{status}</span>;
}

// Build mock per-row verification data for a batch (deterministic by total/invalid).
function buildMassalRows(total, invalidCount) {
  const nasabah = window.MOCK_NASABAH;
  const reasons = ['Rekening tidak ditemukan', 'Nominal melebihi sisa kewajiban', 'Format tanggal tidak valid', 'NIK tidak terdaftar'];
  const n = Math.max(total, 1);
  // Spread invalid rows across the set deterministically.
  const invalidSet = new Set();
  for (let k = 0; k < invalidCount && k < n; k++) {
    invalidSet.add(Math.floor((k + 1) * n / (invalidCount + 1)));
  }
  return Array.from({ length: n }, (_, i) => {
    const cust = nasabah[i % nasabah.length];
    const invalid = invalidSet.has(i);
    return {
      baris: i + 1,
      rekening: '7100-0000-00' + (44 + i),
      nasabah: cust.nama,
      nominal: 1500000 + i * 375000,
      valid: !invalid,
      keterangan: invalid ? reasons[i % reasons.length] : 'Valid',
    };
  });
}

/* Reusable verification-result view: summary tiles + file card + per-row table + banner */
function MassalVerificationResult({ fileName, jenis, rows }) {
  const validCount = rows.filter(r => r.valid).length;
  const invalidCount = rows.length - validCount;
  return (
    <>
      <div className="massal-summary">
        <div className="massal-summary__tile massal-summary__tile--total">
          <div className="massal-summary__label">Total Baris</div>
          <div className="massal-summary__value">{rows.length}</div>
        </div>
        <div className="massal-summary__tile massal-summary__tile--valid">
          <div className="massal-summary__label">Data Valid</div>
          <div className="massal-summary__value">{validCount}</div>
        </div>
        <div className="massal-summary__tile massal-summary__tile--invalid">
          <div className="massal-summary__label">Data Tidak Valid</div>
          <div className="massal-summary__value">{invalidCount}</div>
        </div>
      </div>

      <div className="massal-file" style={{ marginTop: 0, marginBottom: 16, display: 'inline-flex' }}>
        <span className="massal-file__icon" dangerouslySetInnerHTML={{ __html: Icons.document(20) }} />
        <div className="massal-file__meta">
          <div className="massal-file__name">{fileName}</div>
          <div className="massal-file__sub">{jenis}</div>
        </div>
      </div>

      <table className="tbl">
        <thead>
          <tr>
            <th style={{ width: 60 }}>Baris</th>
            <th>No. Rekening</th>
            <th>Nasabah</th>
            <th style={{ textAlign: 'right' }}>Nominal</th>
            <th style={{ width: 110 }}>Status</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.baris}>
              <td className="mono">{r.baris}</td>
              <td className="mono">{r.rekening}</td>
              <td>{r.nasabah}</td>
              <td className="mono" style={{ textAlign: 'right' }}>{window.fmtRp(r.nominal)}</td>
              <td>
                <span className={'tag ' + (r.valid ? 'tag--success' : 'tag--error')}>
                  {r.valid ? 'Valid' : 'Tidak Valid'}
                </span>
              </td>
              <td className={r.valid ? 'text-muted' : ''} style={{ color: r.valid ? undefined : 'var(--c-error)' }}>
                {r.keterangan}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="approval-banner mt-16" style={{ background: 'var(--c-info-bg)', borderLeftColor: 'var(--c-info)' }}>
        <span style={{ color: 'var(--c-info)', flexShrink: 0 }} dangerouslySetInnerHTML={{ __html: Icons.info(20) }} />
        <div className="approval-banner__body">
          {invalidCount > 0
            ? <>Terdapat <b>{invalidCount}</b> baris tidak valid yang akan dilewati. Hanya <b>{validCount}</b> baris valid yang akan disubmit untuk otorisasi.</>
            : <>Seluruh <b>{validCount}</b> baris valid dan siap disubmit untuk otorisasi.</>}
        </div>
      </div>
    </>
  );
}

/* ─────────── Input Transaksi (bulk upload wizard) ─────────── */
function InputTransaksiMassalScreen({ onNavigate, showToast }) {
  const [step, setStep] = React.useState('form');         // 'form' | 'verify'
  const [jenis, setJenis] = React.useState('');
  const [file, setFile] = React.useState(null);           // { name, rows }
  const [dragOver, setDragOver] = React.useState(false);
  const inputRef = React.useRef(null);

  // Build a mock verification result for an uploaded file.
  const buildRows = (fileName) => {
    const nasabah = window.MOCK_NASABAH;
    const n = 8;
    return Array.from({ length: n }, (_, i) => {
      const cust = nasabah[i % nasabah.length];
      const invalid = i === 2 || i === 6;        // a couple of invalid rows
      return {
        baris: i + 1,
        rekening: '7100-0000-00' + (44 + i),
        nasabah: cust.nama,
        nominal: 1500000 + i * 375000,
        valid: !invalid,
        keterangan: invalid
          ? (i === 2 ? 'Rekening tidak ditemukan' : 'Nominal melebihi sisa kewajiban')
          : 'Valid',
      };
    });
  };

  const acceptFile = (name) => {
    if (!jenis) {
      showToast({ type: 'warn', title: 'Pilih jenis transaksi', message: 'Jenis Transaksi wajib dipilih sebelum mengunggah file.' });
      return;
    }
    const rows = buildRows(name);
    setFile({ name, rows });
    showToast({ type: 'success', title: 'File terunggah', message: `${name} berhasil diunggah dan diverifikasi.` });
    setStep('verify');
  };

  const onPick = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) acceptFile(f.name);
    e.target.value = '';
  };

  const onDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    acceptFile(f ? f.name : (jenis ? jenis.toLowerCase().replace(/\s+/g, '-') + '.xlsx' : ''));
  };

  const validCount = file ? file.rows.filter(r => r.valid).length : 0;
  const invalidCount = file ? file.rows.length - validCount : 0;

  const tabs = [
    { id: 'form',   label: 'Form Transaksi Massal' },
    { id: 'verify', label: 'Verification Result' },
  ];

  return (
    <div className="card">
      <SectionTabs
        tabs={tabs}
        value={step}
        onChange={(id) => { if (id === 'form' || file) setStep(id); }}
      />

      {step === 'form' && (
        <div className="massal-grid">
          {/* Generate File */}
          <div className="massal-col">
            <h3 className="massal-col__title">Generate File</h3>
            <Field label="Jenis Transaksi" required>
              <Select value={jenis} onChange={setJenis} options={window.MASSAL_JENIS} placeholder="-- Pilih Jenis Transaksi --" />
            </Field>
            <button
              className="btn btn--primary mt-8"
              disabled={!jenis}
              onClick={() => showToast({ type: 'success', title: 'Template diunduh', message: `Template "${jenis}" sedang diunduh.` })}
            >
              <span dangerouslySetInnerHTML={{ __html: Icons.download(16) }} />
              Generate Template
            </button>
            <p className="text-muted text-sm mt-16" style={{ maxWidth: 360 }}>
              Unduh template Excel sesuai jenis transaksi, isi data sesuai format kolom,
              lalu unggah kembali pada panel di samping untuk diverifikasi.
            </p>
          </div>

          <div className="massal-grid__divider"></div>

          {/* Upload File */}
          <div className="massal-col">
            <h3 className="massal-col__title">Upload File</h3>
            <input ref={inputRef} type="file" accept=".xlsx,.xls,.csv" style={{ display: 'none' }} onChange={onPick} />
            <div
              className={'dropzone' + (dragOver ? ' dropzone--over' : '') + (file ? ' dropzone--filled' : '')}
              onClick={() => inputRef.current && inputRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
            >
              <span className="dropzone__icon" dangerouslySetInnerHTML={{ __html: (file ? Icons.success(32) : Icons.upload(32)) }} />
              {file ? (
                <>
                  <span className="dropzone__primary">{file.name}</span>
                  <span className="dropzone__hint">Klik untuk mengganti file</span>
                </>
              ) : (
                <>
                  <span className="dropzone__primary">Click or drag file to this area to upload</span>
                  <span className="dropzone__hint">Format .xlsx, .xls, atau .csv — maksimal 5 MB</span>
                </>
              )}
            </div>
            {file && (
              <div className="btn-bar btn-bar--between" style={{ borderTop: 0, paddingTop: 16 }}>
                <button className="btn btn--neutral" onClick={() => setFile(null)}>Hapus File</button>
                <button className="btn btn--primary" onClick={() => setStep('verify')}>
                  Lihat Hasil Verifikasi
                  <span dangerouslySetInnerHTML={{ __html: Icons.arrowR(16) }} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {step === 'verify' && file && (
        <>
          <MassalVerificationResult fileName={file.name} jenis={jenis} rows={file.rows} />

          <div className="btn-bar btn-bar--between">
            <button className="btn btn--neutral" onClick={() => setStep('form')}>
              <span dangerouslySetInnerHTML={{ __html: Icons.arrowL(16) }} />
              Kembali
            </button>
            <button
              className="btn btn--primary"
              disabled={validCount === 0}
              onClick={() => {
                showToast({ type: 'success', title: 'Batch disubmit', message: `${validCount} transaksi dikirim ke antrian otorisasi.` });
                onNavigate('/massal/history');
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: Icons.send(16) }} />
              Submit {validCount} Transaksi
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────── History Transaksi (Riwayat) ─────────── */
function RiwayatTransaksiScreen({ onNavigate, popupStyle, showToast }) {
  const [jenis, setJenis] = React.useState('Semua');
  const [status, setStatus] = React.useState('Semua');
  const [tglAwal, setTglAwal] = React.useState('');
  const [tglAkhir, setTglAkhir] = React.useState('');
  const [keyword, setKeyword] = React.useState('');
  // applied filters (committed on "Tampilkan")
  const [applied, setApplied] = React.useState({ jenis: 'Semua', status: 'Semua', keyword: '' });
  const [detail, setDetail] = React.useState(null);

  const rows = window.MOCK_MASSAL_HISTORY.filter(r => {
    if (applied.jenis !== 'Semua' && r.jenis !== applied.jenis) return false;
    if (applied.status !== 'Semua' && r.status !== applied.status) return false;
    if (applied.keyword.trim()) {
      const s = applied.keyword.toLowerCase();
      return [r.batchId, r.fileName, r.jenis, r.userUpload].some(v => String(v || '').toLowerCase().includes(s));
    }
    return true;
  });

  const apply = () => setApplied({ jenis, status, keyword });
  const reset = () => {
    setJenis('Semua'); setStatus('Semua'); setTglAwal(''); setTglAkhir(''); setKeyword('');
    setApplied({ jenis: 'Semua', status: 'Semua', keyword: '' });
  };

  return (
    <div className="card">
      <h2 className="page__title">
        Riwayat Transaksi
        <span className="subtitle">Histori unggah batch transaksi massal beserta status otorisasinya</span>
      </h2>

      {/* Filter bar */}
      <div className="form-grid form-grid--4" style={{ marginBottom: 16 }}>
        <Field label="Jenis Transaksi">
          <Select value={jenis} onChange={setJenis} options={['Semua', ...window.MASSAL_JENIS]} />
        </Field>
        <Field label="Tanggal Upload (Awal)">
          <DateInput value={tglAwal} onChange={setTglAwal} />
        </Field>
        <Field label="Tanggal Upload (Akhir)">
          <DateInput value={tglAkhir} onChange={setTglAkhir} />
        </Field>
        <Field label="Status">
          <Select value={status} onChange={setStatus} options={['Semua', ...window.MASSAL_STATUS_OPTIONS]} />
        </Field>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 240, maxWidth: 420 }}>
          <Field label="Keyword">
            <TextInput value={keyword} onChange={setKeyword} placeholder="Masukkan kata kunci..." />
          </Field>
        </div>
        <div className="row gap-8">
          <button className="btn btn--primary" onClick={apply}>
            <span dangerouslySetInnerHTML={{ __html: Icons.search(16) }} />
            Tampilkan
          </button>
          <button className="btn btn--neutral" onClick={reset}>Reset</button>
        </div>
      </div>

      <DataTable
        showSearch={false}
        data={rows}
        pageSize={10}
        columns={[
          { key: 'batchId',     label: 'Batch ID', width: 90, render: r => <span className="mono">{r.batchId}</span> },
          { key: 'fileName',    label: 'File Name' },
          { key: 'tglUpload',   label: 'Tgl. Upload', width: 110, render: r => <span className="mono text-sm">{r.tglUpload}</span> },
          { key: 'jenis',       label: 'Jenis Transaksi' },
          { key: 'valid',       label: 'Data Valid', width: 90, align: 'center', render: r => <span className="mono">{r.valid}</span> },
          { key: 'invalid',     label: 'Data Tidak Valid', width: 110, align: 'center', render: r => <span className="mono" style={{ color: r.invalid > 0 ? 'var(--c-error)' : undefined }}>{r.invalid}</span> },
          { key: 'status',      label: 'Status', width: 110, render: r => <MassalStatusTag status={r.status} /> },
          { key: 'userUpload',  label: 'User Upload', render: r => <span className="mono text-sm">{r.userUpload}</span> },
          { key: 'userApprove', label: 'User Approve', render: r => <span className="mono text-sm">{r.userApprove}</span> },
          { key: 'tglApprove',  label: 'Tgl. Approve', width: 110, render: r => <span className="mono text-sm">{r.tglApprove}</span> },
          { key: 'aksi',        label: 'Aksi', width: 110, render: r => (
            <button className="link-btn" onClick={() => setDetail(r)}>
              <span dangerouslySetInnerHTML={{ __html: Icons.view(16) }} />
              Lihat Detil
            </button>
          ) },
        ]}
      />

      {detail && (
        <Modal
          title={`Detail Batch ${detail.batchId}`}
          subtitle={`${detail.jenis} — diunggah ${detail.tglUpload} oleh ${detail.userUpload}`}
          size="xl"
          onClose={() => setDetail(null)}
          footer={<button className="btn btn--neutral" onClick={() => setDetail(null)}>Tutup</button>}
        >
          <MassalVerificationResult
            fileName={detail.fileName}
            jenis={detail.jenis}
            rows={buildMassalRows(detail.valid + detail.invalid, detail.invalid)}
          />
        </Modal>
      )}
    </div>
  );
}

Object.assign(window, {
  InputTransaksiMassalScreen,
  RiwayatTransaksiScreen,
});
