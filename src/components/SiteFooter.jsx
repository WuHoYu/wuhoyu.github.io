import React from 'react';
import './SiteFooter.css';

export default function SiteFooter({ isLightBg }) {
  const dividerColor = isLightBg ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)';
  const topRowColor = isLightBg ? 'rgba(27,26,30,0.6)' : 'rgba(255,255,255,0.6)';
  const bottomRowColor = isLightBg ? '#1b1a1e' : '#ffffff';

  return (
    <footer className="site-footer" data-name="FootPage" data-node-id="318:128">
      <div className="footer-inner">
        <div className="footer-row footer-row--top" style={{ color: topRowColor }}>
          <span>© WuHoYu</span>
          <span>All rights reserved</span>
        </div>
        <div className="footer-divider" style={{ borderColor: dividerColor }} />
        <div className="footer-row footer-row--bottom" style={{ color: bottomRowColor }}>
          <a href="mailto:wuhoyu199@outlook.com" className="footer-link">wuhoyu199@outlook.com</a>
          <a href="https://www.linkedin.com/in/hoyu-wu" target="_blank" rel="noreferrer" className="footer-link">Linkedin</a>
        </div>
      </div>
    </footer>
  );
}
