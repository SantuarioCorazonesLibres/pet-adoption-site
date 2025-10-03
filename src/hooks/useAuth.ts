import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AuthUser, getCurrentUser } from "@/services/authService";

/**
 * Hook para manejar el estado de autenticación
 * @returns Estado de autenticación y usuario
 */
export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sesión inicial
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error verificando usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);
        
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            role: session.user.user_metadata?.role || 'admin'
          });
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading, isAuthenticated: !!user };
};