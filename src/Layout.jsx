import React from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import './App.css';
import ElasticSlider from './components/ElasticSlider';
import Dock from './components/Dock';
import SiteFooter from './components/SiteFooter';
import ScrollToTop from './components/ScrollToTop';
import { getBackgroundColor } from './utils/background';
import { formatClockFromPercent } from './utils/time';
import { asset } from './utils/assets';
 
// Using custom SVG icons from public/icons

export default function Layout() {
  const [sliderValue, setSliderValue] = useState(30);
  const navigate = useNavigate();
  const location = useLocation();
  const [navStamp, setNavStamp] = useState(0);


  const goOrScroll = (path) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setNavStamp(Date.now());
      navigate(path);
    }
  };


  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden',
        position: 'relative',
        background: getBackgroundColor(sliderValue),
        transition: 'background-color 0.7s cubic-bezier(0.4,0,0.2,1)'
      }}
    >
  <ScrollToTop behavior="auto" />
      {/* Small fixed logo on Projects and Visual Lab only */}
      {['/projects', '/visual-lab'].includes(location.pathname) && (
        <>
          <style>{`
            .site-logo-overlay { position: fixed; inset: 0 auto auto 0; width: 100%; z-index: 1100; pointer-events: none; }
            .site-logo-inner {
              max-width: min(90rem, 100vw);
              margin: 0 auto;
              padding: 24px clamp(12px, 2vw, 24px) 0;
              display: flex;
              align-items: center;
            }
            .site-logo-link { display: inline-block; pointer-events: auto; }
            .site-logo-link img { height: 18px; width: auto; display: block; }
            @media (max-width: 480px) { .site-logo-link img { height: 16px; } }
            /* Mobile/single-column: logo not fixed; it should scroll with content */
            @media (max-width: 767.98px) {
              .site-logo-overlay { position: static; inset: auto; z-index: auto; }
              /* Keep the same top padding (24px) as sections to avoid any visual jump at the breakpoint */
              .site-logo-inner { padding: 24px clamp(12px, 2vw, 24px) 0; }
            }
            /* Reserve content space for logo only on laptop+ */
            .content-shift { padding-top: 50px; }
            @media (max-width: 767.98px) { .content-shift { padding-top: 0; } }
          `}</style>
          <div className="site-logo-overlay" aria-hidden>
            <div className="site-logo-inner">
              <Link to="/" className="site-logo-link" aria-label="Home">
                <img
                  src={asset(sliderValue < 60 ? '/icons/logoblack.png' : '/icons/logowhite.png')}
                  alt="Site logo"
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />
              </Link>
            </div>
          </div>
        </>
      )}
      {/* ElasticSlider 固定於左下角：不在 Home 顯示，其他頁面顯示 */}
      {location.pathname !== '/' && (
          <>
            <style>{`
              .slider-fixed { bottom: calc(35px + env(safe-area-inset-bottom, 0px)); }
              /* Mobile: center horizontally and place above Dock */
              @media (max-width: 739.98px) {
                .slider-fixed {
                  bottom: calc(59px + 35px + env(safe-area-inset-bottom, 0px));
                  left: 50% !important;
                  transform: translateX(-50%);
                  width: min(532px, 90vw) !important;
                }
              }
              /* At >=600px move slider to top-right with page padding margins for specific pages */
              @media (min-width: 600px) {
                .slider-fixed.slider-top-right {
                  top: 24px;
                  bottom: auto;
                  right: calc(max((100vw - 90rem) / 2, 0px) + clamp(12px, 2vw, 24px)) !important;
                  left: auto !important;
                  transform: none;
                  width: var(--slider-track-width, 220px) !important;
                }
              }
              /* Simple shell: no background; used only to anchor overlay */
              .slider-shell { position: relative; width: 100%; display: flex; align-items: center; justify-content: center; }
              .slider-time { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex; align-items: center; gap: 8px; pointer-events: none; }
              .slider-time span { pointer-events: none; }
              /* Layout-only radius/width overrides (do not affect homepage) */
              .layout-slider .slider-track,
              .layout-slider .slider-range { border-radius: var(--slider-track-radius, 14px); }
              .layout-slider .slider-root { max-width: var(--slider-track-width, 202px); padding: 0; }
              /* Apply blur/opacity directly to the track */
              .layout-slider .slider-track {
                background-color: rgba(15, 15, 15, var(--slider-track-opacity, 0.25));
                backdrop-filter: blur(var(--slider-track-blur, 30px));
                -webkit-backdrop-filter: blur(var(--slider-track-blur, 30px));
              }
            `}</style>
            <div className={`slider-fixed ${(location.pathname === '/visual-lab' || location.pathname === '/projects') ? 'slider-top-right' : ''}`} style={{
              position: 'fixed',
              left: (location.pathname === '/visual-lab' || location.pathname === '/projects') ? 'auto' : 'calc((100vw - min(90rem, 100vw)) / 2)',
              zIndex: 1200,
              margin: 0,
              paddingBottom: 25,
              width: (location.pathname === '/visual-lab' || location.pathname === '/projects') ? 'var(--slider-track-width, 220px)' : 'min(532px, 36.9444vw)',
              // Tunable CSS variables (track-level)
              '--slider-track-opacity': '0.25', // 0 → 1
              '--slider-track-blur': '30px',
              '--slider-track-radius': '14px',
              '--slider-track-width': '202px'
            }}>
            <div className="slider-shell">
              <ElasticSlider
                className="layout-slider"
                value={sliderValue}
                onChange={setSliderValue}
                showIcons={false}
                showValueIndicator={false}
                containerWidth={'var(--slider-track-width, 220px)'}
                // Allow CSS variable to control actual track length
                rootMaxWidth={'var(--slider-track-width, 220px)'}
                baseTrackHeight={26}
                hoverTrackHeight={24}
                trackColor={sliderValue < 60 ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.35)'}
                rangeColor={sliderValue < 60 ? '#000000' : '#FFFFFF'}
              />
              <div className="slider-time">
                <img
                  src={asset(sliderValue < 60 ? '/icons/sun-d.svg' : '/icons/sun.svg')}
                  alt="Sun"
                  width={18}
                  height={18}
                  style={{ marginRight: 5 }}
                  draggable={false}
                />
                <span style={{ fontFamily: 'Montserrat Local', fontWeight: 600, color: sliderValue < 60 ? '#fff' : '#1b1a1e', lineHeight: 1.1, mixBlendMode: 'plus-lighter' }}>
                  {formatClockFromPercent(sliderValue)}
                </span>
                <img
                  src={asset(sliderValue < 60 ? '/icons/moon-d.svg' : '/icons/moon.svg')}
                  alt="Moon"
                  width={16}
                  height={16}
                  style={{ marginLeft: 7 }}
                  draggable={false}
                />
              </div>
            </div>
        </div>
          </>
      )}
      <main className={(location.pathname === '/projects' || location.pathname === '/visual-lab') ? 'content-shift' : ''}>
        <Outlet context={{ sliderValue, setSliderValue, navStamp }} />
      </main>
      {/* Global footer visible on all pages */}
      <SiteFooter isLightBg={sliderValue < 60} />
      {/* 底部 Dock 菜單全局可見 */}
      <Dock
        items={useMemo(() => ([
          { icon: <img src={asset('/icons/homeicon.svg')} alt="Home" width={22} height={22} />, label: 'Home', onClick: () => goOrScroll('/') },
          { icon: <img src={asset('/icons/projectsicon.svg')} alt="Projects" width={22} height={22} />, label: 'Projects', onClick: () => goOrScroll('/projects') },
          { icon: <img src={asset('/icons/visuallabicon.svg')} alt="Visual Lab" width={22} height={22} />, label: 'Visual Lab', onClick: () => goOrScroll('/visual-lab') },
        ]), [location.pathname])}
        panelHeight={59}
        baseItemSize={50}
        magnification={80}
      />
    </div>
  );
}