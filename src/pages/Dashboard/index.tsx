import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { ROUTES } from "../../constants/routes";
import Movimientos from "../Movimientos";
import { walletService } from "../../services/wallet.service";
import { styles } from "./dashboardEstilos";
// Tu importación personalizada de notificaciones
import { NotificacionesComponent } from "../Notificaciones/notificaciones";

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
        const balanceRes = await walletService.getBalance(currency);

        // El backend devuelve el saldo total ya convertido en el primer elemento
        const userBalance = balanceRes[0]?.balance || 0;

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
  }, [user, currency]);

  // Leemos datos reales de la sesión
  const userName = user?.name || user?.nombre || "Usuario";
  const userRealSaldo = balance !== undefined ? balance : 0;

  // Tasas de conversión locales únicamente para metas y ahorros locales
  const conversionRates = {
    USD: { USD: 1, EUR: 0.92, ARS: 900, COP: 3800 },
    EUR: { USD: 1.08, EUR: 1, ARS: 980, COP: 4100 },
    ARS: { USD: 0.0011, EUR: 0.001, ARS: 1, COP: 4.2 },
    COP: { USD: 0.00026, EUR: 0.00024, ARS: 0.24, COP: 1 },
  };

  const convertFromTo = (amount: number, from: string, to: string) => {
    if (from === to) return amount;
    const rate = (conversionRates[from as keyof typeof conversionRates] as any)?.[to] || 1;
    return amount * rate;
  };

  // Si user?.saldoAhorrado está definido, está en la moneda de usuario (userCurrency). Lo convertimos.
  // Si no, usamos userRealSaldo * 0.2 (que ya está convertido en la divisa actual).
  const userRealSavings =
    user?.saldoAhorrado !== undefined
      ? convertFromTo(user.saldoAhorrado, userCurrency, currency)
      : userRealSaldo * 0.2;

  // La meta de ahorro está en la moneda del usuario (userCurrency). La convertimos.
  const savingsGoal = user?.metaAhorro !== undefined 
    ? convertFromTo(user.metaAhorro, userCurrency, currency) 
    : convertFromTo(10000, userCurrency, currency);

  // Mapeo de símbolos de moneda
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    ARS: "$",
    COP: "$",
  };

  const currentSymbol = currencySymbols[currency] || "$";

  // Formatea el balance devuelto. Los valores ya vienen convertidos desde el backend o procesados localmente.
  const getDisplayBalance = (amount: number) => {
    return amount.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Manejo de estados de carga
  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  // Manejo de estados de error
  if (error) {
    return (
      <div className={styles.errorWrapper}>
        <div className={styles.errorCard}>
          <svg className={styles.errorSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className={styles.errorTitle}>Error al cargar datos</span>
          <p className={styles.errorMessage}>{error}</p>
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
    <div className={styles.container}>
      
      {/* Banner de Bienvenida superior con el nuevo Gradiente Oscuro */}
      <div className={styles.bannerHeader} style={styles.bannerHeaderBg}>
        <div>
          <p className={styles.welcomeSub}>
            Bienvenido de nuevo,
          </p>
          <h1 className={styles.welcomeTitle}>
            {userName}
          </h1>
        </div>

        {/* Acciones del Header: Campana Inteligente y Ayuda */}
        <div className={styles.headerActions}>
          
          {/* REEMPLAZADO: Tu nuevo componente dinámico de notificaciones con estilos separados */}
          <NotificacionesComponent />

          {/* Botón de Ayuda (Se mantiene estático) */}
          <button className={styles.actionButton}>
            <svg className={styles.actionSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid de Balances superpuesto */}
      <div className={styles.balancesGrid}>
        
        {/* Saldo Disponible */}
        <div className={styles.balanceCard}>
          <div>
            <div className={styles.balanceHeaderRow}>
              <div className="flex items-center gap-2">
                <div className={styles.iconContainerPurple}>
                  <svg className={styles.iconPurple} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <span className={styles.balanceLabel}>
                  Saldo Disponible
                </span>
              </div>

              {/* Botón Ocultar/Mostrar con el Ojo */}
              <button onClick={() => setIsBalanceHidden(!isBalanceHidden)} className={styles.toggleVisibilityBtn}>
                {isBalanceHidden ? (
                  <svg className={styles.toggleVisibilitySvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className={styles.toggleVisibilitySvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Valor monetario */}
            <div className={styles.balanceValueWrapper}>
              <span className={styles.currencySymbol}>
                {currentSymbol}
              </span>
              <span className={styles.balanceValue}>
                {isBalanceHidden ? "••••••" : getDisplayBalance(userRealSaldo)}
              </span>
            </div>
          </div>

          {/* Selector de divisa */}
          <div className={styles.currencySelectorWrapper}>
            <button onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)} className={styles.currencySelectorBtn}>
              <span>
                {currency === "USD" ? "🇺🇸" : currency === "EUR" ? "🇪🇺" : currency === "ARS" ? "🇦🇷" : "🇨🇴"}{" "}
                {currency}
              </span>
              <svg className={styles.currencySelectorChevron(showCurrencyDropdown)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showCurrencyDropdown && (
              <>
                <div className={styles.dropdownOverlay} onClick={() => setShowCurrencyDropdown(false)}></div>
                <div className={styles.dropdownMenu}>
                  {(["USD", "EUR", "ARS", "COP"] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setShowCurrencyDropdown(false);
                      }}
                      className={styles.dropdownOptionBtn(currency === c)}
                    >
                      {c === "USD" ? "🇺🇸" : c === "EUR" ? "🇪🇺" : c === "ARS" ? "🇦🇷" : "🇨🇴"}{" "}
                      {c}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Saldo Ahorrado */}
        <div className={styles.balanceCard}>
          <div>
            <div className={styles.balanceHeaderRowGap}>
              <div className={styles.iconContainerEmerald}>
                <svg className={styles.iconEmerald} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className={styles.balanceLabel}>
                Saldo Ahorrado
              </span>
            </div>

            <div className={styles.balanceValueWrapper}>
              <span className={styles.currencySymbol}>
                {currentSymbol}
              </span>
              <span className={styles.balanceValue}>
                {isBalanceHidden ? "••••••" : getDisplayBalance(userRealSavings)}
              </span>
            </div>
          </div>

          <div className={styles.currencySelectorWrapper}>
            <p className={styles.goalText}>
              Meta: {currentSymbol} {getDisplayBalance(savingsGoal)}
            </p>
            {/* Barra de progreso de la meta */}
            <div className={styles.progressBarTrack}>
              <div className={styles.progressBarThumb} style={{ width: `${savingsPercentage}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Acciones Rápidas */}
      <div className={styles.sectionWrapper}>
        <h2 className={styles.sectionTitle}>
          Acciones Rápidas
        </h2>
        <div className={styles.actionsGrid}>
          {[
            { name: "Enviar", path: ROUTES.TRANSFER, bg: "bg-purple-50", iconColor: "text-purple-600", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg> },
            { name: "Depositar", path: ROUTES.DEPOSIT, bg: "bg-emerald-50", iconColor: "text-emerald-600", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg> },
            { name: "Tasas de Cambio", path: ROUTES.EXCHANGE, bg: "bg-orange-50", iconColor: "text-orange-600", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg> },
            { name: "Ahorros", path: ROUTES.SAVINGS, bg: "bg-blue-50", iconColor: "text-blue-600", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
          ].map((act) => (
            <Link key={act.name} to={act.path} className={styles.actionLinkCard}>
              <div className={styles.actionLinkIconWrapper(act.bg, act.iconColor)}>
                {act.icon}
              </div>
              <span className={styles.actionLinkLabel}>
                {act.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Sección Últimos Movimientos */}
      <div className={styles.sectionWrapper}>
        <div className={styles.movementsHeaderRow}>
          <h2 className={styles.sectionTitle}>
            Últimos Movimientos
          </h2>
          <Link to={ROUTES.HISTORY} className={styles.viewAllLink}>
            Ver todos
          </Link>
        </div>
        <Movimientos isCompact={true} limit={3} />
      </div>
    </div>
  );
}

export default Dashboard;