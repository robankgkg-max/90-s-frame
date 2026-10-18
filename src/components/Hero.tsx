import React from 'react';
import { LightboxImage } from './LightboxModal';

interface HeroProps {
  onOpenMenu: () => void;
  onOpenInquiry: () => void;
  onSelectImage: (image: LightboxImage) => void;
  onExploreStories: () => void;
}

export const HERO_IMAGES: {
  blueGown: LightboxImage;
  ivoryGown: LightboxImage;
  pinkParasol: LightboxImage;
} = {
  blueGown: {
    url: 'https://res.cloudinary.com/cbi5mcab/image/upload/v1791530489/SaveClip.App_632648246_18092819237051532_7974760865679486695_n_m1b73t.jpg',
    title: 'The Waterfront Reverie',
    subtitle: 'Cobalt silk in motion amidst the morning flight over historic waters',
    caption: 'THE WAY IT FELT',
    location: 'Istanbul Waterfront, Turkey',
    filmStock: '35mm Kodak Portra & Arri Digital Cinema',
  },
  ivoryGown: {
    url: 'https://res.cloudinary.com/cbi5mcab/image/upload/v1791530494/SaveClip.App_655225516_18072272105560922_1543333015940641887_n_mpbjew.jpg',
    title: 'The Architectural Silhouette',
    subtitle: 'Sculptural sheer pleating and quiet geometry before vows',
    caption: 'THE QUIET MOMENTS',
    location: 'Modernist Villa, Lake Como',
    filmStock: 'Medium Format Hasselblad H6D',
  },
  pinkParasol: {
    url: 'https://res.cloudinary.com/cbi5mcab/image/upload/v1791530489/SaveClip.App_682117137_18100818932051532_82501271114918916_n_apyckk.jpg',
    title: 'The Coastal Promenade',
    subtitle: 'Embellished blush tulle and hand-painted parasol along the shoreline',
    caption: 'THE MEMORIES THAT REMAIN',
    location: 'Arabian Sea Shoreline',
    filmStock: 'Contax 645 & Fuji Pro 400H',
  },
};

