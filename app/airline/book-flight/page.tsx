import type { Metadata } from 'next';
import BookFlightPage from '../../../src/airline/pages/BookFlightPage.jsx';
import PageSkin from '../../../src/PageSkin.jsx';

export const metadata: Metadata = {
  title: 'Book a Flight | Sanatan Airlines',
  description: 'Advanced flight search with flexible dates, fare calendar and instant confirmation.',
};

export default function Page() {
  return <PageSkin route="/airline/book-flight"><BookFlightPage /></PageSkin>;
}
