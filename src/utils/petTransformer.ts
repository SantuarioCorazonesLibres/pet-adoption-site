import { Pet, SupabasePet } from "@/types/pet.types";

/**
 * Transforma los datos de Supabase al formato usado en la aplicación
 * @param supabasePet - Mascota con estructura de Supabase
 * @returns Mascota con estructura plana para la UI
 */
export const transformSupabasePet = (supabasePet: SupabasePet): Pet => {
  return {
    id: supabasePet.id,
    name: supabasePet.name,
    breed: supabasePet.breed,
    age: supabasePet.age,
    gender: supabasePet.gender,
    description: supabasePet.description,
    rescue_history: supabasePet.rescue_history,
    rescue_date: supabasePet.rescue_date,
    dewormed: supabasePet.dewormed,
    castrated: supabasePet.castrated,
    vaccinated: supabasePet.vaccinated,
    image_url: supabasePet.image_url,
    is_available: supabasePet.is_available,
    type: supabasePet.pet_types?.name || "Desconocido",
    size: supabasePet.sizes?.name || "Desconocido",
    location: supabasePet.locations?.name || "Desconocido",
    personalities: supabasePet.pets_personalities?.map(p => p.personalities.name) || []
  };
};

/**
 * Transforma un array de mascotas de Supabase
 * @param supabasePets - Array de mascotas de Supabase
 * @returns Array de mascotas transformadas
 */
export const transformSupabasePets = (supabasePets: SupabasePet[]): Pet[] => {
  return supabasePets.map(transformSupabasePet);
};