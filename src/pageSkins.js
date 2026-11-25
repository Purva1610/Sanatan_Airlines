/*
 * Page skins — gives every page its own visual identity (hero composition,
 * colour mood, card style, display font, scroll-animation style and Indian
 * photography) WITHOUT touching page content. Consumed by <PageSkin>.
 *
 *   hero    cinema | split | arch | frame | saffron | panorama | mosaic | orbit
 *   tone    royal | saffron | midnight | ivory | sky
 *   cards   lift | outline | glass | band | number
 *   font    playfair | cormorant | marcellus | fraunces | dmserif
 *   motion  rise | blur | mask | slide | zoom | flip
 *   pattern jaali | dots | waves | arches | none   (used on dark sections only)
 *   align   center | left                          (section headers)
 */

const I = (name) => `/images/india/${name}.jpg`;
const L = (name) => `/images/${name}.jpg`;

// Pool used for the secondary tiles of the "mosaic" hero.
const POOL = [
  I('jaipur-hawa-mahal'), I('kerala-backwaters'), I('varanasi-ghats'), I('agra-taj-classic'),
  I('amritsar-golden-temple'), I('kashmir-dal-lake'), I('south-temple-gopuram'), I('himalaya-peaks'),
  I('mumbai-gateway-dusk'), I('delhi-india-gate'), I('kerala-houseboat'), I('jaipur-amer-fort'),
];

const HEROES = ['cinema', 'split', 'arch', 'frame', 'saffron', 'panorama', 'mosaic', 'orbit'];
const TONES = ['royal', 'ivory', 'saffron', 'sky', 'midnight'];
const CARDS = ['lift', 'outline', 'glass', 'band', 'number'];
const FONTS = ['playfair', 'cormorant', 'marcellus', 'fraunces', 'dmserif'];
const MOTIONS = ['rise', 'blur', 'mask', 'slide', 'zoom', 'flip'];
const PATTERNS = ['jaali', 'dots', 'waves', 'arches', 'none'];

/*
 * Ordered list of routes and their photo. Order drives the rotation of the
 * other dimensions (co-prime list lengths keep every combination distinct),
 * and an optional third value pins a specific hero layout.
 */
