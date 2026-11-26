import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import './styles/edulearn.css';

// Components
import EduLearnSidebar from './components/EduLearnSidebar';
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
import Students from './pages/Students';
import Enquiries from './pages/Enquiries';
import Admissions from './pages/Admissions';
import Staff from './pages/Staff';
import Batches from './pages/Batches';
import Payments from './pages/Payments';
import Certificates from './pages/Certificates';
import CourseDetails from './pages/CourseDetails';
import AboutUs from './pages/AboutUs';

const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(`littlechamps_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

function AppLayout() {
  const location = useLocation();
  const [notifications] = useState(() => getStored('notifications', []));

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<AdminLogin onLoginSuccess={() => {}} />} />
        <Route path="/register" element={<AdminRegister />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="el-app-container">
      <EduLearnSidebar />
      <div className="el-main-wrapper">
        <Navbar
          onToggleMobileSidebar={() => {}}
          searchTerm=""
          onSearchChange={() => {}}
          notifications={notifications}
        />
        <main className="crm-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/students" element={<Students />} />
            <Route path="/enquiries" element={<Enquiries />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/batches" element={<Batches />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/enroll" element={<PublicEnrollment />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
