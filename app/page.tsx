'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import FloatingNav from '@/components/FloatingNav';
import Hero from '@/components/Hero';
import Exhibition from '@/components/Exhibition';
import Statement from '@/components/Statement';
import Contact from '@/components/Contact';
import { ArrowUp } from 'lucide-react';

import { useEffect } from 'react';

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Force scroll to top on page load in case browser tries to preserve a mid-page scroll
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.02, 0.05, 0.90, 0.95, 0.98, 1],
    ["#fcfbf9", "#fcfbf9", "#040814", "#040814", "#0f172a", "#fcfbf9", "#fcfbf9"]
  );

  return (
    <motion.main style={{ backgroundColor }} className="relative min-h-screen transition-colors duration-0">
      <FloatingNav />
      <Hero />
      <Exhibition />
      <Statement />
      <Contact />

      <footer className="bg-transparent text-[#1a1a1a]/50 py-12 px-4 text-center text-xs uppercase tracking-[0.2em] font-sans flex flex-col items-center gap-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex flex-col items-center gap-3 text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-colors"
        >
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUp className="w-4 h-4" strokeWidth={1.5} />
          </motion.div>
          <span>Back to Top</span>
        </button>
        <p>&copy; {new Date().getFullYear()} FORMS. All rights reserved.</p>
      </footer>
    </motion.main>
  );
}
