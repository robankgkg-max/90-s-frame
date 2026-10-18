/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { NavigationDrawer } from './components/NavigationDrawer';
import { LightboxModal, LightboxImage } from './components/LightboxModal';
import { InquiryModal } from './components/InquiryModal';
import { PhilosophySection } from './components/PhilosophySection';
import { LostSignalVideoSection } from './components/LostSignalVideoSection';
import { AwardsSection } from './components/AwardsSection';
import { GalleryArchiveSection } from './components/GalleryArchiveSection';
import { DecidePage } from './components/DecidePage';

export type Page = 'home' | 'decide';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('decide')) {
        return 'decide';
      }
    }
    return 'home';
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<LightboxImage | null>(null);

  // Sync with browser back/forward and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('decide')) {
        setCurrentPage('decide');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigatePage = (page: Page, sectionId?: string) => {
    setCurrentPage(page);
    if (page === 'decide') {
      window.location.hash = '#decide';
    } else {
      if (window.location.hash.includes('decide')) {
        window.history.pushState(null, '', window.location.pathname);
      }
    }

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleExploreStories = () => {
    handleNavigatePage('home', 'archive');
  };

  return (
    <div className="min-h-screen bg-white text-[#080808] selection:bg-[#080808] selection:text-white">
      {/* =========================================================================
          HOME PAGE: Strictly visible ONLY up to and including the Awards section
          ========================================================================= */}
      {currentPage === 'home' && (
        <main>
          {/* Authoritative Editorial Hero Section */}
          <Hero
            onOpenMenu={() => setIsMenuOpen(true)}
            onOpenInquiry={() => setIsInquiryOpen(true)}
            onSelectImage={(img) => setSelectedImage(img)}
            onExploreStories={handleExploreStories}
          />

          {/* Editorial Philosophy Section */}
          <PhilosophySection onOpenInquiry={() => setIsInquiryOpen(true)} />

          {/* Cinematic Film Archive Gallery (The Art of Remembering) */}
          <GalleryArchiveSection
            onSelectImage={(img) => setSelectedImage(img)}
            onOpenMenu={() => setIsMenuOpen(true)}
          />

          {/* 90s FILM — LOST SIGNAL, FOUND MEMORIES (Vintage CRT Television Cinema Archive) */}
          <LostSignalVideoSection onOpenInquiry={() => setIsInquiryOpen(true)} />

          {/* 90s FILM — AWARDS & JURY DISTINCTIONS (Flowing Medallions Showcase) */}
          <AwardsSection
            onOpenInquiry={() => setIsInquiryOpen(true)}
            onNavigateToDecide={() => handleNavigatePage('decide')}
          />
        </main>
      )}

      {/* =========================================================================
          DECIDE PAGE: The entire collection moved from under awards
          - StoriesSection ("The Art of Remembering / TIMELESS WEDDING STORIES IN FRAMES")
          - AboutSection (Editorial Studio Philosophy & About Section)
          - EditorialFooter (Site footer, rates, commissions)
          ========================================================================= */}
      {currentPage === 'decide' && (
        <DecidePage
          onNavigateHome={(sectionId) => handleNavigatePage('home', sectionId)}
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenInquiry={() => setIsInquiryOpen(true)}
          onSelectImage={(img) => setSelectedImage(img)}
        />
      )}

      {/* Fullscreen Navigation Menu Drawer — Allows selecting DECIDE or HOME */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
        onOpenInquiry={() => {
          setIsMenuOpen(false);
          setIsInquiryOpen(true);
        }}
      />

      {/* Fine-Art Image Lightbox Modal */}
      <LightboxModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />

      {/* Commission & Booking Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
}
