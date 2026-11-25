import type { Metadata } from 'next';
import CheckInPage from '../../../src/airline/pages/CheckInPage.jsx';
import PageSkin from '../../../src/PageSkin.jsx';

export const metadata: Metadata = {
  title: 'Check-in Online | Sanatan Airlines',
  description: 'Check in online from 48 hours before your flight. Get your mobile boarding pass.',
};

export default function Page() {
  return <PageSkin route="/airline/check-in"><CheckInPage /></PageSkin>;
}
