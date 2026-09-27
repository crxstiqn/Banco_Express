import apiFetch from '../../utils/api';
import React, { useState, useEffect } from 'react';
import { useBank } from '../../context/BankContext';
import { useAuth } from '../../context/AuthContext';
import Breadcrumbs from '../UI/Breadcrumbs';

const AccountsSection = () => {
  const { actions } = useBank(); // We only need actions for toast notifications
  const { user } = useAuth();
  
  const [accounts, setAccounts] = useState([]);
  const [clients, setClients] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);
  
  const [formData, setFormData] = useState({
    numero: '',
    client_id: '',
    tipo: 'Ahorros',
    saldo: 0,
    estado: 'Activa'
  });

  const fetchData = async () => {
    try {
      const [accRes, cliRes] = await Promise.all([
        apiFetch('http://localhost:5001/api/accounts'),
        apiFetch('http://localhost:5001/api/clients')
      ]);
      const accData = await accRes.json();
      const cliData = await cliRes.json();
      setAccounts(accData);
      setClients(cliData);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = String(account.numero).includes(searchTerm) ||
                         account.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || account.tipo === filterType;
    const matchesStatus = !filterStatus || account.estado === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleViewAccount = (account) => {
    setSelectedAccount(account);
    setModalType('view');
    setShowModal(true);
  };

  const handleCreateAccount = () => {
    setSelectedAccount(null);
    setFormData({
      numero: `550${Date.now().toString().slice(-7)}`,
      client_id: '',
      tipo: 'Ahorros',
      saldo: 0,
      estado: 'Activa'
    });
    setModalType('create');
    setShowModal(true);
  };

  const handleToggleStatus = async (account) => {
    const newStatus = account.estado === 'Activa' ? 'Bloqueada' : 'Activa';
    try {
      const res = await apiFetch(`http://localhost:5001/api/accounts/${account.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: newStatus })
      });
      if (res.ok) {
        actions.showToast(`Cuenta ${newStatus.toLowerCase()} exitosamente`, 'success');
        fetchData();
      } else {
        const data = await res.json();
        actions.showToast(data.message || 'Error al actualizar', 'error');
      }
    } catch (err) {
      console.error(err);
      actions.showToast('Error de conexión', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (modalType === 'create') {
      try {
        const res = await apiFetch('http://localhost:5001/api/accounts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        
        if (res.ok) {
          actions.showToast('Cuenta creada exitosamente', 'success');
          setShowModal(false);
          fetchData();
        } else {
          actions.showToast(data.message || 'Error al crear cuenta', 'error');
        }
      } catch (err) {
        console.error(err);
        actions.showToast('Error de conexión', 'error');
      }
    }
  };

  const getStatusBadge = (estado) => {
    switch (estado) {
      case 'Activa':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Bloqueada':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Cerrada':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeIcon = (tipo) => {
    switch (tipo) {
      case 'Ahorros':
        return 'fas fa-piggy-bank text-green-600';
      case 'Corriente':
        return 'fas fa-credit-card text-blue-600';
      case 'Empresarial':
        return 'fas fa-building text-purple-600';
      default:
        return 'fas fa-university text-gray-600';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs 
        items={[
          { label: 'Inicio', icon: 'fas fa-home' },
          { label: 'Cuentas', active: true }
        ]} 
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestión de Cuentas
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Administra las cuentas bancarias de los clientes
          </p>
        </div>
        {user?.role === 'admin' && (
          <button
            onClick={handleCreateAccount}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <i className="fas fa-plus mr-2"></i>
            Nueva Cuenta
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por número, cliente o cédula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Todos los tipos</option>
              <option value="Ahorros">Ahorros</option>
              <option value="Corriente">Corriente</option>
              <option value="Empresarial">Empresarial</option>
            </select>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Todos los estados</option>
              <option value="Activa">Activa</option>
              <option value="Bloqueada">Bloqueada</option>
              <option value="Cerrada">Cerrada</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-piggy-bank text-green-600 dark:text-green-400"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ahorros</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {accounts.filter(a => a.tipo === 'Ahorros').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-credit-card text-blue-600 dark:text-blue-400"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Corrientes</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {accounts.filter(a => a.tipo === 'Corriente').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-building text-purple-600 dark:text-purple-400"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Empresariales</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {accounts.filter(a => a.tipo === 'Empresarial').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-ban text-red-600 dark:text-red-400"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Bloqueadas</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {accounts.filter(a => a.estado === 'Bloqueada').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cuenta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Saldo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Fecha Apertura
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAccounts.map((account) => (
                <tr key={account.id || account.numero} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3">
                        <i className={getTypeIcon(account.tipo)}></i>
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {account.numero}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {account.cliente}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {/* CC is no longer fetched, removed cedula display */}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {account.tipo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    ${account.saldo.toLocaleString('es-CO')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(account.estado)}`}>
                      {account.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {account.fecha || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleViewAccount(account)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Ver detalles"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      {user?.role === 'admin' && (
                        <button
                          onClick={() => handleToggleStatus(account)}
                          className={`${account.estado === 'Activa' ? 'text-red-600 hover:text-red-900 dark:text-red-400' : 'text-green-600 hover:text-green-900 dark:text-green-400'}`}
                          title={account.estado === 'Activa' ? 'Bloquear' : 'Activar'}
                        >
                          <i className={`fas ${account.estado === 'Activa' ? 'fa-ban' : 'fa-check-circle'}`}></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredAccounts.length === 0 && (
          <div className="text-center py-12">
            <i className="fas fa-university text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
            <p className="text-gray-500 dark:text-gray-400">No se encontraron cuentas</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {modalType === 'view' ? 'Detalles de la Cuenta' : 'Nueva Cuenta'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {modalType === 'view' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Número de Cuenta</label>
                      <p className="text-gray-900 dark:text-white">{selectedAccount.numero}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cliente</label>
                      <p className="text-gray-900 dark:text-white">{selectedAccount.cliente}</p>
                    </div>
                    {/* Cedula display removed for View since not returned by simplified query */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo</label>
                      <p className="text-gray-900 dark:text-white">{selectedAccount.tipo}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Saldo</label>
                      <p className="text-gray-900 dark:text-white">${selectedAccount.saldo.toLocaleString('es-CO')}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(selectedAccount.estado)}`}>
                        {selectedAccount.estado}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Número de Cuenta *
                      </label>
                      <input
                        type="text"
                        value={formData.numero}
                        onChange={(e) => setFormData({...formData, numero: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Cliente *
                      </label>
                      <select
                        value={formData.client_id}
                        onChange={(e) => setFormData({...formData, client_id: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      >
                        <option value="">Seleccionar cliente</option>
                        {clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name} ({client.dni})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tipo de Cuenta *
                      </label>
                      <select
                        value={formData.tipo}
                        onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      >
                        <option value="Ahorros">Ahorros</option>
                        <option value="Corriente">Corriente</option>
                        <option value="Empresarial">Empresarial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Saldo Inicial
                      </label>
                      <input
                        type="number"
                        value={formData.saldo}
                        onChange={(e) => setFormData({...formData, saldo: parseInt(e.target.value) || 0})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                    >
                      Crear Cuenta
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountsSection;