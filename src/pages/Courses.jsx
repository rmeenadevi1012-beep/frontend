<<<<<<< HEAD
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Plus,
  BookOpen,
  Filter,
  CheckCircle,
  AlertCircle,
  X,
  Layers,
  Sparkles
} from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { courseCategories } from '../data/courses';

export default function Courses({
  courses,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    category: 'Programming & Development',
    duration: '',
    eligibility: '',
    description: '',
    overview: '',
    technologies: '',
    image: ''
  });
  const [formError, setFormError] = useState('');

  // Synchronize URL search param if changed
  const handleSearchChange = (val) => {
    setSearchTerm(val);
    if (val.trim()) {
      setSearchParams({ search: val.trim() });
    } else {
      setSearchParams({});
    }
  };

  // Filter courses based on category and search query
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        selectedCategory === 'All' || course.category === selectedCategory;

      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        course.name.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        (course.technologies &&
          course.technologies.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [courses, selectedCategory, searchTerm]);

  // Open modal for Adding
  const handleOpenAddModal = () => {
    setEditingCourse(null);
    setFormData({
      name: '',
      category: 'Programming & Development',
      duration: '4 Months',
      eligibility: 'Any Graduate / Beginners / Tech Enthusiasts',
      description: '',
      overview: '',
      technologies: 'HTML, CSS, JavaScript, React',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80'
    });
    setFormError('');
    setIsModalOpen(true);
  };

  // Open modal for Editing
  const handleOpenEditModal = (course) => {
    setEditingCourse(course);
    setFormData({
      name: course.name,
      category: course.category,
      duration: course.duration,
      eligibility: course.eligibility,
      description: course.description,
      overview: course.overview || course.description,
      technologies: Array.isArray(course.technologies)
        ? course.technologies.join(', ')
        : (course.technologies || ''),
      image: course.image
    });
    setFormError('');
    setIsModalOpen(true);
  };

  // Form submission (Add or Edit)
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim() || !formData.duration.trim()) {
      setFormError('Please fill in Course Name, Duration, and Description.');
      return;
    }

    const techArray = formData.technologies
      ? formData.technologies.split(',').map((t) => t.trim()).filter(Boolean)
      : ['Web Development'];

    if (editingCourse) {
      // Update
      const updated = {
        ...editingCourse,
        name: formData.name.trim(),
        category: formData.category,
        duration: formData.duration.trim(),
        eligibility: formData.eligibility.trim() || 'Any Graduate',
        description: formData.description.trim(),
        overview: formData.overview.trim() || formData.description.trim(),
        technologies: techArray,
        image: formData.image.trim() || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'
      };
      onUpdateCourse(updated);
    } else {
      // Add
      const slugId = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
      const newCourse = {
        id: slugId,
        name: formData.name.trim(),
        category: formData.category,
        duration: formData.duration.trim(),
        eligibility: formData.eligibility.trim() || 'Any Graduate',
        description: formData.description.trim(),
        overview: formData.overview.trim() || formData.description.trim(),
        technologies: techArray,
        image: formData.image.trim() || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
        enrolledCount: 0,
        rating: 4.9,
        lessons: 40,
        level: 'All Levels'
      };
      onAddCourse(newCourse);
    }

    setIsModalOpen(false);
  };

  // Delete Course Handlers
  const handleRequestDelete = (course) => {
    setDeleteConfirmation(course);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmation) {
      onDeleteCourse(deleteConfirmation.id);
      setDeleteConfirmation(null);
    }
  };

  return (
    <div className="crm-courses-page">
      {/* 1. Header Banner */}
      <div className="crm-courses-header">
        <div className="crm-courses-header-left">
          <div className="crm-header-badge">
            <Sparkles size={14} />
            <span>Academic Curriculum</span>
          </div>
          <h2 className="crm-page-title">
            Courses & Programs <span className="crm-count-badge">({courses.length})</span>
          </h2>
          <p className="crm-page-subtitle">
            All 15 specialized courses designed for future engineers and tech leaders. Explore details, update curriculums, or add new programs.
          </p>
        </div>

        <div className="crm-courses-header-right">
          <button className="crm-btn-primary" onClick={handleOpenAddModal}>
            <Plus size={18} />
            <span>Add Course</span>
          </button>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="crm-courses-controls">
        {/* Search input */}
        <div className="crm-courses-search">
          <Search size={18} className="crm-control-search-icon" />
          <input
            type="text"
            placeholder="Search courses by name, keywords, or technologies..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="crm-control-search-input"
          />
          {searchTerm && (
            <button
              className="crm-control-clear-btn"
              onClick={() => handleSearchChange('')}
            >
              <X size={16} />
=======
import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  Clock,
  CheckCircle2,
  Tag,
  GraduationCap
} from 'lucide-react';
import ViewCourseModal from '../components/modals/ViewCourseModal';
import EditCourseModal from '../components/modals/EditCourseModal';
import DeleteCourseModal from '../components/modals/DeleteCourseModal';

function Courses({
  courses = [],
  onAddCourseClick,
  onUpdateCourse,
  onDeleteCourse,
  onEnrollClick
}) {
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals state
  const [viewingCourse, setViewingCourse] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null);

  // Extract distinct categories
  const categories = [
    'All',
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

  const filtered = courses.filter((c) => {
    const matchesCat =
      filterCategory === 'All' ||
      c.category === filterCategory ||
      c.department === filterCategory;

    const matchesStatus =
      statusFilter === 'All' ||
      (c.status || 'Active') === statusFilter;

    const query = searchTerm.toLowerCase();
    const matchesSearch =
      (c.name && c.name.toLowerCase().includes(query)) ||
      (c.code && c.code.toLowerCase().includes(query)) ||
      (c.description && c.description.toLowerCase().includes(query)) ||
      (c.shortDescription && c.shortDescription.toLowerCase().includes(query)) ||
      (c.category && c.category.toLowerCase().includes(query));

    return matchesCat && matchesStatus && matchesSearch;
  });

  return (
    <div className="el-dashboard-content">
      {/* Page Header */}
      <div className="el-page-header">
        <div className="el-page-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ margin: 0 }}>Courses Management</h1>
            <span style={{
              background: '#ede6fe',
              color: '#6e34e2',
              fontWeight: 800,
              fontSize: '13px',
              padding: '3px 10px',
              borderRadius: '20px'
            }}>
              {courses.length} Courses
            </span>
          </div>
          <p>
            Official curriculum catalog loaded from EduLearn Course Repository. Review, inspect syllabus, add, edit or delete courses.
          </p>
        </div>

        <button
          type="button"
          className="el-btn el-btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px' }}
          onClick={onAddCourseClick}
        >
          <Plus size={18} />
          <span>Add Course</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          background: '#ffffff',
          padding: '16px 20px',
          borderRadius: '14px',
          border: '1px solid var(--el-border-light)',
          boxShadow: 'var(--el-shadow-card)',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '260px' }}>
          <Search size={18} color="#64748b" />
          <input
            type="text"
            placeholder="Search by course name, code, category, or keywords..."
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              fontSize: '14px',
              fontFamily: 'var(--el-font)',
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              style={{ border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '13px' }}
            >
              Clear
>>>>>>> 43fe63ed57b74819d8462964507dc5759d388f46
            </button>
          )}
        </div>

