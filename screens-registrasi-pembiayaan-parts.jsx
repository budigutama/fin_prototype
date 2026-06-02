/* screens-registrasi-pembiayaan-parts.jsx
   Section sub-components for Registrasi Pembiayaan. */

/* ─────────── Section 1: Data Rekening ─────────── */
function RegPembS1({ akad, cfg, form, setForm, setField, onOpenNasabah, goNext, goPrev, onCancel, sectionIdx, total }) {
  return (
    <>
      <h4 className="section-title" style={{ marginTop: 0 }}>Informasi Umum</h4>
      <FormGrid>
        <Field label="Nasabah" required>
          <LookupInput
            value={form.nasabahKode ? `${form.nasabahKode} - ${form.nasabahNama}` : ''}
            placeholder="-- Cari nasabah --"
            onOpen={onOpenNasabah}
          />
        </Field>
        <Field label="Grup Nasabah" required>
          <Select
            value={form.grupNasabah}
            onChange={v => setField('grupNasabah', v)}
            options={['GRP-001 - Karyawan', 'GRP-002 - Wiraswasta', 'GRP-003 - Profesional']}
          />
        </Field>

        <Field label="Produk" required>
          <Select
            value={form.produk}
            onChange={v => setField('produk', v)}
            options={['Murabahah Investasi', 'Murabahah Modal Kerja', 'Murabahah Konsumtif', 'Ijarah Multijasa', 'MMQ Properti']}
          />
        </Field>
        <Field label="Kode Valuta" required>
          <Select value={form.kodeValuta} onChange={v => setField('kodeValuta', v)} options={['IDR - Rupiah', 'USD - US Dollar', 'SGD - Singapore Dollar']} />
        </Field>

        <Field label="Kantor Cabang" required>
          <Select
            value={form.kantorCabang}
            onChange={v => setField('kantorCabang', v)}
            options={['KCP Surapati', '001 - Kantor Pusat', '005 - Bandung Asia Afrika', '012 - Kelapa Gading']}
          />
        </Field>
        <Field label="Pool of Fund" required>
          <Select value={form.poolOfFund} onChange={v => setField('poolOfFund', v)} options={['000', '001 - DPK', '002 - Dana Sendiri']} />
        </Field>

        <Field label="Periode" required>
          <Select
            value={form.periode}
            onChange={v => setField('periode', v)}
            options={['Bulanan', 'Mingguan', 'Triwulan', 'Semesteran', 'Tahunan']}
          />
        </Field>
        <Field label="Jangka Waktu Pembiayaan" required>
          <NumberInput value={form.jangkaWaktu} onChange={v => setField('jangkaWaktu', v)} suffix="Bulan" />
        </Field>

        <Field label="Jenis Margin" required>
          <Select
            value={form.jenisMargin}
            onChange={v => setField('jenisMargin', v)}
            options={['Anuitas', 'Flat', 'Efektif', 'Sliding']}
          />
        </Field>
        <div></div>

        <Field label="Margin/Bagi Hasil" required>
          <NumberInput value={form.marginBagiHasil} onChange={v => setField('marginBagiHasil', v)} suffix="%" />
        </Field>
        <div></div>

        <Field label="Tanggal Akad" required>
          <DateInput value={form.tanggalAkad} onChange={v => setField('tanggalAkad', v)} />
        </Field>
        <Field label="Tanggal Buka" required>
          <DateInput value={form.tanggalBuka} onChange={v => setField('tanggalBuka', v)} />
        </Field>

        <Field label="Nomor Akad" required>
          <TextInput value={form.nomorAkad} onChange={v => setField('nomorAkad', v)} />
        </Field>
        <Field label="Tanggal Pengadaan" required>
          <DateInput value={form.tanggalPengadaan} onChange={v => setField('tanggalPengadaan', v)} />
        </Field>

        <Field label="Tanggal Jatuh Tempo" required>
          <DateInput value={form.tanggalJatuhTempo} onChange={v => setField('tanggalJatuhTempo', v)} />
        </Field>
        <div></div>

        <Field label="Account Officer" required>
          <LookupInput value={form.accountOfficer} onChange={v => setField('accountOfficer', v)} />
        </Field>
        <Field label="Notaris" required>
          <LookupInput value={form.notaris} onChange={v => setField('notaris', v)} placeholder="-- Pilih --" />
        </Field>

        <Field label="Reviewer" required>
          <LookupInput value={form.reviewer} onChange={v => setField('reviewer', v)} />
        </Field>
        <Field label="Approver" required>
          <LookupInput value={form.approver} onChange={v => setField('approver', v)} />
        </Field>

        <Field label="Keterangan">
          <TextInput value={form.keterangan} onChange={v => setField('keterangan', v)} />
        </Field>
        <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 10 }}>
          <label className="cbx">
            <input type="checkbox" checked={form.autoSettle} onChange={e => setField('autoSettle', e.target.checked)} />
            Auto Settle
          </label>
        </div>

        <Field label="Rekening Sumber Pembayaran" required>
          <LookupInput value={form.rekeningSumberPembayaran} onChange={v => setField('rekeningSumberPembayaran', v)} placeholder="-- Pilih --" />
        </Field>
      </FormGrid>

      <hr className="section-divider" />

      <h4 className="section-title" style={{ marginTop: 0 }}>{cfg.infoLabel}</h4>
      {(akad === 'murabahah' || akad === 'istishna' || akad === 'qardh') && (
        <FormGrid>
          <Field label="Harga Pokok Barang" required>
            <CurrencyInput value={form.hargaPokokBarang} onChange={v => {
              setForm(f => ({ ...f, hargaPokokBarang: v, besarPembiayaan: String(Math.max(0, Number(v) - Number(f.uangMuka || 0))) }));
            }} />
          </Field>
          <Field label="Uang muka" required>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <CurrencyInput
                  value={form.uangMuka}
                  onChange={v => {
                    const h = Number(form.hargaPokokBarang) || 1;
                    const pct = (Number(v) / h * 100).toFixed(1);
                    setForm(f => ({ ...f, uangMuka: v, uangMukaPct: pct, besarPembiayaan: String(Math.max(0, h - Number(v))) }));
                  }}
                />
              </div>
              <div style={{ width: 90 }}>
                <NumberInput
                  value={form.uangMukaPct}
                  onChange={v => {
                    const h = Number(form.hargaPokokBarang) || 0;
                    const um = Math.round(h * Number(v) / 100);
                    setForm(f => ({ ...f, uangMukaPct: v, uangMuka: String(um), besarPembiayaan: String(Math.max(0, h - um)) }));
                  }}
                  suffix="%"
                />
              </div>
            </div>
          </Field>
          <Field label="Pricing Model" required>
            <Select
              value={form.pricingModel}
              onChange={v => setField('pricingModel', v)}
              options={['Markup Tetap', 'Markup Bertingkat', 'Bagi Hasil']}
            />
          </Field>
          <div></div>
          <Field label="Besar Pembiayaan" required>
            <CurrencyInput value={form.besarPembiayaan} readOnly />
          </Field>
        </FormGrid>
      )}
      {akad === 'ijarah' && (
        <FormGrid>
          <Field label="Nilai Asset" required>
            <CurrencyInput value={form.nilaiAsset} onChange={v => setField('nilaiAsset', v)} />
          </Field>
          <div></div>
          <Field label="Pricing Model" required>
            <Select value={form.pricingModel} onChange={v => setField('pricingModel', v)} options={['Markup Tetap', 'Markup Bertingkat']} />
          </Field>
          <div></div>
          <Field label="Total Margin" required>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <CurrencyInput value={form.totalMargin} onChange={v => setField('totalMargin', v)} />
              </div>
              <button className="btn btn--primary"
                onClick={() => {
                  const p = Number(form.nilaiAsset) || 0;
                  const r = Number(form.marginBagiHasil) || 0;
                  const t = Number(form.jangkaWaktu) || 1;
                  const m = Math.round(p * r / 100 * (t / 12));
                  setField('totalMargin', String(m));
                  setField('totalPiutan', String(p + m));
                }}>
                <span dangerouslySetInnerHTML={{ __html: Icons.calc(14) }} />
                Hitung
              </button>
            </div>
          </Field>
          <div></div>
          <Field label="Total Piutan" required>
            <CurrencyInput value={form.totalPiutan} readOnly />
          </Field>
        </FormGrid>
      )}
      {akad === 'prks' && (
        <FormGrid>
          <Field label="Plafond PRKS" required>
            <CurrencyInput value={form.plafondPRKS} onChange={v => setField('plafondPRKS', v)} />
          </Field>
          <div></div>
          <Field label="Proyeksi Gross Profit (Bulan)" required>
            <CurrencyInput value={form.proyeksiGrossProfit} onChange={v => setField('proyeksiGrossProfit', v)} />
          </Field>
          <div></div>
          <Field label="Nisbah" required>
            <NumberInput value={form.nisbah} onChange={v => setField('nisbah', v)} suffix="%" />
          </Field>
        </FormGrid>
      )}
      {(akad === 'mudharabah' || akad === 'mmq') && (
        <FormGrid>
          <Field label="Harga Barang" required>
            <CurrencyInput value={form.hargaBarang} onChange={v => setField('hargaBarang', v)} />
          </Field>
          <Field label="Modal Nasabah" required>
            <CurrencyInput value={form.modalNasabah} onChange={v => setField('modalNasabah', v)} />
          </Field>
          <Field label="Total Pembiayaan" required>
            <CurrencyInput value={form.totalPembiayaan} readOnly />
          </Field>
          <div></div>
          <Field label="Model Bagi Hasil" required>
            <Select
              value={form.modelBagiHasil}
              onChange={v => setField('modelBagiHasil', v)}
              options={['Profit Sharing', 'Revenue Sharing', 'Gross Profit Sharing']}
            />
          </Field>
        </FormGrid>
      )}

      <RegistrasiPembiayaanButtons sectionIdx={sectionIdx} total={total} onPrev={goPrev} onNext={goNext} onCancel={onCancel} />
    </>
  );
}

