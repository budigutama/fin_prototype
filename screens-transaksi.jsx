/* screens-transaksi.jsx — Form-form transaksi rekening pembiayaan.
   Setiap form di-route dari Transaksi Landing dengan ?rek=<noRek>. */

/* ─────────── Pembayaran Manual (Figma 2.2.1.e) ─────────── */
function PembayaranManualScreen({ onNavigate, showToast, rek }) {
  const rekening = window.useRekeningFromQuery(rek);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  // Defaults computed from rekening
  const cicilanNormal = Math.round(rekening.outstanding / Math.max(1, rekening.tenor));
  const [form, setForm] = React.useState({
    nilaiPencairan:        String(rekening.plafond || 90000000),
    mukasahPct1:           '0,00',
    cicilanNormal:         String(cicilanNormal || 505000),
    cicilanNormatif:       String(cicilanNormal || 505000),
    cicilanKe:             String((rekening.angsuranKe || 0) + 1),
    totalBulanCicilan:     String(rekening.tenor || 41),
    tglJatuhTempo:         '13-Jul-2023',
    tglTransaksi:          '24-May-2026',
    pembayaranPokok:       String(cicilanNormal || 505000),
    dendaTazir:            '0',
    pembayaranMargin:      '0',
    dendaTawidh:           '0',
    mukasahPct2:           '0,00',
    wipeDenda:             true,
    totalAngsuran:         String(cicilanNormal || 505000),
    totalPembayaran:       String(cicilanNormal || 505000),
    jenisPembayaran:       'Normal Payment',
    keterangan:            `Manual Pembayaran ${rekening.akad?.toLowerCase()} ${rekening.nama}`,
    rekeningSumber:        '0000000623123 - Heri Tapiheru',
  });
  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Pembayaran Manual — {rekening.akad}
      </h2>

      <RekeningHeroCard rekening={rekening} onNavigate={onNavigate} />

      {/* Konteks angsuran — read-only, ditampilkan sebagai info ringkas */}
      <div className="info-panel">
        <Disp label="Nilai Pencairan" value={window.fmtRp(form.nilaiPencairan)} mono />
        <Disp label="Mukasah" value={`${form.mukasahPct1} %`} mono />
        <Disp label="Nominal Cicilan Normal" value={window.fmtRp(form.cicilanNormal)} mono />
        <Disp label="Nominal Cicilan Normatif" value={window.fmtRp(form.cicilanNormatif)} mono />
        <Disp label="Cicilan ke" value={`${form.cicilanKe} dari ${form.totalBulanCicilan}`} mono />
        <Disp label="Tanggal Jatuh Tempo" value={form.tglJatuhTempo} mono />
        <Disp label="Tanggal Transaksi" value={form.tglTransaksi} mono />
      </div>

      <FormGrid>
        <Field label="Pembayaran Pokok" required>
          <CurrencyInput value={form.pembayaranPokok} onChange={v => setField('pembayaranPokok', v)} />
        </Field>
        <Field label="Denda Tazir" required>
          <CurrencyInput value={form.dendaTazir} onChange={v => setField('dendaTazir', v)} />
        </Field>

        <Field label="Pembayaran Margin" required>
          <CurrencyInput value={form.pembayaranMargin} onChange={v => setField('pembayaranMargin', v)} />
        </Field>
        <Field label="Denda Tawidh" required>
          <CurrencyInput value={form.dendaTawidh} onChange={v => setField('dendaTawidh', v)} />
        </Field>

        <Field label="Mukasah" required>
          <NumberInput value={form.mukasahPct2} onChange={v => setField('mukasahPct2', v)} suffix="%" />
        </Field>
        <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 10 }}>
          <label className="cbx">
            <input type="checkbox" checked={form.wipeDenda} onChange={e => setField('wipeDenda', e.target.checked)} />
            Wipe Denda
          </label>
        </div>

        <Field label="Total Angsuran" required>
          <CurrencyInput value={form.totalAngsuran} onChange={v => setField('totalAngsuran', v)} readOnly />
        </Field>
        <Field label="Total Pembayaran" required>
          <CurrencyInput value={form.totalPembayaran} onChange={v => setField('totalPembayaran', v)} readOnly />
        </Field>
      </FormGrid>

      <div style={{ marginTop: 16 }}>
        <Field label="Jenis Pembayaran" required>
          <div style={{ maxWidth: 'calc(50% - 12px)' }}>
            <Select
              value={form.jenisPembayaran}
              onChange={v => setField('jenisPembayaran', v)}
              options={['Normal Payment', 'Late Payment', 'Early Payment', 'Bulk Payment']}
            />
          </div>
        </Field>
      </div>

      <div style={{ marginTop: 16 }}>
        <Field label="Keterangan">
          <TextInput value={form.keterangan} onChange={v => setField('keterangan', v)} />
        </Field>
      </div>

      <div style={{ marginTop: 16 }}>
        <Field label="Rekening Sumber Pembayaran" required>
          <div style={{ maxWidth: 'calc(50% - 12px)' }}>
            <LookupInput value={form.rekeningSumber} onChange={v => setField('rekeningSumber', v)} />
          </div>
        </Field>
      </div>

      <div className="btn-bar btn-bar--between" style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid var(--c-border-soft)' }}>
        <button className="btn btn--neutral" onClick={() => onNavigate('/transaksi/pembayaran-manual')}>
          <span dangerouslySetInnerHTML={{ __html: Icons.arrowL(14) }} />
          Kembali
        </button>
        <button className="btn btn--primary" onClick={() => setConfirmOpen(true)}>
          Simpan Transaksi
        </button>
      </div>

      {confirmOpen && (
        <ConfirmDialog
          title="Konfirmasi Pembayaran Manual"
          message={`Pembayaran ${window.fmtRp(form.totalPembayaran)} untuk rekening ${rekening.noRek} akan diproses. Lanjutkan?`}
          confirmLabel="Ya, Proses"
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            showToast({ type: 'success', title: 'Pembayaran tercatat', message: `${window.fmtRp(form.totalPembayaran)} disetor.` });
            onNavigate('/transaksi/pembayaran-manual');
          }}
        />
      )}
    </div>
  );
}

