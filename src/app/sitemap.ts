import type { MetadataRoute } from 'next';

import { site } from '@/data/site';
import { services } from '@/data/services';
import { insights } from '@/data/insights';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: '', priority: 1, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'yearly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'yearly' as const },
    { path: '/insights', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'yearly' as const },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
    ...insights.map((i) => ({
      url: `${site.url}/insights/${i.slug}`,
      lastModified: new Date(i.isoDate),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
