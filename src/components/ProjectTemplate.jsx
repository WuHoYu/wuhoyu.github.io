import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import Tags from './Tags.jsx';
import AnimatedTooltip from './AnimatedTooltip.jsx';
import { getBackgroundColor } from '../utils/background.js';

/**
 * ProjectTemplate
 * Reusable layout matching the Stepstotheway page structure.
 * Props:
 * - title: string
 * - subtitle: string
 * - info: string or ReactNode
 * - year: string|number
 * - tags: string[]
 * - team: Array<{ id?: number|string, name: string, subtitle?: string }>
 * - children: media/content for the right column
 */
export default function ProjectTemplate({
  title,
  subtitle,
  info,
  year,
  tags = [],
  team = [],
  links = [],
  children,
  leftExtra
}) {
  const rightColRef = useRef(null);
  const { sliderValue = 30, navStamp = 0 } = useOutletContext() || {};

  // Page-enter: reveal right-column items one-by-one with simple CSS transitions (no flicker)
  useLayoutEffect(() => {
    const right = rightColRef.current;
    if (!right) return;
      if (!navStamp) return; // only on Dock navigation
    const wrapper = right.firstElementChild; // the inner flex-col that holds blocks
    if (!wrapper) return;

    // Collect actual cards: single blocks or items inside two-up rows
    const items = [];
    Array.from(wrapper.children).forEach(block => {
      const isRow = block.children.length > 1 && getComputedStyle(block).display.includes('flex');
      if (isRow) items.push(...Array.from(block.children));
      else items.push(block);
    });

    // Assign per-item delay via CSS var and mark as animatable
    items.forEach((el, i) => {
      el.classList.add('pt-item');
      el.style.setProperty('--pt-delay', `${i * 80}ms`);
    });

    // Apply enter classes in two frames to ensure initial styles are applied before transition starts
    wrapper.classList.add('pt-enter');
    requestAnimationFrame(() => {
      wrapper.classList.add('pt-enter-active');
    });

    return () => {
      wrapper.classList.remove('pt-enter', 'pt-enter-active');
      items.forEach(el => {
        el.classList.remove('pt-item');
        el.style.removeProperty('--pt-delay');
      });
    };
  }, [children]);

  // Scroll reveal: animate ONLY the first time each media enters view via scrolling
  useEffect(() => {
    const right = rightColRef.current;
    if (!right) return;

    const wrapper = right.firstElementChild;
    if (!wrapper) return;

    const targets = wrapper.querySelectorAll('img, video');
    if (!targets.length) return;

    let io;
    const start = () => {
      const animated = new WeakSet();
      const outOfView = new WeakMap(); // track if element has ever been out of view since observer started

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target;
            if (!outOfView.has(el)) {
              // Initialize: if currently not intersecting, mark as out-of-view so first enter will animate.
              outOfView.set(el, !entry.isIntersecting);
            }

            if (entry.isIntersecting) {
              // Animate only once, and only if it has been out of view at least once (skip initial load if already visible)
              if (!animated.has(el) && outOfView.get(el)) {
                el.classList.remove('pt-rev');
                // force reflow to ensure restart when class is added
                // eslint-disable-next-line no-unused-expressions
                el.offsetHeight;
                el.classList.add('pt-rev');
                animated.add(el);
                io.unobserve(el);
              }
            } else {
              // Mark as out-of-view once it leaves, enabling first re-entry to animate
              outOfView.set(el, true);
            }
          });
        },
        { root: null, rootMargin: '0px 0px -2% 0px', threshold: 0.05 }
      );
      targets.forEach(t => io.observe(t));
    };

    const tid = window.setTimeout(start, 350); // avoid clashing with initial page-enter
    return () => {
      window.clearTimeout(tid);
      if (io) io.disconnect();
    };
  }, [children]);

  return (
    <div className={`mx-auto ${sliderValue < 60 ? 'theme-light' : 'theme-dark'}`} style={{ width: '100%', maxWidth: '90rem', margin: '0 auto' }}>
      <div className="project-grid">
        {/* Left column (sticky on desktop) */}
        <aside className="box-border project-left" style={{ padding: '26px 20px' }}>
          <div className="flex flex-col gap-[15px] left-inner">
            {/* Project name + subtitle */}
            <div className="flex flex-col gap-[14px]">
              {title && (
                <p className="text-[36px] leading-none m-0 text-primary" style={{ fontFamily: 'Montserrat Local', fontStyle: 'normal', fontWeight: 500, fontSize: 36, lineHeight: '100%', mixBlendMode: 'normal' }}>
                  {title}
                </p>
              )}
              {subtitle && (
                <p className="text-[13px] leading-normal m-0 text-muted" style={{ fontFamily: 'Montserrat Local', fontStyle: 'normal', fontWeight: 500, fontSize: 13, lineHeight: 'normal', mixBlendMode: 'normal' }}>
                  {subtitle}
                </p>
              )}
            </div>

            {/* Info block */}
            {(info || info === 0) && (
              <div className="flex flex-col gap-[5px] text-[13px]">
                <p className="m-0 text-muted" style={{ fontFamily: 'Montserrat Local', fontWeight: 700 }}>Info</p>
                <div style={{ fontFamily: 'Montserrat Local', fontWeight: 500, lineHeight: 1.4, color: 'var(--text-primary)' }}>
                  {typeof info === 'string' ? <p className="m-0">{info}</p> : info}
                </div>
              </div>
            )}

            {/* Description blocks with dividers, year, tags, team */}
            <div className="flex flex-col items-end" style={{ gap: 'var(--block-gap, 8px)' }}>
              <hr className="w-full border-0" />
              {/* Year row */}
              {(year || year === 0) && (
                <>
                  <div className="flex items-start justify-between w-full text-[13px]">
                    <p className="m-0 text-muted" style={{ fontFamily: 'Montserrat Local', fontWeight: 700 }}>Year</p>
                    <p className="m-0 text-primary" style={{ fontFamily: 'Montserrat Local', fontWeight: 500 }}>{year}</p>
                  </div>
                  <hr className="w-full border-0" />
                </>
              )}
              {/* Tag row */}
              {Array.isArray(tags) && tags.length > 0 && (
                <>
                  <div className="tag-row w-full text-[13px]">
                    <p className="m-0 text-[13px] tag-label text-muted" style={{ fontFamily: 'Montserrat Local', fontWeight: 700, whiteSpace: 'nowrap' }}>Tag</p>
                    <div className="tags-fixed">
                      <Tags items={tags} align="end" />
                    </div>
                  </div>
                  <hr className="w-full border-0" />
                </>
              )}
              {/* Team row (animated tooltip, adaptive to background) */}
              {Array.isArray(team) && team.length > 0 && (
                <>
                  <div className="flex items-start justify-between w-full text-[13px]">
                    <p className="m-0 text-muted" style={{ fontFamily: 'Montserrat Local', fontWeight: 700 }}>Team</p>
                    <div className="m-0">
                      <AnimatedTooltip items={team} gap={12} borderColor={getBackgroundColor(sliderValue)} bgValue={sliderValue} />
                    </div>
                  </div>
                  <hr className="w-full border-0" />
                </>
              )}

              {/* Links row */}
              {Array.isArray(links) && links.length > 0 && (
                <>
                  <div className="flex items-start justify-between w-full text-[13px]">
                    <p className="m-0 text-muted" style={{ fontFamily: 'Montserrat Local', fontWeight: 700 }}>Link</p>
                    <div className="m-0 flex gap-[12px] flex-wrap justify-end">
                      {links.map((lnk, i) => (
                        <a
                          key={`link-${i}`}
                          href={lnk.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-primary"
                          style={{ textDecoration: 'underline', fontFamily: lnk.fontFamily || 'Montserrat Local', fontWeight: 500 }}
                        >
                          {lnk.label}
                        </a>
                      ))}
                    </div>
                  </div>
                  <hr className="w-full border-0" />
                </>
              )}
            </div>
            {leftExtra && (
              <div className="left-extra" style={{ marginTop: 16 }}>
                {leftExtra}
              </div>
            )}
          </div>
        </aside>

        {/* Right column */}
        <main ref={rightColRef} className="box-border project-right" style={{ padding: '20px 20px 20px 0' }}>
          {children}
        </main>
      </div>

      <style>{`
        .project-left p { margin-block-start: 0; margin-block-end: 0; mix-blend-mode: normal; }
        .project-left p + p { margin-top: 0; }
        .project-left hr { margin: var(--divider-gap, 0) 0 !important; }
        .theme-dark {
          --text-primary: #ffffff;
          --text-muted: rgba(255,255,255,0.4);
          --divider-color: rgba(255,255,255,0.2);
        }
        .theme-light {
          --text-primary: #1b1a1e;
          --text-muted: rgba(27,26,30,0.4);
          --divider-color: rgba(0,0,0,0.15);
        }
        .text-primary { color: var(--text-primary); }
        .text-muted { color: var(--text-muted); }
        .project-left hr { border-top: 1px solid var(--divider-color) !important; }
        .theme-dark {
          --tag-text: #e8e8e8;
          --tag-bg: rgba(160,160,160,0.28);
        }
        .theme-light {
          --tag-text: #1b1a1e;
          --tag-bg: rgba(0, 0, 0, 0.08);
        }
        .project-left .left-inner { width: 100%; }
        .project-left .tag-row { display: grid; grid-template-columns: auto 1fr; column-gap: var(--label-gap, 8px); align-items: start; }
        .project-left .tag-row .tag-label { align-self: start; line-height: var(--chip-h, 22px); }
        .project-left .tags-fixed { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 7px; max-width: 100%; width: 100%; }
        .project-left .tag-row .tags-fixed { justify-self: end; }

        @media (min-width: 740px) {
          .project-left {
            position: fixed;
            top: var(--sticky-top, 0px);
            left: calc((100vw - min(90rem, 100vw)) / 2);
            width: min(532px, 36.9444vw);
            z-index: 10;
          }
          .project-right { margin-left: calc(min(532px, 36.9444vw)); }
        }
        @media (min-width: 1440px) {
          .project-left { width: 532px; }
          .project-right { margin-left: 532px; }
        }
        @media (max-width: 739.98px) {
          .project-left { position: static; left: auto; width: auto; padding: 16px !important; }
          .project-right { padding: 16px !important; margin-left: 0 !important; }
          .project-left .tags-fixed { max-width: 100%; }
          /* Unified tags: no separate mobile override */
        }
        .pt-enter .pt-item { opacity: 0; transform: translateY(10px); }
        .pt-enter-active .pt-item {
          opacity: 1;
          transform: none;
          transition: opacity 500ms ease, transform 500ms ease;
          transition-delay: var(--pt-delay, 0ms);
        }
        /* Scroll reveal for right-column media */
        @keyframes ptFadeScale { from { opacity: 0; transform: scale(1.01); } to { opacity: 1; transform: scale(1); } }
        .project-right img.pt-rev,
        .project-right video.pt-rev {
          animation: ptFadeScale 750ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
          will-change: transform, opacity;
        }
        .left-extra { display: flex; align-items: flex-start; justify-content: center; width: 100%; }
      `}</style>
    </div>
  );
}
