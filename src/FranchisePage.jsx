'use client';

import Image from 'next/image';
import { ArrowDown, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check, IndianRupee, FileCheck2, Megaphone, ShieldCheck, UsersRound } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { LeadFeedback, LeadHoneypot, useLeadCapture } from './useLeadCapture.js';
import { SiteFooter, SiteHeader } from './SiteChrome.jsx';
import { FaqStructuredData } from './SeoStructuredData.jsx';

const financialDisclaimer = 'Any revenue, profit, ROI or payback figures are illustrative, not guaranteed, and depend on actual sales, costs, territory, execution and contract terms.';

const pages = {
  overview: {
    nav: 'Overview',
    eyebrow: 'FRANCHISE OPPORTUNITY',
    title: <>Build a local business<br /><em>with clear expectations.</em></>,
    description: 'Explore the franchise concept, applicant profile, responsibilities and proposed application stages. Commercial terms and support commitments are not published until approved.',
  },
  opportunity: {
    nav: 'Opportunity',
    eyebrow: 'THE OPPORTUNITY',
    title: <>Local understanding.<br /><em>Professional service.</em></>,
    description: 'A potential franchise is intended for experienced, service-minded applicants able to operate responsibly within an agreed territory and brand framework.',
  },
  investment: {
    nav: 'Investment',
    eyebrow: 'INVESTMENT OVERVIEW',
    title: <>Understand each component<br /><em>before committing.</em></>,
    description: 'Potential investment components are shown separately. No financial figures are published because amounts and terms are not yet approved.',
  },
  support: {
    nav: 'Support',
    eyebrow: 'SUPPORT FRAMEWORK',
    title: <>Support should be<br /><em>clear and agreed.</em></>,
    description: 'Training, marketing and operational support are areas for discussion. Scope, availability and responsibilities must be documented in an approved franchise agreement.',
  },
  apply: {
    nav: 'Apply',
    eyebrow: 'FRANCHISE APPLICATION',
    title: <>Tell us about your<br /><em>business plans.</em></>,
    description: 'Share an initial applicant profile. This enquiry is for review only and does not constitute an offer, approval or commitment.',
  },
  faqs: {
    nav: 'FAQs',
    eyebrow: 'FRANCHISE FAQs',
    title: <>Questions before<br /><em>an application.</em></>,
    description: 'Review what is currently known and what remains subject to a written offer and final agreement.',
  },
  disclaimer: {
    nav: 'Disclaimer',
    eyebrow: 'FRANCHISE DISCLAIMER',
    title: <>Read the details.<br /><em>Decide with care.</em></>,
    description: 'This page explains the current status of franchise information. It is not a franchise offer or a substitute for approved legal documents.',
  },
};

const franchisePages = [
  ['overview', '/franchise'],
  ['opportunity', '/franchise/opportunity'],
  ['investment', '/franchise/investment'],
  ['support', '/franchise/support'],
  ['apply', '/franchise/apply'],
  ['faqs', '/franchise/faqs'],
  ['disclaimer', '/franchise-disclaimer'],
];

const questions = [
  ['Who is the franchise intended for?', 'The concept is aimed at experienced, service-minded applicants with local market knowledge and the ability to meet responsibilities defined in a final agreement. Formal eligibility criteria are pending approval.'],
  ['Is a territory exclusive?', 'No territory model or exclusivity has been approved. Any location, territory rights or restrictions must be stated in a written agreement.'],
  ['What investment is required?', 'No investment amount is published. The refundable security deposit and setup or infrastructure expenditure are separate components, and their amounts and conditions remain pending approval.'],
  ['Are revenue, profit, ROI or payback guaranteed?', 'No. No earnings or return is guaranteed. Any future figures must be approved and are illustrative only.'],
  ['What support is included?', 'Training, marketing and operations are support areas under discussion. Scope and availability are not commitments unless documented in the final agreement.'],
  ['Does applying create an obligation?', 'No. An application enquiry is for evaluation and discussion only. It is not an offer, approval or commitment.'],
];

