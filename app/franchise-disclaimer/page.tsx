import FranchiseDisclaimerPage from '../../src/airline/legalPages/FranchiseDisclaimer';
import PageSkin from '../../src/PageSkin.jsx';

export const metadata = {
  alternates: { canonical: '/franchise-disclaimer' },
  title: 'Franchise Disclaimer',
  description: 'Important public notice regarding authorised Sanatan Airlines operations and warning against fraudulent franchise solicitations.',
};

export default function Page() {
  return <PageSkin route="/franchise-disclaimer"><FranchiseDisclaimerPage /></PageSkin>;
}
