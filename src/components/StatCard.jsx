export default function StatCard({ title, value, change, changeType = 'positive', icon: Icon, iconBg = '#f3e8ff', iconColor = '#7c3aed' }) {
  return (
    <div className="crm-stat-card">
      <div className="crm-stat-icon-wrap" style={{ backgroundColor: iconBg, color: iconColor }}>
        {Icon && <Icon size={24} />}
      </div>
      <div className="crm-stat-info">
        <div className="crm-stat-header">
          <span className="crm-stat-value">{value}</span>
          {change !== undefined && (
            <span className={`crm-stat-badge ${changeType === 'positive' ? 'positive' : 'neutral'}`}>
              {change}
            </span>
          )}
        </div>
        <p className="crm-stat-title">{title}</p>
      </div>
    </div>
  );
}
