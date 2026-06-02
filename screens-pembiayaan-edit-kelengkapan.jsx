/* screens-pembiayaan-edit-kelengkapan.jsx
   Edit Kelengkapan Data — opened from Detail Rekening "Edit Kelengkapan Data" button.
   Reuses RegPembS3 (Section 3 of Registrasi Pembiayaan) which contains
   both Kelengkapan Data Nasabah + Kelengkapan Data Rekening. */

function EditKelengkapanDataScreen({ onNavigate, showToast }) {
  // Hero card data — mirrors Detail Pembiayaan
  const hero = {
    noRekening: '0010502029459',
    namaNasabah: '000002431 - Jacob Jones',
    kantorCabang: '001 - Kantor Pusat',
    status: 'Aktif',
    nomorFasilitas: '00000378312',
    produk: 'Murabahah',
  };

  // Pre-filled form state — same shape as Registrasi Pembiayaan section 3
  const [form, setForm] = React.useState({
    nomorNasabah: '0000000623123 - Heri Tapiheru',
    statusKeterkaitanCIF: '',
    hubunganBank: '',
    melanggarBMPK: 'tidak',
    melampauiBMPK: 'tidak',
    goPublic: '',
    lembagaPemeringkat: "10 - Moody's",
    peringkatDebitur: '90',
    tanggalPemeringkatan: '10-Jan-2026',
    golonganDebitur: '',
    statusSID: '',
    dati2Nasabah: '0118 - Kab Indramayu',
    nomorIdPasangan: '903122183132',
    namaPasangan: 'Yasmina',
    tanggalLahirPasangan: '12-Mei-1994',
    perjanjianPisahHarta: '',
    jenisPenggunaan: '3 - Konsumsi',
    jenisPiutang: 'P99 - Pembiayaan Lain Yang Diberikan',
    orientasiPenggunaan: '3 - Lainnya',
    lokasiProyeksi: '0191 - Kota Bandung',
    sifatPiutang: '1 - Kredit/Pembiayaan yang direstrukturisasi',
    omset: '166654000',
    kategoriUsaha: '99 - Bukan Debitur Usaha Mikro, Kecil, dan Menengah',
    sektorEkonomi: '001120 - Rumah Tangga Untuk Pemilikan Rumah',
    kategoriPortofolio: '39 - Kredit Beragun Rumah Tinggal - 70%',
    takeOverDari: '',
    plafondParipasu: '0',
    kategoriNasabah: '09 - Perorangan Konsumtif',
    kategoriProduk: '01 - PPR Pembelian Rumah Siap Huni (Ready Stock)',
    segmentPembiayaan: '9 - Segmen 1',
    caraRestruktur: '',
    bookingOffice: '',
    sebabMacet: '',
    kbli: '',
    kategoriTHI: '',
  });
  const setField = (k, v) => setForm(s => ({ ...s, [k]: v }));
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Edit Kelengkapan Data
      </h2>

      <div className="hl-card">
        <Disp label="No. Rekening Pembiayaan" value={hero.noRekening} large mono />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 16 }}>
          <Disp label="Nama Nasabah" value={hero.namaNasabah} />
          <Disp label="Kantor cabang" value={hero.kantorCabang} />
          <div className="disp">
            <div className="disp__label">Status</div>
            <div><StatusTag status={hero.status} /></div>
          </div>
          <Disp label="Nomor Fasilitas" value={hero.nomorFasilitas} mono />
          <Disp label="Produk" value={hero.produk} />
        </div>
      </div>

      {/* Re-use RegPembS3 — passes a no-op for nav buttons by overriding */}
      <KelengkapanDataForm form={form} setField={setField} />

      <div className="btn-bar btn-bar--between">
        <button
          className="btn"
          style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }}
          onClick={() => onNavigate('/list-pembiayaan/detail')}>
          Batal
        </button>
        <div className="row gap-12">
          <button className="btn btn--secondary">Simpan Draft</button>
          <button className="btn btn--primary" onClick={() => setConfirmOpen(true)}>
            <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(14) }} />
            Simpan Perubahan
          </button>
        </div>
      </div>

      {confirmOpen && (
        <ConfirmDialog
          title="Simpan Kelengkapan Data"
          message={`Perubahan kelengkapan data rekening ${hero.noRekening} akan disimpan dan masuk antrian otorisasi. Lanjutkan?`}
          confirmLabel="Ya, Simpan"
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            showToast({ type: 'success', title: 'Kelengkapan data tersimpan', message: 'Menunggu otorisasi Approver.' });
            onNavigate('/list-pembiayaan/detail');
          }}
        />
      )}
    </div>
  );
}

