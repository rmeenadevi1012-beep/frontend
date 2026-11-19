import React from 'react';
import { Users, BookOpen, TrendingUp, Mail } from 'lucide-react';

function StatCards({ stats }) {
  // Map icons based on stat id/type
  const getIcon = (type) => {
    switch (type) {
      case 'students':
        return <Users size={24} color="#6e34e2" strokeWidth={2.2} />;
      case 'courses':
        return <BookOpen size={24} color="#1e88e5" strokeWidth={2.2} />;
      case 'enrollments':
        return <TrendingUp size={24} color="#10b981" strokeWidth={2.2} />;
      case 'inquiries':
        return <Mail size={24} color="#f97316" strokeWidth={2.2} />;
      default:
        return <Users size={24} color="#6e34e2" strokeWidth={2.2} />;
    }
  };

  return (
    <div className="el-stats-grid">
      {stats.map((stat) => (
        <div key={stat.id} className="el-stat-card">
          <div className="el-stat-left">
            <div
              className="el-stat-icon-box"
              style={{ backgroundColor: stat.bg }}
            >
              {getIcon(stat.type)}
            </div>
            <div className="el-stat-data">
              <h3 className="el-stat-value">{stat.value}</h3>
              <span className="el-stat-label">{stat.title}</span>
            </div>
          </div>

          <div className="el-stat-trend">
            <span>↑</span>
            <span>{stat.change.replace('+', '')}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatCards;
