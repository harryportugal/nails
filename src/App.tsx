import React from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { AboutSection } from './components/AboutSection';
import { ScrollTextSection } from './components/ScrollTextSection';
import { ProblemsSection } from './components/ProblemsSection';
import { SolutionSection } from './components/SolutionSection';
import CardsCarouselSection from './components/CardsCarouselSection';
import PricingSection from './components/PricingSection';
import FooterSection from './components/FooterSection';
import { SparklesText } from './components/ui/sparkles-text';
import { GetStartedButton } from './components/ui/get-started-button';
import Copy from './components/Copy';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#000',
        color: '#fff',
        fontFamily: "'Neue Montreal', sans-serif",
        overflowX: 'clip',
      }}
    >
      {/* ── SECTION 1: HERO ── */}
      <section
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: '3rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          background: '#fff',
        }}
      >
        {/* Background split hands animation using clipPath & composable float — zIndex 10 to layer OVER headline */}
        <div
          className="animate-hand-left"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <img
            src="/maos.png"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="sync"
            className="animate-float-left"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center bottom',
              clipPath: 'polygon(0 0, calc(50% - 1px) 0, calc(50% - 1px) 100%, 0 100%)',
              imageRendering: 'high-quality' as React.CSSProperties['imageRendering'],
            }}
          />
        </div>

        <div
          className="animate-hand-right"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <img
            src="/maos.png"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="sync"
            className="animate-float-right"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center bottom',
              clipPath: 'polygon(calc(50% - 2px) 0, 100% 0, 100% 100%, calc(50% - 2px) 100%)',
              imageRendering: 'high-quality' as React.CSSProperties['imageRendering'],
            }}
          />
        </div>
        {/* Hero Content — zIndex 1 so hands float ON TOP of headline */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '64rem',
            margin: '0 auto',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Heading */}
          <h1
            style={{
              position: 'relative',
              top: '55px',
              fontWeight: 400,
              color: '#111',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: 0,
              fontSize: 'clamp(3rem, 8vw, 96px)',
              paddingBottom: '0.1em',
            }}
          >
            <Copy animateOnScroll={false} delay={0.2} useBlur={true}>
              <div>App Inteligente Para</div>
            </Copy>
            <motion.div
              initial={{ opacity: 0, y: 28, filter: 'blur(16px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, delay: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
              style={{ position: 'relative', zIndex: 30, display: 'inline-block' }}
            >
              <SparklesText
                text="Nails Designers"
                colors={{ first: '#E91E8C', second: '#FF80BF' }}
                sparklesCount={18}
              >
                <em className="shimmer" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#E91E8C' }}>
                  Nails Designers
                </em>
              </SparklesText>
            </motion.div>
          </h1>

          {/* Subtitle */}
          <Copy animateOnScroll={false} delay={0.75} useBlur={true}>
            <p
              style={{
                marginTop: '1.75rem',
                color: '#111',
                fontSize: 'clamp(1.0625rem, 2.2vw, 1.25rem)',
                fontWeight: 400,
                maxWidth: '540px',
                lineHeight: 1.6,
              }}
            >
              O portfólio e a ferramenta de <strong style={{ fontWeight: 600 }}>agendamento</strong> feita para{' '}
              <strong style={{ fontWeight: 600 }}>nail designers</strong> que querem focar na{' '}
              <strong style={{ fontWeight: 600 }}>arte</strong>, não na burocracia.
            </p>
          </Copy>

          <div
            style={{
              marginTop: '2.25rem',
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 20,
              animation: 'star-pop 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.95s both',
            }}
          >
            <GetStartedButton />
          </div>

        </div>
      </section>

      {/* ── SECTION 2: ABOUT ── */}
      <AboutSection />

      {/* ── TRANSITION: SCROLL LETTERS ── */}
      <ScrollTextSection />

      {/* ── SECTION 3: PROBLEMS ── */}
      <ProblemsSection />

      {/* ── SECTION 4: SOLUTION ── */}
      <SolutionSection />

      {/* ── SECTION 5: CAROUSEL ── */}
      <CardsCarouselSection />

      {/* ── SECTION 6: PRICING ── */}
      <PricingSection />

      {/* ── SECTION 7: FOOTER ── */}
      <FooterSection />

    </div>
  );
};

export default App;
