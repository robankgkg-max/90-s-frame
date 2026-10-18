import React from 'react';

interface EditorialFooterProps {
  onOpenInquiry: () => void;
}

export const EditorialFooter: React.FC<EditorialFooterProps> = ({ onOpenInquiry }) => {
  return (
    <footer
      id="contact"
      aria-label="Footer"
      className="w-full bg-white text-[#080808] border-t border-[#080808]/10 pt-20 pb-12 px-6 sm:px-10 md:px-16 lg:px-20"
    >
      <div className="max-w-[1500px] mx-auto flex flex-col justify-between">
        {/* Top Callout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#080808]/10">
          <div className="md:col-span-8">
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#080808]/50 block mb-3">
              COMMISSION INQUIRIES // 2026—2027
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal leading-tight">
              Begin a conversation about your celebration.
            </h2>
          </div>

          <div className="md:col-span-4 flex flex-col justify-end items-start md:items-end">
            <button
              onClick={onOpenInquiry}
              className="text-[11px] uppercase tracking-[0.26em] font-medium border-b border-[#080808] pb-1 hover:opacity-60 transition-opacity"
            >
              REQUEST COMMISSIONS DOSSIER →
            </button>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#080808]/50 mt-3">
              inquiries@90sframes.com
            </span>
          </div>
        </div>

        {/* Middle Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-[10px] uppercase tracking-[0.22em] text-[#080808]/70 border-b border-[#080808]/10">
          <div>
            <p className="text-[#080808] font-medium mb-3">STUDIO</p>
            <p className="leading-relaxed">90s FRAMES ATELIER</p>
            <p className="leading-relaxed">PARIS · LAKE COMO · NEW YORK</p>
          </div>
          <div>
            <p className="text-[#080808] font-medium mb-3">MEDIUMS</p>
            <p className="leading-relaxed">35MM · MEDIUM FORMAT</p>
            <p className="leading-relaxed">SUPER 8 · ARRI DIGITAL CINEMA</p>
          </div>
          <div>
            <p className="text-[#080808] font-medium mb-3">PUBLICATIONS</p>
            <p className="leading-relaxed">VOGUE WEDDINGS</p>
            <p className="leading-relaxed">HARPER'S BAZAAR · OVER THE MOON</p>
          </div>
          <div>
            <p className="text-[#080808] font-medium mb-3">SOCIAL</p>
            <div className="flex flex-col gap-1.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#080808] underline underline-offset-4"
              >
                INSTAGRAM
              </a>
              <a
                href="https://vimeo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#080808] underline underline-offset-4"
              >
                VIMEO CINEMA
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Baseline Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[9.5px] uppercase tracking-[0.22em] text-[#080808]/50">
          <div className="flex items-center gap-4">
            <span>© 90S FRAMES STUDIO</span>
            <span aria-hidden="true">·</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>
          <div>
            <span>TIMELESS EDITORIAL WEDDINGS &amp; CINEMATOGRAPHY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
