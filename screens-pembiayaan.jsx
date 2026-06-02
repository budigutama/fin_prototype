/* screens-pembiayaan.jsx — Registrasi Pembiayaan, List, Edit Rekening, Restruktur */


/* ─────────── List Pembiayaan ─────────── */
function ListPembiayaanScreen({ onNavigate, popupStyle, showToast }) {
  const popupItems = [
    { id: 'detail', label: 'Lihat Detail', icon: 'view' },
    { id: 'edit',   label: 'Edit Rekening', icon: 'edit' },
  ];

  return (
    <div className="card">
      <h2 className="page__title">
        Daftar Rekening Pembiayaan
        <span className="subtitle">{window.MOCK_PEMBIAYAAN.length} rekening aktif</span>
      </h2>

      <div className="stats" style={{ marginTop: 20 }}>
        <div className="stat">
          <div className="stat__label">Total Plafond</div>
          <div className="stat__value">{window.fmtRpShort(window.MOCK_PEMBIAYAAN.reduce((s,r) => s + r.plafond, 0))}</div>
        </div>
        <div className="stat">
          <div className="stat__label">Total Outstanding</div>
          <div className="stat__value">{window.fmtRpShort(window.MOCK_PEMBIAYAAN.reduce((s,r) => s + r.outstanding, 0))}</div>
        </div>
        <div className="stat">
          <div className="stat__label">Kol. 1 (Lancar)</div>
          <div className="stat__value stat__value--pos">{window.MOCK_PEMBIAYAAN.filter(r => r.kolektibilitas === 1).length}</div>
        </div>
        <div className="stat">
          <div className="stat__label">Tunggakan</div>
          <div className="stat__value stat__value--neg">{window.MOCK_PEMBIAYAAN.filter(r => r.status === 'Tunggakan').length}</div>
        </div>
      </div>

      <DataTable
        columns={[
          { key: 'noRek', label: 'No. Rekening', sort: true, render: r => <span className="mono">{r.noRek}</span> },
          { key: 'nama', label: 'Nasabah', sort: true },
          { key: 'akad', label: 'Akad', width: 120 },
          { key: 'plafond', label: 'Plafond', align: 'right', render: r => <span className="mono">{window.fmtRp(r.plafond)}</span> },
          { key: 'outstanding', label: 'Outstanding', align: 'right', render: r => <span className="mono">{window.fmtRp(r.outstanding)}</span> },
          { key: 'kol', label: 'Kol', align: 'center', render: r => <span className={`tag ${r.kolektibilitas <= 1 ? 'tag--success' : r.kolektibilitas === 2 ? 'tag--warning' : 'tag--error'}`}>{r.kolektibilitas}</span> },
          { key: 'angsuran', label: 'Angs.', align: 'center', render: r => <span className="mono">{r.angsuranKe}/{r.tenor}</span> },
          { key: 'jatuhTempo', label: 'Jatuh Tempo', render: r => <span className="mono">{r.jatuhTempo}</span> },
          { key: 'status', label: 'Status', render: r => <StatusTag status={r.status} /> },
        ]}
        data={window.MOCK_PEMBIAYAAN}
        popupItems={popupStyle === 'menu' ? popupItems : null}
        onPopupClick={(row, id) => {
          if (id === 'detail') onNavigate('/list-pembiayaan/detail');
          if (id === 'edit')   onNavigate('/list-pembiayaan/edit');
        }}
        toolbarActions={
          <>
            <button className="btn btn--neutral btn--sm">
              <span dangerouslySetInnerHTML={{ __html: Icons.download(14) }} />
              Export
            </button>
            <button className="btn btn--primary btn--sm" onClick={() => onNavigate('/registrasi/pembiayaan')}>
              <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
              Tambah Rekening
            </button>
          </>
        }
      />
    </div>
  );
}

