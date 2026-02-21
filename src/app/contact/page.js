'use client';

import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: '',
    });
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [feedback, setFeedback] = useState('');

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setFeedback('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong.');
            }

            setStatus('success');
            setFeedback(data.message || 'Message sent successfully!');
            setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
        } catch (err) {
            setStatus('error');
            setFeedback(err.message || 'Failed to send message. Please try again.');
        }
    };

    return (
        <div className="container mx-auto px-6 py-24 pb-40">
            <h1 className="text-5xl font-bold mb-12 text-center">
                GET IN <span className="text-red-600">TOUCH</span>
            </h1>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div>
                    <p className="text-xl text-gray-300 mb-8">For business, press, development, or investment inquiries.</p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 bg-gray-900 p-6 rounded border-l-4 border-red-600">
                            <i className="fas fa-envelope text-2xl text-red-600"></i>
                            <div>
                                <h3 className="font-bold text-sm text-gray-400 uppercase">Email</h3>
                                <p className="text-lg">official studio contact</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-gray-900 p-6 rounded border-l-4 border-white">
                            <i className="fas fa-share-alt text-2xl text-white"></i>
                            <div>
                                <h3 className="font-bold text-sm text-gray-400 uppercase">Social Media</h3>
                                <div className="flex gap-4 mt-2 text-xl">
                                    <a href="https://www.instagram.com/godaeon_studio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:text-red-600" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                    <a href="https://www.youtube.com/@GODAEON_STUDIO" className="hover:text-red-600" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-youtube"></i>
                                    </a>
                                    <a href="https://www.linkedin.com/company/godaeon-studio/" className="hover:text-red-600" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-linkedin"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 p-8 rounded border border-gray-800">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="contact-name" className="block text-sm font-bold mb-2 uppercase text-gray-400">Name</label>
                            <input
                                id="contact-name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-black border border-gray-700 p-3 text-white focus:border-red-600 outline-none transition-colors"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label htmlFor="contact-email" className="block text-sm font-bold mb-2 uppercase text-gray-400">Email</label>
                            <input
                                id="contact-email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-black border border-gray-700 p-3 text-white focus:border-red-600 outline-none transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="contact-subject" className="block text-sm font-bold mb-2 uppercase text-gray-400">Subject</label>
                            <select
                                id="contact-subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full bg-black border border-gray-700 p-3 text-white focus:border-red-600 outline-none transition-colors"
                            >
                                <option>General Inquiry</option>
                                <option>Investment / Partnership</option>
                                <option>Press</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="contact-message" className="block text-sm font-bold mb-2 uppercase text-gray-400">Message</label>
                            <textarea
                                id="contact-message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full bg-black border border-gray-700 p-3 text-white focus:border-red-600 outline-none transition-colors"
                                placeholder="Your message..."
                            ></textarea>
                        </div>

                        {/* Feedback message */}
                        {feedback && (
                            <div className={`p-4 rounded text-sm font-medium ${status === 'success'
                                    ? 'bg-green-900/40 text-green-400 border border-green-700'
                                    : 'bg-red-900/40 text-red-400 border border-red-700'
                                }`}>
                                {feedback}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-red-600 text-black font-bold py-3 uppercase tracking-widest hover:bg-white hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Sending...
                                </span>
                            ) : (
                                'Send Message'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
