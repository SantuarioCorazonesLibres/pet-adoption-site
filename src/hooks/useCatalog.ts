import { useState, useEffect } from "react";
import { CatalogType, CatalogItem } from "@/types/catalog.types";
import { getCatalogItems } from "@/services/catalogService";

/**
 * Hook para gestionar catálogos
 */
export const useCatalog = (catalogType: CatalogType) => {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCatalogItems(catalogType);
      setItems(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [catalogType]);

  return { items, loading, error, refetch: fetchItems };
};