export const getAvatarUrl = (user) => {
  if (!user) return null;

  // Si es administrador, tiene su propia foto
  if (user.role === 'admin' || user.rol === 'admin') {
    return '/img/foto de perfil/foto de perfil rol admin.png';
  }

  // Si es cliente, intentamos deducir el género por el nombre
  const nombre = (user.nombre || user.name || '').trim().split(' ')[0].toLowerCase();
  
  // Lista básica de terminaciones o nombres femeninos comunes
  const isFemale = nombre.endsWith('a') || 
                   nombre.endsWith('is') || 
                   nombre.endsWith('th') ||
                   ['carmen', 'beatriz', 'luz', 'flor', 'pilar', 'mar', 'sol', 'consuelo', 'rosario', 'dolores', 'mercedes', 'inés', 'raquel', 'esther', 'leonor', 'miriam', 'ruth', 'abigail', 'judith'].includes(nombre);

  // Excepciones de nombres de hombre que terminan en 'a'
  const isMaleException = ['luca', 'josea', 'andrea', 'josua', 'bautista', 'elias'].includes(nombre);

  if (isFemale && !isMaleException) {
    return '/img/foto de perfil/foto de perfil rol cliente version mujer.png';
  } else {
    return '/img/foto de perfil/foto de perfil rol cliente version hombre.png';
  }
};
