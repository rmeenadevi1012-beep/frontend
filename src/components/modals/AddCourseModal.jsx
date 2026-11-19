import React, { useState } from 'react';
import { X, BookPlus } from 'lucide-react';

function AddCourseModal({ isOpen, onClose, onAddCourse }) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    department: 'Computer Applications',
    instructor: '',
    duration: '3 Years',
    fee: '$1,200/yr',
    seats: 60,
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.code) {
      alert('Please fill in Course Name and Code');
      return;
    }
    onAddCourse({
      id: Date.now(),
      ...formData,
      enrolled: 0,
      status: 'Active',
    });
    onClose();
  };

  return (
    <div className="el-modal-overlay" onClick={onClose}>
      <div className="el-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="el-modal-header">
          <h3 className="el-modal-title">
            <BookPlus size={20} color="var(--el-purple-main)" />
            Add New Course
          </h3>
          <button type="button" className="el-modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="el-modal-body">
            <div className="el-form-row">
              <div className="el-form-group">
                <label className="el-form-label">Course Name *</label>
                <input
                  type="text"
                  className="el-form-input"
                  placeholder="e.g. B.Tech Artificial Intelligence"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="el-form-group">
                <label className="el-form-label">Course Code *</label>
                <input
                  type="text"
                  className="el-form-input"
                  placeholder="e.g. AI-501"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="el-form-row">
              <div className="el-form-group">
                <label className="el-form-label">Department</label>
                <select
                  className="el-form-select"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  <option value="Computer Applications">Computer Applications</option>
                  <option value="Commerce & Accounting">Commerce & Accounting</option>
                  <option value="Management Studies">Management Studies</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Humanities">Humanities</option>
                  <option value="Engineering">Engineering</option>
                </select>
              </div>

              <div className="el-form-group">
                <label className="el-form-label">Lead Instructor</label>
                <input
                  type="text"
                  className="el-form-input"
                  placeholder="e.g. Dr. S. Anbarasu"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                />
              </div>
            </div>

            <div className="el-form-row">
              <div className="el-form-group">
                <label className="el-form-label">Duration</label>
                <select
                  className="el-form-select"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                >
                  <option value="1 Year">1 Year (Diploma)</option>
                  <option value="2 Years">2 Years (Master's)</option>
                  <option value="3 Years">3 Years (Bachelor's)</option>
                  <option value="4 Years">4 Years (Engineering)</option>
                </select>
              </div>

              <div className="el-form-group">
                <label className="el-form-label">Annual Tuition Fee</label>
                <input
                  type="text"
                  className="el-form-input"
                  placeholder="e.g. $1,400/yr"
                  value={formData.fee}
                  onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="el-modal-footer">
            <button type="button" className="el-btn el-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="el-btn el-btn-primary">
              Save Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCourseModal;
