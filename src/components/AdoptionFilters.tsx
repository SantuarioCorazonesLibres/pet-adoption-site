import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, X, Filter } from "lucide-react";

interface AdoptionFiltersProps {
  showFilters: boolean;
  searchTerm: string;
  selectedTypes: string[];
  selectedSize: string;
  selectedGenders: string[];
  selectedLocation: string;
  locations: string[];
  onSearchChange: (value: string) => void;
  onTypeChange: (type: string, checked: boolean) => void;
  onSizeChange: (value: string) => void;
  onGenderChange: (gender: string, checked: boolean) => void;
  onLocationChange: (value: string) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
  onClose: () => void;
}

const AdoptionFilters = ({
  showFilters,
  searchTerm,
  selectedTypes,
  selectedSize,
  selectedGenders,
  selectedLocation,
  locations,
  onSearchChange,
  onTypeChange,
  onSizeChange,
  onGenderChange,
  onLocationChange,
  onClearFilters,
  onApplyFilters,
  onClose,
}: AdoptionFiltersProps) => {
  if (!showFilters) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Filtros</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Búsqueda */}
        <div className="space-y-2">
          <Label htmlFor="search">Buscar por nombre</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Nombre de la mascota..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tipo de mascota */}
        <div className="space-y-3">
          <Label>Tipo de mascota</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dogs"
                checked={selectedTypes.includes("Perro")}
                onCheckedChange={(checked) =>
                  onTypeChange("Perro", checked as boolean)
                }
              />
              <Label
                htmlFor="dogs"
                className="text-sm font-normal cursor-pointer"
              >
                Perros
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="cats"
                checked={selectedTypes.includes("Gato")}
                onCheckedChange={(checked) =>
                  onTypeChange("Gato", checked as boolean)
                }
              />
              <Label
                htmlFor="cats"
                className="text-sm font-normal cursor-pointer"
              >
                Gatos
              </Label>
            </div>
          </div>
        </div>

        {/* Tamaño */}
        <div className="space-y-2">
          <Label htmlFor="size">Tamaño</Label>
          <Select value={selectedSize} onValueChange={onSizeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tamaño" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pequeño">Pequeño</SelectItem>
              <SelectItem value="Mediano">Mediano</SelectItem>
              <SelectItem value="Grande">Grande</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Género */}
        <div className="space-y-3">
          <Label>Género</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="male"
                checked={selectedGenders.includes("Macho")}
                onCheckedChange={(checked) =>
                  onGenderChange("Macho", checked as boolean)
                }
              />
              <Label
                htmlFor="male"
                className="text-sm font-normal cursor-pointer"
              >
                Macho
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="female"
                checked={selectedGenders.includes("Hembra")}
                onCheckedChange={(checked) =>
                  onGenderChange("Hembra", checked as boolean)
                }
              />
              <Label
                htmlFor="female"
                className="text-sm font-normal cursor-pointer"
              >
                Hembra
              </Label>
            </div>
          </div>
        </div>

        {/* Ubicación */}
        <div className="space-y-2">
          <Label htmlFor="location">Ubicación</Label>
          <Select value={selectedLocation} onValueChange={onLocationChange}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar ubicación" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Botones de acción */}
        <div className="space-y-2 pt-4">
          <Button 
            onClick={onApplyFilters} 
            className="w-full"
          >
            <Filter className="h-4 w-4 mr-2" />
            Aplicar Filtros
          </Button>
          <Button 
            variant="outline" 
            onClick={onClearFilters} 
            className="w-full"
          >
            Limpiar filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdoptionFilters;