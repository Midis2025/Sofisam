import { NextResponse } from 'next/server';

interface EnquiryBody {
  fullName?: string;
  company?: string;
  email?: string;
  phone?: string;
  areaOfInterest?: string;
  requirement?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const VALID_AREAS = [
  // Enquiry modal
  'Strategic Consulting',
  'Advisory',
  'Structuring',
  'Investment / Mandate',
  // Closing "Private Enquiry" panel
  'Strategic Advisory',
  'Investor Relations',
  'Corporate Restructuring',
  'GCC / International Expansion',
  'Strategic Partnerships',
  'Other',
];

export async function POST(request: Request) {
  try {
    const body: EnquiryBody = await request.json();

    const fullName = body.fullName?.trim() || '';
    const company = body.company?.trim() || '';
    const email = body.email?.trim() || '';
    const phone = body.phone?.trim() || '';
    const areaOfInterest = body.areaOfInterest?.trim() || '';
    const requirement = body.requirement?.trim() || '';

    // Field validations
    const errors: Record<string, string> = {};

    if (!fullName || fullName.length < 2) {
      errors.fullName = 'Please provide your full name.';
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      errors.email = 'Please provide a valid business email address.';
    }

    if (!areaOfInterest || !VALID_AREAS.includes(areaOfInterest)) {
      errors.areaOfInterest = 'Please select a valid area of interest.';
    }

    if (!requirement || requirement.length < 10) {
      errors.requirement = 'Please briefly outline your requirements (at least 10 characters).';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, errors, message: 'Please correct the highlighted fields.' },
        { status: 400 },
      );
    }

    // Forward to external endpoint if configured
    const externalEndpoint =
      process.env.CONTACT_ENDPOINT || process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

    if (externalEndpoint) {
      try {
        const upstream = await fetch(externalEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: fullName,
            email,
            company,
            phone,
            areaOfInterest,
            message: requirement,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!upstream.ok) {
          console.warn('[Enquiry API] Upstream returned status:', upstream.status);
        }
      } catch (err) {
        console.error('[Enquiry API] Failed to forward to upstream:', err);
      }
    }

    // In all environments, log enquiry metadata safely on the server side
    console.info(
      `[Enquiry Received] Area: "${areaOfInterest}" | Contact: "${fullName}" <${email}> | Org: "${company || 'N/A'}"`,
    );

    return NextResponse.json(
      {
        ok: true,
        message: 'Your enquiry has been received in strict confidence. A member of the SOFISAM team will review and respond directly.',
      },
      { status: 200 },
    );
  } catch (err) {
    console.error('[Enquiry API Error]:', err);
    return NextResponse.json(
      {
        ok: false,
        message: 'An error occurred while processing your enquiry. Please try again or contact info@sofisam.com.',
      },
      { status: 500 },
    );
  }
}

