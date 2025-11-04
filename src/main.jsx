
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './fonts.css';
import { injectFontsOnce } from './utils/fonts';
import { initBlurUp } from './utils/blurUp';
import App from './App.jsx';

// Globally prevent context menu on images and videos (casual save deterrent)
// Inject platform-routed fonts early so initial render uses correct families (helps Mainland when CDN is enabled)
injectFontsOnce();
// Initialize global blur-up (constant blur until asset is ready) for key media areas
initBlurUp();
document.addEventListener('contextmenu', (e) => {
  const target = e.target;
  if (!(target instanceof Element)) return;
  if (target.closest('[data-allow-save]')) return; // opt-out
  if (target.tagName === 'IMG' || target.tagName === 'VIDEO' || target.closest('img, video')) {
    e.preventDefault();
  }
});

document.addEventListener('dragstart', (e) => {
  const target = e.target;
  if (!(target instanceof Element)) return;
  if (target.closest('[data-allow-save]')) return; // opt-out
  if (target.tagName === 'IMG' || target.tagName === 'VIDEO' || target.closest('img, video')) {
    e.preventDefault();
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
