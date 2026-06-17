import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard/index";
import { walletService } from "../services/wallet.service";
import { ahorroService } from "../services/ahorro.service";
import { useAuthStore } from "../store/auth.store";

// Mock subcomponentes para aislar el Dashboard
vi.mock("../components/ChatBot/ChatBot", () => ({
  ChatBot: () => <div data-testid="mock-chatbot">ChatBot Mock</div>
}));

vi.mock("../pages/Movimientos", () => ({
  default: () => <div data-testid="mock-movimientos">Movimientos Mock</div>
}));

vi.mock("../pages/Notificaciones/notificaciones", () => ({
  NotificacionesComponent: () => <div data-testid="mock-notificaciones">Notificaciones Mock</div>
}));

vi.mock("../services/wallet.service", () => ({
  walletService: {
    getBalance: vi.fn(),
    getDesglose: vi.fn(),
    getTasas: vi.fn(),
    convertirSaldo: vi.fn(),
  }
}));

vi.mock("../services/ahorro.service", () => ({
  ahorroService: {
    getMeta: vi.fn(),
  }
}));

vi.mock("../store/auth.store", () => ({
  useAuthStore: vi.fn(),
}));

describe("Dashboard - Pruebas Unitarias de Tarjeta de Ahorros", () => {
  const mockUser = {
    id: "user-123",
    name: "Pepo",
    email: "pepo@email.com",
    moneda: "USD",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock default del auth store
    vi.mocked(useAuthStore).mockReturnValue({
      token: "mock-token",
      user: mockUser,
      setAuth: vi.fn(),
      logout: vi.fn(),
      updateUser: vi.fn(),
    });

    // Mock default de getBalance
    vi.mocked(walletService.getBalance).mockResolvedValue([
      { id: "1", currency: "USD", balance: 3639.73 }
    ]);
  });

  it("1. Renderiza el estado vacío cuando no hay una meta de ahorro activa", async () => {
    // getMeta retorna null (no hay meta activa)
    vi.mocked(ahorroService.getMeta).mockResolvedValue(null);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    // Esperar a que cargue
    await waitFor(() => {
      expect(screen.getByText("Saldo Disponible")).toBeInTheDocument();
    });

    // Verificar que aparece el mensaje de estado vacío
    expect(screen.getByText("No tienes una meta de ahorro activa.")).toBeInTheDocument();
    
    // Verificar que se renderiza el botón/enlace para comenzar a ahorrar
    const ctaLink = screen.getByText("Comenzar a ahorrar");
    expect(ctaLink).toBeInTheDocument();
  });

  it("2. El botón de redirección tiene el enlace correcto a la sección de Ahorros", async () => {
    vi.mocked(ahorroService.getMeta).mockResolvedValue(null);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Saldo Disponible")).toBeInTheDocument();
    });

    const ctaLink = screen.getByRole("link", { name: /comenzar a ahorrar/i });
    expect(ctaLink).toHaveAttribute("href", "/savings");
  });

  it("3. Renderiza los datos correctos cuando hay una meta de ahorro activa", async () => {
    // getMeta retorna una meta activa
    const mockMeta = {
      id: 1,
      cuentaId: 10,
      nombre: "Vacaciones en Ibiza",
      limite: 1000.00,
      divisa: "EUR",
      imagen: null,
      saldoAhorrado: 250.00,
      createdAt: "2026-06-17",
      updatedAt: "2026-06-17",
    };
    vi.mocked(ahorroService.getMeta).mockResolvedValue(mockMeta);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Saldo Disponible")).toBeInTheDocument();
    });

    // No debe aparecer el texto de "No tienes una meta de ahorro activa."
    expect(screen.queryByText("No tienes una meta de ahorro activa.")).not.toBeInTheDocument();

    // El saldo disponible por defecto está en USD (moneda de mockUser). 
    // La meta está en EUR. La moneda por defecto elegida por Dashboard para mostrar es USD (moneda del usuario).
    // Con las tasas locales de conversión de EUR a USD (EUR: { USD: 1.08 }):
    // saldoAhorrado real: 250 EUR * 1.08 = 270.00
    // meta limite real: 1000 EUR * 1.08 = 1080.00
    
    // El símbolo de USD es "$"
    expect(screen.getByText("270,00")).toBeInTheDocument();
    expect(screen.getByText("Meta: $ 1.080,00")).toBeInTheDocument();
  });

  it("4. Recalcula y convierte los montos de la meta dinámicamente al cambiar la divisa del Dashboard", async () => {
    const mockMeta = {
      id: 1,
      cuentaId: 10,
      nombre: "Fondo de Emergencia",
      limite: 1000.00,
      divisa: "USD",
      imagen: null,
      saldoAhorrado: 500.00,
      createdAt: "2026-06-17",
      updatedAt: "2026-06-17",
    };
    vi.mocked(ahorroService.getMeta).mockResolvedValue(mockMeta);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    // Esperar a que cargue
    await waitFor(() => {
      expect(screen.getByText("Saldo Disponible")).toBeInTheDocument();
    });

    // Moneda por defecto es USD.
    // Saldo: 500.00, Meta: 1000.00
    expect(screen.getByText("500,00")).toBeInTheDocument();
    expect(screen.getByText("Meta: $ 1.000,00")).toBeInTheDocument();

    // Abrir dropdown de divisas y seleccionar EUR
    const dropdownBtn = screen.getByRole("button", { name: /🇺🇸 usd/i });
    fireEvent.click(dropdownBtn);

    const eurOption = screen.getByRole("button", { name: /🇪🇺 eur/i });
    fireEvent.click(eurOption);

    // Con la conversión local de USD a EUR (USD: { EUR: 0.92 }):
    // saldoAhorrado: 500 * 0.92 = 460.00
    // limite: 1000 * 0.92 = 920.00
    await waitFor(() => {
      expect(screen.getByText("460,00")).toBeInTheDocument();
      expect(screen.getByText("Meta: € 920,00")).toBeInTheDocument();
    });
  });
});
