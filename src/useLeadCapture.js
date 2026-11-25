'use client';

import { createElement, useEffect, useRef, useState } from 'react';
import { validateLeadPayload } from './leadSchemas.js';

const MAX_CV_SIZE = 5 * 1024 * 1024;
const ALLOWED_CV_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);
const ALLOWED_CV_EXTENSIONS = /\.(pdf|doc|docx)$/i;
const LEAD_TEAMS = {
  general_enquiry: 'central_customer_support',
  jet_charter: 'aviation_desk',
  helicopter: 'aviation_desk',
  air_ambulance: 'trained_coordinator',
  aviation_enquiry: 'aviation_desk',
  aircraft_advisory: 'aviation_desk',
  aircraft_leasing: 'aviation_desk',
  aviation_concierge: 'aviation_desk',
  international_charter: 'aviation_desk',
  membership: 'membership_sales',
  tirth_yatra: 'central_customer_support',
  franchise: 'franchise_team',
  global_services: 'global_services_team',
  partner_enquiry: 'partnerships_team',
  career_application: 'hr_recruitment',
};

function dispatchLeadEvent(eventName, formType, team, step) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('sanatan:lead-event', {
    detail: {
      event: eventName,
      formType,
      team,
      step,
      sourcePath: window.location.pathname,
      timestamp: new Date().toISOString(),
    },
  }));
}

function getCampaign() {
  const query = new URLSearchParams(window.location.search);
  return Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
    .filter((key) => query.has(key))
    .map((key) => [key, query.get(key)]));
}

function getReferrerOrigin() {
  if (!document.referrer) return '';
  try {
    return new URL(document.referrer).origin;
  } catch {
    return '';
  }
}

