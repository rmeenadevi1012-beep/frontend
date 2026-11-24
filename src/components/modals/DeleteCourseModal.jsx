import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

function DeleteCourseModal({ course, isOpen, onClose, onConfirmDelete }) {
  if (!isOpen || !course) return null;

  return (
    <div className="el-modal-overlay" onClick={onClose}>
      <div className="el-modal-container" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        <div className="el-modal-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#fee2e2',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <AlertTriangle size={22} />
          </div>
          <button type="button" className="el-modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="el-modal-body" style={{ textAlign: 'center', padding: '10px 24px 20px 24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e202e', margin: '10px 0 8px 0' }}>
            Delete Course?
          </h3>
          <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
            Are you sure you want to delete <strong style={{ color: '#1e202e' }}>"{course.name}"</strong> ({course.code})? This will update the total courses count in the CRM dashboard.
          </p>
        </div>

        <div className="el-modal-footer" style={{ justifyContent: 'center', gap: '12px' }}>
          <button type="button" className="el-btn el-btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="el-btn"
            style={{
              background: '#ef4444',
              color: '#ffffff',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onClick={() => {
              onConfirmDelete(course.id);
              onClose();
            }}
          >
            <Trash2 size={16} />
            <span>Delete Course</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCourseModal;
