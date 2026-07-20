import React from "react";
import { ArrowRight } from "lucide-react";

export function GetStartedButton({ text = "Comece grátis" }: { text?: string }) {
  const [hovered, setHovered] = React.useState(false);
  const PINK = '#E91E8C';

  return (
    <button
      className="group relative overflow-hidden shimmer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: PINK,
        color: '#fff',
        fontSize: '1.0625rem',
        fontWeight: 600,
        letterSpacing: '-0.01em',
        padding: '0.75rem 3.5rem 0.75rem 2rem',
        borderRadius: '16px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <span
        style={{
          transition: 'opacity 0.4s ease',
          opacity: hovered ? 0 : 1,
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </span>
      <span
        style={{
          position: 'absolute',
          right: '0.375rem',
          top: '0.375rem',
          bottom: '0.375rem',
          width: hovered ? 'calc(100% - 0.75rem)' : '2.75rem',
          background: '#fff',
          borderRadius: '12px',
          display: 'grid',
          placeItems: 'center',
          zIndex: 10,
          transition: 'width 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <ArrowRight size={20} color={PINK} strokeWidth={2.5} aria-hidden="true" />
      </span>
    </button>
  );
}
