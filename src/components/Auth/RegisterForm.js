import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const RegisterForm = ({ onSwitchToLogin }) => {
  const { register, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    cedula: '',
    password: '',
    confirmPassword: '',
    rol: 'user',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    if (formData.password !== formData.confirmPassword) return;
    if (!formData.acceptTerms) return;

    const success = await register({
      nombre: formData.nombre,
      email: formData.email,
      password: formData.password,
      rol: formData.rol,
      cedula: formData.cedula
    });

    if (success) {
      onSwitchToLogin();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const passwordsMatch = !formData.confirmPassword || formData.password === formData.confirmPassword;

  return (
    <div className="w-full">
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Apertura de Cuenta Digital
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Crea tu cuenta bancaria en minutos sin costo de mantenimiento.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {error && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs rounded-xl flex items-center gap-2.5 animate-shake">
            <div className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 text-[10px]">
              <i className="fas fa-exclamation"></i>
            </div>
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Tipo de Usuario */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Tipo de Vinculación
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, rol: 'user' }))}
              className={`p-3 rounded-xl border text-left transition-all ${
                formData.rol === 'user'
                  ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 shadow-2xs'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-bold text-xs">Persona Natural</span>
                <i className={`fas fa-circle-check text-xs ${formData.rol === 'user' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-200 dark:text-slate-700'}`}></i>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Cuenta de Ahorros personal</span>
            </button>

            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, rol: 'admin' }))}
              className={`p-3 rounded-xl border text-left transition-all ${
                formData.rol === 'admin'
                  ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 shadow-2xs'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-bold text-xs">Administrador</span>
                <i className={`fas fa-circle-check text-xs ${formData.rol === 'admin' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-200 dark:text-slate-700'}`}></i>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Gestión de sucursal</span>
            </button>
          </div>
        </div>

        {/* Nombre Completo */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Nombre y Apellidos
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all duration-200"
            placeholder="Como figura en tu documento de identidad"
            required
          />
        </div>

        {/* Grid: Documento & Correo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Cédula de Ciudadanía
            </label>
            <input
              type="text"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all duration-200"
              placeholder="Número de documento"
              required={formData.rol === 'user'}
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all duration-200"
              placeholder="nombre@correo.com"
              required
            />
          </div>
        </div>

        {/* Grid: Claves */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Clave de Acceso
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all duration-200"
                placeholder="Mínimo 6 caracteres"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Confirmar Clave
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-4 pr-10 py-2.5 bg-white dark:bg-slate-900 border rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  !passwordsMatch
                    ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-300 dark:border-slate-700 focus:border-emerald-600 focus:ring-emerald-500/20'
                }`}
                placeholder="Repite tu clave"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
              </button>
            </div>
          </div>
        </div>

        {!passwordsMatch && (
          <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1">
            <i className="fas fa-circle-exclamation text-[10px]"></i>
            Las contraseñas ingresadas no coinciden.
          </p>
        )}

        {/* Checkbox Términos */}
        <div className="flex items-start gap-2.5 pt-1">
          <input
            type="checkbox"
            id="acceptTerms"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="mt-0.5 w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            required
          />
          <label htmlFor="acceptTerms" className="text-xs text-slate-600 dark:text-slate-400 leading-snug cursor-pointer select-none">
            Acepto el reglamento de cuentas de Banco Exprés y el tratamiento de datos personales conforme a la ley colombiana.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !passwordsMatch || !formData.acceptTerms}
          className="w-full mt-3 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#047857] hover:bg-[#065f46] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-emerald-700/20 disabled:opacity-60 cursor-pointer"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
              <span>Creando tu cuenta bancaria...</span>
            </>
          ) : (
            <>
              <span>Abrir mi Cuenta Ahora</span>
              <i className="fas fa-arrow-right text-xs"></i>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;