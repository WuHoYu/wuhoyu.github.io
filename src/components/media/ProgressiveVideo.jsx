import React, { useEffect, useMemo, useRef, useState } from 'react';
import { asset } from '../../utils/assets';
import './progressive.css';

/**
 * ProgressiveVideo: Poster/placeholder → video fade-in
 * - Shows an optional placeholder (poster image or solid) immediately
 * - Fades the video in on canplay/loadeddata
 * - Preserves aspect ratio via width/height or aspectRatio prop
 *
 * Props:
 * - src: string (required) video path (routed via asset())
 * - posterSrc?: string placeholder image (tiny LQIP recommended); routed via asset()
 * - width?: number
 * - height?: number
 * - aspectRatio?: string | number (e.g., '16/9')
 * - autoPlay?: boolean (default true)
 * - muted?: boolean (default true)
 * - loop?: boolean (default true)
 * - playsInline?: boolean (default true)
 * - preload?: 'none' | 'metadata' | 'auto' (default 'metadata')
 * - className?: string wrapper
 * - videoClassName?: string applied to <video>
 * - style?: CSSProperties wrapper
 * - videoStyle?: CSSProperties for <video>
 * - onReady?: (HTMLVideoElement) => void (after canplay)
 */
export default function ProgressiveVideo({
  src,
  posterSrc,
  width,
  height,
  aspectRatio,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  preload = 'metadata',
  className = '',
  videoClassName = '',
  style = {},
  videoStyle = {},
  onReady,
}) {
  const [ready, setReady] = useState(false);
  const vref = useRef(null);

  const finalSrc = useMemo(() => (src ? asset(src) : ''), [src]);
  const poster = useMemo(() => {
    if (!posterSrc) return '';
    return posterSrc.startsWith('data:') ? posterSrc : asset(posterSrc);
  }, [posterSrc]);

  const wrapperStyle = { ...style };
  if (width && height) wrapperStyle.aspectRatio = `${width} / ${height}`;
  else if (aspectRatio) wrapperStyle.aspectRatio = typeof aspectRatio === 'number' ? String(aspectRatio) : aspectRatio;

  useEffect(() => { setReady(false); }, [finalSrc]);

  const handleCanPlay = () => {
    setReady(true);
    if (onReady && vref.current) onReady(vref.current);
  };

  return (
    <div className={`pg-img ${className}`.trim()} style={wrapperStyle}>
      {/* Placeholder layer */}
      {poster ? (
        <img className={`pg-img__ph ${ready ? 'pg-hidden' : ''}`} src={poster} alt="" aria-hidden decoding="async" />
      ) : (
        <div className={`pg-img__ph pg-img__ph--solid ${ready ? 'pg-hidden' : ''}`} aria-hidden />
      )}

      <video
        ref={vref}
        className={`pg-vid__full ${videoClassName} ${ready ? 'pg-visible' : ''}`.trim()}
        src={finalSrc}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload={preload}
        onCanPlay={handleCanPlay}
        onLoadedData={!ready ? handleCanPlay : undefined}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden', transform: 'translateZ(0)',
          ...videoStyle,
        }}
      />
    </div>
  );
}
