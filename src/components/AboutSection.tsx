import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import Copy from './Copy';

export const AboutSection: React.FC = () => {
  const [starsVisible, setStarsVisible] = React.useState(false);
  const starsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (starsRef.current) {
      observer.observe(starsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        zIndex: 10,
        background: '#fff',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
      }}
    >
      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Top Area */}
        <div
          style={{
            maxWidth: '48rem',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '4rem',
          }}
        >
          {/* 5 Pink Stars — Animated Cascade Pop on Scroll + Reflection Glint */}
          <div ref={starsRef} style={{ display: 'flex', gap: '0.625rem', marginBottom: '1.75rem' }}>
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={starsVisible ? 'animate-star-pop' : ''}
                style={{
                  animationDelay: `${i * 0.12}s`,
                  display: 'inline-block',
                  transform: starsVisible ? undefined : 'scale(0)',
                }}
              >
                <span
                  className="animate-star-shimmer"
                  style={{
                    display: 'inline-block',
                    animationDelay: `${0.8 + i * 0.18}s`,
                  }}
                >
                  <Star size={48} fill="#E91E8C" color="#E91E8C" />
                </span>
              </span>
            ))}
          </div>

          <Copy animateOnScroll={true}>
            <p
              style={{
                color: '#111',
                fontSize: 'clamp(1.5rem, 3.5vw, 36px)',
                lineHeight: 1.35,
                maxWidth: '52rem',
                fontWeight: 400,
                margin: 0,
              }}
            >
              <strong style={{ fontWeight: 600 }}>+10.000 nail designers</strong> utilizam a plataforma para organizar seus agendamentos e <strong style={{ fontWeight: 600 }}>aumentar seu faturamento</strong>.
            </p>
          </Copy>
        </div>

        {/* Bottom Area */}
        <div
          style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}
          className="md:flex-row md:items-start md:justify-between md:gap-16"
        >
          {/* Left: Quotation Icon with Entrance Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3, rotate: 135, y: 20 }}
            whileInView={{ opacity: 0.9, scale: 1, rotate: 180, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
          >
            <Quote size={54} color="#E91E8C" />
          </motion.div>

          {/* Right: Persuasive copy */}
          <div style={{ flex: 1 }}>
            <Copy animateOnScroll={true}>
              <p
                style={{
                  fontSize: 'clamp(1.375rem, 3.2vw, 38px)',
                  lineHeight: 1.35,
                  fontWeight: 400,
                  color: '#111',
                  margin: 0,
                }}
              >
                Sua agenda cheia não precisa significar cansaço e desorganização. Transforme seu atendimento em um <strong style={{ fontWeight: 600 }}>sistema automático e elegante</strong>, elimine o risco de horários vagos e <strong style={{ fontWeight: 600 }}>aumente seu faturamento todos os meses</strong> com a ferramenta feita para valorizar a sua arte.
              </p>
            </Copy>
          </div>
        </div>
      </div>
    </section>
  );
};

