export const styles = {
  // Layout
  container: "min-h-screen flex items-center justify-center px-8 md:px-16",
  background: { backgroundImage: 'linear-gradient(135deg, rgba(16, 185, 129, 1) 0%, rgba(5, 150, 105, 1) 60%, rgba(6, 95, 70, 1) 100%)' },

  // Cards
  card: "bg-white/95 backdrop-blur-md rounded-[2rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/20 w-full max-w-md transition-all duration-300",
  cardCenter: "bg-white/95 backdrop-blur-md rounded-[2rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/20 w-full max-w-md transition-all duration-300 text-center",

  // Confirmación
  checkCircle: "w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100",
  checkIcon: "w-10 h-10 text-emerald-500",
  confirmTitulo: "text-gray-900 font-black text-3xl mb-1 tracking-tight",
  confirmSubtitulo: "text-gray-500 text-sm mb-6",
  montoBox: "bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 mb-4",
  montoLabel: "text-[10px] text-emerald-600 font-extrabold uppercase tracking-widest mb-1",
  montoValor: "text-4xl font-black text-emerald-700",
  montoMoneda: "text-lg font-bold text-emerald-400",
  saldoBox: "bg-gray-50 rounded-2xl p-5 mb-8 border border-gray-100",
  saldoLabel: "text-[10px] text-gray-400 font-extrabold uppercase tracking-widest mb-1",
  saldoValor: "text-gray-800 font-bold text-base",
  btnNuevo: "w-full py-4 rounded-2xl bg-gray-900 text-white font-bold hover:bg-gray-800 active:scale-[0.98] transition-all shadow-lg shadow-gray-900/10",

  // Formulario
  formTitulo: "text-3xl font-black text-gray-900 mb-2 tracking-tight",
  formSubtitulo: "text-sm text-gray-500 mb-8",
  inputWrapper: "mb-5",
  label: "text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2 block",
  montoWrapper: "mb-8",
  montoRow: "relative flex gap-2",
  select: "border border-gray-200 bg-gray-50/50 rounded-2xl px-3 py-3.5 text-gray-800 font-bold focus:outline-none focus:border-emerald-500 transition-all cursor-pointer",
  montoInputWrapper: "relative flex-1",
  montoSymbol: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg",
  inputMonto: "w-full border border-gray-200 bg-gray-50/50 rounded-2xl pl-8 pr-4 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-semibold text-lg",
  btnDepositar: "w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all shadow-lg shadow-emerald-600/20 text-base",
}