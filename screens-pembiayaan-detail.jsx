/* screens-pembiayaan-detail.jsx
   Detail Rekening Pembiayaan — Figma 2.2.1.a
   Hero card + 6 tabs: Informasi Detail / Info Tambahan / Biaya dan Asuransi
   / Pengikatan Jaminan / Jadwal Angsuran / Transaksi. */

function DetailPembiayaanScreen({ onNavigate, showToast }) {
  const r = window.MOCK_PEMBIAYAAN[0];
  const [tab, setTab] = React.useState('info');

  // Detail data
  const hero = {
    noRekening: '0010502029459',
    namaNasabah: '000002431 - Jacob Jones',
    kantorCabang: '001 - Kantor Pusat',
    status: 'Aktif',
    nomorFasilitas: '00000378312',
    produk: 'Murabahah',
  };

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Detail Rekening
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

      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'info',     label: 'Informasi Detail' },
          { id: 'tambahan', label: 'Info Tambahan' },
          { id: 'biaya',    label: 'Biaya dan Asuransi' },
          { id: 'jaminan',  label: 'Pengikatan Jaminan' },
          { id: 'jadwal',   label: 'Jadwal Angsuran' },
          { id: 'transaksi',label: 'Transaksi' },
        ]}
      />

      {tab === 'info' && <TabInformasiDetail />}
      {tab === 'tambahan' && <TabInfoTambahan />}
      {tab === 'biaya' && <TabBiayaAsuransi />}
      {tab === 'jaminan' && <TabPengikatanJaminan />}
      {tab === 'jadwal' && <TabJadwalAngsuran rekening={r} />}
      {tab === 'transaksi' && <TabTransaksi />}

      <div className="btn-bar btn-bar--between" style={{ marginTop: 24 }}>
        <button className="btn btn--neutral" onClick={() => onNavigate('/list-pembiayaan')}>
          <span dangerouslySetInnerHTML={{ __html: Icons.arrowL(14) }} />
          Kembali
        </button>
        <div className="row gap-12">
          <button className="btn btn--neutral btn--sm"><span dangerouslySetInnerHTML={{ __html: Icons.print(14) }} />Cetak Detail</button>
          <button className="btn btn--secondary" onClick={() => onNavigate('/list-pembiayaan/edit-kelengkapan')}>
            <span dangerouslySetInnerHTML={{ __html: Icons.edit(14) }} />
            Edit Kelengkapan Data
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Tab: Informasi Detail ─────────── */
function TabInformasiDetail() {
  return (
    <>
      <h4 className="section-title" style={{ marginTop: 0 }}>Info Umum</h4>
      <FormGrid cols={4} >
        <Disp label="Tenor Pembiayaan" value="144" />
        <Disp label="Tanggal Buka" value="13-Jul-2023" mono />
        <Disp label="Kol. Rekening" value="1" />
        <Disp label="Pool of Fund" value="011" mono />

        <Disp label="Periode" value="Bulanan" />
        <Disp label="Tanggal Akad" value="13-Jul-2023" mono />
        <Disp label="Kol. Nasabah" value="1" />
        <Disp label="Valuta" value="IDR" />

        <Disp label="Effective Ekv Rate (%)" value="15,50" mono />
        <Disp label="Tanggal JT Pembiayaan" value="13-Jul-2023" mono />
        <Disp label="Kol. Akhir" value="1" />
        <Disp label="Keterangan" value="-" />

        <Disp label="No. Kontrak" value="093/0502/001/2014" mono />
        <Disp label="Tanggal JT Angsuran" value="13-Jul-2023" mono />
      </FormGrid>

      <hr className="section-divider" />

      <FormGrid cols={4}>
        <Disp label="Outstanding Piutang" value="Rp 107.960.300,79" mono />
        <Disp label="PPAP" value="Rp 1.300,79" mono />
        <Disp label="WO Pokok" value="0,00" mono />
        <Disp label="Autodebt Angsuran" value="-" />

        <Disp label="Ttp Pembayaran" value="0,00" mono />
        <Disp label="PPAP Adjusment" value="0,00" mono />
        <Disp label="WO Margin" value="0,00" mono />
        <Disp label="Rekening Affiliasi" value="-" />

        <Disp label="Tunggakan" value="0,00" mono />
        <Disp label="Status Hapus Buku" value="-" />
        <Disp label="Nilai jaminan P. PPAP" value="0,00" mono />
        <Disp label="Periode Tunggakan" value="-" />

        <Disp label="Tunggakan Margin" value="0,00" mono />
        <Disp label="HT Ulang Pengjaminan" value="-" />
        <Disp label="Nilai Jaminan Gross" value="0,00" mono />
        <div></div>

        <Disp label="Total Outstanding" value="Rp 107.960.300,79" mono />
        <div></div>
        <Disp label="Nilai Jaminan Cash P. PPAP" value="0,00" mono />
      </FormGrid>

      <hr className="section-divider" />

      <h4 className="section-title" style={{ marginTop: 0 }}>Info Murabahah</h4>
      <FormGrid cols={3}>
        <Disp label="Harga Pokok Barang" value="Rp 441.960.300,00" mono />
        <Disp label="Plafond Pembiayaan" value="Rp 200.000.000,00" mono />
        <Disp label="Saldo Mukasah" value="0,00" mono />

        <Disp label="Uang Muka" value="Rp 50.000.000,00" mono />
        <Disp label="Saldo Atribusi" value="0,00" mono />
        <Disp label="Outstanding Pokok" value="Rp 85.903.300,90" mono />

        <Disp label="Total Margin YAD" value="Rp 241.960.300,00" mono />
        <Disp label="Saldo Margin" value="Rp 21.960.300,79" mono />
        <Disp label="Pricing Model" value="Anuitas" />

        <Disp label="Harga Jual" value="Rp 683.960.300,00" mono />
        <Disp label="Saldo Akru" value="Rp 650.300,90" mono />
        <div></div>

        <Disp label="Piutang" value="Rp 107.960.300,79" mono />
        <Disp label="Akru Off Balance" value="0,00" mono />
      </FormGrid>
    </>
  );
}

