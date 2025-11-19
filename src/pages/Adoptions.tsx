import { useState, useMemo, useRef } from "react";
import { useAllPets } from "@/hooks/useAllPets";
import PetCard from "@/components/PetCard";
import PetCardSkeleton from "@/components/PetCardSkeleton";
import AdoptionFilters from "@/components/AdoptionFilters";
import AdoptionRequirements from "@/components/AdoptionRequirements";
import PetDetailModal from "@/components/PetDetailModal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Filter, AlertCircle } from "lucide-react";

const ITEMS_PER_PAGE = 6;

const Adopcion = () => {
  // Estados de filtros temporales (no aplicados)
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [tempSelectedTypes, setTempSelectedTypes] = useState<string[]>([]);
  const [tempSelectedSize, setTempSelectedSize] = useState("");
  const [tempSelectedGenders, setTempSelectedGenders] = useState<string[]>([]);
  const [tempSelectedLocation, setTempSelectedLocation] = useState("");
  
  // Estados de filtros aplicados (los que se envían al hook)
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [appliedTypes, setAppliedTypes] = useState<string[]>([]);
  const [appliedSize, setAppliedSize] = useState("");
  const [appliedGenders, setAppliedGenders] = useState<string[]>([]);
  const [appliedLocation, setAppliedLocation] = useState("");
  
  // Estados de UI
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ref para scroll a resultados
  const resultsRef = useRef<HTMLDivElement>(null);

  // Obtener datos con los filtros aplicados
  const { pets, locations, loading, error } = useAllPets({
    searchTerm: appliedSearchTerm,
    types: appliedTypes,
    size: appliedSize,
    gender: appliedGenders,
    location: appliedLocation
  });

  // Ordenar mascotas
  const sortedPets = useMemo(() => {
    const sorted = [...pets];
    switch (sortBy) {
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "age":
        return sorted.sort((a, b) => a.age.localeCompare(b.age));
      default:
        return sorted;
    }
  }, [pets, sortBy]);

  // Paginación
  const totalPages = Math.ceil(sortedPets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPets = sortedPets.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Aplicar filtros
  const applyFilters = () => {
    setAppliedSearchTerm(tempSearchTerm);
    setAppliedTypes(tempSelectedTypes);
    setAppliedSize(tempSelectedSize);
    setAppliedGenders(tempSelectedGenders);
    setAppliedLocation(tempSelectedLocation);
    setCurrentPage(1);
    // Solo cerrar filtros en móvil
    if (window.innerWidth < 1024) {
      setShowFilters(false);
    }
  };

  // Limpiar filtros
  const clearFilters = () => {
    setTempSearchTerm("");
    setTempSelectedTypes([]);
    setTempSelectedSize("");
    setTempSelectedGenders([]);
    setTempSelectedLocation("");
    setAppliedSearchTerm("");
    setAppliedTypes([]);
    setAppliedSize("");
    setAppliedGenders([]);
    setAppliedLocation("");
    setCurrentPage(1);
  };

  // Manejador de cambio de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Hacer scroll a los resultados
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Estados de carga y error
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-warm bg-clip-text text-transparent">
              Encuentra tu compañero perfecto
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conoce a nuestros adorables amigos que están esperando encontrar su hogar para siempre
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <PetCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20 space-y-4">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
            <h3 className="text-xl font-semibold text-foreground">¡Ups! Algo salió mal</h3>
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Intentar de nuevo
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-warm bg-clip-text text-transparent">
            Encuentra tu compañero perfecto
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conoce a nuestros adorables amigos que están esperando encontrar su hogar para siempre
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar con filtros */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <AdoptionFilters
                showFilters={showFilters}
                searchTerm={tempSearchTerm}
                selectedTypes={tempSelectedTypes}
                selectedSize={tempSelectedSize}
                selectedGenders={tempSelectedGenders}
                selectedLocation={tempSelectedLocation}
                locations={locations}
                onSearchChange={setTempSearchTerm}
                onTypeChange={(type, checked) => {
                  setTempSelectedTypes(checked 
                    ? [...tempSelectedTypes, type] 
                    : tempSelectedTypes.filter(t => t !== type)
                  );
                }}
                onSizeChange={setTempSelectedSize}
                onGenderChange={(gender, checked) => {
                  setTempSelectedGenders(checked 
                    ? [...tempSelectedGenders, gender] 
                    : tempSelectedGenders.filter(g => g !== gender)
                  );
                }}
                onLocationChange={setTempSelectedLocation}
                onClearFilters={clearFilters}
                onApplyFilters={applyFilters}
                onClose={() => setShowFilters(false)}
              />
          </div>

          {/* Área principal */}
          <div className="flex-1" ref={resultsRef}>
            {/* Controles superiores */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(true)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                <p className="text-sm text-muted-foreground">
                  {sortedPets.length} mascotas encontradas
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Label htmlFor="sort" className="text-sm">Ordenar por:</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Más recientes</SelectItem>
                    <SelectItem value="name">Nombre</SelectItem>
                    <SelectItem value="age">Edad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Requisitos de Adopción */}
            <AdoptionRequirements />

            {/* Grid de mascotas */}
            {sortedPets.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedPets.map((pet, index) => (
                    <div 
                      key={pet.id}
                      className="opacity-0 animate-fade-in-smooth" 
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                        animationFillMode: 'forwards'
                      }}
                    >
                      <PetCard 
                        id={pet.id}
                        name={pet.name}
                        breed={pet.breed}
                        age={pet.age}
                        size={pet.size}
                        location={pet.location}
                        type={pet.type as "Perro" | "Gato"}
                        gender={pet.gender as "Macho" | "Hembra"}
                        description={pet.description}
                        image_url={pet.image_url}
                        personality={pet.personalities || []}
                        rescueHistory={pet.rescue_history || ''}
                        rescueDate={pet.rescue_date || ''}
                        dewormed={pet.dewormed}
                        castrated={pet.castrated ?? undefined}
                        vaccinated={pet.vaccinated ?? false}
                        onLearnMore={() => {
                          setSelectedPet(pet);
                          setIsModalOpen(true);
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              // Mensaje cuando no hay resultados
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🐾</div>
                <h3 className="text-xl font-semibold mb-2">No se encontraron mascotas</h3>
                <p className="text-muted-foreground mb-4">
                  Intenta ajustar tus filtros para encontrar más opciones
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modal de detalles */}
      {selectedPet && (
        <PetDetailModal
          pet={{
            ...selectedPet,
            image_url: selectedPet.images?.[0] || selectedPet.image_url || '',
            personality: selectedPet.personalities || [],
            rescueHistory: selectedPet.rescue_history || '',
            rescueDate: selectedPet.rescue_date || ''
          }}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPet(null);
          }}
        />
      )}
    </div>
  );
};

export default Adopcion;