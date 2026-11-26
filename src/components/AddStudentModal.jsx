import React, { useState } from 'react';
import { UserPlus, X, AlertCircle } from 'lucide-react';

export default function AddStudentModal({
  isOpen,
  courses,
  preselectedCourse,
  onClose,
  onAddStudent
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: preselectedCourse?.name || courses[0]?.name || '',
    status: 'Confirmed'
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please provide student full name.');
      return;
    }

    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')} ${today.toLocaleString('en-US', { month: 'short' })} ${today.getFullYear()}`;

    const newStudent = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      course: formData.course || (courses[0]?.name || 'Python Full Stack Programming'),
      date: formattedDate,
      status: formData.status
    };

    onAddStudent(newStudent);
    onClose();
  };

  return (
    <div className="crm-modal-overlay">
      <div className="crm-modal-card">
        <div className="crm-modal-header">
          <div className="crm-modal-title-group">
            <UserPlus size={20} className="crm-modal-icon" />
            <h3>Quick Student Admission</h3>
          </div>
          <button className="crm-modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="crm-modal-form">
          {error && (
            <div className="crm-form-error-alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="crm-form-group">
            <label className="crm-label">Student Full Name *</label>
            <input
              type="text"
              required
              className="crm-input"
              placeholder="e.g. Priyadarshini M"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="crm-form-row">
            <div className="crm-form-group">
              <label className="crm-label">Email</label>
              <input
                type="email"
                className="crm-input"
                placeholder="student@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="crm-form-group">
              <label className="crm-label">Phone</label>
              <input
                type="tel"
                className="crm-input"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="crm-form-group">
            <label className="crm-label">Assigned Course *</label>
            <select
              className="crm-select"
              value={formData.course}
              onChange={(e) =>
                setFormData({ ...formData, course: e.target.value })
              }
            >
              {courses.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} ({c.duration})
                </option>
              ))}
            </select>
          </div>

          <div className="crm-form-group">
            <label className="crm-label">Admission Status</label>
            <select
              className="crm-select"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending Review</option>
            </select>
          </div>

          <div className="crm-modal-actions">
            <button type="button" className="crm-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="crm-btn-primary">
              Enroll Student & Increment Counts
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
