import CancellationRefundPolicyPage from '../../src/airline/legalPages/CancellationRefundPolicy';
import PageSkin from '../../src/PageSkin.jsx';

export const metadata = {
  alternates: { canonical: '/cancellation-refund-policy' },
  title: 'Cancellation & Refund Policy',
  description: 'Sanatan Airlines cancellation fees, refund timelines and special circumstances policy by fare type.',
};

export default function Page() {
  return <PageSkin route="/cancellation-refund-policy"><CancellationRefundPolicyPage /></PageSkin>;
}
