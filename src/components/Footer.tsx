import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoTransparent from "@/assets/Logo_transparent.png";

const Footer = () => {
  return (
    <footer className="bg-accent border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                  src={LogoTransparent} 
                  alt="Logotipo de la asociación"
                  className="h-10 w-10 "
                />
              {/* <Heart className="h-6 w-6 text-primary" fill="currentColor" /> */}
              <span className="text-lg font-bold bg-gradient-warm bg-clip-text text-transparent">
                Corazones Libres
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Conectando corazones con patas, creando familias llenas de amor.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-muted-foreground hover:text-primary transition-colors">Inicio</a></li>
              <li><a href="/adopcion" className="text-muted-foreground hover:text-primary transition-colors">Adopción</a></li>
              <li><a href="/sobre-nosotros" className="text-muted-foreground hover:text-primary transition-colors">Nosotros</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Voluntariado</a></li>
            </ul>
          </div>

          {/* Adopción */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Adopción</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Requisitos</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Proceso</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cuidados</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Testimonios</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contacto</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>jorge.corazoneslibres@hotmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>449 142 6403 / 449 920 2554</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Peñuelas, Aguascalientes, México</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Corazones Libres. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;