import type { Metadata } from 'next';
import ManageBookingPage from '../../../src/airline/pages/ManageBookingPage.jsx';
import PageSkin from '../../../src/PageSkin.jsx';

export const metadata: Metadata = {
  title: 'Manage Booking | Sanatan Airlines',
  description: 'Change flights, add baggage, select seats and upgrade your cabin.',
};

export default function Page() {
  return <PageSkin route="/airline/manage-booking"><ManageBookingPage /></PageSkin>;
}
