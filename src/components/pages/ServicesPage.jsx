import React, { useState } from 'react';
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  DollarSign,
  Award,
  Home,
  Headphones,
  CheckCircle,
  Plus,
} from 'lucide-react';
import { initialServices } from '../../data/mockData';

function ServicesPage() {
  const [services, setServices] = useState(initialServices);
  const [requestedId, setRequestedId] = useState(null);

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap size={24} />;
      case 'Briefcase':
        return <Briefcase size={24} />;
      case 'BookOpen':
        return <BookOpen size={24} />;
      case 'DollarSign':
        return <DollarSign size={24} />;
      case 'Award':
        return <Award size={24} />;
      case 'Home':
        return <Home size={24} />;
      default:
        return <Headphones size={24} />;
    }
  };

  const handleRequestService = (id) => {
    setRequestedId(id);
    setTimeout(() => {
      setRequestedId(null);
    }, 2500);
  };

  return (
    <div className="el-dashboard-content">
      {/* Header */}
      <div className="el-page-header">
        <div className="el-page-title-group">
          <h1>Student & Campus Services</h1>
          <p>Comprehensive support ecosystems designed to empower academic success and student welfare.</p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="el-services-grid">
        {services.map((service) => (
          <div key={service.id} className="el-service-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="el-service-icon-box">
                {getServiceIcon(service.icon)}
              </div>
              <span className="el-status-badge confirmed">
                {service.status}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--el-purple-main)', textTransform: 'uppercase' }}>
                {service.category}
              </span>
              <h3 className="el-service-title">{service.title}</h3>
            </div>

            <p className="el-service-desc">{service.description}</p>

            <div
              style={{
                marginTop: 'auto',
                paddingTop: '12px',
                borderTop: '1px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                Managed by: <strong>{service.coordinator}</strong>
              </span>

              <button
                type="button"
                className="el-btn el-btn-primary"
                style={{ padding: '6px 14px', fontSize: '12px' }}
                onClick={() => handleRequestService(service.id)}
              >
                {requestedId === service.id ? 'Requested ✓' : 'Inquire'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;
