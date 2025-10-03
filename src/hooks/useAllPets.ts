import { useEffect, useState } from "react";
import { Pet } from "@/types/pet.types";
import { getAllAvailablePets, getAllLocations } from "@/services/petService";

interface Filters {
  searchTerm?: string;
  types?: string[];
  size?: string;
  gender?: string[];
  location?: string;
}

/**
 * Hook para obtener todas las mascotas con filtros
 * @param filters - Filtros a aplicar
 * @returns Estado con mascotas, loading, error y ubicaciones
 */
export const useAllPets = (filters: Filters) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar ubicaciones al montar
  useEffect(() => {
    const fetchLocations = async () => {
      const locs = await getAllLocations();
      setLocations(locs);
    };
    fetchLocations();
  }, []);

  // Cargar mascotas cuando cambien los filtros
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllAvailablePets(filters);
        setPets(data);
      } catch (err) {
        setError("Error al cargar las mascotas");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [
    filters.searchTerm,
    filters.types?.join(","),
    filters.size,
    filters.gender?.join(","),
    filters.location
  ]);

  return { pets, locations, loading, error };
};