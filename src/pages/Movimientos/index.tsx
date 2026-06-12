import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { ROUTES } from "../../constants/routes";
import {
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  FileText,
  Download,
  Search,
  ChevronDown,
  Plus,
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { transferenciaService } from "../../services/transactions.service";
import { styles } from "./movimientosEstilos";


// --- Tipados e Interfaces ---
interface Transaction {
  id: string | number;
  type: "ENVIADO" | "RECIBIDO" | "SWAP" | "DEPOSITO";
  title: string;
  description?: string;
  time: string;
  amount: string;
  displayAmount?: string; // Para swaps detallados
  status: "Completado" | "Pendiente";
  monthGroup?: string;
  currency: string;
}

interface MovimientosProps {
  isCompact?: boolean;
  limit?: number;
}

// --- Datos Simulados para el Gráfico Sparkline ---
const chartData = [
  { value: 20 },
  { value: 45 },
  { value: 28 },
  { value: 60 },
  { value: 35 },
  { value: 75 },
  { value: 50 },
];

export default function Movimientos({
  isCompact = false,
  limit,
}: MovimientosProps) {
  const { user } = useAuthStore();

  // --- Estados de Filtros ---
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("Todos");
  const [currencyFilter, setCurrencyFilter] = useState<string>("Todas");

  // Dropdowns visuales
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  // Estados para manejo de datos reales
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await transferenciaService.getTransactionHistory();
        setTransactions(data);
        setError(null);
      } catch (err) {
        setError("Error al cargar los movimientos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Mostrar estado de carga o error
  if (loading) {
    if (isCompact) {
      return (
        <div className={styles.loadingCompactWrapper}>
          <div className={styles.loadingCompactSpinner}></div>
        </div>
      );
    }
    return (
      <div className={styles.loadingScreenWrapper}>
        <div className={styles.loadingScreenSpinner}></div>
      </div>
    );
  }

  if (error) {
    if (isCompact) {
      return (
        <div className={styles.errorCompact}>
          {error}
        </div>
      );
    }
    return (
      <div className={styles.errorScreenWrapper}>
        <div className={styles.errorScreenCard}>
          <svg
            className={styles.errorScreenSvg}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className={styles.errorScreenTitle}>Error al cargar movimientos</span>
          <p className={styles.errorScreenMessage}>{error}</p>
        </div>
      </div>
    );
  }

  // --- Helper para agrupar por mes ---
  const getMonthGroup = (timeStr: string): string => {
    if (!timeStr) return "OTRO";
    const date = new Date(timeStr);
    if (isNaN(date.getTime())) {
      return timeStr.toUpperCase();
    }
    const months = [
      "ENERO",
      "FEBRERO",
      "MARZO",
      "ABRIL",
      "MAYO",
      "JUNIO",
      "JULIO",
      "AGOSTO",
      "SEPTIEMBRE",
      "OCTUBRE",
      "NOVIEMBRE",
      "DICIEMBRE",
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // --- Listado Base de Transacciones ordenadas por fecha ---
  const allTransactions: Transaction[] = [...transactions].sort((a, b) => {
    const timeA = new Date(a.time).getTime();
    const timeB = new Date(b.time).getTime();
    if (isNaN(timeA) || isNaN(timeB)) return 0;
    return timeB - timeA;
  });

  // --- Lógica de Filtrado ---
  const filteredTransactions = allTransactions.filter((tx) => {
    const matchesSearch =
      tx.title.toLowerCase().includes(search.toLowerCase()) ||
      (tx.description &&
        tx.description.toLowerCase().includes(search.toLowerCase()));

    const matchesType = typeFilter === "Todos" || tx.type === typeFilter;
    const matchesCurrency =
      currencyFilter === "Todas" || tx.currency === currencyFilter;

    return matchesSearch && matchesType && matchesCurrency;
  });

  const limitedTxs = limit
    ? filteredTransactions.slice(0, limit)
    : filteredTransactions;

  return (
    <div className={styles.container(isCompact)}>
      {/* HEADER SUPERIOR */}
      {!isCompact && (
        <div className={styles.headerWrapper}>
          <div>
            <h1 className={styles.headerTitle}>
              Movimientos
            </h1>
            <p className={styles.headerSubtitle}>
              Consulta el historial de todas tus transacciones.
            </p>
          </div>

          <div className={styles.headerActions}>
            {/* Gráfico Sparkline de Actividad de 7 días */}
            <div className={styles.activityContainer}>
              <span className={styles.activityLabel}>
                Actividad 7 días
              </span>
              <div className={styles.sparklineWrapper}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient
                        id="purpleGlow"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#6D28D9"
                          stopOpacity={0.15}
                        />
                        <stop
                          offset="95%"
                          stopColor="#6D28D9"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#6D28D9"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#purpleGlow)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Botón Exportar */}
            <button className={styles.exportButton}>
              <Download size={16} />
              Exportar
            </button>
          </div>
        </div>
      )}
      {/* METRICAS / ESTADÍSTICAS GRID */}
      {!isCompact && (
        <div className={styles.metricsGrid}>
          {/* Total Enviado */}
          <div className={styles.metricCard}>
            <div className={styles.metricTextBlock}>
              <span className={styles.metricLabel}>
                Total Enviado
              </span>
              <h3 className={styles.metricValueRed}>
                -$1,250.00
              </h3>
            </div>
            <div className={styles.metricIconRed}>
              <ArrowUpRight size={20} />
            </div>
          </div>

          {/* Total Recibido */}
          <div className={styles.metricCard}>
            <div className={styles.metricTextBlock}>
              <span className={styles.metricLabel}>
                Total Recibido
              </span>
              <h3 className={styles.metricValueEmerald}>
                +$3,800.00
              </h3>
            </div>
            <div className={styles.metricIconEmerald}>
              <ArrowDownLeft size={20} />
            </div>
          </div>

          {/* Total Convertido */}
          <div className={styles.metricCard}>
            <div className={styles.metricTextBlock}>
              <span className={styles.metricLabel}>
                Total Convertido
              </span>
              <h3 className={styles.metricValuePurple}>
                $950.00
              </h3>
            </div>
            <div className={styles.metricIconPurple}>
              <RefreshCw size={20} />
            </div>
          </div>

          {/* Operaciones */}
          <div className={styles.metricCard}>
            <div className={styles.metricTextBlock}>
              <span className={styles.metricLabel}>
                Operaciones
              </span>
              <h3 className={styles.metricValueBlack}>
                12
              </h3>
            </div>
            <div className={styles.metricIconGray}>
              <FileText size={20} />
            </div>
          </div>
        </div>
      )}

      {/* FILTROS Y BUSCADOR */}
      {!isCompact && (
        <div className={styles.filtersBar}>
          {/* Barra de Búsqueda Grande */}
          <div className={styles.searchWrapper}>
            <Search
              className={styles.searchIcon}
              size={18}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por usuario, correo o referencia..."
              className={styles.searchInput}
            />
          </div>

          {/* Selectores Desplegables */}
          <div className={styles.dropdownsWrapper}>
            {/* Tipo de Operación */}
            <div className={styles.dropdownWrapper}>
              <button
                onClick={() => {
                  setShowTypeDropdown(!showTypeDropdown);
                  setShowCurrencyDropdown(false);
                }}
                className={styles.dropdownToggleBtn}
              >
                <span>
                  {typeFilter === "Todos"
                    ? "Todas las operaciones"
                    : typeFilter}
                </span>
                <ChevronDown size={16} className={styles.dropdownToggleChevron} />
              </button>
              {showTypeDropdown && (
                <div className={styles.dropdownMenuType}>
                  {["Todos", "ENVIADO", "RECIBIDO", "SWAP", "DEPOSITO"].map(
                    (type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setTypeFilter(type);
                          setShowTypeDropdown(false);
                        }}
                        className={styles.dropdownOptionBtn}
                      >
                        {type === "Todos" ? "Todas las operaciones" : type}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Moneda */}
            <div className={styles.dropdownWrapper}>
              <button
                onClick={() => {
                  setShowCurrencyDropdown(!showCurrencyDropdown);
                  setShowTypeDropdown(false);
                }}
                className={styles.dropdownToggleBtn}
              >
                <span>
                  {currencyFilter === "Todas" ? "Moneda" : currencyFilter}
                </span>
                <ChevronDown size={16} className={styles.dropdownToggleChevron} />
              </button>
              {showCurrencyDropdown && (
                <div className={styles.dropdownMenuCurrency}>
                  {["Todas", "USD", "EUR", "ARS", "COP"].map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrencyFilter(curr);
                        setShowCurrencyDropdown(false);
                      }}
                      className={styles.dropdownOptionBtn}
                    >
                      {curr === "Todas" ? "Todas" : curr}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LISTADO AGRUPADO POR MESES */}
      <div className={styles.monthlyGroupsList}>
        {Array.from(
          new Set(limitedTxs.map((t) => t.monthGroup || getMonthGroup(t.time)))
        ).map((mes) => {
          const txsDelMes = limitedTxs.filter(
            (t) => (t.monthGroup || getMonthGroup(t.time)) === mes
          );
          if (txsDelMes.length === 0) return null;

          return (
            <div key={mes} className={styles.monthAnimation}>
              <h2 className={styles.monthTitle}>
                {mes}
              </h2>
              <div className={styles.monthTransactionsList}>
                {txsDelMes.map((tx) => {
                  const isEnviado = tx.type === "ENVIADO";
                  const isRecibido = tx.type === "RECIBIDO";
                  const isSwap = tx.type === "SWAP";
                  const isDeposito = tx.type === "DEPOSITO";

                  return (
                    <div
                      key={tx.id}
                      className={styles.transactionItem}
                    >
                      <div className={styles.transactionItemLeft}>
                        {/* Icono Circular de la Transacción */}
                        <div
                          className={styles.transactionIconWrapper(tx.type)}
                        >
                          {isEnviado && <ArrowUpRight size={18} />}
                          {isRecibido && <ArrowDownLeft size={18} />}
                          {isSwap && <RefreshCw size={16} />}
                          {isDeposito && <Plus size={18} />}
                        </div>

                        {/* Textos informativos */}
                        <div>
                          <h3 className={styles.transactionTitle}>
                            {tx.title}
                          </h3>
                          <p className={styles.transactionTime}>
                            {tx.time} {tx.description && `· ${tx.description}`}
                          </p>
                        </div>
                      </div>

                      {/* Montos y Badge de Estado */}
                      <div className={styles.transactionItemRight}>
                        <div>
                          <p
                            className={styles.transactionAmount(tx.type)}
                          >
                            {isSwap ? tx.displayAmount : tx.amount}
                          </p>
                        </div>

                        {/* Badge */}
                        <span
                          className={styles.statusBadge(tx.status)}
                        >
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
      </div>

      {/* Estado Vacío (Fallback) */}
      {filteredTransactions.length === 0 && (
        <div className={styles.emptyStateWrapper}>
          <FileText className={styles.emptyStateIcon} size={32} />
          <p className={styles.emptyStateText}>
            No se encontraron movimientos con los filtros aplicados.
          </p>
        </div>
      )}
    </div>
  );
}
