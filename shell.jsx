/* Shell.jsx — Hi-Fi shell modeled on the Figma Financing module.
   Layout:  [icon rail] [secondary nav panel] [main: header + page] */

function Shell(props) {
  const { route, onNavigate, children, onLogout } = props;
  const [collapsed, setCollapsed] = React.useState(false);

  const railId = window.routeToRail(route);
  const items = window.NAV_TREE[railId] || [];
  const railMeta = window.NAV_RAILS.find(r => r.id === railId) || window.NAV_RAILS[0];

  return (
    <div className="app">
      <Rail railId={railId} onNavigate={onNavigate} collapsed={collapsed} />
      {!collapsed && (
        <Panel
          title={railMeta.title}
          items={items}
          route={route}
          onNavigate={onNavigate}
        />
      )}
      <div className="main">
        <Header route={route} onNavigate={onNavigate} onToggle={() => setCollapsed(c => !c)} onLogout={onLogout} />
        <div className="page">{children}</div>
      </div>
    </div>
  );
}

function Rail({ railId, onNavigate, collapsed }) {
  return (
    <div className="rail">
      <div className="rail__logo">
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
          <path d="M4 22 C 8 12, 14 14, 16 18 C 18 22, 24 22, 28 12" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <path d="M4 16 C 8 6, 14 8, 16 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      </div>
      {window.NAV_RAILS.map((r, idx) => (
        <React.Fragment key={r.id}>
          {idx === 1 && <div className="rail__divider" />}
          <button
            className={'rail__btn' + (r.id === railId ? ' rail__btn--active' : '')}
            title={r.label}
            onClick={() => {
              const first = (window.NAV_TREE[r.id] || [])[0];
              const target = first?.route || (first?.children?.[0]?.route);
              if (target) onNavigate(target);
              else if (r.id === 'overview') onNavigate('/overview');
            }}
            dangerouslySetInnerHTML={{ __html: Icons[r.icon] ? Icons[r.icon](22) : Icons.list(22) }}
          />
        </React.Fragment>
      ))}
    </div>
  );
}

function Panel({ title, items, route, onNavigate }) {
  const [search, setSearch] = React.useState('');
  const [openGroups, setOpenGroups] = React.useState(() => {
    // open any group containing the active route
    const out = {};
    items.forEach((it, i) => {
      if (it.children?.some(c => c.route === route)) out[i] = true;
    });
    return out;
  });

  React.useEffect(() => {
    // Re-sync open groups when navigation changes
    setOpenGroups(prev => {
      const out = { ...prev };
      items.forEach((it, i) => {
        if (it.children?.some(c => c.route === route)) out[i] = true;
      });
      return out;
    });
    // eslint-disable-next-line
  }, [route]);

  const q = search.trim().toLowerCase();
  const filtered = q
    ? items
        .flatMap(it => it.children ? it.children : [it])
        .filter(it => it.label.toLowerCase().includes(q))
    : null;

  return (
    <div className="panel">
      <div className="panel__title">{title}</div>
      <div className="panel__search">
        <span dangerouslySetInnerHTML={{ __html: Icons.search(14) }} />
        <input
          placeholder="Quick Action"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="panel__list">
        {filtered ? (
          filtered.map(it => (
            <button
              key={it.route}
              className={'panel-item' + (it.route === route ? ' panel-item--active' : '')}
              onClick={() => { onNavigate(it.route); setSearch(''); }}
            >
              {it.label}
            </button>
          ))
        ) : (
          items.map((it, i) =>
            it.expandable ? (
              <React.Fragment key={i}>
                <button
                  className={'panel-item' + (openGroups[i] ? ' panel-item--open' : '')}
                  onClick={() => setOpenGroups(g => ({ ...g, [i]: !g[i] }))}
                >
                  <span>{it.label}</span>
                  <span className="panel-item__chev" dangerouslySetInnerHTML={{ __html: Icons.chevronR(14) }} />
                </button>
                {openGroups[i] && it.children.map(ch => (
                  <button
                    key={ch.route}
                    className={'panel-item panel-item--child' + (ch.route === route ? ' panel-item--active' : '')}
                    onClick={() => onNavigate(ch.route)}
                  >
                    {ch.label}
                  </button>
                ))}
              </React.Fragment>
            ) : (
              <button
                key={it.route}
                className={'panel-item' + (it.route === route ? ' panel-item--active' : '')}
                onClick={() => onNavigate(it.route)}
              >
                {it.label}
              </button>
            )
          )
        )}
      </div>
    </div>
  );
}

