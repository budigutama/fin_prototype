/* screens-edit-rekening.jsx
   Landing page + form screens untuk menu Edit Rekening.
   Flow: pilih menu → landing page cari rekening → klik Aksi → form spesifik. */

const EDIT_ACTIONS = {
  'data':          { label: 'Ubah Data Rekening',                     formRoute: '/edit/data/form' },
  'kelengkapan':   { label: 'Kelengkapan Data Pembiayaan',            formRoute: '/list-pembiayaan/edit-kelengkapan' },
  'addendum':      { label: 'Addendum Pembiayaan',                    formRoute: '/edit/addendum/form' },
  'restruktur':    { label: 'Restruktur Pembiayaan',                  formRoute: '/edit/restruktur/form' },
  'ulang-jadwal':  { label: 'Ubah Jadwal Angsuran',                   formRoute: '/edit/ulang-jadwal/form' },
  'agunan':        { label: 'Pengikatan Pembiayaan dengan Agunan',    formRoute: '/edit/agunan/form' },
};

/* ─────────── Landing: Cari Rekening untuk Diedit ─────────── */
function EditRekeningLandingScreen({ onNavigate, showToast, mode }) {
  const action = EDIT_ACTIONS[mode] || EDIT_ACTIONS.data;
  const [filter, setFilter] = React.useState({ cif: '', nama: '', noRek: '' });
  const [hasSearched, setHasSearched] = React.useState(false);

  const filtered = React.useMemo(() => {
    if (!hasSearched) return [];
    const q = (s) => (s || '').toLowerCase();
    return window.MOCK_PEMBIAYAAN.filter(r =>
      (!filter.cif || r.noRek.includes(filter.cif)) &&
      (!filter.nama || q(r.nama).includes(q(filter.nama))) &&
      (!filter.noRek || r.noRek.replace(/-/g, '').includes(filter.noRek.replace(/-/g, '')))
    );
  }, [filter, hasSearched]);

  return (
    <div className="card">
      <h2 className="page__title">
        Edit Rekening — {action.label}
        <span className="subtitle">Cari rekening pembiayaan yang akan diedit, lalu klik tombol Aksi pada baris.</span>
      </h2>

      <div className="filter-strip" style={{ marginTop: 24 }}>
        <FormGrid cols={3}>
          <Field label="Nomor CIF">
            <TextInput value={filter.cif} onChange={v => setFilter(f => ({ ...f, cif: v }))} placeholder="cth: 0000002431" />
          </Field>
          <Field label="Nama Nasabah">
            <TextInput value={filter.nama} onChange={v => setFilter(f => ({ ...f, nama: v }))} placeholder="cth: Jacob Jones" />
          </Field>
          <Field label="Nomor Rekening">
            <TextInput value={filter.noRek} onChange={v => setFilter(f => ({ ...f, noRek: v }))} placeholder="cth: 7100-0000-0044" />
          </Field>
        </FormGrid>
        <div className="row" style={{ marginTop: 16, justifyContent: 'flex-end' }}>
          <button className="btn btn--neutral" onClick={() => { setFilter({ cif: '', nama: '', noRek: '' }); setHasSearched(false); }}>
            Reset
          </button>
          <button className="btn btn--primary" onClick={() => setHasSearched(true)}>
            <span dangerouslySetInnerHTML={{ __html: Icons.search(14) }} />
            Cari
          </button>
        </div>
      </div>

      <h4 className="section-title">Hasil Pencarian</h4>
      <DataTable
        showSearch={false}
        showPagination={hasSearched && filtered.length > 10}
        columns={[
          { key: 'noRek', label: 'Nomor Rekening', sort: true, render: r => <span className="mono">{r.noRek}</span> },
          { key: 'cif',   label: 'Nomor CIF', render: r => <span className="mono">{r.noFasilitas}</span> },
          { key: 'nama',  label: 'Nama Nasabah' },
          { key: 'akad',  label: 'Kode Produk', render: r => <span className="tag tag--info">{r.akad}</span> },
          { key: 'outstanding', label: 'Outstanding', align: 'right', render: r => <span className="mono">{window.fmtRp(r.outstanding)}</span> },
          { key: 'cabang', label: 'Cabang', render: r => <span className="text-sm">001 - Kantor Pusat</span> },
        ]}
        data={filtered}
        emptyText={hasSearched
          ? 'Tidak ada rekening yang cocok dengan kriteria pencarian.'
          : 'Masukkan kriteria pencarian lalu klik Cari.'}
        popupItems={[
          { id: 'pilih', label: `Aksi: ${action.label}`, icon: 'edit' },
          { id: 'detail', label: 'Lihat Detail Rekening', icon: 'view' },
        ]}
        onPopupClick={(row, id) => {
          if (id === 'detail') { onNavigate('/list-pembiayaan/detail'); return; }
          if (id === 'pilih') { onNavigate(`${action.formRoute}?rek=${row.noRek}`); return; }
        }}
      />
    </div>
  );
}

