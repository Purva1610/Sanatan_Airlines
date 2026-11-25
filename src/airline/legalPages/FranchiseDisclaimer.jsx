'use client';
import { LegalPage } from '../LegalPageLayout.jsx';

export default function FranchiseDisclaimerPage() {
  return (
    <LegalPage title="Franchise Disclaimer" lastUpdated="Pending legal approval">
      <div className="legal-content">
        <p><strong>This page is an information notice, not a franchise offer.</strong> No territory, investment amount, support commitment, earnings or approval is confirmed by the website or an enquiry.</p>
        <h2>Application only</h2>
        <p>Submitting an application does not create an offer, acceptance, territory right or contractual relationship. Any future programme must be documented by written agreements reviewed by Franchise, Legal and Finance.</p>
        <h2>No earnings guarantees</h2>
        <p>Revenue, profit, ROI and payback figures are not published unless they are legally substantiated and approved. No earnings or investment return is guaranteed.</p>
        <h2>Unauthorised solicitations</h2>
        <p>Do not pay any person claiming to represent Sanatan through an unofficial arrangement. Report suspected solicitations through the <a href="/contact">contact form</a>.</p>
      </div>
    </LegalPage>
  );
}
