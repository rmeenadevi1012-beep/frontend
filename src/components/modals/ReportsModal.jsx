import React from 'react';
import { X, BarChart2, Download, TrendingUp, Users, BookOpen } from 'lucide-react';

function ReportsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="el-modal-overlay" onClick={onClose}>
      <div
        className="el-modal-container"
        style={{ maxWidth: '680px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="el-modal-header">
          <h3 className="el-modal-title">
            <BarChart2 size={20} color="var(--el-purple-main)" />
            EduLearn CRM Performance Reports & Analytics
          </h3>
          <button type="button" className="el-modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="el-modal-body">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '14px',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                background: '#f8fafc',
                padding: '14px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
              }}
            >
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                ADMISSION CONVERSION
              </div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#1e202e', marginTop: '4px' }}>
                78.4%
              </div>
              <div style={{ fontSize: '11px', color: '#10b981', marginTop: '2px', fontWeight: 600 }}>
                ↑ +4.2% from last term
              </div>
            </div>

            <div
              style={{
                background: '#f8fafc',
                padding: '14px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
              }}
            >
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                RETENTION RATE
              </div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#1e202e', marginTop: '4px' }}>
                94.8%
              </div>
              <div style={{ fontSize: '11px', color: '#10b981', marginTop: '2px', fontWeight: 600 }}>
                ↑ High campus engagement
              </div>
            </div>

            <div
              style={{
                background: '#f8fafc',
                padding: '14px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
              }}
            >
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                SEAT OCCUPANCY
              </div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#1e202e', marginTop: '4px' }}>
                89.2%
              </div>
              <div style={{ fontSize: '11px', color: '#6e34e2', marginTop: '2px', fontWeight: 600 }}>
                327 / 360 total seats
              </div>
            </div>
          </div>

          <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>
            Departmental Enrollment Breakdown
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '4px' }}>
                <span>Computer Applications (B.Sc CS, BCA)</span>
                <span style={{ fontWeight: 600 }}>42% (112 Students)</span>
              </div>
              <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '42%', height: '100%', background: '#6e34e2' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '4px' }}>
                <span>Commerce & Accounting (B.Com)</span>
                <span style={{ fontWeight: 600 }}>26% (76 Students)</span>
              </div>
              <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '26%', height: '100%', background: '#1e88e5' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '4px' }}>
                <span>Management Studies (BBA)</span>
                <span style={{ fontWeight: 600 }}>20% (62 Students)</span>
              </div>
              <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '20%', height: '100%', background: '#10b981' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '4px' }}>
                <span>Sciences (M.Sc Maths)</span>
                <span style={{ fontWeight: 600 }}>12% (35 Students)</span>
              </div>
              <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '12%', height: '100%', background: '#f97316' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="el-modal-footer">
          <button
            type="button"
            className="el-btn el-btn-secondary"
            onClick={() => alert('Exporting full analytics report as PDF...')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Download size={15} />
            Export PDF
          </button>
          <button type="button" className="el-btn el-btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportsModal;
