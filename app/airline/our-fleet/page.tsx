import type { Metadata } from 'next';
import FleetPage from '../../../src/airline/pages/FleetPage.jsx';
import PageSkin from '../../../src/PageSkin.jsx';

export const metadata: Metadata = {
  title: 'Our Fleet | Sanatan Airlines',
  description: 'Boeing 787, Airbus A350, A320neo and more — our 180-aircraft fleet.',
};

export default function Page() {
  return <PageSkin route="/airline/our-fleet"><FleetPage /></PageSkin>;
}
