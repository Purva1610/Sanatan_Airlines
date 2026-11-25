import TermsAndConditionsPage from '../../src/airline/legalPages/TermsAndConditions';
import PageSkin from '../../src/PageSkin.jsx';

export const metadata = {
  alternates: { canonical: '/terms-and-conditions' },
  title: 'Terms & Conditions',
  description: 'Terms and conditions governing use of Sanatan Airlines\' website, bookings and all airline services.',
};

export default function Page() {
  return <PageSkin route="/terms-and-conditions"><TermsAndConditionsPage /></PageSkin>;
}