/* ─────────── Hero Card (shared) ─────────── */
function EditRekeningHero() {
  return (
    <div className="hl-card">
      <div className="row row--between" style={{ alignItems: 'flex-start' }}>
        <Disp label="No. Rekening Pembiayaan" value="0010502029459" large mono />
        <div className="row gap-16">
          <button className="btn btn--ghost btn--sm">
            <span dangerouslySetInnerHTML={{ __html: Icons.view(14) }} />
            Lihat Detail Info Rekening
          </button>
          <button className="btn btn--ghost btn--sm">
            <span dangerouslySetInnerHTML={{ __html: Icons.calc(14) }} />
            Lihat Jadwal angsuran Saat Ini
          </button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 16 }}>
        <Disp label="Nama Nasabah" value="000002431 - Jacob Jones" />
        <Disp label="Kantor cabang" value="001 - Kantor Pusat" />
        <div className="disp">
          <div className="disp__label">Status</div>
          <div><StatusTag status="Aktif" /></div>
        </div>
        <Disp label="Nomor Fasilitas" value="00000378312" mono />
        <Disp label="Produk" value="Murabahah" />
      </div>
    </div>
  );
}

/* ─────────── Ubah Data Rekening (Figma 2.2.1.t) ─────────── */
function UbahDataRekeningScreen({ onNavigate, showToast }) {
  const [form, setForm] = React.useState({
    cabang: '001 - Kantor Pusat',
    accountOfficer: '1024 - Hilman Trimansyah',
    aoMaintance: '',
    notaris: 'Elok Kurniawati',
    rekeningSumber: '0000000623123 - Heri Tapiheru',
    keterangan: '',
    autoDebitAngsuran: true,
    autoDebitDenda: true,
    namaAlias: 'Pembiayaan Rumah Murabahah',
    jenisDenda: 'Denda 1',
    instansiDeveloper: '',
    statusBlokir: false,
    keteranganUbah: 'Update Officer & Notaris',
  });
  const setField = (k, v) => setForm(s => ({ ...s, [k]: v }));
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Ubah Data Rekening
      </h2>
      <EditRekeningHero />

      <h4 className="section-title">Form Ubah Data Rekening</h4>
      <FormGrid>
        <Field label="Nama Alias Rekening">
          <TextInput value={form.namaAlias} onChange={v => setField('namaAlias', v)} />
        </Field>
        <Field label="Kantor Cabang Pencatat" required>
          <Select value={form.cabang} onChange={v => setField('cabang', v)}
            options={['001 - Kantor Pusat', '005 - Bandung Asia Afrika', '012 - Kelapa Gading', '023 - Surabaya Tunjungan']} />
        </Field>

        <Field label="Account Officer" required>
          <LookupInput value={form.accountOfficer} onChange={v => setField('accountOfficer', v)} />
        </Field>
        <Field label="AO Maintance">
          <LookupInput value={form.aoMaintance} onChange={v => setField('aoMaintance', v)} placeholder="-- Cari --" />
        </Field>

        <Field label="Notaris">
          <LookupInput value={form.notaris} onChange={v => setField('notaris', v)} />
        </Field>
        <Field label="Instansi / Developer">
          <LookupInput value={form.instansiDeveloper} onChange={v => setField('instansiDeveloper', v)} placeholder="-- Cari --" />
        </Field>

        <Field label="Rekening Sumber Pembayaran" required>
          <LookupInput value={form.rekeningSumber} onChange={v => setField('rekeningSumber', v)} />
        </Field>
        <Field label="Jenis Denda" required>
          <Select value={form.jenisDenda} onChange={v => setField('jenisDenda', v)} options={['Denda 1', 'Denda 2', 'Tidak Dikenakan']} />
        </Field>
      </FormGrid>

      <div style={{ display: 'flex', gap: 32, marginTop: 24 }}>
        <label className="cbx">
          <input type="checkbox" checked={form.autoDebitAngsuran} onChange={e => setField('autoDebitAngsuran', e.target.checked)} />
          Auto Debit Angsuran
        </label>
        <label className="cbx">
          <input type="checkbox" checked={form.autoDebitDenda} onChange={e => setField('autoDebitDenda', e.target.checked)} />
          Auto Debit Denda
        </label>
        <label className="cbx">
          <input type="checkbox" checked={form.statusBlokir} onChange={e => setField('statusBlokir', e.target.checked)} />
          Status Blokir Rekening
        </label>
      </div>

      <div style={{ marginTop: 24 }}>
        <Field label="Keterangan Ubah" required>
          <textarea value={form.keteranganUbah} onChange={e => setField('keteranganUbah', e.target.value)} rows={3} placeholder="Alasan dan rincian perubahan..." />
        </Field>
      </div>

      <FormButtonsBar onCancel={() => onNavigate('/edit/data')} onSave={() => setConfirmOpen(true)} />

      {confirmOpen && (
        <ConfirmDialog
          title="Simpan Perubahan Data Rekening"
          message="Perubahan akan dicatat ke riwayat dan masuk antrian otorisasi. Lanjutkan?"
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => { showToast({ type: 'success', title: 'Tersimpan', message: 'Menunggu otorisasi.' }); onNavigate('/edit/data'); }}
        />
      )}
    </div>
  );
}

