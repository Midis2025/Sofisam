import type { Metadata, Viewport } from 'next';
import { Inter, Newsreader } from 'next/font/google';

import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { Preloader, preloadInitScript } from '@/components/ui/Preloader';
import { themeInitScript } from '@/lib/theme-script';
import { site, contact } from '@/data/site';

/* Inter for everything that is read; Newsreader for everything that is
   seen. Newsreader is a contemporary text serif with an optical-size axis, so
   one family is refined at headline size and sturdy at a card title — the
   register of a financial house rather than a magazine. Both are variable
   and self-hosted at build time. */
const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const display = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  axes: ['opsz'],
  style: ['normal'],
});

export const viewport: Viewport = {
  // Rewritten by the theme script to match the theme actually in force.
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F6F2EA' },
    { media: '(prefers-color-scheme: dark)', color: '#F6F2EA' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: '%s | SOFISAM FZCO',
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  keywords: [
    'international strategic consulting Dubai',
    'corporate advisory Dubai',
    'strategic consulting DMCC',
    'international advisory firm Dubai',
    'corporate structuring Dubai',
    'SOFISAM FZCO',
  ],
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  description: site.description,
  email: contact.email,
  telephone: contact.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: contact.address.line1,
    addressLocality: contact.address.locality,
    addressRegion: contact.address.region,
    postalCode: contact.address.postalCode,
    addressCountry: contact.address.country,
  },
  areaServed: 'Worldwide',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // The theme script sets `data-theme` and `color-scheme` on this element
    // before hydration, which is the point of it.
    <html
      lang="en"
      className={`${sans.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Sets the theme before first paint, so the page never shows the
            wrong one first. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Decides before first paint whether the opening sequence runs, so
            the curtain is never painted over a page the visitor has already
            seen this session. */}
        <script dangerouslySetInnerHTML={{ __html: preloadInitScript }} />
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          // Structured data uses only values verified on sofisam.com.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
        <Preloader />
        <ScrollProgress />
        <Header />
        <PageTransition>
          <main id="main">{children}</main>
          <Footer />
        </PageTransition>
      </body>
    </html>
  );
}
