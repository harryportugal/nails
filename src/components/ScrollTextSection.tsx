import React from 'react';
import { ScrollTextPath } from './ScrollTextPath';

export const ScrollTextSection: React.FC = () => {
  return (
    <section
      style={{
        background: '#fff',
        paddingTop: '4rem',
        paddingBottom: '4rem',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '0rem', // stack them closely
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Wave 1 - Pink text moving normal direction, black background ribbon */}
      <div style={{ marginBottom: '-1vw', position: 'relative', zIndex: 1 }}>
        <ScrollTextPath
          text="DESIGN DE UNHAS ✦ AGENDA NO WHATSAPP ✦ FIM DOS HORÁRIOS VAZIOS ✦ CONTROLE FINANCEIRO ✦ DESIGN DE UNHAS ✦ AGENDA NO WHATSAPP ✦ FIM DOS HORÁRIOS VAZIOS ✦ CONTROLE FINANCEIRO ✦ DESIGN DE UNHAS ✦ AGENDA NO WHATSAPP ✦ FIM DOS HORÁRIOS VAZIOS ✦ CONTROLE FINANCEIRO ✦ DESIGN DE UNHAS ✦"
          d="M 0 100 Q 250 200 500 100 Q 750 0 1000 100"
          color="#E91E8C"
          fontSize="26px"
          strokeColor="#111"
          strokeWidth={75}
        />
      </div>

      {/* Wave 2 - Black text moving opposite direction, pink background ribbon */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <ScrollTextPath
          text="BASENAILS ✦ O SISTEMA FEITO PARA MANICURES E NAIL DESIGNERS ✦ TUDO EM UM SÓ LUGAR ✦ BASENAILS ✦ O SISTEMA FEITO PARA MANICURES E NAIL DESIGNERS ✦ TUDO EM UM SÓ LUGAR ✦ BASENAILS ✦ O SISTEMA FEITO PARA MANICURES E NAIL DESIGNERS ✦ TUDO EM UM SÓ LUGAR ✦ BASENAILS ✦ O SISTEMA FEITO PARA MANICURES E NAIL DESIGNERS ✦ TUDO EM UM SÓ LUGAR ✦ BASENAILS ✦ O SISTEMA FEITO PARA MANICURES E NAIL DESIGNERS ✦ TUDO EM UM SÓ LUGAR ✦"
          d="M 0 100 Q 250 0 500 100 Q 750 200 1000 100"
          color="#111"
          fontSize="24px"
          reverse={true}
          strokeColor="#E91E8C"
          strokeWidth={75}
        />
      </div>
    </section>
  );
};
