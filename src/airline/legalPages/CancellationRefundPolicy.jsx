'use client';
import { LegalPage } from '../LegalPageLayout.jsx';

export default function CancellationRefundPolicyPage() {
  return (
    <LegalPage title="Cancellation & Refund Policy" lastUpdated="Pending legal approval">
      <div className="legal-content">
        <p><strong>There are no published cancellation or refund terms for an approved Sanatan membership or service at this time.</strong> An enquiry does not create a booking or payment obligation.</p>
        <h2>Before confirmation</h2>
        <p>Where a provider delivers aviation, travel or another service, applicable cancellation, change and refund terms must be supplied in writing before the customer commits.</p>
        <h2>Membership and franchise</h2>
        <p>Membership and franchise cancellation or transfer terms are not yet approved. No refund entitlement or fee is implied by this website.</p>
        <h2>Payment</h2>
        <p>Any future payment must be handled by an approved provider. The website must not collect or store card details.</p>
      </div>
    </LegalPage>
  );
}
