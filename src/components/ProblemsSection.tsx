import React, { useEffect, useRef, useState } from 'react';
import { XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { SparklesText } from './ui/sparkles-text';
import Copy from './Copy';

interface ProblemCardProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  items: React.ReactNode[];
  idx: number;
  cardsVisible: boolean;
  duration?: number;
  direction?: 'clockwise' | 'counter-clockwise';
}

const ProblemCard: React.FC<ProblemCardProps> = ({
  icon,
  title,
  items,
  idx,
  cardsVisible,
  duration = 8,
  direction = 'clockwise',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePath = () => {
      if (cardRef.current) {
        const div = cardRef.current;
        const pathString = direction === 'clockwise'
          ? `path('M 0 0 H ${div.offsetWidth} V ${div.offsetHeight} H 0 V 0')`
          : `path('M 0 0 V ${div.offsetHeight} H ${div.offsetWidth} V 0 H 0')`;
        div.style.setProperty("--path", pathString);
      }
    };

    updatePath();
    window.addEventListener('resize', updatePath);
    return () => window.removeEventListener('resize', updatePath);
  }, [direction]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.85, y: 50 }}
      animate={cardsVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 50 }}
      transition={{
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        delay: idx * 0.25, // cascading card delay
      }}
      style={{
        background: '#fff',
        borderRadius: '24px',
        boxShadow: '0 24px 48px rgba(0, 0, 0, 0.04)',
        padding: '5px', // thicker border width (5px)
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible', // allows the icon to overflow freely!
      }}
    >
      {/* Glow Wrapper: clips the glow to the card boundaries */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '24px',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {/* Moving Pink Border Glow */}
        <div
          className="absolute aspect-square inset-0 animate-star-btn"
          style={{
            offsetPath: 'var(--path)',
            offsetDistance: '0%',
            width: '550px', // much longer moving trail
            pointerEvents: 'none',
            zIndex: 1,
            filter: 'blur(12px)', // softer glow blur
            backgroundImage: 'radial-gradient(ellipse at center, rgba(233, 30, 140, 0.8), rgba(233, 30, 140, 0.15) 45%, transparent 80%)',
            "--duration": `${duration}s`, // custom speed
          } as React.CSSProperties}
        />
      </div>

      {/* Inner Content Card */}
      <div
        className="problem-card-inner"
        style={{
          background: '#fff',
          borderRadius: '19px', // slightly smaller to match outer radius (24px - 5px)
          padding: '2.5rem 3.5rem 4rem 3.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          position: 'relative',
          zIndex: 2,
          flex: 1,
          width: '100%',
          height: '100%',
        }}
      >
        {/* Card Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 30 }}
          animate={cardsVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 30 }}
          transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
            delay: idx * 0.25 + 0.2, // animates in after the card container starts expanding
          }}
          className="problem-card-icon-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: '-9.5rem',
            marginBottom: '0.25rem',
          }}
        >
          {icon}
        </motion.div>

        {/* Card Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={cardsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
            delay: idx * 0.25 + 0.35, // animates in shortly after the icon
          }}
          className="problem-card-text-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.875rem',
            marginTop: '-8.5rem',
          }}
        >
          {/* Card Title */}
          <h3
            className="problem-card-title"
            style={{
              fontSize: '2.75rem',
              fontWeight: 400,
              color: '#111',
              textAlign: 'center',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginTop: '-0.75rem',
              marginBottom: '0.75rem',
            }}
          >
            {title}
          </h3>

          {/* Items List */}
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.125rem',
            }}
          >
            {items.map((item, itemIdx) => (
              <li
                key={itemIdx}
                className="problem-card-item"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.875rem',
                  fontSize: '1.25rem',
                  lineHeight: 1.5,
                  color: '#000',
                  fontWeight: 400,
                }}
              >
                <XCircle
                  size={26}
                  color="#E91E8C"
                  style={{ flexShrink: 0, marginTop: '2px' }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const ProblemsSection: React.FC = () => {
  const [cardsVisible, setCardsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      icon: <img src="/agenda.png" alt="Agenda no WhatsApp" className="problem-card-icon" style={{ width: '360px', height: '360px', objectFit: 'contain' }} />,
      title: <>Agenda no <strong>WhatsApp</strong></>,
      items: [
        <><strong>Mensagens o dia inteiro</strong>, mesmo durante o atendimento</>,
        <>Confirmar horário <strong>manualmente</strong> para cada cliente</>,
        <><strong>Erros de agendamento</strong> que geram confusão e mal-estar</>,
        <>Cliente que <strong>some sem avisar</strong> e você fica com <strong>horário vazio</strong></>,
      ],
    },
    {
      icon: <img src="/=financeiro icon.png" alt="Financeiro" className="problem-card-icon" style={{ width: '360px', height: '360px', objectFit: 'contain' }} />,
      title: <><strong>Financeiro</strong> no caderno</>,
      items: [
        <>Sem saber quanto ganhou no mês — <strong>só chutando</strong></>,
        <>Não sabe quais serviços dão <strong>mais lucro</strong></>,
        <>Despesas misturadas, sem <strong>controle real</strong></>,
        <><strong>Trabalhando muito</strong> e não vendo o <strong>dinheiro crescer</strong></>,
      ],
    },
    {
      icon: <img src="/clientes icon.png" alt="Sem histórico" className="problem-card-icon" style={{ width: '360px', height: '360px', objectFit: 'contain' }} />,
      title: <>Sem <strong>histórico</strong> das clientes</>,
      items: [
        <>Não lembra as <strong>preferências e alergias</strong> de cada uma</>,
        <>Não sabe o que fez na <strong>última vez</strong> que atendeu</>,
        <>Atendimento genérico quando poderia ser <strong>personalizado</strong></>,
        <>Clientes que somem porque <strong>não se sentem especiais</strong></>,
      ],
    },
  ];

  return (
    <section
      id="problems"
      style={{
        position: 'relative',
        zIndex: 10,
        background: '#fff',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
      }}
    >
      <div
        style={{
          maxWidth: '90rem',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Section Header */}
        <div
          style={{
            maxWidth: '85rem',
            width: '100%',
            textAlign: 'center',
            marginBottom: '8.5rem',
          }}
        >
          <Copy animateOnScroll={true}>
            <h2
              style={{
                fontWeight: 400,
                color: '#111',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: 0,
                fontSize: 'clamp(3rem, 8vw, 96px)',
                paddingBottom: '0.1em',
              }}
            >
              <div>Nós Sabemos O Que Atrapalha</div>
              <div style={{ display: 'inline-block', position: 'relative', zIndex: 10 }}>
                <SparklesText
                  text="Seu Negócio"
                  colors={{ first: '#E91E8C', second: '#FF80BF' }}
                  sparklesCount={12}
                >
                  <em className="shimmer" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#E91E8C' }}>
                    Seu Negócio
                  </em>
                </SparklesText>
              </div>
            </h2>
          </Copy>
 
          <Copy animateOnScroll={true} delay={0.15}>
            <p
              style={{
                color: '#111',
                fontSize: 'clamp(1.0625rem, 2.2vw, 1.25rem)',
                fontWeight: 400,
                maxWidth: '600px',
                margin: '1.75rem auto 0 auto',
                lineHeight: 1.6,
              }}
            >
              Enquanto você atende uma cliente, tem <strong style={{ fontWeight: 600 }}>mensagem no WhatsApp</strong>. Enquanto responde, outra fica esperando. Isso não é falta de esforço — é falta do <strong style={{ fontWeight: 600 }}>sistema certo</strong>.
            </p>
          </Copy>
        </div>
 
        {/* 3 Cards Grid */}
        <div
          ref={sectionRef}
          className="problems-grid"
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
            gap: '3rem',
          }}
        >
          {cards.map((card, idx) => {
            const duration = idx === 0 ? 8 : idx === 1 ? 11 : 9;
            const direction = idx === 1 ? 'counter-clockwise' : 'clockwise';
            return (
              <ProblemCard
                key={idx}
                icon={card.icon}
                title={card.title}
                items={card.items}
                idx={idx}
                cardsVisible={cardsVisible}
                duration={duration}
                direction={direction}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
