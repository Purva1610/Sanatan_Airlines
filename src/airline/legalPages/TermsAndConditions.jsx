'use client';
import { LegalPage } from '../LegalPageLayout.jsx';

export default function TermsAndConditionsPage() {
  return (
    <LegalPage title="Terms of Use" lastUpdated="Pending legal approval">
      <div className="legal-content">
        <p><strong>The final Terms of Use have not yet been approved.</strong> This website provides information and enquiry services only. It is not a booking engine, offer of transport, franchise offer or confirmation of availability.</p>
        <h2>Enquiries</h2>
        <p>Submitting an enquiry creates no contract, booking, membership, franchise relationship or entitlement. Any service arrangement requires separate confirmation and written terms from the relevant provider.</p>
        <h2>Service boundaries</h2>
        <p>Sanatan Airlines Private Limited does not represent that it operates scheduled airline services, owns aircraft or holds an NSOP permit. Where aviation or another regulated service is arranged, the relevant licensed provider must be identified and the applicable terms disclosed before engagement.</p>
        <h2>Legal review</h2>
        <p>Approved terms covering liability, disputes, cancellations, refunds, intellectual property and website use must be published after Sanatan management and legal review.</p>
      </div>
    </LegalPage>
  );
}
