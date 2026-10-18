import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage?: 'home' | 'decide';
  onNavigatePage: (page: 'home' | 'decide', sectionId?: string) => void;
  onOpenInquiry: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  currentPage = 'home',
  onNavigatePage,
  onOpenInquiry,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navItems: Array<{
    label: string;
    page: 'home' | 'decide' | 'action';
    id?: string;
    badge?: string;
    desc?: string;
    action?: () => void;
  }> = [
    { label: 'HOME', page: 'home', id: 'hero' },
    { label: 'PHILOSOPHY', page: 'home', id: 'philosophy' },
    { label: 'FILM ARCHIVE', page: 'home', id: 'archive' },
    { label: 'LOST SIGNAL (FILMS)', page: 'home', id: 'films' },
    { label: 'AWARDS & DISTINCTIONS', page: 'home', id: 'awards' },
    {
      label: 'DECIDE',
      page: 'decide',
      id: '',
      badge: 'PAGE',
      desc: 'Monographs, Couple Stories & Studio Craft',
    },
    { label: 'CONTACT & INQUIRE', page: 'action', id: 'contact', action: onOpenInquiry },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-50 bg-white text-[#080808] flex flex-col justify-between p-6 sm:p-12 md:p-16 animate-in fade-in duration-300"
    >
      {/* Top Bar of Drawer */}
      <div className="flex items-center justify-between border-b border-[#080808]/10 pb-6">
        <div className="flex items-center gap-3">
          <p className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.22em] font-medium whitespace-nowrap">
            WEDDING PHOTOGRAPHY &amp; CINEMATOGRAPHY
          </p>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#080808]/5 text-[9px] font-mono tracking-[0.2em] uppercase text-[#080808]/60">
            CURRENT: {currentPage.toUpperCase()}
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] group p-2 hover:opacity-60 transition-opacity cursor-pointer"
        >
          <span>CLOSE</span>
          <X className="w-5 h-5 stroke-[1.25]" />
        </button>
      </div>

      {/* Main Navigation Links */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-auto py-8">
        <div className="md:col-span-8 flex flex-col space-y-3 sm:space-y-4 md:space-y-5">
          {navItems.map((item, idx) => (
            <button
              key={item.label}
              onClick={() => {
                onClose();
                if (item.action) {
                  item.action();
                } else if (item.page === 'home' || item.page === 'decide') {
                  onNavigatePage(item.page, item.id);
                }
              }}
              className={`text-left font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl hover:translate-x-3 transition-transform duration-300 flex items-baseline gap-3 sm:gap-4 group cursor-pointer ${
                (currentPage === 'decide' && item.page === 'decide') ||
                (currentPage === 'home' && item.page === 'home' && item.id === 'hero')
                  ? 'text-[#9E7B35]'
                  : 'text-[#080808]'
              }`}
            >
              <span className="text-[11px] md:text-xs font-mono tracking-[0.2em] text-[#080808]/40 group-hover:text-[#080808] transition-colors">
                0{idx + 1}
              </span>
              <span className="hover:italic transition-all flex items-center gap-3">
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.24em] uppercase px-2.5 py-0.5 rounded-full bg-[#080808] text-white not-italic font-bold">
                    {item.badge}
                  </span>
                )}
              </span>
              {item.desc && (
                <span className="hidden xl:inline-block text-[11px] font-mono tracking-[0.16em] uppercase text-[#080808]/40 not-italic ml-2">
                  — {item.desc}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Editorial side notes */}
        <div className="md:col-span-4 flex flex-col justify-end space-y-8 border-t md:border-t-0 md:border-l border-[#080808]/10 pt-6 md:pt-0 md:pl-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#080808]/50 mb-2">
              STUDIO DESTINATIONS
            </p>
            <p className="text-sm font-light leading-relaxed tracking-[0.05em]">
              Lake Como · Paris · Amalfi Coast · New York · Kyoto · Istanbul · Rajasthan
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#080808]/50 mb-2">
              COMMISSION INQUIRIES
            </p>
            <p className="text-sm font-light leading-relaxed">
              bookings@90sframes.com
              <br />
              Worldwide editorial assignments
            </p>
          </div>

          <div className="pt-4 border-t border-[#080808]/10 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#080808]/60">
            <span>© 90S FRAMES</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#080808]/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] uppercase tracking-[0.22em]">
        <span>90S FRAMES — WEDDING STORIES</span>
        <div className="flex gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4"
          >
            INSTAGRAM
          </a>
          <a
            href="https://vimeo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4"
          >
            VIMEO
          </a>
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4"
          >
            PINTEREST
          </a>
        </div>
      </div>
    </div>
  );
};
