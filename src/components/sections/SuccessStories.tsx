import successStoryImage from "@/assets/success_story.png";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

export default function SuccessStories() {
  return (
    <div>
        {/* Historia de Éxito */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative animate-float">
              <img 
                src={successStoryImage} 
                alt="Historia de éxito de adopción"
                className="rounded-2xl shadow-warm w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>

            <div className="animate-fade-in">
              <Badge className="bg-red-400 text-secondary hover:bg-red-400 border-secondary/20 mb-4">
                ✨ Historia de éxito
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Una nueva vida llena de <span className="text-primary">amor</span>
              </h2>
              <blockquote className="text-lg text-muted-foreground mb-6 italic">
                "Sookie llegó a mi vida y fue amor a primera vista. Desde el primer momento sentí que no fui yo quien la eligió, 
                sino que ella me eligió a mí. Hoy es una perrita juguetona y amorosa que llena nuestros días de alegría. 
                Gracias a Corazones Libres, el proceso de adopción fue cálido y acompañado en todo momento. 
                No puedo imaginar mi vida sin ella."
              </blockquote>
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Marisol Haro</div>
                  <div className="text-sm text-muted-foreground">Adoptó a Sookie el 23 de Febrero del 2025</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
