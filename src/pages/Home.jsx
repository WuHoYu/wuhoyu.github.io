import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import './Home.css';
import CardMyself from '../components/cards/CardMyself';
import CardIdentity from '../components/cards/CardIdentity';
import CardMilestone from '../components/cards/CardMilestone';
import CardClient from '../components/cards/CardClient';
import CardTimespan from '../components/cards/CardTimespan';
import VideoThumb from '../components/VideoThumb';
import Tags from '../components/Tags.jsx';
import { asset } from '../utils/assets';

function GlassSection({ textColor, arrowColor, glassTheme, logos, sliderValue }) {
  return (
    <section className="glass-grid grid-mode" data-name="glass-section" data-node-id="93:130">
      <div className="grid-item card--myself pe-item">
        <CardMyself textColor={textColor} arrowColor={arrowColor} glassTheme={glassTheme} sliderValue={sliderValue} />
      </div>
      <div className="grid-item card--identity pe-item">
        <CardIdentity textColor={textColor} arrowColor={arrowColor} glassTheme={glassTheme} sliderValue={sliderValue} />
      </div>
      {/* Swapped order per your requirement: Timespan before Milestone on smaller screens */}
      <div className="grid-item card--milestone pe-item">
        <CardMilestone textColor={textColor} arrowColor={arrowColor} glassTheme={glassTheme} sliderValue={sliderValue} />
      </div>
      <div className="grid-item card--timespan pe-item">
        <CardTimespan textColor={textColor} arrowColor={arrowColor} glassTheme={glassTheme} />
      </div>
      <div className="grid-item card--client pe-item">
        <CardClient textColor={textColor} arrowColor={arrowColor} glassTheme={glassTheme} logos={logos} />
      </div>
    </section>
  );
}

