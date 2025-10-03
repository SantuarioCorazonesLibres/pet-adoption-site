import { supabase } from "@/lib/supabaseClient";

export interface AuthUser {
  id: string;
  email: string;
  role?: string;
}

/**
 * Inicia sesión con email y contraseña
 * @param email - Email del usuario
 * @param password - Contraseña
 * @returns Usuario autenticado o error
 */
export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { user: data.user, session: data.session, error: null };
  } catch (error: any) {
    console.error("Error en signIn:", error);
    return { user: null, session: null, error: error.message };
  }
};

/**
 * Cierra la sesión del usuario actual
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error("Error en signOut:", error);
    return { error: error.message };
  }
};

/**
 * Obtiene el usuario actual
 * @returns Usuario autenticado o null
 */
export const getCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) throw error;
    if (!user) return null;

    return {
      id: user.id,
      email: user.email!,
      role: user.user_metadata?.role || 'admin'
    };
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    return null;
  }
};

/**
 * Verifica si hay una sesión activa
 * @returns true si hay sesión activa
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  } catch (error) {
    console.error("Error verificando autenticación:", error);
    return false;
  }
};

/**
 * Registra un nuevo usuario administrador (solo para setup inicial)
 * @param email - Email del admin
 * @param password - Contraseña
 */
export const signUpAdmin = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: 'admin'
        }
      }
    });

    if (error) throw error;

    return { user: data.user, error: null };
  } catch (error: any) {
    console.error("Error en signUpAdmin:", error);
    return { user: null, error: error.message };
  }
};