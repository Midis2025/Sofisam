import type { Metadata } from 'next';

import { Hero } from '@/components/sections/Hero';
import { BrandStatement } from '@/components/sections/BrandStatement';
import { ExpertiseSequence } from '@/components/sections/ExpertiseSequence';
import { GlobalPerspective } from '@/components/sections/GlobalPerspective';
import { ExecutivePerspective } from '@/components/sections/ExecutivePerspective';
import { AdvisoryPrinciples } from '@/components/sections/AdvisoryPrinciples';
import { DubaiSection } from '@/components/sections/DubaiSection';
import { ProcessNarrative } from '@/components/sections/ProcessNarrative';
import { InsightsEditorial } from '@/components/sections/InsightsEditorial';
import { Newsletter } from '@/components/sections/Newsletter';
import { CTASection } from '@/components/sections/CTASection';
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

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <ExpertiseSequence />
      <GlobalPerspective />
      <ExecutivePerspective />
      <AdvisoryPrinciples />
      <DubaiSection />
      <ProcessNarrative />
      <InsightsEditorial />
      <Newsletter />
      <CTASection />
    </>
  );
}
