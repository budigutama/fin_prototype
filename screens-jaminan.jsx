/* screens-jaminan.jsx
 * Hi-Fi screens for Data Jaminan menu:
 *   /jaminan/entri-individual   → EntriJaminanIndividualScreen (Figma 6.3.1)
 *   /jaminan/entri-kolektif     → EntriJaminanKolektifScreen   (Figma 6.4.1)
 *   /jaminan/detail             → DetailAgunanScreen            (Figma 6.1.1)
 *
 * Design notes:
 *  - The Figma puts "Jenis Jaminan" as 12 radio-button tiles inside the hero
 *    card. Per direction we render it as a compact <Select> for readability.
 *  - Section 1 = Informasi Umum (Data Umum + Data Penilaian + Dokumen)
 *  - Section 2 = jenis-specific detail (Data Properti, Data Kendaraan, …)
 *  - Detail Agunan reuses the same shape in read-only mode, with an extra
 *    outer Tab strip for "Data Jaminan" / "Pengikatan dan Asuransi".
 */

/* ─────────── Shared metadata ─────────── */
const JENIS_JAMINAN_OPTIONS = [
  'Properti Individu',
  'Properti Kolektif',
  'Kendaraan Individu',
  'Kendaraan Kolektif',
  'Logam Mulia / Emas',
  'Cash / Tunai',
  'Mesin / Alat Berat',
  'Piutang Tagihan',
  'Kapal',
  'Bank Garansi',
  'Personal / Corporate Guarantee',
  'Persediaan Barang',
  'Bank Notes',
  'Surat Berharga',
  'Surat Keputusan',
  'Jaminan Lainnya',
];

// Entri Jaminan Individual: tanpa pilihan kolektif
const JENIS_JAMINAN_INDIVIDUAL_OPTIONS = JENIS_JAMINAN_OPTIONS.filter(
  o => o !== 'Properti Kolektif' && o !== 'Kendaraan Kolektif'
);

const BUKTI_KEPEMILIKAN_OPTIONS = ['SHM', 'SHGB', 'SHGU', 'AJB', 'PPJB', 'Lainnya'];
const TIPE_APPRAISAL_OPTIONS  = ['Internal', 'KJPP (Eksternal)', 'Desk Appraisal'];
const STATUS_DOK_OPTIONS      = ['Asli', 'Copy Legalisir', 'Copy Biasa', 'Hold'];
const TIPE_PROPERTI_OPTIONS   = ['Rumah Tinggal', 'Ruko / Rukan', 'Apartemen', 'Tanah Kosong', 'Pabrik / Gudang', 'Kantor'];
const STATUS_OBJEK_OPTIONS    = ['Aktif', 'Diikat', 'Pending Bind', 'Release', 'Hapus'];
const JENIS_PENGIKATAN_OPT    = ['Hak Tanggungan (HT)', 'Fidusia', 'Gadai', 'Cessie', 'SKMHT'];

/* ─────────── Reusable Hero Card ─────────── */
function JenisJaminanHero({ form, setField, readOnly, options = JENIS_JAMINAN_OPTIONS }) {
  return (
    <div className="hl-card" style={{ padding: 20 }}>
      <Field label="Nama Nasabah" required>
        {readOnly
          ? <div style={{ fontSize: 18, fontWeight: 600, paddingTop: 4 }}>{form.namaNasabah || '-'}</div>
          : <LookupInput
              value={form.namaNasabah}
              onChange={v => setField('namaNasabah', v)}
              placeholder="-- Cari nasabah --"
            />}
      </Field>

      <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Jenis Jaminan" required>
          {readOnly
            ? <div style={{ paddingTop: 6 }}><span className="tag tag--info">{form.jenisJaminan || '-'}</span></div>
            : <Select
                value={form.jenisJaminan}
                onChange={v => setField('jenisJaminan', v)}
                options={options}
                placeholder="-- Pilih jenis jaminan --"
              />}
        </Field>
        <Field label="Kode Jaminan">
          {readOnly
            ? <div className="mono" style={{ paddingTop: 6 }}>{form.kodeJaminan || '-'}</div>
            : <TextInput
                value={form.kodeJaminan}
                onChange={v => setField('kodeJaminan', v)}
                placeholder="(Auto-generated saat simpan)"
              />}
        </Field>
      </div>
    </div>
  );
}

