/*
 * Aviation service content — one entry per service, all rendered by the same
 * template (src/AviationServicePage.jsx):
 *   hero → service explanation → use cases → process → enquiry form → FAQs → compliance note → related services
 *
 * Form field names must match src/leadSchemas.js (requiredByForm) for each formType.
 * Field options:  required · optional (adds "(optional)") · wide · hint · showWhen: [field, [values]]
 *                 type: text | tel | email | number | date | datetime-local | select | textarea | toggle
 *
 * Brief rule: never show live aircraft availability, instant pricing or confirmed booking.
 */

import {
  Clock, ClipboardCheck, Compass, Globe2, HeartHandshake, Lock, MapPinned, MessagesSquare, Plane, ShieldCheck, UsersRound,
} from 'lucide-react';

export const DISCLAIMER = 'All services are subject to route, aircraft availability and confirmation by licensed operators. Sanatan Airlines coordinates enquiries and does not own or operate aircraft.';

export const NO_LIVE_BOOKING = 'This website does not show live aircraft availability, instant pricing or confirmed bookings. Every enquiry is reviewed individually before any option, price or term is shared.';

/* ---------- Shared field sets ---------- */
const contactFields = (withCompany = true) => [
  { name: 'name', label: 'Contact name', required: true, autoComplete: 'name', placeholder: 'Your full name' },
  { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', required: true, autoComplete: 'tel', defaultValue: '+91 ', pattern: '\\+?[0-9][0-9\\s.\\x2d]{6,19}', title: 'Enter an international phone number, including country code', placeholder: '+91 98765 43210' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email', placeholder: 'you@example.com' },
  ...(withCompany ? [{ name: 'company', label: 'Company', optional: true, autoComplete: 'organization', placeholder: 'If travelling for business' }] : []),
];

const tripTypeField = { name: 'tripType', label: 'Trip type', type: 'select', required: true, options: ['One-way', 'Return', 'Multi-city'] };
const charterJourney = [
  { name: 'origin', label: 'Departure city or airport', required: true, placeholder: 'e.g. Mumbai (BOM)' },
  { name: 'destination', label: 'Destination city or airport', required: true, placeholder: 'e.g. Dubai (DXB)' },
  tripTypeField,
  { name: 'passengers', label: 'Passengers', type: 'number', min: 1, max: 50, required: true, placeholder: 'Number of travellers' },
  { name: 'travelDate', label: 'Departure date', type: 'date', required: true },
  { name: 'returnDate', label: 'Return date', type: 'date', required: true, showWhen: ['tripType', ['Return']] },
  { name: 'stops', label: 'Additional stops', type: 'textarea', wide: true, required: true, showWhen: ['tripType', ['Multi-city']], placeholder: 'List each stop with an approximate date, e.g. Dubai → London (12 Mar) → Mumbai (18 Mar)' },
  { name: 'flexibleDate', label: 'My dates are flexible', type: 'toggle', wide: true, hint: 'Flexibility can widen the options an operator is able to consider.' },
];
const charterPreferences = [
  { name: 'luggage', label: 'Luggage notes', optional: true, placeholder: 'e.g. 6 suitcases, golf bags, oversized items' },
  { name: 'aircraftPreference', label: 'Aircraft preference', type: 'select', optional: true, options: ['No preference', 'Light jet', 'Midsize jet', 'Super-midsize jet', 'Large cabin jet', 'Turboprop'] },
  { name: 'requirements', label: 'Additional requirements', type: 'textarea', wide: true, optional: true, placeholder: 'Catering, accessibility, pets, ground transport or anything else we should know' },
];

const advisoryAircraft = ['Light jet', 'Midsize jet', 'Super-midsize jet', 'Large cabin jet', 'Turboprop', 'Helicopter', 'To be discussed'];
const timelineOptions = ['As soon as practical', 'Within 3 months', 'Within 6 months', 'Within 12 months', 'Exploring options'];

