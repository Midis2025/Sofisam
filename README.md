# SOFISAM FZCO — Website

International Strategic Consulting, Advisory and Structuring Firm.
Multi-page corporate site built with Next.js (App Router), TypeScript, Tailwind CSS and Framer Motion.

---

## Running the site

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes prerender statically)
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

Node 20+ recommended. `sharp` is a dev dependency, used only by the image
preparation step described below.

---

## Routes

| Route | Notes |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/services` | Services landing |
| `/services/strategic-consulting` | Individually composed |
| `/services/advisory` | Individually composed |
| `/services/structuring` | Individually composed |
| `/insights` | Insights index |
| `/insights/[slug]` | Three article pages, statically generated |
| `/contact` | Contact |
| `/robots.txt`, `/sitemap.xml` | Generated from `src/data` |

The three service pages deliberately share no page template — each has its own
composition (a numbered decision ledger, a sticky-media accordion, and an
image-led typographic framework respectively).

---

## Content model — the important part

All public-facing copy that exists on the live source site
(<https://sofisam.com/>) is held in `src/data/` and is treated as verified fact:

- `src/data/site.ts` — company name, positioning, hero and welcome copy,
  contact details, newsletter and footer strings.
- `src/data/services.ts` — the three services. `title` and `sourceSummary` are
  verbatim from the source site.
- `src/data/insights.ts` — the three insights. `title`, `summary` and `date`
  are verbatim from the source site.

**Rules that were applied when writing supporting copy, and should continue to
be applied:**

- Nothing asserts a client, partnership, mandate, transaction, asset figure,
  headcount, office, licence, regulatory permission, award, track record,
  testimonial, case study, statistic, named individual or government
  relationship, because none of those appear on the source site.
- Expanded copy elaborates on positioning SOFISAM already states about itself,
  and no further.
- Insight bodies are general professional commentary and carry a disclaimer
  noting they are not advice and describe no specific engagement.
- The Global Perspective section names Dubai as the base and otherwise speaks
  of "international markets" and "strategic relationships" — it never implies
  an office anywhere but the stated Dubai headquarters.
- No social links are present, because the source site's social icons point at
  `#` and no verified profile URLs exist.

---

## Brand assets

- `public/logo.png` — the original asset from the live site, unmodified.
- `public/logo-dark.png` — the same artwork with its white wordmark recoloured
  to ink for use on light backgrounds. Proportions and the gold mark are
  untouched; it is a colourway of the original, not a redraw.
- `src/app/favicon.ico` — the original favicon from the live site.

Brand colours were extracted from the live site's stylesheet:
`#C5A47E` (gold), `#A68A68` (deep gold), `#0A0A0A`/`#1A1A1A` (near-blacks),
`#F5F5F0` (warm ivory). The palette in `tailwind.config.ts` is built on these.

---

## Typography

- Display: **Instrument Serif** (`--font-display`)
- Text/UI: **Inter** (`--font-sans`)

Both are loaded through `next/font/google`, self-hosted at build time. The type
scale lives in `src/app/globals.css` as `.t-display`, `.t-h1`, `.t-h2`,
`.t-h3`, `.t-lead`, `.t-body`, `.t-label`, `.t-index` — all `clamp()`-based, so
sizing is fluid rather than breakpoint-stepped.

---

## Images

Source photography is licensed stock (Pexels), downloaded and processed
locally. Nothing is hotlinked.

`src/data/image-meta.json` is a generated manifest holding each asset's
intrinsic dimensions, the list of variant widths actually produced, and an
inline blur placeholder. `src/components/ui/Picture.tsx` reads it to emit an
accurate `srcset`.

Variants are 640/1080/1600/2400 WebP with quality tapering as size grows, and
a 2600px cap on the long edge so tall crops do not balloon. Assets only ever
used in wide crops are pre-cropped rather than downloaded at full height.

Regenerating is a one-off preparation step, not part of `npm run build` — the
generated files in `public/images/` and the manifest are committed.

---

## Hero video

The homepage hero plays a licensed golden-hour Dubai skyline clip, stored
locally in `public/videos/`:

| File | Use |
| --- | --- |
| `hero-dubai-1080.mp4` | 3.3 MB — viewports ≥ 768px |
| `hero-dubai-720.mp4` | 1.2 MB — viewports < 768px |
| `hero-poster.jpg` | `<video poster>`, extracted from frame 1 |

`HeroVideo` renders the poster still first — that carries first paint and is
the permanent fallback — and attaches the `<video>` only after mount, so it
never blocks render or competes with the LCP text. Playback is skipped entirely
under `prefers-reduced-motion`, on `saveData`, and on 2g effective
connections; in each case the still simply remains. The element pauses when
scrolled out of view.

