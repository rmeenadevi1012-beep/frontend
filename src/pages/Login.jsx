import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@littlechamps.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setIsError(true);
      setStatusMsg('Please provide both email address and password.');
      return;
    }

    setIsError(false);
    setStatusMsg('Authentication successful! Directing to Little Champs CRM Dashboard...');
    if (onLoginSuccess) {
      onLoginSuccess();
    }
    setTimeout(() => {
      navigate('/');
    }, 800);
  };

  const handleQuickDemoLogin = () => {
    setEmail('admin@littlechamps.edu');
    setPassword('Admin@12345');
    setIsError(false);
    setStatusMsg('Demo credentials applied! Signing into CRM Dashboard...');
    if (onLoginSuccess) {
      onLoginSuccess();
    }
    setTimeout(() => {
      navigate('/');
    }, 700);
  };

  return (
    <div className="crm-login-page">
      <div className="crm-login-card">
        {/* Brand Header */}
        <div className="crm-login-header">
          <div className="crm-login-logo">
            <GraduationCap size={36} color="#ffffff" />
          </div>
          <h2 className="crm-login-school">Little Champs Kids School</h2>
          <span className="crm-login-sub">CRM Admin Panel Login</span>
        </div>

        {statusMsg && (
          <div className={`crm-login-alert ${isError ? 'danger' : 'success'}`}>
            {isError ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            <span>{statusMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="crm-login-form">
          <div className="crm-form-group">
            <label className="crm-label">Admin Email Address</label>
            <div className="crm-input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                required
                className="crm-input"
                placeholder="admin@littlechamps.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="crm-form-group">
            <label className="crm-label">Admin Password</label>
            <div className="crm-input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                required
                className="crm-input"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="crm-login-options">
            <label className="crm-checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember this session</span>
            </label>
            <a
              href="#forgot"
              className="crm-forgot-link"
              onClick={(e) => {
                e.preventDefault();
                alert('Password reset link sent to admin@littlechamps.edu');
              }}
            >
              Forgot password?
            </a>
          </div>

          <button type="submit" className="crm-btn-primary full-width large">
            <span>Sign In to CRM</span>
            <ArrowRight size={18} />
          </button>

          <div className="crm-login-divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="crm-btn-secondary full-width"
            onClick={handleQuickDemoLogin}
          >
            <ShieldCheck size={18} />
            <span>One-Click Administrator Demo Access</span>
          </button>
        </form>

        <div className="crm-login-footer">
          <p>© 2026 Little Champs Kids School. All data securely synchronized.</p>
        </div>
      </div>
    </div>
  );
}
