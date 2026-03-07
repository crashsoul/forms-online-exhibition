'use client';

import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';

export default function FloatingNav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // If we're at the very top (Hero section), always show the nav
    if (latest < 50) {
      setHidden(false);
    } else {
      // Otherwise, hide it unless we're hovering over the trigger area
      setHidden(!isHovering);
    }
  });

  // Re-evaluate hidden state when hover changes
  const handleMouseEnter = () => {
    setIsHovering(true);
    setHidden(false);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Only hide if we aren't at the top
    if (scrollY.get() >= 50) {
      setHidden(true);
    }
  };

  const navItems = [
    { name: 'Exhibition', href: '#exhibition' },
    { name: 'Statement', href: '#statement' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Invisible hover trigger area at the top of the screen */}
      <div
        className="fixed top-0 left-0 right-0 h-24 z-40"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        initial="visible"
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="bg-[#fcfbf9]/40 backdrop-blur-2xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-full px-6 py-3 flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                if (item.name === 'Exhibition') {
                  e.preventDefault();
                  const target = document.getElementById('work-1');
                  if (!target) return;

                  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
                  const startPosition = window.scrollY;

                  // Matches the Hero.tsx 0.07 offset and 850ms duration
                  const offset = window.innerHeight * 0.07;
                  const distance = (targetPosition + offset) - startPosition;
                  const duration = 850;
                  let start: number | null = null;

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
                } else {
                  // For other links, simple smooth scroll
                  e.preventDefault();
                  const target = document.querySelector(item.href);
                  target?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-xs uppercase tracking-[0.15em] font-medium text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>
      </motion.nav>
    </>
  );
}