/* ─────────── Section 2: Data Tambahan & Biaya ─────────── */
function RegPembS2({ form, setForm, openBiayaModal, showToast, goNext, goPrev, onCancel, sectionIdx, total }) {
  return (
    <>
      <div className="row row--between mb-16">
        <h4 className="section-title" style={{ margin: 0 }}>Daftar Biaya</h4>
        <button className="btn btn--primary btn--sm" onClick={() => openBiayaModal(null)}>
          <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
          Tambah Data Biaya
        </button>
      </div>

      <DataTable
        showSearch={false}
        showPagination={false}
        columns={[
          { key: 'jenisElemen', label: 'Jenis Elemen', width: 110 },
          { key: 'elemenBiaya', label: 'Elemen Biaya' },
          { key: 'dataVendor',  label: 'Data Vendor / Penerima' },
          { key: 'sumberBiaya', label: 'Sumber', width: 90 },
          { key: 'rekeningSumber', label: 'Rekening Sumber Bayar', render: r => <span className="mono text-sm">{r.rekeningSumber}</span> },
          { key: 'nominalBiaya', label: 'Nominal Biaya', align: 'right', render: r => <span className="mono">{window.fmtRp(r.nominalBiaya)}</span> },
          { key: 'nominalPajak', label: 'Pajak', align: 'right', render: r => <span className="mono text-sm">{window.fmtRp(r.nominalPajak)}</span> },
        ]}
        data={form.biaya}
        popupItems={[
          { id: 'edit',  label: 'Edit Biaya',  icon: 'edit' },
          { id: 'hapus', label: 'Hapus Biaya', icon: 'trash', danger: true },
        ]}
        onPopupClick={(row, id) => {
          if (id === 'edit') {
            const idx = form.biaya.indexOf(row);
            openBiayaModal({ ...row, _idx: idx });
          } else if (id === 'hapus') {
            setForm(f => ({ ...f, biaya: f.biaya.filter(b => b !== row) }));
            showToast({ type: 'warn', title: 'Biaya dihapus', message: row.elemenBiaya });
          }
        }}
      />

      {form.biaya.length > 0 && (
        <div className="row row--end" style={{ marginTop: 16, fontSize: 14 }}>
          <span style={{ marginRight: 32 }}>Total Biaya:</span>
          <span className="mono fw-600" style={{ fontSize: 16 }}>
            {window.fmtRp(form.biaya.reduce((s, b) => s + Number(b.nominalBiaya || 0) + Number(b.nominalPajak || 0), 0))}
          </span>
        </div>
      )}

      <RegistrasiPembiayaanButtons sectionIdx={sectionIdx} total={total} onPrev={goPrev} onNext={goNext} onCancel={onCancel} />
    </>
  );
}

