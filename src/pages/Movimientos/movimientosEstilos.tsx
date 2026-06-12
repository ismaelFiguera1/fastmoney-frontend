import React from 'react'

export const styles = {
  // Loading State
  loadingCompactWrapper: 'flex items-center justify-center py-8',
  loadingCompactSpinner: 'animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500',
  loadingScreenWrapper: 'flex items-center justify-center min-h-[400px] h-screen bg-[#130924]',
  loadingScreenSpinner: 'animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500',

  // Error State
  errorCompact: 'bg-red-950/40 border border-red-500/20 text-red-200 px-4 py-3 rounded-2xl text-xs font-semibold text-center my-4',
  errorScreenWrapper: 'p-8 bg-[#130924] min-h-screen text-white',
  errorScreenCard: 'bg-[#201244] border border-red-500/30 text-red-200 px-6 py-4 rounded-2xl shadow-2xl max-w-lg mx-auto mt-12 flex flex-col items-center gap-3',
  errorScreenSvg: 'w-12 h-12 text-red-400 animate-pulse',
  errorScreenTitle: 'font-bold text-lg',
  errorScreenMessage: 'text-sm text-center text-red-300/80',

  // Layout Containers
  container: (isCompact: boolean) =>
    isCompact
      ? 'bg-transparent p-0 text-white'
      : 'min-h-screen bg-[#130924] p-6 md:p-10 w-full animate-fadeIn text-white',
  
  // Header
  headerWrapper: 'flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 text-center lg:text-left',
  headerTitle: 'text-3xl font-extrabold tracking-tight text-white',
  headerSubtitle: 'text-purple-300/80 mt-1',
  headerActions: 'flex items-center gap-8 self-center lg:self-auto',
  activityContainer: 'flex flex-col items-center lg:items-end',
  activityLabel: 'text-[11px] font-extrabold text-purple-300/60 tracking-wider uppercase mb-1',
  sparklineWrapper: 'w-32 h-8',
  exportButton: 'flex items-center gap-2 px-4 py-2.5 bg-[#201244] border border-[#3b2073] rounded-xl text-sm font-semibold hover:bg-[#1c0d3d] text-purple-300 transition-all duration-200 shadow-md cursor-pointer active:scale-98',

  // Metrics Grid
  metricsGrid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8',
  metricCard: 'bg-[#201244] border border-[#3e246e]/60 p-5 rounded-2xl shadow-2xl flex items-center justify-between text-white',
  metricTextBlock: 'space-y-1',
  metricLabel: 'text-xs font-bold text-purple-300/60 tracking-wider uppercase',
  metricValueRed: 'text-2xl font-bold tracking-tight text-rose-400',
  metricIconRed: 'p-3 bg-rose-950/40 border border-rose-900/30 rounded-xl text-rose-400',
  metricValueEmerald: 'text-2xl font-bold tracking-tight text-emerald-400',
  metricIconEmerald: 'p-3 bg-emerald-950/40 border border-emerald-900/30 rounded-xl text-emerald-400',
  metricValuePurple: 'text-2xl font-bold tracking-tight text-purple-300',
  metricIconPurple: 'p-3 bg-purple-950/40 border border-[#3b2073] rounded-xl text-purple-400',
  metricValueBlack: 'text-2xl font-bold tracking-tight text-white',
  metricIconGray: 'p-3 bg-purple-950/40 border border-purple-900/20 rounded-xl text-purple-300',

  // Filters Bar
  filtersBar: 'flex flex-col md:flex-row gap-3 items-center justify-between w-full bg-[#201244] p-2 rounded-2xl border border-[#3e246e]/60 mb-8',
  searchWrapper: 'relative w-full md:flex-1',
  searchIcon: 'absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/60',
  searchInput: 'w-full bg-[#13072e] border border-[#3b2073] rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-purple-300/30 focus:outline-none focus:border-purple-500 transition-all duration-200',
  dropdownsWrapper: 'flex gap-2 w-full md:w-auto relative',
  dropdownWrapper: 'relative flex-1 md:flex-none',
  dropdownToggleBtn: 'w-full flex items-center justify-between gap-4 bg-[#13072e] border border-[#3b2073] px-4 py-2.5 rounded-xl text-sm font-medium text-purple-200 hover:bg-[#1c0d3d] transition-colors cursor-pointer',
  dropdownToggleChevron: 'text-purple-300/60',
  dropdownMenuType: 'absolute right-0 mt-1.5 w-48 bg-[#1c0d38] border border-[#3e246e] rounded-xl p-1.5 shadow-2xl z-20',
  dropdownMenuCurrency: 'absolute right-0 mt-1.5 w-36 bg-[#1c0d38] border border-[#3e246e] rounded-xl p-1.5 shadow-2xl z-20',
  dropdownOptionBtn: 'w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-purple-200 hover:bg-[#201244] hover:text-white transition-colors cursor-pointer',

  // Monthly Groups
  monthlyGroupsList: 'space-y-8',
  monthAnimation: 'animate-fadeIn',
  monthTitle: (isCompact: boolean) =>
    isCompact
      ? 'text-xs font-bold text-gray-400 tracking-wider mb-4 uppercase'
      : 'text-xs font-bold text-purple-300/60 tracking-wider mb-4 uppercase',
  monthTransactionsList: 'space-y-3',

  // Transactions Items
  transactionItem: (isCompact: boolean) =>
    isCompact
      ? 'bg-white border border-gray-100 hover:border-purple-200 p-4 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_6px_20px_rgba(109,40,217,0.04)] transition-all duration-300 flex items-center justify-between group'
      : 'bg-[#201244] border border-[#3b2073] hover:border-purple-500 p-4 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all duration-300 flex items-center justify-between group',
  transactionItemLeft: 'flex items-center gap-4',
  transactionIconWrapper: (type: string, isCompact: boolean) => {
    const base = 'w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 border'
    if (isCompact) {
      const compactBase = 'w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105'
      switch (type) {
        case 'ENVIADO':
          return `${compactBase} bg-red-50 text-red-500`
        case 'RECIBIDO':
          return `${compactBase} bg-emerald-50 text-emerald-500`
        case 'SWAP':
          return `${compactBase} bg-purple-50 text-purple-600`
        default:
          return `${compactBase} bg-blue-50 text-blue-500`
      }
    }
    
    switch (type) {
      case 'ENVIADO':
        return `${base} bg-rose-950/40 border-rose-900/30 text-rose-400`
      case 'RECIBIDO':
        return `${base} bg-emerald-950/40 border-emerald-900/30 text-emerald-400`
      case 'SWAP':
        return `${base} bg-purple-950/40 border-[#3b2073] text-purple-300`
      default:
        return `${base} bg-blue-950/40 border-blue-900/30 text-blue-400`
    }
  },
  transactionTitle: (isCompact: boolean) =>
    isCompact
      ? 'text-sm font-bold text-gray-800 transition-colors group-hover:text-purple-950'
      : 'text-sm font-bold text-white transition-colors group-hover:text-purple-300',
  transactionTime: (isCompact: boolean) =>
    isCompact
      ? 'text-xs text-gray-400 font-medium mt-0.5'
      : 'text-xs text-purple-300/50 font-medium mt-0.5',
  transactionItemRight: 'text-right flex items-center gap-6',
  transactionAmount: (type: string, isCompact: boolean) => {
    const base = 'text-sm font-extrabold tracking-tight'
    if (isCompact) {
      switch (type) {
        case 'ENVIADO':
          return `${base} text-gray-900`
        case 'RECIBIDO':
          return `${base} text-emerald-600`
        case 'SWAP':
          return `${base} text-purple-700`
        default:
          return `${base} text-emerald-600`
      }
    }

    switch (type) {
      case 'ENVIADO':
        return `${base} text-rose-400`
      case 'RECIBIDO':
        return `${base} text-emerald-400`
      case 'SWAP':
        return `${base} text-purple-300`
      default:
        return `${base} text-emerald-400`
    }
  },
  statusBadge: (status: string, isCompact: boolean) => {
    const base = 'text-[11px] px-2.5 py-1 rounded-full font-bold tracking-wide transition-colors border'
    if (isCompact) {
      const compactBase = 'text-[11px] px-2.5 py-1 rounded-full font-bold tracking-wide transition-colors'
      return status === 'Completado'
        ? `${compactBase} bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100/60`
        : `${compactBase} bg-amber-50 text-amber-700 group-hover:bg-amber-100/60`
    }

    return status === 'Completado'
      ? `${base} bg-emerald-950/40 border-emerald-900/30 text-emerald-400 group-hover:bg-emerald-900/20`
      : `${base} bg-amber-950/40 border-amber-900/30 text-amber-400 group-hover:bg-amber-900/20`
  },

  // Empty State Fallback
  emptyStateWrapper: 'text-center py-12 border-2 border-dashed border-[#3b2073] rounded-3xl',
  emptyStateIcon: 'mx-auto text-purple-300/40 mb-3',
  emptyStateText: 'text-sm font-semibold text-purple-300/60',
}
