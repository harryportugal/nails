import React, { useRef, useId } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollTextPathProps {
  text: string;
  d: string;
  color?: string;
  fontSize?: string;
  fontFamily?: string;
  viewBox?: string;
  reverse?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
}

export const ScrollTextPath: React.FC<ScrollTextPathProps> = ({
  text,
  d,
  color = '#E91E8C',
  fontSize = '38px',
  fontFamily = "'Neue Montreal', sans-serif",
  viewBox = "0 0 1000 200",
  reverse = false,
  strokeColor,
  strokeWidth = 90,
}) => {
  const uniqueId = useId().replace(/:/g, '');
  const pathId = `curve-${uniqueId}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);

  useGSAP(() => {
    if (!textPathRef.current || !pathRef.current || !containerRef.current) return;

    const textPathEl = textPathRef.current;
    const pathEl = pathRef.current;
    const length = pathEl.getTotalLength();

    // Set initial offset and end offset
    // Restored natural text scroll range
    const startVal = reverse ? -length : length;
    const endVal = reverse ? 0 : -length * 0.5;

    // Animate startOffset on scroll
    gsap.fromTo(textPathEl,
      { attr: { startOffset: startVal } },
      {
        attr: { startOffset: endVal },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2, // smooth scrub matches the lerp effect perfectly!
        }
      }
    );
  }, { scope: containerRef, dependencies: [d, reverse] });

  return (
    <div ref={containerRef} style={{ width: '100%', overflow: 'hidden', userSelect: 'none' }}>
      <svg
        width="100%"
        height="auto"
        viewBox={viewBox}
        style={{
          display: 'block',
          overflow: 'visible', // prevents clipping of the stroke ribbon
        }}
      >
        {/* Background ribbon band path */}
        {strokeColor && (
          <path
            d={d}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        )}
        <path
          ref={pathRef}
          id={pathId}
          d={d}
          fill="none"
        />

        {/* Main Text */}
        <text
          style={{
            fill: color, // Reverted to plain color fill
            fontSize,
            fontFamily,
            fontWeight: 600, // slightly bolder text for high contrast on the ribbon
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            dominantBaseline: 'middle', // vertically center the text on the path
          }}
        >
          <textPath ref={textPathRef} href={`#${pathId}`}>
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
};
