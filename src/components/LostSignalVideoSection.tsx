import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  Tv,
  Film,
  Sparkles,
  Sliders,
  Radio,
  Clock,
  ShieldCheck,
  Check,
} from 'lucide-react';

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export interface VideoReel {
  id: string;
  reelNumber: string;
  code: string;
  headline?: string;
  interludeHeadline?: string;
  title: string;
  subtitle: string;
  quote: string;
  location: string;
  year: string;
  filmStock: string;
  videoSrc: string;
  posterSrc: string;
  youtubeId?: string;
  tvStyle: 'dark-crt' | 'cream-crt' | 'monochrome-crt' | 'broadcast-crt';
  channelNumber: string;
  tapeCode: string;
  editorialNote: string;
  monochrome?: boolean;
}

const FEATURED_REELS: VideoReel[] = [
  {
    id: 'tv-01-como-sunset',
    reelNumber: 'REEL 01',
    code: 'ARCHIVE // 90S FRAMES',
    title: 'AKSHAY & SHRUTHI',
    subtitle: 'Akshay & Shruthi · Destination Wedding',
    quote: '',
    location: 'Destination Wedding',
    year: 'ARCHIVE NO. 2026',
    filmStock: 'Kodak Vision3 500T · 720p HD Master',
    videoSrc:
      'https://res.cloudinary.com/demo/video/upload/c_scale,w_720/elephants.mp4',
    posterSrc:
      'https://img.youtube.com/vi/4qDQ-gkU1Js/maxresdefault.jpg',
    youtubeId: '4qDQ-gkU1Js',
    tvStyle: 'dark-crt',
    channelNumber: '03',
    tapeCode: 'MAG-TAPE-01 // HI-FI 24FPS',
    editorialNote:
      'Captured on an authentic 1974 Bolex H16 Reflex with warm optical grain and hand-cranked dissolves.',
  },
  {
    id: 'tv-02-paris-dawn',
    reelNumber: 'REEL 02',
    code: 'ARCHIVE // 90S FRAMES',
    interludeHeadline: 'BACK TO THE WAY IT FELT.',
    title: 'JASEEL & DUBY',
    subtitle: 'Jaseel & Duby · Wedding Cinema',
    quote:
      'The day may pass, but every time you press play, you’ll feel it all over again.',
    location: 'Wayanad · Kerala Wedding',
    year: 'ARCHIVE NO. 2026',
    filmStock: 'Kodachrome 64 · 720p HD Master Transmission',
    videoSrc:
      'https://res.cloudinary.com/demo/video/upload/c_scale,w_720/dog.mp4',
    posterSrc:
      'https://img.youtube.com/vi/eo1xffzOptI/maxresdefault.jpg',
    youtubeId: 'eo1xffzOptI',
    tvStyle: 'cream-crt',
    channelNumber: '07',
    tapeCode: 'KODA-TAPE-02 // STEREO RESTORED',
    editorialNote:
      'Mastered with vintage cathode ray saturation and recovered analogue audio fidelity.',
  },
  {
    id: 'tv-03-venice-procession',
    reelNumber: 'REEL 03',
    code: 'ARCHIVE // 90S FRAMES',
    interludeHeadline: "SOME DAY, THEY'LL BE THE MEMORIES.",
    title: 'ASHLEY & SIMON',
    subtitle: 'A Dream Proposal · Ashley & Simon',
    quote:
      'Years from now, when the day feels impossibly far away, let this bring you home.',
    location: 'London · Cinematic Love Film',
    year: 'ARCHIVE NO. 2026',
    filmStock: 'Kodak Vision3 · 720p HD Master',
    videoSrc:
      'https://res.cloudinary.com/demo/video/upload/c_scale,w_720/elephants.mp4',
    posterSrc:
      'https://img.youtube.com/vi/XuPpb_gvq58/maxresdefault.jpg',
    youtubeId: 'XuPpb_gvq58',
    tvStyle: 'monochrome-crt',
    channelNumber: '04',
    tapeCode: 'B&W-SILENT // 18FPS PLUS-X',
    editorialNote:
      'Direct broadcast master transmission in high definition with recovered tube audio.',
    monochrome: false,
  },
  {
    id: 'tv-04-amalfi-embrace',
    reelNumber: 'REEL 04',
    code: 'ARCHIVE // MASTER CINEMA PRINT',
    interludeHeadline: 'EVERY FRAME, STILL FELT.',
    title: 'AMALFI CLIFFSIDE EMBRACE',
    subtitle: 'Sunset waltz above the Tyrrhenian Sea as dusk turns to violet',
    quote:
      'The final reel of the evening: lanterns flickering along the limestone cliffs, salt spray carried on the night breeze, laughter dissolving into music.',
    location: 'Ravello Cliffside & Amalfi Coast, Italy',
    year: 'ARCHIVE NO. 962 · 1998',
    filmStock: 'Fujichrome Velvia 50 · 16mm High-Gloss Master',
    videoSrc:
      'https://res.cloudinary.com/demo/video/upload/c_scale,w_720/dog.mp4',
    posterSrc:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85',
    tvStyle: 'broadcast-crt',
    channelNumber: '11',
    tapeCode: 'MASTER-REEL // CASSETTE STEREO',
    editorialNote:
      'Master broadcast telemetry cut preserved with authentic CRT phosphor glow and glass reflection.',
  },
];

