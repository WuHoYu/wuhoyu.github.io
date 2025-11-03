import React, { useEffect, useRef, useState } from 'react';
import ProjectTemplate from '../components/ProjectTemplate.jsx';

function ClickToPlayVideo({ sources }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    const onTimeUpdate = () => {
      if (!v.duration || Number.isNaN(v.duration)) return;
      setProgress((v.currentTime / v.duration) * 100);
    };
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    v.addEventListener('ended', onEnded);
    v.addEventListener('timeupdate', onTimeUpdate);
    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('ended', onEnded);
      v.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, []);

  const handleToggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const videoStyle = { width: '100%', height: 'auto', display: 'block' };
  const cardStyle = { width: '100%', background: 'transparent', overflow: 'hidden', position: 'relative' };
  const centerIconStyle = {
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    // Show icon when hovering, or when not playing (CTA). Hide while playing and not hovered.
    opacity: hover || !playing ? 1 : 0, transition: 'opacity 150ms ease',
    color: 'white', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.45))', pointerEvents: 'none'
  };
  const barTrackStyle = {
    position: 'absolute', left: 0, right: 0, bottom: 0, height: '4px',
    background: 'rgba(255,255,255,0.25)', opacity: hover ? 1 : 0, transition: 'opacity 150ms ease',
  };
  const barFillStyle = { height: '100%', width: `${progress}%`, background: 'white' };

  return (
    <div
      className="rounded-[9px] cursor-pointer"
      style={cardStyle}
      onClick={handleToggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <video ref={videoRef} style={videoStyle} playsInline preload="metadata">
        {sources.map((s, i) => (
          <source key={`sttw-src-${i}`} src={s.src} type={s.type} />
        ))}
        Your browser does not support the video tag.
      </video>
      <div style={centerIconStyle} aria-hidden>
        {playing ? (
          // Pause icon (two vertical bars)
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="14" y="10" width="10" height="36" rx="2" fill="white" />
            <rect x="32" y="10" width="10" height="36" rx="2" fill="white" />
          </svg>
        ) : (
          // Play icon (triangle)
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 16L52 32L24 48V16Z" fill="white" />
          </svg>
        )}
      </div>
      <div style={barTrackStyle}>
        <div style={barFillStyle} />
      </div>
    </div>
  );
}

