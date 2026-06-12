import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/auth.store";
import { walletService, WalletBalance } from "../../services/wallet.service";
import { styles } from "./perfilEstilos";


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
      <div className={styles.loadingWrapper}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorWrapper}>
        <div className={styles.errorCard}>
          <svg className={styles.errorSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className={styles.errorTitle}>Error al cargar perfil</span>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className="max-w-[1000px] mx-auto">
        {/* Encabezado */}
        <div className={styles.headerWrapper}>
          <h1 className={styles.headerTitle}>Mi Perfil</h1>
          <p className={styles.headerSubtitle}>Administrá la configuración de tu cuenta y consultá tus números de cuenta.</p>
        </div>

        <div className={styles.gridContainer}>
          {/* Tarjeta de Información Personal */}
          <div className={styles.infoCard}>
            <div className={styles.avatarCircle}>
              {userInitial}
            </div>
            <h2 className={styles.profileName}>{userName} {userLastName}</h2>
            <p className={styles.profileEmail}>{userEmail}</p>

            <div className={styles.divider}></div>

            <div className={styles.detailsList}>
              <div>
                <span className={styles.detailLabel}>Divisa Preferida</span>
                <span className={styles.detailValue}>
                  {preferredCurrency === "USD" ? "🇺🇸 USD (Dólar)" :
                   preferredCurrency === "EUR" ? "🇪🇺 EUR (Euro)" :
                   preferredCurrency === "COP" ? "🇨🇴 COP (Peso Colombiano)" :
                   "🇦🇷 ARS (Peso Argentino)"}
                </span>
              </div>
              <div>
                <span className={styles.detailLabel}>Estado de la cuenta</span>
                <span className={styles.verifiedBadge}>
                  <span className={styles.verifiedDot}></span>
                  Verificado
                </span>
              </div>
            </div>
          </div>

          {/* Listado de Cuentas / Billeteras Multimoneda */}
          <div className={styles.accountsWrapper}>
            <div className={styles.accountsCard}>
              <h3 className={styles.accountsTitle}>Cuentas Multimoneda</h3>
              
              {balances.length === 0 ? (
                <div className={styles.emptyState}>
                  No hay cuentas asociadas disponibles.
                </div>
              ) : (
                <div className={styles.accountsListStack}>
                  {balances.map((wallet) => {
                    const isCopied = copiedId === wallet.id;
                    const curr = wallet.currency.toUpperCase();
                    const symbol = curr === "USD" || curr === "ARS" || curr === "COP" ? "$" : curr === "EUR" ? "€" : "$";

                    return (
                      <div
                        key={wallet.id}
                        className={styles.accountItemCard}
                      >
                        <div className={styles.accountInfo}>
                          <div className={styles.accountCurrencyRow}>
                            <span className={styles.accountCurrencyLabel}>
                              {curr === "USD" ? "🇺🇸 Cuenta Dólar" :
                               curr === "EUR" ? "🇪🇺 Cuenta Euro" :
                               curr === "COP" ? "🇨🇴 Cuenta Peso COP" :
                               "🇦🇷 Cuenta Peso ARS"}
                            </span>
                            <span className={styles.currencyBadge}>
                              {curr}
                            </span>
                          </div>
                          <div className={styles.accountMetadataRow}>
                            <span>N°: {codigoCuenta}</span>
                            <button
                              onClick={() => handleCopy(codigoCuenta)}
                              className={styles.copyBtn}
                            >
                              {isCopied ? "¡Copiado!" : "Copiar"}
                            </button>
                          </div>
                        </div>

                        <div className={styles.balanceBlock}>
                          <span className={styles.balanceLabel}>Saldo Disponible</span>
                          <span className={styles.balanceValue}>
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
    </div>
  );
}