function FranchiseHeader({ currentPath }) {
  return <SiteHeader />;
}

function FinancialDisclosure() {
  return <aside className="franchise-financial-strip" aria-label="Franchise financial disclaimer"><ShieldCheck size={16} aria-hidden="true" /><p>{financialDisclaimer} No earnings or investment returns are guaranteed.</p></aside>;
}

function FranchiseApplicationForm() {
  const leadCapture = useLeadCapture('franchise');

  return (
    <form className="franchise-form" {...leadCapture.formProps}>
      <div className="franchise-form-heading"><div><span className="eyebrow">FRANCHISE TEAM ENQUIRY</span><h2>Applicant profile</h2></div><span>INITIAL ENQUIRY ONLY</span></div>
      <LeadHoneypot />
      <div className="franchise-form-grid">
        <label className="franchise-field"><span>Applicant name <b>*</b></span><input name="applicantName" autoComplete="name" required placeholder="Full name" /></label>
        <label className="franchise-field"><span>Company</span><input name="company" autoComplete="organization" placeholder="Company name, if applicable" /></label>
        <label className="franchise-field"><span>City / State <b>*</b></span><input name="cityState" required placeholder="City, State" /></label>
        <label className="franchise-field"><span>Preferred territory <b>*</b></span><input name="territory" required placeholder="City, region or area" /></label>
        <label className="franchise-field field-span-two"><span>Business experience <b>*</b></span><textarea name="experience" rows="3" required placeholder="Relevant business, management or service experience" /></label>
        <label className="franchise-field"><span>Available investment range</span><select name="investmentRange" defaultValue=""><option value="">Select a range, if known</option><option>Below INR 25 lakh</option><option>INR 25 lakh–50 lakh</option><option>INR 50 lakh–1 crore</option><option>Above INR 1 crore</option><option>Not yet assessed</option></select></label>
        <label className="franchise-field"><span>Premises availability</span><select name="premises" defaultValue=""><option value="">Select an option</option><option>Premises identified</option><option>Would need to find premises</option><option>To be discussed</option></select></label>
        <label className="franchise-field"><span>Email address <b>*</b></span><input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
        <label className="franchise-field"><span>Contact number <b>*</b></span><input name="phone" type="tel" autoComplete="tel" defaultValue="+91 " pattern="\+?[0-9][0-9\s.\x2d]{6,19}" title="Enter an international phone number, including country code" required placeholder="+91 98765 43210" /></label>
      </div>
      <label className="franchise-consent"><input name="consent" type="checkbox" required /><span>I agree to be contacted about this franchise enquiry and have read the <a href="/privacy-policy">Privacy Policy</a> and <a href="/franchise-disclaimer">Franchise Disclaimer</a>.</span></label>
      <button className="button button-dark" type="submit" disabled={leadCapture.isSubmitting}>{leadCapture.isSubmitting ? 'Sending…' : 'Send franchise enquiry'} <ArrowUpRight size={15} /></button>
      <LeadFeedback status={leadCapture.status} />
      <p className="franchise-form-note">No fee, offer or approval is created by submitting this enquiry.</p>
    </form>
  );
}

