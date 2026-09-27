import React from 'react';

const KPICards = ({ stats }) => {
  const totalBalance = stats?.balancesByType?.reduce((sum, item) => sum + parseFloat(item.total || 0), 0) || 0;

  const kpis = [
    {
      title: 'Saldo en Custodia',
      value: `$${totalBalance.toLocaleString('es-CO')}`,
      change: '+12.5%',
      period: 'vs. mes anterior',
      positive: true,
      icon: 'fas fa-vault',
      theme: {
        iconBg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
        badge: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/40',
        borderAccent: 'group-hover:border-emerald-500/40'
      }
    },
    {
      title: 'Operaciones Totales',
      value: (stats?.totalOperations || 0).toLocaleString('es-CO'),
      change: '+8.7%',
      period: 'este mes',
      positive: true,
      icon: 'fas fa-arrow-right-arrow-left',
      theme: {
        iconBg: 'bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400',
        badge: 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 border-teal-200/60 dark:border-teal-800/40',
        borderAccent: 'group-hover:border-teal-500/40'
      }
    },
    {
      title: 'Clientes Activos',
      value: (stats?.totalClients || 0).toLocaleString('es-CO'),
      change: '+15.3%',
      period: 'últimos 30 días',
      positive: true,
      icon: 'fas fa-users',
      theme: {
        iconBg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
        badge: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
        borderAccent: 'group-hover:border-slate-400/40'
      }
    },
    {
      title: 'Salud de Cuentas',
      value: stats?.balancesByType?.length ? `${stats.balancesByType.length} carteras` : '100% activas',
      change: 'Sin bloqueos',
      period: 'estado óptimo',
      positive: true,
      icon: 'fas fa-shield-halved',
      theme: {
        iconBg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
        badge: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/40',
        borderAccent: 'group-hover:border-emerald-500/40'
      }
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, idx) => (
        <div
          key={idx}
          className={`neobank-card p-5 group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${kpi.theme.borderAccent}`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {kpi.title}
            </span>
            <div className={`w-9 h-9 rounded-xl ${kpi.theme.iconBg} flex items-center justify-center text-sm shadow-xs transition-transform duration-300 group-hover:scale-105`}>
              <i className={kpi.icon}></i>
            </div>
          </div>

          <div className="text-2xl sm:text-[26px] font-bold text-slate-900 dark:text-white tabular-nums tracking-tight mb-3">
            {kpi.value}
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${kpi.theme.badge}`}>
              <i className="fas fa-arrow-trend-up text-[9px]"></i>
              {kpi.change}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              {kpi.period}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;