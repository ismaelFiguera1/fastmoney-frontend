import React, { useState } from 'react'

function Transferencias() {
  const [step, setStep] = useState<'form' | 'confirm'>('form')
  const [correo, setCorreo] = useState('')
  const [monto, setMonto] = useState('')

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-8 md:px-16" 
      style={{ backgroundImage: 'linear-gradient(135deg, rgba(106, 24, 161, 1) 0%, rgba(168, 65, 55, 1) 60%, rgba(252, 176, 69, 1) 100%)' }}
    >
      {step === 'confirm' ? (
        /* ---------------------------------------------------- */
        /* PANTALLA DE ÉXITO                                    */
        /* ---------------------------------------------------- */
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/20 w-full max-w-md text-center transition-all duration-300">
          {/* Ícono check premium */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100">
            <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-gray-900 font-black text-3xl mb-1 tracking-tight">¡Enviado con éxito!</h2>
          <p className="text-gray-500 text-sm mb-6">Tu dinero ya va en camino</p>

          {/* Destinatario */}
          <div className="bg-gray-50 rounded-2xl p-5 mb-4 border border-gray-100">
            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest mb-1">Destinatario</p>
            <p className="text-gray-800 font-bold text-base break-all px-2">{correo}</p>
          </div>

          {/* Monto */}
          <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-5 mb-8">
            <p className="text-[10px] text-purple-500 font-extrabold uppercase tracking-widest mb-1">Monto enviado</p>
            <p className="text-4xl font-black text-purple-700">${monto}</p>
          </div>

          <button
            onClick={() => { setStep('form'); setCorreo(''); setMonto('') }}
            className="w-full py-4 rounded-2xl bg-gray-900 text-white font-bold hover:bg-gray-800 active:scale-[0.98] transition-all shadow-lg shadow-gray-900/10"
          >
            Nueva transferencia
          </button>
        </div>
      ) : (
        /* ---------------------------------------------------- */
        /* PANTALLA DEL FORMULARIO                              */
        /* ---------------------------------------------------- */
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/20 w-full max-w-md transition-all duration-300">
          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Enviar dinero</h1>
          <p className="text-sm text-gray-500 mb-8">Transfiere de forma inmediata y sin comisiones.</p>

          {/* Input Correo */}
          <div className="mb-5">
            <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2 block">
              Correo destinatario
            </label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="ejemplo@correo.com"
              className="w-full border border-gray-200 bg-gray-50/50 rounded-2xl px-4 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all font-medium"
            />
          </div>

          {/* Input Monto Modificado */}
          <div className="mb-8">
            <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2 block">
              Monto a enviar
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">$</span>
              <input
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="0.00"
                className="w-full border border-gray-200 bg-gray-50/50 rounded-2xl pl-8 pr-4 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all font-semibold text-lg"
              />
            </div>
          </div>

          {/* Botón Principal Estilo Premium */}
          <button
            onClick={() => { if (correo && monto) setStep('confirm') }}
            disabled={!correo || !monto}
            className="w-full py-4 rounded-2xl bg-purple-600 text-white font-bold hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all shadow-lg shadow-purple-600/20 text-base"
          >
            Confirmar envío
          </button>
        </div>
      )}
    </div>
  )
}

export default Transferencias