/* ─────────── Section 1 — Informasi Umum (reused) ─────────── */
function SectionInformasiUmum({ form, setField, readOnly }) {
  const F = readOnly ? Disp : null;
  return (
    <>
      <h4 className="section-title" style={{ marginTop: 0 }}>Data Umum</h4>
      <FormGrid cols={3}>
        {readOnly ? <F label="Nasabah" value={form.namaNasabah} /> : (
          <Field label="Nasabah" required>
            <LookupInput value={form.namaNasabah} onChange={v => setField('namaNasabah', v)} placeholder="-- Cari nasabah --" />
          </Field>
        )}
        {readOnly ? <F label="Pemilik Agunan" value={form.pemilikAgunan} /> : (
          <Field label="Pemilik Agunan" required>
            <Select value={form.pemilikAgunan} onChange={v => setField('pemilikAgunan', v)} placeholder="-- Pilih --"
              options={['Nasabah sendiri', 'Pasangan', 'Penjamin (3rd party)', 'Korporat']} />
          </Field>
        )}
        {readOnly ? <F label="Cabang" value={form.cabang} /> : (
          <Field label="Cabang" required>
            <LookupInput value={form.cabang} onChange={v => setField('cabang', v)} placeholder="-- Pilih cabang --" />
          </Field>
        )}

        {readOnly ? <F label="Alamat" value={form.alamat1} /> : (
          <Field label="Alamat" required span="full">
            <TextInput value={form.alamat1} onChange={v => setField('alamat1', v)} placeholder="Alamat lengkap agunan" />
          </Field>
        )}

        {readOnly ? <F label="Kelurahan" value={form.kelurahan} /> : (
          <Field label="Kelurahan" required>
            <Select value={form.kelurahan} onChange={v => setField('kelurahan', v)} placeholder="-- Pilih --"
              options={['Menteng', 'Kuningan', 'Setiabudi', 'Tebet', 'Senayan']} />
          </Field>
        )}
        {readOnly ? <F label="Kecamatan" value={form.kecamatan} /> : (
          <Field label="Kecamatan" required>
            <Select value={form.kecamatan} onChange={v => setField('kecamatan', v)} placeholder="-- Pilih --"
              options={['Menteng', 'Setiabudi', 'Tebet', 'Kebayoran Baru']} />
          </Field>
        )}
        {readOnly ? <F label="Kode Pos" value={form.kodePos} mono /> : (
          <Field label="Kode Pos">
            <TextInput value={form.kodePos} onChange={v => setField('kodePos', v)} placeholder="10310" />
          </Field>
        )}

        {readOnly ? <F label="Provinsi" value={form.provinsi} /> : (
          <Field label="Provinsi" required>
            <Select value={form.provinsi} onChange={v => setField('provinsi', v)} placeholder="-- Pilih --"
              options={['DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Banten', 'Yogyakarta']} />
          </Field>
        )}
        {readOnly ? <F label="Bukti Kepemilikan" value={form.buktiKepemilikan} /> : (
          <Field label="Bukti Kepemilikan" required>
            <LookupInput value={form.buktiKepemilikan} onChange={v => setField('buktiKepemilikan', v)} placeholder="-- Cari bukti --" />
          </Field>
        )}
        {readOnly ? <F label="Asuransi" value={form.asuransi} /> : (
          <Field label="Asuransi" required>
            <Select value={form.asuransi} onChange={v => setField('asuransi', v)} placeholder="-- Pilih --"
              options={['Allianz Syariah', 'Takaful', 'Sinar Mas Syariah', 'Tidak Diasuransikan']} />
          </Field>
        )}

        {readOnly ? <F label="Jenis Produk" value={form.jenisProduk} /> : (
          <Field label="Jenis Produk">
            <Select value={form.jenisProduk} onChange={v => setField('jenisProduk', v)} placeholder="-- Pilih --"
              options={['KPR Murabahah', 'KKB Murabahah', 'Modal Kerja MMQ', 'Investasi Istishna']} />
          </Field>
        )}
      </FormGrid>

      {!readOnly && (
        <div style={{ marginTop: 16 }}>
          <label className="cbx">
            <input type="checkbox" checked={form.appraisal} onChange={e => setField('appraisal', e.target.checked)} />
            Sudah Dilakukan Appraisal
          </label>
        </div>
      )}

      <hr className="section-divider" />
      <h4 className="section-title" style={{ marginTop: 0 }}>Data Penilaian Terakhir</h4>
      <FormGrid cols={3}>
        {readOnly ? <F label="Tanggal Appraisal Terakhir" value={form.tglAppraisal} mono /> : (
          <Field label="Tanggal Appraisal Terakhir" required>
            <DateInput value={form.tglAppraisal} onChange={v => setField('tglAppraisal', v)} />
          </Field>
        )}
        {readOnly ? <F label="Tipe Appraisal" value={form.tipeAppraisal} /> : (
          <Field label="Tipe Appraisal" required>
            <Select value={form.tipeAppraisal} onChange={v => setField('tipeAppraisal', v)} placeholder="-- Pilih --" options={TIPE_APPRAISAL_OPTIONS} />
          </Field>
        )}
        {readOnly ? <F label="Appraisal Agent" value={form.appraisalAgent} /> : (
          <Field label="Appraisal Agent" required>
            <LookupInput value={form.appraisalAgent} onChange={v => setField('appraisalAgent', v)} placeholder="-- Cari lembaga --" />
          </Field>
        )}

        {readOnly ? <F label="Nama Petugas Appraisal" value={form.namaPetugas} /> : (
          <Field label="Nama Petugas Appraisal" required>
            <TextInput value={form.namaPetugas} onChange={v => setField('namaPetugas', v)} placeholder="Nama petugas penilai" />
          </Field>
        )}
        {readOnly ? <F label="Nilai Legal" value={window.fmtRp(form.nilaiLegal)} mono /> : (
          <Field label="Nilai Legal">
            <CurrencyInput value={form.nilaiLegal} onChange={v => setField('nilaiLegal', v)} placeholder="0" />
          </Field>
        )}
        {readOnly ? <F label="Nilai Pasar" value={window.fmtRp(form.nilaiPasar)} mono /> : (
          <Field label="Nilai Pasar">
            <CurrencyInput value={form.nilaiPasar} onChange={v => setField('nilaiPasar', v)} placeholder="0" />
          </Field>
        )}

        {readOnly ? <F label="Nilai Taksasi" value={window.fmtRp(form.nilaiTaksasi)} mono /> : (
          <Field label="Nilai Taksasi">
            <CurrencyInput value={form.nilaiTaksasi} onChange={v => setField('nilaiTaksasi', v)} placeholder="0" />
          </Field>
        )}
        {readOnly ? <F label="Nilai Likuidasi" value={window.fmtRp(form.nilaiLikuidasi)} mono /> : (
          <Field label="Nilai Likuidasi">
            <CurrencyInput value={form.nilaiLikuidasi} onChange={v => setField('nilaiLikuidasi', v)} placeholder="0" />
          </Field>
        )}
        {readOnly ? <F label="No. Dokumen Appraisal" value={form.noDokAppraisal} mono /> : (
          <Field label="No. Dokumen Appraisal">
            <TextInput value={form.noDokAppraisal} onChange={v => setField('noDokAppraisal', v)} placeholder="APR-2026-..." />
          </Field>
        )}
      </FormGrid>

      <hr className="section-divider" />
      <h4 className="section-title" style={{ marginTop: 0 }}>Dokumen</h4>
      <FormGrid cols={3}>
        {readOnly ? <F label="Nomor Dokumen Jaminan" value={form.noDokJaminan} mono /> : (
          <Field label="Nomor Dokumen Jaminan" required>
            <TextInput value={form.noDokJaminan} onChange={v => setField('noDokJaminan', v)} placeholder="SHM-1024" />
          </Field>
        )}
        {readOnly ? <F label="Status Dokumen Jaminan" value={form.statusDokJaminan} /> : (
          <Field label="Status Dokumen Jaminan" required>
            <Select value={form.statusDokJaminan} onChange={v => setField('statusDokJaminan', v)} placeholder="-- Pilih --" options={STATUS_DOK_OPTIONS} />
          </Field>
        )}
        {readOnly ? <F label="Tanggal JT Dokumen Jaminan" value={form.tglJTDokJaminan} mono /> : (
          <Field label="Tanggal JT Dokumen Jaminan" required>
            <DateInput value={form.tglJTDokJaminan} onChange={v => setField('tglJTDokJaminan', v)} />
          </Field>
        )}
      </FormGrid>
    </>
  );
}

