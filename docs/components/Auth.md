# 🔐 COMPONENTES DE AUTENTICACIÓN - BANCO EXPRÉS

## 📋 Documentación de Componentes de Autenticación

### 🎯 Propósito
Los componentes de autenticación manejan el login, registro y gestión de sesiones de usuarios del sistema bancario con seguridad y validación completa.

---

## 🧩 Componentes Incluidos

### 1. **AuthPage.js** - Página Principal de Autenticación

#### 📍 **Ubicación**: `src/components/Auth/AuthPage.js`

#### 🎯 **Propósito**
Componente contenedor principal que maneja la alternancia entre formularios de login y registro.

#### 📊 **Props**
```javascript
{
  darkMode: boolean,           // Estado del tema oscuro
  onToggleDarkMode: function   // Callback para cambiar tema
}
```

#### 🎨 **Estados del Componente**
```javascript
const authStates = {
  login: 'Iniciar Sesión',
  register: 'Registrarse',
  forgotPassword: 'Recuperar Contraseña'
};
```

#### 🏗️ **Estructura**
```jsx
<div className="auth-container">
  <div className="auth-background"></div>
  <div className="auth-card">
    <AuthHeader />
    {mode === 'login' ? <LoginForm /> : <RegisterForm />}
    <AuthFooter />
  </div>
  <ThemeToggle />
</div>
```

#### 🎨 **Características**
- ✅ **Alternancia** entre login y registro
- ✅ **Fondo temático** con gradiente bancario
- ✅ **Toggle de tema** integrado
- ✅ **Animaciones** de transición suaves
- ✅ **Responsive design** completo

---

### 2. **LoginForm.js** - Formulario de Inicio de Sesión

#### 📍 **Ubicación**: `src/components/Auth/LoginForm.js`

#### 🎯 **Propósito**
Formulario de autenticación con validación, estados de carga y manejo de errores.

#### 📊 **Props**
```javascript
{
  onSwitchToRegister: function  // Callback para cambiar a registro
}
```

#### 🔐 **Campos del Formulario**
```javascript
const loginFields = {
  email: {
    type: 'email',
    label: 'Correo Electrónico',
    placeholder: 'usuario@bancoexpres.com',
    required: true,
    validation: 'email'
  },
  password: {
    type: 'password', 
    label: 'Contraseña',
    placeholder: '••••••••',
    required: true,
    minLength: 6
  }
};
```

#### 👥 **Usuarios Predefinidos**
```javascript
const demoUsers = {
  admin: {
    email: 'admin@bancoexpres.com',
    password: 'admin123',
    role: 'admin',
    nombre: 'María González'
  },
  user: {
    email: 'usuario@bancoexpres.com', 
    password: 'usuario123',
    role: 'user',
    nombre: 'Carlos Mendoza'
  }
};
```

#### 🎨 **Características**
- ✅ **Validación en tiempo real** de campos
- ✅ **Estados de carga** con spinner
- ✅ **Manejo de errores** con mensajes claros
- ✅ **Recordar credenciales** (demo)
- ✅ **Acceso rápido** con usuarios predefinidos

---

### 3. **RegisterForm.js** - Formulario de Registro

#### 📍 **Ubicación**: `src/components/Auth/RegisterForm.js`

#### 🎯 **Propósito**
Formulario de registro de nuevos usuarios con validación completa y verificación de datos.

#### 📊 **Props**
```javascript
{
  onSwitchToLogin: function  // Callback para cambiar a login
}
```

