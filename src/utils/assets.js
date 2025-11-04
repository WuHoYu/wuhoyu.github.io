// Helper to prefix asset paths with an optional CDN base.
// Usage: asset('/photos/foo.jpg') -> '/photos/foo.jpg' (default)
// If VITE_ASSET_BASE is set, returns `${VITE_ASSET_BASE}/photos/foo.jpg`.
export function asset(path) {
  const base = import.meta.env.VITE_ASSET_BASE || '';
  if (!path) return path;
  // Ensure we don't add duplicate slashes when concatenating
  if (!base) return path;
  if (base.endsWith('/') && path.startsWith('/')) return base.slice(0, -1) + path;
  return base + path;
}