/* ─────────── Section 3: Kelengkapan Data ─────────── */
function RegPembS3({ form, setField, goNext, goPrev, onCancel, sectionIdx, total }) {
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

      <RegistrasiPembiayaanButtons sectionIdx={sectionIdx} total={total} onPrev={goPrev} onNext={goNext} onCancel={onCancel} />
    </>
  );
}

/* ─────────── Section 4: Agunan ─────────── */
function RegPembS4({ form, setForm, showToast, goNext, goPrev, onCancel, sectionIdx, total }) {
  return (
    <>
      <div className="row row--between mb-16">
        <h4 className="section-title" style={{ margin: 0 }}>Daftar Agunan</h4>
        <button className="btn btn--primary btn--sm" onClick={() => {
          // Simulate picking a random agunan
          const available = window.MOCK_JAMINAN.filter(j => !form.agunan.some(a => a.noJaminan === j.noJaminan));
          if (available.length === 0) { showToast({ type: 'warn', title: 'Tidak ada agunan tersedia' }); return; }
          const pick = available[0];
          setForm(f => ({ ...f, agunan: [...f.agunan, { noJaminan: pick.noJaminan, nama: pick.nama, jenis: pick.jenis, nilai: pick.nilai }] }));
          showToast({ type: 'success', title: 'Agunan ditambahkan', message: pick.noJaminan });
        }}>
          <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
          Tambah Agunan
        </button>
      </div>

      <DataTable
        showSearch={false}
        showPagination={false}
        columns={[
          { key: 'noJaminan', label: 'No. Jaminan', render: r => <span className="mono">{r.noJaminan}</span> },
          { key: 'nama',  label: 'Nama Pemilik' },
          { key: 'jenis', label: 'Jenis Agunan' },
          { key: 'nilai', label: 'Nilai Appraisal', align: 'right', render: r => <span className="mono">{window.fmtRp(r.nilai)}</span> },
        ]}
        data={form.agunan}
        popupItems={[
          { id: 'edit', label: 'Edit Hubungan', icon: 'edit' },
          { id: 'hapus', label: 'Hapus dari Pembiayaan', icon: 'trash', danger: true },
        ]}
        onPopupClick={(row, id) => {
          if (id === 'hapus') {
            setForm(f => ({ ...f, agunan: f.agunan.filter(a => a !== row) }));
            showToast({ type: 'warn', title: 'Agunan dilepas', message: row.noJaminan });
          }
        }}
        emptyText="Belum ada agunan ditambahkan. Klik Tambah Agunan."
      />

      {form.agunan.length > 0 && (
        <div className="row row--end" style={{ marginTop: 16, fontSize: 14 }}>
          <span style={{ marginRight: 32 }}>Total Nilai Agunan:</span>
          <span className="mono fw-600" style={{ fontSize: 16 }}>
            {window.fmtRp(form.agunan.reduce((s, a) => s + a.nilai, 0))}
          </span>
        </div>
      )}

      <div className="approval-banner" style={{ marginTop: 16, background: 'var(--c-info-bg)', borderLeftColor: 'var(--c-info)' }}>
        <span style={{ color: 'var(--c-info)', flexShrink: 0 }} dangerouslySetInnerHTML={{ __html: Icons.info(20) }} />
        <div className="approval-banner__body">
          Nilai agunan minimal harus <b>{window.fmtRp(Number(form.besarPembiayaan) * 1.3)}</b> (LTV ≤ 75% terhadap pembiayaan).
        </div>
      </div>

      <RegistrasiPembiayaanButtons sectionIdx={sectionIdx} total={total} onPrev={goPrev} onNext={goNext} onCancel={onCancel} />
    </>
  );
}

