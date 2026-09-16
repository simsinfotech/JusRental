'use client';

import { useState, useActionState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, User, MessageSquare, CheckCircle2, Send } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { GlassCard } from '@/components/ui/GlassCard';
import { WHATSAPP_NUMBER, WHATSAPP_URL } from '@/lib/constants';
import { submitContactForm, type ContactFormState } from '@/lib/actions/contact';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone / WhatsApp',
    detail: '+91 90363 17765',
    href: WHATSAPP_URL,
  },
  {
    icon: Mail,
    title: 'Email',
    detail: 'hello@jusrental.com',
    href: 'mailto:hello@jusrental.com',
  },
  {
    icon: MapPin,
    title: 'Address',
    detail: 'Bengaluru 560077, Karnataka, India',
    href: undefined,
  },
  {
    icon: Clock,
    title: 'Working Hours',
    detail: 'Mon - Sat: 9:00 AM - 7:00 PM',
    href: undefined,
  },
];

const initialState: ContactFormState = { success: false };

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (state.success) {
      setSubmitted(true);
      // Also open WhatsApp
      const form = document.getElementById('contact-form') as HTMLFormElement;
      if (form) {
        const formData = new FormData(form);
        const message = [
          `*Contact Form*`,
          `Name: ${formData.get('name')}`,
          `Email: ${formData.get('email')}`,
          `Phone: ${formData.get('phone')}`,
          `Subject: ${formData.get('subject')}`,
          `Message: ${formData.get('message')}`,
        ].join('\n');
        window.open(
          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
          '_blank'
        );
      }
    }
  }, [state]);

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Have questions? We're here to help. Reach out via WhatsApp, email, or the form below."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <GlassCard hover={false} className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-2">
                    Message Sent!
                  </h2>
                  <p className="text-[var(--muted)] mb-6">
                    Your message has been saved and sent via WhatsApp. We&apos;ll get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl border border-[#006194]/50 text-[#006194] font-medium hover:bg-[#006194]/10 transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </GlassCard>
              ) : (
                <GlassCard hover={false}>
                  <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-6">
                    Send us a message
                  </h2>
                  {state.error && (
                    <div className="mb-4 p-3 rounded-xl bg-red-500/10 text-red-600 text-sm">
                      {state.error}
                    </div>
                  )}
                  <form id="contact-form" action={formAction} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
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
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-[#006194]/20 focus:border-[#006194]/50 transition-all"
                          />
                        </div>
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
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-[#006194]/20 focus:border-[#006194]/50 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        required
                        placeholder="What is this about?"
                        className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-[#006194]/20 focus:border-[#006194]/50 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Message *</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[var(--muted)]" />
                        <textarea
                          name="message"
                          required
                          placeholder="Tell us how we can help..."
                          rows={5}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-[#006194]/20 focus:border-[#006194]/50 transition-all resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#006194] text-white font-semibold shadow-lg shadow-[#006194]/25 hover:shadow-[#006194]/40 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      {isPending ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </GlassCard>
              )}
            </div>

            {/* Contact info cards */}
            <div className="lg:col-span-2 space-y-4">
              {contactInfo.map((info) => (
                <GlassCard key={info.title} hover={false}>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#006194]/10 flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-[#006194]" />
                    </div>
                    <div>
                      <h3 className="font-semibold font-[family-name:var(--font-heading)] mb-1">{info.title}</h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm text-[var(--muted)] hover:text-[#006194] transition-colors"
                        >
                          {info.detail}
                        </a>
                      ) : (
                        <p className="text-sm text-[var(--muted)]">{info.detail}</p>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
