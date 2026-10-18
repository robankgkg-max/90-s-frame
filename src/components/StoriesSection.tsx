import React, { useState } from 'react';
import { LightboxImage } from './LightboxModal';
import { ArrowUpRight, Sparkles, Moon, Sun, Eye } from 'lucide-react';

interface StoriesSectionProps {
  onSelectImage: (image: LightboxImage) => void;
  onOpenInquiry: () => void;
}

interface NarrativeStory {
  id: string;
  plate: string;
  frameCode: string;
  couple: string;
  storyTitle: string;
  location: string;
  seasonYear: string;
  filmStock: string;
  monographText: string;
  coverImage: LightboxImage;
  secondaryImages: LightboxImage[];
  quote: string;
}

const NARRATIVE_STORIES: NarrativeStory[] = [
  {
    id: 'heritage-promenade',
    plate: 'PLATE I // HERITAGE & SPLENDOR',
    frameCode: 'FRAME 01 / A',
    couple: 'Ananya & Kabir',
    storyTitle: 'The Heritage Promenade',
    location: 'Arabian Coastline & Royal Pavilion',
    seasonYear: 'WINTER MMXXVI',
    filmStock: 'Contax 645 · Fuji Pro 400H · 35mm Grain',
    monographText:
      'A celebration anchored in sacred heirloom silks, hand-embroidered blush zardozi, and unhurried coastal winds at first morning light. Not a choreographed spectacle, but the quiet reverence of family, unspoken promises, and memories that linger for generations.',
    coverImage: {
      url: 'https://res.cloudinary.com/cbi5mcab/image/upload/v1791530489/SaveClip.App_682117137_18100818932051532_82501271114918916_n_apyckk.jpg',
      title: 'The Blush Shoreline & Heirloom Silk',
      subtitle: 'Embellished bridal drape and floral parasol along the morning tide',
      caption: 'PLATE I — THE HERITAGE PROMENADE',
      location: 'Arabian Coastline & Royal Pavilion',
      filmStock: 'Contax 645 & Fuji Pro 400H',
    },
    secondaryImages: [
      {
        url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85',
        title: 'Sacred Adornments & Heirlooms',
        subtitle: 'Intricate gold ornaments, henna motifs, and quiet anticipation',
        caption: 'PLATE I / B — INTIMATE CEREMONY',
        location: 'Royal Pavilion Suite',
        filmStock: '35mm Kodak Portra 400',
      },
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85',
        title: 'Candlelit Banquet & Vows',
        subtitle: 'Evening dusk settling over the coastal courtyard tablescape',
        caption: 'PLATE I / C — EVENING REVERIE',
        location: 'Arabian Shoreline Terrace',
        filmStock: 'Medium Format Hasselblad',
      },
    ],
    quote: 'The quiet before the vows is where the memory actually lives.',
  },
  {
    id: 'architectural-silhouette',
    plate: 'PLATE II // ARCHITECTURAL SOLITUDE',
    frameCode: 'FRAME 02 / B',
    couple: 'Genevieve & Julian',
    storyTitle: 'The Ivory Silhouette',
    location: 'Villa del Balbianello, Lake Como',
    seasonYear: 'SUMMER MMXXVI',
    filmStock: 'Hasselblad H6D · Portra 160 · 16mm Reversal',
    monographText:
      'Sheer pleated silk drapery catching mountain breezes against 18th-century stone porticos. Bathed in subdued golden reflections, this monograph chronicles the geometry of longing and the stillness of lifelong devotion.',
    coverImage: {
      url: 'https://res.cloudinary.com/cbi5mcab/image/upload/v1791530494/SaveClip.App_655225516_18072272105560922_1543333015940641887_n_mpbjew.jpg',
      title: 'The Ivory Silhouette & Stone Balustrades',
      subtitle: 'Sheer drapery against historic lakeside stone colonnades',
      caption: 'PLATE II — ARCHITECTURAL SOLITUDE',
      location: 'Villa del Balbianello, Lake Como',
      filmStock: 'Hasselblad H6D Medium Format',
    },
    secondaryImages: [
      {
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=85',
        title: 'Lakeside Portico Entrance',
        subtitle: 'Unspoken reverence as the wedding party ascends the stone steps',
        caption: 'PLATE II / B — PROCESSION',
        location: 'Lake Como Gardens',
        filmStock: '16mm Cinema Film',
      },
    ],
    quote: 'Every stone whispered the reverence of the moment.',
  },
  {
    id: 'bosphorus-reverie',
    plate: 'PLATE III // WATERFRONT REVERIE',
    frameCode: 'FRAME 03 / C',
    couple: 'Leyla & Aris',
    storyTitle: 'The Waterfront Reverie',
    location: 'Istanbul Waterfront & Bosphorus Strait',
    seasonYear: 'AUTUMN MMXXVI',
    filmStock: 'Kodak Portra 400 · Arri Digital Cinema · Super 8',
    monographText:
      'An ethereal encounter between antique tapestries and sweeping maritime waters. Cobalt silks in flight above ancient sea gates as morning gulls trace circles against an amber sky.',
    coverImage: {
      url: 'https://res.cloudinary.com/cbi5mcab/image/upload/v1791530489/SaveClip.App_632648246_18092819237051532_7974760865679486695_n_m1b73t.jpg',
      title: 'The Blue Reverie & Historic Waters',
      subtitle: 'Cobalt silk in motion amidst the morning flight over historic waters',
      caption: 'PLATE III — WATERFRONT REVERIE',
      location: 'Istanbul Waterfront & Bosphorus',
      filmStock: '35mm Kodak Portra 400',
    },
    secondaryImages: [
      {
        url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=85',
        title: 'The Lantern Passage',
        subtitle: 'Intimate whispers in the palace corridor before dusk',
        caption: 'PLATE III / B — DUSK CORRIDOR',
        location: 'Waterfront Palace',
        filmStock: 'Super 8 Kodak Vision3',
      },
    ],
    quote: 'Time suspended on the surface of the water.',
  },
];

