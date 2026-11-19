// EduLearn CRM Initial Mock Data & State (Zero-Initial-State Configured)

export const initialStats = [
  {
    id: 'students',
    title: 'Total Students',
    value: '0',
    change: '+0%',
    type: 'students',
    color: '#6e34e2',
    bg: '#ede6fe',
  },
  {
    id: 'courses',
    title: 'Total Courses',
    value: '0',
    change: '+0%',
    type: 'courses',
    color: '#1e88e5',
    bg: '#e8f4fd',
  },
  {
    id: 'enrollments',
    title: 'Total Enrollments',
    value: '0',
    change: '+0%',
    type: 'enrollments',
    color: '#10b981',
    bg: '#e6f8ee',
  },
  {
    id: 'inquiries',
    title: 'New Inquiries',
    value: '0',
    change: '+0%',
    type: 'inquiries',
    color: '#f97316',
    bg: '#fff1e6',
  },
];

// User Overview Chart - Starts strictly at 0
export const userOverviewChartData = [
  { month: 'Jan', Students: 0, Courses: 0 },
  { month: 'Feb', Students: 0, Courses: 0 },
  { month: 'Mar', Students: 0, Courses: 0 },
  { month: 'Apr', Students: 0, Courses: 0 },
  { month: 'May', Students: 0, Courses: 0 },
  { month: 'Jun', Students: 0, Courses: 0 },
];

// Initial zero-state arrays for dynamic live increments
export const initialEnrollments = [];
export const initialMessages = [];
export const initialCourses = [];
export const initialNotifications = [];

export const initialEvents = [
  {
    id: 1,
    day: '20',
    month: 'Nov',
    title: 'Career Guidance Seminar',
    time: '10:00 AM – 12:00 PM',
    location: 'Main Hall',
    speaker: 'Dr. S. Rajan, Industry Expert',
    attendees: 180,
  },
  {
    id: 2,
    day: '25',
    month: 'Nov',
    title: 'Web Dev Tech Workshop',
    time: '02:00 PM – 04:30 PM',
    location: 'Lab 3, IT Block',
    speaker: 'Prof. Anitha M.',
    attendees: 95,
  },
  {
    id: 3,
    day: '02',
    month: 'Dec',
    title: 'Annual Campus Placement Drive',
    time: '09:00 AM – 05:00 PM',
    location: 'Auditorium',
    speaker: 'Top 15 IT & Core Recruiters',
    attendees: 420,
  },
];

export const initialServices = [
  {
    id: 1,
    title: 'Academic Counseling & Advising',
    category: 'Student Support',
    description: 'One-on-one sessions helping students select courses, address academic difficulties, and achieve academic milestones.',
    coordinator: 'Counseling Dept',
    status: 'Available',
    icon: 'GraduationCap',
  },
  {
    id: 2,
    title: 'Career & Placement Cell',
    category: 'Career Services',
    description: 'Resume reviews, mock interview drives, industry internships, and direct on-campus company recruitment.',
    coordinator: 'Prof. Arun Kumar',
    status: 'Active',
    icon: 'Briefcase',
  },
  {
    id: 3,
    title: 'Digital Library & E-Resources',
    category: 'Library Facilities',
    description: '24/7 access to IEEE papers, academic journals, Springer e-books, and high-speed campus knowledge repository.',
    coordinator: 'Central Library',
    status: 'Available',
    icon: 'BookOpen',
  },
  {
    id: 4,
    title: 'Scholarships & Financial Aid',
    category: 'Financial',
    description: 'Merit-based scholarships, government aid assistance, fee concession reviews, and payment installment plans.',
    coordinator: 'Accounts & Aid Office',
    status: 'Available',
    icon: 'DollarSign',
  },
  {
    id: 5,
    title: 'Skill Development & Certifications',
    category: 'Training',
    description: 'Short-term technical certifications in Python, Cloud Computing, UI/UX, and Business Analytics.',
    coordinator: 'Innovation Lab',
    status: 'Active',
    icon: 'Award',
  },
  {
    id: 6,
    title: 'Hostel & Campus Transport Services',
    category: 'Campus Living',
    description: 'Secured hostel accommodations, hygienic dining mess facilities, and reliable daily transit shuttle routes.',
    coordinator: 'Campus Admin',
    status: 'Available',
    icon: 'Home',
  },
];

