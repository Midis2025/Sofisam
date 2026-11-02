'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

import { useEnquiryModal } from '@/context/EnquiryModalContext';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { submitPrivateEnquiry, type EnquiryPayload } from '@/lib/forms';

const AREAS_OF_INTEREST = [
  'Strategic Consulting',
  'Advisory',
  'Structuring',
  'Investment / Mandate',
  'Other',
];

interface FormErrors {
  fullName?: string;
  email?: string;
  areaOfInterest?: string;
  requirement?: string;
}

export function EnquiryModal() {
  const { isOpen, closeEnquiryModal, areaOfInterest: initialArea, triggerElementRef } =
    useEnquiryModal();
  const reduce = useReducedMotion();

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [areaOfInterest, setAreaOfInterest] = useState('Strategic Consulting');
  const [requirement, setRequirement] = useState('');

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  // Sync initial area of interest when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialArea && AREAS_OF_INTEREST.includes(initialArea)) {
        setAreaOfInterest(initialArea);
      } else if (initialArea === 'Corporate Advisory') {
        setAreaOfInterest('Advisory');
      }
      setIsSuccess(false);
      setServerError('');
    }
  }, [isOpen, initialArea]);

  // Lock background body scroll
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Autofocus name input after short delay for animation
    const timer = setTimeout(() => {
      nameInputRef.current?.focus();
    }, 120);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;

      // Return focus to trigger element
      if (triggerElementRef.current) {
        triggerElementRef.current.focus();
      }
    };
  }, [isOpen, triggerElementRef]);

  // Handle Keyboard interactions (Escape to close, Tab trap)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Validation function
  const validate = () => {
    const newErrors: FormErrors = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Please provide your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = 'Please provide a valid business email address.';
    }

    if (!areaOfInterest || !AREAS_OF_INTEREST.includes(areaOfInterest)) {
      newErrors.areaOfInterest = 'Please select your area of interest.';
    }

    if (!requirement.trim() || requirement.trim().length < 10) {
      newErrors.requirement = 'Please briefly describe your requirement (at least 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      areaOfInterest: true,
      requirement: true,
    });

    if (!validate()) return;

    setIsSubmitting(true);
    setServerError('');

    const payload: EnquiryPayload = {
      fullName: fullName.trim(),
      company: company.trim() || undefined,
      email: email.trim(),
      phone: phone.trim() || undefined,
      areaOfInterest,
      requirement: requirement.trim(),
    };

    const res = await submitPrivateEnquiry(payload);
    setIsSubmitting(false);

    if (res.ok) {
      setIsSuccess(true);
      // Reset form values
      setFullName('');
      setCompany('');
      setEmail('');
      setPhone('');
      setRequirement('');
      setTouched({});
      setErrors({});
    } else {
      setServerError(
        res.message || 'An error occurred while submitting your enquiry. Please try again.',
      );
    }
  };

  const handleClose = () => {
    closeEnquiryModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
          aria-labelledby="enquiry-modal-title"
          aria-describedby="enquiry-modal-desc"
          role="dialog"
          aria-modal="true"
        >
          {/* Subtle Background Overlay (Fades in) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          {/* Modal Container: 850–1050px desktop, near-full-width mobile */}
          <motion.div
            ref={modalRef}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-[940px] max-h-[92vh] overflow-y-auto rounded-[var(--r-md)] border border-[var(--line)] bg-[#FAF7F2] text-[var(--ivory)] shadow-2xl transition-all"
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClose}
              aria-label="Close enquiry modal"
              className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--line)] bg-[#FAF7F2] text-[var(--stone)] hover:text-[var(--ivory)] hover:border-[var(--line-strong)] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--brass)]"
            >
              <X className="h-4 w-4" />
            </button>

            {isSuccess ? (
              /* Success Confirmation Screen */
              <div className="p-8 sm:p-14 text-center max-w-xl mx-auto my-auto">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--line-soft)] text-[var(--brass)] mb-6">
                  <CheckCircle2 className="h-6 w-6 text-[var(--brass)]" />
                </div>

                <p className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[var(--brass)]">
                  ENQUIRY RECEIVED
                </p>

                <h3 className="mt-3 font-display text-2xl sm:text-3xl font-light text-[var(--ivory)]">
                  Thank you for contacting SOFISAM.
                </h3>

                <p className="mt-4 text-sm sm:text-base text-[var(--sage)] leading-relaxed">
                  A member of our team will review your enquiry and respond directly.
                </p>

                <div className="mt-8 pt-6 border-t border-[var(--line-soft)]">
                  <Button
                    variant="primary"
                    onClick={handleClose}
                  >
                    BACK TO WEBSITE
                  </Button>
                </div>
              </div>
            ) : (
              /* Two-Column Desktop Layout (Stack on Mobile) */
              <div className="grid md:grid-cols-12 items-stretch">
                {/* LEFT SIDE: Brand, Context, Scope */}
                <div className="md:col-span-5 bg-[#F4EFE6] border-b md:border-b-0 md:border-r border-[var(--line)] p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    {/* Small SOFISAM logo */}
                    <div className="mb-8">
                      <Logo alt="SOFISAM FZCO" className="h-7 w-auto" />
                    </div>

                    <p className="text-[0.6875rem] font-mono font-semibold uppercase tracking-[0.2em] text-[var(--brass)]">
                      PRIVATE ENQUIRY
                    </p>

                    <h2
                      id="enquiry-modal-title"
                      className="mt-3 font-display text-2xl sm:text-3xl text-[var(--ivory)] font-light leading-snug"
                    >
                      Let&apos;s discuss your next strategic move.
                    </h2>

                    <p
                      id="enquiry-modal-desc"
                      className="mt-4 text-xs sm:text-sm text-[var(--sage)] leading-relaxed"
                    >
                      Tell us briefly about your requirements. A member of the SOFISAM team will
                      review your enquiry and respond directly.
                    </p>
                  </div>

                  {/* Bottom Reach Marker */}
                  <div className="mt-8 pt-6 border-t border-[var(--line)]">
                    <p className="text-[0.625rem] font-mono tracking-widest text-[var(--stone)] uppercase leading-relaxed">
                      DUBAI · MIDDLE EAST · EUROPE · ASIA · AMERICAS
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE: The Confidential Enquiry Form */}
                <div className="md:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* Row 1: Full Name * & Company / Organisation */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="enquiry-name"
                          className="block text-xs font-mono uppercase tracking-wider text-[var(--stone)] mb-1.5"
                        >
                          Full Name <span className="text-[var(--brass)]">*</span>
                        </label>
                        <input
                          ref={nameInputRef}
                          id="enquiry-name"
                          name="fullName"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) validate();
                          }}
                          onBlur={() => handleBlur('fullName')}
                          placeholder="Your Name"
                          className={`w-full min-h-[48px] rounded-none border bg-white px-3.5 py-2.5 text-sm text-[var(--ivory)] placeholder-[var(--stone)]/60 transition-colors focus:outline-none ${
                            touched.fullName && errors.fullName
                              ? 'border-red-500 focus:border-red-600'
                              : 'border-[var(--line)] focus:border-[var(--brass)]'
                          }`}
                        />
                        {touched.fullName && errors.fullName && (
                          <p className="mt-1 text-xs text-red-600 font-sans">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="enquiry-company"
                          className="block text-xs font-mono uppercase tracking-wider text-[var(--stone)] mb-1.5"
                        >
                          Company / Organisation
                        </label>
                        <input
                          id="enquiry-company"
                          name="company"
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Organisation Name"
                          className="w-full min-h-[48px] rounded-none border border-[var(--line)] bg-white px-3.5 py-2.5 text-sm text-[var(--ivory)] placeholder-[var(--stone)]/60 transition-colors focus:border-[var(--brass)] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 2: Business Email * & Phone Number */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="enquiry-email"
                          className="block text-xs font-mono uppercase tracking-wider text-[var(--stone)] mb-1.5"
                        >
                          Business Email <span className="text-[var(--brass)]">*</span>
                        </label>
                        <input
                          id="enquiry-email"
                          name="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) validate();
                          }}
                          onBlur={() => handleBlur('email')}
                          placeholder="name@company.com"
                          className={`w-full min-h-[48px] rounded-none border bg-white px-3.5 py-2.5 text-sm text-[var(--ivory)] placeholder-[var(--stone)]/60 transition-colors focus:outline-none ${
                            touched.email && errors.email
                              ? 'border-red-500 focus:border-red-600'
                              : 'border-[var(--line)] focus:border-[var(--brass)]'
                          }`}
                        />
                        {touched.email && errors.email && (
                          <p className="mt-1 text-xs text-red-600 font-sans">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="enquiry-phone"
                          className="block text-xs font-mono uppercase tracking-wider text-[var(--stone)] mb-1.5"
                        >
                          Phone Number
                        </label>
                        <input
                          id="enquiry-phone"
                          name="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+971..."
                          className="w-full min-h-[48px] rounded-none border border-[var(--line)] bg-white px-3.5 py-2.5 text-sm text-[var(--ivory)] placeholder-[var(--stone)]/60 transition-colors focus:border-[var(--brass)] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 3: Area of Interest * (Select Dropdown) */}
                    <div>
                      <label
                        htmlFor="enquiry-area"
                        className="block text-xs font-mono uppercase tracking-wider text-[var(--stone)] mb-1.5"
                      >
                        Area of Interest <span className="text-[var(--brass)]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="enquiry-area"
                          name="areaOfInterest"
                          required
                          value={areaOfInterest}
                          onChange={(e) => {
                            setAreaOfInterest(e.target.value);
                            if (errors.areaOfInterest) validate();
                          }}
                          onBlur={() => handleBlur('areaOfInterest')}
                          className="w-full min-h-[48px] appearance-none rounded-none border border-[var(--line)] bg-white px-3.5 py-2.5 pr-10 text-sm text-[var(--ivory)] transition-colors focus:border-[var(--brass)] focus:outline-none cursor-pointer"
                        >
                          {AREAS_OF_INTEREST.map((opt) => (
                            <option key={opt} value={opt} className="py-1">
                              {opt}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[var(--stone)]">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {touched.areaOfInterest && errors.areaOfInterest && (
                        <p className="mt-1 text-xs text-red-600 font-sans">{errors.areaOfInterest}</p>
                      )}
                    </div>

                    {/* Row 4: Briefly tell us about your requirement * (Textarea) */}
                    <div>
                      <label
                        htmlFor="enquiry-requirement"
                        className="block text-xs font-mono uppercase tracking-wider text-[var(--stone)] mb-1.5"
                      >
                        Briefly tell us about your requirement{' '}
                        <span className="text-[var(--brass)]">*</span>
                      </label>
                      <textarea
                        id="enquiry-requirement"
                        name="requirement"
                        required
                        rows={3}
                        value={requirement}
                        onChange={(e) => {
                          setRequirement(e.target.value);
                          if (errors.requirement) validate();
                        }}
                        onBlur={() => handleBlur('requirement')}
                        placeholder="Please outline the nature of your mandate, context, or advisory requirements..."
                        className={`w-full rounded-none border bg-white px-3.5 py-2.5 text-sm text-[var(--ivory)] placeholder-[var(--stone)]/60 transition-colors resize-none focus:outline-none ${
                          touched.requirement && errors.requirement
                            ? 'border-red-500 focus:border-red-600'
                            : 'border-[var(--line)] focus:border-[var(--brass)]'
                        }`}
                      />
                      {touched.requirement && errors.requirement && (
                        <p className="mt-1 text-xs text-red-600 font-sans">{errors.requirement}</p>
                      )}
                    </div>

                    {/* Server Error Message */}
                    {serverError && (
                      <p className="text-xs text-red-600 font-medium py-1">{serverError}</p>
                    )}

                    {/* Submit CTA and Privacy Text */}
                    <div className="pt-2 space-y-3">
                      <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        loading={isSubmitting}
                        arrow="right"
                      >
                        SEND ENQUIRY
                      </Button>

                      <p className="text-[0.6875rem] text-[var(--stone)] leading-relaxed text-center sm:text-left">
                        Your information is treated confidentially and used only to respond to your
                        enquiry.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

