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
          <div className="flex flex-col items-center gap-6 mb-32 max-w-4xl mx-auto">
            <p className="font-serif text-3xl md:text-5xl leading-tight md:leading-snug font-light italic text-[#fcfbf9]/80 text-center text-balance">
              &quot;Colours are the deeds and sufferings of light.&quot;
            </p>
            <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#fcfbf9]/40">
              — Johann Wolfgang von Goethe
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight mb-4">Artist Statement</h2>
          <div className="w-px h-16 bg-[#fcfbf9]/20 mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-lg md:text-xl leading-relaxed md:leading-loose font-light text-[#fcfbf9]/80 max-w-3xl mx-auto space-y-6 text-left"
        >
          <p>
            Forms is a series of digital works where I explore perception itself as a medium. Influenced by Goethe&apos;s theory of color, the project explores what happens when simple geometric structures are placed in charged chromatic fields of emitted light.
          </p>
          <p>
            These images do not resolve at a glance. They unfold over time, producing afterimages, optical tension, retinal burn, and subtle shifts in spatial sensation. Forms seem to hover, recede, or detach from the screen as the viewer remains with them. An update to Goethe&apos;s &quot;Visionary images.&quot; This emphasizes a duration, staying with the work, juxtaposed against a world of torrential digital downpour. It imagines the digital as solid in time.
          </p>
          <p>
            Rather than offering fixed representations, the series stages a relationship between work and observer. Each image changes according to duration, sequence, memory, and the physiological activity of the eye itself. In this way, Forms transforms digital color from a merely graphic tool into a site of lived experience. A relationship of the viewer and the viewed. The result is a visual mantra: a meditation on how seeing is never passive, and never finished.
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
