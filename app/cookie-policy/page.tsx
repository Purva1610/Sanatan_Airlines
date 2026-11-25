import CookiePolicyPage from '../../src/airline/legalPages/CookiePolicy';
import PageSkin from '../../src/PageSkin.jsx';

export const metadata = {
  alternates: { canonical: '/cookie-policy' },
  title: 'Cookie Policy',
  description: 'How Sanatan Airlines uses cookies and similar tracking technologies on its website and app.',
};

export default function Page() {
  return <PageSkin route="/cookie-policy"><CookiePolicyPage /></PageSkin>;
}
