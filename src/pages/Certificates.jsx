import { Award } from 'lucide-react';
import CRMTablePage from './CRMTablePage';

function Certificates() {
  return (
    <CRMTablePage
      title="Certificates"
      subtitle="Digital credentials, course completion certificates, and verification records."
      count={0}
      icon={Award}
      columns={['Certificate ID', 'Recipient Student', 'Completed Course', 'Grade / Honors', 'Issue Date', 'Verification Hash', 'Status']}
      filterLabel="Award Type"
      filterOptions={['All', 'Full Stack Masterclass', 'Diploma', 'Bootcamp Certification']}
      actionButtonText="Issue Certificate"
    />
  );
}

export default Certificates;
