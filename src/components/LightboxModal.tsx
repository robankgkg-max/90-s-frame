import React, { useEffect } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

export interface LightboxImage {
  url: string;
  title: string;
  subtitle: string;
  caption: string;
  location: string;
  filmStock: string;
}

interface LightboxModalProps {
  image: LightboxImage | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  image,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    if (image) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [image, onClose, onNext, onPrev]);

  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full h-[90vh] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 p-4 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close image viewer"
          className="absolute top-2 right-2 md:top-6 md:right-6 p-2 text-[#080808] hover:opacity-60 transition-opacity z-10"
        >
          <X className="w-6 h-6 stroke-[1.25]" />
        </button>

        {/* Image frame */}
        <div className="relative flex-1 w-full h-[60vh] md:h-full flex items-center justify-center overflow-hidden">
          <img
            src={image.url}
            alt={image.title}
            referrerPolicy="no-referrer"
            className="max-h-full max-w-full object-contain shadow-sm select-none"
          />
        </div>

        {/* Editorial details side pane */}
        <div className="w-full md:w-80 flex flex-col justify-between shrink-0 text-[#080808] border-t md:border-t-0 md:border-l border-[#080808]/15 pt-4 md:pt-0 md:pl-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#080808]/60 mb-2">
              {image.caption}
            </p>
            <h2 className="font-editorial text-2xl md:text-3xl font-normal leading-tight mb-2">
              {image.title}
            </h2>
            <p className="text-[12px] tracking-[0.08em] font-light text-[#080808]/80 leading-relaxed mb-6">
              {image.subtitle}
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#080808]/10 text-[11px] tracking-[0.16em] uppercase">
            <div className="flex justify-between">
              <span className="text-[#080808]/50">Location</span>
              <span>{image.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#080808]/50">Medium</span>
              <span>{image.filmStock}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#080808]/50">Studio</span>
              <span>90s Frames</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#080808]/10">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#080808]/50">
              Press ESC to close
            </span>
            <div className="flex gap-4">
              {onPrev && (
                <button
                  onClick={onPrev}
                  aria-label="Previous image"
                  className="p-2 border border-[#080808]/20 hover:border-[#080808] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[1.25]" />
                </button>
              )}
              {onNext && (
                <button
                  onClick={onNext}
                  aria-label="Next image"
                  className="p-2 border border-[#080808]/20 hover:border-[#080808] transition-colors"
                >
                  <ArrowRight className="w-4 h-4 stroke-[1.25]" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
