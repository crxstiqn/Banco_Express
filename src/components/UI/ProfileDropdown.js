/**
 * COMPONENTE PROFILE DROPDOWN
 * ===========================
 * 
 * Menú desplegable del perfil de usuario con opciones de
 * configuración, ayuda y cierre de sesión.
 * 
 * @author Banco Exprés Development Team
 * @version 1.0.0
 * @created 2024-12-26
 */

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import HelpModal from './HelpModal';
import { getAvatarUrl } from '../../utils/avatarHelper';

/**
 * COMPONENTE PROFILE DROPDOWN
 * ===========================
 * 
 * @param {function} onNavigateToConfig - Callback para navegar a configuración
 */
const ProfileDropdown = ({ onNavigateToConfig }) => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const dropdownRef = useRef(null);

  /**
   * EFECTO: Cerrar dropdown al hacer clic fuera
   * ===========================================
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /**
   * CONFIGURACIÓN DEL MENÚ
   * ======================
   * 
   * Define los elementos del menú desplegable con sus acciones.
   */
  const menuItems = [
    {
      id: 'profile',
      label: 'Ver Perfil',
      icon: 'fas fa-user',
      action: () => {
        onNavigateToConfig && onNavigateToConfig();
        setIsOpen(false);
      }
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: 'fas fa-cog',
      action: () => {
        onNavigateToConfig && onNavigateToConfig();
        setIsOpen(false);
      }
    },
    {
      id: 'help',
      label: 'Ayuda',
      icon: 'fas fa-question-circle',
      action: () => {
        setShowHelp(true);
        setIsOpen(false);
      }
    },
    {
      id: 'logout',
      label: 'Cerrar Sesión',
      icon: 'fas fa-sign-out-alt',
      action: () => {
        logout();
        setIsOpen(false);
      },
      danger: true
    }
  ];

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* BOTÓN DEL PERFIL */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-9 h-9 rounded-full relative flex items-center justify-center overflow-hidden border-2 border-emerald-500/80 hover:border-emerald-600 transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
          aria-label="Menú de perfil"
          title={user?.nombre || user?.name || 'Perfil'}
        >
          <img
            src={getAvatarUrl(user) || '/profile.avif'}
            alt={user?.nombre || user?.name || 'Foto de perfil'}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="w-full h-full bg-[#047857] text-white flex items-center justify-center text-xs hidden">
            <i className="fas fa-user text-xs"></i>
          </div>
        </button>

        {/* MENÚ DESPLEGABLE */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 animate-fade-in">
            
            {/* HEADER CON INFORMACIÓN DEL USUARIO */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <img
                    src={getAvatarUrl(user) || '/profile.avif'}
                    alt="Foto de perfil"
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 dark:border-emerald-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="w-12 h-12 bg-[#047857] rounded-full flex items-center justify-center text-white text-sm hidden"
                  >
                    <i className="fas fa-user"></i>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {user?.nombre || user?.name || 'Usuario'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email || 'usuario@bancoexpres.com'}
                  </p>
                </div>
              </div>
            </div>

            {/* ELEMENTOS DEL MENÚ */}
            <div className="py-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    item.danger 
                      ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20' 
                      : 'text-gray-700 dark:text-gray-200'
                  }`}
                  title={item.label}
                >
                  <i className={`${item.icon} text-sm w-4`}></i>
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL DE AYUDA */}
      <HelpModal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </>
  );
};

export default ProfileDropdown;