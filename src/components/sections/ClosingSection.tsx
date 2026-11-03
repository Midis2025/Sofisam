'use client';

import { useId, useRef, useState } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';

import { contact } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';
import { submitPrivateEnquiry } from '@/lib/forms';

export interface ClosingSectionProps {
  /** Heading lines — pages may set their own; defaults to the firm's invitation. */
  lines?: string[];
  body?: string;
}

const AREAS = [
  'Strategic Advisory',
  'Investor Relations',
  'Corporate Restructuring',
  'GCC / International Expansion',
  'Strategic Partnerships',
  'Other',
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type FieldKey = 'name' | 'email' | 'organisation' | 'area' | 'message';
type Fields = Record<FieldKey, string>;
type Errors = Partial<Record<FieldKey, string>>;

const EMPTY: Fields = { name: '', email: '', organisation: '', area: '', message: '' };

/** Field order, used to move focus to the first problem on submit. */
const ORDER: FieldKey[] = ['name', 'email', 'organisation', 'area', 'message'];

/** Server field names from /api/enquiry mapped back onto this form. */
const SERVER_KEYS: Record<string, FieldKey> = {
  fullName: 'name',
  email: 'email',
  company: 'organisation',
  areaOfInterest: 'area',
  requirement: 'message',
};

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!f.email.trim()) e.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (!f.area) e.area = 'Please select an area of interest.';
  if (f.message.trim().length < 10)
    e.message = 'Please outline your enquiry in a few words (at least 10 characters).';
  return e;
}

/*
 * One control style for every field in the panel: a thin champagne-ruled
 * box on the page ground, gold on focus, never a browser-blue ring. Kept
 * here rather than in globals because the site-wide `.field` system is the
 * floating-label underline used on /contact, and this panel calls for
 * persistent labels with visible placeholders.
 */
const CONTROL =
  'block w-full min-h-[3rem] rounded-[var(--r-md)] border border-[var(--line-strong)] bg-[var(--void)] px-4 py-3 text-[0.9375rem] leading-normal text-[var(--ivory)] placeholder:text-[var(--stone)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-[var(--line-control)] focus:outline-none focus:border-[var(--brass)] focus:shadow-[0_0_0_3px_rgba(199,164,106,0.16)] aria-[invalid=true]:border-[var(--field-error)] disabled:opacity-60';

const LABEL = 't-label !text-[0.6875rem] text-[var(--gold)]';

/**
 * Start a Conversation — the closing chapter of the homepage and insight
 * pages.
 *
 * An invitation rather than a form: the firm's statement and a single
 * restrained Dubai plate on the left, a private enquiry panel on the right,
 * and the direct channels set as a ledger beneath both. The plate flexes to
 * take whatever height the statement leaves, so the two columns end on the
 * same line at every desktop width.
 */
