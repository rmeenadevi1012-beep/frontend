import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowLeft, CheckCircle2, BookOpen, Send, Sparkles } from 'lucide-react';

function PublicEnrollmentPage({ courses = [], onEnrollStudent }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    course: courses.length > 0 ? courses[0].name : 'B.Sc Computer Science',
    category: 'Undergraduate Degree',
    notes: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.email.trim()) return;

    const today = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const newStudent = {
      id: Date.now(),
      studentName: formData.studentName.trim(),
      course: formData.course,
      enrollmentDate: today,
      status: 'Confirmed',
      email: formData.email.trim(),
      phone: formData.phone.trim() || '+91 98765 43210',
    };

    onEnrollStudent(newStudent);
    setSubmittedName(formData.studentName.trim());
    setIsSuccess(true);
  };

  return (
    <div className="el-dashboard-content" style={{ maxWidth: '820px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Top Navigation Back to Admin */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="el-btn el-btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Admin Dashboard</span>
        </button>

        <span
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: 'var(--el-purple-main)',
            background: 'var(--el-purple-bg)',
            padding: '6px 14px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Sparkles size={14} />
          Public Student Admissions Portal
        </span>
      </div>

      {isSuccess ? (
        /* Success Screen */
        <div
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '48px 32px',
            textAlign: 'center',
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
            border: '1px solid var(--el-border-light)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#e6f8ee',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px auto',
            }}
          >
            <CheckCircle2 size={36} />
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1e202e', margin: '0 0 10px 0' }}>
            🎉 Enrollment Successfully Submitted!
          </h2>
          <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '520px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
            Thank you, <strong>{submittedName}</strong>. Your application has been logged into the EduLearn University database.
          </p>

          <div
            style={{
              background: '#f8fafc',
              padding: '16px 20px',
              borderRadius: '12px',
              maxWidth: '480px',
              margin: '0 auto 28px auto',
              border: '1px solid #e2e8f0',
              textAlign: 'left',
              fontSize: '13px',
              color: '#475569',
            }}
          >
            <div style={{ fontWeight: 700, color: 'var(--el-purple-main)', marginBottom: '4px' }}>
              ✓ Real-Time Dashboard Updates:
            </div>
            <div>• Total Enrollments incremented by <strong>+1</strong></div>
            <div>• Total Students incremented by <strong>+1</strong></div>
            <div>• Notification alert sent to Admin Dashboard</div>
            <div>• User Overview chart & Recent Enrollments table updated</div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              type="button"
              className="el-btn el-btn-primary"
              style={{ padding: '12px 24px', fontSize: '14px', fontWeight: 700 }}
              onClick={() => navigate('/')}
            >
              View on Admin Dashboard →
            </button>
            <button
              type="button"
              className="el-btn el-btn-secondary"
              style={{ padding: '12px 20px', fontSize: '14px' }}
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  studentName: '',
                  email: '',
                  phone: '',
                  course: courses.length > 0 ? courses[0].name : 'B.Sc Computer Science',
                  category: 'Undergraduate Degree',
                  notes: '',
                });
              }}
            >
              Enroll Another Student
            </button>
          </div>
        </div>
      ) : (
        /* Enrollment Form */
        <div
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '36px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
            border: '1px solid var(--el-border-light)',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, var(--el-purple-main), #8b5cf6)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(110,52,226,0.3)',
              }}
            >
              <GraduationCap size={28} />
            </div>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1e202e', margin: 0 }}>
                Student Course Admission Form
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                Fill in your details below to register into EduLearn academic degree programs.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div className="el-form-group">
              <label className="el-form-label" style={{ fontWeight: 700 }}>
                Student Full Name *
              </label>
              <input
                type="text"
                name="studentName"
                required
                className="el-form-input"
                placeholder="e.g. S. Arunkumar"
                value={formData.studentName}
                onChange={handleChange}
              />
            </div>

            <div className="el-form-row">
              <div className="el-form-group">
                <label className="el-form-label" style={{ fontWeight: 700 }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="el-form-input"
                  placeholder="arunkumar@student.edu"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="el-form-group">
                <label className="el-form-label" style={{ fontWeight: 700 }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="el-form-input"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="el-form-row">
              <div className="el-form-group">
                <label className="el-form-label" style={{ fontWeight: 700 }}>
                  Selected Course / Degree *
                </label>
                <select
                  name="course"
                  className="el-form-select"
                  value={formData.course}
                  onChange={handleChange}
                >
                  {courses.length > 0 ? (
                    courses.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name} ({c.code})
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="B.Sc Computer Science">B.Sc Computer Science (CS-101)</option>
                      <option value="B.Com">B.Com (COM-201)</option>
                      <option value="BCA">BCA (CA-301)</option>
                      <option value="BBA">BBA (MGT-101)</option>
                      <option value="M.Sc Maths">M.Sc Maths (SCI-401)</option>
                      <option value="B.A. English Literature">B.A. English Literature (ENG-202)</option>
                    </>
                  )}
                </select>
              </div>

              <div className="el-form-group">
                <label className="el-form-label" style={{ fontWeight: 700 }}>
                  Admission Level
                </label>
                <select
                  name="category"
                  className="el-form-select"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Undergraduate Degree">Undergraduate Degree (3 Years)</option>
                  <option value="Postgraduate Master">Postgraduate Master (2 Years)</option>
                  <option value="Professional Diploma">Professional Diploma (1 Year)</option>
                </select>
              </div>
            </div>

            <div className="el-form-group">
              <label className="el-form-label" style={{ fontWeight: 700 }}>
                Additional Notes / Queries (Optional)
              </label>
              <textarea
                name="notes"
                className="el-form-input"
                rows="3"
                placeholder="Any special remarks or questions for admissions counselors..."
                value={formData.notes}
                onChange={handleChange}
                style={{ resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
              <button
                type="button"
                className="el-btn el-btn-secondary"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="el-btn el-btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 28px',
                  fontSize: '14px',
                  fontWeight: 700,
                }}
              >
                <Send size={16} />
                <span>Submit Enrollment & Register</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default PublicEnrollmentPage;
