import React, { useState } from "react";
import { styles } from "./transferenciasEstilos";
import { transferenciaService } from "../../services/transactions.service";

interface Notificacion {
  id: number;
  tipo: "DEPOSITO" | "TRANSFERENCIA";
  titulo: string;
  mensaje: string;
  nombre: string;
  monto: number;
  moneda: string;
  createdAt: string;
}

function Transferencias() {
  const [step, setStep] = useState<"form" | "confirm">("form");
  const [codigoCuenta, setCodigoCuenta] = useState("");
  const [monto, setMonto] = useState("");
  const [moneda, setMoneda] = useState<"USD" | "EUR" | "ARS" | "COP">("USD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nombreDestinatario, setNombreDestinatario] = useState("");

  return (
    <div className={styles.container} style={styles.background}>
      {step === "confirm" ? (
        <div className={styles.cardCenter} style={styles.cardBg}>
          <div className={styles.checkCircle}>
            <svg
              className={styles.checkIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className={styles.confirmTitulo}>¡Enviado con éxito!</h2>
          <p className={styles.confirmSubtitulo}>Tu dinero ya va en camino</p>

          <div className={styles.destinatarioBox}>
            <p className={styles.destinatarioLabel}>Destinatario</p>
            {/* ✅ Ahora muestra el nombre real */}
            <p className={styles.destinatarioNombre}>{nombreDestinatario}</p>
          </div>

          <div className={styles.montoBox}>
            <p className={styles.montoLabel}>Monto enviado</p>
            <p className={styles.montoValor}>
              ${monto} <span className={styles.montoMoneda}>{moneda}</span>
            </p>
          </div>

          <button
            onClick={() => {
              setStep("form");
              setCodigoCuenta("");
              setMonto("");
              setNombreDestinatario("");
            }}
            className={styles.btnNueva}
          >
            Nueva transferencia
          </button>
        </div>
      ) : (
        <div className={styles.card} style={styles.cardBg}>
          <h1 className={styles.formTitulo}>Enviar dinero</h1>
          <p className={styles.formSubtitulo}>
            Transfiere de forma inmediata y sin comisiones.
          </p>

          <div className={styles.inputWrapper}>
            <label className={styles.label}>Codigo del Destinatario</label>
            <input
              type="text"
              value={codigoCuenta}
              onChange={(e) => setCodigoCuenta(e.target.value)}
              placeholder="Codigo del destinatario"
              className={styles.input}
            />
          </div>

          <div className={styles.montoWrapper}>
            <label className={styles.label}>Monto a enviar</label>
            <div className={styles.montoRow}>
              <select
                value={moneda}
                onChange={(e) => setMoneda(e.target.value as any)}
                className={styles.select}
              >
                <option value="USD">🇺🇸 USD</option>
                <option value="EUR">🇪🇺 EUR</option>
                <option value="ARS">🇦🇷 ARS</option>
                <option value="COP">🇨🇴 COP</option>
              </select>

              <div className={styles.montoInputWrapper}>
                <span className={styles.montoSymbol}>$</span>
                <input
                  type="number"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  placeholder="0.00"
                  className={styles.inputMonto}
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center mt-2 font-medium">
              {error}
            </p>
          )}

          <button
            onClick={async () => {
              if (!codigoCuenta || !monto) return;
              setLoading(true);
              setError(null);

              try {
                const montoNumerico = parseFloat(monto);

                // ✅ Capturamos la respuesta del backend
                const resultado = await transferenciaService.transferir(
                  codigoCuenta,
                  moneda,
                  montoNumerico
                );

                // ✅ Usamos el nombre que devuelve el backend
                const nombre = resultado.detalle.nombreDestinatario;
                setNombreDestinatario(nombre);

                const nuevaNotif: Notificacion = {
                  id: Date.now(),
                  tipo: "TRANSFERENCIA",
                  titulo: "Transferencia enviada",
                  // ✅ Notificación también con nombre real
                  mensaje: `Has transferido a ${nombre} un monto de ${montoNumerico.toLocaleString("es-AR", { minimumFractionDigits: 2 })} ${moneda.toUpperCase()}`,
                  nombre: nombre,
                  monto: montoNumerico,
                  moneda,
                  createdAt: "Hace 1 min",
                };

                const guardadas = JSON.parse(
                  localStorage.getItem("fastmoney_notificaciones") || "[]"
                );
                localStorage.setItem(
                  "fastmoney_notificaciones",
                  JSON.stringify([nuevaNotif, ...guardadas])
                );

                setStep("confirm");
              } catch (err: any) {
                const msg =
                  err?.response?.data?.message ||
                  "Error al realizar la transferencia";
                setError(msg);
              } finally {
                setLoading(false);
              }
            }}
            disabled={!codigoCuenta || !monto || loading}
            className={styles.btnEnviar}
          >
            {loading ? "Enviando..." : "Confirmar envío"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Transferencias;