/* ─────────── Tab: Info Tambahan ─────────── */
function TabInfoTambahan() {
  return (
    <>
      <h4 className="section-title" style={{ marginTop: 0 }}>Info Tambahan</h4>
      <FormGrid cols={4}>
        <Disp label="Jenis Denda" value="Denda 1" />
        <Disp label="Tanggal Expired Manual Kol" value="--" />
        <Disp label="No. Kontrak Addendum" value="-" />
        <div></div>

        <Disp label="Auto debit Denda" value="-" />
        <Disp label="Tanggal Addendum" value="--" />
      </FormGrid>

      <hr className="section-divider" />

      <FormGrid cols={4}>
        <Disp label="AO Inisiasi" value="1024 - Hilman Trimansyah" />
        <Disp label="Notaris" value="Elok Kurniawati" />
        <Disp label="Status Restruk" value="False" />
        <Disp label="Jenis Restruk" value="-" />

        <Disp label="AO MAintance" value="-" />
        <Disp label="Instansi / Developer" value="-" />
        <Disp label="Tanggal Restruk Awal" value="--" />
        <Disp label="Cara Restruk" value="-" />

        <Disp label="Reviewer" value="-" />
        <Disp label="User Input" value="50741 - Heri Tapiheru" />
        <Disp label="Tanggal Restruk Akhir" value="--" />
        <Disp label="Jumlah Restruk" value="-" />

        <Disp label="Approver" value="0266 - Ade Santosa" />
        <Disp label="User Otorisasi" value="50048 - Maman Suherman" />
      </FormGrid>

      <hr className="section-divider" />

      <FormGrid cols={3}>
        <Disp label="Objek ID" value="FO00000000571" mono />
        <Disp label="Akad" value="-" />
        <Disp label="Kode Valuta" value="-" />

        <Disp label="Nama Objek" value="Tanah & Bangunan Kantor" />
        <Disp label="Alamat Objek Projek" value="-" />
        <div></div>

        <Disp label="Nomor Identitas" value="0242222899434000" mono />
        <Disp label="Tanggal Pengadaan" value="29-Sep-2023" mono />
        <div></div>

        <Disp label="Nilai Objek Pembayaan" value="Rp 25.013.000.000,00" mono />
        <Disp label="Keterangan" value="-" />
      </FormGrid>

      <hr className="section-divider" />

      <h4 className="section-title">History Perubahan Nilai Kolektibilitas</h4>
      <DataTable
        showSearch={false}
        showPagination={false}
        columns={[
          { key: 'tgl',      label: 'Tanggal Perubahan', render: r => <span className="mono">{r.tgl}</span> },
          { key: 'kolLama',  label: 'Nilai Kol Lama', align: 'center' },
          { key: 'kolBaru',  label: 'Nilai Kol Baru', align: 'center' },
          { key: 'ket',      label: 'Keterangan' },
          { key: 'userInput',label: 'User Input' },
          { key: 'userOtor', label: 'User Otorisasi' },
        ]}
        data={[
          { tgl: '3-Agus-2023', kolLama: '1', kolBaru: '2', ket: '-', userInput: '50741 - Heri Tapiheru', userOtor: '50048 - Maman Suherman' },
          { tgl: '3-Agus-2023', kolLama: '1', kolBaru: '2', ket: '-', userInput: '50741 - Heri Tapiheru', userOtor: '50048 - Maman Suherman' },
        ]}
      />

      <h4 className="section-title">History Restruktur</h4>
      <DataTable
        showSearch={false}
        showPagination={false}
        emptyText="-- Belum ada data History Restruktur --"
        columns={[
          { key: 'tgl',      label: 'Tanggal Perubahan', render: r => <span className="mono">{r.tgl}</span> },
          { key: 'kolLama',  label: 'Nilai Kol Lama', align: 'center' },
          { key: 'kolBaru',  label: 'Nilai Kol Baru', align: 'center' },
          { key: 'ket',      label: 'Keterangan' },
          { key: 'userInput',label: 'User Input' },
          { key: 'userOtor', label: 'User Otorisasi' },
        ]}
        data={[]}
      />
    </>
  );
}

