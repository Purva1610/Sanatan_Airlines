import PrivacyPolicyPage from '../../src/airline/legalPages/PrivacyPolicy';
import PageSkin from '../../src/PageSkin.jsx';

export const metadata = {
  alternates: { canonical: '/privacy-policy' },
  title: 'Privacy Policy',
  description: 'How Sanatan Airlines collects, uses and protects your personal data. Prepared with reference to the IT Act, 2000 and applicable Indian privacy rules.',
};

export default function Page() {
  return <PageSkin route="/privacy-policy"><PrivacyPolicyPage /></PageSkin>;
}
