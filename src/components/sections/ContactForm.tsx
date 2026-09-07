'use client';

import { useId, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader2, AlertCircle } from 'lucide-react';

import { ButtonSubmit } from '@/components/ui/Button';
import { buildMailto, submitContactEnquiry } from '@/lib/forms';
import { contact, contactCopy } from '@/data/site';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'unconfigured';

interface Fields {
  name: string;
  email: string;
  company: string;
  message: string;
}

const EMPTY: Fields = { name: '', email: '', company: '', message: '' };

function validate(f: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (!f.name.trim()) errors.name = 'Please enter your full name.';
  else if (f.name.trim().length < 2) errors.name = 'Please enter your full name.';

  if (!f.email.trim()) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))
    errors.email = 'Please enter a valid email address.';

  if (!f.message.trim()) errors.message = 'Please include a short message.';
  else if (f.message.trim().length < 12)
    errors.message = 'Please add a little more detail.';

  return errors;
}

export function ContactForm() {
  const id = useId();
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const errors = useMemo(() => validate(fields), [fields]);

  const showError = (k: keyof Fields) =>
    Boolean(errors[k]) && (submitted || touched[k]);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (status !== 'idle' && status !== 'loading') {
      setStatus('idle');
      setStatusMessage('');
    }
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);

    if (Object.keys(errors).length > 0) {
      const first = document.getElementById(`${id}-${Object.keys(errors)[0]}`);
      first?.focus();
      return;
    }

    setStatus('loading');
    const result = await submitContactEnquiry({
      name: fields.name.trim(),
      email: fields.email.trim(),
      company: fields.company.trim() || undefined,
      message: fields.message.trim(),
    });

    setStatusMessage(result.message);

    if (result.ok) {
      setStatus('success');
      setFields(EMPTY);
      setTouched({});
      setSubmitted(false);
    } else {
      setStatus(result.configured ? 'error' : 'unconfigured');
    }
  }

  const fieldBase =
    'peer w-full bg-transparent pb-3 pt-2 text-[1.0625rem] font-light text-bone ' +
    'placeholder:text-bone/20 focus:outline-none disabled:opacity-60';

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="space-y-9">
        {/* Full Name */}
        <Field
          id={`${id}-name`}
          label="Full Name"
          required
          error={showError('name') ? errors.name : undefined}
        >
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={set('name')}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            disabled={status === 'loading'}
            aria-invalid={showError('name')}
            aria-describedby={showError('name') ? `${id}-name-err` : undefined}
            placeholder="Your name"
            className={fieldBase}
          />
        </Field>

        {/* Email */}
        <Field
          id={`${id}-email`}
          label="Email Address"
          required
          error={showError('email') ? errors.email : undefined}
        >
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={fields.email}
            onChange={set('email')}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            disabled={status === 'loading'}
            aria-invalid={showError('email')}
            aria-describedby={showError('email') ? `${id}-email-err` : undefined}
            placeholder="name@company.com"
            className={fieldBase}
          />
        </Field>

        {/* Company (optional) */}
        <Field id={`${id}-company`} label="Company" optional>
          <input
            id={`${id}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            value={fields.company}
            onChange={set('company')}
            disabled={status === 'loading'}
            placeholder="Organisation"
            className={fieldBase}
          />
        </Field>

        {/* Message */}
        <Field
          id={`${id}-message`}
          label="Message"
          required
          error={showError('message') ? errors.message : undefined}
        >
          <textarea
            id={`${id}-message`}
            name="message"
            rows={4}
            value={fields.message}
            onChange={set('message')}
            onBlur={() => setTouched((t) => ({ ...t, message: true }))}
            disabled={status === 'loading'}
            aria-invalid={showError('message')}
            aria-describedby={showError('message') ? `${id}-message-err` : undefined}
            placeholder="How can we help?"
            className={`${fieldBase} resize-none`}
          />
        </Field>
      </div>

      <div className="mt-10">
        <ButtonSubmit tone="light" variant="solid" disabled={status === 'loading'}>
          {status === 'loading' ? (
            <span className="inline-flex items-center gap-3">
              <Loader2 aria-hidden className="h-3.5 w-3.5 animate-spin" strokeWidth={1.6} />
              Sending
            </span>
          ) : (
            contactCopy.submitLabel
          )}
        </ButtonSubmit>
      </div>

      {/* Status region */}
      <div aria-live="polite" className="mt-7 min-h-[3rem]">
        <AnimatePresence mode="wait">
          {status === 'success' && (
            <StatusNote key="ok" tone="ok">
              <Check aria-hidden strokeWidth={1.6} className="mt-[0.15rem] h-4 w-4 shrink-0" />
              <span>{statusMessage}</span>
            </StatusNote>
          )}

          {(status === 'error' || status === 'unconfigured') && (
            <StatusNote key="err" tone="warn">
              <AlertCircle
                aria-hidden
                strokeWidth={1.6}
                className="mt-[0.15rem] h-4 w-4 shrink-0"
              />
              <span>
                {statusMessage}{' '}
                {status === 'unconfigured' && (
                  <a
                    href={buildMailto({
                      name: fields.name,
                      email: fields.email,
                      company: fields.company,
                      message: fields.message,
                    })}
                    className="link-underline whitespace-nowrap font-normal text-gold"
                  >
                    Open a prefilled email
                  </a>
                )}
              </span>
            </StatusNote>
          )}

          {status === 'idle' && submitted && Object.keys(errors).length > 0 && (
            <StatusNote key="inv" tone="warn">
              <AlertCircle
                aria-hidden
                strokeWidth={1.6}
                className="mt-[0.15rem] h-4 w-4 shrink-0"
              />
              <span>Please correct the highlighted fields.</span>
            </StatusNote>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-2 text-[0.78rem] font-light leading-relaxed text-bone/35">
        Enquiries are handled in confidence. You can also write directly to{' '}
        <a href={`mailto:${contact.email}`} className="link-underline text-bone/55">
          {contact.email}
        </a>
        .
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  children,
  required,
  optional,
  error,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
  error?: string;
}) {
  return (
    <div className="group/field">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="t-label text-bone/45">
          {label}
          {required && (
            <span aria-hidden className="ml-1 text-gold">
              *
            </span>
          )}
        </label>
        {optional && (
          <span className="text-[0.68rem] font-light lowercase tracking-wide text-bone/25">
            optional
          </span>
        )}
      </div>

      <div className="mt-2">{children}</div>

      {/* Animated underline */}
      <span
        aria-hidden
        className={`relative block h-px w-full ${error ? 'bg-gold/70' : 'bg-bone/18'}`}
      >
        <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-premium group-focus-within/field:scale-x-100" />
      </span>

      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-err`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2.5 text-[0.8rem] font-light text-gold"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusNote({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: 'ok' | 'warn';
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex gap-3 border-l-2 py-1 pl-4 text-[0.9rem] font-light leading-relaxed ${
        tone === 'ok' ? 'border-gold text-bone/80' : 'border-gold/70 text-bone/70'
      }`}
    >
      {children}
    </motion.p>
  );
}
