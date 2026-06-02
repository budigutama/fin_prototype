/* screens-auth.jsx
 * 0.0 Login + 0.1 Module Landing Page (Figma).
 *   LoginScreen          — full-screen, rendered OUTSIDE the shell (pre-auth)
 *   ModuleLandingScreen  — rendered INSIDE the shell at /landing (post-auth)
 */

/* Brand mark — same swoosh used in the rail, white. */
function BrandLogo({ size = 34, color = '#fff' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M4 22 C 8 12, 14 14, 16 18 C 18 22, 24 22, 28 12" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M4 27 C 8 17, 14 19, 16 23 C 18 27, 24 27, 28 17" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      </svg>
      <span style={{ fontSize: size * 0.5, fontWeight: 700, color, letterSpacing: '-0.01em' }}>
        Ihsan<span style={{ fontWeight: 400 }}>Solusi</span>
      </span>
    </div>
  );
}

/* ─────────── 0.0 Login ─────────── */
function LoginScreen({ onLogin }) {
  const [userId, setUserId] = React.useState('heri_tapiheru');
  const [password, setPassword] = React.useState('password');
  const [showPwd, setShowPwd] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const submit = (e) => {
    e?.preventDefault();
    if (!userId.trim() || !password.trim()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 650);
  };

  return (
    <div className="login">
      <div className="login__bg">
        <div className="login__brandpanel">
          <BrandLogo size={34} />
          <h1 className="login__headline">Bank Operating<br/>System</h1>
        </div>

        <form className="login__card" onSubmit={submit}>
          <div className="login__title">
            <span className="login__welcome">Welcome back,</span>
            <span className="login__login">Login</span>
          </div>

          <div className="login__fields">
            <div className="login__field">
              <label htmlFor="login-uid">User ID</label>
              <input
                id="login-uid"
                type="text"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                autoComplete="username"
                autoFocus
              />
            </div>
            <div className="login__field">
              <label htmlFor="login-pwd">Password</label>
              <div className="login__pwd">
                <input
                  id="login-pwd"
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button type="button" className="login__eye" onClick={() => setShowPwd(s => !s)}
                  title={showPwd ? 'Sembunyikan' : 'Tampilkan'} aria-label="Toggle password"
                  dangerouslySetInnerHTML={{ __html: Icons.view(18) }} />
              </div>
            </div>
          </div>

          <button type="submit" className="login__submit" disabled={loading}>
            {loading ? 'Memproses…' : 'Login'}
          </button>

          <div className="login__help">
            Having trouble logging in? <a href="#" onClick={e => e.preventDefault()}>contact admin</a>
          </div>
        </form>
      </div>

      <div className="login__footer">
        Copyright © 2023 PT Ihsan Solusi Informatika. All Rights Reserved.
      </div>
    </div>
  );
}

/* ─────────── 0.1 Module Landing Page ─────────── */
const BOS_MODULES = [
  { id: 'enterprise', label: 'Enterprise Module', icon: 'building', route: null },
  { id: 'cif',        label: 'CIF Module',        icon: 'user',     route: null },
  { id: 'funding',    label: 'Funding Module',    icon: 'card',     route: null },
  { id: 'financing',  label: 'Financing Module',  icon: 'briefcase', route: '/overview', active: true },
  { id: 'treasury',   label: 'Treasury Module',   icon: 'shield',   route: null },
  { id: 'gl',         label: 'GL Module',         icon: 'calc',     route: null },
];

function ModuleLandingScreen({ onNavigate, showToast }) {
  return (
    <div className="modland">
      <div className="modland__card">
        <div className="modland__hero">
          <span className="modland__hero-welcome">Welcome back,</span>
          <span className="modland__hero-name">Heri Tapiheru</span>
        </div>

        <div className="modland__body">
          <div className="modland__label">Bank Operating System, Modules :</div>
          <div className="modland__grid">
            {BOS_MODULES.map(m => (
              <button
                key={m.id}
                className={'modcard' + (m.active ? ' modcard--active' : '')}
                onClick={() => {
                  if (m.route) onNavigate(m.route);
                  else showToast({ type: 'info', title: `${m.label}`, message: 'Modul ini belum tersedia pada prototype.' });
                }}
              >
                <span className="modcard__icon" dangerouslySetInnerHTML={{ __html: Icons[m.icon](24) }} />
                <span className="modcard__label">{m.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LoginScreen, ModuleLandingScreen });
