import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { BarChart2, ArrowRight } from 'lucide-react';

// Custom Tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#1e1b4b',
          color: '#ffffff',
          padding: '10px 14px',
          borderRadius: '8px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          fontSize: '12px',
        }}
      >
        <p style={{ margin: '0 0 6px 0', fontWeight: 700, color: '#c7d2fe' }}>
          {label} Overview
        </p>
        {payload.map((entry, index) => (
          <div
            key={`tooltip-${index}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: '3px 0',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: entry.color,
              }}
            />
            <span style={{ color: '#cbd5e1' }}>{entry.name}:</span>
            <span style={{ fontWeight: 700 }}>
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

function UserOverviewChart({ data, onViewAll }) {
  // Format Y-axis ticks to match screenshot: 0, 500, 1K, 1.5K
  const formatYAxis = (tickItem) => {
    if (tickItem === 0) return '0';
    if (tickItem === 500) return '500';
    if (tickItem === 1000) return '1K';
    if (tickItem === 1500) return '1.5K';
    return `${tickItem}`;
  };

  return (
    <div className="el-dashboard-card">
      {/* Header */}
      <div className="el-card-header">
        <div className="el-card-header-left">
          <div className="el-card-header-icon">
            <BarChart2 size={19} strokeWidth={2.2} />
          </div>
          <h3 className="el-card-title">User Overview</h3>
        </div>

        {/* Legend in Center */}
        <div className="el-chart-legend">
          <div className="el-legend-item">
            <span className="el-legend-dot purple" />
            <span>Students</span>
          </div>
          <div className="el-legend-item">
            <span className="el-legend-dot green" />
            <span>Courses</span>
          </div>
        </div>

        {/* View All */}
        <button
          type="button"
          className="el-card-view-all"
          onClick={onViewAll}
        >
          View All <span style={{ marginLeft: '2px' }}>→</span>
        </button>
      </div>

      {/* Recharts Line Chart */}
      <div className="el-chart-wrapper">
        <ResponsiveContainer width="100%" height={210}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 15, left: -15, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f2f7"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#71788e', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              domain={[0, 1500]}
              ticks={[0, 500, 1000, 1500]}
              tickFormatter={formatYAxis}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#71788e', fontSize: 12, fontWeight: 500 }}
              dx={-5}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Students - Purple line with smooth curves and dots */}
            <Line
              type="monotone"
              dataKey="Students"
              stroke="#6e34e2"
              strokeWidth={2.6}
              dot={{
                r: 4.5,
                fill: '#ffffff',
                stroke: '#6e34e2',
                strokeWidth: 2.2,
              }}
              activeDot={{
                r: 6,
                fill: '#6e34e2',
                stroke: '#ffffff',
                strokeWidth: 2,
              }}
            />
            {/* Courses - Green line with smooth curves and dots */}
            <Line
              type="monotone"
              dataKey="Courses"
              stroke="#10b981"
              strokeWidth={2.6}
              dot={{
                r: 4.5,
                fill: '#ffffff',
                stroke: '#10b981',
                strokeWidth: 2.2,
              }}
              activeDot={{
                r: 6,
                fill: '#10b981',
                stroke: '#ffffff',
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default UserOverviewChart;
