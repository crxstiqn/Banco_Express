import apiFetch from '../../utils/api';
import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../UI/Breadcrumbs';

const CreditsSection = () => {
  const [credits, setCredits] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedCredit, setSelectedCredit] = useState(null);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await apiFetch('http://localhost:5001/api/credits');
        const data = await res.json();
        setCredits(data);
      } catch (err) {
        console.error('Error fetching credits:', err);
      }
    };
    fetchCredits();
  }, []);

  const filteredCredits = credits.filter(credit => {
    const matchesSearch = credit.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         credit.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         credit.cedula.includes(searchTerm);
    const matchesType = !filterType || credit.tipo === filterType;
    const matchesStatus = !filterStatus || credit.estado === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleViewCredit = (credit) => {
    setSelectedCredit(credit);
    setModalType('view');
    setShowModal(true);
  };

  const handleViewSchedule = (credit) => {
    setSelectedCredit(credit);
    setModalType('schedule');
    setShowModal(true);
  };

  const getStatusBadge = (estado) => {
    switch (estado) {
      case 'Activo':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Pagado':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Mora':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Vencido':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeIcon = (tipo) => {
    switch (tipo) {
      case 'Personal':
        return 'fas fa-user text-blue-600';
      case 'Hipotecario':
        return 'fas fa-home text-green-600';
      case 'Vehículo':
        return 'fas fa-car text-purple-600';
      case 'Empresarial':
        return 'fas fa-building text-orange-600';
      default:
        return 'fas fa-hand-holding-usd text-gray-600';
    }
  };

  const calculateProgress = (credit) => {
    const [cuotasPagadas, totalCuotas] = credit.cuotas.split('/').map(Number);
    return Math.round((cuotasPagadas / totalCuotas) * 100);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs 
        items={[
          { label: 'Inicio', icon: 'fas fa-home' },
          { label: 'Créditos', active: true }
        ]} 
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestión de Créditos
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Administra los créditos y préstamos de los clientes
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por ID, cliente o cédula..."
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
              <option value="Personal">Personal</option>
              <option value="Hipotecario">Hipotecario</option>
              <option value="Vehículo">Vehículo</option>
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
              <option value="Activo">Activo</option>
              <option value="Pagado">Pagado</option>
              <option value="Mora">Mora</option>
              <option value="Vencido">Vencido</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-hand-holding-usd text-green-600 dark:text-green-400"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Activos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {credits.filter(c => c.estado === 'Activo').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-check-circle text-blue-600 dark:text-blue-400"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pagados</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {credits.filter(c => c.estado === 'Pagado').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-exclamation-triangle text-red-600 dark:text-red-400"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">En Mora</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {credits.filter(c => c.estado === 'Mora').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-calculator text-purple-600 dark:text-purple-400"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Saldo Total</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                ${credits.reduce((sum, c) => sum + parseFloat(c.saldo), 0).toLocaleString('es-CO')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Credits Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Crédito
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Monto/Saldo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Progreso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCredits.map((credit) => (
                <tr key={credit.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3">
                        <i className={getTypeIcon(credit.tipo)}></i>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {credit.id}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {credit.tasaInteres}% anual
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {credit.cliente}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        CC: {credit.cedula}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {credit.tipo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        ${credit.monto.toLocaleString('es-CO')}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Saldo: ${credit.saldo.toLocaleString('es-CO')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900 dark:text-white mb-1">
                        {credit.cuotas}
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${calculateProgress(credit)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {calculateProgress(credit)}%
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(credit.estado)}`}>
                      {credit.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleViewCredit(credit)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Ver detalles"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        onClick={() => handleViewSchedule(credit)}
                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        title="Ver cronograma"
                      >
                        <i className="fas fa-calendar-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCredits.length === 0 && (
          <div className="text-center py-12">
            <i className="fas fa-hand-holding-usd text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
            <p className="text-gray-500 dark:text-gray-400">No se encontraron créditos</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedCredit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {modalType === 'view' ? 'Detalles del Crédito' : 'Cronograma de Pagos'}
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
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">ID Crédito</label>
                      <p className="text-gray-900 dark:text-white">{selectedCredit.id}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cliente</label>
                      <p className="text-gray-900 dark:text-white">{selectedCredit.cliente}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo</label>
                      <p className="text-gray-900 dark:text-white">{selectedCredit.tipo}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Monto Original</label>
                      <p className="text-gray-900 dark:text-white">${selectedCredit.monto.toLocaleString('es-CO')}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Saldo Actual</label>
                      <p className="text-gray-900 dark:text-white">${selectedCredit.saldo.toLocaleString('es-CO')}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tasa de Interés</label>
                      <p className="text-gray-900 dark:text-white">{selectedCredit.tasaInteres}% anual</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cuotas</label>
                      <p className="text-gray-900 dark:text-white">{selectedCredit.cuotas}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(selectedCredit.estado)}`}>
                        {selectedCredit.estado}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Progreso</label>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                      <div 
                        className="bg-primary-600 h-4 rounded-full flex items-center justify-center text-xs text-white font-medium" 
                        style={{ width: `${calculateProgress(selectedCredit)}%` }}
                      >
                        {calculateProgress(selectedCredit)}%
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      Cronograma de Pagos - {selectedCredit.id}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedCredit.cliente} • {selectedCredit.tipo}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Esta funcionalidad mostraría el cronograma detallado de pagos
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      Cuotas: {selectedCredit.cuotas}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Saldo pendiente: ${selectedCredit.saldo.toLocaleString('es-CO')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditsSection;