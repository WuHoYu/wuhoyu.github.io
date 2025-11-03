import React, { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
// Mark motion as used for ESLint when react plugin isn't present
const _MOTION = motion;

/**
 * AnimatedTooltip (React)
 * A small, framework-agnostic recreation of an animated tooltip list inspired by various UI libs.
 *
 * Props:
 * - items: Array<{ id?: string|number, name: string, subtitle?: string, image?: string }>
 * - size: avatar diameter in px (default 48)
 * - gap: gap between items in px (default 12)
 * - className: optional extra classes for the container
 */
export default function AnimatedTooltip({ items = [], size = 35, className = '', initialsStyle = 'dot' /* 'dot' | 'compact' */, initialsWeight = 500, bgValue = 30 /* 0-100 to decide dark/light tooltip theme */, borderColor }) {
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(null); // { index, x, y, top }

  const avatarStyle = useMemo(() => ({ width: size, height: size }), [size]);
  const isDark = Number(bgValue) < 60;
  const computedBorderColor = borderColor ?? (isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)');

  function getInitials(name) {
    if (!name || typeof name !== 'string') return '?';
    // Split on spaces and dots; keep first char of first two parts
    const parts = name
      .split(/[\s.]+/)
      .filter(Boolean)
      .map((p) => p.trim());
    const first = parts[0]?.[0]?.toUpperCase();
    const second = parts[1]?.[0]?.toUpperCase();
    if (!first) return '?';
    if (!second) return first;
    return initialsStyle === 'dot' ? `${first}.${second}` : `${first}${second}`;
  }

  function handleEnter(index, e) {
    // Anchor tooltip to the avatar's center; don't follow cursor
    const rect = containerRef.current?.getBoundingClientRect();
    const btnRect = (e.currentTarget || e.target)?.getBoundingClientRect?.();
    if (!rect || !btnRect) return;
    const x = btnRect.left + btnRect.width / 2 - rect.left;
    const top = btnRect.top - rect.top;
    setHovered({ index, x, y: 0, top, tilt: 0 });
  }

  function handleMove(index, e) {
    // Keep tooltip fixed, only adjust a subtle rotate based on horizontal pointer position within the avatar
    const btnRect = (e.currentTarget || e.target)?.getBoundingClientRect?.();
    if (!btnRect) return;
    const rel = (e.clientX - btnRect.left) / btnRect.width; // 0..1
    const centered = Math.max(-1, Math.min(1, (rel - 0.5) * 2)); // -1..1
    const MAX_TILT = 7; // degrees
    const tilt = centered * MAX_TILT;
    setHovered((prev) => (prev && prev.index === index ? { ...prev, tilt } : prev));
  }

  function handleLeave() {
    setHovered(null);
  }

  // no-op placeholder removed

  return (
    <div ref={containerRef} className={`relative select-none ${className}`} style={{ fontFamily: 'Montserrat' }}>
      <div className="flex items-center">
        {items.map((item, index) => (
          <motion.button
            key={item.id ?? index}
            type="button"
            className={`relative grid place-items-center rounded-full overflow-hidden focus:outline-none border select-none`}
            style={{
              ...avatarStyle,
              marginLeft: index === 0 ? 0 : -Math.max(4, Math.round(size * 0.28)),
              zIndex: hovered?.index === index ? 20 : index + 1, // hovered on top
              borderColor: computedBorderColor,
              backgroundColor: isDark ? '#5e5e5eff' : '#d2d2d2ff',
              color: isDark ? '#ffffff' : '#282828ff',
            }}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.12 }}
            transition={{ type: 'spring', stiffness: 360, damping: 22 }}
            onMouseEnter={(e) => handleEnter(index, e)}
            onMouseMove={(e) => handleMove(index, e)}
            onMouseLeave={handleLeave}
            onFocus={(e) => handleEnter(index, { clientX: e.target.getBoundingClientRect().left + size / 2, clientY: e.target.getBoundingClientRect().top })}
            onBlur={handleLeave}
            aria-label={item.name}
          >
            <span className="tracking-tight select-none" style={{ fontSize: Math.max(11, size * 0.34), fontWeight: initialsWeight }}>
              {getInitials(item.name)}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {hovered && items[hovered.index] && (
          <motion.div
            key={`tooltip-${hovered.index}`}
            className="pointer-events-none absolute z-10"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: hovered.x, top: hovered.top - (size * 1.35) }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26, mass: 0.6 }}
            style={{ left: 0 }}
          >
            <motion.div
              className={`relative -translate-x-1/2 text-xs text-center`}
              style={{
                fontFamily: 'Montserrat',
                transformOrigin: '50% 100%',
                backgroundColor: isDark ? 'rgba(0,0,0,0.90)' : 'rgba(255,255,255,0.90)',
                color: isDark ? '#fff' : '#000',
                padding: '4px 10px',
                borderRadius: 8,
                boxSizing: 'border-box',
              }}
              initial={{ rotate: 0 }}
              animate={{ rotate: hovered.tilt ?? 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="font-bold leading-none" style={{ fontSize: 14 }}>
                {items[hovered.index].name}
              </div>
              {items[hovered.index].subtitle && (
                <div style={{ marginTop: 2, fontSize: 10, lineHeight: 1.25, fontWeight: 500, opacity: 0.8 }}>
                  {items[hovered.index].subtitle}
                </div>
              )}
              <div
                className={`absolute left-1/2 top-full -mt-1 h-2 w-2 -translate-x-1/2 rotate-45`}
                style={{
                  backgroundColor: isDark ? 'rgba(0,0,0,0.90)' : 'rgba(255,255,255,0.90)'
                }}
              ></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