/* ─────────── Addendum Pembiayaan ─────────── */
function AddendumPembiayaanScreen({ onNavigate, showToast }) {
  const [form, setForm] = React.useState({
    jenisAddendum: 'Perubahan Officer',
    nomorAkadBaru: 'DSK/PMB/0128321-ADD05',
    tanggalAddendum: '24-May-2026',
    plafondBaru: '200000000',
    tenorBaru: '36',
    marginBaru: '15.5',
    keterangan: '',
  });
  const setField = (k, v) => setForm(s => ({ ...s, [k]: v }));
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Addendum Pembiayaan
      </h2>
      <EditRekeningHero />

      <div className="approval-banner">
        <span className="approval-banner__icon" dangerouslySetInnerHTML={{ __html: Icons.warning(20) }} />
        <div className="approval-banner__body">
          <b>Perhatian:</b> Addendum membutuhkan persetujuan maker-checker. Setelah submit, rekening akan dikunci hingga disetujui Approver.
        </div>
      </div>

      <h4 className="section-title">Detail Addendum</h4>
      <FormGrid>
        <Field label="Jenis Addendum" required>
          <Select value={form.jenisAddendum} onChange={v => setField('jenisAddendum', v)}
            options={['Perpanjangan Tenor', 'Penambahan Plafond', 'Pengurangan Plafond', 'Perubahan Margin', 'Perubahan Officer', 'Perubahan Pricing Model']} />
        </Field>
        <Field label="Nomor Akad Addendum" required>
          <TextInput value={form.nomorAkadBaru} onChange={v => setField('nomorAkadBaru', v)} />
        </Field>
        <Field label="Tanggal Addendum" required>
          <DateInput value={form.tanggalAddendum} onChange={v => setField('tanggalAddendum', v)} />
        </Field>
        <Field label="No. Akad Lama"><TextInput value="DSK/PMB/0128321" readOnly /></Field>
      </FormGrid>

      <h4 className="section-title">Perubahan Nilai</h4>
      <FormGrid>
        <Field label="Plafond Lama"><CurrencyInput value="200000000" readOnly /></Field>
        <Field label="Plafond Baru" required><CurrencyInput value={form.plafondBaru} onChange={v => setField('plafondBaru', v)} /></Field>
        <Field label="Tenor Lama"><NumberInput value="144" readOnly suffix="Bulan" /></Field>
        <Field label="Tenor Baru" required><NumberInput value={form.tenorBaru} onChange={v => setField('tenorBaru', v)} suffix="Bulan" /></Field>
        <Field label="Margin Lama"><NumberInput value="15.5" readOnly suffix="%" /></Field>
        <Field label="Margin Baru" required><NumberInput value={form.marginBaru} onChange={v => setField('marginBaru', v)} suffix="%" /></Field>
      </FormGrid>

      <h4 className="section-title">Justifikasi</h4>
      <Field label="Alasan / Justifikasi Addendum" required>
        <textarea value={form.keterangan} onChange={e => setField('keterangan', e.target.value)} rows={4}
          placeholder="Jelaskan alasan perubahan, kondisi nasabah, dan dokumen pendukung..." />
      </Field>

      <FormButtonsBar onCancel={() => onNavigate('/edit/addendum')} onSave={() => setConfirmOpen(true)} saveLabel="Submit Addendum" />

      {confirmOpen && (
        <ConfirmDialog
          title="Submit Addendum Pembiayaan"
          message={`Addendum ${form.jenisAddendum} akan dikirim ke Approver. Lanjutkan?`}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => { showToast({ type: 'success', title: 'Addendum dikirim', message: 'Menunggu otorisasi.' }); onNavigate('/edit/addendum'); }}
        />
      )}
    </div>
  );
}

