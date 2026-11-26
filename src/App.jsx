import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

// Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AddStudentModal from './components/AddStudentModal';
import ReportsModal from './components/ReportsModal';

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
const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(`littlechamps_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

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
      localStorage.setItem('littlechamps_courses', JSON.stringify(courses));
      localStorage.setItem('littlechamps_stats', JSON.stringify(stats));
      localStorage.setItem('littlechamps_admissions', JSON.stringify(admissions));
      localStorage.setItem('littlechamps_enquiries', JSON.stringify(enquiries));
      localStorage.setItem('littlechamps_gallery', JSON.stringify(galleryUploads));
      localStorage.setItem('littlechamps_notifications', JSON.stringify(notifications));
    } catch {
      // Ignore storage errors
    }
  }, [courses, stats, admissions, enquiries, galleryUploads, notifications]);

  // Toast Helper
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // -------------------------------------------------------------
  // Dynamic State Modifiers (Increments counts ONLY on user action)
  // -------------------------------------------------------------

  // Add Course Handler
  const handleAddCourse = (newCourse) => {
    setCourses((prev) => [newCourse, ...prev]);
    showToast(`✓ Course "${newCourse.name}" created successfully!`);
    
    // Add Notification
    setNotifications((prev) => [
      {
        id: Date.now(),
        text: `New Course created: ${newCourse.name}`,
        time: 'Just now',
        unread: true
      },
      ...prev
    ]);
  };

  // Update Course Handler
  const handleUpdateCourse = (updatedCourse) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c))
    );
    showToast(`✓ Course "${updatedCourse.name}" updated successfully!`);
  };

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
    setNotifications((prev) => [
      {
        id: Date.now(),
        text: `New Admission: ${newRecord.name} in ${newRecord.course}`,
        time: 'Just now',
        unread: true
      },
      ...prev
    ]);

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
      localStorage.removeItem('littlechamps_stats');
      localStorage.removeItem('littlechamps_admissions');
      localStorage.removeItem('littlechamps_enquiries');
      localStorage.removeItem('littlechamps_gallery');
      localStorage.removeItem('littlechamps_courses');
      localStorage.removeItem('littlechamps_notifications');
    } catch {
      // Ignore
    }

    showToast('✓ All CRM counts successfully reset to 0 with 15 standard courses!');
  };

  const handleMarkNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
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
                />
              }
            />

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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

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
  );
}