/* ─────────── Section 5: Pencairan ─────────── */
function RegPembS5({ form, setField, goNext, goPrev, onCancel, sectionIdx, total }) {
  return (
    <>
      <FormGrid>
        <Field label="Nilai Pencairan" required>
          <CurrencyInput value={form.nilaiPencairan} onChange={v => setField('nilaiPencairan', v)} />
        </Field>
        <Field label="Kode Valuta" required>
          <TextInput value={form.pencairanKodeValuta} readOnly />
        </Field>

        <Field label="Tanggal Pencairan" required span="full">
          <div style={{ maxWidth: 'calc(50% - 12px)' }}>
            <DateInput value={form.tanggalPencairan} onChange={v => setField('tanggalPencairan', v)} />
          </div>
        </Field>

        <Field label="Jangka Waktu Pembiayaan" required>
          <NumberInput value={form.pencairanJangkaWaktu} onChange={v => setField('pencairanJangkaWaktu', v)} suffix="Bulan" />
        </Field>
        <Field label="Effective Ekv Rate" required>
          <NumberInput value={form.effectiveEkvRate} onChange={v => setField('effectiveEkvRate', v)} suffix="%" />
        </Field>

        <Field label="Rekening Sumber Pembayaran" required>
          <LookupInput value={form.pencairanRekeningSumber} onChange={v => setField('pencairanRekeningSumber', v)} />
        </Field>
        <Field label="Opsi Pencairan" required>
          <Select value={form.opsiPencairan} onChange={v => setField('opsiPencairan', v)} options={['Rekening Sendiri', 'Pindah Buku ke Vendor', 'Transfer Antar Bank', 'Tunai']} />
        </Field>

        <Field label="Rekening Pencairan">
          <LookupInput value={form.rekeningPencairan} onChange={v => setField('rekeningPencairan', v)} placeholder="--Cari Rekening--" />
        </Field>
        <Field label="Rekening Pindah Buku">
          <LookupInput value={form.rekeningPindahBuku} onChange={v => setField('rekeningPindahBuku', v)} placeholder="--Cari Rekening--" />
        </Field>

        <Field label="Keterangan" span="full">
          <div style={{ maxWidth: 'calc(50% - 12px)' }}>
            <TextInput value={form.pencairanKeterangan} onChange={v => setField('pencairanKeterangan', v)} />
          </div>
        </Field>

        <Field label="Tanggal Angsuran Awal" required span="full">
          <div style={{ maxWidth: 'calc(50% - 12px)' }}>
            <DateInput value={form.tanggalAngsuranAwal} onChange={v => setField('tanggalAngsuranAwal', v)} />
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
      </FormGrid>

      <hr className="section-divider" />

      <h4 className="section-title" style={{ marginTop: 0 }}>Buat Jadwal Angsuran Baru</h4>
      <div style={{ display: 'flex', gap: 12 }}>
        <RadioOption
          label="Generate Jadwal"
          checked={form.metodeJadwal === 'generate'}
          onClick={() => setField('metodeJadwal', 'generate')}
        />
        <RadioOption
          label="Upload File"
          checked={form.metodeJadwal === 'upload'}
          onClick={() => setField('metodeJadwal', 'upload')}
        />
      </div>

      {form.metodeJadwal === 'upload' && (
        <div style={{ marginTop: 16, maxWidth: 'calc(50% - 12px)' }}>
          <Field label="Upload File Jadwal">
            <div style={{
              border: '1px solid var(--c-border)', borderRadius: 6,
              background: '#F1F5F9', padding: '6px 10px 6px 12px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              height: 'var(--d-input-h)',
            }}>
              <span className="text-muted text-sm">{form.uploadFileJadwal || '-'}</span>
              <button className="btn btn--neutral btn--sm" onClick={() => setField('uploadFileJadwal', 'jadwal-angsuran-2026.xlsx')}>Pilih File</button>
            </div>
          </Field>
        </div>
      )}

      <RegistrasiPembiayaanButtons sectionIdx={sectionIdx} total={total} onPrev={goPrev} onNext={goNext} onCancel={onCancel} />
    </>
  );
}

