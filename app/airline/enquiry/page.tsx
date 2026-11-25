import type { Metadata } from 'next';
import EnquiryPageClient from './EnquiryPageClient.jsx';
import PageSkin from '../../../src/PageSkin.jsx';

export const metadata: Metadata = {
  title: 'Enquiry | Sanatan Airlines',
  description: 'Tell us what you need. Flight booking, group travel, cargo, special assistance and more — our team responds within 2 hours.',
};

export default function EnquiryPage() {
  return <PageSkin route="/airline/enquiry"><EnquiryPageClient /></PageSkin>;
}
