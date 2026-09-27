# 🏗️ COMPONENTES DE LAYOUT - BANCO EXPRÉS

## 📋 Documentación de Componentes de Estructura

### 🎯 Propósito
Los componentes de Layout definen la estructura principal del dashboard bancario, incluyendo la navegación, header y disposición general de la interfaz.

---

## 🧩 Componentes Incluidos

### 1. **Sidebar.js** - Navegación Principal

#### 📍 **Ubicación**: `src/components/Layout/Sidebar.js`

#### 🎯 **Propósito**
Sidebar de navegación principal con menú colapsible, información del usuario y acceso a todas las secciones del dashboard.

#### 📊 **Props**
```javascript
{
  collapsed: boolean,        // Estado de colapso (desktop)
  open: boolean,            // Estado de apertura (mobile)
  activeSection: string,    // Sección actualmente activa
  onSectionChange: function, // Callback para cambiar sección
  onClose: function         // Callback para cerrar (mobile)
}
```

#### 🎨 **Características**
- ✅ **8 secciones principales** de navegación
- ✅ **Modo colapsible** para desktop (20px ↔ 288px)
- ✅ **Overlay responsive** para mobile
- ✅ **Información del usuario** con avatar y datos
- ✅ **Logo del banco** con fallback
- ✅ **Estados visuales** activos/inactivos
- ✅ **Animaciones suaves** de transición

#### 🎛️ **Secciones de Navegación**
```javascript
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-chart-pie' },
  { id: 'clientes', label: 'Clientes', icon: 'fas fa-users' },
  { id: 'cuentas', label: 'Cuentas', icon: 'fas fa-credit-card' },
  { id: 'transacciones', label: 'Transacciones', icon: 'fas fa-exchange-alt' },
  { id: 'creditos', label: 'Créditos', icon: 'fas fa-hand-holding-usd' },
  { id: 'pagos', label: 'Pagos y Recaudos', icon: 'fas fa-receipt' },
  { id: 'reportes', label: 'Reportes', icon: 'fas fa-chart-bar' },
  { id: 'configuracion', label: 'Configuración', icon: 'fas fa-cog' }
];
```

#### 📱 **Responsive Behavior**
- **Desktop (>992px)**: Sidebar fijo, colapsible
- **Mobile (≤992px)**: Overlay con backdrop, cierre automático

#### 🎨 **Estados Visuales**
- **Activo**: `bg-primary-50 dark:bg-primary-900/20 text-primary-600`
- **Inactivo**: `text-gray-600 dark:text-gray-300`
- **Hover**: `hover:bg-gray-50 dark:hover:bg-gray-700`

---

### 2. **Header.js** - Barra Superior

#### 📍 **Ubicación**: `src/components/Layout/Header.js`

#### 🎯 **Propósito**
Header principal con controles de navegación, búsqueda, notificaciones, tema y información contextual.

#### 📊 **Props**
```javascript
{
  onToggleSidebar: function,    // Toggle del sidebar
  darkMode: boolean,           // Estado del tema oscuro
  onToggleDarkMode: function,  // Cambiar tema
  sidebarCollapsed: boolean,   // Estado de colapso
  onNavigateToConfig: function // Navegar a configuración
}
```

#### 🎨 **Características**
- ✅ **Botón hamburguesa** animado para sidebar
- ✅ **Barra de búsqueda** global integrada
- ✅ **Toggle tema** oscuro/claro con persistencia
- ✅ **Panel de notificaciones** con badge animado
- ✅ **Menú de perfil** con dropdown
- ✅ **Fecha y hora** en tiempo real
- ✅ **Ubicación** del banco (Cúcuta)
- ✅ **Modal de filtros** funcional

#### ⏰ **Funcionalidades de Tiempo Real**
```javascript
// Actualización cada segundo
useEffect(() => {
  const timer = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);
  return () => clearInterval(timer);
}, []);
```

#### 🔍 **Componentes Integrados**
- `SearchBar` - Búsqueda global
- `NotificationPanel` - Panel de notificaciones
- `ProfileDropdown` - Menú de usuario
- `FiltersModal` - Modal de filtros avanzados

#### 📱 **Responsive Elements**
- **Mobile**: Elementos esenciales únicamente
- **Tablet**: Ubicación visible
- **Desktop**: Todos los elementos visibles

---

## 🎨 Estilos Asociados

### 📁 **Archivos CSS**
- `src/styles/components/Sidebar.css` - Estilos del sidebar
- `src/styles/components/Header.css` - Estilos del header

### 🎯 **Clases Principales**
```css
/* Sidebar */
.sidebar-container
.sidebar-collapsed / .sidebar-expanded
.sidebar-mobile-open / .sidebar-mobile-closed
.sidebar-nav-item-active / .sidebar-nav-item-inactive

/* Header */
.header-container
.header-hamburger
.header-search
.header-notifications
.header-theme-toggle
```

---

## 🔄 Estados y Comportamientos

### 🖥️ **Desktop Behavior**
```javascript
// Sidebar colapsible
const toggleSidebar = () => {
  if (window.innerWidth > 992) {
    setSidebarCollapsed(!sidebarCollapsed);
  }
};
```

### 📱 **Mobile Behavior**
```javascript
// Sidebar overlay
const toggleSidebar = () => {
  if (window.innerWidth <= 992) {
    setSidebarOpen(!sidebarOpen);
  }
};
```

### 🎨 **Theme Integration**
```javascript
// Soporte completo para tema oscuro
className={`transition-colors duration-300 ${
  darkMode ? 'dark' : ''
}`}
```

---

## 🚀 Uso y Ejemplos

### 📝 **Implementación Básica**
```jsx
// En App.js
<Sidebar
  collapsed={sidebarCollapsed}
  open={sidebarOpen}
  activeSection={activeSection}
  onSectionChange={setActiveSection}
  onClose={closeSidebar}
/>

<Header
  onToggleSidebar={toggleSidebar}
  darkMode={darkMode}
  onToggleDarkMode={() => setDarkMode(!darkMode)}
  sidebarCollapsed={sidebarCollapsed}
  onNavigateToConfig={() => setActiveSection('configuracion')}
/>
```

### 🎯 **Personalización**
```javascript
// Agregar nueva sección al sidebar
const newMenuItem = {
  id: 'nueva-seccion',
  label: 'Nueva Sección',
  icon: 'fas fa-new-icon'
};
```

---

## 🔧 Mantenimiento

### ✅ **Buenas Prácticas**
1. **Mantener consistencia** en iconografía (Font Awesome)
2. **Usar callbacks** para comunicación con componente padre
3. **Implementar loading states** para mejor UX
4. **Mantener accesibilidad** con ARIA labels

### 🐛 **Troubleshooting Común**
- **Sidebar no colapsa**: Verificar breakpoint de responsive
- **Tema no cambia**: Verificar persistencia en localStorage
- **Navegación no funciona**: Verificar callbacks de props

### 🔄 **Actualizaciones Futuras**
- [ ] Breadcrumbs dinámicos en header
- [ ] Notificaciones en tiempo real
- [ ] Personalización de sidebar por usuario
- [ ] Shortcuts de teclado para navegación

---

**📅 Última actualización**: Diciembre 26, 2024  
**👥 Mantenido por**: Banco Exprés Development Team