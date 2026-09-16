import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';

import { Picture } from '@/components/ui/Picture';
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
      {/* The enquiry. Architecture carries the frame; the statement and the
          form sit over it on the site's obsidian ground. */}
      <section className="ground-dark relative overflow-hidden" aria-labelledby="contact-heading">
        {/* Background plate — held to the right of the frame on a desktop so
            the form never sits on top of a busy image. */}
        <div aria-hidden className="absolute inset-0">
          <div className="media media-flat absolute inset-0 lg:left-[38%]">
            <Picture
              name="difc-gate"
              alt=""
              decorative
              sizes="(min-width:1024px) 56vw, 100vw"
              focal="50% 45%"
              className="h-full w-full"
            />
          </div>

          {/* On a phone the copy runs over the whole frame, so the scrim is
              vertical and heavy. From lg it turns horizontal: the statement
              side reads as solid ground and the architecture clears to the
              right, behind the form. */}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,11,0.96)_0%,rgba(10,10,11,0.88)_45%,rgba(10,10,11,0.82)_100%)] lg:bg-[linear-gradient(90deg,rgb(10,10,11)_0%,rgb(10,10,11)_34%,rgba(10,10,11,0.88)_52%,rgba(10,10,11,0.45)_100%)]" />
        </div>

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
                <p className="t-lead mt-[clamp(1.25rem,2.2vw,2rem)] max-w-[42ch] text-ivory/70">
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
                        <span className="link-underline text-[1.0625rem] font-light tracking-wide text-ivory/85">
                          {contact.email}
                        </span>
                      </a>
                    </li>

                    <li>
                      <a href={`tel:${contact.phoneHref}`} className="group flex items-center gap-5">
                        <Badge>
                          <Phone aria-hidden strokeWidth={1.4} className="h-[1.05rem] w-[1.05rem]" />
                        </Badge>
                        <span className="link-underline text-[1.0625rem] font-light tracking-wide text-ivory/85">
                          {contact.phone}
                        </span>
                      </a>
                    </li>

                    <li className="flex items-start gap-5">
                      <Badge static>
                        <MapPin aria-hidden strokeWidth={1.4} className="h-[1.05rem] w-[1.05rem]" />
                      </Badge>
                      <address className="not-italic">
                        <p className="text-[1.0625rem] font-light leading-relaxed tracking-wide text-ivory/85">
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
                <div className="surface-dark px-[clamp(1.25rem,3vw,3rem)] py-[clamp(2rem,3.6vw,3.25rem)]">
                  <h2 className="t-h3 text-ivory">Send a message</h2>
                  <p className="t-body mt-3 max-w-[42ch] text-sage">
                    Tell us briefly what you are working through and we will respond
                    directly.
                  </p>

                  <span aria-hidden className="rule-inv my-[clamp(1.75rem,3vw,2.5rem)]" />

                  <ContactForm />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section ground-ivory" aria-labelledby="location-heading">
        <div className="shell">
          <div className="head">
            <div>
              <Reveal kind="label" className="kicker">
                <p className="t-label">Location</p>
              </Reveal>
              <h2
                id="location-heading"
                className="t-h2 head-title mt-[clamp(1.25rem,2.6vw,2rem)] text-ink"
              >
                <MaskedLines lines={['World headquarters,', 'Jumeirah Lake Towers.']} />
              </h2>
            </div>
            <div className="lg:pb-2">
              <Reveal delay={0.1}>
                <p className="t-body head-note text-stone">
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
                <iframe
                  title={`Map showing ${contact.address.line1}, ${contact.address.line2}`}
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0 grayscale-[0.4] contrast-[1.05]"
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
                      <dt className="t-label text-stone">{row.k}</dt>
                      <dd className="mt-3 whitespace-pre-line text-[0.98rem] font-light leading-relaxed text-ink/80">
                        {row.href ? (
                          <a
                            href={row.href}
                            className="link-underline inline-block py-1.5 hover:text-gold-ink"
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
                  className="cta mt-6 text-stone hover:text-ink"
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
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--g-inv-line)] bg-[var(--g-inv-bg)] text-gold shadow-[0_2px_8px_-2px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-md ${
        isStatic
          ? ''
          : 'transition-colors duration-500 ease-premium group-hover:border-gold group-hover:bg-gold group-hover:text-ink'
      }`}
    >
      {children}
    </span>
  );
}
