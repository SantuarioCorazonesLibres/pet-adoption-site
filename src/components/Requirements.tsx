import { FileText, Shield, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { requirementsMock } from "@/mocks/requirements.ts";
import BackgroundDecorations from "@/components/sections/BackgroundDecorations";

const Index = () => {
  const handleDownloadContract = () => {
    const link = document.createElement('a');
    link.href = '/contrato-adopcion.pdf';
    link.download = 'contrato-adopcion.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <BackgroundDecorations />

      <section className="relative overflow-hidden py-10 px-4">
        <div className="absolute inset-0 bg-red-400 opacity-5" />
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-16 animate-fade-in">
            <Badge variant="outline" className="mb-4 text-primary border-primary">
              Corazones Libres
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Requisitos para Adoptar
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              ¿Estas listo para adoptar?
              Adoptar es un acto de amor que cambia dos vidas: la tuya y la de tu nueva mascota.
            </p>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {requirementsMock.map((req, index) => {
              const Icon = req.icon;
              return (
                <Card
                  key={index}
                  className="p-6 h-full transition-all duration-300 hover:shadow-xl border-2 border-border/50 hover:border-primary/50"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-400 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3 text-center">
                    {req.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed text-center">
                    {req.description}
                  </p>
                </Card>
              );
            })}
          </div>

          {/* Contract Download Section */}
          <Card className="p-12 md:p-16 text-center bg-card border-2 border-primary/30 shadow-lg">
            <div className="max-w-2xl mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-red-400 flex items-center justify-center shadow-lg">
                <FileText className="w-12 h-12 text-white" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Contrato de Adopción
              </h2>

              <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
                Descarga y revisa nuestro contrato de adopción. Es un paso importante para garantizar
                el bienestar de tu futura mascota.
              </p>

              <Button
                onClick={handleDownloadContract}
                size="lg"
                className="gap-3 text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-7  shadow-lg w-full sm:w-auto hover:shadow-xl transition-all duration-300"
              >
                <Download className="w-6 h-6" />
                <span>Descargar Contrato</span>
              </Button>

              <p className="mt-6 text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Documento oficial de compromiso</span>
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