<<<<<<< HEAD
        {/* Categories scrollable pill list matching Section 7 requirements */}
        <div className="crm-categories-container">
          <div className="crm-categories-label">
            <Filter size={15} />
            <span>Filter by Category:</span>
          </div>
          <div className="crm-categories-list">
            {courseCategories.map((cat) => {
              const count =
                cat === 'All'
                  ? courses.length
                  : courses.filter((c) => c.category === cat).length;
              return (
                <button
                  key={cat}
                  className={`crm-category-pill ${
                    selectedCategory === cat ? 'active' : ''
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  <span>{cat}</span>
                  <span className="crm-category-count">{count}</span>
                </button>
              );
            })}
=======
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Filter size={15} color="#64748b" />
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Category:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '13px',
                fontFamily: 'var(--el-font)',
                outline: 'none',
                maxWidth: '200px',
              }}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '13px',
                fontFamily: 'var(--el-font)',
                outline: 'none',
              }}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Upcoming">Upcoming</option>
            </select>
>>>>>>> 43fe63ed57b74819d8462964507dc5759d388f46
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* 3. Course Grid – 3-Column Responsive Layout */}
      {filteredCourses.length === 0 ? (
        <div className="crm-courses-empty">
          <BookOpen size={48} className="crm-empty-icon" />
          <h3>No matching courses found</h3>
          <p>
            No courses matched your search criteria for "<strong>{searchTerm}</strong>" under {selectedCategory}.
          </p>
          <button
            className="crm-btn-secondary"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
=======
      {/* Courses Grid / Empty State */}
      {courses.length === 0 ? (
        <div className="el-empty-state-box" style={{ background: '#ffffff', padding: '60px 20px', borderRadius: '16px', border: '1px solid var(--el-border-light)' }}>
          <div className="el-empty-state-icon blue">
            <BookOpen size={36} />
          </div>
          <h4 className="el-empty-state-title">No Courses in Catalog</h4>
          <p className="el-empty-state-desc">
            All courses have been removed. Click "Add Course" to create a new course curriculum.
          </p>
          <button
            type="button"
            className="el-btn el-btn-primary"
            style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            onClick={onAddCourseClick}
          >
            <Plus size={16} />
            <span>Add New Course</span>
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="el-empty-state-box" style={{ background: '#ffffff', padding: '48px 20px', borderRadius: '16px', border: '1px solid var(--el-border-light)' }}>
          <p className="el-empty-state-desc" style={{ fontSize: '15px' }}>
            No courses found matching "{searchTerm}".
          </p>
          <button
            type="button"
            className="el-btn el-btn-outline"
            style={{ marginTop: '12px' }}
            onClick={() => {
              setSearchTerm('');
              setFilterCategory('All');
              setStatusFilter('All');
>>>>>>> 43fe63ed57b74819d8462964507dc5759d388f46
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
<<<<<<< HEAD
        <div className="crm-courses-grid">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={handleOpenEditModal}
              onDelete={handleRequestDelete}
            />
=======
        <div className="el-courses-grid">
          {filtered.map((course) => (
            <div key={course.id} className="el-course-card" style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Card Top */}
              <div className="el-course-card-top">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="el-course-badge" style={{ background: '#ede6fe', color: '#6e34e2', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                    {course.category || course.department}
                  </span>
                  <span className="el-course-code" style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748b' }}>
                    {course.code}
                  </span>
                </div>
                <h3 className="el-course-name" style={{ fontSize: '16px', fontWeight: 800, color: '#1e202e', lineHeight: 1.35, minHeight: '44px' }}>
                  {course.name}
                </h3>
              </div>

              {/* Course Body with description & meta */}
              <div className="el-course-body" style={{ flex: 1, padding: '16px' }}>
                <p style={{
                  fontSize: '12.5px',
                  color: '#64748b',
                  lineHeight: 1.5,
                  minHeight: '56px',
                  margin: '0 0 14px 0',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {course.shortDescription || course.description}
                </p>

                <div className="el-course-meta-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: '1px solid #f1f5f9', fontSize: '12.5px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
                    <Clock size={14} color="#6e34e2" />
                    Duration
                  </span>
                  <strong style={{ color: '#1e202e', fontSize: '12px' }}>
                    {course.duration || 'Flexible'}
                  </strong>
                </div>

                <div className="el-course-meta-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: '1px solid #f1f5f9', fontSize: '12.5px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
                    <CheckCircle2 size={14} color="#10b981" />
                    Status
                  </span>
                  <span style={{
                    background: (course.status || 'Active') === 'Active' ? '#dcfce7' : '#fee2e2',
                    color: (course.status || 'Active') === 'Active' ? '#15803d' : '#b91c1c',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '12px'
                  }}>
                    {course.status || 'Active'}
                  </span>
                </div>
              </div>

              {/* Action Buttons: View, Edit, Delete */}
              <div style={{
                display: 'flex',
                gap: '8px',
                padding: '12px 16px',
                background: '#f8fafc',
                borderTop: '1px solid #f1f5f9',
                borderRadius: '0 0 14px 14px'
              }}>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    padding: '7px 10px',
                    borderRadius: '7px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#334155',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                  onClick={() => setViewingCourse(course)}
                  title="View full course specification"
                >
                  <Eye size={14} color="#6e34e2" />
                  <span>View</span>
                </button>

                <button
                  type="button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    padding: '7px 12px',
                    borderRadius: '7px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#334155',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                  onClick={() => setEditingCourse(course)}
                  title="Edit course details"
                >
                  <Edit2 size={14} color="#0284c7" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '7px 10px',
                    borderRadius: '7px',
                    border: '1px solid #fecaca',
                    background: '#fef2f2',
                    color: '#ef4444',
                    cursor: 'pointer'
                  }}
                  onClick={() => setDeletingCourse(course)}
                  title="Delete course from CRM"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
>>>>>>> 43fe63ed57b74819d8462964507dc5759d388f46
          ))}
        </div>
      )}

<<<<<<< HEAD
      {/* 4. Add / Edit Course Modal */}
      {isModalOpen && (
        <div className="crm-modal-overlay">
          <div className="crm-modal-card">
            <div className="crm-modal-header">
              <div className="crm-modal-title-group">
                <BookOpen size={20} className="crm-modal-icon" />
                <h3>{editingCourse ? 'Edit Course Details' : 'Add New Course'}</h3>
              </div>
              <button
                className="crm-modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="crm-modal-form">
              {formError && (
                <div className="crm-form-error-alert">
                  <AlertCircle size={16} />
                  <span>{formError}</span>
                </div>
              )}

              <div className="crm-form-group">
                <label className="crm-label">Course Name *</label>
                <input
                  type="text"
                  required
                  className="crm-input"
                  placeholder="e.g. Python Full Stack Programming"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="crm-form-row">
                <div className="crm-form-group">
                  <label className="crm-label">Category *</label>
                  <select
                    className="crm-select"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    {courseCategories
                      .filter((c) => c !== 'All')
                      .map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="crm-form-group">
                  <label className="crm-label">Duration *</label>
                  <input
                    type="text"
                    required
                    className="crm-input"
                    placeholder="e.g. 4 Months"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="crm-form-group">
                <label className="crm-label">Eligibility</label>
                <input
                  type="text"
                  className="crm-input"
                  placeholder="e.g. Any Graduate / Beginners / Tech Enthusiasts"
                  value={formData.eligibility}
                  onChange={(e) =>
                    setFormData({ ...formData, eligibility: e.target.value })
                  }
                />
              </div>

              <div className="crm-form-group">
                <label className="crm-label">Course Description *</label>
                <textarea
                  required
                  rows={3}
                  className="crm-textarea"
                  placeholder="Short summary of technologies and topics..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="crm-form-group">
                <label className="crm-label">Course Overview / Syllabus Details</label>
                <textarea
                  rows={3}
                  className="crm-textarea"
                  placeholder="Comprehensive description of the curriculum and outcomes..."
                  value={formData.overview}
                  onChange={(e) =>
                    setFormData({ ...formData, overview: e.target.value })
                  }
                />
              </div>

              <div className="crm-form-group">
                <label className="crm-label">Technologies Covered (comma separated)</label>
                <input
                  type="text"
                  className="crm-input"
                  placeholder="e.g. React 18, Redux Toolkit, React Router, Vite"
                  value={formData.technologies}
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                />
              </div>

              <div className="crm-form-group">
                <label className="crm-label">Image URL</label>
                <input
                  type="url"
                  className="crm-input"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
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
                  {editingCourse ? 'Save Changes' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="crm-modal-overlay">
          <div className="crm-modal-card mini">
            <div className="crm-modal-header danger">
              <div className="crm-modal-title-group">
                <AlertCircle size={22} color="#ef4444" />
                <h3>Delete Course</h3>
              </div>
              <button
                className="crm-modal-close-btn"
                onClick={() => setDeleteConfirmation(null)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="crm-modal-body">
              <p>
                Are you sure you want to delete "<strong>{deleteConfirmation.name}</strong>"?
                This will remove the course from the catalog and decrement the active course count.
              </p>
            </div>
            <div className="crm-modal-actions">
              <button
                className="crm-btn-secondary"
                onClick={() => setDeleteConfirmation(null)}
              >
                Cancel
              </button>
              <button
                className="crm-btn-danger"
                onClick={handleConfirmDelete}
              >
                Yes, Delete Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
=======
      {/* Modals */}
      <ViewCourseModal
        course={viewingCourse}
        isOpen={Boolean(viewingCourse)}
        onClose={() => setViewingCourse(null)}
      />

      <EditCourseModal
        course={editingCourse}
        isOpen={Boolean(editingCourse)}
        onClose={() => setEditingCourse(null)}
        onUpdateCourse={onUpdateCourse}
      />

      <DeleteCourseModal
        course={deletingCourse}
        isOpen={Boolean(deletingCourse)}
        onClose={() => setDeletingCourse(null)}
        onConfirmDelete={onDeleteCourse}
      />
    </div>
  );
}

export default Courses;
>>>>>>> 43fe63ed57b74819d8462964507dc5759d388f46
