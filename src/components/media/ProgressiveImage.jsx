import React, { useEffect, useMemo, useRef, useState } from 'react';
import { asset } from '../../utils/assets';
import './progressive.css';

/**
 * ProgressiveImage: Blur-up image loader (Kent C. Dodds style)
 * - Renders a tiny blurred placeholder immediately
 * - Fades in the final image once decoded
 * - Preserves aspect ratio (via width/height or explicit aspectRatio prop)
 *
 * Props:
 * - src: string (required) final image path (will be routed via asset())
 * - placeholderSrc?: string | data URL (tiny LQIP). If omitted, shows a neutral background.
 * - alt: string (required)
 * - width?: number
 * - height?: number
 * - aspectRatio?: string | number (e.g., '16/9' or 1.777)
 * - sizes?: string
 * - priority?: boolean (true => eager + fetchPriority="high")
 * - className?: string (applied to wrapper)
 * - imgClassName?: string (applied to full image)
 * - style?: React.CSSProperties
 * - onLoad?: (e: Event) => void
 * - onError?: (e: Event) => void
 */
export default function ProgressiveImage({
  src,
  placeholderSrc,
  alt,
  width,
  height,
  aspectRatio,
  sizes,
  priority = false,
  className = '',
  imgClassName = '',
  style = {},
  onLoad,
  onError,
}) {
  const [loaded, setLoaded] = useState(false);
  const finalSrc = useMemo(() => (src ? asset(src) : ''), [src]);
  const tinySrc = useMemo(() => {
    if (!placeholderSrc) return '';
    return placeholderSrc.startsWith('data:') ? placeholderSrc : asset(placeholderSrc);
  }, [placeholderSrc]);

  const ref = useRef(null);
  const wrapperStyle = { ...style };

  // Preserve aspect ratio if possible
  if (width && height) {
    wrapperStyle.aspectRatio = `${width} / ${height}`;
  } else if (aspectRatio) {
    wrapperStyle.aspectRatio = typeof aspectRatio === 'number' ? String(aspectRatio) : aspectRatio;
  }

  useEffect(() => {
    setLoaded(false);
  }, [finalSrc]);

  return (
    <div className={`pg-img ${className}`.trim()} style={wrapperStyle}>
      {/* Placeholder layer (optional) */}
      {tinySrc ? (
        <img
          className={`pg-img__ph ${loaded ? 'pg-hidden' : ''}`}
          src={tinySrc}
          alt=""
          aria-hidden
          decoding="async"
          loading={priority ? 'eager' : 'lazy'}
        />
      ) : (
        <div className={`pg-img__ph pg-img__ph--solid ${loaded ? 'pg-hidden' : ''}`} aria-hidden />
      )}

      {/* Final image */}
      <img
        className={`pg-img__full ${imgClassName} ${loaded ? 'pg-visible' : ''}`.trim()}
        src={finalSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={(e) => {
          setLoaded(true);
          if (onLoad) onLoad(e);
        }}
        onError={onError}
      />
    </div>
  );
}