/* ─────────── Restruktur Pembiayaan (Figma 2.2.1.v — Section tabs) ─────────── */
function RestrukturFormScreen({ onNavigate, showToast }) {
  const [section, setSection] = React.useState('s1');
  const [form, setForm] = React.useState({
    tanggalRestruktur: '13 Juli 2023',
    kodeValuta: 'IDR',
    noRefPersetujuan: '0931231231',
    caraRestruktur: '',
    jenisRestruktur: '',
    kolektibilitasManual: 'Lancar/L',
    tanggalCicilanBerikutnya: '16-Agus-2023',
    tanggalMulaiAngsuranBaru: '16-Agus-2023',
    cicilanSudahLunas: '7',
    cicilanBelumLunas: '5',
    outstandingPiutang: '90000000',
    sisaPokok: '80000000',
    jenisUbahJadwal: 'Jadwal Existing',
    tenorSebelumnya: '7',
    tenorBaru: '7',
    jenisMargin: 'Presentase',
    targetEkvRate: '15.5',
    pendapatanAtribusi: '0',
    biayaAtribusi: '0',
    pricingModel: 'Efektif',
    rateMukasah: '0.00',
    periodeMukasah: '0',
    maksimumDPDMukasah: '7',
    keterangan: 'Pencairan murabahah Ardhiyanto / Rina',
    metodeJadwal: 'generate',
    uploadFileJadwal: null,
  });
  const setField = (k, v) => setForm(s => ({ ...s, [k]: v }));
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Restruktur Pembiayaan – Murabahah
      </h2>
      <EditRekeningHero />

      <SectionTabs value={section} onChange={setSection} tabs={[
        { id: 's1', label: 'Form Pencairan' },
        { id: 's2', label: 'Jadwal Angsuran Baru' },
      ]} />

      {section === 's1' && (
        <>
          <FormGrid>
            <Field label="Tanggal Restruktur" required>
              <DateInput value={form.tanggalRestruktur} onChange={v => setField('tanggalRestruktur', v)} />
            </Field>
            <Field label="Kode Valuta" required>
              <TextInput value={form.kodeValuta} readOnly />
            </Field>

            <Field label="No Ref Persetujuan" required span="full">
              <div style={{ maxWidth: 'calc(50% - 12px)' }}>
                <TextInput value={form.noRefPersetujuan} onChange={v => setField('noRefPersetujuan', v)} />
              </div>
            </Field>

            <Field label="Cara Restruktur" required>
              <Select value={form.caraRestruktur} onChange={v => setField('caraRestruktur', v)}
                options={['Perpanjangan Tenor', 'Pengurangan Margin', 'Penundaan Pembayaran', 'Konversi Akad']} placeholder="-- Pilih --" />
            </Field>
            <Field label="Jenis Restruktur" required>
              <Select value={form.jenisRestruktur} onChange={v => setField('jenisRestruktur', v)}
                options={['Restruktur Reguler', 'Restruktur Darurat', 'Restruktur Hapus Buku']} placeholder="-- Pilih --" />
            </Field>

            <Field label="Kolektibilitas Manual" required span="full">
              <div style={{ maxWidth: 'calc(50% - 12px)' }}>
                <Select value={form.kolektibilitasManual} onChange={v => setField('kolektibilitasManual', v)}
                  options={['Lancar/L', 'Dalam Perhatian Khusus/DPK', 'Kurang Lancar/KL', 'Diragukan/D', 'Macet/M']} />
              </div>
            </Field>

            <Field label="Tanggal Cicilan Berikutnya" required>
              <DateInput value={form.tanggalCicilanBerikutnya} onChange={v => setField('tanggalCicilanBerikutnya', v)} />
            </Field>
            <Field label="Tanggal Mulai Angsuran Baru" required>
              <DateInput value={form.tanggalMulaiAngsuranBaru} onChange={v => setField('tanggalMulaiAngsuranBaru', v)} />
            </Field>

            <Field label="Cicilan Sudah Lunas" required>
              <NumberInput value={form.cicilanSudahLunas} onChange={v => setField('cicilanSudahLunas', v)} suffix="Bulan" />
            </Field>
            <Field label="Cicilan Belum Lunas" required>
              <NumberInput value={form.cicilanBelumLunas} onChange={v => setField('cicilanBelumLunas', v)} suffix="Bulan" />
            </Field>

            <Field label="Outstanding Piutang" required>
              <CurrencyInput value={form.outstandingPiutang} readOnly />
            </Field>
            <Field label="Sisa Pokok" required>
              <CurrencyInput value={form.sisaPokok} readOnly />
            </Field>

            <Field label="Jenis Ubah Jadwal" required span="full">
              <div style={{ maxWidth: 'calc(50% - 12px)' }}>
                <Select value={form.jenisUbahJadwal} onChange={v => setField('jenisUbahJadwal', v)}
                  options={['Jadwal Existing', 'Re-Calculate Jadwal', 'Upload Jadwal Manual']} />
              </div>
            </Field>

            <Field label="Tenor Sebelumnya" required>
              <NumberInput value={form.tenorSebelumnya} readOnly suffix="Bulan" />
            </Field>
            <Field label="Tenor Baru" required>
              <NumberInput value={form.tenorBaru} onChange={v => setField('tenorBaru', v)} suffix="Bulan" />
            </Field>

            <Field label="Jenis Margin" required>
              <Select value={form.jenisMargin} onChange={v => setField('jenisMargin', v)} options={['Presentase', 'Nominal Tetap']} />
            </Field>
            <Field label="Traget Ekv Rate" required>
              <NumberInput value={form.targetEkvRate} onChange={v => setField('targetEkvRate', v)} suffix="%" />
            </Field>

            <Field label="Pendapatan Atribusi" required>
              <CurrencyInput value={form.pendapatanAtribusi} onChange={v => setField('pendapatanAtribusi', v)} />
            </Field>
            <Field label="Biaya Atribusi" required>
              <CurrencyInput value={form.biayaAtribusi} onChange={v => setField('biayaAtribusi', v)} />
            </Field>

            <Field label="Pricing Model" required span="full">
              <div style={{ maxWidth: 'calc(50% - 12px)' }}>
                <Select value={form.pricingModel} onChange={v => setField('pricingModel', v)} options={['Efektif', 'Anuitas', 'Flat']} />
              </div>
            </Field>

            <Field label="Rate Mukasah" required>
              <NumberInput value={form.rateMukasah} onChange={v => setField('rateMukasah', v)} />
            </Field>
            <Field label="Periode Mukasah">
              <NumberInput value={form.periodeMukasah} onChange={v => setField('periodeMukasah', v)} />
            </Field>

            <Field label="Maksimum DPD Mukasah" span="full">
              <div style={{ maxWidth: 'calc(50% - 12px)' }}>
                <NumberInput value={form.maksimumDPDMukasah} onChange={v => setField('maksimumDPDMukasah', v)} suffix="Hari" />
              </div>
            </Field>

            <Field label="Keterangan" span="full">
              <div style={{ maxWidth: 'calc(50% - 12px)' }}>
                <TextInput value={form.keterangan} onChange={v => setField('keterangan', v)} />
              </div>
            </Field>
          </FormGrid>

          <hr className="section-divider" />

          <h4 className="section-title" style={{ marginTop: 0 }}>Buat Jadwal Angsuran Baru</h4>
          <div style={{ display: 'flex', gap: 12 }}>
            <RadioOption label="Generate Jadwal" checked={form.metodeJadwal === 'generate'} onClick={() => setField('metodeJadwal', 'generate')} />
            <RadioOption label="Upload File" checked={form.metodeJadwal === 'upload'} onClick={() => setField('metodeJadwal', 'upload')} />
          </div>

          <div className="btn-bar btn-bar--between">
            <button className="btn" style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }} onClick={() => onNavigate('/edit/restruktur')}>Batal</button>
            <button className="btn btn--primary" onClick={() => setSection('s2')}>Selanjutnya</button>
          </div>
        </>
      )}

      {section === 's2' && (
        <>
          <h4 className="section-title" style={{ marginTop: 0 }}>Preview Jadwal Angsuran Baru</h4>
          <JadwalAngsuranTable
            nominal={Number(form.sisaPokok)}
            tenor={Number(form.tenorBaru)}
            rate={Number(form.targetEkvRate)}
            mulai={form.tanggalMulaiAngsuranBaru}
          />
          <div className="btn-bar btn-bar--between">
            <button className="btn btn--secondary" onClick={() => setSection('s1')}>Sebelumnya</button>
            <button className="btn btn--primary" onClick={() => setConfirmOpen(true)}>
              <span dangerouslySetInnerHTML={{ __html: Icons.send(14) }} />
              Submit Restruktur
            </button>
          </div>
        </>
      )}

      {confirmOpen && (
        <ConfirmDialog
          title="Submit Restruktur Pembiayaan"
          message="Permohonan restruktur akan dikirim ke tim Risk Management. Lanjutkan?"
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => { showToast({ type: 'success', title: 'Restruktur dikirim', message: 'Sedang dievaluasi.' }); onNavigate('/edit/restruktur'); }}
        />
      )}
    </div>
  );
}

