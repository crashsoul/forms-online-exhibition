'use client';

import Image from 'next/image';

const works = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  title: `Form ${String(i + 1).padStart(2, '0')}`,
  seed: `abstract,color,${i}`,
  year: '2025',
  medium: 'Digital / Light',
  description: `Interrogation of perception through hue and saturation.`,
}));

function WorkItem({ work, index }: { work: typeof works[0], index: number }) {
  return (
    <div
      id={`work-${work.id}`}
      className="relative w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24 py-32"
    >
      <div className={`w-full md:w-2/3 flex justify-center ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
        <Image
          src={`/assets/${work.id}.png`}
          alt={work.title}
          width={800}
          height={1000}
          className="w-full h-auto object-contain"
          sizes="(max-width: 768px) 100vw, 66vw"
        />
      </div>

      <div className={`w-full md:w-1/3 flex flex-col gap-6 ${index % 2 !== 0 ? 'md:order-1 items-end text-right' : 'items-start text-left'}`}>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-mono text-[#fcfbf9]/40 tracking-widest">{String(work.id).padStart(2, '0')} / 24</span>
          <h3 className="font-sans text-xl md:text-2xl uppercase tracking-[0.1em] text-[#fcfbf9]">{work.title}</h3>
        </div>
        <div className="flex flex-col gap-1 text-sm text-[#fcfbf9]/60 uppercase tracking-[0.1em]">
          <span>{work.medium}</span>
          <span>{work.year}</span>
        </div>
        <p className="text-sm leading-relaxed text-[#fcfbf9]/70 max-w-xs font-serif italic">
          &quot;{work.description}&quot;
        </p>
      </div>
    </div>
  );
}

export default function Exhibition() {
  return (
    <section id="exhibition" className="min-h-screen bg-transparent py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mt-24 mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[#fcfbf9] mb-4">The Exhibition</h2>
          <div className="w-px h-16 bg-[#fcfbf9]/20 mx-auto"></div>
        </div>

        <div className="flex flex-col gap-16 md:gap-32">
          {works.map((work, index) => (
            <WorkItem key={work.id} work={work} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
