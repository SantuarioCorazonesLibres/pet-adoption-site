import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit2, Trash2, Loader2, Ruler, MapPin, Smile, Dog } from "lucide-react";
import { toast } from "sonner";
import { useCatalog } from "@/hooks/useCatalog";
import { CatalogType, CatalogItem } from "@/types/catalog.types";
import { createCatalogItem, updateCatalogItem, deleteCatalogItem } from "@/services/catalogService";
import CatalogFormModal from "./CatalogFormModal";
import DeleteConfirmation from "./DeleteConfirmation";

interface CatalogConfig {
  type: CatalogType;
  name: string;
  description: string;
  icon: React.ReactNode;
  hasDescription: boolean;
}

const catalogConfigs: CatalogConfig[] = [
  {
    type: "pet_types",
    name: "Tipos de Mascota",
    description: "Gestiona los tipos de mascotas (Perro, Gato, etc.)",
    icon: <Dog className="h-5 w-5" />,
    hasDescription: false
  },
  {
    type: "sizes",
    name: "Tamaños",
    description: "Gestiona los tamaños de mascotas (Pequeño, Mediano, Grande)",
    icon: <Ruler className="h-5 w-5" />,
    hasDescription: false
  },
  {
    type: "locations",
    name: "Ubicaciones",
    description: "Gestiona las ubicaciones donde se encuentran las mascotas",
    icon: <MapPin className="h-5 w-5" />,
    hasDescription: false
  },
  {
    type: "personalities",
    name: "Personalidades",
    description: "Gestiona los rasgos de personalidad de las mascotas",
    icon: <Smile className="h-5 w-5" />,
    hasDescription: true
  }
];

const CatalogsManager = () => {
  const [activeTab, setActiveTab] = useState<CatalogType>("pet_types");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
  const [loading, setLoading] = useState(false);

  const currentConfig = catalogConfigs.find(c => c.type === activeTab)!;
  const { items, loading: dataLoading, refetch } = useCatalog(activeTab);

  const handleCreate = () => {
    setSelectedItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: CatalogItem) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: CatalogItem) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (data: { name: string; description?: string }) => {
    try {
      if (selectedItem) {
        // Actualizar
        const { error } = await updateCatalogItem(activeTab, selectedItem.id, data);
        if (error) throw new Error(error);
        toast.success("Registro actualizado correctamente");
      } else {
        // Crear
        const { error } = await createCatalogItem(activeTab, data);
        if (error) throw new Error(error);
        toast.success("Registro creado correctamente");
      }
      refetch();
      setIsFormOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Error al guardar");
      throw error;
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem) return;

    setLoading(true);
    try {
      const { error } = await deleteCatalogItem(activeTab, selectedItem.id);
      if (error) throw new Error(error);
      toast.success("Registro eliminado correctamente");
      refetch();
      setIsDeleteOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Error al eliminar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as CatalogType)}>
        {/* Tabs con scroll horizontal en móvil */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <TabsList className="inline-flex lg:grid w-auto lg:w-full grid-cols-4 min-w-full lg:min-w-0">
            {catalogConfigs.map((config) => (
              <TabsTrigger 
                key={config.type} 
                value={config.type} 
                className="flex items-center gap-1.5 md:gap-2 flex-shrink-0 px-3 md:px-4"
              >
                <span className="flex-shrink-0">{config.icon}</span>
                <span className="text-xs md:text-sm whitespace-nowrap">{config.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {catalogConfigs.map((config) => (
          <TabsContent key={config.type} value={config.type} className="mt-4 md:mt-6">
            <Card>
              <CardHeader className="px-4 md:px-6 py-4 md:py-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-0">
                  <div className="flex items-start sm:items-center gap-2 md:gap-3 w-full sm:w-auto">
                    <div className="p-1.5 md:p-2 rounded-lg bg-primary/10 flex-shrink-0 mt-0.5 sm:mt-0">
                      {config.icon}
                    </div>
                    <div className="min-w-0 flex-1 sm:flex-none">
                      <CardTitle className="text-base md:text-lg">{config.name}</CardTitle>
                      <CardDescription className="text-xs md:text-sm">{config.description}</CardDescription>
                    </div>
                  </div>
                  <Button onClick={handleCreate} size="sm" className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
                {dataLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : items.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm md:text-base">
                    <p>No hay registros. Agrega el primero.</p>
                  </div>
                ) : (
                  <>
                    {/* Vista de Cards para móvil */}
                    <div className="md:hidden space-y-3">
                      {items.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              {/* Nombre y badge */}
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0 flex-1">
                                  <h3 className="font-semibold text-base break-words">{item.name}</h3>
                                  {config.hasDescription && item.description && (
                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                      {item.description}
                                    </p>
                                  )}
                                  {config.hasDescription && !item.description && (
                                    <p className="text-sm text-muted-foreground italic mt-1">
                                      Sin descripción
                                    </p>
                                  )}
                                </div>
                                <Badge variant="outline" className="flex-shrink-0 text-xs">
                                  {items.length}
                                </Badge>
                              </div>
                              
                              {/* Acciones */}
                              <div className="flex gap-2 pt-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(item)}
                                  className="flex-1"
                                >
                                  <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                                  Editar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDelete(item)}
                                  className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                >
                                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                                  Eliminar
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Vista de Tabla para desktop */}
                    <div className="hidden md:block overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nombre</TableHead>
                            {config.hasDescription && <TableHead>Descripción</TableHead>}
                            <TableHead>Registros</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {items.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              {config.hasDescription && (
                                <TableCell className="max-w-xs truncate">
                                  {item.description || <span className="text-muted-foreground italic">Sin descripción</span>}
                                </TableCell>
                              )}
                              <TableCell>
                                <Badge variant="outline">{items.length} totales</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEdit(item)}
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(item)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Modal de formulario */}
      <CatalogFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        item={selectedItem}
        catalogName={currentConfig.name}
        hasDescription={currentConfig.hasDescription}
      />

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedItem?.name || ""}
        loading={loading}
      />
    </div>
  );
};

export default CatalogsManager;