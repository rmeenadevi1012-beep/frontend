import { Users } from 'lucide-react';
import CRMTablePage from './CRMTablePage';

function Staff() {
  return (
    <CRMTablePage
      title="Staff & Faculty"
      subtitle="Academic instructors, technical mentors, lab supervisors, and staff administration."
      count={0}
      icon={Users}
      columns={['Staff ID', 'Faculty Member', 'Role / Title', 'Department', 'Assigned Courses', 'Contact', 'Status']}
      filterLabel="Department"
      filterOptions={['All', 'Computer Science', 'Data & AI', 'Design', 'Administration']}
      actionButtonText="Add Staff Member"
    />
  );
}

export default Staff;
