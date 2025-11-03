
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './fonts.css';
import App from './App.jsx';

// Globally prevent context menu on images and videos (casual save deterrent)
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
