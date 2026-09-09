'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { NAV_LINKS, WHATSAPP_URL } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          {/* Menu panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-[280px] bg-surface border-l border-glass-border z-50 p-6 flex flex-col"
          >
            <button
              onClick={onClose}
              className="self-end p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
            <nav className="mt-8 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="px-4 py-3 rounded-xl text-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto">
              <Button href={WHATSAPP_URL} className="w-full">
                Chat on WhatsApp
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