/* ─────────── Section 2 — Data Properti (reused, read/write) ─────────── */
function SectionDataProperti({ form, setField, readOnly }) {
  const F = Disp;
  return (
    <>
      <h4 className="section-title" style={{ marginTop: 0 }}>Data Properti</h4>
      <FormGrid cols={2}>
        {readOnly ? <F label="Nomor Objek Jaminan" value={form.noObjek} mono /> : (
          <Field label="Nomor Objek Jaminan" required>
            <TextInput value={form.noObjek} onChange={v => setField('noObjek', v)} placeholder="(Auto-generated)" />
          </Field>
        )}
        {readOnly ? <F label="Tipe Properti" value={form.tipeProperti} /> : (
          <Field label="Tipe Properti" required>
            <Select value={form.tipeProperti} onChange={v => setField('tipeProperti', v)} placeholder="-- Pilih --" options={TIPE_PROPERTI_OPTIONS} />
          </Field>
        )}

        {readOnly ? <F label="Status Objek Jaminan" value={form.statusObjek} /> : (
          <Field label="Status Objek Jaminan" required>
            <Select value={form.statusObjek} onChange={v => setField('statusObjek', v)} placeholder="-- Pilih --" options={STATUS_OBJEK_OPTIONS} />
          </Field>
        )}
        {readOnly ? <F label="Nama Pemegang Hak" value={form.namaPemegangHak} /> : (
          <Field label="Nama Pemegang Hak" required>
            <TextInput value={form.namaPemegangHak} onChange={v => setField('namaPemegangHak', v)} placeholder="Sesuai sertifikat" />
          </Field>
        )}

        {readOnly ? <F label="Luas Tanah (m²)" value={form.luasTanah} mono /> : (
          <Field label="Luas Tanah (m²)" required>
            <NumberInput value={form.luasTanah} onChange={v => setField('luasTanah', v)} suffix="m²" />
          </Field>
        )}
        {readOnly ? <F label="Luas Bangunan (m²)" value={form.luasBangunan} mono /> : (
          <Field label="Luas Bangunan (m²)" required>
            <NumberInput value={form.luasBangunan} onChange={v => setField('luasBangunan', v)} suffix="m²" />
          </Field>
        )}

        {readOnly ? <F label="Tanggal Objek Jaminan" value={form.tglObjek} mono /> : (
          <Field label="Tanggal Objek Jaminan" required>
            <DateInput value={form.tglObjek} onChange={v => setField('tglObjek', v)} />
          </Field>
        )}
        {readOnly ? <F label="Tanggal Jatuh Tempo Objek" value={form.tglJTObjek} mono /> : (
          <Field label="Tanggal Jatuh Tempo Objek" required>
            <DateInput value={form.tglJTObjek} onChange={v => setField('tglJTObjek', v)} />
          </Field>
        )}

        {readOnly ? <F label="NJOP Bangunan" value={window.fmtRp(form.njopBangunan)} mono /> : (
          <Field label="NJOP Bangunan" required>
            <CurrencyInput value={form.njopBangunan} onChange={v => setField('njopBangunan', v)} placeholder="0" />
          </Field>
        )}
        {readOnly ? <F label="Tahun NJOP" value={form.tahunNjop} mono /> : (
          <Field label="Tahun NJOP" required>
            <NumberInput value={form.tahunNjop} onChange={v => setField('tahunNjop', v)} placeholder="2026" />
          </Field>
        )}

        {readOnly ? <F label="Lokasi" value={form.lokasi} /> : (
          <Field label="Lokasi" required span="full">
            <TextInput value={form.lokasi} onChange={v => setField('lokasi', v)} placeholder="Alamat lokasi lengkap, koordinat opsional" />
          </Field>
        )}
        {readOnly ? <F label="Nomor IMB" value={form.noIMB} mono /> : (
          <Field label="Nomor IMB" required>
            <TextInput value={form.noIMB} onChange={v => setField('noIMB', v)} placeholder="IMB / PBG" />
          </Field>
        )}
      </FormGrid>
    </>
  );
}

/* ─────────── EntriJaminanIndividual (Figma 6.3.1) ─────────── */
function EntriJaminanIndividualScreen({ onNavigate, showToast }) {
  const [section, setSection] = React.useState('s1');
  const [form, setForm] = React.useState({
    namaNasabah: '', jenisJaminan: 'Properti Individu', kodeJaminan: '',
    pemilikAgunan: '', cabang: '',
    alamat1: '', kelurahan: '', kecamatan: '', kodePos: '', provinsi: '',
    buktiKepemilikan: '', asuransi: '', jenisProduk: '',
    appraisal: true,
    tglAppraisal: '', tipeAppraisal: '', appraisalAgent: '',
    namaPetugas: '', nilaiLegal: '', nilaiPasar: '', nilaiTaksasi: '', nilaiLikuidasi: '',
    noDokAppraisal: '',
    noDokJaminan: '', statusDokJaminan: '', tglJTDokJaminan: '',
    // Section 2
    noObjek: '', tipeProperti: '', statusObjek: '', namaPemegangHak: '',
    luasTanah: '', luasBangunan: '', tglObjek: '', tglJTObjek: '',
    njopBangunan: '', tahunNjop: '', lokasi: '', noIMB: '',
  });
  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Entri Data Jaminan Individu
      </h2>

      <JenisJaminanHero form={form} setField={setField} options={JENIS_JAMINAN_INDIVIDUAL_OPTIONS} />

      <SectionTabs
        value={section}
        onChange={setSection}
        tabs={[
          { id: 's1', label: 'Informasi Umum' },
          { id: 's2', label: `Data ${form.jenisJaminan?.split(' ')[0] || 'Properti'}` },
        ]}
      />

      {section === 's1' && (
        <>
          <SectionInformasiUmum form={form} setField={setField} />

          <div className="btn-bar btn-bar--between" style={{ marginTop: 24 }}>
            <button className="btn btn--neutral" onClick={() => onNavigate('/jaminan/daftar')}>Batal</button>
            <button className="btn btn--primary" onClick={() => setSection('s2')}>Selanjutnya</button>
          </div>
        </>
      )}

      {section === 's2' && (
        <>
          <SectionDataProperti form={form} setField={setField} />

          <div className="btn-bar btn-bar--between" style={{ marginTop: 24 }}>
            <button className="btn btn--neutral" onClick={() => onNavigate('/jaminan/daftar')}>Batal</button>
            <div className="row gap-12">
              <button className="btn btn--secondary" onClick={() => setSection('s1')}>Sebelumnya</button>
              <button className="btn btn--primary" onClick={() => setConfirmOpen(true)}>
                <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(16) }} />
                Simpan Jaminan
              </button>
            </div>
          </div>
        </>
      )}

      {confirmOpen && (
        <ConfirmDialog
          title="Simpan Jaminan Baru"
          message={`Jaminan ${form.jenisJaminan} atas nama "${form.namaNasabah || '(belum diisi)'}" akan didaftarkan ke sistem. Lanjutkan?`}
          confirmLabel="Ya, Simpan"
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            showToast({ type: 'success', title: 'Jaminan tersimpan', message: `${form.jenisJaminan} berhasil didaftarkan.` });
            onNavigate('/jaminan/daftar');
          }}
        />
      )}
    </div>
  );
}

