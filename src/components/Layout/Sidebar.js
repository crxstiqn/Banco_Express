import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ collapsed, open, activeSection, onSectionChange, onClose }) => {
  const { user } = useAuth();
  const currentRole = user?.role || 'user';

  const adminCategories = [
    {
      title: 'OPERACIONES CENTRALES',
      items: [
        { id: 'dashboard', label: 'Dashboard General', icon: 'fas fa-table-columns' },
        { id: 'clientes', label: 'Clientes', icon: 'fas fa-users' },
        { id: 'cuentas', label: 'Cuentas', icon: 'fas fa-wallet' },
        { id: 'transacciones', label: 'Transacciones', icon: 'fas fa-arrow-right-arrow-left' },
        { id: 'creditos', label: 'Créditos', icon: 'fas fa-hand-holding-dollar' },
        { id: 'pagos', label: 'Pagos y Recaudos', icon: 'fas fa-receipt' }
      ]
    },
    {
      title: 'GOBIERNO & CONTROL',
      items: [
        { id: 'reportes', label: 'Reportes', icon: 'fas fa-chart-simple' },
        { id: 'audit', label: 'Auditoría', icon: 'fas fa-shield-halved' },
        { id: 'configuracion', label: 'Configuración', icon: 'fas fa-gear' }
      ]
    }
  ];

  const userCategories = [
    {
      title: 'MI BANCA',
      items: [
        { id: 'mi-resumen', label: 'Mi Resumen', icon: 'fas fa-table-columns' },
        { id: 'mis-cuentas', label: 'Mis Cuentas', icon: 'fas fa-wallet' },
        { id: 'transferencias', label: 'Transferencias', icon: 'fas fa-arrow-right-arrow-left' },
        { id: 'recargar-cuenta', label: 'Recargar Cuenta', icon: 'fas fa-money-bill-wave' },
        { id: 'pagar-servicios', label: 'Pagar Servicios', icon: 'fas fa-receipt' }
      ]
    },
    {
      title: 'AJUSTES',
      items: [
        { id: 'configuracion', label: 'Configuración', icon: 'fas fa-gear' }
      ]
    }
  ];

  const categories = currentRole === 'admin' ? adminCategories : userCategories;

  const handleItemClick = (itemId) => {
    onSectionChange(itemId);
    if (window.innerWidth <= 992) {
      onClose();
    }
  };

  return (
    <>
      <aside className={`
        fixed top-0 left-0 h-full bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 
        shadow-sm z-50 transition-all duration-300 flex flex-col justify-between
        ${collapsed ? 'w-16 xs:w-20' : 'w-64'}
        ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Top Branding */}
        <div>
          <div className={`p-4 sm:p-5 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 ${collapsed ? 'justify-center' : ''}`}>
            <img 
              src="/img/logo/logo.jpeg" 
              alt="Banco Exprés" 
              className="w-9 h-9 rounded-xl object-contain bg-white shadow-xs border border-slate-200/80 dark:border-slate-700 shrink-0"
            />
            {!collapsed && (
              <div>
                <span className="block font-extrabold text-sm tracking-tight text-slate-900 dark:text-white leading-tight">
                  Banco Exprés
                </span>
                <span className="block text-[9px] font-extrabold tracking-widest text-[#047857] dark:text-emerald-400 uppercase mt-0.5">
                  CORE BANCARIO
                </span>
              </div>
            )}
          </div>

          {/* Navigation Categories */}
          <nav className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-210px)] custom-scrollbar">
            {categories.map((cat, catIdx) => (
              <div key={catIdx}>
                {!collapsed && (
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 pb-1.5 pt-1">
                    {cat.title}
                  </p>
                )}
                <div className="space-y-1">
                  {cat.items.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item.id)}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 text-xs
                          ${collapsed ? 'justify-center' : ''}
                          ${isActive
                            ? 'bg-[#047857] text-white font-bold shadow-xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60 font-medium'
                          }
                        `}
                        title={collapsed ? item.label : ''}
                        aria-label={item.label}
                      >
                        <i className={`${item.icon} text-sm ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'} ${collapsed ? '' : 'w-4'}`}></i>
                        {!collapsed && (
                          <span className="truncate">{item.label}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Core Link Status Card */}
        {!collapsed && (
          <div className="p-3 m-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="block text-[9px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                ENLACE CORE
              </span>
              <span className="block text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                Canal Seguro v4.9
              </span>
              <span className="block text-[10px] text-slate-400 dark:text-slate-500">
                Latencia: 18ms
              </span>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/50"></span>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;