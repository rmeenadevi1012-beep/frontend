import { useState } from 'react';
import { X, Edit, Save } from 'lucide-react';

function EditCourseModal({ course, isOpen, onClose, onUpdateCourse }) {
  const [formData, setFormData] = useState(() => ({
    name: course?.name || '',
    code: course?.code || '',
    category: course?.category || course?.department || 'Programming & Development',
    duration: course?.duration || '',
    status: course?.status || 'Active',
    description: course?.description || '',
    shortDescription: course?.shortDescription || '',
    fee: course?.fee || '$1,200',
    seats: course?.seats || 40,
  }));

  if (!isOpen || !course) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) {
      alert('Course Name and Code are required');
      return;
    }

    onUpdateCourse({
      ...course,
      ...formData,
      department: formData.category,
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Edit size={19} color="var(--el-purple-main)" />
            <h3 className="el-modal-title">Edit Course Information</h3>
          </div>
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
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g. 4 Months (Hands-on Labs)"
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
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div className="el-form-group">
                <label className="el-form-label">Fee</label>
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
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value, shortDescription: e.target.value })}
                placeholder="Detailed curriculum overview..."
              />
            </div>
          </div>

          <div className="el-modal-footer">
            <button type="button" className="el-btn el-btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="el-btn el-btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Save size={16} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCourseModal;
