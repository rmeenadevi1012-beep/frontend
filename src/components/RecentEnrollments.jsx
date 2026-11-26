import { GraduationCap, UserCheck } from 'lucide-react';

function RecentEnrollments({ enrollments, onViewAll, onSelectStudent, onAddStudentClick }) {
  return (
    <div className="el-dashboard-card">
      {/* Header */}
      <div className="el-card-header">
        <div className="el-card-header-left">
          <div className="el-card-header-icon">
            <GraduationCap size={20} strokeWidth={2.2} />
          </div>
          <h3 className="el-card-title">Recent Enrollments</h3>
          {enrollments && enrollments.length > 0 && (
            <span className="el-badge-count">{enrollments.length}</span>
          )}
        </div>

        <button
          type="button"
          className="el-card-view-all"
          onClick={onViewAll}
        >
          View All <span style={{ marginLeft: '2px' }}>→</span>
        </button>
      </div>

      {/* Enrollments Table / Empty State */}
      <div className="el-table-responsive">
        {!enrollments || enrollments.length === 0 ? (
          <div className="el-empty-state-box">
            <div className="el-empty-state-icon purple">
              <UserCheck size={28} />
            </div>
            <h4 className="el-empty-state-title">No enrollments yet</h4>
            <p className="el-empty-state-desc">
              Student registrations from Courses or Public Enrollment will appear here live.
            </p>
            {onAddStudentClick && (
              <button
                type="button"
                className="el-empty-state-btn"
                onClick={onAddStudentClick}
              >
                + Enroll First Student
              </button>
            )}
          </div>
        ) : (
          <table className="el-enrollments-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Course</th>
                <th>Enrollment Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onSelectStudent && onSelectStudent(item)}
                  style={{ cursor: onSelectStudent ? 'pointer' : 'default' }}
                >
                  <td style={{ fontWeight: 600, color: '#1e202e' }}>
                    {item.studentName}
                  </td>
                  <td style={{ color: '#4b5563' }}>{item.course}</td>
                  <td style={{ color: '#6b7280' }}>{item.enrollmentDate}</td>
                  <td>
                    <span
                      className={`el-status-badge ${
                        item.status === 'Confirmed' ? 'confirmed' : 'pending'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default RecentEnrollments;
