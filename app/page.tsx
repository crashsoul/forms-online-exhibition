'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import FloatingNav from '@/components/FloatingNav';
import Hero from '@/components/Hero';
import Exhibition from '@/components/Exhibition';
import Statement from '@/components/Statement';
import Contact from '@/components/Contact';
import { ArrowUp } from 'lucide-react';

import { useEffect, useState } from 'react';

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Force scroll to top on page load in case browser tries to preserve a mid-page scroll
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // We check window size so mobile (which implies taller content relative to viewport)
  // shifts to midnight much quicker before hitting the first actual artwork.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const backgroundColor = useTransform(
    scrollYProgress,
    isMobile
      ? [0, 0.01, 0.02, 0.90, 0.95, 0.98, 1] // Faster transition on mobile so FORM 01 is dark
      : [0, 0.01, 0.03, 0.90, 0.95, 0.98, 1], // Faster standard desktop transition
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
          aria-label="Back to Top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex flex-col items-center gap-3 text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-colors"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
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
