import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';

import { Picture } from '@/components/ui/Picture';
import { MeridianField } from '@/components/ui/MeridianField';
import { ContactForm } from '@/components/sections/ContactForm';
import { Newsletter } from '@/components/sections/Newsletter';
import { Reveal, MaskedLines, DrawRule } from '@/components/animations/Reveal';
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
      {/* Split hero: statement + form */}
      <section className="relative bg-ink text-bone" aria-labelledby="contact-heading">
        <div className="lg:grid lg:min-h-screen-safe lg:grid-cols-2">
          {/* Left — visual statement */}
          <div className="relative flex min-h-[34rem] flex-col justify-end overflow-hidden pb-[clamp(2.5rem,6vw,4.5rem)] pt-[7.5rem] lg:min-h-0 lg:pb-[clamp(3rem,5vw,5rem)]">
            <div className="media veil-bottom absolute inset-0">
              <Picture
                name="difc-gate"
                alt="Dubai's financial district gate building illuminated at dusk"
                sizes="(min-width:1024px) 50vw, 100vw"
                focal="50% 45%"
                priority
                className="h-full w-full"
              />
            </div>

            <div
              aria-hidden
              className="precision-grid precision-grid-fade pointer-events-none absolute inset-0 opacity-60"
            />
            <MeridianField className="pointer-events-none absolute -left-[30%] top-[8%] hidden h-[34rem] w-[34rem] opacity-[0.24] xl:block" />

            <div className="relative z-10 px-[var(--gutter)] lg:pr-[clamp(2rem,4vw,4rem)]">
              <Reveal className="flex items-center gap-4">
                <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
                <p className="t-label text-gold">{contactCopy.eyebrow}</p>
              </Reveal>

              <h1 id="contact-heading" className="t-h1 mt-7 max-w-[13ch] text-bone">
                <MaskedLines lines={['Start a', 'conversation.']} />
              </h1>

              <Reveal delay={0.14}>
                <p className="t-lead mt-7 max-w-[42ch] text-bone/65">
                  {contactCopy.standfirst}
                </p>
              </Reveal>

              {/* Contact details */}
              <Reveal delay={0.2}>
                <div className="mt-10">
                  <h2 className="t-label text-bone/40">{contactCopy.detailsHeading}</h2>

                  <ul className="mt-6 space-y-5">
                    <li>
                      <a
                        href={`mailto:${contact.email}`}
                        className="group flex items-center gap-5"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bone/15 bg-bone/5 text-gold transition-all duration-500 ease-premium group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
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
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bone/15 bg-bone/5 text-gold transition-all duration-500 ease-premium group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                          <Phone aria-hidden strokeWidth={1.4} className="h-[1.05rem] w-[1.05rem]" />
                        </span>
                        <span className="link-underline text-[1.0625rem] font-light tracking-wide text-bone/85">
                          {contact.phone}
                        </span>
                      </a>
                    </li>

                    <li className="flex items-start gap-5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bone/15 bg-bone/5 text-gold">
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
            </div>
          </div>

          {/* Right — form */}
          <div className="relative flex items-center bg-ink-800 py-[clamp(3.5rem,8vw,6rem)] lg:py-[clamp(6rem,8vw,8rem)]">
            <div
              aria-hidden
              className="precision-grid pointer-events-none absolute inset-0 opacity-30"
            />
            <div className="relative z-10 w-full px-[var(--gutter)] lg:pl-[clamp(2.5rem,5vw,5rem)]">
              <div className="mx-auto w-full max-w-[34rem] lg:mx-0">
                <h2 className="t-h3 text-bone">Send a message</h2>
                <p className="t-body mt-3 max-w-[40ch] text-bone/50">
                  Tell us briefly what you are working through and we will
                  respond directly.
                </p>

                <DrawRule tone="light" className="my-9" />

                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section bg-bone" aria-labelledby="location-heading">
        <div className="shell-wide">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal className="flex items-center gap-4">
                <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
                <p className="t-label text-gold">Location</p>
              </Reveal>
              <h2 id="location-heading" className="t-h2 mt-7 max-w-[15ch] text-ink">
                <MaskedLines lines={['World headquarters,', 'Jumeirah Lake Towers.']} />
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <Reveal delay={0.1}>
                <p className="t-body max-w-[40ch] text-ink/60">
                  {site.name} is based in the {contact.headquarters}. Visits are
                  by arrangement.
                </p>
              </Reveal>
            </div>
          </div>

          <DrawRule className="mt-[clamp(2.5rem,5vw,4rem)]" />

          <div className="mt-[clamp(2rem,4vw,3rem)] grid gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Map */}
            <Reveal className="lg:col-span-8">
              <div className="media aspect-[16/10] w-full border border-ink/10 lg:aspect-[16/9]">
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
                <dl className="border-t border-ink/12">
                  {[
                    { k: 'Address', v: `${contact.address.line1}\n${contact.address.line2}` },
                    { k: 'Free zone', v: contact.headquarters },
                    { k: 'Email', v: contact.email, href: `mailto:${contact.email}` },
                    { k: 'Telephone', v: contact.phone, href: `tel:${contact.phoneHref}` },
                  ].map((row) => (
                    <div key={row.k} className="border-b border-ink/12 py-5">
                      <dt className="t-label text-ink/40">{row.k}</dt>
                      <dd className="mt-2.5 whitespace-pre-line text-[0.98rem] font-light leading-relaxed text-ink/75">
                        {row.href ? (
                          <a href={row.href} className="link-underline inline-block py-1.5 hover:text-gold">
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
                  className="link-underline mt-6 inline-block py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink/60 hover:text-ink"
                >
                  Open in Google Maps
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
