import React from 'react'

export const styles = {
  // Layout / Panels
  container: 'min-h-screen flex font-sans',
  leftPanel: 'hidden lg:flex w-[44%] flex-col justify-between p-12',
  leftPanelBg: { background: 'linear-gradient(150deg, #5b21b6 0%, #9333ea 40%, #c026d3 100%)' } as React.CSSProperties,

  // Logo
  logoWrapper: 'flex items-center gap-3',
  logoIconContainer: 'w-9 h-9 rounded-xl flex items-center justify-center',
  logoBg: { background: 'rgba(255,255,255,0.2)' } as React.CSSProperties,
  logoEmoji: 'text-white text-lg',
  logoText: 'text-white font-bold text-lg tracking-tight',

  // Left panel content
  mainTitle: 'text-white font-extrabold text-4xl leading-tight mb-4',
  titleHighlight: 'px-2 rounded-lg',
  limitSpan: { background: 'rgba(255,255,255,0.22)' } as React.CSSProperties,
  subtitle: 'text-purple-200 text-sm leading-relaxed',
  
  // Features
  featureList: 'flex flex-col gap-3',
  featureCard: 'flex items-center gap-3 rounded-xl p-3',
  featureCardBg: {
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.18)',
  } as React.CSSProperties,
  featureIcon: 'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
  featureTitle: 'text-white text-sm font-medium',
  featureSub: 'text-purple-200 text-xs',

  // Currencies
  currenciesLabel: 'text-purple-300 text-xs uppercase tracking-widest mb-2',
  currenciesList: 'flex gap-2 flex-wrap',
  currencyBadge: 'text-white text-xs font-bold px-3 py-1 rounded-full',
  currencyBadgeBg: {
    background: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.25)',
  } as React.CSSProperties,

  // Right Panel / Form
  rightPanel: 'flex-1 flex flex-col justify-center px-8 lg:px-12 bg-white',
  toggleContainer: 'flex bg-purple-50 rounded-xl p-1 mb-8 border border-purple-100',
  toggleButton: (isActive: boolean) =>
    `flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
      isActive ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-400'
    }`,
  statusBadge: 'inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1 mb-5 w-fit',
  statusDot: 'w-2 h-2 bg-green-500 rounded-full',
  statusText: 'text-green-700 text-xs font-medium',
  formTitle: 'text-2xl font-extrabold text-gray-900 mb-1 tracking-tight',
  formSub: 'text-gray-400 text-sm mb-6',
  errorBox: 'bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4',
  successBox: 'bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 mb-4',
  inputRow: 'grid grid-cols-2 gap-3 mb-3',
  label: 'block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1',
  input: 'w-full bg-purple-50 border border-purple-100 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition',
  inputContainer: 'mb-3',
  inputContainerMargin: 'mb-4',
  selectWrapper: 'relative',
  select: 'w-full bg-purple-50 border border-purple-100 rounded-xl px-4 py-3 pr-10 text-sm text-gray-800 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition appearance-none cursor-pointer',
  selectIconWrapper: 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-purple-600',
  forgotContainer: 'text-right mb-5 -mt-1',
  forgotLink: 'text-purple-600 text-xs font-semibold hover:underline',
  submitBtn: 'w-full text-white font-bold py-3 rounded-xl text-sm transition-all hover:opacity-90 active:scale-95 disabled:opacity-60 cursor-pointer',
  submitBtnBg: {
    background: 'linear-gradient(135deg, #9333ea, #c026d3)',
    boxShadow: '0 4px 18px rgba(147,51,234,0.3)',
  } as React.CSSProperties,
}
