/**
 * Form submission boundary.
 *
 * No mail service or newsletter provider is connected to this project yet, so
 * nothing here pretends a message was delivered. Each function posts to an
 * endpoint only when one has actually been configured, and otherwise reports
 * `configured: false` so the interface can tell the user the truth and offer a
 * direct route instead.
 *
 * To connect a backend, set the corresponding environment variable and the
 * existing UI will start using it without further changes:
 *
 *   NEXT_PUBLIC_CONTACT_ENDPOINT     — receives the contact enquiry payload
 *   NEXT_PUBLIC_NEWSLETTER_ENDPOINT  — receives the subscription payload
 *
 * Both endpoints are expected to accept `POST` with a JSON body and to answer
 * with a 2xx status on success.
 */

import { contact } from '@/data/site';

const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
const NEWSLETTER_ENDPOINT = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;

export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export interface NewsletterPayload {
  email: string;
}

export interface SubmitResult {
  ok: boolean;
  /** False when no backend has been configured for this form. */
  configured: boolean;
  message: string;
}

const NOT_CONFIGURED_CONTACT =
  `This form is not yet connected to a mail service, so your message has not been sent. ` +
  `Please write to ${contact.email} or call ${contact.phone} and we will respond directly.`;

const NOT_CONFIGURED_NEWSLETTER =
  `Subscriptions are not yet connected to a mailing service, so you have not been added. ` +
  `Email ${contact.email} to be added to the distribution list.`;

const GENERIC_FAILURE =
  `We could not submit that just now. Please try again, or write to ${contact.email}.`;

async function post(endpoint: string, body: unknown): Promise<boolean> {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function submitContactEnquiry(
  payload: ContactPayload,
): Promise<SubmitResult> {
  if (!CONTACT_ENDPOINT) {
    return { ok: false, configured: false, message: NOT_CONFIGURED_CONTACT };
  }

  const ok = await post(CONTACT_ENDPOINT, payload);
  return {
    ok,
    configured: true,
    message: ok
      ? 'Thank you — your message has been received. We will be in touch.'
      : GENERIC_FAILURE,
  };
}

export async function subscribeToNewsletter(
  payload: NewsletterPayload,
): Promise<SubmitResult> {
  if (!NEWSLETTER_ENDPOINT) {
    return { ok: false, configured: false, message: NOT_CONFIGURED_NEWSLETTER };
  }

  const ok = await post(NEWSLETTER_ENDPOINT, payload);
  return {
    ok,
    configured: true,
    message: ok
      ? 'Thank you — you have been added to the distribution list.'
      : GENERIC_FAILURE,
  };
}

/** Builds a prefilled mailto as the honest fallback while no backend exists. */
export function buildMailto(payload: Partial<ContactPayload>) {
  const subject = payload.company
    ? `Enquiry — ${payload.company}`
    : 'Enquiry via sofisam.com';

  const bodyLines = [
    payload.name ? `Name: ${payload.name}` : null,
    payload.company ? `Company: ${payload.company}` : null,
    payload.email ? `Email: ${payload.email}` : null,
    '',
    payload.message ?? '',
  ].filter((l) => l !== null);

  return `mailto:${contact.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
}
