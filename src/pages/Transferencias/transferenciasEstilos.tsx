import React from 'react';

export const styles = {
  // Layout con el degradado oscuro premium
  container: "min-h-screen flex items-center justify-center px-8 md:px-16 text-white",
  background: { 
    background: 'linear-gradient(135deg, #12072B 0%, #1A0B36 55%, #32145A 100%)' 
  } as React.CSSProperties,

  // Cards Estilo Vidrio Esmerilado (Glassmorphism)
  card: "backdrop-blur-xl rounded-[2rem] p-10 shadow-[0_25px_50px_rgba(0,0,0,0.4)] border border-white/10 w-full max-w-md transition-all duration-300",
  cardCenter: "backdrop-blur-xl rounded-[2rem] p-10 shadow-[0_25px_50px_rgba(0,0,0,0.4)] border border-white/10 w-full max-w-md transition-all duration-300 text-center",
  cardBg: {
    background: 'rgba(255, 255, 255, 0.04)',
  } as React.CSSProperties,

  // Confirmación
  checkCircle: "w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-500/20",
  checkIcon: "w-10 h-10 text-emerald-400",
  confirmTitulo: "text-white font-black text-3xl mb-1 tracking-tight",
  confirmSubtitulo: "text-purple-300 text-sm mb-6",
  destinatarioBox: "bg-white/5 rounded-2xl p-5 mb-4 border border-white/5",
  destinatarioLabel: "text-[10px] text-purple-300 font-extrabold uppercase tracking-widest mb-1",
  destinatarioNombre: "text-white font-bold text-base break-all px-2",
  montoBox: "bg-purple-500/10 border border-purple-500/20 rounded-2xl p-5 mb-8",
  montoLabel: "text-[10px] text-purple-400 font-extrabold uppercase tracking-widest mb-1",
  montoValor: "text-4xl font-black text-purple-300",
  montoMoneda: "text-lg font-bold text-purple-400",
  btnNueva: "w-full py-4 rounded-2xl bg-white text-[#12072B] font-bold hover:bg-purple-100 active:scale-[0.98] transition-all shadow-lg shadow-white/5",

  // Formulario Integrado al Fondo Oscuro
  formTitulo: "text-3xl font-black text-white mb-2 tracking-tight",
  formSubtitulo: "text-sm text-purple-300 mb-8",
  inputWrapper: "mb-5",
  label: "text-[11px] font-extrabold text-purple-300 uppercase tracking-wider mb-2 block",
  input: "w-full border border-white/10 bg-white/5 rounded-2xl px-4 py-3.5 text-white placeholder-purple-300/40 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all font-medium",
  montoWrapper: "mb-8",
  montoRow: "relative flex gap-2",
  select: "border border-white/10 bg-white/5 rounded-2xl px-3 py-3.5 text-white font-bold focus:outline-none focus:border-purple-500 transition-all cursor-pointer",
  montoInputWrapper: "relative flex-1",
  montoSymbol: "absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/60 font-bold text-lg",
  inputMonto: "w-full border border-white/10 bg-white/5 rounded-2xl pl-8 pr-4 py-3.5 text-white placeholder-purple-300/40 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all font-semibold text-lg",
  btnEnviar: "w-full py-4 rounded-2xl bg-purple-600 text-white font-bold hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98] transition-all shadow-lg shadow-purple-600/30 text-base",
};