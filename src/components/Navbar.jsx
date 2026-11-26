import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  ShieldCheck,
  RotateCcw,
  LogOut,
  CheckCircle
} from 'lucide-react';

export default function Navbar({
  onToggleMobileSidebar,
  searchTerm,
  onSearchChange,
  notifications = [],
  onMarkNotificationsRead,
  onResetData
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const notifRef = useRef(null);
  const adminRef = useRef(null);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (adminRef.current && !adminRef.current.contains(event.target)) {
        setShowAdminMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm && searchTerm.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="crm-navbar">
      <div className="crm-nav-left">
        {/* Mobile Sidebar Hamburger Toggle */}
        <button
          className="crm-hamburger-btn"
          onClick={onToggleMobileSidebar}
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={22} />
        </button>

        {/* Global Search Bar matching reference image */}
        <form className="crm-search-form" onSubmit={handleSearchSubmit}>
          <div className="crm-search-input-wrapper">
            <Search size={18} className="crm-search-icon" />
            <input
              type="text"
              placeholder="Search users, courses, services..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="crm-search-input"
            />
            {searchTerm && (
              <button
                type="button"
                className="crm-search-clear"
                onClick={() => onSearchChange('')}
              >
                ×
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="crm-nav-right">
        {/* Notification Bell with Badge */}
        <div className="crm-nav-dropdown-wrap" ref={notifRef}>
          <button
            className="crm-icon-btn crm-notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="crm-notification-badge">{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="crm-dropdown-panel crm-notifications-panel">
              <div className="crm-dropdown-header">
                <h4 className="crm-dropdown-title">Notifications</h4>
                {unreadCount > 0 && (
                  <button
                    className="crm-link-btn"
                    onClick={() => {
                      if (onMarkNotificationsRead) onMarkNotificationsRead();
                    }}
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="crm-dropdown-body">
                {notifications.length === 0 ? (
                  <div className="crm-empty-state-dropdown">
                    <CheckCircle size={28} color="#9ca3af" />
                    <p>No new notifications</p>
                  </div>
                ) : (
                  <ul className="crm-notifications-list">
                    {notifications.map((notif) => (
                      <li
                        key={notif.id}
                        className={`crm-notif-item ${notif.unread ? 'unread' : ''}`}
                      >
                        <div className="crm-notif-dot" />
                        <div className="crm-notif-content">
                          <p className="crm-notif-text">{notif.text}</p>
                          <span className="crm-notif-time">{notif.time}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Dropdown matching reference image */}
        <div className="crm-nav-dropdown-wrap" ref={adminRef}>
          <button
            className="crm-profile-btn"
            onClick={() => setShowAdminMenu(!showAdminMenu)}
            aria-label="Admin profile options"
          >
            <User size={18} />
            <ChevronDown size={14} />
          </button>

          {showAdminMenu && (
            <div className="crm-dropdown-menu crm-admin-dropdown">
              <div className="crm-admin-header">
                <div>
                  <div className="fw-semibold">Admin</div>
                </div>
              </div>

              <div className="crm-dropdown-divider" />

              <ul className="crm-admin-menu-list">
                <li>
                  <button
                    className="crm-menu-action"
                    onClick={() => {
                      setShowAdminMenu(false);
                      navigate('/courses');
                    }}
                  >
                    <ShieldCheck size={16} />
                    <span>Manage Courses (15)</span>
                  </button>
                </li>
                <li>
                  <button
                    className="crm-menu-action"
                    onClick={() => {
                      setShowAdminMenu(false);
                      navigate('/admissions');
                    }}
                  >
                    <User size={16} />
                    <span>Admissions Portal</span>
                  </button>
                </li>
                <li>
                  <button
                    className="crm-menu-action text-danger"
                    onClick={() => {
                      setShowAdminMenu(false);
                      if (onResetData) onResetData();
                    }}
                  >
                    <RotateCcw size={16} />
                    <span>Reset All CRM Data to 0</span>
                  </button>
                </li>
              </ul>

              <div className="crm-dropdown-divider" />

              <div className="crm-admin-menu-footer">
                <button
                  className="crm-menu-logout"
                  onClick={() => {
                    setShowAdminMenu(false);
                    navigate('/login');
                  }}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
