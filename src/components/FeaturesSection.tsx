import React, { useEffect, useRef, useState } from 'react';
import { DriftLogo } from './DriftLogo';

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
}

const featuresData: FeatureItem[] = [
  {
    id: 'feature-1',
    title: 'Feito para leveza, não urgência',
    description:
      'Eliminamos o ruído que torna a organização cansativa. Cada superfície é suave, tranquila e intuitiva para você avançar sem travar.',
    videoUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_102608_5fa1187d-9ac6-44fb-82ab-54376200abc0.mp4',
  },
  {
    id: 'feature-2',
    title: 'A forma mais gentil de começar',
    description:
      'Começar o dia deve parecer natural, não intimidador. Com sinais sutis e uma visão clara, você sabe exatamente onde colocar sua energia agora.',
    videoUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260625_174131_395bc785-bb21-4e65-abf6-27c56f0764b6.mp4',
  },
  {
    id: 'feature-3',
    title: 'Foco profundo e sem distrações',
    description:
      'Sem interrupções, sem baúnza. Um layout minimalista que suaviza tudo ao redor até você estar pronto para mudar de tarefa.',
    videoUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260525_052706_d2e390fd-1846-4fe7-a4d8-8d2f1c875358.mp4',
  },
];

const BG_IMAGE =
  "url('https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260709_082449_46df5cc4-ad98-4541-9236-a2659c1478a4.png&w=1920&q=85')";

export const FeaturesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // Pre-reveal the first card so it's visible on load
  const [revealedCards, setRevealedCards] = useState<Record<number, boolean>>({ 0: true });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Observer for active index detection
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-10% 0px -10% 0px' }
    );

    // Observer for reveal animation
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setRevealedCards((prev) => ({ ...prev, [index]: true }));
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) {
        activeObserver.observe(ref);
        revealObserver.observe(ref);
      }
    });

    return () => {
      activeObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  const scrollToCard = (index: number) => {
    const targetCard = cardRefs.current[index];
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      id="features"
      className="relative z-20 text-white overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Section-scoped background image (absolute, not fixed) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: BG_IMAGE,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
      />

      {/* Content sits above the bg */}
      <div
        style={{ position: 'relative', zIndex: 1 }}
        className="px-5 md:px-10 lg:px-16 py-20 md:py-40 lg:py-48 max-w-7xl mx-auto"
      >
        <div
          className="grid grid-cols-1 items-start"
          style={{ gap: '4rem' }}
        >
          {/* On lg+ we use a 2-column grid */}
          <style>{`
            @media (min-width: 1024px) {
              .features-grid {
                grid-template-columns: 400px 1fr;
                gap: 6rem;
              }
            }
            @media (min-width: 1280px) {
              .features-grid {
                grid-template-columns: 460px 1fr;
                gap: 12rem;
              }
            }
          `}</style>
          <div className="features-grid grid grid-cols-1 items-start gap-16">

            {/* Left Column (Sticky on Desktop) */}
            <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between lg:py-32">
              <div>
                <h2
                  className="text-white font-normal leading-tight"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 46px)', lineHeight: 1.2 }}
                >
                  Software que acompanha sua mente, não a atropela
                </h2>

                {/* Feature Nav Buttons — desktop only */}
                <div className="hidden lg:flex flex-col gap-3 mt-10">
                  {featuresData.map((feature, idx) => {
                    const isActive = activeIndex === idx;
                    return (
                      <button
                        key={feature.id}
                        onClick={() => scrollToCard(idx)}
                        className="text-left px-5 py-3.5 rounded-2xl backdrop-blur-sm transition-all duration-300 font-medium text-base cursor-pointer"
                        style={{
                          background: 'rgba(0,0,0,0.25)',
                          color: isActive ? '#fff' : 'rgba(255,255,255,0.35)',
                          border: isActive ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent',
                        }}
                      >
                        {feature.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom CTA — desktop only */}
              <div className="hidden lg:flex flex-col items-start gap-4 mt-8">
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', fontWeight: 500 }}>
                  Sem complicação. Sem agendamento perdido. Só o seu trabalho, em destaque.
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  style={{
                    background: '#fff',
                    color: '#000',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    padding: '0.625rem 1.25rem',
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    border: 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.9)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
                >
                  Comece grátis
                </button>
              </div>
            </div>

            {/* Right Column (Scrolling Cards) */}
            <div className="flex flex-col gap-12 lg:gap-20">
              {featuresData.map((feature, idx) => {
                const isRevealed = !!revealedCards[idx];
                return (
                  <div
                    key={feature.id}
                    ref={(el) => { cardRefs.current[idx] = el; }}
                    data-index={idx}
                    style={{
                      background: 'rgba(0,0,0,0.22)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      borderRadius: '1.5rem',
                      padding: '2.5rem',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.5rem',
                      transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
                      opacity: isRevealed ? 1 : 0,
                      transform: isRevealed ? 'translateX(0)' : 'translateX(4rem)',
                    }}
                  >
                    {/* SVG Logo */}
                    <DriftLogo size={40} fill="rgba(255,255,255,0.8)" />

                    {/* Title */}
                    <h3
                      style={{
                        color: '#fff',
                        fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                        fontWeight: 500,
                        margin: 0,
                      }}
                    >
                      {feature.title}
                    </h3>

                    {/* Video */}
                    <div
                      style={{
                        aspectRatio: '16/9',
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        background: 'rgba(0,0,0,0.3)',
                        width: '100%',
                      }}
                    >
                      <video
                        src={feature.videoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>

                    {/* Description */}
                    <p
                      style={{
                        color: 'rgba(255,255,255,0.6)',
                        fontWeight: 500,
                        fontSize: '0.9375rem',
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
