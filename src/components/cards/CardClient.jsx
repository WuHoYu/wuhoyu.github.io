import React from 'react';
import LogoLoop from '../LogoLoop';

const CardClient = ({ textColor, arrowColor, glassTheme, logos }) => (
  <div
    className={`absolute box-border flex flex-col glass-card ${glassTheme}`}
    style={{
  height: '295px',
      left: '74.58%',
      right: '2.43%',
      top: '355px',
      padding: 0,
      overflow: 'hidden',
      gap: '0.3125rem',
      boxSizing: 'border-box',
      minWidth: 0,
      maxWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      position: 'absolute',
    }}
    data-name="card-client"
    data-node-id="29:75"
  >
    {/* Header row at top, text left, arrow right */}
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        flex: '0 0 auto',
        boxSizing: 'border-box',
        padding: '0.9375rem 1.125rem',
        marginBottom: 0,
      }}
    >
  <span className="transition-text-color" style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: '1.25rem', lineHeight: '80%', color: textColor }}>Work</span>
      <span className="transition-text-color" style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: '1.25rem', lineHeight: 1, verticalAlign: 'top', color: arrowColor, mixBlendMode: 'hard-light' }}>→</span>
    </div>
    {/* maincontent(2): fills glass card, contains only LogoLoop, fully responsive */}
    <div
      className="maincontent-logos"
      style={{
        flex: 1,
        width: '100%',
        minHeight: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        position: 'relative',
        padding: '0 0 15px 0',
        margin: 0,
        height: 'auto',
      }}
      data-name="maincontent-logos"
      data-node-id="29:76-logos"
    >
      <LogoLoop
        logos={logos}
        speed={40}
        direction="left"
        logoHeight={65}
        gap={60}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="transparent"
        ariaLabel="Technology partners"
        className="no-bullets"
        style={{ width: '100%', maxWidth: '100%', height: 'auto', boxSizing: 'border-box' }}
      />
    </div>
  </div>
);

export default CardClient;