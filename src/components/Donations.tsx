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
    tarjeta: "4189143250323808"
  };

  const paypalEmail = "donaciones@corazoneslibres.org";

  // Montos Donación
  const donationAmounts = [20, 50, 100, 200, 500];

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} copiado al portapapeles`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Solo permite números positivos
    if (value === "" || (Number(value) >= 0 && !isNaN(Number(value)))) {
      setCustomAmount(value);
      setSelectedAmount(null); // Limpiar selección predefinida
    }
  };

  const handlePayPalDonate = () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    
    if (!amount || amount <= 0) {
      toast.error("Por favor ingresa un monto válido");
      return;
    }

    if (amount > 100000) {
      toast.error("El monto máximo permitido es $100,000 MXN");
      return;
    }

    // Enlace real de PayPal
    const paypalUrl = `https://www.paypal.com/donate?business=${paypalEmail}&amount=${amount}&currency_code=MXN`;
    window.open(paypalUrl, '_blank');
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(""); // Limpiar input personalizado
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4 animate-fade-in max-w-3xl mx-auto">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
            <Heart className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Ayúdanos a <span className="text-primary">seguir rescatando</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Somos una asociación pequeña que trabaja con amor y dedicación. 
            Cualquier aporte, sin importar el monto, hace una gran diferencia en la vida de nuestros rescatados.
          </p>
          <p className="text-sm text-muted-foreground italic">
            Tu generosidad nos permite continuar con nuestra misión de dar segundas oportunidades 🐾
          </p>
        </div>

        {/* Donation Methods */}
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Shield className="h-6 w-6 mr-2 text-green-600" />
              Donación Segura
            </CardTitle>
            <CardDescription>
              Todas las transacciones están protegidas. Tu información nunca será compartida.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="paypal" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="paypal">
                  <CreditCard className="h-4 w-4 mr-2" />
                  PayPal / Tarjeta
                </TabsTrigger>
                <TabsTrigger value="transfer">
                  <Building2 className="h-4 w-4 mr-2" />
                  Transferencia
                </TabsTrigger>
              </TabsList>

              {/* PayPal Tab */}
              <TabsContent value="paypal" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold mb-3 block">
                      Selecciona un monto sugerido
                    </Label>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                      {donationAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant={selectedAmount === amount ? "default" : "outline"}
                          onClick={() => handleAmountSelect(amount)}
                          className="h-12"
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
                    <Label htmlFor="custom-amount" className="text-base font-semibold mb-3 block">
                      Ingresa tu propio monto
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
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
                        className="pl-7 text-lg h-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        MXN
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Monto mínimo: $1 MXN | Máximo: $100,000 MXN
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg space-y-4 border border-blue-200 dark:border-blue-900">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-600 rounded-full flex-shrink-0">
                      <Lock className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Transacción Protegida por PayPal
                      </h4>
                      <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 mb-4">
                        <li>• Encriptación de datos SSL</li>
                        <li>• No almacenamos información de tarjetas</li>
                        <li>• Protección del comprador incluida</li>
                      </ul>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base"
                        size="lg"
                        onClick={handlePayPalDonate}
                        disabled={!selectedAmount && !customAmount}
                      >
                        Donar {customAmount ? `$${customAmount}` : selectedAmount ? `$${selectedAmount}` : ""} MXN de forma segura
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground text-center">
                    <strong>100% seguro:</strong> Serás redirigido a PayPal para completar tu donación. 
                    No requerimos que ingreses datos sensibles en nuestro sitio.
                  </p>
                </div>
              </TabsContent>

              {/* Transfer Tab */}
              <TabsContent value="transfer" className="space-y-6 mt-6">
                <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-900 mb-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                        Recomendaciones de Seguridad
                      </h4>
                      <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
                        <li>• Verifica los datos bancarios antes de transferir</li>
                        <li>• Guarda tu comprobante de transferencia</li>
                        <li>• Nunca compartas tu NIP o contraseña</li>
                        <li>• Usa solo aplicaciones oficiales de tu banco</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg border">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Building2 className="h-5 w-5 mr-2 text-primary" />
                      Datos Bancarios Verificados
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-sm text-muted-foreground">Banco:</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{bankInfo.banco}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(bankInfo.banco, "Banco")}
                          >
                            {copiedField === "Banco" ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-sm text-muted-foreground">Titular:</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{bankInfo.titular}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(bankInfo.titular, "Titular")}
                          >
                            {copiedField === "Titular" ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-sm text-muted-foreground">No. Tarjeta:</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-medium">{bankInfo.tarjeta}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(bankInfo.tarjeta, "Tarjeta")}
                          >
                            {copiedField === "Tarjeta" ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>                      

                      
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-900">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>Opcional:</strong> Si deseas un recibo deducible de impuestos, envía tu comprobante por WhatsApp al{" "}
                      <a 
                        href="https://wa.me/524491426403" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="underline font-semibold hover:text-green-900"
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
        <div className="mt-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Tu confianza es importante</h2>
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-green-600" />
                  Seguridad Garantizada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Utilizamos PayPal, una plataforma reconocida mundialmente por su seguridad. 
                  Nunca almacenamos información sensible de tarjetas o datos bancarios.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-primary" />
                  Transparencia Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Cada donación se registra y se usa exclusivamente para el cuidado de nuestros rescatados.
                  Somos una asociación comprometida con la honestidad.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Gratitude Message */}
        <div className="mt-12 text-center max-w-xl mx-auto">
          <p className="text-muted-foreground italic">
            "Gracias por considerar apoyar nuestra causa. Sin importar el monto, 
            tu ayuda hace posible que sigamos rescatando y cuidando a quienes más lo necesitan."
          </p>
          <p className="mt-4 font-semibold text-primary">
            - Equipo Corazones Libres 🐾
          </p>
        </div>
      </div>
    </div>
  );
};

export default Donaciones;