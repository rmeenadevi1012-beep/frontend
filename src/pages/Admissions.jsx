import React from 'react';
import { UserCheck } from 'lucide-react';
import CRMTablePage from './CRMTablePage';

function Admissions({ onAddStudentClick }) {
  return (
    <CRMTablePage
      title="Admissions"
      subtitle="Student application review, document verification, and seat allocation."
      count={0}
      icon={UserCheck}
      columns={['Application No.', 'Applicant Name', 'Selected Program', 'Eligibility Status', 'Submission Date', 'Decision']}
      filterLabel="Status"
      filterOptions={['All', 'Under Review', 'Verified', 'Approved', 'Rejected']}
      actionButtonText="New Admission"
      onActionClick={onAddStudentClick}
    />
  );
}

export default Admissions;