function TwoVideosEqualHeightRow({ left, right }) {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [r1, setR1] = useState(null); // aspect ratio w/h
  const [r2, setR2] = useState(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let ro;
    const update = () => setContainerWidth(el.clientWidth || 0);
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(update);
      ro.observe(el);
    } else {
      window.addEventListener('resize', update);
    }
    update();
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', update);
    };
  }, []);

  const onMetaLeft = () => {
    const v = leftRef.current;
    if (v && v.videoWidth && v.videoHeight) setR1(v.videoWidth / v.videoHeight);
  };
  const onMetaRight = () => {
    const v = rightRef.current;
    if (v && v.videoWidth && v.videoHeight) setR2(v.videoWidth / v.videoHeight);
  };

  const gap = 10; // px to match gap-[10px]
  let h = null, w1 = null, w2 = null;
  if (containerWidth && r1 && r2) {
    h = (containerWidth - gap) / (r1 + r2);
    w1 = r1 * h;
    w2 = r2 * h;
  }

  const rowStyle = { width: '100%', display: 'flex', gap: `${gap}px`, alignItems: 'flex-start' };
  const fallbackTileStyle = { flex: 1, background: 'transparent', overflow: 'hidden', borderRadius: '9px' };
  const tileCommon = { background: 'transparent', overflow: 'hidden', borderRadius: '9px' };
  const videoStyleContain = { width: '100%', height: '100%', objectFit: 'contain', display: 'block' };

  return (
    <div ref={containerRef} style={rowStyle}>
      <div
        className="rounded-[9px]"
        style={h ? { ...tileCommon, width: `${w1}px`, height: `${h}px` } : fallbackTileStyle}
      >
        <video
          ref={leftRef}
          style={h ? videoStyleContain : { width: '100%', height: 'auto', display: 'block' }}
          loop={left.loop}
          muted={left.muted}
          autoPlay={left.autoPlay}
          playsInline
          preload="auto"
          onLoadedMetadata={onMetaLeft}
        >
          {left.sources.map((s, i) => (
            <source key={`left-${left.key}-src-${i}`} src={s.src} type={s.type} />
          ))}
          Your browser does not support the video tag.
        </video>
      </div>
      <div
        className="rounded-[9px]"
        style={h ? { ...tileCommon, width: `${w2}px`, height: `${h}px` } : fallbackTileStyle}
      >
        <video
          ref={rightRef}
          style={h ? videoStyleContain : { width: '100%', height: 'auto', display: 'block' }}
          loop={right.loop}
          muted={right.muted}
          autoPlay={right.autoPlay}
          playsInline
          preload="auto"
          onLoadedMetadata={onMetaRight}
        >
          {right.sources.map((s, i) => (
            <source key={`right-${right.key}-src-${i}`} src={s.src} type={s.type} />
          ))}
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default function Stepstotheway() {
  const team = [
    { id: 2, name: 'HoYu.W', subtitle: 'Designer' },
    { id: 3, name: 'Jian.Z', subtitle: 'Adviser' },
  ];

  return (
    <ProjectTemplate
      title="STEPS TO THE WAY"
      subtitle="MFA Capstone Project"
      info={'Text-Image dissemination remains largely 2D. As media and technology evolve, expression adapts and extends to overcome these 2D limits. Leveraging light‑field displays’ spatial capabilities—including auto stereoscopic 3D with simultaneous multi‑user viewing and dynamic perspective interaction—this bus‑stop signage information‑augmentation design scheme addresses fragmented content and cognitive overload.'}
      year="2025"
      tags={["CAPSTONE","3D","HOLOGRAPHIC"]}
      team={team}
      links={[
        { label: 'THU-Post', href: 'https://mp.weixin.qq.com/s/dJsbSww3CqKKIZRmg3zuTQ' },
        { label: '千里之行', href: 'https://mp.weixin.qq.com/s/0ADrzyJnsWrmU7q4WbKpRg', fontFamily: 'Source Han Sans CN Normal' },
      ]}
    >
      <div className="flex flex-col gap-[10px]" style={{ width: '100%' }}>
        {(() => {
          // Ordered sequence with pair rows
          const sequence = [
            's1.jpg',
            's2.jpg',
            's3.jpg',
            's4.jpg',
            's5.jpg',
            's6.jpg',
            's7.jpg',
            ['s8-a.jpg', 's8-b.jpg'],
            's9.jpg',
            's10.jpg',
            's11.jpg',
            's12.jpg',
            's13.jpeg',
            's14.jpg',
            's15.jpg',
            ['s16-a.jpg', 's16-b.jpg'],
            // Insert loop video between s16 pair and s17
            { type: 'video', key: 'pal', sources: [
              { src: '/videos/Stepstotheway-pal.webm', type: 'video/webm' },
              { src: '/videos/Stepstotheway-pal.mp4', type: 'video/mp4' },
            ], loop: true, muted: true, autoPlay: true },
            's17.jpg',
            ['s18-a.jpg', 's18-b.jpg'],
            's19.jpg',
            // Insert two loop videos between s19 and s20, same row (left: contentshift, right: focal)
            [
              { type: 'video', key: 'contentshift', sources: [
                { src: '/videos/contentshift.mp4', type: 'video/mp4' },
              ], loop: true, muted: true, autoPlay: true },
              { type: 'video', key: 'focal', sources: [
                { src: '/videos/focal.mp4', type: 'video/mp4' },
              ], loop: true, muted: true, autoPlay: true },
            ],
            's20.jpg',
            's21.png',
            ['s22-a.jpg', 's22-b.jpg'],
            's23.jpg',
            // Add s24–s26 pairs before final video
            ['s24-a.jpg', 's24-b.jpg'],
            ['s25-a.jpg', 's25-b.jpg'],
            ['s26-a.jpg', 's26-b.jpg'],
            // Click-to-play video after s23 and s24–26
            { type: 'videoClick', key: 'sttw', sources: [
              { src: '/videos/STTWvideo.webm', type: 'video/webm' },
              { src: '/videos/STTWvideo.mp4', type: 'video/mp4' },
            ] },
          ];

          const baseImgStyle = { width: '100%', height: 'auto', display: 'block', objectFit: 'cover' };
          const twoUpImgStyle = { width: '100%', height: '100%', display: 'block', objectFit: 'cover' };
          const videoStyle = { width: '100%', height: 'auto', display: 'block' };
          const cardStyle = { width: '100%', background: 'transparent', overflow: 'hidden' };
          const pairCardStyle = { flex: 1, background: 'transparent', overflow: 'hidden', aspectRatio: '439 / 475' };

          return sequence.map((entry, idx) => {
            if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
              if (entry.type === 'video' || entry.type === 'videoClick') {
                const key = entry.key || `video-${idx}`;
                const isClick = entry.type === 'videoClick';
                if (isClick && key === 'sttw') {
                  return <ClickToPlayVideo key={key} sources={entry.sources} />;
                }
                const commonProps = entry.type === 'video' ? { loop: true, muted: true, autoPlay: true, playsInline: true } : { playsInline: true };
                const content = (
                  <video style={videoStyle} {...commonProps} preload={isClick ? 'metadata' : 'auto'}>
                    {entry.sources.map((s, i) => (
                      <source key={`${key}-src-${i}`} src={s.src} type={s.type} />
                    ))}
                    Your browser does not support the video tag.
                  </video>
                );
                return (
                  <div key={key} className="rounded-[9px]" style={cardStyle}>
                    {content}
                  </div>
                );
              }
            }
            if (Array.isArray(entry)) {
              const isVideoPair = entry.every((x) => x && typeof x === 'object');
              if (isVideoPair) {
                const left = entry[0];
                const right = entry[1];
                return <TwoVideosEqualHeightRow key={`row-videos-${idx}`} left={left} right={right} />;
              }
              const isS24to26 = typeof entry[0] === 'string' && /s2[4-6]-/i.test(entry[0]);
              if (isS24to26) {
                // Two-up images that should not be cropped: keep width 100% per tile and natural height
                return (
                  <div key={`row-nocrop-${idx}`} className="flex gap-[10px]" style={{ width: '100%', alignItems: 'flex-start' }}>
                    <div className="rounded-[9px]" style={{ flex: 1, background: 'transparent', overflow: 'hidden' }}>
                      <img
                        src={`/photos/stepstotheway/${entry[0]}`}
                        alt={`STEPS TO THE WAY ${entry[0]}`}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="rounded-[9px]" style={{ flex: 1, background: 'transparent', overflow: 'hidden' }}>
                      <img
                        src={`/photos/stepstotheway/${entry[1]}`}
                        alt={`STEPS TO THE WAY ${entry[1]}`}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                );
              }
              // Default two-up image row with fixed aspect to enforce equal heights
              return (
                <div key={`row-${idx}`} className="flex gap-[10px]" style={{ width: '100%' }}>
                  <div className="rounded-[9px]" style={pairCardStyle}>
                    <img
                      src={`/photos/stepstotheway/${entry[0]}`}
                      alt={`STEPS TO THE WAY ${entry[0]}`}
                      style={twoUpImgStyle}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="rounded-[9px]" style={pairCardStyle}>
                    <img
                      src={`/photos/stepstotheway/${entry[1]}`}
                      alt={`STEPS TO THE WAY ${entry[1]}`}
                      style={twoUpImgStyle}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              );
            }
            return (
              <div key={`single-${idx}`} className="rounded-[9px]" style={cardStyle}>
                <img
                  src={`/photos/stepstotheway/${entry}`}
                  alt={`STEPS TO THE WAY ${entry.replace(/\.(jpg|jpeg|png)$/i, '')}`}
                  style={baseImgStyle}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            );
          });
        })()}
      </div>
    </ProjectTemplate>
  );
}
