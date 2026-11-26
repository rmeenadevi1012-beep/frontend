import React, { useState } from 'react';
import { X, BookPlus } from 'lucide-react';

function AddCourseModal({ isOpen, onClose, onAddCourse }) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: 'Programming & Development',
    duration: '3 Months (Intensive)',
    fee: '$1,200',
    seats: 40,
    status: 'Active',
    description: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) {
      alert('Please fill in Course Name and Code');
      return;
    }
    onAddCourse({
      id: Date.now(),
      ...formData,
      department: formData.category,
      shortDescription: formData.description ? formData.description.slice(0, 120) + '...' : 'Hands-on technical curriculum with real-world projects.',
      enrolled: 0,
      rating: 4.9,
    });
    setFormData({
      name: '',
      code: '',
      category: 'Programming & Development',
      duration: '3 Months (Intensive)',
      fee: '$1,200',
      seats: 40,
      status: 'Active',
      description: '',
    });
    onClose();
  };

  const categories = [
    'Programming & Development',
    'Web Development',
    'Frontend Development',
    'Full Stack Development',
    'Enterprise Software',
    'Data & AI',
    'Design & Creative',
    'Backend Development',
    'Cloud & Infrastructure',
    'Security & Networking',
    'Mobile Apps',
    'Database Engineering',
    'Core Computer Science',
  ];

  return (
    <div className="el-modal-overlay" onClick={onClose}>
      <div className="el-modal-container" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
        <div className="el-modal-header">
          <h3 className="el-modal-title">
            <BookPlus size={20} color="var(--el-purple-main)" />
            Add New Course
          </h3>
          <button type="button" className="el-modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="el-modal-body" style={{ maxHeight: '72vh', overflowY: 'auto' }}>
            <div className="el-form-row">
              <div className="el-form-group" style={{ flex: 2 }}>
                <label className="el-form-label">Course Name *</label>
                <input
                  type="text"
                  className="el-form-input"
                  placeholder="e.g. Next.js & TypeScript Mastery"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="el-form-group" style={{ flex: 1 }}>
                <label className="el-form-label">Course Code *</label>
                <input
                  type="text"
                  className="el-form-input"
                  placeholder="e.g. TS-116"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="el-form-row">
              <div className="el-form-group">
                <label className="el-form-label">Category / Track</label>
                <select
                  className="el-form-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="el-form-group">
                <label className="el-form-label">Duration</label>
                <input
                  type="text"
                  className="el-form-input"
                  placeholder="e.g. 3 Months (Hands-on Labs)"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>
            </div>

            <div className="el-form-row">
              <div className="el-form-group">
                <label className="el-form-label">Status</label>
                <select
                  className="el-form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>

              <div className="el-form-group">
                <label className="el-form-label">Course Fee</label>
                <input
                  type="text"
                  className="el-form-input"
                  value={formData.fee}
                  onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                />
              </div>
            </div>

            <div className="el-form-group">
              <label className="el-form-label">Course Description</label>
              <textarea
                className="el-form-input"
                rows="3"
                placeholder="Comprehensive technical curriculum description..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="el-modal-footer">
            <button type="button" className="el-btn el-btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="el-btn el-btn-primary">
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCourseModal;