/* ─────────── Tab: Biaya dan Asuransi ─────────── */
function TabBiayaAsuransi() {
  return (
    <>
      <h4 className="section-title" style={{ marginTop: 0 }}>List Biaya - Biaya</h4>
      <DataTable
        showSearch={false}
        showPagination={false}
        columns={[
          { key: 'elemen',     label: 'Elemen Biaya' },
          { key: 'status',     label: 'Status Amortisasi' },
          { key: 'nominal',    label: 'Nominal Biaya', align: 'right', render: r => <span className="mono">{r.nominal}</span> },
          { key: 'mulai',      label: 'Tanggal Mulai', render: r => <span className="mono">{r.mulai}</span> },
          { key: 'akhir',      label: 'Tanggal Akhir', render: r => <span className="mono">{r.akhir}</span> },
          { key: 'sudah',      label: 'Biaya Sudah Diamortisasi', align: 'right', render: r => <span className="mono">{r.sudah}</span> },
          { key: 'belum',      label: 'Belum Diamortisasi', align: 'right', render: r => <span className="mono">{r.belum}</span> },
        ]}
        data={[
          { elemen: 'Biaya Provisi',     status: 'Berjalan', nominal: '1.234.567', mulai: '13-Agus-2023', akhir: '13-Agus-2026', sudah: '450.000',   belum: '784.567' },
          { elemen: 'Biaya Administrasi',status: 'Selesai',  nominal: '500.000',   mulai: '13-Agus-2023', akhir: '13-Agus-2023', sudah: '500.000',   belum: '0' },
          { elemen: 'Biaya Notaris',     status: 'Berjalan', nominal: '750.000',   mulai: '13-Agus-2023', akhir: '13-Agus-2026', sudah: '273.000',   belum: '477.000' },
          { elemen: 'Biaya Asuransi Jiwa', status: 'Berjalan', nominal: '2.450.000', mulai: '13-Agus-2023', akhir: '13-Agus-2026', sudah: '891.000', belum: '1.559.000' },
        ]}
      />

      <h4 className="section-title">Asuransi Pembiayaan</h4>
      <DataTable
        showSearch={false}
        showPagination={false}
        columns={[
          { key: 'jenis',    label: 'Jenis Asuransi' },
          { key: 'penyedia', label: 'Penyedia' },
          { key: 'polis',    label: 'No. Polis', render: r => <span className="mono">{r.polis}</span> },
          { key: 'premi',    label: 'Premi', align: 'right', render: r => <span className="mono">{r.premi}</span> },
          { key: 'mulai',    label: 'Periode Mulai', render: r => <span className="mono">{r.mulai}</span> },
          { key: 'akhir',    label: 'Periode Akhir', render: r => <span className="mono">{r.akhir}</span> },
          { key: 'status',   label: 'Status', render: r => <StatusTag status={r.status} /> },
        ]}
        data={[
          { jenis: 'Asuransi Jiwa',     penyedia: 'PT Asuransi Takaful Keluarga',     polis: 'AJ-2023-08-1024', premi: '2.450.000', mulai: '13-Agus-2023', akhir: '13-Agus-2026', status: 'Aktif' },
          { jenis: 'Asuransi Properti', penyedia: 'PT Asuransi Takaful Umum',         polis: 'AP-2023-08-0987', premi: '3.100.000', mulai: '13-Agus-2023', akhir: '13-Agus-2024', status: 'Aktif' },
        ]}
      />
    </>
  );
}

