import React, { useMemo, useEffect, useState } from 'react';
import TextType from '../TextType';

const START_DATE_ISO = '2015-09-14'; // 14th September, 2015

function daysSince(dateStr) {
  const start = new Date(dateStr);
  if (isNaN(start.getTime())) return 0;
  const startUTC = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const now = new Date();
  const nowUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.floor((nowUTC - startUTC) / 86400000);
  return Math.max(0, diff);
}

function msUntilNextLocalMidnight() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0); // next local midnight
  return Math.max(0, next.getTime() - now.getTime());
}

const CardMyself = ({ textColor, arrowColor, glassTheme, sliderValue }) => {
  const [days, setDays] = useState(() => daysSince(START_DATE_ISO));

  useEffect(() => {
    setDays(daysSince(START_DATE_ISO));
    const timeout = setTimeout(function tick() {
      setDays(daysSince(START_DATE_ISO));
      // schedule the next midnight update
      return setTimeout(tick, msUntilNextLocalMidnight());
    }, msUntilNextLocalMidnight());

    return () => clearTimeout(timeout);
  }, []);
  const footerStyles = useMemo(() => {
    // Swap states: when slider >= 60 use white at 60% with hard-light; otherwise use #3d3d3d normal
    if (sliderValue >= 60) {
      return { color: 'rgba(255,255,255,0.6)', mixBlendMode: 'hard-light' };
    }
    return { color: '#3d3d3d', mixBlendMode: 'normal' };
  }, [sliderValue]);

  const dividlineColor = sliderValue > 60 ? '#b8b8b8' : '#3d3d3d';

  return (
  <div className={`absolute box-border flex flex-col items-start glass-card ${glassTheme}`}
    data-name="card-myself"
    data-node-id="2:4"
    style={{
      left: '2.43%',
      right: '62.57%',
      top: '35px',
      padding: '0.9375rem 1.125rem',
      minWidth: '280px',
      maxWidth: '100%',
      boxSizing: 'border-box',
      position: 'absolute',
  /* overflow intentionally not clipping; grid-mode overrides ensure visibility */
  overflow: 'visible',
      gap: '0.3125rem',
      alignItems: 'flex-start',
    }}
  >
    <div className="flex flex-col w-full" style={{ minHeight: '275px', padding: 0, flex: 1 }} data-name="maincontent" data-node-id="10:94">
      {/* 1. Wu Ho Yu & Graphic Designer */}
      <div style={{ marginBottom: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 0, padding: 0 }} data-name="myname" data-node-id="10:97">
        <span className="transition-text-color" style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: '1.25rem', color: textColor, lineHeight: 1.1, letterSpacing: 0, margin: 0, padding: 0, whiteSpace: 'nowrap' }} data-node-id="9:85">Wu Ho Yu</span>
        <span className="transition-text-color" style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: '1rem', color: arrowColor, lineHeight: 1.25, margin: 0, padding: 0, mixBlendMode: 'hard-light', whiteSpace: 'nowrap', wordBreak: 'keep-all' }} data-node-id="10:87">Graphic Designer</span>
      </div>
      {/* 2. Dividline */}
      <div style={{ marginBottom: '16px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '0.8px', opacity: 0.6, overflow: 'hidden', position: 'relative' }} data-name="dividline" data-node-id="19:2">
        <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', borderBottom: `0.8px solid ${dividlineColor}`, pointerEvents: 'none', zIndex: 0, mixBlendMode: 'hard-light' }}></div>
        <div style={{ width: '100%', height: '0.8px', background: dividlineColor, opacity: 0.6, mixBlendMode: 'hard-light', position: 'relative', zIndex: 1, border: 'none', margin: 0 }} />
      </div>
      {/* 3 & 4. Text group centered vertically as a block (keeps their mutual leading) */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', flex: 1 }}>
        <div style={{ marginBottom: '12px', width: '100%' }}>
          <div className="relative shrink-0 text-[32px] w-full" data-node-id="29:89" style={{ fontFamily: 'Montserrat', fontWeight: 500 }}>
            <TextType
              prefix={"I'm "}
              text={[ 'a Designer.', 'a Thinker.', 'a Translator of Ideas.', 'an Explorer.' ]}
              typingSpeed={80}
              pauseDuration={1400}
              deletingSpeed={40}
              startOnVisible={true}
              loop={true}
              showCursor={true}
              textColors={[textColor]}
            />
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <p className="transition-text-color relative shrink-0 text-[16px] w-full" data-node-id="10:92" style={{ fontFamily: 'Montserrat', fontWeight: 500, color: textColor, margin: 0 }}>
            {`Specialize in Branding, Typography, Graphics & Motion, 3D Visualization, UIUX, Creative & Art. Think great design goes beyond Visual Appeal. Believe factors that determine design exist Outside of Design itself.`}
          </p>
        </div>
      </div>
      {/* 5. Footnote-date */}
      <div style={{ width: '100%', marginTop: 'auto' }} className="content-stretch flex font-['Montserrat:Medium',_sans-serif] font-medium items-start justify-between leading-[normal] relative shrink-0 text-[12px]" data-name="footnote-date" data-node-id="10:99">
        <p className="relative shrink-0 transition-text-color" data-node-id="10:98" style={{ fontFamily: 'Montserrat', fontWeight: 500, margin: 0, padding: 0, ...footerStyles }}>
          {days} Days
        </p>
        <p className="relative shrink-0 transition-text-color" data-node-id="10:93" style={{ fontFamily: 'Montserrat', fontWeight: 500, margin: 0, padding: 0, ...footerStyles }}>
          Into Design.
        </p>
      </div>
    </div>
  </div>
  );
};

export default CardMyself;
