/*
 * AI assistant guardrails (brief: "AI chatbot guardrails").
 *
 * The assistant may explain published services, plans, FAQs and enquiry steps. It must NOT:
 *   invent aircraft availability · quote unapproved prices · guarantee visas/jobs/admissions ·
 *   promise investment returns · diagnose medical emergencies · present itself as a licensed
 *   aviation operator.  High-risk questions are routed to an authorised human team.
 *
 * Two deterministic layers around the model (the model's own instructions are a third):
 *   1. classifyHighRisk(question) — BEFORE the model: high-risk questions never reach it;
 *      they get a fixed, approved answer plus a hand-off to the responsible team.
 *   2. screenAnswer(answer)       — AFTER the model: any reply that slips into a price,
 *      availability, guarantee, return or operator claim is replaced with a safe hand-off.
 */

const AVIATION = /\b(jet|charter|aircraft|plane|flight|fly|helicopter|heli|chopper|air ?ambulance|aviation|empty[- ]?leg)\b/i;
const NEGATION = /\b(no|not|never|cannot|can't|cant|won't|without|neither|nor|isn't|aren't|doesn't|don't)\b/i;

const RULES = [
  {
    id: 'medical',
    test: (q) => /\b(fit to fly|is it safe to fly|diagnos\w*|symptom\w*|medical advice|which hospital|treatment for|medicine|dosage)\b/i.test(q),
    answer: 'I can’t give medical advice or assess a patient. Fitness to fly is decided by the treating doctor and the air ambulance operator’s medical team. If this is an emergency, call 112 or your local emergency services now.',
    team: 'Air ambulance coordination team',
    href: '/aviation/air-ambulance#enquiry',
  },
  {
    id: 'operator-identity',
    test: (q) => /\b(licen[cs]e[ds]?|nsop|aoc|air operator certificate|dgca[- ]approved|are you an? (airline|operator|carrier)|do you (own|operate|run|fly) (the |any |your )?(aircraft|planes?|jets?|helicopters?|flights?)|your (own )?(fleet|aircraft|planes|jets|pilots))\b/i.test(q),
    answer: 'Sanatan Airlines is not an airline or aircraft operator and does not own aircraft. We coordinate enquiries with licensed operators; the operating partner and its approvals are identified to you in writing before any flight is confirmed.',
    team: 'Aviation desk',
    href: '/compliance',
  },
  {
    id: 'investment-returns',
    test: (q) => /\b(invest\w*|franchise|roi|returns?|profit\w*|yield|payback|earn\w*|income|interest rate)\b/i.test(q)
      && /\b(roi|returns?|profit\w*|yield|payback|earn\w*|income|guarantee\w*|how much (will|can|do) i (make|get|earn)|percent|%)\b/i.test(q),
    answer: 'I can’t discuss or promise returns, profits or earnings. Sanatan Airlines does not give investment advice, and no franchise or investment outcome is guaranteed. A team member can share general information or an introduction to a registered adviser.',
    team: 'Investment & franchise team',
    href: '/global-services/investment#global-enquiry',
    hrefIf: [[/franchise/i, '/franchise/apply']],
  },
  {
    id: 'guarantee',
    test: (q) => /\b(visa|job|employment|placement|work permit|admission|university|college|offer letter|pr\b|immigration)\b/i.test(q)
      && /\b(guarantee\w*|assured|100 ?%|sure(ly)?|definitely|confirm(ed)?|success rate|chances?|will i get|can you get me|get me)\b/i.test(q),
    answer: 'No visa, job, placement or admission can be guaranteed — those decisions are made by employers, institutions and government authorities. A coordinator can explain the process and, where appropriate, introduce an authorised partner.',
    team: 'Global Services team',
    href: '/global-services#global-enquiry',
    hrefIf: [[/\b(job|employment|placement|work permit)\b/i, '/global-services/employment#global-enquiry'], [/\b(admission|university|college|study|student)\b/i, '/global-services/education#global-enquiry']],
  },
  {
    id: 'price',
    test: (q) => /\b(price|pricing|cost|costs|quote|quotation|rate|rates|fare|fees?|charges?|tariff|how much|kitna|kitne|budget for|per hour|per flight)\b/i.test(q),
    answer: 'Prices aren’t published and I can’t quote one. Every price depends on the specific request and is confirmed in writing by the relevant team or operator before you commit.',
    team: 'Coordination team',
    href: '/enquire',
    hrefIf: [[AVIATION, '/aviation/private-jet-charter#enquiry'], [/\b(member|membership|club|plan)\b/i, '/club'], [/\b(yatra|pilgrimage|tour)\b/i, '/tirth-yatra']],
  },
  {
    id: 'availability',
    test: (q) => AVIATION.test(q) && /\b(availab\w*|free|vacant|seats? left|tomorrow|tonight|today|this (week|weekend)|right now|instant|book (it|now|me|one)|confirm (my|the|a) (booking|seat|flight))\b/i.test(q),
    answer: 'I can’t see or confirm aircraft availability — the website has no live inventory. A coordinator checks options with licensed operators for your exact route and date.',
    team: 'Aviation desk',
    href: '/aviation/private-jet-charter#enquiry',
    hrefIf: [[/helicopter|heli|chopper/i, '/aviation/helicopter-charter#enquiry'], [/ambulance/i, '/aviation/air-ambulance#enquiry']],
  },
];

