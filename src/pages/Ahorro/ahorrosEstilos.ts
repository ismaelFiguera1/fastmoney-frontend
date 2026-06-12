import React from 'react'

export const styles = {
  // Contenedor principal y estructura
  container: 'min-h-screen pb-12 bg-[#130924] text-white',
  
  // Banner superior
  bannerHeader: 'pt-12 pb-20 px-8 relative text-white flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4',
  bannerHeaderBg: {
    background: 'transparent',
  } as React.CSSProperties,
  bannerSub: 'text-purple-300 text-sm font-medium tracking-wide uppercase',
  bannerTitle: 'text-4xl font-extrabold tracking-tight mt-1 text-white drop-shadow-md',
  
  // Grid / Layout principal
  contentWrapper: 'px-8 mt-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8',
  
  // Panel izquierdo - Tarjeta de Meta Activa
  activeGoalCard: 'lg:col-span-8 bg-[#201244] rounded-[2rem] p-8 shadow-2xl border border-[#3e246e]/60 flex flex-col justify-between min-h-[350px] relative overflow-hidden',
  
  // Gradiente de Meta de Ahorro
  goalGradientBanner: 'rounded-[1.5rem] p-8 text-white relative overflow-hidden flex flex-col items-center justify-center text-center shadow-lg mb-6 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500',
  goalGradientBg: {} as React.CSSProperties,
  goalName: 'text-3xl font-black tracking-tight mb-2 text-white',
  goalTarget: 'text-purple-100 text-xs font-bold tracking-wider uppercase bg-black/20 px-3 py-1 rounded-full',
  
  // Caja de saldo actual
  balanceBox: 'bg-[#13072e] border border-[#3b2073] rounded-2xl p-6 mb-6 flex flex-col items-center justify-center text-center',
  balanceLabel: 'text-[10px] text-purple-300 font-extrabold uppercase tracking-widest mb-1.5',
  balanceValue: 'text-4xl font-black text-white',
  
  // Barra de progreso
  progressWrapper: 'mb-8',
  progressLabels: 'flex justify-between text-[11px] font-bold text-purple-300/60 uppercase tracking-wider mb-2',
  progressBarTrack: 'w-full bg-[#13072e] border border-[#3b2073]/50 rounded-full h-3.5 relative overflow-hidden shadow-inner',
  progressBarThumb: 'bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(168,85,247,0.5)]',
  progressPercent: 'text-center mt-2.5 text-xs font-bold text-purple-300 uppercase tracking-widest',
  
  // Botones de acción en Meta Activa
  actionsRow: 'grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2',
  btnPrimary: 'py-4 px-6 rounded-2xl bg-purple-600 text-white font-bold hover:bg-purple-700 active:scale-[0.98] transition-all shadow-lg shadow-purple-600/20 text-center cursor-pointer text-sm',
  btnSecondary: 'py-4 px-6 rounded-2xl bg-[#13072e] text-purple-200 border border-[#3b2073] font-bold hover:bg-[#1c0d3d] active:scale-[0.98] transition-all text-center cursor-pointer text-sm shadow-sm',

  // Botón tres puntos / Opciones de Meta
  optionsBtn: 'w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center cursor-pointer border border-white/5 absolute top-8 right-8',
  optionsSvg: 'w-5 h-5 text-white',
  dropdownMenu: 'absolute right-8 top-20 bg-[#1c0d38] border border-[#3e246e] rounded-2xl p-2.5 shadow-2xl w-48 z-20 transition-all duration-200 flex flex-col gap-1',
  dropdownItem: 'w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 transition-colors text-left cursor-pointer',

  // Formulario de creación
  formCard: 'bg-[#201244] border border-[#3e246e]/60 rounded-[2rem] p-10 shadow-2xl w-full max-w-2xl mx-auto text-white',
  formTitle: 'text-3xl font-black text-white mb-2 tracking-tight text-center',
  formSubtitulo: 'text-sm text-purple-300/80 mb-8 text-center',
  formGroup: 'mb-6',
  label: 'text-[11px] font-extrabold text-purple-300/60 uppercase tracking-wider mb-2 block',
  input: 'w-full border border-[#3b2073] bg-[#13072e] rounded-2xl px-5 py-4 text-white placeholder-purple-300/30 focus:outline-none focus:border-purple-500 focus:bg-[#13072e] transition-all font-semibold text-base',
  select: 'w-full border border-[#3b2073] bg-[#13072e] rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-purple-500 transition-all cursor-pointer text-base appearance-none',
  selectWrapper: 'relative after:content-["▼"] after:absolute after:right-5 after:top-1/2 after:-translate-y-1/2 after:text-purple-300 after:pointer-events-none after:text-xs',
  btnSubmit: 'w-full py-4 rounded-2xl bg-purple-600 text-white font-bold hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all shadow-lg shadow-purple-600/20 text-base cursor-pointer',

  // Modal / Input flotante para Depósito/Retiro
  modalOverlay: 'fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4',
  modalCard: 'bg-[#1c0d38] border border-[#3e246e] rounded-3xl p-8 shadow-2xl w-full max-w-md animate-scaleUp text-white',
  modalTitle: 'text-xl font-bold text-white mb-2',
  modalDesc: 'text-xs text-purple-300/70 mb-6',
  modalInputWrapper: 'relative mb-6',
  modalSymbol: 'absolute left-5 top-1/2 -translate-y-1/2 text-purple-300 font-bold text-lg',
  modalInput: 'w-full border border-[#3b2073] bg-[#13072e] rounded-2xl pl-10 pr-5 py-4 text-white focus:outline-none focus:border-purple-500 focus:bg-[#13072e] transition-all font-semibold text-lg',
  modalActions: 'flex gap-3 justify-end',
  modalBtnCancel: 'px-5 py-3.5 rounded-xl text-purple-300 hover:bg-[#201244] font-bold text-sm transition-all cursor-pointer',
  modalBtnConfirm: 'px-5 py-3.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700 font-bold text-sm transition-all cursor-pointer shadow-md shadow-purple-600/10',

  // Estado vacío / lateral
  lateralCard: 'lg:col-span-4 bg-[#201244] border border-[#3e246e]/60 rounded-3xl p-6 shadow-2xl text-white self-start',
  lateralTitle: 'text-sm font-bold text-white mb-4 uppercase tracking-wider',
  lateralTip: 'flex gap-3 items-start p-3 rounded-2xl hover:bg-purple-950/30 transition-colors',
  lateralTipText: 'text-xs text-purple-200 leading-relaxed',
}
