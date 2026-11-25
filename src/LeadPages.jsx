'use client';

import { ArrowRight, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { LeadFeedback, LeadHoneypot, useLeadCapture } from './useLeadCapture.js';
import { SiteFooter, SiteHeader } from './SiteChrome.jsx';

const internationalPhoneProps = {
  type: 'tel',
  autoComplete: 'tel',
  defaultValue: '+91 ',
  pattern: '\\+?[0-9][0-9\\s.\\x2d]{6,19}',
  title: 'Enter an international phone number, including country code',
  required: true,
};

function LeadPageHeader() {
  return <SiteHeader />;
}

function LeadPageShell({ eyebrow, title, description, children, note }) {
  return (
    <div className="lead-page">
      <LeadPageHeader />
      <main id="main">
        <section className="lead-page-hero">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          {note && <span className="lead-page-note"><ShieldCheck size={16} />{note}</span>}
        </section>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

function PartnerEnquiryForm() {
  const leadCapture = useLeadCapture('partner_enquiry');

  return (
    <form className="lead-page-form" {...leadCapture.formProps}>
      <LeadHoneypot />
      <div className="lead-page-form-heading"><span className="eyebrow">PARTNERSHIP TEAM</span><span>PARTNER ENQUIRY</span></div>
      <div className="lead-page-fields">
        <label><span>Organization <b>*</b></span><input name="organization" autoComplete="organization" required /></label>
        <label><span>Country <b>*</b></span><input name="country" autoComplete="country-name" required /></label>
        <label><span>Service category <b>*</b></span><select name="serviceCategory" defaultValue="" required><option value="" disabled>Select a service area</option><option>Aviation</option><option>International Club</option><option>Global Services</option><option>Other</option></select></label>
        <label><span>Credentials or authorization summary</span><textarea name="credentialsSummary" rows="3" placeholder="Briefly describe relevant credentials; do not attach sensitive documents" /></label>
        <label><span>Contact name <b>*</b></span><input name="name" autoComplete="name" required /></label>
        <label><span>Email address <b>*</b></span><input name="email" type="email" autoComplete="email" required /></label>
        <label><span>Phone number <b>*</b></span><input name="phone" {...internationalPhoneProps} /></label>
        <label className="lead-page-full"><span>How would you like to work together?</span><textarea name="message" rows="3" /></label>
      </div>
      <label className="lead-page-consent"><input name="consent" type="checkbox" required /><span>I agree to be contacted about this partner enquiry. <a href="/privacy-policy">Privacy Policy</a></span></label>
      <button className="button button-dark" type="submit" disabled={leadCapture.isSubmitting}>{leadCapture.isSubmitting ? 'Sending…' : 'Send partner enquiry'} <ArrowUpRight size={15} /></button>
      <LeadFeedback status={leadCapture.status} />
    </form>
  );
}

function CareerApplicationForm() {
  const leadCapture = useLeadCapture('career_application');

  return (
    <form className="lead-page-form" {...leadCapture.formProps}>
      <LeadHoneypot />
      <div className="lead-page-form-heading"><span className="eyebrow">HR / RECRUITMENT</span><span>CAREER APPLICATION</span></div>
      <div className="lead-page-fields">
        <label><span>Role of interest <b>*</b></span><input name="role" required /></label>
        <label><span>Applicant name <b>*</b></span><input name="name" autoComplete="name" required /></label>
        <label><span>Email address <b>*</b></span><input name="email" type="email" autoComplete="email" required /></label>
        <label><span>Phone number <b>*</b></span><input name="phone" {...internationalPhoneProps} /></label>
        <label className="lead-page-full"><span>CV upload (optional, PDF / DOC / DOCX, max 5 MB)</span><input name="cv" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" /><small>Files are not transmitted unless the approved secure endpoint is enabled. Server-side malware scanning and access controls are required before launch.</small></label>
      </div>
      <label className="lead-page-consent"><input name="consent" type="checkbox" required /><span>I consent to HR reviewing my application information for this role. <a href="/privacy-policy">Privacy Policy</a></span></label>
      <button className="button button-dark" type="submit" disabled={leadCapture.isSubmitting}>{leadCapture.isSubmitting ? 'Sending…' : 'Send career application'} <ArrowUpRight size={15} /></button>
      <LeadFeedback status={leadCapture.status} />
    </form>
  );
}

export function PartnerEnquiryPage() {
  return (
    <LeadPageShell eyebrow="PARTNER ENQUIRY" title={<>Explore a<br /><em>working relationship.</em></>} description="Share your organization, country, service category and relevant credentials for an initial partnership discussion." note="Partner status and authorization are verified before any service representation.">
      <section className="lead-page-content"><div><span className="eyebrow">PARTNERSHIP TEAM</span><h2>Start with the<br /><em>relevant details.</em></h2><p>Submitting an enquiry does not confirm partnership, endorsement or authority to represent Sanatan Airlines.</p><a className="text-link" href="/privacy-policy">Privacy information <ArrowRight size={15} /></a></div><PartnerEnquiryForm /></section>
    </LeadPageShell>
  );
}

export function CareerPage() {
  return (
    <LeadPageShell eyebrow="CAREERS" title={<>A thoughtful approach<br /><em>to working together.</em></>} description="Apply for a role by sharing your contact details and relevant experience. No CV is required to send an enquiry." note="Applications are reviewed by HR. A submission does not guarantee employment.">
      <section className="lead-page-content"><div><span className="eyebrow">HR / RECRUITMENT</span><h2>Tell us about<br /><em>your experience.</em></h2><p>Share only information relevant to the role. Do not upload identity documents, medical records or financial information.</p><a className="text-link" href="/privacy-policy">Privacy information <ArrowRight size={15} /></a></div><CareerApplicationForm /></section>
    </LeadPageShell>
  );
}

export function PrivacyPolicyPage() {
  return (
    <LeadPageShell eyebrow="PRIVACY & DATA" title={<>Privacy details<br /><em>before submission.</em></>} description="The approved Privacy Policy is not yet available. This page is a pre-launch notice, not a substitute for the final legal policy." note="Lead submissions are blocked unless an approved Privacy Policy is published and configured.">
      <section className="privacy-page-content"><ShieldCheck size={23} /><div><span className="eyebrow">PRE-LAUNCH PRIVACY NOTICE</span><h2>Do not submit personal information yet.</h2><p>The full policy must identify the data controller, processing purposes and legal basis, recipients and processors, retention period, international transfers, user rights and a privacy contact.</p><p>In this local preview, forms do not transmit or store enquiry details. Before production submission is enabled, replace this notice with the approved Privacy Policy and configure the secure CRM endpoint.</p><a className="button button-dark" href="/">Return to the website <ArrowRight size={15} /></a></div></section>
    </LeadPageShell>
  );
}
