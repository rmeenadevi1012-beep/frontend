import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  Shield,
  LogOut,
  X,
  GraduationCap,
  LayoutDashboard,
  RotateCcw,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

function Navbar({
  onToggleSidebar,
  searchTerm,
  onSearchChange,
  notifications,
  onMarkNotificationRead,
  onClearNotifications,
  onLogoutClick,
  onOpenManageUsers,
  onResetAllData,
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);

  const notifRef = useRef(null);
  const adminRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isPublicEnrollment = location.pathname === '/enroll';

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (adminRef.current && !adminRef.current.contains(event.target)) {
        setShowAdminDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications ? notifications.filter((n) => n.unread).length : 0;

  return (
    <header className="el-navbar">
      {/* Left: Hamburger & Search */}
      <div className="el-navbar-left">
        <button
          type="button"
          className="el-hamburger-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} strokeWidth={2.2} />
        </button>

        <div className="el-search-container">
          <Search size={18} className="el-search-icon-left" />
          <input
            type="text"
            className="el-search-input"
            placeholder="Search users, courses, services..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm ? (
            <X
              size={16}
              className="el-search-icon-right"
              onClick={() => onSearchChange('')}
              title="Clear search"
            />
          ) : (
            <Search size={16} className="el-search-icon-right" />
          )}
        </div>
      </div>

      {/* Right: Quick View Toggle, Notifications & Admin Profile */}
      <div className="el-navbar-right">
        {/* Quick View Toggle Button ("Public Enrollment View" vs "Admin Dashboard") */}
        <button
          type="button"
          onClick={() => navigate(isPublicEnrollment ? '/' : '/enroll')}
          className="el-view-toggle-btn"
          title={isPublicEnrollment ? 'Return to Admin Dashboard' : 'Open Public Student Admissions Form to test enrollment'}
        >
          {isPublicEnrollment ? (
            <>
              <LayoutDashboard size={15} />
              <span className="el-toggle-text-full">Admin Dashboard</span>
              <span className="el-toggle-text-short">Admin</span>
            </>
          ) : (
            <>
              <GraduationCap size={15} />
              <span className="el-toggle-text-full">Public Enrollment View</span>
              <span className="el-toggle-text-short">Public View</span>
            </>
          )}
        </button>

        {/* Notification Bell */}
        <div className="position-relative" ref={notifRef} style={{ position: 'relative' }}>
          <button
            type="button"
            className="el-notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View notifications"
          >
            <Bell size={21} strokeWidth={2.2} />
            {unreadCount > 0 && (
              <span className="el-notification-badge">{unreadCount}</span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="el-dropdown-panel" style={{ width: '330px' }}>
              <div className="el-dropdown-header">
                <span>Notifications ({unreadCount} new)</span>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    style={{
                      border: 'none',
                      background: 'none',
                      color: 'var(--el-purple-main)',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                    onClick={onClearNotifications}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {notifications && notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`el-dropdown-item ${n.unread ? 'unread' : ''}`}
                      onClick={() => onMarkNotificationRead(n.id)}
                    >
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: n.unread ? '#6e34e2' : '#cbd5e1',
                          marginTop: '6px',
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <p className="el-notification-text-title">{n.title}</p>
                        <p className="el-notification-text-desc">{n.message}</p>
                        <p className="el-notification-text-time">{n.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '24px 16px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                    No notifications (Starts at 0)
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile */}
        <div className="position-relative" ref={adminRef} style={{ position: 'relative' }}>
          <div
            className="el-admin-profile"
            onClick={() => setShowAdminDropdown(!showAdminDropdown)}
          >
            <div className="el-admin-avatar">A</div>
            <span className="el-admin-name">Admin</span>
            <ChevronDown size={14} className="el-admin-chevron" strokeWidth={2.5} />
          </div>

          {/* Admin Profile Dropdown */}
          {showAdminDropdown && (
            <div className="el-dropdown-panel" style={{ width: '230px' }}>
              <div
                style={{
                  padding: '14px 18px',
                  borderBottom: '1px solid var(--el-border-light)',
                  background: '#fcfaff',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#1e202e' }}>
                  Administrator
                </div>
                <div style={{ fontSize: '12px', color: '#6e34e2', fontWeight: 600 }}>
                  Super Admin
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                  admin@edulearn.edu
                </div>
              </div>

              {/* Reset All Data to 0 Button */}
              <div
                className="el-dropdown-item"
                onClick={() => {
                  setShowAdminDropdown(false);
                  if (window.confirm('Reset all CRM counts, enrollments, courses and inquiries back to 0?')) {
                    onResetAllData();
                  }
                }}
                style={{ color: '#d97706', background: '#fffbeb', borderBottom: '1px solid #fef3c7' }}
              >
                <RotateCcw size={15} color="#d97706" />
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Reset All Data to 0</span>
              </div>

              <div
                className="el-dropdown-item"
                onClick={() => {
                  setShowAdminDropdown(false);
                  onOpenManageUsers();
                }}
              >
                <User size={16} color="#6e34e2" />
                <span style={{ fontSize: '13px', fontWeight: 500 }}>User Management</span>
              </div>

              <div
                className="el-dropdown-item"
                onClick={() => {
                  setShowAdminDropdown(false);
                  onOpenManageUsers();
                }}
              >
                <Shield size={16} color="#6e34e2" />
                <span style={{ fontSize: '13px', fontWeight: 500 }}>Role & Permissions</span>
              </div>

              <div
                className="el-dropdown-item"
                onClick={() => {
                  setShowAdminDropdown(false);
                  onLogoutClick();
                }}
                style={{ color: '#ef4444' }}
              >
                <LogOut size={16} color="#ef4444" />
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Log Out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
