import React, { useState, useEffect, useMemo } from 'react';
import { asset } from '../../utils/assets';

function CardIdentity({ textColor, arrowColor, glassTheme, sliderValue }) {
  // Build-time cache buster (set VITE_BUILD_ID in .env.production to force MOV refresh on Pages/CDN)
  const BUILD_ID = import.meta.env.VITE_BUILD_ID || '';

  // Detect iOS/iPadOS Safari and HEVC-alpha support
  const { isIOSSafari, supportsHvc1 } = useMemo(() => {
    if (typeof navigator === 'undefined') return { isIOSSafari: false, supportsHvc1: false };
    const ua = navigator.userAgent || '';
    const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua) && !/CriOS\//.test(ua);
    let supports = false;
    if (typeof document !== 'undefined') {
      const v = document.createElement('video');
      if (v && typeof v.canPlayType === 'function') {
        const res = v.canPlayType('video/mp4; codecs="hvc1"');
        supports = !!res;
      }
    }
    return { isIOSSafari: isIOS && isSafari, supportsHvc1: supports };
  }, []);

  const pickSrc = (sv) => {
    const base = sv > 40 && sv < 80 ? 'sign2' : 'sign1';
    const ext = (isIOSSafari && supportsHvc1) ? 'mov' : 'webm';
    const qs = BUILD_ID ? `?v=${BUILD_ID}` : '';
    return asset(`/videos/${base}.${ext}${qs}`);
  };

  // Smooth crossfade between videos
  const [currentSrc, setCurrentSrc] = useState(pickSrc(sliderValue));
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const nextSrc = pickSrc(sliderValue);
    if (nextSrc !== currentSrc) {
      setFade(false);
      setTimeout(() => {
        setCurrentSrc(nextSrc);
        setFade(true);
      }, 400); // fade duration
    }
  }, [sliderValue, currentSrc, isIOSSafari, supportsHvc1]);
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
                {/* Crossfade: old video fades out, new video fades in */}
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
                    mixBlendMode: 'normal',
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    opacity: fade ? 1 : 0,
                    transition: 'opacity 0.4s'
                  }}
                />
          </div>
      </div>
    </div>
  );
}
export default CardIdentity;