/* ─────────── Ubah Jadwal Angsuran (Figma UDaftar221) ─────────── */
function UbahJadwalAngsuranFormScreen({ onNavigate, showToast }) {
  const [section, setSection] = React.useState('s1');
  const [form, setForm] = React.useState({
    tanggalReschedule: '13 Juli 2023',
    kodeValuta: 'IDR',
    noRefPersetujuan: '0931231231',
    tanggalCicilanBerikutnya: '16-Agus-2023',
    tanggalMulaiAngsuranBaru: '16-Agus-2023',
    cicilanSudahLunas: '7',
    cicilanBelumLunas: '5',
    outstandingPiutang: '90000000',
    sisaPokok: '80000000',
    jenisUbahJadwal: 'Re-Calculate Jadwal',
    tenorSebelumnya: '7',
    tenorBaru: '5',
    targetEkvRate: '15.5',
    pricingModel: 'Efektif',
    rateMukasah: '0.00',
    periodeMukasah: '0',
    maksimumDPDMukasah: '7',
    keterangan: 'Ubah Jadwal murabahah Ardhiyanto / Rina',
    metodeJadwal: 'generate',
  });
  const setField = (k, v) => setForm(s => ({ ...s, [k]: v }));
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Ubah Jadwal Angsuran – Murabahah
      </h2>
      <EditRekeningHero />

      <SectionTabs value={section} onChange={setSection} tabs={[
        { id: 's1', label: 'Form Pencairan' },
        { id: 's2', label: 'Jadwal Angsuran Baru' },
      ]} />

      {section === 's1' && (
        <>
          <FormGrid>
            <Field label="Tanggal Reschedule" required>
              <DateInput value={form.tanggalReschedule} onChange={v => setField('tanggalReschedule', v)} />
            </Field>
            <Field label="Kode Valuta" required>
              <TextInput value={form.kodeValuta} readOnly />
            </Field>

            <Field label="No Ref Persetujuan" required span="full">
              <div style={{ maxWidth: 'calc(50% - 12px)' }}>
                <TextInput value={form.noRefPersetujuan} onChange={v => setField('noRefPersetujuan', v)} />
              </div>
            </Field>

            <Field label="Tanggal Cicilan Berikutnya" required>
              <DateInput value={form.tanggalCicilanBerikutnya} onChange={v => setField('tanggalCicilanBerikutnya', v)} />
            </Field>
            <Field label="Tanggal Mulai Angsuran Baru" required>
              <DateInput value={form.tanggalMulaiAngsuranBaru} onChange={v => setField('tanggalMulaiAngsuranBaru', v)} />
            </Field>

            <Field label="Cicilan Sudah Lunas" required>
              <NumberInput value={form.cicilanSudahLunas} onChange={v => setField('cicilanSudahLunas', v)} suffix="Bulan" />
            </Field>
            <Field label="Cicilan Belum Lunas" required>
              <NumberInput value={form.cicilanBelumLunas} onChange={v => setField('cicilanBelumLunas', v)} suffix="Bulan" />
            </Field>

            <Field label="Outstanding Piutang" required>
              <CurrencyInput value={form.outstandingPiutang} readOnly />
            </Field>
            <Field label="Sisa Pokok" required>
              <CurrencyInput value={form.sisaPokok} readOnly />
            </Field>

            <Field label="Jenis Ubah Jadwal" required span="full">
              <div style={{ maxWidth: 'calc(50% - 12px)' }}>
                <Select value={form.jenisUbahJadwal} onChange={v => setField('jenisUbahJadwal', v)}
                  options={['Jadwal Existing', 'Re-Calculate Jadwal', 'Upload Jadwal Manual']} />
              </div>
            </Field>

            <Field label="Tenor Sebelumnya" required>
              <NumberInput value={form.tenorSebelumnya} readOnly suffix="Bulan" />
            </Field>
            <Field label="Tenor Baru" required>
              <NumberInput value={form.tenorBaru} onChange={v => setField('tenorBaru', v)} suffix="Bulan" />
            </Field>

            <Field label="Traget Ekv Rate" required span="full">
              <div style={{ maxWidth: 'calc(50% - 12px)' }}>
                <NumberInput value={form.targetEkvRate} onChange={v => setField('targetEkvRate', v)} suffix="%" />
              </div>
            </Field>

            <Field label="Pricing Model" required span="full">
              <div style={{ maxWidth: 'calc(50% - 12px)' }}>
                <Select value={form.pricingModel} onChange={v => setField('pricingModel', v)} options={['Efektif', 'Anuitas', 'Flat']} />
              </div>
            </Field>

            <Field label="Rate Mukasah" required>
              <NumberInput value={form.rateMukasah} onChange={v => setField('rateMukasah', v)} />
            </Field>
            <Field label="Periode Mukasah">
              <NumberInput value={form.periodeMukasah} onChange={v => setField('periodeMukasah', v)} />
            </Field>

            <Field label="Maksimum DPD Mukasah" span="full">
              <div style={{ maxWidth: 'calc(50% - 12px)' }}>
                <NumberInput value={form.maksimumDPDMukasah} onChange={v => setField('maksimumDPDMukasah', v)} suffix="Hari" />
              </div>
            </Field>

            <Field label="Keterangan" span="full">
              <div style={{ maxWidth: 'calc(50% - 12px)' }}>
                <TextInput value={form.keterangan} onChange={v => setField('keterangan', v)} />
              </div>
            </Field>
          </FormGrid>

          <hr className="section-divider" />

          <h4 className="section-title" style={{ marginTop: 0 }}>Buat Jadwal Angsuran Baru</h4>
          <div style={{ display: 'flex', gap: 12 }}>
            <RadioOption label="Generate Jadwal" checked={form.metodeJadwal === 'generate'} onClick={() => setField('metodeJadwal', 'generate')} />
            <RadioOption label="Upload File" checked={form.metodeJadwal === 'upload'} onClick={() => setField('metodeJadwal', 'upload')} />
          </div>

          <div className="btn-bar btn-bar--between">
            <button className="btn" style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }} onClick={() => onNavigate('/edit/ulang-jadwal')}>Batal</button>
            <button className="btn btn--primary" onClick={() => setSection('s2')}>Selanjutnya</button>
          </div>
        </>
      )}

      {section === 's2' && (
        <>
          <h4 className="section-title" style={{ marginTop: 0 }}>Preview Jadwal Angsuran Baru</h4>
          <JadwalAngsuranTable
            nominal={Number(form.sisaPokok)}
            tenor={Number(form.tenorBaru)}
            rate={Number(form.targetEkvRate)}
            mulai={form.tanggalMulaiAngsuranBaru}
          />
          <div className="btn-bar btn-bar--between">
            <button className="btn btn--secondary" onClick={() => setSection('s1')}>Sebelumnya</button>
            <button className="btn btn--primary" onClick={() => setConfirmOpen(true)}>
              <span dangerouslySetInnerHTML={{ __html: Icons.send(14) }} />
              Submit Ubah Jadwal
            </button>
          </div>
        </>
      )}

      {confirmOpen && (
        <ConfirmDialog
          title="Submit Ubah Jadwal Angsuran"
          message="Perubahan jadwal akan dicatat dan masuk antrian otorisasi. Lanjutkan?"
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => { showToast({ type: 'success', title: 'Jadwal baru tersimpan' }); onNavigate('/edit/ulang-jadwal'); }}
        />
      )}
    </div>
  );
}

