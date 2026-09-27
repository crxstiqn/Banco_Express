import React from 'react';

const BalanceCards = ({ stats }) => {
  const getBalanceData = (type) => {
    const found = stats?.balancesByType?.find(b => b.type === type);
    return {
      total: found ? parseFloat(found.total || 0) : 0,
      change: found && found.monthly_change !== null ? parseFloat(found.monthly_change) : 0
    };
  };

  const savingsData = getBalanceData('Ahorros');
  const currentData = getBalanceData('Corriente');
  const totalBalance = savingsData.total + currentData.total;

  const savingsPct = totalBalance > 0 ? ((savingsData.total / totalBalance) * 100).toFixed(0) : 50;
  const currentPct = totalBalance > 0 ? (100 - savingsPct).toFixed(0) : 50;
  const topAccounts = stats?.topAccounts || [];

  return (
    <div className="space-y-4">
      {/* Portfolio Distribution Card */}
      <div className="neobank-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Distribución por Cartera
            </h3>
            <p className="text-xl font-bold text-slate-900 dark:text-white tabular-nums tracking-tight mt-0.5">
              ${totalBalance.toLocaleString('es-CO')}
            </p>
          </div>
          <span className="neobank-badge-emerald">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Activo
          </span>
        </div>

        {/* Segmented Neobank Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden flex p-0.5 mb-4 border border-slate-200/50 dark:border-slate-800">
          <div 
            className="bg-emerald-500 h-full rounded-l-full transition-all duration-500" 
            style={{ width: `${savingsPct}%` }}
            title={`Ahorros: ${savingsPct}%`}
          />
          <div 
            className="bg-teal-600 dark:bg-teal-500 h-full rounded-r-full transition-all duration-500" 
            style={{ width: `${currentPct}%` }}
            title={`Corriente: ${currentPct}%`}
          />
        </div>

        {/* Breakdown Items */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs pb-2.5 border-b border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200 block">Cuentas de Ahorros</span>
                <span className="text-[10px] text-slate-400">{savingsPct}% de la cartera</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-900 dark:text-white tabular-nums block">
                ${savingsData.total.toLocaleString('es-CO')}
              </span>
              <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">Garantizado</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600 dark:bg-teal-500 shrink-0"></span>
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200 block">Cuentas Corrientes</span>
                <span className="text-[10px] text-slate-400">{currentPct}% de la cartera</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-900 dark:text-white tabular-nums block">
                ${currentData.total.toLocaleString('es-CO')}
              </span>
              <span className="text-[10px] font-medium text-slate-400">Operativo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Accounts */}
      {topAccounts.length > 0 && (
        <div className="neobank-card p-5">
          <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Mayores Saldos Depositados
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Cuentas con mayor volumen en custodia</p>
            </div>
            <i className="fas fa-arrow-trend-up text-xs text-emerald-500"></i>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {topAccounts.map((acc, idx) => {
              const initials = (acc.client_name || 'U')
                .split(' ')
                .map(n => n[0])
                .slice(0, 2)
                .join('');

              return (
                <div key={acc.id || idx} className="py-2.5 flex items-center justify-between text-xs group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 px-1 rounded-lg transition-colors">
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] flex items-center justify-center shrink-0 uppercase">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {acc.client_name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {acc.account_number}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums shrink-0 text-xs">
                    ${parseFloat(acc.balance || 0).toLocaleString('es-CO')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BalanceCards;