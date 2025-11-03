import React from 'react';
import { useOutletContext } from 'react-router-dom';
import ElasticSlider from '../ElasticSlider';
import { formatClockFromPercent } from '../../utils/time';


const CardTimespan = ({ textColor, arrowColor, glassTheme }) => {
  const { sliderValue, setSliderValue } = useOutletContext();
  // Mirror CardMyself title styles
  const titleFontSize = '64px'; // doubled
  const titleFontWeight = 600; // matches TextType.css 600
  const isLightBgForText = sliderValue < 60;
  const titleColor = isLightBgForText ? '#1b1a1e' : '#fff';

  return (
    <div className={`absolute box-border flex flex-col items-start glass-card ${glassTheme}`} style={{height:'295px',left:'26.46%',right:'26.46%',top:'355px',padding:'15px 18px',overflow:'clip',gap:'0.3125rem',alignItems:'flex-start'}} data-name="card-timespan" data-node-id="22:46">
      <div className="relative shrink-0 w-full" style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr' }} data-name="maincontent" data-node-id="22:47">
        {/* Header row in normal flow */}
        <div className="flex-[1_0_0] font-['Montserrat:Medium',_sans-serif] font-medium leading-[0.8] min-h-px min-w-px relative shrink-0 text-[0px] text-[rgba(255,255,255,0.6)] w-full whitespace-pre-wrap">
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span
              className="transition-text-color"
              style={{
                fontFamily: 'Montserrat',
                fontWeight: 500,
                fontSize: '1.25rem',
                lineHeight: '80%',
                color: textColor,
              }}
            >Timespan</span>
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
        </div>
        {/* Slider area: vertically centered in remaining space */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 0' }}>
      <ElasticSlider
              value={sliderValue}
              onChange={setSliderValue}
              showIcons={false}
      containerWidth={'100%'}
      containerGap={'0.25rem'}
      rootMaxWidth={'75%'} /* shortened slider width for better center visuals */
              baseTrackHeight={48}
              hoverTrackHeight={54}
              valueFormatter={formatClockFromPercent}
              valueIndicatorStyle={{
                fontFamily: 'Montserrat',
                fontWeight: titleFontWeight,
                fontSize: titleFontSize,
                color: titleColor,
                lineHeight: '1.1',
                // Ensure indicator is not absolutely positioned and leaves space for hover growth
                position: 'static',
                transform: 'none',
                display: 'block',
                textAlign: 'center',
                marginBottom: '10px' /* tighter spacing to reduce perceived top padding */
              }}
              indicatorPlacement="above"
              // Adaptive slider colors: darker track on light bg, lighter on dark bg
              trackColor={isLightBgForText ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.35)'}
              rangeColor={isLightBgForText ? '#000000' : '#FFFFFF'}
              className="timespan-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default CardTimespan;
