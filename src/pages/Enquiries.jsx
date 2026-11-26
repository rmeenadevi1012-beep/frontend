import React from 'react';
import { HelpCircle } from 'lucide-react';
import CRMTablePage from './CRMTablePage';

function Enquiries() {
  return (
    <CRMTablePage
      title="Enquiries"
      subtitle="Inbound student prospect inquiries, course consultations, and follow-ups."
      count={0}
      icon={HelpCircle}
      columns={['Enquiry ID', 'Prospect Name', 'Email', 'Phone', 'Interested Course', 'Source', 'Status']}
      filterLabel="Status"
      filterOptions={['All', 'New', 'In Discussion', 'Converted', 'Closed']}
      actionButtonText="Log Enquiry"
    />
  );
}

export default Enquiries;