/* ---------- Services ---------- */
export const services = {
  'private-jet-charter': {
    name: 'Private Jet Charter',
    short: 'Private jet',
    nameSerif: 'Coordination',
    eyebrow: 'Aviation services · Private jet',
    sub: 'Confidential private jet travel for business, family and special journeys — coordinated through licensed operators.',
    image: '/images/private-jet.jpg',
    imageAlt: 'Private jets parked on an airport apron under a blue sky',
    imagePosition: 'center 62%', // keep the jets in frame; the open sky sits behind the left-aligned copy
    formType: 'jet_charter',
    introTitle: 'Privacy, time and care — arranged with clarity.',
    introCopy: [
      'A private jet journey is less about the aircraft and more about what it returns to you: time, privacy and the freedom to travel on your own terms.',
      'Sanatan Airlines receives your brief and coordinates with appropriately licensed operators. Route suitability, aircraft availability and terms are confirmed for your specific journey before anything is agreed.',
    ],
    benefits: [
      { icon: Lock, title: 'Confidential by design', copy: 'Itineraries, passenger details and preferences are handled discreetly and shared only where necessary.' },
      { icon: Clock, title: 'Built around your schedule', copy: 'Departure windows, private terminals where available and onward coordination planned around you.' },
      { icon: UsersRound, title: 'Comfort for every generation', copy: 'Cabin, catering and assistance considerations for elders, children and long journeys.' },
      { icon: MessagesSquare, title: 'One accountable contact', copy: 'A named coordinator stays with your enquiry from first brief to departure day.' },
    ],
    useCases: [
      ['Business travel', 'Schedules that protect meetings, rest and preparation time.'],
      ['Family journeys', 'Space, privacy and pacing that work for every generation.'],
      ['Pilgrimage travel', 'Respectful coordination for yatra and darshan itineraries.'],
      ['Planned medical travel', 'Non-emergency journeys planned around comfort and continuity.'],
      ['Celebrations & events', 'Movement for weddings, gatherings and milestone occasions.'],
      ['Multi-city itineraries', 'A single coordinated thread across several stops.'],
    ],
    steps: [
      ['Share the brief', 'Route, dates, passengers and priorities through a confidential enquiry.'],
      ['Personal review', 'A coordinator clarifies details, flexibility and anything that matters to your group.'],
      ['Operator options', 'Suitable licensed operators are approached; availability and suitability are confirmed case by case.'],
      ['Confirm with clarity', 'Operator details, price and terms are shared in writing before any commitment.'],
    ],
    formGroups: [
      { legend: 'Journey', fields: charterJourney },
      { legend: 'Preferences', fields: charterPreferences },
      { legend: 'Your details', fields: contactFields(true) },
    ],
    faqs: [
      ['Does sending this form confirm a flight?', 'No. It is a confidential enquiry only. Availability, operator details, pricing and terms are confirmed individually before any commitment.'],
      ['Can I see live availability or an instant price?', 'No. Charter pricing depends on the route, aircraft, positioning and dates, so options are prepared for each enquiry with a licensed operator.'],
      ['Will I know which operator is flying?', 'Yes. Where a journey is arranged, the licensed operating partner and applicable details are shared with you before confirmation.'],
      ['What information helps the coordinator most?', 'Origin, destination, dates and flexibility, passenger count, luggage and any comfort or accessibility considerations.'],
    ],
    compliance: 'Flights are operated by licensed third-party operators holding the relevant approvals for the route. The operating partner, aircraft and applicable terms are identified in writing before you are asked to confirm.',
    related: ['international-charter', 'helicopter-charter', 'aviation-concierge'],
  },

  'international-charter': {
    name: 'International Charter',
    short: 'International charter',
    nameSerif: 'Coordination',
    eyebrow: 'Aviation services · International',
    sub: 'Cross-border private charter enquiries, reviewed around your route, timing and the permissions each journey requires.',
    image: '/images/international charter.jpg',
    imageAlt: 'Tail engine and wing of a long-range business jet inside a hangar',
    imagePosition: '60% 45%', // engine stays in view on the right; fuselage sits behind the left-aligned copy
    formType: 'international_charter',
    introTitle: 'Long-range journeys need route-by-route review.',
    introCopy: [
      'International charter involves more than distance: overflight and landing permissions, crew duty limits, fuel stops and destination requirements all shape what is possible.',
      'Sanatan Airlines coordinates your brief with licensed operators experienced on the route. Permits, clearances and terms are confirmed for each journey — nothing is implied by submitting an enquiry.',
    ],
    benefits: [
      { icon: Globe2, title: 'Route-specific review', copy: 'Permissions, technical stops and destination requirements assessed for your exact itinerary.' },
      { icon: Plane, title: 'Range-appropriate aircraft', copy: 'Options matched to distance, passenger count and luggage, subject to operator availability.' },
      { icon: Lock, title: 'Discreet handling', copy: 'Passenger information is shared only with the parties who need it for the journey.' },
      { icon: MessagesSquare, title: 'One coordinator throughout', copy: 'A single point of contact across time zones, stops and ground arrangements.' },
    ],
    useCases: [
      ['Gulf & Middle East', 'Business and family journeys across the region.'],
      ['Europe & UK', 'Long-range travel with or without a technical stop.'],
      ['Multi-country itineraries', 'Several countries coordinated as one journey.'],
      ['Diaspora & family visits', 'Bringing families together across borders.'],
      ['Pilgrimage abroad', 'International yatra itineraries, planned respectfully.'],
      ['Time-critical business', 'Where scheduled connections do not fit the plan.'],
    ],
    steps: [
      ['Share route and dates', 'Origin, destination, stops, dates and passenger count.'],
      ['Clarify the itinerary', 'Flexibility, luggage and any special requirements.'],
      ['Review requirements', 'Permits, technical stops and operator suitability are assessed.'],
      ['Confirm in writing', 'Operator, price and terms are shared before any commitment.'],
    ],
    formGroups: [
      { legend: 'Journey', fields: charterJourney },
      { legend: 'Preferences', fields: charterPreferences },
      { legend: 'Your details', fields: contactFields(true) },
    ],
    faqs: [
      ['Do you show live international aircraft availability?', 'No. Options are reviewed and confirmed individually with a relevant operator.'],
      ['Are permits and clearances included?', 'Route requirements and permits are assessed for each request. No permit or clearance is implied by submitting this form.'],
      ['Who handles passports and visas?', 'Passengers remain responsible for their own travel documents and visas. The coordinator will tell you what the operator needs and when.'],
      ['Will the form provide instant pricing?', 'No. This is an enquiry only. Any price and terms are shared after route and operator review.'],
    ],
    compliance: 'International flights are operated by licensed operators holding the approvals required for the route. Overflight, landing and customs requirements are confirmed per journey; passengers remain responsible for their own travel documents.',
    related: ['private-jet-charter', 'aviation-concierge', 'air-ambulance'],
  },

  'helicopter-charter': {
    name: 'Helicopter Charter',
    short: 'Helicopter',
    nameSerif: 'Coordination',
    eyebrow: 'Aviation services · Helicopter',
    sub: 'Helicopter transfers and short-haul flights coordinated with licensed operators for remote access, pilgrimage and time-sensitive travel.',
    image: '/images/helicopter-charter.jpg',
    imageAlt: 'A black helicopter parked on grass beside trees under a clear blue sky',
    imagePosition: '65% 60%', // helicopter on the right, clear of the left-aligned copy
    formType: 'helicopter',
    introTitle: 'When the road ends, coordination begins.',
    introCopy: [
      'Helicopters bring distant shrines, hill towns, estates and project sites within reach of a single morning.',
      'Sanatan Airlines coordinates your request with licensed operators. Landing permissions, weather windows, daylight limitations and site suitability are reviewed individually — never assumed.',
    ],
    benefits: [
      { icon: MapPinned, title: 'Access beyond the road', copy: 'Point-to-point transfers where terrain or distance makes surface travel impractical, subject to site suitability.' },
      { icon: HeartHandshake, title: 'Yatra support with care', copy: 'Transfers around pilgrimage itineraries, with landing permissions reviewed for each location.' },
      { icon: Clock, title: 'Short-haul, time-sensitive', copy: 'Movement for meetings, events or urgent non-emergency needs within operating limits.' },
      { icon: ShieldCheck, title: 'Operational diligence', copy: 'Weather, daylight and local permissions are reviewed with the operator before feasibility is confirmed.' },
    ],
    useCases: [
      ['Pilgrimage yatra', 'Hill shrines and darshan itineraries, coordinated with respect.'],
      ['Remote & hill access', 'Estates, retreats and sites away from main roads.'],
      ['VIP & event transfers', 'Discreet short-haul movement for guests and principals.'],
      ['Corporate short-haul', 'Time-critical movement between cities or facilities.'],
      ['Aerial survey & site visits', 'Project, land and infrastructure visits, subject to permissions.'],
      ['Scenic journeys', 'Considered aerial experiences over remarkable landscapes.'],
    ],
    steps: [
      ['Share pickup and drop', 'Locations, timing and the purpose of your journey.'],
      ['Describe the landing sites', 'Helipad, private land or open ground — and whether permission is in place.'],
      ['Review feasibility', 'Landing permissions, weather windows and operator suitability are assessed.'],
      ['Confirm in writing', 'Any viable arrangement, operator details, price and terms are shared before commitment.'],
    ],
    formGroups: [
      {
        legend: 'Route & timing',
        fields: [
          { name: 'pickup', label: 'Pickup location', required: true, placeholder: 'City, helipad or address' },
          { name: 'dropoff', label: 'Drop location', required: true, placeholder: 'City, helipad or address' },
          { name: 'dateTime', label: 'Preferred date and time', type: 'datetime-local', required: true, hint: 'Helicopter operations are generally limited to daylight hours.' },
          { name: 'passengers', label: 'Passengers', type: 'number', min: 1, max: 20, required: true, placeholder: 'Number of travellers' },
          { name: 'purpose', label: 'Purpose of travel', type: 'select', required: true, options: ['Pilgrimage yatra', 'Remote or hill access', 'VIP / event transfer', 'Corporate travel', 'Aerial survey / site visit', 'Scenic journey', 'Other'] },
          { name: 'route', label: 'Route notes', optional: true, placeholder: 'Return leg, waiting time or intermediate stops' },
        ],
      },
      {
        legend: 'Landing locations',
        fields: [
          { name: 'landingSiteType', label: 'Landing site type', type: 'select', required: true, options: ['Existing helipad / airport', 'Private land — permission held', 'Private land — permission not yet sought', 'Open ground / event venue', 'Not sure'] },
          { name: 'landingDetails', label: 'Landing location details', type: 'textarea', wide: true, required: true, placeholder: 'Site names or addresses at both ends, GPS pin if known, surface, nearby obstructions and who owns or manages each site' },
          { name: 'requirements', label: 'Luggage and other notes', type: 'textarea', wide: true, optional: true, placeholder: 'Luggage weight, elderly passengers, ground transport' },
        ],
      },
      { legend: 'Your details', fields: contactFields(true) },
    ],
    faqs: [
      ['Can any location be used as a landing site?', 'No. Every landing location is reviewed individually. Permissions, surface conditions, surrounding obstructions and local rules must be confirmed before a site can be considered.'],
      ['Is weather a factor?', 'Yes. Helicopter operations depend on weather and daylight. A coordinator will discuss feasible windows with the operator for your dates.'],
      ['Does this confirm a helicopter for my date?', 'No. This is an enquiry only. Operator availability, feasibility, price and terms are confirmed separately.'],
      ['What about pilgrimage support?', 'We coordinate transfers around yatra itineraries, subject to landing permissions, weather and licensed operator availability.'],
    ],
    compliance: 'Helicopter flights are operated by licensed operators. Every landing site requires the relevant permissions and operator assessment; flights may be rescheduled or cancelled for weather, daylight or safety reasons.',
    related: ['private-jet-charter', 'aviation-concierge', 'air-ambulance'],
  },

  'air-ambulance': {
    name: 'Air Ambulance & Medical Flight',
    short: 'Air ambulance',
    nameSerif: 'Coordination',
    eyebrow: 'Aviation services · Medical flights',
    sub: 'Planned and time-sensitive medical flight coordination through licensed air ambulance operators — handled with care and confidentiality.',
    image: '/images/air-ambulance.jpg',
    imageAlt: 'A white twin-engine helicopter in flight against an overcast sky',
    imagePosition: '70% 45%', // helicopter on the right, clear of the copy and emergency notice
    formType: 'air_ambulance',
    emergency: {
      title: 'This website is not an emergency dispatch channel.',
      copy: 'If someone needs urgent medical help now, call local emergency services immediately. Do not wait for a website response.',
    },
    introTitle: 'Calm coordination when every hour matters.',
    introCopy: [
      'Medical flights are arranged around a patient, a clinical team and a receiving hospital — not around a schedule.',
      'Sanatan Airlines coordinates planned and time-sensitive enquiries with licensed air ambulance operators. Clinical suitability, aircraft configuration, medical escort requirements and ground transfers are confirmed by the relevant medical and operating teams before any service proceeds.',
    ],
    benefits: [
      { icon: Clock, title: 'Time-sensitive enquiries prioritised', copy: 'Requests marked time-sensitive are reviewed first. Emergencies must always go to local emergency services.' },
      { icon: ShieldCheck, title: 'Medical configuration', copy: 'Stretcher, oxygen and escort requirements are matched with operator capability and clinical advice.' },
      { icon: UsersRound, title: 'Family accompaniment', copy: 'Where the cabin configuration allows, seating and updates for accompanying family are coordinated with care.' },
      { icon: HeartHandshake, title: 'Ground transfer alignment', copy: 'Ambulance and hospital-side timing are aligned where possible so the handover is calm and clear.' },
    ],
    useCases: [
      ['Inter-hospital transfers', 'Movement between treating facilities with continuity of care in mind.'],
      ['Medical repatriation', 'Returning home for continued treatment, coordinated respectfully.'],
      ['Planned treatment travel', 'Non-emergency journeys to specialist centres.'],
      ['Post-treatment return', 'A considered return journey once clinical teams agree.'],
      ['Remote-area transfers', 'Access from locations where ground transfer is impractical.'],
      ['Insurer & hospital requests', 'Coordination with assistance companies and treating teams.'],
    ],
    steps: [
      ['Share the essentials', 'Origin, destination, condition category and timing — high-level details only.'],
      ['Clinical review', 'The treating doctor and the operator’s medical team review fitness to fly.'],
      ['Confirm suitability', 'Medical crew, aircraft configuration, availability, price and terms are confirmed together.'],
      ['Align the handover', 'Ground ambulances and the receiving team are coordinated before the flight proceeds.'],
    ],
    formGroups: [
      {
        legend: 'Patient journey',
        fields: [
          { name: 'origin', label: 'Origin city or hospital', required: true, placeholder: 'e.g. Kolhapur' },
          { name: 'destination', label: 'Destination city or hospital', required: true, placeholder: 'e.g. Mumbai' },
          { name: 'urgency', label: 'Urgency', type: 'select', required: true, options: ['Planned — more than 72 hours away', 'Within 24–72 hours', 'Within 24 hours (time-sensitive, not an emergency)'], hint: 'For an emergency, call local emergency services now.' },
          { name: 'conditionCategory', label: 'Patient condition category', type: 'select', required: true, options: ['Stable — seated or with mobility assistance', 'Stable — stretcher required', 'Requires medical supervision in flight', 'Requires intensive care support', 'Not sure — prefer to discuss with a clinician'] },
          { name: 'groundAmbulance', label: 'Ground ambulance required?', type: 'select', required: true, options: ['At both ends', 'At origin only', 'At destination only', 'Not required', 'Not sure'] },
          { name: 'attendants', label: 'Attendants travelling', type: 'number', min: 0, max: 4, required: true, placeholder: 'Family members or carers', hint: 'Seats for attendants depend on the aircraft configuration.' },
        ],
      },
      {
        legend: 'Treating hospital',
        fields: [
          { name: 'hospitalContact', label: 'Hospital / treating doctor contact', type: 'textarea', wide: true, optional: true, placeholder: 'Hospital name, treating doctor and a contact number or email. Do not upload or paste medical records.' },
        ],
      },
      {
        legend: 'Requester details',
        fields: [
          { name: 'name', label: 'Your name', required: true, autoComplete: 'name', placeholder: 'Your full name' },
          { name: 'relationship', label: 'Your relationship to the patient', type: 'select', required: true, options: ['Patient', 'Family member', 'Hospital / clinician', 'Insurer or assistance company', 'Employer', 'Other'] },
          ...contactFields(false).slice(1),
          { name: 'message', label: 'Additional notes', type: 'textarea', wide: true, optional: true, placeholder: 'High-level details only — equipment, language or family needs. Please do not include medical records.' },
        ],
      },
    ],
    faqs: [
      ['Can I use this form in a medical emergency?', 'No. This is not an emergency dispatch channel. Call your local emergency services immediately. This form is for planned and time-sensitive enquiries.'],
      ['Does submitting confirm a medical flight?', 'No. Clinical suitability, operator capability, aircraft availability, price and terms must all be confirmed first.'],
      ['What medical information should I share?', 'Only the high-level details requested. The operator’s medical team will request clinical information through an appropriate secure channel. Please do not send records through this form.'],
      ['Can family travel with the patient?', 'Where the aircraft configuration allows, family accompaniment can be coordinated. This is confirmed case by case with the operator and medical team.'],
    ],
    compliance: 'Medical flights are operated by licensed air ambulance operators with their own medical crews. Fitness to fly is decided by the treating doctor and the operator’s medical team. Sanatan Airlines does not provide medical advice or emergency dispatch.',
    related: ['private-jet-charter', 'helicopter-charter', 'aviation-concierge'],
  },

  'aircraft-advisory': {
    name: 'Aircraft Advisory',
    short: 'Aircraft advisory',
    nameSerif: 'Buy · Sell · Lease',
    eyebrow: 'Aviation services · Advisory',
    sub: 'Independent coordination for individuals and organisations considering an aircraft purchase, sale or lease — through verified partners.',
    image: '/images/aircraft-adv.jpg',
    imageAlt: 'A line of red and white jet aircraft parked on an airfield apron',
    imagePosition: '60% 55%',
    formType: 'aircraft_advisory',
    introTitle: 'An independent view before a long-term decision.',
    introCopy: [
      'Acquiring, selling or leasing an aircraft is a long-term commitment. The value of good advice is measured in the questions asked early.',
      'Sanatan Airlines provides coordination and advisory support — helping you define requirements, understand options and engage verified third-party partners. We do not buy or sell aircraft as principal, and we do not operate aircraft.',
    ],
    benefits: [
      { icon: Compass, title: 'Requirement first', copy: 'Mission, range and cabin needs defined before any aircraft is discussed.' },
      { icon: ClipboardCheck, title: 'Acquisition & sale support', copy: 'Process coordination and introductions through verified partners, subject to independent due diligence.' },
      { icon: Globe2, title: 'Leasing options', copy: 'Lease enquiries aligned with intended use, region and operating plan.' },
      { icon: HeartHandshake, title: 'Long-term liaison', copy: 'Documentation, delivery planning and continued support after the decision.' },
    ],
    useCases: [
      ['First aircraft purchase', 'A structured, unhurried first conversation.'],
      ['Sale of an aircraft', 'Coordinated introductions to verified partners.'],
      ['Lease vs. buy', 'Understand trade-offs before committing capital.'],
      ['Fleet planning', 'Define categories, missions and operating assumptions.'],
      ['Due diligence support', 'Independent technical, legal and tax advice remains essential.'],
      ['Charter vs. ownership', 'Compare access models before choosing to own.'],
    ],
    steps: [
      ['Define the requirement', 'Mission, region, budget, timeline and the outcome you need.'],
      ['Scope the advisory', 'Agree what coordination and introductions are appropriate.'],
      ['Verify partners', 'Engage verified specialists for technical, legal and financial review.'],
      ['Support the decision', 'Coordinate documents, timelines and next steps without acting as principal.'],
    ],
    formGroups: [
      {
        legend: 'Requirement',
        fields: [
          { name: 'transaction', label: 'Purchase, sale or lease', type: 'select', required: true, options: ['Purchase', 'Sale', 'Lease', 'Not sure yet — advisory'] },
          { name: 'aircraftType', label: 'Aircraft type or category', type: 'select', required: true, options: advisoryAircraft },
          { name: 'intendedUse', label: 'Intended use', type: 'textarea', wide: true, required: true, placeholder: 'Typical missions, routes, passengers and how often the aircraft will fly' },
          { name: 'budget', label: 'Budget range', type: 'select', optional: true, options: ['Under USD 5 million', 'USD 5–15 million', 'USD 15–35 million', 'Above USD 35 million', 'Prefer to discuss'] },
          { name: 'region', label: 'Preferred region', optional: true, placeholder: 'e.g. India, Gulf, Europe' },
          { name: 'timeline', label: 'Timeline', type: 'select', optional: true, options: timelineOptions },
        ],
      },
      {
        legend: 'Your details',
        fields: [
          ...contactFields(true),
          { name: 'message', label: 'Anything else', type: 'textarea', wide: true, optional: true, placeholder: 'For a sale: model, year and registration country help the first conversation' },
        ],
      },
    ],
    faqs: [
      ['Does Sanatan Airlines own or sell aircraft?', 'No. We coordinate enquiries and advisory work with verified partners. We do not buy or sell aircraft as principal, and we do not operate aircraft.'],
      ['Is this a valuation or legal advice?', 'No. Any valuation, legal, tax or technical review is provided by appropriately qualified independent specialists.'],
      ['Why ask for a budget range?', 'It is optional. A range simply helps the first conversation focus on realistic categories.'],
      ['What happens after I submit?', 'A coordinator reviews your requirement and responds personally to arrange a first conversation. No obligation is implied.'],
    ],
    compliance: 'Sanatan Airlines provides coordination and advisory services only and does not act as principal in any aircraft transaction. Transactions involve verified third parties and remain subject to independent legal, tax and technical advice.',
    related: ['aircraft-leasing', 'private-jet-charter', 'aviation-concierge'],
  },

  'aircraft-leasing': {
    name: 'Aircraft Leasing',
    short: 'Aircraft leasing',
    nameSerif: 'Coordination',
    eyebrow: 'Aviation services · Leasing',
    sub: 'A first step toward understanding an aircraft leasing requirement — matched with verified lessors and operators.',
    image: '/images/Aircraft-Leasing.jpg',
    imageAlt: 'Front view of a twin-turboprop aircraft parked on an apron at golden hour',
    imagePosition: 'center 58%',
    formType: 'aircraft_leasing',
    introTitle: 'Access to an aircraft, without ownership.',
    introCopy: [
      'Leasing can suit seasonal demand, a defined project or a step before ownership. The right structure depends on how the aircraft will be used and who will operate it.',
      'Share the aircraft category, intended use, region and term. Any leasing option is subject to counterparty, aircraft availability, due diligence and contract review.',
    ],
    benefits: [
      { icon: Compass, title: 'Use-led structure', copy: 'Wet, dry or ACMI options considered against your operating plan.' },
      { icon: ClipboardCheck, title: 'Verified counterparties', copy: 'Lessors and operators introduced only after verification.' },
      { icon: Clock, title: 'Term that fits', copy: 'Short, seasonal or long-term arrangements discussed openly.' },
      { icon: ShieldCheck, title: 'Diligence first', copy: 'Contracts and technical records reviewed by independent specialists.' },
    ],
    useCases: [
      ['Seasonal capacity', 'Additional lift for peak travel periods.'],
      ['Project-based operations', 'An aircraft for the life of a defined project.'],
      ['Corporate shuttles', 'Regular movement between sites or cities.'],
      ['Step before ownership', 'Experience an aircraft category before buying.'],
      ['Regional requirements', 'Aircraft suited to a specific region or terrain.'],
      ['Early-stage research', 'Understand structures and terms before committing.'],
    ],
    steps: [
      ['Outline the requirement', 'Aircraft category, intended use and operating region.'],
      ['Clarify term and timing', 'Lease type, duration and start date.'],
      ['Review counterparties', 'Verified lessors and operators are identified.'],
      ['Discuss terms', 'Terms and due diligence are handled with independent advice.'],
    ],
    formGroups: [
      {
        legend: 'Requirement',
        fields: [
          { name: 'aircraftCategory', label: 'Aircraft type or category', type: 'select', required: true, options: advisoryAircraft },
          { name: 'leaseTerm', label: 'Preferred lease term', type: 'select', required: true, options: ['Short term (under 3 months)', 'Seasonal (3–12 months)', 'Long term (over 12 months)', 'To be discussed'] },
          { name: 'leaseType', label: 'Lease type', type: 'select', optional: true, options: ['Wet lease (with crew)', 'Dry lease (aircraft only)', 'ACMI', 'Not sure'] },
          { name: 'intendedUse', label: 'Intended use', type: 'textarea', wide: true, required: true, placeholder: 'Missions, routes, utilisation and who will operate the aircraft' },
          { name: 'budget', label: 'Budget range', type: 'select', optional: true, options: ['Prefer to discuss', 'Under USD 100,000 per month', 'USD 100,000–300,000 per month', 'Above USD 300,000 per month'] },
          { name: 'region', label: 'Preferred region', optional: true, placeholder: 'e.g. India, Gulf' },
          { name: 'timeline', label: 'Anticipated start', type: 'select', optional: true, options: timelineOptions },
        ],
      },
      {
        legend: 'Your details',
        fields: [
          ...contactFields(true),
          { name: 'requirements', label: 'Additional requirements', type: 'textarea', wide: true, optional: true },
        ],
      },
    ],
    faqs: [
      ['Are aircraft available to lease now?', 'No live availability is shown. Any suitable aircraft or counterparty must be confirmed for your specific request.'],
      ['Does the enquiry commit me to a lease?', 'No. It is an initial enquiry only. Terms, due diligence and contracts are handled separately.'],
      ['Who is the lessor?', 'Any relevant counterparty is identified during the discussion and before you are asked to consider terms.'],
      ['What is the difference between wet and dry leasing?', 'A wet lease includes crew, maintenance and insurance from the lessor; a dry lease provides the aircraft only, with you or your operator responsible for operation.'],
    ],
    compliance: 'Sanatan Airlines coordinates leasing enquiries and does not act as lessor. Any lease is subject to counterparty verification, regulatory approval for the intended operation, independent due diligence and a written contract.',
    related: ['aircraft-advisory', 'private-jet-charter', 'international-charter'],
  },

  'aviation-concierge': {
    name: 'Aviation Concierge',
    short: 'Aviation concierge',
    nameSerif: 'Coordination',
    eyebrow: 'Aviation services · Concierge',
    sub: 'One place to describe the practical details around your aviation plans — ground arrangements, lounges, assistance and itinerary support.',
    image: '/images/club-lounge.jpg',
    imageAlt: 'A quiet, warmly lit airport lounge',
    formType: 'aviation_concierge',
    introTitle: 'The journey around the flight, considered.',
    introCopy: [
      'A good flight can still be undone by a missed transfer or a long wait. Concierge support looks after the practical details either side of departure.',
      'Tell us what would make your journey easier. A coordinator will clarify the request and explain which elements can be arranged, subject to provider availability and airport requirements.',
    ],
    benefits: [
      { icon: UsersRound, title: 'Meet & assist', copy: 'Arrival and departure assistance where the airport permits it.' },
      { icon: MapPinned, title: 'Ground arrangements', copy: 'Chauffeur transfers and onward travel aligned with flight timing.' },
      { icon: HeartHandshake, title: 'Special requirements', copy: 'Accessibility, elderly travellers and family needs planned in advance.' },
      { icon: MessagesSquare, title: 'One point of contact', copy: 'A single coordinator for the details around your trip.' },
    ],
    useCases: [
      ['Arrival & departure assistance', 'Help through the airport where services are available.'],
      ['Lounge access enquiries', 'Subject to airport, lounge and ticket conditions.'],
      ['Chauffeur & transfers', 'Ground transport aligned with the flight.'],
      ['Elderly & accessibility support', 'Wheelchairs, escorts and pacing arranged ahead.'],
      ['Itinerary coordination', 'Several bookings held together in one plan.'],
      ['Event & group movement', 'Guests arriving together, coordinated calmly.'],
    ],
    steps: [
      ['Describe the support', 'Itinerary, airports and the help you need.'],
      ['Clarify timing', 'Dates, flight times and preferences.'],
      ['Confirm what is possible', 'Provider availability and airport rules are checked.'],
      ['Agree terms', 'Responsibilities, price and terms are shared before booking.'],
    ],
    formGroups: [
      {
        legend: 'Support needed',
        fields: [
          { name: 'supportType', label: 'Type of support', type: 'select', required: true, options: ['Meet & assist', 'Lounge access', 'Chauffeur / ground transfer', 'Accessibility or special assistance', 'Itinerary coordination', 'Other'] },
          { name: 'route', label: 'Airports or itinerary', optional: true, placeholder: 'e.g. Mumbai (BOM) → Dubai (DXB)' },
          { name: 'travelDate', label: 'Travel date', type: 'date', optional: true },
          { name: 'passengers', label: 'Travellers', type: 'number', min: 1, max: 50, optional: true },
          { name: 'requirements', label: 'What would you like help with?', type: 'textarea', wide: true, required: true, placeholder: 'Flight numbers if known, arrival times, assistance needs and preferences' },
        ],
      },
      { legend: 'Your details', fields: contactFields(true) },
    ],
    faqs: [
      ['Does concierge support include flight booking?', 'Any flight request is handled as a separate enquiry and remains subject to operator confirmation and terms.'],
      ['Are ground services guaranteed?', 'No. Provider availability, airport rules and requirements must be confirmed individually.'],
      ['Can I include special requirements?', 'Yes. Share only what is needed to understand your request. Sensitive details can be discussed through an appropriate channel.'],
    ],
    compliance: 'Concierge services are provided by airports, lounges and licensed ground-service providers under their own terms. Sanatan Airlines coordinates requests and confirms what can be arranged before anything is booked.',
    related: ['private-jet-charter', 'international-charter', 'helicopter-charter'],
  },
};

/* Public URL for a service (the concierge page lives at /aviation/concierge — see next.config.mjs). */
export const serviceHref = (slug) => (slug === 'aviation-concierge' ? '/aviation/concierge' : `/aviation/${slug}`);

/* Order used by the service switcher and the "related" cards */
export const serviceOrder = [
  'private-jet-charter', 'international-charter', 'helicopter-charter', 'air-ambulance',
  'aircraft-advisory', 'aircraft-leasing', 'aviation-concierge',
];
