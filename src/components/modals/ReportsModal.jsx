import { X, BarChart2, BookOpen, Users, HelpCircle, UserCheck, DollarSign, Award, Layers } from 'lucide-react';

function ReportsModal({ isOpen, onClose, courseCount = 15 }) {
  if (!isOpen) return null;

  const crmMetrics = [
    { label: 'Courses', count: courseCount, icon: BookOpen, color: '#1e88e5', bg: '#e8f4fd' },
    { label: 'Students', count: 0, icon: Users, color: '#6e34e2', bg: '#ede6fe' },
    { label: 'Enquiries', count: 0, icon: HelpCircle, color: '#f97316', bg: '#fff1e6' },
    { label: 'Admissions', count: 0, icon: UserCheck, color: '#10b981', bg: '#e6f8ee' },
    { label: 'Staff', count: 0, icon: Users, color: '#8b5cf6', bg: '#f3e8ff' },
    { label: 'Batches', count: 0, icon: Layers, color: '#0284c7', bg: '#e0f2fe' },
    { label: 'Payments', count: 0, icon: DollarSign, color: '#16a34a', bg: '#dcfce7' },
    { label: 'Certificates', count: 0, icon: Award, color: '#d97706', bg: '#fef3c7' },
  ];

  return (
    <div className="el-modal-overlay" onClick={onClose}>
      <div
        className="el-modal-container"
        style={{ maxWidth: '680px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="el-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: '#ede6fe',
              color: '#6e34e2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BarChart2 size={20} />
            </div>
            <h3 className="el-modal-title" style={{ margin: 0 }}>
              CRM Statistics & Performance Report
            </h3>
          </div>
          <button type="button" className="el-modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="el-modal-body" style={{ maxHeight: '72vh', overflowY: 'auto' }}>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0' }}>
            Current baseline live statistics across all academic and operational CRM departments:
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            {crmMetrics.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  style={{
                    background: '#ffffff',
                    padding: '14px 12px',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    textAlign: 'center'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: item.bg,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 8px auto'
                  }}>
                    <Icon size={17} />
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: item.color }}>
                    {item.count}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginTop: '2px' }}>
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '16px'
          }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: 700, margin: '0 0 8px 0', color: '#1e202e' }}>
              Summary & Status
            </h4>
            <div style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.6 }}>
              <div>• <strong>Courses:</strong> {courseCount} verified curriculum programs loaded.</div>
              <div>• <strong>Students & Admissions:</strong> 0 active students (Zero initial baseline).</div>
              <div>• <strong>Enquiries:</strong> 0 prospective inquiries pending.</div>
              <div>• <strong>Batches & Staff:</strong> 0 active batches; 0 faculty assigned.</div>
              <div>• <strong>Payments & Certificates:</strong> 0 fee transactions; 0 certificates issued.</div>
            </div>
          </div>
        </div>

        <div className="el-modal-footer">
          <button type="button" className="el-btn el-btn-outline" onClick={onClose}>
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportsModal;
