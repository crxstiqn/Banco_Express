import apiFetch from '../../utils/api';
import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import Breadcrumbs from '../UI/Breadcrumbs';

const ReportsSection = () => {
  const { actions } = useBank();
  const [activeReport, setActiveReport] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [reportData, setReportData] = useState(null);

  const reportTypes = [
    {
      id: 'financial',
      name: 'Reporte Financiero',
      description: 'Balance general y estado de resultados',
      icon: 'fas fa-chart-line',
      color: 'text-green-600'
    },
    {
      id: 'clients',
      name: 'Reporte de Clientes',
      description: 'Estadísticas y análisis de clientes',
      icon: 'fas fa-users',
      color: 'text-blue-600'
    },
    {
      id: 'transactions',
      name: 'Reporte de Transacciones',
      description: 'Historial detallado de transacciones',
      icon: 'fas fa-exchange-alt',
      color: 'text-purple-600'
    },
    {
      id: 'credits',
      name: 'Reporte de Créditos',
      description: 'Estado de la cartera crediticia',
      icon: 'fas fa-hand-holding-usd',
      color: 'text-orange-600'
    }
  ];

  const generateReport = async (reportType) => {
    try {
      const res = await apiFetch(`http://localhost:5001/api/reports/${reportType}`);
      const data = await res.json();
      
      if (res.ok) {
        setReportData(data);
        actions.showToast('Reporte generado exitosamente', 'success');
      } else {
        actions.showToast(data.message || 'Error al generar reporte', 'error');
      }
    } catch (err) {
      console.error('Error generating report:', err);
      actions.showToast('Error de conexión', 'error');
    }
  };

  const downloadReport = () => {
    if (!reportData) return;
    
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += "Metrica,Valor\n";

    if (activeReport === 'financial') {
      csvContent += `Total Depositos,${reportData.totalDeposits}\n`;
      csvContent += `Total Retiros,${reportData.totalWithdrawals}\n`;
      csvContent += `Flujo Neto,${reportData.netFlow}\n`;
    } else if (activeReport === 'clients') {
      csvContent += `Total Clientes,${reportData.totalClients}\n`;
      csvContent += `Saldo Promedio,${reportData.avgBalance}\n`;
      Object.entries(reportData.clientsByStatus).forEach(([status, count]) => {
        csvContent += `Clientes (${status}),${count}\n`;
      });
    } else if (activeReport === 'transactions') {
      csvContent += `Total Transacciones,${reportData.totalTransactions}\n`;
      csvContent += `Volumen Total,${reportData.totalVolume}\n`;
    } else if (activeReport === 'credits') {
      csvContent += `Total Creditos,${reportData.totalCredits}\n`;
      csvContent += `Saldo Pendiente,${reportData.totalBalance}\n`;
    }

    const encodedUri = encodeURI(csvContent);
    const a = document.createElement('a');
    a.setAttribute("href", encodedUri);
    a.setAttribute("download", `reporte_${activeReport}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    actions.showToast('Reporte descargado exitosamente (CSV)', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs 
        items={[
          { label: 'Inicio', icon: 'fas fa-home' },
          { label: 'Reportes', active: true }
        ]} 
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Centro de Reportes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Genera y descarga reportes detallados del banco
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Types */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Tipos de Reporte
            </h3>
            <div className="space-y-3">
              {reportTypes.map((report) => (
                <button
                  key={report.id}
                  onClick={() => setActiveReport(report.id)}
                  className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
                    activeReport === report.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <i className={`${report.icon} ${report.color} text-lg`}></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {report.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {report.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Report Configuration and Results */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            {activeReport ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center mr-4">
                      <i className={`${reportTypes.find(r => r.id === activeReport)?.icon} ${reportTypes.find(r => r.id === activeReport)?.color} text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {reportTypes.find(r => r.id === activeReport)?.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {reportTypes.find(r => r.id === activeReport)?.description}
                      </p>
                    </div>
                  </div>
                  {reportData && (
                    <button
                      onClick={downloadReport}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <i className="fas fa-download"></i>
                      <span>Descargar</span>
                    </button>
                  )}
                </div>

                {/* Date Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Fecha Desde
                    </label>
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Fecha Hasta
                    </label>
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => generateReport(activeReport)}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Generar Reporte
                    </button>
                  </div>
                </div>

                {/* Report Results */}
                {reportData && (
                  <div className="space-y-6">
                    {activeReport === 'financial' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                          <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">Total Depósitos</h4>
                          <p className="text-2xl font-bold text-green-900 dark:text-green-300">
                            ${reportData.totalDeposits.toLocaleString('es-CO')}
                          </p>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                          <h4 className="font-medium text-red-800 dark:text-red-400 mb-2">Total Retiros</h4>
                          <p className="text-2xl font-bold text-red-900 dark:text-red-300">
                            ${reportData.totalWithdrawals.toLocaleString('es-CO')}
                          </p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                          <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">Flujo Neto</h4>
                          <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">
                            ${reportData.netFlow.toLocaleString('es-CO')}
                          </p>
                        </div>
                      </div>
                    )}

                    {activeReport === 'clients' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                            <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">Total Clientes</h4>
                            <p className="text-3xl font-bold text-blue-900 dark:text-blue-300">
                              {reportData.totalClients}
                            </p>
                          </div>
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                            <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">Saldo Promedio</h4>
                            <p className="text-2xl font-bold text-green-900 dark:text-green-300">
                              ${Math.round(reportData.avgBalance).toLocaleString('es-CO')}
                            </p>
                          </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <h4 className="font-medium text-gray-800 dark:text-gray-300 mb-3">Distribución por Estado</h4>
                          <div className="space-y-2">
                            {Object.entries(reportData.clientsByStatus).map(([status, count]) => (
                              <div key={status} className="flex justify-between">
                                <span className="text-gray-700 dark:text-gray-300">{status}</span>
                                <span className="font-medium text-gray-900 dark:text-white">{count}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeReport === 'transactions' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                          <h4 className="font-medium text-purple-800 dark:text-purple-400 mb-2">Total Transacciones</h4>
                          <p className="text-3xl font-bold text-purple-900 dark:text-purple-300">
                            {reportData.totalTransactions}
                          </p>
                        </div>
                        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                          <h4 className="font-medium text-orange-800 dark:text-orange-400 mb-2">Volumen Total</h4>
                          <p className="text-2xl font-bold text-orange-900 dark:text-orange-300">
                            ${reportData.totalVolume.toLocaleString('es-CO')}
                          </p>
                        </div>
                      </div>
                    )}

                    {activeReport === 'credits' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                          <h4 className="font-medium text-orange-800 dark:text-orange-400 mb-2">Total Créditos</h4>
                          <p className="text-3xl font-bold text-orange-900 dark:text-orange-300">
                            {reportData.totalCredits}
                          </p>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                          <h4 className="font-medium text-red-800 dark:text-red-400 mb-2">Saldo Pendiente</h4>
                          <p className="text-2xl font-bold text-red-900 dark:text-red-300">
                            ${reportData.totalBalance.toLocaleString('es-CO')}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <i className="fas fa-chart-bar text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Selecciona un Tipo de Reporte
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Elige el tipo de reporte que deseas generar desde el panel izquierdo
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;