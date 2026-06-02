/* screens-simulasi.jsx — Perhitungan Simulasi Angsuran
   Modeled exactly on the Figma 1.-Simulasi frames. */

function SimulasiScreen({ onNavigate, akad: akadProp }) {
  // akad variants
  const variants = {
    murabahah:  { label: 'Murabahah, Qardh dan Istishna\'', hasUangMuka: true,  hasGrace: true,  hasNisbah: false, hasUjroh: false },
    ijarah:     { label: 'Ijarah',                          hasUangMuka: true,  hasGrace: true,  hasNisbah: false, hasUjroh: true  },
    mudharabah: { label: 'Mudharabah dan Musyarakah',       hasUangMuka: false, hasGrace: false, hasNisbah: true,  hasUjroh: false },
    mmq:        { label: 'MMQ (Musyarakah Mutanaqishah)',   hasUangMuka: true,  hasGrace: true,  hasNisbah: true,  hasUjroh: false },
    prks:       { label: 'PRKS (Pembiayaan Rekening Koran)',hasUangMuka: false, hasGrace: false, hasNisbah: false, hasUjroh: false },
    gadai:      { label: 'Gadai',                           hasUangMuka: false, hasGrace: false, hasNisbah: false, hasUjroh: true  },
    denda:      { label: 'Denda Ta\'zir dan Ta\'wid',       hasUangMuka: false, hasGrace: false, hasNisbah: false, hasUjroh: false, isDenda: true },
  };
  const akad = akadProp || 'murabahah';
  const cfg = variants[akad] || variants.murabahah;

  const [form, setForm] = React.useState({
    nasabah: '', nasabahKode: '', nasabahNama: '',
    hargaBarang: '1000000000', uangMuka: '10000000', uangMukaPct: '1',
    besarPembiayaan: '',
    tenor: '12', periode: 'Bulanan',
    akadEfr: '12', efrKeringanan: '',
    harga: 'Efektif',
    tanggalAwal: '05-Agustus-2023',
    grace: '0', angsKe: '0',
    nisbah: '60', // for mudharabah/MMQ
    ujroh: '12',  // for ijarah/gadai
  });

  const [lookupOpen, setLookupOpen] = React.useState(false);
  const [result, setResult] = React.useState(null);

  // Auto-calc Besar Pembiayaan
  React.useEffect(() => {
    if (cfg.hasUangMuka) {
      const h = Number(form.hargaBarang || 0);
      const u = Number(form.uangMuka || 0);
      setForm(f => ({ ...f, besarPembiayaan: String(Math.max(0, h - u)) }));
    } else {
      setForm(f => ({ ...f, besarPembiayaan: f.hargaBarang }));
    }
    // eslint-disable-next-line
  }, [form.hargaBarang, form.uangMuka, cfg.hasUangMuka]);

  const calculate = () => {
    const P = Number(form.besarPembiayaan) || 0;
    const months = Number(form.tenor) || 12;
    const rate = (Number(form.akadEfr) || 0) / 100;
    // Effective annual → monthly
    const i = rate / 12;
    let angsuran = 0, totalMargin = 0;
    if (form.harga === 'Efektif' && i > 0) {
      // Annuity
      angsuran = P * i * Math.pow(1 + i, months) / (Math.pow(1 + i, months) - 1);
      totalMargin = angsuran * months - P;
    } else {
      // Flat
      totalMargin = P * rate * (months / 12);
      angsuran = (P + totalMargin) / months;
    }
    const schedule = [];
    let sisa = P;
    for (let m = 1; m <= months; m++) {
      const margin = form.harga === 'Efektif' && i > 0 ? sisa * i : totalMargin / months;
      const pokok = angsuran - margin;
      sisa = Math.max(0, sisa - pokok);
      schedule.push({ ke: m, pokok, margin, total: angsuran, sisa });
    }
    setResult({ angsuran, totalMargin, totalPayment: P + totalMargin, months, schedule });
    setTimeout(() => {
      document.querySelector('.simulasi-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const reset = () => {
    setForm({
      nasabah: '', nasabahKode: '', nasabahNama: '',
      hargaBarang: '', uangMuka: '', uangMukaPct: '',
      besarPembiayaan: '', tenor: '', periode: 'Bulanan',
      akadEfr: '', efrKeringanan: '', harga: 'Efektif',
      tanggalAwal: '', grace: '0', angsKe: '0',
      nisbah: '', ujroh: '',
    });
    setResult(null);
  };

  return (
    <>
      <div className="card">
        <h2 className="page__title">
          Perhitungan Simulasi Angsuran
          <span className="subtitle">{cfg.label}</span>
        </h2>

        <div style={{ marginTop: 24 }}>
          <Field label="Nama Nasabah" required>
            <LookupInput
              value={form.nasabahNama ? `${form.nasabahKode} - ${form.nasabahNama}` : ''}
              onChange={() => {}}
              placeholder="--Cari nasabah--"
              onOpen={() => setLookupOpen(true)}
            />
          </Field>

          <div style={{ marginTop: 16 }}>
            <FormGrid>
              <Field label="Harga Barang" required>
                <CurrencyInput
                  value={form.hargaBarang}
                  onChange={v => setForm(f => ({ ...f, hargaBarang: v }))}
                  placeholder="0"
                />
              </Field>
              {cfg.hasUangMuka && (
                <Field label="Uang Muka" required>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ flex: 1 }}>
                      <CurrencyInput
                        value={form.uangMuka}
                        onChange={v => {
                          const h = Number(form.hargaBarang) || 1;
                          const pct = (Number(v) / h * 100).toFixed(1);
                          setForm(f => ({ ...f, uangMuka: v, uangMukaPct: pct }));
                        }}
                        placeholder="0"
                      />
                    </div>
                    <div style={{ width: 90 }}>
                      <NumberInput
                        value={form.uangMukaPct}
                        onChange={v => {
                          const h = Number(form.hargaBarang) || 0;
                          const um = Math.round(h * Number(v) / 100);
                          setForm(f => ({ ...f, uangMukaPct: v, uangMuka: String(um) }));
                        }}
                        suffix="%"
                      />
                    </div>
                  </div>
                </Field>
              )}

              <Field label={cfg.isDenda ? 'Pokok Tertunggak' : 'Besar Pembiayaan'} required span="full">
                <CurrencyInput value={form.besarPembiayaan} readOnly />
              </Field>

              <Field label={cfg.isDenda ? 'Hari Tunggakan' : 'Jangka Waktu Pembiayaan'} required>
                <NumberInput
                  value={form.tenor}
                  onChange={v => setForm(f => ({ ...f, tenor: v }))}
                  suffix={cfg.isDenda ? 'Hari' : 'Bulan'}
                />
              </Field>
              <Field label="Periode" required>
                <Select
                  value={form.periode}
                  onChange={v => setForm(f => ({ ...f, periode: v }))}
                  options={['Bulanan', 'Mingguan', 'Triwulan', 'Semesteran', 'Tahunan']}
                  placeholder="--Pilih jangka waktu--"
                />
              </Field>

              {!cfg.isDenda && (
                <>
                  <Field label={cfg.hasNisbah ? 'Nisbah Bank' : 'Akad EFR'} required>
                    <NumberInput
                      value={cfg.hasNisbah ? form.nisbah : form.akadEfr}
                      onChange={v => setForm(f => cfg.hasNisbah ? { ...f, nisbah: v } : { ...f, akadEfr: v })}
                      suffix="%"
                    />
                  </Field>
                  <Field label={cfg.hasUjroh ? 'Ujroh' : 'EFR Keringanan'} required>
                    <NumberInput
                      value={cfg.hasUjroh ? form.ujroh : form.efrKeringanan}
                      onChange={v => setForm(f => cfg.hasUjroh ? { ...f, ujroh: v } : { ...f, efrKeringanan: v })}
                      suffix="%"
                    />
                  </Field>

                  <Field label="Harga" required span="full">
                    <Select
                      value={form.harga}
                      onChange={v => setForm(f => ({ ...f, harga: v }))}
                      options={['Efektif', 'Flat', 'Annuitas']}
                      placeholder="--Pilih harga--"
                    />
                  </Field>

                  <Field label="Tanggal Awal Angsuran" required span="full">
                    <DateInput
                      value={form.tanggalAwal}
                      onChange={v => setForm(f => ({ ...f, tanggalAwal: v }))}
                      placeholder="--Pilih tanggal awal cicilan--"
                    />
                  </Field>

                  {cfg.hasGrace && (
                    <>
                      <Field label="Grace Angs Pokok" required>
                        <NumberInput value={form.grace} onChange={v => setForm(f => ({ ...f, grace: v }))} />
                      </Field>
                      <Field label="Angs ke 1 s.d. Angs ke" required>
                        <NumberInput value={form.angsKe} onChange={v => setForm(f => ({ ...f, angsKe: v }))} />
                      </Field>
                    </>
                  )}
                </>
              )}

              {cfg.isDenda && (
                <>
                  <Field label="Tarif Denda Ta'zir" required>
                    <NumberInput value="0.05" suffix="% / hari" readOnly />
                  </Field>
                  <Field label="Tarif Ta'wid" required>
                    <NumberInput value="0.025" suffix="% / hari" readOnly />
                  </Field>
                </>
              )}
            </FormGrid>
          </div>
        </div>

        <div className="btn-bar">
          <button className="btn btn--secondary" onClick={reset}>Mengatur Ulang</button>
          <button className="btn btn--primary" onClick={calculate}>
            <span dangerouslySetInnerHTML={{ __html: Icons.calc(16) }} />
            Hitung Simulasi
          </button>
        </div>
      </div>

      {result && (
        <div className="card simulasi-result">
          <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 16px' }}>
            Hasil Perhitungan Simulasi Angsuran
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
            <Disp label="Angsuran per Bulan"  large value={window.fmtRp(result.angsuran)} />
            <Disp label="Total Margin"        large value={window.fmtRp(result.totalMargin)} />
            <Disp label="Total Pembayaran"    large value={window.fmtRp(result.totalPayment)} />
            <Disp label="Tenor"               large value={result.months + ' bulan'} />
          </div>

          <h4 className="section-title" style={{ marginTop: 24, marginBottom: 12 }}>Jadwal Angsuran</h4>
          <DataTable
            showSearch={false}
            showPagination={result.schedule.length > 10}
            pageSize={12}
            columns={[
              { key: 'ke', label: 'Angs. Ke', width: 80, align: 'center', render: r => <span className="mono">{r.ke}</span> },
              { key: 'tgl', label: 'Tanggal Jatuh Tempo', render: r => <span className="mono">{addMonths('05-Agustus-2023', r.ke)}</span> },
              { key: 'pokok', label: 'Angsuran Pokok', align: 'right', render: r => <span className="mono">{window.fmtRp(r.pokok)}</span> },
              { key: 'margin', label: 'Margin', align: 'right', render: r => <span className="mono">{window.fmtRp(r.margin)}</span> },
              { key: 'total', label: 'Total Angsuran', align: 'right', render: r => <span className="mono fw-600">{window.fmtRp(r.total)}</span> },
              { key: 'sisa', label: 'Sisa Pokok', align: 'right', render: r => <span className="mono">{window.fmtRp(r.sisa)}</span> },
            ]}
            data={result.schedule}
          />

          <div className="btn-bar">
            <button className="btn btn--neutral" onClick={() => window.print()}>
              <span dangerouslySetInnerHTML={{ __html: Icons.print(16) }} />
              Cetak Simulasi
            </button>
            <button className="btn btn--primary" onClick={() => onNavigate('/registrasi-fasilitas')}>
              Lanjut ke Registrasi Fasilitas
              <span dangerouslySetInnerHTML={{ __html: Icons.arrowR(16) }} />
            </button>
          </div>
        </div>
      )}

      <NasabahLookup
        open={lookupOpen}
        onClose={() => setLookupOpen(false)}
        onSelect={n => setForm(f => ({ ...f, nasabahKode: n.kode, nasabahNama: n.nama }))}
      />
    </>
  );
}

// Simple date offset for schedule
function addMonths(base, m) {
  // base is like "05-Agustus-2023"
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  const monthsFull = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  try {
    const parts = base.split('-');
    const day = parseInt(parts[0], 10);
    const monIdx = monthsFull.findIndex(x => x.startsWith(parts[1]));
    const year = parseInt(parts[2], 10);
    const d = new Date(year, monIdx, day);
    d.setMonth(d.getMonth() + m);
    return `${String(d.getDate()).padStart(2, '0')}-${months[d.getMonth()]}-${d.getFullYear()}`;
  } catch (e) {
    return '-';
  }
}

window.SimulasiScreen = SimulasiScreen;
