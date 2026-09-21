/**
 * OUR WORK — the five scenes.
 *
 * Nothing in this file is new. Every title is already set somewhere on this
 * site, every description is the verified source copy held in `site.ts` and
 * `services.ts`, and every image and link already exists. The section is a
 * different presentation of the firm's work, not a new claim about it.
 *
 * In particular these are not case studies. The source site names no client,
 * mandate, transaction, jurisdiction or result, so neither does this: the five
 * scenes are the firm's base, its three disciplines and the perspective its
 * principals bring — which is the whole of what SOFISAM says about its work.
 */

import { services } from './services';
import { welcomeCopy } from './site';

export interface WorkScene {
  /** Display number. Also the scene's key. */
  k: string;
  /** The small label above the title. */
  category: string;
  /** The scene's own title, set large. */
  title: string;
  /** One paragraph, carried on the right of the frame. */
  body: string;
  /** Base name of the plate in /public/images. */
  image: string;
  focal?: string;
  /**
   * A short, muted, looping clip shown in place of the plate, with the plate
   * as its poster. None of the five uses one: the only clip in the repository
   * is unrelated to the firm's world, and a photograph is the right medium for
   * architecture. The renderer supports it for when a suitable clip exists.
   */
  video?: string;
  /** Where the scene continues, when it continues somewhere. */
  href?: string;
  /** The label on that link. */
  cta?: string;
}

const [consulting, advisory, structuring] = services;

/*
 * The plates are the firm's own photography, and no two scenes share one:
 * each of the five is a photograph that appears nowhere else on the page the
 * section sits on. Two of them — the pale facade and the lattice — are also
 * carried by the About and Structuring pages, which is as far apart as a
 * library of nineteen images allows. Anything genuinely new means new files
 * in /public/images, with the responsive variants generated alongside them.
 */

export const workScenes: WorkScene[] = [
  {
    k: '01',
    // The label and title the Dubai passage already carries.
    category: 'Dubai — DMCC',
    title: 'A base chosen for its reach.',
    body: welcomeCopy.paragraphs[0],
    /* The city itself, from above: the one image on the site that shows the
       place the firm actually works from. */
    image: 'hero-video-poster',
    focal: '48% 54%',
    href: '/about',
    cta: 'Explore the firm',
  },
  {
    k: '02',
    category: consulting.title,
    title: consulting.hero.headline,
    body: consulting.sourceSummary,
    /* Looking up between four towers to the point where they converge: a
       vantage point, which is what reading a market is. */
    image: 'towers-converge',
    focal: '50% 50%',
    href: `/services/${consulting.slug}`,
    cta: `Explore ${consulting.title}`,
  },
  {
    k: '03',
    category: advisory.title,
    title: advisory.hero.headline,
    body: advisory.sourceSummary,
    /* A pale facade in late light, the floors behind it occupied — the room
       where a decision is actually taken. */
    image: 'facade-pale',
    focal: '50% 46%',
    href: `/services/${advisory.slug}`,
    cta: `Explore ${advisory.title}`,
  },
  {
    k: '04',
    category: structuring.title,
    title: structuring.hero.headline,
    body: structuring.sourceSummary,
    /* A structural lattice: form deciding what the building can carry, which
       is the whole of the discipline. */
    image: 'gold-lattice',
    focal: '52% 50%',
    href: `/services/${structuring.slug}`,
    cta: `Explore ${structuring.title}`,
  },
  {
    k: '05',
    // The firm's own phrase for what the principals are brought into, and the
    // title the executive perspective passage already carries.
    category: 'Mandates and Investments',
    title: 'Advice given by people who have held the position.',
    body: welcomeCopy.paragraphs[2],
    /* An institutional form, lit low: weight carried rather than displayed. */
    image: 'abstract-dark',
    focal: '50% 50%',
    href: '/about',
    cta: 'Explore the firm',
  },
];
