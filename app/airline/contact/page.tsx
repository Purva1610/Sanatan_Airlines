import type { Metadata } from 'next';
import ContactPage from '../../../src/airline/pages/ContactPage.jsx';
import PageSkin from '../../../src/PageSkin.jsx';

export const metadata: Metadata = {
  title: 'Contact Us | Sanatan Airlines',
  description: 'Multiple contact channels, airport office locations and complaint form.',
};

export default function Page() {
  return <PageSkin route="/airline/contact"><ContactPage /></PageSkin>;
}
