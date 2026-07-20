import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  CalendarCheck2, 
  BellRing, 
  HeartHandshake, 
  Wallet, 
  AppWindow, 
  ShieldCheck 
} from 'lucide-react';

import Copy from './Copy';
import { GetStartedButton } from './ui/get-started-button';

// --- Types ---
export interface CarouselCard {
  id: string | number;
  category: string;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  link?: string;
}

// --- Sample Data (Tailored for Nails Salon Management) ---
const DEFAULT_CARDS: CarouselCard[] = [
  {
    id: 1,
    category: "Agendamento",
    title: "Link 24h Personalizado",
    description: "Sua cliente escolhe o dia, horário e procedimento diretamente no seu link exclusivo.",
    icon: CalendarCheck2,
    gradient: "bg-gradient-to-br from-pink-100/90 to-rose-50 text-[#E91E8C]",
  },
  {
    id: 2,
    category: "WhatsApp",
    title: "Lembretes Automáticos",
    description: "Notificações enviadas no WhatsApp da cliente reduzindo faltas e atrasos em até 97%.",
    icon: BellRing,
    gradient: "bg-gradient-to-br from-pink-100/90 to-rose-50 text-[#E91E8C]",
  },
  {
    id: 3,
    category: "Gestão CRM",
    title: "Ficha da Cliente & Anamnese",
    description: "Guarde histórico de formatos prediletos, alergias a esmaltes e preferências pessoais.",
    icon: HeartHandshake,
    gradient: "bg-gradient-to-br from-pink-100/90 to-rose-50 text-[#E91E8C]",
  },
  {
    id: 4,
    category: "Financeiro",
    title: "Lucro Líquido Real",
    description: "Cálculo automático de custos por atendimento, comissões de equipe e faturamento diário.",
    icon: Wallet,
    gradient: "bg-gradient-to-br from-pink-100/90 to-rose-50 text-[#E91E8C]",
  },
  {
    id: 5,
    category: "Mobile",
    title: "100% Pelo Celular",
    description: "Acesse seu painel completo de onde estiver, sem precisar de computador ou planilhas.",
    icon: AppWindow,
    gradient: "bg-gradient-to-br from-pink-100/90 to-rose-50 text-[#E91E8C]",
  },
  {
    id: 6,
    category: "Segurança",
    title: "Dados Criptografados",
    description: "Garantia total de privacidade para a lista de contatos e financeiro da sua esmalteria.",
    icon: ShieldCheck,
    gradient: "bg-gradient-to-br from-pink-100/90 to-rose-50 text-[#E91E8C]",
  },
];

interface CardsCarouselProps {
  cards?: CarouselCard[];
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  autoPlayDuration?: number; // ms (0 para desativar)
}

export default function CardsCarouselSection({
  cards = DEFAULT_CARDS,
  title = "Tudo o que sua esmalteria precisa em um",
  titleHighlight = "único lugar",
  subtitle = "Soluções inteligentes pensadas para facilitar o dia a dia da sua agenda e financeiro de forma simples e intuitiva.",
  autoPlayDuration = 5000,
}: CardsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Responsividade: ajusta quantos cards aparecem por tela
  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };

    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  const maxIndex = Math.max(0, cards.length - cardsPerPage);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Autoplay temporizado
  useEffect(() => {
    if (!autoPlayDuration || isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, autoPlayDuration);
    return () => clearInterval(timer);
  }, [currentIndex, isHovered, autoPlayDuration, maxIndex]);

  return (
    <section className="relative py-16 md:py-24 bg-white text-neutral-900 overflow-hidden select-none px-4 sm:px-6 lg:px-8">
      {/* Moldura Cinza Claro Ampliada com bordas arredondadas e padding nobre */}
      <div className="max-w-[85rem] mx-auto bg-[#fbfbfb] rounded-[36px] p-8 sm:p-12 md:p-16 relative z-10">
        
        {/* --- Header da Seção Padronizado --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <div className="max-w-3xl">
            {/* Título Principal com animação Copy */}
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
                {title}{' '}
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
                  {titleHighlight}
                </em>
              </h2>
            </Copy>

            {/* Subtítulo Padronizado */}
            <Copy animateOnScroll={true} delay={0.1}>
              <p className="mt-5 text-lg sm:text-xl text-neutral-700 font-normal leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            </Copy>
          </div>

          {/* Botões de Navegação (Desktop & Tablet) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 self-start md:self-end"
          >
            <button
              onClick={handlePrev}
              aria-label="Anterior"
              className="p-4 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200 active:scale-95 focus:outline-none"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Próximo"
              className="p-4 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200 active:scale-95 focus:outline-none"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        </div>

        {/* --- Track do Carrossel com Cards Ampliados e Sem Sombra --- */}
        <div 
          ref={carouselRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="overflow-hidden cursor-grab active:cursor-grabbing -mx-2 px-2 py-2"
        >
          <motion.div
            className="flex gap-7"
            animate={{
              x: `-${currentIndex * (100 / cardsPerPage)}%`
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28
            }}
          >
            {cards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={card.id}
                  style={{ flex: `0 0 calc(${100 / cardsPerPage}% - ${(28 * (cardsPerPage - 1)) / cardsPerPage}px)` }}
                  className="min-w-0"
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.65,
                      delay: index * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ 
                      y: -6,
                      transition: { duration: 0.2 }
                    }}
                    className="h-full min-h-[320px] bg-white rounded-[28px] p-8 md:p-9 flex flex-col justify-between transition-colors duration-300 group relative overflow-hidden"
                  >
                    <div>
                      {/* Topo do Card: Ícone Ampliado */}
                      <div className="flex items-center justify-between mb-7">
                        <div className={`p-4 rounded-2xl ${card.gradient}`}>
                          <IconComponent className="w-7 h-7" />
                        </div>
                      </div>

                      {/* Título do Card Ampliado */}
                      <h3 className="text-2xl font-normal text-neutral-900 mb-3 group-hover:text-[#E91E8C] transition-colors leading-snug">
                        {card.title}
                      </h3>

                      {/* Descrição Ampliada */}
                      <p className="text-neutral-600 text-base leading-relaxed font-normal">
                        {card.description}
                      </p>
                    </div>

                    {/* Rodapé do Card com Ação */}
                    <div className="mt-10 pt-6 border-t border-neutral-100 flex items-center justify-between">
                      <span className="text-sm font-normal text-neutral-500 group-hover:text-neutral-900 transition-colors">
                        Saiba mais
                      </span>
                      <div className="w-9 h-9 rounded-full bg-neutral-100 group-hover:bg-[#E91E8C] group-hover:text-white text-neutral-700 flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* --- Indicadores (Dots) --- */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir para o slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                currentIndex === idx 
                  ? 'w-10 bg-[#E91E8C]' 
                  : 'w-2.5 bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>

        {/* --- Botão CTA --- */}
        <div className="flex justify-center mt-10">
          <GetStartedButton text="Testar grátis por 14 dias" />
        </div>

      </div>
    </section>
  );
}
