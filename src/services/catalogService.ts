import { supabase } from "@/lib/supabaseClient";
import { CatalogType, CatalogItem } from "@/types/catalog.types";

/**
 * Obtiene todos los registros de un catálogo
 */
export const getCatalogItems = async (catalogType: CatalogType): Promise<CatalogItem[]> => {
  try {
    const { data, error } = await supabase
      .from(catalogType)
      .select("*")
      .order("name", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error obteniendo ${catalogType}:`, error);
    return [];
  }
};

/**
 * Crea un nuevo registro en un catálogo
 */
export const createCatalogItem = async (
  catalogType: CatalogType,
  item: { name: string; description?: string }
) => {
  try {
    const { data, error } = await supabase
      .from(catalogType)
      .insert([item])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error(`Error creando en ${catalogType}:`, error);
    return { data: null, error: error.message };
  }
};

/**
 * Actualiza un registro existente en un catálogo
 */
export const updateCatalogItem = async (
  catalogType: CatalogType,
  id: string,
  item: { name: string; description?: string }
) => {
  try {
    const { data, error } = await supabase
      .from(catalogType)
      .update(item)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error(`Error actualizando en ${catalogType}:`, error);
    return { data: null, error: error.message };
  }
};

/**
 * Elimina un registro de un catálogo
 */
export const deleteCatalogItem = async (
  catalogType: CatalogType,
  id: string
) => {
  try {
    const { error } = await supabase
      .from(catalogType)
      .delete()
      .eq("id", id);

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error(`Error eliminando de ${catalogType}:`, error);
    return { error: error.message };
  }
};