/* ─────────── EntriJaminanKolektif (Figma 6.4.1) ─────────── */
// Untuk batch entri beberapa properti sekaligus di bawah 1 nasabah / korporat.
// Sesuai figma, form ini lebih ringkas: Dokumen + Data Properti, dengan list
// di bawahnya untuk meninjau properti-properti yang sudah ditambahkan.
// Schema per jenis jaminan kolektif: judul dokumen, field detail, & kolom tabel daftar.
const KOLEKTIF_SCHEMAS = {
  'Properti Kolektif': {
    dokTglLabel: 'Tgl JT Dokumen Jaminan',
    dataTitle: 'Data Properti',
    listTitle: 'Daftar Properti',
    fields: [
      { key: 'noObjek',         label: 'Nomor Objek Jaminan',        type: 'text',     placeholder: '(Auto / Manual)' },
      { key: 'tipeProperti',    label: 'Tipe Properti',              type: 'select',   options: TIPE_PROPERTI_OPTIONS },
      { key: 'statusObjek',     label: 'Status Objek Jaminan',       type: 'select',   options: STATUS_OBJEK_OPTIONS },
      { key: 'namaPemegangHak', label: 'Nama Pemegang Hak',          type: 'text',     placeholder: 'Sesuai sertifikat' },
      { key: 'luasTanah',       label: 'Luas Tanah (m²)',            type: 'number',   suffix: 'm²' },
      { key: 'luasBangunan',    label: 'Luas Bangunan (m²)',         type: 'number',   suffix: 'm²' },
      { key: 'tglObjek',        label: 'Tanggal Objek Jaminan',      type: 'date' },
      { key: 'tglJTObjek',      label: 'Tanggal Jatuh Tempo Objek',  type: 'date' },
      { key: 'njop',            label: 'NJOP Tanah dan/atau Bangunan', type: 'currency', placeholder: '0' },
      { key: 'tahunNjop',       label: 'Tahun NJOP',                 type: 'number',   placeholder: '2026' },
      { key: 'lokasi',          label: 'Lokasi',                     type: 'text',     span: 'full', placeholder: 'Alamat lokasi properti' },
      { key: 'noIMB',           label: 'Nomor IMB',                  type: 'text',     placeholder: 'IMB / PBG' },
    ],
    columns: [
      { key: 'noObjek',         label: 'No. Sertifikat',  mono: true },
      { key: 'tipeProperti',    label: 'Jenis Property' },
      { key: 'namaPemegangHak', label: 'Nama Pemegang Hak' },
      { key: 'luasTanah',       label: 'LT (m²)',  mono: true, align: 'right' },
      { key: 'luasBangunan',    label: 'LB (m²)',  mono: true, align: 'right' },
      { key: 'lokasi',          label: 'Lokasi' },
      { key: 'njop',            label: 'NJOP', mono: true, align: 'right', money: true },
      { key: 'noIMB',           label: 'No. IMB', mono: true },
    ],
    seed: [
      { noObjek: '0000003261-A', tipeProperti: 'Rumah Tinggal', namaPemegangHak: 'Budi Santoso', luasTanah: '120', luasBangunan: '95', lokasi: 'Jl. Kemang Selatan No. 12, Jakarta Selatan', njop: '1850000000', noIMB: 'IMB-2019-0012' },
      { noObjek: '0000003261-B', tipeProperti: 'Rumah Tinggal', namaPemegangHak: 'Budi Santoso', luasTanah: '110', luasBangunan: '90', lokasi: 'Jl. Kemang Selatan No. 14, Jakarta Selatan', njop: '1720000000', noIMB: 'IMB-2019-0014' },
    ],
  },
  'Kendaraan Kolektif': {
    dokTglLabel: 'Tgl Expired Dokumen Jaminan',
    dataTitle: 'Data Kendaraan',
    listTitle: 'Daftar Kendaraan',
    fields: [
      { key: 'noBPKB',       label: 'No. BPKB',                       type: 'text' },
      { key: 'merkType',     label: 'Merk / Type',                    type: 'text' },
      { key: 'noRangka',     label: 'No. Rangka',                     type: 'text' },
      { key: 'noMesin',      label: 'No. Mesin',                      type: 'text' },
      { key: 'namaPemilik',  label: 'Nama Pemilik',                   type: 'text', placeholder: 'Sesuai BPKB' },
      { key: 'noPolisi',     label: 'No. Polisi',                     type: 'text' },
      { key: 'tahunBuat',    label: 'Tahun Pembuatan',                type: 'number', placeholder: '2026' },
      { key: 'kondisi',      label: 'Kondisi',                        type: 'text', placeholder: 'Baru / Bekas' },
      { key: 'noCoverNote',  label: 'Nomor Cover Note BPKB',          type: 'text' },
      { key: 'tglCN',        label: 'Tanggal CN BPKB',                type: 'date' },
      { key: 'tglJTCN',      label: 'Tanggal Jatuh Tempo CN BPKB',    type: 'date' },
      { key: 'tglBlokir',    label: 'Tanggal Blokir BPKB',            type: 'date' },
      { key: 'tglJTBlokir',  label: 'Tanggal Jatuh Tempo Blokir BPKB', type: 'date' },
    ],
    columns: [
      { key: 'noPolisi',    label: 'No. Polisi', mono: true },
      { key: 'merkType',    label: 'Merk' },
      { key: 'tahunBuat',   label: 'Tahun Pembuatan', mono: true, align: 'right' },
      { key: 'noRangka',    label: 'No. Rangka', mono: true },
      { key: 'noMesin',     label: 'No. Mesin', mono: true },
      { key: 'noBPKB',      label: 'No. BPKB', mono: true },
      { key: 'namaPemilik', label: 'Nama Pemilik' },
      { key: 'kondisi',     label: 'Kondisi' },
    ],
    seed: [],
  },
  'Mesin / Alat Berat Kolektif': {
    dokTglLabel: 'Tgl JT Dokumen Jaminan',
    dataTitle: 'Data Mesin / Alat Berat',
    listTitle: 'Daftar Mesin / Alat Berat',
    fields: [
      { key: 'namaAlat',   label: 'Nama Alat / Mesin', type: 'text' },
      { key: 'noInvoice',  label: 'Nomor Invoice',     type: 'text' },
      { key: 'merkMesin',  label: 'Merk',              type: 'text' },
      { key: 'tahunMesin', label: 'Tahun Pembuatan',   type: 'number', placeholder: '2026' },
    ],
    columns: [
      { key: 'namaAlat',   label: 'Nama Alat' },
      { key: 'merkMesin',  label: 'Merk' },
      { key: 'noInvoice',  label: 'No. Invoice', mono: true },
      { key: 'tahunMesin', label: 'Tahun Pembuatan', mono: true, align: 'right' },
    ],
    seed: [],
  },
};

