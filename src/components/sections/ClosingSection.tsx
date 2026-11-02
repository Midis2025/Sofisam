'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Loader2, Mail, MapPin, Phone, Shield } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { contact, newsletterCopy } from '@/data/site';
import { useNewsletter } from './Newsletter';
import { submitContactEnquiry } from '@/lib/forms';

const EASE = [0.16, 1, 0.3, 1] as const;

export interface ClosingSectionProps {
  lines?: string[];
  body?: string;
}

/**
 * SOFISAM Premium Contact & Mandates CTA Section
 *
 * Impactful conversion chapter:
 * - Direct confidential enquiry submission path
 * - Direct communications channels (phone, email, DMCC headquarters address)
 * - Strategic perspectives newsletter subscription
 * - Strict verification feedback states
 */
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
      setContactError('Please complete all fields prior to transmission.');
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

  const headingText = lines ? lines.join(' ') : 'Reach out to discuss strategic opportunities.';
  const bodyText =
    body ||
    'Every enquiry is handled in strict confidence by the firm’s principals. We welcome confidential discussion regarding mandates, restructuring, or advisory requirements.';

  return (
    <section
      data-section="Contact"
      id="contact"
      className="relative bg-[var(--void)] py-20 sm:py-24 lg:py-28"
      aria-label="Contact and Newsletter"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Direct Confidential Form */}
          <div className="lg:col-span-7">
            <div className="kicker">
              <p className="t-label">
                Start a Conversation
              </p>
            </div>

            <h2 className="mt-eyebrow t-h2 text-[var(--ivory)] font-light leading-[1.08] max-w-[20ch]">
              {headingText}
            </h2>

            <p className="mt-4 t-body text-[var(--sage)] max-w-[50ch] leading-relaxed">
              {bodyText}
            </p>

            {/* Confidential Enquiry Form */}
            <form onSubmit={handleContactSubmit} noValidate className="mt-8 space-y-4 max-w-[40rem]">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="closing-name" className="block text-xs font-medium uppercase tracking-wider text-[var(--stone)] mb-2 font-mono">
                    Name &amp; Title
                  </label>
                  <input
                    id="closing-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Principal or Executive"
                    className="w-full rounded-none border border-[var(--line-strong)] bg-[var(--plate)] px-4 py-3 text-sm text-[var(--ivory)] placeholder-[var(--stone)]/60 focus:border-[var(--brass)] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="closing-email" className="block text-xs font-medium uppercase tracking-wider text-[var(--stone)] mb-2 font-mono">
                    Corporate Email
                  </label>
                  <input
                    id="closing-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="principal@institution.com"
                    className="w-full rounded-none border border-[var(--line-strong)] bg-[var(--plate)] px-4 py-3 text-sm text-[var(--ivory)] placeholder-[var(--stone)]/60 focus:border-[var(--brass)] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="closing-message" className="block text-xs font-medium uppercase tracking-wider text-[var(--stone)] mb-2 font-mono">
                  Advisory Requirement
                </label>
                <textarea
                  id="closing-message"
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline the nature of your mandate, cross-border restructuring, or advisory need..."
                  className="w-full rounded-none border border-[var(--line-strong)] bg-[var(--plate)] px-4 py-3 text-sm text-[var(--ivory)] placeholder-[var(--stone)]/60 focus:border-[var(--brass)] focus:outline-none transition-colors resize-none"
                />
              </div>

              {contactError && (
                <p className="text-xs text-red-600 dark:text-red-400 font-medium">{contactError}</p>
              )}

              {contactStatus === 'success' && (
                <div className="flex items-center gap-2.5 text-sm text-green-800 bg-green-50 dark:bg-green-950/40 dark:text-green-300 p-4 border border-green-200">
                  <Check className="h-4 w-4 shrink-0 text-green-600" />
                  <span>Your message has been received in confidence. A principal will respond directly.</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between gap-4 flex-wrap">
                <button
                  type="submit"
                  disabled={contactStatus === 'loading'}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-none bg-[var(--ivory)] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[var(--ink)] shadow-md transition-all duration-300 hover:bg-[var(--brass)] hover:text-white disabled:opacity-50"
                >
                  {contactStatus === 'loading' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Confidential Enquiry</span>
                      <ArrowUpRight aria-hidden strokeWidth={1.5} className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5 text-xs text-[var(--stone)]">
                  <Shield className="h-3.5 w-3.5 text-[var(--brass)]" />
                  <span>Unconflicted &amp; Strictly Confidential</span>
                </div>
              </div>
            </form>

            {/* Direct Channel Metadata */}
            <div className="mt-12 pt-8 border-t border-[var(--line)] grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wider text-[var(--stone)] font-mono">
                  Direct Line
                </p>
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="mt-1.5 inline-flex items-center gap-2 text-sm font-medium text-[var(--ivory)] hover:text-[var(--gold)] transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-[var(--brass)]" />
                  <span>{contact.phone}</span>
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-[var(--stone)] font-mono">
                  Confidential Email
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-1.5 inline-flex items-center gap-2 text-sm font-medium text-[var(--ivory)] hover:text-[var(--gold)] transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-[var(--brass)]" />
                  <span>{contact.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Newsletter Subscription & Registered Headquarters */}
          <div className="lg:col-span-5 space-y-8">
            {/* Newsletter Subscription Card */}
            <div className="p-8 sm:p-10 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-plate)]">
              <div className="flex items-center gap-2.5">
                <span className="h-px w-6 bg-[var(--brass)]" />
                <p className="t-label text-gold">
                  {newsletterCopy.heading}
                </p>
              </div>

              <h3 className="mt-4 t-card text-[var(--ivory)] font-light">
                Strategic Perspectives
              </h3>

              <p className="mt-3 t-small text-[var(--sage)] leading-relaxed">
                {newsletterCopy.standfirst}
              </p>

              <form onSubmit={nl.onSubmit} noValidate className="mt-6 space-y-3.5">
                <div>
                  <label htmlFor={`${nl.id}-email`} className="block text-xs font-medium uppercase tracking-wider text-[var(--stone)] mb-1.5 font-mono">
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
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium">Please enter a valid corporate email address.</p>
                )}

                {nl.state === 'success' && (
                  <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 p-3 border border-green-200">
                    <Check className="h-4 w-4 shrink-0" />
                    <span>Subscription confirmed. You will receive SOFISAM strategic perspectives.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={nl.state === 'loading'}
                  className="w-full rounded-none border border-[var(--line-strong)] bg-[var(--plate)] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[var(--ivory)] transition-all hover:border-[var(--brass)] hover:bg-[var(--brass)] hover:text-white disabled:opacity-50"
                >
                  {nl.state === 'loading' ? 'Subscribing...' : newsletterCopy.submitLabel}
                </button>
              </form>

              <p className="mt-6 text-[0.6875rem] text-[var(--stone)] leading-relaxed border-t border-[var(--line)] pt-4">
                {newsletterCopy.privacyNote}
              </p>
            </div>

            {/* Registered Headquarters Card */}
            <div className="p-7 rounded-[var(--r-lg)] border border-[var(--line-soft)] bg-[var(--plate)]/60">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--gold)] font-medium">
                <MapPin className="h-3.5 w-3.5 text-[var(--brass)]" />
                <span>DMCC Registered Office</span>
              </div>
              <p className="mt-2 text-sm text-[var(--ivory)] font-medium">
                {contact.address.line1}
              </p>
              <p className="text-xs text-[var(--sage)] leading-relaxed mt-1">
                {contact.address.line2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
