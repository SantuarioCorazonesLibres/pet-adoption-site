import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar } from "lucide-react";

interface PetCardProps {
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
  vaccinated: boolean;
  personality: string[];
  rescueHistory: string;
  rescueDate: string;
  castrated?: boolean;
  onLearnMore: () => void;
}

// Componente para el badge de tipo de mascota
const PetTypeBadge = ({ type }: { type: "Perro" | "Gato" }) => (
  <Badge 
    variant={type === "Perro" ? "default" : "secondary"} 
    className="bg-primary text-white"
  >
    {type}
  </Badge>
);

// Componente para el badge de género
const GenderBadge = ({ gender }: { gender: "Macho" | "Hembra" }) => (
  <Badge 
    variant="outline" 
    className={
      gender === "Macho" 
        ? "border-blue-300 text-blue-700" 
        : "border-pink-300 text-pink-700"
    }
  >
    {gender}
  </Badge>
);

// Componente para la información de edad y tamaño
const PetAgeSize = ({ age, size }: { age: string; size: string }) => (
  <div className="flex items-center space-x-1">
    <Calendar className="h-3 w-3" />
    <span>{age}</span>
    <span>•</span>
    <span>{size}</span>
  </div>
);

// Componente para la ubicación
const PetLocation = ({ location }: { location: string }) => (
  <div className="flex items-center space-x-1">
    <MapPin className="h-3 w-3" />
    <span>{location}</span>
  </div>
);

// Componente para la imagen de la mascota
const PetImage = ({ 
  image_url, 
  name, 
  type 
}: { 
  image_url: string; 
  name: string; 
  type: "Perro" | "Gato" 
}) => (
  <div className="relative overflow-hidden rounded-t-lg">
    <img 
      src={image_url} 
      alt={name}
      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
    />
    <div className="absolute top-2 left-2">
      <PetTypeBadge type={type} />
    </div>
  </div>
);

const PetCard = ({ 
  name, 
  breed, 
  age, 
  size, 
  location, 
  image_url, 
  gender, 
  type,
  description,
  onLearnMore
}: PetCardProps) => {
  return (
    <Card className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-1 bg-gradient-card h-[420px] flex flex-col">
      <PetImage image_url={image_url} name={name} type={type} />

      <CardContent className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-foreground">{name}</h3>
            <GenderBadge gender={gender} />
          </div>
          
          <div className="space-y-1 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">{breed}</p>
            <PetAgeSize age={age} size={size} />
            <PetLocation location={location} />
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-primary hover:bg-primary/90 transition-all duration-300"
          onClick={onLearnMore}
        >
          Conocer más
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PetCard;