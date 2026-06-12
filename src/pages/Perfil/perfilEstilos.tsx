import React from 'react'

export const styles = {
  // Loading State
  loadingWrapper: 'flex items-center justify-center min-h-[400px] h-screen bg-[#130924]',
  loadingSpinner: 'animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500',

  // Error State
  errorWrapper: 'p-8 bg-[#130924] min-h-screen text-white',
  errorCard: 'bg-[#201244] border border-red-500/30 text-red-200 px-6 py-4 rounded-2xl shadow-2xl max-w-lg mx-auto mt-12 flex flex-col items-center gap-3',
  errorSvg: 'w-12 h-12 text-red-400 animate-pulse',
  errorTitle: 'font-bold text-lg',
  errorMessage: 'text-sm text-center text-red-300/80',

  // Layout Containers
  container: 'min-h-screen bg-[#130924] p-6 md:p-10 w-full animate-fadeIn text-white',
  headerWrapper: 'mb-8 text-center md:text-left',
  headerTitle: 'text-3xl font-extrabold tracking-tight text-white',
  headerSubtitle: 'text-purple-300/80 mt-1',
  
  // Grid layout
  gridContainer: 'grid grid-cols-1 md:grid-cols-3 gap-8',
  
  // Personal Info Card
  infoCard: 'md:col-span-1 bg-[#201244] rounded-3xl p-6 shadow-2xl border border-[#3e246e]/60 flex flex-col items-center text-center text-white',
  avatarCircle: 'w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-3xl flex items-center justify-center shadow-lg mb-4 border-2 border-purple-400/20',
  profileName: 'text-xl font-bold text-white',
  profileEmail: 'text-sm text-purple-300/60 font-medium mt-1',
  divider: 'w-full border-t border-[#3e246e]/40 my-6',
  
  // Details List
  detailsList: 'w-full text-left space-y-4',
  detailLabel: 'text-[10px] font-extrabold text-purple-300/50 uppercase tracking-wider block',
  detailValue: 'text-sm font-bold text-white mt-1 block',
  verifiedBadge: 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-950/40 text-purple-300 border border-purple-800/40 mt-1',
  verifiedDot: 'w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping',
  
  // Accounts Section
  accountsWrapper: 'md:col-span-2 space-y-6',
  accountsCard: 'bg-[#201244] rounded-3xl p-6 shadow-2xl border border-[#3e246e]/60',
  accountsTitle: 'text-lg font-bold text-white mb-4',
  emptyState: 'text-center py-8 text-purple-300/40 text-sm',
  accountsListStack: 'space-y-4',
  
  // Account Item
  accountItemCard: 'border border-[#3b2073] hover:border-purple-500 p-5 rounded-2xl shadow-inner transition-all duration-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-[#13072e]',
  accountInfo: 'space-y-1',
  accountCurrencyRow: 'flex items-center gap-2',
  accountCurrencyLabel: 'text-sm font-extrabold text-white',
  currencyBadge: 'text-xs bg-[#201244] border border-[#3b2073] text-purple-300 font-bold px-2 py-0.5 rounded-md',
  accountMetadataRow: 'flex items-center gap-2 text-xs text-purple-300/50 font-semibold',
  copyBtn: 'text-purple-400 hover:text-purple-300 hover:underline flex items-center gap-1 cursor-pointer active:scale-95',
  
  // Balance Block
  balanceBlock: 'text-right',
  balanceLabel: 'text-[10px] font-extrabold text-purple-300/50 uppercase tracking-widest block',
  balanceValue: 'text-xl font-extrabold text-white tracking-tight mt-0.5 block',
}
