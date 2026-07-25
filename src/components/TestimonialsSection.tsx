import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import Copy from './Copy';
import { SparklesText } from './ui/sparkles-text';
import { GetStartedButton } from './ui/get-started-button';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  handle: string;
  avatarInitials: string;
  avatarBg: string;
  statBadge: string;
  quote: React.ReactNode;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'camila',
    name: 'Camila Silveira',
    role: 'Nail Designer & Instrutora',
    handle: '@camilanails.studio',
    avatarInitials: 'CS',
    avatarBg: 'linear-gradient(135deg, #E91E8C, #FF80BF)',
    statBadge: '+97% redução em faltas',
    quote: (
      <>
        Depois que ativei os <strong className="font-bold text-neutral-950">lembretes automáticos no WhatsApp</strong> e o <strong className="font-bold text-neutral-950">sinal via PIX</strong>, as faltas e calotes zeraram no meu estúdio. Minha agenda vive cheia e <strong className="font-bold text-neutral-950">recuperei o controle do meu tempo</strong>.
      </>
    ),
  },
  {
    id: 'renata',
    name: 'Renata Vasconcelos',
    role: 'Especialista em Fibra de Vidro',
    handle: '@renatanails.estudio',
    avatarInitials: 'RV',
    avatarBg: 'linear-gradient(135deg, #FF4081, #FF80AB)',
    statBadge: 'Economia de 2h/dia',
    quote: (
      <>
        O <strong className="font-bold text-neutral-950">link de agendamento 24h</strong> é perfeito! A cliente marca o horário sozinha de madrugada e o app já <strong className="font-bold text-neutral-950">garante o sinal automático</strong>. Economizo horas que antes gastava no WhatsApp.
      </>
    ),
  },
  {
    id: 'juliana',
    name: 'Juliana Mendes',
    role: 'Dona de Esmalteria',
    handle: '@jumendes.nails',
    avatarInitials: 'JM',
    avatarBg: 'linear-gradient(135deg, #D81B60, #F48FB1)',
    statBadge: 'App se paga sozinho',
    quote: (
      <>
        O <strong className="font-bold text-neutral-950">Marketplace exclusivo</strong> e os <strong className="font-bold text-neutral-950">Nail Points</strong> fizeram o app se pagar sozinho logo no primeiro mês. Comprar produtos de marca com preço especial é um diferencial gigante!
      </>
    ),
  },
  {
    id: 'amanda',
    name: 'Amanda Castro',
    role: 'Nail Designer Autônoma',
    handle: '@amandacastronails',
    avatarInitials: 'AC',
    avatarBg: 'linear-gradient(135deg, #C2185B, #FF80BF)',
    statBadge: 'Gestão 100% no Celular',
    quote: (
      <>
        Tenho a <strong className="font-bold text-neutral-950">ficha completa de cada cliente</strong>, formatos preferidos e alergias direto no meu celular. O BaseNails é a <strong className="font-bold text-neutral-950">ferramenta indispensável</strong> para quem quer crescer na área.
      </>
    ),
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 bg-white text-neutral-900 overflow-hidden select-none px-2 sm:px-4 lg:px-6 w-full">
      {/* Moldura Cinza Claro Ampliada ponta a ponta */}
      <div className="w-full max-w-[98%] 2xl:max-w-[104rem] mx-auto bg-[#fbfbfb] rounded-[36px] px-5 sm:px-8 md:px-10 py-10 md:py-14 relative z-10">
        
        {/* --- Header da Seção --- */}
        <div className="flex flex-col items-center text-center mb-14">
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
              O Que Dizem Nossas{' '}
              <SparklesText
                text="Nail Designers"
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
                  Nail Designers
                </em>
              </SparklesText>
            </h2>
          </Copy>

          <Copy animateOnScroll={true} delay={0.1}>
            <p className="mt-5 text-lg sm:text-xl text-neutral-700 font-normal leading-relaxed max-w-2xl mx-auto">
              Profissionais de todo o Brasil que <strong className="font-semibold text-neutral-900">revolucionaram o atendimento</strong> e multiplicaram os resultados com o BaseNails.
            </p>
          </Copy>
        </div>

        {/* --- Grid dos Cards de Depoimento (Expandido em 4 colunas) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ y: 36, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-[28px] p-6 sm:p-7 md:p-8 border border-neutral-100 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group hover:shadow-lg hover:border-pink-200/50"
            >
              <div>
                {/* Topo: Estrelas + Stat Badge */}
                <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#E91E8C] text-[#E91E8C]" />
                    ))}
                  </div>

                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#f4f4f4] text-neutral-900 border border-neutral-200/80">
                    {item.statBadge}
                  </span>
                </div>

                {/* Texto do Depoimento */}
                <p className="text-neutral-800 text-sm sm:text-base leading-relaxed font-normal mb-8 relative z-10">
                  "{item.quote}"
                </p>
              </div>

              {/* Autor do Depoimento */}
              <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  {/* Avatar */}
                  <div
                    style={{ background: item.avatarBg }}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-base shadow-sm flex-shrink-0"
                  >
                    {item.avatarInitials}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-base font-semibold text-neutral-900 leading-tight">
                        {item.name}
                      </h4>
                      <CheckCircle2 className="w-4 h-4 text-[#E91E8C] fill-pink-50" />
                    </div>
                    <p className="text-xs text-neutral-500 font-normal mt-0.5">
                      {item.role} • <span className="text-[#E91E8C] font-medium">{item.handle}</span>
                    </p>
                  </div>
                </div>

                <Quote className="w-8 h-8 text-neutral-200 group-hover:text-pink-200 transition-colors flex-shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA no Rodapé da Seção */}
        <div className="flex justify-center mt-12">
          <GetStartedButton text="Experimente grátis por 14 dias" />
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