interface CRTTelevisionProps {
  reel: VideoReel;
  isActive: boolean;
  onPlayStart: () => void;
}

export const CRTTelevision: React.FC<CRTTelevisionProps> = ({
  reel,
  isActive,
  onPlayStart,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [scanlinesEnabled, setScanlinesEnabled] = useState(true);
  const [isFlickering, setIsFlickering] = useState(false);
  const [channelTuning, setChannelTuning] = useState(reel.channelNumber);
  const [isHovered, setIsHovered] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const ytPlayerRef = useRef<any>(null);
  const ytContainerRef = useRef<HTMLDivElement>(null);
  const pendingPlayRef = useRef(false);

  // YouTube Player initialization & lifecycle
  useEffect(() => {
    if (!reel.youtubeId) return;

    let isSubscribed = true;

    const initPlayer = () => {
      if (!isSubscribed) return false;
      if (!window.YT || !window.YT.Player) return false;
      if (!ytContainerRef.current) return false;

      ytContainerRef.current.innerHTML = `<div id="yt-node-${reel.id}" class="w-full h-full"></div>`;

      try {
        ytPlayerRef.current = new window.YT.Player(`yt-node-${reel.id}`, {
          videoId: reel.youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            cc_load_policy: 0,
            vq: 'hd720',
          },
          events: {
            onReady: (e: any) => {
              if (!isSubscribed) return;
              try {
                e.target.setPlaybackQuality('hd720');
                e.target.unloadModule('captions');
                setDuration(e.target.getDuration() || 60);
              } catch (_) {}

              if (pendingPlayRef.current) {
                pendingPlayRef.current = false;
                try {
                  e.target.setPlaybackQuality('hd720');
                  e.target.unloadModule('captions');
                  if (isMuted) e.target.mute(); else e.target.unMute();
                  e.target.playVideo();
                  setIsPlaying(true);
                  setHasStarted(true);
                } catch (_) {}
              }
            },
            onStateChange: (e: any) => {
              if (!isSubscribed || !window.YT) return;
              if (e.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                setHasStarted(true);
                try {
                  e.target.setPlaybackQuality('hd720');
                  e.target.unloadModule('captions');
                } catch (_) {}
              } else if (e.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              } else if (e.data === window.YT.PlayerState.ENDED) {
                setIsPlaying(false);
              }
            },
          },
        });
        return true;
      } catch (err) {
        console.error('Error creating YouTube player:', err);
        return false;
      }
    };

    if (!window.YT) {
      if (!document.getElementById('yt-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }
    }

    const poll = setInterval(() => {
      if (window.YT && window.YT.Player) {
        if (initPlayer()) {
          clearInterval(poll);
        }
      }
    }, 150);

    return () => {
      isSubscribed = false;
      clearInterval(poll);
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.destroy?.();
        } catch (_) {}
        ytPlayerRef.current = null;
      }
      if (ytContainerRef.current) {
        ytContainerRef.current.innerHTML = '';
      }
    };
  }, [reel.id, reel.youtubeId]);

  // Track time & duration for YouTube player
  useEffect(() => {
    if (!reel.youtubeId || !isPlaying) return;

    const timer = setInterval(() => {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === 'function') {
        try {
          const cur = ytPlayerRef.current.getCurrentTime();
          const dur = ytPlayerRef.current.getDuration();
          if (typeof cur === 'number') setCurrentTime(cur);
          if (typeof dur === 'number' && dur > 0) setDuration(dur);
        } catch (_) {}
      }
    }, 250);

    return () => clearInterval(timer);
  }, [isPlaying, reel.youtubeId]);

  // Stop video if another TV became active
  useEffect(() => {
    if (!isActive && isPlaying) {
      if (reel.youtubeId) {
        if (ytPlayerRef.current) {
          try {
            ytPlayerRef.current.pauseVideo();
          } catch (_) {}
        }
        setIsPlaying(false);
      } else if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive, isPlaying, reel.youtubeId]);

  const togglePlay = () => {
    if (reel.youtubeId) {
      if (isPlaying) {
        if (ytPlayerRef.current) {
          try {
            ytPlayerRef.current.pauseVideo();
          } catch (_) {}
        }
        setIsPlaying(false);
      } else {
        onPlayStart();
        setIsFlickering(true);
        setTimeout(() => setIsFlickering(false), 450);
        setHasStarted(true);

        if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
          try {
            ytPlayerRef.current.setPlaybackQuality('hd720');
            ytPlayerRef.current.unloadModule('captions');
            if (isMuted) {
              ytPlayerRef.current.mute();
            } else {
              ytPlayerRef.current.unMute();
            }
            ytPlayerRef.current.playVideo();
            setIsPlaying(true);
          } catch (_) {}
        } else {
          pendingPlayRef.current = true;
          setIsPlaying(true);
        }
      }
      return;
    }

    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      onPlayStart();
      setIsFlickering(true);
      setTimeout(() => setIsFlickering(false), 450);

      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().then(() => setIsPlaying(true));
          }
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (reel.youtubeId) {
      if (ytPlayerRef.current) {
        try {
          if (nextMuted) {
            ytPlayerRef.current.mute();
          } else {
            ytPlayerRef.current.unMute();
          }
        } catch (_) {}
      }
      return;
    }

    if (!videoRef.current) return;
    videoRef.current.muted = nextMuted;
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 60);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);

    if (reel.youtubeId) {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === 'function') {
        try {
          ytPlayerRef.current.seekTo(val, true);
        } catch (_) {}
      }
      return;
    }

    if (videoRef.current) {
      videoRef.current.currentTime = val;
    }
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        containerRef.current.requestFullscreen().catch(() => {});
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // TV Casing Styling Variants
  const isCream = reel.tvStyle === 'cream-crt';
  const isMonochrome = !reel.youtubeId && (reel.monochrome || reel.tvStyle === 'monochrome-crt');
  const isBroadcast = reel.tvStyle === 'broadcast-crt';

  const casingBg = isCream
    ? 'bg-[#E7E2D5] border-[#C8C1B0] text-[#2C2824]'
    : isBroadcast
    ? 'bg-[#1C1A19] border-[#2E2B28] text-[#EBE6DC]'
    : 'bg-[#171514] border-[#2A2724] text-[#EDE7DC]';

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full rounded-2xl sm:rounded-3xl p-2.5 xs:p-3 sm:p-4 md:p-5 pb-2.5 xs:pb-3 sm:pb-3.5 md:pb-4 border transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.35)] ${casingBg}`}
    >
      {/* TV Casing Texture & Screws */}
      <div className="absolute top-2 left-2.5 sm:top-3 sm:left-3.5 w-1.5 h-1.5 rounded-full bg-[#000000]/40 border border-[#ffffff]/20 flex items-center justify-center">
        <div className="w-1 h-[1px] bg-white/20 transform rotate-45" />
      </div>
      <div className="absolute top-2 right-2.5 sm:top-3 sm:right-3.5 w-1.5 h-1.5 rounded-full bg-[#000000]/40 border border-[#ffffff]/20 flex items-center justify-center">
        <div className="w-1 h-[1px] bg-white/20 transform -rotate-45" />
      </div>

      {/* Top TV Header Strip: Brand badge, antenna silhouette, power LED */}
      <div className="flex items-center justify-between pb-2.5 sm:pb-3.5 border-b border-black/20 text-[9px] sm:text-[10px] tracking-[0.2em] font-mono select-none">
        <div className="flex items-center gap-2">
          {/* Power Indicator LED */}
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isPlaying
                  ? 'bg-emerald-500 shadow-[0_0_8px_#10B981]'
                  : 'bg-[#A67C37] shadow-[0_0_6px_#A67C37]'
              }`}
            />
            <span className="opacity-70 uppercase font-semibold text-[8px] sm:text-[9px]">
              {isPlaying ? 'SIG ON' : 'STANDBY'}
            </span>
          </div>

          <span className="opacity-30">|</span>

          {/* Model / Vintage Badge */}
          <span className="font-bold tracking-[0.25em] text-[9px] sm:text-[10px] opacity-90">
            {isCream
              ? 'PANASONIC TR-500'
              : isBroadcast
              ? 'SONY PVM-14M4U'
              : 'TRINITRON KV-12'}
          </span>
        </div>

        {/* Vintage Tape Indicator & Channel Tag */}
        <div className="flex items-center gap-2 text-[8px] sm:text-[9px]">
          <span className="px-1.5 py-0.5 rounded bg-black/30 border border-white/10 font-mono text-[#D4AF37]">
            CH {channelTuning}
          </span>
          <span className="hidden xs:inline-block px-1.5 py-0.5 rounded bg-[#A67C37]/20 border border-[#A67C37]/40 text-[#DFBA73] font-mono">
            {reel.reelNumber}
          </span>
        </div>
      </div>

      {/* Main Television Body: CRT Curved Screen Frame (Preserved 100% exactly as it is) */}
      <div className="mt-2.5 sm:mt-3 relative w-full">
        {/* Deep Recessed CRT Screen Bezel */}
        <div className="relative w-full aspect-[4/3] xs:aspect-[16/10] sm:aspect-[4/3] bg-[#080807] rounded-xl sm:rounded-2xl overflow-hidden p-1 sm:p-2 border-2 border-black/80 shadow-[inset_0_5px_15px_rgba(0,0,0,0.95),0_4px_12px_rgba(0,0,0,0.5)]">
          {/* The Actual Curved Glass Tube Container */}
          <div
            onClick={togglePlay}
            className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden bg-black cursor-pointer group select-none"
          >
            {reel.youtubeId ? (
              <div className="absolute inset-0 w-full h-full overflow-hidden bg-black flex items-center justify-center">
                {/* Embedded YouTube Player Container */}
                <div
                  ref={ytContainerRef}
                  className={`w-full h-full pointer-events-none scale-[1.08] transition-opacity duration-300 [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0 ${
                    isFlickering ? 'opacity-20 blur-[1px]' : 'opacity-100'
                  }`}
                />

                {/* Pre-roll Cover: Shows the exact YouTube thumbnail image with zero YouTube branding/watermarks */}
                {!hasStarted && (
                  <img
                    src={reel.posterSrc || (reel.youtubeId ? `https://img.youtube.com/vi/${reel.youtubeId}/maxresdefault.jpg` : '')}
                    alt={reel.title}
                    onError={(e) => {
                      if (reel.youtubeId && !e.currentTarget.src.includes('hqdefault')) {
                        e.currentTarget.src = `https://img.youtube.com/vi/${reel.youtubeId}/hqdefault.jpg`;
                      }
                    }}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                )}
              </div>
            ) : (
              /* Genuine Playable Video Tag */
              <video
                ref={videoRef}
                src={reel.videoSrc}
                poster={reel.posterSrc}
                playsInline
                loop
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isMonochrome ? 'grayscale contrast-125' : ''
                } ${isFlickering ? 'opacity-20 blur-[1px]' : 'opacity-100'}`}
              />
            )}

            {/* CRT Analogue Scanlines Overlay */}
            {scanlinesEnabled && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0, 0, 0, 0.45) 3px)',
                }}
              />
            )}

            {/* CRT Phosphor Glow & Vignette */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.45) 85%, rgba(0,0,0,0.85) 100%)',
              }}
            />

            {/* CRT Curved Glass Reflection Glare */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent"
            />

            {/* Degauss / Signal Flicker Flash on play */}
            {isFlickering && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 bg-white/40 animate-pulse"
              />
            )}

            {/* On-Screen Display (OSD): Green Retro Phosphor text */}
            <div className="absolute top-1 left-2.5 sm:top-1.5 sm:left-3.5 z-20 font-mono text-[9px] sm:text-[11px] text-[#39FF14] tracking-[0.2em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] flex items-center gap-2">
              <span className="font-bold">CH {channelTuning}</span>
              <span className="opacity-70">|</span>
              <span className="flex items-center gap-1">
                {isPlaying ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping inline-block" />
                    <span className="text-[#FF3B30] font-bold">REC</span>
                  </>
                ) : (
                  <span>PAUSE</span>
                )}
              </span>
              <span className="text-white/80 font-normal">
                {formatTime(currentTime)}
              </span>
            </div>

            {/* Center Play Button Overlay (when paused or hovered) */}
            {(!isPlaying || isHovered) && (
              <div className="absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  aria-label={isPlaying ? 'Pause video' : 'Play wedding film'}
                  className="group/btn relative w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-[#121110]/85 hover:bg-[#9E7B35] border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-sm"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.5]" />
                  ) : (
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1 stroke-[1.5] fill-white" />
                  )}
                  {/* Ring Pulse */}
                  {!isPlaying && (
                    <span className="absolute -inset-1 rounded-full border border-white/30 animate-pulse pointer-events-none" />
                  )}
                </button>
              </div>
            )}

            {/* Bottom Screen Subtitle Bar on Video */}
            <div className="absolute bottom-1 left-2.5 right-2.5 sm:bottom-1.5 sm:left-3.5 sm:right-3.5 z-20 flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] pointer-events-none">
              <span className="uppercase tracking-[0.18em] truncate max-w-[70%]">
                {reel.title}
              </span>
              <span className="tracking-widest opacity-80">
                {reel.youtubeId ? 'HD 720P' : 'HD 720P'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Video Control Section — Positioned right close under the video frame */}
      <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-black/20 flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 justify-between text-[9px] sm:text-[10px] font-mono select-none">
        {/* Play/Pause Button & Time Display */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play reel'}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/40 hover:bg-[#9E7B35] text-white border border-white/10 transition-colors uppercase tracking-[0.18em] text-[8px] sm:text-[9px]"
          >
            {isPlaying ? (
              <>
                <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white" />
                <span>PLAY</span>
              </>
            )}
          </button>

          <span className="text-white/70 text-[8px] sm:text-[9px] whitespace-nowrap">
            {formatTime(currentTime)} / {formatTime(duration || 60)}
          </span>
        </div>

        {/* Video Scrubber Bar */}
        <div className="w-full sm:flex-1 order-3 sm:order-2 flex items-center min-w-[120px] max-w-full sm:max-w-md">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Seek video playback"
            className="w-full h-1 bg-black/40 rounded-lg appearance-none cursor-pointer accent-[#A67C37]"
          />
        </div>

        {/* Compact Quick Actions: Audio, Scanlines, Fullscreen & Tuning */}
        <div className="flex items-center gap-1 sm:gap-1.5 order-2 sm:order-3">
          {/* VHF Channel Cycle */}
          <button
            type="button"
            onClick={() => {
              const channels = ['02', '03', '04', '07', '11', '13'];
              const currIdx = channels.indexOf(channelTuning);
              const next = channels[(currIdx + 1) % channels.length];
              setChannelTuning(next);
              setIsFlickering(true);
              setTimeout(() => setIsFlickering(false), 300);
            }}
            title="Cycle VHF channel"
            className="px-1.5 py-0.5 rounded bg-black/30 hover:bg-black/50 border border-white/10 text-[#D4AF37] hover:text-white text-[7px] sm:text-[8px] font-mono tracking-wider transition-colors"
          >
            CH {channelTuning}
          </button>

          {/* CRT Scanlines Toggle */}
          <button
            onClick={() => setScanlinesEnabled(!scanlinesEnabled)}
            title="Toggle CRT Scanlines"
            className={`px-1.5 py-0.5 rounded flex items-center gap-1 transition-colors text-[7px] sm:text-[8px] ${
              scanlinesEnabled
                ? 'bg-[#A67C37]/25 text-[#DFBA73] border border-[#A67C37]/40'
                : 'bg-black/30 text-white/50 hover:text-white border border-transparent'
            }`}
          >
            <Tv className="w-2.5 h-2.5" />
            <span className="hidden xs:inline">LINES</span>
          </button>

          {/* Audio Mute/Unmute */}
          <button
            onClick={toggleMute}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            className={`px-1.5 py-0.5 rounded flex items-center gap-1 transition-colors text-[7px] sm:text-[8px] ${
              !isMuted
                ? 'bg-white/15 text-white border border-white/20'
                : 'bg-black/30 text-white/50 hover:text-white border border-transparent'
            }`}
          >
            {isMuted ? (
              <VolumeX className="w-2.5 h-2.5" />
            ) : (
              <Volume2 className="w-2.5 h-2.5" />
            )}
            <span className="hidden xs:inline">AUDIO</span>
          </button>

          {/* Fullscreen Expand */}
          <button
            onClick={handleFullscreen}
            title="Fullscreen View"
            className="p-1 rounded bg-black/30 hover:bg-white/15 text-white/60 hover:text-white transition-colors"
          >
            <Maximize className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface LostSignalVideoSectionProps {
  onOpenInquiry?: () => void;
}

export const LostSignalVideoSection: React.FC<LostSignalVideoSectionProps> = ({
  onOpenInquiry,
}) => {
  const [activeReelId, setActiveReelId] = useState<string | null>(
    FEATURED_REELS[0].id
  );

  const handlePlayStart = (reelId: string) => {
    setActiveReelId(reelId);
  };

  const reel01 = FEATURED_REELS[0];
  const reel02 = FEATURED_REELS[1];
  const reel03 = FEATURED_REELS[2];

  return (
    <section
      id="films"
      className="relative w-full overflow-hidden bg-[#FAF8F5] text-[#121110] selection:bg-[#121110] selection:text-white"
    >
      {/* =========================================================================
          PART 1: WARM IVORY EDITORIAL INTRO & TELEVISION 01
          Matches: TRANSMISSION 001, MEMORIES STILL IN MOTION, TV 01 Composition
          ========================================================================= */}
      <div className="relative w-full max-w-[1400px] mx-auto px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 pt-16 sm:pt-20 md:pt-28 pb-4 sm:pb-6 lg:pb-8">
        {/* Subtle Analogue Paper Texture Grain */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply"
          style={{
            backgroundImage: `radial-gradient(#000000 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />

        {/* Opening Editorial Label: WEDDING FILM 01 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#121110]/15 pb-4 mb-10 sm:mb-14">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#9E7B35] animate-pulse" />
            <span className="text-[11px] sm:text-[12px] font-mono tracking-[0.28em] uppercase font-bold text-[#9E7B35]">
              WEDDING FILM 01
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-[#121110]/40 uppercase hidden xs:inline">
              // CEREMONY HIGHLIGHTS
            </span>
          </div>

          <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-[#121110]/50 uppercase">
            90S FILM ARCHIVES · REAL WEDDING STORIES
          </div>
        </div>

        {/* Dramatic Oversized Editorial Headline */}
        <div className="max-w-5xl mb-10 sm:mb-14 md:mb-20">
          <h2 className="font-editorial text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.92] text-[#121110]">
            MEMORIES,
            <br />
            <span className="italic font-light">STILL IN MOTION.</span>
          </h2>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl font-editorial italic text-[#121110]/75 tracking-wide max-w-2xl">
            Some moments always find their way back.
          </p>
        </div>

        {/* Television 01 Composition: Large Dark Vintage CRT Television */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-2 sm:mb-4 lg:mb-8">
          {/* CRT Television Component (8 cols on desktop) */}
          <div className="lg:col-span-8">
            <CRTTelevision
              reel={reel01}
              isActive={activeReelId === reel01.id}
              onPlayStart={() => handlePlayStart(reel01.id)}
            />
          </div>

          {/* Editorial Metadata Card for Television 01 */}
          <div className="lg:col-span-4 flex flex-col space-y-6 pt-2 lg:pt-6">
            <div className="space-y-4 border-l-2 border-[#9E7B35] pl-5 sm:pl-6">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.26em] uppercase text-[#9E7B35]">
                <Film className="w-3.5 h-3.5" />
                <span>{reel01.code}</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight">
                {reel01.title}
              </h3>

              <p className="text-xs sm:text-sm font-mono tracking-[0.16em] text-[#121110]/60 uppercase">
                {reel01.location} · {reel01.year}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PART 2: DARK EDITORIAL INTERLUDE & TELEVISION 02 (CREAM CRT)
          Matches: “BACK TO THE WAY IT FELT.” with Cream Vintage TV opposite
          ========================================================================= */}
      <div className="relative w-full bg-[#121110] text-[#EDE7DC] py-20 sm:py-28 md:py-32 border-y border-[#121110]/15">
        <div className="relative w-full max-w-[1400px] mx-auto px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16">
          {/* Editorial Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-12 sm:mb-16">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DFBA73] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.28em] uppercase font-bold text-[#DFBA73]">
                WEDDING FILM 02
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-white/40 uppercase hidden xs:inline">
                // CANDID HIGHLIGHTS
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-white/40 uppercase">
              WAYANAD CELEBRATION · WEDDING CINEMA
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Dramatic Typography Column: “BACK TO THE WAY IT FELT.” */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-block px-2.5 py-1 rounded bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#DFBA73] text-[10px] font-mono tracking-[0.24em] uppercase">
                FEATURED WEDDING FILM
              </span>

              <h2 className="font-editorial text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.94] text-white">
                BACK TO <span className="italic font-light text-[#E8DCC4]">THE WAY</span>
                <br />
                IT FELT.
              </h2>

              <p className="font-editorial italic text-base sm:text-lg md:text-xl text-white/80 leading-relaxed pt-2">
                {reel02.quote}
              </p>
            </div>

            {/* Television 02: Cream-Coloured Vintage CRT Television */}
            <div className="lg:col-span-7 space-y-6">
              <CRTTelevision
                reel={reel02}
                isActive={activeReelId === reel02.id}
                onPlayStart={() => handlePlayStart(reel02.id)}
              />

              {/* Editorial Metadata Card for Television 02 */}
              <div className="space-y-4 border-l-2 border-[#C5A059] pl-5 sm:pl-6">
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.26em] uppercase text-[#DFBA73]">
                  <Film className="w-3.5 h-3.5" />
                  <span>{reel02.code}</span>
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight text-white">
                  {reel02.title}
                </h3>

                <p className="text-xs sm:text-sm font-mono tracking-[0.16em] text-white/60 uppercase">
                  {reel02.location} · {reel02.year}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PART 3: LIGHT PAPER SECTION & TELEVISION 03 (MONOCHROME CRT)
          Matches: “SOME DAY, THEY'LL BE THE MEMORIES.” with Ashley & Simon
          ========================================================================= */}
      <div className="relative w-full max-w-[1400px] mx-auto px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28 md:py-32">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#121110]/15 pb-4 mb-12 sm:mb-16">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#121110]" />
            <span className="text-[11px] sm:text-[12px] font-mono tracking-[0.28em] uppercase font-bold text-[#121110]">
              WEDDING FILM 03
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-[#121110]/50 uppercase hidden xs:inline">
              // CINEMATIC LOVE STORY
            </span>
          </div>

          <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-[#121110]/50 uppercase">
            LONDON PROPOSAL · TIMELESS MEMORIES
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Television 03: Darker Casing with Contrasting Footage */}
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-6">
            <CRTTelevision
              reel={reel03}
              isActive={activeReelId === reel03.id}
              onPlayStart={() => handlePlayStart(reel03.id)}
            />

            {/* Editorial Metadata Card for Television 03 */}
            <div className="space-y-4 border-l-2 border-[#9E7B35] pl-5 sm:pl-6">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.26em] uppercase text-[#9E7B35]">
                <Film className="w-3.5 h-3.5" />
                <span>{reel03.code}</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight text-[#121110]">
                {reel03.title}
              </h3>

              <p className="text-xs sm:text-sm font-mono tracking-[0.16em] text-[#121110]/60 uppercase">
                {reel03.location} · {reel03.year}
              </p>
            </div>
          </div>

          {/* Typography Column: “SOME DAY, THEY'LL BE THE MEMORIES.” */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <span className="inline-block px-2.5 py-1 rounded bg-[#121110]/10 text-[#121110] text-[10px] font-mono tracking-[0.24em] uppercase font-semibold">
              FEATURED WEDDING FILM
            </span>

            <h2 className="font-editorial text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.94] text-[#121110]">
              SOME DAY,
              <br />
              <span className="italic font-light">THEY’LL BE</span>
              <br />
              THE MEMORIES.
            </h2>

            <p className="font-editorial italic text-base sm:text-lg md:text-xl text-[#121110]/80 leading-relaxed">
              &ldquo;{reel03.quote}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
