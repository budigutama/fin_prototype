# BOS7 Design System

A reusable design system for the **BOS7** family of web applications — a multi-app
back-office banking platform built on top of the **Core7** banking platform by
[Ihsan Solusi Informatika](https://ihsansolusi.co.id).

The system is technically a thin opinionated wrapper around **IBM Carbon Design System v11**
(`@carbon/react ^1.97`), retuned for the density that core banking work demands and
extended with corporate theming so the same UI can be reskinned for each customer bank
(BCA Syariah, BJB Syariah, Pos Indonesia, etc.) without touching component code.

> All BOS7 webapps consume the same React component library — `@isi-ui7/*` — published
> from [`ihsansolusi/ui7`](https://github.com/ihsansolusi/ui7). UI consistency across
> the ~15 apps in the `bos7-*` family is enforced at the package layer.

## What is BOS7?

BOS7 stands for *Backend Office System (Core7)* — the web admin tier of Ihsan Solusi's
core banking suite. Each functional domain ships as its own Next.js app sharing the
same shell, theme, and component packages:

| App | Repo | Domain |
| --- | --- | --- |
| `bos7-financing` | [ihsansolusi/bos7-financing](https://github.com/ihsansolusi/bos7-financing) | Pembiayaan (financing / Islamic lending) — akad, fasilitas, angsuran |
| `bos7-enterprise` | [ihsansolusi/bos7-enterprise](https://github.com/ihsansolusi/bos7-enterprise) | Access management, branches, employees, oauth2 clients |
| `bos7-treasury` | ihsansolusi/bos7-treasury | Treasury operations |
| `bos7-accounting` | ihsansolusi/bos7-accounting | General ledger, journal |
| `bos7-cif` | ihsansolusi/bos7-cif | Customer Information File |
| `bos7-funding` | ihsansolusi/bos7-funding | Savings, deposits |
| `bos7-remittance` | ihsansolusi/bos7-remittance | Payment transfer |
| `bos7-batchprocessing` | ihsansolusi/bos7-batchprocessing | End-of-day batch jobs |
| `bos7-smt` | ihsansolusi/bos7-smt | Settlement |
| `bos7-internalaccount` | ihsansolusi/bos7-internalaccount | Internal accounts |
| `bos7-workflow` | ihsansolusi/bos7-workflow | BPM frontend |
| `bos7-portal` | ihsansolusi/bos7-portal | App-launcher portal |
| `bos7-template` | ihsansolusi/bos7-template | The starter every new app forks from |

### Corporate themes

The shared `@isi-ui7/corporate-themes` package ships tokens for each customer
bank. The current tenant list is:

| Tenant id | Brand | Primary | Notes |
| --- | --- | --- | --- |
| `carbon-default` | Carbon Default (g100 dark) | `#0F62FE` interactive / `#161616` bg | Stock IBM Carbon dark theme — used for shell/header chrome |
| `ihsan-solusi` | Ihsan Solusi Informatika | `#0F62FE` | Carbon Blue 60 default |
| `bca-syariah` | BCA Syariah | `#0868B8` | BCA Blue + teal "syariah" wordmark |
| `bjb-syariah` | BJB Syariah | `#C8102E` | Red primary + navy "bank bjb" wordmark |
| `bank-mega-syariah` | Bank Mega Syariah | `#B8388F` | Magenta + gold "M" + orange (new tenant — added with logo upload) |
| `pos-indonesia` | Pos Indonesia / POS IND | `#182858` | **Post-2023 rebrand** — navy primary, red accent (was red-primary pre-rebrand) |

The shared component library is split into focused packages — see
[`themes/corporate-themes/README.md`](https://github.com/ihsansolusi/ui7/blob/main/themes/corporate-themes/README.md)
in `ihsansolusi/ui7` for the full inventory. Highlights:

| Package | Purpose |
| --- | --- |
| `@isi-ui7/ui-shell` | App header (40 px), drilldown sidebar with favorites + search, notification panel, profile menu, app switcher |
| `@isi-ui7/corporate-themes` | `<GlobalCorporateTheme corporateId="bca-syariah" variant="white">` — drives all token swaps |
| `@isi-ui7/modal-manager` | `showPage()` returns a Promise — stack-based modal/page navigation |
| `@isi-ui7/data-table` | `ServerDataTable` (cursor) + `OffsetDataTable` (offset/limit), toolbar, popup-menu per row |
| `@isi-ui7/lookup-input` | Async ComboBox with inline modal picker |
| `@isi-ui7/page-data` | Enum / dropdown provider |
| `@isi-ui7/forms` | `DisplayField`, `ConfirmStatement` |
| `@isi-ui7/realtime` | `useSSE`, `useNotificationBell` |
| `@isi-ui7/nats` | NATS WebSocket client hooks |

## Sources used to build this design system

Everything below was reverse-engineered from these public repos:

- **`ihsansolusi/ui7`** — component library + corporate themes + Carbon overrides
  (`themes/corporate-themes/src/corporates/*/tokens.ts`,
  `themes/corporate-themes/src/base/carbon-base.scss`,
  `components/ui-shell/src/ui-shell.{tsx,css}`,
  `playground/app/globals.scss`)
- **`ihsansolusi/bos7-financing`** — sample financing app
  (`app/dashboard/page.tsx`, `lib/nav-items.ts`, `app/(modules)/inbox/notifications/page.tsx`)
- **`ihsansolusi/bos7-enterprise`** — sample enterprise admin app
  (`app/(modules)/access-management/{dashboard,user,branch-types}/page.tsx` and `_modals/*`)

The reader is encouraged to explore those repos directly if they need a level of
fidelity beyond what this design system captures.

---

## Quick start

```html
<!-- Anywhere in your prototype -->
<link rel="stylesheet" href="colors_and_type.css" />

<!-- Pick a brand on any wrapper element (default = ihsan): -->
<body data-brand="bjb">
  <h3 style="color: var(--bos7-primary)">BJB Syariah primary</h3>
  ...
</body>
```

UI kits live in `ui_kits/`:

- [`ui_kits/bos7-enterprise/`](ui_kits/bos7-enterprise/) — Access Management, Users, Branches
- [`ui_kits/bos7-financing/`](ui_kits/bos7-financing/) — Dashboard, list-pembiayaan, Simulasi Angsuran

Each kit ships an `index.html` you can open directly.

---

## Index of files

```
README.md                 — this file
SKILL.md                  — Claude Code skill manifest
colors_and_type.css       — single source of truth for tokens
assets/
  logos/                  — corporate wordmarks (placeholders — replace with real assets)
fonts/                    — IBM Plex Sans / Mono (loaded from Google Fonts CDN)
preview/                  — small HTML cards rendered in the Design System tab
ui_kits/
  bos7-enterprise/        — UI kit + 4 click-through screens
  bos7-financing/         — UI kit + 3 click-through screens
```

---

## CONTENT FUNDAMENTALS

BOS7 is **Indonesian-first, English-second**. The shell ships an `Ui7Labels` interface
that can be overridden per-tenant, but the canonical copy is Indonesian. Where the
audience is a developer (modals on the playground, internal admin labels), English is
used.

### Voice & tone

- **Direct, neutral, professional.** This is a teller's, branch officer's, and
  back-office operator's tool — not a consumer app. There is no marketing-speak,
  no exclamation points, no first-person-plural ("we"), no encouragement.
- **Functional sentence labels, not commands.** A page is "List Account Pembiayaan",
  not "All Loans"; a button is "Tandai Semua Dibaca", not "Mark all".
- **No emoji. Anywhere.** The repos contain zero emoji in user-facing copy.

### Casing

- Page titles: **Title Case** — "Dashboard", "Simulasi Angsuran", "Branch Types".
- Button labels: **Title Case in Indonesian** — "Simpan", "Batal", "Tambah User",
  "Tandai Semua Dibaca".
- Section eyebrows / form-section headers: **UPPERCASE + 0.32 px letter-spacing**,
  600 weight, 12 px (`--bos7-fs-12`). E.g. `NAVIGASI CEPAT`, `DATA PRIBADI`.
- Helper text and table column headers: **Sentence case**.
- Account numbers, codes, IDs: **monospace + tabular-nums** (`.bos7-num` class) so
  digits line up in tables.

### Pronouns & language register

- Indonesian formal "Anda" never appears — labels are written without pronouns.
  "Profil Saya" ("My Profile") is the only first-person reference, on the profile
  panel button.
- Error and empty states are **bare facts**: "Gagal memuat data", "Tidak ditemukan.",
  "Halaman ini sedang dalam tahap pengembangan." No apologies, no advice.

### Worked examples (lifted from the repos)

| In the wild | What you should write |
| --- | --- |
| Page title | `Simulasi Angsuran`, `Inbox Notifikasi`, `Access Dashboard` |
| Page subtitle | `System access statistics summary`, `Manajemen produk dan transaksi pembiayaan` |
| Button — primary | `Simpan`, `Tambah User`, `Add Branch` |
| Button — destructive | `Hapus`, `Keluar` (logout) |
| Button — secondary/ghost | `Batal`, `Tandai Semua Dibaca` |
| Section eyebrow | `NAVIGASI CEPAT`, `DATA PRIBADI`, `ALAMAT` |
| Form helper | `Username wajib diisi`, `Email wajib diisi` |
| Toast — error | `Gagal terhubung ke server`, `Gagal menyimpan` |
| Toast — loading | `Memuat data...`, `Menyimpan...` |
| Empty state | `Tidak ditemukan.`, `Halaman ini sedang dalam tahap pengembangan.` |
| Status pill | `Aktif`, `Tidak Aktif`, `Locked`, `Pending` |
| Sidebar search placeholder | `Cari menu...` |
| Notification empty state | `Tidak ada notifikasi.` |

---

## VISUAL FOUNDATIONS

> All concrete values live in [`colors_and_type.css`](colors_and_type.css).
> The notes below describe **how** to apply them.

### Density — the single most important rule

BOS7 is **dense**. The whole point of `apply-corporate-theme` in
`themes/corporate-themes/src/base/carbon-base.scss` is to crush stock Carbon's
generous spacing into something a banker can fit on a 1366 × 768 screen.
Concretely:

- **Base font size 14 px** (`--bos7-fs-base: 0.875rem`), not 16 px. Even `<p>` is overridden.
- **Header 40 px** (`--bos7-h-header: 2.5rem`) — half a centimeter shorter than Carbon default.
- **Inputs, selects, date pickers, buttons 32 px** (`--bos7-h-input: 2rem`).
- **Table rows 32 px** (`--bos7-h-row-sm`) — and a `--xs` 24 px variant for ledger views.
- **Form field gap 12 px** vertical / 16 px horizontal — see `.form-grid` in globals.scss.

### Color

- Each tenant has **one primary triad** (primary / hover / active) and **one or two
  brand accents**. Hover is ~15 % darker than primary; active is ~30 % darker.
- The carbon-base mixin scales `background` from `primary` at variant boundaries:
  `white` is `#fff`, `g10` is a very-light tint of primary, `g90` is primary, `g100`
  is a dark tint. We default to **`white`** everywhere; only the header is themed
  to `g90` (dark) via `<UiShell headerThemeVariant="g90">`.
- **Text is pure `#000`**, not Carbon's `#161616`. Icons too. This is a deliberate
  override (`$text-overrides: (text-primary: #000, icon-primary: #000)` in the mixin).
- Status colors are exactly Carbon's: success #24A148, warning #F1C21B, error #DA1E28,
  info #0043CE. Used only on tags, inline notifications, focus rings, sparingly.
- **Row-selected highlight is `#EEF6FF`**, a 4-step-lighter blue than the brand. Hover-
  over-selected goes to `#DDEEFF`. This pair is global, not branded.

### Backgrounds

- The system is **flat white**. Layer-01 (`#F4F4F4`) is the only secondary surface
  and is reserved for: sidebar, stat tiles, table toolbars, form section headers,
  breadcrumb strip in the drilldown sidebar.
- **No gradients.** None. Not in headers, not in cards, not in buttons.
- **No background imagery in app chrome.** The login screen is the one place an
  illustration might live; most app screens are pure white.
- **No textures, patterns, or hand-drawn elements.** This is a serious tool.
- **No full-bleed photos** anywhere in admin views. Photos appear only on user
  avatars (40 px circle) and rare empty-state illustrations.

### Type

- IBM Plex Sans for everything, IBM Plex Mono for IDs / account numbers / currencies
  in tabular contexts.
- Headings are **600 (Semibold)**, body is **400 (Regular)**, labels are **600**.
- The page-title is `1.25rem` (20 px, semibold) — surprisingly small for a "page H1".
  This is intentional — the dense aesthetic doesn't shout.
- Section eyebrows use the **uppercase + 0.32 px letter-spacing** pattern (see
  `.form-section__title`, `.sidenav-demo__favorites-title`).

### Borders, radii, dividers

- **Radii are 0 or 2 px.** That's it. The avatar circle is the only exception.
- **Inputs have a 1 px soft border** (`rgba(0,0,0,0.08)`), white background. The
  Carbon stock `field` token is *overridden* — the system explicitly does not
  use the gray-inside-input look.
- **Tables have no borders.** Rows are separated by a 1 px `inset 0 -1px 0 0 #e8e8e8`
  box-shadow (so it doesn't double up with selection backgrounds). Header has no
  bottom border either.
- **Cards have a hairline border** (`1px solid #E0E0E0`), white background, **no shadow**.

### Shadows

- **No shadows on cards, buttons, inputs, or stat tiles.** Shadows are reserved for
  *floating* layers:
  - Header dropdown panels (notifications / profile / app switcher): `0 4px 16px rgba(0,0,0,0.20)`
  - Modals: heavier
  - Popovers / tooltips: lighter
- Combined with the soft 1 px input border, the system reads as **"engraved on paper"**
  rather than "stacked on a desk".

### Focus & interactive states

- **Buttons and links on hover/active darken**, never lighten. Carbon's hover→active
  pair (e.g. #0F62FE → #0043CE → #002D9C) is preserved per-tenant.
- **No press-state shrink, no scale transforms anywhere.** Banking software does not
  bounce.
- **Focus ring is `1px solid rgba(15,98,254,0.4)` with `outline-offset: 1px`** —
  a softened version of Carbon's hard 2 px ring. Inputs use a soft border tint
  on focus instead of a separate ring.
- **No opacity-on-hover patterns.** Things go to `#E8E8E8` (background-hover) or
  `#F0F0F0` (table-row hover).

### Layout rules

- **Header is `position: fixed`, 40 px tall, z-index 6000.** Body content gets
  `padding-top: 2.5rem` to compensate.
- **Sidebar is 256 px (`16rem`) wide**, slides in from the left, isn't always
  visible — the hamburger menu controls it. On viewports ≤ 768 px the sidebar
  is an overlay (z-index 6001) and does not shift content.
- **Content area is `flex: 1` with its own `overflow: hidden`** — the `.page__body`
  inside owns scroll context. The page header stays put while the table scrolls.
- **Header dropdown panels are `position: fixed; top: 2.5rem; right: 0;`** —
  they animate in from above (`translateY(-4px) → 0`, opacity, 150 ms).

### Transparency & blur

- **No backdrop-filter blur** anywhere. The system is opaque.
- **Translucency is reserved for input borders** (`rgba(0,0,0,0.08)`) and the
  focus ring (`rgba(15,98,254,0.4)`). Nowhere else.

### Animation

- **All durations are 100 / 150 / 200 ms.** No slow animations.
- Sidebar slide uses `transition: margin-left 0.2s ease`.
- Sidebar drill-down level changes use a 180 ms `translateX(8px) → 0` + opacity fade-in.
- Notification panel: 150 ms `translateY(-4px) → 0` + opacity.
- Hover transitions on rows / nav items: 150 ms `background-color`.
- **No bounces, springs, or spring-back overshoots.** Easing is `ease`, `ease-out`,
  occasionally Carbon's expressive `cubic-bezier(0, 0, 0.38, 0.9)`.

### Imagery tone

- Photos / illustrations are **rare**. When they appear (empty states, login),
  they are **flat-illustration**, two-tone, brand-primary + gray.
- No grain, no film effects, no warm/cool toning. The visual register is "spreadsheet."

---

## ICONOGRAPHY

The system uses **`@carbon/icons-react`** exclusively — the IBM Carbon icon set.
Every icon in every BOS7 app comes from this package. The set is ~1500 outline icons
at a fixed `size` prop (16, 20, 24, 32). They are stroke-style, 1 px stroke, on a
16 × 16 viewBox, rendered as inline SVG.

Common imports seen in the repos:

```ts
import {
  Add, Edit, TrashCan, Search, Filter, Download, Upload,
  Notification, UserAvatarFilledAlt, Settings, Logout,
  ChevronRight, ChevronDown, ChevronLeft, ArrowRight, ArrowLeft,
  Close, Checkmark, CheckmarkOutline, Warning, WarningAlt,
  Information, Star, StarFilled,
  Switcher,           // app-switcher icon in the header
  Finance, Building,  // domain icons on dashboard
  Money, Wallet, Currency,
} from "@carbon/icons-react";
```

Conventions:

- **Icon size in nav, toolbar buttons, header actions: `size={20}`**
- **Icon size next to a 14 px label inside text: `size={16}`**
- **Icon size in stat tiles / hero positions: `size={32}` or `size={48}`**
- **Icon color follows text color** — pure `#000` for primary, `#525252` for
  secondary, brand-primary only when the icon *is* the call to action.
- **Carbon's `Bank` icon does not exist** — use `Building` instead (this is called
  out in the source repo's `CLAUDE.md`).
- **No emoji.** None. Anywhere. Confirmed across all repos.
- **No unicode-as-icon hacks** (no ✓, ✗, →) — every glyph is a Carbon icon.
- **PNG icons are reserved for tenant logos only**; in this design system the
  tenant logos are SVG wordmarks (see [`assets/logos/`](assets/logos)).

For prototypes that can't `npm install` Carbon, link the icons from the public CDN:

```html
<!-- Carbon icons via unpkg, used as ESM in a module script -->
<script type="module">
  import { Add, Search } from "https://esm.sh/@carbon/icons-react@11";
  // ...
</script>
```

For pure HTML mocks, this design system embeds a small **inline SVG icon utility**
in each UI kit's `index.html`: see `ui_kits/bos7-enterprise/icons.js` for the
~30 most-used Carbon icons reproduced as inline SVG strings.

---

## Notes & caveats from this build

- **Real corporate logo files are not in the public repo** (the React code references
  `/assets/logos/bca-syariah-light.svg` etc. but the SVGs ship separately). The logos
  in `assets/logos/` here are **placeholder wordmarks** built from the brand color
  palette — replace them with the real bank-supplied SVGs before any external use.
- **IBM Plex Sans / Mono WOFF2 files** are imported from the official
  [`IBM/plex`](https://github.com/IBM/plex) repo (OFL-licensed) and live in
  `fonts/`. Only the weights used by BOS7 are included: Sans 300–700, Mono 400–600.
- **The Carbon icon set is not bundled** in this design system — UI kits link
  Carbon icons via esm.sh or inline a small subset. For production, depend on
  `@carbon/icons-react` directly.