export const Hero: React.FC<HeroProps> = ({
  onOpenMenu,
  onOpenInquiry,
  onSelectImage,
  onExploreStories,
}) => {
  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative w-full min-h-screen lg:h-screen lg:max-h-[1100px] bg-white text-[#080808] flex flex-col justify-between overflow-x-hidden selection:bg-[#080808] selection:text-white"
    >
      {/* =========================================================================
          MOBILE HEADER (< 768px)
      ========================================================================= */}
      <header className="relative w-full pt-5 px-5 flex items-center justify-between z-30 shrink-0 md:hidden">
        <div className="w-7 shrink-0" />
        <div className="flex-1 text-center select-none px-2">
          <p className="text-[8px] xs:text-[8.5px] uppercase tracking-[0.18em] font-medium leading-none text-[#080808] whitespace-nowrap">
            WEDDING PHOTOGRAPHY &amp; CINEMATOGRAPHY
          </p>
        </div>
        <div className="w-7 flex items-center justify-end shrink-0">
          <button
            onClick={onOpenMenu}
            aria-label="Open navigation menu"
            className="group flex flex-col justify-between w-6 h-3.5 cursor-pointer p-0.5 -mr-1 hover:opacity-60 transition-opacity shrink-0"
          >
            <span className="block w-full h-[1.2px] bg-[#080808]" />
            <span className="block w-full h-[1.2px] bg-[#080808]" />
            <span className="block w-full h-[1.2px] bg-[#080808]" />
          </button>
        </div>
      </header>

      {/* =========================================================================
          APPROVED TABLET HERO (768px - 1023px)
          Exact recreation of '90s Frames_ Unforgettable Wedding Stories.png'
      ========================================================================= */}
      <div className="hidden md:flex lg:hidden flex-col flex-1 justify-between w-full max-w-[860px] mx-auto px-6 md:px-10 pt-6 pb-6 select-none relative">
        {/* Discreet Hamburger Menu Trigger */}
        <div className="absolute top-6 right-6 md:right-10 z-30">
          <button
            onClick={onOpenMenu}
            aria-label="Open navigation menu"
            className="group flex flex-col justify-between w-6 h-3.5 cursor-pointer p-0.5 hover:opacity-60 transition-opacity"
          >
            <span className="block w-full h-[1.2px] bg-[#080808]" />
            <span className="block w-full h-[1.2px] bg-[#080808]" />
            <span className="block w-full h-[1.2px] bg-[#080808]" />
          </button>
        </div>

        {/* 1. Small Centred Descriptor */}
        <div className="w-full text-center">
          <p className="text-[10px] md:text-[10.5px] uppercase tracking-[0.28em] font-medium text-[#080808]">
            WEDDING PHOTOGRAPHY &amp; CINEMATOGRAPHY
          </p>
        </div>

        {/* 2. Oversized Wordmark: 90s FRAME */}
        <div className="w-full text-center mt-3 md:mt-4 mb-1 md:mb-2">
          <h1 className="font-editorial text-[13vw] md:text-[12.5vw] font-normal tracking-[-0.03em] leading-[0.88] text-[#080808] whitespace-nowrap">
            90s FRAME
          </h1>
        </div>

        {/* 3. Centred Tagline: Some moments deserve forever. */}
        <div className="w-full text-center mb-4 md:mb-5">
          <p className="font-editorial italic font-normal text-2xl md:text-[26px] tracking-[0.015em] text-[#080808]">
            Some moments deserve forever.
          </p>
        </div>

        {/* 4. Stepped Three-Image Collage Canvas */}
        <div className="relative w-full max-w-[740px] mx-auto h-[550px] md:h-[590px] my-auto">
          {/* Caption: THE QUIET MOMENTS */}
          <div className="absolute left-[2%] md:left-[3%] top-[35px] md:top-[40px] z-20 text-left">
            <div className="text-[8.5px] md:text-[9px] uppercase tracking-[0.22em] font-medium leading-[1.5] text-[#080808]">
              <p>THE QUIET</p>
              <p>MOMENTS</p>
            </div>
          </div>

          {/* Caption: THE WAY IT FELT */}
          <div className="absolute right-[2%] md:right-[3%] top-[85px] md:top-[90px] z-20 text-left">
            <div className="text-[8.5px] md:text-[9px] uppercase tracking-[0.22em] font-medium leading-[1.5] text-[#080808]">
              <p>THE WAY</p>
              <p>IT FELT</p>
            </div>
          </div>

          {/* Left Overlapping Portrait: White Gown (IMAGE 02) */}
          <div
            onClick={() => onSelectImage(HERO_IMAGES.ivoryGown)}
            className="absolute left-[3%] md:left-[4%] top-[135px] md:top-[145px] w-[36%] max-w-[260px] h-[310px] md:h-[330px] z-20 cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
          >
            <div className="relative w-full h-full overflow-hidden bg-[#f4f4f4]">
              <img
                src={HERO_IMAGES.ivoryGown.url}
                alt="Editorial white gown wedding portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-500 ease-out"
              />
            </div>
          </div>

          {/* Central Dominant Photograph: Blue Gown (IMAGE 01) */}
          <div
            onClick={() => onSelectImage(HERO_IMAGES.blueGown)}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[53%] max-w-[390px] h-[455px] md:h-[485px] z-10 cursor-pointer group shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          >
            <div className="relative w-full h-full overflow-hidden bg-[#eef2f6]">
              <img
                src={HERO_IMAGES.blueGown.url}
                alt="Bride in cobalt-blue gown with seagulls over Istanbul waterfront"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-[center_35%] group-hover:scale-[1.012] transition-transform duration-500 ease-out"
              />
            </div>
          </div>

          {/* Right Overlapping Portrait: Pink Parasol (IMAGE 03) */}
          <div
            onClick={() => onSelectImage(HERO_IMAGES.pinkParasol)}
            className="absolute right-[3%] md:right-[4%] top-[205px] md:top-[220px] w-[34%] max-w-[250px] h-[310px] md:h-[330px] z-20 cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
          >
            <div className="relative w-full h-full overflow-hidden bg-[#f8f5f4]">
              <img
                src={HERO_IMAGES.pinkParasol.url}
                alt="Romantic bride with pink parasol on coastal beach"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-500 ease-out"
              />
            </div>
          </div>

          {/* Caption: THE MEMORIES THAT REMAIN */}
          <div className="absolute left-[3%] md:left-[4%] top-[460px] md:top-[492px] z-20 text-left">
            <div className="text-[8.5px] md:text-[9px] uppercase tracking-[0.22em] font-medium leading-[1.5] text-[#080808]">
              <p>THE MEMORIES</p>
              <p>THAT REMAIN</p>
            </div>
          </div>
        </div>

        {/* Tablet Refined Editorial Brand Positioning Footer */}
        <div className="w-full flex flex-col items-center text-center pt-5 pb-1 text-[#080808] select-none shrink-0 space-y-2.5">
          <div className="text-center">
            <p className="text-[8.5px] md:text-[9px] uppercase tracking-[0.28em] font-medium text-[#080808]/80 mb-0.5">
              90s FRAME
            </p>
            <p className="text-[10px] md:text-[10.5px] uppercase tracking-[0.28em] font-medium text-[#080808]">
              PREMIUM WEDDING HOUSE
            </p>
            <p className="text-[8px] md:text-[8.5px] uppercase tracking-[0.3em] font-medium text-[#080808]/75 mt-0.5">
              IND | UAE
            </p>
          </div>
          <div className="flex items-center justify-between w-full pt-0.5 text-[8.5px] md:text-[9.5px] uppercase tracking-[0.24em] font-medium text-[#080808]/80">
            <span>TIMELESS</span>
            <span>MOMENTS</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          APPROVED DESKTOP HERO (>= 1024px)
          Exact recreation of '90s Frames_ Unforgettable Wedding Moments (1).png'
      ========================================================================= */}
      <div className="hidden lg:flex flex-col flex-1 justify-between w-full max-w-[1680px] mx-auto px-8 xl:px-14 pt-6 pb-6 select-none relative">
        {/* Discreet Hamburger Menu Trigger */}
        <div className="absolute top-6 right-8 xl:right-14 z-30">
          <button
            onClick={onOpenMenu}
            aria-label="Open navigation menu"
            className="group flex flex-col justify-between w-6 h-3.5 cursor-pointer p-0.5 hover:opacity-60 transition-opacity"
          >
            <span className="block w-full h-[1.2px] bg-[#080808]" />
            <span className="block w-full h-[1.2px] bg-[#080808]" />
            <span className="block w-full h-[1.2px] bg-[#080808]" />
          </button>
        </div>

        {/* 1. Small Centred Descriptor */}
        <div className="w-full text-center">
          <p className="text-[10px] xl:text-[11px] uppercase tracking-[0.28em] font-medium text-[#080808]">
            WEDDING PHOTOGRAPHY &amp; CINEMATOGRAPHY
          </p>
        </div>

        {/* 2. Oversized Wordmark: 90s FRAME */}
        <div className="w-full text-center mt-5 lg:mt-6 xl:mt-8 mb-2 lg:mb-3">
          <h1 className="font-editorial text-[9.6vw] xl:text-[9.0vw] 2xl:text-[146px] font-normal tracking-[-0.03em] leading-[0.88] text-[#080808] whitespace-nowrap">
            90s FRAME
          </h1>
        </div>

        {/* 3. Centred Tagline: Some moments deserve forever. */}
        <div className="w-full text-center mb-6 lg:mb-7 xl:mb-9">
          <p className="font-editorial italic font-normal text-2xl xl:text-[28px] 2xl:text-[32px] tracking-[0.015em] text-[#080808]">
            Some moments deserve forever.
          </p>
        </div>

        {/* 4. Photographic Collage Canvas with Stepped Silhouette & Annotations */}
        <div className="relative w-full max-w-[1440px] mx-auto h-[610px] xl:h-[640px] my-auto">
          {/* Left Photographic Caption: THE QUIET MOMENTS */}
          <div className="absolute left-[8%] xl:left-[9%] top-[190px] xl:top-[200px] z-20 text-left">
            <div className="text-[9px] xl:text-[9.5px] uppercase tracking-[0.22em] font-medium leading-[1.55] text-[#080808]">
              <p>THE QUIET</p>
              <p>MOMENTS</p>
            </div>
          </div>

          {/* Right Photographic Caption: THE WAY IT FELT */}
          <div className="absolute right-[8%] xl:right-[8.5%] top-[255px] xl:top-[270px] z-20 text-left">
            <div className="text-[9px] xl:text-[9.5px] uppercase tracking-[0.22em] font-medium leading-[1.55] text-[#080808]">
              <p>THE WAY</p>
              <p>IT FELT</p>
            </div>
          </div>

          {/* -------------------------------------------------------------
              THE THREE PHOTOGRAPHS IN STEPPED COLLAGE
          ------------------------------------------------------------- */}

          {/* Left Image: White Gown (IMAGE 02) */}
          <div
            onClick={() => onSelectImage(HERO_IMAGES.ivoryGown)}
            className="absolute left-[18%] xl:left-[19%] top-[60px] xl:top-[65px] w-[265px] xl:w-[275px] h-[350px] xl:h-[365px] z-20 cursor-pointer group shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          >
            <div className="relative w-full h-full overflow-hidden bg-[#f4f4f4]">
              <img
                src={HERO_IMAGES.ivoryGown.url}
                alt="Editorial white gown portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-500 ease-out"
              />
            </div>
          </div>

          {/* Main Central Image: Cobalt-Blue Gown (IMAGE 01) */}
          <div
            onClick={() => onSelectImage(HERO_IMAGES.blueGown)}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[450px] xl:w-[470px] h-[550px] xl:h-[570px] z-10 cursor-pointer group shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          >
            <div className="relative w-full h-full overflow-hidden bg-[#eef2f6]">
              <img
                src={HERO_IMAGES.blueGown.url}
                alt="Cinematic bride in cobalt-blue gown with seagulls over Istanbul waterfront"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-[center_35%] group-hover:scale-[1.012] transition-transform duration-500 ease-out"
              />
            </div>
          </div>

          {/* Right Image: Pink Parasol (IMAGE 03) */}
          <div
            onClick={() => onSelectImage(HERO_IMAGES.pinkParasol)}
            className="absolute right-[19%] xl:right-[20%] top-[205px] xl:top-[215px] w-[245px] xl:w-[255px] h-[350px] xl:h-[365px] z-20 cursor-pointer group shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          >
            <div className="relative w-full h-full overflow-hidden bg-[#f8f5f4]">
              <img
                src={HERO_IMAGES.pinkParasol.url}
                alt="Romantic bride with pink parasol on coastal beach"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-500 ease-out"
              />
            </div>
          </div>

          {/* Lower Photographic Caption: THE MEMORIES THAT REMAIN */}
          <div className="absolute left-[18%] xl:left-[19%] top-[430px] xl:top-[445px] z-20 text-left">
            <div className="text-[9px] xl:text-[9.5px] uppercase tracking-[0.22em] font-medium leading-[1.5] text-[#080808]">
              <p>THE MEMORIES</p>
              <p>THAT REMAIN</p>
            </div>
          </div>
        </div>

        {/* Desktop Refined Editorial Brand Positioning Footer */}
        <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center text-center pt-4 xl:pt-5 pb-1 text-[#080808] select-none shrink-0 space-y-3">
          <div className="text-center">
            <p className="text-[9px] xl:text-[9.5px] uppercase tracking-[0.28em] font-medium text-[#080808]/80 mb-0.5">
              90s FRAME
            </p>
            <p className="text-[10.5px] xl:text-[11px] uppercase tracking-[0.28em] font-medium text-[#080808]">
              PREMIUM WEDDING HOUSE
            </p>
            <p className="text-[8.5px] xl:text-[9px] tracking-[0.3em] font-medium text-[#080808]/75 mt-0.5">
              IND | UAE
            </p>
          </div>
          <div className="flex items-center justify-between w-full pt-0.5 text-[9.5px] xl:text-[10px] uppercase tracking-[0.26em] font-medium text-[#080808]/80">
            <span>TIMELESS</span>
            <span>MOMENTS</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE LAYOUT (< 768px)
          Faithfully reproduces '90s Frames_ Unforgettable Wedding Moments.png'
      ========================================================================= */}
      <div className="flex md:hidden flex-col w-full px-5 pt-2 pb-8">
        {/* Mobile Wordmark Area: Single-line "90s FRAME" & Tagline Underneath */}
        <div className="w-full text-center select-none mt-3.5 mb-2.5 px-2">
          <h1 className="font-editorial text-[13.5vw] xs:text-[14vw] font-normal tracking-[-0.035em] leading-[0.88] text-[#080808] whitespace-nowrap">
            90s FRAME
          </h1>
          <p className="font-editorial italic font-normal text-[18px] xs:text-[20px] tracking-[0.015em] text-[#080808] mt-2">
            Some moments deserve forever.
          </p>
        </div>

        {/* Mobile Collage Canvas */}
        <div className="relative w-full my-3 min-h-[480px] xs:min-h-[520px]">
          {/* Annotation Upper-Left: THE WAY IT FELT */}
          <div className="absolute left-0 top-[6%] z-10 text-left select-none">
            <div className="text-[8px] uppercase tracking-[0.2em] font-medium leading-[1.5] text-[#080808]">
              <p>THE</p>
              <p>WAY</p>
              <p>IT</p>
              <p>FELT</p>
            </div>
          </div>

          {/* Cursive Statement Upper-Right: A collection of unforgettable moments. */}
          <div className="absolute right-0 top-[2%] z-10 text-left select-none">
            <p className="font-script text-[21px] leading-[1.15] text-[#080808] opacity-90">
              A<br />
              collection<br />
              of<br />
              unforgettable<br />
              moments.
            </p>
          </div>

          {/* 1. Mobile Primary Image: IMAGE 01 (Cobalt Blue Gown) - Centered Vertical Crop */}
          <div
            onClick={() => onSelectImage(HERO_IMAGES.blueGown)}
            className="w-[66%] mx-auto aspect-[3/4.2] overflow-hidden bg-[#eef2f6] shadow-[0_2px_12px_rgba(0,0,0,0.06)] cursor-pointer"
          >
            <img
              src={HERO_IMAGES.blueGown.url}
              alt="Bride in cobalt-blue gown with seagulls over waterfront"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-[center_35%]"
            />
          </div>

          {/* 2. Mobile Left Overlapping Portrait: IMAGE 02 (Ivory Gown) */}
          <div
            onClick={() => onSelectImage(HERO_IMAGES.ivoryGown)}
            className="absolute left-[3%] bottom-[12%] w-[38%] aspect-[3/4.5] z-10 bg-[#f4f4f4] shadow-[0_4px_16px_rgba(0,0,0,0.08)] cursor-pointer overflow-hidden"
          >
            <img
              src={HERO_IMAGES.ivoryGown.url}
              alt="Editorial ivory gown wedding portrait"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Annotation Lower-Left: THE QUIET MOMENTS */}
          <div className="absolute left-[1%] bottom-[-2%] z-10 text-left select-none">
            <div className="text-[7.5px] uppercase tracking-[0.2em] font-medium leading-[1.5] text-[#080808]">
              <p>THE</p>
              <p>QUIET</p>
              <p>MOMENTS</p>
            </div>
          </div>

          {/* 3. Mobile Right Overlapping Portrait: IMAGE 03 (Blush Pink Parasol) */}
          <div
            onClick={() => onSelectImage(HERO_IMAGES.pinkParasol)}
            className="absolute right-[4%] bottom-[2%] w-[39%] aspect-[3/4.5] z-10 bg-[#f8f5f4] shadow-[0_4px_16px_rgba(0,0,0,0.08)] cursor-pointer overflow-hidden"
          >
            <img
              src={HERO_IMAGES.pinkParasol.url}
              alt="Romantic bride with pink parasol on beach"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Annotation Lower-Right: THE MEMORIES THAT REMAIN */}
          <div className="absolute right-0 bottom-[22%] z-10 text-left select-none">
            <div className="text-[7.5px] uppercase tracking-[0.2em] font-medium leading-[1.5] text-[#080808]">
              <p>THE</p>
              <p>MEMORIES</p>
              <p>THAT</p>
              <p>REMAIN</p>
            </div>
          </div>
        </div>

        {/* Mobile Refined Editorial Brand Positioning Footer */}
        <div className="w-full flex flex-col items-center text-center pt-8 pb-2 text-[#080808] select-none space-y-3">
          <div className="text-center">
            <p className="text-[8.5px] xs:text-[9px] uppercase tracking-[0.28em] font-medium text-[#080808]/80 mb-0.5">
              90s FRAME
            </p>
            <p className="text-[9.5px] xs:text-[10px] uppercase tracking-[0.26em] font-medium text-[#080808]">
              PREMIUM WEDDING HOUSE
            </p>
            <p className="text-[8px] xs:text-[8.5px] uppercase tracking-[0.28em] font-medium text-[#080808]/75 mt-0.5">
              IND | UAE
            </p>
          </div>
          <div className="flex items-center justify-between w-full px-1 xs:px-2 pt-1 text-[8px] xs:text-[8.5px] uppercase tracking-[0.24em] font-medium text-[#080808]/80">
            <span>TIMELESS</span>
            <span>MOMENTS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
