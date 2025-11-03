import React from 'react';
import './Tags.css';

export default function Tags({ items = [], align = 'start', maxWidth, gap = 8, className = '', style = {} }) {
  const alignClass = align === 'end' ? 'align-end' : align === 'center' ? 'align-center' : 'align-start';
  const mergedStyle = { ...style, ...(maxWidth ? { maxWidth } : {}), ['--tags-gap']: `${gap}px` };
  return (
    <div className={`tags ${alignClass} ${className}`.trim()} style={mergedStyle}>
      {items.map((text, idx) => (
        <span key={`tag-${idx}-${text}`} className="tags__chip">{text}</span>
      ))}
    </div>
  );
}
