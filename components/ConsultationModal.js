'use client'

import { useState } from 'react';
import { X } from 'lucide-react';

export default function ConsultationModal({ isOpen, onClose, preselectedTopic = '' }) {
  const [formData, setFormData] = useState({
    consultation_type: '',
    topic: preselectedTopic,
    preferred_date: '',
    preferred_time: '',
    budget_range: '',
    notes: '',
    full_name: '',
    email: '',
    phone: '',
    consent_consultation: false,
    consent_marketing: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const consultationTypes = ['Phone Call', 'WhatsApp Call', 'Office Meeting', 'Video Call'];
  const topics = ['Buying a Property', 'Selling a Property', 'Investing in Dubai', 'Renting / Leasing', 'Other'];
  const timeWindows = ['Morning (9–12)', 'Afternoon (12–5)', 'Evening (5–8)'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.consultation_type) {
      newErrors.consultation_type = 'Please choose how youd like us to contact you.';
    }
    if (!formData.topic) {
      newErrors.topic = 'Please select what you need help with.';
    }
    if (!formData.preferred_date) {
      newErrors.preferred_date = 'Please select a preferred date.';
    }
    if (!formData.preferred_time) {
      newErrors.preferred_time = 'Please select a preferred time.';
    }
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Please enter your full name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your mobile number.';
    } else if (!/^[\d\s+\-()]{8,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.consent_consultation) {
      newErrors.consent_consultation = 'Please agree to be contacted.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/consultations/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'Website – Book a Consultation',
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setFormData({
            consultation_type: '',
            topic: preselectedTopic,
            preferred_date: '',
            preferred_time: '',
            budget_range: '',
            notes: '',
            full_name: '',
            email: '',
            phone: '',
            consent_consultation: false,
            consent_marketing: false,
          });
          setIsSuccess(false);
        }, 3000);
      } else {
        setErrors({ submit: 'Failed to submit. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto pt-10">
        <div
          className="bg-white rounded-2xl shadow-xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Content */}
          <div className="p-5 lg:p-6">
            {isSuccess ? (
              // Success State
              <div className="text-center">
                <div className="mb-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Thank You!
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  We've received your request. A RE/MAX HUB advisor will contact you soon.
                </p>
                <button
                  onClick={onClose}
                  className="w-full bg-[#00458b] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#003366] transition-colors text-sm"
                >
                  Close
                </button>
              </div>
            ) : (
              // Form State
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  Book a Consultation
                </h2>
                <p className="text-xs text-gray-600 mb-4">
                  Share your details and we'll confirm your appointment.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Consultation Type - Full Width */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-900 mb-2">
                      How to contact?
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {consultationTypes.map((type) => (
                        <label
                          key={type}
                          className={`relative flex items-center justify-center px-2 py-1.5 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.consultation_type === type
                              ? 'border-[#00458b] bg-blue-50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="consultation_type"
                            value={type}
                            checked={formData.consultation_type === type}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <span className="text-xs font-medium text-gray-900 text-center line-clamp-1">{type}</span>
                        </label>
                      ))}
                    </div>
                    {errors.consultation_type && (
                      <p className="text-xs text-red-600 mt-1">{errors.consultation_type}</p>
                    )}
                  </div>

                  {/* Two Column Layout */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Topic */}
                    <div>
                      <label htmlFor="topic" className="block text-xs font-semibold text-gray-900 mb-1.5">
                        Topic
                      </label>
                      <select
                        id="topic"
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        className={`w-full px-2.5 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#00458b] transition-all ${
                          errors.topic ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select...</option>
                        {topics.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      {errors.topic && (
                        <p className="text-xs text-red-600 mt-0.5">{errors.topic}</p>
                      )}
                    </div>

                    {/* Preferred Date */}
                    <div>
                      <label htmlFor="preferred_date" className="block text-xs font-semibold text-gray-900 mb-1.5">
                        Date
                      </label>
                      <input
                        type="date"
                        id="preferred_date"
                        name="preferred_date"
                        value={formData.preferred_date}
                        onChange={handleChange}
                        className={`w-full px-2.5 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#00458b] transition-all ${
                          errors.preferred_date ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.preferred_date && (
                        <p className="text-xs text-red-600 mt-0.5">{errors.preferred_date}</p>
                      )}
                    </div>
                  </div>

                  {/* Second Row */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Preferred Time */}
                    <div>
                      <label htmlFor="preferred_time" className="block text-xs font-semibold text-gray-900 mb-1.5">
                        Time
                      </label>
                      <select
                        id="preferred_time"
                        name="preferred_time"
                        value={formData.preferred_time}
                        onChange={handleChange}
                        className={`w-full px-2.5 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#00458b] transition-all ${
                          errors.preferred_time ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select...</option>
                        {timeWindows.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      {errors.preferred_time && (
                        <p className="text-xs text-red-600 mt-0.5">{errors.preferred_time}</p>
                      )}
                    </div>

                    {/* Budget Range */}
                    <div>
                      <label htmlFor="budget_range" className="block text-xs font-semibold text-gray-900 mb-1.5">
                        Budget <span className="text-gray-500">(opt.)</span>
                      </label>
                      <input
                        type="text"
                        id="budget_range"
                        name="budget_range"
                        value={formData.budget_range}
                        onChange={handleChange}
                        placeholder="AED 2-4M"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00458b] transition-all"
                      />
                    </div>
                  </div>

                  {/* Full Name & Email Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="full_name" className="block text-xs font-semibold text-gray-900 mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full px-2.5 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#00458b] transition-all ${
                          errors.full_name ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.full_name && (
                        <p className="text-xs text-red-600 mt-0.5">{errors.full_name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-gray-900 mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`w-full px-2.5 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#00458b] transition-all ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-0.5">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Notes Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-gray-900 mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+971 50 123 4567"
                        className={`w-full px-2.5 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#00458b] transition-all ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600 mt-0.5">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="notes" className="block text-xs font-semibold text-gray-900 mb-1.5">
                        Notes <span className="text-gray-500">(opt.)</span>
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Brief notes..."
                        rows="2"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00458b] transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Consent Checkboxes */}
                  <div className="space-y-1.5 bg-gray-50 p-3 rounded-lg">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="consent_consultation"
                        checked={formData.consent_consultation}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-gray-300 text-[#00458b] focus:ring-[#00458b] mt-0.5 flex-shrink-0"
                      />
                      <span className="text-xs text-gray-700">
                        I agree to be contacted by RE/MAX HUB.
                      </span>
                    </label>
                    {errors.consent_consultation && (
                      <p className="text-xs text-red-600">{errors.consent_consultation}</p>
                    )}

                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="consent_marketing"
                        checked={formData.consent_marketing}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-gray-300 text-[#00458b] focus:ring-[#00458b] mt-0.5 flex-shrink-0"
                      />
                      <span className="text-xs text-gray-700">
                        Send me guides and market insights.
                      </span>
                    </label>
                  </div>

                  {/* General Submit Error */}
                  {errors.submit && (
                    <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-xs text-red-600">{errors.submit}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#00458b] text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-[#003366] disabled:bg-gray-400 transition-colors text-sm mt-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Confirm Consultation'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
