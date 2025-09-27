import { Preferences } from '@capacitor/preferences';

const USERS_KEY = 'local_users';
const TOKEN_KEY = 'auth_token';
const CURRENT_USER_KEY = 'current_user';

export async function login(email: string, password: string) {
  try {
    console.log('Intentando login con:', email);
    
    // Obtener usuarios registrados
    const { value } = await Preferences.get({ key: USERS_KEY });
    console.log('Usuarios almacenados:', value);
    
    const users = value ? JSON.parse(value) : [];
    console.log('Lista de usuarios parseada:', users);

    // Buscar usuario por email (case insensitive) y contraseña
    const user = users.find((u: any) => 
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (!user) {
      console.log('Usuario no encontrado o contraseña incorrecta');
      throw new Error('Credenciales incorrectas');
    }
    
    console.log('Usuario encontrado:', user);
    
    // Crear token simple
    const token = btoa(JSON.stringify({ 
      email: user.email, 
      timestamp: Date.now() 
    }));
    
    // Guardar token y usuario actual
    await Preferences.set({ key: TOKEN_KEY, value: token });
    await Preferences.set({ 
      key: CURRENT_USER_KEY, 
      value: JSON.stringify(user) 
    });
    
    console.log('Login exitoso');
    return { token, user };
    
  } catch (error) {
    console.error('Error en login service:', error);
    throw error;
  }
}

export async function registerLocal(user: { name: string, email: string, password: string }) {
  try {
    console.log('Registrando usuario:', user.email);
    
    const { value } = await Preferences.get({ key: USERS_KEY });
    const users = value ? JSON.parse(value) : [];
    
    // Verificar si el usuario ya existe (case insensitive)
    const existingUser = users.find((u: any) => 
      u.email.toLowerCase() === user.email.toLowerCase()
    );
    
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }
    
    // Agregar nuevo usuario
    users.push(user);
    await Preferences.set({ key: USERS_KEY, value: JSON.stringify(users) });
    
    console.log('Usuario registrado exitosamente');
    return user;
    
  } catch (error) {
    console.error('Error en registro service:', error);
    throw error;
  }
}

export async function logout() {
  await Preferences.remove({ key: TOKEN_KEY });
  await Preferences.remove({ key: CURRENT_USER_KEY });
}

export async function getCurrentUser() {
  const { value } = await Preferences.get({ key: CURRENT_USER_KEY });
  return value ? JSON.parse(value) : null;
}

export async function isAuthenticated() {
  const { value } = await Preferences.get({ key: TOKEN_KEY });
  return !!value;
}

// Función para debug: ver todos los usuarios registrados
export async function debugUsers() {
  const { value } = await Preferences.get({ key: USERS_KEY });
  console.log('Usuarios debug:', value);
  return value ? JSON.parse(value) : [];
}