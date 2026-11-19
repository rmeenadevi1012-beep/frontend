import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Home,
  BookOpen,
  Settings,
  Image as GalleryIcon,
  HelpCircle,
  Mail,
  LogOut,
  X,
} from 'lucide-react';

function Sidebar({ isMobileOpen, onClose, onLogoutClick }) {
  const navigate = useNavigate();

  const handleNavClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    if (onClose) {
      onClose();
    }
    if (onLogoutClick) {
      onLogoutClick();
    } else {
      navigate('/logout');
    }
  };

  return (
    <aside className={`el-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
      <div className="el-sidebar-content">
        {/* Mobile Close Button */}
        <button
          type="button"
          className="el-sidebar-close-btn"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>

        {/* Brand Header */}
        <NavLink to="/" className="el-sidebar-header" onClick={handleNavClick}>
          <div className="el-sidebar-logo-icon">
            <GraduationCap size={42} strokeWidth={2.2} />
          </div>
          <h2 className="el-sidebar-title">EduLearn</h2>
          <h3 className="el-sidebar-subtitle">CRM</h3>
        </NavLink>

        {/* Navigation Menu in EXACT order requested */}
        <nav className="el-sidebar-menu">
          {/* 1. Home */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `el-sidebar-link ${isActive ? 'active' : ''}`
            }
            onClick={handleNavClick}
          >
            <Home size={19} strokeWidth={2.2} />
            <span>Home</span>
          </NavLink>

          {/* 2. Courses */}
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              `el-sidebar-link ${isActive ? 'active' : ''}`
            }
            onClick={handleNavClick}
          >
            <BookOpen size={19} strokeWidth={2.2} />
            <span>Courses</span>
          </NavLink>

          {/* 3. Services */}
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `el-sidebar-link ${isActive ? 'active' : ''}`
            }
            onClick={handleNavClick}
          >
            <Settings size={19} strokeWidth={2.2} />
            <span>Services</span>
          </NavLink>

          {/* 4. Gallery */}
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `el-sidebar-link ${isActive ? 'active' : ''}`
            }
            onClick={handleNavClick}
          >
            <GalleryIcon size={19} strokeWidth={2.2} />
            <span>Gallery</span>
          </NavLink>

          {/* 5. FAQ */}
          <NavLink
            to="/faq"
            className={({ isActive }) =>
              `el-sidebar-link ${isActive ? 'active' : ''}`
            }
            onClick={handleNavClick}
          >
            <HelpCircle size={19} strokeWidth={2.2} />
            <span>FAQ</span>
          </NavLink>

          {/* 6. Contact */}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `el-sidebar-link ${isActive ? 'active' : ''}`
            }
            onClick={handleNavClick}
          >
            <Mail size={19} strokeWidth={2.2} />
            <span>Contact</span>
          </NavLink>
        </nav>

        {/* 7. Logout pinned at the bottom */}
        <div className="el-sidebar-bottom">
          <button
            type="button"
            className="el-sidebar-logout-btn"
            onClick={handleLogout}
            title="Log out of EduLearn CRM"
          >
            <LogOut size={19} strokeWidth={2.2} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