/* ─────────── Pelunasan Dipercepat (Figma 2.2.1.i) ─────────── */
function PelunasanDipercepatScreen({ onNavigate, showToast, rek }) {
  const rekening = window.useRekeningFromQuery(rek);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const sisaTenor = Math.max(1, (rekening.tenor || 12) - (rekening.angsuranKe || 0));
  const sisaPokokDefault = rekening.outstanding || 35505000;
  const sisaMarginDefault = Math.round(sisaPokokDefault * 0.135 * (sisaTenor / 12));

  const [form, setForm] = React.useState({
    saldoPayment:       '0',
    tunggakan:          '41125000',
    tunggakanMargin:    '4150000',
    cicilanKe:          String(rekening.angsuranKe || 6),
    totalBulanCicilan:  String(rekening.tenor || 12),
    tglPelunasan:       '13-Jul-2023',
    sisaPokok:          String(sisaPokokDefault),
    sisaMargin:         String(sisaMarginDefault),
    dendaTawidh:        '0',
    dendaTazir:         '0',
    mukasahPct:         '0,00',
    wipeDenda:          true,
    marginDibayar:      '6505000',
    totalBayar:         String(sisaPokokDefault + 6000000),
    keterangan:         `Pembayaran sebagian ${rekening.akad?.toLowerCase()} ${rekening.nama}`,
    rekeningSumber:     '0000000623123 - Heri Tapiheru',
  });
  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Pelunasan Dipercepat — {rekening.akad}
      </h2>

      <RekeningHeroCard rekening={rekening} onNavigate={onNavigate} />

      {/* Konteks pelunasan — read-only, ditampilkan sebagai info ringkas */}
      <div className="info-panel">
        <Disp label="Saldo Payment" value={window.fmtRp(form.saldoPayment)} mono />
        <Disp label="Tunggakan" value={window.fmtRp(form.tunggakan)} mono />
        <Disp label="Tunggakan Margin" value={window.fmtRp(form.tunggakanMargin)} mono />
        <Disp label="Cicilan ke" value={`${form.cicilanKe} dari ${form.totalBulanCicilan}`} mono />
        <Disp label="Tanggal Pelunasan" value={form.tglPelunasan} mono />
      </div>

      <hr className="section-divider" />

      <FormGrid>
        <Field label="Sisa Pokok" required>
          <CurrencyInput value={form.sisaPokok} onChange={v => setField('sisaPokok', v)} readOnly />
        </Field>
        <Field label="Sisa Margin" required>
          <CurrencyInput value={form.sisaMargin} onChange={v => setField('sisaMargin', v)} readOnly />
        </Field>

        <Field label="Denda Tawidh" required>
          <CurrencyInput value={form.dendaTawidh} onChange={v => setField('dendaTawidh', v)} />
        </Field>
        <Field label="Denda Tazir" required>
          <CurrencyInput value={form.dendaTazir} onChange={v => setField('dendaTazir', v)} />
        </Field>

        <Field label="Mukasah" required>
          <NumberInput value={form.mukasahPct} onChange={v => setField('mukasahPct', v)} suffix="%" />
        </Field>
        <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 10 }}>
          <label className="cbx">
            <input type="checkbox" checked={form.wipeDenda} onChange={e => setField('wipeDenda', e.target.checked)} />
            Wipe Denda
          </label>
        </div>

        <Field label="Margin dibayar" required>
          <CurrencyInput value={form.marginDibayar} onChange={v => setField('marginDibayar', v)} />
        </Field>
        <Field label="Total Bayar" required>
          <CurrencyInput value={form.totalBayar} onChange={v => setField('totalBayar', v)} readOnly />
        </Field>
      </FormGrid>

      <div style={{ marginTop: 16 }}>
        <Field label="Keterangan">
          <TextInput value={form.keterangan} onChange={v => setField('keterangan', v)} />
        </Field>
      </div>

      <div style={{ marginTop: 16 }}>
        <Field label="Rekening Sumber Pembayaran" required>
          <div style={{ maxWidth: 'calc(50% - 12px)' }}>
            <LookupInput value={form.rekeningSumber} onChange={v => setField('rekeningSumber', v)} />
          </div>
        </Field>
      </div>

      <div className="btn-bar btn-bar--between" style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid var(--c-border-soft)' }}>
        <button className="btn btn--neutral" onClick={() => onNavigate('/transaksi/pelunasan-dipercepat')}>
          <span dangerouslySetInnerHTML={{ __html: Icons.arrowL(14) }} />
          Kembali
        </button>
        <div className="row gap-12">
          <button className="btn" style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }}
            onClick={() => onNavigate('/transaksi/pelunasan-dipercepat')}>Batal</button>
          <button className="btn btn--primary" onClick={() => setConfirmOpen(true)}>Simpan Transaksi</button>
        </div>
      </div>

      {confirmOpen && (
        <ConfirmDialog
          title="Konfirmasi Pelunasan Dipercepat"
          message={`Pelunasan rekening ${rekening.noRek} senilai ${window.fmtRp(form.totalBayar)} akan diproses. Lanjutkan?`}
          confirmLabel="Ya, Lunasi"
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            showToast({ type: 'success', title: 'Pelunasan berhasil', message: `Rekening ${rekening.noRek} telah dilunasi.` });
            onNavigate('/transaksi/pelunasan-dipercepat');
          }}
        />
      )}
    </div>
  );
}

