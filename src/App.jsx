import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/edulearn.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import HomeDashboard from './components/pages/HomeDashboard';
import CoursesPage from './components/pages/CoursesPage';
import ServicesPage from './components/pages/ServicesPage';
import GalleryPage from './components/pages/GalleryPage';
import FaqPage from './components/pages/FaqPage';
import ContactPage from './components/pages/ContactPage';
import PublicEnrollmentPage from './components/pages/PublicEnrollmentPage';

// Modals
import AddCourseModal from './components/modals/AddCourseModal';
import AddStudentModal from './components/modals/AddStudentModal';
import ReportsModal from './components/modals/ReportsModal';
import ManageUsersModal from './components/modals/ManageUsersModal';
import LogoutModal from './components/modals/LogoutModal';
import SearchResultsModal from './components/modals/SearchResultsModal';

// Zero Initial Mock Data
import {
  initialStats,
  userOverviewChartData,
  initialEnrollments,
  initialMessages,
  initialEvents,
  initialCourses,
  initialServices,
  initialNotifications,
} from './data/mockData';

// Helper to safely read from localStorage
const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(`edulearn_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

function App() {
  // Application Data States (Zero-initial with localStorage persistence)
  const [stats, setStats] = useState(() => getStored('stats', initialStats));
  const [chartData, setChartData] = useState(() => getStored('chart', userOverviewChartData));
  const [enrollments, setEnrollments] = useState(() => getStored('enrollments', initialEnrollments));
  const [courses, setCourses] = useState(() => getStored('courses', initialCourses));
  const [messages, setMessages] = useState(() => getStored('messages', initialMessages));
  const [notifications, setNotifications] = useState(() => getStored('notifications', initialNotifications));
  const [events] = useState(initialEvents);
  const [services] = useState(initialServices);

  // UI States
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'addCourse' | 'addStudent' | 'reports' | 'manageUsers' | 'logout' | 'search'
  const [enrollingCourse, setEnrollingCourse] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Synchronize state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('edulearn_stats', JSON.stringify(stats));
      localStorage.setItem('edulearn_chart', JSON.stringify(chartData));
      localStorage.setItem('edulearn_enrollments', JSON.stringify(enrollments));
      localStorage.setItem('edulearn_courses', JSON.stringify(courses));
      localStorage.setItem('edulearn_messages', JSON.stringify(messages));
      localStorage.setItem('edulearn_notifications', JSON.stringify(notifications));
    } catch {
      // Ignore write errors
    }
  }, [stats, chartData, enrollments, courses, messages, notifications]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // 1. Action: Add New Course (Increments Total Courses by +1)
  const handleAddCourse = (newCourse) => {
    setCourses((prev) => [newCourse, ...prev]);

    // Increment Total Courses Stat
    setStats((prev) =>
      prev.map((s) => {
        if (s.id === 'courses') {
          const current = parseInt(s.value.replace(/,/g, '') || '0', 10);
          return { ...s, value: (current + 1).toString(), change: '+100%' };
        }
        return s;
      })
    );

    // Update User Overview chart Courses metric
    setChartData((prev) =>
      prev.map((item, index) =>
        index === prev.length - 1
          ? { ...item, Courses: (item.Courses || 0) + 1 }
          : item
      )
    );

    // Add Notification (+1 badge)
    setNotifications((prev) => [
      {
        id: Date.now(),
        title: 'New Course Added',
        message: `${newCourse.name} (${newCourse.code}) created successfully`,
        time: 'Just now',
        unread: true,
      },
      ...prev,
    ]);

    showToast(`✓ Course "${newCourse.name}" created! Total Courses is now updated.`);
  };

  // 2. Action: Enroll Student (Increments Total Enrollments & Total Students by +1)
  const handleAddStudent = (newStudent) => {
    setEnrollments((prev) => [newStudent, ...prev]);

    // Increment Total Students Stat & Total Enrollments Stat
    setStats((prev) =>
      prev.map((s) => {
        if (s.id === 'students') {
          const current = parseInt(s.value.replace(/,/g, '') || '0', 10);
          return { ...s, value: (current + 1).toLocaleString(), change: '+100%' };
        }
        if (s.id === 'enrollments') {
          const current = parseInt(s.value.replace(/,/g, '') || '0', 10);
          return { ...s, value: (current + 1).toLocaleString(), change: '+100%' };
        }
        return s;
      })
    );

    // Update enrolled count for the specific course if it exists
    setCourses((prev) =>
      prev.map((c) =>
        c.name === newStudent.course
          ? { ...c, enrolled: (c.enrolled || 0) + 1 }
          : c
      )
    );

    // Update User Overview chart Students metric
    setChartData((prev) =>
      prev.map((item, index) =>
        index === prev.length - 1
          ? { ...item, Students: (item.Students || 0) + 1 }
          : item
      )
    );

    // Add Notification (+1 badge)
    setNotifications((prev) => [
      {
        id: Date.now(),
        title: 'New Student Enrollment',
        message: `${newStudent.studentName} enrolled in ${newStudent.course}`,
        time: 'Just now',
        unread: true,
      },
      ...prev,
    ]);

    showToast(`✓ Student "${newStudent.studentName}" enrolled! Counts incremented.`);
  };

  // 3. Action: Add Inquiry from Contact Page (Increments New Inquiries by +1)
  const handleAddInquiry = (newInquiry) => {
    setMessages((prev) => [newInquiry, ...prev]);

    // Increment Inquiries Stat
    setStats((prev) =>
      prev.map((s) => {
        if (s.id === 'inquiries') {
          const current = parseInt(s.value.replace(/,/g, '') || '0', 10);
          return { ...s, value: (current + 1).toString(), change: '+100%' };
        }
        return s;
      })
    );

    // Add Notification (+1 badge)
    setNotifications((prev) => [
      {
        id: Date.now(),
        title: 'New Inquiry Received',
        message: `From ${newInquiry.from}: ${newInquiry.subject}`,
        time: 'Just now',
        unread: true,
      },
      ...prev,
    ]);

    showToast(`✓ Inquiry received from ${newInquiry.from}!`);
  };

  // 4. Action: Reset All Data to 0 for Clean Testing
  const handleResetAllData = () => {
    try {
      localStorage.removeItem('edulearn_stats');
      localStorage.removeItem('edulearn_chart');
      localStorage.removeItem('edulearn_enrollments');
      localStorage.removeItem('edulearn_courses');
      localStorage.removeItem('edulearn_messages');
      localStorage.removeItem('edulearn_notifications');
    } catch {
      // Ignore
    }

    setStats(initialStats);
    setChartData(userOverviewChartData);
    setEnrollments([]);
    setCourses([]);
    setMessages([]);
    setNotifications([]);
    showToast('✓ All CRM counts and data successfully reset to 0!');
  };

  const handleMarkNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const handleClearNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast('All notifications marked as read.');
  };

  const handleConfirmLogout = () => {
    setActiveModal(null);
    showToast('Administrator session closed.');
  };

  return (
    <BrowserRouter>
      <div className="el-app-container">
        {/* 1. Exact Left Sidebar matching design */}
        <Sidebar
          isMobileOpen={isMobileOpen}
          onClose={() => setIsMobileOpen(false)}
          onLogoutClick={() => setActiveModal('logout')}
        />

        {/* Mobile Sidebar Backdrop */}
        {isMobileOpen && (
          <div
            className="el-sidebar-backdrop"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close sidebar backdrop"
          />
        )}

        {/* 2. Main Content Wrapper */}
        <div className="el-main-wrapper">
          {/* Top Navbar with Public Enrollment Toggle, Bell Badge & Admin Dropdown */}
          <Navbar
            onToggleSidebar={() => setIsMobileOpen(!isMobileOpen)}
            searchTerm={searchTerm}
            onSearchChange={(val) => {
              setSearchTerm(val);
              if (val.trim()) {
                setActiveModal('search');
              }
            }}
            notifications={notifications}
            onMarkNotificationRead={handleMarkNotificationRead}
            onClearNotifications={handleClearNotifications}
            onLogoutClick={() => setActiveModal('logout')}
            onOpenManageUsers={() => setActiveModal('manageUsers')}
            onResetAllData={handleResetAllData}
          />

          {/* Router View Pages */}
          <main>
            <Routes>
              {/* Home Dashboard */}
              <Route
                path="/"
                element={
                  <HomeDashboard
                    stats={stats}
                    chartData={chartData}
                    enrollments={enrollments}
                    messages={messages}
                    events={events}
                    onAddCourse={() => setActiveModal('addCourse')}
                    onAddStudent={() => {
                      setEnrollingCourse(null);
                      setActiveModal('addStudent');
                    }}
                    onViewReports={() => setActiveModal('reports')}
                    onManageUsers={() => setActiveModal('manageUsers')}
                    onViewAllOverview={() => setActiveModal('reports')}
                    onViewAllEnrollments={() => setActiveModal('reports')}
                    onViewAllMessages={() => setActiveModal('reports')}
                    onViewAllEvents={() => setActiveModal('reports')}
                    onSelectStudent={(s) =>
                      showToast(`Selected student: ${s.studentName} (${s.course})`)
                    }
                    onSelectMessage={(m) =>
                      showToast(`Message from: ${m.from} - ${m.subject}`)
                    }
                    onSelectEvent={(e) =>
                      showToast(`Event: ${e.title} at ${e.location}`)
                    }
                  />
                }
              />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/Home" element={<Navigate to="/" replace />} />

              {/* Courses Page */}
              <Route
                path="/courses"
                element={
                  <CoursesPage
                    courses={courses}
                    onAddCourseClick={() => setActiveModal('addCourse')}
                    onEnrollClick={(course) => {
                      setEnrollingCourse(course);
                      setActiveModal('addStudent');
                    }}
                  />
                }
              />
              <Route path="/course" element={<Navigate to="/courses" replace />} />
              <Route path="/Course" element={<Navigate to="/courses" replace />} />

              {/* Public Student Admissions / Enrollment View */}
              <Route
                path="/enroll"
                element={
                  <PublicEnrollmentPage
                    courses={courses}
                    onEnrollStudent={handleAddStudent}
                  />
                }
              />

              {/* Services Page */}
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/service" element={<Navigate to="/services" replace />} />
              <Route path="/Service" element={<Navigate to="/services" replace />} />

              {/* Gallery Page */}
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/Gallery" element={<Navigate to="/gallery" replace />} />

              {/* FAQ Page */}
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/FAQ" element={<Navigate to="/faq" replace />} />

              {/* Contact Page */}
              <Route
                path="/contact"
                element={<ContactPage onAddInquiry={handleAddInquiry} />}
              />
              <Route path="/Contact" element={<Navigate to="/contact" replace />} />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>

        {/* Global Modals */}
        <AddCourseModal
          isOpen={activeModal === 'addCourse'}
          onClose={() => setActiveModal(null)}
          onAddCourse={handleAddCourse}
        />

        <AddStudentModal
          isOpen={activeModal === 'addStudent'}
          courses={courses}
          selectedCourse={enrollingCourse}
          onClose={() => {
            setActiveModal(null);
            setEnrollingCourse(null);
          }}
          onAddStudent={handleAddStudent}
        />

        <ReportsModal
          isOpen={activeModal === 'reports'}
          onClose={() => setActiveModal(null)}
        />

        <ManageUsersModal
          isOpen={activeModal === 'manageUsers'}
          onClose={() => setActiveModal(null)}
        />

        <LogoutModal
          isOpen={activeModal === 'logout'}
          onClose={() => setActiveModal(null)}
          onConfirm={handleConfirmLogout}
        />

        <SearchResultsModal
          isOpen={activeModal === 'search' && searchTerm.trim().length > 0}
          searchTerm={searchTerm}
          students={enrollments}
          courses={courses}
          services={services}
          onClose={() => {
            setActiveModal(null);
            setSearchTerm('');
          }}
          onSelectStudent={(s) => {
            showToast(`Selected student: ${s.studentName}`);
          }}
          onSelectCourse={(c) => {
            showToast(`Selected course: ${c.name}`);
          }}
          onSelectService={(srv) => {
            showToast(`Selected service: ${srv.title}`);
          }}
        />

        {/* Action Toast Alert */}
        {toastMessage && <div className="el-toast">{toastMessage}</div>}
      </div>
    </BrowserRouter>
  );
}

export default App;
