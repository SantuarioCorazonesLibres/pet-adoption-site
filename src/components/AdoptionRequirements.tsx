import { Heart } from "lucide-react";

const AdoptionRequirements = () => {
  return (
    <div className="mb-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Heart className="h-5 w-5 text-primary mr-2 animate-pulse" />
        ¿Listo para adoptar?
      </h3>
      <p className="text-sm text-muted-foreground mb-4 italic">
        "Adoptar es un acto de amor que cambia dos vidas: la tuya y la de tu nueva mascota"
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <RequirementItem icon="✨" text="Ser mayor de 18 años" />
          <RequirementItem icon="🏡" text="Tener espacio seguro y adecuado" />
          <RequirementItem icon="💝" text="Tiempo, paciencia y amor para dar" />
          <RequirementItem icon="💰" text="Estabilidad económica para gastos veterinarios" />
        </div>
        <div className="space-y-2">
          <RequirementItem icon="📋" text="Llenar contrato de adopción" />
          <RequirementItem icon="🆔" text="Presentar identificación oficial" />
          <RequirementItem icon="🤝" text="Compromiso de cuidado a largo plazo" />
          <RequirementItem icon="📞" text="Permitir seguimiento post-adopción" />
        </div>
      </div>
    </div>
  );
};

const RequirementItem = ({ icon, text }: { icon: string; text: string }) => (
  <p className="flex items-center text-muted-foreground">
    <span className="text-primary mr-2">{icon}</span>
    {text}
  </p>
);

export default AdoptionRequirements;