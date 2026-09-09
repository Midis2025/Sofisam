'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

import { newsletterCopy } from '@/data/site';
import { subscribeToNewsletter } from '@/lib/forms';
import { Reveal, MaskedLines } from '@/components/animations/Reveal';

type State = 'idle' | 'loading' | 'success' | 'error';

/**
 * 09 — Newsletter. One clean panel: statement on the left, field and button on
 * the right. Submission behaviour, validation and every string are unchanged.
 */
export function Newsletter() {
  const id = useId();
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');

  const invalid = state === 'error';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setState('error');
      setMessage('Enter a valid email address.');
      return;
    }

    setState('loading');
    setMessage('');
    const result = await subscribeToNewsletter({ email: value });

    if (result.ok) {
      setState('success');
      setMessage(result.message);
      setEmail('');
    } else {
      setState('error');
      setMessage(result.message);
    }
  }

  return (
    <section className="rd-section rd-paper" aria-labelledby="newsletter-heading">
      <div className="rd-shell">
        <div className="rd-tile-dark rd-on-dark px-[clamp(1.5rem,4vw,4.5rem)] py-[clamp(2.5rem,5vw,4.5rem)]">
          <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:items-center lg:gap-[clamp(2.5rem,4.5vw,5rem)]">
            <div className="lg:col-span-6">
              <Reveal kind="label" className="rd-kicker">
                <p className="rd-label">Newsletter</p>
              </Reveal>

              <h2
                id="newsletter-heading"
                className="rd-h2 mt-[clamp(1.25rem,2.4vw,1.75rem)] text-bone"
              >
                <MaskedLines lines={[newsletterCopy.heading]} />
              </h2>

              <Reveal delay={0.12}>
                <p className="rd-body mt-5 max-w-[44ch] text-[var(--rd-sage)]">
                  {newsletterCopy.standfirst}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal delay={0.1}>
                <form onSubmit={onSubmit} noValidate>
                  <label htmlFor={`${id}-email`} className="rd-label block text-[var(--rd-sage)]">
                    {newsletterCopy.fieldLabel}
                  </label>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch">
                    <input
                      id={`${id}-email`}
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (state !== 'idle') {
                          setState('idle');
                          setMessage('');
                        }
                      }}
                      aria-invalid={invalid}
                      aria-describedby={message ? `${id}-msg` : undefined}
                      disabled={state === 'loading'}
                      placeholder="name@company.com"
                      className={`min-h-[3rem] w-full flex-1 rounded-[var(--rd-r-md)] border bg-bone/[0.04] px-5 py-3 text-[1.0625rem] font-light text-bone transition-colors duration-500 placeholder:text-bone/25 focus:border-[var(--rd-accent)] focus:outline-none disabled:opacity-60 ${
                        invalid ? 'border-[var(--rd-accent)]' : 'border-bone/20'
                      }`}
                    />

                    <button
                      type="submit"
                      disabled={state === 'loading'}
                      className="group/sub inline-flex min-h-[3rem] shrink-0 items-center justify-center gap-2.5 rounded-[var(--rd-r-md)] bg-bone px-7 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-[var(--rd-ink)] transition-colors duration-500 ease-premium hover:bg-[var(--rd-accent)] disabled:opacity-60"
                    >
                      {newsletterCopy.submitLabel}
                      <AnimatePresence mode="wait" initial={false}>
                        {state === 'loading' ? (
                          <motion.span
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <Loader2 aria-hidden className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                          </motion.span>
                        ) : state === 'success' ? (
                          <motion.span
                            key="done"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <Check aria-hidden className="h-4 w-4" strokeWidth={1.5} />
                          </motion.span>
                        ) : (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <ArrowRight
                              aria-hidden
                              className="h-4 w-4 transition-transform duration-500 ease-premium group-hover/sub:translate-x-0.5"
                              strokeWidth={1.5}
                            />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>

                  <div className="mt-4 min-h-[2.75rem]">
                    <AnimatePresence mode="wait">
                      {message ? (
                        <motion.p
                          key={message}
                          id={`${id}-msg`}
                          role={invalid ? 'alert' : 'status'}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35 }}
                          className={`rd-small ${
                            invalid ? 'text-[var(--rd-accent)]' : 'text-bone/70'
                          }`}
                        >
                          {message}
                        </motion.p>
                      ) : (
                        <motion.p
                          key="privacy"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="rd-meta text-bone/40"
                        >
                          {newsletterCopy.privacyNote}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
