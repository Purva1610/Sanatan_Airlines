import type { Metadata } from 'next';
import BaggagePage from '../../../src/airline/pages/BaggagePage.jsx';
import PageSkin from '../../../src/PageSkin.jsx';

export const metadata: Metadata = {
  title: 'Baggage Information | Sanatan Airlines',
  description: 'Cabin and checked baggage allowances by cabin class, restricted items and sports equipment.',
};

export default function Page() {
  return <PageSkin route="/airline/baggage"><BaggagePage /></PageSkin>;
}
