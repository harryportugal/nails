import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, animate, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';
import { SparklesText } from './ui/sparkles-text';
import { GetStartedButton } from './ui/get-started-button';
import Copy from './Copy';

// ─── Shared ───────────────────────────────────────────────────────────────────
const SPRING = { type: 'spring', stiffness: 90, damping: 14 } as const;
const SPRING_SLOW = { type: 'spring', stiffness: 55, damping: 10 } as const;

const springRight = (delay = 0) => ({
  initial: { x: -18 },
  whileInView: { x: 0 },
  viewport: { once: true },
  transition: { ...SPRING, delay },
});
const springUp = (delay = 0) => ({
  initial: { y: 18 },
  whileInView: { y: 0 },
  viewport: { once: true },
  transition: { ...SPRING, delay },
});
const springDown = (delay = 0) => ({
  initial: { y: -18 },
  whileInView: { y: 0 },
  viewport: { once: true },
  transition: { ...SPRING, delay },
});
const springLeft = (delay = 0) => ({
  initial: { x: 18 },
  whileInView: { x: 0 },
  viewport: { once: true },
  transition: { ...SPRING, delay },
});
const springScale = (delay = 0) => ({
  initial: { scale: 0.82 },
  whileInView: { scale: 1 },
  viewport: { once: true },
  transition: { ...SPRING, delay },
});

// ─── Mini Components ──────────────────────────────────────────────────────────

const StatusBadge: React.FC<{ label: string; variant: 'pink' | 'green' | 'gray' | 'yellow' }> = ({ label, variant }) => {
  const styles: Record<string, React.CSSProperties> = {
    pink:   { background: 'rgba(233,30,140,0.1)', color: '#E91E8C' },
    green:  { background: 'rgba(233,30,140,0.1)', color: '#E91E8C' },
    gray:   { background: 'rgba(0,0,0,0.06)',      color: '#888' },
    yellow: { background: 'rgba(233,30,140,0.07)', color: '#E91E8C' },
  };
  return (
    <span style={{ ...styles[variant], fontSize: '0.78rem', fontWeight: 400, padding: '3px 10px', borderRadius: '999px', whiteSpace: 'nowrap' }}>
      {label}
    </span>
  );
};

const Avatar: React.FC<{ initials: string; size?: number }> = ({ initials, size = 34 }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: 'linear-gradient(135deg, #E91E8C, #FF80BF)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontWeight: 400, fontSize: size * 0.35, flexShrink: 0,
  }}>
    {initials}
  </div>
);

// ─── Animated Counter ─────────────────────────────────────────────────────────