export function ClosingSection({ lines, body }: ClosingSectionProps = {}) {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;

  const [fields, setFields] = useState<Fields>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [serverErrors, setServerErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');
  const successRef = useRef<HTMLHeadingElement>(null);

  const clientErrors = validate(fields);
  const errorFor = (k: FieldKey) =>
    serverErrors[k] ?? (touched[k] ? clientErrors[k] : undefined);

  const set =
    (k: FieldKey) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFields((f) => ({ ...f, [k]: e.target.value }));
      if (serverErrors[k]) setServerErrors((s) => ({ ...s, [k]: undefined }));
    };
  const blur = (k: FieldKey) => () => setTouched((t) => ({ ...t, [k]: true }));

  /** Shared a11y wiring for one control. */
  const aria = (k: FieldKey, required = true) => {
    const err = errorFor(k);
    return {
      id: id(k),
      name: k,
      value: fields[k],
      onChange: set(k),
      onBlur: blur(k),
      disabled: status === 'loading',
      'aria-required': required || undefined,
      'aria-invalid': err ? true : undefined,
      'aria-describedby': err ? id(`${k}-err`) : undefined,
    } as const;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, organisation: true, area: true, message: true });
    setFormMessage('');

    const errs = validate(fields);
    const first = ORDER.find((k) => errs[k]);
    if (first) {
      document.getElementById(id(first))?.focus();
      return;
    }

    setStatus('loading');
    const res = await submitPrivateEnquiry({
      fullName: fields.name.trim(),
      email: fields.email.trim(),
      company: fields.organisation.trim() || undefined,
      areaOfInterest: fields.area,
      requirement: fields.message.trim(),
    });

    if (res.ok) {
      setStatus('success');
      setFields(EMPTY);
      setTouched({});
      // Move focus to the confirmation so it is announced and the
      // keyboard position is not lost with the form.
      requestAnimationFrame(() => successRef.current?.focus());
      return;
    }

    const mapped: Errors = {};
    for (const [k, v] of Object.entries(res.errors ?? {})) {
      const key = SERVER_KEYS[k];
      if (key) mapped[key] = v;
    }
    setServerErrors(mapped);
    setStatus('error');
    setFormMessage(res.message);
    const firstServer = ORDER.find((k) => mapped[k]);
    if (firstServer) document.getElementById(id(firstServer))?.focus();
  }

  function reset() {
    setStatus('idle');
    setFormMessage('');
    setServerErrors({});
    requestAnimationFrame(() => document.getElementById(id('name'))?.focus());
  }

  const heading = lines ?? ['A conversation', 'worth having.'];
  const intro =
    body ??
    'SOFISAM works directly with principals, executives and decision-makers on confidential strategic matters. Every enquiry is handled in strict confidence by the firm’s principals.';

  const errorText = (k: FieldKey) => {
    const err = errorFor(k);
    return err ? (
      <p id={id(`${k}-err`)} className="mt-2 text-xs leading-snug text-[var(--field-error)]">
        {err}
      </p>
    ) : null;
  };

  return (
    <section
      data-section="Contact"
      id="contact"
      className="relative bg-[var(--void)] py-[clamp(4.5rem,8vw,7rem)]"
      aria-labelledby={id('heading')}
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-[clamp(2.5rem,5vw,5.5rem)] lg:items-stretch">
          {/* ── Statement & Dubai plate ─────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col">
            <Reveal kind="label" className="kicker">
              <p className="t-label">Start a Conversation</p>
            </Reveal>

            <h2
              id={id('heading')}
              className="t-h1 mt-eyebrow text-[clamp(2.25rem,4.6vw+0.6rem,4.5rem)] text-[var(--ivory)]"
            >
              <MaskedLines lines={heading} />
            </h2>

            <Reveal delay={0.12}>
              <p className="t-body mt-6 max-w-[46ch] text-[var(--sage)]">{intro}</p>
            </Reveal>

            <figure className="mt-10 flex flex-col lg:flex-1">
              <ImageReveal delay={0.1} className="lg:flex-1 lg:flex lg:flex-col">
                <div className="group media media-zoom relative aspect-[4/3] sm:aspect-[21/9] lg:aspect-auto lg:flex-1 lg:min-h-[15rem] w-full border border-[var(--line)]">
                  <Picture
                    name="dubai-frame-night"
                    alt="The Dubai Frame at night, its lattice-clad structure rising against a dark sky"
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    focal="50% 42%"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </ImageReveal>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-[var(--line)] pt-3">
                <span className="t-label !text-[0.6875rem] text-[var(--gold)]">Dubai · UAE</span>
                <span className="t-meta text-[var(--stone)]">Global headquarters</span>
              </figcaption>
            </figure>
          </div>

          {/* ── Private enquiry panel ───────────────────────────── */}
          <Reveal kind="card" delay={0.08} className="lg:col-span-7">
            <div className="-mx-[var(--gutter)] flex h-full flex-col border-y border-[var(--line)] bg-[var(--plate)] px-[var(--gutter)] py-8 sm:mx-0 sm:rounded-[var(--r-lg)] sm:border sm:p-[clamp(1.75rem,3.4vw,3rem)] sm:shadow-[var(--shadow-plate)]">
              <div className="kicker">
                <p className="t-label">Private Enquiry</p>
              </div>

              {status === 'success' ? (
                <div role="status" className="mt-6 flex min-h-[18rem] flex-1 flex-col justify-center border-t border-[var(--line)] py-8">
                  <p className={LABEL}>Enquiry received</p>
                  <h3
                    ref={successRef}
                    tabIndex={-1}
                    className="mt-4 max-w-[30ch] font-display text-[clamp(1.5rem,1.2vw+1.15rem,2rem)] font-light leading-snug text-[var(--ivory)] focus:outline-none"
                  >
                    Thank you. Your enquiry has been received confidentially.
                  </h3>
                  <p className="t-body mt-3 max-w-[46ch] text-[var(--sage)]">
                    A member of the SOFISAM team will be in contact directly.
                  </p>
                  <div className="mt-8">
                    <Button variant="link" arrow="right" onClick={reset}>
                      Send another enquiry
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="mt-4 font-display text-[clamp(1.625rem,1.3vw+1.2rem,2.25rem)] font-light leading-[1.15] tracking-[-0.012em] text-[var(--ivory)]">
                    Tell us what you&rsquo;re considering.
                  </h3>
                  <p className="t-small mt-3 max-w-[52ch] text-[var(--sage)]">
                    Share a brief outline of your situation and a member of our team will respond directly.
                  </p>

                  <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-x-5 gap-y-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor={id('name')} className={LABEL}>
                        Name &amp; Title
                      </label>
                      <input
                        {...aria('name')}
                        type="text"
                        autoComplete="name"
                        placeholder="Principal / Executive"
                        className={`mt-2 ${CONTROL}`}
                      />
                      {errorText('name')}
                    </div>

                    <div>
                      <label htmlFor={id('email')} className={LABEL}>
                        Corporate Email
                      </label>
                      <input
                        {...aria('email')}
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        spellCheck={false}
                        placeholder="name@institution.com"
                        className={`mt-2 ${CONTROL}`}
                      />
                      {errorText('email')}
                    </div>

                    <div>
                      <label htmlFor={id('organisation')} className={LABEL}>
                        Organisation{' '}
                        <span className="font-normal normal-case tracking-normal text-[var(--stone)]">
                          (optional)
                        </span>
                      </label>
                      <input
                        {...aria('organisation', false)}
                        type="text"
                        autoComplete="organization"
                        placeholder="Company / Institution"
                        className={`mt-2 ${CONTROL}`}
                      />
                      {errorText('organisation')}
                    </div>

                    <div>
                      <label htmlFor={id('area')} className={LABEL}>
                        Area of Interest
                      </label>
                      <div className="relative mt-2">
                        <select
                          {...aria('area')}
                          className={`${CONTROL} cursor-pointer appearance-none pr-11 ${
                            fields.area ? '' : 'text-[var(--stone)]'
                          }`}
                        >
                          <option value="" disabled>
                            Select an area
                          </option>
                          {AREAS.map((a) => (
                            <option key={a} value={a} className="text-[var(--ivory)]">
                              {a}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          aria-hidden
                          strokeWidth={1.5}
                          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brass)]"
                        />
                      </div>
                      {errorText('area')}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor={id('message')} className={LABEL}>
                        Message
                      </label>
                      <textarea
                        {...aria('message')}
                        rows={4}
                        placeholder="Briefly outline the opportunity, mandate or matter you would like to discuss."
                        className={`mt-2 min-h-[8.5rem] resize-y ${CONTROL}`}
                      />
                      {errorText('message')}
                    </div>

                    <div className="sm:col-span-2 pt-1">
                      {formMessage && (
                        <p role="alert" className="mb-4 text-sm leading-snug text-[var(--field-error)]">
                          {formMessage}
                        </p>
                      )}

                      <Button
                        type="submit"
                        variant="primary"
                        arrow="right"
                        loading={status === 'loading'}
                        className="w-full sm:w-auto"
                      >
                        Submit Confidential Enquiry
                      </Button>

                      <p className="mt-5 flex items-center gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-[var(--stone)]">
                        <ShieldCheck aria-hidden strokeWidth={1.5} className="h-3.5 w-3.5 shrink-0 text-[var(--brass)]" />
                        <span>Confidential · Unconflicted · Direct</span>
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>

        {/* ── Direct channels ledger ────────────────────────────── */}
        <Reveal delay={0.05}>
          <dl className="mt-[clamp(3rem,5vw,4.5rem)] grid gap-x-10 gap-y-7 border-t border-[var(--line)] pt-[clamp(1.75rem,2.6vw,2.5rem)] md:grid-cols-[1fr_1fr_1.5fr]">
            <div>
              <dt className="t-label !text-[0.6875rem] text-[var(--stone)]">Direct Line</dt>
              <dd className="mt-2.5">
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="font-display text-[1.375rem] font-light leading-snug text-[var(--ivory)] transition-colors duration-300 hover:text-[var(--gold)] focus-visible:text-[var(--gold)] focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none"
                >
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="t-label !text-[0.6875rem] text-[var(--stone)]">Confidential Email</dt>
              <dd className="mt-2.5">
                <a
                  href={`mailto:${contact.email}`}
                  className="font-display text-[1.375rem] font-light leading-snug text-[var(--ivory)] transition-colors duration-300 hover:text-[var(--gold)] focus-visible:text-[var(--gold)] focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none"
                >
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="t-label !text-[0.6875rem] text-[var(--stone)]">Dubai Office</dt>
              <dd className="mt-2.5 t-small text-[var(--ivory-2)]">
                <address className="not-italic">
                  {contact.address.line1}
                  <br />
                  {contact.address.line2}
                </address>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
