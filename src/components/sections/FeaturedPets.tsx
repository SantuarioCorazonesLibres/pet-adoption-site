import PetCard from "@/components/PetCard";
import PetCardSkeleton from "@/components/PetCardSkeleton";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle } from "lucide-react";
import { useFeaturedPets } from "@/hooks/useFeaturedPets";
import PetDetailModal from "@/components/PetDetailModal";

export default function FeaturedPets() {
  const { pets, loading, error } = useFeaturedPets(3);

  // Estados de UI
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Conoce a nuestros <span className="text-primary">amigos especiales</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estas adorables mascotas están buscando un hogar lleno de amor. ¿Podrías ser tú su nueva familia?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <PetCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center py-10 space-y-4">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
            <h3 className="text-xl font-semibold text-foreground">¡Ups! Algo salió mal</h3>
            <p className="text-muted-foreground">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Intentar de nuevo
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Conoce a nuestros <span className="text-primary">amigos especiales</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estas adorables mascotas están buscando un hogar lleno de amor. ¿Podrías ser tú su nueva familia?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {pets.map((pet, index) => (
            <div
              key={pet.id}
              className="opacity-0 animate-fade-in-smooth"
              style={{
                animationDelay: `${index * 0.15}s`,
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
                image_url={pet.image_url}
                gender={pet.gender}
                type={pet.type as "Perro" | "Gato"}
                description={pet.description}
                dewormed={pet.dewormed}
                castrated={pet.castrated ?? undefined}
                personality={pet.personalities}
                rescueHistory={pet.rescue_history}
                rescueDate={pet.rescue_date}
                onLearnMore={() => {
                  setSelectedPet(pet);
                  setIsModalOpen(true);
                }}
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-red-200 hover:text-black/80"
            onClick={() => window.location.href = "/adopcion"}
          >
            Ver Todas las Mascotas
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
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
    </section>
  );
}