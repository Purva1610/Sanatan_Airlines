import type { Metadata } from 'next';
import DestinationsPage from '../../../src/airline/pages/DestinationsPage.jsx';
import PageSkin from '../../../src/PageSkin.jsx';

export const metadata: Metadata = {
  title: 'Destinations | Sanatan Airlines',
  description: '85 destinations across 6 continents. Explore our global network.',
};

export default function Page() {
  return <PageSkin route="/airline/destinations"><DestinationsPage /></PageSkin>;
}
