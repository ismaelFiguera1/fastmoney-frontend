import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { ROUTES } from "../../constants/routes";
import Movimientos from "../Movimientos";
import { walletService } from "../../services/wallet.service";
import { useEffect } from "react";

function Dashboard() {
  const { user } = useAuthStore();

  // Obtenemos la moneda del usuario real o USD por defecto
  const userCurrency = (user?.moneda || "USD").toUpperCase() as
    | "USD"
    | "EUR"
    | "ARS"
    | "COP";

  const [currency, setCurrency] = useState<"USD" | "EUR" | "ARS" | "COP">(
    userCurrency,
  );
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const balanceRes = await walletService.getBalance();

        // Procesar el balance según la moneda del usuario (case-insensitive)
        const userBalance =
          balanceRes.find(
            (b) => b.currency.toUpperCase() === (user?.moneda || "USD").toUpperCase()
          )?.balance || 0;

        setBalance(userBalance);
        setError(null);
      } catch (err) {
        setError("Error al cargar los datos del balance");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  // Leemos datos reales de la sesión
  const userName = user?.name || user?.nombre || "Usuario";
  const userRealSaldo = balance !== undefined ? balance : 0;
  const userRealSavings =
    user?.saldoAhorrado !== undefined
      ? user?.saldoAhorrado
      : userRealSaldo * 0.2;
  const savingsGoal = user?.metaAhorro !== undefined ? user?.metaAhorro : 10000;

  // Mapeo de símbolos de moneda
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    ARS: "$",
    COP: "$",
  };

  const currentSymbol = currencySymbols[currency] || "$";

  // Conversión simulada en caso de que el usuario elija otra divisa distinta a la de su cuenta en el selector visual
  const getDisplayBalance = (baseAmount: number) => {
    if (currency === userCurrency) {
      return baseAmount.toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    // Tasas de conversión base
    const conversionRates = {
      USD: { EUR: 0.92, ARS: 900, COP: 3800 },
      EUR: { USD: 1.08, ARS: 980, COP: 4100 },
      ARS: { USD: 0.0011, EUR: 0.001, COP: 4.2 },
      COP: { USD: 0.00026, EUR: 0.00024, ARS: 0.24 },
    };
    const rate = (conversionRates[userCurrency] as any)?.[currency] || 1;
    return (baseAmount * rate).toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Manejo de estados de carga y error
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl shadow-sm max-w-lg mx-auto mt-12 flex flex-col items-center gap-3">
          <svg className="w-12 h-12 text-red-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="font-bold text-lg">Error al cargar datos</span>
          <p className="text-sm text-center text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // Porcentaje de ahorro respecto a la meta
  const savingsPercentage = Math.min(
    Math.round((userRealSavings / savingsGoal) * 100),
    100,
  );

  return (
    <div className="min-h-full pb-12">
      {/* Banner de Bienvenida superior violeta */}
      <div
        className="pt-12 pb-24 px-8 relative text-white flex justify-between items-start"
        style={{
          background:
            "linear-gradient(135deg, #7c3aed 0%, #9333ea 60%, #a855f7 100%)",
        }}
      >
        <div>
          <p className="text-purple-100 text-sm font-medium">
            Bienvenido de nuevo,
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1 flex items-center gap-2">
            {userName} <span className="animate-bounce">👋</span>
          </h1>
        </div>

        {/* Campana de notificaciones y ayuda */}
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center cursor-pointer border border-white/5">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <button className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center cursor-pointer border border-white/5">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid de Balances superpuesto */}
      <div className="px-8 -mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* Saldo Disponible */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100/50 flex flex-col justify-between min-h-[160px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Saldo Disponible
                </span>
              </div>

              {/* Botón Ocultar/Mostrar con el Ojo */}
              <button
                onClick={() => setIsBalanceHidden(!isBalanceHidden)}
                className="w-8 h-8 rounded-full hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all cursor-pointer"
              >
                {isBalanceHidden ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Valor monetario */}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900">
                {currentSymbol}
              </span>
              <span className="text-4xl font-extrabold text-gray-900 tracking-tight transition-all duration-300">
                {isBalanceHidden ? "••••••" : getDisplayBalance(userRealSaldo)}
              </span>
            </div>
          </div>
          //
          {/* Selector de divisa */}
          <div className="mt-4 relative self-start">
            <button
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              <span>
                {currency === "USD"
                  ? "🇺🇸"
                  : currency === "EUR"
                    ? "🇪🇺"
                    : currency === "ARS"
                      ? "🇦🇷"
                      : "🇨🇴"}{" "}
                {currency}
              </span>
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${showCurrencyDropdown ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showCurrencyDropdown && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setShowCurrencyDropdown(false)}
                ></div>
                <div className="absolute left-0 mt-1 bg-white border border-gray-100 rounded-xl p-1.5 shadow-lg w-28 z-30">
                  {(["USD", "EUR", "ARS", "COP"] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setShowCurrencyDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        currency === c
                          ? "bg-purple-50 text-purple-700"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {c === "USD"
                        ? "🇺🇸"
                        : c === "EUR"
                          ? "🇪🇺"
                          : c === "ARS"
                            ? "🇦🇷"
                            : "🇨🇴"}{" "}
                      {c}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Saldo Ahorrado */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100/50 flex flex-col justify-between min-h-[160px]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">
                Saldo Ahorrado
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900">
                {currentSymbol}
              </span>
              <span className="text-4xl font-extrabold text-gray-900 tracking-tight transition-all duration-300">
                {isBalanceHidden
                  ? "••••••"
                  : getDisplayBalance(userRealSavings)}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-400">
              Meta: {currentSymbol}
              {getDisplayBalance(savingsGoal)}
            </p>
            {/* Barra de progreso de la meta */}
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
              <div
                className="bg-purple-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${savingsPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Acciones Rápidas */}
      <div className="px-8 mt-10">
        <h2 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              name: "Enviar",
              path: ROUTES.TRANSFER,
              bg: "bg-purple-50",
              iconColor: "text-purple-600",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              ),
            },
            {
              name: "Depositar",
              path: ROUTES.DEPOSIT,
              bg: "bg-emerald-50",
              iconColor: "text-emerald-600",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              ),
            },
            {
              name: "Cambiar",
              path: ROUTES.EXCHANGE,
              bg: "bg-orange-50",
              iconColor: "text-orange-600",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              ),
            },
            {
              name: "Ahorros",
              path: ROUTES.SAVINGS,
              bg: "bg-blue-50",
              iconColor: "text-blue-600",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
            },
          ].map((act) => (
            <Link
              key={act.name}
              to={act.path}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 transition-all hover:-translate-y-1 hover:shadow-md active:scale-95 text-center group cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-full ${act.bg} ${act.iconColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
              >
                {act.icon}
              </div>
              <span className="text-xs font-bold text-gray-700">
                {act.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Sección Últimos Movimientos */}
      <div className="px-8 mt-10">
        <div className="mb-4">
          <h2 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-4">
            Últimos Movimientos
          </h2>
          <Link
            to={ROUTES.HISTORY}
            className="text-xs font-extrabold text-purple-600 hover:text-purple-700 hover:underline"
          >
            Ver todos
          </Link>
        </div>
        <Movimientos isCompact={true} limit={3} />
      </div>
    </div>
  );
}

export default Dashboard;
