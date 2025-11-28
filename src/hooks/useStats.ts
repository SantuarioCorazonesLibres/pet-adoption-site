import { useState, useEffect } from "react";
import { getStats, updateStats } from "@/services/statsService";
import type { Stats, UpdateStatsInput } from "@/types/stats.types";

export const useStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await getStats();
      setStats(data);
      setError(null);
    } catch (err) {
      setError("Error cargando estadísticas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatsData = async (updates: UpdateStatsInput) => {
    if (!stats) return;

    try {
      setUpdating(true);
      const updatedStats = await updateStats(stats.id, updates);
      setStats(updatedStats);
      setError(null);
      return updatedStats;
    } catch (err) {
      setError("Error actualizando estadísticas");
      console.error(err);
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    updating,
    error,
    updateStatsData,
    refetch: fetchStats,
  };
};