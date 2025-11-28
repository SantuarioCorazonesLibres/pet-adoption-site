import { useState, useMemo, useRef, useEffect } from "react";
import { useAllPets } from "@/hooks/useAllPets";
import PetCard from "@/components/PetCard";
import PetCardSkeleton from "@/components/PetCardSkeleton";
import AdoptionFilters from "@/components/AdoptionFilters";
import PetDetailModal from "@/components/PetDetailModal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Filter, AlertCircle } from "lucide-react";
import BackgroundDecorations from "@/components/sections/BackgroundDecorations";

const ITEMS_PER_PAGE = 6;

const Adopcion = () => {

  // -------------------------------
  // Estado de filtros (temporal)
  // -------------------------------
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [tempSelectedTypes, setTempSelectedTypes] = useState<string[]>([]);
  const [tempSelectedSize, setTempSelectedSize] = useState("");
  const [tempSelectedGenders, setTempSelectedGenders] = useState<string[]>([]);
  const [tempSelectedLocation, setTempSelectedLocation] = useState("");

  // -------------------------------
  // Estado de filtros (aplicados)
  // -------------------------------
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [appliedTypes, setAppliedTypes] = useState<string[]>([]);
  const [appliedSize, setAppliedSize] = useState("");
  const [appliedGenders, setAppliedGenders] = useState<string[]>([]);
  const [appliedLocation, setAppliedLocation] = useState("");

  // -------------------------------
  // UI
  // -------------------------------
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  // ✅ FIX PRINCIPAL: Forzar sidebar abierto en desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowFilters(true);
      }
    };

    handleResize(); // Al cargar
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // -------------------------------
  // DATA
  // -------------------------------
  const { pets, locations, loading, error } = useAllPets({
    searchTerm: appliedSearchTerm,
    types: appliedTypes,
    size: appliedSize,
    gender: appliedGenders,
    location: appliedLocation
  });

  // -------------------------------
  // ORDENAMIENTO
  // -------------------------------
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

  // -------------------------------
  // PAGINACION
  // -------------------------------
  const totalPages = Math.ceil(sortedPets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPets = sortedPets.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // ✅ Scroll con offset por navbar sticky
  const handlePageChange = (page: number) => {
    if (page === currentPage) return;

    setCurrentPage(page);

    setTimeout(() => {
      if (!resultsRef.current) return;

      const headerOffset = 110;
      const elementPosition = resultsRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }, 100);
  };

  // -------------------------------
  // Aplicar filtros
  // -------------------------------
  const applyFilters = () => {
    setAppliedSearchTerm(tempSearchTerm);
    setAppliedTypes(tempSelectedTypes);
    setAppliedSize(tempSelectedSize);
    setAppliedGenders(tempSelectedGenders);
    setAppliedLocation(tempSelectedLocation);
    setCurrentPage(1);

    if (window.innerWidth < 1024) {
      setShowFilters(false);
    }
  };

  // -------------------------------
  // Limpiar filtros
  // -------------------------------
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

  // -------------------------------
  // LOADING
  // -------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-warm bg-clip-text text-transparent">
              Encuentra tu compañero perfecto
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conoce a nuestros adorables amigos que están esperando encontrar su hogar
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[1,2,3,4,5,6].map((i) => <PetCardSkeleton key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------
  // ERROR
  // -------------------------------
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
          <h3 className="text-xl font-semibold">¡Ups! Algo salió mal</h3>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Intentar de nuevo
          </Button>
        </div>
      </div>
    );
  }

  // -------------------------------
  // RENDER
  // -------------------------------
  return (
    <div className="min-h-screen bg-background">

      <BackgroundDecorations />

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

          {/* ✅ SIDEBAR CON FIX */}
          <div className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}>
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

          {/* Resultados */}
          <div className="flex-1" ref={resultsRef}>

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
                <Label htmlFor="sort">Ordenar por:</Label>
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

            {/* Grid */}
            {sortedPets.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedPets.map((pet, index) => (
                    <div
                      key={pet.id}
                      className="opacity-0 animate-fade-in-smooth"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animationFillMode: "forwards"
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

                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                          />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🐾</div>
                <h3 className="text-xl font-semibold mb-2">No se encontraron mascotas</h3>
                <p className="text-muted-foreground mb-4">
                  Intenta ajustar tus filtros
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Limpiar filtros
                </Button>
              </div>
            )}

          </div>
        </div>
      </div>

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
