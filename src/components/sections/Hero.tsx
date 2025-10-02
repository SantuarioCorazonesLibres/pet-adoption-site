import heroPetsImage from "@/assets/hero-pets.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div>
        {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge className="bg-red-400/50 text-primary border-primary/20  hover:bg-red-400/50 hover:text-primary">
                  🐾 Cambiando vidas desde 2024
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
                  Encuentra tu
                  <span className="bg-gradient-warm bg-clip-text text-transparent"> mejor amigo </span>
                  para toda la vida
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  En Corazones Libres conectamos mascotas rescatadas con familias amorosas. 
                  Cada adopción es una segunda oportunidad de amor.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-warm hover:shadow-warm transition-all duration-300"
                  onClick={() => window.location.href = "/adopcion"}
                >
                  Adoptar Ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-red-200 hover:text-black/80">
                  Conocer Más
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Adopciones</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">20+</div>
                  <div className="text-sm text-muted-foreground">Mascotas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5+</div>
                  <div className="text-sm text-muted-foreground">Voluntarios</div>
                </div>
              </div>
            </div>

            <div className="relative animate-float">
              <div className="relative">
                <img 
                  src={heroPetsImage} 
                  alt="Perros y gatos felices esperando adopción"
                  className="rounded-2xl shadow-warm w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-soft">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Heart className="h-6 w-6 text-primary" fill="currentColor" />
                  </div>
                  <div>
                    <div className="font-semibold">+50 adopciones</div>
                    <div className="text-sm text-muted-foreground">este mes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