/* ─────────── Koreksi Pembayaran / Koreksi Angsuran (Figma 2.2.1.x) ─────────── */
function KoreksiPembayaranScreen({ onNavigate, showToast, rek }) {
  const rekening = window.useRekeningFromQuery(rek);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const [form, setForm] = React.useState({
    tanggalKoreksi:        '13-Jul-2023',
    nomorSurat:            '',
    titipanAngsuran:       '0',
    akumulasiBayarPokok:   '0',
    akumulasiBayarMargin:  '0',
    koreksiTitipan:        '0',
    koreksiPokok:          '0',
    koreksiMargin:         '0',
    totalKoreksi:          '0',
    rekeningSumber:        '0000000623123 - Heri Tapiheru',
    keterangan:            `Pembatalan Pembiayaan - ${rekening.akad}`,
  });
  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Koreksi Angsuran
      </h2>

      <RekeningHeroCard rekening={rekening} onNavigate={onNavigate} />

      {/* Konteks koreksi — read-only, ditampilkan sebagai info ringkas */}
      <div className="info-panel">
        <Disp label="Tanggal Koreksi" value={form.tanggalKoreksi} mono />
        <Disp label="Nomor Surat" value={form.nomorSurat || 'Otomatis terisi'} mono />
        <Disp label="Titipan Angsuran" value={window.fmtRp(form.titipanAngsuran)} mono />
        <Disp label="Akumulasi Bayar Pokok" value={window.fmtRp(form.akumulasiBayarPokok)} mono />
        <Disp label="Akumulasi Bayar Margin" value={window.fmtRp(form.akumulasiBayarMargin)} mono />
      </div>

      <hr className="section-divider" />

      <Field label="Koreksi Titipan Angsuran" required>
        <div style={{ maxWidth: 'calc(50% - 12px)' }}>
          <CurrencyInput value={form.koreksiTitipan} onChange={v => setField('koreksiTitipan', v)} />
        </div>
      </Field>

      <div style={{ marginTop: 16 }}>
        <FormGrid>
          <Field label="Koreksi Pokok" required>
            <CurrencyInput value={form.koreksiPokok} onChange={v => setField('koreksiPokok', v)} />
          </Field>
          <Field label="Koreksi Margin" required>
            <CurrencyInput value={form.koreksiMargin} onChange={v => setField('koreksiMargin', v)} />
          </Field>
        </FormGrid>
      </div>

      <div style={{ marginTop: 16 }}>
        <Field label="Total Koreksi" required>
          <div style={{ maxWidth: 'calc(50% - 12px)' }}>
            <CurrencyInput value={form.totalKoreksi} onChange={v => setField('totalKoreksi', v)} readOnly />
          </div>
        </Field>
      </div>

      <div style={{ marginTop: 16 }}>
        <Field label="Rekening Sumber Pembayaran" required>
          <div style={{ maxWidth: 'calc(50% - 12px)' }}>
            <LookupInput value={form.rekeningSumber} onChange={v => setField('rekeningSumber', v)} />
          </div>
        </Field>
      </div>

      <div style={{ marginTop: 16 }}>
        <Field label="Keterangan">
          <TextInput value={form.keterangan} onChange={v => setField('keterangan', v)} />
        </Field>
      </div>

      <div className="btn-bar btn-bar--between" style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid var(--c-border-soft)' }}>
        <button className="btn btn--neutral" onClick={() => onNavigate('/transaksi/koreksi-pembayaran')}>
          <span dangerouslySetInnerHTML={{ __html: Icons.arrowL(14) }} />
          Kembali
        </button>
        <div className="row gap-12">
          <button className="btn" style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }}
            onClick={() => onNavigate('/transaksi/koreksi-pembayaran')}>Batal</button>
          <button className="btn btn--primary" onClick={() => setConfirmOpen(true)}>Simpan Koreksi</button>
        </div>
      </div>

      {confirmOpen && (
        <ConfirmDialog
          title="Konfirmasi Koreksi Angsuran"
          message={`Koreksi angsuran rekening ${rekening.noRek} senilai ${window.fmtRp(form.totalKoreksi)} akan diproses. Lanjutkan?`}
          confirmLabel="Ya, Koreksi"
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            showToast({ type: 'success', title: 'Koreksi tersimpan', message: `Rekening ${rekening.noRek}` });
            onNavigate('/transaksi/koreksi-pembayaran');
          }}
        />
      )}
    </div>
  );
}