/* ─────────── Pengikatan Pembiayaan dengan Agunan (Figma 2.2.1.e — Link Agunan) ─────────── */
function PengikatanAgunanScreen({ onNavigate, showToast }) {
  const [linked, setLinked] = React.useState([
    { noJaminan: '0000000001', jenis: 'Properti Individu', nilai: 850000000, pengikatan: 'Hak Tanggungan', porsi: '100', tglIkat: '15-Agus-2023' },
  ]);
  const [linkModalOpen, setLinkModalOpen] = React.useState(false);
  const [editingLink, setEditingLink] = React.useState(null);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Pengikatan Pembiayaan dengan Agunan
      </h2>
      <EditRekeningHero />

      <div className="row row--between mb-16" style={{ marginTop: 24 }}>
        <h4 className="section-title" style={{ margin: 0 }}>Daftar Agunan Terikat</h4>
        <button className="btn btn--primary btn--sm" onClick={() => { setEditingLink(null); setLinkModalOpen(true); }}>
          <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
          Tambah Agunan
        </button>
      </div>

      <DataTable
        showSearch={false}
        showPagination={false}
        columns={[
          { key: 'noJaminan',  label: 'No. Jaminan', render: r => <span className="mono">{r.noJaminan}</span> },
          { key: 'jenis',      label: 'Jenis Agunan' },
          { key: 'nilai',      label: 'Nilai Appraisal', align: 'right', render: r => <span className="mono">{window.fmtRp(r.nilai)}</span> },
          { key: 'pengikatan', label: 'Pengikatan' },
          { key: 'porsi',      label: 'Porsi (%)', align: 'right', render: r => <span className="mono">{r.porsi}%</span> },
          { key: 'tglIkat',    label: 'Tanggal Ikat', render: r => <span className="mono">{r.tglIkat}</span> },
        ]}
        data={linked}
        popupItems={[
          { id: 'edit',  label: 'Edit Pengikatan', icon: 'edit' },
          { id: 'hapus', label: 'Lepas Pengikatan', icon: 'trash', danger: true },
        ]}
        onPopupClick={(row, id) => {
          if (id === 'hapus') {
            setLinked(linked.filter(x => x !== row));
            showToast({ type: 'warn', title: 'Agunan dilepas', message: row.noJaminan });
          } else if (id === 'edit') {
            const idx = linked.indexOf(row);
            setEditingLink({ ...row, _idx: idx });
            setLinkModalOpen(true);
          }
        }}
        emptyText="Belum ada agunan terikat. Klik Tambah Agunan."
      />

      <div className="stats" style={{ marginTop: 24 }}>
        <div className="stat">
          <div className="stat__label">Total Nilai Agunan</div>
          <div className="stat__value">{window.fmtRpShort(linked.reduce((s, l) => s + l.nilai, 0))}</div>
        </div>
        <div className="stat">
          <div className="stat__label">Total Plafond</div>
          <div className="stat__value">{window.fmtRpShort(200000000)}</div>
        </div>
        <div className="stat">
          <div className="stat__label">Coverage Ratio</div>
          <div className="stat__value stat__value--pos">
            {linked.reduce((s, l) => s + l.nilai, 0) > 0
              ? ((linked.reduce((s, l) => s + l.nilai, 0) / 200000000) * 100).toFixed(0) + '%'
              : '0%'}
          </div>
        </div>
        <div className="stat">
          <div className="stat__label">LTV Ratio</div>
          <div className="stat__value stat__value--pos">
            {linked.reduce((s, l) => s + l.nilai, 0) > 0
              ? ((200000000 / linked.reduce((s, l) => s + l.nilai, 0)) * 100).toFixed(1) + '%'
              : '-'}
          </div>
        </div>
      </div>

      <FormButtonsBar onCancel={() => onNavigate('/edit/agunan')} onSave={() => setConfirmOpen(true)} saveLabel="Simpan Pengikatan" />

      {linkModalOpen && (
        <LinkAgunanFormModal
          initial={editingLink}
          existingNoJaminan={linked.map(l => l.noJaminan)}
          onClose={() => setLinkModalOpen(false)}
          onSave={(data) => {
            if (editingLink && editingLink._idx != null) {
              const arr = [...linked];
              arr[editingLink._idx] = data;
              setLinked(arr);
            } else {
              setLinked([...linked, data]);
            }
            setLinkModalOpen(false);
            showToast({ type: 'success', title: 'Pengikatan tersimpan', message: data.noJaminan });
          }}
        />
      )}

      {confirmOpen && (
        <ConfirmDialog
          title="Simpan Pengikatan Agunan"
          message="Pengikatan agunan akan disimpan dan menjadi referensi rekening pembiayaan. Lanjutkan?"
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => { showToast({ type: 'success', title: 'Pengikatan tersimpan' }); onNavigate('/edit/agunan'); }}
        />
      )}
    </div>
  );
}

