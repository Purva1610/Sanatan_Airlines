'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUp, ArrowUpRight, Bot, MessageCircle, MessageSquareText, Phone, Send, X } from 'lucide-react';
import { ENQUIRY_ANCHORS, FALLBACK_ENQUIRY_HREF, getContact, whatsappHref } from './contactConfig.js';
import { usePathname } from 'next/navigation';
import { publicRoutes } from './seo.js';

const APPROVED_ASSISTANT_SOURCES = new Set(publicRoutes);

/* ---------- Floating actions (desktop/tablet): WhatsApp · Call · Back to top ---------- */
function useScrolledPast() {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const update = () => setPast(window.scrollY > window.innerHeight * 0.9);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return past;
}

function scrollToTop() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  // Return keyboard focus to the top of the document.
  document.querySelector('.sa-skip-link')?.focus({ preventScroll: true });
}

function FloatingActions() {
  const pathname = usePathname() || '/';
  const contact = getContact();
  const wa = whatsappHref(contact.whatsapp, pathname);
  const showTop = useScrolledPast();

  return (
    <div className="sa-fab">
      {wa && (
        <a className="sa-fab-btn" href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp (opens WhatsApp)" title="WhatsApp">
          <MessageCircle size={18} aria-hidden="true" /><span className="sa-fab-label">WhatsApp</span>
        </a>
      )}
      {contact.phone && (
        <a className="sa-fab-btn" href={contact.phone.href} aria-label={`Call us on ${contact.phone.label}`} title={`Call ${contact.phone.label}`}>
          <Phone size={17} aria-hidden="true" /><span className="sa-fab-label">Call</span>
        </a>
      )}
      <button
        type="button"
        className={`sa-fab-btn sa-fab-top${showTop ? ' is-visible' : ''}`}
        onClick={scrollToTop}
        title="Back to top"
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
      >
        <ArrowUp size={18} aria-hidden="true" />
      </button>
    </div>
  );
}

/* ---------- Mobile sticky CTA: Enquire · Call · WhatsApp ----------
   Thumb-reachable bottom bar (mobile only). Hides while a form field has focus
   (on-screen keyboard) and while an enquiry form is on screen, so it never covers
   inputs; the body gets matching bottom padding so it never covers content. */
function MobileActionBar() {
  const pathname = usePathname() || '/';
  const contact = getContact();
  const wa = whatsappHref(contact.whatsapp, pathname);
  const [enquireHref, setEnquireHref] = useState(FALLBACK_ENQUIRY_HREF);
  const [typing, setTyping] = useState(false);
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const section = ENQUIRY_ANCHORS.map((id) => document.getElementById(id)).find(Boolean);
    setEnquireHref(section ? `#${section.id}` : FALLBACK_ENQUIRY_HREF);

    const isField = (el) => el instanceof HTMLElement && el.matches('input:not([type=checkbox]):not([type=radio]):not([type=submit]), textarea, select, [contenteditable="true"]');
    const onFocusIn = (event) => { if (isField(event.target)) setTyping(true); };
    const onFocusOut = () => setTimeout(() => setTyping(isField(document.activeElement)), 0);
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);

    let observer;
    const forms = Array.from(document.querySelectorAll('main form'));
    if (forms.length && 'IntersectionObserver' in window) {
      const visible = new Set();
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => (entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target)));
        setFormInView(visible.size > 0);
      }, { threshold: 0.15 });
      forms.forEach((form) => observer.observe(form));
    }
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
      observer?.disconnect();
      setFormInView(false);
    };
  }, [pathname]);

  const hidden = typing || formInView;
  const tab = hidden ? -1 : undefined;
  return (
    <nav className={`sa-mobile-bar${hidden ? ' is-hidden' : ''}`} aria-label="Quick actions" aria-hidden={hidden || undefined}>
      <a className="sa-mobile-bar-primary" href={enquireHref} tabIndex={tab}>
        <MessageSquareText size={17} aria-hidden="true" />Enquire
      </a>
      {contact.phone
        ? <a href={contact.phone.href} aria-label={`Call us on ${contact.phone.label}`} tabIndex={tab}><Phone size={17} aria-hidden="true" />Call</a>
        : <a href="/contact" tabIndex={tab}><Phone size={17} aria-hidden="true" />Contact</a>}
      {wa && (
        <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp (opens WhatsApp)" tabIndex={tab}>
          <MessageCircle size={17} aria-hidden="true" />WhatsApp
        </a>
      )}
    </nav>
  );
}

