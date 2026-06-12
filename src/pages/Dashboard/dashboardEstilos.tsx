import React from 'react';

export const styles = {
  // Loading State
  loadingWrapper: 'flex items-center justify-center min-h-[400px] h-screen',
  loadingSpinner: 'animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600',

  // Error State
  errorWrapper: 'p-8',
  errorCard: 'bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl shadow-sm max-w-lg mx-auto mt-12 flex flex-col items-center gap-3',
  errorSvg: 'w-12 h-12 text-red-500 animate-pulse',
  errorTitle: 'font-bold text-lg',
  errorMessage: 'text-sm text-center text-red-600',

  // Layout / Panels
  container: 'min-h-full pb-12',
  
  // Welcome Banner (BLOQUE MODIFICADO CON EL DEGRADADO OSCURO)
  bannerHeader: 'pt-12 pb-24 px-8 relative text-white flex justify-between items-start',
  bannerHeaderBg: {
    background: 'linear-gradient(135deg, #12072B 0%, #1A0B36 55%, #32145A 100%)',
    borderBottomLeftRadius: '16px',
    borderBottomRightRadius: '16px',
  } as React.CSSProperties,
  welcomeSub: 'text-purple-300 text-sm font-medium',
  welcomeTitle: 'text-3xl font-extrabold tracking-tight mt-1 flex items-center gap-2 text-white',
  welcomeWave: 'animate-bounce',
  
  // Notifications / Buttons (Ajustado el contraste para el fondo oscuro)
  headerActions: 'flex items-center gap-3',
  actionButton: 'w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center cursor-pointer border border-white/5',
  actionSvg: 'w-5 h-5 text-white',

  // Balances Grid
  balancesGrid: 'px-8 -mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10',
  balanceCard: 'bg-white rounded-3xl p-6 shadow-xl border border-gray-100/50 flex flex-col justify-between min-h-[160px]',
  balanceHeaderRow: 'flex items-center justify-between mb-3',
  balanceHeaderRowGap: 'flex items-center gap-2 mb-3',
  
  // Icon Containers
  iconContainerPurple: 'w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center',
  iconContainerEmerald: 'w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center',
  iconPurple: 'w-4 h-4 text-purple-600',
  iconEmerald: 'w-4 h-4 text-emerald-600',
  
  // Balance Cards Texts
  balanceLabel: 'text-[11px] font-extrabold text-gray-400 uppercase tracking-widest',
  toggleVisibilityBtn: 'w-8 h-8 rounded-full hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all cursor-pointer',
  toggleVisibilitySvg: 'w-4 h-4',
  balanceValueWrapper: 'flex items-baseline gap-2',
  currencySymbol: 'text-3xl font-extrabold text-gray-900',
  balanceValue: 'text-4xl font-extrabold text-gray-900 tracking-tight transition-all duration-300',
  
  // Currency Selector
  currencySelectorWrapper: 'mt-4 relative self-start',
  currencySelectorBtn: 'flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold rounded-xl transition-all cursor-pointer',
  currencySelectorChevron: (showDropdown: boolean) =>
    `w-3 h-3 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`,
  dropdownOverlay: 'fixed inset-0 z-20',
  dropdownMenu: 'absolute left-0 mt-1 bg-white border border-gray-100 rounded-xl p-1.5 shadow-lg w-28 z-30',
  dropdownOptionBtn: (isSelected: boolean) =>
    `w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
      isSelected ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'
    }`,

  // Savings specific
  goalText: 'text-xs font-semibold text-gray-400',
  progressBarTrack: 'w-full bg-gray-100 rounded-full h-1.5 mt-2',
  progressBarThumb: 'bg-purple-600 h-1.5 rounded-full transition-all duration-500',

  // Section Headers
  sectionWrapper: 'px-8 mt-10',
  sectionTitle: 'text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-4',
  
  // Quick Actions
  actionsGrid: 'grid grid-cols-2 sm:grid-cols-4 gap-4',
  actionLinkCard: 'bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 transition-all hover:-translate-y-1 hover:shadow-md active:scale-95 text-center group cursor-pointer',
  actionLinkIconWrapper: (bg: string, iconColor: string) =>
    `w-12 h-12 rounded-full ${bg} ${iconColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`,
  actionLinkLabel: 'text-xs font-bold text-gray-700',

  // Movements List
  movementsHeaderRow: 'flex justify-between items-center mb-4',
  viewAllLink: 'text-xs font-extrabold text-purple-600 hover:text-purple-700 hover:underline',
};