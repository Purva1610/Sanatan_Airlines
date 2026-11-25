'use client';
import { LegalPage } from '../LegalPageLayout.jsx';

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" lastUpdated="Pending legal approval">
      <div className="legal-content">
        <p><strong>Non-essential analytics and marketing cookies are not enabled without consent.</strong> This pre-launch policy describes the intended cookie controls and is subject to final legal review.</p>
        <h2>Necessary storage</h2>
        <p>Strictly necessary storage may support navigation, security and language preferences. It must remain limited to functions needed to operate the website.</p>
        <h2>Analytics</h2>
        <p>Analytics requires an approved measurement configuration and explicit user consent. Consent must be revocable, and analytics must not load before acceptance.</p>
        <h2>Cookie controls</h2>
        <p>Final implementation must disclose cookie names, purposes, providers, durations and a user-accessible consent or preference control. Until implemented, no marketing or analytics cookies should be served.</p>
      </div>
    </LegalPage>
  );
}
