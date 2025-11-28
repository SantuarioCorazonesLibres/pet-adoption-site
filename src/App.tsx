import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Index from './pages/Index';
import AboutUs from './pages/AboutUs';
import Adopcion from './pages/Adoptions';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/Admin';
import Donaciones from './components/Donations';
import Testimonios from './pages/Testimonials';
import Requirements from './components/Requirements';
import AdoptionProcess from './components/AdoptionProcess';
import ScrollToTop from './components/ScrollToTop';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <ScrollToTop />
          <div className='min-h-screen flex flex-col'>
            <Header />
            <main className='flex-grow'>
              <Routes>
                {/* ===== RUTAS PÚBLICAS ===== */}
                <Route path='/' element={<Index />} />
                <Route path="/adopcion" element={<Adopcion />} />
                <Route path='/sobre-nosotros' element={<AboutUs />} />
                <Route path='/donaciones' element={<Donaciones />} />
                <Route path='/testimonios' element={<Testimonios />} />
                <Route path='/requisitos' element={<Requirements />} />
                <Route path='/proceso-adopcion' element={<AdoptionProcess />} />

                {/* ===== RUTA DE LOGIN (OCULTA) ===== */}
                {/* No hay enlaces a esta ruta en el sitio */}
                <Route path='/login' element={<Login />}/>
                
                {/* ===== RUTA PROTEGIDA (ADMIN) ===== */}
                {/* Solo accesible después de autenticarse */}                
                <Route 
                  path='/admin' 
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                
                {/* ===== RUTA 404 ===== */}
                <Route path='*' element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App;