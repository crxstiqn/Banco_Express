/**
 * COMPONENTE HEADER - BARRA SUPERIOR
 * ==================================
 * 
 * Header principal del dashboard con controles de navegación,
 * búsqueda, notificaciones, tema y información contextual.
 * 
 * @author Banco Exprés Development Team
 * @version 1.0.0
 * @created 2024-12-26
 * 
 * CARACTERÍSTICAS:
 * - Botón hamburguesa para toggle del sidebar
 * - Barra de búsqueda global integrada
 * - Toggle de tema oscuro/claro
 * - Panel de notificaciones
 * - Menú de perfil de usuario
 * - Fecha y hora en tiempo real
 * - Ubicación del banco (Cúcuta)
 * - Modal de filtros funcional
 * - Diseño responsive completo
 */

import React, { useState, useEffect } from 'react';
import SearchBar from '../UI/SearchBar';
import NotificationPanel from '../UI/NotificationPanel';
import ProfileDropdown from '../UI/ProfileDropdown';
import FiltersModal from '../UI/FiltersModal';
import { useBank } from '../../context/BankContext';

/**
 * COMPONENTE HEADER
 * =================
 * 
 * @param {function} onToggleSidebar - Callback para toggle del sidebar
 * @param {boolean} darkMode - Estado actual del tema oscuro
 * @param {function} onToggleDarkMode - Callback para cambiar tema
 * @param {boolean} sidebarCollapsed - Estado de colapso del sidebar
 * @param {function} onNavigateToConfig - Callback para ir a configuración
 */
const Header = ({ onToggleSidebar, darkMode, onToggleDarkMode, sidebarCollapsed, onNavigateToConfig }) => {
  // Estados locales del componente
  const [currentTime, setCurrentTime] = useState(new Date()); // Tiempo actual
  const [showNotifications, setShowNotifications] = useState(false); // Panel de notificaciones
  const [showFilters, setShowFilters] = useState(false); // Modal de filtros
  const { state } = useBank();
  
  const notificationsCount = state.notifications?.length || 0;

  /**
   * EFECTO: Reloj en Tiempo Real
   * ============================
   * 
   * Actualiza la fecha y hora cada segundo para mostrar
   * información en tiempo real en el header.
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup: limpiar el timer al desmontar el componente
    return () => clearInterval(timer);
  }, []);

  /**
   * FUNCIÓN: Formatear Fecha
   * ========================
   * 
   * Formatea la fecha en español colombiano con formato completo.
   * 
   * @param {Date} date - Objeto Date a formatear
   * @returns {string} - Fecha formateada (ej: "lunes, 26 de diciembre de 2024")
   */
  const formatDate = (date) => {
    return date.toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  /**
   * FUNCIÓN: Formatear Hora
   * =======================
   * 
   * Formatea la hora en formato 24 horas con segundos.
   * 
   * @param {Date} date - Objeto Date a formatear
   * @returns {string} - Hora formateada (ej: "14:30:25")
   */
  const formatTime = (date) => {
    return date.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  /**
   * FUNCIÓN: Aplicar Filtros
   * ========================
   * 
   * Maneja la aplicación de filtros desde el modal.
   * 
   * @param {Object} filters - Objeto con los filtros seleccionados
   */
  const handleApplyFilters = (filters) => {
    // Aquí se implementaría la lógica para aplicar los filtros
  };

  return (
    <>
      <header className="glass-header sticky top-0 z-30 transition-colors duration-200 px-2 xs:px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          
          {/* SECCIÓN IZQUIERDA */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-1">
            
            {/* BOTÓN HAMBURGUESA */}
            <button
              onClick={onToggleSidebar}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Toggle sidebar"
              title="Abrir/cerrar menú"
            >
              {/* Icono hamburguesa animado */}
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex flex-col justify-center items-center">
                <span className={`block h-0.5 w-full bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${sidebarCollapsed ? 'rotate-45 translate-y-1' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-gray-600 dark:bg-gray-300 transition-all duration-300 my-1 ${sidebarCollapsed ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${sidebarCollapsed ? '-rotate-45 -translate-y-1' : ''}`}></span>
              </div>
            </button>

            {/* LOGO MOBILE */}
            <div className="lg:hidden flex items-center">
              <img 
                src="/img/logo/logo.jpeg" 
                alt="Logo" 
                className="w-8 h-8 object-contain rounded"
              />
            </div>

            {/* BARRA DE BÚSQUEDA */}
            <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md hidden xs:block">
              <SearchBar />
            </div>
          </div>

          {/* SECCIÓN DERECHA */}
          <div className="flex items-center gap-1 xs:gap-2 sm:gap-3 lg:gap-4">
            
            {/* UBICACIÓN (Oculta en mobile y small tablets) */}
            <div className="hidden md:flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              <i className="fas fa-map-marker-alt text-primary-500" title="Ubicación"></i>
              <span className="hidden lg:inline">Cúcuta, Norte de Santander</span>
              <span className="lg:hidden">Cúcuta</span>
            </div>

            {/* FECHA Y HORA (Oculta en mobile y tablets) */}
            <div className="hidden xl:flex flex-col items-end text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">{formatDate(currentTime)}</span>
              <span className="text-xs">{formatTime(currentTime)}</span>
            </div>

            {/* TOGGLE DE TEMA OSCURO/CLARO */}
            <button
              onClick={onToggleDarkMode}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Toggle dark mode"
              title={darkMode ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            >
              <i className={`${darkMode ? 'fas fa-sun text-yellow-500' : 'fas fa-moon text-gray-600 dark:text-gray-300'} text-sm sm:text-base lg:text-lg`}></i>
            </button>

            {/* MENÚ DE PERFIL DE USUARIO */}
            <ProfileDropdown onNavigateToConfig={onNavigateToConfig} />

            {/* PANEL DE NOTIFICACIONES */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 relative"
                aria-label="Notifications"
                title="Notificaciones"
              >
                <i className="fas fa-bell text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300"></i>
                {/* Badge de notificaciones pendientes */}
                {notificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-danger-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {notificationsCount > 9 ? '9+' : notificationsCount}
                  </span>
                )}
              </button>

              {/* Panel de notificaciones (condicional) */}
              {showNotifications && (
                <NotificationPanel onClose={() => setShowNotifications(false)} />
              )}
            </div>

            {/* BOTÓN DE FILTROS (Oculto en mobile y small tablets) */}
            <button 
              onClick={() => setShowFilters(true)}
              className="hidden md:flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              title="Abrir filtros"
              aria-label="Filtros"
            >
              <i className="fas fa-filter text-sm"></i>
              <span className="text-xs sm:text-sm font-medium hidden lg:inline">Filtros</span>
            </button>
          </div>
        </div>
      </header>

      {/* MODAL DE FILTROS */}
      <FiltersModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApplyFilters={handleApplyFilters}
      />
    </>
  );
};

export default Header;