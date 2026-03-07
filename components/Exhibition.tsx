'use client';

import Image from 'next/image';

const descriptions = [
  "A nearly-vanishing disc tests the threshold at which form stops being seen as object and begins to exist as afterimage, atmosphere, and memory.",
  "Here the blue bar becomes less a shape than a chromatic pressure, asserting how emitted color can stand upright in the eye before it stands securely in space.",
  "Against a darker field, the same vertical form shifts from declaration to apparition, showing that color changes not by identity but by relation.",
  "This red triangle on cyan turns geometric stability into optical strain, making the most elementary figure feel volatile and alive.",
  "Soft pink ellipses float like perceptual fragments, suggesting that form is never fixed but gathered provisionally by the viewer.",
  "A single biomorphic accent on an acid field demonstrates how extreme complementarity can make a small event feel physically disproportionate.",
  "Scattered blue circles resist compositional hierarchy, proposing vision as a field of moving attractions rather than a single point of rest.",
  "The cone-like form emerges less through contour than through chromatic vibration, as if volume were being generated directly by light.",
  "These receding red mandorlas read like retinal echoes, turning repetition into a study of persistence, dimming, and perceptual descent.",
  "The concentric target compresses depth into pure optical heat, making color behave as radiation rather than surface.",
  "Two pale inverted triangles make immediate legibility feel unexpectedly delicate, proving that force is not required for presence.",
  "This segmented construction balances play and severity, using curved quarters to show that geometry can pivot between symbol and architecture.",
  "The dark diamond sits like a withheld revelation, a form that clarifies only by refusing to fully separate from its ground.",
  "Suspended shapes and an unstable center turn symmetry into tension, suggesting that balance in this series is always a living negotiation.",
  "The mirrored arrows compress attraction and repulsion into one sign, making direction itself feel reversible and unresolved.",
  "A muted polygon on yellow stages the paradox of soft impact, where the eye discovers structure only after the initial glare subsides.",
  "This near-monochrome field radicalizes reduction, asking whether color alone, without incident, can still operate as an event.",
  "Two ochre forms and a turquoise center create a perceptual hinge, as if the image were held together by a small, luminous act of mediation.",
  "Nested translucent squares thicken the screen into layers, showing digital light not as flatness but as accumulated depth and interference.",
  "Overlapping circles become a lesson in relational color: each zone is less a pigment than a temporary treaty between competing lights.",
  "Red and blue discs gather into a precarious cluster, making chromatic opposition feel held together by a fragile, almost social equilibrium.",
  "The pale circle on black turns luminosity into presence, presenting white not as neutrality but as an active force pressing outward from darkness.",
  "In reversal, the black circle on light becomes a perceptual sink, proving that absence can project as strongly as illumination.",
  "This final, almost invisible rectangle returns the series to the threshold, where looking slows enough for darkness itself to begin articulating form."
];

const works = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  title: `Form ${String(i + 1).padStart(2, '0')}`,
  seed: `abstract,color,${i}`,
  year: '2025',
  medium: 'Digital / Light',
  description: descriptions[i],
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
          className="w-full h-auto object-contain select-none pointer-events-none"
          sizes="(max-width: 768px) 100vw, 66vw"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
          priority={index < 2}
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
        <p className="text-sm leading-loose text-[#fcfbf9]/70 max-w-sm font-sans italic tracking-wide text-pretty mt-2">
          {work.description}
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
