/* screens-registrasi-pembiayaan.jsx
   Form Registrasi Pembiayaan — matches Figma 3.2 Registrasi Pembiayaan.
   6-section tabs (Data Rekening → Jadwal Angsuran) with per-akad variants. */

function RegistrasiPembiayaanScreen({ onNavigate, showToast, akad: akadProp }) {
  const akadVariants = {
    murabahah:  { title: 'Murabahah',  infoLabel: 'Informasi Murabahah',  s1Label: 'Data Rekening' },
    ijarah:     { title: 'Ijarah',     infoLabel: 'Informasi Ijarah',     s1Label: 'Rekening / Fasilitas' },
    prks:       { title: 'PRKS',       infoLabel: 'Informasi PRKS',       s1Label: 'Rekening / Fasilitas' },
    mudharabah: { title: 'Mudharabah', infoLabel: 'Informasi Mudharabah', s1Label: 'Rekening / Fasilitas' },
    mmq:        { title: 'MMQ',        infoLabel: 'Informasi MMQ',        s1Label: 'Rekening / Fasilitas' },
    istishna:   { title: 'Istishna',   infoLabel: 'Informasi Istishna',   s1Label: 'Data Rekening' },
    qardh:      { title: 'Qardh',      infoLabel: 'Informasi Qardh',      s1Label: 'Data Rekening' },
  };
  const akad = akadProp || 'murabahah';
  const cfg = akadVariants[akad] || akadVariants.murabahah;

  const sections = [
    { id: 's1', label: cfg.s1Label },
    { id: 's2', label: 'Data Tambahan & Biaya' },
    { id: 's3', label: 'Kelengkapan Data' },
    { id: 's4', label: 'Agunan' },
    { id: 's5', label: 'Pencairan' },
    { id: 's6', label: 'Jadwal Angsuran' },
  ];
  const [section, setSection] = React.useState('s1');
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [lookupOpen, setLookupOpen] = React.useState(null);
  const [biayaModalOpen, setBiayaModalOpen] = React.useState(false);
  const [editingBiaya, setEditingBiaya] = React.useState(null);

  const [form, setForm] = React.useState({
    nasabahKode: '0000000623123', nasabahNama: 'Heri Tapiheru',
    grupNasabah: '',
    produk: 'Murabahah Investasi',
    kodeValuta: 'IDR - Rupiah',
    kantorCabang: 'KCP Surapati',
    poolOfFund: '000',
    periode: '',
    jangkaWaktu: '12',
    jenisMargin: '',
    marginBagiHasil: '15.5',
    tanggalAkad: '10-Jan-2026',
    tanggalBuka: '10-Jan-2026',
    nomorAkad: '31208931209831',
    tanggalPengadaan: '10-Jan-2026',
    tanggalJatuhTempo: '10-Jan-2027',
    accountOfficer: '0000000623123 - Heri Tapiheru',
    notaris: '',
    reviewer: '0000000623123 - Heri Tapiheru',
    approver: '0000000623123 - Heri Tapiheru',
    keterangan: 'Buka Pembiayaan Baru',
    autoSettle: true,
    rekeningSumberPembayaran: '',
    hargaPokokBarang: '1090000000',
    uangMuka: '0', uangMukaPct: '0',
    pricingModel: '',
    besarPembiayaan: '1090000000',
    nilaiAsset: '1090000000',
    totalMargin: '0',
    totalPiutan: '1090000000',
    plafondPRKS: '1090000000',
    proyeksiGrossProfit: '0',
    nisbah: '0',
    hargaBarang: '1090000000',
    modalNasabah: '290000000',
    totalPembiayaan: '1090000000',
    modelBagiHasil: '',
    biaya: [
      { jenisElemen: 'Vendor', elemenBiaya: 'Biaya Asuransi',     dataVendor: 'Vendor ABC',           sumberBiaya: 'Nasabah', rekeningSumber: '000002413333 - Jacob Jones', nominalBiaya: '100000',  nominalPajak: '0',     rekeningVendor: '000003218' },
      { jenisElemen: 'Vendor', elemenBiaya: 'Biaya Notaris',      dataVendor: 'NOT-0015 - Edward SH', sumberBiaya: 'Nasabah', rekeningSumber: '000002413333 - Jacob Jones', nominalBiaya: '750000',  nominalPajak: '75000', rekeningVendor: '000003219' },
      { jenisElemen: 'Bank',   elemenBiaya: 'Biaya Provisi',      dataVendor: '-',                    sumberBiaya: 'Nasabah', rekeningSumber: '000002413333 - Jacob Jones', nominalBiaya: '1090000', nominalPajak: '0',     rekeningVendor: '-' },
    ],
    nomorNasabah: '0000000623123 - Heri Tapiheru',
    statusKeterkaitanCIF: '',
    hubunganBank: '',
    melanggarBMPK: 'tidak', melampauiBMPK: 'tidak',
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
    agunan: [
      { noJaminan: '0000000001', nama: 'Heri Tapiheru', jenis: 'Properti Individu', nilai: 850000000 },
    ],
    nilaiPencairan: '90000000',
    pencairanKodeValuta: 'IDR',
    tanggalPencairan: '13 Juli 2023',
    pencairanJangkaWaktu: '12',
    effectiveEkvRate: '15.5',
    pencairanRekeningSumber: '0020307443 - Ibrahim Jaya',
    opsiPencairan: 'Rekening Sendiri',
    rekeningPencairan: '',
    rekeningPindahBuku: '',
    pencairanKeterangan: 'Pencairan murabahah Ardhiyanto / Rina',
    tanggalAngsuranAwal: '16-Agus-2023',
    rateMukasah: '0,00',
    periodeMukasah: '0',
    maksimumDPDMukasah: '7',
    metodeJadwal: 'generate',
    uploadFileJadwal: null,
  });

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const sectionIdx = sections.findIndex(s => s.id === section);
  const goNext = () => {
    if (sectionIdx < sections.length - 1) setSection(sections[sectionIdx + 1].id);
    else setConfirmOpen(true);
  };
  const goPrev = () => {
    if (sectionIdx > 0) setSection(sections[sectionIdx - 1].id);
  };

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Registrasi Pembiayaan – {cfg.title}
      </h2>

      <SectionTabs value={section} onChange={setSection} tabs={sections} />

      {section === 's1' && (
        <RegPembS1
          akad={akad} cfg={cfg} form={form} setForm={setForm} setField={setField}
          onOpenNasabah={() => setLookupOpen('nasabah')}
          goNext={goNext} goPrev={goPrev} onCancel={() => onNavigate('/list-pembiayaan')}
          sectionIdx={sectionIdx} total={sections.length}
        />
      )}

      {section === 's2' && (
        <RegPembS2
          form={form} setForm={setForm}
          openBiayaModal={(b) => { setEditingBiaya(b); setBiayaModalOpen(true); }}
          showToast={showToast}
          goNext={goNext} goPrev={goPrev} onCancel={() => onNavigate('/list-pembiayaan')}
          sectionIdx={sectionIdx} total={sections.length}
        />
      )}

      {section === 's3' && (
        <RegPembS3
          form={form} setField={setField}
          goNext={goNext} goPrev={goPrev} onCancel={() => onNavigate('/list-pembiayaan')}
          sectionIdx={sectionIdx} total={sections.length}
        />
      )}

      {section === 's4' && (
        <RegPembS4
          form={form} setForm={setForm} showToast={showToast}
          goNext={goNext} goPrev={goPrev} onCancel={() => onNavigate('/list-pembiayaan')}
          sectionIdx={sectionIdx} total={sections.length}
        />
      )}

      {section === 's5' && (
        <RegPembS5
          form={form} setField={setField}
          goNext={goNext} goPrev={goPrev} onCancel={() => onNavigate('/list-pembiayaan')}
          sectionIdx={sectionIdx} total={sections.length}
        />
      )}

      {section === 's6' && (
        <RegPembS6
          form={form}
          goNext={goNext} goPrev={goPrev} onCancel={() => onNavigate('/list-pembiayaan')}
          sectionIdx={sectionIdx} total={sections.length}
        />
      )}

      <NasabahLookup
        open={lookupOpen === 'nasabah'}
        onClose={() => setLookupOpen(null)}
        onSelect={n => setForm(f => ({ ...f, nasabahKode: n.kode, nasabahNama: n.nama, nomorNasabah: `${n.kode} - ${n.nama}` }))}
      />

      {biayaModalOpen && (
        <TambahDataBiayaModal
          initial={editingBiaya}
          onClose={() => setBiayaModalOpen(false)}
          onSave={(data) => {
            setForm(f => {
              if (editingBiaya && editingBiaya._idx != null) {
                const arr = [...f.biaya];
                arr[editingBiaya._idx] = data;
                return { ...f, biaya: arr };
              }
              return { ...f, biaya: [...f.biaya, data] };
            });
            setBiayaModalOpen(false);
            showToast({ type: 'success', title: 'Biaya tersimpan', message: data.elemenBiaya });
          }}
        />
      )}

      {confirmOpen && (
        <ConfirmDialog
          title="Submit Registrasi Pembiayaan"
          message={`Pembiayaan ${cfg.title} senilai ${window.fmtRp(form.besarPembiayaan)} untuk ${form.nasabahNama} akan dikirim ke Approver. Lanjutkan?`}
          confirmLabel="Ya, Submit"
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            showToast({ type: 'success', title: 'Pembiayaan terdaftar', message: `Sedang menunggu otorisasi oleh ${form.approver}.` });
            onNavigate('/list-pembiayaan');
          }}
        />
      )}
    </div>
  );
}

window.RegistrasiPembiayaanScreen = RegistrasiPembiayaanScreen;