export const StoriesSection: React.FC<StoriesSectionProps> = ({
  onSelectImage,
  onOpenInquiry,
}) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const activeStory = NARRATIVE_STORIES[activeStoryIndex];

  // Dynamic theme colors allowing the user to view either:
  // 1) The signature white editorial theme (our website's color tone)
  // 2) The darkroom monograph theme (the screenshot from their other website)
  const themeClasses = isDarkMode
    ? 'bg-[#0c0c0c] text-[#f7f4ed] border-[#f7f4ed]/15 selection:bg-[#f7f4ed] selection:text-[#0c0c0c]'
    : 'bg-white text-[#080808] border-[#080808]/10 selection:bg-[#080808] selection:text-white';

  const subtextColor = isDarkMode ? 'text-[#f7f4ed]/60' : 'text-[#080808]/60';
  const bodyTextColor = isDarkMode ? 'text-[#f7f4ed]/85' : 'text-[#080808]/85';
  const hairlineColor = isDarkMode ? 'border-[#f7f4ed]/15' : 'border-[#080808]/10';
  const tagBgColor = isDarkMode ? 'bg-[#181818] border-[#f7f4ed]/20 text-[#f7f4ed]/80' : 'bg-[#f8f8f8] border-[#080808]/10 text-[#080808]/80';
  const cardBg = isDarkMode ? 'bg-[#141414]' : 'bg-[#fafafa]';

  return (
    <section
      id="stories"
      aria-label="Timeless Wedding Stories in Frames"
      className={`w-full transition-colors duration-500 py-20 sm:py-28 md:py-36 lg:py-44 px-5 sm:px-8 md:px-14 lg:px-20 border-t ${themeClasses}`}
    >
      <div className="max-w-[1520px] mx-auto">
        {/* =========================================================================
            1. SECTION MASTHEAD / EDITORIAL HEADER
        ========================================================================= */}
        <header className="mb-14 sm:mb-20 md:mb-28">
          {/* Top kicker and Theme Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b mb-8 sm:mb-12 border-current/10">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-current/40 animate-pulse" />
              <span className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.28em] font-medium opacity-60">
                SELECTED MONOGRAPHS // VOL. 09
              </span>
            </div>

            {/* Ambient Darkroom / Light Editorial Switcher */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.22em] transition-all duration-300 border ${
                  isDarkMode
                    ? 'border-[#f7f4ed]/30 hover:border-[#f7f4ed] bg-[#1a1a1a] text-[#f7f4ed]'
                    : 'border-[#080808]/20 hover:border-[#080808] bg-[#f7f7f7] text-[#080808]'
                }`}
                title="Toggle between pristine Light Editorial and Darkroom Archive mode"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-3 h-3 text-amber-300" />
                    <span>LIGHT EDITORIAL</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3 h-3 text-neutral-600" />
                    <span>DARKROOM ARCHIVE</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Title & Editorial Sub-heading */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <p className="font-script text-2xl sm:text-3xl md:text-4xl text-current/75 mb-3">
                The Art of Remembering
              </p>
              <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-normal tracking-[-0.01em] uppercase leading-[0.95]">
                TIMELESS WEDDING STORIES IN FRAMES
              </h2>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end">
              <p className={`text-xs sm:text-sm font-light leading-relaxed tracking-[0.02em] ${bodyTextColor}`}>
                We document weddings not as conventional itineraries, but as private monographs of enduring beauty. Every frame holds the breath, the unrepeatable emotion, and the sacred truth of who you are.
              </p>
            </div>
          </div>

          {/* Story Selector Tabs */}
          <div className="mt-10 sm:mt-14 flex flex-wrap items-center gap-2 sm:gap-3 border-t pt-6 border-current/10">
            <span className="text-[9px] uppercase tracking-[0.24em] opacity-40 mr-2 hidden sm:inline-block">
              CURATED MONOGRAPHS:
            </span>
            {NARRATIVE_STORIES.map((story, idx) => (
              <button
                key={story.id}
                onClick={() => setActiveStoryIndex(idx)}
                className={`px-3.5 py-1.5 text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.2em] transition-all duration-300 border ${
                  activeStoryIndex === idx
                    ? isDarkMode
                      ? 'border-[#f7f4ed] bg-[#f7f4ed] text-[#0c0c0c] font-medium'
                      : 'border-[#080808] bg-[#080808] text-white font-medium'
                    : isDarkMode
                    ? 'border-[#f7f4ed]/15 text-[#f7f4ed]/70 hover:border-[#f7f4ed]/50 hover:text-[#f7f4ed]'
                    : 'border-[#080808]/15 text-[#080808]/70 hover:border-[#080808]/50 hover:text-[#080808]'
                }`}
              >
                {story.couple}
              </button>
            ))}
          </div>
        </header>

        {/* =========================================================================
            2. THE ASYMMETRICAL EDITORIAL COMPOSITION (MAIN FRAME A + CLUSTERS B & C)
        ========================================================================= */}
        <div className="space-y-24 sm:space-y-32 md:space-y-40">
          {/* Active Featured Narrative Block */}
          <article className="w-full">
            {/* Top Story Plate Tag */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-current/10">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.24em] font-medium ${tagBgColor}`}>
                  {activeStory.plate}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] opacity-50">
                  {activeStory.seasonYear}
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.24em] font-medium opacity-60">
                {activeStory.location}
              </span>
            </div>

            {/* Grid Composition */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
              {/* =================================================================
                  MAIN FRAME A: The commanding primary portrait (Pink Saree / Main)
              ================================================================= */}
              <div className="lg:col-span-7 xl:col-span-7 space-y-6">
                <div
                  onClick={() => onSelectImage(activeStory.coverImage)}
                  className={`group relative overflow-hidden cursor-pointer ${cardBg} border ${hairlineColor} aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full`}
                >
                  <img
                    src={activeStory.coverImage.url}
                    alt={activeStory.coverImage.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.025] transition-transform duration-1000 ease-out"
                  />

                  {/* High fashion vignette & hover reveal */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-6 sm:p-8">
                    <div className="self-end">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 text-[#080808] text-[9px] uppercase tracking-[0.22em] font-medium shadow-md">
                        <Eye className="w-3 h-3" />
                        VIEW MONOGRAPH
                      </span>
                    </div>

                    <div className="text-white">
                      <span className="text-[9px] uppercase tracking-[0.24em] opacity-80 block mb-1">
                        {activeStory.frameCode}
                      </span>
                      <h4 className="font-editorial text-2xl sm:text-3xl">
                        {activeStory.coverImage.title}
                      </h4>
                    </div>
                  </div>

                  {/* Corner Index Tag */}
                  <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <span className="px-2.5 py-1 text-[8px] sm:text-[8.5px] uppercase tracking-[0.24em] bg-black/70 text-white backdrop-blur-sm">
                      {activeStory.frameCode}
                    </span>
                  </div>
                </div>

                {/* Editorial Description Box directly below Frame A */}
                <div className={`p-6 sm:p-8 border ${hairlineColor} ${cardBg} space-y-4`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[9px] sm:text-[10px] uppercase tracking-[0.22em] opacity-60">
                    <span>ARCHIVE REFERENCE: 90S-ARC-0{activeStoryIndex + 1}</span>
                    <span>MEDIUM: {activeStory.filmStock}</span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl leading-tight">
                    {activeStory.storyTitle}
                  </h3>

                  <p className={`text-xs sm:text-sm font-light leading-relaxed ${bodyTextColor}`}>
                    {activeStory.monographText}
                  </p>

                  <div className="pt-4 border-t border-current/10 flex flex-wrap items-center justify-between gap-4">
                    <p className="font-script text-xl sm:text-2xl text-current/80">
                      "{activeStory.quote}"
                    </p>
                    <button
                      onClick={() => onSelectImage(activeStory.coverImage)}
                      className="inline-flex items-center gap-1.5 text-[9.5px] sm:text-[10px] uppercase tracking-[0.24em] font-medium border-b border-current pb-0.5 hover:opacity-60 transition-opacity"
                    >
                      <span>EXAMINE ARCHIVE DETAIL</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* =================================================================
                  CLUSTERS B & C: Secondary Narrative Frames & Intimate Details
              ================================================================= */}
              <div className="lg:col-span-5 xl:col-span-5 space-y-10 sm:space-y-12">
                {/* Cluster B Frame */}
                {activeStory.secondaryImages[0] && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.22em] opacity-60">
                      <span>CLUSTER B // DETAIL & SOLITUDE</span>
                      <span>FRAME 02 / B</span>
                    </div>

                    <div
                      onClick={() => onSelectImage(activeStory.secondaryImages[0])}
                      className={`group relative overflow-hidden cursor-pointer ${cardBg} border ${hairlineColor} aspect-[4/3] sm:aspect-[16/11]`}
                    >
                      <img
                        src={activeStory.secondaryImages[0].url}
                        alt={activeStory.secondaryImages[0].title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 bg-white text-[#080808] text-[9px] uppercase tracking-[0.22em] font-medium">
                          OPEN FRAME
                        </span>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between gap-4 pt-1">
                      <div>
                        <h4 className="font-editorial text-lg sm:text-xl">
                          {activeStory.secondaryImages[0].title}
                        </h4>
                        <p className={`text-xs font-light tracking-[0.01em] ${subtextColor}`}>
                          {activeStory.secondaryImages[0].subtitle}
                        </p>
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.2em] opacity-50 shrink-0">
                        {activeStory.secondaryImages[0].filmStock}
                      </span>
                    </div>
                  </div>
                )}

                {/* Cluster C Frame or Atmospheric Monograph */}
                {activeStory.secondaryImages[1] ? (
                  <div className="space-y-4 pt-4 border-t border-current/10">
                    <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.22em] opacity-60">
                      <span>CLUSTER C // ATMOSPHERE & LIGHT</span>
                      <span>FRAME 03 / C</span>
                    </div>

                    <div
                      onClick={() => onSelectImage(activeStory.secondaryImages[1])}
                      className={`group relative overflow-hidden cursor-pointer ${cardBg} border ${hairlineColor} aspect-[16/10]`}
                    >
                      <img
                        src={activeStory.secondaryImages[1].url}
                        alt={activeStory.secondaryImages[1].title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 bg-white text-[#080808] text-[9px] uppercase tracking-[0.22em] font-medium">
                          OPEN FRAME
                        </span>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between gap-4 pt-1">
                      <div>
                        <h4 className="font-editorial text-lg sm:text-xl">
                          {activeStory.secondaryImages[1].title}
                        </h4>
                        <p className={`text-xs font-light tracking-[0.01em] ${subtextColor}`}>
                          {activeStory.secondaryImages[1].subtitle}
                        </p>
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.2em] opacity-50 shrink-0">
                        {activeStory.secondaryImages[1].filmStock}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Supplementary Editorial Note Box when only 1 secondary image is present */
                  <div className={`p-8 border ${hairlineColor} ${cardBg} space-y-4`}>
                    <span className="text-[9px] uppercase tracking-[0.26em] opacity-50 block">
                      ARCHIVAL PHILOSOPHY // 90S FRAMES
                    </span>
                    <h4 className="font-editorial text-2xl">The Sacred Margins</h4>
                    <p className={`text-xs sm:text-sm font-light leading-relaxed ${bodyTextColor}`}>
                      "We look where everyone else looks away — the quiet nervous hands, the grandfather holding back tears, the hem of the gown drifting over marble."
                    </p>
                    <div className="pt-4 border-t border-current/10 flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-[0.2em] opacity-50">
                        DIRECTOR MONOGRAPH
                      </span>
                      <button
                        onClick={onOpenInquiry}
                        className="text-[9px] uppercase tracking-[0.22em] font-medium border-b border-current pb-0.5 hover:opacity-60 transition-opacity"
                      >
                        RESERVE COMMISSION →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* =========================================================================
              3. ARCHIVE GALLERY STRIP (PREVIEW OF ALL STORIES)
          ========================================================================= */}
          <div className="pt-16 sm:pt-24 border-t border-current/10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
              <div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.26em] opacity-50 block mb-2">
                  THE COMPLETE ARCHIVE
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl">
                  Chronicles of Sacred Devotion
                </h3>
              </div>

              <p className={`text-xs font-light max-w-sm ${subtextColor}`}>
                Switch stories or select any photographic plate to view full technical metadata, archival scans, and commission notes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {NARRATIVE_STORIES.map((story, idx) => (
                <div
                  key={story.id}
                  onClick={() => setActiveStoryIndex(idx)}
                  className={`group cursor-pointer p-5 border transition-all duration-300 ${
                    activeStoryIndex === idx
                      ? isDarkMode
                        ? 'border-[#f7f4ed] bg-[#1a1a1a]'
                        : 'border-[#080808] bg-[#f8f8f8]'
                      : hairlineColor
                  } ${cardBg} hover:border-current/40`}
                >
                  <div className="relative overflow-hidden aspect-[16/11] mb-4">
                    <img
                      src={story.coverImage.url}
                      alt={story.storyTitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 text-[8px] uppercase tracking-[0.22em] bg-black/75 text-white">
                        {story.frameCode}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[8.5px] uppercase tracking-[0.22em] opacity-60">
                      <span>{story.location}</span>
                      <span>{story.seasonYear}</span>
                    </div>

                    <h4 className="font-editorial text-xl group-hover:opacity-75 transition-opacity">
                      {story.couple}
                    </h4>

                    <p className={`text-xs font-light line-clamp-2 ${subtextColor}`}>
                      {story.monographText}
                    </p>

                    <div className="pt-3 border-t border-current/10 flex items-center justify-between text-[9px] uppercase tracking-[0.22em]">
                      <span className="opacity-50">{story.filmStock.split('·')[0]}</span>
                      <span className="font-medium underline underline-offset-4">
                        {activeStoryIndex === idx ? 'VIEWING MONOGRAPH' : 'LOAD MONOGRAPH →'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =========================================================================
              4. CALL TO ACTION / INQUIRY BANNER
          ========================================================================= */}
          <div className={`p-8 sm:p-12 md:p-16 border ${hairlineColor} ${cardBg} text-center space-y-6`}>
            <span className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-[0.28em] opacity-60">
              <Sparkles className="w-3 h-3 text-amber-500" />
              COMMISSION DIARY // MMXXVI & MMXXVII
            </span>

            <h3 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal max-w-2xl mx-auto leading-tight">
              Every celebration deserves timeless documentation.
            </h3>

            <p className={`text-xs sm:text-sm font-light max-w-lg mx-auto ${subtextColor}`}>
              We accept a deliberately limited number of commissions each season to ensure uncompromising artistic immersion and bespoke film mastery.
            </p>

            <div className="pt-4">
              <button
                onClick={onOpenInquiry}
                className={`inline-flex items-center gap-2 px-8 py-3.5 text-[10px] sm:text-[11px] uppercase tracking-[0.26em] font-medium transition-all duration-300 border ${
                  isDarkMode
                    ? 'border-[#f7f4ed] bg-[#f7f4ed] text-[#0c0c0c] hover:bg-transparent hover:text-[#f7f4ed]'
                    : 'border-[#080808] bg-[#080808] text-white hover:bg-transparent hover:text-[#080808]'
                }`}
              >
                <span>REQUEST AVAILABILITY & COMMISSIONS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
