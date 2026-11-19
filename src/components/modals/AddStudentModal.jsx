import React, { useState, useEffect } from 'react';
import { X, UserPlus } from 'lucide-react';

function AddStudentModal({ isOpen, onClose, onAddStudent, courses, selectedCourse }) {
  const [formData, setFormData] = useState({
    studentName: '',
    course: 'B.Sc Computer Science',
    enrollmentDate: '',
    status: 'Confirmed',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    setFormData((prev) => ({
      ...prev,
      course: selectedCourse ? selectedCourse.name : (courses && courses.length > 0 ? courses[0].name : 'B.Sc Computer Science'),
      enrollmentDate: today,
    }));
  }, [isOpen, selectedCourse, courses]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentName.trim()) {
      alert('Please enter student name');
      return;
    }
    onAddStudent({
      id: Date.now(),
      studentName: formData.studentName.trim(),
      course: formData.course,
      enrollmentDate: formData.enrollmentDate,
      status: formData.status,
      email: formData.email.trim() || 'student@edulearn.edu',
      phone: formData.phone.trim() || '+91 98765 43210',
    });
    onClose();
  };

  return (
    <div className="el-modal-overlay" onClick={onClose}>
      <div className="el-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="el-modal-header">
          <h3 className="el-modal-title">
            <UserPlus size={20} color="var(--el-purple-main)" />
            Add New Student Enrollment
          </h3>
          <button type="button" className="el-modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="el-modal-body">
            <div className="el-form-group">
              <label className="el-form-label">Student Full Name *</label>
              <input
                type="text"
                className="el-form-input"
                placeholder="e.g. K. Vigneswaran"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                required
              />
            </div>

            <div className="el-form-row">
              <div className="el-form-group">
                <label className="el-form-label">Course Program *</label>
                <select
                  className="el-form-select"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                >
                  {courses && courses.length > 0 ? (
                    courses.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name} ({c.code})
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="B.Sc Computer Science">B.Sc Computer Science</option>
                      <option value="B.Com">B.Com</option>
                      <option value="BCA">BCA</option>
                      <option value="BBA">BBA</option>
                      <option value="M.Sc Maths">M.Sc Maths</option>
                    </>
                  )}
                </select>
              </div>

              <div className="el-form-group">
                <label className="el-form-label">Admission Status</label>
                <select
                  className="el-form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div className="el-form-row">
              <div className="el-form-group">
                <label className="el-form-label">Email Address</label>
                <input
                  type="email"
                  className="el-form-input"
                  placeholder="student@edulearn.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="el-form-group">
                <label className="el-form-label">Phone Contact</label>
                <input
                  type="tel"
                  className="el-form-input"
                  placeholder="+91 98765 00000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="el-form-group">
              <label className="el-form-label">Enrollment Date</label>
              <input
                type="text"
                className="el-form-input"
                value={formData.enrollmentDate}
                onChange={(e) => setFormData({ ...formData, enrollmentDate: e.target.value })}
              />
            </div>
          </div>

          <div className="el-modal-footer">
            <button type="button" className="el-btn el-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="el-btn el-btn-primary">
              Enroll Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudentModal;
