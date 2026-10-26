import type { Metadata } from 'next';

import { Hero } from '@/components/sections/Hero';
import { BrandStatement } from '@/components/sections/BrandStatement';
import { OurWork } from '@/components/sections/OurWork';
import { ServiceShowcase } from '@/components/sections/ServiceShowcase';
import { ExecutivePerspective } from '@/components/sections/ExecutivePerspective';
import { GlobalPerspective } from '@/components/sections/GlobalPerspective';
import { AdvisoryPrinciples } from '@/components/sections/AdvisoryPrinciples';
import { DubaiSection } from '@/components/sections/DubaiSection';
import { ProcessNarrative } from '@/components/sections/ProcessNarrative';
import { InsightsEditorial } from '@/components/sections/InsightsEditorial';
import { ClosingSection } from '@/components/sections/ClosingSection';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: site.title,
    description: site.description,
    url: '/',
  },
};

/**
 * The homepage reads as one argument, in the order a principal would want it
 * made: who the firm is, what it does, where it stands, who gives the advice,
 * how the work proceeds, what it is brought into, how far it reaches, the
 * terms it holds itself to, what it is thinking about, and how to begin.
 * Grounds alternate between the three ivory tones, with one dark cinematic
 * chapter (Mandates & Investments), and no two neighbours share a composition.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <ServiceShowcase />
      <DubaiSection />
      <ExecutivePerspective />
      <ProcessNarrative />
      <OurWork />
      <GlobalPerspective />
      <AdvisoryPrinciples />
      <InsightsEditorial />
      <ClosingSection />
    </>
  );
}
