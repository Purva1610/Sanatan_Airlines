'use client';
import { LegalPage } from '../LegalPageLayout.jsx';

export default function MembershipTermsPage() {
  return (
    <LegalPage title="Membership Terms" lastUpdated="Pending management, legal and finance approval" heroImage="/images/terms.jpg">
      <div className="legal-content">
        <p><strong>The Sanatan International Club membership terms are not yet approved or published.</strong> No membership is available for purchase through this website.</p>
        <h2>Final terms must define</h2>
        <ul>
          <li>Eligibility and member count for each Single, Couple or Family format.</li>
          <li>Validity, destination units and what constitutes a visit or country.</li>
          <li>Accommodation category, room occupancy, nights, transport, meals and flights.</li>
          <li>Booking notice, blackout dates, taxes and third-party conditions.</li>
          <li>Cancellation, refund and transfer rules.</li>
          <li>Price, inclusions and exclusions, if and when approved.</li>
        </ul>
        <h2>No purchase or guarantee</h2>
        <p>Enquiries do not reserve travel or create membership. No savings, availability or benefit is guaranteed.</p>
      </div>
    </LegalPage>
  );
}