function FranchisePage() {
  const pathname = usePathname() || '/franchise';
  const currentPath = pathname.replace(/\/$/, '') || '/franchise';
  const section = currentPath === '/franchise' ? 'overview' : currentPath.split('/').pop();
  const page = pages[section] || pages.overview;
  const showFaqs = section === 'faqs';
  const isInvestment = section === 'investment';
  const isSupport = section === 'support';
  const isOpportunity = section === 'opportunity' || section === 'apply';
  const isDisclaimer = section === 'disclaimer';

  return (
    <div className="franchise-page">
      <FranchiseHeader currentPath={currentPath} />
      <FinancialDisclosure />
      <main id="main">
        <section className="franchise-hero">
          <div className="franchise-hero-copy">
            <a className="franchise-back-link" href="/franchise"><ArrowRight size={14} /> Franchise overview</a>
            <span className="eyebrow">{page.eyebrow}</span>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
            <a className="button button-dark" href="#franchise-application">Discuss the opportunity <ArrowDown size={15} /></a>
            <span className="franchise-hero-note"><ShieldCheck size={15} /> No earnings or return guarantees. Terms are pending approval.</span>
          </div>
          <div className="franchise-hero-image"><Image src="/images/franchise-team.jpg" alt="Business team discussing a project around a table" fill sizes="(max-width: 700px) 100vw, 55vw" preload /><span>FRANCHISE / BUILT ON CLEAR EXPECTATIONS</span></div>
        </section>

        <section className="franchise-proposition section-pad">
          <div className="franchise-editorial-heading"><span className="eyebrow">01 / THE PROPOSITION</span><h2>Responsible local service.<br /><em>Within a clear framework.</em></h2></div>
          <div className="franchise-proposition-copy"><p>The franchise concept is intended for applicants interested in building a local service business with defined operating responsibilities and a documented brand framework.</p><p>Territory rights, fees, support scope, operating standards and eligibility are not finalized. They must be set out in the approved written offer and agreement.</p></div>
        </section>

        <section className="franchise-profile-section section-pad">
          <div className="franchise-editorial-heading"><span className="eyebrow">02 / APPLICANT PROFILE</span><h2>A good fit starts<br /><em>with the right mindset.</em></h2><p>Profile guidance only. Formal criteria require approval.</p></div>
          <div className="franchise-profile-grid">
            {[
              ['01', 'Service leadership', 'Experience leading teams or delivering customer-facing services.'],
              ['02', 'Local understanding', 'Knowledge of the proposed market and its business context.'],
              ['03', 'Operational discipline', 'Readiness to follow documented processes and applicable rules.'],
              ['04', 'Responsible planning', 'Ability to assess investment, premises and operating requirements independently.'],
            ].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </section>

        <section className="franchise-territory-section section-pad">
          <div><span className="eyebrow">03 / TERRITORY & RESPONSIBILITIES</span><h2>Defined in writing.<br /><em>Not assumed.</em></h2></div>
          <div className="franchise-territory-copy"><p>No territory, exclusivity or protected-area model is approved for publication. The location, rights, restrictions and performance conditions must be agreed in writing.</p><div className="franchise-responsibility-list"><div><Check size={16} /><span>Local market and customer enquiry handling</span></div><div><Check size={16} /><span>Operating to agreed brand and service standards</span></div><div><Check size={16} /><span>Maintaining required records and compliance processes</span></div><div><Check size={16} /><span>Meeting responsibilities defined in the final agreement</span></div></div><small>These are discussion areas, not finalized contractual obligations.</small></div>
        </section>

        {(isInvestment || section === 'overview') && (
          <section className="franchise-investment-section section-pad" id="franchise-investment">
            <div className="franchise-investment-heading"><span className="eyebrow">04 / INVESTMENT OVERVIEW</span><h2>Separate components.<br /><em>No draft figures.</em></h2><p>Indicative component categories only. Amounts, scope and terms are subject to final agreement and Franchise, Legal and Finance approval.</p></div>
            <div className="franchise-investment-content">
              <div className="franchise-investment-cards">
                <article className="franchise-investment-card"><span className="franchise-component-label">INDICATIVE COMPONENT A / REFUNDABLE SECURITY DEPOSIT</span><IndianRupee size={20} /><h3>Security deposit</h3><p>Refundability conditions, deductions, timing and amount must be defined in the final agreement.</p><strong>Amount pending approval</strong></article>
                <article className="franchise-investment-card"><span className="franchise-component-label">INDICATIVE COMPONENT B / SETUP & INFRASTRUCTURE</span><BriefcaseBusiness size={20} /><h3>Setup and infrastructure expenditure</h3><p>Scope, specifications, supplier requirements and amount depend on the approved model.</p><strong>Estimate pending approval</strong></article>
              </div>
              <aside className="franchise-financial-disclaimer"><ShieldCheck size={18} /><div><strong>Financial disclaimer</strong><p>{financialDisclaimer}</p><small>No revenue, profit, ROI or payback figures are published here.</small></div></aside>
            </div>
          </section>
        )}

        {(isSupport || section === 'overview') && (
          <section className="franchise-support-section section-pad">
            <div className="franchise-editorial-heading"><span className="eyebrow">05 / SUPPORT FRAMEWORK</span><h2>Support to be<br /><em>defined and agreed.</em></h2><p>Potential support categories are not commitments until written into the approved agreement.</p></div>
            <div className="franchise-support-grid">
              {[
                ['Training', 'Format, duration and responsible parties pending approval.', UsersRound],
                ['Marketing', 'Brand assets, local activity and approvals pending approval.', Megaphone],
                ['Operations', 'Manuals, systems and ongoing assistance pending approval.', FileCheck2],
              ].map(([title, copy, Icon]) => <article key={title}><Icon size={20} /><h3>{title}</h3><p>{copy}</p><span>Proposed support area</span></article>)}
            </div>
          </section>
        )}

        {(isOpportunity || section === 'overview') && (
          <section className="franchise-stages-section section-pad">
            <div className="franchise-editorial-heading"><span className="eyebrow">06 / APPLICATION STAGES</span><h2>A considered<br /><em>application process.</em></h2><p>Indicative stages. The final process and timings are subject to approval.</p></div>
            <div className="franchise-stage-list">{[
              ['01', 'Initial enquiry', 'Share applicant, company, location and experience details.'],
              ['02', 'Preliminary review', 'The franchise team reviews fit and requests any relevant context.'],
              ['03', 'Opportunity discussion', 'Discuss territory, responsibilities, support and investment components.'],
              ['04', 'Due diligence', 'Review the written offer, financial terms, disclosures and agreement with independent advisers.'],
              ['05', 'Written decision', 'Proceed only after all terms and approvals are documented.'],
            ].map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowRight size={16} /></article>)}</div>
          </section>
        )}

        <section className="franchise-application-section section-pad" id="franchise-application">
          <div className="franchise-application-intro"><span className="eyebrow">{section === 'apply' ? 'APPLICATION' : 'NEXT STEP'}</span><h2>Start with a<br /><em>conversation.</em></h2><p>Submitting an enquiry does not guarantee territory availability, franchise approval, income or commercial performance.</p><a className="text-link" href="/franchise-disclaimer">Read the Franchise Disclaimer <ArrowRight size={15} /></a></div>
          <FranchiseApplicationForm />
        </section>

        <section className="franchise-faq-section section-pad">
          <div className="franchise-editorial-heading"><span className="eyebrow">{showFaqs ? 'FRANCHISE FAQs' : 'QUESTIONS TO CONSIDER'}</span><h2>Clarity before<br /><em>commitment.</em></h2><a className="text-link" href="/franchise/faqs">All franchise FAQs <ArrowRight size={15} /></a></div>
          <div className="franchise-faq-list">{questions.slice(0, showFaqs ? questions.length : 4).map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
          <FaqStructuredData items={questions.slice(0, showFaqs ? questions.length : 4)} />
        </section>

        <section className="franchise-legal-section section-pad" id="franchise-disclaimer">
          <ShieldCheck size={22} /><div><span className="eyebrow">FINANCIAL & FRANCHISE DISCLAIMER</span><h2>{isDisclaimer ? 'Information is not an offer.' : 'Review every term independently.'}</h2><p>{financialDisclaimer} No franchise fee, security deposit, territory right, support commitment or projected result is confirmed by this website. All financial figures and franchise terms require approval by Franchise, Legal and Finance and must appear in final written documents.</p><a href="/franchise-disclaimer" className="text-link">Read the full Franchise Disclaimer <ArrowUpRight size={14} /></a></div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export default FranchisePage;
