import React, { useState, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CyberMatrixBackground from '../components/CyberMatrixBackground';
import '../css/RegistrationForm.css';

const EVENTS = [
  { id: 'TREASURE_HUNT', name: 'TREASURE HUNT', price: 100 },
  { id: 'INNOVISION', name: 'INNOVISION 7.0', price: 0 },
  { id: 'GAMING_ARENA', name: 'GAMING ARENA', price: 0 },
  { id: 'HACKING_EVENT', name: 'SHADOW CODE', price: 0 },
  { id: 'MIND_MATRIX', name: 'MIND MATRIX', price: 0 },
  { id: 'TECH_UNSEEN', name: 'TECH UNSEEN', price: 0 },
];

const GAMING_EVENTS = [
  { id: 'valorant', name: 'Valorant', icon: '🎯', price: 500, format: '5v5' },
  { id: 'tekken7', name: 'Tekken 7', icon: '🥊', price: 200, format: '1v1' },
  { id: 'bgmi', name: 'BGMI', icon: '🔫', price: 400, format: '4-Squad' },
  { id: 'stumble', name: 'Stumble Guys', icon: '🏃', price: 150, format: 'FFA' },
  { id: 'smashkarts', name: 'SmashKarts', icon: '🏎️', price: 150, format: 'FFA' },
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
  const [searchParams] = useSearchParams();
  const preSelectedEvent = searchParams.get('event') || '';
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    college: '',
    classSem: '',
    phone: '',
    email: '',
    paymentStatus: '',
    screenshot: null,
  });

  const [selectedEvents, setSelectedEvents] = useState(() => {
    const initial = new Set();
    EVENTS.forEach(ev => {
      if (ev.name === preSelectedEvent) initial.add(ev.id);
    });
    return initial;
  });

  const [selectedGames, setSelectedGames] = useState(new Set());
  const [showGamingPopup, setShowGamingPopup] = useState(false);
  const [preview, setPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');

  // Calculate total payment
  const totalPayment = useMemo(() => {
    let total = 0;
    // Treasure Hunt fixed price
    if (selectedEvents.has('TREASURE_HUNT')) {
      total += EVENTS.find(e => e.id === 'TREASURE_HUNT').price;
    }
    // Gaming sub-events pricing
    if (selectedEvents.has('GAMING_ARENA')) {
      selectedGames.forEach(gameId => {
        const game = GAMING_EVENTS.find(g => g.id === gameId);
        if (game) total += game.price;
      });
    }
    return total;
  }, [selectedEvents, selectedGames]);

  const needsPayment = totalPayment > 0;

  const toggleEvent = (eventId) => {
    setSelectedEvents(prev => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
        if (eventId === 'GAMING_ARENA') {
          setSelectedGames(new Set());
          setShowGamingPopup(false);
        }
      } else {
        next.add(eventId);
        if (eventId === 'GAMING_ARENA') {
          setShowGamingPopup(true);
        }
      }
      return next;
    });
    setErrors(prev => ({ ...prev, events: '' }));
  };

  const toggleGame = (gameId) => {
    setSelectedGames(prev => {
      const next = new Set(prev);
      if (next.has(gameId)) next.delete(gameId);
      else next.add(gameId);
      return next;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    if (name === 'paymentStatus' && value === 'unpaid') {
      setForm(prev => ({ ...prev, screenshot: null, paymentStatus: value }));
      setPreview(null);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, screenshot: 'Please upload an image file.' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, screenshot: 'File must be under 5 MB.' }));
      return;
    }
    setForm(prev => ({ ...prev, screenshot: file }));
    setErrors(prev => ({ ...prev, screenshot: '' }));
    setPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.college.trim()) e.college = 'College is required.';
    if (!form.classSem) e.classSem = 'Select your class & semester.';
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit phone number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (selectedEvents.size === 0) e.events = 'Select at least one event.';
    if (selectedEvents.has('GAMING_ARENA') && selectedGames.size === 0) {
      e.games = 'Select at least one game from Gaming Arena.';
    }
    if (needsPayment) {
      if (!form.paymentStatus) e.paymentStatus = 'Select paid or unpaid.';
      if (form.paymentStatus === 'paid' && !form.screenshot)
        e.screenshot = 'Upload your payment screenshot.';
    }
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setNotice('Registration is coming soon. Please check back shortly.');
    setSubmitted(false);
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({ name: '', college: '', classSem: '', phone: '', email: '', paymentStatus: '', screenshot: null });
    setSelectedEvents(new Set());
    setSelectedGames(new Set());
    setPreview(null);
    setErrors({});
  };

  const getSelectedEventNames = () => {
    return EVENTS.filter(e => selectedEvents.has(e.id)).map(e => e.name).join(', ');
  };

  if (submitted) {
    return (
      <div className="rf-wrapper">
        <CyberMatrixBackground theme={theme} />
        <motion.div className="rf-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          <div className="rf-success-icon">✓</div>
          <h2 className="rf-success-title">Registration Submitted!</h2>
          <p className="rf-success-sub">
            Thank you, <strong>{form.name}</strong>. You are registered for <strong>{getSelectedEventNames()}</strong>.
          </p>
          <button className="rf-btn" onClick={resetForm}>Register Another</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="rf-wrapper">
      <CyberMatrixBackground theme={theme} />
      <motion.div className="rf-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}>
        {/* Header */}
        <div className="rf-header">
          <button type="button" className="rf-back-btn" onClick={() => navigate(-1)}>← Back</button>
          <span className="rf-badge">CYNET 2026</span>
          <h1 className="rf-title">Event Registration</h1>
          <p className="rf-subtitle">Fill in the details below to register for events</p>
        </div>

        <form className="rf-form" onSubmit={handleSubmit} noValidate>
          {/* Row: Name + College */}
          <div className="rf-row">
            <div className="rf-field">
              <label className="rf-label" htmlFor="reg-name">Full Name <span className="rf-req">*</span></label>
              <input id="reg-name" name="name" type="text" className={`rf-input ${errors.name ? 'rf-input--err' : ''}`}
                placeholder="Enter your full name" value={form.name} onChange={handleChange} />
              {errors.name && <span className="rf-error">{errors.name}</span>}
            </div>
            <div className="rf-field">
              <label className="rf-label" htmlFor="reg-college">College / Institution <span className="rf-req">*</span></label>
              <input id="reg-college" name="college" type="text" className={`rf-input ${errors.college ? 'rf-input--err' : ''}`}
                placeholder="Enter your college name" value={form.college} onChange={handleChange} />
              {errors.college && <span className="rf-error">{errors.college}</span>}
            </div>
          </div>

          {/* Row: Class + Phone */}
          <div className="rf-row">
            <div className="rf-field">
              <label className="rf-label" htmlFor="reg-classSem">Class & Semester <span className="rf-req">*</span></label>
              <select id="reg-classSem" name="classSem" className={`rf-select ${errors.classSem ? 'rf-input--err' : ''}`}
                value={form.classSem} onChange={handleChange}>
                <option value="" disabled>Select class & semester</option>
                {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.classSem && <span className="rf-error">{errors.classSem}</span>}
            </div>
            <div className="rf-field">
              <label className="rf-label" htmlFor="reg-phone">Phone Number <span className="rf-req">*</span></label>
              <input id="reg-phone" name="phone" type="tel" className={`rf-input ${errors.phone ? 'rf-input--err' : ''}`}
                placeholder="10-digit mobile number" value={form.phone} onChange={handleChange} maxLength={10} />
              {errors.phone && <span className="rf-error">{errors.phone}</span>}
            </div>
          </div>

          {/* Email */}
          <div className="rf-field rf-field--full">
            <label className="rf-label" htmlFor="reg-email">Email ID <span className="rf-req">*</span></label>
            <input id="reg-email" name="email" type="email" className={`rf-input ${errors.email ? 'rf-input--err' : ''}`}
              placeholder="yourname@example.com" value={form.email} onChange={handleChange} />
            {errors.email && <span className="rf-error">{errors.email}</span>}
          </div>

          {/* ── EVENT CHECKBOXES ── */}
          <div className="rf-field rf-field--full">
            <label className="rf-label">Select Events <span className="rf-req">*</span></label>
            <div className="rf-events-grid">
              {EVENTS.map(ev => (
                <label
                  key={ev.id}
                  className={`rf-event-checkbox ${selectedEvents.has(ev.id) ? 'rf-event-checkbox--active' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedEvents.has(ev.id)}
                    onChange={() => toggleEvent(ev.id)}
                  />
                  <span className="rf-event-check-icon">{selectedEvents.has(ev.id) ? '☑' : '☐'}</span>
                  <span className="rf-event-name">{ev.name}</span>
                  {ev.price > 0 && <span className="rf-event-price">₹{ev.price}</span>}
                  {ev.id === 'GAMING_ARENA' && <span className="rf-event-price rf-event-price--sub">select games ↓</span>}
                </label>
              ))}
            </div>
            {errors.events && <span className="rf-error">{errors.events}</span>}
          </div>

          {/* Gaming popup rendered via portal – see bottom of return */}

          {/* Show selected games inline */}
          {selectedEvents.has('GAMING_ARENA') && selectedGames.size > 0 && (
            <div className="rf-field rf-field--full">
              <div className="rf-selected-games">
                {[...selectedGames].map(gId => {
                  const g = GAMING_EVENTS.find(x => x.id === gId);
                  return g ? (
                    <span key={gId} className="rf-game-tag">
                      {g.icon} {g.name} — ₹{g.price}
                      <button type="button" className="rf-game-tag-remove" onClick={() => toggleGame(gId)}>×</button>
                    </span>
                  ) : null;
                })}
                <button type="button" className="rf-add-game-btn" onClick={() => setShowGamingPopup(true)}>+ Add more</button>
              </div>
            </div>
          )}

          {/* ── TOTAL PAYMENT ── */}
          {needsPayment && (
            <div className="rf-total-payment">
              <div className="rf-total-payment-inner">
                <span className="rf-total-label">TOTAL PAYABLE</span>
                <span className="rf-total-amount">₹{totalPayment}</span>
              </div>
              <div className="rf-total-breakdown">
                {selectedEvents.has('TREASURE_HUNT') && (
                  <span className="rf-breakdown-item">Treasure Hunt: ₹100</span>
                )}
                {selectedEvents.has('GAMING_ARENA') && [...selectedGames].map(gId => {
                  const g = GAMING_EVENTS.find(x => x.id === gId);
                  return g ? <span key={gId} className="rf-breakdown-item">{g.name}: ₹{g.price}</span> : null;
                })}
              </div>
            </div>
          )}

          {/* Payment Status (only when total > 0) */}
          {needsPayment && (
            <div className="rf-field rf-field--full">
              <label className="rf-label">Payment Status <span className="rf-req">*</span></label>
              <div className="rf-radio-group">
                <label className={`rf-radio-label ${form.paymentStatus === 'paid' ? 'rf-radio-label--active' : ''}`}>
                  <input type="radio" name="paymentStatus" value="paid" checked={form.paymentStatus === 'paid'} onChange={handleChange} />
                  <span className="rf-radio-dot" /> Paid
                </label>
                <label className={`rf-radio-label ${form.paymentStatus === 'unpaid' ? 'rf-radio-label--active' : ''}`}>
                  <input type="radio" name="paymentStatus" value="unpaid" checked={form.paymentStatus === 'unpaid'} onChange={handleChange} />
                  <span className="rf-radio-dot" /> Unpaid
                </label>
              </div>
              {errors.paymentStatus && <span className="rf-error">{errors.paymentStatus}</span>}
            </div>
          )}

          {/* QR Code + Upload (only when paid) */}
          {needsPayment && form.paymentStatus === 'paid' && (
            <div className="rf-payment-section">
              <div className="rf-divider"><span>Payment Details — ₹{totalPayment}</span></div>
              <div className="rf-payment-grid">
                <div className="rf-qr-block">
                  <p className="rf-label">Scan &amp; Pay</p>
                  <div className="rf-qr-frame">
                    <img src="/Logo/Buglsayers.png" alt="Payment QR Code" className="rf-qr-img"
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                    <div className="rf-qr-placeholder" style={{ display: 'none' }}>
                      <span>QR</span><small>Image not found</small>
                    </div>
                  </div>
                  <p className="rf-qr-hint">UPI / Scan to pay ₹{totalPayment}</p>
                </div>
                <div className="rf-field">
                  <label className="rf-label">Upload Payment Screenshot <span className="rf-req">*</span></label>
                  <div className={`rf-upload-zone ${errors.screenshot ? 'rf-upload-zone--err' : ''} ${preview ? 'rf-upload-zone--filled' : ''}`}
                    onClick={() => fileInputRef.current.click()}>
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
                  <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
                  {preview && (
                    <button type="button" className="rf-remove-file" onClick={() => {
                      setPreview(null);
                      setForm(p => ({ ...p, screenshot: null }));
                      fileInputRef.current.value = '';
                    }}>✕ Remove</button>
                  )}
                  {errors.screenshot && <span className="rf-error">{errors.screenshot}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="rf-submit-row">
            <button type="submit" className="rf-btn rf-btn--submit">Submit Registration</button>
            {notice && <p className="rf-notice" role="status">{notice}</p>}
          </div>
        </form>
      </motion.div>

      {/* ── GAMING ARENA POPUP (portal to body so it's above navbar) ── */}
      {ReactDOM.createPortal(
        <AnimatePresence>
          {selectedEvents.has('GAMING_ARENA') && showGamingPopup && (
            <motion.div
              className="rf-gaming-popup-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGamingPopup(false)}
            >
              <motion.div
                className="rf-gaming-popup"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="rf-gaming-popup-header">
                  <h3>🎮 Select Games</h3>
                  <button type="button" className="rf-gaming-popup-close" onClick={() => setShowGamingPopup(false)}>×</button>
                </div>
                <div className="rf-gaming-list">
                  {GAMING_EVENTS.map(game => (
                    <label
                      key={game.id}
                      className={`rf-game-item ${selectedGames.has(game.id) ? 'rf-game-item--active' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedGames.has(game.id)}
                        onChange={() => toggleGame(game.id)}
                      />
                      <span className="rf-game-icon">{game.icon}</span>
                      <div className="rf-game-info">
                        <span className="rf-game-name">{game.name}</span>
                        <span className="rf-game-format">{game.format}</span>
                      </div>
                      <span className="rf-game-price">₹{game.price}</span>
                    </label>
                  ))}
                </div>
                {errors.games && <span className="rf-error" style={{ padding: '0 1rem 1rem' }}>{errors.games}</span>}
                <button type="button" className="rf-gaming-done-btn" onClick={() => setShowGamingPopup(false)}>
                  Done ({selectedGames.size} selected)
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default RegistrationPage;
