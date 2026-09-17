'use client';

import { useId, useMemo, useState, type ReactNode } from 'react';
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
  else if (f.message.trim().length < 12) errors.message = 'Please add a little more detail.';

  return errors;
}

/**
 * Enquiry form.
 *
 * Each field is a line rather than a box: the label rests on the baseline of
 * an empty field and lifts to label size as soon as it is focused or filled,
 * while a gold rule draws in from the left beneath it. Validation, submission
 * behaviour and every string are unchanged.
 */
export function ContactForm() {
  const id = useId();
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const errors = useMemo(() => validate(fields), [fields]);

  const showError = (k: keyof Fields) => Boolean(errors[k]) && (submitted || touched[k]);

  const set =
    (k: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((f) => ({ ...f, [k]: e.target.value }));
      if (status !== 'idle' && status !== 'loading') {
        setStatus('idle');
        setStatusMessage('');
      }
    };

  const blur = (k: keyof Fields) => () => setTouched((t) => ({ ...t, [k]: true }));

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

  const busy = status === 'loading';

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="grid gap-x-[clamp(1.5rem,3vw,2.5rem)] gap-y-[clamp(1.75rem,2.6vw,2.25rem)] sm:grid-cols-2">
        <Field id={`${id}-name`} label="Full Name" required error={showError('name') ? errors.name : undefined}>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={set('name')}
            onBlur={blur('name')}
            disabled={busy}
            aria-invalid={showError('name')}
            aria-describedby={showError('name') ? `${id}-name-err` : undefined}
            placeholder=" "
            className="field-input disabled:opacity-60"
          />
        </Field>

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
            onBlur={blur('email')}
            disabled={busy}
            aria-invalid={showError('email')}
            aria-describedby={showError('email') ? `${id}-email-err` : undefined}
            placeholder=" "
            className="field-input disabled:opacity-60"
          />
        </Field>

        <Field id={`${id}-company`} label="Company" optional className="sm:col-span-2">
          <input
            id={`${id}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            value={fields.company}
            onChange={set('company')}
            disabled={busy}
            placeholder=" "
            className="field-input disabled:opacity-60"
          />
        </Field>

        <Field
          id={`${id}-message`}
          label="Message"
          required
          className="sm:col-span-2"
          error={showError('message') ? errors.message : undefined}
        >
          <textarea
            id={`${id}-message`}
            name="message"
            rows={4}
            value={fields.message}
            onChange={set('message')}
            onBlur={blur('message')}
            disabled={busy}
            aria-invalid={showError('message')}
            aria-describedby={showError('message') ? `${id}-message-err` : undefined}
            placeholder=" "
            className="field-input disabled:opacity-60"
          />
        </Field>
      </div>

      <div className="mt-[clamp(2.25rem,3.5vw,3rem)]">
        <ButtonSubmit tone="light" variant="solid" disabled={busy}>
          {busy ? (
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
              <AlertCircle aria-hidden strokeWidth={1.6} className="mt-[0.15rem] h-4 w-4 shrink-0" />
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
              <AlertCircle aria-hidden strokeWidth={1.6} className="mt-[0.15rem] h-4 w-4 shrink-0" />
              <span>Please correct the highlighted fields.</span>
            </StatusNote>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-2 text-[0.78rem] font-light leading-relaxed text-stone">
        Enquiries are handled in confidence. You can also write directly to{' '}
        <a href={`mailto:${contact.email}`} className="link-underline text-ivory/55">
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
  className = '',
}: {
  id: string;
  label: string;
  children: ReactNode;
  required?: boolean;
  optional?: boolean;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <span className="field">
        {children}
        <label htmlFor={id} className="field-label">
          {label}
          {required && (
            <span aria-hidden className="ml-1 text-gold">
              *
            </span>
          )}
          {optional && (
            <span aria-hidden className="ml-2 text-[0.8em] opacity-60">
              (optional)
            </span>
          )}
        </label>
        <span aria-hidden className="field-line" />
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

function StatusNote({ children, tone }: { children: ReactNode; tone: 'ok' | 'warn' }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex gap-3 border-l-2 py-1 pl-4 text-[0.9rem] font-light leading-relaxed ${
        tone === 'ok' ? 'border-gold text-ivory/80' : 'border-gold/70 text-ivory/70'
      }`}
    >
      {children}
    </motion.p>
  );
}
