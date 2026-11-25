import type { Metadata } from 'next';
import FlightStatusPage from '../../../src/airline/pages/FlightStatusPage.jsx';
import PageSkin from '../../../src/PageSkin.jsx';

export const metadata: Metadata = {
  title: 'Flight Status | Sanatan Airlines',
  description: 'Real-time flight tracking and status board.',
};

export default function Page() {
  return <PageSkin route="/airline/flight-status"><FlightStatusPage /></PageSkin>;
}
