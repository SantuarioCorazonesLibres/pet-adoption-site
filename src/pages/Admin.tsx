import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PawPrint, 
  Heart, 
  FileText, 
  BarChart3,
  LogOut,
  Settings,
  Shield
} from "lucide-react";
import { signOut } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";
import LogoutConfirmation from "@/components/LogoutConfirmation";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    const { error } = await signOut();
    if (!error) {
      navigate("/");
    } else {
      setLoggingOut(false);
      setShowLogoutDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Breadcrumb / Info superior */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Panel de Administración</h1>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowLogoutDialog(true)}
              className="hidden sm:flex"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64">
            <Card className="overflow-hidden">
              <div className="p-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 lg:grid-cols-1 lg:h-auto gap-2 bg-transparent">
                    <TabsTrigger 
                      value="dashboard" 
                      className="justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      <span>Dashboard</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="pets" 
                      className="justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <PawPrint className="h-4 w-4 mr-2" />
                      <span>Mascotas</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="stories" 
                      className="justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      <span>Historias</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="applications" 
                      className="justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      <span>Solicitudes</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="settings" 
                      className="justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      <span>Configuración</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Botón de cerrar sesión móvil */}
              <div className="p-4 border-t sm:hidden">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                  onClick={() => setShowLogoutDialog(true)}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </div>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <Tabs value={activeTab} className="w-full">
              {/* Dashboard */}
              <TabsContent value="dashboard" className="mt-0">
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <BarChart3 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
                        <p className="text-sm text-muted-foreground">Bienvenido al panel de administración</p>
                      </div>
                    </div>
                    <div className="pt-6 text-center text-muted-foreground">
                      <p>Aquí irá el contenido del dashboard con estadísticas y métricas</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Mascotas */}
              <TabsContent value="pets" className="mt-0">
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <PawPrint className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">Gestión de Mascotas</h2>
                        <p className="text-sm text-muted-foreground">Administra las mascotas disponibles para adopción</p>
                      </div>
                    </div>
                    <div className="pt-6 text-center text-muted-foreground">
                      <p>Aquí irá el CRUD de mascotas</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Historias de Éxito */}
              <TabsContent value="stories" className="mt-0">
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Heart className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">Historias de Éxito</h2>
                        <p className="text-sm text-muted-foreground">Gestiona las historias de adopciones exitosas</p>
                      </div>
                    </div>
                    <div className="pt-6 text-center text-muted-foreground">
                      <p>Aquí irá la gestión de historias de éxito</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Solicitudes de Adopción */}
              <TabsContent value="applications" className="mt-0">
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">Solicitudes de Adopción</h2>
                        <p className="text-sm text-muted-foreground">Revisa y gestiona las solicitudes de adopción</p>
                      </div>
                    </div>
                    <div className="pt-6 text-center text-muted-foreground">
                      <p>Aquí irá la gestión de solicitudes de adopción</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Configuración */}
              <TabsContent value="settings" className="mt-0">
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Settings className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">Configuración</h2>
                        <p className="text-sm text-muted-foreground">Ajusta las opciones del sistema</p>
                      </div>
                    </div>
                    <div className="pt-6 text-center text-muted-foreground">
                      <p>Aquí irá la configuración del sistema</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>

      {/* Modal de confirmación de logout */}
      <LogoutConfirmation
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
        loading={loggingOut}
      />
    </div>
  );
};

export default Admin;