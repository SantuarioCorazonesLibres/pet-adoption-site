import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit2, Trash2, Loader2, Cat, Ruler, MapPin, Smile } from "lucide-react";
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
    icon: <Cat className="h-5 w-5" />,
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
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as CatalogType)}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          {catalogConfigs.map((config) => (
            <TabsTrigger key={config.type} value={config.type} className="space-x-2">
              {config.icon}
              <span className="hidden sm:inline">{config.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {catalogConfigs.map((config) => (
          <TabsContent key={config.type} value={config.type} className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {config.icon}
                    </div>
                    <div>
                      <CardTitle>{config.name}</CardTitle>
                      <CardDescription>{config.description}</CardDescription>
                    </div>
                  </div>
                  <Button onClick={handleCreate} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {dataLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : items.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No hay registros. Agrega el primero.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
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