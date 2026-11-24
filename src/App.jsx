import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import './styles/edulearn.css';

// Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// Pages
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import PublicEnrollment from './pages/PublicEnrollment';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';

// Additional CRM pages with 0 baseline counts
import Students from './pages/Students';
import Enquiries from './pages/Enquiries';
import Admissions from './pages/Admissions';
import Staff from './pages/Staff';
import Batches from './pages/Batches';
import Payments from './pages/Payments';
import Certificates from './pages/Certificates';

// Modals
import AddCourseModal from './components/modals/AddCourseModal';
import AddStudentModal from './components/modals/AddStudentModal';
import ReportsModal from './components/modals/ReportsModal';
import ManageUsersModal from './components/modals/ManageUsersModal';
import LogoutModal from './components/modals/LogoutModal';
import SearchResultsModal from './components/modals/SearchResultsModal';

// Zero Initial Mock Data & 15 Exact Courses from Reference 2
import { initial15Courses } from './data/coursesData';
import {
  initialStats,
  userOverviewChartData,
  initialEnrollments,
  initialMessages,
  initialEvents,
  initialServices,
  initialNotifications,
} from './data/mockData';

// Safe helper to read from localStorage with intelligent fallback
const getStoredCourses = () => {
  try {
    const item = localStorage.getItem('edulearn_courses');
    if (item) {
      const parsed = JSON.parse(item);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  return initial15Courses;
};

const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(`edulearn_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

// Protected Route Component
function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Inner App Layout to access router hooks
function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Auth State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('edulearn_auth_user');
      return stored ? JSON.parse(stored) : {
        id: 'admin-root',
        fullName: 'System Administrator',
        username: 'admin',
        email: 'admin@edulearn.edu',
        role: 'Super Admin',
      };
    } catch {
      return null;
    }
  });

  // Application Data States (Courses initialized to exactly 15, all other counts strictly 0)
  const [courses, setCourses] = useState(getStoredCourses);
  const [enrollments, setEnrollments] = useState(() => getStored('enrollments', initialEnrollments));
  const [messages, setMessages] = useState(() => getStored('messages', initialMessages));
  const [notifications, setNotifications] = useState(() => getStored('notifications', initialNotifications));
  const [events] = useState(initialEvents);
  const [services] = useState(initialServices);

  // Synchronize stats dynamically with live courses count
  const [stats, setStats] = useState(() => {
    const savedStats = getStored('stats', initialStats);
    return savedStats.map((s) => {
      if (s.id === 'courses') {
        return { ...s, value: courses.length.toString() };
      }
      return s;
    });
  });

  // Chart data
  const [chartData, setChartData] = useState(() => {
    const savedChart = getStored('chart', userOverviewChartData);
    return savedChart.map((item) => ({
      ...item,
      Students: 0,
      Courses: courses.length,
    }));
  });

  // UI States
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'addCourse' | 'addStudent' | 'reports' | 'manageUsers' | 'logout' | 'search'
  const [enrollingCourse, setEnrollingCourse] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Synchronize state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('edulearn_courses', JSON.stringify(courses));
      localStorage.setItem('edulearn_enrollments', JSON.stringify(enrollments));
      localStorage.setItem('edulearn_messages', JSON.stringify(messages));
      localStorage.setItem('edulearn_notifications', JSON.stringify(notifications));
      localStorage.setItem('edulearn_stats', JSON.stringify(stats));
      localStorage.setItem('edulearn_chart', JSON.stringify(chartData));
    } catch {
      // Ignore write errors
    }
  }, [courses, enrollments, messages, notifications, stats, chartData]);

  // Keep stats in sync when courses length changes
  useEffect(() => {
    setStats((prev) =>
      prev.map((s) => (s.id === 'courses' ? { ...s, value: courses.length.toString() } : s))
    );
    setChartData((prev) =>
      prev.map((item) => ({ ...item, Courses: courses.length }))
    );
  }, [courses.length]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // 1. Add New Course
  const handleAddCourse = (newCourse) => {
    setCourses((prev) => [newCourse, ...prev]);

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

    showToast(`✓ Course "${newCourse.name}" created! Total Courses updated to ${courses.length + 1}.`);
  };

  // 2. Edit Existing Course
  const handleUpdateCourse = (updatedCourse) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c))
    );
    showToast(`✓ Course "${updatedCourse.name}" updated successfully.`);
  };

  // 3. Delete Course
  const handleDeleteCourse = (courseId) => {
    const courseToDelete = courses.find((c) => c.id === courseId);
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    showToast(`✓ Course "${courseToDelete?.name || 'Course'}" deleted. Total Courses is now ${courses.length - 1}.`);
  };

  // 4. Enroll Student (Live testing)
  const handleAddStudent = (newStudent) => {
    setEnrollments((prev) => [newStudent, ...prev]);

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

    setCourses((prev) =>
      prev.map((c) =>
        c.name === newStudent.course ? { ...c, enrolled: (c.enrolled || 0) + 1 } : c
      )
    );

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

    showToast(`✓ Student "${newStudent.studentName}" enrolled!`);
  };

  // 5. Inbound Inquiry
  const handleAddInquiry = (newInquiry) => {
    setMessages((prev) => [newInquiry, ...prev]);

    setStats((prev) =>
      prev.map((s) => {
        if (s.id === 'inquiries') {
          const current = parseInt(s.value.replace(/,/g, '') || '0', 10);
          return { ...s, value: (current + 1).toString(), change: '+100%' };
        }
        return s;
      })
    );

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

  // 6. Reset All CRM Data to Baseline
  const handleResetAllData = () => {
    try {
      localStorage.removeItem('edulearn_enrollments');
      localStorage.removeItem('edulearn_messages');
      localStorage.removeItem('edulearn_notifications');
    } catch {
      // ignore
    }
    setCourses(initial15Courses);
    setEnrollments([]);
    setMessages([]);
    setNotifications([
      {
        id: Date.now(),
        title: 'Catalog Reset',
        message: 'EduLearn catalog restored to original 15 courses. All other counts at 0.',
        time: 'Just now',
        unread: true,
      },
    ]);
    showToast('✓ Reset complete: 15 courses loaded, all other metrics set to 0!');
  };

  // 7. Notification Handlers
  const handleMarkNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const handleClearNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast('All notifications marked as read.');
  };

  // 8. Logout
  const handleConfirmLogout = () => {
    setActiveModal(null);
    try {
      localStorage.removeItem('edulearn_auth_user');
    } catch {
      // ignore
    }
    setCurrentUser(null);
    showToast('Administrator logged out successfully.');
    navigate('/login', { replace: true });
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    showToast(`Welcome back, ${user.fullName || user.username}!`);
  };

  // Auth pages (Login & Register) do not render CRM sidebar or navbar
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<AdminLogin onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<AdminRegister />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="el-app-container">
      {/* 1. Exact Left Sidebar matching design from Reference 1 */}
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
        {/* Top Navbar */}
        <Navbar
          user={currentUser}
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

        {/* Router View Pages with Route Protection */}
        <main>
          <Routes>
            {/* Dashboard (Home) */}
            <Route
              path="/"
              element={
                <ProtectedRoute user={currentUser}>
                  <Dashboard
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
                </ProtectedRoute>
              }
            />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/Home" element={<Navigate to="/" replace />} />

            {/* Courses Management */}
            <Route
              path="/courses"
              element={
                <ProtectedRoute user={currentUser}>
                  <Courses
                    courses={courses}
                    onAddCourseClick={() => setActiveModal('addCourse')}
                    onUpdateCourse={handleUpdateCourse}
                    onDeleteCourse={handleDeleteCourse}
                    onEnrollClick={(course) => {
                      setEnrollingCourse(course);
                      setActiveModal('addStudent');
                    }}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="/course" element={<Navigate to="/courses" replace />} />
            <Route path="/Course" element={<Navigate to="/courses" replace />} />

            {/* Public Student Admissions / Enrollment View */}
            <Route
              path="/enroll"
              element={
                <PublicEnrollment
                  courses={courses}
                  onEnrollStudent={handleAddStudent}
                />
              }
            />

            {/* Original Sidebar Pages from Ref 1 */}
            <Route
              path="/services"
              element={
                <ProtectedRoute user={currentUser}>
                  <Services />
                </ProtectedRoute>
              }
            />
            <Route path="/service" element={<Navigate to="/services" replace />} />
            <Route path="/Service" element={<Navigate to="/services" replace />} />

            <Route
              path="/gallery"
              element={
                <ProtectedRoute user={currentUser}>
                  <Gallery />
                </ProtectedRoute>
              }
            />
            <Route path="/Gallery" element={<Navigate to="/gallery" replace />} />

            <Route
              path="/faq"
              element={
                <ProtectedRoute user={currentUser}>
                  <Faq />
                </ProtectedRoute>
              }
            />
            <Route path="/FAQ" element={<Navigate to="/faq" replace />} />

            <Route
              path="/contact"
              element={
                <ProtectedRoute user={currentUser}>
                  <Contact onAddInquiry={handleAddInquiry} />
                </ProtectedRoute>
              }
            />
            <Route path="/Contact" element={<Navigate to="/contact" replace />} />

            {/* Additional CRM Pages (All initialized to strictly 0 records) */}
            <Route
              path="/students"
              element={
                <ProtectedRoute user={currentUser}>
                  <Students onAddStudentClick={() => setActiveModal('addStudent')} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/enquiries"
              element={
                <ProtectedRoute user={currentUser}>
                  <Enquiries />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admissions"
              element={
                <ProtectedRoute user={currentUser}>
                  <Admissions onAddStudentClick={() => setActiveModal('addStudent')} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/staff"
              element={
                <ProtectedRoute user={currentUser}>
                  <Staff />
                </ProtectedRoute>
              }
            />

            <Route
              path="/batches"
              element={
                <ProtectedRoute user={currentUser}>
                  <Batches />
                </ProtectedRoute>
              }
            />

            <Route
              path="/payments"
              element={
                <ProtectedRoute user={currentUser}>
                  <Payments />
                </ProtectedRoute>
              }
            />

            <Route
              path="/certificates"
              element={
                <ProtectedRoute user={currentUser}>
                  <Certificates />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
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
        courseCount={courses.length}
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
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
