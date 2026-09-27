/**
 * APLICACIÓN PRINCIPAL - BANCO EXPRÉS DASHBOARD
 * =============================================
 * 
 * Componente raíz de la aplicación del dashboard bancario.
 * Maneja la autenticación, navegación entre secciones, tema oscuro/claro,
 * y la estructura general de la aplicación.
 * 
 * @author Banco Exprés Development Team
 * @version 1.0.0
 * @created 2024-12-26
 * 
 * CARACTERÍSTICAS PRINCIPALES:
 * - Sistema de autenticación completo
 * - Navegación entre 8 secciones principales
 * - Tema oscuro/claro con persistencia
 * - Sidebar responsive con hamburger menu
 * - Gestión de estado con Context API
 * - Diseño mobile-first
 */

import { useState, useEffect } from 'react';

// Importar componentes de layout
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';

// Importar componentes de secciones principales
import Dashboard from './components/Dashboard/Dashboard';
import ClientsSection from './components/Clients/ClientsSection';
import AccountsSection from './components/Accounts/AccountsSection';
import TransactionsSection from './components/Transactions/TransactionsSection';
import CreditsSection from './components/Credits/CreditsSection';
import PaymentsSection from './components/Payments/PaymentsSection';
import ReportsSection from './components/Reports/ReportsSection';
import ConfigurationSection from './components/Configuration/ConfigurationSection';
import AuditSection from './components/Admin/AuditSection';

// Importar componentes de cliente
import CustomerDashboard from './components/Customer/CustomerDashboard';
import CustomerAccounts from './components/Customer/CustomerAccounts';
import CustomerTransfers from './components/Customer/CustomerTransfers';
import CustomerRecharge from './components/Customer/CustomerRecharge';

// Importar componentes de autenticación y UI
import AuthPage from './components/Auth/AuthPage';
import Toast from './components/UI/Toast';
import NotificationModal from './components/UI/NotificationModal';

// Importar contextos para gestión de estado
import { BankProvider } from './context/BankContext';
import { AuthProvider, useAuth } from './context/AuthContext';

/**
 * COMPONENTE PRINCIPAL DE LA APLICACIÓN
 * ====================================
 * 
 * Maneja toda la lógica de la aplicación incluyendo:
 * - Estado de autenticación
 * - Navegación entre secciones
 * - Control del sidebar (colapso/apertura)
 * - Tema oscuro/claro
 * - Responsive design
 */
