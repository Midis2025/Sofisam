import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';

import { Picture } from '@/components/ui/Picture';
import { ContactForm } from '@/components/sections/ContactForm';
import { Newsletter } from '@/components/sections/Newsletter';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';
import { contact, contactCopy, site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact SOFISAM FZCO. Reach out to discuss strategic opportunities or advisory requirements. DMCC Business Centre, Jumeirah Lake Towers, Dubai.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | SOFISAM FZCO',
    description:
      'Reach out to discuss strategic opportunities or advisory requirements.',
    url: '/contact',
  },
};

const mapQuery = encodeURIComponent(
  `${contact.address.line1}, ${contact.address.line2}`,
);

export default function ContactPage() {
  return (
    <>
      {/* Statement and form. The ground stays dark here because the fixed
          header sits over it before any scroll. */}
      <section className="rd-dark relative" aria-labelledby="contact-heading">
        <div className="rd-shell below-header pb-[var(--rd-pad)]">
          <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:gap-[clamp(2.5rem,4.5vw,5rem)]">
            {/* Information — roughly 40% */}
            <div className="lg:col-span-5">
              <Reveal kind="label" className="rd-kicker">
                <p className="rd-label">{contactCopy.eyebrow}</p>
              </Reveal>

              <h1
                id="contact-heading"
                className="rd-display mt-[clamp(1.25rem,2.6vw,2rem)] max-w-[11ch] text-bone"
              >
                <MaskedLines lines={['Start a', 'conversation.']} />
              </h1>

              <Reveal delay={0.14}>
                <p className="rd-lead mt-[clamp(1.25rem,2.2vw,1.75rem)] max-w-[42ch] text-bone/70">
                  {contactCopy.standfirst}
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-[clamp(2rem,3.4vw,3rem)]">
                  <h2 className="rd-label text-[var(--rd-sage)]">
                    {contactCopy.detailsHeading}
                  </h2>

                  <ul className="mt-6 space-y-5">
                    <li>
                      <a
                        href={`mailto:${contact.email}`}
                        className="group flex items-center gap-5"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bone/15 bg-bone/5 text-[var(--rd-accent)] transition-colors duration-500 ease-premium group-hover:border-[var(--rd-accent)] group-hover:bg-[var(--rd-accent)] group-hover:text-[var(--rd-ink)]">
                          <Mail aria-hidden strokeWidth={1.4} className="h-[1.05rem] w-[1.05rem]" />
                        </span>
                        <span className="link-underline text-[1.0625rem] font-light tracking-wide text-bone/85">
                          {contact.email}
                        </span>
                      </a>
                    </li>

                    <li>
                      <a
                        href={`tel:${contact.phoneHref}`}
                        className="group flex items-center gap-5"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bone/15 bg-bone/5 text-[var(--rd-accent)] transition-colors duration-500 ease-premium group-hover:border-[var(--rd-accent)] group-hover:bg-[var(--rd-accent)] group-hover:text-[var(--rd-ink)]">
                          <Phone aria-hidden strokeWidth={1.4} className="h-[1.05rem] w-[1.05rem]" />
                        </span>
                        <span className="link-underline text-[1.0625rem] font-light tracking-wide text-bone/85">
                          {contact.phone}
                        </span>
                      </a>
                    </li>

                    <li className="flex items-start gap-5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bone/15 bg-bone/5 text-[var(--rd-accent)]">
                        <MapPin aria-hidden strokeWidth={1.4} className="h-[1.05rem] w-[1.05rem]" />
                      </span>
                      <address className="not-italic">
                        <p className="text-[1.0625rem] font-light leading-relaxed tracking-wide text-bone/85">
                          {contact.address.line1}
                          <br />
                          {contact.address.line2}
                        </p>
                      </address>
                    </li>
                  </ul>
                </div>
              </Reveal>

              <ImageReveal delay={0.12} className="mt-[clamp(2rem,3.4vw,3rem)]">
                <div className="rd-media aspect-[16/10] w-full lg:aspect-[4/3]">
                  <Picture
                    name="difc-gate"
                    alt="Dubai's financial district gate building illuminated at dusk"
                    sizes="(min-width:1024px) 40vw, 100vw"
                    focal="50% 45%"
                    className="h-full w-full"
                  />
                </div>
              </ImageReveal>
            </div>

            {/* Form — roughly 60% */}
            <div className="lg:col-span-7">
              <Reveal>
                <div className="rd-tile-dark border border-bone/10 bg-[var(--rd-umber-2)] px-[clamp(1.25rem,3vw,3rem)] py-[clamp(2rem,3.6vw,3.25rem)]">
                  <h2 className="rd-h3 text-bone">Send a message</h2>
                  <p className="rd-body mt-3 max-w-[40ch] text-[var(--rd-sage)]">
                    Tell us briefly what you are working through and we will
                    respond directly.
                  </p>

                  <span aria-hidden className="rd-rule-inv my-[clamp(1.75rem,3vw,2.5rem)]" />

                  <ContactForm />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="rd-section rd-paper" aria-labelledby="location-heading">
        <div className="rd-shell">
          <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal kind="label" className="rd-kicker">
                <p className="rd-label">Location</p>
              </Reveal>
              <h2
                id="location-heading"
                className="rd-h2 mt-[clamp(1.25rem,2.6vw,2rem)] max-w-[15ch] text-[var(--rd-ink)]"
              >
                <MaskedLines lines={['World headquarters,', 'Jumeirah Lake Towers.']} />
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:pb-2">
              <Reveal delay={0.1}>
                <p className="rd-body max-w-[40ch] text-[var(--rd-stone)]">
                  {site.name} is based in the {contact.headquarters}. Visits are
                  by arrangement.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-[var(--rd-pad-sm)] grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:gap-[clamp(2.5rem,4vw,4.5rem)]">
            {/* Map */}
            <Reveal className="lg:col-span-8">
              <div className="rd-media aspect-[16/10] w-full border border-[var(--rd-line)] lg:aspect-[16/9]">
                <iframe
                  title={`Map showing ${contact.address.line1}, ${contact.address.line2}`}
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0 grayscale-[0.35] contrast-[1.05]"
                />
              </div>
            </Reveal>

            {/* Details */}
            <div className="lg:col-span-4">
              <Reveal>
                <dl>
                  {[
                    { k: 'Address', v: `${contact.address.line1}\n${contact.address.line2}` },
                    { k: 'Free zone', v: contact.headquarters },
                    { k: 'Email', v: contact.email, href: `mailto:${contact.email}` },
                    { k: 'Telephone', v: contact.phone, href: `tel:${contact.phoneHref}` },
                  ].map((row) => (
                    <div key={row.k} className="rd-row py-5 last:border-b last:border-[var(--rd-line)]">
                      <dt className="rd-label text-[var(--rd-stone)]">{row.k}</dt>
                      <dd className="mt-3 whitespace-pre-line text-[0.98rem] font-light leading-relaxed text-[var(--rd-ink)]/80">
                        {row.href ? (
                          <a
                            href={row.href}
                            className="link-underline inline-block py-1.5 hover:text-[var(--rd-accent-deep)]"
                          >
                            {row.v}
                          </a>
                        ) : (
                          row.v
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={0.12}>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rd-cta mt-6 text-[var(--rd-stone)] hover:text-[var(--rd-ink)]"
                >
                  <span className="link-underline">Open in Google Maps</span>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
