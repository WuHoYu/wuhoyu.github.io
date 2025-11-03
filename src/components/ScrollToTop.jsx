import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({ behavior = 'auto' }) {
  const location = useLocation();

  useEffect(() => {
    // If navigating to an anchor (hash), allow the browser to handle it
    if (location.hash) return;
    try {
      window.scrollTo({ top: 0, left: 0, behavior });
    } catch {
      // fallback for older browsers
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.search, location.hash, behavior]);

  return null;
}
