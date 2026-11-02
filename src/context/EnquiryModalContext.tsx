'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

interface EnquiryModalOptions {
  areaOfInterest?: string;
}

interface EnquiryModalContextType {
  isOpen: boolean;
  areaOfInterest: string;
  openEnquiryModal: (options?: EnquiryModalOptions) => void;
  closeEnquiryModal: () => void;
  triggerElementRef: React.MutableRefObject<HTMLElement | null>;
}

const EnquiryModalContext = createContext<EnquiryModalContextType | undefined>(undefined);

export function EnquiryModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [areaOfInterest, setAreaOfInterest] = useState('Strategic Consulting');
  const triggerElementRef = useRef<HTMLElement | null>(null);

  const openEnquiryModal = useCallback((options?: EnquiryModalOptions) => {
    // Record triggering element for accessibility focus restoration
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      triggerElementRef.current = document.activeElement;
    }

    if (options?.areaOfInterest) {
      setAreaOfInterest(options.areaOfInterest);
    }
    setIsOpen(true);
  }, []);

  const closeEnquiryModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <EnquiryModalContext.Provider
      value={{
        isOpen,
        areaOfInterest,
        openEnquiryModal,
        closeEnquiryModal,
        triggerElementRef,
      }}
    >
      {children}
    </EnquiryModalContext.Provider>
  );
}

export function useEnquiryModal() {
  const context = useContext(EnquiryModalContext);
  if (!context) {
    throw new Error('useEnquiryModal must be used within an EnquiryModalProvider');
  }
  return context;
}

