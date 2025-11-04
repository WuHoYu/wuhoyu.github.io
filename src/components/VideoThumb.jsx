import React, { useEffect, useRef } from 'react';
import { asset } from '../utils/assets';

export default function VideoThumb({
  srcBase, 
  className = '',
  autoPlay = true,
  loop = false,
  muted = true,
  playsInline = true,
  preload = 'metadata',
  poster,
  // Plain video: provide a palindrome asset if you want ping-pong
  inViewOnly = true,
  blurOnLoad = false,
}) {
  const ref = useRef(null);
  const inViewRef = useRef(true);
  const [ready, setReady] = React.useState(false);
  

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const mql = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const prefersReduced = !!mql && mql.matches;

    // no ping-pong logic; assets should loop themselves if needed

    if (autoPlay && !prefersReduced) {
      video.play().catch(() => {});
    }

    return () => {
      // nothing to clean
    };
  }, [autoPlay, loop]);

  useEffect(() => {
    if (!inViewOnly) return;
    const video = ref.current;
    if (!video) return;

    const mql = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const prefersReduced = !!mql && mql.matches;

    const io = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        const isVisible = !!entry?.isIntersecting;
        inViewRef.current = isVisible;
        if (isVisible) {
          if (!prefersReduced) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { root: null, threshold: 0.1, rootMargin: '100px 0px 100px 0px' }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [inViewOnly]);

  return (
    <video
      ref={ref}
      className={(className + (blurOnLoad ? ` blur-on-load${ready ? ' is-ready' : ''}` : '')).trim()}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload={preload}
      poster={poster}
      disablePictureInPicture
      controlsList="nofullscreen noremoteplayback nodownload"
      disableRemotePlayback
      autoPlay
      onLoadedData={() => setReady(true)}
    >
      <source src={asset(`/videos/${srcBase}.webm`)} type="video/webm" />
      <source src={asset(`/videos/${srcBase}.mp4`)} type="video/mp4" />
    </video>
  );
}
