import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from 'lucide-react';

function ContactPage({ onAddInquiry }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.subject) return;

    if (onAddInquiry) {
      onAddInquiry({
        id: Date.now(),
        from: formData.name,
        avatarChar: formData.name.charAt(0).toUpperCase(),
        subject: formData.subject,
        date: '18 Nov 2026',
        email: formData.email,
        unread: true,
      });
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <div className="el-dashboard-content">
      {/* Header */}
      <div className="el-page-header">
        <div className="el-page-title-group">
          <h1>Contact & Inquiry Helpdesk</h1>
          <p>Get in touch with the EduLearn administrative office, admissions desk, or submit student inquiries.</p>
        </div>
      </div>

      <div className="el-contact-layout">
        {/* Left Column: Campus Info Card */}
        <div className="el-contact-card">
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 16px 0', color: '#1e202e' }}>
            EduLearn Central Campus
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#ede6fe',
                  color: 'var(--el-purple-main)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <MapPin size={20} />
              </div>
              <div>
                <strong style={{ fontSize: '14px', color: '#1e202e' }}>Campus Address</strong>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                  Knowledge Park Campus, 42 Academic Boulevard, Tech Corridor, Bangalore 560100
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#e8f4fd',
                  color: '#1e88e5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Phone size={20} />
              </div>
              <div>
                <strong style={{ fontSize: '14px', color: '#1e202e' }}>Admissions Hotline</strong>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                  +91 (080) 4567 8900 / +91 98765 43210
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#e6f8ee',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Mail size={20} />
              </div>
              <div>
                <strong style={{ fontSize: '14px', color: '#1e202e' }}>Official Email</strong>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                  admissions@edulearn.edu • info@edulearn.edu
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#fff1e6',
                  color: '#f97316',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Clock size={20} />
              </div>
              <div>
                <strong style={{ fontSize: '14px', color: '#1e202e' }}>Working Hours</strong>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                  Monday – Saturday: 8:30 AM – 5:30 PM (IST)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Send Inquiry Form */}
        <div className="el-contact-card">
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px 0', color: '#1e202e' }}>
            Submit an Inquiry
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>
            Have a question regarding degree programs, entrance tests, or fee waivers? Send us a message.
          </p>

          {submitted ? (
            <div
              style={{
                background: '#dcfce7',
                border: '1px solid #bbf7d0',
                color: '#15803d',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <CheckCircle size={32} />
              <div style={{ fontWeight: 700, fontSize: '15px' }}>
                Thank you! Inquiry submitted successfully.
              </div>
              <div style={{ fontSize: '13px' }}>
                Your message has been added to the CRM Recent Messages feed.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="el-form-row">
                <div className="el-form-group">
                  <label className="el-form-label">Full Name *</label>
                  <input
                    type="text"
                    className="el-form-input"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="el-form-group">
                  <label className="el-form-label">Email Address *</label>
                  <input
                    type="email"
                    className="el-form-input"
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="el-form-row">
                <div className="el-form-group">
                  <label className="el-form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="el-form-input"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="el-form-group">
                  <label className="el-form-label">Subject *</label>
                  <input
                    type="text"
                    className="el-form-input"
                    placeholder="e.g. BCA Curriculum Details"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="el-form-group">
                <label className="el-form-label">Message Details</label>
                <textarea
                  className="el-form-textarea"
                  rows={4}
                  placeholder="Tell us what you'd like to know..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="el-btn el-btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}
              >
                <Send size={16} />
                <span>Send Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
