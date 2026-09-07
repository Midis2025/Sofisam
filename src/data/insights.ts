/**
 * Insights.
 *
 * Titles, publication dates and standfirsts are preserved verbatim from
 * https://sofisam.com/. Full article bodies did not exist on the source site;
 * the editorial copy below is general professional commentary and deliberately
 * makes no claim about SOFISAM's clients, mandates, holdings, track record,
 * regulatory permissions or relationships.
 */

export interface Insight {
  slug: string;
  title: string;
  /** Verbatim summary from the source website. */
  summary: string;
  /** Verbatim display date from the source website. */
  date: string;
  /** ISO date for machine readability, derived from the displayed date. */
  isoDate: string;
  category: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  focal?: string;
  standfirst: string;
  body: { heading?: string; paragraphs: string[] }[];
  pullQuote?: string;
}

export const insights: Insight[] = [
  {
    slug: 'global-market-shifts-2026-outlook',
    title: 'Global Market Shifts: 2026 Outlook',
    summary:
      'An analysis of emerging economic trends and adapting to the changing global landscape.',
    date: 'Jan 15 2026',
    isoDate: '2026-01-15',
    category: 'Global Markets',
    readingTime: '6 min read',
    image: 'city-mono',
    imageAlt:
      'Monochrome aerial view of a dense metropolitan skyline seen from directly above',
    focal: '50% 40%',
    standfirst:
      'An analysis of emerging economic trends and adapting to the changing global landscape.',
    pullQuote:
      'The question is no longer where growth is fastest, but where it is most durable once the conditions producing it change.',
    body: [
      {
        paragraphs: [
          'For most of the past two decades, international allocation could be reasoned about as a single system with regional variations. Capital moved toward returns, and the frictions that stood in its way were largely technical. That description has become less useful. The variations are now structural, and they are widening.',
          'What has changed is not the direction of globalisation so much as its shape. Trade has not contracted; it has rerouted. Supply chains have not shortened so much as they have acquired redundancy, and redundancy is expensive. Firms that once optimised for cost now optimise for the ability to continue operating under conditions they cannot control. That is a different objective function, and it produces different balance sheets.',
        ],
      },
      {
        heading: 'Divergence as the base case',
        paragraphs: [
          'Monetary policy, industrial policy and regulatory posture are no longer moving in step across major economies. For an internationally exposed business, this has a practical consequence: assumptions that once travelled across borders no longer do. A cost of capital, a permitting timeline, a tax treatment — each of these now needs to be understood locally rather than inferred from a global average.',
          'Divergence rewards specificity. Groups that treat each jurisdiction as a distinct set of conditions tend to find that their models hold. Groups that treat jurisdictions as interchangeable tend to discover the difference late, and usually at cost.',
        ],
      },
      {
        heading: 'Capital with a longer horizon',
        paragraphs: [
          'A noticeable share of international capital has shifted toward owners who are not obliged to exit on a schedule — family holdings, sovereign-linked vehicles, and privately held groups with generational objectives. This changes the character of the counterparties in a transaction. Patient capital negotiates differently, holds differently, and tolerates a different distribution of outcomes.',
          'For an operating business seeking partners, it also changes what is being sold. A buyer with a ten-year horizon is not primarily purchasing next year\'s earnings; they are purchasing the credibility of the position that produces them. Preparation for that conversation looks quite different from preparation for an auction.',
        ],
      },
      {
        heading: 'The premium on optionality',
        paragraphs: [
          'Where the range of plausible outcomes has widened, the value of remaining able to change course has risen with it. This is visible in how contracts are being written, how balance sheets are being carried, and how ownership structures are being arranged — with more attention to what can be undone, and at what price.',
          'Optionality is not free. Holding it costs return, and the discipline lies in deciding which flexibility is worth paying for. The decision is a judgement about which uncertainties actually bear on the position and which are simply present.',
        ],
      },
      {
        heading: 'What this asks of decision-makers',
        paragraphs: [
          'The practical implication is that international strategy is becoming less about locating growth and more about understanding durability. Growth rates are widely published. The conditions that sustain them are not, and they are where the analysis has to go.',
          'That work is unglamorous. It involves establishing which relationships are load-bearing, which approvals are genuinely discretionary, and which parts of a plan depend on conditions that a counterparty controls. It rarely produces a clean answer. It does produce decisions that survive contact with the environment they were made for.',
        ],
      },
    ],
  },
  {
    slug: 'family-office-structuring',
    title: 'Family Office Structuring',
    summary:
      'Best practices for governance, wealth preservation, and generational transfer.',
    date: 'Dec 10 2025',
    isoDate: '2025-12-10',
    category: 'Structuring',
    readingTime: '7 min read',
    image: 'lattice-white',
    imageAlt:
      'Detail of a pale architectural lattice screen forming a precise repeating geometric pattern',
    focal: '50% 50%',
    standfirst:
      'Best practices for governance, wealth preservation, and generational transfer.',
    pullQuote:
      'A structure that only works while everyone agrees is not a structure. It is an arrangement waiting for a disagreement.',
    body: [
      {
        paragraphs: [
          'Family offices are frequently described in terms of what they hold. They are better understood in terms of what they decide, and how those decisions are made when the people making them do not agree. Assets can be listed. Decision rights have to be designed.',
          'Most structures are established at a moment of alignment — a liquidity event, a succession, a consolidation of holdings. Alignment at inception is precisely why the harder questions get deferred. The structure is tested later, under conditions nobody was thinking about when it was drafted.',
        ],
      },
      {
        heading: 'Governance before instruments',
        paragraphs: [
          'The instinct is to begin with vehicles: which entity, which jurisdiction, which trust or holding arrangement. That sequence puts form ahead of intent. The more durable order is to settle governance first — who decides, within what limits, accountable to whom — and then select the instruments capable of expressing it.',
          'Governance in this context is not ceremony. It is the answer to a small number of concrete questions. Who can commit capital, and up to what size? What requires unanimity, and what does not? How is a deadlock resolved without recourse to litigation? Who is entitled to information, and how often? Structures that answer these plainly tend to hold. Structures that leave them to good faith tend to convert disagreement into damage.',
        ],
      },
      {
        heading: 'Preservation is an active discipline',
        paragraphs: [
          'Wealth preservation is often treated as a conservative allocation stance. In practice, the larger risks to a multi-generational holding are rarely market risks. They are concentration that nobody re-examined, illiquidity that nobody priced, key-person dependency that nobody documented, and governance that nobody stress-tested.',
          'Reviewing these on a schedule — rather than when something forces the issue — is among the least exciting and most consequential habits a family holding can adopt. The review does not need to produce change. It needs to produce awareness of what has quietly drifted.',
        ],
      },
      {
        heading: 'Generational transfer as a process',
        paragraphs: [
          'Transfer is commonly framed as an event: a date, a document, a change of control. Treated that way, it concentrates all of the risk at a single point. Treated as a process, responsibility moves in stages, and the people receiving it accumulate judgement while the people transferring it are still available to be consulted.',
          'This has an unromantic requirement. The next generation has to be given decisions with real consequences, early enough that the mistakes are survivable. Structures can facilitate that — graduated authority, defined observer roles, allocations with genuine discretion — but they cannot substitute for it.',
        ],
      },
      {
        heading: 'Clarity as a design objective',
        paragraphs: [
          'The most reliable test of a family structure is whether every party can describe, without assistance, what they own, what they control, and what happens on the events that matter — death, incapacity, exit, dispute. If that description varies between family members, the structure is carrying an unrecognised liability.',
          'Complexity is sometimes unavoidable. Opacity almost never is. Where the two are confused, the cost is usually paid by whoever inherits the arrangement rather than whoever designed it.',
        ],
      },
    ],
  },
  {
    slug: 'corporate-advisory-in-dubai',
    title: 'Corporate Advisory in Dubai',
    summary:
      'Why Dubai represents a pivotal hub for international strategic consulting.',
    date: 'Nov 28 2025',
    isoDate: '2025-11-28',
    category: 'Perspective',
    readingTime: '5 min read',
    image: 'difc-gate',
    imageAlt:
      "Dubai's financial district gate building illuminated at dusk, framed by surrounding towers",
    focal: '50% 45%',
    standfirst:
      'Why Dubai represents a pivotal hub for international strategic consulting.',
    pullQuote:
      'Position on a map is an accident of geography. Position in a network is a matter of what a place has been built to do.',
    body: [
      {
        paragraphs: [
          'Dubai is routinely explained by its location — the point at which the working day overlaps with Asia in the morning and with Europe and the Americas in the afternoon. The observation is accurate and, on its own, insufficient. Several cities sit on that meridian. Few function the way this one does.',
          'What distinguishes the city is less its coordinates than its accumulated function: the density of counterparties who are physically present, the range of jurisdictions represented within a short radius, and the ordinary expectation that a cross-border conversation can be held in person, at short notice, without either party travelling far.',
        ],
      },
      {
        heading: 'Proximity as infrastructure',
        paragraphs: [
          'International advisory work is relationship work before it is analytical work. The analysis matters, but it is commissioned, tested and acted upon through people who know one another. Proximity compresses that cycle. A question that would take a fortnight to resolve across time zones can be settled over a morning.',
          'The free zones have made this concentration deliberate rather than incidental. The Dubai Multi Commodities Centre, where our own world headquarters sits, is among the clearest expressions of that design — a dense cluster of internationally oriented businesses operating within a defined and well-understood framework.',
        ],
      },
      {
        heading: 'A meeting point for different kinds of capital',
        paragraphs: [
          'The composition of capital present in the city is unusual. Family holdings from across the Gulf and South Asia, institutional money from Europe and North America, and operating groups from Africa and Central Asia are all represented, frequently within the same building. Each brings a different horizon, a different tolerance for illiquidity and a different view of what constitutes an acceptable structure.',
          'For an adviser, this is instructive rather than merely convenient. Working across those expectations sharpens the ability to anticipate how a proposal will be read by a counterparty whose assumptions were formed elsewhere.',
        ],
      },
      {
        heading: 'Discretion and the value of a settled base',
        paragraphs: [
          'Sensitive work requires an environment where confidentiality is a normal professional expectation rather than an unusual request. A settled operating base contributes something else as well: continuity. Relationships that span the globe are maintained over years, and they are easier to maintain from somewhere that international counterparties already visit.',
          'That combination — position, density, discretion and continuity — is what makes the city a practical centre for international strategic consulting rather than simply a convenient one.',
        ],
      },
    ],
  },
];

export const insightBySlug = (slug: string) =>
  insights.find((i) => i.slug === slug);

export const featuredInsight = insights[0];
export const secondaryInsights = insights.slice(1);
