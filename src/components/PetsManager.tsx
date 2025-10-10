import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Edit2, Trash2, Loader2, Search } from "lucide-react";
import { toast } from "sonner";
import { usePets } from "@/hooks/usePets";
import { createPet, updatePet, deletePet, PetFormData } from "@/services/petService";
import PetFormModal from "./PetFormModal";
import DeleteConfirmation from "./DeleteConfirmation";

const PetsManager = () => {
  const { pets, loading: dataLoading, refetch } = usePets();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setSelectedPet(null);
    setIsFormOpen(true);
  };

  const handleEdit = (pet: any) => {
    setSelectedPet(pet);
    setIsFormOpen(true);
  };

  const handleDelete = (pet: any) => {
    setSelectedPet(pet);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (data: PetFormData) => {
    try {
      if (selectedPet) {
        const { error } = await updatePet(selectedPet.id, data);
        if (error) throw new Error(error);
        toast.success("Mascota actualizada correctamente");
      } else {
        const { error } = await createPet(data);
        if (error) throw new Error(error);
        toast.success("Mascota creada correctamente");
      }
      refetch();
      setIsFormOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Error al guardar");
      throw error;
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedPet) return;

    setDeleting(true);
    try {
      const { error } = await deletePet(selectedPet.id);
      if (error) throw new Error(error);
      toast.success("Mascota eliminada correctamente");
      refetch();
      setIsDeleteOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Error al eliminar");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Card>
        <CardContent className="pt-4 md:pt-6 px-4 md:px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="relative flex-1 w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o raza..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <Button onClick={handleCreate} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Agregar Mascota</span>
              <span className="sm:hidden">Agregar</span>
            </Button>
          </div>

          {/* Contenido */}
          {dataLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredPets.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm md:text-base">
              {searchTerm ? "No se encontraron resultados" : "No hay mascotas. Agrega la primera."}
            </div>
          ) : (
            <>
              {/* Vista de Cards para móvil */}
              <div className="md:hidden space-y-4">
                {filteredPets.map((pet) => (
                  <Card key={pet.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {/* Imagen */}
                        <img
                          src={pet.image_url}
                          alt={pet.name}
                          className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
                        />
                        
                        {/* Información */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="min-w-0">
                              <h3 className="font-semibold text-base truncate">{pet.name}</h3>
                              <p className="text-sm text-muted-foreground">{pet.age}</p>
                            </div>
                            <Badge 
                              variant={pet.is_available ? "default" : "secondary"}
                              className="flex-shrink-0 text-xs"
                            >
                              {pet.is_available ? "Disponible" : "Adoptado"}
                            </Badge>
                          </div>
                          
                          <div className="space-y-1 text-sm">
                            <p className="text-muted-foreground">
                              <span className="font-medium">Raza:</span> {pet.breed}
                            </p>
                            <p className="text-muted-foreground">
                              <span className="font-medium">Tipo:</span> {pet.pet_types?.name}
                            </p>
                            <p className="text-muted-foreground truncate">
                              <span className="font-medium">Ubicación:</span> {pet.locations?.name}
                            </p>
                          </div>
                          
                          {/* Acciones */}
                          <div className="flex gap-2 mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(pet)}
                              className="flex-1"
                            >
                              <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                              Editar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(pet)}
                              className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                            >
                              <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                              Eliminar
                            </Button>
                          </div>
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
                      <TableHead>Raza</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="hidden lg:table-cell">Ubicación</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPets.map((pet) => (
                      <TableRow key={pet.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img
                              src={pet.image_url}
                              alt={pet.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium">{pet.name}</p>
                              <p className="text-sm text-muted-foreground">{pet.age}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{pet.breed}</TableCell>
                        <TableCell>
                          {pet.pet_types?.name}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {pet.locations?.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant={pet.is_available ? "default" : "secondary"}>
                            {pet.is_available ? "Disponible" : "Adoptado"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(pet)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(pet)}
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

          {/* Estadísticas */}
          <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="p-3 md:p-4 bg-muted/50 rounded-lg">
              <p className="text-xs md:text-sm text-muted-foreground">Total</p>
              <p className="text-xl md:text-2xl font-bold">{pets.length}</p>
            </div>
            <div className="p-3 md:p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <p className="text-xs md:text-sm text-green-700 dark:text-green-400">Disponibles</p>
              <p className="text-xl md:text-2xl font-bold text-green-700 dark:text-green-400">
                {pets.filter(p => p.is_available).length}
              </p>
            </div>
            <div className="p-3 md:p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <p className="text-xs md:text-sm text-blue-700 dark:text-blue-400">Adoptados</p>
              <p className="text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-400">
                {pets.filter(p => !p.is_available).length}
              </p>
            </div>
            <div className="p-3 md:p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
              <p className="text-xs md:text-sm text-purple-700 dark:text-purple-400">Este mes</p>
              <p className="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-400">
                {pets.filter(p => {
                  const created = new Date(p.created_at);
                  const now = new Date();
                  return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de formulario */}
      <PetFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        pet={selectedPet}
      />

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedPet?.name || ""}
        loading={deleting}
      />
    </div>
  );
};

export default PetsManager;