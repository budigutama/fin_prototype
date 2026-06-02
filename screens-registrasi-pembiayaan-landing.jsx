/* screens-registrasi-pembiayaan-landing.jsx
   Landing page sebelum masuk ke form 6-section per akad. */

function LandingRegistrasiPembiayaanScreen({ onNavigate, showToast }) {
  const [form, setForm] = React.useState({
    nasabahKode: '0000000623123',
    nasabahNama: 'Heri Tapiheru',
    kodeBisnis: '',
    produk: 'Murabahah',
    segmen: '',
    fasilitas: '',
    akad: '',
    objekId: 'FAS0128321',
    namaObjek: 'FAS0128321',
    nomorIdentitas: '09408234',
    alamatObjek: '',
    keterangan: 'Buka Pembiayaan Baru',
    kodeValuta: 'IDR - Rupiah',
    tanggalPengadaan: '10-Jan-2022',
    nilaiObjek: '1090000000',
    jumlah: '100000000',
    uangMuka: '0',
  });
  const [lookupOpen, setLookupOpen] = React.useState(false);

  // Map Produk (display) → akad slug used in form route
  const produkToAkad = {
    'Murabahah':  'murabahah',
    'Mudharabah': 'mudharabah',
    'Musyarakah': 'mudharabah',
    'MMQ':        'mmq',
    'Ijarah':     'ijarah',
    'Istishna':   'istishna',
    'Qardh':      'qardh',
    'PRKS':       'prks',
  };

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    const akad = produkToAkad[form.produk] || 'murabahah';
    // Pass along context as query (optional — form uses its own state for now)
    onNavigate(`/registrasi/pembiayaan/form?akad=${akad}`);
  };

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Registrasi Pembiayaan
      </h2>

      <div style={{ marginTop: 24 }}>
        <Field label="Nasabah" required>
          <LookupInput
            value={form.nasabahKode ? `${form.nasabahKode} - ${form.nasabahNama}` : ''}
            placeholder="-- Cari nasabah --"
            onOpen={() => setLookupOpen(true)}
          />
        </Field>

        <div style={{ marginTop: 16 }}>
          <FormGrid>
            <Field label="Kode Bisnis" required>
              <Select
                value={form.kodeBisnis}
                onChange={v => setField('kodeBisnis', v)}
                options={['01 - Korporasi', '02 - Komersial', '03 - Retail', '04 - Konsumer', '05 - UMKM']}
              />
            </Field>
            <Field label="Produk" required>
              <Select
                value={form.produk}
                onChange={v => setField('produk', v)}
                options={['Murabahah', 'Mudharabah', 'Musyarakah', 'MMQ', 'Ijarah', 'Istishna', 'Qardh', 'PRKS']}
              />
            </Field>

            <Field label="Segmen" required>
              <Select
                value={form.segmen}
                onChange={v => setField('segmen', v)}
                options={['Segmen 1 - Reguler', 'Segmen 2 - Prioritas', 'Segmen 3 - Korporat', 'Segmen 4 - Mikro']}
              />
            </Field>
            <Field label="Fasilitas" required>
              <Select
                value={form.fasilitas}
                onChange={v => setField('fasilitas', v)}
                options={['Buat Fasilitas Baru', ...window.MOCK_FASILITAS.filter(f => f.status === 'Aktif').map(f => `${f.noFasilitas} — ${f.nama}`)]}
              />
            </Field>

            <Field label="Akad" required>
              <Select
                value={form.akad}
                onChange={v => setField('akad', v)}
                options={['Murabahah Investasi', 'Murabahah Modal Kerja', 'Murabahah Konsumtif', 'Murabahah Take Over']}
              />
            </Field>
          </FormGrid>
        </div>

        <hr className="section-divider" />

        <FormGrid>
          <Field label="Objek ID" required>
            <TextInput value={form.objekId} onChange={v => setField('objekId', v)} readOnly />
          </Field>
          <Field label="Nama Objek" required>
            <TextInput value={form.namaObjek} onChange={v => setField('namaObjek', v)} readOnly />
          </Field>

          <Field label="Nomor Identitas" required>
            <TextInput value={form.nomorIdentitas} onChange={v => setField('nomorIdentitas', v)} />
          </Field>
          <Field label="Alamat Objek Proyek" required>
            <TextInput
              value={form.alamatObjek}
              onChange={v => setField('alamatObjek', v)}
              placeholder="Masukan alamat objek proyek"
            />
          </Field>

          <Field label="Keterangan" span="full">
            <div style={{ position: 'relative', maxWidth: 'calc(50% - 12px)' }}>
              <TextInput value={form.keterangan} onChange={v => setField('keterangan', v)} />
              <button
                style={{
                  position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
                  width: 28, height: 28, border: 0, background: 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--c-text-muted)', borderRadius: 4,
                }}
                title="Edit"
                dangerouslySetInnerHTML={{ __html: Icons.edit(14) }}
              />
            </div>
          </Field>

          <Field label="Kode Valuta" required>
            <Select
              value={form.kodeValuta}
              onChange={v => setField('kodeValuta', v)}
              options={['IDR - Rupiah', 'USD - US Dollar', 'SGD - Singapore Dollar', 'EUR - Euro']}
            />
          </Field>
          <Field label="Tanggal Pengadaan" required>
            <DateInput value={form.tanggalPengadaan} onChange={v => setField('tanggalPengadaan', v)} />
          </Field>

          <Field label="Nilai Objek Pembiayaan" required>
            <CurrencyInput value={form.nilaiObjek} onChange={v => setField('nilaiObjek', v)} />
          </Field>
          <Field label="Jumlah" required>
            <CurrencyInput value={form.jumlah} onChange={v => setField('jumlah', v)} />
          </Field>

          <Field label="Uang Muka" required>
            <CurrencyInput value={form.uangMuka} onChange={v => setField('uangMuka', v)} />
          </Field>
        </FormGrid>
      </div>

      <div className="btn-bar btn-bar--between">
        <button
          className="btn"
          style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }}
          onClick={() => onNavigate('/list-pembiayaan')}>
          Batal
        </button>
        <button className="btn btn--primary" onClick={submit}>
          <span dangerouslySetInnerHTML={{ __html: Icons.arrowR(14) }} />
          Registrasi Pembiayaan
        </button>
      </div>

      <NasabahLookup
        open={lookupOpen}
        onClose={() => setLookupOpen(false)}
        onSelect={n => setForm(f => ({ ...f, nasabahKode: n.kode, nasabahNama: n.nama }))}
      />
    </div>
  );
}

window.LandingRegistrasiPembiayaanScreen = LandingRegistrasiPembiayaanScreen;
