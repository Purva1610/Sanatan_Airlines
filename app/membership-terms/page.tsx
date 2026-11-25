import MembershipTermsPage from '../../src/airline/legalPages/MembershipTerms';
import PageSkin from '../../src/PageSkin.jsx';

export const metadata = {
  alternates: { canonical: '/membership-terms' },
  title: 'Sanatan International Club Membership Terms',
  description: 'Pre-approval status and the required terms for the Sanatan International Club membership concept.',
};

export default function Page() {
  return <PageSkin route="/membership-terms"><MembershipTermsPage /></PageSkin>;
}
