import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Masonry from '../components/Masonry';
import { asset } from '../utils/assets';

export default function VisualLab() {
  const { sliderValue = 30 } = useOutletContext() || {};
  const isLightBgForText = sliderValue < 60;
  const themeClass = isLightBgForText ? 'theme-light' : 'theme-dark';
  const files = [
    '01.jpg','02.jpeg','03.jpeg','04.jpg','05.png','06.jpg','07.jpg','08.jpg','09.jpg','10.jpg',
    '11.jpg','12.jpg','13.jpg','14.jpg','15.jpeg','16.jpeg','17.jpeg','18.jpeg','19.png','20.png',
    '21.jpg','22.jpg','23.jpg','24.jpg'
  ];
  const items = files.map((name, i) => ({ id: String(i + 1), img: asset(`/visuallab/${name}`), height: 480 }));

  return (
    <div className={themeClass} style={{ minHeight: '100vh', width: '100%', boxSizing: 'border-box' }}>
      <section style={{ maxWidth: 'min(90rem, 100vw)', margin: '0 auto', padding: '24px clamp(12px, 2vw, 24px)' }}>
        <h1 className="text-primary" style={{ fontFamily: 'Montserrat Local', fontWeight: 500, fontSize: 36, lineHeight: '100%', margin: '0 0 8px' }}>
          Visual Lab
        </h1>
        <p className="text-muted" style={{ fontFamily: 'Montserrat Local', fontWeight: 500, fontSize: 13, lineHeight: 'normal', margin: 0 }}>
          Experiments and creative visual explorations.
        </p>
      </section>

      <section style={{ maxWidth: 'min(90rem, 100vw)', margin: '0 auto', padding: '0 clamp(12px, 2vw, 24px) 60px' }}>
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.06}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.98}
          blurToFocus={true}
          colorShiftOnHover={false}
          gutter={15}
          maxColumns={3}
        />
      </section>
      <style>{`
        .theme-dark {
          --text-primary: #ffffff;
          --text-muted: rgba(255,255,255,0.4);
        }
        .theme-light {
          --text-primary: #1b1a1e;
          --text-muted: rgba(27,26,30,0.4);
        }
        .text-primary { color: var(--text-primary); }
        .text-muted { color: var(--text-muted); }
      `}</style>
    </div>
  );
}
