# 📊 COMPONENTES DE DASHBOARD - BANCO EXPRÉS

## 📋 Documentación de Componentes del Dashboard Principal

### 🎯 Propósito
Los componentes de Dashboard muestran métricas, gráficos, transacciones y acciones rápidas del sistema bancario en tiempo real.

---

## 🧩 Componentes Incluidos

### 1. **Dashboard.js** - Contenedor Principal

#### 📍 **Ubicación**: `src/components/Dashboard/Dashboard.js`

#### 🎯 **Propósito**
Componente contenedor que organiza y renderiza todos los elementos del dashboard principal.

#### 🏗️ **Estructura**
```jsx
<div className="space-y-6 animate-fade-in">
  <Breadcrumbs />
  <KPICards />
  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
    <OperationsChart />
    <BalanceCards />
  </div>
  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
    <RecentTransactions />
    <QuickActions />
  </div>
</div>
```

---

### 2. **KPICards.js** - Métricas Clave

#### 📍 **Ubicación**: `src/components/Dashboard/KPICards.js`

#### 🎯 **Propósito**
Muestra las métricas clave del día (KPIs) con valores, tendencias y visualización atractiva.

#### 📊 **KPIs Mostrados**
```javascript
const kpis = [
  {
    title: 'Total Depósitos',
    value: '$45,230,000',
    change: '+12.5%',
    trend: 'up',
    icon: 'fas fa-arrow-up',
    color: 'success'
  },
  {
    title: 'Total Retiros',
    value: '$32,150,000',
    change: '-3.2%',
    trend: 'down',
    icon: 'fas fa-arrow-down',
    color: 'danger'
  },
  {
    title: 'Transacciones',
    value: '1,247',
    change: '+8.1%',
    trend: 'up',
    icon: 'fas fa-exchange-alt',
    color: 'primary'
  },
  {
    title: 'Clientes Atendidos',
    value: '89',
    change: '+15.3%',
    trend: 'up',
    icon: 'fas fa-users',
    color: 'warning'
  }
];
```

#### 🎨 **Características**
- ✅ **Iconos diferenciados** por tipo de métrica
- ✅ **Colores temáticos** (success, danger, primary, warning)
- ✅ **Indicadores de tendencia** (↑↓) con porcentajes
- ✅ **Animaciones hover** con elevación
- ✅ **Responsive grid** (1 col mobile → 4 cols desktop)

---

### 3. **OperationsChart.js** - Gráfico de Operaciones

#### 📍 **Ubicación**: `src/components/Dashboard/OperationsChart.js`

#### 🎯 **Propósito**
Gráfico interactivo que muestra las operaciones bancarias en el tiempo usando Chart.js.

#### 📈 **Tecnología**
- **Chart.js 4.2.1** - Biblioteca de gráficos
- **React-ChartJS-2 5.2.0** - Integración con React

#### 🎛️ **Tipos de Gráfico**
```javascript
const chartTypes = [
  { id: 'line', label: 'Líneas', active: true },
  { id: 'bar', label: 'Barras', active: false },
  { id: 'area', label: 'Área', active: false }
];
```

#### 📊 **Datos Mostrados**
- **Depósitos** (línea verde)
- **Retiros** (línea roja)
- **Transferencias** (línea azul)
- **Pagos** (línea naranja)

#### 🎨 **Características**
- ✅ **Interactividad** con tooltips
- ✅ **Responsive** con altura adaptativa
- ✅ **Tema oscuro** compatible
- ✅ **Animaciones** suaves de entrada
- ✅ **Controles** para cambiar tipo de gráfico

---

### 4. **BalanceCards.js** - Tarjetas de Balance

#### 📍 **Ubicación**: `src/components/Dashboard/BalanceCards.js`

#### 🎯 **Propósito**
Muestra los balances de diferentes cuentas y fondos del banco.

#### 💰 **Balances Mostrados**
```javascript
const balances = [
  {
    title: 'Caja Principal',
    amount: '$125,430,000',
    change: '+2.5%',
    trend: 'up',
    icon: 'fas fa-university',
    color: 'primary'
  },
  {
    title: 'Caja Secundaria',
    amount: '$45,230,000',
    change: '+1.8%',
    trend: 'up',
    icon: 'fas fa-piggy-bank',
    color: 'secondary'
  },
  {
    title: 'Transferencias',
    amount: '$23,150,000',
    change: '+5.2%',
    trend: 'up',
    icon: 'fas fa-exchange-alt',
    color: 'accent'
  },
  {
    title: 'Créditos Activos',
    amount: '$89,750,000',
    change: '-0.5%',
    trend: 'down',
    icon: 'fas fa-hand-holding-usd',
    color: 'success'
  }
];
```

#### 🎨 **Características**
- ✅ **Iconos temáticos** con gradientes
- ✅ **Indicadores de cambio** con colores
- ✅ **Layout vertical** optimizado
- ✅ **Hover effects** con elevación

---

### 5. **RecentTransactions.js** - Transacciones Recientes

#### 📍 **Ubicación**: `src/components/Dashboard/RecentTransactions.js`

#### 🎯 **Propósito**
Tabla de las transacciones más recientes con información detallada y estados.

