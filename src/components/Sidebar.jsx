import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  Info,
  GraduationCap,
  BookOpen,
  Image as ImageIcon,
  Mail,
  LogIn,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

export default function Sidebar({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  coursesCount = 15,
  onLogout
}) {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Home', path: '/home', icon: Home },
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Admissions', path: '/admissions', icon: GraduationCap },
    {
      name: 'Courses',
      path: '/courses',
      icon: BookOpen,
      badge: `${coursesCount}+`
    },
    { name: 'Gallery', path: '/gallery', icon: ImageIcon },
    { name: 'Contact', path: '/contact', icon: Mail },
    { name: 'Login', path: '/login', icon: LogIn }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="sidebar-backdrop show"
          onClick={onCloseMobile}
          aria-label="Close Mobile Sidebar"
        />
      )}

      <aside
        className={`crm-sidebar ${isCollapsed ? 'collapsed' : ''} ${
          isMobileOpen ? 'mobile-open' : ''
        }`}
      >
        {/* Brand Header */}
        <div className="crm-sidebar-header">
          <div className="crm-logo-container" onClick={() => navigate('/')}>
            <div className="crm-logo-icon">
              <GraduationCap size={28} color="#ffffff" />
            </div>
            {!isCollapsed && (
              <div className="crm-brand-text">
                <h1 className="crm-school-name">Little Champs Kids School</h1>
                <span className="crm-school-sub">CRM Admin Panel</span>
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          <button
            className="crm-sidebar-close-btn"
            onClick={onCloseMobile}
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="crm-sidebar-nav">
          <ul className="crm-nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name} className="crm-nav-item">
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `crm-nav-link ${isActive ? 'active' : ''}`
                    }
                    onClick={() => {
                      if (onCloseMobile) onCloseMobile();
                    }}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <span className="crm-nav-icon">
                      <Icon size={20} />
                    </span>
                    {!isCollapsed && (
                      <span className="crm-nav-label">{item.name}</span>
                    )}
                    {!isCollapsed && item.badge && (
                      <span className="crm-nav-badge">{item.badge}</span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="crm-sidebar-footer">
          <button
            className="crm-logout-btn"
            onClick={() => {
              if (onLogout) onLogout();
              else navigate('/login');
            }}
            title={isCollapsed ? 'Logout' : undefined}
          >
            <span className="crm-logout-icon">
              <LogOut size={20} />
            </span>
            {!isCollapsed && <span>Logout</span>}
          </button>

          {/* Desktop Collapse Toggle */}
          <button
            className="crm-collapse-toggle-btn"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Subtle Decorative Wave at bottom corner matching design */}
        <div className="crm-sidebar-wave" />
      </aside>
    </>
  );
}