const AnimatedCounter: React.FC<{ to: number; prefix?: string; duration?: number }> = ({ to, prefix = '', duration = 1.5 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${prefix}${Math.round(v).toLocaleString('pt-BR')}`);
  useEffect(() => {
    const c = animate(count, to, { duration, ease: [0.16, 1, 0.3, 1], delay: 0.5 });
    return c.stop;
  }, []);
  return <motion.span>{rounded}</motion.span>;
};

// ─── Bar with spring entry + idle float ──────────────────────────────────────

const Bar: React.FC<{ h: number; day: string; i: number; active?: boolean }> = ({ h, day, i, active = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [phase, setPhase] = useState<'hidden' | 'entry' | 'idle'>('hidden');

  useEffect(() => {
    if (!inView || phase !== 'hidden') return;
    setPhase('entry');
    if (active) {
      const t = setTimeout(() => setPhase('idle'), i * 120 + 1400);
      return () => clearTimeout(t);
    }
  }, [inView]);

  const bgColor = active
    ? '#E91E8C'
    : i >= 4
    ? 'rgba(233,30,140,0.3)'
    : 'rgba(233,30,140,0.12)';

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', height: '100%', justifyContent: 'flex-end' }}>
      <div ref={ref} style={{ width: '100%', height: `${h}%` }}>
        <motion.div
          animate={
            phase === 'hidden'
              ? { scaleY: 0 }
              : phase === 'entry'
              ? { scaleY: 1, y: 0 }
              : { scaleY: 1, y: [0, -8, 2, -3, 0] }
          }
          transition={
            phase === 'idle'
              ? {
                  y: { duration: 3, repeat: Infinity, ease: [0.16, 1, 0.3, 1], repeatDelay: 1.5 },
                  scaleY: { duration: 0 },
                }
              : { scaleY: { ...SPRING_SLOW, delay: i * 0.1 } }
          }
          style={{ width: '100%', height: '100%', background: bgColor, borderRadius: '5px 5px 0 0', transformOrigin: 'bottom' }}
        />
      </div>
      <span style={{ fontSize: '0.6rem', color: '#bbb' }}>{day}</span>
    </div>
  );
};

// ─── Card 1: Agendamento ──────────────────────────────────────────────────────

const AgendamentoMock: React.FC = () => {
  const appointments = [
    { name: 'Carol Mendes',  service: 'Alongamento em Gel', time: '09:00', status: 'green'  as const, statusLabel: 'Confirmado' },
    { name: 'Bianca Torres', service: 'Pé e Mão Completo',  time: '11:00', status: 'pink'   as const, statusLabel: 'Pendente' },
    { name: 'Ana Souza',     service: 'Fibra de Vidro',      time: '14:00', status: 'gray'   as const, statusLabel: 'Aguardando' },
    { name: 'Luana Farias',  service: 'Unhas em Acrílico',  time: '16:30', status: 'yellow' as const, statusLabel: 'Em breve' },
  ];

  return (
    <div style={{ background: '#f8f8f8', borderRadius: '16px', overflow: 'hidden' }}>
      {/* Header */}
      <motion.div
        {...springDown(0.1)}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1.1rem', background: '#fff', marginBottom: '2px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Live sonar pulse */}
          <div style={{ position: 'relative', width: 10, height: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={{ scale: [1, 2.8, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
              style={{ position: 'absolute', width: 10, height: 10, borderRadius: '50%', background: '#E91E8C' }}
            />
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#E91E8C', position: 'relative' }} />
          </div>
          <span style={{ fontSize: '0.9rem', color: '#111' }}>Hoje — 22 Jul</span>
        </div>
        <motion.span {...springScale(0.25)}>
          <StatusBadge label="4 agendamentos" variant="pink" />
        </motion.span>
      </motion.div>

      {/* Rows — spring in from right, active row nudges periodically */}
      {appointments.map((a, i) => (
        <motion.div
          key={i}
          {...springRight(0.1 + i * 0.09)}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.85rem',
            padding: '0.7rem 1.1rem',
            background: i === 1 ? 'rgba(233,30,140,0.03)' : '#fff',
            marginBottom: i < appointments.length - 1 ? '2px' : 0,
          }}
        >
          <motion.div
            animate={i === 1 ? { x: [0, 3, 0, -2, 0] } : {}}
            transition={i === 1 ? { duration: 0.5, repeat: Infinity, repeatDelay: 5, ease: [0.16, 1, 0.3, 1], delay: 2.5 } : {}}
          >
            <Avatar initials={a.name.split(' ').map(n => n[0]).join('')} size={32} />
          </motion.div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <motion.div {...springRight(0.15 + i * 0.09)} style={{ fontSize: '0.85rem', color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.name}</motion.div>
            <motion.div {...springRight(0.2 + i * 0.09)} style={{ fontSize: '0.75rem', color: '#999', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.service}</motion.div>
          </div>
          <motion.span
            {...springLeft(0.22 + i * 0.09)}
            animate={i === 1 ? { y: [0, -3, 0] } : {}}
            transition={i === 1 ? { duration: 2, repeat: Infinity, ease: [0.16, 1, 0.3, 1], repeatDelay: 2, delay: 3 } : {}}
            style={{ fontSize: '0.82rem', color: '#555', flexShrink: 0 }}
          >
            {a.time}
          </motion.span>
          <motion.span
            {...springScale(0.28 + i * 0.09)}
            animate={i === 0 ? { rotate: [0, -4, 4, -4, 0] } : {}}
            transition={i === 0 ? { duration: 0.6, repeat: Infinity, repeatDelay: 5, delay: 3 } : {}}
          >
            <StatusBadge label={a.statusLabel} variant={a.status} />
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
};

// ─── Card 2: Lembretes ────────────────────────────────────────────────────────

const TypingDots: React.FC = () => (
  <motion.div
    initial={{ x: -14, y: 6 }}
    whileInView={{ x: 0, y: 0 }}
    viewport={{ once: true }}
    transition={{ ...SPRING, delay: 1.9 }}
    style={{ alignSelf: 'flex-start', background: '#fff', borderRadius: '14px 14px 14px 0', padding: '0.65rem 1rem' }}
  >
    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.65, repeat: Infinity, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: 6, height: 6, borderRadius: '50%', background: '#ccc' }}
        />
      ))}
    </div>
  </motion.div>
);

const LembretesMock: React.FC = () => {
  const msgs = [
    { from: 'BaseNails', msg: 'Olá, Carol! Seu horário para Alongamento em Gel está confirmado amanhã às 14:00.', time: '10:30', sent: false, delay: 0.25 },
    { from: '',          msg: 'Oba! Confirmadíssimo, estarei aí!', time: '10:32', sent: true,  delay: 0.65 },
    { from: 'BaseNails', msg: 'Lembrete: seu horário é em 1 hora. Nos vemos logo!', time: '13:00', sent: false, delay: 1.05 },
  ];

  return (
    <div style={{ background: '#ece5dd', borderRadius: '16px', padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {msgs.map((m, i) => (
        <motion.div
          key={i}
          initial={{ x: m.sent ? 24 : -24, y: 10, rotate: m.sent ? 1.5 : -1.5 }}
          whileInView={{ x: 0, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ ...SPRING, delay: m.delay }}
          style={{
            alignSelf: m.sent ? 'flex-end' : 'flex-start',
            background: m.sent ? '#d9fdd3' : '#fff',
            borderRadius: m.sent ? '14px 14px 0 14px' : '14px 14px 14px 0',
            padding: '0.7rem 0.95rem',
            maxWidth: '84%',
          }}
        >
          {!m.sent && (
            <motion.span
              initial={{ x: -10 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ ...SPRING, delay: m.delay + 0.1 }}
              style={{ fontSize: '0.72rem', color: '#E91E8C', display: 'block', marginBottom: '3px' }}
            >
              {m.from}
            </motion.span>
          )}
          <p style={{ fontSize: '0.82rem', color: '#333', margin: 0, lineHeight: 1.5 }}>{m.msg}</p>
          <motion.span
            initial={{ y: 6 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ ...SPRING, delay: m.delay + 0.15 }}
            style={{ fontSize: '0.67rem', color: '#999', float: 'right', marginTop: '4px' }}
          >
            {m.time}
          </motion.span>
        </motion.div>
      ))}
      <TypingDots />
    </div>
  );
};

// ─── Card 3: CRM ──────────────────────────────────────────────────────────────

const CRMMock: React.FC = () => {
  const visits = [
    { service: 'Alongamento em Gel', date: '10 Jul', value: 'R$ 120' },
    { service: 'Pé e Mão Completo',  date: '28 Jun', value: 'R$ 80'  },
    { service: 'Fibra de Vidro',      date: '05 Jun', value: 'R$ 150' },
  ];
  const colors = ['#F9C6DC', '#E91E8C', '#FFB6C1', '#FF80BF', '#C2185B'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', flex: 1 }}>

      {/* Profile */}
      <motion.div {...springDown(0.08)} style={{ background: '#f8f8f8', borderRadius: '14px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Avatar with expanding ring */}
        <motion.div {...springScale(0.18)} style={{ position: 'relative', flexShrink: 0 }}>
          <motion.div
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', repeatDelay: 1 }}
            style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#E91E8C', pointerEvents: 'none' }}
          />
          <Avatar initials="AS" size={46} />
        </motion.div>
        <div style={{ flex: 1 }}>
          <motion.div {...springRight(0.2)} style={{ fontSize: '1rem', color: '#111' }}>Ana Silva</motion.div>
          <motion.div {...springRight(0.28)} style={{ fontSize: '0.78rem', color: '#999' }}>Desde Jan 2024 · 14 visitas</motion.div>
        </div>
        {/* VIP badge wiggles periodically */}
        <motion.span
          {...springScale(0.3)}
          animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
          transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 5, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <StatusBadge label="VIP" variant="pink" />
        </motion.span>
      </motion.div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        {[
          { label: 'Gasto total',   value: 'R$ 1.840', color: '#E91E8C' },
          { label: 'Última visita', value: 'Há 12 dias', color: '#111' },
          { label: 'Formato',       value: 'Amendoado',  color: '#111' },
          { label: 'Ticket médio',  value: 'R$ 131',     color: '#111' },
        ].map((s, i) => (
          <motion.div
            key={i}
            {...springUp(0.14 + i * 0.08)}
            style={{ background: '#f8f8f8', borderRadius: '12px', padding: '0.8rem' }}
          >
            <div style={{ fontSize: '0.72rem', color: '#aaa', marginBottom: '3px' }}>{s.label}</div>
            <motion.div
              animate={i === 0 ? { y: [0, -3, 0] } : {}}
              transition={i === 0 ? { duration: 2.5, repeat: Infinity, ease: [0.16, 1, 0.3, 1], repeatDelay: 2, delay: 1.5 } : {}}
              style={{ fontSize: '0.95rem', color: s.color }}
            >
              {s.value}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Allergy — shakes infrequently */}
      <motion.div
        {...springRight(0.34)}
        style={{ background: 'rgba(233,30,140,0.06)', borderRadius: '12px', padding: '0.85rem' }}
      >
        <motion.div
          animate={{ x: [0, 4, -4, 4, -3, 0] }}
          transition={{ duration: 0.55, repeat: Infinity, repeatDelay: 7, delay: 3, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: '0.78rem', color: '#E91E8C', marginBottom: '3px' }}
        >
          Alergia registrada
        </motion.div>
        <div style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.5 }}>Esmalte tradicional. Usar apenas Gel Hipoalergênico.</div>
      </motion.div>

      {/* Color swatches — staggered y-float */}
      <motion.div
        {...springUp(0.44)}
        style={{ background: '#f8f8f8', borderRadius: '12px', padding: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <span style={{ fontSize: '0.78rem', color: '#aaa' }}>Cores favoritas</span>
        <div style={{ display: 'flex', gap: '7px' }}>
          {colors.map((c, i) => (
            <motion.div
              key={i}
              {...springScale(0.5 + i * 0.06)}
              animate={{ y: [0, -6, 2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: i * 0.3 + 1, repeatDelay: 1 }}
              style={{ width: 18, height: 18, borderRadius: '50%', background: c }}
            />
          ))}
        </div>
      </motion.div>

      {/* Visit history */}
      <div style={{ background: '#f8f8f8', borderRadius: '14px', overflow: 'hidden' }}>
        <motion.div {...springDown(0.4)} style={{ padding: '0.7rem 1rem', background: '#f0f0f0', fontSize: '0.8rem', color: '#111' }}>
          Histórico de visitas
        </motion.div>
        {visits.map((v, i) => (
          <motion.div
            key={i}
            {...springLeft(0.44 + i * 0.1)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: i % 2 === 0 ? '#fff' : '#f8f8f8' }}
          >
            <div>
              <div style={{ fontSize: '0.82rem', color: '#111' }}>{v.service}</div>
              <div style={{ fontSize: '0.7rem', color: '#bbb' }}>{v.date}</div>
            </div>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: i * 1.2 + 2, repeatDelay: 4 }}
              style={{ fontSize: '0.85rem', color: '#E91E8C' }}
            >
              {v.value}
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* Next appointment */}
      <motion.div
        {...springUp(0.6)}
        style={{ background: 'linear-gradient(135deg, rgba(233,30,140,0.08), rgba(255,128,191,0.05))', borderRadius: '12px', padding: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div>
          <div style={{ fontSize: '0.72rem', color: '#E91E8C', marginBottom: '2px' }}>Próximo horário</div>
          <div style={{ fontSize: '0.82rem', color: '#111' }}>25 Jul — Alongamento em Gel</div>
        </div>
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: 2, repeatDelay: 2 }}
          style={{ fontSize: '0.75rem', color: '#E91E8C', background: 'rgba(233,30,140,0.1)', padding: '4px 10px', borderRadius: '999px' }}
        >
          10:00
        </motion.div>
      </motion.div>

      {/* Cartão Fidelidade */}
      <motion.div
        {...springUp(0.68)}
        style={{ background: '#f8f8f8', borderRadius: '14px', padding: '0.9rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
          <div>
            <div style={{ fontSize: '0.82rem', color: '#111' }}>Cartão Fidelidade</div>
            <div style={{ fontSize: '0.7rem', color: '#999' }}>7 de 10 selos acumulados</div>
          </div>
          <StatusBadge label="Falta pouco!" variant="pink" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
            const filled = num <= 7;
            return (
              <motion.div
                key={num}
                {...springScale(0.7 + num * 0.03)}
                animate={filled ? { scale: [1, 1.12, 1] } : {}}
                transition={filled ? { duration: 2.5, repeat: Infinity, delay: num * 0.2, ease: [0.16, 1, 0.3, 1], repeatDelay: 3 } : {}}
                style={{
                  height: 32,
                  borderRadius: '8px',
                  background: filled ? 'rgba(233,30,140,0.12)' : '#fff',
                  color: filled ? '#E91E8C' : '#ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                }}
              >
                {filled ? <Check size={14} color="#E91E8C" strokeWidth={2.5} /> : num}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Observações da Nail Designer */}
      <motion.div
        {...springUp(0.76)}
        style={{ background: '#f8f8f8', borderRadius: '12px', padding: '0.85rem' }}
      >
        <div style={{ fontSize: '0.75rem', color: '#aaa', marginBottom: '4px' }}>Notas da Nail Designer</div>
        <div style={{ fontSize: '0.8rem', color: '#444', lineHeight: 1.5 }}>
          "Prefere cuticulagem funda e esmaltação rápida. Sempre aceita um capuccino!"
        </div>
      </motion.div>
    </div>
  );
};

// ─── Card 4: Financeiro ───────────────────────────────────────────────────────

const FinanceiroMock: React.FC = () => {
  const bars = [
    { day: 'Seg', h: 38 }, { day: 'Ter', h: 55 }, { day: 'Qua', h: 47 },
    { day: 'Qui', h: 63 }, { day: 'Sex', h: 78 }, { day: 'Sáb', h: 58 }, { day: 'Dom', h: 95 },
  ];
  const transactions = [
    { client: 'Carol Mendes',  service: 'Alongamento em Gel', value: 'R$ 120', status: 'green'  as const, label: 'Pago' },
    { client: 'Bianca Torres', service: 'Pé e Mão Completo',  value: 'R$ 80',  status: 'yellow' as const, label: 'Pendente' },
    { client: 'Luana Farias',  service: 'Unhas em Acrílico',  value: 'R$ 160', status: 'green'  as const, label: 'Pago' },
  ];

  return (
    <div className="financeiro-mock-wrapper">
      <div className="financeiro-mock-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      {/* Metric cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>

        {/* Main pink card */}
        <motion.div
          {...springUp(0.08)}
          style={{ background: 'linear-gradient(135deg, #E91E8C, #FF60B5)', borderRadius: '16px', padding: '1.1rem', color: '#fff' }}
        >
          <motion.div {...springUp(0.16)} style={{ fontSize: '0.78rem', marginBottom: '6px', opacity: 0.85 }}>Faturamento do Mês</motion.div>
          <motion.div {...springUp(0.22)} style={{ fontSize: '1.75rem', lineHeight: 1 }}>
            R$ <AnimatedCounter to={8420} />
          </motion.div>
          {/* Arrow floats upward periodically */}
          <motion.div
            animate={{ y: [2, -4, 2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: 1.5, repeatDelay: 1 }}
            style={{ fontSize: '0.75rem', marginTop: '8px', opacity: 0.9 }}
          >
            ↑ 28% vs mês anterior
          </motion.div>
        </motion.div>

        <motion.div {...springUp(0.18)} style={{ background: '#f8f8f8', borderRadius: '16px', padding: '1.1rem' }}>
          <motion.div {...springUp(0.26)} style={{ fontSize: '0.78rem', color: '#999', marginBottom: '6px' }}>Lucro Líquido</motion.div>
          <motion.div {...springUp(0.32)} style={{ fontSize: '1.5rem', color: '#111', lineHeight: 1 }}>
            R$ <AnimatedCounter to={6130} duration={1.8} />
          </motion.div>
          <motion.div
            animate={{ y: [2, -4, 2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: 2, repeatDelay: 1 }}
            style={{ fontSize: '0.75rem', color: '#E91E8C', marginTop: '8px' }}
          >
            ↑ 18% esse mês
          </motion.div>
        </motion.div>

        <motion.div {...springUp(0.28)} style={{ background: '#f8f8f8', borderRadius: '16px', padding: '1.1rem' }}>
          <motion.div {...springUp(0.36)} style={{ fontSize: '0.78rem', color: '#999', marginBottom: '6px' }}>Comissões Pagas</motion.div>
          <motion.div {...springUp(0.42)} style={{ fontSize: '1.5rem', color: '#111', lineHeight: 1 }}>
            R$ <AnimatedCounter to={1250} duration={1.2} />
          </motion.div>
          <motion.div {...springUp(0.48)} style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '8px' }}>2 colaboradoras</motion.div>
        </motion.div>
      </div>

      {/* Chart + transactions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '0.85rem' }}>

        {/* Bar chart — spring entry + active bar floats */}
        <motion.div {...springRight(0.18)} style={{ background: '#f8f8f8', borderRadius: '16px', padding: '1.1rem' }}>
          <motion.div {...springRight(0.26)} style={{ fontSize: '0.82rem', color: '#111', marginBottom: '0.85rem' }}>Atendimentos — Semana</motion.div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '85px' }}>
            {bars.map((b, i) => (
              <Bar key={i} h={b.h} day={b.day} i={i} active={i === 6} />
            ))}
          </div>
        </motion.div>

        {/* Transactions — scanner highlight slides through rows */}
        <div style={{ background: '#f8f8f8', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
          <motion.div {...springDown(0.18)} style={{ padding: '0.75rem 1.1rem', background: '#f0f0f0', fontSize: '0.82rem', color: '#111', position: 'relative', zIndex: 1 }}>
            Últimos atendimentos
          </motion.div>

          {/* Row scanner */}
          <motion.div
            animate={{ y: [0, 54, 108, 0] }}
            transition={{ duration: 4.5, times: [0, 0.33, 0.66, 1], repeat: Infinity, ease: [0.16, 1, 0.3, 1], repeatDelay: 1.5, delay: 1.8 }}
            style={{ position: 'absolute', left: 0, right: 0, height: 54, background: 'rgba(233,30,140,0.06)', pointerEvents: 'none', zIndex: 0, top: 44 }}
          />

          {transactions.map((t, i) => (
            <motion.div
              key={i}
              {...springLeft(0.22 + i * 0.1)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.65rem 1.1rem',
                background: i % 2 === 0 ? '#fff' : '#f8f8f8',
                position: 'relative', zIndex: 1,
              }}
            >
              <motion.div {...springScale(0.28 + i * 0.1)}>
                <Avatar initials={t.client.split(' ').map(n => n[0]).join('')} size={30} />
              </motion.div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <motion.div {...springLeft(0.3 + i * 0.1)} style={{ fontSize: '0.82rem', color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.client}</motion.div>
                <motion.div {...springLeft(0.36 + i * 0.1)} style={{ fontSize: '0.7rem', color: '#bbb', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.service}</motion.div>
              </div>
              <motion.span
                {...springLeft(0.4 + i * 0.1)}
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: i * 1.5 + 2.5, repeatDelay: 5 }}
                style={{ fontSize: '0.88rem', color: '#E91E8C', flexShrink: 0 }}
              >
                {t.value}
              </motion.span>
              <motion.span {...springScale(0.44 + i * 0.1)}>
                <StatusBadge label={t.label} variant={t.status} />
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
};

// ─── Section ──────────────────────────────────────────────────────────────────

export const SolutionSection: React.FC = () => {
  return (
    <section
      id="solution"
      style={{
        position: 'relative', zIndex: 10, background: '#fff',
        paddingTop: '8rem', paddingBottom: '8rem',
        paddingLeft: '1.5rem', paddingRight: '1.5rem',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '85rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '5rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center', marginBottom: '1rem', alignItems: 'center' }}>
          <Copy animateOnScroll={true}>
            <h2
              style={{
                fontSize: 'clamp(3rem, 8vw, 96px)',
                fontWeight: 400, color: '#111',
                lineHeight: 1.15, letterSpacing: '-0.02em',
                margin: 0, paddingBottom: '0.15em',
              }}
            >
              <div>Problemas</div>
              <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.25em', position: 'relative', zIndex: 10 }}>
                <span>Que</span>
                <SparklesText text="Resolvemos" colors={{ first: '#E91E8C', second: '#FF80BF' }} sparklesCount={10}>
                  <em className="shimmer" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#E91E8C', position: 'relative', top: 'calc(0.15em + 6px)' }}>
                    Resolvemos
                  </em>
                </SparklesText>
              </div>
            </h2>
          </Copy>
          <Copy animateOnScroll={true} delay={0.1}>
            <p style={{ fontSize: '1.25rem', color: '#111', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6, fontWeight: 400 }}>
              Tudo o que você precisa para gerenciar seu negócio de unhas em um só lugar. Sem complicação.
            </p>
          </Copy>
          <Copy animateOnScroll={true} delay={0.2}>
            <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center' }}>
              <GetStartedButton />
            </div>
          </Copy>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          <motion.div
            className="bento-card" style={{ gridColumn: 'span 4' }}
            initial={{ y: 32 }} whileInView={{ y: 0 }} viewport={{ once: true }}
            transition={{ ...SPRING, delay: 0 }}
          >
            <div className="bento-card-header">
              <h3 className="bento-card-title">Link de Agendamento 24h</h3>
              <p className="bento-card-subtitle">Clientes agendam sozinhas no seu <span style={{ color: '#111' }}>link personalizado</span>, <span style={{ color: '#111' }}>sem troca de mensagens</span> no WhatsApp.</p>
            </div>
            <AgendamentoMock />
          </motion.div>

          <motion.div
            className="bento-card" style={{ gridColumn: 'span 4' }}
            initial={{ y: 32 }} whileInView={{ y: 0 }} viewport={{ once: true }}
            transition={{ ...SPRING, delay: 0.1 }}
          >
            <div className="bento-card-header">
              <h3 className="bento-card-title">WhatsApp & Lembretes</h3>
              <p className="bento-card-subtitle">Reduza o esquecimento e as <span style={{ color: '#111' }}>faltas de clientes em até 97%</span> com <span style={{ color: '#111' }}>lembretes automáticos</span>.</p>
            </div>
            <LembretesMock />
          </motion.div>

          <motion.div
            className="bento-card" style={{ gridColumn: 'span 4', gridRow: 'span 2' }}
            initial={{ y: 32 }} whileInView={{ y: 0 }} viewport={{ once: true }}
            transition={{ ...SPRING, delay: 0.2 }}
          >
            <div className="bento-card-header">
              <h3 className="bento-card-title">Histórico & Preferências</h3>
              <p className="bento-card-subtitle">Anote <span style={{ color: '#111' }}>histórico de visitas</span>, alergias, formato predileto e <span style={{ color: '#111' }}>preferências de cada cliente</span>.</p>
            </div>
            <CRMMock />
          </motion.div>

          <motion.div
            className="bento-card bento-card-financeiro" style={{ gridColumn: 'span 8' }}
            initial={{ y: 32 }} whileInView={{ y: 0 }} viewport={{ once: true }}
            transition={{ ...SPRING, delay: 0.15 }}
          >
            <div className="bento-card-header">
              <h3 className="bento-card-title">Faturamento & Lucro Líquido</h3>
              <p className="bento-card-subtitle">Esqueça o caderno e as planilhas. <span style={{ color: '#111' }}>Receitas, custos e comissões</span> calculados <span style={{ color: '#111' }}>automaticamente</span> a cada atendimento concluído.</p>
            </div>
            <FinanceiroMock />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
