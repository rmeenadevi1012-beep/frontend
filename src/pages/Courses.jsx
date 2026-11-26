import { BookOpen } from 'lucide-react';

export default function Courses() {
  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center gap-2 mb-3">
        <BookOpen size={24} className="text-primary" />
        <h2 className="mb-0">Courses</h2>
      </div>
      <div className="card border-0 shadow-sm">
        <div className="card-body text-muted">
          No courses available yet.
        </div>
      </div>
    </div>
  );
}
