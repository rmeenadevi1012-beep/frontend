import React from 'react';
import { Layers } from 'lucide-react';
import CRMTablePage from './CRMTablePage';

function Batches() {
  return (
    <CRMTablePage
      title="Batches"
      subtitle="Class cohorts, lecture schedules, lab timings, and batch assignments."
      count={0}
      icon={Layers}
      columns={['Batch Code', 'Course Track', 'Instructor', 'Timing / Schedule', 'Enrolled Students', 'Room / Lab', 'Status']}
      filterLabel="Timing"
      filterOptions={['All', 'Morning Batch', 'Afternoon Batch', 'Weekend Boot-Camp']}
      actionButtonText="Create Batch"
    />
  );
}

export default Batches;