/* ─────────── Section 6: Jadwal Angsuran ─────────── */
function RegPembS6({ form, goNext, goPrev, onCancel, sectionIdx, total }) {
  return (
    <>
      <h4 className="section-title" style={{ marginTop: 0 }}>Ringkasan Jadwal Angsuran</h4>
      <FormGrid cols={4} >
        <Disp label="Nilai Pencairan" value={window.fmtRp(form.nilaiPencairan)} mono />
        <Disp label="Tenor" value={`${form.pencairanJangkaWaktu} bulan`} />
        <Disp label="Effective Rate" value={`${form.effectiveEkvRate}% p.a.`} />
        <Disp label="Angs. ke 1" value={form.tanggalAngsuranAwal} mono />
      </FormGrid>

      <h4 className="section-title">Rincian Angsuran</h4>
      <JadwalAngsuranTable
        nominal={Number(form.nilaiPencairan)}
        tenor={Number(form.pencairanJangkaWaktu)}
        rate={Number(form.effectiveEkvRate)}
        mulai={form.tanggalAngsuranAwal}
      />

      <RegistrasiPembiayaanButtons sectionIdx={sectionIdx} total={total} onPrev={goPrev} onNext={goNext} onCancel={onCancel} submitLabel="Simpan & Submit Otorisasi" />
    </>
  );
}

