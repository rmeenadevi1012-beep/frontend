import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import './styles/edulearn.css';

// Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AddStudentModal from './components/AddStudentModal';
import ReportsModal from './components/ReportsModal';

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

// Pages
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Admissions from './pages/Admissions';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';

// Initial Data
import { initialCoursesData } from './data/courses';

// Safe localStorage helper
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
    const item = localStorage.getItem(`littlechamps_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

<<<<<<< HEAD
export default function App() {
  const navigate = useNavigate();

  // 1. Initial 15 Courses (Persisted in localStorage)
  const [courses, setCourses] = useState(() =>
    getStored('courses', initialCoursesData)
  );

  // 2. Strict ZERO INITIAL Dashboard Statistics as specified in Section 3
  const [stats, setStats] = useState(() =>
    getStored('stats', {
      totalStudents: 0,
      totalAdmissions: 0,
      newAdmissions: 0,
      totalEnquiries: 0
    })
  );

  // 3. Admissions Records (Empty array initially - no fake records)
  const [admissions, setAdmissions] = useState(() =>
    getStored('admissions', [])
  );

  // 4. Enquiries (Empty array initially)
  const [enquiries, setEnquiries] = useState(() =>
    getStored('enquiries', [])
  );

  // 5. Gallery Uploads (Empty array initially)
  const [galleryUploads, setGalleryUploads] = useState(() =>
    getStored('gallery', [])
  );

  // 6. Programs Count (0 initially)
  const [programsCount] = useState(0);

  // 7. Notifications
  const [notifications, setNotifications] = useState(() =>
    getStored('notifications', [])
  );
=======
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
>>>>>>> 43fe63ed57b74819d8462964507dc5759d388f46

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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Active Modals
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState(null);

  // Persist state changes to localStorage
  useEffect(() => {
    try {
<<<<<<< HEAD
      localStorage.setItem('littlechamps_courses', JSON.stringify(courses));
      localStorage.setItem('littlechamps_stats', JSON.stringify(stats));
      localStorage.setItem('littlechamps_admissions', JSON.stringify(admissions));
      localStorage.setItem('littlechamps_enquiries', JSON.stringify(enquiries));
      localStorage.setItem('littlechamps_gallery', JSON.stringify(galleryUploads));
      localStorage.setItem('littlechamps_notifications', JSON.stringify(notifications));
=======
      localStorage.setItem('edulearn_courses', JSON.stringify(courses));
      localStorage.setItem('edulearn_enrollments', JSON.stringify(enrollments));
      localStorage.setItem('edulearn_messages', JSON.stringify(messages));
      localStorage.setItem('edulearn_notifications', JSON.stringify(notifications));
      localStorage.setItem('edulearn_stats', JSON.stringify(stats));
      localStorage.setItem('edulearn_chart', JSON.stringify(chartData));
>>>>>>> 43fe63ed57b74819d8462964507dc5759d388f46
    } catch {
      // Ignore storage errors
    }
<<<<<<< HEAD
  }, [courses, stats, admissions, enquiries, galleryUploads, notifications]);
=======
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
>>>>>>> 43fe63ed57b74819d8462964507dc5759d388f46

  // Toast Helper
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

<<<<<<< HEAD
  // -------------------------------------------------------------
  // Dynamic State Modifiers (Increments counts ONLY on user action)
  // -------------------------------------------------------------

  // Add Course Handler
  const handleAddCourse = (newCourse) => {
    setCourses((prev) => [newCourse, ...prev]);
    showToast(`✓ Course "${newCourse.name}" created successfully!`);
    
    // Add Notification
=======
  // 1. Add New Course
  const handleAddCourse = (newCourse) => {
    setCourses((prev) => [newCourse, ...prev]);

>>>>>>> 43fe63ed57b74819d8462964507dc5759d388f46
    setNotifications((prev) => [
      {
        id: Date.now(),
        text: `New Course created: ${newCourse.name}`,
        time: 'Just now',
        unread: true
      },
      ...prev
    ]);
<<<<<<< HEAD
  };

  // Update Course Handler
  const handleUpdateCourse = (updatedCourse) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c))
=======

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
>>>>>>> 43fe63ed57b74819d8462964507dc5759d388f46
    );
    showToast(`✓ Course "${updatedCourse.name}" updated successfully!`);
  };

<<<<<<< HEAD
  // Delete Course Handler
  const handleDeleteCourse = (courseId) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    showToast('Course removed from curriculum.');
  };

  // Add Student / Admission Handler -> INCREMENTS Total Students & Total Admissions
  const handleAddAdmission = (newRecord) => {
    setAdmissions((prev) => [newRecord, ...prev]);

    // Dynamically increment stats
    setStats((prev) => ({
      ...prev,
      totalStudents: prev.totalStudents + 1,
      totalAdmissions: prev.totalAdmissions + 1,
      newAdmissions: prev.newAdmissions + 1
    }));

    // Update course enrolledCount if course matches
    setCourses((prev) =>
      prev.map((c) =>
        c.name === newRecord.course
          ? { ...c, enrolledCount: (c.enrolledCount || 0) + 1 }
          : c
      )
    );

    // Add notification
=======
    setCourses((prev) =>
      prev.map((c) =>
        c.name === newStudent.course ? { ...c, enrolled: (c.enrolled || 0) + 1 } : c
      )
    );

>>>>>>> 43fe63ed57b74819d8462964507dc5759d388f46
    setNotifications((prev) => [
      {
        id: Date.now(),
        text: `New Admission: ${newRecord.name} in ${newRecord.course}`,
        time: 'Just now',
        unread: true
      },
      ...prev
    ]);

<<<<<<< HEAD
    showToast(`✓ Student "${newRecord.name}" admitted! Counts incremented.`);
  };

  // Delete Admission Handler
  const handleDeleteAdmission = (admissionId) => {
    setAdmissions((prev) => prev.filter((a) => a.id !== admissionId));
    setStats((prev) => ({
      ...prev,
      totalStudents: Math.max(0, prev.totalStudents - 1),
      totalAdmissions: Math.max(0, prev.totalAdmissions - 1),
      newAdmissions: Math.max(0, prev.newAdmissions - 1)
    }));
    showToast('Admission record removed.');
  };

  // Toggle Admission Status Handler
  const handleToggleAdmissionStatus = (admissionId) => {
    setAdmissions((prev) =>
      prev.map((a) => {
        if (a.id === admissionId) {
          const nextStatus = a.status === 'Confirmed' ? 'Pending' : 'Confirmed';
          return { ...a, status: nextStatus };
=======
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
>>>>>>> 43fe63ed57b74819d8462964507dc5759d388f46
        }
        return a;
      })
    );
  };

  // Add Enquiry Handler -> INCREMENTS Total Enquiries
  const handleAddEnquiry = (newEnquiry) => {
    setEnquiries((prev) => [newEnquiry, ...prev]);

    setStats((prev) => ({
      ...prev,
      totalEnquiries: prev.totalEnquiries + 1
    }));

    setNotifications((prev) => [
      {
        id: Date.now(),
        text: `New Enquiry from ${newEnquiry.from} (${newEnquiry.course})`,
        time: 'Just now',
        unread: true
      },
      ...prev
    ]);

    showToast(`✓ Enquiry from "${newEnquiry.from}" received! Count incremented.`);
  };

<<<<<<< HEAD
  // Delete Enquiry Handler
  const handleDeleteEnquiry = (enquiryId) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== enquiryId));
    setStats((prev) => ({
      ...prev,
      totalEnquiries: Math.max(0, prev.totalEnquiries - 1)
    }));
    showToast('Enquiry removed.');
  };

  // Add Gallery Upload Handler -> INCREMENTS Gallery Uploads
  const handleAddGalleryUpload = (newUpload) => {
    setGalleryUploads((prev) => [newUpload, ...prev]);
    showToast(`✓ Photo "${newUpload.title}" uploaded! Gallery count updated.`);

    setNotifications((prev) => [
      {
        id: Date.now(),
        text: `New Gallery photo uploaded: ${newUpload.title}`,
        time: 'Just now',
        unread: true
      },
      ...prev
    ]);
  };

  // Delete Gallery Upload Handler
  const handleDeleteGalleryUpload = (uploadId) => {
    setGalleryUploads((prev) => prev.filter((g) => g.id !== uploadId));
    showToast('Gallery image removed.');
  };

  // Reset All CRM Data to ZERO (Clean slate testing)
=======
  // 6. Reset All CRM Data to Baseline
>>>>>>> 43fe63ed57b74819d8462964507dc5759d388f46
  const handleResetAllData = () => {
    setStats({
      totalStudents: 0,
      totalAdmissions: 0,
      newAdmissions: 0,
      totalEnquiries: 0
    });
    setAdmissions([]);
    setEnquiries([]);
    setGalleryUploads([]);
    setCourses(initialCoursesData);
    setNotifications([]);

    try {
<<<<<<< HEAD
      localStorage.removeItem('littlechamps_stats');
      localStorage.removeItem('littlechamps_admissions');
      localStorage.removeItem('littlechamps_enquiries');
      localStorage.removeItem('littlechamps_gallery');
      localStorage.removeItem('littlechamps_courses');
      localStorage.removeItem('littlechamps_notifications');
=======
      localStorage.removeItem('edulearn_enrollments');
      localStorage.removeItem('edulearn_messages');
      localStorage.removeItem('edulearn_notifications');
>>>>>>> 43fe63ed57b74819d8462964507dc5759d388f46
    } catch {
      // ignore
    }
<<<<<<< HEAD

    showToast('✓ All CRM counts successfully reset to 0 with 15 standard courses!');
  };

  const handleMarkNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
=======
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
>>>>>>> 43fe63ed57b74819d8462964507dc5759d388f46
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
<<<<<<< HEAD
    <div className="crm-app-layout">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        coursesCount={courses.length}
        onLogout={() => {
          showToast('Administrator logged out.');
          navigate('/login');
        }}
      />

      {/* 2. Main Content Wrapper */}
      <div
        className={`crm-main-content ${
          isSidebarCollapsed ? 'expanded-content' : ''
        }`}
      >
        {/* Top Navbar */}
        <Navbar
          onToggleMobileSidebar={() =>
            setIsMobileSidebarOpen(!isMobileSidebarOpen)
          }
          searchTerm={globalSearch}
          onSearchChange={setGlobalSearch}
          notifications={notifications}
          onMarkNotificationsRead={handleMarkNotificationsRead}
          onResetData={handleResetAllData}
        />

        {/* View Router Pages */}
        <main className="crm-content-area">
          <Routes>
            {/* Dashboard */}
            <Route
              path="/"
              element={
                <Dashboard
                  stats={stats}
                  courses={courses}
                  admissions={admissions}
                  enquiries={enquiries}
                  galleryUploads={galleryUploads}
                  programsCount={programsCount}
                  onOpenAddCourse={() => navigate('/courses')}
                  onOpenAddStudent={() => {
                    setSelectedCourseForEnroll(null);
                    setIsAddStudentModalOpen(true);
                  }}
                  onOpenReports={() => setIsReportsModalOpen(true)}
                />
              }
            />

            {/* Home (aliases to Dashboard) */}
            <Route
              path="/home"
              element={
                <Dashboard
                  stats={stats}
                  courses={courses}
                  admissions={admissions}
                  enquiries={enquiries}
                  galleryUploads={galleryUploads}
                  programsCount={programsCount}
                  onOpenAddCourse={() => navigate('/courses')}
                  onOpenAddStudent={() => {
                    setSelectedCourseForEnroll(null);
                    setIsAddStudentModalOpen(true);
                  }}
                  onOpenReports={() => setIsReportsModalOpen(true)}
                />
              }
            />

            {/* About Us */}
            <Route path="/about" element={<AboutUs />} />

            {/* Admissions Management */}
            <Route
              path="/admissions"
              element={
                <Admissions
                  admissions={admissions}
                  courses={courses}
                  onAddAdmission={handleAddAdmission}
                  onDeleteAdmission={handleDeleteAdmission}
                  onToggleStatus={handleToggleAdmissionStatus}
=======
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
>>>>>>> 43fe63ed57b74819d8462964507dc5759d388f46
                />
              }
            />

<<<<<<< HEAD
            {/* 15 Courses Page */}
            <Route
              path="/courses"
              element={
                <Courses
                  courses={courses}
                  onAddCourse={handleAddCourse}
                  onUpdateCourse={handleUpdateCourse}
                  onDeleteCourse={handleDeleteCourse}
                />
              }
            />

            {/* Individual Course Details */}
            <Route
              path="/courses/:id"
              element={
                <CourseDetails
                  courses={courses}
                  onEnrollStudent={(course) => {
                    setSelectedCourseForEnroll(course);
                    setIsAddStudentModalOpen(true);
                  }}
                />
              }
            />

            {/* Gallery Media */}
            <Route
              path="/gallery"
              element={
                <Gallery
                  galleryUploads={galleryUploads}
                  onAddUpload={handleAddGalleryUpload}
                  onDeleteUpload={handleDeleteGalleryUpload}
                />
              }
            />

            {/* Contact & Inquiries Desk */}
            <Route
              path="/contact"
              element={
                <Contact
                  courses={courses}
                  enquiries={enquiries}
                  onAddEnquiry={handleAddEnquiry}
                  onDeleteEnquiry={handleDeleteEnquiry}
                />
              }
            />

            {/* Login */}
            <Route
              path="/login"
              element={
                <Login
                  onLoginSuccess={() =>
                    showToast('Welcome back to Little Champs Admin Portal!')
                  }
                />
              }
            />

            {/* Catch-all redirect to Dashboard */}
=======
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
>>>>>>> 43fe63ed57b74819d8462964507dc5759d388f46
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

<<<<<<< HEAD
      {/* Global Quick Add Student Modal */}
      <AddStudentModal
        isOpen={isAddStudentModalOpen}
        courses={courses}
        preselectedCourse={selectedCourseForEnroll}
        onClose={() => {
          setIsAddStudentModalOpen(false);
          setSelectedCourseForEnroll(null);
        }}
        onAddStudent={handleAddAdmission}
      />

      {/* Global Analytics & Audit Reports Modal */}
      <ReportsModal
        isOpen={isReportsModalOpen}
        onClose={() => setIsReportsModalOpen(false)}
        stats={stats}
        coursesCount={courses.length}
        galleryCount={galleryUploads.length}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="crm-toast-container">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
=======
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
>>>>>>> 43fe63ed57b74819d8462964507dc5759d388f46
  );
}
