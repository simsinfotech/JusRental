'use client';

import { motion } from 'motion/react';
import {
  Users, FileText, IndianRupee, Wrench, Calculator, Video,
  ArrowRight, Globe, Phone,
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WHATSAPP_URL } from '@/lib/constants';
import type { NRIService } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  Users, FileText, IndianRupee, Wrench, Calculator, Video,
};

const howItWorks = [
  { step: 1, title: 'Share Property Details', desc: 'Tell us about your property — location, type, and expectations.' },
  { step: 2, title: 'We Find Tenants', desc: 'Our team finds verified tenants from our 5,000+ database.' },
  { step: 3, title: 'Agreement & Move-in', desc: 'We handle the agreement, move-in, and security deposit.' },
  { step: 4, title: 'Ongoing Management', desc: 'Monthly rent collection, maintenance, and video reports.' },
];

interface NRIServicesContentProps {
  services: NRIService[];
}

export function NRIServicesContent({ services }: NRIServicesContentProps) {
  const { ref: servicesRef, controls: servicesControls } = useAnimateInView(0.1);
  const { ref: howRef, controls: howControls } = useAnimateInView(0.1);

  return (
    <>
      {/* Services Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Services"
            title="Everything You Need, Managed Remotely"
            highlight="Managed Remotely"
            subtitle="Comprehensive property management services designed for NRI property owners."
          />

          <motion.div
            ref={servicesRef}
            variants={staggerContainer}
            initial="hidden"
            animate={servicesControls}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Globe;
              return (
                <motion.div key={service.title} variants={fadeInUp}>
                  <GlassCard className="h-full" whileHover={{ y: -4 }}>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)] mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                      {service.description}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 bg-surface-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="How It Works"
            title="Simple 4-Step Process"
            highlight="4-Step Process"
          />

          <motion.div
            ref={howRef}
            variants={staggerContainer}
            initial="hidden"
            animate={howControls}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {howItWorks.map((item) => (
              <motion.div key={item.step} variants={fadeInUp} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xl font-bold flex items-center justify-center mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold font-[family-name:var(--font-heading)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted)]">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GlassCard gradient hover={false} className="py-12">
            <Globe className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-[var(--muted)] mb-6 max-w-lg mx-auto">
              Join 100+ NRI property owners who trust JusRental for hassle-free property management in Bangalore.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                Contact Us on WhatsApp
              </a>
            </div>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