/* ─────────── Shared helpers ─────────── */
function RegistrasiPembiayaanButtons({ sectionIdx, total, onPrev, onNext, onCancel, submitLabel }) {
  const isLast = sectionIdx === total - 1;
  return (
    <div className="btn-bar btn-bar--between">
      <button
        className="btn"
        style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }}
        onClick={onCancel}>
        Batal
      </button>
      <div className="row gap-12">
        <button
          className="btn btn--secondary"
          onClick={onPrev}
          disabled={sectionIdx === 0}
          style={sectionIdx === 0 ? { color: 'var(--c-text-placeholder)', borderColor: 'var(--c-border)', cursor: 'not-allowed' } : {}}>
          Sebelumnya
        </button>
        <button className={isLast ? 'btn btn--primary' : 'btn btn--secondary'} onClick={onNext}>
          {isLast && <span dangerouslySetInnerHTML={{ __html: Icons.send(14) }} />}
          {isLast ? (submitLabel || 'Submit') : 'Selanjutnya'}
        </button>
      </div>
    </div>
  );
}

function YaTidak({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <button type="button" onClick={() => onChange('ya')}
        style={{
          flex: 1, padding: '8px 16px',
          border: '1px solid ' + (value === 'ya' ? 'var(--c-primary)' : 'var(--c-border)'),
          background: value === 'ya' ? 'var(--c-primary-soft)' : '#fff',
          borderRadius: 6, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          font: 'inherit', color: 'var(--c-text)',
        }}>
        <span>Ya</span>
        <span style={{
          width: 16, height: 16, borderRadius: '50%',
          border: '2px solid ' + (value === 'ya' ? 'var(--c-primary)' : 'var(--c-border)'),
          background: value === 'ya' ? 'var(--c-primary)' : '#fff',
          boxShadow: value === 'ya' ? 'inset 0 0 0 3px #fff' : 'none',
        }} />
      </button>
      <button type="button" onClick={() => onChange('tidak')}
        style={{
          flex: 1, padding: '8px 16px',
          border: '1px solid ' + (value === 'tidak' ? 'var(--c-primary)' : 'var(--c-border)'),
          background: value === 'tidak' ? 'var(--c-primary-soft)' : '#fff',
          borderRadius: 6, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          font: 'inherit', color: 'var(--c-text)',
        }}>
        <span>Tidak</span>
        <span style={{
          width: 16, height: 16, borderRadius: '50%',
          border: '2px solid ' + (value === 'tidak' ? 'var(--c-primary)' : 'var(--c-border)'),
          background: value === 'tidak' ? 'var(--c-primary)' : '#fff',
          boxShadow: value === 'tidak' ? 'inset 0 0 0 3px #fff' : 'none',
        }} />
      </button>
    </div>
  );
}

