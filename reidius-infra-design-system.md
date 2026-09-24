# Reidius Infra — Design System
**Client:** Reidius Infra (Infrastructure / Construction)
**Prepared by:** MagicMond
**Source references:** internal type/color sheet (attached) + Archion-style reference layout (attached) + landbook inspiration set (Concourse, Kononenko Group, Agiloft)

> Purpose: this file is the single source of truth for how the Reidius Infra website should look, feel, and be built. Use it for every page, component, and content decision so output stays consistent across the project — treat it as a living document and update it as decisions are confirmed with the client.

---

## 1. Brand Personality

Read off the reference material, Reidius Infra should present as:

- **Authoritative, not flashy** — large-scale infra/construction credibility over trendy startup energy.
- **Precise and structural** — sharp edges, grid-based layout, generous whitespace, mirrors the discipline of engineering/architecture work.
- **Evidence-led** — the design leans on numbers (years of expertise, projects completed, % improvements), named enterprise clients, and quoted testimonials to build trust rather than decorative claims.
- **International / enterprise-facing** — multi-region footer, recognizable client logos, formal tone.

⚠️ **Open flag:** confirm with the client whether Reidius Infra is B2B (developers, EPC partners, government tenders) or B2B+public-facing. This affects tone of copy (Section 7) and how aggressively we push the CTA form.

---

## 2. Typography

| Role | Typeface | Notes |
|---|---|---|
| Headings / Titles | **Roboto Slab** | Bold slab-serif. Use for H1–H3, hero statements, big stat numbers. Gives the "structural / built" feel that suits infra & construction. |
| Body / UI text | **Fustat** | Sans-serif. Use for paragraphs, nav, labels, form fields, buttons, captions. |

**Pairing rule:** Never mix — headings are always Roboto Slab, everything else is always Fustat. Do not substitute a generic serif or system sans as fallback in mockups; only use as a last-resort web fallback stack (see §9).

**Suggested type scale** (starting point — confirm against final breakpoints):

| Token | Size (desktop) | Weight | Use |
|---|---|---|---|
| Display / H1 | 56–64px | Bold | Hero headline (brand name / big statement) |
| H2 | 36–40px | Bold | Section headers ("Build at Scale. Build for Impact.") |
| H3 | 24–28px | Bold/SemiBold | Card titles, stat callouts |
| Stat number | 32–48px | Bold (Roboto Slab) | "24", "357", "40%", "28%" style callouts |
| Body | 16px | Regular (Fustat) | Paragraphs |
| Small / caption | 12–13px | Regular/Medium | Nav links, eyebrow labels, footer, image captions |

Headline and body copy should always be provided bilingually (EN + Hindi) per project standard — see §7.

---

## 3. Color System

| Token | Hex | Swatch role |
|---|---|---|
| Primary | `#F9EF5D` | Signature accent yellow — CTAs, highlights, key stat emphasis |
| Secondary | *(see flag below)* | Dark navy/near-black — primary button fill, footer background, dark headline text |
| Accent | `#837762` | Warm taupe/brown — secondary accent, used sparingly (icons, dividers, muted highlights) |
| Gray 80 | `#3E3E3E` | Primary body/heading text on light backgrounds |
| Gray 70 | `#595959` | Secondary text, muted labels |
| Gray 50 | `#AEAEAE` | Disabled states, subtle borders, placeholder text |
| Gray 20 | `#F2F2F2` | Section backgrounds, dividers, card fills |
| White | `#FFFFFF` | Base background |

⚠️ **Data flag:** in the source sheet, both "Primary" and "Secondary" are labeled `F9EF5D`, but the Secondary swatch is visibly dark navy/charcoal (matches the dark filled button and footer background in the reference). This is almost certainly a copy‑paste error in the source file. **Please confirm the correct Secondary hex with the client/brand team before locking the palette** — until then, treat Secondary as an unconfirmed dark navy (approx. `#1A1D23`–`#20232B` range, sampled from the reference).

