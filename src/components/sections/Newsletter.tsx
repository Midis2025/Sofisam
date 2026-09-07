'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

import { newsletterCopy } from '@/data/site';
import { subscribeToNewsletter } from '@/lib/forms';
import { Reveal, MaskedLines } from '@/components/animations/Reveal';

type State = 'idle' | 'loading' | 'success' | 'error';

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
    <section
      className="relative overflow-hidden bg-ink text-bone"
      aria-labelledby="newsletter-heading"
    >
      <div
        aria-hidden
        className="precision-grid precision-grid-fade pointer-events-none absolute inset-0 opacity-40"
      />

      <div className="shell-wide relative z-10 py-[clamp(4.5rem,10vw,8.5rem)]">
        <div className="grid gap-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Reveal className="flex items-center gap-4">
              <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
              <p className="t-label text-gold">Newsletter</p>
            </Reveal>

            <h2 id="newsletter-heading" className="t-h1 mt-7 text-bone">
              <MaskedLines lines={[newsletterCopy.heading]} />
            </h2>

            <Reveal delay={0.12}>
              <p className="t-body mt-6 max-w-[44ch] text-bone/55">
                {newsletterCopy.standfirst}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <form onSubmit={onSubmit} noValidate>
                <label
                  htmlFor={`${id}-email`}
                  className="t-label block text-bone/45"
                >
                  {newsletterCopy.fieldLabel}
                </label>

                <div className="group relative mt-5 flex items-center gap-4">
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
                    className="min-h-[3rem] w-full bg-transparent pb-3 text-[clamp(1.05rem,2vw,1.45rem)] font-light text-bone placeholder:text-bone/25 focus:outline-none disabled:opacity-60"
                  />

                  <button
                    type="submit"
                    disabled={state === 'loading'}
                    className="flex h-12 w-12 shrink-0 items-center justify-center border border-bone/25 text-bone transition-all duration-500 ease-premium hover:border-gold hover:bg-gold hover:text-ink disabled:opacity-50 sm:h-[3.25rem] sm:w-[3.25rem]"
                  >
                    <span className="sr-only">{newsletterCopy.submitLabel}</span>
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
                          <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.5} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>

                {/* Animated underline */}
                <span
                  aria-hidden
                  className={`relative block h-px w-full ${
                    invalid ? 'bg-gold/60' : 'bg-bone/20'
                  }`}
                >
                  <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-premium group-focus-within:scale-x-100" />
                </span>

                <div className="mt-5 min-h-[2.75rem]">
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
                        className={`text-[0.86rem] font-light leading-relaxed ${
                          invalid ? 'text-gold' : 'text-bone/65'
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
                        className="text-[0.8rem] font-light text-bone/35"
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
