import { supabase } from "@/lib/supabaseClient";
import type { Stats, UpdateStatsInput } from "@/types/stats.types";

export const getStats = async (): Promise<Stats | null> => {
  const { data, error } = await supabase
    .from("stats")
    .select("*")
    .single();

  if (error) {
    console.error("Error obteniendo stats:", error);
    throw error;
  }

  return data;
};

export const updateStats = async (
  id: string,
  updates: UpdateStatsInput
): Promise<Stats> => {
  const { data, error } = await supabase
    .from("stats")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error actualizando stats:", error);
    throw error;
  }

  return data;
};