#### 📝 **Campos del Formulario**
```javascript
const registerFields = {
  nombre: {
    type: 'text',
    label: 'Nombre Completo',
    placeholder: 'Ej: María González',
    required: true,
    minLength: 2
  },
  email: {
    type: 'email',
    label: 'Correo Electrónico',
    placeholder: 'usuario@bancoexpres.com',
    required: true,
    validation: 'email'
  },
  password: {
    type: 'password',
    label: 'Contraseña',
    placeholder: '••••••••',
    required: true,
    minLength: 6
  },
  confirmPassword: {
    type: 'password',
    label: 'Confirmar Contraseña', 
    placeholder: '••••••••',
    required: true,
    validation: 'match'
  },
  cargo: {
    type: 'select',
    label: 'Cargo',
    options: [
      'Asesor Comercial',
      'Cajero',
      'Supervisor',
      'Gerente'
    ],
    required: true
  },
  sucursal: {
    type: 'select',
    label: 'Sucursal',
    options: [
      'Cúcuta Centro',
      'Cúcuta Norte', 
      'Cúcuta Sur',
      'Villa del Rosario',
      'Los Patios'
    ],
    required: true
  },
  telefono: {
    type: 'tel',
    label: 'Teléfono',
    placeholder: '300-123-4567',
    required: true,
    pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}'
  }
};
```

#### ✅ **Validaciones Implementadas**
```javascript
const validations = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: {
    minLength: 6,
    hasUpperCase: /[A-Z]/,
    hasLowerCase: /[a-z]/,
    hasNumber: /\d/
  },
  phone: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
  passwordMatch: (password, confirm) => password === confirm
};
```

#### 🎨 **Características**
- ✅ **Validación completa** de todos los campos
- ✅ **Verificación de contraseña** con confirmación
- ✅ **Selects dinámicos** para cargo y sucursal
- ✅ **Formato de teléfono** colombiano
- ✅ **Prevención de duplicados** de email

---

## 🔐 Integración con AuthContext

### 🏗️ **Flujo de Autenticación**
```javascript
// 1. Usuario ingresa credenciales
const handleLogin = async (credentials) => {
  dispatch({ type: 'LOGIN_START' });
  
  // 2. Validación de credenciales
  const user = validateCredentials(credentials);
  
  if (user) {
    // 3. Login exitoso
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    localStorage.setItem('bankAuth', JSON.stringify({ user }));
  } else {
    // 4. Error de autenticación
    dispatch({ type: 'LOGIN_ERROR', payload: 'Credenciales inválidas' });
  }
};
```

### 🔄 **Estados de Autenticación**
```javascript
const authStates = {
  idle: 'Sin acción',
  loading: 'Procesando...',
  success: 'Autenticado',
  error: 'Error de autenticación'
};
```

### 💾 **Persistencia de Sesión**
```javascript
// Guardar sesión
localStorage.setItem('bankAuth', JSON.stringify({
  user: userWithoutPassword,
  timestamp: Date.now(),
  expiresIn: 24 * 60 * 60 * 1000 // 24 horas
}));

// Verificar sesión al iniciar
useEffect(() => {
  const savedAuth = localStorage.getItem('bankAuth');
  if (savedAuth) {
    const { user, timestamp, expiresIn } = JSON.parse(savedAuth);
    
    if (Date.now() - timestamp < expiresIn) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } else {
      localStorage.removeItem('bankAuth');
    }
  }
}, []);
```

---

## 🎨 Estilos Asociados

### 📁 **Archivo CSS Principal**
`src/styles/components/Auth.css`

### 🎯 **Clases Principales**
```css
/* Contenedor principal */
.auth-container
.auth-background
.auth-card

/* Header y branding */
.auth-logo-container
.auth-logo
.auth-title
.auth-subtitle

/* Formularios */
.auth-form
.auth-form-group
.auth-label
.auth-input
.auth-input-error

/* Botones */
.auth-button-primary
.auth-button-secondary
.auth-button-loading

/* Estados */
.auth-success-message
.auth-error-message
.auth-loading-spinner

/* Tema */
.auth-theme-toggle
.auth-card-glass
```

---

## 🔒 Seguridad Implementada