function RadioOption({ label, checked, onClick }) {
  return (
    <button type="button" onClick={onClick}
      style={{
        padding: '10px 20px', minWidth: 180,
        border: '1px solid ' + (checked ? 'var(--c-primary)' : 'var(--c-border)'),
        background: '#fff',
        borderRadius: 6, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        font: 'inherit', color: 'var(--c-text)',
        fontWeight: checked ? 600 : 400,
      }}>
      <span>{label}</span>
      <span style={{
        width: 16, height: 16, borderRadius: '50%',
        border: '2px solid ' + (checked ? 'var(--c-primary)' : 'var(--c-border)'),
        background: checked ? 'var(--c-primary-soft)' : '#fff',
        boxShadow: checked ? 'inset 0 0 0 3px var(--c-primary)' : 'none',
      }} />
    </button>
  );
}

function TambahDataBiayaModal({ initial, onClose, onSave }) {
  const [form, setForm] = React.useState(initial || {
    jenisElemen: 'Vendor',
    elemenBiaya: 'Biaya Asuransi',
    dataVendor: 'Vendor ABC',
    sumberBiaya: 'Nasabah',
    rekeningSumber: '000002413333 - Jacob Jones',
    nominalBiaya: '100000',
    nominalPajak: '0',
    rekeningVendor: '000003218',
  });
  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <Modal
      title="Tambah Data Biaya"
      size="lg"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn--neutral" onClick={onClose}>Batal</button>
          <button className="btn btn--primary" onClick={() => onSave(form)}>
            <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(14) }} />
            Simpan
          </button>
        </>
      }
    >
      <FormGrid>
        <Field label="Jenis Elemen" required>
          <Select
            value={form.jenisElemen}
            onChange={v => setField('jenisElemen', v)}
            options={['Vendor', 'Bank', 'Nasabah']}
          />
        </Field>
        <Field label="Elemen Biaya" required>
          <Select
            value={form.elemenBiaya}
            onChange={v => setField('elemenBiaya', v)}
            options={['Biaya Asuransi', 'Biaya Notaris', 'Biaya Provisi', 'Biaya Administrasi', 'Biaya Materai', 'Biaya Appraisal']}
          />
        </Field>

        <Field label="Data Vendor" required span="full">
          <LookupInput
            value={form.dataVendor}
            onChange={v => setField('dataVendor', v)}
            placeholder="--Cari Rekening GL--"
          />
        </Field>

        <Field label="Sumber Biaya" required span="full">
          <div style={{ display: 'flex', gap: 12 }}>
            <RadioOption label="Nasabah" checked={form.sumberBiaya === 'Nasabah'} onClick={() => setField('sumberBiaya', 'Nasabah')} />
            <RadioOption label="Bank" checked={form.sumberBiaya === 'Bank'} onClick={() => setField('sumberBiaya', 'Bank')} />
          </div>
        </Field>

        <Field label="Rekening Sumber Bayar" required span="full">
          <LookupInput
            value={form.rekeningSumber}
            onChange={v => setField('rekeningSumber', v)}
            placeholder="--Cari rekening--"
          />
        </Field>

        <Field label="Nominal Biaya" required>
          <CurrencyInput value={form.nominalBiaya} onChange={v => setField('nominalBiaya', v)} />
        </Field>
        <Field label="Nominal Pajak" required>
          <CurrencyInput value={form.nominalPajak} onChange={v => setField('nominalPajak', v)} readOnly={form.sumberBiaya === 'Bank'} />
        </Field>

        <Field label="Rekening Vendor" span="full">
          <TextInput value={form.rekeningVendor} onChange={v => setField('rekeningVendor', v)} placeholder="Masukan keterangan transaksi" />
        </Field>
      </FormGrid>
    </Modal>
  );
}

