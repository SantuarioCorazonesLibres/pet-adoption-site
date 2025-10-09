import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Clock, Award, PawPrint, Calendar, MapPin, Mail } from "lucide-react";
import main from '@/assets/main.png'
import banner from "@/assets/banner.jpg";
import successStory from "@/assets/success-story.jpg";

const SobreNosotros = () => {
  return (
    <div className="min-h-screen bg-background">
      
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-warm bg-clip-text text-transparent">
            Sobre Corazones Libres
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Desde 2024, hemos dedicado nuestros corazones a rescatar, rehabilitar y encontrar hogares 
            amorosos para animales en situación de abandono y maltrato.
          </p>
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8">
            <img 
              src={banner} 
              alt="Mascotas rescatadas felices" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <p className="text-white text-lg font-medium p-6">
                "Cada vida que salvamos es una victoria del amor sobre el abandono"
              </p>
            </div>
          </div>
        </section>

        {/* Nuestra Historia */}
        <section className="mb-12">
          <Card className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Nuestra Historia</h2>
                <p className="text-muted-foreground mb-4">
                  Corazones Libres nació en 2024 de la visión de un grupo de voluntarios comprometidos 
                  con el bienestar animal. Lo que comenzó como un pequeño refugio casero, ha crecido 
                  hasta convertirse en una organización reconocida que ha salvado más de 50 vidas.
                </p>
                <p className="text-muted-foreground mb-4">
                  Nuestro enfoque va más allá del simple rescate. Creemos en la rehabilitación integral, 
                  la educación comunitaria y la creación de vínculos duraderos entre mascotas y familias.
                </p>
                <p className="text-muted-foreground">
                  Cada historia de éxito nos motiva a seguir adelante, sabiendo que estamos cambiando 
                  no solo la vida de los animales, sino también la de las familias que los adoptan.
                </p>
              </div>
              <div className="relative">
                <img 
                  src={main} 
                  alt="Cuidado de mascotas" 
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Salvando vidas desde 2024
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Estadísticas */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Nuestro Impacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <PawPrint className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">50+</h3>
              <p className="text-muted-foreground">Animales rescatados</p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Heart className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">15+</h3>
              <p className="text-muted-foreground">Adopciones exitosas</p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">5+</h3>
              <p className="text-muted-foreground">Voluntarios activos</p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Clock className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">24/7</h3>
              <p className="text-muted-foreground">Atención de emergencias</p>
            </Card>
          </div>
        </section>

        {/* Nuestra Misión y Visión */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-8">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-2xl">
                  <Heart className="h-6 w-6 text-primary mr-2" />
                  Nuestra Misión
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Rescatar, rehabilitar y reubicar animales en situación de abandono, maltrato o 
                  vulnerabilidad, proporcionándoles atención médica, amor y cuidado mientras 
                  encontramos familias responsables que les brinden un hogar para toda la vida.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-2xl">
                  <Award className="h-6 w-6 text-primary mr-2" />
                  Nuestra Visión
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Crear una sociedad donde todos los animales sean valorados, respetados y 
                  protegidos. Aspiramos a ser el refugio de referencia en México, liderando 
                  programas de educación y concientización sobre el bienestar animal.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Historia de Éxito */}
        <section className="mb-12">
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-primary/10">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Historia de Éxito</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative">
                <img 
                  src={successStory} 
                  alt="Historia de éxito" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">"De la calle a la familia"</h3>
                <p className="text-muted-foreground mb-4">
                  Luna llegó a nosotros desnutrida y temerosa después de vivir en las calles. 
                  Tras tres meses de rehabilitación física y emocional, encontró su hogar 
                  perfecto con la familia Rodríguez.
                </p>
                <p className="text-muted-foreground mb-4">
                  "No puedo imaginar nuestras vidas sin Luna. Ella trajo tanta alegría a 
                  nuestro hogar que estamos considerando adoptar un segundo compañero."
                </p>
                <p className="text-sm text-primary font-medium">- María Rodríguez, madre adoptiva</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Nuestro Equipo */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">¿Qué Hacemos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Heart className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Rescate</h3>
              <p className="text-muted-foreground">
                Respondemos a reportes de animales en situación de riesgo y calle, 
                proporcionando rescate inmediato y atención de emergencia.
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Award className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Rehabilitación</h3>
              <p className="text-muted-foreground">
                Brindamos atención médica, nutricional y conductual para 
                preparar a los animales para su nueva vida en un hogar.
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Adopción</h3>
              <p className="text-muted-foreground">
                Facilitamos el proceso de adopción responsable, 
                asegurando la compatibilidad perfecta entre mascotas y familias.
              </p>
            </Card>
          </div>
        </section>

        {/* Contacto */}
        <section className="text-center">
          <Card className="p-8 bg-primary/5">
            <h2 className="text-3xl font-bold mb-6 text-foreground">¿Quieres Ser Parte del Cambio?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ya sea adoptando, siendo voluntario o haciendo una donación, 
              cada acción cuenta para salvar más vidas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="bg-gradient-warm hover:shadow-warm transition-all duration-300">
                <Heart className="h-4 w-4 mr-2" />
                Quiero Adoptar
              </Button>
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Ser Voluntario
              </Button>
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Contactanos
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t">
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Peñuelas, Aguascalientes, México</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">jorge.corazoneslibres@hotmail.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Fundada el 5 de Octubre del 2024</span>
              </div>
            </div>
          </Card>
        </section>
      </main>

      
    </div>
  );
};

export default SobreNosotros;