**Usage rules:**
- Yellow (`Primary`) is the *only* high-saturation color in the system — use it deliberately (primary CTA, key metric, active states). Don't let it appear in more than one or two places per screen.
- Secondary (dark) carries most of the "premium/authoritative" weight: footers, primary buttons on light backgrounds, dark section backgrounds.
- Accent (`#837762`) is a quiet supporting color — good for icon fills, tags, or dividers, not for CTAs.
- Grays do all the structural heavy lifting — most of the UI (text, borders, section fills) should be gray/white, not colored. The reference layout is ~90% neutral with color used only as punctuation.

---

## 4. Global Design Rules (non-negotiable)

Pulled directly from the brand sheet:

1. **No rounded corners.** All buttons, cards, inputs, images, and containers are sharp/square (`border-radius: 0`). This is a strict rule, not a default — audit every component.
2. **No gradients.** Flat color fills only, including on buttons, backgrounds, and overlays. Photography can have a flat dark overlay for text legibility, but no color gradients.
3. **Sharp icons.** Use geometric, thin/medium-weight line icons with square terminals — avoid soft/rounded icon sets (e.g. avoid typical "friendly SaaS" rounded icon packs).

---

## 5. Layout & Page Structure

The Archion reference is the clearest model for how a Reidius Infra marketing page should be composed. Recommended anatomy for the homepage, based on that reference plus the Concourse/Kononenko/Agiloft inspiration set:

1. **Header (sticky, white bg)** — logo (left), primary nav (Projects / Career / About or equivalent), single dark filled CTA button (right, e.g. "Contact Us").
2. **Hero** — large Roboto Slab wordmark/headline, one-line supporting description, 2 key stats inline (e.g. "X years of expertise", "Y completed projects"), a row of filter/category pills (Education, Infrastructure, Corporate, Healthcare…), followed by one large full-bleed project photograph with a small caption/label bottom-left.
3. **Intro/About block** — short paragraph on capability + a bold two-line statement headline ("Build at Scale. Build for Impact." style), paired with 3 supporting stats, each with a minimal abstract line-chart/illustration above the number.
4. **Press / recognition grid** — 2×2 or 4-across grid of client logos or named orgs with a one-line proof point each (mirrors "Pfizer cuts operating costs by $8.5M…" style); one cell can be a bold standout stat card.
5. **Testimonial** — single large pull-quote, oversized quotation mark, attribution (name, title, company).
6. **Client logo bar** — horizontal row of recognizable client/partner logos, grayscale-safe.
7. **Contact / lead-gen block** — full-bleed photo on one side, an overlaid white card with a short form (Email, First/Last name, Organization, Project type dropdown, submit CTA, privacy microcopy).
8. **Footer (dark/Secondary bg)** — logo, regional offices in columns (address + phone per region), legal/copyright line, secondary nav, "design by" credit line.

**Layout principles:**
- Heavy use of whitespace; content breathes rather than being packed.
- Left-aligned text blocks, asymmetric grid (not everything centered).
- Photography is large-format architecture/site photography, not stock-generic — always full-bleed or near full-bleed, never boxed in small thumbnails.
- Stats and numbers are treated as design elements (large Roboto Slab numerals), not buried in paragraphs.

---

## 6. Components

### Buttons
- Shape: sharp corners, no radius.
- Primary: Secondary-dark fill, white Fustat label, medium padding, all-caps or sentence case (confirm with client — reference uses small caps/tracked type for nav-level buttons).
- Secondary/alt: Primary-yellow fill with dark text (see reference sheet — both a dark and a yellow button variant exist; use dark as default CTA, yellow as a high-emphasis/promo variant).
- No gradient, no shadow-heavy hover states — prefer a simple fill/invert on hover.

### Cards
- Sharp corners, flat fill (white or Gray 20), thin 1px border or no border — avoid drop shadows; if elevation is needed, use a very subtle flat shadow, not soft/blurred.

### Forms
- Underline or thin-border inputs, sharp corners, Fustat labels, generous vertical spacing.
- Dropdowns/selects should use sharp custom chevrons (not default browser rounded UI).

### Icons
- Sharp/geometric line icons, consistent stroke width, no rounded caps.

### Data / stats
- Numerals in Roboto Slab Bold, oversized relative to their label.
- Optional abstract "bar/line" decorative marks above stats (seen in reference) can be used as a signature motif for proof-point sections.

---

## 7. Content & Copywriting Guidelines

