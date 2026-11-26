import { DollarSign } from 'lucide-react';
import CRMTablePage from './CRMTablePage';

function Payments() {
  return (
    <CRMTablePage
      title="Payments"
      subtitle="Tuition fee records, installment schedules, invoices, and transaction ledger."
      count={0}
      icon={DollarSign}
      columns={['Transaction ID', 'Student Name', 'Course Program', 'Amount ($)', 'Payment Mode', 'Invoice Date', 'Status']}
      filterLabel="Payment Status"
      filterOptions={['All', 'Completed', 'Pending', 'Overdue', 'Refunded']}
      actionButtonText="Record Payment"
    />
  );
}

export default Payments;
