'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { LuArrowRight, LuUsers, LuFileText, LuIndianRupee, LuWrench, LuGlobe } from 'react-icons/lu';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';

const highlights = [
  { icon: LuUsers, title: 'Tenant Discovery', desc: 'Verified tenants from our 5,000+ pool', color: 'bg-blue-50 text-[#006194]' },
  { icon: LuFileText, title: 'Legal Support', desc: 'Rental agreements & registration', color: 'bg-emerald-50 text-emerald-600' },
  { icon: LuIndianRupee, title: 'Rent Collection', desc: 'Automated monthly transfers', color: 'bg-amber-50 text-amber-600' },
  { icon: LuWrench, title: 'Maintenance', desc: 'Property upkeep & inspections', color: 'bg-purple-50 text-purple-600' },
];

export function NRIServicesPreview() {
  const { ref, controls } = useAnimateInView(0.1);

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006194]/10 text-[#006194] text-sm font-medium mb-4">
            <LuGlobe className="w-3.5 h-3.5" />
            NRI Property Management
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-[#131b2e] mb-4">
            Own Property in Bangalore?{' '}
            <span className="text-[#006194]">We Manage It.</span>
          </h2>
          <p className="text-[#3f4850] max-w-2xl mx-auto">
            Complete end-to-end property management for NRI owners. From tenant finding to rent collection, all handled remotely.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
        >
          {highlights.map((item) => (
            <motion.div key={item.title} variants={fadeInUp}>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 text-center group h-full">
                <div className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold font-[family-name:var(--font-heading)] text-[#131b2e] mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-[#3f4850]">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link
            href="/nri-services"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#006194] hover:bg-[#005080] text-white font-semibold shadow-lg shadow-[#006194]/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            <LuGlobe className="w-4 h-4" />
            Explore NRI Services
            <LuArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
