import type { Metadata } from 'next';
import HomePage from '../../src/airline/pages/HomePage.jsx';
import PageSkin from '../../src/PageSkin.jsx';

export const metadata: Metadata = {
  title: { absolute: 'Sanatan Airlines | Fly Farther. Fly Better.' },
  description: 'India\'s most trusted airline connecting 85+ destinations across 6 continents. Book flights, manage bookings, check in online and earn SkyNova Miles.',
};

export default function AirlineHomePage() {
  return <PageSkin route="/airline"><HomePage /></PageSkin>;
}
