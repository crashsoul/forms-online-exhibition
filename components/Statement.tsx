'use client';

import { motion } from 'motion/react';

export default function Statement() {
  return (
    <section id="statement" className="min-h-screen bg-transparent text-[#fcfbf9] py-32 px-4 md:px-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight mb-4">Artist Statement</h2>
          <div className="w-px h-16 bg-[#fcfbf9]/20 mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-2xl md:text-4xl leading-relaxed md:leading-snug font-light text-[#fcfbf9]/90"
        >
          <p className="mb-8">
            &quot;Color is the suffering of light.&quot;
          </p>
          <p className="text-lg md:text-2xl text-[#fcfbf9]/70 max-w-2xl mx-auto">
            In FORMS, I explore Goethe&apos;s assertion that color arises from the dynamic interplay of light and darkness. These 24 works are not merely visual objects, but temporal experiences—interrogating how our perception shifts as hues bleed, shapes dissolve, and time unfolds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col items-center gap-4 mt-8"
        >
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#fcfbf9]/50">
            Based in New York City
          </span>
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#fcfbf9]/50">
            Selected Works 2025
          </span>
        </motion.div>
      </div>
    </section>
  );
}
