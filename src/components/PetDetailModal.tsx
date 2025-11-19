import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Shield, Clock, User, MessageCircle, Syringe } from "lucide-react";
import { useState } from "react";

interface PetDetailModalProps {
  pet: {
    id: string;
    name: string;
    breed: string;
    age: string;
    size: string;
    location: string;
    image_url: string;
    gender: "Macho" | "Hembra";
    type: "Perro" | "Gato";
    description: string;
    dewormed: boolean;
    personality: string[];
    rescueHistory: string;
    rescueDate: string;
    castrated?: boolean;
    vaccinated: boolean;
  };
  isOpen: boolean;
  onClose: () => void;
}

const PetDetailModal = ({ pet, isOpen, onClose }: PetDetailModalProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAdoptionRequest = () => {
    const message = `¡Hola! \n\nVi a ${pet.name} y me encantaría saber más sobre su adopción \n\n¿Podrían contarme un poco sobre el proceso y los siguientes pasos? ¡Muchas gracias!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/524491426403?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{pet.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Imagen principal */}
          <div className="relative">
            <img
              src={pet.image_url}
              alt={pet.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 ${isFavorite ? 'text-red-500' : 'text-gray-600'
                }`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
            </Button>
            <div className="absolute top-2 left-2">
              <Badge variant={pet.type === "Perro" ? "default" : "secondary"} className="bg-primary text-white">
                {pet.type}
              </Badge>
            </div>
          </div>

          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Información básica</h3>
              <div className="space-y-1 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Raza:</span>
                  <span className="font-medium">{pet.breed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Edad:</span>
                  <span className="font-medium">{pet.age}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tamaño:</span>
                  <span className="font-medium">{pet.size}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Género:</span>
                  <Badge variant="outline" className={pet.gender === "Macho" ? "border-blue-300 text-blue-700" : "border-pink-300 text-pink-700"}>
                    {pet.gender}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Ubicación:</span>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span className="font-medium">{pet.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Estado de salud</h3>
              <div className="space-y-1 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Vacunado:</span>
                  <div className="flex items-center space-x-1">
                    <Syringe className={`h-3 w-3 ${pet.vaccinated ? 'text-green-600' : 'text-orange-600'}`} />
                    <span className={pet.vaccinated ? 'text-green-600' : 'text-orange-600'}>
                      {pet.vaccinated ? "Sí" : "No"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Desparasitado:</span>
                  <div className="flex items-center space-x-1">
                    <Shield className={`h-3 w-3 ${pet.dewormed ? 'text-green-600' : 'text-orange-600'}`} />
                    <span className={pet.dewormed ? 'text-green-600' : 'text-orange-600'}>
                      {pet.dewormed ? "Sí" : "Pendiente"}
                    </span>
                  </div>
                </div>
                {pet.gender === "Macho" && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Castrado:</span>
                    <div className="flex items-center space-x-1">
                      <User className={`h-3 w-3 ${pet.castrated ? 'text-green-600' : 'text-orange-600'}`} />
                      <span className={pet.castrated ? 'text-green-600' : 'text-orange-600'}>
                        {pet.castrated ? "Sí" : "No"}
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Fecha de rescate:</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span className="font-medium">{pet.rescueDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Descripción</h3>
            <p className="text-muted-foreground">{pet.description}</p>
          </div>

          {/* Personalidad */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Personalidad</h3>
            <div className="flex flex-wrap gap-2">
              {pet.personality.map((trait, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {trait}
                </Badge>
              ))}
            </div>
          </div>

          {/* Historia de rescate */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Historia de rescate</h3>
            <p className="text-muted-foreground">{pet.rescueHistory}</p>
          </div>

          {/* Botón de acción */}
          <div className="pt-4">
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={handleAdoptionRequest}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Solicitar adopción por WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PetDetailModal;