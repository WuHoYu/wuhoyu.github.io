import { asset } from './assets';

// Inject @font-face rules with URLs routed through asset(), so they can use CDN when enabled.
export function injectFontsOnce() {
  if (typeof document === 'undefined') return;
  if (document.querySelector('style[data-injected-fonts]')) return;

  const css = `
  /* Injected via JS to allow env-based CDN for fonts */
  @font-face {
    font-family: 'Montserrat';
    src: url('${asset('/fonts/Montserrat-VariableFont_wght.ttf')}') format('truetype');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Montserrat';
    src: url('${asset('/fonts/Montserrat-Italic-VariableFont_wght.ttf')}') format('truetype');
    font-weight: 100 900;
    font-style: italic;
    font-display: swap;
  }
  @font-face {
    font-family: 'Source Han Sans CN Normal';
    src: url('${asset('/fonts/SourceHanSansCN-Normal.otf')}') format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  `;

  const style = document.createElement('style');
  style.setAttribute('data-injected-fonts', 'true');
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}
