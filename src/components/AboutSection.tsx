import React from 'react';

interface AboutSectionProps {
  onOpenInquiry: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenInquiry }) => {
  return (
    <section
      id="about"
      aria-label="Philosophy & Studio"
      className="w-full bg-white text-[#080808] py-20 md:py-32 px-6 sm:px-10 md:px-16 lg:px-20 border-t border-[#080808]/10"
    >
      <div className="max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column: Heading & Monograph */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.26em] font-medium text-[#080808]/50 block">
              THE PHILOSOPHY
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.05]">
              Editorial Grace.
              <br />
              Fine Art Truth.
            </h2>
            <div className="w-16 h-[1px] bg-[#080808] my-6" />
            <p className="font-script text-2xl md:text-3xl text-[#080808]/80 leading-relaxed">
              We capture the quiet glances that would otherwise dissolve into the wind.
            </p>
          </div>

          {/* Right Column: Statement & Tenets */}
          <div className="lg:col-span-7 space-y-12">
            <p className="text-sm md:text-base font-light text-[#080808]/85 leading-relaxed tracking-[0.02em]">
              90s Frames is an international luxury wedding photography and cinema studio founded on the belief that wedding memories should feel like vintage fashion spreads and cinematic poetry rather than standardized event coverage.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-[#080808]/10">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.24em] font-medium text-[#080808]/50 block">
                  01 / ANALOG DISCIPLINE
                </span>
                <h3 className="font-editorial text-xl">Tactile Film Mediums</h3>
                <p className="text-xs font-light text-[#080808]/70 leading-relaxed">
                  We blend medium-format film, 35mm grain, and cinema cameras to render true-to-life skin tones, atmospheric textures, and lasting emotional weight.
                </p>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.24em] font-medium text-[#080808]/50 block">
                  02 / UNFORCED DIRECTION
                </span>
                <h3 className="font-editorial text-xl">Art Direction in Rhythm</h3>
                <p className="text-xs font-light text-[#080808]/70 leading-relaxed">
                  Never stiff poses or manufactured smiles. We direct with subtlety, creating space for authentic intimacy, majestic silhouettes, and effortless motion.
                </p>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.24em] font-medium text-[#080808]/50 block">
                  03 / ARCHIVAL HEIRLOOMS
                </span>
                <h3 className="font-editorial text-xl">Museum Print Monograph</h3>
                <p className="text-xs font-light text-[#080808]/70 leading-relaxed">
                  Every commission includes bespoke linen-bound monographs printed on cotton rag paper by master Italian bookbinders, crafted to outlast generations.
                </p>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.24em] font-medium text-[#080808]/50 block">
                  04 / WORLDWIDE ATELIER
                </span>
                <h3 className="font-editorial text-xl">Global Commissions</h3>
                <p className="text-xs font-light text-[#080808]/70 leading-relaxed">
                  Available for private ceremonies and celebrations across Europe, the Americas, Asia, and destinations unknown.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#080808]/10 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#080808]/60">
                LIMITED AVAILABILITY EACH SEASON
              </span>
              <button
                onClick={onOpenInquiry}
                className="text-[10px] uppercase tracking-[0.24em] font-medium border-b border-[#080808] pb-0.5 hover:opacity-60 transition-opacity"
              >
                DISCUSS YOUR CELEBRATION →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
