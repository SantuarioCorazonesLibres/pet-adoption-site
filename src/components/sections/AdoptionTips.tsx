import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import careImage from "@/assets/care.png"

export default function AdoptionTips() {
  return (
    <div>
        {/* Consejos de Adopción */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Consejos para una <span className="text-primary">adopción exitosa</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Adoptar una mascota es una decisión importante. Te ayudamos a prepararte para darle 
                la mejor vida posible a tu nuevo compañero.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Prepara tu hogar</h3>
                    <p className="text-muted-foreground text-sm">
                      Asegúrate de tener todos los suministros necesarios antes de la llegada de tu mascota.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Tiempo de adaptación</h3>
                    <p className="text-muted-foreground text-sm">
                      Dale tiempo a tu nueva mascota para adaptarse. La paciencia es clave.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Atención veterinaria</h3>
                    <p className="text-muted-foreground text-sm">
                      Programa una visita al veterinario dentro de los primeros días.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="mt-8 bg-gradient-warm hover:shadow-warm transition-all duration-300">
                Guía Completa de Adopción
              </Button>
            </div>

            <div className="relative animate-float">
              <img 
                src={careImage} 
                alt="Cuidado amoroso de mascotas"
                className="rounded-2xl shadow-warm w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
