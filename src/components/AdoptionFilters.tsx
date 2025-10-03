import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, X } from "lucide-react";

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
  onClose,
}: AdoptionFiltersProps) => {
  if (!showFilters) return null;

  // Estado local para el input
  const [localSearch, setLocalSearch] = useState(searchTerm);

  const handleSearch = () => {
    onSearchChange(localSearch.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <Card className="sticky top-24">
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
          <div className="relative flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Nombre de la mascota..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10"
              />
            </div>
            <Button
              onClick={handleSearch}
              size="icon"
              className="bg-primary hover:bg-primary/90"
            >
              <Search className="h-4 w-4 text-white" />
            </Button>
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

        {/* Botón para limpiar filtros */}
        <Button variant="outline" onClick={onClearFilters} className="w-full">
          Limpiar filtros
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdoptionFilters;
