import React from 'react'

export const styles = {
  // Loading State
  loadingCompactWrapper: 'flex items-center justify-center py-8',
  loadingCompactSpinner: 'animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600',
  loadingScreenWrapper: 'flex items-center justify-center min-h-[400px] h-screen',
  loadingScreenSpinner: 'animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600',

  // Error State
  errorCompact: 'bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-2xl text-xs font-semibold text-center my-4',
  errorScreenWrapper: 'p-8',
  errorScreenCard: 'bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl shadow-sm max-w-lg mx-auto mt-12 flex flex-col items-center gap-3',
  errorScreenSvg: 'w-12 h-12 text-red-500 animate-pulse',
  errorScreenTitle: 'font-bold text-lg',
  errorScreenMessage: 'text-sm text-center text-red-600',

  // Layout Containers
  container: (isCompact: boolean) =>
    isCompact
      ? 'bg-white p-0'
      : 'min-h-screen bg-white p-10 max-w-[1400px] mx-auto animate-fadeIn',
  
  // Header
  headerWrapper: 'flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8',
  headerTitle: 'text-3xl font-bold tracking-tight text-gray-900',
  headerSubtitle: 'text-gray-500 mt-1',
  headerActions: 'flex items-center gap-8 self-end lg:self-auto',
  activityContainer: 'flex flex-col items-end',
  activityLabel: 'text-[11px] font-extrabold text-gray-400 tracking-wider uppercase mb-1',
  sparklineWrapper: 'w-32 h-8',
  exportButton: 'flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 text-gray-700 transition-all duration-200 shadow-sm cursor-pointer active:scale-98',

  // Metrics Grid
  metricsGrid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8',
  metricCard: 'bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center justify-between',
  metricTextBlock: 'space-y-1',
  metricLabel: 'text-xs font-bold text-gray-400 tracking-wider uppercase',
  metricValueRed: 'text-2xl font-bold tracking-tight text-red-500',
  metricIconRed: 'p-3 bg-red-50 rounded-xl text-red-500',
  metricValueEmerald: 'text-2xl font-bold tracking-tight text-emerald-600',
  metricIconEmerald: 'p-3 bg-emerald-50 rounded-xl text-emerald-500',
  metricValuePurple: 'text-2xl font-bold tracking-tight text-purple-700',
  metricIconPurple: 'p-3 bg-purple-50 rounded-xl text-purple-600',
  metricValueBlack: 'text-2xl font-bold tracking-tight text-gray-900',
  metricIconGray: 'p-3 bg-gray-50 rounded-xl text-gray-500',

  // Filters Bar
  filtersBar: 'flex flex-col md:flex-row gap-3 items-center justify-between w-full bg-gray-50/60 p-2 rounded-2xl border border-gray-100 mb-8',
  searchWrapper: 'relative w-full md:flex-1',
  searchIcon: 'absolute left-4 top-1/2 -translate-y-1/2 text-gray-400',
  searchInput: 'w-full bg-white border border-gray-200/80 rounded-xl pl-11 pr-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-200',
  dropdownsWrapper: 'flex gap-2 w-full md:w-auto relative',
  dropdownWrapper: 'relative flex-1 md:flex-none',
  dropdownToggleBtn: 'w-full flex items-center justify-between gap-4 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer',
  dropdownToggleChevron: 'text-gray-400',
  dropdownMenuType: 'absolute right-0 mt-1.5 w-48 bg-white border border-gray-100 rounded-xl p-1.5 shadow-xl z-20',
  dropdownMenuCurrency: 'absolute right-0 mt-1.5 w-36 bg-white border border-gray-100 rounded-xl p-1.5 shadow-xl z-20',
  dropdownOptionBtn: 'w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors',

  // Monthly Groups
  monthlyGroupsList: 'space-y-8',
  monthAnimation: 'animate-fadeIn',
  monthTitle: 'text-xs font-bold text-gray-400 tracking-wider mb-4 uppercase',
  monthTransactionsList: 'space-y-3',

  // Transactions Items
  transactionItem: 'bg-white border border-gray-100 hover:border-purple-200 p-4 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_6px_20px_rgba(109,40,217,0.04)] transition-all duration-300 flex items-center justify-between group',
  transactionItemLeft: 'flex items-center gap-4',
  transactionIconWrapper: (type: string) => {
    const base = 'w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105'
    switch (type) {
      case 'ENVIADO':
        return `${base} bg-red-50 text-red-500`
      case 'RECIBIDO':
        return `${base} bg-emerald-50 text-emerald-500`
      case 'SWAP':
        return `${base} bg-purple-50 text-purple-600`
      default:
        return `${base} bg-blue-50 text-blue-500`
    }
  },
  transactionTitle: 'text-sm font-bold text-gray-800 transition-colors group-hover:text-purple-950',
  transactionTime: 'text-xs text-gray-400 font-medium mt-0.5',
  transactionItemRight: 'text-right flex items-center gap-6',
  transactionAmount: (type: string) => {
    const base = 'text-sm font-extrabold tracking-tight'
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
  },
  statusBadge: (status: string) => {
    const base = 'text-[11px] px-2.5 py-1 rounded-full font-bold tracking-wide transition-colors'
    return status === 'Completado'
      ? `${base} bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100/60`
      : `${base} bg-amber-50 text-amber-700 group-hover:bg-amber-100/60`
  },

  // Empty State Fallback
  emptyStateWrapper: 'text-center py-12 border-2 border-dashed border-gray-100 rounded-3xl',
  emptyStateIcon: 'mx-auto text-gray-300 mb-3',
  emptyStateText: 'text-sm font-semibold text-gray-500',
}