/* ─────────── Tab: Pengikatan Jaminan ─────────── */
function TabPengikatanJaminan() {
  return (
    <>
      <h4 className="section-title" style={{ marginTop: 0 }}>Pengikatan Jaminan</h4>
      <DataTable
        showSearch={false}
        showPagination={false}
        columns={[
          { key: 'noJaminan', label: 'No. Jaminan', render: r => <span className="mono">{r.noJaminan}</span> },
          { key: 'jenis',     label: 'Jenis Jaminan' },
          { key: 'nilai',     label: 'Nilai Appraisal', align: 'right', render: r => <span className="mono">{window.fmtRp(r.nilai)}</span> },
          { key: 'pengikatan',label: 'Pengikatan' },
          { key: 'noAkta',    label: 'No. Akta', render: r => <span className="mono text-sm">{r.noAkta}</span> },
          { key: 'tglAkta',   label: 'Tgl. Akta', render: r => <span className="mono">{r.tglAkta}</span> },
          { key: 'status',    label: 'Status', render: r => <StatusTag status={r.status} /> },
        ]}
        data={[
          { noJaminan: '0000000001', jenis: 'Properti Individu', nilai: 850000000, pengikatan: 'Hak Tanggungan', noAkta: 'APHT/0123/2023', tglAkta: '15-Agus-2023', status: 'Diikat' },
          { noJaminan: '0000000003', jenis: 'Mesin & Alat',      nilai: 350000000, pengikatan: 'Fidusia',         noAkta: 'AJF/0456/2023',  tglAkta: '17-Agus-2023', status: 'Diikat' },
        ]}
      />

      <h4 className="section-title">Coverage Ratio</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <div className="stat">
          <div className="stat__label">Total Nilai Jaminan</div>
          <div className="stat__value">{window.fmtRpShort(1200000000)}</div>
        </div>
        <div className="stat">
          <div className="stat__label">Total Plafond</div>
          <div className="stat__value">{window.fmtRpShort(200000000)}</div>
        </div>
        <div className="stat">
          <div className="stat__label">Coverage Ratio</div>
          <div className="stat__value stat__value--pos">600%</div>
        </div>
        <div className="stat">
          <div className="stat__label">LTV</div>
          <div className="stat__value stat__value--pos">16,67%</div>
        </div>
      </div>
    </>
  );
}

/* ─────────── Tab: Jadwal Angsuran ─────────── */
function TabJadwalAngsuran({ rekening }) {
  return (
    <>
      <h4 className="section-title" style={{ marginTop: 0 }}>Jadwal Angsuran</h4>
      <FormGrid cols={4}>
        <Disp label="Plafond" value="Rp 200.000.000,00" mono />
        <Disp label="Tenor" value="144 bulan" />
        <Disp label="Effective Rate" value="15,50% p.a." />
        <Disp label="Angsuran Pertama" value="13-Agus-2023" mono />
      </FormGrid>

      <div style={{ marginTop: 16 }}>
        <JadwalAngsuranTable
          nominal={200000000}
          tenor={36}
          rate={15.5}
          mulai="13-Agus-2023"
        />
      </div>
    </>
  );
}

