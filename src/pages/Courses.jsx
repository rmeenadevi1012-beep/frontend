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
            </button>
          )}
        </div>

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
          </div>
        </div>
      </div>

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
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
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
          ))}
        </div>
      )}

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
