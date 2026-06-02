/* screens-fasilitas-actions.jsx
   Koreksi Limit, Reposisi Cabang, Tutup Fasilitas screens.
   Modeled on Figma 2.1.1.c / 2.1.1.d / 2.1.1.e */

/* Shared hero card */
function FasilitasHero({ fasilitas: f, rightSlot }) {
  return (
    <div className="hl-card">
      <div className="row row--between" style={{ alignItems: 'flex-start' }}>
        <Disp label="No. Fasilitas" value={f.noFasilitas} large mono />
        {rightSlot}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginTop: 16 }}>
        <Disp label="Nama Nasabah" value={`${f.kodeNasabah} - ${f.nama}`} />
        <Disp label="Jenis Fasilitas" value={f.jenis} />
        <Disp label="Kantor cabang" value={f.cabang} />
        <div className="disp">
          <div className="disp__label">Status</div>
          <div><StatusTag status={f.status} /></div>
        </div>
      </div>
    </div>
  );
}

/* Shared read-only "Info Detail Fasilitas" block */
function FasilitasInfoDetail({ fasilitas: f }) {
  return (
    <>
      <h4 className="section-title">Info Detail Fasilitas</h4>
      <FormGrid>
        <Disp label="Targeted eqv Rate" value="-" />
        <Disp label="Penggunaan" value={window.fmtRp(f.plafond)} mono />
        <Disp label="Limit Plafond" value={window.fmtRp(f.plafond)} mono />
        <Disp label="Sisa Plafond" value={window.fmtRp(f.sisa)} mono />
      </FormGrid>

      <hr className="section-divider" />

      <FormGrid>
        <Disp label="Tanggal Buka Fasilitas" value={f.tglBuka} mono />
        <Disp label="Periode Ketersediaan" value="13-Agus-2023" mono />
        <Disp label="Tanggal Akad" value={f.tglBuka} mono />
        <Disp label="Jatuh Tempo" value={f.tglJTempo} mono />
        <Disp label="Akad" value={f.jenis.replace(/^[A-Z] - /, '')} span="full" />
      </FormGrid>

      <hr className="section-divider" />

      <FormGrid>
        <Disp label="No. Addendum" value="13" mono />
        <Disp label="Notaris" value="0015 - Edwarad, SH." />
        <Disp label="Tanggal Addendum" value="13-Agus-2023" mono />
        <Disp label="Rekening Officer" value="TP - Teguh Priyono" />
      </FormGrid>
    </>
  );
}

