import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div>
        {/* Contacto */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ponte en <span className="text-primary">contacto</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ¿Tienes preguntas? Estamos aquí para ayudarte en tu proceso de adopción
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center bg-gradient-card hover:shadow-soft transition-all duration-300">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Teléfono(s)</h3>
                <p className="text-muted-foreground">449 142 6403 / 449 920 2554</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card hover:shadow-soft transition-all duration-300">
              <CardContent className="p-6">
                <div className="bg-green-300/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground w-full text-center break-words">santuariocorazoneslibres@outlook.com</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card hover:shadow-soft transition-all duration-300">
              <CardContent className="p-6">
                <div className="bg-accent/90 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Ubicación</h3>
                <p className="text-muted-foreground">Peñuelas, Aguascalientes, México</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
