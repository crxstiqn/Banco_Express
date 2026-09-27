import apiFetch from '../../utils/api';
import React, { useState, useEffect, useCallback } from 'react';
import KPICards from './KPICards';
import QuickActions from './QuickActions';
import OperationsChart from './OperationsChart';
import BalanceCards from './BalanceCards';
import RecentTransactions from './RecentTransactions';

const Dashboard = ({ onNavigate }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      const res = await apiFetch('http://localhost:5001/api/dashboard/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[420px] gap-3">
        <div className="w-9 h-9 rounded-full border-2 border-emerald-100 dark:border-emerald-950 border-t-emerald-600 dark:border-t-emerald-400 animate-spin"></div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-wide">
          Sincronizando consola con el núcleo bancario...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Top Header & Console Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Consola de Administración
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Núcleo en Línea
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 text-[11px] font-mono">
              ID-NODO: BOG-7701
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Sucursal Principal • Sincronización continua de tesorería y caja central de compensación.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2 transition-all shadow-2xs disabled:opacity-50 cursor-pointer"
          >
            <i className={`fas fa-rotate text-xs ${refreshing ? 'animate-spin text-emerald-600' : 'text-slate-400'}`}></i>
            <span>Sincronizar</span>
          </button>

          <button
            onClick={() => onNavigate && onNavigate('transacciones')}
            className="px-4 py-2 rounded-xl bg-[#047857] hover:bg-[#065f46] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <i className="fas fa-plus text-[10px]"></i>
            <span>Nueva Operación</span>
            <i className="fas fa-chevron-down text-[10px] ml-0.5"></i>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <KPICards stats={stats} />

      {/* Quick Operations Bar */}
      <QuickActions onSuccess={fetchStats} />

      {/* Charts & Balances Row matching 8 / 4 ratio */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8">
          <OperationsChart />
        </div>
        <div className="xl:col-span-4">
          <BalanceCards stats={stats} onNavigate={onNavigate} />
        </div>
      </div>

      {/* Recent Ledger Table */}
      <div>
        <RecentTransactions stats={stats} onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default Dashboard;