function handoff(rule, question, contact) {
  const href = (rule.hrefIf || []).find(([pattern]) => pattern.test(question))?.[1] || rule.href;
  const human = [`the ${rule.team} via ${href}`];
  if (contact?.phone) human.push(`call ${contact.phone.label}`);
  if (contact?.whatsapp) human.push('message us on WhatsApp');
  return {
    answer: `${rule.answer} To speak with a person, contact ${human.join(', or ')}.`,
    sources: [href.split('#')[0]],
    mode: 'handoff',
    risk: rule.id,
  };
}

/** Returns a fixed hand-off response for a high-risk question, or null if the question is safe to answer. */
export function classifyHighRisk(question, contact) {
  const q = String(question || '');
  const rule = RULES.find((r) => r.test(q));
  return rule ? handoff(rule, q, contact) : null;
}

/* ---------- Output screening ---------- */
const MONEY = /(₹|\brs\.?\s?\d|\binr\s?\d|\$\s?\d|\busd\s?\d|\d[\d,.]*\s?(lakh|lac|crore|cr|k)\b)/i;
const OPERATOR_CLAIM = /\b(we|sanatan( airlines)?) (operate|own|fly|run) (the |our |a |an )?(aircraft|jets?|planes?|helicopters?|flights?|fleet)|\bour (own )?(fleet|aircraft|jets|planes|pilots|helicopters)\b/i;
const AVAILABILITY_CLAIM = /\b(is|are|currently) available (for|on|tomorrow|today|now)\b|\b(seats?|aircraft|jets?|helicopters?) (is|are) (free|available)\b/i;

function hasUnnegated(text, pattern) {
  return text.split(/(?<=[.!?])\s+/).some((sentence) => pattern.test(sentence) && !NEGATION.test(sentence));
}

/** Returns the risk id if a model answer makes a forbidden claim, else null. */
export function screenAnswer(answer) {
  const text = String(answer || '');
  if (MONEY.test(text)) return 'price';
  if (OPERATOR_CLAIM.test(text)) return 'operator-identity';
  if (hasUnnegated(text, AVAILABILITY_CLAIM)) return 'availability';
  if (hasUnnegated(text, /\bguarantee\w*\b|\bassured\b|\b100 ?% (success|sure)\b/i)) return 'guarantee';
  if (hasUnnegated(text, /\b(returns?|roi|profits?|yield)\s+(of|up to|around|about)\s+\d/i)) return 'investment-returns';
  return null;
}

/** Safe replacement when a model answer fails screening. */
export function safeReplacement(riskId, question, contact) {
  const rule = RULES.find((r) => r.id === riskId) || RULES.find((r) => r.id === 'price');
  return handoff(rule, String(question || ''), contact);
}

/** Extra system-prompt lines (the model's own instructions are the third layer). */
export const MODEL_RULES = [
  'You are an AI assistant, not a person. If asked, say so plainly.',
  'Sanatan Airlines is NOT an airline or aircraft operator, does not own aircraft and does not hold an operator licence. Never say or imply otherwise ("we operate", "our fleet", "our pilots").',
  'Never state or estimate a price, fee, rate or currency amount. Never state that any aircraft, seat or date is available.',
  'Never guarantee visas, jobs, placements, admissions, approvals or any outcome. Never mention or estimate investment or franchise returns, profits or earnings.',
  'Never diagnose, assess symptoms or give medical, legal, immigration, tax, financial or investment advice.',
  'For any question about price, availability, guarantees, returns, licences, medical matters or a complaint, briefly explain that a person must handle it and point to /enquire or /contact.',
];
