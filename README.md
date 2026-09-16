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
composition (a numbered decision ledger, a standing plate beside an open
theme ledger, and an image-led typographic framework respectively). The
Services landing page is an interactive index rather than a list of all three.

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
  to ink, kept for any future light-ground use. The header no longer swaps
  wordmarks (its ground is dark from the top of the page to the bottom), so
  nothing currently references it.
- `src/app/favicon.ico` — the original favicon from the live site.

Brand colours were extracted from the live site's stylesheet:
`#C5A47E` (gold), `#A68A68` (deep gold), `#0A0A0A`/`#1A1A1A` (near-blacks) and
`#F5F5F0` (warm ivory). The palette warms those very slightly so the gold sits
with the grounds rather than against them — obsidian `#0A0A0B` and ivory
`#F5F2EC` — and `#7D6038` is the deeper bronze small accent text uses on ivory,
where the gold itself falls below a usable contrast ratio. The tokens live in
`globals.css`; `tailwind.config.ts` mirrors only the ones utilities reference.

---

## Typography

- Display: **Instrument Serif** (`--font-display`)
- Text/UI: **Inter** (`--font-sans`)

Both are loaded through `next/font/google`, self-hosted at build time. The type
scale lives in `src/app/globals.css` as `.t-hero`, `.t-display`, `.t-h2`,
`.t-h3`, `.t-h4`, `.t-lead`, `.t-body`, `.t-small`, `.t-meta`, `.t-label` and
`.t-num` — all `clamp()`-based, so sizing is fluid rather than
breakpoint-stepped. `.t-hero` is reserved for the homepage; every other page
opens on `.t-display`.

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
locally in `public/videos/`. One file serves every viewport:

| File | Use |
| --- | --- |
| `West Point Gold.mp4` | the hero clip (the space in the name is percent-encoded in the `src`) |
| `hero-poster.jpg` | `<video poster>`, extracted from frame 1 |

`HeroVideo` renders the poster still first — that carries first paint and is
the permanent fallback — and attaches the `<video>` only after mount, so it
never blocks render or competes with the LCP text. Playback is skipped entirely
under `prefers-reduced-motion`, below 768px, on `saveData` and on 2g/3g
effective connections; in each case the still simply remains. The element
pauses when scrolled out of view.

The clip is 11 MB — the one genuinely heavy asset on the site. It is deferred
until after mount and never competes with the LCP text (measured LCP on the
homepage is ~0.26 s), but if it is ever re-encoded, a 1080p and a 720p variant
would be the obvious next step.

The matching WebP poster variants (`hero-video-poster-*`) are in
`public/images/` and registered in the image manifest like any other asset.

---

## Spacing system

Vertical rhythm is designed at the **boundary between two sections**, not
independently inside each one:

```
--pad        the full break a section carries
             56px phone · 88px 768 · 104px 1024 · 116px 1280 · 128px 1536
--pad-edge   the trimmed value used on both sides of a change of ground
--pad-sm     the step between a section's heading and its composition
--gap        the gap between columns inside a section
```

Two neighbours on the same ground read as one break — the first carries it and
the second starts flush — so two paddings never add up into a viewport of dead
space. Where the ground changes, the edge itself does the separating and both
sides are trimmed. Those rules live in `globals.css` and key off the ground
classes, so a section never has to know what follows it.

Horizontal layout is one container: `--max` (1600px of content, opening to
1720px beyond 1920) with `--gutter` running ~20px on the narrowest phone, ~36px
at 768, ~48px at 1024 and capping at 96px. `.shell` is the container; the wider
`.shell-wide` is used only by the header and the homepage hero.

`--header-h` (72 / 80 / 88px) is the single source of truth for header height.
`.below-header` keeps the homepage hero clear of it and every other hero adds
it into its own top padding. Nothing should hard-code a top offset.

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
    layout/             Header (expertise panel included), MobileMenu, Footer,
                        PageHero, PageTransition
    sections/           page-level compositions
    ui/                 Picture, HeroVideo, ArchitecturalScene, Button,
                        Magnetic, Preloader, Cursor, ScrollProgress
    animations/         Reveal, MaskedLines, RowReveal, ImageReveal, Parallax,
                        SplitText, FocusIn, CurtainReveal, Marquee
  data/                 verified content + generated image manifest
  lib/                  form submission boundary, intro timing
