import React, { useState } from 'react';
import { BookOpen, Plus, Search, Filter, Users, Clock, Award, UserPlus } from 'lucide-react';

function CoursesPage({ courses = [], onAddCourseClick, onEnrollClick }) {
  const [filterDept, setFilterDept] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const departments = [
    'All',
    'python full stack programming',
    'javascript&modernwebdevelopment',
    'react js&frontend engineering',
    'full stack web development',
    'java full stack development',
    'data science&machine learning',
  ];

  const filtered = courses.filter((c) => {
    const matchesDept = filterDept === 'All' || c.department === filterDept;
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.instructor && c.instructor.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  return (
    <div className="el-dashboard-content">
      {/* Page Header */}
      <div className="el-page-header">
        <div className="el-page-title-group">
          <h1>Courses & Academic Programs</h1>
          <p>Review, create, and manage degree courses or enroll prospective students.</p>
        </div>

        <button
          type="button"
          className="el-btn el-btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px' }}
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
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '260px' }}>
          <Search size={18} color="#64748b" />
          <input
            type="text"
            placeholder="Search by course name, code, or faculty..."
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
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} color="#64748b" />
          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Department:</span>
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '13px',
              fontFamily: 'var(--el-font)',
              outline: 'none',
            }}
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Courses Cards Grid / Empty State */}
      {courses.length === 0 ? (
        <div className="el-empty-state-box" style={{ background: '#ffffff', padding: '50px 20px', borderRadius: '16px', border: '1px solid var(--el-border-light)' }}>
          <div className="el-empty-state-icon blue">
            <BookOpen size={32} />
          </div>
          <h4 className="el-empty-state-title">No Courses Added Yet</h4>
          <p className="el-empty-state-desc">
            The course catalog starts at 0. Click "Add Course" to launch a new degree program or curriculum.
          </p>
          <button
            type="button"
            className="el-btn el-btn-primary"
            style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            onClick={onAddCourseClick}
          >
            <Plus size={16} />
            <span>Add First Course</span>
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="el-empty-state-box" style={{ background: '#ffffff', padding: '40px 20px', borderRadius: '16px' }}>
          <p className="el-empty-state-desc">No courses match your search criteria.</p>
        </div>
      ) : (
        <div className="el-courses-grid">
          {filtered.map((course) => (
            <div key={course.id} className="el-course-card">
              <div className="el-course-card-top">
                <span className="el-course-badge">{course.department}</span>
                <span className="el-course-code">{course.code}</span>
                <h3 className="el-course-name">{course.name}</h3>
              </div>

              <div className="el-course-body">
                <div className="el-course-meta-row">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={15} color="#6e34e2" />
                    Lead Faculty
                  </span>
                  <strong>{course.instructor || 'EduLearn Faculty'}</strong>
                </div>

                <div className="el-course-meta-row">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={15} color="#6e34e2" />
                    Program Duration
                  </span>
                  <strong>{course.duration}</strong>
                </div>

                <div className="el-course-meta-row">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={15} color="#6e34e2" />
                    Seat Occupancy
                  </span>
                  <strong>
                    {course.enrolled || 0} / {course.seats || 60} enrolled
                  </strong>
                </div>

                {/* Progress bar for occupancy */}
                <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden', margin: '4px 0 10px 0' }}>
                  <div
                    style={{
                      width: `${Math.min(100, ((course.enrolled || 0) / (course.seats || 60)) * 100)}%`,
                      height: '100%',
                      background: 'var(--el-purple-main)',
                      borderRadius: '3px',
                    }}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto',
                    paddingTop: '12px',
                    borderTop: '1px solid #f1f5f9',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>Tuition Fee</span>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--el-purple-main)' }}>
                      {course.fee || '$1,200/yr'}
                    </div>
                  </div>

                  {/* Enroll Now Button directly on course card */}
                  <button
                    type="button"
                    onClick={() => onEnrollClick && onEnrollClick(course)}
                    className="el-btn el-btn-primary"
                    style={{
                      padding: '7px 14px',
                      fontSize: '12px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                    title={`Enroll student into ${course.name}`}
                  >
                    <UserPlus size={14} />
                    <span>Enroll Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CoursesPage;
