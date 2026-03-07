'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section id="contact" className="min-h-screen bg-transparent py-32 px-4 md:px-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[#1a1a1a] mb-4">Inquiries</h2>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#1a1a1a]/50">For collectors and galleries</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs uppercase tracking-[0.15em] text-[#1a1a1a]/70">Name</label>
              <input
                type="text"
                id="name"
                required
                className="bg-transparent border-b border-[#1a1a1a]/20 py-2 focus:outline-none focus:border-[#1a1a1a] transition-colors text-[#1a1a1a] font-serif text-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs uppercase tracking-[0.15em] text-[#1a1a1a]/70">Email</label>
              <input
                type="email"
                id="email"
                required
                className="bg-transparent border-b border-[#1a1a1a]/20 py-2 focus:outline-none focus:border-[#1a1a1a] transition-colors text-[#1a1a1a] font-serif text-lg"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="inquiry" className="text-xs uppercase tracking-[0.15em] text-[#1a1a1a]/70">Inquiry Type</label>
            <select
              id="inquiry"
              className="bg-transparent border-b border-[#1a1a1a]/20 py-2 focus:outline-none focus:border-[#1a1a1a] transition-colors text-[#1a1a1a] font-serif text-lg appearance-none rounded-none"
            >
              <option value="acquisition">Artwork Acquisition</option>
              <option value="exhibition">Gallery Exhibition</option>
              <option value="press">Press & Media</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-xs uppercase tracking-[0.15em] text-[#1a1a1a]/70">Message</label>
            <textarea
              id="message"
              required
              rows={4}
              className="bg-transparent border-b border-[#1a1a1a]/20 py-2 focus:outline-none focus:border-[#1a1a1a] transition-colors text-[#1a1a1a] font-serif text-lg resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status !== 'idle'}
            className="group relative mt-8 overflow-hidden bg-[#fcfbf9]/40 backdrop-blur-2xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-full text-[#1a1a1a] transition-all duration-300 py-3 px-8 text-xs uppercase tracking-[0.2em] font-medium w-full md:w-auto self-center disabled:opacity-50 disabled:cursor-not-allowed z-10 hover:text-white hover:border-transparent"
          >
            {/* Animated Gradient Background that appears on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#F5D061] via-[#E65C4F] to-[#2B4C7E] bg-[length:200%_auto] animate-color-shift opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            {status === 'idle' ? 'Send Inquiry' : status === 'submitting' ? 'Sending...' : 'Message Sent'}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
