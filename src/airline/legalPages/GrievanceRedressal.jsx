'use client';
import { AlertTriangle, CheckCircle2, Clock3, Headphones, Mail, Phone, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { LegalPage } from '../LegalPageLayout.jsx';
import { getContact } from '../../contactConfig.js';

export default function GrievanceRedressalPage() {
  // Contact details come from src/contactConfig.js (env) — never placeholder numbers or unconfirmed mailboxes.
  const contact = getContact();
  const grievanceEmail = contact.grievance.email || contact.email;
  return (
    <LegalPage title="Grievance Redressal" lastUpdated="20 November 2026">
      <div className="gr-page">
        <section className="gr-intro">
          <div className="gr-intro-copy">
            <span>Passenger feedback</span>
            <h2>Every concern deserves a clear answer.</h2>
            <p>Sanatan Airlines is committed to addressing customer grievances promptly and transparently. Complaints about a flight itself may also be raised with the licensed operator and, where applicable, the DGCA.</p>
          </div>
          <div className="gr-intro-contact">
            {grievanceEmail && <div><Mail size={20}/><span>Email</span><a href={`mailto:${grievanceEmail}`}>{grievanceEmail}</a></div>}
            {contact.phone && <div><Phone size={20}/><span>Phone</span><a href={contact.phone.href}>{contact.phone.label}</a></div>}
            {!grievanceEmail && !contact.phone && <div><Mail size={20}/><span>Contact</span><Link href="/contact">Use the contact form (topic: Feedback or complaint)</Link></div>}
          </div>
        </section>

        <section className="gr-officer">
          <div className="gr-officer-mark"><ShieldCheck size={30}/></div>
          <div className="gr-officer-copy">
            <span>Designated grievance officer</span>
            <h2>{contact.grievance.officer || 'Customer Experience — Grievance Desk'}</h2>
            <p>Office No. 309, Elixa Park, Old Pune–Bangalore Highway, Shahupuri, Kolhapur, Maharashtra – 416001</p>
          </div>
          <div className="gr-officer-status">
            <span>Acknowledgement</span>
            <strong>Within 48 hours</strong>
          </div>
        </section>

        <section className="gr-escalation">
          <div className="gr-section-head">
            <span>Resolution journey</span>
            <h2>Three clear steps</h2>
          </div>
          <div className="gr-step-grid">
            {[
              ['01', 'Customer service', 'Contact our team with your PNR and complaint details.', 'Response: 24 hours–7 working days'],
              ['02', 'Grievance officer', 'Escalate with the original reference if resolution is unsatisfactory.', 'Resolution: within 15 working days'],
              ['03', 'External review', 'Approach DGCA or the appropriate Consumer Disputes Commission.', 'Available after internal resolution'],
            ].map(([number, title, copy, timing]) => (
              <article key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <small>{timing}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="gr-submit">
          <div className="gr-submit-copy">
            <span>Submit a grievance</span>
            <h2>Include the details that help us respond</h2>
            <p>Please keep supporting evidence ready, but do not include payment passwords or sensitive authentication data.</p>
          </div>
          <form className="gr-form" onSubmit={(event) => event.preventDefault()}>
            <label>Booking reference<input required placeholder="e.g. ABC123" /></label>
            <label>Full name<input required /></label>
            <label>Email address<input type="email" required /></label>
            <label>Phone number<input type="tel" /></label>
            <label>Complaint category
              <select>
                <option>Flight delay, cancellation or diversion</option>
                <option>Denied boarding or overbooking</option>
                <option>Baggage damage, loss or delay</option>
                <option>Refund or fare dispute</option>
                <option>Special assistance</option>
                <option>Staff conduct or discrimination</option>
                <option>Privacy or website issue</option>
                <option>SkyNova Rewards</option>
                <option>Other</option>
              </select>
            </label>
            <label>Previous reference number<input placeholder="If already raised" /></label>
            <label className="gr-form-wide">Complaint details<textarea required placeholder="Describe what happened, when it occurred and the resolution you are seeking..." /></label>
            <label className="gr-form-check"><input type="checkbox" required/> I confirm that this information is accurate.</label>
            <button type="submit" className="gr-submit-btn">Submit grievance <CheckCircle2 size={17}/></button>
          </form>
        </section>

        <section className="gr-categories">
          <div className="gr-section-head gr-section-head--left">
            <span>What we handle</span>
            <h2>Common grievance categories</h2>
          </div>
          <div className="gr-category-grid">
            {[
              ['Flight operations', 'Delays, cancellations, diversions and denied boarding'],
              ['Baggage', 'Damage, loss, delay and handling concerns'],
              ['Payments', 'Refund requests, fares and ancillary charges'],
              ['Assistance', 'Wheelchair, medical and special assistance failures'],
              ['Conduct', 'Disrespectful or discriminatory treatment'],
              ['Digital', 'Privacy, website and application issues'],
            ].map(([title, copy]) => (
              <article key={title}><AlertTriangle size={18}/><div><h3>{title}</h3><p>{copy}</p></div></article>
            ))}
          </div>
        </section>

        <section className="gr-response">
          <div className="gr-section-head">
            <span>Response standards</span>
            <h2>Transparent timelines</h2>
          </div>
          <div className="gr-response-table">
            <div className="gr-response-head"><span>Complaint type</span><span>Acknowledgement</span><span>Resolution target</span></div>
            {[
              ['Flight disruption compensation', 'Immediate', 'As per DGCA Passenger Charter'],
              ['Refund request', '24 hours', '7 working days'],
              ['Baggage claim', '24 hours', '21 days'],
              ['Fare or ancillary dispute', '48 hours', '15 working days'],
              ['Privacy complaint', '48 hours', '30 days'],
            ].map((row) => (
              <div className="gr-response-row" key={row[0]}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>
            ))}
          </div>
        </section>

        <section className="gr-external">
          <div className="gr-external-copy">
            <span>External escalation</span>
            <h2>If internal resolution is not sufficient</h2>
          </div>
          <div className="gr-external-grid">
            <article><Headphones size={20}/><h3>DGCA facilitation</h3><p>File through the DGCA Consumer Facilitation Centre or by post to DGCA Headquarters, New Delhi.</p><a href="https://www.dgca.gov.in" target="_blank" rel="noopener noreferrer">Visit DGCA →</a></article>
            <article><ShieldCheck size={20}/><h3>Consumer Commission</h3><p>Approach the jurisdictional District Consumer Disputes Redressal Commission under the Consumer Protection Act.</p></article>
            <article><Clock3 size={20}/><h3>IT grievance officer</h3><p>Digital and privacy complaints may be sent to the designated grievance officer by email.</p>{grievanceEmail ? <a href={`mailto:${grievanceEmail}`}>Email grievance desk →</a> : <Link href="/contact">Contact the grievance desk →</Link>}</article>
          </div>
        </section>

        <section className="gr-contact">
          {contact.phone && <div><Phone size={20}/><span>Phone</span><strong><a href={contact.phone.href}>{contact.phone.label}</a></strong></div>}
          {grievanceEmail && <div><Mail size={20}/><span>Grievance email</span><strong><a href={`mailto:${grievanceEmail}`}>{grievanceEmail}</a></strong></div>}
          {contact.hours && <div><Clock3 size={20}/><span>Business hours</span><strong>{contact.hours}</strong></div>}
          <Link href="/contact">Visit contact page →</Link>
        </section>
      </div>
    </LegalPage>
  );
}
