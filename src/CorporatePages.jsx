'use client';

import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SiteFooter, SiteHeader } from './SiteChrome.jsx';
import { FaqStructuredData } from './SeoStructuredData.jsx';
import CompanyPage, { hasCompanyPage } from './CompanyPages.jsx';

const content = {
  '/partners': {
    eyebrow: 'PARTNERS & CREDENTIALS',
    title: 'Trust requires permission and verification.',
    description: 'Partner names, operator details, credentials and logos are shared only when verified, relevant and approved for publication.',
    sections: [['Partner disclosure', 'No partner logos or endorsements are displayed. For regulated or operator-delivered services, request the provider identity and applicable authorization before engagement.']],
    action: ['Partner enquiry', '/partners/enquiry'],
  },
  '/compliance': {
    eyebrow: 'GOVERNANCE & COMPLIANCE',
    title: 'Clear boundaries are part of good service.',
    description: 'The site is an information and enquiry platform. It is not a booking engine, emergency dispatch service, recruitment guarantee or regulated investment-advice service.',
    sections: [
      ['Aviation', 'Sanatan Airlines does not represent that it operates scheduled airline services, owns aircraft or holds an NSOP permit. Flights require confirmation by an appropriately licensed operating partner.'],
      ['Regulated services', 'Employment, immigration, education, property and investment outcomes are not guaranteed. Regulated delivery must be performed by appropriately authorized entities.'],
      ['Content approval', 'Pricing, service availability, partner credentials and legal terms are published only after approval by the responsible business owner and relevant reviewers.'],
    ],
    action: ['View aviation disclaimer', '/aviation-disclaimer'],
  },
  '/insights': {
    eyebrow: 'INSIGHTS',
    title: 'Editorial content is being prepared.',
    description: 'Aviation explainers, travel guides and company updates will appear here after editorial and compliance review.',
    sections: [['No articles published', 'There are no approved articles available yet. We will not publish duplicate or placeholder destination pages.']],
  },
  '/faqs': {
    eyebrow: 'FREQUENTLY ASKED QUESTIONS',
    title: 'A few useful answers before you enquire.',
    description: 'General information about how Sanatan services and enquiries work.',
    faqs: [
      ['Does an enquiry confirm a booking?', 'No. An enquiry is not a booking, price confirmation or guarantee of availability. Relevant operators and terms are confirmed individually.'],
      ['Does Sanatan operate scheduled flights or own aircraft?', 'This website does not represent that Sanatan operates scheduled airline services, owns aircraft or holds an NSOP permit. Flight services require a licensed operating partner.'],
      ['Are membership prices and benefits finalized?', 'No. International Club pricing, benefits, eligibility and entitlements remain subject to approved terms.'],
      ['Can this website handle an emergency?', 'No. The air ambulance form is not emergency dispatch. For urgent help, contact local emergency services.'],
      ['Are jobs, admissions, visas or investment returns guaranteed?', 'No. Employment, admission, immigration, investment and property outcomes are not guaranteed.'],
    ],
  },
  '/terms-and-conditions': { eyebrow: 'TERMS OF USE', title: 'Terms of Use are pending legal review.', description: 'The final Terms of Use will be published after approval by Sanatan Legal.', sections: [['Pre-launch status', 'Do not rely on this website as a contract, booking, offer or confirmation of a service.']] },
  '/cookie-policy': { eyebrow: 'COOKIE POLICY', title: 'Cookie information is pending legal review.', description: 'The final cookie and analytics notice will be published after the applicable tracking and consent configuration is approved.', sections: [['Current analytics', 'Analytics is disabled unless a measurement ID, approved privacy configuration and explicit user consent are all present.']] },
  '/cancellation-refund-policy': { eyebrow: 'CANCELLATION & REFUND', title: 'Cancellation and refund terms are pending approval.', description: 'Service-specific cancellation and refund terms must be approved and provided before a customer makes a commitment.', sections: [['Pre-launch status', 'No cancellation or refund entitlement is implied by this website.']] },
  '/aviation-disclaimer': { eyebrow: 'AVIATION DISCLAIMER', title: 'Flight services require operator confirmation.', description: 'This website does not display live aircraft availability, instant pricing or confirmed booking capability.', sections: [['Operating partner', 'Where relevant, the licensed operating partner and applicable licensing details must be identified before a flight is confirmed. Sanatan Airlines does not represent that it owns aircraft or holds an NSOP permit.'], ['Emergency requests', 'The air ambulance enquiry form is not emergency dispatch. For urgent help, call local emergency services.']] },
  '/accessibility': { eyebrow: 'ACCESSIBILITY', title: 'Accessibility information and feedback.', description: 'The site is being developed with keyboard access, visible focus, semantic controls and reduced-motion support. A formal WCAG 2.2 AA audit has not yet been completed.', sections: [['Request assistance', 'For accessibility help or to report a barrier, use the general contact form. Please do not include sensitive personal information.']], action: ['Contact the team', '/contact'] },
  '/grievance-redressal': { eyebrow: 'GRIEVANCE & COMPLAINTS', title: 'Grievance contact details are pending approval.', description: 'A designated grievance contact and escalation process will be published after Operations and Legal approval.', sections: [['Non-urgent enquiries', 'For a non-urgent service question, use the contact form. This website is not an emergency support channel.']], action: ['Submit a general enquiry', '/contact'] },
};

function CorporateHeader() {
  return <SiteHeader />;
}

export default function CorporatePage() {
  const pathname = usePathname() || '/about';
  if (hasCompanyPage(pathname)) return <CompanyPage pathname={pathname} />;
  const page = content[pathname];
  if (!page) return <div className="corporate-page"><CorporateHeader /><main className="corporate-content"><span className="eyebrow">CONTENT</span><h1>Information pending approval.</h1></main><SiteFooter /></div>;

  return (
    <div className="corporate-page">
      <CorporateHeader />
      <main id="main">
        {(
          <section className="corporate-content">
            <span className="eyebrow">{page.eyebrow}</span><h1>{page.title}</h1><p className="corporate-lede">{page.description}</p>
            {page.sections && <div className="corporate-sections">{page.sections.map(([title, copy]) => <article key={title}><h2>{title}</h2><p>{copy}</p></article>)}</div>}
            {page.faqs && <div className="corporate-faqs">{page.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>}
            {page.faqs && <FaqStructuredData items={page.faqs} />}
            {page.action && <a className="button button-dark" href={page.action[1]}>{page.action[0]} <ArrowUpRight size={15} /></a>}
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
