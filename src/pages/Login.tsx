import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Shield, AlertCircle, Loader2 } from "lucide-react";
import { signIn } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Redirigir si ya está autenticado
    useEffect(() => {
        if (!authLoading && user) {
            navigate("/admin", { replace: true });
        }
    }, [user, authLoading, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { user, error: signInError } = await signIn(email, password);

            if (signInError) {                
                if (signInError.includes("Invalid login credentials")) {
                    setError("Correo o contraseña incorrectos");
                } else if (signInError.includes("Email not confirmed")) {
                    setError("Por favor confirma tu correo electrónico");
                } else {
                    setError(signInError);
                }
                setLoading(false);
                return;
            }

            if (user) {
                // Redirigir al dashboard admin
                navigate("/admin", { replace: true });
            }
        } catch (err: any) {
            setError("Error al iniciar sesión. Intenta de nuevo.");
            console.error("Error de login:", err);
            setLoading(false);
        }
    };

    // Mostrar loading mientras verifica autenticación
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex justify-center mt-10">
            <div className="w-full max-w-md">
                <Card className="border-border/50 shadow-lg">
                    <CardHeader className="text-center space-y-2">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                            <Shield className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-foreground">
                            Panel de Administración
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Acceso restringido para administradores
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Mensaje de error */}
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription className="flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4" />
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            )}


                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                                    Correo electrónico
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@ejemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="transition-all duration-200 focus:ring-primary/50"
                                    disabled={loading}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                                    Contraseña
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pr-10 transition-all duration-200 focus:ring-primary/50"
                                        disabled={loading}
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={loading}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full transition-all duration-200 hover:shadow-md"
                                disabled={!email || !password || loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Iniciando sesión...
                                    </>
                                ) : (
                                    "Iniciar Sesión"
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-xs text-muted-foreground">
                                Esta es una zona restringida. Si no tienes permisos de administrador,
                                por favor regresa a la página principal.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-4 text-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate("/")}
                        className="text-muted-foreground hover:text-foreground"
                        disabled={loading}
                    >
                        ← Volver a inicio
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;