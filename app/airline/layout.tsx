import type { Metadata } from 'next';
import type { ReactNode } from 'react';

/*
 * The /airline section is kept out of search (noindex) until its content is reviewed: its pages lack
 * unique titles/descriptions and describe scheduled-airline operations the company does not run.
 * Links are still followed. Remove this block once the section is approved for indexing.
 */
export const metadata: Metadata = { robots: { index: false, follow: true } };
import '../../src/airline/airline.css';
// Airline-only styles (moved out of the root layout so other pages do not load them — brief §12.1)
import '../../src/flagship.css';
import '../../src/book-flight.css';
import '../../src/airline/airline-premium.css';

export default function AirlineLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/*
        Load all Indian-script Noto fonts in a single Google Fonts request.
        display=swap ensures text remains visible during font load.
        Fonts are loaded at this layout level so they apply to all /airline/* pages.
      */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href={[
          'https://fonts.googleapis.com/css2?',
          // Latin / base UI
          'family=Manrope:wght@400;500;600;700;800&',
          'family=DM+Sans:wght@400;500;600;700&',
          "family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&",
          // Devanagari — Hindi, Marathi, Sanskrit
          'family=Noto+Sans+Devanagari:wght@400;500;700&',
          'family=Hind:wght@400;600;700&',
          // Bengali + Assamese
          'family=Noto+Sans+Bengali:wght@400;600;700&',
          // Telugu
          'family=Noto+Sans+Telugu:wght@400;600;700&',
          // Tamil
          'family=Noto+Sans+Tamil:wght@400;600;700&',
          // Gujarati
          'family=Noto+Sans+Gujarati:wght@400;600;700&',
          // Kannada
          'family=Noto+Sans+Kannada:wght@400;600;700&',
          // Malayalam
          'family=Noto+Sans+Malayalam:wght@400;600;700&',
          // Punjabi (Gurmukhi)
          'family=Noto+Sans+Gurmukhi:wght@400;600;700&',
          // Odia
          'family=Noto+Sans+Oriya:wght@400;600;700&',
          // Urdu (Nastaliq)
          'family=Noto+Nastaliq+Urdu:wght@400;700&',
          'display=swap',
        ].join('')}
        rel="stylesheet"
      />
      <div style={{
        background: '#fff7ed',
        borderBottom: '1px solid #fdd8b3',
        color: '#6b4a2e',
        fontSize: 12,
        lineHeight: 1.5,
        padding: '8px 16px',
        textAlign: 'center',
      }}>
        Aviation enquiries are coordinated through licensed operators. This website does not confirm aircraft availability or represent scheduled airline operations.
      </div>
      {children}
    </>
  );
}
