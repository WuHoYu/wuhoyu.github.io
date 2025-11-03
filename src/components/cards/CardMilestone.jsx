import React from 'react';

const CardMilestone = ({ textColor, arrowColor, glassTheme, sliderValue = 30 }) => (
  <div className={`absolute box-border flex flex-col items-start glass-card ${glassTheme}`} style={{height:'295px',left:'2.43%',right:'74.58%',top:'355px',padding:'15px 18px',overflow:'hidden',gap:'0.3125rem',alignItems:'stretch'}} data-name="card-milestone" data-node-id="16:37">
    <div className="box-border content-stretch relative shrink-0 w-full" style={{height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr'}} data-name="maincontent" data-node-id="16:38">
      {/* Header row (normal flow) */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span className="transition-text-color" style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: '1.25rem', lineHeight: '80%', color: textColor }}>Milestone</span>
        <span className="transition-text-color" style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: '1.25rem', lineHeight: 1, verticalAlign: 'top', color: arrowColor, mixBlendMode: 'hard-light' }}>→</span>
      </div>
      {/* Bar group fills remaining height and keeps content inside */}
      <div
        className="baryear-bar-group"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          alignItems: 'end',
          columnGap: '12px',
          width: '100%',
          height: '100%',
          minHeight: '140px',
          padding: 0,
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
      >
            {(() => {
              // Figma heights in px: [168, 138, 107, 107, 223]
              const heightsPx = [168, 138, 107, 107, 223];
              const tallest = 223; // reference px for 100%
              const heights = heightsPx.map(h => Math.max(0.1, Math.min(0.96, h / tallest)));
              return [
                { year: '貳零貳壹', value: heights[0] },
                { year: '貳零貳貳', value: heights[1] },
                { year: '貳零貳參', value: heights[2] },
                { year: '貳零貳肆', value: heights[3] },
                { year: '貳零貳伍', value: heights[4] }
              ];
            })().map(({ year, value }) => (
              <div key={year} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', minWidth: 0, height: '100%' }}>
                <div style={{ width: '100%', height: `${Math.min(0.96, value) * 0.8 * 100}%`, display: 'flex', alignItems: 'stretch' }}>
                  <div
                    style={{
                      width: '100%',
                      borderRadius: 6,
                      background: 'rgba(196, 196, 196, 0.60)',
                      backgroundBlendMode: 'hard-light',
                      display: 'flex',
                      justifyContent: 'center',
                      boxSizing: 'border-box',
                      padding: 0,
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ paddingTop: 15, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                      <span
                        style={{
                          color: sliderValue < 61 ? '#000000' : '#FFFFFF',
                          fontFamily: 'Source Han Sans CN',
                          fontSize: 12,
                          fontWeight: 500,
                          lineHeight: 1,
                          writingMode: 'vertical-rl',
                          textOrientation: 'upright',
                          letterSpacing: '0.02em',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {year}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  </div>
);

export default CardMilestone;
