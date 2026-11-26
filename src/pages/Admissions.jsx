import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  GraduationCap,
  UserPlus,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Trash2,
  FolderOpen,
  X,
  AlertCircle
} from 'lucide-react';

export default function Admissions({
  admissions,
  courses,
  onAddAdmission,
  onDeleteAdmission,
  onToggleStatus
}) {
  const [searchParams] = useSearchParams();
  const preselectedCourse = searchParams.get('course') || '';

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: preselectedCourse || (courses[0]?.name || ''),
    status: 'Confirmed'
  });
  const [formError, setFormError] = useState('');

  const handleOpenModal = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      course: preselectedCourse || (courses[0]?.name || ''),
      status: 'Confirmed'
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.course.trim()) {
      setFormError('Please enter Student Name and select a Course.');
      return;
    }

    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')} ${today.toLocaleString('en-US', { month: 'short' })} ${today.getFullYear()}`;

    const newRecord = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      course: formData.course,
      date: formattedDate,
      status: formData.status
    };

    onAddAdmission(newRecord);
    setIsModalOpen(false);
  };

  const filteredAdmissions = admissions.filter((adm) => {
    const matchesSearch =
      !searchTerm ||
      adm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adm.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (adm.email && adm.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === 'All' || adm.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const confirmedCount = admissions.filter((a) => a.status === 'Confirmed').length;
  const pendingCount = admissions.filter((a) => a.status === 'Pending').length;

  return (
    <div className="crm-admissions-page">
      {/* 1. Header & Summary Stats */}
      <div className="crm-page-header-row">
        <div>
          <h2 className="crm-page-title">Student Admissions</h2>
          <p className="crm-page-subtitle">
            Manage student registrations, verify admission documents, and assign technical courses.
          </p>
        </div>
        <button className="crm-btn-primary" onClick={handleOpenModal}>
          <UserPlus size={18} />
          <span>New Admission</span>
        </button>
      </div>

      {/* Mini Stats Ribbon */}
      <div className="crm-admissions-ribbon">
        <div className="crm-ribbon-stat">
          <span className="ribbon-label">Total Admissions</span>
          <strong className="ribbon-val">{admissions.length}</strong>
        </div>
        <div className="crm-ribbon-stat">
          <span className="ribbon-label">Confirmed</span>
          <strong className="ribbon-val text-success">{confirmedCount}</strong>
        </div>
        <div className="crm-ribbon-stat">
          <span className="ribbon-label">Pending Review</span>
          <strong className="ribbon-val text-warning">{pendingCount}</strong>
        </div>
        <div className="crm-ribbon-stat">
          <span className="ribbon-label">Available Courses</span>
          <strong className="ribbon-val">{courses.length}</strong>
        </div>
      </div>

      {/* 2. Controls: Search & Status Filter */}
      <div className="crm-table-controls-bar">
        <div className="crm-search-box">
          <Search size={18} className="icon" />
          <input
            type="text"
            placeholder="Search admissions by student name, course, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm('')}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className="crm-filter-group">
          <Filter size={16} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="crm-select-filter"
          >
            <option value="All">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* 3. Admissions Records Table */}
      <div className="crm-card crm-admissions-card">
        {filteredAdmissions.length === 0 ? (
          <div className="crm-empty-state large">
            <FolderOpen size={48} className="crm-empty-icon" />
            <h3 className="crm-empty-title">No Admission Records Found</h3>
            <p className="crm-empty-desc">
              {admissions.length === 0
                ? 'All initial statistics are set to ZERO with no sample or fake records. Click "New Admission" to register the first student.'
                : 'No admissions match your current search or filter criteria.'}
            </p>
            <button className="crm-btn-primary" onClick={handleOpenModal}>
              <UserPlus size={16} />
              <span>Record First Admission</span>
            </button>
          </div>
        ) : (
          <div className="crm-table-responsive">
            <table className="crm-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Contact Info</th>
                  <th>Selected Course</th>
                  <th>Admission Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmissions.map((adm) => (
                  <tr key={adm.id}>
                    <td>
                      <div className="crm-student-cell">
                        <span className="crm-student-avatar">
                          {adm.name.charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <strong className="crm-student-name">{adm.name}</strong>
                          <span className="crm-student-id">ID: #{adm.id.slice(-6)}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="crm-student-contact">
                        <span>{adm.email || 'N/A'}</span>
                        <small>{adm.phone || 'N/A'}</small>
                      </div>
                    </td>
                    <td>
                      <span className="crm-course-tag">{adm.course}</span>
                    </td>
                    <td>{adm.date}</td>
                    <td>
                      <button
                        className={`crm-status-pill clickable ${
                          adm.status === 'Confirmed' ? 'confirmed' : 'pending'
                        }`}
                        onClick={() => onToggleStatus && onToggleStatus(adm.id)}
                        title="Click to toggle status"
                      >
                        {adm.status === 'Confirmed' ? (
                          <CheckCircle size={13} />
                        ) : (
                          <Clock size={13} />
                        )}
                        <span>{adm.status}</span>
                      </button>
                    </td>
                    <td>
                      <button
                        className="crm-action-icon-btn delete"
                        onClick={() => onDeleteAdmission && onDeleteAdmission(adm.id)}
                        title="Delete Record"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. Add Admission Modal */}
      {isModalOpen && (
        <div className="crm-modal-overlay">
          <div className="crm-modal-card">
            <div className="crm-modal-header">
              <div className="crm-modal-title-group">
                <UserPlus size={20} className="crm-modal-icon" />
                <h3>New Student Admission</h3>
              </div>
              <button
                className="crm-modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="crm-modal-form">
              {formError && (
                <div className="crm-form-error-alert">
                  <AlertCircle size={16} />
                  <span>{formError}</span>
                </div>
              )}

              <div className="crm-form-group">
                <label className="crm-label">Student Full Name *</label>
                <input
                  type="text"
                  required
                  className="crm-input"
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="crm-form-row">
                <div className="crm-form-group">
                  <label className="crm-label">Email Address</label>
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
                  <label className="crm-label">Phone Number</label>
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
                <label className="crm-label">Select Course Program *</label>
                <select
                  required
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
                <button
                  type="button"
                  className="crm-btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="crm-btn-primary">
                  Save & Enroll Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
