import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../src/SiteChrome.jsx';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

const destinations = [
  ['Aviation services', '/aviation', 'Charter, helicopter, air ambulance and aircraft advisory.'],
  ['International Club', '/club', 'Travel membership for families and individuals.'],
  ['Tirth Yatra', '/tirth-yatra', 'Pilgrimage journeys, coordinated with care.'],
  ['Global Services', '/global-services', 'Education, employment, business and more.'],
];

export default function NotFound() {
  return (
    <div className="co-page">
      <SiteHeader />
      <main id="main" className="nf-main">
        <div className="co-container">
          <span className="co-eyebrow">404 · Page not found</span>
          <h1>This page isn’t here.</h1>
          <p className="nf-lede">The link may be out of date or the address mistyped. These are good places to continue:</p>
          <ul className="nf-links">
            {destinations.map(([label, href, copy]) => (
              <li key={href}><a href={href}><strong>{label}</strong><span>{copy}</span></a></li>
            ))}
          </ul>
          <p className="nf-help">Looking for something specific? <a href="/contact">Contact us</a> or <a href="/enquire">send an enquiry</a>.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
