import React, { useState, useEffect } from 'react';

function CardIdentity({ textColor, arrowColor, glassTheme, sliderValue }) {
  // Smooth crossfade between videos
  const [currentSrc, setCurrentSrc] = useState('/videos/sign1.webm');
  const [fade, setFade] = useState(true);
  useEffect(() => {
    let nextSrc = '/videos/sign1.webm';
    if (sliderValue > 40 && sliderValue < 80) {
      nextSrc = '/videos/sign2.webm';
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
