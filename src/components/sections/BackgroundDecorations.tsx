import { PawPrint, Heart } from "lucide-react";

const BackgroundDecorations = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <PawPrint
        className="absolute top-20 left-10 w-16 h-16 text-primary/5 animate-float"
        style={{ animationDelay: "0s" }}
      />
      <PawPrint
        className="absolute top-40 right-20 w-12 h-12 text-primary/5 animate-float"
        style={{ animationDelay: "1s" }}
      />
      <PawPrint
        className="absolute bottom-40 left-1/4 w-14 h-14 text-primary/5 animate-float"
        style={{ animationDelay: "2s" }}
      />
      <PawPrint
        className="absolute bottom-20 right-1/3 w-10 h-10 text-primary/5 animate-float"
        style={{ animationDelay: "3s" }}
      />
      <Heart
        className="absolute top-1/3 right-10 w-12 h-12 text-primary/5 animate-pulse-glow"
      />
      <Heart
        className="absolute bottom-1/3 left-20 w-10 h-10 text-primary/5 animate-pulse-glow"
        style={{ animationDelay: "1s" }}
      />
    </div>
  );
};

export default BackgroundDecorations;
