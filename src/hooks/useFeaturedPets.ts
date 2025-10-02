import { useEffect, useState } from "react";
import { Pet } from "@/types/pet.types";
import { getFeaturedPets } from "@/services/petService";

/**
 * Hook para obtener las mascotas destacadas
 * @param limit - Número de mascotas a obtener (default: 3)
 * @returns Estado con mascotas, loading y error
 */
export const useFeaturedPets = (limit: number = 3) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getFeaturedPets(limit);
        setPets(data);
      } catch (err) {
        setError("Error al cargar las mascotas");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [limit]);

  return { pets, loading, error };
};