export default function Home() {
  const { sliderValue = 30, navStamp } = useOutletContext() || {};
  const rootRef = React.useRef(null);
  // Text changes at value=60 (logos switch at 50)
  const isLightBgForText = sliderValue < 60;
  const textColor = isLightBgForText ? '#1b1a1e' : '#fff';
  const arrowColor = isLightBgForText ? 'rgba(27, 26, 30, 0.6)' : 'rgba(255, 255, 255, 0.6)';
  const sectionTitleColor = isLightBgForText ? 'rgba(27,26,30,0.6)' : 'rgba(255,255,255,0.6)';
  const dividerColor = isLightBgForText ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)';

  const glassTheme = sliderValue < 60 ? 'white' : 'dark';
  const logos = getLogos(sliderValue);
  const lockIcon = sliderValue < 60 ? asset('/icons/lock-light.svg') : asset('/icons/lock-dark.svg');
  React.useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // Only trigger on Dock navigation (navStamp changes), not on slider interactions
    if (!navStamp) return;
    const items = root.querySelectorAll('.pe-item');
    items.forEach((el, i) => el.style.setProperty('--pe-delay', `${i * 120}ms`));
    root.classList.add('pe-enter');
    requestAnimationFrame(() => root.classList.add('pe-active'));
    const id = window.setTimeout(() => {
      root.classList.remove('pe-enter', 'pe-active');
      items.forEach(el => el.style.removeProperty('--pe-delay'));
    }, 2000);
    return () => {
      window.clearTimeout(id);
      root.classList.remove('pe-enter', 'pe-active');
      items.forEach(el => el.style.removeProperty('--pe-delay'));
    };
  }, [navStamp]);

  return (
    <div ref={rootRef} style={{ minHeight: '100vh', width: '100vw' }}>
      <GlassSection textColor={textColor} arrowColor={arrowColor} glassTheme={glassTheme} logos={logos} sliderValue={sliderValue} />
      {/* Showcase Section: SELECT WORKS */}
      <section
        className={`showcase-section ${isLightBgForText ? 'theme-light' : 'theme-dark'}`}
        data-name="my-SELECTWORKS"
        data-node-id="318:50"
        style={{ '--divider-color': dividerColor }}
      >
        <div className="showcase-header">
          <h2 className="showcase-title" style={{ color: sectionTitleColor }}>SELECT WORKS</h2>
          <div className="showcase-divider" style={{ borderColor: dividerColor }} />
        </div>

        <div className="showcase-grid">
          {/* New locked project (no page), appears before Cotton */}
          <article className="card-showcase pe-item">
            <h3 className="showcase-card-title" style={{ color: textColor }}>
              <span className="showcase-link" title="Locked project">
                <span className="locked-title">COIES@ICON KIT</span>
                <span className="locked-meta nowrap">
                  (195x2 Total)
                  <img src={lockIcon} alt="Locked" className="locked-icon" />
                </span>
              </span>
            </h3>
            <div className="showcase-tags">
              <Tags items={["UI","ICON","STRUCTURE"]} />
            </div>
            <div className="showcase-thumb-link" aria-hidden>
              <div className="showcase-thumb">
                <img
                  className="showcase-thumb-media"
                  src={asset('/photos/COIES/COIES.png')}
                  alt="COIES@ICON KIT thumbnail"
                  fetchPriority="high"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </article>
          {/* Row 1 */}
          <article className="card-showcase pe-item">
            <h3 className="showcase-card-title" style={{ color: textColor }}>
              <Link className="showcase-link" to="/cotton">CHINA COTTON AND YARN EXCHANGE</Link>
            </h3>
            <div className="showcase-tags">
              <Tags items={["BRAND","LOGO","MOTION"]} />
            </div>
            <Link className="showcase-thumb-link" to="/cotton" aria-label="CHINA COTTON AND YARN EXCHANGE preview">
              <div className="showcase-thumb">
                <VideoThumb
                  className="showcase-thumb-media"
                  srcBase="thumb-cotton"
                  loop
                  autoPlay
                />
              </div>
            </Link>
          </article>

          {/* Divider after first row (COIES + Cotton) */}
          <div className="showcase-row-divider pe-item" style={{ borderColor: dividerColor }} />

          <article className="card-showcase pe-item">
            <h3 className="showcase-card-title" style={{ color: textColor }}>
              <Link className="showcase-link" to="/stepstotheway">STEPS TO THE WAY</Link>
            </h3>
            <div className="showcase-tags">
              <Tags items={["CAPSTONE","3D","HOLOGRAPHIC"]} />
            </div>
            <Link className="showcase-thumb-link" to="/stepstotheway" aria-label="STEPS TO THE WAY preview">
              <div className="showcase-thumb">
                <VideoThumb
                  className="showcase-thumb-media"
                  srcBase="Stepstotheway-pal"
                  autoPlay
                  loop
                />
              </div>
            </Link>
          </article>
          {/* Row 2 */}
          <article className="card-showcase pe-item">
            <h3 className="showcase-card-title" style={{ color: textColor }}>
              <Link className="showcase-link" to="/hikvision">HIKVISION</Link>
            </h3>
            <div className="showcase-tags">
              <Tags items={["EDITORIAL","OFFICE"]} />
            </div>
            <Link className="showcase-thumb-link" to="/hikvision" aria-label="HIKVISION preview">
              <div className="showcase-thumb">
                <img
                  className="showcase-thumb-media"
                  src={asset('/photos/hikvision/hikvision.jpeg')}
                  alt="HIKVISION thumbnail"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Link>
          </article>

          
        </div>
      </section>
    </div>
  );
}

const logoBase = [
  { src: '/logos/CottonYarnExchange.png', alt: 'CottonYarnExchange' },
  { src: '/logos/Hikvision.png', alt: 'Hikvision' },
  { src: '/logos/LAiHUA.png', alt: 'LAiHUA' },
  { src: '/logos/Ocean.png', alt: 'Ocean' }
];

function getLogos(sliderValue) {
  return logoBase.map(logo => {
    let src = logo.src;
    if (sliderValue > 50) {
      const srcParts = src.split('.png');
      src = srcParts[0] + '_D.png';
    }

    let style = {};
    if (src.includes('Hikvision')) {
      style = { height: '35px' };
    } else if (src.includes('LAiHUA')) {
      style = { height: '35px' };
    } else if (src.includes('CottonYarnExchange')) {
      style = { height: '80px' };
    } else if (src.includes('Ocean')) {
      style = { height: '80px' };
    }
    
    return { ...logo, src: asset(src), style };
  });
}
