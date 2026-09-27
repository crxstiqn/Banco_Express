# 🎨 COMPONENTES DE UI - BANCO EXPRÉS

## 📋 Documentación de Componentes de Interfaz de Usuario

### 🎯 Propósito
Los componentes de UI proporcionan elementos reutilizables de interfaz como modales, dropdowns, notificaciones, búsqueda y otros elementos interactivos.

---

## 🧩 Componentes Incluidos

### 1. **FiltersModal.js** - Modal de Filtros Avanzados

#### 📍 **Ubicación**: `src/components/UI/FiltersModal.js`

#### 🎯 **Propósito**
Modal completo para filtrar datos por múltiples criterios como fechas, tipos, montos y más.

#### 📊 **Props**
```javascript
{
  isOpen: boolean,           // Estado de apertura del modal
  onClose: function,         // Callback para cerrar
  onApplyFilters: function   // Callback para aplicar filtros
}
```

#### 🔍 **Filtros Disponibles**
```javascript
const filterTypes = {
  dateFrom: 'Fecha Desde',
  dateTo: 'Fecha Hasta',
  transactionType: 'Tipo de Transacción',
  status: 'Estado',
  amountMin: 'Monto Mínimo',
  amountMax: 'Monto Máximo',
  clientType: 'Tipo de Cliente',
  branch: 'Sucursal'
};
```

#### 🎨 **Características**
- ✅ **Grid responsive** (1 col mobile → 2 cols desktop)
- ✅ **Resumen visual** de filtros activos con chips
- ✅ **Validación** de rangos de fecha y monto
- ✅ **Botones de acción** (aplicar, limpiar, cancelar)
- ✅ **Integración con toast** notifications

---

### 2. **HelpModal.js** - Centro de Ayuda

#### 📍 **Ubicación**: `src/components/UI/HelpModal.js`

#### 🎯 **Propósito**
Modal de ayuda completo con sistema de tabs y contenido organizado por categorías.

#### 📊 **Props**
```javascript
{
  isOpen: boolean,    // Estado de apertura del modal
  onClose: function   // Callback para cerrar
}
```

#### 📚 **Secciones de Ayuda**
```javascript
const helpSections = {
  guide: {
    title: 'Guía de Uso',
    icon: 'fas fa-book',
    content: [
      'Navegación Principal',
      'Dashboard Principal', 
      'Gestión de Clientes',
      'Transacciones'
    ]
  },
  shortcuts: {
    title: 'Atajos de Teclado',
    icon: 'fas fa-keyboard',
    content: [
      'Navegación General',
      'Acciones Rápidas',
      'Tema y Vista'
    ]
  },
  faq: {
    title: 'Preguntas Frecuentes',
    icon: 'fas fa-question-circle',
    content: [
      '¿Cómo realizar una transacción?',
      '¿Cómo buscar un cliente?',
      '¿Cómo generar reportes?',
      '¿Qué hacer si hay un error?'
    ]
  },
  contact: {
    title: 'Contacto y Soporte',
    icon: 'fas fa-headset',
    content: [
      'Soporte Técnico',
      'Oficina Principal',
      'Emergencias'
    ]
  }
};
```

#### 🎨 **Características**
- ✅ **Sistema de tabs** navegable
- ✅ **Contenido organizado** por categorías
- ✅ **Información de contacto** completa
- ✅ **Responsive design** con max-width 4xl
- ✅ **Iconografía consistente** con Font Awesome

---

### 3. **ProfileDropdown.js** - Menú de Perfil

#### 📍 **Ubicación**: `src/components/UI/ProfileDropdown.js`

#### 🎯 **Propósito**
Dropdown del perfil de usuario con opciones de configuración, ayuda y cierre de sesión.

#### 📊 **Props**
```javascript
{
  onNavigateToConfig: function  // Callback para navegar a configuración
}
```

