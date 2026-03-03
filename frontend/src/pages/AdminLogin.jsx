import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CyberMatrixBackground from '../components/CyberMatrixBackground';
import '../css/AdminLogin.css';

const api = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username.trim() || !form.password.trim()) {
      setError('ALL FIELDS ARE REQUIRED');
      return;
    }

    setLoading(true);
    const res = await fetch(`${api}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: form.username,
        password: form.password
      })
    })
    .then((response) => {
      if (response.status === 200) {
        sessionStorage.setItem('cynet-admin-auth', 'true');
        navigate('/admin');
      } else {
        setError('ACCESS DENIED — INVALID CREDENTIALS');
      }
    })
    // Simulate auth delay
    // setTimeout(() => {
    //   if (form.username === ADMIN_USER && form.password === ADMIN_PASS) {
    //     sessionStorage.setItem('cynet-admin-auth', 'true');
    //     if (onLogin) onLogin();
    //     navigate('/admin');
    //   } else {
    //     setError('ACCESS DENIED — INVALID CREDENTIALS');
    //   }
    //   setLoading(false);
    // }, 1200);
  };

  return (
    <div className="al-page">
      {/* <CyberMatrixBackground theme={theme} /> */}

      <motion.div
        className="al-card"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
      >
        {/* Corners */}
        <span className="al-corner al-tl" />
        <span className="al-corner al-tr" />
        <span className="al-corner al-bl" />
        <span className="al-corner al-br" />

        {/* Header */}
        <div className="al-header">
          <div className="al-lock-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <span className="al-badge">&gt; SECURE ACCESS</span>
          <h1 className="al-title">ADMIN LOGIN</h1>
          <p className="al-subtitle">Authorized personnel only</p>
        </div>

        {/* Scan bar while loading */}
        {loading && (
          <motion.div
            className="al-scan-bar"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        )}

        {/* Form */}
        <form className="al-form" onSubmit={handleSubmit} noValidate>
          <div className="al-field">
            <label className="al-label" htmlFor="al-user">Username</label>
            <input
              id="al-user"
              name="username"
              type="text"
              className="al-input"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              disabled={loading}
            />
          </div>

          <div className="al-field">
            <label className="al-label" htmlFor="al-pass">Password</label>
            <input
              id="al-pass"
              name="password"
              type="password"
              className="al-input"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          {error && (
            <motion.div
              className="al-error"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="al-error-icon">⚠</span> {error}
            </motion.div>
          )}

          <button type="submit" className="al-btn" disabled={loading}>
            {loading ? 'AUTHENTICATING...' : 'ACCESS SYSTEM →'}
          </button>
        </form>

        <div className="al-footer">
          <span>🔒 E2E ENCRYPTED</span>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
