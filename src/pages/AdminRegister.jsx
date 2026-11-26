import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  User,
  Mail,
  Phone,
  Lock,
  Shield,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

function AdminRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'Super Admin',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = [
    'Super Admin',
    'Academic Coordinator',
    'Admissions Manager',
    'Faculty Administrator',
    'Finance & Accounts Officer',
  ];

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[0-9+() -]{7,16}$/.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 1. Required field checks
    if (!formData.fullName.trim()) {
      setError('Full Name is required.');
      return;
    }
    if (!formData.email.trim()) {
      setError('Email Address is required.');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Please provide a valid email address (e.g. name@edulearn.edu).');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Phone Number is required.');
      return;
    }
    if (!validatePhone(formData.phone)) {
      setError('Please provide a valid phone number.');
      return;
    }
    if (!formData.username.trim()) {
      setError('Username is required.');
      return;
    }
    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }
    if (!formData.password) {
      setError('Password is required.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if user already exists
      const existingAdmins = JSON.parse(localStorage.getItem('edulearn_registered_admins') || '[]');
      const emailExists = existingAdmins.some(
        (a) => a.email.toLowerCase() === formData.email.toLowerCase()
      );
      const usernameExists = existingAdmins.some(
        (a) => a.username.toLowerCase() === formData.username.toLowerCase()
      );

      if (emailExists) {
        setError('An administrator with this email address is already registered.');
        setIsSubmitting(false);
        return;
      }

      if (usernameExists) {
        setError('This username is already taken. Please choose another username.');
        setIsSubmitting(false);
        return;
      }

      const newAdmin = {
        id: Date.now(),
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        username: formData.username.trim(),
        password: formData.password,
        role: formData.role,
        registeredAt: new Date().toISOString(),
      };

      existingAdmins.push(newAdmin);
      localStorage.setItem('edulearn_registered_admins', JSON.stringify(existingAdmins));

      setSuccess('Admin account registered successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login', { state: { registeredUsername: formData.username } });
      }, 1800);
    } catch {
      setError('Failed to save registration data to browser storage.');
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #18073d 0%, #270e54 50%, #4c1ebd 100%)',
      padding: '24px 16px',
      fontFamily: 'var(--el-font)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '520px',
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
        overflow: 'hidden'
      }}>
        {/* Top Header */}
        <div style={{
          background: 'linear-gradient(180deg, #210a52 0%, #3f107f 100%)',
          color: '#ffffff',
          padding: '28px 24px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(8px)',
            marginBottom: '12px'
          }}>
            <GraduationCap size={34} strokeWidth={2.4} color="#ffffff" />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 4px 0', letterSpacing: '-0.3px' }}>
            EduLearn CRM
          </h1>
          <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0 }}>
            Administrator Access & Registration Portal
          </p>
        </div>

        {/* Form Body */}
        <div style={{ padding: '28px 28px' }}>
          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#fef2f2',
              color: '#b91c1c',
              border: '1px solid #fecaca',
              padding: '12px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              marginBottom: '18px'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#ecfdf5',
              color: '#047857',
              border: '1px solid #a7f3d0',
              padding: '12px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              marginBottom: '18px'
            }}>
              <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                Full Name *
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  placeholder="e.g. Dr. Rajesh Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    borderRadius: '9px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13.5px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>
            </div>

            {/* Email & Phone in 2 Columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                  Email Address *
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="email"
                    placeholder="admin@domain.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '9px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13.5px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                  Phone Number *
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '9px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13.5px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Username & Role in 2 Columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                  Username *
                </label>
                <div style={{ position: 'relative' }}>
                  <UserCheck size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="text"
                    placeholder="e.g. admin_rajesh"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '9px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13.5px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                  Admin Role *
                </label>
                <div style={{ position: 'relative' }}>
                  <Shield size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '9px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13px',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      boxSizing: 'border-box'
                    }}
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '22px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                  Password *
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="password"
                    placeholder="Min. 6 chars"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '9px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13.5px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                  Confirm Password *
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '9px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13.5px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #6e34e2 0%, #4c1ebd 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '10px',
                fontSize: '14.5px',
                fontWeight: 700,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 14px rgba(110, 52, 226, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>{isSubmitting ? 'Registering Admin...' : 'Create Admin Account'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Link to Login */}
          <div style={{
            textAlign: 'center',
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid #f1f5f9',
            fontSize: '13px',
            color: '#64748b'
          }}>
            Already have an Admin account?{' '}
            <Link
              to="/login"
              style={{ color: '#6e34e2', fontWeight: 700, textDecoration: 'none' }}
            >
              Sign In to Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
