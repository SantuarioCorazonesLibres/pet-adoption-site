import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PawPrint, 
  FolderCog, 
  BarChart3,
  LogOut,
  Settings,
  Image,
  Shield
} from "lucide-react";
import { signOut } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";
import LogoutConfirmation from "@/components/LogoutConfirmation";
import CatalogsManager from "@/components/CatalogsManager";
import PetsManager from "@/components/PetsManager";
import Dashboard from "@/components/Dashboard";
import ImageManager from "@/components/ImageManager";


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
      {/* Header / Info superior */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-3 min-w-0">
              <div className="p-1.5 md:p-2 rounded-lg bg-primary/10 flex-shrink-0">
                <Shield className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm md:text-lg font-bold text-foreground truncate">
                  Panel de Administración
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowLogoutDialog(true)}
              className="hidden sm:flex flex-shrink-0"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Cerrar Sesión</span>
              <span className="md:hidden">Salir</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          {/* Sidebar - Scrollable horizontal en móvil, vertical en desktop */}
          <aside className="lg:w-64 w-full">
            <Card className="overflow-hidden">
              {/* Tabs en móvil: scroll horizontal */}
              <div className="lg:hidden">
                <div className="overflow-x-auto scrollbar-hide">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="inline-flex w-auto min-w-full h-auto bg-transparent p-3 gap-2">
                      <TabsTrigger 
                        value="dashboard" 
                        className="flex-shrink-0 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2.5"
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        <span>Dashboard</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="pets" 
                        className="flex-shrink-0 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2.5"
                      >
                        <PawPrint className="h-4 w-4 mr-2" />
                        <span>Mascotas</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="stories" 
                        className="flex-shrink-0 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2.5"
                      >
                        <FolderCog className="h-4 w-4 mr-2" />
                        <span>Catalogos</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="images" 
                        className="flex-shrink-0 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2.5"
                      >
                        <Image className="h-4 w-4 mr-2" />
                        <span>Imágenes</span>
                      </TabsTrigger>                    
                      <TabsTrigger 
                        value="settings" 
                        className="flex-shrink-0 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2.5"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        <span>Configuración</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                {/* Botón de cerrar sesión móvil */}
                <div className="p-3 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 text-sm py-2"
                    onClick={() => setShowLogoutDialog(true)}
                  >
                    <LogOut className="h-4 w-4 mr-2 flex-shrink-0" />
                    Cerrar Sesión
                  </Button>
                </div>
              </div>

              {/* Tabs en desktop: vertical */}
              <div className="hidden lg:block p-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
                  <TabsList className="grid w-full grid-cols-1 h-auto gap-2 bg-transparent">
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
                      <FolderCog className="h-4 w-4 mr-2" />
                      <span>Catalogos</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="images" 
                      className="justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <Image className="h-4 w-4 mr-2" />
                      <span>Imágenes</span>
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
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Tabs value={activeTab} className="w-full">
              {/* Dashboard */}
              <TabsContent value="dashboard" className="mt-0">
                <Dashboard />
              </TabsContent>

              {/* Mascotas */}
              <TabsContent value="pets" className="mt-0">
                <PetsManager />
              </TabsContent>

              {/* Catalogos */}
              <TabsContent value="stories" className="mt-0">
                <CatalogsManager />
              </TabsContent>

              {/* Imágenes */}
              <TabsContent value="images" className="mt-0">
                <ImageManager />
              </TabsContent>
              

              {/* Configuración */}
              <TabsContent value="settings" className="mt-0">
                <Card className="p-4 md:p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <div className="p-2 md:p-3 rounded-lg bg-primary/10 flex-shrink-0">
                        <Settings className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-xl md:text-2xl font-bold text-foreground">
                          Configuración
                        </h2>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          Ajusta las opciones del sistema
                        </p>
                      </div>
                    </div>
                    <div className="pt-6 text-center text-muted-foreground">
                      <p className="text-sm md:text-base">
                        Aquí irá la configuración del sistema
                      </p>
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