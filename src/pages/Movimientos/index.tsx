import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store' // Ajusta la ruta según tu proyecto
import { ROUTES } from '../../constants/routes'    // Ajusta la ruta según tu proyecto
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCw, 
  FileText, 
  Download, 
  Search, 
  ChevronDown,
  Plus
} from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'

// --- Tipados e Interfaces ---
interface Transaction {
  id: string | number;
  type: 'ENVIADO' | 'RECIBIDO' | 'SWAP' | 'DEPOSITO';
  title: string;
  description?: string;
  time: string;
  amount: string;
  displayAmount?: string; // Para swaps detallados
  status: 'Completado' | 'Pendiente';
  monthGroup: 'JUNIO 2026' | 'MAYO 2026';
  currency: 'USD' | 'EUR' | 'ARS' | 'COP';
}

// --- Datos Simulados para el Gráfico Sparkline ---
const chartData = [
  { value: 20 }, { value: 45 }, { value: 28 }, 
  { value: 60 }, { value: 35 }, { value: 75 }, { value: 50 }
];

export default function Movimientos() {
  const { user } = useAuthStore()
  
  // --- Estados de Filtros ---
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('Todos')
  const [currencyFilter, setCurrencyFilter] = useState<string>('Todas')
  
  // Dropdowns visuales
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false)

  // --- Listado Base de Transacciones ---
  // Si tu backend ya inyecta movimientos en el user, se mapean aquí. Si no, usamos el mock premium solicitado.
  const allTransactions: Transaction[] = useMemo(() => {
    if (user?.movimientos && user.movimientos.length > 0) {
      return user.movimientos;
    }
    
    return [
      { 
        id: '1', 
        type: 'ENVIADO', 
        title: 'Enviado a María García', 
        description: 'USD → COP · Comisión 0.5 USD', 
        time: 'Hoy, 10:32', 
        amount: '-$250.00', 
        status: 'Completado', 
        monthGroup: 'JUNIO 2026',
        currency: 'USD'
      },
      { 
        id: '2', 
        type: 'RECIBIDO', 
        title: 'Recibido de Carlos López', 
        description: 'EUR', 
        time: 'Ayer, 18:05', 
        amount: '+$180.00', 
        status: 'Completado', 
        monthGroup: 'JUNIO 2026',
        currency: 'EUR'
      },
      { 
        id: '3', 
        type: 'SWAP', 
        title: 'Swap USD → COP', 
        description: '03/06, 09:30', 
        amount: '$500.00',
        displayAmount: '$500 → $2.060.000 COP',
        status: 'Completado', 
        monthGroup: 'JUNIO 2026',
        currency: 'USD'
      },
      { 
        id: '4', 
        type: 'ENVIADO', 
        title: 'Enviado a Pedro Ruiz', 
        description: 'USD', 
        time: '02/06, 14:20', 
        amount: '-$100.00', 
        status: 'Pendiente', 
        monthGroup: 'JUNIO 2026',
        currency: 'USD'
      },
      { 
        id: '5', 
        type: 'DEPOSITO', 
        title: 'Depósito de saldo', 
        description: '01/06, 08:00', 
        amount: '+$1,000.00', 
        status: 'Completado', 
        monthGroup: 'JUNIO 2026',
        currency: 'USD'
      },
      { 
        id: '6', 
        type: 'ENVIADO', 
        title: 'Pago suscripción Netflix', 
        description: 'Tarjeta Virtual', 
        time: '28/05, 22:15', 
        amount: '-$15.99', 
        status: 'Completado', 
        monthGroup: 'MAYO 2026',
        currency: 'USD'
      },
      { 
        id: '7', 
        type: 'RECIBIDO', 
        title: 'Nómina FastMoney Corp', 
        description: 'Nómina Mayo', 
        time: '25/05, 09:00', 
        amount: '+$2,500.00', 
        status: 'Completado', 
        monthGroup: 'MAYO 2026',
        currency: 'USD'
      }
    ];
  }, [user]);

  // --- Lógica de Filtrado ---
  const filteredTransactions = useMemo(() => {
    return allTransactions.filter(tx => {
      const matchesSearch = tx.title.toLowerCase().includes(search.toLowerCase()) || 
                            (tx.description && tx.description.toLowerCase().includes(search.toLowerCase()));
      
      const matchesType = typeFilter === 'Todos' || tx.type === typeFilter;
      const matchesCurrency = currencyFilter === 'Todas' || tx.currency === currencyFilter;

      return matchesSearch && matchesType && matchesCurrency;
    });
  }, [allTransactions, search, typeFilter, currencyFilter]);

  return (
    <div className="min-h-screen bg-white p-10 max-w-[1400px] mx-auto animate-fadeIn">
      
      {/* HEADER SUPERIOR */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Movimientos</h1>
          <p className="text-gray-500 mt-1">Consulta el historial de todas tus transacciones.</p>
        </div>
        
        <div className="flex items-center gap-8 self-end lg:self-auto">
          {/* Gráfico Sparkline de Actividad de 7 días */}
          <div className="flex flex-col items-end">
            <span className="text-[11px] font-extrabold text-gray-400 tracking-wider uppercase mb-1">Actividad 7 días</span>
            <div className="w-32 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="purpleGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6D28D9" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#6D28D9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#6D28D9" strokeWidth={2} fillOpacity={1} fill="url(#purpleGlow)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Botón Exportar */}
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 text-gray-700 transition-all duration-200 shadow-sm cursor-pointer active:scale-98">
            <Download size={16} />
            Exportar
          </button>
        </div>
      </div>

      {/* METRICAS / ESTADÍSTICAS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Total Enviado */}
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">Total Enviado</span>
            <h3 className="text-2xl font-bold tracking-tight text-red-500">-$1,250.00</h3>
          </div>
          <div className="p-3 bg-red-50 rounded-xl text-red-500">
            <ArrowUpRight size={20} />
          </div>
        </div>

        {/* Total Recibido */}
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">Total Recibido</span>
            <h3 className="text-2xl font-bold tracking-tight text-emerald-600">+$3,800.00</h3>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-500">
            <ArrowDownLeft size={20} />
          </div>
        </div>

        {/* Total Convertido */}
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">Total Convertido</span>
            <h3 className="text-2xl font-bold tracking-tight text-purple-700">$950.00</h3>
          </div>
          <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
            <RefreshCw size={20} />
          </div>
        </div>

        {/* Operaciones */}
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">Operaciones</span>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">12</h3>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl text-gray-500">
            <FileText size={20} />
          </div>
        </div>
      </div>

      {/* FILTROS Y BUSCADOR */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between w-full bg-gray-50/60 p-2 rounded-2xl border border-gray-100 mb-8">
        {/* Barra de Búsqueda Grande */}
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por usuario, correo o referencia..."
            className="w-full bg-white border border-gray-200/80 rounded-xl pl-11 pr-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-200"
          />
        </div>

        {/* Selectores Desplegables */}
        <div className="flex gap-2 w-full md:w-auto relative">
          {/* Tipo de Operación */}
          <div className="relative flex-1 md:flex-none">
            <button 
              onClick={() => { setShowTypeDropdown(!showTypeDropdown); setShowCurrencyDropdown(false); }}
              className="w-full flex items-center justify-between gap-4 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span>{typeFilter === 'Todos' ? 'Todas las operaciones' : typeFilter}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            {showTypeDropdown && (
              <div className="absolute right-0 mt-1.5 w-48 bg-white border border-gray-100 rounded-xl p-1.5 shadow-xl z-20">
                {['Todos', 'ENVIADO', 'RECIBIDO', 'SWAP', 'DEPOSITO'].map((type) => (
                  <button
                    key={type}
                    onClick={() => { setTypeFilter(type); setShowTypeDropdown(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                  >
                    {type === 'Todos' ? 'Todas las operaciones' : type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Moneda */}
          <div className="relative flex-1 md:flex-none">
            <button 
              onClick={() => { setShowCurrencyDropdown(!showCurrencyDropdown); setShowTypeDropdown(false); }}
              className="w-full flex items-center justify-between gap-4 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span>{currencyFilter === 'Todas' ? 'Moneda' : currencyFilter}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            {showCurrencyDropdown && (
              <div className="absolute right-0 mt-1.5 w-36 bg-white border border-gray-100 rounded-xl p-1.5 shadow-xl z-20">
                {['Todas', 'USD', 'EUR', 'ARS', 'COP'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => { setCurrencyFilter(curr); setShowCurrencyDropdown(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                  >
                    {curr === 'Todas' ? 'Todas' : curr}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LISTADO AGRUPADO POR MESES */}
      <div className="space-y-8">
        {(['JUNIO 2026', 'MAYO 2026'] as const).map((mes) => {
          const txsDelMes = filteredTransactions.filter(t => t.monthGroup === mes);
          if (txsDelMes.length === 0) return null;

          return (
            <div key={mes} className="animate-fadeIn">
              <h2 className="text-xs font-bold text-gray-400 tracking-wider mb-4 uppercase">{mes}</h2>
              <div className="space-y-3">
                {txsDelMes.map((tx) => {
                  const isEnviado = tx.type === 'ENVIADO';
                  const isRecibido = tx.type === 'RECIBIDO';
                  const isSwap = tx.type === 'SWAP';
                  const isDeposito = tx.type === 'DEPOSITO';

                  return (
                    <div 
                      key={tx.id}
                      className="bg-white border border-gray-100 hover:border-purple-200 p-4 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_6px_20px_rgba(109,40,217,0.04)] transition-all duration-300 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        {/* Icono Circular de la Transacción */}
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                          isEnviado ? 'bg-red-50 text-red-500' :
                          isRecibido ? 'bg-emerald-50 text-emerald-500' :
                          isSwap ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-500'
                        }`}>
                          {isEnviado && <ArrowUpRight size={18} />}
                          {isRecibido && <ArrowDownLeft size={18} />}
                          {isSwap && <RefreshCw size={16} />}
                          {isDeposito && <Plus size={18} />}
                        </div>

                        {/* Textos informativos */}
                        <div>
                          <h3 className="text-sm font-bold text-gray-800 transition-colors group-hover:text-purple-950">{tx.title}</h3>
                          <p className="text-xs text-gray-400 font-medium mt-0.5">
                            {tx.time} {tx.description && `· ${tx.description}`}
                          </p>
                        </div>
                      </div>

                      {/* Montos y Badge de Estado */}
                      <div className="text-right flex items-center gap-6">
                        <div>
                          <p className={`text-sm font-extrabold tracking-tight ${
                            isEnviado ? 'text-gray-900' :
                            isRecibido ? 'text-emerald-600' :
                            isSwap ? 'text-purple-700' : 'text-emerald-600'
                          }`}>
                            {isSwap ? (tx.displayAmount) : tx.amount}
                          </p>
                        </div>

                        {/* Badge */}
                        <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold tracking-wide transition-colors ${
                          tx.status === 'Completado' 
                            ? 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100/60' 
                            : 'bg-amber-50 text-amber-700 group-hover:bg-amber-100/60'
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Estado Vacío (Fallback) */}
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-3xl">
            <FileText className="mx-auto text-gray-300 mb-3" size={32} />
            <p className="text-sm font-semibold text-gray-500">No se encontraron movimientos con los filtros aplicados.</p>
          </div>
        )}
      </div>
    </div>
  )
}