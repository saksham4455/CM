import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactForm = () => {
    const [form, setForm] = useState({
        name: '', email: '', message: '',
    });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | submitting | success

    const validate = () => {
        let newErrors = {};
        if (!form.name.trim()) newErrors.name = 'NAME_REQUIRED';
        if (!form.email.trim()) {
            newErrors.email = 'EMAIL_REQUIRED';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'INVALID_EMAIL_FORMAT';
        }
        if (!form.message.trim()) newErrors.message = 'MESSAGE_REQUIRED';

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
            setForm({ name: '', email: '', message: '' });
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
                                <h3 className="cp-success-title">MESSAGE SENT</h3>
                                <p className="cp-success-sub">WE'LL GET BACK TO YOU SHORTLY.</p>
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
                        <div className="cp-scan-text">SENDING MESSAGE...</div>
                    </div>
                )}

                <div className="cp-form-header">
                    <span className="cp-label-tag">&gt; initialize --contact</span>
                    <h2 className="cp-form-title">GET IN TOUCH</h2>
                    <p className="cp-form-sub">Send us a message and we'll get back to you.</p>
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

                    <div className={`cp-field ${errors.message ? 'cp-field--error' : ''}`}>
                        <label htmlFor="f-message">Message</label>
                        <textarea id="f-message" name="message" rows="5"
                            value={form.message} onChange={handleChange}
                            placeholder="Write your message here..." required />
                        {errors.message && <span className="cp-error-msg">{errors.message}</span>}
                    </div>

                    <button type="submit" className="cp-submit" disabled={status === 'submitting'}>
                        {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE →'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