/* ─────────── Input Biaya-Biaya (Figma 2.2.1.d) ─────────── */
function InputBiayaScreen({ onNavigate, showToast, rek }) {
  const rekening = window.useRekeningFromQuery(rek);

  const [rows, setRows] = React.useState([
    { elemen: 'Biaya Administrasi', vendor: '41274128312 - Pend. Admin', sumber: 'Nasabah', rekeningSumber: '0000000623123 - Heri Tapiheru', nominal: '500000', pajak: '0', rekeningVendor: '' },
    { elemen: 'Biaya Notaris',      vendor: '41274128314 - Pend. Notaris', sumber: 'Bank', rekeningSumber: '0000000623123 - Heri Tapiheru', nominal: '750000', pajak: '0', rekeningVendor: 'Notaris Rina S.H.' },
  ]);

  // Add Data Biaya modal
  const emptyDraft = { elemen: '', vendor: '', sumber: 'Nasabah', rekeningSumber: '', nominal: '0', pajak: '0', rekeningVendor: '' };
  const [modalOpen, setModalOpen] = React.useState(false);
  const [draft, setDraft] = React.useState(emptyDraft);
  const setDraftField = (k, v) => setDraft(d => ({ ...d, [k]: v }));

  const openAdd = () => { setDraft(emptyDraft); setModalOpen(true); };
  const saveBiaya = () => {
    if (!draft.elemen || !draft.nominal || Number(draft.nominal) <= 0) {
      showToast({ type: 'warn', title: 'Data belum lengkap', message: 'Elemen Biaya dan Nominal Biaya wajib diisi.' });
      return;
    }
    setRows(arr => [...arr, draft]);
    setModalOpen(false);
    showToast({ type: 'success', title: 'Data biaya ditambahkan' });
  };

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Input Data Biaya — {rekening.akad}
      </h2>

      <RekeningHeroCard rekening={rekening} onNavigate={onNavigate} />

      <div className="row row--between" style={{ marginTop: 8, marginBottom: 12 }}>
        <h4 className="section-title" style={{ margin: 0 }}>List Data Biaya</h4>
        <button className="btn btn--primary btn--sm" onClick={openAdd}>
          <span dangerouslySetInnerHTML={{ __html: Icons.add(14) }} />
          Data Biaya
        </button>
      </div>

      <table className="tbl">
        <thead>
          <tr>
            <th style={{ width: 44 }}>No</th>
            <th>Elemen Biaya</th>
            <th>Rekening GL</th>
            <th>Sumber Biaya</th>
            <th>Rekening Sumber</th>
            <th className="text-right">Nominal Biaya</th>
            <th className="text-right">Nominal Pajak</th>
            <th>Rekening Vendor</th>
            <th style={{ width: 48 }}></th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr className="tbl-row--empty"><td colSpan={9} className="tbl-empty">Belum ada data biaya. Klik "Data Biaya" untuk menambah.</td></tr>
          ) : rows.map((b, i) => (
            <tr key={i}>
              <td className="mono">{i + 1}</td>
              <td>{b.elemen}</td>
              <td className="mono text-sm">{b.vendor || '-'}</td>
              <td><span className="tag tag--neutral">{b.sumber}</span></td>
              <td className="mono text-sm">{b.rekeningSumber || '-'}</td>
              <td className="mono text-right">{window.fmtRp(b.nominal)}</td>
              <td className="mono text-right">{window.fmtRp(b.pajak)}</td>
              <td className="text-sm">{b.rekeningVendor || '-'}</td>
              <td className="text-right">
                <button className="icon-btn"
                  onClick={() => setRows(arr => arr.filter((_, idx) => idx !== i))}
                  dangerouslySetInnerHTML={{ __html: Icons.trash(16) }} />
              </td>
            </tr>
          ))}
          {rows.length > 0 && (
            <tr style={{ background: 'var(--c-row-hover)', fontWeight: 600 }}>
              <td colSpan={5} className="text-right">Total</td>
              <td className="mono text-right">{window.fmtRp(rows.reduce((s, b) => s + (Number(b.nominal) || 0), 0))}</td>
              <td className="mono text-right">{window.fmtRp(rows.reduce((s, b) => s + (Number(b.pajak) || 0), 0))}</td>
              <td colSpan={2}></td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="btn-bar btn-bar--between" style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid var(--c-border-soft)' }}>
        <button className="btn btn--neutral" onClick={() => onNavigate('/transaksi/input-biaya')}>
          <span dangerouslySetInnerHTML={{ __html: Icons.arrowL(14) }} />
          Tutup
        </button>
      </div>

      {modalOpen && (
        <Modal
          title="Tambah Data Biaya"
          subtitle="Lengkapi detail biaya yang akan dibebankan"
          onClose={() => setModalOpen(false)}
          footer={
            <>
              <button className="btn btn--neutral" onClick={() => setModalOpen(false)}>Batal</button>
              <button className="btn btn--primary" onClick={saveBiaya}>Simpan</button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field label="Elemen Biaya" required>
              <Select value={draft.elemen} onChange={v => setDraftField('elemen', v)}
                placeholder="-- Pilih elemen biaya --"
                options={['Biaya Administrasi', 'Biaya Provisi', 'Biaya Notaris', 'Biaya Asuransi', 'Biaya Materai', 'Biaya Appraisal']} />
            </Field>
            <Field label="Rekening GL" required>
              <LookupInput value={draft.vendor} onChange={v => setDraftField('vendor', v)} placeholder="-- Cari Rekening GL --" />
            </Field>
            <Field label="Sumber Biaya" required>
              <div className="seg">
                {['Nasabah', 'Bank'].map(opt => (
                  <button key={opt} type="button"
                    className={'seg__opt' + (draft.sumber === opt ? ' seg__opt--active' : '')}
                    onClick={() => setDraftField('sumber', opt)}>{opt}</button>
                ))}
              </div>
            </Field>
            <Field label="Rekening Sumber Biaya" required>
              <LookupInput value={draft.rekeningSumber} onChange={v => setDraftField('rekeningSumber', v)} placeholder="-- Cari rekening --" />
            </Field>
            <FormGrid>
              <Field label="Nominal Biaya" required>
                <CurrencyInput value={draft.nominal} onChange={v => setDraftField('nominal', v)} placeholder="0" />
              </Field>
              <Field label="Nominal Pajak">
                <CurrencyInput value={draft.pajak} onChange={v => setDraftField('pajak', v)} readOnly />
              </Field>
            </FormGrid>
            <Field label="Rekening Vendor">
              <TextInput value={draft.rekeningVendor} onChange={v => setDraftField('rekeningVendor', v)} placeholder="Masukan keterangan / rekening vendor" />
            </Field>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ─────────── Reposisi Cabang (Figma 2.2.1.j) ─────────── */
function ReposisiCabangTransaksiScreen({ onNavigate, showToast, rek }) {
  const rekening = window.useRekeningFromQuery(rek);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const [form, setForm] = React.useState({
    tanggalReposisi:  '24-May-2026',
    cabangAsal:       '001 - Kantor Pusat',
    cabangTujuan:     '',
    aoAsal:           'Ardhiyanto Wibowo (BCSHQB109T)',
    aoTujuan:         '',
    nomorSurat:       '',
    alasan:           '',
  });
  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const cabangOptions = [
    '001 - Kantor Pusat',
    '005 - Bandung Asia Afrika',
    '012 - Kelapa Gading',
    '023 - Surabaya Tunjungan',
    '034 - Yogya Malioboro',
    '041 - Medan Pemuda',
  ];

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Reposisi Cabang
      </h2>

      <RekeningHeroCard rekening={rekening} onNavigate={onNavigate} />

      <FormGrid>
        <Field label="Tanggal Reposisi" required>
          <DateInput value={form.tanggalReposisi} onChange={v => setField('tanggalReposisi', v)} />
        </Field>
        <Field label="Nomor Surat" required>
          <TextInput value={form.nomorSurat} onChange={v => setField('nomorSurat', v)} placeholder="cth: SR/2026/05/0023" />
        </Field>

        <Field label="Cabang Asal" required>
          <Select value={form.cabangAsal} onChange={v => setField('cabangAsal', v)} options={cabangOptions} disabled />
        </Field>
        <Field label="Cabang Tujuan" required>
          <Select value={form.cabangTujuan} onChange={v => setField('cabangTujuan', v)} options={cabangOptions} placeholder="-- Pilih cabang tujuan --" />
        </Field>

        <Field label="Account Officer Asal" required>
          <TextInput value={form.aoAsal} onChange={v => setField('aoAsal', v)} disabled />
        </Field>
        <Field label="Account Officer Tujuan" required>
          <LookupInput value={form.aoTujuan} onChange={v => setField('aoTujuan', v)} placeholder="-- Cari AO --" />
        </Field>
      </FormGrid>

      <div style={{ marginTop: 16 }}>
        <Field label="Alasan Reposisi" required>
          <textarea value={form.alasan} onChange={e => setField('alasan', e.target.value)}
            rows={3} placeholder="cth: Perubahan portofolio cabang, dll." />
        </Field>
      </div>

      <div className="approval-banner" style={{ marginTop: 16, background: 'var(--c-info-bg)', borderLeftColor: 'var(--c-info)' }}>
        <span style={{ color: 'var(--c-info)', flexShrink: 0 }} dangerouslySetInnerHTML={{ __html: Icons.info(20) }} />
        <div className="approval-banner__body">
          Pemindahan portofolio antar cabang memerlukan persetujuan kedua Kepala Cabang dan akan masuk antrian otorisasi.
        </div>
      </div>

      <div className="btn-bar btn-bar--between" style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid var(--c-border-soft)' }}>
        <button className="btn btn--neutral" onClick={() => onNavigate('/transaksi/reposisi-cabang')}>
          <span dangerouslySetInnerHTML={{ __html: Icons.arrowL(14) }} />
          Kembali
        </button>
        <div className="row gap-12">
          <button className="btn" style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }}
            onClick={() => onNavigate('/transaksi/reposisi-cabang')}>Batal</button>
          <button className="btn btn--primary" onClick={() => setConfirmOpen(true)}>Simpan Reposisi</button>
        </div>
      </div>

      {confirmOpen && (
        <ConfirmDialog
          title="Konfirmasi Reposisi Cabang"
          message={`Rekening ${rekening.noRek} akan dipindahkan ke ${form.cabangTujuan || '—'}. Lanjutkan?`}
          confirmLabel="Ya, Reposisi"
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            showToast({ type: 'success', title: 'Reposisi diajukan', message: `Rekening ${rekening.noRek}` });
            onNavigate('/transaksi/reposisi-cabang');
          }}
        />
      )}
    </div>
  );
}

