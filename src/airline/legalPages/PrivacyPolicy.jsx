'use client';
import { LegalPage } from '../LegalPageLayout.jsx';

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="Pending legal approval">
      <div className="legal-content">
        <p><strong>This Privacy Policy is not yet approved or published.</strong> This pre-launch notice explains the intended data approach only; it is not a substitute for the final approved policy.</p>
        <h2>Information handling</h2>
        <ul>
          <li>We intend to collect only the name, contact details and service information reasonably needed to respond to an enquiry.</li>
          <li>Do not submit medical records, passport or identity scans, payment-card details, passwords or financial account information through a marketing form.</li>
          <li>CV uploads, if later enabled, must be limited to approved file types, scanned for malware and access-controlled.</li>
          <li>Lead submissions are blocked until the approved Privacy Policy and secure submission endpoint are enabled.</li>
        </ul>
        <h2>Retention and rights</h2>
        <p>The final policy must state the controller, lawful basis, purposes, recipients, retention period, transfer safeguards, user rights, complaint route and privacy contact after legal review.</p>
        <h2>Analytics and cookies</h2>
        <p>Non-essential analytics and cookies must remain disabled until consent is obtained and the final Cookie Policy is approved.</p>
        <h2>Contact</h2>
        <p>Use the <a href="/contact">contact form</a> for a general privacy enquiry. Do not include sensitive records or credentials.</p>
      </div>
    </LegalPage>
  );
}
