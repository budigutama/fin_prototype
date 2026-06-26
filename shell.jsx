/* Shell.jsx — BOS7 UiShell: 40px dark header + 256px drilldown SideNav + content. */

function Shell(props) {
  const { route, onNavigate, children, onLogout } = props;
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="app">
      <DrilldownNav route={route} onNavigate={onNavigate} collapsed={collapsed} />
      <div className="main">
        <Header route={route} onNavigate={onNavigate} onToggle={() => setCollapsed(c => !c)} onLogout={onLogout} />
        <div className="page">{children}</div>
      </div>
    </div>
  );
}

/* ── Drilldown SideNav ──────────────────────────────────────────────
   Root level lists the module groups (from NAV_RAILS + NAV_TREE).
   Items with children drill in one level at a time with a back row;
   leaves navigate. Auto-opens to the level containing the active route. */

function navRoot() {
  return window.NAV_RAILS.map(r => ({
    label: r.label,
    icon: r.icon,
    key: r.id,
    children: window.NAV_TREE[r.id] || [],
  }));
}

// Return the chain of ancestor nodes (groups to drill through) to reach `route`.
function findChain(nodes, route, acc) {
  for (const n of nodes) {
    if (n.route && n.route === route) return acc;
    if (n.children && n.children.length) {
      const r = findChain(n.children, route, [...acc, n]);
      if (r) return r;
    }
  }
  return null;
}

function DrilldownNav({ route, onNavigate, collapsed }) {
  const root = React.useMemo(navRoot, []);
  const base = route.split('?')[0];

  // Compute the drill path (ancestor chain) for the active route.
  const computeChain = React.useCallback(() => {
    let chain = findChain(root, route, []) || findChain(root, base, []);
    if (!chain) {
      const railId = window.routeToRail(route);
      const g = root.find(n => n.key === railId);
      chain = g ? [g] : [];
    }
    return chain;
  }, [root, route, base]);

  const [path, setPath] = React.useState(computeChain);
  const [dir, setDir] = React.useState('fwd');
  const [search, setSearch] = React.useState('');

  // Re-sync the drill path whenever the route changes.
  React.useEffect(() => { setDir('fwd'); setPath(computeChain()); }, [route]);

  const current = path.length ? path[path.length - 1] : null;
  const items = current ? current.children : root;

  const isActive = (it) => it.route && (base === it.route || base.startsWith(it.route + '/'));
  const groupHasActive = (it) =>
    it.children && it.children.some(c => isActive(c) || groupHasActive(c));

  const drillIn = (node) => { setDir('fwd'); setPath(p => [...p, node]); setSearch(''); };
  const drillBack = () => { setDir('back'); setPath(p => p.slice(0, -1)); };

  // Search flattens every leaf across the whole tree.
  const q = search.trim().toLowerCase();
  const leaves = React.useMemo(() => {
    const out = [];
    const walk = (arr) => arr.forEach(n => n.children && n.children.length ? walk(n.children) : out.push(n));
    walk(root);
    return out;
  }, [root]);
  const filtered = q ? leaves.filter(l => l.label.toLowerCase().includes(q)) : null;

  return (
    <div className={'panel' + (collapsed ? ' panel--collapsed' : '')}>
      <div className="panel__brand">
        <span className="panel__brand-mark" dangerouslySetInnerHTML={{ __html:
          '<svg width="20" height="20" viewBox="0 0 32 32" fill="none">' +
          '<path d="M4 22 C 8 12, 14 14, 16 18 C 18 22, 24 22, 28 12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>' +
          '<path d="M4 16 C 8 6, 14 8, 16 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/></svg>'
        }} />
        <span className="panel__brand-name">BOS7 <b>Financing</b></span>
      </div>

      <div className="panel__search">
        <span dangerouslySetInnerHTML={{ __html: Icons.search(16) }} />
        <input
          placeholder="Cari menu..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filtered ? (
        <div className="panel__list">
          {filtered.length === 0 && <div className="panel__empty">Tidak ditemukan.</div>}
          {filtered.map(it => (
            <button
              key={it.route}
              className={'panel-item' + (isActive(it) ? ' panel-item--active' : '')}
              onClick={() => { onNavigate(it.route); setSearch(''); }}
            >
              <span>{it.label}</span>
            </button>
          ))}
        </div>
      ) : (
        <>
          {current ? (
            <button className="panel__back" onClick={drillBack}>
              <span className="panel__back-chev" dangerouslySetInnerHTML={{ __html: Icons.arrowL(16) }} />
              <span className="panel__back-label">{current.label}</span>
            </button>
          ) : (
            <div className="panel__title">Menu Navigasi</div>
          )}

          <div key={path.length + dir} className={'panel__list panel__level panel__level--' + dir}>
            {items.map((it, i) =>
              it.children && it.children.length ? (
                <button
                  key={it.key || it.label}
                  className={'panel-item panel-item--group' + (groupHasActive(it) ? ' panel-item--trail' : '')}
                  onClick={() => drillIn(it)}
                >
                  {it.icon && <span className="panel-item__icon" dangerouslySetInnerHTML={{ __html: Icons[it.icon] ? Icons[it.icon](18) : '' }} />}
                  <span>{it.label}</span>
                  <span className="panel-item__chev" dangerouslySetInnerHTML={{ __html: Icons.chevronR(16) }} />
                </button>
              ) : (
                <button
                  key={it.route || it.label}
                  className={'panel-item' + (isActive(it) ? ' panel-item--active' : '')}
                  onClick={() => onNavigate(it.route)}
                >
                  {it.icon && <span className="panel-item__icon" dangerouslySetInnerHTML={{ __html: Icons[it.icon] ? Icons[it.icon](18) : '' }} />}
                  <span>{it.label}</span>
                </button>
              )
            )}
          </div>
        </>
      )}
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
        <span style={{ display: 'flex', color: 'rgba(255,255,255,0.7)' }} dangerouslySetInnerHTML={{ __html: Icons.chevronD(14) }} />
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
    '/transaksi/ganti-produk/form':            { rail: 'transaksi', parent: 'Ganti Produk',            parentRoute: '/transaksi/ganti-produk',            leaf: 'Form Ganti Produk' },
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