Per MagicMond standard, all Reidius Infra content should be produced in **English and Hindi**, tailored to Indian audiences where relevant (while preserving the international/enterprise tone the reference implies):

- **Clarity over cleverness** — infra/construction buyers (developers, government, EPC partners) want confidence and proof, not wordplay.
- **Lead with numbers/proof** — years of experience, project counts, % efficiency gains, safety records, timelines. Mirror the reference's "28% material waste reduction," "357 completed projects" pattern.
- **Hindi copy** should stay register-appropriate for a B2B/enterprise/government audience (formal, respectful tone — avoid overly casual colloquial Hindi), while remaining plain and easy to scan, not literary or heavy Sanskritized Hindi unless the client specifically wants a more traditional/authoritative register.
- **CTA language** — direct and low-friction: "Request a Consultation," "Talk to Our Team," "Let's Build Together" style phrasing.
- Every major claim/stat should be sourced or at least clearly attributable internally before publishing (avoid fabricated numbers in copy drafts — use placeholders like `[X]%` until client confirms real figures).

---

## 8. UX Principles to Apply

- **Usability first:** nav stays simple (3–5 top-level items), CTA is always visible/findable.
- **Accessibility:** since the palette leans heavily neutral with one accent yellow, double-check contrast — Gray 70/80 text on white passes AA; verify yellow-on-dark and dark-on-yellow button contrast meets WCAG AA before finalizing.
- **Consistency:** one button shape, one card shape, one icon style — no per-page deviation.
- **Clarity:** every section should answer "what is this proving" — stat, proof point, or client logo — rather than pure decoration.
- **Scalability:** structure components (stat block, logo grid, testimonial, contact card) as reusable modules — Reidius Infra will likely need these repeated across services/sectors/industry sub-pages (education, healthcare, civic infra, corporate campuses, etc., per the reference site's category pills).

---

## 9. Technical Notes (for build/handoff)

```css
:root {
  --color-primary: #F9EF5D;
  --color-secondary: #1A1D23; /* UNCONFIRMED — verify exact hex with client */
  --color-accent: #837762;
  --color-gray-80: #3E3E3E;
  --color-gray-70: #595959;
  --color-gray-50: #AEAEAE;
  --color-gray-20: #F2F2F2;
  --color-white: #FFFFFF;

  --font-heading: "Roboto Slab", "Georgia", serif;
  --font-body: "Fustat", "Helvetica Neue", Arial, sans-serif;

  --radius: 0px; /* hard rule: no rounded corners anywhere */
}
```

- Roboto Slab is available on Google Fonts. Confirm Fustat's license/source (also on Google Fonts) before using in production — pull both via a pinned Google Fonts `<link>` or self-host for performance.
- Because gradients and rounded corners are explicitly banned, avoid default component-library styling (e.g. default shadcn/Bootstrap/Material buttons) without stripping radius + shadow + gradient tokens first.

---

## 10. Reference Set (for inspiration, not literal copying)

| Site | What to borrow |
|---|---|
| Archion-style layout (attached) | Overall page anatomy, stat-driven storytelling, contact card overlay pattern, footer structure — **primary structural reference** |
| Concourse (concourse.ai) | Logo marquee treatment, alternating feature-card rhythm, stat band before footer, testimonial carousel pattern |
| Kononenko Group | (agency portfolio reference — pull for photography-led hero treatment and editorial spacing) |
| Agiloft | (enterprise SaaS reference — pull for nav/CTA restraint and enterprise trust signals) |

---

## 11. Open Questions / To Confirm With Client

- [ ] Correct hex for **Secondary** color (see §3 flag).
- [ ] Exact button label casing (Title Case vs Sentence case vs Small Caps) — reference shows tracked small caps in nav CTA but sentence case in the contact form button.
- [ ] Confirm whether Hindi content is required across the full site or only for specific regional/government-facing pages.
- [ ] Final list of industry categories/pills (Education, Civic & Urban Infrastructure, Corporate Campuses, Healthcare, …) relevant to Reidius Infra's actual service lines.
- [ ] Real stats/metrics to replace placeholder proof points before copy is finalized.

---

*This document should be updated whenever a design decision is finalized with the client, so it always reflects the current source of truth for the Reidius Infra site.*