/* Wraps the field body of RegPembS3 (without nav buttons). */
function KelengkapanDataForm({ form, setField }) {
  return (
    <>
      <h4 className="section-title" style={{ marginTop: 0 }}>Kelengkapan Data Nasabah</h4>
      <Field label="Nomor Nasabah">
        <LookupInput value={form.nomorNasabah} onChange={v => setField('nomorNasabah', v)} />
      </Field>
      <div style={{ marginTop: 16 }}>
        <FormGrid>
          <Field label="Status Keterkaitan CIF">
            <Select value={form.statusKeterkaitanCIF} onChange={v => setField('statusKeterkaitanCIF', v)} options={['Tidak Terkait', 'Pemegang Saham', 'Pengurus', 'Keluarga Pengurus']} placeholder="-- Pilih --" />
          </Field>
          <Field label="Hubungan dengan Bank [SID]">
            <Select value={form.hubunganBank} onChange={v => setField('hubunganBank', v)} options={['Tidak Terkait', 'Terkait dengan Bank', 'Terkait dengan Pengurus']} placeholder="-- Pilih --" />
          </Field>

          <Field label="Melanggar BMPK">
            <YaTidak value={form.melanggarBMPK} onChange={v => setField('melanggarBMPK', v)} />
          </Field>
          <Field label="Melampaui BMPK">
            <YaTidak value={form.melampauiBMPK} onChange={v => setField('melampauiBMPK', v)} />
          </Field>

          <Field label="Go Public">
            <Select value={form.goPublic} onChange={v => setField('goPublic', v)} options={['Ya', 'Tidak']} placeholder="-- Pilih --" />
          </Field>
          <Field label="Lembaga Pemeringkat [LSMK]">
            <Select value={form.lembagaPemeringkat} onChange={v => setField('lembagaPemeringkat', v)} options={["10 - Moody's", "11 - Standard & Poor's", "12 - Fitch", "13 - Pefindo"]} />
          </Field>

          <Field label="Peringkat Debitur [LSMK]">
            <Select value={form.peringkatDebitur} onChange={v => setField('peringkatDebitur', v)} options={['90', '85', '80', '75', '70']} />
          </Field>
          <Field label="Tanggal Pemeringkatan">
            <DateInput value={form.tanggalPemeringkatan} onChange={v => setField('tanggalPemeringkatan', v)} />
          </Field>

          <Field label="Golongan Debitur [LSMN]">
            <Select value={form.golonganDebitur} onChange={v => setField('golonganDebitur', v)} options={['0900 - Perorangan', '0100 - Korporasi', '0200 - UMKM']} placeholder="-- Pilih --" />
          </Field>
          <Field label="Status SID [SID]">
            <Select value={form.statusSID} onChange={v => setField('statusSID', v)} options={['Aktif', 'Pasif', 'Tutup']} placeholder="-- Pilih --" />
          </Field>

          <Field label="Dati 2 Nasabah [SID]" span="full">
            <div style={{ maxWidth: 'calc(50% - 12px)' }}>
              <Select value={form.dati2Nasabah} onChange={v => setField('dati2Nasabah', v)} options={['0118 - Kab Indramayu', '3171 - Jakarta Pusat', '3273 - Kota Bandung', '3578 - Kota Surabaya']} />
            </div>
          </Field>

          <Field label="Nomor Identitas Pasangan">
            <TextInput value={form.nomorIdPasangan} onChange={v => setField('nomorIdPasangan', v)} />
          </Field>
          <Field label="Nama Pasangan">
            <TextInput value={form.namaPasangan} onChange={v => setField('namaPasangan', v)} />
          </Field>

          <Field label="Tanggal Lahir Pasangan">
            <DateInput value={form.tanggalLahirPasangan} onChange={v => setField('tanggalLahirPasangan', v)} />
          </Field>
          <Field label="Perjanjian Pisah Harta">
            <Select value={form.perjanjianPisahHarta} onChange={v => setField('perjanjianPisahHarta', v)} options={['Ya', 'Tidak']} placeholder="-- Pilih --" />
          </Field>
        </FormGrid>
      </div>

      <hr className="section-divider" />

      <h4 className="section-title" style={{ marginTop: 0 }}>Kelengkapan Data Rekening</h4>
      <FormGrid>
        <Field label="Jenis Penggunaan [ANTA]">
          <Select value={form.jenisPenggunaan} onChange={v => setField('jenisPenggunaan', v)} options={['1 - Modal Kerja', '2 - Investasi', '3 - Konsumsi']} />
        </Field>
        <Field label="Jenis Piutang [ANTA]">
          <Select value={form.jenisPiutang} onChange={v => setField('jenisPiutang', v)} options={['P01 - Pembiayaan Berdasarkan Akad Murabahah', 'P02 - Pembiayaan Berdasarkan Akad Salam', 'P99 - Pembiayaan Lain Yang Diberikan']} />
        </Field>

        <Field label="Orientasi Penggunaan [ANTA]">
          <Select value={form.orientasiPenggunaan} onChange={v => setField('orientasiPenggunaan', v)} options={['1 - Ekspor', '2 - Domestik', '3 - Lainnya']} />
        </Field>
        <Field label="Lokasi Proyeksi [ANTA]">
          <Select value={form.lokasiProyeksi} onChange={v => setField('lokasiProyeksi', v)} options={['0191 - Kota Bandung', '3171 - Jakarta Pusat', '3578 - Kota Surabaya']} />
        </Field>

        <Field label="Sifat Piutang" span="full">
          <div style={{ maxWidth: 'calc(50% - 12px)' }}>
            <Select value={form.sifatPiutang} onChange={v => setField('sifatPiutang', v)} options={['1 - Kredit/Pembiayaan yang direstrukturisasi', '0 - Kredit/Pembiayaan biasa']} />
          </div>
        </Field>

        <Field label="Omset" span="full">
          <div style={{ maxWidth: 'calc(50% - 12px)' }}>
            <CurrencyInput value={form.omset} onChange={v => setField('omset', v)} />
          </div>
        </Field>

        <Field label="Kategori Usaha [LSMK]">
          <Select value={form.kategoriUsaha} onChange={v => setField('kategoriUsaha', v)} options={['01 - Mikro', '02 - Kecil', '03 - Menengah', '99 - Bukan Debitur Usaha Mikro, Kecil, dan Menengah']} />
        </Field>
        <Field label="Sektor Ekonomi [ANTA]">
          <Select value={form.sektorEkonomi} onChange={v => setField('sektorEkonomi', v)} options={['001120 - Rumah Tangga Untuk Pemilikan Rumah', '001110 - Rumah Tangga Untuk Pemilikan Kendaraan', '002100 - Pertanian']} />
        </Field>

        <Field label="Kategori Portofolio [ANTA]">
          <Select value={form.kategoriPortofolio} onChange={v => setField('kategoriPortofolio', v)} options={['39 - Kredit Beragun Rumah Tinggal - 70%', '40 - Kredit Beragun Rumah Tinggal - 85%', '41 - Kredit Beragun Properti Komersial']} />
        </Field>
        <Field label="Take Over Dari [SLIK]">
          <Select value={form.takeOverDari} onChange={v => setField('takeOverDari', v)} options={['001 - Bank Mandiri', '002 - BCA', '003 - BRI', '004 - BNI']} placeholder="-- Pilih --" />
        </Field>

        <Field label="Plafond Paripasu" span="full">
          <div style={{ maxWidth: 'calc(50% - 12px)' }}>
            <CurrencyInput value={form.plafondParipasu} onChange={v => setField('plafondParipasu', v)} />
          </div>
        </Field>

        <Field label="Kategori Nasabah">
          <Select value={form.kategoriNasabah} onChange={v => setField('kategoriNasabah', v)} options={['09 - Perorangan Konsumtif', '01 - Korporasi', '02 - UMKM']} />
        </Field>
        <Field label="Kategori Produk">
          <Select value={form.kategoriProduk} onChange={v => setField('kategoriProduk', v)} options={['01 - PPR Pembelian Rumah Siap Huni (Ready Stock)', '02 - PPR Rumah Indent', '03 - Pembiayaan Multiguna']} />
        </Field>

        <Field label="Segment Pembiayaan">
          <Select value={form.segmentPembiayaan} onChange={v => setField('segmentPembiayaan', v)} options={['9 - Segmen 1', '8 - Segmen 2', '7 - Segmen 3']} />
        </Field>
        <Field label="Cara Restruktur [SLIK]">
          <Select value={form.caraRestruktur} onChange={v => setField('caraRestruktur', v)} options={['1 - Perpanjangan Tenor', '2 - Pengurangan Margin', '3 - Penundaan Pembayaran']} placeholder="-- Pilih --" />
        </Field>

        <Field label="Booking Office">
          <Select value={form.bookingOffice} onChange={v => setField('bookingOffice', v)} options={['001 - Kantor Pusat', '005 - Bandung Asia Afrika', '012 - Kelapa Gading']} placeholder="-- Pilih --" />
        </Field>
        <Field label="Sebab Macet [SLIK]">
          <Select value={form.sebabMacet} onChange={v => setField('sebabMacet', v)} options={['Cash Flow Mismatch', 'PHK', 'Bencana Alam', 'Wanprestasi']} placeholder="-- Pilih --" />
        </Field>

        <Field label="KBLI">
          <Select value={form.kbli} onChange={v => setField('kbli', v)} options={['68111 - Real Estate Yang Dimiliki Sendiri', '47111 - Perdagangan Eceran', '01111 - Pertanian Padi']} placeholder="-- Pilih --" />
        </Field>
        <Field label="Kategori THI">
          <Select value={form.kategoriTHI} onChange={v => setField('kategoriTHI', v)} options={['THI-1', 'THI-2', 'THI-3']} placeholder="-- Pilih --" />
        </Field>
      </FormGrid>
    </>
  );
}

window.EditKelengkapanDataScreen = EditKelengkapanDataScreen;