#### 🎛️ **Opciones del Menú**
```javascript
const menuItems = [
  {
    id: 'profile',
    label: 'Ver Perfil',
    icon: 'fas fa-user',
    action: () => onNavigateToConfig()
  },
  {
    id: 'settings', 
    label: 'Configuración',
    icon: 'fas fa-cog',
    action: () => onNavigateToConfig()
  },
  {
    id: 'help',
    label: 'Ayuda',
    icon: 'fas fa-question-circle',
    action: () => setShowHelp(true)
  },
  {
    id: 'logout',
    label: 'Cerrar Sesión',
    icon: 'fas fa-sign-out-alt',
    action: () => logout(),
    danger: true
  }
];
```

#### 🎨 **Características**
- ✅ **Avatar del usuario** con fallback
- ✅ **Información completa** (nombre, email, cargo)
- ✅ **Click outside** para cerrar
- ✅ **Integración con HelpModal**
- ✅ **Estilo danger** para logout

---

### 4. **SearchBar.js** - Barra de Búsqueda

#### 📍 **Ubicación**: `src/components/UI/SearchBar.js`

#### 🎯 **Propósito**
Barra de búsqueda global con autocompletado y resultados en tiempo real.

#### 🔍 **Funcionalidades**
```javascript
const searchFeatures = {
  realTimeSearch: true,      // Búsqueda mientras escribe
  autoComplete: true,        // Sugerencias automáticas
  multipleFields: [          // Campos de búsqueda
    'cedula',
    'nombre', 
    'email',
    'telefono'
  ],
  resultLimit: 5            // Máximo 5 resultados
};
```

#### 🎨 **Características**
- ✅ **Búsqueda en tiempo real** con debounce
- ✅ **Dropdown de resultados** con avatares
- ✅ **Múltiples campos** de búsqueda
- ✅ **Navegación por teclado** (↑↓ Enter)
- ✅ **Estado vacío** cuando no hay resultados

---

### 5. **NotificationPanel.js** - Panel de Notificaciones

#### 📍 **Ubicación**: `src/components/UI/NotificationPanel.js`

#### 🎯 **Propósito**
Panel desplegable que muestra notificaciones del sistema con diferentes tipos y estados.

#### 📊 **Props**
```javascript
{
  onClose: function  // Callback para cerrar el panel
}
```

#### 🔔 **Tipos de Notificación**
```javascript
const notificationTypes = {
  info: {
    icon: 'fas fa-info-circle',
    bgColor: 'bg-primary-500',
    textColor: 'text-primary-800'
  },
  success: {
    icon: 'fas fa-check-circle', 
    bgColor: 'bg-success-500',
    textColor: 'text-success-800'
  },
  warning: {
    icon: 'fas fa-exclamation-triangle',
    bgColor: 'bg-warning-500', 
    textColor: 'text-warning-800'
  },
  error: {
    icon: 'fas fa-times-circle',
    bgColor: 'bg-danger-500',
    textColor: 'text-danger-800'
  }
};
```

#### 🎨 **Características**
- ✅ **Diferentes tipos** de notificación
- ✅ **Estados leído/no leído**
- ✅ **Timestamps** relativos
- ✅ **Scroll interno** para muchas notificaciones
- ✅ **Marcar todas** como leídas

---

### 6. **Toast.js** - Sistema de Notificaciones Toast

#### 📍 **Ubicación**: `src/components/UI/Toast.js`

#### 🎯 **Propósito**
Sistema de notificaciones toast que aparecen temporalmente en la esquina superior derecha.

#### 🍞 **Tipos de Toast**
```javascript
const toastTypes = {
  success: {
    borderColor: 'border-success-500',
    icon: 'fas fa-check-circle',
    iconColor: 'text-success-500'
  },
  error: {
    borderColor: 'border-danger-500', 
    icon: 'fas fa-times-circle',
    iconColor: 'text-danger-500'
  },
  warning: {
    borderColor: 'border-warning-500',
    icon: 'fas fa-exclamation-triangle', 
    iconColor: 'text-warning-500'
  },
  info: {
    borderColor: 'border-primary-500',
    icon: 'fas fa-info-circle',
    iconColor: 'text-primary-500'
  }
};
```

#### 🎨 **Características**
- ✅ **Auto-dismiss** después de 3 segundos
- ✅ **Animaciones** de entrada y salida
- ✅ **Stack de toasts** múltiples
- ✅ **Cierre manual** con botón X
- ✅ **Integración con BankContext**

---

### 7. **Breadcrumbs.js** - Navegación de Migas