/* ─────────── Edit Rekening Pembiayaan ─────────── */
function EditRekeningScreen({ onNavigate, showToast }) {
  const r = window.MOCK_PEMBIAYAAN[0];
  const [form, setForm] = React.useState({
    namaOfficer: 'TP - Teguh Priyono',
    cabang: '001 - Kantor Pusat',
    rekeningPenampung: '7000-0000-1234',
    biayaAdmin: '500000',
    tujuan: 'Modal kerja toko',
    npwp: '01.234.567.8-901.000',
    alamatNasabah: 'Jl. Sudirman No. 45, Kelapa Gading, Jakarta Utara',
    kontakDarurat: 'Andi Sutopo - 0812-3456-7890',
    pekerjaan: 'Wiraswasta',
    penghasilan: '15000000',
  });
  return (
    <div className="card">
      <div className="row row--between" style={{ paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Edit Rekening Pembiayaan</h2>
      </div>

      <div className="hl-card">
        <Disp label="No. Rekening" value={r.noRek} large mono />
        <FormGrid cols={4} >
          <Disp label="Nasabah" value={r.nama} />
          <Disp label="Akad" value={r.akad} />
          <Disp label="Outstanding" value={window.fmtRp(r.outstanding)} mono />
          <div className="disp">
            <div className="disp__label">Status</div>
            <div><StatusTag status={r.status} /></div>
          </div>
        </FormGrid>
      </div>

      <h4 className="section-title">Data Pengelolaan</h4>
      <FormGrid>
        <Field label="Officer Pengelola" required>
          <LookupInput value={form.namaOfficer} onChange={v => setForm(f => ({ ...f, namaOfficer: v }))} />
        </Field>
        <Field label="Kantor Cabang" required>
          <Select value={form.cabang} onChange={v => setForm(f => ({ ...f, cabang: v }))} options={['001 - Kantor Pusat', '005 - Bandung Asia Afrika', '012 - Kelapa Gading', '023 - Surabaya Tunjungan']} />
        </Field>
        <Field label="Rekening Penampung" required>
          <TextInput value={form.rekeningPenampung} onChange={v => setForm(f => ({ ...f, rekeningPenampung: v }))} />
        </Field>
        <Field label="Biaya Administrasi Bulanan">
          <CurrencyInput value={form.biayaAdmin} onChange={v => setForm(f => ({ ...f, biayaAdmin: v }))} />
        </Field>
      </FormGrid>

      <h4 className="section-title">Data Nasabah</h4>
      <FormGrid>
        <Field label="NPWP">
          <TextInput value={form.npwp} onChange={v => setForm(f => ({ ...f, npwp: v }))} />
        </Field>
        <Field label="Pekerjaan">
          <Select value={form.pekerjaan} onChange={v => setForm(f => ({ ...f, pekerjaan: v }))} options={['Karyawan Swasta', 'PNS / Pemerintah', 'Wiraswasta', 'Profesional', 'Pensiunan']} />
        </Field>
        <Field label="Alamat Sesuai KTP" span="full">
          <textarea value={form.alamatNasabah} onChange={e => setForm(f => ({ ...f, alamatNasabah: e.target.value }))} rows={2} />
        </Field>
        <Field label="Kontak Darurat">
          <TextInput value={form.kontakDarurat} onChange={v => setForm(f => ({ ...f, kontakDarurat: v }))} />
        </Field>
        <Field label="Penghasilan Bulanan">
          <CurrencyInput value={form.penghasilan} onChange={v => setForm(f => ({ ...f, penghasilan: v }))} />
        </Field>
        <Field label="Tujuan Penggunaan Pembiayaan" span="full">
          <TextInput value={form.tujuan} onChange={v => setForm(f => ({ ...f, tujuan: v }))} />
        </Field>
      </FormGrid>

      <h4 className="section-title">Aksi Lanjutan</h4>
      <div className="row gap-12 row--wrap">
        <button className="btn btn--secondary" onClick={() => onNavigate('/edit/restruktur')}>
          <span dangerouslySetInnerHTML={{ __html: Icons.refresh(16) }} />
          Restruktur Pembiayaan
        </button>
        <button className="btn btn--secondary" onClick={() => onNavigate('/edit/ulang-jadwal')}>
          <span dangerouslySetInnerHTML={{ __html: Icons.history(16) }} />
          Ulang Jadwal Angsuran
        </button>
        <button className="btn btn--secondary" onClick={() => onNavigate('/edit/addendum')}>
          <span dangerouslySetInnerHTML={{ __html: Icons.edit(16) }} />
          Addendum Pembiayaan
        </button>
      </div>

      <div className="btn-bar">
        <button className="btn btn--neutral" onClick={() => onNavigate('/list-pembiayaan')}>Batal</button>
        <button className="btn btn--primary" onClick={() => {
          showToast({ type: 'success', title: 'Berhasil disimpan', message: `Data rekening ${r.noRek} diperbarui.` });
        }}>
          <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(16) }} />
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}

/* ─────────── Restruktur Pembiayaan ─────────── */
function RestrukturScreen({ onNavigate, showToast }) {
  const r = window.MOCK_PEMBIAYAAN[3]; // PT Maju Bersama — tunggakan
  const [form, setForm] = React.useState({
    skemaRestruktur: 'Perpanjangan Tenor',
    alasanRestruktur: 'Cash Flow Mismatch',
    plafondBaru: String(r.outstanding),
    tenorBaru: '60',
    marginBaru: '11.5',
    tanggalEfektif: '01-Jun-2026',
    keterangan: '',
  });
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <div className="card">
      <h2 className="page__title">Restruktur Pembiayaan</h2>

      <div className="hl-card">
        <Disp label="No. Rekening" value={r.noRek} large mono />
        <FormGrid cols={4} >
          <Disp label="Nasabah" value={r.nama} />
          <Disp label="Outstanding" value={window.fmtRp(r.outstanding)} mono />
          <Disp label="Tunggakan" value={`${r.kolektibilitas} hari`} />
          <div className="disp">
            <div className="disp__label">Status</div>
            <div><StatusTag status={r.status} /></div>
          </div>
        </FormGrid>
      </div>

      <div className="approval-banner">
        <span className="approval-banner__icon" dangerouslySetInnerHTML={{ __html: Icons.warning(20) }} />
        <div className="approval-banner__body">
          <b>Restruktur memerlukan persetujuan eskalasi.</b> Dokumen pendukung wajib dilampirkan: surat permohonan, laporan keuangan, dan rencana cashflow nasabah.
        </div>
      </div>

      <h4 className="section-title">Pilih Skema Restruktur</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
        {[
          { id: 'Perpanjangan Tenor',     desc: 'Memperpanjang masa pembayaran dengan margin baru' },
          { id: 'Pengurangan Margin',      desc: 'Margin diturunkan, tenor tetap' },
          { id: 'Penundaan Pembayaran',   desc: 'Grace period untuk pokok dan/atau margin' },
        ].map(opt => (
          <div
            key={opt.id}
            className={'radio-card' + (form.skemaRestruktur === opt.id ? ' radio-card--active' : '')}
            onClick={() => setForm(f => ({ ...f, skemaRestruktur: opt.id }))}
          >
            <div className="radio-card__title">{opt.id}</div>
            <div className="radio-card__desc">{opt.desc}</div>
          </div>
        ))}
      </div>

      <h4 className="section-title">Perubahan Skedul</h4>
      <FormGrid>
        <Field label="Plafond Restruktur" required>
          <CurrencyInput value={form.plafondBaru} onChange={v => setForm(f => ({ ...f, plafondBaru: v }))} />
        </Field>
        <Field label="Tenor Baru (Bulan)" required>
          <NumberInput value={form.tenorBaru} onChange={v => setForm(f => ({ ...f, tenorBaru: v }))} suffix="Bulan" />
        </Field>
        <Field label="Margin Baru (%/tahun)" required>
          <NumberInput value={form.marginBaru} onChange={v => setForm(f => ({ ...f, marginBaru: v }))} suffix="%" />
        </Field>
        <Field label="Tanggal Efektif Restruktur" required>
          <DateInput value={form.tanggalEfektif} onChange={v => setForm(f => ({ ...f, tanggalEfektif: v }))} />
        </Field>
        <Field label="Alasan Restruktur" required span="full">
          <Select
            value={form.alasanRestruktur}
            onChange={v => setForm(f => ({ ...f, alasanRestruktur: v }))}
            options={['Cash Flow Mismatch', 'Penurunan Omzet Usaha', 'Force Majeure', 'Restrukturisasi Bisnis Nasabah', 'Lain-lain']}
          />
        </Field>
        <Field label="Keterangan / Justifikasi" required span="full">
          <textarea
            value={form.keterangan}
            onChange={e => setForm(f => ({ ...f, keterangan: e.target.value }))}
            placeholder="Detail kondisi nasabah dan justifikasi restruktur..."
            rows={4}
          />
        </Field>
      </FormGrid>

      {/* Comparison */}
      <h4 className="section-title">Perbandingan: Sebelum vs Sesudah</h4>
      <table className="tbl">
        <thead>
          <tr><th></th><th>Sebelum</th><th>Sesudah</th><th>Perubahan</th></tr>
        </thead>
        <tbody>
          <tr><td>Outstanding</td><td className="mono">{window.fmtRp(r.outstanding)}</td><td className="mono">{window.fmtRp(form.plafondBaru)}</td><td className="text-muted">-</td></tr>
          <tr><td>Tenor Sisa</td><td className="mono">{r.tenor - r.angsuranKe} bulan</td><td className="mono">{form.tenorBaru} bulan</td><td className="mono" style={{ color: 'var(--c-success)' }}>+{Number(form.tenorBaru) - (r.tenor - r.angsuranKe)}</td></tr>
          <tr><td>Margin</td><td className="mono">13,5%</td><td className="mono">{form.marginBaru}%</td><td className="mono" style={{ color: 'var(--c-success)' }}>-{(13.5 - Number(form.marginBaru)).toFixed(2)}%</td></tr>
          <tr><td>Angs. / Bulan (estimasi)</td><td className="mono">{window.fmtRp(r.outstanding / (r.tenor - r.angsuranKe) * 1.1)}</td><td className="mono">{window.fmtRp(Number(form.plafondBaru) / Number(form.tenorBaru) * 1.05)}</td><td className="mono" style={{ color: 'var(--c-success)' }}>-25%</td></tr>
        </tbody>
      </table>

      <div className="btn-bar">
        <button className="btn btn--neutral" onClick={() => onNavigate('/list-pembiayaan')}>Batal</button>
        <button className="btn btn--secondary">Simpan Draft</button>
        <button className="btn btn--primary" onClick={() => setConfirmOpen(true)}>
          <span dangerouslySetInnerHTML={{ __html: Icons.send(16) }} />
          Submit Restruktur
        </button>
      </div>

      {confirmOpen && (
        <ConfirmDialog
          title="Submit Restruktur Pembiayaan"
          message={`Restruktur ${form.skemaRestruktur} untuk rekening ${r.noRek} akan dikirim ke tim Risk Management. Lanjutkan?`}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            showToast({ type: 'success', title: 'Restruktur dikirim', message: `Permohonan restruktur untuk ${r.nama} sedang dievaluasi.` });
            onNavigate('/list-pembiayaan');
          }}
        />
      )}
    </div>
  );
}

Object.assign(window, {
  ListPembiayaanScreen, EditRekeningScreen, RestrukturScreen,
});
