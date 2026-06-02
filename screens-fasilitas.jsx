/* screens-fasilitas.jsx — Registrasi Fasilitas + List Fasilitas + Detail + Addendum */

/* ─────────── Registrasi Fasilitas (2-section form) ─────────── */
function RegistrasiFasilitasScreen({ onNavigate, showToast }) {
  const [section, setSection] = React.useState('s1');
  const [lookupOpen, setLookupOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [biayaModalOpen, setBiayaModalOpen] = React.useState(false);
  const [editingBiaya, setEditingBiaya] = React.useState(null);
  const [form, setForm] = React.useState({
    nomorNasabah: '0000000623123', nasabahNama: 'Heri Tapiheru',
    grupNasabah: 'GRP-001 - Karyawan',
    produk: 'M-001 - Murabahah Kendaraan',
    tipeFasilitas: 'Komitmen',
    kodeValuta: 'IDR',
    tanggalAkad: '10-Jan-2026',
    tanggalBuka: '10-Jan-2026',
    nomorAkad: 'DSK/FAS/0128321',
    tanggalKelonggaran: '10-Feb-2026',
    jatuhTempo: '10-Jan-2031',
    plafond: '166654000',
    sifat: 'Committed',
    sumberBiaya: '0000000623123 - Heri Tapiheru',
    poolOfFund: 'POF-001 - Dana Pihak Ketiga',
    kantorCabang: '001 - Kantor Pusat',
    notaris: 'NOT-0015 - Edward, SH.',
    approval: '0002 - John Kosasih',
    reviewer: '0001 - Kepala ARP',
    // Section 2 biaya — schema matches Tambah Data Biaya modal
    biaya: [
      { jenisElemen: 'Vendor', elemenBiaya: 'Biaya Asuransi', dataVendor: 'Vendor ABC',           sumberBiaya: 'Nasabah', rekeningSumber: '000002413333 - Jacob Jones', nominalBiaya: '100000',  nominalPajak: '0',     rekeningVendor: '000003218' },
      { jenisElemen: 'Vendor', elemenBiaya: 'Biaya Notaris',  dataVendor: 'NOT-0015 - Edward SH', sumberBiaya: 'Nasabah', rekeningSumber: '000002413333 - Jacob Jones', nominalBiaya: '750000',  nominalPajak: '75000', rekeningVendor: '000003219' },
      { jenisElemen: 'Bank',   elemenBiaya: 'Biaya Provisi',  dataVendor: '-',                    sumberBiaya: 'Nasabah', rekeningSumber: '000002413333 - Jacob Jones', nominalBiaya: '1090000', nominalPajak: '0',     rekeningVendor: '-' },
    ],
  });

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="card">
      <h2 className="page__title">Registrasi Fasilitas</h2>

      <SectionTabs
        value={section}
        onChange={setSection}
        tabs={[
          { id: 's1', label: 'Data Fasilitas' },
          { id: 's2', label: 'Data Biaya-Biaya' },
        ]}
      />

      {section === 's1' && (
        <>
          <Field label="Nomor Nasabah" required>
            <LookupInput
              value={form.nasabahNama ? `${form.nomorNasabah} - ${form.nasabahNama}` : ''}
              placeholder="-- Cari nasabah --"
              onOpen={() => setLookupOpen(true)}
            />
          </Field>
          <div style={{ marginTop: 16 }}>
            <Field label="Grup Nasabah" required>
              <Select
                value={form.grupNasabah}
                onChange={v => setField('grupNasabah', v)}
                options={['GRP-001 - Karyawan', 'GRP-002 - Wiraswasta', 'GRP-003 - Profesional', 'GRP-004 - Korporasi']}
              />
            </Field>
          </div>

          <div style={{ marginTop: 16 }}>
            <FormGrid>
              <Field label="Produk Fasilitas" required>
                <Select
                  value={form.produk}
                  onChange={v => setField('produk', v)}
                  options={window.MOCK_PRODUK_PEMBIAYAAN.map(p => `${p.kode} - ${p.nama}`)}
                />
              </Field>
              <Field label="Tipe Fasilitas" required>
                <Select
                  value={form.tipeFasilitas}
                  onChange={v => setField('tipeFasilitas', v)}
                  options={['Komitmen', 'Non-Komitmen', 'Revolving', 'Non-Revolving']}
                />
              </Field>
              <Field label="Kode Valuta" required span="full">
                <Select value={form.kodeValuta} onChange={v => setField('kodeValuta', v)} options={['IDR', 'USD', 'SGD', 'EUR']} />
              </Field>

              <Field label="Tanggal Akad" required>
                <DateInput value={form.tanggalAkad} onChange={v => setField('tanggalAkad', v)} />
              </Field>
              <Field label="Tanggal Buka" required>
                <DateInput value={form.tanggalBuka} onChange={v => setField('tanggalBuka', v)} />
              </Field>

              <Field label="Nomor Akad" required span="full">
                <TextInput value={form.nomorAkad} onChange={v => setField('nomorAkad', v)} />
              </Field>

              <Field label="Tanggal Kelonggaran Tarik" required>
                <DateInput value={form.tanggalKelonggaran} onChange={v => setField('tanggalKelonggaran', v)} />
              </Field>
              <Field label="Jatuh Tempo Fasilitas" required>
                <DateInput value={form.jatuhTempo} onChange={v => setField('jatuhTempo', v)} />
              </Field>

              <Field label="Plafond Fasilitas" required>
                <CurrencyInput value={form.plafond} onChange={v => setField('plafond', v)} />
              </Field>
              <Field label="Sifat Fasilitas" required>
                <Select value={form.sifat} onChange={v => setField('sifat', v)} options={['Committed', 'Uncommitted']} />
              </Field>

              <Field label="Rekening Sumber Biaya" required span="full">
                <LookupInput value={form.sumberBiaya} placeholder="-- Pilih rekening --" />
              </Field>
            </FormGrid>
          </div>

          <hr className="section-divider" />

          <FormGrid>
            <Field label="Pool of Fund" required span="full">
              <Select
                value={form.poolOfFund}
                onChange={v => setField('poolOfFund', v)}
                options={['POF-001 - Dana Pihak Ketiga', 'POF-002 - Dana Sendiri', 'POF-003 - Pinjaman Bank']}
              />
            </Field>

            <Field label="Kantor Cabang" required>
              <Select
                value={form.kantorCabang}
                onChange={v => setField('kantorCabang', v)}
                options={['001 - Kantor Pusat', '005 - Bandung Asia Afrika', '012 - Kelapa Gading', '023 - Surabaya Tunjungan']}
              />
            </Field>
            <Field label="Notaris" required>
              <LookupInput value={form.notaris} />
            </Field>

            <Field label="Approval" required>
              <LookupInput value={form.approval} placeholder="-- Pilih --" />
            </Field>
            <Field label="Reviewer" required>
              <LookupInput value={form.reviewer} placeholder="-- Pilih --" />
            </Field>
          </FormGrid>

          <div className="btn-bar">
            <button className="btn btn--neutral" disabled>Sebelumnya</button>
            <button className="btn btn--primary" onClick={() => setSection('s2')}>
              Selanjutnya
              <span dangerouslySetInnerHTML={{ __html: Icons.arrowR(16) }} />
            </button>
          </div>
        </>
      )}

      {section === 's2' && (
        <>
          <div className="row row--between mb-16">
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Daftar Biaya</h3>
            <button className="btn btn--primary btn--sm" onClick={() => { setEditingBiaya(null); setBiayaModalOpen(true); }}>
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
                setEditingBiaya({ ...row, _idx: idx });
                setBiayaModalOpen(true);
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

          <div className="btn-bar btn-bar--between">
            <button
              className="btn"
              style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }}
              onClick={() => onNavigate('/list-fasilitas')}>
              Batal
            </button>
            <div className="row gap-12">
              <button className="btn btn--secondary" onClick={() => setSection('s1')}>Sebelumnya</button>
              <button className="btn btn--primary" onClick={() => setConfirmOpen(true)}>
                <span dangerouslySetInnerHTML={{ __html: Icons.send(14) }} />
                Selanjutnya
              </button>
            </div>
          </div>

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
        </>
      )}

      <NasabahLookup
        open={lookupOpen}
        onClose={() => setLookupOpen(false)}
        onSelect={n => setField('nomorNasabah', n.kode) || setField('nasabahNama', n.nama)}
      />

      {confirmOpen && (
        <ConfirmDialog
          title="Submit Registrasi Fasilitas"
          message={`Fasilitas senilai ${window.fmtRp(form.plafond)} untuk ${form.nasabahNama} akan dikirim ke Approver untuk otorisasi. Lanjutkan?`}
          confirmLabel="Ya, Submit"
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            showToast({ type: 'success', title: 'Berhasil', message: `Registrasi fasilitas berhasil dikirim untuk otorisasi.` });
            onNavigate('/list-fasilitas');
          }}
        />
      )}
    </div>
  );
}

