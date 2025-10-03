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
 * Obtiene todas las mascotas disponibles con filtros opcionales
 * @param filters - Objeto con filtros opcionales
 * @returns Array de mascotas filtradas
 */
export const getAllAvailablePets = async (filters?: {
  searchTerm?: string;
  types?: string[];
  size?: string;
  gender?: string[];
  location?: string;
}): Promise<Pet[]> => {
  try {
    let query = supabase
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
      .eq("is_available", true);

    // Aplicar filtros si existen
    if (filters?.searchTerm) {
      query = query.ilike("name", `%${filters.searchTerm}%`);
    }

    if (filters?.size) {
      // Necesitamos hacer un join para filtrar por tamaño
      const { data: sizesData } = await supabase
        .from("sizes")
        .select("id")
        .ilike("name", filters.size)
        .single();
      
      if (sizesData) {
        query = query.eq("size_id", sizesData.id);
      }
    }

    if (filters?.location) {
      // Necesitamos hacer un join para filtrar por ubicación
      const { data: locationData } = await supabase
        .from("locations")
        .select("id")
        .ilike("name", `%${filters.location}%`)
        .single();
      
      if (locationData) {
        query = query.eq("location_id", locationData.id);
      }
    }

    if (filters?.gender && filters.gender.length > 0) {
      query = query.in("gender", filters.gender);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching all pets:", error);
      throw error;
    }

    if (!data) {
      return [];
    }

    let pets = transformSupabasePets(data as unknown as SupabasePet[]);

    // Filtros del lado del cliente (para tipos, ya que es relación)
    if (filters?.types && filters.types.length > 0) {
      pets = pets.filter(pet => filters.types!.includes(pet.type));
    }

    return pets;
  } catch (error) {
    console.error("Error en getAllAvailablePets:", error);
    return [];
  }
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

/**
 * Obtiene todas las ubicaciones únicas de la base de datos
 * @returns Array de nombres de ubicaciones
 */
export const getAllLocations = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from("locations")
      .select("name")
      .order("name");

    if (error) {
      console.error("Error fetching locations:", error);
      return [];
    }

    return data?.map(loc => loc.name) || [];
  } catch (error) {
    console.error("Error en getAllLocations:", error);
    return [];
  }
};