#### 📍 **Ubicación**: `src/components/UI/Breadcrumbs.js`

#### 🎯 **Propósito**
Componente de navegación que muestra la ruta actual del usuario en la aplicación.

#### 📊 **Props**
```javascript
{
  items: [
    {
      label: string,     // Texto del breadcrumb
      icon?: string,     // Icono opcional
      active?: boolean,  // Si es el elemento activo
      onClick?: function // Callback opcional para navegación
    }
  ]
}
```

#### 🎨 **Características**
- ✅ **Iconos opcionales** para cada elemento
- ✅ **Estado activo** visual
- ✅ **Navegación clickeable** opcional
- ✅ **Separadores** automáticos
- ✅ **Responsive** con texto truncado

---

## 🎨 Estilos Asociados

### 📁 **Archivo CSS Principal**
`src/styles/components/UI.css`

### 🎯 **Clases Principales**
```css
/* Modales */
.modal-overlay
.modal-content
.modal-header / .modal-body / .modal-footer

/* Toast */
.toast-container
.toast-success / .toast-error / .toast-warning / .toast-info

/* Dropdowns */
.dropdown-container
.dropdown-menu
.dropdown-item

/* Breadcrumbs */
.breadcrumb-container
.breadcrumb-item
.breadcrumb-active

/* Search */
.search-container
.search-input
.search-results

/* Notifications */
.notification-panel
.notification-item
.notification-unread

/* Forms */
.form-group
.form-label
.form-input / .form-select / .form-textarea

/* Buttons */
.btn-primary / .btn-secondary / .btn-success / .btn-danger
```

---

## 🔄 Integración con Contextos

### 🏦 **BankContext Integration**
```javascript
// Toast notifications
const { actions } = useBank();
actions.showToast('Mensaje', 'success');

// Search functionality
const searchResults = Object.values(state.clients)
  .filter(client => 
    client.nombre.toLowerCase().includes(query.toLowerCase()) ||
    client.cedula.includes(query) ||
    client.email.toLowerCase().includes(query.toLowerCase())
  );
```

### 🔐 **AuthContext Integration**
```javascript
// Profile dropdown
const { user, logout } = useAuth();

// User information display
<p>{user?.nombre || 'Usuario'}</p>
<p>{user?.email || 'usuario@bancoexpres.com'}</p>
```

---

## 🚀 Uso y Ejemplos

### 📝 **Implementación de Modal**
```jsx
// Estado del modal
const [showModal, setShowModal] = useState(false);

// Renderizado
<FiltersModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onApplyFilters={(filters) => {
    console.log('Filtros aplicados:', filters);
    setShowModal(false);
  }}
/>
```

### 🍞 **Uso de Toast**
```javascript
// Desde cualquier componente con BankContext
const { actions } = useBank();

// Mostrar toast
actions.showToast('Operación exitosa', 'success');
actions.showToast('Error en la operación', 'error');
actions.showToast('Advertencia importante', 'warning');
actions.showToast('Información relevante', 'info');
```

### 🔍 **Implementación de Búsqueda**
```jsx
// En Header.js
<div className="flex-1 max-w-md">
  <SearchBar />
</div>
```

---

## 🔧 Mantenimiento

### ✅ **Buenas Prácticas**
1. **Mantener consistencia** en animaciones y transiciones
2. **Usar PropTypes** o TypeScript para validación
3. **Implementar loading states** en componentes async
4. **Mantener accesibilidad** con ARIA labels y keyboard navigation

### 🐛 **Troubleshooting Común**
- **Modales no cierran**: Verificar event propagation con stopPropagation()
- **Toast no aparecen**: Verificar BankContext connection
- **Dropdown se cierra**: Verificar click outside detection
- **Search no funciona**: Verificar debounce implementation

### 🔄 **Actualizaciones Futuras**
- [ ] Componente de paginación reutilizable
- [ ] Sistema de tooltips avanzado
- [ ] Componente de date picker personalizado
- [ ] Sistema de drag & drop
- [ ] Componente de data table avanzado

---

**📅 Última actualización**: Diciembre 26, 2024  
**👥 Mantenido por**: Banco Exprés Development Team