import React, { useState } from 'react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const EASING = 'cubic-bezier(0.77, 0, 0.175, 1)';

  return (
    <nav
      style={{
        position: 'absolute',
        top: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 'auto',
        maxWidth: '18rem',
        minWidth: '11rem',
      }}
    >
      {/* Pill */}
      <div
        style={{
          width: '100%',
          background: '#fff',
          borderRadius: '9999px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <img
          src="/logo-basenails.png"
          alt="Base Nails"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            height: '28px',
            width: 'auto',
            cursor: 'pointer',
            display: 'block',
            userSelect: 'none',
          }}
        />

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          style={{
            width: '2rem',
            height: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <span
            style={{
              width: '20px',
              height: '2px',
              background: '#000',
              borderRadius: '2px',
              display: 'block',
              transition: `transform 300ms ${EASING}`,
              transform: isOpen ? 'translateY(3.5px) rotate(45deg)' : 'none',
            }}
          />
          <span
            style={{
              width: '20px',
              height: '2px',
              background: '#000',
              borderRadius: '2px',
              display: 'block',
              transition: `transform 300ms ${EASING}`,
              transform: isOpen ? 'translateY(-3.5px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Dropdown */}
      <div
        style={{
          width: '100%',
          marginTop: '0.5rem',
          background: '#fff',
          borderRadius: '1rem',
          padding: isOpen ? '1rem' : '0 1rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'scaleY(1) translateY(0)' : 'scaleY(0.95) translateY(-0.5rem)',
          transformOrigin: 'top',
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: `opacity 300ms ${EASING}, transform 300ms ${EASING}, padding 300ms ${EASING}`,
          overflow: 'hidden',
          maxHeight: isOpen ? '200px' : '0',
        }}
      >
        {[
          { label: 'Portfólio', id: 'features' },
          { label: 'Agendamento', id: 'about' },
          { label: 'FAQ', id: 'faq' },
        ].map((item) => (
          <NavItem key={item.id} label={item.label} onClick={() => scrollToSection(item.id)} />
        ))}
      </div>
    </nav>
  );
};

const NavItem: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textAlign: 'left',
        fontWeight: 500,
        color: hovered ? '#000' : 'rgba(0,0,0,0.75)',
        background: hovered ? 'rgba(0,0,0,0.05)' : 'transparent',
        padding: '0.5rem 1rem',
        borderRadius: '0.75rem',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.9375rem',
        transition: 'color 0.2s, background 0.2s',
        width: '100%',
      }}
    >
      {label}
    </button>
  );
};
