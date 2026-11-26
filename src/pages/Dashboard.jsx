import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  BookOpen,
  GraduationCap,
  Mail,
  Award,
  Image as ImageIcon,
  TrendingUp,
  PlusCircle,
  UserPlus,
  BarChart2,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  FolderOpen
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import StatCard from '../components/StatCard';

export default function Dashboard({
  stats,
  courses,
  admissions,
  enquiries,
  galleryUploads,
  programsCount,
  onOpenAddCourse,
  onOpenAddStudent,
  onOpenReports
}) {
  const navigate = useNavigate();

  // Chart data starts with 0 for students to strictly honor ZERO requirement
  // Will dynamically adjust with student admissions
  const chartData = [
    { month: 'Jan', Students: 0, Courses: Math.min(courses.length, 6) },
    { month: 'Feb', Students: 0, Courses: Math.min(courses.length, 9) },
    { month: 'Mar', Students: 0, Courses: Math.min(courses.length, 11) },
    { month: 'Apr', Students: 0, Courses: Math.min(courses.length, 13) },
    { month: 'May', Students: 0, Courses: Math.min(courses.length, 14) },
    {
      month: 'Jun',
      Students: admissions.length, // increases only when actual records added!
      Courses: courses.length
    }
  ];

  return (
    <div className="crm-dashboard-page">
      {/* 1. Welcome Banner matching reference screenshot */}
      <section className="crm-welcome-banner">
        <div className="crm-banner-content">
          <h2 className="crm-banner-title">Welcome Admin! 👋</h2>
          <p className="crm-banner-subtitle">
            Manage your CRM system efficiently. Little Champs Kids School Admin Panel.
          </p>
        </div>

        {/* Vector Illustration matching screenshot (laptop, graduation cap, leaves, books) */}
        <div className="crm-banner-illustration">
          <svg
            className="crm-banner-svg"
            viewBox="0 0 280 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Soft Glow */}
            <circle cx="180" cy="80" r="75" fill="#a855f7" fillOpacity="0.25" filter="blur(20px)" />
            
            {/* Floating Decorative Leaf 1 */}
            <path
              d="M60 40C65 25 85 20 90 35C95 50 75 55 60 40Z"
              fill="#c084fc"
              opacity="0.8"
            />
            {/* Floating Decorative Leaf 2 */}
            <path
              d="M250 50C255 35 275 30 278 45C282 60 262 65 250 50Z"
              fill="#c084fc"
              opacity="0.7"
            />

            {/* Laptop Base */}
            <path
              d="M100 130L80 135H240L220 130H100Z"
              fill="#cbd5e1"
            />
            <rect x="75" y="134" width="170" height="6" rx="3" fill="#94a3b8" />
            
            {/* Laptop Screen Frame */}
            <rect
              x="105"
              y="55"
              width="110"
              height="75"
              rx="6"
              fill="#1e293b"
              stroke="#cbd5e1"
              strokeWidth="3"
            />
            {/* Laptop Display (Gradient) */}
            <rect
              x="110"
              y="60"
              width="100"
              height="65"
              rx="4"
              fill="url(#screenGrad)"
            />
            <circle cx="160" cy="92" r="16" fill="#ffffff" fillOpacity="0.2" />
            <path
              d="M152 92L160 84L168 92L160 96L152 92Z"
              fill="#ffffff"
            />

            {/* Graduation Cap on top of Laptop */}
            <g transform="translate(142, 30)">
              {/* Mortarboard Diamond */}
              <polygon points="18,0 36,9 18,18 0,9" fill="#1e1b4b" stroke="#312e81" strokeWidth="1" />
              {/* Skull Cap */}
              <path d="M6 12V20C6 24 30 24 30 20V12" fill="#312e81" opacity="0.95" />
              {/* Tassel Button */}
              <circle cx="18" cy="9" r="2.5" fill="#facc15" />
              {/* Tassel String */}
              <path d="M18 9C26 12 32 18 34 25" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
              <circle cx="34" cy="26" r="2" fill="#facc15" />
            </g>

            {/* Stacked Books next to Laptop */}
            <g transform="translate(222, 105)">
              {/* Bottom Book (Blue) */}
              <rect x="0" y="20" width="48" height="10" rx="2" fill="#38bdf8" />
              <rect x="5" y="22" width="41" height="6" fill="#ffffff" opacity="0.9" />
              {/* Top Book (Amber/Orange) */}
              <rect x="3" y="10" width="42" height="10" rx="2" fill="#fbbf24" />
              <rect x="8" y="12" width="35" height="6" fill="#ffffff" opacity="0.9" />
            </g>

            <defs>
              <linearGradient id="screenGrad" x1="110" y1="60" x2="210" y2="125" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366f1" />
                <stop offset="1" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* 2. Primary Dashboard Statistics Cards */}
      <section className="crm-stats-grid">
        {/* Card 1: Total Students (Initial: 0) */}
        <StatCard
          title="Total Students"
          value={stats.totalStudents.toLocaleString()}
          change="↑ 0%"
          changeType="neutral"
          icon={Users}
          iconBg="#ede9fe"
          iconColor="#7c3aed"
        />

        {/* Card 2: Total Courses (Initial: 15) */}
        <StatCard
          title="Total Courses"
          value={courses.length}
          change="15 Available"
          changeType="positive"
          icon={BookOpen}
          iconBg="#e0f2fe"
          iconColor="#0284c7"
        />

        {/* Card 3: Total Admissions (Initial: 0) */}
        <StatCard
          title="Total Admissions"
          value={stats.totalAdmissions.toLocaleString()}
          change="↑ 0%"
          changeType="neutral"
          icon={TrendingUp}
          iconBg="#dcfce7"
          iconColor="#16a34a"
        />

        {/* Card 4: Total Enquiries (Initial: 0) */}
        <StatCard
          title="Total Enquiries"
          value={stats.totalEnquiries.toLocaleString()}
          change="↑ 0%"
          changeType="neutral"
          icon={Mail}
          iconBg="#fef3c7"
          iconColor="#d97706"
        />
      </section>

      {/* 2b. Secondary Requirements Metrics row (Programs: 0, New Admissions: 0, Gallery: 0) */}
      <section className="crm-secondary-stats-bar">
        <div className="crm-mini-metric">
          <div className="crm-mini-icon" style={{ background: '#ede9fe', color: '#7c3aed' }}>
            <Award size={18} />
          </div>
          <div className="crm-mini-info">
            <span className="crm-mini-label">Programs</span>
            <strong className="crm-mini-val">{programsCount}</strong>
          </div>
        </div>

        <div className="crm-mini-metric">
          <div className="crm-mini-icon" style={{ background: '#dcfce7', color: '#16a34a' }}>
            <GraduationCap size={18} />
          </div>
          <div className="crm-mini-info">
            <span className="crm-mini-label">New Admissions</span>
            <strong className="crm-mini-val">{stats.newAdmissions}</strong>
          </div>
        </div>

        <div className="crm-mini-metric">
          <div className="crm-mini-icon" style={{ background: '#fce7f3', color: '#db2777' }}>
            <ImageIcon size={18} />
          </div>
          <div className="crm-mini-info">
            <span className="crm-mini-label">Gallery Uploads</span>
            <strong className="crm-mini-val">{galleryUploads.length}</strong>
          </div>
        </div>

        <div className="crm-mini-metric notice">
          <span className="crm-zero-notice-tag">ZERO Data Verification Mode</span>
          <p className="crm-zero-notice-text">
            All records initialize strictly to 0. Counts increment only when actual records are created.
          </p>
        </div>
      </section>

      {/* 3. Middle Section: Student Overview Chart & Recent Admissions */}
      <section className="crm-mid-grid">
        {/* Student Overview Chart matching reference image */}
        <div className="crm-card crm-chart-card">
          <div className="crm-card-header">
            <div className="crm-card-title-group">
              <BarChart2 size={20} className="crm-card-header-icon" />
              <h3 className="crm-card-title">Student Overview</h3>
            </div>
            <div className="crm-chart-legend">
              <span className="crm-legend-item">
                <span className="crm-legend-dot purple" />
                Students
              </span>
              <span className="crm-legend-item">
                <span className="crm-legend-dot green" />
                Courses
              </span>
              <button
                className="crm-view-all-link"
                onClick={() => navigate('/admissions')}
              >
                <span>View All</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="crm-chart-container">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 20, left: -15, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => (val >= 1000 ? `${val / 1000}K` : val)}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    fontSize: '12px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="Students"
                  stroke="#7c3aed"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#7c3aed', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="Courses"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Admissions Table matching reference image */}
        <div className="crm-card crm-enrollments-card">
          <div className="crm-card-header">
            <div className="crm-card-title-group">
              <GraduationCap size={20} className="crm-card-header-icon" />
              <h3 className="crm-card-title">Recent Admissions</h3>
            </div>
            <button
              className="crm-view-all-link"
              onClick={() => navigate('/admissions')}
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="crm-table-wrapper">
            {admissions.length === 0 ? (
              <div className="crm-empty-state">
                <FolderOpen size={40} className="crm-empty-icon" />
                <h4 className="crm-empty-title">No Admissions Recorded</h4>
                <p className="crm-empty-desc">
                  Initially, all admission data starts at 0. Click below to enroll your first student.
                </p>
                <button
                  className="crm-btn-primary small"
                  onClick={onOpenAddStudent}
                >
                  <UserPlus size={16} />
                  <span>New Admission</span>
                </button>
              </div>
            ) : (
              <table className="crm-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Course</th>
                    <th>Enrollment Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {admissions.slice(0, 5).map((adm) => (
                    <tr key={adm.id}>
                      <td className="crm-td-name">
                        <div className="crm-student-cell">
                          <span className="crm-student-avatar">
                            {adm.name.charAt(0).toUpperCase()}
                          </span>
                          <span className="crm-student-name">{adm.name}</span>
                        </div>
                      </td>
                      <td className="crm-td-course">{adm.course}</td>
                      <td className="crm-td-date">{adm.date}</td>
                      <td>
                        <span
                          className={`crm-status-pill ${
                            adm.status === 'Confirmed' ? 'confirmed' : 'pending'
                          }`}
                        >
                          {adm.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      {/* 4. Bottom Section: Recent Messages, Upcoming Events & Quick Actions */}
      <section className="crm-bottom-grid">
        {/* Recent Messages (Enquiries) matching screenshot */}
        <div className="crm-card crm-messages-card">
          <div className="crm-card-header">
            <div className="crm-card-title-group">
              <Mail size={18} className="crm-card-header-icon" />
              <h3 className="crm-card-title">Recent Messages</h3>
            </div>
            <button
              className="crm-view-all-link"
              onClick={() => navigate('/contact')}
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="crm-messages-wrapper">
            {enquiries.length === 0 ? (
              <div className="crm-empty-state mini">
                <Mail size={32} className="crm-empty-icon" />
                <p className="crm-empty-desc">
                  No enquiries received yet. Inquiries sent via the Contact page will appear here.
                </p>
                <button
                  className="crm-link-action"
                  onClick={() => navigate('/contact')}
                >
                  Go to Contact Page →
                </button>
              </div>
            ) : (
              <ul className="crm-messages-list">
                {enquiries.slice(0, 3).map((item) => (
                  <li key={item.id} className="crm-message-item">
                    <span className="crm-msg-avatar">
                      {item.from.charAt(0).toUpperCase()}
                    </span>
                    <div className="crm-msg-info">
                      <div className="crm-msg-top">
                        <strong className="crm-msg-sender">{item.from}</strong>
                        <span className="crm-msg-date">{item.date}</span>
                      </div>
                      <p className="crm-msg-snippet">{item.subject}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Upcoming Events matching screenshot */}
        <div className="crm-card crm-events-card">
          <div className="crm-card-header">
            <div className="crm-card-title-group">
              <Calendar size={18} className="crm-card-header-icon" />
              <h3 className="crm-card-title">Upcoming Events</h3>
            </div>
            <button
              className="crm-view-all-link"
              onClick={() => navigate('/about')}
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="crm-events-body">
            <div className="crm-event-badge-card">
              <div className="crm-event-date-box">
                <span className="crm-event-day">20</span>
                <span className="crm-event-month">Nov</span>
              </div>
              <div className="crm-event-details">
                <h4 className="crm-event-title">Career Guidance Seminar</h4>
                <div className="crm-event-meta">
                  <span className="crm-meta-line">
                    <Clock size={13} />
                    <span>10:00 AM – 12:00 PM</span>
                  </span>
                  <span className="crm-meta-line">
                    <MapPin size={13} />
                    <span>Main Hall</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="crm-event-subinfo">
              <span>Little Champs Kids School Auditorium</span>
            </div>
          </div>
        </div>

        {/* Quick Actions matching screenshot */}
        <div className="crm-card crm-quick-actions-card">
          <div className="crm-card-header">
            <div className="crm-card-title-group">
              <span className="crm-lightning-bolt">⚡</span>
              <h3 className="crm-card-title">Quick Actions</h3>
            </div>
          </div>

          <div className="crm-quick-actions-grid">
            <button
              className="crm-action-button"
              onClick={onOpenAddCourse}
            >
              <BookOpen size={20} className="crm-action-icon" />
              <span>Add Course</span>
            </button>

            <button
              className="crm-action-button"
              onClick={onOpenAddStudent}
            >
              <UserPlus size={20} className="crm-action-icon" />
              <span>Add Student</span>
            </button>

            <button
              className="crm-action-button"
              onClick={onOpenReports}
            >
              <BarChart2 size={20} className="crm-action-icon" />
              <span>View Reports</span>
            </button>

            <button
              className="crm-action-button"
              onClick={() => navigate('/gallery')}
            >
              <ImageIcon size={20} className="crm-action-icon" />
              <span>Upload Gallery</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="crm-page-footer">
        <p className="crm-footer-text">
          © 2026 <strong>Little Champs Kids School</strong> — CRM Admin Panel. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