/* ─────────── Tab: Transaksi ─────────── */
function TabTransaksi() {
  return (
    <>
      <h4 className="section-title" style={{ marginTop: 0 }}>Riwayat Transaksi</h4>
      <DataTable
        showSearch
        showPagination
        pageSize={10}
        columns={[
          { key: 'tgl',      label: 'Tanggal',   sort: true, render: r => <span className="mono">{r.tgl}</span> },
          { key: 'jenis',    label: 'Jenis Transaksi' },
          { key: 'refno',    label: 'No. Referensi', render: r => <span className="mono text-sm">{r.refno}</span> },
          { key: 'debit',    label: 'Debit', align: 'right', render: r => <span className="mono" style={{ color: 'var(--c-error)' }}>{r.debit || '-'}</span> },
          { key: 'kredit',   label: 'Kredit', align: 'right', render: r => <span className="mono" style={{ color: 'var(--c-success)' }}>{r.kredit || '-'}</span> },
          { key: 'saldo',    label: 'Saldo', align: 'right', render: r => <span className="mono fw-600">{r.saldo}</span> },
          { key: 'teller',   label: 'Teller', render: r => <span className="mono text-sm">{r.teller}</span> },
        ]}
        data={[
          { tgl: '13-Agus-2023', jenis: 'Pencairan Pembiayaan',  refno: 'PNC-2023-08-0001', debit: '',           kredit: '200.000.000', saldo: '200.000.000', teller: 'BCSHQB109T' },
          { tgl: '13-Sep-2023',  jenis: 'Pembayaran Angsuran',   refno: 'PMB-2023-09-0123', debit: '5.555.555',  kredit: '',            saldo: '194.444.445', teller: 'BCSHQB1025' },
          { tgl: '13-Okt-2023',  jenis: 'Pembayaran Angsuran',   refno: 'PMB-2023-10-0234', debit: '5.555.555',  kredit: '',            saldo: '188.888.890', teller: 'BCSHQB1025' },
          { tgl: '13-Nov-2023',  jenis: 'Pembayaran Angsuran',   refno: 'PMB-2023-11-0345', debit: '5.555.555',  kredit: '',            saldo: '183.333.335', teller: 'BCSHQB109T' },
          { tgl: '13-Des-2023',  jenis: 'Pembayaran Angsuran',   refno: 'PMB-2023-12-0456', debit: '5.555.555',  kredit: '',            saldo: '177.777.780', teller: 'BCSHQB109T' },
          { tgl: '13-Jan-2024',  jenis: 'Pembayaran Angsuran',   refno: 'PMB-2024-01-0567', debit: '5.555.555',  kredit: '',            saldo: '172.222.225', teller: 'BCSHQB2017' },
          { tgl: '15-Jan-2024',  jenis: 'Denda Keterlambatan',   refno: 'DND-2024-01-0089', debit: '50.000',     kredit: '',            saldo: '172.272.225', teller: 'SYSTEM' },
          { tgl: '13-Feb-2024',  jenis: 'Pembayaran Angsuran',   refno: 'PMB-2024-02-0678', debit: '5.555.555',  kredit: '',            saldo: '166.716.670', teller: 'BCSHQB109T' },
          { tgl: '13-Mar-2024',  jenis: 'Pembayaran Sebagian',   refno: 'PSB-2024-03-0012', debit: '10.000.000', kredit: '',            saldo: '156.716.670', teller: 'BCSHQB1025' },
          { tgl: '13-Apr-2024',  jenis: 'Pembayaran Angsuran',   refno: 'PMB-2024-04-0789', debit: '5.555.555',  kredit: '',            saldo: '151.161.115', teller: 'BCSHQB1025' },
          { tgl: '13-Mei-2024',  jenis: 'Pembayaran Angsuran',   refno: 'PMB-2024-05-0890', debit: '5.555.555',  kredit: '',            saldo: '145.605.560', teller: 'BCSHQB109T' },
        ]}
      />
    </>
  );
}

window.DetailPembiayaanScreen = DetailPembiayaanScreen;
