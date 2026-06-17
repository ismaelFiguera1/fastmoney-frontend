import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TasaCambio } from "../pages/tasasDeCambio/tasasDeCambio";
import { walletService } from "../services/wallet.service";
import { useAuthStore } from "../store/auth.store";

// Mockear servicios y store
vi.mock("../services/wallet.service", () => ({
  walletService: {
    getBalance: vi.fn(),
    getDesglose: vi.fn(),
    getTasas: vi.fn(),
    convertirSaldo: vi.fn(),
  }
}));

vi.mock("../store/auth.store", () => ({
  useAuthStore: vi.fn(),
}));

describe("TasaCambio - Pruebas Unitarias de Calculadora y Conversión", () => {
  const mockUser = {
    id: "user-123",
    name: "Pepo",
    email: "pepo@email.com",
    moneda: "USD",
  };

  const mockSaldos = [
    { id: "1", currency: "USD", balance: 1000.00 },
    { id: "2", currency: "EUR", balance: 500.00 },
    { id: "3", currency: "COP", balance: 150000.00 },
    { id: "4", currency: "ARS", balance: 20000.00 },
  ];

  const mockTasasResponse = {
    tasas: {
      USD: { USD: 1, EUR: 0.92, COP: 4000, ARS: 900 },
      EUR: { USD: 1.08, EUR: 1, COP: 4300, ARS: 980 },
      COP: { USD: 0.00025, EUR: 0.00023, COP: 1, ARS: 0.22 },
      ARS: { USD: 0.0011, EUR: 0.001, COP: 4.5, ARS: 1 },
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useAuthStore).mockReturnValue({
      token: "mock-token",
      user: mockUser,
      setAuth: vi.fn(),
      logout: vi.fn(),
      updateUser: vi.fn(),
    });

    vi.mocked(walletService.getDesglose).mockResolvedValue(mockSaldos);
    vi.mocked(walletService.getTasas).mockResolvedValue(mockTasasResponse);
  });

  // Helper matcher para textos partidos en el DOM por llaves de JSX
  const getElementByTextContent = (partialText: string) => {
    return screen.getByText((content, element) => {
      const text = element?.textContent || "";
      const hasText = text.replace(/\s+/g, " ").includes(partialText);
      const childrenDontHaveText = Array.from(element?.children || []).every(
        (child) => !child.textContent?.replace(/\s+/g, " ").includes(partialText)
      );
      return hasText && childrenDontHaveText;
    });
  };

  it("1. Renderiza los saldos y tarjetas de divisas iniciales correctamente", async () => {
    render(<TasaCambio />);

    // Esperar a que se carguen los saldos y tasas
    await waitFor(() => {
      expect(screen.getByText("Monitoreo de Divisas")).toBeInTheDocument();
    });

    // Verificar que se renderiza el disponible inicial en la moneda base (USD)
    expect(getElementByTextContent("Disponible: $ 1,000.00")).toBeInTheDocument();

    // Verificar que las tasas en las tarjetas se renderizan
    expect(screen.getAllByText("USD").length).toBeGreaterThan(0);
    expect(screen.getAllByText("EUR").length).toBeGreaterThan(0);
  });

  it("2. Realiza el cálculo dinámico y actualiza el resultado estimado", async () => {
    render(<TasaCambio />);

    await waitFor(() => {
      expect(getElementByTextContent("Disponible: $ 1,000.00")).toBeInTheDocument();
    });

    const inputCantidad = screen.getByRole("spinbutton");
    
    // Cambiar la cantidad a 200 USD
    fireEvent.change(inputCantidad, { target: { value: "200" } });

    // La moneda base por defecto es USD, y la de destino por defecto es COP
    // Conversión: 200 USD * 4000 (tasa USD->COP) = 800,000.00 COP
    await waitFor(() => {
      expect(getElementByTextContent("$ 800,000.00 COP")).toBeInTheDocument();
    });

    // Cambiar la moneda de destino "A" a EUR
    const selectDestino = screen.getAllByRole("combobox")[1];
    fireEvent.change(selectDestino, { target: { value: "EUR" } });

    // Conversión: 200 USD * 0.92 = 184.00 EUR
    await waitFor(() => {
      expect(getElementByTextContent("€ 184.00 EUR")).toBeInTheDocument();
    });
  });

  it("3. Muestra errores de validación ante saldo insuficiente o monedas idénticas", async () => {
    render(<TasaCambio />);

    await waitFor(() => {
      expect(getElementByTextContent("Disponible: $ 1,000.00")).toBeInTheDocument();
    });

    const inputCantidad = screen.getByRole("spinbutton");
    const selectDestino = screen.getAllByRole("combobox")[1];

    // Caso 1: Intentar convertir 1500 USD (saldo disponible es 1000 USD)
    fireEvent.change(inputCantidad, { target: { value: "1500" } });
    expect(getElementByTextContent("Saldo insuficiente en USD")).toBeInTheDocument();

    // El botón Confirmar Conversión debe quedar deshabilitado
    const botonConfirmar = screen.getByRole("button", { name: /confirmar conversión/i });
    expect(botonConfirmar).toBeDisabled();

    // Caso 2: Cambiar la cantidad a un monto válido pero seleccionar monedas idénticas (USD a USD)
    fireEvent.change(inputCantidad, { target: { value: "100" } });
    fireEvent.change(selectDestino, { target: { value: "USD" } });

    expect(getElementByTextContent("Selecciona dos monedas distintas")).toBeInTheDocument();
    expect(botonConfirmar).toBeDisabled();
  });

  it("4. Envía la conversión correctamente llamando al servicio y mostrando éxito", async () => {
    vi.mocked(walletService.convertirSaldo).mockResolvedValue({ success: true });

    render(<TasaCambio />);

    await waitFor(() => {
      expect(getElementByTextContent("Disponible: $ 1,000.00")).toBeInTheDocument();
    });

    const inputCantidad = screen.getByRole("spinbutton");
    const selectDestino = screen.getAllByRole("combobox")[1];
    const botonConfirmar = screen.getByRole("button", { name: /confirmar conversión/i });

    // Ingresar cantidad: 100 USD
    fireEvent.change(inputCantidad, { target: { value: "100" } });
    // Destino: COP
    fireEvent.change(selectDestino, { target: { value: "COP" } });

    // Hacer clic en Confirmar Conversión
    fireEvent.click(botonConfirmar);

    // Verificar que se llame a walletService.convertirSaldo con los 3 parámetros en minúscula
    await waitFor(() => {
      expect(walletService.convertirSaldo).toHaveBeenCalledWith({
        monto: 100,
        desdeMoneda: "usd",
        haciaMoneda: "cop",
      });
    });

    // Verificar que se renderiza el mensaje de éxito
    expect(screen.getByText("🎉 ¡Conversión realizada con éxito!")).toBeInTheDocument();

    // Se debe recargar los saldos de la pantalla
    expect(walletService.getDesglose).toHaveBeenCalledTimes(2); // Al montar + tras éxito
  });
});
