/* app.jsx — main router + Tweaks panel for the Financing prototype. */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tenant": "ihsan",
  "density": "compact",
  "popupStyle": "menu",
  "role": "Maker"
}/*EDITMODE-END*/;

function App() {
  const [authed, setAuthed] = React.useState(() => sessionStorage.getItem('bos7_authed') === '1');
  const [route, setRoute] = React.useState(() => {
    const h = window.location.hash.replace(/^#/, '');
    return h || '/landing';
  });
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [toast, setToast] = React.useState(null);

  // Hash routing
  React.useEffect(() => {
    const onChange = () => {
      const h = window.location.hash.replace(/^#/, '');
      setRoute(h || '/overview');
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  // Apply tenant + density attrs on root
  React.useEffect(() => {
    document.documentElement.dataset.tenant = tweaks.tenant;
    document.documentElement.dataset.density = tweaks.density;
  }, [tweaks.tenant, tweaks.density]);

  // Scroll to top on navigation
  React.useEffect(() => {
    document.querySelector('.page')?.scrollTo(0, 0);
  }, [route]);

  const navigate = React.useCallback((to) => {
    window.location.hash = to;
  }, []);

  const showToast = React.useCallback((t) => setToast(t), []);

  const onLogin = React.useCallback(() => {
    sessionStorage.setItem('bos7_authed', '1');
    window.location.hash = '/landing';
    setAuthed(true);
  }, []);

  const onLogout = React.useCallback(() => {
    sessionStorage.removeItem('bos7_authed');
    setAuthed(false);
  }, []);

  if (!authed) {
    return (
      <>
        <LoginScreen onLogin={onLogin} />
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </>
    );
  }

  return (
    <>
      <Shell route={route} onNavigate={navigate} onLogout={onLogout}>
        <RouteSwitch route={route} onNavigate={navigate} popupStyle={tweaks.popupStyle} showToast={showToast} />
      </Shell>

      <TweaksUI tweaks={tweaks} setTweak={setTweak} />

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </>
  );
}

function RouteSwitch({ route, onNavigate, popupStyle, showToast }) {
  const props = { onNavigate, popupStyle, showToast };
  const [base, qs] = route.split('?');
  const query = Object.fromEntries(new URLSearchParams(qs || '').entries());

  // Simulasi with akad query
  if (base === '/simulasi')             return <SimulasiScreen {...props} akad={query.akad} />;

  switch (base) {
    case '/landing':                    return <ModuleLandingScreen {...props} />;
    case '/overview':                   return <OverviewScreen {...props} />;
    case '/dashboard':                  return <DashboardScreen {...props} />;

    // Fasilitas
    case '/registrasi-fasilitas':       return <RegistrasiFasilitasScreen {...props} />;
    case '/list-fasilitas':             return <ListFasilitasScreen {...props} />;
    case '/list-fasilitas/detail':      return <DetailFasilitasScreen {...props} />;
    case '/list-fasilitas/addendum':    return <AddendumFasilitasScreen {...props} />;
    case '/list-fasilitas/koreksi':     return <KoreksiFasilitasScreen {...props} />;
    case '/list-fasilitas/reposisi':    return <ReposisiFasilitasScreen {...props} />;
    case '/list-fasilitas/tutup':       return <TutupFasilitasScreen {...props} />;

    // Pembiayaan
    case '/registrasi/pembiayaan':      return <LandingRegistrasiPembiayaanScreen {...props} />;
    case '/registrasi/pembiayaan/form': return <RegistrasiPembiayaanScreen {...props} akad={query.akad} />;
    case '/list-pembiayaan':            return <ListPembiayaanScreen {...props} />;
    case '/list-pembiayaan/edit':       return <EditRekeningScreen {...props} />;
    case '/list-pembiayaan/edit-kelengkapan': return <EditKelengkapanDataScreen {...props} />;
    case '/list-pembiayaan/detail':     return <DetailPembiayaanScreen {...props} />;
    case '/edit/data':                  return <EditRekeningLandingScreen {...props} mode="data" />;
    case '/edit/data/form':             return <UbahDataRekeningScreen {...props} />;
    case '/edit/kelengkapan-data':      return <EditRekeningLandingScreen {...props} mode="kelengkapan" />;
    case '/edit/addendum':              return <EditRekeningLandingScreen {...props} mode="addendum" />;
    case '/edit/addendum/form':         return <AddendumPembiayaanScreen {...props} />;
    case '/edit/restruktur':            return <EditRekeningLandingScreen {...props} mode="restruktur" />;
    case '/edit/restruktur/form':       return <RestrukturFormScreen {...props} />;
    case '/edit/ulang-jadwal':          return <EditRekeningLandingScreen {...props} mode="ulang-jadwal" />;
    case '/edit/ulang-jadwal/form':     return <UbahJadwalAngsuranFormScreen {...props} />;
    case '/edit/agunan':                return <EditRekeningLandingScreen {...props} mode="agunan" />;
    case '/edit/agunan/form':           return <PengikatanAgunanScreen {...props} />;
    case '/edit/objek':                 return <EditRekeningLandingScreen {...props} mode="objek" />;
    case '/edit/objek/form':            return <ObjekPembiayaanScreen {...props} />;

    // Transaksi — each menu: landing (cari rekening) → form
    case '/transaksi/pembayaran-manual':         return <TransaksiLandingScreen {...props} mode="pembayaran-manual" />;
    case '/transaksi/pembayaran-manual/form':    return <PembayaranManualScreen {...props} rek={query.rek} />;
    case '/transaksi/pelunasan-dipercepat':      return <TransaksiLandingScreen {...props} mode="pelunasan-dipercepat" />;
    case '/transaksi/pelunasan-dipercepat/form': return <PelunasanDipercepatScreen {...props} rek={query.rek} />;
    case '/transaksi/koreksi-pembayaran':        return <TransaksiLandingScreen {...props} mode="koreksi-pembayaran" />;
    case '/transaksi/koreksi-pembayaran/form':   return <KoreksiPembayaranScreen {...props} rek={query.rek} />;
    case '/transaksi/input-biaya':               return <TransaksiLandingScreen {...props} mode="input-biaya" />;
    case '/transaksi/input-biaya/form':          return <InputBiayaScreen {...props} rek={query.rek} />;
    case '/transaksi/reposisi-cabang':           return <TransaksiLandingScreen {...props} mode="reposisi-cabang" />;
    case '/transaksi/reposisi-cabang/form':      return <ReposisiCabangTransaksiScreen {...props} rek={query.rek} />;
    case '/transaksi/ganti-produk':              return <TransaksiLandingScreen {...props} mode="ganti-produk" />;
    case '/transaksi/ganti-produk/form':         return <GantiProdukScreen {...props} rek={query.rek} />;
    case '/transaksi/hapus-buku/registrasi':     return <TransaksiLandingScreen {...props} mode="hapus-buku-registrasi" />;
    case '/transaksi/hapus-buku/registrasi/form':return <RegistrasiHapusBukuScreen {...props} rek={query.rek} />;
    case '/transaksi/hapus-buku/recovery':       return <TransaksiLandingScreen {...props} mode="hapus-buku-recovery" />;
    case '/transaksi/hapus-buku/recovery/form':  return <RecoveryHapusBukuScreen {...props} rek={query.rek} />;
    case '/transaksi/hapus-buku/hapus-tagih':    return <TransaksiLandingScreen {...props} mode="hapus-tagih" />;
    case '/transaksi/hapus-buku/hapus-tagih/form':return <HapusTagihScreen {...props} rek={query.rek} />;

    // Jaminan
    case '/jaminan/daftar':             return <DaftarJaminanScreen {...props} />;
    case '/jaminan/detail':             return <DetailAgunanScreen {...props} kode={query.kode} />;
    case '/jaminan/entri-individual':   return <EntriJaminanIndividualScreen {...props} />;
    case '/jaminan/entri-kolektif':     return <EntriJaminanKolektifScreen {...props} />;

    // Master data
    case '/master/agency':              return <DataAgencyScreen {...props} />;
    case '/master/pejabat':             return <DataPejabatScreen {...props} />;
    case '/master/group-nasabah':       return <GroupNasabahScreen {...props} />;
    case '/master/vendor':              return <DataVendorScreen {...props} />;
    case '/master/mitra':               return <DataMitraJFScreen {...props} />;
    case '/master/biaya':               return <DataBiayaBiayaScreen {...props} />;
    case '/master/jenis-aktiva':        return <DataJenisAktivaScreen {...props} />;
    case '/master/kode-bisnis':         return <DataKodeBisnisScreen {...props} />;

    // Data Pihak Ke Tiga
    case '/pihak3/asuransi':            return <DataAsuransiScreen {...props} />;
    case '/pihak3/penjamin':            return <DataPenjaminScreen {...props} />;
    case '/pihak3/notaris':             return <ListPekerjaanNotarisScreen {...props} />;

    // Produk
    case '/produk/pembiayaan':          return <ProdukPembiayaanScreen {...props} />;
    case '/produk/pembiayaan/new':      return <NewProdukPembiayaanScreen {...props} />;
    case '/produk/pembiayaan/detail':   return <DetailProdukPembiayaanScreen {...props} kode={query.kode} />;
    case '/produk/pembiayaan/edit':     return <NewProdukPembiayaanScreen {...props} mode="edit" kode={query.kode} />;
    case '/produk/fasilitas':           return <ProdukFasilitasScreen {...props} />;
    case '/produk/fasilitas/new':       return <NewProdukFasilitasScreen {...props} />;
    case '/produk/fasilitas/detail':    return <DetailProdukFasilitasScreen {...props} kode={query.kode} />;
    case '/produk/fasilitas/edit':      return <NewProdukFasilitasScreen {...props} mode="edit" kode={query.kode} />;
    case '/produk/parameter-global':    return <ParameterGlobalScreen {...props} />;
    case '/produk/parameter-ckpn':      return <ParameterCkpnScreen {...props} />;
    case '/produk/parameter-gadai':     return <ParameterGadaiScreen {...props} />;
    case '/produk/parameter-denda':     return <ParameterDendaScreen {...props} />;

    // Otorisasi
    case '/otorisasi':                  return <OtorisasiScreen {...props} />;

    // Transaksi Massal
    case '/massal/input':               return <InputTransaksiMassalScreen {...props} />;
    case '/massal/history':             return <RiwayatTransaksiScreen {...props} />;

    // Tutup Operational APBL
    case '/apbl/monitoring':            return <MonitoringApblScreen {...props} />;
    case '/apbl/riwayat':               return <RiwayatApblScreen {...props} />;

    // Laporan (8.x)
    case '/financing/laporan/nominatif_pembiayaan': return <LaporanScreen {...props} report="nominatif_pembiayaan" />;
    case '/financing/laporan/nominatif_fasilitas':  return <LaporanScreen {...props} report="nominatif_fasilitas" />;
    case '/financing/laporan/transaksi':            return <LaporanScreen {...props} report="transaksi" />;
    case '/financing/laporan/amortisasi_biaya':     return <LaporanScreen {...props} report="amortisasi_biaya" />;
    case '/financing/laporan/accrue_pembiayaan':    return <LaporanScreen {...props} report="accrue_pembiayaan" />;
    case '/financing/laporan/tagihan_angsuran':     return <LaporanScreen {...props} report="tagihan_angsuran" />;
    case '/financing/laporan/lbv':                  return <LaporanScreen {...props} report="lbv" />;
    case '/financing/laporan/jaminan/data_jaminan':       return <LaporanScreen {...props} report="jaminan/data_jaminan" />;
    case '/financing/laporan/jaminan/pengikatan_jaminan': return <LaporanScreen {...props} report="jaminan/pengikatan_jaminan" />;
  }

  return <PlaceholderScreen route={base} onNavigate={onNavigate} />;
}

/* ─────────── Tweaks Panel ─────────── */
function TweaksUI({ tweaks, setTweak }) {
  return (
    <TweaksPanel title="Tweaks · Prototype Settings">
      <TweakSection title="Brand & Tenant">
        <TweakSelect
          label="Tenant"
          value={tweaks.tenant}
          options={[
            { value: 'ihsan', label: 'Ihsan Solusi (default)' },
            { value: 'bca',   label: 'BCA Syariah (biru)' },
            { value: 'bjb',   label: 'BJB Syariah (merah)' },
            { value: 'mega',  label: 'Mega Syariah (magenta)' },
            { value: 'pos',   label: 'Pos Indonesia (navy)' },
          ]}
          onChange={v => setTweak('tenant', v)}
        />
      </TweakSection>

      <TweakSection title="Layout">
        <TweakRadio
          label="Density"
          value={tweaks.density}
          options={[
            { value: 'comfort', label: 'Comfort' },
            { value: 'compact', label: 'Compact' },
          ]}
          onChange={v => setTweak('density', v)}
        />
        <TweakRadio
          label="Popup [P] Style"
          value={tweaks.popupStyle}
          options={[
            { value: 'menu',   label: 'Overflow Menu' },
            { value: 'drawer', label: 'Side Drawer' },
          ]}
          onChange={v => setTweak('popupStyle', v)}
        />
      </TweakSection>

      <TweakSection title="Role Simulation">
        <TweakSelect
          label="Active Role"
          value={tweaks.role}
          options={[
            { value: 'Maker',      label: 'Maker (CS / Officer)' },
            { value: 'Checker',    label: 'Checker (Supervisor)' },
            { value: 'Admin',      label: 'Admin Sistem' },
            { value: 'Direksi',    label: 'Direksi (Eskalasi)' },
          ]}
          onChange={v => setTweak('role', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// Mount
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
