import React from 'react';
import { Users } from 'lucide-react';
import CRMTablePage from './CRMTablePage';

function Students({ onAddStudentClick }) {
  return (
    <CRMTablePage
      title="Students"
      subtitle="Comprehensive directory of registered, active, and graduated students."
      count={0}
      icon={Users}
      columns={['Roll / Student ID', 'Full Name', 'Enrolled Course', 'Batch', 'Admission Date', 'Status']}
      filterLabel="Batch Status"
      filterOptions={['All', 'Active Students', 'Graduated', 'Suspended']}
      actionButtonText="Enroll New Student"
      onActionClick={onAddStudentClick}
    />
  );
}

export default Students;
