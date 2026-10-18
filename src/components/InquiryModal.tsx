import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    names: '',
    email: '',
    phone: '',
    eventDate: '',
    location: '',
    vision: '',
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSubmitted(false);
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Commission Inquiry"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white text-[#080808] w-full max-w-xl max-h-[92vh] overflow-y-auto p-8 sm:p-12 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close inquiry"
          className="absolute top-6 right-6 p-2 text-[#080808] hover:opacity-60 transition-opacity"
        >
          <X className="w-5 h-5 stroke-[1.25]" />
        </button>

        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full border border-[#080808] flex items-center justify-center">
              <Check className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h2 className="font-editorial text-3xl">Inquiry Received</h2>
            <p className="text-xs tracking-[0.16em] uppercase text-[#080808]/70 max-w-md mx-auto leading-relaxed">
              Thank you. Our studio manager will review your celebration details and reply within 48 hours with our bespoke investment portfolio.
            </p>
            <button
              onClick={onClose}
              className="mt-6 text-[11px] uppercase tracking-[0.24em] underline underline-offset-4 hover:opacity-60 transition-opacity"
            >
              RETURN TO EDITORIAL
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <span className="text-[10px] uppercase tracking-[0.26em] text-[#080808]/50 block mb-2">
                COMMISSION / BESPOKE
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl">
                Begin Your Story
              </h2>
              <p className="text-[11px] tracking-[0.12em] uppercase text-[#080808]/60 mt-2">
                Limited to 18 editorial weddings worldwide each season.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.22em] text-[#080808]/70 mb-1">
                  Both Your Names
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clara & Alexander"
                  value={formData.names}
                  onChange={(e) => setFormData({ ...formData, names: e.target.value })}
                  className="w-full border-b border-[#080808]/30 py-2 text-sm focus:border-[#080808] outline-none transition-colors placeholder:text-[#080808]/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.22em] text-[#080808]/70 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="clara@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border-b border-[#080808]/30 py-2 text-sm focus:border-[#080808] outline-none transition-colors placeholder:text-[#080808]/30"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.22em] text-[#080808]/70 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border-b border-[#080808]/30 py-2 text-sm focus:border-[#080808] outline-none transition-colors placeholder:text-[#080808]/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.22em] text-[#080808]/70 mb-1">
                    Celebration Date
                  </label>
                  <input
                    type="text"
                    placeholder="Autumn 2026 / Exact Date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full border-b border-[#080808]/30 py-2 text-sm focus:border-[#080808] outline-none transition-colors placeholder:text-[#080808]/30"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.22em] text-[#080808]/70 mb-1">
                    Destination &amp; Venue
                  </label>
                  <input
                    type="text"
                    placeholder="Villa Balbiano, Lake Como"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full border-b border-[#080808]/30 py-2 text-sm focus:border-[#080808] outline-none transition-colors placeholder:text-[#080808]/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.22em] text-[#080808]/70 mb-1">
                  Tell Us About Your Vision
                </label>
                <textarea
                  rows={3}
                  placeholder="Share your aesthetic, guest count, and what draws you to our imagery..."
                  value={formData.vision}
                  onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                  className="w-full border-b border-[#080808]/30 py-2 text-sm focus:border-[#080808] outline-none transition-colors placeholder:text-[#080808]/30 resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="submit"
                  className="text-[11px] uppercase tracking-[0.24em] font-medium border-b border-[#080808] pb-1 hover:opacity-60 transition-opacity"
                >
                  SEND INQUIRY →
                </button>
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#080808]/40">
                  CONFIDENTIAL
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