/* ─────────── Koreksi Limit Fasilitas (Figma 2.1.1.e) ─────────── */
function KoreksiFasilitasScreen({ onNavigate, showToast }) {
  const f = window.MOCK_FASILITAS[0];
  const [form, setForm] = React.useState({
    jenisFasilitas: 'Revolving',
    sifatFasilitas: 'uncommited',
    noAkadFasilitas: '12345678912',
    tanggalAkad: '16-Agus-2023',
    tanggalKelonggaranTarik: '16-Agus-2023',
    tanggalJatuhTempo: '15-Jul-2024',
    nomorAddendum: '',
    tanggalAddendum: '',
    statusBlokir: true,
    accountOfficer: '',
    notaris: '',
    keterangan: '',
  });
  const setField = (k, v) => setForm(s => ({ ...s, [k]: v }));
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [historyOpen, setHistoryOpen] = React.useState(false);

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Koreksi Data Fasilitas
      </h2>

      <FasilitasHero
        fasilitas={f}
        rightSlot={
          <button
            className="btn btn--ghost btn--sm"
            onClick={() => setHistoryOpen(true)}
            style={{ alignSelf: 'flex-start' }}>
            <span dangerouslySetInnerHTML={{ __html: Icons.refresh(14) }} />
            Lihat Riwayat Koreksi
          </button>
        }
      />

      <h4 className="section-title">Detail Fasilitas Saat Ini</h4>
      <FormGrid cols={3}>
        <Disp label="Targeted eqv Rate" value="-" />
        <Disp label="Limit Plafond" value={window.fmtRp(f.plafond)} mono />
        <Disp label="+/- Plafond Fasilitas" value="-" />
        <Disp label="Valuta" value="IDR" />
        <Disp label="Total Fasilitas digunakan" value={window.fmtRp(0)} mono />
        <Disp label="Total Fasilitas tidak digunakan" value={window.fmtRp(f.plafond)} mono />
      </FormGrid>

      <hr className="section-divider" />

      <h4 className="section-title">Form Koreksi Data</h4>
      <FormGrid>
        <Field label="Jenis Fasilitas">
          <Select value={form.jenisFasilitas} onChange={v => setField('jenisFasilitas', v)} options={['Revolving', 'Non Revolving', 'Tetap']} />
        </Field>
        <Field label="Sifat Fasilitas">
          <Select value={form.sifatFasilitas} onChange={v => setField('sifatFasilitas', v)} options={['committed', 'uncommited']} />
        </Field>

        <Field label="No Akad Fasilitas">
          <TextInput value={form.noAkadFasilitas} onChange={v => setField('noAkadFasilitas', v)} />
        </Field>
        <Field label="Tanggal Akad">
          <DateInput value={form.tanggalAkad} onChange={v => setField('tanggalAkad', v)} />
        </Field>

        <Field label="Tanggal Kelonggaran Tarik">
          <DateInput value={form.tanggalKelonggaranTarik} onChange={v => setField('tanggalKelonggaranTarik', v)} />
        </Field>
        <Field label="Tanggal Jatuh Tempo">
          <DateInput value={form.tanggalJatuhTempo} onChange={v => setField('tanggalJatuhTempo', v)} />
        </Field>

        <Field label="Nomor Addendum">
          <TextInput value={form.nomorAddendum} onChange={v => setField('nomorAddendum', v)} placeholder="-" />
        </Field>
        <Field label="Tanggal Addendum">
          <DateInput value={form.tanggalAddendum} onChange={v => setField('tanggalAddendum', v)} placeholder="dd-mmm-yyyy" />
        </Field>
      </FormGrid>

      <label className="cbx" style={{ marginTop: 16 }}>
        <input
          type="checkbox"
          checked={form.statusBlokir}
          onChange={e => setField('statusBlokir', e.target.checked)}
        />
        Status Blokir Fasilitas
      </label>

      <div style={{ marginTop: 16 }}>
        <FormGrid>
          <Field label="Account Officer">
            <LookupInput
              value={form.accountOfficer}
              onChange={v => setField('accountOfficer', v)}
              placeholder="-- Cari --"
            />
          </Field>
          <Field label="Notaris">
            <LookupInput
              value={form.notaris}
              onChange={v => setField('notaris', v)}
              placeholder="-- Cari --"
            />
          </Field>
          <Field label="Keterangan Koreksi" span="full">
            <textarea
              value={form.keterangan}
              onChange={e => setField('keterangan', e.target.value)}
              rows={3}
              placeholder="Alasan dan rincian koreksi data..."
            />
          </Field>
        </FormGrid>
      </div>

      <div className="btn-bar btn-bar--between">
        <button
          className="btn"
          style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }}
          onClick={() => onNavigate('/list-fasilitas')}>
          Batal
        </button>
        <button className="btn btn--primary" onClick={() => setConfirmOpen(true)}>
          <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(14) }} />
          Simpan
        </button>
      </div>

      {confirmOpen && (
        <ConfirmDialog
          title="Konfirmasi Koreksi Fasilitas"
          message={`Data fasilitas ${f.noFasilitas} akan dikoreksi dan dicatat ke riwayat. Lanjutkan?`}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            showToast({ type: 'success', title: 'Koreksi disimpan', message: `Fasilitas ${f.noFasilitas} berhasil dikoreksi.` });
            onNavigate('/list-fasilitas');
          }}
        />
      )}

      {historyOpen && (
        <Modal
          title="Riwayat Koreksi Fasilitas"
          subtitle={f.noFasilitas}
          onClose={() => setHistoryOpen(false)}
          size="lg"
          footer={<button className="btn btn--neutral" onClick={() => setHistoryOpen(false)}>Tutup</button>}
        >
          <table className="tbl">
            <thead>
              <tr><th>Tanggal</th><th>User</th><th>Field</th><th>Sebelum</th><th>Sesudah</th></tr>
            </thead>
            <tbody>
              <tr><td className="mono">16-Agus-2023</td><td className="mono">BCSHQB1025</td><td>Jatuh Tempo</td><td className="mono">13-Jul-2023</td><td className="mono">15-Jul-2024</td></tr>
              <tr><td className="mono">10-Agus-2023</td><td className="mono">BCSHQB109T</td><td>Jenis Fasilitas</td><td>Non Revolving</td><td>Revolving</td></tr>
              <tr><td className="mono">02-Agus-2023</td><td className="mono">BCSHQB109T</td><td>Sifat Fasilitas</td><td>committed</td><td>uncommited</td></tr>
            </tbody>
          </table>
        </Modal>
      )}
    </div>
  );
}