The matching WebP poster variants (`hero-video-poster-*`) are in
`public/images/` and registered in the image manifest like any other asset.

---

## Spacing system

All vertical rhythm comes from three section steps and three content gaps
defined in `globals.css`, rather than per-component clamps:

```
--space-section-lg   ~56px phone · ~75px 768 · ~99px 1024 · 112px desktop
--space-section-md
--space-section-sm
--content-gap-lg / -md / -sm
```

Horizontal layout is one container: `--container-max` (1680px of content) with
`--gutter` running ~22px on the narrowest phone, ~32px at tablet and 4.5vw on
desktop. `.shell-wide` is the only container class; `.section`, `.section-md`
and `.section-sm` are the only vertical steps.

`--header-h` (72 / 80 / 88px) is the single source of truth for header height,
and `.below-header` is what keeps hero content clear of it. Nothing should
hard-code a top offset to clear the header.

---

## What this design deliberately does not use

No globes, wireframe spheres, graticules, node-and-edge diagrams, chart-like
grids or data-dashboard motifs appear anywhere. International reach is
expressed through architectural photography and typography — see
`GlobalPerspective` (full-bleed city with typographic markers) and the
Structuring page's framework section (architecture beside a typographic
ledger). If a future section needs to convey "global", reach for imagery and
type, not a sphere.

---

## Forms

There is **no mail service or newsletter provider connected**, and nothing in
the UI pretends otherwise. `src/lib/forms.ts` is the single integration point:

```
NEXT_PUBLIC_CONTACT_ENDPOINT      # receives the contact enquiry payload
NEXT_PUBLIC_NEWSLETTER_ENDPOINT   # receives the subscription payload
```

Both are expected to accept `POST` with a JSON body and answer 2xx on success.
Until they are set, the contact form reports honestly that the message was not
sent and offers a prefilled `mailto:` as the fallback; the newsletter does the
same. Setting the variables switches both to real submission with no other
code changes.

---

## Architecture

```
src/
  app/                  routes, metadata, sitemap, robots, 404
  components/
    layout/             Header, MegaMenu (in Header), MobileMenu, Footer,
                        PageHero, PageTransition
    sections/           page-level compositions
    ui/                 Picture, HeroVideo, Button, Accordion, ScrollProgress
    animations/         Reveal, MaskedLines, DrawRule, ImageReveal,
                        Parallax, ScaleOnScroll
  data/                 verified content + generated image manifest
  lib/                  form submission boundary
```

### Two implementation notes worth keeping in mind

1. **`whileInView` and clipped elements.** A masked line translated out of an
   `overflow-hidden` parent has an empty intersection rect, so an
   IntersectionObserver on it never fires. `MaskedLines` therefore puts
   `whileInView` on the unclipped wrapper and drives the lines with variants.

2. **Tailwind opacity and duration scales are extended in
   `tailwind.config.ts`.** The defaults only define 5% opacity steps and a
   handful of durations; any other value (`border-ink/12`, `duration-400`)
   silently produces no rule. The config now defines every integer opacity.

---

## Accessibility and motion

- One `<h1>` per page, logical heading order, semantic landmarks.
- Skip link, visible gold focus ring on every interactive element.
- `aria-expanded` on the mega-menu, mobile menu and accordions; Escape closes
  the mega-menu and the mobile menu; the mobile menu locks background scroll
  and restores position on close.
- All decorative imagery is `alt=""` + `aria-hidden`; content imagery has
  descriptive alt text.
- `prefers-reduced-motion: reduce` drops entrance animations, parallax and the
  hero video entirely; verified that no content remains
  hidden or offset under it.
- Interactive controls meet a ~44px touch target on mobile.

---

## Verification performed

- Content parity: an automated check confirms every distinct string from the
  live source site appears somewhere in the new build (51/51).
- Routes: all 12 render 200 (404 route returns 404) with no console errors, no
  failed requests, no broken images, no `#` placeholder links.
- Responsive: 320/360/375/390/414/430/480/768/834/1024/1280/1440/1600/1920/2560
  plus two landscape phone sizes, across all pages — no horizontal overflow and
  no element escaping the viewport.
- Hero fits within the viewport without scrolling on every device ≥640px tall,
  and never collides with the header at any width.
- Section gaps measured at 1440/834/390: no unexplained band exceeds the two
  adjacent section steps; the larger remaining gaps are centred min-height CTA
  panels, which are intentional.
- Hero video verified playing on desktop (1080p) and mobile (720p), and absent
  under reduced-motion.
- Core Web Vitals on the production build (local): CLS ≈ 0.000, FCP ~140–240 ms,
  LCP ~0.22–1.54 s.