function AppContent() {
  // Obtener estado de autenticación y usuario del contexto
  const { isAuthenticated, user } = useAuth();
  
  // Estados locales para la UI
  const [activeSection, setActiveSection] = useState('dashboard'); // Sección activa actual
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Estado de colapso del sidebar (desktop)
  const [sidebarOpen, setSidebarOpen] = useState(false); // Estado de apertura del sidebar (mobile)
  
  // Estado del tema oscuro con persistencia en localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  /**
   * EFECTO: Persistencia del tema oscuro
   * ===================================
   * 
   * Guarda la preferencia del tema en localStorage y aplica
   * la clase 'dark' al elemento HTML para Tailwind CSS.
   */
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  /**
   * EFECTO: Redirección según rol
   * =============================
   * 
   * Asegura que los clientes vayan a "mi-resumen" y los admins a "dashboard"
   * como su página de inicio.
   */
  useEffect(() => {
    if (user) {
      if (user.role === 'user' && activeSection === 'dashboard') {
        setActiveSection('mi-resumen');
      } else if (user.role === 'admin' && activeSection === 'mi-resumen') {
        setActiveSection('dashboard');
      }
    }
  }, [user, activeSection]);

  /**
   * FUNCIÓN: Toggle del Sidebar
   * ===========================
   * 
   * Maneja la apertura/cierre del sidebar de forma responsive:
   * - En mobile (≤992px): Abre/cierra overlay
   * - En desktop (>992px): Colapsa/expande sidebar
   */
  const toggleSidebar = () => {
    if (window.innerWidth <= 992) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  /**
   * FUNCIÓN: Cerrar Sidebar
   * =======================
   * 
   * Cierra el sidebar en modo mobile (usado cuando se hace clic en overlay)
   */
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  /**
   * FUNCIÓN: Renderizar Sección Activa
   * ==================================
   * 
   * Renderiza el componente correspondiente a la sección seleccionada.
   * Utiliza un switch para determinar qué componente mostrar.
   */
  const renderActiveSection = () => {
    const isAdmin = user?.role === 'admin';

    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveSection} />;
      case 'creditos':
        return isAdmin ? <CreditsSection /> : <Dashboard onNavigate={setActiveSection} />;
      case 'clientes':
        return isAdmin ? <ClientsSection /> : <Dashboard onNavigate={setActiveSection} />;
      case 'cuentas':
        return isAdmin ? <AccountsSection /> : <Dashboard onNavigate={setActiveSection} />;
      case 'transacciones':
        return isAdmin ? <TransactionsSection /> : <Dashboard onNavigate={setActiveSection} />;
      case 'pagos':
        return isAdmin ? <PaymentsSection /> : <Dashboard onNavigate={setActiveSection} />;
      case 'reportes':
        return isAdmin ? <ReportsSection /> : <Dashboard onNavigate={setActiveSection} />;
      case 'audit':
        return isAdmin ? <AuditSection /> : <Dashboard onNavigate={setActiveSection} />;
      case 'configuracion':
        return <ConfigurationSection />; // Ambos pueden ver configuracion
      
      // Secciones de Cliente
      case 'mi-resumen':
        return !isAdmin ? <CustomerDashboard onNavigate={setActiveSection} /> : <Dashboard onNavigate={setActiveSection} />;
      case 'mis-cuentas':
        return !isAdmin ? <CustomerAccounts onNavigate={setActiveSection} /> : <Dashboard onNavigate={setActiveSection} />;
      case 'transferencias':
        return !isAdmin ? <CustomerTransfers /> : <Dashboard onNavigate={setActiveSection} />;
      case 'recargar-cuenta':
        return !isAdmin ? <CustomerRecharge /> : <Dashboard onNavigate={setActiveSection} />;
      case 'pagar-servicios':
        return !isAdmin ? <PaymentsSection /> : <Dashboard onNavigate={setActiveSection} />;
        
      default:
        return <Dashboard onNavigate={setActiveSection} />; // Fallback al dashboard
    }
  };

  /**
   * RENDERIZADO CONDICIONAL: Página de Autenticación
   * ================================================
   * 
   * Si el usuario no está autenticado, muestra la página de login/registro
   */
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

  /**
   * RENDERIZADO PRINCIPAL: Dashboard Bancario
   * =========================================
   * 
   * Estructura principal de la aplicación cuando el usuario está autenticado:
   * - Overlay para mobile
   * - Sidebar de navegación
   * - Header con controles
   * - Contenido principal
   * - Sistema de toasts
   */
  return (
    <BankProvider>
      <div className={`min-h-screen bg-slate-50/80 dark:bg-slate-950 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
        
        {/* Overlay del Sidebar para Mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeSidebar}
            aria-label="Cerrar menú"
          />
        )}

        {/* Sidebar de Navegación */}
        <Sidebar
          collapsed={sidebarCollapsed}
          open={sidebarOpen}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onClose={closeSidebar}
        />

        {/* Contenido Principal */}
        <div className={`transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'
        }`}>
          
          {/* Header Superior */}
          <Header
            onToggleSidebar={toggleSidebar}
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
            sidebarCollapsed={sidebarCollapsed}
            onNavigateToConfig={() => setActiveSection('configuracion')}
          />

          {/* Contenido de la Página */}
          <main className="p-2 xs:p-3 sm:p-4 lg:p-6 xl:p-8">
            {renderActiveSection()}
          </main>
        </div>

        {/* Contenedor de Toasts para Notificaciones */}
        <Toast />
        
        {/* Modal para Notificaciones en tiempo real */}
        <NotificationModal />
      </div>
    </BankProvider>
  );
}

/**
 * COMPONENTE WRAPPER: Proveedor de Autenticación
 * ==============================================
 * 
 * Envuelve toda la aplicación con el AuthProvider para
 * proporcionar el contexto de autenticación a todos los componentes.
 */
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;