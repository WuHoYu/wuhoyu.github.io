import React from 'react';
import { useOutletContext } from 'react-router-dom';
import ProjectTemplate from '../components/ProjectTemplate.jsx';

export default function Cotton() {
  const { sliderValue = 30 } = useOutletContext() || {};
  const team = [{ id: 1, name: 'Jian.Z', subtitle: 'Director' }, { id: 2, name: 'HoYu.W', subtitle: 'Design Lead' }, { id: 3, name: 'Qingping.H', subtitle: 'Designer' }, { id: 4, name: 'Ciyi.G', subtitle: 'Member' }];

  // Dynamic logo assets by slider value
  const textSrc = sliderValue <= 50
    ? '/photos/cotton/cottontextk.png'
    : '/photos/cotton/cottontextw.png';
  const logoSrc = sliderValue < 35
    ? '/photos/cotton/cottonlogob.png'
    : sliderValue <= 50
      ? '/photos/cotton/cottonlogok.png'
      : '/photos/cotton/cottonlogow.png';

  const imgStyle = { width: 'clamp(192px, 18vw, 320px)', height: 'auto', display: 'block' };
  const logoStack = (
    <div className="cotton-logo-stack" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <img src={logoSrc} alt="Cotton logo mark" style={imgStyle} loading="lazy" decoding="async" />
      <img src={textSrc} alt="Cotton wordmark" style={imgStyle} loading="lazy" decoding="async" />
    </div>
  );

  const rightContent = React.useMemo(() => {
    const twoUp = new Set([6, 10, 12, 13, 17]);
    const rows = [];
    for (let i = 1; i <= 18; i++) {
      if (twoUp.has(i)) rows.push({ two: [`/photos/cotton/c${i}-a.jpg`, `/photos/cotton/c${i}-b.jpg`] });
      else rows.push({ wide: `/photos/cotton/c${i}.jpg` });
    }
    return (
      <div className="flex flex-col gap-[10px]">
        <div className="rounded-[9px]" style={{ width: '100%', aspectRatio: '888 / 475', background: 'transparent', overflow: 'hidden' }}>
          <video src="/videos/CottonOpen.mp4" autoPlay loop muted playsInline preload="auto" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        {rows.map((r, idx) => (
          r.two ? (
            <div className="flex gap-[10px]" key={`row-two-${idx}`}>
              {r.two.map((src, j) => (
                <div className="rounded-[9px]" style={{ flex: 1, aspectRatio: '439 / 475', background: 'transparent', overflow: 'hidden' }} key={j}>
                  <img src={src} alt={`Cotton ${idx + 1}${j ? '-b' : '-a'}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[9px]" style={{ width: '100%', aspectRatio: '888 / 475', background: 'transparent', overflow: 'hidden' }} key={`row-wide-${idx}`}>
              <img src={r.wide} alt={`Cotton ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" decoding="async" />
            </div>
          )
        ))}
      </div>
    );
  }, []);

  const cottonStyles = React.useMemo(() => (
    <style>{`
      @media (max-width: 773px) {
        .cotton-page .project-left { position: static !important; left: auto !important; width: auto !important; padding: 16px !important; }
        .cotton-page .project-right { padding: 16px !important; margin-left: 0 !important; }
        .cotton-page .cotton-logo-stack img { width: clamp(256px, 75vw, 460px) !important; height: auto; }
        .cotton-page .left-extra { margin-top: 56px !important; margin-bottom: 56px !important; }
      }
    `}</style>
  ), []);

  return (
    <div className="cotton-page">
      <ProjectTemplate
        title="China Cotton And Yarn Exchange"
        subtitle="Core Brand System Design & Brand Guidelines"
        info={'China Cotton and Yarn Exchange was established with the approval of the State Council and jointly organized by the China National Cotton Exchange, the People’s Government of the Xinjiang Uygur Autonomous Region, and the Xinjiang Production and Construction Corps, is a national‑level comprehensive service platform for cotton and cotton yarn.'}
        year="2025"
        tags={["BRAND","LOGO","MOTION"]}
        team={team}
        leftExtra={<div style={{ marginTop: '20px' }}>{logoStack}</div>}
      >
        {rightContent}
      </ProjectTemplate>
      {cottonStyles}
    </div>
  );
}