/* ─────────── Ganti Produk (model: Reposisi Cabang) ─────────── */
function GantiProdukScreen({ onNavigate, showToast, rek }) {
  const rekening = window.useRekeningFromQuery(rek);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const [form, setForm] = React.useState({
    tanggalGanti:  '24-May-2026',
    produkLama:    rekening.produk || 'Mudharabah',
    produkBaru:    '',
    nomorSurat:    '',
    alasan:        '',
  });
  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const produkOptions = [
    'Murabahah',
    'Mudharabah',
    'Musyarakah',
    'MMQ',
    'Ijarah Multijasa',
    'Istishna',
    'Qardh',
  ];

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Ganti Produk
      </h2>

      <RekeningHeroCard rekening={rekening} onNavigate={onNavigate} />

      <FormGrid>
        <Field label="Tanggal Ganti Produk" required>
          <DateInput value={form.tanggalGanti} onChange={v => setField('tanggalGanti', v)} />
        </Field>
        <Field label="Nomor Surat" required>
          <TextInput value={form.nomorSurat} onChange={v => setField('nomorSurat', v)} placeholder="cth: SR/2026/05/0023" />
        </Field>

        <Field label="Produk Lama" required>
          <Select value={form.produkLama} onChange={v => setField('produkLama', v)} options={produkOptions} disabled />
        </Field>
        <Field label="Produk Baru" required>
          <Select value={form.produkBaru} onChange={v => setField('produkBaru', v)} options={produkOptions} placeholder="-- Pilih produk baru --" />
        </Field>
      </FormGrid>

      <div style={{ marginTop: 16 }}>
        <Field label="Alasan Ganti Produk" required>
          <textarea value={form.alasan} onChange={e => setField('alasan', e.target.value)}
            rows={3} placeholder="cth: Penyesuaian akad pembiayaan, dll." />
        </Field>
      </div>

      <div className="approval-banner" style={{ marginTop: 16, background: 'var(--c-info-bg)', borderLeftColor: 'var(--c-info)' }}>
        <span style={{ color: 'var(--c-info)', flexShrink: 0 }} dangerouslySetInnerHTML={{ __html: Icons.info(20) }} />
        <div className="approval-banner__body">
          Penggantian produk akan mengubah parameter akad rekening dan akan masuk antrian otorisasi.
        </div>
      </div>

      <div className="btn-bar btn-bar--between" style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid var(--c-border-soft)' }}>
        <button className="btn btn--neutral" onClick={() => onNavigate('/transaksi/ganti-produk')}>
          <span dangerouslySetInnerHTML={{ __html: Icons.arrowL(14) }} />
          Kembali
        </button>
        <div className="row gap-12">
          <button className="btn" style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }}
            onClick={() => onNavigate('/transaksi/ganti-produk')}>Batal</button>
          <button className="btn btn--primary" onClick={() => setConfirmOpen(true)}>Simpan Ganti Produk</button>
        </div>
      </div>

      {confirmOpen && (
        <ConfirmDialog
          title="Konfirmasi Ganti Produk"
          message={`Produk rekening ${rekening.noRek} akan diubah dari ${form.produkLama} ke ${form.produkBaru || '—'}. Lanjutkan?`}
          confirmLabel="Ya, Ganti Produk"
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            showToast({ type: 'success', title: 'Ganti produk diajukan', message: `Rekening ${rekening.noRek}` });
            onNavigate('/transaksi/ganti-produk');
          }}
        />
      )}
    </div>
  );
}

