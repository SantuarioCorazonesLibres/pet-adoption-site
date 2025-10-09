import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { PetFormData } from "@/services/petService";
import { useCatalog } from "@/hooks/useCatalog";

interface PetFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PetFormData) => Promise<void>;
  pet: any | null;
}

const PetFormModal = ({ isOpen, onClose, onSubmit, pet }: PetFormModalProps) => {
  const { items: petTypes } = useCatalog("pet_types");
  const { items: sizes } = useCatalog("sizes");
  const { items: locations } = useCatalog("locations");
  const { items: personalities } = useCatalog("personalities");

  const [formData, setFormData] = useState<PetFormData>({
    name: "",
    breed: "",
    age: "",
    gender: "Macho",
    description: "",
    rescue_history: "",
    rescue_date: "",
    dewormed: false,
    castrated: null,
    image_url: "",
    is_available: true,
    pet_type_id: "",
    size_id: "",
    location_id: "",
    personality_ids: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pet) {
      setFormData({
        name: pet.name,
        breed: pet.breed,
        age: pet.age,
        gender: pet.gender,
        description: pet.description,
        rescue_history: pet.rescue_history,
        rescue_date: pet.rescue_date,
        dewormed: pet.dewormed,
        castrated: pet.castrated,
        image_url: pet.image_url,
        is_available: pet.is_available,
        pet_type_id: pet.pet_type_id,
        size_id: pet.size_id,
        location_id: pet.location_id,
        personality_ids: pet.pets_personalities?.map((p: any) => p.personality_id) || []
      });
    } else {
      setFormData({
        name: "",
        breed: "",
        age: "",
        gender: "Macho",
        description: "",
        rescue_history: "",
        rescue_date: "",
        dewormed: false,
        castrated: null,
        image_url: "",
        is_available: true,
        pet_type_id: "",
        size_id: "",
        location_id: "",
        personality_ids: []
      });
    }
    setError(null);
  }, [pet, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.breed || !formData.pet_type_id || !formData.size_id || !formData.location_id) {
      setError("Por favor completa todos los campos requeridos");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err: any) {
      setError(err.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  const togglePersonality = (id: string) => {
    setFormData(prev => ({
      ...prev,
      personality_ids: prev.personality_ids.includes(id)
        ? prev.personality_ids.filter(p => p !== id)
        : [...prev.personality_ids, id]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{pet ? "Editar" : "Agregar"} Mascota</DialogTitle>
          <DialogDescription>
            {pet ? "Modifica la información de la mascota" : "Completa los datos de la nueva mascota"}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-150px)] pr-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 dark:bg-red-950 p-3 rounded">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombre */}
              <div className="space-y-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* Raza */}
              <div className="space-y-2">
                <Label htmlFor="breed">Raza *</Label>
                <Input
                  id="breed"
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                  required
                />
              </div>

              {/* Edad */}
              <div className="space-y-2">
                <Label htmlFor="age">Edad *</Label>
                <Input
                  id="age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="Ej: 2 años"
                  required
                />
              </div>

              {/* Género */}
              <div className="space-y-2">
                <Label htmlFor="gender">Género *</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value: "Macho" | "Hembra") => setFormData({ ...formData, gender: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Macho">Macho</SelectItem>
                    <SelectItem value="Hembra">Hembra</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tipo */}
              <div className="space-y-2">
                <Label htmlFor="pet_type">Tipo *</Label>
                <Select
                  value={formData.pet_type_id}
                  onValueChange={(value) => setFormData({ ...formData, pet_type_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {petTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tamaño */}
              <div className="space-y-2">
                <Label htmlFor="size">Tamaño *</Label>
                <Select
                  value={formData.size_id}
                  onValueChange={(value) => setFormData({ ...formData, size_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tamaño" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((size) => (
                      <SelectItem key={size.id} value={size.id}>{size.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Ubicación */}
              <div className="space-y-2">
                <Label htmlFor="location">Ubicación *</Label>
                <Select
                  value={formData.location_id}
                  onValueChange={(value) => setFormData({ ...formData, location_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar ubicación" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Fecha de rescate */}
              <div className="space-y-2">
                <Label htmlFor="rescue_date">Fecha de Rescate *</Label>
                <Input
                  id="rescue_date"
                  type="date"
                  value={formData.rescue_date}
                  onChange={(e) => setFormData({ ...formData, rescue_date: e.target.value })}
                  required
                />
              </div>

              {/* URL de imagen */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="image_url">URL de Imagen *</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                  required
                />
              </div>

              {/* Descripción */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Descripción *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              {/* Historia de rescate */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="rescue_history">Historia de Rescate *</Label>
                <Textarea
                  id="rescue_history"
                  value={formData.rescue_history}
                  onChange={(e) => setFormData({ ...formData, rescue_history: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              {/* Personalidades */}
              <div className="space-y-2 md:col-span-2">
                <Label>Personalidades</Label>
                <div className="grid grid-cols-2 gap-2 border rounded-lg p-4 max-h-40 overflow-y-auto">
                  {personalities.map((personality) => (
                    <div key={personality.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`personality-${personality.id}`}
                        checked={formData.personality_ids.includes(personality.id)}
                        onCheckedChange={() => togglePersonality(personality.id)}
                      />
                      <Label
                        htmlFor={`personality-${personality.id}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {personality.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 md:col-span-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dewormed"
                    checked={formData.dewormed}
                    onCheckedChange={(checked) => setFormData({ ...formData, dewormed: !!checked })}
                  />
                  <Label htmlFor="dewormed" className="font-normal cursor-pointer">
                    Desparasitado
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="castrated"
                    checked={formData.castrated === true}
                    onCheckedChange={(checked) => setFormData({ ...formData, castrated: checked ? true : null })}
                  />
                  <Label htmlFor="castrated" className="font-normal cursor-pointer">
                    Castrado/Esterilizado
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_available"
                    checked={formData.is_available}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_available: !!checked })}
                  />
                  <Label htmlFor="is_available" className="font-normal cursor-pointer">
                    Disponible para adopción
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {pet ? "Guardar cambios" : "Crear mascota"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PetFormModal;