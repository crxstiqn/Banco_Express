import apiFetch from '../../utils/api';
import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const OperationsChart = () => {
  const chartRef = useRef();
  const [year, setYear] = useState('2026');
  const [chartData, setChartData] = useState({
    depositos: new Array(12).fill(0),
    retiros: new Array(12).fill(0),
    transferencias: new Array(12).fill(0)
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await apiFetch(`http://localhost:5001/api/dashboard/chart?year=${year}`);
        if (res.ok) {
          const rows = await res.json();
          const newChartData = {
            depositos: new Array(12).fill(0),
            retiros: new Array(12).fill(0),
            transferencias: new Array(12).fill(0)
          };
          
          rows.forEach(row => {
            const monthIndex = row.month - 1; // MySQL MONTH is 1-12
            const amount = parseFloat(row.total || 0);
            if (row.type === 'Depósito') newChartData.depositos[monthIndex] += amount;
            if (row.type === 'Retiro') newChartData.retiros[monthIndex] += amount;
            if (row.type === 'Transferencia') newChartData.transferencias[monthIndex] += amount;
          });
          
          setChartData(newChartData);
        }
      } catch (err) {
        console.error('Error fetching chart data:', err);
      }
    };
    fetchChartData();
  }, [year]);

  const totalYearDeposits = chartData.depositos.reduce((a, b) => a + b, 0);
  const totalYearWithdrawals = chartData.retiros.reduce((a, b) => a + b, 0);

  const data = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Depósitos',
        data: chartData.depositos,
        backgroundColor: 'rgba(16, 185, 129, 0.9)',
        hoverBackgroundColor: '#059669',
        borderRadius: 6,
        borderSkipped: false,
        barPercentage: 0.7,
        categoryPercentage: 0.8
      },
      {
        label: 'Retiros',
        data: chartData.retiros,
        backgroundColor: 'rgba(244, 63, 94, 0.85)',
        hoverBackgroundColor: '#e11d48',
        borderRadius: 6,
        borderSkipped: false,
        barPercentage: 0.7,
        categoryPercentage: 0.8
      },
      {
        label: 'Transferencias',
        data: chartData.transferencias,
        backgroundColor: 'rgba(13, 148, 136, 0.85)',
        hoverBackgroundColor: '#0f766e',
        borderRadius: 6,
        borderSkipped: false,
        barPercentage: 0.7,
        categoryPercentage: 0.8
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
          color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b',
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 11,
            weight: 500
          }
        }
      },
      tooltip: {
        backgroundColor: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff',
        titleColor: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a',
        bodyColor: document.documentElement.classList.contains('dark') ? '#cbd5e1' : '#475569',
        borderColor: document.documentElement.classList.contains('dark') ? '#334155' : '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        boxPadding: 4,
        usePointStyle: true,
        cornerRadius: 12,
        callbacks: {
          label: function(context) {
            return ` ${context.dataset.label}: $${context.parsed.y.toLocaleString('es-CO')}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#64748b' : '#94a3b8',
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(51, 65, 85, 0.3)' : 'rgba(241, 245, 249, 1)'
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#64748b' : '#94a3b8',
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 11
          },
          callback: function(value) {
            if (value >= 1000000) return '$' + (value / 1000000).toFixed(0) + 'M';
            if (value >= 1000) return '$' + (value / 1000).toFixed(0) + 'k';
            return '$' + value;
          }
        }
      }
    }
  };

  return (
    <div className="neobank-card p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Flujo Operativo Mensual
            </h3>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
              En Vivo
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Volumen transaccional consolidado en pesos colombianos
          </p>
        </div>

        {/* Year Selector & Quick Badges */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2 mr-2">
            <span className="neobank-badge-emerald text-[11px]">
              <i className="fas fa-arrow-down-left text-[9px]"></i>
              Dep: ${(totalYearDeposits / 1000000).toFixed(1)}M
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/50 text-[11px]">
              <i className="fas fa-arrow-up-right text-[9px]"></i>
              Ret: ${(totalYearWithdrawals / 1000000).toFixed(1)}M
            </span>
          </div>

          <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            {['2026', '2025'].map(y => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  year === y
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="h-64 sm:h-72 lg:h-80">
        <Bar ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default OperationsChart;