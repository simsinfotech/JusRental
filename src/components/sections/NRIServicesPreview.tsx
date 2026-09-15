'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Users,
  FileText,
  IndianRupee,
  Wrench,
  Globe,
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';

const highlights = [
  { icon: Users, title: 'Tenant Discovery', desc: 'Verified tenants from our 5,000+ pool' },
  { icon: FileText, title: 'Legal Support', desc: 'Rental agreements & registration' },
  { icon: IndianRupee, title: 'Rent Collection', desc: 'Automated monthly transfers' },
  { icon: Wrench, title: 'Maintenance', desc: 'Property upkeep & inspections' },
];

export function NRIServicesPreview() {
  const { ref, controls } = useAnimateInView(0.1);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="NRI Property Management"
          title="Own Property in Bangalore? We Manage It."
          highlight="We Manage It."
          subtitle="Complete end-to-end property management for NRI owners. From tenant finding to rent collection, all handled remotely."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
        >
          {highlights.map((item) => (
            <motion.div key={item.title} variants={fadeInUp}>
              <GlassCard className="h-full text-center group" whileHover={{ y: -4 }}>
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center mb-3 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-colors">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold font-[family-name:var(--font-heading)] mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--muted)]">{item.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link
            href="/nri-services"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Globe className="w-4 h-4" />
            Explore NRI Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
