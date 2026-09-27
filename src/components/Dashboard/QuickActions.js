import apiFetch from '../../utils/api';
import React, { useState, useEffect } from 'react';
import { useBank } from '../../context/BankContext';

const QuickActions = ({ onSuccess }) => {
  const { actions } = useBank();
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountsRes = await apiFetch('http://localhost:5001/api/accounts');
        const accountsData = await accountsRes.json();
        setAccounts(accountsData);
      } catch (err) {
        console.error('Error fetching data for quick actions:', err);
      }
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    cliente: '',
    cuenta: '',
    monto: '',
    descripcion: ''
  });

  const quickActions = [
    {
      id: 'deposito',
      title: 'Depósito Rápido',
      subtitle: 'Abonar saldo a cuenta',
      icon: 'fas fa-arrow-down-left',
      color: 'text-emerald-600 dark:text-emerald-400',
      bgLight: 'bg-emerald-50/80 dark:bg-emerald-950/40',
      borderHover: 'hover:border-emerald-500/50'
    },
    {
      id: 'retiro',
      title: 'Retiro en Ventanilla',
      subtitle: 'Dispensar efectivo',
      icon: 'fas fa-arrow-up-right',
      color: 'text-amber-600 dark:text-amber-400',
      bgLight: 'bg-amber-50/80 dark:bg-amber-950/40',
      borderHover: 'hover:border-amber-500/50'
    },
    {
      id: 'transferencia',
      title: 'Transferir Fondos',
      subtitle: 'Mover entre cuentas',
      icon: 'fas fa-repeat',
      color: 'text-teal-600 dark:text-teal-400',
      bgLight: 'bg-teal-50/80 dark:bg-teal-950/40',
      borderHover: 'hover:border-teal-500/50'
    },
    {
      id: 'pago',
      title: 'Pago de Servicios',
      subtitle: 'Recaudo de convenios',
      icon: 'fas fa-receipt',
      color: 'text-slate-700 dark:text-slate-300',
      bgLight: 'bg-slate-100 dark:bg-slate-800',
      borderHover: 'hover:border-slate-400/50'
    }
  ];

  const handleActionClick = (actionId) => {
    setActionType(actionId);
    setShowModal(true);
    setFormData({
      cliente: '',
      cuenta: '',
      monto: '',
      descripcion: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.cuenta || !formData.monto) {
      actions.showToast('Por favor complete la cuenta y el monto requerido', 'error');
      return;
    }

    setLoading(true);
    const tipoMap = {
      deposito: 'Depósito',
      retiro: 'Retiro',
      transferencia: 'Transferencia',
      pago: 'Pago'
    };

    const payload = {
      tipo: tipoMap[actionType] || 'Depósito',
      cuenta: formData.cuenta,
      monto: parseFloat(formData.monto),
      descripcion: formData.descripcion || `${tipoMap[actionType]} procesado desde consola`
    };

    try {
      const res = await apiFetch('http://localhost:5001/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        actions.showToast(`${payload.tipo} de $${parseFloat(payload.monto).toLocaleString('es-CO')} procesado exitosamente`, 'success');
        setShowModal(false);
        if (onSuccess) onSuccess();
      } else {
        actions.showToast(data.message || 'Error procesando transacción', 'error');
      }
    } catch (err) {
      console.error(err);
      actions.showToast('Error de conexión con el servidor', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Operaciones Rápidas de Caja
        </h3>
        <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Terminal Activa
        </span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action.id)}
            className={`neobank-card p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${action.borderHover} group`}
          >
            <div className="flex items-center justify-between mb-2.5">
              <div className={`w-8 h-8 rounded-xl ${action.bgLight} ${action.color} flex items-center justify-center text-xs shadow-2xs transition-transform duration-200 group-hover:scale-110`}>
                <i className={action.icon}></i>
              </div>
              <i className="fas fa-chevron-right text-[10px] text-slate-300 dark:text-slate-600 transition-transform group-hover:translate-x-0.5"></i>
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {action.title}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
              {action.subtitle}
            </p>
          </button>
        ))}
      </div>

      {/* Modal Minimalista */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm">
                    <i className="fas fa-bolt"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {quickActions.find(a => a.id === actionType)?.title || 'Nueva Operación'}
                    </h3>
                    <p className="text-[11px] text-slate-400">Transacción inmediata en el núcleo bancario</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-xs transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Cuenta Destino / Origen *
                  </label>
                  <select
                    value={formData.cuenta}
                    onChange={(e) => setFormData({ ...formData, cuenta: e.target.value })}
                    required
                    className="bank-input text-xs"
                  >
                    <option value="">Seleccione una cuenta bancaria...</option>
                    {accounts.map(acc => (
                      <option key={acc.id} value={acc.numero}>
                        {acc.numero} — {acc.cliente} (${parseFloat(acc.saldo || 0).toLocaleString('es-CO')})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Monto (COP) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">$</span>
                    <input
                      type="number"
                      step="any"
                      min="1000"
                      placeholder="Ej: 500000"
                      value={formData.monto}
                      onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                      required
                      className="bank-input pl-7 text-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Concepto o Referencia (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Depósito en caja, pago servicio de agua..."
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    className="bank-input text-xs"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {loading && <i className="fas fa-spinner animate-spin text-[10px]"></i>}
                    <span>Confirmar Transacción</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;