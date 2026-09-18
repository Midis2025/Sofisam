'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

import { newsletterCopy } from '@/data/site';
import { subscribeToNewsletter } from '@/lib/forms';
import { Reveal, MaskedLines } from '@/components/animations/Reveal';

type State = 'idle' | 'loading' | 'success' | 'error';

/**
 * The subscription itself — validation, submission and the message shown
 * after it — shared by this section and the closing section, so the two
 * forms can never behave differently.
 */
export function useNewsletter() {
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

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (state !== 'idle') {
      setState('idle');
      setMessage('');
    }
  }

  return { id, email, state, message, invalid, onSubmit, onChange };
}

/**
 * Newsletter.
 *
 * A statement on the left, a single field on the right. The field is a line
 * rather than a box: its label lifts and its rule draws gold on focus.
 * Submission behaviour, validation and every string are unchanged.
 */
export function Newsletter() {
  const { id, email, state, message, invalid, onSubmit, onChange } = useNewsletter();

  return (
    <section data-section="Newsletter" className="section ground-void" aria-labelledby="newsletter-heading">
      <div className="shell">
        <div className="grid gap-[var(--gap)] lg:grid-cols-12 lg:items-end lg:gap-[clamp(2.5rem,4.5vw,5rem)]">
          <div className="lg:col-span-6">
            <Reveal kind="label" className="kicker">
              <p className="t-label">Newsletter</p>
            </Reveal>

            <h2 id="newsletter-heading" className="t-h2 mt-[clamp(1.25rem,2.4vw,1.75rem)] text-ivory">
              <MaskedLines lines={[newsletterCopy.heading]} />
            </h2>

            <Reveal delay={0.12}>
              <p className="t-body mt-6 max-w-[44ch] text-sage">{newsletterCopy.standfirst}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.1}>
              <form onSubmit={onSubmit} noValidate>
                <div className="flex items-end gap-4">
                  <span className="field flex-1">
                    <input
                      id={`${id}-email`}
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={onChange}
                      aria-invalid={invalid}
                      aria-describedby={message ? `${id}-msg` : undefined}
                      disabled={state === 'loading'}
                      placeholder=" "
                      className="field-input disabled:opacity-60"
                    />
                    <label htmlFor={`${id}-email`} className="field-label">
                      {newsletterCopy.fieldLabel}
                    </label>
                    <span aria-hidden className="field-line" />
                  </span>

                  <button
                    type="submit"
                    disabled={state === 'loading'}
                    aria-label={newsletterCopy.submitLabel}
                    className="group/sub mb-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors duration-500 ease-premium hover:border-gold hover:bg-gold hover:text-paper disabled:opacity-60"
                  >
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

                <div className="mt-5 min-h-[2.5rem]">
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
                        className={`t-small ${invalid ? 'text-gold' : 'text-ivory/70'}`}
                      >
                        {message}
                      </motion.p>
                    ) : (
                      <motion.p
                        key="privacy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="t-meta text-stone"
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
    </section>
  );
}
