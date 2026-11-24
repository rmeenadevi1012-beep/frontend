import React from 'react';
import { X, BookOpen, Clock, Tag, Award, CheckCircle, Briefcase, DollarSign, Users } from 'lucide-react';

function ViewCourseModal({ course, isOpen, onClose }) {
  if (!isOpen || !course) return null;

  return (
    <div className="el-modal-overlay" onClick={onClose}>
      <div className="el-modal-container" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div className="el-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: '#e8f4fd',
              color: '#1e88e5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BookOpen size={20} />
            </div>
            <div>
              <h3 className="el-modal-title" style={{ margin: 0, fontSize: '17px' }}>Course Specification</h3>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Code: {course.code}</span>
            </div>
          </div>
          <button type="button" className="el-modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="el-modal-body" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
          {/* Header Card */}
          <div style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #ede9fe 100%)',
            padding: '16px 20px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            marginBottom: '18px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
              <div>
                <span style={{
                  display: 'inline-block',
                  background: '#6e34e2',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '20px',
                  marginBottom: '6px'
                }}>
                  {course.category || course.department}
                </span>
                <h2 style={{ fontSize: '19px', fontWeight: 800, color: '#1e202e', margin: '4px 0 6px 0' }}>
                  {course.name}
                </h2>
              </div>
              <span style={{
                background: course.status === 'Active' ? '#dcfce7' : '#fee2e2',
                color: course.status === 'Active' ? '#15803d' : '#b91c1c',
                fontSize: '12px',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: '16px'
              }}>
                {course.status || 'Active'}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#475569', margin: '6px 0 0 0', lineHeight: 1.5 }}>
              {course.shortDescription || course.description}
            </p>
          </div>

          {/* Quick Meta Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{ background: '#ffffff', border: '1px solid #f1f5f9', padding: '10px 14px', borderRadius: '10px' }}>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={13} color="#6e34e2" /> Duration
              </span>
              <strong style={{ fontSize: '13px', color: '#1e202e', display: 'block', marginTop: '3px' }}>
                {course.duration || 'Flexible'}
              </strong>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #f1f5f9', padding: '10px 14px', borderRadius: '10px' }}>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Tag size={13} color="#10b981" /> Fee
              </span>
              <strong style={{ fontSize: '13px', color: '#1e202e', display: 'block', marginTop: '3px' }}>
                {course.fee || '$1,200'}
              </strong>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #f1f5f9', padding: '10px 14px', borderRadius: '10px' }}>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Users size={13} color="#f97316" /> Seats / Enrolled
              </span>
              <strong style={{ fontSize: '13px', color: '#1e202e', display: 'block', marginTop: '3px' }}>
                {course.seats || 40} / {course.enrolled || 0}
              </strong>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #f1f5f9', padding: '10px 14px', borderRadius: '10px' }}>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Award size={13} color="#0284c7" /> Rating
              </span>
              <strong style={{ fontSize: '13px', color: '#1e202e', display: 'block', marginTop: '3px' }}>
                ★ {course.rating || '4.9'}
              </strong>
            </div>
          </div>

          {/* Detailed Description */}
          {course.description && (
            <div style={{ marginBottom: '18px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1e202e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                Course Overview & Objectives
              </h4>
              <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6, background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                {course.description}
              </p>
            </div>
          )}

          {/* Eligibility */}
          {course.eligibility && (
            <div style={{ marginBottom: '18px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1e202e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                Eligibility
              </h4>
              <p style={{ fontSize: '13px', color: '#475569', margin: 0 }}>
                {course.eligibility}
              </p>
            </div>
          )}

          {/* Key Subjects */}
          {course.subjects && course.subjects.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1e202e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                Syllabus & Core Modules
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {course.subjects.map((sub, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#334155', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px' }}>
                    <CheckCircle size={14} color="#10b981" />
                    <span>{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Career Opportunities */}
          {course.careerOpportunities && course.careerOpportunities.length > 0 && (
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1e202e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                Career Opportunities
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {course.careerOpportunities.map((c, i) => (
                  <span key={i} style={{ background: '#ede6fe', color: '#6e34e2', fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px' }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="el-modal-footer">
          <button type="button" className="el-btn el-btn-outline" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewCourseModal;
