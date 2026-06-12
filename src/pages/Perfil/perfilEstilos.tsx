import React from 'react'

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

  // Layout Containers
  container: 'min-h-screen bg-gray-50/50 p-6 md:p-10 max-w-[1000px] mx-auto animate-fadeIn',
  headerWrapper: 'mb-8',
  headerTitle: 'text-3xl font-extrabold tracking-tight text-gray-900',
  headerSubtitle: 'text-gray-500 mt-1',
  
  // Grid layout
  gridContainer: 'grid grid-cols-1 md:grid-cols-3 gap-8',
  
  // Personal Info Card
  infoCard: 'md:col-span-1 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center',
  avatarCircle: 'w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-3xl flex items-center justify-center shadow-md mb-4',
  profileName: 'text-xl font-bold text-gray-800',
  profileEmail: 'text-sm text-gray-400 font-medium mt-1',
  divider: 'w-full border-t border-gray-100 my-6',
  
  // Details List
  detailsList: 'w-full text-left space-y-4',
  detailLabel: 'text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block',
  detailValue: 'text-sm font-bold text-gray-700 mt-1 block',
  verifiedBadge: 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 mt-1',
  verifiedDot: 'w-1.5 h-1.5 bg-purple-600 rounded-full animate-ping',
  
  // Accounts Section
  accountsWrapper: 'md:col-span-2 space-y-6',
  accountsCard: 'bg-white rounded-3xl p-6 shadow-sm border border-gray-100',
  accountsTitle: 'text-lg font-bold text-gray-900 mb-4',
  emptyState: 'text-center py-8 text-gray-400 text-sm',
  accountsListStack: 'space-y-4',
  
  // Account Item
  accountItemCard: 'border border-gray-100 hover:border-purple-200 p-5 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.01)] transition-all duration-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-gray-50/30',
  accountInfo: 'space-y-1',
  accountCurrencyRow: 'flex items-center gap-2',
  accountCurrencyLabel: 'text-sm font-extrabold text-gray-800',
  currencyBadge: 'text-xs bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-md',
  accountMetadataRow: 'flex items-center gap-2 text-xs text-gray-400 font-semibold',
  copyBtn: 'text-purple-600 hover:text-purple-700 hover:underline flex items-center gap-1 cursor-pointer active:scale-95',
  
  // Balance Block
  balanceBlock: 'text-right',
  balanceLabel: 'text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block',
  balanceValue: 'text-xl font-extrabold text-gray-900 tracking-tight mt-0.5 block',
}
