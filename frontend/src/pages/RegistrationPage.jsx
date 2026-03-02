import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CyberMatrixBackground from '../components/CyberMatrixBackground';
import '../css/RegistrationForm.css';

const EVENTS = [
  'TREASURE HUNT',
  'INNOVISION 7.0',
  'GAMING ARENA',
  'HACKING EVENT',
  'MIND MAP',
  'IT QUIZ',
  'CODING SPRINT',
];

const CLASSES = [
  'BCA - Sem 1', 'BCA - Sem 2', 'BCA - Sem 3',
  'BCA - Sem 4', 'BCA - Sem 5', 'BCA - Sem 6',
  'MCA - Sem 1', 'MCA - Sem 2', 'MCA - Sem 3', 'MCA - Sem 4',
  'B.Tech - Sem 1', 'B.Tech - Sem 2', 'B.Tech - Sem 3',
  'B.Tech - Sem 4', 'B.Tech - Sem 5', 'B.Tech - Sem 6',
  'B.Tech - Sem 7', 'B.Tech - Sem 8',
  'Other',
];

const RegistrationPage = ({ theme = 'blue' }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    college: '',
    classSem: '',
    phone: '',
    email: '',
    paymentStatus: '',
    event: '',
    screenshot: null,
  });

  const [preview, setPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));

    if (name === 'paymentStatus' && value === 'unpaid') {
      setForm((prev) => ({ ...prev, screenshot: null, paymentStatus: value }));
      setPreview(null);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, screenshot: 'Please upload an image file.' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, screenshot: 'File must be under 5 MB.' }));
      return;
    }
    setForm((prev) => ({ ...prev, screenshot: file }));
    setErrors((prev) => ({ ...prev, screenshot: '' }));
    setPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.college.trim()) e.college = 'College is required.';
    if (!form.classSem) e.classSem = 'Select your class & semester.';
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit phone number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.paymentStatus) e.paymentStatus = 'Select paid or unpaid.';
    if (!form.event) e.event = 'Select an event.';
    if (form.paymentStatus === 'paid' && !form.screenshot)
      e.screenshot = 'Upload your payment screenshot.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    console.log('Registration submitted:', form);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({
      name: '', college: '', classSem: '', phone: '',
      email: '', paymentStatus: '', event: '', screenshot: null,
    });
    setPreview(null);
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="rf-wrapper">
        <CyberMatrixBackground theme={theme} />
        <motion.div
          className="rf-success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="rf-success-icon">✓</div>
          <h2 className="rf-success-title">Registration Submitted!</h2>
          <p className="rf-success-sub">
            Thank you, <strong>{form.name}</strong>. You are registered for{' '}
            <strong>{form.event}</strong>.
          </p>
          <button className="rf-btn" onClick={resetForm}>
            Register Another
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="rf-wrapper">
      <CyberMatrixBackground theme={theme} />
      <motion.div
        className="rf-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
      >
        {/* Header */}
        <div className="rf-header">
          <button type="button" className="rf-back-btn" onClick={() => navigate(-1)}>← Back</button>
          <span className="rf-badge">CYNET 2026</span>
          <h1 className="rf-title">Event Registration</h1>
          <p className="rf-subtitle">Fill in the details below to register for your event</p>
        </div>

        <form className="rf-form" onSubmit={handleSubmit} noValidate>
          {/* Row: Name + College */}
          <div className="rf-row">
            <div className="rf-field">
              <label className="rf-label" htmlFor="reg-name">
                Full Name <span className="rf-req">*</span>
              </label>
              <input
                id="reg-name" name="name" type="text"
                className={`rf-input ${errors.name ? 'rf-input--err' : ''}`}
                placeholder="Enter your full name"
                value={form.name} onChange={handleChange}
              />
              {errors.name && <span className="rf-error">{errors.name}</span>}
            </div>

            <div className="rf-field">
              <label className="rf-label" htmlFor="reg-college">
                College / Institution <span className="rf-req">*</span>
              </label>
              <input
                id="reg-college" name="college" type="text"
                className={`rf-input ${errors.college ? 'rf-input--err' : ''}`}
                placeholder="Enter your college name"
                value={form.college} onChange={handleChange}
              />
              {errors.college && <span className="rf-error">{errors.college}</span>}
            </div>
          </div>

          {/* Row: Class + Phone */}
          <div className="rf-row">
            <div className="rf-field">
              <label className="rf-label" htmlFor="reg-classSem">
                Class & Semester <span className="rf-req">*</span>
              </label>
              <select
                id="reg-classSem" name="classSem"
                className={`rf-select ${errors.classSem ? 'rf-input--err' : ''}`}
                value={form.classSem} onChange={handleChange}
              >
                <option value="" disabled>Select class & semester</option>
                {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.classSem && <span className="rf-error">{errors.classSem}</span>}
            </div>

            <div className="rf-field">
              <label className="rf-label" htmlFor="reg-phone">
                Phone Number <span className="rf-req">*</span>
              </label>
              <input
                id="reg-phone" name="phone" type="tel"
                className={`rf-input ${errors.phone ? 'rf-input--err' : ''}`}
                placeholder="10-digit mobile number"
                value={form.phone} onChange={handleChange}
                maxLength={10}
              />
              {errors.phone && <span className="rf-error">{errors.phone}</span>}
            </div>
          </div>

          {/* Row: Email + Event */}
          <div className="rf-row">
            <div className="rf-field">
              <label className="rf-label" htmlFor="reg-email">
                Email ID <span className="rf-req">*</span>
              </label>
              <input
                id="reg-email" name="email" type="email"
                className={`rf-input ${errors.email ? 'rf-input--err' : ''}`}
                placeholder="yourname@example.com"
                value={form.email} onChange={handleChange}
              />
              {errors.email && <span className="rf-error">{errors.email}</span>}
            </div>

            <div className="rf-field">
              <label className="rf-label" htmlFor="reg-event">
                Select Event <span className="rf-req">*</span>
              </label>
              <select
                id="reg-event" name="event"
                className={`rf-select ${errors.event ? 'rf-input--err' : ''}`}
                value={form.event} onChange={handleChange}
              >
                <option value="" disabled>Choose an event</option>
                {EVENTS.map((ev) => <option key={ev} value={ev}>{ev}</option>)}
              </select>
              {errors.event && <span className="rf-error">{errors.event}</span>}
            </div>
          </div>

          {/* Payment Status */}
          <div className="rf-field rf-field--full">
            <label className="rf-label">
              Payment Status <span className="rf-req">*</span>
            </label>
            <div className="rf-radio-group">
              <label className={`rf-radio-label ${form.paymentStatus === 'paid' ? 'rf-radio-label--active' : ''}`}>
                <input type="radio" name="paymentStatus" value="paid"
                  checked={form.paymentStatus === 'paid'} onChange={handleChange} />
                <span className="rf-radio-dot" />
                Paid
              </label>
              <label className={`rf-radio-label ${form.paymentStatus === 'unpaid' ? 'rf-radio-label--active' : ''}`}>
                <input type="radio" name="paymentStatus" value="unpaid"
                  checked={form.paymentStatus === 'unpaid'} onChange={handleChange} />
                <span className="rf-radio-dot" />
                Unpaid / Free Event
              </label>
            </div>
            {errors.paymentStatus && <span className="rf-error">{errors.paymentStatus}</span>}
          </div>

          {/* QR Code + Upload (only when paid) */}
          {form.paymentStatus === 'paid' && (
            <div className="rf-payment-section">
              <div className="rf-divider"><span>Payment Details</span></div>
              <div className="rf-payment-grid">
                <div className="rf-qr-block">
                  <p className="rf-label">Scan &amp; Pay</p>
                  <div className="rf-qr-frame">
                    <img
                      src="/Logo/Bugslayers.jpeg"
                      alt="Payment QR Code"
                      className="rf-qr-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="rf-qr-placeholder" style={{ display: 'none' }}>
                      <span>QR</span>
                      <small>Image not found</small>
                    </div>
                  </div>
                  <p className="rf-qr-hint">UPI / Scan to pay registration fee</p>
                </div>

                <div className="rf-field">
                  <label className="rf-label">
                    Upload Payment Screenshot <span className="rf-req">*</span>
                  </label>
                  <div
                    className={`rf-upload-zone ${errors.screenshot ? 'rf-upload-zone--err' : ''} ${preview ? 'rf-upload-zone--filled' : ''}`}
                    onClick={() => fileInputRef.current.click()}
                  >
                    {preview ? (
                      <img src={preview} alt="Payment screenshot" className="rf-upload-preview" />
                    ) : (
                      <>
                        <span className="rf-upload-icon">⬆</span>
                        <span className="rf-upload-text">Click to upload screenshot</span>
                        <span className="rf-upload-hint">JPG, PNG, WEBP – max 5 MB</span>
                      </>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file" accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFile}
                  />
                  {preview && (
                    <button
                      type="button" className="rf-remove-file"
                      onClick={() => {
                        setPreview(null);
                        setForm((p) => ({ ...p, screenshot: null }));
                        fileInputRef.current.value = '';
                      }}
                    >
                      ✕ Remove
                    </button>
                  )}
                  {errors.screenshot && <span className="rf-error">{errors.screenshot}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <button type="submit" className="rf-btn rf-btn--submit">
            Submit Registration
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegistrationPage;
