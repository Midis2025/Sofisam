/**
 * Form submission boundary.
 *
 * Connected to the SOFISAM production backend API:
 * - Private Enquiry:  POST /api/public/enquiries/private
 * - General Contact:  POST /api/public/enquiries/contact
 * - Newsletter:       POST /api/public/newsletter
 *
 * Environment variables allow overriding backend endpoints if needed:
 *   NEXT_PUBLIC_BACKEND_URL                 — base URL (default: https://sofisam-backend.vercel.app)
 *   NEXT_PUBLIC_PRIVATE_ENQUIRY_ENDPOINT    — override private enquiry endpoint
 *   NEXT_PUBLIC_CONTACT_ENDPOINT            — override contact enquiry endpoint
 *   NEXT_PUBLIC_NEWSLETTER_ENDPOINT         — override newsletter endpoint
 */

import { contact } from '@/data/site';

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'https://sofisam-backend.vercel.app';

const PRIVATE_ENQUIRY_ENDPOINT =
  process.env.NEXT_PUBLIC_PRIVATE_ENQUIRY_ENDPOINT ||
  `${BACKEND_URL}/api/public/enquiries/private`;

const CONTACT_ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ||
  `${BACKEND_URL}/api/public/enquiries/contact`;

const NEWSLETTER_ENDPOINT =
  process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT ||
  `${BACKEND_URL}/api/public/newsletter`;

export interface ContactPayload {
  name?: string;
  fullName?: string;
  email: string;
  company?: string;
  organisation?: string;
  message: string;
  sourcePage?: string;
  _hp?: string;
}

export interface EnquiryPayload {
  fullName?: string;
  name?: string;
  nameAndTitle?: string;
  company?: string;
  organisation?: string;
  email: string;
  phone?: string;
  areaOfInterest?: string;
  area?: string;
  requirement?: string;
  message?: string;
  sourcePage?: string;
  _hp?: string;
}

export interface NewsletterPayload {
  email: string;
  consent?: boolean;
  sourcePage?: string;
  _hp?: string;
}

export interface SubmitResult {
  ok: boolean;
  /** False when no backend has been configured or reached for this form. */
  configured: boolean;
  message: string;
  reference?: string;
  errors?: Record<string, string>;
}

const GENERIC_FAILURE =
  `We could not submit that just now. Please try again, or write to ${contact.email}.`;

/**
 * Submits a private office / institutional enquiry to the production backend.
 * Endpoint: POST /api/public/enquiries/private
 */
export async function submitPrivateEnquiry(
  payload: EnquiryPayload,
): Promise<SubmitResult> {
  const clientName = (payload.name || payload.fullName || payload.nameAndTitle || '').trim();
  const org = (payload.organisation || payload.company || '').trim();
  const areaVal = (payload.area || payload.areaOfInterest || 'Strategic Advisory').trim();
  const requirementMsg = (payload.message || payload.requirement || '').trim();

  const body = {
    name: clientName,
    fullName: clientName,
    email: payload.email.trim().toLowerCase(),
    organisation: org || undefined,
    company: org || undefined,
    area: areaVal,
    areaOfInterest: areaVal,
    message: requirementMsg,
    requirement: requirementMsg,
    phone: payload.phone?.trim() || undefined,
    sourcePage:
      payload.sourcePage ||
      (typeof window !== 'undefined'
        ? window.location.href
        : 'https://sofisam-seven.vercel.app/'),
    _hp: payload._hp || '',
  };

  try {
    const res = await fetch(PRIVATE_ENQUIRY_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);

    if (res.ok && (data?.success || data?.ok)) {
      return {
        ok: true,
        configured: true,
        reference: data?.enquiryReference || data?.data?.referenceId,
        message:
          data?.message ||
          'Thank you. Your enquiry has been received confidentially.',
      };
    }

    return {
      ok: false,
      configured: true,
      message: data?.error || data?.message || GENERIC_FAILURE,
      errors: data?.errors,
    };
  } catch (err) {
    console.error('submitPrivateEnquiry error:', err);
    return {
      ok: false,
      configured: true,
      message: GENERIC_FAILURE,
    };
  }
}

/**
 * Submits a general corporate contact enquiry to the production backend.
 * Endpoint: POST /api/public/enquiries/contact
 */
export async function submitContactEnquiry(
  payload: ContactPayload,
): Promise<SubmitResult> {
  const clientName = (payload.name || payload.fullName || '').trim();
  const org = (payload.company || payload.organisation || '').trim();
  const msg = payload.message.trim();

  const body = {
    name: clientName,
    fullName: clientName,
    email: payload.email.trim().toLowerCase(),
    company: org || undefined,
    organisation: org || undefined,
    message: msg,
    sourcePage:
      payload.sourcePage ||
      (typeof window !== 'undefined'
        ? window.location.href
        : 'https://sofisam-seven.vercel.app/contact'),
    _hp: payload._hp || '',
  };

  try {
    const res = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);

    if (res.ok && (data?.success || data?.ok)) {
      return {
        ok: true,
        configured: true,
        reference: data?.enquiryReference || data?.data?.referenceId,
        message:
          data?.message ||
          'Your message has been sent. A SOFISAM representative will respond promptly.',
      };
    }

    return {
      ok: false,
      configured: true,
      message: data?.error || data?.message || GENERIC_FAILURE,
    };
  } catch (err) {
    console.error('submitContactEnquiry error:', err);
    return {
      ok: false,
      configured: true,
      message: GENERIC_FAILURE,
    };
  }
}

/**
 * Subscribes an email to the SOFISAM strategic intelligence newsletter.
 * Endpoint: POST /api/public/newsletter
 */
export async function subscribeToNewsletter(
  payload: NewsletterPayload,
): Promise<SubmitResult> {
  const body = {
    email: payload.email.trim().toLowerCase(),
    consent: payload.consent ?? true,
    sourcePage:
      payload.sourcePage ||
      (typeof window !== 'undefined'
        ? window.location.href
        : 'https://sofisam-seven.vercel.app/'),
    _hp: payload._hp || '',
  };

  try {
    const res = await fetch(NEWSLETTER_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);

    if (res.ok && (data?.success || data?.ok)) {
      return {
        ok: true,
        configured: true,
        message:
          data?.message ||
          'Thank you for subscribing to SOFISAM Strategic Insights.',
      };
    }

    return {
      ok: false,
      configured: true,
      message: data?.error || data?.message || GENERIC_FAILURE,
    };
  } catch (err) {
    console.error('subscribeToNewsletter error:', err);
    return {
      ok: false,
      configured: true,
      message: GENERIC_FAILURE,
    };
  }
}

/** Builds a prefilled mailto as the honest fallback if needed. */
export function buildMailto(payload: Partial<ContactPayload>) {
  const subject = payload.company || payload.organisation
    ? `Enquiry — ${payload.company || payload.organisation}`
    : 'Enquiry via sofisam.com';

  const bodyLines = [
    payload.name || payload.fullName ? `Name: ${payload.name || payload.fullName}` : null,
    payload.company || payload.organisation ? `Company: ${payload.company || payload.organisation}` : null,
    payload.email ? `Email: ${payload.email}` : null,
    '',
    payload.message ?? '',
  ].filter((l) => l !== null);

  return `mailto:${contact.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
}
