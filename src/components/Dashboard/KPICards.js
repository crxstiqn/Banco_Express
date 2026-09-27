import React from 'react';

const KPICards = ({ stats }) => {
  const dynamicBalance = stats?.balancesByType?.reduce((sum, item) => sum + parseFloat(item.total || 0), 0) || 0;
  const totalBalance = dynamicBalance > 0 ? dynamicBalance : 27175500;
  const totalOps = stats?.totalOperations || 14;
  const totalClients = stats?.totalClients || 7;
  const totalPortfolios = stats?.balancesByType?.length || 2;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* Card 1: Saldo en Custodia */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              SALDO EN CUSTODIA
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-[#047857] dark:text-emerald-400 flex items-center justify-center text-xs">
              <i className="fas fa-chevron-right text-[10px]"></i>
            </div>
          </div>

          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
              ${totalBalance.toLocaleString('es-CO')}
            </span>
            <span className="text-xs font-semibold text-slate-400">COP</span>
          </div>

          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800/40">
            <i className="fas fa-arrow-up text-[9px]"></i>
            <span>+12.5%</span>
            <span className="font-normal text-slate-500 dark:text-slate-400 ml-0.5">vs. mes anterior</span>
          </div>
        </div>

        {/* Emerald Sparkline Area Chart */}
        <div className="mt-4 pt-2">
          <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
            <defs>
              <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#047857" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 0,22 Q 15,20 25,23 T 45,18 T 65,20 T 80,14 T 100,10 L 100,25 L 0,25 Z"
              fill="url(#emeraldGrad)"
            />
            <path
              d="M 0,22 Q 15,20 25,23 T 45,18 T 65,20 T 80,14 T 100,10"
              fill="none"
              stroke="#047857"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Card 2: Operaciones Totales */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              OPERACIONES TOTALES
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-[#047857] dark:text-emerald-400 flex items-center justify-center text-xs">
              <i className="fas fa-arrows-rotate text-xs"></i>
            </div>
          </div>

          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
              {totalOps}
            </span>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">procesadas</span>
          </div>

          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800/40">
            <i className="fas fa-arrow-trend-up text-[9px]"></i>
            <span>+8.7%</span>
            <span className="font-normal text-slate-500 dark:text-slate-400 ml-0.5">este mes</span>
          </div>
        </div>

        {/* Split emerald progress bar */}
        <div className="mt-4 pt-2">
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium mb-1">
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">9 Depósitos</span>
            <span>5 Débitos</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
            <div className="w-[64%] h-full bg-[#047857] rounded-l-full"></div>
            <div className="w-[36%] h-full bg-emerald-400 rounded-r-full"></div>
          </div>
        </div>
      </div>

      {/* Card 3: Clientes Activos */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              CLIENTES ACTIVOS
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-[#047857] dark:text-emerald-400 flex items-center justify-center text-xs">
              <i className="fas fa-user-group text-xs"></i>
            </div>
          </div>

          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
              {totalClients}
            </span>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">cuentahabientes</span>
          </div>

          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800/40">
            <i className="fas fa-user-plus text-[9px]"></i>
            <span>+15.3%</span>
            <span className="font-normal text-slate-500 dark:text-slate-400 ml-0.5">últimos 30 días</span>
          </div>
        </div>

        {/* Emerald Sparkline SVG */}
        <div className="mt-4 pt-2">
          <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
            <path
              d="M 0,22 Q 25,20 40,18 T 70,16 T 100,10"
              fill="none"
              stroke="#047857"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Card 4: Salud de Cuentas */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              SALUD DE CUENTAS
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-[#047857] dark:text-emerald-400 flex items-center justify-center text-xs">
              <i className="fas fa-shield-check text-xs"></i>
            </div>
          </div>

          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
              {totalPortfolios}
            </span>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">carteras activas</span>
          </div>

          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-0.5"></span>
            <span>Sin bloqueos</span>
            <span className="text-emerald-600 dark:text-emerald-400">•</span>
            <span>100% óptimo</span>
          </div>
        </div>

        {/* Footer: Fogafin / Sarlaft */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px]">
          <span className="text-slate-400">Fogafín Asegurado</span>
          <span className="font-extrabold text-[#047857] dark:text-emerald-400 uppercase tracking-wider">
            Cumple SARLAFT
          </span>
        </div>
      </div>

    </div>
  );
};

export default KPICards;