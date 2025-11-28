import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Clock, Award, PawPrint, Calendar, MapPin, Mail, Loader2 } from "lucide-react";
import { useStats } from "@/hooks/useStats";
import main from '@/assets/main.png'
import banner from "@/assets/sirius_coverjpg.jpg";
import successStory from "@/assets/success_story.png";
import teamImage from "@/assets/team.jpg"
import BackgroundDecorations from "@/components/sections/BackgroundDecorations";

const SobreNosotros = () => {
  const { stats, loading } = useStats();
  const formatNumber = (num: number) => `${num}+`;

  // Función para abrir WhatsApp como voluntario
  const handleVolunteerRequest = () => {
    const message = `¡Hola! \n\n¡Me gustaría ser voluntario en Corazones Libres! \n\n¿Cómo puedo ayudar? Me encantaría formar parte de esta hermosa causa.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/524491426403?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Función para abrir correo electrónico
  const handleContactEmail = () => {
    const email = 'jorge.corazoneslibres@hotmail.com';
    const subject = 'Consulta sobre Corazones Libres';
    const body = '¡Hola!\n\nMe gustaría obtener más información sobre Corazones Libres.\n\n';
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="min-h-screen bg-background">
      <BackgroundDecorations />

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
              className="w-full h-full object-cover object-top rounded-lg "
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

        {/* Estadísticas Dinámicas */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Nuestro Impacto</h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <PawPrint className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {stats ? formatNumber(stats.total_rescued_pets) : '50+'}
                </h3>
                <p className="text-muted-foreground">Animales rescatados</p>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <Heart className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {stats ? formatNumber(stats.total_adoptions) : '15+'}
                </h3>
                <p className="text-muted-foreground">Adopciones exitosas</p>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {stats ? formatNumber(stats.total_volunteers) : '5+'}
                </h3>
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
          )}
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
                  className="w-full h-72 object-cover object-top rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">"De la calle a la familia"</h3>
                <p className="text-muted-foreground mb-4">
                  Sookie llegó a mi vida por adopción y fue amor a primera vista. Gracias al
                  acompañamiento de Corazones Libres, el proceso fue cálido y cuidadoso. Hoy es
                  una perrita juguetona y amorosa que llena mi hogar de alegría.
                </p>
                <p className="text-muted-foreground mb-4">
                  "No puedo imaginar mi vida sin Sookie. Llegó para llenar mis días de luz,
                  amor y momentos inolvidables."
                </p>
                <p className="text-sm text-primary font-medium">- Marisol Haro, madre adoptiva</p>
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
        <section className="text-center mb-12">
          <Card className="p-8 bg-primary/5">
            <h2 className="text-3xl font-bold mb-6 text-foreground">¿Quieres Ser Parte del Cambio?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ya sea adoptando, siendo voluntario o haciendo una donación,
              cada acción cuenta para salvar más vidas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                className="bg-gradient-warm hover:shadow-warm transition-all duration-300"
                onClick={() => window.location.href = "/adopcion"}
              >
                <Heart className="h-4 w-4 mr-2" />
                Quiero Adoptar
              </Button>
              <Button
                variant="outline"
                onClick={handleVolunteerRequest}
              >
                <Users className="h-4 w-4 mr-2" />
                Ser Voluntario
              </Button>
              <Button
                variant="outline"
                onClick={handleContactEmail}
              >
                <Mail className="h-4 w-4 mr-2" />
                Contáctanos
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

        {/* Equipo */}
        <section className="mb-12">
          <Card className="overflow-hidden border shadow-lg">
            <div className="relative">
              {/* Header sin gradiente */}
              <div className="p-8 text-center">
                <div className="inline-block mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
                  ¿Ya Conoces Nuestro Equipo?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Personas apasionadas dedicadas a hacer del mundo un lugar mejor para nuestros amigos de cuatro patas
                </p>
              </div>

              {/* Imagen del equipo - Ajustada para móviles */}
              <div className="relative group">
                <div className="overflow-hidden">
                  <img
                    src={teamImage}
                    alt="Equipo de Corazones Libres"
                    className="w-full h-[280px] sm:h-[350px] md:h-[500px] object-contain md:object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Overlay con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center justify-center space-x-2 text-white">
                      <Heart className="h-5 w-5 fill-white" />
                      <span className="text-lg font-medium">Unidos por una causa</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote decorativa */}
              <div className="p-8">
                <div className="max-w-3xl mx-auto">
                  <div className="relative">
                    <svg className="absolute -top-2 -left-4 h-8 w-8 text-primary/20" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M10 8c-3.3 0-6 2.7-6 6s2.7 6 6 6c1.4 0 2.6-.5 3.6-1.2-.4 2.7-2.8 4.8-5.6 4.8v4c5.5 0 10-4.5 10-10V8h-8zm16 0c-3.3 0-6 2.7-6 6s2.7 6 6 6c1.4 0 2.6-.5 3.6-1.2-.4 2.7-2.8 4.8-5.6 4.8v4c5.5 0 10-4.5 10-10V8h-8z" />
                    </svg>
                    <p className="text-center text-lg text-foreground font-medium italic pl-8 pr-8">
                      Juntos trabajamos para dar una segunda oportunidad a cada perrito
                    </p>
                    <svg className="absolute -bottom-2 -right-4 h-8 w-8 text-primary/20 rotate-180" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M10 8c-3.3 0-6 2.7-6 6s2.7 6 6 6c1.4 0 2.6-.5 3.6-1.2-.4 2.7-2.8 4.8-5.6 4.8v4c5.5 0 10-4.5 10-10V8h-8zm16 0c-3.3 0-6 2.7-6 6s2.7 6 6 6c1.4 0 2.6-.5 3.6-1.2-.4 2.7-2.8 4.8-5.6 4.8v4c5.5 0 10-4.5 10-10V8h-8z" />
                    </svg>
                  </div>

                  {/* Estadísticas del equipo */}
                  <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {stats ? stats.total_volunteers : '10'}
                      </div>
                      <div className="text-sm text-muted-foreground">Voluntarios</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">100%</div>
                      <div className="text-sm text-muted-foreground">Dedicación</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">24/7</div>
                      <div className="text-sm text-muted-foreground">Compromiso</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

      </main>
    </div>
  );
};

export default SobreNosotros;