/* ─────────── Registrasi Hapus Buku (Figma 2.2.1.q) ─────────── */
function RegistrasiHapusBukuScreen({ onNavigate, showToast, rek }) {
  const rekening = window.useRekeningFromQuery(rek);
  const sisaPokok  = rekening.outstanding;
  const sisaMargin = Math.round(rekening.outstanding * 0.053);
  const [form, setForm] = React.useState({
    tanggalTransaksi:   '24-May-2026',
    nomorSK:            '',
    sisaPokok:          String(sisaPokok),
    sisaMargin:         String(sisaMargin),
    nilaiWOMargin:      String(sisaMargin),
    subrogasiAsuransi:  false,
    perusahaanAsuransi: 'Perusahaan asuransi 1',
    rekeningAsuransi:   '00182312 - Rek Asuransi 1',
    asuransiPokok:      '200000',
    asuransiMargin:     '200000',
  });
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Registrasi Hapus Buku — {rekening.akad}
      </h2>

      <RekeningHeroCard rekening={rekening} onNavigate={onNavigate} />

      <div className="approval-banner">
        <span className="approval-banner__icon" dangerouslySetInnerHTML={{ __html: Icons.warning(20) }} />
        <div className="approval-banner__body">
          <b>Aksi sensitif.</b> Hapus buku tidak menghapus kewajiban nasabah — rekening masih akan ditagih melalui mekanisme recovery.
          Diperlukan persetujuan Direksi.
        </div>
      </div>

      {/* Nilai hapus buku — read-only, hasil perhitungan sistem */}
      <div className="info-panel">
        <Disp label="Tanggal Transaksi" value={form.tanggalTransaksi} mono />
        <Disp label="Nomor SK Hapus Buku" value={form.nomorSK || 'Otomatis terisi'} mono />
        <Disp label="Sisa Pokok" value={window.fmtRp(form.sisaPokok)} mono />
        <Disp label="Sisa Margin" value={window.fmtRp(form.sisaMargin)} mono />
      </div>

      <FormGrid>
        <Field label="Nilai WO Margin" required>
          <CurrencyInput value={form.nilaiWOMargin} onChange={v => setField('nilaiWOMargin', v)} placeholder="0" />
        </Field>
      </FormGrid>

      <label className="cbx" style={{ marginTop: 8 }}>
        <input type="checkbox" checked={form.subrogasiAsuransi} onChange={e => setField('subrogasiAsuransi', e.target.checked)} />
        Subrogasi Asuransi
      </label>

      {form.subrogasiAsuransi && (
        <>
          <h4 className="section-title">Klaim Subrogasi Asuransi</h4>
          <FormGrid>
            <Field label="Perusahaan Asuransi" required>
              <LookupInput value={form.perusahaanAsuransi} onChange={v => setField('perusahaanAsuransi', v)} />
            </Field>
            <Field label="Rekening Asuransi" required>
              <LookupInput value={form.rekeningAsuransi} onChange={v => setField('rekeningAsuransi', v)} />
            </Field>
          </FormGrid>
          <div className="info-panel" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginTop: 16 }}>
            <Disp label="Asuransi Pokok" value={window.fmtRp(form.asuransiPokok)} mono />
            <Disp label="Asuransi Margin" value={window.fmtRp(form.asuransiMargin)} mono />
          </div>
        </>
      )}

      <div className="btn-bar btn-bar--between" style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid var(--c-border-soft)' }}>
        <button className="btn btn--neutral" onClick={() => onNavigate('/transaksi/hapus-buku/registrasi')}>
          <span dangerouslySetInnerHTML={{ __html: Icons.arrowL(14) }} />
          Kembali
        </button>
        <button className="btn btn--danger" onClick={() => {
          if (!form.nilaiWOMargin || Number(form.nilaiWOMargin) <= 0) {
            showToast({ type: 'warn', title: 'Data belum lengkap', message: 'Nilai WO Margin wajib diisi.' });
            return;
          }
          setConfirmOpen(true);
        }}>
          <span dangerouslySetInnerHTML={{ __html: Icons.flag(16) }} />
          Submit Hapus Buku
        </button>
      </div>

      {confirmOpen && (
        <ConfirmDialog
          title="Konfirmasi Hapus Buku"
          message={`Rekening ${rekening.noRek} senilai ${window.fmtRp(form.sisaPokok)} akan dihapus dari neraca. Lanjutkan?`}
          danger
          confirmLabel="Ya, Hapus Buku"
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            showToast({ type: 'warn', title: 'Menunggu otorisasi Direksi', message: `Rekening ${rekening.noRek} masuk antrian eskalasi.` });
            onNavigate('/otorisasi');
          }}
        />
      )}
    </div>
  );
}

