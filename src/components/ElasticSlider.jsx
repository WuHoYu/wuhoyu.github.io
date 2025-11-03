import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react';
// Mark motion as used for ESLint when react plugin isn't present
const _MOTION = motion;
import { useEffect, useRef, useState } from 'react';
import { RiVolumeDownFill, RiVolumeUpFill } from 'react-icons/ri';

import './ElasticSlider.css';

const MAX_OVERFLOW = 50;

export default function ElasticSlider({
  // value control
  value, // if provided, component becomes controlled
  defaultValue = 30, // used when uncontrolled
  startingValue = 0,
  maxValue = 100,
  className = '',
  isStepped = false,
  stepSize = 1,
  // visuals
  leftIcon = <RiVolumeDownFill />, 
  rightIcon = <RiVolumeUpFill />,
  showIcons = true,
  showValueIndicator = true,
  valueFormatter = (v) => Math.round(v),
  valueIndicatorStyle,
  indicatorPlacement = 'below', // 'above' | 'below'
  // sizing
  containerWidth = '12rem',
  containerGap = '1rem',
  rootMaxWidth = 200,
  baseTrackHeight = 6,
  hoverTrackHeight = 12,
  gap = '1rem',
  // colors (optional)
  trackColor,
  rangeColor,
  // events
  onChange
}) {
  return (
    <div className={`slider-container ${className}`} style={{ width: containerWidth, position: 'relative', gap: containerGap }}>
      {indicatorPlacement === 'above' && showValueIndicator && (
        <p className="value-indicator" style={valueIndicatorStyle}>{valueFormatter(value ?? defaultValue)}</p>
      )}
      <Slider
        value={value}
        defaultValue={defaultValue}
        startingValue={startingValue}
        maxValue={maxValue}
        isStepped={isStepped}
        stepSize={stepSize}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        showIcons={showIcons}
        showValueIndicator={indicatorPlacement !== 'above' && showValueIndicator}
        valueFormatter={valueFormatter}
        trackColor={trackColor}
        rangeColor={rangeColor}
        valueIndicatorStyle={valueIndicatorStyle}
        rootMaxWidth={rootMaxWidth}
        baseTrackHeight={baseTrackHeight}
        hoverTrackHeight={hoverTrackHeight}
        gap={gap}
        onChange={onChange}
      />
    </div>
  );
}

function Slider({ value: controlledValue, defaultValue, startingValue, maxValue, isStepped, stepSize, leftIcon, rightIcon, showIcons, showValueIndicator, valueFormatter, valueIndicatorStyle, rootMaxWidth, baseTrackHeight, hoverTrackHeight, gap, trackColor, rangeColor, onChange }) {
  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const sliderRef = useRef(null);
  const [region, setRegion] = useState('middle');
  const clientX = useMotionValue(0);
  const overflow = useMotionValue(0);
  const scale = useMotionValue(1);

  // keep default value in sync for uncontrolled mode
  useEffect(() => {
    if (!isControlled) {
      setUncontrolledValue(defaultValue);
    }
  }, [defaultValue, isControlled]);

  const value = isControlled ? controlledValue : uncontrolledValue;

  useMotionValueEvent(clientX, 'change', latest => {
    if (sliderRef.current) {
      const { left, right } = sliderRef.current.getBoundingClientRect();
      let newValue;

      if (latest < left) {
        setRegion('left');
        newValue = left - latest;
      } else if (latest > right) {
        setRegion('right');
        newValue = latest - right;
      } else {
        setRegion('middle');
        newValue = 0;
      }

      overflow.jump(decay(newValue, MAX_OVERFLOW));
    }
  });

  const handlePointerMove = e => {
    if (e.buttons > 0 && sliderRef.current) {
      const { left, width } = sliderRef.current.getBoundingClientRect();
      let newValue = startingValue + ((e.clientX - left) / width) * (maxValue - startingValue);

      if (isStepped) {
        newValue = Math.round(newValue / stepSize) * stepSize;
      }

      newValue = Math.min(Math.max(newValue, startingValue), maxValue);
      if (!isControlled) setUncontrolledValue(newValue);
      if (typeof onChange === 'function') onChange(newValue);
      clientX.jump(e.clientX);
    }
  };

  const handlePointerDown = e => {
    handlePointerMove(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = () => {
    animate(overflow, 0, { type: 'spring', bounce: 0.5 });
  };

  const getRangePercentage = () => {
    const totalRange = maxValue - startingValue;
    if (totalRange === 0) return 0;

    return ((value - startingValue) / totalRange) * 100;
  };

  return (
    <>
      <motion.div
        onHoverStart={() => animate(scale, 1.2)}
        onHoverEnd={() => animate(scale, 1)}
        onTouchStart={() => animate(scale, 1.2)}
        onTouchEnd={() => animate(scale, 1)}
        style={{
          scale,
          opacity: useTransform(scale, [1, 1.2], [0.7, 1]),
          gap
        }}
        className="slider-wrapper"
      >
        {showIcons && (
          <motion.div
            animate={{
              scale: region === 'left' ? [1, 1.4, 1] : 1,
              transition: { duration: 0.25 }
            }}
            style={{
              x: useTransform(() => (region === 'left' ? -overflow.get() / scale.get() : 0))
            }}
          >
            {leftIcon}
          </motion.div>
        )}

        <div
          ref={sliderRef}
          className="slider-root"
          style={{ maxWidth: rootMaxWidth }}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <motion.div
            style={{
              scaleX: useTransform(() => {
                if (sliderRef.current) {
                  const { width } = sliderRef.current.getBoundingClientRect();
                  return 1 + overflow.get() / width;
                }
              }),
              scaleY: useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.8]),
              transformOrigin: useTransform(() => {
                if (sliderRef.current) {
                  const { left, width } = sliderRef.current.getBoundingClientRect();
                  return clientX.get() < left + width / 2 ? 'right' : 'left';
                }
              }),
              height: useTransform(scale, [1, 1.2], [baseTrackHeight, hoverTrackHeight]),
              marginTop: useTransform(scale, [1, 1.2], [0, -(hoverTrackHeight - baseTrackHeight) / 2]),
              marginBottom: useTransform(scale, [1, 1.2], [0, -(hoverTrackHeight - baseTrackHeight) / 2])
            }}
            className="slider-track-wrapper"
          >
            <div className="slider-track" style={trackColor ? { backgroundColor: trackColor } : undefined}>
              <div className="slider-range" style={{ width: `${getRangePercentage()}%`, ...(rangeColor ? { backgroundColor: rangeColor } : {}) }} />
            </div>
          </motion.div>
        </div>

        {showIcons && (
          <motion.div
            animate={{
              scale: region === 'right' ? [1, 1.4, 1] : 1,
              transition: { duration: 0.25 }
            }}
            style={{
              x: useTransform(() => (region === 'right' ? overflow.get() / scale.get() : 0))
            }}
          >
            {rightIcon}
          </motion.div>
        )}
      </motion.div>
      {showValueIndicator && (
        <p className="value-indicator" style={valueIndicatorStyle}>{valueFormatter(value)}</p>
      )}
    </>
  );
}

function decay(value, max) {
  if (max === 0) {
    return 0;
  }

  const entry = value / max;
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);

  return sigmoid * max;
}
