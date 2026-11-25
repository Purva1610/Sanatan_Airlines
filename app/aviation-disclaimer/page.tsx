import AviationDisclaimerPage from '../../src/airline/legalPages/AviationDisclaimer';
import PageSkin from '../../src/PageSkin.jsx';

export const metadata = {
  alternates: { canonical: '/aviation-disclaimer' },
  title: 'Aviation Disclaimer',
  description: 'Regulatory compliance notices, safety obligations and liability limitations applicable to all Sanatan Airlines operations.',
};

export default function Page() {
  return <PageSkin route="/aviation-disclaimer"><AviationDisclaimerPage /></PageSkin>;
}
