import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Banner() {
  return (
    <div>
        {/* Call to Action */}
      <section className="py-20 bg-gradient-warm relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center text-white animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para cambiar una vida?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Tu nuevo mejor amigo te está esperando. Comienza el proceso de adopción hoy mismo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => window.location.href = "/adopcion"}
              >
                Explorar Mascotas
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
