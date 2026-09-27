import apiFetch from '../../utils/api';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Breadcrumbs from '../UI/Breadcrumbs';

const CustomerDashboard = ({ onNavigate }) => {
  const { user } = useAuth();
  const [clientData, setClientData] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [filterMode, setFilterMode] = useState('all');

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const clientRes = await apiFetch(`http://localhost:5001/api/clients/email/${user.email}`);
        if (clientRes.ok) {
          const client = await clientRes.json();
          setClientData(client);
          
          const [accRes, txRes] = await Promise.all([
            apiFetch(`http://localhost:5001/api/accounts/client/${client.id}`),
            apiFetch(`http://localhost:5001/api/transactions/client/${client.id}`)
          ]);
          
          if (accRes.ok) setAccounts(await accRes.json());
          if (txRes.ok) setTransactions(await txRes.json());
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user?.email) {
      fetchCustomerData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const copyAccountNumber = (accNumber, id) => {
    if (!accNumber) return;
    navigator.clipboard.writeText(accNumber);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[420px] gap-3">
        <div className="w-9 h-9 rounded-full border-2 border-emerald-100 dark:border-emerald-950 border-t-emerald-600 dark:border-t-emerald-400 animate-spin"></div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Cargando tu información financiera...
        </p>
      </div>
    );
  }

  if (!clientData) {
    return (
      <div className="neobank-card p-12 text-center max-w-md mx-auto my-12">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center text-xl mx-auto mb-4">
          <i className="fas fa-user-slash"></i>
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
          Sin expediente de cliente
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          No se encontró una cuenta vinculada al correo <strong className="text-slate-700 dark:text-slate-300">{user?.email}</strong>. Puedes comunicarte con soporte para su activación.
        </p>
      </div>
    );
  }

  const totalBalance = accounts.reduce((acc, curr) => acc + parseFloat(curr.saldo || 0), 0);

  const totalIncomes = transactions
    .filter(t => t.tipo === 'Depósito' || t.tipo === 'Transferencia')
    .reduce((sum, t) => sum + parseFloat(t.monto || 0), 0);

  const totalExpenses = transactions
    .filter(t => t.tipo === 'Retiro' || t.tipo === 'Pago')
    .reduce((sum, t) => sum + parseFloat(t.monto || 0), 0);

  const filteredTransactions = transactions.filter(t => {
    if (filterMode === 'incomes') return t.tipo === 'Depósito' || t.tipo === 'Transferencia';
    if (filterMode === 'expenses') return t.tipo === 'Retiro' || t.tipo === 'Pago';
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Header & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-800">
        <Breadcrumbs items={[{ label: 'Inicio', icon: 'fas fa-home' }, { label: 'Mi Resumen', active: true }]} />
        
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>Titular: <strong className="text-slate-900 dark:text-white font-semibold">{clientData.nombre}</strong></span>
          <span>•</span>
          <span className="font-mono">C.C. {clientData.cedula}</span>
        </div>
      </div>

      {/* Hero Balance Card */}
      <div className="neobank-card p-6 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {getTimeGreeting()}, <strong className="text-slate-800 dark:text-slate-200">{clientData.nombre.split(' ')[0]}</strong>
              </span>
              <span className="neobank-badge-emerald text-[10px] py-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Cliente {clientData.estado || 'Activo'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Saldo total disponible:
              </span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-semibold inline-flex items-center gap-1 transition-colors"
              >
                <i className={`fas ${showBalance ? 'fa-eye-slash' : 'fa-eye'} text-[11px]`}></i>
                <span>{showBalance ? 'Ocultar' : 'Mostrar'}</span>
              </button>
            </div>

            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tabular-nums tracking-tight mt-1.5">
              {showBalance ? (
                `$ ${totalBalance.toLocaleString('es-CO')} COP`
              ) : (
                '$ •••••••••••• COP'
              )}
            </div>
          </div>

          {/* Quick Transaction Actions */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
            <button
              onClick={() => onNavigate && onNavigate('transferencias')}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#047857] hover:bg-[#065f46] active:scale-[0.99] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <i className="fas fa-paper-plane text-xs"></i>
              <span>Transferir</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('recargar-cuenta')}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-500 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-2xs"
            >
              <i className="fas fa-plus text-xs text-emerald-600 dark:text-emerald-400"></i>
              <span>Recargar Saldo</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('pagar-servicios')}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-500 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-2xs"
            >
              <i className="fas fa-receipt text-xs text-slate-400"></i>
              <span>Pagar Servicios</span>
            </button>
          </div>
        </div>

        {/* Quick Figures Grid */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px] font-medium">Cuentas vinculadas</span>
            <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{accounts.length} producto(s)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] font-medium">Entradas este período</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
              {showBalance ? `+$${totalIncomes.toLocaleString('es-CO')}` : '$ ••••'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] font-medium">Salidas y retiros</span>
            <span className="font-bold text-slate-700 dark:text-slate-300 mt-0.5 block">
              {showBalance ? `-$${totalExpenses.toLocaleString('es-CO')}` : '$ ••••'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] font-medium">Última operación</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300 mt-0.5 block truncate">
              {transactions.length > 0 ? transactions[0].fecha : 'Sin movimientos'}
            </span>
          </div>
        </div>
      </div>

      {/* Accounts List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Mis Cuentas Bancarias
            </h2>
            <span className="neobank-badge-emerald text-[10px] py-0.2">
              {accounts.length} Activas
            </span>
          </div>
          <button
            onClick={() => onNavigate && onNavigate('mis-cuentas')}
            className="text-xs text-[#047857] hover:text-[#065f46] dark:text-emerald-400 font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Ver detalles</span>
            <i className="fas fa-arrow-right text-[10px]"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accounts.map(acc => (
            <div
              key={acc.id}
              className="neobank-card p-5 group hover:border-emerald-500/60 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 text-[#047857] dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40 flex items-center justify-center text-sm font-bold shadow-2xs">
                    <i className="fas fa-wallet"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      Cuenta de {acc.tipo}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-0.5">
                      <span>N° {acc.numero}</span>
                      <button
                        onClick={() => copyAccountNumber(acc.numero, acc.id)}
                        className="text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                        title="Copiar número de cuenta"
                      >
                        <i className={`fas ${copiedId === acc.id ? 'fa-check text-emerald-500' : 'fa-copy'} text-[11px]`}></i>
                      </button>
                      {copiedId === acc.id && (
                        <span className="text-[10px] font-sans text-emerald-600 dark:text-emerald-400 font-bold">Copiado</span>
                      )}
                    </div>
                  </div>
                </div>

                <span className="neobank-badge-emerald text-[10px]">
                  {acc.estado || 'Activa'}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Saldo disponible</span>
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white tabular-nums tracking-tight">
                    {showBalance ? `$${parseFloat(acc.saldo || 0).toLocaleString('es-CO')}` : '$ ••••••••'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onNavigate && onNavigate('transferencias')}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#047857] transition-colors cursor-pointer"
                  >
                    Transferir
                  </button>
                  <button
                    onClick={() => onNavigate && onNavigate('recargar-cuenta')}
                    className="px-3 py-1.5 rounded-lg bg-[#047857] hover:bg-[#065f46] text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                  >
                    Recargar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Movements Section */}
      <div className="neobank-card overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Movimientos Recientes
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Historial de transferencias, consignaciones y pagos de tus cuentas
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                filterMode === 'all'
                  ? 'bg-[#047857] text-white shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Todos ({transactions.length})
            </button>
            <button
              onClick={() => setFilterMode('incomes')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                filterMode === 'incomes'
                  ? 'bg-[#047857] text-white shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Ingresos
            </button>
            <button
              onClick={() => setFilterMode('expenses')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                filterMode === 'expenses'
                  ? 'bg-[#047857] text-white shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Egresos
            </button>
          </div>
        </div>

        {/* Movements Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50/75 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-5">Fecha</th>
                <th className="py-3 px-5">Tipo</th>
                <th className="py-3 px-5">Detalle / Referencia</th>
                <th className="py-3 px-5 text-right">Monto (COP)</th>
                <th className="py-3 px-5 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => {
                  const isIncome = tx.tipo === 'Depósito' || tx.tipo === 'Transferencia';
                  return (
                    <tr key={tx.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-5 whitespace-nowrap text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                        {tx.fecha || 'Hoy'}
                      </td>
                      <td className="py-3.5 px-5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                          isIncome 
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/40'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }`}>
                          <i className={`fas ${isIncome ? 'fa-arrow-down-left text-emerald-500' : 'fa-arrow-up-right text-slate-400'} text-[9px]`}></i>
                          {tx.tipo}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-slate-700 dark:text-slate-300 max-w-sm truncate font-medium">
                        {tx.descripcion || 'Sin descripción'}
                      </td>
                      <td className={`py-3.5 px-5 text-right font-bold tabular-nums whitespace-nowrap text-xs ${
                        isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
                      }`}>
                        {isIncome ? '+' : '-'}${parseFloat(tx.monto || 0).toLocaleString('es-CO')}
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
                  <td colSpan="5" className="py-10 text-center text-slate-400 text-xs">
                    <i className="fas fa-receipt text-slate-300 dark:text-slate-600 text-xl block mb-2"></i>
                    No se registran transacciones en este filtro
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
