import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  CreditCard, 
  Building2, 
  Copy, 
  Check,
  Shield,
  Lock
} from "lucide-react";
import { toast } from "sonner";

const Donaciones = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");

  const bankInfo = {
    banco: "Banorte",
    titular: "Ma. Luisa Escobedo",
    tarjeta: "4189 1432 5032 3808",
  };

  const paypalEmail = "donaciones@corazoneslibres.org";

  const donationAmounts = [20, 50, 100, 200, 500];

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} copiado`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || (Number(value) >= 0 && !isNaN(Number(value)))) {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };

  const handlePayPalDonate = () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    
    if (!amount || amount <= 0) {
      toast.error("Por favor ingresa un monto válido");
      return;
    }

    if (amount > 100000) {
      toast.error("El monto máximo es $100,000 MXN");
      return;
    }

    const paypalUrl = `https://www.paypal.com/donate?business=${paypalEmail}&amount=${amount}&currency_code=MXN`;
    window.open(paypalUrl, '_blank');
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12 space-y-3 md:space-y-4 animate-fade-in max-w-3xl mx-auto">
          <div className="inline-block p-2 md:p-3 bg-primary/10 rounded-full mb-2 md:mb-4">
            <Heart className="h-8 w-8 md:h-12 md:w-12 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold px-4">
            Ayúdanos a <span className="text-primary">seguir rescatando</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground px-4">
            Somos una asociación pequeña que trabaja con amor y dedicación. 
            Cualquier aporte, sin importar el monto, hace una gran diferencia en la vida de nuestros rescatados.
          </p>
          <p className="text-sm text-muted-foreground italic px-4">
            Tu generosidad nos permite continuar con nuestra misión de dar segundas oportunidades 🐾
          </p>
        </div>

        {/* Donation Methods */}
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="px-4 md:px-6">
            <CardTitle className="text-xl md:text-2xl flex items-center flex-wrap gap-2">
              <Shield className="h-5 w-5 md:h-6 md:w-6 text-green-600 flex-shrink-0" />
              <span>Donación Segura</span>
            </CardTitle>
            <CardDescription className="text-sm">
              Todas las transacciones están protegidas. Tu información nunca será compartida.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 md:px-6">
            <Tabs defaultValue="paypal" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-auto gap-3">
                <TabsTrigger value="paypal" className="text-xs md:text-sm py-2 data-[state=active]:bg-blue-400 data-[state=active]:text-white data-[state=inactive]:bg-blue-50">
                  <CreditCard className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">PayPal / </span>Tarjeta
                </TabsTrigger>
                <TabsTrigger value="transfer" className="text-xs md:text-sm py-2 data-[state=active]:bg-red-400 data-[state=active]:text-white data-[state=inactive]:bg-red-50">
                  <Building2 className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  Transferencia
                </TabsTrigger>
              </TabsList>

              {/* PayPal Tab */}
              <TabsContent value="paypal" className="space-y-4 md:space-y-6 mt-4 md:mt-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm md:text-base font-semibold mb-2 md:mb-3 block">
                      Selecciona un monto sugerido
                    </Label>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                      {donationAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant={selectedAmount === amount ? "default" : "outline"}
                          onClick={() => handleAmountSelect(amount)}
                          className="h-10 md:h-12 text-sm md:text-base"
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">o</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="custom-amount" className="text-sm md:text-base font-semibold mb-2 md:mb-3 block">
                      Ingresa tu propio monto
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm md:text-base">
                        $
                      </span>
                      <Input
                        id="custom-amount"
                        type="number"
                        min="1"
                        max="100000"
                        step="1"
                        placeholder="Ej: 30"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="pl-7 text-base md:text-lg h-11 md:h-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs md:text-sm text-muted-foreground">
                        MXN
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Mínimo: $1 | Máximo: $100,000 MXN
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 md:p-6 rounded-lg space-y-3 md:space-y-4 border border-blue-200 dark:border-blue-900">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-600 rounded-full flex-shrink-0">
                      <Lock className="h-4 w-4 md:h-5 md:w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 text-sm md:text-base">
                        Transacción Protegida por PayPal
                      </h4>
                      <ul className="text-xs md:text-sm text-blue-700 dark:text-blue-300 space-y-1 mb-3 md:mb-4">
                        <li>• Encriptación de datos SSL</li>
                        <li>• No almacenamos información de tarjetas</li>
                        <li>• Protección del comprador incluida</li>
                      </ul>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 h-11 md:h-12 text-sm md:text-base"
                        size="lg"
                        onClick={handlePayPalDonate}
                        disabled={!selectedAmount && !customAmount}
                      >
                        <span className="truncate">
                          Donar {customAmount ? `${customAmount}` : selectedAmount ? `${selectedAmount}` : ""} MXN
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 p-3 md:p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground text-center leading-relaxed">
                    <strong>100% seguro:</strong> Serás redirigido a PayPal para completar tu donación. 
                    No requerimos que ingreses datos sensibles en nuestro sitio.
                  </p>
                </div>
              </TabsContent>

              {/* Transfer Tab */}
              <TabsContent value="transfer" className="space-y-4 md:space-y-6 mt-4 md:mt-6">
                <div className="bg-amber-50 dark:bg-amber-950/20 p-3 md:p-4 rounded-lg border border-amber-200 dark:border-amber-900 mb-4">
                  <div className="flex items-start space-x-2 md:space-x-3">
                    <Shield className="h-4 w-4 md:h-5 md:w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-1 text-sm md:text-base">
                        Recomendaciones de Seguridad
                      </h4>
                      <ul className="text-xs md:text-sm text-amber-800 dark:text-amber-200 space-y-1">
                        <li>• Verifica los datos antes de transferir</li>
                        <li>• Guarda tu comprobante</li>
                        <li>• Nunca compartas tu NIP</li>
                        <li>• Usa apps oficiales de tu banco</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted/50 p-3 md:p-4 rounded-lg border">
                    <h4 className="font-semibold mb-3 flex items-center text-sm md:text-base">
                      <Building2 className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary flex-shrink-0" />
                      <span>Datos Bancarios Verificados</span>
                    </h4>
                    <div className="space-y-2 md:space-y-3">
                      {Object.entries({
                        "Banco": bankInfo.banco,
                        "Titular": bankInfo.titular,
                        "No. Tarjeta": bankInfo.tarjeta,
                      }).map(([label, value]) => (
                        <div key={label} className="flex justify-between items-center py-2 border-b last:border-b-0 gap-2">
                          <span className="text-xs md:text-sm text-muted-foreground flex-shrink-0">{label}:</span>
                          <div className="flex items-center space-x-1 md:space-x-2 min-w-0">
                            <span className="font-medium text-xs md:text-sm font-mono truncate">{value}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(value, label)}
                              className="flex-shrink-0 h-8 w-8 p-0"
                            >
                              {copiedField === label ? (
                                <Check className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
                              ) : (
                                <Copy className="h-3 w-3 md:h-4 md:w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950/20 p-3 md:p-4 rounded-lg border border-green-200 dark:border-green-900">
                    <p className="text-xs md:text-sm text-green-800 dark:text-green-200 leading-relaxed">
                      <strong>Opcional:</strong> Si deseas un recibo deducible, envía tu comprobante por WhatsApp al{" "}
                      <a 
                        href="https://wa.me/524491426403" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="underline font-semibold hover:text-green-900 break-all"
                      >
                        449 142 6403
                      </a>
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Trust Section */}
        <div className="mt-8 md:mt-12 max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 px-4">
            Tu confianza es importante
          </h2>
          <div className="grid gap-3 md:gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base md:text-lg flex items-center">
                  <Lock className="h-4 w-4 md:h-5 md:w-5 mr-2 text-green-600 flex-shrink-0" />
                  Seguridad Garantizada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Utilizamos PayPal, una plataforma reconocida mundialmente por su seguridad. 
                  Nunca almacenamos información sensible de tarjetas o datos bancarios.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base md:text-lg flex items-center">
                  <Heart className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary flex-shrink-0" />
                  Transparencia Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Cada donación se registra y se usa exclusivamente para el cuidado de nuestros rescatados.
                  Somos una asociación comprometida con la honestidad.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Gratitude Message */}
        <div className="mt-8 md:mt-12 text-center max-w-xl mx-auto px-4">
          <p className="text-sm md:text-base text-muted-foreground italic leading-relaxed">
            "Gracias por considerar apoyar nuestra causa. Sin importar el monto, 
            tu ayuda hace posible que sigamos rescatando y cuidando a quienes más lo necesitan."
          </p>
          <p className="mt-3 md:mt-4 font-semibold text-primary text-sm md:text-base">
            - Equipo Corazones Libres 🐾
          </p>
        </div>
      </div>
    </div>
  );
};

export default Donaciones;
