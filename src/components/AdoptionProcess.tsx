import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BackgroundDecorations from "@/components/sections/BackgroundDecorations";
import { adoptionProcessSteps } from "@/mocks/adoptionProcessSteps";
import { adoptionConsiderations } from "@/mocks/adoptionConsiderations";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    CheckCircle2,
    AlertCircle,
} from "lucide-react";


const AdoptionProcess = () => {
    return (
        <div className="min-h-screen">
            <BackgroundDecorations />

            {/* Hero Section */}
            <section className="relative overflow-hidden py-10 px-4">
                <div className="absolute inset-0 bg-red-400 opacity-5" />
                <div className="container mx-auto max-w-6xl relative">
                    <div className="text-center mb-16 animate-fade-in">
                        <Badge variant="outline" className="mb-4 text-primary border-primary">
                            Corazones Libres
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                            Proceso de Adopción
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Nuestro protocolo garantiza el bienestar de cada animalito y asegura que llegue a un hogar responsable y amoroso.
                            Cada paso refleja nuestro compromiso con una adopción responsable.
                        </p>
                    </div>
                </div>
            </section>

            {/* Process Timeline */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="space-y-8">
                        {adoptionProcessSteps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <Card
                                    key={step.number}
                                    className={`relative overflow-hidden transition-all duration-300 hover:shadow-glow animate-fade-in border-2 ${step.highlight
                                            ? "border-primary bg-accent/50"
                                            : "border-border"
                                        }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="p-6 md:p-8">
                                        <div className="flex flex-col md:flex-row gap-6 items-start">
                                            {/* Number & Icon */}
                                            <div className="flex-shrink-0">
                                                <div className="relative">
                                                    <div className="w-20 h-20 rounded-2xl bg-red-400 flex items-center justify-center shadow-soft">
                                                        <Icon className="w-10 h-10 text-white" />
                                                    </div>
                                                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                                                        {step.number}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <div className="mb-3">
                                                    <h3 className="text-2xl font-bold text-foreground mb-1">
                                                        {step.title}
                                                    </h3>
                                                    <p className="text-sm font-medium text-primary">
                                                        {step.subtitle}
                                                    </p>
                                                </div>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {step.description}
                                                </p>

                                                {step.highlight && (
                                                    <div className="mt-4 flex items-center gap-2 text-primary">
                                                        <CheckCircle2 className="w-5 h-5" />
                                                        <span className="text-sm font-semibold">
                                                            Paso crucial para la aprobación
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Important Notice */}
            <section className="py-8 sm:py-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <Card className="bg-red-100 border-primary/20 shadow-glow animate-scale-in">
                        <div className="p-5 sm:p-8">
                            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">

                                {/* Icon */}
                                <div className="flex-shrink-0 self-start sm:self-auto">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-500/75 flex items-center justify-center">
                                        <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                </div>

                                {/* Text content */}
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground text-center sm:text-left">
                                        Periodo de Adaptación
                                    </h3>

                                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-center sm:text-left">
                                        El adoptado tendrá un periodo de adaptación de{" "}
                                        <span className="font-bold text-primary">15 días</span>.
                                        Si en este tiempo no se cumple la adaptación esperada o no se cubren los compromisos acordados,
                                        se retirará al animalito y se pondrá nuevamente en proceso de adopción.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </Card>
                </div>
            </section>


            {/* Considerations Section */}
            <section className="py-16 px-4 bg-secondary/30">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-12 animate-fade-in">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                            Consideraciones Importantes
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Antes de adoptar, asegúrate de estar preparado para estas responsabilidades
                        </p>
                    </div>

                    <Accordion type="single" collapsible className="space-y-4">
                        {adoptionConsiderations.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border-2 border-border rounded-xl bg-card px-6 data-[state=open]:border-primary transition-all duration-300 animate-fade-in"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <AccordionTrigger className="hover:no-underline py-6">
                                        <div className="flex items-center gap-4 text-left">
                                            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <span className="font-semibold text-lg text-foreground">
                                                {item.title}
                                            </span>
                                        </div>
                                    </AccordionTrigger>

                                    <AccordionContent className="pb-6 pl-16">
                                        <p className="text-muted-foreground leading-relaxed">
                                            {item.description}
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </div>
            </section>

        </div>
    );
};

export default AdoptionProcess;
