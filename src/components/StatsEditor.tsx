import { useState, useEffect } from "react"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStats } from "@/hooks/useStats";
import { Save, RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const StatsEditor = () => {
  const { stats, loading, updating, error, updateStatsData } = useStats();
  const [formData, setFormData] = useState({
    total_adoptions: 0,
    total_rescued_pets: 0,
    total_volunteers: 0,
  });

  useEffect(() => {
    if (stats) {
      setFormData({
        total_adoptions: stats.total_adoptions,
        total_rescued_pets: stats.total_rescued_pets,
        total_volunteers: stats.total_volunteers,
      });
    }
  }, [stats]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const loadingToast = toast.loading("Actualizando estadísticas...");
    
    try {
      await updateStatsData(formData);
      toast.success("Estadísticas actualizadas correctamente", {
        id: loadingToast,
        duration: 3000,
      });
    } catch (error) {
      toast.error("Error al actualizar las estadísticas", {
        id: loadingToast,
        description: "Por favor, verifica los datos e intenta de nuevo.",
        duration: 4000,
      });
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    const numValue = parseInt(value) || 0;
    setFormData((prev) => ({ ...prev, [field]: numValue }));
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          Editar Estadísticas Globales
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="total_adoptions">Total de Adopciones</Label>
              <Input
                id="total_adoptions"
                type="number"
                min="0"
                value={formData.total_adoptions}
                onChange={(e) => handleChange("total_adoptions", e.target.value)}
                disabled={updating}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="total_rescued_pets">Mascotas Rescatadas</Label>
              <Input
                id="total_rescued_pets"
                type="number"
                min="0"
                value={formData.total_rescued_pets}
                onChange={(e) => handleChange("total_rescued_pets", e.target.value)}
                disabled={updating}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="total_volunteers">Total de Voluntarios</Label>
              <Input
                id="total_volunteers"
                type="number"
                min="0"
                value={formData.total_volunteers}
                onChange={(e) => handleChange("total_volunteers", e.target.value)}
                disabled={updating}
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <p className="text-sm text-muted-foreground">
              Última actualización: {stats && new Date(stats.updated_at).toLocaleString("es-MX")}
            </p>
            <Button type="submit" disabled={updating}>
              {updating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};