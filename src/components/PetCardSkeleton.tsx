import { Card, CardContent, CardFooter } from "@/components/ui/card";

const PetCardSkeleton = () => {
  return (
    <Card className="h-[420px] flex flex-col overflow-hidden">
      {/* Imagen skeleton con animación */}
      <div className="relative w-full h-48 bg-gradient-to-r from-muted via-muted/50 to-muted animate-shimmer bg-[length:200%_100%]">
        <div className="absolute top-2 left-2 w-16 h-6 bg-muted-foreground/20 rounded-full" />
      </div>

      <CardContent className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Nombre y género */}
          <div className="flex justify-between items-start">
            <div className="h-6 bg-muted rounded w-32 animate-pulse" />
            <div className="h-6 bg-muted rounded-full w-20 animate-pulse" />
          </div>
          
          {/* Raza */}
          <div className="h-4 bg-muted rounded w-40 animate-pulse" />
          
          {/* Edad y tamaño */}
          <div className="h-4 bg-muted rounded w-36 animate-pulse" />
          
          {/* Ubicación */}
          <div className="h-4 bg-muted rounded w-44 animate-pulse" />
          
          {/* Descripción */}
          <div className="space-y-2">
            <div className="h-3 bg-muted rounded w-full animate-pulse" />
            <div className="h-3 bg-muted rounded w-5/6 animate-pulse" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="h-10 bg-muted rounded w-full animate-pulse" />
      </CardFooter>
    </Card>
  );
};

export default PetCardSkeleton;