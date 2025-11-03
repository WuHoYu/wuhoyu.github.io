// Shared time mapping: 0→06:00, 30→12:00, 70→17:00, 100→20:00
export function formatClockFromPercent(v) {
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const val = clamp(v ?? 0, 0, 100);
  let minutes;
  if (val <= 30) {
    minutes = 6 * 60 + (val / 30) * 6 * 60; // 06:00 → 12:00
  } else if (val <= 70) {
    minutes = 12 * 60 + ((val - 30) / 40) * 5 * 60; // 12:00 → 17:00
  } else {
    minutes = 17 * 60 + ((val - 70) / 30) * 3 * 60; // 17:00 → 20:00
  }
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  const hh = String(h).padStart(2, '0');
  const mm = String(m).padStart(2, '0');
  return `${hh}:${mm}`;
}
