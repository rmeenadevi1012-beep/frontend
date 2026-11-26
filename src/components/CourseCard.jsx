import { useNavigate } from 'react-router-dom';
import { Clock, GraduationCap, Edit2, Trash2, ArrowRight } from 'lucide-react';

export default function CourseCard({ course, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="crm-course-card">
      {/* Course Image & Category Badge */}
      <div className="crm-course-image-wrap">
        <img
          src={course.image}
          alt={course.name}
          className="crm-course-img"
          loading="lazy"
          onError={(e) => {
            // fallback placeholder if image fails to load
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80';
          }}
        />
        <span className="crm-course-category-badge">{course.category}</span>
        
        {/* Quick Card Edit/Delete Floating Overlay */}
        <div className="crm-course-actions-overlay">
          {onEdit && (
            <button
              className="crm-card-icon-action edit"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(course);
              }}
              title="Edit Course"
              aria-label="Edit Course"
            >
              <Edit2 size={15} />
            </button>
          )}
          {onDelete && (
            <button
              className="crm-card-icon-action delete"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(course);
              }}
              title="Delete Course"
              aria-label="Delete Course"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Course Content */}
      <div className="crm-course-body">
        <h3 className="crm-course-title" title={course.name}>
          {course.name}
        </h3>
        
        <p className="crm-course-description" title={course.description}>
          {course.description}
        </p>

        {/* Metadata Details */}
        <div className="crm-course-meta-list">
          <div className="crm-course-meta-item">
            <Clock size={16} className="crm-meta-icon" />
            <span className="crm-meta-label">Duration:</span>
            <span className="crm-meta-val">{course.duration}</span>
          </div>
          <div className="crm-course-meta-item">
            <GraduationCap size={16} className="crm-meta-icon" />
            <span className="crm-meta-label">Eligibility:</span>
            <span className="crm-meta-val">{course.eligibility}</span>
          </div>
        </div>

        {/* Card Footer with Explore Details CTA Button */}
        <div className="crm-course-footer">
          <button
            className="crm-explore-btn"
            onClick={() => navigate(`/courses/${course.id}`)}
          >
            <span>Explore Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
