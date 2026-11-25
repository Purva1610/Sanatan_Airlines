import type { Metadata } from 'next';
import AboutPage from '../../../src/airline/pages/AboutPage.jsx';

export const metadata: Metadata = {
  title: 'About Us | Sanatan Airlines',
  description: 'Company story, mission, vision, leadership, awards and sustainability commitment.',
};

export default function Page() {
  // premium-keep: the premium theme layer intentionally skips the About page.
  return <div className="premium-keep" style={{ display: 'contents' }}><AboutPage /></div>;
}