#### 📋 **Columnas de la Tabla**
```javascript
const columns = [
  'Fecha',
  'Tipo',
  'Cliente',
  'Cuenta',
  'Monto',
  'Estado'
];
```

#### 🏷️ **Estados de Transacción**
```javascript
const statusStyles = {
  'Completado': 'bg-success-100 text-success-800',
  'Pendiente': 'bg-warning-100 text-warning-800',
  'Fallido': 'bg-danger-100 text-danger-800'
};
```

#### 🎨 **Características**
- ✅ **Tabla responsive** con scroll horizontal
- ✅ **Estados visuales** con badges de color
- ✅ **Hover effects** en filas
- ✅ **Formateo de montos** en COP
- ✅ **Enlaces** para ver detalles completos

---

### 6. **QuickActions.js** - Acciones Rápidas

#### 📍 **Ubicación**: `src/components/Dashboard/QuickActions.js`

#### 🎯 **Propósito**
Panel de acciones frecuentes para operaciones bancarias rápidas.

#### ⚡ **Acciones Disponibles**
```javascript
const quickActions = [
  {
    id: 'deposit',
    title: 'Registrar Depósito',
    description: 'Registrar nuevo depósito de cliente',
    icon: 'fas fa-plus-circle',
    color: 'success'
  },
  {
    id: 'withdrawal',
    title: 'Registrar Retiro',
    description: 'Procesar retiro de efectivo',
    icon: 'fas fa-minus-circle',
    color: 'danger'
  },
  {
    id: 'payment',
    title: 'Pago de Servicios',
    description: 'Procesar pago de servicios públicos',
    icon: 'fas fa-receipt',
    color: 'warning'
  },
  {
    id: 'transfer',
    title: 'Transferencia',
    description: 'Realizar transferencia bancaria',
    icon: 'fas fa-exchange-alt',
    color: 'primary'
  }
];
```

#### 🎨 **Características**
- ✅ **Botones grandes** fáciles de usar
- ✅ **Iconos descriptivos** con colores temáticos
- ✅ **Descripciones** claras de cada acción
- ✅ **Hover effects** con escalado
- ✅ **Layout vertical** en columna

---

## 🎨 Estilos Asociados

### 📁 **Archivo CSS Principal**
`src/styles/components/Dashboard.css`

### 🎯 **Clases Principales**
```css
/* Contenedor principal */
.dashboard-container

/* KPI Cards */
.kpi-grid
.kpi-card
.kpi-icon-deposits / withdrawals / transactions / clients
.kpi-trend-up / down

/* Gráficos */
.chart-container
.chart-canvas
.chart-controls

/* Balances */
.balance-grid
.balance-card
.balance-icon-main / secondary / transfers / credits

/* Transacciones */
.transactions-container
.transactions-table
.transaction-type-deposit / withdrawal / transfer / payment
.transaction-status-completed / pending

/* Acciones Rápidas */
.quick-actions-container
.quick-action-button
.quick-action-icon-deposit / withdrawal / payment / transfer
```

---

## 📊 Integración de Datos

### 🔄 **Context Integration**
```javascript
// Uso del BankContext para datos
const { state, actions } = useBank();

// KPIs dinámicos
const kpis = {
  totalDeposits: state.kpis.totalDeposits,
  totalWithdrawals: state.kpis.totalWithdrawals,
  totalTransactions: state.kpis.totalTransactions,
  clientsAttended: state.kpis.clientsAttended
};
```

### 📈 **Chart Data Processing**
```javascript
// Procesamiento de datos para gráficos
const chartData = {
  labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
  datasets: [
    {
      label: 'Depósitos',
      data: processDepositsData(state.transactions),
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)'
    }
    // ... más datasets
  ]
};
```

---

## 🚀 Uso y Ejemplos

### 📝 **Implementación Básica**
```jsx
// En App.js cuando activeSection === 'dashboard'
import Dashboard from './components/Dashboard/Dashboard';

const renderActiveSection = () => {
  switch (activeSection) {
    case 'dashboard':
      return <Dashboard />;
    // ... otros casos
  }
};
```

### 🎯 **Personalización de KPIs**
```javascript
// Agregar nuevo KPI
const customKPI = {
  title: 'Nuevo KPI',
  value: '$1,000,000',
  change: '+10%',
  trend: 'up',
  icon: 'fas fa-chart-line',
  color: 'info'
};
```

---

## 🔧 Mantenimiento

### ✅ **Buenas Prácticas**
1. **Actualizar datos** en tiempo real usando Context
2. **Mantener consistencia** en colores y iconografía
3. **Optimizar rendimiento** con React.memo cuando sea necesario
4. **Implementar loading states** para mejor UX

### 🐛 **Troubleshooting Común**
- **Gráficos no cargan**: Verificar Chart.js dependencies
- **KPIs no actualizan**: Verificar BankContext connection
- **Responsive issues**: Verificar grid breakpoints

### 🔄 **Actualizaciones Futuras**
- [ ] Gráficos en tiempo real con WebSockets
- [ ] KPIs personalizables por usuario
- [ ] Exportación de datos a PDF/Excel
- [ ] Filtros avanzados por período
- [ ] Comparativas año anterior

---

**📅 Última actualización**: Diciembre 26, 2024  
**👥 Mantenido por**: Banco Exprés Development Team