'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LuX, LuUser, LuPhone, LuMail, LuSend } from 'react-icons/lu';

interface LeadPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeadPopup({ isOpen, onClose }: LeadPopupProps) {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
    };

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK;
      if (!webhookUrl) {
        throw new Error('Webhook URL not configured');
      }

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        mode: 'no-cors',
      });

      // With no-cors mode, we can't read the response, so treat as success
      // if no network error was thrown
      if (res.type === 'opaque' || res.ok) {
        setFormState('success');
        localStorage.setItem('jusrental_lead_captured', 'true');
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch {
      setFormState('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const handleClose = () => {
    localStorage.setItem('jusrental_lead_captured', 'true');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto relative">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Close popup"
              >
                <LuX className="w-5 h-5" />
              </button>

              <div className="p-6 sm:p-8">
                {formState === 'success' ? (
                  <div className="text-center py-4">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                      <LuMail className="w-7 h-7 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-2">
                      Thank You!
                    </h3>
                    <p className="text-[var(--muted)] text-sm">
                      We&apos;ll get in touch with you shortly.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-1">
                        Looking for a rental?
                      </h3>
                      <p className="text-sm text-[var(--muted)]">
                        Share your details and we&apos;ll help you find the perfect property.
                      </p>
                    </div>

                    {formState === 'error' && (
                      <div className="mb-4 p-3 rounded-xl bg-red-500/10 text-red-600 text-sm">
                        {errorMessage}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Name *</label>
                        <div className="relative">
                          <LuUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="Your name"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-[#006194]/20 focus:border-[#006194]/50 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Phone *</label>
                        <div className="relative">
                          <LuPhone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-[#006194]/20 focus:border-[#006194]/50 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Email *</label>
                        <div className="relative">
                          <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="your@email.com"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-[#006194]/20 focus:border-[#006194]/50 transition-all"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={formState === 'submitting'}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#006194] text-white font-semibold shadow-lg shadow-[#006194]/25 hover:shadow-[#006194]/40 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                      >
                        <LuSend className="w-4 h-4" />
                        {formState === 'submitting' ? 'Submitting...' : 'Get in Touch'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
