'use client';
import { LegalPage } from '../LegalPageLayout.jsx';

export default function AviationDisclaimerPage() {
  return (
    <LegalPage title="Aviation Disclaimer" lastUpdated="Pending legal approval">
      <div className="legal-content">
        <p><strong>Sanatan Airlines Private Limited provides aviation coordination and facilitation enquiries.</strong> This website does not represent that Sanatan operates scheduled airline services, owns aircraft or holds an NSOP permit.</p>
        <h2>Licensed operators</h2>
        <p>Any charter or medical-flight service must be delivered, where relevant, by an appropriately licensed aircraft operator. The operator identity, aircraft, availability and applicable terms must be confirmed before a service is agreed.</p>
        <h2>No live availability or guarantee</h2>
        <p>The website does not show live aircraft availability or instant pricing. Submitting an enquiry does not confirm a route, aircraft, operator, medical suitability, permit, booking or price.</p>
        <h2>Medical enquiries</h2>
        <p>The air ambulance form is not emergency dispatch and must not be used for urgent symptoms. Do not send medical records through a generic form. A treating clinician and the operator's medical team decide clinical suitability.</p>
        <h2>Legal review</h2>
        <p>The complete aviation disclaimer must be approved by Sanatan management and legal advisers before publication as a binding notice.</p>
      </div>
    </LegalPage>
  );
}
