import type { Metadata } from 'next';
import { Mail, MapPin, Phone, ShieldCheck, Clock, Building2 } from 'lucide-react';

import { ContactForm } from '@/components/sections/ContactForm';
import { Newsletter } from '@/components/sections/Newsletter';
import { Button } from '@/components/ui/Button';
import { Reveal, MaskedLines } from '@/components/animations/Reveal';
import { contact, contactCopy, site } from '@/data/site';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'Contact & Mandates',
  description:
    'Contact SOFISAM FZCO. Reach out to discuss strategic opportunities, restructuring, or advisory requirements. DMCC Business Centre, Jumeirah Lake Towers, Dubai.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact & Mandates | SOFISAM FZCO',
    description: 'Reach out to discuss strategic opportunities or advisory requirements.',
    url: '/contact',
  },
};

const mapQuery = encodeURIComponent(`${contact.address.line1}, ${contact.address.line2}`);

export default function ContactPage() {
  return (
    <>
      {/* 01 — Direct Enquiry Spread */}
      <section data-section="Get in Touch" className="ground-void relative overflow-hidden" aria-labelledby="contact-heading">
        <div className="shell relative z-10 pb-[var(--pad)] pt-[calc(var(--header-h)+clamp(2.5rem,7vh,5rem))]">
          <div className="grid gap-[var(--gap)] lg:grid-cols-12 lg:gap-16 items-start">
            {/* Left Column: Statement & Channels */}
            <div className="lg:col-span-5">
              <div className="kicker">
                <p className="t-label">{contactCopy.eyebrow}</p>
              </div>

              <h1
                id="contact-heading"
                className="t-h1 mt-eyebrow text-[var(--ivory)] font-light leading-[1.06]"
              >
                <MaskedLines lines={['Start a confidential', 'conversation.']} />
              </h1>

              <Reveal delay={0.14}>
                <p className="t-lead mt-6 text-[var(--sage)] leading-relaxed max-w-[44ch]">
                  {contactCopy.standfirst}
                </p>
              </Reveal>

              <div className="mt-10 space-y-4">
                {/* Direct Email Card */}
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-start gap-4 p-5 rounded-[var(--r-md)] border border-[var(--line)] bg-[var(--plate)] transition-all duration-300 hover:border-[var(--brass)] hover:shadow-[var(--shadow-pill)]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--line-soft)] text-[var(--brass)] group-hover:bg-[var(--brass)] group-hover:text-white transition-colors">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="text-[0.6875rem] uppercase tracking-wider text-[var(--stone)] font-mono font-medium">
                      Confidential Inquiries
                    </span>
                    <p className="text-sm font-medium text-[var(--ivory)] mt-0.5 group-hover:text-[var(--gold)] transition-colors">
                      {contact.email}
                    </p>
                  </div>
                </a>

                {/* Direct Phone Card */}
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="group flex items-start gap-4 p-5 rounded-[var(--r-md)] border border-[var(--line)] bg-[var(--plate)] transition-all duration-300 hover:border-[var(--brass)] hover:shadow-[var(--shadow-pill)]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--line-soft)] text-[var(--brass)] group-hover:bg-[var(--brass)] group-hover:text-white transition-colors">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="text-[0.6875rem] uppercase tracking-wider text-[var(--stone)] font-mono font-medium">
                      Direct Advisory Line
                    </span>
                    <p className="text-sm font-medium text-[var(--ivory)] mt-0.5 group-hover:text-[var(--gold)] transition-colors">
                      {contact.phone}
                    </p>
                  </div>
                </a>

                {/* Headquarters Location Card */}
                <div className="flex items-start gap-4 p-5 rounded-[var(--r-md)] border border-[var(--line-soft)] bg-[var(--plate)]/60">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--line-soft)] text-[var(--brass)]">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="text-[0.6875rem] uppercase tracking-wider text-[var(--stone)] font-mono font-medium">
                      World Headquarters · DMCC
                    </span>
                    <address className="not-italic text-xs text-[var(--ivory-2)] mt-1 leading-relaxed">
                      {contact.address.line1}
                      <br />
                      {contact.address.line2}
                    </address>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--line)] flex items-center gap-2 text-xs text-[var(--stone)]">
                <ShieldCheck className="h-4 w-4 text-[var(--brass)]" />
                <span>Strictly unconflicted and confidential advisory protocol.</span>
              </div>
            </div>

            {/* Right Column: Confidential Form */}
            <div className="lg:col-span-7">
              <Reveal kind="card" delay={0.1}>
                <div className="rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] p-8 sm:p-12 shadow-[var(--shadow-plate)]">
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-5">
                    <div>
                      <h2 className="font-display text-2xl text-[var(--ivory)] font-light">
                        Send a Confidential Message
                      </h2>
                      <p className="text-xs text-[var(--sage)] mt-1">
                        Outline your advisory requirement or mandate parameters.
                      </p>
                    </div>
                    <span className="text-xs font-mono font-semibold uppercase text-[var(--brass)]">
                      SOFISAM
                    </span>
                  </div>

                  <div className="mt-8">
                    <ContactForm />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Location & Map Chapter */}
      <section data-section="Location" className="section ground-char border-b border-[var(--line-soft)]" aria-labelledby="location-heading">
        <div className="shell">
          <SectionHeader
            ruled
            label="World Headquarters"
            heading="Dubai Multi Commodities Centre (DMCC)."
            headingId="location-heading"
            copy={`${site.name} is headquartered in the ${contact.headquarters}, Jumeirah Lake Towers, Dubai. In-person meetings are conducted by prior arrangement.`}
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            {/* Headquarters Ledger (Left Column on Desktop, First on Mobile) */}
            <div className="lg:col-span-5 order-1">
              <div className="p-8 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-plate)]">
                <h3 className="t-label text-gold">Location Summary</h3>
                <dl className="mt-6 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                  {[
                    { k: 'Jurisdiction', v: contact.headquarters },
                    { k: 'Complex', v: 'Jewellery & Gemplex 3' },
                    { k: 'District', v: 'Jumeirah Lake Towers (JLT)' },
                    { k: 'City & State', v: 'Dubai, UAE' },
                    { k: 'Telephone', v: contact.phone, href: `tel:${contact.phoneHref}` },
                    { k: 'Email', v: contact.email, href: `mailto:${contact.email}` },
                  ].map((row) => (
                    <div key={row.k} className="py-3.5 flex items-baseline justify-between gap-4">
                      <dt className="text-xs uppercase tracking-wider text-[var(--stone)] font-mono">{row.k}</dt>
                      <dd className="text-xs font-medium text-[var(--ivory)] text-right">
                        {row.href ? (
                          <a href={row.href} className="hover:text-[var(--gold)] transition-colors">
                            {row.v}
                          </a>
                        ) : (
                          row.v
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 pt-2">
                  <Button
                    variant="link"
                    href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Open in Google Maps
                  </Button>
                </div>
              </div>
            </div>

            {/* Map Iframe Container (Right Column on Desktop, Below on Mobile) */}
            <div className="lg:col-span-7 order-2">
              <div className="media aspect-[16/10] w-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] shadow-[var(--shadow-plate)] lg:aspect-[16/9]">
                <iframe
                  title={`Map showing ${contact.address.line1}, ${contact.address.line2}`}
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="relative h-full w-full border-0 grayscale-[0.35] contrast-[1.08]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Newsletter */}
      <Newsletter />
    </>
  );
}
