import React from 'react';
import { LogOut, AlertTriangle, X } from 'lucide-react';

function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="el-modal-overlay" onClick={onClose}>
      <div
        className="el-modal-container"
        style={{ maxWidth: '440px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="el-modal-header">
          <h3 className="el-modal-title" style={{ color: '#ef4444' }}>
            <LogOut size={20} color="#ef4444" />
            Confirm Logout
          </h3>
          <button type="button" className="el-modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="el-modal-body" style={{ textAlign: 'center', padding: '28px 24px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#fee2e2',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
            }}
          >
            <AlertTriangle size={28} />
          </div>

          <h4 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 8px 0', color: '#1e202e' }}>
            Log out of EduLearn CRM?
          </h4>
          <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
            Are you sure you want to end your current administrative session? Unsaved changes will be safely preserved.
          </p>
        </div>

        <div className="el-modal-footer">
          <button type="button" className="el-btn el-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="el-btn el-btn-danger"
            onClick={onConfirm}
          >
            Yes, Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
