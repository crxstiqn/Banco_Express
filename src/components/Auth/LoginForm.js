import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const LoginForm = ({ onSwitchToRegister }) => {
  const { login, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (!success) {
      setFormData(prev => ({ ...prev, password: '' }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Iniciar Sesión
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Ingresa tus credenciales para acceder a tus productos financieros.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs rounded-xl flex items-center gap-2.5 animate-shake">
            <div className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 text-[10px]">
              <i className="fas fa-exclamation"></i>
            </div>
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Correo Electrónico o Usuario
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all duration-200"
            placeholder="ejemplo@bancoexpres.com"
            required
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Contraseña
            </label>
            <button
              type="button"
              className="text-xs text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 font-bold transition-colors"
              onClick={() => alert('Para restablecer tu contraseña o si olvidaste tu clave, comunícate con la línea de soporte bancario (607) 572-0000.')}
            >
              ¿Olvidaste tu clave?
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all duration-200"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
            </button>
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-xs text-slate-600 dark:text-slate-400 font-normal">
              Recordar mi usuario en este equipo seguro
            </span>
          </label>
        </div>

        {/* Submit Button matching reference image */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-3 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#047857] hover:bg-[#065f46] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-emerald-700/20 disabled:opacity-60 cursor-pointer"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
              <span>Ingresando a la Sucursal...</span>
            </>
          ) : (
            <>
              <span>Ingresar a la Sucursal Virtual</span>
              <i className="fas fa-arrow-right text-xs"></i>
            </>
          )}
        </button>
      </form>


    </div>
  );
};

export default LoginForm;