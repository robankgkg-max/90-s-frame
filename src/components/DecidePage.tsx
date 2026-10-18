import React, { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Menu, Film, BookOpen, Sparkles } from 'lucide-react';
import { StoriesSection } from './StoriesSection';
import { AboutSection } from './AboutSection';
import { EditorialFooter } from './EditorialFooter';
import { LightboxImage } from './LightboxModal';

interface DecidePageProps {
  onNavigateHome: (sectionId?: string) => void;
  onOpenMenu: () => void;
  onOpenInquiry: () => void;
  onSelectImage: (image: LightboxImage) => void;
}

export const DecidePage: React.FC<DecidePageProps> = ({
  onNavigateHome,
  onOpenMenu,
  onOpenInquiry,
  onSelectImage,
}) => {
  // Scroll to top when Decide page mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const scrollToSubSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#080808] selection:bg-[#080808] selection:text-white">
      {/* =========================================================================
          STICKY EDITORIAL HEADER FOR DECIDE PAGE
          ========================================================================= */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#080808]/10 transition-all">
        <div className="w-full max-w-[1500px] mx-auto px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Left: Back to Home & Wordmark */}
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={() => onNavigateHome('hero')}
              className="group flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase text-[#080808] hover:opacity-60 transition-opacity cursor-pointer py-1.5 px-2.5 -ml-2 rounded-full hover:bg-[#080808]/5"
              aria-label="Back to home page"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span className="hidden xs:inline">HOME</span>
            </button>

            <div className="h-4 w-[1px] bg-[#080808]/15 hidden xs:block" />

            <button
              onClick={() => onNavigateHome('hero')}
              className="text-left font-editorial text-lg sm:text-2xl tracking-[-0.02em] font-normal hover:opacity-75 transition-opacity"
            >
              90s FRAME
            </button>

            <span className="hidden md:inline-block px-2.5 py-0.5 rounded-full bg-[#080808] text-white text-[9px] font-mono tracking-[0.24em] uppercase font-semibold">
              DECIDE
            </span>
          </div>

          {/* Center Title (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono tracking-[0.24em] text-[#080808]/50 uppercase">
            <span>STAGE 02</span>
            <span>·</span>
            <span>MONOGRAPHS &amp; STUDIO CRAFT</span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenInquiry}
              className="hidden sm:inline-block px-4 py-2 rounded-full border border-[#080808] text-[10px] font-mono tracking-[0.22em] uppercase text-[#080808] hover:bg-[#080808] hover:text-white transition-all cursor-pointer"
            >
              INQUIRE
            </button>

            {/* Menu Trigger Hamburger */}
            <button
              onClick={onOpenMenu}
              aria-label="Open navigation menu"
              className="group flex items-center gap-2.5 px-3 py-2 rounded-full border border-[#080808]/15 hover:border-[#080808] text-[#080808] transition-all cursor-pointer bg-white/80"
            >
              <span className="text-[10px] font-mono tracking-[0.22em] uppercase hidden xs:inline">
                MENU
              </span>
              <div className="flex flex-col justify-between w-4 h-3">
                <span className="block w-full h-[1.2px] bg-[#080808] group-hover:scale-x-110 transition-transform origin-left" />
                <span className="block w-full h-[1.2px] bg-[#080808]" />
                <span className="block w-full h-[1.2px] bg-[#080808] group-hover:scale-x-90 transition-transform origin-left" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          DECIDE PAGE INTRODUCTORY HERO / CURATORIAL STATEMENT
          ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#FAF8F5] border-b border-[#080808]/10 pt-16 sm:pt-24 md:pt-28 pb-14 sm:pb-20 px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="relative w-full max-w-[1400px] mx-auto">
          {/* Breadcrumb / Archival Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-12 border-b border-[#080808]/10 pb-4">
            <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.26em] uppercase text-[#080808]/60">
              <button
                onClick={() => onNavigateHome('hero')}
                className="hover:text-[#080808] hover:underline underline-offset-4 cursor-pointer"
              >
                90S FRAMES
              </button>
              <span>/</span>
              <span className="text-[#080808] font-bold">DECIDE</span>
            </div>

            <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-[#080808]/50 uppercase">
              PORTFOLIO MONOGRAPHS // VOL. 09
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left Oversized Title */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#080808]/5 border border-[#080808]/10">
                <span className="w-2 h-2 rounded-full bg-[#9E7B35] animate-pulse" />
                <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#080808] font-semibold">
                  DECISION &amp; MONOGRAPH ARCHIVE
                </span>
              </div>

              <h1 className="font-editorial text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[-0.03em] leading-[0.9] text-[#080808]">
                DECIDE.
              </h1>

              <p className="font-editorial italic text-xl sm:text-2xl md:text-3xl text-[#080808]/85 leading-snug">
                Where private memories become timeless family heirlooms.
              </p>
            </div>

            {/* Right Curatorial Context & Jump Links */}
            <div className="lg:col-span-5 space-y-6 lg:pt-4">
              <p className="font-sans text-xs sm:text-sm font-light leading-relaxed text-[#080808]/75 tracking-[0.02em]">
                Every couple arrives at a pivotal juncture where the choice of memory-keeper matters most. 
                Explore our full narrative monographs, fine-art darkroom methodology, and studio commission philosophy below to decide on your visual legacy.
              </p>

              {/* Quick Jump Buttons */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <button
                  onClick={() => scrollToSubSection('stories')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#080808] text-white text-[10px] font-mono tracking-[0.2em] uppercase hover:bg-[#080808]/80 transition-all cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>01 · STORIES &amp; MONOGRAPHS</span>
                </button>

                <button
                  onClick={() => scrollToSubSection('about')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#080808]/20 text-[#080808] text-[10px] font-mono tracking-[0.2em] uppercase hover:border-[#080808] transition-all cursor-pointer"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>02 · STUDIO &amp; CRAFT</span>
                </button>

                <button
                  onClick={onOpenInquiry}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#9E7B35] text-[#9E7B35] text-[10px] font-mono tracking-[0.2em] uppercase hover:bg-[#9E7B35] hover:text-white transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>03 · INQUIRE</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE ENTIRE STORIES SECTION (MOVED UNDER AWARDS TO DECIDE)
          Matches user screenshots:
          - "The Art of Remembering / TIMELESS WEDDING STORIES IN FRAMES"
          - Monograph plates: The Heritage Promenade (Ananya & Kabir), Genevieve & Julian, Leyla & Aris
          ========================================================================= */}
      <StoriesSection
        onSelectImage={onSelectImage}
        onOpenInquiry={onOpenInquiry}
      />

      {/* =========================================================================
          THE ENTIRE ABOUT / STUDIO & CRAFT SECTION
          Editorial philosophy, darkroom truth, founder notes
          ========================================================================= */}
      <AboutSection onOpenInquiry={onOpenInquiry} />

      {/* =========================================================================
          EDITORIAL SITE FOOTER
          Inquiries, commission rates, worldwide destinations
          ========================================================================= */}
      <EditorialFooter onOpenInquiry={onOpenInquiry} />

      {/* Floating Return to Home Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => onNavigateHome('hero')}
          className="group flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#080808] text-white text-[10px] font-mono tracking-[0.22em] uppercase shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:scale-105 hover:bg-[#9E7B35] transition-all duration-300 cursor-pointer"
          title="Return to 90s Frames Home"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>RETURN TO HOME</span>
        </button>
      </div>
    </div>
  );
};