```

### Three sections worth knowing about

Most sections are ordinary composition. These three carry behaviour:

- **`Hero`** — two columns over the footage. The right column is an advisory
  panel standing the three disciplines on an architectural plate: it advances
  itself every six seconds so the frame is never static, and stops the moment a
  mouse enters, from which point the reader is driving. Hidden below `lg`,
  where it would push the hero past one screen.
- **`ProcessNarrative`** — the five steps are a pinned horizontal rail from
  `lg`. The travel is measured rather than guessed: the distance is the rail's
  overflow past the window and the scroll track is made exactly that much taller
  than one screen, so scrolling and travelling move one-for-one at any width.
  Below `lg`, and under reduced motion where pinning would strand the content,
  the same five steps are a vertical ledger.
- **`ServiceShowcase`** — the homepage index. Three full-width rows with no
  image column at all: a plate follows the pointer across the list on a spring,
  carrying the photograph of whichever discipline is under it, so the type keeps
  the whole measure. Below `lg` the same content is a stacked sequence.
- **`ServiceSelector`** — the Services page's index. A real tablist, so arrow
  keys move between disciplines and each panel is associated with its tab.
  Deliberately a different interaction from the homepage's hover-led index:
  there you preview a discipline, here you commit to one and get its substance.

### The hero's 3D scene

`ArchitecturalScene` is an abstract international financial district, built on
raw three.js. No model files: the towers are generated from four archetypes
(slab, stepped, twisted, podium), and realism comes from three places —

- a **generated facade texture** (one canvas for the glazing, one for which
  windows are lit — offices light by floor, not at random);
- **per-instance UV scaling**, a custom instanced attribute injected into the
  standard material's shader, so one shared box geometry does not stretch its
  windows differently on a wide podium than on a narrow shaft;
- a **generated environment map** — a night gradient through PMREM, so the
  glass carries real reflections rather than a single specular highlight.

Depth is exponential fog, not a bokeh pass: real depth-of-field would add a
full-screen pass across the whole hero for no visible gain at this scale.

three.js is behind `next/dynamic`, so it is never in the initial bundle and is
only fetched once `useWantsScene` has decided the device should run it — a
desktop viewport, a fine pointer, no reduced-motion, no data-saver, not a slow
connection, and four cores or more. Everything else gets the architectural
footage, and so does any device where the context cannot be created. The scene
also measures its own frame rate for ~1.8s after the build settles and drops
its pixel ratio once if it cannot hold 40fps.

### The interaction layer

Three pieces sit above the page and are easy to miss when reading the tree:

- **`Preloader`** — the opening sequence. An inline script in the document
  head sets `data-preload` on `<html>` before first paint, so the curtain is
  never drawn over a page the visitor has already seen this session. The same
  script clears the attribute after four seconds as a failsafe: if the bundle
  never hydrates, a CSS rule removes the curtain outright rather than leaving
  the page behind a black screen.
- **`Cursor`** — a gold dot and a trailing ring, attached only on a device with
  a real pointer that is not asking for reduced motion. It hides the native
  cursor by setting `data-cursor="on"`, and only after the first pointer move,
  so the pointer is never missing. Text fields keep their caret.
- **`useIntroDelay`** (`lib/intro.ts`) — how long a hero waits before its
  opening sequence begins. It reads the preload attribute once during the first
  client render, so the first view of a session holds until the curtain lifts
  and every navigation after that starts immediately.

### Two implementation notes worth keeping in mind

1. **`whileInView` and clipped elements.** A masked line translated out of an
   `overflow-hidden` parent has an empty intersection rect, so an
   IntersectionObserver on it never fires. `MaskedLines` therefore puts
   `whileInView` on the unclipped wrapper and drives the lines with variants.

2. **Tailwind's opacity scale is extended in `tailwind.config.ts`.** The default
   only defines 5% steps, so any other value (`border-ink/12`) silently
   produces no rule. The config defines every integer opacity.

---

## Accessibility and motion

- One `<h1>` per page, logical heading order, semantic landmarks.
- Skip link, visible gold focus ring on every interactive element.
- `aria-expanded` on the expertise panel and the mobile menu; Escape closes
  both; the mobile menu locks background scroll and restores position on close.
- All decorative imagery is `alt=""` + `aria-hidden`; content imagery has
  descriptive alt text.
- `prefers-reduced-motion: reduce` drops entrance animations, parallax, route
  transitions, the magnetic actions, the custom cursor and the hero video
  entirely, and shortens the opening sequence to a fade; verified that no
  content remains hidden or offset under it.
- Interactive controls meet a ~44px touch target on mobile.

---

## Verification performed

Against the production build, driven headlessly through the Chrome DevTools
Protocol:

- **Content parity:** every verbatim string recorded in `src/data` renders in
  the built HTML (46/46). `src/data/` is unchanged from before the redesign, so
  the content source of truth is intact.
- **Routes:** all eleven render 200 (the 404 route returns 404) with no console
  errors and no uncaught exceptions.
- **Responsive:** 320 / 390 / 768 / 834 / 1280 / 1600 / 2560 across every page —
  `scrollWidth === clientWidth` at all of them, so nothing overflows
  horizontally.
- **Opening sequence:** the curtain clears on every route, `data-preload`
  resolves to `done` and `body` is left scrollable; the four-second failsafe
  covers a bundle that never hydrates.
- **Reduced motion:** entrance animations, parallax, route transitions, the
  magnetic actions, the custom cursor, the hero panel's auto-advance and the
  hero video are all dropped, the pinned horizontal rail falls back to a
  vertical ledger, and the opening sequence collapses to a short fade.
- **Interaction:** the Services tablist reports one selected tab and one
  visible panel after a switch, with no exceptions thrown; the pinned rail is
  inert below `lg` (measured: the section is 1124px on a 390px viewport and
  2276px at 1600px, with only one of the two forms laid out at each).
- **The 3D hero:** renders with no console errors, and the fallback chain was
  checked at 2560 / 1920 / 1440 / 1280 / 1024 / 768 / 430 / 390 / 375 — canvas
  from 1024 up, the footage at 768, the still on phones, and no overflow at any
  of them.

**Not verified here:** the scene's frame rate on real hardware. The machine
this was built on has only SwiftShader, whose software rasterisation reports a
number that says nothing about a GPU. The adaptive pixel-ratio step exists
because of that gap, not as a substitute for measuring it — worth checking on a
real device.

---

## Design references

The redesign was directed against three reference boards. They informed layout,
hierarchy, motion and spacing only — none of their imagery, copy, sections or
brand marks appear anywhere on the site.

They are third-party design work, so they are **not committed**: they live in
`_source_assets/references/` locally, which `.gitignore` excludes. The table
below records what each one contributed so the reasoning survives without the
files.

| File | What was taken from it |
| --- | --- |
| `ref-1-brand-board.jpg` | Confirmation of the charcoal / warm-ivory / muted-gold palette and the editorial serif pairing. |
| `ref-2-property-platform.jpg` | Full-bleed imagery with corner captions; a centred statement carrying its own emphasis. |
| `ref-3-agency-site.webp` | The numbered service rows with a plate that follows the pointer, and the oversized wordmark cropped by the bottom edge of the page. |



---

## Surfaces

The interface is built from layered, generously rounded surfaces rather than
bare type on empty ground. One radius scale covers everything:

```
--r-sm  8px    chips, marks
--r-md  14px   controls, plates nested inside a card
--r-lg  18→28px  cards, plates, panels
```

Only media that meets the edge of the page stays square — `.media-flat` marks
those six full-bleed plates. A plate nested inside a card takes `.media-in`, one
step tighter, so it reads as held rather than floating.

Four surfaces, shared across every page:

| Class | Where |
| --- | --- |
| `.surface` | raised, on ivory — insight cards, process cards, markers |
| `.surface-tint` | the warmer counterpart, used to break up a run of them |
| `.surface-dark` | one inverted card among light ones, to give a row a centre of gravity |
| `.surface-inv` | on obsidian; add `bg-ink/40 backdrop-blur-xl` where it sits over a photograph |

`.surface-lift` adds the hover shift, `.chip` is the pill label and `.badge` the
circular action mark that closes a card or a row. Shadows are two very wide,
very low-opacity layers (`--lift` / `--lift-hover`) — never a hard drop shadow.