const ROUTES = [
  // ---- Airline ----
  ['/airline', I('mumbai-gateway-dusk'), 'cinema'],
  ['/airline/book-flight', I('agra-taj-reflection'), 'split'],
  ['/airline/manage-booking', I('agra-taj-marble'), 'arch'],
  ['/airline/check-in', I('delhi-india-gate'), 'saffron'],
  ['/airline/flight-status', I('himalaya-trek'), 'orbit'],
  ['/airline/destinations', I('agra-taj-classic'), 'panorama'],
  ['/airline/our-fleet', I('himalaya-peaks'), 'mosaic'],
  ['/airline/contact', I('kerala-backwater-boat'), 'frame'],
  ['/airline/enquiry', I('mumbai-gateway'), 'split'],
  ['/airline/first-class', I('agra-taj-doorway'), 'cinema'],
  ['/airline/business-class', I('jaipur-hawa-mahal'), 'arch'],
  ['/airline/premium-economy', I('delhi-red-fort-arches'), 'frame'],
  ['/airline/economy-class', I('kerala-backwaters'), 'panorama'],
  ['/airline/baggage', I('mumbai-cst'), 'mosaic'],
  ['/airline/excess-baggage', I('kolkata-victoria'), 'saffron'],
  ['/airline/sports-equipment', I('himalaya-trek'), 'orbit'],
  ['/airline/musical-instruments', I('varanasi-ghats'), 'arch'],
  ['/airline/cargo-services', I('mumbai-gateway-day'), 'cinema'],
  ['/airline/express-cargo', I('mumbai-gateway'), 'split'],
  ['/airline/dangerous-goods', I('himachal-river'), 'frame'],
  ['/airline/live-animals-cargo', I('kerala-forest'), 'panorama'],
  ['/airline/flexible-fares', I('kerala-houseboat'), 'orbit'],
  ['/airline/group-travel', I('jaipur-amer-fort'), 'mosaic'],
  ['/airline/multi-city', I('kashmir-meadow'), 'saffron'],
  ['/airline/round-the-world', I('agra-taj-trees'), 'cinema'],
  ['/airline/student-fares', I('kolkata-victoria'), 'split'],
  ['/airline/senior-fares', I('varanasi-ghats'), 'frame'],
  ['/airline/military-fares', I('india-flag'), 'saffron'],
  ['/airline/corporate-travel', I('bengaluru-vidhana'), 'panorama'],
  ['/airline/seat-selection', I('jaipur-hawa-mahal'), 'arch'],
  ['/airline/extra-legroom', I('kashmir-dal-lake'), 'orbit'],
  ['/airline/in-flight-entertainment', I('south-temple-gopuram'), 'mosaic'],
  ['/airline/in-flight-dining', I('indian-thali'), 'split'],
  ['/airline/special-assistance', I('kerala-backwater-boat'), 'arch'],
  ['/airline/wheelchair-assistance', I('agra-taj-reflection'), 'panorama'],
  ['/airline/unaccompanied-minors', I('kerala-houseboat'), 'frame'],
  ['/airline/pet-travel', I('kashmir-meadow'), 'orbit'],
  ['/airline/medical-clearance', I('himachal-stream'), 'split'],
  ['/airline/skynova-rewards', I('amritsar-golden-temple'), 'cinema'],
  ['/airline/airport-lounges', I('jaipur-amer-fort'), 'arch'],
  ['/airline/hotel-flight', I('agra-taj-arch'), 'mosaic'],
  ['/airline/car-rental', I('himachal-river'), 'saffron'],
  ['/airline/travel-insurance', I('himachal-stream'), 'frame'],
  ['/airline/gift-vouchers', I('amritsar-golden-temple'), 'orbit'],
  ['/airline/sustainability', I('kerala-forest'), 'panorama'],

  // ---- Aviation ----
  ['/aviation', I('himalaya-peaks'), 'split'],
  ['/aviation/private-jet-charter', L('sa-jet-tarmac')],
  ['/aviation/helicopter-charter', L('sa-helicopter-himalaya')],
  ['/aviation/air-ambulance', L('sa-air-ambulance-dawn')],
  ['/aviation/aircraft-advisory', L('sa-hero-jet')],
  ['/aviation/aircraft-leasing', L('sa-hero-jet')],
  ['/aviation/aviation-concierge', I('jaipur-hawa-mahal'), 'arch'],
  ['/aviation/international-charter', I('agra-taj-classic'), 'orbit'],
  ['/aviation/disclaimer', I('delhi-india-gate'), 'frame'],

  // ---- Club / Yatra (already bespoke heroes; skin drives tone, cards, fonts, motion) ----
  ['/club', L('sa-club-hero')],
  ['/club/membership', L('sa-club-family')],
  ['/club/single', L('single'), 'arch'],
  ['/club/couple', L('sa-club-tirupati'), 'orbit'],
  ['/club/family', L('sa-club-family'), 'panorama'],
  ['/club/benefits', L('sa-club-offering'), 'mosaic'],
  ['/club/destinations', L('sa-club-rameshwaram'), 'cinema'],
  ['/club/how-it-works', L('sa-club-ayodhya'), 'saffron'],
  ['/club/faqs', L('sa-club-kolhapur'), 'frame'],
  ['/club/terms', L('sa-club-shirdi'), 'split'],
  ['/tirth-yatra', L('sa-yatra-hero')],
  ['/tirth-yatra/enquiry', L('sa-yatra-chardham')],

  // ---- Global services ----
  ['/global-services', I('mumbai-gateway-dusk'), 'cinema'],
  ['/global-services/tours', I('jaipur-hawa-mahal'), 'arch'],
  ['/global-services/education', I('kolkata-victoria'), 'split'],
  ['/global-services/employment', I('bengaluru-vidhana'), 'orbit'],
  ['/global-services/business', I('mumbai-cst'), 'saffron'],
  ['/global-services/property', I('kerala-houseboat'), 'panorama'],
  ['/global-services/investment', I('delhi-india-gate'), 'mosaic'],
  ['/global-services/pr', I('kashmir-dal-lake'), 'frame'],
  ['/global-services/trade', I('mumbai-gateway-day'), 'cinema'],

  // ---- Franchise ----
  ['/franchise', I('jaipur-amer-fort'), 'saffron'],
  ['/franchise/opportunity', I('bengaluru-vidhana'), 'arch'],
  ['/franchise/investment', I('mumbai-gateway'), 'orbit'],
  ['/franchise/support', I('kerala-backwaters'), 'panorama'],
  ['/franchise/apply', I('delhi-red-fort-arches'), 'split'],
  ['/franchise/faqs', I('varanasi-ghats'), 'frame'],
  ['/franchise/disclaimer', I('kolkata-victoria'), 'mosaic'],

  // ---- Corporate & lead pages ----
  ['/leadership', I('agra-taj-doorway'), 'arch'],
  ['/contact', I('kerala-backwater-boat'), 'split'],
  ['/partners', I('mumbai-gateway-dusk'), 'orbit'],
  ['/partners/enquiry', I('amritsar-golden-temple'), 'frame'],
  ['/compliance', I('delhi-india-gate'), 'panorama'],
  ['/insights', I('varanasi-ghats'), 'mosaic'],
  ['/faqs', I('kashmir-dal-lake'), 'cinema'],
  ['/careers', I('bengaluru-vidhana'), 'saffron'],
  ['/enquire', I('agra-taj-classic'), 'split'],

  // ---- Legal ----
  ['/terms', I('agra-taj-marble'), 'frame'],
  ['/terms-and-conditions', I('agra-taj-marble'), 'frame'],
  ['/privacy-policy', I('delhi-red-fort-arches'), 'frame'],
  ['/cookie-policy', I('kerala-backwaters'), 'frame'],
  ['/cancellation-refund', I('himachal-stream'), 'frame'],
  ['/cancellation-refund-policy', I('himachal-stream'), 'frame'],
  ['/accessibility', I('kerala-houseboat'), 'frame'],
  ['/grievance', I('varanasi-ghats'), 'frame'],
  ['/grievance-redressal', I('varanasi-ghats'), 'frame'],
  ['/membership-terms', I('amritsar-golden-temple'), 'frame'],
  ['/franchise-disclaimer', I('kolkata-victoria'), 'frame'],
  ['/aviation-disclaimer', I('delhi-india-gate'), 'frame'],
];

/*
 * Brand brief §2.2: one consistent system across the site — a single display
 * typeface, one colour mood, one restrained card style, one subtle motion and
 * full-photo heroes. The rotation lists above are kept for reference only;
 * pages differ by their photography, not by their visual system.
 */
const BRAND_SKIN = {
  hero: 'cinema',     // full photograph + navy overlay
  tone: 'royal',      // redefined in brand.css as midnight navy / ivory
  cards: 'lift',
  font: 'playfair',
  motion: 'base',
  pattern: 'none',
  align: 'center',
};
void [HEROES, TONES, CARDS, FONTS, MOTIONS, PATTERNS];

const SKINS = new Map(
  ROUTES.map(([route, img], i) => [
    route,
    {
      id: route === '/' ? 'home' : route.slice(1).replace(/\//g, '-'),
      ...BRAND_SKIN,
      img,
      img2: POOL[(i * 5 + 3) % POOL.length],
      img3: POOL[(i * 7 + 8) % POOL.length],
    },
  ]),
);

export function getSkin(route) {
  return SKINS.get(route) || null;
}
