import { supabase } from "@/lib/supabaseClient";
import { Pet, SupabasePet } from "@/types/pet.types";
import { transformSupabasePets } from "@/utils/petTransformer";

// ============================================
// TIPOS PARA EL ADMIN
// ============================================

export interface PetFormData {
  name: string;
  breed: string;
  age: string;
  gender: "Macho" | "Hembra";
  description: string;
  rescue_history: string;
  rescue_date: string;
  dewormed: boolean;
  castrated: boolean | null;
  image_url: string;
  is_available: boolean;
  pet_type_id: string;
  size_id: string;
  location_id: string;
  personality_ids: string[];
}

// ============================================
// FUNCIONES PARA EL SITIO PÚBLICO
// ============================================

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

    // console.log("Datos recibidos de Supabase:", data);  //REVISAMOS LO QUE VIENE DE SUPABASE
    
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

// ============================================
// FUNCIONES PARA EL PANEL ADMIN
// ============================================

/**
 * Obtiene todas las mascotas con sus relaciones (para admin)
 */
export const getAllPetsAdmin = async () => {
  try {
    const { data, error } = await supabase
      .from("pets")
      .select(`
        *,
        pet_types:pet_type_id(id, name),
        sizes:size_id(id, name),
        locations:location_id(id, name),
        pets_personalities(
          personality_id,
          personalities(id, name, description)
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error obteniendo mascotas:", error);
    throw error;
  }
};

/**
 * Crea una nueva mascota
 */
export const createPet = async (petData: PetFormData) => {
  try {
    const { personality_ids, ...petFields } = petData;

    const { data: pet, error: petError } = await supabase
      .from("pets")
      .insert([petFields])
      .select()
      .single();

    if (petError) throw petError;

    if (personality_ids.length > 0) {
      const personalities = personality_ids.map(personality_id => ({
        pet_id: pet.id,
        personality_id
      }));

      const { error: personalitiesError } = await supabase
        .from("pets_personalities")
        .insert(personalities);

      if (personalitiesError) throw personalitiesError;
    }

    return { data: pet, error: null };
  } catch (error: any) {
    console.error("Error creando mascota:", error);
    return { data: null, error: error.message };
  }
};

/**
 * Actualiza una mascota existente
 */
export const updatePet = async (id: string, petData: PetFormData) => {
  try {
    const { personality_ids, ...petFields } = petData;

    const { data: pet, error: petError } = await supabase
      .from("pets")
      .update(petFields)
      .eq("id", id)
      .select()
      .single();

    if (petError) throw petError;

    // Eliminar personalidades anteriores
    await supabase.from("pets_personalities").delete().eq("pet_id", id);

    // Insertar nuevas personalidades
    if (personality_ids.length > 0) {
      const personalities = personality_ids.map(personality_id => ({
        pet_id: id,
        personality_id
      }));

      const { error: personalitiesError } = await supabase
        .from("pets_personalities")
        .insert(personalities);

      if (personalitiesError) throw personalitiesError;
    }

    return { data: pet, error: null };
  } catch (error: any) {
    console.error("Error actualizando mascota:", error);
    return { data: null, error: error.message };
  }
};

/**
 * Elimina una mascota
 */
export const deletePet = async (id: string) => {
  try {
    const { error } = await supabase
      .from("pets")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error("Error eliminando mascota:", error);
    return { error: error.message };
  }
};

/**
 * Obtiene estadísticas del dashboard
 */
export const getDashboardStats = async () => {
  try {
    const { count: totalPets } = await supabase
      .from("pets")
      .select("*", { count: "exact", head: true });

    const { count: availablePets } = await supabase
      .from("pets")
      .select("*", { count: "exact", head: true })
      .eq("is_available", true);

    const { count: adoptedPets } = await supabase
      .from("pets")
      .select("*", { count: "exact", head: true })
      .eq("is_available", false);

    const { data: petsByType } = await supabase
      .from("pets")
      .select(`pet_type_id, pet_types:pet_type_id(name)`);

    const { data: petsByLocation } = await supabase
      .from("pets")
      .select(`location_id, locations:location_id(name)`)
      .eq("is_available", true);

    return {
      totalPets: totalPets || 0,
      availablePets: availablePets || 0,
      adoptedPets: adoptedPets || 0,
      petsByType: petsByType || [],
      petsByLocation: petsByLocation || []
    };
  } catch (error) {
    console.error("Error obteniendo estadísticas:", error);
    return {
      totalPets: 0,
      availablePets: 0,
      adoptedPets: 0,
      petsByType: [],
      petsByLocation: []
    };
  }
};