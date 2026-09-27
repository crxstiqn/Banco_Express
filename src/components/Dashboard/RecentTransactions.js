import React, { useState } from 'react';

const RecentTransactions = ({ stats, onNavigate }) => {
  const [filterType, setFilterType] = useState('Todas');
  const recentTransactions = stats?.recentTransactions || [];

  const filteredTransactions = recentTransactions.filter(tx => {
    if (filterType === 'Todas') return true;
    return tx.type === filterType;
  });

  const getTransactionBadge = (tipo) => {
    switch (tipo) {
      case 'Depósito':
        return 'bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/40';
      case 'Retiro':
        return 'bg-rose-50/90 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200/60 dark:border-rose-800/40';
      case 'Transferencia':
        return 'bg-teal-50/90 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border-teal-200/60 dark:border-teal-800/40';
      case 'Pago':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const types = ['Todas', 'Depósito', 'Retiro', 'Transferencia', 'Pago'];

  return (
    <div className="neobank-card overflow-hidden">
      {/* Header and Filter Bar */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Libro de Movimientos Recientes
            </h3>
            <span className="text-[11px] font-medium text-slate-400">
              ({filteredTransactions.length} registros)
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Historial de auditoría inmediata del sistema bancario
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Minimalist Filter Pills */}
          <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 overflow-x-auto">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  filterType === t
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button 
            onClick={() => onNavigate && onNavigate('transacciones')}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1 transition-colors shrink-0"
          >
            <span>Ver todo</span>
            <i className="fas fa-arrow-right text-[10px]"></i>
          </button>
        </div>
      </div>

      {/* Clean Neobank Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
          <thead className="bg-slate-50/75 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-5">Fecha / Hora</th>
              <th className="py-3 px-5">Titular</th>
              <th className="py-3 px-5">Operación</th>
              <th className="py-3 px-5">Detalle o Concepto</th>
              <th className="py-3 px-5 text-right">Monto (COP)</th>
              <th className="py-3 px-5 text-center">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => {
                const isPositive = tx.type === 'Depósito' || tx.type === 'Transferencia';
                const initials = (tx.client_name || 'U')
                  .split(' ')
                  .map(n => n[0])
                  .slice(0, 2)
                  .join('');

                return (
                  <tr key={tx.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-5 whitespace-nowrap text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      {new Date(tx.created_at).toLocaleDateString('es-CO', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0 uppercase">
                          {initials}
                        </div>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {tx.client_name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getTransactionBadge(tx.type)}`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-500 dark:text-slate-400 max-w-xs truncate">
                      {tx.description || 'Sin concepto registrado'}
                    </td>
                    <td className={`py-3.5 px-5 text-right font-bold tabular-nums whitespace-nowrap text-xs ${
                      isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
                    }`}>
                      {isPositive ? '+' : '-'}${parseFloat(tx.amount || 0).toLocaleString('es-CO')}
                    </td>
                    <td className="py-3.5 px-5 text-center whitespace-nowrap">
                      <span className="neobank-badge-emerald text-[10px] py-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Completado
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="py-10 text-center text-slate-400 text-xs">
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <i className="fas fa-folder-open text-slate-300 dark:text-slate-600 text-lg"></i>
                    <p>No se encontraron movimientos registrados para este filtro</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;