import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/auth.store";
import { walletService, WalletBalance } from "../../services/wallet.service";

export default function Perfil() {
  const { user } = useAuthStore();
  const [balances, setBalances] = useState<WalletBalance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const walletBalances = await walletService.getBalance();
        setBalances(walletBalances);
        setError(null);
      } catch (err) {
        setError("Error al cargar las cuentas del perfil");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const userName = user?.name || user?.nombre || "Usuario";
  const userLastName = user?.lastName || user?.apellido || "";
  const userEmail = user?.email || "usuario@fastmoney.com";
  const preferredCurrency = (user?.moneda || "USD").toUpperCase();
  const userInitial = userName.charAt(0).toUpperCase();
  const codigoCuenta = user?.codigoCuenta || "sin-código";

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
          <span className="font-bold text-lg">Error al cargar perfil</span>
          <p className="text-sm text-center text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 max-w-[1000px] mx-auto animate-fadeIn">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Mi Perfil</h1>
        <p className="text-gray-500 mt-1">Administrá la configuración de tu cuenta y consultá tus números de cuenta.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Tarjeta de Información Personal */}
        <div className="md:col-span-1 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-3xl flex items-center justify-center shadow-md mb-4">
            {userInitial}
          </div>
          <h2 className="text-xl font-bold text-gray-800">{userName} {userLastName}</h2>
          <p className="text-sm text-gray-400 font-medium mt-1">{userEmail}</p>

          <div className="w-full border-t border-gray-100 my-6"></div>

          <div className="w-full text-left space-y-4">
            <div>
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Divisa Preferida</span>
              <span className="text-sm font-bold text-gray-700 mt-1 block">
                {preferredCurrency === "USD" ? "🇺🇸 USD (Dólar)" :
                 preferredCurrency === "EUR" ? "🇪🇺 EUR (Euro)" :
                 preferredCurrency === "COP" ? "🇨🇴 COP (Peso Colombiano)" :
                 "🇦🇷 ARS (Peso Argentino)"}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Estado de la cuenta</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 mt-1">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-ping"></span>
                Verificado
              </span>
            </div>
          </div>
        </div>

        {/* Listado de Cuentas / Billeteras Multimoneda */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Cuentas Multimoneda</h3>
            
            {balances.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">
                No hay cuentas asociadas disponibles.
              </div>
            ) : (
              <div className="space-y-4">
                {balances.map((wallet) => {
                  const isCopied = copiedId === wallet.id;
                  const curr = wallet.currency.toUpperCase();
                  const symbol = curr === "USD" || curr === "ARS" || curr === "COP" ? "$" : curr === "EUR" ? "€" : "$";

                  return (
                    <div
                      key={wallet.id}
                      className="border border-gray-100 hover:border-purple-200 p-5 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.01)] transition-all duration-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-gray-50/30"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-extrabold text-gray-800">
                            {curr === "USD" ? "🇺🇸 Cuenta Dólar" :
                             curr === "EUR" ? "🇪🇺 Cuenta Euro" :
                             curr === "COP" ? "🇨🇴 Cuenta Peso COP" :
                             "🇦🇷 Cuenta Peso ARS"}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-md">
                            {curr}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold">
                          <span>N°: {codigoCuenta}</span>
                          <button
                            onClick={() => handleCopy(codigoCuenta)}
                            className="text-purple-600 hover:text-purple-700 hover:underline flex items-center gap-1 cursor-pointer active:scale-95"
                          >
                            {isCopied ? "¡Copiado!" : "Copiar"}
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Saldo Disponible</span>
                        <span className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5 block">
                          {symbol} {wallet.balance.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
