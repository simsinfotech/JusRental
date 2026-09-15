'use client';

import { useState, useActionState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calendar, Phone, Mail, User, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { GlassCard } from '@/components/ui/GlassCard';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { submitBookVisit, type BookVisitFormState } from '@/lib/actions/book-visit';

const initialState: BookVisitFormState = { success: false };

function BookVisitContent() {
  const searchParams = useSearchParams();
  const propertyTitle = searchParams.get('title') || '';
  const propertyId = searchParams.get('propertyId') || '';

  const [state, formAction, isPending] = useActionState(submitBookVisit, initialState);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (state.success) {
      setSubmitted(true);
      // Also open WhatsApp
      const form = document.getElementById('book-visit-form') as HTMLFormElement;
      if (form) {
        const formData = new FormData(form);
        const message = [
          `*Book a Visit Request*`,
          `Name: ${formData.get('name')}`,
          `Phone: ${formData.get('phone')}`,
          `Email: ${formData.get('email')}`,
          `Date: ${formData.get('preferredDate')}`,
          `Time: ${formData.get('preferredTime')}`,
          propertyId ? `Property ID: ${propertyId}` : '',
          formData.get('message') ? `Message: ${formData.get('message')}` : '',
        ].filter(Boolean).join('\n');

        window.open(
          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
          '_blank'
        );
      }
    }
  }, [state, propertyId]);

  return (
    <>
      <PageHero
        title="Book a Property Visit"
        subtitle="Schedule a visit to your preferred property. We'll coordinate everything for you."
        breadcrumbs={[{ label: 'Book a Visit' }]}
      />

      <section className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <GlassCard hover={false} className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-2">
                Request Sent!
              </h2>
              <p className="text-[var(--muted)] mb-6">
                Your visit request has been saved and sent via WhatsApp. Our team will confirm the schedule shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl border border-blue-500/50 text-blue-600 font-medium hover:bg-blue-500/10 transition-all cursor-pointer"
              >
                Book Another Visit
              </button>
            </GlassCard>
          ) : (
            <GlassCard hover={false}>
              <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-6">
                Fill in your details
              </h2>
              {state.error && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 text-red-600 text-sm">
                  {state.error}
                </div>
              )}
              <form id="book-visit-form" action={formAction} className="space-y-5">
                <input type="hidden" name="propertyId" value={propertyId} />

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your full name"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Preferred Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                      <input
                        type="date"
                        name="preferredDate"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Preferred Time *</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                      <select
                        name="preferredTime"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select</option>
                        <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
                        <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
                        <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
                        <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[var(--muted)]" />
                    <textarea
                      name="message"
                      defaultValue={propertyTitle ? `I'd like to visit: ${propertyTitle}` : ''}
                      placeholder="Any specific requirements or questions..."
                      rows={3}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                >
                  {isPending ? 'Submitting...' : 'Book Visit'}
                </button>
              </form>
            </GlassCard>
          )}
        </div>
      </section>
    </>
  );
}

export default function BookVisitPage() {
  return (
    <Suspense>
      <BookVisitContent />
    </Suspense>
  );
}
