'use client';

import { motion, useScroll, useMotionValueEvent, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';

export default function FloatingNav() {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we are on mobile/tablet to give touch devices the scroll-up nav logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mirrors the layout background transition to ensure contrast is kept automatically
  const textColor = useTransform(
    scrollYProgress,
    isMobile
      ? [0, 0.01, 0.02, 0.90, 0.95, 0.98, 1]
      : [0, 0.01, 0.03, 0.90, 0.95, 0.98, 1],
    // When background is white/light (#fcfbf9), text is graphite (#1a1a1a/70)
    // When background is dark (#040814), text is off-white (#fcfbf9/70)
    ["rgba(26,26,26,0.7)", "rgba(26,26,26,0.7)", "rgba(252,251,249,0.7)", "rgba(252,251,249,0.7)", "rgba(252,251,249,0.7)", "rgba(26,26,26,0.7)", "rgba(26,26,26,0.7)"]
  );

  // For the active/hover state which is fully opaque
  const textHoverColor = useTransform(
    scrollYProgress,
    isMobile
      ? [0, 0.01, 0.02, 0.90, 0.95, 0.98, 1]
      : [0, 0.01, 0.03, 0.90, 0.95, 0.98, 1],
    ["#1a1a1a", "#1a1a1a", "#fcfbf9", "#fcfbf9", "#fcfbf9", "#1a1a1a", "#1a1a1a"]
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // If we're at the very top (Hero section), always show the nav
    if (latest < 50) {
      setHidden(false);
      return;
    }

    if (isMobile) {
      // -- MOBILE LOGIC --
      // If we are scrolling UP, show the nav
      if (latest < previous) {
        setHidden(false);
      }
      // If we are scrolling DOWN, hide the nav
      else if (latest > previous) {
        setHidden(true);
      }
    } else {
      // -- DESKTOP LOGIC --
      // Always hide it when not at the top, UNLESS the user hovers over the trigger area
      setHidden(!isHovering);
    }
  });

  // Re-evaluate hidden state when hover changes (Desktop only basically)
  const handleMouseEnter = () => {
    setIsHovering(true);
    setHidden(false);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Only hide if we aren't at the top (and not mobile overriding)
    if (scrollY.get() >= 50 && !isMobile) {
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
        style={{
          "--nav-text": textColor,
          "--nav-hover": textHoverColor,
        } as any}
      >
        <div className="bg-[#fcfbf9]/5 backdrop-blur-md backdrop-saturate-[1.5] border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.6)] rounded-full px-6 py-3 flex items-center gap-8">
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
                  // For other links, scroll to section
                  e.preventDefault();
                  const target = document.querySelector(item.href) as HTMLElement;
                  if (!target) return;

                  if (isMobile) {
                    // On mobile, jump directly to avoid Safari crashing from rendering
                    // all 24 artwork images during a smooth scroll animation
                    target.scrollIntoView({ behavior: 'instant' });
                  } else {
                    // Use manual requestAnimationFrame scroll that recalculates target
                    // position each frame. Lazy-loaded images shift the layout during scroll,
                    // so a one-time calculation would land at the wrong position.
                    const startPosition = window.scrollY;
                    const initialTargetPosition = target.getBoundingClientRect().top + window.scrollY;
                    const initialDistance = initialTargetPosition - startPosition;
                    const duration = 1200;
                    let start: number | null = null;

                    const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

                    const animation = (currentTime: number) => {
                      if (start === null) start = currentTime;
                      const timeElapsed = currentTime - start;
                      const progress = Math.min(timeElapsed / duration, 1);

                      // Recalculate target position each frame to account for
                      // layout shifts from lazy-loaded images
                      const currentTargetPosition = target.getBoundingClientRect().top + window.scrollY;
                      const currentDistance = currentTargetPosition - startPosition;

                      window.scrollTo(0, startPosition + currentDistance * ease(progress));

                      if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                      }
                    };

                    requestAnimationFrame(animation);
                  }
                }
              }}
              className="nav-link text-xs uppercase tracking-[0.15em] font-medium transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
        </div>
      </motion.nav>
    </>
  );
}
