'use client';
import {
  AlertTriangle, BarChart2, Bell, CheckCircle, ClipboardList, Clock, DoorOpen, Globe2, Hotel, Luggage,
  MapPin, Phone, Plane, PlaneLanding, PlaneTakeoff, Radio, RefreshCw, Search, ShieldCheck, Timer, Umbrella, XCircle,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { PageLayout } from '../AirlineLayout.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';

// Sample data — the live board connects to Operations Control in production.
const SAMPLE_FLIGHTS = [
  { flight: 'SN 101', from: 'Mumbai (BOM)', to: 'Delhi (DEL)', dep: '06:00', arr: '08:10', status: 'On Time', gate: 'A12', terminal: 'T2', aircraft: 'Airbus A320neo', belt: '—' },
  { flight: 'SN 204', from: 'Delhi (DEL)', to: 'Dubai (DXB)', dep: '07:45', arr: '10:15', status: 'Boarding', gate: 'B6', terminal: 'T3', aircraft: 'Airbus A321neo', belt: '—' },
  { flight: 'SN 312', from: 'Bengaluru (BLR)', to: 'Singapore (SIN)', dep: '09:30', arr: '15:45', status: 'On Time', gate: 'C3', terminal: 'T2', aircraft: 'Boeing 787-9', belt: '—' },
  { flight: 'SN 445', from: 'Mumbai (BOM)', to: 'London (LHR)', dep: '11:00', arr: '17:30+1', status: 'Delayed 20 min', gate: 'D9', terminal: 'T2', aircraft: 'Airbus A350-900', belt: '—' },
  { flight: 'SN 087', from: 'Chennai (MAA)', to: 'Colombo (CMB)', dep: '13:15', arr: '14:00', status: 'On Time', gate: 'A5', terminal: 'T1', aircraft: 'Airbus A320neo', belt: '—' },
  { flight: 'SN 560', from: 'Delhi (DEL)', to: 'New York (JFK)', dep: '14:30', arr: '19:45+1', status: 'On Time', gate: 'E2', terminal: 'T3', aircraft: 'Boeing 777-300ER', belt: '—' },
];

const SAMPLE_ARRIVALS = [
  { flight: 'SN 102', from: 'Delhi (DEL)', to: 'Mumbai (BOM)', dep: '06:30', arr: '08:40', status: 'Landed', gate: 'A14', terminal: 'T2', aircraft: 'Airbus A320neo', belt: '4' },
  { flight: 'SN 205', from: 'Dubai (DXB)', to: 'Delhi (DEL)', dep: '11:30', arr: '16:20', status: 'Departed', gate: 'B8', terminal: 'T3', aircraft: 'Airbus A321neo', belt: '7' },
  { flight: 'SN 313', from: 'Singapore (SIN)', to: 'Bengaluru (BLR)', dep: '16:45', arr: '19:05', status: 'On Time', gate: 'C5', terminal: 'T2', aircraft: 'Boeing 787-9', belt: '2' },
  { flight: 'SN 088', from: 'Colombo (CMB)', to: 'Chennai (MAA)', dep: '15:00', arr: '15:50', status: 'Delayed 15 min', gate: 'A3', terminal: 'T1', aircraft: 'Airbus A320neo', belt: '3' },
  { flight: 'SN 561', from: 'New York (JFK)', to: 'Delhi (DEL)', dep: '21:30', arr: '21:10+1', status: 'On Time', gate: 'E4', terminal: 'T3', aircraft: 'Boeing 777-300ER', belt: '9' },
  { flight: 'SN 446', from: 'London (LHR)', to: 'Mumbai (BOM)', dep: '20:00', arr: '10:30+1', status: 'Scheduled', gate: 'D11', terminal: 'T2', aircraft: 'Airbus A350-900', belt: '6' },
];

function statusKey(status) {
  if (status.startsWith('Delayed')) return 'delayed';
  return status.toLowerCase().replace(/\s+/g, '-');
}

const PROGRESS = { scheduled: 0, 'on-time': 0, delayed: 0, boarding: 8, departed: 55, landed: 100, cancelled: 0 };

const STATUS_GUIDE = [
  { key: 'scheduled', label: 'Scheduled', Icon: Clock, d: 'The flight is planned and published. Live updates begin 24 hours before departure.' },
  { key: 'on-time', label: 'On Time', Icon: CheckCircle, d: 'Operating within 15 minutes of the published schedule.' },
  { key: 'boarding', label: 'Boarding', Icon: DoorOpen, d: 'The gate is open. Boarding usually closes 20 minutes before departure.' },
  { key: 'delayed', label: 'Delayed', Icon: Timer, d: 'A revised departure time is shown. Alerts are sent for delays of 30 minutes or more.' },
  { key: 'departed', label: 'Departed', Icon: PlaneTakeoff, d: 'Confirmed airborne once the departure message is transmitted by the aircraft.' },
  { key: 'landed', label: 'Landed', Icon: PlaneLanding, d: 'Touched down at the destination. The baggage belt number is shown on arrival.' },
  { key: 'cancelled', label: 'Cancelled', Icon: XCircle, d: 'Our team contacts you with free rebooking on the next flight or a full refund.' },
  { key: 'diverted', label: 'Diverted', Icon: AlertTriangle, d: 'Landing at an alternate airport. Onward arrangements are shared as soon as confirmed.' },
];

// Airport codes typed by the user (e.g. "BOM-LHR", "bom lhr").
function codesOf(text) {
  return (text.toUpperCase().match(/[A-Z]{3}/g) || []);
}

// Airport code of a board entry such as "Dubai (DXB)".
function airportCode(place) {
  const m = place.match(/(([A-Z]{3}))/);
  return m ? m[1] : place.slice(0, 3).toUpperCase();
}

export default function FlightStatusPage() {
  useI18n();
  const [flightNo, setFlightNo] = useState('');
  const [route, setRoute] = useState('');
  const [date, setDate] = useState('');
  const [board, setBoard] = useState('departures');
  const [query, setQuery] = useState({ flightNo: '', route: '' });
  const [selected, setSelected] = useState('SN 204');

  const all = board === 'departures' ? SAMPLE_FLIGHTS : SAMPLE_ARRIVALS;
  const rows = useMemo(() => {
    const fq = query.flightNo.replace(/\s+/g, '').toUpperCase();
    const rq = codesOf(query.route);
    return all.filter((f) => {
      if (fq && !f.flight.replace(/\s+/g, '').toUpperCase().includes(fq)) return false;
      if (rq.length) {
        const fc = airportCode(f.from);
        const tc = airportCode(f.to);
        if (rq.length === 1 && rq[0] !== fc && rq[0] !== tc) return false;
        if (rq.length >= 2 && !(rq[0] === fc && rq[1] === tc)) return false;
      }
      return true;
    });
  }, [all, query]);

  const tracked = [...SAMPLE_FLIGHTS, ...SAMPLE_ARRIVALS].find((f) => f.flight === selected) || SAMPLE_FLIGHTS[1];
  const trackedKey = statusKey(tracked.status);
  const progress = PROGRESS[trackedKey] ?? 0;
  const searched = Boolean(query.flightNo || query.route);

  const runSearch = () => {
    const next = { flightNo, route };
    setQuery(next);
    const fq = flightNo.replace(/\s+/g, '').toUpperCase();
    const pool = [...SAMPLE_FLIGHTS, ...SAMPLE_ARRIVALS];
    const hit = fq ? pool.find((f) => f.flight.replace(/\s+/g, '').toUpperCase().includes(fq)) : null;
    if (hit) {
      setBoard(SAMPLE_FLIGHTS.includes(hit) ? 'departures' : 'arrivals');
      setSelected(hit.flight);
    }
  };

  const clearSearch = () => { setFlightNo(''); setRoute(''); setDate(''); setQuery({ flightNo: '', route: '' }); };

  return (
    <PageLayout>

      {/* ── HERO ── */}
      <section className="fs-hero">
        <img className="fs-hero-img" src="/images/sa-jet-tarmac.jpg" alt="" aria-hidden="true" />
        <div className="fs-hero-inner">
          <div className="fs-live"><span className="fs-live-dot" />Live — Updated every 60 s</div>
          <h1>Flight Status</h1>
          <p>Real-time gates, delays and arrival updates for every Sanatan Airlines flight.</p>
        </div>
      </section>

      {/* ── SEARCH ── */}
      <section className="fs-search">
        <form className="fs-search-card" onSubmit={(e) => { e.preventDefault(); runSearch(); }}>
          <div className="fs-field">
            <label htmlFor="fs-flight">Flight Number</label>
            <div className="fs-input"><Plane size={16} /><input id="fs-flight" placeholder="e.g. SN 204" value={flightNo} onChange={(e) => setFlightNo(e.target.value)} /></div>
          </div>
          <div className="fs-field">
            <label htmlFor="fs-route">Route</label>
            <div className="fs-input"><MapPin size={16} /><input id="fs-route" placeholder="e.g. BOM–LHR" value={route} onChange={(e) => setRoute(e.target.value)} /></div>
          </div>
          <div className="fs-field">
            <label htmlFor="fs-date">Date</label>
            <div className="fs-input"><Clock size={16} /><input id="fs-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
          </div>
          <button className="al-btn-primary fs-search-btn" type="submit"><Search size={16} />Search</button>
        </form>
      </section>

      {/* ── BOARD + TRACKER ── */}
      <section className="fs-board-section">
        <div className="al-container fs-board-layout">
          <div className="fs-board">
            <div className="fs-board-head">
              <div className="fs-board-tabs" role="tablist" aria-label="Flight board">
                <button type="button" role="tab" aria-selected={board === 'departures'} className={board === 'departures' ? 'is-active' : ''} onClick={() => setBoard('departures')}><PlaneTakeoff size={15} />Today&apos;s Departures</button>
                <button type="button" role="tab" aria-selected={board === 'arrivals'} className={board === 'arrivals' ? 'is-active' : ''} onClick={() => setBoard('arrivals')}><PlaneLanding size={15} />Today&apos;s Arrivals</button>
              </div>
              <div className="fs-legend">
                <span className="is-ok">On Time</span><span className="is-board">Boarding</span><span className="is-late">Delayed</span>
              </div>
            </div>

            {searched && (
              <div className="fs-search-note">
                <span>Showing {rows.length} result{rows.length === 1 ? '' : 's'}{query.flightNo ? ` for “${query.flightNo}”` : ''}{query.route ? ` on ${query.route}` : ''}</span>
                <button type="button" onClick={clearSearch}>Clear search</button>
              </div>
            )}

            <div className="fs-table" role="table" aria-label={board === 'departures' ? "Today's departures" : "Today's arrivals"}>
              <div className="fs-row fs-row--head" role="row">
                {['Flight', 'From', 'To', 'Dep', 'Arr', 'Status', board === 'departures' ? 'Gate' : 'Belt'].map((h) => <div key={h} role="columnheader">{h}</div>)}
              </div>
              {rows.map((f) => (
                <button
                  type="button"
                  key={f.flight}
                  role="row"
                  className={`fs-row${selected === f.flight ? ' is-selected' : ''}`}
                  onClick={() => setSelected(f.flight)}
                  aria-label={`Track ${f.flight}`}
                >
                  <div className="fs-cell-flight">{f.flight}</div>
                  <div>{f.from}</div>
                  <div>{f.to}</div>
                  <div className="fs-mono">{f.dep}</div>
                  <div className="fs-mono fs-muted">{f.arr}</div>
                  <div><span className={`fs-status fs-status--${statusKey(f.status)}`}>{f.status}</span></div>
                  <div className="fs-mono fs-gate">{board === 'departures' ? f.gate : f.belt}</div>
                </button>
              ))}
              {rows.length === 0 && (
                <div className="fs-empty">No flights match your search on today&apos;s {board}. Check the flight number or try the other board.</div>
              )}
            </div>
            <p className="fs-note">Sample data shown. Sign in for real-time tracking on your booking.</p>
          </div>

          {/* Tracker */}
          <aside className="fs-tracker" aria-live="polite">
            <div className="fs-tracker-top">
              <span className="fs-tracker-label">Flight tracker</span>
              <span className={`fs-status fs-status--${trackedKey}`}>{tracked.status}</span>
            </div>
            <div className="fs-tracker-flight">{tracked.flight}</div>
            <div className="fs-route">
              <div>
                <div className="fs-code">{airportCode(tracked.from)}</div>
                <div className="fs-city">{tracked.from.replace(/\s*\(.*\)/, '')}</div>
                <div className="fs-time">{tracked.dep}</div>
              </div>
              <div className="fs-path">
                <div className="fs-path-line"><span style={{ width: `${progress}%` }} /></div>
                <Plane className="fs-path-plane" size={18} style={{ left: `calc(${progress}% - 9px)` }} />
              </div>
              <div className="fs-route-end">
                <div className="fs-code">{airportCode(tracked.to)}</div>
                <div className="fs-city">{tracked.to.replace(/\s*\(.*\)/, '')}</div>
                <div className="fs-time">{tracked.arr}</div>
              </div>
            </div>
            <dl className="fs-facts">
              <div><dt>Terminal</dt><dd>{tracked.terminal}</dd></div>
              <div><dt>Gate</dt><dd>{tracked.gate}</dd></div>
              <div><dt>Baggage belt</dt><dd>{tracked.belt}</dd></div>
              <div><dt>Aircraft</dt><dd>{tracked.aircraft}</dd></div>
            </dl>
            <Link href="/airline/manage-booking" className="al-btn-primary fs-tracker-btn"><Bell size={15} />Get alerts for this flight</Link>
            <p className="fs-tracker-hint">Select any flight on the board to track it here.</p>
          </aside>
        </div>
      </section>

      {/* ── AT A GLANCE ── */}
      <section className="fs-glance">
        <div className="al-container fs-glance-grid">
          {[
            { Icon: RefreshCw, v: '60 s', l: 'Board refresh interval' },
            { Icon: Clock, v: '24 h', l: 'Live status window before departure' },
            { Icon: Bell, v: '30 min', l: 'Delay threshold for automatic alerts' },
            { Icon: Globe2, v: '85', l: 'Destinations on our network' },
          ].map(({ Icon, v, l }) => (
            <div key={l} className="fs-glance-item"><Icon size={20} /><strong>{v}</strong><span>{l}</span></div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">How It Works</div><h2>Getting the Most Accurate Status</h2></div>
          <div className="al-steps">
            {[
              { n: '01', icon: <Search size={20}/>, t: 'Enter Your Flight', d: 'Type the flight number (e.g. SN 204) or select origin and destination airports.' },
              { n: '02', icon: <Radio size={20}/>, t: 'Live Data Pulled', d: 'We connect to our Operations Control Centre for real-time gate, delay and weather data.' },
              { n: '03', icon: <BarChart2 size={20}/>, t: 'Status Displayed', d: 'Departure gate, estimated takeoff, landing status and baggage carousel are shown.' },
              { n: '04', icon: <Bell size={20}/>, t: 'Set Alerts', d: 'Sign in to SkyNova and enable push notifications or SMS for automatic status alerts.' },
            ].map((s) => (
              <div key={s.n} className="al-step">
                <div className="al-step-num">{s.n}</div>
                <div className="al-step-icon">{s.icon}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATUS CODES ── */}
      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">Know the Board</div><h2>What Each Status Means</h2><p className="al-section-lead">The same status labels appear on the board, in your booking and in every alert we send.</p></div>
          <div className="fs-guide">
            {STATUS_GUIDE.map(({ key, label, Icon, d }) => (
              <div key={key} className={`fs-guide-card fs-guide-card--${key}`}>
                <span className="fs-guide-icon"><Icon size={18} /></span>
                <h3>{label}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DAY OF TRAVEL ── */}
      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">Day of Travel</div><h2>Your Timeline to Take-off</h2><p className="al-section-lead">Plan around these windows and keep an eye on the board for gate changes.</p></div>
          <ol className="fs-timeline">
            {[
              { t: '48 hours before', h: 'Online check-in opens', d: 'Check in online or in the app and download your mobile boarding pass.', href: '/airline/check-in', cta: 'Check in online' },
              { t: '24 hours before', h: 'Live status begins', d: 'Gate, terminal and estimated times appear on this page and in your booking.', href: '/airline/manage-booking', cta: 'Manage booking' },
              { t: '3 hours before', h: 'Arrive for international flights', d: 'Allow time for bag drop, immigration and security. International check-in closes 2 hours before.', href: '/airline/baggage', cta: 'Baggage rules' },
              { t: '45 minutes before', h: 'Domestic check-in closes', d: 'Domestic check-in and bag drop close 45 minutes before departure.', href: '/airline/check-in', cta: 'Check-in windows' },
              { t: '20 minutes before', h: 'Boarding gate closes', d: 'Be at the gate when boarding opens — gates close 20 minutes before departure.', href: '/airline/airport-lounges', cta: 'Relax in a lounge' },
            ].map((s) => (
              <li key={s.t} className="fs-timeline-item">
                <span className="fs-timeline-time">{s.t}</span>
                <div className="fs-timeline-body">
                  <h3>{s.h}</h3>
                  <p>{s.d}</p>
                  <Link href={s.href}>{s.cta} →</Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── DISRUPTION SUPPORT ── */}
      <section className="al-section al-section--navy">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">If Plans Change</div><h2>Delay &amp; Disruption Support</h2><p className="al-section-lead">When things don&apos;t go to plan, here is what happens next.</p></div>
          <div className="fs-support">
            {[
              { Icon: Timer, h: 'Delayed flight', d: 'Automatic SMS and email alerts for delays of 30 minutes or more, with the revised departure time on the board.' },
              { Icon: RefreshCw, h: 'Cancelled flight', d: 'Free rebooking on the next available flight, or a full refund if no suitable alternative exists within 24 hours.' },
              { Icon: Hotel, h: 'Missed connection', d: 'We rebook you on the next available service and assist with accommodation where a connection is disrupted.' },
              { Icon: ShieldCheck, h: 'Your rights', d: 'Support is provided in line with applicable DGCA passenger-protection rules and our Conditions of Carriage.' },
            ].map(({ Icon, h, d }) => (
              <div key={h} className="fs-support-card"><span className="fs-support-icon"><Icon size={20} /></span><h3>{h}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALERT SIGN-UP BANNER ── */}
      <section className="fs-alert">
        <div className="fs-alert-inner">
          <div>
            <div className="fs-alert-eyebrow">Never Miss an Update</div>
            <h2>Get instant alerts for your flight</h2>
            <p>SMS and push notifications for delays, gate changes and boarding calls.</p>
          </div>
          <Link href="/airline/skynova-rewards" className="fs-alert-btn"><Bell size={15} />Enable Alerts →</Link>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><h2>Flight Status FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['How far in advance is flight status available?', 'Status information is available 24 hours before scheduled departure. For bookings further out, we recommend checking 24 hours prior to your flight.'],
              ['What do the status codes mean?', '"On Time" means within 15 minutes of schedule. "Delayed" shows the revised departure time. "Boarding" means the gate is open. "Departed" and "Landed" are confirmed once transmitted by the aircraft.'],
              ['Will I be notified of delays automatically?', 'If you have provided an email address or mobile number at booking, our system sends automatic SMS and email alerts for delays of 30 minutes or more. SkyNova members can enable push notifications in the app.'],
              ['What if my flight is cancelled?', 'In case of cancellation, you will be contacted by our team and offered rebooking on the next available flight at no charge, or a full refund if no suitable alternative exists within 24 hours.'],
              ['Can I track my checked baggage?', 'Once your baggage is loaded, you can track it via the Manage Booking section. Baggage status shows loading confirmation and destination carousel number on arrival.'],
              ['Can I check the status of an arriving flight?', 'Yes. Switch the board to "Today\'s Arrivals" to see expected arrival times and the baggage belt for each flight, or search by flight number.'],
              ['Why has my gate changed?', 'Gates can change for operational reasons such as aircraft swaps or airport congestion. Gate changes are shown on the board and sent as alerts — always follow airport screens on the day.'],
            ].map(([q, a]) => (
              <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<ClipboardList size={20}/>, 'Manage Booking', '/airline/manage-booking'], [<CheckCircle size={20}/>, 'Check-in Online', '/airline/check-in'], [<Plane size={20}/>, 'Book a Flight', '/airline/book-flight'], [<Luggage size={20}/>, 'Baggage Info', '/airline/baggage'], [<Phone size={20}/>, 'Contact Us', '/airline/contact'], [<Umbrella size={20}/>, 'Lounges', '/airline/airport-lounges']].map(([icon, label, href]) => (
              <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>
            ))}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Data Accuracy:</strong> Flight status is for passenger convenience only. Always confirm departure times at the airport.</div>
        </div>
      </section>
    </PageLayout>
  );
}
