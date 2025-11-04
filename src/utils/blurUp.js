// Global blur-up initializer: applies constant blur to target media and
// removes it once the asset is ready. No wrappers; no layout changes.
// Opt-out by adding [data-no-blur] to an <img> or <video>.

const SELECTORS = [
  '.project-right img',
  '.project-right video',
  '.showcase-thumb .showcase-thumb-media'
];

const handled = new WeakSet();

function applyBlur(el) {
  if (!el || handled.has(el) || el.matches('[data-no-blur]')) return;
  handled.add(el);

  // Add initial blur class
  el.classList.add('blur-on-load');

  const markReady = () => {
    el.classList.add('is-ready');
    cleanup();
  };

  function onImgLoad() {
    markReady();
  }
  function onVideoReady() {
    // loadeddata fires when first frame is available
    markReady();
  }

  function cleanup() {
    if (el.tagName === 'IMG') {
      el.removeEventListener('load', onImgLoad);
      el.removeEventListener('error', onImgLoad);
    } else if (el.tagName === 'VIDEO') {
      el.removeEventListener('loadeddata', onVideoReady);
      el.removeEventListener('error', onVideoReady);
    }
  }

  // If already ready (from cache), reveal immediately
  if (el.tagName === 'IMG') {
    if (el.complete) {
      markReady();
    } else {
      el.addEventListener('load', onImgLoad, { once: true });
      el.addEventListener('error', onImgLoad, { once: true });
    }
  } else if (el.tagName === 'VIDEO') {
    if (el.readyState >= 2 /* HAVE_CURRENT_DATA */) {
      markReady();
    } else {
      el.addEventListener('loadeddata', onVideoReady, { once: true });
      el.addEventListener('error', onVideoReady, { once: true });
    }
  }
}

export function initBlurUp() {
  if (typeof document === 'undefined') return;

  // Apply to existing targets
  SELECTORS.forEach(sel => {
    document.querySelectorAll(sel).forEach(applyBlur);
  });

  // Observe future additions (e.g., route changes)
  const mo = new MutationObserver(mutations => {
    for (const m of mutations) {
      if (m.type !== 'childList') continue;
      m.addedNodes.forEach(node => {
        if (!(node instanceof HTMLElement)) return;
        // If the added node is itself an img/video, or contains any targets
        if (node.matches && (node.matches('img, video') || SELECTORS.some(sel => node.matches(sel)))) {
          if (node.matches('img, video')) applyBlur(node);
          SELECTORS.forEach(sel => node.querySelectorAll(sel).forEach(applyBlur));
        } else {
          SELECTORS.forEach(sel => node.querySelectorAll(sel).forEach(applyBlur));
        }
      });
    }
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
}
