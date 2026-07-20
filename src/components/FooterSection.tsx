import React from 'react';
import { Camera, MessageCircle, Share2, Globe } from 'lucide-react';
import Copy from './Copy';
import { GetStartedButton } from './ui/get-started-button';

export const FooterSection: React.FC = () => {
  return (
    <div className="w-full bg-white text-neutral-900 select-none overflow-hidden">
      
      {/* --- Chamada CTA Pre-Footer (Fundo Limpo) --- */}
      <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-[85rem] mx-auto flex flex-col items-center text-center">
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
            Pronta para transformar o{' '}
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
              seu negócio?
            </em>
          </h2>
        </Copy>

        <Copy animateOnScroll={true} delay={0.1}>
          <p className="mt-5 text-base sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-2xl">
            Junte-se a milhares de manicures e nail designers que simplificaram a agenda e multiplicaram o faturamento.
          </p>
        </Copy>

        <div className="mt-8">
          <GetStartedButton text="Testar 14 dias grátis" />
        </div>
      </div>

      {/* --- Rodapé Principal (Fundo Branco, Clean, sem formulário de e-mail) --- */}
      <footer className="w-full bg-white text-neutral-900 rounded-t-[40px] md:rounded-t-[56px] pt-16 md:pt-20 pb-6 px-6 sm:px-10 md:px-16 relative overflow-hidden border-t border-neutral-100">
        
        {/* Degradê Rosa Clean na Base vindo de baixo */}
        <div 
          className="absolute inset-x-0 bottom-0 h-[450px] pointer-events-none z-0"
          style={{
            background: 'linear-gradient(to top, rgba(233, 30, 140, 0.12) 0%, rgba(233, 30, 140, 0.03) 50%, rgba(255, 255, 255, 0) 100%)',
          }}
        />

        <div className="max-w-[85rem] mx-auto relative z-10">
          {/* Grid de Links Limpo (Sem área de e-mail) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-16 items-start">
            
            {/* Coluna 1: Marca & Descrição (span 6) */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <img src="/logo-basenails.png" alt="Base Nails" className="h-9 w-auto" />
                </div>
                <p className="text-neutral-600 text-base font-normal leading-relaxed max-w-md mb-8">
                  O sistema definitivo de agendamento e gestão desenvolvido exclusivamente para Nail Designers e Esmalterias.
                </p>
              </div>

              {/* Ícones de Redes Sociais */}
              <div className="flex items-center gap-3">
                {[
                  { icon: Camera, href: '#', label: 'Instagram' },
                  { icon: MessageCircle, href: '#', label: 'WhatsApp' },
                  { icon: Share2, href: '#', label: 'Compartilhar' },
                  { icon: Globe, href: '#', label: 'Website' },
                ].map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      aria-label={social.label}
                      className="w-11 h-11 rounded-full bg-pink-50/80 text-[#E91E8C] hover:bg-[#E91E8C] hover:text-white flex items-center justify-center transition-all duration-200"
                    >
                      <Icon size={19} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Coluna 2: Recursos (span 3) */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-normal text-neutral-400 uppercase tracking-widest mb-5">
                Recursos
              </h4>
              <ul className="flex flex-col gap-3 text-base text-neutral-700 font-normal">
                <li><a href="#solution" className="hover:text-[#E91E8C] transition-colors">Agendamento 24h</a></li>
                <li><a href="#solution" className="hover:text-[#E91E8C] transition-colors">Lembretes WhatsApp</a></li>
                <li><a href="#solution" className="hover:text-[#E91E8C] transition-colors">Ficha da Cliente</a></li>
                <li><a href="#solution" className="hover:text-[#E91E8C] transition-colors">Gestão Financeira</a></li>
                <li><a href="#solution" className="hover:text-[#E91E8C] transition-colors">Cartão Fidelidade</a></li>
              </ul>
            </div>

            {/* Coluna 3: Empresa (span 3) */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-normal text-neutral-400 uppercase tracking-widest mb-5">
                Empresa & Suporte
              </h4>
              <ul className="flex flex-col gap-3 text-base text-neutral-700 font-normal">
                <li><a href="#about" className="hover:text-[#E91E8C] transition-colors">Sobre nós</a></li>
                <li><a href="#pricing" className="hover:text-[#E91E8C] transition-colors">Planos & Preços</a></li>
                <li><a href="#" className="hover:text-[#E91E8C] transition-colors">Termos de uso</a></li>
                <li><a href="#" className="hover:text-[#E91E8C] transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-[#E91E8C] transition-colors">Suporte VIP</a></li>
              </ul>
            </div>

          </div>

          {/* Rodapé Bottom */}
          <div className="pt-8 border-t border-neutral-200/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-normal">
            <span>© {new Date().getFullYear()} BaseNails. Todos os direitos reservados.</span>
            <span>Desenvolvido com carinho para Nail Designers.</span>
          </div>

        </div>

        {/* Marca D'água Gigante Rosa Suave Ponta a Ponta */}
        <div className="w-full text-center mt-6 overflow-hidden pointer-events-none select-none -mb-4">
          <span className="text-[19.5vw] font-normal text-pink-200/35 tracking-tighter leading-none block whitespace-nowrap">
            BaseNails
          </span>
        </div>

      </footer>
    </div>
  );
};

export default FooterSection;
