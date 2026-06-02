/* forms.jsx — shared form primitives & data table for the Financing prototype. */

function Field({ label, required, hint, error, children, span }) {
  const cls = 'field' + (span === 'full' ? ' span-full' : span === 2 ? ' span-2' : '');
  return (
    <div className={cls}>
      {label && (
        <label className="field__label">
          {label}{required && <span className="req">*</span>}
        </label>
      )}
      {children}
      {hint && !error && <span className="field__hint">{hint}</span>}
      {error && <span className="field__err">{error}</span>}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, readOnly, disabled, type='text', style }) {
  return (
    <input
      type={type}
      value={value ?? ''}
      onChange={e => onChange?.(e.target.value)}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      style={style}
    />
  );
}

function Select({ value, onChange, options, placeholder='-- Pilih --', disabled }) {
  return (
    <select
      value={value ?? ''}
      onChange={e => onChange?.(e.target.value)}
      disabled={disabled}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map(opt => {
        const v = typeof opt === 'string' ? opt : opt.value;
        const l = typeof opt === 'string' ? opt : opt.label;
        return <option key={v} value={v}>{l}</option>;
      })}
    </select>
  );
}

function CurrencyInput({ value, onChange, placeholder='0', readOnly, prefix='Rp', suffix }) {
  const fmt = n => {
    if (n === '' || n == null) return '';
    const num = String(n).replace(/[^\d]/g, '');
    if (!num) return '';
    return Number(num).toLocaleString('id-ID');
  };
  return (
    <div className={'input-affix' + (readOnly ? ' input-affix--readonly' : '')}>
      <div className="input-affix__prefix">{prefix}</div>
      <input
        type="text"
        value={fmt(value)}
        onChange={e => {
          const raw = e.target.value.replace(/[^\d]/g, '');
          onChange?.(raw);
        }}
        placeholder={placeholder}
        readOnly={readOnly}
      />
      {suffix && <div className="input-affix__suffix">{suffix}</div>}
    </div>
  );
}

function NumberInput({ value, onChange, placeholder='0', readOnly, suffix }) {
  return (
    <div className={'input-affix' + (readOnly ? ' input-affix--readonly' : '')}>
      <input
        type="text"
        value={value ?? ''}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        style={{ textAlign: 'left', paddingLeft: 12 }}
      />
      {suffix && <div className="input-affix__suffix">{suffix}</div>}
    </div>
  );
}

function DateInput({ value, onChange, placeholder='-- Pilih tanggal --', readOnly }) {
  return (
    <div className={'input-with-icon' + (readOnly ? ' input-with-icon--readonly' : '')}>
      <span className="input-with-icon__icon" dangerouslySetInnerHTML={{ __html: Icons.clipboard(16) }} />
      <input
        type="text"
        value={value || ''}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </div>
  );
}

function LookupInput({ value, onChange, placeholder='-- Cari --', onOpen }) {
  return (
    <div className="input-lookup">
      <input
        type="text"
        value={value || ''}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
      />
      <button
        className="input-lookup__btn"
        onClick={onOpen}
        type="button"
        dangerouslySetInnerHTML={{ __html: Icons.search(16) }}
      />
    </div>
  );
}

// Read-only display field used in detail pages
function Disp({ label, value, mono, large }) {
  let cls = 'disp__value';
  if (mono) cls += ' disp__value--mono';
  if (large) cls += ' disp__value--lg';
  return (
    <div className="disp">
      <div className="disp__label">{label}</div>
      <div className={cls}>{value ?? '-'}</div>
    </div>
  );
}

function FormGrid({ cols=2, children }) {
  return <div className={`form-grid ${cols === 3 ? 'form-grid--3' : cols === 4 ? 'form-grid--4' : ''}`}>{children}</div>;
}

// Status tag with auto-color
function StatusTag({ status }) {
  const map = {
    'Aktif':              'tag--success',
    'Lunas':              'tag--success',
    'Jatuh Tempo':        'tag--warning',
    'Tunggakan':          'tag--error',
    'Menunggu Pencairan': 'tag--info',
    'Menunggu Otorisasi': 'tag--info',
    'Pending Bind':       'tag--warning',
    'Release':            'tag--neutral',
    'Diikat':             'tag--success',
    'Tidak Aktif':        'tag--neutral',
    'Draft':              'tag--draft',
  };
  return <span className={`tag ${map[status] || 'tag--neutral'}`}>{status}</span>;
}

