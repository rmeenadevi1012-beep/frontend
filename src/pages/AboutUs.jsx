import {
  GraduationCap,
  Award,
  Users,
  Target,
  BookOpen,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="crm-about-page">
      {/* Header */}
      <div className="crm-page-header-row">
        <div>
          <div className="crm-header-badge">
            <Sparkles size={14} />
            <span>Institutional Profile</span>
          </div>
          <h2 className="crm-page-title">About Little Champs Kids School</h2>
          <p className="crm-page-subtitle">
            Nurturing future technological leaders, computational thinkers, and lifelong learners.
          </p>
        </div>
      </div>

      {/* Main Intro Card */}
      <div className="crm-card crm-about-hero-card">
        <div className="crm-about-hero-content">
          <h3 className="crm-about-heading">Excellence in Early & Advanced Tech Education</h3>
          <p className="crm-about-text">
            <strong>Little Champs Kids School</strong> is a premier educational institution committed to bridging foundational academic excellence with future-ready engineering competencies. Our specialized curriculum spans from core computational logic and early problem solving to 15 cutting-edge technological tracks including Full Stack Development, Artificial Intelligence, Data Science, Cyber Security, and Cloud Architecture.
          </p>
          <div className="crm-about-badges">
            <span className="crm-about-pill">
              <Award size={16} /> ISO 9001:2015 Certified
            </span>
            <span className="crm-about-pill">
              <Users size={16} /> Expert Industry Faculty
            </span>
            <span className="crm-about-pill">
              <ShieldCheck size={16} /> Safe & Smart Campus
            </span>
          </div>
        </div>
      </div>

      {/* Vision & Mission Grid */}
      <div className="crm-about-grid">
        <div className="crm-card crm-about-card">
          <div className="crm-about-icon-box purple">
            <Target size={24} />
          </div>
          <h4 className="crm-about-card-title">Our Vision</h4>
          <p className="crm-about-card-text">
            To empower young minds with digital literacy, critical reasoning, and technical mastery, preparing them to thrive and innovate in an automated, AI-driven global landscape.
          </p>
        </div>

        <div className="crm-card crm-about-card">
          <div className="crm-about-icon-box green">
            <GraduationCap size={24} />
          </div>
          <h4 className="crm-about-card-title">Our Mission</h4>
          <p className="crm-about-card-text">
            Delivering holistic, project-driven computer science education through 15 modern courses, hands-on software development labs, and transparent CRM student administration.
          </p>
        </div>

        <div className="crm-card crm-about-card">
          <div className="crm-about-icon-box blue">
            <BookOpen size={24} />
          </div>
          <h4 className="crm-about-card-title">Curriculum Standard</h4>
          <p className="crm-about-card-text">
            Our 15 career-oriented courses are regularly updated to mirror Silicon Valley tech standards, spanning Full Stack MERN, Python, Java, AWS Cloud, Generative AI, and DevOps.
          </p>
        </div>
      </div>

      {/* Key Core Values */}
      <div className="crm-card crm-values-card">
        <h3 className="crm-values-title">Institutional Pillars & Values</h3>
        <div className="crm-values-grid">
          <div className="crm-value-item">
            <CheckCircle2 size={18} className="crm-value-check" />
            <div>
              <strong>Student-Centric Learning</strong>
              <p>Tailored mentoring and small cohort sizes for maximum individual attention.</p>
            </div>
          </div>

          <div className="crm-value-item">
            <CheckCircle2 size={18} className="crm-value-check" />
            <div>
              <strong>Real-World Project Labs</strong>
              <p>Practical coding environments, live repository hosting, and code reviews.</p>
            </div>
          </div>

          <div className="crm-value-item">
            <CheckCircle2 size={18} className="crm-value-check" />
            <div>
              <strong>Ethics & Digital Responsibility</strong>
              <p>Cultivating safe digital hygiene, cyber ethics, and inclusive collaboration.</p>
            </div>
          </div>

          <div className="crm-value-item">
            <CheckCircle2 size={18} className="crm-value-check" />
            <div>
              <strong>Transparent CRM Tracking</strong>
              <p>Zero-compromise data tracking for student admissions, progress, and certificates.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
