<<<<<<< HEAD
import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Trash2,
  Sparkles
} from 'lucide-react';

export default function Contact({
  courses,
  enquiries,
  onAddEnquiry,
  onDeleteEnquiry
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: courses[0]?.name || 'General Inquiry',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please fill in Name, Email, and Message.');
      return;
    }

    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')} ${today.toLocaleString('en-US', { month: 'short' })} ${today.getFullYear()}`;

    const newEnquiry = {
      id: Date.now().toString(),
      from: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      course: formData.course,
      subject: formData.subject.trim() || `Inquiry about ${formData.course}`,
      message: formData.message.trim(),
      date: formattedDate
    };

    onAddEnquiry(newEnquiry);
    setSubmitted(true);
    setFormError('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      course: courses[0]?.name || 'General Inquiry',
      subject: '',
      message: ''
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="crm-contact-page">
      {/* 1. Page Header */}
      <div className="crm-page-header-row">
        <div>
          <div className="crm-header-badge">
            <Sparkles size={14} />
            <span>Support & Help Desk</span>
          </div>
          <h2 className="crm-page-title">Contact & Inquiries Desk</h2>
          <p className="crm-page-subtitle">
            Little Champs Kids School admissions help desk, general communications, and student counseling requests.
          </p>
        </div>
      </div>

      <div className="crm-contact-grid">
        {/* Left Column: Contact Form */}
        <div className="crm-card crm-contact-form-card">
          <div className="crm-card-header">
            <div className="crm-card-title-group">
              <MessageSquare size={20} className="crm-card-header-icon" />
              <h3 className="crm-card-title">Send Admission Enquiry</h3>
            </div>
            <span className="crm-counter-tag">Enquiries: {enquiries.length}</span>
          </div>

          {submitted && (
            <div className="crm-success-alert">
              <CheckCircle size={20} />
              <div>
                <strong>Enquiry Submitted Successfully!</strong>
                <p>
                  Total Enquiries count has incremented by +1 and this message is now logged on the Dashboard.
                </p>
              </div>
            </div>
          )}

          {formError && (
            <div className="crm-form-error-alert">
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="crm-contact-form">
            <div className="crm-form-row">
              <div className="crm-form-group">
                <label className="crm-label">Your Name *</label>
                <input
                  type="text"
                  required
                  className="crm-input"
                  placeholder="e.g. Senthil Kumar"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="crm-form-group">
                <label className="crm-label">Email Address *</label>
                <input
                  type="email"
                  required
                  className="crm-input"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="crm-form-row">
              <div className="crm-form-group">
                <label className="crm-label">Phone Number</label>
                <input
                  type="tel"
                  className="crm-input"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="crm-form-group">
                <label className="crm-label">Course of Interest</label>
                <select
                  className="crm-select"
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({ ...formData, course: e.target.value })
                  }
                >
                  <option value="General Inquiry">General School Inquiry</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="crm-form-group">
              <label className="crm-label">Subject</label>
              <input
                type="text"
                className="crm-input"
                placeholder="e.g. Can I get more details about Python Full Stack?"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
            </div>

            <div className="crm-form-group">
              <label className="crm-label">Message Details *</label>
              <textarea
                required
                rows={4}
                className="crm-textarea"
                placeholder="Write your questions or consultation requirements..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            <button type="submit" className="crm-btn-primary full-width">
              <Send size={16} />
              <span>Submit Inquiry & Increment Count</span>
            </button>
          </form>
        </div>

        {/* Right Column: School Info & Inquiries Log */}
        <div className="crm-contact-info-col">
          <div className="crm-card crm-school-info-card">
            <h3 className="crm-card-title">School Headquarters</h3>
            <p className="crm-school-desc">
              Little Champs Kids School & Technical Academy CRM Operations.
            </p>

            <ul className="crm-info-list">
              <li>
                <div className="crm-info-icon">
                  <MapPin size={18} />
                </div>
                <div>
                  <strong>Campus Address</strong>
                  <p>123 Education Boulevard, Knowledge Tech Park, Chennai - 600001</p>
                </div>
              </li>

              <li>
                <div className="crm-info-icon">
                  <Phone size={18} />
                </div>
                <div>
                  <strong>Direct Helpdesk</strong>
                  <p>+91 (044) 2890-4567 / +91 98765 43210</p>
                </div>
              </li>

              <li>
                <div className="crm-info-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <strong>Email Communications</strong>
                  <p>admissions@littlechamps.edu / info@littlechamps.edu</p>
                </div>
              </li>

              <li>
                <div className="crm-info-icon">
                  <Clock size={18} />
                </div>
                <div>
                  <strong>Administration Hours</strong>
                  <p>Monday – Saturday: 8:30 AM – 5:30 PM IST</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Received Inquiries Mini Table */}
          <div className="crm-card crm-inquiries-log-card">
            <div className="crm-card-header">
              <h4 className="crm-card-title">Recent Inquiries Received ({enquiries.length})</h4>
            </div>

            {enquiries.length === 0 ? (
              <div className="crm-empty-state mini">
                <p className="crm-empty-desc">
                  No enquiries logged yet. Fill out the form on the left to submit an enquiry.
                </p>
              </div>
            ) : (
              <ul className="crm-inquiries-list">
                {enquiries.map((enq) => (
                  <li key={enq.id} className="crm-inquiry-log-item">
                    <div className="crm-inquiry-left">
                      <div className="crm-inquiry-header">
                        <strong>{enq.from}</strong>
                        <span className="date">{enq.date}</span>
                      </div>
                      <span className="course-pill">{enq.course}</span>
                      <p className="msg">{enq.subject}</p>
                    </div>
                    {onDeleteEnquiry && (
                      <button
                        className="crm-action-icon-btn delete"
                        onClick={() => onDeleteEnquiry(enq.id)}
                        title="Delete Inquiry"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
=======
import ContactPage from '../components/pages/ContactPage';
export default ContactPage;
>>>>>>> 43fe63ed57b74819d8462964507dc5759d388f46
