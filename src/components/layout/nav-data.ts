import { services } from '@/data/services';

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description: string }[];
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: services.map((s) => ({
      label: s.title,
      href: `/services/${s.slug}`,
      description: s.navDescription,
    })),
  },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];
