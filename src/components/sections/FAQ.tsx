import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div>
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
                  Elegir a tu compañero de vida, llenar el formato de adopción de la asociación, entregar copia de tu INE, 
                  fotografías del hogar donde vivirá tu futuro adoptado, aceptar seguimiento con fotos, videos y visitas.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-border rounded-lg px-6 bg-gradient-card">
                <AccordionTrigger className="text-left hover:no-underline">
                  ¿Cuánto espacio requiero para la mascota?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Dependerá del tamaño y necesidades del adoptado. Se sugiere que, de acuerdo al tamaño de tu casa, 
                  busques al adoptante ideal. También debes considerar la edad, ya que los perros jóvenes necesitan más actividad física.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-border rounded-lg px-6 bg-gradient-card">
                <AccordionTrigger className="text-left hover:no-underline">
                  ¿Las mascotas están vacunadas, desparasitadas y esterilizadas?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Sí. Cada mascota cuenta con su control de salud. Te pedimos que continúes con su seguimiento médico, aplicación de vacunas y desparasitación.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-border rounded-lg px-6 bg-gradient-card">
                <AccordionTrigger className="text-left hover:no-underline">
                  ¿Ofrecen seguimiento después de la adopción?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Sí. Pedimos fotos y videos, especialmente durante los primeros meses que son de adaptación. 
                  Requerimos mucha comunicación al inicio y, gradualmente, se va reduciendo hasta asegurar que ya es parte de tu familia.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-border rounded-lg px-6 bg-gradient-card">
                <AccordionTrigger className="text-left hover:no-underline">
                  ¿Puedo adoptar si ya tengo otras mascotas?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Sí, pero es importante que tus mascotas actuales estén esterilizadas, vacunadas y desparasitadas. 
                  También valoramos la buena convivencia entre ellas, por lo que podemos orientarte en la introducción.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  )
}
