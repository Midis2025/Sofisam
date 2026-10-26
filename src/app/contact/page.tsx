import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';

import { ContactForm } from '@/components/sections/ContactForm';
import { Newsletter } from '@/components/sections/Newsletter';
import { Reveal, MaskedLines } from '@/components/animations/Reveal';
import { contact, contactCopy, site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact SOFISAM FZCO. Reach out to discuss strategic opportunities or advisory requirements. DMCC Business Centre, Jumeirah Lake Towers, Dubai.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | SOFISAM FZCO',
    description: 'Reach out to discuss strategic opportunities or advisory requirements.',
    url: '/contact',
  },
};

const mapQuery = encodeURIComponent(`${contact.address.line1}, ${contact.address.line2}`);

export default function ContactPage() {
  return (
    <>
      {/* The enquiry. The statement and the direct lines on the ivory page,
          the form on a white sheet beside them — nothing behind either. */}
      <section data-section="Get in Touch" className="ground-void relative overflow-hidden" aria-labelledby="contact-heading">
        <div className="shell relative z-10 pb-[var(--pad)] pt-[calc(var(--header-h)+clamp(2.5rem,7vh,5rem))]">
          <div className="grid gap-[var(--gap)] lg:grid-cols-12 lg:gap-[clamp(3rem,5vw,6rem)]">
            {/* Statement and details */}
            <div className="lg:col-span-5">
              <Reveal kind="label" className="kicker">
                <p className="t-label">{contactCopy.eyebrow}</p>
              </Reveal>

              <h1
                id="contact-heading"
                className="t-display mt-[clamp(1.25rem,2.6vw,2rem)] max-w-[11ch] text-ivory"
              >
                <MaskedLines lines={['Start a', 'conversation.']} />
              </h1>

              <Reveal delay={0.14}>
                <p className="t-lead mt-[clamp(1.25rem,2.2vw,2rem)] max-w-[42ch] text-sage">
                  {contactCopy.standfirst}
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-[clamp(2.25rem,4vw,3.5rem)]">
                  <h2 className="t-label text-sage">{contactCopy.detailsHeading}</h2>

                  <ul className="mt-7 space-y-6">
                    <li>
                      <a href={`mailto:${contact.email}`} className="group flex items-center gap-5">
                        <Badge>
                          <Mail aria-hidden strokeWidth={1.4} className="h-[1.05rem] w-[1.05rem]" />
                        </Badge>
                        <span className="link-underline text-[1.0625rem] font-light tracking-wide text-ivory-2">
                          {contact.email}
                        </span>
                      </a>
                    </li>

                    <li>
                      <a href={`tel:${contact.phoneHref}`} className="group flex items-center gap-5">
                        <Badge>
                          <Phone aria-hidden strokeWidth={1.4} className="h-[1.05rem] w-[1.05rem]" />
                        </Badge>
                        <span className="link-underline text-[1.0625rem] font-light tracking-wide text-ivory-2">
                          {contact.phone}
                        </span>
                      </a>
                    </li>

                    <li className="flex items-start gap-5">
                      <Badge static>
                        <MapPin aria-hidden strokeWidth={1.4} className="h-[1.05rem] w-[1.05rem]" />
                      </Badge>
                      <address className="not-italic">
                        <p className="text-[1.0625rem] font-light leading-relaxed tracking-wide text-ivory-2">
                          {contact.address.line1}
                          <br />
                          {contact.address.line2}
                        </p>
                      </address>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* The form */}
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal kind="card" delay={0.1}>
                <div className="surface-deep px-[clamp(1.25rem,3vw,3rem)] py-[clamp(2rem,3.6vw,3.25rem)]">
                  <h2 className="t-h3 text-ivory">Send a message</h2>
                  <p className="t-body mt-3 max-w-[42ch] text-sage">
                    Tell us briefly what you are working through and we will respond
                    directly.
                  </p>

                  <span aria-hidden className="rule my-[clamp(1.75rem,3vw,2.5rem)]" />

                  <ContactForm />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section data-section="Location" className="section ground-char" aria-labelledby="location-heading">
        <div className="shell">
          <div className="head">
            <div>
              <Reveal kind="label" className="kicker">
                <p className="t-label">Location</p>
              </Reveal>
              <h2
                id="location-heading"
                className="t-h2 head-title mt-[clamp(1.25rem,2.6vw,2rem)] text-ivory"
              >
                <MaskedLines lines={['World headquarters,', 'Jumeirah Lake Towers.']} />
              </h2>
            </div>
            <div className="lg:pb-2">
              <Reveal delay={0.1}>
                <p className="t-body head-note text-sage">
                  {site.name} is based in the {contact.headquarters}. Visits are by
                  arrangement.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-[var(--pad-sm)] grid gap-[var(--gap)] lg:grid-cols-12 lg:gap-[clamp(2.5rem,4vw,4.5rem)]">
            {/* Map */}
            <Reveal className="lg:col-span-8">
              <div className="media aspect-[16/10] w-full border border-[var(--line)] lg:aspect-[16/9]">
                {/* What shows until the map arrives — or instead of it, where a
                    browser or network blocks the embed. */}
                <div aria-hidden className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-graphite p-6 text-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-brass shadow-[0_0_0_6px_rgb(var(--brass-rgb)/0.18)]" />
                  <p className="t-label text-gold">{contact.headquarters}</p>
                  <p className="t-small max-w-[34ch] text-sage">
                    {contact.address.line1}, {contact.address.line2}
                  </p>
                </div>
                <iframe
                  title={`Map showing ${contact.address.line1}, ${contact.address.line2}`}
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="relative h-full w-full border-0 grayscale-[0.4] contrast-[1.05]"
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
                    <div key={row.k} className="row py-5 last:border-b last:border-[var(--line)]">
                      <dt className="t-label text-sage">{row.k}</dt>
                      <dd className="mt-3 whitespace-pre-line text-[0.98rem] leading-relaxed text-ivory-2">
                        {row.href ? (
                          <a
                            href={row.href}
                            className="link-underline inline-block py-1.5 hover:text-gold"
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
                  className="cta mt-6 text-sage hover:text-ivory"
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

/** The circular mark that carries a contact icon. */
function Badge({ children, static: isStatic }: { children: React.ReactNode; static?: boolean }) {
  return (
    <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--g-line)] bg-[var(--g-bg)] text-gold shadow-[var(--control-shadow)] backdrop-blur-md ${
        isStatic
          ? ''
          : 'transition-colors duration-500 ease-premium group-hover:border-gold group-hover:bg-gold group-hover:text-ink'
      }`}
    >
      {children}
    </span>
  );
}
