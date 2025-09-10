import React, { useState, useRef, useEffect } from "react";
import { Phone, Mail, MapPin, Building, Clock, Award } from "lucide-react";
import apiService from "../services/api";
const useScrollAnimation = (delay = 0) => {
  const elementRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("animate-in");
          }, delay);
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [delay]);

  return elementRef;
};

const BackgroundElements = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Organic flowing shapes */}
    <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-emerald-500/10 to-teal-500/8 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-500/8 to-emerald-600/6 rounded-full blur-3xl"></div>
    <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-r from-teal-400/6 to-green-400/4 rounded-full blur-2xl"></div>
    
    {/* Geometric patterns */}
    <div className="absolute inset-0 opacity-5" style={{
      backgroundImage: `radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                       radial-gradient(circle at 75% 75%, rgba(20, 184, 166, 0.1) 1px, transparent 1px)`,
      backgroundSize: '60px 60px'
    }}></div>
  </div>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    company: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState("");

  const heroRef = useScrollAnimation(0);
  const formRef = useScrollAnimation(200);
  const infoRef = useScrollAnimation(400);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error("Please fill in all required fields.");
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address.");
      }

      // Send form data to API
      await apiService.submitContactForm(formData);
      
      // Success - show confirmation
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        phone: "",
        company: "",
      });
    } catch (error) {
      // Handle errors
      setError(error.message || "Failed to send message. Please try again.");
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-transition">
      {/* Hero Section - Forest Green Gradient */}
      <section className="min-h-[75vh] flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-teal-700">
        <BackgroundElements />
        
        {/* Animated mesh background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%),
                             linear-gradient(-45deg, rgba(255,255,255,0.05) 25%, transparent 25%),
                             linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.05) 75%),
                             linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.05) 75%)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px'
          }}></div>
        </div>

        <div
          ref={heroRef}
          className="relative z-20 max-w-5xl mx-auto px-6 text-center opacity-0 transform translate-y-10 transition-all duration-700"
          style={{
            animation: 'fadeInUp 0.8s ease-out forwards'
          }}
        >
          {/* Hexagonal icon container */}
          <div className="relative mx-auto mb-8 w-24 h-24">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-2xl rotate-45 shadow-2xl"></div>
            <div className="absolute inset-2 bg-green-900 rounded-xl rotate-45 flex items-center justify-center">
              <Building className="w-8 h-8 text-teal-300 -rotate-45" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-tight text-white mb-6">
            Let's Create
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300 font-normal">
              Something Great
            </span>
          </h1>
          
          {/* Animated underline */}
          <div className="relative mx-auto w-32 h-1 mb-8 overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-400 animate-pulse"></div>
          </div>
          
          <p className="max-w-3xl mx-auto text-green-100 text-xl font-light leading-relaxed">
            Partner with our engineering experts to transform your industrial vision into reality. 
            Every great project starts with a conversation.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section - Clean mint background */}
      <section className="py-32 bg-gradient-to-b from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
              <span className="text-emerald-700 text-sm font-medium tracking-wider uppercase">Ready to Connect</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              Start the Conversation
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form - Takes more space */}
            <div
              ref={formRef}
              className="lg:col-span-3 opacity-0 transform translate-y-10 transition-all duration-700"
              style={{
                animation: 'fadeInUp 0.8s ease-out 0.2s forwards'
              }}
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100 p-12 relative overflow-hidden">
                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100/50 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-100/50 to-transparent rounded-tr-full"></div>
                
                <div className="relative z-10">
                  <div className="mb-10">
                    <h3 className="text-3xl font-light text-slate-900 mb-4">
                      Tell Us About Your Project
                    </h3>
                    <p className="text-slate-600 font-light text-lg">
                      Share your requirements and let's explore how we can help bring your vision to life.
                    </p>
                    <div className="w-16 h-px bg-emerald-500 mt-6"></div>
                  </div>

                  {submitted ? (
                    <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-10 text-center">
                      <div className="w-20 h-20 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <h4 className="text-2xl font-medium text-emerald-900 mb-3">Message Received!</h4>
                      <p className="text-emerald-700 text-lg">Thank you for reaching out. We'll respond within 24 hours with next steps.</p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      {error && (
                        <div className="bg-red-50 border-2 border-red-200 p-6 rounded-2xl text-red-700 mb-8">
                          {error}
                        </div>
                      )}

                      {/* Form Fields */}
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {[
                            { field: 'name', label: 'Full Name', type: 'text', required: true },
                            { field: 'email', label: 'Email Address', type: 'email', required: true }
                          ].map(({ field, label, type, required }) => (
                            <div key={field} className="relative group">
                              <input
                                type={type}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                onFocus={() => setFocusedField(field)}
                                onBlur={() => setFocusedField('')}
                                className={`w-full border-2 rounded-2xl px-6 py-4 text-slate-900 placeholder-transparent focus:outline-none transition-all duration-300 ${
                                  focusedField === field || formData[field]
                                    ? 'border-emerald-400 ring-4 ring-emerald-100 bg-emerald-50/30'
                                    : 'border-slate-200 hover:border-slate-300 bg-white'
                                }`}
                                placeholder="."
                                required={required}
                              />
                              <label
                                className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                                  focusedField === field || formData[field]
                                    ? '-top-3 text-sm text-emerald-600 bg-white px-2 font-medium'
                                    : 'top-4 text-slate-500 text-lg'
                                }`}
                              >
                                {label}{required && ' *'}
                              </label>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {[
                            { field: 'phone', label: 'Phone Number', type: 'tel', required: false },
                            { field: 'company', label: 'Company Name', type: 'text', required: false }
                          ].map(({ field, label, type, required }) => (
                            <div key={field} className="relative group">
                              <input
                                type={type}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                onFocus={() => setFocusedField(field)}
                                onBlur={() => setFocusedField('')}
                                className={`w-full border-2 rounded-2xl px-6 py-4 text-slate-900 placeholder-transparent focus:outline-none transition-all duration-300 ${
                                  focusedField === field || formData[field]
                                    ? 'border-emerald-400 ring-4 ring-emerald-100 bg-emerald-50/30'
                                    : 'border-slate-200 hover:border-slate-300 bg-white'
                                }`}
                                placeholder="."
                                required={required}
                              />
                              <label
                                className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                                  focusedField === field || formData[field]
                                    ? '-top-3 text-sm text-emerald-600 bg-white px-2 font-medium'
                                    : 'top-4 text-slate-500 text-lg'
                                }`}
                              >
                                {label}
                              </label>
                            </div>
                          ))}
                        </div>

                        <div className="relative group">
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('subject')}
                            onBlur={() => setFocusedField('')}
                            className={`w-full border-2 rounded-2xl px-6 py-4 text-slate-900 placeholder-transparent focus:outline-none transition-all duration-300 ${
                              focusedField === 'subject' || formData.subject
                                ? 'border-emerald-400 ring-4 ring-emerald-100 bg-emerald-50/30'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                            placeholder="."
                            required
                          />
                          <label
                            className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                              focusedField === 'subject' || formData.subject
                                ? '-top-3 text-sm text-emerald-600 bg-white px-2 font-medium'
                                : 'top-4 text-slate-500 text-lg'
                            }`}
                          >
                            Project Subject *
                          </label>
                        </div>

                        <div className="relative group">
                          <textarea
                            name="message"
                            rows="6"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField('')}
                            placeholder="."
                            required
                            className={`w-full border-2 rounded-2xl px-6 py-4 text-slate-900 placeholder-transparent focus:outline-none resize-none transition-all duration-300 ${
                              focusedField === 'message' || formData.message
                                ? 'border-emerald-400 ring-4 ring-emerald-100 bg-emerald-50/30'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          />
                          <label
                            className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                              focusedField === 'message' || formData.message
                                ? '-top-3 text-sm text-emerald-600 bg-white px-2 font-medium'
                                : 'top-4 text-slate-500 text-lg'
                            }`}
                          >
                            Project Details & Requirements *
                          </label>
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium text-lg rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                          {loading ? (
                            <span className="flex items-center justify-center space-x-3">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Sending Message...</span>
                            </span>
                          ) : (
                            "Send Message"
                          )}
                        </button>

                        <p className="text-sm text-slate-500 text-center">
                          Your privacy is important to us. All information is kept confidential.
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Info - Sidebar */}
            <div
              ref={infoRef}
              className="lg:col-span-2 space-y-8 opacity-0 transform translate-y-10 transition-all duration-700"
              style={{
                animation: 'fadeInUp 0.8s ease-out 0.4s forwards'
              }}
            >
              {[
                {
                  title: "Visit Us",
                  icon: <MapPin className="w-6 h-6 text-emerald-600" />,
                  items: [
                    "16-A, Mahaveer Colony",
                    "Hiran Magri, Sector-4", 
                    "Udaipur 313002, Rajasthan"
                  ]
                },
                {
                  title: "Reach Out",
                  icon: <Phone className="w-6 h-6 text-emerald-600" />,
                  items: [
                    "+91 7597115533",
                    "+91 9351138396",
                    "paresh_udr@yahoo.co.in"
                  ]
                },
                {
                  title: "Open Hours",
                  icon: <Clock className="w-6 h-6 text-emerald-600" />,
                  items: [
                    "Mon-Fri: 9AM - 6PM",
                    "Saturday: 10AM - 4PM",
                    "Sunday: Closed"
                  ]
                }
              ].map(({ title, icon, items }, idx) => (
                <div
                  key={idx}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-8 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                      {icon}
                    </div>
                    <h4 className="text-xl font-light text-slate-900 group-hover:text-emerald-700 transition-colors">{title}</h4>
                  </div>
                  <div className="space-y-2">
                    {items.map((item, i) => (
                      <p key={i} className="text-slate-600 font-light leading-relaxed">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Why Choose Us Card */}
              <div className="bg-gradient-to-br from-emerald-700 to-teal-800 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-6">
                    <Award className="w-7 h-7 text-emerald-200" />
                    <h4 className="text-xl font-medium">Excellence Delivered</h4>
                  </div>
                  <ul className="space-y-3 text-emerald-100">
                    <li className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full"></div>
                      <span>16+ years proven expertise</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full"></div>
                      <span>ISO certified quality systems</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full"></div>
                      <span>24/7 support & maintenance</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full"></div>
                      <span>Competitive & transparent pricing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
