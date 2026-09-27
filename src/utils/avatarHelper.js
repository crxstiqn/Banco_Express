export const getAvatarUrl = (user) => {
  if (!user) return null;

  // Si tiene un avatar personalizado definido (distinto al placeholder genérico)
  if (user.avatar && user.avatar !== '/profile.avif') {
    return user.avatar;
  }
  if (user.foto_perfil) {
    return user.foto_perfil;
  }

  // Si es administrador, tiene su propia foto
  if (user.role === 'admin' || user.rol === 'admin' || user.role_name === 'admin') {
    return encodeURI('/img/foto de perfil/foto de perfil rol admin.png');
  }

  // Género explícito si existe
  if (user.genero === 'F' || user.gender === 'female' || user.gender === 'F') {
    return encodeURI('/img/foto de perfil/foto de perfil rol cliente version mujer.png');
  }
  if (user.genero === 'M' || user.gender === 'male' || user.gender === 'M') {
    return encodeURI('/img/foto de perfil/foto de perfil rol cliente version hombre.png');
  }

  // Si es cliente, intentamos deducir el género por el nombre
  const nombre = (user.nombre || user.name || '').trim().split(' ')[0].toLowerCase();
  
  // Lista básica de terminaciones o nombres femeninos comunes
  const isFemale = nombre.endsWith('a') || 
                   nombre.endsWith('is') || 
                   nombre.endsWith('th') ||
                   ['carmen', 'beatriz', 'luz', 'flor', 'pilar', 'mar', 'sol', 'consuelo', 'rosario', 'dolores', 'mercedes', 'inés', 'raquel', 'esther', 'leonor', 'miriam', 'ruth', 'abigail', 'judith', 'maria', 'maría'].includes(nombre);

  // Excepciones de nombres de hombre que terminan en 'a'
  const isMaleException = ['luca', 'josea', 'andrea', 'josua', 'bautista', 'elias'].includes(nombre);

  if (isFemale && !isMaleException) {
    return encodeURI('/img/foto de perfil/foto de perfil rol cliente version mujer.png');
  } else {
    return encodeURI('/img/foto de perfil/foto de perfil rol cliente version hombre.png');
  }
};
