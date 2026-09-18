import type { Metadata } from 'next';

import { Hero } from '@/components/sections/Hero';
import { BrandStatement } from '@/components/sections/BrandStatement';
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
 * The homepage is a sequence rather than a stack of sections: a cinematic
 * opening, a statement on ivory, the disciplines on obsidian, the firm's
 * vantage point, two full-bleed passages carrying the city, the way it works,
 * the research index, and the closing band — the newsletter and the enquiry
 * as one composition. Grounds alternate and no two
 * consecutive sections share a composition.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <ServiceShowcase />
      <ExecutivePerspective />
      <GlobalPerspective />
      <AdvisoryPrinciples />
      <DubaiSection />
      <ProcessNarrative />
      <InsightsEditorial />
      <ClosingSection />
    </>
  );
}