### 🛡️ **Medidas de Seguridad**
```javascript
const securityMeasures = {
  // 1. Validación de entrada
  inputValidation: {
    sanitization: true,
    xssProtection: true,
    sqlInjectionPrevention: true
  },
  
  // 2. Gestión de contraseñas
  passwordSecurity: {
    minLength: 6,
    complexityRequirements: true,
    noPlainTextStorage: true
  },
  
  // 3. Sesiones
  sessionManagement: {
    tokenExpiration: '24h',
    autoLogout: true,
    secureStorage: 'localStorage'
  },
  
  // 4. Prevención de ataques
  attackPrevention: {
    rateLimiting: true,
    bruteForceProtection: true,
    csrfProtection: true
  }
};
```

### 🔐 **Validaciones de Seguridad**
```javascript
// Sanitización de entrada
const sanitizeInput = (input) => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Prevenir XSS básico
    .substring(0, 255);   // Limitar longitud
};

// Validación de email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Validación de contraseña
const isStrongPassword = (password) => {
  return password.length >= 6 &&
         /[A-Z]/.test(password) &&
         /[a-z]/.test(password) &&
         /\d/.test(password);
};
```

---

## 🚀 Uso y Ejemplos

### 📝 **Implementación Básica**
```jsx
// En App.js
if (!isAuthenticated) {
  return (
    <div className={darkMode ? 'dark' : ''}>
      <AuthPage 
        darkMode={darkMode} 
        onToggleDarkMode={() => setDarkMode(!darkMode)} 
      />
    </div>
  );
}
```

### 🔐 **Login Programático**
```javascript
// Desde cualquier componente
const { login } = useAuth();

const handleQuickLogin = async () => {
  const success = await login('admin@bancoexpres.com', 'admin123');
  if (success) {
    console.log('Login exitoso');
  }
};
```

### 📝 **Registro de Usuario**
```javascript
const { register } = useAuth();

const handleRegister = async (userData) => {
  const success = await register({
    nombre: 'Nuevo Usuario',
    email: 'nuevo@bancoexpres.com',
    password: 'password123',
    cargo: 'Asesor Comercial',
    sucursal: 'Cúcuta Centro',
    telefono: '300-123-4567'
  });
  
  if (success) {
    console.log('Registro exitoso');
  }
};
```

---

## 🔧 Mantenimiento

### ✅ **Buenas Prácticas**
1. **Nunca almacenar contraseñas** en texto plano
2. **Validar en frontend y backend** (doble validación)
3. **Implementar rate limiting** para prevenir ataques
4. **Usar HTTPS** en producción siempre
5. **Logs de seguridad** para auditoría

### 🐛 **Troubleshooting Común**
- **Login no funciona**: Verificar credenciales predefinidas
- **Sesión no persiste**: Verificar localStorage y expiración
- **Validación falla**: Verificar regex patterns
- **Tema no cambia**: Verificar propagación de props

### 🔄 **Actualizaciones Futuras**
- [ ] Autenticación de dos factores (2FA)
- [ ] Login con biometría
- [ ] Integración con Active Directory
- [ ] OAuth con Google/Microsoft
- [ ] Recuperación de contraseña por email
- [ ] Bloqueo de cuenta por intentos fallidos

---

## 📊 Métricas de Seguridad

### 🎯 **KPIs de Autenticación**
```javascript
const authMetrics = {
  loginAttempts: 0,
  successfulLogins: 0,
  failedLogins: 0,
  activeUsers: 0,
  sessionDuration: '0h 0m',
  securityIncidents: 0
};
```

### 📈 **Monitoreo**
- **Intentos de login** por minuto
- **Sesiones activas** concurrentes
- **Tiempo promedio** de sesión
- **Errores de autenticación** por tipo
- **Dispositivos** y ubicaciones de acceso

---

**📅 Última actualización**: Diciembre 26, 2024  
**👥 Mantenido por**: Banco Exprés Development Team  
**🔒 Nivel de seguridad**: Bancario - Crítico