/* ─────────── Reposisi Cabang (Figma 2.1.1.c) ─────────── */
function ReposisiFasilitasScreen({ onNavigate, showToast }) {
  const f = window.MOCK_FASILITAS[0];
  const [form, setForm] = React.useState({
    cabangAsal: f.cabang,
    cabangTujuan: '',
    tanggalEfektif: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-'),
    pejabatPemberi: '',
    pejabatPenerima: '',
    alasanReposisi: '',
    keterangan: '',
  });
  const setField = (k, v) => setForm(s => ({ ...s, [k]: v }));
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Reposisi Cabang Fasilitas
      </h2>

      <FasilitasHero fasilitas={f} />

      <FasilitasInfoDetail fasilitas={f} />

      <hr className="section-divider" />

      <h4 className="section-title">Form Reposisi Cabang</h4>
      <FormGrid>
        <Field label="Cabang Asal">
          <TextInput value={form.cabangAsal} readOnly />
        </Field>
        <Field label="Cabang Tujuan" required>
          <Select
            value={form.cabangTujuan}
            onChange={v => setField('cabangTujuan', v)}
            options={[
              '001 - Kantor Pusat',
              '005 - Bandung Asia Afrika',
              '012 - Kelapa Gading',
              '023 - Surabaya Tunjungan',
              '034 - Yogya Malioboro',
            ].filter(c => !form.cabangAsal.startsWith(c.split(' - ')[0]))}
          />
        </Field>

        <Field label="Tanggal Efektif Reposisi" required>
          <DateInput value={form.tanggalEfektif} onChange={v => setField('tanggalEfektif', v)} />
        </Field>
        <div></div>

        <Field label="Pejabat Pemberi (Cabang Asal)" required>
          <LookupInput
            value={form.pejabatPemberi}
            onChange={v => setField('pejabatPemberi', v)}
            placeholder="-- Cari pejabat --"
          />
        </Field>
        <Field label="Pejabat Penerima (Cabang Tujuan)" required>
          <LookupInput
            value={form.pejabatPenerima}
            onChange={v => setField('pejabatPenerima', v)}
            placeholder="-- Cari pejabat --"
          />
        </Field>

        <Field label="Alasan Reposisi" required>
          <Select
            value={form.alasanReposisi}
            onChange={v => setField('alasanReposisi', v)}
            options={[
              'Permintaan Nasabah',
              'Perubahan Domisili Nasabah',
              'Reorganisasi Cabang',
              'Penggabungan Account Officer',
              'Lain-lain',
            ]}
          />
        </Field>
        <div></div>

        <Field label="Keterangan" span="full">
          <textarea
            value={form.keterangan}
            onChange={e => setField('keterangan', e.target.value)}
            rows={3}
            placeholder="Detail alasan dan dokumen pendukung..."
          />
        </Field>
      </FormGrid>

      <div className="approval-banner" style={{ marginTop: 16 }}>
        <span className="approval-banner__icon" dangerouslySetInnerHTML={{ __html: Icons.warning(20) }} />
        <div className="approval-banner__body">
          Reposisi cabang akan mengalihkan <b>semua rekening pembiayaan</b> di bawah fasilitas ini ke cabang tujuan. Memerlukan persetujuan dari kedua kepala cabang.
        </div>
      </div>

      <div className="btn-bar btn-bar--between">
        <button
          className="btn"
          style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }}
          onClick={() => onNavigate('/list-fasilitas')}>
          Batal
        </button>
        <button className="btn btn--primary" onClick={() => setConfirmOpen(true)}>
          <span dangerouslySetInnerHTML={{ __html: Icons.send(14) }} />
          Submit Reposisi
        </button>
      </div>

      {confirmOpen && (
        <ConfirmDialog
          title="Konfirmasi Reposisi Cabang"
          message={`Fasilitas ${f.noFasilitas} akan direposisi dari ${form.cabangAsal} ke ${form.cabangTujuan}. Lanjutkan?`}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            showToast({ type: 'success', title: 'Reposisi dikirim', message: `Menunggu approval kedua kepala cabang.` });
            onNavigate('/otorisasi');
          }}
        />
      )}
    </div>
  );
}