const KOLEKTIF_ASURANSI_OPTIONS = ['Tidak Diasuransikan', 'Diasuransikan'];
const KOLEKTIF_JENIS_PRODUK_OPTIONS = ['Reguler', 'Mikro', 'Tiering'];
const KOLEKTIF_JENIS_AGUNAN = {
  'Properti Kolektif': 'Property',
  'Kendaraan Kolektif': 'Kendaraan',
  'Mesin / Alat Berat Kolektif': 'Mesin / Alat Berat',
};

// Modal "Input Detail Data" — Dokumen + Data {jenis}, sesuai popup legacy.
function KolektifDetailModal({ jenis, schema, initial, onClose, onSave }) {
  const [d, setD] = React.useState(initial || {});
  const set = (k, v) => setD(p => ({ ...p, [k]: v }));
  const firstKey = schema.fields[0].key;
  const valid = !!d[firstKey];

  const renderField = (f) => {
    const common = { value: d[f.key] || '', onChange: (val) => set(f.key, val) };
    let control;
    if (f.type === 'select')        control = <Select {...common} placeholder="-- Pilih --" options={f.options} />;
    else if (f.type === 'date')     control = <DateInput {...common} />;
    else if (f.type === 'number')   control = <NumberInput {...common} suffix={f.suffix} placeholder={f.placeholder} />;
    else if (f.type === 'currency') control = <CurrencyInput {...common} placeholder={f.placeholder || '0'} />;
    else                            control = <TextInput {...common} placeholder={f.placeholder} />;
    return <Field key={f.key} label={f.label} required span={f.span}>{control}</Field>;
  };

  return (
    <Modal
      title={`Input Detail Data — ${KOLEKTIF_JENIS_AGUNAN[jenis]}`}
      subtitle={schema.dataTitle}
      onClose={onClose}
      size="lg"
      footer={
        <>
          <button className="btn btn--neutral" onClick={onClose}>Batal / Tutup</button>
          <button className="btn btn--primary" disabled={!valid} onClick={() => onSave(d)}>
            <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(16) }} />
            Simpan
          </button>
        </>
      }
    >
      <h4 className="section-title" style={{ marginTop: 0 }}>Dokumen</h4>
      <FormGrid cols={3}>
        <Field label="No. Dokumen Jaminan" required>
          <TextInput value={d.noDokJaminan || ''} onChange={v => set('noDokJaminan', v)} placeholder="No. dokumen jaminan" />
        </Field>
        <Field label="Status Dokumen Jaminan">
          <Select value={d.statusDokJaminan || ''} onChange={v => set('statusDokJaminan', v)} placeholder="-- Pilih --" options={STATUS_DOK_OPTIONS} />
        </Field>
        <Field label={schema.dokTglLabel}>
          <DateInput value={d.tglDok || ''} onChange={v => set('tglDok', v)} />
        </Field>
      </FormGrid>

      <hr className="section-divider" />

      <h4 className="section-title" style={{ marginTop: 0 }}>{schema.dataTitle}</h4>
      <FormGrid cols={2}>
        {schema.fields.map(renderField)}
      </FormGrid>
    </Modal>
  );
}

