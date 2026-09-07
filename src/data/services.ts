/**
 * Service definitions.
 *
 * `title`, `sourceSummary` and the ordering are preserved verbatim from
 * https://sofisam.com/. Supporting editorial copy expands on the firm's stated
 * positioning without asserting facts, credentials, mandates, regulated
 * activities or relationships that the source site does not state.
 */

export type ServiceSlug = 'strategic-consulting' | 'advisory' | 'structuring';

export interface Service {
  slug: ServiceSlug;
  index: string;
  title: string;
  /** Verbatim card copy from the source website. */
  sourceSummary: string;
  /** Short label used in navigation and mega-menu. */
  navDescription: string;
  hero: {
    eyebrow: string;
    headline: string;
    standfirst: string;
    image: string;
    imageAlt: string;
    focal?: string;
  };
  intro: {
    lead: string;
    body: string[];
  };
  themes: { label: string; title: string; body: string }[];
  metaTitle: string;
  metaDescription: string;
}

export const services: Service[] = [
  {
    slug: 'strategic-consulting',
    index: '01',
    title: 'Strategic Consulting',
    sourceSummary:
      'Providing confidential, unconflicted strategic advice to navigate complex global markets and make critical business decisions.',
    navDescription: 'Confidential, unconflicted advice on critical decisions',
    hero: {
      eyebrow: 'Service 01',
      headline: 'Judgement applied to consequential decisions.',
      standfirst:
        'Providing confidential, unconflicted strategic advice to navigate complex global markets and make critical business decisions.',
      image: 'city-blue-night',
      imageAlt:
        'Aerial view of a dense international city at night, its financial district lit against the dark',
      focal: '50% 55%',
    },
    intro: {
      lead: 'Most consequential decisions are not made with complete information. They are made with partial evidence, competing interests and a finite window in which to act.',
      body: [
        'Our consulting work begins where the analysis usually stops — at the point a board or a principal has to commit. We work through the position with the people who carry the decision, not around them, and we say what we think.',
        'Independence is the reason the advice is worth having. We hold no product to place and no side to favour, so a recommendation reflects the merits of the situation rather than the interests of the adviser giving it.',
      ],
    },
    themes: [
      {
        label: 'Perspective',
        title: 'Reading a market before acting in it',
        body: 'Markets rarely behave uniformly across jurisdictions. We frame the commercial, political and structural conditions that will actually govern an outcome, and separate them from the noise that surrounds them.',
      },
      {
        label: 'Decision support',
        title: 'Working the decision, not the deck',
        body: 'Options are set out with their consequences attached: what has to be true, what the downside costs, and what becomes difficult to reverse. The purpose is a decision that holds up under pressure.',
      },
      {
        label: 'Confidentiality',
        title: 'Discretion as a working condition',
        body: 'Sensitive positions require a small, closed circle. Engagements are handled with a discretion appropriate to the matter, and by the principals who took it on.',
      },
      {
        label: 'Global outlook',
        title: 'Relationships that span the globe',
        body: 'From our world headquarters in the Dubai Multi Commodities Centre, our relationships and partnerships span the globe — a perspective that informs how we read opportunity across borders.',
      },
    ],
    metaTitle: 'Strategic Consulting | SOFISAM FZCO',
    metaDescription:
      'Confidential, unconflicted strategic advice to navigate complex global markets and make critical business decisions. SOFISAM FZCO, Dubai.',
  },
  {
    slug: 'advisory',
    index: '02',
    title: 'Advisory',
    sourceSummary:
      'Leveraging decades of international business experience to guide executive decision-making and corporate governance.',
    navDescription: 'Executive decision-making and corporate governance',
    hero: {
      eyebrow: 'Service 02',
      headline: 'Counsel formed in the room where decisions are taken.',
      standfirst:
        'Leveraging decades of international business experience to guide executive decision-making and corporate governance.',
      image: 'tower-dusk',
      imageAlt:
        'Corporate tower facade at dusk with warmly lit interiors visible behind a vertical fin curtain wall',
      focal: '50% 45%',
    },
    intro: {
      lead: 'Experience is only useful when it has been earned in comparable conditions. Our principals are highly successful business executives and investors, and the advisory work reflects that vantage point.',
      body: [
        'The questions we are brought into tend to be the ones that cannot be delegated: what a leadership team should do next, how a board should hold a position, where governance is carrying more weight than it can bear.',
        'We work alongside executives rather than in parallel to them. That means engaging with the constraints as they actually exist — timing, ownership, relationships, appetite — rather than the version that appears in a paper.',
      ],
    },
    themes: [
      {
        label: 'Executive decision-making',
        title: 'Support at the point of commitment',
        body: 'We help leadership teams frame the decision properly, test the reasoning behind it, and understand what the organisation will have to live with once it is taken.',
      },
      {
        label: 'Corporate governance',
        title: 'Structure that carries the load',
        body: 'Governance is a working system, not a document. We consider how authority, oversight and accountability are distributed, and whether that distribution matches the scale of what is being decided.',
      },
      {
        label: 'Experience',
        title: 'Decades of international business',
        body: 'Our advice is built over decades of international business experience — across markets, ownership structures and cycles that behave differently from one another.',
      },
      {
        label: 'Perspective',
        title: 'The view of an owner',
        body: 'Our principals bring unique perspectives to all of our mandates and investments. Where capital is at stake, that perspective changes the questions worth asking.',
      },
    ],
    metaTitle: 'Advisory | SOFISAM FZCO',
    metaDescription:
      'Advisory built on decades of international business experience, guiding executive decision-making and corporate governance. SOFISAM FZCO, Dubai.',
  },
  {
    slug: 'structuring',
    index: '03',
    title: 'Structuring',
    sourceSummary:
      'Expert structuring for mandates and investments, built on successful executive perspectives and proven frameworks.',
    navDescription: 'Frameworks for mandates and investments',
    hero: {
      eyebrow: 'Service 03',
      headline: 'Form determines what a structure can withstand.',
      standfirst:
        'Expert structuring for mandates and investments, built on successful executive perspectives and proven frameworks.',
      image: 'structure-grid',
      imageAlt:
        'Dark modular architectural facade composed of a precise repeating grid of panels',
      focal: '50% 50%',
    },
    intro: {
      lead: 'A structure is a set of decisions made in advance. It settles who holds what, who decides what, and what happens when circumstances change.',
      body: [
        'We approach structuring the way an architect approaches load: establish the intent, understand the forces acting on it, and design something that behaves predictably under each of them.',
        'The frameworks we work from are proven ones, adapted rather than reinvented. Novelty in a structure is rarely a virtue — clarity, durability and the ability to explain it plainly to every party usually are.',
      ],
    },
    themes: [
      {
        label: 'Approach',
        title: 'Intent before instrument',
        body: 'We begin with what the arrangement is meant to achieve and for whom, and only then consider the form it should take. The reverse order produces structures that outlive their purpose.',
      },
      {
        label: 'Mandates',
        title: 'Terms that hold at the edges',
        body: 'Mandates are shaped so that scope, authority and accountability remain legible when conditions move away from the base case. The edge cases are where structures are actually tested.',
      },
      {
        label: 'Investments',
        title: 'Structuring for investments',
        body: 'Expert structuring for mandates and investments, built on successful executive perspectives — the perspective of people who have held positions rather than only advised on them.',
      },
      {
        label: 'Framework thinking',
        title: 'Proven frameworks, precisely fitted',
        body: 'Established frameworks carry the weight of everything that has already been tested against them. We fit them to the situation rather than fitting the situation to them.',
      },
    ],
    metaTitle: 'Structuring | SOFISAM FZCO',
    metaDescription:
      'Expert structuring for mandates and investments, built on successful executive perspectives and proven frameworks. SOFISAM FZCO, Dubai.',
  },
];

export const serviceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);