/* ─────────── List Fasilitas ─────────── */
function ListFasilitasScreen({ onNavigate, popupStyle, showToast }) {
  const [filter, setFilter] = React.useState({ cabang: 'ALL', jenis: 'ALL', status: 'ALL', keyword: '' });
  const [drawer, setDrawer] = React.useState(null); // { row } when popup-style is drawer

  const data = window.MOCK_FASILITAS.filter(f => {
    if (filter.status !== 'ALL' && f.status !== filter.status) return false;
    if (filter.jenis !== 'ALL' && !f.jenis.includes(filter.jenis)) return false;
    if (filter.cabang !== 'ALL' && !f.cabang.startsWith(filter.cabang)) return false;
    if (filter.keyword.trim()) {
      const q = filter.keyword.toLowerCase();
      return [f.noFasilitas, f.nama, f.kodeNasabah].some(x => String(x).toLowerCase().includes(q));
    }
    return true;
  });

  const popupItems = [
    { id: 'detail',   label: 'Lihat Detail',                    icon: 'view' },
    { id: 'addendum', label: 'Addendum Fasilitas',              icon: 'edit' },
    { id: 'koreksi',  label: 'Koreksi Limit Fasilitas',         icon: 'scale' },
    { id: 'reposisi', label: 'Reposisi Cabang',                 icon: 'swap' },
    { sep: true },
    { id: 'tutup',    label: 'Tutup Fasilitas',                 icon: 'close', danger: true },
  ];

  const handlePopup = (row, id) => {
    if (id === 'detail')   { onNavigate('/list-fasilitas/detail');   return; }
    if (id === 'addendum') { onNavigate('/list-fasilitas/addendum'); return; }
    if (id === 'koreksi')  { onNavigate('/list-fasilitas/koreksi');  return; }
    if (id === 'reposisi') { onNavigate('/list-fasilitas/reposisi'); return; }
    if (id === 'tutup')    { onNavigate('/list-fasilitas/tutup');    return; }
    showToast({ type: 'success', title: 'Aksi: ' + popupItems.find(p => p.id === id)?.label, message: `Untuk fasilitas ${row.noFasilitas} (${row.nama})` });
  };

  const handleRowClick = (row) => {
    if (popupStyle === 'drawer') {
      setDrawer({ row });
    }
  };

  return (
    <>
      <div className="card">
        <h2 className="page__title">
          Daftar Fasilitas
          <span className="subtitle">{data.length} fasilitas ditemukan dari {window.MOCK_FASILITAS.length} record</span>
        </h2>

        {/* Filter */}
        <div className="filter-strip" style={{ marginTop: 20 }}>
          <div className="filter-strip__header">
            <span dangerouslySetInnerHTML={{ __html: Icons.filter(16) }} />
            <span className="filter-strip__title">Filter</span>
          </div>
          <FormGrid cols={4}>
            <Field label="Cabang">
              <Select value={filter.cabang} onChange={v => setFilter(f => ({ ...f, cabang: v }))} options={['ALL', '001', '005', '012', '023', '034']} />
            </Field>
            <Field label="Jenis Fasilitas">
              <Select value={filter.jenis} onChange={v => setFilter(f => ({ ...f, jenis: v }))} options={['ALL', 'M - Murabahah', 'C - Mudharabah', 'I - Ijarah', 'MMQ']} />
            </Field>
            <Field label="Status Fasilitas">
              <Select value={filter.status} onChange={v => setFilter(f => ({ ...f, status: v }))} options={['ALL', 'Aktif', 'Jatuh Tempo', 'Tunggakan', 'Lunas', 'Menunggu Pencairan']} />
            </Field>
            <Field label="Keyword">
              <TextInput value={filter.keyword} onChange={v => setFilter(f => ({ ...f, keyword: v }))} placeholder="No. fasilitas / nama nasabah" />
            </Field>
          </FormGrid>
        </div>

        <DataTable
          columns={[
            { key: 'noFasilitas', label: 'No. Fasilitas', width: 140, sort: true, render: r => <span className="mono">{r.noFasilitas}</span> },
            { key: 'kodeNasabah', label: 'No. Nasabah', width: 130, render: r => <span className="mono">{r.kodeNasabah}</span> },
            { key: 'nama',        label: 'Nama Nasabah', sort: true },
            { key: 'jenis',       label: 'Jenis Fasilitas', sort: true },
            { key: 'plafond',     label: 'Plafond', align: 'right', render: r => <span className="mono">{window.fmtRp(r.plafond)}</span> },
            { key: 'sisa',        label: 'Sisa Plafond', align: 'right', render: r => <span className="mono">{window.fmtRp(r.sisa)}</span> },
            { key: 'tglJTempo',   label: 'Jatuh Tempo', render: r => <span className="mono">{r.tglJTempo}</span> },
            { key: 'status',      label: 'Status', render: r => <StatusTag status={r.status} /> },
          ]}
          data={data}
          popupItems={popupStyle === 'menu' ? popupItems : null}
          onPopupClick={handlePopup}
          onRowClick={popupStyle === 'drawer' ? handleRowClick : (popupStyle === 'inline' ? null : null)}
          toolbarActions={
            <>
              <button className="btn btn--neutral btn--sm">
                <span dangerouslySetInnerHTML={{ __html: Icons.download(14) }} />
                Export
              </button>
              <button className="btn btn--primary btn--sm" onClick={() => onNavigate('/registrasi-fasilitas')}>
                <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
                Tambah Fasilitas
              </button>
            </>
          }
        />
      </div>

      {drawer && (
        <FasilitasDrawer
          fasilitas={drawer.row}
          onClose={() => setDrawer(null)}
          onAction={(id) => { setDrawer(null); handlePopup(drawer.row, id); }}
        />
      )}
    </>
  );
}

