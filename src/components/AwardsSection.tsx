import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface AwardItem {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  medallionUrl: string;
}

export const AWARDS_DATA: AwardItem[] = [
  {
    id: 'award-01-cinematic-storytelling',
    title: 'CINEMATIC STORYTELLING',
    subtitle: 'International Guild · 2025',
    year: '2025',
    medallionUrl:
      'https://res.cloudinary.com/cbi5mcab/image/upload/v1792313192/Cinematic_Storytelling_Award_Medallion_t4q4qy.webp',
  },
  {
    id: 'award-02-vogue-india',
    title: 'VOGUE INDIA SELECTION',
    subtitle: 'Editorial Wedding Cinema · 2024',
    year: '2024',
    medallionUrl:
      'https://res.cloudinary.com/cbi5mcab/image/upload/v1792313192/Vogue_India_Silver_Selection_Medallion_zkjyxf.webp',
  },
  {
    id: 'award-03-bside-silent-heroes',
    title: 'B-SIDE SILENT HEROES',
    subtitle: 'Analogue Cinema Archive · 2024',
    year: '2024',
    medallionUrl:
      'https://res.cloudinary.com/cbi5mcab/image/upload/v1792313192/Silver_B-Side_Silent_Heroes_Award_Medal_jnxltg.webp',
  },
  {
    id: 'award-04-editorial-distinction',
    title: 'EDITORIAL DISTINCTION',
    subtitle: 'Fine Art Wedding Society · 2025',
    year: '2025',
    medallionUrl:
      'https://res.cloudinary.com/cbi5mcab/image/upload/v1792313192/Silver_Editorial_Distinction_Award_Medallion_k88zyj.webp',
  },
  {
    id: 'award-05-weddingsutra-favorite',
    title: 'WEDDINGSUTRA FAVORITE',
    subtitle: '90s Frame · 2026',
    year: '2026',
    medallionUrl:
      'https://res.cloudinary.com/cbi5mcab/image/upload/v1792313192/Brushed_Steel_Wedding_Medallion_txhhbz.webp',
  },
];

interface AwardsSectionProps {
  onOpenInquiry?: () => void;
}

export const AwardsSection: React.FC<AwardsSectionProps> = () => {
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate the array 4 times for a seamless, gap-free infinite flow
  const marqueeItems = [
    ...AWARDS_DATA,
    ...AWARDS_DATA,
    ...AWARDS_DATA,
    ...AWARDS_DATA,
  ];

  return (
    <section
      id="awards"
      aria-label="Recognized Awards"
      className="relative w-full overflow-hidden bg-[#0A0A0A] text-[#EDE7DC] py-16 sm:py-20 md:py-24 border-t border-white/10 selection:bg-[#DFBA73] selection:text-[#0A0A0A]"
    >
      {/* Subtle Analogue Film Grain Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}
      />

      <div className="relative w-full max-w-[1400px] mx-auto px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16">
        {/* Center-Aligned Heading: RECOGNIZED AWARDS */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#DFBA73] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.28em] text-[#DFBA73] uppercase font-bold">
              HONORS &amp; DISTINCTIONS
            </span>
          </div>

          <h2 className="font-vogue text-3xl xs:text-4xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase">
            RECOGNIZED AWARDS
          </h2>

          <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-mono tracking-[0.22em] text-[#EDE7DC]/60 uppercase max-w-xl mx-auto">
            Celebrated by international wedding cinema juries &amp; curatorial archives
          </p>

          {/* Minimal Flow Direction Controls */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setDirection('left')}
              title="Flow left"
              className={`p-1.5 rounded-full border transition-colors ${
                direction === 'left'
                  ? 'bg-[#A67C37] text-white border-[#A67C37]'
                  : 'bg-white/5 border-white/15 text-white/60 hover:text-white hover:bg-white/15'
              }`}
              aria-label="Flow from right to left"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setDirection('right')}
              title="Flow right"
              className={`p-1.5 rounded-full border transition-colors ${
                direction === 'right'
                  ? 'bg-[#A67C37] text-white border-[#A67C37]'
                  : 'bg-white/5 border-white/15 text-white/60 hover:text-white hover:bg-white/15'
              }`}
              aria-label="Flow from left to right"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          COMPLETELY RAW AWARDS FLOWING STREAM (NO BOXES)
          - No card containers, no borders, no white boxes
          - Raw circular emblems cleanly clipped to remove square artifacts
          - Award names placed cleanly underneath
          - Mobile (<640px): 2 awards visible side-by-side (50% viewport width)
          - Tablet (640px-1024px): 3 to 4 awards visible (33.333% / 25% viewport width)
          - Desktop (>=1024px): All 5 awards visible in one balanced panoramic view (20% width)
          ========================================================================= */}
      <div
        className="relative w-full overflow-hidden py-4 sm:py-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Soft Vignette Edge Fades */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 z-10 bg-gradient-to-r from-[#0A0A0A] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 z-10 bg-gradient-to-l from-[#0A0A0A] to-transparent"
        />

        {/* Continuous Flowing Track */}
        <div
          className={`flex w-max items-start gap-4 sm:gap-6 md:gap-8 ${
            direction === 'left'
              ? 'animate-awards-flow-left'
              : 'animate-awards-flow-right'
          } ${isHovered ? 'awards-paused' : ''}`}
        >
          {marqueeItems.map((award, index) => (
            <div
              key={`${award.id}-${index}`}
              /* Responsive Widths:
                 - Mobile: w-[50vw] -> exactly 2 awards visible across screen
                 - Tablet: sm:w-[33.333vw] (3 visible) and md:w-[25vw] (4 visible)
                 - Desktop: lg:w-[20vw] lg:max-w-[280px] xl:max-w-[300px] -> all 5 visible in view
              */
              className="w-[calc(50vw-16px)] sm:w-[calc(33.333vw-20px)] md:w-[calc(25vw-24px)] lg:w-[260px] xl:w-[280px] shrink-0 flex flex-col items-center group cursor-default select-none"
            >
              {/* Raw Circular Medallion Emblem — Clipped to remove square corner artifact */}
              <div className="relative flex items-center justify-center">
                {/* Subtle Ambient Glow */}
                <div className="absolute inset-0 rounded-full bg-[#DFBA73]/15 blur-2xl group-hover:bg-[#DFBA73]/30 transition-all duration-500" />

                <div className="relative w-28 h-28 xs:w-32 xs:h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden [clip-path:circle(48.5%_at_50%_50%)] drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)] group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500">
                  <img
                    src={award.medallionUrl}
                    alt={`${award.title} Emblem`}
                    loading="lazy"
                    className="w-full h-full object-contain pointer-events-none select-none"
                  />
                </div>
              </div>

              {/* Award Name & Subtitle Directly Underneath */}
              <div className="mt-4 sm:mt-5 text-center px-2 max-w-[240px]">
                <h3 className="font-editorial text-sm xs:text-base sm:text-lg text-white group-hover:text-[#DFBA73] transition-colors tracking-wide leading-tight uppercase">
                  {award.title}
                </h3>

                <p className="mt-1 sm:mt-1.5 text-[9px] sm:text-[10px] font-mono tracking-[0.18em] text-[#EDE7DC]/60 uppercase">
                  {award.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
