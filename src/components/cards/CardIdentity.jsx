import React, { useState, useEffect, useMemo } from 'react';
import { asset } from '../../utils/assets';

function CardIdentity({ textColor, arrowColor, glassTheme, sliderValue }) {
  // Smooth crossfade between videos
  const [currentSrc, setCurrentSrc] = useState(asset('/videos/sign1.webm'));
  const [fade, setFade] = useState(true);
  // Detect iOS/iPadOS Safari to apply a blend-mode fallback for WebM alpha
  const isIOSSafari = useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent || '';
    const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua) && !/CriOS\//.test(ua);
    return isIOS && isSafari;
  }, []);
  useEffect(() => {
    let nextSrc = asset('/videos/sign1.webm');
    if (sliderValue > 40 && sliderValue < 80) {
      nextSrc = asset('/videos/sign2.webm');
    }
    if (nextSrc !== currentSrc) {
      setFade(false);
      setTimeout(() => {
        setCurrentSrc(nextSrc);
        setFade(true);
      }, 400); // fade duration
    }
  }, [sliderValue, currentSrc]);
  return (
    <div className={`absolute box-border glass-card ${glassTheme}`}
      data-name="card-identity"
      data-node-id="16:28"
      style={{
        left: '38.47%',
        right: '2.43%',
        top: '35px',
  padding: '0.9375rem 1.125rem',
        minWidth: '280px',
        maxWidth: '100%',
        boxSizing: 'border-box',
        position: 'absolute',
        overflow: 'hidden',
      }}
    >
      <div className="content-stretch relative w-full" data-name="maincontent" data-node-id="16:29" style={{ display: 'grid', gridTemplateRows: 'auto 1fr', height: '100%' }}>
          <div className="font-['Montserrat:Medium',_sans-serif] font-medium leading-[0.8] w-full" data-node-id="16:31" style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', zIndex: 1 }}>
              <span
                className="transition-text-color"
                style={{
                  fontFamily: 'Montserrat',
                  fontWeight: 500,
                  fontSize: '1.25rem',
                  lineHeight: '80%',
                  color: textColor,
                }}
              >Identity</span>
              <span
                className="transition-text-color"
                style={{
                  fontFamily: 'Montserrat',
                  fontWeight: 500,
                  fontSize: '1.25rem',
                  lineHeight: 1,
                  verticalAlign: 'top',
                  color: arrowColor,
                  mixBlendMode: 'hard-light',
                }}
              >→</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            {/* iOS/iPadOS Safari fallback: show a simple visible placeholder instead of the flattened WebM */}
            {isIOSSafari ? (
              <div
                aria-label="Identity animation placeholder"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '70%',
                  width: '70%',
                  maxHeight: '100%',
                  maxWidth: '100%',
                  borderRadius: '12px',
                  // Subtle frosted tile so there’s no harsh rectangle from the source file
                  background: glassTheme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                  backdropFilter: 'blur(2px)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    fontSize: 'clamp(14px, 3.8vw, 22px)',
                    color: textColor,
                    opacity: fade ? 1 : 0.6,
                    transition: 'opacity 0.4s',
                    animation: 'idPulse 1.6s ease-in-out infinite',
                  }}
                >
                  SIGN
                </span>
                {/* inline keyframes */}
                <style>{`
                  @keyframes idPulse {
                    0% { opacity: 0.7; }
                    50% { opacity: 1; }
                    100% { opacity: 0.7; }
                  }
                `}</style>
              </div>
            ) : (
              // Crossfade: old video fades out, new video fades in
              <video
                src={currentSrc}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  height: '70%',
                  width: 'auto',
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain', /* centers sign1 and sign2 equally */
                  display: 'block',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  opacity: fade ? 1 : 0,
                  transition: 'opacity 0.4s'
                }}
              />
            )}
          </div>
      </div>
    </div>
  );
}
export default CardIdentity;
