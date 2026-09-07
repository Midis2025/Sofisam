/**
 * SOFISAM FZCO — verified company data.
 *
 * Every value in this file is taken directly from the live source of truth
 * (https://sofisam.com/). Nothing here is inferred or invented. If a fact is
 * not present on the source site, it does not belong in this file.
 */

export const site = {
  name: 'SOFISAM FZCO',
  shortName: 'SOFISAM',
  url: 'https://www.sofisam.com',
  title: 'SOFISAM FZCO | International Strategic Consulting',
  description:
    'International Strategic Consulting, Advisory and Structuring Firm based in Dubai.',
  tagline: 'International Strategic Consulting',
  positioning:
    'International Strategic Consulting, Advisory and Structuring Firm.',
  founded: null,
} as const;

export const contact = {
  email: 'info@sofisam.com',
  phone: '+971 50 388 5475',
  phoneHref: '+971503885475',
  address: {
    line1: 'DMCC Business Centre, Jewellery & Gemplex 3',
    line2: 'Jumeirah Lake Towers, Dubai 500001, UAE',
    locality: 'Dubai',
    region: 'Dubai',
    postalCode: '500001',
    country: 'AE',
    countryName: 'United Arab Emirates',
  },
  /** Verified free-zone location statement used across the source site. */
  headquarters: 'Dubai Multi Commodities Centre',
} as const;

export const copyright = `SOFISAM FZCO. All rights reserved.`;

/**
 * Hero and welcome copy — preserved verbatim from the source website.
 */
export const heroCopy = {
  eyebrow: 'International Strategic Consulting',
  headline: ['A Global Corporate', 'Advisory Platform'],
  statement:
    'Providing confidential, unconflicted, and strategic advice built over decades of international business experience.',
  primaryCta: { label: 'Contact Us', href: '/contact' },
  secondaryCta: { label: 'Our Expertise', href: '/services' },
} as const;

export const welcomeCopy = {
  eyebrow: 'Welcome to SOFISAM',
  positioning:
    'International Strategic Consulting, Advisory and Structuring Firm.',
  paragraphs: [
    'From our world headquarters in the Dubai Multi Commodities Centre, our relationships and partnerships span the globe.',
    'We provide confidential, unconflicted and strategic advice, built over decades of international business experience.',
    'Our principals are highly successful business executives and investors that bring unique perspectives to all of our mandates and investments.',
  ],
} as const;

export const servicesIntro = {
  eyebrow: 'Services',
  heading: 'Our Expertise',
  standfirst:
    'Comprehensive strategic solutions tailored to complex global markets and corporate governance needs.',
} as const;

export const insightsIntro = {
  eyebrow: 'Latest Updates',
  heading: 'Insights',
  standfirst:
    'Perspectives on global markets, corporate governance, and strategic investment structuring.',
} as const;

export const newsletterCopy = {
  heading: 'Stay Informed',
  standfirst:
    'Subscribe to receive the latest insights, updates, and strategic perspectives from Sofisam.',
  fieldLabel: 'Email Address',
  submitLabel: 'Subscribe',
  privacyNote: 'We respect your privacy. Unsubscribe at any time.',
} as const;

export const contactCopy = {
  eyebrow: 'Get in Touch',
  heading: 'Contact',
  standfirst:
    'Reach out to discuss strategic opportunities or advisory requirements.',
  detailsHeading: 'Contact Details',
  submitLabel: 'Send Message',
} as const;

export const footerCopy = {
  statement: 'International Strategic Consulting, Advisory and Structuring Firm.',
  location: 'Based in the Dubai Multi Commodities Centre.',
  contactHeading: 'Contact Us',
} as const;
