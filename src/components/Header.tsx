import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LogoTransparent from "@/assets/Logo_transparent.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="relative">
              <img 
                  src={LogoTransparent} 
                  alt="Logotipo de la asociación"
                  className="h-10 w-10 text-primary "
                />
              {/* <Heart className="h-8 w-8 text-primary animate-pulse-warm" fill="currentColor" /> */}
            </div>
            <span className="text-xl font-bold bg-gradient-warm bg-clip-text text-transparent">
              Corazones Libres
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/adopcion"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              Adopción
            </NavLink>
            <NavLink
              to="/sobre-nosotros"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              Nosotros
            </NavLink>
            <Button className="bg-gradient-warm hover:shadow-warm transition-all duration-300">
              Donar Ahora
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </NavLink>
              <NavLink
                to="/adopcion"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Adopción
              </NavLink>
              <NavLink
                to="/sobre-nosotros"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Nosotros
              </NavLink>
              <Button className="bg-gradient-warm hover:shadow-warm transition-all duration-300 w-fit">
                Donar Ahora
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;