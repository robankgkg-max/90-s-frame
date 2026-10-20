import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

interface PhilosophySectionProps {
  onOpenInquiry?: () => void;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ onOpenInquiry }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const videoPoster =
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85';
  const videoSrc =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 45);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section
      id="philosophy"
      aria-label="Philosophy & Core Beliefs"
      className="w-full bg-white text-[#080808] py-20 sm:py-28 md:py-36 lg:py-44 px-5 sm:px-8 md:px-14 lg:px-20 border-t border-[#080808]/10 selection:bg-[#080808] selection:text-white"
    >
      <div className="max-w-[1240px] mx-auto flex flex-col items-center">
        {/* =========================================================================
            1. TOP HEADER: OUR PHILOSOPHY & SUBTITLE
        ========================================================================= */}
        <div className="w-full text-center mb-10 sm:mb-14 md:mb-16">
          <h3 className="font-vogue text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal tracking-[0.22em] text-[#080808] uppercase mb-3 sm:mb-4">
            OUR PHILOSOPHY
          </h3>
          <p className="font-editorial italic font-normal text-base sm:text-lg md:text-xl lg:text-[22px] tracking-[0.015em] text-[#080808]/75 max-w-xl mx-auto">
            don't skip what's coming if you want the best from 90s Frame
          </p>
        </div>

        {/* =========================================================================
            2. VIDEO / CINEMA FRAME (16:9)
        ========================================================================= */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          className="relative w-full max-w-[960px] aspect-video bg-[#0a0a0a] overflow-hidden shadow-[0_12px_44px_rgba(0,0,0,0.12)] border border-[#080808]/10 group select-none mb-16 sm:mb-20 md:mb-28"
        >
          {/* HTML5 Video */}
          <video
            ref={videoRef}
            src={videoSrc}
            poster={videoPoster}
            playsInline
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
            className="w-full h-full object-cover cursor-pointer"
          />

          {/* Central Play Button Overlay */}
          {(!isPlaying || showControls) && (
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 shadow-2xl hover:scale-105 hover:bg-black/60 cursor-pointer ${
                isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
              }`}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 sm:w-8 sm:h-8 stroke-[1.5] fill-white" />
              ) : (
                <Play className="w-6 h-6 sm:w-8 sm:h-8 stroke-[1.5] fill-white translate-x-0.5" />
              )}
            </button>
          )}

          {/* Bottom Player Controls Bar (Recreated from Screenshot) */}
          <div
            className={`absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/85 via-black/50 to-transparent pt-10 pb-3 px-4 sm:px-6 flex flex-col gap-2 transition-opacity duration-300 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Top row of bar: Scrubber slider */}
            <div className="w-full flex items-center gap-3">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                aria-label="Video scrubber"
                className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white hover:bg-white/50 transition-colors"
              />
            </div>

            {/* Bottom row of bar: Buttons & Timecode */}
            <div className="flex items-center justify-between text-white text-[11px] sm:text-xs font-mono tracking-wider">
              <div className="flex items-center gap-4">
                {/* Play/Pause Mini Button */}
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="p-1 hover:text-white/80 transition-colors cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-white stroke-[1.5]" />
                  ) : (
                    <Play className="w-4 h-4 fill-white stroke-[1.5] translate-x-0.5" />
                  )}
                </button>

                {/* Timecode */}
                <span className="text-white/90 text-[10px] sm:text-[11px] tabular-nums font-sans">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Audio Mute/Unmute */}
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  className="p-1 hover:text-white/80 transition-colors cursor-pointer"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 stroke-[1.5]" />
                  ) : (
                    <Volume2 className="w-4 h-4 stroke-[1.5]" />
                  )}
                </button>

                {/* Replay */}
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                      videoRef.current.play();
                      setIsPlaying(true);
                    }
                  }}
                  aria-label="Restart video"
                  className="p-1 hover:text-white/80 transition-colors cursor-pointer hidden sm:block"
                >
                  <RotateCcw className="w-3.5 h-3.5 stroke-[1.5]" />
                </button>

                {/* Fullscreen */}
                <button
                  onClick={handleFullscreen}
                  aria-label="Fullscreen"
                  className="p-1 hover:text-white/80 transition-colors cursor-pointer"
                >
                  <Maximize className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. HEADING: THE DAY MOVES FASTER THAN YOU THINK
        ========================================================================= */}
        <div className="w-full text-center mb-10 sm:mb-14 md:mb-16 max-w-4xl">
          <h2 className="font-vogue text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[64px] font-normal leading-[1.08] tracking-[-0.01em] text-[#080808]">
            THE DAY MOVES FASTER THAN YOU THINK
          </h2>
        </div>

        {/* =========================================================================
            4. THE PHILOSOPHY COPY (POETIC CADENCE & EDITORIAL RHYTHM)
        ========================================================================= */}
        <div className="w-full max-w-[680px] mx-auto text-center flex flex-col space-y-7 sm:space-y-9 md:space-y-10 text-[#080808]">
          {/* Stanza 1: Opening Truth */}
          <p className="font-editorial italic font-normal text-lg sm:text-xl md:text-2xl text-[#080808] leading-relaxed">
            You will not remember it the way you think you will.
          </p>

          {/* Stanza 2: The Sensations */}
          <p className="font-sans font-light text-sm sm:text-base md:text-[17px] text-[#080808]/85 leading-[1.75] sm:leading-[1.85] tracking-[0.015em]">
            The morning. The chaos. The quiet before the ceremony. Your mother’s face when she saw you. Your father, composing himself in a corridor where he thought no one was watching.
          </p>

          {/* Stanza 3: Urgency */}
          <div className="py-1">
            <span className="font-editorial italic font-normal text-base sm:text-lg md:text-xl text-[#080808] block">
              These moments do not wait.
            </span>
          </div>

          {/* Stanza 4: The Margins */}
          <p className="font-sans font-light text-sm sm:text-base md:text-[17px] text-[#080808]/85 leading-[1.75] sm:leading-[1.85] tracking-[0.015em]">
            They happen in the margins — while everyone is looking somewhere else — and then they are gone. Not just from the day. From everything.
          </p>

          {/* Stanza 5: The Irreplaceable Reality */}
          <div className="space-y-3 pt-2">
            <p className="font-sans font-normal text-sm sm:text-base md:text-[17px] text-[#080808] tracking-[0.015em]">
              This is the only part of your wedding that cannot be redone.
            </p>
            <p className="font-sans font-light text-xs sm:text-sm md:text-base text-[#080808]/70 tracking-[0.04em] uppercase">
              Not the flowers. Not the venue. Not the food.
            </p>
          </div>

          {/* Stanza 6: The Pivot */}
          <div className="py-2">
            <p className="font-editorial text-2xl sm:text-3xl md:text-4xl font-normal text-[#080808] tracking-[-0.01em]">
              The moments.
            </p>
          </div>

          {/* Stanza 7: The Studio Vow */}
          <p className="font-sans font-light text-sm sm:text-base md:text-[17px] text-[#080808]/85 leading-[1.75] sm:leading-[1.85] tracking-[0.015em]">
            90s Frame exists for exactly this. We have been in that corridor. We know what happens there. And we will not miss it.
          </p>

          {/* Stanza 8: The Reassurance */}
          <div className="pt-6 sm:pt-8 border-t border-[#080808]/10">
            <p className="font-editorial italic font-normal text-xl sm:text-2xl md:text-3xl text-[#080808]">
              Your day is safe with us.
            </p>
          </div>

          {/* Optional Direct Inquiry Action */}
          {onOpenInquiry && (
            <div className="pt-6 sm:pt-8">
              <button
                onClick={onOpenInquiry}
                className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.26em] font-medium py-3.5 px-8 border border-[#080808] text-[#080808] hover:bg-[#080808] hover:text-white transition-all duration-300 cursor-pointer"
              >
                CHECK AVAILABILITY &amp; COMMISSIONS
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
