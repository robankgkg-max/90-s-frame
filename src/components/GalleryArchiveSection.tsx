import React from 'react';
import { LightboxImage } from './LightboxModal';
import { GALLERY_ITEMS, toLightboxImage, GalleryItem } from '../data/galleryManifest';

interface GalleryArchiveSectionProps {
  onSelectImage: (image: LightboxImage) => void;
  onOpenMenu?: () => void;
}

export const GalleryArchiveSection: React.FC<GalleryArchiveSectionProps> = ({
  onSelectImage,
}) => {
  // Helper to lookup items by ID cleanly
  const getItem = (id: string): GalleryItem => {
    const item = GALLERY_ITEMS.find((it) => it.id === id);
    if (!item) {
      return GALLERY_ITEMS[0];
    }
    return item;
  };

  // Aspect ratio & height standards for the gallery:
  // All portrait/vertical frames share PORTRAIT_ASPECT ('aspect-[9/13.5]' = 2:3 ratio)
  // Standard grid landscape frames share LANDSCAPE_ASPECT ('aspect-[16/10]')
  // Standalone full-width hero landscape frames share HERO_LANDSCAPE_ASPECT ('aspect-[16/8.6]'):
  // Scaled down in height by ~14% from 16/10 to give breathing room before captions while keeping large cinematic presence
  const PORTRAIT_ASPECT = 'aspect-[9/13.5]';
  const LANDSCAPE_ASPECT = 'aspect-[16/10]';
  const HERO_LANDSCAPE_ASPECT = 'aspect-[16/8.6]';
  // Frames 6 & 7 Aspect Standard (Plan A):
  // - Mobile & Tablet (< lg): Restored exact vertical images (PORTRAIT_ASPECT 'aspect-[9/13.5]'), completely untouched.
  // - Desktop (lg+): Plan A — true vertical portrait with controlled height (min-h 500px, max-h 580px-620px)
  //   so it fits cleanly on Mac screens without overflowing the viewport.
  const FRAMES_6_7_ASPECT =
    'aspect-[9/13.5] lg:min-h-[500px] lg:max-h-[580px] xl:max-h-[620px]';

  // Reusable frame component for consistent editorial styling & zero CLS
  const PhotoFrame: React.FC<{
    item: GalleryItem;
    aspectRatioClass?: string;
    objectPosition?: string;
    priority?: boolean;
    className?: string;
  }> = ({
    item,
    aspectRatioClass = PORTRAIT_ASPECT,
    objectPosition,
    priority = false,
    className = '',
  }) => {
    const resolvedPosition = objectPosition || item.objectPosition || 'center center';
    return (
      <div className={`flex flex-col group select-none ${className}`}>
        <div
          onClick={() => onSelectImage(toLightboxImage(item))}
          className={`relative w-full ${aspectRatioClass} bg-[#161513] overflow-hidden cursor-pointer`}
        >
          <img
            src={item.url}
            alt={item.alt}
            loading={priority ? 'eager' : 'lazy'}
            referrerPolicy="no-referrer"
            style={{ objectPosition: resolvedPosition }}
            className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-700 ease-out will-change-transform"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-white/[0.03] transition-colors duration-500 pointer-events-none" />
        </div>
        {item.caption && (
          <div className="mt-2 sm:mt-2.5 md:mt-3.5">
            <p className="text-[8px] xs:text-[8.5px] sm:text-[9.5px] md:text-[10px] uppercase tracking-[0.18em] xs:tracking-[0.2em] sm:tracking-[0.24em] font-medium text-[#D5CEC2] leading-tight">
              {item.caption}
            </p>
          </div>
        )}
      </div>
    );
  };

  // Editorial Text Panel Component
  const EditorialTextPanel: React.FC<{
    lines: string[];
    className?: string;
    textClassName?: string;
    spaceClassName?: string;
    paddingClassName?: string;
    aspectRatioClass?: string;
    subtitle?: string;
    subtitleClassName?: string;
    eyebrow?: string;
    eyebrowClassName?: string;
  }> = ({
    lines,
    className = '',
    textClassName = 'text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px] leading-[1.08] tracking-[0.04em]',
    spaceClassName = 'space-y-1 xs:space-y-1.5 sm:space-y-2',
    paddingClassName = 'p-3.5 xs:p-5 sm:p-8 md:p-10',
    aspectRatioClass = 'aspect-square',
    subtitle,
    subtitleClassName = 'font-editorial italic font-normal text-xs sm:text-sm lg:text-base text-[#D5CEC2]/75 mt-3 sm:mt-4 tracking-[0.02em]',
    eyebrow,
    eyebrowClassName = 'text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[#D5CEC2]/60 mb-2 sm:mb-3',
  }) => {
    return (
      <div
        className={`w-full ${aspectRatioClass} bg-[#11100E] flex flex-col items-center justify-center ${paddingClassName} select-none text-center ${className}`}
      >
        {eyebrow && <p className={eyebrowClassName}>{eyebrow}</p>}
        <div className={spaceClassName}>
          {lines.map((line, idx) => (
            <p
              key={idx}
              className={`font-editorial text-[#F2EDE4] uppercase ${textClassName}`}
            >
              {line}
            </p>
          ))}
        </div>
        {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
      </div>
    );
  };

  return (
    <section
      id="archive"
      aria-label="Cinematic Film Archive"
      className="w-full bg-[#11100E] text-[#F2EDE4] py-14 sm:py-20 md:py-32 lg:py-36 px-3.5 xs:px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 selection:bg-[#F2EDE4] selection:text-[#11100E] border-t border-[#302B25]/40"
    >
      <div className="w-full max-w-[1580px] mx-auto flex flex-col">
        {/* =========================================================================
            TOP BRANDING & SECTION HEADER
            Exact replica of 'The Art of Remembering.png'
        ========================================================================= */}
        <div className="w-full mb-10 sm:mb-14 md:mb-20">
          {/* Editorial Display Heading */}
          <div className="text-left">
            <h2 className="font-editorial text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal leading-[0.92] tracking-[-0.02em] text-[#F2EDE4]">
              THE ART OF
              <br />
              REMEMBERING
            </h2>
            <p className="font-editorial italic font-normal text-base sm:text-xl md:text-2xl text-[#D5CEC2] mt-2.5 sm:mt-4 tracking-[0.015em]">
              Every frame holds a story.
            </p>
          </div>
        </div>

        {/* =========================================================================
            PRIMARY REFERENCE SEQUENCE (LOCKED COMPOSITION)
            Faithfully matches 'The Art of Remembering.png'
        ========================================================================= */}

        {/* -------------------------------------------------------------
            A. THE OPENING FRAME: Full-width Yacht Proposal (Hero Landscape)
        ------------------------------------------------------------- */}
        <div className="w-full mb-3.5 xs:mb-4 sm:mb-[28px] md:mb-[28px] lg:mb-16">
          <PhotoFrame
            item={getItem('opening-yacht-proposal')}
            aspectRatioClass={HERO_LANDSCAPE_ASPECT}
            priority={true}
          />
        </div>

        {/* -------------------------------------------------------------
            B. THE FIRST PHOTOGRAPHIC CLUSTER
            Mobile (2-column editorial):
              Row 1: Modern Bride (Col 1) | Traditional Bride (Col 2)
              Row 2: Editorial Text Panel (Col 1) | Ritual Vessel Detail (Col 2)
            Tablet/Desktop (3-column asymmetric):
              Col 1: Modern Bride | Col 2: Traditional Bride | Col 3: Text Panel + Detail
        ------------------------------------------------------------- */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3.5 xs:gap-4 sm:gap-7 md:gap-7 lg:gap-8 mb-3.5 xs:mb-4 sm:mb-7 md:mb-7 lg:mb-8 items-start">
          {/* Left: Modern Bride */}
          <div className="col-span-1 md:col-span-4">
            <PhotoFrame
              item={getItem('cluster1-skyline-bride')}
              aspectRatioClass={PORTRAIT_ASPECT}
              objectPosition="center 18%"
            />
          </div>

          {/* Centre: Traditional Bride */}
          <div className="col-span-1 md:col-span-4">
            <PhotoFrame
              item={getItem('cluster1-pink-saree-bride')}
              aspectRatioClass={PORTRAIT_ASPECT}
              objectPosition="center 20%"
            />
          </div>

          {/* Right Column: Editorial Text Panel + Ritual Vessel Detail */}
          <div className="col-span-2 md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-3.5 xs:gap-4 sm:gap-7 md:gap-7 lg:gap-8">
            <EditorialTextPanel
              lines={['LOVE IS IN', 'THE', 'DETAILS']}
              aspectRatioClass="aspect-square md:aspect-square"
            />
            <PhotoFrame
              item={getItem('cluster1-vessel-detail')}
              aspectRatioClass={LANDSCAPE_ASPECT}
              className="translate-y-[10%] md:translate-y-0"
            />
          </div>
        </div>

        {/* -------------------------------------------------------------
            C. THE SECOND PHOTOGRAPHIC CLUSTER
            Row 1: Frame 5: Black & White Celebration (Full-width hero landscape)
            Row 2: Frames 6 & 7: Candid Couple & Traditional Ceremony (Two vertical frames in a row under the 5th frame)
        ------------------------------------------------------------- */}
        <div className="w-full flex flex-col space-y-3.5 xs:space-y-4 sm:space-y-6 md:space-y-7 lg:space-y-8 mb-0 sm:mb-[14px] md:mb-[14px] lg:mb-0">
          {/* Frame 5: Black & White Celebration */}
          <div className="w-full">
            <PhotoFrame
              item={getItem('cluster2-bw-celebration')}
              aspectRatioClass={HERO_LANDSCAPE_ASPECT}
              objectPosition="center 28%"
            />
          </div>

          {/* Frames 6 & 7 (Left side) & Poetic Words Panel (Right side)
              - Mobile & Tablet (< lg): Restored exact vertical images in 2-column grid untouched
              - Desktop (lg+): Two vertical frames on left (8 cols) and poetic words panel on right (4 cols) */}
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-3.5 xs:gap-4 sm:gap-7 md:gap-7 lg:gap-8 items-start w-full">
            {/* Left Side (Desktop: 8 cols, Mobile/Tablet: 2 cols): Two Vertical Frames */}
            <div className="col-span-2 lg:col-span-8 grid grid-cols-2 gap-3.5 xs:gap-4 sm:gap-7 md:gap-7 lg:gap-8 items-start">
              <div className="col-span-1">
                <PhotoFrame
                  item={getItem('cluster2-candid-sunlight-couple')}
                  aspectRatioClass={FRAMES_6_7_ASPECT}
                  objectPosition="center 30%"
                />
              </div>
              <div className="col-span-1">
                <PhotoFrame
                  item={getItem('chA-traditional-ceremony')}
                  aspectRatioClass={FRAMES_6_7_ASPECT}
                  objectPosition="center 42%"
                />
              </div>
            </div>

            {/* Right Side (Desktop: 4 cols): Poetic Editorial Words Panel */}
            <div className="hidden lg:flex lg:col-span-4 flex-col select-none">
              <EditorialTextPanel
                lines={[
                  'SOME THINGS',
                  'STAY WITH US',
                  'AS IT FELT',
                ]}
                aspectRatioClass={FRAMES_6_7_ASPECT}
                paddingClassName="p-4 lg:p-8 xl:p-12"
                textClassName="text-xl sm:text-2xl md:text-3xl lg:text-[26px] xl:text-[32px] 2xl:text-[36px] leading-[1.12] tracking-[0.05em]"
                spaceClassName="space-y-2 lg:space-y-3 xl:space-y-4"
                subtitle="Untouched by time, held forever in the quiet light."
                subtitleClassName="font-editorial italic font-normal text-xs lg:text-[13px] xl:text-sm text-[#D5CEC2]/75 mt-4 lg:mt-6 tracking-[0.02em] max-w-[260px] leading-relaxed"
              />
              <div className="mt-2 sm:mt-2.5 md:mt-3.5">
                <p className="text-[8px] xs:text-[8.5px] sm:text-[9.5px] md:text-[10px] uppercase tracking-[0.18em] xs:tracking-[0.2em] sm:tracking-[0.24em] font-medium text-[#D5CEC2] leading-tight">
                  UNSCRIPTED MEMORY
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            EXTENDED CONTINUATION (SECTIONS 04 & 11)
            Natural, continuous scroll through Chapters A, B, C, D
        ========================================================================= */}

        {/* -------------------------------------------------------------
            EXTENDED CHAPTER A: THE TRADITION AND CELEBRATION SEQUENCE
            Text Panel: IN THAT MOMENT EVERY BLESSING BECAME OUR OWN
        ------------------------------------------------------------- */}
        <div className="w-full flex flex-col space-y-3.5 xs:space-y-4 sm:space-y-7 md:space-y-7 lg:space-y-8 mb-0 sm:mb-[14px] md:mb-[14px] lg:mb-0 pt-3.5 xs:pt-4 sm:pt-[14px] md:pt-[14px] lg:pt-8 border-t border-[#302B25]/40">
          {/* Row 1: Editorial Verse Panel & Bridal Intimacy (Image 8)
              - Mobile & Tablet (< lg): 100% untouched original 2-column diptych (Text on left, Image 8 on right)
              - Desktop (lg+): Balanced 3-column triptych:
                  * Left (4 cols): 'IN THAT MOMENT, EVERY' + poetic lead-in verse
                  * Center (4 cols): Image 8 (Bridal Intimacy) with controlled vertical frame height
                  * Right (4 cols): 'BLESSING BECAME OUR OWN.' + 'The sacred cadence of tradition, woven into a quiet promise.'
          */}

          {/* --- MOBILE & TABLET (< lg): Untouched 2-column layout --- */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3.5 xs:gap-4 sm:gap-7 md:gap-7 items-start lg:hidden">
            <div className="col-span-1 md:col-span-6 flex flex-col select-none">
              <EditorialTextPanel
                lines={[
                  'IN THAT',
                  'MOMENT',
                  'EVERY',
                  'BLESSING',
                  'BECAME',
                  'OUR OWN',
                ]}
                aspectRatioClass={PORTRAIT_ASPECT}
                paddingClassName="p-2.5 xs:p-3 sm:p-5 md:p-6"
                textClassName="text-[19px] xs:text-[23px] sm:text-[31px] md:text-[38px] leading-[1.10] tracking-[0.05em]"
                spaceClassName="space-y-1.5 xs:space-y-2 sm:space-y-3 md:space-y-4"
                subtitle="The sacred cadence of tradition, woven into a quiet promise."
                subtitleClassName="font-editorial italic font-normal text-xs sm:text-[13px] text-[#D5CEC2]/75 mt-3 sm:mt-4 tracking-[0.02em] max-w-[240px] leading-relaxed hidden sm:block"
              />
            </div>
            <div className="col-span-1 md:col-span-6">
              <PhotoFrame
                item={getItem('chA-bridal-intimacy')}
                aspectRatioClass={PORTRAIT_ASPECT}
                objectPosition="center 20%"
              />
            </div>
          </div>

          {/* --- DESKTOP (lg+): 3-Column Editorial Triptych --- */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 items-start w-full">
            {/* Left Panel (Cols 1-4): 'IN THAT MOMENT, EVERY' */}
            <div className="lg:col-span-4 flex flex-col select-none">
              <EditorialTextPanel
                eyebrow="CHAPTER A // 01"
                eyebrowClassName="text-[9px] xl:text-[10px] uppercase tracking-[0.24em] text-[#D5CEC2]/60 mb-3 xl:mb-4"
                lines={[
                  'IN THAT',
                  'MOMENT,',
                  'EVERY',
                ]}
                aspectRatioClass={FRAMES_6_7_ASPECT}
                paddingClassName="p-6 lg:p-8 xl:p-12"
                textClassName="text-2xl lg:text-[28px] xl:text-[34px] 2xl:text-[38px] leading-[1.12] tracking-[0.05em]"
                spaceClassName="space-y-2 lg:space-y-3 xl:space-y-4"
                subtitle="The sacred cadence of tradition..."
                subtitleClassName="font-editorial italic font-normal text-xs lg:text-[13px] xl:text-sm text-[#D5CEC2]/75 mt-4 lg:mt-6 tracking-[0.02em] max-w-[240px] leading-relaxed text-center"
              />
              <div className="mt-2 sm:mt-2.5 md:mt-3.5">
                <p className="text-[8px] xs:text-[8.5px] sm:text-[9.5px] md:text-[10px] uppercase tracking-[0.18em] xs:tracking-[0.2em] sm:tracking-[0.24em] font-medium text-[#D5CEC2] leading-tight">
                  CHAPTER A // INCEPTION
                </p>
              </div>
            </div>

            {/* Center Panel (Cols 5-8): Image 8 (The Bridal Heirloom) */}
            <div className="lg:col-span-4">
              <PhotoFrame
                item={getItem('chA-bridal-intimacy')}
                aspectRatioClass={FRAMES_6_7_ASPECT}
                objectPosition="center 20%"
              />
            </div>

            {/* Right Panel (Cols 9-12): 'BLESSING BECAME OUR OWN.' + Poetic Resolution */}
            <div className="lg:col-span-4 flex flex-col select-none">
              <EditorialTextPanel
                eyebrow="CHAPTER A // 02"
                eyebrowClassName="text-[9px] xl:text-[10px] uppercase tracking-[0.24em] text-[#D5CEC2]/60 mb-3 xl:mb-4"
                lines={[
                  'BLESSING',
                  'BECAME',
                  'OUR OWN.',
                ]}
                aspectRatioClass={FRAMES_6_7_ASPECT}
                paddingClassName="p-6 lg:p-8 xl:p-12"
                textClassName="text-2xl lg:text-[28px] xl:text-[34px] 2xl:text-[38px] leading-[1.12] tracking-[0.05em]"
                spaceClassName="space-y-2 lg:space-y-3 xl:space-y-4"
                subtitle="...woven into a quiet promise."
                subtitleClassName="font-editorial italic font-normal text-xs lg:text-[13px] xl:text-sm text-[#D5CEC2]/75 mt-4 lg:mt-6 tracking-[0.02em] max-w-[240px] leading-relaxed text-center"
              />
              <div className="mt-2 sm:mt-2.5 md:mt-3.5">
                <p className="text-[8px] xs:text-[8.5px] sm:text-[9.5px] md:text-[10px] uppercase tracking-[0.18em] xs:tracking-[0.2em] sm:tracking-[0.24em] font-medium text-[#D5CEC2] leading-tight">
                  CHAPTER A // SACRED UNION
                </p>
              </div>
            </div>
          </div>

          {/* Row 2: Grand Ceremonial Gathering (Wide) + Festive Procession */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3.5 xs:gap-4 sm:gap-7 md:gap-7 lg:gap-8 items-start">
            <div className="col-span-2 md:col-span-8">
              <PhotoFrame
                item={getItem('chA-ceremonial-gathering')}
                aspectRatioClass={LANDSCAPE_ASPECT}
              />
            </div>
            {/* Desktop & Tablet: Image 10 in right 4-column span */}
            <div className="hidden md:block md:col-span-4">
              <PhotoFrame
                item={getItem('chA-festive-procession')}
                aspectRatioClass={PORTRAIT_ASPECT}
                objectPosition="center 25%"
              />
            </div>
            {/* Mobile Only: Images 10 and 11 placed like a vertical image two in a row */}
            <div className="col-span-2 md:hidden grid grid-cols-2 gap-3.5 xs:gap-4 sm:gap-7 items-start">
              <div className="col-span-1">
                <PhotoFrame
                  item={getItem('chA-festive-procession')}
                  aspectRatioClass={PORTRAIT_ASPECT}
                  objectPosition="center 25%"
                />
              </div>
              <div className="col-span-1">
                <PhotoFrame
                  item={getItem('chB-ivory-architecture')}
                  aspectRatioClass={PORTRAIT_ASPECT}
                  objectPosition="center 25%"
                />
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            EXTENDED CHAPTER B: INTIMATE MOMENTS
            Text Panel: THE QUIET BETWEEN MOMENTS
        ------------------------------------------------------------- */}
        <div className="w-full flex flex-col space-y-3.5 xs:space-y-4 sm:space-y-7 md:space-y-7 lg:space-y-8 mb-0 sm:mb-[14px] md:mb-[14px] lg:mb-0 pt-3.5 xs:pt-4 sm:pt-[14px] md:pt-[14px] lg:pt-8 border-t border-[#302B25]/40">
          {/* Row 1: Neoclassical Silhouette + Waterfront Reverie & Text Panel */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3.5 xs:gap-4 sm:gap-7 md:gap-7 lg:gap-8 items-start">
            {/* Desktop & Tablet: Image 11 in left 5-column span */}
            <div className="hidden md:block md:col-span-5">
              <PhotoFrame
                item={getItem('chB-ivory-architecture')}
                aspectRatioClass={PORTRAIT_ASPECT}
                objectPosition="center 25%"
              />
            </div>
            <div className="col-span-2 md:col-span-7 flex flex-col space-y-3.5 xs:space-y-4 sm:space-y-3 md:space-y-4">
              <div className="w-full">
                <PhotoFrame
                  item={getItem('chB-blue-gown-reverie')}
                  aspectRatioClass={LANDSCAPE_ASPECT}
                  objectPosition="center 30%"
                />
              </div>
              <div className="w-full">
                <EditorialTextPanel
                  lines={['THE QUIET BETWEEN', 'MOMENTS']}
                  aspectRatioClass="aspect-[16/6.9] sm:aspect-[16/6.45] md:aspect-[16/6.9] lg:aspect-[16/6.45]"
                  paddingClassName="py-2.5 px-3 xs:py-3.5 xs:px-4 sm:py-5 sm:px-6 md:py-5 md:px-7 lg:py-7 lg:px-9"
                  textClassName="text-[17px] xs:text-[20px] sm:text-[26px] md:text-[30px] lg:text-[38px] xl:text-[43px] leading-[1.08] tracking-[0.05em] sm:tracking-[0.06em]"
                  spaceClassName="space-y-1 xs:space-y-1.5 sm:space-y-2 md:space-y-2.5"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Three Intimate Frames */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 xs:gap-4 sm:gap-7 md:gap-7 lg:gap-8 items-start">
            <div className="col-span-1">
              <PhotoFrame
                item={getItem('chB-tender-touch')}
                aspectRatioClass={PORTRAIT_ASPECT}
              />
            </div>
            <div className="col-span-1">
              <PhotoFrame
                item={getItem('chB-solitary-reflection')}
                aspectRatioClass={PORTRAIT_ASPECT}
                objectPosition="center 20%"
              />
            </div>
            <div className="col-span-2 md:col-span-1 mt-0 md:mt-0">
              <PhotoFrame
                item={getItem('chB-veil-whisper')}
                aspectRatioClass="aspect-[16/9.03] md:aspect-[9/13.5]"
              />
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            EXTENDED CHAPTER C: THE ATMOSPHERE AND SETTING
            Text Panels: IN A WORLD OF OUR OWN & WE FOUND FOREVER
        ------------------------------------------------------------- */}
        <div className="w-full flex flex-col space-y-3.5 xs:space-y-4 sm:space-y-7 md:space-y-7 lg:space-y-8 mb-0 sm:mb-[14px] md:mb-[14px] lg:mb-0 pt-3.5 xs:pt-4 sm:pt-6 md:pt-8 border-t border-[#302B25]/40">
          {/* Full-width Panoramic: Amalfi Cliffside Terrace with Bougainvillea (Frame 16) */}
          <div className="w-full">
            <PhotoFrame
              item={getItem('chC-coastal-bougainvillea')}
              aspectRatioClass="aspect-[16/9.03] md:aspect-[16/8.6]"
              objectPosition="center 35%"
            />
          </div>

          {/* Row 2: Pink Parasol Promenade & WE FOUND FOREVER (Left) + IN A WORLD OF OUR OWN & Groom Portrait (Right) */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3.5 xs:gap-4 sm:gap-7 md:gap-7 lg:gap-8 items-start">
            {/* Left Column: Frame 17 (chC-pink-parasol-promenade) + Lower Left Panel (WE FOUND FOREVER) */}
            <div className="col-span-1 md:col-span-5 flex flex-col space-y-3.5 xs:space-y-4 sm:space-y-6 md:space-y-8">
              <PhotoFrame
                item={getItem('chC-pink-parasol-promenade')}
                aspectRatioClass={PORTRAIT_ASPECT}
                objectPosition="center 28%"
              />
              <EditorialTextPanel
                lines={['WE FOUND', 'FOREVER']}
                aspectRatioClass="aspect-square sm:aspect-[16/8]"
                textClassName="text-base xs:text-lg sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px] leading-[1.08] tracking-[0.04em]"
              />
            </div>

            {/* Right Column: Top Right Panel (IN A WORLD OF OUR OWN) + Frame 18 (Groom Portrait)
                - Mobile & Tablet (< lg): Exact original responsive layout, 100% untouched
                - Desktop (lg+): Increased Image 18 height so its bottom aligns naturally past 'WE FOUND FOREVER'
                  with vertical framing (aspect-[18/25], clamped to 720px–770px)
                  and centered max-width (540px–580px) matching the companion text panel.
            */}
            <div className="col-span-1 md:col-span-7 flex flex-col space-y-3.5 xs:space-y-4 sm:space-y-6 md:space-y-8">
              <EditorialTextPanel
                lines={['IN A WORLD OF', 'OUR OWN']}
                aspectRatioClass="aspect-square sm:aspect-[16/8]"
                className="w-full lg:max-w-[540px] xl:max-w-[580px] lg:mx-auto"
                textClassName="text-base xs:text-lg sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px] leading-[1.08] tracking-[0.04em]"
              />
              <PhotoFrame
                item={getItem('chC-twilight-landscape')}
                aspectRatioClass="aspect-[9/13.5] lg:aspect-[18/25] lg:max-h-[720px] xl:max-h-[770px]"
                className="w-full lg:max-w-[540px] xl:max-w-[580px] lg:mx-auto"
                objectPosition="center 20%"
              />
            </div>
            {/* Frame 20 (The Whispered Toast / Candid Embrace):
                Full-width landscape frame across mobile (col-span-2), tablet, and desktop (md:col-span-12) */}
            <div className="col-span-2 md:col-span-12">
              <PhotoFrame
                item={getItem('chC-candid-embrace')}
                aspectRatioClass={HERO_LANDSCAPE_ASPECT}
                objectPosition="center 25%"
              />
            </div>
          </div>

          {/* Botanical Floral Detail (Frame 21) - "DETAILS THAT MATTER"
              - Tablet (< lg): Exact original centered layout, 100% untouched
              - Mobile (< sm): Hidden, untouched
              - Desktop (lg+): 3-column editorial composition with poetic words on left and right flanking the center frame */}
          <div className="hidden sm:block lg:hidden w-full max-w-2xl mx-auto">
            <PhotoFrame
              item={getItem('chC-floral-detail')}
              aspectRatioClass={LANDSCAPE_ASPECT}
            />
          </div>

          {/* Desktop Only (lg+): Editorial Triptych flanking DETAILS THAT MATTER */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 items-stretch w-full">
            {/* Left Column (Cols 1-3): Poetic Editorial Words */}
            <div className="lg:col-span-3 flex flex-col select-none">
              <EditorialTextPanel
                eyebrow="CHAPTER C // THE ESSENCE"
                eyebrowClassName="text-[9px] xl:text-[10px] uppercase tracking-[0.24em] text-[#D5CEC2]/60 mb-2.5 xl:mb-3.5"
                lines={['WHAT THE', 'HEART', 'NOTICES']}
                className="flex-1 w-full min-h-0"
                aspectRatioClass="h-full min-h-[300px]"
                paddingClassName="p-4 lg:p-6 xl:p-8"
                textClassName="text-xl lg:text-[22px] xl:text-[26px] 2xl:text-[30px] leading-[1.12] tracking-[0.05em]"
                spaceClassName="space-y-1.5 lg:space-y-2.5 xl:space-y-3"
                subtitle="Whispered in silk, cradled in sacred light."
                subtitleClassName="font-editorial italic font-normal text-xs lg:text-[13px] xl:text-sm text-[#D5CEC2]/75 mt-3 lg:mt-4 xl:mt-5 tracking-[0.02em] max-w-[220px] leading-relaxed text-center"
              />
              <div className="mt-2 sm:mt-2.5 md:mt-3.5">
                <p className="text-[8px] xs:text-[8.5px] sm:text-[9.5px] md:text-[10px] uppercase tracking-[0.18em] xs:tracking-[0.2em] sm:tracking-[0.24em] font-medium text-[#D5CEC2] leading-tight">
                  THE UNSEEN GRACE
                </p>
              </div>
            </div>

            {/* Center Column (Cols 4-9 = 6 cols): Floral Detail Frame */}
            <div className="lg:col-span-6 flex flex-col">
              <PhotoFrame
                item={getItem('chC-floral-detail')}
                aspectRatioClass={LANDSCAPE_ASPECT}
              />
            </div>

            {/* Right Column (Cols 10-12 = 3 cols): Poetic Editorial Words */}
            <div className="lg:col-span-3 flex flex-col select-none">
              <EditorialTextPanel
                eyebrow="CHAPTER C // THE IMPRINT"
                eyebrowClassName="text-[9px] xl:text-[10px] uppercase tracking-[0.24em] text-[#D5CEC2]/60 mb-2.5 xl:mb-3.5"
                lines={['A LIFETIME', 'WRITTEN', 'IN BLOOM']}
                className="flex-1 w-full min-h-0"
                aspectRatioClass="h-full min-h-[300px]"
                paddingClassName="p-4 lg:p-6 xl:p-8"
                textClassName="text-xl lg:text-[22px] xl:text-[26px] 2xl:text-[30px] leading-[1.12] tracking-[0.05em]"
                spaceClassName="space-y-1.5 lg:space-y-2.5 xl:space-y-3"
                subtitle="...where fleeting beauty turns eternal."
                subtitleClassName="font-editorial italic font-normal text-xs lg:text-[13px] xl:text-sm text-[#D5CEC2]/75 mt-3 lg:mt-4 xl:mt-5 tracking-[0.02em] max-w-[220px] leading-relaxed text-center"
              />
              <div className="mt-2 sm:mt-2.5 md:mt-3.5">
                <p className="text-[8px] xs:text-[8.5px] sm:text-[9.5px] md:text-[10px] uppercase tracking-[0.18em] xs:tracking-[0.2em] sm:tracking-[0.24em] font-medium text-[#D5CEC2] leading-tight">
                  BOTANICAL MEMORY
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            EXTENDED CHAPTER D: THE FINAL PHOTOGRAPHIC SEQUENCE
            Text Panel: WHAT WE KEEP, WE REMEMBER
        ------------------------------------------------------------- */}
        <div className="w-full flex flex-col space-y-3.5 xs:space-y-4 sm:space-y-7 md:space-y-7 lg:space-y-8 mb-0 sm:mb-[14px] md:mb-[14px] lg:mb-0 pt-3.5 xs:pt-4 sm:pt-[14px] md:pt-[14px] lg:pt-8 border-t border-[#302B25]/40">
          {/* Row 1: The Slow Dance (Frame 22) + Midnight Departure (Frame 23) */}
          {/* Desktop & Tablet: Wide 2/3 + 1/3 composition */}
          <div className="hidden md:grid md:grid-cols-12 gap-3.5 xs:gap-4 sm:gap-7 md:gap-7 lg:gap-8 items-start">
            <div className="md:col-span-8">
              <PhotoFrame
                item={getItem('chD-evening-dance')}
                aspectRatioClass={LANDSCAPE_ASPECT}
                objectPosition="center 30%"
              />
            </div>
            <div className="md:col-span-4">
              <PhotoFrame
                item={getItem('chD-parting-glance')}
                aspectRatioClass={PORTRAIT_ASPECT}
                objectPosition="center 25%"
              />
            </div>
          </div>

          {/* Mobile: Frames 22 & 23 positioned side-by-side in vertical format sharing single consistent portrait height */}
          <div className="grid grid-cols-2 gap-3.5 xs:gap-4 sm:gap-7 items-start md:hidden !mt-0">
            <div className="col-span-1">
              <PhotoFrame
                item={getItem('chD-evening-dance')}
                aspectRatioClass={PORTRAIT_ASPECT}
                objectPosition="center 30%"
              />
            </div>
            <div className="col-span-1">
              <PhotoFrame
                item={getItem('chD-parting-glance')}
                aspectRatioClass={PORTRAIT_ASPECT}
                objectPosition="center 25%"
              />
            </div>
          </div>

          {/* Concluding Row: Starlit Balcony (Frame 24) + Final Text Panel + The Enduring Knot (Frame 25) */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3.5 xs:gap-4 sm:gap-7 md:gap-7 lg:gap-8 items-start">
            <div className="col-span-1 md:col-span-4">
              <PhotoFrame
                item={getItem('chD-starlit-silhouettes')}
                aspectRatioClass={PORTRAIT_ASPECT}
                objectPosition="center 35%"
              />
            </div>
            <div className="col-span-1 md:col-span-8 flex flex-col space-y-3.5 xs:space-y-4 sm:space-y-7 md:space-y-7 lg:space-y-8">
              <EditorialTextPanel
                lines={['WHAT WE KEEP,', 'WE REMEMBER']}
                aspectRatioClass="aspect-[9/13.5] sm:aspect-[16/8] md:aspect-[16/7]"
              />
              <div className="hidden md:block">
                <PhotoFrame
                  item={getItem('chD-final-vow')}
                  aspectRatioClass={LANDSCAPE_ASPECT}
                  objectPosition="center 30%"
                />
              </div>
            </div>
            {/* On Mobile: Enduring Knot appears full width as the majestic final closure */}
            <div className="col-span-2 md:hidden">
              <PhotoFrame
                item={getItem('chD-final-vow')}
                aspectRatioClass={LANDSCAPE_ASPECT}
                objectPosition="center 30%"
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
            CONTINUATION ARCHIVE (CHAPTER E & CHAPTER F: 12 NEW CURATED FRAMES)
            Extends the gallery seamlessly from frame 24 through frame 36
        ========================================================================= */}

        {/* -------------------------------------------------------------
            EXTENDED CHAPTER E: THE MEMORY AND THE COVENANT (FRAMES 25 - 31)
            Text Panel: WHERE EVERY STORY BEGINS
        ------------------------------------------------------------- */}
        <div className="w-full flex flex-col space-y-3.5 xs:space-y-4 sm:space-y-7 md:space-y-7 lg:space-y-8 mb-0 sm:mb-[14px] md:mb-[14px] lg:mb-0 pt-3.5 xs:pt-4 sm:pt-[14px] md:pt-[14px] lg:pt-8 border-t border-[#302B25]/40">
          {/* Frame 25: The Azure Horizon (Where Every Story Begins) */}
          {/* Mobile: Editorial Text Panel (Left) + Vertical Portrait (Right) */}
          {/* Tablet & Desktop: Large Standalone Hero Landscape */}
          <div className="grid grid-cols-2 gap-3.5 xs:gap-4 items-start md:block md:w-full">
            {/* Mobile Only: Left Editorial Text Panel */}
            <div className="col-span-1 md:hidden">
              <EditorialTextPanel
                lines={['HELD CLOSE', 'KEPT FOREVER']}
                aspectRatioClass={PORTRAIT_ASPECT}
                paddingClassName="py-2.5 px-3 xs:py-3.5 xs:px-4"
                textClassName="text-[17px] xs:text-[20px] leading-[1.12] tracking-[0.05em] xs:tracking-[0.06em]"
                spaceClassName="space-y-1 xs:space-y-1.5"
              />
            </div>
            {/* Right: Where Every Story Begins (Vertical on Mobile, Full-width Hero on Desktop/Tablet) */}
            <div className="col-span-1 md:w-full">
              <PhotoFrame
                item={getItem('chE-azure-reverie')}
                aspectRatioClass="aspect-[9/13.5] md:aspect-[16/8.6]"
                objectPosition="center 40%"
              />
            </div>
          </div>

          {/* Group 1: Paired Vertical Portraits on Left (Frame 26: THE SILENCE OF TIME & Frame 27: ALL THAT WORDS CANNOT HOLD) + Poetic Words Panel on Right
              - Mobile & Tablet (< lg): 100% untouched 2-column grid of vertical portraits
              - Desktop (lg+): Two vertical frames on left (8 cols) and poetic words panel on right (4 cols), identical to Frames 6 & 7 standard
          */}
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-3.5 xs:gap-4 sm:gap-7 md:gap-7 lg:gap-8 items-start w-full">
            {/* Left Side (Desktop: 8 cols, Mobile/Tablet: 2 cols): Two Vertical Frames */}
            <div className="col-span-2 lg:col-span-8 grid grid-cols-2 gap-3.5 xs:gap-4 sm:gap-7 md:gap-7 lg:gap-8 items-start">
              <div className="col-span-1">
                <PhotoFrame
                  item={getItem('chE-monumental-elegance')}
                  aspectRatioClass={FRAMES_6_7_ASPECT}
                  objectPosition="center 20%"
                />
              </div>
              <div className="col-span-1">
                <PhotoFrame
                  item={getItem('chE-embroidered-heritage')}
                  aspectRatioClass={FRAMES_6_7_ASPECT}
                  objectPosition="center 25%"
                />
              </div>
            </div>

            {/* Right Side (Desktop: 4 cols): Poetic Editorial Words Panel */}
            <div className="hidden lg:flex lg:col-span-4 flex-col select-none">
              <EditorialTextPanel
                lines={[
                  'WHAT REMAINS',
                  'WHEN WORDS',
                  'FALL SILENT',
                ]}
                aspectRatioClass={FRAMES_6_7_ASPECT}
                paddingClassName="p-4 lg:p-8 xl:p-12"
                textClassName="text-xl sm:text-2xl md:text-3xl lg:text-[26px] xl:text-[32px] 2xl:text-[36px] leading-[1.12] tracking-[0.05em]"
                spaceClassName="space-y-2 lg:space-y-3 xl:space-y-4"
                subtitle="A quiet eternity held between the sacred architectures of love."
                subtitleClassName="font-editorial italic font-normal text-xs lg:text-[13px] xl:text-sm text-[#D5CEC2]/75 mt-4 lg:mt-6 tracking-[0.02em] max-w-[260px] leading-relaxed"
              />
              <div className="mt-2 sm:mt-2.5 md:mt-3.5">
                <p className="text-[8px] xs:text-[8.5px] sm:text-[9.5px] md:text-[10px] uppercase tracking-[0.18em] xs:tracking-[0.2em] sm:tracking-[0.24em] font-medium text-[#D5CEC2] leading-tight">
                  SILENT ETERNITY
                </p>
              </div>
            </div>
          </div>

          {/* Group 2: Asymmetric Editorial Pair - Text Panel + Quiet Covenant (Frame 28: A LIFE, BEAUTIFULLY SHARED) */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-x-3.5 xs:gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-3.5 xs:gap-y-4 sm:gap-y-3 md:gap-y-0 items-stretch">
            <div className="col-span-2 md:col-span-5 flex flex-col">
              <EditorialTextPanel
                lines={['WHERE EVERY', 'STORY BEGINS']}
                aspectRatioClass="aspect-[16/6.9] sm:aspect-[16/6.45] md:aspect-auto md:h-full"
                className="h-full"
                paddingClassName="py-2.5 px-3 xs:py-3.5 xs:px-4 sm:py-5 sm:px-6 md:p-8 lg:p-10"
                textClassName="text-[17px] xs:text-[20px] sm:text-[26px] md:text-[30px] lg:text-[38px] xl:text-[43px] leading-[1.08] tracking-[0.05em] sm:tracking-[0.06em]"
                spaceClassName="space-y-1 xs:space-y-1.5 sm:space-y-2 md:space-y-2.5"
              />
            </div>
            <div className="col-span-2 md:col-span-7">
              <PhotoFrame
                item={getItem('chE-unspoken-devotion')}
                aspectRatioClass={LANDSCAPE_ASPECT}
                objectPosition="center center"
              />
            </div>
          </div>

          {/* Frame 29: Standalone Full-Width Hero Landscape - The Tyrrhenian Vista */}
          <div className="w-full">
            <PhotoFrame
              item={getItem('chE-coastal-sanctuary')}
              aspectRatioClass={HERO_LANDSCAPE_ASPECT}
              objectPosition="center 45%"
            />
          </div>

          {/* Group 3: Sacred Glow (Frame 30) + Shared Benediction (Frame 31) / Editorial Panel */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3.5 xs:gap-4 sm:gap-7 md:gap-7 lg:gap-8 items-start">
            {/* Left: Timeless Beauty (Vertical Portrait) */}
            <div className="col-span-1 md:col-span-4">
              <PhotoFrame
                item={getItem('chE-ceremonial-sanctum')}
                aspectRatioClass={PORTRAIT_ASPECT}
                objectPosition="center 22%"
              />
            </div>
            {/* Right: Mobile Editorial Text Panel (replaces small landscape on mobile) */}
            <div className="col-span-1 md:hidden">
              <EditorialTextPanel
                lines={['THE DAYS FADE', 'THE FEELING STAYS']}
                aspectRatioClass={PORTRAIT_ASPECT}
                paddingClassName="py-2.5 px-2 xs:py-3.5 xs:px-3 sm:px-4"
                textClassName="text-[14px] xs:text-[16px] sm:text-[18px] leading-[1.14] tracking-[0.04em] xs:tracking-[0.05em]"
                spaceClassName="space-y-1 xs:space-y-1.5"
              />
            </div>
            {/* Right: Desktop & Tablet Only - United in Celebration (Landscape Frame) */}
            <div className="hidden md:block md:col-span-8">
              <PhotoFrame
                item={getItem('chE-reverent-gathering')}
                aspectRatioClass={LANDSCAPE_ASPECT}
                objectPosition="center 35%"
              />
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            EXTENDED CHAPTER F: ALL THAT WORDS CANNOT HOLD (FRAMES 32 - 36)
            Text Panel: ALL THAT WORDS CANNOT HOLD
        ------------------------------------------------------------- */}
        <div className="w-full flex flex-col space-y-3.5 xs:space-y-4 sm:space-y-7 md:space-y-7 lg:space-y-8 mb-0 sm:mb-[14px] md:mb-[14px] lg:mb-0 pt-3.5 xs:pt-4 sm:pt-[14px] md:pt-[14px] lg:pt-8 border-t border-[#302B25]/40">
          {/* Group 4: Three Vertical Studies in Subtle Rhythm (Frames 32, 33, 34) */}
          {/* Desktop & Tablet: 3 columns | Mobile: 2-column editorial with balanced distribution */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 xs:gap-4 sm:gap-7 md:gap-7 lg:gap-8 items-start">
            <div className="col-span-1">
              <PhotoFrame
                item={getItem('chF-sunlit-reverie')}
                aspectRatioClass={PORTRAIT_ASPECT}
                objectPosition="center 20%"
              />
            </div>
            <div className="col-span-1">
              <PhotoFrame
                item={getItem('chF-solitary-grace')}
                aspectRatioClass={PORTRAIT_ASPECT}
                objectPosition="center 25%"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <PhotoFrame
                item={getItem('chF-translucent-poetry')}
                aspectRatioClass={PORTRAIT_ASPECT}
                objectPosition="center center"
              />
            </div>
          </div>

          {/* Group 5: Final Editorial Interlude + Twilight Celebration (Frame 35: AS NIGHT DESCENDS) on Left & Text Panel (ALL THAT WORDS CANNOT HOLD) on Right */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-x-3.5 xs:gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-3.5 xs:gap-y-4 sm:gap-y-3 md:gap-y-0 items-stretch">
            <div className="col-span-2 md:col-span-7">
              <PhotoFrame
                item={getItem('chF-twilight-celebration')}
                aspectRatioClass={LANDSCAPE_ASPECT}
                objectPosition="center 45%"
              />
            </div>
            <div className="col-span-2 md:col-span-5 flex flex-col">
              <EditorialTextPanel
                lines={['ALL THAT WORDS', 'CANNOT HOLD']}
                aspectRatioClass="aspect-[16/6.9] sm:aspect-[16/6.45] md:aspect-auto md:h-full"
                className="h-full"
                paddingClassName="py-2.5 px-3 xs:py-3.5 xs:px-4 sm:py-5 sm:px-6 md:p-8 lg:p-10"
                textClassName="text-[17px] xs:text-[20px] sm:text-[26px] md:text-[30px] lg:text-[38px] xl:text-[43px] leading-[1.08] tracking-[0.05em] sm:tracking-[0.06em]"
                spaceClassName="space-y-1 xs:space-y-1.5 sm:space-y-2 md:space-y-2.5"
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
            CONTINUATION ARCHIVE (CHAPTER G & CHAPTER H: 8 NEW CURATED FRAMES)
            Extends the gallery seamlessly from frame 36 through frame 44
        ========================================================================= */}

        {/* -------------------------------------------------------------
            EXTENDED CHAPTER G: THE ECHO OF CELEBRATION (FRAMES 37 - 40)
            Text Panel: THE ECHO OF A CELEBRATION
        ------------------------------------------------------------- */}
        <div className="w-full flex flex-col space-y-3.5 xs:space-y-4 sm:space-y-7 md:space-y-7 lg:space-y-8 mb-0 sm:mb-[14px] md:mb-[14px] lg:mb-0 pt-3.5 xs:pt-4 sm:pt-[14px] md:pt-[14px] lg:pt-8 border-t border-[#302B25]/40">
          {/* Group 1: Poetic Words Panel on Left + Paired Vertical Portraits on Right (Frame 37: GOLDEN TIDES OF DEVOTION & Frame 38: ARCHITECTURAL STILLNESS)
              - Mobile & Tablet (< lg): 100% untouched 2-column grid of vertical portraits
              - Desktop (lg+): Poetic words panel on left (4 cols) and two vertical frames on right (8 cols)
          */}
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-3.5 xs:gap-4 sm:gap-7 md:gap-7 lg:gap-8 items-start w-full">
            {/* Left Side (Desktop: 4 cols): Poetic Editorial Words Panel */}
            <div className="hidden lg:flex lg:col-span-4 flex-col select-none">
              <EditorialTextPanel
                lines={[
                  'BETWEEN TIDES',
                  'AND SACRED',
                  'STILLNESS',
                ]}
                aspectRatioClass={FRAMES_6_7_ASPECT}
                paddingClassName="p-4 lg:p-8 xl:p-12"
                textClassName="text-xl sm:text-2xl md:text-3xl lg:text-[26px] xl:text-[32px] 2xl:text-[36px] leading-[1.12] tracking-[0.05em]"
                spaceClassName="space-y-2 lg:space-y-3 xl:space-y-4"
                subtitle="Where restless waters meet enduring stone, love builds its eternal sanctuary."
                subtitleClassName="font-editorial italic font-normal text-xs lg:text-[13px] xl:text-sm text-[#D5CEC2]/75 mt-4 lg:mt-6 tracking-[0.02em] max-w-[260px] leading-relaxed"
              />
              <div className="mt-2 sm:mt-2.5 md:mt-3.5">
                <p className="text-[8px] xs:text-[8.5px] sm:text-[9.5px] md:text-[10px] uppercase tracking-[0.18em] xs:tracking-[0.2em] sm:tracking-[0.24em] font-medium text-[#D5CEC2] leading-tight">
                  COASTAL SANCTUARY
                </p>
              </div>
            </div>

            {/* Right Side (Desktop: 8 cols, Mobile/Tablet: 2 cols): Two Vertical Frames */}
            <div className="col-span-2 lg:col-span-8 grid grid-cols-2 gap-3.5 xs:gap-4 sm:gap-7 md:gap-7 lg:gap-8 items-start">
              <div className="col-span-1">
                <PhotoFrame
                  item={getItem('chG-blush-shoreline')}
                  aspectRatioClass={FRAMES_6_7_ASPECT}
                  objectPosition="center 25%"
                />
              </div>
              <div className="col-span-1">
                <PhotoFrame
                  item={getItem('chG-skyline-sculpture')}
                  aspectRatioClass={FRAMES_6_7_ASPECT}
                  objectPosition="center 20%"
                />
              </div>
            </div>
          </div>

          {/* Group 2: Asymmetric Editorial Pair - Radiant Procession (Frame 39: PULSE OF THE CELEBRATION) on Left & Text Panel (THE ECHO OF A CELEBRATION) on Right */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-x-3.5 xs:gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-3.5 xs:gap-y-4 sm:gap-y-3 md:gap-y-0 items-stretch">
            <div className="col-span-2 md:col-span-7">
              <PhotoFrame
                item={getItem('chG-festive-rhapsody')}
                aspectRatioClass={LANDSCAPE_ASPECT}
                objectPosition="center 30%"
              />
            </div>
            <div className="col-span-2 md:col-span-5 flex flex-col">
              <EditorialTextPanel
                lines={['THE ECHO OF', 'A CELEBRATION']}
                aspectRatioClass="aspect-[16/6.9] sm:aspect-[16/6.45] md:aspect-auto md:h-full"
                className="h-full"
                paddingClassName="py-2.5 px-3 xs:py-3.5 xs:px-4 sm:py-5 sm:px-6 md:p-8 lg:p-10"
                textClassName="text-[17px] xs:text-[20px] sm:text-[26px] md:text-[30px] lg:text-[38px] xl:text-[43px] leading-[1.08] tracking-[0.05em] sm:tracking-[0.06em]"
                spaceClassName="space-y-1 xs:space-y-1.5 sm:space-y-2 md:space-y-2.5"
              />
            </div>
          </div>

          {/* Frame 40: Standalone Hero Landscape - The Twilight Embrace (Where Shadows Turn to Gold - Desktop only in Chapter G) */}
          <div className="hidden md:block w-full">
            <PhotoFrame
              item={getItem('chG-sunset-whisper')}
              aspectRatioClass={HERO_LANDSCAPE_ASPECT}
              objectPosition="center 30%"
            />
          </div>
        </div>

        {/* -------------------------------------------------------------
            EXTENDED CHAPTER H: ETERNITY IN A SINGLE GLANCE (FRAMES 41 - 44)
            Text Panel: ETERNITY IN A SINGLE GLANCE
        ------------------------------------------------------------- */}
        <div className="w-full flex flex-col space-y-3.5 xs:space-y-4 sm:space-y-7 md:space-y-7 lg:space-y-8 pt-3.5 xs:pt-4 sm:pt-[14px] md:pt-[14px] lg:pt-8 border-t border-[#302B25]/40">
          {/* Group 3: Poetic Words Panel on Left + Paired Vertical Studies on Right (Frame 41: POETRY IN SILENT DETAILS & Frame 42: HONORING THE SACRED)
              - Mobile & Tablet (< lg): 100% untouched 2-column grid of vertical portraits
              - Desktop (lg+): Poetic words panel on left (4 cols) and two vertical frames on right (8 cols), matching the layout of 'ETERNITY IN A SINGLE GLANCE' below
          */}
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-3.5 xs:gap-4 sm:gap-7 md:gap-7 lg:gap-8 items-start w-full">
            {/* Left Side (Desktop: 4 cols): Poetic Editorial Words Panel */}
            <div className="hidden lg:flex lg:col-span-4 flex-col select-none">
              <EditorialTextPanel
                lines={[
                  'THE POETRY OF',
                  'SILENT THINGS',
                  'HELD SACRED',
                ]}
                aspectRatioClass={FRAMES_6_7_ASPECT}
                paddingClassName="p-4 lg:p-8 xl:p-12"
                textClassName="text-xl sm:text-2xl md:text-3xl lg:text-[26px] xl:text-[32px] 2xl:text-[36px] leading-[1.12] tracking-[0.05em]"
                spaceClassName="space-y-2 lg:space-y-3 xl:space-y-4"
                subtitle="In every quiet gesture and sacred vow, love recognizes its forever."
                subtitleClassName="font-editorial italic font-normal text-xs lg:text-[13px] xl:text-sm text-[#D5CEC2]/75 mt-4 lg:mt-6 tracking-[0.02em] max-w-[260px] leading-relaxed"
              />
              <div className="mt-2 sm:mt-2.5 md:mt-3.5">
                <p className="text-[8px] xs:text-[8.5px] sm:text-[9.5px] md:text-[10px] uppercase tracking-[0.18em] xs:tracking-[0.2em] sm:tracking-[0.24em] font-medium text-[#D5CEC2] leading-tight">
                  SACRED DEVOTION
                </p>
              </div>
            </div>

            {/* Right Side (Desktop: 8 cols, Mobile/Tablet: 2 cols): Two Vertical Frames */}
            <div className="col-span-2 lg:col-span-8 grid grid-cols-2 gap-3.5 xs:gap-4 sm:gap-7 md:gap-7 lg:gap-8 items-start">
              <div className="col-span-1">
                <PhotoFrame
                  item={getItem('chH-botanical-stillness')}
                  aspectRatioClass={FRAMES_6_7_ASPECT}
                  objectPosition="center center"
                />
              </div>
              <div className="col-span-1">
                <PhotoFrame
                  item={getItem('chH-sacred-relic')}
                  aspectRatioClass={FRAMES_6_7_ASPECT}
                  objectPosition="center center"
                />
              </div>
            </div>
          </div>

          {/* Mobile Only: Where Shadows Turn to Gold swapped to appear under the paired vertical studies */}
          <div className="block md:hidden w-full">
            <PhotoFrame
              item={getItem('chG-sunset-whisper')}
              aspectRatioClass={HERO_LANDSCAPE_ASPECT}
              objectPosition="center 30%"
            />
          </div>

          {/* Group 4: Asymmetric Editorial Pair - Moonlit Movement (Frame 43: DANCING BENEATH THE STARS) on Left & Text Panel (ETERNITY IN A SINGLE GLANCE) on Right */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-x-3.5 xs:gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-3.5 xs:gap-y-4 sm:gap-y-3 md:gap-y-0 items-stretch">
            <div className="col-span-2 md:col-span-7">
              <PhotoFrame
                item={getItem('chH-midnight-waltz')}
                aspectRatioClass={LANDSCAPE_ASPECT}
                objectPosition="center 35%"
              />
            </div>
            <div className="col-span-2 md:col-span-5 flex flex-col">
              <EditorialTextPanel
                lines={['ETERNITY IN A', 'SINGLE GLANCE']}
                aspectRatioClass="aspect-[16/6.9] sm:aspect-[16/6.45] md:aspect-auto md:h-full"
                className="h-full"
                paddingClassName="py-2.5 px-3 xs:py-3.5 xs:px-4 sm:py-5 sm:px-6 md:p-8 lg:p-10"
                textClassName="text-[17px] xs:text-[20px] sm:text-[26px] md:text-[30px] lg:text-[38px] xl:text-[43px] leading-[1.08] tracking-[0.05em] sm:tracking-[0.06em]"
                spaceClassName="space-y-1 xs:space-y-1.5 sm:space-y-2 md:space-y-2.5"
              />
            </div>
          </div>

          {/* Frame 44: Grand Archival Finale - Standalone Hero Landscape */}
          <div className="w-full">
            <PhotoFrame
              item={getItem('chH-nocturne-silhouette')}
              aspectRatioClass={HERO_LANDSCAPE_ASPECT}
              objectPosition="center 35%"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
