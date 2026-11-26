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
            </button>
          )}
        </div>

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
          </div>
        </div>
      </div>

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
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="crm-courses-grid">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={handleOpenEditModal}
              onDelete={handleRequestDelete}
            />
          ))}
        </div>
      )}

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