// Section tabs (Section 1, Section 2 …)
function SectionTabs({ tabs, value, onChange }) {
  return (
    <div className="section-tabs">
      {tabs.map((t, i) => (
        <button
          key={t.id}
          className={'section-tab' + (value === t.id ? ' section-tab--active' : '')}
          onClick={() => onChange?.(t.id)}
        >
          <div className="section-tab__eyebrow">Section {i + 1}</div>
          <div className="section-tab__label">{t.label}</div>
        </button>
      ))}
    </div>
  );
}

// Segmented tabs (used on detail pages)
function Tabs({ tabs, value, onChange }) {
  return (
    <div className="tabs">
      {tabs.map(t => (
        <button
          key={t.id}
          className={'tab' + (value === t.id ? ' tab--active' : '')}
          onClick={() => onChange?.(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// Steps indicator
function Steps({ steps, current }) {
  return (
    <div className="steps">
      {steps.map((s, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : 'pending';
        return (
          <div key={i} className={'step step--' + state}>
            <div className="step__num">
              {i < current
                ? <span dangerouslySetInnerHTML={{ __html: Icons.checkmark(14) }} />
                : i + 1}
            </div>
            <div className="step__label">{s}</div>
          </div>
        );
      })}
    </div>
  );
}

// Data table with optional popup menu per row
function DataTable(props) {
  const {
    columns, data, popupItems, onPopupClick,
    onRowClick, selectedRowId,
    showSearch=true, showPagination=true,
    toolbarActions, emptyText='Tidak ditemukan.',
    pageSize=10,
  } = props;

  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [openMenu, setOpenMenu] = React.useState(null); // row id
  const [size, setSize] = React.useState(pageSize);

  React.useEffect(() => { setPage(0); }, [search, size]);

  React.useEffect(() => {
    if (openMenu === null) return;
    const handler = (e) => {
      // ignore clicks on menu items themselves (they call e.stopPropagation)
      setOpenMenu(null);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [openMenu]);

  const filtered = React.useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter(r => columns.some(c => {
      const v = c.value ? c.value(r) : r[c.key];
      return String(v ?? '').toLowerCase().includes(q);
    }));
  }, [data, search, columns]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / size));
  const paged = filtered.slice(page * size, (page + 1) * size);

  return (
    <div className="tbl-wrap">
      {(showSearch || toolbarActions) && (
        <div className="tbl-toolbar">
          {showSearch && (
            <div className="tbl-search">
              <span dangerouslySetInnerHTML={{ __html: Icons.search(14) }} />
              <input
                placeholder="Cari..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {toolbarActions}
          </div>
        </div>
      )}
      <table className="tbl">
        <thead>
          <tr>
            {columns.map(c => (
              <th
                key={c.key}
                style={{ width: c.width, textAlign: c.align || 'left' }}
                className={c.sort ? 'sort' : ''}
              >
                {c.label}
                {c.sort && <span className="arrows">↕</span>}
              </th>
            ))}
            {popupItems && <th style={{ width: 48 }}></th>}
          </tr>
        </thead>
        <tbody>
          {paged.length === 0 && (
            <tr className="tbl-row--empty">
              <td colSpan={columns.length + (popupItems ? 1 : 0)}>
                <div className="tbl-empty">{emptyText}</div>
              </td>
            </tr>
          )}
          {paged.map((row, idx) => {
            const id = row.id || row.kode || row.noJaminan || row.noRek || row.noFasilitas || (page * size + idx);
            const isSelected = selectedRowId === id;
            return (
              <tr
                key={id}
                className={(onRowClick ? 'tbl-row--clickable ' : '') + (isSelected ? 'tbl-row--selected' : '')}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map(c => (
                  <td key={c.key} style={{ textAlign: c.align || 'left' }}>
                    {c.render ? c.render(row) : (c.value ? c.value(row) : row[c.key])}
                  </td>
                ))}
                {popupItems && (
                  <td className="row-actions" onClick={e => e.stopPropagation()}>
                    <button
                      className="icon-btn"
                      onClick={e => {
                        e.stopPropagation();
                        setOpenMenu(openMenu === id ? null : id);
                      }}
                      dangerouslySetInnerHTML={{ __html: Icons.overflow(18) }}
                    />
                    {openMenu === id && (
                      <div className="popup" onClick={e => e.stopPropagation()}>
                        {popupItems.map((pi, j) => pi.sep ? (
                          <div key={j} className="popup__sep" />
                        ) : (
                          <button
                            key={pi.id}
                            className={'popup__item' + (pi.danger ? ' popup__item--danger' : '')}
                            onClick={() => {
                              setOpenMenu(null);
                              onPopupClick?.(row, pi.id);
                            }}
                          >
                            {pi.icon && <span dangerouslySetInnerHTML={{ __html: Icons[pi.icon](14) }} />}
                            {pi.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {showPagination && filtered.length > 0 && (
        <div className="tbl-pagination">
          <div className="tbl-pagination__size">
            <span>Tampilkan</span>
            <select value={size} onChange={e => setSize(Number(e.target.value))}>
              <option value={7}>7</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>data</span>
          </div>
          <div className="tbl-pagination__nav">
            <button
              onClick={() => setPage(0)}
              disabled={page === 0}
              title="First"
              dangerouslySetInnerHTML={{ __html: Icons.chevronL(16) + Icons.chevronL(16) }}
              style={{ width: 38 }}
            />
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              dangerouslySetInnerHTML={{ __html: Icons.chevronL(16) }}
            />
            <span className="tbl-pagination__page">Page {page + 1} from {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              dangerouslySetInnerHTML={{ __html: Icons.chevronR(16) }}
            />
            <button
              onClick={() => setPage(totalPages - 1)}
              disabled={page >= totalPages - 1}
              title="Last"
              dangerouslySetInnerHTML={{ __html: Icons.chevronR(16) + Icons.chevronR(16) }}
              style={{ width: 38 }}
            />
          </div>
          <div>
            Data {page * size + 1}-{Math.min((page + 1) * size, filtered.length)} dari {filtered.length}
          </div>
        </div>
      )}
    </div>
  );
}

// Modal helper
function Modal({ title, subtitle, children, onClose, footer, size }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={'modal' + (size === 'lg' ? ' modal--lg' : '')} onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <div>
            <h3 className="modal__title">{title}</h3>
            {subtitle && <div className="modal__subtitle">{subtitle}</div>}
          </div>
          <button
            className="modal__close"
            onClick={onClose}
            dangerouslySetInnerHTML={{ __html: Icons.close(16) }}
          />
        </div>
        <div className="modal__body">{children}</div>
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );
}

// Toast — render with state set/clear
function Toast({ type='success', title, message, onClose }) {
  React.useEffect(() => {
    const id = setTimeout(() => onClose?.(), 4500);
    return () => clearTimeout(id);
  }, [onClose]);
  const iconKey = type === 'error' ? 'warning' : type === 'warn' ? 'warning' : 'success';
  return (
    <div className={'toast' + (type === 'error' ? ' toast--error' : type === 'warn' ? ' toast--warn' : '')}>
      <span className="toast__icon" dangerouslySetInnerHTML={{ __html: Icons[iconKey](20) }} />
      <div className="toast__body">
        <div className="toast__title">{title}</div>
        {message && <div className="toast__msg">{message}</div>}
      </div>
      <button
        className="modal__close"
        onClick={onClose}
        dangerouslySetInnerHTML={{ __html: Icons.close(14) }}
      />
    </div>
  );
}

// Lookup modal — pick a customer from MOCK_NASABAH
function NasabahLookup({ open, onClose, onSelect }) {
  const [q, setQ] = React.useState('');
  if (!open) return null;
  const filtered = q.trim()
    ? window.MOCK_NASABAH.filter(n =>
        n.nama.toLowerCase().includes(q.toLowerCase()) ||
        n.kode.includes(q) ||
        n.nik.includes(q))
    : window.MOCK_NASABAH;
  return (
    <Modal
      title="Cari Nasabah"
      subtitle="Pilih nasabah berdasarkan nomor / nama / NIK"
      onClose={onClose}
      size="lg"
      footer={<button className="btn btn--neutral" onClick={onClose}>Batal</button>}
    >
      <div className="tbl-search" style={{ maxWidth: 'none', marginBottom: 16 }}>
        <span dangerouslySetInnerHTML={{ __html: Icons.search(14) }} />
        <input autoFocus placeholder="Cari nomor / nama / NIK..." value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <table className="tbl">
        <thead>
          <tr>
            <th>No. Nasabah</th>
            <th>Nama</th>
            <th>NIK / NPWP</th>
            <th>Tipe</th>
          </tr>
        </thead>
        <tbody>
          {filtered.slice(0, 7).map(n => (
            <tr key={n.kode} className="tbl-row--clickable" onClick={() => { onSelect(n); onClose(); }}>
              <td className="mono">{n.kode}</td>
              <td>{n.nama}</td>
              <td className="mono">{n.nik}</td>
              <td><span className="tag tag--neutral">{n.tipe}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Modal>
  );
}

// Lookup modal — pick a GL account from MOCK_COA, optionally filtered by accountType
function CoaLookup({ open, onClose, onSelect, accountType }) {
  const [q, setQ] = React.useState('');
  if (!open) return null;
  const source = (window.MOCK_COA || []).filter(c => !accountType || c.type === accountType);
  const filtered = q.trim()
    ? source.filter(c =>
        c.nama.toLowerCase().includes(q.toLowerCase()) ||
        c.kode.includes(q) ||
        (c.type || '').toLowerCase().includes(q.toLowerCase()))
    : source;
  return (
    <Modal
      title="Cari Rekening GL"
      subtitle={accountType
        ? `Daftar Chart of Account — tipe ${accountType}`
        : 'Daftar Chart of Account'}
      onClose={onClose}
      size="lg"
      footer={<button className="btn btn--neutral" onClick={onClose}>Batal</button>}
    >
      <div className="tbl-search" style={{ maxWidth: 'none', marginBottom: 16 }}>
        <span dangerouslySetInnerHTML={{ __html: Icons.search(14) }} />
        <input autoFocus placeholder="Cari kode / nama GL..." value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <table className="tbl">
        <thead>
          <tr>
            <th style={{ width: 160 }}>Kode GL</th>
            <th>Nama GL</th>
            <th style={{ width: 110 }}>Tipe</th>
            <th style={{ width: 90 }}>Posisi</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr className="tbl-row--empty"><td colSpan={4} className="tbl-empty">Tidak ditemukan.</td></tr>
          ) : filtered.slice(0, 10).map(c => (
            <tr key={c.kode} className="tbl-row--clickable" onClick={() => { onSelect(c); onClose(); }}>
              <td className="mono">{c.kode}</td>
              <td>{c.nama}</td>
              <td><span className="tag tag--neutral">{c.type}</span></td>
              <td className="text-sm">{c.posisi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Modal>
  );
}

// Confirm dialog
function ConfirmDialog({ title, message, confirmLabel='Ya', cancelLabel='Batal', danger, onConfirm, onClose }) {
  return (
    <Modal
      title={title}
      onClose={onClose}
      footer={
        <>
          <button className="btn btn--neutral" onClick={onClose}>{cancelLabel}</button>
          <button
            className={danger ? 'btn btn--danger' : 'btn btn--primary'}
            onClick={() => { onConfirm(); onClose(); }}
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <p style={{ margin: 0, fontSize: 14, color: 'var(--c-text-muted)' }}>{message}</p>
    </Modal>
  );
}

// Format helpers
window.fmtRp = function(n, withSym=true) {
  if (n === null || n === undefined || n === '') return '-';
  return (withSym ? 'Rp ' : '') + Number(n).toLocaleString('id-ID');
};
window.fmtRpShort = function(n) {
  const num = Number(n) || 0;
  if (num >= 1e9) return 'Rp ' + (num / 1e9).toFixed(2) + ' M';
  if (num >= 1e6) return 'Rp ' + (num / 1e6).toFixed(1) + ' jt';
  if (num >= 1e3) return 'Rp ' + (num / 1e3).toFixed(0) + ' rb';
  return 'Rp ' + num;
};

Object.assign(window, {
  Field, TextInput, Select, CurrencyInput, NumberInput, DateInput, LookupInput,
  Disp, FormGrid, StatusTag, SectionTabs, Tabs, Steps,
  DataTable, Modal, Toast, NasabahLookup, CoaLookup, ConfirmDialog,
});
