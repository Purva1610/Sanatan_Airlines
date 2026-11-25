import AccessibilityStatementPage from '../../src/airline/legalPages/AccessibilityStatement';
import PageSkin from '../../src/PageSkin.jsx';

export const metadata = {
  alternates: { canonical: '/accessibility' },
  title: 'Accessibility Statement',
  description: 'Sanatan Airlines\' commitment to WCAG 2.1 AA digital accessibility and physical accessibility for passengers with disabilities.',
};

export default function Page() {
  return <PageSkin route="/accessibility"><AccessibilityStatementPage /></PageSkin>;
}
