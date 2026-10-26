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

const [, advisory, structuring] = services;

/*
 * MANDATES & INVESTMENTS — four frames.
 *
 * Every line below is copy the site already carries on the Advisory and
 * Structuring pages, which is the whole of what SOFISAM says about its
 * mandates and investments. No client, transaction, asset, figure or result is
 * named, because the source site names none.
 *
 * Each frame has a photograph that appears nowhere else on the homepage:
 * institutional architecture, the table where terms are set, the room where a
 * principal decides, and a structural lattice for the frameworks.
 */
const ownerView = advisory.themes.find((t) => t.title === 'The view of an owner') ?? advisory.themes[3];
const [, mandates, investments, frameworks] = structuring.themes;

export const workScenes: WorkScene[] = [
  {
    k: '01',
    category: ownerView.label,
    title: ownerView.title + '.',
    body: ownerView.body,
    /* A colonnade: capital as an institution rather than as a chart. */
    image: 'capital-columns',
    focal: '50% 50%',
    href: '/services/advisory',
    cta: 'Explore Advisory',
  },
  {
    k: '02',
    category: mandates.label,
    title: mandates.title + '.',
    body: mandates.body,
    /* The table before the meeting: folders set, terms waiting. */
    image: 'boardroom-folders',
    focal: '50% 62%',
    href: `/services/${structuring.slug}`,
    cta: 'Explore Structuring',
  },
  {
    k: '03',
    category: investments.label,
    title: investments.title + '.',
    body: investments.body,
    /* An empty boardroom, low and close: where a principal decides. */
    image: 'boardroom-leather',
    focal: '40% 55%',
    href: `/services/${structuring.slug}`,
    cta: 'Explore Structuring',
  },
  {
    k: '04',
    category: frameworks.label,
    title: frameworks.title + '.',
    body: frameworks.body,
    /* A structural lattice: form deciding what the building can carry. */
    image: 'gold-lattice',
    focal: '52% 50%',
    href: `/services/${structuring.slug}`,
    cta: 'Explore Structuring',
  },
];
