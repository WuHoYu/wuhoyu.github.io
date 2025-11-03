import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import Tags from '../components/Tags.jsx';
import './Home.css';

export default function Projects() {
  const rootRef = React.useRef(null);
  const { navStamp, sliderValue = 30 } = useOutletContext() || {};
  const themeClass = sliderValue < 60 ? 'theme-light' : 'theme-dark';
  const arrowColor = sliderValue < 60 ? 'rgba(27, 26, 30, 0.6)' : 'rgba(255, 255, 255, 0.6)';

  React.useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
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
    <div ref={rootRef} className={`${themeClass}`} style={{ minHeight: '100vh', width: '100%', boxSizing: 'border-box' }}>
      <section
        style={{ maxWidth: 'min(90rem, 100vw)', margin: '0 auto', padding: '24px clamp(12px, 2vw, 24px)' }}
      >
        <h1
          className="text-primary pe-item"
          style={{ fontFamily: 'Montserrat Local', fontWeight: 500, fontSize: 36, lineHeight: '100%', margin: '0 0 8px' }}
        >
          Projects
        </h1>
        <p
          className="text-muted pe-item"
          style={{ fontFamily: 'Montserrat Local', fontWeight: 500, fontSize: 13, lineHeight: 'normal', margin: 0 }}
        >
          Landing and concept design or interests.
        </p>
      </section>

    {/* Figma-imported section: placed under subtitle, with same container spacing as VisualLab */}
      <section style={{ maxWidth: 'min(90rem, 100vw)', margin: '0 auto', padding: '0 clamp(12px, 2vw, 24px) 60px' }}>
  <FigmaProjSection isDark={sliderValue >= 60} arrowColor={arrowColor} />
      </section>
      <style>{`
        .theme-dark {
          --text-primary: #ffffff;
          --text-muted: rgba(255,255,255,0.4);
          --tag-text: #e8e8e8;
          --tag-bg: rgba(177, 177, 177, 0.6);
          --tag-blend: hard-light;
        }
        .theme-light {
          --text-primary: #1b1a1e;
          --text-muted: rgba(27,26,30,0.4);
          --tag-text: #1b1a1e;
          --tag-bg: rgba(0, 0, 0, 0.08);
          --tag-blend: normal;
        }
        .text-primary { color: var(--text-primary); }
        .text-muted { color: var(--text-muted); }
        /* Projects grid mirrors SELECT WORKS grid */
        .projects-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 15px; }
        @media (min-width: 768px) { .projects-grid .projects-card { grid-column: span 6; } }
        @media (max-width: 767px) { .projects-grid .projects-card { grid-column: 1 / -1; } }
      `}</style>
    </div>
  );
}

// Converted from Figma MCP output (node 439:11) to match local styling system (no Tailwind)
// tags rendered with shared <Tags /> component to match homepage

function ProjCard({ title, href, tags = [], isDark, arrowColor, thumb }) {
  return (
    <div
      className={`pe-item projects-card glass-card ${isDark ? 'dark' : 'white'}`}
      style={{
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: '100%',
        borderRadius: 14,
        paddingTop: 15,
        paddingRight: 18,
        paddingBottom: 18,
        paddingLeft: 18
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
          <h3 className="showcase-card-title text-primary">
            {href ? (
              <Link className="showcase-link" to={href}>{title}</Link>
            ) : (
              <span className="showcase-link">{title}</span>
            )}
          </h3>
          <span aria-hidden style={{ fontFamily: 'Montserrat Local', fontWeight: 500, fontSize: 24, lineHeight: 1, color: arrowColor, mixBlendMode: 'hard-light' }}>→</span>
        </div>
        <div className="showcase-tags">
          <Tags items={tags} />
        </div>
        {href ? (
          <Link className="showcase-thumb-link" to={href} aria-label={`${title} preview`}>
            <div className="showcase-thumb">
              <img
                className="showcase-thumb-media"
                src={thumb}
                alt={`${title} thumbnail`}
                loading="lazy"
                decoding="async"
              />
            </div>
          </Link>
        ) : (
          <div className="showcase-thumb-link" aria-hidden>
            <div className="showcase-thumb">
              <img
                className="showcase-thumb-media"
                src={thumb}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FigmaProjSection({ isDark, arrowColor }) {
  // Two rows x 2 cards as per screenshot/metadata
  const rows = [
    [
      { title: 'HANTYPE', href: '/hantype', tags: ['EDITORIAL', 'RESEARCH', 'BOOK'], thumb: '/photos/typemethod/ht1.jpg' },
      { title: 'THE EVOLVING OF SCRIPTS', href: '/evolvingscripts', tags: ['CONCEPT', 'UIUX', 'APP', 'EDUCATION'], thumb: '/photos/evolvingscript/es1.jpg' }
    ],
    [
      { title: 'LANTERN FONT', href: '/lantern', tags: ['CONCEPT', 'TYPEFACE'], thumb: '/photos/lantern/l1.jpg' },
      { title: 'LAiHUA', href: '/laihua', tags: ['LANDING', 'EDITORIAL', 'BOOK'], thumb: '/photos/laihua/laihua.jpeg' }
    ]
  ];

  return (
    <div className="projects-grid" style={{ width: '100%' }}>
      {rows.flat().map((card) => (
        <ProjCard
          key={card.title}
          title={card.title}
          href={card.href}
          tags={card.tags}
          isDark={isDark}
          arrowColor={arrowColor}
          thumb={card.thumb}
        />
      ))}
    </div>
  );
}