const EMERGENCY_PATTERN = /(emergency|chest pain|can't breathe|cannot breathe|unconscious|heavy bleeding|heart attack|stroke|overdose|suicid|symptom|diagnos|medical advice)/i;
const EMERGENCY_TEXT = 'For urgent medical help, call your local emergency services now. This website is not emergency dispatch and cannot assess symptoms or provide medical advice. For a planned, non-emergency air ambulance enquiry, use /aviation/air-ambulance.';

function sanitizeSources(sources) {
  return sources.filter((source) => {
    if (typeof source !== 'string' || !source.startsWith('/') || source.startsWith('//')) return false;
    try {
      return APPROVED_ASSISTANT_SOURCES.has(new URL(source, window.location.origin).pathname);
    } catch {
      return false;
    }
  }).slice(0, 3);
}

function AssistantWidget() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [consent, setConsent] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);
  const messagesRef = useRef(null);

  const suggestions = pathname.startsWith('/aviation')
    ? ['What charter services are available?', 'How do I make an aviation enquiry?', 'Is a live aircraft quote available?']
    : pathname.startsWith('/club')
      ? ['What is the International Club?', 'How does membership coordination work?', 'Can you confirm membership pricing?']
      : pathname.startsWith('/global-services')
        ? ['What global services are available?', 'How does the enquiry process work?', 'Can you guarantee a visa or admission?']
        : ['What aviation services do you offer?', 'How does the enquiry process work?', 'Can I get a live charter price?'];

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isSending, open]);

  useEffect(() => {
    setMessages((items) => items.length === 0
      ? [{ role: 'assistant', text: 'Hello — I can help explain our services and guide you to the right enquiry page. What would you like to know?', mode: 'guide' }]
      : items);
  }, [pathname]);

  useEffect(() => {
    const onEscape = (event) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, []);

  useEffect(() => {
    let active = true;
    fetch('/api/assistant')
      .then((response) => (response.ok ? response.json() : null))
      .then((result) => { if (active) setAiEnabled(result?.enabled === true); })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  const send = async (value = question) => {
    const text = value.trim();
    if (!text || isSending || (aiEnabled && !consent)) return;
    const nextMessages = [...messages, { role: 'user', text }];
    setMessages(nextMessages);
    setQuestion('');

    if (EMERGENCY_PATTERN.test(text) && !/non[- ]?emergency/i.test(text)) {
      setMessages((items) => [...items, { role: 'assistant', text: EMERGENCY_TEXT, href: '/aviation/air-ambulance', mode: 'guide' }]);
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        body: JSON.stringify({
          messages: nextMessages.map(({ role, text: content }) => ({ role, content })),
          page: pathname,
        }),
      });
      if (!response.ok && response.status !== 429) throw new Error('Assistant service unavailable');
      const result = await response.json();
      if (typeof result.answer !== 'string' || !result.answer.trim()) throw new Error('Invalid assistant response');
      const sources = sanitizeSources(Array.isArray(result.sources) ? result.sources : []);
      setMessages((items) => [...items, {
        role: 'assistant',
        text: result.answer.slice(0, 1400),
        sources,
        mode: result.mode === 'ai' ? 'ai' : 'guide',
      }]);
    } catch {
      setMessages((items) => [...items, {
        role: 'assistant',
        text: 'The assistant is unavailable right now. Please send your question through the enquiry form and the team will follow up.',
        href: '/enquire',
        mode: 'guide',
      }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {open && (
        <section className="assistant-panel" role="dialog" aria-label="Sanatan Airlines website assistant">
          <div className="assistant-header">
            <div><span className="assistant-avatar"><Bot size={17} /></span><div><strong>{aiEnabled ? 'Sanatan AI' : 'Website guide'}</strong><small><i /> {aiEnabled ? 'Grounded in published content' : 'Published-information answers'}</small></div></div>
            <div className="assistant-header-actions">
              {messages.length > 1 && <button type="button" className="assistant-clear" onClick={() => setMessages([{ role: 'assistant', text: 'Conversation cleared. What would you like to ask?', mode: 'guide' }])} aria-label="Clear conversation">Clear</button>}
              <button type="button" className="icon-button" onClick={() => setOpen(false)} aria-label="Close assistant"><X size={18} /></button>
            </div>
          </div>
          <p className="assistant-disclosure">{aiEnabled ? 'AI-generated assistance, not a human. Answers use published site content and may be incomplete.' : 'Answers use published website information. Generative AI is not enabled on this deployment.'} No booking, price, visa, job, admission or investment outcome is guaranteed. Do not share sensitive information.</p>
          {aiEnabled && <label className="assistant-consent"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /><span>I consent to send my question to the AI service. <a href="/privacy-policy">Privacy Policy</a></span></label>}
          <div className="assistant-suggestions" aria-label="Suggested questions">
            {suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => send(suggestion)}>{suggestion}</button>)}
          </div>
          <div className="assistant-messages" ref={messagesRef} role="log" aria-live="polite">
            {messages.map((message, index) => (
              <div className={`assistant-message assistant-message-${message.role}`} key={`${message.role}-${index}`}>
                <span>{message.role === 'user' ? 'You' : message.mode === 'ai' ? 'Sanatan AI' : 'Website guide'}</span>
                <p>{message.text}</p>
                {message.href && <a href={message.href}>Continue to relevant page <ArrowUpRight size={13} /></a>}
                {message.sources?.map((source) => <a key={source} href={source}>Source: {source} <ArrowUpRight size={13} /></a>)}
              </div>
            ))}
            {isSending && (
              <div className="assistant-message assistant-message-assistant assistant-typing" role="status" aria-label="Assistant is responding">
                <span>{aiEnabled ? 'Sanatan AI' : 'Website guide'}</span>
                <div><i/><i/><i/></div>
              </div>
            )}
          </div>
          <form className="assistant-input" onSubmit={(event) => { event.preventDefault(); send(); }}>
            <label className="sr-only" htmlFor="assistant-question">Ask a question</label>
            <input id="assistant-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask a question" maxLength={500} />
            <button type="submit" aria-label="Send question" disabled={!question.trim() || isSending || (aiEnabled && !consent)}><Send size={16} /></button>
          </form>
          <div className="assistant-handoff"><a href="/enquire">Talk to a team <ArrowRight size={13} /></a><span>{aiEnabled ? 'Only your questions are sent to the AI service.' : 'Answers use published site information only.'}</span></div>
        </section>
      )}
      <button className="assistant-toggle" type="button" aria-expanded={open} onClick={() => setOpen(!open)}><Bot size={18} /><span>Ask the website assistant</span></button>
    </>
  );
}

function AnalyticsConsent() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  const policyApproved = process.env.NEXT_PUBLIC_PRIVACY_POLICY_APPROVED === 'true';
  const [choice, setChoice] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!measurementId || !policyApproved) return undefined;
    const storedChoice = window.localStorage.getItem('sanatan_analytics_consent_v1');
    setChoice(storedChoice === 'accepted' || storedChoice === 'rejected' ? storedChoice : null);
    if (storedChoice !== 'accepted') return undefined;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('consent', 'default', { analytics_storage: 'denied' });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('config', measurementId, { anonymize_ip: true, allow_google_signals: false });

    const scriptId = 'sanatan-ga-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      document.head.appendChild(script);
    }
    const onLeadEvent = (event) => {
      const detail = event.detail || {};
      window.gtag('event', detail.event, { form_type: detail.formType, team: detail.team, source_path: detail.sourcePath });
    };
    window.addEventListener('sanatan:lead-event', onLeadEvent);
    return () => window.removeEventListener('sanatan:lead-event', onLeadEvent);
  }, [measurementId, policyApproved, choice]);

  if (!measurementId || !policyApproved) return null;
  const choose = (value) => {
    window.localStorage.setItem('sanatan_analytics_consent_v1', value);
    if (value === 'rejected') window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
    setChoice(value);
    setShowSettings(false);
  };
  if (choice !== null && !showSettings) return <button className="analytics-preferences" type="button" onClick={() => setShowSettings(true)}>Privacy settings</button>;
  return <aside className="analytics-consent" aria-label="Analytics consent"><p>Allow privacy-conscious analytics to measure site use and form completion? No form field values are sent to analytics.</p><div><button type="button" onClick={() => choose('rejected')}>Reject</button><button type="button" onClick={() => choose('accepted')}>Allow analytics</button></div></aside>;
}

export default function SiteFeatures() {
  return <><FloatingActions /><MobileActionBar /><AssistantWidget /><AnalyticsConsent /></>;
}