export function useLeadCapture(formType) {
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const started = useRef(false);
  const completed = useRef(false);
  const stepTracked = useRef(false);
  const team = LEAD_TEAMS[formType] || 'unassigned';

  useEffect(() => {
    const trackAbandonment = () => {
      if (started.current && !completed.current) dispatchLeadEvent('form_abandon', formType, team);
    };
    window.addEventListener('beforeunload', trackAbandonment);
    return () => window.removeEventListener('beforeunload', trackAbandonment);
  }, [formType, team]);

  const onFocusCapture = () => {
    if (started.current) return;
    started.current = true;
    dispatchLeadEvent('form_start', formType, team);
  };

  const onChangeCapture = (event) => {
    if (event.target.name === 'cv') event.target.setCustomValidity('');
    if (!stepTracked.current) {
      stepTracked.current = true;
      dispatchLeadEvent('form_step', formType, team);
    }
    if (status.type) setStatus({ type: '', message: '' });
  };

  const onInvalidCapture = (event) => {
    const form = event.currentTarget;
    const invalidControls = Array.from(form.elements).filter((control) =>
      control instanceof HTMLInputElement
      || control instanceof HTMLSelectElement
      || control instanceof HTMLTextAreaElement
        ? !control.validity.valid
        : false
    );
    const fieldNames = invalidControls.map((control) => {
      const label = control.closest('label')?.querySelector('span');
      return label?.textContent?.replace('*', '').trim()
        || control.getAttribute('aria-label')
        || control.name
        || 'Required field';
    }).filter((name, index, names) => names.indexOf(name) === index);
    setStatus({
      type: 'error',
      message: fieldNames.length
        ? `Review these fields: ${fieldNames.join(', ')}.`
        : 'Some information is missing or invalid. Review the fields marked below.',
    });
    invalidControls[0]?.focus();
  };

  const trackStep = (step) => dispatchLeadEvent('form_step', formType, team, step);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    if (String(formData.get('website') || '').trim()) {
      setStatus({ type: 'error', message: 'This request could not be processed.' });
      return;
    }

    const cv = formData.get('cv');
    const hasCv = cv instanceof File && cv.size > 0;
    if (hasCv && (cv.size > MAX_CV_SIZE || !ALLOWED_CV_EXTENSIONS.test(cv.name) || (cv.type && !ALLOWED_CV_TYPES.has(cv.type)))) {
      const cvInput = form.querySelector('[name="cv"]');
      cvInput?.setCustomValidity('Choose a PDF, DOC or DOCX file under 5 MB.');
      cvInput?.reportValidity();
      setStatus({ type: 'error', message: 'The CV must be a PDF, DOC or DOCX file under 5 MB.' });
      return;
    }

    const consent = formData.get('consent') === 'on';
    if (!consent) {
      setStatus({ type: 'error', message: 'Consent is required before this enquiry can be sent.' });
      return;
    }

    const data = {};
    for (const [key, value] of formData.entries()) {
      if (['website', 'consent', 'cv'].includes(key) || value instanceof File) continue;
      data[key] = value;
    }

    const submittedAt = new Date().toISOString();
    const payload = {
      schemaVersion: '1.0',
      formType,
      destinationTeam: team,
      submittedAt,
      source: {
        path: window.location.pathname,
        referrerOrigin: getReferrerOrigin(),
        campaign: getCampaign(),
      },
      consent: { accepted: true, acceptedAt: submittedAt },
      data,
    };

    const validation = validateLeadPayload(payload);
    if (!validation.success) {
      dispatchLeadEvent('form_submit_failure', formType, team);
      setStatus({ type: 'error', message: validation.message });
      return;
    }

    dispatchLeadEvent('form_submit', formType, team);
    const endpoint = process.env.NEXT_PUBLIC_LEAD_API_URL?.trim();
    if (process.env.NEXT_PUBLIC_PRIVACY_POLICY_APPROVED !== 'true') {
      dispatchLeadEvent('form_submit_failure', formType, team);
      setStatus({ type: 'error', message: 'Not sent: the approved Privacy Policy must be published before enabling lead submission.' });
      return;
    }
    if (!endpoint) {
      dispatchLeadEvent('form_submit_failure', formType, team);
      setStatus({ type: 'error', message: 'Not sent: the secure CRM endpoint is not configured.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      let body;
      const headers = {};
      if (hasCv) {
        body = new FormData();
        body.set('lead', JSON.stringify(payload));
        body.set('cv', cv, cv.name);
      } else {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(payload);
      }

      const response = await fetch(endpoint, { method: 'POST', headers, body, credentials: 'omit' });
      const result = response.status === 204 ? {} : await response.json().catch(() => ({}));
      if (!response.ok) {
        dispatchLeadEvent('form_submit_failure', formType, team);
        setStatus({ type: 'error', message: result.error || 'We could not send your enquiry. Please try again later.' });
        setIsSubmitting(false);
        return;
      }
      completed.current = true;
      dispatchLeadEvent('form_submit_success', formType, team);
      const reference = result.reference ? ` Reference: ${result.reference}.` : '';
      setStatus({ type: 'success', message: `Your enquiry was received.${reference} The responsible team will follow up using your contact details.` });
      form.reset();
    } catch {
      dispatchLeadEvent('form_submit_failure', formType, team);
      setStatus({ type: 'error', message: 'We could not send your enquiry. Please try again later or contact the team directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    status,
    isSubmitting,
    formProps: {
      onSubmit: handleSubmit,
      onFocusCapture,
      onChangeCapture,
      onInvalidCapture,
      'aria-busy': isSubmitting,
    },
    resetStatus: () => setStatus({ type: '', message: '' }),
    trackStep,
  };
}

export function LeadHoneypot() {
  return createElement('div', { className: 'lead-honeypot', 'aria-hidden': 'true' },
    createElement('label', { htmlFor: 'website' }, 'Leave this field empty',
      createElement('input', { id: 'website', name: 'website', type: 'text', tabIndex: -1, autoComplete: 'off' }),
    ),
  );
}

export function LeadFeedback({ status }) {
  if (!status.message) return null;
  return createElement('p', { className: `lead-feedback lead-feedback-${status.type}`, role: status.type === 'error' ? 'alert' : 'status' }, status.message);
}
