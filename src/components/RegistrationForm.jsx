import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RegistrationForm = () => {
    const [form, setForm] = useState({
        name: '', email: '', phone: '', branch: '', year: '', message: '',
    });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | submitting | success

    const validate = () => {
        let newErrors = {};
        if (!form.name.trim()) newErrors.name = 'SUBJECT_NAME_REQUIRED';
        if (!form.email.trim()) {
            newErrors.email = 'VOX_NODE_REQUIRED';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'INVALID_ENCRYPTION_FORMAT';
        }
        if (form.phone && !/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'SIGNAL_LINK_INVALID';
        }
        if (!form.year) newErrors.year = 'TEMPORAL_MARKER_MISSING';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => {
                const updated = { ...prev };
                delete updated[name];
                return updated;
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus('submitting');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setForm({ name: '', email: '', phone: '', branch: '', year: '', message: '' });
            setErrors({});
            setTimeout(() => setStatus('idle'), 5000);
        }, 2500);
    };

    return (
        <div className={`cp-form-container ${status === 'success' ? 'cp-form--success' : ''}`}>
            {/* Corner Decorators */}
            <div className="cp-corner cp-tl"></div>
            <div className="cp-corner cp-tr"></div>
            <div className="cp-corner cp-bl"></div>
            <div className="cp-corner cp-br"></div>

            <div className="cp-form-wrap">
                <AnimatePresence>
                    {status === 'success' && (
                        <motion.div
                            className="cp-success-overlay"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="cp-success-content">
                                <div className="cp-success-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <h3 className="cp-success-title">ACCESS GRANTED</h3>
                                <p className="cp-success-sub">IDENTIFIER SECURED IN THE CYNET ARCHIVE.</p>
                                <div className="cp-success-line" />
                                <button onClick={() => setStatus('idle')} className="cp-success-btn">DISMISS</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {status === 'submitting' && (
                    <div className="cp-scanning-container">
                        <motion.div
                            className="cp-scan-bar"
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        />
                        <div className="cp-scan-text">SCANNING DATA PACKETS...</div>
                    </div>
                )}

                <div className="cp-form-header">
                    <span className="cp-label-tag">&gt; initialize --registration</span>
                    <h2 className="cp-form-title">JOIN THE MATRIX</h2>
                    <p className="cp-form-sub">Secure your identifier for the next CYNET event.</p>
                </div>

                <form onSubmit={handleSubmit} className="cp-form" noValidate>
                    <div className="cp-form-row">
                        <div className={`cp-field ${errors.name ? 'cp-field--error' : ''}`}>
                            <label htmlFor="f-name">Full Name</label>
                            <input id="f-name" type="text" name="name"
                                value={form.name} onChange={handleChange}
                                placeholder="Your full name" required />
                            {errors.name && <span className="cp-error-msg">{errors.name}</span>}
                        </div>
                        <div className={`cp-field ${errors.email ? 'cp-field--error' : ''}`}>
                            <label htmlFor="f-email">Email Address</label>
                            <input id="f-email" type="email" name="email"
                                value={form.email} onChange={handleChange}
                                placeholder="your@email.com" required />
                            {errors.email && <span className="cp-error-msg">{errors.email}</span>}
                        </div>
                    </div>

                    <div className="cp-form-row">
                        <div className={`cp-field ${errors.phone ? 'cp-field--error' : ''}`}>
                            <label htmlFor="f-phone">Phone Number</label>
                            <input id="f-phone" type="tel" name="phone"
                                value={form.phone} onChange={handleChange}
                                placeholder="+91 XXXXX XXXXX" />
                            {errors.phone && <span className="cp-error-msg">{errors.phone}</span>}
                        </div>
                        <div className="cp-field">
                            <label htmlFor="f-branch">Branch / Department</label>
                            <div className="cp-select-wrapper">
                                <select id="f-branch" name="branch" value={form.branch} onChange={handleChange}>
                                    <option value="">-- ALL NODES --</option>
                                    <option value="IT">BCA [Information Technology]</option>
                                    <option value="BBA">BBA [Management]</option>
                                    <option value="BAJMC">BAJMC [Journalism ]</option>
                                    <option value="OTHER">OTHER [External Branch]</option>
                                </select>
                                <div className="cp-select-arrow" />
                            </div>
                        </div>
                    </div>

                    <div className={`cp-field ${errors.year ? 'cp-field--error' : ''}`}>
                        <label htmlFor="f-year">Year of Study / Level</label>
                        <div className="cp-select-wrapper">
                            <select
                                id="f-year"
                                name="year"
                                value={form.year}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>-- SELECT RADIUS --</option>
                                <option value="1M">1st Year [Morning Shift]</option>
                                <option value="1E">1st Year [Evening Shift]</option>
                                <option value="2M">2nd Year [Morning Shift]</option>
                                <option value="2E">2nd Year [Evening Shift]</option>
                                <option value="3M">3rd Year [Morning Shift]</option>
                                <option value="3E">3rd Year [Evening Shift]</option>
                            </select>
                            <div className="cp-select-arrow" />
                        </div>
                        {errors.year && <span className="cp-error-msg">{errors.year}</span>}
                    </div>

                    <div className="cp-field">
                        <label htmlFor="f-message">Message / Query</label>
                        <textarea id="f-message" name="message" rows="5"
                            value={form.message} onChange={handleChange}
                            placeholder="Any specific questions..." />
                    </div>

                    <button type="submit" className="cp-submit" disabled={status === 'submitting'}>
                        {status === 'submitting' ? 'UPLOADING...' : 'INITIALIZE REGISTRATION →'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
