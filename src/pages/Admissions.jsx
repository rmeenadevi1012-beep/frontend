import { UserCheck } from 'lucide-react';
import CRMTablePage from './CRMTablePage';

export default function Admissions() {
  return (
    <CRMTablePage
      title="Admissions"
      icon={UserCheck}
      data={[]}
      columns={['Student Name', 'Course', 'Date', 'Status']}
      emptyMessage="No admissions recorded yet."
    />
  );
}
