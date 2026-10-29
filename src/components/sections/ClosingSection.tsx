'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Loader2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { contact, newsletterCopy } from '@/data/site';
import { useNewsletter } from './Newsletter';
import { submitContactEnquiry } from '@/lib/forms';

const EASE = [0.16, 1, 0.3, 1] as const;

export interface ClosingSectionProps {
  lines?: string[];
  body?: string;
}

export function ClosingSection({
  lines,
  body,
}: ClosingSectionProps = {}) {
  const reduce = useReducedMotion();
  const nl = useNewsletter();

  // Contact quick-form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactError, setContactError] = useState('');

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setContactError('Please fill in your name, email, and message.');
      return;
    }
    setContactError('');
    setContactStatus('loading');

    const res = await submitContactEnquiry({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    if (res.ok) {
      setContactStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setContactStatus('error');
      setContactError(res.message);
    }
  }

  return (
    <section
      data-section="Contact"
      id="contact"
      className="relative bg-[var(--void)] py-20 lg:py-28"
      aria-label="Contact and Newsletter"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Start a Conversation Form & Direct Details */}
          <div className="lg:col-span-7">
            <div className="kicker">
              <p className="t-label">
                Start a Conversation
              </p>
            </div>

            <h2 className="mt-eyebrow t-h2 text-[var(--ivory)]">
              Reach out to discuss strategic opportunities.
            </h2>

            <p className="mt-4 t-body text-[var(--sage)] max-w-[50ch]">
              Every enquiry is handled in strict confidence by the firm&apos;s principals. We welcome confidential discussion regarding mandates, restructuring, or advisory requirements.
            </p>

            {/* Clean Enquiry Form */}
            <form onSubmit={handleContactSubmit} noValidate className="mt-8 space-y-4 max-w-[38rem]">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium uppercase tracking-wider text-[var(--stone)] mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Principal or Executive"
                    className="w-full rounded-none border border-[var(--line-strong)] bg-[var(--plate)] px-4 py-3 text-sm text-[var(--ivory)] placeholder-[var(--stone)]/60 focus:border-[var(--brass)] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium uppercase tracking-wider text-[var(--stone)] mb-1.5">
                    Corporate Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@firm.com"
                    className="w-full rounded-none border border-[var(--line-strong)] bg-[var(--plate)] px-4 py-3 text-sm text-[var(--ivory)] placeholder-[var(--stone)]/60 focus:border-[var(--brass)] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium uppercase tracking-wider text-[var(--stone)] mb-1.5">
                  Advisory Requirement
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline the nature of your mandate or advisory need..."
                  className="w-full rounded-none border border-[var(--line-strong)] bg-[var(--plate)] px-4 py-3 text-sm text-[var(--ivory)] placeholder-[var(--stone)]/60 focus:border-[var(--brass)] focus:outline-none transition-colors resize-none"
                />
              </div>

              {contactError && (
                <p className="text-xs text-red-600 dark:text-red-400">{contactError}</p>
              )}

              {contactStatus === 'success' && (
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 dark:bg-green-950/40 dark:text-green-300 p-3 border border-green-200">
                  <Check className="h-4 w-4" />
                  <span>Your message has been received in confidence. A principal will respond shortly.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={contactStatus === 'loading'}
                className="group inline-flex items-center justify-center gap-2 rounded-none bg-[var(--ivory)] px-7 py-3 text-sm font-medium tracking-wide text-[var(--ink)] transition-all duration-300 hover:bg-[var(--brass)] hover:text-white disabled:opacity-50"
              >
                {contactStatus === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <span>Send Confidential Enquiry</span>
                    <ArrowUpRight aria-hidden strokeWidth={1.5} className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            {/* Direct Contact Metadata */}
            <div className="mt-10 pt-8 border-t border-[var(--line)] grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wider text-[var(--stone)] font-mono">
                  Direct Line
                </p>
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="mt-1.5 inline-block text-sm font-medium text-[var(--ivory)] hover:text-[var(--gold)] transition-colors"
                >
                  {contact.phone}
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-[var(--stone)] font-mono">
                  Confidential Inquiries
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-1.5 inline-block text-sm font-medium text-[var(--ivory)] hover:text-[var(--gold)] transition-colors"
                >
                  {contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Stay Informed (Newsletter Card) */}
          <div className="lg:col-span-5">
            <div className="p-8 sm:p-10 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-plate)]">
              <div className="flex items-center gap-2.5">
                <span className="h-px w-6 bg-[var(--brass)]" />
                <p className="t-label text-gold">
                  {newsletterCopy.heading}
                </p>
              </div>

              <h3 className="mt-4 t-card text-[var(--ivory)]">
                Strategic Perspectives
              </h3>

              <p className="mt-3 t-small text-[var(--sage)]">
                {newsletterCopy.standfirst}
              </p>

              <form onSubmit={nl.onSubmit} noValidate className="mt-6 space-y-3">
                <div>
                  <label htmlFor={`${nl.id}-email`} className="block text-xs font-medium uppercase tracking-wider text-[var(--stone)] mb-1">
                    {newsletterCopy.fieldLabel}
                  </label>
                  <input
                    id={`${nl.id}-email`}
                    name="email"
                    type="email"
                    required
                    value={nl.email}
                    onChange={nl.onChange}
                    disabled={nl.state === 'loading'}
                    placeholder="executive@institution.com"
                    className="w-full rounded-none border border-[var(--line-strong)] bg-[var(--void)] px-4 py-3 text-sm text-[var(--ivory)] placeholder-[var(--stone)]/60 focus:border-[var(--brass)] focus:outline-none transition-colors"
                  />
                </div>

                {nl.invalid && (
                  <p className="text-xs text-red-600 dark:text-red-400">Please enter a valid email address.</p>
                )}

                {nl.state === 'success' && (
                  <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 p-2.5 border border-green-200">
                    <Check className="h-3.5 w-3.5" />
                    <span>Thank you for subscribing to SOFISAM perspectives.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={nl.state === 'loading'}
                  className="w-full rounded-none border border-[var(--line-strong)] bg-[var(--plate)] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--ivory)] transition-all hover:border-[var(--brass)] hover:bg-[var(--brass)] hover:text-white disabled:opacity-50"
                >
                  {nl.state === 'loading' ? 'Subscribing...' : newsletterCopy.submitLabel}
                </button>
              </form>

              <p className="mt-5 text-[0.6875rem] text-[var(--stone)] leading-relaxed border-t border-[var(--line)] pt-4">
                {newsletterCopy.privacyNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