/* ─────────── Tutup Fasilitas (Figma 2.1.1.d) ─────────── */
function TutupFasilitasScreen({ onNavigate, showToast }) {
  const f = window.MOCK_FASILITAS[0];
  const [keteranganTutup, setKeteranganTutup] = React.useState('Fasilitas sudah tidak digunakan oleh nasabah bersangkutan');
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Tutup Fasilitas
      </h2>

      <FasilitasHero fasilitas={f} />

      <FasilitasInfoDetail fasilitas={f} />

      <hr className="section-divider" />

      <h4 className="section-title">Form Tutup Fasilitas</h4>
      <Field label="Keterangan Tutup" required>
        <div style={{ position: 'relative' }}>
          <textarea
            value={keteranganTutup}
            onChange={e => setKeteranganTutup(e.target.value)}
            rows={3}
            placeholder="Keterangan tutup fasilitas"
          />
        </div>
      </Field>

      <div className="approval-banner" style={{ marginTop: 16, background: 'var(--c-error-bg)', borderLeftColor: 'var(--c-error)' }}>
        <span style={{ color: 'var(--c-error)', flexShrink: 0 }} dangerouslySetInnerHTML={{ __html: Icons.warning(20) }} />
        <div className="approval-banner__body">
          <b>Penutupan fasilitas bersifat permanen.</b> Pastikan semua rekening pembiayaan di bawah fasilitas ini sudah lunas atau dipindahkan ke fasilitas lain.
        </div>
      </div>

      <div className="btn-bar btn-bar--between">
        <button
          className="btn"
          style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }}
          onClick={() => onNavigate('/list-fasilitas')}>
          Batal
        </button>
        <button className="btn btn--primary" onClick={() => setConfirmOpen(true)}>
          <span dangerouslySetInnerHTML={{ __html: Icons.lock(14) }} />
          Tutup Fasilitas
        </button>
      </div>

      {confirmOpen && (
        <ConfirmDialog
          title="Konfirmasi Tutup Fasilitas"
          message={`Fasilitas ${f.noFasilitas} (${f.nama}) akan ditutup permanen. Lanjutkan?`}
          danger
          confirmLabel="Ya, Tutup Fasilitas"
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            showToast({ type: 'warn', title: 'Fasilitas ditutup', message: `${f.noFasilitas} berhasil ditutup.` });
            onNavigate('/list-fasilitas');
          }}
        />
      )}
    </div>
  );
}

Object.assign(window, {
  KoreksiFasilitasScreen, ReposisiFasilitasScreen, TutupFasilitasScreen,
  FasilitasHero, FasilitasInfoDetail,
});
