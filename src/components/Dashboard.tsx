import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardStats } from "@/services/petService";
import { PawPrint, Heart, TrendingUp, Loader2 } from "lucide-react";
import { StatsEditor } from "./StatsEditor";

// 🧩 Interfaz para tipar correctamente el estado
interface DashboardStats {
  totalPets: number;
  availablePets: number;
  adoptedPets: number;
  petsByType: {
    pet_type_id: any;
    pet_types: { name: string }[];
  }[];
  petsByLocation: {
    location_id: any;
    locations: { name: string }[];
  }[];
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalPets: 0,
    availablePets: 0,
    adoptedPets: 0,
    petsByType: [],
    petsByLocation: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data: DashboardStats = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const adoptionRate =
    stats.totalPets > 0
      ? ((stats.adoptedPets / stats.totalPets) * 100).toFixed(1)
      : 0;

  return (
    <div className="space-y-6">
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mascotas</CardTitle>
            <PawPrint className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPets}</div>
            <p className="text-xs text-muted-foreground">Registradas en el sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
            <Heart className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.availablePets}</div>
            <p className="text-xs text-muted-foreground">Listas para adopción</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Adoptadas</CardTitle>
            <Heart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.adoptedPets}</div>
            <p className="text-xs text-muted-foreground">Encontraron su hogar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Adopción</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{adoptionRate}%</div>
            <p className="text-xs text-muted-foreground">Del total registrado</p>
          </CardContent>
        </Card>
      </div>

      {/* Resumen */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Estado del Sistema</p>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium">Operando normalmente</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Última actualización</p>
              <p className="text-sm">
                {new Date().toLocaleDateString("es-MX", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Próximas acciones</p>
              <p className="text-sm">
                {stats.availablePets === 0
                  ? "Agregar nuevas mascotas"
                  : "Continuar gestionando adopciones"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <StatsEditor />
    </div>
  );
};

export default Dashboard;