/* ─────────── Link Agunan Form Modal (Figma 2.2.1.e) ─────────── */
function LinkAgunanFormModal({ initial, existingNoJaminan, onClose, onSave }) {
  const [form, setForm] = React.useState(initial || {
    noJaminan: '',
    namaPemilik: '',
    jenis: '',
    nilai: 0,
    pengikatan: 'Hak Tanggungan',
    jenisPengikatan: 'Sempurna',
    noAkta: '',
    tglAkta: '24-May-2026',
    notaris: '',
    nilaiPengikatan: '',
    porsi: '100',
    tglIkat: '24-May-2026',
    tglJatuhTempoIkat: '',
    lokasiAgunan: '',
    keterangan: '',
  });
  const [agunanLookupOpen, setAgunanLookupOpen] = React.useState(false);
  const setField = (k, v) => setForm(s => ({ ...s, [k]: v }));

  return (
    <>
      <Modal
        title={initial ? 'Edit Pengikatan Agunan' : 'Tambah Pengikatan Agunan'}
        subtitle="Pilih agunan, lalu lengkapi detail pengikatan."
        size="lg"
        onClose={onClose}
        footer={
          <>
            <button className="btn btn--neutral" onClick={onClose}>Batal</button>
            <button className="btn btn--primary" onClick={() => onSave(form)} disabled={!form.noJaminan}>
              <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(14) }} />
              Simpan
            </button>
          </>
        }
      >
        <h4 className="section-title" style={{ marginTop: 0 }}>Pilih Agunan</h4>
        <Field label="No. Jaminan" required>
          <LookupInput
            value={form.noJaminan ? `${form.noJaminan} — ${form.namaPemilik}` : ''}
            placeholder="-- Cari agunan tersedia --"
            onOpen={() => setAgunanLookupOpen(true)}
          />
        </Field>

        {form.noJaminan && (
          <>
            <div className="hl-card" style={{ marginTop: 16 }}>
              <FormGrid cols={3}>
                <Disp label="No. Jaminan" value={form.noJaminan} mono />
                <Disp label="Pemilik" value={form.namaPemilik} />
                <Disp label="Jenis" value={form.jenis} />
                <Disp label="Nilai Appraisal" value={window.fmtRp(form.nilai)} mono />
              </FormGrid>
            </div>

            <h4 className="section-title">Detail Pengikatan</h4>
            <FormGrid>
              <Field label="Jenis Pengikatan" required>
                <Select value={form.pengikatan} onChange={v => setField('pengikatan', v)}
                  options={['Hak Tanggungan', 'Fidusia', 'Gadai', 'Cessie', 'Personal Guarantee', 'Corporate Guarantee']} />
              </Field>
              <Field label="Sifat Pengikatan" required>
                <Select value={form.jenisPengikatan} onChange={v => setField('jenisPengikatan', v)} options={['Sempurna', 'Tidak Sempurna']} />
              </Field>

              <Field label="No. Akta" required>
                <TextInput value={form.noAkta} onChange={v => setField('noAkta', v)} placeholder="cth: APHT/0123/2026" />
              </Field>
              <Field label="Tanggal Akta" required>
                <DateInput value={form.tglAkta} onChange={v => setField('tglAkta', v)} />
              </Field>

              <Field label="Notaris / PPAT" required span="full">
                <LookupInput value={form.notaris} onChange={v => setField('notaris', v)} placeholder="-- Cari notaris --" />
              </Field>

              <Field label="Nilai Pengikatan" required>
                <CurrencyInput value={form.nilaiPengikatan} onChange={v => setField('nilaiPengikatan', v)} />
              </Field>
              <Field label="Porsi Pengikatan (%)" required hint="Persentase nilai agunan yang diikat untuk pembiayaan ini">
                <NumberInput value={form.porsi} onChange={v => setField('porsi', v)} suffix="%" />
              </Field>

              <Field label="Tanggal Ikat" required>
                <DateInput value={form.tglIkat} onChange={v => setField('tglIkat', v)} />
              </Field>
              <Field label="Tanggal Jatuh Tempo Pengikatan">
                <DateInput value={form.tglJatuhTempoIkat} onChange={v => setField('tglJatuhTempoIkat', v)} placeholder="dd-mmm-yyyy" />
              </Field>

              <Field label="Lokasi Penyimpanan Dokumen" span="full">
                <Select value={form.lokasiAgunan} onChange={v => setField('lokasiAgunan', v)}
                  options={['Brankas Kantor Pusat', 'Brankas Cabang Pencatat', 'Custodian Bank', 'Notaris']} placeholder="-- Pilih --" />
              </Field>

              <Field label="Keterangan" span="full">
                <textarea value={form.keterangan} onChange={e => setField('keterangan', e.target.value)} rows={2}
                  placeholder="Catatan tambahan pengikatan..." />
              </Field>
            </FormGrid>
          </>
        )}
      </Modal>

      {agunanLookupOpen && (
        <Modal
          title="Pilih Agunan"
          subtitle="Hanya agunan dengan status Aktif/Diikat tersedia"
          size="lg"
          onClose={() => setAgunanLookupOpen(false)}
          footer={<button className="btn btn--neutral" onClick={() => setAgunanLookupOpen(false)}>Batal</button>}
        >
          <table className="tbl">
            <thead><tr><th>No. Jaminan</th><th>Pemilik</th><th>Jenis</th><th className="text-right">Nilai</th><th>Status</th></tr></thead>
            <tbody>
              {window.MOCK_JAMINAN.filter(j => !existingNoJaminan.includes(j.noJaminan) && j.status !== 'Release').map(j => (
                <tr key={j.noJaminan} className="tbl-row--clickable" onClick={() => {
                  setForm(s => ({
                    ...s,
                    noJaminan: j.noJaminan,
                    namaPemilik: j.nama,
                    jenis: j.jenis,
                    nilai: j.nilai,
                    nilaiPengikatan: String(j.nilai),
                  }));
                  setAgunanLookupOpen(false);
                }}>
                  <td className="mono">{j.noJaminan}</td>
                  <td>{j.nama}</td>
                  <td>{j.jenis}</td>
                  <td className="mono text-right">{window.fmtRp(j.nilai)}</td>
                  <td><StatusTag status={j.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal>
      )}
    </>
  );
}

/* ─────────── Shared form button bar ─────────── */
function FormButtonsBar({ onCancel, onSave, saveLabel = 'Simpan Perubahan' }) {
  return (
    <div className="btn-bar btn-bar--between">
      <button className="btn" style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }} onClick={onCancel}>
        Batal
      </button>
      <div className="row gap-12">
        <button className="btn btn--secondary">Simpan Draft</button>
        <button className="btn btn--primary" onClick={onSave}>
          <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(14) }} />
          {saveLabel}
        </button>
      </div>
    </div>
  );
}

Object.assign(window, {
  EditRekeningLandingScreen,
  UbahDataRekeningScreen,
  AddendumPembiayaanScreen,
  RestrukturFormScreen,
  UbahJadwalAngsuranFormScreen,
  PengikatanAgunanScreen,
});
