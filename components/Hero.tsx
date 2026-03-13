'use client';

import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      <div className="text-center z-10 animate-fade-up">
        <h1 className="font-serif text-[18vw] leading-[0.8] font-light tracking-[0.04em] [font-kerning:normal] mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#F5D061] via-[#E65C4F] to-[#2B4C7E] animate-color-shift">
          FORMS
        </h1>
        <div className="flex flex-col items-center gap-4">
          <p className="font-sans text-[clamp(1.5rem,3.5vw,2.4rem)] tracking-[-0.015em] max-w-[45ch] mx-auto px-4 md:px-0 text-[#1a1a1a]/60 font-medium leading-tight">
            An inquiry into Goethe&apos;s theory of color through emitted light, form, and eye.
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-0 right-0 flex justify-center"
      >
        <button
          aria-label="Enter Exhibition"
          onClick={(e) => {
            e.preventDefault();
            const target = document.getElementById('work-1');
            if (!target) return;

            const targetPosition = target.getBoundingClientRect().top + window.scrollY;
            const startPosition = window.scrollY;

            // To ensure the background color transition (which happens at 5% scroll depth)
            // is fully complete when the animation stops, we add an offset pushing it just far enough.
            const offset = window.innerHeight * 0.07;
            const distance = (targetPosition + offset) - startPosition;

            const duration = 850; // Slower duration in ms
            let start: number | null = null;

            // Easing function: easeInOutCubic
            const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

            const animation = (currentTime: number) => {
              if (start === null) start = currentTime;
              const timeElapsed = currentTime - start;
              const progress = Math.min(timeElapsed / duration, 1);

              window.scrollTo(0, startPosition + distance * ease(progress));

              if (timeElapsed < duration) {
                requestAnimationFrame(animation);
              }
            };

            requestAnimationFrame(animation);
          }}
          className="group flex flex-col items-center gap-3 text-xs uppercase tracking-[0.15em] text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-colors cursor-pointer border-none bg-transparent"
        >
          <span>Enter Exhibition</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4" strokeWidth={1.5} />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
}
