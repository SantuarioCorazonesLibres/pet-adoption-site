// Tipos para la respuesta de Supabase
export type SupabasePet = {
  id: string;
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
  pet_types: { name: string } | null;
  sizes: { name: string } | null;
  locations: { name: string } | null;
  pets_personalities: { personalities: { name: string } }[];
};

// Tipo Pet para usar en la aplicación
export type Pet = {
  id: string;
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
  type: string;
  size: string;
  location: string;
  personalities: string[];
};