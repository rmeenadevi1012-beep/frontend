import { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Download,
  Inbox,
  AlertCircle
} from 'lucide-react';

function CRMTablePage({
  title,
  subtitle,
  count = 0,
  icon: Icon,
  columns = [],
  filterLabel = 'Category',
  filterOptions = ['All'],
  actionButtonText = 'Add Record',
  onActionClick
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  return (
    <div className="el-dashboard-content">
      {/* Page Header */}
      <div className="el-page-header">
        <div className="el-page-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ margin: 0 }}>{title}</h1>
            <span style={{
              background: '#ede6fe',
              color: '#6e34e2',
              fontWeight: 800,
              fontSize: '13px',
              padding: '3px 10px',
              borderRadius: '20px'
            }}>
              {count} Records
            </span>
          </div>
          <p>{subtitle}</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            className="el-btn el-btn-outline"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => alert(`Exporting ${title} report... (0 records found)`)}
          >
            <Download size={16} />
            <span>Export</span>
          </button>
          {actionButtonText && (
            <button
              type="button"
              className="el-btn el-btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              onClick={onActionClick || (() => alert(`${actionButtonText} action clicked.`))}
            >
              <Plus size={18} />
              <span>{actionButtonText}</span>
            </button>
          )}
        </div>
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
            placeholder={`Search ${title.toLowerCase()}...`}
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

        {filterOptions.length > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} color="#64748b" />
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{filterLabel}:</span>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '13px',
                fontFamily: 'var(--el-font)',
                outline: 'none',
              }}
            >
              {filterOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* CRM Table Container with Professional Empty State */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid var(--el-border-light)',
        boxShadow: 'var(--el-shadow-card)',
        overflow: 'hidden'
      }}>
        {/* Table Head */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns.length || 4}, 1fr)`,
          padding: '14px 20px',
          background: '#f8fafc',
          borderBottom: '1px solid var(--el-border-light)',
          fontSize: '12px',
          fontWeight: 700,
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {columns.map((col, idx) => (
            <div key={idx}>{col}</div>
          ))}
        </div>

        {/* Empty State Body (Strictly 0 Records) */}
        <div style={{
          padding: '64px 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#ede6fe',
            color: '#6e34e2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            {Icon ? <Icon size={30} /> : <Inbox size={30} />}
          </div>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#1e202e', margin: '0 0 6px 0' }}>
            No {title} Records Found
          </h3>
          <p style={{ fontSize: '13.5px', color: '#64748b', maxWidth: '420px', margin: '0 0 18px 0', lineHeight: 1.5 }}>
            The {title.toLowerCase()} registry currently has 0 entries. As new {title.toLowerCase()} are submitted or processed, they will appear dynamically in this table.
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '12px',
            color: '#475569'
          }}>
            <AlertCircle size={14} color="#6e34e2" />
            <span>Count status: strictly 0 records initialized</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CRMTablePage;