function EntriJaminanKolektifScreen({ onNavigate, showToast }) {
  const [jenis, setJenis] = React.useState('');
  const [master, setMaster] = React.useState({ asuransi: 'Tidak Diasuransikan', jenisProduk: 'Reguler', tipeAppraisal: 'INTERNAL', appraisal: true, untukTinggal: false });
  const [items, setItems] = React.useState([]);
  const [selIdx, setSelIdx] = React.useState(null);
  const [sourceFile, setSourceFile] = React.useState('');
  const [modal, setModal] = React.useState(null); // { mode:'add'|'edit', index? } | null
  const [tab, setTab] = React.useState('umum');
  const setM = (k, v) => setMaster(s => ({ ...s, [k]: v }));

  const schema = KOLEKTIF_SCHEMAS[jenis];

  const changeJenis = (v) => {
    setJenis(v);
    setSelIdx(null);
    setSourceFile('');
    setMaster(s => ({ ...s, jenisAgunan: KOLEKTIF_JENIS_AGUNAN[v] || '' }));
    setItems((KOLEKTIF_SCHEMAS[v]?.seed || []).map(s => ({ ...s })));
  };

  const removeSelected = () => {
    if (selIdx == null) return;
    setItems(arr => arr.filter((_, i) => i !== selIdx));
    setSelIdx(null);
    showToast({ type: 'warn', title: 'Detail dihapus' });
  };

  const cellValue = (col, it) => {
    const raw = it[col.key];
    if (raw == null || raw === '') return <span className="text-muted">—</span>;
    if (col.money) return window.fmtRp(Number(raw) || 0);
    return raw;
  };

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Entri Data Jaminan Kolektif
      </h2>

      <div className="hl-card" style={{ padding: 20 }}>
        <FormGrid cols={2}>
          <Field label="Jenis Jaminan" required>
            <Select
              value={jenis}
              onChange={changeJenis}
              placeholder="-- Pilih jenis jaminan --"
              options={['Properti Kolektif', 'Kendaraan Kolektif', 'Mesin / Alat Berat Kolektif']}
            />
          </Field>
        </FormGrid>
      </div>

      {!schema ? (
        <div className="tbl-empty" style={{ padding: '48px 0', textAlign: 'center' }}>
          Pilih jenis jaminan untuk menampilkan form detail.
        </div>
      ) : (
        <>
          <SectionTabs value={tab} onChange={setTab} tabs={[
            { id: 'umum',     label: 'Data Umum' },
            { id: 'spesifik', label: `Data Spesifik — ${KOLEKTIF_JENIS_AGUNAN[jenis]}` },
          ]} />

          {/* ── Tab Data Umum: generic untuk semua jenis jaminan ── */}
          <div style={{ display: tab === 'umum' ? 'block' : 'none', marginTop: 16 }}>
            <h4 className="section-title" style={{ marginTop: 0 }}>Data Umum</h4>
            <FormGrid cols={2}>
              <Field label="Nasabah" required>
                <LookupInput value={master.nasabah || ''} onChange={v => setM('nasabah', v)} placeholder="-- Cari nasabah --" />
              </Field>
              <Field label="Pemilik Agunan" required>
                <TextInput value={master.pemilikAgunan || ''} onChange={v => setM('pemilikAgunan', v)} placeholder="Nama pemilik agunan" />
              </Field>
              <Field label="Jenis Agunan">
                <input className="input input--readonly" readOnly value={master.jenisAgunan || ''} />
              </Field>
              <Field label="Cabang" required>
                <LookupInput value={master.cabang || ''} onChange={v => setM('cabang', v)} placeholder="-- Pilih cabang --" />
              </Field>
              <Field label="Alamat Jalan" required>
                <TextInput value={master.alamat || ''} onChange={v => setM('alamat', v)} placeholder="Alamat jalan" />
              </Field>
              <Field label="Kelurahan" required>
                <TextInput value={master.kelurahan || ''} onChange={v => setM('kelurahan', v)} />
              </Field>
              <Field label="Kecamatan" required>
                <TextInput value={master.kecamatan || ''} onChange={v => setM('kecamatan', v)} />
              </Field>
              <Field label="Kode Pos">
                <TextInput value={master.kodePos || ''} onChange={v => setM('kodePos', v)} />
              </Field>
              <Field label="Dati 2" required>
                <TextInput value={master.dati2 || ''} onChange={v => setM('dati2', v)} placeholder="Kabupaten / Kota" />
              </Field>
              <Field label="Bukti Kepemilikan" required>
                <Select value={master.buktiKepemilikan || ''} onChange={v => setM('buktiKepemilikan', v)} placeholder="-- Pilih --" options={BUKTI_KEPEMILIKAN_OPTIONS} />
              </Field>
              <Field label="Asuransi">
                <Select value={master.asuransi} onChange={v => setM('asuransi', v)} options={KOLEKTIF_ASURANSI_OPTIONS} />
              </Field>
              <Field label="Jenis Produk">
                <Select value={master.jenisProduk} onChange={v => setM('jenisProduk', v)} options={KOLEKTIF_JENIS_PRODUK_OPTIONS} />
              </Field>
              <Field label="">
                <label className="cbx"><input type="checkbox" checked={!!master.appraisal} onChange={e => setM('appraisal', e.target.checked)} /> Appraisal</label>
              </Field>
            </FormGrid>

            <hr className="section-divider" />

            <h4 className="section-title" style={{ marginTop: 0 }}>Data Penilaian Terakhir</h4>
            <FormGrid cols={2}>
              <Field label="Tgl Appraisal Terakhir" required>
                <DateInput value={master.tglAppraisal || ''} onChange={v => setM('tglAppraisal', v)} />
              </Field>
              <Field label="Tipe Appraisal" required>
                <Select value={master.tipeAppraisal} onChange={v => setM('tipeAppraisal', v)} options={TIPE_APPRAISAL_OPTIONS} />
              </Field>
              <Field label="Appraisal Agent" required>
                <TextInput value={master.appraisalAgent || ''} onChange={v => setM('appraisalAgent', v)} />
              </Field>
              <Field label="Nama Petugas Appraisal" required>
                <TextInput value={master.namaPetugas || ''} onChange={v => setM('namaPetugas', v)} />
              </Field>
              <Field label="Nilai Pengikatan" required>
                <CurrencyInput value={master.nilaiPengikatan || ''} onChange={v => setM('nilaiPengikatan', v)} placeholder="0" />
              </Field>
              <Field label="Nilai Pasar" required>
                <CurrencyInput value={master.nilaiPasar || ''} onChange={v => setM('nilaiPasar', v)} placeholder="0" />
              </Field>
              <Field label="Nilai Liquidasi" required>
                <CurrencyInput value={master.nilaiLikuidasi || ''} onChange={v => setM('nilaiLikuidasi', v)} placeholder="0" />
              </Field>
              <Field label="No Dokumen Appraisal">
                <TextInput value={master.noDokAppraisal || ''} onChange={v => setM('noDokAppraisal', v)} />
              </Field>
            </FormGrid>
          </div>

          {/* ── Tab Data Spesifik: detail kolektif per jenis ── */}
          <div style={{ display: tab === 'spesifik' ? 'block' : 'none', marginTop: 16 }}>
            <h4 className="section-title" style={{ marginTop: 0 }}>Agunan {KOLEKTIF_JENIS_AGUNAN[jenis]} Kolektif</h4>

            <div className="btn-bar" style={{ marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
              <button className="btn btn--secondary btn--sm" onClick={() => setModal({ mode: 'add' })}>
                <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
                Tambah Detail
              </button>
              <button className="btn btn--secondary btn--sm" disabled={selIdx == null} onClick={() => setModal({ mode: 'edit', index: selIdx })}>
                <span dangerouslySetInnerHTML={{ __html: Icons.edit(14) }} />
                Edit Detail
              </button>
              <button className="btn btn--sm" style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }} disabled={selIdx == null} onClick={removeSelected}>
                <span dangerouslySetInnerHTML={{ __html: Icons.trash(14) }} />
                Hapus Detail
              </button>
              <button className="btn btn--neutral btn--sm" onClick={() => showToast({ type: 'info', title: 'Download Template', message: `Template ${jenis} diunduh.` })}>
                <span dangerouslySetInnerHTML={{ __html: Icons.download(14) }} />
                Download Template
              </button>
            </div>

            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: 16 }}>
              <div style={{ flex: 1, minWidth: 220 }}>
                <Field label="Source File">
                  <TextInput value={sourceFile} onChange={setSourceFile} placeholder="Pilih file untuk upload massal..." />
                </Field>
              </div>
              <button className="btn btn--neutral btn--sm" onClick={() => setSourceFile('upload-kolektif.xlsx')}>Browse File</button>
              <button className="btn btn--secondary btn--sm" disabled={!sourceFile}
                onClick={() => showToast({ type: 'success', title: 'Upload diproses', message: `${sourceFile} sedang divalidasi.` })}>
                <span dangerouslySetInnerHTML={{ __html: Icons.upload(14) }} />
                Upload
              </button>
            </div>

            {jenis === 'Properti Kolektif' && (
              <label className="cbx" style={{ marginBottom: 16 }}>
                <input type="checkbox" checked={!!master.untukTinggal} onChange={e => setM('untukTinggal', e.target.checked)} />
                Property Digunakan Untuk Tempat Tinggal
              </label>
            )}

            <h4 className="section-title" style={{ marginTop: 0 }}>Detail {schema.listTitle} ({items.length})</h4>
            <div style={{ overflowX: 'auto' }}>
              <table className="tbl">
                <thead>
                  <tr>
                    <th style={{ width: 50 }}>No</th>
                    {schema.columns.map(c => (
                      <th key={c.key} className={c.align === 'right' ? 'text-right' : ''}>{c.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr className="tbl-row--empty"><td colSpan={schema.columns.length + 1} className="tbl-empty">Belum ada data. Klik "Tambah Detail" atau upload file.</td></tr>
                  ) : items.map((it, i) => (
                    <tr key={i} className={'tbl-row--clickable' + (selIdx === i ? ' tbl-row--selected' : '')} onClick={() => setSelIdx(i)}>
                      <td className="mono">{i + 1}</td>
                      {schema.columns.map(c => (
                        <td key={c.key} className={(c.mono ? 'mono ' : '') + (c.align === 'right' ? 'text-right' : '')}>{cellValue(c, it)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <div className="btn-bar btn-bar--between" style={{ marginTop: 24 }}>
        <button className="btn btn--neutral" onClick={() => onNavigate('/jaminan/daftar')}>Batal</button>
        <button className="btn btn--primary"
          onClick={() => {
            if (!schema) {
              showToast({ type: 'warn', title: 'Jenis belum dipilih', message: 'Pilih jenis jaminan terlebih dahulu.' });
              return;
            }
            if (items.length === 0) {
              showToast({ type: 'warn', title: 'Daftar kosong', message: 'Tambahkan minimal satu detail.' });
              return;
            }
            showToast({ type: 'success', title: 'Kolektif tersimpan', message: `${items.length} ${jenis} berhasil didaftarkan.` });
            onNavigate('/jaminan/daftar');
          }}>
          <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(16) }} />
          Simpan
        </button>
      </div>

      {modal && schema && (
        <KolektifDetailModal
          jenis={jenis}
          schema={schema}
          initial={modal.mode === 'edit' ? items[modal.index] : {}}
          onClose={() => setModal(null)}
          onSave={(d) => {
            if (modal.mode === 'edit') {
              setItems(arr => arr.map((x, i) => i === modal.index ? d : x));
              showToast({ type: 'success', title: 'Detail diperbarui' });
            } else {
              setItems(arr => [...arr, d]);
              showToast({ type: 'success', title: 'Detail ditambahkan' });
            }
            setModal(null);
          }}
        />
      )}
    </div>
  );
}

/* ─────────── DetailAgunan (Figma 6.1.1) ─────────── */
function DetailAgunanScreen({ onNavigate, kode, showToast }) {
  const row = React.useMemo(() => {
    return window.MOCK_JAMINAN.find(j => j.noJaminan === kode) || window.MOCK_JAMINAN[0];
  }, [kode]);

  // Compose a full-detail object from the row + sensible defaults.
  const form = React.useMemo(() => ({
    namaNasabah:    row.nama,
    jenisJaminan:   row.jenis,
    kodeJaminan:    row.noJaminan,
    pemilikAgunan:  'Nasabah sendiri',
    cabang:         row.cabang || '001 - Kantor Pusat',
    alamat1:        'Jl. Sudirman Kav. 52-53, RT. 005 / RW. 003',
    kelurahan:      'Senayan',
    kecamatan:      'Kebayoran Baru',
    kodePos:        '12190',
    provinsi:       'DKI Jakarta',
    buktiKepemilikan: 'SHM',
    asuransi:       'Allianz Syariah',
    jenisProduk:    'KPR Murabahah',
    tglAppraisal:   row.tglAppraisal,
    tipeAppraisal:  'KJPP (Eksternal)',
    appraisalAgent: row.appraisal,
    namaPetugas:    'Ir. Budi Hartono, MAPPI',
    nilaiLegal:     row.nilai,
    nilaiPasar:     Math.round(row.nilai * 1.1),
    nilaiTaksasi:   Math.round(row.nilai * 0.95),
    nilaiLikuidasi: Math.round(row.nilai * 0.7),
    noDokAppraisal: 'APR-2026-' + row.noJaminan.slice(-4),
    noDokJaminan:   'SHM-' + row.noJaminan.slice(-6),
    statusDokJaminan: 'Asli',
    tglJTDokJaminan: '06 / 10 / 2030',
    // Section 2 — Data Properti
    noObjek:        row.noJaminan + '-01',
    tipeProperti:   row.jenis.includes('Properti') ? 'Rumah Tinggal' : 'Tanah Kosong',
    statusObjek:    row.status,
    namaPemegangHak: row.nama,
    luasTanah:      220,
    luasBangunan:   180,
    tglObjek:       '01 / 02 / 2018',
    tglJTObjek:     '01 / 02 / 2048',
    njopBangunan:   Math.round(row.nilai * 0.85),
    tahunNjop:      '2025',
    lokasi:         'Jl. Sudirman Kav. 52-53, Jakarta Selatan',
    noIMB:          'IMB-2018-' + row.noJaminan.slice(-4),
  }), [row]);

  const [outer, setOuter] = React.useState('jaminan');
  const [section, setSection] = React.useState('s1');

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Detail Agunan
      </h2>

      <SectionTabs
        value={outer}
        onChange={setOuter}
        tabs={[
          { id: 'jaminan',    label: 'Data Jaminan' },
          { id: 'pengikatan', label: 'Pengikatan dan Asuransi' },
        ]}
      />

      {outer === 'jaminan' && (
        <>
          <h4 className="section-title" style={{ marginTop: 0 }}>Data Jaminan</h4>
          <JenisJaminanHero form={form} setField={() => {}} readOnly />

          <SectionTabs
            value={section}
            onChange={setSection}
            tabs={[
              { id: 's1', label: 'Informasi Umum' },
              { id: 's2', label: `Data ${form.jenisJaminan?.split(' ')[0] || 'Properti'}` },
            ]}
          />

          {section === 's1' && <SectionInformasiUmum form={form} setField={() => {}} readOnly />}
          {section === 's2' && <SectionDataProperti  form={form} setField={() => {}} readOnly />}

          <div className="btn-bar btn-bar--between" style={{ marginTop: 24 }}>
            <button className="btn btn--neutral" onClick={() => onNavigate('/jaminan/daftar')}>
              <span dangerouslySetInnerHTML={{ __html: Icons.arrowL(14) }} />
              Kembali
            </button>
            <div className="row gap-12">
              {section === 's1' && (
                <button className="btn btn--primary" onClick={() => setSection('s2')}>
                  Selanjutnya
                  <span dangerouslySetInnerHTML={{ __html: Icons.arrowR ? Icons.arrowR(14) : '' }} />
                </button>
              )}
              {section === 's2' && (
                <button className="btn btn--secondary" onClick={() => setSection('s1')}>Sebelumnya</button>
              )}
            </div>
          </div>
        </>
      )}

      {outer === 'pengikatan' && (
        <>
          <h4 className="section-title" style={{ marginTop: 0 }}>Pengikatan Agunan</h4>
          <FormGrid cols={3}>
            <Disp label="Jenis Pengikatan" value="Hak Tanggungan (HT) Peringkat I" />
            <Disp label="No. Akta Pengikatan" value={'APHT-' + row.noJaminan.slice(-4)} mono />
            <Disp label="Tgl. Akta Pengikatan" value="14 / 03 / 2024" mono />

            <Disp label="Nilai Pengikatan" value={window.fmtRp(Math.round(row.nilai * 1.25))} mono />
            <Disp label="Notaris / PPAT" value="Ny. Soegiarti Wijaya, S.H., M.Kn" />
            <Disp label="Nomor Bilyet HT" value={'HT-2024-' + row.noJaminan.slice(-5)} mono />

            <Disp label="Status Pengikatan" value="Diikat" />
            <Disp label="Tgl. Pencatatan BPN" value="20 / 03 / 2024" mono />
            <Disp label="No. Sertifikat HT" value={'HT.' + row.noJaminan.slice(-4) + '/2024'} mono />
          </FormGrid>

          <hr className="section-divider" />

          <h4 className="section-title" style={{ marginTop: 0 }}>Polis Asuransi</h4>
          <FormGrid cols={3}>
            <Disp label="Perusahaan Asuransi" value="Allianz Syariah Indonesia" />
            <Disp label="Nomor Polis" value={'POL-' + row.noJaminan.slice(-6)} mono />
            <Disp label="Jenis Pertanggungan" value="Property All Risk (PAR)" />

            <Disp label="Nilai Pertanggungan" value={window.fmtRp(row.nilai)} mono />
            <Disp label="Premi Tahunan" value={window.fmtRp(Math.round(row.nilai * 0.0025))} mono />
            <Disp label="Banker's Clause" value="Ya — Bank sebagai pihak tertanggung" />

            <Disp label="Tgl. Mulai Polis" value="01 / 04 / 2025" mono />
            <Disp label="Tgl. Berakhir Polis" value="01 / 04 / 2026" mono />
            <div className="disp">
              <div className="disp__label">Status Polis</div>
              <div><StatusTag status="Aktif" /></div>
            </div>
          </FormGrid>

          <h4 className="section-title">Dokumen Pendukung</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['SHM-1024.pdf', 'Surat Kuasa Membebani Hak Tanggungan.pdf', 'Akta Notaris APHT.pdf', 'Polis Asuransi PAR.pdf'].map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', border: '1px solid var(--c-border-soft)', borderRadius: 6 }}>
                <span style={{ color: 'var(--c-primary)' }} dangerouslySetInnerHTML={{ __html: Icons.doc(18) }} />
                <span style={{ flex: 1, fontSize: 13 }}>{d}</span>
                <button className="icon-btn" dangerouslySetInnerHTML={{ __html: Icons.download(14) }} />
              </div>
            ))}
          </div>

          <div className="btn-bar btn-bar--between" style={{ marginTop: 24 }}>
            <button className="btn btn--neutral" onClick={() => onNavigate('/jaminan/daftar')}>
              <span dangerouslySetInnerHTML={{ __html: Icons.arrowL(14) }} />
              Kembali
            </button>
            <button className="btn btn--secondary"
              onClick={() => showToast({ type: 'success', title: 'Edit Jaminan', message: 'Form edit akan dibuka.' })}>
              <span dangerouslySetInnerHTML={{ __html: Icons.edit(14) }} />
              Edit Jaminan
            </button>
          </div>
        </>
      )}
    </div>
  );
}

Object.assign(window, {
  EntriJaminanIndividualScreen,
  EntriJaminanKolektifScreen,
  DetailAgunanScreen,
});
