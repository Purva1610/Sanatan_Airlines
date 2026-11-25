import GrievanceRedressalPage from '../../src/airline/legalPages/GrievanceRedressal';
import PageSkin from '../../src/PageSkin.jsx';

export const metadata = {
  alternates: { canonical: '/grievance-redressal' },
  title: 'Grievance Redressal',
  description: 'How to file a complaint with Sanatan Airlines — contact details, escalation steps and resolution timelines.',
};

export default function Page() {
  return <PageSkin route="/grievance-redressal"><GrievanceRedressalPage /></PageSkin>;
}