/* Side drawer used when popupStyle === 'drawer' */
function FasilitasDrawer({ fasilitas, onClose, onAction }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)',
      zIndex: 1000, display: 'flex', justifyContent: 'flex-end',
      animation: 'fadeIn 0.15s ease',
    }} onClick={onClose}>
      <div style={{
        width: 480, height: '100%', background: '#fff',
        animation: 'slideRight 0.2s ease',
        display: 'flex', flexDirection: 'column',
      }} onClick={e => e.stopPropagation()}>
        <style>{`@keyframes slideRight { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--c-border-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--c-text-muted)' }}>No. Fasilitas</div>
            <div style={{ fontFamily: 'IBM Plex Mono', fontSize: 18, fontWeight: 600 }}>{fasilitas.noFasilitas}</div>
            <div style={{ marginTop: 8 }}><StatusTag status={fasilitas.status} /></div>
          </div>
          <button className="modal__close" onClick={onClose} dangerouslySetInnerHTML={{ __html: Icons.close(16) }} />
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          <FormGrid>
            <Disp label="Nasabah" value={fasilitas.nama} />
            <Disp label="Jenis" value={fasilitas.jenis} />
            <Disp label="Cabang" value={fasilitas.cabang} />
            <Disp label="Tgl Buka" value={fasilitas.tglBuka} mono />
            <Disp label="Plafond" value={window.fmtRp(fasilitas.plafond)} mono />
            <Disp label="Sisa" value={window.fmtRp(fasilitas.sisa)} mono />
          </FormGrid>
          <h4 className="section-title">Aksi Cepat</h4>
          <div className="col gap-8">
            <button className="btn btn--neutral w-100" style={{ justifyContent: 'flex-start' }} onClick={() => onAction('detail')}><span dangerouslySetInnerHTML={{ __html: Icons.view(16) }} />Lihat Detail Lengkap</button>
            <button className="btn btn--neutral w-100" style={{ justifyContent: 'flex-start' }} onClick={() => onAction('addendum')}><span dangerouslySetInnerHTML={{ __html: Icons.edit(16) }} />Addendum Fasilitas</button>
            <button className="btn btn--neutral w-100" style={{ justifyContent: 'flex-start' }} onClick={() => onAction('koreksi')}><span dangerouslySetInnerHTML={{ __html: Icons.scale(16) }} />Koreksi Limit Fasilitas</button>
            <button className="btn btn--neutral w-100" style={{ justifyContent: 'flex-start' }} onClick={() => onAction('reposisi')}><span dangerouslySetInnerHTML={{ __html: Icons.swap(16) }} />Reposisi Cabang</button>
            <button className="btn btn--danger w-100" style={{ justifyContent: 'flex-start' }} onClick={() => onAction('tutup')}><span dangerouslySetInnerHTML={{ __html: Icons.close(16) }} />Tutup Fasilitas</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Detail Fasilitas ─────────── */
function DetailFasilitasScreen({ onNavigate }) {
  const f = window.MOCK_FASILITAS[0];
  const [tab, setTab] = React.useState('info');

  return (
    <div className="card">
      <div className="row row--between" style={{ paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Detail Fasilitas</h2>
        <div className="row gap-8">
          <button className="btn btn--neutral btn--sm" onClick={() => onNavigate('/list-fasilitas/addendum')}>
            <span dangerouslySetInnerHTML={{ __html: Icons.edit(14) }} />
            Addendum
          </button>
          <button className="btn btn--neutral btn--sm">
            <span dangerouslySetInnerHTML={{ __html: Icons.print(14) }} />
            Cetak Detail
          </button>
        </div>
      </div>

      <div className="hl-card">
        <Disp label="No. Fasilitas" value={f.noFasilitas} large mono />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 16 }}>
          <Disp label="Nama Nasabah" value={`${f.kodeNasabah} - ${f.nama}`} />
          <Disp label="Jenis Fasilitas" value={f.jenis} />
          <Disp label="Kantor Cabang" value={f.cabang} />
          <div className="disp">
            <div className="disp__label">Status</div>
            <div><StatusTag status={f.status} /></div>
          </div>
        </div>
      </div>

      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'info',     label: 'Informasi Detail Fasilitas' },
          { id: 'biaya',    label: 'Biaya - Biaya' },
          { id: 'rekening', label: 'Daftar Rekening' },
          { id: 'riwayat',  label: 'Riwayat Transaksi' },
        ]}
      />

      {tab === 'info' && (
        <>
          <h4 className="section-title">Info Detail Fasilitas</h4>
          <FormGrid cols={3}>
            <Disp label="Tanggal Buka Fasilitas" value={f.tglBuka} mono />
            <Disp label="Periode Ketersediaan" value="13-Agu-2023" mono />
            <Disp label="Sifat Fasilitas" value="Uncommitted" />
            <Disp label="Tanggal Akad" value={f.tglBuka} mono />
            <Disp label="Jatuh Tempo" value={f.tglJTempo} mono />
            <Disp label="Valuta" value="IDR" />
            <Disp label="Akad" value="Mudharabah" />
            <Disp label="Tipe Fasilitas" value="Committed Revolving" />
            <Disp label="Nomor Akad" value="DSK/FAS/0128321" mono />
          </FormGrid>

          <hr className="section-divider" />

          <FormGrid cols={3}>
            <Disp label="Limit Plafond" value={window.fmtRp(f.plafond)} mono />
            <Disp label="Penggunaan" value={window.fmtRp(f.plafond)} mono />
            <Disp label="Sisa Plafond" value={window.fmtRp(f.sisa)} mono />
          </FormGrid>

          <hr className="section-divider" />

          <FormGrid cols={3}>
            <Disp label="No. Addendum" value="13" mono />
            <Disp label="Notaris" value="0015 - Edward, SH." />
            <Disp label="User Input" value="BCSHQB109T" mono />
            <Disp label="Tanggal Addendum" value="13-Agu-2023" mono />
            <Disp label="Reviewer" value="0001 - Kepala ARP" />
            <Disp label="Tanggal Input" value="13-Agu-2023" mono />
            <div className="disp">
              <div className="disp__label">Status Blokir Fasilitas</div>
              <div className="cbx"><input type="checkbox" disabled /> Tidak diblokir</div>
            </div>
            <Disp label="Rekening Officer" value="TP - Teguh Priyono" />
            <Disp label="User Otorisasi" value="BCSHQB1025" mono />
            <Disp label="Approver" value="0002 - John Kosasih" />
            <Disp label="Tanggal Otorisasi" value="13-Agu-2023" mono />
          </FormGrid>

          <h4 className="section-title">Risk Rating Nasabah</h4>
          <DataTable
            showSearch={false}
            showPagination={false}
            columns={[
              { key: 'tgl',      label: 'Tanggal Review', sort: true, render: r => <span className="mono">{r.tgl}</span> },
              { key: 'jenis',    label: 'Jenis Pembiayaan' },
              { key: 'crfScore', label: 'CRF Score', align: 'right' },
              { key: 'crf',      label: 'CRF' },
              { key: 'erfScore', label: 'ERF Score', align: 'right' },
              { key: 'erf',      label: 'ERF' },
              { key: 'last',     label: 'Penilaian Terakhir' },
            ]}
            data={[
              { tgl: '13-Agu-2023', jenis: 'Komersial', crfScore: 40, crf: 'RR7', erfScore: 37, erf: 'RR7', last: 'False' },
              { tgl: '13-Agu-2022', jenis: 'Komersial', crfScore: 42, crf: 'RR6', erfScore: 39, erf: 'RR6', last: 'True'  },
            ]}
          />
        </>
      )}

      {tab === 'biaya' && (
        <>
          <h4 className="section-title">Biaya - Biaya Fasilitas</h4>
          <DataTable
            showSearch={false}
            showPagination={false}
            columns={[
              { key: 'jenis',   label: 'Jenis Biaya' },
              { key: 'nominal', label: 'Nominal', align: 'right', render: r => <span className="mono">{window.fmtRp(r.nominal)}</span> },
              { key: 'flag',    label: 'Flag', render: r => <span className={`tag ${r.flag === 'Debet' ? 'tag--error' : 'tag--success'}`}>{r.flag}</span> },
              { key: 'rek',     label: 'Rekening Pembebanan' },
              { key: 'tgl',     label: 'Tanggal', render: r => <span className="mono">{r.tgl}</span> },
            ]}
            data={[
              { jenis: 'Biaya Administrasi', nominal: 500000, flag: 'Debet', rek: 'Sumber Biaya', tgl: '13-Agu-2023' },
              { jenis: 'Biaya Provisi',      nominal: 1666540, flag: 'Debet', rek: 'Sumber Biaya', tgl: '13-Agu-2023' },
              { jenis: 'Biaya Notaris',      nominal: 750000, flag: 'Debet', rek: 'Cash', tgl: '13-Agu-2023' },
            ]}
          />
        </>
      )}

      {tab === 'rekening' && (
        <>
          <h4 className="section-title">Daftar Rekening pada Fasilitas Ini</h4>
          <DataTable
            showSearch={false}
            showPagination={false}
            columns={[
              { key: 'noRek',  label: 'No. Rekening', render: r => <span className="mono">{r.noRek}</span> },
              { key: 'jenis', label: 'Jenis Rekening' },
              { key: 'plafond', label: 'Plafond', align: 'right', render: r => <span className="mono">{window.fmtRp(r.plafond)}</span> },
              { key: 'outstanding', label: 'Outstanding', align: 'right', render: r => <span className="mono">{window.fmtRp(r.outstanding)}</span> },
              { key: 'status', label: 'Status', render: r => <StatusTag status={r.status} /> },
            ]}
            data={[
              { noRek: '7100-0000-0044', jenis: 'Pembiayaan', plafond: 87960300, outstanding: 87960300, status: 'Aktif' },
            ]}
          />
        </>
      )}

      {tab === 'riwayat' && (
        <>
          <h4 className="section-title">Riwayat Transaksi</h4>
          <ul className="timeline">
            <li>
              <div className="timeline__dot timeline__dot--done" />
              <div className="timeline__body">
                <div className="timeline__title">Fasilitas dibuka — plafond Rp 87.960.300</div>
                <div className="timeline__meta mono">13-Jul-2023 09:23 · oleh BCSHQB109T · Otorisasi: BCSHQB1025</div>
              </div>
            </li>
            <li>
              <div className="timeline__dot timeline__dot--done" />
              <div className="timeline__body">
                <div className="timeline__title">Pencairan pertama — Rp 87.960.300</div>
                <div className="timeline__meta mono">13-Jul-2023 14:15 · oleh BCSHQB109T</div>
              </div>
            </li>
            <li>
              <div className="timeline__dot timeline__dot--done" />
              <div className="timeline__body">
                <div className="timeline__title">Addendum #13 — perubahan tenor</div>
                <div className="timeline__meta mono">13-Agu-2023 11:00 · oleh BCSHQB1025</div>
              </div>
            </li>
            <li>
              <div className="timeline__dot" />
              <div className="timeline__body">
                <div className="timeline__title">Fasilitas memasuki periode Jatuh Tempo</div>
                <div className="timeline__meta mono">13-Jul-2027</div>
              </div>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}

/* ─────────── Addendum Fasilitas ─────────── */
function AddendumFasilitasScreen({ onNavigate, showToast }) {
  const f = window.MOCK_FASILITAS[0];
  const [form, setForm] = React.useState({
    jenisAddendum: 'Perpanjangan Tenor',
    nomorAkadBaru: 'DSK/FAS/0128321-ADD13',
    tanggalAddendum: '24-May-2026',
    plafondLama: String(f.plafond),
    plafondBaru: String(f.plafond),
    tenorLama: '48',
    tenorBaru: '60',
    keterangan: '',
    dokumen: [],
  });
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  return (
    <div className="card">
      <div className="row row--between" style={{ paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Addendum Fasilitas</h2>
        <button className="btn btn--ghost btn--sm" onClick={() => onNavigate('/list-fasilitas/detail')}>
          <span dangerouslySetInnerHTML={{ __html: Icons.arrowL(14) }} />
          Kembali ke Detail
        </button>
      </div>

      <div className="hl-card">
        <Disp label="No. Fasilitas" value={f.noFasilitas} large mono />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 16 }}>
          <Disp label="Nasabah" value={`${f.kodeNasabah} - ${f.nama}`} />
          <Disp label="Jenis" value={f.jenis} />
          <Disp label="Plafond Saat Ini" value={window.fmtRp(f.plafond)} mono />
          <div className="disp">
            <div className="disp__label">Status</div>
            <div><StatusTag status={f.status} /></div>
          </div>
        </div>
      </div>

      <div className="approval-banner">
        <span className="approval-banner__icon" dangerouslySetInnerHTML={{ __html: Icons.warning(20) }} />
        <div className="approval-banner__body">
          <b>Perhatian:</b> Addendum membutuhkan persetujuan maker-checker. Setelah submit, fasilitas akan dikunci hingga disetujui Approver.
        </div>
      </div>

      <h4 className="section-title">Detail Addendum</h4>
      <FormGrid>
        <Field label="Jenis Addendum" required>
          <Select
            value={form.jenisAddendum}
            onChange={v => setForm(f => ({ ...f, jenisAddendum: v }))}
            options={['Perpanjangan Tenor', 'Penambahan Plafond', 'Pengurangan Plafond', 'Perubahan Akad', 'Perubahan Margin', 'Perubahan Officer']}
          />
        </Field>
        <Field label="Nomor Akad Addendum" required>
          <TextInput value={form.nomorAkadBaru} onChange={v => setForm(f => ({ ...f, nomorAkadBaru: v }))} />
        </Field>
        <Field label="Tanggal Addendum" required>
          <DateInput value={form.tanggalAddendum} onChange={v => setForm(f => ({ ...f, tanggalAddendum: v }))} />
        </Field>
        <Field label="No. Akad Lama">
          <TextInput value="DSK/FAS/0128321" readOnly />
        </Field>
      </FormGrid>

      <h4 className="section-title">Perubahan Nilai</h4>
      <FormGrid>
        <Field label="Plafond Lama">
          <CurrencyInput value={form.plafondLama} readOnly />
        </Field>
        <Field label="Plafond Baru" required>
          <CurrencyInput value={form.plafondBaru} onChange={v => setForm(f => ({ ...f, plafondBaru: v }))} />
        </Field>
        <Field label="Tenor Lama (bulan)">
          <NumberInput value={form.tenorLama} readOnly suffix="Bulan" />
        </Field>
        <Field label="Tenor Baru (bulan)" required>
          <NumberInput value={form.tenorBaru} onChange={v => setForm(f => ({ ...f, tenorBaru: v }))} suffix="Bulan" />
        </Field>
      </FormGrid>

      <h4 className="section-title">Keterangan & Lampiran</h4>
      <Field label="Alasan / Justifikasi Addendum" required>
        <textarea
          value={form.keterangan}
          onChange={e => setForm(f => ({ ...f, keterangan: e.target.value }))}
          placeholder="Jelaskan alasan perubahan, kondisi nasabah, dan dokumen pendukung yang dilampirkan..."
          rows={4}
        />
      </Field>

      <div style={{ border: '2px dashed var(--c-border)', borderRadius: 8, padding: 24, marginTop: 12, textAlign: 'center', color: 'var(--c-text-muted)' }}>
        <span style={{ display: 'inline-block', marginBottom: 8 }} dangerouslySetInnerHTML={{ __html: Icons.upload(28) }} />
        <div style={{ fontSize: 14, marginBottom: 4 }}>Tarik file atau <a style={{ color: 'var(--c-primary)', textDecoration: 'underline' }}>klik untuk pilih</a></div>
        <div style={{ fontSize: 12 }}>PDF, JPG, PNG · maks 5MB per file</div>
      </div>

      <div className="btn-bar">
        <button className="btn btn--neutral" onClick={() => onNavigate('/list-fasilitas')}>Batal</button>
        <button className="btn btn--secondary">Simpan Draft</button>
        <button className="btn btn--primary" onClick={() => setConfirmOpen(true)}>
          <span dangerouslySetInnerHTML={{ __html: Icons.send(16) }} />
          Submit untuk Otorisasi
        </button>
      </div>

      {confirmOpen && (
        <ConfirmDialog
          title="Submit Addendum Fasilitas"
          message={`Addendum ${form.jenisAddendum} untuk fasilitas ${f.noFasilitas} akan dikirim ke Approver. Lanjutkan?`}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            showToast({ type: 'success', title: 'Addendum berhasil', message: `Addendum #14 untuk ${f.noFasilitas} sedang menunggu otorisasi.` });
            onNavigate('/otorisasi');
          }}
        />
      )}
    </div>
  );
}

Object.assign(window, {
  RegistrasiFasilitasScreen, ListFasilitasScreen, DetailFasilitasScreen, AddendumFasilitasScreen,
});