function Header({ route, onNavigate, onToggle, onLogout }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  // Build breadcrumb from route
  const crumbs = window.buildBreadcrumb ? window.buildBreadcrumb(route) : [{ label: 'Beranda' }];
  return (
    <div className="header">
      <button
        className="header__toggle"
        onClick={onToggle}
        title="Toggle sidebar"
        dangerouslySetInnerHTML={{ __html: Icons.menu(20) }}
      />
      <button
        className="header__toggle"
        onClick={() => window.history.length > 1 && onNavigate && history.back()}
        title="Back"
        style={{ marginLeft: -8 }}
        dangerouslySetInnerHTML={{ __html: Icons.arrowL(16) }}
      />
      <div className="header__bc">
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="sep">/</span>}
            {i === crumbs.length - 1 ? (
              <span className="leaf">{c.label}</span>
            ) : c.route ? (
              <span style={{ cursor: 'pointer' }} onClick={() => onNavigate(c.route)}>{c.label}</span>
            ) : (
              <span>{c.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="header__spacer" />
      <div className="header__pill" style={{ cursor: 'pointer' }} onClick={() => onNavigate('/landing')} title="Ganti modul">
        Financing Module
        <span dangerouslySetInnerHTML={{ __html: Icons.apps(14) }} />
      </div>
      <div className="header__user" style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setMenuOpen(o => !o)}>
        <div className="header__avatar">HT</div>
        <div className="header__user-name">
          <b>Heri Tapiheru,</b>
          <span>ADM</span>
        </div>
        <span style={{ display: 'flex', color: 'var(--c-text-muted)' }} dangerouslySetInnerHTML={{ __html: Icons.chevronD(14) }} />
        {menuOpen && (
          <>
            <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={e => { e.stopPropagation(); setMenuOpen(false); }} />
            <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, minWidth: 180, background: '#fff', border: '1px solid var(--c-border-soft)', borderRadius: 6, boxShadow: '0 6px 20px rgba(0,0,0,0.12)', zIndex: 41, overflow: 'hidden' }}>
              <button className="menu-item" style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 14px', border: 0, background: 'none', cursor: 'pointer', font: 'inherit', fontSize: 13, color: 'var(--c-text)', textAlign: 'left' }}
                onClick={e => { e.stopPropagation(); setMenuOpen(false); onNavigate('/landing'); }}>
                <span dangerouslySetInnerHTML={{ __html: Icons.apps(16) }} /> Pilih Modul
              </button>
              <button className="menu-item" style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 14px', border: 0, borderTop: '1px solid var(--c-border-soft)', background: 'none', cursor: 'pointer', font: 'inherit', fontSize: 13, color: 'var(--c-error)', textAlign: 'left' }}
                onClick={e => { e.stopPropagation(); setMenuOpen(false); onLogout && onLogout(); }}>
                <span dangerouslySetInnerHTML={{ __html: Icons.lock(16) }} /> Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Map known routes to their breadcrumb chain
window.buildBreadcrumb = function(route) {
  const base = route.split('?')[0];
  const railId = window.routeToRail(route);
  const rail = window.NAV_RAILS.find(r => r.id === railId);
  const items = window.NAV_TREE[railId] || [];

  // Find leaf label
  let leaf = null;
  for (const it of items) {
    if (it.route === route || it.route === base) { leaf = it.label; break; }
    if (it.children) {
      for (const c of it.children) {
        if (c.route === route || c.route === base) { leaf = `${it.label} / ${c.label}`; break; }
      }
    }
  }

  // Special routes (sub-pages of list pages)
  const subPages = {
    '/list-fasilitas/detail':    { rail: 'fasilitas', parent: 'List Fasilitas', parentRoute: '/list-fasilitas', leaf: 'Detail Fasilitas' },
    '/list-fasilitas/addendum':  { rail: 'fasilitas', parent: 'List Fasilitas', parentRoute: '/list-fasilitas', leaf: 'Addendum Fasilitas' },
    '/list-fasilitas/koreksi':   { rail: 'fasilitas', parent: 'List Fasilitas', parentRoute: '/list-fasilitas', leaf: 'Koreksi Limit Fasilitas' },
    '/list-fasilitas/reposisi':  { rail: 'fasilitas', parent: 'List Fasilitas', parentRoute: '/list-fasilitas', leaf: 'Reposisi Cabang' },
    '/list-fasilitas/tutup':     { rail: 'fasilitas', parent: 'List Fasilitas', parentRoute: '/list-fasilitas', leaf: 'Tutup Fasilitas' },
    '/list-pembiayaan/detail':   { rail: 'fasilitas', parent: 'List Pembiayaan', parentRoute: '/list-pembiayaan', leaf: 'Detail Rekening' },
    '/list-pembiayaan/edit':     { rail: 'fasilitas', parent: 'List Pembiayaan', parentRoute: '/list-pembiayaan', leaf: 'Edit Rekening' },
    '/list-pembiayaan/edit-kelengkapan': { rail: 'fasilitas', parent: 'Detail Rekening', parentRoute: '/list-pembiayaan/detail', leaf: 'Edit Kelengkapan Data' },
    '/produk/pembiayaan/new':    { rail: 'produk',    parent: 'Produk Pembiayaan', parentRoute: '/produk/pembiayaan', leaf: 'New Produk Pembiayaan' },
    '/produk/pembiayaan/detail': { rail: 'produk',    parent: 'Produk Pembiayaan', parentRoute: '/produk/pembiayaan', leaf: 'Detail Produk Pembiayaan' },
    '/produk/pembiayaan/edit':   { rail: 'produk',    parent: 'Produk Pembiayaan', parentRoute: '/produk/pembiayaan', leaf: 'Edit Produk Pembiayaan' },
    '/produk/fasilitas/new':     { rail: 'produk',    parent: 'Produk Fasilitas',  parentRoute: '/produk/fasilitas',  leaf: 'Input Produk Fasilitas' },
    '/produk/fasilitas/detail':  { rail: 'produk',    parent: 'Produk Fasilitas',  parentRoute: '/produk/fasilitas',  leaf: 'Detail Produk Fasilitas' },
    '/produk/fasilitas/edit':    { rail: 'produk',    parent: 'Produk Fasilitas',  parentRoute: '/produk/fasilitas',  leaf: 'Edit Produk Fasilitas' },
    '/jaminan/detail':           { rail: 'jaminan',   parent: 'Daftar Jaminan',    parentRoute: '/jaminan/daftar',     leaf: 'Detail Agunan' },
    '/transaksi/pembayaran-manual/form':       { rail: 'transaksi', parent: 'Pembayaran Manual',       parentRoute: '/transaksi/pembayaran-manual',       leaf: 'Form Pembayaran' },
    '/transaksi/pelunasan-dipercepat/form':    { rail: 'transaksi', parent: 'Pelunasan Dipercepat',    parentRoute: '/transaksi/pelunasan-dipercepat',    leaf: 'Form Pelunasan' },
    '/transaksi/koreksi-pembayaran/form':      { rail: 'transaksi', parent: 'Koreksi Pembayaran',      parentRoute: '/transaksi/koreksi-pembayaran',      leaf: 'Form Koreksi' },
    '/transaksi/input-biaya/form':             { rail: 'transaksi', parent: 'Input Biaya-Biaya',       parentRoute: '/transaksi/input-biaya',             leaf: 'Form Input Biaya' },
    '/transaksi/reposisi-cabang/form':         { rail: 'transaksi', parent: 'Reposisi Cabang',         parentRoute: '/transaksi/reposisi-cabang',         leaf: 'Form Reposisi' },
    '/transaksi/hapus-buku/registrasi/form':   { rail: 'transaksi', parent: 'Registrasi Hapus Buku',   parentRoute: '/transaksi/hapus-buku/registrasi',   leaf: 'Form Hapus Buku' },
    '/transaksi/hapus-buku/recovery/form':     { rail: 'transaksi', parent: 'Recovery Hapus Buku',     parentRoute: '/transaksi/hapus-buku/recovery',     leaf: 'Form Recovery' },
    '/transaksi/hapus-buku/hapus-tagih/form':  { rail: 'transaksi', parent: 'Hapus Tagih',             parentRoute: '/transaksi/hapus-buku/hapus-tagih',  leaf: 'Form Hapus Tagih' },
    '/registrasi/pembiayaan/form': { rail: 'fasilitas', parent: 'Registrasi Pembiayaan', parentRoute: '/registrasi/pembiayaan', leaf: 'Form Registrasi' },
  };
  if (subPages[base]) {
    const sp = subPages[base];
    return [{ label: rail.label }, { label: sp.parent, route: sp.parentRoute }, { label: sp.leaf }];
  }

  if (leaf) return [{ label: rail.label }, { label: leaf }];
  return [{ label: rail.label }];
};

window.Shell = Shell;
