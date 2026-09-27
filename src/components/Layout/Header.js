import React, { useState, useEffect } from 'react';
import NotificationPanel from '../UI/NotificationPanel';
import ProfileDropdown from '../UI/ProfileDropdown';
import { useBank } from '../../context/BankContext';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onToggleSidebar, darkMode, onToggleDarkMode, sidebarCollapsed, onNavigateToConfig }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const { state } = useBank();
  const { user } = useAuth();
  
  const notificationsCount = state.notifications?.length || 1;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimeCOT = (date) => {
    return date.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <>
      <header className="sticky top-0 z-30 transition-colors duration-200 px-4 sm:px-6 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Hamburger & Search Bar */}
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle sidebar"
              title="Menú"
            >
              <i className="fas fa-bars text-sm"></i>
            </button>

            {/* Global Search Bar matching screenshot */}
            <div className="relative flex-1 max-w-sm hidden sm:block">
              <div className="flex items-center w-full px-3.5 py-1.5 bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 rounded-xl text-xs text-slate-700 dark:text-slate-200 focus-within:border-emerald-500 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all shadow-2xs">
                <i className="fas fa-magnifying-glass text-slate-400 text-xs mr-2.5"></i>
                <input
                  type="text"
                  placeholder="Buscar por cuenta, cédula, tra..."
                  className="w-full bg-transparent placeholder-slate-400 focus:outline-none text-xs"
                />
                <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          {/* Right: Badges, Time, Notifications, User */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Pill: Sucursal Principal */}
            <div className="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 text-xs font-medium text-slate-700 dark:text-slate-300">
              <i className="fas fa-building-columns text-slate-400 text-xs"></i>
              <span>Sucursal Principal - Cúcuta</span>
            </div>

            {/* Pill: Núcleo en Línea */}
            <div className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Núcleo en Línea</span>
            </div>

            {/* Pill: Reloj COT */}
            <div className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 text-xs font-medium text-slate-600 dark:text-slate-300">
              <i className="far fa-clock text-slate-400 text-xs"></i>
              <span className="font-mono">{formatTimeCOT(currentTime)} COT</span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-label="Toggle dark mode"
            >
              <i className={`fas ${darkMode ? 'fa-sun text-amber-400' : 'fa-moon text-slate-600'} text-xs`}></i>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
                aria-label="Notifications"
                title="Notificaciones"
              >
                <i className="far fa-bell text-sm"></i>
                {notificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {notificationsCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <NotificationPanel onClose={() => setShowNotifications(false)} />
              )}
            </div>

            {/* User Profile Pill matching screenshot */}
            <div className="flex items-center gap-2.5 pl-2 sm:border-l border-slate-200 dark:border-slate-800">
              <div className="hidden sm:block text-right">
                <span className="block text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  {user?.role === 'admin' ? (user?.name || 'Admin. Carlos Mendoza') : (user?.name || 'Cliente')}
                </span>
                <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                  {user?.role === 'admin' ? 'Oficial Operativo Principal' : 'Cuentahabiente Digital'}
                </span>
              </div>
              <ProfileDropdown onNavigateToConfig={onNavigateToConfig} />
            </div>

          </div>
        </div>
      </header>
    </>
  );
};

export default Header;