/* ─────────── Recovery Hapus Buku (Figma 2.2.1.s) ─────────── */
function RecoveryHapusBukuScreen({ onNavigate, showToast, rek }) {
  const rekening = window.useRekeningFromQuery(rek);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const sisaMargin = Math.round(rekening.outstanding * 0.053);
  const [form, setForm] = React.useState({
    // Info hapus buku (read-only)
    tglHapusBuku:       '23-Agus-2023',
    nomorSK:            'SK/3123AAD/2023',
    nilaiHapusBuku:     String(rekening.outstanding),
    perusahaanAsuransi: 'Perusahaan asuransi 1',
    pokokAsuransiDibayar:  '200000',
    marginAsuransiDibayar: '200000',
    // Transaksi pembayaran (editable)
    tanggalTransaksi:   '24-May-2026',
    titipanPembiayaan:  '0',
    sisaMargin:         String(sisaMargin),
    keterangan:         `Recovery Write Off - ${rekening.akad}`,
    recoveryPokok:      String(rekening.outstanding),
    recoveryMargin:     String(sisaMargin),
    diskonMargin:       '0',
    sumberPembayaran:   'Rekening GL',
    rekeningGL:         '',
  });
  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Pembayaran Hapus Buku — {rekening.akad}
      </h2>

      <RekeningHeroCard rekening={rekening} onNavigate={onNavigate} />

      <div className="approval-banner" style={{ background: 'var(--c-info-bg)', borderLeftColor: 'var(--c-info)' }}>
        <span style={{ color: 'var(--c-info)', flexShrink: 0 }} dangerouslySetInnerHTML={{ __html: Icons.info(20) }} />
        <div className="approval-banner__body">
          Pembayaran recovery dicatat sebagai <b>pendapatan</b> bank (bukan mengurangi saldo pokok), karena rekening sudah hapus buku.
        </div>
      </div>

      {/* Ringkasan hapus buku — read-only */}
      <div className="info-panel" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <Disp label="Tanggal Hapus Buku" value={form.tglHapusBuku} mono />
        <Disp label="Nomor SK Hapus Buku" value={form.nomorSK} mono />
        <Disp label="Nilai Hapus Buku" value={window.fmtRp(form.nilaiHapusBuku)} mono />
        <Disp label="Perusahaan Asuransi" value={form.perusahaanAsuransi} />
        <Disp label="Pokok Asuransi Dibayar" value={window.fmtRp(form.pokokAsuransiDibayar)} mono />
        <Disp label="Margin Asuransi Dibayar" value={window.fmtRp(form.marginAsuransiDibayar)} mono />
      </div>

      <h4 className="section-title">Transaksi Pembayaran Hapus Buku</h4>
      <FormGrid>
        <Field label="Tanggal Transaksi" required>
          <DateInput value={form.tanggalTransaksi} onChange={v => setField('tanggalTransaksi', v)} readOnly />
        </Field>
        <div></div>

        <Field label="Titipan Pembiayaan" required>
          <CurrencyInput value={form.titipanPembiayaan} onChange={v => setField('titipanPembiayaan', v)} readOnly />
        </Field>
        <Field label="Sisa Margin" required>
          <CurrencyInput value={form.sisaMargin} onChange={v => setField('sisaMargin', v)} readOnly />
        </Field>

        <Field label="Recovery Pokok" required>
          <CurrencyInput value={form.recoveryPokok} onChange={v => setField('recoveryPokok', v)} />
        </Field>
        <Field label="Recovery Margin" required>
          <CurrencyInput value={form.recoveryMargin} onChange={v => setField('recoveryMargin', v)} />
        </Field>

        <Field label="Diskon Margin">
          <CurrencyInput value={form.diskonMargin} onChange={v => setField('diskonMargin', v)} />
        </Field>
        <div></div>

        <Field label="Sumber Pembayaran" required>
          <Select value={form.sumberPembayaran} onChange={v => setField('sumberPembayaran', v)}
            options={['Rekening GL', 'Rekening Tabungan', 'Kas / Tunai']} />
        </Field>
        <Field label="Rekening GL" required>
          <LookupInput value={form.rekeningGL} onChange={v => setField('rekeningGL', v)} placeholder="-- Cari --" />
        </Field>

        <Field label="Keterangan" span="full">
          <TextInput value={form.keterangan} onChange={v => setField('keterangan', v)} />
        </Field>
      </FormGrid>

      <div className="btn-bar btn-bar--between" style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid var(--c-border-soft)' }}>
        <button className="btn btn--neutral" onClick={() => onNavigate('/transaksi/hapus-buku/recovery')}>
          <span dangerouslySetInnerHTML={{ __html: Icons.arrowL(14) }} />
          Kembali
        </button>
        <div className="row gap-12">
          <button className="btn" style={{ background: 'transparent', color: 'var(--c-error)', border: '1px solid var(--c-error)' }}
            onClick={() => onNavigate('/transaksi/hapus-buku/recovery')}>Batal</button>
          <button className="btn btn--primary" onClick={() => setConfirmOpen(true)}>
            <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(14) }} />
            Catat Recovery
          </button>
        </div>
      </div>

      {confirmOpen && (
        <ConfirmDialog
          title="Konfirmasi Pembayaran Recovery"
          message={`Recovery ${window.fmtRp(form.recoveryPokok)} terhadap rekening hapus buku ${rekening.noRek} akan dicatat. Lanjutkan?`}
          confirmLabel="Ya, Catat"
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            showToast({ type: 'success', title: 'Recovery tercatat', message: `${window.fmtRp(form.recoveryPokok)} masuk pendapatan.` });
            onNavigate('/transaksi/hapus-buku/recovery');
          }}
        />
      )}
    </div>
  );
}

