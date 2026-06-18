# FastMoney Frontend 💸⚡

Este repositorio contiene la aplicación cliente de **FastMoney**, una billetera digital moderna y ágil que permite transferir, depositar, ahorrar y realizar swaps de divisas al instante con soporte multi-moneda (USD, EUR, ARS, COP). 

La plataforma cuenta además con un asistente financiero inteligente impulsado por **Google Gemini AI**.

---

## 🎨 Diseño y Experiencia de Usuario

La interfaz está construida siguiendo lineamientos estéticos modernos e interactivos:
* **Estética Premium**: Paletas de colores profundas y elegantes en tonos púrpuras, esmeraldas y grises sutiles que aportan dinamismo sin saturar la vista.
* **Glassmorphism y Micro-animaciones**: Transiciones suaves al interactuar con botones, efectos de elevación en tarjetas al pasar el cursor y menús flotantes fluidos.
* **Diseño Responsive**: Completamente optimizado para una excelente visualización tanto en dispositivos móviles como en pantallas de escritorio.
* **Branding e Identidad**: Favicon e isotipo vectorial (`logo.svg`) integrados fluidamente en las pantallas de acceso y en la barra lateral de navegación.

---

## 🚀 Características Clave Implementadas

### 1. Panel de Control (Dashboard)
* **Visualización de Balances**: Muestra el saldo disponible y ahorrado en la moneda seleccionada.
* **Conversión de Balance Dinámica**: Permite cambiar la divisa del dashboard (USD, EUR, ARS, COP) al instante, consultando la cotización en tiempo real y actualizando los valores visuales y barras de progreso al momento.
* **Modo Privacidad**: Opción de ocultar/mostrar saldos con un solo clic.
* **Historial Compacto**: Acceso directo a los últimos movimientos realizados.
* **Campana de Notificaciones Inteligentes**: Componente dedicado que muestra alertas de transacciones y sugerencias.

### 2. Monitoreo y Swap de Divisas (Tasas de Cambio)
* **Panel de Cotizaciones**: Monitorización en tiempo real de las divisas configuradas respecto a la moneda base seleccionada por el usuario.
* **Estadísticas de Variación**: Indicadores de subida/bajada porcentual del mercado en las últimas 24h.
* **Calculadora de Conversión Integrada**: Permite simular y realizar conversiones directas de saldo de una divisa a otra al instante, impactando directamente en la billetera virtual.

### 3. Módulo de Ahorros Colectivos & Metas
* **Metas Personalizadas**: Formulario de creación de meta definiendo nombre de la meta, monto objetivo, divisa de ahorro y una URL de imagen opcional.
* **Barra de Progreso Interactiva**: Indicador visual dinámico con porcentaje de avance hacia la meta.
* **Aportes y Retiros**: Modal dedicado para depositar saldo de la billetera a la meta de ahorro, o bien retirar fondos de la meta de vuelta al saldo disponible.
* **Liquidación de Metas**: Opción de eliminar la meta devolviendo automáticamente el 100% de los fondos acumulados al saldo disponible.

### 4. Transferencias e Historial de Movimientos
* **Transferencias Seguras**: Envío de fondos mediante código de cuenta único.
* **Resolución de Destinatario**: El backend resuelve y muestra el nombre completo del destinatario en tiempo real para verificar la identidad antes de confirmar la transacción.
* **Historial Completo**: Filtro y paginación de todos los movimientos de envío, recepción, depósitos e intercambios.

### 5. Asistente Financiero Inteligente (ChatBot)
* **IA Gemini integrada**: Ubicado en el Dashboard para responder consultas del usuario.
* **Consultas Contextuales**: Permite pedir consejos financieros, consultar estados de cuenta y realizar simulaciones de ahorro conversacionales.

### 6. Autenticación y Registro Completo
* **Inicio de Sesión y Registro**: Captura datos de perfil y permite definir la divisa principal de la cuenta.
* **Bypass de Desarrollo**: Permite a los desarrolladores acceder con la cuenta `test@email.com` en un modo offline de prueba rápida sin necesidad de levantar el backend.

---

## 📁 Estructura del Proyecto

El código está estructurado bajo principios de modularidad y escalabilidad:

```
fastmoney-frontend/
├── dist/                   # Build de producción autogenerado por Vite
├── public/                 # Recursos estáticos globales (favicon.svg, logo.svg, etc.)
└── src/
    ├── assets/             # Gráficos vectoriales e imágenes locales
    ├── components/         # Componentes UI reutilizables
    │   ├── ChatBot/        # Componente del chat inteligente Gemini
    │   └── layout/         # Estructura del layout base (AppLayout.tsx con Sidebar)
    ├── constants/          # Constantes compartidas (ej. RUTAS de la App)
    ├── pages/              # Vistas principales/páginas individuales
    │   ├── Ahorro/         # Control y visualización de metas de ahorro
    │   ├── Auth/           # Pantallas de Login y Registro de usuarios
    │   ├── Dashboard/      # Tablero principal de balances y estadísticas
    │   ├── Deposito/       # Formulario y pasarela de depósitos
    │   ├── Movimientos/    # Historial detallado de transacciones
    │   ├── Notificaciones/ # Alertas dinámicas del sistema
    │   ├── Perfil/         # Gestión de datos del usuario
    │   ├── tasasDeCambio/  # Tasas en tiempo real y calculadora de Swap
    │   └── Transferencias/ # Pasos de transferencia y confirmación
    ├── router/             # Configuración de rutas protegidas y públicas (React Router DOM)
    ├── services/           # Clientes HTTP (Axios) conectados al backend
    ├── store/              # Estado global de sesión y Auth (Zustand + Context)
    ├── test/               # Pruebas unitarias de integración (Vitest + Testing Library)
    └── utils/              # Helper functions para formateo de datos
```

---

## 🛠️ Tecnologías Utilizadas

* **Framework Principal**: React (v19) + TypeScript
* **Herramienta de Construcción (Bundler)**: Vite
* **Estilos**: Vanilla CSS y TailwindCSS (configurado para diseño premium adaptativo)
* **Gestión del Estado**: Zustand
* **Ruteo**: React Router DOM
* **Librería de Gráficos**: Recharts (para visualizaciones de balances en el Dashboard)
* **Iconografía**: Lucide React
* **Pruebas**: Vitest y JSDom para validaciones robustas de UI y calculadoras

---

## 🔧 Instalación y Desarrollo Local

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/LeonelFernandez01/fastmoney-frontend.git
   cd fastmoney-frontend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno**:
   Crea un archivo `.env` en la raíz del proyecto y define la URL del backend:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. **Correr servidor de desarrollo**:
   ```bash
   npm run dev
   ```

5. **Ejecutar Suite de Pruebas**:
   ```bash
   npm run test
   ```

---

## ☁️ Despliegue en Vercel

Este proyecto cuenta con integración continua vinculada directamente al repositorio en la rama `produccion`. 

Cada push realizado en esta rama compila el código y actualiza la versión de producción en:
👉 **[fastmoney-frontend.vercel.app](https://fastmoney-frontend.vercel.app/)**