export const initialGallery = [
  {
    id: 1,
    title: 'Annual Graduation Convocation 2026',
    category: 'Events',
    tag: 'Academic',
    date: 'Oct 2026',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
    description: 'Proud graduates celebrating the commencement ceremony in the main university amphitheater.',
  },
  {
    id: 2,
    title: 'Modern High-Tech Computer Lab',
    category: 'Campus',
    tag: 'Infrastructure',
    date: 'Sep 2026',
    imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&auto=format&fit=crop&q=80',
    description: 'Students working on high-performance development machines in the AI & Data Science lab.',
  },
  {
    id: 3,
    title: 'Central University Library & Reading Hall',
    category: 'Campus',
    tag: 'Library',
    date: 'Aug 2026',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=80',
    description: 'Quiet, sunlit study zones with extensive academic research archives and reading desks.',
  },
  {
    id: 4,
    title: 'National Tech Hackathon Winners',
    category: 'Competitions',
    tag: 'Achievements',
    date: 'Jul 2026',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    description: 'EduLearn student team bagging first prize at the Smart City Innovation Hackathon.',
  },
  {
    id: 5,
    title: 'International Career & Higher Studies Expo',
    category: 'Seminars',
    tag: 'Events',
    date: 'Jun 2026',
    imageUrl: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=800&auto=format&fit=crop&q=80',
    description: 'Over 40 international universities and recruiting companies interacting with aspiring students.',
  },
  {
    id: 6,
    title: 'Cultural Festival & Talent Showcase',
    category: 'Cultural',
    tag: 'Student Life',
    date: 'May 2026',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
    description: 'Vibrant musical performances and theatre showcase during the annual inter-college fest.',
  },
];

export const initialFaqs = [
  {
    id: 1,
    question: 'How do I add a new student enrollment into the EduLearn CRM?',
    answer: 'You can quickly register a new student by clicking the "Add Student" button in the Quick Actions section on the dashboard, or by navigating to the Enrollments page and entering student details.',
    category: 'Enrollment',
  },
  {
    id: 2,
    question: 'How do I update course offerings and syllabus details?',
    answer: 'Go to the Courses section from the sidebar menu. Click on any course to edit its details, seat capacities, course fees, or click "Add Course" to create a new syllabus curriculum.',
    category: 'Courses',
  },
  {
    id: 3,
    question: 'What do the enrollment status badges "Confirmed" and "Pending" represent?',
    answer: '"Confirmed" indicates that all required documents and admission fees have been cleared. "Pending" denotes that verification of documents or tuition installment clearance is currently in progress.',
    category: 'Status',
  },
  {
    id: 4,
    question: 'Can I export student reports and enrollment statistics?',
    answer: 'Yes! Click "View Reports" in the Quick Actions section or visit the Reports page to download detailed PDF and Excel summaries of registrations, attendance, and fee collections.',
    category: 'Reports',
  },
  {
    id: 5,
    question: 'How are incoming student messages and inquiries routed?',
    answer: 'Messages submitted via web portals or phone inquiries arrive directly into the "Recent Messages" inbox. Admins can click on any inquiry to respond, tag status, or assign to an academic counselor.',
    category: 'Communication',
  },
  {
    id: 6,
    question: 'How can I schedule a new campus event or seminar?',
    answer: 'Visit the Upcoming Events section and click "Add Event" to input the date, time, venue, speaker profile, and targeted student cohort.',
    category: 'Events',
  },
];

export const initialUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@edulearn.edu',
    role: 'Super Admin',
    status: 'Active',
    lastLogin: 'Just now',
  },
  {
    id: 2,
    name: 'Dr. R. Ramanathan',
    email: 'ramanathan@edulearn.edu',
    role: 'Instructor',
    status: 'Active',
    lastLogin: '2 hours ago',
  },
  {
    id: 3,
    name: 'Prof. Lakshmi Priya',
    email: 'lakshmi@edulearn.edu',
    role: 'Instructor',
    status: 'Active',
    lastLogin: 'Yesterday',
  },
  {
    id: 4,
    name: 'Counselor Priya Nair',
    email: 'priya.nair@edulearn.edu',
    role: 'Academic Advisor',
    status: 'Active',
    lastLogin: '3 days ago',
  },
];
