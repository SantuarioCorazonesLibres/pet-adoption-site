import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { testimonialsMock } from "@/mocks/testimonials.ts";
import TestimonialCard from '../components/TestimonialCard';
import BackgroundDecorations from "@/components/sections/BackgroundDecorations";


export default function Testimonials() {
  return (
    <div className="min-h-screen bg-gray-50">

      <BackgroundDecorations />

      <section className="relative overflow-hidden py-10 px-4">
        <div className="absolute inset-0 bg-red-400 opacity-5" />
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-16 animate-fade-in">
            <Badge variant="outline" className="mb-4 text-primary border-primary">
              Corazones Libres
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Historias que Inspiran
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Cada adopción es una historia de amor. Estas son las experiencias de quienes decidieron abrir su corazón y hogar a un nuevo miembro de la familia.
            </p>
          </div>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        <div className="space-y-6 sm:space-y-8">
          {testimonialsMock.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 px-2">
              ¿Listo para escribir tu propia historia?
            </h2>
            <p className="text-gray-600 mb-6 px-2">
              Únete a nuestra familia de adoptantes y dale a un perrito la
              oportunidad que merece.
            </p>
            <Link to="/adopcion">
              <button className="bg-red-500 hover:bg-red-700 text-white font-medium px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition-colors duration-300 text-sm sm:text-base">
                Adopta Ahora
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
