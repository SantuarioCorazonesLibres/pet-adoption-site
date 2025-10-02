import { supabase } from "@/lib/supabaseClient";
import { Pet, SupabasePet } from "@/types/pet.types";
import { transformSupabasePets } from "@/utils/petTransformer";

/**
 * Obtiene las mascotas destacadas (disponibles para adopción)
 * @param limit - Número máximo de mascotas a obtener
 * @returns Array de mascotas disponibles
 */
export const getFeaturedPets = async (limit: number = 3): Promise<Pet[]> => {
  try {
    const { data, error } = await supabase
      .from("pets")
      .select(`
        *,
        pet_types:pet_type_id(name),
        sizes:size_id(name),
        locations:location_id(name),
        pets_personalities(
          personalities(name)
        )
      `)
      .eq("is_available", true)
      .limit(limit);

    if (error) {
      console.error("Error fetching pets:", error);
      throw error;
    }

    if (!data) {
      return [];
    }

    console.log("Datos recibidos de Supabase:", data);
    
    return transformSupabasePets(data as unknown as SupabasePet[]);
  } catch (error) {
    console.error("Error en getFeaturedPets:", error);
    return [];
  }
};

/**
 * Obtiene todas las mascotas disponibles
 * @returns Array de todas las mascotas disponibles
 */
export const getAllAvailablePets = async (): Promise<Pet[]> => {
  return getFeaturedPets(100); // Sin límite específico
};

/**
 * Obtiene una mascota por su ID
 * @param petId - ID de la mascota
 * @returns Mascota encontrada o null
 */
export const getPetById = async (petId: string): Promise<Pet | null> => {
  try {
    const { data, error } = await supabase
      .from("pets")
      .select(`
        *,
        pet_types:pet_type_id(name),
        sizes:size_id(name),
        locations:location_id(name),
        pets_personalities(
          personalities(name)
        )
      `)
      .eq("id", petId)
      .single();

    if (error) {
      console.error("Error fetching pet:", error);
      return null;
    }

    if (!data) {
      return null;
    }

    const pets = transformSupabasePets([data as unknown as SupabasePet]);
    return pets[0] || null;
  } catch (error) {
    console.error("Error en getPetById:", error);
    return null;
  }
};