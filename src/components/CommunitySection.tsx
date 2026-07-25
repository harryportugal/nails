import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, GraduationCap, Gift } from 'lucide-react';
import Copy from './Copy';
import { SparklesText } from './ui/sparkles-text';

interface CommunityCard {
  id: string;
  icon: React.ElementType;
  title: string;
  badge: string;
  description: React.ReactNode;
}

const CARDS: CommunityCard[] = [
  {
    id: 'marketplace',
    icon: ShoppingBag,
    title: 'Marketplace com desconto exclusivo',
    badge: 'Mais uma fonte de renda pro seu salão',
    description: (
      <>
        Compre <strong className="font-bold text-neutral-950">semijoias, cosméticos e outros produtos</strong> com preço especial de parceiros pra <strong className="font-bold text-neutral-950">revender no seu salão</strong>, só pra quem é da <strong className="font-bold text-neutral-950">comunidade BaseNails</strong>.
      </>
    ),
  },
  {
    id: 'treinamentos',
    icon: GraduationCap,
    title: 'Treinamentos e Técnicas',
    badge: 'Cresça na profissão',
    description: (
      <>
        Cursos selecionados no Marketplace pra você <strong className="font-bold text-neutral-950">se profissionalizar</strong>, aprender <strong className="font-bold text-neutral-950">novas técnicas</strong> e <strong className="font-bold text-neutral-950">cobrar mais caro</strong> pelo seu trabalho.
      </>
    ),
  },
  {
    id: 'indicacao',
    icon: Gift,
    title: 'Sistema de Indicação',
    badge: 'O app se paga sozinho',
    description: (
      <>
        Indique o BaseNails pra <strong className="font-bold text-neutral-950">outras profissionais da área</strong>. A cada <strong className="font-bold text-neutral-950">indicação confirmada</strong> você ganha <strong className="font-bold text-neutral-950">10.000 Nail Points</strong>, e ainda dá um <strong className="font-bold text-neutral-950">bônus de boas-vindas</strong> pra quem você indicou.
      </>
    ),
  },
];

export const CommunitySection: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 bg-white text-neutral-900 overflow-hidden select-none px-2 sm:px-4 lg:px-6 w-full">
      {/* Moldura Cinza Claro Ampliada ponta a ponta */}
      <div className="w-full max-w-[98%] 2xl:max-w-[104rem] mx-auto bg-[#fbfbfb] rounded-[36px] px-5 sm:px-8 md:px-10 py-10 md:py-14 relative z-10">
        
        {/* --- Header da Seção --- */}
        <div className="flex flex-col items-center text-center mb-14">
          {/* Título Principal */}
          <Copy animateOnScroll={true}>
            <h2
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 64px)',
                fontWeight: 400,
                color: '#111',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Muito Mais Que{' '}
              <SparklesText
                text="Uma Agenda"
                colors={{ first: '#E91E8C', second: '#FF80BF' }}
                sparklesCount={14}
              >
                <em
                  className="shimmer"
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: 'italic',
                    color: '#E91E8C',
                    fontWeight: 400,
                    position: 'relative',
                    top: 'calc(0.1em + 6px)',
                  }}
                >
                  Uma Agenda
                </em>
              </SparklesText>
            </h2>
          </Copy>

          {/* Subtítulo */}
          <Copy animateOnScroll={true} delay={0.1}>
            <p className="mt-5 text-lg sm:text-xl text-neutral-700 font-normal leading-relaxed max-w-3xl mx-auto">
              Você entra pra <strong className="font-semibold text-neutral-900">organizar o salão</strong> e sai fazendo parte de uma rede que te ajuda a <strong className="font-semibold text-neutral-900">crescer, economizar</strong> e ainda <strong className="font-semibold text-neutral-900">ganhar dinheiro de volta</strong>.
            </p>
          </Copy>
        </div>

        {/* --- Grid de 3 Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {CARDS.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ y: 36, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="h-full bg-white rounded-[28px] p-8 md:p-9 flex flex-col justify-between border border-neutral-100/80 transition-all duration-300 group relative overflow-hidden hover:shadow-lg hover:border-pink-200/50"
              >
                <div>
                  {/* Topo do Card: Ícone em Destaque */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-100/90 to-rose-50 text-[#E91E8C] flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm border border-pink-100/60">
                      <IconComponent className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Título do Card */}
                  <h3 className="text-2xl font-normal text-neutral-900 mb-3 group-hover:text-[#E91E8C] transition-colors leading-snug">
                    {card.title}
                  </h3>

                  {/* Badge de Destaque / Tag */}
                  <div className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#f4f4f4] text-neutral-900 border border-neutral-200/80 mb-5 relative overflow-hidden">
                    <span className="relative z-10">{card.badge}</span>
                  </div>

                  {/* Descrição em Texto Preto com Palavras em Bold */}
                  <p className="text-neutral-800 text-base leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CommunitySection;