function JadwalAngsuranTable({ nominal, tenor, rate, mulai }) {
  const i = (rate / 100) / 12;
  const months = tenor || 12;
  const P = nominal || 0;
  let angsuran = 0;
  if (i > 0) {
    angsuran = P * i * Math.pow(1 + i, months) / (Math.pow(1 + i, months) - 1);
  }
  const schedule = [];
  let sisa = P;
  for (let m = 1; m <= months; m++) {
    const margin = i > 0 ? sisa * i : 0;
    const pokok = angsuran - margin;
    sisa = Math.max(0, sisa - pokok);
    schedule.push({ ke: m, pokok, margin, total: angsuran, sisa });
  }
  return (
    <DataTable
      showSearch={false}
      showPagination={schedule.length > 12}
      pageSize={12}
      columns={[
        { key: 'ke', label: 'Angs. Ke', align: 'center', width: 80, render: r => <span className="mono">{r.ke}</span> },
        { key: 'tgl', label: 'Tanggal', render: r => <span className="mono">{addMonthsId(mulai, r.ke - 1)}</span> },
        { key: 'pokok', label: 'Pokok', align: 'right', render: r => <span className="mono">{window.fmtRp(r.pokok)}</span> },
        { key: 'margin', label: 'Margin', align: 'right', render: r => <span className="mono">{window.fmtRp(r.margin)}</span> },
        { key: 'total', label: 'Total Angs.', align: 'right', render: r => <span className="mono fw-600">{window.fmtRp(r.total)}</span> },
        { key: 'sisa', label: 'Sisa Pokok', align: 'right', render: r => <span className="mono">{window.fmtRp(r.sisa)}</span> },
      ]}
      data={schedule}
    />
  );
}

function addMonthsId(base, m) {
  const monthsShort = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agus','Sep','Okt','Nov','Des'];
  try {
    const parts = base.split('-');
    const day = parseInt(parts[0], 10);
    const monIdx = monthsShort.findIndex(x => x.startsWith(parts[1]));
    const year = parseInt(parts[2], 10);
    const d = new Date(year, monIdx >= 0 ? monIdx : 0, day);
    d.setMonth(d.getMonth() + m);
    return `${String(d.getDate()).padStart(2, '0')}-${monthsShort[d.getMonth()]}-${d.getFullYear()}`;
  } catch (e) { return '-'; }
}

Object.assign(window, {
  RegPembS1, RegPembS2, RegPembS3, RegPembS4, RegPembS5, RegPembS6,
  RegistrasiPembiayaanButtons, YaTidak, RadioOption,
  TambahDataBiayaModal, JadwalAngsuranTable, addMonthsId,
});