/* ─────────── Hapus Tagih (Figma 2.2.1.r) ─────────── */
function HapusTagihScreen({ onNavigate, showToast, rek }) {
  const rekening = window.useRekeningFromQuery(rek);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [persetujuan, setPersetujuan] = React.useState(false);
  const [form, setForm] = React.useState({
    // Ringkasan hapus buku (read-only)
    tglHapusBuku:       '23-Agus-2023',
    nomorSK:            'SK/3123AAD/2023',
    nilaiHapusBuku:     String(rekening.outstanding),
    perusahaanAsuransi: 'Perusahaan asuransi 1',
    pokokAsuransiDibayar:  '200000',
    marginAsuransiDibayar: '200000',
    // Transaksi (editable)
    tanggalTransaksi:   '24-May-2026',
    keterangan:         `Hapus Tagih - ${rekening.akad}`,
  });
  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="card">
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: '1px solid var(--c-border-soft)' }}>
        Hapus Tagih — {rekening.akad}
      </h2>

      <RekeningHeroCard rekening={rekening} onNavigate={onNavigate} />

      <div className="approval-banner" style={{ background: 'var(--c-error-bg)', borderLeftColor: 'var(--c-error)' }}>
        <span style={{ color: 'var(--c-error)', flexShrink: 0 }} dangerouslySetInnerHTML={{ __html: Icons.warning(20) }} />
        <div className="approval-banner__body">
          <b>Aksi tidak dapat dibatalkan.</b> Hapus Tagih akan menghilangkan kewajiban nasabah secara permanen.
          Diperlukan persetujuan Direksi dan dokumentasi lengkap upaya penagihan.
        </div>
      </div>

      {/* Ringkasan hapus buku — read-only */}
      <div className="info-panel" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <Disp label="Tanggal Hapus Buku" value={form.tglHapusBuku} mono />
        <Disp label="Nomor SK Hapus Buku" value={form.nomorSK} mono />
        <Disp label="Nilai Hapus Buku" value={window.fmtRp(form.nilaiHapusBuku)} mono />
        <Disp label="Perusahaan Asuransi" value={form.perusahaanAsuransi} />
        <Disp label="Pokok Asuransi Dibayar" value={window.fmtRp(form.pokokAsuransiDibayar)} mono />
        <Disp label="Margin Asuransi Dibayar" value={window.fmtRp(form.marginAsuransiDibayar)} mono />
      </div>

      <h4 className="section-title">Transaksi Hapus Tagih</h4>
      <FormGrid>
        <Field label="Tanggal Transaksi" required>
          <DateInput value={form.tanggalTransaksi} onChange={v => setField('tanggalTransaksi', v)} readOnly />
        </Field>
        <div></div>
        <Field label="Keterangan" span="full">
          <TextInput value={form.keterangan} onChange={v => setField('keterangan', v)} />
        </Field>
      </FormGrid>

      <Field label="Dokumen Pendukung" style={{ marginTop: 16 }}>
        <div style={{ border: '2px dashed var(--c-border)', borderRadius: 8, padding: 24, textAlign: 'center', color: 'var(--c-text-muted)' }}>
          <span dangerouslySetInnerHTML={{ __html: Icons.upload(28) }} />
          <div style={{ fontSize: 13, marginTop: 8 }}>Upload Surat Persetujuan Direksi, Berita Acara Penagihan, dan dokumen pendukung lain</div>
        </div>
      </Field>

      <label className="cbx" style={{ marginTop: 16 }}>
        <input type="checkbox" checked={persetujuan} onChange={e => setPersetujuan(e.target.checked)} />
        Saya mengerti bahwa aksi ini permanen dan telah mendapatkan persetujuan Direksi.
      </label>

      <div className="btn-bar btn-bar--between" style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid var(--c-border-soft)' }}>
        <button className="btn btn--neutral" onClick={() => onNavigate('/transaksi/hapus-buku/hapus-tagih')}>
          <span dangerouslySetInnerHTML={{ __html: Icons.arrowL(14) }} />
          Kembali
        </button>
        <button className="btn btn--danger" disabled={!persetujuan} onClick={() => setConfirmOpen(true)}>
          <span dangerouslySetInnerHTML={{ __html: Icons.trash(16) }} />
          Submit Hapus Tagih
        </button>
      </div>

      {confirmOpen && (
        <ConfirmDialog
          title="Hapus Tagih?"
          message="Anda yakin melakukan hapus tagih? Aksi ini permanen dan tidak dapat dibatalkan."
          confirmLabel="Ya, Hapus Tagih"
          danger
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            showToast({ type: 'warn', title: 'Hapus tagih diproses', message: 'Menunggu otorisasi final Direksi.' });
            onNavigate('/otorisasi');
          }}
        />
      )}
    </div>
  );
}

Object.assign(window, {
  PembayaranManualScreen,
  PelunasanDipercepatScreen,
  KoreksiPembayaranScreen,
  InputBiayaScreen,
  ReposisiCabangTransaksiScreen,
  GantiProdukScreen,
  RegistrasiHapusBukuScreen,
  RecoveryHapusBukuScreen,
  HapusTagihScreen,
});
