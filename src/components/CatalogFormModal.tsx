import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { CatalogItem } from "@/types/catalog.types";

interface CatalogFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description?: string }) => Promise<void>;
  item: CatalogItem | null;
  catalogName: string;
  hasDescription: boolean;
}

const CatalogFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  item,
  catalogName,
  hasDescription
}: CatalogFormModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description || "");
    } else {
      setName("");
      setDescription("");
    }
    setError(null);
  }, [item, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("El nombre es requerido");
      return;
    }

    setLoading(true);
    try {
      const data: { name: string; description?: string } = { name: name.trim() };
      if (hasDescription) {
        data.description = description.trim() || undefined;
      }
      await onSubmit(data);
      onClose();
    } catch (err: any) {
      setError(err.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {item ? "Editar" : "Crear"} {catalogName}
          </DialogTitle>
          <DialogDescription>
            {item
              ? `Modifica la información de ${catalogName.toLowerCase()}`
              : `Agrega un nuevo registro a ${catalogName.toLowerCase()}`
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 dark:bg-red-950 p-3 rounded">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre del registro"
                disabled={loading}
                required
              />
            </div>

            {hasDescription && (
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descripción opcional"
                  disabled={loading}
                  rows={3}
                />
              </div>
            )}
          </div>

          <DialogFooter>
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
              {item ? "Guardar cambios" : "Crear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CatalogFormModal;