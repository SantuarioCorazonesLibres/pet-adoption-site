import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, Award } from "lucide-react";

export default function CompanyInfo() {
  return (
    <div>
        {/* Valores, Visión y Misión */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nuestro <span className="text-primary">compromiso</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conoce los valores que nos impulsan a seguir rescatando y conectando corazones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-card hover:shadow-warm transition-all duration-300 animate-fade-in">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Misión</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Rescatar, rehabilitar y encontrar hogares amorosos para mascotas abandonadas, 
                  promoviendo la adopción responsable y el bienestar animal.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card hover:shadow-warm transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader className="text-center">
                <div className="mx-auto bg-green-400/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Visión</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Ser la organización líder en adopción de mascotas, creando un mundo donde 
                  cada animal tenga un hogar lleno de amor y cuidado.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card hover:shadow-warm transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <CardHeader className="text-center">
                <div className="mx-auto bg-accent/90 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Valores</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Compasión, transparencia, responsabilidad y dedicación en cada rescate. 
                  Creemos en el poder transformador del amor incondicional.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
