import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPage = ({ darkMode, onToggleDarkMode }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={`min-h-screen bg-grid-pattern flex flex-col justify-between text-slate-800 dark:text-slate-200 font-sans relative ${darkMode ? 'dark' : ''}`}>
      
      {/* Top Header */}
      <header className="w-full px-6 sm:px-12 py-3.5 flex items-center justify-between border-b border-slate-200/70 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          {/* Logo del Banco */}
          <img 
            src="/img/logo/logo.jpeg" 
            alt="Banco Exprés Logo" 
            className="w-10 h-10 object-cover rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white leading-tight">
                Banco Exprés
              </span>
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] px-2 py-0.5 rounded-full tracking-wider uppercase">
                Digital
              </span>
            </div>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              Banca Digital para Personas & Empresas
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleDarkMode}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-2xs"
            title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            aria-label="Toggle theme"
          >
            <i className={`fas ${darkMode ? 'fa-sun text-amber-400' : 'fa-moon text-slate-600'} text-xs`}></i>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/90 dark:border-slate-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
          
          {/* Left Column matching reference image */}
          <div className="hidden lg:flex lg:col-span-5 p-8 sm:p-10 flex-col justify-between border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50/90 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/50 text-xs font-semibold mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Portal Transaccional Seguro
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
                Tu dinero, ágil y protegido.
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-normal">
                Consulta tus saldos, transfiere a cualquier cuenta al instante y gestiona tus productos en una experiencia simple y transparente.
              </p>

              {/* Emerald Debit Card Mockup matching reference image */}
              <div className="w-full rounded-2xl bg-[#064232] text-white p-5 shadow-lg border border-emerald-900/50 relative overflow-hidden mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <img 
                      src="/img/logo/logo.jpeg" 
                      alt="Banco Exprés" 
                      className="w-5 h-5 rounded object-cover shadow-xs"
                    />
                    <span className="font-extrabold text-xs tracking-wider uppercase text-emerald-100">
                      BANCO EXPRÉS
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-wifi text-emerald-200/80 text-sm rotate-90"></i>
                    <div className="w-7 h-5 rounded bg-amber-400 flex items-center justify-center shadow-xs">
                      <div className="w-5 h-3.5 border border-amber-600/40 rounded-xs"></div>
                    </div>
                  </div>
                </div>

                <div className="font-mono text-xl tracking-widest text-white font-bold mb-6">
                  5501 •••• •••• 2026
                </div>

                <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-emerald-300">
                  <div>
                    <span className="block text-[8px] text-emerald-400 font-medium">TITULAR</span>
                    <span className="font-bold text-white text-[11px]">CLIENTE AUTORIZADO</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[8px] text-emerald-400 font-medium">VENCE</span>
                    <span className="font-bold text-white text-[11px]">12/28</span>
                  </div>
                </div>
              </div>

              {/* 2 Feature Rows matching reference */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 text-xs border border-emerald-200/60 dark:border-emerald-800/40">
                    <i className="fas fa-bolt"></i>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Transferencias Inmediatas
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                      Envía dinero en segundos sin costo extra a otros bancos con Transfiya.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 text-xs border border-emerald-200/60 dark:border-emerald-800/40">
                    <i className="fas fa-shield-halved"></i>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Seguridad Certificada
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                      Protección con auditoría, doble factor biométrico y alertas en vivo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Contact */}
            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="text-slate-500 dark:text-slate-400">Línea Nacional Cúcuta</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">(607) 572-0000</span>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white dark:bg-slate-900">
            {/* Pill Mode Switcher matching reference */}
            <div className="flex p-1.5 bg-slate-100/80 dark:bg-slate-800/80 rounded-2xl mb-8 border border-slate-200/60 dark:border-slate-700/60">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                  isLogin
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
              >
                Ingreso de Clientes
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                  !isLogin
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
              >
                Apertura de Cuenta
              </button>
            </div>

            {/* Render Form */}
            {isLogin ? (
              <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default AuthPage;