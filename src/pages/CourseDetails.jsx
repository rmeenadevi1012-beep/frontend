import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  GraduationCap,
  CheckCircle2,
  Layers,
  Sparkles,
  BookOpen,
  UserPlus,
  Share2
} from 'lucide-react';

export default function CourseDetails({ courses, onEnrollStudent }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="crm-course-notfound">
        <BookOpen size={56} className="crm-empty-icon" />
        <h2>Course Not Found</h2>
        <p>The requested course program could not be located in our catalog.</p>
        <button className="crm-btn-primary" onClick={() => navigate('/courses')}>
          <ArrowLeft size={16} />
          <span>Back to All Courses</span>
        </button>
      </div>
    );
  }

  return (
    <div className="crm-course-details-page">
      {/* Top Navigation Bar with Back Button */}
      <div className="crm-details-nav-bar">
        <button
          className="crm-back-btn"
          onClick={() => navigate('/courses')}
        >
          <ArrowLeft size={18} />
          <span>Back to Courses</span>
        </button>

        <div className="crm-details-breadcrumbs">
          <span onClick={() => navigate('/')}>Dashboard</span>
          <span className="sep">/</span>
          <span onClick={() => navigate('/courses')}>Courses</span>
          <span className="sep">/</span>
          <span className="current">{course.name}</span>
        </div>
      </div>

      {/* Hero Course Header Banner */}
      <div className="crm-details-hero">
        <div className="crm-details-hero-content">
          <div className="crm-details-badges">
            <span className="crm-hero-category-tag">{course.category}</span>
            <span className="crm-hero-rating-tag">★ {course.rating || '4.9'} / 5.0 Rating</span>
            <span className="crm-hero-level-tag">{course.level || 'All Levels'}</span>
          </div>

          <h1 className="crm-details-hero-title">{course.name}</h1>
          <p className="crm-details-hero-desc">{course.description}</p>

          <div className="crm-details-quick-specs">
            <div className="crm-spec-item">
              <Clock size={18} className="crm-spec-icon" />
              <div>
                <span className="crm-spec-label">Course Duration</span>
                <strong className="crm-spec-value">{course.duration}</strong>
              </div>
            </div>

            <div className="crm-spec-item">
              <GraduationCap size={18} className="crm-spec-icon" />
              <div>
                <span className="crm-spec-label">Target Eligibility</span>
                <strong className="crm-spec-value">{course.eligibility}</strong>
              </div>
            </div>

            <div className="crm-spec-item">
              <Layers size={18} className="crm-spec-icon" />
              <div>
                <span className="crm-spec-label">Curriculum Depth</span>
                <strong className="crm-spec-value">{course.lessons || 40} Comprehensive Modules</strong>
              </div>
            </div>
          </div>

          <div className="crm-details-hero-cta">
            <button
              className="crm-btn-primary large"
              onClick={() => {
                if (onEnrollStudent) {
                  onEnrollStudent(course);
                } else {
                  navigate(`/admissions?course=${encodeURIComponent(course.name)}`);
                }
              }}
            >
              <UserPlus size={18} />
              <span>Enroll Student in this Course</span>
            </button>
            <button
              className="crm-btn-secondary"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Course link copied to clipboard!');
              }}
            >
              <Share2 size={16} />
              <span>Share Syllabus</span>
            </button>
          </div>
        </div>

        <div className="crm-details-hero-image-wrap">
          <img
            src={course.image}
            alt={course.name}
            className="crm-details-hero-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80';
            }}
          />
        </div>
      </div>

      {/* Main Details Body Grid */}
      <div className="crm-details-body-grid">
        {/* Left Column: Overview and Syllabus */}
        <div className="crm-details-main-col">
          {/* 1. Course Overview Section */}
          <div className="crm-card crm-details-section">
            <div className="crm-section-header">
              <Sparkles size={20} className="crm-section-icon" />
              <h3 className="crm-section-title">Course Overview</h3>
            </div>
            <p className="crm-overview-text">
              {course.overview || course.description}
            </p>
          </div>

          {/* 2. Technologies Covered */}
          <div className="crm-card crm-details-section">
            <div className="crm-section-header">
              <Layers size={20} className="crm-section-icon" />
              <h3 className="crm-section-title">Technologies Covered</h3>
            </div>
            <p className="crm-section-sub">
              Industry-standard tools and frameworks mastered throughout the course:
            </p>
            <div className="crm-tech-tags-list">
              {(course.technologies || []).map((tech, idx) => (
                <span key={idx} className="crm-tech-pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 3. Learning Outcomes / Curriculum Highlights */}
          <div className="crm-card crm-details-section">
            <div className="crm-section-header">
              <CheckCircle2 size={20} className="crm-section-icon" />
              <h3 className="crm-section-title">Key Competencies & Outcomes</h3>
            </div>
            <ul className="crm-outcomes-list">
              <li>
                <CheckCircle2 size={16} className="crm-outcome-icon" />
                <span>End-to-end practical application design and hands-on coding exercises.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="crm-outcome-icon" />
                <span>Architectural patterns, modular code structures, and clean coding best practices.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="crm-outcome-icon" />
                <span>Debugging, testing, performance tuning, and database optimization.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="crm-outcome-icon" />
                <span>Capstone project deployment and portfolio preparation for technical interviews.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Program Info & Administration */}
        <div className="crm-details-sidebar-col">
          <div className="crm-card crm-summary-card">
            <h4 className="crm-summary-title">Program Snapshot</h4>
            <div className="crm-summary-divider" />
            
            <div className="crm-summary-row">
              <span className="label">Program Type</span>
              <span className="value">Professional Tech Track</span>
            </div>
            <div className="crm-summary-row">
              <span className="label">Delivery Mode</span>
              <span className="value">Hybrid / Lab-Assisted</span>
            </div>
            <div className="crm-summary-row">
              <span className="label">Schedule</span>
              <span className="value">Flexible Weekday & Weekend</span>
            </div>
            <div className="crm-summary-row">
              <span className="label">Certification</span>
              <span className="value">Little Champs Verified Certificate</span>
            </div>
            <div className="crm-summary-row">
              <span className="label">Current Enrolled</span>
              <span className="value highlight">{course.enrolledCount || 0} Students</span>
            </div>

            <button
              className="crm-btn-primary full-width"
              onClick={() => {
                if (onEnrollStudent) {
                  onEnrollStudent(course);
                } else {
                  navigate(`/admissions?course=${encodeURIComponent(course.name)}`);
                }
              }}
            >
              <UserPlus size={16} />
              <span>Enroll Student Now</span>
            </button>
          </div>

          <div className="crm-card crm-support-card">
            <h4 className="crm-support-title">Need Guidance?</h4>
            <p className="crm-support-desc">
              Have questions about eligibility, prerequisites, or schedules? Speak with our admissions advisors.
            </p>
            <button
              className="crm-btn-secondary full-width"
              onClick={() => navigate('/contact')}
            >
              Contact Admissions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
