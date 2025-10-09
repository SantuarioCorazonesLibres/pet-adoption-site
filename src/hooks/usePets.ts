import { useState, useEffect } from "react";
import { getAllPetsAdmin } from "@/services/petService";

export const usePets = () => {
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllPetsAdmin();
      setPets(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar las mascotas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return { pets, loading, error, refetch: fetchPets };
};