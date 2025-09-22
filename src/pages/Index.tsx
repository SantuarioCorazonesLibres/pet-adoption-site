import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import PetCard from "@/components/PetCard";
import { Heart, Shield, Users, Award, ArrowRight, CheckCircle, Phone, Mail, MapPin } from "lucide-react";
import heroPetsImage from "@/assets/hero-pets.jpg";
import careIconImage from "@/assets/care-icon.jpg";
import successStoryImage from "@/assets/success-story.jpg";

const Index = () => {
  // Mock data para mascotas destacadas
  const featuredPets = [
    {
      id: "1",
      name: "Luna",
      breed: "Golden Retriever",
      age: "2 años",
      size: "Grande",
      location: "Ciudad de México",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400",
      gender: "Hembra" as const,
      type: "Perro" as const,
      description: "Luna es una perrita muy cariñosa y juguetona, perfecta para familias con niños.",
      dewormed: true,
      personality: ["Cariñosa", "Juguetona", "Familiar", "Activa"],
      rescueHistory: "Rescatada de la calle cuando era cachorra, siempre ha sido muy sociable.",
      rescueDate: "10 Ene 2024"
    },
    {
      id: "2",
      name: "Michi",
      breed: "Gato Común",
      age: "1 año",
      size: "Mediano",
      location: "Guadalajara",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400",
      gender: "Macho" as const,
      type: "Gato" as const,
      description: "Michi es un gatito muy tranquilo y cariñoso, ideal para departamentos.",
      dewormed: true,
      personality: ["Tranquilo", "Cariñoso", "Independiente", "Dulce"],
      rescueHistory: "Encontrado abandonado en un parque, muy bien socializado con humanos.",
      rescueDate: "22 Feb 2024"
    },
    {
      id: "3",
      name: "Rocky",
      breed: "Pastor Alemán",
      age: "3 años",
      size: "Grande",
      location: "Monterrey",
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400",
      gender: "Macho" as const,
      type: "Perro" as const,
      description: "Rocky es un perro muy leal y protector, excelente guardián para la familia.",
      dewormed: true,
      personality: ["Leal", "Protector", "Inteligente", "Valiente"],
      rescueHistory: "Entregado por una familia que se mudó, muy bien entrenado.",
      rescueDate: "05 Mar 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-background">      
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge className="bg-primary-light text-primary border-primary/20">
                  🐾 Cambiando vidas desde 2020
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
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary-light">
                  Conocer Más
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Adopciones</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">200+</div>
                  <div className="text-sm text-muted-foreground">Mascotas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100+</div>
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

      {/* Mascotas Destacadas */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Conoce a nuestros <span className="text-primary">amigos especiales</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estas adorables mascotas están buscando un hogar lleno de amor. ¿Podrías ser tú su nueva familia?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredPets.map((pet, index) => (
              <div 
                key={pet.id} 
                className="animate-fade-in" 
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* <PetCard {...pet} onLearnMore={() => {}} /> */}
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary-light"
              onClick={() => window.location.href = "/adopcion"}
            >
              Ver Todas las Mascotas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

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
                <div className="mx-auto bg-secondary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-secondary" />
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
                <div className="mx-auto bg-accent/50 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
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
                src={careIconImage} 
                alt="Cuidado amoroso de mascotas"
                className="rounded-2xl shadow-warm w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Preguntas <span className="text-primary">frecuentes</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Resolvemos las dudas más comunes sobre el proceso de adopción
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-border rounded-lg px-6 bg-gradient-card">
                <AccordionTrigger className="text-left hover:no-underline">
                  ¿Cuáles son los requisitos para adoptar?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Para adoptar necesitas ser mayor de edad, tener una identificación oficial, 
                  comprobante de domicilio y demostrar que puedes brindar un hogar estable. 
                  También realizamos una entrevista para asegurar la compatibilidad.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-border rounded-lg px-6 bg-gradient-card">
                <AccordionTrigger className="text-left hover:no-underline">
                  ¿Cuánto cuesta adoptar una mascota?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  La adopción tiene un costo de recuperación que varía entre $800 y $1,500 pesos, 
                  dependiendo de la mascota. Este monto cubre vacunas, esterilización y cuidados médicos básicos.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-border rounded-lg px-6 bg-gradient-card">
                <AccordionTrigger className="text-left hover:no-underline">
                  ¿Puedo devolver una mascota si no nos adaptamos?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Sí, entendemos que la adaptación puede ser difícil. Tenemos un período de prueba de 30 días 
                  y siempre estamos dispuestos a recibir de vuelta a nuestras mascotas si es necesario.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-border rounded-lg px-6 bg-gradient-card">
                <AccordionTrigger className="text-left hover:no-underline">
                  ¿Las mascotas están esterilizadas y vacunadas?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Todas nuestras mascotas son esterilizadas, vacunadas y desparasitadas antes de la adopción. 
                  También incluimos un certificado de salud firmado por nuestro veterinario.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-border rounded-lg px-6 bg-gradient-card">
                <AccordionTrigger className="text-left hover:no-underline">
                  ¿Ofrecen seguimiento después de la adopción?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Sí, realizamos seguimiento durante los primeros 6 meses para asegurar que todo marche bien. 
                  Nuestro equipo está disponible para apoyo y consejos cuando lo necesites.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

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
              <Badge className="bg-secondary-light text-secondary border-secondary/20 mb-4">
                ✨ Historia de éxito
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Una nueva vida llena de <span className="text-primary">amor</span>
              </h2>
              <blockquote className="text-lg text-muted-foreground mb-6 italic">
                "Adoptar a Luna cambió nuestras vidas completamente. Llegó asustada y desconfiada, 
                pero con amor y paciencia se convirtió en el corazón de nuestra familia. 
                No podemos imaginar nuestro hogar sin ella."
              </blockquote>
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Familia González</div>
                  <div className="text-sm text-muted-foreground">Adoptaron a Luna hace 2 años</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contáctanos
              </Button>
            </div>
          </div>
        </div>
      </section>

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
                <h3 className="font-semibold mb-2">Teléfono</h3>
                <p className="text-muted-foreground">+52 (55) 1234-5678</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card hover:shadow-soft transition-all duration-300">
              <CardContent className="p-6">
                <div className="bg-secondary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">info@corazoneslibres.org</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card hover:shadow-soft transition-all duration-300">
              <CardContent className="p-6">
                <div className="bg-accent/50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Ubicación</h3>
                <p className="text-muted-foreground">Ciudad de México, México</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Index;