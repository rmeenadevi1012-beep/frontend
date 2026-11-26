import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  User,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  KeyRound
} from 'lucide-react';

function AdminLogin({ onLoginSuccess }) {
  const navigate = useNavigate();
  const location = useLocation();

  const registeredPrefill = location.state?.registeredUsername || '';

  const [identifier, setIdentifier] = useState(registeredPrefill || '');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!identifier.trim()) {
      setError('Please enter your username or registered email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const cleanIdent = identifier.trim().toLowerCase();

      // 1. Check Default Super Admin Credentials
      let matchedAdmin = null;
      if (
        (cleanIdent === 'admin' || cleanIdent === 'admin@edulearn.edu') &&
        password === 'admin123'
      ) {
        matchedAdmin = {
          id: 'admin-root',
          fullName: 'System Administrator',
          username: 'admin',
          email: 'admin@edulearn.edu',
          role: 'Super Admin',
        };
      }

      // 2. Check registered admins from localStorage
      if (!matchedAdmin) {
        try {
          const storedAdmins = JSON.parse(
            localStorage.getItem('edulearn_registered_admins') || '[]'
          );
          const found = storedAdmins.find(
            (a) =>
              (a.username.toLowerCase() === cleanIdent ||
                a.email.toLowerCase() === cleanIdent) &&
              a.password === password
          );
          if (found) {
            matchedAdmin = {
              id: found.id,
              fullName: found.fullName,
              username: found.username,
              email: found.email,
              role: found.role,
            };
          }
        } catch {
          // ignore parsing error
        }
      }

      if (matchedAdmin) {
        setSuccess('Authentication successful! Welcome to EduLearn CRM.');
        localStorage.setItem('edulearn_auth_user', JSON.stringify(matchedAdmin));
        if (onLoginSuccess) {
          onLoginSuccess(matchedAdmin);
        }
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 800);
      } else {
        setIsLoading(false);
        setError('Invalid username/email or password. Please verify your credentials.');
      }
    }, 400);
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
        maxWidth: '440px',
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
        overflow: 'hidden'
      }}>
        {/* Top Header */}
        <div style={{
          background: 'linear-gradient(180deg, #210a52 0%, #3f107f 100%)',
          color: '#ffffff',
          padding: '32px 24px 28px 24px',
          textAlign: 'center'
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
            Admin Dashboard Sign In
          </p>
        </div>

        {/* Form Body */}
        <div style={{ padding: '28px 28px' }}>
          {/* Quick Demo Credentials Pill */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '10px 14px',
            marginBottom: '18px',
            fontSize: '12px',
            color: '#475569'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#6e34e2', marginBottom: '3px' }}>
              <KeyRound size={13} />
              <span>Default Admin Demo Credentials</span>
            </div>
            <div>Username: <strong style={{ color: '#1e202e' }}>admin</strong> or <strong style={{ color: '#1e202e' }}>admin@edulearn.edu</strong></div>
            <div>Password: <strong style={{ color: '#1e202e' }}>admin123</strong></div>
          </div>

          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#fef2f2',
              color: '#b91c1c',
              border: '1px solid #fecaca',
              padding: '12px 14px',
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
              padding: '12px 14px',
              borderRadius: '10px',
              fontSize: '13px',
              marginBottom: '18px'
            }}>
              <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username / Email */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Username or Email
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  placeholder="admin or admin@edulearn.edu"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px 11px 38px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                  Password
                </label>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px 11px 38px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>
            </div>

            {/* Remember Me */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#64748b' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: '#6e34e2', width: '15px', height: '15px' }}
                />
                Remember this device
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #6e34e2 0%, #4c1ebd 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '10px',
                fontSize: '14.5px',
                fontWeight: 700,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 14px rgba(110, 52, 226, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>{isLoading ? 'Verifying Credentials...' : 'Sign In to Dashboard'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Registration Link */}
          <div style={{
            textAlign: 'center',
            marginTop: '22px',
            paddingTop: '18px',
            borderTop: '1px solid #f1f5f9',
            fontSize: '13px',
            color: '#64748b'
          }}>
            Need to register a new admin?{' '}
            <Link
              to="/register"
              style={{ color: '#6e34e2', fontWeight: 700, textDecoration: 'none' }}
            >
              Register Admin Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
