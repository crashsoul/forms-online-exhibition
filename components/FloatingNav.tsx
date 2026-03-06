'use client';

import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';

export default function FloatingNav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navItems = [
    { name: 'Exhibition', href: '#exhibition' },
    { name: 'Statement', href: '#statement' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="bg-[#fcfbf9]/80 backdrop-blur-md border border-[#1a1a1a]/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-sm">
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
  );
}
