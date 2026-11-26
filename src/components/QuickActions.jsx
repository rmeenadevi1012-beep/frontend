~import React from 'react';
import { Zap, BookPlus, UserPlus, BarChart2, Settings } from 'lucide-react';

function QuickActions({
  onAddCourse,
  onAddStudent,
  onViewReports,
  onManageUsers,
}) {
  return (
    <div className="el-dashboard-card">
      {/* Header */}
      <div className="el-card-header">
        <div className="el-card-header-left">
          <div className="el-card-header-icon">
            <Zap size={19} strokeWidth={2.4} fill="#6e34e2" />
          </div>
          <h3 className="el-card-title">Quick Actions</h3>
        </div>
      </div>

      {/* 2x2 Grid of Actions */}
      <div className="el-quick-actions-grid">
        {/* Button 1: Add Course */}
        <button
          type="button"
          className="el-quick-action-btn"
          onClick={onAddCourse}
          title="Open Add Course form"
        >
          <BookPlus size={20} strokeWidth={2.2} />
          <span>Add Course</span>
        </button>

        {/* Button 2: Add Student */}
        <button
          type="button"
          className="el-quick-action-btn"
          onClick={onAddStudent}
          title="Open Add Student form"
        >
          <UserPlus size={20} strokeWidth={2.2} />
          <span>Add Student</span>
        </button>

        {/* Button 3: View Reports */}
        <button
          type="button"
          className="el-quick-action-btn"
          onClick={onViewReports}
          title="Open Reports and Analytics"
        >
          <BarChart2 size={20} strokeWidth={2.2} />
          <span>View Reports</span>
        </button>

        {/* Button 4: Manage Users */}
        <button
          type="button"
          className="el-quick-action-btn"
          onClick={onManageUsers}
          title="Manage Users and Roles"
        >
          <Settings size={20} strokeWidth={2.2} />
          <span>Manage Users</span>
        </button>
      </div>
    </div>
  );
}

export default QuickActions;
