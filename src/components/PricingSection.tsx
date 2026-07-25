import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Copy from './Copy';
import { GetStartedButton } from './ui/get-started-button';

interface Plan {
  id: string;
  name: string;
  subheader: string;
  monthlyPrice: string;
  yearlyPrice: string;
  periodLabel: string;
  featured?: boolean;
  badge?: string;
  buttonText: string;
  features: string[];
  highlightedFeatures?: string[];
}

const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Grátis',
    subheader: 'Para começar hoje, sem pagar nada',
    monthlyPrice: '0',
    yearlyPrice: '0',
    periodLabel: '/para sempre',
    buttonText: 'Criar conta grátis',
    features: [
      'Agenda e clientes ilimitados',
      'Página do estúdio + agendamento online',
      'Receba sinal via PIX (taxa de 5%)',
      'Até 3 serviços e 4 produtos',
      'Nail Points: cashback e indicações',
      'Confirmação manual dos horários',
    ],
    highlightedFeatures: ['Página do estúdio + agendamento online'],
  },
  {
    id: 'essencial',
    name: 'Essencial',
    subheader: 'O Plano Essencial para Nail Designer que deseja começar com o pé direito',
    monthlyPrice: '49,90',
    yearlyPrice: '39,90',
    periodLabel: '/mês',
    buttonText: 'Assinar Essencial',
    features: [
      'Agendamento online com sinal via PIX',
      'Até 10 serviços e 10 produtos',
      'Taxa de só 3% nas vendas online',
      'Controle de Agendamentos',
      'Sem anúncios',
    ],
    highlightedFeatures: ['Taxa de só 3% nas vendas online'],
  },
  {
    id: 'professional',
    name: 'Professional',
    subheader: 'O plano perfeito para a Nail que já tem seu próprio salão',
    monthlyPrice: '59,90',
    yearlyPrice: '49,90',
    periodLabel: '/mês',
    featured: true,
    badge: 'Mais popular',
    buttonText: 'Testar 14 dias grátis',
    features: [
      'Agendamento online com sinal via PIX',
      'Até 30 serviços e 30 produtos',
      'Taxa de só 2% nas vendas online',
      'Confirmação e lembretes via WhatsApp',
      'Relatórios do seu negócio',
      'Modo salão: até 5 cadeiras',
      'Controle de Agendamentos',
      'Suporte prioritário',
      'Sem anúncios',
    ],
    highlightedFeatures: ['Taxa de só 2% nas vendas online', 'Confirmação e lembretes via WhatsApp', 'Modo salão: até 5 cadeiras'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    subheader: 'Precisa de mais controle do seu time, e funcionalidades que uma empresa necessita, esse é o plano correto',
    monthlyPrice: '79,90',
    yearlyPrice: '69,90',
    periodLabel: '/mês',
    buttonText: 'Assinar Enterprise',
    features: [
      'Agendamento online com sinal via PIX',
      'Serviços e produtos ilimitados',
      'Taxa de só 1% nas vendas online',
      'Confirmação e lembretes via WhatsApp',
      'Relatórios do seu negócio',
      'Modo salão: até 10 cadeiras',
      'Controle de Agendamentos',
      'Suporte prioritário',
      'Sem anúncios',
    ],
    highlightedFeatures: ['Serviços e produtos ilimitados', 'Taxa de só 1% nas vendas online', 'Modo salão: até 10 cadeiras'],
  },
];

export const PricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section className="relative py-16 md:py-24 bg-white text-neutral-900 overflow-hidden select-none px-2 sm:px-4 lg:px-6 w-full">
      {/* Moldura Cinza Claro Ampliada ponta a ponta (#fbfbfb, rounded-[36px], sem borda) */}
      <div className="w-full max-w-[98%] 2xl:max-w-[104rem] mx-auto bg-[#fbfbfb] rounded-[36px] px-5 sm:px-8 md:px-10 py-10 md:py-14 relative z-10">
        
        {/* --- Header da Seção --- */}
        <div className="flex flex-col items-center text-center mb-12">
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
              Comece Grátis. Cresça no{' '}
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
                Seu Ritmo.
              </em>
            </h2>
          </Copy>

          <Copy animateOnScroll={true} delay={0.1}>
            <p className="mt-5 text-base sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-2xl">
              Use grátis para sempre, ou assine para pagar menos taxa e desbloquear tudo. Cancele quando quiser.
            </p>
          </Copy>

          {/* Toggle Mensal / Anual */}
          <div className="mt-8 inline-flex items-center p-1.5 bg-neutral-200/60 rounded-full">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-normal transition-all duration-200 ${
                billingCycle === 'monthly'
                  ? 'bg-[#E91E8C] text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-normal transition-all duration-200 ${
                billingCycle === 'yearly'
                  ? 'bg-[#E91E8C] text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Anual
            </button>
          </div>
        </div>

        {/* --- Grid dos 4 Cards de Preço --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {PLANS.map((plan, index) => {
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;

            return (
              <motion.div
                key={plan.id}
                initial={{ y: 36, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`h-full bg-white rounded-[28px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.featured ? 'border-2 border-[#E91E8C]' : ''
                }`}
              >
                <div>
                  {/* Nome do Plano */}
                  <h3 className="text-2xl font-normal text-neutral-900 mb-1">
                    {plan.name}
                  </h3>

                  {/* Subtítulo do Plano */}
                  <p className="text-neutral-400 text-xs font-normal leading-relaxed min-h-[36px] mb-4">
                    {plan.subheader}
                  </p>

                  {/* Preço */}
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-xs text-neutral-400 font-normal">R$</span>
                    <span className="text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight">
                      {price}
                    </span>
                    <span className="text-neutral-400 font-normal text-xs">
                      {plan.periodLabel}
                    </span>
                  </div>

                  {/* Lista de Recursos (Checklist) */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-neutral-100">
                    {plan.features.map((feature, fIdx) => {
                      const isHighlighted = plan.highlightedFeatures?.includes(feature);
                      return (
                        <div key={fIdx} className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={13} color="#E91E8C" strokeWidth={2.5} />
                          </div>
                          <span className={`text-xs font-normal leading-snug ${
                            isHighlighted ? 'text-neutral-900' : 'text-neutral-500'
                          }`}>
                            {feature}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Botão de Ação no Rodapé do Card */}
                <div className="mt-8 pt-4 flex justify-center">
                  <GetStartedButton text={plan.buttonText} />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PricingSection;
